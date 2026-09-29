'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Class 11 Geography -- Drainage System
 * ONE concept: a river basin is a machine -- pattern shows the rock,
 * and storm rain becomes a hydrograph shaped by permeability.
 * react + tailwind only.
 */

type Pattern = 'dendritic' | 'trellis' | 'radial';

const PATTERNS: { id: Pattern; label: string; rock: string }[] = [
  { id: 'dendritic', label: 'Dendritic', rock: 'uniform rock, no strong joints' },
  { id: 'trellis', label: 'Trellis', rock: 'folded alternating hard/soft bands' },
  { id: 'radial', label: 'Radial', rock: 'a cone, dome or volcano' }
];

export function C11_GeographyDrainageSystemSim() {
  const [pattern, setPattern] = useState<Pattern>('dendritic');
  const [rain, setRain] = useState(30); // mm/hr storm intensity
  const [perm, setPerm] = useState(40); // % permeability of basin rock
  const [storm, setStorm] = useState(false);
  const [elapsed, setElapsed] = useState(0); // hours since storm start
  const raf = useRef<number | null>(null);
  const last = useRef<number>(0);

  useEffect(() => {
    if (!storm) return;
    last.current = performance.now();
    const tick = (now: number) => {
      setElapsed((e) => Math.min(24, e + (now - last.current) / 1000 * 2)); // 2 sim-hrs per real sec
      last.current = now;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [storm]);

  const runoffC = useMemo(() => (100 - perm) / 100, [perm]); // rational method coefficient
  const AREA = 500; // km^2 basin
  // discharge Q (m3/s): 1 mm/hr over 500 km2 * coeff, storm lasts 8 sim hours
  const qAt = (t: number) => {
    const active = storm && t < 8 ? 1 : 0;
    const inflow = rain * 0.01 * runoffC * AREA * 1e6 / 3600 * active; // m3/s
    const base = 20 + perm * 0.8; // groundwater baseflow grows with permeability
    const lag = 2 + (perm / 100) * 4; // permeable basins: slower, delayed response
    const response = 1 - Math.exp(-Math.max(0, t - 1) / lag);
    const decay = Math.exp(-Math.max(0, t - 9) / (lag * 1.5));
    return base + inflow * (t < 9 ? response : response * decay);
  };
  const q = qAt(elapsed);
  const peak = useMemo(() => Math.max(...Array.from({ length: 241 }, (_, i) => qAt(i / 10))), [rain, perm, storm]);

  const riverPaths: Record<Pattern, string[]> = {
    dendritic: ['M40,60 C120,90 180,140 230,200 C280,250 360,260 430,265',
      'M70,30 C90,60 95,90 100,105', 'M160,50 C170,90 178,120 185,150',
      'M120,180 C160,190 200,195 230,200', 'M300,150 C270,190 250,195 230,200', 'M150,260 C190,250 210,205 230,200'],
    trellis: ['M30,250 L430,265', 'M80,40 C100,110 105,180 108,252', 'M180,40 C195,110 200,180 202,254',
      'M280,40 C295,110 300,180 302,253', 'M380,40 C395,110 400,180 402,264',
      'M108,150 L202,155', 'M202,200 L302,203', 'M302,235 L402,238'],
    radial: ['M230,130 L230,40', 'M230,130 L330,80', 'M230,130 L370,180', 'M230,130 L320,270',
      'M230,130 L140,270', 'M230,130 L90,180', 'M230,130 L130,80']
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">🏞️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 11 -- Drainage System</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Basin Machine: Pattern, Rock and the Storm Hydrograph</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {riverPaths[pattern].map((d, i) => (
              <path key={i} d={d} fill="none" strokeWidth={i === 0 ? 4 : 2}
                stroke={i === 0 ? '#38bdf8' : '#0ea5e9'} opacity={i === 0 ? 1 : 0.8}
                className="transition-all duration-500" />
            ))}
            {pattern === 'radial' && <circle cx={230} cy={130} r={22} fill="#57534e" stroke="#a8a29e" />}
            {pattern === 'trellis' && [70, 140, 210].map((y, i) => (
              <rect key={i} x={30} y={y} width={400} height={6} fill="#1e293b" />
            ))}
            {/* live hydrograph */}
            <g transform="translate(46,150)">
              <text x={0} y={-6} fontSize={10} fill="#94a3b8">hydrograph (discharge vs time, 24 h)</text>
              <line x1={0} y1={110} x2={410} y2={110} stroke="#334155" />
              <line x1={0} y1={0} x2={0} y2={110} stroke="#334155" />
              <path d={Array.from({ length: 97 }, (_, i) => {
                const t = (i / 96) * 24;
                const y = 110 - Math.min(105, (qAt(t) / Math.max(peak, 1)) * 100);
                return `${i === 0 ? 'M' : 'L'} ${(t / 24) * 400},${y.toFixed(1)}`;
              }).join(' ')} fill="none" stroke="#22d3ee" strokeWidth={2.5} />
              {storm && (
                <g className="transition-all duration-100">
                  <line x1={(Math.min(elapsed, 24) / 24) * 400} y1={0} x2={(Math.min(elapsed, 24) / 24) * 400} y2={110} stroke="#fbbf24" strokeDasharray="3 3" />
                  <circle cx={(Math.min(elapsed, 24) / 24) * 400}
                    cy={110 - Math.min(105, (q / Math.max(peak, 1)) * 100)} r={4} fill="#fbbf24" />
                </g>
              )}
              <text x={400} y={124} fontSize={9} fill="#64748b" textAnchor="end">24 h</text>
            </g>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Discharge now</p>
              <p className="font-mono font-bold text-gold-300">{q.toFixed(0)} m3/s</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Storm peak</p>
              <p className="font-mono font-bold text-amber-300">{peak.toFixed(0)} m3/s</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Runoff coeff.</p>
              <p className="font-mono font-bold text-rose-300">{runoffC.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {PATTERNS.map((p) => (
                <button key={p.id} onClick={() => setPattern(p.id)}
                  className={`min-h-11 rounded-xl text-xs font-bold ${pattern === p.id ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {p.label}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Storm rainfall</span><span className="font-mono font-bold text-gold-400">{rain} mm/hr</span>
              </div>
              <input type="range" min={5} max={100} step={1} value={rain} aria-label="rainfall"
                onChange={(e) => setRain(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Rock permeability</span><span className="font-mono font-bold text-emerald-400">{perm}%</span>
              </div>
              <input type="range" min={0} max={100} step={1} value={perm} aria-label="permeability"
                onChange={(e) => setPerm(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setStorm(true); setElapsed(0); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                Start storm
              </button>
              <button onClick={() => { setStorm(false); setElapsed(0); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">
                Reset
              </button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Reading the map</p>
            <p>
              {PATTERNS.find((p) => p.id === pattern)?.rock}. That is why the tributary geometry
              above looks the way it does -- switch patterns and the joints/rock structure changes first,
              the river obeys.
            </p>
            <p className="font-bold text-slate-300 mt-2 mb-1">Misconception killer</p>
            <p>
              &quot;More permeable rock means a bigger flood.&quot; Watch the peak: permeable basins give
              a LOWER, LATER peak (rain soaks in, baseflow feeds the river slowly). Flashy floods come
              from impermeable basins.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Set permeability 0% and rain 100 mm/hr -- find the peak. Then set 100% permeability. How many times smaller is the peak?</p>
            <p>2. Switch to Trellis and justify the rock type from the 90-degree joins alone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyDrainageSystemSim;
