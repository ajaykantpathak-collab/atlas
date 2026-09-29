'use client';

/**
 * C11_MathsProbabilityDiceTowerSim.tsx — 3D
 * Class 11 Maths — Probability: sample space of two dice
 *
 * WHY 3D: the sample space of two dice is a 6×6 FIELD, and every event is
 * a SHAPE cut out of it. "Sum = 7" is a diagonal slash; "doubles" is the
 * main diagonal; the sum distribution builds itself as a mountain. Rows of
 * stacked cubes make counting visible.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Two fair dice ⇒ 36 equally likely ORDERED pairs, so
 *      P(cell) = 1/36 ≈ 0.0278          (classical definition)
 *  Event "sum = s": the diagonal d₁ + d₂ = s cuts
 *      N(s) = 6 − |s − 7|               cells
 *  (count the lattice points on the diagonal: for s ≤ 7 there are s−1,
 *   for s ≥ 7 there are 13−s — one formula: 6−|s−7|)
 *      P(sum = s) = (6 − |s − 7|) / 36
 *      P(sum ≥ k) = Σ_{s≥k} N(s) / 36   (accumulated live by counting)
 *  The distribution 1,2,3,4,5,6,5,4,3,2,1 /36 is a fact of COUNTING, not
 *  of the dice — the tower shows every cell of it.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Grid } from '@react-three/drei';
import { Dices, Percent, RotateCcw, Sparkles, Grid3x3 } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const CYAN = '#38bdf8';

const pairSum = (d1: number, d2: number) => d1 + d2;
/** N(s) = 6 − |s−7| derived in the header */
const waysFor = (s: number) => 6 - Math.abs(s - 7);

export default function C11_MathsProbabilityDiceTowerSim() {
  const [target, setTarget] = useState(7);
  const [view, setView] = useState<'field' | 'tower'>('field');
  const [showDiagonal, setShowDiagonal] = useState(true);

  const m = useMemo(() => {
    // live counting over the whole sample space — no canned tables
    let ways = 0;
    const cells: { d1: number; d2: number; s: number; hit: boolean }[] = [];
    for (let d1 = 1; d1 <= 6; d1++) {
      for (let d2 = 1; d2 <= 6; d2++) {
        const s = pairSum(d1, d2);
        const hit = s === target;
        if (hit) ways++;
        cells.push({ d1, d2, s, hit });
      }
    }
    let cum = 0; // P(sum ≥ target) by counting
    for (let s = target; s <= 12; s++) cum += waysFor(s);
    const dist = Array.from({ length: 11 }, (_, i) => ({ s: i + 2, n: waysFor(i + 2) }));
    return { ways, cells, pEq: ways / 36, pGe: cum / 36, dist };
  }, [target]);

  const reset = () => { setTarget(7); setView('field'); setShowDiagonal(true); };
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [9, 8, 11], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 12, 6]} intensity={0.9} color="#ffe9b8" />
          <Grid args={[24, 24]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={3}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={50} fadeStrength={1.2} />
          {view === 'field' ? (
            /* sample-space field: 36 stacks of 1, hit-cells rise higher */
            <group position={[-3.5, 0, -3.5]}>
              {m.cells.map(({ d1, d2, hit }, idx) => (
                <group key={idx} position={[d1, 0, d2]}>
                  {/* one cube per outcome — every cell identical: fair dice */}
                  <mesh position={[0, 0.25, 0]}>
                    <boxGeometry args={[0.92, 0.5, 0.92]} />
                    <meshStandardMaterial
                      color={hit ? GOLD : 'rgba(148,163,184,0.35)'}
                      emissive={hit ? GOLD : '#334155'}
                      emissiveIntensity={hit ? 0.55 : 0.15}
                      transparent={!hit} opacity={hit ? 1 : 0.5} />
                  </mesh>
                  {showDiagonal && hit && (
                    <mesh position={[0, 0.85, 0]}>
                      <boxGeometry args={[0.7, 0.7, 0.7]} />
                      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.7} />
                    </mesh>
                  )}
                </group>
              ))}
              <Text position={[3.5, 0.05, 7.4]} fontSize={0.42} color="#94a3b8">die 1 →</Text>
              <Text position={[7.4, 0.05, 3.5]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.42} color="#94a3b8">die 2 →</Text>
              <Text position={[3.5, 1.7, 3.5]} fontSize={0.4} color={GOLD}>{m.ways} cells give sum = {target}</Text>
            </group>
          ) : (
            /* sum-distribution tower: N(s) cubes stacked per sum */
            <group position={[-6, 0, 0]}>
              {m.dist.map(({ s, n }, i) => {
                const hit = s === target;
                return (
                  <group key={s} position={[i * 1.15, 0, 0]}>
                    {Array.from({ length: n }).map((_, k) => (
                      <mesh key={k} position={[0, 0.27 + k * 0.55, 0]}>
                        <boxGeometry args={[0.95, 0.5, 0.95]} />
                        <meshStandardMaterial
                          color={hit ? GOLD : s < target ? 'rgba(56,189,248,0.75)' : 'rgba(148,163,184,0.5)'}
                          emissive={hit ? GOLD : '#1e293b'}
                          emissiveIntensity={hit ? 0.5 : 0.2}
                          transparent={!hit} opacity={hit ? 1 : 0.8} />
                      </mesh>
                    ))}
                    <Text position={[0, -0.35, 0]} fontSize={0.34} color={hit ? GOLD : '#64748b'}>{s}</Text>
                    <Text position={[0, 0.3 + n * 0.55 + 0.35, 0]} fontSize={0.3} color={hit ? GOLD : '#64748b'}>
                      {n}/36
                    </Text>
                  </group>
                );
              })}
              <Text position={[5.8, 4.2, 0]} fontSize={0.4} color={GOLD}>P(sum) — the counting mountain</Text>
            </group>
          )}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={5} maxDistance={30} target={[0, 1, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[272px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Counting engine — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('sample space |S|', '36 ordered pairs')}
            {row(`cells with sum = ${target}`, `${m.ways} = 6 − |${target} − 7|`, 'text-gold-300')}
            {row(`P(sum = ${target})`, `${m.ways}/36 = ${(m.pEq * 100).toFixed(2)}%`, 'text-gold-300')}
            {row(`P(sum ≥ ${target})`, `${(m.pGe * 36).toFixed(0)}/36 = ${(m.pGe * 100).toFixed(2)}%`, 'text-gold-300')}
            {row('P(sum < ' + target + ')', `${((1 - m.pGe) * 100).toFixed(2)}%`)}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              each probability is counted from the grid — never memorised
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Every event is a shape in the 6×6 field — &quot;sum = 7&quot; is a diagonal
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Dices className="h-3.5 w-3.5 text-gold-400" /> target sum:</span>
        <input type="range" min={2} max={12} step={1} value={target}
          onChange={(e) => setTarget(Number(e.target.value))} className="h-11 w-40 accent-amber-400" />
        <span className="w-6 text-xs text-white">{target}</span>
        <button onClick={() => setView('field')} className={btn(view === 'field')}>6×6 field</button>
        <button onClick={() => setView('tower')} className={btn(view === 'tower')}>sum tower</button>
        <button onClick={() => setShowDiagonal(!showDiagonal)} className={btn(showDiagonal)}>highlight diagonal</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Grid3x3 className="h-4 w-4" /> ORDERED PAIRS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            (1,3) and (3,1) are DIFFERENT cells — 36 of them, each P = 1/36. Treating
            &quot;sum 7&quot; as one thing is why students mis-count. The field forces the
            bookkeeping.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Percent className="h-4 w-4" /> THE DIAGONAL COUNT</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            N(s) = 6 − |s−7|: slide the target from 2 to 12 and the diagonal grows then
            shrinks — 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1. The mountain shape in the tower
            view is that arithmetic, stacked.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> 7 IS THE KING</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            P(sum = 7) = 6/36 ≈ 16.7% — the single most likely outcome, twice as likely as
            2 or 12 (1/36 each). Craps, board-game tactics and &quot;why does 7 keep
            coming up&quot; all live on this diagonal.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Every total from 2 to 12 is equally likely — 11 outcomes.&quot; No —
            <span className="text-white"> totals are NOT the atoms, ordered pairs are</span>.
            Switch to the tower view: the mountain is anything but flat. If totals were
            uniform, each would sit at 3/36; instead 7 owns 6 cells and 12 owns just one.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set target 7 in the field view: the gold diagonal cuts 6 cells; then target 6
            and 8 — each diagonal holds only 5. Note P(7) &gt; P(6) = P(8), always.
            ② In the tower, compare P(sum ≥ 9) + P(sum &lt; 9) with 100% — the two
            populations split the field with no gaps, because every pair lands somewhere.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'P(sum = 4) with two fair dice is…', opts: ['3/36', '4/36', '1/11'], correct: 0 },
  { q: 'How many ordered pairs give sum = 7?', opts: ['6', '5', '1'], correct: 0 },
  { q: 'P(sum = 12) compared with P(sum = 7) is…', opts: ['6 times smaller', 'the same', 'twice as big'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on two-dice probability — no marks, no shame.</p>
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
