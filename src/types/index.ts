export interface CanisterItem {
  slot: string; // e.g. 'A1', 'B2'
  symbol: string;
  name: string;
  priceEth: number;
  dispenseAmount: number;
  stock: number;
  maxStock: number;
  bgColor: string;
  textColor: string;
  badge?: string;
  contractAddress: string;
  decimals: number;
  description: string;
  category: 'MEME' | 'GOV' | 'UTILITY' | 'DEFI';
  coilState?: 'idle' | 'spinning';
}

export interface DispenseReceipt {
  id: string;
  txHash: string;
  blockNumber: number;
  timestamp: string;
  walletAddress: string;
  slot: string;
  tokenSymbol: string;
  tokenName: string;
  amountDispensed: number;
  ethPaid: number;
  gasUsed: number;
  status: 'CONFIRMED' | 'DROPPED';
}

export interface WalletState {
  isConnected: boolean;
  address: string;
  balanceEth: number;
  isSimulated: boolean;
  network: string;
  inventory: { [symbol: string]: number };
}
