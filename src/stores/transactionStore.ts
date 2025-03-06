import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Transaction {
  id: string;
  title: string;
  description: string;
  date: string;
  amount: string;
  type: string;
  category: string;
  balance?: string;
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
    category: string,
  ) => void;
  updateTransaction: (
    id: string,
    updates: Partial<Omit<Transaction, 'id'>>,
  ) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getTransactions: () => Transaction[];
  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getBalance: () => number;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],

      // Create new transaction
      addTransaction: (
        id,
        title,
        description,
        date,
        amount,
        type,
        category,
      ) => {
        const newTransaction: Transaction = {
          id,
          title,
          description,
          date,
          amount,
          type,
          category,
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

      // Calculate total income
      getTotalIncome: () => {
        return get()
          .transactions.filter(t => t.type === 'income')
          .reduce(
            (sum, transaction) => sum + parseFloat(transaction.amount),
            0,
          );
      },

      // Calculate total expenses
      getTotalExpense: () => {
        return get()
          .transactions.filter(t => t.type === 'expense')
          .reduce(
            (sum, transaction) => sum + parseFloat(transaction.amount),
            0,
          );
      },

      getBalance: () => {
        return get().getTotalIncome() - get().getTotalExpense();
      },
    }),
    {
      name: 'transaction-storage', // Unique name for storage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage with JSON serialization
      partialize: state => ({transactions: state.transactions}), // Only persist transactions array
    },
  ),
);
