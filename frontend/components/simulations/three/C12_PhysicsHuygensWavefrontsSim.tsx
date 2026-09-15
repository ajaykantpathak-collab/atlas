'use client';

/**
 * C12_PhysicsHuygensWavefrontsSim.tsx — 3D
 * Class 12 Physics — Wave Optics — Huygens' Principle: Reflection & Refraction
 * [3d-lab:c12-optics-huygens]
 *
 * WHY 3D: Huygens' construction is a geometric machine — every point of a
 * wavefront sprouts a secondary wavelet; the new wavefront is their common
 * tangent. Building that envelope live, for reflection AND refraction, is
 * the deepest "why" in the wave-optics chapter.
 *
 * HONEST NUMERICS — the laws of reflection and refraction derived by hand:
 *   REFLECTION: wavefront AB hits mirror MM′. While B travels to B′ on the
 *   mirror (time t = BB′/v), A spreads a wavelet of radius AA′ = vt. The
 *   new wavefront A′B′ is the common tangent. Right triangles AA′B′ and
 *   BB′A′ share the hypotenuse AB′ and have equal legs (AA′ = BB′):
 *      △AA′B′ ≅ △BB′A′   →   angle i = angle r
 *   REFRACTION: the same construction with slower wavelets (v₂ < v₁):
 *      sin i = BB′/AB′,   sin r = AA₂′/AB′ = v₂t/AB′
 *      →  sin i / sin r = v₁/v₂  = n₂/n₁   (Snell, from geometry alone)
 *      and TIR appears automatically when sin i > v₂/v₁ would demand
 *      sin r > 1 — the sim announces it rather than drawing a fake ray.
 *   Every wavefront and wavelet below marches on one shared clock with
 *   radii exactly v·(t − t_emit); the refracted direction is recomputed
 *   from Snell on every slider move.
 *
 * Controls: mode (reflect/refract), incidence angle i, medium speed ratio
 * v₂/v₁, wavefront spacing λ, play/pause, Reset.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, Sparkles, Waves, Repeat } from 'lucide-react';

const V1 = 3.2; // wavelet speed in medium 1 (scene units/s)

// ─────────────────────────────────────────────────────────────
// Marching plane wavefronts: lines ⊥ k̂ sweeping along k̂
// (evenly spaced λ apart, wrapping seamlessly over a window = count·λ)
// ─────────────────────────────────────────────────────────────

const mod = (a: number, n: number) => ((a % n) + n) % n;

function marchingWavefronts(khat: [number, number], speed: number, lam: number, t: number, count: number, base: [number, number]): [number, number, number][][] {
  const tHat: [number, number] = [-khat[1], khat[0]];
  const window = count * lam;
  const out: [number, number, number][][] = [];
  for (let j = 0; j < count; j++) {
    const s = mod(t * speed + j * lam, window) - window / 2;
    const cx = base[0] + khat[0] * s;
    const cy = base[1] + khat[1] * s;
    const L = 9;
    out.push([
      [cx + tHat[0] * L, cy + tHat[1] * L, 0],
      [cx - tHat[0] * L, cy - tHat[1] * L, 0],
    ]);
  }
  return out;
}

function WavefrontFamily({ khat, speed, lam, running, color, base, count }: {
  khat: [number, number]; speed: number; lam: number; running: boolean;
  color: string; base: [number, number]; count: number;
}) {
  const clock = useRef(0);
  const refs = useRef<(THREE.BufferGeometry | null)[]>([]);
  useFrame((_, delta) => {
    if (running) clock.current += delta;
    const fams = marchingWavefronts(khat, speed, lam, clock.current, count, base);
    fams.forEach((seg, j) => {
      const geo = refs.current[j];
      if (!geo) return;
      const pos = geo.getAttribute('position') as THREE.BufferAttribute;
      pos.setXYZ(0, seg[0][0], seg[0][1], 0);
      pos.setXYZ(1, seg[1][0], seg[1][1], 0);
      pos.needsUpdate = true;
    });
  });
  return (
    <group>
      {Array.from({ length: count }, (_, j) => (
        <line key={j}>
          <bufferGeometry ref={(el) => { refs.current[j] = el; }}>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(6), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={color} linewidth={1.5} transparent opacity={0.75} />
        </line>
      ))}
    </group>
  );
}

/** secondary wavelets: circles of radius v·(t − t_emit) at fixed origin points */
function Wavelets({ xs, speed, lam, running, color, yBase }: {
  xs: number[]; speed: number; lam: number; running: boolean; color: string; yBase: number;
}) {
  const clock = useRef(0);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((_, delta) => {
    if (running) clock.current += delta;
    xs.forEach((x, i) => {
      const m = refs.current[i];
      if (!m) return;
      const phase = ((clock.current * speed / lam - i * 0.29) % 1 + 1) % 1;
      const r = phase * lam;
      m.position.set(x, yBase, 0);
      m.scale.setScalar(Math.max(0.001, r));
      (m.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - phase) + 0.12;
    });
  });
  return (
    <group>
      {xs.map((_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.94, 1, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
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

export default function C12_PhysicsHuygensWavefrontsSim() {
  const [mode, setMode] = useState<'reflect' | 'refract'>('refract');
  const [iDeg, setIDeg] = useState(45);
  const [ratio, setRatio] = useState(0.66); // v2/v1
  const [lam, setLam] = useState(2.2);
  const [running, setRunning] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const i = (iDeg * Math.PI) / 180;
  const sinI = Math.sin(i);
  const sinR = Math.min(1, (mode === 'refract' ? ratio : 1) * sinI);
  const tir = mode === 'refract' && ratio * sinI >= 1;
  const rRad = Math.asin(sinR);
  const rDeg = (rRad * 180) / Math.PI;

  // propagation directions (normal = vertical)
  const kIn: [number, number] = [Math.sin(i), -Math.cos(i)];
  const kRef: [number, number] = mode === 'reflect'
    ? [Math.sin(i), Math.cos(i)]
    : [Math.sin(rRad), -Math.cos(rRad)];
  const speed2 = mode === 'reflect' ? V1 : V1 * ratio;

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'In Huygens\' construction, the new wavefront is', opts: ['the common tangent (envelope) of the secondary wavelets', 'the largest wavelet', 'the line joining the sources'], correct: 0 },
    { q: 'Snell\'s law sin i/sin r = v₁/v₂ comes from', opts: ['the wavelet geometry — no extra physics', 'energy conservation', 'photons choosing paths'], correct: 0 },
    { q: 'Light enters a denser medium (v₂ < v₁). It bends', opts: ['toward the normal (sin r = (v₂/v₁) sin i)', 'away from the normal', 'not at all'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [mode]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setMode('refract'); setIDeg(45); setRatio(0.66); setLam(2.2); setRunning(true); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  const waveletXs = [-4.5, -2.7, -0.9, 0.9, 2.7, 4.5];
  const boundaryY = -2;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [0, 1, 15], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 14, 8]} intensity={0.6} color="#ffe9b8" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid position={[0, -6, 0]} />
          <SpinGroup spin={spin}>
            {/* interface / mirror */}
            <Line points={[[-9, boundaryY, 0], [9, boundaryY, 0]]} color={mode === 'reflect' ? '#cbd5e1' : '#38bdf8'} lineWidth={3} />
            <Text position={[7.6, boundaryY - 0.55, 0]} fontSize={0.3} color={mode === 'reflect' ? '#cbd5e1' : '#38bdf8'}>
              {mode === 'reflect' ? 'mirror' : 'interface (slow medium below)'}
            </Text>
            {mode === 'refract' && (
              <>
                <Text position={[-7.9, 1.4, 0]} fontSize={0.3} color="#fbbf24">medium 1 · v₁</Text>
                <Text position={[-7.9, -3.4, 0]} fontSize={0.3} color="#38bdf8">medium 2 · v₂ = {(ratio).toFixed(2)}v₁</Text>
              </>
            )}

            {/* incident wavefronts + wavelets at the boundary */}
            <WavefrontFamily khat={kIn} speed={V1} lam={lam} running={running} color="rgba(251,191,36,0.85)" base={[0, 1.2]} count={4} />
            <Wavelets xs={waveletXs} speed={V1} lam={lam} running={running} color="#fbbf24" yBase={boundaryY} />

            {/* the constructed wavefront: reflected (up) or refracted (down) */}
            {!tir && (
              <WavefrontFamily khat={kRef} speed={speed2} lam={lam} running={running}
                color={mode === 'reflect' ? 'rgba(96,165,250,0.9)' : 'rgba(45,212,191,0.9)'}
                base={mode === 'reflect' ? [0, 1.2] : [0, boundaryY - 2.2]} count={4} />
            )}
            {tir && (
              <Text position={[0, -4.2, 0]} fontSize={0.42} color="#f87171">
                TOTAL INTERNAL REFLECTION — sin r would exceed 1
              </Text>
            )}

            {/* normal + angle labels */}
            <Line points={[[0, boundaryY, 0], [0, 3.4, 0]]} color="rgba(255,255,255,0.35)" lineWidth={1} dashed dashSize={0.2} gapSize={0.15} />
            <Text position={[0.4, 3.5, 0]} fontSize={0.28} color="#94a3b8">normal</Text>
            <Text position={[-3.4, 2.1, 0]} fontSize={0.34} color="#fbbf24">i = {iDeg}°</Text>
            {!tir && (
              <Text
                position={mode === 'reflect' ? [3.4, 2.1, 0] : [3.4, boundaryY - 2.1, 0]}
                fontSize={0.34}
                color={mode === 'reflect' ? '#60a5fa' : '#2dd4bf'}
              >
                {mode === 'reflect' ? `r = ${rDeg.toFixed(0)}° ( = i )` : `r = ${rDeg.toFixed(1)}°`}
              </Text>
            )}
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={5} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[262px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Huygens construction — live envelope</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">mode</span><span className="text-white">{mode}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">incidence i</span><span className="text-white">{iDeg}° (sin i = {sinI.toFixed(3)})</span></div>
            {mode === 'refract' && (
              <div className="flex justify-between"><span className="text-surface-500">v₂/v₁ (and sin r/sin i)</span><span className="text-white">{ratio.toFixed(2)}</span></div>
            )}
            <div className="flex justify-between">
              <span className="text-surface-500">{mode === 'reflect' ? 'r (from congruence)' : 'r (from Snell)'}</span>
              <span className="text-gold-300">{tir ? 'TIR' : `${rDeg.toFixed(1)}°`}</span>
            </div>
            {!tir && (
              <div className="flex justify-between">
                <span className="text-surface-500">check: sin i / sin r</span>
                <span className="text-gold-300">{(sinI / sinR).toFixed(3)} = v₁/v₂ ✓</span>
              </div>
            )}
            {mode === 'refract' && (
              <div className="flex justify-between"><span className="text-surface-500">n₂/n₁ = v₁/v₂</span><span className="text-white">{(1 / ratio).toFixed(3)}</span></div>
            )}
            <div className="flex justify-between"><span className="text-surface-500">wavefront spacing λ</span><span className="text-white">{lam.toFixed(1)} u</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Gold rings are Huygens wavelets — the coloured lines are their common tangent (the new wavefront)
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Repeat className="h-3.5 w-3.5 text-gold-400" /> mode:</span>
        <button onClick={() => setMode('reflect')} className={btn(mode === 'reflect')}>reflection</button>
        <button onClick={() => setMode('refract')} className={btn(mode === 'refract')}>refraction</button>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Waves className="h-3.5 w-3.5 text-gold-400" /> i:</span>
        <input type="range" min={5} max={85} step={1} value={iDeg} onChange={(e) => setIDeg(Number(e.target.value))} className="h-11 w-36 accent-amber-400" />
        <span className="text-xs text-white">{iDeg}°</span>
        {mode === 'refract' && (
          <>
            <span className="ml-2 text-xs text-surface-400">v₂/v₁:</span>
            <input type="range" min={0.33} max={1.4} step={0.01} value={ratio} onChange={(e) => setRatio(Number(e.target.value))} className="h-11 w-36 accent-amber-400" />
            <span className="text-xs text-white">{ratio.toFixed(2)}</span>
          </>
        )}
        <span className="ml-2 text-xs text-surface-400">λ:</span>
        <input type="range" min={1.2} max={3.5} step={0.1} value={lam} onChange={(e) => setLam(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <button onClick={() => setRunning(!running)} className={btn(running)}>{running ? 'pause' : 'play'}</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · EVERY POINT IS A SOURCE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Huygens&apos; one bold move: treat every point of a wavefront as a fresh
            source of spherical wavelets moving at wave speed v; the wavefront a
            moment later is just their common tangent. The gold rings here do exactly
            that — watch the tangent line sweep along, always kissing every ring.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · REFLECTION = CONGRUENCE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            While B of the wavefront reaches the mirror, A&apos;s wavelet grows by the
            same distance. Two right triangles with equal legs and a shared
            hypotenuse are congruent — angle of incidence EQUALS angle of reflection,
            with zero trigonometry memorised. Switch to reflection mode and see the
            blue envelope leave at your exact i.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · SNELL FROM SLOWER WAVELETS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            In a denser medium wavelets crawl (v₂ &lt; v₁), so the tangent tilts
            TOWARD the normal: sin i/sin r = v₁/v₂. That ratio IS the refractive
            index n₂/n₁ — light bends because it SLOWS. Push v₂/v₁ above 1 and
            steepen i until sin r wants to exceed 1: total internal reflection,
            announced honestly instead of faked.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Huygens wavelets are real little waves you could detect between the
            wavefronts.&quot; No — the construction is a <span className="text-white">geometric
            machine</span> for predicting the envelope; the wavelets interfere away
            everywhere except the tangent direction. And frequency NEVER changes
            across an interface — wavelength and speed do (λ₂ = v₂/v₁ · λ₁, which is
            why the refracted wavefront lines pack closer below the interface here).
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Refraction mode, v₂/v₁ = 0.66 (glass-like), slide i until the HUD
            reports r = 30°: sin 45°/sin 30° = 1.414 = n of glass. The angles you
            measure on a spectrometer are this exact geometry.
            ② Raise v₂/v₁ to 1.33 (fast-to-slow reversed!) and push i past 48.8°:
            TIR. That critical angle is why optical fibres and diamond brilliance
            work — all from one tangent construction.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick Huygens questions — no marks, no shame.</p>
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
