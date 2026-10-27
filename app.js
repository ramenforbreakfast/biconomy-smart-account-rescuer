// Network config: chainId, public RPC, native symbol, common tokens, block explorer
const NETWORKS = {
  base: {
    chainId: 8453, name: 'Base', rpcs: ['https://mainnet.base.org', 'https://base-rpc.publicnode.com'],
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
    chainId: 1, name: 'Ethereum', rpcs: ['https://ethereum-rpc.publicnode.com', 'https://cloudflare-eth.com'],
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
    chainId: 137, name: 'Polygon', rpcs: ['https://polygon-bor-rpc.publicnode.com', 'https://polygon.drpc.org'],
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
    chainId: 10, name: 'Optimism', rpcs: ['https://mainnet.optimism.io', 'https://optimism-rpc.publicnode.com'],
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
    chainId: 42161, name: 'Arbitrum', rpcs: ['https://arb1.arbitrum.io/rpc', 'https://arbitrum-one-rpc.publicnode.com'],
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
const BICONOMY_ADDRESS_RESOLVER = '0x00000E81673606e07fC79CE5F1b3B26957844468';
const ADDRESS_RESOLVER_ABI = [
  'function resolveAddresses(address,uint8) view returns (tuple(address accountAddress,address factoryAddress,address currentImplementation,string currentVersion,string factoryVersion,uint256 deploymentIndex)[])',
];
const MAX_BICONOMY_ACCOUNT_INDEX = 10;

const SENTINEL_MODULES = '0x0000000000000000000000000000000000000001';

const KNOWN_BICONOMY_MODULES = [
  '0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e',
  '0x000000dd8eb18e2d809ad83d9c1ab48c3dc7dd7a',
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
let walletConnectionType = null;
let selectedNetwork = 'base';
let discoveryRunId = 0;
let balanceScanRunId = 0;
let discoveredAccounts = [];
const verifiedAccounts = new Set();

// Asset state
let assetType = 'erc20';           // 'native' | 'erc20'
let nativeBalance = null;          // bigint (wei)
let checkedTokens = [];            // [{ address, symbol, decimals, rawBalance, formattedBalance }]
let withdrawTokenDecimals = 18;
let withdrawTokenSymbol = '';
let resolvedTokenAddress = null;
let tokenResolveTimer = null;

function emptyDiagData() {
  return {
    entryPoint: null,
    implAddress: null,
    kernelVersion: null,
    defaultValidator: null,
    confirmedOwner: null,
    isBiconomy: false,
    ecdsaModule: null,
  };
}

// Populated by diagnoseAccount(); cached for withdraw.
let diagData = emptyDiagData();

// Ethers v6 batches all pending calls into one HTTP request by default.
// Public RPCs (e.g. mainnet.base.org) cap batches at ~10 calls.
// batchMaxCount: 5 keeps every outgoing batch well within that limit
// while still sending calls in parallel.
function makeRpc(networkKey = selectedNetwork) {
  const net = getNet(networkKey);
  const providers = net.rpcs.map((url, index) => ({
    provider: new ethers.JsonRpcProvider(url, net.chainId, { batchMaxCount: 5, staticNetwork: true }),
    priority: index + 1,
    stallTimeout: 1_500,
    weight: 1,
  }));
  return new ethers.FallbackProvider(providers, net.chainId, { quorum: 1 });
}

// Retry an async call with exponential backoff + ±40% random jitter so
// concurrent retries (e.g. 5 tokens all failing together) don't re-hammer
// the RPC at the same millisecond.
async function withRetry(fn, maxRetries = 3, baseDelayMs = 400) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      if (attempt === maxRetries) throw e;
      const jitter = 0.6 + Math.random() * 0.8; // 0.6–1.4×
      await new Promise(r => setTimeout(r, baseDelayMs * Math.pow(2, attempt) * jitter));
    }
  }
}

function errorMessage(error) {
  if (error && typeof error.message === 'string') return error.message;
  return String(error || 'Unknown error');
}

function fmtFetchErr(error) {
  if (error?.code === 'CALL_EXCEPTION') return 'contract call failed (skipped)';
  if (error?.code === 'BAD_DATA') return 'bad RPC response (skipped)';
  return errorMessage(error).slice(0, 160);
}

// ── UI helpers ──────────────────────────────────────────────────────────────

const MAX_LOG_ROWS = 500;

function log(msg, color) {
  const el = document.getElementById('debugLog');
  const ts = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const row = document.createElement('div');
  row.style.color = /^#[0-9a-f]{6}$/i.test(color || '') ? color : '#9ca3af';
  const timestamp = document.createElement('span');
  timestamp.style.color = '#3b3f4a';
  timestamp.textContent = '[' + ts + ']';
  row.append(timestamp, document.createTextNode(' ' + String(msg)));
  el.appendChild(row);
  while (el.children.length > MAX_LOG_ROWS) el.firstElementChild.remove();
  el.scrollTop = el.scrollHeight;
}

function showAlert(id, type, msg) {
  const el = document.getElementById(id);
  el.className = `alert ${type} visible`;
  el.textContent = String(msg);
}

function hideAlert(id) {
  const el = document.getElementById(id);
  el.className = 'alert';
  el.textContent = '';
}

function getNet(networkKey = selectedNetwork) { return NETWORKS[networkKey] || NETWORKS.base; }

function selectNetwork(btn) {
  const networkKey = btn.getAttribute('data-net');
  if (!NETWORKS[networkKey]) return;
  selectedNetwork = networkKey;
  balanceScanRunId++;
  scanInProgress = false;
  document.querySelectorAll('.net-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Update native symbol labels
  const sym = getNet().nativeSymbol;
  document.getElementById('assetNativeSymbol').textContent = sym;
  if (assetType === 'native') document.getElementById('amtLabel').textContent = sym;

  renderWithdrawPresets();

  checkedTokens = [];
  nativeBalance = null;
  diagData = emptyDiagData();
  resolvedTokenAddress = null;
  withdrawTokenSymbol = '';
  document.getElementById('assetList').replaceChildren();
  document.getElementById('balanceWrap').style.display = 'none';
  document.getElementById('withdrawTokenAddr').value = '';
  document.getElementById('tokenResolveInfo').textContent = '';
  document.getElementById('withdrawBtn').disabled = true;
  document.getElementById('diagResults').className = 'diag-results';
  document.getElementById('checkBalBtn').disabled = !ethers.isAddress(document.getElementById('smartAcct').value.trim());
  hideAlert('balanceAlert');
  showAlert('txAlert', 'alert-warn', '⚠️ Check the balance on ' + getNet().name + ' before withdrawing.');
  log('Network → ' + selectedNetwork);
}

// ── Smart-account discovery ─────────────────────────────────────────────────

function accountKey(networkKey, address) {
  return networkKey + ':' + address.toLowerCase();
}

function shortAddress(address) {
  return address.slice(0, 8) + '…' + address.slice(-6);
}

function setDiscoveryStatus(type, message) {
  const el = document.getElementById('discoveryStatus');
  el.className = 'discovery-status' + (type ? ' ' + type : '');
  el.textContent = message;
}

function setSelectedNetwork(networkKey) {
  const button = Array.from(document.querySelectorAll('.net-btn'))
    .find(candidate => candidate.getAttribute('data-net') === networkKey);
  if (button) selectNetwork(button);
}

async function verifySmartAccountOwner(accountAddress, networkKey, expectedOwner) {
  const rpc = makeRpc(networkKey);
  const ownerAbi = [
    'function getOwner(address) view returns (address)',
    'function smartAccountOwners(address) view returns (address)',
    'function owner(address) view returns (address)',
    'function ecdsaValidatorStorage(address) view returns (address)',
  ];

  for (const moduleAddress of KNOWN_BICONOMY_MODULES) {
    const module = new ethers.Contract(moduleAddress, ownerAbi, rpc);
    for (const method of ['getOwner', 'smartAccountOwners', 'owner', 'ecdsaValidatorStorage']) {
      try {
        const owner = await module[method](accountAddress);
        if (owner !== ethers.ZeroAddress && owner.toLowerCase() === expectedOwner.toLowerCase()) {
          return { owner: ethers.getAddress(owner), module: ethers.getAddress(moduleAddress) };
        }
      } catch (_) {}
    }
  }
  return null;
}

async function resolveAccountsOnNetwork(networkKey, ownerAddress) {
  const rpc = makeRpc(networkKey);
  const resolverCode = await withRetry(() => rpc.getCode(BICONOMY_ADDRESS_RESOLVER), 1);
  if (resolverCode === '0x') return [];

  const resolver = new ethers.Contract(BICONOMY_ADDRESS_RESOLVER, ADDRESS_RESOLVER_ABI, rpc);
  const resolved = await withRetry(
    () => resolver.resolveAddresses(ownerAddress, MAX_BICONOMY_ACCOUNT_INDEX),
    1,
  );

  const verified = await Promise.all(resolved.map(async item => {
    const accountAddress = ethers.getAddress(item.accountAddress);
    const ownership = await verifySmartAccountOwner(accountAddress, networkKey, ownerAddress);
    if (!ownership) {
      log('Skipped unverified account ' + accountAddress + ' on ' + getNet(networkKey).name, '#f59e0b');
      return null;
    }
    return {
      networkKey,
      address: accountAddress,
      owner: ownership.owner,
      module: ownership.module,
      version: String(item.currentVersion || ''),
      deploymentIndex: item.deploymentIndex.toString(),
    };
  }));

  return verified.filter(Boolean);
}

function renderDiscoveredAccounts() {
  const container = document.getElementById('discoveredAccounts');
  container.replaceChildren();

  for (const account of discoveredAccounts) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'account-option';
    button.dataset.accountKey = accountKey(account.networkKey, account.address);

    const heading = document.createElement('span');
    heading.className = 'account-option-heading';
    heading.textContent = getNet(account.networkKey).name + ' recovery account';
    const address = document.createElement('span');
    address.className = 'account-option-address';
    address.textContent = account.address;
    const owner = document.createElement('span');
    owner.className = 'account-option-owner';
    owner.textContent = 'Controlled by ' + shortAddress(account.owner) + ' · ownership verified';
    button.append(heading, address, owner);
    button.addEventListener('click', () => selectDiscoveredAccount(account));
    container.appendChild(button);
  }
}

function selectDiscoveredAccount(account) {
  setSelectedNetwork(account.networkKey);
  document.getElementById('smartAcct').value = account.address;
  document.getElementById('checkBalBtn').disabled = false;
  verifiedAccounts.add(accountKey(account.networkKey, account.address));
  diagData.ecdsaModule = account.module;

  document.querySelectorAll('.account-option').forEach(button => {
    button.classList.toggle('selected', button.dataset.accountKey === accountKey(account.networkKey, account.address));
  });
  setDiscoveryStatus(
    'success',
    '✓ Recovery account found on ' + getNet(account.networkKey).name + '. Its ownership matches your exported wallet.',
  );
  hideAlert('balanceAlert');
  log('Selected verified account: ' + account.address + ' on ' + getNet(account.networkKey).name, '#4ade80');
}

async function discoverSmartAccounts() {
  if (!eoaAddress) return;
  const runId = ++discoveryRunId;
  const retryButton = document.getElementById('retryDiscoveryBtn');
  retryButton.hidden = true;
  retryButton.disabled = true;
  discoveredAccounts = [];
  document.getElementById('discoveredAccounts').replaceChildren();
  document.getElementById('smartAcct').value = '';
  document.getElementById('checkBalBtn').disabled = true;
  setDiscoveryStatus('loading', 'Searching supported networks for Biconomy recovery accounts…');
  log('Searching for Biconomy accounts controlled by ' + eoaAddress);

  const searches = await Promise.allSettled(
    Object.keys(NETWORKS).map(networkKey => resolveAccountsOnNetwork(networkKey, eoaAddress)),
  );
  if (runId !== discoveryRunId) return;

  const unique = new Map();
  searches.forEach(result => {
    if (result.status !== 'fulfilled') {
      log('Account search skipped an unavailable network: ' + fmtFetchErr(result.reason), '#6b7280');
      return;
    }
    result.value.forEach(account => unique.set(accountKey(account.networkKey, account.address), account));
  });
  discoveredAccounts = Array.from(unique.values());
  renderDiscoveredAccounts();
  retryButton.hidden = false;
  retryButton.disabled = false;

  if (discoveredAccounts.length === 0) {
    setDiscoveryStatus(
      'warn',
      'No verified Biconomy recovery account was found. Try Search Again, or use the manual fallback under Advanced troubleshooting.',
    );
    log('No verified Biconomy accounts found', '#f59e0b');
    return;
  }

  if (discoveredAccounts.length === 1) {
    selectDiscoveredAccount(discoveredAccounts[0]);
  } else {
    setDiscoveryStatus('success', '✓ Found ' + discoveredAccounts.length + ' verified recovery accounts. Choose the one you want to scan.');
    log('Found ' + discoveredAccounts.length + ' verified Biconomy accounts', '#4ade80');
  }
}

// ── Asset type toggle ────────────────────────────────────────────────────────

function selectAssetType(type) {
  hideAlert('txAlert');
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

  const connectButton = document.getElementById('connectMetaMaskBtn');
  connectButton.disabled = true;
  connectButton.textContent = 'Opening MetaMask…';
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    showMetaMaskAccountChooser(accounts);
  } catch (e) {
    showAlert('connectAlert', 'alert-error', '❌ ' + errorMessage(e));
  } finally {
    if (walletConnectionType !== 'metamask') {
      connectButton.disabled = false;
      connectButton.textContent = 'Refresh MetaMask Accounts';
    }
  }
}

function normalizeMetaMaskAccounts(accounts) {
  const uniqueAccounts = new Map();
  if (!Array.isArray(accounts)) return [];

  for (const account of accounts) {
    try {
      const address = ethers.getAddress(account);
      uniqueAccounts.set(address.toLowerCase(), address);
    } catch (_) {
      // Ignore malformed values supplied by a wallet provider.
    }
  }
  return [...uniqueAccounts.values()];
}

function showMetaMaskAccountChooser(accounts) {
  const chooser = document.getElementById('metaMaskAccountChooser');
  const list = document.getElementById('metaMaskAccountList');
  const validAccounts = normalizeMetaMaskAccounts(accounts);
  list.replaceChildren();
  chooser.hidden = false;

  validAccounts.forEach((address, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wallet-account-option';
    button.title = 'Use ' + address;

    const label = document.createElement('span');
    label.className = 'wallet-account-label';
    label.textContent = 'MetaMask account ' + (index + 1);
    const value = document.createElement('span');
    value.className = 'wallet-account-address';
    value.textContent = address;
    button.append(label, value);
    button.addEventListener('click', () => void selectMetaMaskAccount(address));
    list.appendChild(button);
  });

  if (validAccounts.length === 0) {
    showAlert('connectAlert', 'alert-info', 'No account is currently shared with this site. Choose accounts in MetaMask to continue.');
    return;
  }

  showAlert(
    'connectAlert',
    'alert-info',
    'Select the exact exported address. The tool will not choose an account automatically.',
  );
}

async function selectMetaMaskAccount(address) {
  hideAlert('connectAlert');
  const requestedAddress = ethers.getAddress(address);
  const accountButtons = document.querySelectorAll('.wallet-account-option');
  accountButtons.forEach(button => { button.disabled = true; });

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const nextSigner = await provider.getSigner(requestedAddress);
    const signerAddress = ethers.getAddress(await nextSigner.getAddress());
    if (signerAddress.toLowerCase() !== requestedAddress.toLowerCase()) {
      throw new Error('MetaMask returned a different account than the one selected.');
    }
    signer = nextSigner;
    setWalletConnected(signerAddress, 'MetaMask', 'metamask');
  } catch (e) {
    signer = null;
    accountButtons.forEach(button => { button.disabled = false; });
    showAlert('connectAlert', 'alert-error', '❌ Could not select that MetaMask account: ' + errorMessage(e));
  }
}

async function requestMetaMaskAccountPermissions() {
  hideAlert('connectAlert');
  if (!window.ethereum) {
    showAlert('connectAlert', 'alert-error', '❌ MetaMask not detected.');
    return;
  }

  const button = document.getElementById('requestMetaMaskAccountsBtn');
  button.disabled = true;
  button.textContent = 'Opening MetaMask…';
  try {
    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    });
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    showMetaMaskAccountChooser(accounts);
  } catch (e) {
    showAlert('connectAlert', 'alert-error', '❌ ' + errorMessage(e));
  } finally {
    button.disabled = false;
    button.textContent = 'Choose Different Accounts in MetaMask';
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
    document.getElementById('privKey').value = '';
    pk = '';
    document.getElementById('loadKeyBtn').textContent = 'Loaded ✓';
    document.getElementById('loadKeyBtn').disabled = true;
    setWalletConnected(signer.address, 'private key', 'private-key');
  } catch (e) {
    showAlert('connectAlert', 'alert-error', '❌ ' + errorMessage(e));
  }
}

function clearRecoveredAccountState() {
  discoveryRunId++;
  balanceScanRunId++;
  scanInProgress = false;
  discoveredAccounts = [];
  verifiedAccounts.clear();
  nativeBalance = null;
  checkedTokens = [];
  diagData = emptyDiagData();
  resolvedTokenAddress = null;
  withdrawTokenSymbol = '';
  clearTimeout(tokenResolveTimer);

  document.getElementById('discoveredAccounts').replaceChildren();
  document.getElementById('retryDiscoveryBtn').hidden = true;
  document.getElementById('smartAcct').value = '';
  document.getElementById('checkBalBtn').disabled = true;
  document.getElementById('checkBalBtn').textContent = 'Find My Funds';
  document.getElementById('balanceWrap').style.display = 'none';
  document.getElementById('assetList').replaceChildren();
  document.getElementById('diagResults').className = 'diag-results';
  document.getElementById('customTokenAddr').value = '';
  document.getElementById('withdrawTokenAddr').value = '';
  document.getElementById('tokenResolveInfo').textContent = '';
  document.getElementById('amount').value = '';
  document.getElementById('withdrawBtn').disabled = true;
  document.getElementById('resultCard').style.display = 'none';
  document.getElementById('s2num').className = 'step-num';
  document.getElementById('s2num').textContent = '2';
  hideAlert('balanceAlert');
}

function setWalletConnected(address, label, connectionType) {
  const nextAddress = ethers.getAddress(address);
  const previousAddress = eoaAddress;
  const destination = document.getElementById('destAddr');
  const destinationWasDefault = !destination.value.trim()
    || (previousAddress && destination.value.trim().toLowerCase() === previousAddress.toLowerCase());

  clearRecoveredAccountState();
  eoaAddress = nextAddress;
  walletConnectionType = connectionType;
  document.getElementById('walletStatus').style.display = 'flex';
  document.getElementById('walletStatus').className = 'wallet-status connected';
  document.getElementById('connDot').className = 'dot on';
  document.getElementById('connText').textContent = eoaAddress.slice(0, 6) + '…' + eoaAddress.slice(-4) + (label ? '  ·  ' + label : '');
  document.getElementById('metaMaskAccountChooser').hidden = true;
  document.getElementById('metaMaskAccountList').replaceChildren();
  document.getElementById('connectMetaMaskBtn').textContent = 'Connected ✓';
  document.getElementById('connectMetaMaskBtn').disabled = true;
  document.getElementById('loadKeyBtn').disabled = true;
  document.getElementById('s1num').className = 'step-num done';
  document.getElementById('s1num').textContent = '✓';
  document.getElementById('changeWalletBtn').hidden = false;
  showAlert('connectAlert', 'alert-success', '✓ Exported wallet loaded: ' + eoaAddress);
  if (destinationWasDefault) destination.value = eoaAddress;
  showAlert('txAlert', 'alert-warn', '⚠️ Find this wallet’s recovery account and funds before withdrawing.');
  log('Connected: ' + eoaAddress, '#4ade80');
  void discoverSmartAccounts();
}

async function changeWallet() {
  const previousAddress = eoaAddress;
  const wasMetaMask = walletConnectionType === 'metamask';
  clearRecoveredAccountState();
  signer = null;
  eoaAddress = null;
  walletConnectionType = null;

  const destination = document.getElementById('destAddr');
  if (previousAddress && destination.value.trim().toLowerCase() === previousAddress.toLowerCase()) {
    destination.value = '';
  }
  document.getElementById('privKey').value = '';
  document.getElementById('connectMetaMaskBtn').disabled = false;
  document.getElementById('connectMetaMaskBtn').textContent = 'I’ve Imported It — Connect MetaMask';
  document.getElementById('metaMaskAccountChooser').hidden = true;
  document.getElementById('metaMaskAccountList').replaceChildren();
  document.getElementById('loadKeyBtn').disabled = false;
  document.getElementById('loadKeyBtn').textContent = 'Load with Private Key';
  document.getElementById('walletStatus').style.display = 'none';
  document.getElementById('connDot').className = 'dot';
  document.getElementById('connText').textContent = '';
  document.getElementById('changeWalletBtn').hidden = true;
  document.getElementById('s1num').className = 'step-num';
  document.getElementById('s1num').textContent = '1';
  setDiscoveryStatus('', 'Connect your exported wallet above to search for its recovery account.');
  showAlert('connectAlert', 'alert-info', 'Choose another MetaMask account or load a different exported key.');
  showAlert('txAlert', 'alert-warn', '⚠️ Connect your wallet and find its funds first.');
  log('Wallet disconnected from this session');

  if (wasMetaMask && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      showMetaMaskAccountChooser(accounts);
    } catch (e) {
      showAlert('connectAlert', 'alert-error', '❌ Could not read MetaMask accounts: ' + errorMessage(e));
    }
  }
}

async function handleMetaMaskAccountsChanged(accounts) {
  const chooserIsOpen = !document.getElementById('metaMaskAccountChooser').hidden;
  if (walletConnectionType !== 'metamask' && !chooserIsOpen) return;

  const hadSelectedAccount = walletConnectionType === 'metamask';
  if (hadSelectedAccount) await changeWallet();
  showMetaMaskAccountChooser(accounts);
  showAlert(
    'connectAlert',
    Array.isArray(accounts) && accounts.length ? 'alert-info' : 'alert-warn',
    Array.isArray(accounts) && accounts.length
      ? 'MetaMask accounts changed. Select the exported wallet you want to use; nothing was selected automatically.'
      : 'MetaMask disconnected. Choose accounts in MetaMask to continue.',
  );
}

// ── Balance check — scans native + all known tokens in parallel ───────────────

let scanInProgress = false;
let lastScanAt = 0;
const SCAN_COOLDOWN_MS = 2000;

async function checkBalance() {
  const net = getNet();
  const sa = document.getElementById('smartAcct').value.trim();
  const requestedWallet = eoaAddress;
  const requestedGeneration = balanceScanRunId;
  if (!ethers.isAddress(sa)) { showAlert('balanceAlert', 'alert-error', '❌ Invalid address.'); return; }
  if (eoaAddress && sa.toLowerCase() === eoaAddress.toLowerCase()) {
    showAlert('balanceAlert', 'alert-error', '❌ That is your exported wallet address, not the recovery account. Use Search Again or enter the second address shown in Privy Home.');
    return;
  }

  // If already scanning, ignore the duplicate call entirely
  if (scanInProgress) return;

  // Silently wait out the remaining cooldown — no UI message, just a delay
  const remaining = SCAN_COOLDOWN_MS - (Date.now() - lastScanAt);
  if (remaining > 0) await new Promise(r => setTimeout(r, remaining));

  // Another scan may have started while we were waiting
  if (scanInProgress || requestedGeneration !== balanceScanRunId || requestedWallet !== eoaAddress) return;

  scanInProgress = true;
  const scanRunId = ++balanceScanRunId;
  lastScanAt = Date.now();
  hideAlert('balanceAlert');

  const btn = document.getElementById('checkBalBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="border-top-color:currentColor;"></span>Scanning…';

  document.getElementById('balanceWrap').style.display = 'block';
  const totalAssets = net.tokens.length + 1;
  const scanState = document.createElement('div');
  scanState.className = 'scan-state';
  scanState.textContent = `Scanning ${totalAssets} assets on ${net.name}…`;
  document.getElementById('assetList').replaceChildren(scanState);

  try {
    const rpc = makeRpc();

    const code = await withRetry(() => rpc.getCode(sa), 1);
    if (scanRunId !== balanceScanRunId) return;
    if (code === '0x') {
      throw new Error('No smart-account contract was found at this address on ' + net.name + '. Check the account and network.');
    }
    if (eoaAddress && !verifiedAccounts.has(accountKey(selectedNetwork, sa))) {
      const ownership = await verifySmartAccountOwner(sa, selectedNetwork, eoaAddress);
      if (scanRunId !== balanceScanRunId) return;
      if (!ownership) {
        throw new Error('This account could not be verified as belonging to your exported wallet. Open Advanced troubleshooting to inspect it.');
      }
      verifiedAccounts.add(accountKey(selectedNetwork, sa));
      diagData.ecdsaModule = ownership.module;
      setDiscoveryStatus('success', '✓ Ownership verified: this recovery account is controlled by your exported wallet.');
      log('Ownership verified for manually entered account', '#4ade80');
    }

    log('RPC pool: ' + net.rpcs.join(', '));
    log('Checking address: ' + sa);

    const checks = [
      withRetry(() => rpc.getBalance(sa))
        .then(bal => {
          log(net.nativeSymbol + ': ' + ethers.formatEther(bal));
          return { type: 'native', symbol: net.nativeSymbol, balance: bal, decimals: 18, address: null };
        })
        .catch(e => { log('✗ ' + net.nativeSymbol + ': ' + fmtFetchErr(e), '#6b7280'); return null; }),
      ...net.tokens.map(tok => {
        const contract = new ethers.Contract(tok.address, ERC20_ABI, rpc);
        return withRetry(() => contract.balanceOf(sa))
          .then(bal => {
            log(tok.symbol + ': ' + ethers.formatUnits(bal, tok.decimals));
            return { type: 'erc20', symbol: tok.symbol, balance: bal, decimals: tok.decimals, address: tok.address };
          })
          .catch(e => { log('✗ ' + tok.symbol + ': ' + fmtFetchErr(e), '#6b7280'); return null; });
      }),
    ];

    // Run balance checks and fee data fetch in parallel
    const [results, feeData] = await Promise.all([
      Promise.all(checks),
      rpc.getFeeData().catch(() => null),
    ]);
    if (scanRunId !== balanceScanRunId) return;
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
    if (scanRunId !== balanceScanRunId) return;
    document.getElementById('assetList').replaceChildren();
    showAlert('balanceAlert', 'alert-error', '❌ ' + errorMessage(e));
  }

  if (scanRunId !== balanceScanRunId) return;
  scanInProgress = false;
  btn.disabled = false;
  btn.textContent = 'Find My Funds';
}

function formatAssetBalance(balance, decimals) {
  if (balance === 0n) return '0';
  const value = Number(ethers.formatUnits(balance, decimals));
  if (value > 0 && value < 0.000001) return '<0.000001';
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
}

function renderAssetList(assets) {
  const list = document.getElementById('assetList');
  list.replaceChildren();
  if (assets.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'scan-state';
    empty.style.color = 'var(--muted)';
    empty.textContent = 'No assets with a balance found on this network.';
    list.appendChild(empty);
    return;
  }
  const net = getNet();
  for (const a of assets) {
    const formatted = ethers.formatUnits(a.balance, a.decimals);
    const display = formatAssetBalance(a.balance, a.decimals);
    const subtext = a.type === 'native'
      ? 'Native · ' + net.name
      : a.address.slice(0, 10) + '…' + a.address.slice(-4);

    const row = document.createElement('div');
    row.className = 'asset-row';
    const left = document.createElement('div');
    left.className = 'asset-left';
    const symbol = document.createElement('div');
    symbol.className = 'asset-symbol';
    symbol.textContent = a.symbol;
    const detail = document.createElement('div');
    detail.className = 'asset-subtext';
    detail.textContent = subtext;
    left.append(symbol, detail);

    const right = document.createElement('div');
    right.className = 'asset-right';
    const balance = document.createElement('div');
    balance.className = 'asset-bal';
    balance.textContent = display;
    const withdrawButton = document.createElement('button');
    withdrawButton.className = 'tok-withdraw-btn';
    withdrawButton.type = 'button';
    withdrawButton.textContent = 'Withdraw →';
    withdrawButton.addEventListener('click', () => {
      if (a.type === 'native') prefillWithdrawNative(formatted);
      else prefillWithdraw(a.address, a.symbol, a.decimals, formatted);
    });
    right.append(balance, withdrawButton);
    row.append(left, right);
    list.appendChild(row);
  }
}

function normalizeTokenSymbol(value, fallback) {
  const symbol = typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, '').trim() : '';
  return (symbol || fallback).slice(0, 32);
}

function normalizeTokenDecimals(value) {
  const decimals = Number(value);
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 80) {
    throw new Error('Token returned unsupported decimals.');
  }
  return decimals;
}

// Add a custom token the user pastes in — appends to the asset list if non-zero
async function checkCustomToken() {
  const sa = document.getElementById('smartAcct').value.trim();
  if (!ethers.isAddress(sa)) { showAlert('balanceAlert', 'alert-error', '❌ Enter the smart account address first.'); return; }

  const addr = document.getElementById('customTokenAddr').value.trim();
  if (!ethers.isAddress(addr)) { showAlert('balanceAlert', 'alert-error', '❌ Invalid token address.'); return; }
  hideAlert('balanceAlert');

  const net = getNet();
  const rpc = makeRpc();
  try {
    const token = new ethers.Contract(addr, ERC20_ABI, rpc);
    const [symR, decR, balR] = await Promise.allSettled([token.symbol(), token.decimals(), token.balanceOf(sa)]);
    const sym = normalizeTokenSymbol(symR.status === 'fulfilled' ? symR.value : '', addr.slice(0, 8) + '…');
    if (decR.status !== 'fulfilled') throw new Error('Could not read token decimals. Withdrawal is disabled for safety.');
    const dec = normalizeTokenDecimals(decR.value);
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
    showAlert('balanceAlert', 'alert-error', '❌ ' + errorMessage(e));
  }
}

// Quick-fill the withdraw form from an asset row
function prefillWithdraw(address, symbol, decimals, balance) {
  hideAlert('txAlert');
  selectAssetType('erc20');
  document.getElementById('withdrawTokenAddr').value = address;
  withdrawTokenDecimals = decimals;
  withdrawTokenSymbol = symbol;
  resolvedTokenAddress = ethers.getAddress(address);
  document.getElementById('tokenResolveInfo').textContent = '✓ ' + symbol + ' · ' + decimals + ' decimals';
  document.getElementById('amtLabel').textContent = symbol;
  document.getElementById('withdrawBtn').textContent = 'Withdraw ' + symbol;
  document.getElementById('amount').value = balance;
  document.getElementById('withdrawBtn').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function prefillWithdrawNative(balance) {
  hideAlert('txAlert');
  const net = getNet();
  selectAssetType('native');
  const rawBalance = ethers.parseEther(balance);
  const reserve = ethers.parseEther('0.002');
  const available = rawBalance > reserve ? rawBalance - reserve : 0n;
  document.getElementById('amount').value = ethers.formatEther(available);
  document.getElementById('withdrawBtn').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Token presets in Step 3 ──────────────────────────────────────────────────

function renderWithdrawPresets() {
  const net = getNet();
  const container = document.getElementById('withdrawPresets');
  container.replaceChildren();
  for (const tok of net.tokens) {
    const btn = document.createElement('button');
    btn.className = 'tok-btn';
    btn.textContent = tok.symbol;
    btn.addEventListener('click', () => {
      hideAlert('txAlert');
      document.getElementById('withdrawTokenAddr').value = tok.address;
      withdrawTokenDecimals = tok.decimals;
      withdrawTokenSymbol = tok.symbol;
      resolvedTokenAddress = ethers.getAddress(tok.address);
      document.getElementById('tokenResolveInfo').textContent = '✓ ' + tok.symbol + ' · ' + tok.decimals + ' decimals';
      document.getElementById('amtLabel').textContent = tok.symbol;
      document.getElementById('withdrawBtn').textContent = 'Withdraw ' + tok.symbol;
    });
    container.appendChild(btn);
  }
}

// Debounced auto-resolve when user types a custom token address in Step 3
function scheduleTokenResolve() {
  resolvedTokenAddress = null;
  withdrawTokenSymbol = '';
  document.getElementById('tokenResolveInfo').textContent = '';
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
    resolvedTokenAddress = ethers.getAddress(preset.address);
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
    resolvedTokenAddress = ethers.getAddress(cached.address);
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
    const sym = normalizeTokenSymbol(symR.status === 'fulfilled' ? symR.value : '', addr.slice(0, 8) + '…');
    if (decR.status !== 'fulfilled') throw new Error('Could not read token decimals.');
    const dec = normalizeTokenDecimals(decR.value);
    withdrawTokenDecimals = dec;
    withdrawTokenSymbol = sym;
    resolvedTokenAddress = ethers.getAddress(addr);
    infoEl.textContent = '✓ ' + sym + ' · ' + dec + ' decimals';
    document.getElementById('amtLabel').textContent = sym;
    document.getElementById('withdrawBtn').textContent = 'Withdraw ' + sym;
  } catch (e) {
    resolvedTokenAddress = null;
    withdrawTokenSymbol = '';
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
      document.getElementById('amount').value = cached.formattedBalance;
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
      log('Could not fetch token balance for MAX: ' + errorMessage(e), '#f59e0b');
    }
  }
}

// ── Storage helpers ──────────────────────────────────────────────────────────

function addrFromSlot(raw) {
  if (!raw || raw === '0x' + '0'.repeat(64)) return null;
  const addr = ethers.getAddress('0x' + raw.slice(-40));
  return addr === ethers.ZeroAddress ? null : addr;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function diagRow(label, value, cls) {
  const safeClass = ['good', 'bad', 'warn'].includes(cls) ? cls : '';
  return `<div class="diag-row"><span class="diag-label">${escapeHtml(label)}</span><span class="diag-val ${safeClass}">${escapeHtml(value)}</span></div>`;
}

// ── Account diagnostics ──────────────────────────────────────────────────────

async function diagnoseAccount() {
  const net = getNet();
  const sa = document.getElementById('smartAcct').value.trim();
  if (!ethers.isAddress(sa)) { showAlert('balanceAlert', 'alert-error', '❌ Invalid address.'); return; }
  hideAlert('balanceAlert');
  diagData = emptyDiagData();

  const diagEl = document.getElementById('diagResults');
  diagEl.className = 'diag-results visible';
  const diagnosticStatus = document.createElement('div');
  diagnosticStatus.style.color = 'var(--blue)';
  diagnosticStatus.textContent = 'Running diagnostics…';
  diagEl.replaceChildren(diagnosticStatus);
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
      html += diagRow('module lookup', errorMessage(e), 'bad');
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
        ? `<a href="${net.explorer.replace('/tx/', '/address/')}${escapeHtml(diagData.implAddress)}#code" target="_blank" rel="noopener noreferrer" style="color:#f09090;">${escapeHtml(diagData.implAddress)}</a>`
        : 'unknown';
      html += `<div style="margin-top:8px; padding:10px; background:rgba(239,68,68,0.06); border-radius:6px; font-size:10px; line-height:1.7; color:#f09090;">
        <strong>Owner not found.</strong><br><br>
        Implementation: ${implLink}<br>
        Storage addresses: ${escapeHtml(storageAddrs.join(', ') || 'none')}<br>
        EntryPoint: ${escapeHtml(entryPoint)}
      </div>`;
    }

    diagEl.innerHTML = html;
    log('Diagnostics complete', '#4ade80');

  } catch (e) {
    log('Diagnostic error: ' + errorMessage(e), '#ef4444');
    diagEl.innerHTML = html + diagRow('ERROR', errorMessage(e), 'bad');
  }

  btn.disabled = false;
  btn.textContent = 'Diagnose Account';
}

// ── Withdraw ─────────────────────────────────────────────────────────────────

function validateBundlerUrl(rawUrl, expectedChainId) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch (_) {
    throw new Error('Enter a valid bundler RPC URL.');
  }

  const isLocal = ['localhost', '127.0.0.1'].includes(parsed.hostname);
  if (parsed.protocol !== 'https:' && !(isLocal && parsed.protocol === 'http:')) {
    throw new Error('Bundler URLs must use HTTPS (HTTP is allowed only for localhost).');
  }
  if (parsed.username || parsed.password) throw new Error('Bundler URLs cannot contain username/password credentials.');

  if (parsed.hostname === 'api.pimlico.io') {
    const match = parsed.pathname.match(/^\/v[12]\/([^/]+)\/rpc\/?$/);
    if (!match) throw new Error('Use a complete Pimlico RPC URL from the Pimlico dashboard.');
    if (/^\d+$/.test(match[1]) && Number(match[1]) !== expectedChainId) {
      throw new Error('The Pimlico URL is for chain ' + match[1] + ', but ' + getNet().name + ' uses chain ' + expectedChainId + '.');
    }
  }

  return parsed.toString();
}

async function withdraw() {
  hideAlert('txAlert');
  if (!signer) { showAlert('txAlert', 'alert-error', '❌ Connect a wallet first.'); return; }

  const net        = getNet();
  const smartAcct  = document.getElementById('smartAcct').value.trim();
  const dest       = document.getElementById('destAddr').value.trim();
  const amtStr     = document.getElementById('amount').value.trim();
  const bundlerUrlInput = document.getElementById('bundlerUrl').value.trim();

  if (!ethers.isAddress(smartAcct)) { showAlert('txAlert', 'alert-error', '❌ Invalid smart account address.'); return; }
  if (!ethers.isAddress(dest))      { showAlert('txAlert', 'alert-error', '❌ Invalid destination address.'); return; }
  if (!amtStr || parseFloat(amtStr) <= 0) { showAlert('txAlert', 'alert-error', '❌ Enter an amount greater than 0.'); return; }
  const usingHostedBundler = !bundlerUrlInput;
  let bundlerUrl = '/api/bundler?chainId=' + encodeURIComponent(net.chainId);
  if (!usingHostedBundler) {
    try {
      bundlerUrl = validateBundlerUrl(bundlerUrlInput, net.chainId);
    } catch (e) {
      showAlert('txAlert', 'alert-error', '❌ ' + errorMessage(e));
      return;
    }
  }
  log('Bundler: ' + (usingHostedBundler ? 'hosted service' : 'custom endpoint'));

  // ERC-20 specific validation
  let tokenAddr = null;
  if (assetType === 'erc20') {
    tokenAddr = document.getElementById('withdrawTokenAddr').value.trim();
    if (!ethers.isAddress(tokenAddr)) { showAlert('txAlert', 'alert-error', '❌ Enter a valid token contract address.'); return; }
    const normalizedTokenAddress = ethers.getAddress(tokenAddr);
    if (!withdrawTokenSymbol || !resolvedTokenAddress || normalizedTokenAddress !== resolvedTokenAddress) {
      showAlert('txAlert', 'alert-warn', '⚠️ Token not resolved yet. Enter the address again or pick a preset.');
      return;
    }
    tokenAddr = normalizedTokenAddress;
  }

  const btn = document.getElementById('withdrawBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Preparing…';
  const rpcProvider = makeRpc();

  async function bundlerRpc(method, params) {
    log('RPC → ' + method);
    const res = await fetch(bundlerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    });
    const responseText = await res.text();
    let json;
    try {
      json = JSON.parse(responseText);
    } catch (_) {
      throw new Error(
        usingHostedBundler
          ? 'Hosted bundler is unavailable. If you are running a local copy, enter a custom Pimlico RPC URL.'
          : 'Bundler returned an invalid response (HTTP ' + res.status + ').'
      );
    }
    if (!res.ok) throw new Error(json.message || json.error?.message || 'Bundler request failed (HTTP ' + res.status + ').');
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
    let nativeTransferAmount = 0n;

    if (assetType === 'native') {
      nativeTransferAmount = ethers.parseEther(amtStr);
      callData = executeIface.encodeFunctionData('execute', [dest, nativeTransferAmount, '0x']);
      log('Native transfer: ' + amtStr + ' ' + net.nativeSymbol + ' → ' + dest);
    } else {
      const amountRaw = ethers.parseUnits(amtStr, withdrawTokenDecimals);
      const erc20Iface = new ethers.Interface(ERC20_ABI);
      const transferData = erc20Iface.encodeFunctionData('transfer', [dest, amountRaw]);
      callData = executeIface.encodeFunctionData('execute', [tokenAddr, 0n, transferData]);
      log('ERC-20 transfer: ' + amtStr + ' ' + withdrawTokenSymbol + ' → ' + dest);
    }

    let maxFeePerGas = feeData.maxFeePerGas ?? feeData.gasPrice ?? ethers.parseUnits('1', 'gwei');
    let maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? ethers.parseUnits('1', 'gwei');
    try {
      const prices = await bundlerRpc('pimlico_getUserOperationGasPrice', []);
      const tier = prices?.fast || prices?.standard || prices?.slow;
      if (tier?.maxFeePerGas && tier?.maxPriorityFeePerGas) {
        maxFeePerGas = BigInt(tier.maxFeePerGas);
        maxPriorityFeePerGas = BigInt(tier.maxPriorityFeePerGas);
        log('Using bundler gas prices', '#4ade80');
      }
    } catch (e) {
      log('Bundler gas price unavailable; using network fee data: ' + errorMessage(e), '#f59e0b');
    }

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
      const message = errorMessage(e);
      log('Gas estimate failed: ' + message.slice(0, 120), '#f59e0b');
      if (message.includes('AA21') || message.includes('prefund')) {
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
    const requiredNativeBalance = requiredPrefund + nativeTransferAmount;
    if (ethBal < requiredNativeBalance) {
      const shortfall = ethers.formatEther(requiredNativeBalance - ethBal);
      throw new Error(
        'Not enough ' + net.nativeSymbol + ' for gas. ' +
        'Have ' + parseFloat(ethers.formatEther(ethBal)).toFixed(6) + ', ' +
        'need ' + parseFloat(ethers.formatEther(requiredNativeBalance)).toFixed(6) + ' ' + net.nativeSymbol +
        (nativeTransferAmount > 0n ? ' including the transfer amount. ' : '. ') +
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
        const message = errorMessage(e);
        log('✗ ' + message.slice(0, 140), '#6b7280');

        // AA21 = not enough ETH for gas — retrying with a different signature won't help
        if (message.includes('AA21')) break;

        if (message.includes('AA23') || message.includes('signature')) {
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
              log('✗ ' + errorMessage(e2).slice(0, 100), '#6b7280');
            }
          }
        }
      }
    }

    if (!success) {
      const msg = errorMessage(lastError);
      if (msg.includes('AA21') || msg.includes('prefund')) {
        throw new Error(
          'Not enough ' + net.nativeSymbol + ' for gas (AA21). The smart account only has ' +
          (nativeBalance ? parseFloat(ethers.formatEther(nativeBalance)).toFixed(6) : '0') +
          ' ' + net.nativeSymbol + ' — add native gas funds and try again.'
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
    if (!ethers.isHexString(txHash, 32)) throw new Error('Bundler receipt did not contain a valid transaction hash.');
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

    // Refresh only the assets that changed — native (gas spent) + the withdrawn token
    refreshAfterWithdraw(smartAcct, assetType, tokenAddr);

  } catch (e) {
    log('Error: ' + errorMessage(e), '#ef4444');
    btn.disabled = false;
    const withdrawLabel = assetType === 'native' ? net.nativeSymbol : (withdrawTokenSymbol || 'Token');
    btn.textContent = 'Withdraw ' + withdrawLabel;
    showAlert('txAlert', 'alert-error', '❌ ' + errorMessage(e));
  }
}

// Targeted balance refresh after a successful withdrawal.
// Only re-fetches the native balance (gas was spent) and the withdrawn token
// (balance should now be 0 or reduced), then re-renders the asset list in place.
async function refreshAfterWithdraw(sa, withdrawnAssetType, withdrawnTokenAddr) {
  const net = getNet();
  const rpc = makeRpc();
  log('Refreshing balances…');

  const tasks = [
    withRetry(() => rpc.getBalance(sa))
      .then(bal => { nativeBalance = bal; })
      .catch(e => { log('Could not refresh native balance: ' + fmtFetchErr(e), '#6b7280'); }),
  ];

  if (withdrawnAssetType === 'erc20' && withdrawnTokenAddr && ethers.isAddress(withdrawnTokenAddr)) {
    const idx = checkedTokens.findIndex(t => t.address.toLowerCase() === withdrawnTokenAddr.toLowerCase());
    if (idx >= 0) {
      const tok = checkedTokens[idx];
      const contract = new ethers.Contract(tok.address, ERC20_ABI, rpc);
      tasks.push(
        withRetry(() => contract.balanceOf(sa))
          .then(bal => {
            checkedTokens[idx] = { ...tok, rawBalance: bal, formattedBalance: ethers.formatUnits(bal, tok.decimals) };
          })
          .catch(e => { log('Could not refresh ' + tok.symbol + ': ' + fmtFetchErr(e), '#6b7280'); })
      );
    }
  }

  await Promise.all(tasks);

  // Re-render from updated state
  const allNonZero = [];
  if (nativeBalance && nativeBalance > 0n)
    allNonZero.push({ type: 'native', symbol: net.nativeSymbol, balance: nativeBalance, decimals: 18, address: null });
  for (const t of checkedTokens)
    if (t.rawBalance > 0n)
      allNonZero.push({ type: 'erc20', symbol: t.symbol, balance: t.rawBalance, decimals: t.decimals, address: t.address });
  renderAssetList(allNonZero);

  // Recompute gas warning with fresh native balance
  if (nativeBalance !== null) {
    const warnEl = document.getElementById('ethBalWarn');
    if (nativeBalance === 0n) {
      warnEl.textContent = '⚠ No ' + net.nativeSymbol + ' remaining';
      warnEl.className = 'eth-warn bad';
    } else {
      warnEl.textContent = '✓ ' + parseFloat(ethers.formatEther(nativeBalance)).toFixed(6) + ' ' + net.nativeSymbol + ' remaining';
      warnEl.className = 'eth-warn good';
    }
  }

  log('Balances refreshed', '#4ade80');
}

function bindUi() {
  if (window.top !== window.self) {
    document.body.replaceChildren();
    const warning = document.createElement('p');
    warning.textContent = 'For security, open this recovery tool directly rather than inside another page.';
    document.body.appendChild(warning);
    return;
  }

  document.getElementById('connectMetaMaskBtn').addEventListener('click', connectMetaMask);
  document.getElementById('requestMetaMaskAccountsBtn').addEventListener('click', requestMetaMaskAccountPermissions);
  document.getElementById('loadKeyBtn').addEventListener('click', loadKey);
  document.getElementById('changeWalletBtn').addEventListener('click', changeWallet);
  if (window.ethereum?.on) {
    window.ethereum.on('accountsChanged', handleMetaMaskAccountsChanged);
  }
  document.getElementById('privKey').addEventListener('keydown', event => {
    if (event.key === 'Enter') loadKey();
  });
  document.getElementById('privKey').addEventListener('input', () => hideAlert('connectAlert'));
  document.getElementById('retryDiscoveryBtn').addEventListener('click', discoverSmartAccounts);
  document.querySelectorAll('.net-btn').forEach(button => {
    button.addEventListener('click', () => selectNetwork(button));
  });
  document.getElementById('smartAcct').addEventListener('input', () => {
    hideAlert('balanceAlert');
    balanceScanRunId++;
    scanInProgress = false;
    const manualAddress = document.getElementById('smartAcct').value.trim();
    document.getElementById('checkBalBtn').disabled = !ethers.isAddress(manualAddress);
    document.querySelectorAll('.account-option').forEach(button => button.classList.remove('selected'));
    if (manualAddress) {
      setDiscoveryStatus(
        ethers.isAddress(manualAddress) ? '' : 'warn',
        ethers.isAddress(manualAddress)
          ? 'Manual account entered. We will verify that it belongs to your exported wallet before scanning.'
          : 'Enter a complete smart account address to continue.',
      );
    }
    nativeBalance = null;
    checkedTokens = [];
    diagData = emptyDiagData();
    document.getElementById('balanceWrap').style.display = 'none';
    document.getElementById('assetList').replaceChildren();
    document.getElementById('diagResults').className = 'diag-results';
    document.getElementById('withdrawBtn').disabled = true;
    showAlert('txAlert', 'alert-warn', '⚠️ Find the funds for this smart account before withdrawing.');
  });
  document.getElementById('checkBalBtn').addEventListener('click', checkBalance);
  document.getElementById('diagBtn').addEventListener('click', diagnoseAccount);
  document.getElementById('checkCustomTokenBtn').addEventListener('click', checkCustomToken);
  document.getElementById('customTokenAddr').addEventListener('input', () => hideAlert('balanceAlert'));
  document.getElementById('clearLogBtn').addEventListener('click', () => {
    document.getElementById('debugLog').replaceChildren();
  });
  document.getElementById('assetBtnNative').addEventListener('click', () => selectAssetType('native'));
  document.getElementById('assetBtnErc20').addEventListener('click', () => selectAssetType('erc20'));
  ['bundlerUrl', 'destAddr', 'withdrawTokenAddr', 'amount'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => hideAlert('txAlert'));
  });
  document.getElementById('withdrawTokenAddr').addEventListener('input', scheduleTokenResolve);
  document.getElementById('maxBtn').addEventListener('click', setMax);
  document.getElementById('withdrawBtn').addEventListener('click', withdraw);
  renderWithdrawPresets();
}

bindUi();
