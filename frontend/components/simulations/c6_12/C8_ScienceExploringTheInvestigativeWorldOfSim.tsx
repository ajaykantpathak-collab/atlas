'use client';
/**
 * C8_ScienceExploringTheInvestigativeWorldOfSim (Class 8 Science)
 *
 * ELI5: Science is a method, not a list of facts. Change ONE thing
 * (independent variable), keep everything else fixed (controlled variables),
 * measure what changes (dependent variable), and let the data answer your
 * hypothesis. Here you investigate what makes seedlings grow.
 */
import React, { useState } from 'react';

interface Trial {
  water: number;
  light: number;
  soil: number;
  height: number;
}

function grow(water: number, light: number, soil: number): number {
  // secret model: light matters most, water has an optimum, soil type multiplies
  const waterFit = water <= 40 ? water / 40 : Math.max(0, 1 - (water - 40) / 60);
  const lightFit = light / 100;
  const soilMul = soil === 1 ? 0.6 : soil === 2 ? 1 : 1.3; // sandy, garden, loam with compost
  return Math.round(11 * waterFit * lightFit * soilMul * 10) / 10;
}

const SOILS = ['sand', 'garden soil', 'compost-rich loam'];

export function C8_ScienceExploringTheInvestigativeWorldOfSim() {
  const [water, setWater] = useState(40);
  const [light, setLight] = useState(50);
  const [soil, setSoil] = useState(1);
  const [hypothesis, setHypothesis] = useState<string | null>(null);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [checked, setChecked] = useState(false);

  const height = grow(water, light, soil);

  const record = () => {
    setTrials((t) => [...t, { water, light, soil, height }].slice(-6));
    setChecked(false);
  };

  const reveal = () => {
    const best = trials.reduce((b, t) => (t.height > b.height ? t : b), trials[0]);
    setChecked(true);
    setHypothesis(
      best && best.light >= 70 && best.water >= 25 && best.water <= 55
        ? 'Your own data point to it: seedlings grow most with BRIGHT light, MODERATE water and compost-rich loam.'
        : 'Look again at your table: the tallest seedling got strong light, moderate (not maximum!) water, and loam.'
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-emerald-700">The Investigative World: Fair-Test Greenhouse</h1>

      <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-emerald-700">Fair test rules:</span> change one variable at
          a time, record every trial, and compare like with like. Is more water always better? Is
          the darkest corner secretly fine? Write your hypothesis FIRST, then let your own data
          judge it. That loop - question, hypothesis, experiment, data, conclusion - is science.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Water (mL per day)</span><span className="font-mono text-sky-600">{water}</span></label>
            <input type="range" min={0} max={100} value={water} aria-label="water" onChange={(e) => setWater(Number(e.target.value))} className="w-full mt-1 accent-sky-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Light (% of full sun)</span><span className="font-mono text-amber-600">{light}</span></label>
            <input type="range" min={0} max={100} value={light} aria-label="light" onChange={(e) => setLight(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Soil type (controlled unless testing it)</p>
            <div className="flex gap-2">
              {SOILS.map((s, i) => (
                <button key={s} onClick={() => setSoil(i)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${soil === i ? 'bg-emerald-600 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={record} className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all">
              Grow 2 weeks and record
            </button>
            <button onClick={reveal} disabled={trials.length < 2} className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-all">
              Conclude from my data
            </button>
          </div>
          <div className="text-xs text-slate-500">Trials recorded: {trials.length} (need at least 2 to conclude)</div>
        </div>

        <div className="p-2 bg-gradient-to-b from-sky-50 to-white rounded-2xl border border-slate-200">
          <div className="flex items-end justify-center gap-8 h-44 pt-2">
            {/* seedling visual */}
            <div className="flex flex-col items-center">
              <svg width={90} height={150} viewBox="0 0 90 150">
                <rect x={5} y={130} width={80} height={16} rx={4} fill="#78350f" />
                <rect x={8} y={133} width={74} height={12} rx={3} fill="#42620f" opacity={soil === 2 ? 1 : soil === 1 ? 0.7 : 0.45} />
                <line x1={45} y1={130} x2={45} y2={130 - height * 5} stroke="#166534" strokeWidth={3.5} strokeLinecap="round" style={{ transition: 'all 400ms' }} />
                {height > 3 && <ellipse cx={32} cy={128 - height * 5} rx={14} ry={6} fill="#22c55e" transform={`rotate(-28 32 ${128 - height * 5})`} style={{ transition: 'all 400ms' }} />}
                {height > 3 && <ellipse cx={58} cy={126 - height * 5} rx={14} ry={6} fill="#16a34a" transform={`rotate(24 58 ${126 - height * 5})`} style={{ transition: 'all 400ms' }} />}
                {light > 60 && <circle cx={70} cy={18} r={11} fill="#fbbf24" opacity={0.9} />}
                {light <= 60 && <circle cx={70} cy={18} r={8} fill="#e2e8f0" />}
                {water > 60 && <path d={`M 18 24 q 3 8 6 0 q 3 8 6 0`} stroke="#38bdf8" strokeWidth={2.5} fill="none" strokeLinecap="round" />}
              </svg>
              <div className="mt-1 text-sm font-bold text-emerald-700 font-mono">height: {height} cm</div>
            </div>
          </div>
          <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-600">
            variables set - water {water} mL, light {light}%, soil {SOILS[soil]}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <p className="text-xs font-bold text-slate-500 mb-2">LAB NOTEBOOK</p>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-slate-500">
              <th className="text-left py-1">Trial</th>
              <th className="text-left">water</th>
              <th className="text-left">light</th>
              <th className="text-left">soil</th>
              <th className="text-left">height (cm)</th>
            </tr>
          </thead>
          <tbody>
            {trials.map((t, i) => (
              <tr key={i} className={t.height === Math.max(...trials.map((x) => x.height)) ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                <td className="py-0.5">#{i + 1}</td>
                <td>{t.water}</td>
                <td>{t.light}%</td>
                <td>{SOILS[t.soil]}</td>
                <td>{t.height}</td>
              </tr>
            ))}
            {trials.length === 0 && (
              <tr><td colSpan={5} className="text-slate-400 py-1">no trials yet - set variables and press record</td></tr>
            )}
          </tbody>
        </table>
        {checked && hypothesis && (
          <div className="mt-2 p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-sm text-indigo-900 font-semibold">
            Conclusion: {hypothesis}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Keep light at 80 and soil on loam; test water 20, 40, 60 and 100. Does the best water level sit in the middle? Why?</li>
          <li>Design a trial set that isolates ONLY the effect of soil type. Which variables must stay frozen?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceExploringTheInvestigativeWorldOfSim;
