// Network config: chainId, public RPC, native symbol, common tokens, block explorer
const NETWORKS = {
  base: {
    chainId: 8453, name: 'Base', rpc: 'https://mainnet.base.org',
    nativeSymbol: 'ETH', explorer: 'https://basescan.org/tx/',
    tokens: [
      { symbol: 'USDC',  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 },
      { symbol: 'USDT',  address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2', decimals: 6 },
      { symbol: 'WETH',  address: '0x4200000000000000000000000000000000000006', decimals: 18 },
      { symbol: 'DAI',   address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', decimals: 18 },
      { symbol: 'cbBTC', address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf', decimals: 8 },
    ],
  },
  ethereum: {
    chainId: 1, name: 'Ethereum', rpc: 'https://eth.llamarpc.com',
    nativeSymbol: 'ETH', explorer: 'https://etherscan.io/tx/',
    tokens: [
      { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 },
      { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },
      { symbol: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18 },
      { symbol: 'DAI',  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18 },
      { symbol: 'WBTC', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', decimals: 8 },
    ],
  },
  polygon: {
    chainId: 137, name: 'Polygon', rpc: 'https://polygon-rpc.com',
    nativeSymbol: 'POL', explorer: 'https://polygonscan.com/tx/',
    tokens: [
      { symbol: 'USDC',   address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', decimals: 6 },
      { symbol: 'USDT',   address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6 },
      { symbol: 'WETH',   address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', decimals: 18 },
      { symbol: 'DAI',    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', decimals: 18 },
      { symbol: 'WBTC',   address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', decimals: 8 },
      { symbol: 'WMATIC', address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', decimals: 18 },
    ],
  },
  optimism: {
    chainId: 10, name: 'Optimism', rpc: 'https://mainnet.optimism.io',
    nativeSymbol: 'ETH', explorer: 'https://optimistic.etherscan.io/tx/',
    tokens: [
      { symbol: 'USDC', address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', decimals: 6 },
      { symbol: 'USDT', address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', decimals: 6 },
      { symbol: 'WETH', address: '0x4200000000000000000000000000000000000006', decimals: 18 },
      { symbol: 'DAI',  address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', decimals: 18 },
      { symbol: 'WBTC', address: '0x68f180fcCe6836688e9084f035309E29Bf0A2095', decimals: 8 },
    ],
  },
  arbitrum: {
    chainId: 42161, name: 'Arbitrum', rpc: 'https://arb1.arbitrum.io/rpc',
    nativeSymbol: 'ETH', explorer: 'https://arbiscan.io/tx/',
    tokens: [
      { symbol: 'USDC', address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6 },
      { symbol: 'USDT', address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6 },
      { symbol: 'WETH', address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', decimals: 18 },
      { symbol: 'DAI',  address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', decimals: 18 },
      { symbol: 'WBTC', address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', decimals: 8 },
    ],
  },
};

const EP_V6 = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
const EIP1967_IMPL_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';

const SENTINEL_MODULES = '0x0000000000000000000000000000000000000001';

const KNOWN_BICONOMY_MODULES = [
  '0x0000001c5b32F37F5beA87BDD5374eB2aC54eA8e',
  '0x000000Dd8eB18e2D809Ad83D9c1AB48C3DC7dd7A',
];

const KNOWN_IMPLS = {
  '0x0000002512019dafb59528b82cb92d3c5d2423ac': 'Biconomy SmartAccount v2.0.0',
  '0x00000054a5e8b45bc2f37bd49e2fb7c3c19eb1bd': 'Biconomy SmartAccount v2.0.0 (alt)',
};

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

// Shared signer — set by either connectMetaMask() or loadKey().
let signer = null;
let eoaAddress = null;
let selectedNetwork = 'base';

// Asset state
let assetType = 'erc20';           // 'native' | 'erc20'
let nativeBalance = null;          // bigint (wei)
let checkedTokens = [];            // [{ address, symbol, decimals, rawBalance, formattedBalance }]
let withdrawTokenDecimals = 18;
let withdrawTokenSymbol = '';
let tokenResolveTimer = null;

// Populated by diagnoseAccount(); cached for withdraw.
let diagData = {
  entryPoint: null,
  implAddress: null,
  kernelVersion: null,
  defaultValidator: null,
  confirmedOwner: null,
  isBiconomy: false,
  ecdsaModule: null,
};

// Ethers v6 batches all pending calls into one HTTP request by default.
// Public RPCs (e.g. mainnet.base.org) cap batches at ~10 calls.
// batchMaxCount: 5 keeps every outgoing batch well within that limit
// while still sending calls in parallel.
function makeRpc() {
  const net = getNet();
  return new ethers.JsonRpcProvider(net.rpc, undefined, { batchMaxCount: 5 });
}

// ── UI helpers ──────────────────────────────────────────────────────────────

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

  // Update native symbol labels
  const sym = getNet().nativeSymbol;
  document.getElementById('assetNativeSymbol').textContent = sym;
  if (assetType === 'native') document.getElementById('amtLabel').textContent = sym;

  renderWithdrawPresets();

  checkedTokens = [];
  document.getElementById('tokenBalList').innerHTML = '';
  log('Network → ' + selectedNetwork);
}

// ── Asset type toggle ────────────────────────────────────────────────────────

function selectAssetType(type) {
  assetType = type;
  const net = getNet();
  document.getElementById('assetBtnNative').classList.toggle('active', type === 'native');
  document.getElementById('assetBtnErc20').classList.toggle('active', type === 'erc20');
  document.getElementById('tokenField').style.display = type === 'erc20' ? 'block' : 'none';
  document.getElementById('amtLabel').textContent = type === 'native' ? net.nativeSymbol : (withdrawTokenSymbol || 'tokens');
  document.getElementById('withdrawBtn').textContent = type === 'native'
    ? 'Withdraw ' + net.nativeSymbol
    : 'Withdraw ' + (withdrawTokenSymbol || 'Token');
}

// ── Wallet connection — MetaMask ─────────────────────────────────────────────

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

// ── Wallet connection — private key ─────────────────────────────────────────

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

// ── Balance check — scans native + all known tokens in parallel ───────────────

async function checkBalance() {
  const net = getNet();
  const sa = document.getElementById('smartAcct').value.trim();
  if (!ethers.isAddress(sa)) { showAlert('balanceAlert', 'alert-error', '❌ Invalid address.'); return; }

  hideAlert('balanceAlert');

  const btn = document.getElementById('checkBalBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="border-top-color:currentColor;"></span>Scanning…';

  document.getElementById('balanceWrap').style.display = 'block';
  const totalAssets = net.tokens.length + 1;
  document.getElementById('assetList').innerHTML =
    `<div class="scan-state">Scanning ${totalAssets} assets on ${net.name}…</div>`;

  try {
    const rpc = makeRpc();

    log('RPC: ' + net.rpc);
    log('Checking address: ' + sa);

    const checks = [
      rpc.getBalance(sa)
        .then(bal => {
          log(net.nativeSymbol + ': ' + ethers.formatEther(bal));
          return { type: 'native', symbol: net.nativeSymbol, balance: bal, decimals: 18, address: null };
        })
        .catch(e => { log('✗ ' + net.nativeSymbol + ' (native): ' + e.message, '#ef4444'); return null; }),
      ...net.tokens.map(tok => {
        const contract = new ethers.Contract(tok.address, ERC20_ABI, rpc);
        return contract.balanceOf(sa)
          .then(bal => {
            log(tok.symbol + ': ' + ethers.formatUnits(bal, tok.decimals));
            return { type: 'erc20', symbol: tok.symbol, balance: bal, decimals: tok.decimals, address: tok.address };
          })
          .catch(e => { log('✗ ' + tok.symbol + ': ' + e.message, '#ef4444'); return null; });
      }),
    ];

    // Run balance checks and fee data fetch in parallel
    const [results, feeData] = await Promise.all([
      Promise.all(checks),
      rpc.getFeeData().catch(() => null),
    ]);
    const valid = results.filter(Boolean);
    const nonZero = valid.filter(r => r.balance > 0n);

    // Cache for MAX button / withdraw prefill
    const nativeResult = valid.find(r => r.type === 'native');
    nativeBalance = nativeResult?.balance ?? null;
    checkedTokens = valid
      .filter(r => r.type === 'erc20')
      .map(r => ({
        address: r.address,
        symbol: r.symbol,
        decimals: r.decimals,
        rawBalance: r.balance,
        formattedBalance: ethers.formatUnits(r.balance, r.decimals),
      }));

    // Compute realistic gas threshold from current fee data.
    // ~350k gas units covers a typical Biconomy UserOp (100k call + 200k verify + 50k preVerify).
    const GAS_UNITS = 350_000n;
    const gasPrice = feeData?.maxFeePerGas ?? feeData?.gasPrice ?? ethers.parseUnits('1', 'gwei');
    const minForGas = GAS_UNITS * gasPrice;
    const minForGasEth = parseFloat(ethers.formatEther(minForGas)).toFixed(6);

    const warnEl = document.getElementById('ethBalWarn');
    if (!nativeBalance || nativeBalance === 0n) {
      warnEl.textContent = '⚠ No ' + net.nativeSymbol + ' for gas — fund this account before withdrawing';
      warnEl.className = 'eth-warn bad';
    } else if (nativeBalance < minForGas) {
      warnEl.textContent = '⚠ May not cover gas — have ' + parseFloat(ethers.formatEther(nativeBalance)).toFixed(6) + ', need ~' + minForGasEth + ' ' + net.nativeSymbol;
      warnEl.className = 'eth-warn warn';
    } else {
      warnEl.textContent = '✓ Sufficient for gas (~' + minForGasEth + ' ' + net.nativeSymbol + ' estimated)';
      warnEl.className = 'eth-warn good';
    }

    renderAssetList(nonZero);
    renderWithdrawPresets();
    document.getElementById('assetNativeSymbol').textContent = net.nativeSymbol;

    document.getElementById('s2num').className = 'step-num done';
    document.getElementById('s2num').textContent = '✓';
    document.getElementById('withdrawBtn').disabled = false;

    if (nonZero.length === 0) {
      showAlert('balanceAlert', 'alert-warn', '⚠️ No assets found on ' + net.name + '. Check the network selection.');
      showAlert('txAlert', 'alert-warn', '⚠️ No assets found — check network.');
    } else {
      showAlert('txAlert', 'alert-success', '✓ Found ' + nonZero.length + ' asset' + (nonZero.length !== 1 ? 's' : '') + '. Click Withdraw → on any asset to begin.');
    }

    log('Scanned ' + totalAssets + ' assets on ' + net.name + ' — ' + nonZero.length + ' non-zero', '#4ade80');

  } catch (e) {
    document.getElementById('assetList').innerHTML = '';
    showAlert('balanceAlert', 'alert-error', '❌ ' + e.message);
  }

  btn.disabled = false;
  btn.textContent = 'Check Balance';
}

function renderAssetList(assets) {
  const list = document.getElementById('assetList');
  if (assets.length === 0) {
    list.innerHTML = '<div class="scan-state" style="color:var(--muted);">No assets with a balance found on this network.</div>';
    return;
  }
  const net = getNet();
  list.innerHTML = assets.map(a => {
    const formatted = ethers.formatUnits(a.balance, a.decimals);
    const display = parseFloat(formatted).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
    const subtext = a.type === 'native'
      ? 'Native · ' + net.name
      : a.address.slice(0, 10) + '…' + a.address.slice(-4);
    const onClick = a.type === 'native'
      ? `prefillWithdrawNative('${formatted}')`
      : `prefillWithdraw('${a.address}','${a.symbol}',${a.decimals},'${formatted}')`;
    return `<div class="asset-row">
      <div class="asset-left">
        <div class="asset-symbol">${a.symbol}</div>
        <div class="asset-subtext">${subtext}</div>
      </div>
      <div class="asset-right">
        <div class="asset-bal">${display}</div>
        <button class="tok-withdraw-btn" onclick="${onClick}">Withdraw →</button>
      </div>
    </div>`;
  }).join('');
}

// Add a custom token the user pastes in — appends to the asset list if non-zero
async function checkCustomToken() {
  const sa = document.getElementById('smartAcct').value.trim();
  if (!ethers.isAddress(sa)) { showAlert('balanceAlert', 'alert-error', '❌ Enter the smart account address first.'); return; }

  const addr = document.getElementById('customTokenAddr').value.trim();
  if (!ethers.isAddress(addr)) { showAlert('balanceAlert', 'alert-error', '❌ Invalid token address.'); return; }

  const net = getNet();
  const rpc = makeRpc();
  try {
    const token = new ethers.Contract(addr, ERC20_ABI, rpc);
    const [symR, decR, balR] = await Promise.allSettled([token.symbol(), token.decimals(), token.balanceOf(sa)]);
    const sym = symR.status === 'fulfilled' ? symR.value : addr.slice(0, 8) + '…';
    const dec = decR.status === 'fulfilled' ? Number(decR.value) : 18;
    const bal = balR.status === 'fulfilled' ? balR.value : 0n;
    const formatted = ethers.formatUnits(bal, dec);

    // Update cache
    const idx = checkedTokens.findIndex(t => t.address.toLowerCase() === addr.toLowerCase());
    const entry = { address: addr, symbol: sym, decimals: dec, rawBalance: bal, formattedBalance: formatted };
    if (idx >= 0) checkedTokens[idx] = entry;
    else checkedTokens.push(entry);

    if (bal === 0n) {
      showAlert('balanceAlert', 'alert-warn', '⚠️ ' + sym + ' balance is zero on this account.');
    } else {
      hideAlert('balanceAlert');
      // Rebuild asset list with all current non-zero assets
      const allAssets = [];
      if (nativeBalance && nativeBalance > 0n)
        allAssets.push({ type: 'native', symbol: net.nativeSymbol, balance: nativeBalance, decimals: 18, address: null });
      for (const t of checkedTokens) {
        if (t.rawBalance > 0n)
          allAssets.push({ type: 'erc20', symbol: t.symbol, balance: t.rawBalance, decimals: t.decimals, address: t.address });
      }
      renderAssetList(allAssets);
      document.getElementById('customTokenAddr').value = '';
    }
    log(sym + ': ' + parseFloat(formatted).toFixed(6), bal > 0n ? '#4ade80' : '#6b7280');
  } catch (e) {
    showAlert('balanceAlert', 'alert-error', '❌ ' + e.message);
  }
}

// Quick-fill the withdraw form from an asset row
function prefillWithdraw(address, symbol, decimals, balance) {
  selectAssetType('erc20');
  document.getElementById('withdrawTokenAddr').value = address;
  withdrawTokenDecimals = decimals;
  withdrawTokenSymbol = symbol;
  document.getElementById('tokenResolveInfo').textContent = '✓ ' + symbol + ' · ' + decimals + ' decimals';
  document.getElementById('amtLabel').textContent = symbol;
  document.getElementById('withdrawBtn').textContent = 'Withdraw ' + symbol;
  document.getElementById('amount').value = parseFloat(balance).toFixed(Math.min(decimals, 6));
  document.getElementById('withdrawBtn').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function prefillWithdrawNative(balance) {
  const net = getNet();
  selectAssetType('native');
  // Reserve a small amount for gas
  const reserve = 0.002;
  const available = Math.max(0, parseFloat(balance) - reserve);
  document.getElementById('amount').value = available.toFixed(6);
  document.getElementById('withdrawBtn').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Token presets in Step 3 ──────────────────────────────────────────────────

function renderWithdrawPresets() {
  const net = getNet();
  const container = document.getElementById('withdrawPresets');
  container.innerHTML = '';
  for (const tok of net.tokens) {
    const btn = document.createElement('button');
    btn.className = 'tok-btn';
    btn.textContent = tok.symbol;
    btn.onclick = () => {
      document.getElementById('withdrawTokenAddr').value = tok.address;
      withdrawTokenDecimals = tok.decimals;
      withdrawTokenSymbol = tok.symbol;
      document.getElementById('tokenResolveInfo').textContent = '✓ ' + tok.symbol + ' · ' + tok.decimals + ' decimals';
      document.getElementById('amtLabel').textContent = tok.symbol;
      document.getElementById('withdrawBtn').textContent = 'Withdraw ' + tok.symbol;
    };
    container.appendChild(btn);
  }
}

// Debounced auto-resolve when user types a custom token address in Step 3
function scheduleTokenResolve() {
  clearTimeout(tokenResolveTimer);
  tokenResolveTimer = setTimeout(resolveWithdrawToken, 600);
}

async function resolveWithdrawToken() {
  const addr = document.getElementById('withdrawTokenAddr').value.trim();
  const infoEl = document.getElementById('tokenResolveInfo');
  if (!ethers.isAddress(addr)) { infoEl.textContent = ''; return; }

  // Check against already-fetched token presets first
  const net = getNet();
  const preset = net.tokens.find(t => t.address.toLowerCase() === addr.toLowerCase());
  if (preset) {
    withdrawTokenDecimals = preset.decimals;
    withdrawTokenSymbol = preset.symbol;
    infoEl.textContent = '✓ ' + preset.symbol + ' · ' + preset.decimals + ' decimals';
    document.getElementById('amtLabel').textContent = preset.symbol;
    document.getElementById('withdrawBtn').textContent = 'Withdraw ' + preset.symbol;
    return;
  }

  // Also check already checked tokens cache
  const cached = checkedTokens.find(t => t.address.toLowerCase() === addr.toLowerCase());
  if (cached) {
    withdrawTokenDecimals = cached.decimals;
    withdrawTokenSymbol = cached.symbol;
    infoEl.textContent = '✓ ' + cached.symbol + ' · ' + cached.decimals + ' decimals';
    document.getElementById('amtLabel').textContent = cached.symbol;
    document.getElementById('withdrawBtn').textContent = 'Withdraw ' + cached.symbol;
    return;
  }

  infoEl.textContent = 'Resolving…';
  try {
    const rpc = makeRpc();
    const token = new ethers.Contract(addr, ERC20_ABI, rpc);
    const [symR, decR] = await Promise.allSettled([token.symbol(), token.decimals()]);
    const sym = symR.status === 'fulfilled' ? symR.value : '???';
    const dec = decR.status === 'fulfilled' ? Number(decR.value) : 18;
    withdrawTokenDecimals = dec;
    withdrawTokenSymbol = sym;
    infoEl.textContent = '✓ ' + sym + ' · ' + dec + ' decimals';
    document.getElementById('amtLabel').textContent = sym;
    document.getElementById('withdrawBtn').textContent = 'Withdraw ' + sym;
  } catch (e) {
    infoEl.textContent = '⚠ Could not resolve — check address and network';
  }
}

// ── MAX button ───────────────────────────────────────────────────────────────

async function setMax() {
  const sa = document.getElementById('smartAcct').value.trim();
  if (!ethers.isAddress(sa)) return;

  if (assetType === 'native') {
    if (nativeBalance === null) return;
    // Reserve ~0.002 ETH for gas
    const reserve = ethers.parseEther('0.002');
    const available = nativeBalance > reserve ? nativeBalance - reserve : 0n;
    document.getElementById('amount').value = ethers.formatEther(available);
  } else {
    const tokenAddr = document.getElementById('withdrawTokenAddr').value.trim();
    if (!ethers.isAddress(tokenAddr)) return;

    // Try cache first
    const cached = checkedTokens.find(t => t.address.toLowerCase() === tokenAddr.toLowerCase());
    if (cached) {
      document.getElementById('amount').value = parseFloat(cached.formattedBalance).toFixed(Math.min(cached.decimals, 6));
      return;
    }

    // Fetch live
    try {
      const net = getNet();
      const rpc = makeRpc();
      const token = new ethers.Contract(tokenAddr, ERC20_ABI, rpc);
      const raw = await token.balanceOf(sa);
      document.getElementById('amount').value = ethers.formatUnits(raw, withdrawTokenDecimals);
    } catch (e) {
      log('Could not fetch token balance for MAX: ' + e.message, '#f59e0b');
    }
  }
}

// ── Storage helpers ──────────────────────────────────────────────────────────

function addrFromSlot(raw) {
  if (!raw || raw === '0x' + '0'.repeat(64)) return null;
  const addr = ethers.getAddress('0x' + raw.slice(-40));
  return addr === ethers.ZeroAddress ? null : addr;
}

function diagRow(label, value, cls) {
  return `<div class="diag-row"><span class="diag-label">${label}</span><span class="diag-val ${cls || ''}">${value}</span></div>`;
}

// ── Account diagnostics ──────────────────────────────────────────────────────

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

  const rpc = makeRpc();
  let html = '';

  try {
    html += '<div class="diag-section">A. CONTRACT</div>';
    const code = await rpc.getCode(sa);
    const codeBytes = (code.length - 2) / 2;
    html += diagRow('Address', sa);
    html += diagRow('Code size', codeBytes + ' bytes' + (codeBytes < 200 ? '  (proxy)' : ''));
    html += diagRow('Bytecode head', code.slice(0, 60) + '…');

    if (code === '0x') {
      html += diagRow('STATUS', 'NO CONTRACT — wrong address or network?', 'bad');
      diagEl.innerHTML = html;
      btn.disabled = false; btn.textContent = 'Diagnose Account';
      return;
    }

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
        }
      } else {
        html += diagRow('  → Self-slot', 'empty', 'warn');
      }
    }

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
    html += diagRow('Native balance', ethers.formatEther(ethBal) + ' ' + net.nativeSymbol, ethBal > 0n ? 'good' : 'bad');

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

    html += diagRow('— sequential 0–5 —', '');
    for (let i = 0; i < 6; i++) {
      await scanSlot('0x' + i.toString(16).padStart(64, '0'), 'seq[' + i + ']');
    }

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

    html += '<div class="diag-section">E. ACCOUNT CALLS</div>';
    try {
      const acct = new ethers.Contract(sa, ['function implementation() view returns (address)'], rpc);
      const imp = await acct.implementation();
      html += diagRow('implementation()', imp, 'good');
      if (!diagData.implAddress) diagData.implAddress = imp;
    } catch (_) {}

    html += '<div class="diag-section">F. OWNER LOOKUP</div>';
    const validatorsToCheck = [];
    for (const m of biconEnabledModules) if (!validatorsToCheck.includes(m)) validatorsToCheck.push(m);
    for (const m of KNOWN_BICONOMY_MODULES) if (!validatorsToCheck.includes(m)) validatorsToCheck.push(m);
    for (const a of storageAddrs) if (!validatorsToCheck.includes(a)) validatorsToCheck.push(a);

    html += diagRow('Candidates', validatorsToCheck.length + ' addresses');

    let confirmedOwner = null;
    const ownerFns = [
      { sig: 'function getOwner(address) view returns (address)',                name: 'getOwner' },
      { sig: 'function smartAccountOwners(address) view returns (address)',      name: 'smartAccountOwners' },
      { sig: 'function owner(address) view returns (address)',                   name: 'owner' },
      { sig: 'function ecdsaValidatorStorage(address) view returns (address)',   name: 'ecdsaValidatorStorage' },
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
                const abiCoder2 = ethers.AbiCoder.defaultAbiCoder();
                const ownerSlot = ethers.keccak256(abiCoder2.encode(['address', 'uint256'], [sa, base]));
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

// ── Withdraw ─────────────────────────────────────────────────────────────────

async function withdraw() {
  if (!signer) { showAlert('txAlert', 'alert-error', '❌ Connect a wallet first.'); return; }

  const net        = getNet();
  const smartAcct  = document.getElementById('smartAcct').value.trim();
  const dest       = document.getElementById('destAddr').value.trim();
  const amtStr     = document.getElementById('amount').value.trim();
  const bundlerUrl = document.getElementById('bundlerUrl').value.trim();

  if (!ethers.isAddress(smartAcct)) { showAlert('txAlert', 'alert-error', '❌ Invalid smart account address.'); return; }
  if (!ethers.isAddress(dest))      { showAlert('txAlert', 'alert-error', '❌ Invalid destination address.'); return; }
  if (!amtStr || parseFloat(amtStr) <= 0) { showAlert('txAlert', 'alert-error', '❌ Enter an amount greater than 0.'); return; }
  if (!bundlerUrl) { showAlert('txAlert', 'alert-error', '❌ Enter a bundler RPC URL.'); return; }

  // ERC-20 specific validation
  let tokenAddr = null;
  if (assetType === 'erc20') {
    tokenAddr = document.getElementById('withdrawTokenAddr').value.trim();
    if (!ethers.isAddress(tokenAddr)) { showAlert('txAlert', 'alert-error', '❌ Enter a valid token contract address.'); return; }
    if (!withdrawTokenSymbol) { showAlert('txAlert', 'alert-warn', '⚠️ Token not resolved yet. Enter address or pick a preset.'); return; }
  }

  const btn = document.getElementById('withdrawBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Preparing…';
  const rpcProvider = makeRpc();

  function getBundlerUrl() {
    return bundlerUrl.includes('pimlico.io') ? bundlerUrl.replace('/v2/', '/v1/') : bundlerUrl;
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
    const [ethBal, feeData, code] = await Promise.all([
      rpcProvider.getBalance(smartAcct),
      rpcProvider.getFeeData(),
      rpcProvider.getCode(smartAcct),
    ]);

    if (ethBal === 0n) {
      btn.disabled = false;
      btn.textContent = 'Withdraw ' + (assetType === 'native' ? net.nativeSymbol : withdrawTokenSymbol || 'Token');
      showAlert('txAlert', 'alert-error', '❌ Smart account has no native token for gas. Send a small amount first.');
      return;
    }
    if (code === '0x') throw new Error('No contract at this address.');

    const entryPoint = EP_V6;
    log('EntryPoint: v0.6');

    const epc = new ethers.Contract(entryPoint, ['function getNonce(address,uint192) view returns (uint256)'], rpcProvider);
    const nonce = await epc.getNonce(smartAcct, 0);
    log('Nonce: ' + nonce.toString());

    // Build callData based on asset type
    const executeIface = new ethers.Interface(['function execute(address dest, uint256 value, bytes calldata func)']);
    let callData;

    if (assetType === 'native') {
      const amountWei = ethers.parseEther(amtStr);
      callData = executeIface.encodeFunctionData('execute', [dest, amountWei, '0x']);
      log('Native transfer: ' + amtStr + ' ' + net.nativeSymbol + ' → ' + dest);
    } else {
      const amountRaw = ethers.parseUnits(amtStr, withdrawTokenDecimals);
      const erc20Iface = new ethers.Interface(ERC20_ABI);
      const transferData = erc20Iface.encodeFunctionData('transfer', [dest, amountRaw]);
      callData = executeIface.encodeFunctionData('execute', [tokenAddr, 0n, transferData]);
      log('ERC-20 transfer: ' + amtStr + ' ' + withdrawTokenSymbol + ' → ' + dest);
    }

    const maxFeePerGas = feeData.maxFeePerGas ?? feeData.gasPrice ?? ethers.parseUnits('1', 'gwei');
    const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? ethers.parseUnits('1', 'gwei');

    let success = false;
    let userOpHashResult = null;

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
      log('Gas estimate failed: ' + e.message.slice(0, 120), '#f59e0b');
      if (e.message.includes('AA21') || e.message.includes('prefund')) {
        const requiredPrefund = 350_000n * maxFeePerGas;
        throw new Error(
          'Not enough ' + net.nativeSymbol + ' for gas (AA21). ' +
          'Have ' + parseFloat(ethers.formatEther(ethBal)).toFixed(6) + ', ' +
          'need ~' + parseFloat(ethers.formatEther(requiredPrefund)).toFixed(6) + ' ' + net.nativeSymbol + '.'
        );
      }
      log('Using fixed gas limits', '#f59e0b');
      userOp.callGasLimit         = '0x186A0';
      userOp.verificationGasLimit = '0x30D40';
      userOp.preVerificationGas   = '0xC350';
    }

    // Verify the account can actually pay the prefund before signing
    const totalGasUnits = BigInt(userOp.callGasLimit) + BigInt(userOp.verificationGasLimit) + BigInt(userOp.preVerificationGas);
    const requiredPrefund = totalGasUnits * maxFeePerGas;
    if (ethBal < requiredPrefund) {
      const shortfall = parseFloat(ethers.formatEther(requiredPrefund - ethBal)).toFixed(6);
      throw new Error(
        'Not enough ' + net.nativeSymbol + ' for gas. ' +
        'Have ' + parseFloat(ethers.formatEther(ethBal)).toFixed(6) + ', ' +
        'need ' + parseFloat(ethers.formatEther(requiredPrefund)).toFixed(6) + ' ' + net.nativeSymbol + '. ' +
        'Send ' + shortfall + ' more ' + net.nativeSymbol + ' to the smart account.'
      );
    }
    log('Prefund check: ' + parseFloat(ethers.formatEther(ethBal)).toFixed(6) + ' available, ' + parseFloat(ethers.formatEther(requiredPrefund)).toFixed(6) + ' required', '#4ade80');

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

    let lastError = null;

    for (const sv of biconSigVariants) {
      if (success) break;
      userOp.signature = abiC2.encode(['bytes', 'address'], [sv.moduleSignature, ecdsaModule]);
      log('→ ' + sv.label);
      try {
        userOpHashResult = await bundlerRpc('eth_sendUserOperation', [userOp, entryPoint]);
        log('✓ Accepted: ' + sv.label, '#4ade80');
        success = true;
      } catch (e) {
        lastError = e;
        log('✗ ' + e.message.slice(0, 140), '#6b7280');

        // AA21 = not enough ETH for gas — retrying with a different signature won't help
        if (e.message.includes('AA21')) break;

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
              lastError = e2;
              log('✗ ' + e2.message.slice(0, 100), '#6b7280');
            }
          }
        }
      }
    }

    if (!success) {
      const msg = lastError?.message || '';
      if (msg.includes('AA21') || msg.includes('prefund')) {
        throw new Error(
          'Not enough ETH for gas (AA21). The smart account only has ' +
          (nativeBalance ? parseFloat(ethers.formatEther(nativeBalance)).toFixed(6) : '0') +
          ' ETH — send at least 0.001 ETH to it and try again.'
        );
      }
      if (msg.includes('AA25') || msg.includes('nonce')) {
        throw new Error('Nonce error (AA25) — the account nonce changed mid-operation. Please try again.');
      }
      throw new Error(
        'Signature rejected (AA23). Run Diagnose Account to confirm your wallet matches the registered owner. Module: ' + ecdsaModule
      );
    }

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

    const withdrawLabel = assetType === 'native' ? net.nativeSymbol : (withdrawTokenSymbol || 'Token');
    btn.textContent = 'Withdraw ' + withdrawLabel;
    btn.disabled = false;

    // Refresh balances
    nativeBalance = null;
    checkedTokens = [];
    checkBalance();

  } catch (e) {
    log('Error: ' + e.message, '#ef4444');
    btn.disabled = false;
    const withdrawLabel = assetType === 'native' ? net.nativeSymbol : (withdrawTokenSymbol || 'Token');
    btn.textContent = 'Withdraw ' + withdrawLabel;
    showAlert('txAlert', 'alert-error', '❌ ' + e.message);
  }
}

// Initialise withdraw presets on load
renderWithdrawPresets();
