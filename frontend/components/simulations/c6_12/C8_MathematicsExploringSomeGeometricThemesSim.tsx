'use client';
/**
 * C8_MathematicsExploringSomeGeometricThemesSim (Class 8 Maths)
 *
 * ELI5: Walk around any polygon and by the time you return to start you have
 * turned through exactly one full turn: 360 degrees. That is why the EXTERIOR
 * angles of every polygon sum to 360, no matter how many sides it has.
 */
import React, { useMemo, useState } from 'react';

export function C8_MathematicsExploringSomeGeometricThemesSim() {
  const [n, setN] = useState(5);
  const [showExterior, setShowExterior] = useState(true);
  const [walkStep, setWalkStep] = useState(0); // how many exterior turns highlighted

  const interiorSum = (n - 2) * 180;
  const eachInterior = Math.round((interiorSum / n) * 10) / 10;
  const eachExterior = Math.round((360 / n) * 10) / 10;

  // Regular n-gon vertices on a circle
  const poly = useMemo(() => {
    const cx = 150;
    const cy = 150;
    const r = 95;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const ang = (-90 + (360 / n) * i) * (Math.PI / 180);
      pts.push({ x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) });
    }
    return pts;
  }, [n]);

  const nextOf = (i: number) => poly[(i + 1) % n];
  const exteriorDir = (i: number) => {
    const a = poly[i];
    const b = nextOf(i);
    const ang = Math.atan2(b.y - a.y, b.x - a.x);
    return ang + Math.PI / 2; // turn left by exterior angle each vertex
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">Exploring Geometric Themes: The 360 Degree Walk</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">Theme 1 - angle sums:</span> imagine driving
          along the edges of a polygon. At every corner you turn by the exterior angle. After a full
          lap you face the same direction, so all turns add to 360 degrees. Each interior angle is
          its flat partner: 180 - exterior.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setN((v) => Math.max(3, v - 1))} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 transition-all">
          Remove a side
        </button>
        <button onClick={() => setN((v) => Math.min(12, v + 1))} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 transition-all">
          Add a side
        </button>
        <button onClick={() => setShowExterior((s) => !s)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${showExterior ? 'bg-amber-500 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
          {showExterior ? 'Exterior angles: ON' : 'Exterior angles: OFF'}
        </button>
        <button onClick={() => setWalkStep((s) => (s + 1) % (n + 1))} className="px-4 py-2 rounded-xl text-sm font-bold bg-gold-600 text-white hover:bg-gold-500 transition-all">
          Walk the perimeter ({walkStep}/{n})
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2 bg-gradient-to-br from-gold-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 310 300" className="w-full">
            <polygon points={poly.map((p) => `${p.x},${p.y}`).join(' ')} fill="#c7d2fe" stroke="#4338ca" strokeWidth={2.5} style={{ transition: 'all 300ms' }} />
            {showExterior &&
              poly.map((a, i) => {
                const b = nextOf(i);
                const ang = Math.atan2(b.y - a.y, b.x - a.x);
                const done = i < walkStep;
                const ex = a.x + 38 * Math.cos(ang);
                const ey = a.y + 38 * Math.sin(ang);
                const d = exteriorDir(i);
                const arcEnd = { x: a.x + 30 * Math.cos(d), y: a.y + 30 * Math.sin(d) };
                return (
                  <g key={i}>
                    <line x1={a.x} y1={a.y} x2={ex} y2={ey} stroke={done ? '#059669' : '#f59e0b'} strokeWidth={done ? 3.5 : 2} strokeDasharray={done ? '' : '4 3'} />
                    <path d={`M ${ex} ${ey} A 12 12 0 0 1 ${arcEnd.x} ${arcEnd.y}`} fill="none" stroke={done ? '#059669' : '#f59e0b'} strokeWidth={2} />
                    {n <= 8 && (
                      <text x={a.x + 50 * Math.cos(ang + 0.35)} y={a.y + 50 * Math.sin(ang + 0.35)} fontSize="10" fill={done ? '#047857' : '#b45309'} fontWeight="bold">
                        {eachExterior}
                      </text>
                    )}
                  </g>
                );
              })}
            {walkStep > 0 && (
              <text x={155} y={155} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#065f46">
                turned {walkStep * Math.round(eachExterior)} deg so far
              </text>
            )}
            <text x={155} y={290} textAnchor="middle" fontSize="11" fill="#475569">
              Regular polygon with {n} sides
            </text>
          </svg>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>
              Interior angle sum = (n - 2) x 180 = ({n} - 2) x 180 = <span className="text-gold-700 font-bold">{interiorSum} deg</span>
            </div>
            <div className="mt-1">each interior = {eachInterior} deg, each exterior = {eachExterior} deg</div>
            <div className="mt-1 text-slate-500">check: {eachInterior} + {eachExterior} = {Math.round((eachInterior + eachExterior) * 10) / 10} deg (a straight line)</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-500 mb-1">EXTERIOR ANGLE BUDGET</p>
            <div className="flex gap-1 h-6 rounded-lg overflow-hidden">
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="h-full flex-1 flex items-center justify-center text-[9px] font-bold text-white" style={{ background: i < walkStep ? '#059669' : '#fbbf24', transition: 'background 300ms' }}>
                  {Math.round(eachExterior)}
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {n} x {eachExterior} = {Math.round(n * eachExterior * 10) / 10} deg - one full turn, ALWAYS.
            </p>
          </div>
          <div className="text-xs text-slate-500 leading-relaxed">
            Notice: adding a side squeezes every exterior angle smaller, but the total never
            changes. That is the deepest theme in this chapter.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Use the walk button on a hexagon until all 6 turns are green: what total did you reach? Try a triangle - same total?</li>
          <li>What is the fewest sides a polygon can have for each exterior angle to be less than 30 degrees? Set it and check.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsExploringSomeGeometricThemesSim;
