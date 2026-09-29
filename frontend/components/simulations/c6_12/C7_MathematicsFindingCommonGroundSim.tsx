'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Two numbers often share hidden common ground: the factors they BOTH have and the multiples they ' +
  'BOTH reach. The biggest shared factor is the HCF (Highest Common Factor); the smallest shared ' +
  'meeting point on the number line is the LCM (Lowest Common Multiple). Watch the two dot-rows meet!';

export function C7_MathematicsFindingCommonGroundSim() {
  const [numA, setNumA] = useState(12);
  const [numB, setNumB] = useState(18);
  const [view, setView] = useState<'factors' | 'multiples'>('factors');

  const facts = useMemo(() => {
    const fa: number[] = [];
    const fb: number[] = [];
    for (let i = 1; i <= numA; i++) if (numA % i === 0) fa.push(i);
    for (let i = 1; i <= numB; i++) if (numB % i === 0) fb.push(i);
    const commonFactors = fa.filter((f) => fb.includes(f));
    const hcf = commonFactors[commonFactors.length - 1];
    const ma: number[] = [];
    const mb: number[] = [];
    for (let i = 1; ma.length < 13; i++) ma.push(numA * i);
    for (let i = 1; mb.length < 13; i++) mb.push(numB * i);
    const shared = ma.filter((m) => mb.includes(m));
    const lcm = shared[0];
    return { fa, fb, commonFactors, hcf, ma, mb, shared, lcm };
  }, [numA, numB]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Finding Common Ground: HCF and LCM</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="flex gap-2 mt-4">
        {([
          { id: 'factors' as const, label: 'Common factors (HCF)' },
          { id: 'multiples' as const, label: 'Common multiples (LCM)' },
        ]).map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${view === v.id ? 'bg-gold-600 border-gold-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === 'factors' ? (
        <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 space-y-3">
          {[
            { label: `Factors of ${numA}`, list: facts.fa, highlight: (x: number) => facts.commonFactors.includes(x) },
            { label: `Factors of ${numB}`, list: facts.fb, highlight: (x: number) => facts.commonFactors.includes(x) },
          ].map((row) => (
            <div key={row.label}>
              <div className="text-xs text-slate-400 mb-1">{row.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {row.list.map((f) => (
                  <span
                    key={f}
                    className={`px-3 py-1.5 rounded-lg font-mono text-sm font-bold border transition-colors ${
                      row.highlight(f) ? 'bg-emerald-700 border-emerald-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-400'
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700 text-sm">
            Shared (common) factors: <span className="font-mono font-bold text-emerald-300">{facts.commonFactors.join(', ')}</span>
            <br />
            HCF({numA}, {numB}) = <span className="font-mono font-black text-emerald-300 text-lg">{facts.hcf}</span>
            <span className="text-slate-400 text-xs"> -- the biggest block that measures BOTH numbers exactly.</span>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 overflow-x-auto">
          <svg viewBox="0 0 620 200" className="w-full" style={{ minWidth: 480 }}>
            <line x1={40} y1={165} x2={600} y2={165} stroke="#475569" strokeWidth={2} />
            {/* multiples of A as dots above the line */}
            {facts.ma.slice(0, 12).map((m) => {
              const maxM = Math.max(facts.ma[11], facts.mb[11]);
              const x = 40 + (m / maxM) * 550;
              const isShared = facts.shared.includes(m);
              return (
                <g key={`a${m}`}>
                  <circle cx={x} cy={120} r={isShared ? 9 : 5} fill={isShared ? '#34d399' : '#38bdf8'} style={{ transition: 'all 0.25s' }} />
                  {m % (numA * 2) === 0 || isShared ? (
                    <text x={x} y={105} textAnchor="middle" fill="#7dd3fc" fontSize={10}>{m}</text>
                  ) : null}
                </g>
              );
            })}
            {/* multiples of B as dots below the line */}
            {facts.mb.slice(0, 12).map((m) => {
              const maxM = Math.max(facts.ma[11], facts.mb[11]);
              const x = 40 + (m / maxM) * 550;
              const isShared = facts.shared.includes(m);
              return (
                <circle key={`b${m}`} cx={x} cy={185} r={isShared ? 9 : 5} fill={isShared ? '#34d399' : '#f59e0b'} style={{ transition: 'all 0.25s' }} />
              );
            })}
            {/* shared multiples marked with a flag on the line */}
            {facts.shared.slice(0, 4).map((m) => {
              const maxM = Math.max(facts.ma[11], facts.mb[11]);
              const x = 40 + (m / maxM) * 550;
              return (
                <g key={`s${m}`}>
                  <line x1={x} y1={130} x2={x} y2={175} stroke="#34d399" strokeWidth={2} strokeDasharray="3 3" />
                  <text x={x} y={62} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight="bold">{m}</text>
                </g>
              );
            })}
            <text x={40} y={30} fill="#a5b4fc" fontSize={13}>
              Green dots where the two rows MEET are common multiples; the first one is the LCM ={' '}
              <tspan fontWeight="bold">{facts.lcm}</tspan>
            </text>
          </svg>
          <div className="p-3 mt-2 bg-emerald-950/60 rounded-xl border border-emerald-700 text-sm">
            LCM({numA}, {numB}) = <span className="font-mono font-black text-emerald-300 text-lg">{facts.lcm}</span>
            <span className="text-slate-400 text-xs"> -- the first meeting point of the hops {numA} and {numB}.</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>First number</span>
            <span className="font-mono font-bold text-gold-300">{numA}</span>
          </label>
          <input type="range" aria-label="first number" min={2} max={40} value={numA} onChange={(e) => setNumA(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Second number</span>
            <span className="font-mono font-bold text-amber-300">{numB}</span>
          </label>
          <input type="range" aria-label="second number" min={2} max={40} value={numB} onChange={(e) => setNumB(Number(e.target.value))} className="w-full mt-2 accent-amber-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => { setNumA(12); setNumB(18); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Load 12 and 18
        </button>
        <button
          onClick={() => { setNumA(2 + Math.floor(Math.random() * 38)); setNumB(2 + Math.floor(Math.random() * 38)); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Random pair
        </button>
        <div className="px-4 py-2 rounded-xl text-sm font-mono border bg-slate-950 border-slate-700">
          HCF x LCM = {facts.hcf} x {facts.lcm} = {facts.hcf * facts.lcm}; numbers multiply to {numA * numB}
        </div>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Set both sliders to the same number. What are the HCF and LCM now? (Every number is its own cousin!)</li>
          <li>Find a pair where HCF x LCM equals the product of the numbers. Does it work for EVERY pair? Test three pairs.</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsFindingCommonGroundSim;
