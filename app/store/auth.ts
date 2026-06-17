'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

const MOCK: User[] = [
  { id:'1', name:'Айгерім Сейтқали', email:'student@test.kz', role:'student', grade:9, plan:'premium', points:4820, level:12, xp:720, xpToNext:1000, streak:7, badges:['🔥','⭐','🏆','💎'], coursesEnrolled:['1','2','3','4'], completedLessons:['l1','l2','l3'], createdAt:'2025-01-10' },
  { id:'2', name:'Админ Жасұлан', email:'admin@test.kz', role:'admin', plan:'vip', points:0, level:1, xp:0, xpToNext:1000, streak:0, badges:[], coursesEnrolled:[], completedLessons:[], createdAt:'2024-09-01' },
  { id:'3', name:'Нұргүл Сейтқали', email:'parent@test.kz', role:'parent', plan:'premium', points:0, level:1, xp:0, xpToNext:1000, streak:0, badges:[], coursesEnrolled:[], completedLessons:[], createdAt:'2025-01-10', childId:'1' },
];
const PWS: Record<string,string> = { 'student@test.kz':'student123', 'admin@test.kz':'admin123', 'parent@test.kz':'parent123' };

interface Store {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: any) => { success: boolean; error?: string };
  logout: () => void;
  updatePlan: (plan: User['plan']) => void;
  addPoints: (pts: number) => void;
}

export const useAuthStore = create<Store>()(persist((set, get) => ({
  user: null, users: MOCK, isAuthenticated: false,
  login: (email, password) => {
    const { users } = get();
    const u = users.find(x => x.email === email);
    const pw = PWS[email] || (typeof window !== 'undefined' ? localStorage.getItem('pw_'+email) : null);
    if (!u || pw !== password) return { success: false, error: 'Email немесе пароль қате' };
    set({ user: u, isAuthenticated: true });
    return { success: true };
  },
  register: (data) => {
    const { users } = get();
    if (users.find(u => u.email === data.email)) return { success: false, error: 'Бұл email тіркелген' };
    const nu: User = { id: String(Date.now()), name: data.name, email: data.email, role: 'student', grade: data.grade, plan: 'free', points: 0, level: 1, xp: 0, xpToNext: 1000, streak: 0, badges: [], coursesEnrolled: [], completedLessons: [], createdAt: new Date().toISOString().split('T')[0] };
    if (typeof window !== 'undefined') localStorage.setItem('pw_'+data.email, data.password);
    set({ users: [...users, nu], user: nu, isAuthenticated: true });
    return { success: true };
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updatePlan: (plan) => {
    const { user, users } = get();
    if (!user) return;
    const u = { ...user, plan };
    set({ user: u, users: users.map(x => x.id === user.id ? u : x) });
  },
  addPoints: (pts) => {
    const { user, users } = get();
    if (!user) return;
    const newXp = user.xp + pts;
    const levelUp = newXp >= user.xpToNext;
    const u = { ...user, points: user.points + pts, xp: levelUp ? newXp - user.xpToNext : newXp, level: levelUp ? user.level + 1 : user.level };
    set({ user: u, users: users.map(x => x.id === user.id ? u : x) });
  },
}), { name: 'bilimjol-v2' }));
