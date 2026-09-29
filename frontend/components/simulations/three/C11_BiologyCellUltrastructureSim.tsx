'use client';

/**
 * C11_BiologyCellUltrastructureSim.tsx — 3D
 * Class 11 Biology — Cell: the Unit of Life — ultrastructure at true scale
 *
 * WHY 3D: an "animal cell" is not a fried-egg diagram. Orbiting a nucleus
 * you could walk into, mitochondria drifting in real relative proportions
 * — that is what makes the size numbers stick.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Scene scale: 1 unit = 1 µm — every solid below is built at its real
 *  literature size (nucleus ≈ 10 µm across, mitochondrion 2.5 × 0.8 µm,
 *  lysosome ≈ 0.5 µm, ribosome 0.025 µm).
 *  Microscope optics, derived:
 *      FOV = FN / M        (field number FN ≈ 18 mm for a standard
 *                           10× eyepiece; M = total magnification)
 *      e.g. M = 400 → FOV = 18000/400 = 45 µm — about 4 nuclear widths.
 *  Resolving power (Abbe, ~λ/2 with green light λ ≈ 550 nm):
 *      light microscope ≈ 0.2 µm,  TEM ≈ 0.0002 µm
 *  An organelle is flagged VISIBLE only if size ≥ resolution. That is
 *  WHY ribosomes (25 nm) need an electron microscope — computed, not
 *  memorised.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Microscope, Ruler, RotateCcw, Sparkles, CircleDot } from 'lucide-react';

const GOLD = '#fbbf24';
const CYAN = '#38bdf8';
const ROSE = '#fb7185';
const GREEN = '#34d399';
const VIOLET = '#a78bfa';

function Capsule({ pos, r, len, rot, color, label, opacity = 0.85 }: {
  pos: [number, number, number]; r: number; len: number;
  rot?: [number, number, number]; color: string; label: string; opacity?: number;
}) {
  return (
    <group position={pos} rotation={rot || [0, 0, 0]}>
      <mesh>
        <capsuleGeometry args={[r, len, 8, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25}
          transparent opacity={opacity} roughness={0.4} />
      </mesh>
      <Text position={[0, r + 0.55, 0]} fontSize={0.42} color={color}>{label}</Text>
    </group>
  );
}

export default function C11_BiologyCellUltrastructureSim() {
  const [mag, setMag] = useState(400);              // total magnification
  const [scope, setScope] = useState<'LM' | 'TEM'>('LM');

  // ── live numerics ──
  const m = useMemo(() => {
    const fnMm = scope === 'LM' ? 18 : 0.5;         // field number: eyepiece vs TEM column
    const fovUm = (fnMm * 1000) / mag;              // FOV = FN/M, in µm
    const resolutionUm = scope === 'LM' ? 0.2 : 0.0002; // Abbe limit
    const organelles = [
      { name: 'nucleus', sizeUm: 10, color: VIOLET, visible: 10 >= resolutionUm },
      { name: 'mitochondrion', sizeUm: 2.5, color: ROSE, visible: 2.5 >= resolutionUm },
      { name: 'lysosome', sizeUm: 0.5, color: GOLD, visible: 0.5 >= resolutionUm },
      { name: 'Golgi cisterna', sizeUm: 1, color: GREEN, visible: 1 >= resolutionUm },
      { name: 'ribosome', sizeUm: 0.025, color: CYAN, visible: 0.025 >= resolutionUm },
    ];
    const nucleiAcross = fovUm / 10;
    return { fovUm, resolutionUm, organelles, nucleiAcross };
  }, [mag, scope]);

  const reset = () => { setMag(400); setScope('LM'); };
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );

  // ER as a wavy line around the nucleus
  const erPts: [number, number, number][] = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 6;
      pts.push([7.4 * Math.cos(t) * (1 + 0.12 * Math.sin(3 * t)), 1.5 * Math.sin(2 * t), 6.2 * Math.sin(t) * (1 + 0.12 * Math.cos(2 * t))]);
    }
    return pts;
  }, []);

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [16, 10, 20], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[12, 16, 10]} intensity={0.9} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.4} color="#7dd3fc" />
          {/* plasma membrane */}
          <mesh>
            <sphereGeometry args={[11, 40, 28]} />
            <meshStandardMaterial color={CYAN} transparent opacity={0.06} side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
          <Line points={[[0, -11, 0], [0, 11, 0]]} color="rgba(56,189,248,0.35)" lineWidth={1} dashed dashSize={0.3} gapSize={0.2} />
          {/* nucleus + nucleolus */}
          <mesh position={[-2.5, 0.5, 0]}>
            <sphereGeometry args={[5, 36, 28]} />
            <meshStandardMaterial color={VIOLET} transparent opacity={0.5} emissive={VIOLET} emissiveIntensity={0.12} />
          </mesh>
          <mesh position={[-3.2, 1.2, 0.8]}>
            <sphereGeometry args={[1.4, 24, 20]} />
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.4} />
          </mesh>
          <Text position={[-2.5, 6.1, 0]} fontSize={0.6} color={VIOLET}>nucleus 10 µm</Text>
          {/* mitochondria */}
          <Capsule pos={[5, 3.2, 2]} r={0.4} len={1.7} rot={[0, 0, -0.5]} color={ROSE} label="mitochondria" />
          <Capsule pos={[4, -3.5, -2.5]} r={0.4} len={1.7} rot={[0.4, 0, 0.9]} color={ROSE} label="" />
          <Capsule pos={[-5.5, -4, 3]} r={0.4} len={1.7} rot={[0, 0.3, 1.2]} color={ROSE} label="" />
          {/* Golgi stack */}
          <group position={[5.5, -1, 3.2]} rotation={[0.2, 0.5, 0]}>
            {[0, 1, 2, 3].map((i) => (
              <mesh key={i} position={[0, i * 0.42 - 0.6, 0]} rotation={[0, i * 0.18, 0]}>
                <boxGeometry args={[2.6 - i * 0.3, 0.18, 1.4 - i * 0.16]} />
                <meshStandardMaterial color={GREEN} transparent opacity={0.8} />
              </mesh>
            ))}
            <Text position={[0, 1.35, 0]} fontSize={0.5} color={GREEN}>Golgi</Text>
          </group>
          {/* lysosomes */}
          {[([6.8, 2.2, -2.6] as [number, number, number]), ([-6.5, 4, -3] as [number, number, number]), ([2, 5.5, 3.5] as [number, number, number])].map((p, i) => (
            <Capsule key={i} pos={p} r={0.25} len={0} color={GOLD} label="" />
          ))}
          <Text position={[6.8, 3.1, -2.6]} fontSize={0.42} color={GOLD}>lysosomes</Text>
          {/* ER ribbon */}
          <Line points={erPts} color="#22d3ee" lineWidth={2} />
          <Text position={[0, -7.4, 7]} fontSize={0.5} color="#22d3ee">rough ER</Text>
          {/* scale bar: 5 µm */}
          <Line points={[[8.5, -8.5, 6], [13.5, -8.5, 6]]} color="#ffffff" lineWidth={2.5} />
          <Text position={[11, -9.3, 6]} fontSize={0.5} color="#e2e8f0">5 µm</Text>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={6} maxDistance={45} target={[0, 0, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[280px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Optics desk — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row(scope === 'LM' ? 'light microscope' : 'transmission EM', `M = ${mag >= 1000 ? `${(mag / 1000).toFixed(mag % 1000 ? 1 : 0)}k` : mag}×`)}
            {row('FOV = FN/M', `${m.fovUm < 1 ? (m.fovUm * 1000).toFixed(0) + ' nm' : m.fovUm.toFixed(1) + ' µm'}`, 'text-gold-300')}
            {row('→ fits N/2 nuclei across', m.nucleiAcross.toFixed(1))}
            {row('resolution limit', scope === 'LM' ? '0.2 µm (≈λ/2)' : '0.0002 µm', 'text-gold-300')}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">visibility check per organelle</div>
            {m.organelles.map((o) => (
              <div key={o.name} className="flex justify-between">
                <span className="text-surface-500">{o.name} ({o.sizeUm >= 1 ? o.sizeUm : o.sizeUm * 1000 + ' nm'.replace(' nm', o.sizeUm >= 1 ? '' : ' nm')})</span>
                <span style={{ color: o.visible ? '#34d399' : '#fb7185' }}>{o.visible ? 'visible ✓' : 'needs TEM ✗'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Every solid is built at its true relative size — 1 unit = 1 µm
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Microscope className="h-3.5 w-3.5 text-gold-400" /> instrument:</span>
        <button onClick={() => setScope('LM')} className={btn(scope === 'LM')}>light microscope</button>
        <button onClick={() => setScope('TEM')} className={btn(scope === 'TEM')}>TEM</button>
        <span className="ml-2 text-xs text-surface-400">magnification:</span>
        <input type="range" min={2} max={6} step={0.05} value={Math.log10(mag)}
          onChange={(e) => setMag(Math.round(Math.pow(10, Number(e.target.value))))}
          className="h-11 w-40 accent-amber-400" />
        <span className="w-16 text-xs text-white">{mag >= 1000 ? `${(mag / 1000).toFixed(1)}k×` : `${mag}×`}</span>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><CircleDot className="h-4 w-4" /> THE COMMANDER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The nucleus (~10 µm) holds chromatin and the nucleolus (ribosome factory).
            Orbit inside: it is roughly a fifth of the cell&apos;s width — the largest
            organelle in the scene, and the scene is honest.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Ruler className="h-4 w-4" /> FOV IS A DIVISION</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            FOV = FN/M: at ×400 you see 45 µm — about 4 nuclei wide; at ×4000 the view
            shrinks to 4.5 µm and the mitochondria no longer fit. Magnification trades
            coverage for detail, always.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> RESOLUTION ≠ MAGNIFICATION</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Zoom forever with a light microscope and ribosomes (25 nm) stay INVISIBLE —
            below the 0.2 µm Abbe limit. Only electrons (λ ~ 1000× shorter) resolve them:
            that is the LM/TEM flag flipping in the HUD.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;A more powerful microscope just makes things bigger.&quot; No —
            <span className="text-white"> magnification without resolution is empty</span>.
            Set the light microscope to ×10,000: FOV reads 1.8 µm, but the 25 nm ribosome
            still shows &quot;needs TEM ✗&quot;. You get a bigger picture of blur —
            resolution, set by wavelength (≈λ/2), is the hard wall.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① At ×100 (school microscope, low power) the FOV is 180 µm — the WHOLE cell fits
            with room to spare. Slide to ×400 and find the magnification where the nucleus
            exactly fills the view (answer ≈ ×1000).
            ② Switch to TEM: every organelle flips to visible — including ribosomes.
            Note the FOV collapses to nanometres: the electron&apos;s trade-off.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'Which organelle is INVISIBLE to a light microscope?', opts: ['ribosome (25 nm)', 'nucleus (10 µm)', 'mitochondrion (2.5 µm)'], correct: 0 },
  { q: 'At ×400, the field of view (FN = 18 mm) is…', opts: ['45 µm', '180 µm', '0.45 µm'], correct: 0 },
  { q: 'The resolution limit of a light microscope comes from…', opts: ['the wavelength of light (≈λ/2)', 'the eyepiece price', 'the slide thickness'], correct: 0 },
];

function SelfCheck() {
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      {!quiz ? (
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-sm font-bold text-white">Check yourself</div>
            <p className="text-xs text-surface-400">3 quick questions on cell ultrastructure — no marks, no shame.</p>
          </div>
          <button onClick={startQuiz} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 px-4 py-2.5 text-xs font-display font-bold text-surface-0 hover:shadow-lg hover:shadow-gold-500/30">
            Start
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
  );
}
