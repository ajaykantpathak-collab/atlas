'use client';

/**
 * C12_MathsDefiniteIntegralRiemannSim.tsx — 3D
 * Class 12 Maths — Integrals: the definite integral as SIGNED area
 * (each bar carries unit depth, so the picture doubles as signed volume)
 *
 * WHY 3D: the area "under" a curve is not one thing — above the axis it is
 * positive, below it is negative, and the definite integral is their NET.
 * 3D bars make the two populations unmistakable: gold towers rise, red
 * wells sink, and the HUD nets them.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Partition [a,b] into n strips of width Δx = (b−a)/n. On strip i pick
 *  the sample xᵢ* (left edge / midpoint / right edge) and build the bar of
 *  height f(xᵢ*):
 *      Sₙ = Σᵢ f(xᵢ*)·Δx      (Riemann sum)
 *  As n → ∞ every choice of sample collapses to the same limit — the
 *  DEFINITE INTEGRAL:   ∫ₐᵇ f(x)dx = lim_{n→∞} Sₙ
 *  Signed bookkeeping (derived by splitting f = f⁺ − f⁻ with
 *  f⁺ = max(f,0), f⁻ = max(−f,0)):
 *      ∫ₐᵇ f = ∫ₐᵇ f⁺ − ∫ₐᵇ f⁻  =  (area above) − (area below)
 *  Exact reference: composite Simpson's rule, 512 intervals — compared
 *  against Sₙ live so you can watch convergence with your own eyes.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { BarChart3, Sigma, RotateCcw, Sparkles, Plus } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const CYAN = '#38bdf8';

type Preset = { key: string; name: string; f: (x: number) => number; dom: [number, number] };
const PRESETS: Preset[] = [
  { key: 'sq', name: 'y = x²', f: (x) => x * x, dom: [0, 2] },
  { key: 'cubic', name: 'y = x³ − 2x', f: (x) => x ** 3 - 2 * x, dom: [-1.6, 1.6] },
  { key: 'sin', name: 'y = sin x', f: Math.sin, dom: [0, 2 * Math.PI] },
  { key: 'hill', name: 'y = 4 − x²', f: (x) => 4 - x * x, dom: [-3, 3] },
];

function simpson(g: (x: number) => number, a: number, b: number, n = 512): number {
  if (b === a) return 0;
  const h = (b - a) / n;
  let s = g(a) + g(b);
  for (let i = 1; i < n; i++) s += g(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

type Method = 'left' | 'mid' | 'right';
const sampleX = (meth: Method, xl: number, xr: number) =>
  meth === 'left' ? xl : meth === 'right' ? xr : (xl + xr) / 2;

export default function C12_MathsDefiniteIntegralRiemannSim() {
  const [pi, setPi] = useState(1);
  const preset = PRESETS[pi];
  const [n, setN] = useState(8);
  const [meth, setMeth] = useState<Method>('mid');
  const [showExact, setShowExact] = useState(true);

  const dom = preset.dom;
  const a = dom[0], b = dom[1];

  // ── live numerics ──
  const m = useMemo(() => {
    const dx = (b - a) / n;
    let S = 0;
    const bars: { x: number; h: number }[] = [];
    for (let i = 0; i < n; i++) {
      const xl = a + i * dx;
      const xs = sampleX(meth, xl, xl + dx);
      const h = preset.f(xs);
      S += h * dx;
      bars.push({ x: xs, h });
    }
    const I = simpson(preset.f, a, b);
    const pos = simpson((x) => Math.max(preset.f(x), 0), a, b);   // ∫f⁺
    const neg = simpson((x) => Math.min(preset.f(x), 0), a, b);   // ∫f⁻ (≤ 0)
    return { dx, S, I, pos, neg, err: I - S, bars };
  }, [preset, n, meth, a, b]);

  // smooth "true region" fill (unit depth), split above/below axis
  const regionGeo = useMemo(() => {
    const make = (g: (x: number) => number) => {
      const verts: number[] = [];
      const Nn = 160;
      for (let i = 0; i < Nn; i++) {
        const x1 = a + ((b - a) * i) / Nn;
        const x2 = a + ((b - a) * (i + 1)) / Nn;
        const y1 = g(x1), y2 = g(x2);
        // two triangles: axis strip between x1,x2
        verts.push(x1, 0, 0, x2, 0, 0, x1, y1, 0);
        verts.push(x2, 0, 0, x2, y2, 0, x1, y1, 0);
      }
      const gEO = new THREE.BufferGeometry();
      gEO.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      return gEO;
    };
    return { above: make((x) => Math.max(preset.f(x), 0)), below: make((x) => Math.min(preset.f(x), 0)) };
  }, [preset, a, b]);

  const curvePts: [number, number, number][] = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 200; i++) {
      const x = a + ((b - a) * i) / 200;
      pts.push([x, preset.f(x), 0]);
    }
    return pts;
  }, [preset, a, b]);

  const reset = () => { setPi(1); setN(8); setMeth('mid'); setShowExact(true); };
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
        <Canvas camera={{ position: [3, 3.4, 8.5], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 10, 8]} intensity={0.85} color="#ffe9b8" />
          <Grid args={[24, 24]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.18)"
            fadeDistance={50} fadeStrength={1.2} />
          {/* x-axis */}
          <Line points={[[a - 0.4, 0, 0], [b + 0.4, 0, 0]]} color="rgba(255,255,255,0.5)" lineWidth={1.5} />
          <Text position={[b + 0.4, -0.4, 0]} fontSize={0.3} color="#94a3b8">x</Text>
          <Text position={[a - 0.15, 2.6, 0.5]} fontSize={0.3} color="#94a3b8">f(x)</Text>
          {/* Riemann bars, unit depth */}
          {m.bars.map((bar, i) => {
            const h = Math.max(Math.abs(bar.h), 0.004);
            const up = bar.h >= 0;
            return (
              <mesh key={i} position={[bar.x, up ? h / 2 : -h / 2, 0.5]}>
                <boxGeometry args={[m.dx * 0.96, h, 1]} />
                <meshStandardMaterial
                  color={up ? GOLD : ROSE}
                  emissive={up ? GOLD : ROSE}
                  emissiveIntensity={0.25}
                  transparent opacity={0.88}
                />
              </mesh>
            );
          })}
          {/* exact smooth region + curve */}
          {showExact && (
            <group>
              <mesh geometry={regionGeo.above}>
                <meshBasicMaterial color={CYAN} transparent opacity={0.16} side={THREE.DoubleSide} />
              </mesh>
              <mesh geometry={regionGeo.below}>
                <meshBasicMaterial color={ROSE} transparent opacity={0.16} side={THREE.DoubleSide} />
              </mesh>
              <Line points={curvePts} color={CYAN} lineWidth={2.6} />
            </group>
          )}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={26} target={[0, 0, 0.5]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[276px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Riemann sum — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('n strips · Δx', `${n} · ${m.dx.toFixed(4)}`)}
            {row('Sₙ = Σ f(xᵢ*)Δx', `${m.S.toFixed(5)} unit²`, 'text-gold-300')}
            {row('∫ (Simpson ref.)', `${m.I.toFixed(5)} unit²`, 'text-gold-300')}
            {row('error ∫ − Sₙ', m.err.toFixed(5))}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">signed bookkeeping</div>
            {row('area above axis ∫f⁺', `+${m.pos.toFixed(4)}`, 'text-gold-300')}
            {row('area below axis ∫f⁻', `${m.neg.toFixed(4)}`, 'text-rose-300')}
            {row('net = ∫f⁺ + ∫f⁻', `${(m.pos + m.neg).toFixed(4)} ✓`, 'text-emerald-300')}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Gold towers count positive, red wells subtract — the integral is the NET
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Sigma className="h-3.5 w-3.5 text-gold-400" /> curve:</span>
        {PRESETS.map((p, i) => (
          <button key={p.key} onClick={() => setPi(i)} className={btn(pi === i)}>{p.name}</button>
        ))}
        <span className="ml-2 text-xs text-surface-400">n:</span>
        <input type="range" min={2} max={60} step={1} value={n}
          onChange={(e) => setN(Number(e.target.value))} className="h-11 w-36 accent-amber-400" />
        <span className="text-xs text-white">{n}</span>
        {(['left', 'mid', 'right'] as Method[]).map((mm) => (
          <button key={mm} onClick={() => setMeth(mm)} className={btn(meth === mm)}>{mm}</button>
        ))}
        <button onClick={() => setShowExact(!showExact)} className={btn(showExact)}>true region</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><BarChart3 className="h-4 w-4" /> THE SLICES</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Each bar is height f(xᵢ*) × width Δx. Left/mid/right changes xᵢ* only — drag n
            up and all three sums squeeze onto the same number. That convergence IS the
            definite integral.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Plus className="h-4 w-4" /> SIGNED, NOT ABSOLUTE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ∫ₐᵇ f = ∫f⁺ − ∫f⁻: the HUD tracks the two populations separately. For
            y = sin x on [0, 2π] the net is exactly 0 — one full hump cancels one full well.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> UNIT DEPTH = VOLUME</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Every bar here is 1 unit deep, so Sₙ is simultaneously the signed AREA (unit²)
            and the signed VOLUME of the slab solid (unit³). Same limit, two readings.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The integral gives the total area enclosed.&quot; No —
            <span className="text-white"> it gives the NET, and below-axis counts negative.</span>
            For y = x³−2x on [−1.6, 1.6] the picture looks &quot;full of area&quot; yet ∫ is
            negative (odd function: +side and −side cancel to 0 exactly — read it live).
            Total enclosed area would need ∫|f|dx.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① y = sin x, n = 6, method left: Sₙ overshoots; switch to mid and watch the error
            shrink — midpoint beats edges at equal n. Push n to 60: error → ~10⁻⁴.
            ② y = 4−x² on [−3, 3]: the two negative tails drag the net from +21.33 (at
            [−2, 2]) down — find the interval where the net crosses 0.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: '∫₀^2π sin x dx equals…', opts: ['0 — the two humps cancel', '2 — total hump area', '4'], correct: 0 },
  { q: 'As n → ∞, left / midpoint / right Riemann sums…', opts: ['all converge to the same ∫', 'stay different forever', 'converge only for increasing f'], correct: 0 },
  { q: 'For f < 0 on [a,b], the definite integral is…', opts: ['negative — height × width keeps the sign', 'positive — area is always positive', 'zero'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on Riemann sums — no marks, no shame.</p>
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
