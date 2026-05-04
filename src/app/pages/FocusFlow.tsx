'use client';

import { useState, useEffect } from 'react';
import { useFocusFlow, FocusFlowProvider } from '../lib/FocusFlow/store';
import { Timer } from '../components/FocusFlow/timer';
import { Schedule } from '../components/FocusFlow/schedule';
import { Plan } from '../components/FocusFlow/plan';
import { Stats } from '../components/FocusFlow/stats';
import { Button } from '../components/FocusFlow/ui/button';
import { ListChecks, Calendar, TrendingUp, Globe, Info, X, Clock, CheckSquare, BarChart2, Volume2, ChevronRight } from 'lucide-react';

type TabType = 'schedule' | 'plan' | 'stats';

const TABS: { id: TabType; icon: typeof ListChecks; label: string; labelZh: string }[] = [
  { id: 'schedule', icon: ListChecks, label: 'Habits', labelZh: '习惯' },
  { id: 'plan', icon: Calendar, label: 'Plan', labelZh: '计划' },
  { id: 'stats', icon: TrendingUp, label: 'Today', labelZh: '今日' },
];

const TUTORIAL_STEPS = [
  {
    icon: Clock,
    color: 'text-primary',
    bg: 'bg-primary/10',
    title: 'Timer',
    titleZh: '计时器',
    steps: [
      'Pick a preset (Pomodoro, Deep Work…) or set a custom duration.',
      'Press ▶ to start. The ring fills as time passes.',
      'Use ↺ to reset or ⏭ to skip to break.',
      'Select a Habit below the presets to track specific activities.',
    ],
    stepsZh: [
      '选择预设（番茄钟、深度工作…）或自定义时长。',
      '按 ▶ 开始，圆环随时间填充。',
      '按 ↺ 重置，或 ⏭ 跳至休息。',
      '在预设下方选择习惯以追踪具体活动。',
    ],
  },
  {
    icon: Volume2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    title: 'Ambient Sound',
    titleZh: '环境音',
    steps: [
      'Tap any sound tile to activate it — multiple sounds can play together.',
      'A volume slider appears for each active sound.',
      'Toggle the SOUND button to mute/unmute all at once.',
      'Sounds only play while the timer is running.',
    ],
    stepsZh: [
      '点击音效卡片激活，多个音效可同时播放。',
      '每个激活的音效下方会出现音量滑块。',
      '点击 SOUND 按钮一键静音/取消静音。',
      '音效仅在计时器运行时播放。',
    ],
  },
  {
    icon: ListChecks,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    title: 'Habits',
    titleZh: '习惯',
    steps: [
      'Add habits with a name, icon, color, duration and type (Focus/Break).',
      'Press ▶ on a habit card to start that habit\'s timer immediately.',
      'Toggle habits on/off in the "All Habits" row at the bottom.',
      'Today\'s progress bar shows how many minutes you\'ve spent on each habit.',
    ],
    stepsZh: [
      '添加习惯：设置名称、图标、颜色、时长和类型（专注/休息）。',
      '点击习惯卡片上的 ▶ 立即开始该习惯的计时。',
      '在底部"全部习惯"行中切换习惯的启用状态。',
      '今日进度条显示每个习惯已完成的分钟数。',
    ],
  },
  {
    icon: CheckSquare,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    title: 'Plan',
    titleZh: '计划',
    steps: [
      'Add tasks for today with a title, time, duration and color.',
      'Tap the circle ○ on a task to mark it done.',
      'Progress bar at the top shows how many tasks are completed.',
      'Plans reset each day — start fresh every morning.',
    ],
    stepsZh: [
      '为今天添加任务：设置标题、时间、时长和颜色。',
      '点击任务左侧的圆圈 ○ 标记完成。',
      '顶部进度条显示已完成任务数量。',
      '计划每天重置，每天早上重新开始。',
    ],
  },
  {
    icon: BarChart2,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    title: 'Today',
    titleZh: '今日',
    steps: [
      'Score card shows your daily focus score (0–100) based on minutes, sessions and challenges.',
      'Minutes / Sessions / Streak update automatically as you complete timers.',
      'This Week bar chart shows your daily focus minutes for the past 7 days.',
      'Complete all 4 daily challenges to earn bonus points.',
    ],
    stepsZh: [
      '评分卡显示今日专注评分（0–100），基于时长、次数和挑战。',
      '分钟/次数/连续天数在完成计时后自动更新。',
      '本周图表显示过去7天每日专注分钟数。',
      '完成全部4个每日挑战以获得额外积分。',
    ],
  },
];

function TutorialModal({ onClose, language }: { onClose: () => void; language: string }) {
  const [step, setStep] = useState(0);
  const current = TUTORIAL_STEPS[step];
  const Icon = current.icon;
  const isZh = language === 'zh';
  const isLast = step === TUTORIAL_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm text-foreground">
              {isZh ? '使用指南' : 'How to Use FocusFlow'}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-1.5 pt-4 px-6">
          {TUTORIAL_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-primary' : 'w-1.5 bg-border hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className={`w-12 h-12 rounded-2xl ${current.bg} flex items-center justify-center mb-4`}>
            <Icon className={`w-6 h-6 ${current.color}`} />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-4">
            {isZh ? current.titleZh : current.title}
          </h2>
          <ol className="space-y-3">
            {(isZh ? current.stepsZh : current.steps).map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/80">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 pb-5">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            className={`text-xs font-bold text-muted-foreground hover:text-foreground transition-colors ${step === 0 ? 'invisible' : ''}`}
          >
            {isZh ? '上一步' : 'Back'}
          </button>
          <span className="text-[11px] text-muted-foreground">{step + 1} / {TUTORIAL_STEPS.length}</span>
          {isLast ? (
            <button
              onClick={onClose}
              className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {isZh ? '开始使用 🎉' : 'Got it 🎉'}
            </button>
          ) : (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {isZh ? '下一步' : 'Next'} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function FocusFlow() {
  return (
    <FocusFlowProvider>
      <FocusFlowInner />
    </FocusFlowProvider>
  );
}

function FocusFlowInner() {
  const { state, setLanguage } = useFocusFlow();
  const { language } = state;
  const [activeTab, setActiveTab] = useState<TabType>('schedule');
  const [mounted, setMounted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background flex flex-col">
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} language={language} />}

      {/* Page Top Bar */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-4 pb-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: spacer for centering */}
        <div className="w-24 sm:w-36 flex-shrink-0" />

        {/* Desktop Tab Navigation — centered */}
        <div className="hidden lg:flex items-center gap-1 p-1 bg-muted/30 rounded-2xl border border-border/50 mx-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 xl:px-5 py-2 rounded-xl transition-all font-bold text-sm
                  ${isActive
                    ? 'bg-card text-primary shadow-sm ring-1 ring-border/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className="hidden xl:inline">{language === 'zh' ? tab.labelZh : tab.label}</span>
                <span className="xl:hidden">{language === 'zh' ? tab.labelZh : tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile: title */}
        <div className="lg:hidden text-center">
          <h1 className="text-lg font-bold text-foreground">FocusFlow</h1>
          <p className="text-[10px] text-muted-foreground">
            {language === 'zh' ? '专注 · 学习 · 成长' : 'Focus · Learn · Grow'}
          </p>
        </div>

        {/* Right: info + language toggle */}
        <div className="w-24 sm:w-36 flex-shrink-0 flex items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={() => setShowTutorial(true)}
            className="group relative h-8 sm:h-9 px-2 sm:px-3 rounded-full border-2 border-border bg-card hover:border-primary/40 hover:bg-primary/5 flex items-center gap-1 sm:gap-1.5 transition-all btn-press"
            title={language === 'zh' ? '使用指南' : 'How to use'}
          >
            <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-primary/15 group-hover:bg-primary/25 flex items-center justify-center transition-colors flex-shrink-0">
              <Info className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-primary" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors hidden sm:inline">
              {language === 'zh' ? '指南' : 'Guide'}
            </span>
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="rounded-full border-2 px-2 sm:px-3 h-8 sm:h-9 btn-press"
          >
            <Globe className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-1.5" />
            <span className="text-[10px] sm:text-xs font-medium">{language === 'zh' ? 'EN' : '中文'}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-4 py-4 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Desktop Timer Sidebar */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 space-y-6">
            <div className="sticky top-6">
              <Timer />
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-6 flex flex-col min-w-0">
            {/* Mobile: always show timer above tabs */}
            <div className="lg:hidden">
              <Timer />
            </div>

            <div className="min-w-0">
              {activeTab === 'schedule' && <Schedule />}
              {activeTab === 'plan' && <Plan />}
              {activeTab === 'stats' && <Stats />}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border safe-area-bottom lg:hidden">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-around py-2 px-2 sm:px-4">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex flex-col items-center justify-center px-2 sm:px-4 py-2 rounded-xl transition-all btn-press min-w-[56px] sm:min-w-[64px]
                    ${isActive ? 'text-primary' : 'text-muted-foreground'}
                  `}
                >
                  <div className={`p-1.5 sm:p-2 rounded-xl transition-all ${isActive ? 'bg-primary/10' : ''}`}>
                    <Icon className={`w-4 sm:w-5 h-4 sm:h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-semibold mt-0.5 sm:mt-1 ${isActive ? '' : 'opacity-80'}`}>
                    {language === 'zh' ? tab.labelZh : tab.label}
                  </span>
                  {isActive && <div className="w-1 h-1 rounded-full bg-primary mt-0.5 sm:mt-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
