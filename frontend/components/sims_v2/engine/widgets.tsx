'use client';
/**
 * sims_v2 manipulative widgets — controlled components.
 *
 * Each widget reports its state via onChange(state) so the engine can
 * VALIDATE interact challenges — no more "press Done without doing it".
 * validate strings in SimDef.interactGoal.validate look like:
 *   'clock:hour=9,mins=0'   'tray:count=12'   'numberline:pos=7'
 *
 * Widgets stay pure visual + state. Scoring lives in SimPlayer.
 */
import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import type { ComponentType } from 'react';

export interface WidgetProps {
    onChange?: (state: Record<string, number>) => void;
    /** freeze interaction during challenge review */
    locked?: boolean;
    /** node/chapter-specific labels — [0] is the writing prompt topic for writer */
    labels?: string[];
}

// ─── ClockFace ───────────────────────────────────────────────
export function ClockFace({ onChange, locked }: WidgetProps) {
    const [mins, setMins] = useState(0);
    const [hour, setHour] = useState(7);
    useEffect(() => { onChange?.({ hour, mins }); }, [hour, mins, onChange]);
    const hourDeg = (hour % 12) * 30 + mins * 0.5;
    const minDeg = mins * 6;
    const btn = locked ? 'opacity-50 pointer-events-none' : '';
    return (
        <div className="flex flex-col items-center gap-3">
            <svg width="180" height="180" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" fill="white" stroke="#f59e0b" strokeWidth="8" />
                {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i * 30 - 90) * Math.PI / 180;
                    return <text key={i} x={100 + 72 * Math.cos(a)} y={100 + 72 * Math.sin(a) + 8}
                        textAnchor="middle" fontSize="18" fontWeight="900" fill="#78350f">{i === 0 ? 12 : i}</text>;
                })}
                <line x1="100" y1="100" x2={100 + 45 * Math.cos((hourDeg - 90) * Math.PI / 180)}
                    y2={100 + 45 * Math.sin((hourDeg - 90) * Math.PI / 180)}
                    stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                <line x1="100" y1="100" x2={100 + 62 * Math.cos((minDeg - 90) * Math.PI / 180)}
                    y2={100 + 62 * Math.sin((minDeg - 90) * Math.PI / 180)}
                    stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
                <circle cx="100" cy="100" r="7" fill="#f59e0b" />
            </svg>
            <div className="text-3xl font-black text-amber-900 tabular-nums">
                {hour}:{mins.toString().padStart(2, '0')}
            </div>
            <div className={`flex gap-3 ${btn}`}>
                <button onClick={() => setHour(h => (h % 12) + 1)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-sm">+1 hour</button>
                <button onClick={() => setMins(m => (m + 15) % 60)}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-sm">+15 min</button>
            </div>
        </div>
    );
}

// ─── CountingTray ────────────────────────────────────────────
export function CountingTray({ onChange, locked, emoji = '🍎' }: WidgetProps & { emoji?: string }) {
    const [count, setCount] = useState(0);
    useEffect(() => { onChange?.({ count }); }, [count, onChange]);
    const btn = locked ? 'opacity-50 pointer-events-none' : '';
    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-wrap gap-2 justify-center bg-emerald-50 rounded-2xl p-4 min-h-[110px] w-full max-w-md border-4 border-dashed border-emerald-300">
                {Array.from({ length: count }).map((_, i) => (
                    <motion.span key={i} initial={{ scale: 0, y: -20 }} animate={{ scale: 1, y: 0 }}
                        className="text-3xl">{emoji}</motion.span>
                ))}
                {count === 0 && <p className="text-emerald-400 font-bold self-center">Tap + to add!</p>}
            </div>
            <div className={`flex items-center gap-4 ${btn}`}>
                <button onClick={() => setCount(c => Math.max(0, c - 1))}
                    className="w-11 h-11 rounded-2xl bg-red-400 text-white text-2xl font-black shadow">−</button>
                <div className="text-4xl font-black text-gray-800 tabular-nums w-20 text-center">{count}</div>
                <button onClick={() => setCount(c => Math.min(30, c + 1))}
                    className="w-11 h-11 rounded-2xl bg-emerald-500 text-white text-2xl font-black shadow">+</button>
            </div>
        </div>
    );
}

// ─── NumberLine ──────────────────────────────────────────────
export function NumberLine({ onChange, locked, max = 20 }: WidgetProps & { max?: number }) {
    const [pos, setPos] = useState(0);
    useEffect(() => { onChange?.({ pos }); }, [pos, onChange]);
    const btn = locked ? 'opacity-50 pointer-events-none' : '';
    const step = 100 / max;
    return (
        <div className="flex flex-col items-center gap-3 w-full max-w-lg">
            <div className="relative w-full h-20">
                <div className="absolute left-0 right-0 top-10 h-1.5 bg-amber-400 rounded-full" />
                {Array.from({ length: max + 1 }).map((_, i) => (
                    <div key={i} className="absolute flex flex-col items-center" style={{ left: `${i * step}%` }}>
                        <div className="w-0.5 h-3 bg-amber-600 mt-[34px]" />
                        <span className="text-[10px] font-bold text-amber-900 mt-0.5">{i}</span>
                    </div>
                ))}
                <motion.div className="absolute text-4xl" style={{ top: 0, marginLeft: '-10px' }}
                    animate={{ left: `${pos * step}%` }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    🐸
                </motion.div>
            </div>
            <div className={`flex gap-3 ${btn}`}>
                <button onClick={() => setPos(p => Math.max(0, p - 1))}
                    className="px-5 py-2 rounded-xl bg-gold-500 text-white font-black">◀ Hop back</button>
                <button onClick={() => setPos(p => Math.min(max, p + 1))}
                    className="px-5 py-2 rounded-xl bg-gold-500 text-white font-black">Hop forward ▶</button>
            </div>
        </div>
    );
}

// ─── BalanceScale ────────────────────────────────────────────
export function BalanceScale({ onChange, locked }: WidgetProps) {
    const [left, setLeft] = useState(2);
    const [right, setRight] = useState(5);
    useEffect(() => { onChange?.({ left, right }); }, [left, right, onChange]);
    const tilt = Math.max(-18, Math.min(18, (right - left) * 4));
    const btn = locked ? 'opacity-50 pointer-events-none' : '';
    return (
        <div className="flex flex-col items-center gap-2">
            <svg width="280" height="150" viewBox="0 0 300 160">
                <line x1="150" y1="40" x2="150" y2="140" stroke="#78350f" strokeWidth="8" />
                <rect x="130" y="140" width="40" height="12" rx="4" fill="#78350f" />
                <g transform={`rotate(${tilt} 150 40)`}>
                    <line x1="40" y1="40" x2="260" y2="40" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                    <line x1="40" y1="40" x2="40" y2="90" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="260" y1="40" x2="260" y2="90" stroke="#94a3b8" strokeWidth="2" />
                    <ellipse cx="40" cy="95" rx="30" ry="10" fill="#fca5a5" stroke="#ef4444" strokeWidth="3" />
                    <ellipse cx="260" cy="95" rx="30" ry="10" fill="#93c5fd" stroke="#3b82f6" strokeWidth="3" />
                    <text x="40" y="80" textAnchor="middle" fontSize="16" fontWeight="900">{left}</text>
                    <text x="260" y="80" textAnchor="middle" fontSize="16" fontWeight="900">{right}</text>
                </g>
            </svg>
            <div className={`flex gap-6 text-sm font-bold ${btn}`}>
                <span className="flex gap-2 items-center">🔴
                    <button onClick={() => setLeft(v => Math.max(0, v - 1))} className="px-2 py-1 bg-red-200 rounded-lg">−</button>
                    <button onClick={() => setLeft(v => v + 1)} className="px-2 py-1 bg-red-200 rounded-lg">+</button>
                </span>
                <span className="flex gap-2 items-center">🔵
                    <button onClick={() => setRight(v => Math.max(0, v - 1))} className="px-2 py-1 bg-gold-200 rounded-lg">−</button>
                    <button onClick={() => setRight(v => v + 1)} className="px-2 py-1 bg-gold-200 rounded-lg">+</button>
                </span>
            </div>
        </div>
    );
}

// ─── CoinPurse ───────────────────────────────────────────────
export function CoinPurse({ onChange, locked }: WidgetProps) {
    const coins = [1, 2, 5, 10];
    const [picked, setPicked] = useState<number[]>([]);
    const total = picked.reduce((a, b) => a + b, 0);
    useEffect(() => { onChange?.({ total, coins: picked.length }); }, [total, picked.length, onChange]);
    const btn = locked ? 'opacity-50 pointer-events-none' : '';
    return (
        <div className="flex flex-col items-center gap-3">
            <div className={`flex gap-3 ${btn}`}>
                {coins.map(c => (
                    <motion.button key={c} whileTap={{ scale: 0.85 }}
                        onClick={() => setPicked(p => [...p, c])}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 border-4 border-amber-600 font-black text-amber-900 shadow-lg">
                        ₹{c}
                    </motion.button>
                ))}
            </div>
            <div className="bg-amber-100 border-4 border-amber-400 rounded-2xl px-6 py-3 flex items-center gap-3">
                <span className="text-2xl">👛</span>
                <div>
                    <div className="text-2xl font-black text-amber-900">₹{total}</div>
                    <div className="text-xs font-bold text-amber-700">{picked.length} coins</div>
                </div>
                {!locked && <button onClick={() => setPicked([])} className="ml-3 text-xs font-bold text-red-500 underline">empty</button>}
            </div>
        </div>
    );
}

// ─── Bundles — tens & ones place value manipulative ──────────
export function Bundles({ onChange, locked }: WidgetProps) {
    const [ones, setOnes] = useState(0);
    const [tens, setTens] = useState(0);
    const total = tens * 10 + ones;
    useEffect(() => { onChange?.({ tens, ones, total }); }, [tens, ones, total, onChange]);
    const btn = locked ? 'opacity-50 pointer-events-none' : '';
    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex gap-6 w-full max-w-md justify-center">
                <div className="flex-1 bg-purple-50 rounded-2xl p-3 border-4 border-dashed border-purple-300 min-h-[100px] flex flex-wrap gap-1 items-center justify-center">
                    <div className="w-full text-center text-[10px] font-black text-purple-600">TENS</div>
                    {Array.from({ length: tens }).map((_, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="w-6 h-8 bg-purple-400 rounded-md flex items-center justify-center text-[9px] font-black text-white">10</motion.div>
                    ))}
                    {tens === 0 && <span className="text-purple-300 text-xs font-bold">empty</span>}
                </div>
                <div className="flex-1 bg-amber-50 rounded-2xl p-3 border-4 border-dashed border-amber-300 min-h-[100px] flex flex-wrap gap-1 items-center justify-center">
                    <div className="w-full text-center text-[10px] font-black text-amber-600">ONES</div>
                    {Array.from({ length: ones }).map((_, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="w-5 h-5 bg-amber-400 rounded-full" />
                    ))}
                    {ones === 0 && <span className="text-amber-300 text-xs font-bold">empty</span>}
                </div>
            </div>
            <div className="text-3xl font-black text-gray-800 tabular-nums">{total}</div>
            <div className={`flex gap-3 text-sm ${btn}`}>
                <span className="flex items-center gap-1.5">
                    <span className="font-bold text-purple-700">Tens</span>
                    <button onClick={() => setTens(t => Math.max(0, t - 1))} className="w-8 h-8 bg-purple-300 rounded-lg font-black">−</button>
                    <button onClick={() => setTens(t => Math.min(9, t + 1))} className="w-8 h-8 bg-purple-300 rounded-lg font-black">+</button>
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="font-bold text-amber-700">Ones</span>
                    <button onClick={() => setOnes(o => Math.max(0, o - 1))} className="w-8 h-8 bg-amber-300 rounded-lg font-black">−</button>
                    <button onClick={() => setOnes(o => Math.min(9, o + 1))} className="w-8 h-8 bg-amber-300 rounded-lg font-black">+</button>
                </span>
            </div>
            {!locked && ones >= 10 && (
                <button onClick={() => { setTens(t => t + 1); setOnes(0); }}
                    className="px-4 py-1.5 rounded-xl bg-emerald-500 text-white font-black text-sm">
                    Bundle 10 → 1 Ten! 📦
                </button>
            )}
        </div>
    );
}

// ─── WriterStudio — a writing lab for English/Hindi composition sims.
// The student types; a live rubric checklist ticks format elements as
// they appear (date, greeting, subject, body depth, closing) + word
// count + a marks estimate — "write → see what the examiner sees".
// Reports {score, words, checks} so validate 'writer:score>3' works.
const RUBRIC: Array<{ key: string; label: string; re: RegExp }> = [
    { key: 'date', label: 'Date / place line', re: /\b(\d{1,2}[-/ ](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|[\u0900-\u097F]+,?\s*\d{1,2}\s*[–-]?\s*\d{4})/i },
    { key: 'greet', label: 'Salutation / greeting', re: /(dear|respected|to\s|सेवा\s*में|महोदय|प्रिय|आदरणीय)/i },
    { key: 'subj', label: 'Subject / heading', re: /(subject\s*:|sub\s*:|विषय\s*:|re\s*:)/i },
    { key: 'body', label: 'Body — 2+ paragraphs', re: /\n\s*\n|\n.*\n.*\n/ },
    { key: 'close', label: 'Closing / sign-off', re: /(yours\s+(sincerely|faithfully|truly)|regards|thank|धन्यवाद|सादर|आपका|आपकी)/i },
];
export function WriterStudio({ onChange, locked, labels }: WidgetProps) {
    const [text, setText] = useState('');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const checks = RUBRIC.map(r => ({ ...r, ok: r.re.test(text) }));
    const score = checks.filter(c => c.ok).length + (words >= 80 ? 1 : 0);
    useEffect(() => { onChange?.({ score, words }); }, [score, words]);
    return (
        <div className="w-full flex flex-col gap-2">
            {labels?.[0] && (
                <div className="rounded-xl bg-gold-50 border border-gold-200 px-3 py-2 text-xs font-bold text-gold-700">
                    ✍️ {labels[0]}
                </div>
            )}
        <div className="w-full flex gap-3">
            <textarea value={text} disabled={locked}
                onChange={e => setText(e.target.value)}
                placeholder="Write here — the rubric ticks as you hit each element…"
                className="flex-1 h-44 rounded-2xl border-2 border-gold-200 bg-white p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-gold-400 focus:outline-none resize-none shadow-inner" />
            <div className="w-40 shrink-0 flex flex-col gap-1.5">
                <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">examiner rubric</div>
                {checks.map(c => (
                    <div key={c.key} className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-bold transition-all ${c.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                        <span>{c.ok ? '✓' : '○'}</span><span>{c.label}</span>
                    </div>
                ))}
                <div className={`mt-1 rounded-xl px-2 py-1.5 text-center text-xs font-black ${words >= 80 ? 'bg-gold-100 text-gold-700' : 'bg-slate-100 text-slate-500'}`}>
                    {words} words {words >= 80 ? '✓' : '/ 80'}
                </div>
                <div className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-500 text-white text-center text-xs font-black px-2 py-1.5 shadow">
                    est. marks {Math.min(5, score)}/5
                </div>
            </div>
        </div>
        </div>
    );
}

// ─── MatchPairs — tap a left card then its right partner. labels come in
// pairs: [term, meaning, term, meaning, ...]. Right column shuffled once.
// Reports {matched, correct} so validate 'match:correct=3' works.
export function MatchPairs({ onChange, locked, labels }: WidgetProps) {
    const pairs: Array<{ t: string; m: string }> = [];
    for (let i = 0; i + 1 < (labels?.length ?? 0); i += 2)
        pairs.push({ t: labels![i], m: labels![i + 1] });
    const [order] = useState<number[]>(() => {
        const idx = pairs.map((_, i) => i);
        for (let i = idx.length - 1; i > 0; i--) { const j = (i * 2654435761 + 7) % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
        return idx;
    });
    const [selL, setSelL] = useState(-1);
    const [done, setDone] = useState<Set<number>>(new Set());
    const [miss, setMiss] = useState<Set<number>>(new Set());
    const correct = done.size;
    useEffect(() => { onChange?.({ matched: correct, correct, total: pairs.length }); }, [correct]);
    if (!pairs.length) return null;
    const pick = (side: 'L' | 'R', i: number) => {
        if (locked || done.has(i)) return;
        if (side === 'L') { setSelL(selL === i ? -1 : i); return; }
        if (selL < 0) return;
        if (order[i] === selL) { setDone(d => new Set(d).add(i)); }
        else { setMiss(m => new Set(m).add(i)); setTimeout(() => setMiss(m => { const n = new Set(m); n.delete(i); return n; }), 700); }
        setSelL(-1);
    };
    return (
        <div className="w-full flex gap-3">
            <div className="flex-1 flex flex-col gap-2">
                {pairs.map((p, i) => (
                    <button key={i} disabled={done.has(i)} onClick={() => pick('L', i)}
                        className={`rounded-xl px-3 py-2 text-left text-xs font-bold border-2 transition-all ${done.has(i) ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : selL === i ? 'bg-gold-500 border-gold-600 text-white' : 'bg-white border-gold-200 text-slate-700'}`}>
                        {p.t}
                    </button>
                ))}
            </div>
            <div className="flex-1 flex flex-col gap-2">
                {order.map((pi, i) => (
                    <button key={i} disabled={done.has(i)} onClick={() => pick('R', i)}
                        className={`rounded-xl px-3 py-2 text-left text-[11px] font-semibold border-2 transition-all ${done.has(i) ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : miss.has(i) ? 'bg-rose-100 border-rose-300' : 'bg-white border-amber-200 text-slate-600'}`}>
                        {pairs[pi].m}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── OrderSteps — tap the cards in sequence. labels = correct order.
// Renders shuffled; each tap checks prefix position. Reports {correct}.
export function OrderSteps({ onChange, locked, labels }: WidgetProps) {
    const items = labels ?? [];
    const [order] = useState<number[]>(() => {
        const idx = items.map((_, i) => i);
        for (let i = idx.length - 1; i > 0; i--) { const j = (i * 2654435761 + 7) % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
        if (idx.every((v, i) => v === i) && idx.length > 1) [idx[0], idx[1]] = [idx[1], idx[0]];
        return idx;
    });
    const [placed, setPlaced] = useState<number[]>([]);
    const [flash, setFlash] = useState(-1);
    useEffect(() => { onChange?.({ correct: placed.length, total: items.length }); }, [placed]);
    if (!items.length) return null;
    const tap = (i: number) => {
        if (locked || placed.includes(i)) return;
        if (order[i] === placed.length) setPlaced(p => [...p, i]);
        else { setFlash(i); setTimeout(() => setFlash(-1), 600); }
    };
    return (
        <div className="w-full flex flex-col gap-2">
            {order.map((orig, i) => {
                const isPlaced = placed.includes(i);
                const num = isPlaced ? placed.indexOf(i) + 1 : null;
                return (
                    <button key={i} disabled={isPlaced} onClick={() => tap(i)}
                        className={`w-full rounded-xl px-3 py-2.5 text-left text-xs font-bold border-2 flex items-center gap-2 transition-all ${isPlaced ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : flash === i ? 'bg-rose-100 border-rose-300' : 'bg-white border-gold-200 text-slate-700'}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${isPlaced ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{num ?? '?'}</span>
                        {items[orig]}
                    </button>
                );
            })}
        </div>
    );
}

// ─── TracePad — letter/akshara formation. The letter is painted faintly as a
// guide; the child traces it with finger/pointer. Score = stroke coverage of
// the guide cells hit. Reports { covered, total, score, strokes } so
// 'trace:score>60' validation works. labels[0] = the letter/akshara to trace.
export function TracePad({ onChange, locked, labels }: WidgetProps) {
    const letter = labels?.[0] ?? 'A';
    const ref = useRef<HTMLCanvasElement>(null);
    const guide = useRef<HTMLCanvasElement>(null);
    const hit = useRef<Set<number>>(new Set());
    const strokes = useRef(0);
    const drawing = useRef(false);
    const pos = useRef<{ x: number; y: number } | null>(null);
    const [score, setScore] = useState(0);
    const [cells, setCells] = useState(1);

    // paint the faint guide letter + build the coverage grid once
    useEffect(() => {
        const g = guide.current; if (!g) return;
        const ctx = g.getContext('2d'); if (!ctx) return;
        ctx.clearRect(0, 0, g.width, g.height);
        ctx.font = '900 190px system-ui, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(99,102,241,0.18)';
        ctx.fillText(letter, g.width / 2, g.height / 2 + 8);
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = 'rgba(99,102,241,0.5)'; ctx.lineWidth = 3;
        ctx.strokeText(letter, g.width / 2, g.height / 2 + 8);
        // coverage grid — 16x24 cells that the letter's ink touches
        const data = ctx.getImageData(0, 0, g.width, g.height).data;
        const GX = 16, GY = 24; let n = 0;
        for (let y = 0; y < GY; y++) for (let x = 0; x < GX; x++) {
            const cx = Math.floor((x + 0.5) * g.width / GX), cy = Math.floor((y + 0.5) * g.height / GY);
            if (data[(cy * g.width + cx) * 4 + 3] > 40) n++;
        }
        setCells(Math.max(n, 1));
    }, [letter]);

    const report = useCallback(() => {
        const s = Math.round((hit.current.size / cells) * 100);
        setScore(s);
        onChange?.({ covered: hit.current.size, total: cells, score: s, strokes: strokes.current });
    }, [cells, onChange]);

    const point = (e: React.PointerEvent) => {
        const c = ref.current!; const r = c.getBoundingClientRect();
        return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) };
    };
    const mark = (x: number, y: number) => {
        const c = ref.current!; const g = guide.current!;
        const gx = Math.floor(x * 16 / c.width), gy = Math.floor(y * 24 / c.height);
        const ci = Math.floor((gy + 0.5) * g.height / 24), cx = Math.floor((gx + 0.5) * g.width / 16);
        const gctx = g.getContext('2d');
        if (gctx && gctx.getImageData(cx, ci, 1, 1).data[3] > 40) hit.current.add(gy * 16 + gx);
    };
    const down = (e: React.PointerEvent) => { if (locked) return; drawing.current = true; strokes.current++; pos.current = point(e); };
    const move = (e: React.PointerEvent) => {
        if (!drawing.current || locked) return;
        const p = point(e); const ctx = ref.current!.getContext('2d')!;
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(pos.current!.x, pos.current!.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        mark(p.x, p.y); pos.current = p;
    };
    const up = () => { if (drawing.current) { drawing.current = false; report(); } };
    const clear = () => { ref.current?.getContext('2d')!.clearRect(0, 0, ref.current!.width, ref.current!.height); hit.current.clear(); setScore(0); onChange?.({ covered: 0, total: cells, score: 0, strokes: strokes.current }); };

    // STROKE-ORDER: find the topmost-leftmost glyph cell to mark the
    // correct "start here" point — children start letters top-down.
    const startDot = useMemo(() => {
        const g = guide.current; if (!g) return null;
        const ctx = g.getContext('2d'); if (!ctx) return null;
        const data = ctx.getImageData(0, 0, g.width, g.height).data;
        for (let y = 0; y < g.height; y += 4) for (let x = 0; x < g.width; x += 4) {
            if (data[(y * g.width + x) * 4 + 3] > 40) return { x, y };
        }
        return null;
    }, [letter]);

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <div className="relative">
                <canvas ref={guide} width={240} height={300} className="absolute inset-0 rounded-2xl bg-white border-4 border-gold-200" />
                <canvas ref={ref} width={240} height={300}
                    onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
                    className="relative rounded-2xl touch-none cursor-crosshair" />
                {/* STROKE-ORDER guide — a pulsing "start here" dot at the
                    topmost point of the glyph */}
                {startDot && score === 0 && (
                    <div className="absolute pointer-events-none animate-ping"
                        style={{ left: startDot.x - 6, top: startDot.y - 6, width: 12, height: 12 }}>
                        <div className="w-full h-full rounded-full bg-emerald-400" />
                    </div>
                )}
            </div>
            <div className="flex items-center gap-3">
                <div className={`rounded-xl px-3 py-1.5 text-xs font-black ${score >= 60 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    trace coverage {score}%
                </div>
                <button onClick={clear} className="rounded-xl bg-slate-200 px-3 py-1.5 text-xs font-black text-slate-600 hover:bg-slate-300">↺ again</button>
            </div>
            {score === 0 && <p className="text-[10px] text-gold-500 font-semibold">Start at the green dot — top to bottom ↓</p>}
        </div>
    );
}

// ─── FluencyMeter — timed reading → words-per-minute. The child reads the
// passage aloud (or silently for c4-5), taps Done; wpm = words / seconds.
// Self-check comprehension chip after. Reports { wpm, secs, words, level }
// where level: 0=slow 1=approaching 2=fluent (vs 60/90 wpm bands).
export function FluencyMeter({ onChange, locked, labels }: WidgetProps) {
    const passage = labels?.join(' ') ?? 'The cat sat on the mat and looked at the sun.';
    const words = passage.split(/\s+/).filter(Boolean).length;
    const [reading, setReading] = useState(false);
    const [t0, setT0] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [secs, setSecs] = useState(0);
    const stop = () => {
        const s = Math.max(1, Math.round((Date.now() - t0) / 1000));
        const w = Math.round(words / s * 60);
        const level = w >= 90 ? 2 : w >= 60 ? 1 : 0;
        setSecs(s); setWpm(w); setReading(false);
        // FLUENCY-HISTORY: log every reading so /play can show the
        // words-per-minute trend (NIPUN fluency strand measured over time).
        try {
            const log = JSON.parse(localStorage.getItem('atlas_fluency_log') || '[]');
            log.push({ wpm: w, words, secs: s, at: Date.now() });
            localStorage.setItem('atlas_fluency_log', JSON.stringify(log.slice(-50)));
        } catch {}
        onChange?.({ wpm: w, secs: s, words, level });
    };
    return (
        <div className="w-full flex flex-col items-center gap-3">
            <div className="rounded-2xl bg-white border-2 border-gold-200 p-4 w-full">
                <p className="text-center text-base font-bold text-slate-700 leading-relaxed">{passage}</p>
            </div>
            {!reading && wpm === 0 && (
                <button onClick={() => { setT0(Date.now()); setReading(true); }} disabled={locked}
                    className="rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-3 text-sm font-black text-white shadow-lg">
                    ▶ Start reading aloud!
                </button>
            )}
            {reading && (
                <button onClick={stop} className="rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 px-8 py-3 text-sm font-black text-white shadow-lg animate-pulse">
                    ⏹ Done reading!
                </button>
            )}
            {wpm > 0 && (
                <div className={`rounded-2xl px-4 py-2 text-sm font-black ${wpm >= 90 ? 'bg-emerald-100 text-emerald-700' : wpm >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                    {wpm} words/min ({secs}s) {wpm >= 90 ? '🚀 fluent!' : wpm >= 60 ? '👍 approaching fluency' : '💪 keep practicing'}
                </div>
            )}
        </div>
    );
}

// ─── registry — components, not elements, so props flow ─────
export const WIDGETS: Record<string, ComponentType<WidgetProps>> = {
    writer: WriterStudio,
    clock: ClockFace,
    tray: CountingTray,
    'tray-star': (p: WidgetProps) => <CountingTray {...p} emoji="⭐" />,
    numberline: NumberLine,
    balance: BalanceScale,
    purse: CoinPurse,
    bundles: Bundles,
    match: MatchPairs,
    order: OrderSteps,
    trace: TracePad,
    fluency: FluencyMeter,
};

// ─── validate helpers ────────────────────────────────────────
/** Parse 'clock:hour=9,mins=0' or 'balance:right>left' and check widget state.
 * Batch-1 hardening: MISSING keys fail closed (return false). A widget that
 * never reported must not pass by treating undefined as 0. */
export function validateGoal(validate: string, state: Record<string, number>): boolean {
    const rules = validate.split(':')[1] ?? '';
    return rules.split(',').every(rule => {
        if (rule.includes('>')) {
            const [a, b] = rule.split('>');
            if (!(a in state) || !(b in state)) return false;
            return (state[a] ?? 0) > (state[b] ?? 0);
        }
        if (rule.includes('<')) {
            const [a, b] = rule.split('<');
            if (!(a in state) || !(b in state)) return false;
            return (state[a] ?? 0) < (state[b] ?? 0);
        }
        const [k, v] = rule.split('=');
        if (!(k in state)) return false;
        return state[k] === Number(v);
    });
}
