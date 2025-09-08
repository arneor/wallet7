'use client';

import { useState, useEffect } from 'react';
import { Group, ApiResponse } from '@/lib/types';

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/groups');
      const data: ApiResponse<{ groups: Group[] }> = await response.json();
      
      if (data.success && data.data) {
        setGroups(data.data.groups);
      } else {
        setError(data.error || 'Failed to fetch groups');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (groupData: Partial<Group>) => {
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });
      
      const data: ApiResponse<{ group: Group }> = await response.json();
      
      if (data.success && data.data) {
        setGroups(prev => [...prev, data.data!.group]);
        return data.data.group;
      } else {
        throw new Error(data.error || 'Failed to create group');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create group');
      throw err;
    }
  };

  const updateGroup = async (id: string, updates: Partial<Group>) => {
    try {
      const response = await fetch(`/api/groups/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      const data: ApiResponse<{ group: Group }> = await response.json();
      
      if (data.success && data.data) {
        setGroups(prev => prev.map(group => 
          group.id === id ? data.data!.group : group
        ));
        return data.data.group;
      } else {
        throw new Error(data.error || 'Failed to update group');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update group');
      throw err;
    }
  };

  const deleteGroup = async (id: string) => {
    try {
      const response = await fetch(`/api/groups/${id}`, {
        method: 'DELETE',
      });
      
      const data: ApiResponse<Record<string, never>> = await response.json();
      
      if (data.success) {
        setGroups(prev => prev.filter(group => group.id !== id));
      } else {
        throw new Error(data.error || 'Failed to delete group');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete group');
      throw err;
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return {
    groups,
    loading,
    error,
    refetch: fetchGroups,
    createGroup,
    updateGroup,
    deleteGroup,
  };
}
