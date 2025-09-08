'use client';

import { create } from 'zustand';

interface UiState {
  // Sidebar state
  sidebarOpen: boolean;
  
  // Modal states
  modals: Record<string, boolean>;
  
  // Loading states
  loadingStates: Record<string, boolean>;
  
  // Theme
  theme: 'light' | 'dark';
  
  // Notifications
  snackbar: {
    isOpen: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  };
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  setLoading: (key: string, loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  showSnackbar: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  hideSnackbar: () => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  sidebarOpen: false,
  modals: {},
  loadingStates: {},
  theme: 'light',
  snackbar: {
    isOpen: false,
    message: '',
    type: 'info',
  },

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  openModal: (modalId) => set((state) => ({
    modals: { ...state.modals, [modalId]: true }
  })),

  closeModal: (modalId) => set((state) => ({
    modals: { ...state.modals, [modalId]: false }
  })),

  toggleModal: (modalId) => set((state) => ({
    modals: { ...state.modals, [modalId]: !state.modals[modalId] }
  })),

  setLoading: (key, loading) => set((state) => ({
    loadingStates: { ...state.loadingStates, [key]: loading }
  })),

  setTheme: (theme) => set({ theme }),

  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),

  showSnackbar: (message, type = 'info') => set({
    snackbar: { isOpen: true, message, type }
  }),

  hideSnackbar: () => set((state) => ({
    snackbar: { ...state.snackbar, isOpen: false }
  })),
}));
