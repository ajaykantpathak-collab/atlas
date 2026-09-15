'use client';

/**
 * C11_PhysicsWaveTypesSim.tsx — 3D
 * Class 11 Physics — Waves — Transverse vs Longitudinal + Polarisation
 * [3d-lab:c11-waves-translong]
 *
 * WHY 3D: the transverse/longitudinal distinction is about the DIRECTION
 * particle motion relative to propagation, and polarisation is flat-out
 * impossible to show honestly on a 2D diagram — displacement can rotate
 * anywhere in the plane ⊥ to travel.
 *
 * HONEST NUMERICS — wave speed derived from the phase, by hand:
 *   The wave is y(x,t) = A sin(kx − ωt). A crest is a point of constant
 *   phase: kx − ωt = π/2. Differentiate w.r.t. time:
 *      k (dx/dt) − ω = 0   →   v = dx/dt = ω/k
 *   With ω = 2πf and k = 2π/λ:  v = (2πf)/(2π/λ) = fλ.
 *   The gold marker in the sim rides exactly x = (π/2 + ωt)/k — the crest
 *   itself — so students see the WAVE move at fλ while every PARTICLE just
 *   oscillates in place with vmax = Aω (usually far slower or equal, but
 *   conceptually independent: the medium does not travel).
 *   Transverse: displacement ⊥ x. Longitudinal: ξ(x,t) = A sin(kx−ωt)
 *   ALONG x — compressions are where ∂ξ/∂x < 0 (particles crowded).
 *
 * Controls: mode (transverse/longitudinal), amplitude, wavelength,
 * frequency, polarisation axis (transverse only), crest marker, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Activity, Ruler, RotateCcw, Sparkles, MoveHorizontal } from 'lucide-react';

const N = 44;
const X0 = -6.5;
const DX = 13 / (N - 1);

type Mode = 'transverse' | 'longitudinal';
type Pol = 'y' | 'z' | 'diag';

function polDir(p: Pol): [number, number, number] {
  if (p === 'y') return [0, 1, 0];
  if (p === 'z') return [0, 0, 1];
  const s = Math.SQRT1_2;
  return [0, s, s];
}

// ─────────────────────────────────────────────────────────────
// Animated particle bed + crest rider
// ─────────────────────────────────────────────────────────────

function WaveBed({ mode, pol, A, lamCm, fHz, running, showCrest, showEnvelope }: {
  mode: Mode; pol: Pol; A: number; lamCm: number; fHz: number; running: boolean;
  showCrest: boolean; showEnvelope: boolean;
}) {
  const parts = useRef<(THREE.Mesh | null)[]>([]);
  const crestRef = useRef<THREE.Group>(null);
  const curveGeo = useRef<THREE.BufferGeometry>(null);
  const clock = useRef(0);

  // scene: 1 unit = 1 cm
  const lam = lamCm;                    // cm
  const k = (2 * Math.PI) / lam;        // rad/cm
  const om = 2 * Math.PI * fHz;         // rad/s
  const vWave = fHz * lamCm;            // cm/s — derived in header
  const dir = polDir(pol);

  useFrame((_, delta) => {
    if (running) clock.current += delta;
    const t = clock.current;

    for (let i = 0; i < N; i++) {
      const x0 = X0 + DX * i;
      const s = Math.sin(k * x0 - om * t);
      const m = parts.current[i];
      if (!m) continue;
      if (mode === 'transverse') {
        m.position.set(x0, dir[1] * A * s, dir[2] * A * s);
      } else {
        // longitudinal: displacement ALONG x; watch the crowding
        m.position.set(x0 + A * s, 0, 0);
      }
      // colour pulse marks compressions in longitudinal mode
      if (mode === 'longitudinal') {
        const mat = m.material as THREE.MeshStandardMaterial;
        const squeeze = Math.max(0, -Math.cos(k * x0 - om * t) * A * k); // −∂ξ/∂x > 0 → compression
        mat.emissiveIntensity = 0.25 + squeeze * 1.4;
      }
    }

    // crest marker: rides the constant-phase point x = (π/2 + ωt)/k, wrapped
    // into the visible window [X0, X0+13)
    if (crestRef.current) {
      const xc = (Math.PI / 2 + om * t) / k;
      const wrapped = X0 + ((((xc - X0) % 13) + 13) % 13);
      crestRef.current.position.x = wrapped;
      crestRef.current.visible = showCrest;
    }

    // update the transverse curve polyline
    if (curveGeo.current) {
      const pos = curveGeo.current.getAttribute('position') as THREE.BufferAttribute;
      if (mode === 'transverse') {
        for (let i = 0; i < N; i++) {
          const x0 = X0 + DX * i;
          const s = Math.sin(k * x0 - om * t);
          pos.setXYZ(i, x0, dir[1] * A * s, dir[2] * A * s);
        }
      } else {
        for (let i = 0; i < N; i++) pos.setXYZ(i, X0 + DX * i, 0, 0);
      }
      pos.needsUpdate = true;
    }
  });

  const envPts: [number, number, number][] = [];
  for (let i = 0; i <= 100; i++) {
    const x = X0 + (13 * i) / 100;
    envPts.push([x, A, 0]);
    envPts.push([x, -A, 0]);
  }

  return (
    <group>
      {/* equilibrium axis */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 14, 8]} />
        <meshBasicMaterial color="rgba(255,255,255,0.25)" transparent opacity={0.4} />
      </mesh>
      {/* transverse connecting curve */}
      <line>
        <bufferGeometry ref={curveGeo}>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(N * 3), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="rgba(251,191,36,0.75)" linewidth={1.5} transparent opacity={0.8} />
      </line>
      {/* amplitude envelope (transverse) */}
      {showEnvelope && mode === 'transverse' && (
        <line>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(envPts.flat()), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="rgba(148,163,184,0.3)" transparent opacity={0.5} />
        </line>
      )}
      {/* particles */}
      {Array.from({ length: N }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { parts.current[i] = el; }}
          position={[X0 + DX * i, 0, 0]}
        >
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={mode === 'longitudinal' ? '#60a5fa' : '#f87171'} emissive={mode === 'longitudinal' ? '#1d4ed8' : '#dc2626'} emissiveIntensity={0.3} metalness={0.35} roughness={0.4} />
        </mesh>
      ))}
      {/* crest rider */}
      <group ref={crestRef} position={[X0, 0, 0]}>
        <mesh position={[0, 0.55, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.14, 0.35, 10]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
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

export default function C11_PhysicsWaveTypesSim() {
  const [mode, setMode] = useState<Mode>('transverse');
  const [pol, setPol] = useState<Pol>('y');
  const [A, setA] = useState(1.2);
  const [lamCm, setLamCm] = useState(6);
  const [fHz, setFHz] = useState(1);
  const [running, setRunning] = useState(true);
  const [showCrest, setShowCrest] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const vWave = fHz * lamCm;      // cm/s
  const T = 1 / fHz;
  const om = 2 * Math.PI * fHz;
  const k = (2 * Math.PI) / lamCm;
  const vParticleMax = A * om;    // cm/s — particles, not the wave

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'In a longitudinal wave, particles oscillate', opts: ['along the direction of propagation', 'perpendicular to propagation', 'in circles'], correct: 0 },
    { q: 'Which waves can be polarised?', opts: ['Only transverse', 'Only longitudinal', 'Both equally'], correct: 0 },
    { q: 'A wave moves at v = fλ. The PARTICLES of the medium', opts: ['oscillate about fixed positions', 'travel with the wave at fλ', 'move at double the speed'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [mode]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => {
    setMode('transverse'); setPol('y'); setA(1.2); setLamCm(6); setFHz(1);
    setRunning(true); setShowCrest(true); setShowEnvelope(true); setSpin(false); setQuiz(null);
  };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [0, 5, 12], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.0} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[50, 50]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid />
          <SpinGroup spin={spin}>
            <WaveBed mode={mode} pol={pol} A={A} lamCm={lamCm} fHz={fHz} running={running} showCrest={showCrest} showEnvelope={showEnvelope} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[252px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">{mode === 'transverse' ? 'Transverse' : 'Longitudinal'} wave — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">amplitude A</span><span className="text-white">{A.toFixed(2)} cm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">wavelength λ</span><span className="text-white">{lamCm.toFixed(1)} cm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">frequency f</span><span className="text-white">{fHz.toFixed(1)} Hz</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v = fλ (wave)</span><span className="text-gold-300">{vWave.toFixed(1)} cm/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v_max = Aω (particle)</span><span className="text-white">{vParticleMax.toFixed(1)} cm/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">period T</span><span className="text-white">{T.toFixed(2)} s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">polarisation</span><span className={mode === 'transverse' ? 'text-gold-300' : 'text-rose-300 line-through'}>{mode === 'transverse' ? (pol === 'y' ? 'vertical (ŷ)' : pol === 'z' ? 'horizontal (ẑ)' : 'diagonal 45°') : 'impossible for longitudinal'}</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Gold cone rides the CREST at v = fλ · particles just oscillate in place
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Activity className="h-3.5 w-3.5 text-gold-400" /> mode:</span>
        <button onClick={() => setMode('transverse')} className={btn(mode === 'transverse')}>transverse</button>
        <button onClick={() => setMode('longitudinal')} className={btn(mode === 'longitudinal')}>longitudinal</button>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> A:</span>
        <input type="range" min={0.3} max={2.4} step={0.05} value={A} onChange={(e) => setA(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">λ:</span>
        <input type="range" min={2.5} max={12} step={0.5} value={lamCm} onChange={(e) => setLamCm(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">f:</span>
        <input type="range" min={0.3} max={3} step={0.1} value={fHz} onChange={(e) => setFHz(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        {mode === 'transverse' && (
          <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><MoveHorizontal className="h-3.5 w-3.5 text-gold-400" /> pol:</span>
        )}
        {mode === 'transverse' && (['y', 'z', 'diag'] as Pol[]).map((p) => (
          <button key={p} onClick={() => setPol(p)} className={btn(pol === p)}>{p === 'y' ? 'ŷ' : p === 'z' ? 'ẑ' : '45°'}</button>
        ))}
        <button onClick={() => setShowCrest(!showCrest)} className={btn(showCrest)}>crest marker</button>
        <button onClick={() => setShowEnvelope(!showEnvelope)} className={btn(showEnvelope)}>envelope</button>
        <button onClick={() => setRunning(!running)} className={btn(running)}>{running ? 'pause' : 'play'}</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · THE WAVE MOVES, THE MEDIUM DOESN&apos;T</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Every particle here oscillates about a FIXED spot (v_max = Aω); nothing
            travels except the pattern. The gold cone rides a crest at v = ω/k = fλ —
            derived from keeping kx − ωt constant. Sound, water, light: same law,
            v = fλ, for all of them.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · LONGITUDINAL = DENSITY WAVES</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Switch modes: particles now slide ALONG x, bunching where −∂ξ/∂x &gt; 0
            (compressions, glowing bright) and spreading where it is negative
            (rarefactions). Sound in air is exactly this — which is why sound cannot
            be polarised: there is no transverse direction to filter.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · POLARISATION = TRANSVERSE PROOF</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Rotate the displacement among ŷ, ẑ, or 45° — the wave is unchanged to a
            detector watching along x. That freedom exists ONLY because displacement
            lives in the 2D plane ⊥ travel. A slit aligned to ŷ passes an ŷ-wave but
            blocks a ẑ-wave: polaroids, sunglasses, and the proof light is transverse.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Waves carry the medium along — water from a storm crosses the ocean.&quot;
            No — the duck on a ripple bobs <span className="text-white">up and down in
            place</span>; only the pattern advances. Watch one particle here through a
            full cycle: net displacement zero. And v_max = Aω belongs to PARTICLES;
            the wave&apos;s fλ is a different quantity entirely — change λ and the wave
            speed changes while particle speed need not.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① In longitudinal mode, pause and compare particle spacing at a glow
            (compression) vs a dim (rarefaction) — then set f = 3 Hz and watch
            compressions crowd closer as λ shrinks (λ = v/f at fixed v).
            ② Transverse 45° polarisation is the sum of ŷ and ẑ — switch between the
            three and confirm the amplitude never changes: only the PLANE of vibration
            rotates. That plane rotation is all polarisation ever is.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick wave questions — no marks, no shame.</p>
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
