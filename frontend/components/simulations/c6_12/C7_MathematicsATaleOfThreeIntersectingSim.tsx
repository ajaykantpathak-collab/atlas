'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'When three lines cross each other they can trap a triangle. The amazing rule: the three inside ' +
  'angles ALWAYS add up to 180 degrees -- a straight line! So if you know two angles, the third is ' +
  'forced. And the angle outside at one corner equals the two far inside angles added together.';

export function C7_MathematicsATaleOfThreeIntersectingSim() {
  const [angleA, setAngleA] = useState(60);
  const [angleB, setAngleB] = useState(70);
  const [showExterior, setShowExterior] = useState(false);
  const [showLines, setShowLines] = useState(true);

  const angleC = 180 - angleA - angleB;
  const valid = angleC >= 1;

  // Geometry: base AB fixed, vertex C from law of sines so drawn angles match the sliders.
  const tri = useMemo(() => {
    if (!valid) return null;
    const rad = (d: number) => (d * Math.PI) / 180;
    const base = 260; // side c = AB
    const cAng = rad(angleC);
    const aLen = (base * Math.sin(rad(angleB))) / Math.sin(cAng); // side CA
    const cx = aLen * Math.cos(rad(angleA));
    const cy = aLen * Math.sin(rad(angleA));
    // Fit into the 600x260 view: shift + scale
    const maxX = Math.max(base, cx, 1);
    const maxY = Math.max(cy, 1);
    const s = Math.min(440 / maxX, 190 / maxY);
    return {
      A: { x: 60, y: 220 },
      B: { x: 60 + base * s, y: 220 },
      C: { x: 60 + cx * s, y: 220 - cy * s },
    };
  }, [angleA, angleB, angleC, valid]);

  const arc = (v: { x: number; y: number }, from: { x: number; y: number }, to: { x: number; y: number }, r: number) => {
    const a1 = Math.atan2(from.y - v.y, from.x - v.x);
    const a2 = Math.atan2(to.y - v.y, to.x - v.x);
    const p = (a: number) => `${v.x + r * Math.cos(a)},${v.y + r * Math.sin(a)}`;
    return `M ${p(a1)} A ${r} ${r} 0 0 0 ${p(a2)}`;
  };

  const randomize = () => {
    const a = 20 + Math.floor(Math.random() * 80);
    setAngleA(a);
    setAngleB(20 + Math.floor(Math.random() * Math.min(120, 159 - a)));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">A Tale of Three Intersecting Lines</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 260" className="w-full">
          {valid && tri && (
            <g>
              {showLines && (
                <g stroke="#475569" strokeWidth={1.5}>
                  {/* Extend the sides as full intersecting lines */}
                  <line x1={tri.A.x - 200} y1={tri.A.y} x2={tri.B.x + 200} y2={tri.B.y} strokeDasharray="6 5" />
                  <line
                    x1={tri.A.x - (tri.C.x - tri.A.x) * 0.4}
                    y1={tri.A.y - (tri.C.y - tri.A.y) * 0.4}
                    x2={tri.A.x + (tri.C.x - tri.A.x) * 1.4}
                    y2={tri.A.y + (tri.C.y - tri.A.y) * 1.4}
                    strokeDasharray="6 5"
                  />
                  <line
                    x1={tri.B.x - (tri.C.x - tri.B.x) * 0.4}
                    y1={tri.B.y - (tri.C.y - tri.B.y) * 0.4}
                    x2={tri.B.x + (tri.C.x - tri.B.x) * 1.4}
                    y2={tri.B.y + (tri.C.y - tri.B.y) * 1.4}
                    strokeDasharray="6 5"
                  />
                </g>
              )}
              <polygon
                points={`${tri.A.x},${tri.A.y} ${tri.B.x},${tri.B.y} ${tri.C.x},${tri.C.y}`}
                fill="rgba(99,102,241,0.18)"
                stroke="#818cf8"
                strokeWidth={2.5}
              />
              <path d={arc(tri.A, tri.B, tri.C, 34)} fill="none" stroke="#38bdf8" strokeWidth={2} />
              <path d={arc(tri.B, tri.C, tri.A, 34)} fill="none" stroke="#34d399" strokeWidth={2} />
              <path d={arc(tri.C, tri.A, tri.B, 34)} fill="none" stroke="#fbbf24" strokeWidth={2} />
              <text x={tri.A.x + 12} y={tri.A.y - 12} fill="#38bdf8" fontSize={15} fontWeight="bold">{angleA}°</text>
              <text x={tri.B.x - 46} y={tri.B.y - 12} fill="#34d399" fontSize={15} fontWeight="bold">{angleB}°</text>
              <text x={tri.C.x - 14} y={tri.C.y + 30} fill="#fbbf24" fontSize={15} fontWeight="bold">{angleC}°</text>
              {showExterior && (
                <g>
                  <path
                    d={`M ${tri.B.x} ${tri.B.y} L ${tri.B.x + 90} ${tri.B.y}`}
                    stroke="#f472b6"
                    strokeWidth={2.5}
                  />
                  <line
                    x1={tri.B.x}
                    y1={tri.B.y}
                    x2={tri.B.x + (tri.B.x - tri.C.x) * 0.55}
                    y2={tri.B.y - (tri.C.y - tri.B.y) * 0.55}
                    stroke="#f472b6"
                    strokeWidth={2.5}
                  />
                  <text x={tri.B.x + 20} y={tri.B.y + 26} fill="#f472b6" fontSize={14} fontWeight="bold">
                    {angleA + angleB}° = {angleA}° + {angleB}°
                  </text>
                </g>
              )}
            </g>
          )}
          {!valid && (
            <g>
              <text x={300} y={110} textAnchor="middle" fill="#f87171" fontSize={18} fontWeight="bold">
                No triangle is possible!
              </text>
              <text x={300} y={140} textAnchor="middle" fill="#fca5a5" fontSize={13}>
                The two long lines lean past each other -- their inside space is {angleC}° (less than 1°).
              </text>
              <text x={300} y={165} textAnchor="middle" fill="#fca5a5" fontSize={13}>
                Lower one angle so the three lines can actually meet in a triangle.
              </text>
            </g>
          )}
          <g transform="translate(20, 246)">
            <text fill="#94a3b8" fontSize={12}>
              Angle sum: {angleA}° + {angleB}° + {angleC}° = <tspan fill="#34d399" fontWeight="bold">180°</tspan>
            </text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Angle A (blue)</span>
            <span className="font-mono font-bold">{angleA}°</span>
          </label>
          <input type="range" aria-label="Angle A" min={10} max={150} value={angleA} onChange={(e) => setAngleA(Number(e.target.value))} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Angle B (green)</span>
            <span className="font-mono font-bold">{angleB}°</span>
          </label>
          <input type="range" aria-label="Angle B" min={10} max={150} value={angleB} onChange={(e) => setAngleB(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setShowExterior((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showExterior ? 'bg-pink-600 border-pink-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showExterior ? 'Hide' : 'Show'} exterior angle
        </button>
        <button
          onClick={() => setShowLines((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showLines ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showLines ? 'Hide' : 'Show'} the three lines
        </button>
        <button onClick={randomize} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Random triangle
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Push Angle A up to 150° and then try to raise Angle B -- what is the biggest Angle B can be before the triangle breaks?</li>
          <li>Make an equilateral triangle (all angles equal). Then turn on the exterior angle: it should read 120°. Why is it twice 60°?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsATaleOfThreeIntersectingSim;
