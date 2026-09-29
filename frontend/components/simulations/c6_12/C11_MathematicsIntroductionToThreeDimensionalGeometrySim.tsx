'use client';

import React, { useState } from 'react';

/**
 * Class 11 Maths -- Introduction to Three Dimensional Geometry
 * A turntable-rotatable 3D coordinate system: move P(x,y,z), read distances
 * to the origin and each axis, and identify the octant from coordinate signs.
 * Self-contained: react + tailwind only.
 */

const EL = Math.PI / 6; // elevation 30 deg

export function C11_MathematicsIntroductionToThreeDimensionalGeometrySim() {
  const [px, setPx] = useState(6);
  const [py, setPy] = useState(4);
  const [pz, setPz] = useState(7);
  const [azimuth, setAzimuth] = useState(0.6);

  const dist = (x: number, y: number, z: number) => Math.sqrt(x * x + y * y + z * z);
  const opDist = dist(px, py, pz);
  const dX = Math.sqrt(py * py + pz * pz);
  const dY = Math.sqrt(px * px + pz * pz);
  const dZ = Math.sqrt(px * px + py * py);

  // Octant from sign pattern
  const octant = (() => {
    const i = (px > 0 ? 0 : 1) + (py > 0 ? 0 : 2) + (pz > 0 ? 0 : 4);
    return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][i] + '';
  })();

  const ca = Math.cos(azimuth);
  const sa = Math.sin(azimuth);
  const ce = Math.cos(EL);
  const se = Math.sin(EL);
  // rotate about z by azimuth, then tilt down by elevation
  const proj = (x: number, y: number, z: number): [number, number] => {
    const u = x * sa - y * ca; // screen horizontal
    const d = x * ca + y * sa; // depth
    const v = -(z * ce - d * se); // screen vertical (svg y grows down)
    return [260 + u * 26, 170 + v * 26];
  };

  const [ox, oy] = proj(0, 0, 0);
  const [axX, ayX] = proj(10, 0, 0);
  const [axY, ayY] = proj(0, 10, 0);
  const [axZ, azZ] = proj(0, 0, 10);
  const [pX, pY] = proj(px, py, pz);
  const [fX, fY] = proj(px, py, 0); // foot in xy-plane
  const [gX, gY] = proj(px, 0, pz); // xz drop
  const [hX, hY] = proj(0, py, pz); // yz drop

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 font-mono">xyz</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 11 -- Three Dimensional Geometry</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Coordinates in Space: Point P on a Turntable</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 520 340" className="w-full">
            <line x1={ox} y1={oy} x2={axX} y2={ayX} stroke="#f472b6" strokeWidth={2} />
            <polygon points={`${axX},${ayX} ${axX - 10},${ayY + 4} ${axX - 4},${ayY - 8}`} fill="#f472b6" opacity={0.8} />
            <text x={axX + 4} y={ayY} fill="#f9a8d4" fontSize={12} fontFamily="monospace">x</text>
            <line x1={ox} y1={oy} x2={axY} y2={ayY} stroke="#34d399" strokeWidth={2} />
            <text x={axY + 4} y={ayY} fill="#6ee7b7" fontSize={12} fontFamily="monospace">y</text>
            <line x1={ox} y1={oy} x2={axZ} y2={azZ} stroke="#38bdf8" strokeWidth={2} />
            <text x={axZ + 6} y={azZ} fill="#7dd3fc" fontSize={12} fontFamily="monospace">z</text>
            <circle cx={ox} cy={oy} r={4} fill="#94a3b8" />
            <text x={ox - 14} y={oy + 16} fill="#94a3b8" fontSize={11} fontFamily="monospace">O(0,0,0)</text>

            {/* projections and drop lines */}
            <line x1={pX} y1={pY} x2={fX} y2={fY} stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" />
            <line x1={pX} y1={pY} x2={gX} y2={gY} stroke="#475569" strokeWidth={1} strokeDasharray="3 4" />
            <line x1={pX} y1={pY} x2={hX} y2={hY} stroke="#475569" strokeWidth={1} strokeDasharray="3 4" />
            <line x1={ox} y1={oy} x2={fX} y2={fY} stroke="#64748b" strokeWidth={1.5} />
            <circle cx={fX} cy={fY} r={3.5} fill="#a78bfa" />
            <text x={fX + 6} y={fY + 12} fill="#a78bfa" fontSize={10} fontFamily="monospace">F({px},{py},0)</text>

            {/* the point */}
            <circle cx={pX} cy={pY} r={7} fill="#fbbf24" stroke="#fff" strokeWidth={1.5} />
            <text x={pX + 10} y={pY - 10} fill="#fbbf24" fontSize={12} fontWeight="bold" fontFamily="monospace">
              P({px}, {py}, {pz})
            </text>
            <text x={20} y={325} fill="#64748b" fontSize={11} fontFamily="monospace">
              dashed drops: P to the xy, xz and yz planes
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">OP = sqrt(x^2+y^2+z^2)</span><div className="text-amber-300 font-bold text-sm">{opDist.toFixed(3)}</div></div>
            <div><span className="text-slate-500">Octant (sign pattern)</span><div className="text-gold-300 font-bold text-sm">{octant}</div></div>
            <div><span className="text-slate-500">P to x-axis = sqrt(y^2+z^2)</span><div className="text-pink-300 font-bold text-sm">{dX.toFixed(3)}</div></div>
            <div><span className="text-slate-500">P to y-axis</span><div className="text-emerald-300 font-bold text-sm">{dY.toFixed(3)}</div></div>
            <div><span className="text-slate-500">P to z-axis</span><div className="text-gold-300 font-bold text-sm">{dZ.toFixed(3)}</div></div>
            <div><span className="text-slate-500">Pythagoras check: PF^2 + OF^2</span><div className="text-slate-300 font-bold text-sm">{(pz * pz + px * px + py * py).toFixed(2)} = OP^2 = {(opDist * opDist).toFixed(2)}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            {([['x', px, setPx, 'text-pink-400'], ['y', py, setPy, 'text-emerald-400'], ['z', pz, setPz, 'text-gold-400']] as [string, number, (n: number) => void, string][]).map(([lbl, val, set, col]) => (
              <div key={lbl}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Coordinate {lbl}</span><span className={`font-mono font-bold ${col}`}>{val}</span>
                </div>
                <input type="range" min={-10} max={10} step={1} value={val} aria-label={`Coordinate ${lbl}`}
                  onChange={(e) => set(Number(e.target.value))} className="w-full accent-gold-500" />
              </div>
            ))}
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>View azimuth (rotate room)</span><span className="font-mono font-bold text-gold-400">{((azimuth * 180) / Math.PI).toFixed(0)} deg</span>
              </div>
              <input type="range" min={0} max={6.28} step={0.02} value={azimuth} aria-label="View azimuth"
                onChange={(e) => setAzimuth(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[
                { label: 'A(3,4,5)', x: 3, y: 4, z: 5 },
                { label: 'B(-2,5,3)', x: -2, y: 5, z: 3 },
                { label: 'C(4,-4,-6)', x: 4, y: -4, z: -6 },
                { label: 'D(-1,-2,-3)', x: -1, y: -2, z: -3 },
              ].map((p) => (
                <button key={p.label} onClick={() => { setPx(p.x); setPy(p.y); setPz(p.z); }}
                  className="py-1 rounded-lg text-[9px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300">
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-gold-300 font-bold">Octant decoder</div>
            <div className="text-slate-400">signs of (x, y, z) name the octant:</div>
            <div className="text-slate-400">(+,+,+) = I, (-,+,+) = II, (-,-,+) = III, (+,-,+) = IV</div>
            <div className="text-slate-400">(+,+,-) = V, (-,+,-) = VI, (-,-,-) = VII, (+,-,-) = VIII</div>
            <div className="text-slate-500">Current: sign pattern ({px > 0 ? '+' : '-'}{py > 0 ? '+' : '-'}{pz > 0 ? '+' : '-'}) = Octant {octant}</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Distance in space is just Pythagoras twice: first in the xy-plane to the foot F, then
              up the z direction -- OP^2 = x^2 + y^2 + z^2. Distances to the AXES skip one
              coordinate each (distance to the x-axis uses only y and z). Rotate the room: the
              numbers never change, only the view does -- that is coordinate-free geometry.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Find a point equidistant (distance 5) from all three axes -- what must x^2 = y^2 = z^2 be?</p>
            <p>2. Visit all three preset points and list their octants; then flip z of B from 3 to -3 and confirm it crosses exactly one plane (z = 0).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_MathematicsIntroductionToThreeDimensionalGeometrySim;
