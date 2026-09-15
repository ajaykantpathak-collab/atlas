'use client';

/**
 * C12_PhysicsBohrAtomSim.tsx — 3D
 * Class 12 Physics — Atoms — Bohr Model: Radii, Energies, Photon Jumps
 * [3d-lab:c12-atoms-bohr]
 *
 * WHY 3D: the model's whole point is that only certain ORBITS exist, with
 * radii growing as n² and energies as −13.6/n². Seeing the ladder of
 * orbits to scale — and a photon pop out with the right colour — turns two
 * formulas into one picture.
 *
 * HONEST NUMERICS — both Bohr formulas derived by hand:
 *   Coulomb provides the centripetal force; Bohr adds mvr = nħ:
 *      m v²/r = k e²/r²   →   m v r = k e²   …(i)
 *      m v r  = n ħ                                  …(ii)
 *   (i)/(ii): v = k e²/(nħ)  →  v_n = 2.18×10⁶/n m/s
 *   r = n²ħ²/(m k e²)  →  r_n = 0.529 n² Å     (a₀ = ħ²/mke²)
 *   E = ½mv² − ke²/r = −ke²/(2r)  →  E_n = −13.6 Z²/n² eV (Z=1 here)
 *   A jump n_i→n_f emits a photon carrying the EXACT difference:
 *      E_γ = 13.6(1/n_f² − 1/n_i²) eV,  λ = 1240/E_γ nm,  f = E_γ/h
 *   Every number in the HUD (radii, speeds, λ, series names) is computed
 *   live from these four lines — the photon's COLOUR is mapped from its λ.
 *
 * Controls: initial n_i, final n_f, fire the transition, orbit zoom,
 * spin, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Atom, RotateCcw, Sparkles, Zap } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Bohr mathematics (all real units)
// ─────────────────────────────────────────────────────────────

const R0 = 0.529;               // Å
const A0_SCENE = 1.35;          // scene units per a₀ → r_n = n²·0.529·A0_SCENE/0.529 = n²·1.35
const E1 = 13.6;                // eV

const rA = (n: number) => R0 * n * n;                 // Å
const vOf = (n: number) => 2.18e6 / n;                // m/s
const eOf = (n: number) => -E1 / (n * n);             // eV
const rScene = (n: number) => n * n * A0_SCENE;       // scene units (n² scaled — same n² law)

/** photon wavelength for a downward jump, nm */
function photonNm(ni: number, nf: number): number | null {
  const dE = E1 * (1 / (nf * nf) - 1 / (ni * ni));
  return dE > 0 ? 1239.84 / dE : null;
}

function seriesName(nf: number): string {
  return nf === 1 ? 'Lyman (UV)' : nf === 2 ? 'Balmer (visible)' : nf === 3 ? 'Paschen (IR)' : 'Brackett (IR)';
}

/** deterministic approximate wavelength→RGB (380–780 nm), else violet/grey */
function lambdaToColor(nm: number): string {
  if (nm < 380) return '#8b5cf6';   // UV hint
  if (nm > 780) return '#7f1d1d';   // IR hint
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  const f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1;
  const to = (x: number) => Math.round(255 * Math.pow(Math.max(0, x) * f, 0.8));
  return `rgb(${to(r)},${to(g)},${to(b)})`;
}

interface JumpState { active: boolean; t: number; fromN: number; toN: number; emitting: boolean }

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

function BohrStage({ nSel, jumpRef, zoom, emitColor, showLadder }: {
  nSel: number; jumpRef: React.MutableRefObject<JumpState>; zoom: number;
  emitColor: string; showLadder: boolean;
}) {
  const eRef = useRef<THREE.Group>(null);
  const photonRef = useRef<THREE.Group>(null);
  const photonGeo = useRef<THREE.BufferGeometry>(null);
  const theta = useRef(0);
  const N_PTS = 26;

  useFrame((_, delta) => {
    const j = jumpRef.current;
    const nNow = j.active
      ? j.fromN + (j.toN - j.fromN) * easeInOut(Math.min(1, j.t / 1.4))
      : nSel;
    // honest angular speed ∝ v/r ∝ 1/n³  (scaled for the eye)
    theta.current += (delta * 2.4) / (nNow * nNow * nNow) * 8;

    const rr = rScene(nNow);
    if (eRef.current) eRef.current.position.set(rr * Math.cos(theta.current), rr * Math.sin(theta.current), 0);

    // progress the jump timer
    if (j.active) {
      j.t += delta;
      if (j.t >= 1.4) { j.active = false; }
    }

    // the emitted/absorbed photon: a wiggly ray marching outward (+x)
    if (photonGeo.current && photonRef.current) {
      const vis = j.active && j.emitting;
      photonRef.current.visible = vis;
      if (vis) {
        const start = rScene(j.fromN) * 0.5 + 0.6;
        const pos = photonGeo.current.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < N_PTS; i++) {
          const s = i * 0.28 + (j.t * 3.5) % 0.84;
          pos.setXYZ(i, start + s, Math.sin(s * 4.2) * 0.22, 0);
        }
        pos.needsUpdate = true;
      }
    }
  });

  function easeInOut(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  const orbits = [1, 2, 3, 4];

  return (
    <group scale={zoom}>
      {/* nucleus */}
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#f87171" emissive="#dc2626" emissiveIntensity={0.8} />
      </mesh>
      <Text position={[0.35, -0.42, 0]} fontSize={0.26} color="#fca5a5">p⁺</Text>

      {/* the four allowed orbits — TRUE n² spacing in scene units */}
      {orbits.map((n) => {
        const pts: [number, number, number][] = [];
        for (let i = 0; i <= 120; i++) {
          const a = (i / 120) * Math.PI * 2;
          pts.push([rScene(n) * Math.cos(a), rScene(n) * Math.sin(a), 0]);
        }
        return (
          <group key={n}>
            <Line points={pts} color={n === nSel ? 'rgba(251,191,36,0.85)' : 'rgba(148,163,184,0.35)'} lineWidth={n === nSel ? 2 : 1} />
            <Text position={[rScene(n) * Math.SQRT1_2, rScene(n) * Math.SQRT1_2, 0]} fontSize={0.3} color={n === nSel ? '#fbbf24' : '#64748b'}>n={n}</Text>
          </group>
        );
      })}

      {/* the electron */}
      <group ref={eRef} position={[rScene(nSel), 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* emitted photon */}
      <group ref={photonRef} visible={false}>
        <line>
          <bufferGeometry ref={photonGeo}>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(N_PTS * 3), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={emitColor} linewidth={2} transparent opacity={0.95} />
        </line>
        <Text position={[4.6, 0.5, 0]} fontSize={0.3} color={emitColor}>hν</Text>
      </group>

      {/* energy ladder on the left: bar height ∝ |E_n| = 13.6/n² */}
      {showLadder && orbits.map((n) => {
        const hgt = (E1 / (n * n)) * 0.16;
        return (
          <group key={`L${n}`} position={[-9.5, 0, -2]}>
            <mesh position={[0, hgt / 2, 0]}>
              <boxGeometry args={[0.5, hgt, 0.1]} />
              <meshStandardMaterial color={n === nSel ? '#fbbf24' : '#475569'} emissive={n === nSel ? '#b45309' : '#000'} emissiveIntensity={0.4} />
            </mesh>
            <Text position={[0.9, hgt + 0.12, 0]} fontSize={0.24} color={n === nSel ? '#fbbf24' : '#64748b'}>
              n={n}: {eOf(n).toFixed(2)} eV
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function SpinGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.z += delta * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C12_PhysicsBohrAtomSim() {
  const [nSel, setNSel] = useState(2);
  const [ni, setNi] = useState(3);
  const [nf, setNf] = useState(2);
  const [zoom, setZoom] = useState(1);
  const [showLadder, setShowLadder] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const jumpRef = useRef<JumpState>({ active: false, t: 0, fromN: 2, toN: 2, emitting: true });
  const [, forceTick] = useState(0);
  const fire = () => {
    jumpRef.current = { active: true, t: 0, fromN: ni, toN: nf, emitting: nf < ni };
    setNSel(nf);
    forceTick((x) => x + 1);
  };

  const nm = photonNm(ni, nf);
  const dE = nm ? E1 * (1 / (nf * nf) - 1 / (ni * ni)) : -E1 * (1 / (nf * nf) - 1 / (ni * ni));
  const emitColor = nm ? lambdaToColor(nm) : '#94a3b8';
  const freq = nm ? ((dE * 1.602e-19) / 6.626e-34) : 0;

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'The radius of the n-th Bohr orbit is', opts: ['0.529 n² Å (grows as n²)', '0.529 n Å', '0.529/n² Å'], correct: 0 },
    { q: 'Energy of the electron in orbit n is', opts: ['−13.6/n² eV (less negative as n grows)', '+13.6/n² eV', 'constant'], correct: 0 },
    { q: 'An electron falling from n=3 to n=2 emits', opts: ['a 656 nm red photon (Balmer)', 'a UV photon', 'nothing — it absorbs'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [ni, nf]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setNSel(2); setNi(3); setNf(2); setZoom(1); setShowLadder(true); setSpin(false); jumpRef.current = { active: false, t: 0, fromN: 2, toN: 2, emitting: true }; setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [6, 8, 16], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 14, 8]} intensity={0.8} color="#ffe9b8" />
          <Grid args={[60, 60]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={90} fadeStrength={1.4} infiniteGrid position={[0, -6, 0]} />
          <SpinGroup spin={spin}>
            <BohrStage nSel={nSel} jumpRef={jumpRef} zoom={zoom} emitColor={emitColor} showLadder={showLadder} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={60} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[258px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Bohr atom (H, Z=1) — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">current orbit n</span><span className="text-gold-300">{nSel}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">r_n = 0.529n²</span><span className="text-white">{rA(nSel).toFixed(3)} Å</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v_n = 2.18×10⁶/n</span><span className="text-white">{(vOf(nSel) / 1e6).toFixed(2)} ×10⁶ m/s</span></div>
            <div className="flex justify-between"><span className="text-surface-500">E_n = −13.6/n²</span><span className="text-gold-300">{eOf(nSel).toFixed(3)} eV</span></div>
            <div className="mt-2 border-t border-white/10 pt-1.5 text-[10px] uppercase tracking-wider text-surface-500">transition n={ni} → n={nf}</div>
            <div className="flex justify-between"><span className="text-surface-500">ΔE</span><span className="text-white">{nf < ni ? '' : 'absorbs '}{Math.abs(dE).toFixed(3)} eV</span></div>
            <div className="flex justify-between"><span className="text-surface-500">λ = 1240/ΔE</span><span className="text-gold-300">{nm ? `${nm.toFixed(1)} nm` : '— (upward jump)'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">frequency f</span><span className="text-white">{nm ? `${(freq / 1e12).toFixed(0)} THz` : '—'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">series</span><span className="text-gold-300">{nf < ni ? seriesName(nf) : '—'}</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Orbits spaced as true n² — the electron crawls on outer orbits (v ∝ 1/n, r ∝ n²)
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Atom className="h-3.5 w-3.5 text-gold-400" /> n_i:</span>
        {[1, 2, 3, 4].map((n) => (
          <button key={n} onClick={() => setNi(n)} className={btn(ni === n)}>{n}</button>
        ))}
        <span className="ml-2 text-xs text-surface-400">n_f:</span>
        {[1, 2, 3, 4].map((n) => (
          <button key={n} onClick={() => setNf(n)} className={btn(nf === n)}>{n}</button>
        ))}
        <button onClick={fire} disabled={ni === nf}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-400 to-amber-500 px-3 py-2 text-xs font-display font-bold text-surface-0 disabled:opacity-40">
          <Zap className="h-3.5 w-3.5" /> {nf < ni ? 'emit hν' : 'absorb hν'}
        </button>
        <span className="ml-2 text-xs text-surface-400">zoom:</span>
        <input type="range" min={0.5} max={1.8} step={0.05} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <button onClick={() => setShowLadder(!showLadder)} className={btn(showLadder)}>energy ladder</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · QUANTISATION FROM mvr = nħ</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Coulomb + centripetal alone give a continuum of orbits. Bohr&apos;s single
            extra rule — angular momentum comes in units of ħ — collapses them to
            r_n = 0.529n² Å and E_n = −13.6/n² eV. The orbits here are spaced with
            exactly that n² law: orbit 4 sits SIXTEEN times farther out than orbit 1
            (4² = 16) — count the grid squares to verify.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · JUMPS, NOT SPIRALS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Classical electrodynamics says an orbiting electron radiates and spirals
            into the nucleus in ~10⁻¹¹ s — atoms could not exist. Bohr: in allowed
            orbits it does NOT radiate; light is emitted only during a jump, carrying
            E_γ = E_ni − E_nf. One rule, and the spectral lines of hydrogen fall out.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · SERIES = FINAL DESTINATION</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The series name depends only on where the electron LANDS: to n=1 Lyman
            (UV), n=2 Balmer (visible — the 656 nm red Hα line), n=3 Paschen (IR).
            Fire 3→2 and 4→2 and read λ each time: same destination, different colours.
            λ = 1240/ΔE is the pocket formula doing all the work.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Negative energy means the electron has no energy / the model shows
            where the electron IS.&quot; No — E &lt; 0 simply means the electron is
            <span className="text-white"> bound</span> (you must ADD 13.6 eV to free
            it). And Bohr orbits are not literal tracks — modern quantum mechanics
            replaces them with probability clouds; Bohr survives because its ENERGY
            levels are exactly right for hydrogen. The speeding electron here also
            doesn&apos;t radiate — that defiance IS the postulate.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Fire 4→2: λ reads 486 nm (blue-cyan, Balmer Hβ). Then fire 3→2: 656 nm
            red (Hα). Both land on n=2 yet the colours differ — the ladder rung
            ABOVE the destination sets the photon&apos;s energy.
            ② Fire 2→1: 121.6 nm — deep UV (Lyman-α), invisible. Compare with 3→2:
            same Δn=1, wildly different λ, because E scales as 1/n² — the n=1 rung is
            brutally deep.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick Bohr questions — no marks, no shame.</p>
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
