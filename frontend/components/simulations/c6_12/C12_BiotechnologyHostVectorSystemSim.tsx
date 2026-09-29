'use client';

import React, { useMemo, useState } from 'react';

// ─── HOST-VECTOR SYSTEM: E. coli transformed with engineered plasmids ───
const ORIS = [
  { id: 'pBR322', label: 'pBR322 ori', copies: 18 },
  { id: 'pUC', label: 'pUC ori (modified)', copies: 600 },
];
const MARKERS = [
  { id: 'ampR', label: 'ampR gene', drug: 'Ampicillin' },
  { id: 'tetR', label: 'tetR gene', drug: 'Tetracycline' },
];
const PLATES = ['No antibiotic', 'Ampicillin', 'Tetracycline'];

export function C12_BiotechnologyHostVectorSystemSim() {
  const [oriId, setOriId] = useState('pBR322');
  const [markerId, setMarkerId] = useState('ampR');
  const [plate, setPlate] = useState('Ampicillin');
  const [uptakePct, setUptakePct] = useState(1);
  const [screened, setScreened] = useState(true);
  const [plated, setPlated] = useState(false);

  const ori = ORIS.find((o) => o.id === oriId) || ORIS[0];
  const marker = MARKERS.find((m) => m.id === markerId) || MARKERS[0];

  // ─── SELECTION MATH ───
  const result = useMemo(() => {
    const transformants = 1e8 * (uptakePct / 100); // cells taking up plasmid
    if (plate === 'No antibiotic') {
      return { colonies: 1e8, note: 'A lawn: untransformed cells also survive -- selection is useless.', viable: false };
    }
    if (plate !== marker.drug) {
      return { colonies: 0, note: `Transformed cells carry ${marker.label}, which does NOT resist ${plate}. Everything dies.`, viable: false };
    }
    return { colonies: transformants, note: `Only plasmid-bearing cells survive ${plate}. Selectable marker worked.`, viable: true };
  }, [plate, marker, uptakePct]);

  const yieldMg = ((result.colonies / 1e4) * ori.copies) / 100; // proportional to colonies x copy number
  const dotCount = result.colonies === 0 ? 0 : Math.min(60, Math.max(3, Math.round(Math.log10(result.colonies) * 12)));

  const reset = () => {
    setOriId('pBR322');
    setMarkerId('ampR');
    setPlate('Ampicillin');
    setUptakePct(1);
    setScreened(true);
    setPlated(false);
  };

  const dots = useMemo(
    () =>
      Array.from({ length: dotCount }, (_, i) => ({
        cx: 30 + ((i * 47) % 160),
        cy: 25 + ((i * 71) % 110),
        white: screened ? i % 3 !== 2 : false, // insert disrupts lacZ: most colonies white
      })),
    [dotCount, screened]
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">CBSE Class 12 Biotechnology - Host-Vector System</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">E. coli Transformation Bench</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">Host Lab</span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 mb-2">Origin of replication (ori)</p>
          <div className="flex gap-2">
            {ORIS.map((o) => (
              <button key={o.id} onClick={() => setOriId(o.id)} className={`flex-1 min-h-11 px-2 rounded-xl text-xs font-bold border ${oriId === o.id ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 mb-2">Selectable marker</p>
          <div className="flex gap-2">
            {MARKERS.map((m) => (
              <button key={m.id} onClick={() => setMarkerId(m.id)} className={`flex-1 min-h-11 px-2 rounded-xl text-xs font-bold border ${markerId === m.id ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 mb-2">Plate on</p>
          <div className="flex gap-2">
            {PLATES.map((p) => (
              <button key={p} onClick={() => setPlate(p)} className={`flex-1 min-h-11 px-1 rounded-xl text-[11px] font-bold border ${plate === p ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>DNA uptake efficiency</span>
            <span className="text-amber-300 font-mono font-bold">{uptakePct.toFixed(1)} %</span>
          </label>
          <input type="range" min={0.1} max={5} step={0.1} value={uptakePct} aria-label="DNA uptake efficiency percent"
            onChange={(e) => setUptakePct(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-amber-500" />
          <button onClick={() => setScreened(!screened)} className={`w-full mt-1 min-h-9 rounded-lg text-[11px] font-bold border ${screened ? 'bg-gold-950/60 border-gold-700 text-gold-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
            {screened ? 'X-gal blue-white screen: ON' : 'X-gal blue-white screen: OFF'}
          </button>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setPlated(true)} className="flex-1 min-h-11 px-4 rounded-2xl text-sm font-bold bg-emerald-600 border border-emerald-500 text-white hover:bg-emerald-500">Transform and plate 100 million cells</button>
        <button onClick={reset} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
      </div>

      {/* PETRI PLATE + REPORT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
          <svg viewBox="0 0 220 160" className="w-full h-52" preserveAspectRatio="xMidYMid meet">
            <circle cx="110" cy="80" r="72" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
            {!plated && <text x="110" y="84" fill="#64748b" fontSize="10" textAnchor="middle">press plate to incubate</text>}
            {plated && dots.length === 0 && <text x="110" y="84" fill="#f43f5e" fontSize="10" textAnchor="middle">no growth: sterile plate</text>}
            {plated && dots.map((d, i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r="4" fill={d.white ? '#f8fafc' : '#3b82f6'} stroke="#0f172a" />
            ))}
          </svg>
        </div>
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2 text-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Overnight result</p>
          {!plated ? (
            <p className="text-slate-400">Choose ori, marker, plate and uptake, then plate the culture.</p>
          ) : (
            <>
              <p className="text-slate-300 flex justify-between"><span>Colonies</span><span className="font-mono font-bold text-emerald-300">{result.colonies === 0 ? '0' : result.colonies.toLocaleString('en-IN', { notation: 'compact' })}</span></p>
              <p className="text-slate-300 flex justify-between"><span>Plasmid copies per cell</span><span className="font-mono font-bold text-gold-300">{ori.copies}</span></p>
              <p className="text-slate-300 flex justify-between"><span>Relative protein yield</span><span className="font-mono font-bold text-amber-300">{yieldMg.toFixed(1)} mg/L equiv.</span></p>
              {plated && result.colonies > 0 && screened && (
                <p className="text-slate-300 flex justify-between"><span>White : blue colonies</span><span className="font-mono font-bold text-gold-300">{dots.filter((d) => d.white).length} : {dots.filter((d) => !d.white).length}</span></p>
              )}
              <p className={`p-2 rounded-lg font-bold ${result.viable ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-300' : 'bg-rose-950/60 border border-rose-700 text-rose-300'}`}>{result.note}</p>
            </>
          )}
          <p className="text-slate-400 pt-2 border-t border-slate-800">
            Misconception killer: the marker gene does not help cells grow -- it only lets survivors be SEEN. And a high-copy
            ori is worthless if the drug on your plate does not match your marker.
          </p>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Keep marker = tetR and plate on Ampicillin. Explain the empty plate, then fix the setup two different ways.</p>
        <p className="mt-1">2. Switch ori from pBR322 to pUC at the same uptake efficiency. Does colony count change? What DOES change, and why do protein factories love high-copy plasmids?</p>
      </footer>
    </div>
  );
}

export default C12_BiotechnologyHostVectorSystemSim;
