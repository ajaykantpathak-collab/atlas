'use client';

import React, { useState } from 'react';

/**
 * Class 11 Physics -- Units and Measurement
 * Measure g with a simple pendulum: T = 2 pi sqrt(L/g), then propagate the
 * length and timing errors: dg/g = dL/L + 2 dT/T. Plus a dimensional-analysis
 * elimination game. Self-contained: react + tailwind only.
 */

const G_TRUE = 9.81; // m/s^2

export function C11_PhysicsUnitsAndMeasurementSim() {
  const [lengthCm, setLengthCm] = useState(100); // pendulum length, cm
  const [dLengthMm, setDLengthMm] = useState(2); // length uncertainty, mm
  const [oscillations, setOscillations] = useState(20);
  const [timingError, setTimingError] = useState(0.0); // stopwatch bias, seconds
  const [reactionS, setReactionS] = useState(0.2); // reaction-time uncertainty, s
  const [formulaChoice, setFormulaChoice] = useState<number>(-1);

  const L = lengthCm / 100; // m
  const tTrue = oscillations * 2 * Math.PI * Math.sqrt(L / G_TRUE); // s
  const tMeasured = tTrue + timingError; // s
  const Tmeas = tMeasured / oscillations; // s
  const gMeas = (4 * Math.PI * Math.PI * L) / (Tmeas * Tmeas); // m/s^2

  const dL = dLengthMm / 1000; // m
  const dT = reactionS / oscillations; // s
  const relErrG = dL / L + (2 * dT) / Tmeas; // dimensionless
  const dg = relErrG * gMeas;
  const bias = ((gMeas - G_TRUE) / G_TRUE) * 100; // percent off from truth

  // Dimensional analysis mini-game: which formula can possibly describe a period?
  const candidates = [
    { label: 'T = 2 pi sqrt(L/g)', dims: 'sqrt(m / (m/s^2)) = sqrt(s^2) = s', valid: true },
    { label: 'T = 2 pi sqrt(g/L)', dims: 'sqrt((m/s^2)/m) = 1/s -- frequency, not period', valid: false },
    { label: 'T = 2 pi L g', dims: 'm x m/s^2 = m^2/s^2 -- not time at all', valid: false },
  ];

  const gaugeX = 60 + Math.min(1.2, Math.max(0, (gMeas - 8.4) / (11.2 - 8.4))) * 380;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700 font-mono">+/-</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Class 11 -- Units and Measurement</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Measuring g: Precision, Error Propagation, Dimensions</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 280" className="w-full">
            <rect x={190} y={10} width={100} height={10} fill="#334155" rx={3} />
            <line x1={240} y1={20} x2={240} y2={20 + Math.min(170, L * 85)} stroke="#94a3b8" strokeWidth={2} />
            <circle cx={240} cy={24 + Math.min(170, L * 85)} r={16} fill="#475569" stroke="#94a3b8" strokeWidth={2} />
            <text x={262} y={44 + Math.min(170, L * 85)} fill="#94a3b8" fontSize={11} fontFamily="monospace">
              L = {L.toFixed(2)} m +/- {dLengthMm} mm
            </text>
            <path d={`M 240 30 A 40 40 0 0 1 ${240 + 40 * Math.sin(0.35)} ${30 + 40 * Math.cos(0.35)}`}
              fill="none" stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />

            <text x={30} y={232} fill="#64748b" fontSize={11} fontFamily="monospace">g (m/s^2)</text>
            <line x1={60} y1={252} x2={440} y2={252} stroke="#475569" strokeWidth={2} />
            {[8.4, 9.0, 9.6, 10.2, 10.8].map((v) => (
              <g key={v}>
                <line x1={60 + ((v - 8.4) / 2.8) * 380} y1={248} x2={60 + ((v - 8.4) / 2.8) * 380} y2={256} stroke="#475569" />
                <text x={60 + ((v - 8.4) / 2.8) * 380} y={268} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">{v.toFixed(1)}</text>
              </g>
            ))}
            <line x1={60 + ((G_TRUE - 8.4) / 2.8) * 380} y1={230} x2={60 + ((G_TRUE - 8.4) / 2.8) * 380} y2={252}
              stroke="#34d399" strokeWidth={2} strokeDasharray="3 3" />
            <text x={60 + ((G_TRUE - 8.4) / 2.8) * 380} y={224} textAnchor="middle" fill="#34d399" fontSize={10} fontFamily="monospace">true 9.81</text>
            <line x1={gaugeX} y1={210} x2={gaugeX} y2={252} stroke="#f472b6" strokeWidth={3} />
            <line x1={gaugeX - (dg / 2.8) * 380} y1={231} x2={gaugeX + (dg / 2.8) * 380} y2={231} stroke="#f472b6" strokeWidth={5} opacity={0.5} />
            <text x={240} y={200} textAnchor="middle" fill="#f9a8d4" fontSize={12} fontFamily="monospace" fontWeight="bold">
              g = {gMeas.toFixed(2)} +/- {dg.toFixed(2)} m/s^2
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Measured total time</span><div className="text-sky-300 font-bold text-sm">{tMeasured.toFixed(2)} s for {oscillations} swings</div></div>
            <div><span className="text-slate-500">T = t/N</span><div className="text-amber-300 font-bold text-sm">{Tmeas.toFixed(4)} s</div></div>
            <div><span className="text-slate-500">g = 4 pi^2 L / T^2</span><div className="text-rose-300 font-bold text-sm">{gMeas.toFixed(3)} m/s^2</div></div>
            <div><span className="text-slate-500">Bias vs truth</span><div className={`${Math.abs(bias) < relErrG * 100 ? 'text-emerald-300' : 'text-rose-400'} font-bold text-sm`}>{bias >= 0 ? '+' : ''}{bias.toFixed(2)} %</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Pendulum length L</span><span className="font-mono font-bold text-sky-400">{lengthCm} cm</span>
              </div>
              <input type="range" min={20} max={200} step={1} value={lengthCm} aria-label="Pendulum length"
                onChange={(e) => setLengthCm(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Length uncertainty dL</span><span className="font-mono font-bold text-indigo-400">{dLengthMm} mm</span>
              </div>
              <input type="range" min={1} max={20} step={1} value={dLengthMm} aria-label="Length uncertainty"
                onChange={(e) => setDLengthMm(Number(e.target.value))} className="w-full accent-indigo-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Oscillations counted N</span><span className="font-mono font-bold text-emerald-400">{oscillations}</span>
              </div>
              <input type="range" min={5} max={50} step={5} value={oscillations} aria-label="Oscillations counted"
                onChange={(e) => setOscillations(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Stopwatch bias</span><span className="font-mono font-bold text-amber-400">{timingError >= 0 ? '+' : ''}{timingError.toFixed(1)} s</span>
              </div>
              <input type="range" min={-2} max={2} step={0.1} value={timingError} aria-label="Stopwatch bias"
                onChange={(e) => setTimingError(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Reaction time uncertainty</span><span className="font-mono font-bold text-rose-400">{reactionS.toFixed(1)} s</span>
              </div>
              <input type="range" min={0.1} max={1} step={0.1} value={reactionS} aria-label="Reaction time"
                onChange={(e) => setReactionS(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-cyan-800/60 p-4 text-xs font-mono">
            <div className="text-cyan-300 font-bold mb-1">Error propagation (max-limit rule)</div>
            <div className="text-slate-400">dg/g = dL/L + 2 dT/T</div>
            <div className="text-slate-300 mt-1">
              = {(dL / L).toFixed(4)} + {((2 * dT) / Tmeas).toFixed(4)} = <span className="text-cyan-300 font-bold">{(relErrG * 100).toFixed(2)} %</span>
            </div>
            <div className="text-slate-500 mt-1 text-[10px]">Counting 20+ swings divides the reaction error by N -- the classic trick.</div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-xs font-bold text-cyan-300">Dimensional elimination: which formula CAN be a period?</p>
            {candidates.map((c, i) => (
              <button key={i} onClick={() => setFormulaChoice(i)}
                className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-mono transition ${formulaChoice === i ? (c.valid ? 'bg-emerald-950 border border-emerald-500 text-emerald-200' : 'bg-rose-950 border border-rose-500 text-rose-200') : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                {c.label}
              </button>
            ))}
            {formulaChoice >= 0 && (
              <p className={`text-[11px] font-mono ${candidates[formulaChoice].valid ? 'text-emerald-300' : 'text-rose-300'}`}>
                {candidates[formulaChoice].valid ? 'Correct dimensions: only this yields seconds.' : 'Rejected: ' + candidates[formulaChoice].dims}
              </p>
            )}
          </div>

          <div className="bg-cyan-950/40 rounded-2xl border border-cyan-800/50 p-4 text-xs">
            <p className="font-bold text-cyan-300 mb-1">What to try</p>
            <p>1. Set bias +1.0 s and find N that pushes the bias INSIDE the error bar (grey band covers green line). Compare N = 5 vs N = 50.</p>
            <p>2. Make dL/L equal to 2dT/T. Which slider had to move more, and what does that say about the dominant error source?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PhysicsUnitsAndMeasurementSim;
