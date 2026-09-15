'use client';

import React, { useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Food takes an amazing journey: chewed in the MOUTH, softened in the STOMACH with acid, ' +
  'fully digested and absorbed in the SMALL INTESTINE, water recovered in the LARGE INTESTINE. ' +
  'Each stage has special juices. Starch (carbohydrate), proteins and fats are broken down at ' +
  'different stations along the way!';

type Organ = 'mouth' | 'stomach' | 'small' | 'large';
const ORGANS: Record<Organ, { name: string; job: string; juices: string; digests: string[]; length: string }> = {
  mouth: { name: 'Mouth', job: 'Teeth crush food; tongue mixes it.', juices: 'Saliva (with salivary amylase)', digests: ['starch'], length: 'chewing: 30 seconds' },
  stomach: { name: 'Stomach', job: 'Churns food into a thick soup.', juices: 'Hydrochloric acid + pepsin (mucus protects the wall)', digests: ['protein'], length: '2 to 4 hours' },
  small: { name: 'Small intestine', job: 'Completes digestion; finger-like villi ABSORB food into blood.', juices: 'Bile (from liver), pancreatic juice, intestinal juice', digests: ['starch', 'protein', 'fat'], length: 'about 6 metres long!' },
  large: { name: 'Large intestine', job: 'Soaks up leftover water; the rest is removed.', juices: 'No digestive juices -- just water absorption', digests: [], length: 'about 1.5 metres' },
};

const FOOD_COLORS: Record<string, string> = { starch: '#fbbf24', protein: '#f472b6', fat: '#a78bfa' };

export function C7_ScienceNutritionInAnimalsSim() {
  const [organ, setOrgan] = useState<Organ>('mouth');
  const [food, setFood] = useState<'starch' | 'protein' | 'fat'>('starch');

  const o = ORGANS[organ];
  const digestedHere = o.digests.includes(food);
  const eatenBefore = (() => {
    const order: Organ[] = ['mouth', 'stomach', 'small', 'large'];
    return order.slice(0, order.indexOf(organ)).some((og) => ORGANS[og].digests.includes(food));
  })();

  const status = digestedHere ? 'DIGESTED HERE' : eatenBefore ? 'ALREADY DIGESTED earlier' : 'NOT YET digested -- travels on unchanged';

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Nutrition in Animals: The Digestion Journey</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Food type picker */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-xs text-slate-400">Follow a bite of:</span>
        {(['starch', 'protein', 'fat'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFood(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border capitalize transition-colors ${food === f ? 'border-transparent text-slate-900' : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'}`}
            style={food === f ? { backgroundColor: FOOD_COLORS[f] } : {}}
          >
            {f === 'starch' ? 'Starch (roti/rice)' : f === 'protein' ? 'Protein (dal/paneer)' : 'Fat (ghee/oil)'}
          </button>
        ))}
      </div>

      {/* Canal diagram */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 200" className="w-full">
          {/* canal path */}
          <path d="M 30 100 C 80 40, 150 40, 200 90 C 250 140, 290 150, 340 120 C 400 85, 480 90, 560 110" fill="none" stroke="#334155" strokeWidth={26} strokeLinecap="round" />
          {/* organ stations */}
          {([
            { k: 'mouth' as Organ, x: 55, y: 72 },
            { k: 'stomach' as Organ, x: 250, y: 132 },
            { k: 'small' as Organ, x: 390, y: 100 },
            { k: 'large' as Organ, x: 520, y: 102 },
          ]).map((s) => (
            <g key={s.k} className="cursor-pointer" onClick={() => setOrgan(s.k)}>
              <circle
                cx={s.x}
                cy={s.y}
                r={organ === s.k ? 20 : 14}
                fill={organ === s.k ? FOOD_COLORS[food] : '#475569'}
                stroke={organ === s.k ? '#fff' : '#94a3b8'}
                strokeWidth={2}
                style={{ transition: 'all 0.25s' }}
              />
              <text x={s.x} y={s.y + 38} textAnchor="middle" fill={organ === s.k ? '#e2e8f0' : '#94a3b8'} fontSize={11} fontWeight={organ === s.k ? 'bold' : 'normal'}>
                {ORGANS[s.k].name}
              </text>
            </g>
          ))}
          {/* moving food dot */}
          <circle r={7} fill={FOOD_COLORS[food]}>
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              path="M 30 100 C 80 40, 150 40, 200 90 C 250 140, 290 150, 340 120 C 400 85, 480 90, 560 110"
            />
          </circle>
        </svg>
      </div>

      {/* Organ info */}
      <div className="mt-4 p-4 bg-slate-800 rounded-2xl border border-slate-600">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-black text-indigo-300">{o.name}</h2>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-600">{o.length}</span>
        </div>
        <p className="text-sm text-slate-300 mt-2">{o.job}</p>
        <p className="text-xs text-slate-400 mt-1">Juices here: {o.juices}</p>
        <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-700 text-sm">
          Your bite of <span className="font-bold" style={{ color: FOOD_COLORS[food] }}>{food}</span>:{' '}
          <span className={digestedHere ? 'text-emerald-400 font-bold' : eatenBefore ? 'text-sky-300 font-bold' : 'text-amber-300 font-bold'}>{status}</span>
          {!digestedHere && !eatenBefore && o.digests.length > 0 && (
            <span className="text-slate-400 text-xs"> (this station handles {o.digests.join(' and ')} instead)</span>
          )}
          {organ === 'small' && digestedHere && <span className="text-slate-400 text-xs"> -- villi soak it into the bloodstream here!</span>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {(Object.keys(ORGANS) as Organ[]).map((k) => (
          <button
            key={k}
            onClick={() => setOrgan(k)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${organ === k ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {ORGANS[k].name}
          </button>
        ))}
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Follow FAT from mouth to large intestine. At which station does it finally get digested, and which juice starts that work?</li>
          <li>Explain why the stomach does not digest starch even though it is swimming in strong acid. Then check: which juice in the mouth DID start starch digestion?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceNutritionInAnimalsSim;
