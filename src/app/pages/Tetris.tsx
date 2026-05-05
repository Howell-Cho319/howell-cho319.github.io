import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router';

// Constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 20;
const COLORS = {
  empty: '#8a9a2a',
  filled: '#2a3008',
  ghost: '#6a7a1a',
  grid: 'rgba(0,0,0,0.07)'
};

const PIECES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]], // Z
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]], // L
];

export function Tetris() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextCanvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  // Game State
  const [board, setBoard] = useState<number[][]>(() => Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [piece, setPiece] = useState<any>(null);
  const [nextPiece, setNextPiece] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'PAUSED' | 'OVER'>('START');

  // Refs for state values to use in intervals/callbacks
  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const gameStateRef = useRef(gameState);
  const levelRef = useRef(level);

  useEffect(() => { boardRef.current = board; }, [board]);
  useEffect(() => { pieceRef.current = piece; }, [piece]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { levelRef.current = level; }, [level]);

  // Logic Functions
  const getRandomPiece = useCallback(() => {
    const shape = PIECES[Math.floor(Math.random() * PIECES.length)];
    return {
      shape: shape.map(row => [...row]),
      x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
      y: 0
    };
  }, []);

  const rotate = (shape: number[][]) => {
    return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
  };

  const isValid = useCallback((shape: number[][], x: number, y: number, currentBoard: number[][]) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const nx = x + c;
          const ny = y + r;
          if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
          if (ny >= 0 && currentBoard[ny][nx]) return false;
        }
      }
    }
    return true;
  }, []);

  const getGhostY = useCallback((p: any, currentBoard: number[][]) => {
    let gy = p.y;
    while (isValid(p.shape, p.x, gy + 1, currentBoard)) gy++;
    return gy;
  }, [isValid]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw background
    ctx.fillStyle = COLORS.empty;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * BLOCK_SIZE);
      ctx.lineTo(COLS * BLOCK_SIZE, r * BLOCK_SIZE);
      ctx.stroke();
    }
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * BLOCK_SIZE, 0);
      ctx.lineTo(c * BLOCK_SIZE, ROWS * BLOCK_SIZE);
      ctx.stroke();
    }

    // Draw Board
    const currentBoard = boardRef.current;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (currentBoard[r][c]) {
          ctx.fillStyle = COLORS.filled;
          ctx.fillRect(c * BLOCK_SIZE + 1, r * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
        }
      }
    }

    // Draw Piece & Ghost
    const currentPiece = pieceRef.current;
    if (currentPiece && gameStateRef.current === 'PLAYING') {
      const gy = getGhostY(currentPiece, currentBoard);
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c]) {
            // Ghost
            ctx.fillStyle = COLORS.ghost;
            ctx.fillRect((currentPiece.x + c) * BLOCK_SIZE + 1, (gy + r) * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
            // Filled
            if (currentPiece.y + r >= 0) {
              ctx.fillStyle = COLORS.filled;
              ctx.fillRect((currentPiece.x + c) * BLOCK_SIZE + 1, (currentPiece.y + r) * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
            }
          }
        }
      }
    }
  }, [getGhostY]);

  const drawNext = useCallback(() => {
    const canvas = nextCanvasRef.current;
    if (!canvas || !nextPiece) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = COLORS.empty;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const sh = nextPiece.shape;
    const bw = BLOCK_SIZE * 0.8;
    const ox = (canvas.width - sh[0].length * bw) / 2;
    const oy = (canvas.height - sh.length * bw) / 2;

    ctx.fillStyle = COLORS.filled;
    for (let r = 0; r < sh.length; r++) {
      for (let c = 0; c < sh[r].length; c++) {
        if (sh[r][c]) {
          ctx.fillRect(ox + c * bw + 1, oy + r * bw + 1, bw - 2, bw - 2);
        }
      }
    }
  }, [nextPiece]);

  const clearLines = useCallback((currentBoard: number[][]) => {
    let cleared = 0;
    const newBoard = currentBoard.map(row => [...row]);
    
    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r].every(cell => cell)) {
        newBoard.splice(r, 1);
        newBoard.unshift(Array(COLS).fill(0));
        cleared++;
        r++; // Check the same row index again since we shifted everything down
      }
    }

    if (cleared > 0) {
      setLines(prev => {
        const newLines = prev + cleared;
        const newLevel = Math.floor(newLines / 10) + 1;
        setLevel(newLevel);
        return newLines;
      });
      setScore(prev => prev + [0, 100, 300, 500, 800][cleared] * levelRef.current);
    }
    
    return newBoard;
  }, []);

  const placePiece = useCallback(() => {
    const currentPiece = pieceRef.current;
    const currentBoard = boardRef.current;
    
    let newBoard = currentBoard.map(row => [...row]);
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c] && currentPiece.y + r >= 0) {
          newBoard[currentPiece.y + r][currentPiece.x + c] = 1;
        }
      }
    }
    
    // Clear lines and get the resulting board
    newBoard = clearLines(newBoard);
    
    const next = nextPiece;
    setPiece(next);
    setNextPiece(getRandomPiece());
    
    if (!isValid(next.shape, next.x, next.y, newBoard)) {
      setGameState('OVER');
      setBoard(newBoard); // Final board state
    } else {
      setBoard(newBoard);
    }
  }, [clearLines, getRandomPiece, isValid, nextPiece]);

  const tick = useCallback(() => {
    if (gameStateRef.current !== 'PLAYING') return;
    const currentPiece = pieceRef.current;
    const currentBoard = boardRef.current;

    if (isValid(currentPiece.shape, currentPiece.x, currentPiece.y + 1, currentBoard)) {
      setPiece({ ...currentPiece, y: currentPiece.y + 1 });
    } else {
      placePiece();
    }
  }, [isValid, placePiece]);

  // Game Loop
  useEffect(() => {
    if (gameState === 'PLAYING') {
      const speed = Math.max(80, 600 - (level - 1) * 55);
      gameLoopRef.current = window.setInterval(tick, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, level, tick]);

  // Render Loop
  useEffect(() => {
    draw();
    drawNext();
  }, [board, piece, nextPiece, gameState, draw, drawNext]);

  // Controls
  const startGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setScore(0);
    setLines(0);
    setLevel(1);
    const first = getRandomPiece();
    const second = getRandomPiece();
    setPiece(first);
    setNextPiece(second);
    setGameState('PLAYING');
  };

  const moveLeft = () => {
    if (gameState !== 'PLAYING') return;
    if (isValid(piece.shape, piece.x - 1, piece.y, board)) setPiece({ ...piece, x: piece.x - 1 });
  };

  const moveRight = () => {
    if (gameState !== 'PLAYING') return;
    if (isValid(piece.shape, piece.x + 1, piece.y, board)) setPiece({ ...piece, x: piece.x + 1 });
  };

  const moveDown = () => {
    if (gameState !== 'PLAYING') return;
    if (isValid(piece.shape, piece.x, piece.y + 1, board)) setPiece({ ...piece, y: piece.y + 1 });
    else placePiece();
  };

  const hardDrop = () => {
    if (gameState !== 'PLAYING') return;
    const gy = getGhostY(piece, board);
    
    let newBoard = board.map(row => [...row]);
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] && gy + r >= 0) {
          newBoard[gy + r][piece.x + c] = 1;
        }
      }
    }
    
    newBoard = clearLines(newBoard);
    
    const next = nextPiece;
    setPiece(next);
    setNextPiece(getRandomPiece());
    
    if (!isValid(next.shape, next.x, next.y, newBoard)) {
      setGameState('OVER');
    }
    setBoard(newBoard);
  };

  const rotatePiece = () => {
    if (gameState !== 'PLAYING') return;
    const r = rotate(piece.shape);
    if (isValid(r, piece.x, piece.y, board)) setPiece({ ...piece, shape: r });
    else if (isValid(r, piece.x + 1, piece.y, board)) setPiece({ ...piece, shape: r, x: piece.x + 1 });
    else if (isValid(r, piece.x - 1, piece.y, board)) setPiece({ ...piece, shape: r, x: piece.x - 1 });
  };

  const togglePause = () => {
    if (gameState === 'PLAYING') setGameState('PAUSED');
    else if (gameState === 'PAUSED') setGameState('PLAYING');
  };

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (gameState === 'START' || gameState === 'OVER') startGame();
      }
      if (e.key === 'p' || e.key === 'P') togglePause();
      
      if (gameState !== 'PLAYING') return;
      
      switch (e.key) {
        case 'ArrowLeft': moveLeft(); e.preventDefault(); break;
        case 'ArrowRight': moveRight(); e.preventDefault(); break;
        case 'ArrowDown': moveDown(); e.preventDefault(); break;
        case 'ArrowUp': rotatePiece(); e.preventDefault(); break;
        case ' ': hardDrop(); e.preventDefault(); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, board, piece, nextPiece, isValid, placePiece, getGhostY, clearLines, getRandomPiece]);

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#4a4238] font-sans selection:bg-amber-100 flex flex-col">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full px-6 py-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-amber-900/60 hover:text-amber-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="text-xl font-bold tracking-tight">Nokia Tetris</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12">
        <div className="relative">
          {/* Nokia Body */}
          <div className="w-[320px] bg-[#3a3a2e] rounded-[24px_24px_50px_50px] p-4 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_inset_0_-4px_8px_rgba(0,0,0,0.4)] relative font-mono">
            {/* Speaker */}
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => <span key={i} className="w-[3px] h-3.5 bg-[#2a2a20] rounded-sm" />)}
            </div>

            {/* Screen Bezel */}
            <div className="bg-[#1a1a14] rounded-xl p-2 mb-4 shadow-[inset_0_3px_8px_rgba(0,0,0,0.7)]">
              <div className="bg-[#8a9a2a] rounded-md w-full h-[260px] relative overflow-hidden flex">
                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.04)_0px,rgba(0,0,0,0.04)_1px,transparent_1px,transparent_3px)]" />
                
                {/* Overlays */}
                <AnimatePresence>
                  {gameState === 'START' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-[#8a9a2a] flex flex-col items-center justify-center gap-2">
                      <div className="text-lg tracking-widest text-[#2a3008]">TETRIS</div>
                      <div className="text-[9px] tracking-widest text-[#3a4a10]">NOKIA EDITION</div>
                      <div className="text-[9px] tracking-wider text-[#2a3008] animate-pulse mt-2">PRESS START</div>
                    </motion.div>
                  )}

                  {gameState === 'PAUSED' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-[#8a9a2a]/90 flex flex-col items-center justify-center gap-2">
                      <div className="text-sm font-bold text-[#2a3008]">PAUSED</div>
                      <div className="text-[9px] text-[#2a3008] animate-pulse">PRESS P TO RESUME</div>
                    </motion.div>
                  )}

                  {gameState === 'OVER' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-[#8a9a2a] flex flex-col items-center justify-center gap-2">
                      <div className="text-sm font-bold text-[#2a3008]">GAME OVER</div>
                      <div className="text-xs text-[#2a3008]">SCORE: {score}</div>
                      <div className="text-[9px] text-[#2a3008] animate-pulse mt-2">PRESS START TO REPLAY</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Game Area */}
                <div className="flex-1 p-1 pr-0">
                  <canvas ref={canvasRef} width={COLS * BLOCK_SIZE} height={ROWS * BLOCK_SIZE} className="w-full h-full image-pixelated" />
                </div>

                {/* Side Panel */}
                <div className="w-16 p-1 flex flex-col gap-2 border-l border-black/5">
                  <div>
                    <div className="text-[7px] text-[#3a4010] uppercase">Score</div>
                    <div className="text-[11px] font-bold text-[#2a3008]">{score}</div>
                  </div>
                  <div>
                    <div className="text-[7px] text-[#3a4010] uppercase">Lines</div>
                    <div className="text-[11px] font-bold text-[#2a3008]">{lines}</div>
                  </div>
                  <div>
                    <div className="text-[7px] text-[#3a4010] uppercase">Level</div>
                    <div className="text-[11px] font-bold text-[#2a3008]">{level}</div>
                  </div>
                  <div>
                    <div className="text-[7px] text-[#3a4010] uppercase mb-1">Next</div>
                    <canvas ref={nextCanvasRef} width={44} height={44} className="w-11 h-11" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[#5a6030] text-[9px] tracking-[3px] mb-3">NOKIA</div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32">
                <button onClick={rotatePiece} className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#2a2a20] rounded-md text-[#8a9a50] flex items-center justify-center active:bg-[#1a1a10] transition-colors shadow-lg">
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button onClick={moveDown} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#2a2a20] rounded-md text-[#8a9a50] flex items-center justify-center active:bg-[#1a1a10] transition-colors shadow-lg">
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button onClick={moveLeft} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#2a2a20] rounded-md text-[#8a9a50] flex items-center justify-center active:bg-[#1a1a10] transition-colors shadow-lg">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={moveRight} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#2a2a20] rounded-md text-[#8a9a50] flex items-center justify-center active:bg-[#1a1a10] transition-colors shadow-lg">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={hardDrop} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[#2a2a20] rounded-full text-[#8a9a50] text-[9px] font-bold active:bg-[#1a1a10] transition-colors shadow-xl border border-[#3a3a2e]">
                  OK
                </button>
              </div>

              <div className="w-full flex justify-between px-2">
                <button onClick={startGame} className="bg-[#2a2a20] rounded-lg px-4 py-2 text-[#8a9a50] text-[11px] tracking-wider active:bg-[#1a1a10] transition-colors shadow-md">
                  START
                </button>
                <button onClick={togglePause} className="bg-[#2a2a20] rounded-lg px-4 py-2 text-[#8a9a50] text-[11px] tracking-wider active:bg-[#1a1a10] transition-colors shadow-md">
                  PAUSE
                </button>
              </div>
            </div>
            
            <div className="text-center text-[#5a6030] text-[7px] mt-4 flex justify-center gap-3">
              <span>↑ ROTATE</span>
              <span>↓ SOFT</span>
              <span>SPACE HARD</span>
              <span>P PAUSE</span>
            </div>
          </div>
        </div>
      </main>

      {/* Info Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-amber-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-950">Classic Gameplay</h3>
            <p className="text-amber-900/70 leading-relaxed">
              Experience the pure joy of the original puzzle phenomenon. No loot boxes, no microtransactions just you and the falling blocks in a nostalgic Nokia shell.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-950">Study Break</h3>
            <p className="text-amber-900/70 leading-relaxed">
              Perfect for a 5-minute mental reset between FocusFlow study sessions. Clear your mind by clearing some lines!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
