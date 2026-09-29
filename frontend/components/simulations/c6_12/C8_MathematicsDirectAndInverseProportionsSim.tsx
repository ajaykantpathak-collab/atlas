'use client';
/**
 * C8_MathematicsDirectAndInverseProportionsSim (Class 8 Maths)
 *
 * ELI5: Two quantities are in DIRECT proportion when they multiply up together
 * (their ratio stays constant) - like speed and distance. They are in INVERSE
 * proportion when one goes up as the other goes down (their product stays
 * constant) - like workers and days to finish a job.
 */
import React, { useMemo, useState } from 'react';

type Mode = 'direct' | 'inverse';

export function C8_MathematicsDirectAndInverseProportionsSim() {
  const [mode, setMode] = useState<Mode>('direct');
  const [speed, setSpeed] = useState(40); // km/h (direct constant)
  const [hours, setHours] = useState(3); // 1..8
  const [job, setJob] = useState(60); // worker-days total (inverse constant)
  const [workers, setWorkers] = useState(6); // 1..15

  const distance = speed * hours;
  const daysFrac = job / workers;
  const daysWhole = Math.ceil(daysFrac);
  const product = workers * daysFrac;

  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    if (mode === 'direct') {
      for (let t = 1; t <= 8; t++) pts.push({ x: t, y: speed * t });
    } else {
      for (let w = 1; w <= 15; w++) pts.push({ x: w, y: job / w });
    }
    return pts;
  }, [mode, speed, job]);

  // chart mapping
  const chartPts = points.map((p) => ({
    cx: mode === 'direct' ? 40 + (p.x / 8) * 260 : 40 + ((p.x - 1) / 14) * 260,
    cy: 180 - (p.y / (mode === 'direct' ? speed * 8 : job)) * 150,
    raw: p,
  }));
  const main = mode === 'direct' ? { cx: 40 + (hours / 8) * 260, cy: 180 - (distance / (speed * 8)) * 150 } : { cx: 40 + ((workers - 1) / 14) * 260, cy: 180 - (daysFrac / job) * 150 };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">Direct and Inverse Proportions</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">How to tell them apart:</span> in direct
          proportion y/x stays constant (double one, double the other) and the graph is a straight
          line through the origin. In inverse proportion x x y stays constant (double one, halve the
          other) and the graph sweeps down like a slide.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setMode('direct')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'direct' ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Direct: speed and distance
        </button>
        <button onClick={() => setMode('inverse')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'inverse' ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Inverse: workers and days
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          {mode === 'direct' ? (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Constant speed k (km/h)</span><span className="font-mono text-emerald-600">{speed}</span></label>
                <input type="range" min={10} max={80} step={5} value={speed} aria-label="speed" onChange={(e) => setSpeed(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Time t (hours)</span><span className="font-mono text-gold-600">{hours}</span></label>
                <input type="range" min={1} max={8} value={hours} aria-label="hours" onChange={(e) => setHours(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                <div>distance = speed x time = {speed} x {hours} = <span className="text-gold-700 font-bold">{distance} km</span></div>
                <div className="mt-1 text-slate-500">ratio d/t = {distance / hours} km per hour (constant!)</div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Total job k (worker-days)</span><span className="font-mono text-emerald-600">{job}</span></label>
                <input type="range" min={20} max={120} step={5} value={job} aria-label="job size" onChange={(e) => setJob(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Workers n</span><span className="font-mono text-gold-600">{workers}</span></label>
                <input type="range" min={1} max={15} value={workers} aria-label="workers" onChange={(e) => setWorkers(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                <div>days = k / n = {job} / {workers} = <span className="text-gold-700 font-bold">{Math.round(daysFrac * 100) / 100} days</span> (plan {daysWhole} days)</div>
                <div className="mt-1 text-slate-500">product n x days = {Math.round(product * 100) / 100} (constant!)</div>
              </div>
            </>
          )}
          <div className="text-xs text-slate-500">
            {mode === 'direct'
              ? 'Slide time: each extra hour adds the SAME distance - that is why the dots line up straight.'
              : 'Slide workers: doubling workers halves the days - the curve dives steeply then flattens.'}
          </div>
        </div>

        <div className="p-2 bg-gradient-to-br from-gold-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 320 210" className="w-full">
            <line x1={40} y1={180} x2={305} y2={180} stroke="#94a3b8" />
            <line x1={40} y1={180} x2={40} y2={15} stroke="#94a3b8" />
            {chartPts.map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={3.5} fill="#94a3b8" opacity={0.55} />
            ))}
            {mode === 'direct' && (
              <line x1={40} y1={180} x2={300} y2={180 - 150} stroke="#6366f1" strokeWidth={2} opacity={0.6} />
            )}
            <circle cx={main.cx} cy={main.cy} r={7} fill={mode === 'direct' ? '#6366f1' : '#ec4899'} stroke="#fff" strokeWidth={2} style={{ transition: 'all 300ms' }} />
            <text x={main.cx} y={main.cy - 12} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
              {mode === 'direct' ? `${distance} km` : `${Math.round(daysFrac * 10) / 10} d`}
            </text>
            <text x={170} y={202} textAnchor="middle" fontSize="11" fill="#475569">
              {mode === 'direct' ? 'time (h)' : 'workers'}
            </text>
            <text x={14} y={100} fontSize="11" fill="#475569" transform="rotate(-90 14 100)">
              {mode === 'direct' ? 'distance (km)' : 'days'}
            </text>
          </svg>
          <div className="px-2 text-xs text-slate-500">
            Grey dots = all possible pairs; the big dot = your current choice.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Direct mode: set speed 60. Predict the distance at 5 h, then check. Does d/t stay 60 for every t?</li>
          <li>Inverse mode: find how many workers finish 60 worker-days in exactly 4 days. Then double the workers - what happens to the days?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsDirectAndInverseProportionsSim;
