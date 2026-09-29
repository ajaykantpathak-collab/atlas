'use client';

/**
 * C11_MathsVectorsDotCrossSim.tsx — 3D
 * Class 11 Maths — Vector Algebra (dot product & cross product)
 *
 * WHY 3D: a×b is defined as the vector PERPENDICULAR to both a and b.
 * That sentence is dead on a 2D page — in 3D you orbit around the
 * parallelogram and watch the gold arrow stay normal to its plane.
 *
 * HAND-DERIVED NUMERICS (computed live from the sliders):
 *  ─ Dot: a·b = a₁b₁ + a₂b₂ + a₃b₃ = |a||b|cosθ
 *    (from cosine rule: |b−a|² = |a|²+|b|²−2|a||b|cosθ and expanding
 *     |b−a|² = |a|²+|b|²−2a·b  ⇒  a·b = |a||b|cosθ)
 *  ─ Cross by cofactor expansion of |î ĵ k̂; a₁ a₂ a₃; b₁ b₂ b₃|:
 *      a×b = (a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁)
 *  ─ |a×b| = |a||b|sinθ = area of the parallelogram spanned by a,b
 *    (base|a| · height |b|sinθ by dropping the perpendicular)
 *  ─ Perpendicularity check n̂·a = 0, n̂·b = 0, where n̂ = (a×b)/|a×b|
 *
 * Controls: 6 component sliders, parallelogram fill toggle, Reset.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Move3d, Square, RotateCcw, CircleDot, Compass } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const BLUE = '#60a5fa';
const GREEN = '#34d399';

type Vec3 = [number, number, number];

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (a: Vec3) => Math.sqrt(dot(a, a));

/** gold arrow: cylinder shaft + cone head, oriented from→to */
function ArrowVec({ from, to, color }: { from: Vec3; to: Vec3; color: string }) {
  const [fx, fy, fz] = from;
  const dir = new THREE.Vector3(to[0] - fx, to[1] - fy, to[2] - fz);
  const len = dir.length();
  if (len < 0.02) return null;
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0), dir.clone().normalize(),
  );
  return (
    <group position={from} quaternion={quat}>
      <mesh position={[0, (len - 0.34) / 2, 0]}>
        <cylinderGeometry args={[0.045, 0.045, len - 0.34, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, len - 0.19, 0]}>
        <coneGeometry args={[0.12, 0.36, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/** parallelogram O→a→a+b→b as two triangles */
function ParallelogramFill({ a, b, show }: { a: Vec3; b: Vec3; show: boolean }) {
  if (!show) return null;
  const c: Vec3 = [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const verts = new Float32Array([0, 0, 0, ...a, ...c, 0, 0, 0, ...c, ...b]);
  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[verts, 3]} />
      </bufferGeometry>
      <meshBasicMaterial color={GOLD} transparent opacity={0.18} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Axes() {
  const axis = (pts: Vec3[], c: string) => <Line points={pts} color={c} lineWidth={1.4} />;
  return (
    <group>
      {axis([[-7, 0, 0], [7, 0, 0]], 'rgba(255,255,255,0.4)')}
      {axis([[0, -1, 0], [0, 7, 0]], 'rgba(255,255,255,0.4)')}
      {axis([[0, 0, -7], [0, 0, 7]], 'rgba(255,255,255,0.4)')}
      <Text position={[7.3, 0, 0]} fontSize={0.35} color="#94a3b8">x</Text>
      <Text position={[0, 7.3, 0]} fontSize={0.35} color="#94a3b8">y</Text>
      <Text position={[0, 0, 7.3]} fontSize={0.35} color="#94a3b8">z</Text>
    </group>
  );
}

export default function C11_MathsVectorsDotCrossSim() {
  const [a, setA] = useState<Vec3>([3, 1, 0]);
  const [b, setB] = useState<Vec3>([1, 2, 2]);
  const [showFill, setShowFill] = useState(true);

  // ── live numerics (no canned numbers) ──
  const m = useMemo(() => {
    const la = norm(a), lb = norm(b);
    const d = dot(a, b);
    const cr = cross(a, b);
    const area = norm(cr);
    const cosT = la * lb > 1e-9 ? d / (la * lb) : 0;
    const sinT = la * lb > 1e-9 ? area / (la * lb) : 0;
    const nHat: Vec3 = area > 1e-9 ? [cr[0] / area, cr[1] / area, cr[2] / area] : [0, 0, 0];
    const thetaDeg = (Math.acos(Math.min(1, Math.max(-1, cosT))) * 180) / Math.PI;
    return {
      la, lb, d, cr, area, cosT, sinT, nHat, thetaDeg,
      sinFromAngle: la * lb * Math.sin(Math.acos(Math.min(1, Math.max(-1, cosT)))),
      perpA: area > 1e-9 ? dot(nHat, a) : NaN,
      perpB: area > 1e-9 ? dot(nHat, b) : NaN,
    };
  }, [a, b]);

  const reset = () => { setA([3, 1, 0]); setB([1, 2, 2]); setShowFill(true); };

  const compSlider = (label: string, v: number, set: (x: number) => void, color: string) => (
    <div className="flex items-center gap-2">
      <span className="w-8 text-xs font-display font-bold" style={{ color }}>{label}</span>
      <input type="range" min={-5} max={5} step={0.5} value={v}
        onChange={(e) => set(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
      <span className="w-10 text-xs text-white">{v % 1 === 0 ? v : v.toFixed(1)}</span>
    </div>
  );

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
        <Canvas camera={{ position: [8, 6, 12], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 6]} intensity={0.9} color="#ffe9b8" />
          <Grid args={[30, 30]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.25)"
            fadeDistance={60} fadeStrength={1.2} />
          <Axes />
          <ParallelogramFill a={a} b={b} show={showFill} />
          {/* the two spanning vectors */}
          <ArrowVec from={[0, 0, 0]} to={a} color={ROSE} />
          <ArrowVec from={[0, 0, 0]} to={b} color={BLUE} />
          {/* diagonal a+b */}
          <Line points={[[0, 0, 0], [a[0] + b[0], a[1] + b[1], a[2] + b[2]]]}
            color="rgba(255,255,255,0.35)" lineWidth={1.2} dashed dashSize={0.2} gapSize={0.12} />
          {/* a×b — perpendicular to both, gold */}
          {m.area > 0.05 && (
            <group>
              <ArrowVec from={[0, 0, 0]} to={[m.cr[0], m.cr[1], m.cr[2]]} color={GOLD} />
              <Text position={[m.cr[0] * 1.1 + 0.3, m.cr[1] * 1.1 + 0.3, m.cr[2] * 1.1]}
                fontSize={0.32} color={GOLD}>a×b</Text>
            </group>
          )}
          <Text position={[a[0] * 1.12, a[1] * 1.12 + 0.3, a[2] * 1.12]} fontSize={0.32} color={ROSE}>a</Text>
          <Text position={[b[0] * 1.12, b[1] * 1.12 + 0.3, b[2] * 1.12]} fontSize={0.32} color={BLUE}>b</Text>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={30} target={[1, 1.5, 1]} />
        </Canvas>

        {/* HUD — live readouts with units */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[260px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Live products</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('|a|, |b|', `${m.la.toFixed(2)} m, ${m.lb.toFixed(2)} m`)}
            {row('a·b = a₁b₁+a₂b₂+a₃b₃', `${m.d.toFixed(2)} m²`, 'text-gold-300')}
            {row('cosθ = a·b/(|a||b|)', m.cosT.toFixed(3))}
            {row('θ between a and b', `${m.thetaDeg.toFixed(1)}°`)}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              a×b = ({m.cr.map((v) => v.toFixed(1)).join(', ')}) m²
            </div>
            {row('|a×b| (parallelogram area)', `${m.area.toFixed(2)} m²`, 'text-gold-300')}
            {row('|a||b|sinθ (base×height)', `${m.sinFromAngle.toFixed(2)} m²`)}
            {row('identity check', Math.abs(m.sinFromAngle - m.area) < 0.02 ? 'equal ✓' : '…', 'text-emerald-300')}
            {m.area > 0.05 && (
              <>
                {row('n̂·a (⊥ check)', m.perpA.toFixed(2))}
                {row('n̂·b (⊥ check)', m.perpB.toFixed(2))}
              </>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Orbit to see a×b stay perpendicular to the shaded parallelogram
        </div>
      </div>

      {/* ── controls ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: ROSE }}>VECTOR a (metres)</div>
          <div className="mt-2 space-y-1">
            {compSlider('a₁', a[0], (v) => setA([v, a[1], a[2]]), ROSE)}
            {compSlider('a₂', a[1], (v) => setA([a[0], v, a[2]]), ROSE)}
            {compSlider('a₃', a[2], (v) => setA([a[0], a[1], v]), ROSE)}
          </div>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: BLUE }}>VECTOR b (metres)</div>
          <div className="mt-2 space-y-1">
            {compSlider('b₁', b[0], (v) => setB([v, b[1], b[2]]), BLUE)}
            {compSlider('b₂', b[1], (v) => setB([b[0], v, b[2]]), BLUE)}
            {compSlider('b₃', b[2], (v) => setB([b[0], b[1], v]), BLUE)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Square className="h-3.5 w-3.5 text-gold-400" /> Parallelogram |a×b|</span>
        <button onClick={() => setShowFill(!showFill)} className={btn(showFill)}>show area</button>
        <span className="text-[11px] text-surface-500">
          gold arrow = a×b = ({m.cr.map((v) => v.toFixed(1)).join(', ')})
        </span>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><CircleDot className="h-4 w-4" /> DOT → SCALAR</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            a·b = |a||b|cosθ measures <span className="text-white">how much b runs along a</span>.
            Physics twin: work W = F·s. Slide b until θ = 90° and the dot dies to 0 —
            a force ⊥ to motion does no work.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Compass className="h-4 w-4" /> CROSS → VECTOR</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            a×b = (a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁), magnitude |a||b|sinθ — exactly the
            parallelogram area shaded gold. Physics twin: torque τ = r×F.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Move3d className="h-4 w-4" /> RIGHT-HAND RULE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Curl right-hand fingers from a toward b: the thumb points along a×b — the gold
            arrow. Flip to b×a and it points exactly opposite: <span className="text-white">a×b = −(b×a)</span>.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;a·b and a×b are both kinds of vector multiplication.&quot; No —
            <span className="text-white"> the dot is a number, the cross is a vector</span>, and they
            trade the SAME angle in opposite ways: cosθ peaks at 0° (parallel ⇒ max dot),
            sinθ peaks at 90° (perpendicular ⇒ max area). Watch the HUD identity
            |a×b| = |a||b|sinθ stay equal to the geometric base×height at every slider position.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Make a = (3,0,0), b = (0,4,0): the dot hits 0 and the area hits its maximum
            |a||b| = 12 m² — orbit and confirm a×b = (0,0,12) points along +z.
            ② Now set b = (3,0,0), parallel to a: the gold arrow shrinks to nothing —
            a×b = 0 when a ∥ b, which is the standard coplanarity test.
          </p>
        </div>
      </div>

      {/* ── self-check quiz ── */}
      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'a·b = 0 and neither vector is zero. What does that prove?', opts: ['a and b are perpendicular', 'a and b are parallel', 'a×b = 0 as well'], correct: 0 },
  { q: '|a| = 3 m, |b| = 5 m, θ = 90°. Area of the parallelogram they span?', opts: ['15 m²', '8 m²', '0 m²'], correct: 0 },
  { q: 'Which is TRUE for every a, b?', opts: ['a×b is perpendicular to both a and b', 'a·b is perpendicular to both', 'a×b is parallel to a'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on dot &amp; cross — no marks, no shame.</p>
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
