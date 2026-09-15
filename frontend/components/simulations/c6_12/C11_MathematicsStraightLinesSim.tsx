'use client';

import React, { useState } from 'react';

/**
 * Class 11 Maths -- Straight Lines
 * y = mx + c with a movable probe point: slope angle, point-to-line distance,
 * foot of the perpendicular, and the parallel/perpendicular companions.
 * Self-contained: react + tailwind only.
 */

export function C11_MathematicsStraightLinesSim() {
  const [m, setM] = useState(0.8);
  const [c, setC] = useState(-1);
  const [qx, setQx] = useState(3);
  const [qy, setQy] = useState(4);

  const thetaDeg = (Math.atan(m) * 180) / Math.PI;
  const denom = Math.sqrt(m * m + 1);
  const dist = Math.abs(m * qx - qy + c) / denom; // |m x0 - y0 + c| / sqrt(m^2+1)

  // Foot of perpendicular from Q(qx,qy) onto y = mx + c
  const fx = (qx + m * (qy - c)) / (1 + m * m);
  const fy = (m * qx + m * m * qy + c) / (1 + m * m);

  // Screen mapping: x in [-8, 8], y in [-6, 6]
  const S = 26;
  const ox = 235;
  const oy = 170;
  const px = (x: number) => ox + x * S;
  const py = (y: number) => oy - y * S;

  const xL = -8;
  const xR = 8;
  const yAtL = m * xL + c;
  const yAtR = m * xR + c;
  const onScreen = yAtL <= 6.5 && yAtL >= -6.5 && yAtR <= 6.5 && yAtR >= -6.5;
  const onPoint = (x: number, y: number) => x >= -8 && x <= 8 && y >= -6 && y <= 6;

  // parallel line through Q and perpendicular line through Q (clipped endpoints)
  const yParL = m * xL + (qy - m * qx);
  const yParR = m * xR + (qy - m * qx);
  const mp = Math.abs(m) < 0.01 ? 0.01 : -1 / m; // perpendicular slope (avoid vertical blowout display)
  const yPerpL = mp * xL + (qy - mp * qx);
  const yPerpR = mp * xR + (qy - mp * qx);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700 font-mono">/</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Class 11 -- Straight Lines</span>
          <h1 className="text-xl md:text-2xl font-extrabold">y = mx + c: Slope, Angle, and Distance From a Point</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 340" className="w-full">
            {[-6, -4, -2, 0, 2, 4, 6].map((gx) => (
              <g key={`gx${gx}`}>
                <line x1={px(gx)} y1={20} x2={px(gx)} y2={320} stroke="#1e293b" />
                <text x={px(gx)} y={332} textAnchor="middle" fill="#475569" fontSize={9} fontFamily="monospace">{gx}</text>
              </g>
            ))}
            {[-4, -2, 2, 4, 6].map((gy) => (
              <g key={`gy${gy}`}>
                <line x1={20} y1={py(gy)} x2={450} y2={py(gy)} stroke="#1e293b" />
                <text x={26} y={py(gy) - 4} fill="#475569" fontSize={9} fontFamily="monospace">{gy}</text>
              </g>
            ))}
            <line x1={20} y1={oy} x2={450} y2={oy} stroke="#475569" strokeWidth={1.5} />
            <line x1={ox} y1={20} x2={ox} y2={320} stroke="#475569" strokeWidth={1.5} />

            {onScreen && <line x1={px(xL)} y1={py(yAtL)} x2={px(xR)} y2={py(yAtR)} stroke="#38bdf8" strokeWidth={2.5} />}
            <line x1={20} y1={py(yParL)} x2={450} y2={py(yParR)} stroke="#34d399" strokeWidth={1.2} strokeDasharray="4 5" opacity={0.6} />
            {onPoint(xL, yPerpL) && onPoint(xR, yPerpR) && (
              <line x1={px(xL)} y1={py(yPerpL)} x2={px(xR)} y2={py(yPerpR)} stroke="#fbbf24" strokeWidth={1.2} strokeDasharray="4 5" opacity={0.6} />
            )}

            {/* perpendicular segment Q -> foot */}
            <line x1={px(qx)} y1={py(qy)} x2={px(fx)} y2={py(fy)} stroke="#f472b6" strokeWidth={2} />
            <circle cx={px(fx)} cy={py(fy)} r={5} fill="#f472b6" />
            <text x={px(fx) + 8} y={py(fy) + 14} fill="#f9a8d4" fontSize={10} fontFamily="monospace">
              foot ({fx.toFixed(2)}, {fy.toFixed(2)})
            </text>
            <text x={(px(qx) + px(fx)) / 2 + 6} y={(py(qy) + py(fy)) / 2} fill="#f9a8d4" fontSize={10} fontFamily="monospace">
              d = {dist.toFixed(3)}
            </text>
            <circle cx={px(qx)} cy={py(qy)} r={6} fill="#fbbf24" stroke="#fff" strokeWidth={1.5} />
            <text x={px(qx) + 8} y={py(qy) - 8} fill="#fbbf24" fontSize={11} fontFamily="monospace">
              Q({qx}, {qy})
            </text>
            {/* slope triangle at origin-ish */}
            {onPoint(0, c) && (
              <>
                <text x={px(0) + 5} y={py(c) - 6} fill="#38bdf8" fontSize={10} fontFamily="monospace">c = {c}</text>
              </>
            )}
            <text x={24} y={36} fill="#38bdf8" fontSize={11} fontFamily="monospace">y = {m.toFixed(1)}x {c >= 0 ? '+' : '-'} {Math.abs(c)}</text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Inclination theta = atan(m)</span><div className="text-sky-300 font-bold text-sm">{thetaDeg.toFixed(2)} deg</div></div>
            <div><span className="text-slate-500">Distance Q to line</span><div className="text-pink-300 font-bold text-sm">{dist.toFixed(4)}</div></div>
            <div><span className="text-slate-500">Parallel through Q</span><div className="text-emerald-300 font-bold text-sm">y = {m.toFixed(1)}x {(qy - m * qx >= 0 ? '+' : '-')} {Math.abs(qy - m * qx).toFixed(2)}</div></div>
            <div><span className="text-slate-500">Perpendicular slope</span><div className="text-amber-300 font-bold text-sm">{(-1 / m).toFixed(3)}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Slope m</span><span className="font-mono font-bold text-sky-400">{m.toFixed(1)}</span>
              </div>
              <input type="range" min={-3} max={3} step={0.1} value={m} aria-label="Slope"
                onChange={(e) => setM(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Intercept c</span><span className="font-mono font-bold text-cyan-300">{c}</span>
              </div>
              <input type="range" min={-5} max={5} step={1} value={c} aria-label="Intercept"
                onChange={(e) => setC(Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Probe Q x-coordinate</span><span className="font-mono font-bold text-amber-400">{qx}</span>
              </div>
              <input type="range" min={-7} max={7} step={1} value={qx} aria-label="Probe x"
                onChange={(e) => setQx(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Probe Q y-coordinate</span><span className="font-mono font-bold text-amber-400">{qy}</span>
              </div>
              <input type="range" min={-5} max={5} step={1} value={qy} aria-label="Probe y"
                onChange={(e) => setQy(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-cyan-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-cyan-300 font-bold">Worked distance (point-to-line)</div>
            <div className="text-slate-400">d = |{m.toFixed(1)} x {qx} - ({qy}) + ({c})| / sqrt({m.toFixed(1)}^2 + 1)</div>
            <div className="text-slate-300">= {Math.abs(m * qx - qy + c).toFixed(2)} / {denom.toFixed(3)} = <b className="text-pink-300">{dist.toFixed(4)}</b></div>
            <div className="text-slate-500">general form check: {m.toFixed(1)}x - y {(c >= 0 ? '+' : '-')} {Math.abs(c)} = 0, A = {m.toFixed(1)}, B = -1, C = {c}</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Slope is tan(theta), so m = 1 means a 45-degree climb and m --&gt; infinity means
              vertical. The distance formula is one cosine away: |m x0 - y0 + c| is the vertical gap,
              and dividing by sqrt(m^2+1) projects it onto the perpendicular. The pink foot point is
              where that perpendicular actually lands.
            </p>
          </div>

          <div className="bg-cyan-950/40 rounded-2xl border border-cyan-800/50 p-4 text-xs">
            <p className="font-bold text-cyan-300 mb-1">What to try</p>
            <p>1. Move Q onto the blue line (make d = 0): what relation between qx, qy must hold? Verify by substitution.</p>
            <p>2. Set m = 1 and c = 0 (the line y = x). Find two different Q points at distance exactly 2 x sqrt(2) -- what shape do all such points trace?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_MathematicsStraightLinesSim;
