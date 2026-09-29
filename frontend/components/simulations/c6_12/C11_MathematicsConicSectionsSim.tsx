'use client';

import React, { useState } from 'react';

/**
 * Class 11 Maths -- Conic Sections
 * One eccentricity slider morphs ellipse -> parabola -> hyperbola with live
 * foci, directrices and latus rectum, plotted from parametric equations.
 * Self-contained: react + tailwind only.
 */

export function C11_MathematicsConicSectionsSim() {
  const [e, setE] = useState(0.5);
  const [a, setA] = useState(3);
  const [showGuides, setShowGuides] = useState(true);

  const isEllipse = e < 1;
  const isParabola = e === 1;
  const b = isParabola ? 0 : a * Math.sqrt(Math.abs(1 - e * e));
  const c = isParabola ? a : a * e;
  const latus = isParabola ? 4 * a : (2 * b * b) / a;
  const directrix = isParabola ? a : a / e;

  const type = isEllipse ? 'Ellipse' : isParabola ? 'Parabola' : 'Hyperbola';
  const equation = isParabola
    ? `y^2 = ${4 * a}x`
    : isEllipse
      ? `x^2/${(a * a).toFixed(2)} + y^2/${(b * b).toFixed(2)} = 1`
      : `x^2/${(a * a).toFixed(2)} - y^2/${(b * b).toFixed(2)} = 1`;

  // Parametric curve in unit-space, scaled to screen
  const S = 20; // px per unit
  const cx = 235;
  const cy = 170;
  const pts: string[] = [];
  if (isParabola) {
    for (let i = 0; i <= 120; i++) {
      const t = -4 + (8 * i) / 120;
      pts.push(`${cx + a * t * t * S * 0.28},${cy - 2 * a * t * S * 0.85}`);
    }
  } else if (isEllipse) {
    for (let i = 0; i <= 120; i++) {
      const t = (2 * Math.PI * i) / 120;
      pts.push(`${cx + a * Math.cos(t) * S},${cy - b * Math.sin(t) * S}`);
    }
  } else {
    for (let i = 0; i <= 60; i++) {
      const u = (2.2 * i) / 60;
      pts.push(`${cx + a * Math.cosh(u) * S},${cy - b * Math.sinh(u) * S}`);
    }
    for (let i = 0; i <= 60; i++) {
      const u = (2.2 * i) / 60;
      pts.push(`${cx - a * Math.cosh(u) * S},${cy - b * Math.sinh(u) * S}`);
    }
  }

  const focusColor = '#fbbf24';

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-rose-950/80 rounded-2xl border border-rose-700 font-mono">e</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Class 11 -- Conic Sections</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Eccentricity: One Number, Every Conic</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 340" className="w-full">
            <line x1={15} y1={cy} x2={455} y2={cy} stroke="#475569" strokeWidth={1.5} />
            <line x1={cx} y1={15} x2={cx} y2={325} stroke="#475569" strokeWidth={1.5} />
            {showGuides && (
              <>
                <line x1={cx - directrix * S} y1={15} x2={cx - directrix * S} y2={325}
                  stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="6 5" />
                <text x={cx - directrix * S - 6} y={30} textAnchor="end" fill="#38bdf8" fontSize={10} fontFamily="monospace">
                  directrix x = -{directrix.toFixed(2)}
                </text>
                {isEllipse && (
                  <line x1={cx + directrix * S} y1={15} x2={cx + directrix * S} y2={325}
                    stroke="#38bdf8" strokeWidth={1} strokeDasharray="4 6" opacity={0.5} />
                )}
              </>
            )}
            <polyline points={pts.join(' ')} fill="none" stroke="#f472b6" strokeWidth={2.5} />
            {isEllipse ? (
              <>
                <circle cx={cx - c * S} cy={cy} r={5} fill={focusColor} />
                <circle cx={cx + c * S} cy={cy} r={5} fill={focusColor} />
                <text x={cx - c * S} y={cy + 18} textAnchor="middle" fill={focusColor} fontSize={10} fontFamily="monospace">S&apos;(-{c.toFixed(1)},0)</text>
                <text x={cx + c * S} y={cy + 18} textAnchor="middle" fill={focusColor} fontSize={10} fontFamily="monospace">S({c.toFixed(1)},0)</text>
              </>
            ) : isParabola ? (
              <>
                <circle cx={cx + a * S} cy={cy} r={5} fill={focusColor} />
                <text x={cx + a * S} y={cy + 18} textAnchor="middle" fill={focusColor} fontSize={10} fontFamily="monospace">S({a},0)</text>
              </>
            ) : (
              <>
                <circle cx={cx - c * S} cy={cy} r={5} fill={focusColor} />
                <circle cx={cx + c * S} cy={cy} r={5} fill={focusColor} />
                <text x={cx - c * S} y={cy + 18} textAnchor="middle" fill={focusColor} fontSize={10} fontFamily="monospace">(-{c.toFixed(1)},0)</text>
                <text x={cx + c * S} y={cy + 18} textAnchor="middle" fill={focusColor} fontSize={10} fontFamily="monospace">({c.toFixed(1)},0)</text>
              </>
            )}
            {/* latus rectum */}
            {showGuides && (
              <>
                <line x1={cx + (isParabola ? a : c) * S} y1={cy - (latus / 2) * S * (isParabola ? 0.85 : 1)}
                  x2={cx + (isParabola ? a : c) * S} y2={cy + (latus / 2) * S * (isParabola ? 0.85 : 1)}
                  stroke="#34d399" strokeWidth={2.5} />
                <text x={cx + (isParabola ? a : c) * S + 8} y={cy - (latus / 2) * S * (isParabola ? 0.85 : 1)}
                  fill="#34d399" fontSize={10} fontFamily="monospace">latus rectum = {latus.toFixed(2)}</text>
              </>
            )}
            <text x={20} y={325} fill="#64748b" fontSize={11} fontFamily="monospace">{equation}</text>
          </svg>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Eccentricity e</span>
                <span className={`font-mono font-bold ${isEllipse ? 'text-emerald-400' : isParabola ? 'text-amber-400' : 'text-rose-400'}`}>{e.toFixed(2)}</span>
              </div>
              <input type="range" min={0.1} max={2} step={0.05} value={e} aria-label="Eccentricity"
                onChange={(ev) => setE(Number(ev.target.value))} className="w-full accent-rose-500" />
              <div className="flex gap-1 mt-2">
                {[
                  { label: 'circle-ish 0.2', v: 0.2 },
                  { label: 'ellipse 0.7', v: 0.7 },
                  { label: 'parabola 1.0', v: 1 },
                  { label: 'hyperbola 1.6', v: 1.6 },
                ].map((p) => (
                  <button key={p.label} onClick={() => setE(p.v)}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-bold ${e === p.v ? 'bg-rose-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Semi-transverse axis a</span><span className="font-mono font-bold text-gold-400">{a}</span>
              </div>
              <input type="range" min={1} max={5} step={0.5} value={a} aria-label="Axis a"
                onChange={(ev) => setA(Number(ev.target.value))} className="w-full accent-gold-500" />
            </div>
            <button onClick={() => setShowGuides((s) => !s)}
              className={`w-full py-2 rounded-xl text-xs font-bold ${showGuides ? 'bg-slate-700 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
              {showGuides ? 'Hide foci, directrix, latus rectum' : 'Show guides'}
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-rose-800/60 p-4 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Curve</span><div className="text-rose-300 font-bold text-sm">{type}</div></div>
            <div><span className="text-slate-500">b = a sqrt(1-e^2) or sqrt(e^2-1)</span><div className="text-gold-300 font-bold text-sm">{isParabola ? '--' : b.toFixed(2)}</div></div>
            <div><span className="text-slate-500">Focal distance c = ae</span><div className="text-amber-300 font-bold text-sm">{isParabola ? '--' : c.toFixed(2)}</div></div>
            <div><span className="text-slate-500">Semi-latus rectum b^2/a</span><div className="text-emerald-300 font-bold text-sm">{isParabola ? (2 * a).toFixed(2) : ((b * b) / a).toFixed(2)}</div></div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Every conic is the locus of a point whose distance from the focus is e times its
              distance from the directrix. e &lt; 1 pulls the curve into a closed ellipse, e = 1
              exactly balances it into the parabola, and e &gt; 1 lets it escape along two branches.
              Watch the two foci merge into one as e --&gt; 1 from below, then split outward again.
            </p>
          </div>

          <div className="bg-rose-950/40 rounded-2xl border border-rose-800/50 p-4 text-xs">
            <p className="font-bold text-rose-300 mb-1">What to try</p>
            <p>1. Park e at 0.9 and note c, then cross to 1.1: the curve rips open. At what a-value does the focus of the hyperbola land exactly at x = 5?</p>
            <p>2. Verify the ellipse identity by computing a^2 = b^2 + c^2 from the readouts for three different e values.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_MathematicsConicSectionsSim;
