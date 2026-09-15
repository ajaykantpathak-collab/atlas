'use client';

import React, { useState } from 'react';

/**
 * Class 10 Maths -- Introduction to Trigonometry
 * A live right triangle: drag the angle and hypotenuse, watch the sides
 * and the sin/cos/tan ratios update. Special angles show exact values.
 * Self-contained: react + tailwind only.
 */

const EXACT: Record<number, { sin: string; cos: string; tan: string }> = {
  0: { sin: '0', cos: '1', tan: '0' },
  30: { sin: '1/2', cos: 'sqrt(3)/2', tan: '1/sqrt(3)' },
  45: { sin: '1/sqrt(2)', cos: '1/sqrt(2)', tan: '1' },
  60: { sin: 'sqrt(3)/2', cos: '1/2', tan: 'sqrt(3)' },
  90: { sin: '1', cos: '0', tan: 'undefined' },
};

export function C10_MathematicsIntroductionToTrigonometrySim() {
  const [theta, setTheta] = useState(30);
  const [hyp, setHyp] = useState(10);
  const [labelMode, setLabelMode] = useState<'names' | 'letters'>('names');

  const rad = (theta * Math.PI) / 180;
  const opp = hyp * Math.sin(rad);
  const adj = hyp * Math.cos(rad);
  const sinV = Math.sin(rad);
  const cosV = Math.cos(rad);
  const tanV = theta >= 90 ? Infinity : opp / Math.max(adj, 0.001);

  // Triangle in SVG space: right angle at C (bottom-left), theta at B (bottom-right)
  const bx = 392;
  const by = 336;
  const L = 272; // hypotenuse in px
  const ax = bx - L * Math.cos(rad);
  const ay = by - L * Math.sin(rad);
  const cX = ax;
  const cY = by;
  const oppMidY = (ay + cY) / 2;
  const adjMidX = (cX + bx) / 2;
  const hypMidX = (ax + bx) / 2 - 26;
  const hypMidY = (ay + by) / 2 - 8;
  const arcEndX = bx - 52 * Math.cos(rad);
  const arcEndY = by - 52 * Math.sin(rad);

  const exact = EXACT[theta];

  const row = (name: string, num: string, val: number, ex: string | undefined, color: string) => (
    <div className="flex items-center justify-between bg-slate-950 rounded-xl px-3 py-2 border border-slate-800">
      <span className="text-xs text-slate-400">
        {name} = <span className="text-slate-300">{num}</span>
      </span>
      <span className={`font-mono font-bold ${color}`}>{ex ? ex : val.toFixed(3)}</span>
    </div>
  );

  const oppName = labelMode === 'names' ? 'Opposite (perp.)' : 'BC';
  const adjName = labelMode === 'names' ? 'Adjacent (base)' : 'AB';
  const hypName = labelMode === 'names' ? 'Hypotenuse' : 'AC';

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-sky-950/80 rounded-2xl border border-sky-700">📏</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Class 10 -- Introduction to Trigonometry</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Ratios of a Right Triangle, Live</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 380" className="w-full">
            <line x1={30} y1={by + 22} x2={430} y2={by + 22} stroke="#1e293b" strokeWidth={2} />
            <polygon points={`${ax},${ay} ${bx},${by} ${cX},${cY}`}
              fill="rgba(14,165,233,0.10)" stroke="#38bdf8" strokeWidth={3} strokeLinejoin="round" />
            <polyline points={`${cX + 16},${cY} ${cX + 16},${cY - 16} ${cX},${cY - 16}`}
              fill="none" stroke="#94a3b8" strokeWidth={2} />
            <path d={`M ${bx - 52},${by} A 52 52 0 0 0 ${arcEndX},${arcEndY}`}
              fill="none" stroke="#fbbf24" strokeWidth={2.5} />
            <text x={bx - 96} y={by - 16} fill="#fbbf24" fontSize={14} fontWeight="bold">
              angle = {theta} deg
            </text>
            <text x={cX - 12} y={oppMidY} fill="#f472b6" fontSize={12} fontWeight="bold" textAnchor="end">
              {oppName}
            </text>
            <text x={adjMidX} y={cY - 8} fill="#34d399" fontSize={12} fontWeight="bold" textAnchor="middle">
              {adjName}
            </text>
            <text x={hypMidX} y={hypMidY} fill="#818cf8" fontSize={12} fontWeight="bold" textAnchor="middle">
              {hypName}
            </text>
            <g fontSize={11} fontFamily="monospace">
              <text x={cX - 12} y={oppMidY + 14} fill="#f9a8d4" textAnchor="end">{opp.toFixed(2)}</text>
              <text x={adjMidX} y={cY + 8} fill="#6ee7b7" textAnchor="middle">{adj.toFixed(2)}</text>
              <text x={hypMidX} y={hypMidY + 14} fill="#a5b4fc" textAnchor="middle">{hyp.toFixed(2)}</text>
            </g>
            <circle cx={ax} cy={ay} r={6} fill="#f472b6" />
            <circle cx={bx} cy={by} r={6} fill="#fbbf24" />
            <circle cx={cX} cy={cY} r={6} fill="#34d399" />
          </svg>
          <div className="flex flex-wrap gap-3 text-xs mt-1">
            <span className="px-2 py-1 rounded-lg bg-pink-950 text-pink-300">sin = {opp.toFixed(2)}/{hyp}</span>
            <span className="px-2 py-1 rounded-lg bg-emerald-950 text-emerald-300">cos = {adj.toFixed(2)}/{hyp}</span>
            <span className="px-2 py-1 rounded-lg bg-amber-950 text-amber-300">tan = {opp.toFixed(2)}/{adj.toFixed(2)}</span>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Angle theta</span>
                <span className="font-mono font-bold text-amber-400">{theta} deg</span>
              </div>
              <input type="range" min={0} max={90} value={theta} aria-label="Angle theta"
                onChange={(e) => setTheta(Number(e.target.value))} className="w-full accent-amber-500" />
              <div className="flex gap-1 mt-2">
                {[0, 30, 45, 60, 90].map((a) => (
                  <button key={a} onClick={() => setTheta(a)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition ${theta === a ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Hypotenuse h</span>
                <span className="font-mono font-bold text-indigo-400">{hyp}</span>
              </div>
              <input type="range" min={4} max={14} value={hyp} aria-label="Hypotenuse"
                onChange={(e) => setHyp(Number(e.target.value))} className="w-full accent-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setLabelMode('names')}
                className={`py-2 rounded-xl text-xs font-bold ${labelMode === 'names' ? 'bg-sky-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Side names
              </button>
              <button onClick={() => setLabelMode('letters')}
                className={`py-2 rounded-xl text-xs font-bold ${labelMode === 'letters' ? 'bg-sky-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Vertex letters
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-sky-800/60 p-4 space-y-2">
            {row('sin (theta)', 'Opp/Hyp', sinV, exact?.sin, 'text-pink-300')}
            {row('cos (theta)', 'Adj/Hyp', cosV, exact?.cos, 'text-emerald-300')}
            {row('tan (theta)', 'Opp/Adj', tanV, exact?.tan, 'text-amber-300')}
            <p className="text-[11px] text-slate-500 pt-1">
              {exact
                ? 'Exact value shown because theta is a standard angle.'
                : `Check: sin^2 + cos^2 = ${(sinV * sinV + cosV * cosV).toFixed(3)} -- always 1.`}
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Ratios depend only on the angle, never on triangle size. Double h and every ratio stays
              frozen -- all sides scale together. Also tan = sin / cos, always.
            </p>
          </div>

          <div className="bg-sky-950/40 rounded-2xl border border-sky-800/50 p-4 text-xs">
            <p className="font-bold text-sky-300 mb-1">What to try</p>
            <p>1. Slide theta to 45. What do you notice about the two legs? Why must that happen?</p>
            <p>2. Find the angle where sin equals cos, then prove why the complementary angle must give the same swap.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C10_MathematicsIntroductionToTrigonometrySim;
