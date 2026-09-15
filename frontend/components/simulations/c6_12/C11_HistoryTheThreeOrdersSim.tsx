'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 History -- The Three Orders
 * ONE concept: medieval Europe ran on a triangle of prayer, fight and
 * labour. Land and food flow up; protection and prayer flow down. Allocate
 * peasant labour and watch each order's fate. react + tailwind only.
 */

export function C11_HistoryTheThreeOrdersSim() {
  const [workDays, setWorkDays] = useState(3); // days/week on lord's land
  const [tithe, setTithe] = useState(10); // % to the church
  const [plague, setPlague] = useState(0); // 1348-51 mortality 0-60%
  const [year, setYear] = useState(1100);

  const peasantPop = Math.max(10, 100 - plague);
  // harvest: peasants keep after corvee + tithe; more work-days = lord gets more, peasants less
  const grossHarvest = Math.round(peasantPop * 1.1 * 10) / 10;
  const lordShare = Math.min(70, workDays * 8);
  const churchShare = tithe;
  const peasantShare = Math.max(10, 100 - lordShare - churchShare);
  // lord's power grows with harvest taken + knights fed
  const knightsFed = Math.floor((lordShare / 100) * grossHarvest / 1.2);
  const lordPower = Math.min(100, Math.round(lordShare * 0.8 + knightsFed * 2));
  const churchPower = Math.min(100, Math.round(tithe * 3.2 + (year < 1300 ? 20 : 5)));
  // after the plague, labour scarcity flips bargaining power to peasants
  const scarcity = plague / 100;
  const peasantBargain = Math.min(100, Math.round(scarcity * 130 + (peasantShare / 4)));
  const wages = Math.round((60 + scarcity * 160 + peasantShare) / 5);

  const pyramidH = (v: number) => 30 + v * 0.9;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-stone-100/10 rounded-2xl border border-stone-600">🏰</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-300">Class 11 -- The Three Orders</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Those Who Pray, Fight, Work: a Live Triangle</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* the three orders pyramid */}
            <g className="transition-all duration-500">
              <polygon points={`230,${60 - pyramidH(churchPower) + 40} ${280},${60 - pyramidH(churchPower) / 2 + 40} ${280},${pyramidH(churchPower) / 2 + 40} ${230},${pyramidH(churchPower) + 40} ${180},${pyramidH(churchPower) / 2 + 40} ${180},${60 - pyramidH(churchPower) / 2 + 40}`}
                fill="#a78bfa" opacity={0.85} />
              <polygon points={`230,${40 + pyramidH(churchPower)} ${290},${60 + pyramidH(churchPower)} ${290},${pyramidH(churchPower) + 80} ${230},${pyramidH(churchPower) + 100} ${170},${pyramidH(churchPower) + 80} ${170},${60 + pyramidH(churchPower)}`}
                fill="#f87171" opacity={0.85} />
              <polygon points={`230,${pyramidH(churchPower) + 100} ${330},${pyramidH(churchPower) + 120} ${330},262 ${230},278 ${130},262 ${130},${pyramidH(churchPower) + 120}`}
                fill="#34d399" opacity={0.85} />
            </g>
            <text x={230} y={pyramidH(churchPower) / 2 + 36} textAnchor="middle" fontSize={10} fill="#0b1220" fontWeight="bold">
              CLERGY {churchPower}
            </text>
            <text x={230} y={pyramidH(churchPower) + 86} textAnchor="middle" fontSize={10} fill="#0b1220" fontWeight="bold">
              NOBILITY {lordPower}
            </text>
            <text x={230} y={230} textAnchor="middle" fontSize={10} fill="#0b1220" fontWeight="bold">
              PEASANTS: {peasantPop}% pop, keep {peasantShare}% of crop
            </text>
            {/* flows */}
            <text x={30} y={70} fontSize={9} fill="#fcd34d">food + labour flow UP</text>
            <path d="M40,80 L40,240" stroke="#fcd34d" strokeWidth={2.5} strokeDasharray="6 5">
              <animate attributeName="stroke-dashoffset" values="0;-22" dur="1.1s" repeatCount="indefinite" />
            </path>
            <text x={424} y={70} fontSize={9} fill="#93c5fd" textAnchor="end">protection + prayer flow DOWN</text>
            <path d="M424,80 L424,240" stroke="#93c5fd" strokeWidth={2.5} strokeDasharray="6 5">
              <animate attributeName="stroke-dashoffset" values="0;22" dur="1.1s" repeatCount="indefinite" />
            </path>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Harvest (gross)</p>
              <p className="font-mono font-bold text-emerald-300">{grossHarvest}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Knights fed</p>
              <p className="font-mono font-bold text-rose-300">{knightsFed}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Peasant bargaining</p>
              <p className="font-mono font-bold text-amber-300">{peasantBargain}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Field wage index</p>
              <p className="font-mono font-bold text-sky-300">{wages}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Days/week owed to the lord</span><span className="font-mono font-bold text-rose-300">{workDays}</span>
              </div>
              <input type="range" min={0} max={6} step={1} value={workDays} aria-label="corvee days"
                onChange={(e) => setWorkDays(Number(e.target.value))} className="w-full min-h-11 accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Church tithe</span><span className="font-mono font-bold text-violet-300">{tithe}%</span>
              </div>
              <input type="range" min={0} max={25} step={1} value={tithe} aria-label="tithe"
                onChange={(e) => setTithe(Number(e.target.value))} className="w-full min-h-11 accent-violet-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Black Death mortality (1348+)</span><span className="font-mono font-bold text-stone-300">{plague}%</span>
              </div>
              <input type="range" min={0} max={60} step={5} value={plague} aria-label="plague"
                onChange={(e) => setPlague(Number(e.target.value))} className="w-full min-h-11 accent-stone-400" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Year</span><span className="font-mono font-bold text-emerald-300">{year}</span>
              </div>
              <input type="range" min={900} max={1400} step={50} value={year} aria-label="year"
                onChange={(e) => setYear(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
            </div>
            <button onClick={() => { setWorkDays(3); setTithe(10); setPlague(0); setYear(1100); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;The three orders were equal partners in a fair bargain.&quot; Drag the corvee to 6
              days -- the pyramid fattens upward while peasants starve. Then bring in the plague:
              watch bargaining power flip only when labour becomes scarce. Feudalism was a balance of
              power, not a law of nature.
            </p>
          </div>

          <div className="bg-stone-900/60 rounded-2xl border border-stone-700/50 p-4 text-xs">
            <p className="font-bold text-stone-200 mb-1">What to try</p>
            <p>1. Set the tithe to 20 and corvee to 5. What keeps the peasant share above zero -- and what happens to knight numbers?</p>
            <p>2. Push plague to 60% and jump the year to 1400. Why does the wage index jump instead of crash?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_HistoryTheThreeOrdersSim;
