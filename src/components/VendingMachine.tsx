import React, { useState } from 'react';
import type { CanisterItem, DispenseReceipt, WalletState } from '../types';
import { TokenCard } from './TokenCard';
import { Keypad } from './Keypad';
import { soundFX } from '../utils/audio';
import { sendInjectedTx, generateTxHash } from '../utils/web3';
import { ArrowDown, PackageCheck } from 'lucide-react';

interface VendingMachineProps {
  canisters: CanisterItem[];
  wallet: WalletState;
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
  onUpdateWallet: (updater: (prev: WalletState) => WalletState) => void;
  onDispenseSuccess: (receipt: DispenseReceipt, canister: CanisterItem) => void;
  onUpdateCanisters: (updater: (prev: CanisterItem[]) => CanisterItem[]) => void;
}

export const VendingMachine: React.FC<VendingMachineProps> = ({
  canisters,
  wallet,
  selectedSlot,
  onSelectSlot,
  onUpdateWallet,
  onDispenseSuccess,
  onUpdateCanisters,
}) => {
  const [currentInput, setCurrentInput] = useState<string>(selectedSlot);
  const [isDispensing, setIsDispensing] = useState<boolean>(false);
  const [dispensedInTray, setDispensedInTray] = useState<{
    canister: CanisterItem;
    receipt: DispenseReceipt;
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('INSERT BOT & SELECT SLOT');
  const [activeDispensingSlot, setActiveDispensingSlot] = useState<string | null>(null);

  const selectedCanister = canisters.find((c) => c.slot === selectedSlot) || canisters[0];

  // Sync currentInput when selectedSlot changes from external
  React.useEffect(() => {
    setCurrentInput(selectedSlot);
    const item = canisters.find((c) => c.slot === selectedSlot);
    if (item) {
      setStatusMessage(`SLOT [${item.slot}] LOADED: ${item.symbol}`);
    }
  }, [selectedSlot, canisters]);

  // Handle tactile keypad clicks
  const handleKeyPress = (char: string) => {
    let newInput = currentInput;
    if (['A', 'B', 'C', 'D'].includes(char)) {
      newInput = char; // Set letter
    } else if (['1', '2', '3', '4'].includes(char)) {
      if (currentInput.length === 1 && ['A', 'B', 'C', 'D'].includes(currentInput)) {
        newInput = currentInput + char;
      } else {
        newInput = char;
      }
    }

    setCurrentInput(newInput);

    // If valid 2-char slot e.g. "A1", select it
    if (newInput.length === 2) {
      const match = canisters.find((c) => c.slot === newInput);
      if (match) {
        onSelectSlot(match.slot);
        setStatusMessage(`SLOT [${match.slot}] SELECTED: ${match.symbol}`);
      } else {
        setStatusMessage(`SLOT [${newInput}] NOT FOUND`);
        soundFX.playBuzz();
      }
    } else {
      setStatusMessage(`ENTERING SLOT CODE: ${newInput}_`);
    }
  };

  const handleClear = () => {
    setCurrentInput('');
    setStatusMessage('SELECTION CLEARED');
  };

  const handleRandomSelect = () => {
    const inStock = canisters.filter((c) => c.stock > 0);
    if (inStock.length > 0) {
      const randomCanister = inStock[Math.floor(Math.random() * inStock.length)];
      onSelectSlot(randomCanister.slot);
      setCurrentInput(randomCanister.slot);
      setStatusMessage(`LUCKY PICK: [${randomCanister.slot}] ${randomCanister.symbol}`);
    }
  };

  const handleSelectCanister = (canister: CanisterItem) => {
    soundFX.playKeypad(700);
    onSelectSlot(canister.slot);
    setCurrentInput(canister.slot);
    setStatusMessage(`SELECTED [${canister.slot}] ${canister.name}`);
  };

  // Perform fixed-rate atomic swap transaction
  const handleDispense = async () => {
    if (!selectedCanister) return;
    if (wallet.balanceEth < selectedCanister.priceEth) {
      setStatusMessage('ERROR: INSUFFICIENT BOT BALANCE');
      soundFX.playBuzz();
      return;
    }
    if (selectedCanister.stock <= 0) {
      setStatusMessage('ERROR: CANISTER DEPLETED');
      soundFX.playBuzz();
      return;
    }

    setIsDispensing(true);
    setActiveDispensingSlot(selectedCanister.slot);
    setStatusMessage(`DISPENSING [${selectedCanister.slot}] ON BOT CHAIN...`);

    // Play motor winding sound
    soundFX.playMotor();

    try {
      let receipt: DispenseReceipt | null = null;

      if (!wallet.isSimulated && wallet.isConnected) {
        // Attempt real injected Web3 transaction via MetaMask
        receipt = await sendInjectedTx(wallet.address, selectedCanister.priceEth, selectedCanister);
        if (!receipt) {
          setIsDispensing(false);
          setActiveDispensingSlot(null);
          setStatusMessage('TRANSACTION REJECTED BY USER');
          soundFX.playBuzz();
          return;
        }
      } else {
        // Simulated instant on-chain transaction
        await new Promise((resolve) => setTimeout(resolve, 1400));
        receipt = {
          id: `RCPT-${Math.floor(1000 + Math.random() * 9000)}`,
          txHash: generateTxHash(),
          blockNumber: 421000 + Math.floor(Math.random() * 50),
          timestamp: 'Just now',
          walletAddress: wallet.address,
          slot: selectedCanister.slot,
          tokenSymbol: selectedCanister.symbol,
          tokenName: selectedCanister.name,
          amountDispensed: selectedCanister.dispenseAmount,
          ethPaid: selectedCanister.priceEth,
          gasUsed: 42150 + Math.floor(Math.random() * 600),
          status: 'DROPPED',
        };
      }

      // Play drop sound
      soundFX.playDrop();

      // Deduct balance & add token to inventory
      onUpdateWallet((prev) => ({
        ...prev,
        balanceEth: Math.max(0, prev.balanceEth - selectedCanister.priceEth),
        inventory: {
          ...prev.inventory,
          [selectedCanister.symbol]:
            (prev.inventory[selectedCanister.symbol] || 0) + selectedCanister.dispenseAmount,
        },
      }));

      // Decrement stock in canister
      onUpdateCanisters((prev) =>
        prev.map((c) =>
          c.slot === selectedCanister.slot ? { ...c, stock: Math.max(0, c.stock - 1) } : c
        )
      );

      // Set dispensed item in physical bottom hopper tray
      setDispensedInTray({
        canister: selectedCanister,
        receipt,
      });

      setStatusMessage(`SUCCESS: [${selectedCanister.symbol}] DROPPED TO HATCH!`);
    } catch (err) {
      console.error(err);
      setStatusMessage('TRANSACTION EXECUTION FAILED');
      soundFX.playBuzz();
    } finally {
      setIsDispensing(false);
      setActiveDispensingSlot(null);
    }
  };

  const handleRetrieveHatch = () => {
    if (!dispensedInTray) {
      soundFX.playKeypad(300);
      return;
    }
    soundFX.playKeypad(900);
    const item = dispensedInTray;
    setDispensedInTray(null);
    onDispenseSuccess(item.receipt, item.canister);
  };

  return (
    <section id="vending-machine" className="w-full py-12 px-4 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-block bg-black text-[#FFE600] font-black text-xs px-2 py-0.5 border-2 border-black tracking-widest uppercase mb-2">
          SECTION [01] // PHYSICAL DISPENSER CHASSIS
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black flex items-center gap-3">
          BLOCKVEND APPARATUS
          <span className="text-xs font-bold bg-[#FF007F] text-white px-2 py-1 neo-border">
            100% ON-CHAIN
          </span>
        </h2>
        <p className="font-bold text-xs sm:text-sm text-neutral-800 uppercase tracking-wide mt-1 max-w-3xl">
          A physical hardware wireframe interface executing deterministic, fixed-rate EVM token swaps on BOT Chain Mainnet. No dynamic bonding curves. No MEV slippage. Just insert native BOT, enter slot code, and push the flap.
        </p>
      </div>

      {/* Main Massive Vending Machine Enclosure */}
      <div className="bg-[#FFE600] border-4 border-black neo-box-xl p-4 sm:p-6 wireframe-grid">
        {/* Vending Machine Illuminated Marquee Banner */}
        <div className="bg-black text-[#FFE600] p-4 border-3 border-black mb-6 neo-box flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF007F] text-white flex items-center justify-center font-black text-2xl border-2 border-white">
              BV
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                BLOCKVEND 3000
                <span className="text-[10px] bg-[#00FF66] text-black px-1.5 py-0.5 border border-black font-bold">
                  BOT CHAIN UNIT
                </span>
              </div>
              <div className="text-xs text-[#FFE600] font-bold tracking-widest">
                SELECT SLOT [A1-C4] // FIXED BOT SWAP RATE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-black">
            <div className="border border-[#FFE600] px-3 py-1 bg-neutral-900 text-[#00FF66]">
              SERVO: 12 COILS READY
            </div>
            <div className="border border-[#FFE600] px-3 py-1 bg-neutral-900 text-white hidden sm:block">
              RESERVE: 100% FUNDED
            </div>
          </div>
        </div>

        {/* Machine Main Body: 2 Columns (Shelf Cabinet vs Control Console) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: 12-Slot Wireframe Display Cabinet (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Shelf Display Cabinet Glass Enclosure */}
            <div className="bg-neutral-100 border-4 border-black p-4 neo-box-lg">
              {/* Cabinet Top Header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4 text-xs font-black uppercase text-black">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#FF007F] inline-block"></span>
                  VAULT CANISTER MATRIX // 12 DISPENSE SLOTS
                </span>
                <span className="text-[10px] bg-black text-[#FFE600] px-2 py-0.5">
                  TEMPERED REINFORCED WIREFRAME
                </span>
              </div>

              {/* 3 Rows x 4 Columns Shelf Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {canisters.map((canister) => (
                  <TokenCard
                    key={canister.slot}
                    canister={canister}
                    isSelected={selectedCanister.slot === canister.slot}
                    isDispensing={activeDispensingSlot === canister.slot}
                    onSelect={handleSelectCanister}
                  />
                ))}
              </div>

              {/* Cabinet Interior Shelf Floor Rail */}
              <div className="mt-4 pt-2 border-t-3 border-black flex justify-between items-center text-[10px] font-black uppercase text-neutral-600">
                <span>SPRING COIL APERTURE: 50MM</span>
                <span>MOTORIZED ROTATION ANGLE: 360° DETERMINISTIC</span>
              </div>
            </div>

            {/* Dispense Hopper & Physical Flap (Bottom Drop Area) */}
            <div className="mt-6 bg-[#000000] border-4 border-black p-4 neo-box-lg text-white">
              <div className="flex items-center justify-between border-b border-neutral-700 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <ArrowDown size={16} className="text-[#FFE600] animate-bounce" />
                  <span className="font-black text-xs uppercase tracking-widest text-[#FFE600]">
                    MECHANICAL DISPENSE HOPPER // RETRIEVAL FLAP
                  </span>
                </div>
                <span className="text-[10px] font-bold text-neutral-400">
                  PUSH TO OPEN TRAY
                </span>
              </div>

              {/* Physical Spring-Loaded Flap Tray */}
              <div
                onClick={handleRetrieveHatch}
                className={`relative border-3 border-black p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none ${
                  dispensedInTray
                    ? 'bg-[#00FF66] text-black neo-box-md animate-pulse ring-4 ring-white'
                    : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                {dispensedInTray ? (
                  <div className="space-y-1 py-2">
                    <div className="flex items-center justify-center gap-2 text-black font-black text-sm uppercase">
                      <PackageCheck size={22} className="text-black" />
                      ★ TOKEN IN TRAY: +{dispensedInTray.receipt.amountDispensed.toLocaleString()} {dispensedInTray.canister.symbol}
                    </div>
                    <div className="text-xs font-bold text-black uppercase tracking-wider">
                      [ CLICK FLAP TO RETRIEVE & OPEN RECEIPT ]
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 py-1">
                    <div className="text-xs font-black uppercase tracking-widest text-neutral-200">
                      [ PUSH RETRIEVAL FLAP ]
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      TOKENS DROP DOWN HERE IMMEDIATELY UPON SWAP SETTLEMENT
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Mechanical Keypad & LCD Console (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <Keypad
              currentInput={currentInput}
              selectedCanister={selectedCanister}
              wallet={wallet}
              isDispensing={isDispensing}
              statusMessage={statusMessage}
              onKeyPress={handleKeyPress}
              onClear={handleClear}
              onRandomSelect={handleRandomSelect}
              onDispense={handleDispense}
            />
          </div>
        </div>

        {/* Machine Feet Base Stand (Industrial Neo-Brutalist Frame) */}
        <div className="mt-8 pt-4 border-t-3 border-black flex flex-wrap items-center justify-between text-[11px] font-black uppercase text-black">
          <div className="flex items-center gap-4">
            <span className="bg-black text-[#FFE600] px-2 py-0.5 border border-black">
              MOUNT: ANCHORED STEEL
            </span>
            <span className="hidden sm:inline">SERIAL: BV-992-04-EVM</span>
          </div>
          <div className="flex items-center gap-2">
            <span>CONNECTED TO BOT CHAIN MAINNET</span>
            <div className="w-2 h-2 bg-[#00FF66] border border-black"></div>
          </div>
        </div>
      </div>

      {/* Quick Interactive Dispensed Receipt Drawer Modal */}
      {dispensedInTray && (
        <div className="mt-4 bg-[#FF007F] text-white p-3 border-3 border-black neo-box flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 font-black text-xs uppercase">
            <span className="w-3 h-3 bg-white inline-block"></span>
            DISPENSE SETTLED! RECEIPT #{dispensedInTray.receipt.id} AVAILABLE
          </div>
          <button
            onClick={handleRetrieveHatch}
            className="bg-black text-[#FFE600] px-3 py-1 font-black text-xs uppercase border border-white hover:bg-white hover:text-black cursor-pointer"
          >
            RETRIEVE NOW &rarr;
          </button>
        </div>
      )}
    </section>
  );
};
