'use client';
/**
 * C9_ChemistryCovalentbondingSim (Class 9 Chemistry)
 *
 * ONE concept: a covalent bond is a SHARED PAIR. Choose an element, add bond
 * pairs, and watch valence electrons, lone pairs and the octet rule settle.
 */
import React, { useState } from 'react';

type ElemKey = 'H' | 'Cl' | 'O' | 'N' | 'C';
const ELEM: Record<ElemKey, { name: string; valence: number; needs: number; color: string }> = {
  H: { name: 'Hydrogen', valence: 1, needs: 1, color: '#38bdf8' }, // duet: needs 1 shared pair
  Cl: { name: 'Chlorine', valence: 7, needs: 1, color: '#a3e635' },
  O: { name: 'Oxygen', valence: 6, needs: 2, color: '#f87171' },
  N: { name: 'Nitrogen', valence: 5, needs: 3, color: '#60a5fa' },
  C: { name: 'Carbon', valence: 4, needs: 4, color: '#fbbf24' },
};
// real bond lengths in picometres
const BOND_LEN: Record<string, number> = { 'H-H': 74, 'Cl-Cl': 199, 'O-O': 148, 'O=O': 121, 'N-N': 145, 'N=N': 125, 'N#N': 110, 'C-C': 154, 'C=C': 134, 'C#C': 120 };

export function C9_ChemistryCovalentbondingSim() {
  const [elem, setElem] = useState<ElemKey>('O');
  const [pairs, setPairs] = useState(2); // shared pairs in the diatomic bond
  const [showLone, setShowLone] = useState(true);

  const e = ELEM[elem];
  const maxPairs = elem === 'H' ? 1 : 3;
  const shared = Math.min(pairs, maxPairs);
  const gained = shared; // electrons gained per atom from sharing
  const around = e.valence + gained;
  const happy = elem === 'H' ? around === 2 : around === 8;
  const lone = Math.max(0, e.valence - gained);
  const lenKey = `${elem}${shared === 1 ? '-' : shared === 2 ? '=' : '#'}${elem}`;
  const len = BOND_LEN[lenKey] ?? 0;

  // two atoms on the SVG
  const ax = 170;
  const bx = 390;
  const ay = 110;
  const by = 110;

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Build a covalent bond: shared pairs only</h1>
      <p className="mt-1 text-sm text-slate-400">
        Pick an element, then add shared pairs. The octet (or duet for hydrogen) tells you when to stop.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          value={elem}
          aria-label="element"
          onChange={(ev) => {
            const k = ev.target.value as ElemKey;
            setElem(k);
            setPairs(ELEM[k].needs);
          }}
          className="min-h-11 px-3 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-slate-100"
        >
          {(Object.keys(ELEM) as ElemKey[]).map((k) => (
            <option key={k} value={k}>
              {ELEM[k].name} ({k})
            </option>
          ))}
        </select>
        <button
          onClick={() => setPairs((v) => Math.max(1, v - 1))}
          className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold transition-colors"
        >
          − shared pair
        </button>
        <button
          onClick={() => setPairs((v) => Math.min(maxPairs, v + 1))}
          className="min-h-11 px-4 rounded-xl bg-gold-600 hover:bg-gold-500 text-sm font-bold transition-colors"
        >
          + shared pair
        </button>
        <button
          onClick={() => setShowLone((v) => !v)}
          className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-colors ${showLone ? 'bg-gold-600 border-gold-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
        >
          {showLone ? 'Hide lone pairs' : 'Show lone pairs'}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
          <svg viewBox="0 0 560 220" className="w-full" role="img" aria-label="diatomic molecule Lewis structure">
            <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#334155" strokeWidth={2} />
            {[0, 1, 2].map((i) =>
              i < shared ? (
                <g key={i}>
                  <circle cx={280} cy={98 + i * 12} r={9} fill="#6366f1" opacity={0.9} className="transition-all duration-300" />
                  <circle cx={280} cy={98 + i * 12} r={4} fill="#c7d2fe" />
                  <text x={280} y={84} textAnchor="middle" fill="#a5b4fc" fontSize={10}>
                    shared pair {i + 1}
                  </text>
                </g>
              ) : null
            )}
            {[ax, bx].map((x, side) => (
              <g key={side}>
                <circle cx={x} cy={ay} r={26} fill="#1e293b" stroke={e.color} strokeWidth={3} />
                <text x={x} y={ay + 6} textAnchor="middle" fill="#f1f5f9" fontSize={20} fontWeight="bold">
                  {elem}
                </text>
                {showLone &&
                  Array.from({ length: lone }, (_, i) => (
                    <circle key={i} cx={x + (side === 0 ? -46 : 46)} cy={ay - 12 + i * 16} r={8} fill="#0f172a" stroke="#64748b" strokeWidth={1.5} className="transition-all duration-300" />
                  ))}
                {showLone &&
                  lone > 0 && (
                    <text x={x + (side === 0 ? -46 : 46)} y={ay - 18} textAnchor="middle" fill="#94a3b8" fontSize={10}>
                      lone pairs
                    </text>
                  )}
              </g>
            ))}
            <text x={280} y={200} textAnchor="middle" fill={happy ? '#34d399' : '#fb7185'} fontSize={14} fontWeight="bold" className="transition-colors duration-300">
              {happy ? 'Stable! Full ' + (elem === 'H' ? 'duet (2 e-)' : 'octet (8 e-)') : 'Unstable — ' + (elem === 'H' ? 'duet' : 'octet') + ' not satisfied'}
            </text>
          </svg>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Valence electrons</div>
              <div className="font-mono text-gold-300 font-bold text-lg">{e.valence}</div>
            </div>
            <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Shared pairs</div>
              <div className="font-mono text-gold-300 font-bold text-lg">{shared}</div>
            </div>
            <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Electrons around atom</div>
              <div className={`font-mono font-bold text-lg ${happy ? 'text-emerald-300' : 'text-rose-300'}`}>{around}</div>
            </div>
            <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Bond length</div>
              <div className="font-mono text-amber-300 font-bold text-lg">{len} pm</div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-sm text-slate-300">
            {elem} has {e.valence} valence electrons, so it needs <span className="font-bold text-gold-300">{e.needs} shared pair(s)</span> to
            complete its {elem === 'H' ? 'duet' : 'octet'}. Right now the bond has {shared} pair(s): each atom counts{' '}
            {e.valence} + {gained} = <span className={happy ? 'text-emerald-300' : 'text-rose-300'}>{around}</span> electrons.
            {shared > e.needs && ' That is too many for this element — real ' + elem + ' does not bond this way.'}
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-700/60 rounded-2xl text-xs text-amber-200">
            <span className="font-bold">Misconception killer:</span> a single bond is not one shared electron — it is one
            shared PAIR (2 electrons, one from each atom). Add a pair and BOTH atoms get +1 electron.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-800/60 rounded-2xl text-sm">
        <p className="font-bold text-emerald-300 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-300">
          <li>Choose Nitrogen. How many shared pairs give the magic 8? Watch the bond length shrink as pairs increase.</li>
          <li>Choose Hydrogen and try 2 pairs. Why does the sim refuse to call it stable even though 4 is "even"?</li>
        </ol>
      </div>

      <button
        onClick={() => {
          setElem('O');
          setPairs(2);
          setShowLone(true);
        }}
        className="mt-4 min-h-11 w-full rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold transition-colors"
      >
        Reset
      </button>
    </div>
  );
}

export default C9_ChemistryCovalentbondingSim;
