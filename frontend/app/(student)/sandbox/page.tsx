'use client'

/**
 * /sandbox — the experiment bay. Flagship 3D worlds (R3F) first;
 * the 2D canvas labs as the deeper bench. Curiosity prompts, guided
 * protocol, hypothesis journal — play that is actually science.
 */
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { LABS3D } from '@/components/world/lab3d/scenes3d'
import { Sandbox3D } from '@/components/world/lab3d/Sandbox3D'
import { LABS } from '@/components/sims_v2/engine/canvasLab'
import { SandboxLab } from '@/components/world/Sandbox'

const LAB2D_EMOJI: Record<string, string> = {
    heart: '❤️', cell: '🔬', supply: '📈', equilibrium: '⚖️', moon: '🌕', graph: '📊',
    nephron: '🫘', mitosis: '🧫', vector: '➡️', timeline: '📜', flow: '🔄',
    digest: '🍽️', ph: '🥼', reflex: '⚡', grow: '🌱', cycle: '♻️', prism: '🌈',
};

function SandboxInner() {
    const params = useSearchParams();
    const [lab, setLab] = useState(() => params.get('lab') ?? 'orbit');
    const is3D = LABS3D.some(l => l.key === lab);
    const keys2D = Object.keys(LABS).filter(k => !LABS3D.some(l => l.key === k));

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="flex items-start justify-between mb-1">
                    <h1 className="text-3xl font-black">The Lab</h1>
                    <div className="flex gap-2">
                        <Link href="/galaxy" className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 text-xs font-black text-slate-200 hover:bg-slate-700">🌌 Universe</Link>
                        <Link href="/sims-v2" className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 text-xs font-black text-slate-200 hover:bg-slate-700">📚 Sims</Link>
                    </div>
                </div>
                <p className="text-sm text-slate-400 mb-6">Real worlds. No grades. Predict, experiment, write down what you saw — that is the whole job.</p>

                {/* flagship 3D labs */}
                <p className="text-[10px] font-black text-sky-300 uppercase tracking-widest mb-2">⚗️ flagship 3D labs</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
                    {LABS3D.map(l => (
                        <button key={l.key} onClick={() => setLab(l.key)}
                            className={`rounded-2xl p-3 flex flex-col items-center gap-1 border-2 transition ${lab === l.key ? 'bg-sky-500/15 border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                            <span className="text-2xl">{l.emoji}</span>
                            <span className="text-[9px] font-black text-slate-300 capitalize leading-tight text-center">{l.title}</span>
                        </button>
                    ))}
                </div>

                {/* the bench — 2D canvas labs */}
                <details className="mb-6">
                    <summary className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-slate-300 mb-2">
                        🔧 the bench — {keys2D.length} more instruments
                    </summary>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
                        {keys2D.map(k => (
                            <button key={k} onClick={() => setLab(k)}
                                className={`rounded-xl p-2.5 flex flex-col items-center gap-1 border transition ${lab === k ? 'bg-amber-500/15 border-amber-400/60' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'}`}>
                                <span className="text-xl">{LAB2D_EMOJI[k] ?? '🔬'}</span>
                                <span className="text-[9px] font-bold text-slate-400 capitalize">{k}</span>
                            </button>
                        ))}
                    </div>
                </details>

                {is3D ? <Sandbox3D key={lab} labKey={lab} /> : <SandboxLab key={lab} labKey={lab} />}
            </div>
        </div>
    );
}

export default function SandboxPage() {
    return <Suspense fallback={<div className="min-h-screen bg-slate-950" />}><SandboxInner /></Suspense>;
}
