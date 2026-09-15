'use client';

/**
 * C11_PhysicsSHMCircularProjectionSim.tsx — 3D
 * Class 11 Physics — Oscillations — SHM as Projection of Circular Motion
 * [3d-lab:c11-osc-shm-projection]
 *
 * WHY 3D: the single most useful picture in oscillations — a particle in
 * uniform circular motion, its shadow on a diameter doing SHM — only
 * clicks when you can stand side-on and watch the circle become a sine.
 *
 * HONEST NUMERICS — SHM derived from the projection, by hand:
 *   Bob P on a circle of radius A, angle θ = ωt (uniform):
 *      P = (A cos θ, A sin θ)
 *   The shadow's position on the x-axis:      x = A cos(ωt)
 *   Differentiate:   v = dx/dt = −Aω sin(ωt)      (max |v| = Aω at centre)
 *   Differentiate:   a = −Aω² cos(ωt) = −ω² x
 *   That last line IS the SHM defining law: a = −ω²x. The projection is not
 *   an analogy — it is a proof that circular motion projected is SHM, with
 *   ω the same angular frequency. Energy (computed live):
 *      E = ½mv² + ½kx² with k = mω²  →  E = ½mω²A²  (constant)
 *
 * Controls: amplitude A, period T, phase φ, mass, play/pause, trace, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Orbit, Gauge, RotateCcw, Sparkles, Activity } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// 3D pieces — the clock lives in refs; every frame recomputes the math
// ─────────────────────────────────────────────────────────────

const CIRCLE_X = -3.2;   // circle centre x
const CIRCLE_Y = 2.6;    // circle centre height (projection drops to the floor rail)

interface PhasorState {
  t: number;
  lastPush: number;
  trail: [number, number, number][];
}

function SHMStage({ A, T, phase, playing, showTrace, m, readoutRef }: {
  A: number; T: number; phase: number; playing: boolean; showTrace: boolean;
  m: number;
  readoutRef: React.MutableRefObject<{ x: number; v: number; a: number; E: number }>;
}) {
  const st = useRef<PhasorState>({ t: 0, lastPush: 0, trail: [] });
  const bobRef = useRef<THREE.Mesh>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const phasorRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  const omega = (2 * Math.PI) / T;

  // parameter changes start a fresh trace (deterministic, no stale sine)
  useEffect(() => {
    st.current.trail = [];
    st.current.lastPush = 0;
  }, [A, T, phase]);

  useFrame((_, delta) => {
    if (playing) st.current.t += delta;
    const t = st.current.t;
    const th = omega * t + phase;

    const x = A * Math.cos(th);            // shadow displacement along the rail
    const y = A * Math.sin(th);            // bob height relative to circle centre
    const v = -A * omega * Math.sin(th);   // shadow velocity (d/dt of x)
    const a = -omega * omega * x;          // shadow acceleration = −ω²x
    const k = m * omega * omega;
    const E = 0.5 * k * A * A;

    readoutRef.current = { x, v, a, E };

    // bob rides the circle (centre raised at CIRCLE_X, CIRCLE_Y)
    if (bobRef.current) bobRef.current.position.set(CIRCLE_X + x, CIRCLE_Y + y, 0);
    // its shadow is the projection straight DOWN onto the rail y = 0
    if (shadowRef.current) shadowRef.current.position.set(CIRCLE_X + x, 0, 0);
    if (phasorRef.current) phasorRef.current.rotation.z = th;
    if (beamRef.current) {
      const h = Math.max(0.02, CIRCLE_Y + y);
      beamRef.current.position.set(CIRCLE_X + x, h / 2, 0);
      beamRef.current.scale.y = h;
    }

    // roll the trace: sample (displacement → x, elapsed time → z) behind the rail
    if (t - st.current.lastPush > 0.028) {
      st.current.lastPush = t;
      st.current.trail.push([CIRCLE_X + x, 0.01, t * 0.5]);
      if (st.current.trail.length > 320) st.current.trail.shift();
    }
  });

  const circlePts: [number, number, number][] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    circlePts.push([CIRCLE_X + A * Math.cos(a), CIRCLE_Y + A * Math.sin(a), 0]);
  }

  return (
    <group>
      {/* reference circle + phasor, centred high on the left */}
      <Line points={circlePts} color="rgba(251,191,36,0.5)" lineWidth={1.5} />
      <group position={[CIRCLE_X, CIRCLE_Y, 0]}>
        <group ref={phasorRef}>
          <Line points={[[0, 0, 0], [A, 0, 0]]} color="#fbbf24" lineWidth={2.5} />
        </group>
      </group>

      {/* rail (the shadow axis) */}
      <Line points={[[CIRCLE_X - A - 0.6, 0, 0], [CIRCLE_X + A + 0.6, 0, 0]]} color="rgba(255,255,255,0.3)" lineWidth={1} />
      <Text position={[CIRCLE_X - A - 1.1, 0.35, 0]} fontSize={0.28} color="#94a3b8">−A</Text>
      <Text position={[CIRCLE_X + A + 0.55, 0.35, 0]} fontSize={0.28} color="#94a3b8">+A</Text>

      {/* projection beam (bob → shadow) */}
      <mesh ref={beamRef}>
        <cylinderGeometry args={[0.015, 0.015, 1, 6]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      {/* the bob (uniform circular motion) */}
      <mesh ref={bobRef}>
        <sphereGeometry args={[0.26, 28, 28]} />
        <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.4} metalness={0.4} roughness={0.35} />
      </mesh>

      {/* the shadow bob doing SHM on the rail */}
      <mesh ref={shadowRef}>
        <sphereGeometry args={[0.22, 28, 28]} />
        <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.45} metalness={0.4} roughness={0.35} />
      </mesh>

      {/* unrolling sine trace: displacement vs time, drifting back along +z */}
      {showTrace && st.current.trail.length > 1 && (
        <Line
          points={st.current.trail}
          color="rgba(96,165,250,0.85)" lineWidth={2}
        />
      )}
    </group>
  );
}

function SpinGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.1;
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C11_PhysicsSHMCircularProjectionSim() {
  const [A, setA] = useState(1.8);
  const [T, setT] = useState(3);
  const [phaseDeg, setPhaseDeg] = useState(0);
  const [m, setM] = useState(0.5);
  const [playing, setPlaying] = useState(true);
  const [showTrace, setShowTrace] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const readoutRef = useRef({ x: A, v: 0, a: 0, E: 0 });
  const [live, setLive] = useState({ x: A, v: 0, a: 0, E: 0 });
  useEffect(() => {
    const id = setInterval(() => setLive({ ...readoutRef.current }), 120);
    return () => clearInterval(id);
  }, []);

  const omega = (2 * Math.PI) / T;
  const f = 1 / T;
  const vMax = A * omega;
  const aMax = A * omega * omega;
  const kEquiv = m * omega * omega;
  const E = 0.5 * kEquiv * A * A;

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'The acceleration of the SHM shadow relates to its displacement x as', opts: ['a = −ω²x (toward centre)', 'a = ω²x (away)', 'a = constant'], correct: 0 },
    { q: 'Maximum speed of the shadow occurs when it passes', opts: ['the mean position (x = 0)', 'the extreme (x = ±A)', 'quarter of amplitude'], correct: 0 },
    { q: 'If the amplitude A doubles, the total energy E = ½mω²A² becomes', opts: ['4×', '2×', '√2×'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [phaseDeg]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setA(1.8); setT(3); setPhaseDeg(0); setM(0.5); setPlaying(true); setShowTrace(true); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [1.5, 4.5, 11], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.0} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[50, 50]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid />
          <SpinGroup spin={spin}>
            <SHMStage A={A} T={T} phase={(phaseDeg * Math.PI) / 180} playing={playing} showTrace={showTrace} m={m} readoutRef={readoutRef} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[252px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">SHM ← circular projection, live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">amplitude A</span><span className="text-white">{A.toFixed(2)} u</span></div>
            <div className="flex justify-between"><span className="text-surface-500">period T / f</span><span className="text-white">{T.toFixed(2)} s / {f.toFixed(2)} Hz</span></div>
            <div className="flex justify-between"><span className="text-surface-500">ω = 2π/T</span><span className="text-white">{omega.toFixed(2)} rad/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">x = A cos(ωt+φ)</span><span className="text-gold-300">{live.x.toFixed(2)} u</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v = −Aω sin(ωt+φ)</span><span className="text-gold-300">{live.v.toFixed(2)} u/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">a = −ω²x</span><span className="text-gold-300">{live.a.toFixed(2)} u/s²</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v_max = Aω</span><span className="text-white">{vMax.toFixed(2)} u/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">a_max = ω²A</span><span className="text-white">{aMax.toFixed(2)} u/s²</span></div>
            <div className="flex justify-between"><span className="text-surface-500">E = ½mω²A²</span><span className="text-gold-300">{E.toFixed(3)} J (m = {m.toFixed(2)} kg)</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Stand side-on: the gold circle collapses into the blue sine
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Gauge className="h-3.5 w-3.5 text-gold-400" /> A:</span>
        <input type="range" min={0.8} max={3} step={0.05} value={A} onChange={(e) => setA(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">T:</span>
        <input type="range" min={1} max={6} step={0.1} value={T} onChange={(e) => setT(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">φ:</span>
        <input type="range" min={0} max={360} step={5} value={phaseDeg} onChange={(e) => setPhaseDeg(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">m:</span>
        <input type="range" min={0.1} max={2} step={0.05} value={m} onChange={(e) => setM(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-white">{m.toFixed(2)} kg</span>
        <button onClick={() => setPlaying(!playing)} className={btn(playing)}>{playing ? 'pause' : 'play'}</button>
        <button onClick={() => setShowTrace(!showTrace)} className={btn(showTrace)}>trace</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · THE PROJECTION IS A PROOF</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Uniform circular motion at angle θ = ωt casts shadow x = A cos ωt.
            Differentiate twice and a = −ω²x falls out — the exact definition of SHM.
            This is why every oscillation chapter starts with a circle: the maths is
            inherited, not re-derived. The phasor arrow you see is that proof in motion.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · WHERE SPEED LIVES</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            v = −Aω sin ωt: zero at the extremes (the bob&apos;s shadow briefly moves
            purely vertically there), maximum Aω at the centre. Meanwhile a = −ω²x is
            largest at the extremes and zero at centre. Watch the blue ball and the two
            readouts disagree on purpose — v and a are a quarter cycle apart.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · ENERGY IS CONSTANT</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            With k = mω², E = ½mv² + ½kx² = ½mω²A²(sin² + cos²) = ½mω²A² — independent
            of time and of x. Kinetic and potential trade places twice per cycle but the
            total never wobbles. Double A and E quadruples; double m and E only doubles.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;SHM means accelerating in the direction of motion.&quot; No —
            acceleration is always <span className="text-white">opposite the
            displacement</span> (a = −ω²x): at x &gt; 0 it points left even while the
            mass still moves right, slowing it down. And the projection trick does NOT
            mean the particle physically moves in a circle — the circle is the
            generating geometry; the mass itself only slides along a line.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set φ = 90°: the bob starts at the top of the circle and the shadow starts
            at x = 0 moving as a sine, not a cosine — phase is just the starting point on
            the circle.
            ② Halve T twice (3 → 1.5 → 0.75 s): v_max = Aω and a_max = ω²A jump ×2 then
            ×4 — watch the blue ball whip while the period readout confirms ω = 2π/T.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick SHM questions — no marks, no shame.</p>
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
