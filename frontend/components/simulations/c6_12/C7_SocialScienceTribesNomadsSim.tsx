'use client';
/**
 * C7_SocialScienceTribesNomadsSim (Class 7 Social Science)
 *
 * ELI5: Pastoral nomads like the Gaddi shepherds did NOT wander aimlessly --
 * they followed the GRASS. Drag the month dial or press play: the herd climbs
 * to alpine meadows for summer and returns to the foothills for winter. Then
 * try settling them in one place and watch the grass fail.
 */
import React, { useEffect, useRef, useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const idealAlt = (m: number) => 600 + 1500 * (1 - Math.cos((2 * Math.PI * (m - 1)) / 12));
const grassAt = (m: number, alt: number) => Math.max(0, 10 - Math.abs(alt - idealAlt(m)) / 260);
const yOf = (alt: number) => 240 - (alt / 4000) * 220;
const xOf = (m: number) => 30 + ((m - 1) / 11) * 260;

export function C7_SocialScienceTribesNomadsSim() {
  const [m, setM] = useState(4);
  const [playing, setPlaying] = useState(false);
  const [settled, setSettled] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    let alive = true;
    let last = 0;
    const loop = (t: number) => {
      if (!alive) return;
      if (playing && t - last > 30) {
        last = t;
        setM((x) => (x + 0.035 > 12.99 ? 1 : x + 0.035));
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf.current); };
  }, [playing]);

  const herdAlt = settled ? 600 : idealAlt(m);
  const grass = grassAt(m, herdAlt);
  const hx = xOf(settled ? 4 : m); // settled herd stays at the village x
  const hy = yOf(herdAlt);
  const routeCurve = Array.from({ length: 49 }, (_, i) => { const mo = 1 + i / 4; return `${xOf(mo)},${yOf(idealAlt(mo))}`; }).join(' ');
  const settledCurve = Array.from({ length: 49 }, (_, i) => { const mo = 1 + i / 4; return `${xOf(mo)},${yOf(600)}`; }).join(' ');
  const grassCurve = Array.from({ length: 49 }, (_, i) => { const mo = 1 + i / 4; return `${xOf(mo)},${yOf(idealAlt(mo) * (grassAt(mo, idealAlt(mo)) / 10))}`; }).join(' ');
  const label = `${MONTHS[Math.floor(m) % 12]}${m % 1 >= 0.5 ? ' mid' : ''}`;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 7 History - Tribes, Nomads and Settled Communities</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Gaddi Migration: Chasing the Grass up the Mountain</h1>
        </div>
        <button onClick={() => { setM(4); setPlaying(false); setSettled(false); }}
          className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 320 260" className="w-full">
            <rect x="0" y="0" width="320" height="260" fill="#0b1220" />
            <polygon points="0,250 40,250 60,120 130,40 200,60 260,140 320,250" fill="#1e293b" />
            <rect x="0" y={yOf(2800)} width="320" height={250 - yOf(2800)} fill="#334155" opacity="0.35" />
            <text x="300" y={yOf(3600) + 14} fontSize="9" fill="#94a3b8" textAnchor="end">alpine meadow 3600 m</text>
            <text x="300" y={yOf(1800) + 14} fontSize="9" fill="#94a3b8" textAnchor="end">mid slopes 1800 m</text>
            <text x="300" y={yOf(600) + 14} fontSize="9" fill="#94a3b8" textAnchor="end">foothill village 600 m</text>
            <polyline points={routeCurve} fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray="5 3" />
            <polyline points={settledCurve} fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 4" />
            <circle cx={xOf(4)} cy={yOf(600)} r="5" fill="#e2e8f0" />
            <text x={xOf(4) - 4} y={yOf(600) + 18} fontSize="9" fill="#e2e8f0">village</text>
            <g style={{ transform: `translate(${hx}px, ${hy}px)`, transition: playing ? 'none' : 'transform 450ms ease' }}>
              <circle r="9" fill="#f59e0b" stroke="#fff7ed" strokeWidth="2" />
              <text y="-13" fontSize="9" fill="#fbbf24" textAnchor="middle" fontWeight="bold">herd</text>
            </g>
            <text x="160" y="252" fontSize="9" fill="#64748b" textAnchor="middle">green dashed = migration route &nbsp; red dotted = stay-at-home route</text>
            <g fontSize="7" fill="#64748b" textAnchor="middle">
              {MONTHS.map((mo, i) => <text key={mo} x={xOf(i + 1)} y="14">{mo[0]}{mo[1] ? mo[1].toLowerCase() : ''}</text>)}
            </g>
          </svg>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">Season rhythm: winter in Shivalik foothills -- climb in spring -- high meadows (dhars) June-September -- descend before the snow closes the passes.</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setPlaying((p) => !p)}
              className={`flex-1 min-h-11 rounded-xl text-xs font-bold border transition-all ${playing ? 'bg-violet-600 border-violet-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-violet-500'}`}>
              {playing ? 'Pause migration' : 'Play the year'}
            </button>
            <button onClick={() => setSettled((s) => !s)}
              className={`flex-1 min-h-11 rounded-xl text-xs font-bold border transition-all ${settled ? 'bg-rose-600 border-rose-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-rose-500'}`}>
              {settled ? 'Settled in village (ON)' : 'Settle permanently?'}
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Month dial</span><span className="font-mono text-indigo-300">{label}</span>
            </label>
            <input type="range" min={1} max={12.9} step={0.1} value={m} aria-label="month"
              onChange={(e) => { setPlaying(false); setM(Number(e.target.value)); }} className="w-full mt-1 min-h-11 accent-indigo-500" />
            <div className="grid grid-cols-3 gap-2 mt-2 text-center">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800"><p className="text-[10px] text-slate-400">Herd altitude</p><p className="font-mono text-sm text-emerald-300">{Math.round(herdAlt)} m</p></div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800"><p className="text-[10px] text-slate-400">Grass here</p><p className={`font-mono text-sm ${grass > 5 ? 'text-emerald-300' : 'text-rose-400'}`}>{grass.toFixed(1)} kg/animal/day</p></div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800"><p className="text-[10px] text-slate-400">Herd condition</p><p className={`font-mono text-sm ${grass * 10 > 50 ? 'text-emerald-300' : 'text-rose-400'}`}>{Math.round(grass * 10)}%</p></div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">Grass calendar (route vs staying home)</p>
            <svg viewBox="0 0 320 70" className="w-full">
              <polyline points={grassCurve} fill="none" stroke="#4ade80" strokeWidth="2.5" />
              <polyline points={Array.from({ length: 49 }, (_, i) => { const mo = 1 + i / 4; return `${xOf(mo)},${yOf(600 * (grassAt(mo, 600) / 10))}`; }).join(' ')} fill="none" stroke="#f43f5e" strokeWidth="2.5" />
              <text x="6" y="10" fontSize="8" fill="#4ade80">on the move: grass stays near maximum all year</text>
              <text x="170" y="66" fontSize="8" fill="#f43f5e">settled: grass collapses Jun-Sep</text>
            </svg>
            <p className="text-[11px] text-slate-400 mt-1">The green line is the migration route&apos;s grass month by month -- notice it almost never dips. That flat green line IS the nomad&apos;s calendar.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1 leading-relaxed">
            <p className="font-bold text-indigo-300 mb-1">Other lives beyond the village fields</p>
            <p><span className="font-bold text-sky-300">Banjaras:</span> caravan traders who moved grain with bullock trains called tanda, timed to harvest prices.</p>
            <p><span className="font-bold text-emerald-300">Gonds:</span> forest dwellers of central India who built their own Gond kingdoms with rajas and forts.</p>
            <p><span className="font-bold text-violet-300">Ahoms of Assam:</span> a tribe that migrated from Myanmar and built a state run on forced labour (paiks) -- they ruled for 600 years.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-indigo-300 mb-1">The same world today</p>
            <p>Gaddis still climb to the dhars every June. Gujjar and Bakarwal herders cross the Pir Panjal. Census records listed many craft-working nomads as &quot;itinerant groups&quot;. Mobility is a livelihood strategy, not a failure to settle.</p>
            <p className="mt-1">Tribal communities were also counted, taxed and -- under British rule -- often pushed off forests they had managed for centuries, which is how many tribal movements began.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> nomads were not drifting without purpose, and tribes were not &quot;backward&quot;. The Gaddi calendar is precise grazing maths -- and tribal states like the Ahoms built powerful kingdoms with their own forced-labour (paik) system.
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-slate-500 font-bold uppercase tracking-wider">Key words:</span>
        {['pastoral nomad', 'tanda caravan', 'dhar meadow', 'paik labour', 'jhum cultivation', 'clan'].map((k) => (
          <span key={k} className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">{k}</span>
        ))}
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Pause in mid-October and predict where the herd is BEFORE reading the altitude -- then check. Which direction is it travelling and why now?</p>
        <p className="mt-1">2. Settle the herd permanently and play the year -- in which months does grass hit zero, and what does that say about why nomads kept moving?</p>
      </footer>
    </div>
  );
}

export default C7_SocialScienceTribesNomadsSim;
