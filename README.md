# Smart Account Rescuer

A self-contained browser tool for withdrawing USDC from [Biconomy SmartAccount v2](https://docs.biconomy.io) wallets when you can no longer access them through the original app.

## The problem

Many apps create a [Biconomy SmartAccount v2](https://docs.biconomy.io) — an [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) smart contract wallet — on behalf of each user, controlled by an EOA (a standard Ethereum wallet) that the app manages. USDC and other assets live inside the smart account, not the EOA.

When an app shuts down, **you lose access to the smart account** — the app's interface is gone, and so is the paymaster that used to sponsor gas. But **you still own the EOA that controls it**. If you can export or locate that private key, this tool lets you recover the funds directly — no app, no paymaster, no backend required.

## Prerequisites

- The private key of the EOA that owns the smart account, **or** MetaMask with that wallet imported
- A small amount of ETH in the smart account to pay for gas (~0.0005 ETH is enough on Base)
- A free [Pimlico](https://dashboard.pimlico.io) bundler API key

> **Note:** The smart account itself pays for gas — not the EOA. If the smart account has no ETH, you will need to send a small amount to it before withdrawing.

## How to use

**1. Open the tool**

The tool consists of three files (`index.html`, `style.css`, `app.js`) that must be served together. The easiest way is [Netlify Drop](https://app.netlify.com/drop):

1. Download or clone this repository
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the entire folder onto the page
4. Netlify will give you a URL — open it in your browser

Alternatively, if you have Node.js installed, you can run `npx serve .` in the folder and open `http://localhost:3000`.

**2. Connect your wallet**

You have two options:

- **Connect MetaMask** — click "Connect MetaMask" and approve the connection. Use this if you have already imported the owner EOA into MetaMask.
- **Paste a private key** — paste the private key of the owner EOA into the "Private Key" field and click "Load with Private Key". The key is used only in-memory and is never sent anywhere.

**3. Enter your smart account address**

Paste the address of the Biconomy smart account that holds your USDC. Select the correct network (Base is the default).

**4. Check Balance**

Click "Check Balance" to verify the USDC balance and see whether the smart account has enough ETH to cover gas. If the ETH balance is zero or very low, send a small amount of ETH to the smart account address before continuing.

**5. (Optional) Diagnose Account**

Click "Diagnose Account" to inspect the smart account on-chain — it confirms the implementation, detects the ECDSA module, looks up the registered owner, and verifies it matches the wallet you connected. This step is useful for debugging if the withdrawal fails.

**6. Fill in the withdrawal details**

- **Bundler RPC URL** — paste your Pimlico API key URL. Get a free key at [dashboard.pimlico.io](https://dashboard.pimlico.io). For Base, the URL looks like: `https://api.pimlico.io/v1/8453/rpc?apikey=YOUR_KEY`
- **Destination Address** — the wallet address you want to receive the USDC
- **Amount** — the amount of USDC to send, or click MAX to fill the full balance

**7. Withdraw**

Click "Withdraw USDC". The tool will:

1. Locate the ECDSA ownership module registered on the smart account
2. Estimate gas (or fall back to safe defaults)
3. Build and sign a `UserOperation` using your wallet
4. Submit it to the Pimlico bundler
5. Wait for confirmation and display the transaction link

## Supported networks


| Network  | USDC Contract                                |
| -------- | -------------------------------------------- |
| Base     | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| Ethereum | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` |
| Polygon  | `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359` |
| Optimism | `0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85` |
| Arbitrum | `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` |


## Security notes

- This tool runs entirely in your browser. No data is sent to any server except your own bundler RPC endpoint.
- Private keys entered into the tool are held in memory only for the duration of the session and are never stored or logged.
- Always verify the destination address before clicking Withdraw.
- The source code is plain HTML, CSS, and JavaScript — you can inspect it before using it.
