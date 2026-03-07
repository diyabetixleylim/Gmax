export interface GlucoseData {
  time: string;
  value: number;
  isPrediction?: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'gubi';
  timestamp: Date;
}

export type AppTab = 'dashboard' | 'nutrition' | 'chat' | 'twin' | 'community' | 'emotions' | 'profile' | 'emergency' | 'notifications';

export interface Reminder {
  id: string;
  type: 'insulin' | 'medication';
  name: string;
  time: string;
  dosage: string;
  completed: boolean;
}

export interface UserProfile {
  fullName: string;
  tcNo: string;
  allergies: string;
  birthDate: string;
  weight: string;
}

export interface EmotionEntry {
  id: string;
  emotion: string;
  color: string;
  date: string;
  note: string;
}

export interface CommunityItem {
  id: string;
  type: 'sensor' | 'strip' | 'meter' | 'insulin';
  title: string;
  distance: string;
  status: 'available' | 'requested';
  user: string;
  description?: string;
}

export interface FoodEntry {
  id: string;
  name: string;
  kh: number;
  timestamp: string;
}
