'use client';
/**
 * C8_SciencePressureWindsStormsAndCyclonesSim (Class 8 Science)
 *
 * ELI5: Wind is simply air rushing from a high-pressure region to a
 * low-pressure one - the bigger the pressure difference, the harder the
 * blow. Over warm seas a big low pressure spins into a cyclone with an eye
 * of calm at its centre.
 */
import React, { useState } from 'react';

const STAGES = [
  { maxDp: 2, name: 'Calm', wind: 'under 12 km/h', color: '#94a3b8' },
  { maxDp: 8, name: 'Depression', wind: '12-50 km/h', color: '#38bdf8' },
  { maxDp: 16, name: 'Deep depression', wind: '50-62 km/h', color: '#818cf8' },
  { maxDp: 24, name: 'Cyclonic storm', wind: '62-88 km/h', color: '#f59e0b' },
  { maxDp: 999, name: 'Severe cyclonic storm', wind: 'over 88 km/h', color: '#e11d48' },
];

export function C8_SciencePressureWindsStormsAndCyclonesSim() {
  const [pHigh, setPHigh] = useState(1010);
  const [pLow, setPLow] = useState(996);
  const [showEye, setShowEye] = useState(true);

  const dp = Math.max(0, pHigh - pLow);
  // gradient wind: stronger pressure gradient = faster wind
  const wind = Math.round(Math.min(200, Math.sqrt(dp) * 12) * 10) / 10;
  const stage = STAGES.find((s) => dp < s.maxDp) || STAGES[STAGES.length - 1];

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">Pressure, Winds, Storms and Cyclones</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">The engine:</span> the Sun heats some regions
          more, warm air rises there, and pressure DROPS below it. Cooler, heavier air from the
          HIGH pressure region rushes in to fill the gap - we feel it as wind. Over warm oceans a
          deep low pressure starts spinning (Earth&apos;s rotation twists it) and can grow into a
          cyclone, feeding on evaporating sea water.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>High pressure region (hPa)</span><span className="font-mono text-emerald-600">{pHigh}</span></label>
            <input type="range" min={980} max={1040} value={pHigh} aria-label="high pressure" onChange={(e) => setPHigh(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Low pressure centre (hPa)</span><span className="font-mono text-rose-600">{pLow}</span></label>
            <input type="range" min={930} max={1020} value={pLow} aria-label="low pressure" onChange={(e) => setPLow(Number(e.target.value))} className="w-full mt-1 accent-rose-600" />
          </div>
          <button onClick={() => setShowEye((s) => !s)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${showEye ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {showEye ? 'Cyclone cross-section: ON' : 'Cyclone cross-section: OFF'}
          </button>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>pressure difference: <span className="font-bold">{dp} hPa</span></div>
            <div>wind speed: <span className="font-bold" style={{ color: stage.color }}>{wind} km/h</span></div>
            <div className="mt-1 font-sans text-xs">
              classification: <span className="font-bold" style={{ color: stage.color }}>{stage.name}</span> ({stage.wind})
            </div>
          </div>
          <div className="text-xs text-slate-500 leading-relaxed">
            Warning signs a cyclone is coming: falling barometer readings, strong winds turning
            direction, and a long high tide swell. Safety: move inland, store drinking water, never
            stand under trees or hoardings.
          </div>
        </div>

        <div className="p-2 bg-gradient-to-b from-gold-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 340 240" className="w-full">
            {/* pressure landscape with wind arrows */}
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill={stage.color} />
              </marker>
            </defs>
            <path d={`M 20 80 Q 80 60 170 ${80 + (1020 - pLow) * 0.1} Q 260 60 320 80`} fill="none" stroke="#64748b" strokeWidth={2} strokeDasharray="5 3" />
            <circle cx={170} cy={80 + (1020 - pLow) * 0.1} r={10} fill="#ef4444" opacity={0.8} />
            <text x={170} y={110} textAnchor="middle" fontSize="10" fill="#b91c1c">LOW {pLow}</text>
            <text x={40} y={65} fontSize="10" fill="#047857">HIGH {pHigh}</text>
            <text x={300} y={65} fontSize="10" fill="#047857">HIGH</text>
            {[-60, -30, 30, 60].map((off) => (
              <line
                key={off}
                x1={170 + off}
                y1={52}
                x2={170 + off * 0.45}
                y2={70 + (1020 - pLow) * 0.06}
                stroke={stage.color}
                strokeWidth={Math.min(4, 1 + dp / 8)}
                markerEnd="url(#arrow)"
                style={{ transition: 'all 300ms' }}
              />
            ))}
            <text x={170} y={135} textAnchor="middle" fontSize="10" fill="#475569">
              air slides down the pressure slope into the LOW
            </text>
            {showEye && (
              <>
                <text x={170} y={158} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">CYCLONE CROSS-SECTION</text>
                <ellipse cx={170} cy={200} rx={130} ry={16} fill="#7dd3fc" />
                <path d="M 40 200 Q 60 150 150 148 L 190 148 Q 280 150 300 200 Z" fill="#f8fafc" opacity={0.9} />
                <path d="M 150 148 Q 158 160 170 168 Q 182 160 190 148 Z" fill="#e0f2fe" />
                <circle cx={170} cy={168} r={9} fill="none" stroke={stage.color} strokeWidth={2} strokeDasharray="3 2" />
                <text x={170} y={171} textAnchor="middle" fontSize="8" fill={stage.color}>EYE</text>
                <text x={80} y={172} fontSize="9" fill="#475569">towering clouds</text>
                <text x={228} y={172} fontSize="9" fill="#475569">spiralling rainbands</text>
              </>
            )}
          </svg>
          <div className="px-2 pb-1 flex flex-wrap gap-1.5">
            {STAGES.map((s) => (
              <span key={s.name} className={`text-[10px] px-2 py-1 rounded-full font-bold ${s.name === stage.name ? 'text-white' : 'text-slate-500 bg-slate-100'}`} style={s.name === stage.name ? { background: s.color } : {}}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find the smallest pressure difference that crosses into "Cyclonic storm". Double it - does the wind double too? (Clue: square root!)</li>
          <li>Set pHigh to 1000 and drag pLow down: at what reading does it become a SEVERE storm? That deep low is what destroyed homes in Odisha in 2019 (Fani).</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_SciencePressureWindsStormsAndCyclonesSim;
