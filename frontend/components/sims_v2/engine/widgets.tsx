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
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export interface WidgetProps {
    onChange?: (state: Record<string, number>) => void;
    /** freeze interaction during challenge review */
    locked?: boolean;
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
                    className="px-5 py-2 rounded-xl bg-sky-500 text-white font-black">◀ Hop back</button>
                <button onClick={() => setPos(p => Math.min(max, p + 1))}
                    className="px-5 py-2 rounded-xl bg-sky-500 text-white font-black">Hop forward ▶</button>
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
                    <button onClick={() => setRight(v => Math.max(0, v - 1))} className="px-2 py-1 bg-blue-200 rounded-lg">−</button>
                    <button onClick={() => setRight(v => v + 1)} className="px-2 py-1 bg-blue-200 rounded-lg">+</button>
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

// ─── registry — components, not elements, so props flow ─────
export const WIDGETS: Record<string, ComponentType<WidgetProps>> = {
    clock: ClockFace,
    tray: CountingTray,
    'tray-star': (p: WidgetProps) => <CountingTray {...p} emoji="⭐" />,
    numberline: NumberLine,
    balance: BalanceScale,
    purse: CoinPurse,
    bundles: Bundles,
};

// ─── validate helpers ────────────────────────────────────────
/** Parse 'clock:hour=9,mins=0' or 'balance:right>left' and check widget state. */
export function validateGoal(validate: string, state: Record<string, number>): boolean {
    const rules = validate.split(':')[1] ?? '';
    return rules.split(',').every(rule => {
        if (rule.includes('>')) {
            const [a, b] = rule.split('>');
            return (state[a] ?? 0) > (state[b] ?? 0);
        }
        if (rule.includes('<')) {
            const [a, b] = rule.split('<');
            return (state[a] ?? 0) < (state[b] ?? 0);
        }
        const [k, v] = rule.split('=');
        return state[k] === Number(v);
    });
}
