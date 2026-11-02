import React, { useState } from 'react';
import type { DispenseReceipt } from '../types';
import { soundFX } from '../utils/audio';
import { formatAddress } from '../utils/web3';
import { Printer, Check, Copy } from 'lucide-react';

interface LiveLedgerProps {
  receipts: DispenseReceipt[];
  userAddress: string;
  onSelectReceipt: (receipt: DispenseReceipt) => void;
}

export const LiveLedger: React.FC<LiveLedgerProps> = ({
  receipts,
  userAddress,
  onSelectReceipt,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'MINE'>('ALL');
  const [selectedForPrint, setSelectedForPrint] = useState<DispenseReceipt | null>(
    receipts[0] || null
  );
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filteredReceipts = receipts.filter((r) => {
    if (filter === 'MINE') {
      return (
        r.walletAddress.toLowerCase() === userAddress.toLowerCase() ||
        r.walletAddress.includes('0x71C')
      );
    }
    return true;
  });

  const handleCopy = (hash: string) => {
    soundFX.playKeypad(800);
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handlePrintClick = (receipt: DispenseReceipt) => {
    soundFX.playKeypad(900);
    setSelectedForPrint(receipt);
    onSelectReceipt(receipt);
  };

  return (
    <section id="live-ledger" className="w-full py-12 px-4 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-block bg-black text-[#00FF66] font-black text-xs px-2 py-0.5 border-2 border-black tracking-widest uppercase mb-2">
          SECTION [02] // REAL-TIME DISPENSE TAPE
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black flex items-center gap-3">
          TRANSACTION LEDGER
          <span className="text-xs font-bold bg-[#00FF66] text-black px-2 py-1 neo-border">
            LIVE FEED
          </span>
        </h2>
        <p className="font-bold text-xs sm:text-sm text-neutral-800 uppercase tracking-wide mt-1 max-w-3xl">
          Continuous cryptographic audit trail printed directly from the BlockVend EVM dispense queue. Each record represents an atomic native ETH payment and corresponding ERC-20 vault dispense.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Feed Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white border-4 border-black neo-box-lg p-4 sm:p-5">
          {/* Table Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-black">VIEW TAPE:</span>
              <button
                onClick={() => {
                  soundFX.playKeypad();
                  setFilter('ALL');
                }}
                className={`px-3 py-1 text-xs font-black border-2 border-black uppercase ${
                  filter === 'ALL' ? 'bg-black text-[#FFE600]' : 'bg-white hover:bg-neutral-100 text-black'
                }`}
              >
                ALL DISPENSES ({receipts.length})
              </button>
              <button
                onClick={() => {
                  soundFX.playKeypad();
                  setFilter('MINE');
                }}
                className={`px-3 py-1 text-xs font-black border-2 border-black uppercase ${
                  filter === 'MINE' ? 'bg-black text-[#FFE600]' : 'bg-white hover:bg-neutral-100 text-black'
                }`}
              >
                MY DISPENSES
              </button>
            </div>

            <div className="text-[11px] font-mono font-bold text-neutral-600 uppercase">
              STATUS: SYNCED W/ BLOCKCHAIN
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-black text-white font-black uppercase border-b-2 border-black text-[11px]">
                  <th className="p-2 border-r border-neutral-700">SLOT</th>
                  <th className="p-2 border-r border-neutral-700">TOKEN OUTPUT</th>
                  <th className="p-2 border-r border-neutral-700">BOT PAID</th>
                  <th className="p-2 border-r border-neutral-700">WALLET</th>
                  <th className="p-2 border-r border-neutral-700">TIME</th>
                  <th className="p-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {filteredReceipts.map((rcpt) => (
                  <tr
                    key={rcpt.id}
                    className="hover:bg-[#FFE600] transition-colors cursor-pointer group"
                    onClick={() => handlePrintClick(rcpt)}
                  >
                    <td className="p-2.5 font-black border-r border-black">
                      <span className="bg-black text-[#FFE600] px-1.5 py-0.5 border border-black">
                        [{rcpt.slot}]
                      </span>
                    </td>
                    <td className="p-2.5 font-bold border-r border-black">
                      <div className="font-black text-black">
                        +{rcpt.amountDispensed.toLocaleString()} {rcpt.tokenSymbol}
                      </div>
                      <div className="text-[10px] text-neutral-600">{rcpt.tokenName}</div>
                    </td>
                    <td className="p-2.5 font-black border-r border-black text-black">
                      {rcpt.ethPaid} BOT
                    </td>
                    <td className="p-2.5 font-bold border-r border-black text-neutral-800">
                      {formatAddress(rcpt.walletAddress)}
                    </td>
                    <td className="p-2.5 text-neutral-600 border-r border-black text-[11px]">
                      {rcpt.timestamp}
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrintClick(rcpt);
                        }}
                        className="bg-black text-white px-2 py-1 text-[10px] font-black uppercase border border-black group-hover:bg-[#FF007F] group-hover:text-white"
                      >
                        VIEW TAPE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Brutalist Thermal Receipt Tape Printer (4 Cols) */}
        <div className="lg:col-span-4 bg-[#FFE600] border-4 border-black neo-box-lg p-4">
          <div className="flex items-center justify-between bg-black text-[#FFE600] p-2 border-2 border-black font-black text-xs uppercase mb-3">
            <span className="flex items-center gap-1.5">
              <Printer size={14} />
              THERMAL TAPE OUTPUT
            </span>
            <span className="text-[10px] bg-[#FF007F] text-white px-1">203 DPI</span>
          </div>

          {/* Jagged Receipt Paper Wireframe */}
          <div className="bg-white border-3 border-black p-4 font-mono text-xs neo-box-sm text-black select-text">
            {/* Receipt Header */}
            <div className="text-center border-b-2 border-dashed border-black pb-3 mb-3">
              <div className="font-black text-lg tracking-tight">BLOCKVEND DISPENSER</div>
              <div className="text-[10px] font-bold text-neutral-600">
                100% NON-CUSTODIAL EVM VENDING
              </div>
              <div className="text-[9px] text-neutral-500 mt-1">
                TIMESTAMP: 2026-10-24 15:52:52 UTC
              </div>
            </div>

            {selectedForPrint ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span>RECEIPT NO:</span>
                  <span className="font-black">{selectedForPrint.id}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>SLOT NUMBER:</span>
                  <span className="bg-black text-[#FFE600] px-1 font-black">
                    [{selectedForPrint.slot}]
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>ITEM PURCHASED:</span>
                  <span className="font-black">{selectedForPrint.tokenSymbol}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>DISPENSED QTY:</span>
                  <span className="font-black">
                    {selectedForPrint.amountDispensed.toLocaleString()} UNITS
                  </span>
                </div>
                <div className="border-t border-dashed border-black my-2 pt-2 flex justify-between font-black text-sm">
                  <span>AMOUNT DEPOSITED:</span>
                  <span>{selectedForPrint.ethPaid} BOT</span>
                </div>
                <div className="flex justify-between text-[10px] text-neutral-700">
                  <span>GAS CONSUMED:</span>
                  <span>{selectedForPrint.gasUsed} UNITS</span>
                </div>
                <div className="flex justify-between text-[10px] text-neutral-700">
                  <span>BLOCK HEIGHT:</span>
                  <span>#{selectedForPrint.blockNumber} (BOT CHAIN)</span>
                </div>

                {/* Hash */}
                <div className="pt-2 border-t border-dashed border-black">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[9px] font-bold uppercase text-neutral-600">
                      TRANSACTION HASH:
                    </span>
                    <a
                      href={`https://scan.botchain.ai/tx/${selectedForPrint.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] text-[#FF007F] font-bold hover:underline"
                    >
                      VIEW ON SCAN &rarr;
                    </a>
                  </div>
                  <div className="text-[9px] break-all bg-neutral-100 p-1 border border-black font-mono">
                    {selectedForPrint.txHash}
                  </div>
                </div>

                {/* ASCII Barcode wireframe */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-black flex flex-col items-center">
                  <div className="font-mono text-center tracking-[4px] text-xs font-black select-none leading-none">
                    || | ||| |||| | |||| || | || |||| | |||
                  </div>
                  <div className="text-[8px] font-mono font-bold tracking-widest mt-1">
                    * {selectedForPrint.id} *
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-neutral-500 font-bold">
                SELECT TRANSACTION TO PREVIEW RECEIPT TAPE
              </div>
            )}
          </div>

          {/* Copy Hash & Full Modal Button */}
          {selectedForPrint && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleCopy(selectedForPrint.txHash)}
                className="flex-1 bg-black text-[#FFE600] py-2 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black flex items-center justify-center gap-1 cursor-pointer"
              >
                {copiedHash === selectedForPrint.txHash ? (
                  <>
                    <Check size={12} className="text-[#00FF66]" />
                    <span>HASH COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>COPY TX HASH</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
