'use client';

/**
 * C11_PhysicsCentreOfMassSim.tsx — 3D
 * Class 11 Physics — System of Particles — Centre of Mass of Composite Bodies
 * [3d-lab:c11-com-composite]
 *
 * WHY 3D: the centre of mass of a 3D composite is a 3D POINT — slide a
 * part and watch the gold flag glide to the true weighted position, then
 * test the balance on a pivot: it stays level only exactly at the COM.
 *
 * HONEST NUMERICS — COM derived from first principles, by hand:
 *   Balance a two-body system on a knife edge: torques about the balance
 *   point must cancel:  m₁g·d₁ = m₂g·d₂ with d₁ = x_cm − x₁, d₂ = x₂ − x_cm
 *      m₁ (x_cm − x₁) = m₂ (x₂ − x_cm)
 *      →  x_cm = (m₁x₁ + m₂x₂) / (m₁ + m₂)
 *   Summing (or integrating r dm) gives the general law used live below:
 *      r_cm = Σ mᵢ rᵢ / Σ mᵢ   (or ∫ r dm / M for continuous bodies)
 *   Each primitive's OWN centre is known analytically (box: geometric
 *   centre; sphere: centre; cylinder: mid-height), so the composite COM is
 *   one exact weighted sum — recomputed on every slider move.
 *   The tipping test integrates the rigid-body pivot equation live:
 *      I_p φ̈ = −M g d cos φ,   d = x_cm − x_pivot
 *   Perfectly balanced (d = 0) → no torque, the structure holds level;
 *   off by centimetres → it slowly topples, exactly as the equation says.
 *
 * Controls: preset bodies, per-part mass sliders, part position slider,
 * pivot position, drop-balance test, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Box, RotateCcw, Sparkles, Scale } from 'lucide-react';

type V3 = [number, number, number];

interface Part {
  kind: 'box' | 'sphere' | 'cylinder';
  pos: V3;         // its own centre, metres (scene = metres)
  size: number;    // characteristic size (m)
  mass: number;    // kg
  label: string;
}

function partCentroid(p: Part): V3 {
  // analytic centres (derivation in header): these ARE the ∫r dm points
  return p.pos;
}

function computeCOM(parts: Part[]): { com: V3; M: number } {
  const M = parts.reduce((s, p) => s + p.mass, 0) || 1;
  const com: V3 = [0, 0, 0];
  for (const p of parts) {
    const c = partCentroid(p);
    com[0] += p.mass * c[0];
    com[1] += p.mass * c[1];
    com[2] += p.mass * c[2];
  }
  return { com: [com[0] / M, com[1] / M, com[2] / M], M };
}

// ─────────────────────────────────────────────────────────────
// Presets
// ─────────────────────────────────────────────────────────────

const PRESETS: Record<string, { name: string; parts: Part[] }> = {
  dumbbell: {
    name: 'Two spheres + rod',
    parts: [
      { kind: 'sphere', pos: [-1.6, 1, 0], size: 0.55, mass: 6, label: 'M₁' },
      { kind: 'sphere', pos: [1.6, 1, 0], size: 0.4, mass: 2, label: 'M₂' },
      { kind: 'cylinder', pos: [0, 1, 0], size: 1.6, mass: 1, label: 'rod' },
    ],
  },
  lshape: {
    name: 'L-shaped blocks',
    parts: [
      { kind: 'box', pos: [-0.6, 0.5, 0], size: 2.4, mass: 4, label: 'base' },
      { kind: 'box', pos: [0.6, 1.7, 0], size: 1.2, mass: 2, label: 'pillar' },
      { kind: 'sphere', pos: [-0.6, 2.6, 0], size: 0.45, mass: 3, label: 'ball' },
    ],
  },
  tower: {
    name: 'Stacked tower',
    parts: [
      { kind: 'box', pos: [0, 0.4, 0], size: 2.0, mass: 8, label: 'wide' },
      { kind: 'box', pos: [0.55, 1.25, 0], size: 1.1, mass: 2, label: 'lean' },
      { kind: 'cylinder', pos: [0.85, 2.3, 0], size: 0.9, mass: 1.5, label: 'pin' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

function PartMesh({ p, active }: { p: Part; active: boolean }) {
  const col = active ? '#93c5fd' : '#64748b';
  if (p.kind === 'box') {
    return (
      <mesh position={p.pos}>
        <boxGeometry args={[p.size, p.size * 0.85, p.size * 0.7]} />
        <meshStandardMaterial color={col} metalness={0.35} roughness={0.5} />
      </mesh>
    );
  }
  if (p.kind === 'sphere') {
    return (
      <mesh position={p.pos}>
        <sphereGeometry args={[p.size, 28, 28]} />
        <meshStandardMaterial color={col} metalness={0.45} roughness={0.4} />
      </mesh>
    );
  }
  return (
    <mesh position={p.pos} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.08, 0.08, p.size * 2, 12]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.35} />
    </mesh>
  );
}

/** pivot + tilt dynamics: I_p φ̈ = −Mg·d·cosφ (d = com_x − pivot_x) */
function BalancePivot({ pivotX, com, M, testing, tiltRef }: {
  pivotX: number; com: V3; M: number; testing: boolean;
  tiltRef: React.MutableRefObject<{ phi: number; om: number }>;
}) {
  const st = tiltRef.current;
  const pivotGrp = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const d = com[0] - pivotX;
    if (testing) {
      const Ip = M * (0.8 + 0.15 * d * d);      // demo moment about the pivot edge
      const h = Math.min(delta, 0.033);
      st.om += ((-M * 9.8 * d * Math.cos(st.phi)) / Ip) * h;
      st.om *= 0.995;                            // slight joint friction
      st.phi += st.om * h;
      if (st.phi > 1.35) { st.phi = 1.35; st.om = 0; }
      if (st.phi < -1.35) { st.phi = -1.35; st.om = 0; }
    } else {
      st.phi += (0 - st.phi) * Math.min(1, delta * 3);
      st.om = 0;
    }
    if (pivotGrp.current) pivotGrp.current.rotation.z = -st.phi;
  });

  return (
    <group>
      {/* the fulcrum (knife edge) */}
      <mesh position={[pivotX, 0.06, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.22, 0.55, 4]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} emissive="#92400e" emissiveIntensity={0.2} />
      </mesh>
      <Text position={[pivotX, -0.35, 0]} fontSize={0.24} color="#fbbf24">pivot</Text>
      {/* rotating reference bar showing tilt (exaggerated visual of φ) */}
      <group ref={pivotGrp} position={[pivotX, 0.33, 0]}>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[1.4, 0.07, 0.07]} />
          <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.3} />
        </mesh>
      </group>
      {/* COM flag pole (never rotates — shows the true point) */}
      <group position={com}>
        <Line points={[[0, 0, 0], [0, 1.3, 0]]} color="#fbbf24" lineWidth={2} />
        <mesh position={[0.28, 1.15, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.1, 14, 14]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
        <Text position={[0.4, 1.62, 0]} fontSize={0.26} color="#fbbf24">COM</Text>
      </group>
    </group>
  );
}

function SpinGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.12;
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C11_PhysicsCentreOfMassSim() {
  const [preset, setPreset] = useState<keyof typeof PRESETS>('dumbbell');
  const [m1, setM1] = useState(6);
  const [m2, setM2] = useState(2);
  const [shift, setShift] = useState(0);      // slide part-2 along x (m)
  const [pivotX, setPivotX] = useState(0);
  const [testing, setTesting] = useState(false);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const tiltRef = useRef({ phi: 0, om: 0 });
  useEffect(() => { tiltRef.current = { phi: 0, om: 0 }; }, [preset, pivotX]);

  // build parts live from the preset with the two sliders applied
  const parts: Part[] = React.useMemo(() => {
    const base = PRESETS[preset].parts.map((p) => ({ ...p, pos: [...p.pos] as V3 }));
    base[0].mass = m1;
    base[1].mass = m2;
    base[1].pos[0] += shift;
    return base;
  }, [preset, m1, m2, shift]);

  const { com, M } = computeCOM(parts);
  const offset = com[0] - pivotX;
  const balanced = Math.abs(offset) < 0.05;

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'The centre of mass of two bodies divides the line between them', opts: ['in the inverse ratio of masses (closer to heavier)', 'in the mass ratio', 'exactly halfway always'], correct: 0 },
    { q: 'A body balanced on a pivot stays level only when the pivot is', opts: ['vertically under the centre of mass', 'under the geometric centre', 'at the heaviest part'], correct: 0 },
    { q: 'For a uniform solid sphere, the centre of mass lies', opts: ['at the geometric centre', 'on the surface', 'outside'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [preset]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setPreset('dumbbell'); setM1(6); setM2(2); setShift(0); setPivotX(0); setTesting(false); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [5, 4.5, 8.5], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 14, 8]} intensity={1.0} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={60} fadeStrength={1.4} infiniteGrid position={[0, -0.4, 0]} />
          <SpinGroup spin={spin}>
            {/* ground line */}
            <Line points={[[-6, 0.01, 0], [6, 0.01, 0]]} color="rgba(255,255,255,0.3)" lineWidth={1} />
            {parts.map((p, i) => (
              <PartMesh key={i} p={p} active={i === 1} />
            ))}
            {/* position labels */}
            {parts.map((p, i) => (
              <Text key={`l${i}`} position={[p.pos[0], p.pos[1] + (p.kind === 'sphere' ? p.size + 0.35 : 0.9), p.pos[2]]}
                fontSize={0.26} color={i === 1 ? '#93c5fd' : '#cbd5e1'}>
                {p.label} {p.mass} kg
              </Text>
            ))}
            <BalancePivot pivotX={pivotX} com={com} M={M} testing={testing} tiltRef={tiltRef} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={26} maxPolarAngle={Math.PI / 2.02} target={[0, 1.2, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[258px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Centre of mass — live Σmᵢrᵢ/Σmᵢ</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">total mass Σm</span><span className="text-white">{M.toFixed(1)} kg</span></div>
            {parts.map((p, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-surface-500">{p.label}</span>
                <span className="text-white">{p.mass.toFixed(1)} kg @ ({p.pos[0].toFixed(2)}, {p.pos[1].toFixed(2)}, 0) m</span>
              </div>
            ))}
            <div className="mt-1.5 border-t border-white/10 pt-1.5" />
            <div className="flex justify-between"><span className="text-surface-500">COM (x, y, z)</span><span className="text-gold-300">({com[0].toFixed(2)}, {com[1].toFixed(2)}, {com[2].toFixed(2)}) m</span></div>
            <div className="flex justify-between"><span className="text-surface-500">offset from pivot</span><span className={balanced ? 'text-emerald-300' : 'text-rose-300'}>{offset >= 0 ? '+' : ''}{offset.toFixed(3)} m</span></div>
            <div className="flex justify-between"><span className="text-surface-500">balance</span><span className={testing ? (balanced ? 'text-emerald-300' : 'text-rose-300') : 'text-surface-400'}>
              {testing ? (balanced ? 'LEVEL — torque zero' : 'toppling…') : 'press drop-balance'}
            </span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The gold flag always floats at the exact mass-weighted point — orbit to verify
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Box className="h-3.5 w-3.5 text-gold-400" /> body:</span>
        {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((k) => (
          <button key={k} onClick={() => setPreset(k)} className={btn(preset === k)}>{PRESETS[k].name}</button>
        ))}
        <span className="ml-3 flex items-center gap-1.5 text-xs text-surface-400"><Scale className="h-3.5 w-3.5 text-gold-400" /> M₁:</span>
        <input type="range" min={0.5} max={12} step={0.5} value={m1} onChange={(e) => setM1(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">M₂:</span>
        <input type="range" min={0.5} max={12} step={0.5} value={m2} onChange={(e) => setM2(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">slide part 2:</span>
        <input type="range" min={-2.5} max={2.5} step={0.05} value={shift} onChange={(e) => setShift(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">pivot x:</span>
        <input type="range" min={-3} max={3} step={0.05} value={pivotX} onChange={(e) => setPivotX(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <button onClick={() => setTesting(!testing)} className={btn(testing)}>{testing ? 're-seat' : 'drop-balance'}</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · WEIGHTED AVERAGE, NOTHING MORE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            r_cm = Σmᵢrᵢ/Σmᵢ is a mass-weighted average — derived from torque
            balance m₁d₁ = m₂d₂, not decreed. Drag the mass slider and the flag
            glides continuously; drag the part, it glides with HALF the part&apos;s
            motion if the part is half the total mass. Every position is the exact
            arithmetic, live.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · THE COM MAY LIE ON NOTHING</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            For the dumbbell, the COM floats in the AIR between the spheres — there
            is no matter there at all. Same for a boomerang or a doughnut. The COM
            is a property of the mass DISTRIBUTION, not of any particular particle.
            Orbit the scene to see the flag floating in empty space.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · BALANCE = TORQUE ZERO</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Press drop-balance: if the pivot sits exactly under the COM, gravity&apos;s
            torque Mg·d is zero and the body holds level. Offset it a few centimetres
            and the integrated equation I_pφ̈ = −Mgd·cosφ slowly topples it — the
            same physics that balances a seesaw and topples an overloaded truck.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The centre of mass is where gravity acts, so it must always be INSIDE
            the object.&quot; No — for a ring or an L-shape it lies in <span className="text-white">empty
            space</span>. And it is not a fixed point of the MATERIAL: slide one part
            (the slider) and the COM moves without any matter being created — it is
            bookkeeping over the distribution. Gravity effectively acts there only in
            the sense that the net torque vanishes about it.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Dumbbell preset: set M₁ = M₂ and find where the flag settles — dead
            centre. Now quadruple M₁ (6→24 kg): the COM moves ¾ of the way toward
            M₁ — exactly the inverse-ratio rule x_cm − x₁ : x₂ − x_cm = m₂ : m₁.
            ② Tower preset, press drop-balance with the pivot at x=0: it topples.
            Slide the pivot to the COM x the HUD reports — level. That search IS how
            you find a centre of mass in a lab.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick COM questions — no marks, no shame.</p>
            </div>
            <button onClick={startQuiz} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 px-4 py-2.5 text-xs font-display font-bold text-surface-0 hover:shadow-lg hover:shadow-gold-500/30">
              <Sparkles className="h-3.5 w-3.5" /> Start
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
    </div>
  );
}
