'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Metals and non-metals behave differently. Metals are usually shiny (lustrous), can be hammered ' +
  'into sheets (malleable), drawn into wires (ductile), ring when struck (sonorous) and conduct ' +
  'electricity. Non-metals like sulphur and carbon are often dull and brittle, and do not conduct ' +
  '(except special ones like graphite!). Test each element and classify it yourself.';

type Element = { name: string; emoji: string; props: { lustrous: boolean; malleable: boolean; sonorous: boolean; conducts: boolean }; metal: boolean; note: string };

const ELEMENTS: Element[] = [
  { name: 'Iron', emoji: '🔩', props: { lustrous: true, malleable: true, sonorous: true, conducts: true }, metal: true, note: 'A classic metal: bridges, nails, rails.' },
  { name: 'Copper', emoji: '🥉', props: { lustrous: true, malleable: true, sonorous: true, conducts: true }, metal: true, note: 'Best friend of electricians -- excellent conductor.' },
  { name: 'Sulphur', emoji: '🍋', props: { lustrous: false, malleable: false, sonorous: false, conducts: false }, metal: false, note: 'Brittle yellow non-metal; dull and no conduction.' },
  { name: 'Carbon (graphite)', emoji: '✏️', props: { lustrous: false, malleable: false, sonorous: false, conducts: true }, metal: false, note: 'The famous EXCEPTION: a non-metal that conducts!' },
  { name: 'Aluminium', emoji: '🥤', props: { lustrous: true, malleable: true, sonorous: true, conducts: true }, metal: true, note: 'Light metal for foil and aircraft bodies.' },
];

const TESTS = [
  { id: 'lustrous', name: 'Shine check', yes: 'Shiny / lustrous', no: 'Dull', emoji: '✨' },
  { id: 'malleable', name: 'Hammer test', yes: 'Flattens into a sheet', no: 'Cracks into pieces', emoji: '🔨' },
  { id: 'sonorous', name: 'Strike test', yes: 'Rings loudly', no: 'Dull thud', emoji: '🔔' },
  { id: 'conducts', name: 'Circuit test', yes: 'Bulb glows', no: 'Bulb stays dark', emoji: '💡' },
] as const;

export function C7_ScienceTheWorldOfMetalsAndSim() {
  const [element, setElement] = useState<Element | null>(null);
  const [runTests, setRunTests] = useState<number[]>([]);
  const [verdict, setVerdict] = useState<{ name: string; correct: boolean }[]>([]);
  const [score, setScore] = useState(0);

  const fullResult = useMemo(() => {
    if (!element || runTests.length === 0) return null;
    const allYes = runTests.every((i) => element.props[TESTS[i].id]);
    return { observed: runTests.length === 4 && allYes ? 'ALL four tests positive' : `${allYes ? 'no' : 'Some'} negatives in ${runTests.length} test(s) run`, isMetal: allYes };
  }, [element, runTests]);

  const runTest = (i: number) => {
    if (!element) return;
    setRunTests((r) => (r.includes(i) ? r : [...r, i]));
  };

  const classify = (guessIsMetal: boolean) => {
    if (!element) return;
    const correct = guessIsMetal === element.metal;
    if (correct) setScore((s) => s + 1);
    setVerdict((v) => [...v, { name: element.name, correct }]);
    setElement(null);
    setRunTests([]);
  };

  const queue = ELEMENTS.filter((e) => !verdict.some((v) => v.name === e.name));

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">The World of Metals and Non-Metals</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Sample tray */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-xs text-slate-400">Samples left: {queue.length}</span>
        {element === null && queue.length > 0 ? (
          queue.map((e) => (
            <button
              key={e.name}
              onClick={() => { setElement(e); setRunTests([]); }}
              className="px-3 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
            >
              {e.emoji} {e.name}
            </button>
          ))
        ) : null}
        {queue.length === 0 && (
          <button
            onClick={() => { setVerdict([]); setScore(0); }}
            className="px-5 py-2 rounded-xl text-sm font-bold border bg-indigo-600 border-indigo-400 hover:bg-indigo-500"
          >
            Play again (score {score}/{ELEMENTS.length})
          </button>
        )}
      </div>

      {/* Lab bench */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        {element ? (
          <div>
            <div className="text-lg font-black">
              {element.emoji} Testing: <span className="text-sky-300">{element.name}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {TESTS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => runTest(i)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-colors ${
                    runTests.includes(i) ? 'bg-slate-800 border-sky-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xl">{t.emoji}</div>
                  {t.name}
                  {runTests.includes(i) && (
                    <div className={`mt-2 text-[11px] font-bold ${element.props[t.id] ? 'text-emerald-300' : 'text-pink-300'}`}>
                      {element.props[t.id] ? t.yes : t.no}
                    </div>
                  )}
                </button>
              ))}
            </div>
            {runTests.length > 0 && (
              <div className="mt-3 text-sm text-slate-300">
                Evidence so far: <span className="font-mono font-bold text-amber-300">{fullResult!.observed}</span> (based on the tests you have run)
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={() => classify(true)} className="px-5 py-2 rounded-xl text-sm font-bold border bg-rose-600 border-rose-400 hover:bg-rose-500">
                It is a METAL
              </button>
              <button onClick={() => classify(false)} className="px-5 py-2 rounded-xl text-sm font-bold border bg-sky-600 border-sky-400 hover:bg-sky-500">
                It is a NON-METAL
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-6">Pick a sample from the tray, run all four tests, then classify it.</p>
        )}
      </div>

      {/* Verdicts */}
      {verdict.length > 0 && (
        <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Lab notebook</div>
          <div className="flex flex-wrap gap-2">
            {verdict.map((v, i) => {
              const el = ELEMENTS.find((e) => e.name === v.name)!;
              return (
                <span key={i} className={`px-3 py-1.5 rounded-xl text-xs border ${v.correct ? 'border-emerald-500 text-emerald-300' : 'border-pink-500 text-pink-300'}`} title={el.note}>
                  {el.emoji} {v.name}: {el.metal ? 'metal' : 'non-metal'} {v.correct ? 'OK' : '(missed)'}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Test carbon (graphite) carefully. Three tests look like a non-metal -- why does one glowing bulb surprise scientists?</li>
          <li>Score 5/5 by running ALL FOUR tests before classifying. Which single test would you trust alone, and why might that fail?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceTheWorldOfMetalsAndSim;
