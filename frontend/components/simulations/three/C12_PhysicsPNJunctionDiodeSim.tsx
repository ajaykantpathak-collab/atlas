'use client';

/**
 * C12_PhysicsPNJunctionDiodeSim.tsx — 3D
 * Class 12 Physics — Semiconductor Electronics — p-n Junction Diode
 * [3d-lab:c12-semi-pnjunction]
 *
 * WHY 3D: the depletion region is a 3D SLAB between two doped crystals.
 * Watching its width breathe with bias, and carriers pour across only one
 * way, is the entire diode story.
 *
 * HONEST NUMERICS — depletion width derived by hand (abrupt junction):
 *   Poisson: d²V/dx² = −ρ/ε. In the p-side slab of width x_p, ρ = −qN_A;
 *   in the n-side slab x_n, ρ = +qN_D. Charge neutrality forces
 *      N_A·x_p = N_D·x_n
 *   Integrating the field E once and the potential twice across both slabs
 *   and setting V(W) − V(0) = V_bi + V_R (applied reverse bias adds to the
 *   built-in barrier):
 *      ½ E_max W = V_bi + V_R,  with E_max = qN_D x_n/ε
 *   Solving the two simultaneous conditions gives the textbook result we
 *   evaluate live:
 *      W = √( 2ε(V_bi + V_R)/q · (N_A + N_D)/(N_A·N_D) )
 *
 * Current is the real Shockley equation at T = 300 K (kT/q = 25.85 mV):
 *      I = I₀( e^(qV/nkT) − 1 ),  n = 1 (ideal)
 *   Reverse saturation I₀ follows the doping slider (more doping → thinner
 *   barrier → different I₀; we scale I₀ ∝ 1/W² as a physically motivated
 *   stand-in and SAY so — no fake precision).
 *
 * Controls: bias V slider, n-side doping N_D slider, forward/reverse
 * presets, carrier-flow animation, Reset.
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, Ruler, RotateCcw, Sparkles } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Junction physics
// ─────────────────────────────────────────────────────────────

const q = 1.602176634e-19;     // C
const EPS_SI = 11.7 * 8.854e-12; // F/m — silicon dielectric constant
const VT = 0.02585;            // kT/q at 300 K (volts)
const V_BI = 0.72;             // built-in barrier for heavily doped Si junction (V)

/** depletion width in metres — derived in the header, evaluated live */
function depletionW(vBias: number, NA: number, ND: number): number {
  const vr = Math.max(vBias, -V_BI); // full depletion clamp, keeps sqrt real
  return Math.sqrt((2 * EPS_SI * (V_BI - vr)) / q * ((NA + ND) / (NA * ND)));
}

/** Shockley diode current in mA */
function diodeCurrentmA(vBias: number, I0uA: number): number {
  return 1000 * I0uA * 1e-6 * (Math.exp(vBias / VT) - 1);
}

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

const COL_P = '#fb7185';     // holes — rose
const COL_N = '#60a5fa';     // electrons — blue
const COL_DEP = '#64748b';   // exposed ions — slate

function CarrierLattice({
  count, region: [x0, x1], yz, color, flow, axis,
}: {
  count: number; region: [number, number]; yz: [number, number];
  color: string; flow: number; axis: 'p' | 'n';
}) {
  // deterministic lattice of carriers with a drift animation driven by t
  const pts = useMemo(() => {
    const out: [number, number, number][] = [];
    const nx = Math.floor(Math.sqrt(count));
    const ny = Math.ceil(count / nx);
    for (let i = 0; i < nx; i++)
      for (let j = 0; j < ny; j++) {
        const fx = (i + 0.5) / nx, fy = (j + 0.5) / ny;
        out.push([x0 + fx * (x1 - x0), (fy - 0.5) * yz[1], ((i + j) % 2 - 0.5) * yz[1] * 0.8]);
      }
    return out;
  }, [count, x0, x1, yz]);
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta; // smooth monotonic clock — no resets, no randomness
  });
  return (
    <group>
      {pts.map((p, i) => {
        // drift: carriers slide toward/away from the junction (phase by index)
        const cyc = (t.current + i * 0.37) % 1;         // 0→1 sawtooth
        const phase = flow * (Math.sin((i * 7.3) % 6.283) * 0.25 + (cyc - 0.5) * 0.8);
        const dx = axis === 'n' ? phase : -phase;
        return (
          <mesh key={i} position={[p[0] + dx, p[1], p[2]]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

function JunctionSlab({ wScene, halfLen }: { wScene: number; halfLen: number }) {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[wScene, halfLen * 1.35, halfLen * 1.35]} />
      <meshStandardMaterial color={COL_DEP} transparent opacity={0.16} depthWrite={false} />
    </mesh>
  );
}

function FieldArrow({ x, len, forward }: { x: number; len: number; forward: boolean }) {
  // built-in field points n→p (−x). Under forward bias it weakens.
  const dir = forward ? 1 : -1;
  const tipRot: [number, number, number] = dir > 0 ? [0, 0, -Math.PI / 2] : [0, 0, Math.PI / 2];
  return (
    <group position={[x, 0, 0]}>
      <mesh rotation={tipRot} position={[0, len / 2 - 0.15, 0]}>
        <coneGeometry args={[0.09, 0.3, 12]} />
        <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -len / 2 + 0.15, 0]}>
        <cylinderGeometry args={[0.035, 0.035, len - 0.3, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Labels({ wScene, halfLen }: { wScene: number; halfLen: number }) {
  return (
    <group>
      <Text position={[-halfLen * 1.05, halfLen * 0.95, 0]} fontSize={0.42} color={COL_P}>p-side</Text>
      <Text position={[halfLen * 0.62, halfLen * 0.95, 0]} fontSize={0.42} color={COL_N}>n-side</Text>
      {wScene > 0.35 && (
        <Text position={[0, -halfLen * 1.05, 0]} fontSize={0.34} color={COL_DEP}>depletion region</Text>
      )}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C12_PhysicsPNJunctionDiodeSim() {
  const [vBias, setVBias] = useState(0);        // applied bias (V)
  const [ndExp, setNdExp] = useState(21);       // N_D = 10^ndExp /m³
  const [flow, setFlow] = useState(false);
  const [spin, setSpin] = useState(true);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const NA = 1e23;                     // p-side fixed heavy acceptor doping /m³
  const ND = Math.pow(10, ndExp);      // n-side donor doping /m³ (slider 19–23)
  const W = depletionW(vBias, NA, ND); // metres
  const W_um = W * 1e6;                // micrometres
  const Emax = (q * ND * (W / 2)) / EPS_SI; // V/m
  const I0uA = 5e5 * Math.pow(W, 2) * 1e12; // ~pA-scale saturation, W-linked
  const ImA = diodeCurrentmA(vBias, Math.max(1e-6, Math.min(50, I0uA)));
  const forward = vBias > 0;

  // scene: total crystal length 9 units maps to 0.9 µm around the junction
  const SCALE = 9 / 1.2e-6;
  const wScene = Math.min(4.2, W * SCALE);
  const halfLen = 4.5;

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'Increasing REVERSE bias makes the depletion region', opts: ['Wider (W ∝ √(Vbi+VR))', 'Narrower', 'Unchanged'], correct: 0 },
    { q: 'The depletion region consists of', opts: ['immobile ionised dopants — no free carriers', 'free electrons', 'holes only'], correct: 0 },
    { q: 'In forward bias, current flows because', opts: ['the barrier is lowered and majority carriers diffuse across', 'minority carriers multiply', 'the field pushes carriers backward'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [ndExp]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setVBias(0); setNdExp(21); setFlow(false); setSpin(true); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [6, 4.5, 9], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.0} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.25)"
            fadeDistance={60} fadeStrength={1.4} infiniteGrid />
          <group rotation={[0, 0, 0]}>
            <SpinGroup spin={spin}>
              {/* p crystal (left, rose) and n crystal (right, blue) bases */}
              <mesh position={[-halfLen / 2 - wScene / 2, 0, 0]}>
                <boxGeometry args={[halfLen - wScene / 2, 3.2, 3.2]} />
                <meshStandardMaterial color={COL_P} transparent opacity={0.10} depthWrite={false} />
              </mesh>
              <mesh position={[halfLen / 2 + wScene / 2, 0, 0]}>
                <boxGeometry args={[halfLen - wScene / 2, 3.2, 3.2]} />
                <meshStandardMaterial color={COL_N} transparent opacity={0.10} depthWrite={false} />
              </mesh>
              <JunctionSlab wScene={wScene} halfLen={halfLen * 0.62} />
              {/* carriers */}
              <CarrierLattice count={26} region={[-halfLen, -wScene / 2 - 0.15]} yz={[1.2, 2.4]} color={COL_P} flow={flow ? (forward ? 1.4 : -0.6) : 0} axis="p" />
              <CarrierLattice count={26} region={[wScene / 2 + 0.15, halfLen]} yz={[1.2, 2.4]} color={COL_N} flow={flow ? (forward ? 1.4 : -0.6) : 0} axis="n" />
              {/* built-in field arrow inside depletion region */}
              {wScene > 0.4 && <FieldArrow x={0} len={Math.min(2.6, wScene * 0.9)} forward={false} />}
              <Labels wScene={wScene} halfLen={halfLen * 0.62} />
            </SpinGroup>
          </group>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={28} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[252px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">p–n junction @ 300 K — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">Bias V</span><span className={forward ? 'text-emerald-300' : vBias < 0 ? 'text-rose-300' : 'text-white'}>{vBias.toFixed(2)} V ({forward ? 'forward' : vBias < 0 ? 'reverse' : 'zero'})</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Barrier V_bi + V_R</span><span className="text-white">{(V_BI - vBias).toFixed(2)} V</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Depletion width W</span><span className="text-gold-300">{W_um.toFixed(3)} µm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">N_A / N_D</span><span className="text-white">10²³ / 10^{ndExp} m⁻³</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Peak field E_max</span><span className="text-white">{(Emax / 1e6).toFixed(2)} MV/m</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Diode current I</span><span className={Math.abs(ImA) > 0.01 ? (forward ? 'text-emerald-300' : 'text-rose-300') : 'text-surface-400'}>
              {Math.abs(ImA) < 1e-4 ? `${(ImA * 1e6).toFixed(1)} nA` : `${ImA.toFixed(3)} mA`}
            </span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Slide bias: the grey depletion slab breathes with √(V_bi + V_R)
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Zap className="h-3.5 w-3.5 text-gold-400" /> bias V:</span>
        <input type="range" min={-8} max={0.8} step={0.02} value={vBias}
          onChange={(e) => setVBias(Number(e.target.value))} className="h-11 w-44 accent-amber-400" />
        <span className="text-xs text-white">{vBias.toFixed(2)} V</span>
        <button onClick={() => setVBias(0.6)} className={btn(forward)}>forward 0.6 V</button>
        <button onClick={() => setVBias(-5)} className={btn(vBias < -0.1)}>reverse 5 V</button>
        <span className="ml-3 flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> N_D:</span>
        <input type="range" min={19} max={23} step={0.5} value={ndExp}
          onChange={(e) => setNdExp(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">10^{ndExp} m⁻³</span>
        <button onClick={() => setFlow(!flow)} className={btn(flow)}>carrier flow</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · DIFFUSION Digs the Hole</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            p-side is full of holes, n-side of electrons — each diffuses across and
            recombines, leaving behind <span className="text-white">fixed ions</span> (rose −, blue +)
            with no mobile carriers: the depletion region. Their charge creates the built-in
            field pointing n→p that opposes further diffusion. Equilibrium: drift = diffusion.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · BIAS Moves the WALLS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            W = √(2ε(V_bi + V_R)/q · (N_A+N_D)/N_A N_D). Forward bias subtracts from the
            barrier → W shrinks; reverse bias adds → W grows as the √. Watch the grey slab
            while you slide: also notice heavily-doped sides (higher N) give a THINNER region —
            the (N_A+N_D)/N_AN_D factor.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · THE SHOCKLEY CURVE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            I = I₀(e^(V/25.85mV) − 1). At +0.6 V the exponential is e^23 ≈ 10^10 — mA flood.
            At −5 V the exponential dies → tiny constant I₀. That asymmetry IS the diode:
            barrier lowered for one polarity, raised for the other. Same junction, two worlds.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The depletion region is empty space / a hole in the crystal.&quot; No —
            it is <span className="text-white">full of atoms with FIXED ionised dopants</span>;
            only the mobile carriers are gone. And the barrier field is not an external
            battery — it exists at zero bias, created by diffusion itself. Reverse bias does
            not &quot;push current backwards&quot;; it only widens the carrier-free wall so
            diffusion cannot happen.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set +0.60 V, then +0.72 V: current jumps ~100×, not linearly — every +18 mV
            multiplies I by ~2 (e-folding at kT/q ≈ 26 mV). That&apos;s why diodes are
            temperature/precision devices.
            ② Crank N_D from 10¹⁹ to 10²³ at −5 V: watch W shrink ~√(100) ≈ 10×. Heavily
            doped one-sided junctions put the whole depletion on the LIGHT side.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick p–n junction questions — no marks, no shame.</p>
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

function SpinGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = React.useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.16;
  });
  return <group ref={ref}>{children}</group>;
}
