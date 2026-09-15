'use client';
/**
 * C8_MathematicsTalesByDotsAndLinesSim (Class 8 Maths)
 *
 * ELI5: Bar graphs compare categories; line graphs tell a story of change
 * over time. And the mean is a BALANCING ACT: it is the exact height where
 * the extra amounts above it exactly cancel the shortfalls below it, so the
 * deviations sum to zero.
 */
import React, { useMemo, useState } from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function C8_MathematicsTalesByDotsAndLinesSim() {
  const [temps, setTemps] = useState<number[]>([24, 26, 29, 27, 25, 31, 33]);
  const [chart, setChart] = useState<'bar' | 'line'>('bar');

  const mean = useMemo(() => temps.reduce((s, t) => s + t, 0) / temps.length, [temps]);
  const deviations = temps.map((t) => Math.round((t - mean) * 100) / 100);
  const devSum = Math.round(deviations.reduce((s, d) => s + d, 0) * 100) / 100;
  const max = Math.max(...temps);
  const min = Math.min(...temps);
  const range = max - min;
  const hottestDay = DAYS[temps.indexOf(max)];
  const rising = temps[temps.length - 1] > temps[0];

  const W = 300;
  const H = 170;
  const mapY = (t: number) => H - 20 - ((t - 15) / 25) * (H - 40);
  const mapX = (i: number) => 30 + (i / (DAYS.length - 1)) * (W - 50);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Tales by Dots and Lines: A Week of Weather</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Read the story:</span> bars make each day
          easy to compare; a line makes the TREND jump out. The dashed green line is the mean - the
          balance point of the whole week. Days above it lend their extra heat; days below borrow
          exactly that much, so the ups and downs cancel to zero.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setChart('bar')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${chart === 'bar' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Bar graph
        </button>
        <button onClick={() => setChart('line')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${chart === 'line' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          Line graph
        </button>
        <button onClick={() => setTemps([24, 26, 29, 27, 25, 31, 33])} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 transition-all">
          Reset week
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 300 180" className="w-full">
            <line x1={25} y1={H - 20} x2={290} y2={H - 20} stroke="#94a3b8" />
            {[15, 20, 25, 30, 35, 40].map((t) => (
              <g key={t}>
                <line x1={25} y1={mapY(t)} x2={290} y2={mapY(t)} stroke="#eef2f7" />
                <text x={2} y={mapY(t) + 4} fontSize="9" fill="#94a3b8">{t}</text>
              </g>
            ))}
            {chart === 'bar'
              ? temps.map((t, i) => {
                  const y = mapY(t);
                  return (
                    <g key={i}>
                      <rect x={mapX(i) - 14} y={y} width={28} height={H - 20 - y} rx={4} fill={t === max ? '#ec4899' : t === min ? '#38bdf8' : '#6366f1'} opacity={0.9} style={{ transition: 'all 250ms' }} />
                      <text x={mapX(i)} y={y - 4} textAnchor="middle" fontSize="9" fill="#334155" fontWeight="bold">{t}</text>
                      <text x={mapX(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="#475569">{DAYS[i]}</text>
                    </g>
                  );
                })
              : (
                <>
                  <polyline
                    points={temps.map((t, i) => `${mapX(i)},${mapY(t)}`).join(' ')}
                    fill="none"
                    stroke="#4338ca"
                    strokeWidth={2.5}
                    style={{ transition: 'all 250ms' }}
                  />
                  {temps.map((t, i) => (
                    <g key={i}>
                      <circle cx={mapX(i)} cy={mapY(t)} r={4.5} fill={t === max ? '#ec4899' : t === min ? '#38bdf8' : '#4338ca'} />
                      <text x={mapX(i)} y={mapY(t) - 8} textAnchor="middle" fontSize="9" fill="#334155" fontWeight="bold">{t}</text>
                      <text x={mapX(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="#475569">{DAYS[i]}</text>
                    </g>
                  ))}
                </>
              )}
            <line x1={25} y1={mapY(mean)} x2={290} y2={mapY(mean)} stroke="#059669" strokeDasharray="6 4" strokeWidth={1.5} />
            <text x={252} y={mapY(mean) - 4} fontSize="10" fill="#059669" fontWeight="bold">mean {Math.round(mean * 10) / 10}</text>
          </svg>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">EDIT THE WEEK (+ / - each day)</p>
          {DAYS.map((d, i) => (
            <div key={d} className="flex items-center gap-2 mb-1.5">
              <span className="w-9 text-xs font-bold text-slate-500">{d}</span>
              <button onClick={() => setTemps((t) => t.map((v, j) => (j === i ? Math.max(15, v - 1) : v)))} className="w-7 h-7 rounded-md bg-slate-200 hover:bg-slate-300 text-sm font-bold transition-all">-</button>
              <span className="w-10 text-center font-mono text-sm">{temps[i]}</span>
              <button onClick={() => setTemps((t) => t.map((v, j) => (j === i ? Math.min(40, v + 1) : v)))} className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-sm font-bold transition-all">+</button>
              <span className={`ml-auto font-mono text-xs ${deviations[i] >= 0 ? 'text-rose-600' : 'text-sky-600'}`}>
                {deviations[i] >= 0 ? '+' : ''}{deviations[i]}
              </span>
            </div>
          ))}
          <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>mean = sum / 7 = {temps.reduce((s, t) => s + t, 0)} / 7 = <span className="text-indigo-700 font-bold">{Math.round(mean * 100) / 100}</span></div>
            <div>range = {max} - {min} = <span className="text-indigo-700 font-bold">{range}</span></div>
            <div className="text-emerald-700">sum of deviations = <span className="font-bold">{devSum}</span> (the balancing act!)</div>
          </div>
          <div className="mt-2 text-xs text-slate-600 font-semibold">
            Story: hottest on {hottestDay} ({max} deg); week ends {rising ? 'warmer than it started' : 'cooler than it started'}.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Raise Thursday by +3 and watch the mean climb by exactly how much? Why only 3/7 of a degree per day edited?</li>
          <li>Make the deviations column show one big positive and two negatives that cancel it. What does that make the new mean?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsTalesByDotsAndLinesSim;
