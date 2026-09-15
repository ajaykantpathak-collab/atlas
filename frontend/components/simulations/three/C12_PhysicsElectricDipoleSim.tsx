'use client';

/**
 * C12_PhysicsElectricDipoleSim.tsx — 3D
 * Class 12 Physics — Electric Charges & Fields — Dipole Field + Torque
 * [3d-lab:c12-charges-dipole]
 *
 * WHY 3D: a dipole's field lines are loops leaving +q and spiralling into
 * −q. Flat textbook arrows hide the fact that the lines CLOSE in 3D —
 * orbit this and follow one with your eye.
 *
 * HONEST NUMERICS — field-line equation derived by hand:
 *   Dipole field in polar form about its centre (axis = x here):
 *      E_r = 2p cosθ / (4πε₀ r³),   E_θ = p sinθ / (4πε₀ r³)
 *   A field line is everywhere tangent to E, so its slope obeys
 *      dr / (r dθ) = E_r / E_θ = 2 cotθ
 *      → ∫ dr/r = 2 ∫ cotθ dθ → ln r = 2 ln sinθ + const
 *      →  r = C · sin²θ
 *   Every curve rendered in this sim is exactly that equation — the +q/−q
 *   charges sit where the C-curves converge. Nothing is hand-drawn.
 *
 * Torque & energy in a uniform field (computed live):
 *      τ = pE sinφ,   U = −pE cosφ,   p = q·d
 *   and "Release" integrates the real pendulum equation
 *      I φ̈ = −pE sinφ
 *   with a fixed-step Euler loop — small φ gives SHM at ω = √(pE/I),
 *   large φ gives wild tumbling, both from the SAME equation.
 *
 * Controls: charge q, separation d, external field E, dipole angle φ,
 * Release (free dynamics), field-line density, Reset.
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, Ruler, RotateCcw, Sparkles, Magnet } from 'lucide-react';

const K = 8.9875517923e9; // 1/4πε₀  N·m²/C²

// ─────────────────────────────────────────────────────────────
// Dipole mathematics
// ─────────────────────────────────────────────────────────────

/** points on the analytic field line r = C·sin²θ, axis along +x */
function fieldLinePts(C: number, scale: number, rotY = 0): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 1; i < 200; i++) {
    const th = (i / 200) * Math.PI;
    const r = C * Math.sin(th) * Math.sin(th);
    const x = r * Math.cos(th) * scale;
    const y = r * Math.sin(th) * scale;
    const c = Math.cos(rotY), s = Math.sin(rotY);
    pts.push([x, y * c, y * s]);
  }
  return pts;
}

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

function FieldLines({ linesC, scale }: { linesC: number[]; scale: number }) {
  return (
    <group>
      {linesC.map((C, i) => {
        // one fan in the xy-plane and one in the xz-plane (3D closure)
        const yz = i % 2 === 0 ? 0 : Math.PI / 2;
        return (
          <group key={i}>
            <Line points={fieldLinePts(C, scale, yz)} color="rgba(251,191,36,0.55)" lineWidth={1.4} />
            <Line points={fieldLinePts(C, scale, yz + Math.PI)} color="rgba(251,191,36,0.55)" lineWidth={1.4} />
            <Line points={fieldLinePts(-C, scale, yz)} color="rgba(251,191,36,0.55)" lineWidth={1.4} />
            <Line points={fieldLinePts(-C, scale, yz + Math.PI)} color="rgba(251,191,36,0.55)" lineWidth={1.4} />
          </group>
        );
      })}
    </group>
  );
}

function UniformFieldArrows({ spacing, eScale }: { spacing: number; eScale: number }) {
  const arrows: React.ReactNode[] = [];
  const positions: [number, number, number][] = [];
  for (let x = -6; x <= 6; x += spacing)
    for (let z = -4.5; z <= 4.5; z += spacing)
      if (Math.abs(x) > 1.6 || Math.abs(z) > 2.4) positions.push([x, 0, z]);
  positions.forEach(([x, y, z], i) => {
    arrows.push(
      <group key={i} position={[x, y, z]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, eScale * 0.3]}>
          <cylinderGeometry args={[0.022, 0.022, eScale * 0.6, 6]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.5} emissive="#0369a1" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0, eScale * 0.62]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.06, 0.16, 8]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.55} emissive="#0369a1" emissiveIntensity={0.3} />
        </mesh>
      </group>,
    );
  });
  return <group>{arrows}</group>;
}

/** the dipole: +q/−q spheres + p arrow, rotates by φ; release integrates Iφ¨ = −pE sinφ */
function DipoleBody({
  phiRef, aScene, playing, freeRun, E0, pVal,
}: {
  phiRef: React.MutableRefObject<{ phi: number; om: number }>;
  aScene: number; playing: boolean; freeRun: boolean; E0: number; pVal: number;
}) {
  const grp = useRef<THREE.Group>(null);
  const I = 0.9; // demo moment of inertia (scene units) — ω = √(pE/I)
  useFrame((_, delta) => {
    if (freeRun && playing) {
      const st = phiRef.current;
      const steps = 8;
      const dt = Math.min(delta, 0.05) / steps;
      for (let i = 0; i < steps; i++) {
        const alpha = (-pVal * E0 * Math.sin(st.phi)) / I;  // I φ¨ = −pE sinφ
        st.om += alpha * dt;
        st.phi += st.om * dt;
      }
    }
    if (grp.current) grp.current.rotation.z = phiRef.current.phi;
  });
  return (
    <group ref={grp}>
      {/* p arrow: −q → +q */}
      <Line points={[[-aScene, 0, 0], [aScene, 0, 0]]} color="#fbbf24" lineWidth={2} />
      <mesh position={[aScene, 0, 0]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#f87171" emissive="#dc2626" emissiveIntensity={0.45} metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[-aScene, 0, 0]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.45} metalness={0.4} roughness={0.35} />
      </mesh>
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

export default function C12_PhysicsElectricDipoleSim() {
  const [qnC, setQnC] = useState(10);        // charge magnitude, nC
  const [dcm, setDcm] = useState(5);         // separation 2a in cm
  const [eExp, setEExp] = useState(5);       // external field E = 10^eExp N/C
  const [phiDeg, setPhiDeg] = useState(45);
  const [freeRun, setFreeRun] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [nLines, setNLines] = useState(3);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const qv = qnC * 1e-9;
  const d = dcm / 100;
  const p = qv * d;                          // C·m
  const E0 = Math.pow(10, eExp);
  const phi = (phiDeg * Math.PI) / 180;
  const tau = p * E0 * Math.sin(phi);        // N·m
  const U = -p * E0 * Math.cos(phi);         // J
  const rProbe = 0.10;                       // 10 cm probe on the axis
  const E_axial = (2 * K * p) / Math.pow(rProbe, 3);
  const E_equa = K * p / Math.pow(rProbe, 3);

  const phiRef = useRef({ phi: phi, om: 0 });
  useEffect(() => {
    phiRef.current = { phi, om: 0 };
    setFreeRun(false);
  }, [phiDeg]); // eslint-disable-line react-hooks/exhaustive-deps

  // scene scale: a (half separation) → aScene units
  const aScene = (dcm / 5) * 1.1;
  const linesC = useMemo(
    () => Array.from({ length: nLines * 2 }, (_, i) => (0.55 + i * 0.5) * aScene),
    [nLines, aScene],
  );
  const lineScale = 1 / Math.max(0.4, aScene) * 3.2; // grows C-curves to scene size

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'On the equatorial line of a dipole, E compared to the axial value at the same r is', opts: ['Half', 'Double', 'Equal'], correct: 0 },
    { q: 'The dipole is in STABLE equilibrium when φ (angle from E) equals', opts: ['0° — U = −pE minimum', '90°', '180°'], correct: 0 },
    { q: 'Net force on a dipole in a UNIFORM field is', opts: ['zero (only torque acts)', 'pE', 'qE'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [eExp]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => {
    setQnC(10); setDcm(5); setEExp(5); setPhiDeg(45);
    setFreeRun(false); setPlaying(true); setNLines(3); setQuiz(null);
  };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [5, 5, 10], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.0} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[50, 50]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid />
            <SpinGroup spin={freeRun}>
              <FieldLines linesC={linesC} scale={lineScale} />
              <UniformFieldArrows spacing={2.4} eScale={Math.min(1.6, 0.5 + eExp * 0.18)} />
            <DipoleBody phiRef={phiRef} aScene={aScene} playing={playing} freeRun={freeRun}
              E0={0.6 * Math.pow(10, eExp - 5) /* scene-scaled drive: ω=√(pE/I) stays 1–20 rad/s */}
              pVal={p * 1e9} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[258px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Electric dipole — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">q (each charge)</span><span className="text-white">{qnC.toFixed(1)} nC</span></div>
            <div className="flex justify-between"><span className="text-surface-500">separation d</span><span className="text-white">{dcm.toFixed(1)} cm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">p = q·d</span><span className="text-gold-300">{(p * 1e9).toFixed(2)} ×10⁻⁹ C·m</span></div>
            <div className="flex justify-between"><span className="text-surface-500">external E</span><span className="text-white">{(E0 / 1000).toFixed(0)} kN/C</span></div>
            <div className="flex justify-between"><span className="text-surface-500">τ = pE·sinφ</span><span className="text-gold-300">{(tau * 1e6).toFixed(2)} µN·m</span></div>
            <div className="flex justify-between"><span className="text-surface-500">U = −pE·cosφ</span><span className="text-gold-300">{(U * 1e6).toFixed(2)} µJ</span></div>
            <div className="flex justify-between"><span className="text-surface-500">E axis @10 cm</span><span className="text-white">{(E_axial / 1000).toFixed(1)} kN/C</span></div>
            <div className="flex justify-between"><span className="text-surface-500">E equatorial @10 cm</span><span className="text-white">{(E_equa / 1000).toFixed(1)} kN/C</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Gold loops are true field lines r = C·sin²θ · blue arrows = uniform external field
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Zap className="h-3.5 w-3.5 text-gold-400" /> q:</span>
        <input type="range" min={1} max={40} step={1} value={qnC} onChange={(e) => setQnC(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{qnC} nC</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> d:</span>
        <input type="range" min={2} max={10} step={0.5} value={dcm} onChange={(e) => setDcm(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{dcm} cm</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Magnet className="h-3.5 w-3.5 text-gold-400" /> E:</span>
        <input type="range" min={3} max={7} step={0.1} value={eExp} onChange={(e) => setEExp(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">10^{eExp.toFixed(1)} N/C</span>
        <span className="ml-2 text-xs text-surface-400">φ:</span>
        <input type="range" min={0} max={180} step={1} value={phiDeg} onChange={(e) => setPhiDeg(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{phiDeg}°</span>
        <button onClick={() => setFreeRun(!freeRun)} className={btn(freeRun)}>{freeRun ? 'hold φ' : 'release → dynamics'}</button>
        <button onClick={() => setPlaying(!playing)} className={btn(playing)}>{playing ? 'pause' : 'play'}</button>
        <button onClick={() => setNLines((n) => (n >= 4 ? 2 : n + 1))} className={btn(false)}>{nLines}× lines</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · FIELD FALLS AS 1/r³</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            A single charge fades as 1/r². A dipole&apos;s two charges nearly cancel, so
            only a weaker remainder survives: E_axial = 2kp/r³, E_equatorial = kp/r³ — half
            the axial value. The HUD probe at 10 cm updates live as you change q and d.
            A dipole is the first &quot;multipole&quot;: harder to see, faster to die away.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · LINES CLOSE IN 3D</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Every gold curve is r = C·sin²θ, derived from dr/(r dθ) = 2cotθ. Lines leave
            +q, arc over, and land on −q — they form closed loops in the full 3D view.
            Drag the camera along the axis to see the pattern the flat diagram never shows.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · TORQUE, NOT FORCE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            In a UNIFORM field the two forces +qE and −qE cancel — net force zero — but
            they form a couple: τ = pE·sinφ, U = −pE·cosφ. Press release and the same
            equation Iφ̈ = −pE sinφ runs live: align at φ→0, unstable flip at 180°.
            Non-uniform field? Then a net force appears too (the comb picks paper).
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Field lines can cross, and they exist physically.&quot; No — two lines
            crossing would mean <span className="text-white">two field directions at one
            point</span>, which is impossible. And the lines are a bookkeeping device;
            what physically exists is the FIELD at every point. Also: a dipole at 180°
            (anti-aligned) is an equilibrium, but an UNSTABLE one — press release there
            and watch the smallest numeric nudge from integration flip it over.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set φ = 90° and release with E = 10⁵ N/C — watch the oscillation. Then raise
            E to 10⁷: same equation, much faster swing (ω = √(pE/I)).
            ② Double d from 5 → 10 cm with q fixed: p doubles and the axial probe field at
            10 cm doubles. Now instead double q AND d: 4×. Quadrupling p — that&apos;s the
            lever the dipole moment gives you.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick dipole questions — no marks, no shame.</p>
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
