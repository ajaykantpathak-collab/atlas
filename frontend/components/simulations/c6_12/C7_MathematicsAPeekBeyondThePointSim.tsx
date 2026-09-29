'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'A decimal number hides between the whole numbers! After the point, the first digit counts tenths ' +
  '(parts of 10) and the second digit counts hundredths (parts of 100). So 2.37 means 2 ones, 3 tenths ' +
  'and 7 hundredths. Zoom into the number line and the point always lands exactly where the digits say.';

export function C7_MathematicsAPeekBeyondThePointSim() {
  const [ones, setOnes] = useState(2);
  const [tenths, setTenths] = useState(3);
  const [hundredths, setHundredths] = useState(7);
  const [zoom, setZoom] = useState<0 | 1 | 2>(0);

  const value = useMemo(() => ones + tenths / 10 + hundredths / 100, [ones, tenths, hundredths]);
  const label = `${ones}.${tenths}${hundredths}`;

  const X0 = 50;
  const X1 = 550;
  const spanToX = (span: number, lo: number, hi: number) => X0 + ((span - lo) / (hi - lo)) * (X1 - X0);

  const ticks0 = Array.from({ length: 5 }, (_, i) => i - 1); // -1 .. 3
  const ticksT = Array.from({ length: 11 }, (_, i) => i); // 0..10 tenths in [ones, ones+1]
  const ticksH = Array.from({ length: 11 }, (_, i) => i); // 0..10 hundredths in [o.t, o.t+0.1]

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">A Peek Beyond the Point</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Place value cards */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {[
          { v: ones, name: 'Ones', color: 'bg-gold-700' },
          { v: tenths, name: 'Tenths', color: 'bg-emerald-700' },
          { v: hundredths, name: 'Hundredths', color: 'bg-amber-600' },
        ].map((c, i) => (
          <React.Fragment key={c.name}>
            {i === 1 && <span className="text-3xl font-black text-slate-400">.</span>}
            <div className={`${c.color} rounded-xl px-4 py-2 text-center border border-slate-500`}>
              <div className="text-3xl font-black">{c.v}</div>
              <div className="text-[10px] uppercase tracking-wide text-slate-200">{c.name}</div>
            </div>
          </React.Fragment>
        ))}
        <div className="ml-3 px-4 py-3 rounded-xl bg-slate-800 border border-gold-500 text-lg font-mono">
          = <span className="text-emerald-400 font-bold">{label}</span>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-xs text-slate-400 mr-1">Magnifier:</span>
        {(['Whole numbers', 'Tenths (x10 zoom)', 'Hundredths (x100 zoom)'] as const).map((z, i) => (
          <button
            key={z}
            onClick={() => setZoom(i as 0 | 1 | 2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              zoom === i ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Number line(s) */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 190" className="w-full">
          {zoom === 0 && (
            <g>
              <line x1={X0} y1={60} x2={X1} y2={60} stroke="#94a3b8" strokeWidth={2} />
              {ticks0.map((t) => (
                <g key={t}>
                  <line x1={spanToX(t, -1, 3)} y1={52} x2={spanToX(t, -1, 3)} y2={68} stroke="#94a3b8" strokeWidth={2} />
                  <text x={spanToX(t, -1, 3)} y={88} textAnchor="middle" fill="#cbd5e1" fontSize={14}>{t}</text>
                </g>
              ))}
              {ticksT.map((i) => (
                <line key={i} x1={spanToX(ones + i / 10, -1, 3)} y1={55} x2={spanToX(ones + i / 10, -1, 3)} y2={65} stroke="#64748b" />
              ))}
              <circle cx={spanToX(value, -1, 3)} cy={60} r={9} fill="#34d399">
                <animate attributeName="r" values="8;10;8" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <text x={spanToX(value, -1, 3)} y={34} textAnchor="middle" fill="#34d399" fontSize={15} fontWeight="bold">{label}</text>
            </g>
          )}
          {zoom === 1 && (
            <g>
              <text x={300} y={24} textAnchor="middle" fill="#a5b4fc" fontSize={13}>
                Zoomed between {ones} and {ones + 1} -- each big step is one tenth
              </text>
              <line x1={X0} y1={70} x2={X1} y2={70} stroke="#94a3b8" strokeWidth={2} />
              {ticksT.map((i) => (
                <g key={i}>
                  <line x1={spanToX(i, 0, 10)} y1={62} x2={spanToX(i, 0, 10)} y2={78} stroke={i === 10 ? '#94a3b8' : '#64748b'} />
                  <text x={spanToX(i, 0, 10)} y={96} textAnchor="middle" fill="#cbd5e1" fontSize={11}>
                    {ones}.{i}
                  </text>
                </g>
              ))}
              <circle cx={spanToX(tenths + hundredths / 100, 0, 10)} cy={70} r={8} fill="#34d399" />
              <text x={spanToX(tenths, 0, 10)} y={40} textAnchor="middle" fill="#34d399" fontSize={13} fontWeight="bold">
                {ones}.{tenths} + {hundredths} hundredths more
              </text>
            </g>
          )}
          {zoom === 2 && (
            <g>
              <text x={300} y={24} textAnchor="middle" fill="#a5b4fc" fontSize={13}>
                Zoomed between {ones}.{tenths} and {ones}.{tenths}9 -- each step is one hundredth
              </text>
              <line x1={X0} y1={70} x2={X1} y2={70} stroke="#94a3b8" strokeWidth={2} />
              {ticksH.map((i) => (
                <g key={i}>
                  <line x1={spanToX(i, 0, 10)} y1={62} x2={spanToX(i, 0, 10)} y2={78} stroke="#64748b" />
                  <text x={spanToX(i, 0, 10)} y={96} textAnchor="middle" fill="#cbd5e1" fontSize={11}>
                    .{tenths}{i}
                  </text>
                </g>
              ))}
              <circle cx={spanToX(hundredths, 0, 10)} cy={70} r={8} fill="#34d399" />
              <text x={spanToX(hundredths, 0, 10)} y={40} textAnchor="middle" fill="#34d399" fontSize={13} fontWeight="bold">
                {label} is exactly {hundredths} hundredth-steps past {ones}.{tenths}0
              </text>
            </g>
          )}
          {/* Bar breakdown: whole / tenths / hundredths widths */}
          <g transform="translate(50, 140)">
            <text x={0} y={0} fill="#94a3b8" fontSize={12}>Length built from digits:</text>
            <rect x={90} y={-12} width={ones * 6} height={16} fill="#38bdf8" rx={3} />
            <rect x={90 + ones * 6} y={-12} width={tenths * 6} height={16} fill="#34d399" rx={3} />
            <rect x={90 + (ones + tenths / 10) * 6} y={-12} width={Math.max(2, hundredths * 0.6)} height={16} fill="#fbbf24" rx={3} />
            <text x={90 + 240} y={0} fill="#e2e8f0" fontSize={12} fontFamily="monospace">2.37 = 2 + 3/10 + 7/100</text>
          </g>
        </svg>
      </div>

      {/* Digit sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {[
          { label: 'Ones digit', v: ones, set: setOnes, color: 'accent-gold-400' },
          { label: 'Tenths digit', v: tenths, set: setTenths, color: 'accent-emerald-400' },
          { label: 'Hundredths digit', v: hundredths, set: setHundredths, color: 'accent-amber-400' },
        ].map((s) => (
          <div key={s.label} className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
            <label className="text-xs text-slate-300 flex justify-between">
              <span>{s.label}</span>
              <span className="font-mono font-bold text-lg">{s.v}</span>
            </label>
            <input
              type="range"
              aria-label={s.label}
              min={0}
              max={9}
              value={s.v}
              onChange={(e) => s.set(Number(e.target.value))}
              className={`w-full mt-2 ${s.color}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Set the tenths digit to 9 and then move the hundredths digit from 0 up to 9. Watch the x100 zoom: what number comes right after 2.99?</li>
          <li>Make the largest and the smallest numbers you can. Which digit is worth the most when you change it by one step -- ones, tenths or hundredths?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsAPeekBeyondThePointSim;
