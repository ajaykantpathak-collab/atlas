'use client';
/**
 * C8_MathematicsProportionalReasoning1Sim (Class 8 Maths)
 *
 * ELI5: Direct proportional reasoning means every quantity scales by the same
 * factor. Double the servings, double every ingredient. The unit rate
 * (amount for ONE serving) is the master key - multiply it by anything.
 */
import React, { useState } from 'react';

interface Recipe {
  name: string;
  emoji: string;
  baseServings: number;
  items: { name: string; qty: number; unit: string }[];
}

const RECIPES: Recipe[] = [
  {
    name: 'Masala Lemonade',
    emoji: 'L',
    baseServings: 4,
    items: [
      { name: 'Lemon juice', qty: 100, unit: 'mL' },
      { name: 'Sugar', qty: 60, unit: 'g' },
      { name: 'Water', qty: 800, unit: 'mL' },
      { name: 'Chaat masala', qty: 4, unit: 'g' },
    ],
  },
  {
    name: 'Pancakes',
    emoji: 'P',
    baseServings: 5,
    items: [
      { name: 'Flour', qty: 250, unit: 'g' },
      { name: 'Milk', qty: 300, unit: 'mL' },
      { name: 'Eggs', qty: 2, unit: '' },
      { name: 'Sugar', qty: 40, unit: 'g' },
    ],
  },
];

export function C8_MathematicsProportionalReasoning1Sim() {
  const [which, setWhich] = useState(0);
  const [servings, setServings] = useState(4);
  const [showUnit, setShowUnit] = useState(false);

  const recipe = RECIPES[which];
  const factor = servings / recipe.baseServings;
  const maxQty = Math.max(...recipe.items.map((i) => i.qty * factor), 1);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Proportional Reasoning 1: The Recipe Scaler</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Scaling rule:</span> every ingredient obeys the
          SAME multiplication factor = new servings / base servings. Find each ingredient's unit rate
          (amount for one serving) and you can scale to any crowd - a birthday of 15 or an army of
          100 - without ever re-measuring the recipe card.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {RECIPES.map((r, i) => (
          <button key={r.name} onClick={() => setWhich(i)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${which === i ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {r.name}
          </button>
        ))}
        <button onClick={() => setShowUnit((s) => !s)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${showUnit ? 'bg-amber-500 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          {showUnit ? 'Unit rates: shown' : 'Unit rates: hidden'}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <label className="text-xs font-semibold text-slate-500 flex justify-between">
            <span>Servings wanted (base: {recipe.baseServings})</span>
            <span className="font-mono text-indigo-600">{servings}</span>
          </label>
          <input type="range" min={1} max={40} value={servings} aria-label="servings" onChange={(e) => setServings(Number(e.target.value))} className="w-full mt-2 accent-indigo-600" />
          <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>
              factor = {servings} / {recipe.baseServings} = <span className="text-indigo-700 font-bold">{Math.round(factor * 1000) / 1000}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {servings === recipe.baseServings
                ? 'same as base recipe'
                : factor > 1
                  ? `multiply every ingredient by ${Math.round(factor * 100) / 100} (a party!)`
                  : `multiply every ingredient by ${Math.round(factor * 100) / 100} (a small treat)`}
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {[1, 2, 10, 25].map((s) => (
              <button key={s} onClick={() => setServings(s)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all">
                {s} serving{s > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">SHOPPING LIST (scaled)</p>
          {recipe.items.map((item) => {
            const scaled = Math.round(item.qty * factor * 100) / 100;
            const unitRate = Math.round((item.qty / recipe.baseServings) * 100) / 100;
            return (
              <div key={item.name} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="font-mono text-indigo-700">
                    {scaled} {item.unit}
                  </span>
                </div>
                <div className="h-3 rounded bg-slate-200 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${(scaled / maxQty) * 100}%`, transition: 'width 250ms' }} />
                </div>
                {showUnit && (
                  <div className="text-[11px] text-amber-700 font-mono">
                    unit rate: {unitRate} {item.unit} per serving x {Math.round(factor * 1000) / 1000} = {scaled} {item.unit}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Scale lemonade to exactly 10 servings, then check: are lemon juice and water in the same ratio as the base (100:800)?</li>
          <li>Pancakes serve 5. How many grams of flour for 3 people? Predict from the unit rate before you slide.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsProportionalReasoning1Sim;
