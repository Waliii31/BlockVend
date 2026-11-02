import React, { useState } from 'react';
import type { CanisterItem } from '../types';
import { soundFX } from '../utils/audio';
import { formatAddress } from '../utils/web3';
import { Copy, Check, Wrench, ExternalLink } from 'lucide-react';

interface InventoryMatrixProps {
  canisters: CanisterItem[];
  onSelectSlot: (slot: string) => void;
  onRestockAll: () => void;
}

export const InventoryMatrix: React.FC<InventoryMatrixProps> = ({
  canisters,
  onSelectSlot,
  onRestockAll,
}) => {
  const [operatorMode, setOperatorMode] = useState<boolean>(false);
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null);

  const handleCopy = (addr: string) => {
    soundFX.playKeypad(850);
    navigator.clipboard.writeText(addr);
    setCopiedAddr(addr);
    setTimeout(() => setCopiedAddr(null), 2000);
  };

  const handlePunch = (slot: string) => {
    soundFX.playKeypad(700);
    onSelectSlot(slot);
    // Smooth scroll to vending machine
    const el = document.getElementById('vending-machine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRestock = () => {
    soundFX.playCoin();
    onRestockAll();
  };

  return (
    <section id="inventory-matrix" className="w-full py-12 px-4 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-block bg-black text-[#FF5500] font-black text-xs px-2 py-0.5 border-2 border-black tracking-widest uppercase mb-2">
            SECTION [04] // RESERVE AUDIT & INVENTORY
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black flex items-center gap-3">
            CANISTER CATALOG
            <span className="text-xs font-bold bg-[#FF5500] text-white px-2 py-1 neo-border">
              VAULT RESERVES
            </span>
          </h2>
          <p className="font-bold text-xs sm:text-sm text-neutral-800 uppercase tracking-wide mt-1 max-w-3xl">
            Complete inventory transparency. Every canister is pre-funded with verified ERC-20 liquidity locked directly inside the vending machine smart contract.
          </p>
        </div>

        {/* Operator Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.playKeypad(500);
              setOperatorMode(!operatorMode);
            }}
            className={`px-3 py-2 text-xs font-black uppercase border-2 border-black flex items-center gap-1.5 cursor-pointer ${
              operatorMode ? 'bg-black text-[#FFE600]' : 'bg-white hover:bg-neutral-100 text-black'
            }`}
          >
            <Wrench size={13} />
            <span>OPERATOR MODE: {operatorMode ? 'ENABLED' : 'DISABLED'}</span>
          </button>

          {operatorMode && (
            <button
              onClick={handleRestock}
              className="bg-[#00FF66] text-black px-3 py-2 text-xs font-black uppercase border-2 border-black hover:bg-white cursor-pointer flex items-center gap-1"
            >
              <span>RESTOCK ALL CANISTERS</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Catalog Table */}
      <div className="bg-white border-4 border-black neo-box-lg p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-black text-white font-black uppercase border-b-2 border-black text-[11px]">
                <th className="p-2.5 border-r border-neutral-700">SLOT</th>
                <th className="p-2.5 border-r border-neutral-700">TOKEN & NAME</th>
                <th className="p-2.5 border-r border-neutral-700">CATEGORY</th>
                <th className="p-2.5 border-r border-neutral-700">SWAP RATE (BOT)</th>
                <th className="p-2.5 border-r border-neutral-700">DISPENSE QTY</th>
                <th className="p-2.5 border-r border-neutral-700">STOCK LEVEL</th>
                <th className="p-2.5 border-r border-neutral-700">CONTRACT (BOT CHAIN)</th>
                <th className="p-2.5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black text-xs font-bold">
              {canisters.map((c) => {
                const stockPercent = Math.round((c.stock / c.maxStock) * 100);
                return (
                  <tr key={c.slot} className="hover:bg-[#FFE600]/30 transition-colors">
                    {/* Slot */}
                    <td className="p-3 border-r border-black font-black">
                      <span className="bg-black text-[#FFE600] px-2 py-1 border border-black">
                        [{c.slot}]
                      </span>
                    </td>

                    {/* Token */}
                    <td className="p-3 border-r border-black">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 border border-black inline-block"
                          style={{ backgroundColor: c.bgColor }}
                        ></span>
                        <div>
                          <div className="font-black text-black">{c.symbol}</div>
                          <div className="text-[10px] text-neutral-600">{c.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3 border-r border-black">
                      <span className="bg-neutral-100 text-black px-1.5 py-0.5 border border-black text-[10px]">
                        {c.category}
                      </span>
                    </td>

                    {/* Rate */}
                    <td className="p-3 border-r border-black font-black text-black">
                      {c.priceEth.toFixed(3)} BOT
                    </td>

                    {/* Qty */}
                    <td className="p-3 border-r border-black font-black text-black">
                      {c.dispenseAmount.toLocaleString()}
                    </td>

                    {/* Stock with Progress Bar */}
                    <td className="p-3 border-r border-black">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-neutral-200 border border-black h-3 overflow-hidden">
                          <div
                            className={`h-full ${
                              stockPercent > 50
                                ? 'bg-[#00FF66]'
                                : stockPercent > 20
                                ? 'bg-[#FFE600]'
                                : 'bg-[#FF007F]'
                            }`}
                            style={{ width: `${stockPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-black">
                          {c.stock}/{c.maxStock}
                        </span>
                      </div>
                    </td>

                    {/* Contract Address */}
                    <td className="p-3 border-r border-black">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(c.contractAddress)}
                          className="flex items-center gap-1 text-[11px] text-black hover:text-[#FF007F] font-mono"
                          title="Click to copy contract address"
                        >
                          <span>{formatAddress(c.contractAddress)}</span>
                          {copiedAddr === c.contractAddress ? (
                            <Check size={11} className="text-[#00FF66]" />
                          ) : (
                            <Copy size={11} />
                          )}
                        </button>
                        <a
                          href={`https://scan.botchain.ai/address/${c.contractAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on Botchain Explorer"
                          className="text-neutral-500 hover:text-black"
                        >
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </td>

                    {/* Action: Punch into Keypad */}
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handlePunch(c.slot)}
                        className="bg-black text-[#FFE600] px-3 py-1 text-xs font-black uppercase border border-black hover:bg-[#FF007F] hover:text-white cursor-pointer"
                      >
                        PUNCH [{c.slot}]
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
