'use client';
/**
 * C8_ScienceReproductionInAnimalsSim (Class 8 Science)
 *
 * ELI5: Animals reproduce in two grand styles. ASEXUAL: one parent clones
 * itself - amoeba pinches into two (binary fission), yeast grows a bud.
 * SEXUAL: two parents - male and female gametes meet in fertilisation, which
 * happens outside in water (fish, frogs) or inside the mother's body (hen,
 * human).
 */
import React, { useState } from 'react';

type Mode = 'fission' | 'budding' | 'sexual';

const SEXUAL_STAGES = [
  { name: 'Gametes form', note: 'testis makes sperms, ovary makes eggs (ovum) - each carries half the instructions' },
  { name: 'Fertilisation', note: 'sperm meets egg -> zygote. Outside water = external (fish, frog); inside the body = internal (hen, human)' },
  { name: 'Zygote divides', note: 'one cell becomes two, two become four - the baby grows by cell division' },
  { name: 'New individual', note: 'fish/frog: eggs hatch outside. Hen: hard shell forms, chick develops in the egg; humans: embryo develops in the uterus' },
];

export function C8_ScienceReproductionInAnimalsSim() {
  const [mode, setMode] = useState<Mode>('fission');
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);

  React.useEffect(() => {
    if (!auto) return;
    const maxSteps = mode === 'sexual' ? 4 : 5;
    const id = setInterval(() => setStep((s) => (s + 1) % maxSteps), 700);
    return () => clearInterval(id);
  }, [auto, mode]);

  const maxSteps = mode === 'sexual' ? 4 : 5;
  const reset = (m: Mode) => {
    setMode(m);
    setStep(0);
    setAuto(false);
  };

  const sexualText = SEXUAL_STAGES[Math.min(step, 3)];

  const organismSvg = () => {
    if (mode === 'fission') {
      const k = step / (maxSteps - 1);
      const sep = k * 26;
      return (
        <g style={{ transition: 'all 300ms' }}>
          <circle cx={150 - sep} cy={110} r={44 - k * 8} fill="#a78bfa" stroke="#6d28d9" strokeWidth={2} />
          <circle cx={150 + sep} cy={110} r={44 - k * 8} fill="#a78bfa" stroke="#6d28d9" strokeWidth={2} />
          <circle cx={150 - sep - 12} cy={100} r={4} fill="#fff" />
          <circle cx={150 + sep + 12} cy={100} r={4} fill="#fff" />
          <text x={150} y={185} textAnchor="middle" fontSize="11" fill="#4c1d95">
            {k === 0 ? 'Amoeba - single parent cell' : k < 1 ? 'nucleus divides, cell pinches in' : 'two identical daughters - CLONES'}
          </text>
        </g>
      );
    }
    if (mode === 'budding') {
      const k = step / (maxSteps - 1);
      const budR = 4 + k * 20;
      const budOff = 40 + k * 8;
      return (
        <g style={{ transition: 'all 300ms' }}>
          <ellipse cx={140} cy={110} rx={46} ry={38} fill="#fbbf24" stroke="#b45309" strokeWidth={2} />
          <circle cx={140 + budOff} cy={86} r={budR} fill="#fcd34d" stroke="#b45309" strokeWidth={2} />
          {k > 0.7 && <circle cx={140 + budOff + 24} cy={70} r={6 + (k - 0.7) * 24} fill="#fde68a" stroke="#b45309" strokeWidth={1.5} />}
          <text x={150} y={185} textAnchor="middle" fontSize="11" fill="#92400e">
            {k === 0 ? 'Yeast cell' : k < 1 ? 'a bud grows out of the parent' : 'bud pinches off as a new yeast cell'}
          </text>
        </g>
      );
    }
    // sexual
    return (
      <g>
        {step === 0 && (
          <>
            <circle cx={120} cy={105} r={20} fill="#93c5fd" stroke="#1d4ed8" />
            <circle cx={200} cy={105} r={34} fill="#fbcfe8" stroke="#be185d" />
            <text x={120} y={145} textAnchor="middle" fontSize="10" fill="#1e3a8a">sperm</text>
            <text x={200} y={155} textAnchor="middle" fontSize="10" fill="#9d174d">egg</text>
          </>
        )}
        {step === 1 && (
          <>
            <circle cx={160} cy={105} r={34} fill="#fbcfe8" stroke="#be185d" />
            <circle cx={160} cy={105} r={12} fill="#f472b6" stroke="#9d174d" />
            <text x={160} y={160} textAnchor="middle" fontSize="10" fill="#9d174d">fertilisation makes the ZYGOTE (2n)</text>
          </>
        )}
        {step === 2 && (
          <>
            {[[140, 85], [180, 85], [140, 125], [180, 125]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={16} fill="#f9a8d4" stroke="#9d174d" />
            ))}
            <text x={160} y={165} textAnchor="middle" fontSize="10" fill="#9d174d">zygote divides again and again</text>
          </>
        )}
        {step >= 3 && (
          <>
            <ellipse cx={160} cy={100} rx={42} ry={52} fill="#fef3c7" stroke="#b45309" />
            <circle cx={160} cy={100} r={20} fill="#fcd34d" />
            <circle cx={155} cy={95} r={3} fill="#1f2937" />
            <text x={160} y={170} textAnchor="middle" fontSize="10" fill="#92400e">egg with shell (hen) or embryo in uterus (human)</text>
          </>
        )}
      </g>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-purple-700">Reproduction in Animals: Clone or Team-Up?</h1>

      <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-purple-700">Two strategies:</span> asexual reproduction
          needs ONE parent and makes identical copies - fast, but no variety. Sexual reproduction
          combines genes from TWO parents through fertilisation - slower, but offspring vary, which
          helps populations survive change. Compare the three shows below stage by stage.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['fission', 'Amoeba: binary fission'], ['budding', 'Yeast: budding'], ['sexual', 'Sexual reproduction']] as [Mode, string][]).map(([m, label]) => (
          <button key={m} onClick={() => reset(m)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === m ? 'bg-purple-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2 bg-gradient-to-b from-purple-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 300 200" className="w-full">
            <rect x={0} y={0} width={300} height={200} rx={12} fill="#faf5ff" />
            {organismSvg()}
          </svg>
          <div className="flex items-center justify-center gap-2 mt-1">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 hover:bg-slate-300 transition-all">
              Back
            </button>
            <button onClick={() => setStep((s) => (s + 1) % maxSteps)} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 transition-all">
              Next stage ({step + 1}/{maxSteps})
            </button>
            <button onClick={() => setAuto((a) => !a)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${auto ? 'bg-rose-500 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}>
              {auto ? 'Pause' : 'Auto-play'}
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          {mode === 'sexual' ? (
            <>
              <p className="text-xs font-bold text-slate-500 mb-2">STAGE NOTES</p>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-sm font-bold text-purple-700">{step + 1}. {sexualText.name}</div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">{sexualText.note}</div>
              </div>
              <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-600 mb-1">EXTERNAL vs INTERNAL</p>
                <p>External (fish, frog): hundreds of eggs, in water; many are eaten - safety in numbers.</p>
                <p className="mt-1">Internal (hen, human): few eggs/babies; the body protects development - safety in care.</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-bold text-slate-500 mb-2">ASEXUAL - WHY IT MATTERS</p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <p><span className="font-bold">Only one parent</span> is needed, no gametes meet, and offspring are genetic copies.</p>
                <p className="mt-1">Great when conditions are stable - amoeba and yeast multiply quickly.</p>
                <p className="mt-1">Risky when a disease strikes: if all are clones, all are vulnerable. That is why sexual reproduction dominates in complex animals.</p>
              </div>
              <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-600">Cloning check: after {step} of {maxSteps - 1} stages, how many individuals exist?
                  {step === maxSteps - 1 ? mode === 'fission' ? ' Two!' : ' Two-plus (and budding chains)!' : ' Still one...'}</p>
              </div>
            </>
          )}
          <div className="mt-3 text-xs text-slate-500 leading-relaxed">
            Key words: gamete, zygote, fertilisation (internal/external), binary fission, budding,
            embryo, metamorphosis (tadpole to frog).
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Auto-play all three shows and count total stages. Which route to a new individual uses the fewest steps?</li>
          <li>Name one animal for external and one for internal fertilisation, then find them in stage 4 notes.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceReproductionInAnimalsSim;
