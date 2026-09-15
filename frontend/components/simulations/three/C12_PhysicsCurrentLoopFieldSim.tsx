'use client';

/**
 * C12_PhysicsCurrentLoopFieldSim.tsx — 3D
 * Class 12 Physics — Moving Charges & Magnetism — B of a Current Loop
 * [3d-lab:c12-movingcharges-loop]
 *
 * WHY 3D: the right-hand rule IS 3D. Curl your fingers with the current,
 * thumb along B — you can only verify it by orbiting the loop while the
 * field arrows light up along the axis.
 *
 * HONEST NUMERICS — B on the axis derived by hand from Biot–Savart:
 *   dB = (μ₀/4π)·I·dl×r̂ / r². Each element of a circular loop (radius R,
 *   in the yz-plane) sees the same distance r = √(R²+x²) to an axial point,
 *   and dl ⊥ r. The components of dB PERPENDICULAR to the axis cancel with
 *   the diametrically opposite element; only the axial component survives,
 *   and the geometry of the cancellation gives its factor:
 *      dB_axial = dB · (R/r)
 *      B = ∫dB_axial = (μ₀ I R / 4π r³) ∮dl = (μ₀ I R · 2πR)/(4π r³)
 *        = μ₀ I R² / [2(R² + x²)^{3/2}]
 *   Centre (x=0): B = μ₀I/2R. Long solenoid (n turns/m): B = μ₀nI.
 *   Every arrow length below is this exact function, evaluated live.
 *
 * Controls: current I, loop radius R, probe position x on the axis,
 * loop/solenoid mode, current animation direction, Reset.
 */

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, Ruler, RotateCcw, Sparkles, Compass } from 'lucide-react';

const MU0 = 4 * Math.PI * 1e-7; // T·m/A

// ─────────────────────────────────────────────────────────────
// Loop field mathematics (see header derivation)
// ─────────────────────────────────────────────────────────────

function Baxis(I: number, R: number, x: number): number {
  return (MU0 * I * R * R) / (2 * Math.pow(R * R + x * x, 1.5));
}

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

/** the wire loop with animated charge dots sliding around it */
function CurrentLoop({
  R, dir, running, phaseRef,
}: {
  R: number; dir: 1 | -1; running: boolean; phaseRef: React.MutableRefObject<number>;
}) {
  const dots = useMemo(() => Array.from({ length: 24 }, (_, i) => (i / 24) * Math.PI * 2), []);
  const grp = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (running) phaseRef.current += delta * 1.6 * dir;
    if (grp.current) grp.current.rotation.x = 0; // loop stays in yz-plane
    dots.forEach((_, i) => {
      const m = grp.current?.children[i] as THREE.Mesh | undefined;
      if (!m) return;
      const a = dots[i] + phaseRef.current;
      m.position.set(0, R * Math.cos(a), R * Math.sin(a));
    });
  });
  const tube = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push([0, R * Math.cos(a), R * Math.sin(a)]);
    }
    return pts;
  }, [R]);
  return (
    <group>
      <Line points={tube} color="#fbbf24" lineWidth={2.5} />
      <group ref={grp}>
        {dots.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[R * 0.055 + 0.03, 10, 10]} />
            <meshStandardMaterial color="#f87171" emissive="#dc2626" emissiveIntensity={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** axial B-field arrows — length ∝ B(x) at that point, re-evaluated live */
function AxialFieldArrows({ I, R, dir, spacing }: { I: number; R: number; dir: 1 | -1; spacing: number }) {
  const arrows = useMemo(() => {
    const out: { x: number; len: number }[] = [];
    const B0 = Baxis(I, R, 0) || 1;
    for (let x = -8; x <= 8.01; x += spacing) {
      // real metres: scene unit = 10 cm → scene x_s → x_m = x_s*0.1, R in scene units
      const xm = x * 0.1, Rm = R * 0.1;
      const B = Baxis(I, Rm, Math.abs(xm));
      out.push({ x, len: 0.25 + (B / B0) * 1.15 });
    }
    return out;
  }, [I, R, spacing]);
  return (
    <group>
      {/* ALL axial arrows point the same way — B passes THROUGH the loop
          and only curls back far off-axis. Flip sign with current dir. */}
      {arrows.map(({ x, len }, i) => (
        <group key={i} position={[x, 0, 0]} rotation={[0, 0, dir === 1 ? -Math.PI / 2 : Math.PI / 2]}>
          <mesh position={[0, len / 2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, len, 6]} />
            <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.45} transparent opacity={0.85} />
          </mesh>
          <mesh position={[0, len + 0.09, 0]}>
            <coneGeometry args={[0.07, 0.18, 10]} />
            <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.45} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** solenoid mode: a stack of loops */
function Solenoid({ R, turns, dir, running, phaseRef }: {
  R: number; turns: number; dir: 1 | -1; running: boolean; phaseRef: React.MutableRefObject<number>;
}) {
  const zs = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < turns; i++) out.push(-4.2 + (8.4 * i) / Math.max(1, turns - 1));
    return out;
  }, [turns]);
  return (
    <group>
      {zs.map((z, i) => (
        <group key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <CurrentLoop R={R} dir={dir} running={running && i === 0} phaseRef={phaseRef} />
        </group>
      ))}
    </group>
  );
}

function SpinGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.18;
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C12_PhysicsCurrentLoopFieldSim() {
  const [Iamp, setIAmp] = useState(5);        // A
  const [Rcm, setRcm] = useState(10);         // loop radius, cm
  const [xcm, setXcm] = useState(20);         // probe position on axis, cm
  const [mode, setMode] = useState<'loop' | 'solenoid'>('loop');
  const [dirn, setDirn] = useState<1 | -1>(1);
  const [running, setRunning] = useState(true);
  const [spin, setSpin] = useState(true);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const phaseRef = useRef(0);

  const Rm = Rcm / 100, xm = xcm / 100;
  const B0 = Baxis(Iamp, Rm, 0);          // centre field, T
  const Bx = Baxis(Iamp, Rm, xm);         // probe field, T
  const nTurns = 120;                     // solenoid turns over 0.8 m
  const nPerM = nTurns / 0.8;
  const Bsol = MU0 * nPerM * Iamp;

  const Rscene = Rcm / 10;

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'At the centre of a circular loop, B equals', opts: ['μ₀I/2R', 'μ₀I/4πR', 'μ₀nI'], correct: 0 },
    { q: 'Far from the loop on the axis (x ≫ R), B falls as', opts: ['1/x³ (dipole tail)', '1/x²', '1/x'], correct: 0 },
    { q: 'Curl right-hand fingers WITH the current; the thumb points', opts: ['along B through the loop centre', 'against the current', 'radially outward'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [mode]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setIAmp(5); setRcm(10); setXcm(20); setMode('loop'); setDirn(1); setRunning(true); setSpin(true); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [7, 5, 10], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.0} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[50, 50]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid />
          <SpinGroup spin={spin}>
            {mode === 'loop' ? (
              <group rotation={[Math.PI / 2, 0, 0]}>
                <CurrentLoop R={Rscene} dir={dirn} running={running} phaseRef={phaseRef} />
              </group>
            ) : (
              <Solenoid R={Rscene * 0.6} turns={11} dir={dirn} running={running} phaseRef={phaseRef} />
            )}
            <AxialFieldArrows I={Iamp} R={mode === 'solenoid' ? Rscene * 0.6 : Rscene} dir={dirn} spacing={1.6} />
            {/* probe marker on the axis */}
            <group position={[xcm / 10, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.6} />
              </mesh>
              <Text position={[0, 0.45, 0]} fontSize={0.3} color="#fbbf24">probe</Text>
            </group>
            {mode === 'loop' && (
              <Text position={[0, Rscene + 0.55, 0]} fontSize={0.3} color="rgba(251,191,36,0.85)">
                I = {Iamp} A {dirn === 1 ? '(anticlockwise seen from +x)' : '(reversed)'}
              </Text>
            )}
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[252px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">{mode === 'loop' ? 'Circular loop' : 'Solenoid'} — Biot–Savart live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">current I</span><span className="text-white">{Iamp.toFixed(1)} A</span></div>
            <div className="flex justify-between"><span className="text-surface-500">radius R</span><span className="text-white">{Rcm} cm</span></div>
            {mode === 'loop' ? (
              <>
                <div className="flex justify-between"><span className="text-surface-500">B at centre (μ₀I/2R)</span><span className="text-gold-300">{(B0 * 1e6).toFixed(2)} µT</span></div>
                <div className="flex justify-between"><span className="text-surface-500">probe x</span><span className="text-white">{xcm} cm</span></div>
                <div className="flex justify-between"><span className="text-surface-500">B(x) at probe</span><span className="text-gold-300">{(Bx * 1e6).toFixed(2)} µT</span></div>
                <div className="flex justify-between"><span className="text-surface-500">B(x)/B(0)</span><span className="text-white">{(Bx / B0).toFixed(3)}</span></div>
              </>
            ) : (
              <>
                <div className="flex justify-between"><span className="text-surface-500">turns / m (n)</span><span className="text-white">{nPerM.toFixed(0)} m⁻¹</span></div>
                <div className="flex justify-between"><span className="text-surface-500">B inside (μ₀nI)</span><span className="text-gold-300">{(Bsol * 1e3).toFixed(3)} mT</span></div>
                <div className="flex justify-between"><span className="text-surface-500">uniform?</span><span className="text-white">yes — long-solenoid limit</span></div>
              </>
            )}
            <div className="flex justify-between"><span className="text-surface-500">Earth&apos;s field ≈</span><span className="text-surface-400">50 µT (compare!)</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Orbit down the axis: every blue arrow has length ∝ the true B(x)
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Zap className="h-3.5 w-3.5 text-gold-400" /> I:</span>
        <input type="range" min={0.5} max={15} step={0.5} value={Iamp} onChange={(e) => setIAmp(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{Iamp.toFixed(1)} A</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> R:</span>
        <input type="range" min={4} max={20} step={1} value={Rcm} onChange={(e) => setRcm(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{Rcm} cm</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Compass className="h-3.5 w-3.5 text-gold-400" /> probe x:</span>
        <input type="range" min={0} max={80} step={1} value={xcm} onChange={(e) => setXcm(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{xcm} cm</span>
        <button onClick={() => setMode(mode === 'loop' ? 'solenoid' : 'loop')} className={btn(mode === 'solenoid')}>solenoid</button>
        <button onClick={() => setDirn((d) => (d === 1 ? -1 : 1))} className={btn(dirn === -1)}>reverse I</button>
        <button onClick={() => setRunning(!running)} className={btn(running)}>flow</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · BIOT–SAVART BUILDS IT</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Every tiny wire element contributes dB = (μ₀/4π)I dl×r̂/r². For a loop viewed
            from its axis, all the sideways components cancel in pairs and the axial ones
            add: that is exactly how the factor R/r sneaks into the integral and produces
            B = μ₀IR²/2(R²+x²)^{3/2}. Integration, not magic.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · A LOOP IS A MAGNETIC DIPOLE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Far away (x ≫ R) the loop field dies as μ₀(πRI)/2πx³ — the same 1/r³ tail as
            a bar magnet or a dipole. Slide the probe out: the readout ratio B(x)/B(0)
            heads to zero fast. A current loop has magnetic moment m = I·A — that IS the
            bar magnet inside a solenoid.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · SOLENOID = STACKED LOOPS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Stack loops and their interiors overlap: inside a long solenoid the transverse
            parts keep cancelling, leaving a nearly UNIFORM B = μ₀nI along the axis — the
            field that deflects electrons in your CRT and lifts cars in a scrapyard (with
            an iron core). Same right-hand rule, now gripping the whole coil.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The magnetic field is created along the wire, flowing outward like
            current.&quot; No — B wraps AROUND each wire element (right-hand rule per
            element), and along the axis it is the <span className="text-white">sum of
            all elements pointing one way</span> through the loop&apos;s mouth. Reverse the
            current: the arrows flip but the geometry doesn&apos;t — field direction is a
            consequence of the cross product dl×r̂, never a &quot;flow&quot;.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set R = 10 cm, I = 5 A: centre field reads ≈ 31.4 µT — about 2/3 of Earth&apos;s
            magnetic field from a single desk-scale loop. Now compare with the solenoid
            mode: ≈ 0.94 mT, thirty times stronger.
            ② Double the probe distance twice (20 → 40 → 80 cm): B drops ~8× then ~8× again —
            watch B(x)/B(0) confirm the cubic law in real numbers.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick loop-field questions — no marks, no shame.</p>
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
