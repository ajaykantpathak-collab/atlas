'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 History -- Peasants, Zamindars and the State (16th-17th c.)
 * ONE concept: Mughal revenue was a negotiated split of the harvest
 * among peasant, zamindar and state -- measured, assessed (zabti) or
 * contracted (ija). Set the terms and watch each party's pile change.
 * react + tailwind only.
 */

type Mode = 'zabti' | 'batai' | 'ija';

export function C12_HistoryPeasantsZamindarsStateSim() {
  const [mode, setMode] = useState<Mode>('zabti');
  const [harvest, setHarvest] = useState(100); // maunds from the plot
  const [price, setPrice] = useState(20); // rupees per maund (zabti cash demand)
  const [stateShare, setStateShare] = useState(33); // % assessed by the state
  const [zamindarCut, setZamindarCut] = useState(12); // % collected on top
  const [peasantResistance, setPeasantResistance] = useState(20); // flight / revolt risk

  const piles = useMemo(() => {
    const resistanceDrag = peasantResistance / 100; // collections fall when peasants flee
    const collectFactor = 1 - resistanceDrag * 0.6;
    if (mode === 'zabti') {
      // state demand = share x harvest x price (cash), measured crops
      const state = harvest * price * (stateShare / 100) * collectFactor;
      const zam = harvest * price * (zamindarCut / 100) * collectFactor;
      const peasant = harvest * price - state - zam;
      return { state, zam, peasant, unit: 'rupees' };
    }
    // crop-sharing: pile of grain split
    const state = harvest * (stateShare / 100) * collectFactor;
    const zam = harvest * (zamindarCut / 100) * collectFactor;
    const peasant = harvest * collectFactor - state - zam;
    return { state, zam, peasant, unit: 'maunds' };
  }, [mode, harvest, price, stateShare, zamindarCut, peasantResistance]);

  const total = piles.state + piles.zam + piles.peasant || 1;
  const maxPile = Math.max(piles.state, piles.zam, piles.peasant);
  const flightRisk = peasantResistance > 55 && (stateShare + zamindarCut > 55);

  const pile = (x: number, label: string, val: number, color: string) => (
    <g key={label}>
      <rect x={x} y={250 - (val / Math.max(maxPile, 1)) * 150} width={70}
        height={(val / Math.max(maxPile, 1)) * 150} fill={color} className="transition-all duration-500" />
      <text x={x + 35} y={264} textAnchor="middle" fontSize={10} fill="#94a3b8">{label}</text>
      <text x={x + 35} y={240 - (val / Math.max(maxPile, 1)) * 150} textAnchor="middle" fontSize={11}
        fill={color} fontFamily="monospace">{val.toFixed(0)} {piles.unit}</text>
    </g>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">⚔️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Class 12 -- Peasants, Zamindars and the State</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Who Takes the Harvest? Mughal Revenue, Live</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            <text x={230} y={28} textAnchor="middle" fontSize={11} fill="#94a3b8">
              one plot&apos;s harvest split: {mode === 'zabti' ? 'ZABTI (cash on measured crop)' : mode === 'batai' ? 'BATAI (crop share on the threshing floor)' : 'IJA (contract to zamindar)'}
            </text>
            {/* piles */}
            {pile(60, 'STATE', piles.state, '#38bdf8')}
            {pile(195, 'ZAMINDAR', piles.zam, '#f59e0b')}
            {pile(330, 'PEASANT', piles.peasant, '#34d399')}
            {/* flight warning */}
            {flightRisk && (
              <g>
                <rect x={120} y={180} width={220} height={40} rx={10} fill="rgba(190,18,60,0.25)" stroke="#f43f5e" />
                <text x={230} y={197} textAnchor="middle" fontSize={10} fill="#fb7185">debt + demand too high:</text>
                <text x={230} y={212} textAnchor="middle" fontSize={10} fill="#fb7185">peasants flee to another zamindar&apos;s land!</text>
              </g>
            )}
            <text x={230} y={274} textAnchor="middle" fontSize={10} fill="#e2e8f0" fontFamily="monospace">
              state {(piles.state / total * 100).toFixed(0)}% | zamindar {(piles.zam / total * 100).toFixed(0)}% | peasant {(piles.peasant / total * 100).toFixed(0)}%
            </text>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Harvest</p>
              <p className="font-mono font-bold text-lime-300">{harvest} maunds</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Total demand</p>
              <p className="font-mono font-bold text-sky-300">{stateShare + zamindarCut}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Collection eff.</p>
              <p className="font-mono font-bold text-amber-300">{((1 - peasantResistance / 100 * 0.6) * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Flight risk</p>
              <p className={`font-mono font-bold ${flightRisk ? 'text-rose-400' : 'text-emerald-300'}`}>{flightRisk ? 'HIGH' : 'low'}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {(['zabti', 'batai', 'ija'] as Mode[]).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${mode === m ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {m === 'zabti' ? 'Zabti (cash)' : m === 'batai' ? 'Batai (share)' : 'Ija (contract)'}
                </button>
              ))}
            </div>
            {[
              { l: 'Harvest size (maunds)', v: harvest, set: setHarvest, c: 'accent-lime-500' },
              { l: 'Grain price (Rs/maund)', v: price, set: setPrice, c: 'accent-amber-500' },
              { l: 'State assessed share (%)', v: stateShare, set: setStateShare, c: 'accent-sky-500' },
              { l: 'Zamindar collection cut (%)', v: zamindarCut, set: setZamindarCut, c: 'accent-yellow-500' },
              { l: 'Peasant resistance level', v: peasantResistance, set: setPeasantResistance, c: 'accent-rose-500' }
            ].map((s) => (
              <div key={s.l}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{s.l}</span><span className="font-mono font-bold text-slate-200">{s.v}</span>
                </div>
                <input type="range" min={0} max={100} step={1} value={s.v} aria-label={s.l}
                  onChange={(e) => s.set(Number(e.target.value))} className={`w-full min-h-11 ${s.c}`} />
              </div>
            ))}
            <button onClick={() => { setMode('zabti'); setHarvest(100); setPrice(20); setStateShare(33); setZamindarCut(12); setPeasantResistance(20); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;The Mughal state just looted helpless peasants.&quot; Push demand too high and
              collections COLLAPSE -- peasants ran to rival zamindars, and the state needed zamindars
              to negotiate. Revenue was a bargain that all three parties could break, not a one-way
              squeeze.
            </p>
          </div>

          <div className="bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-4 text-xs">
            <p className="font-bold text-emerald-300 mb-1">What to try</p>
            <p>1. Double the price from 20 to 40 under zabti. Which pile grows most -- and what did Ain-i-Akbari officials fear about cash assessment?</p>
            <p>2. Set state share 50 + zamindar 20. Find the resistance level where the state actually collects LESS than at 33%.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_HistoryPeasantsZamindarsStateSim;
