'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'A percentage is just "out of 100". If a cricket bat costing Rs 500 has a 20% discount, you pay ' +
  '20/100 less, i.e. Rs 100 less, so Rs 400. Shops also use profit percent: profit% = (profit / cost) x 100. ' +
  'Move the sliders and watch the 100-square fill up!';

export function C7_MathematicsComparingQuantitiesSim() {
  const [price, setPrice] = useState(500);
  const [percent, setPercent] = useState(20);
  const [mode, setMode] = useState<'discount' | 'profit'>('discount');
  const [gridShow, setGridShow] = useState(true);

  const share = useMemo(() => Math.round((price * percent) / 100 * 100) / 100, [price, percent]);
  const final = mode === 'discount' ? price - share : price + share;

  // 100-square: how many of the 100 cells does percent fill
  const filled = Math.round(percent);
  const cells = Array.from({ length: 100 }, (_, i) => i < filled);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Comparing Quantities: The Percentage Shop</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Mode */}
      <div className="flex gap-2 mt-4">
        {([
          { id: 'discount' as const, label: 'Discount at a sale', emoji: '🏷️' },
          { id: 'profit' as const, label: 'Profit for a seller', emoji: '📈' },
        ]).map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${mode === m.id ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {m.emoji} {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Receipt */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">{mode === 'discount' ? 'Sale receipt' : 'Seller diary'}</div>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between"><span className="text-slate-400">{mode === 'discount' ? 'Marked price' : 'Cost price'}</span><span>Rs {price}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">{mode === 'discount' ? 'Discount' : 'Profit'} ({percent}%)</span><span className={mode === 'discount' ? 'text-pink-300' : 'text-emerald-300'}>{mode === 'discount' ? '- ' : '+ '}Rs {share}</span></div>
            <div className="flex justify-between border-t border-slate-700 pt-2 font-bold"><span>{mode === 'discount' ? 'You pay' : 'Selling price'}</span><span className="text-indigo-300">Rs {final}</span></div>
          </div>
          <div className="mt-3 text-xs text-slate-400 leading-relaxed">
            Working: {percent}/100 x Rs {price} = Rs {share}
            <br />
            {mode === 'discount' ? `${price} - ${share} = ${final}` : `${price} + ${share} = ${final}`}
          </div>
        </div>

        {/* 100 square */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">{percent}% of the 100-square</div>
          <svg viewBox="0 0 220 220" className="w-full max-w-[220px] mx-auto">
            {cells.map((on, i) => {
              const cx = i % 10;
              const cy = Math.floor(i / 10);
              return (
                <rect
                  key={i}
                  x={cx * 21 + 5}
                  y={cy * 21 + 5}
                  width={18}
                  height={18}
                  rx={3}
                  fill={on ? (mode === 'discount' ? '#f472b6' : '#34d399') : '#1e293b'}
                  stroke="#334155"
                  strokeWidth={1}
                  style={{ transition: 'fill 0.25s' }}
                />
              );
            })}
          </svg>
          <div className="text-center text-xs text-slate-400 mt-1">
            {filled} of 100 squares coloured = {filled}%
            {gridShow && percent !== filled && <span className="text-amber-300"> (slider is {percent}%)</span>}
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>{mode === 'discount' ? 'Marked / cost price' : 'Cost price'}</span>
            <span className="font-mono font-bold text-sky-300">Rs {price}</span>
          </label>
          <input type="range" aria-label="price" min={50} max={2000} step={10} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Percentage</span>
            <span className="font-mono font-bold text-emerald-300">{percent}%</span>
          </label>
          <input type="range" aria-label="percentage" min={0} max={100} value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {[10, 25, 50, 75].map((p) => (
          <button
            key={p}
            onClick={() => setPercent(p)}
            className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
          >
            {p}%
          </button>
        ))}
        <button onClick={() => setGridShow((s) => !s)} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          {gridShow ? 'Hide' : 'Show'} grid note
        </button>
        <button
          onClick={() => { setPrice(Math.round((50 + Math.random() * 195) * 10)); setPercent(Math.floor(Math.random() * 101)); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Random sale
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Find a price and percent where the discount is EXACTLY Rs 150. How many different pairs can you find?</li>
          <li>Switch to profit mode: if a seller buys at Rs 400 and wants 25% profit, what selling price must they write? Check with the sliders.</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsComparingQuantitiesSim;
