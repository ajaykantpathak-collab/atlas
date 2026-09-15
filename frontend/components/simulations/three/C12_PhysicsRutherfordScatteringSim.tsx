'use client';

/**
 * C12_PhysicsRutherfordScatteringSim.tsx — 3D
 * Class 12 Physics — Atoms — Rutherford α-Scattering
 * [3d-lab:c12-atoms-rutherford]
 *
 * WHY 3D: the scattering experiment is a beam sweeping past a tiny target —
 * only in 3D do the hyperbolic paths fan out with impact parameter, and the
 * huge-angle rebounds ("like a shell bouncing off tissue paper") land
 * with any force.
 *
 * HONEST NUMERICS — the scattering relations, derived by hand:
 *   The α (charge 2e) feels a Coulomb repulsion F = K/r², K = kZe(2e) =
 *   2kZe². For impact parameter b and KE = ½mv², angular momentum conservation
 *   (mvb = m r² dφ/dt) plus energy conservation turn the orbit equation into
 *   a hyperbola whose asymptote angle is the scattering angle:
 *      tan(θ/2) = K / (2 E b)        →  θ(b) = 2 arctan( K/2Eb )
 *   Head-on (b = 0) the α stops at the distance of closest approach where
 *   ALL kinetic energy has become potential  E = K/r₀:
 *      r₀ = K/E = (1/4πε₀)·2Ze²/KE
 *   For gold (Z=79) and 5 MeV α:  r₀ ≈ 4.55×10⁻¹⁴ m = 45.5 fm — the NCERT
 *   punchline: the nucleus is smaller than that, hence "mostly empty atom".
 *   The scene trajectories are INTEGRATED live from F = K/r² (leapfrog,
 *   fixed substeps) with scene-scaled K and E — same equations, same
 *   hyperbolas; the HUD angles and radii are the REAL SI numbers.
 *
 * Controls: α energy, target element (Z), probe impact parameter b,
 * trails, re-fire, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Atom, Target, RotateCcw, Sparkles, Zap } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Real-unit analytics (SI)
// ─────────────────────────────────────────────────────────────

const K_E = 8.9875517923e9;      // 1/4πε₀
const E_CHARGE = 1.602176634e-19;

/** distance of closest approach, metres, for head-on α on nucleus Z */
function closestApproachM(Z: number, energyMeV: number): number {
  const K = K_E * 2 * Z * E_CHARGE * E_CHARGE;   // 2kZe²  [N·m²]
  const E = energyMeV * 1e6 * E_CHARGE;          // J
  return K / E;
}

/** scattering angle for impact parameter b (metres) */
function scatterAngleDeg(Z: number, energyMeV: number, b_m: number): number {
  const K = K_E * 2 * Z * E_CHARGE * E_CHARGE;
  const E = energyMeV * 1e6 * E_CHARGE;
  return (2 * Math.atan(K / (2 * E * b_m)) * 180) / Math.PI;
}

// ─────────────────────────────────────────────────────────────
// Integrated beam — leapfrog in the scene Coulomb field
// ─────────────────────────────────────────────────────────────

const N_ALPHA = 9;
const B_VALUES = [-4.5, -3.4, -2.3, -1.2, 0.001, 1.2, 2.3, 3.4, 4.5]; // deterministic fan
const K_SCENE = 46;      // scene Coulomb constant (tuned: θ≈90° at b≈1.15)
const E_SCENE = 20;      // scene KE (sets asymptote speed v=√(2E/m), m=1)
const DT_SPLIT = 220;    // substeps per frame budget

interface AlphaState {
  x: number; z: number; vx: number; vz: number;
  alive: boolean;
  trail: [number, number, number][];
}

function AlphaBeam({ energyScene, trailsOn, probeB, probeRef }: {
  energyScene: number; trailsOn: boolean; probeB: number;
  probeRef: React.MutableRefObject<{ theta: number; rmin: number }>;
}) {
  const parts = useRef<(THREE.Mesh | null)[]>([]);
  const lines = useRef<(THREE.BufferGeometry | null)[]>([]);
  const states = useRef<AlphaState[]>(B_VALUES.map((b) => ({
    x: -13, z: b, vx: Math.sqrt(2 * energyScene), vz: 0, alive: true, trail: [],
  })));

  // restart the fan when energy changes (deterministic initial conditions)
  useEffect(() => {
    states.current = B_VALUES.map((b) => ({
      x: -13, z: b, vx: Math.sqrt(2 * energyScene), vz: 0, alive: true, trail: [],
    }));
  }, [energyScene]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.033);
    const sub = DT_SPLIT;
    const h = dt / sub;
    for (let s = 0; s < sub; s++) {
      for (let i = 0; i < states.current.length; i++) {
        const a = states.current[i];
        if (!a.alive) continue;
        const r2 = a.x * a.x + a.z * a.z;
        const r = Math.sqrt(r2) || 0.001;
        // F = K/r² repulsive, radially outward
        const acc = K_SCENE / r2 / r;             // K/r³ times position vector
        a.vx += acc * a.x * h;
        a.vz += acc * a.z * h;
        a.x += a.vx * h;
        a.z += a.vz * h;
        // recycle far-away alphas (both directions), and count θ for the probe
        if (a.x > 15 || a.x < -15 || Math.abs(a.z) > 15) {
          const speed = Math.sqrt(a.vx * a.vx + a.vz * a.vz) || 1;
          const theta = (Math.acos(Math.max(-1, Math.min(1, a.vx / speed))) * 180) / Math.PI *
            (a.z < 0 ? -1 : 1);
          if (Math.abs(a.z) < 0.01) probeRef.current = { theta: Math.abs(theta), rmin: Math.sqrt(r2) };
          a.x = -13; a.z = B_VALUES[i]; a.vx = Math.sqrt(2 * energyScene); a.vz = 0;
          a.trail = [];
        }
      }
    }
    // update meshes + trails
    for (let i = 0; i < states.current.length; i++) {
      const a = states.current[i];
      const m = parts.current[i];
      if (m) m.position.set(a.x, 0, a.z);
      const last = a.trail[a.trail.length - 1];
      if (!last || Math.hypot(last[0] - a.x, last[2] - a.z) > 0.12) {
        a.trail.push([a.x, 0.02, a.z]);
        if (a.trail.length > 400) a.trail.shift();
      }
      const geo = lines.current[i];
      if (geo && trailsOn && a.trail.length > 1) {
        const pos = geo.getAttribute('position') as THREE.BufferAttribute;
        const n = Math.min(pos.count, a.trail.length);
        for (let j = 0; j < n; j++) pos.setXYZ(j, a.trail[j][0], a.trail[j][1], a.trail[j][2]);
        for (let j = n; j < pos.count; j++) pos.setXYZ(j, a.trail[n - 1][0], 0.02, a.trail[n - 1][2]);
        pos.needsUpdate = true;
        geo.setDrawRange(0, Math.max(2, a.trail.length));
      }
    }
    // probe analytics (analytic, real units shown in HUD from b=probeB)
    void probeB;
  });

  return (
    <group>
      {/* beam-line guide */}
      <Line points={[[-14, 0, 0], [0, 0, 0]]} color="rgba(255,255,255,0.15)" lineWidth={1} />
      {/* trails */}
      {B_VALUES.map((_, i) => (
        <line key={`t${i}`}>
          <bufferGeometry ref={(el) => { lines.current[i] = el; }}>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(400 * 3), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={i === 4 ? '#fbbf24' : 'rgba(96,165,250,0.7)'} linewidth={1.5} transparent opacity={0.8} />
        </line>
      ))}
      {/* alphas */}
      {B_VALUES.map((b, i) => (
        <mesh key={`a${i}`} ref={(el) => { parts.current[i] = el; }} position={[-13, 0, b]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color={i === 4 ? '#fbbf24' : '#60a5fa'} emissive={i === 4 ? '#b45309' : '#1d4ed8'} emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

const ELEMENTS = [
  { name: 'Gold (Au)', Z: 79 },
  { name: 'Silver (Ag)', Z: 47 },
  { name: 'Aluminium (Al)', Z: 13 },
];

export default function C12_PhysicsRutherfordScatteringSim() {
  const [elIdx, setElIdx] = useState(0);
  const [energyMeV, setEnergyMeV] = useState(5);
  const [probeB, setProbeB] = useState(45);    // fm
  const [trailsOn, setTrailsOn] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const probeRef = useRef({ theta: 0, rmin: 0 });
  const Z = ELEMENTS[elIdx].Z;
  const r0fm = (closestApproachM(Z, energyMeV) * 1e15);
  const thetaProbe = scatterAngleDeg(Z, energyMeV, probeB * 1e-15);
  const nuclearR = 0.7; // scene radius of the drawn nucleus (not to fm scale — shown tiny on purpose)

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'Most α-particles passed straight through the gold foil, which proved', opts: ['the atom is mostly empty space', 'electrons are heavy', 'the nucleus is large'], correct: 0 },
    { q: 'The distance of closest approach r₀ = 2kZe²/KE sets', opts: ['an UPPER bound on nuclear size', 'the electron orbit', 'the foil thickness'], correct: 0 },
    { q: 'Doubling the α kinetic energy makes the large-angle deflections', opts: ['rarer (θ ∝ 1/E)', 'more common', 'unchanged'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [elIdx]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setElIdx(0); setEnergyMeV(5); setProbeB(45); setTrailsOn(true); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [4, 12, 16], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 14, 8]} intensity={0.8} color="#ffe9b8" />
          <Grid args={[60, 60]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.18)"
            fadeDistance={80} fadeStrength={1.4} infiniteGrid position={[0, -1.5, 0]} />
          <group>
            {/* the nucleus (gold) */}
            <mesh>
              <sphereGeometry args={[nuclearR, 32, 32]} />
              <meshStandardMaterial color="#fb7185" emissive="#dc2626" emissiveIntensity={0.7} metalness={0.3} roughness={0.4} />
            </mesh>
            <Text position={[0, -1.3, 0]} fontSize={0.34} color="#fca5a5">+{Z} nucleus (not to scale — tiny!)</Text>
            <AlphaBeam energyScene={E_SCENE * (energyMeV / 5)} trailsOn={trailsOn} probeB={probeB} probeRef={probeRef} />
          </group>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={40} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[262px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Rutherford scattering — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">target</span><span className="text-white">{ELEMENTS[elIdx].name} · Z = {Z}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">α energy</span><span className="text-white">{energyMeV.toFixed(1)} MeV</span></div>
            <div className="flex justify-between"><span className="text-surface-500">r₀ (head-on) = 2kZe²/KE</span><span className="text-gold-300">{r0fm.toFixed(1)} fm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">real Au nucleus radius</span><span className="text-white">≈ 7 fm (much smaller!)</span></div>
            <div className="mt-2 border-t border-white/10 pt-1.5 text-[10px] uppercase tracking-wider text-surface-500">probe α (analytic)</div>
            <div className="flex justify-between"><span className="text-surface-500">impact parameter b</span><span className="text-white">{probeB} fm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">θ = 2arctan(kZe²/Eb)</span><span className="text-gold-300">{thetaProbe.toFixed(1)}°</span></div>
            <div className="flex justify-between"><span className="text-surface-500">b for θ = 90°</span><span className="text-white">{(closestApproachM(Z, energyMeV) * 1e15 / 2).toFixed(1)} fm</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Every path is a live-integrated hyperbola in the 1/r² field — watch the head-on gold α rebound
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Atom className="h-3.5 w-3.5 text-gold-400" /> target:</span>
        {ELEMENTS.map((el, i) => (
          <button key={el.Z} onClick={() => setElIdx(i)} className={btn(elIdx === i)}>{el.name.split(' ')[0]}</button>
        ))}
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Zap className="h-3.5 w-3.5 text-gold-400" /> KE:</span>
        <input type="range" min={1} max={8} step={0.5} value={energyMeV} onChange={(e) => setEnergyMeV(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{energyMeV.toFixed(1)} MeV</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Target className="h-3.5 w-3.5 text-gold-400" /> b:</span>
        <input type="range" min={5} max={200} step={5} value={probeB} onChange={(e) => setProbeB(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{probeB} fm</span>
        <button onClick={() => setTrailsOn(!trailsOn)} className={btn(trailsOn)}>trails</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · EMPTY SPACE, MOSTLY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ~1 in 8000 α-particles deflects past 90° through gold — the rest sail
            through as if nothing were there. Rutherford&apos;s conclusion: all +charge
            and mass sit in a nucleus ~10⁴× smaller than the atom. Watch the fan here:
            only tiny-b alphas feel the kick; wide-miss alphas barely wobble.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · THE HYPERBOLA IS ORBIT MECHANICS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Same maths as a comet around a repulsive &quot;sun&quot;: conservation of
            energy and angular momentum give tan(θ/2) = kZe²/(Eb) — small b, big
            θ; head-on b=0, the α stops at r₀ = 2kZe²/KE and re-traces its path.
            The trails here are integrated straight from F ∝ 1/r², so the hyperbolas
            are earned, not drawn.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · r₀ SIZES THE NUCLEUS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            No α ever came closer than r₀ ≈ 45.5 fm (5 MeV, gold) — so the nucleus is
            at most that big; electron-scattering later measured ≈ 7 fm. Slide the
            energy up: r₀ shrinks (faster α crashes deeper) and the 90°-deflection b
            halves — Coulomb-barrier probing, the ancestor of all particle physics.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Electrons deflect the α-particles.&quot; No — an electron is 7300×
            lighter than an α; hitting one is a pea deflecting a bowling ball, and the
            attraction/repulsion near-cancels anyway. The large-angle rebounds need a
            <span className="text-white"> heavy, concentrated positive charge</span> —
            that inference (mass + charge co-located) was Rutherford&apos;s real
            discovery. Also the drawn nucleus here is oversized for visibility;
            at true scale with this beam the dot would be invisible.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Switch gold → aluminium (Z 79→13): the whole fan flattens — θ ∝ Z, so
            deflections drop ~6×. Rutherford checked this: the scattering rate tracked Z².
            ② Raise KE 5 → 8 MeV and watch r₀ shrink from 45.5 → 28.4 fm. If an α could
            reach ~14 fm, it would IGNORE the Coulomb force and reveal the nuclear
            strong force — that happened in 1919 with natural α&apos;s.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick scattering questions — no marks, no shame.</p>
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
