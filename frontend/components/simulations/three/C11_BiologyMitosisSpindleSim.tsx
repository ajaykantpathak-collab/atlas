'use client';

/**
 * C11_BiologyMitosisSpindleSim.tsx — 3D
 * Class 11 Biology — Cell Cycle and Division: the mitotic spindle
 *
 * WHY 3D: chromosome capture is a CYLINDER of microtubules hunting in
 * 3D space — the classic flat "mitosis circle" hides the geometry of
 * capture, congression and segregation.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Spindle: poles at ±D/2 (human cell D ≈ 10 µm). Kinetochore
 *  microtubules run pole → chromosome; polar microtubules pole → pole.
 *  Anaphase kinetochore speed (real, measured in living cells):
 *      v ≈ 1 µm/min  (slider 0.25–2)
 *  From v = Δx/Δt:   chromatid displacement  x(t) = v·t  (anaphase A)
 *      time to pole  Δt = (D/2 − x₀)/v
 *  Metaphase plate sits at the equator x = 0 — the capture geometry is
 *  symmetric, so equal tension from both poles centres each chromosome
 *  (tug-of-war balance, not a wall).
 *  2n = 4 demo cell → 2 homologous pairs drawn; sister chromatids share
 *  one kinetochore until anaphase.
 */

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Split, Timer, RotateCcw, Sparkles, Play } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const CYAN = '#38bdf8';
const GREEN = '#34d399';

function Chromosome({
  pos, color, long, phase, sep,
}: {
  pos: [number, number, number]; color: string; long: boolean;
  phase: 'prophase' | 'metaphase' | 'anaphase' | 'telophase'; sep: number;
}) {
  // X-shape = two sister chromatids joined at centromere; in anaphase they split
  const half = long ? 1.1 : 0.8;
  const gap = phase === 'anaphase' || phase === 'telophase' ? 0.28 + sep * 0.12 : 0.12;
  const arms: [[number, number, number], [number, number, number]][] = [
    [[-gap, -half, 0], [-gap * 0.3, 0, 0]],
    [[gap, half, 0], [gap * 0.3, 0, 0]],
    [[-gap, half, 0], [-gap * 0.3, 0, 0]],
    [[gap, -half, 0], [gap * 0.3, 0, 0]],
  ];
  return (
    <group position={pos}>
      {arms.map(([a, b], i) => (
        <Line key={i} points={[a, b]} color={color} lineWidth={5} />
      ))}
    </group>
  );
}

/** animates anaphase motion at the real slider speed */
function MovingChromosome({
  vUmMin, D, phase, playing, tRef, side, color, long,
}: {
  vUmMin: number; D: number; phase: 'prophase' | 'metaphase' | 'anaphase' | 'telophase';
  playing: boolean; tRef: React.MutableRefObject<number>; side: -1 | 1; color: string; long: boolean;
}) {
  const grp = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (playing && phase === 'anaphase') tRef.current = Math.min(tRef.current + delta, 12);
    if (grp.current) {
      const x0 = 0.6; // starts just off the plate
      const x = side * Math.min(x0 + vUmMin * tRef.current, D / 2 - 0.4);
      grp.current.position.x = x;
    }
  });
  const x0 = 0.6;
  const x = side * Math.min(x0 + vUmMin * tRef.current, D / 2 - 0.4);
  return (
    <group ref={grp} position={[x, 0, 0]}>
      <Chromosome pos={[0, 0, 0]} color={color} long={long} phase={phase} sep={Math.min(vUmMin * tRef.current, 3)} />
    </group>
  );
}

export default function C11_BiologyMitosisSpindleSim() {
  const [phase, setPhase] = useState<'prophase' | 'metaphase' | 'anaphase' | 'telophase'>('metaphase');
  const [D, setD] = useState(10);          // pole-to-pole distance, µm
  const [v, setV] = useState(1);          // kinetochore speed µm/min
  const [playing, setPlaying] = useState(false);
  const tRef = useRef(0);

  const setPhaseSafe = (p: typeof phase) => {
    setPhase(p);
    if (p === 'metaphase' || p === 'prophase') tRef.current = 0;
    if (p === 'anaphase') tRef.current = 0;
    if (p === 'telophase') tRef.current = 12;
  };

  // ── live numerics ──
  const m = useMemo(() => {
    const t = tRef.current;
    const x = Math.min(0.6 + v * t, D / 2 - 0.4);   // displacement from plate
    const toPole = Math.max(D / 2 - x, 0);           // remaining distance
    const eta = toPole / v;                          // Δt = Δx/v — derived
    const progress = Math.min(((x - 0.6) / (D / 2 - 1.0)) * 100, 100);
    return { t, x, toPole, eta, progress };
  }, [v, D, phase, playing, tRef.current]);

  const reset = () => { setPhase('metaphase'); setD(10); setV(1); setPlaying(false); tRef.current = 0; };
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v2: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v2}</span></div>
  );

  // spindle fibre endpoints
  const poleL: [number, number, number] = [-D / 2, 0, 0];
  const poleR: [number, number, number] = [D / 2, 0, 0];
  const fibres: { from: [number, number, number]; to: [number, number, number]; kinetochore: boolean }[] = [];
  // kinetochore MTs to the metaphase plate positions (and anaphase positions)
  const targets: [number, number, number][] = [
    [-0.6, 0, 0], [0.6, 0, 0], [-0.6, 1.6, 1.2], [0.6, -1.6, -1.2],
  ];
  for (const tg of targets) {
    fibres.push({ from: poleL, to: [tg[0] - 0.25, tg[1], tg[2]], kinetochore: tg[0] < 1 });
    fibres.push({ from: poleR, to: [tg[0] + 0.25, tg[1], tg[2]], kinetochore: tg[0] > -1 });
  }
  // overlapping polar MTs
  for (const dz of [-1.4, -0.5, 0.5, 1.4]) {
    fibres.push({ from: [poleL[0], dz * 0.6, dz], to: [poleR[0], dz * 0.6, dz], kinetochore: false });
  }

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [3, 6, 14], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 10, 8]} intensity={0.8} color="#ffe9b8" />
          {/* spindle apparatus */}
          <group rotation={[0, 0, 0]}>
            {fibres.map((f, i) => (
              <Line key={i}
                points={[
                  [f.from[0], f.from[1], f.from[2]],
                  phase === 'prophase' && f.kinetochore
                    ? [f.to[0] * 0.4, f.to[1], f.to[2]]   // MTs still probing outward
                    : [f.to[0], f.to[1], f.to[2]],
                ]}
                color={f.kinetochore ? 'rgba(56,189,248,0.7)' : 'rgba(167,139,250,0.5)'}
                lineWidth={f.kinetochore ? 1.6 : 1.2} />
            ))}
            {/* poles (centrosomes) */}
            {[poleL, poleR].map((p, i) => (
              <group key={i} position={p}>
                <mesh>
                  <sphereGeometry args={[0.3, 20, 20]} />
                  <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} />
                </mesh>
                {Array.from({ length: 7 }).map((_, k) => (
                  <mesh key={k} position={[side0(i) * 0.55, Math.sin(k) * 0.5, Math.cos(k * 2.1) * 0.5]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.4} />
                  </mesh>
                ))}
              </group>
            ))}
            {/* chromosomes per phase */}
            {(phase === 'prophase' || phase === 'metaphase') && (
              <>
                <Chromosome pos={[-0.6, 0, 0]} color={ROSE} long phase={phase} sep={0} />
                <Chromosome pos={[0.6, 0, 0]} color={GREEN} long={false} phase={phase} sep={0} />
                <Chromosome pos={[-0.6, 1.6, 1.2]} color={GREEN} long phase={phase} sep={0} />
                <Chromosome pos={[0.6, -1.6, -1.2]} color={ROSE} long={false} phase={phase} sep={0} />
                {phase === 'prophase' && (
                  <Text position={[0, 3.4, 0]} fontSize={0.5} color={GOLD}>nuclear envelope breaking down · MTs hunting</Text>
                )}
                {phase === 'metaphase' && (
                  <Text position={[0, 3.4, 0]} fontSize={0.5} color={CYAN}>metaphase plate — equal tug from both poles</Text>
                )}
              </>
            )}
            {(phase === 'anaphase' || phase === 'telophase') && (
              <>
                <MovingChromosome vUmMin={v} D={D} phase={phase} playing={playing} tRef={tRef} side={-1} color={ROSE} long />
                <MovingChromosome vUmMin={v} D={D} phase={phase} playing={playing} tRef={tRef} side={1} color={GREEN} long={false} />
                <Text position={[0, 3.4, 0]} fontSize={0.5} color={phase === 'anaphase' ? ROSE : GOLD}>
                  {phase === 'anaphase' ? 'anaphase A — kinetochores walk to the poles' : 'telophase — two nuclei reform'}
                </Text>
              </>
            )}
          </group>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={28} target={[0, 0, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[272px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Spindle telemetry — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('pole-to-pole D', `${D.toFixed(1)} µm`)}
            {row('kinetochore speed v', `${v.toFixed(2)} µm/min`, 'text-gold-300')}
            {row('anaphase clock t', `${m.t.toFixed(1)} min`)}
            {row('displacement x = v·t', `${(Math.min(0.6 + v * m.t, D / 2 - 0.4) - 0.6).toFixed(2)} µm`, 'text-cyan-300')}
            {row('distance to pole', `${m.toPole.toFixed(2)} µm`)}
            {row('ETA = Δx/v', `${m.eta.toFixed(1)} min`, 'text-gold-300')}
            {row('segregation progress', `${m.progress.toFixed(0)}%`)}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              demo cell 2n = 4 · real anaphase ≈ 1 µm/min
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Blue = kinetochore MTs · violet = polar MTs · each chromatid walks at ~1 µm/min
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Split className="h-3.5 w-3.5 text-gold-400" /> phase:</span>
        {(['prophase', 'metaphase', 'anaphase', 'telophase'] as const).map((p) => (
          <button key={p} onClick={() => setPhaseSafe(p)} className={btn(phase === p)}>{p}</button>
        ))}
        <span className="ml-2 text-xs text-surface-400">D:</span>
        <input type="range" min={6} max={14} step={0.5} value={D}
          onChange={(e) => setD(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-white">{D.toFixed(1)} µm</span>
        <span className="text-xs text-surface-400">v:</span>
        <input type="range" min={0.25} max={2} step={0.25} value={v}
          onChange={(e) => setV(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-white">{v.toFixed(2)} µm/min</span>
        <button onClick={() => setPlaying(!playing)} className={btn(playing)}>
          <Play className="mr-1 inline h-3 w-3" />{playing ? 'pause' : 'run anaphase'}
        </button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Split className="h-4 w-4" /> CAPTURE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            In prophase the microtubules shoot out and shrink back, &quot;searching&quot;.
            When one finds a kinetochore it is captured and stabilised — watch the blue
            fibres shorten in prophase mode. Random search, selective keep.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Timer className="h-4 w-4" /> THE PLATE IS BALANCE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            A chromosome sits at the equator because BOTH poles pull with equal force.
            Nudge the symmetry (imagine D unequal) and it drifts to the stronger side —
            the plate is a stable tug-of-war, not a painted line.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> SLOW IS THE POINT</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            1 µm/min sounds slow — but at real scale it is brisk: a 10 µm spindle halves in
            ~5 minutes, matching actual mitosis timing (30–60 min for the whole division,
            anaphase itself just minutes). The ETA readout is honest physics.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Chromosomes move to the poles by themselves — the cell squeezes them
            apart.&quot; No — <span className="text-white">they are WALKED there</span> by
            kinesin/dynein motors depolymerising kinetochore microtubules at ~1 µm/min.
            Set v = 0.25 and v = 2: the ETA changes from 24 min to 3 min. No speed dial,
            no squeezing — just polymer chemistry at a fixed walking pace.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Run anaphase at v = 1 with D = 10: the HUD logs ~4.4 min to the pole —
            compare with the real figure (anaphase A lasts ~5 min). Then set v = 2 and
            watch halve — Δt = Δx/v in action.
            ② Press prophase: the kinetochore MTs only reach 40% of the way — capture
            has NOT happened yet. That is why prometaphase exists.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

function side0(i: number) { return i === 0 ? -1 : 1; }

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'Chromosomes align at the metaphase plate because…', opts: ['opposite poles pull with equal force', 'they are glued to the equator', 'the cell squeezes them'], correct: 0 },
  { q: 'Kinetochore microtubules connect…', opts: ['pole to chromosome kinetochore', 'pole to plasma membrane', 'chromosome to chromosome'], correct: 0 },
  { q: 'At v = 1 µm/min, a chromatid 4 µm from its pole takes about…', opts: ['4 minutes', '4 seconds', '40 minutes'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on the mitotic spindle — no marks, no shame.</p>
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
