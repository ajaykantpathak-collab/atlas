'use client';
/**
 * C8_ScienceSomeNaturalPhenomenaSim (Class 8 Science)
 *
 * ELI5: Lightning is a giant electric spark between clouds and the ground,
 * and earthquakes are the shaking of Earth's crust when plates slip. Both
 * cannot be prevented, but their dangers CAN be: understand them and you know
 * exactly where to stand and what to do.
 */
import React, { useState } from 'react';

const MAGNITUDE_INFO = [
  { max: 3, label: 'micro - recorded but rarely felt', color: '#38bdf8' },
  { max: 5, label: 'minor to light - hanging objects swing', color: '#22c55e' },
  { max: 6, label: 'moderate - plaster cracks, objects fall', color: '#f59e0b' },
  { max: 7, label: 'strong - buildings damaged', color: '#f97316' },
  { max: 8, label: 'major - severe destruction', color: '#e11d48' },
  { max: 99, label: 'great - devastation over huge areas', color: '#7f1d1d' },
];

export function C8_ScienceSomeNaturalPhenomenaSim() {
  const [tab, setTab] = useState<'quake' | 'safety'>('quake');
  const [magnitude, setMagnitude] = useState(4.5);
  const [depth, setDepth] = useState(15);
  const [answer, setAnswer] = useState<Record<string, boolean>>({});

  const info = MAGNITUDE_INFO.find((m) => magnitude < m.max) || MAGNITUDE_INFO[5];
  const energy = Math.pow(10, 1.5 * magnitude) / 1e6; // relative TNT tons scale
  const shakePct = Math.min(100, Math.pow(10, magnitude - 1) / 10);

  const SAFETY: { item: string; safe: boolean; why: string }[] = [
    { item: 'DROP under a sturdy table during shaking', safe: true, why: 'protects your head from falling objects' },
    { item: 'Run down a crowded staircase while the building shakes', safe: false, why: 'falls and trampling injure more people than the quake itself' },
    { item: 'Stay away from windows and mirrors', safe: true, why: 'shattering glass is a top cause of cuts' },
    { item: 'Take shelter under a tree when outdoors', safe: false, why: 'trees, poles and hoardings can fall - stay in the open' },
    { item: 'If driving, stop in an open place away from bridges', safe: true, why: 'bridges and flyovers are the first to crack' },
    { item: 'Use the lift to exit quickly', safe: false, why: 'lifts can get stuck when power fails - use stairs AFTER shaking stops' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-amber-700">Some Natural Phenomena: Earthquakes Unplugged</h1>

      <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-amber-700">Inside the story:</span> Earth&apos;s crust is
          jigsaw plates floating on semi-molten rock. Stress builds where plates press; when the
          rock finally SNAPS, energy radiates as seismic waves from the focus - we feel the
          earthquake at the surface above (epicentre). Size is measured on the Richter scale, where
          each +1 step means about 32 times MORE energy released.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['quake', 'Richter scale lab'], ['safety', 'Safe or unsafe?']] as ['quake' | 'safety', string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === t ? 'bg-amber-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'quake' ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Richter magnitude</span><span className="font-mono text-rose-600">{magnitude.toFixed(1)}</span></label>
              <input type="range" min={1} max={9} step={0.1} value={magnitude} aria-label="magnitude" onChange={(e) => setMagnitude(Number(e.target.value))} className="w-full mt-1 accent-rose-600" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Focus depth (km)</span><span className="font-mono text-indigo-600">{depth}</span></label>
              <input type="range" min={2} max={300} value={depth} aria-label="focus depth" onChange={(e) => setDepth(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[['Bhuj 2001 (6.2)', 6.2, 16], ['Japan 2011 (9.0)', 9, 30], ['Tremor', 3.5, 8]].map(([label, m, d]) => (
                <button key={label as string} onClick={() => { setMagnitude(m as number); setDepth(d as number); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all">
                  {label as string}
                </button>
              ))}
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
              <div style={{ color: info.color }} className="font-bold">{info.label}</div>
              <div className="text-xs text-slate-500 mt-1">energy vs magnitude 1: about {Math.round(energy).toLocaleString('en-IN')} units</div>
              <div className="text-xs text-slate-500">one step up = 10x bigger waves, ~32x energy</div>
            </div>
          </div>
          <div className="p-2 bg-gradient-to-b from-amber-50 to-white rounded-2xl border border-slate-200">
            <svg viewBox="0 0 340 250" className="w-full">
              {/* seismogram */}
              <polyline
                points={Array.from({ length: 60 }).map((_, i) => {
                  const amp = i < 12 ? 2 : Math.max(2, shakePct * (Math.exp(-i / 18)) * 2.2);
                  const y = 55 + Math.sin(i * 2.7) * amp + Math.sin(i * 0.9) * amp * 0.4;
                  return `${10 + i * 5.3},${Math.max(5, Math.min(105, y))}`;
                }).join(' ')}
                fill="none"
                stroke="#334155"
                strokeWidth={1.5}
              />
              <text x={170} y={16} textAnchor="middle" fontSize="10" fill="#475569">seismograph trace (higher spikes = stronger quake)</text>
              {/* underground cross-section */}
              <rect x={20} y={150} width={300} height={12} fill="#a16207" opacity={0.35} />
              <text x={170} y={160} textAnchor="middle" fontSize="8" fill="#78350f">surface</text>
              {[40, 120, 200, 280].map((x, i) => (
                <path key={x} d={`M 170 ${165 + depth * 0.25} Q 120 ${180 + depth * 0.12} ${x} 158`} fill="none" stroke={info.color} strokeWidth={2} opacity={0.8} style={{ transition: 'all 300ms' }} />
              ))}
              <circle cx={170} cy={165 + depth * 0.25} r={8} fill="#e11d48" style={{ transition: 'cy 300ms' }} />
              <text x={186} y={169 + depth * 0.25} fontSize="9" fill="#9f1239">focus (depth {depth} km)</text>
              <circle cx={170} cy={156} r={5} fill="#f59e0b" />
              <text x={186} y={148} fontSize="9" fill="#b45309">epicentre</text>
              <text x={170} y={240} textAnchor="middle" fontSize="9" fill="#475569">shallower focus = stronger shaking at the surface</text>
            </svg>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">EARTHQUAKE SAFETY - JUDGE EACH ACTION</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {SAFETY.map((s, i) => {
              const chosen = answer[i];
              return (
                <div key={i} className={`p-3 rounded-xl border text-sm ${chosen === undefined ? 'bg-white border-slate-200' : chosen === s.safe ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'}`}>
                  <div className="font-semibold text-slate-700">{i + 1}. {s.item}</div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setAnswer((a) => ({ ...a, [i]: true }))} className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all">
                      SAFE
                    </button>
                    <button onClick={() => setAnswer((a) => ({ ...a, [i]: false }))} className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-700 hover:bg-rose-200 transition-all">
                      UNSAFE
                    </button>
                  </div>
                  {chosen !== undefined && (
                    <div className={`mt-2 text-xs font-bold ${chosen === s.safe ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {chosen === s.safe ? 'Correct - ' : 'Actually - '}{s.why}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button onClick={() => setAnswer({})} className="mt-3 px-4 py-2 rounded-xl text-sm font-bold bg-slate-200 hover:bg-slate-300 transition-all">
            Reset quiz
          </button>
        </div>
      )}

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Compare magnitude 5 and 7: the second is only 2 points more - how many times more energy? (about 32 x 32)</li>
          <li>Keep magnitude fixed at 6.5 and slide the depth: which depth would you rather live above, 5 km or 300 km? Why?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceSomeNaturalPhenomenaSim;
