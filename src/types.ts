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

export type AppTab = 'dashboard' | 'twin' | 'community' | 'chat' | 'emotions' | 'profile' | 'nutrition';

export interface UserProfile {
  fullName: string;
  tcNo: string;
  allergies: string;
  birthDate: string;
  weight: string;
}

export interface EmotionEntry {
  text: string;
  color: string;
  date: string;
}

export interface CommunityItem {
  id: string;
  type: 'sensor' | 'strip' | 'meter' | 'insulin';
  title: string;
  distance: string;
  status: 'available' | 'requested';
}
