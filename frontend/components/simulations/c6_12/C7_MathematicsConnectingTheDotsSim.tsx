'use client';

import React, { useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Every point on a grid has an address: (column, row). "Connecting the dots" means joining points ' +
  'in order with straight segments. Mathematicians measure how far apart dots are using the grid ' +
  'steps: across, then up. The drawing below builds itself from YOUR dot addresses!';

type Dot = { c: number; r: number };

const COLS = 10;
const ROWS = 7;
const CELL = 46;

export function C7_MathematicsConnectingTheDotsSim() {
  const [dots, setDots] = useState<Dot[]>([
    { c: 1, r: 5 },
    { c: 4, r: 1 },
    { c: 7, r: 5 },
    { c: 2, r: 3 },
    { c: 6, r: 3 },
    { c: 1, r: 5 },
  ]);
  const [showCoords, setShowCoords] = useState(true);
  const [closed, setClosed] = useState(true);

  const toggleDot = (c: number, r: number) => {
    setDots((prev) => {
      const idx = prev.findIndex((d) => d.c === c && d.r === r);
      if (idx >= 0) return prev.filter((_, i) => i !== idx);
      return [...prev, { c, r }];
    });
  };

  const pathLen = (pts: Dot[]) => {
    let total = 0;
    for (let i = 1; i < pts.length; i++) {
      total += Math.hypot(pts[i].c - pts[i - 1].c, pts[i].r - pts[i - 1].r);
    }
    if (closed && pts.length > 2) {
      total += Math.hypot(pts[0].c - pts[pts.length - 1].c, pts[0].r - pts[pts.length - 1].r);
    }
    return Math.round(total * 10) / 10;
  };

  const toXY = (d: Dot) => ({ x: d.c * CELL + CELL / 2, y: d.r * CELL + CELL / 2 });
  const poly = dots.map(toXY).map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Connecting the Dots</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 overflow-x-auto">
        <svg viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} className="w-full" style={{ minWidth: 460 }}>
          {/* grid */}
          {Array.from({ length: COLS + 1 }, (_, i) => (
            <line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={ROWS * CELL} stroke="#334155" strokeWidth={1} />
          ))}
          {Array.from({ length: ROWS + 1 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * CELL} x2={COLS * CELL} y2={i * CELL} stroke="#334155" strokeWidth={1} />
          ))}
          {/* click targets */}
          {Array.from({ length: COLS }, (_, c) =>
            Array.from({ length: ROWS }, (_, r) => (
              <rect
                key={`t${c}-${r}`}
                x={c * CELL}
                y={r * CELL}
                width={CELL}
                height={CELL}
                fill="transparent"
                className="cursor-pointer hover:fill-indigo-500/20"
                onClick={() => toggleDot(c, r)}
              />
            ))
          )}
          {/* path */}
          {dots.length > 1 && (
            <polygon
              points={poly}
              fill="rgba(99,102,241,0.15)"
              stroke="#818cf8"
              strokeWidth={2.5}
              style={{ transition: 'all 0.25s' }}
            />
          )}
          {/* dots in click order */}
          {dots.map((d, i) => {
            const p = toXY(d);
            return (
              <g key={`${d.c}-${d.r}-${i}`}>
                <circle cx={p.x} cy={p.y} r={8} fill="#34d399" stroke="#065f46" strokeWidth={2} />
                {showCoords && (
                  <text x={p.x} y={p.y - 14} textAnchor="middle" fill="#a7f3d0" fontSize={12} fontFamily="monospace">
                    ({d.c},{d.r})
                  </text>
                )}
                <text x={p.x + 10} y={p.y + 16} fill="#fbbf24" fontSize={11} fontWeight="bold">
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-400">
          <span>
            Your shape uses <span className="text-emerald-300 font-bold">{dots.length}</span> dots; total thread length ={' '}
            <span className="text-emerald-300 font-bold">{pathLen(dots)}</span> grid steps
          </span>
          <span className="font-mono">order: {dots.map((d) => `(${d.c},${d.r})`).join(' -> ') || '--'}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setShowCoords((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showCoords ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showCoords ? 'Hide' : 'Show'} dot addresses
        </button>
        <button
          onClick={() => setClosed((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${closed ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {closed ? 'Closed shape (thread returns)' : 'Open path'}
        </button>
        <button
          onClick={() => setDots([])}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Clear all dots
        </button>
        <button
          onClick={() => setDots([{ c: 2, r: 2 }, { c: 7, r: 2 }, { c: 7, r: 5 }, { c: 2, r: 5 }, { c: 2, r: 2 }])}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Load a rectangle
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Load the rectangle, then move one dot one full grid step diagonally out. Did the thread length change by more than 1 step? Why?</li>
          <li>Click dots to draw a 5-point star (you need exactly 10 clicks counting the return). Can you beat the rectangle&apos;s thread length with a taller shape?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsConnectingTheDotsSim;
