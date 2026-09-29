'use client';

import React, { useState } from 'react';

/**
 * Class 12 Maths -- Differential Equations
 * Slope field for dy/dx = f(x,y), the exact solution curve, and Euler's method
 * stepping with adjustable h -- watch the error shrink as h halves.
 * Self-contained: react + tailwind only.
 */

type OdeKey = 'growth' | 'mixed' | 'quad';
const ODES: Record<OdeKey, { label: string; f: (x: number, y: number) => number; exact: (x: number, y0: number) => number; solution: string }> = {
  growth: { label: "dy/dx = y", f: (_x, y) => y, exact: (x, y0) => y0 * Math.exp(x), solution: 'y = y0 e^x' },
  mixed: { label: "dy/dx = x + y", f: (x, y) => x + y, exact: (x, y0) => (y0 + 1) * Math.exp(x) - x - 1, solution: 'y = (y0+1)e^x - x - 1' },
  quad: { label: "dy/dx = x^2", f: (x) => x * x, exact: (x, y0) => y0 + (x * x * x) / 3, solution: 'y = y0 + x^3/3' },
};

export function C12_MathematicsChapter9DifferentialEquationsSim() {
  const [odeKey, setOdeKey] = useState<OdeKey>('mixed');
  const [y0, setY0] = useState(0.5);
  const [h, setH] = useState(0.5);
  const [showField, setShowField] = useState(true);

  const ode = ODES[odeKey];

  // Euler march from (0, y0) to x = 2
  const euler: [number, number][] = [[0, y0]];
  let x = 0;
  let y = y0;
  const steps = Math.max(1, Math.round(2 / h));
  const hEff = 2 / steps;
  for (let i = 0; i < steps; i++) {
    y = y + hEff * ode.f(x, y);
    x = x + hEff;
    euler.push([x, y]);
  }
  const exactAt2 = ode.exact(2, y0);
  const eulerAt2 = euler[euler.length - 1][1];
  const error = Math.abs(eulerAt2 - exactAt2);

  // Screen mapping: x in [-0.2, 2.4], y in [-3, 6]
  const px = (xx: number) => 45 + ((xx + 0.2) / 2.6) * 400;
  const py = (yy: number) => 250 - ((yy + 3) / 9) * 220;
  const clipY = (yy: number) => Math.max(-6, Math.min(9, yy));

  const exactPts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const xx = (2.4 * i) / 80;
    exactPts.push(`${px(xx)},${py(clipY(ode.exact(xx, y0)))}`);
  }
  const eulerPts = euler.map(([xx, yy]) => `${px(xx)},${py(clipY(yy))}`).join(' ');

  const field: JSX.Element[] = [];
  if (showField) {
    for (let gx = 0; gx <= 12; gx++) {
      for (let gy = 0; gy <= 7; gy++) {
        const xx = -0.2 + (2.6 * gx) / 12;
        const yy = -3 + (9 * gy) / 7;
        const slope = Math.max(-4, Math.min(4, ode.f(xx, yy)));
        const dx = 8;
        const dy = Math.max(-20, Math.min(20, slope * dx * 1.2));
        field.push(
          <line key={`${gx}-${gy}`} x1={px(xx) - dx} y1={py(yy) + dy} x2={px(xx) + dx} y2={py(yy) - dy}
            stroke="#475569" strokeWidth={1} opacity={0.7} />
        );
      }
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 font-mono">dy</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 12 -- Differential Equations</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Slope Fields and Euler&apos;s Method, Live</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 280" className="w-full">
            {field}
            <line x1={45} y1={250} x2={445} y2={250} stroke="#475569" strokeWidth={1.5} />
            <line x1={px(0)} y1={20} x2={px(0)} y2={260} stroke="#475569" strokeWidth={1.5} />
            <text x={240} y={274} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">x</text>
            <polyline points={exactPts.join(' ')} fill="none" stroke="#34d399" strokeWidth={2.5} />
            <polyline points={eulerPts} fill="none" stroke="#f472b6" strokeWidth={2} strokeDasharray="5 4" />
            {euler.map(([xx, yy], i) => (
              <circle key={i} cx={px(xx)} cy={py(clipY(yy))} r={3.5} fill="#f472b6" />
            ))}
            <circle cx={px(0)} cy={py(y0)} r={5} fill="#fbbf24" />
            <text x={px(0) + 8} y={py(y0) - 8} fill="#fbbf24" fontSize={10} fontFamily="monospace">y(0) = {y0.toFixed(2)}</text>
            <circle cx={px(2)} cy={py(clipY(exactAt2))} r={4} fill="#34d399" />
            <circle cx={px(2)} cy={py(clipY(eulerAt2))} r={4} fill="#f472b6" />
            <text x={16} y={30} fill="#34d399" fontSize={10} fontFamily="monospace">exact: {ode.solution}</text>
            <text x={16} y={46} fill="#f472b6" fontSize={10} fontFamily="monospace">Euler: {steps} steps of h = {hEff.toFixed(3)}</text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2">
            <div><span className="text-slate-500">Euler y(2)</span><div className="text-pink-300 font-bold text-sm">{eulerAt2.toFixed(4)}</div></div>
            <div><span className="text-slate-500">Exact y(2)</span><div className="text-emerald-300 font-bold text-sm">{exactAt2.toFixed(4)}</div></div>
            <div><span className="text-slate-500">Abs error</span><div className="text-amber-300 font-bold text-sm">{error.toFixed(4)}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Choose the differential equation</p>
              <div className="grid grid-cols-1 gap-1.5">
                {(Object.keys(ODES) as OdeKey[]).map((k) => (
                  <button key={k} onClick={() => setOdeKey(k)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold text-left ${odeKey === k ? 'bg-gold-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                    {ODES[k].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Initial value y(0)</span><span className="font-mono font-bold text-amber-400">{y0.toFixed(1)}</span>
              </div>
              <input type="range" min={-2} max={2} step={0.1} value={y0} aria-label="Initial value"
                onChange={(e) => setY0(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Euler step size h</span><span className="font-mono font-bold text-pink-400">{h.toFixed(2)} ({Math.round(2 / h)} steps)</span>
              </div>
              <input type="range" min={0.04} max={1} step={0.02} value={h} aria-label="Euler step size"
                onChange={(e) => setH(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <button onClick={() => setShowField((s) => !s)}
              className={`w-full py-2 rounded-xl text-xs font-bold ${showField ? 'bg-slate-700 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
              {showField ? 'Hide slope field' : 'Show slope field'}
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-gold-300 font-bold">Euler recipe (order-1 accurate)</div>
            <div className="text-slate-400">y_(n+1) = y_n + h f(x_n, y_n)</div>
            <div className="text-slate-400">Last step used: y(1.60) + {hEff.toFixed(3)} x f(1.60, {euler[euler.length - 2]?.[1].toFixed(3)}) = {eulerAt2.toFixed(3)}</div>
            <div className="text-slate-500">Halve h --&gt; the error should roughly halve too (first-order method).</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              A differential equation assigns every point of the plane a direction -- the slope
              field -- and a solution is a curve that obeys every little arrow it passes through.
              Euler&apos;s method simply follows the arrows in short straight bites: variable
              separable and linear first-order equations have exact answers to compare against.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. For dy/dx = y with y0 = 1: exact y(2) is 2e = 7.389. Find the largest h that lands within 0.5 of it.</p>
            <p>2. Switch to dy/dx = x + y and push y0 to -2: why does the solution dive to a minimum near x = 1 before recovering? (Check the slope field there.)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_MathematicsChapter9DifferentialEquationsSim;
