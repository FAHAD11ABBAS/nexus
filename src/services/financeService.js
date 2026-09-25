// src/services/financeService.js
// NEXUS Finance, Banking & Global Markets — 100% client-side simulated economy

const FINANCE_KEY = 'nexus_finance_v1';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '💲' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '💶' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '💷' },
  { code: 'SDR', name: 'Sovereign SDR', symbol: 'SDR', flag: '🌐' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '💴' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🪙' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '💰' },
  { code: 'AED', name: 'Emirates Dirham', symbol: 'د.إ', flag: '💎' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🪙' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '💵' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '💳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🪙' },
];

const BASE_RATES = {
  USD: 1, EUR: 0.92, GBP: 0.79, SDR: 0.75, JPY: 149.5, CNY: 7.24,
  INR: 83.1, AED: 3.67, TRY: 27.2, BRL: 4.97, SAR: 3.75, KRW: 1325,
  BTC: 0.0000236, ETH: 0.000384,
};

const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#f59e0b' },
  { id: 'transport', name: 'Transport', icon: '🚗', color: '#3b82f6' },
  { id: 'shopping', name: 'Shopping', icon: '🛒', color: '#ec4899' },
  { id: 'bills', name: 'Bills & Utilities', icon: '💡', color: '#8b5cf6' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎮', color: '#10b981' },
  { id: 'health', name: 'Healthcare', icon: '🏥', color: '#ef4444' },
  { id: 'education', name: 'Education', icon: '📚', color: '#06b6d4' },
  { id: 'other', name: 'Other', icon: '📦', color: '#6b7280' },
];

// Simulated stock/crypto tickers
const MARKET_TICKERS = [
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', basePrice: 178.5 },
  { symbol: 'MSFT', name: 'Microsoft', type: 'stock', basePrice: 378.9 },
  { symbol: 'GOOGL', name: 'Alphabet', type: 'stock', basePrice: 141.2 },
  { symbol: 'AMZN', name: 'Amazon', type: 'stock', basePrice: 178.3 },
  { symbol: 'TSLA', name: 'Tesla', type: 'stock', basePrice: 248.5 },
  { symbol: 'NVDA', name: 'NVIDIA', type: 'stock', basePrice: 495.2 },
  { symbol: 'META', name: 'Meta Platforms', type: 'stock', basePrice: 326.5 },
  { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', basePrice: 42350 },
  { symbol: 'ETH', name: 'Ethereum', type: 'crypto', basePrice: 2280 },
  { symbol: 'BNB', name: 'Binance Coin', type: 'crypto', basePrice: 310.5 },
  { symbol: 'SOL', name: 'Solana', type: 'crypto', basePrice: 98.7 },
  { symbol: 'ADA', name: 'Cardano', type: 'crypto', basePrice: 0.62 },
  { symbol: 'EUR/USD', name: 'Euro / Dollar', type: 'forex', basePrice: 1.087 },
  { symbol: 'GBP/USD', name: 'Pound / Dollar', type: 'forex', basePrice: 1.267 },
  { symbol: 'USD/JPY', name: 'Dollar / Yen', type: 'forex', basePrice: 149.5 },
  { symbol: 'USD/IQD', name: 'Dollar / Dinar', type: 'forex', basePrice: 1310 },
];

function generatePriceHistory(basePrice, points = 20) {
  const history = [];
  let price = basePrice;
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.48) * basePrice * 0.02;
    price = Math.max(price + change, basePrice * 0.8);
    history.push(parseFloat(price.toFixed(price < 1 ? 4 : 2)));
  }
  return history;
}

function getSimulatedTickers() {
  return MARKET_TICKERS.map((t) => {
    const history = generatePriceHistory(t.basePrice);
    const current = history[history.length - 1];
    const previous = history[history.length - 2];
    const change = current - previous;
    const changePercent = ((change / previous) * 100).toFixed(2);
    return {
      ...t,
      price: current,
      change: parseFloat(change.toFixed(t.basePrice < 1 ? 4 : 2)),
      changePercent: parseFloat(changePercent),
      history,
      volume: Math.floor(Math.random() * 50000000) + 1000000,
    };
  });
}

const DEFAULT_DATA = {
  wallet: {
    balances: { USD: 5000, EUR: 2200, GBP: 1800, IQD: 6550000, BTC: 0.15, ETH: 2.4 },
  },
  expenses: [
    { id: 'exp_1', category: 'food', amount: 45.50, currency: 'USD', note: 'Dinner at Sushi Palace', date: '2026-09-20' },
    { id: 'exp_2', category: 'transport', amount: 32.00, currency: 'USD', note: 'Uber rides', date: '2026-09-19' },
    { id: 'exp_3', category: 'shopping', amount: 189.99, currency: 'USD', note: 'Electronics store', date: '2026-09-18' },
    { id: 'exp_4', category: 'bills', amount: 120.00, currency: 'USD', note: 'Internet & Phone', date: '2026-09-17' },
    { id: 'exp_5', category: 'entertainment', amount: 15.99, currency: 'USD', note: 'Streaming subscription', date: '2026-09-16' },
  ],
  budget: {
    monthlyIncome: 6000,
    allocations: { food: 800, transport: 400, shopping: 500, bills: 600, entertainment: 300, health: 200, education: 150, other: 200 },
  },
};

class FinanceService {
  getData() {
    try {
      const raw = localStorage.getItem(FINANCE_KEY);
      if (!raw) {
        localStorage.setItem(FINANCE_KEY, JSON.stringify(DEFAULT_DATA));
        return DEFAULT_DATA;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_DATA;
    }
  }

  save(data) {
    localStorage.setItem(FINANCE_KEY, JSON.stringify(data));
  }

  // Wallet
  getWallet() { return this.getData().wallet; }

  // Expenses
  getExpenses() { return this.getData().expenses; }

  addExpense(expense) {
    const data = this.getData();
    data.expenses.unshift({
      id: `exp_${Date.now()}`,
      ...expense,
      date: new Date().toISOString().split('T')[0],
    });
    this.save(data);
    return data.expenses;
  }

  deleteExpense(id) {
    const data = this.getData();
    data.expenses = data.expenses.filter((e) => e.id !== id);
    this.save(data);
    return data.expenses;
  }

  getExpenseSummary() {
    const expenses = this.getExpenses();
    const byCategory = {};
    let total = 0;
    for (const exp of expenses) {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
      total += exp.amount;
    }
    return { byCategory, total };
  }

  // Budget
  getBudget() { return this.getData().budget; }

  updateBudget(budget) {
    const data = this.getData();
    data.budget = budget;
    this.save(data);
  }

  // Currency
  getCurrencies() { return CURRENCIES; }
  getCategories() { return EXPENSE_CATEGORIES; }

  convertCurrency(amount, from, to) {
    const jitter = 1 + (Math.random() - 0.5) * 0.005;
    const fromRate = BASE_RATES[from] || 1;
    const toRate = BASE_RATES[to] || 1;
    return parseFloat(((amount / fromRate) * toRate * jitter).toFixed(4));
  }

  getExchangeRates(base = 'USD') {
    const rates = {};
    const baseRate = BASE_RATES[base] || 1;
    for (const [code, rate] of Object.entries(BASE_RATES)) {
      const jitter = 1 + (Math.random() - 0.5) * 0.003;
      rates[code] = parseFloat(((rate / baseRate) * jitter).toFixed(4));
    }
    return rates;
  }

  // Markets
  getTickers() { return getSimulatedTickers(); }

  // Loan Calculator
  calculateEMI(principal, annualRate, months) {
    const r = annualRate / 12 / 100;
    if (r === 0) return parseFloat((principal / months).toFixed(2));
    const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return parseFloat(emi.toFixed(2));
  }
}

const financeService = new FinanceService();
export default financeService;
