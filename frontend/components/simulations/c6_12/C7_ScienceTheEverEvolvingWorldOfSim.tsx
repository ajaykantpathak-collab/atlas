'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Science is never final. Again and again, careful EVIDENCE has replaced an old idea with a ' +
  'better one: Earth was thought flat, then shown to be round; the Sun was thought to go around ' +
  'Earth, until we understood Earth goes around the Sun. New tools (telescopes, microscopes, ' +
  'satellites) keep opening new windows -- and every new discovery invites new questions.';

const TIMELINE = [
  {
    year: 'About 500 BCE',
    idea: 'The Earth is a flat disc',
    changed: 'Ships disappearing hull-first, and Earth\'s round shadow on the Moon during eclipses.',
    now: 'The Earth is a sphere (measured beautifully by Eratosthenes around 240 BCE).',
    emoji: '🌍',
  },
  {
    year: 'Until 1543',
    idea: 'Sun and planets circle the Earth (geocentric model)',
    changed: 'Telescopic observations (Galileo, 1610): moons orbit Jupiter -- not everything circles Earth!',
    now: 'Earth and planets orbit the Sun (heliocentric model).',
    emoji: '☀️',
  },
  {
    year: 'Until 1670s',
    idea: 'Living things appear on their own from mud and rotting food (spontaneous generation)',
    changed: 'Pasteur\'s swan-neck flask experiment: boiled broth stayed free of life until exposed to dust.',
    now: 'Life comes only from existing life (biogenesis).',
    emoji: '🧫',
  },
  {
    year: 'Until 1953',
    idea: 'Nobody knew how parents pass traits to children',
    changed: 'X-ray images (Franklin) and model building (Watson & Crick) revealed the DNA double helix.',
    now: 'DNA is the instruction manual of inheritance -- the story continues today.',
    emoji: '🧬',
  },
];

export function C7_ScienceTheEverEvolvingWorldOfSim() {
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState<'old' | 'evidence' | 'new'>('old');

  const t = TIMELINE[stage];

  const content = useMemo(() => {
    if (phase === 'old') return { label: 'What people believed', text: t.idea, color: 'text-amber-300' };
    if (phase === 'evidence') return { label: 'The evidence that shook it', text: t.changed, color: 'text-pink-300' };
    return { label: 'What science says today', text: t.now, color: 'text-emerald-300' };
  }, [phase, t]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">The Ever-Evolving World of Science</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Timeline strip */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          {TIMELINE.map((m, i) => (
            <button
              key={m.year}
              onClick={() => { setStage(i); setPhase('old'); }}
              className={`flex-1 text-center transition-all ${stage === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div
                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 ${
                  stage === i ? 'bg-indigo-600 border-indigo-300 scale-110' : 'bg-slate-800 border-slate-600'
                }`}
                style={{ transition: 'all 0.25s' }}
              >
                {m.emoji}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 leading-tight">{m.year}</div>
            </button>
          ))}
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-amber-500 via-pink-500 to-emerald-500 rounded-full"
            style={{ width: phase === 'old' ? '33%' : phase === 'evidence' ? '66%' : '100%', transition: 'width 0.3s' }}
          />
        </div>
      </div>

      {/* Story card */}
      <div className="mt-4 p-5 bg-slate-800 rounded-2xl border border-slate-600 min-h-[130px]">
        <div className="text-xs uppercase tracking-wider text-slate-400">{content.label}</div>
        <p className={`mt-2 text-lg font-semibold ${content.color}`}>{content.text}</p>
      </div>

      {/* Phase controls */}
      <div className="flex flex-wrap gap-2 mt-4">
        {(['old' as const, 'evidence' as const, 'new' as const]).map((p, i) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${phase === p ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {i + 1}. {p === 'old' ? 'Old belief' : p === 'evidence' ? 'New evidence' : 'Today'}
          </button>
        ))}
        <button
          onClick={() => setPhase((p) => (p === 'old' ? 'evidence' : p === 'evidence' ? 'new' : 'old'))}
          className="px-4 py-2 rounded-xl text-sm font-bold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500 ml-auto"
        >
          Next chapter of the story
        </button>
      </div>

      {/* Thinking corner */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Thinking corner: how does science move forward?</div>
        <div className="flex flex-wrap gap-2">
          {['Question', 'Guess (hypothesis)', 'Test with evidence', 'Better answer'].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${(['old','evidence','new'].indexOf(phase) + 1) * (4/3) > i ? 'bg-emerald-800 border-emerald-500' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>
                {i + 1}. {s}
              </span>
              {i < 3 && <span className="text-slate-500">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Pick any story and retell it in reverse: from Today back to the Old belief. Which step (belief, evidence, today) is the hardest to UNDO?</li>
          <li>Think of one thing you believe about food, weather or space. Design a 3-step test that could prove you wrong -- that is real scientific thinking!</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceTheEverEvolvingWorldOfSim;
