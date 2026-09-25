// src/services/walletService.js
// Web3 & Creator Economy Digital Wallet Service for NEXUS

const WALLET_STORAGE_KEY = 'nexus_wallet_data_v1';

const INITIAL_WALLET = {
  address: '0x98A7...2B4C',
  balance: 1250, // NX tokens
  currency: 'NX',
  transactions: [
    {
      id: 'tx_1',
      type: 'reward',
      title: 'Creator Node Staking Reward',
      amount: 150,
      timestamp: '1h ago',
      positive: true,
    },
    {
      id: 'tx_2',
      type: 'tip_sent',
      title: 'Tip to @cyberaura for Reel',
      amount: 50,
      timestamp: '3h ago',
      positive: false,
    },
    {
      id: 'tx_3',
      type: 'welcome',
      title: 'Decentralized Network Onboarding Grant',
      amount: 1150,
      timestamp: '1d ago',
      positive: true,
    },
  ],
};

class WalletService {
  getWalletData() {
    try {
      const raw = localStorage.getItem(WALLET_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(INITIAL_WALLET));
        return INITIAL_WALLET;
      }
      return JSON.parse(raw);
    } catch (e) {
      return INITIAL_WALLET;
    }
  }

  saveWalletData(data) {
    try {
      localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save wallet data:', e);
    }
  }

  tipCreator(creatorHandle, amount = 50) {
    const data = this.getWalletData();
    if (data.balance < amount) {
      throw new Error('Insufficient NX token balance');
    }

    const newBalance = data.balance - amount;
    const newTx = {
      id: `tx_${Date.now()}`,
      type: 'tip_sent',
      title: `Tip to ${creatorHandle.startsWith('@') ? creatorHandle : '@' + creatorHandle}`,
      amount,
      timestamp: 'Just now',
      positive: false,
    };

    const updated = {
      ...data,
      balance: newBalance,
      transactions: [newTx, ...data.transactions],
    };

    this.saveWalletData(updated);
    return updated;
  }
}

export const walletService = new WalletService();
export default walletService;
