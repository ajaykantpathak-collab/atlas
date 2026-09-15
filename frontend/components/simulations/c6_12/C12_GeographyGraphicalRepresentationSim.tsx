'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 Geography -- Graphical Representation of Data
 * ONE concept: the same data tells different truths in different forms.
 * Edit the data, switch the form, see what each choice reveals -- and
 * what it hides. react + tailwind only.
 */

type Form = 'bar' | 'line' | 'pie';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export function C12_GeographyGraphicalRepresentationSim() {
  const [data, setData] = useState<number[]>([12, 18, 25, 42, 38, 30]);
  const [form, setForm] = useState<Form>('bar');
  const [truncate, setTruncate] = useState(false); // y-axis starts at 10, not 0
  const [sel, setSel] = useState(3);

  const max = Math.max(...data);
  const yMin = truncate ? Math.max(0, Math.min(...data) - 4) : 0;
  const total = data.reduce((s, v) => s + v, 0);
  const range = Math.max(1, max - yMin);

  const scaled = (v: number) => ((v - yMin) / range) * 160;

  const monthLabel = MONTHS[sel];
  const share = ((data[sel] / total) * 100).toFixed(1);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-lime-950/80 rounded-2xl border border-lime-700">📊</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-lime-400">Class 12 -- Graphical Representation of Data</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Same Data, Three Stories: Bar, Line, Pie</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {/* axes */}
            <line x1={50} y1={20} x2={50} y2={230} stroke="#475569" />
            <line x1={50} y1={230} x2={440} y2={230} stroke="#475569" />
            <text x={14} y={30} fontSize={9} fill="#64748b">{truncate ? yMin : 0}</text>
            <text x={14} y={40 + 160} fontSize={9} fill="#64748b">{yMin}</text>
            {truncate && <text x={8} y={190} fontSize={9} fill="#f87171">axis cut!</text>}
            {MONTHS.map((m, i) => (
              <text key={m} x={80 + i * 62} y={248} fontSize={10} fill="#94a3b8" textAnchor="middle">{m}</text>
            ))}
            {/* forms */}
            {form === 'bar' && data.map((v, i) => {
              const h = scaled(v);
              return (
                <g key={i} onClick={() => setSel(i)} className="cursor-pointer">
                  <rect x={62 + i * 62} y={230 - h} width={40} height={Math.max(0, h)}
                    fill={sel === i ? '#a3e635' : '#65a30d'} opacity={0.9}
                    className="transition-all duration-300" />
                  <text x={82 + i * 62} y={224 - h} fontSize={9} fill="#d9f99d" textAnchor="middle" fontFamily="monospace">{v}</text>
                </g>
              );
            })}
            {form === 'line' && (
              <g>
                <path d={data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${82 + i * 62},${230 - scaled(v)}`).join(' ')}
                  fill="none" stroke="#a3e635" strokeWidth={3} className="transition-all duration-300" />
                {data.map((v, i) => (
                  <g key={i} onClick={() => setSel(i)} className="cursor-pointer">
                    <circle cx={82 + i * 62} cy={230 - scaled(v)} r={sel === i ? 7 : 5}
                      fill={sel === i ? '#facc15' : '#a3e635'} className="transition-all duration-300" />
                    <text x={82 + i * 62} y={222 - scaled(v)} fontSize={9} fill="#d9f99d" textAnchor="middle" fontFamily="monospace">{v}</text>
                  </g>
                ))}
              </g>
            )}
            {form === 'pie' && (() => {
              let acc = 0;
              const CX = 170, CY = 125, R = 95;
              return (
                <g transform="translate(0,0)">
                  {data.map((v, i) => {
                    const a0 = (acc / total) * 2 * Math.PI - Math.PI / 2;
                    acc += v;
                    const a1 = (acc / total) * 2 * Math.PI - Math.PI / 2;
                    const big = a1 - a0 > Math.PI ? 1 : 0;
                    const off = sel === i ? 6 : 0;
                    const mx = (Math.cos((a0 + a1) / 2)) * off;
                    const my = (Math.sin((a0 + a1) / 2)) * off;
                    const d = `M ${CX + mx} ${CY + my} L ${CX + mx + R * Math.cos(a0)} ${CY + my + R * Math.sin(a0)} A ${R} ${R} 0 ${big} 1 ${CX + mx + R * Math.cos(a1)} ${CY + my + R * Math.sin(a1)} Z`;
                    const cols = ['#65a30d', '#a3e635', '#facc15', '#fb923c', '#f472b6', '#38bdf8'];
                    return (
                      <path key={i} d={d} fill={cols[i]} opacity={sel === i ? 1 : 0.75}
                        onClick={() => setSel(i)} className="cursor-pointer transition-all duration-300" />
                    );
                  })}
                  {data.map((v, i) => {
                    const ang = ((i + 0.5) / data.length) * 2 * Math.PI - Math.PI / 2;
                    const lx = CX + 112 * Math.cos(ang);
                    const ly = CY + 112 * Math.sin(ang);
                    const cols = ['#65a30d', '#a3e635', '#facc15', '#fb923c', '#f472b6', '#38bdf8'];
                    return (
                      <text key={`l${i}`} x={lx} y={ly} fontSize={9} fill={cols[i]} textAnchor="middle">{MONTHS[i]}</text>
                    );
                  })}
                  <text x={CX} y={CY} textAnchor="middle" fontSize={11} fill="#e2e8f0" fontFamily="monospace">
                    {MONTHS[sel]}: {share}%
                  </text>
                  <text x={330} y={90} fontSize={10} fill="#94a3b8">pie: only shares, not change</text>
                </g>
              );
            })()}
            <text x={230} y={280} textAnchor="middle" fontSize={11} fill="#e2e8f0" fontWeight="bold">
              {form === 'bar' ? 'Bar: compares magnitudes' : form === 'line' ? 'Line: shows the TREND' : 'Pie: shows parts of ONE whole'}
            </text>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Total</p>
              <p className="font-mono font-bold text-lime-300">{total}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Selected</p>
              <p className="font-mono font-bold text-amber-300">{monthLabel}: {data[sel]}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Share of total</p>
              <p className="font-mono font-bold text-sky-300">{share}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Rise Feb to Apr</p>
              <p className="font-mono font-bold text-emerald-300">{data[3] - data[1]}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Edit {monthLabel}</span><span className="font-mono font-bold text-amber-400">{data[sel]}</span>
              </div>
              <input type="range" min={0} max={60} value={data[sel]} aria-label={`value for ${monthLabel}`}
                onChange={(e) => setData(data.map((v, i) => (i === sel ? Number(e.target.value) : v)))}
                className="w-full min-h-11 accent-amber-500" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['bar', 'line', 'pie'] as Form[]).map((f) => (
                <button key={f} onClick={() => setForm(f)}
                  className={`min-h-11 rounded-xl text-xs font-bold capitalize ${form === f ? 'bg-lime-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setTruncate(!truncate)}
                className={`min-h-11 rounded-xl text-xs font-bold ${truncate ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Cut y-axis {truncate ? 'ON' : 'OFF'}
              </button>
              <button onClick={() => { setData([12, 18, 25, 42, 38, 30]); setSel(3); setTruncate(false); setForm('bar'); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
            <p className="text-[10px] text-slate-500">Click any bar / point / slice to select the month you edit.</p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;A pie chart shows growth.&quot; It cannot -- pie shows one moment&apos;s shares.
              Switch the same numbers to a line and the Feb-to-Apr rise of {data[3] - data[1]} appears.
              And switch on the axis cut: bars now LOOK twice as different as they are. Charts can
              lie without a single wrong number.
            </p>
          </div>

          <div className="bg-lime-950/40 rounded-2xl border border-lime-800/50 p-4 text-xs">
            <p className="font-bold text-lime-300 mb-1">What to try</p>
            <p>1. Make one month exactly half of another. Compare how obvious that 2:1 ratio looks in bar vs pie form.</p>
            <p>2. Turn on the y-axis cut and shrink the gap between two months. How small a real change can you dress up as a dramatic jump?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_GeographyGraphicalRepresentationSim;
