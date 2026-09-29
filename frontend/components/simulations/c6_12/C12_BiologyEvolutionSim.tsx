'use client';

import React, { useState } from 'react';

/**
 * Class 12 Biology -- Evolution
 * Hardy-Weinberg equilibrium p^2 + 2pq + q^2 = 1, then break it: selection
 * against the recessive homozygote drives q down generation by generation.
 * Self-contained: react + tailwind only.
 */

export function C12_BiologyEvolutionSim() {
  const [p, setP] = useState(0.9);
  const [sSel, setSSel] = useState(0.5); // selection coefficient against aa
  const [runGen, setRunGen] = useState(0); // generations simulated so far

  const q = 1 - p;
  const p2 = p * p;
  const pq2 = 2 * p * q;
  const q2 = q * q;

  // q after n generations of selection against aa: q' = q(1 - s q) / (1 - s q^2)
  const qAfter = (n: number) => {
    let cur = q;
    for (let i = 0; i < n; i++) cur = (cur * (1 - sSel * cur)) / (1 - sSel * cur * cur);
    return cur;
  };
  const qNow = qAfter(runGen);
  const pNow = 1 - qNow;

  const genData: number[] = [];
  for (let i = 0; i <= 30; i++) genData.push(qAfter(i));

  const px = (g: number) => 50 + (g / 30) * 390;
  const py = (qv: number) => 235 - qv * 195;
  const trace = genData.slice(0, runGen + 1).map((qv, i) => `${px(i)},${py(qv)}`).join(' ');
  const fullTrace = genData.map((qv, i) => `${px(i)},${py(qv)}`).join(' ');

  const bars = [
    { name: 'AA (p^2)', v: p2, col: '#34d399', desc: 'homozygous dominant' },
    { name: 'Aa (2pq)', v: pq2, col: '#fbbf24', desc: 'carriers -- shelter the recessive allele' },
    { name: 'aa (q^2)', v: q2, col: '#f87171', desc: 'selected against when s > 0' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 font-mono">pq</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 12 -- Evolution</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Hardy-Weinberg, and How Selection Breaks It</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 260" className="w-full">
            <line x1={50} y1={235} x2={440} y2={235} stroke="#475569" strokeWidth={2} />
            <line x1={50} y1={20} x2={50} y2={235} stroke="#475569" strokeWidth={2} />
            <text x={245} y={254} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">generations</text>
            <text x={20} y={130} fill="#64748b" fontSize={10} fontFamily="monospace" transform="rotate(-90 20 130)">q (recessive allele)</text>
            {[0.25, 0.5, 0.75].map((v) => (
              <g key={v}>
                <line x1={50} y1={py(v)} x2={440} y2={py(v)} stroke="#1e293b" strokeDasharray="3 5" />
                <text x={45} y={py(v) + 4} textAnchor="end" fill="#475569" fontSize={9} fontFamily="monospace">{v}</text>
              </g>
            ))}
            {sSel > 0 && <polyline points={fullTrace} fill="none" stroke="#475569" strokeWidth={1.5} strokeDasharray="4 4" />}
            {trace.length > 1 && <polyline points={trace} fill="none" stroke="#a78bfa" strokeWidth={3} />}
            {trace.length > 1 && <circle cx={px(runGen)} cy={py(qNow)} r={5.5} fill="#fbbf24" stroke="#fff" strokeWidth={1.5} />}
            <text x={56} y={36} fill="#a78bfa" fontSize={10} fontFamily="monospace">
              q: {q.toFixed(2)} --&gt; {qNow.toFixed(3)} after {runGen} generation{runGen === 1 ? '' : 's'} (s = {sSel.toFixed(2)})
            </text>
            <text x={56} y={52} fill="#64748b" fontSize={10} fontFamily="monospace">
              aa frequency: {q2.toFixed(3)} --&gt; {(qNow * qNow).toFixed(4)} ({q2 > 0 ? (((qNow * qNow) / q2 - 1) * 100).toFixed(1) : '0'}%)
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-xs font-mono text-slate-400 mb-2">Genotype frequencies right now (after {runGen} gens)</p>
            <div className="space-y-2">
              {bars.map((b) => (
                <div key={b.name}>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{b.name} <span className="text-slate-500">({b.desc})</span></span>
                    <span className="text-slate-200">{(b.name === 'AA (p^2)' ? pNow * pNow : b.name === 'Aa (2pq)' ? 2 * pNow * qNow : qNow * qNow).toFixed(4)}</span>
                  </div>
                  <div className="h-3.5 bg-slate-800 rounded">
                    <div className="h-3.5 rounded transition-all duration-300"
                      style={{ width: `${(b.name === 'AA (p^2)' ? pNow * pNow : b.name === 'Aa (2pq)' ? 2 * pNow * qNow : qNow * qNow) * 100}%`, background: b.col }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Dominant allele frequency p (q = 1 - p)</span>
                <span className="font-mono font-bold text-gold-400">p = {p.toFixed(2)}, q = {q.toFixed(2)}</span>
              </div>
              <input type="range" min={0.1} max={0.99} step={0.01} value={p} aria-label="Allele frequency p"
                onChange={(e) => { setP(Number(e.target.value)); setRunGen(0); }} className="w-full accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Selection s against aa (fitness 1-s)</span><span className="font-mono font-bold text-rose-400">{sSel.toFixed(2)}</span>
              </div>
              <input type="range" min={0} max={1} step={0.05} value={sSel} aria-label="Selection coefficient"
                onChange={(e) => setSSel(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setRunGen((g) => Math.min(30, g + 5))}
                className="py-2 rounded-xl text-xs font-bold bg-gold-600 hover:bg-gold-500">Advance 5 gens</button>
              <button onClick={() => setRunGen(0)} className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">Reset to H-W</button>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {sSel === 0
                ? 's = 0: a large random-mating population with no selection NEVER changes -- Hardy-Weinberg equilibrium.'
                : `At generation ${runGen}: q = ${qNow.toFixed(4)} (started ${(q * 100) / 100}). Rare alleles hide in carriers.`}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-gold-300 font-bold">The balanced polymorphism fact</div>
            <div className="text-slate-400">2pq is maximal at p = q = 0.5 -- slide p and see.</div>
            <div className="text-slate-400">When q is rare, most copies sit in Aa carriers, so selection against aa is very slow at the end.</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Hardy-Weinberg is evolution&apos;s NULL hypothesis: allele frequencies p and q stay
              frozen forever if mating is random, the population is large, and there is no selection,
              mutation or migration. Drag s above zero and the recessive allele erodes -- but
              asymptotically, because the last copies shelter in heterozygotes. Genetic drift
              (chance in SMALL populations) breaks the equation in a totally different way.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Set p = 0.5, s = 0: advance 30 generations and prove nothing changes. Then nudge s to 0.05 and repeat -- compare the final q values.</p>
            <p>2. Find p that maximises the carrier bar 2pq, then explain why recessive disease alleles (like thalassemia) persist despite killing aa individuals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_BiologyEvolutionSim;
