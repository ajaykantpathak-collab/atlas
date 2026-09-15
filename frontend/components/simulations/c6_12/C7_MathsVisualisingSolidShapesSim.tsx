'use client';
/**
 * C7_MathsVisualisingSolidShapesSim (Class 7 Maths)
 *
 * ELI5: A net is a solid unrolled flat. Drag FOLD and watch the flat sheet
 * gather into a 3-D solid while the V, E, F counters lock into Euler's
 * V - E + F = 2. The net LOOKS like it has more edges -- pairs glue together.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';

type V3 = [number, number, number];
type P2 = [number, number];
interface Face { idx: number[]; color: string; net: P2[] }
interface Solid { name: string; verts: V3[]; faces: Face[]; V: number; E: number; F: number; scale: number }

const sq = (x: number, y: number): P2[] => [[x, y], [x + 2, y], [x + 2, y + 2], [x, y + 2]];
const SOLIDS: Solid[] = [
  {
    name: 'Cube', V: 8, E: 12, F: 6, scale: 22,
    verts: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]],
    faces: [
      { idx: [4, 5, 1, 0], color: '#6366f1', net: sq(-1, -1) },
      { idx: [3, 2, 6, 7], color: '#8b5cf6', net: sq(-1, -3) },
      { idx: [0, 1, 2, 3], color: '#0ea5e9', net: sq(-1, 1) },
      { idx: [4, 0, 3, 7], color: '#10b981', net: sq(-3, -1) },
      { idx: [1, 5, 6, 2], color: '#f59e0b', net: sq(1, -1) },
      { idx: [5, 4, 7, 6], color: '#f43f5e', net: sq(3, -1) },
    ],
  },
  {
    name: 'Square pyramid', V: 5, E: 8, F: 5, scale: 26,
    verts: [[-1, -0.4, 0], [1, -0.4, 0], [1, -0.4, 2], [-1, -0.4, 2], [0, 1.4, 1]],
    faces: [
      { idx: [0, 1, 2, 3], color: '#6366f1', net: sq(-1, -1) },
      { idx: [0, 1, 4], color: '#0ea5e9', net: [[-1, -1], [1, -1], [0, -2.8]] },
      { idx: [1, 2, 4], color: '#10b981', net: [[1, -1], [1, 1], [2.8, 0]] },
      { idx: [2, 3, 4], color: '#f59e0b', net: [[1, 1], [-1, 1], [0, 2.8]] },
      { idx: [3, 0, 4], color: '#f43f5e', net: [[-1, 1], [-1, -1], [-2.8, 0]] },
    ],
  },
  {
    name: 'Triangular prism', V: 6, E: 9, F: 5, scale: 17,
    verts: [[-1, -0.3, -1.2], [1, -0.3, -1.2], [0, 1.44, -1.2], [-1, -0.3, 1.2], [1, -0.3, 1.2], [0, 1.44, 1.2]],
    faces: [
      { idx: [1, 0, 3, 4], color: '#6366f1', net: [[0, 0], [2, 0], [2, 2.4], [0, 2.4]] },
      { idx: [1, 2, 5, 4], color: '#10b981', net: [[2, 0], [4, 0], [4, 2.4], [2, 2.4]] },
      { idx: [0, 2, 5, 3], color: '#f59e0b', net: [[4, 0], [6, 0], [6, 2.4], [4, 2.4]] },
      { idx: [0, 1, 2], color: '#0ea5e9', net: [[0, 0], [0, 2.4], [-1.73, 1.2]] },
      { idx: [5, 4, 3], color: '#f43f5e', net: [[6, 2.4], [6, 0], [7.73, 1.2]] },
    ],
  },
  {
    name: 'Tetrahedron', V: 4, E: 6, F: 4, scale: 26,
    verts: [[0.9, 0.9, 0.9], [0.9, -0.9, -0.9], [-0.9, 0.9, -0.9], [-0.9, -0.9, 0.9]],
    faces: [
      { idx: [0, 1, 2], color: '#6366f1', net: [[-1.3, 0], [1.3, 0], [0, 2.2]] },
      { idx: [0, 1, 3], color: '#10b981', net: [[-1.3, 0], [1.3, 0], [0, -2.2]] },
      { idx: [1, 2, 3], color: '#f59e0b', net: [[1.3, 0], [0, 2.2], [2.5, 2.2]] },
      { idx: [2, 0, 3], color: '#f43f5e', net: [[0, 2.2], [-1.3, 0], [-2.5, 2.2]] },
    ],
  },
];

const TILT = 0.5;
function project(v: V3, theta: number, s: number): [P2, number] {
  const [x, y, z] = v;
  const x1 = x * Math.cos(theta) + z * Math.sin(theta);
  const z1 = -x * Math.sin(theta) + z * Math.cos(theta);
  const y2 = y * Math.cos(TILT) - z1 * Math.sin(TILT);
  const z2 = y * Math.sin(TILT) + z1 * Math.cos(TILT);
  return [[x1 * s, -y2 * s], z2];
}

export function C7_MathsVisualisingSolidShapesSim() {
  const [name, setName] = useState('Cube');
  const [fold, setFold] = useState(0);
  const [theta, setTheta] = useState(0.6);
  const [spin, setSpin] = useState(true);
  const solid = SOLIDS.find((s) => s.name === name)!;
  const raf = useRef(0);

  const netCenter = useMemo(() => {
    const pts = solid.faces.flatMap((f) => f.net);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2] as P2;
  }, [solid]);

  useEffect(() => {
    let alive = true;
    const loop = () => {
      if (!alive) return;
      setTheta((t) => t + (spin && fold > 0.99 ? 0.012 : 0));
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf.current); };
  }, [spin, fold]);

  const t = fold < 0.5 ? 2 * fold * fold : 1 - 2 * (1 - fold) * (1 - fold); // ease in-out
  const polys = solid.faces.map((f) => {
    const pts = f.idx.map((vi, i) => {
      const [[px, py]] = project(solid.verts[vi], theta, solid.scale);
      const nx = (f.net[i][0] - netCenter[0]) * solid.scale;
      const ny = (f.net[i][1] - netCenter[1]) * solid.scale;
      return [nx + (px - nx) * t, ny + (py - ny) * t] as P2;
    });
    const depth = f.idx.reduce((s, vi) => s + project(solid.verts[vi], theta, solid.scale)[1], 0) / f.idx.length;
    return { pts, color: f.color, depth };
  }).sort((a, b) => b.depth - a.depth);
  const netEdges = solid.faces.length * (solid.faces[0].idx.length === 4 ? 4 : 3);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 7 Maths - Visualising Solid Shapes</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Net Folder: Flat Sheet to Solid</h1>
        </div>
        <button onClick={() => { setFold(0); setTheta(0.6); setSpin(true); setName('Cube'); }}
          className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-900/70 rounded-2xl border border-slate-800 p-2">
          <svg viewBox="-200 -130 400 260" className="w-full">
            {polys.map((p, i) => (
              <polygon key={i} points={p.pts.map((q) => q.join(',')).join(' ')} fill={p.color}
                fillOpacity={0.35 + 0.6 * t} stroke="#e2e8f0" strokeWidth={1.2}
                strokeDasharray={t < 0.5 ? '4 3' : undefined}
                style={{ transition: 'fill-opacity 120ms linear' }} />
            ))}
          </svg>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-400 block">Choose a solid</label>
            <select value={name} aria-label="solid" onChange={(e) => { setName(e.target.value); setFold(0); }}
              className="w-full min-h-11 p-2 rounded-xl bg-slate-950 border border-slate-700 text-sm">
              {SOLIDS.map((s) => <option key={s.name}>{s.name}</option>)}
            </select>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Fold</span><span className="font-mono text-indigo-300">{Math.round(fold * 100)}%</span>
              </label>
              <input type="range" min={0} max={100} value={Math.round(fold * 100)} aria-label="fold"
                onChange={(e) => setFold(Number(e.target.value) / 100)} className="w-full mt-1 min-h-11 accent-indigo-500" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setFold(fold > 0.5 ? 0 : 1)} className="flex-1 min-h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold transition-all">
                {fold > 0.5 ? 'Unfold' : 'Snap fold'}
              </button>
              <button onClick={() => setSpin((s) => !s)} className={`flex-1 min-h-11 rounded-xl text-xs font-bold border transition-all ${spin ? 'bg-violet-600 border-violet-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300'}`}>
                Spin {spin ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800"><p className="text-[11px] text-slate-400">Faces</p><p className="font-mono text-xl text-amber-300">{solid.F}</p></div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800"><p className="text-[11px] text-slate-400">Edges</p><p className="font-mono text-xl text-emerald-300">{solid.E}</p></div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800"><p className="text-[11px] text-slate-400">Vertices</p><p className="font-mono text-xl text-indigo-300">{solid.V}</p></div>
            </div>
            <p className="text-xs mt-3 font-mono text-slate-200">V - E + F = {solid.V} - {solid.E} + {solid.F} = <span className="text-emerald-400 font-bold">{solid.V - solid.E + solid.F}</span></p>
            <p className="text-xs mt-1 text-slate-400">The flat net shows <span className="font-mono text-amber-300">{netEdges}</span> edge pieces; folded, pairs glue into <span className="font-mono text-emerald-300">{solid.E}</span> true edges.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> a net does NOT change the solid -- it only changes the view. Count edges in the net and you get too many, because glued pairs are really one edge.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Fold the square pyramid to 100% and read V, E, F -- check by hand that V - E + F still equals 2, then find which face was the base in the net.</p>
        <p className="mt-1">2. Pause spin, fold the triangular prism to 50% and predict: how many edge pairs still need to glue before the net closes?</p>
      </footer>
    </div>
  );
}

export default C7_MathsVisualisingSolidShapesSim;
