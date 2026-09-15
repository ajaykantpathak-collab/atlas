'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'A tiling (tessellation) is a pattern of shapes that covers the floor with NO gaps and NO overlaps. ' +
  'The secret is at a corner: the inside angles of all tiles meeting there must add to exactly 360 degrees. ' +
  'Squares (90°) fit 4 at a corner, triangles (60°) fit 6, hexagons (120°) fit 3 -- but pentagons (108°) leave a gap!';

type Shape = 'square' | 'triangle' | 'hexagon' | 'pentagon';

const SHAPES: Record<Shape, { name: string; angle: number; color: string }> = {
  square: { name: 'Square', angle: 90, color: '#38bdf8' },
  triangle: { name: 'Triangle', angle: 60, color: '#34d399' },
  hexagon: { name: 'Hexagon', angle: 120, color: '#fbbf24' },
  pentagon: { name: 'Pentagon', angle: 108, color: '#f472b6' },
};

// One tile drawn with a sharp vertex at the local origin (0,0), ready to rotate around the corner
function tileNode(shape: Shape, size: number): React.ReactNode {
  const fill = { fill: SHAPES[shape].color, fillOpacity: 0.3, stroke: SHAPES[shape].color, strokeWidth: 2 } as const;
  if (shape === 'square') {
    return <rect x={0} y={0} width={size} height={size} {...fill} />;
  }
  if (shape === 'triangle') {
    const h = (size * Math.sqrt(3)) / 2;
    return <polygon points={`0,0 ${size},0 ${size / 2},${h}`} {...fill} />;
  }
  // regular n-gon with one vertex at origin: centre sits at distance `size` on the x-axis
  const n = shape === 'hexagon' ? 6 : 5;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i * (360 / n) + 180) * (Math.PI / 180); // first vertex lands at (0,0)
    pts.push(`${size + size * Math.cos(a)},${size * Math.sin(a)}`);
  }
  return <polygon points={pts.join(' ')} {...fill} />;
}

export function C7_MathematicsConstructionsAndTilingsSim() {
  const [shape, setShape] = useState<Shape>('square');
  const [size, setSize] = useState(58);
  const [showProbe, setShowProbe] = useState(true);

  const s = SHAPES[shape];
  const around = Math.floor(360 / s.angle);
  const covered = s.angle * around;
  const perfect = covered === 360;
  const gap = 360 - covered;

  const tiles = useMemo(() => {
    const step = s.angle; // each tile takes its own interior angle of the corner
    return Array.from({ length: around }, (_, i) => (
      <g key={i} transform={`translate(300 180) rotate(${-60 + i * step})`} style={{ transition: 'transform 0.3s' }}>
        {tileNode(shape, size)}
      </g>
    ));
  }, [shape, size, s.angle, around]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Constructions and Tilings</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {(Object.keys(SHAPES) as Shape[]).map((k) => (
          <button
            key={k}
            onClick={() => setShape(k)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
              shape === k ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'
            }`}
          >
            {SHAPES[k].name} ({SHAPES[k].angle}°)
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 320" className="w-full">
          {/* gap wedge shown first, underneath */}
          {!perfect && (
            <path
              d={`M 300 180 L ${300 + 130 * Math.cos((-60 + around * s.angle - 360) * (Math.PI / 180))} ${180 + 130 * Math.sin((-60 + around * s.angle - 360) * (Math.PI / 180))} A 130 130 0 0 1 ${300 + 130} 180 Z`}
              fill="#7f1d1d"
              fillOpacity={0.55}
            />
          )}
          {tiles}
          {showProbe && (
            <g>
              <circle cx={300} cy={180} r={6} fill="#ffffff" />
              <text x={314} y={162} fill="#f8fafc" fontSize={14} fontWeight="bold">
                {s.angle}° x {around} = {covered}° of 360°
              </text>
            </g>
          )}
          <text x={20} y={304} fontSize={14} fontWeight="bold" fill={perfect ? '#34d399' : '#f87171'}>
            {perfect
              ? `PERFECT TILING -- ${around} ${s.name.toLowerCase()}s meet at every corner and nothing is left over.`
              : `GAP! ${around} pentagons cover only ${covered}°, leaving a ${gap}° hole in the floor.`}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Tile size</span>
            <span className="font-mono font-bold text-sky-300">{size}</span>
          </label>
          <input type="range" aria-label="tile size" min={28} max={95} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 flex items-center justify-between">
          <span className="text-xs text-slate-300">Corner test</span>
          <span className="font-mono text-xs">
            {covered}° / 360° --{' '}
            <span className={perfect ? 'text-emerald-400 font-bold' : 'text-pink-400 font-bold'}>
              {perfect ? 'tiles!' : `${gap}° short`}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setShowProbe((v) => !v)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showProbe ? 'bg-amber-600 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showProbe ? 'Hide' : 'Show'} corner probe
        </button>
        <button onClick={() => setSize(58)} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset size
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Test every shape with the corner probe. Which ones read exactly 360°, and what angle does the pentagon fall short by?</li>
          <li>A regular octagon has 135° inside angles. Two octagons cover 270° -- what familiar tile fills the leftover 90°? (This is a real floor pattern!)</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsConstructionsAndTilingsSim;
