/**
 * C6 English Interactives — real literary manipulation, not generic sorts.
 * Each unit gets a bespoke interactive matched to its actual content.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── U1: Plot Arc Diagram ("The Day the River Spoke") ────────
// Drag story events onto Freytag's pyramid (exposition → rising → climax → falling → resolution)
export function PlotArcDiagram() {
    const events = [
        { id: 'e1', text: 'Jahnavi lives near a river and hears it whisper', stage: 'exposition' },
        { id: 'e2', text: 'She wants to go to school but family says no', stage: 'rising' },
        { id: 'e3', text: 'She decides to follow the river\'s advice', stage: 'climax' },
        { id: 'e4', text: 'Jahnavi struggles but keeps trying', stage: 'falling' },
        { id: 'e5', text: 'She finally reaches school — dream fulfilled', stage: 'resolution' },
    ];
    const stages = [
        { id: 'exposition', label: 'Exposition', x: 10, y: 70, color: 'bg-blue-500' },
        { id: 'rising', label: 'Rising Action', x: 30, y: 40, color: 'bg-amber-500' },
        { id: 'climax', label: 'Climax', x: 50, y: 10, color: 'bg-red-500' },
        { id: 'falling', label: 'Falling Action', x: 70, y: 40, color: 'bg-purple-500' },
        { id: 'resolution', label: 'Resolution', x: 90, y: 70, color: 'bg-emerald-500' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (eid: string, sid: string) => {
        const ev = events.find(e => e.id === eid);
        setPlaced(p => ({ ...p, [eid]: sid }));
        setFeedback(f => ({ ...f, [eid]: ev?.stage === sid }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Drag events onto the plot arc!</div>
            {/* Plot arc SVG */}
            <div className="relative w-full max-w-lg h-64 bg-amber-50 rounded-2xl border-4 border-amber-200 overflow-hidden">
                <svg viewBox="0 0 100 80" className="absolute inset-0 w-full h-full">
                    <path d="M5 70 Q25 10 50 10 Q75 10 95 70" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4,2" />
                </svg>
                {stages.map(s => (
                    <div key={s.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, s.id); }}
                        className={`absolute w-24 rounded-lg p-1 text-center text-xs font-bold text-white ${s.color}`}
                        style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)' }}>
                        {s.label}
                        {Object.entries(placed).filter(([_, st]) => st === s.id).map(([eid]) => {
                            const ev = events.find(e => e.id === eid)!;
                            const ok = feedback[eid];
                            return <div key={eid} className={`mt-1 text-[10px] px-1 rounded ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>{ev.text.slice(0, 25)}... {ok ? '✓' : '✗'}</div>;
                        })}
                    </div>
                ))}
            </div>
            {/* Events to drag */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {events.filter(e => !placed[e.id]).map(e => (
                    <div key={e.id} draggable
                        onDragStart={(e2) => e2.dataTransfer.setData('text', e.id)}
                        className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-xs cursor-grab active:cursor-grabbing shadow">
                        {e.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── U2: Character Map ("Dr. Dolittle") ──────────────────────
// Drag traits + quotes to the right character — shows how characters are built.
export function CharacterMap() {
    const characters = [
        { id: 'dolittle', name: 'Dr. Dolittle', color: 'bg-blue-500', emoji: '👨‍⚕️' },
        { id: 'animals', name: 'The Animals', color: 'bg-emerald-500', emoji: '🦜' },
        { id: 'townsfolk', name: 'Townsfolk', color: 'bg-amber-500', emoji: '👥' },
    ];
    const traits = [
        { id: 't1', text: 'Loves animals deeply', char: 'dolittle' },
        { id: 't2', text: 'Can talk to animals', char: 'dolittle' },
        { id: 't3', text: 'Kind and curious', char: 'dolittle' },
        { id: 't4', text: 'Trust Dr. Dolittle', char: 'animals' },
        { id: 't5', text: 'Speak their own language', char: 'animals' },
        { id: 't6', text: 'Think Dolittle is strange', char: 'townsfolk' },
        { id: 't7', text: 'Don\'t understand animals', char: 'townsfolk' },
    ];
    const [placed, setPlaced] = useState<Record<string, boolean>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (tid: string, cid: string) => {
        const tr = traits.find(t => t.id === tid);
        setPlaced(p => ({ ...p, [tid]: true }));
        setFeedback(f => ({ ...f, [tid]: tr?.char === cid }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Match traits to characters!</div>
            <div className="flex gap-4 w-full justify-center">
                {characters.map(c => (
                    <div key={c.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, c.id); }}
                        className={`flex-1 max-w-xs min-h-[150px] ${c.color} rounded-2xl p-3 shadow-lg`}>
                        <div className="text-white font-black text-center mb-2">{c.emoji} {c.name}</div>
                        <div className="space-y-1.5">
                            {Object.entries(placed).filter(([tid]) => feedback[tid] && traits.find(t => t.id === tid)?.char === c.id).map(([tid]) => {
                                const tr = traits.find(t => t.id === tid)!;
                                return <div key={tid} className="px-2 py-1 rounded-lg text-xs font-bold bg-white/90 text-emerald-700">{tr.text} ✓</div>;
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {traits.filter(t => !placed[t.id]).map(t => (
                    <div key={t.id} draggable
                        onDragStart={(e) => e.dataTransfer.setData('text', t.id)}
                        className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-xs cursor-grab active:cursor-grabbing shadow">
                        {t.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── U3: Poem Highlighter ("Paper Boats" by Tagore) ─────────
// Click on words/lines that use poetic devices (imagery, personification, symbolism).
export function PoemHighlighter() {
    const lines = [
        { id: 'l1', text: 'Day by day I float my paper boats', devices: ['imagery'], highlight: false },
        { id: 'l2', text: 'down the running stream', devices: ['imagery'], highlight: false },
        { id: 'l3', text: 'I load my little boats with shiuli flowers', devices: ['imagery', 'symbolism'], highlight: false },
        { id: 'l4', text: 'The night comes, and the clouds gather', devices: ['personification'], highlight: false },
        { id: 'l5', text: 'The boats carry my dreams to distant shores', devices: ['symbolism', 'imagery'], highlight: false },
    ];
    const [found, setFound] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<string | null>(null);

    const clickLine = (lid: string) => {
        setFound(f => ({ ...f, [lid]: true }));
        setSelected(lid);
        setTimeout(() => setSelected(null), 1000);
    };

    const foundCount = Object.values(found).filter(Boolean).length;

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Click lines with poetic devices! 📝</div>
            <div className="bg-amber-50 rounded-2xl border-4 border-amber-200 p-4 max-w-lg w-full">
                {lines.map(l => (
                    <div key={l.id} onClick={() => clickLine(l.id)}
                        className={`p-2 rounded-lg cursor-pointer transition-all my-1 text-sm font-medium
                            ${found[l.id] ? 'bg-amber-200 text-amber-900' : 'hover:bg-amber-100 text-gray-700'}
                            ${selected === l.id ? 'scale-105 shadow-lg' : ''}`}>
                        {l.text}
                        {found[l.id] && <span className="text-xs ml-2 text-amber-700">→ {l.devices.join(', ')}</span>}
                    </div>
                ))}
            </div>
            <div className="text-sm text-gray-500">Found {foundCount}/{lines.length} poetic lines</div>
            {foundCount === lines.length && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="text-emerald-600 font-black text-lg">All devices found! 🌸</motion.div>
            )}
        </div>
    );
}

// ─── U4: Sentence Builder (Grammar) ─────────────────────────
// Drag words into correct order to build a sentence. Teaches sentence structure.
export function SentenceBuilder() {
    const target = 'The brave boy entered the dark tunnel carefully';
    const words = target.split(' ');
    const [shuffled] = useState(() => {
        const s = [...words];
        for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; }
        return s;
    });
    const [order, setOrder] = useState<string[]>([]);
    const [available, setAvailable] = useState(shuffled);
    const [checked, setChecked] = useState(false);

    const addWord = (w: string, i: number) => {
        setOrder(o => [...o, w]);
        setAvailable(a => a.filter((_, idx) => idx !== i));
    };
    const removeWord = (i: number) => {
        setAvailable(a => [...a, order[i]]);
        setOrder(o => o.filter((_, idx) => idx !== i));
    };
    const isCorrect = order.join(' ') === target;

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Build the sentence! Drag words in order</div>
            {/* Target sentence area */}
            <div className="min-h-[60px] w-full max-w-lg bg-blue-50 rounded-2xl border-4 border-blue-200 p-3 flex flex-wrap gap-2 items-center">
                {order.map((w, i) => (
                    <div key={i} onClick={() => removeWord(i)}
                        className="px-3 py-2 rounded-xl bg-blue-500 text-white font-bold cursor-pointer shadow text-sm">
                        {w}
                    </div>
                ))}
                {order.length === 0 && <span className="text-gray-400 text-sm">Click words below to build the sentence...</span>}
            </div>
            {/* Available words */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {available.map((w, i) => (
                    <button key={i} onClick={() => addWord(w, i)}
                        className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-sm shadow hover:border-blue-400">
                        {w}
                    </button>
                ))}
            </div>
            <button onClick={() => setChecked(true)}
                className="px-6 py-2 rounded-lg bg-emerald-500 text-white font-bold shadow">Check Sentence</button>
            {checked && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className={`font-black text-lg ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isCorrect ? '✓ Perfect sentence!' : '✗ Try again — check the word order!'}
                </motion.div>
            )}
        </div>
    );
}

// ─── U5: Letter Formatter ("A Homage to Brave Soldiers") ────
// Drag parts of a formal letter into correct layout positions.
export function LetterFormatter() {
    const parts = [
        { id: 'sender', text: 'Sender\'s Address', order: 1, emoji: '🏠' },
        { id: 'date', text: 'Date', order: 2, emoji: '📅' },
        { id: 'salutation', text: 'Dear Sir/Madam,', order: 3, emoji: '👋' },
        { id: 'subject', text: 'Subject: Homage to Soldiers', order: 4, emoji: '📋' },
        { id: 'body', text: 'Body of the letter...', order: 5, emoji: '✍️' },
        { id: 'closing', text: 'Yours faithfully,', order: 6, emoji: '🙏' },
        { id: 'name', text: 'Your Name', order: 7, emoji: '👤' },
    ];
    const [placed, setPlaced] = useState<number[]>([]);
    const [next, setNext] = useState(1);

    const place = (pid: string, order: number) => {
        if (order === next) {
            setPlaced(p => [...p, order]);
            setNext(n => n + 1);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Format the letter! Click parts in correct order</div>
            <div className="text-sm text-gray-500">Next: position {next}</div>
            {/* Letter layout */}
            <div className="w-full max-w-md bg-white rounded-2xl border-4 border-gray-300 p-6 min-h-[300px] shadow-lg">
                {placed.sort((a, b) => a - b).map(order => {
                    const p = parts.find(pt => pt.order === order)!;
                    return (
                        <motion.div key={order} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            className="mb-2 text-sm font-bold text-gray-700">
                            {p.emoji} {p.text}
                        </motion.div>
                    );
                })}
                {placed.length < parts.length && <div className="text-gray-300 text-sm italic">Click parts below in order...</div>}
            </div>
            {/* Parts to place */}
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {parts.filter(p => !placed.includes(p.order)).map(p => (
                    <button key={p.id} onClick={() => place(p.id, p.order)}
                        className={`px-3 py-2 rounded-xl font-bold text-sm shadow
                            ${p.order === next ? 'bg-emerald-100 border-2 border-emerald-400 animate-pulse' : 'bg-white border-2 border-gray-300'}`}>
                        {p.emoji} {p.text}
                    </button>
                ))}
            </div>
            {placed.length === parts.length && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="text-emerald-600 font-black text-lg">Perfect letter format! ✉️</motion.div>
            )}
        </div>
    );
}
