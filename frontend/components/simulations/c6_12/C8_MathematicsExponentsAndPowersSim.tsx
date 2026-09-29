'use client';
/**
 * C8_MathematicsExponentsAndPowersSim (Class 8 Maths)
 *
 * ELI5: A negative exponent means "one over": 2^-3 = 1/(2^3) = 1/8.
 * Multiplying powers with the same base ADDS the exponents:
 * 10^4 x 10^2 = 10^6. These two ideas let us write huge and tiny numbers
 * neatly in standard form.
 */
import React, { useMemo, useState } from 'react';

type Mode = 'explore' | 'laws' | 'standard';

export function C8_MathematicsExponentsAndPowersSim() {
  const [mode, setMode] = useState<Mode>('explore');
  const [base, setBase] = useState(2);
  const [exp, setExp] = useState(-3);
  const [m, setM] = useState(4);
  const [nP, setNP] = useState(2);
  const [bigNum, setBigNum] = useState(4);

  const value = Math.pow(base, exp);
  const valueStr = exp >= 0 ? String(value) : `1/${Math.pow(base, -exp)} = ${value}`;
  const lawValue = Math.pow(base, m + nP);

  // standard form: N x 10^bigNum
  const standard = `1.${bigNum} x 10^${bigNum + 1}`;
  const expanded = (1 + bigNum / 10) * Math.pow(10, bigNum + 1);

  const logBars = useMemo(() => {
    return [-3, -2, -1, 0, 1, 2, 3].map((e) => {
      const v = Math.pow(2, e);
      const width = 50 * (1 + e / 3); // visual, not linear
      return { e, v, width };
    });
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">Exponents and Powers</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">Two big ideas:</span> negative exponents flip
          the number into a fraction (each step down divides by the base again), and the product law
          says the exponent counts how many base factors you multiply - so multiplying powers adds
          the counts. Powers of 10 are the scientist's shorthand for huge and tiny sizes.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['explore', 'Negative exponents'], ['laws', 'Product law'], ['standard', 'Standard form']] as [Mode, string][]).map(([mm, label]) => (
          <button key={mm} onClick={() => setMode(mm)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === mm ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          {mode === 'explore' && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Base</span><span className="font-mono text-gold-600">{base}</span></label>
                <input type="range" min={2} max={5} value={base} aria-label="base" onChange={(e) => setBase(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Exponent (-4 to 4)</span><span className="font-mono text-emerald-600">{exp}</span></label>
                <input type="range" min={-4} max={4} value={exp} aria-label="exponent" onChange={(e) => setExp(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                <div className="text-lg font-bold text-gold-700">{base}^{exp} = {valueStr}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {exp >= 0
                    ? `multiply ${base} by itself ${exp} times`
                    : `negative exponent: 1 / ${base}^${-exp} - each step below zero divides by ${base}`}
                </div>
              </div>
            </>
          )}
          {mode === 'laws' && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Exponent m</span><span className="font-mono text-gold-600">{m}</span></label>
                <input type="range" min={1} max={6} value={m} aria-label="m" onChange={(e) => setM(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Exponent n</span><span className="font-mono text-emerald-600">{nP}</span></label>
                <input type="range" min={1} max={6} value={nP} aria-label="n" onChange={(e) => setNP(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                <div>{base}^{m} x {base}^{nP} = {base}^({m}+{nP}) = {base}^{m + nP}</div>
                <div className="mt-1 text-slate-600">
                  check: {Math.pow(base, m)} x {Math.pow(base, nP)} = {Math.pow(base, m) * Math.pow(base, nP)} and {base}^{m + nP} = {lawValue}
                </div>
                <div className="mt-1 text-xs text-slate-500">{m} factors x {nP} factors = {m + nP} factors - that is WHY the law works.</div>
              </div>
            </>
          )}
          {mode === 'standard' && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Power of ten</span><span className="font-mono text-gold-600">10^{bigNum + 1}</span></label>
                <input type="range" min={0} max={8} value={bigNum} aria-label="power of ten" onChange={(e) => setBigNum(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                <div className="text-gold-700 font-bold">{standard}</div>
                <div className="mt-1 text-slate-600">= {expanded.toLocaleString('en-IN')}</div>
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                Standard form = a number between 1 and 10, times a power of ten. Astronomers write
                150,000,000 km (Earth-Sun distance) as 1.5 x 10^8 km.
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-gradient-to-br from-gold-50 to-white rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500">POWER LADDER of 2 (log-style view)</p>
          <svg viewBox="0 0 340 220" className="w-full mt-1">
            <line x1={170} y1={5} x2={170} y2={200} stroke="#cbd5e1" strokeDasharray="4 3" />
            {logBars.map((b, i) => {
              const y = 15 + i * 26;
              const active = mode === 'explore' && b.e === exp;
              return (
                <g key={b.e}>
                  {b.e >= 0 ? (
                    <rect x={170} y={y} width={b.width} height={18} rx={4} fill={active ? '#4338ca' : '#a5b4fc'} opacity={0.9} style={{ transition: 'all 300ms' }} />
                  ) : (
                    <rect x={170 - b.width} y={y} width={b.width} height={18} rx={4} fill={active ? '#0891b2' : '#a5f3fc'} opacity={0.9} style={{ transition: 'all 300ms' }} />
                  )}
                  <text x={b.e >= 0 ? 178 + b.width : 162 - b.width} y={y + 13} fontSize="10" textAnchor={b.e >= 0 ? 'start' : 'end'} fill="#334155" fontWeight={active ? 'bold' : 'normal'}>
                    2^{b.e} = {b.v < 1 ? '1/' + Math.pow(2, -b.e) : b.v}
                  </text>
                </g>
              );
            })}
            <text x={170} y={215} textAnchor="middle" fontSize="10" fill="#475569">left of the dashed line = fractions (negative powers)</text>
          </svg>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find two different exponent pairs that make 2^? equal 64. Which product-law sums do they use?</li>
          <li>Write 5,60,00,000 (population of a big state) in standard form, then rebuild it with the slider.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsExponentsAndPowersSim;
