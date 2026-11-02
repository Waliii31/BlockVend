import React, { useState } from 'react';
import { soundFX } from '../utils/audio';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STEPS' | 'OPCODE'>('STEPS');

  const steps = [
    {
      step: '01',
      title: 'COIN-SLOT INTAKE',
      color: '#00F0FF',
      textColor: '#000000',
      badge: 'BOT CHAIN (677)',
      desc: 'User connects non-custodial wallet or simulation coin slot. No approvals or allowance permits required. Pure native BOT accepted.',
      spec: 'FUNCTION: dispense(bytes2 slotCode) payable',
    },
    {
      step: '02',
      title: 'CANISTER COIL SELECT',
      color: '#FF007F',
      textColor: '#FFFFFF',
      badge: 'FIXED-RATE',
      desc: 'Tactile keypad or direct UI tap indexes canister slot [A1-C4]. Rate is strictly immutable: no dynamic AMM curve, zero price impact.',
      spec: 'CHECK: msg.value >= canisters[slot].priceBot',
    },
    {
      step: '03',
      title: 'ATOMIC EVM EXECUTION',
      color: '#00FF66',
      textColor: '#000000',
      badge: 'REENTRANCY GUARD',
      desc: 'The smart contract verifies payment and executes SafeERC20.safeTransfer directly from the vending reserve vault to recipient.',
      spec: 'EXECUTION: SafeERC20.transfer(msg.sender, amount)',
    },
    {
      step: '04',
      title: 'MECHANICAL DROP & RETRIEVAL',
      color: '#FFE600',
      textColor: '#000000',
      badge: 'INSTANT CREDIT',
      desc: 'Tokens land in your wallet in the same block. Spring coil turns, retrieval flap unlocks, and thermal receipt prints with tx hash.',
      spec: 'EVENT: Dispensed(slot, recipient, amount, txHash)',
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-12 px-4 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-block bg-black text-[#00F0FF] font-black text-xs px-2 py-0.5 border-2 border-black tracking-widest uppercase mb-2">
            SECTION [03] // ARCHITECTURAL SCHEMATIC
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black flex items-center gap-3">
            MECHANICAL PROTOCOL
            <span className="text-xs font-bold bg-[#00F0FF] text-black px-2 py-1 neo-border">
              BLUEPRINT
            </span>
          </h2>
          <p className="font-bold text-xs sm:text-sm text-neutral-800 uppercase tracking-wide mt-1 max-w-3xl">
            How BlockVend operates at the byte level. Unlike traditional decentralized exchanges that rely on x*y=k pools and high slippage, BlockVend implements an automated physical vending logic.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 border-2 border-black p-1 bg-white neo-box">
          <button
            onClick={() => {
              soundFX.playKeypad(600);
              setActiveTab('STEPS');
            }}
            className={`px-3 py-1.5 text-xs font-black uppercase border border-black cursor-pointer ${
              activeTab === 'STEPS' ? 'bg-black text-[#FFE600]' : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            [1] 4-STEP BLUEPRINT
          </button>
          <button
            onClick={() => {
              soundFX.playKeypad(750);
              setActiveTab('OPCODE');
            }}
            className={`px-3 py-1.5 text-xs font-black uppercase border border-black cursor-pointer ${
              activeTab === 'OPCODE' ? 'bg-black text-[#00FF66]' : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            [2] SOLIDITY OPCODES
          </button>
        </div>
      </div>

      {activeTab === 'STEPS' ? (
        /* 4 Step Blueprint Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st) => (
            <div
              key={st.step}
              className="bg-white border-4 border-black neo-box-lg p-4 flex flex-col justify-between"
            >
              <div>
                {/* Step Top */}
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                  <span
                    className="text-xs font-black px-2 py-0.5 border border-black"
                    style={{ backgroundColor: st.color, color: st.textColor }}
                  >
                    STEP [{st.step}]
                  </span>
                  <span className="text-[10px] font-black bg-black text-white px-1.5 py-0.5">
                    {st.badge}
                  </span>
                </div>

                {/* Title */}
                <div className="text-lg font-black uppercase text-black mb-2 tracking-tight">
                  {st.title}
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-700 font-bold mb-4 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              {/* Technical Spec Box */}
              <div className="mt-auto bg-neutral-900 text-[#00FF66] p-2 border-2 border-black font-mono text-[10px] break-all">
                {st.spec}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Solidity Code wireframe display */
        <div className="bg-black text-[#00FF66] border-4 border-black neo-box-lg p-5 font-mono text-xs select-text">
          <div className="flex justify-between items-center border-b border-[#00FF66]/40 pb-2 mb-4 text-[#FFE600] font-bold">
            <span>CONTRACT: BlockVendCore.sol // SOLIDITY ^0.8.24</span>
            <span>NONREENTRANT // SAFE_ERC20</span>
          </div>

          <pre className="overflow-x-auto leading-relaxed text-xs">
{`// SPDX-License-Identifier: MIT
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

        // Route native ETH to vault
        (bool success, ) = operatorVault.call{value: msg.value}("");
        require(success, "ETH_TRANSFER_FAILED");

        // Dispense ERC-20 from canister reserve
        IERC20(item.tokenAddress).safeTransfer(msg.sender, item.dispenseAmount);

        emit Dispensed(slot, msg.sender, item.dispenseAmount, msg.value);
    }
}`}
          </pre>
        </div>
      )}

      {/* Protocol Guarantee Banner */}
      <div className="mt-6 bg-[#FFE600] border-3 border-black p-4 neo-box flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-[#FFE600] flex items-center justify-center font-black">
            !
          </div>
          <div className="text-xs font-black uppercase text-black">
            HARDWARE ADVANTAGE: 0% SANDWICH ATTACK RISK // 100% DETERMINISTIC EXECUTION
          </div>
        </div>

        <div className="text-xs font-bold font-mono text-black">
          GAS SAVINGS: ~68.4% VS UNISWAP V3 SWAP ROUTER
        </div>
      </div>
    </section>
  );
};
