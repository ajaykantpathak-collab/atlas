'use client';

/**
 * C11_MathsDirectionCosinesLabSim.tsx — 3D
 * Class 11 Maths — Introduction to 3D Geometry: direction cosines & angles
 *
 * WHY 3D: a direction in space leans against ALL THREE axes at once. The
 * three lean-angles α, β, γ cannot be chosen freely — they are handcuffed
 * by one identity you can watch break and repair on the unit sphere.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  For ray OP with |OP| = r, drop perpendiculars from P to each axis.
 *  In each right triangle the adjacent leg is the axis projection:
 *      l = cos α = x/r,   m = cos β = y/r,   n = cos γ = z/r
 *  Adding the projections' squares:
 *      l² + m² + n² = (x² + y² + z²)/r² = r²/r² = 1
 *  So cosines of THREE angles must square-sum to EXACTLY 1 — three
 *  numbers with only two degrees of freedom. If sliders violate it, the
 *  raw vector (l, m, n) misses the unit sphere; the honest repair is
 *  rescaling by  s = 1/√(l²+m²+n²)  (normalization shown live).
 *  Bonus identity: for the second ray with cosines l′, m′, n′ at angle θ:
 *      cos θ = l·l′ + m·m′ + n·n′
 *
 * Controls: α, β, γ sliders, unit-sphere toggle, angle-to-second-ray
 * preset, Reset.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Compass, CircleDot, RotateCcw, Sparkles, TriangleAlert } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const BLUE = '#60a5fa';
const GREEN = '#34d399';
const D2R = Math.PI / 180;
const R = 3; // unit-sphere display radius

type V3 = [number, number, number];

function UnitSphere({ show }: { show: boolean }) {
  if (!show) return null;
  const rings: V3[][] = [];
  for (const lat of [-60, -30, 0, 30, 60]) {
    const r = R * Math.cos(lat * D2R);
    const y = R * Math.sin(lat * D2R);
    const ring: V3[] = [];
    for (let i = 0; i <= 64; i++) {
      const th = (i / 64) * Math.PI * 2;
      ring.push([r * Math.cos(th), y, r * Math.sin(th)]);
    }
    rings.push(ring);
  }
  return (
    <group>
      <mesh>
        <sphereGeometry args={[R, 32, 24]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.05} />
      </mesh>
      {rings.map((ring, i) => (
        <Line key={i} points={ring} color="rgba(96,165,250,0.35)" lineWidth={1} />
      ))}
    </group>
  );
}

export default function C11_MathsDirectionCosinesLabSim() {
  const [alpha, setAlpha] = useState(55);
  const [beta, setBeta] = useState(55);
  const [gamma, setGamma] = useState(55);
  const [showSphere, setShowSphere] = useState(true);
  // second fixed ray for the cos θ = l·l′+m·m′+n·n′ identity
  const [secondRay, setSecondRay] = useState(false);
  const l2p: V3 = [0.5, 0.6, -R * Math.sqrt(1 - 0.25 - 0.36)]; // l′=1/2, m′=0.6, n′ completes the identity

  const m = useMemo(() => {
    const l = Math.cos(alpha * D2R);
    const mc = Math.cos(beta * D2R);
    const n = Math.cos(gamma * D2R);
    const sumSq = l * l + mc * mc + n * n;
    const scale = 1 / Math.sqrt(sumSq); // normalization factor (valid ray if = 1)
    const raw: V3 = [l * R, mc * R, n * R];
    const unit: V3 = [l * R * scale, mc * R * scale, n * R * scale];
    // angle to the second ray (identity check)
    const cosT = (l * l2p[0] + mc * l2p[1] + n * l2p[2]) / Math.sqrt(sumSq * 1.0);
    const thetaDeg = (Math.acos(Math.min(1, Math.max(-1, cosT))) * 180) / Math.PI;
    return { l, mc, n, sumSq, scale, raw, unit, valid: Math.abs(sumSq - 1) < 0.01, thetaDeg, cosT };
  }, [alpha, beta, gamma]);

  const proj = (axis: 0 | 1 | 2, v: V3): V3 => {
    const p: V3 = [0, 0, 0];
    p[axis] = v[axis];
    return p;
  };

  const reset = () => { setAlpha(55); setBeta(55); setGamma(55); setSecondRay(false); };
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );
  const slider = (label: string, v: number, set: (x: number) => void, color: string) => (
    <div className="flex items-center gap-2">
      <span className="w-8 text-xs font-display font-bold" style={{ color }}>{label}</span>
      <input type="range" min={0} max={180} step={1} value={v}
        onChange={(e) => set(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
      <span className="w-12 text-xs text-white">{v}°</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [6, 5, 9], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 6]} intensity={0.85} color="#ffe9b8" />
          <Grid args={[24, 24]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={50} fadeStrength={1.2} />
          <UnitSphere show={showSphere} />
          {/* axes */}
          {([[R + 1, 0, 0], [0, R + 1, 0], [0, 0, R + 1]] as V3[]).map((tip, i) => (
            <Line key={i} points={[[0, 0, 0], i === 0 ? [R + 1, 0, 0] : i === 1 ? [0, R + 1, 0] : [0, 0, R + 1]]}
              color="rgba(255,255,255,0.4)" lineWidth={1.3} />
          ))}
          <Text position={[R + 1.4, 0, 0]} fontSize={0.32} color="#94a3b8">x</Text>
          <Text position={[0, R + 1.4, 0]} fontSize={0.32} color="#94a3b8">y</Text>
          <Text position={[0, 0, R + 1.4]} fontSize={0.32} color="#94a3b8">z</Text>
          {/* raw (possibly non-unit) direction — rose if invalid */}
          {!m.valid && <Line points={[[0, 0, 0], m.raw]} color={ROSE} lineWidth={2.4} />}
          {/* normalized unit direction — gold, always touches the sphere */}
          <Line points={[[0, 0, 0], m.unit]} color={m.valid ? GOLD : 'rgba(251,191,36,0.75)'} lineWidth={3.4} />
          {/* projection legs onto the three axes */}
          {([0, 1, 2] as (0 | 1 | 2)[]).map((ax) => (
            <Line key={ax} points={[m.unit, proj(ax, m.unit)]}
              color="rgba(255,255,255,0.5)" lineWidth={1.4} dashed dashSize={0.16} gapSize={0.1} />
          ))}
          <mesh position={m.unit}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} />
          </mesh>
          <Text position={[m.unit[0] + 0.35, m.unit[1] + 0.35, m.unit[2]]} fontSize={0.28} color={GOLD}>P</Text>
          {/* second ray for the cos θ identity */}
          {secondRay && (
            <group>
              <Line points={[[0, 0, 0], l2p]} color={BLUE} lineWidth={2.6} />
              <Text position={[l2p[0] + 0.3, l2p[1], l2p[2]]} fontSize={0.26} color={BLUE}>Q (fixed)</Text>
            </group>
          )}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={26} target={[0, 0.5, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[272px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Direction cosines — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('l = cos α', m.l.toFixed(3))}
            {row('m = cos β', m.mc.toFixed(3))}
            {row('n = cos γ', m.n.toFixed(3))}
            {row('l²+m²+n²', m.sumSq.toFixed(3), m.valid ? 'text-emerald-300' : 'text-rose-300')}
            {m.valid
              ? row('status', 'valid direction ✓', 'text-emerald-300')
              : (
                <>
                  {row('normalizer s = 1/√(Σl²)', m.scale.toFixed(3), 'text-gold-300')}
                  <div className="flex items-center gap-1 pt-0.5 text-[10px] text-rose-300">
                    <TriangleAlert className="h-3 w-3" /> raw ray misses the sphere — rescaled
                  </div>
                </>
              )}
            {secondRay && (
              <>
                <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">OP vs OQ angle identity</div>
                {row('cosθ = l·l′+m·m′+n·n′', m.cosT.toFixed(3), 'text-gold-300')}
                {row('θ', `${m.thetaDeg.toFixed(1)}°`)}
              </>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The gold ray must end ON the unit sphere — else l²+m²+n² ≠ 1
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Compass className="h-3.5 w-3.5 text-gold-400" /> direction angles:</span>
        {slider('α', alpha, setAlpha, ROSE)}
        {slider('β', beta, setBeta, BLUE)}
        {slider('γ', gamma, setGamma, GREEN)}
        <button onClick={() => setShowSphere(!showSphere)} className={btn(showSphere)}>unit sphere</button>
        <button onClick={() => setSecondRay(!secondRay)} className={btn(secondRay)}>2nd ray</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><CircleDot className="h-4 w-4" /> THE LEGS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The dashed legs are P&apos;s shadows on the three axes. Each right triangle gives
            one cosine: adjacent (the shadow) over hypotenuse (the ray) — that is ALL
            l = cos α is. No new machinery, just SOH-CAH-TOA three times.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> THE HANDCUFF</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            l²+m²+n² = 1 is Pythagoras in disguise: the three shadows are the legs, the ray
            is the hypotenuse. Drag α = β = γ = 60°: the sum reads 0.75 — the rose ray
            falls short of the sphere, caught red-handed.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Compass className="h-4 w-4" /> ANGLE FROM COSINES</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Turn on the 2nd ray: cos θ = l·l′ + m·m′ + n·n′ is the dot product in cosine
            clothing. Every angle between two directions in space is one multiplication of
            six cosines.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Pick any three direction angles you like.&quot; No —
            <span className="text-white"> only two are free.</span> The identity
            l²+m²+n² = 1 chains the third to the other two. Try α = β = γ = 45°: sum = 1.5,
            invalid. The sphere is the lie detector: a real direction ALWAYS lands on it.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Find the symmetric direction α = β = γ where the ray touches the sphere
            (answer 54.7°, l = m = n = 1/√3 — the diagonal of the cube).
            ② Set α = 0°: l = 1, so m = n = 0 forced — the ray snaps to the x-axis and the
            sphere confirms there is exactly one such direction.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'For any line direction, l² + m² + n² equals…', opts: ['1', '3', 'the length of the line'], correct: 0 },
  { q: 'If l = 1/√3 and m = 1/√3, then n = …', opts: ['1/√3', '1/2', '1/3'], correct: 0 },
  { q: 'cos α is geometrically…', opts: ['x-projection of OP divided by |OP|', 'the length of OP', 'the area under OP'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on direction cosines — no marks, no shame.</p>
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
