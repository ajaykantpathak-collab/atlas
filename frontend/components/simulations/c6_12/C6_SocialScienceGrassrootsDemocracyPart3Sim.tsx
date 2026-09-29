'use client';
/**
 * C6_SocialScienceGrassrootsDemocracyPart3Sim (Class 6 Social Science)
 *
 * ELI5: A big city is cut into small pieces called WARDS. Each ward elects ONE
 * councillor who carries its problems to the municipal corporation. You are the
 * city engineer: fund services ward by ward -- but money works best where the
 * area sabha first LISTENED to residents.
 */
import React, { useMemo, useState } from 'react';

// ─── Knowledge-graph node wiring ───
const NODE_C6_HISTCIV_061 = 'c6_histciv_061'; // Composition of Municipal Corporation
const NODE_C6_HISTCIV_062 = 'c6_histciv_062'; // Core functions of Municipal Corporation
const NODE_C6_HISTCIV_063 = 'c6_histciv_063'; // How Municipal Corporation works
const NODE_C6_HISTCIV_065 = 'c6_histciv_065'; // Citizen participation in urban governance
export const ALL_NODE_IDS = [
  NODE_C6_HISTCIV_061,
  NODE_C6_HISTCIV_062,
  NODE_C6_HISTCIV_063,
  NODE_C6_HISTCIV_065,
];

interface Ward { id: number; name: string; people: number; need: string; cost: number; ask: string }
const BUDGET = 700000;
const SABHA_COST = 5000;
const WARDS: Ward[] = [
  { id: 0, name: 'Shastri Nagar', people: 24000, need: 'WATER PIPE', cost: 120000, ask: 'Water comes only 4 hours a day. Fix the old pipeline first.' },
  { id: 1, name: 'Station Road', people: 31000, need: 'STREET LIGHTS', cost: 80000, ask: 'The flyover road is dark at night -- women and children want lights.' },
  { id: 2, name: 'Riverside', people: 18000, need: 'DRAIN CLEANING', cost: 150000, ask: 'Blocked drains flood our homes every monsoon. Clean them before June.' },
  { id: 3, name: 'Gandhi Bazaar', people: 27000, need: 'GARBAGE TRUCK', cost: 60000, ask: 'Garbage piles up near the market. We need a daily pickup.' },
  { id: 4, name: 'Ambedkar Colony', people: 22000, need: 'PLAYGROUND', cost: 90000, ask: 'Children play on the road. Fence the empty plot into a playground.' },
  { id: 5, name: 'Lake View', people: 20000, need: 'ROAD REPAIR', cost: 110000, ask: 'The bus route road has potholes. Ambulances get stuck.' },
];

export function C6_SocialScienceGrassrootsDemocracyPart3Sim() {
  const [sel, setSel] = useState(0);
  const [plan, setPlan] = useState(60000);
  const [funded, setFunded] = useState<Record<number, number>>({});
  const [sabha, setSabha] = useState<Record<number, boolean>>({});
  const [msg, setMsg] = useState('');

  const moneyLeft = BUDGET - Object.values(funded).reduce((a, b) => a + b, 0) - Object.keys(sabha).length * SABHA_COST;
  const w = WARDS[sel];
  const amt = funded[w.id] || 0;
  const ratio = Math.min(1, amt / w.cost);

  const serviceOf = (wd: Ward) => Math.round(Math.min(1, (funded[wd.id] || 0) / wd.cost) * 100);
  const happyOf = (wd: Ward) => {
    const r = Math.min(1, (funded[wd.id] || 0) / wd.cost);
    if ((funded[wd.id] || 0) === 0) return sabha[wd.id] ? 10 : 0;
    return Math.round(62 * r) + (sabha[wd.id] ? 38 : 12);
  };
  const cityScore = useMemo(() => Math.round(WARDS.reduce((s, wd) => s + happyOf(wd), 0) / WARDS.length), [funded, sabha]);

  const pickWard = (id: number) => { setSel(id); setPlan(60000); setMsg(''); };
  const holdSabha = () => {
    if (sabha[w.id]) return;
    if (moneyLeft < SABHA_COST) { setMsg('Not enough money left to hold a sabha.'); return; }
    setSabha((s) => ({ ...s, [w.id]: true }));
    setMsg(`Area sabha held in ${w.name}. Residents spoke: "${w.ask}" The councillor notes it down for the corporation.`);
  };
  const commit = () => {
    if (funded[w.id] >= w.cost) { setMsg(`${w.need} in ${w.name} is already fully funded.`); return; }
    const give = Math.min(plan, moneyLeft, w.cost - amt);
    if (give <= 0) { setMsg('City budget is finished. Democracy means hard choices -- reset and try again.'); return; }
    setFunded((f) => ({ ...f, [w.id]: (f[w.id] || 0) + give }));
    setMsg(`Rs ${give.toLocaleString('en-IN')} committed to ${w.need} in ${w.name} via its councillor. Service level ${serviceOf(w)}% -> ${Math.round(Math.min(1, (amt + give) / w.cost) * 100)}%.`);
  };
  const reset = () => { setFunded({}); setSabha({}); setSel(0); setPlan(60000); setMsg(''); };

  const color = (s: number) => (s >= 100 ? '#059669' : s >= 40 ? '#d97706' : '#e11d48');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 6 Civics - Grassroots Democracy Part 3</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Ward Map: Who Fixes Your Street?</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 border border-amber-700 text-amber-300">Budget left: Rs {Math.max(0, moneyLeft).toLocaleString('en-IN')}</span>
          <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
        </div>
      </header>

      <p className="text-xs text-slate-400 mb-2">Tap a ward on the map. Fund its service, or hold an area sabha first to hear what residents actually want.</p>
      <div className="h-2 mb-3 rounded-full bg-slate-800 overflow-hidden" aria-label="budget used">
        <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${((BUDGET - Math.max(0, moneyLeft)) / BUDGET) * 100}%` }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-slate-900/70 rounded-2xl border border-slate-800">
          <svg viewBox="0 0 360 220" className="w-full h-56 md:h-64" preserveAspectRatio="xMidYMid meet">
            {WARDS.map((wd, i) => {
              const x = 10 + (i % 3) * 118;
              const y = 10 + Math.floor(i / 3) * 102;
              const s = serviceOf(wd);
              const on = sel === wd.id;
              return (
                <g key={wd.id} onClick={() => pickWard(wd.id)} style={{ cursor: 'pointer' }}>
                  <rect x={x} y={y} width={108} height={92} rx={12} style={{ fill: color(s), transition: 'fill 0.5s', opacity: on ? 1 : 0.55 }} stroke={on ? '#818cf8' : '#1e293b'} strokeWidth={on ? 3 : 1.5} />
                  <text x={x + 8} y={y + 18} fill="#0f172a" fontSize="10" fontWeight="bold">{wd.name}</text>
                  <text x={x + 8} y={y + 33} fill="#0f172a" fontSize="9">{wd.need}</text>
                  <text x={x + 8} y={y + 48} fill="#0f172a" fontSize="9">service {s}%</text>
                  <text x={x + 8} y={y + 78} fill="#0f172a" fontSize="8">{(wd.people / 1000).toFixed(0)}k people {sabha[wd.id] ? '- sabha done' : ''}</text>
                </g>
              );
            })}
          </svg>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2 rounded-xl bg-slate-950 border border-gold-800 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">City happiness</p>
              <p className="text-lg font-extrabold font-mono text-gold-300">{cityScore}%</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-emerald-800 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Wards fully served</p>
              <p className="text-lg font-extrabold font-mono text-emerald-300">{WARDS.filter((wd) => serviceOf(wd) >= 100).length} of 6</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-sm font-bold text-white">Selected: {w.name} <span className="text-xs font-normal text-slate-400">({w.people.toLocaleString('en-IN')} residents)</span></p>
            <p className="text-xs text-slate-400 mt-1">Corporation service list: {w.need} - full cost Rs {w.cost.toLocaleString('en-IN')}</p>
            {sabha[w.id] ? (
              <p className="text-xs mt-2 p-2 rounded-lg bg-emerald-950/50 border border-emerald-800 text-emerald-200">Residents said: &quot;{w.ask}&quot;</p>
            ) : (
              <p className="text-xs mt-2 text-slate-500">Area sabha not held yet -- you are guessing what this ward needs.</p>
            )}
            <label className="text-xs font-semibold text-slate-400 flex justify-between mt-3">
              <span>Money planned for this ward</span>
              <span className="font-mono text-gold-300">Rs {plan.toLocaleString('en-IN')}</span>
            </label>
            <input type="range" min={0} max={w.cost} step={5000} value={Math.min(plan, w.cost)} aria-label="money planned"
              onChange={(e) => setPlan(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            <div className="h-3 mt-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${ratio * 100}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Service level: <span className="font-mono text-emerald-300">{serviceOf(w)}%</span> - funded Rs {amt.toLocaleString('en-IN')} of Rs {w.cost.toLocaleString('en-IN')}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={holdSabha} disabled={!!sabha[w.id]} className="flex-1 min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold disabled:opacity-40 transition-all">Hold area sabha (Rs 5,000)</button>
              <button onClick={commit} className="flex-1 min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold transition-all">Commit funds</button>
            </div>
          </div>

          {msg && <div className="p-3 rounded-2xl text-xs leading-relaxed border bg-gold-950/40 border-gold-800 text-gold-100">{msg}</div>}

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> the municipal commissioner does not decide alone. The city is divided into wards, each ward elects ONE councillor, and area sabhas let residents check and rank their own needs. Spending without listening buys the wrong service.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Fund Station Road&apos;s street lights fully WITHOUT a sabha, then fund Riverside the same way WITH one -- compare the two happiness scores and explain the 26-point gap.</p>
        <p className="mt-1">2. Pour the whole budget into Shastri Nagar only. What happens to city happiness -- and why must a corporation spread money instead of spending it in one place?</p>
      </footer>
    </div>
  );
}

export default C6_SocialScienceGrassrootsDemocracyPart3Sim;
