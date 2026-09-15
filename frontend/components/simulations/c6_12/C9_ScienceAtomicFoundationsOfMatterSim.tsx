'use client';

import React, { useMemo, useState } from 'react';

// ─── FIRST 20 ELEMENTS: symbol, name, most common mass number A ───
const ELEMENTS: { z: number; sym: string; name: string; a: number }[] = [
  { z: 1, sym: 'H', name: 'Hydrogen', a: 1 }, { z: 2, sym: 'He', name: 'Helium', a: 4 },
  { z: 3, sym: 'Li', name: 'Lithium', a: 7 }, { z: 4, sym: 'Be', name: 'Beryllium', a: 9 },
  { z: 5, sym: 'B', name: 'Boron', a: 11 }, { z: 6, sym: 'C', name: 'Carbon', a: 12 },
  { z: 7, sym: 'N', name: 'Nitrogen', a: 14 }, { z: 8, sym: 'O', name: 'Oxygen', a: 16 },
  { z: 9, sym: 'F', name: 'Fluorine', a: 19 }, { z: 10, sym: 'Ne', name: 'Neon', a: 20 },
  { z: 11, sym: 'Na', name: 'Sodium', a: 23 }, { z: 12, sym: 'Mg', name: 'Magnesium', a: 24 },
  { z: 13, sym: 'Al', name: 'Aluminium', a: 27 }, { z: 14, sym: 'Si', name: 'Silicon', a: 28 },
  { z: 15, sym: 'P', name: 'Phosphorus', a: 31 }, { z: 16, sym: 'S', name: 'Sulphur', a: 32 },
  { z: 17, sym: 'Cl', name: 'Chlorine', a: 35 }, { z: 18, sym: 'Ar', name: 'Argon', a: 40 },
  { z: 19, sym: 'K', name: 'Potassium', a: 39 }, { z: 20, sym: 'Ca', name: 'Calcium', a: 40 },
];

// Bohr filling for Z <= 20: shells hold 2, 8, 8, 2
function shellFill(electrons: number): number[] {
  const caps = [2, 8, 8, 2];
  const shells: number[] = [];
  let left = electrons;
  for (const c of caps) {
    if (left <= 0) break;
    const put = Math.min(left, c);
    shells.push(put);
    left -= put;
  }
  return shells;
}

// ─── MAIN COMPONENT ───
export function C9_ScienceAtomicFoundationsOfMatterSim() {
  const [protons, setProtons] = useState(6);
  const [neutrons, setNeutrons] = useState(6);
  const [electrons, setElectrons] = useState(6);
  const [quizTarget, setQuizTarget] = useState<{ z: number; a: number; name: string } | null>(null);
  const [quizResult, setQuizResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const el = ELEMENTS[protons - 1];
  const massNumber = protons + neutrons;
  const charge = protons - electrons;
  const shells = shellFill(electrons);
  const valence = shells.length ? shells[shells.length - 1] : 0;
  const isNeutral = charge === 0;
  const isNoble = isNeutral && (protons === 2 ? valence === 2 : valence === 8);

  const makeNeutral = (z: number) => {
    const base = ELEMENTS[z - 1];
    setProtons(z);
    setElectrons(z);
    setNeutrons(base ? base.a - z : z);
    setQuizResult('idle');
  };

  const startQuiz = () => {
    const pick = ELEMENTS[Math.floor(Math.random() * 20)];
    setQuizTarget({ z: pick.z, a: pick.a, name: pick.name });
    setQuizResult('idle');
    setProtons(1);
    setNeutrons(0);
    setElectrons(1);
  };

  const checkQuiz = () => {
    if (!quizTarget) return;
    const ok = protons === quizTarget.z && electrons === quizTarget.z && neutrons === quizTarget.a - quizTarget.z;
    setQuizResult(ok ? 'correct' : 'wrong');
  };

  // ─── BOHR SVG GEOMETRY ───
  const CX = 160, CY = 150;
  const nucleusR = 10 + Math.min(protons, 20) * 0.35;

  const Stepper = ({ label, value, color, onSet }: { label: string; value: number; color: string; onSet: (v: number) => void }) => (
    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
      <p className="text-xs text-slate-400 flex justify-between mb-2">
        <span>{label}</span>
        <span className={`font-mono font-bold ${color}`}>{value}</span>
      </p>
      <div className="flex gap-2">
        <button onClick={() => onSet(Math.max(0, value - 1))} className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold">-</button>
        <button onClick={() => onSet(Math.min(20, value + 1))} className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold">+</button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">CBSE Class 9 Science - Atoms and Molecules</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Atomic Foundations of Matter: Build an Atom</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-mono">
          {el ? `${el.sym} nucleus` : 'unknown'}
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <Stepper label="Protons (p+)" value={protons} color="text-rose-300" onSet={(v) => { setProtons(v); setQuizResult('idle'); }} />
        <Stepper label="Neutrons (n0)" value={neutrons} color="text-slate-200" onSet={(v) => { setNeutrons(v); setQuizResult('idle'); }} />
        <Stepper label="Electrons (e-)" value={electrons} color="text-sky-300" onSet={(v) => { setElectrons(v); setQuizResult('idle'); }} />
        <button onClick={() => makeNeutral(protons)} className="p-3 rounded-2xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white">
          Make neutral atom of this element
        </button>
        <div className="p-3 bg-slate-900 rounded-2xl border border-amber-800 space-y-1.5">
          <button onClick={startQuiz} className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold">
            {quizTarget ? `Quiz: build ${quizTarget.name}` : 'Quiz me: build a random atom'}
          </button>
          {quizTarget && (
            <button onClick={checkQuiz} className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold">
              Check my atom
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* BOHR MODEL */}
        <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-2">
          <svg viewBox="0 0 320 300" className="w-full h-64 md:h-80">
            {shells.map((count, si) => {
              const ringR = nucleusR + 28 + si * 26;
              return (
                <g key={si}>
                  <circle cx={CX} cy={CY} r={ringR} fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                  {Array.from({ length: count }).map((_, ei) => {
                    const ang = (2 * Math.PI * ei) / count - Math.PI / 2;
                    return (
                      <circle key={ei} cx={CX + ringR * Math.cos(ang)} cy={CY + ringR * Math.sin(ang)} r="4.5" fill="#38bdf8" />
                    );
                  })}
                  <text x={CX + ringR + 3} y={CY - 4} fill="#475569" fontSize="9">K L M N</text>
                </g>
              );
            })}
            <circle cx={CX} cy={CY} r={nucleusR} fill="#7f1d1d" stroke="#fca5a5" strokeWidth="1.5" />
            <text x={CX} y={CY + 4} fill="#fecaca" fontSize="10" fontWeight="bold" textAnchor="middle">
              {protons}p {neutrons}n
            </text>
          </svg>
          <p className="text-center font-mono text-xs text-slate-400 mt-1">
            Shell configuration: <span className="text-sky-300 font-bold">{shells.join(', ') || 'none'}</span> (K, L, M, N)
          </p>
        </div>

        {/* READOUTS */}
        <div className="md:col-span-2 space-y-3">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5 text-sm">
            <p className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Atom report</p>
            <p className="text-slate-300">Element: <span className="font-bold text-white">{el ? `${el.name} (${el.sym})` : 'beyond Z = 20'}</span></p>
            <p className="text-slate-300">Mass number A = p + n = <span className="font-mono text-amber-300 font-bold">{massNumber}</span></p>
            <p className="text-slate-300">
              Charge = p - e = <span className={`font-mono font-bold ${charge === 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{charge > 0 ? `+${charge}` : charge}</span>
              {charge > 0 ? ' (cation)' : charge < 0 ? ' (anion)' : ' (neutral)'}
            </p>
            <p className="text-slate-300">Valence electrons: <span className="font-bold text-sky-300">{valence}</span></p>
          </div>
          {quizTarget && quizResult !== 'idle' && (
            <div className={`p-3 rounded-2xl text-sm font-bold ${quizResult === 'correct' ? 'bg-emerald-950/60 border border-emerald-600 text-emerald-300' : 'bg-rose-950/60 border border-rose-700 text-rose-300'}`}>
              {quizResult === 'correct'
                ? `Correct! ${quizTarget.name}: Z = ${quizTarget.z}, so ${quizTarget.z}p, ${quizTarget.z}e and ${quizTarget.a - quizTarget.z}n.`
                : `Not yet. Recall: protons = Z = ${quizTarget.z}, electrons = protons for a neutral atom, neutrons = A - Z = ${quizTarget.a - quizTarget.z}.`}
            </div>
          )}
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            {isNoble
              ? 'Full outer shell: this is a noble-gas style, chemically stable arrangement.'
              : `Atoms bond to reach a full outer shell. This atom would ${valence <= 4 ? 'lose or share' : 'gain or share'} ${valence <= 4 ? valence : 8 - valence} electron(s) in bonding.`}
            {el && massNumber !== el.a && <span className="block mt-1 text-amber-300">Note: A = {massNumber} differs from the common isotope (A = {el.a}), so this is an isotope of {el.name}.</span>}
          </div>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-indigo-300">Big idea:</span> the proton count (atomic number Z) decides which element an atom is;
          electrons decide its charge and chemistry; neutrons only change the mass, giving isotopes. Bohr shells fill as 2, 8, 8, 2 for the
          first twenty elements, and the outermost shell electrons drive all bonding.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Build a neutral sodium atom (Z = 11, A = 23), then strip one electron to make the Na+ ion and read the charge report.</p>
        <p className="mt-1">2. Use Quiz mode until you have built three atoms correctly, predicting the neutron count from A - Z first.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceAtomicFoundationsOfMatterSim;
