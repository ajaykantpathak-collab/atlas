'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Data is a collection of numbers that answer a question, like marks of 6 friends. Three quick ' +
  'ways to sum it up: the MEAN (share equally: add all, divide by how many), the MEDIAN (the middle ' +
  'value when arranged in order) and the MODE (the most frequent value). Change one value and watch ' +
  'which averages move a lot and which barely move!';

export function C7_MathematicsDataHandlingSim() {
  const [values, setValues] = useState<number[]>([4, 6, 5, 6, 8, 7]);
  const [stat, setStat] = useState<'mean' | 'median' | 'mode'>('mean');
  const [outlier, setOutlier] = useState(false);

  const stats = useMemo(() => {
    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;
    const sum = values.reduce((s, v) => s + v, 0);
    const mean = sum / n;
    const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    const counts = new Map<number, number>();
    values.forEach((v) => counts.set(v, (counts.get(v) || 0) + 1));
    const maxCount = Math.max(...Array.from(counts.values()));
    const modes = Array.from(counts.entries()).filter(([, c]) => c === maxCount && c > 1).map(([v]) => v);
    return { sorted, sum, mean, median, modes, maxCount };
  }, [values]);

  const shown = stat === 'mean' ? stats.mean : stats.median;
  const bump = (i: number, delta: number) =>
    setValues((vs) => vs.map((v, j) => (j === i ? Math.max(0, Math.min(20, v + delta)) : v)));

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Data Handling: Mean, Median, Mode</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Bar chart */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 240" className="w-full">
          <line x1={40} y1={200} x2={580} y2={200} stroke="#475569" strokeWidth={2} />
          {[0, 5, 10, 15, 20].map((t) => (
            <g key={t}>
              <line x1={40} y1={200 - t * 8} x2={580} y2={200 - t * 8} stroke="#1e293b" />
              <text x={32} y={204 - t * 8} textAnchor="end" fill="#64748b" fontSize={11}>{t}</text>
            </g>
          ))}
          {values.map((v, i) => (
            <g key={i}>
              <rect
                x={70 + i * 85}
                y={200 - v * 8}
                width={52}
                height={v * 8}
                rx={6}
                fill={outlier && v >= 15 ? '#f472b6' : '#818cf8'}
                opacity={0.85}
                style={{ transition: 'all 0.25s' }}
              />
              <text x={96 + i * 85} y={192 - v * 8} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight="bold">{v}</text>
              <text x={96 + i * 85} y={218} textAnchor="middle" fill="#94a3b8" fontSize={11}>P{i + 1}</text>
              {/* +/- steppers act directly on the bar */}
              <rect x={78 + i * 85} y={224} width={16} height={14} rx={4} fill="#334155" className="cursor-pointer" onClick={() => bump(i, -1)} />
              <text x={86 + i * 85} y={235} textAnchor="middle" fill="#e2e8f0" fontSize={11}>-</text>
              <rect x={98 + i * 85} y={224} width={16} height={14} rx={4} fill="#334155" className="cursor-pointer" onClick={() => bump(i, 1)} />
              <text x={106 + i * 85} y={235} textAnchor="middle" fill="#e2e8f0" fontSize={11}>+</text>
            </g>
          ))}
          {/* average line */}
          <line
            x1={40}
            y1={200 - shown * 8}
            x2={580}
            y2={200 - shown * 8}
            stroke={stat === 'mean' ? '#34d399' : stat === 'median' ? '#fbbf24' : '#f472b6'}
            strokeWidth={2.5}
            strokeDasharray="7 5"
            style={{ transition: 'all 0.25s' }}
          />
          <text x={480} y={188 - shown * 8} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight="bold">
            {stat} = {Number.isInteger(shown) ? shown : shown.toFixed(1)}
          </text>
        </svg>
      </div>

      {/* Stat readouts */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { id: 'mean' as const, label: 'Mean', value: stats.mean, working: `${values.join(' + ')} = ${stats.sum}, / 6` },
          { id: 'median' as const, label: 'Median', value: stats.median, working: `ordered: ${stats.sorted.join(', ')}` },
          { id: 'mode' as const, label: 'Mode', value: stats.modes.length ? stats.modes.join(' & ') : 'none', working: `most seen: ${stats.maxCount} times` },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setStat(s.id)}
            className={`p-3 rounded-2xl border text-left transition-colors ${stat === s.id ? 'bg-indigo-700 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            <div className="text-xs uppercase tracking-wide text-slate-300">{s.label}</div>
            <div className="text-xl font-black font-mono">{typeof s.value === 'number' ? (Number.isInteger(s.value) ? s.value : s.value.toFixed(1)) : s.value}</div>
            <div className="text-[10px] text-slate-400 mt-1 leading-tight">{s.working}</div>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => {
            setOutlier((o) => {
              const next = !o;
              setValues((vs) => {
                const nv = [...vs];
                nv[0] = next ? 20 : 4;
                return nv;
              });
              return next;
            });
          }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${outlier ? 'bg-pink-600 border-pink-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {outlier ? 'Remove' : 'Add'} a very large value (outlier)
        </button>
        <button
          onClick={() => setValues([4, 6, 5, 6, 8, 7])}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Reset data
        </button>
        <button
          onClick={() => setValues(Array.from({ length: 6 }, () => Math.floor(Math.random() * 11)))}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Random data
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Use the + button to make one bar reach 20. Which moved more -- the mean or the median? Why does the median stay calm?</li>
          <li>Make all six bars different but arrange it so mean = median = 7. Then try to create data with NO mode at all.</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsDataHandlingSim;
