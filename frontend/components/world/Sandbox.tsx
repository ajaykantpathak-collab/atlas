'use client'

/**
 * Sandbox — free-play experiment lab. No goal validation: every slider is
 * free, and the student drives the question. A hypothesis journal turns
 * playing into the scientific method: predict → experiment → record.
 * Curiosity prompts ("break it", "find the extreme") keep it from being
 * a 30-second toy.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CanvasLab, LABS } from '../sims_v2/engine/canvasLab'
import { api } from '@/lib/api'
import JOURNAL_PROMPTS from './journal_prompts.json'

const CURIOSITY: Record<string, string[]> = {
    efield: ['Make both charges positive — where do the field lines go?', 'Set one charge to zero — what does the field become?', 'Push separation to minimum — how dense do the lines get?'],
    wave: ['Max out amplitude — do the particles move faster or just higher?', 'Set frequency to minimum — count the wavelengths', 'Find the setting where the wave almost disappears'],
    gas: ['Heat the gas to max — watch particle speed', 'Now compress instead — same effect or different?', 'Cool to near zero — do the particles stop?'],
    lens: ['Move the object inside the focal length — where does the image go?', 'Find the point where the image flips upside down', 'Minimum focal length — how sharp is the image?'],
    titrate: ['Add drops one at a time near the endpoint — how sudden is the colour flip?', 'Blow past the endpoint — can you recover?', 'Find the exact drop where it changes'],
    circuit: ['Close the switch — trace the electron flow', 'Push voltage to max — what breaks first?', 'Open the switch mid-flow — where does the current go?'],
    orbit: ['Set speed too low — watch it fall', 'Set speed too high — watch it escape', 'Find the exact speed that holds a stable orbit'],
    pendulum: ['Double the length — does the period double?', 'Start from a huge angle — does the formula still hold?', 'Min length — what is the fastest swing?'],
    projectile: ['Launch at 90° — straight up, or does it drift?', 'Find the angle for maximum range — is it really 45°?', 'Same speed, two different arcs — can you hit the same point twice?'],
    supply: ['Push demand to max with supply at min — what happens to price?', 'Crash supply — does price explode or just drift?', 'Find the equilibrium — where do they cross?'],
    dna: ['Unzip slowly — which base pairs separate first?', 'Half-unzip then stop — can it re-anneal?', 'Full unzip — what does replication need next?'],
    equilibrium: ['Add reactant — watch it shift', 'Remove product — which way does it push back?', 'Find the state where it stops moving'],
    moon: ['Sweep slowly — when does a crescent become a gibbous?', 'Go backwards — is the cycle symmetric?', 'Find the exact half-moon moment'],
    graph: ['Make the slope negative — which way does it lean?', 'Set slope to zero — what is a flat line really saying?', 'Steepest possible — what breaks the axes?'],
    spectrum: ['Find visible light — how small is our window?', 'Scan to gamma — how does the wave change?', 'Radio to gamma — when does wavelength become invisible?'],
    conic: ['Slice horizontally — is the circle real?', 'Tilt slowly — when does the ellipse break into a parabola?', 'Go vertical — what does a hyperbola mean?'],
    heart: ['Push heart rate to max — what does the ECG do?', 'Slow it to min — what changes in the trace?', 'Find the resting rhythm'],
    cell: ['Zoom to max — which organelle shows up last?', 'Find the nucleus — what surrounds it?', 'Zoom out — what structure disappears first?'],
    flow: ['Walk it backwards — does the process reverse?', 'Skip a stage — what breaks?', 'Find the bottleneck stage'],
    timeline: ['Jump to the middle — which era is this?', 'Find the turning point', 'Scrub slowly — what comes right before the climax?'],
}
const DEFAULT_PROMPTS = ['Push every control to its extreme — what breaks?', 'Find the most interesting state you can', 'Explain what you see to a friend — could they predict it?']
const JP = JOURNAL_PROMPTS as Record<string, string[]>

interface JournalEntry { predict: string; observed: string; ts: number }

export function SandboxLab({ labKey }: { labKey: string }) {
    const spec = LABS[labKey]
    const [vals, setVals] = useState<Record<string, number>>({})
    const [journal, setJournal] = useState<JournalEntry[]>([])
    const [predict, setPredict] = useState('')
    const [observed, setObserved] = useState('')
    const [prompt, setPrompt] = useState(0)
    const key = `simsbx_${labKey}`
    const prompts = JP[labKey] ?? CURIOSITY[labKey] ?? JP.default ?? DEFAULT_PROMPTS

    useEffect(() => {
        try { setJournal(JSON.parse(localStorage.getItem(key) ?? '[]') ?? []); } catch { }
    }, [key])

    if (!spec) return <p className="text-slate-400">Unknown lab: {labKey}</p>;

    const save = () => {
        if (!predict.trim() && !observed.trim()) return;
        const entry = { predict: predict.trim(), observed: observed.trim(), ts: Date.now() };
        const next = [entry, ...journal].slice(0, 20);
        setJournal(next); setPredict(''); setObserved('');
        try {
            localStorage.setItem(key, JSON.stringify(next));
            // daily-ritual streak — a journal save counts as today's experiment done
            const today = String(Math.floor(Date.now() / 86400000));
            const last = localStorage.getItem('simdaily_last');
            const n = +(localStorage.getItem('simdaily_streak') ?? '0');
            localStorage.setItem('simdaily_last', today);
            localStorage.setItem('simdaily_streak', String(last === today ? n : n + 1));
        } catch { }
        api.post('/api/intelligence/interaction', {
            student_id: 'anon', node_id: `sandbox_${labKey}`,
            question: 'sandbox experiment', response: `${entry.predict} → ${entry.observed}`,
            is_correct: true, time_spent_ms: 0, hints_used: 0, action_taken: 'sandbox',
        }).catch(() => { });
    };

    return (
        <div className="w-full flex flex-col items-center gap-4">
            {/* curiosity prompt — the question the student answers by playing */}
            <div className="w-full max-w-lg bg-indigo-500/10 border border-indigo-400/30 rounded-2xl px-4 py-3 flex items-start gap-3">
                <span className="text-xl">🔍</span>
                <div className="flex-1">
                    <p className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-1">try this</p>
                    <p className="text-sm font-bold text-white">{prompts[prompt % prompts.length]}</p>
                </div>
                <button onClick={() => setPrompt(p => p + 1)}
                    className="text-xs font-black text-indigo-300 border border-indigo-400/40 rounded-lg px-2 py-1 hover:bg-indigo-500/20 shrink-0">
                    next ›
                </button>
            </div>

            {/* the free lab — every slider live, no goal */}
            <div className="w-full max-w-lg">
                <CanvasLab spec={spec} onChange={setVals} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 -mt-1">sandbox mode — no right answer, just discovery</p>

            {/* hypothesis journal */}
            <div className="w-full max-w-lg bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
                <p className="text-xs font-black text-amber-300 uppercase tracking-widest mb-2">📓 hypothesis journal</p>
                <input value={predict} onChange={e => setPredict(e.target.value)}
                    placeholder="I predict that when I…"
                    className="w-full mb-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400" />
                <input value={observed} onChange={e => setObserved(e.target.value)}
                    placeholder="I observed that…"
                    className="w-full mb-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400" />
                <button onClick={save}
                    className="w-full py-2 rounded-xl bg-amber-500 text-slate-900 text-xs font-black hover:bg-amber-400 transition">
                    Save to journal
                </button>
                {journal.length > 0 && (
                    <div className="mt-3 space-y-1.5 max-h-32 overflow-y-auto">
                        {journal.slice(0, 5).map((j, i) => (
                            <div key={i} className="text-[11px] text-slate-300 bg-slate-900/60 rounded-lg px-3 py-1.5 border border-slate-700/60">
                                <span className="text-slate-500">predicted:</span> {j.predict || '—'}
                                <span className="text-slate-500"> · saw:</span> {j.observed || '—'}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
