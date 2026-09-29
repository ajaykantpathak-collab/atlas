'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 History -- Colonialism and the Countryside (Bengal)
 * ONE concept: the Permanent Settlement (1793) fixed the zamindar's tax
 * forever -- so any bad harvest ate his own margin, and the sunset law
 * could auction his estate at midnight. Run one estate for 20 years.
 * react + tailwind only.
 */

type YearRow = { year: number; harvest: number; rent: number; tax: number; sold: boolean };

export function C12_HistoryColonialismCountrysideSim() {
  const [harvestIdx, setHarvestIdx] = useState(75); // ryot output index
  const [rentRate, setRentRate] = useState(60); // % of harvest zamindar can extract
  const [fixedTax, setFixedTax] = useState(30); // fixed jama (Company demand)
  const [droughtYear, setDroughtYear] = useState(3); // which year drought strikes (1-20)
  const [log, setLog] = useState<YearRow[]>([]);

  const rows = useMemo(() => {
    const out: YearRow[] = [];
    let estate = 100; // zamindar's reserve fund
    let lost = false;
    for (let y = 1; y <= 20; y++) {
      const h = y === droughtYear ? harvestIdx * 0.4 : harvestIdx;
      const rent = h * (rentRate / 100);
      const tax = fixedTax;
      estate = estate + rent - tax;
      const sold = lost;
      if (estate < 0 && !lost) { lost = true; estate = 0; }
      out.push({ year: y, harvest: Math.round(h), rent: Math.round(rent), tax, sold });
      void sold;
    }
    return out;
  }, [harvestIdx, rentRate, fixedTax, droughtYear]);

  const surviveYear = (y: number) => rows[y - 1].rent >= rows[y - 1].tax || rows.slice(0, y).reduce((s, r) => s + r.rent - r.tax, 0) + 100 >= 0;
  const auctionYear = rows.findIndex((r) => !surviveYear(r.year));
  const finalEstate = rows.reduce((s, r) => s + r.rent - r.tax, 0) + 100;
  const sunsetRisk = fixedTax > rentRate * harvestIdx / 100 * 0.9;

  void log; void setLog;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-lime-950/80 rounded-2xl border border-lime-700">🌾</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-lime-400">Class 12 -- Colonialism and the Countryside</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Permanent Settlement: Run a Bengal Zamindari, 1793-1813</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* 20-year ledger strip */}
            <text x={20} y={24} fontSize={11} fill="#94a3b8">the estate ledger: each column = one year (green: rent beats tax; red: drought)</text>
            {rows.map((r, i) => {
              const x = 22 + i * 21;
              const hR = Math.min(80, r.rent * 0.9);
              const hT = Math.min(80, r.tax * 0.9);
              const h = Math.min(80, r.harvest * 0.8);
              const isDrought = r.year === droughtYear;
              return (
                <g key={r.year}>
                  <rect x={x} y={110 - h} width={8} height={h} fill={isDrought ? '#f59e0b' : '#65a30d'}
                    className="transition-all duration-300" />
                  <rect x={x + 9} y={110 - hR} width={4} height={hR} fill="#38bdf8" />
                  <rect x={x + 9} y={110 - hT - 2} width={4} height={2} fill="#f43f5e" />
                  <line x1={x - 2} y1={110 - hT} x2={x + 16} y2={110 - hT} stroke="#f43f5e" strokeWidth={1} strokeDasharray="2 2" />
                  <text x={x + 2} y={122} fontSize={7} fill="#64748b" textAnchor="middle">{String.fromCharCode(64 + ((i % 20) + 1))}</text>
                  {isDrought && <text x={x + 4} y={132} fontSize={8} fill="#fbbf24" textAnchor="middle">drought</text>}
                </g>
              );
            })}
            {/* estate reserve line */}
            <g transform="translate(20,150)">
              <text x={0} y={-6} fontSize={10} fill="#94a3b8">zamindar reserve fund over 20 years</text>
              <path d={(() => {
                let e = 100; let d = `M0,${(70 - Math.min(70, Math.max(0, e) / 20)).toFixed(1)} `;
                return rows.map((r, i) => {
                  e += r.rent - r.tax;
                  return `L${(i / 19) * 420},${(70 - Math.min(70, Math.max(0, e) / 20)).toFixed(1)} `;
                }).reduce((a, b) => a + b, d);
              })()} fill="none" stroke={finalEstate > 0 ? '#34d399' : '#f43f5e'} strokeWidth={2.5} className="transition-all duration-300" />
              <line x1={0} y1={70} x2={420} y2={70} stroke="#f43f5e" strokeDasharray="4 3" />
              <text x={424} y={74} fontSize={9} fill="#f43f5e">0 (auction!)</text>
            </g>
            {/* sunset law panel */}
            <rect x={20} y={238} width={420} height={30} rx={8}
              fill={sunsetRisk ? 'rgba(190,18,60,0.2)' : 'rgba(6,95,70,0.2)'}
              stroke={sunsetRisk ? '#f43f5e' : '#10b981'} className="transition-colors duration-300" />
            <text x={230} y={257} textAnchor="middle" fontSize={10.5}
              fill={sunsetRisk ? '#fb7185' : '#34d399'}>
              {sunsetRisk ? 'SUNSET LAW RISK: pay by sunset or the estate is auctioned' : 'taxes collectable -- estate safe for now'}
            </text>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Fixed jama (tax)</p>
              <p className="font-mono font-bold text-rose-300">{fixedTax}/yr</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Normal rent</p>
              <p className="font-mono font-bold text-gold-300">{(harvestIdx * rentRate / 100).toFixed(0)}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Auction triggered</p>
              <p className="font-mono font-bold text-amber-300">{auctionYear === -1 ? 'never' : `year ${auctionYear}`}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Estate after 20 yrs</p>
              <p className={`font-mono font-bold ${finalEstate > 0 ? 'text-emerald-300' : 'text-rose-400'}`}>{finalEstate.toFixed(0)}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Ryot harvest index</span><span className="font-mono font-bold text-lime-400">{harvestIdx}</span>
              </div>
              <input type="range" min={20} max={120} step={5} value={harvestIdx} aria-label="harvest"
                onChange={(e) => setHarvestIdx(Number(e.target.value))} className="w-full min-h-11 accent-lime-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Rent extraction rate</span><span className="font-mono font-bold text-gold-400">{rentRate}%</span>
              </div>
              <input type="range" min={20} max={90} step={5} value={rentRate} aria-label="rent rate"
                onChange={(e) => setRentRate(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Fixed jama set by Company</span><span className="font-mono font-bold text-rose-400">{fixedTax}</span>
              </div>
              <input type="range" min={10} max={80} step={5} value={fixedTax} aria-label="fixed tax"
                onChange={(e) => setFixedTax(Number(e.target.value))} className="w-full min-h-11 accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Drought strikes year</span><span className="font-mono font-bold text-amber-400">{droughtYear}</span>
              </div>
              <input type="range" min={1} max={20} step={1} value={droughtYear} aria-label="drought year"
                onChange={(e) => setDroughtYear(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <button onClick={() => { setHarvestIdx(75); setRentRate(60); setFixedTax(30); setDroughtYear(3); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Zamindars were the villains -- and colonialism barely touched the village.&quot;
              The simulation shows the trap: the Company fixed ITS demand &quot;permanently&quot; but
              left rents free -- so zamindars squeezed ryots harder to survive their own auction risk.
              Oppression had a colonial engine underneath it.
            </p>
          </div>

          <div className="bg-lime-950/40 rounded-2xl border border-lime-800/50 p-4 text-xs">
            <p className="font-bold text-lime-300 mb-1">What to try</p>
            <p>1. Keep harvest at 75. Find the jama that keeps the estate solvent through ANY drought year -- is there one?</p>
            <p>2. Set the drought to year 19 vs year 2. Why does the same drought destroy the estate only when it comes late?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_HistoryColonialismCountrysideSim;
