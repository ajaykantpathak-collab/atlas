'use client';

import React, { useMemo, useState } from 'react';

const STAGES = [
  { name: '1. Pollination', text: 'Pollen grains from the anther land on the sticky stigma - carried by wind, water, or insects.', hl: 'top' },
  { name: '2. Pollen tube grows', text: 'The pollen grain germinates and grows a tube down through the style towards the ovary.', hl: 'style' },
  { name: '3. Fertilisation', text: 'The male gamete travels down the tube and fuses with the egg cell inside the ovule. A zygote forms.', hl: 'ovary' },
  { name: '4. Seed and fruit', text: 'The fertilised ovule becomes a seed; the ovary swells into a fruit. Petals wither and fall.', hl: 'fruit' },
];

// ─── MAIN COMPONENT ───
export function C9_ScienceReproductionHowLifeContinuesSim() {
  const [mode, setMode] = useState<'asexual' | 'sexual'>('asexual');
  const [gen, setGen] = useState(5);
  const [stage, setStage] = useState(0);
  const [hueA, setHueA] = useState(340);
  const [hueB, setHueB] = useState(200);

  // ─── REAL NUMERICS: exponential growth by binary fission ───
  const population = Math.pow(2, gen);
  const gens = Array.from({ length: gen + 1 }, (_, i) => Math.pow(2, i));
  const maxPop = Math.max(...gens, 2);

  // offspring variation: each offspring blends the two parental hues with jitter
  const offspring = useMemo(() => [0, 1, 2].map((i) => {
    const jitter = (i - 1) * 25;
    return (hueA + hueB) / 2 + jitter;
  }), [hueA, hueB]);

  const hl = STAGES[stage].hl;
  const tubeLen = stage === 0 ? 0 : stage === 1 ? 40 : 62; // pollen tube progress px
  const petals = [0, 72, 144, 216, 288];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 9 Science - Reproduction</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Reproduction: How Life Continues</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setMode('asexual')} className={`px-3 py-1.5 rounded-full text-xs font-bold ${mode === 'asexual' ? 'bg-emerald-600 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400'}`}>
            Asexual: binary fission
          </button>
          <button onClick={() => setMode('sexual')} className={`px-3 py-1.5 rounded-full text-xs font-bold ${mode === 'sexual' ? 'bg-fuchsia-600 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400'}`}>
            Sexual: flowering plant
          </button>
        </div>
      </header>

      {mode === 'asexual' ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 560 240" className="w-full h-48 md:h-56">
              <line x1="30" y1="200" x2="550" y2="200" stroke="#334155" strokeWidth="2" />
              {gens.map((p, i) => {
                const h = (p / maxPop) * 170;
                return (
                  <g key={i}>
                    <rect x={45 + i * (480 / (gen + 1))} y={200 - h} width="30" height={h} rx="3" fill="#10b981" opacity="0.85" />
                    <text x={60 + i * (480 / (gen + 1))} y={194 - h} fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">{p}</text>
                    <text x={60 + i * (480 / (gen + 1))} y="215" fill="#64748b" fontSize="9" textAnchor="middle">G{i}</text>
                  </g>
                );
              })}
            </svg>
            <p className="text-center text-xs font-mono text-emerald-300 mt-1">
              1 parent x 2 every generation: 2^{gen} = {population} cells (each an identical copy)
            </p>
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Generations</span>
                <span className="text-emerald-300 font-mono font-bold">{gen}</span>
              </label>
              <input type="range" min={0} max={10} value={gen} aria-label="generations"
                onChange={(e) => setGen(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
              <label className="text-xs text-slate-400 flex justify-between mt-3">
                <span>Doubling time</span>
                <span className="text-gold-300 font-mono font-bold">{20} min</span>
              </label>
              <input type="range" min={10} max={60} step={5} value={20} aria-label="doubling time" readOnly className="w-full mt-2 accent-gold-500" />
              <p className="text-[10px] text-slate-500 mt-1">Real bacteria can double every ~20 minutes: {gen} x 20 = {gen * 20} minutes to reach {population} cells.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
              In asexual reproduction one parent copies itself. Growth is exponential (each step doubles), and the offspring are clones -
              fast, but with almost no variation when the environment changes.
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* FLOWER */}
          <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-2">
            <svg viewBox="0 0 400 320" className="w-full h-60 md:h-72">
              <line x1="200" y1="310" x2="200" y2="150" stroke="#15803d" strokeWidth="5" />
              {/* ovary / fruit */}
              <circle cx="200" cy="185" r={hl === 'fruit' ? 34 : 26} fill={hl === 'ovary' ? '#d946ef' : hl === 'fruit' ? '#dc2626' : '#7f1d1d'} opacity="0.9" stroke="#f9a8d4" strokeWidth="1.5" />
              <circle cx="200" cy="185" r="7" fill="#fde047" />
              <text x="240" y="188" fill="#fda4af" fontSize="11">{hl === 'fruit' ? 'fruit (ovary swells)' : 'ovary + ovule'}</text>
              {/* style */}
              <line x1="200" y1="160" x2="200" y2="95" stroke="#a3e635" strokeWidth="4" />
              <line x1="200" y1="158" x2="200" y2={158 - tubeLen} stroke="#fef08a" strokeWidth="3" />
              <text x="208" y="130" fill="#d9f99d" fontSize="10">style</text>
              {/* stigma + anthers */}
              <ellipse cx="200" cy="90" rx="16" ry="8" fill={hl === 'top' ? '#f59e0b' : '#84cc16'} />
              <text x="222" y="88" fill="#fbbf24" fontSize="10">stigma</text>
              <line x1="176" y1="95" x2="150" y2="70" stroke="#a16207" strokeWidth="2.5" />
              <ellipse cx="147" cy="67" rx="8" ry="5" fill="#eab308" />
              <line x1="224" y1="95" x2="250" y2="70" stroke="#a16207" strokeWidth="2.5" />
              <ellipse cx="253" cy="67" rx="8" ry="5" fill="#eab308" />
              <text x="258" y="60" fill="#facc15" fontSize="10">anther</text>
              {/* petals */}
              {petals.map((deg) => (
                <ellipse key={deg} cx="200" cy="52" rx="14" ry="30" fill="#ec4899" opacity={hl === 'fruit' ? 0.15 : 0.65}
                  transform={`rotate(${deg} 200 90)`} />
              ))}
              {/* pollen grain on stigma */}
              {stage === 0 && <circle cx="192" cy="86" r="5" fill="#fde047" stroke="#a16207" />}
              {stage >= 1 && <circle cx="200" cy={158 - tubeLen} r="4.5" fill="#fde047" stroke="#a16207" />}
            </svg>
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-sm font-bold text-fuchsia-300">{STAGES[stage].name}</p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{STAGES[stage].text}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setStage((s) => Math.max(0, s - 1))} disabled={stage === 0}
                  className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold disabled:opacity-40">Back</button>
                <button onClick={() => setStage((s) => Math.min(3, s + 1))} disabled={stage === 3}
                  className="flex-1 py-2 rounded-lg bg-fuchsia-600 text-white text-xs font-bold disabled:opacity-40">Next stage</button>
              </div>
              <div className="flex gap-1 mt-2">
                {STAGES.map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= stage ? 'bg-fuchsia-500' : 'bg-slate-800'}`} />
                ))}
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-400 mb-2">Two parents, varied offspring: shuffle the parental flower colours.</p>
              <button onClick={() => { setHueA(Math.floor(Math.random() * 360)); setHueB(Math.floor(Math.random() * 360)); }}
                className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200">
                Cross-pollinate new parents
              </button>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="w-6 h-6 rounded-full border border-white/30" style={{ backgroundColor: `hsl(${hueA},70%,60%)` }} />
                <span className="text-slate-500">x</span>
                <span className="w-6 h-6 rounded-full border border-white/30" style={{ backgroundColor: `hsl(${hueB},70%,60%)` }} />
                <span className="text-slate-500">={'>'}</span>
                {offspring.map((h, i) => (
                  <span key={i} className="w-5 h-5 rounded-full border border-white/30" style={{ backgroundColor: `hsl(${h},70%,60%)` }} />
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Each offspring inherits a mix of both parents, so sexual reproduction produces variation.</p>
            </div>
          </div>
        </div>
      )}

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> reproduction passes genetic information to the next generation.
          Asexual reproduction copies one parent (fast, exponential, little variation); sexual reproduction combines two parents through
          pollination, pollen-tube growth and fertilisation, producing seeds and the variation that helps a species survive change.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set 10 generations at 20 minutes per doubling and compute how many bacteria appear in just over 3 hours - check the bar chart.</p>
        <p className="mt-1">2. Step through all four flower stages and name the part that becomes the seed and the part that becomes the fruit.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceReproductionHowLifeContinuesSim;
