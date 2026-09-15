/**
 * C6 Science -- Materials Around Us
 *
 * One chapter concept: every object is made of a MATERIAL, and each
 * material can be identified by TESTING it: scratch it (hardness),
 * shine light through it (transparency), stir it in water
 * (solubility), drop it in water (float or sink), and look for shine
 * (lustre). The same object could be made of different materials, and
 * each material passes different tests.
 *
 * Interaction model: pick a sample from the shelf, run the four tests
 * in the test bench, and read the verdict card. Small-but-sinking vs
 * big-but-floating kills the "heavy sinks" myth.
 */
import React, { useState } from 'react';

type Sample = {
  name: string; color: string; hard: boolean; seeThrough: 'transparent' | 'translucent' | 'opaque';
  dissolves: boolean; floats: boolean; shiny: boolean; metal: boolean;
};

const SHELF: Sample[] = [
  { name: 'Iron nail', color: '#64748b', hard: true, seeThrough: 'opaque', dissolves: false, floats: false, shiny: true, metal: true },
  { name: 'Glass pane', color: '#a5f3fc', hard: true, seeThrough: 'transparent', dissolves: false, floats: false, shiny: true, metal: false },
  { name: 'Wooden block', color: '#b45309', hard: false, seeThrough: 'opaque', dissolves: false, floats: true, shiny: false, metal: false },
  { name: 'Plastic bottle piece', color: '#f0abfc', hard: false, seeThrough: 'translucent', dissolves: false, floats: true, shiny: false, metal: false },
  { name: 'Sugar cube', color: '#fef9c3', hard: false, seeThrough: 'translucent', dissolves: true, floats: false, shiny: false, metal: false },
  { name: 'Chalk', color: '#f5f5f4', hard: false, seeThrough: 'opaque', dissolves: false, floats: false, shiny: false, metal: false },
];

type Test = 'scratch' | 'torch' | 'stir' | 'drop';

function C6_ScienceMaterialsAroundUsSim() {
  const [sample, setSample] = useState(0);
  const [test, setTest] = useState<Test>('drop');
  const [log, setLog] = useState<Record<number, Test[]>>({});

  const s = SHELF[sample];
  const reset = () => {
    setSample(0);
    setTest('drop');
    setLog({});
  };

  const run = (t: Test) => {
    setTest(t);
    setLog({ ...log, [sample]: (log[sample] || []).includes(t) ? (log[sample] || []) : [...(log[sample] || []), t] });
  };

  const verdict: Record<Test, string> = {
    scratch: s.hard ? 'HARD -- the probe leaves no mark' : 'SOFT -- it scratches and crumbles',
    torch: 'Light passes? ' + (s.seeThrough === 'transparent' ? 'YES, fully (transparent)' : s.seeThrough === 'translucent' ? 'a blurry glow (translucent)' : 'not at all (opaque)'),
    stir: s.dissolves ? 'DISSOLVES -- the water keeps its look but tastes of it' : 'DOES NOT dissolve -- it just sits there',
    drop: (s.floats ? 'FLOATS' : 'SINKS') + ' -- ' + (s.floats ? 'lighter than the same volume of water' : 'heavier than the same volume of water'),
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-orange-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-orange-700">Materials around us -- the property test bench</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        A material is what an object is made of. You do not GUESS a material -- you <b>test</b> it: scratch it,
        shine a torch through it, stir it in water, drop it in water. Run all four tests on every sample!
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {SHELF.map((m, i) => (
          <button key={m.name} onClick={() => setSample(i)} className={'px-3 py-2 rounded-xl text-xs font-black transition-colors ' + (sample === i ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
            {m.name}
          </button>
        ))}
        <button onClick={reset} className="px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_240px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#fff7ed" />
            <rect x="0" y="240" width="640" height="60" fill="#fed7aa" />
            {test === 'drop' && (
              <g>
                <path d="M 240 60 L 240 200 L 400 200 L 400 60" stroke="#93c5fd" strokeWidth="5" fill="none" />
                <rect x="242" y="100" width="156" height="100" fill="#bfdbfe" opacity="0.7" />
                <rect x={s.floats ? 280 : 300} y={s.floats ? 104 : 160} width="80" height="34" rx="6" fill={s.color} stroke="#78716c" style={{ transition: 'all 0.6s ease' }} />
                <text x="320" y="230" textAnchor="middle" fontSize="13" fontWeight="900" fill="#9a3412">{s.floats ? 'FLOATS!' : 'SINKS!'}</text>
              </g>
            )}
            {test === 'torch' && (
              <g>
                <rect x="70" y="120" width="46" height="60" rx="8" fill="#1e293b" />
                <circle cx="122" cy="150" r="12" fill="#fbbf24" />
                <polygon points="134,150 250,86 250,214" fill={s.seeThrough === 'opaque' ? '#fde68a' : s.seeThrough === 'translucent' ? '#fef3c7' : '#fef9c3'} opacity={s.seeThrough === 'opaque' ? 0.25 : 0.7} />
                <rect x="250" y="110" width="70" height="80" rx="8" fill={s.color} stroke="#78716c" />
                {s.seeThrough === 'transparent' && <polygon points="320,118 560,92 560,208 320,182" fill="#fef08a" opacity="0.8" />}
                {s.seeThrough === 'translucent' && <polygon points="320,126 470,110 470,190 320,174" fill="#fef9c3" opacity="0.5" />}
                <text x="320" y="248" textAnchor="middle" fontSize="13" fontWeight="900" fill="#9a3412">{s.seeThrough.toUpperCase()}</text>
              </g>
            )}
            {test === 'stir' && (
              <g>
                <path d="M 230 60 L 230 210 L 410 210 L 410 60" stroke="#94a3b8" strokeWidth="5" fill="none" />
                <rect x="232" y="90" width="176" height="120" fill={s.dissolves ? s.color : '#e0f2fe'} opacity={s.dissolves ? 0.55 : 0.9} style={{ transition: 'all 0.6s' }} />
                {!s.dissolves && <rect x="290" y="160" width="60" height="40" rx="6" fill={s.color} stroke="#78716c" />}
                <line x1="200" y1="40" x2="330" y2="150" stroke="#78716c" strokeWidth="6" strokeLinecap="round" transform={'rotate(' + (s.dissolves ? -8 : 0) + ' 330 150)'} />
                <text x="320" y="250" textAnchor="middle" fontSize="13" fontWeight="900" fill="#9a3412">{s.dissolves ? 'DISSOLVED!' : 'DOES NOT dissolve'}</text>
              </g>
            )}
            {test === 'scratch' && (
              <g>
                <rect x="250" y="120" width="140" height="70" rx="8" fill={s.color} stroke="#78716c" />
                {!s.hard && [0, 14, 28].map((o) => <line key={o} x1={274 + o} y1="126" x2={286 + o} y2="184" stroke="#57534e" strokeWidth="3" />)}
                <path d="M 470 60 L 420 130" stroke="#52525b" strokeWidth="8" strokeLinecap="round" />
                <text x="320" y="240" textAnchor="middle" fontSize="13" fontWeight="900" fill="#9a3412">{s.hard ? 'HARD -- no scratch' : 'SOFT -- scratches off'}</text>
              </g>
            )}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {(['drop', 'torch', 'stir', 'scratch'] as Test[]).map((t) => (
              <button key={t} onClick={() => run(t)} className={'px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (test === t ? 'bg-orange-600 text-white' : (log[sample] || []).includes(t) ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                {t === 'drop' ? 'Water drop' : t === 'torch' ? 'Torch beam' : t === 'stir' ? 'Stir in water' : 'Scratch test'}
              </button>
            ))}
          </div>
          <div className="p-3 rounded-2xl bg-orange-600 text-white">
            <div className="text-xs uppercase tracking-widest opacity-80">{s.name} -- test result</div>
            <div className="text-sm font-bold mt-1 leading-snug">{verdict[test]}</div>
          </div>
          <div className="p-2 rounded-xl bg-slate-100 text-[11px] text-slate-600 font-semibold">
            {log[sample] ? log[sample].length : 0} of 4 tests run on {s.name}. Tested {(Object.keys(log)).length} of 6 samples.
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
            Look: the tiny iron nail SINKS but the big wooden block FLOATS. Floating depends on the material, not the size!
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
        <div className="text-sm font-black text-rose-800">Misconception buster</div>
        <div className="text-xs text-rose-700 mt-0.5">
          "Shiny must be metal." Run the torch and scratch tests on the glass pane: it is shiny and transparent, but it is not a metal. Jewellers use many tests together, never just one.
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Which is the ONLY sample that dissolves in water? Run the stir test on all six to prove it.</li>
          <li>Find the two samples that both shine, then use the scratch test to tell metal from non-metal.</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceMaterialsAroundUsSim };
export default C6_ScienceMaterialsAroundUsSim;
