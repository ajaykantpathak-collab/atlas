'use client';
/**
 * C8_MathematicsPowerPlaySim (Class 8 Maths)
 *
 * ELI5: Powers of 2 grow shockingly fast. Fold a paper 10 times and it is
 * 1024 sheets thick. Fold it 42 times and it would reach the MOON. This is
 * exponential growth - the doubling story that also powers population growth
 * and virus spreads.
 */
import React, { useState } from 'react';

const THRESHOLDS: { mm: number; label: string }[] = [
  { mm: 30, label: 'a ruler' },
  { mm: 170, label: 'a pencil' },
  { mm: 1000, label: 'a chair (1 m)' },
  { mm: 28000, label: 'a 10-storey building' },
  { mm: 8848600, label: 'Mount Everest!' },
  { mm: 384400000, label: 'the MOON (384,400 km)' },
];

export function C8_MathematicsPowerPlaySim() {
  const [folds, setFolds] = useState(10);
  const [thickness, setThickness] = useState(0.1); // mm per sheet
  const [mode, setMode] = useState<'paper' | 'coins'>('paper');

  const layers = Math.pow(2, folds);
  const heightMM = layers * thickness;
  const km = heightMM / 1e6;

  // coin doubling: total coins after folds days, 1 paisa doubling
  const rupees = (layers - 1) / 100;

  const taller = THRESHOLDS.filter((t) => heightMM >= t.mm);
  const next = THRESHOLDS.find((t) => heightMM < t.mm);

  // log-scale bar (10^(log10(h)) mapped)
  const logH = Math.log10(Math.max(heightMM, 0.01));
  const barPct = Math.max(2, Math.min(100, ((logH + 1) / 9) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Power Play: The Doubling Machine</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Exponential growth:</span> every fold doubles
          the stack, so height = thickness x 2^folds. Doubling feels slow at first and impossible
          soon after - that is the surprise of powers. Watch the height bar jump a HUGE distance
          with just one more fold near the end.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['paper', 'Fold a paper'], ['coins', 'Doubling pocket money']] as const).map(([mm, label]) => (
          <button key={mm} onClick={() => setMode(mm)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === mm ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>{mode === 'paper' ? 'Number of folds' : 'Days of doubling'}</span>
              <span className="font-mono text-indigo-600">{folds}</span>
            </label>
            <input type="range" min={0} max={42} value={folds} aria-label="folds" onChange={(e) => setFolds(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
          </div>
          {mode === 'paper' && (
            <div>
              <label className="text-xs font-semibold text-slate-500 flex justify-between">
                <span>Sheet thickness (mm)</span>
                <span className="font-mono text-emerald-600">{thickness}</span>
              </label>
              <input type="range" min={0.05} max={1} step={0.05} value={thickness} aria-label="sheet thickness" onChange={(e) => setThickness(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={() => setFolds((f) => Math.min(42, f + 1))} className="px-4 py-2 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-400 transition-all">
              One more fold!
            </button>
            <button onClick={() => setFolds(0)} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-200 hover:bg-slate-300 transition-all">
              Reset
            </button>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>layers = 2^{folds} = <span className="text-indigo-700 font-bold">{layers.toLocaleString('en-IN')}</span></div>
            {mode === 'paper' ? (
              <>
                <div>height = {thickness} x 2^{folds} = {Math.round(heightMM).toLocaleString('en-IN')} mm</div>
                <div className="text-xs text-slate-500 mt-1">= {km >= 1 ? `${Math.round(km).toLocaleString('en-IN')} km` : `${Math.round(heightMM * 10) / 10} mm`}</div>
              </>
            ) : (
              <div>money = (2^{folds} - 1) paise = <span className="text-indigo-700 font-bold">Rs {Math.round(rupees * 100) / 100}</span> {rupees >= 10000000 ? '(crores!)' : ''}</div>
            )}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500">HEIGHT ON A MILESTONE LADDER (log scale)</p>
          {mode === 'paper' ? (
            <>
              <div className="mt-2 h-7 rounded-lg bg-slate-200 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-600 flex items-center justify-end pr-2" style={{ width: `${barPct}%`, transition: 'width 350ms' }}>
                  {barPct > 25 && <span className="text-white text-xs font-bold">{Math.round(heightMM).toLocaleString('en-IN')} mm</span>}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {THRESHOLDS.map((t) => (
                  <div key={t.label} className={`text-xs px-2 py-1 rounded-lg border transition-all ${heightMM >= t.mm ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold' : 'bg-white border-slate-200 text-slate-400'}`}>
                    {heightMM >= t.mm ? 'PASSED: ' : 'ahead: '}
                    {t.label} ({t.mm >= 1e6 ? `${t.mm / 1e6} km` : t.mm >= 1000 ? `${t.mm / 1000} m` : `${t.mm} mm`})
                  </div>
                ))}
              </div>
              {next && (
                <div className="mt-2 text-xs text-slate-500">
                  Next milestone {next.label} needs about {Math.ceil(Math.log2(next.mm / thickness))} folds total.
                </div>
              )}
            </>
          ) : (
            <>
              <svg viewBox="0 0 340 200" className="w-full mt-2">
                {[0.1, 1, 10, 100].map((dec) => {
                  const y = 180 - (dec / 100) * 160;
                  return (
                    <g key={dec}>
                      <line x1={30} y1={y} x2={330} y2={y} stroke="#e2e8f0" />
                      <text x={2} y={y + 4} fontSize="9" fill="#94a3b8">Rs{dec >= 1 ? dec + 'k+' : dec * 1000}</text>
                    </g>
                  );
                })}
                {Array.from({ length: Math.min(folds, 20) }).map((_, i) => {
                  const v = (Math.pow(2, i + 1) - 1) / 100000;
                  const h = Math.min(160, v * 160);
                  return <rect key={i} x={34 + i * 14.5} y={180 - h} width={11} height={h} fill="#7c3aed" opacity={0.85} style={{ transition: 'height 300ms' }} />;
                })}
                <text x={185} y={198} textAnchor="middle" fontSize="10" fill="#475569">money after each day of doubling (paise to rupees)</text>
              </svg>
              <div className="mt-2 text-xs text-slate-500">
                Days 1-10 look flat, days 15-20 explode. {taller.length >= 0 ? `At day ${folds} you hold Rs ${Math.round(rupees).toLocaleString('en-IN')}.` : ''}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find the exact fold count where the paper passes Mount Everest, then the Moon. Only how many folds?</li>
          <li>Pocket-money mode: on which day does the total first cross Rs 1000? Predict, then slide to check.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsPowerPlaySim;
