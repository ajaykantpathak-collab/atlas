'use client';

import React, { useState } from 'react';

/**
 * Class 12 Chemistry -- General Principles and Processes of Isolation of Elements
 * Ellingham diagram: Delta G = Delta H - T Delta S lines for common oxides vs
 * the carbon lines; the crossing temperature decides who can reduce whom.
 * Self-contained: react + tailwind only.
 */

// dG in kJ per mole O2; linear textbook approximations dG = A + B*T
const OXIDES = [
  { key: 'FeO', label: '2Fe + O2 -> 2FeO', A: -520, B: 0.125, crossingNote: 'reducible by coke above roughly 980 K (blast furnace)' },
  { key: 'ZnO', label: '2Zn + O2 -> 2ZnO', A: -696, B: 0.201, crossingNote: 'reducible by coke above roughly 1250 K; Zn distils out as vapour' },
  { key: 'Cr2O3', label: '(4/3)Cr + O2 -> (2/3)Cr2O3', A: -1130, B: 0.25, crossingNote: 'needs very high T -- aluminothermite (Cr2O3 + Al) is used instead' },
  { key: 'Al2O3', label: '(4/3)Al + O2 -> (2/3)Al2O3', A: -1120, B: 0.21, crossingNote: 'carbon cannot practically reduce it -- electrolytic Hall-Heroult is used' },
];

const CARBON_LINES = [
  { key: 'CO2', label: 'C + O2 -> CO2', A: -394, B: 0.0 },
  { key: 'CO', label: '2C + O2 -> 2CO', A: -221, B: -0.179 },
];

export function C12_ChemistryGeneralPrinciplesAndProcessesOfSim() {
  const [oxideIdx, setOxideIdx] = useState(0);
  const [tempK, setTempK] = useState(1200);

  const oxide = OXIDES[oxideIdx];
  const dgOf = (o: { A: number; B: number }, T: number) => o.A + o.B * T;
  const gOx = dgOf(oxide, tempK);
  const gCO = dgOf(CARBON_LINES[1], tempK);
  const gCO2 = dgOf(CARBON_LINES[0], tempK);
  // Reduction of the oxide by CO-forming carbon: dG_red = dG(oxide) - dG(2C -> 2CO)
  const dGred = gOx - gCO;
  const canReduce = dGred < 0;
  // Crossing temperature with the CO line
  const tCross = (oxide.A - CARBON_LINES[1].A) / (CARBON_LINES[1].B - oxide.B);

  // Plot: T 300..2400 K, dG -1300..0
  const px = (T: number) => 55 + ((T - 300) / 2100) * 390;
  const py = (g: number) => 20 + (1 - (g + 1300) / 1300) * 220;
  const linePts = (o: { A: number; B: number }) =>
    `${px(300)},${py(dgOf(o, 300))} ${px(2400)},${py(dgOf(o, 2400))}`;

  const markerY = py(gOx);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-stone-950/80 rounded-2xl border border-stone-600 font-mono">Fe</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 12 -- Isolation of Elements</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Ellingham Diagram: Choosing the Reducing Agent</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 270" className="w-full">
            <line x1={55} y1={240} x2={445} y2={240} stroke="#475569" strokeWidth={2} />
            <line x1={55} y1={20} x2={55} y2={240} stroke="#475569" strokeWidth={2} />
            <text x={250} y={262} textAnchor="middle" fill="#64748b" fontSize={11} fontFamily="monospace">Temperature (K)</text>
            <text x={18} y={135} fill="#64748b" fontSize={10} fontFamily="monospace" transform="rotate(-90 18 135)">dG = dH - T dS (kJ/mol O2)</text>
            {[600, 1200, 1800, 2400].map((T) => (
              <g key={T}>
                <line x1={px(T)} y1={20} x2={px(T)} y2={240} stroke="#1e293b" strokeDasharray="3 5" />
                <text x={px(T)} y={254} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">{T}</text>
              </g>
            ))}
            <line x1={55} y1={py(0)} x2={445} y2={py(0)} stroke="#475569" strokeDasharray="2 4" />
            <text x={60} y={py(0) - 5} fill="#64748b" fontSize={9} fontFamily="monospace">dG = 0</text>
            {/* carbon lines */}
            {CARBON_LINES.map((cl) => (
              <g key={cl.key}>
                <polyline points={linePts(cl)} fill="none" stroke={cl.key === 'CO' ? '#fbbf24' : '#a3a3a3'} strokeWidth={2} />
                <text x={px(1500)} y={py(dgOf(cl, 1500)) - 7} fill={cl.key === 'CO' ? '#fbbf24' : '#a3a3a3'} fontSize={9} fontFamily="monospace" textAnchor="middle">
                  {cl.label}
                </text>
              </g>
            ))}
            {/* remaining oxides faint, selected bold */}
            {OXIDES.map((o, i) => (
              <g key={o.key}>
                <polyline points={linePts(o)} fill="none"
                  stroke={i === oxideIdx ? '#38bdf8' : '#233047'} strokeWidth={i === oxideIdx ? 3 : 1.5} />
                {i === oxideIdx && (
                  <text x={px(430)} y={py(dgOf(o, 2400)) + 14} textAnchor="end" fill="#38bdf8" fontSize={9} fontFamily="monospace">{o.label}</text>
                )}
              </g>
            ))}
            {/* T marker on oxide line + reduction verdict */}
            <circle cx={px(tempK)} cy={markerY} r={5} fill="#f472b6" stroke="#fff" strokeWidth={1.2} />
            <line x1={px(tempK)} y1={20} x2={px(tempK)} y2={240} stroke="#f472b6" strokeWidth={1} strokeDasharray="3 4" />
            {Number.isFinite(tCross) && tCross > 300 && tCross < 2400 && (
              <>
                <circle cx={px(tCross)} cy={py(dgOf(oxide, tCross))} r={4} fill="#fbbf24" />
                <text x={px(tCross)} y={py(dgOf(oxide, tCross)) - 10} fill="#fbbf24" fontSize={9} fontFamily="monospace" textAnchor="middle">
                  crossing {tCross.toFixed(0)} K
                </text>
              </>
            )}
            <text x={65} y={35} fill={canReduce ? '#34d399' : '#f87171'} fontSize={11} fontWeight="bold" fontFamily="monospace">
              at {tempK} K: dG(redn by C) = {dGred.toFixed(0)} kJ --&gt; {canReduce ? 'SPONTANEOUS, C works' : 'NOT spontaneous, C fails'}
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2">
            <div><span className="text-slate-500">dG oxide line at T</span><div className="text-sky-300 font-bold text-sm">{gOx.toFixed(0)} kJ</div></div>
            <div><span className="text-slate-500">dG 2C -&gt; 2CO at T</span><div className="text-amber-300 font-bold text-sm">{gCO.toFixed(0)} kJ</div></div>
            <div><span className="text-slate-500">dG C -&gt; CO2 at T</span><div className="text-slate-300 font-bold text-sm">{gCO2.toFixed(0)} kJ</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Choose the oxide line</p>
              <div className="grid grid-cols-2 gap-1.5">
                {OXIDES.map((o, i) => (
                  <button key={o.key} onClick={() => setOxideIdx(i)}
                    className={`py-2 rounded-xl text-xs font-bold ${oxideIdx === i ? 'bg-sky-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                    {o.key}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Furnace temperature</span><span className="font-mono font-bold text-rose-400">{tempK} K ({(tempK - 273).toFixed(0)} deg C)</span>
              </div>
              <input type="range" min={300} max={2400} step={10} value={tempK} aria-label="Temperature"
                onChange={(e) => setTempK(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 rounded-xl p-3 border border-slate-800">
              {oxide.crossingNote}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-amber-300 font-bold">Why the CO line falls</div>
            <div className="text-slate-400">2C + O2 -&gt; 2CO makes 1 mol gas from 1 mol gas + 1 mol solid: dS &gt; 0, so slope = -dS &lt; 0.</div>
            <div className="text-slate-400">Metal oxide lines rise (gas consumed, dS &lt; 0). One crossing = redn switches on.</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Read the diagram like a ladder: the metal whose oxide line sits LOWER is the stronger
              reducing agent, because it can pull oxygen off any oxide whose line is above it. Carbon
              wins industrially because its CO line plunges with temperature -- the reason coke +
              heat frees Fe and Zn but fails hopelessly against Al2O3, which must be electrolysed.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Find the crossing temperature for ZnO (about 1250 K) and then slide T just below and just above it to watch the verdict flip sign.</p>
            <p>2. Set T = 2000 K: which TWO oxide lines still lie below the CO line, and what does that predict about extracting Al by smelting?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_ChemistryGeneralPrinciplesAndProcessesOfSim;
