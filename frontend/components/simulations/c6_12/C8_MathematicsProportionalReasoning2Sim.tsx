'use client';
/**
 * C8_MathematicsProportionalReasoning2Sim (Class 8 Maths)
 *
 * ELI5: Inverse proportional reasoning: a FIXED total gets shared, so if one
 * quantity grows, the other must shrink so the PRODUCT stays constant.
 * More workers -> fewer days. Faster speed -> less time. Workers x days and
 * speed x time are the fixed totals you must sniff out.
 */
import React, { useState } from 'react';

type Mode = 'work' | 'travel';

export function C8_MathematicsProportionalReasoning2Sim() {
  const [mode, setMode] = useState<Mode>('work');
  const [totalWork, setTotalWork] = useState(60); // worker-days
  const [workers, setWorkers] = useState(6);
  const [distance, setDistance] = useState(240); // km
  const [speed, setSpeed] = useState(60);

  const daysExact = totalWork / workers;
  const days = Math.ceil(daysExact * 100) / 100;
  const timeH = Math.round((distance / speed) * 100) / 100;
  const product = Math.round(workers * daysExact * 10) / 10;
  const product2 = Math.round(speed * timeH * 10) / 10;

  const curve = Array.from({ length: 12 }).map((_, i) => {
    const x = i + 1;
    const y = mode === 'work' ? totalWork / x : distance / x;
    const cx = 40 + (x / 12) * 260;
    const maxY = mode === 'work' ? totalWork : distance / 1;
    const cy = 180 - (y / maxY) * 150;
    const cur = mode === 'work' ? workers : speed;
    return { cx, cy, x, active: x === cur };
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Proportional Reasoning 2: Sharing a Fixed Total</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">The inverse test:</span> ask "is something
          FIXED no matter what?" If yes, the two quantities are inversely proportional: x1 x y1 =
          x2 x y2. Builders use it to quote deadlines; drivers use it to plan arrival times. Slide
          the active quantity and watch the partner compensate so the product never budges.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setMode('work')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'work' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Work: workers and days
        </button>
        <button onClick={() => setMode('travel')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'travel' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Travel: speed and time
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          {mode === 'work' ? (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Total work (worker-days)</span><span className="font-mono text-emerald-600">{totalWork}</span></label>
                <input type="range" min={12} max={144} step={6} value={totalWork} aria-label="total work" onChange={(e) => setTotalWork(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Workers on the job</span><span className="font-mono text-indigo-600">{workers}</span></label>
                <input type="range" min={1} max={12} value={workers} aria-label="workers" onChange={(e) => setWorkers(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                <div>days = {totalWork} / {workers} = <span className="text-indigo-700 font-bold">{days}</span></div>
                <div className="mt-1 text-emerald-700">check product: {workers} x {days} = {product} (fixed!)</div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Distance (km)</span><span className="font-mono text-emerald-600">{distance}</span></label>
                <input type="range" min={60} max={480} step={20} value={distance} aria-label="distance" onChange={(e) => setDistance(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Speed (km/h)</span><span className="font-mono text-indigo-600">{speed}</span></label>
                <input type="range" min={10} max={120} step={5} value={speed} aria-label="speed" onChange={(e) => setSpeed(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                <div>time = {distance} / {speed} = <span className="text-indigo-700 font-bold">{timeH} h</span></div>
                <div className="mt-1 text-emerald-700">check product: {speed} x {timeH} = {product2} km (fixed!)</div>
              </div>
            </>
          )}
          <div className="flex flex-wrap gap-2">
            {(mode === 'work' ? [2, 4, 8] : [40, 60, 80]).map((v) => (
              <button
                key={v}
                onClick={() => (mode === 'work' ? setWorkers(v) : setSpeed(v))}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all"
              >
                {mode === 'work' ? `${v} workers` : `${v} km/h`}
              </button>
            ))}
          </div>
        </div>

        <div className="p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 320 210" className="w-full">
            <line x1={40} y1={180} x2={305} y2={180} stroke="#94a3b8" />
            <line x1={40} y1={180} x2={40} y2={15} stroke="#94a3b8" />
            {curve.map((p) => (
              <circle
                key={p.x}
                cx={p.cx}
                cy={p.cy}
                r={p.active ? 7 : 3}
                fill={p.active ? '#ec4899' : '#94a3b8'}
                opacity={p.active ? 1 : 0.55}
                style={{ transition: 'all 300ms' }}
              />
            ))}
            <text x={170} y={202} textAnchor="middle" fontSize="11" fill="#475569">
              {mode === 'work' ? 'workers' : 'speed (km/h)'}
            </text>
            <text x={14} y={100} fontSize="11" fill="#475569" transform="rotate(-90 14 100)">
              {mode === 'work' ? 'days' : 'hours'}
            </text>
          </svg>
          <div className="px-2 text-xs text-slate-500">
            The pink dot is your choice; grey dots show the whole inverse curve x = total / choice.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>A wall needs 60 worker-days. How many workers finish it in exactly 5 days? Set it and verify the product stays 60.</li>
          <li>A bus covers 240 km at 60 km/h in 4 h. How fast must it go to arrive in 3 h? Predict, then check with the sliders.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsProportionalReasoning2Sim;
