'use client';

/**
 * C12_PhysicsYoungDoubleSlitSim.tsx — 3D
 * Class 12 Physics — Wave Optics — Young's Double Slit Experiment
 * [3d-lab:c12-waveoptics-ydse]
 *
 * WHY 3D: YDSE is geometry — two paths from two slits to one point on a
 * screen. Seeing the arcs from both slits march out and overlap (or cancel)
 * makes "path difference" a picture instead of a subtraction.
 *
 * HONEST NUMERICS — path difference and fringe width, derived by hand:
 *   For point P at height y on a screen at distance D, with slit
 *   separation d ≪ D:
 *      r₁ = √(D² + (y+d/2)²),  r₂ = √(D² + (y−d/2)²)
 *      Δ = r₂ − r₁ = d·sinθ ≈ d·y/D   (binomial expand √(1+ε) ≈ 1+ε/2)
 *   Bright fringe when Δ = mλ; dark when Δ = (m+½)λ. Adjacent bright
 *   fringes: d·Δy/D = λ  →  fringe width  β = λD/d.
 *   Intensity (phasor sum of two equal amplitudes):
 *      I = 4I₀ cos²(δ/2),  δ = 2πΔ/λ  →  I/Imax = cos²(πΔ/λ)
 *   The probe below uses the EXACT square-root Δ (no small-angle shortcut),
 *   so students can push y out to the screen edge and watch the
 *   approximation strain — the readout shows both.
 *
 * Controls: slit separation d, wavelength λ, screen distance D, probe
 * position y, wavefront animation, Reset. (Screen half-height fixed at
 * 20 mm — fringe positions on it are drawn at TRUE scale.)
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Ruler, RotateCcw, Sparkles, Waves } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Optics (all SI)
// ─────────────────────────────────────────────────────────────

function pathDiff(D: number, y: number, d: number): { exact: number; approx: number } {
  const r1 = Math.sqrt(D * D + (y + d / 2) * (y + d / 2));
  const r2 = Math.sqrt(D * D + (y - d / 2) * (y - d / 2));
  return { exact: Math.abs(r2 - r1), approx: (d * Math.abs(y)) / D };
}

// scene mapping: x: D real → 8 units; y on screen: ±20 mm → ±3 units
const D_SCENE = 8;
const HALF_SCREEN_MM = 20;
const HALF_SCREEN_SCENE = 3;
const mm2sceneY = HALF_SCREEN_SCENE / HALF_SCREEN_MM;

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

/** marching circular wavefronts from both slits (in-phase sources) */
function WavefrontArcs({ lamScene, dScene, playing, on }: {
  lamScene: number; dScene: number; playing: boolean; on: boolean;
}) {
  const grp = useRef<THREE.Group>(null);
  const t = useRef(0);
  const N_ARC = 6;
  useFrame((_, delta) => {
    if (!grp.current) return;
    if (playing) t.current += delta;
    grp.current.children.forEach((child, i) => {
      const slitY = i < N_ARC ? dScene / 2 : -dScene / 2;
      const k = i % N_ARC;
      const phase = (t.current * 0.9) % 1;
      const r = ((k + phase) / N_ARC) * lamScene * N_ARC * 0.55;
      const m = child as THREE.Mesh;
      m.position.y = slitY;
      m.scale.setScalar(Math.max(0.001, r));
      m.visible = on && r > 0.05;
    });
  });
  return (
    <group ref={grp}>
      {Array.from({ length: N_ARC * 2 }, (_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.012, 6, 64, Math.PI]} />
          <meshBasicMaterial color={i < N_ARC ? 'rgba(251,191,36,0.5)' : 'rgba(96,165,250,0.5)'} transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

/** screen with TRUE-scale bright-fringe ticks within ±20 mm */
function ScreenWithFringes({ betaMm }: { betaMm: number }) {
  const ticks = useMemo(() => {
    const out: number[] = [];
    if (betaMm > 0.05) {
      for (let m = -40; m <= 40; m++) {
        const ymm = m * betaMm;
        if (Math.abs(ymm) <= HALF_SCREEN_MM) out.push(ymm);
      }
    }
    return out;
  }, [betaMm]);
  return (
    <group position={[D_SCENE, 0, 0]}>
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[HALF_SCREEN_SCENE * 2, 2.4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* central axis marker */}
      <mesh position={[0.01, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
        <meshBasicMaterial color="rgba(255,255,255,0.4)" />
      </mesh>
      {/* true-position bright fringes (gold ticks on the screen face) */}
      {ticks.map((ymm, i) => (
        <mesh key={i} position={[-0.015, ymm * mm2sceneY, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      ))}
      <Text position={[0, HALF_SCREEN_SCENE + 0.5, 0]} fontSize={0.3} color="#94a3b8">screen</Text>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C12_PhysicsYoungDoubleSlitSim() {
  const [dmm, setDmm] = useState(0.2);        // slit separation, mm
  const [lamNm, setLamNm] = useState(600);    // wavelength, nm
  const [Dm, setDm] = useState(2);            // screen distance, m
  const [yProbeMm, setYProbeMm] = useState(6);// probe height on screen, mm
  const [playing, setPlaying] = useState(true);
  const [arcsOn, setArcsOn] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const d = dmm * 1e-3;          // m
  const lam = lamNm * 1e-9;      // m
  const D = Dm;                  // m
  const y = yProbeMm * 1e-3;     // m

  const beta = (lam * D) / d;                 // fringe width, m
  const { exact, approx } = pathDiff(D, y, d);
  const ratio = exact / lam;                  // Δ/λ — integer = bright, half-integer = dark
  const phase = (2 * Math.PI * exact) / lam;
  const intensity = Math.pow(Math.cos(phase / 2), 2); // I/Imax
  const mNearest = Math.round(ratio);
  const verdict = intensity > 0.92 ? 'BRIGHT fringe' : intensity < 0.08 ? 'DARK fringe' : 'in between';

  // scene coordinates
  const dScene = Math.max(0.7, Math.min(2.2, dmm * 4)); // visual
  const lamScene = 2.6;                                  // visual marching wavelength
  const yProbeScene = Math.max(-HALF_SCREEN_SCENE, Math.min(HALF_SCREEN_SCENE, yProbeMm * mm2sceneY));

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'Fringe width β equals', opts: ['λD/d', 'λd/D', 'dD/λ'], correct: 0 },
    { q: 'At a point where the path difference is 5λ/2, you see', opts: ['a dark fringe', 'the brightest fringe', 'average intensity'], correct: 0 },
    { q: 'If the whole setup is dipped in water (λ shrinks), the fringes', opts: ['come closer (β ∝ λ)', 'move apart', 'vanish'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [dmm]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setDmm(0.2); setLamNm(600); setDm(2); setYProbeMm(6); setPlaying(true); setArcsOn(true); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  // scene ray endpoints
  const s1: [number, number, number] = [0, dScene / 2, 0];
  const s2: [number, number, number] = [0, -dScene / 2, 0];
  const P: [number, number, number] = [D_SCENE, yProbeScene, 0];

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [10, 4, 10], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 14, 8]} intensity={0.7} color="#ffe9b8" />
          <Grid args={[50, 50]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid position={[4, -4, 0]} />
          <group>
            {/* slit plane */}
            <mesh position={[-0.4, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[2.6, 0.1]} />
              <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={s1}>
              <sphereGeometry args={[0.09, 20, 20]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
            <mesh position={s2}>
              <sphereGeometry args={[0.09, 20, 20]} />
              <meshBasicMaterial color="#60a5fa" />
            </mesh>
            <Text position={[-0.5, dScene / 2 + 0.4, 0]} fontSize={0.26} color="#fbbf24">S₁</Text>
            <Text position={[-0.5, -dScene / 2 - 0.4, 0]} fontSize={0.26} color="#60a5fa">S₂</Text>

            {/* marching wavefronts */}
            <WavefrontArcs lamScene={lamScene} dScene={dScene} playing={playing} on={arcsOn} />

            {/* rays to the probe point P */}
            <Line points={[s1, P]} color="rgba(251,191,36,0.85)" lineWidth={2} />
            <Line points={[s2, P]} color="rgba(96,165,250,0.85)" lineWidth={2} />

            {/* probe */}
            <mesh position={P}>
              <sphereGeometry args={[0.12, 20, 20]} />
              <meshStandardMaterial color={intensity > 0.5 ? '#fbbf24' : '#475569'} emissive={intensity > 0.5 ? '#b45309' : '#000'} emissiveIntensity={intensity} />
            </mesh>

            <ScreenWithFringes betaMm={beta * 1000} />
          </group>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[3, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[262px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">YDSE — exact Δ, live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">slit separation d</span><span className="text-white">{dmm.toFixed(2)} mm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">wavelength λ</span><span className="text-white">{lamNm} nm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">screen distance D</span><span className="text-white">{Dm.toFixed(1)} m</span></div>
            <div className="flex justify-between"><span className="text-surface-500">β = λD/d</span><span className="text-gold-300">{(beta * 1000).toFixed(2)} mm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">probe y</span><span className="text-white">{yProbeMm.toFixed(1)} mm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Δ exact / approx</span><span className="text-white">{(exact * 1e6).toFixed(3)} / {(approx * 1e6).toFixed(3)} µm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Δ/λ = m</span><span className="text-gold-300">{ratio.toFixed(3)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">I/Imax = cos²(πΔ/λ)</span><span className="text-gold-300">{intensity.toFixed(3)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">verdict</span><span className={intensity > 0.92 ? 'text-emerald-300' : intensity < 0.08 ? 'text-rose-300' : 'text-surface-300'}>{verdict} (nearest m = {mNearest})</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Gold ticks on the screen sit at TRUE fringe positions within ±20 mm
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> d:</span>
        <input type="range" min={0.05} max={0.5} step={0.01} value={dmm} onChange={(e) => setDmm(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{dmm.toFixed(2)} mm</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Waves className="h-3.5 w-3.5 text-gold-400" /> λ:</span>
        <input type="range" min={400} max={700} step={10} value={lamNm} onChange={(e) => setLamNm(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{lamNm} nm</span>
        <span className="ml-2 text-xs text-surface-400">D:</span>
        <input type="range" min={1} max={4} step={0.1} value={Dm} onChange={(e) => setDm(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="ml-2 text-xs text-surface-400">probe y:</span>
        <input type="range" min={-20} max={20} step={0.5} value={yProbeMm} onChange={(e) => setYProbeMm(Number(e.target.value))} className="h-11 w-36 accent-amber-400" />
        <button onClick={() => setPlaying(!playing)} className={btn(playing)}>{playing ? 'pause arcs' : 'play arcs'}</button>
        <button onClick={() => setArcsOn(!arcsOn)} className={btn(arcsOn)}>wavefronts</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · PATH DIFFERENCE IS GEOMETRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Expand √(D² + (y±d/2)²) binomially and Δ = r₂ − r₁ = d·y/D (small angle:
            d·sinθ). No physics yet — pure triangles. Physics enters when we demand
            Δ = mλ for bright, (m+½)λ for dark: waves ADD or CANCEL depending on how
            many wavelengths fit in the extra path.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · β = λD/d — THE MEASURING STICK</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Adjacent bright fringes are where Δ grows by exactly λ: d·β/D = λ.
            This is how the wavelength of LIGHT was first measured (Young, 1801):
            a ruler, two slits, and β. Watch β double when you halve d — and shrink
            3× when d goes 3×.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · INTERFERENCE CONSERVES ENERGY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            I = 4I₀cos²(δ/2): maxima carry 4× one slit&apos;s intensity, minima carry
            zero — average over a fringe = 2I₀, exactly the two slits&apos; worth.
            Light is redistributed, never destroyed. The probe readout is this exact
            cosine-squared, evaluated from the exact Δ.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Dark fringes mean light + light = darkness — energy disappears.&quot;
            No — energy is <span className="text-white">moved, not destroyed</span>:
            every dark band is paid for by a bright band carrying four times a single
            slit&apos;s intensity. Also, the fringes are not &quot;photons landing in
            lines because they choose paths&quot; — Δ/λ near a half-integer makes the
            probability itself vanish, one photon at a time. Check the exact vs
            approximate Δ at y = 20 mm: the small-angle approx is already off —
            geometry always wins at the edges.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Land the probe exactly on m = 2 (slide until Δ/λ reads 2.000) — then
            switch λ from 600 to 400 nm: the same physical point now reads Δ/λ = 3.000.
            Bright becomes bright again but for a different order — colour the fringes
            and you get spectra.
            ② Push the probe to y = ±20 mm and compare exact vs approximate Δ: the
            mismatch is why real labs keep D huge and angles tiny.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick YDSE questions — no marks, no shame.</p>
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
