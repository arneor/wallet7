'use client';

import { useState, useEffect } from 'react';
import { Notification, ApiResponse } from '@/lib/types';

interface UseNotificationsOptions {
  userId?: string;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (options.userId) params.append('userId', options.userId);
      
      const response = await fetch(`/api/notifications?${params.toString()}`);
      const data: ApiResponse<{ notifications: Notification[] }> = await response.json();
      
      if (data.success && data.data) {
        setNotifications(data.data.notifications);
      } else {
        setError(data.error || 'Failed to fetch notifications');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      });
      
      const data: ApiResponse<{ notification: Notification }> = await response.json();
      
      if (data.success) {
        setNotifications(prev => prev.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        ));
      } else {
        throw new Error(data.error || 'Failed to mark notification as read');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read');
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(unreadNotifications.map(n => markAsRead(n.id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all notifications as read');
      throw err;
    }
  };

  const createNotification = async (notificationData: Partial<Notification>) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      });
      
      const data: ApiResponse<{ notification: Notification }> = await response.json();
      
      if (data.success && data.data) {
        setNotifications(prev => [data.data!.notification, ...prev]);
        return data.data.notification;
      } else {
        throw new Error(data.error || 'Failed to create notification');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create notification');
      throw err;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    fetchNotifications();
  }, [options.userId]);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead,
    createNotification,
  };
}
