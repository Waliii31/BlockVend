import React, { useState } from 'react';
import { Volume2, VolumeX, Wallet, RefreshCw, ExternalLink } from 'lucide-react';
import type { WalletState } from '../types';
import { soundFX } from '../utils/audio';
import { formatAddress } from '../utils/web3';

interface NavbarProps {
  wallet: WalletState;
  onConnectReal: () => void;
  onToggleSimulated: () => void;
  onFaucetEth: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  onConnectReal,
  onToggleSimulated,
  onFaucetEth,
  soundEnabled,
  onToggleSound,
}) => {
  const [faucetSpinning, setFaucetSpinning] = useState(false);

  const handleFaucet = () => {
    soundFX.playCoin();
    setFaucetSpinning(true);
    onFaucetEth();
    setTimeout(() => setFaucetSpinning(false), 600);
  };

  return (
    <header className="w-full neo-border-b bg-[#FFE600] text-black select-none sticky top-0 z-50">
      {/* Top System Status Ticker */}
      <div className="bg-black text-[#FFE600] px-3 py-1 flex flex-wrap justify-between items-center text-xs tracking-wider border-b border-black font-bold">
        <div className="flex items-center space-x-3 overflow-hidden">
          <span className="flex items-center gap-1.5 text-[#00FF66]">
            <span className="inline-block w-2 h-2 bg-[#00FF66] animate-pulse"></span>
            NETWORK: BOT CHAIN MAINNET (ID: 677)
          </span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <span className="hidden sm:inline">RPC: RPC.BOTCHAIN.AI</span>
          <span className="hidden md:inline text-neutral-500">|</span>
          <span className="hidden md:inline">CURRENCY: BOT</span>
          <span className="hidden lg:inline text-neutral-500">|</span>
          <span className="hidden lg:inline">SLIPPAGE: 0.00% FIXED</span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <a
            href="https://scan.botchain.ai/address/0xFD51797C48f75aF10761F92Bdd639e4518358324"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-[#00F0FF] hover:underline font-mono text-[11px]"
          >
            <span>0xFD51...8324</span>
            <ExternalLink size={10} />
          </a>

          <button
            onClick={() => {
              onToggleSound();
              soundFX.playKeypad(880);
            }}
            title={soundEnabled ? "Mute Mechanical Audio" : "Enable Mechanical Audio"}
            className="flex items-center gap-1 bg-[#FFE600] text-black px-2 py-0.5 border border-black hover:bg-white active:translate-y-0.5 cursor-pointer font-bold"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>AUDIO: {soundEnabled ? 'ON' : 'MUTED'}</span>
          </button>
        </div>
      </div>

      {/* Loud Marquee Warning Ribbon */}
      <div className="hazard-tape py-1 overflow-hidden border-b-2 border-black">
        <div className="animate-ticker text-xs font-black text-white bg-black py-0.5 px-4 tracking-widest uppercase">
          <span className="mx-6">★ BOT CHAIN MAINNET // 100% ON-CHAIN DISPENSER</span>
          <span className="mx-6">★ INSERT EXACT BOT NATIVE TOKENS FOR DIRECT ERC-20 OUTPUT</span>
          <span className="mx-6">★ POWERED BY BOTCHAIN (BOTCHAIN.AI)</span>
          <span className="mx-6">★ ZERO SLIPPAGE // ZERO MEV RISK</span>
          <span className="mx-6">★ CONTRACT: 0xFD51797C48f75aF10761F92Bdd639e4518358324</span>
          <span className="mx-6">★ BOT CHAIN MAINNET // 100% ON-CHAIN DISPENSER</span>
          <span className="mx-6">★ INSERT EXACT BOT NATIVE TOKENS FOR DIRECT ERC-20 OUTPUT</span>
          <span className="mx-6">★ POWERED BY BOTCHAIN (BOTCHAIN.AI)</span>
          <span className="mx-6">★ ZERO SLIPPAGE // ZERO MEV RISK</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo Branding */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-black text-[#FFE600] flex items-center justify-center font-black text-2xl neo-border neo-box group-hover:bg-[#FF007F] group-hover:text-white transition-colors">
              BV
            </div>
            <div>
              <div className="text-2xl font-black tracking-tighter leading-none flex items-center gap-1.5">
                BLOCKVEND
                <span className="text-[10px] bg-[#00FF66] text-black px-1.5 py-0.2 neo-border font-extrabold">
                  BOT CHAIN
                </span>
              </div>
              <div className="text-[10px] font-bold tracking-widest text-black/80 flex items-center gap-1">
                <span>POWERED BY</span>
                <span className="underline font-black text-black">BOTCHAIN.AI</span>
              </div>
            </div>
          </a>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 font-bold text-xs uppercase">
          <a
            href="#vending-machine"
            className="px-3 py-1.5 border-2 border-black bg-white hover:bg-[#00F0FF] active:translate-y-0.5 transition-colors"
          >
            [1] Dispenser
          </a>
          <a
            href="#live-ledger"
            className="px-3 py-1.5 border-2 border-black bg-white hover:bg-[#00FF66] active:translate-y-0.5 transition-colors"
          >
            [2] Ledger
          </a>
          <a
            href="#how-it-works"
            className="px-3 py-1.5 border-2 border-black bg-white hover:bg-[#FF007F] hover:text-white active:translate-y-0.5 transition-colors"
          >
            [3] Blueprint
          </a>
          <a
            href="#inventory-matrix"
            className="px-3 py-1.5 border-2 border-black bg-white hover:bg-[#FF5500] hover:text-white active:translate-y-0.5 transition-colors"
          >
            [4] Vault Stock
          </a>
          <a
            href="#specs"
            className="px-3 py-1.5 border-2 border-black bg-white hover:bg-black hover:text-[#FFE600] active:translate-y-0.5 transition-colors"
          >
            [5] Specs
          </a>
          <a
            href="#faq"
            className="px-3 py-1.5 border-2 border-black bg-white hover:bg-[#FFE600] active:translate-y-0.5 transition-colors"
          >
            [6] FAQ
          </a>
        </nav>

        {/* Wallet Connection & Faucet Station */}
        <div className="flex items-center gap-2">
          {/* Faucet Button */}
          <button
            onClick={handleFaucet}
            title="Inject +10.0 BOT into Simulated Slot"
            className="neo-btn bg-[#00FF66] text-black px-2.5 py-1.5 text-xs font-black flex items-center gap-1 border-2 border-black hover:bg-[#10ff00]"
          >
            <RefreshCw size={14} className={faucetSpinning ? "animate-spin" : ""} />
            <span className="hidden sm:inline">+10.0 BOT</span> FAUCET
          </button>

          {/* Wallet State Pill */}
          {wallet.isConnected ? (
            <div className="flex items-center neo-border-2 bg-white neo-box">
              <div className="px-2.5 py-1 text-xs font-black bg-black text-[#FFE600] border-r-2 border-black flex items-center gap-1">
                <Wallet size={13} />
                <span>{wallet.balanceEth.toFixed(3)} BOT</span>
              </div>
              <div className="px-2.5 py-1 text-xs font-bold text-black flex items-center gap-1">
                <span className="w-2 h-2 bg-[#00FF66] inline-block"></span>
                <span>{formatAddress(wallet.address)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                soundFX.playKeypad(500);
                onConnectReal();
              }}
              className="neo-btn bg-[#FF007F] text-white px-3 py-1.5 text-xs font-black flex items-center gap-1.5 border-2 border-black hover:bg-black hover:text-[#FFE600]"
            >
              <Wallet size={14} />
              <span>CONNECT BOT WALLET</span>
            </button>
          )}

          {/* Mode Switcher: Real BOT Chain Web3 vs Simulation */}
          <button
            onClick={() => {
              soundFX.playKeypad(600);
              onToggleSimulated();
            }}
            title={wallet.isSimulated ? "Currently in Simulation Mode. Click to connect real BOT Chain Mainnet." : "Currently on BOT Chain Mainnet. Click to switch to Simulator."}
            className={`border-2 border-black px-2 py-1.5 text-[10px] font-black cursor-pointer uppercase ${
              wallet.isSimulated ? 'bg-black text-[#00F0FF]' : 'bg-[#00F0FF] text-black'
            }`}
          >
            {wallet.isSimulated ? 'MODE: SIM' : 'MODE: BOT MAINNET'}
          </button>
        </div>
      </div>
    </header>
  );
};
