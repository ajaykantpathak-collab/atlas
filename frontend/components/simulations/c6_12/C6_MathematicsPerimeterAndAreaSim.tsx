/**
 * C6 Mathematics -- Perimeter and Area (Ganita Prakash)
 *
 * One chapter concept: perimeter is the distance AROUND a shape (the fence),
 * area is the number of unit squares that FILL it (the floor).
 *
 * Interaction model: slide width/height to build a shape on a grid,
 * switch shape, and toggle the marching-ant fence, the unit-square
 * floor and the live formulas.
 */
import React, { useState } from 'react';

type Shape = 'rectangle' | 'triangle';

const U = 30; // pixels per grid unit

function C6_MathematicsPerimeterAndAreaSim() {
  const [shape, setShape] = useState<Shape>('rectangle');
  const [w, setW] = useState(6);
  const [h, setH] = useState(4);
  const [showFloor, setShowFloor] = useState(true);
  const [showFence, setShowFence] = useState(true);
  const [showMath, setShowMath] = useState(true);

  const W = w * U;
  const H = h * U;
  const X0 = 60;
  const Y0 = 30;
  const hyp = Math.sqrt(w * w + h * h);
  const perimeter = shape === 'rectangle' ? 2 * (w + h) : w + h + hyp;
  const area = shape === 'rectangle' ? w * h : (w * h) / 2;

  const squares: React.ReactNode[] = [];
  if (showFloor && shape === 'rectangle') {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        squares.push(
          <rect
            key={'sq-' + i + '-' + j}
            x={X0 + i * U}
            y={Y0 + j * U}
            width={U}
            height={U}
            fill="#34d399"
            fillOpacity="0.3"
            stroke="#10b981"
            strokeWidth="1"
          />
        );
      }
    }
  }

  const shapePts =
    shape === 'rectangle'
      ? X0 + ',' + Y0 + ' ' + (X0 + W) + ',' + Y0 + ' ' + (X0 + W) + ',' + (Y0 + H) + ' ' + X0 + ',' + (Y0 + H)
      : X0 + ',' + (Y0 + H) + ' ' + (X0 + W) + ',' + (Y0 + H) + ' ' + X0 + ',' + Y0;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-emerald-200 shadow-xl font-sans text-slate-800">
      <style>{'@keyframes march { to { stroke-dashoffset: -24; } } .ants { animation: march 1.2s linear infinite; }'}</style>

      <h2 className="text-xl md:text-2xl font-black text-emerald-700">Perimeter and Area -- the Fence and the Floor</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        <b>Perimeter</b> is the distance all around a shape, like a fence around a field.{' '}
        <b>Area</b> is how many 1-by-1 unit squares fit inside, like green tiles covering the field. Watch how they
        change separately as you slide the sides!
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {(['rectangle', 'triangle'] as Shape[]).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={
              'px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ' +
              (shape === s ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200')
            }
          >
            {s === 'rectangle' ? 'Rectangle' : 'Right triangle'}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_230px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 overflow-hidden">
          <svg viewBox="0 0 460 270" className="w-full">
            <rect x="0" y="0" width="460" height="270" fill="#f0fdf4" />
            {Array.from({ length: 15 }, (_, i) => (
              <line key={'gx' + i} x1={X0 + i * U} y1={Y0} x2={X0 + i * U} y2={Y0 + 8 * U} stroke="#d1fae5" strokeWidth="1" />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <line key={'gy' + i} x1={X0} y1={Y0 + i * U} x2={X0 + 14 * U} y2={Y0 + i * U} stroke="#d1fae5" strokeWidth="1" />
            ))}
            {squares}
            <polygon points={shapePts} fill="#10b981" fillOpacity={shape === 'triangle' ? 0.3 : 0} stroke="#059669" strokeWidth="3" className="transition-all duration-300" />
            {showFence && (
              <polygon points={shapePts} fill="none" stroke="#d97706" strokeWidth="4" strokeDasharray="10 14" strokeLinecap="round" className="ants" />
            )}
            <text x={X0 + W / 2} y={Y0 + H + 16} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#047857">
              width = {w}
            </text>
            <text x={X0 - 12} y={Y0 + H / 2} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#047857" transform={'rotate(-90 ' + (X0 - 12) + ' ' + (Y0 + H / 2) + ')'}>
              height = {h}
            </text>
            {shape === 'triangle' && (
              <text x={X0 + W / 2 + 20} y={Y0 + H / 2} fontSize="11" fill="#b45309">
                slant = {hyp.toFixed(1)}
              </text>
            )}
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Width</span>
              <span className="text-emerald-700">{w} units</span>
            </label>
            <input type="range" min={1} max={10} value={w} onChange={(e) => setW(Number(e.target.value))} className="w-full accent-emerald-600" />
          </div>
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Height</span>
              <span className="text-emerald-700">{h} units</span>
            </label>
            <input type="range" min={1} max={8} value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full accent-emerald-600" />
          </div>
          {[
            { on: showFence, set: setShowFence, label: 'Show fence (perimeter)' },
            { on: showFloor, set: setShowFloor, label: 'Show floor tiles (area)' },
            { on: showMath, set: setShowMath, label: 'Show formulas' },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => t.set(!t.on)}
              className={
                'w-full px-3 py-2 rounded-xl text-xs font-bold text-left transition-all duration-200 ' +
                (t.on ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' : 'bg-slate-100 text-slate-400 border-2 border-slate-200')
              }
            >
              {t.on ? '[ON] ' : '[OFF] '}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {showMath && (
        <div className="grid grid-cols-2 gap-3 mt-4 transition-all duration-300">
          <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">Perimeter (the fence)</div>
            <div className="text-lg font-black text-amber-800">
              {shape === 'rectangle' ? '2 x (' + w + ' + ' + h + ') = ' + perimeter : w + ' + ' + h + ' + ' + hyp.toFixed(1) + ' = ' + perimeter.toFixed(1)}
            </div>
            <div className="text-xs text-amber-600">measured in units</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Area (the floor)</div>
            <div className="text-lg font-black text-emerald-800">
              {shape === 'rectangle' ? w + ' x ' + h + ' = ' + area : '(' + w + ' x ' + h + ') / 2 = ' + area}
            </div>
            <div className="text-xs text-emerald-600">measured in square units</div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Make two different rectangles that BOTH have perimeter 20 (try 9x1, 8x2, 6x4...). Which one has the biggest area? What shape wins?</li>
          <li>Set width 6 and height 4, then switch to the triangle. Its area is exactly HALF the rectangle -- can you see why from the tiles?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_MathematicsPerimeterAndAreaSim };
export default C6_MathematicsPerimeterAndAreaSim;
