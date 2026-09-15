/**
 * C6 Science -- Separation of Substances
 *
 * One chapter concept: every separation method works because the parts
 * of a mixture DIFFER in some property. Handpicking uses size you can
 * see, winnowing uses weight in the wind, sieving uses particle size,
 * sedimentation uses heaviness in still water, evaporation beats
 * DISSOLVED substances with heat. No one method works on everything.
 *
 * Interaction model: a conveyor of 5 real mixtures feeds the machine.
 * Pick the method that separates each one -- the machine animates the
 * separation and reveals which property you used.
 */
import React, { useState } from 'react';

type Mixture = { name: string; methods: string[]; correct: number; property: string; why: string[] };

const MIXTURES: Mixture[] = [
  {
    name: 'Rice + small stones',
    methods: ['Winnowing', 'Handpicking', 'Evaporation', 'Sedimentation'],
    correct: 1,
    property: 'Different SIZE -- and you can SEE both parts',
    why: ['Winnowing blows away only the LIGHTER part; stones and rice weigh about the same.', 'Correct! The stones are big enough to see and pick out by hand.', 'Nothing is dissolved here -- heat would just cook the rice!', 'Both rice and stones sink -- settling cannot split them.'],
  },
  {
    name: 'Wheat grain + husk',
    methods: ['Handpicking', 'Evaporation', 'Winnowing', 'Filtration'],
    correct: 2,
    property: 'Different WEIGHT -- husk is feather-light',
    why: ['Thousands of grains -- nobody can handpick husk flakes one by one.', 'Nothing is dissolved -- there is nothing to evaporate.', 'Correct! Wind carries the light husk away; heavy grain drops straight down.', 'Filtration needs a liquid to flow through -- this mix is dry.'],
  },
  {
    name: 'Flour + wheat bran (coarse flakes)',
    methods: ['Sieving', 'Sedimentation', 'Winnowing', 'Decantation'],
    correct: 0,
    property: 'Different PARTICLE SIZE -- powder vs flakes',
    why: ['Correct! The sieve lets fine flour fall through and holds the bran flakes.', 'Dry flour does not settle in water -- and we would ruin it!', 'Flour and bran weigh almost the same -- the wind cannot choose.', 'Decanting pours off a LIQUID. Flour is dry.'],
  },
  {
    name: 'Muddy water',
    methods: ['Winnowing', 'Sieving', 'Sedimentation + decantation', 'Handpicking'],
    correct: 2,
    property: 'Mud is HEAVIER -- it sinks in still water',
    why: ['Winnowing works on dry husks in wind, not on water.', 'The mud grains are too fine for an ordinary sieve.', 'Correct! Let it stand: mud settles down, then you pour off the clearer top.', 'Mud grains are far too tiny to pick.'],
  },
  {
    name: 'Common salt dissolved in water',
    methods: ['Filtration', 'Winnowing', 'Handpicking', 'Evaporation'],
    correct: 3,
    property: 'Salt is DISSOLVED -- only heat can split them',
    why: ['The classic trap! Dissolved salt passes straight through any filter with the water.', 'Dissolved salt has no grains for the wind to blow.', 'The salt has vanished into the water -- there is nothing to pick.', 'Correct! Water escapes as vapour and salt crystals stay behind.'],
  },
];

function C6_ScienceSeparationOfSubstancesSim() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const m = MIXTURES[idx];
  const solved = picked === m.correct;
  const failed = picked !== null && !solved;
  const reset = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
  };
  const nextMixture = () => {
    setPicked(null);
    setIdx(idx + 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-indigo-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-indigo-700">Separation of substances -- the property machine</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        A separation method only works if it uses a <b>difference</b>: size, weight, settling, or boiling. Feed
        each mixture to the machine and choose its method. Wrong picks get an explanation, not a punishment!
      </p>

      <div className="grid md:grid-cols-[1fr_250px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#eef2ff" />
            <rect x="30" y="40" width="580" height="180" rx="16" fill="#ffffff" stroke="#a5b4fc" strokeWidth="3" />
            <text x="320" y="28" textAnchor="middle" fontSize="14" fontWeight="900" fill="#3730a3">Machine window: {m.name}</text>

            {idx === 0 && (
              <g style={{ transition: 'transform 0.8s ease' }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <circle key={i} cx={140 + i * 45} cy={185} r="7" fill="#d6b98c" />)}
                {[0, 1, 2].map((i) => (
                  <g key={i} style={{ transition: 'transform 0.8s ease ' + i * 0.12 + 's', transform: solved ? 'translate(0px,-60px)' : 'translate(0px,0px)' }}>
                    <polygon points={'' + (200 + i * 90) + ',168 ' + (222 + i * 90) + ',150 ' + (244 + i * 90) + ',172 ' + (222 + i * 90) + ',184'} fill="#78716c" />
                  </g>
                ))}
              </g>
            )}
            {idx === 1 && (
              <g>
                {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={180 + i * 70} cy={190} r="10" fill="#b45309" />)}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <g key={i} style={{ transition: 'transform 1s ease ' + i * 0.08 + 's', transform: solved ? 'translate(150px,-30px)' : 'translate(0px,0px)', opacity: solved ? 0.35 : 1 }}>
                    <ellipse cx={150 + i * 60} cy={150} rx="12" ry="4" fill="#e7e5e4" stroke="#d6d3d1" transform={'rotate(' + i * 30 + ' ' + (150 + i * 60) + ' 150)'} />
                  </g>
                ))}
                {solved && [0, 1, 2].map((i) => <path key={i} d={'M ' + (120 + i * 120) + ' 90 q 30 -18 60 0'} stroke="#94a3b8" strokeWidth="3" fill="none" opacity="0.6" />)}
              </g>
            )}
            {idx === 2 && (
              <g>
                <line x1="120" y1="140" x2="520" y2="140" stroke="#52525b" strokeWidth="5" />
                {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={180 + i * 70} cy="132" r="9" fill="#a8a29e" style={{ transition: 'opacity 0.5s' }} />)}
                {solved && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <circle key={'f' + i} cx={170 + i * 35} cy={solved ? 210 : 150} r="4" fill="#e7e5e4" style={{ transition: 'cy 0.9s ease ' + (i % 4) * 0.1 + 's' }} />
                ))}
              </g>
            )}
            {idx === 3 && (
              <g>
                <path d="M 220 60 L 220 210 L 420 210 L 420 60" stroke="#0891b2" strokeWidth="5" fill="none" />
                <rect x="222" y="100" width="196" height="108" fill="#bae6fd" opacity="0.6" />
                <rect x="222" y={solved ? 192 : 120} width="196" height={solved ? 16 : 88} fill="#92400e" opacity="0.8" style={{ transition: 'all 1.1s ease' }} />
              </g>
            )}
            {idx === 4 && (
              <g>
                <path d="M 240 140 L 240 220 L 400 220 L 400 140 Z" fill="#1e293b" />
                <rect x="242" y="170" width="156" height="48" fill="#fde68a" />
                {solved && [0, 1, 2].map((i) => (
                  <circle key={'s' + i} cx={290 + i * 30} cy={solved ? 90 - i * 18 : 160} r="10" fill="#e2e8f0" opacity="0.5" style={{ transition: 'cy 1s ease ' + i * 0.15 + 's' }} />
                ))}
                {[0, 1, 2, 3, 4].map((i) => <rect key={'c' + i} x={260 + i * 28} y="200" width="12" height="9" rx="2" fill="#ffffff" stroke="#cbd5e1" style={{ transition: 'opacity 0.5s' }} />)}
                {solved && <path d="M 470 200 q 15 -45 30 0 q -15 -14 -30 0" fill="#fb923c" />}
              </g>
            )}
            <text x="320" y="262" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#4338ca">
              {solved ? 'Separated! Property used: ' + m.property : failed ? 'That method cannot do it -- read why on the right.' : 'Mixture ' + (idx + 1) + ' of 5 loaded...'}
            </text>
          </svg>
        </div>

        <div className="space-y-2">
          <div className="p-2 rounded-xl bg-slate-100 text-center">
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold">First-try score</div>
            <div className="text-lg font-black text-indigo-700">{score} / 5</div>
          </div>
          {m.methods.map((meth, i) => (
            <button key={meth} onClick={() => { if (picked === null) { setPicked(i); if (i === m.correct) setScore(score + 1); } }} className={'w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ' + (picked === null ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : picked === i ? (solved ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white') : i === m.correct ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400')}>
              {meth}
            </button>
          ))}
          {picked !== null && (
            <div className={'p-2 rounded-xl text-[11px] font-semibold border-2 ' + (solved ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800')}>
              {m.why[picked]}
            </div>
          )}
          {solved && idx < MIXTURES.length - 1 && (
            <button onClick={nextMixture} className="w-full min-h-11 px-3 py-2 rounded-xl text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              Load next mixture &gt;
            </button>
          )}
          {solved && idx === MIXTURES.length - 1 && (
            <div className="p-2 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-[11px] font-bold text-emerald-800">
              All 5 separated! One machine, five DIFFERENT differences.
            </div>
          )}
          <button onClick={reset} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
        <div className="text-sm font-black text-rose-800">Misconception buster</div>
        <div className="text-xs text-rose-700 mt-0.5">
          "Filtering cleans everything." Load the salt-water mixture and try the filter -- the salt sails right through, because DISSOLVED things are not caught by holes. Only evaporation can un-dissolve them.
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Score 5/5 on first tries -- and for each mixture write its property word: size, weight, settling, or dissolved.</li>
          <li>Which TWO mixtures could both be cleaned with WATER involved? (Hint: think muddy water and salt water.)</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceSeparationOfSubstancesSim };
export default C6_ScienceSeparationOfSubstancesSim;
