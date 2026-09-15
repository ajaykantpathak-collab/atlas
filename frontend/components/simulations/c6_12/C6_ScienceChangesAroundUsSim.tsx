/**
 * C6 Science -- Changes Around Us (Curiosity)
 *
 * One chapter concept: some changes can be undone (reversible -- ice
 * melting, clay shaping) and some cannot (irreversible -- paper
 * burning, fruit cutting). Predict first, then run the change!
 *
 * Interaction model: pick a material, pick an action, guess reversible
 * or irreversible, then watch the animated result and score your
 * prediction.
 */
import React, { useState } from 'react';

type Item = { id: string; name: string; emoji: string };
type Action = { id: string; name: string; emoji: string };
type Result = { outcome: string; emoji: string; reversible: boolean; why: string };

const ITEMS: Item[] = [
  { id: 'ice', name: 'Ice cube', emoji: '\u{1F9CA}' },
  { id: 'paper', name: 'Paper sheet', emoji: '\u{1F4C4}' },
  { id: 'clay', name: 'Wet clay', emoji: '\u{1FAE0}' },
  { id: 'choco', name: 'Chocolate bar', emoji: '\u{1F36B}' },
  { id: 'wood', name: 'Wooden stick', emoji: '\u{1F96F}' },
  { id: 'mango', name: 'Mango', emoji: '\u{1F96D}' },
];

const ACTIONS: Action[] = [
  { id: 'heat', name: 'Heat it', emoji: '\u{1F525}' },
  { id: 'bend', name: 'Bend / shape', emoji: '\u{1F913}' },
  { id: 'cut', name: 'Cut it', emoji: '\u{2702}\u{FE0F}' },
  { id: 'freeze', name: 'Freeze it', emoji: '\u{2744}\u{FE0F}' },
];

// outcome table: material x action
const RESULTS: Record<string, Record<string, Result>> = {
  ice: {
    heat: { outcome: 'melts into water', emoji: '\u{1F4A7}', reversible: true, why: 'Freeze the water again and the ice comes back -- reversible!' },
    bend: { outcome: 'cracks into pieces', emoji: '\u{1F9BE}', reversible: false, why: 'You cannot glue ice pieces back into one smooth cube.' },
    cut: { outcome: 'breaks into shards', emoji: '\u{1FA79}', reversible: false, why: 'Cut ice stays as separate pieces -- the change cannot be undone.' },
    freeze: { outcome: 'stays frozen ice', emoji: '\u{1F9CA}', reversible: true, why: 'Already ice; melting it and freezing again returns the same thing.' },
  },
  paper: {
    heat: { outcome: 'burns to ash', emoji: '\u{1F525}', reversible: false, why: 'Ash and smoke can never become paper again -- burning is irreversible.' },
    bend: { outcome: 'folds neatly', emoji: '\u{1F9E7}', reversible: true, why: 'Unfold it -- the same sheet returns. Folding is reversible!' },
    cut: { outcome: 'two smaller pieces', emoji: '\u{2702}\u{FE0F}', reversible: false, why: 'Two small sheets are not one big sheet anymore.' },
    freeze: { outcome: 'just a cold paper', emoji: '\u{1F4C4}', reversible: true, why: 'Warming it brings it back -- almost nothing changed.' },
  },
  clay: {
    heat: { outcome: 'hardens into pottery', emoji: '\u{1FAF5}', reversible: false, why: 'Baked clay can never become soft wet clay again.' },
    bend: { outcome: 'a new shape (pot, ball)', emoji: '\u{1F3D0}', reversible: true, why: 'Squash it flat and reshape -- soft clay changes are reversible.' },
    cut: { outcome: 'two clay lumps', emoji: '\u{1FAE0}', reversible: true, why: 'Press the lumps together and the clay becomes one lump again.' },
    freeze: { outcome: 'hard cold clay', emoji: '\u{1F9CA}', reversible: true, why: 'It warms back to soft clay -- reversible.' },
  },
  choco: {
    heat: { outcome: 'melts into goo', emoji: '\u{1F36B}', reversible: true, why: 'Keep the melted chocolate in the fridge -- it becomes solid again!' },
    bend: { outcome: 'snaps into pieces', emoji: '\u{1F941}', reversible: false, why: 'Chocolate bars snap; the pieces are not one bar anymore.' },
    cut: { outcome: 'small chocolate chunks', emoji: '\u{2702}\u{FE0F}', reversible: false, why: 'Cut pieces stay separate (eating them is even MORE irreversible!).' },
    freeze: { outcome: 'frozen hard bar', emoji: '\u{1F9CA}', reversible: true, why: 'It melts back to normal at room temperature.' },
  },
  wood: {
    heat: { outcome: 'burns to charcoal', emoji: '\u{1F525}', reversible: false, why: 'Charcoal and smoke can never become wood again.' },
    bend: { outcome: 'snaps or stays bent', emoji: '\u{1F96F}', reversible: false, why: 'Wood does not spring back like steel -- a new (broken) shape stays.' },
    cut: { outcome: 'sawdust + short sticks', emoji: '\u{2702}\u{FE0F}', reversible: false, why: 'You cannot sawdust a stick back together.' },
    freeze: { outcome: 'cold wood, unchanged', emoji: '\u{2744}\u{FE0F}', reversible: true, why: 'Freezing barely changes wood, so it can "un-change" easily.' },
  },
  mango: {
    heat: { outcome: 'cooks into pulp', emoji: '\u{1F32F}', reversible: false, why: 'Cooked mango pulp is a new substance -- irreversible.' },
    bend: { outcome: 'squishes into mush', emoji: '\u{1F95F}', reversible: false, why: 'Mushy mango will not un-squish!' },
    cut: { outcome: 'slices', emoji: '\u{1F34A}', reversible: false, why: 'Slices are separate pieces -- you cannot grow them back into one mango.' },
    freeze: { outcome: 'frozen mango', emoji: '\u{1F9CA}', reversible: true, why: 'Thaw it and you get (soft) mango again -- freezing is reversible.' },
  },
};

function C6_ScienceChangesAroundUsSim() {
  const [item, setItem] = useState<Item>(ITEMS[0]);
  const [action, setAction] = useState<Action>(ACTIONS[0]);
  const [guess, setGuess] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState({ right: 0, tried: 0 });

  const result = RESULTS[item.id][action.id];
  const correct = guess !== null && guess === result.reversible;

  const run = () => {
    setDone(true);
    if (guess !== null) setScore((s) => ({ right: s.right + (guess === result.reversible ? 1 : 0), tried: s.tried + 1 }));
  };

  const next = () => {
    const nextItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const nextAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    setItem(nextItem);
    setAction(nextAction);
    setGuess(null);
    setDone(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-orange-200 shadow-xl font-sans text-slate-800">
      <style>{'@keyframes morphIn { from { transform: scale(0.3) rotate(-20deg); opacity: 0; } to { transform: scale(1) rotate(0); opacity: 1; } } .morph { animation: morphIn 0.5s cubic-bezier(0.34,1.56,0.64,1); }'}</style>
      <h2 className="text-xl md:text-2xl font-black text-orange-700">Changes Around Us -- can it be undone?</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        A <b>reversible change</b> can be undone -- like ice melting back and forth. An <b>irreversible change</b>
        creates something new that cannot change back -- like paper burning to ash. Be a science detective:
        predict BEFORE you run the change!
      </p>

      <div className="grid md:grid-cols-[1fr_240px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/40 p-4 flex flex-col items-center justify-center min-h-[240px]">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{item.emoji}</span>
            <span className="text-2xl text-slate-400">+</span>
            <span className="text-5xl">{action.emoji}</span>
            {done && (
              <>
                <span className="text-2xl text-slate-400">=</span>
                <span key={result.outcome} className="text-6xl morph">{result.emoji}</span>
              </>
            )}
          </div>
          {done ? (
            <div className="mt-5 text-center max-w-sm">
              <div className={'inline-block px-4 py-1.5 rounded-full text-sm font-black ' + (result.reversible ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700')}>
                {result.reversible ? 'REVERSIBLE -- can be undone' : 'IRREVERSIBLE -- cannot be undone'}
              </div>
              <div className="text-xs text-slate-600 mt-2"><b>{item.name}</b> {result.outcome}. {result.why}</div>
              {guess !== null && (
                <div className={'mt-2 text-xs font-black ' + (correct ? 'text-emerald-600' : 'text-amber-600')}>
                  {correct ? 'Your prediction was right! Score +1' : 'Oops -- now you know the answer!'}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-5 text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your prediction</div>
              <div className="flex gap-2 mt-2 justify-center">
                <button onClick={() => setGuess(true)} className={'px-4 py-2 rounded-xl text-xs font-black transition-all ' + (guess === true ? 'bg-emerald-500 text-white scale-105' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200')}>
                  Reversible
                </button>
                <button onClick={() => setGuess(false)} className={'px-4 py-2 rounded-xl text-xs font-black transition-all ' + (guess === false ? 'bg-rose-500 text-white scale-105' : 'bg-rose-100 text-rose-700 hover:bg-rose-200')}>
                  Irreversible
                </button>
              </div>
              <button onClick={run} disabled={guess === null} className={'mt-3 px-6 py-2 rounded-full text-sm font-black transition-all ' + (guess === null ? 'bg-slate-200 text-slate-400' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md')}>
                Do the change!
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1. Pick material</div>
          <div className="grid grid-cols-2 gap-1.5">
            {ITEMS.map((it) => (
              <button key={it.id} onClick={() => { setItem(it); setGuess(null); setDone(false); }} className={'px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all ' + (item.id === it.id ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200')}>
                {it.emoji} {it.name}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2. Pick action</div>
          <div className="grid grid-cols-2 gap-1.5">
            {ACTIONS.map((a) => (
              <button key={a.id} onClick={() => { setAction(a); setGuess(null); setDone(false); }} className={'px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all ' + (action.id === a.id ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200')}>
                {a.emoji} {a.name}
              </button>
            ))}
          </div>
          <button onClick={next} className="w-full px-3 py-2 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold hover:bg-slate-200 transition-colors">
            Surprise me (random pair)
          </button>
          <div className="p-2 rounded-xl bg-sky-50 border-2 border-sky-200 text-[11px] text-sky-800 font-bold text-center">
            Score: {score.right}/{score.tried}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Find TWO different ways to change chocolate reversibly. What do both ways have in common? (Hint: think temperature.)</li>
          <li>Ice + "Bend" is irreversible, but clay + "Bend" is reversible. Try both -- what is different about the MATERIALS?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceChangesAroundUsSim };
export default C6_ScienceChangesAroundUsSim;
