'use client';

import { useState, useEffect } from 'react';
import { Payment, ApiResponse } from '@/lib/types';

interface UsePaymentsOptions {
  groupId?: string;
  memberId?: string;
}

export function usePayments(options: UsePaymentsOptions = {}) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (options.groupId) params.append('groupId', options.groupId);
      if (options.memberId) params.append('memberId', options.memberId);
      
      const response = await fetch(`/api/payments?${params.toString()}`);
      const data: ApiResponse<{ payments: Payment[] }> = await response.json();
      
      if (data.success && data.data) {
        setPayments(data.data.payments);
      } else {
        setError(data.error || 'Failed to fetch payments');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const recordPayment = async (paymentData: Partial<Payment>) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      const data: ApiResponse<{ payment: Payment }> = await response.json();
      
      if (data.success && data.data) {
        setPayments(prev => [...prev, data.data!.payment]);
        return data.data.payment;
      } else {
        throw new Error(data.error || 'Failed to record payment');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record payment');
      throw err;
    }
  };

  const updatePayment = async (id: string, updates: Partial<Payment>) => {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      const data: ApiResponse<{ payment: Payment }> = await response.json();
      
      if (data.success && data.data) {
        setPayments(prev => prev.map(payment => 
          payment.id === id ? data.data!.payment : payment
        ));
        return data.data.payment;
      } else {
        throw new Error(data.error || 'Failed to update payment');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment');
      throw err;
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [options.groupId, options.memberId]);

  return {
    payments,
    loading,
    error,
    refetch: fetchPayments,
    recordPayment,
    updatePayment,
  };
}
