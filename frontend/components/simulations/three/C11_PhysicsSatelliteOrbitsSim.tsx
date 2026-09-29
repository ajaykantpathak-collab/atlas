'use client';

/**
 * C11_PhysicsSatelliteOrbitsSim.tsx — 3D
 * Class 11 Physics — Gravitation — Satellite Orbits & Escape Velocity
 * [3d-lab:c11-grav-satellites]
 *
 * WHY 3D: orbital mechanics is geometry in space — LEO hugs the planet,
 * GEO floats 6.6 Earth-radii out, and an escape trajectory swings off on a
 * hyperbola. Radii to scale + live integration make the numbers physical.
 *
 * HONEST NUMERICS — circular speed and escape speed, derived by hand:
 *   Circular orbit: gravity IS the centripetal force,
 *      GMm/r² = mv²/r   →   v_c = √(GM/r)
 *   Escape: launch fast enough that total energy never traps you. At
 *   infinity E → 0, so the minimum launch satisfies
 *      ½v_e² − GM/r = 0   →   v_e = √(2GM/r) = √2 · v_c
 *   Period from Kepler III: T = 2π√(r³/GM).
 *   For Earth (GM = 3.986×10¹⁴ m³/s², R = 6371 km): LEO at 400 km altitude
 *   → v_c ≈ 7.67 km/s, T ≈ 92.4 min; GEO at 35786 km → T = 23.93 h
 *   (definition of geostationary!). v_e from LEO ≈ 10.9 km/s; from the
 *   SURFACE 11.2 km/s.
 *   The gold probe is INTEGRATED live (leapfrog, fixed substeps) in the
 *   scene field a = −GM_s r̂/r² with GM_s matched to the scale, launched
 *   at k·v_c: k < 1 dips to a crash ellipse, k = 1 rides the circle,
 *   √2 < k escapes on a hyperbola — the classification in the HUD comes
 *   from the sign of the specific energy ε = v²/2 − GM_s/r.
 *
 * Controls: orbit altitude, launch factor k (×v_circular), fire/hold,
 * trail, LEO/GEO presets, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Orbit, RotateCcw, Sparkles, Rocket, Gauge } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Real physics (SI) + scene scaling
// ─────────────────────────────────────────────────────────────

const GM_EARTH = 3.986004418e14;  // m³/s²
const R_EARTH = 6.371e6;          // m
const R_E_SCENE = 1.5;            // scene units per Earth radius
const GM_SCENE = 14;              // scene GM (tuned for pleasant motion at this scale)

const rSceneOf = (rMeters: number) => (rMeters / R_EARTH) * R_E_SCENE;

function vcirc(rMeters: number): number { return Math.sqrt(GM_EARTH / rMeters); }
function vescape(rMeters: number): number { return Math.sqrt(2 * GM_EARTH / rMeters); }
function periodS(rMeters: number): number { return 2 * Math.PI * Math.sqrt(Math.pow(rMeters, 3) / GM_EARTH); }

interface ProbeState { x: number; z: number; vx: number; vz: number; trail: [number, number, number][] }

function EarthProbe({ rMeters, kLaunch, flying, trailOn, liveRef }: {
  rMeters: number; kLaunch: number; flying: boolean; trailOn: boolean;
  liveRef: React.MutableRefObject<{ r: number; v: number; eps: number }>;
}) {
  const probeRef = useRef<THREE.Mesh>(null);
  const st = useRef<ProbeState>({ x: 0, z: 0, vx: 0, vz: 0, trail: [] });
  const rScene = rSceneOf(rMeters);

  // (re)launch whenever parameters change: start at (r,0) heading "up" (+z)
  useEffect(() => {
    const vc = Math.sqrt(GM_SCENE / rScene);
    st.current = { x: rScene, z: 0, vx: 0, vz: vc * kLaunch, trail: [] };
  }, [rMeters, kLaunch]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((_, delta) => {
    if (flying) {
      const h = Math.min(delta, 0.033) / 16; // 16 leapfrog substeps per frame
      const s = st.current;
      for (let i = 0; i < 16; i++) {
        const r2 = s.x * s.x + s.z * s.z;
        const r = Math.sqrt(r2);
        const acc = -GM_SCENE / (r2 * r);
        s.vx += acc * s.x * h;
        s.vz += acc * s.z * h;
        s.x += s.vx * h;
        s.z += s.vz * h;
      }
      const r = Math.sqrt(s.x * s.x + s.z * s.z);
      const v = Math.hypot(s.vx, s.vz);
      liveRef.current = { r: (r / R_E_SCENE) * R_EARTH, v: v * (vcirc(rMeters) / Math.sqrt(GM_SCENE / rScene)), eps: v * v / 2 - GM_SCENE / r };
      if (probeRef.current) probeRef.current.position.set(s.x, 0, s.z);
      const last = s.trail[s.trail.length - 1];
      if (!last || Math.hypot(last[0] - s.x, last[2] - s.z) > 0.09) {
        s.trail.push([s.x, 0.02, s.z]);
        if (s.trail.length > 700) s.trail.shift();
      }
      // crash: if the probe dips inside the planet, relaunch after a beat
      if (r < R_E_SCENE * 0.98) {
        const vc = Math.sqrt(GM_SCENE / rScene);
        st.current = { x: rScene, z: 0, vx: 0, vz: vc * kLaunch, trail: [] };
      }
    }
  });

  const trail = st.current.trail;
  const circPts: [number, number, number][] = [];
  for (let i = 0; i <= 128; i++) {
    const a = (i / 128) * Math.PI * 2;
    circPts.push([rScene * Math.cos(a), 0.01, rScene * Math.sin(a)]);
  }

  return (
    <group>
      {/* reference circle for the chosen circular orbit */}
      <Line points={circPts} color="rgba(148,163,184,0.35)" lineWidth={1} dashed dashSize={0.2} gapSize={0.15} />
      {/* live integrated trail */}
      {trailOn && trail.length > 2 && (
        <Line points={trail} color="rgba(251,191,36,0.85)" lineWidth={2} />
      )}
      {/* the probe */}
      <mesh ref={probeRef} position={[rScene, 0, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function SteadySatellites({ rMeters }: { rMeters: number }) {
  const grp = useRef<THREE.Group>(null);
  const rScene = rSceneOf(rMeters);
  // honest angular speed in scene time: ω ∝ √(GM/r³)
  const omega = Math.sqrt(GM_SCENE / Math.pow(rScene, 3));
  useFrame((_, delta) => {
    if (grp.current) grp.current.rotation.y += delta * omega * 1.4;
  });
  return (
    <group ref={grp}>
      <mesh position={[rScene, 0.3, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.7} />
      </mesh>
      <Text position={[rScene, 0.75, 0]} fontSize={0.26} color="#60a5fa">circular sat</Text>
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

export default function C11_PhysicsSatelliteOrbitsSim() {
  const [altKm, setAltKm] = useState(400);      // altitude above surface
  const [kLaunch, setKLaunch] = useState(1);    // launch speed = k × v_circular
  const [flying, setFlying] = useState(true);
  const [trailOn, setTrailOn] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const liveRef = useRef({ r: 0, v: 0, eps: 0 });
  const [live, setLive] = useState({ r: 0, v: 0, eps: 0 });
  useEffect(() => {
    const id = setInterval(() => setLive({ ...liveRef.current }), 130);
    return () => clearInterval(id);
  }, []);

  const r = R_EARTH + altKm * 1e3;
  const vc = vcirc(r);          // m/s
  const ve = vescape(r);
  const T = periodS(r);
  const kNeeded = Math.SQRT2;
  const bound = live.eps < 0;
  const cls = !flying ? 'held on pad'
    : Math.abs(kLaunch - 1) < 0.02 ? 'circular orbit (bound)'
    : kLaunch < 1 ? 'sub-circular ellipse → dips to crash (bound)'
    : kLaunch < kNeeded ? 'stretched ellipse (bound)'
    : 'ESCAPE — hyperbola (unbound)';

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'Escape speed relates to circular speed at the same radius as', opts: ['v_e = √2 · v_c', 'v_e = v_c', 'v_e = 2·v_c'], correct: 0 },
    { q: 'A GEO satellite has a period of', opts: ['24 h (matching Earth\'s spin)', '90 min', '1 year'], correct: 0 },
    { q: 'As orbital radius increases, the orbital speed', opts: ['decreases (v ∝ 1/√r)', 'increases', 'stays constant'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [altKm]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setAltKm(400); setKLaunch(1); setFlying(true); setTrailOn(true); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  const Tlabel = T > 3600 ? `${(T / 3600).toFixed(2)} h` : `${(T / 60).toFixed(1)} min`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [7, 6, 13], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.05} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.4} color="#7dd3fc" />
          <Grid args={[60, 60]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.18)"
            fadeDistance={80} fadeStrength={1.4} infiniteGrid position={[0, -2, 0]} />
          <SpinGroup spin={spin}>
            {/* Earth (radius = 1.5 scene units = 6371 km — everything to scale) */}
            <mesh>
              <sphereGeometry args={[R_E_SCENE, 48, 48]} />
              <meshStandardMaterial color="#2563eb" metalness={0.25} roughness={0.65} emissive="#1e3a8a" emissiveIntensity={0.25} />
            </mesh>
            <Text position={[0, -2, 0]} fontSize={0.3} color="#93c5fd">Earth (1 unit ≈ 4247 km)</Text>
            <SteadySatellites rMeters={r} />
            <EarthProbe rMeters={r} kLaunch={kLaunch} flying={flying} trailOn={trailOn} liveRef={liveRef} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={40} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[266px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Satellite lab — real SI + live integration</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">altitude h</span><span className="text-white">{altKm} km ({(r / R_EARTH).toFixed(2)} R⊕)</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v_circ = √(GM/r)</span><span className="text-gold-300">{(vc / 1000).toFixed(2)} km/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v_escape = √2·v_c</span><span className="text-gold-300">{(ve / 1000).toFixed(2)} km/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">period T</span><span className="text-white">{Tlabel}</span></div>
            <div className="mt-1.5 border-t border-white/10 pt-1.5 text-[10px] uppercase tracking-wider text-surface-500">gold probe (integrated)</div>
            <div className="flex justify-between"><span className="text-surface-500">launch factor k</span><span className="text-white">{kLaunch.toFixed(2)} × v_circ ({(kLaunch * vc / 1000).toFixed(2)} km/s)</span></div>
            <div className="flex justify-between"><span className="text-surface-500">current r</span><span className="text-white">{(live.r / 1000).toFixed(0)} km</span></div>
            <div className="flex justify-between"><span className="text-surface-500">specific energy ε</span><span className={bound ? 'text-gold-300' : 'text-rose-300'}>{live.eps.toFixed(2)} (scene) {bound ? '· bound' : '· unbound'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">verdict</span><span className="text-gold-300">{cls}</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Set k = 1.42 and watch the probe leave on a hyperbola — it never comes back
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Orbit className="h-3.5 w-3.5 text-gold-400" /> altitude:</span>
        <input type="range" min={200} max={36000} step={100} value={altKm} onChange={(e) => setAltKm(Number(e.target.value))} className="h-11 w-44 accent-amber-400" />
        <span className="text-xs text-white">{altKm} km</span>
        <button onClick={() => setAltKm(400)} className={btn(altKm === 400)}>LEO</button>
        <button onClick={() => setAltKm(35786)} className={btn(altKm === 35786)}>GEO</button>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Rocket className="h-3.5 w-3.5 text-gold-400" /> k:</span>
        <input type="range" min={0.4} max={1.8} step={0.02} value={kLaunch} onChange={(e) => setKLaunch(Number(e.target.value))} className="h-11 w-36 accent-amber-400" />
        <span className="text-xs text-white">{kLaunch.toFixed(2)}×</span>
        <button onClick={() => setKLaunch(1)} className={btn(Math.abs(kLaunch - 1) < 0.001)}>k=1</button>
        <button onClick={() => setKLaunch(Math.SQRT2)} className={btn(Math.abs(kLaunch - Math.SQRT2) < 0.001)}>k=√2</button>
        <button onClick={() => setFlying(!flying)} className={btn(flying)}>{flying ? 'hold' : 'fly'}</button>
        <button onClick={() => setTrailOn(!trailOn)} className={btn(trailOn)}>trail</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · FALLING AROUND THE EARTH</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            A satellite is in free fall — gravity is the centripetal force, nothing
            balances it. Setting GMm/r² = mv²/r gives v_c = √(GM/r) ≈ 7.7 km/s in LEO.
            Newton&apos;s cannon: fire fast enough and the ground curves away as fast as
            you fall. Watch the blue circular satellite whip in LEO while GEO crawls —
            v drops as 1/√r.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · ESCAPE NEEDS √2, NOT 2×</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Escape is an ENERGY condition: launch so total energy ε = v²/2 − GM/r ≥ 0
            (reach infinity with zero left over). That gives v_e = √(2GM/r) — only
            41% more than circular, not double. At k = √2 the integrated probe&apos;s ε
            flips positive and its hyperbola never closes. below that, gravity wins.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · GEO IS A PLACE, NOT A SPEED</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Kepler III (T = 2π√(r³/GM)) fixes exactly one radius where T = 24 h:
            35,786 km. There a satellite hangs over one meridian — every TV dish
            points at a fixed spot because of r³ ∝ T². Slide the altitude and watch
            the period readout march from 90 minutes to a day.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Astronauts float because there is no gravity in space.&quot; No — at the
            ISS&apos;s altitude gravity is <span className="text-white">89% of its
            surface strength</span> (it is gravity that keeps the station in orbit!).
            Astronauts float because they and the station fall together with the same
            acceleration — free fall, not zero gravity. And escape speed is about
            energy, not escaping &quot;gravity&apos;s pull&quot;: Earth&apos;s field
            extends forever; √2 just means you never come back.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set k = 0.85 at LEO: the probe dips below the surface and relaunches —
            the crash ellipse proves that any bound orbit with perigee inside the
            planet is a collision. Real launches circularise with a burn at perigee.
            ② Slide altitude to GEO and read T = 23.93 h. Then double the altitude
            (67,572 km): T multiplies by 2^{3/2} = 2.83 — Kepler III, live.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick orbit questions — no marks, no shame.</p>
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
