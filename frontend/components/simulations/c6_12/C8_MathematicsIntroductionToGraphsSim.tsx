'use client';
/**
 * C8_MathematicsIntroductionToGraphsSim (Class 8 Maths)
 *
 * ELI5: A graph is a picture of a rule. For a linear rule y = mx + c, m is
 * the steepness (how much y grows when x grows by 1) and c is where the line
 * crosses the y-axis. Slide m and c and watch the straight line swing and
 * slide across the grid.
 */
import React, { useState } from 'react';

export function C8_MathematicsIntroductionToGraphsSim() {
  const [m, setM] = useState(1);
  const [c, setC] = useState(-2);
  const [x0, setX0] = useState(3);

  const y0 = m * x0 + c;
  // map math coords (-6..6) to svg
  const map = (x: number, y: number) => ({ sx: 160 + x * 25, sy: 160 - y * 25 });
  const p1 = map(-6, -6 * m + c);
  const p2 = map(6, 6 * m + c);
  const pt = map(x0, y0);
  const zeroPt = map(0, c);

  const tableXs = [-2, -1, 0, 1, 2, 3];

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Introduction to Graphs: The Line Machine</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Story mode:</span> imagine filling a tank that
          already holds c litres, at a rate of m litres per minute. The water level after x minutes
          is y = mx + c. A bigger rate tilts the line steeper; a negative rate drains the tank and
          the line slopes downhill. Two points fix a line completely - that is why every pair of
          numbers (m, c) gives ONE line.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[['Flat tank', 0, 1], ['Steady fill', 2, 0], ['Leaking tank', -1, 4], ['Steep fill', 3, -3]].map(([label, a, b]) => (
          <button key={label as string} onClick={() => { setM(a as number); setC(b as number); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all">
            {label as string}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Rate m (litres/min)</span><span className="font-mono text-indigo-600">{m}</span></label>
            <input type="range" min={-4} max={4} step={0.5} value={m} aria-label="slope m" onChange={(e) => setM(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Start level c (litres)</span><span className="font-mono text-emerald-600">{c}</span></label>
            <input type="range" min={-5} max={5} step={0.5} value={c} aria-label="intercept c" onChange={(e) => setC(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Probe x (minutes)</span><span className="font-mono text-amber-600">{x0}</span></label>
            <input type="range" min={-6} max={6} step={0.5} value={x0} aria-label="probe x" onChange={(e) => setX0(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div className="text-indigo-700 font-bold">y = {m}x + {c}</div>
            <div>at x = {x0}: y = {m} x {x0} + {c} = <span className="font-bold">{Math.round(y0 * 100) / 100}</span></div>
            <div className="mt-1 text-xs text-slate-500">
              y-intercept (0, {c}) and x-intercept {m !== 0 ? `(${Math.round((-c / m) * 100) / 100}, 0)` : 'none (flat line)'}
            </div>
          </div>
        </div>

        <div className="p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 320 320" className="w-full">
            {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((v) => (
              <g key={v}>
                <line x1={160 + v * 25} y1={10} x2={160 + v * 25} y2={310} stroke={v === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth={1} />
                <line x1={10} y1={160 - v * 25} x2={310} y2={160 - v * 25} stroke={v === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth={1} />
              </g>
            ))}
            <line x1={p1.sx} y1={p1.sy} x2={p2.sx} y2={p2.sy} stroke="#4338ca" strokeWidth={3} style={{ transition: 'all 200ms' }} />
            <circle cx={zeroPt.sx} cy={zeroPt.sy} r={5} fill="#10b981" stroke="#fff" strokeWidth={1.5} />
            <text x={zeroPt.sx + 8} y={zeroPt.sy - 8} fontSize="10" fill="#047857" fontWeight="bold">(0, {c})</text>
            <circle cx={pt.sx} cy={pt.sy} r={7} fill="#f59e0b" stroke="#fff" strokeWidth={2} style={{ transition: 'all 200ms' }} />
            <text x={pt.sx} y={pt.sy + 20} textAnchor="middle" fontSize="10" fill="#b45309" fontWeight="bold">
              ({x0}, {Math.round(y0 * 100) / 100})
            </text>
            <text x={165} y={18} fontSize="11" fill="#475569">y</text>
            <text x={305} y={155} fontSize="11" fill="#475569">x</text>
          </svg>
          <div className="px-2 pb-1 text-xs text-slate-500">green dot = y-intercept; amber dot = your probe point</div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <p className="text-xs font-bold text-slate-500 mb-2">TABLE OF VALUES (x, y)</p>
        <div className="flex flex-wrap gap-3 font-mono text-sm">
          {tableXs.map((tx) => (
            <span key={tx} className="px-2 py-1 rounded-lg bg-white border border-slate-200">
              ({tx}, <span className="text-indigo-700 font-bold">{Math.round((m * tx + c) * 100) / 100}</span>)
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <p className="text-xs font-bold text-slate-500 mb-2">READING THE GRAPH LIKE A SCIENTIST</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-indigo-700">Steepness = m.</span> Rise of {m} for every 1 step right; negative m walks downhill.
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-emerald-700">Crossing = c.</span> The line pierces the y-axis at (0, {c}); shift c and the line slides without tilting.
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-amber-700">Probe = truth test.</span> Any point ON the line must satisfy y = mx + c; points off it fail the equation.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Make a line that passes through (0, 2) and falls steeply. Write its equation and check with the probe.</li>
          <li>Keep m = 1 and slide c from -3 to 3: what do you notice about ALL the lines? (They are parallel - same slope!)</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsIntroductionToGraphsSim;
