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
  Plus,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  Circle,
  Calendar,
} from 'lucide-react';

const PRESET_COLORS = [
  '#8A5F41', '#A77F60', '#22c55e', '#06b6d4', '#3b82f6',
  '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#f43f5e',
];

export function Plan() {
  const { state, addPlanItem, updatePlanItem, deletePlanItem, togglePlanItem } = useFocusFlow();
  const { language, stats } = state;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    time: '09:00',
    duration: 30,
    color: PRESET_COLORS[0],
  });

  const t = {
    title: language === 'zh' ? '今日计划' : "Today's Plan",
    addPlan: language === 'zh' ? '添加计划' : 'Add',
    editPlan: language === 'zh' ? '编辑计划' : 'Edit Plan',
    planTitle: language === 'zh' ? '计划名称' : 'Plan Title',
    planTitleZh: language === 'zh' ? '中文名称' : 'Title (CN)',
    planTitleEn: language === 'zh' ? '英文名称' : 'Title (EN)',
    time: language === 'zh' ? '开始时间' : 'Time',
    duration: language === 'zh' ? '预计时长' : 'Duration',
    minutes: language === 'zh' ? '分钟' : 'min',
    color: language === 'zh' ? '颜色' : 'Color',
    save: language === 'zh' ? '保存' : 'Save',
    cancel: language === 'zh' ? '取消' : 'Cancel',
    delete: language === 'zh' ? '删除' : 'Delete',
    noPlans: language === 'zh' ? '还没有计划' : 'No plans yet',
    addFirst: language === 'zh' ? '添加第一个计划' : 'Add your first plan',
    completed: language === 'zh' ? '已完成' : 'Done',
    remaining: language === 'zh' ? '剩余' : 'Left',
    allDone: language === 'zh' ? '太棒了，全部完成！' : "All done!",
    startNow: language === 'zh' ? '现在开始' : 'Start',
  };

  // Get today's plan items
  const today = new Date().toISOString().split('T')[0];
  const todayPerf = stats.dailyPerformance.find(p => p.date === today);
  const planItems = todayPerf?.planItems || [];

  // Maintain the added order (new items at the bottom)
  const sortedItems = [...planItems];

  const completedCount = planItems.filter(p => p.completed).length;
  const totalCount = planItems.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getPlanTitle = (item: typeof planItems[0]) => {
    return language === 'zh' ? item.title : (item.titleEn || item.title);
  };

  const openAddDialog = () => {
    setFormData({
      title: '',
      titleEn: '',
      time: '09:00',
      duration: 30,
      color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)],
    });
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: typeof planItems[0]) => {
    setFormData({
      title: item.title,
      titleEn: item.titleEn || '',
      time: item.time,
      duration: item.duration,
      color: item.color,
    });
    setEditingItem(item.id);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() && !formData.titleEn.trim()) return;

    const itemData = {
      title: formData.title || formData.titleEn,
      titleEn: formData.titleEn || formData.title,
      time: formData.time,
      duration: formData.duration,
      color: formData.color,
      completed: false,
    };

    if (editingItem) {
      updatePlanItem(editingItem, itemData);
    } else {
      addPlanItem(itemData);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (editingItem) {
      deletePlanItem(editingItem);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-3 text-foreground">
            <Calendar className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
            {t.title}
          </h2>
          <p className="text-xs lg:text-xs text-muted-foreground mt-1">
            <span className="font-bold text-primary">{completedCount}</span>/<span className="font-bold">{totalCount}</span> {t.completed}
          </p>
        </div>
        <Button 
          size="default" 
          onClick={openAddDialog}
          className="bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-white font-bold px-6 py-2 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border-0"
        >
          <Plus className="w-5 h-5" />
          <span>{t.addPlan}</span>
        </Button>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="relative bg-muted/30 p-3 rounded-2xl border border-border/50">
          <div className="h-3 bg-border rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-1000 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 items-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.remaining}: <span className="text-foreground">{totalCount - completedCount}</span></span>
            {progressPercent === 100 ? (
              <span className="text-[10px] font-black text-primary animate-bounce">{t.allDone}</span>
            ) : (
              <span className="text-[10px] font-bold text-muted-foreground">{Math.round(progressPercent)}%</span>
            )}
          </div>
        </div>
      )}

      {/* Plan Timeline */}
      <Card className="flex-1 p-6 lg:p-6 overflow-hidden bg-card border-border shadow-sm rounded-2xl">
        <div className="space-y-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {sortedItems.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-muted/20 rounded-3xl border-2 border-dashed border-border">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Calendar className="w-10 h-10 opacity-30" />
              </div>
              <p className="text-sm font-medium mb-4">{t.noPlans}</p>
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
            sortedItems.map((item, index) => {
              const isCurrent = index === 0 && !item.completed;
              
              return (
                <div
                  key={item.id}
                  className={`
                    relative p-4 lg:p-4 rounded-2xl border-2 transition-all card-hover
                    ${item.completed
                      ? 'bg-accent/10 border-accent/40 shadow-sm'
                      : isCurrent
                        ? 'bg-primary/5 border-primary/50 shadow-sm'
                        : 'border-border hover:bg-muted/30'
                    }
                  `}
                  style={{ borderLeftColor: item.color, borderLeftWidth: '4px' }}
                >
                  {/* Timeline connector */}
                  {index < sortedItems.length - 1 && !item.completed && (
                    <div
                      className="absolute left-0 top-full w-0.5 h-4 -translate-x-1/2 rounded-full"
                      style={{ backgroundColor: item.color, opacity: 0.3 }}
                    />
                  )}
                  
                  <div className="flex items-start gap-4 lg:gap-4">
                    {/* Status Icon */}
                    <button
                      onClick={() => togglePlanItem(item.id)}
                      className={`
                        mt-1 w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all btn-press flex-shrink-0 shadow-sm
                        ${item.completed
                          ? 'bg-accent text-white'
                          : 'border-2 border-border hover:border-primary bg-background'
                        }
                      `}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6" />
                      ) : (
                        <Circle className="w-5 h-5 lg:w-6 lg:h-6" />
                      )}
                    </button>

                    {/* Time */}
                    <div className="flex-shrink-0 w-14 lg:w-16 pt-2 lg:pt-2">
                      <p className={`
                        text-sm lg:text-base font-black
                        ${item.completed ? 'text-muted-foreground line-through opacity-50' : 'text-foreground'}
                      `}>
                        {item.time}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-2 lg:pt-2">
                      <p className={`
                        font-bold text-base lg:text-lg truncate
                        ${item.completed ? 'text-muted-foreground line-through opacity-50' : 'text-foreground'}
                      `}>
                        {getPlanTitle(item)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs lg:text-[11px] text-muted-foreground font-medium">
                          {item.duration} {t.minutes}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-0.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl hover:bg-muted"
                        onClick={() => openEditDialog(item)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setEditingItem(item.id);
                          setFormData({
                            title: item.title,
                            titleEn: item.titleEn || '',
                            time: item.time,
                            duration: item.duration,
                            color: item.color,
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border p-0">
          <DialogHeader className="border-b border-border pb-4 pt-5 px-5">
            <DialogTitle className="text-lg font-bold">
              {editingItem ? t.editPlan : t.addPlan}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5 py-5 px-5">
            {/* Title Chinese */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.planTitleZh}
              </label>
              <Input
                placeholder={t.planTitleZh}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            {/* Title English */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.planTitleEn}
              </label>
              <Input
                placeholder={t.planTitleEn}
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            {/* Time */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.time}
              </label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                {t.duration}: {formData.duration} {t.minutes}
              </label>
              <Slider
                value={[formData.duration]}
                onValueChange={(v) => setFormData({ ...formData, duration: v[0] })}
                min={5}
                max={180}
                step={5}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
              />
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
          </div>

          {/* Dialog Footer */}
          <div className="flex items-center justify-between border-t border-border px-5 py-4">
            {editingItem ? (
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


