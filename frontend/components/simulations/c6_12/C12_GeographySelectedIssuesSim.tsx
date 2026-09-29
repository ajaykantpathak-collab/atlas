'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 Geography -- Geographical Perspective on Selected Issues
 * ONE concept: environmental problems are cause-chains, not events.
 * Push a driver (population, vehicles, construction, groundwater pumping)
 * and watch air quality, water quality and land degrade -- then price
 * the policy response. react + tailwind only.
 */

type Issue = 'air' | 'water' | 'land';

export function C12_GeographySelectedIssuesSim() {
  const [city, setCity] = useState(50); // urban population pressure index
  const [vehicles, setVehicles] = useState(40); // lakhs of vehicles
  const [construction, setConstruction] = useState(30); // construction/dust index
  const [pumping, setPumping] = useState(45); // groundwater withdrawal index
  const [policy, setPolicy] = useState<'none' | 'cng' | 'sewage' | 'watershed'>('none');
  const [sel, setSel] = useState<Issue>('air');

  const { aqi, waterQuality, landDeg } = useMemo(() => {
    const relief = policy === 'cng' ? 0.45 : policy === 'sewage' ? 0.35 : policy === 'watershed' ? 0.4 : 1;
    const a = Math.min(500, 40 + vehicles * 2.2 + construction * 1.6 + city * 1.4) * (policy === 'cng' ? 0.55 : 1);
    const w = Math.min(100, 20 + city * 0.5 + pumping * 0.6) * (policy === 'sewage' ? 0.6 : 1);
    const l = Math.min(100, 10 + construction * 0.4 + pumping * 0.75) * (policy === 'watershed' ? 0.65 : 1);
    void relief;
    return { aqi: a, waterQuality: 100 - w, landDeg: l };
  }, [city, vehicles, construction, pumping, policy]);

  const aqiBand = aqi <= 50 ? { t: 'Good', c: 'text-emerald-300' }
    : aqi <= 100 ? { t: 'Satisfactory', c: 'text-lime-300' }
      : aqi <= 200 ? { t: 'Moderate', c: 'text-amber-300' }
        : aqi <= 300 ? { t: 'Poor', c: 'text-orange-400' }
          : { t: 'Severe', c: 'text-rose-400' };

  const bars: { id: Issue; label: string; val: number; max: number; inv?: boolean; unit: string }[] = [
    { id: 'air', label: 'Air quality index (lower better)', val: aqi, max: 500, unit: 'AQI' },
    { id: 'water', label: 'Water quality (higher better)', val: waterQuality, max: 100, unit: '/100' },
    { id: 'land', label: 'Land degradation (lower better)', val: landDeg, max: 100, unit: '%' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-orange-950/80 rounded-2xl border border-orange-700">🏭</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Class 12 -- Geographical Perspective on Selected Issues</span>
          <h1 className="text-xl md:text-2xl font-extrabold">One City, Three Crises: Trace the Cause Chain</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {/* sky tinted by AQI */}
            <rect x={0} y={0} width={460} height={200} rx={10}
              fill={aqi <= 100 ? '#0c4a6e' : aqi <= 200 ? '#713f12' : '#7f1d1d'} opacity={0.5}
              className="transition-colors duration-500" />
            {/* sun smogged by AQI */}
            <circle cx={80} cy={60} r={20} fill="#fbbf24" opacity={Math.max(0.15, 1 - aqi / 500)} className="transition-all duration-500" />
            {/* buildings grow with population */}
            {Array.from({ length: 8 }, (_, i) => {
              const h = 30 + city * 0.9 + (i % 3) * 14;
              return <rect key={i} x={140 + i * 36} y={200 - h} width={26} height={h} fill="#334155" stroke="#475569"
                className="transition-all duration-300" />;
            })}
            {/* vehicles */}
            {Array.from({ length: Math.round(vehicles / 10) }, (_, i) => (
              <rect key={`v${i}`} x={20 + i * 42} y={196} width={22} height={9} rx={3} fill="#f59e0b" opacity={0.9}>
                <animate attributeName="x" values={`${20 + i * 42};${(20 + i * 42 + 40) % 440}`} dur={`${2 + (i % 4)}s`} repeatCount="indefinite" />
              </rect>
            ))}
            {/* water table level falls with pumping */}
            <rect x={0} y={210} width={460} height={90} fill="#0c2d3d" />
            <rect x={0} y={210 + (100 - waterQuality) * 0.5} width={460} height={90} fill="#155e75" opacity={0.5}
              className="transition-all duration-500" />
            <text x={12} y={228 + (100 - waterQuality) * 0.5} fontSize={9} fill="#67e8f9">
              water table: {Math.round(120 - pumping * 0.8)} m (pumping {pumping})
            </text>
            {/* land crack bars */}
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={60 + i * 90} y1={250 + i * 8} x2={100 + i * 90} y2={290} stroke="#78350f"
                strokeWidth={1 + landDeg / 30} className="transition-all duration-500" />
            ))}
            <text x={230} y={296} textAnchor="middle" fontSize={10} fill="#94a3b8">
              AQI {aqi.toFixed(0)} ({aqiBand.t}) -- water {waterQuality.toFixed(0)}/100 -- land degraded {landDeg.toFixed(0)}%
            </text>
          </svg>
          <div className="space-y-2 mt-2">
            {bars.map((b) => (
              <button key={b.id} onClick={() => setSel(b.id)}
                className={`w-full text-left rounded-xl px-3 py-2 border transition-all ${sel === b.id ? 'border-orange-500 bg-slate-950' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'}`}>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{b.label}</span>
                  <span className="font-mono font-bold text-slate-200">{b.val.toFixed(0)}{b.unit}</span>
                </div>
                <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden mt-1">
                  <div className={`h-full transition-all duration-300 ${b.id === 'air' ? (b.val > 200 ? 'bg-rose-500' : b.val > 100 ? 'bg-amber-400' : 'bg-emerald-500')
                    : b.id === 'water' ? (b.val > 60 ? 'bg-emerald-500' : b.val > 35 ? 'bg-amber-400' : 'bg-rose-500')
                      : (b.val > 60 ? 'bg-rose-500' : b.val > 35 ? 'bg-amber-400' : 'bg-emerald-500')}`}
                    style={{ width: `${Math.min(100, (b.val / b.max) * 100)}%` }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            {[
              { l: 'Urban population pressure', v: city, set: setCity, c: 'accent-pink-500', t: 'pink' },
              { l: 'Vehicles (lakhs)', v: vehicles, set: setVehicles, c: 'accent-amber-500', t: 'amber' },
              { l: 'Construction activity', v: construction, set: setConstruction, c: 'accent-stone-400', t: 'stone' },
              { l: 'Groundwater pumping', v: pumping, set: setPumping, c: 'accent-gold-500', t: 'sky' }
            ].map((s) => (
              <div key={s.l}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{s.l}</span><span className="font-mono font-bold text-slate-200">{s.v}</span>
                </div>
                <input type="range" min={0} max={100} step={5} value={s.v} aria-label={s.l}
                  onChange={(e) => s.set(Number(e.target.value))} className={`w-full min-h-11 ${s.c}`} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2">
              {(['none', 'cng', 'sewage', 'watershed'] as const).map((p) => (
                <button key={p} onClick={() => setPolicy(p)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${policy === p ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {p === 'none' ? 'No policy' : p === 'cng' ? 'CNG fleet' : p === 'sewage' ? 'Sewage plants' : 'Watershed'}
                </button>
              ))}
            </div>
            <button onClick={() => { setCity(50); setVehicles(40); setConstruction(30); setPumping(45); setPolicy('none'); setSel('air'); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Pollution is one problem with one fix.&quot; Trace the chains: vehicles hit AIR,
              construction hits AIR + LAND, pumping hits WATER + LAND. The CNG button cannot clean a
              river -- match the policy to the chain.
            </p>
          </div>

          <div className="bg-orange-950/40 rounded-2xl border border-orange-800/50 p-4 text-xs">
            <p className="font-bold text-orange-300 mb-1">What to try</p>
            <p>1. Push every driver to 100, then rescue the city using only TWO policy buttons. Which two, and why is the third useless?</p>
            <p>2. Set pumping to 100 and watch the land bar. Explain the link between a falling water table and land degradation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_GeographySelectedIssuesSim;
