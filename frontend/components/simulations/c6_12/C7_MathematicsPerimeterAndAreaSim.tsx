'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Perimeter is the fence around a field; area is the grass inside it. Here is a puzzle: fields ' +
  'with the SAME perimeter can have very DIFFERENT areas! A long thin rectangle wastes fence, ' +
  'and the square is the rectangle champion -- the biggest area for its fence.';

export function C7_MathematicsPerimeterAndAreaSim() {
  const [perimeter, setPerimeter] = useState(36);
  const [width, setWidth] = useState(6);
  const [history, setHistory] = useState<{ w: number; h: number; a: number }[]>([]);

  const height = Math.max(0.5, perimeter / 2 - width);
  const area = width * height;
  const isSquare = Math.abs(width - height) < 0.01;

  // Scale drawing: fit 520x220 box
  const scale = useMemo(() => Math.min(440 / Math.max(width, height, 1), 180 / Math.max(width, height, 1)), [width, height]);

  const record = () =>
    setHistory((h) => [...h.slice(-7), { w: Math.round(width * 10) / 10, h: Math.round(height * 10) / 10, a: Math.round(area * 10) / 10 }]);

  const maxHistArea = Math.max(1, ...history.map((r) => r.a));

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Perimeter and Area: Same Fence, Different Field</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Drawing */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 480 240" className="w-full">
            <rect
              x={240 - (width * scale) / 2}
              y={130 - (height * scale) / 2}
              width={width * scale}
              height={height * scale}
              fill={isSquare ? 'rgba(52,211,153,0.25)' : 'rgba(129,140,248,0.2)'}
              stroke={isSquare ? '#34d399' : '#818cf8'}
              strokeWidth={3}
              style={{ transition: 'all 0.25s' }}
            />
            {/* unit grid inside */}
            {width <= 20 && height <= 12
              ? Array.from({ length: Math.floor(width) }, (_, i) => (
                  <line key={`v${i}`} x1={240 - (width * scale) / 2 + (i + 1) * scale} y1={130 - (height * scale) / 2} x2={240 - (width * scale) / 2 + (i + 1) * scale} y2={130 + (height * scale) / 2} stroke="#6366f1" strokeWidth={0.6} opacity={0.6} />
                ))
              : null}
            <text x={240} y={138} textAnchor="middle" fill="#e2e8f0" fontSize={14} fontWeight="bold">
              Area = {Math.round(area * 10) / 10}
            </text>
            <text x={240} y={130 - (height * scale) / 2 - 10} textAnchor="middle" fill="#fbbf24" fontSize={12}>
              fence = {Math.round(perimeter)}
            </text>
            <text x={240} y={225} textAnchor="middle" fill="#94a3b8" fontSize={12}>
              {Math.round(width * 10) / 10} x {Math.round(height * 10) / 10} {isSquare && <tspan fill="#34d399" fontWeight="bold">-- a SQUARE!</tspan>}
            </text>
          </svg>
        </div>

        {/* Live working */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 font-mono text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-1">Live working</div>
          <div className="text-slate-300">Perimeter P = 2 x (W + H) = {perimeter}</div>
          <div className="text-slate-300">So H = P/2 - W = {Math.round(perimeter / 2)} - {Math.round(width * 10) / 10} = {Math.round(height * 10) / 10}</div>
          <div className="text-slate-300">
            Area = W x H = {Math.round(width * 10) / 10} x {Math.round(height * 10) / 10} ={' '}
            <span className="text-emerald-400 font-bold">{Math.round(area * 10) / 10}</span>
          </div>
          {isSquare ? (
            <div className="text-emerald-400 text-xs">Square detected -- this is the MAXIMUM area possible with this fence!</div>
          ) : (
            <div className="text-amber-300 text-xs">
              Slide W to {perimeter / 4} to make it a square and gain {Math.round((perimeter * perimeter) / 16 - area)} more area for free.
            </div>
          )}
          {/* history bars */}
          <div className="pt-2 border-t border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Fields you recorded (area comparison)</div>
            {history.length === 0 && <div className="text-xs text-slate-500">Press Record to save a field.</div>}
            {history.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-16 text-slate-400">
                  {r.w}x{r.h}
                </span>
                <div className="flex-1 h-3 bg-slate-800 rounded">
                  <div className="h-3 bg-emerald-500 rounded" style={{ width: `${(r.a / maxHistArea) * 100}%`, transition: 'width 0.3s' }} />
                </div>
                <span className="w-12 text-right text-emerald-300">{r.a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Fence length (perimeter)</span>
            <span className="font-mono font-bold text-amber-300">{perimeter}</span>
          </label>
          <input type="range" aria-label="perimeter" min={8} max={80} step={2} value={perimeter} onChange={(e) => setPerimeter(Number(e.target.value))} className="w-full mt-2 accent-amber-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Width W</span>
            <span className="font-mono font-bold text-gold-300">{Math.round(width * 10) / 10}</span>
          </label>
          <input type="range" aria-label="width" min={0.5} max={perimeter / 2 - 0.5} step={0.5} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setWidth(perimeter / 4)}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500"
        >
          Jump to the square
        </button>
        <button
          onClick={() => setWidth(Math.max(0.5, perimeter / 2 - 2))}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Make it long and thin
        </button>
        <button onClick={record} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500">
          Record this field
        </button>
        <button onClick={() => setHistory([])} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Clear records
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Keep the fence at 36. Record the areas at W = 2, 4, 6, 8, 9, 10, 16. Which W wins, and what shape was it?</li>
          <li>A farmer has 40 m of fence for a vegetable bed. Use the sliders to advise him: what width gives the most carrots (area)?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsPerimeterAndAreaSim;
