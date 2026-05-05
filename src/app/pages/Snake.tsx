import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

// Constants
const CELL_SIZE = 18;
const CW = 288;
const CH = 270;
const COLS = Math.floor(CW / CELL_SIZE);
const ROWS = Math.floor(CH / CELL_SIZE);
const OX = Math.floor((CW - COLS * CELL_SIZE) / 2);
const OY = Math.floor((CH - ROWS * CELL_SIZE) / 2);

const COLORS = {
  bg: '#8bac0f',
  grid: 'rgba(0,0,0,0.06)',
  snake: '#1a2800',
  head: '#0f1a00',
  eye: '#8bac0f',
  food: '#306030',
  foodX: '#1a3010',
  bomb: '#1a2800',
  bombFuse: '#3a5010',
  bombFlash: '#0f1a00',
  border: '#0f1a00',
  text: '#1a2800',
  textDim: '#3a5010',
};

type Point = { x: number; y: number };
type Item = { 
  type: 'food' | 'bomb'; 
  x: number; 
  y: number; 
  age: number;
  ttl?: number;
  maxTtl?: number;
};
type Explosion = { x: number; y: number; frames: number };

export function Snake() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  // Game State
  const [snake, setSnake] = useState<Point[]>([]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [nextDir, setNextDir] = useState<Point>({ x: 1, y: 0 });
  const [items, setItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [highScore1, setHighScore1] = useState(0);
  const [highScore2, setHighScore2] = useState(0);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'PAUSED' | 'OVER'>('START');
  const [mode, setMode] = useState<1 | 2>(1);
  const [speed, setSpeed] = useState(200);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [frameCount, setFrameCount] = useState(0);

  // Refs for state values to use in intervals/callbacks
  const snakeRef = useRef(snake);
  const dirRef = useRef(dir);
  const nextDirRef = useRef(nextDir);
  const itemsRef = useRef(items);
  const gameStateRef = useRef(gameState);
  const modeRef = useRef(mode);
  const explosionsRef = useRef(explosions);

  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { dirRef.current = dir; }, [dir]);
  useEffect(() => { nextDirRef.current = nextDir; }, [nextDir]);
  useEffect(() => { itemsRef.current = items; }, [items]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { explosionsRef.current = explosions; }, [explosions]);

  // Logic Functions
  const rnd = (a: number, b: number) => Math.floor(Math.random() * (b - a)) + a;

  const occupied = useCallback((x: number, y: number) => {
    if (snakeRef.current.some(s => s.x === x && s.y === y)) return true;
    if (itemsRef.current.some(i => i.x === x && i.y === y)) return true;
    return false;
  }, []);

  const freeCell = useCallback(() => {
    let p, tries = 0;
    do { 
      p = { x: rnd(0, COLS), y: rnd(0, ROWS) }; 
      tries++; 
    } while (occupied(p.x, p.y) && tries < 200);
    return p;
  }, [occupied]);

  const spawnFood = useCallback(() => {
    const p = freeCell();
    setItems(prev => [...prev, { type: 'food', x: p.x, y: p.y, age: 0 }]);
  }, [freeCell]);

  const spawnBomb = useCallback(() => {
    const p = freeCell();
    const ttl = 8 + rnd(0, 6);
    setItems(prev => [...prev, { type: 'bomb', x: p.x, y: p.y, ttl, maxTtl: ttl, age: 0 }]);
  }, [freeCell]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, CW, CH);

    // Grid
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(OX + c * CELL_SIZE, OY);
      ctx.lineTo(OX + c * CELL_SIZE, OY + ROWS * CELL_SIZE);
      ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(OX, OY + r * CELL_SIZE);
      ctx.lineTo(OX + COLS * CELL_SIZE, OY + r * CELL_SIZE);
      ctx.stroke();
    }

    // Border
    if (modeRef.current === 2) {
      ctx.strokeStyle = 'rgba(26,40,0,0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(OX + 1, OY + 1, COLS * CELL_SIZE - 2, ROWS * CELL_SIZE - 2);
      ctx.setLineDash([]);
    } else {
      ctx.strokeStyle = COLORS.border;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(OX, OY, COLS * CELL_SIZE, ROWS * CELL_SIZE);
    }

    // Items
    itemsRef.current.forEach(item => {
      const px = OX + item.x * CELL_SIZE, py = OY + item.y * CELL_SIZE;
      if (item.type === 'food') {
        ctx.fillStyle = COLORS.food;
        ctx.beginPath();
        // @ts-ignore
        if (ctx.roundRect) ctx.roundRect(px + 3, py + 3, CELL_SIZE - 6, CELL_SIZE - 6, 3);
        else ctx.rect(px + 3, py + 3, CELL_SIZE - 6, CELL_SIZE - 6);
        ctx.fill();
        ctx.fillStyle = COLORS.foodX;
        ctx.fillRect(px + CELL_SIZE / 2 - 1, py + 2, 2, 4);
        ctx.fillRect(px + 2, py + CELL_SIZE / 2 - 1, 4, 2);
        ctx.fillRect(px + CELL_SIZE - 6, py + CELL_SIZE / 2 - 1, 4, 2);
        ctx.fillRect(px + CELL_SIZE / 2 - 1, py + CELL_SIZE - 6, 2, 4);
      } else if (item.type === 'bomb') {
        const danger = item.ttl! <= 3;
        const flash = danger && Math.floor(Date.now() / 150) % 2 === 0;
        ctx.fillStyle = flash ? COLORS.bombFlash : COLORS.bomb;
        ctx.beginPath();
        ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2 + 1, CELL_SIZE / 2 - 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.bombFuse;
        ctx.fillRect(px + CELL_SIZE / 2 - 1, py + 1, 2, 5);
        ctx.fillRect(px + CELL_SIZE / 2 + 1, py + 2, 3, 2);
        const pct = item.ttl! / item.maxTtl!;
        ctx.strokeStyle = danger ? COLORS.bombFlash : COLORS.bombFuse;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2 + 1, CELL_SIZE / 2 - 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
        ctx.stroke();
      }
    });

    // Explosions
    explosionsRef.current.forEach(e => {
      const px = OX + e.x * CELL_SIZE, py = OY + e.y * CELL_SIZE;
      const r = (6 - e.frames) * 4;
      ctx.fillStyle = `rgba(26,40,0,${e.frames / 6 * 0.5})`;
      ctx.beginPath(); ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, r, 0, Math.PI * 2); ctx.fill();
    });

    // Snake
    const currentSnake = snakeRef.current;
    const currentDir = dirRef.current;
    currentSnake.forEach((s, i) => {
      const isHead = i === 0;
      const px = OX + s.x * CELL_SIZE, py = OY + s.y * CELL_SIZE;
      ctx.fillStyle = isHead ? COLORS.head : COLORS.snake;
      // @ts-ignore
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2, isHead ? 4 : 2);
        ctx.fill();
      } else {
        ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      }

      if (isHead) {
        ctx.fillStyle = COLORS.eye;
        const es = 2.5;
        let e1x, e1y, e2x, e2y;
        if (currentDir.x === 1) { e1x = px + CELL_SIZE - 5; e1y = py + 4; e2x = px + CELL_SIZE - 5; e2y = py + CELL_SIZE - 7; }
        else if (currentDir.x === -1) { e1x = px + 3; e1y = py + 4; e2x = px + 3; e2y = py + CELL_SIZE - 7; }
        else if (currentDir.y === -1) { e1x = px + 4; e1y = py + 3; e2x = px + CELL_SIZE - 7; e2y = py + 3; }
        else { e1x = px + 4; e1y = py + CELL_SIZE - 5; e2x = px + CELL_SIZE - 7; e2y = py + CELL_SIZE - 5; }
        ctx.beginPath(); ctx.arc(e1x, e1y, es, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(e2x, e2y, es, 0, Math.PI * 2); ctx.fill();
      }
    });

    // Score & Mode Label
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 10px "Share Tech Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SCR:' + String(score).padStart(3, '0'), OX + 2, 12);
    ctx.textAlign = 'right';
    const hi = modeRef.current === 1 ? highScore1 : highScore2;
    ctx.fillText('HI:' + String(hi).padStart(3, '0'), OX + COLS * CELL_SIZE - 2, 12);
    ctx.textAlign = 'center';
    ctx.fillStyle = COLORS.textDim;
    ctx.font = '8px "Share Tech Mono", monospace';
    ctx.fillText(modeRef.current === 2 ? 'WARP' : 'WALL', OX + COLS * CELL_SIZE / 2, 11);
  }, [score, highScore1, highScore2]);

  const endGame = useCallback(() => {
    setGameState('OVER');
    if (modeRef.current === 1 && score > highScore1) setHighScore1(score);
    if (modeRef.current === 2 && score > highScore2) setHighScore2(score);
  }, [score, highScore1, highScore2]);

  const tick = useCallback(() => {
    if (gameStateRef.current !== 'PLAYING') return;

    setFrameCount(prev => prev + 1);
    const currentDir = nextDirRef.current;
    setDir(currentDir);

    const currentSnake = [...snakeRef.current];
    let nx = currentSnake[0].x + currentDir.x;
    let ny = currentSnake[0].y + currentDir.y;

    if (modeRef.current === 1) {
      if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) { endGame(); return; }
    } else {
      nx = (nx + COLS) % COLS;
      ny = (ny + ROWS) % ROWS;
    }

    if (currentSnake.some(s => s.x === nx && s.y === ny)) { endGame(); return; }

    const head = { x: nx, y: ny };
    const currentItems = [...itemsRef.current];
    const hitBomb = currentItems.findIndex(i => i.type === 'bomb' && i.x === nx && i.y === ny);
    if (hitBomb !== -1) { endGame(); return; }

    currentSnake.unshift(head);

    const hitFood = currentItems.findIndex(i => i.type === 'food' && i.x === nx && i.y === ny);
    if (hitFood !== -1) {
      setScore(prev => prev + 1);
      currentItems.splice(hitFood, 1);
      setItems(currentItems);
      spawnFood();
      const lvl = Math.floor((score + 1) / 5);
      setSpeed(Math.max(60, 200 - lvl * 14));
    } else {
      currentSnake.pop();
    }

    if (modeRef.current === 2) {
      const updatedItems = currentItems.map(item => {
        if (item.type === 'bomb') {
          const newTtl = item.ttl! - 1;
          if (newTtl <= 0) {
            setExplosions(prev => [...prev, { x: item.x, y: item.y, frames: 6 }]);
            const adj = [{ x: item.x, y: item.y }, { x: item.x - 1, y: item.y }, { x: item.x + 1, y: item.y }, { x: item.x, y: item.y - 1 }, { x: item.x, y: item.y + 1 }];
            if (adj.some(c => currentSnake.some(s => s.x === c.x && s.y === c.y))) {
              endGame();
            }
            return null;
          }
          return { ...item, ttl: newTtl, age: item.age + 1 };
        }
        return { ...item, age: item.age + 1 };
      }).filter(Boolean) as Item[];

      setItems(updatedItems);

      if (frameCount % 12 === 0) {
        if (updatedItems.filter(i => i.type === 'food').length < 2) spawnFood();
      }
      if (frameCount % 20 === 0) {
        if (updatedItems.filter(i => i.type === 'bomb').length < 3) spawnBomb();
      }
    } else {
      setItems(currentItems.map(i => ({ ...i, age: i.age + 1 })));
    }

    setSnake(currentSnake);
    setExplosions(prev => prev.map(e => ({ ...e, frames: e.frames - 1 })).filter(e => e.frames > 0));
  }, [score, frameCount, spawnFood, spawnBomb, endGame]);

  // Game Loop
  useEffect(() => {
    if (gameState === 'PLAYING') {
      gameLoopRef.current = window.setInterval(tick, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, speed, tick]);

  // Render Loop
  useEffect(() => {
    draw();
  }, [snake, items, score, gameState, explosions, draw]);

  const startGame = () => {
    const mx = Math.floor(COLS / 2), my = Math.floor(ROWS / 2);
    setSnake([{ x: mx, y: my }, { x: mx - 1, y: my }, { x: mx - 2, y: my }]);
    setDir({ x: 1, y: 0 });
    setNextDir({ x: 1, y: 0 });
    setScore(0);
    setSpeed(200);
    setItems([]);
    setExplosions([]);
    setFrameCount(0);
    setGameState('PLAYING');
    spawnFood();
    if (mode === 2) spawnBomb();
  };

  const togglePause = () => {
    if (gameState === 'PLAYING') setGameState('PAUSED');
    else if (gameState === 'PAUSED') setGameState('PLAYING');
  };

  const setDirection = (dx: number, dy: number) => {
    if (gameState !== 'PLAYING') return;
    if (dx === -dirRef.current.x && dy === -dirRef.current.y) return;
    setNextDir({ x: dx, y: dy });
  };

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (gameState === 'START' || gameState === 'OVER') startGame();
      }
      if (e.key === ' ' || e.key === 'p' || e.key === 'P') togglePause();
      if (e.key === 'm' || e.key === 'M') setMode(prev => prev === 1 ? 2 : 1);

      if (gameState !== 'PLAYING') return;

      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': setDirection(0, -1); e.preventDefault(); break;
        case 'ArrowDown': case 's': case 'S': setDirection(0, 1); e.preventDefault(); break;
        case 'ArrowLeft': case 'a': case 'A': setDirection(-1, 0); e.preventDefault(); break;
        case 'ArrowRight': case 'd': case 'D': setDirection(1, 0); e.preventDefault(); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, mode]);

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#4a4238] font-sans flex flex-col">
      <header className="max-w-4xl mx-auto w-full px-6 py-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-amber-900/60 hover:text-amber-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="text-xl font-bold tracking-tight">Nokia Snake</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12">
        <div className="relative">
          <div className="w-[320px] bg-[#3a3a2e] rounded-[24px_24px_50px_50px] p-4 shadow-2xl relative font-mono">
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => <span key={i} className="w-[3px] h-3.5 bg-[#2a2a20] rounded-sm" />)}
            </div>

            <div className="bg-[#1a1a14] rounded-xl p-2 mb-4 shadow-inner">
              <div className="bg-[#8bac0f] rounded-md w-full h-[270px] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-10 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.05)_0px,rgba(0,0,0,0.05)_1px,transparent_1px,transparent_3px)]" />
                <div className="absolute inset-0 pointer-events-none z-11 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
                
                <AnimatePresence>
                  {gameState === 'START' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-[#8bac0f] flex flex-col items-center justify-center gap-2">
                      <div className="text-xl font-bold tracking-[3px] text-[#1a2800]">SNAKE</div>
                      <div className="text-[8px] tracking-[2px] text-[#3a5000]">NOKIA EDITION</div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => setMode(1)} className={`px-2 py-1 border-2 border-[#1a2800] text-[8px] rounded ${mode === 1 ? 'bg-[#1a2800] text-[#8bac0f]' : 'text-[#1a2800]'}`}>MODE 1</button>
                        <button onClick={() => setMode(2)} className={`px-2 py-1 border-2 border-[#1a2800] text-[8px] rounded ${mode === 2 ? 'bg-[#1a2800] text-[#8bac0f]' : 'text-[#1a2800]'}`}>MODE 2</button>
                      </div>
                      <div className="text-[9px] text-[#1a2800] animate-pulse mt-2">PRESS START</div>
                    </motion.div>
                  )}

                  {gameState === 'PAUSED' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-[#8bac0f]/95 flex flex-col items-center justify-center gap-2">
                      <div className="text-lg font-bold text-[#1a2800]">PAUSED</div>
                      <div className="text-[9px] text-[#1a2800] animate-pulse">PRESS P TO RESUME</div>
                    </motion.div>
                  )}

                  {gameState === 'OVER' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-[#8bac0f] flex flex-col items-center justify-center gap-2 text-center">
                      <div className="text-lg font-bold text-[#1a2800]">GAME OVER</div>
                      <div className="text-xs text-[#1a2800]">SCORE: {score}</div>
                      <div className="text-xs text-[#1a2800]">BEST: {mode === 1 ? highScore1 : highScore2}</div>
                      <div className="text-[9px] text-[#1a2800] animate-pulse mt-2">PRESS START TO REPLAY</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <canvas ref={canvasRef} width={CW} height={CH} className="w-full h-full image-pixelated" />
              </div>
            </div>

            <div className="text-center text-[#5a6030] text-[9px] tracking-[3px] mb-4">NOKIA</div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32">
                <button onClick={() => setDirection(0, -1)} className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#222218] rounded-md text-[#7a8a40] flex items-center justify-center active:bg-[#111108]">
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button onClick={() => setDirection(0, 1)} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#222218] rounded-md text-[#7a8a40] flex items-center justify-center active:bg-[#111108]">
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button onClick={() => setDirection(-1, 0)} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#222218] rounded-md text-[#7a8a40] flex items-center justify-center active:bg-[#111108]">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setDirection(1, 0)} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#222218] rounded-md text-[#7a8a40] flex items-center justify-center active:bg-[#111108]">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={togglePause} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[#1a1a10] rounded-full text-[#6a7a30] text-[8px] font-bold active:bg-[#0a0a06]">
                  OK
                </button>
              </div>

              <div className="w-full flex justify-between px-2">
                <button onClick={startGame} className="bg-[#222218] rounded-lg px-4 py-2 text-[#7a8a40] text-[10px] tracking-wider active:bg-[#111108]">
                  START
                </button>
                <button onClick={() => setMode(prev => prev === 1 ? 2 : 1)} className={`bg-[#222218] rounded-lg px-4 py-2 text-[#7a8a40] text-[10px] tracking-wider active:bg-[#111108] ${mode === 2 ? 'bg-[#1a2800] text-[#8bac0f]' : ''}`}>
                  MODE {mode}
                </button>
                <button onClick={togglePause} className="bg-[#222218] rounded-lg px-4 py-2 text-[#7a8a40] text-[10px] tracking-wider active:bg-[#111108]">
                  PAUSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-amber-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-950">Classic Snake</h3>
            <p className="text-amber-900/70 leading-relaxed">
              The game that defined a generation. Navigate your snake to eat food and grow, but don't hit the walls or yourself!
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-950">Warp + Bomb Mode</h3>
            <p className="text-amber-900/70 leading-relaxed">
              A modern twist on the classic. Wrap around the edges and avoid timed bombs that explode and can end your game instantly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
