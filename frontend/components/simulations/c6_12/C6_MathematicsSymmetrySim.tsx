/**
 * C6 Mathematics -- Symmetry (Ganita Prakash)
 *
 * One chapter concept: a shape has line symmetry if a mirror line splits
 * it into matching halves, and rotational symmetry if it looks the same
 * after a spin of less than a full turn.
 *
 * Interaction model: switch between Mirror mode (slide the mirror line
 * and see the true reflected ghost overlap or miss) and Spin mode
 * (rotate the shape and count the positions where it looks unchanged).
 */
import React, { useState } from 'react';

type Mode = 'mirror' | 'spin';
type ShapeKey = 'square' | 'triangle' | 'star' | 'letterF';

const CX = 170;
const CY = 140;

const SHAPES: Record<ShapeKey, { pts: string; name: string; lines: string; order: number }> = {
  square: { pts: (CX - 70) + ',' + (CY - 70) + ' ' + (CX + 70) + ',' + (CY - 70) + ' ' + (CX + 70) + ',' + (CY + 70) + ' ' + (CX - 70) + ',' + (CY + 70), name: 'Square', lines: '4 lines of symmetry', order: 4 },
  triangle: { pts: CX + ',' + (CY - 80) + ' ' + (CX + 75) + ',' + (CY + 60) + ' ' + (CX - 75) + ',' + (CY + 60), name: 'Equilateral triangle', lines: '3 lines of symmetry', order: 3 },
  star: { pts: starPoints(5, CX, CY, 85, 34), name: '5-point star', lines: '5 lines of symmetry', order: 5 },
  letterF: { pts: (CX - 55) + ',' + (CY - 75) + ' ' + (CX + 55) + ',' + (CY - 75) + ' ' + (CX + 55) + ',' + (CY - 45) + ' ' + (CX - 25) + ',' + (CY - 45) + ' ' + (CX - 25) + ',' + (CY - 10) + ' ' + (CX + 40) + ',' + (CY - 10) + ' ' + (CX + 40) + ',' + (CY + 20) + ' ' + (CX - 25) + ',' + (CY + 20) + ' ' + (CX - 25) + ',' + (CY + 75) + ' ' + (CX - 55) + ',' + (CY + 75), name: 'Letter F', lines: 'no lines of symmetry', order: 1 },
};

function starPoints(n: number, cx: number, cy: number, R: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const ang = (Math.PI * i) / n - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    pts.push((cx + rad * Math.cos(ang)).toFixed(1) + ',' + (cy + rad * Math.sin(ang)).toFixed(1));
  }
  return pts.join(' ');
}

// Reflect every polygon vertex across the vertical mirror x = m
function reflect(pts: string, m: number): string {
  return pts
    .split(' ')
    .map((p) => {
      const [x, y] = p.split(',').map(Number);
      return 2 * m - x + ',' + y;
    })
    .join(' ');
}

function C6_MathematicsSymmetrySim() {
  const [mode, setMode] = useState<Mode>('mirror');
  const [shapeKey, setShapeKey] = useState<ShapeKey>('square');
  const [mirrorX, setMirrorX] = useState(CX);
  const [angle, setAngle] = useState(0);
  const [showGhost, setShowGhost] = useState(true);

  const shape = SHAPES[shapeKey];
  const reflected = reflect(shape.pts, mirrorX);
  // Real check: reflected image coincides with original only when the
  // mirror sits on a true symmetry axis (centre x for our shapes).
  const axisXs: Record<ShapeKey, number[]> = { square: [CX], triangle: [CX], star: [CX], letterF: [] };
  const onAxis = axisXs[shapeKey].some((ax) => Math.abs(mirrorX - ax) <= 2);
  const step = 360 / shape.order;
  const looksSame = angle % step === 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-rose-200 shadow-xl font-sans text-slate-800">
      <style>{'@keyframes pop { 0% { transform: scale(0.7); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } } .pop { animation: pop 0.4s ease-out; }'}</style>
      <h2 className="text-xl md:text-2xl font-black text-rose-700">Symmetry -- Mirrors and Spins</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        A shape has <b>line symmetry</b> when you can fold it along a line so both halves match exactly.
        It has <b>rotational symmetry</b> when a spin (less than a full turn) makes it look the same. Test both
        on each shape!
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {(['mirror', 'spin'] as Mode[]).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={'px-4 py-1.5 rounded-full text-sm font-bold transition-all ' + (mode === m ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-100 text-rose-700 hover:bg-rose-200')}>
            {m === 'mirror' ? 'Mirror line mode' : 'Spin mode'}
          </button>
        ))}
        <span className="w-px bg-slate-200 mx-1" />
        {(Object.keys(SHAPES) as ShapeKey[]).map((k) => (
          <button key={k} onClick={() => setShapeKey(k)} className={'px-3 py-1.5 rounded-full text-xs font-bold transition-all ' + (shapeKey === k ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')}>
            {SHAPES[k].name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_230px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-rose-100 bg-rose-50/40 overflow-hidden">
          <svg viewBox="0 0 340 290" className="w-full">
            <rect x="0" y="0" width="340" height="290" fill="#fff1f2" />
            {mode === 'mirror' && (
              <g>
                {showGhost && <polygon points={reflected} fill="#fbbf24" fillOpacity="0.35" stroke="#d97706" strokeWidth="2" strokeDasharray="5 4" className="transition-all duration-150" />}
                <polygon points={shape.pts} fill="#f43f5e" fillOpacity="0.75" stroke="#be123c" strokeWidth="2.5" />
                <line x1={mirrorX} y1="15" x2={mirrorX} y2="275" stroke="#0ea5e9" strokeWidth="3" className="transition-all duration-150" />
                <text x={mirrorX + 6} y="28" fontSize="11" fontWeight="bold" fill="#0284c7" className="transition-all">mirror</text>
              </g>
            )}
            {mode === 'spin' && (
              <g style={{ transform: 'rotate(' + angle + 'deg)', transformOrigin: CX + 'px ' + CY + 'px', transition: 'transform 0.25s ease-out' }}>
                <polygon points={shape.pts} fill="#f43f5e" fillOpacity="0.75" stroke="#be123c" strokeWidth="2.5" />
                <circle cx={CX + 55} cy={CY - 20} r="6" fill="#1e293b" />
              </g>
            )}
            {mode === 'spin' && <circle cx={CX} cy={CY} r="5" fill="#0f172a" />}
          </svg>
        </div>

        <div className="space-y-3">
          {mode === 'mirror' ? (
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Move the mirror</span>
                <span className="text-rose-700 font-black">{Math.round(mirrorX - CX)}</span>
              </label>
              <input type="range" min={60} max={280} value={mirrorX} onChange={(e) => setMirrorX(Number(e.target.value))} className="w-full accent-rose-600" />
              <button onClick={() => setShowGhost(!showGhost)} className={'mt-2 w-full px-3 py-2 rounded-xl text-xs font-bold text-left transition-all ' + (showGhost ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' : 'bg-slate-100 text-slate-400 border-2 border-slate-200')}>
                {showGhost ? '[ON] Show reflected ghost' : '[OFF] Show reflected ghost'}
              </button>
            </div>
          ) : (
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Rotate</span>
                <span className="text-rose-700 font-black">{angle} deg</span>
              </label>
              <input type="range" min={0} max={359} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-rose-600" />
              <div className={'mt-2 p-2 rounded-xl text-xs font-black text-center pop ' + (looksSame ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400')}>
                {looksSame ? 'Looks the SAME! Match #' + (angle / step + 1) : 'Different picture now'}
              </div>
              <div className="grid grid-cols-4 gap-1 mt-2">
                {[0, 90, 180, 270].map((a) => (
                  <button key={a} onClick={() => setAngle(a)} className="px-1 py-1 rounded-lg bg-rose-100 text-rose-700 text-[10px] font-bold hover:bg-rose-200 transition-colors">
                    {a}deg
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs">
            <span className="font-bold text-slate-700">{shape.name}: </span>
            <span className="text-slate-500">{shape.lines}, rotational order {shape.order}</span>
          </div>
          {mode === 'mirror' && (
            <div key={String(onAxis) + shapeKey} className={'p-3 rounded-2xl text-xs font-black text-center pop ' + (onAxis ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700')}>
              {onAxis ? 'Perfect match -- this mirror is a line of symmetry!' : 'The ghost does NOT match. Keep sliding...'}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
        <div className="text-sm font-black text-sky-800">What to try</div>
        <ol className="text-xs text-sky-700 list-decimal list-inside mt-1 space-y-1">
          <li>Find the mirror position where the square matches, then the triangle. How many matching mirror lines does each shape really have? (Fold paper to check!)</li>
          <li>In spin mode, count how many times the star "looks the same" during one full 360-degree turn. Then try the letter F -- why does it never match?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_MathematicsSymmetrySim };
export default C6_MathematicsSymmetrySim;
