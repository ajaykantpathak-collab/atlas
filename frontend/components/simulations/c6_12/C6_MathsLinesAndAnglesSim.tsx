'use client';

/**
 * C6_MathsLinesAndAnglesSim.tsx
 * Class 6 Maths — Lines and Angles (Ganita Prakash ch2)
 *
 * Chapter coverage: points/lines/segments/rays, naming angles, the angle
 * as a turn, comparing angles, complementary & supplementary pairs,
 * adjacent angles on a line (linear pair), vertically opposite angles,
 * perpendicular.
 *
 * Labs:
 *   1. ANGLE EXPLORER — one ray fixed, drag the other: the angle type
 *      names itself (acute → right → obtuse → straight → reflex) with a
 *      live degree readout and the fraction of a full turn.
 *   2. PAIR MACHINE — set one angle, the complement (90−x) and
 *      supplement (180−x) render as arcs that visibly complete the
 *      right/straight angle.
 *   3. CROSSROADS — two intersecting lines: drag one line's angle and
 *      watch the vertical-opposite pair stay equal while the adjacent
 *      pair always sums to 180.
 *
 * Deterministic: no Math.random anywhere; all motion is slider/ref driven.
 */

import React, { useMemo, useRef, useState } from 'react';
import { RotateCcw, Ruler, Sigma, Scissors, Lightbulb, Target } from 'lucide-react';

const DEG = Math.PI / 180;

function polar(cx: number, cy: number, r: number, deg: number) {
  return [cx + r * Math.cos(deg * DEG), cy - r * Math.sin(deg * DEG)] as const;
}

function arcPath(cx: number, cy: number, r: number, a1: number, a2: number) {
  // sweep from a1 to a2 (degrees, CCW, a1 < a2, span < 360)
  const p1 = polar(cx, cy, r, a1);
  const p2 = polar(cx, cy, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  // SVG y-axis is flipped; sweep flag 0 draws CCW in math space
  return `M ${p1[0]} ${p1[1]} A ${r} ${r} 0 ${large} 0 ${p2[0]} ${p2[1]}`;
}

function angleName(deg: number): string {
  const d = ((deg % 360) + 360) % 360;
  if (d < 0.5 || d > 359.5) return 'zero angle';
  if (Math.abs(d - 90) < 0.5) return 'right angle';
  if (Math.abs(d - 180) < 0.5) return 'straight angle';
  if (d < 90) return 'acute';
  if (d < 180) return 'obtuse';
  if (d < 360) return 'reflex';
  return 'full turn';
}

function compareSymbol(a: number, b: number): string {
  if (Math.abs(a - b) < 1) return '=';
  return a > b ? '>' : '<';
}

// ─────────────────────────────────────────────────────────────
// LAB 1 — Angle Explorer
// ─────────────────────────────────────────────────────────────
function AngleExplorer({ deg }: { deg: number }) {
  const cx = 170, cy = 150, r = 95;
  const ray = polar(cx, cy, r, deg);
  const ray2 = polar(cx, cy, r, 0);
  const arcR = 42;
  const name = angleName(deg);
  const frac = deg / 360;
  return (
    <svg viewBox="0 0 340 220" className="w-full">
      {/* base line */}
      <line x1={cx - 130} y1={cy} x2={cx + 130} y2={cy} stroke="#334155" strokeWidth={2} />
      {[...Array(13)].map((_, i) => (
        <line key={i} x1={cx - 120 + i * 20} y1={cy} x2={cx - 120 + i * 20} y2={cy + 6} stroke="#475569" strokeWidth={1} />
      ))}
      {/* angle arc */}
      {deg > 1 && deg < 359 && (
        <path d={arcPath(cx, cy, arcR, 0, deg)} fill="rgba(251,191,36,0.14)" stroke="#fbbf24" strokeWidth={1.6} />
      )}
      {/* rays */}
      <line x1={cx} y1={cy} x2={ray2[0]} y2={ray2[1]} stroke="#e2e8f0" strokeWidth={2.5} />
      <line x1={cx} y1={cy} x2={ray[0]} y2={ray[1]} stroke="#fbbf24" strokeWidth={3} />
      <circle cx={ray[0]} cy={ray[1]} r={5} fill="#fbbf24" />
      {/* vertex */}
      <circle cx={cx} cy={cy} r={4} fill="#0f172a" stroke="#e2e8f0" strokeWidth={1.5} />
      <text x={cx - 18} y={cy + 20} fontSize={13} fill="#94a3b8">O</text>
      <text x={ray[0] + 8} y={ray[1] - 6} fontSize={13} fill="#fbbf24">ray OA</text>
      {/* live readout */}
      <text x={cx + 60} y={cy - 55} fontSize={26} fill="#f8fafc" fontWeight={700}>{deg}°</text>
      <text x={cx + 60} y={cy - 34} fontSize={13} fill="#fbbf24">{name}</text>
      <text x={cx + 60} y={cy - 16} fontSize={11} fill="#64748b">
        {frac === 1 ? '1 full turn' : `${(frac % 1).toFixed(2)} of a turn`}
      </text>
      {/* comparisons strip */}
      <text x={20} y={205} fontSize={11} fill="#94a3b8">
        {deg}° {compareSymbol(deg, 90)} 90° (right) · {deg}° {compareSymbol(deg, 45) === '=' ? '=' : compareSymbol(deg, 45)} 45° · {(360 - deg)}° left to a full turn
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// LAB 2 — Complement / Supplement machine
// ─────────────────────────────────────────────────────────────
function PairMachine({ x }: { x: number }) {
  const comp = 90 - x;
  const supp = 180 - x;
  const cx = 160, cy = 130, r = 70;
  // complement drawn first (0..x), then its complement completes to 90
  const c1 = polar(cx, cy, r - 14, x);
  const s1 = polar(cx, cy + 18, r - 12, x);
  const s2 = polar(cx, cy + 18, r - 12, 180);
  return (
    <div>
      <svg viewBox="0 0 320 200" className="w-full">
        {/* complement arc: x + comp = 90 */}
        <path d={arcPath(cx, cy, r, 0, 90)} fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth={1.4} strokeDasharray="4 3" />
        <path d={arcPath(cx, cy, r - 14, 0, x)} fill="rgba(251,191,36,0.16)" stroke="#fbbf24" strokeWidth={1.6} />
        <line x1={cx} y1={cy} x2={polar(cx, cy, r, 0)[0]} y2={polar(cx, cy, r, 0)[1]} stroke="#e2e8f0" strokeWidth={2.2} />
        <line x1={cx} y1={cy} x2={c1[0]} y2={c1[1]} stroke="#fbbf24" strokeWidth={2.4} />
        <text x={c1[0] + 6} y={c1[1] - 4} fontSize={12} fill="#fbbf24">{x}°</text>
        {comp > 0 && (
          <>
            <line x1={cx} y1={cy} x2={polar(cx, cy, r, 90)[0]} y2={polar(cx, cy, r, 90)[1]} stroke="#38bdf8" strokeWidth={2.2} />
            <text x={polar(cx, cy, r, 90)[0] + 6} y={polar(cx, cy, r, 90)[1]} fontSize={12} fill="#38bdf8">{comp}°</text>
          </>
        )}
        <text x={cx - 10} y={cy - 60} fontSize={12} fill="#94a3b8">{x}° + {comp}° = 90°</text>
        {/* supplement on a straight line below */}
        <line x1={cx - 120} y1={cy + 62} x2={cx + 120} y2={cy + 62} stroke="#334155" strokeWidth={2} />
        <path d={arcPath(cx, cy + 62, r - 16, 0, x)} fill="rgba(251,191,36,0.16)" stroke="#fbbf24" strokeWidth={1.4} />
        <path d={`M ${s2[0]} ${s2[1] + 0} A ${r - 12} ${r - 12} 0 0 1 ${s1[0]} ${s1[1] + 0}`} fill="none" stroke="#fb7185" strokeWidth={1.6} />
        <line x1={cx} y1={cy + 62} x2={s1[0]} y2={s1[1] + 62 - cy + cy - (cy + 62) + cy + (s1[1] - cy)} stroke="#fbbf24" strokeWidth={2.2} />
        <line x1={cx} y1={cy + 62} x2={polar(cx, cy + 62, r - 12, 180)[0]} y2={polar(cx, cy + 62, r - 12, 180)[1]} stroke="#fb7185" strokeWidth={2.2} />
        <text x={cx + 26} y={cy + 44} fontSize={12} fill="#fbbf24">{x}°</text>
        <text x={cx - 96} y={cy + 44} fontSize={12} fill="#fb7185">{supp}°</text>
        <text x={cx - 24} y={cy + 78} fontSize={11} fill="#94a3b8">{x}° + {supp}° = 180°</text>
      </svg>
      <p className="mt-1 text-xs text-surface-400">
        Complement <span className="text-gold-300">{comp}°</span> completes your angle to a right angle.
        Supplement <span className="text-rose-300">{supp}°</span> completes it to a straight line.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LAB 3 — Crossroads (vertical + linear pair)
// ─────────────────────────────────────────────────────────────
function Crossroads({ a }: { a: number }) {
  const cx = 170, cy = 120, r = 86;
  const b = 180 - a; // linear pair
  const opp = a;     // vertically opposite
  const armA = polar(cx, cy, r, a);
  const armB = polar(cx, cy, r, a + 180);
  const arm0 = polar(cx, cy, r, 0);
  const arm180 = polar(cx, cy, r, 180);
  return (
    <svg viewBox="0 0 340 190" className="w-full">
      <line x1={arm180[0]} y1={cy} x2={arm0[0]} y2={cy} stroke="#e2e8f0" strokeWidth={2.4} />
      <line x1={armB[0]} y1={cy - (armB[1] - cy)} x2={armB[0]} y2={cy + (cy - armB[1])} stroke="#fbbf24" strokeWidth={2.4} />
      {/* angles */}
      <path d={arcPath(cx, cy, 34, 0, a)} fill="rgba(251,191,36,0.18)" stroke="#fbbf24" strokeWidth={1.4} />
      <path d={arcPath(cx, cy, 26, a + 180, 360)} fill="rgba(52,211,153,0.16)" stroke="#34d399" strokeWidth={1.4} />
      <path d={arcPath(cx, cy, 20, 180, a + 180)} fill="rgba(251,113,133,0.14)" stroke="#fb7185" strokeWidth={1.4} />
      <text x={cx + 44} y={cy - 14} fontSize={13} fill="#fbbf24">{a}°</text>
      <text x={cx - 72} y={cy + 26} fontSize={13} fill="#34d399">{a}°</text>
      <text x={cx - 66} y={cy - 12} fontSize={12} fill="#fb7185">{b}°</text>
      <text x={cx + 40} y={cy + 28} fontSize={12} fill="#fb7185">{b}°</text>
      <circle cx={cx} cy={cy} r={3.5} fill="#e2e8f0" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────
type Tab = 'explore' | 'pairs' | 'cross';

export default function C6_MathsLinesAndAnglesSim() {
  const [tab, setTab] = useState<Tab>('explore');
  const [deg, setDeg] = useState(55);
  const [pairX, setPairX] = useState(35);
  const [crossA, setCrossA] = useState(50);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);

  const reset = () => { setDeg(55); setPairX(35); setCrossA(50); setQuiz(null); setTab('explore'); };

  const QUIZ = [
    { q: 'Two angles form a linear pair. One is 110°. The other is:', opts: ['70°', '110°', '250°'], correct: 0 },
    { q: 'The complement of 30° is:', opts: ['60°', '150°', '30°'], correct: 0 },
    { q: 'Vertically opposite angles are always:', opts: ['equal', 'supplementary', 'complementary'], correct: 0 },
  ];
  const startQuiz = () => setQuiz({ ...QUIZ[0], picked: null });
  const answer = (i: number) => setQuiz({ ...quiz, picked: i });
  const nextQ = () => {
    const idx = QUIZ.findIndex(x => x.q === quiz?.q);
    if (idx >= 0 && idx < QUIZ.length - 1) setQuiz({ ...QUIZ[idx + 1], picked: null });
    else setQuiz(null);
  };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300' : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* tabs */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setTab('explore')} className={btn(tab === 'explore')}><Ruler className="mr-1 inline h-3.5 w-3.5" />Angle Explorer</button>
        <button onClick={() => setTab('pairs')} className={btn(tab === 'pairs')}><Sigma className="mr-1 inline h-3.5 w-3.5" />Angle Pairs</button>
        <button onClick={() => setTab('cross')} className={btn(tab === 'cross')}><Scissors className="mr-1 inline h-3.5 w-3.5" />Crossroads</button>
      </div>

      {tab === 'explore' && (
        <div className="rounded-2xl border border-white/10 bg-surface-900/60 p-4">
          <p className="mb-2 text-xs text-surface-400">One ray pinned east. Drag the slider — the second ray turns. Watch the name change at 90° and 180°.</p>
          <AngleExplorer deg={deg} />
          <div className="mt-3 flex items-center gap-3">
            <Ruler className="h-4 w-4 text-gold-400" />
            <input type="range" min={0} max={359} value={deg} onChange={e => setDeg(Number(e.target.value))} className="h-11 w-64 accent-amber-400" />
            <span className="w-14 text-sm font-display text-white">{deg}°</span>
          </div>
        </div>
      )}

      {tab === 'pairs' && (
        <div className="rounded-2xl border border-white/10 bg-surface-900/60 p-4">
          <p className="mb-2 text-xs text-surface-400">Your angle is gold. The blue ray completes it to 90° (complement); the red ray completes it to 180° (supplement).</p>
          <PairMachine x={pairX} />
          <div className="mt-3 flex items-center gap-3">
            <Target className="h-4 w-4 text-gold-400" />
            <input type="range" min={1} max={89} value={pairX} onChange={e => setPairX(Number(e.target.value))} className="h-11 w-52 accent-amber-400" />
            <span className="text-sm font-display text-white">{pairX}°</span>
          </div>
        </div>
      )}

      {tab === 'cross' && (
        <div className="rounded-2xl border border-white/10 bg-surface-900/60 p-4">
          <p className="mb-2 text-xs text-surface-400">Two roads cross. Slide one angle — the green vertical-opposite angle copies it exactly; both red adjacent angles always make 180° with it.</p>
          <Crossroads a={crossA} />
          <div className="mt-3 flex items-center gap-3">
            <input type="range" min={5} max={175} value={crossA} onChange={e => setCrossA(Number(e.target.value))} className="h-11 w-64 accent-amber-400" />
            <span className="text-sm font-display text-white">angle = {crossA}°</span>
          </div>
        </div>
      )}

      {/* challenge */}
      <div className="rounded-2xl border border-white/10 bg-surface-900/60 p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 questions on lines and angles — the labs above already showed you every answer.</p>
            </div>
            <button onClick={startQuiz} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 px-4 py-2.5 text-xs font-display font-bold text-surface-0 hover:shadow-lg hover:shadow-gold-500/30">
              <Lightbulb className="h-3.5 w-3.5" /> Start
            </button>
          </div>
        ) : (
          <div>
            <div className="font-display text-sm font-bold text-white">{quiz.q}</div>
            <div className="mt-3 grid gap-2">
              {quiz.opts.map((o, i) => {
                const show = quiz.picked !== null;
                const isCorrect = i === quiz.correct;
                const isPicked = quiz.picked === i;
                return (
                  <button key={i} disabled={show} onClick={() => answer(i)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs transition-all ${
                      show && isCorrect ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
                        : show && isPicked ? 'border-rose-400/60 bg-rose-500/10 text-rose-200'
                          : 'border-white/10 bg-white/[0.04] text-surface-200 hover:border-gold-400/40'}`}>
                    <span>{o}</span>
                    {show && isCorrect && <span className="text-emerald-300">✓</span>}
                    {show && isPicked && !isCorrect && <span className="text-rose-300">✗ try the labs again</span>}
                  </button>
                );
              })}
            </div>
            {quiz.picked !== null && (
              <button onClick={nextQ} className="mt-3 text-xs font-display font-semibold text-gold-300 hover:text-gold-200">
                {quiz.q === QUIZ[QUIZ.length - 1].q ? 'Finish →' : 'Next →'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* misconception */}
      <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
        <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
        <p className="mt-2 text-xs text-surface-300">
          "A 120° angle is twice as big as a 60° angle, so it must look twice as wide." Open the Angle
          Explorer and set 60°, then 120°: the turn doubles, but the <span className="text-white">ray has not gone
          twice as far around</span> — angles measure turn, not length. And a 185° angle looks almost identical
          to 175° even though one is obtuse and the other reflex.
        </p>
      </div>

      {/* what to try */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY ①</div>
          <p className="mt-2 text-xs text-surface-300">In the Angle Explorer, find three different angles that all look "sharp" — then use the degree readout to prove which of your three is actually the biggest.</p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY ②</div>
          <p className="mt-2 text-xs text-surface-300">Set the Pair Machine to 89°. Both partners are 1° away from their targets — a complement of 1° and a supplement of 91°. Now find the angle whose complement equals its own supplement. (Hint: it can't — say why.)</p>
        </div>
      </div>

      {/* reset */}
      <button onClick={reset} className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs text-white hover:bg-white/10">
        <RotateCcw className="h-3.5 w-3.5" /> Reset everything
      </button>
    </div>
  );
}
