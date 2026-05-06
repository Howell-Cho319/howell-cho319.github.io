'use client';

import { useState } from 'react';
import { useFocusFlow } from '../../lib/FocusFlow/store';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Play,
  Pause,
  Plus,
  Pencil,
  Trash2,
  Clock,
  BookOpen,
  Coffee,
  Heart,
  Brain,
  Dumbbell,
  Moon,
  Waves,
  RotateCcw,
} from 'lucide-react';

const PRESET_ICONS = [
  { id: 'book', icon: BookOpen, label: 'Study', labelZh: '学习' },
  { id: 'coffee', icon: Coffee, label: 'Rest', labelZh: '休息' },
  { id: 'heart', icon: Heart, label: 'Health', labelZh: '健康' },
  { id: 'brain', icon: Brain, label: 'Think', labelZh: '思考' },
  { id: 'dumbbell', icon: Dumbbell, label: 'Exercise', labelZh: '运动' },
  { id: 'moon', icon: Moon, label: 'Sleep', labelZh: '睡眠' },
  { id: 'walk', icon: Waves, label: 'Walk', labelZh: '散步' },
];

const PRESET_COLORS = [
  '#8A5F41', '#A77F60', '#22c55e', '#06b6d4', '#3b82f6',
  '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#f43f5e',
];

export function Schedule() {
  const { 
    state, 
    addHabit, 
    updateHabit, 
    deleteHabit, 
    toggleHabit, 
    selectHabit, 
    getTodayData,
    startTimer,
    pauseTimer,
    resetAllHabits,
  } = useFocusFlow();
  const { habits, activeSession, language } = state;
  const todayData = getTodayData();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    icon: 'book',
    color: PRESET_COLORS[0],
    duration: 25,
    isBreak: false,
  });

  const t = {
    title: language === 'zh' ? '习惯计划' : 'Habits',
    activeHabits: language === 'zh' ? '个活跃习惯' : 'active',
    minutes: language === 'zh' ? '分钟' : 'min',
    add: language === 'zh' ? '添加' : 'Add',
    todayPlan: language === 'zh' ? '今日习惯' : "Today's Habits",
    noHabits: language === 'zh' ? '还没有添加习惯' : 'No habits yet',
    addFirst: language === 'zh' ? '添加第一个习惯' : 'Add your first habit',
    focus: language === 'zh' ? '专注' : 'Focus',
    rest: language === 'zh' ? '休息' : 'Rest',
    allHabits: language === 'zh' ? '全部习惯' : 'All Habits',
    editHabit: language === 'zh' ? '编辑习惯' : 'Edit Habit',
    addHabit: language === 'zh' ? '添加新习惯' : 'Add Habit',
    habitName: language === 'zh' ? '中文名称' : 'Name (CN)',
    habitNameEn: language === 'zh' ? '英文名称' : 'Name (EN)',
    placeholder: language === 'zh' ? '例如：喝水时间' : 'e.g. Water Break',
    placeholderEn: language === 'zh' ? '例如：Water Break' : 'e.g. Water Break',
    icon: language === 'zh' ? '图标' : 'Icon',
    color: language === 'zh' ? '颜色' : 'Color',
    duration: language === 'zh' ? '时长' : 'Duration',
    type: language === 'zh' ? '类型' : 'Type',
    focusType: language === 'zh' ? '专注时段' : 'Focus',
    breakType: language === 'zh' ? '休息时段' : 'Break',
    save: language === 'zh' ? '保存' : 'Save',
    cancel: language === 'zh' ? '取消' : 'Cancel',
    confirmDelete: language === 'zh' ? '确认删除' : 'Delete?',
    deleteMsg: language === 'zh' ? '确定要删除这个习惯吗？' : 'Delete this habit?',
    delete: language === 'zh' ? '删除' : 'Delete',
    restartAll: language === 'zh' ? '重置全部' : 'Restart All',
  };

  const openAddDialog = () => {
    setFormData({
      name: '',
      nameEn: '',
      icon: 'book',
      color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)],
      duration: 25,
      isBreak: false,
    });
    setEditingHabit(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    setFormData({
      name: habit.name,
      nameEn: habit.nameEn || '',
      icon: habit.icon,
      color: habit.color,
      duration: habit.duration / 60,
      isBreak: habit.isBreak,
    });
    setEditingHabit(habitId);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() && !formData.nameEn.trim()) return;

    const habitData = {
      name: formData.name || formData.nameEn,
      nameEn: formData.nameEn || formData.name,
      icon: formData.icon,
      color: formData.color,
      duration: formData.duration * 60,
      isBreak: formData.isBreak,
      isActive: true,
    };

    if (editingHabit) {
      updateHabit(editingHabit, habitData);
    } else {
      addHabit(habitData);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (editingHabit) {
      deleteHabit(editingHabit);
      setIsDialogOpen(false);
    }
  };

  const getHabitName = (habit: typeof habits[0]) => {
    return language === 'zh' ? habit.name : (habit.nameEn || habit.name);
  };

  const activeHabits = habits.filter(h => h.isActive);
  const totalActiveMinutes = activeHabits.reduce((sum, h) => sum + h.duration / 60, 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">{t.title}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-bold text-primary">{activeHabits.length}</span> {t.activeHabits} · <span className="font-bold text-primary">{Math.floor(totalActiveMinutes)}</span> {t.minutes}
          </p>
        </div>
        <div className="flex gap-2">
          {activeHabits.length > 0 && (
            <Button
              variant="outline"
              size="default"
              onClick={resetAllHabits}
              className="border-2 rounded-full px-4 sm:px-6 py-2 flex items-center gap-2 btn-press"
            >
              <RotateCcw className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="hidden sm:inline">{t.restartAll}</span>
            </Button>
          )}
          <Button 
            size="default" 
            onClick={openAddDialog}
            className="bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-white font-bold px-4 sm:px-6 py-2 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border-0"
          >
            <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="hidden sm:inline">{t.add}</span>
          </Button>
        </div>
      </div>

      {/* Active Habits Timeline */}
      <Card className="p-4 sm:p-6 bg-card border-border shadow-sm rounded-2xl">
        <h3 className="text-xs font-bold mb-4 sm:mb-6 flex items-center text-muted-foreground uppercase tracking-widest">
          <Clock className="w-4 h-4 mr-2" />
          {t.todayPlan}
        </h3>
        
        <div className="space-y-3 sm:space-y-4 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '520px' }}>
          {activeHabits.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-muted/20 rounded-3xl border-2 border-dashed border-border">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Clock className="w-10 h-10 opacity-30" />
              </div>
              <p className="text-sm font-medium mb-4">{t.noHabits}</p>
              <Button 
                variant="outline" 
                size="default" 
                onClick={openAddDialog}
                className="border-2 rounded-full px-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.addFirst}
              </Button>
            </div>
          ) : (
            activeHabits.map((habit, index) => {
              const IconComponent = PRESET_ICONS.find(p => p.id === habit.icon)?.icon || Clock;
              const isCurrentHabit = activeSession.habitId === habit.id;
              
              return (
                <div
                  key={habit.id}
                  className={`
                    relative p-3 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer card-hover
                    ${isCurrentHabit
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:bg-muted/30'
                    }
                  `}
                  style={{ borderLeftColor: habit.color, borderLeftWidth: '4px' }}
                >
                  {index < activeHabits.length - 1 && (
                    <div
                      className="absolute left-[2rem] sm:left-[2.25rem] top-full w-0.5 h-4 -translate-x-1/2 rounded-full"
                      style={{ backgroundColor: habit.color, opacity: 0.3 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: `${habit.color}20` }}
                    >
                      <IconComponent
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        style={{ color: habit.color }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base sm:text-lg truncate text-foreground">{getHabitName(habit)}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium flex items-center gap-2">
                        <span>{habit.duration / 60} {t.minutes}</span>
                        <span className="opacity-30">|</span>
                        <span className={habit.isBreak ? 'text-accent-foreground' : 'text-primary'}>{habit.isBreak ? t.rest : t.focus}</span>
                      </div>
                      
                      {/* Today's Progress */}
                      <div className="mt-2 sm:mt-3">
                        <div className="flex justify-between text-[10px] mb-1 font-bold">
                          <span className="text-muted-foreground uppercase tracking-wider">{language === 'zh' ? '今日完成' : "Today's Progress"}</span>
                          <span className="text-primary">{todayData.habits[habit.id] || 0} / {habit.duration / 60} {t.minutes}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-1000"
                            style={{ 
                              width: `${Math.min(((todayData.habits[habit.id] || 0) / (habit.duration / 60)) * 100, 100)}%`,
                              backgroundColor: habit.color 
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                      {isCurrentHabit ? (
                        <Button
                          size="icon"
                          className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl btn-press shadow-sm"
                          style={{ backgroundColor: habit.color }}
                          onClick={() => {
                            if (activeSession.isRunning) {
                              pauseTimer();
                            } else {
                              // If it's the current habit but the duration is wrong, re-select and refresh
                              if (activeSession.totalDuration !== habit.duration) {
                                selectHabit(habit.id);
                                setTimeout(() => window.location.reload(), 50);
                              } else {
                                startTimer();
                              }
                            }
                          }}
                        >
                          {activeSession.isRunning ? (
                            <Pause className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                          ) : (
                            <Play className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                          )}
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 btn-press"
                          onClick={() => {
                            selectHabit(habit.id);
                            setTimeout(() => window.location.reload(), 50);
                          }}
                        >
                          <Play className="w-4 sm:w-5 h-4 sm:h-5" />
                        </Button>
                      )}
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl hover:bg-muted"
                        onClick={() => openEditDialog(habit.id)}
                      >
                        <Pencil className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setEditingHabit(habit.id);
                          setFormData({
                            name: habit.name,
                            nameEn: habit.nameEn || '',
                            icon: habit.icon,
                            color: habit.color,
                            duration: habit.duration / 60,
                            isBreak: habit.isBreak,
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* All Habits Preview */}
      {habits.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs lg:text-[10px] font-bold text-muted-foreground mb-3 uppercase tracking-widest">{t.allHabits}</h4>
          <div className="flex flex-wrap gap-2">
            {habits.map(habit => {
              const IconComponent = PRESET_ICONS.find(p => p.id === habit.icon)?.icon || Clock;
              return (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-full text-xs lg:text-[11px] transition-all border-2 font-bold
                    ${habit.isActive
                      ? 'border-border shadow-sm'
                      : 'border-dashed opacity-40 grayscale'
                    }
                  `}
                  style={{
                    backgroundColor: habit.isActive ? `${habit.color}15` : 'transparent',
                    color: habit.isActive ? habit.color : 'inherit',
                  }}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[100px]">{getHabitName(habit)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add/Edit Dialog - Solid Background */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border p-0">
          <DialogHeader className="border-b border-border pb-4 pt-5 px-5">
            <DialogTitle className="text-lg font-bold">
              {editingHabit ? t.editHabit : t.addHabit}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5 py-5 px-5">
            {/* Name Chinese */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.habitName}
              </label>
              <Input
                placeholder={t.placeholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            {/* Name English */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.habitNameEn}
              </label>
              <Input
                placeholder={t.placeholderEn}
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            {/* Icon */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.icon}
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_ICONS.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setFormData({ ...formData, icon: id })}
                    className={`
                      p-2.5 rounded-xl border-2 transition-all
                      ${formData.icon === id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground bg-background'
                      }
                    `}
                    title={language === 'zh' ? label : label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.color}
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`
                      w-9 h-9 rounded-full transition-all border-2 btn-press
                      ${formData.color === color ? 'ring-2 ring-offset-2 ring-primary' : 'border-transparent hover:scale-110'}
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.duration}: {formData.duration} {t.minutes}
              </label>
              <Slider
                value={[formData.duration]}
                onValueChange={(v) => setFormData({ ...formData, duration: v[0] })}
                min={1}
                max={120}
                step={1}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
              />
            </div>

            {/* Type Toggle */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.type}
              </label>
              <div className="flex gap-2">
                <Button
                  variant={!formData.isBreak ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, isBreak: false })}
                  className={`flex-1 rounded-lg border-2 ${!formData.isBreak ? 'bg-primary border-primary text-white' : 'border-border bg-transparent text-muted-foreground'}`}
                >
                  {t.focusType}
                </Button>
                <Button
                  variant={formData.isBreak ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, isBreak: true })}
                  className={`flex-1 rounded-lg border-2 ${formData.isBreak ? 'bg-primary border-primary text-white' : 'border-border bg-transparent text-muted-foreground'}`}
                >
                  {t.breakType}
                </Button>
              </div>
            </div>
          </div>

          {/* Dialog Footer */}
          <div className="flex items-center justify-between border-t border-border px-5 py-4">
            {editingHabit ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="rounded-lg"
              >
                {t.delete}
              </Button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-lg border-2"
              >
                {t.cancel}
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="rounded-lg bg-primary hover:bg-primary opacity-90"
              >
                {t.save}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


