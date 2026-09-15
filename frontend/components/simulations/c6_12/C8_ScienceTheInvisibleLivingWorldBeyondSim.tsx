'use client';
/**
 * C8_ScienceTheInvisibleLivingWorldBeyondSim (Class 8 Science)
 *
 * ELI5: A whole living world hides below what our eyes can resolve (about
 * 0.1 mm). Microorganisms - bacteria, protozoa, algae, fungi and viruses -
 * only reveal themselves under magnification: hand lens, light microscope,
 * electron microscope. Most are harmless helpers; a few cause disease.
 */
import React, { useState } from 'react';

interface Microbe {
  name: string;
  size: number; // micrometres
  zoomNeeded: number;
  color: string;
  note: string;
  kind: string;
}

const MICROBES: Microbe[] = [
  { name: 'Amoeba (protozoa)', size: 300, zoomNeeded: 40, color: '#a78bfa', kind: 'protozoan', note: 'single cell, moves with false feet; lives in pond water' },
  { name: 'Paramecium (protozoa)', size: 200, zoomNeeded: 60, color: '#f472b6', kind: 'protozoan', note: 'slipper-shaped, swims with thousands of tiny cilia' },
  { name: 'Spirogyra (algae)', size: 400, zoomNeeded: 25, color: '#34d399', kind: 'alga', note: 'green spiral filaments - makes food by photosynthesis' },
  { name: 'Lactobacillus (bacteria)', size: 4, zoomNeeded: 1000, color: '#f59e0b', kind: 'bacterium', note: 'rod-shaped friend that turns milk into curd' },
  { name: 'Rhizovirus-like virus', size: 0.1, zoomNeeded: 1000, color: '#ef4444', kind: 'virus', note: 'reproduces ONLY inside a host cell; needs an electron microscope' },
];

export function C8_ScienceTheInvisibleLivingWorldBeyondSim() {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState(0);
  const [reveal, setReveal] = useState(false);

  const bug = MICROBES[selected];
  const visible = zoom >= bug.zoomNeeded;
  const pxSize = Math.min(190, Math.max(0.5, (bug.size / 300) * 60 * Math.min(zoom / bug.zoomNeeded, 2.2)));

  const presets: [string, number][] = [
    ['Naked eye (1x)', 1],
    ['Hand lens (10x)', 10],
    ['School light microscope (100x)', 100],
    ['Lab light microscope (400x)', 400],
    ['Electron microscope (1000x+)', 1000],
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-violet-700">The Invisible Living World: Beyond Our Naked Eye</h1>

      <div className="mt-3 p-4 bg-violet-50 border border-violet-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-violet-700">A hidden universe:</span> your eye cannot
          clearly see anything smaller than about 0.1 millimetre. Microorganisms - protozoa, algae,
          bacteria, fungi and viruses - live in soil, water, air, and even inside you. They decay
          waste, make curd and bread, fix nitrogen... and a few cause disease. Magnification is the
          key that unlocks them: the stronger the lens, the smaller the citizen you can meet.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map(([label, z]) => (
          <button key={label} onClick={() => setZoom(z)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${zoom === z ? 'bg-violet-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Magnification</span><span className="font-mono text-violet-600">{zoom}x</span></label>
            <input type="range" min={0} max={4} step={1} value={[1, 10, 100, 400, 1000].indexOf(zoom) === -1 ? 0 : [1, 10, 100, 400, 1000].indexOf(zoom)} aria-label="magnification" onChange={(e) => setZoom([1, 10, 100, 400, 1000][Number(e.target.value)])} className="w-full mt-1 accent-violet-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">SPECIMEN SLIDE</p>
            <div className="flex flex-wrap gap-1.5">
              {MICROBES.map((m, i) => (
                <button key={m.name} onClick={() => setSelected(i)} className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${selected === i ? 'text-white shadow' : 'bg-slate-200 hover:bg-slate-300 text-slate-600'}`} style={selected === i ? { background: m.color } : {}}>
                  {m.name}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-sm">
            <div className="font-bold" style={{ color: bug.color }}>{bug.name}</div>
            <div className="text-xs text-slate-500 mt-0.5">kind: {bug.kind} - real size about {bug.size < 1 ? bug.size * 1000 : bug.size} {bug.size < 1 ? 'nanometres' : 'micrometres'}</div>
            <div className="text-xs text-slate-600 mt-1">{bug.note}</div>
            <div className="mt-2 text-xs font-bold" style={{ color: visible ? '#059669' : '#e11d48' }}>
              {visible ? 'VISIBLE at this magnification!' : `too small - need ${bug.zoomNeeded}x or more`}
            </div>
            <button onClick={() => setReveal((r) => !r)} className="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-100 text-violet-700 hover:bg-violet-200 transition-all">
              {reveal ? 'Hide zoom hints' : 'What magnification do I need?'}
            </button>
            {reveal && (
              <div className="mt-1 text-xs text-slate-500">it first appears at {bug.zoomNeeded}x - slide or pick a preset above</div>
            )}
          </div>
        </div>

        <div className="p-2 bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl border border-slate-200">
          <svg viewBox="0 0 320 230" className="w-full">
            {/* circular microscope field */}
            <circle cx={160} cy={105} r={95} fill="#0f172a" stroke="#475569" strokeWidth={3} />
            <circle cx={160} cy={105} r={95} fill={visible ? '#1e293b' : '#0f172a'} />
            {/* background specks when magnified */}
            {zoom >= 10 &&
              Array.from({ length: 12 }).map((_, i) => {
                const ang = (i / 12) * 2 * Math.PI + zoom;
                const r = 55 + 30 * Math.sin(i * 3 + zoom);
                return <circle key={i} cx={160 + r * Math.cos(ang)} cy={105 + r * Math.sin(ang)} r={1.5 + (i % 3)} fill="#475569" opacity={0.7} />;
              })}
            {/* the organism */}
            {visible ? (
              <g style={{ transition: 'all 300ms' }} opacity={0.95}>
                {selected === 0 && (
                  <g>
                    <circle cx={160} cy={100} r={Math.max(6, pxSize / 2)} fill={bug.color} opacity={0.9} />
                    <circle cx={160 + pxSize / 5} cy={92} r={Math.max(1.5, pxSize / 10)} fill="#fff" />
                    <ellipse cx={160 - pxSize / 4} cy={110} rx={pxSize / 5} ry={pxSize / 8} fill="#8b5cf6" />
                  </g>
                )}
                {selected === 1 && (
                  <ellipse cx={160} cy={100} rx={Math.max(6, pxSize / 2)} ry={Math.max(3.5, pxSize / 3.2)} fill={bug.color} opacity={0.9} />
                )}
                {selected === 2 && (
                  <g>
                    {[0, 1, 2].map((s) => (
                      <path key={s} d={`M ${130 + s * 4} ${60 + s * 30} Q 200 ${70 + s * 28} 165 ${125 + s * 10}`} stroke={bug.color} strokeWidth={Math.max(2, pxSize / 9)} fill="none" opacity={0.85} />
                    ))}
                  </g>
                )}
                {selected === 3 && (
                  <g>
                    {[0, 1, 2, 3].map((r) => (
                      <rect key={r} x={120 + (r % 2) * 34} y={70 + r * 18} width={Math.max(4, pxSize / 2)} height={Math.max(2.5, pxSize / 4)} rx={2} fill={bug.color} opacity={0.9} />
                    ))}
                  </g>
                )}
                {selected === 4 && (
                  <g>
                    {[0, 1, 2, 3, 4].map((r) => (
                      <circle key={r} cx={130 + r * 22} cy={100 + ((r % 2) * 22 - 11)} r={Math.max(2, pxSize / 14)} fill={bug.color} opacity={0.9} />
                    ))}
                  </g>
                )}
                <text x={160} y={205} textAnchor="middle" fontSize="10" fill="#a5b4fc">
                  {bug.name} at {zoom}x
                </text>
              </g>
            ) : (
              <text x={160} y={100} textAnchor="middle" fontSize="11" fill="#64748b">field looks empty...</text>
            )}
            <text x={160} y={222} textAnchor="middle" fontSize="9" fill="#94a3b8">
              {zoom === 1 ? 'your eye alone - resolution about 0.1 mm' : `magnified ${zoom} times`}
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find the minimum magnification that reveals each specimen - order them from biggest to smallest real size.</li>
          <li>The virus never appears even at 1000x on the light microscope in our model. What instrument does it take, and why?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceTheInvisibleLivingWorldBeyondSim;
