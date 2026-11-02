import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { VendingMachine } from './components/VendingMachine';
import { LiveLedger } from './components/LiveLedger';
import { HowItWorks } from './components/HowItWorks';
import { InventoryMatrix } from './components/InventoryMatrix';
import { ComparisonSpecs } from './components/ComparisonSpecs';
import { MaintenanceFAQ } from './components/MaintenanceFAQ';
import { DispenseModal } from './components/DispenseModal';
import { INITIAL_CANISTERS, INITIAL_RECEIPTS } from './data/inventory';
import type { CanisterItem, DispenseReceipt, WalletState } from './types';
import { connectInjectedWallet, hasInjectedWeb3 } from './utils/web3';
import { soundFX } from './utils/audio';

export const App: React.FC = () => {
  const [canisters, setCanisters] = useState<CanisterItem[]>(INITIAL_CANISTERS);
  const [receipts, setReceipts] = useState<DispenseReceipt[]>(INITIAL_RECEIPTS);
  const [selectedSlot, setSelectedSlot] = useState<string>('A1');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active wallet state
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: true, // Default connected in simulation mode so users can vend immediately!
    address: '0x71C2B8959A41088E237E49c042973FaB186548B9',
    balanceEth: 25.000, // 25.0 BOT
    isSimulated: true,
    network: 'SIMULATION (BOT CHAIN MAINNET)',
    inventory: {
      '$BRUTAL': 10000,
      '$PEPEVEND': 1000000,
    },
  });

  // Modal for retrieved token receipt
  const [activeModalReceipt, setActiveModalReceipt] = useState<DispenseReceipt | null>(null);
  const [activeModalCanister, setActiveModalCanister] = useState<CanisterItem | null>(null);

  // Connect real wallet (MetaMask / Injected Web3) on BOT Chain Mainnet (Chain ID: 677)
  const handleConnectReal = async () => {
    if (!hasInjectedWeb3()) {
      alert('NO BROWSER WALLET DETECTED. PLEASE INSTALL METAMASK TO CONNECT TO BOT CHAIN MAINNET.');
      return;
    }
    const res = await connectInjectedWallet();
    if (res) {
      setWallet((prev) => ({
        ...prev,
        isConnected: true,
        address: res.address,
        balanceEth: res.balance,
        isSimulated: false,
        network: res.network,
      }));
    }
  };

  // Switch between simulated and injected web3
  const handleToggleSimulated = () => {
    if (wallet.isSimulated) {
      handleConnectReal();
    } else {
      setWallet({
        isConnected: true,
        address: '0x71C2B8959A41088E237E49c042973FaB186548B9',
        balanceEth: 25.000,
        isSimulated: true,
        network: 'SIMULATION (BOT CHAIN)',
        inventory: wallet.inventory,
      });
    }
  };

  // Refill +10.0 BOT into wallet
  const handleFaucetEth = () => {
    setWallet((prev) => ({
      ...prev,
      balanceEth: prev.balanceEth + 10.0,
    }));
  };

  // Toggle master audio
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
  };

  // Called when transaction dispenses into hopper and user collects it
  const handleDispenseSuccess = (receipt: DispenseReceipt, canister: CanisterItem) => {
    // Add to receipts ledger
    setReceipts((prev) => [receipt, ...prev]);
    // Open modal
    setActiveModalReceipt(receipt);
    setActiveModalCanister(canister);
  };

  // Restock all canisters
  const handleRestockAll = () => {
    setCanisters((prev) =>
      prev.map((c) => ({
        ...c,
        stock: c.maxStock,
      }))
    );
  };

  // Select slot from outside (e.g. from catalog table or terminal)
  const handleSelectSlot = (slotCode: string) => {
    setSelectedSlot(slotCode);
    const el = document.getElementById('vending-machine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Print receipt click
  const handleSelectReceipt = (rcpt: DispenseReceipt) => {
    const can = canisters.find((c) => c.slot === rcpt.slot) || canisters[0];
    setActiveModalReceipt(rcpt);
    setActiveModalCanister(can);
  };

  return (
    <div className="min-h-screen bg-[#FFE600] text-black font-mono selection:bg-black selection:text-[#FFE600] overflow-x-hidden">
      {/* SECTION 1: Status Bar, Marquee & Navigation */}
      <Navbar
        wallet={wallet}
        onConnectReal={handleConnectReal}
        onToggleSimulated={handleToggleSimulated}
        onFaucetEth={handleFaucetEth}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main>
        {/* SECTION 2: Physical Wireframe Vending Machine Apparatus (Main Swap dApp) */}
        <VendingMachine
          canisters={canisters}
          wallet={wallet}
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
          onUpdateWallet={setWallet}
          onDispenseSuccess={handleDispenseSuccess}
          onUpdateCanisters={setCanisters}
        />

        {/* SECTION 3: Real-Time Dispense Ledger & Tape Receipt Printer */}
        <LiveLedger
          receipts={receipts}
          userAddress={wallet.address}
          onSelectReceipt={handleSelectReceipt}
        />

        {/* SECTION 4: Mechanical Protocol Blueprint & Bytecode Opcodes */}
        <HowItWorks />

        {/* SECTION 5: Canister Inventory Catalog & Operator Vault Reserves */}
        <InventoryMatrix
          canisters={canisters}
          onSelectSlot={handleSelectSlot}
          onRestockAll={handleRestockAll}
        />

        {/* SECTION 6: Gas Efficiency Benchmark vs Traditional AMM DEX */}
        <ComparisonSpecs />

        {/* SECTION 7: Maintenance Manual, Operator CLI Console & Neo-Brutalist Hardware Footer */}
        <MaintenanceFAQ
          onFaucetEth={handleFaucetEth}
          onSelectSlot={handleSelectSlot}
        />
      </main>

      {/* Retrieved Token Celebration Modal */}
      {activeModalReceipt && activeModalCanister && (
        <DispenseModal
          receipt={activeModalReceipt}
          canister={activeModalCanister}
          onClose={() => {
            setActiveModalReceipt(null);
            setActiveModalCanister(null);
          }}
          onPrintReceipt={(r) => {
            alert(`PRINTING PHYSICAL TAPE FOR ${r.id}... (DISPATCHED TO SPOOL)`);
          }}
        />
      )}
    </div>
  );
};

export default App;
