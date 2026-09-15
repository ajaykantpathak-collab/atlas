'use client';
/**
 * C8_MathematicsAlgebraicExpressionsAndIdentitiesSim (Class 8 Maths)
 *
 * ELI5: Identities are algebra shortcuts that are ALWAYS true.
 * Cut a big square into pieces and you can SEE why
 * (a+b)^2 = a^2 + 2ab + b^2, (a-b)^2 = a^2 - 2ab + b^2 and (a+b)(a-b) = a^2 - b^2.
 */
import React, { useState } from 'react';

type Mode = 'plus' | 'minus' | 'diff';

export function C8_MathematicsAlgebraicExpressionsAndIdentitiesSim() {
  const [mode, setMode] = useState<Mode>('plus');
  const [a, setA] = useState(5);
  const [b, setB] = useState(2);

  const bEff = mode === 'minus' ? Math.min(b, a - 1) : b;
  const scale = 300 / (a + (mode === 'diff' ? bEff : 0) + 1);
  const S = (v: number) => v * scale;

  const identityText =
    mode === 'plus'
      ? `(a + b)^2 = a^2 + 2ab + b^2`
      : mode === 'minus'
        ? `(a - b)^2 = a^2 - 2ab + b^2`
        : `(a + b)(a - b) = a^2 - b^2`;

  const numeric =
    mode === 'plus'
      ? `(${a}+${bEff})^2 = ${a * a} + 2(${a})(${bEff}) + ${bEff * bEff} = ${(a + bEff) * (a + bEff)}`
      : mode === 'minus'
        ? `(${a}-${bEff})^2 = ${a * a} - 2(${a})(${bEff}) + ${bEff * bEff} = ${(a - bEff) * (a - bEff)}`
        : `(${a}+${bEff})(${a}-${bEff}) = ${a * a} - ${bEff * bEff} = ${a * a - bEff * bEff}`;

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Identity Area Models</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Why identities work:</span> draw the product as
          an area. The big picture never changes, only how we slice it. Drag a and b and watch each
          piece keep its own area while the total stays the same.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ['plus', '(a + b)^2'],
            ['minus', '(a - b)^2'],
            ['diff', '(a + b)(a - b)'],
          ] as [Mode, string][]
        ).map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-xl text-sm font-bold font-mono transition-all ${mode === m ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Controls */}
        <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>a</span>
              <span className="font-mono text-indigo-600">{a}</span>
            </label>
            <input type="range" min={2} max={8} value={a} aria-label="value of a" onChange={(e) => setA(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>b {mode === 'minus' && '(kept below a)'}</span>
              <span className="font-mono text-emerald-600">{bEff}</span>
            </label>
            <input
              type="range"
              min={1}
              max={mode === 'minus' ? 7 : 8}
              value={bEff}
              aria-label="value of b"
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full mt-1 accent-emerald-600"
            />
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <div className="font-mono text-sm font-bold text-indigo-700">{identityText}</div>
            <div className="font-mono text-xs text-slate-600 mt-2 leading-relaxed">{numeric}</div>
          </div>
          <div className="text-xs text-slate-500">
            Total picture side = {mode === 'diff' ? `a + b = ${a + bEff}` : `a = ${a}`} units (green square = a^2 area {a * a})
          </div>
        </div>

        {/* SVG area model */}
        <div className="md:col-span-3 p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 360 320" className="w-full">
            {mode === 'plus' && (
              <>
                <rect x={30} y={30} width={S(a)} height={S(a)} fill="#86efac" stroke="#16a34a" />
                <rect x={30 + S(a)} y={30} width={S(bEff)} height={S(a)} fill="#fde68a" stroke="#d97706" />
                <rect x={30} y={30 + S(a)} width={S(a)} height={S(bEff)} fill="#fde68a" stroke="#d97706" />
                <rect x={30 + S(a)} y={30 + S(a)} width={S(bEff)} height={S(bEff)} fill="#fca5a5" stroke="#dc2626" />
                <text x={30 + S(a) / 2} y={30 + S(a) / 2} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">a^2 = {a * a}</text>
                <text x={30 + S(a) + S(bEff) / 2} y={30 + S(a) / 2} textAnchor="middle" fontSize="12" fill="#92400e">ab = {a * bEff}</text>
                <text x={30 + S(a) / 2} y={30 + S(a) + S(bEff) / 2 + 4} textAnchor="middle" fontSize="12" fill="#92400e">ab = {a * bEff}</text>
                <text x={30 + S(a) + S(bEff) / 2} y={30 + S(a) + S(bEff) / 2 + 4} textAnchor="middle" fontSize="11" fill="#991b1b">b^2 = {bEff * bEff}</text>
              </>
            )}
            {mode === 'minus' && (
              <>
                <rect x={30} y={30} width={S(a)} height={S(a)} fill="#fde68a" stroke="#d97706" />
                <rect x={30} y={30} width={S(a - bEff)} height={S(a - bEff)} fill="#86efac" stroke="#16a34a" />
                <rect x={30 + S(a - bEff)} y={30} width={S(bEff)} height={S(a - bEff)} fill="#fca5a5" stroke="#dc2626" strokeDasharray="4" />
                <rect x={30} y={30 + S(a - bEff)} width={S(a - bEff)} height={S(bEff)} fill="#fca5a5" stroke="#dc2626" strokeDasharray="4" />
                <rect x={30 + S(a - bEff)} y={30 + S(a - bEff)} width={S(bEff)} height={S(bEff)} fill="#a5f3fc" stroke="#0891b2" />
                <text x={30 + S(a - bEff) / 2} y={30 + S(a - bEff) / 2} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#14532d">
                  (a-b)^2 = {(a - bEff) * (a - bEff)}
                </text>
                <text x={30 + S(a) / 2} y={24} textAnchor="middle" fontSize="11" fill="#92400e">big square a^2 = {a * a}</text>
                <text x={30 + S(a) + 8} y={30 + S(a - bEff) / 2} fontSize="10" fill="#991b1b">take away ab</text>
                <text x={30 + S(a - bEff) / 2} y={30 + S(a) + 16} textAnchor="middle" fontSize="10" fill="#991b1b">take away ab, put back b^2 = {bEff * bEff}</text>
              </>
            )}
            {mode === 'diff' && (
              <>
                <rect x={30} y={30} width={S(a)} height={S(a)} fill="#86efac" stroke="#16a34a" />
                <rect x={30 + S(a)} y={30} width={S(bEff)} height={S(a - bEff)} fill="#fde68a" stroke="#d97706" />
                <rect x={30} y={30 + S(a)} width={S(a + bEff)} height={S(bEff)} fill="#fbcfe8" stroke="#db2777" opacity={0.35} />
                <rect x={30 + S(a)} y={30 + S(a - bEff)} width={S(bEff)} height={S(bEff)} fill="#fca5a5" stroke="#dc2626" strokeDasharray="4" />
                <text x={30 + S(a) / 2} y={30 + S(a) / 2} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">a^2 = {a * a}</text>
                <text x={30 + S(a) + S(bEff) / 2} y={30 + (S(a - bEff)) / 2} textAnchor="middle" fontSize="10" fill="#92400e">shift this strip</text>
                <text x={30 + S(a + bEff) / 2} y={30 + S(a) + S(bEff) / 2 + 4} textAnchor="middle" fontSize="11" fill="#be185d">
                  (a+b)(a-b) = {(a + bEff) * (a - bEff)}
                </text>
                <text x={30 + S(a) + S(bEff) / 2} y={30 + S(a) - S(bEff) / 2} textAnchor="middle" fontSize="10" fill="#991b1b">cut b^2</text>
              </>
            )}
            <text x={30} y={310} fontSize="11" fill="#475569">
              {mode === 'diff' ? 'Rectangle: width a+b, height a-b' : mode === 'minus' ? 'a^2 minus two ab strips plus the b^2 corner' : 'Square of side a+b, four pieces'}
            </text>
          </svg>
        </div>
      </div>

      {/* What to try */}
      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Set a = 7, b = 3. Compute 7^2 + 2(21) + 9 in your head and check the picture totals 100.</li>
          <li>Use the (a+b)(a-b) model to find 98 x 102 instantly (hint: a = 100, b = 2). Verify with sliders.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsAlgebraicExpressionsAndIdentitiesSim;
