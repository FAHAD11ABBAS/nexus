// src/components/wallet/NexusWalletModal.jsx
// Web3 Digital Wallet & Creator Tipping Dashboard Modal

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wallet,
  Coins,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import walletService from '@/services/walletService';

export default function NexusWalletModal({ isOpen, onClose, targetCreator }) {
  const { t } = useTranslation();
  const [walletData, setWalletData] = useState(walletService.getWalletData());
  const [tipAmount, setTipAmount] = useState('50');
  const [tipRecipient, setTipRecipient] = useState(targetCreator || 'cyberaura');

  if (!isOpen) return null;

  const handleTipSubmit = (e) => {
    e?.preventDefault();
    const amount = parseInt(tipAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid token amount');
      return;
    }

    try {
      const updated = walletService.tipCreator(tipRecipient, amount);
      setWalletData(updated);
      toast.success(`Tipped ${amount} NX Tokens to @${tipRecipient.replace('@', '')}! 🪙✨`);
      if (onClose) onClose();
    } catch (err) {
      toast.error(err.message || 'Transaction failed');
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    toast.success('Wallet address copied');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NEXUS Web3 Wallet" maxWidth="max-w-md">
      <div className="space-y-4">
        {/* Wallet Balance Hero Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-tr from-violet-950 via-indigo-900 to-purple-950 border border-nexus-primary/40 shadow-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="text-nexus-gold animate-bounce" size={20} />
              <span className="text-xs font-bold text-nexus-text/80 uppercase tracking-wider">
                NX Token Balance
              </span>
            </div>

            <button
              onClick={handleCopyAddress}
              className="px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] font-mono text-nexus-cyan hover:text-white flex items-center gap-1 transition-all"
            >
              <span>{walletData.address}</span>
              <Copy size={11} />
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {walletData.balance.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-nexus-gold font-mono">NX</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-nexus-muted pt-1 border-t border-white/10">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>P2P Ledger Verified</span>
            </span>
            <span>Rate: 1 NX = \$0.10 USD</span>
          </div>
        </div>

        {/* Quick Creator Tipping Box */}
        <div className="p-3.5 rounded-2xl glass-card border border-nexus-border/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles size={14} className="text-nexus-gold" />
              <span>Instant Creator Tip</span>
            </span>
            <span className="text-[10px] text-nexus-dim font-mono">Zero Gas Fees</span>
          </div>

          <form onSubmit={handleTipSubmit} className="space-y-2.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute start-3 top-2.5 text-xs text-nexus-dim">@</span>
                <input
                  type="text"
                  value={tipRecipient}
                  onChange={(e) => setTipRecipient(e.target.value)}
                  placeholder="creator_handle"
                  className="w-full ps-7 pe-3 py-2 rounded-xl bg-nexus-surface border border-nexus-border/80 text-xs text-white placeholder-nexus-dim outline-none focus:border-nexus-primary"
                />
              </div>

              <div className="relative w-28">
                <input
                  type="number"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  placeholder="50"
                  className="w-full px-3 py-2 rounded-xl bg-nexus-surface border border-nexus-border/80 text-xs text-white font-mono text-end outline-none focus:border-nexus-primary"
                />
                <span className="absolute end-2 top-2.5 text-[10px] font-bold text-nexus-gold">
                  NX
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-nexus-gradient hover:brightness-110 text-white text-xs font-bold shadow-nexus-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <Send size={13} />
              <span>Send Creator Tip</span>
            </button>
          </form>
        </div>

        {/* Recent Transactions Ledger */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-nexus-dim uppercase tracking-wider px-1">
            Transaction History
          </span>

          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
            {walletData.transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-2.5 rounded-xl bg-nexus-surface/40 border border-nexus-border/40 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-1.5 rounded-lg ${
                      tx.positive
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {tx.positive ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                  </div>
                  <div>
                    <p className="font-bold text-white text-[11px]">{tx.title}</p>
                    <p className="text-[9px] text-nexus-dim font-mono">{tx.timestamp}</p>
                  </div>
                </div>

                <span
                  className={`font-mono font-bold text-xs ${
                    tx.positive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {tx.positive ? '+' : '-'}{tx.amount} NX
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
