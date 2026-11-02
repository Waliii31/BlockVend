import React, { useEffect } from 'react';
import type { DispenseReceipt, CanisterItem } from '../types';
import { soundFX } from '../utils/audio';
import { watchAssetInMetaMask } from '../utils/web3';
import { Check, Copy, Printer, PlusCircle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DispenseModalProps {
  receipt: DispenseReceipt | null;
  canister: CanisterItem | null;
  onClose: () => void;
  onPrintReceipt: (receipt: DispenseReceipt) => void;
}

export const DispenseModal: React.FC<DispenseModalProps> = ({
  receipt,
  canister,
  onClose,
  onPrintReceipt,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [addedToMetaMask, setAddedToMetaMask] = React.useState(false);

  useEffect(() => {
    if (receipt) {
      soundFX.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFE600', '#FF007F', '#00FF66', '#00F0FF', '#000000'],
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback
      }
    }
  }, [receipt]);

  if (!receipt || !canister) return null;

  const handleCopy = (text: string) => {
    soundFX.playKeypad(900);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToMetaMask = async () => {
    soundFX.playKeypad(800);
    const success = await watchAssetInMetaMask(canister);
    if (success) setAddedToMetaMask(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-lg bg-[#FFE600] border-4 border-black neo-box-xl p-5 select-none animate-drop-token"
        style={{ borderRadius: 0 }}
      >
        {/* Top Header Plate */}
        <div className="flex items-center justify-between bg-black text-[#FFE600] px-3 py-2 border-2 border-black font-black text-sm tracking-widest mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#00FF66] inline-block animate-pulse"></span>
            <span>TOKEN DISPENSED FROM [{receipt.slot}]</span>
          </div>
          <button
            onClick={() => {
              soundFX.playKeypad(400);
              onClose();
            }}
            className="text-white hover:text-[#FF007F] border border-white px-1.5 py-0.5 text-xs font-mono font-bold"
          >
            [ESC / X]
          </button>
        </div>

        {/* Big Celebration Banner */}
        <div className="bg-white border-3 border-black p-4 mb-4 neo-box text-center">
          <div className="text-xs font-black uppercase text-neutral-600 mb-1">
            SUCCESSFUL ATOMIC DISPENSE
          </div>
          <div className="text-3xl font-black text-black tracking-tight mb-1">
            +{receipt.amountDispensed.toLocaleString()} {receipt.tokenSymbol}
          </div>
          <div className="text-xs font-bold uppercase text-neutral-800">
            {receipt.tokenName} CANISTER
          </div>
        </div>

        {/* Receipt Spec Box */}
        <div className="bg-[#000000] text-[#00FF66] p-3 border-2 border-black font-mono text-xs mb-4 space-y-1.5">
          <div className="flex justify-between border-b border-[#00FF66]/30 pb-1">
            <span className="text-white font-bold">RECEIPT ID:</span>
            <span>{receipt.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white font-bold">BOT DEPOSITED:</span>
            <span className="text-[#FFE600] font-black">{receipt.ethPaid} BOT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white font-bold">GAS CONSUMED:</span>
            <span>{receipt.gasUsed.toLocaleString()} GAS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white font-bold">BLOCK CONFIRMATION:</span>
            <span>#{receipt.blockNumber} (BOT CHAIN MAINNET)</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-[#00FF66]/30">
            <span className="text-white font-bold">TX HASH:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(receipt.txHash)}
                className="flex items-center gap-1 text-[10px] text-[#00F0FF] hover:underline"
              >
                <span className="truncate max-w-[120px]">{receipt.txHash}</span>
                {copied ? <Check size={11} className="text-[#00FF66]" /> : <Copy size={11} />}
              </button>
              <a
                href={`https://scan.botchain.ai/tx/${receipt.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                title="View on Botchain Explorer"
                className="text-[#00FF66] hover:text-white"
              >
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={handleAddToMetaMask}
            className="neo-btn bg-[#00F0FF] text-black py-2.5 px-3 text-xs font-black flex items-center justify-center gap-1.5 border-2 border-black hover:bg-white"
          >
            <PlusCircle size={14} />
            <span>{addedToMetaMask ? 'TOKEN IMPORTED' : 'ADD TO METAMASK'}</span>
          </button>

          <button
            onClick={() => onPrintReceipt(receipt)}
            className="neo-btn bg-[#FF007F] text-white py-2.5 px-3 text-xs font-black flex items-center justify-center gap-1.5 border-2 border-black hover:bg-black hover:text-[#FFE600]"
          >
            <Printer size={14} />
            <span>PRINT RECEIPT TAPE</span>
          </button>
        </div>

        {/* Close / Return Button */}
        <button
          onClick={() => {
            soundFX.playKeypad(500);
            onClose();
          }}
          className="w-full py-3 bg-black text-[#FFE600] font-black text-xs tracking-wider uppercase border-2 border-black hover:bg-white hover:text-black cursor-pointer transition-colors"
        >
          [ CLOSE & RETURN TO DISPENSER ]
        </button>
      </div>
    </div>
  );
};
