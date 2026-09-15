'use client';

/**
 * C11_ChemistryHybridizationOrbitalsSim.tsx — 3D
 * Class 11 Chemistry — Chemical Bonding — Hybridisation  [3d-lab:c11-bond-hybrid]
 *
 * WHY 3D: hybridisation is a statement about DIRECTIONS. "sp³ points to the
 * corners of a tetrahedron" only becomes real when you orbit the four lobes
 * and measure 109.47° between any pair.
 *
 * HONEST NUMERICS 1 — hybrid directions derived by hand:
 *   Mix one s with three p's: h₁ = (s + px + py + pz)/2 and the other three
 *   with an EVEN number of minus signs. Two hybrids are orthogonal:
 *      ⟨h₁|h₂⟩ = ¼(1 − 1 − 1 − 1) = 0   ✓ (orthonormal set)
 *   and the angle between their DIRECTION lobes satisfies
 *      cos θ = −1/3 → θ = 109.47°, the tetrahedral angle. Not memorised —
 *   it falls straight out of orthonormality.
 *   sp  : h± = (s ± px)/√2            → 180°,  two p orbitals left over
 *   sp² : h_k = (s + √2 p_k)/√3       → 120°,  one p left over (π bond!)
 *
 * HONEST NUMERICS 2 — sigma overlap demo, the exact analytic 1s–1s
 *   overlap integral (derived once, evaluated live):
 *      S(R) = e^(−ρ) · (1 + ρ + ρ²/3),   ρ = R/a₀
 *   obtained by integrating ψ₁₀₀(r)·ψ₁₀₀(r−R) over all space with the
 *   hydrogenic 1s wavefunction ψ ∝ e^(−r/a₀). At R = 2a₀ (≈106 pm, close
 *   to a real C–H bond length) S ≈ 0.586 — the sweet spot the demo hunts.
 *
 * Controls: hybridisation (sp / sp² / sp³), H approach distance R slider,
 * show leftover p orbitals, spin, Reset.
 */

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Atom, Ruler, RotateCcw, Sparkles } from 'lucide-react';

const A0_PM = 52.9; // Bohr radius in pm

// ─────────────────────────────────────────────────────────────
// Hybridisation mathematics
// ─────────────────────────────────────────────────────────────

type V3 = [number, number, number];

interface HybridSpec {
  key: string;
  name: string;
  lobes: V3[];          // unit direction of each hybrid lobe
  leftoverP: V3[];      // unhybridised p orbitals (dumbbells)
  angleDeg: string;
  examples: string;
  geometry: string;
}

const norm = (v: V3): V3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

/** exact analytic 1s–1s overlap integral, see header derivation */
function overlapS(R_pm: number): number {
  const rho = R_pm / A0_PM;
  return Math.exp(-rho) * (1 + rho + (rho * rho) / 3);
}

const HYBRIDS: Record<string, HybridSpec> = {
  sp: {
    key: 'sp', name: 'sp — linear', geometry: 'linear, 180°',
    lobes: [[0, 1, 0], [0, -1, 0]],
    leftoverP: [[1, 0, 0], [0, 0, 1]],
    angleDeg: '180°', examples: 'BeCl₂, C₂H₂, CO₂',
  },
  sp2: {
    key: 'sp²', name: 'sp² — trigonal planar', geometry: 'trigonal planar, 120°',
    lobes: [90, 210, 330].map((d) => {
      const r = (d * Math.PI) / 180;
      return [Math.cos(r), Math.sin(r), 0] as V3;
    }),
    leftoverP: [[0, 0, 1]],
    angleDeg: '120°', examples: 'BF₃, C₂H₄, graphite sheets',
  },
  sp3: {
    key: 'sp³', name: 'sp³ — tetrahedral', geometry: 'tetrahedral, 109.47°',
    lobes: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(norm),
    leftoverP: [],
    angleDeg: '109.47°', examples: 'CH₄, NH₃, diamond, CCl₄',
  },
};

/** angle between the first two lobes, re-measured from actual vectors */
function measuredLobeAngle(lobes: V3[]): number {
  const [a, b] = lobes;
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  return (Math.acos(Math.min(1, Math.max(-1, dot))) * 180) / Math.PI;
}

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

function HybridLobe({ dir, len, hot }: { dir: V3; len: number; hot: boolean }) {
  const q = useMemo(() => {
    const from = new THREE.Vector3(0, 1, 0);
    const to = new THREE.Vector3(...dir).normalize();
    return new THREE.Quaternion().setFromUnitVectors(from, to);
  }, [dir]);
  return (
    <group>
      {/* big outer lobe + small back lobe = the true p-hybrid shape */}
      <mesh position={[dir[0] * len * 0.6, dir[1] * len * 0.6, dir[2] * len * 0.6]} quaternion={q}>
        <sphereGeometry args={[0.62, 28, 28]} />
        <meshStandardMaterial
          color={hot ? '#fbbf24' : '#818cf8'} emissive={hot ? '#b45309' : '#3730a3'}
          emissiveIntensity={hot ? 0.35 : 0.18} transparent opacity={hot ? 0.5 : 0.34}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-dir[0] * len * 0.16, -dir[1] * len * 0.16, -dir[2] * len * 0.16]} quaternion={q}>
        <sphereGeometry args={[0.26, 20, 20]} />
        <meshStandardMaterial color="#818cf8" transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  );
}

function LeftoverP({ dir, len }: { dir: V3; len: number }) {
  const q = useMemo(() => {
    const from = new THREE.Vector3(0, 1, 0);
    const to = new THREE.Vector3(...dir).normalize();
    return new THREE.Quaternion().setFromUnitVectors(from, to);
  }, [dir]);
  return (
    <group quaternion={q}>
      {[1, -1].map((s) => (
        <mesh key={s} position={[0, s * len * 0.7, 0]}>
          <sphereGeometry args={[0.3, 20, 20]} />
          <meshStandardMaterial color="#2dd4bf" emissive="#0d9488" emissiveIntensity={0.3} transparent opacity={0.42} depthWrite={false} />
        </mesh>
      ))}
      <Line points={[[0, -len * 0.45, 0], [0, len * 0.45, 0]]} color="rgba(45,212,191,0.5)" lineWidth={1} />
    </group>
  );
}

/** the approaching H 1s sphere + bond stick when overlap is good */
function ApproachingH({ dir, len, R_pm }: { dir: V3; len: number; R_pm: number }) {
  const pos: V3 = [dir[0] * len, dir[1] * len, dir[2] * len];
  const bonded = R_pm <= 130;
  const q = useMemo(() => {
    const from = new THREE.Vector3(0, 1, 0);
    const to = new THREE.Vector3(...dir).normalize();
    return new THREE.Quaternion().setFromUnitVectors(from, to);
  }, [dir]);
  return (
    <group>
      <mesh position={pos}>
        <sphereGeometry args={[0.34, 28, 28]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.5} emissive="#94a3b8" emissiveIntensity={0.2} />
      </mesh>
      {bonded && (
        <mesh position={[pos[0] / 2, pos[1] / 2, pos[2] / 2]} quaternion={q}>
          <cylinderGeometry args={[0.08, 0.08, len, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.4} />
        </mesh>
      )}
      <Line points={[[0, 0, 0], pos]} color="rgba(148,163,184,0.35)" lineWidth={1} dashed dashSize={0.15} gapSize={0.12} />
    </group>
  );
}

function SpinGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.2;
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C11_ChemistryHybridizationOrbitalsSim() {
  const [hk, setHk] = useState<'sp' | 'sp2' | 'sp3'>('sp3');
  const [Rpm, setRpm] = useState(250);   // H nucleus distance from C, pm
  const [showP, setShowP] = useState(true);
  const [spin, setSpin] = useState(true);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const spec = HYBRIDS[hk];

  // scene scale: 250 pm → 3.6 units (C–H ≈ 109 pm → ~1.57 units)
  const pm2u = 3.6 / 250;
  const Rscene = Rpm * pm2u;
  const lobeLen = 1.9;
  const S = overlapS(Rpm);
  const hot = Rpm < 170; // lobe being overlapped lights up

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: `How many pure p orbitals remain unhybridised in ${spec.key}?`, opts: [`${spec.leftoverP.length}`, `${spec.leftoverP.length + 1}`, '0'], correct: 0 },
    { q: 'The angle between two sp³ hybrid lobes is', opts: ['109.47° (from cos θ = −1/3)', '120°', '90°'], correct: 0 },
    { q: 'A sigma (σ) bond forms when', opts: ['orbitals overlap head-on along the internuclear axis', 'orbitals overlap sideways', 'electrons stop moving'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [hk]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setHk('sp3'); setRpm(250); setShowP(true); setSpin(true); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [4.5, 3.5, 6.5], fov: 44 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.1} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.25)"
            fadeDistance={60} fadeStrength={1.4} infiniteGrid />
          <SpinGroup spin={spin}>
            {/* central carbon */}
            <mesh>
              <sphereGeometry args={[0.5, 36, 36]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.55} roughness={0.3} emissive="#b45309" emissiveIntensity={0.3} />
            </mesh>
            {spec.lobes.map((d, i) => (
              <HybridLobe key={i} dir={d} len={lobeLen} hot={hot && i === 0} />
            ))}
            {showP && spec.leftoverP.map((d, i) => (
              <LeftoverP key={`p${i}`} dir={d} len={lobeLen} />
            ))}
            <ApproachingH dir={spec.lobes[0]} len={Rscene} R_pm={Rpm} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={24} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[252px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">{spec.name}</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">Hybrid lobes</span><span className="text-white">{spec.lobes.length} × {spec.key}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Leftover p</span><span className="text-teal-300">{spec.leftoverP.length} (π-ready)</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Lobe angle (measured)</span><span className="text-gold-300">{measuredLobeAngle(spec.lobes).toFixed(1)}°</span></div>
            <div className="flex justify-between"><span className="text-surface-500">C…H distance R</span><span className="text-white">{Rpm.toFixed(0)} pm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">R / a₀ = ρ</span><span className="text-white">{(Rpm / A0_PM).toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Overlap S(R)</span><span className="text-gold-300">{S.toFixed(3)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">σ bond?</span><span className={Rpm <= 130 ? 'text-emerald-300' : 'text-rose-300'}>{Rpm <= 130 ? 'YES — stick shown' : 'too far'}</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Slide R to push the H 1s sphere into the gold lobe — watch S climb
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Atom className="h-3.5 w-3.5 text-gold-400" /> hybrid:</span>
        {(['sp', 'sp2', 'sp3'] as const).map((h) => (
          <button key={h} onClick={() => setHk(h)} className={btn(hk === h)}>{HYBRIDS[h].key}</button>
        ))}
        <span className="ml-3 flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> R (C…H):</span>
        <input type="range" min={70} max={400} step={5} value={Rpm}
          onChange={(e) => setRpm(Number(e.target.value))} className="h-11 w-40 accent-amber-400" />
        <span className="text-xs text-white">{Rpm} pm</span>
        <button onClick={() => setShowP(!showP)} className={btn(showP)}>show leftover p</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · WHY MIX AT ALL</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            A bare p orbital has a nodal plane — half of it points the wrong way for bonding.
            Blending in the spherical s orbital makes one fat lobe per unpaired electron,
            all identical and maximally separated. Mixing is free (s and p are close in energy)
            and the payoff is four strong bonds instead of two weak ones.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · THE ANGLES ARE ORTHOGONALITY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            sp³ hybrids h=(s±px±py±pz)/2 are orthonormal: ⟨h₁|h₂⟩=0 forces the lobe
            directions to satisfy cos θ = −1/3 → 109.47°. sp² → 120°, sp → 180°.
            The HUD re-measures the angle from the rendered vectors — orbit around and
            watch the number refuse to change.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · SIGMA vs PI</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            A σ bond is head-on overlap along the axis (this demo). A π bond is the
            sideways overlap of the LEFTOVER p orbitals (teal dumbbells) — that&apos;s why
            ethene&apos;s sp² carbons hold one σ + one π each, and why the double bond
            locks rotation. No leftover p → no π bond → free rotation (ethane vs ethene).
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Carbon excites one electron to 2p, then the 2s and 2p orbitals
            <span className="text-white"> physically melt</span> into new orbitals.&quot; No —
            hybridisation is a <span className="text-gold-300">mathematical re-mixing of wavefunctions</span>,
            not a physical event. It also is NOT the cause of bonding: CH₄ would form
            with pure p orbitals too, just weaker. Hybrids describe the geometry; energy
            release justifies the re-mix. And promotion costs energy only in storybooks —
            the real orbital picture never needs the &quot;excited atom&quot; step.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Find the R where S peaks as you slide the H in: near ρ ≈ 2 (R ≈ 106 pm) —
            then compare with the real C–H bond length of ~109 pm. Chemistry found the
            overlap sweet spot before quantum mechanics did.
            ② Switch sp³ → sp: two teal p dumbbells appear. Those are the two π bonds
            ethyne (C₂H₂) uses — count σ and π in C₂H₂, C₂H₄, CH₄.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick hybridisation questions — no marks, no shame.</p>
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
