import {create} from 'zustand';

interface Transaction {
  id: string;
  title: string;
  description: string;
  date: string;
  amount: string;
  type: string;
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (
    id: string,
    title: string,
    description: string,
    date: string,
    amount: string,
    type: string,
  ) => void;
  updateTransaction: (
    id: string,
    updates: Partial<Omit<Transaction, 'id'>>,
  ) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getTransactions: () => void;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],

  // Create new transaction
  addTransaction: (id, title, description, date, amount, type) => {
    const newTransaction: Transaction = {
      id,
      title,
      description,
      date,
      amount,
      type,
    };

    set(state => ({
      transactions: [...state.transactions, newTransaction],
    }));
  },

  // Update transaction
  updateTransaction: (id, updates) => {
    set(state => ({
      transactions: state.transactions.map(transaction =>
        transaction.id === id ? {...transaction, ...updates} : transaction,
      ),
    }));
  },

  // Delete transaction
  deleteTransaction: id => {
    set(state => ({
      transactions: state.transactions.filter(
        transaction => transaction.id !== id,
      ),
    }));
  },

  // Get transaction by ID
  getTransactionById: id => {
    return get().transactions.find(transaction => transaction.id === id);
  },

  // Get all transactions
  getTransactions: () => {
    return get().transactions;
  },
}));
