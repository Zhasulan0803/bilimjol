'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface Store {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  updatePlan: (plan: User['plan']) => void;
}

export const useAuthStore = create<Store>()(persist((set, get) => ({
  user: null, isAuthenticated: false,
  logout: () => set({ user: null, isAuthenticated: false }),
  updatePlan: (plan) => {
    const { user } = get();
    if (!user) return;
    set({ user: { ...user, plan } });
  },
}), { name: 'bilimjol-v2' }));
