/**
 * C6 Science -- Food: Where Does it Come From?
 *
 * One chapter concept: every food comes from plants or animals. Plant
 * foods are different PARTS of the plant -- root (carrot), stem
 * (potato), leaf (spinach), flower (cauliflower), fruit (mango) or
 * seed (rice) -- not just fruits. Animal foods start as milk, eggs or
 * nectar, which we turn into butter, curd and honey.
 *
 * Interaction model: pick a food chip, guess which plant part it is,
 * and that part lights up on the plant. Switch to the animal board to
 * trace animal foods back to their source.
 */
import React, { useState } from 'react';

type Part = 'root' | 'stem' | 'leaf' | 'flower' | 'fruit' | 'seed';

const PLANT_FOODS: { name: string; part: Part; color: string }[] = [
  { name: 'Rice', part: 'seed', color: '#e5e7eb' },
  { name: 'Groundnut', part: 'seed', color: '#d6b98c' },
  { name: 'Carrot', part: 'root', color: '#f97316' },
  { name: 'Radish', part: 'root', color: '#fbcfe8' },
  { name: 'Potato', part: 'stem', color: '#d9c9a3' },
  { name: 'Sugarcane', part: 'stem', color: '#a3e635' },
  { name: 'Spinach', part: 'leaf', color: '#16a34a' },
  { name: 'Cabbage', part: 'leaf', color: '#86efac' },
  { name: 'Cauliflower', part: 'flower', color: '#f5f5f4' },
  { name: 'Mango', part: 'fruit', color: '#fbbf24' },
  { name: 'Tomato', part: 'fruit', color: '#ef4444' },
];

const ANIMAL_FOODS: { name: string; source: string; story: string }[] = [
  { name: 'Milk', source: 'Cow / buffalo', story: 'Milked from the animal -- drink it or turn it into curd, paneer, butter.' },
  { name: 'Eggs', source: 'Hen / duck', story: 'Laid by the bird. We eat the eggs, not the bird.' },
  { name: 'Honey', source: 'Nectar from flowers', story: 'Bees sip nectar (sweet juice) deep inside flowers, then store it as honey.' },
  { name: 'Curd', source: 'Milk', story: 'Milk + friendly bacteria = curd. An animal food turned by tiny living things.' },
];

const PART_LABEL: Record<Part, string> = {
  root: 'Root', stem: 'Stem', leaf: 'Leaf', flower: 'Flower', fruit: 'Fruit', seed: 'Seed',
};

function C6_ScienceFoodWhereDoesItComeSim() {
  const [mode, setMode] = useState<'plant' | 'animal'>('plant');
  const [food, setFood] = useState<string>('Carrot');
  const [guess, setGuess] = useState<Part | null>(null);
  const [score, setScore] = useState({ right: 0, tried: 0 });

  const current = PLANT_FOODS.find((f) => f.name === food) || PLANT_FOODS[0];
  const answered = guess !== null;
  const correct = answered && guess === current.part;

  const reset = () => {
    setFood('Carrot');
    setGuess(null);
    setScore({ right: 0, tried: 0 });
  };

  const lit = (p: Part): string => {
    if (!answered || p !== current.part) return '#cbd5e1';
    return correct ? '#22c55e' : '#f43f5e';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-lime-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-lime-700">Food: where does it come from?</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Every bite traces back to a <b>plant</b> or an <b>animal</b>. And plants feed us from every part --
        root, stem, leaf, flower, fruit AND seed. Pick a food and guess its secret part!
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        <button onClick={() => setMode('plant')} className={'px-4 py-2 rounded-xl text-xs font-black transition-colors ' + (mode === 'plant' ? 'bg-lime-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')}>
          Plant part board
        </button>
        <button onClick={() => setMode('animal')} className={'px-4 py-2 rounded-xl text-xs font-black transition-colors ' + (mode === 'animal' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')}>
          Animal food board
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
          Reset
        </button>
      </div>

      {mode === 'plant' ? (
        <div className="grid md:grid-cols-[1fr_250px] gap-4 mt-4">
          <div className="rounded-2xl border-2 border-lime-100 bg-lime-50/40 overflow-hidden">
            <svg viewBox="0 0 620 320" className="w-full">
              <rect width="620" height="320" fill="#f7fee7" />
              <rect x="0" y="240" width="620" height="80" fill="#a16207" opacity="0.35" />
              {/* roots */}
              <g stroke={lit('root')} strokeWidth="7" fill="none" strokeLinecap="round" style={{ transition: 'stroke 0.3s' }}>
                <path d="M 310 245 L 280 300" />
                <path d="M 310 245 L 310 305" />
                <path d="M 310 245 L 345 295" />
              </g>
              {/* stem */}
              <path d="M 310 245 L 310 110" stroke={lit('stem')} strokeWidth="9" strokeLinecap="round" style={{ transition: 'stroke 0.3s' }} />
              {/* leaves */}
              <ellipse cx="255" cy="170" rx="48" ry="20" fill={lit('leaf')} transform="rotate(-20 255 170)" style={{ transition: 'fill 0.3s' }} />
              <ellipse cx="365" cy="140" rx="48" ry="20" fill={lit('leaf')} transform="rotate(20 365 140)" style={{ transition: 'fill 0.3s' }} />
              {/* flower */}
              <g style={{ transition: 'opacity 0.3s' }} opacity={answered && current.part === 'flower' ? 1 : 0.55}>
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <ellipse key={a} cx={310 + 22 * Math.cos((a * Math.PI) / 180)} cy={85 + 16 * Math.sin((a * Math.PI) / 180)} rx="14" ry="9" fill={answered && current.part === 'flower' ? lit('flower') : '#f9a8d4'} transform={'rotate(' + a + ' 310 85)'} />
                ))}
                <circle cx="310" cy="85" r="9" fill="#f59e0b" />
              </g>
              {/* fruit */}
              <circle cx="382" cy="196" r="26" fill={lit('fruit')} style={{ transition: 'fill 0.3s' }} />
              <text x="382" y="240" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4d7c0f">fruit</text>
              {/* seeds */}
              <g style={{ transition: 'opacity 0.3s' }} opacity={answered && current.part === 'seed' ? 1 : 0.5}>
                <circle cx="228" cy="238" r="7" fill={lit('seed')} />
                <circle cx="245" cy="230" r="7" fill={lit('seed')} />
                <circle cx="240" cy="248" r="7" fill={lit('seed')} />
                <text x="236" y="272" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4d7c0f">seeds</text>
              </g>
              <text x="310" y="36" textAnchor="middle" fontSize="17" fontWeight="900" fill="#3f6212">
                {answered ? current.name + ' = ' + PART_LABEL[current.part].toUpperCase() + (correct ? ' -- correct!' : ' -- look again!') : 'Which part of the plant is ' + current.name + '?'}
              </text>
            </svg>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-lime-600 text-white">
              <div className="text-xs uppercase tracking-widest opacity-80">Mystery food</div>
              <div className="text-2xl font-black">{current.name}</div>
              <div className="text-xs mt-1">Score: {score.right} of {score.tried} correct</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Pick a food</div>
              <div className="flex flex-wrap gap-1.5">
                {PLANT_FOODS.map((f) => (
                  <button key={f.name} onClick={() => { setFood(f.name); setGuess(null); }} className={'px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors ' + (f.name === food ? 'bg-lime-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Your guess</div>
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(PART_LABEL) as Part[]).map((p) => (
                  <button key={p} onClick={() => { if (!answered) { setGuess(p); setScore({ right: score.right + (p === current.part ? 1 : 0), tried: score.tried + 1 }); } }} className={'px-2 py-1.5 rounded-lg text-[11px] font-black transition-colors ' + (answered && p === current.part ? 'bg-emerald-500 text-white' : answered && p === guess ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                    {PART_LABEL[p]}
                  </button>
                ))}
              </div>
            </div>
            {answered && !correct && (
              <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
                {current.name} is the {PART_LABEL[current.part].toLowerCase()} of the plant. Try the next one!
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {ANIMAL_FOODS.map((a) => (
            <div key={a.name} className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
              <div className="text-sm font-black text-amber-800">{a.name} &lt;- {a.source}</div>
              <div className="text-xs text-amber-700 mt-1">{a.story}</div>
            </div>
          ))}
          <div className="p-3 rounded-2xl bg-sky-50 border-2 border-sky-200 md:col-span-2">
            <div className="text-sm font-black text-sky-800">Spot the plant eater connection</div>
            <div className="text-xs text-sky-700 mt-1">
              Bees need flowers, hens need grain, cows need grass -- so even ANIMAL foods secretly start from plants!
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
        <div className="text-sm font-black text-rose-800">Misconception buster</div>
        <div className="text-xs text-rose-700 mt-0.5">
          We do NOT eat only fruits and seeds. Spinach is a leaf, carrot is a root, potato is an underground stem, and cauliflower is a bundle of flowers!
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Find TWO foods that are roots and TWO that are stems -- guess all four without a mistake.</li>
          <li>On the animal board, trace honey backwards: flower &gt; ? &gt; honey. Which food on the plant board do the bees depend on?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceFoodWhereDoesItComeSim };
export default C6_ScienceFoodWhereDoesItComeSim;
