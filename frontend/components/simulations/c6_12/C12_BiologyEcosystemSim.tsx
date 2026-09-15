'use client';

import React, { useState } from 'react';

/**
 * Class 12 Biology -- Ecosystem
 * Lindeman energy flow: set GPP, plant respiration and the trophic transfer
 * efficiency, then watch the pyramid of energy shrink by the 10 percent law.
 * Self-contained: react + tailwind only.
 */

export function C12_BiologyEcosystemSim() {
  const [gpp, setGpp] = useState(20000); // kJ/m^2/yr
  const [resp, setResp] = useState(6000); // plant respiration
  const [eff, setEff] = useState(10); // percent transfer

  const npp = Math.max(0, gpp - resp);
  const levels = [
    { name: 'Producers (TL1)', note: 'NPP = GPP - R', e: npp },
    { name: 'Herbivores (TL2)', note: 'x eff', e: (npp * eff) / 100 },
    { name: 'Small carnivores (TL3)', note: 'x eff', e: (npp * Math.pow(eff / 100, 2)) },
    { name: 'Top carnivores (TL4)', note: 'x eff', e: (npp * Math.pow(eff / 100, 3)) },
  ];
  const maxE = Math.max(...levels.map((l) => l.e), 1);
  const transferLoss = 100 - eff;
  // Longest food chain the ecosystem can power (needs at least 50 kJ/m^2/yr at the top)
  const chainLimit = (() => {
    let e = npp;
    let lvl = 1;
    while (e * (eff / 100) >= 50 && lvl < 8) {
      e = e * (eff / 100);
      lvl++;
    }
    return lvl;
  })();

  const barW = (e: number) => 20 + (e / maxE) * 330;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-lime-950/80 rounded-2xl border border-lime-700 font-mono">10%</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-lime-400">Class 12 -- Ecosystem</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Energy Flow: Where Does the Sun&apos;s Cash Go?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 300" className="w-full">
            {[...levels].reverse().map((lvl, ri) => {
              const i = levels.length - 1 - ri;
              const w = barW(lvl.e);
              const y = 20 + ri * 62;
              const hue = 100 + i * 22;
              return (
                <g key={lvl.name}>
                  <rect x={60} y={y} width={w} height={44} rx={6}
                    fill={`hsl(${hue}, 70%, 45%)`} opacity={0.85} />
                  <text x={70} y={y + 19} fill="#fff" fontSize={11} fontWeight="bold" fontFamily="monospace">{lvl.name}</text>
                  <text x={70} y={y + 34} fill="#e2e8f0" fontSize={10} fontFamily="monospace">
                    {lvl.e >= 1 ? lvl.e.toLocaleString(undefined, { maximumFractionDigits: 0 }) : lvl.e.toFixed(2)} kJ/m^2/yr
                  </text>
                  <text x={70 + w + 8} y={y + 26} fill="#94a3b8" fontSize={9} fontFamily="monospace">{lvl.note}</text>
                  {ri < 3 && (
                    <g>
                      <line x1={85} y1={y + 44} x2={85} y2={y + 54} stroke="#64748b" strokeWidth={1.5} />
                      <text x={95} y={y + 54} fill="#64748b" fontSize={8} fontFamily="monospace">-{transferLoss}% lost to respiration + unconsumed + decomposers</text>
                    </g>
                  )}
                </g>
              );
            })}
            <text x={60} y={290} fill="#64748b" fontSize={10} fontFamily="monospace">
              pyramid of ENERGY can never invert -- heat leaves the system every step
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2">
            <div><span className="text-slate-500">GPP (gross)</span><div className="text-lime-300 font-bold text-sm">{gpp.toLocaleString()} kJ/m^2/yr</div></div>
            <div><span className="text-slate-500">R (plant respiration)</span><div className="text-amber-300 font-bold text-sm">{resp.toLocaleString()}</div></div>
            <div><span className="text-slate-500">NPP (net = stored)</span><div className="text-emerald-300 font-bold text-sm">{npp.toLocaleString()} ({((npp / gpp) * 100).toFixed(0)}% of GPP)</div></div>
            <div className="col-span-3"><span className="text-slate-500">Top carnivore receives</span>
              <div className="text-rose-300 font-bold text-sm">
                {levels[3].e.toLocaleString(undefined, { maximumFractionDigits: 1 })} kJ/m^2/yr = {(levels[3].e / npp * 100).toFixed(2)}% of what producers stored
              </div></div>
            <div className="col-span-3"><span className="text-slate-500">Longest sustainable food chain (top level keeps 50+ kJ/m^2/yr)</span>
              <div className="text-amber-300 font-bold text-sm">{chainLimit} trophic levels -- real chains stop at 4-5 for exactly this reason</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Gross primary productivity</span><span className="font-mono font-bold text-lime-400">{gpp.toLocaleString()}</span>
              </div>
              <input type="range" min={5000} max={80000} step={1000} value={gpp} aria-label="GPP"
                onChange={(e) => setGpp(Number(e.target.value))} className="w-full accent-lime-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Producer respiration R</span><span className="font-mono font-bold text-amber-400">{resp.toLocaleString()}</span>
              </div>
              <input type="range" min={500} max={Math.max(1000, gpp - 500)} step={500} value={Math.min(resp, gpp - 500)} aria-label="Respiration"
                onChange={(e) => setResp(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Trophic transfer efficiency</span><span className="font-mono font-bold text-emerald-400">{eff}%</span>
              </div>
              <input type="range" min={3} max={25} step={1} value={eff} aria-label="Transfer efficiency"
                onChange={(e) => setEff(Number(e.target.value))} className="w-full accent-emerald-500" />
              <div className="flex gap-1 mt-2">
                {[
                  { label: 'Poor 5%', v: 5 },
                  { label: 'Rule 10%', v: 10 },
                  { label: 'Rich 20%', v: 20 },
                ].map((p) => (
                  <button key={p.label} onClick={() => setEff(p.v)}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-bold ${eff === p.v ? 'bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setGpp(20000); setResp(6000); setEff(10); }}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">Textbook default</button>
              <button onClick={() => { setGpp(60000); setResp(12000); setEff(20); }}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">Lush tropical</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Only about 10% of the energy stored at one trophic level is built into the next; the
              rest leaves as heat via respiration, stays as unconsumed biomass, or is exported to the
              decomposer route. That tax compounds: after four transfers barely 0.1% of NPP remains,
              which is why food chains almost never run past 4-5 levels and why big predators are
              naturally rare. Matter cycles; energy does NOT.
            </p>
          </div>

          <div className="bg-lime-950/40 rounded-2xl border border-lime-800/50 p-4 text-xs">
            <p className="font-bold text-lime-300 mb-1">What to try</p>
            <p>1. Raise plant respiration until NPP hits zero: at what R/GPP ratio does the ecosystem stop storing energy entirely?</p>
            <p>2. At 10% efficiency read the TL4 share of NPP, then repeat at 20% -- why do productive oceans with efficient transfer support whale-sized top carnivores?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_BiologyEcosystemSim;
