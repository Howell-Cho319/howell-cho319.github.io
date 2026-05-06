import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

/* ====================================================
   RAPID ROLL — Authentic Nokia logic ported to React
   ==================================================== */

const BALL_R       = 9;
const PLAT_H       = 7;
const HUD_H        = 24;
const PLAT_GAP     = 58;
const MOVE_ACCEL   = 0.55;
const MOVE_MAX     = 3.2;
const FRICTION     = 0.78;
const GRAVITY      = 0.32;
const MAX_FALL     = 9;

const MODES = {
  EASY:   { start: 0.8,  max: 2.5, ramp: 0.00010 },
  NORMAL: { start: 1.05, max: 3.6, ramp: 0.00014 },
  HARD:   { start: 1.4,  max: 5.0, ramp: 0.00022 },
};

type ModeKey = keyof typeof MODES;

const PLAT_COLORS = [
  ['#ff5e3a', '#ff8a65'],
  ['#22bb6e', '#4dd690'],
  ['#2277e8', '#55aaff'],
  ['#9933cc', '#c066ee'],
  ['#dd8800', '#ffbb33'],
  ['#e81e7a', '#f566b0'],
  ['#00a8cc', '#33d4e8'],
  ['#888833', '#cccc44'],
];

enum GameState { TITLE, PLAYING, PAUSED, DEAD }

export function RapidRoll() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<GameState>(GameState.TITLE);
  const [mode, setMode] = useState<ModeKey>('NORMAL');
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [lives, setLives] = useState(3);

  // Use refs for values that change frequently to avoid re-renders during game loop
  const gameRef = useRef({
    ball: { x: 154, y: 154, vx: 0, vy: 0, onPlat: false },
    platforms: [] as any[],
    scrollSpeed: MODES.NORMAL.start,
    frameCount: 0,
    scoreTimer: 0,
    shakeFrames: 0,
    titleTick: 0,
    deathCause: '' as 'bottom' | 'crush' | 'spike' | '',
    keys: {} as Record<string, boolean>,
    leftHeld: false,
    rightHeld: false
  });

  const W = 308;
  const H = 308;

  const buildSlab = (x: number, w: number, wy: number, ci: number, hasSpike: boolean) => {
    let spikeX = 0;
    if (hasSpike && w > BALL_R * 4) {
      spikeX = x + BALL_R * 1.5 + Math.random() * (w - BALL_R * 3);
    } else {
      hasSpike = false;
    }
    return { x, w, wy, ci, hasSpike, spikeX };
  };

  const spawnRow = (wy: number, currentScore: number) => {
    const margin = BALL_R * 2 + 10;
    const maxGap = Math.min(W * 0.5, 140);
    const gapW = margin + Math.random() * (maxGap - margin);
    const gapX = 4 + Math.random() * (W - gapW - 8);
    const ci = Math.floor(Math.random() * PLAT_COLORS.length);
    const useSpike = currentScore > 25 && Math.random() < 0.20;

    const result = [];
    if (gapX > 8) result.push(buildSlab(0, gapX, wy, ci, false));
    const rx = gapX + gapW;
    if (W - rx > 8) result.push(buildSlab(rx, W - rx, wy, ci, useSpike));
    return result;
  };

  const initPlatforms = () => {
    const plats = [];
    for (let row = 0; row < 7; row++) {
      plats.push(...spawnRow(HUD_H + 30 + row * PLAT_GAP, 0));
    }
    gameRef.current.platforms = plats;
  };

  const ensurePlatforms = () => {
    let plats = gameRef.current.platforms;
    let lowestWY = Math.max(...plats.map(p => p.wy));
    while (lowestWY < H + PLAT_GAP) {
      lowestWY += PLAT_GAP;
      plats.push(...spawnRow(lowestWY, score));
    }
    gameRef.current.platforms = plats.filter(p => p.wy > -PLAT_H - 10);
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    gameRef.current.scrollSpeed = MODES[mode].start;
    gameRef.current.frameCount = 0;
    gameRef.current.scoreTimer = 0;
    gameRef.current.shakeFrames = 0;
    initPlatforms();

    const startPlat = gameRef.current.platforms
      .filter(p => p.wy > HUD_H + PLAT_GAP * 1.2)
      .sort((a, b) => a.wy - b.wy)[0];

    gameRef.current.ball = {
      x: startPlat ? startPlat.x + startPlat.w / 2 : W / 2,
      y: startPlat ? startPlat.wy - BALL_R : HUD_H + PLAT_GAP * 1.5,
      vx: 0,
      vy: 0,
      onPlat: true
    };
    setState(GameState.PLAYING);
  };

  const doLoseLife = (cause: 'bottom' | 'crush' | 'spike') => {
    gameRef.current.shakeFrames = 16;
    gameRef.current.deathCause = cause;
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      if (score > hiScore) setHiScore(score);
      setState(GameState.DEAD);
      return;
    }

    const safe = gameRef.current.platforms
      .filter(p => p.wy > H * 0.55 && p.wy < H * 0.85)
      .sort((a, b) => b.wy - a.wy)[0];

    gameRef.current.ball = {
      x: safe ? safe.x + safe.w / 2 : W / 2,
      y: safe ? safe.wy - BALL_R : H * 0.65,
      vx: 0,
      vy: 0,
      onPlat: false
    };
  };

  const update = () => {
    if (state === GameState.TITLE) {
      gameRef.current.titleTick++;
      return;
    }
    if (state !== GameState.PLAYING) return;

    gameRef.current.frameCount++;
    const currentMode = MODES[mode];
    gameRef.current.scrollSpeed = Math.min(currentMode.max, currentMode.start + gameRef.current.frameCount * currentMode.ramp);

    const { ball, platforms, keys, leftHeld, rightHeld } = gameRef.current;
    const goLeft = leftHeld || keys['ArrowLeft'] || keys['a'] || keys['A'];
    const goRight = rightHeld || keys['ArrowRight'] || keys['d'] || keys['D'];

    if (goLeft) {
      ball.vx -= MOVE_ACCEL;
      if (ball.vx < -MOVE_MAX) ball.vx = -MOVE_MAX;
    } else if (goRight) {
      ball.vx += MOVE_ACCEL;
      if (ball.vx > MOVE_MAX) ball.vx = MOVE_MAX;
    } else {
      ball.vx *= FRICTION;
      if (Math.abs(ball.vx) < 0.05) ball.vx = 0;
    }

    platforms.forEach(p => p.wy -= gameRef.current.scrollSpeed);
    ensurePlatforms();

    if (!ball.onPlat) {
      ball.vy += GRAVITY;
      if (ball.vy > MAX_FALL) ball.vy = MAX_FALL;
    } else {
      ball.y -= gameRef.current.scrollSpeed;
      ball.vy = 0;
    }

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x + BALL_R < 0) ball.x = W + BALL_R;
    if (ball.x - BALL_R > W) ball.x = -BALL_R;

    ball.onPlat = false;
    for (let p of platforms) {
      const inX = ball.x + BALL_R * 0.7 > p.x && ball.x - BALL_R * 0.7 < p.x + p.w;
      if (!inX) continue;
      const ballBottom = ball.y + BALL_R;
      const tolerance = gameRef.current.scrollSpeed + ball.vy + 3;
      if (ball.vy >= -0.1 && ballBottom >= p.wy && ballBottom <= p.wy + PLAT_H + tolerance) {
        if (p.hasSpike && Math.abs(ball.x - p.spikeX) < BALL_R + 4) {
          doLoseLife('spike');
          return;
        }
        ball.y = p.wy - BALL_R;
        ball.vy = 0;
        ball.onPlat = true;
        break;
      }
    }

    gameRef.current.scoreTimer++;
    if (gameRef.current.scoreTimer >= 38) {
      gameRef.current.scoreTimer = 0;
      setScore(s => s + 1);
    }

    if (ball.y - BALL_R > H + 10) {
      doLoseLife('bottom');
      return;
    }
    if (ball.y - BALL_R < HUD_H && ball.onPlat) {
      doLoseLife('crush');
      return;
    }

    if (gameRef.current.shakeFrames > 0) gameRef.current.shakeFrames--;
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, W, H);
    
    // Background
    const currentMode = MODES[mode];
    const t = Math.min(1, (gameRef.current.scrollSpeed - currentMode.start) / (currentMode.max - currentMode.start));
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    const lerp = (c1: string, c2: string, t: number) => {
      const p = (s: string, i: number) => parseInt(s.slice(i, i+2), 16);
      const r = Math.round(p(c1,1) + (p(c2,1) - p(c1,1)) * t);
      const g = Math.round(p(c1,3) + (p(c2,3) - p(c1,3)) * t);
      const b = Math.round(p(c1,5) + (p(c2,5) - p(c1,5)) * t);
      return `rgb(${r},${g},${b})`;
    };
    grad.addColorStop(0, lerp('#4488cc', '#995522', t * 0.5));
    grad.addColorStop(1, lerp('#aaddff', '#ffdd88', t * 0.4));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Platforms
    gameRef.current.platforms.forEach(p => {
      const [c1, c2] = PLAT_COLORS[p.ci % PLAT_COLORS.length];
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.beginPath();
      // @ts-ignore
      ctx.roundRect(p.x + 2, p.wy + 5, p.w, PLAT_H, 4);
      ctx.fill();
      const grd = ctx.createLinearGradient(0, p.wy, 0, p.wy + PLAT_H);
      grd.addColorStop(0, c2);
      grd.addColorStop(1, c1);
      ctx.fillStyle = grd;
      ctx.beginPath();
      // @ts-ignore
      ctx.roundRect(p.x, p.wy, p.w, PLAT_H, 4);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillRect(p.x + 4, p.wy + 1, p.w - 8, 2);

      if (p.hasSpike) {
        ctx.fillStyle = '#ff1a1a';
        ctx.beginPath();
        ctx.moveTo(p.spikeX, p.wy - 12);
        ctx.lineTo(p.spikeX - 6, p.wy);
        ctx.lineTo(p.spikeX + 6, p.wy);
        ctx.fill();
      }
    });

    // Ball
    const { x, y } = gameRef.current.ball;
    
    // Cast shadow on nearest platform below
    let nearestY = null;
    for (const p of gameRef.current.platforms) {
      if (p.wy > y + BALL_R && x > p.x && x < p.x + p.w) {
        if (nearestY === null || p.wy < nearestY) nearestY = p.wy;
      }
    }
    if (nearestY !== null) {
      const dist = nearestY - y - BALL_R;
      const alpha = Math.max(0, 0.4 - dist / 120);
      ctx.fillStyle = `rgba(0,0,0,${alpha.toFixed(2)})`;
      ctx.beginPath();
      ctx.ellipse(x, nearestY, BALL_R * 0.85, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const ballGrd = ctx.createRadialGradient(x - 3, y - 3, 2, x, y, BALL_R);
    ballGrd.addColorStop(0, '#ffffff');
    ballGrd.addColorStop(0.3, '#ffdd44');
    ballGrd.addColorStop(1, '#cc9900');
    ctx.fillStyle = ballGrd;
    ctx.beginPath();
    ctx.arc(x, y, BALL_R, 0, Math.PI * 2);
    ctx.fill();

    // Primary shine
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    ctx.ellipse(x - 3, y - 3.5, 3.5, 2.5, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Speed bar
    const spdT = Math.min(1, (gameRef.current.scrollSpeed - currentMode.start) / (currentMode.max - currentMode.start));
    const bw = Math.round(W * spdT);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, H - 4, W, 4);
    const r = Math.round(spdT < 0.5 ? 60 + spdT * 2 * 180 : 240);
    const g = Math.round(spdT < 0.5 ? 200 : 200 - (spdT - 0.5) * 2 * 180);
    ctx.fillStyle = `rgb(${r},${g},50)`;
    ctx.fillRect(0, H - 4, bw, 4);

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, W, HUD_H);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, HUD_H, W, 1);

    ctx.fillStyle = '#fffde7';
    ctx.font = '11px "Share Tech Mono"';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE ' + String(score).padStart(4, '0'), 8, 15);

    ctx.fillStyle = 'rgba(255,253,200,0.45)';
    ctx.font = '9px "Share Tech Mono"';
    ctx.textAlign = 'center';
    ctx.fillText('BEST ' + hiScore, W / 2, 15);

    // Hearts
    const drawHeart = (hx: number, hy: number, hr: number) => {
      ctx.save();
      ctx.translate(hx, hy);
      ctx.beginPath();
      ctx.moveTo(0, hr * 0.3);
      ctx.bezierCurveTo(-hr * 0.1, -hr * 0.5, -hr * 1.1, hr * 0.2, 0, hr * 1.2);
      ctx.bezierCurveTo(hr * 1.1, hr * 0.2, hr * 0.1, -hr * 0.5, 0, hr * 0.3);
      ctx.fill();
      ctx.restore();
    };

    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < lives ? '#ff3b3b' : 'rgba(255,60,60,0.15)';
      drawHeart(W - 14 - i * 18, 12, 6);
    }

    // Danger flash at top
    const { ball } = gameRef.current;
    if (ball && ball.y - BALL_R < HUD_H + 36) {
      const intensity = Math.max(0, 1 - (ball.y - BALL_R - HUD_H) / 36);
      ctx.fillStyle = `rgba(255,50,0,${(intensity * 0.3).toFixed(2)})`;
      ctx.fillRect(0, HUD_H, W, 14);
    }

    ctx.textAlign = 'left';

    // Overlays
    if (state === GameState.TITLE) {
      // Deep space bg
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#090920');
      bg.addColorStop(1, '#180828');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Stars
      const tick = gameRef.current.titleTick;
      for (let i = 0; i < 65; i++) {
        const tx = (i * 83.7 + tick * 0.25) % W;
        const ty = (i * 59.3) % (H * 0.75);
        const a = 0.35 + 0.65 * Math.abs(Math.sin(tick * 0.05 + i * 0.8));
        ctx.fillStyle = `rgba(255,255,220,${a.toFixed(2)})`;
        ctx.fillRect(Math.round(tx), Math.round(ty), 1, 1);
      }

      // Bouncing ball demo
      const dby = H * 0.56 + Math.sin(tick * 0.065) * 16;
      const dg = ctx.createRadialGradient(W / 2 - 3, dby - 3, 1, W / 2, dby, 9);
      dg.addColorStop(0, '#ff9999');
      dg.addColorStop(1, '#cc0000');
      ctx.fillStyle = dg;
      ctx.beginPath();
      ctx.arc(W / 2, dby, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.ellipse(W / 2 - 3, dby - 3, 3, 2, -0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.textAlign = 'center';
      // @ts-ignore
      ctx.shadowColor = '#ff6600';
      // @ts-ignore
      ctx.shadowBlur = 22;
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 23px "Press Start 2P"';
      ctx.fillText('RAPID', W / 2, H * 0.21);
      ctx.fillText('ROLL', W / 2, H * 0.33);
      // @ts-ignore
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(255,215,0,0.45)';
      ctx.font = '7px "Press Start 2P"';
      ctx.fillText('NOKIA  EDITION', W / 2, H * 0.42);

      // Difficulty Selection UI
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px "Press Start 2P"';
      const modes: ModeKey[] = ['EASY', 'NORMAL', 'HARD'];
      modes.forEach((m, i) => {
        const isSelected = mode === m;
        ctx.fillStyle = isSelected ? '#ffd700' : 'rgba(255,255,255,0.4)';
        if (isSelected) {
          ctx.fillText(`> ${m} <`, W / 2, H * 0.55 + i * 18);
        } else {
          ctx.fillText(m, W / 2, H * 0.55 + i * 18);
        }
      });

      ctx.fillStyle = '#ffffff';
      ctx.font = '9px "Share Tech Mono"';
      if (Math.floor(tick / 28) % 2 === 0)
        ctx.fillText('PRESS START / OK', W / 2, H * 0.85);

      ctx.fillStyle = 'rgba(255,253,200,0.38)';
      ctx.font = '9px "Share Tech Mono"';
      ctx.fillText('BEST: ' + hiScore, W / 2, H * 0.92);

    } else if (state === GameState.PAUSED) {
      ctx.fillStyle = 'rgba(0,0,0,0.62)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffd700';
      ctx.font = '13px "Press Start 2P"';
      ctx.fillText('PAUSED', W / 2, H * 0.35);

      // Difficulty Selection UI
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px "Press Start 2P"';
      const modes: ModeKey[] = ['EASY', 'NORMAL', 'HARD'];
      modes.forEach((m, i) => {
        const isSelected = mode === m;
        ctx.fillStyle = isSelected ? '#ffd700' : 'rgba(255,255,255,0.4)';
        if (isSelected) {
          ctx.fillText(`> ${m} <`, W / 2, H * 0.50 + i * 18);
        } else {
          ctx.fillText(m, W / 2, H * 0.50 + i * 18);
        }
      });

      ctx.fillStyle = '#ffffff';
      ctx.font = '9px "Share Tech Mono"';
      ctx.fillText('PRESS OK / START TO RESTART', W / 2, H * 0.82);
      ctx.fillText('PRESS P TO RESUME', W / 2, H * 0.88);
    } else if (state === GameState.DEAD) {
      ctx.fillStyle = 'rgba(6,0,0,0.80)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';

      const blink = Math.floor(Date.now() / 340) % 2;
      // @ts-ignore
      ctx.shadowColor = '#ff0000';
      // @ts-ignore
      ctx.shadowBlur = blink ? 20 : 6;
      ctx.fillStyle = blink ? '#ff4444' : '#bb1111';
      ctx.font = '13px "Press Start 2P"';
      ctx.fillText('GAME OVER', W / 2, H * 0.27);
      // @ts-ignore
      ctx.shadowBlur = 0;

      const causeText = { bottom: 'YOU FELL!', crush: 'CRUSHED!', spike: 'SPIKED!', '': '' };
      ctx.fillStyle = 'rgba(255,180,120,0.85)';
      ctx.font = '8px "Press Start 2P"';
      ctx.fillText(causeText[gameRef.current.deathCause] || '', W / 2, H * 0.37);

      ctx.fillStyle = '#ffd700';
      ctx.font = '9px "Press Start 2P"';
      ctx.fillText('SCORE', W / 2, H * 0.49);
      ctx.font = '14px "Press Start 2P"';
      ctx.fillText(String(score).padStart(4, '0'), W / 2, H * 0.59);

      if (score > 0 && score >= hiScore) {
        const b2 = Math.floor(Date.now() / 420) % 2;
        ctx.fillStyle = b2 ? '#ffd700' : 'rgba(255,215,0,0.4)';
        ctx.font = '7px "Press Start 2P"';
        ctx.fillText('★ NEW RECORD ★', W / 2, H * 0.68);
      }

      ctx.fillStyle = 'rgba(255,253,200,0.38)';
      ctx.font = '9px "Share Tech Mono"';
      ctx.fillText('BEST: ' + hiScore, W / 2, H * 0.76);

      ctx.fillStyle = '#ffffff';
      ctx.font = '9px "Share Tech Mono"';
      if (Math.floor(Date.now() / 480) % 2)
        ctx.fillText('PRESS START / OK', W / 2, H * 0.88);
    }
    ctx.textAlign = 'left';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key] = true;
      if (e.key === 'p' || e.key === 'P') {
        setState(s => s === GameState.PLAYING ? GameState.PAUSED : s === GameState.PAUSED ? GameState.PLAYING : s);
      }
      if (e.key === 'Enter' || e.key === ' ') {
        if (state === GameState.TITLE || state === GameState.DEAD || state === GameState.PAUSED) startGame();
      }
      if (state === GameState.TITLE || state === GameState.PAUSED) {
        const modes: ModeKey[] = ['EASY', 'NORMAL', 'HARD'];
        const currentIndex = modes.indexOf(mode);
        if (e.key === 'ArrowUp' || e.key === 'w') {
          const nextIndex = (currentIndex - 1 + modes.length) % modes.length;
          setMode(modes[nextIndex]);
        }
        if (e.key === 'ArrowDown' || e.key === 's') {
          const nextIndex = (currentIndex + 1) % modes.length;
          setMode(modes[nextIndex]);
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => gameRef.current.keys[e.key] = false;
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [state, score, hiScore, lives, mode]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    let animFrame: number;
    const loop = () => {
      update();
      draw(ctx);
      animFrame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animFrame);
  }, [state, score, lives, mode]);

  const handleUp = () => {
    if (state === GameState.TITLE || state === GameState.PAUSED) {
      const modes: ModeKey[] = ['EASY', 'NORMAL', 'HARD'];
      const currentIndex = modes.indexOf(mode);
      const nextIndex = (currentIndex - 1 + modes.length) % modes.length;
      setMode(modes[nextIndex]);
    }
  };

  const handleDown = () => {
    if (state === GameState.TITLE || state === GameState.PAUSED) {
      const modes: ModeKey[] = ['EASY', 'NORMAL', 'HARD'];
      const currentIndex = modes.indexOf(mode);
      const nextIndex = (currentIndex + 1) % modes.length;
      setMode(modes[nextIndex]);
    }
  };

  return (
    <div className="bg-[#fdfcfb] text-[#4a4238] font-sans flex flex-col">
      <header className="max-w-4xl mx-auto w-full px-6 py-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-amber-900/60 hover:text-amber-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="text-xl font-bold tracking-tight">Rapid Roll</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-[340px] bg-gradient-to-b from-[#42412e] via-[#2d2c1d] to-[#1f1e12] rounded-[38px] p-4 pb-6 shadow-2xl phone-bezel">
          <div className="flex gap-1 justify-center mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="w-[3px] h-4 bg-black/50 rounded-sm shadow-inner" />
            ))}
          </div>
          
          <div className="bg-[#0a0a06] rounded-xl p-2 shadow-inner relative screen-inner-bezel">
            <canvas 
              ref={canvasRef} 
              width={W} 
              height={H} 
              className="block rounded-md w-full image-pixelated"
            />
          </div>

          <div className="text-center font-mono text-[10px] tracking-[5px] text-[#c8c382]/30 my-3">N O K I A</div>

          <div className="flex flex-col items-center gap-1 mb-4">
            <div className="flex gap-1">
              <div className="w-12 h-12" />
              <button 
                onClick={handleUp}
                className="w-12 h-12 bg-gradient-to-br from-[#303022] to-[#1c1c10] rounded-xl flex items-center justify-center text-[#beba6e]/60 active:translate-y-1 shadow-lg border-none cursor-pointer"
              >∧</button>
              <div className="w-12 h-12" />
            </div>
            <div className="flex gap-1">
              <button 
                onMouseDown={() => gameRef.current.leftHeld = true}
                onMouseUp={() => gameRef.current.leftHeld = false}
                onTouchStart={() => gameRef.current.leftHeld = true}
                onTouchEnd={() => gameRef.current.leftHeld = false}
                className="w-12 h-12 bg-gradient-to-br from-[#303022] to-[#1c1c10] rounded-xl flex items-center justify-center text-[#beba6e]/60 active:translate-y-1 shadow-lg border-none cursor-pointer"
              >‹</button>
              <button onClick={() => { if (state === GameState.TITLE || state === GameState.DEAD || state === GameState.PAUSED) startGame(); }} className="w-12 h-12 bg-gradient-to-br from-[#303022] to-[#1c1c10] rounded-full flex items-center justify-center text-[#beba6e]/60 active:translate-y-1 shadow-lg text-[10px] border-none cursor-pointer">OK</button>
              <button 
                onMouseDown={() => gameRef.current.rightHeld = true}
                onMouseUp={() => gameRef.current.rightHeld = false}
                onTouchStart={() => gameRef.current.rightHeld = true}
                onTouchEnd={() => gameRef.current.rightHeld = false}
                className="w-12 h-12 bg-gradient-to-br from-[#303022] to-[#1c1c10] rounded-xl flex items-center justify-center text-[#beba6e]/60 active:translate-y-1 shadow-lg border-none cursor-pointer"
              >›</button>
            </div>
            <div className="flex gap-1">
              <div className="w-12 h-12" />
              <button 
                onClick={handleDown}
                className="w-12 h-12 bg-gradient-to-br from-[#303022] to-[#1c1c10] rounded-xl flex items-center justify-center text-[#beba6e]/60 active:translate-y-1 shadow-lg border-none cursor-pointer"
              >∨</button>
              <div className="w-12 h-12" />
            </div>
          </div>

          <div className="flex justify-between px-1 mb-3">
            <button onClick={startGame} className="w-[108px] h-10 bg-gradient-to-br from-[#303022] to-[#1c1c10] rounded-xl text-[#beba6e]/60 text-[10px] tracking-widest active:translate-y-1 shadow-lg border-none cursor-pointer">START</button>
            <button onClick={() => setState(s => s === GameState.PLAYING ? GameState.PAUSED : s === GameState.PAUSED ? GameState.PLAYING : s)} className="w-[108px] h-10 bg-gradient-to-br from-[#303022] to-[#1c1c10] rounded-xl text-[#beba6e]/60 text-[10px] tracking-widest active:translate-y-1 shadow-lg border-none cursor-pointer">PAUSE</button>
          </div>

          <div className="text-center text-[8px] tracking-wider text-[#b4af64]/20 uppercase">← → MOVE · P PAUSE · START / OK</div>
        </div>
      </main>

      <section className="max-w-4xl mx-auto w-full px-6 py-16 border-t border-amber-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-950">Classic Rapid Roll</h3>
            <p className="text-amber-900/70 leading-relaxed">
              The addictive platform survival game from the Nokia era. Keep the ball on the platforms as they move up, avoiding the spikes at the top and the bottomless pit.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-950">Survival Challenge</h3>
            <p className="text-amber-900/70 leading-relaxed">
              Experience the high-speed survival challenge. Use Left and Right to guide the ball through the maze of platforms. How long can you survive?
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .phone-bezel::before {
          content: ''; position: absolute; inset: 0; border-radius: 38px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='1' height='1' fill='rgba(255,255,255,0.015)'/%3E%3C/svg%3E");
          pointer-events: none;
        }
        .screen-inner-bezel::after {
          content: ''; position: absolute; top: 8px; left: 8px; right: 8px; height: 40%;
          background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%);
          border-radius: 8px 8px 0 0; pointer-events: none; z-index: 10;
        }
        .image-pixelated {
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
}
