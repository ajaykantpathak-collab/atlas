'use client';

/**
 * C12_PhysicsBandGapSim.tsx — 3D
 * Class 12 Physics — Semiconductor Electronics — Band Theory & the Gap
 * [3d-lab:c12-semi-bandgap]
 *
 * WHY 3D: energy bands are 3D ladders of states — the whole story of
 * conductors vs insulators vs semiconductors is HOW FAR an electron must
 * climb (E_g) and how often thermal kicks let it.
 *
 * HONEST NUMERICS — the Boltzmann factor derived by hand:
 *   Intrinsic excitation: an electron needs E_g to jump valence→conduction.
 *   The Fermi level sits (almost exactly) mid-gap, so the conduction-band
 *   edge is E_g/2 above E_F. The probability of a state that far above the
 *   Fermi level is the Boltzmann tail of the Fermi–Dirac function:
 *      f(E) ≈ e^(−(E−E_F)/kT)  →  n_i ∝ e^(−E_g/2kT)
 *   (the T^{3/2} prefactor is dwarfed by the exponential, and we say so).
 *   Everything below is that exact expression, evaluated live:
 *      k = 8.617×10⁻⁵ eV/K →  kT at 300 K = 0.02585 eV
 *      Si (E_g = 1.12 eV): e^(−21.7) ≈ 4×10⁻¹⁰ of states occupied — a
 *      pure insulator at 0 K becomes a 10¹²-per-cm³ conductor at 300 K.
 *   Heating from T₁ to T₂ multiplies carriers by exp(E_g/2k (1/T₁−1/T₂))
 *      — the physics behind every thermistor.
 *
 * Controls: material (Ge/Si/diamond/metal), temperature, excitation
 * animation, band spacing zoom, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, RotateCcw, Sparkles, Cpu } from 'lucide-react';

const K_EV = 8.617333262e-5; // eV/K

interface Material { key: string; name: string; eg: number; note: string }

const MATERIALS: Material[] = [
  { key: 'ge', name: 'Germanium', eg: 0.66, note: 'old-school transistor' },
  { key: 'si', name: 'Silicon', eg: 1.12, note: 'the industry standard' },
  { key: 'diamond', name: 'Diamond', eg: 5.47, note: 'insulator (but wide-gap tech!)' },
  { key: 'metal', name: 'Sodium (metal)', eg: 0, note: 'bands overlap — no gap' },
];

const N_STATES = 120; // drawn VB states (scene scale for carrier counting)

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

function BandLadder({ eg, egScene, T, animate, animT, showLadder }: {
  eg: number; egScene: number; T: number; animate: boolean;
  animT: React.MutableRefObject<number>; showLadder: boolean;
}) {
  const cbElectrons = useRef<(THREE.Mesh | null)[]>([]);
  const clock = useRef(0);

  const prob = eg > 0 ? Math.exp(-eg / (2 * K_EV * T)) : 1;
  const promoted = eg > 0 ? Math.round(prob * N_STATES) : N_STATES;
  const capped = Math.min(promoted, N_STATES);

  useFrame((_, delta) => {
    clock.current += delta;
    if (animate) animT.current += delta;
    // CB electrons hover with a tiny deterministic drift
    cbElectrons.current.forEach((m, i) => {
      if (!m) return;
      m.position.y = egScene + 0.25 + 0.06 * Math.sin(clock.current * 1.8 + i * 1.31);
    });
  });

  // VB lattice of electron positions (4 columns × rows)
  const vbPos: [number, number][] = [];
  for (let r = 0; r < N_STATES / 8; r++)
    for (let c = 0; c < 8; c++)
      vbPos.push([-3.15 + c * 0.9, -egScene / 2 - 1.35 + r * 0.26]);
  const cbPos = vbPos.map(([x]) => [x, 0] as [number, number]);

  const egLabel = eg > 0 ? `${eg.toFixed(2)} eV` : '0 (bands overlap)';

  return (
    <group>
      {/* valence band slab */}
      <mesh position={[0, -egScene / 2 - 0.75, 0]}>
        <boxGeometry args={[7.6, 2.1, 1.4]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.5} transparent opacity={0.85} />
      </mesh>
      <Text position={[0, -egScene / 2 - 2.15, 0]} fontSize={0.34} color="#7dd3fc">Valence band (filled at 0 K)</Text>

      {/* conduction band slab */}
      <mesh position={[0, egScene + 0.55, 0]}>
        <boxGeometry args={[7.6, 1.15, 1.4]} />
        <meshStandardMaterial color="#3b2f63" metalness={0.3} roughness={0.5} transparent opacity={0.7} />
      </mesh>
      <Text position={[0, egScene + 1.45, 0]} fontSize={0.34} color="#c4b5fd">Conduction band</Text>

      {/* the gap bracket */}
      {eg > 0 && (
        <group>
          <Line points={[[4.1, -egScene / 2 + 0.3, 0], [4.1, egScene, 0]]} color="#fbbf24" lineWidth={2} />
          <Line points={[[3.9, -egScene / 2 + 0.3, 0], [4.3, -egScene / 2 + 0.3, 0]]} color="#fbbf24" lineWidth={2} />
          <Line points={[[3.9, egScene, 0], [4.3, egScene, 0]]} color="#fbbf24" lineWidth={2} />
          <Text position={[4.9, egScene / 2, 0]} fontSize={0.4} color="#fbbf24">E_g = {egLabel}</Text>
          {/* Fermi level mid-gap */}
          {eg > 0 && (
            <>
              <Line points={[[-3.8, egScene / 2, 0], [3.8, egScene / 2, 0]]} color="rgba(248,113,113,0.7)" lineWidth={1.5} dashed dashSize={0.22} gapSize={0.15} />
              <Text position={[-4.6, egScene / 2 + 0.1, 0]} fontSize={0.3} color="#f87171">E_F</Text>
            </>
          )}
        </group>
      )}

      {/* valence electrons — a "hole" appears wherever an electron was promoted */}
      {vbPos.map(([x, y], i) => {
        const isPromoted = eg > 0 && i < capped; // deterministic selection
        return (
          <mesh key={`v${i}`} position={[x, y, 0]} visible={!isPromoted}>
            <sphereGeometry args={[0.14, 10, 10]} />
            <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.6} />
          </mesh>
        );
      })}

      {/* promoted electrons in the CB + their holes ringed in the VB */}
      {cbPos.slice(0, capped).map(([x], i) => (
        <group key={`c${i}`}>
          <mesh ref={(el) => { cbElectrons.current[i] = el; }} position={[x, egScene + 0.25, 0]}>
            <sphereGeometry args={[0.14, 10, 10]} />
            <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[vbPos[i][0], vbPos[i][1], 0]} visible={!animate || animT.current % 3 > 1}>
            <sphereGeometry args={[0.2, 12, 12]} />
            <meshStandardMaterial color="#fb7185" emissive="#be123c" emissiveIntensity={0.4} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {showLadder && eg > 0 && (
        <Text position={[0, egScene / 2 - 0.55, 0]} fontSize={0.3} color="#94a3b8">
          electrons must climb E_g/2 above E_F — thermal luck decides
        </Text>
      )}
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

export default function C12_PhysicsBandGapSim() {
  const [matIdx, setMatIdx] = useState(1); // Si
  const [T, setT] = useState(300);
  const [animate, setAnimate] = useState(true);
  const [showLadder, setShowLadder] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const animT = useRef(0);

  const mat = MATERIALS[matIdx];
  const kT = K_EV * T;
  const boltz = mat.eg > 0 ? Math.exp(-mat.eg / (2 * kT)) : 1;
  const promoted = mat.eg > 0 ? Math.min(N_STATES, Math.round(boltz * N_STATES)) : N_STATES;
  const conductClass =
    mat.eg === 0 ? 'CONDUCTOR' : mat.eg < 1 ? 'good semiconductor' : mat.eg < 2 ? 'semiconductor' : 'INSULATOR (at 300 K)';

  // resistance change heating 300 K → T
  const Rratio = mat.eg > 0
    ? Math.exp((mat.eg / (2 * K_EV)) * (1 / T - 1 / 300))
    : 1;

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'The carrier concentration of an intrinsic semiconductor varies as', opts: ['exp(−E_g/2kT)', 'exp(−E_g/kT)', 'T only'], correct: 0 },
    { q: 'In a pure semiconductor at absolute zero, the conduction band is', opts: ['empty and the material does not conduct', 'half full', 'full of holes'], correct: 0 },
    { q: 'Metals conduct at 0 K because', opts: ['their bands overlap — no gap to climb', 'E_g is small but nonzero', 'electrons get thermal kicks'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [matIdx]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setMatIdx(1); setT(300); setAnimate(true); setShowLadder(true); setZoom(1); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  const egScene = mat.eg === 0 ? 0.55 : Math.min(3.4, 0.9 + mat.eg * 0.42) * zoom;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [4.5, 3.5, 11], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[10, 14, 8]} intensity={0.9} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={60} fadeStrength={1.4} infiniteGrid position={[0, -4, 0]} />
          <SpinGroup spin={spin}>
            <BandLadder eg={mat.eg} egScene={egScene} T={T} animate={animate} animT={animT} showLadder={showLadder} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, egScene / 2, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[268px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">{mat.name} — band census, live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">E_g</span><span className="text-gold-300">{mat.eg === 0 ? '0 eV (overlapping bands)' : `${mat.eg} eV`}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">temperature T</span><span className="text-white">{T} K</span></div>
            <div className="flex justify-between"><span className="text-surface-500">kT</span><span className="text-white">{kT.toFixed(4)} eV</span></div>
            <div className="flex justify-between"><span className="text-surface-500">E_g/2kT</span><span className="text-white">{mat.eg > 0 ? (mat.eg / (2 * kT)).toFixed(1) : '—'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">e^(−E_g/2kT)</span><span className="text-gold-300">{boltz.toExponential(2)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">promoted of {N_STATES} drawn</span><span className="text-gold-300">{promoted}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">R(T)/R(300K)</span><span className="text-white">{mat.eg > 0 ? Rratio.toExponential(2) : '1 (metal)'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">class</span><span className={promoted > N_STATES / 2 ? 'text-emerald-300' : promoted > 0 ? 'text-gold-300' : 'text-rose-300'}>{conductClass}</span></div>
            <div className="text-[10px] text-surface-500 mt-1">{mat.note}</div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Rose rings = holes left behind · gold = promoted electrons (count = true Boltzmann factor)
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Cpu className="h-3.5 w-3.5 text-gold-400" /> material:</span>
        {MATERIALS.map((m, i) => (
          <button key={m.key} onClick={() => setMatIdx(i)} className={btn(matIdx === i)}>{m.name.split(' ')[0]}</button>
        ))}
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Zap className="h-3.5 w-3.5 text-gold-400" /> T:</span>
        <input type="range" min={100} max={700} step={10} value={T} onChange={(e) => setT(Number(e.target.value))} className="h-11 w-40 accent-amber-400" />
        <span className="text-xs text-white">{T} K</span>
        <button onClick={() => setAnimate(!animate)} className={btn(animate)}>hole pulse</button>
        <button onClick={() => setShowLadder(!showLadder)} className={btn(showLadder)}>labels</button>
        <span className="ml-2 text-xs text-surface-400">gap zoom:</span>
        <input type="range" min={0.5} max={1.6} step={0.05} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · BANDS FROM N ATOMS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Bring N silicon atoms together and each energy level splits N times —
            levels become quasi-continuous BANDS separated by gaps. The top filled band
            (valence) and the next empty one (conduction) are all that matters; the gap
            E_g between them is the single number that separates copper, silicon and
            diamond.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · THE EXPONENTIAL RUNS EVERYTHING</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            E_F sits mid-gap, so promotion costs only E_g/2 above the Fermi level —
            but the Boltzmann tail e^(−E_g/2kT) is brutal: Si at 300 K carries
            e^(−21.7) ≈ 10⁻¹⁰ of its states. Yet 10¹⁰ states × 10²³ atoms/cm³ =
            10¹³ carriers/cm³ — enough to run a chip. Watch the promoted count track
            the factor as you heat.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · HEAT HELPS, DOPING BEATS IT</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Thermal promotion is exponential in T — that&apos;s why semiconductor
            resistance DROPS with heat (opposite to metals), the working principle of
            thermistors. But doping is stronger still: one phosphorus atom per million
            Si injects ~10¹⁶ carriers/cm³, a thousand times the intrinsic count, and
            works at any temperature.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Semiconductors conduct HALF as well as metals / the gap is a physical
            wall electrons can&apos;t cross.&quot; No — an intrinsic Si crystal at 300 K
            is ~10⁹ times WORSE than copper (not 2×), and there is no wall: the
            <span className="text-white"> gap is a range of forbidden ENERGIES</span>,
            and thermal/photonic kicks lift electrons straight over it. Also a hole is
            not a proton — it is a missing electron whose absence drifts like a
            positive charge, and it contributes exactly as much as the promoted electron.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Heat Si from 300 K to 600 K: the Boltzmann factor multiplies by
            exp(E_g/2k × (1/300−1/600)) ≈ 2×10⁴ — watch the gold dots flood the
            conduction band. That factor is why chips throttle when hot.
            ② Compare Ge (0.66 eV) vs diamond (5.47 eV) at 300 K: the promoted count
            differs by ~25 orders of magnitude. One number, E_g, builds the whole
            conductor→semiconductor→insulator spectrum.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick band-theory questions — no marks, no shame.</p>
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
