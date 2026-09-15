'use client';

/**
 * C12_MathsSolidsOfRevolutionSim.tsx — 3D
 * Class 12 Maths — Application of Integrals: volume by the DISC method
 *
 * WHY 3D: V = π∫y²dx is the volume of a real spinning solid. Watching the
 * flat curve sweep into a lathe-turned body makes the formula obvious:
 * every slab is a disc.
 *
 * HAND-DERIVED NUMERICS (live, no canned numbers):
 *  Slice the solid at x, thickness dx. The cross-section is a disc of
 *  radius y = f(x), so   dV = π·r²·dx = π·f(x)²·dx
 *  Summing slabs and taking dx → 0:
 *      V = π ∫ₐᵇ f(x)² dx
 *  Numeric volume: composite Simpson's rule with 200 intervals:
 *      ∫ ≈ (h/3)[f₀ + 4f₁ + 2f₂ + … + 4f_{n−1} + f_n]
 *  Analytic checks (derived by integrating f² by hand per preset):
 *      y = x²    → V = π(b⁵−a⁵)/5
 *      y = √x    → V = π(b²−a²)/2        (∫x dx)
 *      y = sin x → V = π[x/2 − sin2x/4]ₐᵇ  (∫sin² = ∫(1−cos2x)/2)
 *      y = 1/x   → V = π(1/a − 1/b)      (∫x⁻² dx)
 *
 * Controls: function preset, lower/upper limits a & b, disc rings, Reset.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCw, Sigma, RotateCcw, Sparkles, CircleDot } from 'lucide-react';

const GOLD = '#fbbf24';
const CYAN = '#38bdf8';

type Preset = {
  key: string; name: string; f: (x: number) => number; dom: [number, number];
  analytic: (a: number, b: number) => number; analyticTex: string;
};

const PRESETS: Preset[] = [
  { key: 'sq', name: 'y = x²', f: (x) => x * x, dom: [0, 2.2],
    analytic: (a, b) => Math.PI * (b ** 5 - a ** 5) / 5, analyticTex: 'π(b⁵−a⁵)/5' },
  { key: 'sqrt', name: 'y = √x', f: (x) => Math.sqrt(x), dom: [0, 5],
    analytic: (a, b) => Math.PI * (b * b - a * a) / 2, analyticTex: 'π(b²−a²)/2' },
  { key: 'sin', name: 'y = sin x', f: Math.sin, dom: [0, Math.PI],
    analytic: (a, b) => Math.PI * ((b / 2 - Math.sin(2 * b) / 4) - (a / 2 - Math.sin(2 * a) / 4)),
    analyticTex: 'π[x/2 − sin2x/4]ₐᵇ' },
  { key: 'recip', name: 'y = 1/x', f: (x) => 1 / x, dom: [0.6, 3],
    analytic: (a, b) => Math.PI * (1 / a - 1 / b), analyticTex: 'π(1/a − 1/b)' },
];

/** composite Simpson's rule, n even */
function simpson(g: (x: number) => number, a: number, b: number, n = 200): number {
  const h = (b - a) / n;
  let s = g(a) + g(b);
  for (let i = 1; i < n; i++) s += g(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

/** the revolved solid: lathe of profile (r = f(x), y = x), y is the spin axis */
function RevolvedSolid({ f, a, b, wire }: { f: (x: number) => number; a: number; b: number; wire: boolean }) {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [new THREE.Vector2(0.001, a)];
    const N = 72;
    for (let i = 0; i <= N; i++) {
      const x = a + ((b - a) * i) / N;
      pts.push(new THREE.Vector2(Math.max(0.001, f(x)), x));
    }
    pts.push(new THREE.Vector2(0.001, b));
    return new THREE.LatheGeometry(pts, 72);
  }, [f, a, b]);
  return (
    <mesh geometry={geo}>
      <meshStandardMaterial color={CYAN} metalness={0.35} roughness={0.35}
        transparent opacity={wire ? 0.22 : 0.62} side={THREE.DoubleSide}
        emissive={CYAN} emissiveIntensity={0.12} />
    </mesh>
  );
}

/** generating curve y = f(x) in the x–y plane (z = 0), plus disc rings */
function GeneratingCurve({ f, a, b, rings }: { f: (x: number) => number; a: number; b: number; rings: boolean }) {
  const curve: [number, number, number][] = [];
  for (let i = 0; i <= 96; i++) {
    const x = a + ((b - a) * i) / 96;
    curve.push([f(x), x, 0]);
  }
  const discRings = useMemo(() => {
    if (!rings) return [];
    const out: [number, number, number][][] = [];
    const n = 9;
    for (let i = 0; i <= n; i++) {
      const x = a + ((b - a) * i) / n;
      const r = Math.max(0.005, f(x));
      const ring: [number, number, number][] = [];
      for (let k = 0; k <= 48; k++) {
        const th = (k / 48) * Math.PI * 2;
        ring.push([r * Math.cos(th), x, r * Math.sin(th)]);
      }
      out.push(ring);
    }
    return out;
  }, [f, a, b, rings]);
  return (
    <group>
      <Line points={curve} color={GOLD} lineWidth={3} />
      {discRings.map((r, i) => (
        <Line key={i} points={r} color="rgba(251,191,36,0.55)" lineWidth={1.2} />
      ))}
    </group>
  );
}

export default function C12_MathsSolidsOfRevolutionSim() {
  const [pi, setPi] = useState(0);
  const preset = PRESETS[pi];
  const [a, setA] = useState(0.2);
  const [b, setB] = useState(1.8);
  const [rings, setRings] = useState(true);
  const [wire, setWire] = useState(false);

  // ── live numerics ──
  const m = useMemo(() => {
    const lo = Math.min(a, b), hi = Math.max(a, b);
    const g = (x: number) => preset.f(x) ** 2;
    const vNum = Math.PI * simpson(g, lo, hi);
    const vAna = preset.analytic(lo, hi);
    return { lo, hi, vNum, vAna, err: Math.abs(vNum - vAna), rel: Math.abs(vNum - vAna) / (vAna || 1) };
  }, [preset, a, b]);

  const reset = () => { setPi(0); setA(0.2); setB(1.8); setRings(true); setWire(false); };
  const pickPreset = (i: number) => {
    setPi(i);
    const d = PRESETS[i].dom;
    setA(d[0] + 0.1 * (d[1] - d[0]));
    setB(d[0] + 0.9 * (d[1] - d[0]));
  };

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
        <Canvas camera={{ position: [7, 4.5, 9], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[8, 12, 6]} intensity={0.95} color="#ffe9b8" />
          <directionalLight position={[-10, 5, -8]} intensity={0.4} color="#7dd3fc" />
          <Grid args={[30, 30]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={60} fadeStrength={1.2} />
          {/* spin axis = y (math x) */}
          <Line points={[[0, -1, 0], [0, 6, 0]]} color="rgba(255,255,255,0.4)" lineWidth={1.4} />
          <Text position={[0.45, 6, 0]} fontSize={0.34} color="#94a3b8">x (spin axis)</Text>
          <Text position={[3.4, 0.4, 0]} fontSize={0.34} color={GOLD}>{preset.name}</Text>
          <RevolvedSolid f={preset.f} a={m.lo} b={m.hi} wire={wire} />
          <GeneratingCurve f={preset.f} a={m.lo} b={m.hi} rings={rings} />
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={30} target={[0, 2, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[268px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Disc method — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('limits a → b', `${m.lo.toFixed(2)} → ${m.hi.toFixed(2)}`)}
            {row('V numeric (Simpson, π∫f²dx)', `${m.vNum.toFixed(4)} unit³`, 'text-gold-300')}
            {row(`V analytic ${preset.analyticTex}`, `${m.vAna.toFixed(4)} unit³`, 'text-gold-300')}
            {row('agreement', m.err < 1e-3 ? `Δ = ${(m.err).toExponential(1)} ✓` : `Δ = ${m.err.toFixed(4)}`, 'text-emerald-300')}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              each gold ring is one disc of radius f(x), volume πf(x)²·dx
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The gold curve is y = f(x); the blue body is that curve spun about the x-axis
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Sigma className="h-3.5 w-3.5 text-gold-400" /> curve:</span>
        {PRESETS.map((p, i) => (
          <button key={p.key} onClick={() => pickPreset(i)} className={btn(pi === i)}>{p.name}</button>
        ))}
        <span className="ml-2 text-xs text-surface-400">a:</span>
        <input type="range" min={preset.dom[0]} max={preset.dom[1]} step={0.05} value={a}
          onChange={(e) => setA(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{a.toFixed(2)}</span>
        <span className="text-xs text-surface-400">b:</span>
        <input type="range" min={preset.dom[0]} max={preset.dom[1]} step={0.05} value={b}
          onChange={(e) => setB(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{b.toFixed(2)}</span>
        <button onClick={() => setRings(!rings)} className={btn(rings)}>discs</button>
        <button onClick={() => setWire(!wire)} className={btn(wire)}>x-ray</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><CircleDot className="h-4 w-4" /> THE SLICE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Cut perpendicular to the spin axis: every cut face is a <span className="text-white">disc</span>
            of radius f(x). Its volume is π·radius²·thickness = πf(x)²dx — that is the whole formula.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sigma className="h-4 w-4" /> THE SUM</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Stack the discs: V ≈ Σπf(xᵢ)²Δx. Let Δx → 0 and the sum becomes
            <span className="text-gold-300"> V = π∫ₐᵇ f(x)²dx</span>. The HUD checks it against
            Simpson&apos;s rule to 4+ decimal places, live.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><RotateCw className="h-4 w-4" /> WASHER VARIATION</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Spin a gap (outer g, inner h) about the axis and each disc gains a hole:
            dV = π(g²−h²)dx. Same derivation — the disc is just annulus-ified.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The volume of revolution is π∫f(x)dx.&quot; No — <span className="text-white">the disc&apos;s
            AREA is πr², so f(x) gets squared before integrating.</span> Compare on y = x²:
            π∫x²dx vs the true π∫x⁴dx differ hugely. The squaring is geometric: a disc&apos;s
            area grows with the SQUARE of its radius.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Pick y = √x, set a = 0, b = 2: V reads π·4/2 = 2π ≈ 6.2832 unit³ — the cone-like
            body of exactly two unit-sphere-halves. Verify the HUD delta stays ~10⁻⁴.
            ② Slide a up from 0 on y = sin x: the volume grows until b−a = π then stops —
            sin x completes one full hump, and negative f² values still add volume (radius is |f|).
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'Volume when y = x² from x = 0 to 1 spins about the x-axis?', opts: ['π/5', 'π/3', 'π/2'], correct: 0 },
  { q: 'Why does f(x) appear SQUARED under the integral?', opts: ['Each slice is a disc: area = πr²', 'Because volume is 3D', 'To make the answer positive'], correct: 0 },
  { q: 'Revolving the region between outer g(x) and inner h(x) gives slices shaped as…', opts: ['washers of area π(g²−h²)', 'discs of area πg²', 'rectangles of height g−h'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on solids of revolution — no marks, no shame.</p>
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
