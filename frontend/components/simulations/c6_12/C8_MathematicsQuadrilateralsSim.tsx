'use client';
/**
 * C8_MathematicsQuadrilateralsSim (Class 8 Maths)
 *
 * ELI5: A parallelogram is a pushed-over rectangle: base stays base, height
 * stays height, and its area is STILL base x height. Push harder (shear) and
 * the slanted sides stretch while the area does not change. Keep pushing to
 * 90 degrees and it snaps back into a rectangle; make all sides equal too and
 * it becomes a rhombus.
 */
import React, { useState } from 'react';

export function C8_MathematicsQuadrilateralsSim() {
  const [base, setBase] = useState(120);
  const [height, setHeight] = useState(70);
  const [shear, setShear] = useState(40);

  const shearClamped = Math.min(shear, base - 10);
  const side = Math.round(Math.sqrt(shearClamped * shearClamped + height * height) * 10) / 10;
  const area = (base * height) / 10000; // in unit squares of 10px
  const perimeter = Math.round(2 * (base + side)) / 10;
  const angleDeg = Math.round((Math.atan2(height, shearClamped) * 180) / Math.PI);
  const isRectangle = shearClamped === 0;
  const isRhombus = Math.abs(side - base / 10) < 0.6 && shearClamped > 0;

  const px = (v: number) => v / 10; // display units
  const x0 = 40;
  const yBase = 170;

  const classification = isRectangle
    ? side * 10 === base
      ? 'SQUARE (right angles + equal sides)'
      : 'RECTANGLE (shear = 0)'
    : isRhombus
      ? 'RHOMBUS (all sides equal, slanted)'
      : 'PARALLELOGRAM (two pairs of parallel sides)';

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Quadrilaterals: The Shear Machine</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Family portrait:</span> slide the shear
          control to push the top edge sideways. Opposite sides stay parallel and equal (that is
          what makes it a parallelogram), the slanted side grows, but area = base x height refuses
          to change - shear preserves area because the base and the height never move.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Base (units of 10 px)</span><span className="font-mono text-indigo-600">{base / 10}</span></label>
            <input type="range" min={60} max={240} step={10} value={base} aria-label="base" onChange={(e) => setBase(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Height</span><span className="font-mono text-emerald-600">{height / 10}</span></label>
            <input type="range" min={30} max={130} step={5} value={height} aria-label="height" onChange={(e) => setHeight(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Shear (top slide)</span><span className="font-mono text-amber-600">{shearClamped / 10}</span></label>
            <input type="range" min={0} max={150} step={5} value={shear} aria-label="shear" onChange={(e) => setShear(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShear(0)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all">
              Snap to rectangle
            </button>
            <button
              onClick={() => { setShear(Math.round(Math.sqrt(Math.max(0, (base / 10) * (base / 10) - (height / 10) * (height / 10)))) * 10); }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-100 text-pink-700 hover:bg-pink-200 transition-all"
            >
              Try rhombus
            </button>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>slanted side = sqrt({shearClamped / 10}^2 + {height / 10}^2) = <span className="text-indigo-700 font-bold">{side}</span></div>
            <div>area = base x height = {(base / 10) * (height / 10)} square units</div>
            <div>perimeter = 2 x ({base / 10} + {side}) = {perimeter}</div>
            <div className="mt-1 text-xs text-slate-500">acute corner angle = {angleDeg} deg</div>
          </div>
        </div>

        <div className="p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 340 260" className="w-full">
            {/* height line */}
            <line x1={x0 + shearClamped + 1} y1={yBase - height} x2={x0 + shearClamped + 1} y2={yBase} stroke="#10b981" strokeDasharray="4 3" />
            <text x={x0 + shearClamped + 6} y={yBase - height / 2} fontSize="10" fill="#047857">h = {height / 10}</text>
            <polygon
              points={`${x0},${yBase} ${x0 + base},${yBase} ${x0 + base + shearClamped},${yBase - height} ${x0 + shearClamped},${yBase - height}`}
              fill="#c7d2fe"
              stroke="#4338ca"
              strokeWidth={2.5}
              style={{ transition: 'all 250ms' }}
            />
            {/* right angle marker when rectangle */}
            {isRectangle && (
              <rect x={x0} y={yBase - 12} width={12} height={12} fill="none" stroke="#dc2626" strokeWidth={1.5} />
            )}
            <text x={x0 + base / 2} y={yBase + 18} textAnchor="middle" fontSize="10" fill="#334155">base = {base / 10}</text>
            <text x={x0 + shearClamped + base / 2} y={yBase - height - 8} textAnchor="middle" fontSize="10" fill="#4338ca">top edge (equal + parallel to base)</text>
            <text x={170} y={225} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4338ca">
              {classification}
            </text>
            <text x={170} y={245} textAnchor="middle" fontSize="11" fill="#475569">
              area stays {(base / 10) * (height / 10)} sq units while shear changes
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Set base 12, height 6, then shear 0, 4 and 8: does the area change? What about the perimeter?</li>
          <li>Press "Try rhombus" then fine-tune the sliders until the slanted side equals the base. What angle do you land on?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsQuadrilateralsSim;
