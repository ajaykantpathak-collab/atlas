/**
 * C6 Science -- Components of Food (Curiosity)
 *
 * One chapter concept: food contains nutrients -- carbohydrates
 * (starch), proteins and fats -- and we can DETECT them with simple
 * kitchen-lab tests: iodine turns blue-black with starch, copper
 * sulphate turns violet with protein, and fat makes paper translucent.
 *
 * Interaction model: choose a food, choose a detective test, run it on
 * the test tube and read the colour verdict. Then log the result into
 * the nutrient table.
 */
import React, { useState } from 'react';

type Nutrient = 'starch' | 'protein' | 'fat';
type Food = { name: string; emoji: string; has: Nutrient[] };

const FOODS: Food[] = [
  { name: 'Boiled potato', emoji: '\u{1F954}', has: ['starch'] },
  { name: 'Rice', emoji: '\u{1F35A}', has: ['starch'] },
  { name: 'Boiled egg white', emoji: '\u{1F95A}', has: ['protein'] },
  { name: 'Dal (pulses)', emoji: '\u{1FAD9}', has: ['protein'] },
  { name: 'Butter / ghee', emoji: '\u{1F9C8}', has: ['fat'] },
  { name: 'Groundnuts', emoji: '\u{1F95C}', has: ['fat', 'protein'] },
  { name: 'Banana', emoji: '\u{1F34C}', has: ['starch'] },
  { name: 'Milk', emoji: '\u{1F95B}', has: ['protein', 'fat'] },
];

type Test = { id: Nutrient; name: string; how: string; positiveColor: string; negativeColor: string; verdict: (pos: boolean) => string };

const TESTS: Test[] = [
  { id: 'starch', name: 'Iodine test', how: 'Add 2-3 drops of iodine solution to the food.', positiveColor: '#1e1b4b', negativeColor: '#d97706', verdict: (p) => (p ? 'Turns blue-black -- STARCH found!' : 'Stays brownish -- no starch here.') },
  { id: 'protein', name: 'Copper sulphate test', how: 'Add copper sulphate + caustic soda solution to the food paste.', positiveColor: '#7c3aed', negativeColor: '#38bdf8', verdict: (p) => (p ? 'Turns violet -- PROTEIN found!' : 'Stays blue -- no protein detected.') },
  { id: 'fat', name: 'Transparent paper test', how: 'Rub the food on paper and let it dry.', positiveColor: '#fbbf24', negativeColor: '#e2e8f0', verdict: (p) => (p ? 'Paper turns translucent (light passes) -- FAT found!' : 'Paper dries normally -- no fat mark.') },
];

function C6_ScienceComponentsOfFoodSim() {
  const [food, setFood] = useState<Food>(FOODS[0]);
  const [test, setTest] = useState<Test>(TESTS[0]);
  const [phase, setPhase] = useState<'ready' | 'mixing' | 'result'>('ready');
  const [log, setLog] = useState<{ food: string; test: Nutrient; found: boolean }[]>([]);

  const found = food.has.includes(test.id);
  const runTest = () => {
    setPhase('mixing');
    setTimeout(() => setPhase('result'), 900);
  };
  const logIt = () => {
    if (phase === 'result') setLog((l) => [{ food: food.name, test: test.id, found }, ...l].slice(0, 6));
    setPhase('ready');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-lime-200 shadow-xl font-sans text-slate-800">
      <style>{'@keyframes bubble { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-26px); opacity: 0; } } .bub { animation: bubble 0.9s linear infinite; }'}</style>
      <h2 className="text-xl md:text-2xl font-black text-lime-700">Components of Food -- Nutrient Detective Lab</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Every food is a mixture of <b>nutrients</b>: carbohydrates give energy, proteins build the body, and fats
        store energy. Scientists never guess -- they TEST. Run each detective test and record the colour change
        in your lab notebook!
      </p>

      <div className="grid md:grid-cols-[1fr_240px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-lime-100 bg-lime-50/40 p-4 flex items-end justify-center gap-6 min-h-[250px]">
          <div className="text-center">
            <div className="text-5xl mb-1">{food.emoji}</div>
            <div className="text-[11px] font-bold text-slate-500 max-w-[90px]">{food.name}</div>
          </div>
          <svg viewBox="0 0 90 200" className="h-56">
            <path d="M 25 10 L 25 150 Q 25 185 45 185 Q 65 185 65 150 L 65 10" fill="none" stroke="#94a3b8" strokeWidth="4" />
            <rect x="27" y="8" width="36" height="7" rx="3" fill="#94a3b8" />
            <clipPath id="tube"><path d="M 25 10 L 25 150 Q 25 185 45 185 Q 65 185 65 150 L 65 10 Z" /></clipPath>
            <g clipPath="url(#tube)">
              <rect x="20" y="40" width="50" height="150" fill={phase === 'result' ? (found ? test.positiveColor : test.negativeColor) : '#bae6fd'} style={{ transition: 'fill 0.8s ease' }} />
              {phase === 'mixing' && [0, 1, 2].map((b) => (
                <circle key={b} cx={32 + b * 12} cy="140" r="3.5" fill="#ffffff" opacity="0.8" className="bub" style={{ animationDelay: b * 0.25 + 's' }} />
              ))}
            </g>
            <text x="45" y="30" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">{test.name}</text>
          </svg>
          <div className="self-start max-w-[180px]">
            {phase === 'result' ? (
              <div className="p-3 rounded-2xl bg-white border-2 border-lime-300 shadow">
                <div className="text-xs font-black text-lime-700 uppercase">Verdict</div>
                <div className="text-xs text-slate-700 mt-1 font-semibold">{test.verdict(found)}</div>
                <button onClick={logIt} className="mt-2 px-4 py-1.5 rounded-full bg-lime-600 text-white text-[11px] font-black hover:bg-lime-700 transition-colors">
                  Record in notebook
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-white border-2 border-slate-200 text-xs text-slate-500 font-semibold">
                {test.how} Press <b>Run test</b> and watch the colour!
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Food sample</div>
          <div className="grid grid-cols-2 gap-1.5">
            {FOODS.map((f) => (
              <button key={f.name} onClick={() => { setFood(f); setPhase('ready'); }} className={'px-1.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ' + (food.name === f.name ? 'bg-lime-600 text-white' : 'bg-lime-100 text-lime-800 hover:bg-lime-200')}>
                {f.emoji} {f.name}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Choose test</div>
          <div className="space-y-1.5">
            {TESTS.map((t) => (
              <button key={t.id} onClick={() => { setTest(t); setPhase('ready'); }} className={'w-full px-2 py-1.5 rounded-lg text-[11px] font-bold text-left transition-all ' + (test.id === t.id ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-800 hover:bg-sky-200')}>
                {t.name}
              </button>
            ))}
          </div>
          <button onClick={runTest} disabled={phase === 'mixing'} className={'w-full px-3 py-2 rounded-xl text-xs font-black transition-all ' + (phase === 'mixing' ? 'bg-slate-200 text-slate-400' : 'bg-lime-600 text-white hover:bg-lime-700')}>
            Run test
          </button>
        </div>
      </div>

      {log.length > 0 && (
        <div className="mt-3 p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
          <div className="text-xs font-black text-amber-800 uppercase">Lab notebook</div>
          <ul className="text-[11px] text-amber-700 mt-1 space-y-0.5">
            {log.map((l, i) => (
              <li key={i}>
                {l.food} + {l.test} test: <b>{l.found ? 'FOUND' : 'not found'}</b>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Test groundnuts with ALL THREE tests. Two of them turn positive -- which nutrients hide in one little nut?</li>
          <li>Milk shows violet (protein) AND makes paper translucent (fat). Record both tests -- why do growing children need milk?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceComponentsOfFoodSim };
export default C6_ScienceComponentsOfFoodSim;
