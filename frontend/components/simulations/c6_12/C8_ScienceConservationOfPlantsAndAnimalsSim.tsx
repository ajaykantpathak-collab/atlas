'use client';
/**
 * C8_ScienceConservationOfPlantsAndAnimalsSim (Class 8 Science)
 *
 * ELI5: Forests are homes. Cut more trees than the forest can regrow and
 * animal populations collapse with them. Plant enough and the forest heals.
 * Conservation means keeping removal below regrowth - run the model and see
 * the tipping point yourself.
 */
import React, { useMemo, useState } from 'react';

interface YearPoint {
  year: number;
  forest: number;
  deer: number;
  tigers: number;
}

function simulate(startForest: number, cutPerYear: number, plantedPerYear: number, years: number): YearPoint[] {
  const out: YearPoint[] = [];
  let forest = startForest;
  let deer = forest * 0.4;
  let tigers = forest * 0.02;
  for (let y = 0; y <= years; y++) {
    out.push({ year: y, forest: Math.round(forest), deer: Math.round(deer), tigers: Math.round(tigers * 10) / 10 });
    const regrowth = forest * 0.06;
    forest = Math.max(0, forest + regrowth + plantedPerYear - cutPerYear);
    // animals follow habitat with a lag
    const deerTarget = forest * 0.4;
    deer = deer * 0.6 + deerTarget * 0.4;
    const tigerTarget = forest * 0.02;
    tigers = tigers * 0.7 + tigerTarget * 0.3;
    if (forest <= 0) {
      deer = Math.max(0, deer - 40);
      tigers = Math.max(0, tigers - 2);
    }
  }
  return out;
}

export function C8_ScienceConservationOfPlantsAndAnimalsSim() {
  const [cut, setCut] = useState(80);
  const [plant, setPlant] = useState(20);
  const [years, setYears] = useState(10);
  const [ran, setRan] = useState<YearPoint[] | null>(null);

  const preview = useMemo(() => simulate(1000, cut, plant, years), [cut, plant, years]);
  const data = ran ?? preview;
  const final = data[data.length - 1];
  const healthy = final.forest >= 900;

  const maxF = Math.max(...data.map((d) => d.forest), 1);
  const mapF = (v: number) => 170 - (v / maxF) * 140;

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-emerald-700">Conservation of Plants and Animals: Forest Futures</h1>

      <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-emerald-700">Ecosystem chain:</span> trees give food and
          shelter to deer; deer feed tigers; roots hold soil and rain. Deforestation breaks every
          link at once. A forest regrows a little each year - so the race is between cutting and
          replanting. Find the balance point and the forest thrives; lose it and even tigers vanish.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Trees cut per year</span><span className="font-mono text-rose-600">{cut}</span></label>
            <input type="range" min={0} max={150} value={cut} aria-label="trees cut per year" onChange={(e) => { setCut(Number(e.target.value)); setRan(null); }} className="w-full mt-1 accent-rose-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Trees planted per year</span><span className="font-mono text-emerald-600">{plant}</span></label>
            <input type="range" min={0} max={150} value={plant} aria-label="trees planted per year" onChange={(e) => { setPlant(Number(e.target.value)); setRan(null); }} className="w-full mt-1 accent-emerald-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Run for (years)</span><span className="font-mono text-indigo-600">{years}</span></label>
            <input type="range" min={5} max={30} value={years} aria-label="years to simulate" onChange={(e) => { setYears(Number(e.target.value)); setRan(null); }} className="w-full mt-1 accent-indigo-600" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setRan(simulate(1000, cut, plant, years))} className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all">
              Run the years
            </button>
            {[
              ['Balanced', 60, 60],
              ['Timber rush', 140, 20],
              ['Reserve (no felling)', 0, 40],
            ].map(([label, c, p]) => (
              <button key={label as string} onClick={() => { setCut(c as number); setPlant(p as number); setRan(null); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all">
                {label as string}
              </button>
            ))}
          </div>
          <div className={`p-3 rounded-xl border text-sm font-bold ${healthy ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : final.forest > 400 ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-rose-100 border-rose-300 text-rose-800'}`}>
            Verdict after {years} years: forest {final.forest}/1000, deer {final.deer}, tigers {final.tigers} -{' '}
            {healthy ? 'thriving biosphere reserve!' : final.forest > 400 ? 'declining, needs protection' : 'habitat destroyed'}
          </div>
        </div>

        <div className="p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 340 200" className="w-full">
            <line x1={30} y1={170} x2={330} y2={170} stroke="#94a3b8" />
            <line x1={30} y1={170} x2={30} y2={15} stroke="#94a3b8" />
            {data.map((d, i) => {
              const x = 30 + (i / (data.length - 1)) * 295;
              const xPrev = 30 + ((i - 1) / (data.length - 1)) * 295;
              const prev = data[Math.max(0, i - 1)];
              return (
                <g key={d.year}>
                  {i > 0 && (
                    <>
                      <line x1={xPrev} y1={mapF(prev.forest)} x2={x} y2={mapF(d.forest)} stroke="#16a34a" strokeWidth={2.5} />
                      <line x1={xPrev} y1={mapF(prev.deer)} x2={x} y2={mapF(d.deer)} stroke="#d97706" strokeWidth={2} />
                      <line x1={xPrev} y1={mapF(prev.tigers)} x2={x} y2={mapF(d.tigers)} stroke="#e11d48" strokeWidth={2} />
                    </>
                  )}
                </g>
              );
            })}
            <text x={30} y={185} fontSize="9" fill="#475569">year 0</text>
            <text x={300} y={185} fontSize="9" fill="#475569">year {years}</text>
            <g fontSize="10">
              <rect x={190} y={16} width={10} height={6} fill="#16a34a" />
              <text x={204} y={22} fill="#166534">forest</text>
              <rect x={245} y={16} width={10} height={6} fill="#d97706" />
              <text x={259} y={22} fill="#92400e">deer</text>
              <rect x={295} y={16} width={10} height={6} fill="#e11d48" />
              <text x={309} y={22} fill="#9f1239">tigers</text>
            </g>
          </svg>
          <div className="px-2 text-xs text-slate-500">
            Watch the order of collapse when cutting wins: forest first, then deer, tigers last -
            top carnivores need the most habitat.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find the largest cutting rate that STILL keeps the forest above 900 for 30 years when planting = 40.</li>
          <li>Run "Timber rush" for 30 years, then switch to "Reserve" settings and run again - can the forest recover in another 30?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceConservationOfPlantsAndAnimalsSim;
