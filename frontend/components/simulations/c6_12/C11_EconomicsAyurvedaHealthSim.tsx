'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'In the Ayurvedic framework, body functions are described by three doshas: vata (movement), pitta (transformation) ' +
  'and kapha (structure). Each person has a constitution (prakriti). Diet, season and routine shift the current state ' +
  '(vikriti); the framework treats health as the distance between the two. This sim models that framework -- it is a ' +
  'study of a knowledge system, not medical advice.';

type Tri = { v: number; p: number; k: number };

const CONSTITUTIONS: Record<string, Tri> = {
  Balanced: { v: 33, p: 34, k: 33 },
  'Vata-type': { v: 50, p: 25, k: 25 },
  'Pitta-type': { v: 25, p: 50, k: 25 },
  'Kapha-type': { v: 25, p: 25, k: 50 },
};

const DIETS: Record<string, Tri> = {
  'Balanced meal': { v: 0, p: 0, k: 0 },
  'Sweet and nourishing': { v: -10, p: -5, k: 15 },
  'Pungent and hot': { v: -5, p: 15, k: -5 },
  'Dry, raw, light': { v: 15, p: 5, k: -10 },
};
const SEASONS: Record<string, Tri> = {
  Winter: { v: -5, p: -10, k: 15 },
  Summer: { v: -5, p: 15, k: -5 },
  Monsoon: { v: 15, p: -5, k: -5 },
};
const ROUTINES: Record<string, Tri> = {
  'Regular meals and sleep': { v: -5, p: -5, k: 0 },
  'Irregular schedule': { v: 15, p: 0, k: -5 },
  'Overwork, late nights': { v: 5, p: 15, k: -5 },
};

const clamp = (x: number) => Math.max(0, Math.min(100, x));

export function C11_EconomicsAyurvedaHealthSim() {
  const [constitution, setConstitution] = useState('Balanced');
  const [diet, setDiet] = useState('Balanced meal');
  const [season, setSeason] = useState('Winter');
  const [routine, setRoutine] = useState('Regular meals and sleep');

  const prakriti = CONSTITUTIONS[constitution];
  const vikriti = useMemo(() => {
    const add = (a: Tri, b: Tri): Tri => ({ v: a.v + b.v, p: a.p + b.p, k: a.k + b.k });
    let t = add(add(prakriti, DIETS[diet]), add(SEASONS[season], ROUTINES[routine]));
    t = { v: clamp(t.v), p: clamp(t.p), k: clamp(t.k) };
    const s = t.v + t.p + t.k || 1;
    return { v: Math.round((t.v / s) * 1000) / 10, p: Math.round((t.p / s) * 1000) / 10, k: Math.round((t.k / s) * 1000) / 10 };
  }, [prakriti, diet, season, routine]);

  const imbalance = Math.round((Math.abs(vikriti.v - prakriti.v) + Math.abs(vikriti.p - prakriti.p) + Math.abs(vikriti.k - prakriti.k)) / 2);
  const health = 100 - imbalance;
  const deltas: Record<string, number> = {
    vata: Math.round((vikriti.v - prakriti.v) * 10) / 10,
    pitta: Math.round((vikriti.p - prakriti.p) * 10) / 10,
    kapha: Math.round((vikriti.k - prakriti.k) * 10) / 10,
  };

  // ternary plot coords: vata top (200,30), pitta right (345,235), kapha left (55,235)
  const ternary = (t: Tri) => {
    const s = (t.v + t.p + t.k) / 100 || 1;
    const v = t.v / s, p = t.p / s, k = t.k / s;
    return { x: v * 200 + p * 345 + k * 55, y: v * 30 + p * 235 + k * 235 };
  };
  const pv = ternary(prakriti);
  const vk = ternary(vikriti);

  const reset = () => {
    setConstitution('Balanced');
    setDiet('Balanced meal');
    setSeason('Winter');
    setRoutine('Regular meals and sleep');
  };

  const selectRow = (label: string, opts: Record<string, Tri>, val: string, set: (s: string) => void) => (
    <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
      <label className="text-xs text-slate-300">{label}</label>
      <div className="flex gap-1 mt-2 flex-wrap">
        {Object.keys(opts).map((o) => (
          <button key={o} onClick={() => set(o)}
            className={`flex-1 min-h-11 rounded-xl text-[10px] font-semibold border px-1 ${val === o ? 'bg-gold-600 border-gold-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">The Dosha Balance Triangle</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Ternary plot */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 270" className="w-full">
            <polygon points="200,30 345,235 55,235" fill="#0f172a" stroke="#475569" strokeWidth={2} />
            <text x={200} y={20} textAnchor="middle" fontSize={12} fill="#93c5fd" fontWeight="bold">VATA (movement)</text>
            <text x={352} y={252} textAnchor="end" fontSize={12} fill="#fca5a5" fontWeight="bold">PITTA</text>
            <text x={48} y={252} fontSize={12} fill="#86efac" fontWeight="bold">KAPHA</text>
            {/* constitution marker */}
            <circle cx={pv.x} cy={pv.y} r={7} fill="none" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="3 2" />
            <text x={pv.x} y={pv.y - 12} textAnchor="middle" fontSize={9} fill="#e2e8f0">prakriti (constitution)</text>
            {/* current state */}
            <circle cx={vk.x} cy={vk.y} r={9} fill="#fbbf24" opacity={0.9} style={{ transition: 'all 0.35s' }} />
            <text x={vk.x} y={vk.y + 22} textAnchor="middle" fontSize={9} fill="#fbbf24" style={{ transition: 'all 0.35s' }}>vikriti (current)</text>
            {/* connecting drift line */}
            <line x1={pv.x} y1={pv.y} x2={vk.x} y2={vk.y} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 3" style={{ transition: 'all 0.35s' }} />
            <text x={200} y={266} textAnchor="middle" fontSize={11} fill="#e2e8f0">
              Balance score: <tspan fontWeight="bold" fill={health > 85 ? '#34d399' : health > 70 ? '#fbbf24' : '#f87171'}>{health}/100</tspan> (distance from constitution: {imbalance} points)
            </text>
          </svg>
        </div>

        {/* Dosha ledger */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Dosha ledger (points)</div>
          {(['vata', 'pitta', 'kapha'] as const).map((key, i) => {
            const now = vikriti[key[0] as 'v' | 'p' | 'k'];
            const base = prakriti[key[0] as 'v' | 'p' | 'k'];
            const d = deltas[key];
            const color = ['#93c5fd', '#fca5a5', '#86efac'][i];
            return (
              <div key={key}>
                <div className="flex justify-between text-xs text-slate-400">
                  <span style={{ color }}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="font-mono">{base} <tspan className="text-slate-500">constitution</tspan> vs {now} <tspan className="text-slate-500">now</tspan> ({d >= 0 ? '+' : ''}{d})</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded mt-1 relative">
                  <div className="absolute inset-y-0 w-px bg-slate-400" style={{ left: `${base}%` }} />
                  <div className="h-2.5 rounded" style={{ width: `${now}%`, background: color, opacity: 0.8, transition: 'width 0.35s' }} />
                </div>
              </div>
            );
          })}
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Framework principle: &quot;like increases like.&quot; The factor pushing the LARGEST drift is{' '}
            <span className="font-mono text-amber-300 font-bold">
              {Math.abs(deltas.vata) >= Math.abs(deltas.pitta) && Math.abs(deltas.vata) >= Math.abs(deltas.kapha)
                ? 'vata-linked choices'
                : Math.abs(deltas.pitta) >= Math.abs(deltas.kapha)
                ? 'pitta-linked choices'
                : 'kapha-linked choices'}
            </span>{' '}
            -- the framework would advise its opposite quality.
          </div>
          <div className="text-amber-300 text-xs pt-2 border-t border-slate-800">
            Misconception killer: &quot;one ideal diet suits everyone.&quot; In this framework the same hot food that keeps a kapha-type
            in balance can push a pitta-type off -- balance is measured against the individual constitution, not a universal number.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {selectRow('Constitution (prakriti)', CONSTITUTIONS, constitution, setConstitution)}
        {selectRow('Diet pattern', DIETS, diet, setDiet)}
        {selectRow('Season', SEASONS, season, setSeason)}
        {selectRow('Daily routine', ROUTINES, routine, setRoutine)}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => setDiet('Balanced meal')} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500">
          Apply the balancing meal
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Set a Pitta-type constitution, then load &quot;Pungent and hot&quot; diet + Summer + Overwork. What is the balance score, and which single lever restores the most points?</li>
          <li>Keep every lifestyle input fixed and only switch the constitution type. Why does the same season change each type&apos;s score differently?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_EconomicsAyurvedaHealthSim;
