'use client';
/**
 * C8_MathematicsWeDistributeYetThingsMultiplySim (Class 8 Maths)
 *
 * ELI5: To multiply (a + b) x (c + d), cut a big rectangle into four smaller
 * ones: ac, ad, bc, bd. Distributing means each piece of the first bracket
 * meets each piece of the second. The picture IS the identity:
 * (a+b)(c+d) = ac + ad + bc + bd.
 */
import React, { useState } from 'react';

export function C8_MathematicsWeDistributeYetThingsMultiplySim() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(4);
  const [d, setD] = useState(3);
  const [showMoney, setShowMoney] = useState(false);

  const total = (a + b) * (c + d);
  const ac = a * c;
  const ad = a * d;
  const bc = b * c;
  const bd = b * d;
  const sum = ac + ad + bc + bd;

  // grid geometry: side = 8 unit cells, 26 px each
  const cell = 24;
  const origin = 30;
  const px = (u: number) => origin + u * cell;

  // number split: (20+a')(40+c') example mode uses 23 x 47 pattern
  const [splitX, setSplitX] = useState(23);
  const x1 = Math.floor(splitX / 10) * 10;
  const x2 = splitX % 10;
  const y1 = Math.floor((c * 10 + d) / 10) * 10;
  const y2 = (c * 10 + d) % 10;
  const parts = [x1 * y1, x1 * y2, x2 * y1, x2 * y2];
  const partsSum = parts.reduce((s, v) => s + v, 0);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">We Distribute, Yet Things Multiply</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">One picture, two ideas:</span> the rectangle
          model proves the distributive law for letters AND numbers. Every part of (a + b) shakes
          hands with every part of (c + d), and the four handshake areas add to the whole. Mental
          maths like 23 x 47 works the same way: split, multiply, add.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setShowMoney((s) => !s)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${showMoney ? 'bg-amber-500 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          {showMoney ? 'Number split: shown (bottom)' : 'Number split: hidden'}
        </button>
        <button onClick={() => { setA(2); setB(3); setC(4); setD(3); }} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 transition-all">
          Reset pieces
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2 bg-gradient-to-br from-gold-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 240 240" className="w-full">
            {/* side labels */}
            <text x={px(a / 2)} y={22} textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="bold">a={a}</text>
            <text x={px(a + b / 2)} y={22} textAnchor="middle" fontSize="11" fill="#0891b2" fontWeight="bold">b={b}</text>
            <text x={14} y={px(c / 2) + 4} textAnchor="middle" fontSize="11" fill="#d97706" fontWeight="bold">c={c}</text>
            <text x={14} y={px(c + d / 2) + 4} textAnchor="middle" fontSize="11" fill="#db2777" fontWeight="bold">d={d}</text>
            <line x1={px(a)} y1={26} x2={px(a)} y2={px(c + d)} stroke="#94a3b8" strokeDasharray="3 3" />
            <line x1={origin} y1={px(c)} x2={px(a + b)} y2={px(c)} stroke="#94a3b8" strokeDasharray="3 3" />
            {/* four areas */}
            <rect x={origin} y={px(0)} width={a * cell} height={c * cell} fill="#c7d2fe" stroke="#4338ca" style={{ transition: 'all 250ms' }} />
            <text x={px(a / 2)} y={px(c / 2) + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#312e81">ac={ac}</text>
            <rect x={px(a)} y={px(0)} width={b * cell} height={c * cell} fill="#a5f3fc" stroke="#0891b2" style={{ transition: 'all 250ms' }} />
            <text x={px(a + b / 2)} y={px(c / 2) + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#155e75">bc={bc}</text>
            <rect x={origin} y={px(c)} width={a * cell} height={d * cell} fill="#fde68a" stroke="#d97706" style={{ transition: 'all 250ms' }} />
            <text x={px(a / 2)} y={px(c + d / 2) + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">ad={ad}</text>
            <rect x={px(a)} y={px(c)} width={b * cell} height={d * cell} fill="#fbcfe8" stroke="#db2777" style={{ transition: 'all 250ms' }} />
            <text x={px(a + b / 2)} y={px(c + d / 2) + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9d174d">bd={bd}</text>
            <rect x={origin} y={px(0)} width={(a + b) * cell} height={(c + d) * cell} fill="none" stroke="#1e293b" strokeWidth={1.5} />
            <text x={120} y={232} textAnchor="middle" fontSize="10" fill="#475569">big rectangle: (a+b) wide, (c+d) tall</text>
          </svg>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          {([['a', a, setA], ['b', b, setB], ['c', c, setC], ['d', d, setD]] as [string, number, (v: number) => void][]).map(([label, val, setter]) => (
            <div key={label}>
              <label className="text-xs font-semibold text-slate-500 flex justify-between">
                <span>{label}</span>
                <span className="font-mono text-gold-600">{val}</span>
              </label>
              <input type="range" min={1} max={6} value={val} aria-label={label} onChange={(e) => setter(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
            </div>
          ))}
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div className="text-gold-700 font-bold">({a}+{b}) x ({c}+{d}) = {a + b} x {c + d} = {total}</div>
            <div>= {ac} + {ad} + {bc} + {bd} = <span className="text-emerald-700 font-bold">{sum}</span></div>
            <div className={`mt-1 text-xs ${total === sum ? 'text-emerald-600' : 'text-rose-600'}`}>
              {total === sum ? 'both routes agree - identity verified' : 'mismatch?! (should never happen)'}
            </div>
          </div>
        </div>
      </div>

      {showMoney && (
        <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">SAME TRICK WITH NUMBERS: split and multiply</p>
          <label className="text-xs font-semibold text-slate-500 flex justify-between">
            <span>Number to split x (second stays {y1} + {y2} = {c * 10 + d})</span>
            <span className="font-mono text-gold-600">{splitX}</span>
          </label>
          <input type="range" min={11} max={49} value={splitX} aria-label="number to split" onChange={(e) => setSplitX(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
          <div className="mt-2 font-mono text-sm text-slate-700">
            {splitX} x {c * 10 + d} = ({x1}+{x2}) x ({y1}+{y2}) = {parts.join(' + ')} = <span className="text-amber-700 font-bold">{partsSum}</span>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Make a square piece (a = c = 3, b = d = 3): check that (a+b)^2 = a^2 + 2ab + b^2 appears inside the four areas.</li>
          <li>Compute 34 x 26 mentally using the split view, then verify the four parts add to 884.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsWeDistributeYetThingsMultiplySim;
