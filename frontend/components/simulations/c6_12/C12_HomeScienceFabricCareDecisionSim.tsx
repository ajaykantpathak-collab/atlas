'use client';

import React, { useMemo, useState } from 'react';

// ─── FIBRE SCIENCE: each fibre has hard limits; care actions test them ───
type Fabric = { id: string; label: string; maxTemp: number; bleachSafe: boolean; sunSafe: boolean; wringSafe: boolean; note: string };

const FABRICS: Fabric[] = [
  { id: 'cotton', label: 'Cotton', maxTemp: 90, bleachSafe: true, sunSafe: true, wringSafe: true, note: 'Strong cellulose fibre; gains strength when wet. Tolerates boiling and sun.' },
  { id: 'linen', label: 'Linen', maxTemp: 80, bleachSafe: true, sunSafe: true, wringSafe: true, note: 'Stiff flax cellulose; very strong, creases easily, tolerates heat well.' },
  { id: 'polyester', label: 'Polyester', maxTemp: 50, bleachSafe: true, sunSafe: true, wringSafe: true, note: 'Thermoplastic synthetic: heat MELTS/glazes it, otherwise tough.' },
  { id: 'silk', label: 'Silk', maxTemp: 40, bleachSafe: false, sunSafe: false, wringSafe: false, note: 'Protein fibre: alkalis and bleach dissolve it; sunlight yellows it.' },
  { id: 'wool', label: 'Wool', maxTemp: 40, bleachSafe: false, sunSafe: false, wringSafe: false, note: 'Protein fibre with scales: heat plus agitation felts and shrinks it.' },
];

export function C12_HomeScienceFabricCareDecisionSim() {
  const [fabricId, setFabricId] = useState('cotton');
  const [washTemp, setWashTemp] = useState(30);
  const [bleach, setBleach] = useState(false);
  const [sunDry, setSunDry] = useState(false);
  const [hardWring, setHardWring] = useState(false);

  const fabric = FABRICS.find((f) => f.id === fabricId) || FABRICS[0];

  // ─── DAMAGE MODEL: every hazard adds a truthful penalty ───
  const report = useMemo(() => {
    let damage = 0;
    const causes: string[] = [];
    const overTemp = Math.max(0, washTemp - fabric.maxTemp);
    if (overTemp > 0) {
      const heat = Math.min(60, overTemp * 1.2);
      damage += heat;
      causes.push(`water ${(fabric.maxTemp + 10).toFixed(0)}C hotter than ${fabric.label} tolerates (+${heat.toFixed(0)}%)`);
    }
    if (bleach && !fabric.bleachSafe) {
      damage += 45;
      causes.push('chlorine bleach attacks this fibre (+45%)');
    }
    if (sunDry && !fabric.sunSafe) {
      damage += 20;
      causes.push('direct sunlight yellows and weakens it (+20%)');
    }
    if (hardWring && !fabric.wringSafe) {
      damage += 25;
      causes.push('hard wringing felts/distorts the fibre (+25%)');
    }
    const verdict = damage < 5 ? 'safe' : damage < 40 ? 'weakened' : 'damaged';
    return { damage: Math.min(100, damage), causes, verdict };
  }, [fabric, washTemp, bleach, sunDry, hardWring]);

  const verdictStyle =
    report.verdict === 'safe'
      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
      : report.verdict === 'weakened'
      ? 'bg-amber-950/60 border-amber-700 text-amber-300'
      : 'bg-rose-950/60 border-rose-700 text-rose-300';

  const reset = () => {
    setFabricId('cotton');
    setWashTemp(30);
    setBleach(false);
    setSunDry(false);
    setHardWring(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-violet-400">CBSE Class 12 Home Science - Care and Maintenance of Fabrics in Institutions</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Fabric Care Decision Tree</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-violet-950 border border-violet-700 text-violet-300">Laundry Lab</span>
      </header>

      {/* FABRIC PICK */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FABRICS.map((f) => (
          <button key={f.id} onClick={() => setFabricId(f.id)} className={`min-h-11 px-4 rounded-xl text-sm font-bold border ${fabricId === f.id ? 'bg-violet-600 text-white border-violet-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* CARE ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Wash water temperature</span>
            <span className="text-amber-300 font-mono font-bold">{washTemp} deg C</span>
          </label>
          <input type="range" min={20} max={90} step={5} value={washTemp} aria-label="wash water temperature in celsius"
            onChange={(e) => setWashTemp(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-amber-500" />
          <p className="text-[11px] text-slate-500 mt-1">{fabric.label} tolerates up to about {fabric.maxTemp} deg C.</p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {([['Chlorine bleach', bleach, setBleach], ['Dry in direct sun', sunDry, setSunDry], ['Hard wringing', hardWring, setHardWring]] as [string, boolean, (v: boolean) => void][]).map(([lab, val, set]) => (
            <button key={lab} onClick={() => set(!val)} className={`min-h-11 px-3 rounded-xl text-xs font-bold border text-left ${val ? 'bg-rose-950/60 border-rose-700 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              {lab}: {val ? 'YES' : 'no'}
            </button>
          ))}
        </div>
      </div>

      {/* VERDICT */}
      <div className={`p-4 rounded-2xl border mb-3 ${verdictStyle}`}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-extrabold uppercase tracking-wider">
            {report.verdict === 'safe' ? 'Safe routine' : report.verdict === 'weakened' ? 'Caution: fibre is weakening' : 'Damage: garment ruined'}
          </p>
          <p className="text-lg font-extrabold font-mono">damage {report.damage.toFixed(0)} %</p>
        </div>
        <div className="h-3 rounded-full bg-slate-950 border border-slate-700 overflow-hidden mb-2">
          <div className={`h-full transition-all duration-300 ${report.verdict === 'safe' ? 'bg-emerald-500' : report.verdict === 'weakened' ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${Math.max(report.damage, 2)}%` }} />
        </div>
        {report.causes.length === 0 ? (
          <p className="text-xs">No hazards triggered. {fabric.note}</p>
        ) : (
          <ul className="text-xs space-y-1 list-disc list-inside">
            {report.causes.map((c, i) => (<li key={i}>{c}</li>))}
          </ul>
        )}
      </div>

      {/* FIBRE DOSSIER + MISCONCEPTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <p className="text-[10px] uppercase tracking-wider text-violet-300 mb-1">Institutional recommendation for {fabric.label}</p>
          <p>
            {fabric.id === 'cotton' || fabric.id === 'linen'
              ? 'Wash hot with alkali detergents, sun-dry, iron damp on high heat -- ideal for hospital linen that needs sterilising washes.'
              : fabric.id === 'polyester'
              ? 'Wash warm, tumble dry low, iron cool -- never let a hot iron rest on it or it glazes permanently.'
              : 'Wash lukewarm or cold with mild/neutral soap, squeeze water gently, dry flat in shade, or send to dry-clean.'}
          </p>
        </div>
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <p>
            <span className="font-bold text-amber-300">Misconception killer:</span> hot water is NOT a better clean for everything.
            Cellulose fibres (cotton, linen) love heat; protein fibres (silk, wool) and thermoplastics (polyester) are destroyed by it.
            The care label is fibre chemistry, not a suggestion.
          </p>
        </div>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/60 to-slate-900 border border-violet-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set Wool with 90 deg C water and hard wringting. Read each damage cause -- explain in one line why the wool felted.</p>
        <p className="mt-1">2. A hospital needs bleach-safe bedsheets. Test all five fabrics with bleach plus 90 deg C and list which two survive.</p>
      </footer>
    </div>
  );
}

export default C12_HomeScienceFabricCareDecisionSim;
