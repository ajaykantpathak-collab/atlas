/**
 * C6 History Interactives — each chapter gets a unique interactive
 * matched to its actual historical content.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Ch07: Delhi Sultanate Dynasty Tree ──────────────────────
// Drag dynasties into chronological order on a tree.
export function DynastyTree() {
    const dynasties = [
        { id: 'mamluk', name: 'Mamluk (Slave)', year: '1206', color: 'bg-red-500' },
        { id: 'khalji', name: 'Khalji', year: '1290', color: 'bg-amber-500' },
        { id: 'tughlaq', name: 'Tughlaq', year: '1320', color: 'bg-gold-500' },
        { id: 'sayyid', name: 'Sayyid', year: '1414', color: 'bg-purple-500' },
        { id: 'lodi', name: 'Lodi', year: '1451', color: 'bg-emerald-500' },
    ];
    const [order, setOrder] = useState<string[]>([]);
    const [available, setAvailable] = useState(dynasties.map(d => d.id));
    const [checked, setChecked] = useState(false);
    const correctOrder = dynasties.map(d => d.id);

    const place = (did: string) => {
        setOrder(o => [...o, did]);
        setAvailable(a => a.filter(id => id !== did));
    };
    const remove = (i: number) => {
        setAvailable(a => [...a, order[i]]);
        setOrder(o => o.filter((_, idx) => idx !== i));
    };
    const isCorrect = order.join(',') === correctOrder.join(',');

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Build the Delhi Sultanate dynasty tree! 🌳</div>
            <div className="flex flex-col gap-2 w-full max-w-md">
                {order.map((did, i) => {
                    const d = dynasties.find(x => x.id === did)!;
                    return (
                        <motion.div key={did} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                            onClick={() => remove(i)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${d.color} text-white font-bold cursor-pointer shadow`}>
                            <span className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">{i + 1}</span>
                            <span>{d.name}</span>
                            <span className="ml-auto text-sm opacity-80">{d.year}</span>
                        </motion.div>
                    );
                })}
                {order.length < dynasties.length && <div className="text-gray-300 text-sm italic py-2">Click dynasties below to add...</div>}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {available.map(did => {
                    const d = dynasties.find(x => x.id === did)!;
                    return (
                        <button key={did} onClick={() => place(did)}
                            className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-sm shadow hover:border-gold-400">
                            {d.name} ({d.year})
                        </button>
                    );
                })}
            </div>
            <button onClick={() => setChecked(true)} className="px-6 py-2 rounded-lg bg-emerald-500 text-white font-bold shadow">Check Order</button>
            {checked && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className={`font-black text-lg ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isCorrect ? '✓ Perfect dynasty order!' : '✗ Check the years — earliest first!'}
                </motion.div>
            )}
        </div>
    );
}

// ─── Ch08: Vijayanagara Empire Map ───────────────────────────
// Label key locations on a map of the Vijayanagara Empire.
export function VijayanagaraMap() {
    const locations = [
        { id: 'hampi', label: 'Hampi (Capital)', x: 45, y: 50, emoji: '🏛️' },
        { id: 'tungabhadra', label: 'Tungabhadra River', x: 40, y: 40, emoji: '🌊' },
        { id: 'krishna', label: 'Krishna River', x: 30, y: 65, emoji: '🌊' },
        { id: 'south', label: 'Southern Frontier', x: 50, y: 80, emoji: '⛰️' },
        { id: 'north', label: 'Northern Frontier', x: 50, y: 20, emoji: '⛰️' },
    ];
    const [placed, setPlaced] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (x: number, y: number) => {
        if (!selected) return;
        const loc = locations.find(l => l.id === selected);
        if (loc && Math.abs(x - loc.x) < 12 && Math.abs(y - loc.y) < 12) {
            setPlaced(p => ({ ...p, [selected]: true }));
        }
        setSelected(null);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Label the Vijayanagara Empire! 🗺️</div>
            <div className="relative w-80 h-96 bg-amber-50 rounded-2xl border-4 border-amber-200 overflow-hidden"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleClick(((e.clientX - rect.left) / rect.width) * 100, ((e.clientY - rect.top) / rect.height) * 100);
                }}>
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    <path d="M25 15 L65 10 L75 25 L80 40 L70 60 L55 85 L40 80 L30 60 L20 40 Z"
                        fill="#fde68a" stroke="#92400e" strokeWidth="1.5" />
                    <text x="45" y="50" className="fill-amber-800 font-black text-[7px]">VIJAYANAGARA</text>
                </svg>
                {locations.filter(l => placed[l.id]).map(l => (
                    <div key={l.id} className="absolute text-2xl" style={{ left: `${l.x}%`, top: `${l.y}%`, transform: 'translate(-50%,-50%)' }}>
                        {l.emoji}
                        <div className="text-xs font-bold text-gray-700 bg-white/80 rounded px-1">{l.label}</div>
                    </div>
                ))}
                {selected && (() => {
                    const l = locations.find(x => x.id === selected);
                    return l ? <div className="absolute text-3xl animate-pulse" style={{ left: `${l.x}%`, top: `${l.y}%`, transform: 'translate(-50%,-50%)' }}>📍</div> : null;
                })()}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {locations.filter(l => !placed[l.id]).map(l => (
                    <button key={l.id} onClick={() => setSelected(l.id)}
                        className={`px-3 py-2 rounded-xl font-bold text-sm shadow ${selected === l.id ? 'bg-gold-500 text-white' : 'bg-white border-2 border-gray-300'}`}>
                        {l.emoji} {l.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Ch10: European Trade Routes ────────────────────────────
// Draw trade routes from Europe to India on a map.
export function TradeRouteMap() {
    const routes = [
        { id: 'portugal', from: 'Portugal', to: 'India (Goa)', year: '1498', explorer: 'Vasco da Gama', color: '#3b82f6' },
        { id: 'dutch', from: 'Netherlands', to: 'India (Coromandel)', year: '1605', explorer: 'Dutch EIC', color: '#f59e0b' },
        { id: 'british', from: 'Britain', to: 'India (Surat)', year: '1613', explorer: 'British EIC', color: '#ef4444' },
        { id: 'french', from: 'France', to: 'India (Pondicherry)', year: '1668', explorer: 'French EIC', color: '#8b5cf6' },
    ];
    const [selected, setSelected] = useState<string | null>(null);
    const [matched, setMatched] = useState<Record<string, boolean>>({});

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Match European traders to their routes! 🚢</div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {routes.map(r => (
                    <div key={r.id} onClick={() => {
                        if (matched[r.id]) return;
                        if (!selected) setSelected(r.id);
                        else if (selected !== r.id) {
                            // match by year order — earliest first
                            const a = routes.find(x => x.id === selected);
                            const b = r;
                            if (a && parseInt(a.year) < parseInt(b.year)) {
                                setMatched(m => ({ ...m, [a.id]: true, [b.id]: true }));
                            }
                            setSelected(null);
                        }
                    }}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all
                            ${matched[r.id] ? 'bg-emerald-100 border-emerald-400' : selected === r.id ? 'bg-gold-100 border-gold-500 scale-105' : 'bg-white border-gray-300'}`}>
                        <div className="font-bold text-sm text-gray-700">{r.from} → {r.to}</div>
                        <div className="text-xs text-gray-500">{r.explorer} ({r.year})</div>
                        {matched[r.id] && <div className="text-emerald-600 text-xs font-bold mt-1">✓ Matched!</div>}
                    </div>
                ))}
            </div>
            <div className="text-sm text-gray-500">Match earliest route first, then next earliest</div>
        </div>
    );
}

// ─── Ch11: Freedom Movement Leader Matcher ──────────────────
// Match leaders to their movements/slogans.
export function FreedomLeaderMatcher() {
    const leaders = [
        { id: 'gandhi', name: 'Mahatma Gandhi', match: 'noncoop', emoji: '🧓' },
        { id: 'tilak', name: 'Bal Gangadhar Tilak', match: 'swaraj', emoji: '👨‍🏫' },
        { id: 'bose', name: 'Subhas Chandra Bose', match: 'azad', emoji: '💂' },
        { id: 'nehru', name: 'Jawaharlal Nehru', match: 'purna', emoji: '👨‍💼' },
    ];
    const movements = [
        { id: 'noncoop', text: 'Non-Cooperation Movement', emoji: '✋' },
        { id: 'swaraj', text: '"Swaraj is my birthright!"', emoji: '📢' },
        { id: 'azad', text: 'Indian National Army (Azad Hind)', emoji: '⚔️' },
        { id: 'purna', text: 'Purna Swaraj declaration', emoji: '🇮🇳' },
    ];
    const [matched, setMatched] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});
    const [selLeader, setSelLeader] = useState<string | null>(null);

    const match = (leaderId: string, movementId: string) => {
        const leader = leaders.find(l => l.id === leaderId);
        setMatched(m => ({ ...m, [leaderId]: movementId }));
        setFeedback(f => ({ ...f, [leaderId]: leader?.match === movementId }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Match leaders to their movements! 🇮🇳</div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {/* Leaders */}
                <div className="space-y-2">
                    <div className="text-xs font-black text-gray-400 uppercase">Leaders</div>
                    {leaders.filter(l => !matched[l.id]).map(l => (
                        <button key={l.id} onClick={() => setSelLeader(l.id)}
                            className={`w-full px-3 py-2 rounded-xl font-bold text-sm shadow text-left
                                ${selLeader === l.id ? 'bg-gold-500 text-white' : 'bg-white border-2 border-gray-300'}`}>
                            {l.emoji} {l.name}
                        </button>
                    ))}
                </div>
                {/* Movements */}
                <div className="space-y-2">
                    <div className="text-xs font-black text-gray-400 uppercase">Movements</div>
                    {movements.filter(m => !Object.values(matched).includes(m.id)).map(m => (
                        <button key={m.id} onClick={() => selLeader && match(selLeader, m.id)}
                            className="w-full px-3 py-2 rounded-xl font-bold text-sm shadow text-left bg-amber-100 border-2 border-amber-300">
                            {m.emoji} {m.text}
                        </button>
                    ))}
                </div>
            </div>
            {/* Matched pairs */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {Object.entries(matched).map(([lid, mid]) => {
                    const l = leaders.find(x => x.id === lid)!;
                    const m = movements.find(x => x.id === mid)!;
                    const ok = feedback[lid];
                    return <div key={lid} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{l.emoji} {l.name} → {m.text} {ok ? '✓' : '✗'}</div>;
                })}
            </div>
        </div>
    );
}

// ─── Ch12: Preamble Builder ──────────────────────────────────
// Drag the key values into the Preamble of the Constitution.
export function PreambleBuilder() {
    const values = [
        { id: 'justice', text: 'JUSTICE', emoji: '⚖️', order: 1 },
        { id: 'liberty', text: 'LIBERTY', emoji: '🕊️', order: 2 },
        { id: 'equality', text: 'EQUALITY', emoji: '🤝', order: 3 },
        { id: 'fraternity', text: 'FRATERNITY', emoji: '👨‍👩‍👧‍👦', order: 4 },
    ];
    const [placed, setPlaced] = useState<number[]>([]);
    const [next, setNext] = useState(1);

    const place = (v: typeof values[0]) => {
        if (v.order === next) {
            setPlaced(p => [...p, v.order]);
            setNext(n => n + 1);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Build the Preamble! 📜</div>
            <div className="text-sm text-gray-500">We the People of India... solemnly resolve to secure:</div>
            <div className="bg-amber-50 rounded-2xl border-4 border-amber-300 p-6 w-full max-w-md min-h-[120px] flex flex-wrap gap-3 items-center justify-center">
                {placed.sort((a, b) => a - b).map(order => {
                    const v = values.find(x => x.order === order)!;
                    return <motion.div key={order} initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="px-4 py-3 rounded-xl bg-amber-500 text-white font-black shadow-lg">{v.emoji} {v.text}</motion.div>;
                })}
                {placed.length < 4 && <span className="text-gray-300 text-sm italic">Click values in order...</span>}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {values.filter(v => !placed.includes(v.order)).map(v => (
                    <button key={v.id} onClick={() => place(v)}
                        className={`px-4 py-2 rounded-xl font-black text-sm shadow
                            ${v.order === next ? 'bg-emerald-100 border-2 border-emerald-400 animate-pulse' : 'bg-white border-2 border-gray-300'}`}>
                        {v.emoji} {v.text}
                    </button>
                ))}
            </div>
            {placed.length === 4 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="text-emerald-600 font-black text-lg">Preamble complete! 🇮🇳</motion.div>
            )}
        </div>
    );
}
