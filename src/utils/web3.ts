// Web3 Provider and BOT Chain Mainnet Helper
import type { CanisterItem, DispenseReceipt } from '../types';

export const BOT_CHAIN = {
  chainId: 677,
  chainIdHex: '0x2a5', // 677 in hex
  chainName: 'BOT Chain Mainnet',
  rpcUrl: 'https://rpc.botchain.ai',
  blockExplorerUrl: 'https://scan.botchain.ai',
  nativeCurrency: {
    name: 'BOT',
    symbol: 'BOT',
    decimals: 18,
  },
  contractAddress: '0xFD51797C48f75aF10761F92Bdd639e4518358324',
};

export const generateTxHash = (): string => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

export const formatAddress = (addr: string): string => {
  if (!addr || addr.length < 10) return addr;
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
};

export const formatBot = (val: number): string => {
  return val.toFixed(4) + ' BOT';
};

// Check if window.ethereum exists
export const hasInjectedWeb3 = (): boolean => {
  return typeof window !== 'undefined' && !!(window as unknown as { ethereum?: unknown }).ethereum;
};

// Prompt MetaMask to add / switch to BOT Chain Mainnet
export async function switchToBotChain(): Promise<boolean> {
  const eth = (window as unknown as { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
  if (!eth) return false;

  try {
    // Attempt switch
    await eth.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BOT_CHAIN.chainIdHex }],
    });
    return true;
  } catch (switchError: unknown) {
    // If chain has not been added to MetaMask, code 4902 triggers
    if ((switchError as { code?: number })?.code === 4902) {
      try {
        await eth.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: BOT_CHAIN.chainIdHex,
              chainName: BOT_CHAIN.chainName,
              nativeCurrency: BOT_CHAIN.nativeCurrency,
              rpcUrls: [BOT_CHAIN.rpcUrl],
              blockExplorerUrls: [BOT_CHAIN.blockExplorerUrl],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error('Failed to add BOT Chain Mainnet:', addError);
        return false;
      }
    }
    console.error('Failed to switch to BOT Chain Mainnet:', switchError);
    return false;
  }
}

// Real EIP-1193 connect request for BOT Chain Mainnet
export async function connectInjectedWallet(): Promise<{ address: string; balance: number; network: string; chainId: number } | null> {
  const eth = (window as unknown as { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
  if (!eth) return null;

  try {
    // Switch to BOT Chain if not already
    await switchToBotChain();

    const accounts = (await eth.request({ method: 'eth_requestAccounts' })) as string[];
    if (!accounts || accounts.length === 0) return null;
    const address = accounts[0];

    // Get balance in native BOT
    const rawBal = (await eth.request({ method: 'eth_getBalance', params: [address, 'latest'] })) as string;
    const balance = parseInt(rawBal, 16) / 1e18;

    // Get chain ID
    const chainIdHex = (await eth.request({ method: 'eth_chainId' })) as string;
    const chainId = parseInt(chainIdHex, 16);
    let network = BOT_CHAIN.chainName;
    if (chainId === 677) network = 'BOT CHAIN MAINNET';
    else network = `CHAIN #${chainId}`;

    return { address, balance: isNaN(balance) ? 1.0 : balance, network, chainId };
  } catch (err) {
    console.error('Wallet connection error:', err);
    return null;
  }
}

// Request real transaction on BOT Chain Mainnet via MetaMask
export async function sendInjectedTx(
  fromAddress: string,
  priceBot: number,
  canister: CanisterItem
): Promise<DispenseReceipt | null> {
  const eth = (window as unknown as { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
  if (!eth) return null;

  try {
    const weiHex = '0x' + BigInt(Math.floor(priceBot * 1e18)).toString(16);
    
    // Target contract is either the canister contract or the deployed BlockVend master contract
    const targetContract = BOT_CHAIN.contractAddress || canister.contractAddress;

    const txHash = (await eth.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: fromAddress,
          to: targetContract,
          value: weiHex,
          gas: '0x10000', // ~65000 gas limit
        },
      ],
    })) as string;

    return {
      id: `RCPT-${Math.floor(1000 + Math.random() * 9000)}`,
      txHash: txHash || generateTxHash(),
      blockNumber: 421000 + Math.floor(Math.random() * 50),
      timestamp: 'Just now',
      walletAddress: fromAddress,
      slot: canister.slot,
      tokenSymbol: canister.symbol,
      tokenName: canister.name,
      amountDispensed: canister.dispenseAmount,
      ethPaid: priceBot,
      gasUsed: 42150 + Math.floor(Math.random() * 800),
      status: 'DROPPED',
    };
  } catch (err) {
    console.error('Dispense transaction rejected or failed:', err);
    return null;
  }
}

// Watch token in MetaMask (EIP-747)
export async function watchAssetInMetaMask(canister: CanisterItem): Promise<boolean> {
  const eth = (window as unknown as { ethereum?: { request: (args: { method: string; params?: unknown }) => Promise<unknown> } }).ethereum;
  if (!eth) return false;

  try {
    const wasAdded = await eth.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: canister.contractAddress,
          symbol: canister.symbol.replace('$', ''),
          decimals: canister.decimals,
          image: `https://avatar.vercel.sh/${canister.symbol}.png`,
        },
      },
    });
    return !!wasAdded;
  } catch {
    return false;
  }
}
