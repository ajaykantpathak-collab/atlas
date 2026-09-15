'use client';

import React, { useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Acids taste sour (lemon, tamarind), bases feel slippery and taste bitter (soap, lime water), ' +
  'and salts are neutral. We NEVER taste lab chemicals -- instead we use INDICATORS: litmus turns ' +
  'red in acid and blue in base, and turmeric stain turns red with a base. Mixing an acid with the ' +
  'right amount of base gives a neutral salt + water.';

type Substance = 'lemon' | 'soap' | 'limeWater' | 'saltWater' | 'tamarind' | 'bakingSoda';
const SUBSTANCES: Record<Substance, { name: string; kind: 'acid' | 'base' | 'neutral' }> = {
  lemon: { name: 'Lemon juice', kind: 'acid' },
  tamarind: { name: 'Tamarind water', kind: 'acid' },
  soap: { name: 'Soap solution', kind: 'base' },
  limeWater: { name: 'Lime water', kind: 'base' },
  bakingSoda: { name: 'Baking soda solution', kind: 'base' },
  saltWater: { name: 'Salt solution', kind: 'neutral' },
};

export function C7_ScienceAcidsBasesAndSaltsSim() {
  const [substance, setSubstance] = useState<Substance>('lemon');
  const [indicator, setIndicator] = useState<'none' | 'litmus' | 'turmeric'>('none');
  const [dropsOfBase, setDropsOfBase] = useState(0); // neutralization drops added to a test tube
  const [score, setScore] = useState({ right: 0, tried: 0 });

  const kind = SUBSTANCES[substance].kind;
  const neutralized = dropsOfBase >= 5;

  const litmusColor = indicator === 'litmus' ? (neutralized ? '#a3a3a3' : kind === 'acid' ? '#ef4444' : kind === 'base' ? '#3b82f6' : '#a3a3a3') : '#f8fafc';
  const litmusText = neutralized ? 'no clear change (now a salt)' : kind === 'acid' ? 'turns RED' : kind === 'base' ? 'turns BLUE' : 'stays same (green)';
  const turmericText = neutralized ? 'fades back' : kind === 'base' ? 'stain turns RED' : 'stain stays yellow';
  const turmericColor = indicator === 'turmeric' && !neutralized && kind === 'base' ? '#ef4444' : '#fbbf24';

  const guess = (g: 'acid' | 'base' | 'neutral') => {
    setScore((s) => ({ right: s.right + (g === kind ? 1 : 0), tried: s.tried + 1 }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Acids, Bases and Salts: Indicator Detective</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Substance buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {(Object.keys(SUBSTANCES) as Substance[]).map((s) => (
          <button
            key={s}
            onClick={() => { setSubstance(s); setDropsOfBase(0); }}
            className={`px-3 py-2 rounded-xl text-sm font-semibold border transition-colors ${substance === s ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {SUBSTANCES[s].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Test tube */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 flex flex-col items-center">
          <svg viewBox="0 0 120 240" className="w-28">
            <path d="M 35 20 L 35 190 A 25 25 0 0 0 85 190 L 85 20 Z" fill="rgba(148,163,184,0.15)" stroke="#94a3b8" strokeWidth={3} />
            <clipPath id="tube">
              <path d="M 38 23 L 38 190 A 22 22 0 0 0 82 190 L 82 23 Z" />
            </clipPath>
            <rect x={30} y={70} width={60} height={150} fill={litmusColor} opacity={0.85} clipPath="url(#tube)" style={{ transition: 'fill 0.5s' }} />
            {indicator === 'turmeric' && (
              <rect x={30} y={150} width={60} height={70} fill={turmericColor} opacity={0.8} clipPath="url(#tube)" style={{ transition: 'fill 0.5s' }} />
            )}
            {[...Array(dropsOfBase)].map((_, i) => (
              <circle key={i} cx={45 + (i % 3) * 15} cy={50 - (i % 3) * 6} r={3} fill="#3b82f6" opacity={0.9} />
            ))}
          </svg>
          <div className="text-sm text-slate-300 text-center mt-2 font-semibold">{SUBSTANCES[substance].name}</div>
          {neutralized && <div className="text-xs text-emerald-400 mt-1">Neutral! Acid + base made a SALT + water.</div>}
        </div>

        {/* Indicator panel */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 space-y-3">
          <div className="text-xs uppercase tracking-wide text-slate-400">Choose an indicator</div>
          <div className="flex gap-2">
            {(['none', 'litmus', 'turmeric'] as const).map((ind) => (
              <button
                key={ind}
                onClick={() => setIndicator(ind)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border capitalize transition-colors ${indicator === ind ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
              >
                {ind === 'none' ? 'No indicator' : ind === 'litmus' ? 'Litmus paper' : 'Turmeric stain'}
              </button>
            ))}
          </div>
          {indicator !== 'none' && (
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-600 text-sm">
              {indicator === 'litmus' ? (
                <p>
                  Red litmus paper: <span className="font-bold" style={{ color: litmusColor }}>{litmusText}</span>
                </p>
              ) : (
                <p>
                  Yellow turmeric stain: <span className="font-bold" style={{ color: turmericColor }}>{turmericText}</span>
                </p>
              )}
            </div>
          )}
          {/* Neutralization drops */}
          <div>
            <div className="text-xs text-slate-400 mb-1">Neutralize this sample: add base drop by drop</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setDropsOfBase((d) => Math.min(8, d + 1))} className="px-3 py-2 rounded-xl text-xs font-semibold border bg-blue-600 border-blue-400 hover:bg-blue-500">
                Add 1 drop of base
              </button>
              <button onClick={() => setDropsOfBase(0)} className="px-3 py-2 rounded-xl text-xs font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
                Refill tube
              </button>
              <span className="font-mono text-xs text-slate-300">{dropsOfBase}/5 drops</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guessing game */}
      <div className="mt-4 p-4 bg-slate-800 rounded-2xl border border-slate-600">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-slate-300">Your verdict for {SUBSTANCES[substance].name}:</span>
          <div className="flex gap-2">
            {(['acid', 'base', 'neutral'] as const).map((g) => (
              <button key={g} onClick={() => guess(g)} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-900 border-slate-600 hover:bg-slate-700 capitalize">
                {g}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-emerald-300">
            score: {score.right}/{score.tried}
          </span>
        </div>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Test soap solution with BOTH indicators. Why does litmus and turmeric agree, and why does turmeric ignore the lemon juice?</li>
          <li>Add exactly 5 drops to lemon juice. If you had added only 3, would the litmus still be red, blue or something in between? Reason it out, then check.</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceAcidsBasesAndSaltsSim;
