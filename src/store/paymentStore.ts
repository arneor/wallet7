'use client';

import { create } from 'zustand';
import { Payment, Payout } from '@/lib/types';

interface PaymentState {
  payments: Payment[];
  payouts: Payout[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setPayments: (payments: Payment[]) => void;
  addPayment: (payment: Payment) => void;
  updatePayment: (id: string, updates: Partial<Payment>) => void;
  removePayment: (id: string) => void;
  setPayouts: (payouts: Payout[]) => void;
  addPayout: (payout: Payout) => void;
  updatePayout: (id: string, updates: Partial<Payout>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Computed values
  getTotalPaid: (groupId?: string) => number;
  getPendingPayments: (groupId?: string) => Payment[];
  getOverduePayments: (groupId?: string) => Payment[];
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  payments: [],
  payouts: [],
  isLoading: false,
  error: null,

  setPayments: (payments) => set({ payments }),

  addPayment: (payment) => set((state) => ({
    payments: [...state.payments, payment]
  })),

  updatePayment: (id, updates) => set((state) => ({
    payments: state.payments.map(payment => 
      payment.id === id ? { ...payment, ...updates } : payment
    )
  })),

  removePayment: (id) => set((state) => ({
    payments: state.payments.filter(payment => payment.id !== id)
  })),

  setPayouts: (payouts) => set({ payouts }),

  addPayout: (payout) => set((state) => ({
    payouts: [...state.payouts, payout]
  })),

  updatePayout: (id, updates) => set((state) => ({
    payouts: state.payouts.map(payout => 
      payout.id === id ? { ...payout, ...updates } : payout
    )
  })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  getTotalPaid: (groupId) => {
    const { payments } = get();
    return payments
      .filter(payment => 
        payment.status === 'paid' && 
        (!groupId || payment.groupId === groupId)
      )
      .reduce((total, payment) => total + payment.amount, 0);
  },

  getPendingPayments: (groupId) => {
    const { payments } = get();
    return payments.filter(payment => 
      payment.status === 'pending' && 
      (!groupId || payment.groupId === groupId)
    );
  },

  getOverduePayments: (groupId) => {
    const { payments } = get();
    const today = new Date();
    return payments.filter(payment => 
      payment.status === 'pending' && 
      new Date(payment.dueDate) < today &&
      (!groupId || payment.groupId === groupId)
    );
  },
}));
