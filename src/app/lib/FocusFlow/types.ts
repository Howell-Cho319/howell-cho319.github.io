// ============================================
// FocusFlow Type Definitions
// ============================================

// Language Types
export type Language = 'en' | 'zh';

// Habit Types
export interface Habit {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  isBreak: boolean;
  duration: number;
  isActive: boolean;
}

export interface HabitSession {
  habitId: string;
  startTime: string;
  endTime: string;
  actualDuration: number;
  completed: boolean;
}

// Timer Types
export interface TimerPreset {
  id: string;
  name: string;
  nameEn: string;
  workDuration: number;
  breakDuration: number;
  autoStartBreak: boolean;
  autoStartWork: boolean;
}

export interface ActiveSession {
  habitId: string | null;
  presetId: string | null;
  mode: 'work' | 'break';
  totalDuration: number;
  remainingTime: number;
  isRunning: boolean;
  isPaused: boolean;
  sessionsCompleted: number;
  startTime: number;
}

// Custom Timer Settings
export interface CustomTimerConfig {
  totalDuration: number;
  breakDuration: number;
  enableBreak: boolean;
  autoContinue: boolean;
  breakReminder: string;
}

// Daily Plan Types
export interface PlanItem {
  id: string;
  title: string;
  titleEn: string;
  time: string;
  duration: number;
  completed: boolean;
  color: string;
}

// Daily Challenge Types
export interface DailyChallenge {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: 'sessions' | 'minutes' | 'habits' | 'streak';
  target: number;
  current: number;
  completed: boolean;
  icon: string;
  reward: number;
}

// Daily Performance Types
export interface DailyPerformance {
  date: string;
  totalMinutes: number;
  sessionsCompleted: number;
  habits: Record<string, number>;
  challenges: DailyChallenge[];
  planItems: PlanItem[];
}

export interface UserStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate?: string;
  dailyPerformance: DailyPerformance[];
  challenges: DailyChallenge[];
}

// App State
export interface AppState {
  habits: Habit[];
  presets: TimerPreset[];
  activeSession: ActiveSession;
  customConfig: CustomTimerConfig;
  stats: UserStats;
  sessions: HabitSession[];
  language: Language;
  ambientSound: string | null;
  ambientSounds: string[];
  soundVolumes: Record<string, number>;
  soundEnabled: boolean;
}
