'use client'

/**
 * Sandbox3D — the full experiment world. A real 3D scene, a slider deck,
 * a guided experiment protocol (predict → measure → record → conclude),
 * and a journal that persists across sessions. This is what "sandbox"
 * means when it isn't a toy.
 */
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lab3D, type Vals } from './Lab3D'
import { LABS3D, type Lab3DSpec } from './scenes3d'
import { api } from '@/lib/api'

interface Trial { when: number; settings: Vals; predict: string; observed: string }

const PROTOCOL = [
    { id: 'explore', label: 'Explore', icon: '👀', hint: 'Play first — no agenda. Find what moves.' },
    { id: 'predict', label: 'Predict', icon: '🔮', hint: 'Write what you think will happen — before you touch it.' },
    { id: 'measure', label: 'Measure', icon: '📏', hint: 'Change ONE thing at a time. Watch what it does.' },
    { id: 'conclude', label: 'Conclude', icon: '📝', hint: 'Was your prediction right? What did you learn?' },
];

export function Sandbox3D({ labKey }: { labKey: string }) {
    const spec: Lab3DSpec | undefined = LABS3D.find(l => l.key === labKey);
    const [vals, setVals] = useState<Vals>({});
    const [step, setStep] = useState(0);
    const [prompt, setPrompt] = useState(0);
    const [predict, setPredict] = useState('');
    const [observed, setObserved] = useState('');
    const [trials, setTrials] = useState<Trial[]>([]);
    const key = `simsbx3d_${labKey}`;

    useEffect(() => {
        const init: Vals = {};
        spec?.sliders.forEach(s => { init[s.id] = s.start; });
        setVals(init); setStep(0);
        try { setTrials(JSON.parse(localStorage.getItem(key) ?? '[]')); } catch { }
    }, [labKey]);

    if (!spec) return <p className="text-slate-400 text-center py-12">No 3D lab for this one yet.</p>;

    const saveTrial = () => {
        const t: Trial = { when: Date.now(), settings: { ...vals }, predict: predict.trim(), observed: observed.trim() };
        const next = [t, ...trials].slice(0, 30);
        setTrials(next); setPredict(''); setObserved('');
        try {
            localStorage.setItem(key, JSON.stringify(next));
            const today = String(Math.floor(Date.now() / 86400000));
            if (localStorage.getItem('simdaily_last') !== today) {
                localStorage.setItem('simdaily_last', today);
                localStorage.setItem('simdaily_streak', String(+(localStorage.getItem('simdaily_streak') ?? '0') + 1));
            }
        } catch { }
        api.post('/api/intelligence/interaction', {
            student_id: 'anon', node_id: `sandbox3d_${labKey}`,
            question: 'guided experiment', response: `${t.predict} → ${t.observed}`,
            is_correct: true, time_spent_ms: 0, hints_used: 0, action_taken: 'sandbox_trial',
        }).catch(() => { });
    };

    const Scene = spec.scene;

    return (
        <div className="w-full">
            {/* header */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-[10px] font-black text-sky-300 uppercase tracking-widest">{spec.subject} · experiment</p>
                    <h2 className="text-2xl font-black text-white">{spec.emoji} {spec.title}</h2>
                </div>
                <button onClick={() => setPrompt(p => p + 1)}
                    className="text-[11px] font-black text-sky-300 border border-sky-400/40 rounded-xl px-3 py-2 hover:bg-sky-500/20 max-w-[45%] text-left">
                    🔍 {spec.prompts[prompt % spec.prompts.length]} <span className="text-sky-500">›</span>
                </button>
            </div>

            {/* protocol stepper */}
            <div className="flex gap-1.5 mb-4">
                {PROTOCOL.map((p, i) => (
                    <button key={p.id} onClick={() => setStep(i)}
                        className={`flex-1 rounded-xl px-2 py-2 text-center border-2 transition ${step === i ? 'bg-sky-500/15 border-sky-400/60' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'}`}>
                        <div className="text-base">{p.icon}</div>
                        <div className={`text-[9px] font-black uppercase tracking-wider ${step === i ? 'text-sky-200' : 'text-slate-400'}`}>{p.label}</div>
                    </button>
                ))}
            </div>
            <p className="text-xs font-bold text-slate-400 mb-3 text-center">{PROTOCOL[step].hint}</p>

            {/* the 3D world */}
            <div className="w-full h-[420px] rounded-3xl overflow-hidden border border-sky-500/25 shadow-[0_20px_60px_-15px_rgba(56,189,248,0.25)] mb-4">
                <Lab3D><Scene vals={vals} /></Lab3D>
            </div>

            {/* controls */}
            <div className="grid gap-2 mb-4">
                {spec.sliders.map(s => (
                    <div key={s.id} className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2">
                        <span className="text-lg w-7">{s.emoji}</span>
                        <span className="text-xs font-bold text-sky-100 w-24">{s.label}</span>
                        <input type="range" min={s.min} max={s.max} value={vals[s.id] ?? s.start}
                            onChange={e => setVals(v => ({ ...v, [s.id]: Number(e.target.value) }))}
                            className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer accent-sky-400 bg-slate-700" />
                        <span className="text-xs font-black text-sky-200 w-10 text-right tabular-nums">{Math.round(vals[s.id] ?? s.start)}</span>
                    </div>
                ))}
            </div>
            <div className="text-center mb-4">
                <span className="inline-block bg-sky-400/10 border border-sky-400/30 rounded-full px-4 py-1.5 text-sm font-black text-sky-100">
                    {spec.readout(vals)}
                </span>
            </div>

            {/* journal — predict + observe + settings snapshot */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-black text-amber-300 uppercase tracking-widest">📓 experiment journal</p>
                    <span className="text-[10px] font-bold text-slate-500">{trials.length} trial{trials.length === 1 ? '' : 's'} logged</span>
                </div>
                <input value={predict} onChange={e => setPredict(e.target.value)}
                    placeholder="I predict…" className="w-full mb-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400" />
                <input value={observed} onChange={e => setObserved(e.target.value)}
                    placeholder="I observed…" className="w-full mb-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400" />
                <button onClick={saveTrial}
                    className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-900 text-xs font-black hover:bg-amber-400 transition">
                    Log trial #{trials.length + 1} with these settings
                </button>
                <AnimatePresence>
                    {trials.slice(0, 4).map((t, i) => (
                        <motion.div key={t.when} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-[11px] text-slate-300 bg-slate-900/60 rounded-xl px-3 py-2 border border-slate-700/60">
                            <div className="flex justify-between text-slate-500 text-[10px] font-bold mb-0.5">
                                <span>trial {trials.length - i}</span>
                                <span>{Object.entries(t.settings).map(([k, v]) => `${k}:${v}`).join(' · ')}</span>
                            </div>
                            <span className="text-slate-400">predicted:</span> {t.predict || '—'} <span className="text-slate-400">· saw:</span> {t.observed || '—'}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
