'use client';

import React, { useMemo, useState } from 'react';

// ─── SEPARATION LAB DATA ───
const TECHNIQUES = [
  { id: 'filtration', label: 'Filtration', note: 'traps an insoluble solid while the liquid passes through' },
  { id: 'evaporation', label: 'Evaporation', note: 'liquid leaves as vapour, dissolved solid stays behind' },
  { id: 'distillation', label: 'Distillation', note: 'boils off the liquid and condenses it back - both parts recovered' },
  { id: 'magnet', label: 'Magnetic separation', note: 'a magnet pulls out magnetic material' },
  { id: 'funnel', label: 'Separating funnel', note: 'drains the heavier immiscible liquid from below' },
  { id: 'sublimation', label: 'Sublimation', note: 'one solid turns straight to vapour, the other is left behind' },
  { id: 'winnowing', label: 'Winnowing', note: 'wind carries the lighter component further than the heavier one' },
  { id: 'decantation', label: 'Decantation', note: 'liquid is poured off after the solid has settled' },
];

const MIXTURES = [
  { name: 'Common salt dissolved in water', a: 'salt', b: 'water', kind: 'solution', accept: ['evaporation', 'distillation'],
    why: 'Salt dissolves, so a filter cannot catch it. Heating drives the water off (or distil to keep the water too).', sep: ['salt crystals left in the dish', 'water gone as vapour'] },
  { name: 'Sand mixed in water', a: 'sand', b: 'water', kind: 'solid-liquid', accept: ['filtration', 'decantation'],
    why: 'Sand is insoluble and heavy. A filter catches the grains, or let it settle and pour off clear water.', sep: ['sand caught as residue', 'clear water collected below'] },
  { name: 'Iron filings + sulphur powder', a: 'iron', b: 'sulphur', kind: 'solid-solid', accept: ['magnet'],
    why: 'Only iron is magnetic, so a magnet pulls the filings out and leaves the yellow sulphur.', sep: ['iron filings cling to the magnet', 'sulphur powder remains'] },
  { name: 'Oil mixed with water', a: 'oil', b: 'water', kind: 'immiscible', accept: ['funnel'],
    why: 'The liquids do not mix and form layers. The tap of a separating funnel drains the denser water first.', sep: ['water tapped out from below', 'oil layer left on top'] },
  { name: 'Camphor + common salt', a: 'camphor', b: 'salt', kind: 'sublime', accept: ['sublimation'],
    why: 'Camphor turns directly into vapour on warming; salt stays in the dish and the camphor vapour cools back to crystals.', sep: ['camphor crystals on the cool funnel', 'salt remains in the dish'] },
  { name: 'Wheat grain + husk', a: 'grain', b: 'husk', kind: 'wind', accept: ['winnowing'],
    why: 'Husk is much lighter, so a gust of wind carries it further while the heavy grain drops straight down.', sep: ['husk blown into a distant pile', 'grain collected close by'] },
];

// deterministic scatter of component dots inside the beaker
function dotGrid(seed: number, count: number, cls: string) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const x = (i * 53 + seed * 17) % 88 + 4;
    const y = (i * 37 + seed * 29) % 78 + 6;
    dots.push(<span key={i} className={`absolute w-2 h-2 rounded-full ${cls}`} style={{ left: `${x}%`, top: `${y}%` }} />);
  }
  return dots;
}

// ─── MAIN COMPONENT ───
export function C9_ScienceExploringMixturesAndTheirSeparationSim() {
  const [mixIdx, setMixIdx] = useState(0);
  const [answered, setAnswered] = useState<Record<number, string>>({});
  const [score, setScore] = useState({ right: 0, tries: 0 });
  const [flash, setFlash] = useState<{ ok: boolean; text: string } | null>(null);

  const mix = MIXTURES[mixIdx];
  const chosen = answered[mixIdx];
  const solved = chosen !== undefined && mix.accept.includes(chosen);

  const pickTechnique = (id: string) => {
    if (chosen !== undefined) return;
    const ok = mix.accept.includes(id);
    setAnswered((prev) => ({ ...prev, [mixIdx]: id }));
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), tries: s.tries + 1 }));
    const note = TECHNIQUES.find((t) => t.id === id)!.note;
    setFlash({ ok, text: ok ? `Correct! ${mix.why}` : `${note} - but that does not fit this mixture. ${mix.why}` });
  };

  const jump = (i: number) => {
    setMixIdx(i);
    setFlash(null);
  };

  const beaker = useMemo(() => {
    if (solved) return null;
    if (mix.kind === 'solution') {
      return <div className="absolute inset-2 rounded-lg bg-gold-900/70" />;
    }
    return (
      <>
        {dotGrid(mixIdx, 26, mix.kind === 'wind' ? 'bg-amber-300' : mix.kind === 'sublime' ? 'bg-pink-300' : mix.kind === 'solid-solid' ? 'bg-slate-300' : 'bg-amber-700')}
        {dotGrid(mixIdx + 3, 14, mix.kind === 'immiscible' ? 'bg-yellow-400/80' : mix.kind === 'solid-liquid' ? 'bg-gold-400/70' : mix.kind === 'wind' ? 'bg-stone-400' : 'bg-rose-400')}
      </>
    );
  }, [mixIdx, mix, solved]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 9 Science - Is Matter Around Us Pure</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Exploring Mixtures and their Separation</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">
          Solved {score.right}/{score.tries}
        </span>
      </header>

      {/* MIXTURE PICKER */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MIXTURES.map((m, i) => {
          const done = answered[i] !== undefined && m.accept.includes(answered[i]);
          return (
            <button key={i} onClick={() => jump(i)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                i === mixIdx ? 'bg-gold-600 text-white border-gold-500'
                : done ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}>
              {done ? '[done] ' : ''}{m.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* BEAKER VISUAL */}
        <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4">
          <p className="text-xs font-bold text-slate-300 mb-2 min-h-[2.5rem]">{mix.name}</p>
          <div className="relative mx-auto w-44 h-52 border-4 border-slate-600 rounded-b-3xl rounded-t-lg overflow-hidden bg-slate-800">
            {solved ? (
              <>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gold-900/80 flex items-center justify-center">
                  <span className="text-[10px] text-gold-200 font-bold text-center px-1">{mix.sep[0]}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gold-800/80 flex items-center justify-center">
                  <span className="text-[10px] text-gold-200 font-bold text-center px-1">{mix.sep[1]}</span>
                </div>
              </>
            ) : beaker}
          </div>
          <p className="text-center text-[10px] text-slate-500 mt-2">
            {solved ? 'Mixture separated by ' + TECHNIQUES.find((t) => t.id === chosen)!.label : 'Pick the technique that separates this mixture.'}
          </p>
        </div>

        {/* TECHNIQUE BUTTONS + FEEDBACK */}
        <div className="md:col-span-3 space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {TECHNIQUES.map((t) => {
              const pickedHere = chosen === t.id;
              const isRightPick = chosen !== undefined && mix.accept.includes(t.id);
              return (
                <button key={t.id} onClick={() => pickTechnique(t.id)} disabled={chosen !== undefined}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                    chosen === undefined ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-gold-600'
                    : isRightPick ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300'
                    : pickedHere ? 'bg-rose-950/70 border-rose-700 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  {t.label}
                </button>
              );
            })}
          </div>
          {flash && (
            <div className={`p-3 rounded-2xl text-xs leading-relaxed border font-semibold ${flash.ok ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-rose-950/60 border-rose-700 text-rose-200'}`}>
              {flash.text}
            </div>
          )}
          {score.tries > 0 && score.right === score.tries && (
            <div className="p-3 rounded-2xl bg-amber-950/50 border border-amber-700 text-amber-200 text-xs font-bold">
              Perfect record so far - you reason like a chemist: match the property (solubility, magnetism, density, sublimation, weight) to the method.
            </div>
          )}
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> a mixture keeps the properties of its components, and separation
          exploits one differing property - solubility (salt vs sand), magnetism (iron vs sulphur), density for immiscible liquids
          (oil vs water), sublimation (camphor vs salt) or weight (grain vs husk).
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Solve all six mixtures with no wrong clicks, then explain why filtration fails on the salt-water solution.</p>
        <p className="mt-1">2. Design the two-step plan for muddy water (settle, then filter) and name each step using the technique cards.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceExploringMixturesAndTheirSeparationSim;
