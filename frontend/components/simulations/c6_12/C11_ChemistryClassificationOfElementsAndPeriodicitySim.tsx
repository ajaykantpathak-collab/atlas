'use client';

import React, { useState } from 'react';

/**
 * Class 11 Chemistry -- Classification of Elements and Periodicity
 * Real periodic trends across periods 2 and 3: atomic radius, first ionization
 * enthalpy and electronegativity with anomaly explanations. Self-contained.
 */

type Prop = 'radius' | 'ie' | 'en';

const ELEMENTS: Record<2 | 3, { sym: string; name: string; radius: number; ie: number; en: number | null; note: string }[]> = {
  2: [
    { sym: 'Li', name: 'Lithium', radius: 152, ie: 520, en: 1.0, note: 'Largest in period 2; loses e- easily -- strongly electropositive.' },
    { sym: 'Be', name: 'Beryllium', radius: 111, ie: 899, en: 1.5, note: 'Higher IE than B: 2s electrons penetrate closer than the 2p electron of B.' },
    { sym: 'B', name: 'Boron', radius: 88, ie: 801, en: 2.0, note: 'DIP in IE: first electron sits in the higher-energy, better-shielded 2p orbital.' },
    { sym: 'C', name: 'Carbon', radius: 77, ie: 1086, en: 2.5, note: 'Halfway to non-metal character; forms 4 strong bonds.' },
    { sym: 'N', name: 'Nitrogen', radius: 74, ie: 1402, en: 3.0, note: 'Peak stability: 2p^3 is exactly half-filled -- extra IE spike.' },
    { sym: 'O', name: 'Oxygen', radius: 73, ie: 1314, en: 3.5, note: 'DIP in IE: pairing in 2p^4 adds repulsion, so the 4th p electron leaves easily.' },
    { sym: 'F', name: 'Fluorine', radius: 71, ie: 1681, en: 4.0, note: 'Most electronegative element in the periodic table.' },
    { sym: 'Ne', name: 'Neon', radius: 69, ie: 2081, en: null, note: 'Highest IE in period 2: full octet, electron gain enthalpy > 0 (inert).' },
  ],
  3: [
    { sym: 'Na', name: 'Sodium', radius: 186, ie: 496, en: 0.9, note: 'Largest in period 3; the classic reactive metal.' },
    { sym: 'Mg', name: 'Magnesium', radius: 160, ie: 738, en: 1.2, note: 'Higher IE than Al: 3s^2 paired, symmetric sub-shell.' },
    { sym: 'Al', name: 'Aluminium', radius: 143, ie: 578, en: 1.5, note: 'DIP in IE: 3p^1 electron is higher in energy than 3s^2 of Mg.' },
    { sym: 'Si', name: 'Silicon', radius: 117, ie: 786, en: 1.8, note: 'Metalloid pivot of the period.' },
    { sym: 'P', name: 'Phosphorus', radius: 110, ie: 1012, en: 2.1, note: 'Half-filled 3p^3 gives a small extra stability bump.' },
    { sym: 'S', name: 'Sulphur', radius: 104, ie: 1000, en: 2.5, note: 'DIP in IE: 3p^4 pairing repulsion, exactly like O vs N above.' },
    { sym: 'Cl', name: 'Chlorine', radius: 99, ie: 1251, en: 3.0, note: 'Most negative electron gain enthalpy of all elements.' },
    { sym: 'Ar', name: 'Argon', radius: 94, ie: 1521, en: null, note: 'Noble gas: full 3s^2 3p^6 octet.' },
  ],
};

const PROP_META: Record<Prop, { label: string; unit: string; color: string; trend: string; max: number }> = {
  radius: { label: 'Atomic radius', unit: 'pm', color: '#38bdf8', trend: 'DECREASES across a period (Z_eff pulls shells in)', max: 200 },
  ie: { label: '1st ionization enthalpy', unit: 'kJ/mol', color: '#f472b6', trend: 'INCREASES across a period (harder to pull an e- off a small, + charged core)', max: 2200 },
  en: { label: 'Electronegativity', unit: 'Pauling', color: '#34d399', trend: 'INCREASES across a period', max: 4.2 },
};

export function C11_ChemistryClassificationOfElementsAndPeriodicitySim() {
  const [period, setPeriod] = useState<2 | 3>(3);
  const [prop, setProp] = useState<Prop>('ie');
  const [selIdx, setSelIdx] = useState(0);

  const els = ELEMENTS[period];
  const meta = PROP_META[prop];
  const sel = els[selIdx];
  const selVal = prop === 'en' ? sel.en : prop === 'ie' ? sel.ie : sel.radius;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 font-mono">Z</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 11 -- Periodicity in Properties</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Ride a Period: Radius, Ionization, Electronegativity</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 300" className="w-full">
            <line x1={50} y1={250} x2={460} y2={250} stroke="#475569" strokeWidth={2} />
            <line x1={50} y1={250} x2={50} y2={20} stroke="#475569" strokeWidth={2} />
            <text x={255} y={288} textAnchor="middle" fill="#64748b" fontSize={11} fontFamily="monospace">Group I --{'>'} Group 18 (period {period})</text>
            <text x={18} y={140} fill="#64748b" fontSize={11} fontFamily="monospace" transform="rotate(-90 18 140)">
              {meta.label} ({meta.unit})
            </text>
            {els.map((el, i) => {
              const val = (prop === 'en' ? el.en : prop === 'ie' ? el.ie : el.radius) ?? 0;
              const h = (val / meta.max) * 200;
              const x = 62 + i * 49;
              const isSel = i === selIdx;
              return (
                <g key={el.sym} onClick={() => setSelIdx(i)} className="cursor-pointer">
                  <rect x={x} y={250 - h} width={34} height={h} rx={4}
                    fill={meta.color} opacity={isSel ? 1 : 0.45}
                    stroke={isSel ? '#fff' : 'none'} strokeWidth={2} />
                  <text x={x + 17} y={250 - h - 6} textAnchor="middle" fontSize={10} fontFamily="monospace"
                    fill={isSel ? '#fff' : '#94a3b8'}>
                    {prop === 'en' ? (el.en === null ? '--' : el.en.toFixed(1)) : val}
                  </text>
                  <text x={x + 17} y={266} textAnchor="middle" fontSize={11} fontWeight="bold"
                    fill={isSel ? '#fff' : '#94a3b8'} fontFamily="monospace">{el.sym}</text>
                  <circle cx={x + 17} cy={278} r={3} fill={isSel ? meta.color : '#1e293b'} />
                </g>
              );
            })}
            <path d="M 70 40 L 440 40" stroke="#64748b" strokeWidth={1.5} markerEnd="" strokeDasharray="6 4" />
            <polygon points="440,35 452,40 440,45" fill="#64748b" />
            <text x={255} y={32} textAnchor="middle" fill="#94a3b8" fontSize={10} fontFamily="monospace">{meta.trend.split(' (')[0]}</text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-white">{sel.name} ({sel.sym})</span>
              <span className="text-xs font-mono" style={{ color: meta.color }}>
                {meta.label}: <b>{selVal === null ? 'n/a' : selVal} {meta.unit}</b>
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400 grid grid-cols-3 gap-2">
              <span>r = {sel.radius} pm</span>
              <span>IE1 = {sel.ie} kJ/mol</span>
              <span>EN = {sel.en === null ? '--' : sel.en}</span>
            </div>
            <p className="text-[11px] text-amber-300 mt-2">{sel.note}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {([2, 3] as const).map((p) => (
                <button key={p} onClick={() => { setPeriod(p); setSelIdx(0); }}
                  className={`py-2 rounded-xl text-xs font-bold ${period === p ? 'bg-gold-500 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  Period {p} ({p === 2 ? 'Li-Ne' : 'Na-Ar'})
                </button>
              ))}
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Property to plot</p>
              <div className="grid grid-cols-1 gap-1.5">
                {(['radius', 'ie', 'en'] as Prop[]).map((p) => (
                  <button key={p} onClick={() => setProp(p)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left ${prop === p ? 'bg-slate-700 text-white border border-slate-500' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                    {PROP_META[p].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {els.map((el, i) => (
                <button key={el.sym} onClick={() => setSelIdx(i)}
                  className={`py-1 rounded-lg text-[11px] font-mono font-bold ${i === selIdx ? 'bg-gold-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {el.sym}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-gold-300 font-bold">Why the anomalies matter (board favourite)</div>
            <div className="text-slate-400">IE dips at <b>B</b> (2p^1 vs 2s^2) and <b>O</b> (2p^4 pairing) -- period 3 repeats both at <b>Al</b> and <b>S</b>.</div>
            <div className="text-slate-400">Radius shrink period 2: {(152 - 69).toFixed(0)} pm total; period 3: {186 - 94} pm. Same effective-nuclear-charge logic.</div>
            <div className="text-slate-400">Noble gases have no Pauling EN -- they refuse to bond.</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              All three trends are one story: across a period, protons are added to the same shell, so
              effective nuclear charge Z_eff climbs and the shell contracts -- smaller radius, tighter
              electrons (higher IE), stronger pull on shared electrons (higher EN). Down a group every
              trend reverses because a whole new shell is added.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Plot ionization enthalpy and find BOTH dips in period 3; click Al and S to confirm the sub-shell explanation.</p>
            <p>2. Which element breaks the &quot;non-metal = small&quot; rule between N and O, and what single word (pairing) explains it?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_ChemistryClassificationOfElementsAndPeriodicitySim;
