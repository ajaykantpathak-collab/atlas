'use client';
/**
 * C8_MathematicsDataHandlingSim (Class 8 Maths)
 *
 * ELI5: Data handling means turning raw numbers into pictures you can read.
 * A pie chart shows each category's share of the whole (the angles add to
 * 360 degrees). A dice experiment shows why experimental probability gets
 * closer to the theoretical 1/6 as you roll more and more times.
 */
import React, { useMemo, useState } from 'react';

type Mode = 'pie' | 'dice';

const FRUITS = ['Mango', 'Banana', 'Apple', 'Chikoo'] as const;
const FRUIT_COLORS = ['#f59e0b', '#facc15', '#ef4444', '#a16207'];

export function C8_MathematicsDataHandlingSim() {
  const [mode, setMode] = useState<Mode>('pie');
  const [counts, setCounts] = useState<number[]>([8, 5, 4, 3]);
  const [rolls, setRolls] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const total = counts.reduce((s, c) => s + c, 0) || 1;

  // Pie sector paths (real angle math: share x 360)
  const sectors = useMemo(() => {
    let acc = -90;
    return counts.map((c, i) => {
      const angle = (c / total) * 360;
      const start = (acc * Math.PI) / 180;
      acc += angle;
      const end = (acc * Math.PI) / 180;
      const r = 80;
      const cx = 110;
      const cy = 105;
      const large = angle > 180 ? 1 : 0;
      const d =
        angle >= 359.99
          ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
          : `M ${cx} ${cy} L ${cx + r * Math.cos(start)} ${cy + r * Math.sin(start)} A ${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(end)} ${cy + r * Math.sin(end)} Z`;
      return { d, i, angle, pct: Math.round((c / total) * 1000) / 10 };
    });
  }, [counts, total]);

  const rollDice = (times: number) => {
    setRolls((prev) => {
      const next = [...prev];
      for (let k = 0; k < times; k++) next[Math.floor(Math.random() * 6)] += 1;
      return next;
    });
  };
  const totalRolls = rolls.reduce((s, r) => s + r, 0) || 1;
  const maxRoll = Math.max(...rolls, 1);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Data Handling - Pie Charts and Probability</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Two data superpowers:</span> a pie chart turns
          shares into angles (share of 1 whole x 360 degrees of turn), and a dice frequency
          experiment shows the law of large numbers - with few rolls the bars look lopsided, but as
          rolls pile up every bar drifts toward the fair share of 1/6.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['pie', 'Pie chart builder'], ['dice', 'Dice probability lab']] as [Mode, string][]).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === m ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {mode === 'pie' ? (
          <>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-500 mb-2">FAVOURITE FRUIT VOTES (adjust with + / -)</p>
              {FRUITS.map((f, i) => (
                <div key={f} className="flex items-center gap-2 mb-2">
                  <span className="w-16 text-sm font-semibold" style={{ color: FRUIT_COLORS[i] }}>{f}</span>
                  <button onClick={() => setCounts((c) => c.map((v, j) => (j === i ? Math.max(0, v - 1) : v)))} className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold transition-all">-</button>
                  <span className="w-10 text-center font-mono">{counts[i]}</span>
                  <button onClick={() => setCounts((c) => c.map((v, j) => (j === i ? Math.min(99, v + 1) : v)))} className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-bold transition-all">+</button>
                  <span className="ml-auto font-mono text-xs text-slate-500">
                    {(counts[i] / total) * 360 >= 0 ? `${Math.round((counts[i] / total) * 360)} deg` : ''}
                  </span>
                </div>
              ))}
              <div className="mt-2 text-sm font-bold text-indigo-700">Total votes: {counts.reduce((s, c) => s + c, 0)}</div>
              <button onClick={() => setCounts([8, 5, 4, 3])} className="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 hover:bg-slate-300 transition-all">Reset data</button>
            </div>
            <div className="p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
              <svg viewBox="0 0 300 220" className="w-full">
                {sectors.map((s) => (
                  <path key={s.i} d={s.d} fill={FRUIT_COLORS[s.i]} stroke="#fff" strokeWidth={2} opacity={0.9} style={{ transition: 'all 300ms' }} />
                ))}
                {sectors.map((s) => {
                  const mid = ((s.angle / 2) * Math.PI) / 180 - Math.PI / 2;
                  return (
                    <text key={`t${s.i}`} x={110 + 48 * Math.cos(mid)} y={105 + 48 * Math.sin(mid)} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">
                      {s.pct}%
                    </text>
                  );
                })}
                <text x={150} y={212} textAnchor="middle" fontSize="11" fill="#475569">Each slice angle = share x 360 degrees</text>
              </svg>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-500 mb-2">ROLL A FAIR DICE</p>
              <div className="flex flex-wrap gap-2">
                {[1, 10, 100, 500].map((k) => (
                  <button key={k} onClick={() => rollDice(k)} className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all">
                    Roll {k}x
                  </button>
                ))}
                <button onClick={() => setRolls([0, 0, 0, 0, 0, 0])} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-200 hover:bg-slate-300 transition-all">
                  Reset
                </button>
              </div>
              <div className="mt-3 text-sm text-slate-600 font-semibold">Total rolls: {rolls.reduce((s, r) => s + r, 0)}</div>
              <div className="mt-2 text-xs text-slate-500 leading-relaxed">
                Theoretical probability of each face = 1/6 = 0.167 (dashed line). Experimental
                probability = count / total rolls. Watch each experimental value approach 0.167 as
                the total grows.
              </div>
            </div>
            <div className="p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
              <svg viewBox="0 0 320 230" className="w-full">
                <line x1={30} y1={200} x2={310} y2={200} stroke="#94a3b8" />
                {rolls.map((r, i) => {
                  const h = (r / maxRoll) * 160;
                  return (
                    <g key={i}>
                      <rect x={40 + i * 46} y={200 - h} width={34} height={h} fill="#6366f1" opacity={0.9} style={{ transition: 'height 300ms, y 300ms' }} />
                      <text x={57 + i * 46} y={195 - h} textAnchor="middle" fontSize="10" fill="#334155">{Math.round((r / totalRolls) * 1000) / 1000}</text>
                      <text x={57 + i * 46} y={215} textAnchor="middle" fontSize="11" fill="#475569">{i + 1}</text>
                    </g>
                  );
                })}
                <line x1={30} y1={200 - (1 / 6) * 160} x2={310} y2={200 - (1 / 6) * 160} stroke="#059669" strokeDasharray="5 4" />
                <text x={312} y={200 - (1 / 6) * 160 + 4} fontSize="10" fill="#059669">1/6</text>
              </svg>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Make a pie chart where Mango takes exactly 180 degrees. What fraction and percent is that?</li>
          <li>Roll 500 times: which face is furthest from the green 1/6 line? Roll 500 more and check if it got closer.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsDataHandlingSim;
