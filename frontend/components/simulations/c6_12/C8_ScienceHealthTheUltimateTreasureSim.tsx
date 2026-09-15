'use client';
/**
 * C8_ScienceHealthTheUltimateTreasureSim (Class 8 Science)
 *
 * ELI5: Health is built meal by meal. Energy comes mostly from carbohydrates
 * and fats, but you cannot grow or repair your body without protein, and
 * vitamins-minerals defend it. Build a day of meals and watch the bars: the
 * goal is balance, not just fullness.
 */
import React, { useState } from 'react';

interface Food {
  id: string;
  name: string;
  unit: string;
  kcal: number;
  protein: number;
  iron: number; // mg
  vitC: number; // mg
  tag: string;
}

const FOODS: Food[] = [
  { id: 'rice', name: 'Rice dal plate', unit: 'plates', kcal: 350, protein: 12, iron: 2.4, vitC: 4, tag: 'energy + protein' },
  { id: 'paratha', name: 'Aloo paratha', unit: 'pieces', kcal: 290, protein: 6, iron: 1.8, vitC: 8, tag: 'energy' },
  { id: 'egg', name: 'Boiled eggs', unit: 'eggs', kcal: 78, protein: 6.3, iron: 0.9, vitC: 0, tag: 'protein' },
  { id: 'dal', name: 'Dal bowl', unit: 'bowls', kcal: 180, protein: 9, iron: 2.1, vitC: 2, tag: 'protein + iron' },
  { id: 'orange', name: 'Oranges', unit: 'fruits', kcal: 62, protein: 1.2, iron: 0.2, vitC: 70, tag: 'vitamin C' },
  { id: 'greens', name: 'Palak sabzi', unit: 'bowls', kcal: 90, protein: 3.5, iron: 3.2, vitC: 28, tag: 'iron + vitamin A' },
  { id: 'cola', name: 'Cola drink', unit: 'glasses', kcal: 140, protein: 0, iron: 0, vitC: 0, tag: 'empty calories' },
  { id: 'chips', name: 'Chips packet', unit: 'packets', kcal: 310, protein: 3, iron: 0.6, vitC: 12, tag: 'fat + salt' },
];

const NEED = { kcal: 2200, protein: 45, iron: 15, vitC: 65 };

export function C8_ScienceHealthTheUltimateTreasureSim() {
  const [servings, setServings] = useState<Record<string, number>>({});
  const [day, setDay] = useState(1);

  const totals = FOODS.reduce(
    (acc, f) => {
      const n = servings[f.id] || 0;
      return {
        kcal: acc.kcal + f.kcal * n,
        protein: acc.protein + f.protein * n,
        iron: acc.iron + f.iron * n,
        vitC: acc.vitC + f.vitC * n,
      };
    },
    { kcal: 0, protein: 0, iron: 0, vitC: 0 }
  );

  const pct = (v: number, need: number) => Math.min(130, Math.round((v / need) * 100));
  const balanced = Math.abs(pct(totals.kcal, NEED.kcal) - 100) <= 15 && totals.protein >= NEED.protein * 0.8 && totals.iron >= NEED.iron * 0.7 && totals.vitC >= NEED.vitC * 0.7;

  const rows: [string, number, number, string, string][] = [
    ['Energy (kcal)', totals.kcal, NEED.kcal, 'bg-amber-500', 'fuel for play and study'],
    ['Protein (g)', totals.protein, NEED.protein, 'bg-indigo-500', 'growth and repair'],
    ['Iron (mg)', Math.round(totals.iron * 10) / 10, NEED.iron, 'bg-rose-500', 'blood - fights anaemia'],
    ['Vitamin C (mg)', totals.vitC, NEED.vitC, 'bg-emerald-500', 'immunity, absorbs iron'],
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-emerald-700">Health: The Ultimate Treasure - Diet Builder</h1>

      <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-emerald-700">Treasure map:</span> a healthy day needs
          about 2200 kcal, 45 g protein, 15 mg iron and 65 mg vitamin C for a teen. Foods with
          calories but nothing else (colas, chips) are called empty calories - they fill the energy
          bar while your defence and growth bars stay empty. Bars past 100% show waste, not wealth.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['Bal day', { rice: 2, dal: 2, orange: 1, greens: 1, egg: 1 }], ['Fast food day', { paratha: 1, chips: 2, cola: 2 }], ['Clear']] as [string, Record<string, number>][]).map(([label, preset]) => (
          <button key={label} onClick={() => { setServings(preset); setDay((d) => d + 1); }} className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all">
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">PICK SERVINGS (a teen&apos;s day)</p>
          {FOODS.map((f) => (
            <div key={f.id} className="flex items-center gap-2 mb-1.5">
              <div className="w-40">
                <div className="text-sm font-semibold leading-tight">{f.name}</div>
                <div className="text-[10px] text-slate-400">{f.tag}</div>
              </div>
              <button onClick={() => setServings((s) => ({ ...s, [f.id]: Math.max(0, (s[f.id] || 0) - 1) }))} className="w-7 h-7 rounded-md bg-slate-200 hover:bg-slate-300 text-sm font-bold transition-all">-</button>
              <span className="w-8 text-center font-mono text-sm">{servings[f.id] || 0}</span>
              <button onClick={() => setServings((s) => ({ ...s, [f.id]: Math.min(9, (s[f.id] || 0) + 1) }))} className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-sm font-bold transition-all">+</button>
              <span className="ml-auto text-[10px] text-slate-400 font-mono">{f.kcal} kcal/{f.unit.slice(0, 5)}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-3">DAY {day} SCOREBOARD (target = 100%)</p>
          {rows.map(([label, val, need, color, why]) => {
            const p = pct(val, need);
            return (
              <div key={label} className="mb-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{label} <span className="text-slate-400 font-normal">- {why}</span></span>
                  <span className="font-mono" style={{ color: p >= 80 && p <= 120 ? '#059669' : p < 80 ? '#b45309' : '#e11d48' }}>
                    {Math.round(val * 10) / 10} / {need} ({p}%)
                  </span>
                </div>
                <div className="relative h-4 rounded bg-slate-200 overflow-hidden mt-1">
                  <div className={`h-full ${color}`} style={{ width: `${p}%`, transition: 'width 300ms' }} />
                  <div className="absolute top-0 bottom-0 w-0.5 bg-slate-700" style={{ left: `${(100 / 130) * 100}%` }} />
                </div>
              </div>
            );
          })}
          <div className={`mt-2 p-3 rounded-xl border text-sm font-bold ${balanced ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-amber-50 border-amber-300 text-amber-800'}`}>
            {balanced
              ? 'Balanced diet achieved - your treasure is safe today!'
              : 'Not yet balanced: every coloured bar needs to land near 100%.'}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Load the "Fast food day": which two bars collapse even though energy is full? Fix them with the cheapest foods.</li>
          <li>Reach all four bars between 80-120% using ONLY the first six foods (no eggs). What does that teach about dal + greens?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceHealthTheUltimateTreasureSim;
