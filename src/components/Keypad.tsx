import React from 'react';
import type { CanisterItem, WalletState } from '../types';
import { soundFX } from '../utils/audio';
import { Zap, ArrowDownCircle, CheckCircle2, RotateCcw, Shuffle } from 'lucide-react';

interface KeypadProps {
  currentInput: string;
  selectedCanister: CanisterItem | null;
  wallet: WalletState;
  isDispensing: boolean;
  statusMessage: string;
  onKeyPress: (char: string) => void;
  onClear: () => void;
  onRandomSelect: () => void;
  onDispense: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  currentInput,
  selectedCanister,
  wallet,
  isDispensing,
  statusMessage,
  onKeyPress,
  onClear,
  onRandomSelect,
  onDispense,
}) => {
  const hasEnoughBalance = selectedCanister
    ? wallet.balanceEth >= selectedCanister.priceEth
    : false;

  const handleKeyClick = (val: string) => {
    soundFX.playKeypad();
    onKeyPress(val);
  };

  const handleClear = () => {
    soundFX.playKeypad(400);
    onClear();
  };

  const handleRandom = () => {
    soundFX.playKeypad(650);
    onRandomSelect();
  };

  const handleVendClick = () => {
    if (!selectedCanister) {
      soundFX.playBuzz();
      return;
    }
    if (!hasEnoughBalance) {
      soundFX.playBuzz();
      return;
    }
    soundFX.playCoin();
    onDispense();
  };

  return (
    <div className="bg-[#FFE600] border-4 border-black p-4 neo-box-lg flex flex-col justify-between">
      {/* Top Header Plate */}
      <div className="bg-black text-[#FFE600] px-3 py-1.5 border-2 border-black font-black text-xs tracking-wider flex justify-between items-center mb-4">
        <span>CONSOLE BV-UNIT #1</span>
        <span className="flex items-center gap-1 text-[10px]">
          <span className="w-2 h-2 bg-[#00FF66] inline-block animate-ping"></span>
          ONLINE
        </span>
      </div>

      {/* Retro LCD Screen */}
      <div className="lcd-screen p-3 mb-4 font-mono select-none">
        <div className="flex justify-between items-center border-b border-[#00FF66]/30 pb-1 mb-2 text-[10px] text-[#00FF66]/70">
          <span>BOT-DISPENSE PROTOCOL</span>
          <span>BOT CHAIN ID: 677</span>
        </div>

        {/* Dynamic Display Lines */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-[#00FF66]/60">PUNCHED CODE:</span>
            <span className="font-black text-[#FFE600] text-sm tracking-widest bg-black px-1.5 border border-[#00FF66]/50">
              {currentInput || (selectedCanister ? selectedCanister.slot : '--')}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#00FF66]/60">TOKEN ITEM:</span>
            <span className="font-bold text-white truncate max-w-[150px]">
              {selectedCanister ? `${selectedCanister.symbol} (${selectedCanister.dispenseAmount.toLocaleString()})` : 'AWAITING INPUT'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#00FF66]/60">SWAP PRICE:</span>
            <span className="font-black text-[#00FF66]">
              {selectedCanister ? `${selectedCanister.priceEth.toFixed(4)} BOT` : '0.0000 BOT'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#00FF66]/60">COIN BALANCE:</span>
            <span className="font-bold text-white">
              {wallet.balanceEth.toFixed(4)} BOT
            </span>
          </div>
        </div>

        {/* Status Line */}
        <div className="mt-3 pt-2 border-t border-[#00FF66]/40 text-[11px] font-bold uppercase flex items-center justify-between">
          <span className="truncate text-[#FFE600]">
            {isDispensing ? '>>> COIL MOTOR ACTIVE...' : `> ${statusMessage}`}
          </span>
          {isDispensing && (
            <span className="inline-block w-2 h-2 bg-[#FF007F] animate-pulse"></span>
          )}
        </div>
      </div>

      {/* Physical Coin/BOT Intake Slot */}
      <div className="bg-white border-2 border-black p-3 mb-4 neo-box-sm">
        <div className="flex items-center justify-between text-xs font-black uppercase mb-1">
          <span className="flex items-center gap-1">
            <Zap size={14} className="text-[#FF5500]" />
            INSERT BOT DEPOSIT
          </span>
          <span className="text-[10px] bg-black text-[#FFE600] px-1 py-0.5">
            0% SLIPPAGE
          </span>
        </div>

        {/* Physical Coin Slot Cutout Graphic */}
        <div className="bg-neutral-900 border-2 border-black p-2 flex items-center justify-between my-2">
          <div className="w-12 h-2 bg-black border-y border-neutral-600 shadow-inner"></div>
          <span className="text-[10px] text-white font-mono uppercase tracking-widest font-black">
            NATIVE BOT SLOT
          </span>
          <div className="w-3 h-3 bg-[#00FF66] border border-black animate-pulse"></div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800">
          <span>AVAILABLE FOR SWAP:</span>
          <span className="font-black text-black">{wallet.balanceEth.toFixed(3)} BOT</span>
        </div>
      </div>

      {/* Tactile Push-Button Keypad (Neo-Brutalist) */}
      <div className="mb-4">
        <div className="text-[10px] font-black uppercase text-black mb-1 flex justify-between">
          <span>TACTILE SELECTOR</span>
          <span>CLICK / KEYPAD</span>
        </div>

        {/* Letter Row */}
        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
          {['A', 'B', 'C', 'D'].map((char) => (
            <button
              key={char}
              onClick={() => handleKeyClick(char)}
              disabled={isDispensing}
              className={`keypad-btn py-2 text-sm font-black bg-white hover:bg-[#FFE600] border-2 border-black ${
                currentInput.startsWith(char) ? 'bg-black text-[#FFE600]' : 'text-black'
              }`}
            >
              {char}
            </button>
          ))}
        </div>

        {/* Number Grid 1-4 & Action Keys */}
        <div className="grid grid-cols-4 gap-1.5">
          {['1', '2', '3', '4'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyClick(num)}
              disabled={isDispensing}
              className={`keypad-btn py-2 text-sm font-black bg-white hover:bg-[#00F0FF] border-2 border-black ${
                currentInput.endsWith(num) ? 'bg-[#00F0FF] text-black font-extrabold' : 'text-black'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Function Keys Row */}
        <div className="grid grid-cols-2 gap-1.5 mt-1.5">
          <button
            onClick={handleClear}
            disabled={isDispensing}
            className="keypad-btn py-1.5 text-xs font-black bg-[#FF007F] text-white hover:bg-black border-2 border-black flex items-center justify-center gap-1"
          >
            <RotateCcw size={12} />
            [CLR]
          </button>
          <button
            onClick={handleRandom}
            disabled={isDispensing}
            className="keypad-btn py-1.5 text-xs font-black bg-[#00FF66] text-black hover:bg-white border-2 border-black flex items-center justify-center gap-1"
          >
            <Shuffle size={12} />
            [RAND]
          </button>
        </div>
      </div>

      {/* Massive Physical VEND Lever / Button */}
      <div className="mt-auto pt-2">
        <button
          onClick={handleVendClick}
          disabled={isDispensing || !selectedCanister || !hasEnoughBalance || selectedCanister.stock <= 0}
          className={`w-full py-4 text-center border-3 border-black text-sm font-black tracking-wider uppercase transition-all select-none ${
            isDispensing
              ? 'bg-neutral-800 text-white cursor-wait'
              : !selectedCanister
              ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed border-dashed'
              : !hasEnoughBalance
              ? 'bg-red-500 text-white hover:bg-red-600 cursor-not-allowed neo-box'
              : selectedCanister.stock <= 0
              ? 'bg-neutral-400 text-black cursor-not-allowed'
              : 'bg-[#FF007F] text-white hover:bg-[#d6006b] active:translate-y-1 active:shadow-none neo-box-md cursor-pointer'
          }`}
        >
          {isDispensing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#FFE600] animate-spin"></span>
              DISPENSING ON-CHAIN...
            </span>
          ) : !selectedCanister ? (
            '>> SELECT CANISTER SLOT'
          ) : selectedCanister.stock <= 0 ? (
            'OUT OF STOCK'
          ) : !hasEnoughBalance ? (
            'INSUFFICIENT BOT IN SLOT'
          ) : (
            <span className="flex items-center justify-center gap-2">
              <ArrowDownCircle size={18} />
              PUSH TO DISPENSE [{selectedCanister.slot}]
            </span>
          )}
        </button>

        {/* Quick Helper / Guarantee note */}
        <div className="mt-2 text-[9px] font-bold text-center text-black/70 flex items-center justify-center gap-1">
          <CheckCircle2 size={11} className="text-black" />
          <span>NON-CUSTODIAL // ATOMIC EVM SWAP // SAFE-ERC20</span>
        </div>
      </div>
    </div>
  );
};
