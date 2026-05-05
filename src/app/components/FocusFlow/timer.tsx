'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useFocusFlow } from '../../lib/FocusFlow/store';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Coffee,
  Plus,
  Volume2,
  VolumeX,
  Clock,
  CloudRain,
  Trees,
  Coffee as CoffeeIcon,
  Music,
  Flame,
  Bird,
  Building2,
  Library,
  Heart,
  CloudLightning,
  Sun,
  Bike,
} from 'lucide-react';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const AMBIENT_SOUNDS = [
  // Nature
  { id: 'calm-rain', name: 'Calm Rain', nameZh: '微雨', icon: CloudRain, url: '/music/calming rain.mp3', category: 'Nature' },
  { id: 'gentle-rain', name: 'Gentle Rain', nameZh: '柔雨', icon: CloudRain, url: '/music/gentle rain.mp3', category: 'Nature' },
  { id: 'thunder-rain', name: 'Thunder', nameZh: '雷雨', icon: CloudLightning, url: '/music/rain thunder nature sounds.mp3', category: 'Nature' },
  { id: 'storm', name: 'Storm', nameZh: '风暴', icon: CloudLightning, url: '/music/freesound_community-rain-and-thunder-16705.mp3', category: 'Nature' },
  { id: 'forest', name: 'Forest', nameZh: '森林', icon: Trees, url: '/music/forest.mp3', category: 'Nature' },
  { id: 'birds', name: 'Birds', nameZh: '鸟鸣', icon: Bird, url: '/music/birds inforest on sunny day.mp3', category: 'Nature' },
  { id: 'garden', name: 'Garden', nameZh: '花园', icon: Sun, url: '/music/garden sunny.mp3', category: 'Nature' },
  
  // Ambience
  { id: 'cafe-noise', name: 'Cafe Noise', nameZh: '咖啡馆', icon: CoffeeIcon, url: '/music/cafe noise.mp3', category: 'Ambience' },
  { id: 'street-cafe', name: 'Street Cafe', nameZh: '街边咖啡', icon: Bike, url: '/music/street cafe busy motorcycle stopping.mp3', category: 'Ambience' },
  { id: 'city', name: 'City', nameZh: '城市', icon: Building2, url: '/music/city sounds.mp3', category: 'Ambience' },
  { id: 'fire-relax', name: 'Fireplace', nameZh: '篝火', icon: Flame, url: '/music/fire relaxing.mp3', category: 'Ambience' },
  { id: 'fire-forest', name: 'Campfire', nameZh: '林中火', icon: Flame, url: '/music/fire forest.mp3', category: 'Ambience' },
  { id: 'fire-ambience', name: 'Fire Ambience', nameZh: '火焰', icon: Flame, url: '/music/fire ambience.mp3', category: 'Ambience' },
  
  // Music - All compressed to 1 hour, ~55MB each
  { id: 'jazz-cafe', name: 'Jazz Cafe', nameZh: '爵士咖啡', icon: CoffeeIcon, url: '/music/jazz-cafe.mp3', category: 'Music' },
  { id: 'ghibli-chill', name: 'Ghibli Chill', nameZh: '吉卜力', icon: Music, url: '/music/ghibli-chill.mp3', category: 'Music' },
  { id: 'lofi', name: 'Lofi Library', nameZh: 'Lofi', icon: Library, url: '/music/lofi-library.mp3', category: 'Music' },
  { id: 'music-rain', name: 'Music & Rain', nameZh: '音乐雨声', icon: CloudRain, url: '/music/music-with-rain.mp3', category: 'Music' },
  { id: 'howls', name: 'Howl\'s Piano', nameZh: '哈尔钢琴', icon: Music, url: '/music/Howl\'s Moving Castle - Promise of the World (piano cover).mp4', category: 'Music' },
  { id: 'love-letter', name: 'Love Letter', nameZh: '情书', icon: Heart, url: '/music/감성 영화음악 러브레터 OST 무손실 음원 🎧 Love Letter Soundtrack Full Track BGM.mp4', category: 'Music' },
];

const CIRCLE_RADIUS = 120;
const CIRCLE_RADIUS_LG = 140;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const CIRCLE_CIRCUMFERENCE_LG = 2 * Math.PI * CIRCLE_RADIUS_LG;

export function Timer() {
  const {
    state,
    selectPreset,
    selectHabit,
    setCustomDuration,
    setBreakDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    skipToBreak,
    skipBreak,
    recordSession,
    updateCustomConfig,
    getWeeklyData,
    setAmbientSound,
    toggleAmbientSound,
    setAmbientVolume,
    setSoundEnabled,
  } = useFocusFlow();

  const { activeSession, habits, presets, stats, language, ambientSound, ambientSounds, soundVolumes, soundEnabled } = state;
  const [showCustom, setShowCustom] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(30);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const audioRef = useRef<AudioContext | null>(null);
  // Map of soundId -> HTMLAudioElement
  const ambientAudiosRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const lastTimeRef = useRef<number>(activeSession.remainingTime);

  const t = {
    breakTime: language === 'zh' ? '休息时间' : 'Break Time',
    focusMode: language === 'zh' ? '专注模式' : 'Focus Mode',
    session: language === 'zh' ? '节' : 'Session',
    soundOn: language === 'zh' ? '提示音' : 'Sound',
    soundOff: language === 'zh' ? '提示音' : 'Sound',
    ambientTitle: language === 'zh' ? '环境音' : 'Ambient',
    quickSelect: language === 'zh' ? '快速选择' : 'Quick',
    custom: language === 'zh' ? '自定义' : 'Custom',
    customDuration: language === 'zh' ? '自定义时长' : 'Custom Duration',
    focusTime: language === 'zh' ? '专注' : 'Focus',
    breakTimeLabel: language === 'zh' ? '休息' : 'Break',
    minutes: language === 'zh' ? '分钟' : 'min',
    apply: language === 'zh' ? '应用' : 'Apply',
    habitSelect: language === 'zh' ? '选择习惯' : 'Select Habit',
    todayProgress: language === 'zh' ? '今日已学' : "Today's",
    dayStreak: language === 'zh' ? '连续' : 'Streak',
    days: language === 'zh' ? '天' : 'days',
    skip: language === 'zh' ? '跳过' : 'Skip',
    continue: language === 'zh' ? '继续' : 'Continue',
  };

  // Multi-track ambient audio handling
  useEffect(() => {
    const audios = ambientAudiosRef.current;

    // Stop and remove tracks that are no longer selected
    audios.forEach((audio, id) => {
      if (!ambientSounds.includes(id)) {
        audio.pause();
        audio.src = '';
        audios.delete(id);
      }
    });

    // Add/update active tracks
    ambientSounds.forEach(id => {
      const sound = AMBIENT_SOUNDS.find(s => s.id === id);
      if (!sound) return;

      let audio = audios.get(id);
      if (!audio) {
        audio = new Audio(sound.url);
        audio.loop = true;
        audios.set(id, audio);
      }

      const vol = soundVolumes[id] ?? 0.7;
      audio.volume = soundEnabled ? vol : 0;

      if (activeSession.isRunning && soundEnabled) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    });

    return () => {
      audios.forEach(audio => audio.pause());
    };
  }, [ambientSounds, soundVolumes, activeSession.isRunning, soundEnabled]);

  const playCompletionSound = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const ctx = audioRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  }, []);

  useEffect(() => {
    if (lastTimeRef.current === 1 && activeSession.remainingTime === 0) {
      if (soundEnabled) {
        playCompletionSound();
      }
      recordSession(true);
    }
    lastTimeRef.current = activeSession.remainingTime;
  }, [activeSession.remainingTime, soundEnabled, playCompletionSound, recordSession]);

  const progress = activeSession.totalDuration > 0
    ? (activeSession.totalDuration - activeSession.remainingTime) / activeSession.totalDuration
    : 0;
  
  const strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - progress);
  const strokeDashoffsetLg = CIRCLE_CIRCUMFERENCE_LG * (1 - progress);

  const isBreakMode = activeSession.mode === 'break';
  const activeHabit = habits.find(h => h.id === activeSession.habitId);

  const getHabitName = (habit: typeof habits[0]) => {
    return language === 'zh' ? habit.name : (habit.nameEn || habit.name);
  };

  const getPresetName = (preset: typeof presets[0]) => {
    return language === 'zh' ? preset.name : (preset.nameEn || preset.name);
  };

  const displayModeName = isBreakMode ? t.breakTime : (activeHabit ? getHabitName(activeHabit) : t.focusMode);

  const weeklyData = getWeeklyData();
  const todayMinutes = weeklyData[6]?.minutes || 0;

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Mode Indicator */}
      <div className="text-center">
        <span
          className={`inline-block px-6 py-2 rounded-full text-sm font-bold ${
            isBreakMode
              ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
              : 'bg-primary text-[hsl(var(--primary-foreground))]'
          }`}
        >
          {displayModeName}
        </span>
      </div>

      {/* Timer Circle */}
      <div className="flex justify-center py-4">
        <div className="relative">
          {/* Mobile View Circle */}
          <svg width="260" height="260" className="transform -rotate-90 lg:hidden">
            <circle
              cx="130"
              cy="130"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-border"
            />
            <circle
              cx="130"
              cy="130"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ${
                isBreakMode ? 'text-[hsl(var(--accent))]' : 'text-primary'
              }`}
            />
          </svg>

          {/* Desktop View Circle */}
          <svg width="320" height="320" className="transform -rotate-90 hidden lg:block">
            <circle
              cx="160"
              cy="160"
              r={CIRCLE_RADIUS_LG}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-border"
            />
            <circle
              cx="160"
              cy="160"
              r={CIRCLE_RADIUS_LG}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCLE_CIRCUMFERENCE_LG}
              strokeDashoffset={strokeDashoffsetLg}
              className={`transition-all duration-1000 ${
                isBreakMode ? 'text-[hsl(var(--accent))]' : 'text-primary'
              }`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl lg:text-6xl font-bold tabular-nums text-foreground">
              {formatTime(activeSession.remainingTime)}
            </span>
            <span className="text-sm lg:text-sm text-muted-foreground mt-2 font-medium">
              {t.session} {(activeSession.sessionsCompleted + 1)}
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {!activeSession.isRunning ? (
          <Button
            size="lg"
            onClick={startTimer}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary hover:bg-primary opacity-90 btn-press shadow-lg"
          >
            <Play className="w-7 h-7 lg:w-9 lg:h-9" />
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            onClick={pauseTimer}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 btn-press"
          >
            <Pause className="w-7 h-7 lg:w-9 lg:h-9" />
          </Button>
        )}
        
        <Button
          size="lg"
          variant="outline"
          onClick={resetTimer}
          className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 btn-press"
        >
          <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6" />
        </Button>

        {!isBreakMode && activeSession.remainingTime > 0 && (
          <Button
            size="lg"
            variant="outline"
            onClick={skipToBreak}
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 btn-press"
            title={t.skip}
          >
            <SkipForward className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>
        )}

        {isBreakMode && (
          <Button
            size="lg"
            variant="outline"
            onClick={skipBreak}
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 btn-press"
            title={t.continue}
          >
            <Coffee className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>
        )}
      </div>

      {/* Ambient Sound Selection */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.ambientTitle}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`h-7 text-[10px] gap-1.5 px-3 rounded-full transition-all border-2 ${
              soundEnabled 
                ? 'text-primary border-primary/20 bg-primary/5' 
                : 'text-muted-foreground border-border bg-muted/30'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="font-bold uppercase tracking-wider">{soundEnabled ? t.soundOn : t.soundOff}</span>
          </Button>
        </div>

        {/* Sound grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
          {AMBIENT_SOUNDS.map((sound) => {
            const Icon = sound.icon;
            const isActive = ambientSounds.includes(sound.id);
            return (
              <button
                key={sound.id}
                onClick={() => toggleAmbientSound(sound.id)}
                title={language === 'zh' ? sound.nameZh : sound.name}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all btn-press
                  ${isActive 
                    ? 'border-primary bg-primary/10 text-primary shadow-sm' 
                    : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/30'
                  }
                `}
              >
                <Icon className={`w-4 h-4 mb-1 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-[8px] font-bold truncate w-full text-center">{language === 'zh' ? sound.nameZh : sound.name}</span>
              </button>
            );
          })}
        </div>

        {/* Volume sliders for active sounds */}
        {ambientSounds.length > 0 && soundEnabled && (
          <div className="space-y-2 pt-1">
            {ambientSounds.map(id => {
              const sound = AMBIENT_SOUNDS.find(s => s.id === id);
              if (!sound) return null;
              const Icon = sound.icon;
              const vol = soundVolumes[id] ?? 0.7;
              return (
                <div key={id} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-[9px] font-bold text-muted-foreground w-14 truncate">
                    {language === 'zh' ? sound.nameZh : sound.name}
                  </span>
                  <Slider
                    value={[Math.round(vol * 100)]}
                    onValueChange={([v]) => setAmbientVolume(id, v / 100)}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3"
                  />
                  <span className="text-[9px] text-muted-foreground w-6 text-right">{Math.round(vol * 100)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Presets */}
      <Card className="p-4 lg:p-5 bg-card border-border shadow-sm">
        <h3 className="text-xs lg:text-[10px] font-bold mb-4 text-muted-foreground uppercase tracking-widest">{t.quickSelect}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {presets.map(preset => (
            <Button
              key={preset.id}
              variant={activeSession.presetId === preset.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                selectPreset(preset.id);
                setShowCustom(false);
              }}
              className={`text-xs py-3 h-auto flex flex-col gap-0.5 rounded-2xl btn-press ${
                activeSession.presetId === preset.id 
                  ? 'bg-primary text-[hsl(var(--primary-foreground))] shadow-md' 
                  : 'border-2'
              }`}
            >
              <span className="font-bold text-[11px] lg:text-xs text-center leading-tight">{getPresetName(preset)}</span>
              <span className="text-[10px] opacity-70 font-medium">{preset.workDuration / 60}{t.minutes}</span>
            </Button>
          ))}
          <Button
            variant={showCustom ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowCustom(!showCustom)}
            className={`text-xs py-3 h-auto flex flex-col gap-0.5 rounded-2xl btn-press border-2 ${
              showCustom 
                ? 'bg-primary text-[hsl(var(--primary-foreground))] shadow-md' 
                : ''
            }`}
          >
            <Plus className="w-4 h-4 mx-auto" />
            <span className="text-[10px] lg:text-[11px] font-bold">{t.custom}</span>
          </Button>
        </div>
      </Card>

      {/* Custom Duration Panel */}
      {showCustom && (
        <Card className="p-3 bg-card border-border">
          <h3 className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wide">{t.customDuration}</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{t.focusTime}</span>
                <span className="font-semibold">{customMinutes} {t.minutes}</span>
              </div>
              <Slider
                value={[customMinutes]}
                onValueChange={(v) => setCustomMinutes(v[0])}
                min={1}
                max={120}
                step={1}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{t.breakTimeLabel}</span>
                <span className="font-semibold">{breakMinutes} {t.minutes}</span>
              </div>
              <Slider
                value={[breakMinutes]}
                onValueChange={(v) => setBreakMinutes(v[0])}
                min={1}
                max={30}
                step={1}
                className="[&_[role=slider]]:bg-[hsl(var(--accent))] [&_[role=slider]]:border-[hsl(var(--accent))]"
              />
            </div>
            <Button
              size="sm"
              className="w-full rounded-lg bg-primary hover:bg-primary opacity-90 btn-press"
              onClick={() => {
                setCustomDuration(customMinutes);
                setBreakDuration(breakMinutes);
                updateCustomConfig({
                  totalDuration: customMinutes * 60,
                  breakDuration: breakMinutes * 60,
                });
              }}
            >
              {t.apply}
            </Button>
          </div>
        </Card>
      )}

      {/* Habit Selector */}
      <Card className="p-3 flex-1 overflow-hidden bg-card border-border">
        <h3 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">{t.habitSelect}</h3>
        <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
          {habits.map(habit => (
            <div
              key={habit.id}
              onClick={() => selectHabit(habit.id)}
              className={`
                p-2.5 rounded-xl border-2 cursor-pointer transition-all
                ${activeSession.habitId === habit.id
                  ? 'bg-[hsl(var(--accent))]/20 border-[hsl(var(--accent))]'
                  : 'border-transparent hover:bg-[hsl(var(--muted))]/50'
                }
              `}
              style={{ borderLeftColor: habit.color, borderLeftWidth: '4px' }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs truncate">{getHabitName(habit)}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {habit.duration / 60} {t.minutes}
                  </div>
                </div>
                {activeSession.habitId === habit.id && (
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: habit.color }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Today's Progress */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-card rounded-xl p-2.5 text-center border border-border">
          <div className="text-lg font-bold text-primary">{Math.floor(todayMinutes)}</div>
          <div className="text-[10px] text-muted-foreground">{t.todayProgress}({t.minutes})</div>
        </div>
        <div className="bg-card rounded-xl p-2.5 text-center border border-border">
          <div className="text-lg font-bold text-primary">{activeSession.sessionsCompleted}</div>
          <div className="text-[10px] text-muted-foreground">{language === 'zh' ? '完成' : 'Done'}({t.session})</div>
        </div>
        <div className="bg-card rounded-xl p-2.5 text-center border border-border">
          <div className="text-lg font-bold text-[hsl(var(--accent))]">{stats.currentStreak || 0}</div>
          <div className="text-[10px] text-muted-foreground">{t.dayStreak}({t.days})</div>
        </div>
      </div>
    </div>
  );
}


