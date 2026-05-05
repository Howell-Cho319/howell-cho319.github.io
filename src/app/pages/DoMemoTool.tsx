'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  FlipHorizontal, 
  Eye, 
  EyeOff, 
  Plus, 
  RotateCw, 
  Trash2, 
  X, 
  HelpCircle,
  Maximize2,
  Minimize2,
  Move,
  Layout as LayoutIcon,
  Columns,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==================== Type Definitions ====================
interface Paper {
  id: number;
  frontContent: string;
  backContent: string;
  isFlipped: boolean;
  hidden: boolean;
}

interface BlurBlock {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DragState {
  active: boolean;
  type: 'move' | 'resize' | null;
  blockId: number | null;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startBlockX: number;
  startBlockY: number;
}

// ==================== Sub-components ====================
const PaperComponent = React.memo(({ 
  paper, 
  index, 
  onUpdateContent, 
  onToggleHide, 
  onKeyDown,
  isDarkMode,
  paperRef
}: { 
  paper: Paper; 
  index: number; 
  onUpdateContent: (index: number, side: 'front' | 'back', content: string) => void;
  onToggleHide: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number, side: 'front' | 'back') => void;
  isDarkMode: boolean;
  paperRef?: React.RefObject<HTMLTextAreaElement | null>;
}) => {
  const frontRef = useRef<HTMLTextAreaElement>(null);
  const backRef = useRef<HTMLTextAreaElement>(null);

  // Handle focus when flipped
  useEffect(() => {
    // Small delay to allow the flip animation to start before focusing
    const timer = setTimeout(() => {
      if (paper.isFlipped) {
        backRef.current?.focus();
      } else {
        if (index === 0 && paperRef) {
          (paperRef as any).current?.focus();
        } else {
          frontRef.current?.focus();
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [paper.isFlipped, index, paperRef]);

  return (
    <div className="relative flex-1 h-full" style={{ perspective: '2000px' }}>
      <motion.div 
        layout
        initial={false}
        animate={{ rotateY: paper.isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 100, damping: 20 }}
        className={`relative w-full h-full rounded-2xl shadow-xl border ${isDarkMode ? 'bg-[#1e1e1e] border-white/10 shadow-black/40' : 'bg-white border-amber-900/10 shadow-amber-900/5'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div 
          className={`absolute inset-0 flex flex-col ${paper.isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: paper.isFlipped ? 0 : 2,
            transform: 'translateZ(1px)' // Small push to ensure front is always on top when at 0 deg
          }}
        >
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isDarkMode ? 'from-blue-600 to-purple-600' : 'from-amber-800 to-amber-600'}`} />
          
          <div className={`flex items-center justify-center py-3 border-b ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-amber-900/5 bg-amber-50/30'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-amber-900/40'}`}>
              Front Side
            </span>
          </div>

          <div className="flex-1 relative">
            <textarea
              ref={index === 0 ? paperRef : frontRef}
              className={`w-full h-full p-8 bg-transparent resize-none focus:outline-none text-lg leading-relaxed font-serif transition-all duration-300 ${isDarkMode ? 'text-gray-200' : 'text-amber-950'} ${paper.hidden ? 'blur-2xl select-none opacity-40' : ''}`}
              placeholder="Start writing here..."
              value={paper.frontContent}
              onChange={(e) => onUpdateContent(index, 'front', e.target.value)}
              onKeyDown={(e) => onKeyDown(e, index, 'front')}
              tabIndex={paper.isFlipped ? -1 : 0}
            />
          </div>
        </div>

        {/* Back Side */}
        <div 
          className={`absolute inset-0 flex flex-col ${!paper.isFlipped ? 'pointer-events-none' : 'pointer-events-auto'} ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-[#fffdfa]'}`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(1px)', // Rotated and pushed slightly to be "on top" when container is at 180
            zIndex: !paper.isFlipped ? 0 : 2
          }}
        >
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isDarkMode ? 'from-purple-600 to-blue-600' : 'from-amber-600 to-amber-800'}`} />
          
          <div className={`flex items-center justify-center py-3 border-b ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-amber-900/5 bg-amber-50/30'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-amber-900/40'}`}>
              Back Side (New Paper)
            </span>
          </div>

          <div className="flex-1 relative">
            <textarea
              ref={backRef}
              className={`w-full h-full p-8 bg-transparent resize-none focus:outline-none text-lg leading-relaxed font-serif transition-all duration-300 ${isDarkMode ? 'text-gray-200' : 'text-amber-950'} ${paper.hidden ? 'blur-2xl select-none opacity-40' : ''}`}
              placeholder="Flip back to check, or rewrite from memory here..."
              value={paper.backContent}
              onChange={(e) => onUpdateContent(index, 'back', e.target.value)}
              onKeyDown={(e) => onKeyDown(e, index, 'back')}
              tabIndex={paper.isFlipped ? 0 : -1}
            />
          </div>
        </div>

        {/* Hidden Overlay */}
        <AnimatePresence>
          {paper.hidden && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] z-10 ${isDarkMode ? 'bg-black/60' : 'bg-amber-50/60'}`}
              style={{ backfaceVisibility: 'hidden', transform: paper.isFlipped ? 'rotateY(180deg)' : 'none' }}
            >
              <EyeOff className={`w-8 h-8 mb-4 ${isDarkMode ? 'text-white/30' : 'text-amber-900/30'}`} />
              <button 
                onClick={() => onToggleHide(index)}
                className={`px-6 py-2 text-white text-sm font-bold rounded-full transition-colors shadow-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-800 hover:bg-amber-900'}`}
              >
                Unhide Content
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});

export function DoMemoTool() {
  const navigate = useNavigate();
  
  // ==================== State ====================
  const [papers, setPapers] = useState<Paper[]>([{
    id: 1,
    frontContent: '',
    backContent: '',
    isFlipped: false,
    hidden: false,
  }]);
  const [hasSecondPaper, setHasSecondPaper] = useState(false);
  const [secondPaperPosition, setSecondPaperPosition] = useState<'left' | 'right'>('right');
  const [blurBlocks, setBlurBlocks] = useState<BlurBlock[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [drag, setDrag] = useState<DragState>({
    active: false,
    type: null,
    blockId: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startBlockX: 0,
    startBlockY: 0,
  });

  const blurIdCounter = useRef(0);
  const paper1Ref = useRef<HTMLTextAreaElement>(null);

  // ==================== Focus on Mount ====================
  useEffect(() => {
    if (paper1Ref.current) {
      paper1Ref.current.focus();
    }
  }, []);

  // ==================== Storage ====================
  useEffect(() => {
    const saved = sessionStorage.getItem('domemo_tool_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPapers(data.papers || []);
        setHasSecondPaper(data.hasSecondPaper || false);
        setSecondPaperPosition(data.secondPaperPosition || 'right');
        setBlurBlocks(data.blurBlocks || []);
        setIsDarkMode(data.isDarkMode || false);
        if (data.blurBlocks?.length > 0) {
          blurIdCounter.current = Math.max(...data.blurBlocks.map((b: any) => b.id));
        }
      } catch (e) {
        console.error('Failed to load DoMemo data', e);
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      papers,
      hasSecondPaper,
      secondPaperPosition,
      blurBlocks,
      isDarkMode,
    };
    sessionStorage.setItem('domemo_tool_data', JSON.stringify(data));
  }, [papers, hasSecondPaper, secondPaperPosition, blurBlocks, isDarkMode]);

  // ==================== Actions ====================
  const flipPaper = useCallback((index: number) => {
    setPapers(prev => prev.map((p, i) => i === index ? { ...p, isFlipped: !p.isFlipped } : p));
  }, []);

  const toggleHide = useCallback((index: number) => {
    setPapers(prev => prev.map((p, i) => i === index ? { ...p, hidden: !p.hidden } : p));
  }, []);

  // Helpers to get paper by visual position
  const getLeftPaperIndex = useCallback(() => {
    if (!hasSecondPaper) return 0;
    return secondPaperPosition === 'left' ? 1 : 0;
  }, [hasSecondPaper, secondPaperPosition]);

  const getRightPaperIndex = useCallback(() => {
    if (!hasSecondPaper) return 0;
    return secondPaperPosition === 'right' ? 1 : 0;
  }, [hasSecondPaper, secondPaperPosition]);

  const toggleSecondPaper = useCallback(() => {
    setHasSecondPaper(prev => {
      if (!prev) {
        setPapers(current => {
          if (current.length < 2) {
            return [...current, {
              id: 2,
              frontContent: '',
              backContent: '',
              isFlipped: false,
              hidden: false,
            }];
          }
          return current;
        });
      }
      return !prev;
    });
  }, []);

  const togglePosition = useCallback(() => {
    setSecondPaperPosition(prev => prev === 'left' ? 'right' : 'left');
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const addBlurBlock = useCallback(() => {
    const id = ++blurIdCounter.current;
    const newBlock: BlurBlock = {
      id,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 100,
      width: 150,
      height: 80,
    };
    setBlurBlocks(prev => [...prev, newBlock]);
  }, []);

  const removeBlur = useCallback((id: number) => {
    setBlurBlocks(prev => prev.filter(b => b.id !== id));
  }, []);

  const clearAllBlurs = useCallback(() => {
    setBlurBlocks([]);
  }, []);

  const confirmClear = useCallback(() => {
    setPapers([{
      id: 1,
      frontContent: '',
      backContent: '',
      isFlipped: false,
      hidden: false,
    }, {
      id: 2,
      frontContent: '',
      backContent: '',
      isFlipped: false,
      hidden: false,
    }]);
    setHasSecondPaper(false);
    setBlurBlocks([]);
    setShowClearModal(false);
  }, []);

  const updatePaperContent = useCallback((index: number, side: 'front' | 'back', content: string) => {
    setPapers(prev => prev.map((p, i) => {
      if (i === index) {
        return side === 'front' 
          ? { ...p, frontContent: content } 
          : { ...p, backContent: content };
      }
      return p;
    }));
  }, []);

  const handleTextareaKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>, index: number, side: 'front' | 'back') => {
    // Tab key support for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;

      // Insert 2 spaces for Tab
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      updatePaperContent(index, side, newValue);

      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  }, [updatePaperContent]);

  // ==================== Drag & Resize ====================
  const handleMouseDown = (e: React.MouseEvent, blockId: number, type: 'move' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();
    
    const block = blurBlocks.find(b => b.id === blockId);
    if (!block) return;

    setDrag({
      active: true,
      type,
      blockId,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: block.width,
      startHeight: block.height,
      startBlockX: block.x,
      startBlockY: block.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!drag.active || drag.blockId === null) return;

      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;

      setBlurBlocks(prev => prev.map(b => {
        if (b.id === drag.blockId) {
          if (drag.type === 'move') {
            return {
              ...b,
              x: Math.max(0, Math.min(window.innerWidth - b.width, drag.startBlockX + dx)),
              y: Math.max(0, Math.min(window.innerHeight - b.height, drag.startBlockY + dy)),
            };
          } else if (drag.type === 'resize') {
            return {
              ...b,
              width: Math.max(60, drag.startWidth + dx),
              height: Math.max(40, drag.startHeight + dy),
            };
          }
        }
        return b;
      }));
    };

    const handleMouseUp = () => {
      if (drag.active) {
        setDrag(prev => ({ ...prev, active: false, type: null, blockId: null }));
      }
    };

    if (drag.active) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [drag]);

  // ==================== Keyboard Shortcuts ====================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) {
        if (e.key === 'Escape') {
          setShowHelp(false);
          setShowClearModal(false);
          return;
        }
        if (!e.altKey) return;
      }

      const key = e.key.toLowerCase();

      // Alt + F - Flip Left Paper (Visual 1)
      if (key === 'f' && e.altKey && !e.shiftKey) {
        e.preventDefault();
        flipPaper(getLeftPaperIndex());
      } 
      // Alt + Shift + F - Flip Right Paper (Visual 2)
      else if (key === 'f' && e.altKey && e.shiftKey && hasSecondPaper) {
        e.preventDefault();
        flipPaper(getRightPaperIndex());
      } 
      // Alt + H - Hide Left Paper (Visual 1)
      else if (key === 'h' && e.altKey && !e.shiftKey) {
        e.preventDefault();
        toggleHide(getLeftPaperIndex());
      } 
      // Alt + Shift + H - Hide Right Paper (Visual 2)
      else if (key === 'h' && e.altKey && e.shiftKey && hasSecondPaper) {
        e.preventDefault();
        toggleHide(getRightPaperIndex());
      } 
      else if (key === 'd' && e.altKey) {
        e.preventDefault();
        toggleSecondPaper();
      } 
      else if (key === 'p' && e.altKey && hasSecondPaper) {
        e.preventDefault();
        togglePosition();
      } 
      else if (key === 'l' && e.altKey) {
        e.preventDefault();
        toggleDarkMode();
      }
      else if (key === 'b' && e.altKey) {
        e.preventDefault();
        addBlurBlock();
      } 
      else if ((key === 'delete' || key === 'backspace') && e.altKey) {
        e.preventDefault();
        setShowClearModal(true);
      } 
      else if (key === 'escape') {
        setShowHelp(false);
        setShowClearModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasSecondPaper, flipPaper, toggleHide, toggleSecondPaper, togglePosition, toggleDarkMode, addBlurBlock, getLeftPaperIndex, getRightPaperIndex]);

  // ==================== Main Area ====================
  return (
    <div className={`fixed inset-0 flex flex-col font-sans overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f5f1eb] text-amber-950'}`}>
      {/* Header */}
      <header className={`h-14 border-b flex items-center justify-between px-6 z-30 select-none transition-colors ${isDarkMode ? 'bg-[#1e1e1e]/80 backdrop-blur-md border-white/10' : 'bg-white/80 backdrop-blur-md border-amber-900/10'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-amber-800'}`}>D</div>
          <span className={`font-bold text-base tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-amber-900'}`}>DoMemo</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowHelp(true)}
            className={`p-2 rounded-lg transition-all ${isDarkMode ? 'text-white/40 hover:text-white hover:bg-white/5' : 'text-amber-900/40 hover:text-amber-900 hover:bg-amber-900/5'}`}
            title="Help & Shortcuts (?)"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-amber-900/60 hover:text-amber-900 hover:bg-amber-900/5'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 relative p-4 md:p-8 pt-12 md:pt-16 overflow-hidden flex flex-col">
        <div className={`flex-1 flex gap-4 md:gap-8 relative ${hasSecondPaper ? 'flex-col md:flex-row' : 'w-full h-full'}`}>
          {hasSecondPaper && secondPaperPosition === 'left' && (
            <PaperComponent 
              paper={papers[1]} 
              index={1} 
              onUpdateContent={updatePaperContent}
              onToggleHide={toggleHide}
              onKeyDown={handleTextareaKeyDown}
              isDarkMode={isDarkMode}
            />
          )}
          <PaperComponent 
            paper={papers[0]} 
            index={0} 
            onUpdateContent={updatePaperContent}
            onToggleHide={toggleHide}
            onKeyDown={handleTextareaKeyDown}
            paperRef={paper1Ref}
            isDarkMode={isDarkMode}
          />
          {hasSecondPaper && secondPaperPosition === 'right' && (
            <PaperComponent 
              paper={papers[1]} 
              index={1} 
              onUpdateContent={updatePaperContent}
              onToggleHide={toggleHide}
              onKeyDown={handleTextareaKeyDown}
              isDarkMode={isDarkMode}
            />
          )}
          
          {/* Blur Blocks Layer */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {blurBlocks.map(block => (
              <div
                key={block.id}
                className={`absolute pointer-events-auto backdrop-blur-xl border-2 rounded-xl shadow-lg cursor-move group transition-colors ${isDarkMode ? 'bg-blue-900/30 border-blue-400/20' : 'bg-amber-200/60 border-amber-900/20'}`}
                style={{ 
                  left: block.x, 
                  top: block.y, 
                  width: block.width, 
                  height: block.height 
                }}
                onMouseDown={(e) => handleMouseDown(e, block.id, 'move')}
              >
                <div className="w-full h-full flex items-center justify-center opacity-20">
                  <Maximize2 className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-amber-900'}`} />
                </div>
                
                <div 
                  className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(e, block.id, 'resize')}
                >
                  <div className={`w-2 h-2 rounded-sm ${isDarkMode ? 'bg-blue-400/40' : 'bg-amber-900/40'}`} />
                </div>
                
                <button 
                  onClick={() => removeBlur(block.id)}
                  className={`absolute -top-3 -right-3 w-7 h-7 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-md border-2 ${isDarkMode ? 'bg-blue-600 border-[#121212]' : 'bg-amber-800 border-white'}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Toolbar */}
      <footer className={`h-16 border-t flex items-center justify-center px-4 z-30 select-none transition-colors ${isDarkMode ? 'bg-[#1e1e1e]/90 backdrop-blur-xl border-white/10' : 'bg-white/90 backdrop-blur-xl border-amber-900/10'}`}>
        <div className="max-w-4xl w-full flex items-center gap-1 sm:gap-4">
          {/* Paper 1 Tools (Always Left) */}
          <div className={`flex items-center gap-1 p-1 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5' : 'bg-amber-900/5'}`}>
            <button 
              onClick={() => flipPaper(getLeftPaperIndex())}
              className={`p-2 rounded-lg transition-all flex items-center gap-2 relative ${papers[getLeftPaperIndex()].isFlipped ? (isDarkMode ? 'bg-blue-600 text-white shadow-md' : 'bg-amber-800 text-white shadow-md') : (isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-amber-900/60 hover:bg-white hover:text-amber-900')}`}
              title="Flip Left Paper (Alt+F)"
            >
              <RotateCw className="w-5 h-5" />
              <span className={`absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-400 text-white' : 'bg-amber-400 text-amber-900'}`}>1</span>
            </button>
            <button 
              onClick={() => toggleHide(getLeftPaperIndex())}
              className={`p-2 rounded-lg transition-all ${papers[getLeftPaperIndex()].hidden ? (isDarkMode ? 'bg-blue-600 text-white shadow-md' : 'bg-amber-800 text-white shadow-md') : (isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-amber-900/60 hover:bg-white hover:text-amber-900')}`}
              title="Hide/Show Left Paper (Alt+H)"
            >
              {papers[getLeftPaperIndex()].hidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className={`w-[1px] h-6 transition-colors ${isDarkMode ? 'bg-white/10' : 'bg-amber-900/10'}`} />

          {/* Paper 2 Tools (Always Right) */}
          {hasSecondPaper && (
            <>
              <div className={`flex items-center gap-1 p-1 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5' : 'bg-amber-900/5'}`}>
                <button 
                  onClick={() => flipPaper(getRightPaperIndex())}
                  className={`p-2 rounded-lg transition-all relative ${papers[getRightPaperIndex()].isFlipped ? (isDarkMode ? 'bg-blue-600 text-white shadow-md' : 'bg-amber-800 text-white shadow-md') : (isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-amber-900/60 hover:bg-white hover:text-amber-900')}`}
                  title="Flip Right Paper (Alt+Shift+F)"
                >
                  <RotateCw className="w-5 h-5" />
                  <span className={`absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-400 text-white' : 'bg-amber-400 text-amber-900'}`}>2</span>
                </button>
                <button 
                  onClick={() => toggleHide(getRightPaperIndex())}
                  className={`p-2 rounded-lg transition-all ${papers[getRightPaperIndex()].hidden ? (isDarkMode ? 'bg-blue-600 text-white shadow-md' : 'bg-amber-800 text-white shadow-md') : (isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-amber-900/60 hover:bg-white hover:text-amber-900')}`}
                  title="Hide/Show Right Paper (Alt+Shift+H)"
                >
                  {papers[getRightPaperIndex()].hidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button 
                onClick={togglePosition}
                className={`p-2.5 rounded-xl transition-all ${isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-amber-900/60 hover:bg-amber-900/5'}`}
                title="Swap Paper Positions (Alt+P)"
              >
                <Columns className="w-5 h-5" />
              </button>
              <div className={`w-[1px] h-6 transition-colors ${isDarkMode ? 'bg-white/10' : 'bg-amber-900/10'}`} />
            </>
          )}

          {/* General Tools */}
          <button 
            onClick={toggleSecondPaper}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-bold text-xs ${hasSecondPaper ? (isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-amber-100 text-amber-900') : (isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-amber-900/60 hover:bg-amber-900/5')}`}
            title="Toggle Second Paper (Alt+D)"
          >
            <LayoutIcon className="w-5 h-5" />
            <span className="hidden sm:inline">{hasSecondPaper ? 'Single' : 'Dual'}</span>
          </button>

          <button 
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-xl transition-all ${isDarkMode ? 'text-yellow-400 hover:bg-white/5' : 'text-amber-900/40 hover:text-amber-900 hover:bg-amber-900/5'}`}
            title={`Toggle Dark Mode (${isDarkMode ? 'Sun' : 'Moon'})`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button 
            onClick={addBlurBlock}
            className={`p-2.5 rounded-xl transition-all relative group ${isDarkMode ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-amber-900/60 hover:bg-amber-900/5'}`}
            title="Add Blur Block (Alt+B)"
          >
            <Plus className="w-5 h-5" />
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-amber-900 text-white'}`}>
              Blur Block
            </div>
          </button>
          
          {blurBlocks.length > 0 && (
            <button 
              onClick={clearAllBlurs}
              className={`p-2.5 rounded-xl transition-all ${isDarkMode ? 'text-white/20 hover:text-red-400 hover:bg-white/5' : 'text-amber-900/40 hover:text-red-600 hover:bg-red-50'}`}
              title="Remove All Blurs"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex-1" />

          <button 
            onClick={() => setShowClearModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs group shadow-sm border ${isDarkMode ? 'bg-red-950/20 text-red-400 border-red-900/20 hover:bg-red-600 hover:text-white' : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white'}`}
            title="Clear All Content (Alt+Del)"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showClearModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearModal(false)}
              className="absolute inset-0 bg-amber-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-6">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mb-2">Clear All Content?</h2>
              <p className="text-amber-900/60 text-sm mb-8 leading-relaxed">
                This will permanently delete all text from both papers. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 px-4 py-3 bg-amber-50 text-amber-900 font-bold rounded-2xl hover:bg-amber-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmClear}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  Yes, Clear
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showHelp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="absolute inset-0 bg-amber-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: 50 }}
              className={`rounded-3xl w-full max-w-lg max-h-[85vh] relative shadow-2xl flex flex-col overflow-hidden ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-amber-950'}`}
            >
              <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-amber-900/5'}`}>
                <h2 className="text-xl font-bold">DoMemo Guide</h2>
                <button onClick={() => setShowHelp(false)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-amber-900/5'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                <section>
                  <div className={`flex items-center gap-3 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-amber-800'}`}>
                    <RotateCw className="w-5 h-5" />
                    <h3 className="font-bold">Flip Paper</h3>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-white/70' : 'text-amber-900/70'}`}>
                    Write on the front, flip to the back side to test yourself. Use the numbers to identify which paper you are flipping.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <kbd className={`px-2 py-1 border rounded text-xs font-mono font-bold ${isDarkMode ? 'bg-white/5 border-white/20 text-blue-400' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>Alt + F</kbd>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-amber-900/50'}`}>Flip Paper 1</span>
                    <kbd className={`px-2 py-1 border rounded text-xs font-mono font-bold ml-4 ${isDarkMode ? 'bg-white/5 border-white/20 text-blue-400' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>Alt + Shift + F</kbd>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-amber-900/50'}`}>Flip Paper 2</span>
                  </div>
                </section>

                <section>
                  <div className={`flex items-center gap-3 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-amber-800'}`}>
                    <LayoutIcon className="w-5 h-5" />
                    <h3 className="font-bold">Dual Paper</h3>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-white/70' : 'text-amber-900/70'}`}>
                    Add a second sheet for reference, hints, or translations while you practice on the main one.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <kbd className={`px-2 py-1 border rounded text-xs font-mono font-bold ${isDarkMode ? 'bg-white/5 border-white/20 text-blue-400' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>Alt + D</kbd>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-amber-900/50'}`}>Toggle Dual</span>
                    <kbd className={`px-2 py-1 border rounded text-xs font-mono font-bold ml-4 ${isDarkMode ? 'bg-white/5 border-white/20 text-blue-400' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>Alt + P</kbd>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-amber-900/50'}`}>Swap Position</span>
                  </div>
                </section>

                <section>
                  <div className={`flex items-center gap-3 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-amber-800'}`}>
                    <EyeOff className="w-5 h-5" />
                    <h3 className="font-bold">Hide & Blur</h3>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-white/70' : 'text-amber-900/70'}`}>
                    Instantly hide a whole paper or add draggable blur blocks to cover specific lines or words.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <kbd className={`px-2 py-1 border rounded text-xs font-mono font-bold ${isDarkMode ? 'bg-white/5 border-white/20 text-blue-400' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>Alt + H</kbd>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-amber-900/50'}`}>Hide Paper</span>
                    <kbd className={`px-2 py-1 border rounded text-xs font-mono font-bold ml-4 ${isDarkMode ? 'bg-white/5 border-white/20 text-blue-400' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>Alt + B</kbd>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-amber-900/50'}`}>Add Blur</span>
                  </div>
                </section>

                <section>
                  <div className={`flex items-center gap-3 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-amber-800'}`}>
                    <Trash2 className="w-5 h-5" />
                    <h3 className="font-bold">Clear All</h3>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-white/70' : 'text-amber-900/70'}`}>
                    Wipe both papers clean to start a new session.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <kbd className={`px-2 py-1 border rounded text-xs font-mono font-bold ${isDarkMode ? 'bg-white/5 border-white/20 text-blue-400' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>Alt + Del</kbd>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-amber-900/50'}`}>Clear All</span>
                  </div>
                </section>

                <section className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-amber-50'}`}>
                  <div className={`flex items-center gap-3 mb-2 ${isDarkMode ? 'text-blue-400' : 'text-amber-800'}`}>
                    <Sun className="w-4 h-4" />
                    <h4 className="font-bold text-sm">Dark Mode</h4>
                  </div>
                  <p className={`text-[12px] leading-relaxed mb-4 ${isDarkMode ? 'text-white/60' : 'text-amber-900/60'}`}>
                    Switch between Light and Dark mode for better visualization and eye comfort during long study sessions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <kbd className={`px-2 py-1 border rounded text-xs font-mono font-bold ${isDarkMode ? 'bg-white/10 border-white/20 text-blue-400' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>Alt + L</kbd>
                    <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-amber-900/50'}`}>Toggle Theme</span>
                  </div>
                </section>

                <section className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-amber-50'}`}>
                  <div className={`flex items-center gap-3 mb-2 ${isDarkMode ? 'text-blue-400' : 'text-amber-800'}`}>
                    <RotateCw className="w-4 h-4" />
                    <h4 className="font-bold text-sm">Privacy & Persistence</h4>
                  </div>
                  <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-amber-900/60'}`}>
                    Everything stays local in your browser. Refreshing won't lose your work, but closing the tab will clear everything for a fresh start.
                  </p>
                </section>
              </div>
              
              <div className={`p-6 text-center ${isDarkMode ? 'bg-white/5' : 'bg-amber-50/50'}`}>
                <button 
                  onClick={() => setShowHelp(false)}
                  className={`px-8 py-2 text-white font-bold rounded-full transition-colors text-sm ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-800 hover:bg-amber-900'}`}
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
