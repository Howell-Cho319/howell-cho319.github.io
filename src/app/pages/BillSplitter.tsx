import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Users, Calculator, PieChart, Star, RotateCcw, Plus, Trash2, Edit2, X, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router';

/* ====================================================
   AA BILL SPLITTER — Ported from AA Bill Splitter.html
   ==================================================== */

type Tag = 'male' | 'female' | 'vip' | 'vege' | 'nodrink';
type Mode = 'equal' | 'gender' | 'weight' | 'ordered' | 'host' | 'custom';

interface Person {
  name: string;
  tags: Tag[];
  weight: number;
  amount: number;
  customPct: number;
}

interface LogEntry {
  msg: string;
  type?: 'log-ok' | 'log-warn' | 'log-err';
}

export function BillSplitter() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const [persons, setPersons] = useState<Person[]>([]);
  const [mode, setMode] = useState<Mode>('equal');
  const [billDetails, setBillDetails] = useState({
    restName: '',
    totalBill: 0,
    taxPct: 6,
    discPct: 0,
    tipPct: 0
  });
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [pName, setPName] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([{ msg: lang === 'zh' ? '账本就绪，等待记账…' : 'Ready. Awaiting input…' }]);
  const [results, setResults] = useState<{ shares: Record<string, number>; total: number; rest: string } | null>(null);
  const [showWheel, setShowWheel] = useState(false);
  const [wheelWinner, setWheelWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState<Person | null>(null);

  const wheelCanvasRef = useRef<HTMLCanvasElement>(null);
  const logBoxRef = useRef<HTMLDivElement>(null);
  const wheelAngleRef = useRef(0);

  const T = (zh: string, en: string) => (lang === 'zh' ? zh : en);

  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string, type?: 'log-ok' | 'log-warn' | 'log-err') => {
    setLogs(prev => [...prev, { msg, type }]);
  };

  const handleAddPerson = () => {
    const name = pName.trim();
    if (!name) {
      addLog(T('⚠ 请先输入姓名', '⚠ Enter a name first'), 'log-warn');
      return;
    }
    const newPerson: Person = {
      name,
      tags: [...activeTags],
      weight: 1,
      amount: 0,
      customPct: 0
    };
    setPersons(prev => [...prev, newPerson]);
    setPName('');
    setActiveTags([]);
    addLog(T('✓ 已添加：', '✓ Added: ') + name, 'log-ok');
  };

  const toggleTag = (tag: Tag) => {
    setActiveTags(prev => {
      if (prev.includes(tag)) return prev.filter(t => t !== tag);
      let next = [...prev];
      if (tag === 'male') next = next.filter(t => t !== 'female');
      if (tag === 'female') next = next.filter(t => t !== 'male');
      return [...next, tag];
    });
  };

  const loadDemo = () => {
    const demo: Person[] = [
      { name: T('小明', 'Ming'), tags: ['male'], weight: 1, amount: 0, customPct: 25 },
      { name: T('小红', 'Hong'), tags: ['female'], weight: 1, amount: 0, customPct: 20 },
      { name: T('阿花', 'Hua'), tags: ['female', 'vip'], weight: 1, amount: 0, customPct: 15 },
      { name: T('大伟', 'Wei'), tags: ['male'], weight: 1.5, amount: 0, customPct: 25 },
      { name: T('小芳', 'Fang'), tags: ['female', 'vege'], weight: 0.8, amount: 0, customPct: 15 }
    ];
    setPersons(demo);
    addLog(T('✓ 示例人员已载入', '✓ Demo participants loaded'), 'log-ok');
  };

  const clearAll = () => {
    setPersons([]);
    addLog(T('⚠ 已清空人员列表', '⚠ Cleared all participants'), 'log-warn');
  };

  const removePerson = (i: number) => {
    addLog(T('✕ 移除：', '✕ Removed: ') + persons[i].name, 'log-warn');
    setPersons(prev => prev.filter((_, idx) => idx !== i));
  };

  const updatePerson = (i: number, field: keyof Person, val: any) => {
    setPersons(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: val };
      return next;
    });
  };

  const openEditModal = (i: number) => {
    setEditIdx(i);
    setEditData({ ...persons[i] });
  };

  const saveEdit = () => {
    if (editIdx !== null && editData) {
      setPersons(prev => {
        const next = [...prev];
        next[editIdx] = { ...editData };
        return next;
      });
      setEditIdx(null);
      setEditData(null);
    }
  };

  const calculate = () => {
    setLogs([]);
    addLog(T('开始记账…', 'Calculating…'));
    const { totalBill, taxPct, discPct, tipPct, restName } = billDetails;
    if (totalBill <= 0) {
      addLog(T('✕ 请输入账单金额', '✕ Enter a bill amount'), 'log-err');
      return;
    }
    if (persons.length === 0) {
      addLog(T('✕ 请至少添加一位用餐人员', '✕ Add at least one person'), 'log-err');
      return;
    }

    const after = totalBill * (1 - discPct / 100) * (1 + taxPct / 100) * (1 + tipPct / 100);
    addLog(T('原始：', 'Base: ') + 'RM ' + totalBill.toFixed(2));
    if (discPct > 0) addLog(T('折扣 -', 'Discount -') + discPct + '%');
    if (taxPct > 0) addLog(T('税 +', 'Tax +') + taxPct + '%');
    if (tipPct > 0) addLog(T('小费 +', 'Tip +') + tipPct + '%');
    addLog(T('应付总额：', 'Total payable: ') + 'RM ' + after.toFixed(2), 'log-ok');

    const shares: Record<string, number> = {};
    persons.forEach(p => shares[p.name] = 0);

    if (mode === 'equal') {
      const each = after / persons.length;
      persons.forEach(p => shares[p.name] = each);
    } else if (mode === 'gender') {
      const maleRatio = (document.getElementById('maleRatio') as HTMLInputElement)?.valueAsNumber || 60;
      const femRatio = (document.getElementById('femRatio') as HTMLInputElement)?.valueAsNumber || 40;
      const males = persons.filter(p => p.tags.includes('male'));
      const females = persons.filter(p => p.tags.includes('female'));
      const others = persons.filter(p => !p.tags.includes('male') && !p.tags.includes('female'));
      const sum = maleRatio + femRatio;
      const mPool = after * (maleRatio / sum);
      const fPool = after * (femRatio / sum);
      if (males.length > 0) males.forEach(p => shares[p.name] = mPool / males.length);
      if (females.length > 0) females.forEach(p => shares[p.name] = fPool / females.length);
      if (others.length > 0) {
        const avg = after / persons.length;
        others.forEach(p => shares[p.name] = avg);
      }
    } else if (mode === 'weight') {
      const tw = persons.reduce((a, p) => a + (p.weight || 1), 0);
      persons.forEach(p => shares[p.name] = after * (p.weight || 1) / tw);
    } else if (mode === 'ordered') {
      const filled = persons.filter(p => p.amount > 0);
      const unfilled = persons.filter(p => !(p.amount > 0));
      const usedAmt = filled.reduce((a, p) => a + p.amount, 0);
      const remaining = Math.max(0, after - usedAmt);
      filled.forEach(p => shares[p.name] = p.amount);
      if (unfilled.length > 0) {
        const se = remaining / unfilled.length;
        unfilled.forEach(p => shares[p.name] = se);
      }
    } else if (mode === 'host') {
      const vips = persons.filter(p => p.tags.includes('vip'));
      const payers = persons.filter(p => !p.tags.includes('vip'));
      if (payers.length === 0) {
        addLog(T('✕ 所有人都是贵宾，无人付账', '✕ All are VIPs — no one pays'), 'log-err');
        return;
      }
      const ep = after / payers.length;
      payers.forEach(p => shares[p.name] = ep);
      vips.forEach(p => shares[p.name] = 0);
    } else if (mode === 'custom') {
      const tp = persons.reduce((a, p) => a + (p.customPct || 0), 0);
      if (Math.abs(tp - 100) > 1) addLog(T('⚠ 比例总和=', '⚠ Sum=') + tp.toFixed(1) + '% (' + T('建议为100%', 'should be 100%') + ')', 'log-warn');
      persons.forEach(p => shares[p.name] = after * (p.customPct || 0) / 100);
    }

    setResults({ shares, total: after, rest: restName || T('今日聚餐', 'Dining') });
    addLog(T('✓ 分账完成！', '✓ Split complete!'), 'log-ok');
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('resultSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  useEffect(() => {
    if (showWheel) {
      setTimeout(() => drawWheel(wheelAngleRef.current), 0);
    }
  }, [showWheel, persons, lang]);

  // Wheel Logic
  const avatarColors = ['#8A5F41', '#6B7A2F', '#3A6A8A', '#9A5A7A', '#5A7A5A', '#7A5A8A', '#8A7A3A', '#3A7A8A'];

  const drawWheel = (angle = 0) => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2, r = W / 2 - 6;
    ctx.clearRect(0, 0, W, H);
    if (persons.length === 0) return;
    const n = persons.length;
    const slice = (2 * Math.PI) / n;

    // shadow ring
    ctx.save();
    // @ts-ignore
    ctx.shadowBlur = 16;
    // @ts-ignore
    ctx.shadowColor = 'rgba(138,95,65,0.25)';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI); ctx.fillStyle = '#fff'; ctx.fill();
    ctx.restore();

    // segments
    persons.forEach((p, i) => {
      const start = angle + i * slice - Math.PI / 2;
      const end = start + slice;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, end); ctx.closePath();
      ctx.fillStyle = avatarColors[i % avatarColors.length]; ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5; ctx.stroke();
      // text
      const mid = start + slice / 2;
      const tx = cx + Math.cos(mid) * (r * 0.65);
      const ty = cy + Math.sin(mid) * (r * 0.65);
      ctx.save(); ctx.translate(tx, ty); ctx.rotate(mid + Math.PI / 2);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold ' + (n > 6 ? 10 : 12) + 'px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      // @ts-ignore
      ctx.shadowBlur = 3;
      // @ts-ignore
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.fillText(p.name.charAt(0).toUpperCase(), 0, 0);
      ctx.restore();
    });

    // center cap
    ctx.beginPath(); ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
    ctx.fillStyle = '#FDFAF4'; ctx.fill();
    ctx.strokeStyle = 'rgba(138,95,65,0.5)'; ctx.lineWidth = 2; ctx.stroke();
    // border ring
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(138,95,65,0.3)'; ctx.lineWidth = 2; ctx.stroke();
  };

  const spinWheel = () => {
    if (isSpinning) return;
    if (persons.length < 2) {
      addLog(T('✕ 至少需要 2 位人员才能旋转轮盘', '✕ At least 2 people required to spin'), 'log-err');
      return;
    }
    setIsSpinning(true);
    setWheelWinner(null);

    const n = persons.length;
    const slice = (2 * Math.PI) / n;
    const winnerIdx = Math.floor(Math.random() * n);
    
    // We want the middle of segment winnerIdx to be at the top (-PI/2)
    // The segment i starts at: angle + i*slice - PI/2
    // Its middle is at: angle + i*slice + slice/2 - PI/2
    // We want: angle + winnerIdx*slice + slice/2 - PI/2 = -PI/2
    // angle = -(winnerIdx*slice + slice/2)
    const targetAngle = -(winnerIdx * slice + slice / 2);
    const minRots = 6 * 2 * Math.PI; // at least 6 full turns
    const currentAngle = wheelAngleRef.current % (2 * Math.PI);
    const finalRotation = minRots + (targetAngle - currentAngle) + (targetAngle < currentAngle ? 2 * Math.PI : 0);

    const duration = 4000;
    let startTime: number | null = null;
    const startAngle = wheelAngleRef.current;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4); // smoother decel

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const angle = startAngle + finalRotation * easeOut(progress);
      wheelAngleRef.current = angle;
      drawWheel(angle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWheelWinner(persons[winnerIdx].name);
        addLog(T('轮盘结果：', 'Wheel result: ') + persons[winnerIdx].name + T(' 今天请客！', ' pays today!'), 'log-ok');
        wheelAngleRef.current = angle % (2 * Math.PI);
      }
    };
    requestAnimationFrame(animate);
  };

  const getTagLabel = (t: Tag) => {
    const map = { male: T('♂男', 'M'), female: T('♀女', 'F'), vip: T('贵宾', 'VIP'), vege: T('素食', 'Veg'), nodrink: T('无酒', 'No-drk') };
    return map[t] || t;
  };

  const getTagStyle = (t: Tag) => {
    const s = { male: 'border-color:#3A6A8A;color:#3A6A8A', female: 'border-color:#9A5A7A;color:#7A3A5A', vip: 'border-color:#6B7A2F;color:#4A5A1A', vege: 'border-color:#5A8A4A;color:#3A6A2A', nodrink: 'border-color:#8A5F41;color:#5A3A1A' };
    return s[t] || '';
  };

  return (
    <div className="bill-splitter-page bg-[#F5F0E8] min-h-screen font-serif relative overflow-x-hidden">
      <style>{`
        :root {
          --bg: #F5F0E8;
          --surface: #FDFAF4;
          --border: #E2D9C8;
          --border-md: #C8B99A;
          --ink: #2A1F14;
          --ink-2: #6B5640;
          --ink-3: #9C8470;
          --amber: #8A5F41;
          --amber-2: #A77050;
          --amber-lt: #EDD9BF;
          --olive: #6B7A2F;
          --olive-lt: #D4DC9A;
          --blue: #3A6A8A;
          --blue-lt: #C8DCEA;
          --red: #9A3A3A;
          --red-lt: #EAC8C8;
          --shadow: rgba(42,31,20,0.10);
          --r: 14px;
        }

        .bill-splitter-page {
          color: var(--ink);
          background: var(--bg);
        }

        .bill-splitter-page::after {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 999; opacity: 0.25;
        }

        .card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--r);
          padding: 24px;
          margin-bottom: 16px;
          box-shadow: 0 2px 16px var(--shadow);
          position: relative; overflow: hidden;
        }

        .card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--olive-lt), var(--amber-lt), var(--olive-lt));
        }

        input[type=text], input[type=number], select {
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 9px;
          color: var(--ink);
          font-size: 13px;
          padding: 9px 12px;
          outline: none;
          transition: all 0.15s;
          width: 100%;
        }

        input:focus, select:focus {
          border-color: var(--amber);
          box-shadow: 0 0 0 3px rgba(138,95,65,0.12);
        }

        .btn-bs {
          border: 1.5px solid var(--border);
          border-radius: 9px;
          background: transparent;
          color: var(--ink-2);
          font-family: monospace;
          font-size: 11px; letter-spacing: 0.5px;
          padding: 8px 16px; cursor: pointer; transition: all 0.15s;
          display: inline-flex; align-items: center; gap: 6px;
        }

        .btn-bs:hover { border-color: var(--amber); color: var(--amber); background: var(--amber-lt); }

        .btn-bs.primary {
          background: var(--amber); border-color: var(--amber);
          color: #fff; font-size: 13px;
          padding: 13px 28px; letter-spacing: 1.5px;
          box-shadow: 0 3px 16px rgba(138,95,65,0.3);
        }

        .chip {
          padding: 4px 11px; border: 1.5px solid var(--border);
          border-radius: 20px; font-size: 11px; color: var(--ink-3);
          cursor: pointer; transition: all 0.15s;
          font-family: monospace; background: transparent;
        }
        .chip.on { background: var(--olive-lt); border-color: var(--olive); color: var(--olive); font-weight: 600; }

        .ptag {
          padding: 4px 11px; border-radius: 20px; font-size: 11px;
          border: 1.5px solid; cursor: pointer; transition: all 0.15s;
          font-family: monospace;
        }
        .ptag.male { border-color: var(--blue); color: var(--blue); }
        .ptag.male.on { background: var(--blue); color: #fff; }
        .ptag.female { border-color: #9A5A7A; color: #7A3A5A; }
        .ptag.female.on { background: #9A5A7A; color: #fff; }
        .ptag.vip { border-color: var(--olive); color: var(--olive); }
        .ptag.vip.on { background: var(--olive-lt); color: var(--olive); }
        .ptag.vege { border-color: #5A8A4A; color: #3A6A2A; }
        .ptag.vege.on { background: #8AB87A; color: #fff; }
        .ptag.nodrink { border-color: var(--amber); color: var(--amber-2); }
        .ptag.nodrink.on { background: var(--amber-lt); color: var(--amber); }

        .log-box {
          background: rgba(42,31,20,0.04); border: 1px dashed var(--border-md);
          border-radius: 9px; padding: 10px 13px; margin-top: 10px;
          max-height: 120px; overflow-y: auto;
          font-size: 11px; color: var(--ink-2); font-family: monospace;
        }
        .log-ok { color: var(--olive); }
        .log-warn { color: #B07A20; }
        .log-err { color: var(--red); }

        .mode-card {
          border: 1.5px solid var(--border); border-radius: 11px;
          padding: 14px 10px; cursor: pointer; text-align: center;
          transition: all 0.15s; background: var(--bg);
        }
        .mode-card.active {
          border-color: var(--amber); background: rgba(138,95,65,0.08);
          box-shadow: 0 0 0 3px rgba(138,95,65,0.1);
        }
      `}</style>

      {/* LANG TOGGLE */}
      <div className="fixed top-28 right-5 z-[100] flex bg-[#FDFAF4] border-[1.5px] border-[#E2D9C8] rounded-lg overflow-hidden shadow-md">
        <button onClick={() => setLang('zh')} className={`px-3 py-1.5 text-[11px] font-mono transition-colors ${lang === 'zh' ? 'bg-[#8A5F41] text-white' : 'text-[#9C8470] border-r border-[#E2D9C8]'}`}>中文</button>
        <button onClick={() => setLang('en')} className={`px-3 py-1.5 text-[11px] font-mono transition-colors ${lang === 'en' ? 'bg-[#8A5F41] text-white' : 'text-[#9C8470]'}`}>EN</button>
      </div>

      <div className="max-w-[700px] mx-auto px-5 py-12 pb-20">
        <header className="text-center mb-11">
          <button onClick={() => navigate('/')} className="mb-8 inline-flex items-center gap-2 text-sm text-[#8A5F41] hover:underline">
            <ArrowLeft className="w-4 h-4" /> {T('返回首页', 'Back to Home')}
          </button>
          <div className="w-14 h-14 bg-[#8A5F41] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg shadow-[#8A5F41]/30">
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-serif tracking-wide leading-tight">
            <span className="italic text-[#8A5F41]">{T('食堂账本', 'Bill')}</span> {T('', 'Splitter')}
          </h1>
          <p className="font-mono text-[11px] text-[#9C8470] mt-2 uppercase tracking-[1.5px]">
            {T('AA 制分账 · 与朋友的每一餐，都值得好好计算', 'AA Bill Splitter · Every meal with friends, perfectly settled')}
          </p>
          <div className="flex items-center gap-3 mt-4 opacity-50">
            <div className="h-px flex-1 bg-[#E2D9C8]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8A5F41]" />
            <div className="h-px flex-1 bg-[#E2D9C8]" />
          </div>
        </header>

        {/* STEP 1: BILL INFO */}
        <section className="card">
          <div className="card-accent" />
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#8A5F41] flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-serif tracking-wider">{T('账单信息', 'Bill Details')}</span>
            <span className="ml-auto font-mono text-[10px] text-[#9C8470] tracking-widest">01</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] text-[#9C8470] min-w-[72px]">{T('餐厅名称', 'Venue')}</span>
              <input type="text" value={billDetails.restName} onChange={e => setBillDetails(p => ({ ...p, restName: e.target.value }))} placeholder={T('今天去哪里吃呀…', 'Where are you dining?')} />
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[11px] text-[#9C8470] min-w-[72px] mt-2.5">{T('账单金额', 'Amount')}</span>
              <div className="flex-1 flex items-center gap-1.5">
                <span className="font-mono text-base font-bold text-[#8A5F41]">RM</span>
                <input type="number" value={billDetails.totalBill || ''} onChange={e => setBillDetails(p => ({ ...p, totalBill: e.target.valueAsNumber || 0 }))} placeholder="0.00" className="text-xl font-bold text-[#8A5F41]" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <div className="flex-1 flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#9C8470]">{T('服务税', 'Tax')}</span>
                <input type="number" value={billDetails.taxPct} onChange={e => setBillDetails(p => ({ ...p, taxPct: e.target.valueAsNumber || 0 }))} className="w-16" />
                <span className="font-mono text-[11px] text-[#9C8470]">%</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#9C8470]">{T('折扣', 'Discount')}</span>
                <input type="number" value={billDetails.discPct} onChange={e => setBillDetails(p => ({ ...p, discPct: e.target.valueAsNumber || 0 }))} className="w-16" />
                <span className="font-mono text-[11px] text-[#9C8470]">%</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#9C8470]">{T('小费', 'Tip')}</span>
                <input type="number" value={billDetails.tipPct} onChange={e => setBillDetails(p => ({ ...p, tipPct: e.target.valueAsNumber || 0 }))} className="w-16" />
                <span className="font-mono text-[11px] text-[#9C8470]">%</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="font-mono text-[11px] text-[#9C8470]">{T('快选：', 'Quick:')}</span>
              {[0, 5, 10, 15, 20].map(p => (
                <button key={p} onClick={() => setBillDetails(prev => ({ ...prev, tipPct: p }))} className={`chip ${billDetails.tipPct === p ? 'on' : ''}`}>{p === 0 ? T('无小费', 'No tip') : `${p}%`}</button>
              ))}
            </div>
          </div>
        </section>

        {/* STEP 2: PARTICIPANTS */}
        <section className="card">
          <div className="card-accent" />
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#8A5F41] flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-serif tracking-wider">{T('用餐人员', 'Participants')}</span>
            <span className="ml-auto font-mono text-[10px] text-[#9C8470] tracking-widest">02</span>
          </div>

          <div className="flex gap-2 flex-wrap mb-2.5">
            <input type="text" value={pName} onChange={e => setPName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddPerson()} placeholder={T('输入姓名…', 'Enter name…')} className="flex-1 min-w-[120px]" />
            <button onClick={handleAddPerson} className="btn-bs primary py-2 px-4">
              <Plus className="w-3 h-3" /> {T('添加', 'Add')}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 items-center mb-4">
            <span className="font-mono text-[11px] text-[#9C8470] mr-1">{T('标签：', 'Tags:')}</span>
            {(['male', 'female', 'vip', 'vege', 'nodrink'] as Tag[]).map(t => (
              <button key={t} onClick={() => toggleTag(t)} className={`ptag ${t} ${activeTags.includes(t) ? 'on' : ''}`}>{getTagLabel(t)}</button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            {persons.length === 0 ? (
              <div className="text-center text-[#9C8470] text-xs py-4 font-mono italic">{T('还没有人，快来添加用餐伙伴吧', 'No participants yet — add someone above')}</div>
            ) : (
              persons.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#F5F0E8] border border-[#E2D9C8] rounded-xl p-2.5 group animate-in slide-in-from-left-2 duration-200">
                  <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold font-mono shrink-0" style={{ background: avatarColors[i % avatarColors.length] }}>{p.name.charAt(0).toUpperCase()}</div>
                  <div className="flex-1 min-w-[60px]">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-lg border font-mono" style={{ ...Object.fromEntries(getTagStyle(t).split(';').map(s => s.split(':'))) }}>{getTagLabel(t)}</span>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto">
                    {mode === 'weight' && (
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-[#9C8470] font-mono">×</span>
                        <input type="number" value={p.weight} onChange={e => updatePerson(i, 'weight', e.target.valueAsNumber || 1)} className="w-14 text-center text-xs p-1" />
                      </div>
                    )}
                    {mode === 'ordered' && (
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-[#9C8470] font-mono">RM</span>
                        <input type="number" value={p.amount || ''} onChange={e => updatePerson(i, 'amount', e.target.valueAsNumber || 0)} className="w-16 text-center text-xs p-1" />
                      </div>
                    )}
                    {mode === 'custom' && (
                      <div className="flex items-center gap-1">
                        <input type="number" value={p.customPct || ''} onChange={e => updatePerson(i, 'customPct', e.target.valueAsNumber || 0)} className="w-14 text-center text-xs p-1" />
                        <span className="text-[10px] text-[#9C8470] font-mono">%</span>
                      </div>
                    )}
                    <button onClick={() => openEditModal(i)} className="btn-bs p-1 border-[#3A6A8A] text-[#3A6A8A]"><Edit2 className="w-3 h-3" /></button>
                    <button onClick={() => removePerson(i)} className="btn-bs p-1 border-[#9A3A3A] text-[#9A3A3A]"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={loadDemo} className="btn-bs bg-[#D4DC9A] border-[#6B7A2F] text-[#6B7A2F]"><RefreshCw className="w-3 h-3" /> {T('载入示例', 'Load demo')}</button>
            <button onClick={clearAll} className="btn-bs border-[#EAC8C8] text-[#9A3A3A] hover:bg-[#EAC8C8]"><Trash2 className="w-3 h-3" /> {T('清空', 'Clear all')}</button>
          </div>
        </section>

        {/* STEP 3: SPLIT METHOD */}
        <section className="card">
          <div className="card-accent" />
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#8A5F41] flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-serif tracking-wider">{T('分账方式', 'Split Method')}</span>
            <span className="ml-auto font-mono text-[10px] text-[#9C8470] tracking-widest">03</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'equal', icon: <div className="text-lg">≡</div>, name: T('完全AA', 'Equal Split'), desc: T('人人平等', 'Everyone equal') },
              { id: 'gender', icon: <div className="text-lg">♂♀</div>, name: T('性别比例', 'By Gender'), desc: T('男女不同份额', 'Different rates') },
              { id: 'weight', icon: <div className="text-lg">⚖</div>, name: T('权重分账', 'Weighted'), desc: T('自定义倍数', 'Custom multiplier') },
              { id: 'ordered', icon: <div className="text-lg">✓</div>, name: T('点单分账', 'By Order'), desc: T('谁点谁付', 'Pay what you order') },
              { id: 'host', icon: <div className="text-lg">★</div>, name: T('请客模式', 'Host Mode'), desc: T('VIP全免单', 'VIP dines free') },
              { id: 'custom', icon: <div className="text-lg">✎</div>, name: T('自定义%', 'Custom %'), desc: T('随意分配', 'Free allocation') },
            ].map(m => (
              <div key={m.id} onClick={() => setMode(m.id as Mode)} className={`mode-card ${mode === m.id ? 'active' : ''}`}>
                <div className="text-[#8A5F41] mb-1">{m.icon}</div>
                <div className="font-serif text-[13px]">{m.name}</div>
                <div className="text-[10px] text-[#9C8470] font-mono">{m.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-3 bg-[#6B7A2F]/5 border border-[#D4DC9A] rounded-xl text-xs text-[#6B5640] font-mono">
            {mode === 'gender' && (
              <div className="flex flex-col gap-2">
                <div>{T('设定男女各自总分担比例：', 'Set male/female share ratio:')}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#3A6A8A]">♂ {T('男生', 'Male')}</span>
                  <input id="maleRatio" type="number" defaultValue={60} className="w-16" /> %
                  <span className="text-[#9A5A7A] ml-2">♀ {T('女生', 'Female')}</span>
                  <input id="femRatio" type="number" defaultValue={40} className="w-16" /> %
                </div>
              </div>
            )}
            {mode === 'equal' && T('所有人完全平均分摊账单，最公平的方式。', 'Bill divided equally among all participants.')}
            {mode === 'weight' && T('在人员列表中调整每人的分摊倍数（如 1.5× = 多付50%）', 'Adjust each person\'s multiplier above (e.g. 1.5× = pays 50% more)')}
            {mode === 'ordered' && T('输入每人点单金额，未填金额的人将平摊剩余部分。', 'Enter each order amount; unfilled entries split the remainder.')}
            {mode === 'host' && T('标记为「贵宾」的人将被完全免单，其余人平均承担全部账单。', 'Participants tagged VIP dine free; others split the full bill.')}
            {mode === 'custom' && T('在人员列表中自由填写每人付款比例（总和建议为100%）', 'Set each person\'s percentage above (sum should be 100%)')}
          </div>
        </section>

        {/* STEP 4: CALCULATE */}
        <section className="card">
          <div className="card-accent" />
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#8A5F41] flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-serif tracking-wider">{T('执行计算', 'Calculate')}</span>
            <span className="ml-auto font-mono text-[10px] text-[#9C8470] tracking-widest">04</span>
          </div>
          <button onClick={calculate} className="btn-bs primary w-full font-serif text-base tracking-[2px]">
            {T('开始分账', 'Split Bill')}
          </button>
          <div ref={logBoxRef} className="log-box">
            {logs.map((l, i) => <div key={i} className={l.type}>{l.msg}</div>)}
          </div>
        </section>

        {/* RESULTS SECTION */}
        {results && (
          <section id="resultSection" className="card mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="card-accent" />
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#8A5F41] flex items-center justify-center">
                <PieChart className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-serif tracking-wider">{T('分账结果', 'Split Result')}</span>
              <span className="ml-auto font-mono text-[10px] text-[#9C8470]">Result</span>
            </div>

            <div className="text-center mb-5">
              <h2 className="text-2xl font-serif text-[#2A1F14]">{results.rest}</h2>
              <p className="text-[11px] text-[#9C8470] font-mono mt-1">
                {new Date().toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-MY', { year: 'numeric', month: 'long', day: 'numeric' })} · {persons.length} {T('人聚餐', 'participants')}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {Object.entries(results.shares).sort((a, b) => b[1] - a[1]).map(([name, amt], idx) => {
                const p = persons.find(pp => pp.name === name);
                const maxAmt = Math.max(...Object.values(results.shares));
                const pct = maxAmt > 0 ? (amt / maxAmt) * 100 : 0;
                const isTop = amt === maxAmt && amt > 0;
                const isZero = amt === 0;

                return (
                  <div key={name} className={`flex items-center gap-2.5 p-3 border border-[#E2D9C8] rounded-xl bg-[#FDFAF4] relative overflow-hidden ${isTop ? 'border-l-4 border-l-[#8A5F41]' : isZero ? 'border-l-4 border-l-[#6B7A2F]' : 'border-l-4 border-l-[#D4DC9A]'}`}>
                    <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-bold font-mono shrink-0" style={{ background: avatarColors[(persons.findIndex(pp => pp.name === name)) % avatarColors.length] }}>{name.charAt(0).toUpperCase()}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{name} {isTop && '◆'}</div>
                      <div className="flex gap-1">
                        {p?.tags.map(t => <span key={t} className="text-[9px] px-1 py-0 border border-[#E2D9C8] rounded-md text-[#9C8470] font-mono">{getTagLabel(t)}</span>)}
                      </div>
                      <div className="h-[3px] bg-[#E2D9C8] rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#D4DC9A] to-[#EDD9BF] transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className={`font-serif text-xl text-[#8A5F41] ${isZero ? 'text-sm text-[#6B7A2F] font-mono' : ''}`}>
                      {isZero ? T('◎ 免单', '◎ Free') : `RM ${amt.toFixed(2)}`}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center p-3.5 mt-2.5 bg-[#8A5F41] rounded-xl text-white">
              <span className="text-[11px] opacity-80 font-mono tracking-wider">{T('账单总额（含税费小费）', 'Total (incl. tax & tip)')}</span>
              <span className="font-serif text-2xl">RM {results.total.toFixed(2)}</span>
            </div>

            {/* WC BAR */}
            <div className="flex h-3 rounded-full overflow-hidden mt-3 border border-[#E2D9C8]">
              {Object.entries(results.shares).sort((a, b) => b[1] - a[1]).map(([name, amt], i) => {
                const pct = results.total > 0 ? (amt / results.total) * 100 : 0;
                if (pct < 0.5) return null;
                // find original index of person for color
                const pIdx = persons.findIndex(p => p.name === name);
                return (
                  <div key={name} className="flex items-center justify-center text-[8px] text-white font-mono font-bold transition-all duration-700" style={{ width: `${pct}%`, background: avatarColors[pIdx % avatarColors.length], textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {pct >= 8 ? name.charAt(0).toUpperCase() : ''}
                  </div>
                );
              })}
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
              {[
                { label: T('最多', 'Max'), val: Math.max(...Object.values(results.shares)), color: 'text-[#8A5F41]' },
                { label: T('最少', 'Min'), val: Math.min(...Object.values(results.shares)), color: 'text-[#6B7A2F]' },
                { label: T('人均', 'Avg'), val: results.total / persons.length, color: 'text-[#6B5640]' },
                { label: T('差额', 'Gap'), val: Math.max(...Object.values(results.shares)) - Math.min(...Object.values(results.shares)), color: 'text-[#9C8470]' },
              ].map(s => (
                <div key={s.label} className="bg-[#F5F0E8] border border-[#E2D9C8] rounded-xl p-2 text-center">
                  <div className="text-[9px] text-[#9C8470] uppercase tracking-wider mb-1 font-mono">{s.label}</div>
                  <div className={`font-serif text-base ${s.color}`}>RM {s.val.toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button onClick={() => setShowWheel(true)} className="btn-bs border-[#8A5F41] text-[#8A5F41] text-xs px-6 py-2.5">
                <RotateCcw className="w-3.5 h-3.5" /> {T('随机轮盘 · 谁来付钱？', 'Spin the Wheel · Who pays?')}
              </button>
            </div>
          </section>
        )}
      </div>

      {/* WHEEL MODAL */}
      {showWheel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-5" onClick={() => !isSpinning && setShowWheel(false)}>
          <div className="bg-[#FDFAF4] border-[1.5px] border-[#E2D9C8] rounded-[20px] p-7 pt-9 max-w-[400px] w-full text-center shadow-2xl relative animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowWheel(false)} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full border border-[#E2D9C8] bg-[#F5F0E8] flex items-center justify-center text-[#9C8470] hover:bg-[#EAC8C8] hover:text-[#9A3A3A] transition-colors">✕</button>
            <h2 className="font-serif text-xl text-[#2A1F14] mb-1">{T('命运之轮', "Fate's Wheel")}</h2>
            <p className="font-mono text-[10px] text-[#9C8470] tracking-wider mb-5">{T('谁来买单？让老天爷决定', 'Who pays? Let fate decide')}</p>
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[22px] border-t-[#8A5F41] mx-auto mb-1.5 drop-shadow-md" />
            <canvas ref={wheelCanvasRef} width={280} height={280} className="mx-auto rounded-full shadow-lg" />
            <div className="flex gap-2 justify-center mt-4">
              <button onClick={spinWheel} disabled={isSpinning} className="btn-bs primary py-3 px-7 text-sm font-serif">
                <RotateCcw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} /> {T('旋转！', 'Spin!')}
              </button>
              <button onClick={() => setShowWheel(false)} className="btn-bs py-3 px-7">{T('关闭', 'Close')}</button>
            </div>
            {wheelWinner && (
              <div className="mt-4 p-3.5 bg-[#EDD9BF] border-[1.5px] border-[#8A5F41] rounded-xl animate-in fade-in duration-300">
                <div className="font-serif text-3xl text-[#8A5F41] mb-0.5">{wheelWinner}</div>
                <div className="font-mono text-[11px] text-[#9C8470]">{T('恭喜！今天你请客了 🎊', "Congratulations! You're treating today 🎊")}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editIdx !== null && editData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] flex items-center justify-center p-5" onClick={() => setEditIdx(null)}>
          <div className="bg-[#FDFAF4] border-[1.5px] border-[#E2D9C8] rounded-[20px] p-7 max-w-[380px] w-full shadow-2xl relative animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <button onClick={() => setEditIdx(null)} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full border border-[#E2D9C8] bg-[#F5F0E8] flex items-center justify-center text-[#9C8470] hover:bg-[#EAC8C8] transition-colors">✕</button>
            <h2 className="font-serif text-lg text-[#2A1F14] mb-4.5">{T('编辑人员', 'Edit Participant')}</h2>
            <div className="text-[11px] font-mono text-[#9C8470] mb-1">{T('姓名', 'Name')}</div>
            <input type="text" value={editData.name} onChange={e => setEditData(p => p ? ({ ...p, name: e.target.value }) : null)} className="mb-4" />
            <div className="text-[11px] font-mono text-[#9C8470] mb-1">{T('标签', 'Tags')}</div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(['male', 'female', 'vip', 'vege', 'nodrink'] as Tag[]).map(t => (
                <button key={t} onClick={() => setEditData(p => {
                  if (!p) return null;
                  let nextTags = p.tags.includes(t) ? p.tags.filter(tt => tt !== t) : [...p.tags, t];
                  if (!p.tags.includes(t)) {
                    if (t === 'male') nextTags = nextTags.filter(tt => tt !== 'female');
                    if (t === 'female') nextTags = nextTags.filter(tt => tt !== 'male');
                  }
                  return { ...p, tags: nextTags };
                })} className={`ptag ${t} ${editData.tags.includes(t) ? 'on' : ''}`}>{getTagLabel(t)}</button>
              ))}
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button onClick={() => setEditIdx(null)} className="btn-bs text-[#9A3A3A] border-[#EAC8C8]">{T('取消', 'Cancel')}</button>
              <button onClick={saveEdit} className="btn-bs primary py-2 px-5"><Star className="w-3 h-3" /> {T('保存', 'Save')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
