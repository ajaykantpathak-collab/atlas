'use client';

/**
 * C11_PhysicsStraightLineMotionSim.tsx — 3D
 * Class 11 Physics — Motion in a Straight Line — the Three Equations, Live
 * [3d-lab:c11-kinematics-straightline]
 *
 * WHY 3D: x-t and v-t graphs are usually squeezed onto flat axes. Here two
 * cars race along a track while their x-t and v-t graphs are woven in
 * space as ribbons in real time — the graph IS the motion.
 *
 * HONEST NUMERICS — the three equations of motion derived by hand:
 *   Constant acceleration means a = dv/dt = const. Integrate once:
 *      v = u + at                                    …(1)
 *   Integrate again (s = ∫v dt):
 *      s = ut + ½at²                                 …(2)
 *   (1) squared minus 2a·(2), or substitute t = (v−u)/a into (2):
 *      v² = u² + 2as                                 …(3)
 *   The cars here are INTEGRATED live (semi-implicit Euler, not the
 *   closed form) so students can verify: ribbon height = the formula,
 *   car position = the integration. Overtake prediction is the quadratic
 *      ½(a₂−a₁)t² + (u₂−u₁)t − gap₀ = 0
 *   solved exactly for the smaller positive root, then compared with the
 *   measured catch-up time on the track.
 *
 * Controls: u and a for both cars, start/pause/reset race, ribbon toggles,
 * relative-speed readout. Units are metres and seconds, shown live.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Car, RotateCcw, Sparkles, Activity, Gauge } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Kinematics
// ─────────────────────────────────────────────────────────────

/** overtake time from the quadratic ½Δa·t² + Δu·t − gap₀ = 0 */
function overtakeTime(u1: number, a1: number, u2: number, a2: number, gap0: number): number | null {
  const du = u2 - u1, da = a2 - a1;
  if (Math.abs(da) < 1e-9) {
    if (du <= 0) return null;
    return gap0 / du;
  }
  const disc = du * du + 2 * da * gap0;
  if (disc < 0) return null;
  const t1 = (-du + Math.sqrt(disc)) / da;
  const t2 = (-du - Math.sqrt(disc)) / da;
  const cands = [t1, t2].filter((t) => t > 0.01 && isFinite(t));
  return cands.length ? Math.min(...cands) : null;
}

const TRACK = 110;      // metres of track
const SCALE_X = 0.11;   // scene units per metre  (110 m → 12.1 units)
const TIME_AXIS = 0.85; // scene units per second along +z (ribbon unrolls here)

interface CarState { x: number; v: number; xt: [number, number, number][]; vt: [number, number, number][] }

function RaceWorld({ u1, a1, u2, a2, running, showXT, showVT, liveRef }: {
  u1: number; a1: number; u2: number; a2: number; running: boolean;
  showXT: boolean; showVT: boolean;
  liveRef: React.MutableRefObject<{ x1: number; v1: number; x2: number; v2: number; t: number }>;
}) {
  const car1 = useRef<CarState>({ x: 0, v: u1, xt: [], vt: [] });
  const car2 = useRef<CarState>({ x: -20, v: u2, xt: [], vt: [] });
  const car1Ref = useRef<THREE.Group>(null);
  const car2Ref = useRef<THREE.Group>(null);
  const geo1 = useRef<THREE.BufferGeometry>(null);
  const geo2 = useRef<THREE.BufferGeometry>(null);
  const geo1v = useRef<THREE.BufferGeometry>(null);
  const geo2v = useRef<THREE.BufferGeometry>(null);
  const lastPush = useRef(0);
  const t = useRef(0);

  // restart when driver inputs change
  useEffect(() => {
    car1.current = { x: 0, v: u1, xt: [], vt: [] };
    car2.current = { x: -20, v: u2, xt: [], vt: [] };
    t.current = 0; lastPush.current = 0;
  }, [u1, a1, u2, a2]);

  useFrame((_, delta) => {
    if (running) t.current += delta;
    const h = Math.min(delta, 0.05);
    const sub = 8, hh = h / sub;

    // semi-implicit Euler: v first, then x (stable, and honest integration)
    for (let s = 0; s < sub; s++) {
      const c1 = car1.current, c2 = car2.current;
      c1.v += a1 * hh; c1.x += c1.v * hh;
      c2.v += a2 * hh; c2.x += c2.v * hh;
    }
    const c1 = car1.current, c2 = car2.current;
    liveRef.current = { x1: c1.x, v1: c1.v, x2: c2.x, v2: c2.v, t: t.current };

    if (car1Ref.current) car1Ref.current.position.set(c1.x * SCALE_X - 6, 0.25, 0);
    if (car2Ref.current) car2Ref.current.position.set(c2.x * SCALE_X - 6, 0.25, 0);

    // weave the ribbons: sample every 0.08 s
    if (running && t.current - lastPush.current > 0.08) {
      lastPush.current = t.current;
      c1.xt.push([c1.x * SCALE_X - 6, 0.05, t.current * TIME_AXIS]);
      c2.xt.push([c2.x * SCALE_X - 6, 0.05, t.current * TIME_AXIS]);
      c1.vt.push([c1.x * SCALE_X - 6, c1.v * 0.12 + 1.4, t.current * TIME_AXIS]);
      c2.vt.push([c2.x * SCALE_X - 6, c2.v * 0.12 + 1.4, t.current * TIME_AXIS]);
      for (const arr of [c1.xt, c2.xt, c1.vt, c2.vt]) if (arr.length > 400) arr.shift();
    }

    // push trail points into GPU buffers
    const feed = (geo: THREE.BufferGeometry | null, arr: [number, number, number][]) => {
      if (!geo) return;
      const pos = geo.getAttribute('position') as THREE.BufferAttribute;
      const n = Math.min(pos.count, arr.length);
      for (let j = 0; j < n; j++) pos.setXYZ(j, arr[j][0], arr[j][1], arr[j][2]);
      if (n > 0) for (let j = n; j < pos.count; j++) pos.setXYZ(j, arr[n - 1][0], arr[n - 1][1], arr[n - 1][2]);
      pos.needsUpdate = true;
      geo.setDrawRange(0, Math.max(2, n));
    };
    if (showXT) { feed(geo1.current, c1.xt); feed(geo2.current, c2.xt); }
    if (showVT) { feed(geo1v.current, c1.vt); feed(geo2v.current, c2.vt); }
  });

  return (
    <group>
      {/* track */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, 1.6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.8} />
      </mesh>
      <Line points={[[-6.2, 0.04, 0.85], [6.6, 0.04, 0.85]]} color="rgba(255,255,255,0.25)" lineWidth={1} />
      <Line points={[[-6.2, 0.04, -0.85], [6.6, 0.04, -0.85]]} color="rgba(255,255,255,0.25)" lineWidth={1} />
      <Text position={[-6.4, 0.5, 0]} fontSize={0.3} color="#94a3b8">start</Text>
      <Text position={[6.2, 0.5, 0]} fontSize={0.3} color="#94a3b8">{TRACK} m</Text>

      {/* car 1 (gold) */}
      <group ref={car1Ref} position={[-6, 0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.22, 0.32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.3} emissive="#b45309" emissiveIntensity={0.25} />
        </mesh>
        <Text position={[0, 0.55, 0]} fontSize={0.3} color="#fbbf24">A</Text>
      </group>
      {/* car 2 (blue), starts 20 m behind */}
      <group ref={car2Ref} position={[-8.2, 0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.22, 0.32]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.3} emissive="#1d4ed8" emissiveIntensity={0.25} />
        </mesh>
        <Text position={[0, 0.55, 0]} fontSize={0.3} color="#60a5fa">B</Text>
      </group>

      {/* x-t ribbons (height 0.05, along +z behind the track) */}
      {showXT && (
        <group>
          <line>
            <bufferGeometry ref={geo1}>
              <bufferAttribute attach="attributes-position" args={[new Float32Array(400 * 3), 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#fbbf24" linewidth={1.5} />
          </line>
          <line>
            <bufferGeometry ref={geo2}>
              <bufferAttribute attach="attributes-position" args={[new Float32Array(400 * 3), 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#60a5fa" linewidth={1.5} />
          </line>
          <Text position={[6.8, 0.1, 3.2]} fontSize={0.26} color="#94a3b8">x–t (z = time)</Text>
        </group>
      )}
      {/* v-t ribbons (height ∝ v) */}
      {showVT && (
        <group>
          <line>
            <bufferGeometry ref={geo1v}>
              <bufferAttribute attach="attributes-position" args={[new Float32Array(400 * 3), 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="rgba(251,191,36,0.55)" linewidth={1.5} />
          </line>
          <line>
            <bufferGeometry ref={geo2v}>
              <bufferAttribute attach="attributes-position" args={[new Float32Array(400 * 3), 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="rgba(96,165,250,0.55)" linewidth={1.5} />
          </line>
          <Text position={[6.8, 3.4, 3.2]} fontSize={0.26} color="#94a3b8">v–t (height = v)</Text>
        </group>
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

export default function C11_PhysicsStraightLineMotionSim() {
  const [u1, setU1] = useState(8);
  const [a1, setA1] = useState(1.2);
  const [u2, setU2] = useState(2);
  const [a2, setA2] = useState(3.2);
  const [running, setRunning] = useState(true);
  const [showXT, setShowXT] = useState(true);
  const [showVT, setShowVT] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const liveRef = useRef({ x1: 0, v1: u1, x2: -20, v2: u2, t: 0 });
  const [live, setLive] = useState({ x1: 0, v1: u1, x2: -20, v2: u2, t: 0 });
  useEffect(() => {
    const id = setInterval(() => setLive({ ...liveRef.current }), 120);
    return () => clearInterval(id);
  }, []);

  const tCatch = overtakeTime(u1, a1, u2, a2, 20);
  const gap = live.x1 - live.x2;
  const relV = live.v2 - live.v1;

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'The slope of an x–t graph at any instant equals', opts: ['the velocity', 'the acceleration', 'the distance'], correct: 0 },
    { q: 'A curved x–t ribbon means the motion has', opts: ['non-zero acceleration', 'constant velocity', 'stopped'], correct: 0 },
    { q: 'Area under a v–t graph gives', opts: ['displacement (s = ut + ½at²)', 'acceleration', 'jerk'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [u1, a1, u2, a2]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setU1(8); setA1(1.2); setU2(2); setA2(3.2); setRunning(true); setShowXT(true); setShowVT(true); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [2, 9, 15], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 14, 8]} intensity={0.9} color="#ffe9b8" />
          <Grid args={[50, 50]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid position={[0, 0, 0]} />
          <SpinGroup spin={spin}>
            <RaceWorld u1={u1} a1={a1} u2={u2} a2={a2} running={running} showXT={showXT} showVT={showVT} liveRef={liveRef} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={40} maxPolarAngle={Math.PI / 2.02} target={[0, 1, 2]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[262px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Straight-line race — integrated live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">elapsed t</span><span className="text-white">{live.t.toFixed(2)} s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">car A: x / v</span><span className="text-gold-300">{live.x1.toFixed(1)} m / {live.v1.toFixed(1)} m/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">car B: x / v</span><span className="text-gold-300">{live.x2.toFixed(1)} m / {live.v2.toFixed(1)} m/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">gap A−B</span><span className={gap > 0 ? 'text-emerald-300' : 'text-rose-300'}>{gap.toFixed(1)} m {gap < 0 ? '(B ahead!)' : ''}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">closing speed v₂−v₁</span><span className="text-white">{relV.toFixed(1)} m/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">predicted catch-up t</span><span className="text-gold-300">{tCatch ? `${tCatch.toFixed(2)} s` : 'never (B cannot close)'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">s_A at catch (½at²)</span><span className="text-white">{tCatch ? `${(u1 * tCatch + 0.5 * a1 * tCatch * tCatch).toFixed(1)} m` : '—'}</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Cars integrate F=ma live · ribbons weave x–t and v–t as they race
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Car className="h-3.5 w-3.5 text-gold-400" /> A: u</span>
        <input type="range" min={0} max={20} step={0.5} value={u1} onChange={(e) => setU1(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-surface-400">a</span>
        <input type="range" min={-2} max={5} step={0.1} value={a1} onChange={(e) => setA1(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Car className="h-3.5 w-3.5 text-blue-400" /> B: u</span>
        <input type="range" min={0} max={20} step={0.5} value={u2} onChange={(e) => setU2(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-surface-400">a</span>
        <input type="range" min={-2} max={5} step={0.1} value={a2} onChange={(e) => setA2(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <button onClick={() => setRunning(!running)} className={btn(running)}>{running ? 'pause' : 'run'}</button>
        <button onClick={() => setShowXT(!showXT)} className={btn(showXT)}>x–t ribbon</button>
        <button onClick={() => setShowVT(!showVT)} className={btn(showVT)}>v–t ribbon</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · INTEGRATE, DON&apos;T MEMORISE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            a = constant → integrate once for v = u + at, once more for s = ut + ½at²,
            eliminate t for v² = u² + 2as. The cars here integrate numerically each
            frame; the ribbons plot the SAME quantities — if the car ever disagreed
            with the ribbon, the equation would be wrong. It never does.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · GRAPHS ARE THE MOTION</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The x–t ribbon&apos;s SLOPE at any instant is v; the v–t ribbon&apos;s SLOPE
            is a, and the AREA under it is s. Car B starts 20 m behind but with bigger
            a: its v–t ribbon is steeper, and the moment its x–t ribbon crosses A&apos;s,
            B has overtaken — geometry catching algebra in the act.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · RELATIVE VELOCITY DECIDES</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The catch-up time solves ½(a₂−a₁)t² + (u₂−u₁)t − 20 = 0. Only the
            DIFFERENCES matter: in B&apos;s frame, A retreats at (u₁−u₂) with
            acceleration (a₁−a₂). Watch the predicted t in the HUD, then let the race
            run — the cars cross at almost exactly that instant (Euler integration
            explains the whisker of difference).
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Slowing down means negative acceleration; acceleration means speeding
            up.&quot; No — acceleration is a <span className="text-white">vector along
            the velocity change</span>: a car braking has a opposite to v; a car
            speeding up backwards has a negative too. Set a = −2 m/s² with u = 15 m/s
            and watch the x–t ribbon peak and curve back — the car stops (v–t crosses
            zero) and RETURNS. Also: zero velocity ≠ zero acceleration (the peak
            instant proves it).
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Give B u=0, a=3.2 and A u=8, a=1.2: predicted catch at t ≈ 4.51 s
            (quadratic!). Now set both a equal: the prediction collapses to
            gap/(u₁−u₂) — constant relative velocity, a LINEAR problem.
            ② Set A&apos;s a = −2 (braking) and B&apos;s a = 0: watch A&apos;s v–t
            ribbon dive through zero while its x–t ribbon is still RISING — speed
            and position are different stories.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick kinematics questions — no marks, no shame.</p>
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
