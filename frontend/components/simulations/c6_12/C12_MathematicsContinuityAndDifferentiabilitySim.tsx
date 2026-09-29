'use client';

import React, { useState } from 'react';

/**
 * Class 12 Maths -- Continuity and Differentiability
 * Probe LHL, RHL and the symmetric-difference quotient around a moving point
 * a for classic test functions; continuity and differentiability verdicts are
 * computed numerically, not asserted. Self-contained: react + tailwind only.
 */

type FnKey = 'abs' | 'sinc' | 'step' | 'xabs' | 'recip';
const FNS: Record<FnKey, { label: string; f: (x: number) => number; defined: (x: number) => boolean; note: string }> = {
  abs: { label: 'f(x) = |x|', f: Math.abs, defined: () => true, note: 'continuous everywhere, but a corner at 0: slope -1 on the left, +1 on the right' },
  sinc: { label: 'f(x) = sin(x)/x, f(0) = ?', f: (x) => Math.sin(x) / x, defined: (x) => x !== 0, note: 'removable discontinuity at 0 -- the famous limit is 1' },
  step: { label: 'f(x) = 1 (x<1), 2 (x>=1)', f: (x) => (x < 1 ? 1 : 2), defined: () => true, note: 'jump discontinuity at x = 1: LHL and RHL never agree' },
  xabs: { label: 'f(x) = x|x|', f: (x) => x * Math.abs(x), defined: () => true, note: 'kink that IS smooth enough: derivative exists at 0 (it is 0)' },
  recip: { label: 'f(x) = 1/x', f: (x) => 1 / x, defined: (x) => x !== 0, note: 'infinite discontinuity at 0 -- one-sided limits blow up' },
};

export function C12_MathematicsContinuityAndDifferentiabilitySim() {
  const [fnKey, setFnKey] = useState<FnKey>('abs');
  const [a, setA] = useState(0);

  const fn = FNS[fnKey];
  const eps = 1e-4;
  const lhl = fn.defined(a - eps) ? fn.f(a - eps) : NaN;
  const rhl = fn.defined(a + eps) ? fn.f(a + eps) : NaN;
  const fa = fn.defined(a) ? fn.f(a) : NaN;
  const gap = Math.abs(rhl - lhl);
  const continuous = Number.isFinite(lhl) && Number.isFinite(rhl) && Number.isFinite(fa) && gap < 1e-3 && Math.abs(lhl - fa) < 1e-3;

  // Differentiability: symmetric difference quotient shrinking
  const secant = (h: number) => (fn.defined(a + h) && fn.defined(a - h)) ? (fn.f(a + h) - fn.f(a - h)) / (2 * h) : NaN;
  const d1 = secant(0.5);
  const d2 = secant(0.1);
  const d3 = secant(0.02);
  const d4 = secant(0.005);
  const converging = [d1, d2, d3, d4].every(Number.isFinite) &&
    Math.abs(d4 - d3) < 1e-2 && Math.abs(d3 - d2) < 0.15;
  const differentiable = continuous && converging;

  // Plot: x in [-3.2, 3.2], y in [-2.5, 3.5]
  const px = (x: number) => 40 + ((x + 3.2) / 6.4) * 410;
  const py = (y: number) => 140 - ((y + 0.5) / 4) * 120;
  const yClamp = (y: number) => Math.max(-4, Math.min(6, y));
  const segments: string[] = [];
  let current: string[] = [];
  for (let i = 0; i <= 400; i++) {
    const x = -3.2 + (6.4 * i) / 400;
    if (!fn.defined(x) || Math.abs(fn.f(x)) > 6) {
      if (current.length > 1) segments.push(current.join(' '));
      current = [];
      continue;
    }
    current.push(`${px(x)},${py(yClamp(fn.f(x)))}`);
  }
  if (current.length > 1) segments.push(current.join(' '));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 font-mono">lim</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 12 -- Continuity and Differentiability</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Probe the Point: Continuous? Differentiable?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 280" className="w-full">
            <line x1={40} y1={140} x2={450} y2={140} stroke="#475569" strokeWidth={1.5} />
            <line x1={px(0)} y1={20} x2={px(0)} y2={260} stroke="#475569" strokeWidth={1.5} />
            {segments.map((s, i) => (
              <polyline key={i} points={s} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            ))}
            {/* probe point */}
            <circle cx={px(a)} cy={py(yClamp(Number.isFinite(fa) ? fa : (Number.isFinite(lhl) ? lhl : 0)))} r={6}
              fill={continuous ? '#34d399' : '#f87171'} stroke="#fff" strokeWidth={1.5} />
            <line x1={px(a)} y1={25} x2={px(a)} y2={255} stroke="#f472b6" strokeWidth={1} strokeDasharray="4 4" />
            <text x={px(a) + 6} y={36} fill="#f9a8d4" fontSize={11} fontFamily="monospace">a = {a.toFixed(2)}</text>
            {/* LHL/RHL dots */}
            {Number.isFinite(lhl) && <circle cx={px(a - 0.05)} cy={py(yClamp(lhl))} r={4} fill="#fbbf24" />}
            {Number.isFinite(rhl) && <circle cx={px(a + 0.05)} cy={py(yClamp(rhl))} r={4} fill="#fbbf24" />}
            <text x={44} y={36} fill="#38bdf8" fontSize={10} fontFamily="monospace">{fn.label}</text>
            <text x={44} y={252} fill="#475569" fontSize={10} fontFamily="monospace">yellow dots: f(a-h), f(a+h) probes</text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">LHL = f(a-h), h = 10^-4</span><div className="text-amber-300 font-bold text-sm">{Number.isFinite(lhl) ? lhl.toFixed(4) : 'undefined'}</div></div>
            <div><span className="text-slate-500">RHL = f(a+h)</span><div className="text-amber-300 font-bold text-sm">{Number.isFinite(rhl) ? rhl.toFixed(4) : 'undefined'}</div></div>
            <div><span className="text-slate-500">f(a)</span><div className="text-slate-200 font-bold text-sm">{Number.isFinite(fa) ? fa.toFixed(4) : 'not defined'}</div></div>
            <div><span className="text-slate-500">Verdict</span><div className={`font-bold text-sm ${continuous ? 'text-emerald-300' : 'text-rose-400'}`}>{continuous ? 'continuous' : 'NOT continuous'}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Choose the test function</p>
              <div className="grid grid-cols-1 gap-1.5">
                {(Object.keys(FNS) as FnKey[]).map((k) => (
                  <button key={k} onClick={() => setFnKey(k)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-mono font-bold text-left ${fnKey === k ? 'bg-gold-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                    {FNS[k].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Probe point a</span><span className="font-mono font-bold text-pink-400">{a.toFixed(2)}</span>
              </div>
              <input type="range" min={-3} max={3} step={0.05} value={a} aria-label="Probe point"
                onChange={(e) => setA(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-gold-300 font-bold">Symmetric difference quotient [f(a+h) - f(a-h)] / 2h</div>
            {[['h = 0.5', d1], ['h = 0.1', d2], ['h = 0.02', d3], ['h = 0.005', d4]].map(([lbl, d]) => (
              <div key={lbl as string} className="flex justify-between text-slate-400">
                <span>{lbl as string}</span><span>{Number.isFinite(d as number) ? (d as number).toFixed(4) : '--'}</span>
              </div>
            ))}
            <div className={`pt-1 font-bold ${differentiable ? 'text-emerald-300' : 'text-rose-400'}`}>
              {differentiable ? `differentiable here, f'(a) ~ ${(d4 as number).toFixed(3)}` : 'quotients do NOT settle: not differentiable here'}
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">{fn.note}</p>
            <p className="mt-1">
              Differentiability needs continuity first, then the difference quotient must approach ONE
              number. Corners give two disagreeing one-sided derivatives; jumps fail even earlier.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. For |x|, compare the h-table at a = 0 versus a = 0.5 -- the first refuses to converge, the second settles at -0.5 or +0.5? Check.</p>
            <p>2. Slide a across x = 1 for the step function and catch the exact instant LHL stops equalling RHL. What is the size of the jump?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_MathematicsContinuityAndDifferentiabilitySim;
