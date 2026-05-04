'use client';

import { useFocusFlow } from '../../lib/FocusFlow/store';
import { Card } from './ui/card';
import {
  Trophy,
  Target,
  Clock,
  Flame,
  LayoutGrid,
  CheckCircle2,
  Star,
  TrendingUp,
} from 'lucide-react';

export function Stats() {
  const { state, getTodayData, getWeeklyData } = useFocusFlow();
  const { language, stats, activeSession } = state;
  
  const todayData = getTodayData();
  const weeklyData = getWeeklyData();
  
  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 1);
  
  const t = {
    title: language === 'zh' ? '今日表现' : "Today",
    todayScore: language === 'zh' ? '专注评分' : 'Score',
    completed: language === 'zh' ? '已完成' : 'Done',
    totalMinutes: language === 'zh' ? '学习时长' : 'Minutes',
    sessions: language === 'zh' ? '专注次数' : 'Sessions',
    streak: language === 'zh' ? '连续' : 'Streak',
    weekProgress: language === 'zh' ? '本周进度' : 'This Week',
    dailyChallenges: language === 'zh' ? '今日挑战' : 'Challenges',
    noChallenges: language === 'zh' ? '暂无挑战' : 'No challenges',
    challengesComplete: language === 'zh' ? '挑战完成' : 'Done',
    points: language === 'zh' ? '分' : 'pts',
    keepGoing: language === 'zh' ? '继续加油！' : 'Keep going!',
    greatJob: language === 'zh' ? '太棒了！' : 'Great job!',
    inProgress: language === 'zh' ? '进行中' : 'in progress',
    minutes: language === 'zh' ? '分钟' : 'min',
    days: language === 'zh' ? '天' : 'days',
  };

  // Calculate today's score (0-100)
  const calculateScore = () => {
    const targetMinutes = 120; // Target 2 hours per day
    const minutesScore = Math.min((todayData.totalMinutes / targetMinutes) * 50, 50);
    const sessionsScore = Math.min((todayData.sessionsCompleted / 4) * 30, 30);
    const challengeScore = todayData.challenges.filter(c => c.completed).length * 5;
    return Math.min(Math.round(minutesScore + sessionsScore + challengeScore), 100);
  };

  const score = calculateScore();
  const completedChallenges = todayData.challenges.filter(c => c.completed).length;
  const totalChallenges = todayData.challenges.length;

  // Get score color based on value
  const getScoreColor = () => {
    if (score >= 80) return 'from-[#22c55e] to-[#16a34a]';
    if (score >= 60) return 'from-[#8A5F41] to-[#A77F60]';
    if (score >= 40) return 'from-[#f97316] to-[#ea580c]';
    return 'from-[#6b7280] to-[#4b5563]';
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto gap-4">
      {/* Header */}
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-foreground">{t.title}</h2>
        <p className="text-xs lg:text-xs text-muted-foreground mt-1">
          {new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Score Card */}
      <Card className={`p-6 lg:p-8 bg-gradient-to-br ${getScoreColor()} text-white border-0 shadow-lg rounded-3xl`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm lg:text-base opacity-90 font-medium">{t.todayScore}</p>
            <p className="text-5xl lg:text-6xl font-bold my-2">{score}</p>
            <p className="text-xs lg:text-sm opacity-80 font-medium">
              {score >= 80 ? t.greatJob : t.keepGoing}
            </p>
          </div>
          <div className="relative w-24 h-24 lg:w-32 lg:h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx={score >= 80 ? "20" : "20"} // Just placeholders, fixing the SVG logic
                className="hidden" // Hiding old svg to replace with responsive one
              />
            </svg>
            {/* Responsive SVG */}
            <svg className="w-full h-full transform -rotate-90 absolute inset-0">
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="10"
              />
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="264"
                strokeDashoffset={264 - (score * 2.64)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="w-10 h-10 lg:w-14 lg:h-14 fill-current" />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 lg:p-5 text-center bg-card border-border shadow-sm rounded-2xl">
          <Clock className="w-6 h-6 lg:w-7 lg:h-7 mx-auto mb-2 text-primary" />
          <p className="text-2xl lg:text-3xl font-bold text-foreground">{Math.floor(todayData.totalMinutes)}</p>
          <p className="text-[10px] lg:text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{t.totalMinutes}</p>
        </Card>
        <Card className="p-4 lg:p-5 text-center bg-card border-border shadow-sm rounded-2xl">
          <Target className="w-6 h-6 lg:w-7 lg:h-7 mx-auto mb-2 text-[hsl(var(--accent))]" />
          <p className="text-2xl lg:text-3xl font-bold text-foreground">{todayData.sessionsCompleted}</p>
          <p className="text-[10px] lg:text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{t.sessions}</p>
        </Card>
        <Card className="p-4 lg:p-5 text-center bg-card border-border shadow-sm rounded-2xl">
          <Flame className="w-6 h-6 lg:w-7 lg:h-7 mx-auto mb-2 text-orange-500" />
          <p className="text-2xl lg:text-3xl font-bold text-foreground">{stats.currentStreak || 0}</p>
          <p className="text-[10px] lg:text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{t.streak}</p>
        </Card>
      </div>

      {/* Weekly Chart */}
      <Card className="p-6 lg:p-6 bg-card border-border shadow-sm rounded-2xl">
        <h3 className="text-xs lg:text-xs font-bold mb-6 flex items-center text-muted-foreground uppercase tracking-widest">
          <TrendingUp className="w-4 h-4 lg:w-4 lg:h-4 mr-2" />
          {t.weekProgress}
        </h3>
        <div className="flex items-end justify-between gap-2 lg:gap-3" style={{ height: '140px' }}>
          {weeklyData.map((data, i) => {
            const heightPercent = maxMinutes > 0 ? (data.minutes / maxMinutes) * 100 : 0;
            const barHeight = data.minutes > 0 ? Math.max(heightPercent, 6) : 0;
            const isToday = i === weeklyData.length - 1;

            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full flex flex-col justify-end" style={{ height: 'calc(100% - 28px)' }}>
                  {data.minutes > 0 ? (
                    <div
                      className={`w-full rounded-t-xl transition-all duration-700 ${
                        isToday ? 'bg-primary shadow-sm' : 'bg-[hsl(var(--accent))]/60'
                      }`}
                      style={{ height: `${barHeight}%` }}
                    />
                  ) : (
                    <div
                      className={`w-full rounded-t-xl ${
                        isToday ? 'bg-primary/20' : 'bg-muted/40'
                      }`}
                      style={{ height: '4px' }}
                    />
                  )}
                </div>
                <span className="text-[10px] mt-2 text-muted-foreground font-bold">{data.day}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Daily Challenges */}
      <Card className="p-6 lg:p-8 bg-card border-border shadow-md rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs lg:text-sm font-bold flex items-center text-muted-foreground uppercase tracking-widest">
            <Trophy className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            {t.dailyChallenges}
          </h3>
          <span className="text-[10px] lg:text-xs text-muted-foreground font-bold bg-muted/50 px-3 py-1 rounded-full">
            {completedChallenges}/{totalChallenges} {t.challengesComplete}
          </span>
        </div>
        
        {todayData.challenges.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">{t.noChallenges}</p>
        ) : (
          <div className="space-y-4">
            {todayData.challenges.map((challenge) => {
              const IconComponent = {
                target: Target,
                clock: Clock,
                layers: LayoutGrid,
                flame: Flame,
              }[challenge.icon] || Star;
              
              const progress = Math.min((challenge.current / challenge.target) * 100, 100);
              
              return (
                <div 
                  key={challenge.id}
                  className={`
                    p-4 lg:p-6 rounded-2xl border-2 transition-all duration-300
                    ${challenge.completed 
                      ? 'bg-accent/10 border-accent/40' 
                      : 'bg-muted/30 border-border hover:border-primary/30'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-14 h-14 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center flex-shrink-0
                      ${challenge.completed 
                        ? 'bg-accent text-accent-foreground shadow-md' 
                        : 'bg-primary/10 text-primary'
                      }
                    `}>
                      {challenge.completed ? (
                        <CheckCircle2 className="w-8 h-8 lg:w-12 lg:h-12" />
                      ) : (
                        <IconComponent className="w-8 h-8 lg:w-12 lg:h-12" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm lg:text-lg text-foreground">
                          {language === 'zh' ? challenge.title : challenge.titleEn}
                        </span>
                        {challenge.completed && (
                          <span className="text-[10px] lg:text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-bold">
                            {t.completed}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] lg:text-sm text-muted-foreground mt-1">
                        {language === 'zh' ? challenge.description : challenge.descriptionEn}
                      </p>
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex-1 h-3 bg-border rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              challenge.completed 
                                ? 'bg-accent' 
                                : 'bg-primary'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs lg:text-sm text-muted-foreground min-w-[48px] text-right font-bold">
                          {challenge.current}/{challenge.target}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0 bg-white/50 dark:bg-black/10 p-2 lg:p-4 rounded-xl">
                      <span className={`
                        text-lg lg:text-2xl font-black
                        ${challenge.completed ? 'text-accent' : 'text-primary'}
                      `}>
                        +{challenge.reward}
                      </span>
                      <p className="text-[10px] lg:text-xs text-muted-foreground font-bold uppercase tracking-tighter">{t.points}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}


