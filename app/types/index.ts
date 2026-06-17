export type Role = 'student' | 'admin' | 'parent';
export type Plan = 'free' | 'basic' | 'premium' | 'vip';
export type Subject = 'math' | 'physics' | 'chemistry' | 'biology' | 'kazakh' | 'history' | 'russian' | 'english';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  grade?: number;
  plan: Plan;
  points: number;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  badges: string[];
  coursesEnrolled: string[];
  completedLessons: string[];
  createdAt: string;
  parentEmail?: string;
  childId?: string;
}

export interface Course {
  id: string;
  title: string;
  subject: Subject;
  grade: number;
  lessons: number;
  duration: string;
  rating: number;
  reviews: number;
  students: number;
  emoji: string;
  color: string;
  instructor: string;
  price: number;
  isFree: boolean;
  requiredPlan: Plan;
  description: string;
  progress?: number;
  tags: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'practice' | 'reading';
  completed: boolean;
  locked: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

export interface TestResult {
  id: string;
  userId: string;
  courseId: string;
  score: number;
  total: number;
  date: string;
  timeSpent: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface PlanInfo {
  id: Plan;
  name: string;
  nameKz: string;
  price: number;
  period: string;
  color: string;
  bg: string;
  popular?: boolean;
  features: string[];
}
