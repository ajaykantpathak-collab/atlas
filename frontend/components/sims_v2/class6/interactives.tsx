/**
 * C6 Real Interactives — bespoke drag/click components for chapters
 * that have no old sim. Each plugs into explore.component in the engine.
 * Real manipulation, not slides.
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── helpers ─────────────────────────────────────────────────
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

// ─── 1. Decimal Place Value (math ch04) ──────────────────────
// Drag the decimal point left/right, see the value change live.
export function DecimalPlaceValue() {
    const [pos, setPos] = useState(2); // decimal point position
    const digits = ['3', '4', '5', '6', '7', '8'];
    const dragRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);

    const handleMove = useCallback((clientX: number) => {
        if (!dragRef.current) return;
        const rect = dragRef.current.getBoundingClientRect();
        const cellW = rect.width / (digits.length + 1);
        const rel = clientX - rect.left;
        const newIdx = Math.max(0, Math.min(digits.length, Math.round(rel / cellW)));
        setPos(newIdx);
    }, []);

    // render: digits with decimal point between them
    const left = digits.slice(0, pos);
    const right = digits.slice(pos);
    const value = parseFloat(left.join('') + '.' + right.join(''));

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            <div className="text-lg font-bold text-gray-700">Drag the decimal point!</div>
            <div
                ref={dragRef}
                className="relative flex items-end gap-1 cursor-ew-resize select-none bg-amber-50 rounded-2xl p-6 border-4 border-amber-200"
                onMouseDown={(e) => { setDragging(true); handleMove(e.clientX); }}
                onMouseMove={(e) => dragging && handleMove(e.clientX)}
                onMouseUp={() => setDragging(false)}
                onMouseLeave={() => setDragging(false)}
                onTouchStart={(e) => { setDragging(true); handleMove(e.touches[0].clientX); }}
                onTouchMove={(e) => dragging && handleMove(e.touches[0].clientX)}
                onTouchEnd={() => setDragging(false)}
            >
                {left.map((d, i) => (
                    <div key={i} className="text-5xl font-black text-blue-600 w-12 text-center">{d}</div>
                ))}
                <div
                    className="text-5xl font-black text-red-500 w-8 text-center cursor-grab active:cursor-grabbing"
                    style={{ transform: dragging ? 'scale(1.3)' : 'scale(1)' }}
                >.</div>
                {right.map((d, i) => (
                    <div key={i} className="text-5xl font-black text-blue-600 w-12 text-center">{d}</div>
                ))}
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="text-3xl font-black text-gray-800">Value = {value}</div>
                <div className="text-sm text-gray-500">
                    {pos === 0 && 'All digits are decimals → smallest value'}
                    {pos === digits.length && 'No decimals → whole number'}
                    {pos > 0 && pos < digits.length && `${left.length} whole + ${right.length} decimal places`}
                </div>
                <div className="flex gap-2 mt-2">
                    {[0, 1, 2, 3, 4, 5, 6].map(p => (
                        <button key={p} onClick={() => setPos(p)}
                            className={`px-3 py-1 rounded-lg text-sm font-bold ${pos === p ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── 2. Ratio Mixer (math ch06) ──────────────────────────────
// Adjust two sliders (red : blue), see the mixed color + ratio.
export function RatioMixer() {
    const [red, setRed] = useState(2);
    const [blue, setBlue] = useState(3);
    const total = red + blue;
    const rPct = (red / total) * 100;
    const bPct = (blue / total) * 100;
    // mix color
    const r = Math.round((red / total) * 255);
    const b = Math.round((blue / total) * 255);
    const mixed = `rgb(${r}, 0, ${b})`;

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            <div className="text-lg font-bold text-gray-700">Mix the ratio! Red : Blue</div>
            {/* Color preview */}
            <div className="w-48 h-48 rounded-2xl shadow-lg border-4 border-gray-300 flex items-center justify-center"
                style={{ backgroundColor: mixed }}>
                <span className="text-white font-black text-2xl drop-shadow-lg">{red}:{blue}</span>
            </div>
            {/* Sliders */}
            <div className="flex flex-col gap-4 w-80">
                <div className="flex items-center gap-3">
                    <span className="text-red-500 font-black text-xl w-8">{red}</span>
                    <input type="range" min={0} max={10} value={red}
                        onChange={(e) => setRed(+e.target.value)}
                        className="flex-1 accent-red-500 h-3" />
                    <span className="text-sm text-gray-500 w-20">parts red</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-blue-500 font-black text-xl w-8">{blue}</span>
                    <input type="range" min={0} max={10} value={blue}
                        onChange={(e) => setBlue(+e.target.value)}
                        className="flex-1 accent-blue-500 h-3" />
                    <span className="text-sm text-gray-500 w-20">parts blue</span>
                </div>
            </div>
            {/* Ratio bar */}
            <div className="w-80 h-8 rounded-lg overflow-hidden flex border-2 border-gray-300">
                <div className="bg-red-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${rPct}%` }}>{rPct > 15 && `${rPct.toFixed(0)}%`}</div>
                <div className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${bPct}%` }}>{bPct > 15 && `${bPct.toFixed(0)}%`}</div>
            </div>
            <div className="text-sm text-gray-600">
                Simplified: {red === 0 ? '0' : blue === 0 ? '∞' : `${red / gcd(red, blue)}:${blue / gcd(red, blue)}`}
            </div>
        </div>
    );
}

// ─── 3. Number Pattern Builder (math ch12) ───────────────────
// Set a start + step, see the pattern grow. Guess the next number.
export function NumberPatternBuilder() {
    const [start, setStart] = useState(2);
    const [step, setStep] = useState(3);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
    const seq = Array.from({ length: 6 }, (_, i) => start + i * step);
    const next = start + 6 * step;

    const check = () => {
        if (parseInt(guess) === next) setFeedback('correct');
        else setFeedback('wrong');
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            <div className="text-lg font-bold text-gray-700">Build a number pattern!</div>
            <div className="flex gap-4 items-center">
                <label className="flex flex-col items-center gap-1">
                    <span className="text-sm text-gray-500">Start</span>
                    <input type="number" value={start} onChange={(e) => setStart(+e.target.value)}
                        className="w-16 px-2 py-1 text-center border-2 border-gray-300 rounded-lg font-bold" />
                </label>
                <span className="text-2xl font-black text-gray-400">+</span>
                <label className="flex flex-col items-center gap-1">
                    <span className="text-sm text-gray-500">Step</span>
                    <input type="number" value={step} onChange={(e) => setStep(+e.target.value)}
                        className="w-16 px-2 py-1 text-center border-2 border-gray-300 rounded-lg font-bold" />
                </label>
                <span className="text-2xl font-black text-gray-400">× n</span>
            </div>
            {/* Pattern display */}
            <div className="flex gap-2 flex-wrap justify-center">
                {seq.map((n, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-black text-xl flex items-center justify-center shadow-lg">
                        {n}
                    </motion.div>
                ))}
                <div className="w-14 h-14 rounded-xl border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-bold text-xl">?</div>
            </div>
            {/* Guess */}
            <div className="flex gap-2 items-center">
                <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)}
                    placeholder="Next number?"
                    className="w-32 px-3 py-2 text-center border-2 border-gray-300 rounded-lg font-bold" />
                <button onClick={check}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-bold shadow">Check</button>
            </div>
            <AnimatePresence>
                {feedback === 'correct' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        className="text-emerald-600 font-black text-xl">✓ Correct! {next}</motion.div>
                )}
                {feedback === 'wrong' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        className="text-red-500 font-bold">Try again! Pattern: +{step} each time</motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── 4. Plant Part Labeler (biology ch06) ────────────────────
// Drag labels to the correct parts of a plant diagram.
export function PlantPartLabeler() {
    const parts = [
        { id: 'flower', label: 'Flower', x: 50, y: 10, color: 'bg-pink-400' },
        { id: 'leaf', label: 'Leaf', x: 25, y: 40, color: 'bg-green-400' },
        { id: 'stem', label: 'Stem', x: 50, y: 45, color: 'bg-green-600' },
        { id: 'root', label: 'Root', x: 50, y: 80, color: 'bg-amber-600' },
    ];
    const [placed, setPlaced] = useState<Record<string, boolean>>({});
    const [dragging, setDragging] = useState<string | null>(null);

    const onDrop = (partId: string) => {
        setPlaced(p => ({ ...p, [partId]: true }));
        setDragging(null);
    };
    const allPlaced = parts.every(p => placed[p.id]);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Label the plant parts!</div>
            {/* Plant diagram */}
            <div className="relative w-80 h-80 bg-green-50 rounded-2xl border-4 border-green-200">
                {/* SVG plant */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    {/* flower */}
                    <circle cx="50" cy="15" r="8" fill="#f9a8d4" stroke="#be185d" strokeWidth="1" />
                    <circle cx="42" cy="12" r="5" fill="#fbcfe8" />
                    <circle cx="58" cy="12" r="5" fill="#fbcfe8" />
                    <circle cx="50" cy="8" r="5" fill="#fbcfe8" />
                    {/* stem */}
                    <rect x="48" y="20" width="4" height="50" fill="#16a34a" />
                    {/* leaf */}
                    <ellipse cx="30" cy="45" rx="10" ry="5" fill="#22c55e" transform="rotate(-20 30 45)" />
                    {/* roots */}
                    <path d="M50 70 Q40 80 35 88" stroke="#92400e" strokeWidth="2" fill="none" />
                    <path d="M50 70 Q60 80 65 88" stroke="#92400e" strokeWidth="2" fill="none" />
                    <path d="M50 70 Q50 82 48 90" stroke="#92400e" strokeWidth="2" fill="none" />
                </svg>
                {/* Drop zones */}
                {parts.map(p => (
                    <div key={p.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => onDrop(p.id)}
                        className={`absolute w-20 h-10 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all
                            ${placed[p.id] ? `${p.color} text-white border-transparent` : 'border-dashed border-gray-400 bg-white/50 text-gray-400'}`}
                        style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}>
                        {placed[p.id] ? p.label : '?'}
                    </div>
                ))}
            </div>
            {/* Labels to drag */}
            <div className="flex gap-2 flex-wrap justify-center">
                {parts.filter(p => !placed[p.id]).map(p => (
                    <div key={p.id} draggable
                        onDragStart={() => setDragging(p.id)}
                        onDragEnd={() => setDragging(null)}
                        className={`px-4 py-2 rounded-xl ${p.color} text-white font-bold cursor-grab active:cursor-grabbing shadow-lg`}>
                        {p.label}
                    </div>
                ))}
            </div>
            {allPlaced && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="text-emerald-600 font-black text-xl">All labeled! 🌱</motion.div>
            )}
        </div>
    );
}

// ─── 5. Rights Sorter (civics ch10) ──────────────────────────
// Drag rights into correct category: Civil / Political / Economic
export function RightsSorter() {
    const rights = [
        { id: 'r1', text: 'Right to free speech', bin: 'civil', emoji: '🗣️' },
        { id: 'r2', text: 'Right to vote', bin: 'political', emoji: '🗳️' },
        { id: 'r3', text: 'Right to education', bin: 'economic', emoji: '📚' },
        { id: 'r4', text: 'Right to life', bin: 'civil', emoji: '💚' },
        { id: 'r5', text: 'Right to contest elections', bin: 'political', emoji: '🏛️' },
        { id: 'r6', text: 'Right to work', bin: 'economic', emoji: '💼' },
    ];
    const bins = [
        { id: 'civil', label: 'Civil Rights', color: 'bg-blue-500' },
        { id: 'political', label: 'Political Rights', color: 'bg-purple-500' },
        { id: 'economic', label: 'Economic Rights', color: 'bg-emerald-500' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (rightId: string, binId: string) => {
        const right = rights.find(r => r.id === rightId);
        setPlaced(p => ({ ...p, [rightId]: binId }));
        setFeedback(f => ({ ...f, [rightId]: right?.bin === binId }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Sort rights into categories!</div>
            {/* Bins */}
            <div className="flex gap-4 w-full justify-center">
                {bins.map(bin => (
                    <div key={bin.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            const id = (e.target as HTMLElement).dataset.rid;
                            if (id) onDrop(id, bin.id);
                        }}
                        className={`flex-1 max-w-xs min-h-[200px] ${bin.color} rounded-2xl p-3 shadow-lg`}>
                        <div className="text-white font-black text-center mb-2">{bin.label}</div>
                        <div className="space-y-2">
                            {Object.entries(placed).filter(([_, b]) => b === bin.id).map(([rid]) => {
                                const r = rights.find(x => x.id === rid)!;
                                const ok = feedback[rid];
                                return (
                                    <div key={rid} data-rid={rid}
                                        className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2
                                            ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>
                                        <span>{r.emoji}</span><span>{r.text}</span>
                                        <span>{ok ? '✓' : '✗'}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            {/* Unplaced rights */}
            <div className="flex gap-2 flex-wrap justify-center">
                {rights.filter(r => !placed[r.id]).map(r => (
                    <div key={r.id} draggable
                        onDragStart={(e) => (e.dataTransfer.setData('text', r.id))}
                        className="px-4 py-2 rounded-xl bg-amber-100 border-2 border-amber-300 font-bold cursor-grab active:cursor-grabbing shadow">
                        {r.emoji} {r.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── 6. Timeline Builder (history) ──────────────────────────
// Drag events into chronological order.
export function TimelineBuilder({ events }: { events?: { id: string; year: string; label: string }[] }) {
    const defaultEvents = [
        { id: 'e1', year: '1206', label: 'Delhi Sultanate founded' },
        { id: 'e2', year: '1336', label: 'Vijayanagara Empire founded' },
        { id: 'e3', year: '1498', label: 'Europeans arrive (Vasco da Gama)' },
        { id: 'e4', year: '1857', label: 'First War of Independence' },
        { id: 'e5', year: '1885', label: 'Indian National Congress born' },
        { id: 'e6', year: '1950', label: 'Constitution adopted' },
    ];
    const items = events || defaultEvents;
    const [order, setOrder] = useState(items.map(i => i.id));
    const [dragIdx, setDragIdx] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);

    const sorted = [...items].sort((a, b) => parseInt(a.year) - parseInt(b.year));
    const correct = sorted.map(s => s.id);
    const isCorrect = order.every((id, i) => id === correct[i]);

    const reorder = (from: number, to: number) => {
        const next = [...order];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        setOrder(next);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Drag events into chronological order!</div>
            <div className="flex flex-col gap-2 w-full max-w-md">
                {order.map((id, i) => {
                    const item = items.find(x => x.id === id)!;
                    return (
                        <div key={id} draggable
                            onDragStart={() => setDragIdx(i)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => { if (dragIdx !== null) reorder(dragIdx, i); setDragIdx(null); }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border-2 border-gray-200 shadow cursor-grab active:cursor-grabbing hover:border-blue-400">
                            <span className="w-8 h-8 rounded-full bg-blue-500 text-white font-black flex items-center justify-center text-sm">{i + 1}</span>
                            <span className="font-bold text-gray-700">{item.year}</span>
                            <span className="text-gray-500 text-sm">{item.label}</span>
                        </div>
                    );
                })}
            </div>
            <button onClick={() => setChecked(true)}
                className="px-6 py-2 rounded-lg bg-emerald-500 text-white font-bold shadow">Check Order</button>
            {checked && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className={`font-black text-xl ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isCorrect ? '✓ Perfect chronological order!' : '✗ Not yet — check the years!'}
                </motion.div>
            )}
        </div>
    );
}

// ─── 7. Budget Allocator (economics) ──────────────────────────
// Drag money between needs vs wants, see if budget balances.
export function BudgetAllocator() {
    const categories = [
        { id: 'food', label: 'Food', emoji: '🍚', need: true },
        { id: 'rent', label: 'Rent', emoji: '🏠', need: true },
        { id: 'edu', label: 'Education', emoji: '📚', need: true },
        { id: 'medicine', label: 'Medicine', emoji: '💊', need: true },
        { id: 'games', label: 'Video Games', emoji: '🎮', need: false },
        { id: 'movies', label: 'Movies', emoji: '🎬', need: false },
        { id: 'toys', label: 'Toys', emoji: '🧸', need: false },
    ];
    const budget = 100;
    const [alloc, setAlloc] = useState<Record<string, number>>({ food: 30, rent: 25, edu: 15, medicine: 10, games: 10, movies: 5, toys: 5 });
    const total = Object.values(alloc).reduce((a, b) => a + b, 0);
    const needs = categories.filter(c => c.need).reduce((a, c) => a + (alloc[c.id] || 0), 0);
    const wants = total - needs;

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Allocate ₹{budget} budget — Needs vs Wants</div>
            <div className={`text-2xl font-black ${total === budget ? 'text-emerald-600' : total > budget ? 'text-red-500' : 'text-amber-500'}`}>
                Spent: ₹{total} / ₹{budget} {total > budget && '⚠️ Over budget!'}
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {categories.map(c => (
                    <div key={c.id} className={`flex items-center gap-2 p-3 rounded-xl border-2 ${c.need ? 'border-blue-300 bg-blue-50' : 'border-amber-300 bg-amber-50'}`}>
                        <span className="text-2xl">{c.emoji}</span>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-gray-700">{c.label}</div>
                            <div className="text-xs text-gray-400">{c.need ? 'Need' : 'Want'}</div>
                        </div>
                        <input type="range" min={0} max={40} value={alloc[c.id] || 0}
                            onChange={(e) => setAlloc(a => ({ ...a, [c.id]: +e.target.value }))}
                            className="w-20 accent-blue-500" />
                        <span className="w-8 text-right font-bold text-gray-700">₹{alloc[c.id] || 0}</span>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 w-full max-w-lg">
                <div className="flex-1 bg-blue-100 rounded-xl p-3 text-center">
                    <div className="text-sm text-blue-600 font-bold">Needs</div>
                    <div className="text-2xl font-black text-blue-700">₹{needs}</div>
                </div>
                <div className="flex-1 bg-amber-100 rounded-xl p-3 text-center">
                    <div className="text-sm text-amber-600 font-bold">Wants</div>
                    <div className="text-2xl font-black text-amber-700">₹{wants}</div>
                </div>
            </div>
            {total === budget && needs > wants && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="text-emerald-600 font-black text-lg">✓ Balanced! Needs prioritized!</motion.div>
            )}
        </div>
    );
}

// ─── 8. Story Sequencer (english) ────────────────────────────
// Drag story events into plot order: Beginning → Middle → End
export function StorySequencer({ events }: { events?: { id: string; label: string; act: 'beginning' | 'middle' | 'end' }[] }) {
    const defaultEvents = [
        { id: 's1', label: 'Jahnavi hears the river whisper', act: 'beginning' as const },
        { id: 's2', label: 'She decides to follow her dream', act: 'middle' as const },
        { id: 's3', label: 'Jahnavi reaches school at last', act: 'end' as const },
    ];
    const items = events || defaultEvents;
    const acts = [
        { id: 'beginning', label: 'Beginning', color: 'bg-blue-500', emoji: '🌅' },
        { id: 'middle', label: 'Middle', color: 'bg-amber-500', emoji: '⚡' },
        { id: 'end', label: 'End', color: 'bg-emerald-500', emoji: '🏁' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (itemId: string, actId: string) => {
        const item = items.find(i => i.id === itemId);
        setPlaced(p => ({ ...p, [itemId]: actId }));
        setFeedback(f => ({ ...f, [itemId]: item?.act === actId }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Sequence the story: Beginning → Middle → End</div>
            <div className="flex gap-4 w-full justify-center">
                {acts.map(act => (
                    <div key={act.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, act.id); }}
                        className={`flex-1 max-w-xs min-h-[150px] ${act.color} rounded-2xl p-3 shadow-lg`}>
                        <div className="text-white font-black text-center mb-2">{act.emoji} {act.label}</div>
                        <div className="space-y-2">
                            {Object.entries(placed).filter(([_, a]) => a === act.id).map(([iid]) => {
                                const item = items.find(x => x.id === iid)!;
                                const ok = feedback[iid];
                                return (
                                    <div key={iid} className={`px-3 py-2 rounded-lg text-sm font-bold
                                        ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>
                                        {item.label} {ok ? '✓' : '✗'}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
                {items.filter(i => !placed[i.id]).map(i => (
                    <div key={i.id} draggable
                        onDragStart={(e) => e.dataTransfer.setData('text', i.id)}
                        className="px-4 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold cursor-grab active:cursor-grabbing shadow">
                        {i.label}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── 9. Map Labeler (geography) ──────────────────────────────
// Click on India's map to place neighbours in the right direction.
export function NeighbourMap() {
    const neighbours = [
        { id: 'pak', label: 'Pakistan', x: 15, y: 45, emoji: '🇵🇰' },
        { id: 'china', label: 'China', x: 55, y: 15, emoji: '🇨🇳' },
        { id: 'nepal', label: 'Nepal', x: 45, y: 25, emoji: '🇳🇵' },
        { id: 'bangla', label: 'Bangladesh', x: 70, y: 40, emoji: '🇧🇩' },
        { id: 'srilanka', label: 'Sri Lanka', x: 50, y: 85, emoji: '🇱🇰' },
        { id: 'myan', label: 'Myanmar', x: 80, y: 35, emoji: '🇲🇲' },
    ];
    const [placed, setPlaced] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (x: number, y: number) => {
        if (!selected) return;
        // check if click is near the correct position
        const n = neighbours.find(nb => nb.id === selected);
        if (n && Math.abs(x - n.x) < 15 && Math.abs(y - n.y) < 15) {
            setPlaced(p => ({ ...p, [selected]: true }));
        }
        setSelected(null);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Click where each neighbour is!</div>
            <div className="relative w-80 h-96 bg-emerald-50 rounded-2xl border-4 border-emerald-200 overflow-hidden"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    handleClick(x, y);
                }}>
                {/* India shape (simplified) */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    <path d="M30 20 L55 15 L65 25 L75 30 L72 45 L65 55 L55 75 L45 85 L40 70 L30 55 L25 40 Z"
                        fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
                    <text x="48" y="50" className="fill-green-700 font-black text-[8px]">INDIA</text>
                </svg>
                {/* Placed markers */}
                {neighbours.filter(n => placed[n.id]).map(n => (
                    <div key={n.id} className="absolute text-2xl"
                        style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)' }}>
                        {n.emoji}
                        <div className="text-xs font-bold text-gray-700 bg-white/80 rounded px-1">{n.label}</div>
                    </div>
                ))}
                {/* Selected highlight */}
                {selected && (() => {
                    const n = neighbours.find(x => x.id === selected);
                    return n ? <div className="absolute text-3xl animate-pulse"
                        style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)' }}>📍</div> : null;
                })()}
            </div>
            {/* Neighbour buttons */}
            <div className="flex gap-2 flex-wrap justify-center">
                {neighbours.filter(n => !placed[n.id]).map(n => (
                    <button key={n.id} onClick={() => setSelected(n.id)}
                        className={`px-3 py-2 rounded-xl font-bold shadow ${selected === n.id ? 'bg-blue-500 text-white' : 'bg-white border-2 border-gray-300'}`}>
                        {n.emoji} {n.label}
                    </button>
                ))}
            </div>
            {Object.keys(placed).length === neighbours.length && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="text-emerald-600 font-black text-xl">All neighbours placed! 🗺️</motion.div>
            )}
        </div>
    );
}

// ─── 10. Barter Match (economics ch11) ───────────────────────
// Match what each person has with what they need (barter system).
export function BarterMatch() {
    const pairs = [
        { id: 'p1', has: 'Rice 🌾', needs: 'Shoes 👟', matchId: 'm2' },
        { id: 'p2', has: 'Shoes 👟', needs: 'Rice 🌾', matchId: 'm1' },
        { id: 'p3', has: 'Pottery 🏺', needs: 'Wheat 🌾', matchId: 'm4' },
        { id: 'p4', has: 'Wheat 🌾', needs: 'Pottery 🏺', matchId: 'm3' },
    ];
    const [matched, setMatched] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<string | null>(null);

    const tryMatch = (a: string, b: string) => {
        const pa = pairs.find(p => p.id === a);
        const pb = pairs.find(p => p.id === b);
        if (pa && pb && pa.needs === pb.has && pb.needs === pa.has) {
            setMatched(m => ({ ...m, [a]: true, [b]: true }));
        }
        setSelected(null);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Match barter partners! (double coincidence of wants)</div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {pairs.map(p => (
                    <div key={p.id} onClick={() => {
                        if (matched[p.id]) return;
                        if (!selected) setSelected(p.id);
                        else if (selected !== p.id) tryMatch(selected, p.id);
                    }}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all
                            ${matched[p.id] ? 'bg-emerald-100 border-emerald-400' : selected === p.id ? 'bg-blue-100 border-blue-500 scale-105' : 'bg-white border-gray-300 hover:border-blue-300'}`}>
                        <div className="text-sm text-gray-500">Has: <span className="font-bold">{p.has}</span></div>
                        <div className="text-sm text-gray-500">Needs: <span className="font-bold">{p.needs}</span></div>
                        {matched[p.id] && <div className="text-emerald-600 font-bold text-sm mt-1">✓ Matched!</div>}
                    </div>
                ))}
            </div>
            {selected && <div className="text-blue-600 font-bold">Now click the person who has what this person needs!</div>}
        </div>
    );
}

// ─── 11. Government Levels (civics ch11) ─────────────────────
// Drag responsibilities to the right government level.
export function GovernmentLevels() {
    const items = [
        { id: 'i1', text: 'Build national highways', level: 'central', emoji: '🛣️' },
        { id: 'i2', text: 'Run a city hospital', level: 'local', emoji: '🏥' },
        { id: 'i3', text: 'State police force', level: 'state', emoji: '👮' },
        { id: 'i4', text: 'Army and defense', level: 'central', emoji: '🎖️' },
        { id: 'i5', text: 'Garbage collection', level: 'local', emoji: '🗑️' },
        { id: 'i6', text: 'State education policy', level: 'state', emoji: '🏫' },
    ];
    const levels = [
        { id: 'central', label: 'Central Govt', color: 'bg-indigo-500' },
        { id: 'state', label: 'State Govt', color: 'bg-purple-500' },
        { id: 'local', label: 'Local Govt', color: 'bg-teal-500' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (itemId: string, levelId: string) => {
        const item = items.find(i => i.id === itemId);
        setPlaced(p => ({ ...p, [itemId]: levelId }));
        setFeedback(f => ({ ...f, [itemId]: item?.level === levelId }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Who does what? Drag to the right level!</div>
            <div className="flex gap-3 w-full justify-center">
                {levels.map(l => (
                    <div key={l.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, l.id); }}
                        className={`flex-1 max-w-xs min-h-[160px] ${l.color} rounded-2xl p-3 shadow-lg`}>
                        <div className="text-white font-black text-center mb-2">{l.label}</div>
                        <div className="space-y-2">
                            {Object.entries(placed).filter(([_, lv]) => lv === l.id).map(([iid]) => {
                                const it = items.find(x => x.id === iid)!;
                                const ok = feedback[iid];
                                return (
                                    <div key={iid} className={`px-2 py-1.5 rounded-lg text-xs font-bold
                                        ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>
                                        {it.emoji} {it.text} {ok ? '✓' : '✗'}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
                {items.filter(i => !placed[i.id]).map(i => (
                    <div key={i.id} draggable
                        onDragStart={(e) => e.dataTransfer.setData('text', i.id)}
                        className="px-3 py-2 rounded-xl bg-amber-100 border-2 border-amber-300 font-bold text-sm cursor-grab active:cursor-grabbing shadow">
                        {i.emoji} {i.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── 12. Media Filter (civics ch15) ──────────────────────────
// Sort headlines into Fact vs Opinion — media literacy.
export function MediaFilter() {
    const headlines = [
        { id: 'h1', text: 'India won the cricket match 3-2', type: 'fact' },
        { id: 'h2', text: 'Cricket is the most exciting sport', type: 'opinion' },
        { id: 'h3', text: 'Temperature reached 42°C today', type: 'fact' },
        { id: 'h4', text: 'Rainy days are the best days', type: 'opinion' },
        { id: 'h5', text: 'School starts at 8 AM', type: 'fact' },
        { id: 'h6', text: 'Homework should be banned', type: 'opinion' },
    ];
    const bins = [
        { id: 'fact', label: 'Fact', color: 'bg-blue-500' },
        { id: 'opinion', label: 'Opinion', color: 'bg-amber-500' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (hid: string, bid: string) => {
        const h = headlines.find(x => x.id === hid);
        setPlaced(p => ({ ...p, [hid]: bid }));
        setFeedback(f => ({ ...f, [hid]: h?.type === bid }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Fact or Opinion? Sort the headlines!</div>
            <div className="flex gap-4 w-full justify-center">
                {bins.map(b => (
                    <div key={b.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, b.id); }}
                        className={`flex-1 max-w-xs min-h-[140px] ${b.color} rounded-2xl p-3 shadow-lg`}>
                        <div className="text-white font-black text-center mb-2">{b.label}</div>
                        <div className="space-y-2">
                            {Object.entries(placed).filter(([_, bv]) => bv === b.id).map(([hid]) => {
                                const h = headlines.find(x => x.id === hid)!;
                                const ok = feedback[hid];
                                return (
                                    <div key={hid} className={`px-2 py-1.5 rounded-lg text-xs font-bold
                                        ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>
                                        {h.text} {ok ? '✓' : '✗'}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
                {headlines.filter(h => !placed[h.id]).map(h => (
                    <div key={h.id} draggable
                        onDragStart={(e) => e.dataTransfer.setData('text', h.id)}
                        className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-sm cursor-grab active:cursor-grabbing shadow">
                        {h.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── 13. Weather vs Climate (geography ch02) ─────────────────
// Sort statements into Weather (today) vs Climate (long-term).
export function WeatherClimateSort() {
    const statements = [
        { id: 'w1', text: 'It rained 30mm today', type: 'weather' },
        { id: 'w2', text: 'Monsoon lasts June-September', type: 'climate' },
        { id: 'w3', text: 'Today is 35°C and sunny', type: 'weather' },
        { id: 'w4', text: 'Rajasthan is a desert region', type: 'climate' },
        { id: 'w5', text: 'Humidity is 80% right now', type: 'weather' },
        { id: 'w6', text: 'India has tropical climate', type: 'climate' },
    ];
    const bins = [
        { id: 'weather', label: 'Weather (now)', color: 'bg-sky-500' },
        { id: 'climate', label: 'Climate (long-term)', color: 'bg-orange-500' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (sid: string, bid: string) => {
        const s = statements.find(x => x.id === sid);
        setPlaced(p => ({ ...p, [sid]: bid }));
        setFeedback(f => ({ ...f, [sid]: s?.type === bid }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Weather or Climate? Sort it!</div>
            <div className="flex gap-4 w-full justify-center">
                {bins.map(b => (
                    <div key={b.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, b.id); }}
                        className={`flex-1 max-w-xs min-h-[140px] ${b.color} rounded-2xl p-3 shadow-lg`}>
                        <div className="text-white font-black text-center mb-2">{b.label}</div>
                        <div className="space-y-2">
                            {Object.entries(placed).filter(([_, bv]) => bv === b.id).map(([sid]) => {
                                const s = statements.find(x => x.id === sid)!;
                                const ok = feedback[sid];
                                return (
                                    <div key={sid} className={`px-2 py-1.5 rounded-lg text-xs font-bold
                                        ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>
                                        {s.text} {ok ? '✓' : '✗'}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
                {statements.filter(s => !placed[s.id]).map(s => (
                    <div key={s.id} draggable
                        onDragStart={(e) => e.dataTransfer.setData('text', s.id)}
                        className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-sm cursor-grab active:cursor-grabbing shadow">
                        {s.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── 14. Constitution Builder (history ch12) ─────────────────
// Drag values into the Constitution — what should it include?
export function ConstitutionBuilder() {
    const values = [
        { id: 'v1', text: 'Equality for all', emoji: '⚖️', include: true },
        { id: 'v2', text: 'Freedom of speech', emoji: '🗣️', include: true },
        { id: 'v3', text: 'Right to education', emoji: '📚', include: true },
        { id: 'v4', text: 'Only rich can vote', emoji: '💰', include: false },
        { id: 'v5', text: 'No discrimination', emoji: '🤝', include: true },
        { id: 'v6', text: 'King makes all laws', emoji: '👑', include: false },
    ];
    const [placed, setPlaced] = useState<Record<string, boolean>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const place = (id: string, include: boolean) => {
        const v = values.find(x => x.id === id);
        setPlaced(p => ({ ...p, [id]: include }));
        setFeedback(f => ({ ...f, [id]: v?.include === include }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Build the Constitution! Include or Reject?</div>
            <div className="flex gap-4 w-full justify-center">
                <div className="flex-1 max-w-xs bg-emerald-500 rounded-2xl p-3 shadow-lg min-h-[160px]">
                    <div className="text-white font-black text-center mb-2">📜 Include</div>
                    <div className="space-y-2">
                        {Object.entries(placed).filter(([_, inc]) => inc).map(([vid]) => {
                            const v = values.find(x => x.id === vid)!;
                            const ok = feedback[vid];
                            return <div key={vid} className={`px-2 py-1.5 rounded-lg text-xs font-bold ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>{v.emoji} {v.text} {ok ? '✓' : '✗'}</div>;
                        })}
                    </div>
                </div>
                <div className="flex-1 max-w-xs bg-red-500 rounded-2xl p-3 shadow-lg min-h-[160px]">
                    <div className="text-white font-black text-center mb-2">❌ Reject</div>
                    <div className="space-y-2">
                        {Object.entries(placed).filter(([_, inc]) => !inc).map(([vid]) => {
                            const v = values.find(x => x.id === vid)!;
                            const ok = feedback[vid];
                            return <div key={vid} className={`px-2 py-1.5 rounded-lg text-xs font-bold ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>{v.emoji} {v.text} {ok ? '✓' : '✗'}</div>;
                        })}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
                {values.filter(v => !(v.id in placed)).map(v => (
                    <div key={v.id} className="flex gap-1">
                        <button onClick={() => place(v.id, true)}
                            className="px-3 py-2 rounded-xl bg-emerald-100 border-2 border-emerald-300 font-bold text-sm shadow">✓ {v.emoji} {v.text}</button>
                        <button onClick={() => place(v.id, false)}
                            className="px-3 py-2 rounded-xl bg-red-100 border-2 border-red-300 font-bold text-sm shadow">✗</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Registry: chapter → interactive component ──────────────
// Imports from subject-specific files for unique per-chapter interactives.
import { PlotArcDiagram, CharacterMap, PoemHighlighter, SentenceBuilder, LetterFormatter } from './interactives_english';
import { DynastyTree, VijayanagaraMap, TradeRouteMap, FreedomLeaderMatcher, PreambleBuilder } from './interactives_history';
import { GrowthTimeline } from './interactives_social';
import { TaxFlowDiagram, DiversityWeb, InfrastructureBuilder, BankingFlow, MarketMatch, EconomyRoleSorter, ClimateZoneMapper } from './interactives_social';

export const C6_INTERACTIVES: Record<string, React.ComponentType<any>> = {
    // Math — bespoke per chapter
    'c6_math_ch04': DecimalPlaceValue,
    'c6_math_ch06': RatioMixer,
    'c6_math_ch12': NumberPatternBuilder,
    // Science — bespoke per chapter
    'c6_biology_ch06': GrowthTimeline,
    // Civics — unique per chapter
    'c6_civics_ch10': RightsSorter,
    'c6_civics_ch11': GovernmentLevels,
    'c6_civics_ch13': TaxFlowDiagram,
    'c6_civics_ch14': DiversityWeb,
    'c6_civics_ch15': MediaFilter,
    'c6_civics_ch16': EconomyRoleSorter,
    // Economics — unique per chapter
    'c6_economics_ch07': InfrastructureBuilder,
    'c6_economics_ch08': BankingFlow,
    'c6_economics_ch11': BarterMatch,
    'c6_economics_ch12': MarketMatch,
    // Geography — unique per chapter
    'c6_geography_ch02': WeatherClimateSort,
    'c6_geography_ch03': ClimateZoneMapper,
    'c6_geography_ch04': TimelineBuilder,
    'c6_geography_ch05': NeighbourMap,
    // History — unique per chapter
    'c6_history_ch07': DynastyTree,
    'c6_history_ch08': VijayanagaraMap,
    'c6_history_ch10': TradeRouteMap,
    'c6_history_ch11': FreedomLeaderMatcher,
    'c6_history_ch12': PreambleBuilder,
    // English — unique per unit
    'c6_english_u1': PlotArcDiagram,
    'c6_english_u2': CharacterMap,
    'c6_english_u3': PoemHighlighter,
    'c6_english_u4': SentenceBuilder,
    'c6_english_u5': LetterFormatter,
};
