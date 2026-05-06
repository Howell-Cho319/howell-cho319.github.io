'use client';

import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { 
  AppState, 
  Habit, 
  TimerPreset, 
  HabitSession,
  CustomTimerConfig,
  DailyChallenge,
  PlanItem,
  Language,
} from './types';

// Default habits with bilingual names
const defaultHabits: Habit[] = [
  { id: 'study', name: '专注学习', nameEn: 'Focus Study', icon: 'book', color: '#6366f1', isBreak: false, duration: 25 * 60, isActive: true },
  { id: 'water', name: '喝水时间', nameEn: 'Water Break', icon: 'cup', color: '#06b6d4', isBreak: true, duration: 5 * 60, isActive: false },
  { id: 'stretch', name: '伸展运动', nameEn: 'Stretch', icon: 'stretch', color: '#10b981', isBreak: true, duration: 5 * 60, isActive: false },
  { id: 'meditate', name: '冥想休息', nameEn: 'Meditation', icon: 'meditate', color: '#8b5cf6', isBreak: true, duration: 10 * 60, isActive: false },
  { id: 'break', name: '短暂休息', nameEn: 'Short Break', icon: 'coffee', color: '#f59e0b', isBreak: true, duration: 5 * 60, isActive: false },
  { id: 'walk', name: '散步休息', nameEn: 'Walk', icon: 'walk', color: '#22c55e', isBreak: true, duration: 15 * 60, isActive: false },
];

// Default presets with bilingual names
const defaultPresets: TimerPreset[] = [
  { id: 'pomodoro', name: '番茄钟', nameEn: 'Pomodoro', workDuration: 25 * 60, breakDuration: 5 * 60, autoStartBreak: false, autoStartWork: false },
  { id: 'deepwork', name: '深度工作', nameEn: 'Deep Work', workDuration: 45 * 60, breakDuration: 10 * 60, autoStartBreak: false, autoStartWork: false },
  { id: 'marathon', name: '马拉松', nameEn: 'Marathon', workDuration: 90 * 60, breakDuration: 15 * 60, autoStartBreak: false, autoStartWork: false },
  { id: 'quick', name: '快速专注', nameEn: 'Quick Focus', workDuration: 15 * 60, breakDuration: 3 * 60, autoStartBreak: false, autoStartWork: false },
];

// Daily challenges for today
const defaultChallenges: DailyChallenge[] = [
  { id: 'ch1', title: '完成3个时段', titleEn: 'Complete 3 Sessions', description: '今日完成3个专注时段', descriptionEn: 'Complete 3 focus sessions today', type: 'sessions', target: 3, current: 0, completed: false, icon: 'target', reward: 10 },
  { id: 'ch2', title: '专注60分钟', titleEn: 'Focus for 60 Minutes', description: '今日累计专注60分钟', descriptionEn: 'Accumulate 60 minutes of focus today', type: 'minutes', target: 60, current: 0, completed: false, icon: 'clock', reward: 15 },
  { id: 'ch3', title: '使用2种习惯', titleEn: 'Use 2 Habits', description: '今日使用至少2种不同习惯', descriptionEn: 'Use at least 2 different habits today', type: 'habits', target: 2, current: 0, completed: false, icon: 'layers', reward: 10 },
  { id: 'ch4', title: '连续专注', titleEn: 'Continuous Focus', description: '完成一个完整的番茄钟(25分钟)', descriptionEn: 'Complete one full Pomodoro (25 min)', type: 'sessions', target: 1, current: 0, completed: false, icon: 'flame', reward: 5 },
];

// Default plan items
const defaultPlanItems: PlanItem[] = [
  { id: 'plan1', title: '完成作业', titleEn: 'Finish Homework', time: '09:00', duration: 60, completed: false, color: '#6366f1' },
  { id: 'plan2', title: '阅读', titleEn: 'Reading', time: '10:30', duration: 30, completed: false, color: '#8b5cf6' },
  { id: 'plan3', title: '复习笔记', titleEn: 'Review Notes', time: '14:00', duration: 45, completed: false, color: '#10b981' },
];

const initialState: AppState = {
  habits: defaultHabits,
  presets: defaultPresets,
  activeSession: {
    habitId: 'study',
    presetId: 'pomodoro',
    mode: 'work',
    totalDuration: 25 * 60,
    remainingTime: 25 * 60,
    isRunning: false,
    isPaused: false,
    sessionsCompleted: 0,
    startTime: 0,
  },
  customConfig: {
    totalDuration: 30 * 60,
    breakDuration: 5 * 60,
    enableBreak: true,
    autoContinue: false,
    breakReminder: '休息一下！',
  },
  stats: {
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    dailyPerformance: [],
    challenges: defaultChallenges,
  },
  sessions: [],
  language: 'en',
  ambientSound: null,
  ambientSounds: [],
  soundVolumes: {},
  soundEnabled: true,
  habitRemainingTimes: {},
  alarmVolume: 0.5,
};

const STORAGE_KEY = 'focusflow_v3_data';

// Change to sessionStorage to clear on tab close but keep on refresh
const STORAGE = typeof window !== 'undefined' ? window.sessionStorage : null;

// Helper function to get today's date string
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

// Helper to get or create today's performance
function getTodayPerformance(performance: AppState['stats']['dailyPerformance'], challenges: DailyChallenge[]) {
  const today = getToday();
  const todayPerf = performance.find(p => p.date === today);
  if (todayPerf) return todayPerf;
  
  return {
    date: today,
    totalMinutes: 0,
    sessionsCompleted: 0,
    habits: {} as Record<string, number>,
    challenges: challenges.map(c => ({ ...c, current: 0, completed: false })),
    planItems: defaultPlanItems,
  };
}

function useFocusFlowInternal() {
  const [state, setState] = useState<AppState>(initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize alarm audio
  useEffect(() => {
    alarmAudioRef.current = new Audio('/music/alarm.mp3');
  }, []);

  const playAlarm = useCallback(() => {
    if (alarmAudioRef.current && state.soundEnabled) {
      alarmAudioRef.current.currentTime = 0;
      alarmAudioRef.current.volume = Math.min(1, state.alarmVolume);
      alarmAudioRef.current.play().catch(err => console.error('Alarm failed:', err));
    }
  }, [state.soundEnabled, state.alarmVolume]);

  const playCompletedNotify = useCallback(() => {
     if (!state.soundEnabled) return;
     
     const playOnce = () => {
       const audio = new Audio('/music/Completed Notify.mp3');
       audio.volume = Math.min(1, state.alarmVolume);
       return audio.play();
     };
 
     // Play 3 times as requested
     playOnce().then(() => {
       setTimeout(() => {
         playOnce().then(() => {
           setTimeout(() => {
             playOnce().catch(err => console.error('Completed Notify third play failed:', err));
           }, 1000);
         }).catch(err => console.error('Completed Notify second play failed:', err));
       }, 1000); // 1 second gap between plays
     }).catch(err => console.error('Completed Notify first play failed:', err));
   }, [state.soundEnabled, state.alarmVolume]);

  // Load from sessionStorage
  useEffect(() => {
    if (!STORAGE) return;
    const stored = STORAGE.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AppState;
        setState({
          ...initialState,
          ...parsed,
          habits: parsed.habits?.length ? parsed.habits : defaultHabits,
          presets: parsed.presets?.length ? parsed.presets : defaultPresets,
          language: parsed.language || 'en',
          ambientSounds: parsed.ambientSounds || (parsed.ambientSound ? [parsed.ambientSound] : []),
          soundVolumes: parsed.soundVolumes || {},
          soundEnabled: parsed.soundEnabled !== undefined ? parsed.soundEnabled : true,
          habitRemainingTimes: parsed.habitRemainingTimes || {},
          alarmVolume: parsed.alarmVolume !== undefined ? parsed.alarmVolume : 0.5,
          stats: {
            ...initialState.stats,
            ...parsed.stats,
            challenges: parsed.stats?.challenges?.length 
              ? parsed.stats.challenges 
              : defaultChallenges,
          },
        });
      } catch {
        console.error('Failed to parse stored data');
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    if (isHydrated && STORAGE) {
      STORAGE.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  // Timer tick
  useEffect(() => {
    if (state.activeSession.isRunning) {
      intervalRef.current = setInterval(() => {
        setState(prev => {
          if (prev.activeSession.remainingTime <= 1) {
            // Play alarm sound
            playAlarm();

            // Auto-record session on completion
            const isWorkMode = prev.activeSession.mode === 'work';
            
            // 1. Calculate next session logic
            let nextHabitId = prev.activeSession.habitId;
            let nextMode: 'work' | 'break' = prev.activeSession.mode === 'work' ? 'break' : 'work';
            let nextDuration = prev.customConfig.breakDuration;
            let shouldStop = false;

            // 2. Logic: Sequence to next habit if current one finishes
            const activeHabits = prev.habits.filter(h => h.isActive);
            const currentIndex = activeHabits.findIndex(h => h.id === prev.activeSession.habitId);
            
            // Clear current habit's persistent time as it finished
            const updatedRemainingTimes = { ...prev.habitRemainingTimes };
            if (prev.activeSession.habitId) {
              const currentHabit = prev.habits.find(h => h.id === prev.activeSession.habitId);
              updatedRemainingTimes[prev.activeSession.habitId] = currentHabit?.duration || prev.activeSession.totalDuration;
            }

            if (currentIndex !== -1 && currentIndex < activeHabits.length - 1) {
              // Move to the next habit in the list (Focus or Break)
              const nextHabit = activeHabits[currentIndex + 1];
              nextHabitId = nextHabit.id;
              nextMode = nextHabit.isBreak ? 'break' : 'work';
              // Load persistent time for next habit or use its default duration
              nextDuration = updatedRemainingTimes[nextHabitId] ?? nextHabit.duration;
              shouldStop = false;
            } else if (currentIndex === activeHabits.length - 1) {
              // Last habit finished
              playCompletedNotify();
              nextMode = 'break';
              nextDuration = prev.customConfig.breakDuration;
              shouldStop = !prev.customConfig.autoContinue;
            } else {
              // Not in a habit sequence (custom timer), follow normal work/break cycle
              if (isWorkMode) {
                nextMode = 'break';
                nextDuration = prev.customConfig.breakDuration;
              } else {
                nextMode = 'work';
                nextDuration = prev.customConfig.totalDuration;
              }
              shouldStop = !prev.customConfig.autoContinue;
            }
            
            const newSessionsCompleted = isWorkMode
              ? prev.activeSession.sessionsCompleted + 1
              : prev.activeSession.sessionsCompleted;

            // 3. Record session data (Copied from recordSession but adapted for functional update)
            const elapsedSeconds = prev.activeSession.totalDuration; // It finished, so use total
            // Ensure at least 1 minute if it's a completion, unless duration is extremely short
            const calculatedMinutes = Math.round(elapsedSeconds / 60);
            const sessionMinutes = calculatedMinutes === 0 && elapsedSeconds > 0 ? 1 : calculatedMinutes;

            const session: HabitSession = {
              habitId: prev.activeSession.habitId || 'custom',
              startTime: new Date(prev.activeSession.startTime || Date.now()).toISOString(),
              endTime: new Date().toISOString(),
              actualDuration: sessionMinutes,
              completed: true,
            };

            const today = getToday();
            const todayPerf = getTodayPerformance(prev.stats.dailyPerformance, prev.stats.challenges);
            const sessionsCompletedToday = todayPerf.sessionsCompleted + (isWorkMode ? 1 : 0);
            
            // Calculate streak
            let currentStreak = 0;
            const todayDate = new Date();
            for (let i = 0; i < 365; i++) {
              const checkDate = new Date(todayDate);
              checkDate.setDate(checkDate.getDate() - i);
              const checkDateStr = checkDate.toISOString().split('T')[0];
              
              if (checkDateStr === today) {
                if (sessionsCompletedToday > 0) currentStreak++;
                else break;
              } else {
                const perf = prev.stats.dailyPerformance.find(p => p.date === checkDateStr);
                if (perf && perf.sessionsCompleted > 0) currentStreak++;
                else break;
              }
            }

            // Update challenges
            const updatedChallenges = prev.stats.challenges.map(challenge => {
              let newCurrent = challenge.current;
              if (challenge.type === 'sessions' && isWorkMode) newCurrent += 1;
              else if (challenge.type === 'minutes' && isWorkMode) newCurrent += session.actualDuration;
              else if (challenge.type === 'habits' && isWorkMode) {
                const usedHabitsToday = new Set([...Object.keys(todayPerf.habits), session.habitId]);
                newCurrent = usedHabitsToday.size;
              }
              return { ...challenge, current: newCurrent, completed: newCurrent >= challenge.target };
            });

            // Update today's performance
            const updatedPerformance = prev.stats.dailyPerformance.filter(p => p.date !== today);
            const newTodayPerf = {
              date: today,
              totalMinutes: todayPerf.totalMinutes + session.actualDuration,
              sessionsCompleted: sessionsCompletedToday,
              habits: {
                ...todayPerf.habits,
                [session.habitId]: (todayPerf.habits[session.habitId] || 0) + session.actualDuration,
              },
              challenges: updatedChallenges,
              planItems: todayPerf.planItems,
            };

            return {
              ...prev,
              sessions: [...prev.sessions, session],
              habitRemainingTimes: updatedRemainingTimes,
              stats: {
                ...prev.stats,
                totalSessions: prev.stats.totalSessions + (isWorkMode ? 1 : 0),
                totalMinutes: prev.stats.totalMinutes + (isWorkMode ? session.actualDuration : 0),
                currentStreak,
                longestStreak: Math.max(prev.stats.longestStreak, currentStreak),
                lastSessionDate: today,
                dailyPerformance: [...updatedPerformance, newTodayPerf],
                challenges: updatedChallenges,
              },
              activeSession: {
                ...prev.activeSession,
                habitId: nextHabitId,
                mode: nextMode,
                totalDuration: nextDuration,
                remainingTime: nextDuration,
                isRunning: !shouldStop,
                isPaused: false,
                sessionsCompleted: newSessionsCompleted,
                startTime: Date.now(),
              },
            };
          }

          return {
            ...prev,
            activeSession: {
              ...prev.activeSession,
              remainingTime: prev.activeSession.remainingTime - 1,
            },
          };
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.activeSession.isRunning, state.activeSession.habitId, state.activeSession.mode, state.customConfig, state.habits]);

  // Language actions
  const setLanguage = useCallback((lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  }, []);

  // Ambient sound actions
  const setAmbientSound = useCallback((sound: string | null) => {
    setState(prev => ({ ...prev, ambientSound: sound }));
  }, []);

  const toggleAmbientSound = useCallback((soundId: string) => {
    setState(prev => {
      const isActive = prev.ambientSounds.includes(soundId);
      const ambientSounds = isActive
        ? prev.ambientSounds.filter(s => s !== soundId)
        : [...prev.ambientSounds, soundId];
      const soundVolumes = isActive
        ? prev.soundVolumes
        : { ...prev.soundVolumes, [soundId]: prev.soundVolumes[soundId] ?? 0.7 };
      return { ...prev, ambientSounds, soundVolumes, ambientSound: ambientSounds[0] ?? null };
    });
  }, []);

  const setAmbientVolume = useCallback((soundId: string, volume: number) => {
    setState(prev => ({
      ...prev,
      soundVolumes: { ...prev.soundVolumes, [soundId]: volume },
    }));
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, soundEnabled: enabled }));
  }, []);

  const setAlarmVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, alarmVolume: volume }));
  }, []);
  // Habit actions
  const toggleHabit = useCallback((habitId: string) => {
    setState(prev => {
      const habitToToggle = prev.habits.find(h => h.id === habitId);
      if (!habitToToggle) return prev;
      
      const otherHabits = prev.habits.filter(h => h.id !== habitId);
      const updatedHabit = { ...habitToToggle, isActive: !habitToToggle.isActive };
      
      return {
        ...prev,
        habits: [...otherHabits, updatedHabit],
      };
    });
  }, []);

  const addHabit = useCallback((habit: Omit<Habit, 'id'>) => {
    const newHabit: Habit = { ...habit, id: `habit_${Date.now()}` };
    setState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
  }, []);

  const updateHabit = useCallback((habitId: string, updates: Partial<Habit>) => {
    setState(prev => {
      const updatedHabits = prev.habits.map(h =>
        h.id === habitId ? { ...h, ...updates } : h
      );
      
      const updatedRemainingTimes = { ...prev.habitRemainingTimes };
      const updatedHabit = updatedHabits.find(h => h.id === habitId);
      
      // If duration was updated, sync the remaining time for this habit
      if (updatedHabit && updates.duration !== undefined) {
        updatedRemainingTimes[habitId] = updatedHabit.duration;
      }

      // If the habit being updated is currently active, sync the timer
      let updatedActiveSession = prev.activeSession;
      if (prev.activeSession.habitId === habitId) {
        if (updatedHabit) {
          updatedActiveSession = {
            ...prev.activeSession,
            mode: updatedHabit.isBreak ? 'break' : 'work',
            totalDuration: updatedHabit.duration,
            remainingTime: updatedHabit.duration,
            isRunning: false, // Stop timer on edit to let user review new duration
            isPaused: false,
          };
        }
      }

      return {
        ...prev,
        habits: updatedHabits,
        habitRemainingTimes: updatedRemainingTimes,
        activeSession: updatedActiveSession,
      };
    });
  }, []);

  const deleteHabit = useCallback((habitId: string) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.filter(h => h.id !== habitId),
    }));
  }, []);

  const updateCustomConfig = useCallback((config: Partial<CustomTimerConfig>) => {
    setState(prev => ({
      ...prev,
      customConfig: { ...prev.customConfig, ...config },
    }));
  }, []);

  // Timer actions
  const selectPreset = useCallback((presetId: string) => {
    const preset = state.presets.find(p => p.id === presetId);
    if (!preset) return;

    setState(prev => ({
      ...prev,
      activeSession: {
        ...prev.activeSession,
        presetId,
        habitId: 'study',
        mode: 'work',
        totalDuration: preset.workDuration,
        remainingTime: preset.workDuration,
        isRunning: false,
        isPaused: false,
      },
    }));
  }, [state.presets]);

  const setCustomDuration = useCallback((minutes: number) => {
    setState(prev => ({
      ...prev,
      activeSession: {
        ...prev.activeSession,
        presetId: null,
        habitId: null,
        mode: 'work',
        totalDuration: minutes * 60,
        remainingTime: minutes * 60,
        isRunning: false,
        isPaused: false,
      },
    }));
  }, []);

  const setBreakDuration = useCallback((minutes: number) => {
    setState(prev => ({
      ...prev,
      customConfig: {
        ...prev.customConfig,
        breakDuration: minutes * 60,
      },
    }));
  }, []);

  const startTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeSession: {
        ...prev.activeSession,
        isRunning: true,
        isPaused: false,
        startTime: prev.activeSession.startTime || Date.now(),
      },
    }));
  }, []);

  // Record session and update challenges
  const recordSession = useCallback((completed: boolean = true) => {
    setState(prev => {
      // Calculate elapsed time in the CURRENT segment
      const elapsedSeconds = prev.activeSession.totalDuration - prev.activeSession.remainingTime;
      
      // Don't record if almost no time spent
      if (elapsedSeconds < 1 && !completed) return prev; 

      // Ensure at least 1 minute if it's a completion, unless duration is extremely short
      const calculatedMinutes = Math.round(elapsedSeconds / 60);
      const sessionMinutes = completed && calculatedMinutes === 0 && elapsedSeconds > 0 ? 1 : calculatedMinutes;

      const session: HabitSession = {
        habitId: prev.activeSession.habitId || 'custom',
        startTime: new Date(prev.activeSession.startTime || Date.now()).toISOString(),
        endTime: new Date().toISOString(),
        actualDuration: sessionMinutes,
        completed,
      };

      // Only update stats if we actually spent at least a minute or it's a completion
      if (sessionMinutes === 0 && !completed) return prev;

      const today = getToday();
      const todayPerf = getTodayPerformance(prev.stats.dailyPerformance, prev.stats.challenges);
      
      // Update today's data first to include it in streak calculation
      const sessionsCompletedToday = todayPerf.sessionsCompleted + (completed ? 1 : 0);
      
      // Calculate streak
      let currentStreak = 0;
      const todayDate = new Date();
      for (let i = 0; i < 365; i++) {
        const checkDate = new Date(todayDate);
        checkDate.setDate(checkDate.getDate() - i);
        const checkDateStr = checkDate.toISOString().split('T')[0];
        
        if (checkDateStr === today) {
          if (sessionsCompletedToday > 0) currentStreak++;
          else break;
        } else {
          const perf = prev.stats.dailyPerformance.find(p => p.date === checkDateStr);
          if (perf && perf.sessionsCompleted > 0) currentStreak++;
          else break;
        }
      }

      // Update challenges based on session completion
      const updatedChallenges = prev.stats.challenges.map(challenge => {
        let newCurrent = challenge.current;
        if (challenge.type === 'sessions' && session.completed) {
          newCurrent = challenge.current + 1;
        } else if (challenge.type === 'minutes' && session.actualDuration) {
          newCurrent = challenge.current + session.actualDuration;
        } else if (challenge.type === 'habits') {
          const usedHabitsToday = new Set([...Object.keys(todayPerf.habits), session.habitId]);
          newCurrent = usedHabitsToday.size;
        }
        return { ...challenge, current: newCurrent, completed: newCurrent >= challenge.target };
      });

      // Update today's performance
      const updatedPerformance = prev.stats.dailyPerformance.filter(p => p.date !== today);
      const newTodayPerf = {
        date: today,
        totalMinutes: todayPerf.totalMinutes + session.actualDuration,
        sessionsCompleted: sessionsCompletedToday,
        habits: {
          ...todayPerf.habits,
          [session.habitId]: (todayPerf.habits[session.habitId] || 0) + session.actualDuration,
        },
        challenges: updatedChallenges,
        planItems: todayPerf.planItems,
      };

      return {
        ...prev,
        sessions: [...prev.sessions, session],
        stats: {
          ...prev.stats,
          totalSessions: prev.stats.totalSessions + (completed ? 1 : 0),
          totalMinutes: prev.stats.totalMinutes + session.actualDuration,
          currentStreak,
          longestStreak: Math.max(prev.stats.longestStreak, currentStreak),
          lastSessionDate: today,
          dailyPerformance: [...updatedPerformance, newTodayPerf],
          challenges: updatedChallenges,
        },
      };
    });
  }, []); // Stable dependencies

  const selectHabit = useCallback((habitId: string) => {
    setState(prev => {
      const habit = prev.habits.find(h => h.id === habitId);
      if (!habit) return prev;

      const currentHabitId = prev.activeSession.habitId;
      const currentRemainingTime = prev.activeSession.remainingTime;

      // 1. Save current habit's remaining time if it exists
      const updatedRemainingTimes = { ...prev.habitRemainingTimes };
      if (currentHabitId) {
        updatedRemainingTimes[currentHabitId] = currentRemainingTime;
      }

      // 2. Load next habit's remaining time or use default
      const nextRemainingTime = updatedRemainingTimes[habitId] ?? habit.duration;

      return {
        ...prev,
        habitRemainingTimes: updatedRemainingTimes,
        activeSession: {
          ...prev.activeSession,
          habitId: habit.id,
          presetId: null,
          mode: habit.isBreak ? 'break' : 'work',
          totalDuration: habit.duration,
          remainingTime: nextRemainingTime,
          isRunning: true,
          isPaused: false,
          startTime: Date.now(),
        },
      };
    });
  }, []);

  const pauseTimer = useCallback(() => {
    recordSession(false); // Record partial minutes spent
    setState(prev => {
      const updatedRemainingTimes = { ...prev.habitRemainingTimes };
      if (prev.activeSession.habitId) {
        updatedRemainingTimes[prev.activeSession.habitId] = prev.activeSession.remainingTime;
      }
      
      return {
        ...prev,
        habitRemainingTimes: updatedRemainingTimes,
        activeSession: {
          ...prev.activeSession,
          isRunning: false,
          isPaused: true,
          startTime: Date.now(), // Reset start time for next segment
        },
      };
    });
  }, [recordSession]);

  const resetTimer = useCallback(() => {
    setState(prev => {
      const currentHabit = prev.habits.find(h => h.id === prev.activeSession.habitId);
      const duration = currentHabit?.duration || prev.activeSession.totalDuration;
      
      const updatedRemainingTimes = { ...prev.habitRemainingTimes };
      if (prev.activeSession.habitId) {
        updatedRemainingTimes[prev.activeSession.habitId] = duration;
      }

      return {
        ...prev,
        habitRemainingTimes: updatedRemainingTimes,
        activeSession: {
          ...prev.activeSession,
          remainingTime: duration,
          totalDuration: duration,
          isRunning: false,
          isPaused: false,
          startTime: 0,
        },
      };
    });
  }, []);

  const skipToBreak = useCallback(() => {
    setState(prev => {
      const activeHabits = prev.habits.filter(h => h.isActive);
      const currentIndex = activeHabits.findIndex(h => h.id === prev.activeSession.habitId);
      
      const currentHabitId = prev.activeSession.habitId;
      const currentRemainingTime = prev.activeSession.remainingTime;

      // 1. Save current habit's remaining time
      const updatedRemainingTimes = { ...prev.habitRemainingTimes };
      if (currentHabitId) {
        updatedRemainingTimes[currentHabitId] = currentRemainingTime;
      }

      // 2. Logic: Move to next habit if available
      let nextHabitId = prev.activeSession.habitId;
      let nextMode: 'work' | 'break' = 'break';
      let nextDuration = prev.customConfig.breakDuration;

      if (currentIndex !== -1 && currentIndex < activeHabits.length - 1) {
        const nextHabit = activeHabits[currentIndex + 1];
        nextHabitId = nextHabit.id;
        nextMode = nextHabit.isBreak ? 'break' : 'work';
        nextDuration = updatedRemainingTimes[nextHabitId] ?? nextHabit.duration;
      } else {
        // If at the end or no habits, go to generic break and reset habit selection
        nextHabitId = null;
        nextMode = 'break';
        nextDuration = prev.customConfig.breakDuration;
      }

      return {
        ...prev,
        habitRemainingTimes: updatedRemainingTimes,
        activeSession: {
          ...prev.activeSession,
          habitId: nextHabitId,
          mode: nextMode,
          totalDuration: nextDuration,
          remainingTime: nextDuration,
          isRunning: true,
          isPaused: false,
          startTime: Date.now(),
        },
      };
    });
  }, [state.customConfig.breakDuration]);

  const resetBreak = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeSession: {
        ...prev.activeSession,
        mode: 'work',
        totalDuration: prev.customConfig.totalDuration,
        remainingTime: prev.customConfig.totalDuration,
        isRunning: false,
        isPaused: false,
      },
    }));
  }, [state.customConfig.totalDuration]);

  const resetAllHabits = useCallback(() => {
    setState(prev => {
      const activeHabits = prev.habits.filter(h => h.isActive);
      const firstHabit = activeHabits[0];
      
      return {
        ...prev,
        habitRemainingTimes: {},
        activeSession: {
          ...prev.activeSession,
          habitId: firstHabit ? firstHabit.id : null,
          mode: firstHabit?.isBreak ? 'break' : 'work',
          totalDuration: firstHabit ? firstHabit.duration : prev.customConfig.totalDuration,
          remainingTime: firstHabit ? firstHabit.duration : prev.customConfig.totalDuration,
          isRunning: false,
          isPaused: false,
          sessionsCompleted: 0,
        },
      };
    });
  }, [state.customConfig.totalDuration]);

  // Plan item actions
  const addPlanItem = useCallback((item: Omit<PlanItem, 'id'>) => {
    const newItem: PlanItem = { ...item, id: `plan_${Date.now()}` };
    setState(prev => {
      const today = getToday();
      const todayPerf = getTodayPerformance(prev.stats.dailyPerformance, prev.stats.challenges);
      const updatedPerformance = prev.stats.dailyPerformance.filter(p => p.date !== today);
      
      return {
        ...prev,
        stats: {
          ...prev.stats,
          dailyPerformance: [
            ...updatedPerformance,
            { ...todayPerf, planItems: [...todayPerf.planItems, newItem] },
          ],
        },
      };
    });
  }, []);

  const updatePlanItem = useCallback((itemId: string, updates: Partial<PlanItem>) => {
    setState(prev => {
      const today = getToday();
      const todayPerf = getTodayPerformance(prev.stats.dailyPerformance, prev.stats.challenges);
      const updatedPerformance = prev.stats.dailyPerformance.filter(p => p.date !== today);
      const updatedPlanItems = todayPerf.planItems.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      );
      
      return {
        ...prev,
        stats: {
          ...prev.stats,
          dailyPerformance: [
            ...updatedPerformance,
            { ...todayPerf, planItems: updatedPlanItems },
          ],
        },
      };
    });
  }, []);

  const deletePlanItem = useCallback((itemId: string) => {
    setState(prev => {
      const today = getToday();
      const todayPerf = getTodayPerformance(prev.stats.dailyPerformance, prev.stats.challenges);
      const updatedPerformance = prev.stats.dailyPerformance.filter(p => p.date !== today);
      
      return {
        ...prev,
        stats: {
          ...prev.stats,
          dailyPerformance: [
            ...updatedPerformance,
            { ...todayPerf, planItems: todayPerf.planItems.filter(item => item.id !== itemId) },
          ],
        },
      };
    });
  }, []);

  const togglePlanItem = useCallback((itemId: string) => {
    setState(prev => {
      const today = getToday();
      const todayPerf = getTodayPerformance(prev.stats.dailyPerformance, prev.stats.challenges);
      const updatedPerformance = prev.stats.dailyPerformance.filter(p => p.date !== today);
      const updatedPlanItems = todayPerf.planItems.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      
      return {
        ...prev,
        stats: {
          ...prev.stats,
          dailyPerformance: [
            ...updatedPerformance,
            { ...todayPerf, planItems: updatedPlanItems },
          ],
        },
      };
    });
  }, []);

  // Get today's data
  const getTodayData = useCallback(() => {
    const today = getToday();
    const todayPerf = state.stats.dailyPerformance.find(p => p.date === today);
    if (todayPerf) {
      // Always use the live stats.challenges for up-to-date progress
      return {
        ...todayPerf,
        challenges: state.stats.challenges,
      };
    }
    // No entry yet for today — return zeroed defaults with live challenges
    return {
      date: today,
      totalMinutes: 0,
      sessionsCompleted: 0,
      habits: {} as Record<string, number>,
      challenges: state.stats.challenges,
      planItems: defaultPlanItems,
    };
  }, [state.stats.dailyPerformance, state.stats.challenges]);

  // Get weekly chart data
  const getWeeklyData = useCallback(() => {
    const data = [];
    const today = new Date();
    const dayNames = state.language === 'zh' 
      ? ['日', '一', '二', '三', '四', '五', '六']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayPerf = state.stats.dailyPerformance.find(p => p.date === dateStr);
      
      data.push({
        day: dayNames[date.getDay()],
        minutes: dayPerf?.totalMinutes || 0,
        sessions: dayPerf?.sessionsCompleted || 0,
      });
    }
    
    return data;
  }, [state.stats.dailyPerformance, state.language]);

  return {
    state,
    isHydrated,
    // Language
    setLanguage,
    // Ambient Sound
    setAmbientSound,
    toggleAmbientSound,
    setAmbientVolume,
    setSoundEnabled,
    setAlarmVolume,
    // Habits
    toggleHabit,
    addHabit,
    updateHabit,
    deleteHabit,
    // Timer
    selectPreset,
    selectHabit,
    setCustomDuration,
    setBreakDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    playAlarm,
    skipToBreak,
    skipBreak: resetBreak,
    resetAllHabits,
    recordSession,
    // Config
    updateCustomConfig,
    // Plan
    addPlanItem,
    updatePlanItem,
    deletePlanItem,
    togglePlanItem,
    // Stats
    getTodayData,
    getWeeklyData,
  };
}

export type FocusFlowStore = ReturnType<typeof useFocusFlowInternal>;

export const FocusFlowContext = createContext<FocusFlowStore | null>(null);

export function FocusFlowProvider({ children }: { children: ReactNode }) {
  const store = useFocusFlowInternal();
  return (
    <FocusFlowContext.Provider value={store}>
      {children}
    </FocusFlowContext.Provider>
  );
}

export function useFocusFlow() {
  const context = useContext(FocusFlowContext);
  if (!context) {
    throw new Error('useFocusFlow must be used within a FocusFlowProvider');
  }
  return context;
}
