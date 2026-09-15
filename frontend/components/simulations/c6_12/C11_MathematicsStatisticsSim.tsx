'use client';

import React, { useState } from 'react';

/**
 * Class 11 Maths -- Statistics
 * Edit eight observations and watch mean, variance, standard deviation and the
 * coefficient of variation update, with deviations from the mean drawn live.
 * Self-contained: react + tailwind only.
 */

const PRESETS: { name: string; data: number[] }[] = [
  { name: 'Cricket runs', data: [23, 45, 12, 67, 34, 89, 56, 21] },
  { name: 'Class scores', data: [72, 85, 90, 68, 77, 95, 88, 81] },
  { name: 'Tight cluster', data: [50, 52, 49, 51, 50, 48, 53, 51] },
];

export function C11_MathematicsStatisticsSim() {
  const [data, setData] = useState<number[]>(PRESETS[0].data);
  const [divisor, setDivisor] = useState<'pop' | 'sample'>('pop');

  const n = data.length;
  const mean = data.reduce((s, v) => s + v, 0) / n;
  const deviations = data.map((v) => v - mean);
  const sumSqDev = deviations.reduce((s, d) => s + d * d, 0);
  const variance = sumSqDev / (divisor === 'pop' ? n : n - 1);
  const variancePop = sumSqDev / n;
  const varianceSample = sumSqDev / (n - 1);
  const sd = Math.sqrt(variance);
  const cv = (sd / mean) * 100;
  const sorted = [...data].sort((a, b) => a - b);
  const median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

  const setVal = (i: number, v: number) =>
    setData((prev) => prev.map((old, j) => (j === i ? v : old)));

  // Chart: x slots per observation, y scaled to [0, maxVal]
  const maxVal = Math.max(...data, 10) * 1.1;
  const px = (i: number) => 55 + (i * 390) / n;
  const barW = 390 / n - 10;
  const py = (v: number) => 240 - (v / maxVal) * 200;
  const pyMean = py(mean);
  const pyMed = py(median);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-purple-950/80 rounded-2xl border border-purple-700 font-mono">sx</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Class 11 -- Statistics</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Dispersion Live: Mean, Variance, CV</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 270" className="w-full">
            <line x1={40} y1={240} x2={455} y2={240} stroke="#475569" strokeWidth={2} />
            {data.map((v, i) => {
              const dev = deviations[i];
              return (
                <g key={i}>
                  <rect x={px(i) - barW / 2} y={py(v)} width={barW} height={240 - py(v)} rx={3}
                    fill={dev >= 0 ? '#a78bfa' : '#7c6fd0'} opacity={0.85} />
                  <text x={px(i)} y={py(v) - 5} textAnchor="middle" fill="#c4b5fd" fontSize={9} fontFamily="monospace">{v}</text>
                  <line x1={px(i)} y1={pyMean} x2={px(i)} y2={py(v)} stroke="#f472b6" strokeWidth={1.5} strokeDasharray="2 3" />
                  <text x={px(i)} y={256} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">x{i + 1}</text>
                </g>
              );
            })}
            <line x1={40} y1={pyMean} x2={455} y2={pyMean} stroke="#f472b6" strokeWidth={2} />
            <text x={452} y={pyMean - 5} textAnchor="end" fill="#f9a8d4" fontSize={10} fontFamily="monospace">
              mean x = {mean.toFixed(2)}
            </text>
            <line x1={40} y1={pyMed} x2={455} y2={pyMed} stroke="#34d399" strokeWidth={1.5} strokeDasharray="7 4" opacity={0.8} />
            <text x={452} y={pyMed + 12} textAnchor="end" fill="#6ee7b7" fontSize={10} fontFamily="monospace">
              median = {median.toFixed(1)}
            </text>
            <text x={40} y={20} fill="#64748b" fontSize={10} fontFamily="monospace">dotted stems = deviations (x_i - mean)</text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2">
            <div><span className="text-slate-500">Sum of squares of dev.</span><div className="text-purple-300 font-bold text-sm">{sumSqDev.toFixed(2)}</div></div>
            <div><span className="text-slate-500">Variance = sum/n</span><div className="text-purple-300 font-bold text-sm">{variance.toFixed(2)}</div></div>
            <div><span className="text-slate-500">SD = sqrt(variance)</span><div className="text-pink-300 font-bold text-sm">{sd.toFixed(3)}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <div className="flex gap-1.5">
              {PRESETS.map((p) => (
                <button key={p.name} onClick={() => setData(p.data)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold ${data.every((v, i) => v === p.data[i]) ? 'bg-purple-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {p.name}
                </button>
              ))}
            </div>
            {data.map((v, i) => (
              <div key={i}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>x{i + 1} (dev {deviations[i] >= 0 ? '+' : ''}{deviations[i].toFixed(1)})</span>
                  <span className="font-mono font-bold text-purple-300">{v}</span>
                </div>
                <input type="range" min={0} max={100} step={1} value={v} aria-label={`Observation ${i + 1}`}
                  onChange={(e) => setVal(i, Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
            ))}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-purple-800/60 p-4 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Mean x</span><div className="text-slate-200 font-bold text-sm">{mean.toFixed(2)}</div></div>
            <div><span className="text-slate-500">Median</span><div className="text-emerald-300 font-bold text-sm">{median.toFixed(2)}</div></div>
            <div><span className="text-slate-500">Variance sigma^2</span><div className="text-purple-300 font-bold text-sm">{variance.toFixed(2)}</div></div>
            <div><span className="text-slate-500">Standard deviation</span><div className="text-pink-300 font-bold text-sm">{sd.toFixed(3)}</div></div>
            <div className="col-span-2"><span className="text-slate-500">Coefficient of variation = sigma/x x 100</span>
              <div className="text-amber-300 font-bold text-sm">{cv.toFixed(2)} % {cv < 15 ? '(consistent data)' : cv < 40 ? '(moderate spread)' : '(highly variable)'}</div></div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[11px] font-bold text-purple-300">Divisor rule: n or (n-1)?</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setDivisor('pop')}
                className={`py-1.5 rounded-lg text-[11px] font-bold ${divisor === 'pop' ? 'bg-purple-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                Population /n
              </button>
              <button onClick={() => setDivisor('sample')}
                className={`py-1.5 rounded-lg text-[11px] font-bold ${divisor === 'sample' ? 'bg-purple-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                Sample /(n-1)
              </button>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {divisor === 'pop'
                ? `NCERT mean square deviation: ${sumSqDev.toFixed(1)} / ${n} = ${variancePop.toFixed(2)}`
                : `Unbiased sample variance: ${sumSqDev.toFixed(1)} / ${n - 1} = ${varianceSample.toFixed(2)}`}
              {divisor === 'pop' && ` -- sample form would give ${varianceSample.toFixed(2)}`}
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Variance is the mean of the squared deviations -- squaring kills signs but also
              inflates units (rupees become rupees-squared), so we report SD = sqrt(variance) to get
              back to honest units. CV is the dimensionless SD, which is why a batsman averaging 50
              with SD 10 (CV 20%) is MORE consistent than one averaging 20 with SD 6 (CV 30%).
            </p>
          </div>

          <div className="bg-purple-950/40 rounded-2xl border border-purple-800/50 p-4 text-xs">
            <p className="font-bold text-purple-300 mb-1">What to try</p>
            <p>1. Drag one observation from 20 to 90 and watch variance explode -- which moves faster, mean or SD? Why?</p>
            <p>2. Load &quot;Tight cluster&quot; and nudge every value to exactly 50: variance 0. Now push half the values up 10 and half down 10 -- mean unchanged, but what happens to SD?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_MathematicsStatisticsSim;
