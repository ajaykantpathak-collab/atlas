'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 History -- Displacing Indigenous Peoples
 * ONE concept: native land loss in North America and Australia ran on
 * three gears -- disease, treaties/deals, and forced removal. Move the
 * century slider and watch who owns the map. react + tailwind only.
 */

type Land = 'native' | 'settler' | 'reservation';

export function C11_HistoryDisplacingIndigenousPeoplesSim() {
  const [century, setCentury] = useState(1); // 0: 1600s, 1: 1700s, 2: 1800s, 3: 1900
  const [disease, setDisease] = useState(70); // epidemic severity
  const [treaties, setTreaties] = useState(50); // settler deals/diplomacy pressure
  const [removal, setRemoval] = useState(40); // forced removal / war intensity
  const [showCases, setShowCases] = useState(true);

  const periods = ['1600s', '1700s', '1800s', '1900'];

  const shares = useMemo(() => {
    // cumulative pressure grows with century; composition shifts over time
    const c = century / 3;
    const press = Math.min(0.92, (disease * 0.4 + treaties * 0.3 + removal * 0.3) / 100 * (0.45 + 0.55 * c));
    const native = 1 - press;
    const reservation = press * Math.min(0.9, removal / 100 + 0.25) * (century >= 2 ? 0.9 : 0.3);
    const settler = press - reservation;
    return { native, settler, reservation };
  }, [disease, treaties, removal, century]);

  const popLoss = Math.round(shares.native < 0.1 ? 92 : (1 - shares.native) * 90);

  const cases = [
    { name: 'Wounded Knee (1890)', note: 'massacre ends armed resistance in the Plains' },
    { name: 'Trail of Tears (1838)', note: 'Cherokee forced march, thousands die' },
    { name: 'Treaty of Paris (1783)', note: 'native nations left off the map entirely' },
    { name: 'Australia: terra nullius', note: 'land declared empty -- no treaties at all' }
  ];

  const rectW = (v: Land) => {
    const val = shares[v];
    return val * 420;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-orange-950/80 rounded-2xl border border-orange-700">🪶</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Class 11 -- Displacing Indigenous Peoples</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Three Gears of Dispossession: Disease, Deals, Removal</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* the land bar over time */}
            <text x={20} y={26} fontSize={11} fill="#94a3b8">Who holds the land in the {periods[century]}:</text>
            <g className="transition-all duration-500">
              <rect x={20} y={40} width={rectW('native')} height={54} fill="#15803d" />
              <rect x={20 + rectW('native')} y={40} width={rectW('settler')} height={54} fill="#a16207" />
              <rect x={20 + rectW('native') + rectW('settler')} y={40} width={rectW('reservation')} height={54} fill="#57534e" />
            </g>
            <text x={26} y={72} fontSize={10} fill="#bbf7d0">native land {(shares.native * 100).toFixed(0)}%</text>
            {rectW('settler') > 60 && <text x={30 + rectW('native')} y={72} fontSize={10} fill="#fde68a">settler {(shares.settler * 100).toFixed(0)}%</text>}
            {rectW('reservation') > 30 && <text x={26 + rectW('native') + rectW('settler')} y={72} fontSize={10} fill="#d6d3d1">reservations {(shares.reservation * 100).toFixed(0)}%</text>}
            {/* population line */}
            <g transform="translate(20,120)">
              <text x={0} y={-6} fontSize={10} fill="#94a3b8">indigenous population index (per century step)</text>
              <line x1={0} y1={40} x2={420} y2={40} stroke="#334155" />
              <path d={Array.from({ length: 4 }, (_, i) => {
                const c = i / 3;
                const press = Math.min(0.92, (disease * 0.4 + treaties * 0.3 + removal * 0.3) / 100 * (0.45 + 0.55 * c));
                const y = 40 - (1 - press) * 30;
                return `${i === 0 ? 'M' : 'L'} ${i * 140},${y.toFixed(1)}`;
              }).join(' ')} fill="none" stroke="#fb923c" strokeWidth={3} className="transition-all duration-500" />
              <circle cx={century * 140} cy={40 - (1 - Math.min(0.92, (disease * 0.4 + treaties * 0.3 + removal * 0.3) / 100 * (0.45 + 0.55 * century / 3))) * 30}
                r={5} fill="#fdba74" className="transition-all duration-300" />
              <text x={0} y={56} fontSize={9} fill="#64748b">1600s</text>
              <text x={400} y={56} fontSize={9} fill="#64748b">1900</text>
            </g>
            {/* case timeline */}
            {showCases && cases.map((c, i) => (
              <g key={c.name}>
                <circle cx={40 + i * 110} cy={230} r={4} fill="#f43f5e" />
                <text x={40 + i * 110} y={210} fontSize={8.5} fill="#fda4af" textAnchor="middle">{c.name.split(' (')[0]}</text>
                <text x={40 + i * 110} y={248} fontSize={8} fill="#64748b" textAnchor="middle">{c.name.match(/\(([^)]+)\)/)?.[1]}</text>
              </g>
            ))}
            <line x1={20} y1={230} x2={440} y2={230} stroke="#334155" strokeDasharray="3 4" />
            <text x={230} y={272} textAnchor="middle" fontSize={10} fill="#e2e8f0" fontWeight="bold">
              by {periods[century]}: native share {periods[century] === '1600s' ? 'high' : shares.native < 0.1 ? 'under 10%' : `${(shares.native * 100).toFixed(0)}%`} -- cumulative loss index {popLoss}
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Period</p>
              <p className="font-mono font-bold text-orange-300">{periods[century]}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Native land share</p>
              <p className="font-mono font-bold text-emerald-300">{(shares.native * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Reservation share</p>
              <p className="font-mono font-bold text-stone-300">{(shares.reservation * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Century</span><span className="font-mono font-bold text-orange-300">{periods[century]}</span>
              </div>
              <input type="range" min={0} max={3} step={1} value={century} aria-label="century"
                onChange={(e) => setCentury(Number(e.target.value))} className="w-full min-h-11 accent-orange-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Disease (epidemics)</span><span className="font-mono font-bold text-rose-300">{disease}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={disease} aria-label="disease"
                onChange={(e) => setDisease(Number(e.target.value))} className="w-full min-h-11 accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Treaties and land deals</span><span className="font-mono font-bold text-amber-300">{treaties}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={treaties} aria-label="treaties"
                onChange={(e) => setTreaties(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Forced removal and war</span><span className="font-mono font-bold text-stone-300">{removal}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={removal} aria-label="removal"
                onChange={(e) => setRemoval(Number(e.target.value))} className="w-full min-h-11 accent-stone-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowCases(!showCases)}
                className={`min-h-11 rounded-xl text-xs font-bold ${showCases ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Event line
              </button>
              <button onClick={() => { setCentury(1); setDisease(70); setTreaties(50); setRemoval(40); setShowCases(true); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Settlers mostly won by fighting battles.&quot; The deadliest gear never raised a
              sword -- smallpox and measles killed far more than any war, because native peoples had
              no immunity to European livestock diseases. Battles only finished what epidemics began.
            </p>
          </div>

          <div className="bg-orange-950/40 rounded-2xl border border-orange-800/50 p-4 text-xs">
            <p className="font-bold text-orange-300 mb-1">What to try</p>
            <p>1. Set disease to 0 but keep treaties + removal at 80. How much land do settlers still take by 1900? What does that tell you the other gears did?</p>
            <p>2. Slide the century alone, levers untouched. Why does the reservation band only grow fat after 1800?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_HistoryDisplacingIndigenousPeoplesSim;
