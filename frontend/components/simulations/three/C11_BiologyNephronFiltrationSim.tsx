'use client';

/**
 * C11_BiologyNephronFiltrationSim.tsx — 3D
 * Class 11 Biology — Excretory Products and their Elimination: the nephron
 *
 * WHY 3D: the kidney's magic trick is GEOMETRY — the loop of Henle dives
 * into the medulla so water can be pulled out by an osmotic staircase.
 * Flat nephron cartoons hide why the loop must be a hairpin.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Filtration fraction (the kidney's duty cycle):
 *      FF = GFR / RPF      (normal 125/660 ≈ 19%)
 *  Filtered load of any freely filtered solute:
 *      load = GFR × P      (GFR in mL/min × plasma conc. mg/dL ÷ 100
 *                           = mg/min)
 *  Renal handling balance for glucose (filtered, then ALL reabsorbed
 *  until the carriers saturate at Tm ≈ 375 mg/min):
 *      excreted = filtered − reabsorbed = GFR·P/100 − min(load, Tm)
 *  Glycosuria appears exactly when GFR·P/100 > 375 — diabetes detection
 *  by arithmetic. Try GFR 125, P = 300: load = 375, the knife edge.
 *  Medulla osmotic gradient: 300 → 1200 mOsm/L (counter-current
 *  multiplier) — shown as the colour ladder the loop dives into.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Tube } from '@react-three/drei';
import * as THREE from 'three';
import { Droplet, Percent, RotateCcw, Sparkles, TriangleAlert } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const CYAN = '#38bdf8';
const GREEN = '#34d399';

const TM_GLUCOSE = 375; // mg/min transport maximum

export default function C11_BiologyNephronFiltrationSim() {
  const [rpf, setRpf] = useState(660);      // renal plasma flow mL/min
  const [gfr, setGfr] = useState(125);      // glomerular filtration rate
  const [glucose, setGlucose] = useState(100); // plasma mg/dL

  // ── live numerics ──
  const m = useMemo(() => {
    const ff = (gfr / rpf) * 100;                       // %
    const load = (gfr * glucose) / 100;                 // mg/min
    const reabsorbed = Math.min(load, TM_GLUCOSE);
    const excreted = Math.max(load - TM_GLUCOSE, 0);
    const glycosuria = excreted > 0.5;
    const reabsPct = load > 0 ? (reabsorbed / load) * 100 : 100;
    return { ff, load, reabsorbed, excreted, glycosuria, reabsPct };
  }, [rpf, gfr, glucose]);

  const reset = () => { setRpf(660); setGfr(125); setGlucose(100); };

  // nephron tube path (scene 1 unit ≈ real-ish proportions)
  const nephronCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5.2, 3.6, 0),      // Bowman's (glomerulus) exit
    new THREE.Vector3(-3.4, 4.4, 1.2),    // PCT coil
    new THREE.Vector3(-2.2, 3.2, -1),
    new THREE.Vector3(-3.6, 2.4, 0.6),
    new THREE.Vector3(-1.6, 2.0, -0.4),   // PCT end
    new THREE.Vector3(-0.2, 0.6, 0.2),    // descending limb into medulla
    new THREE.Vector3(0.4, -2.6, -0.4),   // loop bottom (inner medulla)
    new THREE.Vector3(1.4, 0.4, 0.6),     // ascending limb back to cortex
    new THREE.Vector3(2.8, 3.4, -0.2),    // DCT
    new THREE.Vector3(4.2, 2.6, 0.6),     // toward collecting duct
    new THREE.Vector3(5.0, 0.4, -0.2),    // collecting duct diving
    new THREE.Vector3(5.6, -3.2, 0.4),    // to renal pelvis
  ]), []);

  // medulla gradient bands (300 → 1200 mOsm)
  const bands = [
    { y: 2.6, osm: 300, c: '#38bdf8' },
    { y: 1.2, osm: 600, c: '#818cf8' },
    { y: -0.2, osm: 900, c: '#a78bfa' },
    { y: -1.6, osm: 1200, c: '#f472b6' },
  ];

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [2, 3, 16], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 12, 6]} intensity={0.85} color="#ffe9b8" />
          {/* medulla osmotic bands */}
          {bands.map((b, i) => (
            <group key={i}>
              <mesh position={[0.4, b.y, -1.4]}>
                <boxGeometry args={[15, 1.3, 0.12]} />
                <meshBasicMaterial color={b.c} transparent opacity={0.13} />
              </mesh>
              <Text position={[-6.6, b.y + 0.35, -1.3]} fontSize={0.34} color={b.c}>{b.osm} mOsm</Text>
            </group>
          ))}
          <Text position={[0.4, 3.9, -1.35]} fontSize={0.34} color="#94a3b8">cortex ↑ · medulla osmotic ladder ↓</Text>
          {/* glomerulus knot */}
          <mesh position={[-6, 4.2, 0]}>
            <sphereGeometry args={[0.85, 24, 24]} />
            <meshStandardMaterial color={ROSE} emissive={ROSE} emissiveIntensity={0.35} wireframe />
          </mesh>
          <mesh position={[-6, 4.2, 0]}>
            <sphereGeometry args={[1.05, 20, 16]} />
            <meshStandardMaterial color={CYAN} transparent opacity={0.16} />
          </mesh>
          <Text position={[-6, 5.5, 0]} fontSize={0.44} color={ROSE}>glomerulus — filter</Text>
          {/* the tube */}
          <Tube args={[nephronCurve as unknown as THREE.Curve<THREE.Vector3>, 140, 0.18, 12]}>
            <meshStandardMaterial color={GOLD} roughness={0.4} emissive={GOLD} emissiveIntensity={0.12} />
          </Tube>
          {/* region labels */}
          <Text position={[-2.8, 5.3, 0.4]} fontSize={0.4} color={CYAN}>PCT — 100% glucose reabsorbed</Text>
          <Text position={[0.5, -3.6, 0]} fontSize={0.4} color="#f472b6">loop of Henle — hairpin in the gradient</Text>
          <Text position={[3.2, 4.4, -0.1]} fontSize={0.4} color={GREEN}>DCT — fine tuning</Text>
          <Text position={[6.6, 1.2, 0.2]} fontSize={0.4} color={GOLD} rotation={[0, 0.4, 0]}>collecting duct → urine</Text>
          {/* flow particles along the curve (deterministic phases) */}
          {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((u, i) => {
            const p = nephronCurve.getPoint(u);
            return (
              <mesh key={i} position={p}>
                <sphereGeometry args={[0.09, 10, 10]} />
                <meshBasicMaterial color="#fef3c7" />
              </mesh>
            );
          })}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={5} maxDistance={30} target={[0, 0.5, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[286px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Renal balance — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('RPF', `${rpf} mL/min`)}
            {row('GFR', `${gfr} mL/min`, 'text-cyan-300')}
            {row('FF = GFR/RPF', `${m.ff.toFixed(1)} % (normal ≈ 19–20)`, 'text-gold-300')}
            {row('plasma glucose', `${glucose} mg/dL`)}
            {row('filtered load = GFR×P/100', `${m.load.toFixed(0)} mg/min`, 'text-gold-300')}
            {row('reabsorbed (Tm 375)', `${m.reabsorbed.toFixed(0)} mg/min (${m.reabsPct.toFixed(0)}%)`, 'text-emerald-300')}
            {row('excreted (urine)', `${m.excreted.toFixed(0)} mg/min`, m.glycosuria ? 'text-rose-300' : 'text-white')}
            {m.glycosuria && (
              <div className="flex items-center gap-1 pt-0.5 text-[10px] text-rose-300">
                <TriangleAlert className="h-3 w-3" /> GLYCOSURIA — load exceeds Tm
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The loop dives down the osmotic ladder — 300 → 1200 mOsm — to pull water out
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Droplet className="h-3.5 w-3.5 text-gold-400" /> RPF:</span>
        <input type="range" min={500} max={800} step={10} value={rpf}
          onChange={(e) => setRpf(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{rpf}</span>
        <span className="text-xs text-surface-400">GFR:</span>
        <input type="range" min={60} max={160} step={5} value={gfr}
          onChange={(e) => setGfr(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{gfr}</span>
        <span className="text-xs text-surface-400">glucose:</span>
        <input type="range" min={70} max={400} step={5} value={glucose}
          onChange={(e) => setGlucose(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{glucose} mg/dL</span>
        <button onClick={() => { setGfr(125); setGlucose(300); }} className={btn(false)}>diabetic preset</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Percent className="h-4 w-4" /> FILTRATION FRACTION</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Of 660 mL/min of plasma arriving, the glomeruli filter 125 — FF ≈ 19%.
            Raise GFR with RPF fixed and the duty cycle climbs: the same arithmetic a
            nephrologist reads off clearance tests.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Droplet className="h-3.5 w-3.5" /> THE OSMOTIC LADDER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The hairpin runs DOWN the 300→1200 mOsm staircase built by the counter-current
            multiplier. Fluid leaving the loop has equilibrated — that is why the loop must
            dive deep: more depth, steeper extraction, more concentrated urine.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-3.5 w-3.5" /> THE Tm CLIFF</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Glucose is 100% reabsorbed — until the carriers saturate at Tm = 375 mg/min.
            One extra mg spills into urine. Press the diabetic preset: 125×300/100 = 375,
            the exact cliff edge, and watch glycosuria flip on.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Urine is the waste the glomerulus chose to filter.&quot; No —
            <span className="text-white"> the glomerulus filters ~180 L/day almost blindly</span>;
            the TUBE decides. 99% of water and ALL the glucose come back. When glucose
            appears in urine it is not extra filtering — it is reabsorption failing past
            Tm. The balance line excreted = filtered − reabsorbed IS the whole exam answer.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Hold GFR = 125 and find the plasma glucose where glycosuria begins
            (300 mg/dL — the classic diabetic threshold). Then raise GFR to 160 and note
            the threshold drops to ~234: CKD patients spill glucose earlier.
            ② Drop GFR to 60 with glucose 400: load = 240 &lt; Tm — no glycosuria despite
            &quot;dangerous&quot; sugar. Load arithmetic beats slogans.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'Normal filtration fraction (GFR/RPF) is about…', opts: ['19%', '50%', '90%'], correct: 0 },
  { q: 'Glucose appears in urine when…', opts: ['filtered load exceeds the Tm of the carriers', 'GFR drops', 'the loop of Henle shortens'], correct: 0 },
  { q: 'The medullary osmotic gradient runs from…', opts: ['300 mOsm cortex to 1200 mOsm inner medulla', '1200 to 300 outward-in', '0 to 100 everywhere'], correct: 0 },
];

function SelfCheck() {
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      {!quiz ? (
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-sm font-bold text-white">Check yourself</div>
            <p className="text-xs text-surface-400">3 quick questions on the nephron — no marks, no shame.</p>
          </div>
          <button onClick={startQuiz} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 px-4 py-2.5 text-xs font-display font-bold text-surface-0 hover:shadow-lg hover:shadow-gold-500/30">
            Start
          </button>
        </div>
      ) : (
        <div>
          <div className="font-display text-sm font-bold text-white">{quiz.q}</div>
          <div className="mt-3 grid gap-2">
            {quiz.opts.map((o, i) => {
              const isPicked = quiz.picked === i;
              const isCorrect = i === quiz.correct;
              const show = quiz.picked !== null;
              return (
                <button key={i} disabled={show} onClick={() => answer(i)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs transition-all ${
                    show && isCorrect ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
                      : show && isPicked ? 'border-rose-400/60 bg-rose-500/10 text-rose-200'
                        : 'border-white/10 bg-white/[0.04] text-surface-200 hover:border-gold-400/40'
                  }`}>
                  <span>{o}</span>
                  {show && isCorrect && <span className="text-emerald-300">✓ correct</span>}
                  {show && isPicked && !isCorrect && <span className="text-rose-300">✗ — the gold answer is marked</span>}
                </button>
              );
            })}
          </div>
          {quiz.picked !== null && (
            <button onClick={nextQ} className="mt-3 flex items-center gap-1.5 text-xs font-display font-semibold text-gold-300 hover:text-gold-200">
              {quizIdx < QUIZ.length - 1 ? 'Next question →' : 'Finish →'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
