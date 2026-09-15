/**
 * C6 Science -- Temperature and its Measurement
 *
 * One chapter concept: temperature tells us HOW HOT something is, and
 * we read it on a thermometer scale. The same temperature can be
 * written in Celsius or Fahrenheit (F = C x 9/5 + 32). A clinical
 * thermometer only reads 35-42 degrees C -- use the laboratory one
 * for anything else. And temperature is NOT the same as heat energy:
 * a bucket and a cup at 50 C hold the same temperature, but the
 * bucket holds far more heat.
 *
 * Interaction model: slide the burner to heat or cool the beaker, and
 * watch the mercury column climb, the ice melt, and the water boil.
 * Switch between the lab and clinical thermometer and try to break
 * the rules.
 */
import React, { useState } from 'react';

// lab thermometer tube: -10 C at y=250, 110 C at y=50
const tempToY = (t: number): number => 250 - ((t + 10) / 120) * 200;

function C6_ScienceTemperatureAndItsMeasurementSim() {
  const [temp, setTemp] = useState(30);
  const [mode, setMode] = useState<'lab' | 'clinical'>('lab');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const reset = () => {
    setTemp(30);
    setMode('lab');
    setUnit('C');
  };

  const f = Math.round(((temp * 9) / 5 + 32) * 10) / 10;
  const overRange = mode === 'clinical' && (temp < 35 || temp > 42);
  const state = temp <= 0 ? 'ice (solid)' : temp >= 100 ? 'boiling!' : 'water (liquid)';

  // column for the shown thermometer (lab scale or clinical 35-42 scale)
  const clinicalColY = overRange ? 70 : 250 - ((temp - 35) / 7) * 180;
  const shownColY = mode === 'lab' ? tempToY(temp) : clinicalColY;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-red-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-red-700">Temperature and its measurement</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        The <b>thermometer</b> does not guess -- its liquid column grows exactly with temperature. Heat the
        beaker, watch 0&deg;C and 100&deg;C arrive, then switch to the <b>clinical</b> thermometer and see why
        it refuses to measure your boiling water.
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        <button onClick={() => setMode(mode === 'lab' ? 'clinical' : 'lab')} className={'px-4 py-2 rounded-xl text-xs font-black transition-colors ' + (mode === 'lab' ? 'bg-red-600 text-white' : 'bg-pink-500 text-white')}>
          {mode === 'lab' ? 'Laboratory thermometer (-10 to 110)' : 'Clinical thermometer (35 to 42)'}
        </button>
        <button onClick={() => setUnit(unit === 'C' ? 'F' : 'C')} className="px-4 py-2 rounded-xl text-xs font-black bg-sky-500 text-white hover:bg-sky-600 transition-colors">
          Show in &deg;{unit === 'C' ? 'F' : 'C'}
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_250px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-red-100 bg-red-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#fef2f2" />
            {/* burner flame scales with temperature */}
            <rect x="300" y="250" width="160" height="14" rx="4" fill="#57534e" />
            {temp > -10 && [0, 1, 2].map((i) => (
              <path key={i} d={'M ' + (345 + i * 26) + ' 248 q -8 -' + (14 + Math.max(0, temp) / 4) + ' 8 -' + (22 + Math.max(0, temp) / 3) + ' q 12 12 6 ' + (22 + Math.max(0, temp) / 3)} fill="#fb923c" opacity="0.85" />
            ))}
            {/* beaker + water */}
            <path d="M 310 120 L 310 248 L 450 248 L 450 120" stroke="#475569" strokeWidth="5" fill="none" />
            <rect x="312" y="150" width="136" height="96" fill="#bfdbfe" opacity="0.75" />
            {temp <= 0 && <rect x="312" y="150" width="136" height="96" fill="#e0f2fe" opacity="0.95" />}
            {temp <= 0 && <text x="380" y="205" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0369a1">ICE</text>}
            {temp >= 100 &&
              [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={330 + i * 28} cy={160 - (i % 2) * 14} r="5" fill="#f8fafc" opacity="0.9" />)}
            {temp >= 100 && [0, 1, 2].map((i) => <path key={'v' + i} d={'M ' + (340 + i * 40) + ' 118 q 10 -16 0 -34'} stroke="#cbd5e1" strokeWidth="4" fill="none" opacity="0.8" />)}
            {/* thermometer */}
            <g>
              <rect x="90" y="40" width="26" height="222" rx="13" fill="#fee2e2" stroke="#9f1239" strokeWidth="3" />
              <circle cx="103" cy="268" r="17" fill="#dc2626" />
              <rect x="95" y={shownColY} width="16" height={272 - shownColY} rx="8" fill="#dc2626" style={{ transition: 'all 0.25s ease' }} />
              {mode === 'lab'
                ? [-10, 0, 20, 40, 60, 80, 100].map((t) => (
                    <g key={t}>
                      <line x1="116" y1={tempToY(t)} x2="132" y2={tempToY(t)} stroke="#9f1239" strokeWidth="2" />
                      <text x="136" y={tempToY(t) + 4} fontSize="11" fontWeight="bold" fill="#9f1239">{t}&deg;</text>
                    </g>
                  ))
                : [35, 37, 39, 41].map((t) => (
                    <g key={t}>
                      <line x1="116" y1={250 - ((t - 35) / 7) * 180} x2="132" y2={250 - ((t - 35) / 7) * 180} stroke="#be185d" strokeWidth="2" />
                      <text x="136" y={250 - ((t - 35) / 7) * 180 + 4} fontSize="11" fontWeight="bold" fill="#be185d">{t}&deg;</text>
                    </g>
                  ))}
              {overRange && <text x="160" y="60" fontSize="13" fontWeight="900" fill="#be123c">OVER RANGE -- a clinical thermometer cannot read this!</text>}
            </g>
            <text x="380" y="40" textAnchor="middle" fontSize="15" fontWeight="900" fill="#7f1d1d">{state}</text>
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Burner heat</span>
              <span className="text-red-700 font-black">{temp}&deg;C</span>
            </label>
            <input type="range" min={-10} max={110} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full accent-red-500" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-2 rounded-xl bg-slate-100 text-center">
              <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold">Reading</div>
              <div className="text-lg font-black text-red-700">{unit === 'C' ? temp + ' \u00B0C' : f + ' \u00B0F'}</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-100 text-center">
              <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold">Other scale</div>
              <div className="text-lg font-black text-sky-700">{unit === 'C' ? f + ' \u00B0F' : temp + ' \u00B0C'}</div>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
            Same temperature, different heat: the cup (1 glass) and the bucket (10 glasses) are BOTH at {temp}&deg;C -- but the bucket stores 10 times more heat energy.
          </div>
          <div className="p-2 rounded-xl bg-sky-50 border-2 border-sky-200 text-[11px] text-sky-800 font-semibold">
            {overRange ? 'Rule: the clinical thermometer only reads fevers, 35 to 42.' : 'Rule: read the thermometer with your eye LEVEL with the liquid top.'}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
        <div className="text-sm font-black text-rose-800">Misconception buster</div>
        <div className="text-xs text-rose-700 mt-0.5">
          "0&deg; means there is no temperature." Zero is just a mark on the scale -- at 0&deg;C water freezes, and the thermometer still reads it perfectly. Temperature never "runs out".
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Set the burner so water just boils. Write the reading in both scales -- how do the two numbers compare at 100 and at 37?</li>
          <li>Switch to the clinical thermometer and drag the heat up. At which temperature does it go OVER RANGE, and why can it not be used for a beaker?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceTemperatureAndItsMeasurementSim };
export default C6_ScienceTemperatureAndItsMeasurementSim;
