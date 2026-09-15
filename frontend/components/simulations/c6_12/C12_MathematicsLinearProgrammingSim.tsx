'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 Maths -- Linear Programming
 * Two adjustable constraints plus x,y >= 0: feasible corners are computed by
 * intersecting half-planes, then Z = px + qy is evaluated at every corner.
 * Self-contained: react + tailwind only.
 */

type Pt = { x: number; y: number };

export function C12_MathematicsLinearProgrammingSim() {
  const [a1, setA1] = useState(1);
  const [b1, setB1] = useState(1);
  const [c1, setC1] = useState(6);
  const [a2, setA2] = useState(2);
  const [b2, setB2] = useState(1);
  const [c2, setC2] = useState(8);
  const [p, setP] = useState(3);
  const [q, setQ] = useState(5);
  const [mode, setMode] = useState<'max' | 'min'>('max');

  const feasibleAt = (x: number, y: number) =>
    a1 * x + b1 * y <= c1 + 1e-7 && a2 * x + b2 * y <= c2 + 1e-7 && x >= -1e-7 && y >= -1e-7;

  // Candidate corners: intersections of each pair of boundary lines
  const lines: { a: number; b: number; c: number }[] = [
    { a: a1, b: b1, c: c1 },
    { a: a2, b: b2, c: c2 },
    { a: 1, b: 0, c: 0 }, // x = 0
    { a: 0, b: 1, c: 0 }, // y = 0
  ];
  const candidates: Pt[] = useMemo(() => {
    const pts: Pt[] = [];
    for (let i = 0; i < lines.length; i++) {
      for (let j = i + 1; j < lines.length; j++) {
        const d = lines[i].a * lines[j].b - lines[i].b * lines[j].a;
        if (Math.abs(d) < 1e-9) continue;
        const x = (lines[i].c * lines[j].b - lines[i].b * lines[j].c) / d;
        const y = (lines[i].a * lines[j].c - lines[i].c * lines[j].a) / d;
        if (Math.abs(x) < 1e-7) pts.push({ x: 0, y });
        else if (Math.abs(y) < 1e-7) pts.push({ x, y: 0 });
        else pts.push({ x, y });
      }
    }
    const unique: Pt[] = [];
    for (const pt of pts) {
      if (!unique.some((u) => Math.abs(u.x - pt.x) < 1e-6 && Math.abs(u.y - pt.y) < 1e-6)) unique.push(pt);
    }
    const feas = unique.filter((pt) => feasibleAt(pt.x, pt.y));
    // order the convex polygon by angle around its centroid
    if (feas.length < 3) return feas;
    const cx = feas.reduce((s, u) => s + u.x, 0) / feas.length;
    const cy = feas.reduce((s, u) => s + u.y, 0) / feas.length;
    return [...feas].sort((u, v) => Math.atan2(u.y - cy, u.x - cx) - Math.atan2(v.y - cy, v.x - cx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a1, b1, c1, a2, b2, c2]);

  const cornerValues = candidates.map((pt) => ({ ...pt, z: p * pt.x + q * pt.y }));
  const best = cornerValues.length
    ? cornerValues.reduce((acc, cv) => (mode === 'max' ? (cv.z > acc.z ? cv : acc) : cv.z < acc.z ? cv : acc))
    : null;

  // Screen mapping: 0..12 both axes
  const px = (x: number) => 45 + (x / 12) * 400;
  const py = (y: number) => 250 - (y / 12) * 220;

  const lineTo = (a: number, b: number, c: number) => {
    // returns two screen points clipping line ax+by=c to the window
    const pts: Pt[] = [];
    if (Math.abs(b) > 1e-9) pts.push({ x: 0, y: c / b });
    if (Math.abs(a) > 1e-9) pts.push({ x: c / a, y: 0 });
    if (pts.length < 2) return null;
    const [p1, p2] = pts;
    const t = (pt: Pt) => px(pt.x) + ',' + py(pt.y);
    return `${t(p1)} ${t(p2)}`;
  };

  // iso-profit line through best corner
  const iso = best ? lineTo(p, q, p * best.x + q * best.y) : null;
  const polyPts = candidates.map((pt) => `${px(Math.max(0, pt.x))},${py(Math.max(0, pt.y))}`).join(' ');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-yellow-950/80 rounded-2xl border border-yellow-700 font-mono">Z</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Class 12 -- Linear Programming</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Corner Point Method, Computed Before Your Eyes</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 280" className="w-full">
            {candidates.length >= 3 && <polygon points={polyPts} fill="rgba(250,204,21,0.18)" stroke="#facc15" strokeWidth={2} />}
            <line x1={45} y1={250} x2={445} y2={250} stroke="#475569" strokeWidth={2} />
            <line x1={45} y1={250} x2={45} y2={20} stroke="#475569" strokeWidth={2} />
            {[
              { l: lineTo(a1, b1, c1), col: '#38bdf8', txt: `${a1}x+${b1}y=${c1}` },
              { l: lineTo(a2, b2, c2), col: '#f472b6', txt: `${a2}x+${b2}y=${c2}` },
            ].map((ln, i) => ln.l && (
              <g key={i}>
                <line x1={ln.l.split(' ')[0].split(',')[0]} y1={ln.l.split(' ')[0].split(',')[1]}
                  x2={ln.l.split(' ')[1].split(',')[0]} y2={ln.l.split(' ')[1].split(',')[1]}
                  stroke={ln.col} strokeWidth={2.5} />
                <text x={i === 0 ? 60 : 60} y={36 + i * 16} fill={ln.col} fontSize={10} fontFamily="monospace">{ln.txt}</text>
              </g>
            ))}
            {iso && (
              <line x1={iso.split(' ')[0].split(',')[0]} y1={iso.split(' ')[0].split(',')[1]}
                x2={iso.split(' ')[1].split(',')[0]} y2={iso.split(' ')[1].split(',')[1]}
                stroke="#facc15" strokeWidth={1.5} strokeDasharray="6 5" />
            )}
            {cornerValues.map((cv, i) => (
              <g key={i}>
                <circle cx={px(cv.x)} cy={py(cv.y)} r={4.5} fill={best && cv.x === best.x && cv.y === best.y ? '#f472b6' : '#e2e8f0'} />
                <text x={px(cv.x) + 7} y={py(cv.y) - 6} fontSize={9} fontFamily="monospace"
                  fill={best && cv.x === best.x && cv.y === best.y ? '#f9a8d4' : '#94a3b8'}>
                  Z={cv.z.toFixed(1)}
                </text>
              </g>
            ))}
            <text x={430} y={266} textAnchor="end" fill="#64748b" fontSize={10} fontFamily="monospace">x</text>
            <text x={50} y={30} fill="#64748b" fontSize={10} fontFamily="monospace">y</text>
            {best && (
              <text x={240} y={272} textAnchor="middle" fill="#f9a8d4" fontSize={11} fontWeight="bold" fontFamily="monospace">
                {mode === 'max' ? 'Maximum' : 'Minimum'} Z = {best.z.toFixed(2)} at ({best.x.toFixed(2)}, {best.y.toFixed(2)})
              </text>
            )}
          </svg>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[11px] font-bold text-sky-300 font-mono">Constraint 1: a1 x + b1 y &lt;= c1</p>
            {([['a1', a1, setA1], ['b1', b1, setB1], ['c1', c1, setC1]] as [string, number, (n: number) => void][]).map(([lbl, val, set]) => (
              <div key={lbl}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{lbl}</span><span className="font-mono font-bold text-sky-400">{val}</span>
                </div>
                <input type="range" min={lbl.startsWith('c') ? 1 : 0} max={9} step={1} value={val} aria-label={lbl}
                  onChange={(e) => set(Number(e.target.value))} className="w-full accent-sky-500" />
              </div>
            ))}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[11px] font-bold text-pink-300 font-mono">Constraint 2: a2 x + b2 y &lt;= c2</p>
            {([['a2', a2, setA2], ['b2', b2, setB2], ['c2', c2, setC2]] as [string, number, (n: number) => void][]).map(([lbl, val, set]) => (
              <div key={lbl}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{lbl}</span><span className="font-mono font-bold text-pink-400">{val}</span>
                </div>
                <input type="range" min={lbl.startsWith('c') ? 1 : 0} max={9} step={1} value={val} aria-label={lbl}
                  onChange={(e) => set(Number(e.target.value))} className="w-full accent-pink-500" />
              </div>
            ))}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-yellow-800/60 p-4 space-y-2">
            <p className="text-[11px] font-bold text-yellow-300 font-mono">Objective Z = p x + q y</p>
            {([['p', p, setP], ['q', q, setQ]] as [string, number, (n: number) => void][]).map(([lbl, val, set]) => (
              <div key={lbl}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{lbl}</span><span className="font-mono font-bold text-yellow-400">{val}</span>
                </div>
                <input type="range" min={0} max={9} step={1} value={val} aria-label={lbl}
                  onChange={(e) => set(Number(e.target.value))} className="w-full accent-yellow-500" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button onClick={() => setMode('max')} className={`py-1.5 rounded-lg text-xs font-bold ${mode === 'max' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800'}`}>Maximise</button>
              <button onClick={() => setMode('min')} className={`py-1.5 rounded-lg text-xs font-bold ${mode === 'min' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800'}`}>Minimise</button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-3 text-xs font-mono">
            <div className="text-slate-400 mb-1">Feasible corners ({cornerValues.length}):</div>
            {cornerValues.map((cv, i) => (
              <div key={i} className={best && cv.x === best.x && cv.y === best.y ? 'text-pink-300 font-bold' : 'text-slate-400'}>
                ({cv.x.toFixed(2)}, {cv.y.toFixed(2)}) --&gt; Z = {cv.z.toFixed(2)}
              </div>
            ))}
            {cornerValues.length === 0 && <div className="text-rose-400">No feasible region with these constraints.</div>}
          </div>

          <div className="bg-yellow-950/40 rounded-2xl border border-yellow-800/50 p-4 text-xs">
            <p className="font-bold text-yellow-300 mb-1">What to try</p>
            <p>1. Push c2 to 0: the region collapses onto the y-axis and corners merge -- find which values make two corners coincide.</p>
            <p>2. Set Z = 1x + 1y and slide the iso-profit line: which corner wins for BOTH max and min? Why is min always at an axis here?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_MathematicsLinearProgrammingSim;
