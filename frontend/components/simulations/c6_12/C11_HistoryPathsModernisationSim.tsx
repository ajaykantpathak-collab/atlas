'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 History -- Paths to Modernisation
 * ONE concept: Japan (Meiji) and China chose different answers to the
 * same 19th-century pressure. Allocate Japan's reform budget and compare
 * the two national paths on the scoreboard. react + tailwind only.
 */

export function C11_HistoryPathsModernisationSim() {
  const [industry, setIndustry] = useState(35); // Japan budget: industry/rail
  const [military, setMilitary] = useState(30); // Japan budget: army/navy
  const [schooling, setSchooling] = useState(35); // Japan budget: education
  const [chinaPath, setChinaPath] = useState<'self' | 'reform' | 'revolution'>('self');

  const total = industry + military + schooling;

  // Japan outcomes: education compounds, industry compounds, military wins 1895/1905 wars if strong
  const literacy = Math.min(95, Math.round(schooling * 1.4 + industry * 0.2));
  const factories = Math.round((industry * 1.2 + schooling * 0.3) * 1.1);
  const warReady = military * 1.3 + industry * 0.5 + schooling * 0.2; // vs 70 benchmark
  const sovereignty = warReady >= 70 ? 'kept -- treaties revised (1894-1911)' : 'unequal treaties bite';

  const china = useMemo(() => ({
    self: { label: 'Self-Strengthening (1860s-90s)', industry: 30, social: 10, freedom: 10, verdict: 'arsenals without reform -- defeated in 1895' },
    reform: { label: 'Hundred Days / late reforms (1898-1911)', industry: 45, social: 40, freedom: 25, verdict: 'too late, too shallow -- dynasty falls 1911' },
    revolution: { label: 'Republican revolution (1911-)', industry: 50, social: 45, freedom: 60, verdict: 'republic proclaimed -- warlords follow' }
  }), []);
  const cn = china[chinaPath];

  const winner = Math.sign((factories + literacy * 0.5) - (cn.industry * 3 + cn.social * 1.5));

  const bar = (label: string, v: number, max: number, color: string) => (
    <div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{label}</span><span className="font-mono font-bold text-slate-200">{v.toFixed(0)}</span>
      </div>
      <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${Math.min(100, (v / max) * 100)}%` }} />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-red-950/80 rounded-2xl border border-red-700">⛩️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">Class 11 -- Paths to Modernisation</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Two Roads to Modern: Japan&apos;s Meiji Budget vs China&apos;s Choices</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* Japan budget pie-arc */}
            <g transform="translate(110,120)">
              <text x={0} y={-88} fontSize={11} fill="#fca5a5" textAnchor="middle">Meiji budget allocation (total {total})</text>
              {(() => {
                const segs = [
                  { v: industry, c: '#f59e0b', l: 'Industry + rail' },
                  { v: military, c: '#ef4444', l: 'Army + navy' },
                  { v: schooling, c: '#38bdf8', l: 'Schools' }
                ];
                let acc = -Math.PI / 2;
                return segs.map((s) => {
                  const a0 = acc;
                  acc += (s.v / 100) * 2 * Math.PI;
                  const R = 62;
                  const d = `M 0 0 L ${R * Math.cos(a0)} ${R * Math.sin(a0)} A ${R} ${R} 0 0 1 ${R * Math.cos(acc)} ${R * Math.sin(acc)} Z`;
                  return (
                    <g key={s.l}>
                      <path d={d} fill={s.c} className="transition-all duration-300" opacity={0.85} />
                      <text x={78 * Math.cos((a0 + acc) / 2)} y={78 * Math.sin((a0 + acc) / 2)} fontSize={9}
                        fill={s.c} textAnchor="middle">{s.l}</text>
                    </g>
                  );
                });
              })()}
              <text x={0} y={92} fontSize={10} fill="#94a3b8" textAnchor="middle">Meiji Japan (1868-)</text>
            </g>
            {/* China path panel */}
            <g transform="translate(300,120)">
              <text x={0} y={-88} fontSize={11} fill="#93c5fd" textAnchor="middle">China&apos;s chosen road</text>
              <rect x={-90} y={-70} width={190} height={150} rx={12} fill="#0c1c33" stroke="#1e3a5f" />
              <text x={5} y={-46} fontSize={11} fill="#bfdbfe" textAnchor="middle" fontWeight="bold">{cn.label}</text>
              <text x={-80} y={-20} fontSize={9} fill="#94a3b8">industry push</text>
              <rect x={-80} y={-14} width={cn.industry * 1.6} height={9} rx={4} fill="#f59e0b" className="transition-all duration-500" />
              <text x={-80} y={12} fontSize={9} fill="#94a3b8">social reform</text>
              <rect x={-80} y={18} width={cn.social * 1.6} height={9} rx={4} fill="#34d399" className="transition-all duration-500" />
              <text x={-80} y={44} fontSize={9} fill="#94a3b8">political change</text>
              <rect x={-80} y={50} width={cn.freedom * 1.6} height={9} rx={4} fill="#818cf8" className="transition-all duration-500" />
            </g>
            <text x={230} y={262} textAnchor="middle" fontSize={11} fontWeight="bold"
              fill={winner > 0 ? '#fca5a5' : winner < 0 ? '#93c5fd' : '#e2e8f0'}>
              {winner > 0 ? 'Japan ahead on industry + literacy' : winner < 0 ? 'China path ahead (rare -- try maxing Japan)' : 'neck and neck'}
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Japan literacy</p>
              <p className="font-mono font-bold text-gold-300">{literacy}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Factories index</p>
              <p className="font-mono font-bold text-amber-300">{factories}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">War readiness</p>
              <p className={`font-mono font-bold ${warReady >= 70 ? 'text-emerald-300' : 'text-rose-400'}`}>{warReady.toFixed(0)}/70</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            {[
              { l: 'Industry and railways', v: industry, set: setIndustry, c: 'accent-amber-500' },
              { l: 'Army and navy', v: military, set: setMilitary, c: 'accent-red-500' },
              { l: 'Universal schooling', v: schooling, set: setSchooling, c: 'accent-gold-500' }
            ].map((s) => (
              <div key={s.l}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{s.l}</span><span className="font-mono font-bold text-slate-200">{s.v}</span>
                </div>
                <input type="range" min={0} max={70} step={5} value={s.v} aria-label={s.l}
                  onChange={(e) => s.set(Number(e.target.value))} className={`w-full min-h-11 ${s.c}`} />
              </div>
            ))}
            <div className="grid grid-cols-3 gap-1">
              {(['self', 'reform', 'revolution'] as const).map((p) => (
                <button key={p} onClick={() => setChinaPath(p)}
                  className={`min-h-11 rounded-lg text-[9px] font-bold ${chinaPath === p ? 'bg-gold-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {p === 'self' ? 'Self-strength' : p === 'reform' ? 'Reforms' : 'Revolution'}
                </button>
              ))}
            </div>
            <button onClick={() => { setIndustry(35); setMilitary(30); setSchooling(35); setChinaPath('self'); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-300">
            <p className="font-bold text-gold-300 mb-1">Verdicts</p>
            <p>Japan sovereignty: {sovereignty}</p>
            <p>China: {cn.verdict}</p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Japan modernised by copying the West completely.&quot; The budget shows the truth:
              Meiji leaders copied selectively -- German army, British navy, American schools -- while
              keeping the emperor at the centre. Modernisation without wholesale westernisation.
            </p>
          </div>

          <div className="bg-red-950/40 rounded-2xl border border-red-800/50 p-4 text-xs">
            <p className="font-bold text-red-300 mb-1">What to try</p>
            <p>1. Fund schools to 60 and industry to 20. Does Japan still reach war readiness 70? What does that say about educated soldiers and sailors?</p>
            <p>2. Compare China&apos;s three roads at their best. Why did every path arrive too late -- and what single year (1895) humbled both stories?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_HistoryPathsModernisationSim;
