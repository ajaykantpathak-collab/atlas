'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Political Science -- Freedom
 * ONE concept: freedom has two faces. Negative freedom = no external
 * barriers; positive freedom = real ability to act. Remove every fence
 * and discover why law ("harm principle") can enlarge freedom.
 * react + tailwind only.
 */

export function C11_PoliticalScienceFreedomSim() {
  const [fences, setFences] = useState(3); // external constraints: 0-5
  const [resources, setResources] = useState(20); // means/ability 0-100
  const [harmLaw, setHarmLaw] = useState(false); // harm-to-others law
  const [traffic, setTraffic] = useState(50); // others' unchecked actions

  // negative freedom: blocked by fences; harm law is itself a "fence" but removes others' harm
  const negative = Math.max(0, Math.round(((5 - fences) / 5) * 100 - (harmLaw ? 10 : 0)));
  // others' unchecked behaviour creates invisible fences (e.g. danger on the road)
  const effectiveFences = fences + (harmLaw ? 0 : Math.round(traffic / 25));
  const positive = Math.max(0, Math.min(100, Math.round(resources * 0.7 + negative * 0.3)));
  const usable = Math.round((negative / 100) * (positive / 100) * 100);
  const crashRisk = !harmLaw ? Math.round(traffic * 0.7) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-teal-950/80 rounded-2xl border border-teal-700">🕊️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Class 11 -- Freedom</span>
          <h1 className="text-xl md:text-2xl font-extrabold">No Fence Is Not Enough: Negative vs Positive Freedom</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* runner track: length open = negative freedom; runner stride = positive */}
            <rect x={20} y={150} width={420} height={40} rx={6} fill="#134e4a" />
            {Array.from({ length: 5 }, (_, i) => (
              <g key={i} opacity={i < fences ? 1 : 0}>
                <rect x={80 + i * 70} y={140} width={8} height={60} fill="#f43f5e" rx={2} />
                <text x={84 + i * 70} y={132} fontSize={9} fill="#fb7185" textAnchor="middle">fence {i + 1}</text>
              </g>
            ))}
            {/* danger patches from others' unchecked actions */}
            {!harmLaw && [0, 1, 2].map((i) => (
              <g key={`d${i}`} opacity={traffic / 100}>
                <circle cx={120 + i * 120} cy={170} r={12} fill="#f59e0b" opacity={0.6}>
                  <animate attributeName="r" values="10;14;10" dur="1.2s" repeatCount="indefinite" />
                </circle>
              </g>
            ))}
            {/* runner advances to first barrier */}
            <g className="transition-all duration-500"
              style={{ transform: `translateX(${(negative / 100) * (420 - 60)}px)` }}>
              <circle cx={40} cy={140} r={9} fill="#2dd4bf" />
              <rect x={28} y={152} width={24} height={30} rx={8} fill="#2dd4bf" />
            </g>
            {/* two dials */}
            <g transform="translate(90,60)">
              <text x={0} y={0} fontSize={11} fill="#5eead4" textAnchor="middle">negative freedom</text>
              <text x={0} y={18} fontSize={13} fill="#99f6e4" fontFamily="monospace" textAnchor="middle">{negative}%</text>
              <text x={0} y={34} fontSize={8.5} fill="#94a3b8" textAnchor="middle">absence of external barriers</text>
            </g>
            <g transform="translate(320,60)">
              <text x={0} y={0} fontSize={11} fill="#a78bfa" textAnchor="middle">positive freedom</text>
              <text x={0} y={18} fontSize={13} fill="#ddd6fe" fontFamily="monospace" textAnchor="middle">{positive}%</text>
              <text x={0} y={34} fontSize={8.5} fill="#94a3b8" textAnchor="middle">real means and ability</text>
            </g>
            <line x1={230} y1={20} x2={230} y2={95} stroke="#1e293b" />
            <text x={230} y={120} textAnchor="middle" fontSize={10} fill="#e2e8f0">
              invisible fences from others&apos; behaviour: {Math.max(0, effectiveFences - fences)}
            </text>
            <text x={230} y={230} textAnchor="middle" fontSize={11} fontWeight="bold" fill={usable > 60 ? '#34d399' : '#fbbf24'}>
              freedom actually usable: {usable}%
            </text>
            <text x={230} y={250} textAnchor="middle" fontSize={9.5} fill="#94a3b8">
              {harmLaw ? 'harm law active: the road is safe, everyone runs farther' : 'no harm law: others\' freedom to endanger cuts YOUR freedom'}
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Visible fences</p>
              <p className="font-mono font-bold text-rose-300">{fences}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Crash risk</p>
              <p className={`font-mono font-bold ${crashRisk > 30 ? 'text-rose-400' : 'text-emerald-300'}`}>{crashRisk}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Usable freedom</p>
              <p className="font-mono font-bold text-teal-300">{usable}%</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>External fences (laws, walls)</span><span className="font-mono font-bold text-rose-400">{fences}</span>
              </div>
              <input type="range" min={0} max={5} step={1} value={fences} aria-label="fences"
                onChange={(e) => setFences(Number(e.target.value))} className="w-full min-h-11 accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Resources and ability (income, health, schooling)</span><span className="font-mono font-bold text-gold-400">{resources}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={resources} aria-label="resources"
                onChange={(e) => setResources(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Others&apos; unchecked actions (traffic, danger)</span><span className="font-mono font-bold text-amber-400">{traffic}</span>
              </div>
              <input type="range" min={0} max={100} step={10} value={traffic} aria-label="traffic"
                onChange={(e) => setTraffic(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setHarmLaw(!harmLaw)}
                className={`min-h-11 rounded-xl text-xs font-bold ${harmLaw ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Harm law: {harmLaw ? 'ON' : 'OFF'}
              </button>
              <button onClick={() => { setFences(3); setResources(20); setHarmLaw(false); setTraffic(50); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Freedom just means nobody stops you.&quot; Zero fences with zero resources is the
              freedom to starve. And watch the amber patches: one person&apos;s freedom to drive
              drunk builds INVISIBLE fences around everyone else. That is why the harm principle --
              restrict only to prevent harm -- can add freedom while adding a law.
            </p>
          </div>

          <div className="bg-teal-950/40 rounded-2xl border border-teal-800/50 p-4 text-xs">
            <p className="font-bold text-teal-300 mb-1">What to try</p>
            <p>1. Set fences to 0, resources to 20. Read the usable number. Is the runner truly free? Now raise resources -- which dial moved?</p>
            <p>2. Turn traffic to 100 with no harm law, then switch the law on. Why did a NEW constraint make negative freedom almost unchanged but usable freedom jump?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PoliticalScienceFreedomSim;
