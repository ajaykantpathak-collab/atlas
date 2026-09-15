'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Drainage System (India)
 * ONE concept: a river's REGIME -- its yearly heartbeat of discharge.
 * Himalayan rivers are perennial (glacier melt + monsoon, two peaks);
 * Peninsular rivers live and die with the monsoon (one sharp peak).
 * Low flow concentrates pollution. react + tailwind only.
 */

type RiverId = 'ganga' | 'brahmaputra' | 'indus' | 'godavari' | 'krishna' | 'narmada';

interface River {
  id: RiverId; name: string; kind: 'himalayan' | 'peninsular';
  base: number; monA: number; monPeak: number; snowA: number; snowPeak: number;
  loadT: number; note: string;
}

const RIVERS: River[] = [
  { id: 'ganga', name: 'Ganga', kind: 'himalayan', base: 2500, monA: 30000, monPeak: 8, snowA: 15000, snowPeak: 6, loadT: 260, note: 'Gangotri glacier + monsoon: perennial, double peak' },
  { id: 'brahmaputra', name: 'Brahmaputra', kind: 'himalayan', base: 4000, monA: 40000, monPeak: 8, snowA: 20000, snowPeak: 6.2, loadT: 180, note: 'giant snow/glacier feed in Tibet, fiercest monsoon flood' },
  { id: 'indus', name: 'Indus', kind: 'himalayan', base: 1600, monA: 11000, monPeak: 8, snowA: 9000, snowPeak: 6, loadT: 120, note: 'mostly glacier melt; monsoon misses much of its basin' },
  { id: 'godavari', name: 'Godavari', kind: 'peninsular', base: 300, monA: 13000, monPeak: 8, snowA: 0, snowPeak: 6, loadT: 90, note: 'rain-fed only: a monsoon river, a summer trickle' },
  { id: 'krishna', name: 'Krishna', kind: 'peninsular', base: 150, monA: 8500, monPeak: 8, snowA: 0, snowPeak: 6, loadT: 70, note: 'rain-fed; shrinks to pools by April-May' },
  { id: 'narmada', name: 'Narmada', kind: 'peninsular', base: 160, monA: 7800, monPeak: 8.6, snowA: 0, snowPeak: 6, loadT: 60, note: 'west-flowing rift river; floods late in the monsoon' }
];

const MONTH_FULL = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function C11_GeographyRiverRegimeSim() {
  const [riverId, setRiverId] = useState<RiverId>('godavari');
  const [monthT, setMonthT] = useState(4.2);
  const [monsoon, setMonsoon] = useState(100);
  const [tempAnom, setTempAnom] = useState(0);
  const [dams, setDams] = useState(false);

  const river = RIVERS.find((r) => r.id === riverId) || RIVERS[0];

  const rawQ = useMemo(() => (t: number) => {
    const monF = monsoon / 100;
    const meltF = 1 + 0.35 * tempAnom;
    const shift = -0.3 * tempAnom; // warmer -> melt peaks earlier
    const g = (pk: number, amp: number, sig: number) =>
      amp * Math.exp(-((t - pk) * (t - pk)) / (2 * sig * sig));
    return river.base
      + g(river.monPeak, river.monA * monF, 1.6)
      + (river.kind === 'himalayan' ? g(river.snowPeak + shift, river.snowA * meltF, 2.0) : 0);
  }, [river, monsoon, tempAnom]);

  const qAt = useMemo(() => (t: number) => {
    if (!dams) return rawQ(t);
    let sum = 0;
    for (let m = 0; m < 12; m++) sum += rawQ(m);
    const mean = sum / 12;
    return mean + (rawQ(t) - mean) * 0.35; // regulation flattens the regime
  }, [rawQ, dams]);

  const q = qAt(monthT);
  const bod = river.loadT / (86.4 * Math.max(q, 5)); // mg/L: load(t/day) / (86.4 * Q(m3/s))
  const bodState = bod < 3 ? { label: 'safe for bathing (CPCB < 3)', c: 'text-emerald-300' }
    : bod < 6 ? { label: 'polluted (needs treatment)', c: 'text-amber-300' }
      : { label: 'severely polluted', c: 'text-rose-400' };

  const stats = useMemo(() => {
    let peak = { q: 0, t: 0 }, min = { q: Infinity, t: 0 }, sum = 0, n = 0;
    for (let t = 0; t < 12; t += 0.05) {
      const v = qAt(t);
      if (v > peak.q) peak = { q: v, t };
      if (v < min.q) min = { q: v, t };
      sum += v; n++;
    }
    return { peak, min, mean: sum / n };
  }, [qAt]);

  const qMax = Math.max(stats.peak.q, 1);
  const X = (t: number) => 42 + (t / 12) * 396;
  const Y = (v: number) => 208 - (v / qMax) * 150;
  const curve = Array.from({ length: 121 }, (_, i) => {
    const t = (i / 120) * 12;
    return `${i === 0 ? 'M' : 'L'} ${X(t).toFixed(1)},${Y(qAt(t)).toFixed(1)}`;
  }).join(' ');
  const area = `${curve} L ${X(12).toFixed(1)},208 L ${X(0).toFixed(1)},208 Z`;

  const curMonth = MONTH_FULL[Math.floor(monthT) % 12];
  const gaugeFill = Math.min(1, q / qMax);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700">💧</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Class 11 -- Drainage System (India)</span>
          <h1 className="text-xl md:text-2xl font-extrabold">River Regimes: the Yearly Heartbeat</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {MONTH_FULL.map((m, i) => (
              <g key={m}>
                <line x1={X(i)} y1={208} x2={X(i)} y2={214} stroke="#334155" />
                <text x={X(i) + 6} y={224} fontSize={8} fill="#64748b">{m}</text>
              </g>
            ))}
            <line x1={42} y1={208} x2={438} y2={208} stroke="#334155" />
            <path d={area} fill="rgba(56,189,248,0.15)" className="transition-all duration-300" />
            <path d={curve} fill="none" stroke="#38bdf8" strokeWidth={2.5} className="transition-all duration-200" />
            <g className="transition-all duration-100">
              <line x1={X(monthT)} y1={30} x2={X(monthT)} y2={208} stroke="#fbbf24" strokeDasharray="3 3" />
              <circle cx={X(monthT)} cy={Y(q)} r={5} fill="#fbbf24" />
            </g>
            <text x={46} y={44} fontSize={11} fill="#94a3b8">
              {river.name} regime: discharge through the year
            </text>
            <text x={46} y={58} fontSize={9} fill={river.kind === 'himalayan' ? '#a5f3fc' : '#fca5a5'}>
              {river.note}
            </text>
            {/* living river gauge */}
            <g transform="translate(388,236)">
              <rect x={0} y={-22} width={46} height={58} rx={8} fill="#0f172a" stroke="#1e293b" />
              <rect x={4} y={18 - gaugeFill * 50} width={38} height={gaugeFill * 50} rx={5}
                fill={gaugeFill < 0.18 ? '#b45309' : '#0ea5e9'} className="transition-all duration-300" />
            </g>
            <text x={452} y={272} fontSize={9} fill="#64748b" textAnchor="end">gauge: {curMonth}</text>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Q now ({curMonth})</p>
              <p className="font-mono font-bold text-sky-300">{q.toFixed(0)} m3/s</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Annual mean</p>
              <p className="font-mono font-bold text-cyan-300">{stats.mean.toFixed(0)} m3/s</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Flood peak</p>
              <p className="font-mono font-bold text-amber-300">{stats.peak.q.toFixed(0)} m3/s</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Dry-season low</p>
              <p className="font-mono font-bold text-orange-300">{stats.min.q.toFixed(0)} m3/s</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {RIVERS.map((r) => (
                <button key={r.id} onClick={() => setRiverId(r.id)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${riverId === r.id ? 'bg-cyan-500 text-slate-950' : r.kind === 'himalayan' ? 'bg-slate-800 hover:bg-slate-700 text-sky-200' : 'bg-slate-800 hover:bg-slate-700 text-emerald-200'}`}>
                  {r.name}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Drag through the year</span><span className="font-mono font-bold text-amber-400">{curMonth}</span>
              </div>
              <input type="range" min={0} max={11.9} step={0.1} value={monthT} aria-label="month"
                onChange={(e) => setMonthT(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Monsoon strength</span><span className="font-mono font-bold text-sky-400">{monsoon}% of normal</span>
              </div>
              <input type="range" min={40} max={140} step={5} value={monsoon} aria-label="monsoon strength"
                onChange={(e) => setMonsoon(Number(e.target.value))} className="w-full min-h-11 accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Glacier / snow temperature</span><span className="font-mono font-bold text-violet-400">{tempAnom >= 0 ? '+' : ''}{tempAnom} &deg;C anomaly</span>
              </div>
              <input type="range" min={-2} max={4} step={0.5} value={tempAnom} aria-label="temperature anomaly"
                onChange={(e) => setTempAnom(Number(e.target.value))} className="w-full min-h-11 accent-violet-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setDams(!dams)}
                className={`min-h-11 rounded-xl text-xs font-bold ${dams ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Dams {dams ? 'ON' : 'OFF'}
              </button>
              <button onClick={() => { setRiverId('godavari'); setMonthT(4.2); setMonsoon(100); setTempAnom(0); setDams(false); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs">
            <p className="font-bold text-slate-300 mb-1">Pollution: dilution is the solution</p>
            <p className="text-slate-400">
              City sewage load {river.loadT} t/day. BOD now {bod.toFixed(1)} mg/L --{' '}
              <span className={`font-bold ${bodState.c}`}>{bodState.label}</span>. Same load, low flow: the river
              cannot dilute. Dams store monsoon flood water and release it in the dry season (management).
            </p>
            <p className="font-bold text-slate-300 mt-2 mb-1">Misconception killer</p>
            <p className="text-slate-400">
              &quot;Himalayan rivers dry up in summer.&quot; Opposite -- glaciers feed them all year (perennial).
              It is the rain-fed PENINSULAR rivers that shrink to trickles once the monsoon exits.
            </p>
          </div>

          <div className="bg-cyan-950/40 rounded-2xl border border-cyan-800/50 p-4 text-xs">
            <p className="font-bold text-cyan-300 mb-1">What to try</p>
            <p>1. Put the month dial on May for the Ganga, then the Godavari. Which river still flows, and what feeds it?</p>
            <p>2. Drop the monsoon to 60% on the Krishna and scrub to April. When does BOD cross the 3 mg/L bathing limit?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyRiverRegimeSim;
