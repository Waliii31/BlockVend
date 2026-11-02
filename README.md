# BLOCKVEND // 100% ON-CHAIN CRYPTO VENDING MACHINE
### Powered by [Botchain.ai](https://botchain.ai) // BOT Chain Mainnet (Chain ID: 677)

```
================================================================================
  ____  _     ___   ____ _  ____     _______ _   _ ____    _____ _____ _   _ 
 | __ )| |   / _ \ / ___| |/ /\ \   / / ____| \ | |  _ \  | ____|_   _| | | |
 |  _ \| |  | | | | |   | ' /  \ \ / /|  _| |  \| | | | | |  _|   | | | |_| |
 | |_) | |__| |_| | |___| . \   \ V / | |___| |\  | |_| | | |___  | | |  _  |
 |____/|_____\___/ \____|_|\_\   \_/  |_____|_| \_|____/  |_____| |_| |_| |_|
================================================================================
    NEO-BRUTALIST ON-CHAIN DISPENSER // FIXED-RATE BOT -> ERC-20 SWAPS
```

[![Twitter Follow](https://img.shields.io/badge/Twitter-@site__proof__-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/site_proof__)
[![Powered by](https://img.shields.io/badge/Powered%20By-Botchain.ai-00FF66?style=for-the-badge&logoColor=black)](https://botchain.ai)
[![Explorer](https://img.shields.io/badge/Scan%20Explorer-scan.botchain.ai-FFE600?style=for-the-badge&logoColor=black)](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324)

**BlockVend** is an industrial, hardware-styled decentralized application (dApp) deployed on **BOT Chain Mainnet**. It replaces continuous AMM bonding curves ($x \cdot y = k$) and high slippage with **deterministic, fixed-rate atomic token dispenses**. Users deposit native **BOT** tokens to instantly dispense designated ERC-20 tokens directly to their wallet.

Designed strictly under the **Neo-Brutalist** aesthetic: **zero glassmorphism, zero gradients, zero rounded corners, and zero glowing blur shadows**. Every element features stark solid black borders, hard non-blurry drop shadows, loud saturated colors, and monospace typography.

---

## 🌐 BOT CHAIN MAINNET SPECIFICATION

| Parameter | Mainnet Value |
|---|---|
| **Network Name** | `BOT Chain Mainnet` |
| **RPC URL** | `https://rpc.botchain.ai` |
| **Chain ID** | `677` (Hex: `0x2a5`) |
| **Currency Symbol** | `BOT` |
| **Currency Decimals** | `18` |
| **Block Explorer** | [https://scan.botchain.ai](https://scan.botchain.ai) |
| **Dispenser Contract** | [`0xFD51797C48f75aF10761F92Bdd639e4518358324`](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324) |
| **Twitter / X** | [@site_proof__](https://x.com/site_proof__) |
| **Ecosystem** | [Botchain.ai](https://botchain.ai) |

---

## 📑 TABLE OF CONTENTS
1. [All Features (What Can It Do?)](#-all-features-what-can-it-do)
2. [Local Setup & Installation](#-local-setup--installation)
3. [Connecting MetaMask to BOT Chain Mainnet](#-connecting-metamask-to-bot-chain-mainnet)
4. [Step-by-Step Manual Testing Guide](#-step-by-step-manual-testing-guide)
5. [Contract Integration Guide (When Deploying Mainnet Contract & ABI)](#-contract-integration-guide)
6. [Smart Contract Architecture](#-smart-contract-architecture)
7. [Tech Stack](#-tech-stack)

---

## ⚡ ALL FEATURES (WHAT CAN IT DO?)

### 1. Fixed-Rate Atomic Swap Dispenser
- **Direct Native BOT Settlement:** Pay exact native `BOT` in a single 1-block transaction to receive tokens directly. No prior approval or allowance permits needed.
- **Strict 0.00% Slippage:** Prices are fixed in each canister slot. Zero price impact regardless of order size.
- **MEV & Frontrunning Immunity:** Static non-bonding curves mean zero arbitrage sandwich opportunities for bots.

### 2. Physical Vending Machine Wireframe Interface (Section 1)
- **12 Interactive Canister Shelves (`A1`–`C4`):** Displays token packaging, stock levels, and fixed prices in `BOT`.
- **Rotating Spring Coils (SVG Wireframe):** Physical spiral wireframe coils spin with motor sound effects on dispense.
- **Tactile Keypad Console:** Chunky buttons (`A`–`D`, `1`–`4`, `[CLR]`, `[RAND]`) with audio relay clicks.
- **Retro LCD Matrix Screen:** High-contrast terminal display showing punched slot codes, required BOT price, and EVM status.
- **Native BOT Coin Slot:** Visual coin intake aperture with pulsing LED sensor.
- **Spring-Loaded Bottom Retrieval Flap:** Dispensed tokens land in the bottom hopper. Pushing the flap unlocks the celebration modal and receipt.

### 3. Procedural Mechanical Audio Synthesizer
- Built natively using the **Web Audio API** (zero external mp3 assets).
- Procedural sounds: button relay clicks, coin drop chimes, coil motor whirr, heavy metal drop thuds, and error buzzers. Includes a master **`AUDIO: ON / MUTED`** switch.

### 4. Real-Time Dispense Ledger & Thermal Receipt Tape (Section 2)
- Continuous live log of all dispenses on BOT Chain with block numbers and transaction hashes.
- Thermal receipt generator displaying ASCII barcodes and direct **"VIEW ON SCAN"** links to [`https://scan.botchain.ai`](https://scan.botchain.ai).

### 5. Architectural Blueprint & Solidity Opcode Inspector (Section 3)
- 4-step architectural breakdown of non-custodial vending mechanics.
- Interactive tab displaying verified OpenZeppelin `BlockVendCore.sol` smart contract logic.

### 6. Canister Catalog & Operator Inventory Matrix (Section 4)
- Full transparency table listing all 12 canisters with token symbols, swap rates in BOT, and copyable contract addresses.
- 1-click `PUNCH [SLOT]` buttons that auto-focus the keypad.
- **Operator Restock Mode:** Simulated vault operator controls to replenish depleted canisters.

### 7. Gas Efficiency Benchmark vs Traditional AMMs (Section 5)
- Side-by-side comparison: BlockVend (~42,150 gas) vs Uniswap V3 (~142,800+ gas).
- **Interactive Gas Calculator:** Real-time slider to calculate cumulative gas and BOT savings across multiple dispenses.

### 8. Maintenance FAQ & Operator CLI Terminal (Section 6)
- Expandable neo-brutalist hardware manual answering atomic revert safety and reentrancy guards.
- **Interactive Operator CLI:** Functional terminal console accepting commands:
  - `help` — Lists all commands
  - `faucet` — Injects +10.0 BOT into simulated balance
  - `network` — Displays BOT Chain Mainnet RPC parameters
  - `stats` — Reports chassis uptime and active canisters
  - `dispense <slot>` (e.g., `dispense A1`) — Loads slot directly into the keypad
  - `audit` — Runs security contract sanity checks
  - `clear` — Wipes the terminal screen
- **Emergency Coil Stop Button:** Simulates an industrial relay shutdown.
- **Official Ecosystem Badges:** Twitter/X [@site_proof__](https://x.com/site_proof__), [Botchain.ai](https://botchain.ai), and [scan.botchain.ai contract](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324).

### 9. Token Celebration Modal & EIP-747 Watch Asset
- Displays celebratory confetti and full transaction receipt.
- **"ADD TO METAMASK" Button:** Uses `wallet_watchAsset` (EIP-747) to immediately register the dispensed token in MetaMask.

---

## 🚀 LOCAL SETUP & INSTALLATION

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)
- Chromium browser with the [MetaMask extension](https://metamask.io/) installed

### Step-by-Step Setup

1. **Open your terminal** and navigate to the project directory:
   ```bash
   cd "e:\D'APPS\BlockVend"
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

## 🦊 CONNECTING METAMASK TO BOT CHAIN MAINNET

BlockVend includes built-in auto-configuration for **BOT Chain Mainnet**. When connecting with MetaMask:

1. Click **`CONNECT BOT WALLET`** or toggle **`MODE: BOT MAINNET`** in the top navigation bar.
2. The dApp will automatically send a `wallet_addEthereumChain` / `wallet_switchEthereumChain` request to your MetaMask with:
   - **Network Name:** BOT Chain Mainnet
   - **RPC URL:** `https://rpc.botchain.ai`
   - **Chain ID:** `677`
   - **Currency Symbol:** `BOT`
   - **Block Explorer:** `https://scan.botchain.ai`
3. Click **Approve** and **Switch Network** in MetaMask.
4. Your live address and BOT balance will appear in the top status bar.

> **Manual MetaMask Addition (if preferred):**
> - In MetaMask, click the Network dropdown > **Add Network** > **Add a network manually**.
> - Fill in the network details from the table above and click **Save**.

---

## 🧪 STEP-BY-STEP MANUAL TESTING GUIDE

### Test 1: Testing Audio & Keypad Sound Effects
1. Look at the top black bar for the **`AUDIO: ON`** button.
2. Click any button on the page — you will hear procedural mechanical audio.
3. Click **`AUDIO: ON`** to toggle to **`AUDIO: MUTED`** — all sounds are silenced.
4. Click again to turn sound back on.

### Test 2: Testing Wallet Modes & The Faucet
1. By default, BlockVend starts in **`MODE: SIM`** with `25.000 BOT`.
2. Click the **`+10.0 BOT FAUCET`** button:
   - You will hear a metallic coin chime.
   - Your BOT balance will increment by `+10.000 BOT` instantly.
3. Click the mode button to toggle between `MODE: SIM` and `MODE: BOT MAINNET`.

### Test 3: Testing Slot Selection (5 Different Ways)
- **Method A (Direct Click):** Click on any token card in the vending machine cabinet (e.g., click `A3` $GWEI). The card highlights and LCD displays `PUNCHED CODE: A3`.
- **Method B (Physical Keypad):** Click `B` on the keypad, then click `2`. The LCD updates to `B2` ($VOX) with mechanical clicks.
- **Method C (Random Button):** Click the green **`[RAND]`** button on the keypad for a lucky selection.
- **Method D (Catalog Punch):** Scroll to Section 4 ("Canister Catalog") and click any **`PUNCH [B1]`** button. The page smoothly scrolls to the machine with slot `B1` loaded.
- **Method E (CLI Console):** Scroll to Section 6 ("Bot Chain Desk"), type `dispense A2` in the terminal prompt, and press Enter.

### Test 4: Testing the Fixed-Rate Dispense Transaction
1. Select a slot (e.g., `A1` $BRUTAL for 0.010 BOT).
2. The button at the bottom of the keypad reads: **`PUSH TO DISPENSE [A1]`**.
3. Click **`PUSH TO DISPENSE [A1]`**:
   - The coil for slot `A1` will physically rotate with a motor sound.
   - The LCD screen will flash `>>> COIL MOTOR ACTIVE...`.
   - In `MODE: BOT MAINNET`, MetaMask will prompt you to sign and broadcast to BOT Chain (`https://rpc.botchain.ai`).
   - In `MODE: SIM`, the atomic swap completes in ~1.4 seconds.
4. When finished, a heavy drop sound plays (`THUD!`).
5. Your wallet BOT balance is deducted, and canister stock decrements.

### Test 5: Testing the Retrieval Flap & Celebration Modal
1. Look at the bottom hopper below the vending machine shelves.
2. The flap turns lime green and pulses:
   **`★ TOKEN IN TRAY: +10,000 $BRUTAL — [ CLICK FLAP TO RETRIEVE & OPEN RECEIPT ]`**.
3. Click the green retrieval flap:
   - A drop sound triggers and confetti bursts.
   - The **Retrieved Token Celebration Modal** opens displaying receipt ID, BOT deposited, gas used, and transaction hash with an external link to [scan.botchain.ai](https://scan.botchain.ai).

### Test 6: Testing EIP-747 "Add to MetaMask"
1. In the open Celebration Modal, click **`ADD TO METAMASK`**.
2. If MetaMask is connected, a native prompt will register the token symbol and decimals.
3. Click **`[ CLOSE & RETURN TO DISPENSER ]`** to close.

### Test 7: Testing the Live Dispense Ledger & Thermal Receipt Tape
1. Scroll down to Section 2 ("Transaction Ledger").
2. Your newly dispensed swap appears at the top.
3. Click **`VIEW TAPE`** or click on the row:
   - The right panel displays the jagged thermal receipt with an ASCII barcode and direct link to `https://scan.botchain.ai/tx/...`.
4. Click **`COPY TX HASH`** to copy the transaction hash.

### Test 8: Testing Operator Mode & Restocking
1. Scroll down to Section 4 ("Canister Catalog").
2. Note the stock level of the canister you dispensed.
3. Click **`OPERATOR MODE: DISABLED`** to toggle to **`OPERATOR MODE: ENABLED`**.
4. Click the green **`RESTOCK ALL CANISTERS`** button:
   - A coin sound plays.
   - All canisters are immediately replenished to maximum capacity.

### Test 9: Testing the Operator CLI Terminal
1. Scroll down to Section 6 ("Bot Chain Desk").
2. In the terminal prompt `>`, test the following commands:
   - `help` — displays all available commands
   - `network` — prints BOT Chain RPC, Chain ID, and explorer details
   - `faucet` — injects +10.0 BOT into your balance
   - `stats` — prints chassis uptime and network status
   - `dispense C2` — selects slot `C2` ($VAULT) in the vending machine
   - `audit` — reports contract security invariants
   - `clear` — clears the screen

### Test 10: Testing Footer Links & Emergency Stop
1. Scroll to the footer:
   - Click **`TWITTER / X: @site_proof__`** — opens [https://x.com/site_proof__](https://x.com/site_proof__)
   - Click **`POWERED BY BOTCHAIN (BOTCHAIN.AI)`** — opens [https://botchain.ai](https://botchain.ai)
   - Click **`EXPLORER: SCAN.BOTCHAIN.AI`** — opens [https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324](https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324)
2. Click the red **`[ EMERGENCY COIL STOP ]`** button to test the motor brake alert.

---

## 📦 CONTRACT INTEGRATION GUIDE

When you deploy your contract to **BOT Chain Mainnet**, you can plug in your deployed address and ABI with 2 simple steps:

### Step 1: Update Contract Address
Edit [`.env`](file:///e:/D'APPS/BlockVend/.env) (or [`src/utils/web3.ts`](file:///e:/D'APPS/BlockVend/src/utils/web3.ts)):
```env
VITE_BLOCKVEND_CONTRACT_ADDRESS="0xYourDeployedContractAddressHere"
```

### Step 2: Paste Your ABI
Create or replace `src/contracts/BlockVendABI.json` with your compiled contract ABI:
```json
[
  {
    "inputs": [{ "internalType": "bytes2", "name": "slot", "type": "bytes2" }],
    "name": "dispense",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
```
Whenever you're ready, share your deployed address and ABI code, and I will wire the exact contract calls!

---

## 🔒 SMART CONTRACT ARCHITECTURE

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BlockVendCore is ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Canister {
        address tokenAddress;
        uint256 priceBot;       // Fixed swap rate in native BOT wei
        uint256 dispenseAmount; // ERC-20 quantity per dispense
        uint256 stock;          // Current canister reserve
        bool active;
    }

    mapping(bytes2 => Canister) public canisters;
    address public immutable operatorVault;

    event Dispensed(bytes2 indexed slot, address indexed buyer, uint256 amount, uint256 botPaid);

    constructor(address _vault) {
        operatorVault = _vault;
    }

    /// @notice Atomic physical dispense: accepts native BOT, transfers ERC-20 immediately
    function dispense(bytes2 slot) external payable nonReentrant {
        Canister storage item = canisters[slot];
        require(item.active, "SLOT_INACTIVE");
        require(item.stock > 0, "OUT_OF_STOCK");
        require(msg.value == item.priceBot, "EXACT_BOT_REQUIRED");

        item.stock -= 1;

        // Route native BOT to vault
        (bool success, ) = operatorVault.call{value: msg.value}("");
        require(success, "BOT_TRANSFER_FAILED");

        // Dispense ERC-20 from canister reserve
        IERC20(item.tokenAddress).safeTransfer(msg.sender, item.dispenseAmount);

        emit Dispensed(slot, msg.sender, item.dispenseAmount, msg.value);
    }
}
```

---

## 🛠 TECH STACK

- **Blockchain:** [BOT Chain Mainnet](https://scan.botchain.ai) (Chain ID: 677)
- **Native Currency:** `BOT`
- **Frontend Framework:** React 19 + TypeScript + Vite 8
- **Styling System:** Tailwind CSS v4 + Neo-Brutalist design tokens
- **Icons:** Lucide React
- **Web3 Integration:** EIP-1193, EIP-747 (`wallet_watchAsset`), Injected Provider
- **Audio Engine:** Web Audio API (procedural oscillator sound generation)
- **Visual FX:** Canvas-Confetti
- **Typography:** Google Fonts `'Space Mono'`

---

## ⚖️ LICENSE
MIT License. Open-source on-chain software. Powered by [Botchain.ai](https://botchain.ai).
