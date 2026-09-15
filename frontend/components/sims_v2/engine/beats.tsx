'use client';
/**
 * BeatsRunner — renders TeachBeat[] during the 'teach' phase.
 * Teaching is instrumented DOING, not slides: missions manipulate labs,
 * scaffolds fade worked examples, cases branch on decisions. Every beat
 * emits a signal event (onSignal) so teaching feeds BKT, not just play.
 */
import { useState, useEffect, useMemo } from 'react';
import { shuffled } from './shuffle';
import { motion } from 'framer-motion';
import { CanvasLab, LABS } from './canvasLab';
import { validateGoal } from './widgets';
import { WIDGETS } from './widgets';
import { generateChallenges } from './generators';
import { optionText } from './types';
import { themeFor } from './theme';

/** ?autotest=1 — CI playthrough mode: lab missions and typed blanks
 *  auto-satisfy so a robot can walk the whole loop. Never active
 *  without the explicit flag, so students can't accidentally bypass. */
const AUTOTEST = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('autotest');
import { speechManager } from '../../../lib/sim-engine/speech';
import { LazyAutoMath } from '../../solver/LazyMath';
import type { TeachBeat, SimAnswerEvent } from './types';

interface Props {
    beats: TeachBeat[];
    simId: string;
    classLevel: number;
    junior: boolean;
    subject?: string;
    onSignal?: (ev: Partial<SimAnswerEvent>) => void;   // teaching-phase evidence
    onDone: () => void;
}

const BEAT_STYLE: Record<string, { chip: string; icon: string; card: string }> = {
    mission:  { chip: 'from-violet-500 to-indigo-600', icon: '🎯', card: 'border-violet-300 shadow-violet-200/60' },
    scaffold: { chip: 'from-amber-400 to-orange-500',  icon: '🪜', card: 'border-amber-300 shadow-amber-200/60' },
    case:     { chip: 'from-rose-500 to-pink-600',     icon: '⚖️', card: 'border-rose-300 shadow-rose-200/60' },
    dissect:  { chip: 'from-cyan-500 to-sky-600',      icon: '🔬', card: 'border-cyan-300 shadow-cyan-200/60' },
    build:    { chip: 'from-emerald-500 to-teal-600',  icon: '🔧', card: 'border-emerald-300 shadow-emerald-200/60' },
    drill:    { chip: 'from-orange-500 to-red-500',    icon: '⚡', card: 'border-orange-300 shadow-orange-200/60' },
};

export function BeatsRunner({ beats, simId, classLevel, junior, subject, onSignal, onDone }: Props) {
    const [idx, setIdx] = useState(0);
    const beat = beats[idx];
    const theme = themeFor(subject ?? '');
    const next = () => (idx < beats.length - 1 ? setIdx(i => i + 1) : onDone());
    // junior mode narrates each beat title
    useEffect(() => { if (junior && beat) speechManager.speak(beat.title); }, [idx, junior]);
    const signal = (ev: Partial<SimAnswerEvent>) =>
        onSignal?.({ simId, challengeType: `beat:${beat.type}` as any, nodeId: beat.nodeId, timestamp: new Date().toISOString(), ...ev });

    if (!beat) return null;
    const st = BEAT_STYLE[beat.type] ?? BEAT_STYLE.case;
    const chip = junior ? st.chip : theme.chip;
    return (
        <div className="flex flex-col items-center w-full">
            {/* type chip + progress */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${chip} text-white ${junior ? 'text-sm px-5 py-2' : 'text-xs'} font-black uppercase tracking-widest shadow-lg mb-2`}>
                <span>{junior ? theme.icon : st.icon}</span>{beat.type} · {idx + 1}/{beats.length}
            </div>
            <div className={`${junior ? 'w-72 h-2.5' : 'w-56 h-1.5'} rounded-full bg-slate-200 mb-4 overflow-hidden`}>
                <motion.div className={`h-full rounded-full bg-gradient-to-r ${chip}`}
                    animate={{ width: `${((idx + 1) / beats.length) * 100}%` }} transition={{ type: 'spring', stiffness: 120 }} />
            </div>
            <h3 className={`${junior ? 'text-3xl' : 'text-lg'} font-black text-slate-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] text-center mb-4`}>{beat.title}</h3>
            <motion.div key={idx} initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                className={`w-full rounded-3xl bg-white/90 border-2 ${junior ? 'rounded-[2rem] p-6' : st.card} shadow-xl p-4 flex flex-col items-center`}>
                {beat.type === 'mission' && beat.mission && <MissionBeat beat={beat} signal={signal} onPass={next} junior={junior} />}
                {beat.type === 'scaffold' && beat.scaffold && <ScaffoldBeat beat={beat} signal={signal} onPass={next} />}
                {beat.type === 'case' && beat.caseStudy && <CaseBeat beat={beat} signal={signal} onPass={next} />}
                {beat.type === 'dissect' && beat.dissect && <DissectBeat beat={beat} signal={signal} onPass={next} />}
                {beat.type === 'build' && beat.build && <BuildBeat beat={beat} signal={signal} onPass={next} />}
                {beat.type === 'drill' && beat.drill && <DrillBeat beat={beat} classLevel={classLevel} signal={signal} onPass={next} />}
            </motion.div>
        </div>
    );
}

type B = { beat: TeachBeat; signal: (e: Partial<SimAnswerEvent>) => void; onPass: () => void; junior?: boolean };

/* MISSION — manipulate a world to a validated goal */
function MissionBeat({ beat, signal, onPass, junior }: B) {
    const m = beat.mission!;
    const [st, setSt] = useState<Record<string, number>>({});
    const [done, setDone] = useState(false);
    const [failed, setFailed] = useState(false);
    const [tries, setTries] = useState(0);
    const lab = LABS[m.widget];
    // juniors get tactile DOM widgets; seniors get the (usually 3D) lab —
    // falling back to the DOM widget when a lab kind doesn't exist.
    const preferLab = !junior && !!lab;
    const W = preferLab ? undefined : WIDGETS[m.widget];
    useEffect(() => { if (AUTOTEST) setDone(true); }, []);
    return (
        <div className="w-full flex flex-col items-center gap-3">
            {m.context && <p className="text-xs font-semibold text-slate-500 text-center italic">{m.context}</p>}
            <p className="text-sm font-bold text-gray-700 text-center">{m.instruction}</p>
            {W ? <W onChange={setSt} /> : lab ? <CanvasLab spec={lab} onChange={setSt} labels={m.labels} /> : null}
            {!done ? (
                <motion.button whileTap={{ scale: 0.94 }}
                    onClick={() => { const ok = validateGoal(m.validate, st); signal({ correct: ok }); ok ? setDone(true) : (setFailed(true), setTries(t => t + 1)); }}
                    className="px-6 py-2.5 rounded-2xl bg-emerald-500 text-white font-black shadow">Check ✅</motion.button>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    {m.observePrompt && <p className="text-sm font-semibold text-indigo-700 text-center">{m.observePrompt}</p>}
                    <motion.button whileTap={{ scale: 0.94 }} onClick={onPass}
                        className="px-6 py-2.5 rounded-2xl bg-indigo-500 text-white font-black shadow">Continue →</motion.button>
                </div>
            )}
            {failed && <p className="text-xs font-bold text-rose-500">Not yet — adjust and check again.</p>}
            {tries >= 2 && !done && (
                <button onClick={onPass}
                    className="text-xs font-black text-slate-400 underline hover:text-slate-600 mt-1">
                    skip for now — I'll come back to this
                </button>
            )}
        </div>
    );
}

/* loose answer match — strip math delimiters, tolerate numeric forms */
function answersMatch(input: string, expected: string): boolean {
    const norm = (x: string) => x.toLowerCase()
        .replace(/\\[\(\)\[\]]|\\cdot|\\times/g, '*')
        .replace(/[${}]/g, '')
        .replace(/[×]/g, '*').replace(/[−–—]/g, '-')
        .replace(/\s+/g, ' ').trim();
    const a = norm(input), b = norm(expected);
    if (!a || !b) return false;
    if (a === b) return true;
    // numeric: 1.76e-9 ≡ 1.76*10^-9 ≡ 0.00000000176
    const num = (x: string) => {
        const m = x.match(/-?\d+\.?\d*(?:\*\s*10\^?-?\d+|e-?\d+)?/);
        if (!m) return null;
        try { return Function(`"use strict"; return (${m[0].replace(/\^/g, '**')})`)(); } catch { return null; }
    };
    const na = num(a), nb = num(b);
    if (na != null && nb != null && Math.abs(nb) > 0) return Math.abs(na - nb) / Math.abs(nb) < 0.01;
    // containment for longer expected answers
    if (b.length > 10 && (a.includes(b) || b.includes(a))) return true;
    return false;
}

/* SCAFFOLD — worked-example fading: last step(s) are blanks the student fills.
   Responsive: a failed check offers a "show me" reveal per faded step. */
function ScaffoldBeat({ beat, signal, onPass }: B) {
    const s = beat.scaffold!;
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [checked, setChecked] = useState(false);
    const [revealed, setRevealed] = useState<Record<number, boolean>>({});
    const faded = s.steps.map((st, i) => ({ st, i })).filter(x => x.st.faded);
    const allRight = faded.every(x => revealed[x.i] || answersMatch(answers[x.i] ?? '', x.st.blankAnswer ?? ''));
    useEffect(() => { if (AUTOTEST) { const r: Record<number, boolean> = {}; faded.forEach(x => { r[x.i] = true; }); setRevealed(r); setChecked(true); setTimeout(onPass, 700); } }, []);
    return (
        <div className="w-full max-w-lg">
            <p className="text-sm font-bold text-gray-700 mb-3"><LazyAutoMath text={s.problem} /></p>
            <div className="space-y-2 mb-4">
                {s.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-2 bg-indigo-50 rounded-xl px-3 py-2">
                        <span className="font-black text-indigo-400 text-sm">{i + 1}.</span>
                        {st.faded ? (
                            revealed[i] ? (
                                <p className="text-sm font-semibold text-emerald-700"><LazyAutoMath text={st.blankAnswer ?? st.text} /></p>
                            ) : (
                                <div className="flex-1 flex flex-col gap-1">
                                    <input value={answers[i] ?? ''} onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                                        placeholder={checked && !allRight ? 'try again…' : 'your answer'}
                                        className="px-2 py-0.5 rounded-lg border-2 border-indigo-300 font-bold text-sm" />
                                    {checked && !allRight && (
                                        <button onClick={() => setRevealed(r => ({ ...r, [i]: true }))}
                                            className="text-[10px] font-bold text-indigo-500 underline text-left">stuck? show me this step</button>
                                    )}
                                </div>
                            )
                        ) : <p className="text-sm font-semibold text-gray-700"><LazyAutoMath text={st.text} /></p>}
                    </div>
                ))}
            </div>
            <motion.button whileTap={{ scale: 0.94 }}
                onClick={() => { setChecked(true); signal({ correct: allRight }); if (allRight) setTimeout(onPass, 600); }}
                className="px-6 py-2.5 rounded-2xl bg-emerald-500 text-white font-black shadow">
                {checked && allRight ? 'Correct! ✓' : 'Check steps ✅'}
            </motion.button>
            {checked && !allRight && <p className="text-xs font-bold text-rose-500 mt-2">A faded step is wrong — rework it.</p>}
        </div>
    );
}

/* CASE — branching decisions with consequence + misconception tags */
function CaseBeat({ beat, signal, onPass }: B) {
    const c = beat.caseStudy!;
    const [di, setDi] = useState(0);
    const [picked, setPicked] = useState<number | null>(null);
    const dec = c.decisions[di];
    // authored options are correct-first — shuffle display order (seeded,
    // stable) so position never leaks the answer; `picked` indexes `opts`
    const opts = useMemo(() => dec ? shuffled(dec.options, dec.prompt) : [], [dec]);
    if (!dec) return <button onClick={onPass} className="px-6 py-2.5 rounded-2xl bg-indigo-500 text-white font-black shadow">Continue →</button>;
    return (
        <div className="w-full max-w-lg">
            {di === 0 && picked === null && <p className="text-sm font-semibold text-gray-600 mb-3 text-center">{c.intro}</p>}
            <p className="text-sm font-bold text-gray-800 mb-3">{dec.prompt}</p>
            <div className="flex flex-col gap-2">
                {opts.map((o, i) => (
                    <motion.button key={i} whileTap={{ scale: 0.97 }} disabled={picked !== null}
                        onClick={() => { setPicked(i); signal({ correct: !o.reveals }); }}
                        className={`px-4 py-2.5 rounded-xl font-bold text-sm text-left shadow border-2 ${picked === i ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                        {o.text}
                    </motion.button>
                ))}
            </div>
            {picked !== null && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                    <p className={`text-sm font-semibold rounded-xl px-3 py-2 ${opts[picked].reveals ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                        {opts[picked].outcome}
                    </p>
                    <motion.button whileTap={{ scale: 0.94 }}
                        onClick={() => { setPicked(null); di < c.decisions.length - 1 ? setDi(d => d + 1) : onPass(); }}
                        className="mt-3 px-6 py-2.5 rounded-2xl bg-indigo-500 text-white font-black shadow">
                        {di < c.decisions.length - 1 ? 'Next decision →' : 'Done →'}
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}

/* DISSECT — identify each spot on the specimen (tap-answer prompts) */
function DissectBeat({ beat, signal, onPass }: B) {
    const d = beat.dissect!;
    const [si, setSi] = useState(0);
    const spot = d.spots[si];
    const spotOpts = useMemo(() => spot ? shuffled(spot.options ?? [spot.answer], spot.prompt) : [], [spot]);
    if (!spot) return <button onClick={onPass} className="px-6 py-2.5 rounded-2xl bg-indigo-500 text-white font-black shadow">Continue →</button>;
    return (
        <div className="w-full max-w-lg">
            <p className="text-xs font-black text-indigo-400 uppercase mb-1">Spot {si + 1}/{d.spots.length}: {spot.label}</p>
            <p className="text-sm font-bold text-gray-800 mb-3">{spot.prompt}</p>
            <div className="flex flex-wrap gap-2">
                {spotOpts.map((o, i) => (
                    <motion.button key={i} whileTap={{ scale: 0.95 }}
                        onClick={() => { signal({ correct: o === spot.answer }); o === spot.answer ? setSi(s => s + 1) : null; }}
                        className="px-4 py-2.5 rounded-xl bg-amber-100 border-2 border-amber-300 font-bold text-sm text-amber-900">{o}</motion.button>
                ))}
            </div>
        </div>
    );
}

/* BUILD — constrained construction from blocks or free input */
function BuildBeat({ beat, signal, onPass }: B) {
    const b = beat.build!;
    const [ans, setAns] = useState('');
    const [tried, setTried] = useState(false);
    const ok = ans.trim().toLowerCase() === b.answer.trim().toLowerCase();
    return (
        <div className="w-full max-w-lg flex flex-col items-center gap-3">
            <p className="text-sm font-bold text-gray-800 text-center">{b.prompt}</p>
            {b.blocks?.length ? (
                <div className="flex flex-wrap gap-2 justify-center">
                    {b.blocks.map((bl, i) => (
                        <button key={i} onClick={() => setAns(a => a ? a + ' ' + bl : bl)}
                            className="px-3 py-1.5 rounded-lg bg-indigo-100 border-2 border-indigo-300 font-bold text-xs text-indigo-900">{bl}</button>
                    ))}
                </div>
            ) : null}
            <input value={ans} onChange={e => setAns(e.target.value)} placeholder="construct your answer"
                className="px-4 py-2.5 rounded-xl border-2 border-indigo-300 font-bold w-64 text-center" />
            <motion.button whileTap={{ scale: 0.94 }}
                onClick={() => { setTried(true); signal({ correct: ok }); if (ok) setTimeout(onPass, 700); }}
                className="px-6 py-2.5 rounded-2xl bg-emerald-500 text-white font-black shadow">Check ✅</motion.button>
            {tried && !ok && <p className="text-xs font-bold text-rose-500">Not quite — rebuild it.</p>}
        </div>
    );
}

/* DRILL — a burst of generated retrieval items */
function DrillBeat({ beat, classLevel, signal, onPass }: B & { classLevel: number }) {
    const d = beat.drill!;
    const [items] = useState(() => generateChallenges(d.kind, d.count, d.level ?? classLevel));
    const [i, setI] = useState(0);
    const item = items[i];
    if (!item) return <button onClick={onPass} className="px-6 py-2.5 rounded-2xl bg-indigo-500 text-white font-black shadow">Continue →</button>;
    return (
        <div className="w-full max-w-lg flex flex-col items-center gap-3">
            <p className="text-xs font-black text-indigo-400 uppercase">drill {i + 1}/{items.length}</p>
            <p className="text-base font-black text-gray-800 text-center">{item.question}</p>
            <div className="flex flex-wrap gap-2 justify-center">
                {(item.options ?? []).map((o, j) => (
                    <motion.button key={j} whileTap={{ scale: 0.95 }}
                        onClick={() => { const ok = optionText(o) === item.answer; signal({ correct: ok }); ok ? setI(x => x + 1) : null; }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black text-sm shadow border-2 border-amber-500">
                        {optionText(o)}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
