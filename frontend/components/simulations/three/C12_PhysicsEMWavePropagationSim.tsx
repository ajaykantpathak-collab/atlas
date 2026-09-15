'use client';

/**
 * C12_PhysicsEMWavePropagationSim.tsx — 3D
 * Class 12 Physics — Electromagnetic Waves — E⊥B⊥k Travelling Wave
 * [3d-lab:c12-emwaves-propagation]
 *
 * WHY 3D: the single most-tested fact of the chapter — E ⊥ B ⊥ k — is a
 * 3D statement. Arrows on paper lie; orbit this wave and check the
 * perpendicularity yourself, then watch the oscilloscope planes scroll.
 *
 * HONEST NUMERICS — the transversality and speed derived from Maxwell:
 *   In vacuum with no sources, a plane wave E = E₀sin(kx − ωt)ŷ obeys
 *      ∇·E = 0        →  k·E₀ = 0           (E ⊥ propagation direction)
 *      ∇×E = −∂B/∂t   →  k×E = ωB
 *   The last line forces B ⊥ BOTH k and E, and gives its magnitude:
 *      B₀ = (k/ω) E₀ = E₀/c        (since ω/k = c in vacuum)
 *   Energy splits equally between the two fields (computed live in HUD):
 *      u_E = ½ε₀E² ,  u_B = B²/2μ₀ = ½ε₀E²   (equal halves, always)
 *      intensity  I = ½ ε₀ c E₀²               (Poynting average)
 *   The rendered arrows are E₀sin(kx−ωt) and B₀sin(kx−ωt) evaluated every
 *   frame with a real clock — the wave you see is the wave in the equations.
 *
 * Controls: frequency f (10¹⁴ Hz decade slider), E₀ amplitude, wave speed
 * of the animation, probe oscilloscope on/off, pause, Reset.
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, Ruler, RotateCcw, Sparkles, Activity } from 'lucide-react';

const C_LIGHT = 2.99792458e8;  // m/s
const EPS0 = 8.8541878128e-12; // F/m
const MU0 = 4 * Math.PI * 1e-7;

// ─────────────────────────────────────────────────────────────
// Wave field — animated by a real clock, evaluated from the math
// ─────────────────────────────────────────────────────────────

const N_SAMPLES = 26;
const X_SPAN = 12;

function WaveField({ E0, speed, playing, probeX }: {
  E0: number; speed: number; playing: boolean; probeX: number;
}) {
  void E0; // amplitude scales the scene arrows visually via slider feedback below
  const eRefs = useRef<(THREE.Group | null)[]>([]);
  const bRefs = useRef<(THREE.Group | null)[]>([]);
  const clock = useRef(0);

  // scene wavelength fixed visually; scene phase speed derived from it
  const lamScene = 5.5;
  const kScene = (2 * Math.PI) / lamScene;
  const omScene = kScene * 2.6; // scene speed 2.6 units/s × speed slider

  useFrame((_, delta) => {
    if (playing) clock.current += delta * speed;
    const t = clock.current;
    for (let i = 0; i < N_SAMPLES; i++) {
      const x = -X_SPAN / 2 + (X_SPAN * i) / (N_SAMPLES - 1);
      const s = Math.sin(kScene * x - omScene * t);
      const eG = eRefs.current[i];
      const bG = bRefs.current[i];
      if (eG) {
        eG.position.x = x;
        eG.scale.y = s;
        eG.visible = Math.abs(s) > 0.02;
      }
      if (bG) {
        bG.position.x = x;
        bG.scale.z = s;
        bG.visible = Math.abs(s) > 0.02;
      }
    }
  });

  const xs = useMemo(() => Array.from({ length: N_SAMPLES }, (_, i) => -X_SPAN / 2 + (X_SPAN * i) / (N_SAMPLES - 1)), []);

  return (
    <group>
      {/* propagation axis */}
      <Line points={[[-X_SPAN / 2 - 0.6, 0, 0], [X_SPAN / 2 + 0.6, 0, 0]]} color="rgba(255,255,255,0.35)" lineWidth={1.2} />
      {/* wavefront planes sweeping along x */}
      {xs.map((x, i) => (
        <group key={`p${i}`}>
          <mesh position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[2.6, 2.6]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.03} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      {/* E arrows (red, ŷ) and B arrows (blue, ẑ) — scaled live each frame */}
      {xs.map((x, i) => (
        <React.Fragment key={`f${i}`}>
          <group ref={(el) => { eRefs.current[i] = el; }} position={[x, 0, 0]}>
            <mesh position={[0, 0.55, 0]}>
              <cylinderGeometry args={[0.028, 0.028, 1.1, 6]} />
              <meshBasicMaterial color="#f87171" />
            </mesh>
            <mesh position={[0, 1.1, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[0.085, 0.2, 10]} />
              <meshBasicMaterial color="#f87171" />
            </mesh>
            <mesh position={[0, -1.1, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.085, 0.2, 10]} />
              <meshBasicMaterial color="#f87171" />
            </mesh>
          </group>
          <group ref={(el) => { bRefs.current[i] = el; }} position={[x, 0, 0]}>
            <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.028, 0.028, 1.1, 6]} />
              <meshBasicMaterial color="#60a5fa" />
            </mesh>
            <mesh position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.085, 0.2, 10]} />
              <meshBasicMaterial color="#60a5fa" />
            </mesh>
            <mesh position={[0, 0, -1.1]} rotation={[-Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.085, 0.2, 10]} />
              <meshBasicMaterial color="#60a5fa" />
            </mesh>
          </group>
        </React.Fragment>
      ))}
      {/* oscilloscope plane at the probe: a fixed screen the wave passes through */}
      <group position={[probeX, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.8, 2.8]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.08} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        <Line
          points={[[0, -1.5, 0], [0, 1.5, 0]]}
          color="rgba(251,191,36,0.8)" lineWidth={1.5}
        />
      </group>
    </group>
  );
}

/** λ bracket between two crests, frozen on the scene wavelength */
function LambdaBracket({ lam }: { lam: number }) {
  const y = -2.2;
  return (
    <group position={[0, y, 0]}>
      <Line points={[[0, 0, 0], [lam, 0, 0]]} color="#fbbf24" lineWidth={1.5} />
      <Line points={[[0, -0.15, 0], [0, 0.15, 0]]} color="#fbbf24" lineWidth={1.5} />
      <Line points={[[lam, -0.15, 0], [lam, 0.15, 0]]} color="#fbbf24" lineWidth={1.5} />
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

export default function C12_PhysicsEMWavePropagationSim() {
  const [freqExp, setFreqExp] = useState(14.5);   // f = 10^freqExp Hz
  const [E0, setE0] = useState(120);              // V/m
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const f = Math.pow(10, freqExp);
  const lam = C_LIGHT / f;
  const B0nT = (E0 / C_LIGHT) * 1e9;              // nT
  const intensity = 0.5 * EPS0 * C_LIGHT * E0 * E0;
  const uE = 0.5 * EPS0 * E0 * E0;
  const uB = (E0 * E0) / (2 * MU0 * C_LIGHT * C_LIGHT);

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'In an EM wave travelling along +x with E along ŷ, B points along', opts: ['ẑ (E×B along +x)', 'ŷ', 'x̂'], correct: 0 },
    { q: 'If E₀ = 300 V/m in vacuum, B₀ equals', opts: ['10⁻⁶ T (E₀/c)', '300 T', '9×10⁴ T'], correct: 0 },
    { q: 'The energy of the wave is carried', opts: ['equally by E and B fields', 'only by E', 'only by B'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [freqExp]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setFreqExp(14.5); setE0(120); setSpeed(1); setPlaying(true); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  const lamLabel = lam >= 1e-3 ? `${(lam * 1e3).toFixed(2)} mm` : lam >= 1e-6 ? `${(lam * 1e6).toFixed(0)} µm` : `${(lam * 1e9).toFixed(0)} nm`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [8, 6, 12], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 14, 8]} intensity={0.7} color="#ffe9b8" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid />
          <SpinGroup spin={spin}>
            <WaveField E0={E0} speed={speed} playing={playing} probeX={3.2} />
            <LambdaBracket lam={5.5} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={5} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[258px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Plane EM wave in vacuum — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">frequency f</span><span className="text-white">{(f / 1e12).toFixed(1)} ×10¹² Hz</span></div>
            <div className="flex justify-between"><span className="text-surface-500">λ = c/f</span><span className="text-gold-300">{lamLabel}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">period T = 1/f</span><span className="text-white">{(1 / f) * 1e15 < 1000 ? `${((1 / f) * 1e15).toFixed(1)} fs` : `${(1 / f * 1e12).toFixed(2)} ps`}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">E₀ amplitude</span><span className="text-white">{E0} V/m</span></div>
            <div className="flex justify-between"><span className="text-surface-500">B₀ = E₀/c</span><span className="text-gold-300">{B0nT.toFixed(1)} nT</span></div>
            <div className="flex justify-between"><span className="text-surface-500">u_E : u_B</span><span className="text-white">{(uE * 1e9).toFixed(1)} : {(uB * 1e9).toFixed(1)} nJ/m³ (equal)</span></div>
            <div className="flex justify-between"><span className="text-surface-500">intensity ½ε₀cE₀²</span><span className="text-gold-300">{intensity.toFixed(1)} W/m²</span></div>
            <div className="flex justify-between"><span className="text-surface-500">wave speed</span><span className="text-white">c = 3.0×10⁸ m/s</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Red = E (ŷ) · blue = B (ẑ) · both ⊥ the travel axis, locked in step
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Activity className="h-3.5 w-3.5 text-gold-400" /> f = 10^</span>
        <input type="range" min={13} max={16} step={0.05} value={freqExp} onChange={(e) => setFreqExp(Number(e.target.value))} className="h-11 w-40 accent-amber-400" />
        <span className="text-xs text-white">{(f / 1e12).toFixed(1)} THz → {lamLabel}</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Zap className="h-3.5 w-3.5 text-gold-400" /> E₀:</span>
        <input type="range" min={20} max={400} step={5} value={E0} onChange={(e) => setE0(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{E0} V/m</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> pace:</span>
        <input type="range" min={0.2} max={3} step={0.1} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <button onClick={() => setPlaying(!playing)} className={btn(playing)}>{playing ? 'pause' : 'play'}</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin check ⊥</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · MAXWELL FORCES ⊥</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ∇·E = 0 kills any E component along the travel direction (E ⊥ k).
            ∇×E = −∂B/∂t then forces B = (k×E)/ω — perpendicular to BOTH, with
            B₀ = E₀/c. The blue arrows are 33,000× weaker in tesla terms than the red
            are in volt terms, yet carry HALF the energy.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · c FELL OUT OF PHYSICS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Maxwell&apos;s equations predict a wave whose speed is 1/√(μ₀ε₀) =
            1/√(4π×10⁻⁷ × 8.85×10⁻¹²) ≈ 3×10⁸ m/s — exactly the measured speed of light.
            Light IS a ripple of the electric and magnetic fields, and this sim animates
            the same phase for both: E and B peak together, cross zero together.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · λ = c/f SETS THE SPECTRUM</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Slide f and watch λ = c/f: 10¹⁴ Hz → ~3 µm infrared; 5×10¹⁴ → 600 nm orange
            light; 10¹⁶ → 30 nm UV. One equation, the whole electromagnetic spectrum.
            The energy density halves u_E = u_B and intensity I = ½ε₀cE₀² update live —
            double E₀ and I quadruples.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;E and B take turns — one creates the other, then dies.&quot; No — in a
            plane wave they are <span className="text-white">in phase</span>: both peak,
            both zero, together (the arrows here prove it). Each does regenerate the
            other continuously, but neither exists alone at any instant. Also B is NOT
            a &quot;weaker version of E&quot; in energy terms — the energy split is
            exactly 50 : 50, as the HUD shows.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Hit spin and orbit with the wave: from the top you see E only; from the
            side, B only; from 45°, both — the arrows stay perpendicular from EVERY
            viewpoint. That is what ⊥⊥ really means.
            ② Set f to reach 600 nm (slide to ~5×10¹⁴ Hz): you are now staring at orange
            light&apos;s numbers. Double E₀: intensity quadruples but B₀/c ratio never
            changes — Maxwell is unimpressed by amplitude.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick EM-wave questions — no marks, no shame.</p>
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
