import React, { useState } from 'react';
import { soundFX } from '../utils/audio';
import { ChevronDown, ChevronUp, Terminal, AlertOctagon, ExternalLink } from 'lucide-react';

interface MaintenanceFAQProps {
  onFaucetEth: () => void;
  onSelectSlot: (slot: string) => void;
}

export const MaintenanceFAQ: React.FC<MaintenanceFAQProps> = ({
  onFaucetEth,
  onSelectSlot,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'BLOCKVEND OPERATOR CONSOLE v3.4.1 [BOT CHAIN MAINNET]',
    'CONNECTED TO RPC: https://rpc.botchain.ai (CHAIN ID: 677)',
    'TYPE "help" FOR AVAILABLE COMMANDS',
  ]);

  const faqs = [
    {
      q: 'WHAT HAPPENS IF A DISPENSE TRANSACTION FAILS OR JAMS?',
      a: 'The BlockVend core smart contract on BOT Chain Mainnet implements atomic EVM state execution. If a canister has depleted its stock or the incoming native BOT deposit does not match the exact price, the entire transaction reverts via require statements. Your native BOT never leaves your wallet.',
    },
    {
      q: 'HOW CAN SLIPPAGE BE STRICTLY 0.00%?',
      a: 'Automated Market Makers (like Uniswap) adjust token prices along an x*y=k hyperbolic bonding curve as reserve ratios shift. BlockVend on BOT Chain does NOT use an AMM curve; it functions as a physical vending machine with static token inventory locked at hardcoded swap rates in native BOT.',
    },
    {
      q: 'WHAT ARE THE BOT CHAIN MAINNET SPECIFICATIONS?',
      a: 'Network Name: BOT Chain Mainnet | RPC URL: https://rpc.botchain.ai | Chain ID: 677 | Currency Symbol: BOT (18 Decimals) | Block Explorer: https://scan.botchain.ai | Verified Dispenser: 0xFD51797C48f75aF10761F92Bdd639e4518358324.',
    },
    {
      q: 'HOW DO TOKENS APPEAR IN MY METAMASK OR BROWSER WALLET?',
      a: 'Tokens are transferred directly to msg.sender. In addition, when you collect your dispensed item from the physical hatch, the interface provides a one-click "ADD TO METAMASK" button implementing EIP-747 (wallet_watchAsset).',
    },
    {
      q: 'CAN NEW CANISTERS BE INSTALLED IN THE CHASSIS?',
      a: 'Yes. The operator address on BOT Chain can call initializeCanister(slotCode, tokenAddr, priceBot, amount) to mount new ERC-20 tokens or NFT collections into vacant spring slots.',
    },
  ];

  const handleToggleFAQ = (idx: number) => {
    soundFX.playKeypad(600);
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playKeypad(750);
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, `> ${terminalInput}`];

    if (cmd === 'help') {
      newLogs.push('AVAILABLE COMMANDS: help, faucet, stats, dispense <slot>, audit, network, clear');
    } else if (cmd === 'faucet') {
      onFaucetEth();
      newLogs.push('OK: +10.0 BOT INJECTED INTO SIMULATOR SLOT');
    } else if (cmd === 'network') {
      newLogs.push('NETWORK: BOT Chain Mainnet | RPC: https://rpc.botchain.ai | ID: 677');
    } else if (cmd === 'stats') {
      newLogs.push('CHASSIS: BV-3000 // 12 CANISTERS ACTIVE // BOT CHAIN MAINNET // UPTIME: 99.99%');
    } else if (cmd.startsWith('dispense')) {
      const slot = cmd.split(' ')[1]?.toUpperCase();
      if (['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'].includes(slot)) {
        onSelectSlot(slot);
        newLogs.push(`OK: LOADED SLOT [${slot}] INTO CONSOLE. PUSH DISPENSE BUTTON.`);
      } else {
        newLogs.push(`ERR: INVALID SLOT. MUST BE A1 THROUGH C4.`);
      }
    } else if (cmd === 'audit') {
      newLogs.push('SECURITY: REENTRANCYGUARD ACTIVE // SAFE_ERC20 ENABLED // VERIFIED ON SCAN.BOTCHAIN.AI');
    } else if (cmd === 'clear') {
      setTerminalLogs(['TERMINAL CLEARED']);
      setTerminalInput('');
      return;
    } else {
      newLogs.push(`UNKNOWN COMMAND: "${cmd}". TYPE "help" FOR LIST.`);
    }

    setTerminalLogs(newLogs.slice(-10));
    setTerminalInput('');
  };

  const handleEmergencyStop = () => {
    soundFX.playBuzz();
    alert('EMERGENCY STOP PRESSED: ALL COIL MOTORS LOCKED. (SIMULATION TEST)');
  };

  return (
    <section id="faq" className="w-full py-12 px-4 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-block bg-black text-[#FFE600] font-black text-xs px-2 py-0.5 border-2 border-black tracking-widest uppercase mb-2">
          SECTION [06] // MAINTENANCE & TELEMETRY
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black flex items-center gap-3">
          MANUAL & TERMINAL
          <span className="text-xs font-bold bg-[#FF007F] text-white px-2 py-1 neo-border">
            BOT CHAIN DESK
          </span>
        </h2>
        <p className="font-bold text-xs sm:text-sm text-neutral-800 uppercase tracking-wide mt-1 max-w-3xl">
          Standard operating procedures, mechanical FAQ, and low-level CLI console for direct hardware inspection on BOT Chain Mainnet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Accordion FAQ (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border-3 border-black neo-box transition-all"
              >
                <button
                  onClick={() => handleToggleFAQ(idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm uppercase tracking-tight hover:bg-[#FFE600]/40 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="bg-black text-[#FFE600] px-1.5 py-0.5 text-xs font-mono">
                      Q{idx + 1}
                    </span>
                    <span>{item.q}</span>
                  </span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-2 border-t-2 border-black font-bold text-xs text-neutral-800 leading-relaxed bg-neutral-50 select-text">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Interactive Operator CLI Console (5 Cols) */}
        <div className="lg:col-span-5 bg-black border-4 border-black neo-box-lg p-4 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#00FF66]/40 pb-2 mb-3 text-[#00FF66] font-bold">
              <span className="flex items-center gap-1.5">
                <Terminal size={14} />
                <span>BOT CHAIN CLI // CHAIN ID: 677</span>
              </span>
              <span className="text-[10px] text-white font-mono">ROOT ACCESS</span>
            </div>

            {/* Log output */}
            <div className="space-y-1 text-[11px] text-[#00FF66] min-h-[170px] max-h-[220px] overflow-y-auto mb-3 select-text">
              {terminalLogs.map((log, i) => (
                <div key={i} className="leading-tight">
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Form */}
          <form onSubmit={handleTerminalSubmit} className="flex gap-2 border-t border-[#00FF66]/40 pt-3">
            <span className="text-[#00FF66] font-bold py-1">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder='Try "help", "faucet", "stats", "network"...'
              className="flex-1 bg-neutral-900 text-[#00FF66] px-2 py-1 border border-[#00FF66]/50 text-xs font-mono focus:outline-none focus:border-[#FFE600]"
            />
            <button
              type="submit"
              className="bg-[#00FF66] text-black px-3 py-1 text-xs font-black uppercase border border-black hover:bg-white cursor-pointer"
            >
              RUN
            </button>
          </form>
        </div>
      </div>

      {/* Emergency Stop Strip & Footer */}
      <div className="mt-12 bg-white border-4 border-black neo-box-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-[#FFE600] flex items-center justify-center font-black text-xl border-2 border-black">
              BV
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-black flex items-center gap-2">
                BLOCKVEND HARDWARE SYSTEM
                <span className="text-[10px] bg-[#00FF66] text-black px-1.5 py-0.5 border border-black font-bold">
                  BOT CHAIN
                </span>
              </div>
              <div className="text-xs font-bold text-neutral-600">
                STARK NEO-BRUTALIST PROTOCOL // BOT-TO-ERC20 DISPENSER
              </div>
            </div>
          </div>

          {/* Emergency Stop Lever */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleEmergencyStop}
              className="neo-btn bg-red-600 text-white px-4 py-2 text-xs font-black uppercase border-2 border-black hover:bg-black hover:text-red-500 flex items-center gap-1.5"
            >
              <AlertOctagon size={16} />
              <span>[ EMERGENCY COIL STOP ]</span>
            </button>
          </div>
        </div>

        {/* Specs Table Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono mb-4 text-black font-bold">
          <div className="bg-neutral-100 p-2 border border-black">
            <span className="text-[10px] text-neutral-500 block uppercase">NETWORK</span>
            BOT CHAIN MAINNET (677)
          </div>
          <div className="bg-neutral-100 p-2 border border-black">
            <span className="text-[10px] text-neutral-500 block uppercase">RPC ENDPOINT</span>
            RPC.BOTCHAIN.AI
          </div>
          <div className="bg-neutral-100 p-2 border border-black">
            <span className="text-[10px] text-neutral-500 block uppercase">NATIVE CURRENCY</span>
            BOT (18 DECIMALS)
          </div>
          <div className="bg-neutral-100 p-2 border border-black">
            <span className="text-[10px] text-neutral-500 block uppercase">DISPENSER CONTRACT</span>
            <a
              href="https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF007F] hover:underline flex items-center gap-1"
            >
              <span>0xFD51...8324</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Socials & Ecosystem Badges: Twitter/X, Powered by Botchain, Scan Link */}
        <div className="bg-[#FFE600] border-2 border-black p-3 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs font-black uppercase">
          {/* Twitter / X */}
          <a
            href="https://x.com/site_proof__"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 border border-black hover:bg-[#FF007F] transition-colors"
          >
            <span>TWITTER / X: @site_proof__</span>
            <ExternalLink size={12} />
          </a>

          {/* Powered by Botchain */}
          <a
            href="https://botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 border border-black hover:bg-[#00FF66] transition-colors"
          >
            <span>POWERED BY BOTCHAIN (BOTCHAIN.AI)</span>
            <ExternalLink size={12} />
          </a>

          {/* Scan Link to Contract */}
          <a
            href="https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-black text-[#00FF66] px-3 py-1.5 border border-black hover:bg-white hover:text-black transition-colors"
          >
            <span>EXPLORER: SCAN.BOTCHAIN.AI</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Copyright & Bottom Nav */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-bold text-neutral-600 gap-2">
          <div>
            &copy; 2026 BLOCKVEND PROTOCOL // ZERO GLASSMORPHISM // ZERO ROUNDED CORNERS // POWERED BY BOTCHAIN (CHAIN ID: 677)
          </div>
          <div className="flex gap-4">
            <a href="#vending-machine" className="hover:text-black uppercase underline">TOP OF MACHINE</a>
            <a href="#live-ledger" className="hover:text-black uppercase underline">DISPENSE LEDGER</a>
            <a href="#inventory-matrix" className="hover:text-black uppercase underline">VAULT MATRIX</a>
            <a
              href="https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black uppercase underline flex items-center gap-0.5"
            >
              <span>CONTRACT SCAN</span>
              <ExternalLink size={9} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
