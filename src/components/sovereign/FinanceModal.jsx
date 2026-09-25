// src/components/sovereign/FinanceModal.jsx
// NEXUS Finance, Banking & Global Markets

import { useState, useEffect } from 'react';
import { X, Wallet, Receipt, TrendingUp, ArrowLeftRight, Calculator, Plus, Trash2, RefreshCw, DollarSign } from 'lucide-react';
import financeService from '@/services/financeService';
import toast from 'react-hot-toast';

function MiniSparkline({ data, color = '#22d3ee', width = 80, height = 28 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} className="flex-shrink-0">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
    </svg>
  );
}

export default function FinanceModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('wallet');
  const [wallet, setWallet] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [tickers, setTickers] = useState([]);
  const [marketFilter, setMarketFilter] = useState('all');

  // Converter
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('IQD');
  const [convertAmount, setConvertAmount] = useState('100');
  const [convertResult, setConvertResult] = useState(null);

  // Expense form
  const [expCategory, setExpCategory] = useState('food');
  const [expAmount, setExpAmount] = useState('');
  const [expNote, setExpNote] = useState('');

  // Loan calc
  const [loanPrincipal, setLoanPrincipal] = useState('10000');
  const [loanRate, setLoanRate] = useState('5');
  const [loanMonths, setLoanMonths] = useState('36');

  useEffect(() => {
    if (isOpen) {
      setWallet(financeService.getWallet());
      setExpenses(financeService.getExpenses());
      refreshTickers();
    }
  }, [isOpen]);

  const refreshTickers = () => setTickers(financeService.getTickers());

  if (!isOpen) return null;

  const handleConvert = () => {
    const result = financeService.convertCurrency(parseFloat(convertAmount) || 0, fromCurrency, toCurrency);
    setConvertResult(result);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expAmount) return;
    const updated = financeService.addExpense({ category: expCategory, amount: parseFloat(expAmount), currency: 'USD', note: expNote });
    setExpenses(updated);
    setExpAmount('');
    setExpNote('');
    toast.success('Expense tracked 📝');
  };

  const handleDeleteExpense = (id) => {
    const updated = financeService.deleteExpense(id);
    setExpenses(updated);
  };

  const summary = financeService.getExpenseSummary();
  const categories = financeService.getCategories();
  const currencies = financeService.getCurrencies();
  const emi = financeService.calculateEMI(parseFloat(loanPrincipal) || 0, parseFloat(loanRate) || 0, parseInt(loanMonths) || 1);
  const totalLoanPayment = emi * (parseInt(loanMonths) || 1);
  const totalInterest = totalLoanPayment - (parseFloat(loanPrincipal) || 0);

  const filteredTickers = marketFilter === 'all' ? tickers : tickers.filter((t) => t.type === marketFilter);

  const tabs = [
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'converter', label: 'Converter', icon: ArrowLeftRight },
    { id: 'calc', label: 'Calculator', icon: Calculator },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-5xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <DollarSign size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Finance & Markets</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">Live Simulator</span>
              </div>
              <p className="text-xs text-slate-400">Banking, expenses, global markets & currency exchange</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all"><X size={18} /></button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-800/60 rounded-2xl border border-slate-700/60 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all whitespace-nowrap px-2 ${
                  activeTab === tab.id ? 'bg-emerald-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-white'
                }`}>
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3">

          {/* ═══ WALLET ═══ */}
          {activeTab === 'wallet' && wallet && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(wallet.balances).map(([code, balance]) => {
                const curr = currencies.find((c) => c.code === code);
                return (
                  <div key={code} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/40 hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{curr?.flag || '💰'}</span>
                      <span className="text-[10px] font-mono text-slate-500">{code}</span>
                    </div>
                    <p className="text-xl font-black text-white">{typeof balance === 'number' && balance > 1000 ? balance.toLocaleString() : balance}</p>
                    <p className="text-[10px] text-slate-400">{curr?.name || code}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ EXPENSES ═══ */}
          {activeTab === 'expenses' && (
            <div className="space-y-3">
              {/* Add Expense Form */}
              <form onSubmit={handleAddExpense} className="flex items-end gap-2 flex-wrap p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
                <div className="flex-1 min-w-[120px]">
                  <label className="text-[10px] text-slate-500 block mb-1">Category</label>
                  <select value={expCategory} onChange={(e) => setExpCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none">
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div className="w-24">
                  <label className="text-[10px] text-slate-500 block mb-1">Amount ($)</label>
                  <input type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} placeholder="0.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none" />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label className="text-[10px] text-slate-500 block mb-1">Note</label>
                  <input type="text" value={expNote} onChange={(e) => setExpNote(e.target.value)} placeholder="Description..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none" />
                </div>
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 hover:bg-emerald-500/30 flex items-center gap-1">
                  <Plus size={12} /> Add
                </button>
              </form>

              {/* Summary */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/40">
                  <span className="text-[10px] text-slate-500 block">Total Spent</span>
                  <span className="text-lg font-bold text-rose-400">${summary.total.toFixed(2)}</span>
                </div>
                {Object.entries(summary.byCategory).slice(0, 4).map(([cat, amount]) => {
                  const catInfo = categories.find((c) => c.id === cat);
                  return (
                    <div key={cat} className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/40">
                      <span className="text-[10px] text-slate-500 block">{catInfo?.icon} {catInfo?.name}</span>
                      <span className="text-sm font-bold text-white">${amount.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Expense List */}
              <div className="space-y-1.5 max-h-[40vh] overflow-y-auto">
                {expenses.map((exp) => {
                  const catInfo = categories.find((c) => c.id === exp.category);
                  return (
                    <div key={exp.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-slate-600 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{catInfo?.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-white">{exp.note || catInfo?.name}</p>
                          <p className="text-[10px] text-slate-500">{exp.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-rose-400">-${exp.amount.toFixed(2)}</span>
                        <button onClick={() => handleDeleteExpense(exp.id)} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 size={12} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ MARKETS ═══ */}
          {activeTab === 'markets' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 p-1 bg-slate-800/60 rounded-xl">
                  {['all', 'stock', 'crypto', 'forex'].map((f) => (
                    <button key={f} onClick={() => setMarketFilter(f)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${marketFilter === f ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                      {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
                <button onClick={refreshTickers} className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 hover:text-emerald-400 transition-all"><RefreshCw size={14} /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[55vh] overflow-y-auto">
                {filteredTickers.map((t) => (
                  <div key={t.symbol} className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40 hover:border-emerald-500/30 transition-all flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{t.symbol}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${t.type === 'stock' ? 'bg-blue-500/20 text-blue-400' : t.type === 'crypto' ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                          {t.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{t.name}</p>
                    </div>
                    <MiniSparkline data={t.history} color={t.changePercent >= 0 ? '#22c55e' : '#ef4444'} />
                    <div className="text-end">
                      <p className="text-sm font-bold text-white">${t.price < 1 ? t.price.toFixed(4) : t.price.toLocaleString()}</p>
                      <p className={`text-[10px] font-bold ${t.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {t.changePercent >= 0 ? '▲' : '▼'} {Math.abs(t.changePercent)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ CONVERTER ═══ */}
          {activeTab === 'converter' && (
            <div className="max-w-md mx-auto space-y-4 py-4">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/40 space-y-4">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Amount</label>
                  <input type="number" value={convertAmount} onChange={(e) => setConvertAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-lg font-bold outline-none focus:border-emerald-500/60" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500 block mb-1">From</label>
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm outline-none">
                      {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                      <option value="BTC">₿ BTC</option>
                      <option value="ETH">Ξ ETH</option>
                    </select>
                  </div>
                  <button onClick={() => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); }} className="p-2 rounded-xl bg-slate-700/60 text-slate-300 hover:bg-slate-700 mt-4">
                    <ArrowLeftRight size={16} />
                  </button>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500 block mb-1">To</label>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm outline-none">
                      {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                      <option value="BTC">₿ BTC</option>
                      <option value="ETH">Ξ ETH</option>
                    </select>
                  </div>
                </div>
                <button onClick={handleConvert} className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-sm font-extrabold hover:bg-emerald-400 transition-all">
                  Convert
                </button>
                {convertResult !== null && (
                  <div className="text-center py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <p className="text-2xl font-black text-emerald-400">{convertResult.toLocaleString()} {toCurrency}</p>
                    <p className="text-[10px] text-slate-500 mt-1">≈ {convertAmount} {fromCurrency}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══ LOAN CALCULATOR ═══ */}
          {activeTab === 'calc' && (
            <div className="max-w-md mx-auto space-y-4 py-4">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/40 space-y-4">
                <h3 className="text-sm font-bold text-white">Loan EMI Calculator</h3>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Principal Amount ($)</label>
                  <input type="number" value={loanPrincipal} onChange={(e) => setLoanPrincipal(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-emerald-500/60" />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500 block mb-1">Annual Rate (%)</label>
                    <input type="number" value={loanRate} onChange={(e) => setLoanRate(e.target.value)} step="0.1"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-emerald-500/60" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-500 block mb-1">Months</label>
                    <input type="number" value={loanMonths} onChange={(e) => setLoanMonths(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-emerald-500/60" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <p className="text-[10px] text-slate-500">Monthly EMI</p>
                    <p className="text-lg font-black text-emerald-400">${emi.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-700/40 border border-slate-600/40 text-center">
                    <p className="text-[10px] text-slate-500">Total Payment</p>
                    <p className="text-lg font-black text-white">${totalLoanPayment.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                    <p className="text-[10px] text-slate-500">Total Interest</p>
                    <p className="text-lg font-black text-rose-400">${totalInterest.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
