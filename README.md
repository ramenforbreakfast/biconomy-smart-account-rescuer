# Biconomy Smart Account Rescuer

A self-contained browser tool for recovering any native token or ERC-20 asset from [Biconomy SmartAccount v2](https://docs.biconomy.io) wallets when you can no longer access them through the original app.

## The problem

Many apps create a [Biconomy SmartAccount v2](https://docs.biconomy.io) — an [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) smart contract wallet — on behalf of each user, controlled by an EOA (a standard Ethereum wallet) that the app manages. Tokens and native assets live inside the smart account, not the EOA.

When an app shuts down, **you lose access to the smart account** — the app's interface is gone, and so is the paymaster that used to sponsor gas. But **you still own the EOA that controls it**. If you can export or locate that private key, this tool lets you recover the funds directly — no app, no paymaster, no backend required.

## Prerequisites

- The private key of the EOA that owns the smart account, **or** MetaMask with that wallet imported
- A small amount of native token (ETH, POL, etc.) in the **smart account** to pay for gas (~0.0005 ETH minimum)
- On the hosted Vercel deployment, no bundler setup is required. A local static copy requires a custom [Pimlico](https://dashboard.pimlico.io) bundler URL.

> **Note:** The smart account itself pays for gas — not the EOA. If the smart account has no native token, send a small amount to it before withdrawing.

## How to use

### 1. Serve a trusted local copy

Clone or download this repository, verify the source, and serve the entire folder locally:

```sh
python3 -m http.server 3000 --bind 127.0.0.1
```

Then open `http://localhost:3000`. The vendored ethers.js file under `vendor/` must be served with the other files.

You can deploy the static folder to a host you control, but anyone using the private-key fallback must trust that host and its deployment pipeline. A verified local copy is safer.

#### Host on Vercel (optional)

The interface is static, with one Vercel Function that proxies the narrowly permitted Pimlico bundler methods without exposing the Pimlico key to browsers. After pushing it to GitHub:

1. In Vercel, choose **Add New → Project** and import the repository.
2. Set **Framework Preset** to **Other**.
3. Leave the root directory at the repository root and leave the build and output settings empty.
4. Under **Settings → Environment Variables**, add `PIMLICO_API_KEY`, select **Secret**, paste only the Pimlico API key, and enable it for Production. Enable Preview too if preview deployments should support withdrawals.
5. Deploy or redeploy after saving the secret.

Do not put the key or full keyed Pimlico URL in `app.js`, `index.html`, `vercel.json`, or a committed `.env` file. The included `vercel.json` applies the same Content Security Policy as the page, prevents framing, and adds other browser security headers. You can also deploy the repository root with the Vercel CLI by running `vercel --prod`.

The hosted endpoint permits only the four bundler methods used by this recovery flow, only on supported networks, and rejects sponsored, account-deployment, oversized, and general-purpose RPC requests. In the Vercel dashboard, also configure a WAF rate-limit rule for path `/api/bundler`; a reasonable starting point is 150 requests per source per 10 minutes, followed by monitoring and adjustment. Provider-side project quotas remain the final cost ceiling.

Use a Vercel project and domain that users can clearly identify as yours. A hosted version is convenient for MetaMask, but private-key users must trust your Vercel account, domain, and every deployed revision. Keep recommending a verified local copy for the private-key fallback. User private keys must never be placed in Vercel environment variables or source code.

### 2. Connect your wallet

- **MetaMask (recommended)** — click "Connect MetaMask", then explicitly select the exact exported owner address. The tool never silently chooses the first MetaMask account.
- **Private key (advanced fallback)** — only use this on a verified local copy. The key is used in memory, the input is cleared immediately after loading, and the application does not transmit or store it.

If wallets from several Privy apps are imported into MetaMask, all accounts shared with the site are listed with their full addresses. Match the address to the exportable wallet shown in Privy Home. **Choose Different Accounts in MetaMask** reopens MetaMask's permission chooser when the address you need is not listed.

Use **Use a Different Wallet** to clear the current recovery session and choose or load another account. If the available accounts change inside MetaMask, the tool clears the recovery session and requires another explicit selection; it never switches to account 1 automatically.

### 3. Let the tool find the recovery account

After the exported wallet is loaded, the tool searches the supported networks with Biconomy's on-chain address resolver. It only offers accounts whose ownership can be verified against the exported wallet. If one account is found, it is selected automatically; if several are found, choose the account you want to scan.

The exported wallet and smart account are different addresses. In Privy Home, the exportable wallet is normally shown first and its associated smart account second. You should not need to copy either address into the tool during the normal flow.

### 4. Find your funds

Click **Find My Funds**. The tool scans the selected account's native balance and all built-in tokens simultaneously and displays every asset with a non-zero balance. It also shows whether the account has enough native token for gas.

If nothing shows up, make sure the correct network is selected. If the native token balance is zero or very low, send a small amount to the smart account before continuing.

The automatic balance scan covers the tokens listed below. Privy Home may show app-specific tokens that are not in that list; paste each token's contract address into the **"Add a custom token"** field to check and recover it.

### 5. (Optional) Advanced troubleshooting

Open **Having trouble? Advanced troubleshooting** only if discovery cannot find the account or a withdrawal fails. There you can enter a smart account manually, run **Diagnose Account**, and view the fixed-height debug log. Manually entered accounts are ownership-checked before balances are scanned.

### 6. Fill in withdrawal details

Click **Withdraw →** on any asset in the balance list to auto-fill the withdrawal form, or fill it manually:

- **Custom Bundler RPC URL** — optional on the hosted app. Leave it blank to use the hosted bundler. Advanced users and local-static-copy users can provide their own complete Pimlico URL, such as `https://api.pimlico.io/v2/8453/rpc?apikey=YOUR_KEY`.
- **Destination wallet** — defaults to the exported wallet; replace it if the funds should go somewhere else
- **Asset type** — Native (ETH/POL/etc.) or ERC-20 Token
- **Token contract** — if ERC-20, paste the token address or pick from the quick presets
- **Amount** — how much to send, or click **MAX** to fill the full balance

### 7. Withdraw

Click **Withdraw**. The tool will:

1. Locate the ECDSA ownership module registered on the smart account
2. Estimate gas (or fall back to safe defaults)
3. Build and sign a `UserOperation` using your connected wallet
4. Submit it to the Pimlico bundler
5. Wait for confirmation and display a link to the transaction

## Supported networks and tokens

| Network  | Native | Built-in tokens                        |
| -------- | ------ | -------------------------------------- |
| Base     | ETH    | USDC, USDT, WETH, DAI, cbBTC          |
| Ethereum | ETH    | USDC, USDT, WETH, DAI, WBTC           |
| Polygon  | POL    | USDC, USDT, WETH, DAI, WBTC, WMATIC   |
| Optimism | ETH    | USDC, USDT, WETH, DAI, WBTC           |
| Arbitrum | ETH    | USDC, USDT, WETH, DAI, WBTC           |

Any other ERC-20 can be recovered by pasting its contract address into the custom token field.

## Security notes

- Wallet operations and signing run in your browser. Public addresses and blockchain requests are sent to the configured public RPC endpoints. When using the hosted bundler, signed UserOperations pass through the Vercel Function to Pimlico; private keys are never included.
- Prefer MetaMask. If you must use the private-key fallback, use a verified local copy on a trusted machine. Keys are held in memory only for the session, are not stored or logged, and the input is cleared after loading.
- Runtime JavaScript is served locally. Ethers.js 6.17.0 is vendored under `vendor/`; the page does not load executable code from a CDN.
- A Content Security Policy blocks remote scripts and inline event handlers. Custom bundler URLs must use HTTPS, except for localhost development.
- The hosted Pimlico key is read only by the Vercel Function from the `PIMLICO_API_KEY` secret. The function does not log request bodies or return the key to browsers.
- Each supported network has multiple public RPC endpoints so a single provider outage does not block recovery.
- Always verify the destination address before clicking Withdraw.
- The source code is plain HTML, CSS, and JavaScript — inspect it before use.
