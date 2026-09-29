'use client';
/**
 * C6_SocialScienceRuralLivelihoodsSim (Class 6 Social Science)
 *
 * ELI5: In a village like Kalpattu most families do NOT live on farming alone.
 * Slide the land owned, bad or good monsoon, migration -- and watch the year's
 * income stack up from farming, wages and city work. Below the floor? Debt.
 */
import React, { useMemo, useState } from 'react';

const WAGE = 180; // Rs per day of casual work
const FLOOR = 60000; // rough yearly needs for a family of five

export function C6_SocialScienceRuralLivelihoodsSim() {
  const [land, setLand] = useState(1); // hectares, 0 = landless
  const [rain, setRain] = useState(100); // % of normal monsoon
  const [migrate, setMigrate] = useState(false);
  const [debt, setDebt] = useState(0);
  const [year, setYear] = useState(1);

  const seasons = useMemo(() => {
    const rainF = rain / 100;
    const own = land > 0;
    const result = [];
    const defs = [
      { name: 'Kharif (Jun-Oct)', per: 30000, days: 42 },
      { name: 'Rabi (Nov-Feb)', per: 20000, days: 36 },
      { name: 'Summer (Mar-May)', per: 6000, days: 22 },
    ];
    for (const d of defs) {
      const farm = own ? d.per * land * Math.min(1.3, 0.35 + 0.65 * rainF) : 0;
      const ownWorkDays = own ? Math.min(d.days, land * 16) : 0;
      const hireDays = own ? 0 : Math.max(0, Math.round(d.days * Math.min(1, 0.45 + 0.55 * rainF)));
      const wages = hireDays * WAGE;
      const city = migrate ? 9000 : 0;
      result.push({ name: d.name, farm, wages, city, hireDays, ownWorkDays });
    }
    return result;
  }, [land, rain, migrate]);

  const total = seasons.reduce((s, x) => s + x.farm + x.wages + x.city, 0);
  const totalDays = seasons.reduce((s, x) => s + x.hireDays + x.ownWorkDays, 0);
  const shortfall = Math.max(0, FLOOR - total);
  const maxBar = 50000;

  const nextYear = () => { setDebt((d) => d + shortfall * 1.5); setYear((y) => y + 1); };
  const reset = () => { setLand(1); setRain(100); setMigrate(false); setDebt(0); setYear(1); };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 6 Civics - Rural Livelihoods</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">One Village Family, One Full Year of Income</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Land the family owns (hectares)</span>
                <span className="font-mono text-gold-300">{land === 0 ? '0 ha - landless' : `${land} ha`}</span>
              </label>
              <input type="range" min={0} max={4} step={0.5} value={land} aria-label="land owned"
                onChange={(e) => setLand(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>This year's monsoon</span>
                <span className={`font-mono ${rain < 80 ? 'text-rose-400' : rain > 115 ? 'text-emerald-400' : 'text-gold-300'}`}>{rain}% of normal</span>
              </label>
              <input type="range" min={40} max={140} step={5} value={rain} aria-label="monsoon"
                onChange={(e) => setRain(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            </div>
            <button onClick={() => setMigrate((m) => !m)}
              className={`w-full min-h-11 rounded-xl text-sm font-bold border transition-all ${migrate ? 'bg-gold-600 border-gold-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-gold-500'}`}>
              {migrate ? 'Adult is away: 4 months of city construction work (ON)' : 'Send one adult to the city for 4 months? (OFF)'}
            </button>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 grid grid-cols-3 gap-2 text-center">
            <div><p className="text-[11px] text-slate-400">Days of work got</p><p className="font-mono text-lg text-gold-300">{totalDays}</p></div>
            <div><p className="text-[11px] text-slate-400">Year total</p><p className="font-mono text-lg text-amber-300">Rs {total.toLocaleString('en-IN')}</p></div>
            <div><p className="text-[11px] text-slate-400">Family debt</p><p className={`font-mono text-lg ${debt > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>Rs {debt.toLocaleString('en-IN')}</p></div>
          </div>

          <button onClick={nextYear} className="w-full min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold transition-all">
            End year {year} -- borrow if short, go to year {year + 1}
          </button>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> not every village family is a farmer. In Kalpattu-style villages most own little or no land and earn from wage work, livestock, fishing, collecting and small shops.
          </div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
          <p className="text-sm font-bold text-white mb-2">Income by season (Rs)</p>
          <div className="space-y-3">
            {seasons.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{s.name}</span>
                  <span className="font-mono text-slate-400">Rs {Math.round(s.farm + s.wages + s.city).toLocaleString('en-IN')}</span>
                </div>
                <div className="h-6 rounded-lg bg-slate-950 border border-slate-800 flex overflow-hidden text-[10px] font-bold text-slate-900">
                  <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${(s.farm / maxBar) * 100}%` }} />
                  <div className="bg-gold-400 transition-all duration-500" style={{ width: `${(s.wages / maxBar) * 100}%` }} />
                  <div className="bg-gold-400 transition-all duration-500" style={{ width: `${(s.city / maxBar) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500" /> own farm</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gold-400" /> wage work</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gold-400" /> city work</span>
            <span className="ml-auto text-slate-500">bar max Rs 50,000</span>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed">
            <p className="flex justify-between"><span className="text-slate-400">Yearly needs floor (food, fuel, school, health)</span><span className="font-mono text-slate-200">Rs {FLOOR.toLocaleString('en-IN')}</span></p>
            <p className="flex justify-between mt-1">
              <span className="text-slate-400">Gap to floor</span>
              <span className={`font-mono ${shortfall > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{shortfall > 0 ? `Rs -${shortfall.toLocaleString('en-IN')} (borrow at high interest)` : 'Rs 0 (just managing)'}</span>
            </p>
            <p className="flex justify-between mt-1">
              <span className="text-slate-400">Share of income NOT from farming</span>
              <span className="font-mono text-gold-300">{total > 0 ? Math.round(((total - seasons.reduce((s, x) => s + x.farm, 0)) / total) * 100) : 100}%</span>
            </p>
            <p className="text-slate-500 mt-2">In the NCERT village of Kalpattu, families also earn from fishing, collecting mahua and tamarind, repairing cycles, running tea shops -- non-farm work is the norm, not the exception.</p>
            <p className="text-slate-500 mt-1">And debts from one bad season (seed bought on credit at high interest) can trap a family for years -- try the drought slider and watch the debt column grow year after year.</p>
            <p className="text-slate-500 mt-1">Who else lives in a village like this? Fishing families, herders, a shopkeeper, a tailor, midwives -- each with their own mix, which is why &quot;the village farmer&quot; is too simple a label.</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-slate-500 font-bold uppercase tracking-wider">Key words:</span>
        {['landless', 'wage work', 'kalpattu-style village', 'debt cycle', 'migration', 'livelihood mix'].map((k) => (
          <span key={k} className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">{k}</span>
        ))}
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Make a landless family (0 ha) survive a 55% monsoon with zero new debt -- what share of their income is NOT farming at all?</p>
        <p className="mt-1">2. Find the smallest land holding that still ends a 60% monsoon year above the Rs 60,000 floor -- then explain what the family had to add besides farming.</p>
      </footer>
    </div>
  );
}

export default C6_SocialScienceRuralLivelihoodsSim;
