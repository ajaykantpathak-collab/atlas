'use client';

import React, { useEffect, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Different animals run their bodies at different speeds. A tiny mouse has a racing heart -- ' +
  "hundreds of beats a minute -- while an elephant's heart thumps slowly. Body size, activity " +
  'and temperature all matter. When an animal runs, its heart and breathing rates shoot up to ' +
  'deliver more oxygen to muscles.';

type Animal = 'mouse' | 'human' | 'elephant' | 'fish';

const DATA: Record<Animal, { name: string; restHR: number; runHR: number; restBR: number; emoji: string; note: string }> = {
  mouse: { name: 'Mouse', restHR: 500, runHR: 700, restBR: 160, emoji: '🐁', note: 'Tiny body loses heat fast, so it burns fuel fast -- racing pulse!' },
  human: { name: 'Human', restHR: 70, runHR: 150, restBR: 15, emoji: '🏃', note: 'Medium body, medium engine. Athletes have LOWER resting heart rates.' },
  elephant: { name: 'Elephant', restHR: 30, runHR: 90, restBR: 8, note: 'Huge body needs only slow, powerful beats to push blood everywhere.', emoji: '🐘' },
  fish: { name: 'Fish', restHR: 60, runHR: 120, restBR: 40, emoji: '🐟', note: 'Breathes with gills: counts water-flow gulps instead of chest breaths.' },
};

export function C7_ScienceLifeProcessesInAnimalsSim() {
  const [animal, setAnimal] = useState<Animal>('human');
  const [active, setActive] = useState(false);
  const [beat, setBeat] = useState(false);
  const [breath, setBreath] = useState(false);

  const d = DATA[animal];
  const hr = active ? d.runHR : d.restHR;
  const br = active ? d.restBR * 2.2 : d.restBR;

  useEffect(() => {
    const period = Math.max(120, Math.round(60000 / hr));
    const id = setInterval(() => setBeat((b) => !b), period);
    return () => clearInterval(id);
  }, [hr]);

  useEffect(() => {
    const period = Math.max(200, Math.round(60000 / br));
    const id = setInterval(() => setBreath((b) => !b), period);
    return () => clearInterval(id);
  }, [br]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Life Processes in Animals: Heart and Breath Rates</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Animal picker */}
      <div className="flex flex-wrap gap-2 mt-4">
        {(Object.keys(DATA) as Animal[]).map((a) => (
          <button
            key={a}
            onClick={() => setAnimal(a)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${animal === a ? 'bg-gold-600 border-gold-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {DATA[a].emoji} {DATA[a].name}
          </button>
        ))}
        <button
          onClick={() => setActive((v) => !v)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ml-auto ${active ? 'bg-rose-600 border-rose-400' : 'bg-emerald-600 border-emerald-400'}`}
        >
          {active ? 'Running!' : 'Resting'}
        </button>
      </div>

      {/* Beating heart + breathing lungs */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-center">
          <div
            className="text-6xl inline-block"
            style={{ transform: beat ? 'scale(1.18)' : 'scale(0.95)', transition: `transform ${Math.max(100, Math.round(30000 / hr))}ms ease-in-out` }}
          >
            ❤️
          </div>
          <div className="mt-2 font-mono text-2xl font-black text-rose-400">{hr} beats/min</div>
          <div className="text-xs text-slate-400">{active ? 'hard at work' : 'at rest'}</div>
        </div>
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-center">
          <div
            className="inline-flex flex-col items-center"
            style={{ transform: breath ? 'scaleY(1.15)' : 'scaleY(0.9)', transition: `transform ${Math.max(150, Math.round(30000 / br))}ms ease-in-out` }}
          >
            <div className="text-6xl">{animal === 'fish' ? '🫧' : '🫁'}</div>
          </div>
          <div className="mt-2 font-mono text-2xl font-black text-gold-400">{animal === 'fish' ? `${Math.round(br)} gill flows/min` : `${Math.round(br)} breaths/min`}</div>
          <div className="text-xs text-slate-400">{active ? 'oxygen demand high' : 'calm and steady'}</div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Compare the animals (resting values)</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs">
              <th className="text-left py-1">Animal</th>
              <th className="text-right py-1">Heart / min</th>
              <th className="text-right py-1">Breaths / min</th>
              <th className="text-left pl-4 hidden md:table-cell">Why?</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(DATA) as Animal[]).map((a) => (
              <tr key={a} className={`border-t border-slate-800 ${animal === a ? 'text-white' : 'text-slate-400'}`}>
                <td className="py-1.5">{DATA[a].emoji} {DATA[a].name}</td>
                <td className="text-right font-mono">{DATA[a].restHR}</td>
                <td className="text-right font-mono">{DATA[a].restBR}</td>
                <td className="pl-4 text-xs hidden md:table-cell">{DATA[a].note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => { const ks = (Object.keys(DATA) as Animal[]); setAnimal(ks[Math.floor(Math.random() * ks.length)]); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Random animal
        </button>
        <button
          onClick={() => setActive(false)}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Everyone rest
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Switch every animal to Running. Whose rate multiplies the MOST compared to rest -- mouse or elephant? Why can a mouse not sprint for long?</li>
          <li>Count the visible beats for 10 seconds with a real clock while the human rests, multiply by 6, and check against the shown number.</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceLifeProcessesInAnimalsSim;
