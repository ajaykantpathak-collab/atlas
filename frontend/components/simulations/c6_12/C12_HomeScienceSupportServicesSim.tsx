'use client';

import React, { useMemo, useState } from 'react';

// ─── INSTITUTION BUDGET: allocate a fixed budget across support services ───
const SERVICES = [
  { id: 'meals', label: 'Meals & nutrition', color: '#34d399' },
  { id: 'health', label: 'Health care', color: '#f43f5e' },
  { id: 'laundry', label: 'Laundry & sanitation', color: '#38bdf8' },
  { id: 'activity', label: 'Activities & counselling', color: '#fbbf24' },
];

const PRESETS = [
  { id: 'oldage', label: 'Old age home (120, Rs 3L)', budget: 300000, residents: 120, alloc: { meals: 35, health: 35, laundry: 18, activity: 7 } },
  { id: 'orphan', label: 'Orphanage (60, Rs 2L)', budget: 200000, residents: 60, alloc: { meals: 45, health: 20, laundry: 15, activity: 20 } },
  { id: 'creche', label: 'Child care centre (40, Rs 1.2L)', budget: 120000, residents: 40, alloc: { meals: 40, health: 25, laundry: 12, activity: 23 } },
];

export function C12_HomeScienceSupportServicesSim() {
  const [budget, setBudget] = useState(200000);
  const [residents, setResidents] = useState(80);
  const [alloc, setAlloc] = useState<Record<string, number>>({ meals: 40, health: 25, laundry: 20, activity: 10 });
  const [perHeadMode, setPerHeadMode] = useState(false);

  const totalPct = SERVICES.reduce((s, v) => s + alloc[v.id], 0);
  const unallocated = 100 - totalPct;

  const perHead = useMemo(() => {
    const out: Record<string, number> = {};
    SERVICES.forEach((s) => {
      out[s.id] = (budget * alloc[s.id]) / 100 / residents;
    });
    return out;
  }, [budget, alloc, residents]);

  const setPct = (id: string, v: number) => setAlloc((prev) => ({ ...prev, [id]: v }));

  const reset = () => {
    setBudget(200000);
    setResidents(80);
    setAlloc({ meals: 40, health: 25, laundry: 20, activity: 10 });
    setPerHeadMode(false);
  };

  const biggest = SERVICES.reduce((a, b) => (alloc[a.id] >= alloc[b.id] ? a : b));

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-violet-400">CBSE Class 12 Home Science - Management of Support Services, Institutions and Programmes</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Institution Budget Allocator</h1>
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${unallocated >= 0 ? 'bg-emerald-950 border-emerald-700 text-emerald-300' : 'bg-rose-950 border-rose-700 text-rose-300'}`}>
          {unallocated >= 0 ? `${unallocated}% unallocated` : `${-unallocated}% over budget`}
        </span>
      </header>

      {/* INSTITUTION PRESETS */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs text-slate-400 self-center mr-1">Load a real programme:</span>
        {PRESETS.map((p) => (
          <button key={p.id} onClick={() => { setBudget(p.budget); setResidents(p.residents); setAlloc(p.alloc); }}
            className="min-h-11 px-3 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">
            {p.label}
          </button>
        ))}
      </div>

      {/* TOP-LEVEL CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Monthly budget</span>
            <span className="text-indigo-300 font-mono font-bold">Rs {budget.toLocaleString('en-IN')}</span>
          </label>
          <input type="range" min={50000} max={500000} step={10000} value={budget} aria-label="monthly budget in rupees"
            onChange={(e) => setBudget(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-indigo-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Beneficiaries (residents)</span>
            <span className="text-emerald-300 font-mono font-bold">{residents} people</span>
          </label>
          <input type="range" min={20} max={200} step={5} value={residents} aria-label="number of residents"
            onChange={(e) => setResidents(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-emerald-500" />
        </div>
        <button onClick={() => setPerHeadMode(!perHeadMode)} className={`min-h-11 px-4 rounded-2xl text-xs font-bold border ${perHeadMode ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
          Show: {perHeadMode ? 'per-resipient amounts' : 'budget shares'}
        </button>
      </div>

      {/* SERVICE SLIDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {SERVICES.map((s) => (
          <div key={s.id} className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <label className="text-xs text-slate-400 flex justify-between">
              <span style={{ color: s.color }}>{s.label}</span>
              <span className="font-mono font-bold" style={{ color: s.color }}>
                {perHeadMode ? `Rs ${(budget * alloc[s.id]) / 100 / residents}/person` : `${alloc[s.id]}% = Rs ${Math.round((budget * alloc[s.id]) / 100).toLocaleString('en-IN')}`}
              </span>
            </label>
            <input type="range" min={0} max={60} step={1} value={alloc[s.id]} aria-label={`budget share for ${s.label}`}
              onChange={(e) => setPct(s.id, Number(e.target.value))} className="w-full mt-2 min-h-11" />
          </div>
        ))}
      </div>

      {/* ALLOCATION BAR */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-4">
        <div className="flex h-10 rounded-xl overflow-hidden border border-slate-700 text-[10px] font-bold">
          {SERVICES.map((s) => (
            <div key={s.id} className="flex items-center justify-center overflow-hidden transition-all duration-200"
              style={{ width: `${alloc[s.id]}%`, backgroundColor: s.color, color: '#0f172a' }}>
              {alloc[s.id] >= 8 ? `${alloc[s.id]}%` : ''}
            </div>
          ))}
          {unallocated > 0 && (
            <div className="flex items-center justify-center bg-slate-800 text-slate-400 transition-all duration-200" style={{ width: `${unallocated}%` }}>
              {unallocated >= 6 ? `free ${unallocated}%` : ''}
            </div>
          )}
          {unallocated < 0 && (
            <div className="flex items-center justify-center bg-rose-600 text-white transition-all duration-200" style={{ width: `${Math.min(100, -unallocated)}%` }}>
              OVER
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Biggest slice: <span className="font-bold" style={{ color: biggest.color }}>{biggest.label}</span> at {alloc[biggest.id]}%.
          Cost per resident right now: <span className="font-mono font-bold text-indigo-300">Rs {Math.round((budget * totalPct) / 100 / residents).toLocaleString('en-IN')}</span> per month.
        </p>
      </div>

      {/* MANAGEMENT READOUT */}
      <div className={`p-4 rounded-2xl border mb-3 text-xs font-bold ${unallocated >= 0 ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : 'bg-rose-950/60 border-rose-700 text-rose-300'}`}>
        {unallocated >= 0
          ? `Plan is feasible: ${unallocated}% of funds (Rs ${Math.round((budget * unallocated) / 100).toLocaleString('en-IN')}) kept aside for rent, salaries and emergencies -- the fixed costs a manager must never spend on services.`
          : `Over-committed by ${-unallocated}%: this institution cannot operate -- services must be cut or the budget raised.`}
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-violet-300">Management principle:</span> a support-services manager plans money, people and materials
          so every beneficiary gets a fair share WITHIN the budget. Watch the per-person amounts as you admit more residents --
          <span className="font-bold text-amber-300"> the misconception that a bigger institution is automatically cheaper per head only holds if the budget grows with it.</span>
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/60 to-slate-900 border border-violet-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Keep budget at Rs 200000 and raise residents from 80 to 160. What happens to the per-person meal spending, and how would a real manager respond?</p>
        <p className="mt-1">2. Try to give every service at least 20% -- what does the feasibility banner say, and which service would you cut first to fix it?</p>
      </footer>
    </div>
  );
}

export default C12_HomeScienceSupportServicesSim;
