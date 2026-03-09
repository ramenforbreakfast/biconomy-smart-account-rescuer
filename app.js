// Network config: chainId, public RPC, USDC contract, block explorer
const NETWORKS = {
  base:     { chainId: 8453,  name: 'Base',     rpc: 'https://mainnet.base.org',      usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', explorer: 'https://basescan.org/tx/' },
  ethereum: { chainId: 1,     name: 'Ethereum', rpc: 'https://eth.llamarpc.com',       usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', explorer: 'https://etherscan.io/tx/' },
  polygon:  { chainId: 137,   name: 'Polygon',  rpc: 'https://polygon-rpc.com',        usdc: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', explorer: 'https://polygonscan.com/tx/' },
  optimism: { chainId: 10,    name: 'Optimism', rpc: 'https://mainnet.optimism.io',    usdc: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', explorer: 'https://optimistic.etherscan.io/tx/' },
  arbitrum: { chainId: 42161, name: 'Arbitrum', rpc: 'https://arb1.arbitrum.io/rpc',   usdc: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', explorer: 'https://arbiscan.io/tx/' },
};

const EP_V6 = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
const EIP1967_IMPL_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';

// Biconomy's ModuleManager uses Safe's sentinel-based linked list for modules
const SENTINEL_MODULES = '0x0000000000000000000000000000000000000001';

// ECDSAOwnershipRegistryModule — deployed at the same address across all chains via CREATE2
const KNOWN_BICONOMY_MODULES = [
  '0x0000001c5b32F37F5beA87BDD5374eB2aC54eA8e',
  '0x000000Dd8eB18e2D809Ad83D9c1AB48C3DC7dd7A',
];

// Known implementation addresses mapped to human-readable names
const KNOWN_IMPLS = {
  '0x0000002512019dafb59528b82cb92d3c5d2423ac': 'Biconomy SmartAccount v2.0.0',
  '0x00000054a5e8b45bc2f37bd49e2fb7c3c19eb1bd': 'Biconomy SmartAccount v2.0.0 (alt)',
};

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
];

// Shared signer — set by either connectMetaMask() or loadKey().
// Accepts both ethers.BrowserProvider signer and ethers.Wallet.
let signer = null;
let eoaAddress = null;
let selectedNetwork = 'base';
let currentBalance = null;

// Populated by diagnoseAccount(); used to skip redundant on-chain lookups during withdraw.
let diagData = {
  entryPoint: null,
  implAddress: null,
  kernelVersion: null,
  defaultValidator: null,
  confirmedOwner: null,
  isBiconomy: false,
  ecdsaModule: null,
};

// UI helpers

function log(msg, color) {
  const el = document.getElementById('debugLog');
  const ts = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  el.innerHTML += `<div style="color:${color || '#9ca3af'}"><span style="color:#3b3f4a;">[${ts}]</span> ${msg}</div>`;
  el.scrollTop = el.scrollHeight;
}

function showAlert(id, type, msg) {
  const el = document.getElementById(id);
  el.className = `alert ${type} visible`;
  el.innerHTML = msg;
}

function hideAlert(id) { document.getElementById(id).className = 'alert'; }

function getNet() { return NETWORKS[selectedNetwork] || NETWORKS.base; }

function selectNetwork(btn) {
  selectedNetwork = btn.getAttribute('data-net');
  document.querySelectorAll('.net-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  log('Network → ' + selectedNetwork);
}

function setMax() {
  if (currentBalance) document.getElementById('amount').value = parseFloat(currentBalance);
}

// Extract a checksummed address from a 32-byte storage slot value (right-aligned)
function addrFromSlot(raw) {
  if (!raw || raw === '0x' + '0'.repeat(64)) return null;
  const addr = ethers.getAddress('0x' + raw.slice(-40));
  return addr === ethers.ZeroAddress ? null : addr;
}

function diagRow(label, value, cls) {
  return `<div class="diag-row"><span class="diag-label">${label}</span><span class="diag-val ${cls || ''}">${value}</span></div>`;
}

function setWalletConnected(address, label) {
  eoaAddress = address;
  document.getElementById('walletStatus').style.display = 'flex';
  document.getElementById('walletStatus').className = 'wallet-status connected';
  document.getElementById('connDot').className = 'dot on';
  document.getElementById('connText').textContent = address.slice(0, 6) + '…' + address.slice(-4) + (label ? '  ·  ' + label : '');
  document.getElementById('s1num').className = 'step-num done';
  document.getElementById('s1num').textContent = '✓';
  showAlert('connectAlert', 'alert-success', '✓ <code style="font-size:11px">' + address + '</code>');
  log('Connected: ' + address, '#4ade80');
}

// Wallet connection — MetaMask

async function connectMetaMask() {
  hideAlert('connectAlert');
  if (!window.ethereum) {
    showAlert('connectAlert', 'alert-error', '❌ MetaMask not detected. Install MetaMask or use a private key below.');
    return;
  }
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById('connectMetaMaskBtn').textContent = 'Connected ✓';
    document.getElementById('connectMetaMaskBtn').disabled = true;
    setWalletConnected(address, 'MetaMask');
  } catch (e) {
    showAlert('connectAlert', 'alert-error', '❌ ' + e.message);
  }
}

// Wallet connection — private key

function loadKey() {
  hideAlert('connectAlert');
  let pk = document.getElementById('privKey').value.trim();
  if (!pk) { showAlert('connectAlert', 'alert-error', '❌ Paste your private key.'); return; }
  if (!pk.startsWith('0x')) pk = '0x' + pk;
  if (pk.length !== 66 || !/^0x[0-9a-fA-F]{64}$/.test(pk)) {
    showAlert('connectAlert', 'alert-error', '❌ Invalid key — expected 64 hex characters.');
    return;
  }
  try {
    signer = new ethers.Wallet(pk);
    document.getElementById('loadKeyBtn').textContent = 'Loaded ✓';
    document.getElementById('loadKeyBtn').disabled = true;
    setWalletConnected(signer.address, 'private key');
  } catch (e) {
    showAlert('connectAlert', 'alert-error', '❌ ' + e.message);
  }
}

// Balance check

async function checkBalance() {
  const net = getNet();
  const sa = document.getElementById('smartAcct').value.trim();
  if (!ethers.isAddress(sa)) { showAlert('balanceAlert', 'alert-error', '❌ Invalid address.'); return; }
  try {
    hideAlert('balanceAlert');
    const rpc = new ethers.JsonRpcProvider(net.rpc);
    const usdc = new ethers.Contract(net.usdc, ERC20_ABI, rpc);
    const [raw, ethBal] = await Promise.all([usdc.balanceOf(sa), rpc.getBalance(sa)]);

    currentBalance = ethers.formatUnits(raw, 6); // USDC is always 6 decimals
    document.getElementById('balanceWrap').style.display = 'block';
    document.getElementById('balanceAmt').textContent =
      parseFloat(currentBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 }) + ' USDC';

    document.getElementById('ethBalAmt').textContent =
      parseFloat(ethers.formatEther(ethBal)).toFixed(6) + ' ETH';

    const MIN_ETH = ethers.parseEther('0.0005');
    const warnEl = document.getElementById('ethBalWarn');
    if (ethBal === 0n) {
      warnEl.textContent = '⚠ No ETH — fund this account before withdrawing';
      warnEl.className = 'eth-warn bad';
    } else if (ethBal < MIN_ETH) {
      warnEl.textContent = '⚠ Low ETH — may not cover gas (need ~0.0005 ETH minimum)';
      warnEl.className = 'eth-warn warn';
    } else {
      warnEl.textContent = '✓ Sufficient for gas';
      warnEl.className = 'eth-warn good';
    }

    if (parseFloat(currentBalance) === 0) {
      showAlert('balanceAlert', 'alert-warn', '⚠️ No USDC found on ' + net.name);
    } else {
      document.getElementById('s2num').className = 'step-num done';
      document.getElementById('s2num').textContent = '✓';
      document.getElementById('withdrawBtn').disabled = false;
      showAlert('txAlert', 'alert-success', '✓ Found ' + parseFloat(currentBalance).toFixed(2) + ' USDC.');
    }
  } catch (e) {
    showAlert('balanceAlert', 'alert-error', '❌ ' + e.message);
  }
}

// Account diagnostics
//
// Inspects the proxy implementation, EntryPoint version, storage layout, enabled modules,
// and registered owner. Results are displayed in the UI and cached in diagData for use
// during withdrawal.

async function diagnoseAccount() {
  const net = getNet();
  const sa = document.getElementById('smartAcct').value.trim();
  if (!ethers.isAddress(sa)) { showAlert('balanceAlert', 'alert-error', '❌ Invalid address.'); return; }

  const diagEl = document.getElementById('diagResults');
  diagEl.className = 'diag-results visible';
  diagEl.innerHTML = '<div style="color:var(--blue)">Running diagnostics…</div>';
  const btn = document.getElementById('diagBtn');
  btn.disabled = true;
  btn.textContent = 'Diagnosing…';

  const rpc = new ethers.JsonRpcProvider(net.rpc);
  let html = '';

  try {
    // A. Contract
    html += '<div class="diag-section">A. CONTRACT</div>';
    const code = await rpc.getCode(sa);
    const codeBytes = (code.length - 2) / 2;
    html += diagRow('Address', sa);
    html += diagRow('Code size', codeBytes + ' bytes' + (codeBytes < 200 ? '  (proxy)' : ''));
    html += diagRow('Bytecode head', code.slice(0, 60) + '…');

    if (code === '0x') {
      html += diagRow('STATUS', 'NO CONTRACT — wrong address or network?', 'bad');
      diagEl.innerHTML = html;
      btn.disabled = false;
      btn.textContent = 'Diagnose Account';
      return;
    }

    // B. Proxy implementation
    //
    // Three proxy patterns are checked in order:
    //   1. EIP-1967 (standard upgradeable proxy)
    //   2. EIP-1167 / PUSH20 minimal proxy
    //   3. "Self-slot" proxy used by Biconomy/ZeroDev: SLOAD(ADDRESS) —
    //      the implementation address is stored at storage slot = uint256(address(this))
    html += '<div class="diag-section">B. PROXY IMPLEMENTATION</div>';

    const implSlotRaw = await rpc.getStorage(sa, EIP1967_IMPL_SLOT);
    html += diagRow('EIP-1967 slot raw', implSlotRaw);
    let implAddr = null;
    try { implAddr = addrFromSlot(implSlotRaw); } catch (_) {}

    if (implAddr) {
      html += diagRow('Implementation', implAddr, 'good');
      diagData.implAddress = implAddr;
      const knownName = KNOWN_IMPLS[implAddr.toLowerCase()];
      if (knownName) {
        html += diagRow('Identified', knownName, 'good');
        diagData.kernelVersion = knownName;
      } else {
        html += diagRow('Identified', 'Unknown — not in registry', 'warn');
        const implCode = await rpc.getCode(implAddr);
        html += diagRow('Impl code size', ((implCode.length - 2) / 2) + ' bytes');
      }
    } else {
      html += diagRow('EIP-1967', 'empty', 'warn');
      const codeLower = code.toLowerCase();
      if (codeLower.startsWith('0x363d3d373d3d3d363d73')) {
        const target = ethers.getAddress('0x' + code.slice(22, 62));
        html += diagRow('EIP-1167 proxy →', target, 'good');
        diagData.implAddress = target;
        const knownName = KNOWN_IMPLS[target.toLowerCase()];
        if (knownName) { html += diagRow('Identified', knownName, 'good'); diagData.kernelVersion = knownName; }
      } else if (codeLower.includes('5af43d82803e903d91602b57fd5bf3')) {
        const idx = codeLower.indexOf('73');
        if (idx >= 0 && idx + 42 <= codeLower.length) {
          const target = ethers.getAddress('0x' + code.slice(idx + 2, idx + 42));
          html += diagRow('Proxy target (PUSH20)', target, 'good');
          diagData.implAddress = target;
        }
      }

      // Self-slot proxy: implementation stored at storage[address(this)]
      const selfSlot = ethers.zeroPadValue(sa.toLowerCase(), 32);
      const selfSlotRaw = await rpc.getStorage(sa, selfSlot);
      html += diagRow('Self-slot raw', selfSlotRaw);
      const selfImpl = addrFromSlot(selfSlotRaw);
      if (selfImpl) {
        html += diagRow('  → Implementation', selfImpl, 'good');
        diagData.implAddress = selfImpl;
        const selfKnown = KNOWN_IMPLS[selfImpl.toLowerCase()];
        if (selfKnown) {
          html += diagRow('  → Identified as', selfKnown, 'good');
          diagData.kernelVersion = selfKnown;
          diagData.isBiconomy = selfKnown.toLowerCase().includes('biconomy');
        } else {
          const ic = await rpc.getCode(selfImpl);
          const iSize = (ic.length - 2) / 2;
          html += diagRow('  → Impl size', iSize + ' bytes', iSize > 0 ? 'warn' : 'bad');
          html += diagRow('  → Lookup', 'basescan.org/address/' + selfImpl, 'warn');
        }
      } else {
        html += diagRow('  → Self-slot', 'empty', 'warn');
      }
    }

    // C. EntryPoint
    html += '<div class="diag-section">C. ENTRYPOINT</div>';
    const entryPoint = EP_V6;
    try {
      const acct = new ethers.Contract(sa, ['function entryPoint() view returns (address)'], rpc);
      html += diagRow('entryPoint()', await acct.entryPoint(), 'good');
    } catch (_) {
      html += diagRow('entryPoint()', EP_V6 + ' (assumed)', 'warn');
    }
    diagData.entryPoint = entryPoint;
    html += diagRow('Version', 'v0.6');

    try {
      const epc = new ethers.Contract(entryPoint, ['function getNonce(address,uint192) view returns (uint256)'], rpc);
      const n = await epc.getNonce(sa, 0);
      html += diagRow('Nonce', n.toString());
    } catch (_) {}

    const ethBal = await rpc.getBalance(sa);
    html += diagRow('ETH balance', ethers.formatEther(ethBal) + ' ETH', ethBal > 0n ? 'good' : 'bad');

    // D. Storage layout
    html += '<div class="diag-section">D. STORAGE</div>';
    const storageAddrs = [];

    async function scanSlot(slotHex, label) {
      const raw = await rpc.getStorage(sa, slotHex);
      const isZero = raw === '0x' + '0'.repeat(64);
      html += diagRow(label, isZero ? '(zero)' : raw, isZero ? '' : 'warn');
      if (!isZero) {
        try {
          const addr = addrFromSlot(raw);
          if (addr) {
            const c = await rpc.getCode(addr);
            if (c !== '0x' && !storageAddrs.includes(addr)) {
              storageAddrs.push(addr);
              html += diagRow('  → contract', addr + ' (' + ((c.length - 2) / 2) + 'b)', 'warn');
            }
          }
        } catch (_) {}
        try {
          const topAddr = ethers.getAddress('0x' + raw.slice(2, 42));
          if (topAddr !== ethers.ZeroAddress) {
            const c = await rpc.getCode(topAddr);
            if (c !== '0x' && !storageAddrs.includes(topAddr)) {
              storageAddrs.push(topAddr);
              html += diagRow('  → top contract', topAddr + ' (' + ((c.length - 2) / 2) + 'b)', 'warn');
            }
          }
        } catch (_) {}
      }
    }

    // Sequential slots 0–5 (Biconomy's _modules mapping is at slot 0; older Kernels also used sequential layout)
    html += diagRow('— sequential 0–5 —', '');
    for (let i = 0; i < 6; i++) {
      await scanSlot('0x' + i.toString(16).padStart(64, '0'), 'seq[' + i + ']');
    }

    // Walk Biconomy's module linked list: _modules[SENTINEL] → first module → next → …
    // Slot for mapping entry: keccak256(abi.encode(key, mappingBaseSlot=0))
    html += diagRow('— Biconomy modules —', '');
    const abiC = ethers.AbiCoder.defaultAbiCoder();
    const biconEnabledModules = [];
    try {
      const sentinelSlot = ethers.keccak256(abiC.encode(['address', 'uint256'], [SENTINEL_MODULES, 0]));
      const firstModRaw = await rpc.getStorage(sa, sentinelSlot);
      const firstMod = addrFromSlot(firstModRaw);
      html += diagRow('_modules[sentinel]', firstModRaw);
      if (firstMod && firstMod.toLowerCase() !== SENTINEL_MODULES.toLowerCase()) {
        html += diagRow('  → first module', firstMod, 'good');
        biconEnabledModules.push(firstMod);
        storageAddrs.push(firstMod);
        let cursor = firstMod;
        for (let i = 0; i < 4; i++) {
          const nextSlot = ethers.keccak256(abiC.encode(['address', 'uint256'], [cursor, 0]));
          const nextRaw = await rpc.getStorage(sa, nextSlot);
          const next = addrFromSlot(nextRaw);
          if (!next || next.toLowerCase() === SENTINEL_MODULES.toLowerCase()) break;
          html += diagRow('  → next module', next, 'good');
          biconEnabledModules.push(next);
          if (!storageAddrs.includes(next)) storageAddrs.push(next);
          cursor = next;
        }
      } else if (firstMod && firstMod.toLowerCase() === SENTINEL_MODULES.toLowerCase()) {
        html += diagRow('  → module list', 'empty', 'warn');
      } else {
        html += diagRow('  → module list', 'not found', 'warn');
      }
    } catch (e) {
      html += diagRow('module lookup', e.message, 'bad');
    }

    // E. Account function calls
    html += '<div class="diag-section">E. ACCOUNT CALLS</div>';

    try {
      const acct = new ethers.Contract(sa, ['function implementation() view returns (address)'], rpc);
      const imp = await acct.implementation();
      html += diagRow('implementation()', imp, 'good');
      if (!diagData.implAddress) diagData.implAddress = imp;
    } catch (_) {}

    // F. Owner lookup
    //
    // Checks in priority order: modules found on-chain, known Biconomy modules,
    // any contract addresses discovered from storage.
    // Falls back to direct storage slot computation (keccak256 mapping keys)
    // if function calls fail.
    html += '<div class="diag-section">F. OWNER LOOKUP</div>';

    const validatorsToCheck = [];
    for (const m of biconEnabledModules) {
      if (!validatorsToCheck.includes(m)) validatorsToCheck.push(m);
    }
    for (const m of KNOWN_BICONOMY_MODULES) {
      if (!validatorsToCheck.includes(m)) validatorsToCheck.push(m);
    }
    for (const a of storageAddrs) {
      if (!validatorsToCheck.includes(a)) validatorsToCheck.push(a);
    }

    html += diagRow('Candidates', validatorsToCheck.length + ' addresses');

    let confirmedOwner = null;
    const ownerFns = [
      { sig: 'function getOwner(address) view returns (address)',                    name: 'getOwner' },
      { sig: 'function smartAccountOwners(address) view returns (address)',          name: 'smartAccountOwners' },
      { sig: 'function owner(address) view returns (address)',                       name: 'owner' },
      { sig: 'function ecdsaValidatorStorage(address) view returns (address)',       name: 'ecdsaValidatorStorage' },
    ];

    for (const vAddr of validatorsToCheck) {
      if (confirmedOwner) break;
      for (const fn of ownerFns) {
        try {
          const v = new ethers.Contract(vAddr, [fn.sig], rpc);
          const result = await v[fn.name](sa);
          const ownerAddr = typeof result === 'string' ? result : (result[0] || result);
          if (ownerAddr && ownerAddr !== ethers.ZeroAddress) {
            html += diagRow(vAddr.slice(0, 12) + '…', fn.name + '() → ' + ownerAddr, 'good');
            confirmedOwner = ownerAddr;
            diagData.defaultValidator = vAddr;
            diagData.confirmedOwner = ownerAddr;
            diagData.ecdsaModule = vAddr;
            break;
          }
        } catch (_) {}
      }
    }

    if (!confirmedOwner) {
      html += diagRow('Function calls', 'failed — trying raw storage…', 'warn');

      // Compute the Solidity mapping slot: keccak256(abi.encode(kernelAddr, mappingBaseSlot))
      // The ECDSAOwnershipRegistryModule's smartAccountOwners mapping is typically at base slot 0.
      const abiCoder = ethers.AbiCoder.defaultAbiCoder();
      for (const vAddr of validatorsToCheck) {
        if (confirmedOwner) break;
        for (let base = 0; base <= 3; base++) {
          try {
            const ownerSlot = ethers.keccak256(abiCoder.encode(['address', 'uint256'], [sa, base]));
            const raw = await rpc.getStorage(vAddr, ownerSlot);
            const ownerAddr = addrFromSlot(raw);
            if (ownerAddr) {
              html += diagRow(vAddr.slice(0, 10) + '…[' + base + ']', 'owner → ' + ownerAddr, 'good');
              confirmedOwner = ownerAddr;
              diagData.defaultValidator = vAddr;
              diagData.confirmedOwner = ownerAddr;
              diagData.ecdsaModule = vAddr;
              break;
            } else {
              html += diagRow(vAddr.slice(0, 10) + '…[' + base + ']', '(empty)');
            }
          } catch (_) {}
        }
      }

      if (!confirmedOwner) {
        for (let i = 0; i < 3; i++) {
          try {
            const raw = await rpc.getStorage(sa, '0x' + i.toString(16).padStart(64, '0'));
            const maybeValidator = addrFromSlot(raw);
            if (maybeValidator && !validatorsToCheck.includes(maybeValidator)) {
              html += diagRow('  seq[' + i + '] addr', maybeValidator, 'warn');
              for (let base = 0; base <= 1; base++) {
                const ownerSlot = ethers.keccak256(abiCoder.encode(['address', 'uint256'], [sa, base]));
                const rawOwner = await rpc.getStorage(maybeValidator, ownerSlot);
                const ownerAddr = addrFromSlot(rawOwner);
                if (ownerAddr) {
                  html += diagRow('    → owner', ownerAddr, 'good');
                  confirmedOwner = ownerAddr;
                  diagData.defaultValidator = maybeValidator;
                  diagData.confirmedOwner = ownerAddr;
                }
              }
            }
          } catch (_) {}
        }
      }
    }

    // G. Summary
    html += '<div class="diag-section">G. SUMMARY</div>';

    if (diagData.implAddress) html += diagRow('Implementation', diagData.implAddress, 'good');
    if (diagData.kernelVersion) html += diagRow('Account type', diagData.kernelVersion, 'good');

    if (confirmedOwner) {
      html += diagRow('Owner found', confirmedOwner, 'good');
      if (eoaAddress) {
        const match = confirmedOwner.toLowerCase() === eoaAddress.toLowerCase();
        html += diagRow('Your wallet', eoaAddress, match ? 'good' : 'bad');
        html += diagRow('Match', match ? '✓ MATCH' : '✗ MISMATCH — wrong wallet connected', match ? 'good' : 'bad');
      }
    } else {
      html += diagRow('Owner', 'NOT FOUND', 'bad');
      const implLink = diagData.implAddress
        ? `<a href="https://basescan.org/address/${diagData.implAddress}#code" target="_blank" style="color:#f09090;">${diagData.implAddress}</a>`
        : 'unknown';
      html += `<div style="margin-top:8px; padding:10px; background:rgba(239,68,68,0.06); border-radius:6px; font-size:10px; line-height:1.7; color:#f09090;">
        <strong>Owner not found.</strong><br><br>
        Implementation: ${implLink}<br>
        Storage addresses: ${storageAddrs.join(', ') || 'none'}<br>
        EntryPoint: ${entryPoint}
      </div>`;
    }

    diagEl.innerHTML = html;
    log('Diagnostics complete', '#4ade80');

  } catch (e) {
    log('Diagnostic error: ' + e.message, '#ef4444');
    diagEl.innerHTML = html + diagRow('ERROR', e.message, 'bad');
  }

  btn.disabled = false;
  btn.textContent = 'Diagnose Account';
}

// Withdraw

async function withdraw() {
  if (!signer) { showAlert('txAlert', 'alert-error', '❌ Connect a wallet first.'); return; }

  const net        = getNet();
  const smartAcct  = document.getElementById('smartAcct').value.trim();
  const dest       = document.getElementById('destAddr').value.trim();
  const amtStr     = document.getElementById('amount').value.trim();
  const bundlerUrl = document.getElementById('bundlerUrl').value.trim();

  if (!ethers.isAddress(smartAcct)) { showAlert('txAlert', 'alert-error', '❌ Invalid smart account address.'); return; }
  if (!ethers.isAddress(dest))      { showAlert('txAlert', 'alert-error', '❌ Invalid destination address.'); return; }
  if (!amtStr || parseFloat(amtStr) <= 0) { showAlert('txAlert', 'alert-error', '❌ Enter an amount.'); return; }
  if (!bundlerUrl) { showAlert('txAlert', 'alert-error', '❌ Enter a bundler RPC URL.'); return; }

  const btn = document.getElementById('withdrawBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Preparing…';
  const rpcProvider = new ethers.JsonRpcProvider(net.rpc);

  // Biconomy SmartAccount v2 uses EntryPoint v0.6, which requires the /v1/ Pimlico endpoint
  function getBundlerUrl() {
    return bundlerUrl.includes('pimlico.io')
      ? bundlerUrl.replace('/v2/', '/v1/')
      : bundlerUrl;
  }

  async function bundlerRpc(method, params) {
    const url = getBundlerUrl();
    log('RPC → ' + method);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error.message || JSON.stringify(json.error));
    return json.result;
  }

  try {
    const ethBal = await rpcProvider.getBalance(smartAcct);
    if (ethBal === 0n) {
      btn.disabled = false;
      btn.textContent = 'Withdraw USDC';
      showAlert('txAlert', 'alert-error', '❌ Smart account has no ETH for gas. Send a small amount first.');
      return;
    }
    const code = await rpcProvider.getCode(smartAcct);
    if (code === '0x') throw new Error('No contract at this address.');

    const entryPoint = EP_V6;
    log('Account type: Biconomy SmartAccount v2', '#4ade80');
    log('EntryPoint: v0.6');

    const epc = new ethers.Contract(entryPoint, ['function getNonce(address,uint192) view returns (uint256)'], rpcProvider);
    const nonce = await epc.getNonce(smartAcct, 0);
    log('Nonce: ' + nonce.toString());

    const usdcIface = new ethers.Interface(ERC20_ABI);
    const amountRaw = ethers.parseUnits(amtStr, 6);
    const transferData = usdcIface.encodeFunctionData('transfer', [dest, amountRaw]);

    const feeData = await rpcProvider.getFeeData();
    const maxFeePerGas = feeData.maxFeePerGas || feeData.gasPrice || ethers.parseUnits('1', 'gwei');
    const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas || ethers.parseUnits('1', 'gwei');

    let success = false;
    let userOpHashResult = null;

    // Signature format: abi.encode(moduleSignature, moduleAddress)
    // The account decodes this in validateUserOp and delegates to the specified module.
    // The ECDSAOwnershipRegistryModule validates using ECDSA.toEthSignedMessageHash(userOpHash).
    btn.innerHTML = '<span class="spinner"></span>Building UserOp…';
    showAlert('txAlert', 'alert-info', '⏳ Preparing withdrawal…');

    let ecdsaModule = diagData.ecdsaModule;
    if (!ecdsaModule) {
      try {
        const abiC2 = ethers.AbiCoder.defaultAbiCoder();
        const sentinelSlot = ethers.keccak256(abiC2.encode(['address', 'uint256'], [SENTINEL_MODULES, 0]));
        const firstMod = addrFromSlot(await rpcProvider.getStorage(smartAcct, sentinelSlot));
        if (firstMod && firstMod.toLowerCase() !== SENTINEL_MODULES.toLowerCase()) {
          ecdsaModule = firstMod;
          log('Module found on-chain: ' + ecdsaModule, '#4ade80');
        }
      } catch (_) {}
    }
    if (!ecdsaModule) {
      ecdsaModule = KNOWN_BICONOMY_MODULES[0];
      log('Using default module address: ' + ecdsaModule, '#f59e0b');
    }
    log('ECDSA module: ' + ecdsaModule);

    const callData = new ethers.Interface(['function execute(address,uint256,bytes)'])
      .encodeFunctionData('execute', [net.usdc, 0n, transferData]);

    const userOp = {
      sender: smartAcct,
      nonce: '0x' + nonce.toString(16),
      initCode: '0x',
      callData,
      callGasLimit: '0x493E0',
      verificationGasLimit: '0x493E0',
      preVerificationGas: '0xC350',
      maxFeePerGas: '0x' + maxFeePerGas.toString(16),
      maxPriorityFeePerGas: '0x' + maxPriorityFeePerGas.toString(16),
      paymasterAndData: '0x',
      signature: '0x',
    };

    const abiC2 = ethers.AbiCoder.defaultAbiCoder();
    // s-value must be in the lower half of secp256k1 or OZ ECDSA.recover reverts
    const dummySig = '0x' + 'ab'.repeat(32) + '0'.repeat(63) + '1' + '1b';
    userOp.signature = abiC2.encode(['bytes', 'address'], [dummySig, ecdsaModule]);

    try {
      const est = await bundlerRpc('eth_estimateUserOperationGas', [userOp, entryPoint]);
      log('Gas estimated', '#4ade80');
      if (est.callGasLimit)         userOp.callGasLimit         = est.callGasLimit;
      if (est.verificationGasLimit) userOp.verificationGasLimit = est.verificationGasLimit;
      if (est.preVerificationGas)   userOp.preVerificationGas   = est.preVerificationGas;
    } catch (e) {
      log('Gas estimate failed, using fixed limits: ' + e.message.slice(0, 80), '#f59e0b');
      userOp.callGasLimit = '0x186A0';   // 100K — covers USDC transfer via Biconomy execute
      userOp.verificationGasLimit = '0x30D40'; // 200K — covers ECDSAOwnershipRegistryModule
      userOp.preVerificationGas = '0xC350';    // 50K
    }

    userOp.signature = '0x';
    const epHashContract = new ethers.Contract(entryPoint, [
      'function getUserOpHash(tuple(address sender, uint256 nonce, bytes initCode, bytes callData, uint256 callGasLimit, uint256 verificationGasLimit, uint256 preVerificationGas, uint256 maxFeePerGas, uint256 maxPriorityFeePerGas, bytes paymasterAndData, bytes signature)) view returns (bytes32)'
    ], rpcProvider);
    const userOpHash = await epHashContract.getUserOpHash(userOp);
    log('userOpHash: ' + userOpHash);

    const personalSig = await signer.signMessage(ethers.getBytes(userOpHash));
    const rawSig = signer.signingKey
      ? ethers.Signature.from(signer.signingKey.sign(userOpHash)).serialized
      : null;

    const biconSigVariants = [
      { label: 'personal_sign + module', moduleSignature: personalSig },
      ...(rawSig ? [{ label: 'raw ECDSA + module', moduleSignature: rawSig }] : []),
    ];

    for (const sv of biconSigVariants) {
      if (success) break;
      userOp.signature = abiC2.encode(['bytes', 'address'], [sv.moduleSignature, ecdsaModule]);
      log('→ ' + sv.label);
      try {
        userOpHashResult = await bundlerRpc('eth_sendUserOperation', [userOp, entryPoint]);
        log('✓ Accepted: ' + sv.label, '#4ade80');
        success = true;
      } catch (e) {
        log('✗ ' + e.message.slice(0, 140), '#6b7280');
        if (e.message.includes('AA23') || e.message.includes('signature')) {
          for (const altModule of KNOWN_BICONOMY_MODULES) {
            if (success || altModule === ecdsaModule) continue;
            userOp.signature = abiC2.encode(['bytes', 'address'], [sv.moduleSignature, altModule]);
            log('→ Retrying with alternate module: ' + altModule);
            try {
              userOpHashResult = await bundlerRpc('eth_sendUserOperation', [userOp, entryPoint]);
              log('✓ Accepted with alternate module', '#4ade80');
              success = true;
            } catch (e2) {
              log('✗ ' + e2.message.slice(0, 100), '#6b7280');
            }
          }
        }
      }
    }

    if (!success) {
      throw new Error(
        'Signature rejected (AA23). Run Diagnose Account to confirm your wallet matches the registered owner. Module: ' + ecdsaModule
      );
    }

    // Poll for receipt
    log('Waiting for confirmation…');
    btn.innerHTML = '<span class="spinner"></span>Mining…';
    showAlert('txAlert', 'alert-info', '⏳ Waiting for transaction…');

    let receipt = null;
    for (let i = 0; i < 60; i++) {
      await new Promise(r => setTimeout(r, 3000));
      try {
        receipt = await bundlerRpc('eth_getUserOperationReceipt', [userOpHashResult]);
        if (receipt) break;
      } catch (_) {}
      if (i % 5 === 4) log('Still waiting… (' + ((i + 1) * 3) + 's)');
    }
    if (!receipt) throw new Error('Timed out waiting for receipt.');

    const txHash = receipt.receipt?.transactionHash || receipt.transactionHash;
    log('✓ Confirmed: ' + txHash, '#4ade80');
    document.getElementById('s3num').className = 'step-num done';
    document.getElementById('s3num').textContent = '✓';
    document.getElementById('resultCard').style.display = 'block';
    document.getElementById('txLink').href = net.explorer + txHash;
    document.getElementById('txLink').textContent = txHash;
    document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth' });
    showAlert('txAlert', 'alert-success', '✅ Withdrawal complete!');
    btn.textContent = 'Withdraw USDC';
    btn.disabled = false;
    currentBalance = null;
    checkBalance();

  } catch (e) {
    log('Error: ' + e.message, '#ef4444');
    btn.disabled = false;
    btn.textContent = 'Withdraw USDC';
    showAlert('txAlert', 'alert-error', '❌ ' + e.message);
  }
}
