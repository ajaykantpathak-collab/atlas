'use client';
/**
 * C8_MathematicsDirectAndInverseProportionsIntroductionSim (Class 8 Maths)
 *
 * ELI5: The simplest way to SEE proportion is a table. Fill in x and watch y.
 * If y/x is the same number in every row, x and y are in direct proportion.
 * If x x y is the same number in every row, they are in inverse proportion.
 */
import React, { useMemo, useState } from 'react';

type Mode = 'direct' | 'inverse';

export function C8_MathematicsDirectAndInverseProportionsIntroductionSim() {
  const [mode, setMode] = useState<Mode>('direct');
  const [k, setK] = useState(6);
  const [x, setX] = useState(3);

  const rows = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((r) => {
      const y = mode === 'direct' ? k * r : Math.round((k / r) * 100) / 100;
      return { r, y, ratio: Math.round((y / r) * 100) / 100, product: Math.round(y * r * 100) / 100 };
    });
  }, [mode, k]);

  const yNow = mode === 'direct' ? k * x : Math.round((k / x) * 100) / 100;
  const constantVal = mode === 'direct' ? k : k;

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">Proportions: The Constant Detective</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">Detective rule:</span> in every row of a
          proportional table one calculation refuses to change. Direct proportion hides a constant
          <span className="font-mono"> ratio y/x</span>; inverse proportion hides a constant
          <span className="font-mono"> product x x y</span>. Find the constant and you can predict
          any missing value instantly.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setMode('direct')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'direct' ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Direct: y = k x x
        </button>
        <button onClick={() => setMode('inverse')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'inverse' ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Inverse: y = k / x
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>Constant k {mode === 'direct' ? '(price per pen, Rs)' : '(total work, hours)'}</span>
              <span className="font-mono text-emerald-600">{k}</span>
            </label>
            <input type="range" min={2} max={24} value={k} aria-label="constant k" onChange={(e) => setK(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>Chosen x {mode === 'direct' ? '(pens)' : '(workers)'}</span>
              <span className="font-mono text-gold-600">{x}</span>
            </label>
            <input type="range" min={1} max={12} value={x} aria-label="chosen x" onChange={(e) => setX(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-sm font-mono">
            <div>
              y = {mode === 'direct' ? `k x x = ${k} x ${x}` : `k / x = ${k} / ${x}`} = <span className="text-gold-700 font-bold">{yNow}</span>
            </div>
            <div className="mt-1 text-slate-500">
              {mode === 'direct' ? 'check: y/x = ' + yNow + '/' + x + ' = ' + Math.round((yNow / x) * 100) / 100 : 'check: x x y = ' + x + ' x ' + yNow + ' = ' + Math.round(x * yNow * 100) / 100}
            </div>
          </div>
          <div className="text-xs text-slate-500">
            {mode === 'direct'
              ? 'The story: pens at k rupees each - buy twice as many, pay twice as much.'
              : 'The story: k hours of work to share - twice as many workers, half the hours each.'}
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs">
                <th className="py-1 text-left">x</th>
                <th className="text-left">y</th>
                <th className="text-left">y / x</th>
                <th className="text-left">x x y</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {rows.map((row) => (
                <tr
                  key={row.r}
                  className={`border-t border-slate-200 transition-all ${row.r === x ? 'bg-gold-100 font-bold' : ''}`}
                >
                  <td className="py-1.5">{row.r}</td>
                  <td>{row.y}</td>
                  <td className={mode === 'direct' ? 'text-emerald-600' : 'text-slate-400'}>{row.ratio}</td>
                  <td className={mode === 'inverse' ? 'text-emerald-600' : 'text-slate-400'}>{row.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
            {mode === 'direct'
              ? `The y/x column is stuck at ${constantVal} - direct proportion confirmed.`
              : `The x x y column is stuck at ${constantVal} - inverse proportion confirmed.`}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Direct mode: set k = 8. Without sliders, predict y for x = 9, then set x = 9 and verify.</li>
          <li>Inverse mode: find a k where x = 4 gives exactly y = 3. Then read the row x = 6: did you predict 2?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsDirectAndInverseProportionsIntroductionSim;
