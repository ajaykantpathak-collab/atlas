'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Everyday substances around you are acidic, basic or neutral. Scientists test them with ' +
  'indicators instead of tasting. Your job: sort each item into its family. Rub the item on red ' +
  'AND blue litmus in your mind: acids turn blue litmus red, bases turn red litmus blue, and ' +
  'neutrals leave both papers alone.';

type Item = { name: string; kind: 'acid' | 'base' | 'neutral'; fact: string };

const ITEMS: Item[] = [
  { name: 'Curd', kind: 'acid', fact: 'Curd tastes sour because it contains lactic acid.' },
  { name: 'Lime water', kind: 'base', fact: 'Lime water is calcium hydroxide dissolved in water -- a base.' },
  { name: 'Common salt solution', kind: 'neutral', fact: 'Salt solution is neutral -- litmus shows no change.' },
  { name: 'Tamarind', kind: 'acid', fact: 'Tamarind contains tartaric acid.' },
  { name: 'Soap', kind: 'base', fact: 'Soaps are made from bases; they feel slippery.' },
  { name: 'Sugar solution', kind: 'neutral', fact: 'Sugar dissolves but makes no acid or base -- neutral.' },
  { name: 'Baking soda', kind: 'base', fact: 'Baking soda is sodium bicarbonate, a mild base.' },
  { name: 'Orange juice', kind: 'acid', fact: 'Orange juice contains citric acid -- sour!' },
  { name: 'Distilled water', kind: 'neutral', fact: 'Pure water is the standard neutral substance.' },
];

const KIND_COLOR: Record<Item['kind'], string> = {
  acid: '#ef4444',
  base: '#3b82f6',
  neutral: '#22c55e',
};

export function C7_ScienceExploringSubstancesAcidicBasicNeutralSim() {
  const [queue, setQueue] = useState<Item[]>(() => [...ITEMS].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState<{ item: Item; correct: boolean }[]>([]);
  const [current, setCurrent] = useState<Item | null>(null);
  const [revealed, setRevealed] = useState(false);

  const score = useMemo(() => placed.filter((p) => p.correct).length, [placed]);
  const done = queue.length === 0 && !current;

  const pickItem = () => {
    if (current || queue.length === 0) return;
    setCurrent(queue[0]);
    setQueue((q) => q.slice(1));
    setRevealed(false);
  };

  const place = (k: Item['kind']) => {
    if (!current) return;
    const correct = k === current.kind;
    setPlaced((p) => [...p, { item: current, correct }]);
    setRevealed(true);
    setTimeout(() => {
      setCurrent(null);
      setRevealed(false);
    }, 1600);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Exploring Substances: Acidic, Basic, Neutral</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-slate-300">
          Sorted: <span className="font-bold">{placed.length}</span> of {ITEMS.length}
        </span>
        <span className="text-emerald-300 font-bold font-mono">
          Score: {score}/{placed.length || 0}
        </span>
      </div>

      {/* Current item */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 text-center">
        {current ? (
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-400">Test tube in hand</div>
            <div className="text-2xl font-black mt-1" style={{ transition: 'color 0.3s' }}>
              {current.name}
            </div>
            {revealed ? (
              <div className="mt-2">
                <div className="text-sm font-bold" style={{ color: KIND_COLOR[current.kind] }}>
                  It is {current.kind.toUpperCase()}!
                </div>
                <div className="text-xs text-slate-400 mt-1">{current.fact}</div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 mt-2">Which family does it belong to? Choose a bin below.</div>
            )}
          </div>
        ) : done ? (
          <div>
            <div className="text-xl font-black text-emerald-400">All sorted!</div>
            <div className="text-sm text-slate-300 mt-1">
              Final score: {score}/{ITEMS.length}. {score === ITEMS.length ? 'Indicator expert!' : 'Read the facts again and retry.'}
            </div>
            <button
              onClick={() => { setQueue([...ITEMS].sort(() => Math.random() - 0.5)); setPlaced([]); }}
              className="mt-3 px-5 py-2 rounded-xl text-sm font-bold border bg-gold-600 border-gold-400 hover:bg-gold-500"
            >
              Play again
            </button>
          </div>
        ) : (
          <button
            onClick={pickItem}
            className="px-6 py-3 rounded-2xl text-sm font-bold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500"
          >
            Pick the next substance ({queue.length} left)
          </button>
        )}
      </div>

      {/* Bins */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {(['acid', 'base', 'neutral'] as const).map((k) => {
          const count = placed.filter((p) => p.item.kind === k).length;
          return (
            <button
              key={k}
              disabled={!current || revealed}
              onClick={() => place(k)}
              className="p-3 rounded-2xl border bg-slate-800 hover:bg-slate-700 border-slate-600 disabled:opacity-50 text-center transition-colors"
            >
              <div className="text-lg font-black capitalize" style={{ color: KIND_COLOR[k] }}>
                {k}
              </div>
              <div className="text-[10px] text-slate-400">{count} inside</div>
            </button>
          );
        })}
      </div>

      {/* Placed history */}
      {placed.length > 0 && (
        <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Your sorting tray</div>
          <div className="flex flex-wrap gap-2">
            {placed.map((p, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${p.correct ? 'border-emerald-500 text-emerald-300' : 'border-pink-500 text-pink-300 line-through'}`}
              >
                {p.item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Get a full 9/9 in one round without a single wrong bin. Which pairs fooled you the most?</li>
          <li>Predict BEFORE revealing: for any wrong answer, say the litmus result you EXPECTED. Was your litmus rule wrong, or your fact?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceExploringSubstancesAcidicBasicNeutralSim;
