'use client';

/**
 * C11_PhysicsGyroscopePrecessionSim.tsx — 3D
 * Class 11 Physics — Rotational Motion — Angular Momentum & Precession
 * [3d-lab:c11-rotation-gyroscope]
 *
 * WHY 3D: precession is motion about TWO different axes at once — the disc
 * spins about the axle while the axle sweeps a cone about the vertical.
 * A flat diagram cannot even draw it.
 *
 * HONEST NUMERICS — precession rate derived from dL/dt = τ, by hand:
 *   Disc spinning with angular momentum L = Iω along the horizontal axle,
 *   I = ½MR². Gravity pulls the centre of mass (at distance r from the
 *   pivot) with force Mg, giving a torque τ = Mgr that is HORIZONTAL and
 *   always ⊥ L. A perpendicular torque cannot change |L| — only its
 *   DIRECTION. In time dt the L vector tip moves L dφ; with |dL| = τ dt:
 *      L dφ = τ dt   →   Ω = dφ/dt = τ/L = Mgr / (Iω)
 *   Faster spin → SLOWER fall-from-horizontal precession. The sim
 *   integrates φ̇ = Ω every frame; when the spin is switched OFF the same
 *   pivot obeys the compound-pendulum law instead, integrated live:
 *      I_pivot φ̈ = Mgr sinφ,  I_pivot = I + Mr²   (the top just falls)
 *
 * Controls: spin rate ω, disc mass M, spin on/off (drop test), nutation,
 * precession path trace, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, Sparkles, Gauge, MoveVertical } from 'lucide-react';

const G = 9.8;

// ─────────────────────────────────────────────────────────────
// 3D pieces — all motion integrated in useFrame from the equations
// ─────────────────────────────────────────────────────────────

interface TopState {
  phi: number;      // precession angle about vertical
  tilt: number;     // axle tilt from horizontal (rad) — used when dropped
  tiltW: number;    // tilt rate when falling
  trace: [number, number, number][];
}

function GyroTop({ M, R, r, omega, spinning, nutation, pathRef }: {
  M: number; R: number; r: number; omega: number; spinning: boolean; nutation: boolean;
  pathRef: React.MutableRefObject<TopState>;
}) {
  const st = pathRef.current;
  const rootRef = useRef<THREE.Group>(null);   // precession about vertical (y)
  const axleRef = useRef<THREE.Group>(null);   // tilt about z + spin about axle (x)
  const discRef = useRef<THREE.Group>(null);
  const spinAng = useRef(0);
  const nutPhase = useRef(0);

  const I = 0.5 * M * R * R;            // disc moment of inertia
  const tau = M * G * r;                // gravity torque about pivot
  const Om = spinning && omega > 0.5 ? tau / (I * omega) : 0; // precession rate
  const Ipivot = I + M * r * r;         // compound pendulum about pivot

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.04);

    if (spinning && omega > 0.5) {
      st.phi += Om * dt;                       // integrate φ̇ = τ/L
      st.tilt += (0 - st.tilt) * Math.min(1, dt * 2); // ease back to horizontal
    } else {
      // spin switched off → compound pendulum fall: I_p θ̈ = Mgr sinθ
      st.tiltW += ((M * G * r) / Ipivot) * Math.sin(st.tilt + 0.02) * dt;
      st.tilt += st.tiltW * dt;
      if (st.tilt > Math.PI / 2 * 0.92) { st.tilt = Math.PI / 2 * 0.92; st.tiltW = 0; }
    }

    if (spinning) spinAng.current += omega * dt * 0.35; // visual spin (scaled down)
    if (nutation) nutPhase.current += dt * 3.2;

    const nut = nutation ? 0.1 * Math.sin(nutPhase.current) : 0;

    if (rootRef.current) rootRef.current.rotation.y = -st.phi;
    if (axleRef.current) axleRef.current.rotation.z = st.tilt + nut;
    if (discRef.current) discRef.current.rotation.x = spinAng.current;

    // trace the axle-tip path in the WORLD frame (precession circle)
    const tx = r * Math.cos(-st.phi), tz = r * Math.sin(-st.phi);
    const last = st.trace[st.trace.length - 1];
    if (!last || Math.hypot(last[0] - tx, last[2] - tz) > 0.06) {
      st.trace.push([tx, 0.02, tz]);
      if (st.trace.length > 260) st.trace.shift();
    }
  });

  return (
    <group>
      {/* pivot post */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.09, 0.12, 1.6, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -1.65, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.14, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.5} />
      </mesh>

      <group ref={rootRef}>
        <group ref={axleRef}>
          {/* axle from pivot outward along +x */}
          <mesh position={[r / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, r, 10]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* the spinning disc + rim marker (so the spin is visible) */}
          <group ref={discRef} position={[r, 0, 0]}>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[R, R, 0.09, 48]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.65} roughness={0.28} emissive="#92400e" emissiveIntensity={0.18} />
            </mesh>
            <mesh position={[0.08, R * 0.7, 0]}>
              <sphereGeometry args={[0.045, 10, 10]} />
              <meshStandardMaterial color="#f87171" emissive="#dc2626" emissiveIntensity={0.6} />
            </mesh>
          </group>
          {/* L vector along the axle (gold) */}
          <group position={[r, 0.45, 0]}>
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
              <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 0.82, 0]}>
              <coneGeometry args={[0.09, 0.22, 10]} />
              <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.5} />
            </mesh>
            <Text position={[0, 1.12, 0]} fontSize={0.26} color="#fbbf24">L = Iω</Text>
          </group>
          {/* τ vector (blue, horizontal, ⊥ L) */}
          <group position={[r, -0.45, 0]}>
            <mesh position={[0.35, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
              <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.82, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.09, 0.22, 10]} />
              <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.5} />
            </mesh>
            <Text position={[1.05, -0.3, 0]} fontSize={0.26} color="#60a5fa">τ = Mgr</Text>
          </group>
        </group>
      </group>
      {/* precession path traced by the axle tip — world frame, OUTSIDE the rotating group */}
      {st.trace.length > 2 && (
        <Line points={st.trace} color="rgba(251,191,36,0.4)" lineWidth={1.5} />
      )}
    </group>
  );
}

function SpinGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.08;
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C11_PhysicsGyroscopePrecessionSim() {
  const [omega, setOmega] = useState(40);          // rad/s spin about own axis
  const [massG, setMassG] = useState(300);         // disc mass, g
  const [spinning, setSpinning] = useState(true);
  const [nutation, setNutation] = useState(false);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const pathRef = useRef<TopState>({ phi: 0, tilt: 0, tiltW: 0, trace: [] });
  useEffect(() => { pathRef.current.trace = []; }, [massG, omega]);

  const M = massG / 1000;         // kg
  const R = 0.06;                 // disc radius m
  const r = 0.10;                 // pivot → centre distance m
  const I = 0.5 * M * R * R;
  const L = I * omega;
  const tau = M * G * r;
  const Om = spinning && omega > 0.5 ? tau / L : 0;
  const OmRps = Om / (2 * Math.PI);
  const Ipivot = I + M * r * r;
  const Tfall = 2 * Math.PI * Math.sqrt(Ipivot / (M * G * r)); // small-oscillation period when dropped

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'The direction of τ = r × Mg on the tilted axle is', opts: ['perpendicular to L — it turns L, never shrinks it', 'along L', 'vertically up'], correct: 0 },
    { q: 'If the wheel is spun FASTER, the precession rate Ω = Mgr/(Iω)', opts: ['decreases', 'increases', 'stays the same'], correct: 0 },
    { q: 'With the wheel NOT spinning, the gyroscope', opts: ['falls like a compound pendulum', 'precesses faster', 'stays horizontal'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [spinning]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => {
    setOmega(40); setMassG(300); setSpinning(true); setNutation(false); setSpin(false);
    pathRef.current = { phi: 0, tilt: 0, tiltW: 0, trace: [] };
    setQuiz(null);
  };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [6, 4, 9], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.0} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={60} fadeStrength={1.4} infiniteGrid position={[0, -1.7, 0]} />
          <SpinGroup spin={spin}>
            <GyroTop M={M} R={R} r={2.2} omega={omega} spinning={spinning} nutation={nutation} pathRef={pathRef} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={26} maxPolarAngle={Math.PI / 2.02} target={[0, 0.5, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[256px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Gyroscope — dL/dt = τ live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">spin ω</span><span className="text-white">{omega.toFixed(0)} rad/s ({(omega / (2 * Math.PI)).toFixed(1)} rev/s)</span></div>
            <div className="flex justify-between"><span className="text-surface-500">I = ½MR²</span><span className="text-white">{(I * 1000).toFixed(2)} ×10⁻³ kg·m²</span></div>
            <div className="flex justify-between"><span className="text-surface-500">L = Iω</span><span className="text-gold-300">{L.toFixed(3)} kg·m²/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">τ = Mgr</span><span className="text-white">{tau.toFixed(3)} N·m</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Ω = τ/L</span><span className="text-gold-300">{spinning ? `${Om.toFixed(2)} rad/s (${OmRps.toFixed(2)} rev/s)` : '— no spin'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">state</span><span className={spinning ? 'text-emerald-300' : 'text-rose-300'}>{spinning ? 'precessing' : 'falling (pendulum)'}</span></div>
            {spinning && <div className="flex justify-between"><span className="text-surface-500">if dropped: T pendulum</span><span className="text-surface-400">{Tfall.toFixed(2)} s</span></div>}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The gold L arrow sweeps the precession cone — τ (blue) always turns it, never shrinks it
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Gauge className="h-3.5 w-3.5 text-gold-400" /> ω:</span>
        <input type="range" min={5} max={80} step={1} value={omega} onChange={(e) => setOmega(Number(e.target.value))} className="h-11 w-36 accent-amber-400" />
        <span className="text-xs text-white">{omega} rad/s</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><MoveVertical className="h-3.5 w-3.5 text-gold-400" /> M:</span>
        <input type="range" min={100} max={800} step={10} value={massG} onChange={(e) => setMassG(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{massG} g</span>
        <button onClick={() => setSpinning(!spinning)} className={btn(spinning)}>{spinning ? 'spin ON' : 'spin OFF (drop!)'}</button>
        <button onClick={() => setNutation(!nutation)} className={btn(nutation)}>nutation wobble</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · TORQUE TURNS, NOT TIPS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Newton II for rotation: dL/dt = τ. Because the gravity torque is always
            ⊥ L, it can only rotate the L vector about the vertical — the magnitude
            Iω never changes. The axle therefore sweeps a cone instead of falling:
            precession is just circular motion OF the angular momentum vector.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · SPIN FAST, FALL SLOW</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Ω = Mgr/(Iω): precession is inversely proportional to spin. Crank ω up and
            the cone sweep slows down; cut ω toward zero and no L remains to steer —
            hit spin OFF and the same pivot obeys the compound pendulum
            I_pivotθ̈ = Mgr sinθ, integrated live in the sim. Same torque, no
            gyroscopy.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · ANGULAR MOMENTUM IS A VECTOR</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Everything here is vector bookkeeping: L points along the axle (right-hand
            rule), τ = r × F points along the horizontal, and the change ΔL = τΔt is
            horizontal too — so the tip of L traces a circle. Bicycles, spinning tops,
            helicopter rotors and smartphones&apos; gyro chips all live on this one law.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The spinning top resists gravity because of a special gyroscopic
            force.&quot; No — there is <span className="text-white">no new force</span>.
            Gravity provides exactly the torque it always would; the axle still drops in
            the sense that its centre of mass orbits lower would happen without spin.
            The apparent defiance is dL/dt = τ redirecting the fall sideways. Press
            spin OFF: gravity wins instantly, because angular momentum — not any force —
            was doing the steering.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Double ω from 20 → 40 rad/s and watch Ω halve — then double the mass
            (τ doubles) and watch Ω double back. Ω ∝ M/ω, and every digit comes from
            the HUD, not from memory.
            ② Switch spin OFF and time the drop against the pendulum period shown
            (I_pivot = I + Mr²): the axle swings at exactly that T — proof the same
            pivot mechanics underlies both behaviours.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick gyroscope questions — no marks, no shame.</p>
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
