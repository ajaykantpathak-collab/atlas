'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Political Science -- Rights
 * ONE concept: rights are claims that outrank ordinary majority wants --
 * they are the fence around the fence-builders. Test claims against the
 * rights court: which majority votes survive review? react + tailwind.
 */

type Right = 'speech' | 'equality' | 'religion' | 'life';

const RIGHTS: { id: Right; label: string; basis: string }[] = [
  { id: 'speech', label: 'Freedom of expression', basis: 'needed to debate every other right' },
  { id: 'equality', label: 'Right to equality', basis: 'equal concern and respect before the law' },
  { id: 'religion', label: 'Freedom of religion', basis: 'conscience cannot be voted away' },
  { id: 'life', label: 'Right to life and liberty', basis: 'the precondition of all claims' }
];

type CaseT = { id: string; text: string; touches: Right; justified: boolean; why: string };

const CASES: CaseT[] = [
  { id: 'c1', text: 'Majority (70%) bans a book it finds offensive', touches: 'speech', justified: false, why: 'offence is not harm -- speech falls only for incitement' },
  { id: 'c2', text: 'Majority (80%) quarantines a deadly epidemic zone', touches: 'life', justified: true, why: 'proportionate protection of others\' life -- permitted' },
  { id: 'c3', text: 'Majority (60%) reserves no seats for a minority in jobs', touches: 'equality', justified: false, why: 'formal rule with unequal effect -- equality review fails' },
  { id: 'c4', text: 'Majority (75%) outlaws forced religious conversion by fraud', touches: 'religion', justified: true, why: 'freedom OF religion includes freedom FROM coercion' }
];

export function C11_PoliticalScienceRightsSim() {
  const [active, setActive] = useState<Right>('speech');
  const [majority, setMajority] = useState(70); // % support for the claim
  const [caseIdx, setCaseIdx] = useState(0);
  const [verdicts, setVerdicts] = useState<Record<string, 'upheld' | 'struck' | 'pending'>>({});

  const c = CASES[caseIdx];
  const strength = Math.min(100, majority * 1.2);
  const rightsShield = active === c.touches ? 85 : 55; // direct hit vs glancing
  const survives = strength > rightsShield; // majority beats court only if very strong and glancing

  const current = verdicts[c.id] ?? (survives ? 'upheld' : 'struck');

  const score = useMemo(() => {
    const vals = Object.values(verdicts);
    return { done: vals.length, correct: vals.filter((v) => v === 'upheld').length };
  }, [verdicts]);

  const rule = (choice: 'upheld' | 'struck') => {
    setVerdicts((prev) => ({ ...prev, [c.id]: choice }));
    setCaseIdx((i) => (i + 1) % CASES.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700">⚖️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 11 -- Rights</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Rights Court: Can the Majority Outvote a Right?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* tug of war: majority claim vs rights shield */}
            <text x={80} y={40} fontSize={10} fill="#fbbf24">majority claim: {majority}% support</text>
            <g className="transition-all duration-500">
              <rect x={30} y={50} width={strength * 2.2} height={26} rx={6} fill="#f59e0b" opacity={0.85} />
              <text x={40} y={68} fontSize={10} fill="#451a03" fontFamily="monospace">push force {Math.round(strength)}</text>
            </g>
            <text x={380} y={130} fontSize={10} fill="#818cf8" textAnchor="middle">rights shield</text>
            <rect x={390} y={40} width={16} height={100} rx={6}
              fill={active === c.touches ? '#6366f1' : '#312e81'} stroke="#818cf8"
              className="transition-all duration-500" />
            <text x={360} y={158} fontSize={8.5} fill="#a5b4fc" textAnchor="middle">
              {RIGHTS.find((r) => r.id === active)!.label}
            </text>
            {/* result beam */}
            <rect x={30} y={90} width={Math.max(0, strength * 2.2 - 360)} height={0} />
            <g className="transition-all duration-500">
              <circle cx={Math.max(60, 60 + strength * 3.3)} cy={90} r={14}
                fill={current === 'upheld' ? '#f59e0b' : current === 'struck' ? '#10b981' : '#475569'} />
              <text x={Math.max(60, 60 + strength * 3.3)} y={122} fontSize={9} textAnchor="middle"
                fill={current === 'upheld' ? '#fbbf24' : current === 'struck' ? '#34d399' : '#94a3b8'}>
                {current === 'upheld' ? 'law stands' : current === 'struck' ? 'law struck down' : 'decide below'}
              </text>
            </g>
            {/* case card */}
            <rect x={30} y={170} width={400} height={70} rx={12} fill="#020617" stroke="#334155" />
            <text x={46} y={192} fontSize={11} fill="#e2e8f0" fontWeight="bold">Case: {c.text}</text>
            <text x={46} y={212} fontSize={9.5} fill="#94a3b8">touches: {RIGHTS.find((r) => r.id === c.touches)!.label}</text>
            <text x={46} y={230} fontSize={9.5} fill="#64748b">shield strength vs this claim: {rightsShield}</text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Claim force</p>
              <p className="font-mono font-bold text-amber-300">{Math.round(strength)}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Shield</p>
              <p className="font-mono font-bold text-indigo-300">{rightsShield}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Upheld so far</p>
              <p className="font-mono font-bold text-sky-300">{score.correct}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Which right is under review?</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {RIGHTS.map((r) => (
                  <button key={r.id} onClick={() => setActive(r.id)}
                    className={`min-h-11 rounded-xl text-[9px] font-bold ${active === r.id ? 'bg-indigo-500 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Majority support for the new law</span><span className="font-mono font-bold text-amber-400">{majority}%</span>
              </div>
              <input type="range" min={40} max={95} step={5} value={majority} aria-label="majority support"
                onChange={(e) => setMajority(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => rule('upheld')}
                className="min-h-11 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500">Uphold law</button>
              <button onClick={() => rule('struck')}
                className="min-h-11 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500">Strike it down</button>
            </div>
            <button onClick={() => { setVerdicts({}); setCaseIdx(0); setMajority(70); setActive('speech'); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Why rights beat votes</p>
            <p>
              A right is a claim held even against the majority -- because the majority of yesterday
              protects the minority of tomorrow. {RIGHTS.find((r) => r.id === active)!.label}: {RIGHTS.find((r) => r.id === active)!.basis}.
            </p>
            <p className="font-bold text-slate-300 mt-2 mb-1">Misconception killer</p>
            <p>
              &quot;Rights are absolute -- no law may ever touch them.&quot; Case c2 passes: a
              proportionate epidemic quarantine restricts movement to PROTECT life. Rights limit
              purposeless power, not all power.
            </p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl border border-indigo-800/50 p-4 text-xs">
            <p className="font-bold text-indigo-300 mb-1">What to try</p>
            <p>1. Push majority support to 95 on the book ban. It still falls -- why does size alone never justify a rights violation?</p>
            <p>2. Judge all four cases, then check yourself: which case shows a right being justifiably RESTRICTED, and by what test?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PoliticalScienceRightsSim;
