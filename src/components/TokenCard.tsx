import React from 'react';
import type { CanisterItem } from '../types';

interface TokenCardProps {
  canister: CanisterItem;
  isSelected: boolean;
  isDispensing: boolean;
  onSelect: (canister: CanisterItem) => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  canister,
  isSelected,
  isDispensing,
  onSelect,
}) => {
  const isOutOfStock = canister.stock <= 0;

  return (
    <div
      onClick={() => !isOutOfStock && onSelect(canister)}
      className={`relative flex flex-col justify-between p-3 border-2 border-black transition-all cursor-pointer select-none ${
        isSelected
          ? 'bg-[#FFE600] ring-4 ring-black neo-box-md scale-[1.02] z-10'
          : 'bg-white hover:bg-neutral-50 neo-box hover:-translate-y-0.5'
      } ${isOutOfStock ? 'opacity-40 cursor-not-allowed bg-neutral-200' : ''}`}
      style={{
        boxShadow: isSelected ? '6px 6px 0px #000000' : '3px 3px 0px #000000',
      }}
    >
      {/* Top Header: Slot Code & Status Badge */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <div className="bg-black text-[#FFE600] font-black text-xs px-2 py-0.5 border border-black tracking-widest">
          [{canister.slot}]
        </div>

        {canister.badge && (
          <div
            className="text-[9px] font-black px-1.5 py-0.5 uppercase border border-black"
            style={{
              backgroundColor: canister.bgColor,
              color: canister.textColor,
            }}
          >
            {canister.badge}
          </div>
        )}
      </div>

      {/* Mechanical Wireframe Coil & Token Canister Visual */}
      <div className="relative my-2 py-3 bg-neutral-100 border-2 border-black flex flex-col items-center justify-center overflow-hidden">
        {/* Background mechanical coil wireframe SVG */}
        <div
          className={`w-full flex justify-center py-1 ${
            isDispensing ? 'animate-dispense-coil text-[#FF007F]' : 'text-black'
          }`}
        >
          <svg
            className="w-20 h-10 stroke-current"
            viewBox="0 0 100 40"
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="square"
          >
            {/* Vending machine spring coil wireframe */}
            <path d="M5 20 C15 5, 20 5, 25 20 C30 35, 35 35, 40 20 C45 5, 50 5, 55 20 C60 35, 65 35, 70 20 C75 5, 80 5, 85 20 C90 35, 95 35, 100 20" />
            <line x1="5" y1="20" x2="0" y2="20" strokeWidth="4" />
          </svg>
        </div>

        {/* Token Pack / Canister Block */}
        <div
          className="w-11/12 py-2 px-2 border-2 border-black flex flex-col items-center text-center shadow-[2px_2px_0px_#000]"
          style={{
            backgroundColor: canister.bgColor,
            color: canister.textColor,
          }}
        >
          <div className="text-sm font-black tracking-tight leading-none mb-1">
            {canister.symbol}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider truncate max-w-full">
            {canister.dispenseAmount.toLocaleString()} UNITS
          </div>
        </div>

        {/* Coil Mechanism Base Shadow */}
        <div className="w-full h-1.5 bg-black mt-2"></div>
      </div>

      {/* Token Details */}
      <div className="mt-1">
        <div className="text-xs font-black uppercase truncate text-black mb-0.5">
          {canister.name}
        </div>
        <div className="text-[10px] text-neutral-600 line-clamp-1 font-bold">
          {canister.description}
        </div>
      </div>

      {/* Price & Stock Tray */}
      <div className="mt-3 pt-2 border-t-2 border-black flex items-center justify-between text-xs">
        <div>
          <span className="text-[9px] font-bold uppercase block text-neutral-600">PRICE</span>
          <span className="font-black bg-[#FFE600] px-1 border border-black text-black">
            {canister.priceEth} BOT
          </span>
        </div>

        <div className="text-right">
          <span className="text-[9px] font-bold uppercase block text-neutral-600">STOCK</span>
          <span
            className={`font-black text-xs ${
              isOutOfStock
                ? 'text-red-600 bg-red-100 px-1 border border-red-600'
                : 'text-black'
            }`}
          >
            {canister.stock}/{canister.maxStock}
          </span>
        </div>
      </div>

      {/* Dispensing Action Indicator Overlay */}
      {isDispensing && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-[#00FF66] p-2 text-center z-20 border-2 border-black">
          <div className="text-sm font-black tracking-widest animate-pulse mb-1">
            TURNING COIL...
          </div>
          <div className="text-[10px] text-white font-mono uppercase">
            DISPENSING TO HATCH
          </div>
        </div>
      )}
    </div>
  );
};
