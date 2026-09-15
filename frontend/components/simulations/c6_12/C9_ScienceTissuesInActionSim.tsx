'use client';

import React, { useMemo, useState } from 'react';

interface TQ { q: string; options: string[]; correct: number; group: 'plant' | 'animal'; fact: string; hue: number }

const QUESTIONS: TQ[] = [
  { q: 'Which tissue carries water and minerals upward from the roots?', options: ['Phloem', 'Xylem', 'Parenchyma', 'Cambium'], correct: 1, group: 'plant', hue: 0,
    fact: 'Xylem vessels are hollow, lignified tubes that conduct water upward and also give wood its strength.' },
  { q: 'Which tissue transports food made in the leaves to the rest of the plant?', options: ['Xylem', 'Epidermis', 'Phloem', 'Sclerenchyma'], correct: 2, group: 'plant', hue: 120,
    fact: 'Phloem is made of living cells (sieve tubes + companion cells) and moves sucrose in every direction.' },
  { q: 'Root tips keep growing for years. Which tissue makes this possible?', options: ['Meristematic tissue', 'Permanent tissue', 'Ground tissue', 'Protective tissue'], correct: 0, group: 'plant', hue: 45,
    fact: 'Meristematic cells divide again and again; later they differentiate into permanent tissues.' },
  { q: 'Your skin and the lining of your mouth are made of which animal tissue?', options: ['Connective', 'Muscular', 'Nervous', 'Epithelial'], correct: 3, group: 'animal', hue: 200,
    fact: 'Epithelial tissue packs tightly to cover and protect surfaces, and it is usually not supplied by blood vessels.' },
  { q: 'Which tissue contracts to move bones and organs?', options: ['Muscular', 'Connective', 'Blood', 'Cartilage'], correct: 0, group: 'animal', hue: 340,
    fact: 'Muscle cells are elongated and contract; voluntary muscles attach to bones, involuntary ones line the gut.' },
  { q: 'Blood and bone belong to the same animal tissue family. Which one?', options: ['Nervous', 'Connective', 'Epithelial', 'Muscular'], correct: 1, group: 'animal', hue: 260,
    fact: 'Connective tissue links and supports: its cells sit in a matrix - liquid in blood, hard in bone.' },
  { q: 'Which tissue receives, carries and delivers signals as electrical impulses?', options: ['Nervous tissue', 'Areolar tissue', 'Phloem', 'Adipose tissue'], correct: 0, group: 'animal', hue: 285,
    fact: 'A neuron has a cell body, dendrites to receive signals, and a long axon to pass them on.' },
];

// ─── MAIN COMPONENT ───
export function C9_ScienceTissuesInActionSim() {
  const [group, setGroup] = useState<'all' | 'plant' | 'animal'>('all');
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState(-1);
  const [score, setScore] = useState({ right: 0, tries: 0 });

  const deck = useMemo(() => QUESTIONS.filter((q) => group === 'all' || q.group === group), [group]);
  const q = deck[Math.min(qIdx, deck.length - 1)];
  const answered = picked >= 0;
  const correct = answered && picked === q.correct;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setScore((s) => ({ right: s.right + (i === q.correct ? 1 : 0), tries: s.tries + 1 }));
  };

  const next = () => { setPicked(-1); setQIdx((i) => (i + 1) % deck.length); };
  const switchGroup = (g: 'all' | 'plant' | 'animal') => { setGroup(g); setPicked(-1); setQIdx(0); };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">CBSE Class 9 Science - Tissues</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Tissues in Action: Match the Job to the Tissue</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">
          Score {score.right}/{score.tries}
        </span>
      </header>

      {/* GROUP TABS */}
      <div className="flex gap-2 mb-4">
        {(['all', 'plant', 'animal'] as const).map((g) => (
          <button key={g} onClick={() => switchGroup(g)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              group === g ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800'}`}>
            {g === 'all' ? 'Mixed (all tissues)' : g === 'plant' ? 'Plant tissues' : 'Animal tissues'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* TISSUE MAP */}
        <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 300 260" className="w-full h-52 md:h-60">
            {q.group === 'plant' ? (
              <g>
                {/* stem bundle: ring of vascular tissue */}
                <circle cx="150" cy="120" r="90" fill="none" stroke="#3f3f46" strokeWidth="16" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const a = (deg * Math.PI) / 180;
                  const isXylem = q.correct === 0;
                  const isPhloem = q.correct === 1;
                  const isMeristem = q.correct === 2;
                  return (
                    <g key={deg}>
                      {isXylem && <circle cx={150 + 90 * Math.cos(a)} cy={120 + 90 * Math.sin(a)} r="9" fill="#ef4444" />}
                      {isPhloem && <circle cx={150 + 62 * Math.cos(a)} cy={120 + 62 * Math.sin(a)} r="7" fill="#22c55e" />}
                      {isMeristem && <circle cx="150" cy="34" r="11" fill="#eab308" />}
                    </g>
                  );
                })}
                <text x="150" y="126" fontSize="11" fill="#e4e4e7" textAnchor="middle" fontWeight="bold">stem</text>
                <text x="150" y="248" fontSize="10" fill="#a1a1aa" textAnchor="middle">
                  {q.correct === 0 ? 'red: xylem ring, water highway' : q.correct === 1 ? 'green: phloem, food highway' : 'yellow: meristem at the growth tip'}
                </text>
              </g>
            ) : (
              <g>
                {/* animal tissue cells */}
                {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => {
                  const hot = (q.correct === 3 && r === 0) || (q.correct === 0 && r === 2) || (q.correct === 1 && r === 3) || (q.correct === 6 && r === 1);
                  return (
                    <rect key={`${r}-${c}`} x={40 + c * 58} y={40 + r * 48} width="46" height="38" rx="9"
                      fill={hot ? `hsl(${q.hue},80%,55%)` : '#27272a'} stroke="#52525b" />
                  );
                }))}
                <text x="150" y="248" fontSize="10" fill="#a1a1aa" textAnchor="middle">
                  the highlighted layer is doing the job in the question
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* QUIZ */}
        <div className="md:col-span-3 space-y-3">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Question {qIdx + 1} of {deck.length} - {q.group} tissue
              </span>
              <div className="flex gap-1">
                {deck.map((_, i) => (
                  <div key={i} className={`h-1.5 w-4 rounded-full ${i === qIdx ? 'bg-indigo-500' : i < qIdx ? 'bg-indigo-800' : 'bg-slate-800'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm font-bold text-white">{q.q}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => pick(i)} disabled={answered}
                  className={`p-3 text-left text-xs font-semibold rounded-xl border transition-all ${
                    !answered ? 'bg-slate-950 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-indigo-500'
                    : i === q.correct ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300'
                    : i === picked ? 'bg-rose-950/70 border-rose-700 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                  {opt}
                </button>
              ))}
            </div>
            {answered && (
              <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed border ${correct ? 'bg-emerald-950/50 border-emerald-700 text-emerald-200' : 'bg-amber-950/40 border-amber-700 text-amber-200'}`}>
                <span className="font-bold">{correct ? 'Correct. ' : 'Not quite. '}</span>{q.fact}
              </div>
            )}
            <div className="flex gap-2 mt-3">
              <button onClick={next} disabled={!answered} className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold disabled:opacity-40">
                Next question
              </button>
              <button onClick={() => { switchGroup(group); setScore({ right: 0, tries: 0 }); }}
                className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold">
                Restart deck
              </button>
            </div>
          </div>
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            Plants group cells by job: meristems for growth, xylem/phloem for transport, epidermis for protection, ground tissue for
            filling and support. Animals specialise further: epithelial covers, connective binds, muscular moves, nervous signals.
          </div>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-indigo-300">Big idea:</span> a tissue is a group of similar cells doing one job. Structure predicts
          function everywhere: hollow lignified xylem vessels carry water, sieve-tube phloem carries food, tightly packed epithelium
          protects, long muscle cells contract, and branched neurons signal. Plants can keep growing because meristems never stop dividing.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Finish the plant deck without a wrong answer, then say why xylem cells are dead at maturity but phloem cells stay alive.</p>
        <p className="mt-1">2. Switch to animal tissues and name the tissue family for blood, bone, and fat before pressing their cards.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceTissuesInActionSim;
