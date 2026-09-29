'use client';

import React, { useState } from 'react';

/**
 * Class 12 Physics -- Ray Optics and Optical Instruments
 * Thin-lens ray tracing done properly: 1/v - 1/u = 1/f in the Cartesian
 * convention, two constructible rays, real/virtual image classification.
 * Self-contained: react + tailwind only.
 */

export function C12_PhysicsRayOpticsAndOpticalInstrumentsSim() {
  const [fCm, setFCm] = useState(20); // + convex, - concave
  const [objDist, setObjDist] = useState(30); // cm left of lens (u = -objDist)
  const [objH, setObjH] = useState(20); // px on screen

  const u = -objDist; // Cartesian sign
  const invF = fCm === 0 ? 0 : 1 / fCm;
  const denom = invF + 1 / u;
  const atInfinity = Math.abs(denom) < 1e-6;
  const v = atInfinity ? Infinity : 1 / denom;
  const m = atInfinity ? Infinity : v / u;
  const realImage = v > 0;
  const inverted = m < 0;
  const magAbs = Math.abs(m);
  const power = 100 / fCm; // dioptre, f in cm

  // Screen mapping: 1 cm = 3.2 px, lens at x=240, axis y=170
  const S = 3.2;
  const AX = 170;
  const LX = 240;
  const xOf = (cm: number) => LX + cm * S;
  const objX = xOf(u);
  const imgX = atInfinity ? NaN : xOf(v);
  const imgH = atInfinity ? NaN : objH * m; // signed; + = up (svg y is down)
  const tipY = AX - objH;
  const imgTipY = atInfinity ? NaN : AX - imgH;

  // Ray helpers: y at screen x for the line through two points
  const yAt = (x1: number, y1: number, x2: number, y2: number, xT: number) =>
    y1 + ((y2 - y1) * (xT - x1)) / (x2 - x1 || 1e-9);

  // Ray 1: horizontal from object tip to lens, then refracted along the line
  // through/away from F' -- constructed via the image point.
  // Ray 2: straight through the optical centre.

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-teal-950/80 rounded-2xl border border-teal-700 font-mono">f</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Class 12 -- Ray Optics</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Thin Lens Workshop: Trace the Rays Yourself</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 490 300" className="w-full">
            <line x1={10} y1={AX} x2={480} y2={AX} stroke="#475569" strokeWidth={1.5} />
            {[fCm, -fCm].map((fc, i) => (
              <g key={i}>
                <line x1={xOf(fc)} y1={AX - 6} x2={xOf(fc)} y2={AX + 6} stroke="#fbbf24" strokeWidth={2} />
                <text x={xOf(fc)} y={AX + 20} textAnchor="middle" fill="#fbbf24" fontSize={10} fontFamily="monospace">
                  F{i === 0 ? '2' : '1'}
                </text>
              </g>
            ))}
            {/* lens body */}
            {fCm > 0 ? (
              <path d={`M ${LX} 40 Q ${LX + 16} ${AX} ${LX} 290 Q ${LX - 16} ${AX} ${LX} 40 Z`}
                fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={2} />
            ) : (
              <path d={`M ${LX - 7} 40 Q ${LX + 8} ${AX} ${LX - 7} 290 L ${LX + 7} 290 Q ${LX - 8} ${AX} ${LX + 7} 40 Z`}
                fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth={2} />
            )}
            {/* object arrow */}
            <line x1={objX} y1={AX} x2={objX} y2={tipY} stroke="#34d399" strokeWidth={3} />
            <polygon points={`${objX},${tipY - 8} ${objX - 5},${tipY + 2} ${objX + 5},${tipY + 2}`} fill="#34d399" />
            <text x={objX} y={AX + 16} textAnchor="middle" fill="#34d399" fontSize={10} fontFamily="monospace">
              u = {u} cm
            </text>
            {!atInfinity && (
              <>
                {/* image arrow */}
                <line x1={imgX} y1={AX} x2={imgX} y2={imgTipY} stroke="#f472b6" strokeWidth={3}
                  strokeDasharray={realImage ? undefined : '5 4'} />
                <polygon points={`${imgX},${imgTipY + (imgH > 0 ? -8 : 8)} ${imgX - 5},${imgTipY + (imgH > 0 ? 2 : -2)} ${imgX + 5},${imgTipY + (imgH > 0 ? 2 : -2)}`}
                  fill="#f472b6" />
                <text x={imgX} y={AX - 12 - Math.abs(imgH)} textAnchor="middle" fill="#f9a8d4" fontSize={10} fontFamily="monospace">
                  {realImage ? 'real' : 'virtual'} image, v = {v.toFixed(0)} cm
                </text>
                {/* Ray 1: object tip -> lens point -> refracted through/away from focus line (built via image) */}
                <polyline points={`${objX},${tipY} ${LX},${tipY} ${480},${yAt(LX, tipY, imgX, imgTipY, 480)}`}
                  fill="none" stroke="#fbbf24" strokeWidth={1.8} />
                {!realImage && (
                  <line x1={LX} y1={tipY} x2={imgX} y2={imgTipY} stroke="#fbbf24" strokeWidth={1} strokeDasharray="3 4" opacity={0.6} />
                )}
                {/* Ray 2: through optical centre */}
                <line x1={objX} y1={tipY} x2={imgX} y2={imgTipY} stroke="#38bdf8" strokeWidth={1.8} />
                {imgX < 430 && realImage && <line x1={imgX} y1={imgTipY} x2={430} y2={yAt(objX, tipY, imgX, imgTipY, 430)} stroke="#38bdf8" strokeWidth={1.8} opacity={0.4} />}
                {!realImage && <line x1={objX} y1={tipY} x2={imgX} y2={imgTipY} stroke="#38bdf8" strokeWidth={1} strokeDasharray="3 4" opacity={0.6} />}
              </>
            )}
            {atInfinity && (
              <text x={240} y={50} textAnchor="middle" fill="#f87171" fontSize={12} fontFamily="monospace">
                object at F: refracted rays PARALLEL -- image at infinity
              </text>
            )}
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2">
            <div><span className="text-slate-500">v (Cartesian)</span><div className="text-pink-300 font-bold text-sm">{atInfinity ? 'infinity' : v.toFixed(1) + ' cm'}</div></div>
            <div><span className="text-slate-500">m = v/u</span><div className="text-gold-300 font-bold text-sm">{atInfinity ? '--' : m.toFixed(2)}</div></div>
            <div><span className="text-slate-500">Nature</span><div className="text-emerald-300 font-bold text-sm">{atInfinity ? 'at infinity' : `${realImage ? 'real' : 'virtual'}, ${inverted ? 'inverted' : 'erect'}`}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Focal length f (minus = concave)</span><span className="font-mono font-bold text-gold-400">{fCm} cm</span>
              </div>
              <input type="range" min={-40} max={40} step={1} value={fCm} aria-label="Focal length"
                onChange={(e) => setFCm(Number(e.target.value))} className="w-full accent-gold-500" />
              <div className="text-[10px] text-slate-500 mt-1">Power P = 100/f = <b className={power > 0 ? 'text-emerald-300' : 'text-rose-300'}>{fCm === 0 ? '--' : power.toFixed(2) + ' D'}</b></div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Object distance from lens</span><span className="font-mono font-bold text-emerald-400">{objDist} cm</span>
              </div>
              <input type="range" min={8} max={100} step={1} value={objDist} aria-label="Object distance"
                onChange={(e) => setObjDist(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Object height</span><span className="font-mono font-bold text-amber-400">{objH} px</span>
              </div>
              <input type="range" min={8} max={40} step={1} value={objH} aria-label="Object height"
                onChange={(e) => setObjH(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[
                { label: 'u < f', d: 12 },
                { label: 'u = f', d: 20 },
                { label: 'f<u<2f', d: 30 },
                { label: 'u > 2f', d: 70 },
              ].map((p) => (
                <button key={p.label} onClick={() => { setObjDist(p.d); setFCm(Math.abs(fCm) || 20); }}
                  className="py-1 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300">
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-teal-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-teal-300 font-bold">Worked check (f = {fCm} cm, u = {u} cm)</div>
            <div className="text-slate-400">1/v = 1/f + 1/u = {invF.toFixed(4)} + {(1 / u).toFixed(4)}</div>
            <div className="text-slate-300">v = {atInfinity ? 'infinity (rays parallel)' : v.toFixed(2) + ' cm ' + (realImage ? '(right of lens, screen image)' : '(left of lens, virtual)')}</div>
            <div className="text-slate-300">m = -v/|u| = {atInfinity ? '--' : m.toFixed(3)} --&gt; image {atInfinity ? '--' : `${magAbs > 1 ? 'magnified' : magAbs < 1 ? 'diminished' : 'same size'}, ${inverted ? 'inverted' : 'erect'}`}</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Every position of the object is reachable from two sliders: drag u and watch the image
              sweep -- real images flip from huge (u just past f) to pin-point (u large), while the
              concave lens ALWAYS gives a virtual, erect, diminished image (m between 0 and -1...
              between 0 and 1 in magnitude). Magnifier regime: convex lens with u &lt; f.
            </p>
          </div>

          <div className="bg-teal-950/40 rounded-2xl border border-teal-800/50 p-4 text-xs">
            <p className="font-bold text-teal-300 mb-1">What to try</p>
            <p>1. Slide u slowly through f for the convex lens: at what side does the image jump from virtual-and-erect to real-and-inverted, and where does it go at the exact instant u = f?</p>
            <p>2. Set m = -1 exactly (needle at u = 2f). Now switch to the concave lens at the same u and explain why m can never reach -1.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_PhysicsRayOpticsAndOpticalInstrumentsSim;
