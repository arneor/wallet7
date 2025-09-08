'use client';

import { create } from 'zustand';
import { Group, GroupMember } from '@/lib/types';

interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
  groupMembers: Record<string, GroupMember[]>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setGroups: (groups: Group[]) => void;
  addGroup: (group: Group) => void;
  updateGroup: (id: string, updates: Partial<Group>) => void;
  removeGroup: (id: string) => void;
  setSelectedGroup: (group: Group | null) => void;
  setGroupMembers: (groupId: string, members: GroupMember[]) => void;
  addGroupMember: (groupId: string, member: GroupMember) => void;
  removeGroupMember: (groupId: string, memberId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useGroupStore = create<GroupState>((set, get) => ({
  groups: [],
  selectedGroup: null,
  groupMembers: {},
  isLoading: false,
  error: null,

  setGroups: (groups) => set({ groups }),

  addGroup: (group) => set((state) => ({
    groups: [...state.groups, group]
  })),

  updateGroup: (id, updates) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === id ? { ...group, ...updates } : group
    ),
    selectedGroup: state.selectedGroup?.id === id 
      ? { ...state.selectedGroup, ...updates }
      : state.selectedGroup
  })),

  removeGroup: (id) => set((state) => ({
    groups: state.groups.filter(group => group.id !== id),
    selectedGroup: state.selectedGroup?.id === id ? null : state.selectedGroup
  })),

  setSelectedGroup: (group) => set({ selectedGroup: group }),

  setGroupMembers: (groupId, members) => set((state) => ({
    groupMembers: {
      ...state.groupMembers,
      [groupId]: members
    }
  })),

  addGroupMember: (groupId, member) => set((state) => ({
    groupMembers: {
      ...state.groupMembers,
      [groupId]: [...(state.groupMembers[groupId] || []), member]
    }
  })),

  removeGroupMember: (groupId, memberId) => set((state) => ({
    groupMembers: {
      ...state.groupMembers,
      [groupId]: (state.groupMembers[groupId] || []).filter(
        member => member.id !== memberId
      )
    }
  })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),
}));
