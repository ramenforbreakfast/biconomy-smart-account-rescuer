# Biconomy Smart Account Rescuer

A self-contained browser tool for recovering any native token or ERC-20 asset from [Biconomy SmartAccount v2](https://docs.biconomy.io) wallets when you can no longer access them through the original app.

## The problem

Many apps create a [Biconomy SmartAccount v2](https://docs.biconomy.io) — an [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) smart contract wallet — on behalf of each user, controlled by an EOA (a standard Ethereum wallet) that the app manages. Tokens and native assets live inside the smart account, not the EOA.

When an app shuts down, **you lose access to the smart account** — the app's interface is gone, and so is the paymaster that used to sponsor gas. But **you still own the EOA that controls it**. If you can export or locate that private key, this tool lets you recover the funds directly — no app, no paymaster, no backend required.

## Prerequisites

- The private key of the EOA that owns the smart account, **or** MetaMask with that wallet imported
- A small amount of native token (ETH, POL, etc.) in the **smart account** to pay for gas (~0.0005 ETH minimum)
- A free [Pimlico](https://dashboard.pimlico.io) bundler API key

> **Note:** The smart account itself pays for gas — not the EOA. If the smart account has no native token, send a small amount to it before withdrawing.

## How to use

### 1. Open the tool

The tool is three static files (`index.html`, `style.css`, `app.js`) that must be served together. Options:

- **[Netlify Drop](https://app.netlify.com/drop)** — download or clone this repo, drag the folder onto the Netlify Drop page, and open the URL it gives you
- **Local server** — run `npx serve .` in the folder and open `http://localhost:3000`

### 2. Connect your wallet

- **MetaMask** — click "Connect MetaMask" if you have already imported the owner EOA into MetaMask
- **Private key** — paste the owner EOA's private key and click "Load with Private Key". The key is used only in-memory and is never sent anywhere.

### 3. Select network and enter your smart account address

Select the network the smart account lives on (Base is the default), then paste the smart account address.

### 4. Check Balance

Click **Check Balance**. The tool scans your native balance and all common tokens simultaneously and displays every asset with a non-zero balance. It also shows whether the account has enough native token for gas.

If nothing shows up, make sure the correct network is selected. If the native token balance is zero or very low, send a small amount to the smart account before continuing.

You can also paste any token address into the **"Add a custom token"** field to check assets not in the built-in list.

### 5. (Optional) Diagnose Account

Click **Diagnose Account** to inspect the smart account on-chain. It confirms the proxy implementation, detects the ECDSA ownership module, looks up the registered owner, and verifies it matches the wallet you connected. Useful for debugging if the withdrawal fails with a signature error.

### 6. Fill in withdrawal details

Click **Withdraw →** on any asset in the balance list to auto-fill the withdrawal form, or fill it manually:

- **Bundler RPC URL** — your Pimlico API key URL. Get a free key at [dashboard.pimlico.io](https://dashboard.pimlico.io). Example for Base: `https://api.pimlico.io/v1/8453/rpc?apikey=YOUR_KEY`
- **Destination address** — the wallet that should receive the funds
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

- This tool runs entirely in your browser. No data is sent to any server except your own bundler RPC endpoint.
- Private keys are held in memory only for the duration of the session and are never stored or logged.
- Always verify the destination address before clicking Withdraw.
- The source code is plain HTML, CSS, and JavaScript — inspect it before use.
