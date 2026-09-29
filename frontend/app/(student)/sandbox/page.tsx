'use client'

/**
 * /sandbox — the experiment bay. Flagship 3D worlds (R3F) first;
 * the 2D canvas labs as the deeper bench. Curiosity prompts, guided
 * protocol, hypothesis journal — play that is actually science.
 * The maths tab (MathsSandbox) is a lazily-loaded parameter lab +
 * geometry workbench wired to the deterministic solver families.
 */
import { useState, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { LABS3D } from '@/components/world/lab3d/scenes3d'
import { Sandbox3D } from '@/components/world/lab3d/Sandbox3D'
import { LABS } from '@/components/sims_v2/engine/canvasLab'
import { SandboxLab } from '@/components/world/Sandbox'

const MathsSandbox = dynamic(
    () => import('@/components/sandbox/MathsSandbox'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the maths sandbox…
            </div>
        ),
    },
)

const ChemistrySandbox = dynamic(
    () => import('@/components/sandbox/ChemistrySandbox'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the chemistry workbench…
            </div>
        ),
    },
)

const AccountancySandbox = dynamic(
    () => import('@/components/sandbox/AccountancySandbox'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the accountancy ledger bench…
            </div>
        ),
    },
)

const PhysicsSandbox = dynamic(
    () => import('@/components/sandbox/PhysicsSandbox'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the physics sandbox…
            </div>
        ),
    },
)

const BiologySandbox = dynamic(
    () => import('@/components/sandbox/BiologySandbox'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the biology sandbox…
            </div>
        ),
    },
)

const EconomicsSandbox = dynamic(
    () => import('@/components/sandbox/EconomicsSandbox'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the economics sandbox…
            </div>
        ),
    },
)

const CodeSandbox = dynamic(
    () => import('@/components/sandbox/CodeSandbox'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the code runtime…
            </div>
        ),
    },
)

const GeoExplorer = dynamic(
    () => import('@/components/sandbox/GeoExplorer'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the geography explorer…
            </div>
        ),
    },
)

const HistTimeline = dynamic(
    () => import('@/components/sandbox/HistTimeline'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the timeline lab…
            </div>
        ),
    },
)

const LanguageGym = dynamic(
    () => import('@/components/sandbox/LanguageGym'),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-500">
                loading the language gym…
            </div>
        ),
    },
)

const LAB2D_EMOJI: Record<string, string> = {
    heart: '❤️', cell: '🔬', supply: '📈', equilibrium: '⚖️', moon: '🌕', graph: '📊',
    nephron: '🫘', mitosis: '🧫', vector: '➡️', timeline: '📜', flow: '🔄',
    digest: '🍽️', ph: '🥼', reflex: '⚡', grow: '🌱', cycle: '♻️', prism: '🌈',
};

function SandboxInner() {
    const params = useSearchParams();
    const [lab, setLab] = useState(() => params.get('lab') ?? 'orbit');
    const isMaths = lab === 'maths';
    const isChem = lab === 'chem';
    const isAcc = lab === 'accountancy';
    const isPhysics = lab === 'physics';
    const isBio = lab === 'biology';
    const isEcon = lab === 'econ';
    const isCode = lab === 'code';
    const isGeo = lab === 'geo';
    const isHist = lab === 'histciv';
    const isLangym = lab === 'langym';
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

                {/* physics — 3D scene labs + solver (physics_families chain) */}
                <button onClick={() => setLab('physics')}
                    className={`w-full rounded-2xl p-3.5 mb-4 flex items-center gap-3 border-2 transition ${isPhysics ? 'bg-gold-500/15 border-gold-400/60 shadow-[0_0_20px_rgba(167,139,250,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">⚛️</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-gold-200">Physics Sandbox</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">projectile 3D · incline · circuits · optics bench · waves · gravitation · solve &amp; explain — classes 6 to 12</span>
                    </span>
                </button>

                {/* chemistry — equation balancer + mole/pH/gas labs + 3D viewer */}
                <button onClick={() => setLab('chem')}
                    className={`w-full rounded-2xl p-3.5 mb-4 flex items-center gap-3 border-2 transition ${isChem ? 'bg-emerald-500/15 border-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">🧪</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-emerald-200">Chemistry Sandbox</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">equation balancer · formula bench · mole workbench · pH · gas piston · atom builder · 3D molecules — classes 6 to 12</span>
                    </span>
                </button>

                {/* accountancy — E7 ledger workbench + E1 depreciation lab + 3D equation pans */}
                <button onClick={() => setLab('accountancy')}
                    className={`w-full rounded-2xl p-3.5 mb-4 flex items-center gap-3 border-2 transition ${isAcc ? 'bg-amber-500/15 border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">📒</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-amber-200">Accountancy Sandbox</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">journal workbench · ledger → trial balance · 3D equation pans · depreciation SLM/WDV lab · final accounts · BRS — classes 9 to 12</span>
                    </span>
                </button>

                {/* biology — 3D cell explorer + punnett bench + solver */}
                <button onClick={() => setLab('biology')}
                    className={`w-full rounded-2xl p-3.5 mb-4 flex items-center gap-3 border-2 transition ${isBio ? 'bg-emerald-500/15 border-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">🧫</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-emerald-200">Biology Sandbox</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">3D cell explorer · Punnett bench · food-web 10% law · osmosis lab · genetics — classes 6 to 12 + biotech</span>
                    </span>
                </button>

                {/* economics — E1 parameter labs + E4 market sim + E7-lite data bench (2D-native, one 3D flow) */}
                <button onClick={() => setLab('econ')}
                    className={`w-full rounded-2xl p-3.5 mb-4 flex items-center gap-3 border-2 transition ${isEcon ? 'bg-fuchsia-500/15 border-fuchsia-400/60 shadow-[0_0_20px_rgba(232,121,249,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">💰</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-fuchsia-200">Economics Sandbox</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">market lab · elasticity explorer · 3D circular flow · money multiplier · budget lab · index-number data bench — classes 9 to 12</span>
                    </span>
                </button>

                {/* maths — parameter lab + geometry workbench + solver */}
                <button onClick={() => setLab('maths')}
                    className={`w-full rounded-2xl p-3.5 mb-6 flex items-center gap-3 border-2 transition ${isMaths ? 'bg-gold-500/15 border-gold-400/60 shadow-[0_0_20px_rgba(56,189,248,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">🧮</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-gold-200">Maths Sandbox</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">grapher · geometry bench · AP/GP dots · 3D solids · solve &amp; explain — classes 6 to 12 + applied</span>
                    </span>
                </button>

                {/* code runtime — E8: trace tables + error clinic + flowcharts */}
                <button onClick={() => setLab('code')}
                    className={`w-full rounded-2xl p-3.5 mb-4 flex items-center gap-3 border-2 transition ${isCode ? 'bg-gold-500/15 border-gold-400/60 shadow-[0_0_20px_rgba(129,140,248,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">💻</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-gold-200">Code Runtime Sandbox</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">write → run → variable trace table · error clinic · flowchart bench — compapp · CS · AI · robotics</span>
                    </span>
                </button>

                {/* geography — E5 geospatial explorer */}
                <button onClick={() => setLab('geo')}
                    className={`w-full rounded-2xl p-3.5 mb-4 flex items-center gap-3 border-2 transition ${isGeo ? 'bg-teal-500/15 border-teal-400/60 shadow-[0_0_20px_rgba(45,212,191,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">🗺️</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-teal-200">Geography Explorer</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">India &amp; continent maps · rivers · power projects · contours &amp; toposheets · climate graphs · monsoon — classes 6 to 12</span>
                    </span>
                </button>

                {/* history & civics — E6 timeline + causal chains + civic sims */}
                <button onClick={() => setLab('histciv')}
                    className={`w-full rounded-2xl p-3.5 mb-4 flex items-center gap-3 border-2 transition ${isHist ? 'bg-rose-500/15 border-rose-400/60 shadow-[0_0_20px_rgba(251,113,133,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">📜</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-rose-200">Timeline &amp; Civics Lab</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">timeline builder · causal chains · Preamble builder · three organs · elections · DPSP matcher — classes 6 to 12</span>
                    </span>
                </button>

                {/* language gym — E8-adapted bilingual drills */}
                <button onClick={() => setLab('langym')}
                    className={`w-full rounded-2xl p-3.5 mb-6 flex items-center gap-3 border-2 transition ${isLangym ? 'bg-orange-500/15 border-orange-400/60 shadow-[0_0_20px_rgba(251,146,60,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
                    <span className="text-3xl">🗣️</span>
                    <span className="text-left">
                        <span className="block text-sm font-black text-orange-200">Language Gym</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">grammar drills · sentence assembly · ICSE format checkers · literature RCT — English + हिंदी, classes 6 to 10</span>
                    </span>
                </button>

                {/* flagship 3D labs */}
                <p className="text-[10px] font-black text-gold-300 uppercase tracking-widest mb-2">⚗️ flagship 3D labs</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
                    {LABS3D.map(l => (
                        <button key={l.key} onClick={() => setLab(l.key)}
                            className={`rounded-2xl p-3 flex flex-col items-center gap-1 border-2 transition ${lab === l.key ? 'bg-gold-500/15 border-gold-400/60 shadow-[0_0_20px_rgba(56,189,248,0.15)]' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
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

                {isPhysics
                    ? <PhysicsSandbox key="physics" />
                    : isChem
                        ? <ChemistrySandbox key="chem" />
                        : isAcc
                            ? <AccountancySandbox key="accountancy" />
                            : isBio
                                ? <BiologySandbox key="biology" />
                                : isEcon
                                    ? <EconomicsSandbox key="econ" />
                                    : isMaths
                                        ? <MathsSandbox key="maths" />
                                        : isCode
                                            ? <CodeSandbox key="code" />
                                            : isGeo
                                                ? <GeoExplorer key="geo" />
                                                : isHist
                                                    ? <HistTimeline key="histciv" />
                                                    : isLangym
                                                        ? <LanguageGym key="langym" />
                                                        : is3D ? <Sandbox3D key={lab} labKey={lab} /> : <SandboxLab key={lab} labKey={lab} />}
            </div>
        </div>
    );
}

export default function SandboxPage() {
    return <Suspense fallback={<div className="min-h-screen bg-slate-950" />}><SandboxInner /></Suspense>;
}
