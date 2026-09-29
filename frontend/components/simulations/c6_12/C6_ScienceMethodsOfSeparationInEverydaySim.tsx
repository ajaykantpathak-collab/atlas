/**
 * C6 Science -- Methods of Separation in Everyday Life
 *
 * One chapter concept: we separate mixtures by picking the method that
 * uses the DIFFERENCE between the parts -- size (straining, sieving),
 * weight (winnowing), settling (sedimentation + decantation), particle
 * size (filtration), boiling point (evaporation). Filtering can never
 * remove a DISSOLVED substance: only evaporation can.
 *
 * Interaction model: clean a jug of muddy, salty water with tea leaves,
 * one stage at a time. Choose the right method for each stage; a wrong
 * choice explains why it cannot work.
 */
import React, { useState } from 'react';

type Stage = { task: string; options: string[]; correct: number; why: string[] };

const STAGES: Stage[] = [
  {
    task: 'Tea leaves are floating in the water. Remove them first.',
    options: ['Strain through a big mesh sieve', 'Evaporate the water', 'Winnow with the wind'],
    correct: 0,
    why: [
      'Correct! The leaves are much BIGGER than water, so a mesh catches them.',
      'Evaporation would burn the leaves and leave everything behind. Save it for the salt!',
      'Winnowing needs light dry husk blown by wind -- these leaves are soaked in water.',
    ],
  },
  {
    task: 'The water is muddy. Let the mud go, using stillness.',
    options: ['Filter paper right away', 'Sedimentation, then decant (pour off) the top water', 'Handpick the mud'],
    correct: 1,
    why: [
      'Filtration works best AFTER the heavy mud has settled -- go one step calmer first.',
      'Correct! Mud is heavier, so it sinks. Then you pour off the clearer top water.',
      'You cannot pick mud grains by hand -- they are far too tiny.',
    ],
  },
  {
    task: 'A fine haze still hangs in the decanted water. Polish it.',
    options: ['Filtration through filter paper', 'Winnowing', 'Threshing'],
    correct: 0,
    why: [
      'Correct! Filter paper has holes so tiny only water passes -- the haze stays behind.',
      'Winnowing only separates light dry husk from heavier grain using wind.',
      'Threshing separates grain from stalks -- no stalks in our water!',
    ],
  },
  {
    task: 'The water LOOKS clean now -- but taste it: still salty! Get the salt.',
    options: ['Filter it again', 'Decant it once more', 'Evaporation -- let the water escape'],
    correct: 2,
    why: [
      'No! Dissolved salt passes straight through filter paper -- it travels WITH the water.',
      'Decanting cannot help: dissolved salt never settles to the bottom.',
      'Correct! Water evaporates as vapour and the salt stays behind as crystals.',
    ],
  },
];

function C6_ScienceMethodsOfSeparationInEverydaySim() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const reset = () => {
    setStep(0);
    setPicked(null);
    setMistakes(0);
    setShowHint(false);
  };

  const choose = (i: number) => {
    setPicked(i);
    if (i !== STAGES[step].correct) setMistakes(mistakes + 1);
  };
  const advance = () => {
    setPicked(null);
    setShowHint(false);
    setStep(step + 1);
  };

  const done = step >= STAGES.length;
  // live jug state per completed stage
  const leaves = step >= 1 ? 0 : 12;
  const mud = step >= 2 ? 8 : step >= 3 ? 0 : 40; // settled vs removed
  const clear = [25, 45, 70, 95, 100][step];
  const salt = step >= 4 ? 0 : 6;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-gold-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-gold-700">The water-cleaning factory -- step by step</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        This jug holds <b>tea leaves, mud, dissolved salt and water</b>. Each method of separation uses ONE
        difference between the things mixed. Choose the right method for every stage -- the jug reacts at once.
      </p>

      <div className="grid md:grid-cols-[1fr_260px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-gold-100 bg-gold-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#ecfeff" />
            {/* jug */}
            <path d="M 220 80 L 220 240 L 420 240 L 420 80" stroke="#0e7490" strokeWidth="5" fill="none" />
            <rect x="222" y={100} width="196" height="138" fill="#a5f3fc" opacity="0.6" />
            {/* water clarity layer */}
            <rect x="222" y="100" width="196" height="138" fill={'rgb(' + (200 - clear * 1.2) + ',' + (240 - clear * 0.5) + ',255)'} opacity={0.25 + clear / 260} style={{ transition: 'all 0.8s' }} />
            {/* mud layer: settling then gone */}
            <rect x="222" y={238 - mud / 3} width="196" height={mud / 3 + 2} fill="#92400e" opacity={mud > 0 ? 0.75 : 0} style={{ transition: 'all 0.9s ease' }} />
            {/* floating leaves */}
            {step === 0 &&
              [0, 1, 2, 3, 4, 5].map((i) => (
                <ellipse key={i} cx={250 + i * 26} cy={104 + (i % 2) * 9} rx="13" ry="5" fill="#4d7c0f" transform={'rotate(' + (i * 21 - 30) + ' ' + (250 + i * 26) + ' ' + (104 + (i % 2) * 9) + ')'} />
              ))}
            {/* salt dots */}
            {!done &&
              [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <circle key={i} cx={238 + ((i * 37) % 170)} cy={125 + ((i * 23) % 100)} r="2.5" fill="#fff" opacity={salt > 0 ? 0.9 : 0} style={{ transition: 'opacity 0.6s' }} />
              ))}
            {/* stage equipment */}
            {step === 0 && <rect x="470" y="90" width="120" height="80" rx="8" fill="none" stroke="#0891b2" strokeWidth="3" strokeDasharray="6 5" />}
            {step === 1 && <path d="M 470 200 Q 530 150 590 200" stroke="#0891b2" strokeWidth="3" fill="none" />}
            {step === 2 && <path d="M 520 90 L 480 180 L 560 180 Z" fill="#f1f5f9" stroke="#0891b2" strokeWidth="3" />}
            {step === 3 && <path d="M 500 170 q 20 -60 40 0 q -20 -18 -40 0" fill="#fb923c" />}
            {done && <text x="500" y="140" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0e7490">clean!</text>}
            <text x="320" y="282" textAnchor="middle" fontSize="14" fontWeight="900" fill="#155e75">
              {done ? 'Clear water separated -- and you learned where the salt went!' : 'Stage ' + (step + 1) + ': ' + STAGES[step].task}
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { k: 'Leaves', v: leaves === 0 ? '0 caught' : leaves + ' floating' },
              { k: 'Mud', v: step >= 3 ? '0 g' : step >= 2 ? 'settled' : mud + ' g' },
              { k: 'Clarity', v: clear + '%' },
              { k: 'Salt (dissolved)', v: step >= 4 ? 'crystals out' : salt + ' g' },
            ].map((row) => (
              <div key={row.k} className="p-2 rounded-xl bg-slate-100 text-center">
                <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold">{row.k}</div>
                <div className="text-xs font-black text-gold-700">{row.v}</div>
              </div>
            ))}
          </div>

          {!done ? (
            <>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pick a method</div>
              {STAGES[step].options.map((opt, i) => (
                <button key={opt} onClick={() => choose(i)} className={'w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ' + (picked === null ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : picked === i ? (i === STAGES[step].correct ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white') : i === STAGES[step].correct ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400')}>
                  {opt}
                </button>
              ))}
              {picked !== null && (
                <div className={'p-2 rounded-xl text-[11px] font-semibold border-2 ' + (picked === STAGES[step].correct ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800')}>
                  {STAGES[step].why[picked]}
                </div>
              )}
              {picked === STAGES[step].correct && (
                <button onClick={advance} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-gold-600 text-white hover:bg-gold-700 transition-colors">
                  Run this stage &gt;
                </button>
              )}
              <button onClick={() => setShowHint(!showHint)} className="w-full px-3 py-1.5 rounded-xl text-[11px] font-bold bg-amber-100 text-amber-800">
                {showHint ? 'Hide hint' : 'Need a hint?'}
              </button>
              {showHint && (
                <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
                  Ask: what is DIFFERENT about the thing we want out -- its size, its weight, or whether it has dissolved?
                </div>
              )}
            </>
          ) : (
            <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-300">
              <div className="text-sm font-black text-emerald-800">Factory complete!</div>
              <div className="text-[11px] text-emerald-700 mt-1">Mistakes: {mistakes}. The salt needed HEAT, because filtering can never catch something that is dissolved.</div>
            </div>
          )}
          <button onClick={reset} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Finish the whole factory with ZERO mistakes -- write down which difference (size, weight, settling, dissolved) each stage used.</li>
          <li>At the salt stage, pick "Filter it again" on purpose. Read why it fails -- this is the most common exam trick!</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceMethodsOfSeparationInEverydaySim };
export default C6_ScienceMethodsOfSeparationInEverydaySim;
