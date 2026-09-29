'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Society runs on five basic social PROCESSES: cooperation, competition, conflict, accommodation and ' +
  'assimilation. Run the SAME situation under each process and compare the outcomes. Sociologists classify them ' +
  'as associative (ties grow) or dissociative (ties strain) -- and watch how one can turn into another.';

type Process = 'cooperation' | 'competition' | 'conflict' | 'accommodation' | 'assimilation';

interface ProcessDef {
  kind: 'associative' | 'dissociative';
  att: number; // goal attainment at intensity 50
  dur: number; // tie durability at intensity 50
  attSens: number;
  durSens: number;
  how: string;
}

const PROCESSES: Record<Process, ProcessDef> = {
  cooperation: { kind: 'associative', att: 85, dur: 85, attSens: 0.3, durSens: 0.2, how: 'Groups work TOGETHER for shared goals: both dig the canal, both guard the harvest.' },
  competition: { kind: 'dissociative', att: 60, dur: 55, attSens: 0.1, durSens: -0.2, how: 'Groups strive for the SAME scarce goal INDIRECTLY, under accepted rules -- they may never even meet.' },
  conflict: { kind: 'dissociative', att: 35, dur: 30, attSens: -0.3, durSens: -0.35, how: 'Groups oppose each other DIRECTLY: one side aims to block the other, not merely to win first.' },
  accommodation: { kind: 'associative', att: 55, dur: 60, attSens: 0.15, durSens: 0.25, how: 'A working ARRANGEMENT stops open struggle: compromise, arbitration or a shared time-table -- without true unity.' },
  assimilation: { kind: 'associative', att: 80, dur: 90, attSens: 0.05, durSens: 0.35, how: 'Distinct groups slowly FUSE into one cultural unit -- shared customs, often over generations.' },
};

const SCENARIOS = [
  { label: 'Two villages, one canal', a: 'Village A', b: 'Village B' },
  { label: 'Students and 40 college seats', a: 'Morning batch', b: 'Evening batch' },
  { label: 'Migrant families arrive in a city ward', a: 'Long-settled residents', b: 'New migrant families' },
];

const ORDER: Process[] = ['cooperation', 'competition', 'conflict', 'accommodation', 'assimilation'];

export function C11_SociologySocialProcessesSim() {
  const [process, setProcess] = useState<Process>('cooperation');
  const [intensity, setIntensity] = useState(50);
  const [scenarioIdx, setScenarioIdx] = useState(0);

  const def = PROCESSES[process];
  const scenario = SCENARIOS[scenarioIdx];

  const out = useMemo(() => {
    const att = Math.round(Math.max(5, Math.min(100, def.att + (intensity - 50) * def.attSens)));
    const dur = Math.round(Math.max(5, Math.min(100, def.dur + (intensity - 50) * def.durSens)));
    return { att, dur };
  }, [def, intensity]);

  const nextInChain = process === 'conflict' ? 'accommodation' : process === 'accommodation' ? 'assimilation' : null;

  const reset = () => {
    setProcess('cooperation');
    setIntensity(50);
    setScenarioIdx(0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">The Social Process Mixer</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Group dynamics SVG */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 240" className="w-full">
            <text x={200} y={18} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#e2e8f0">
              {scenario.label}
            </text>
            <circle cx={80} cy={120} r={42} fill="#38bdf8" opacity={0.25} stroke="#38bdf8" />
            <text x={80} y={125} textAnchor="middle" fontSize={10} fill="#e2e8f0">{scenario.a}</text>
            <circle cx={320} cy={120} r={42} fill="#f472b6" opacity={0.25} stroke="#f472b6" />
            <text x={320} y={125} textAnchor="middle" fontSize={10} fill="#e2e8f0">{scenario.b}</text>
            {/* process link */}
            <line x1={124} y1={120} x2={276} y2={120}
              stroke={def.kind === 'associative' ? '#34d399' : '#f87171'}
              strokeWidth={Math.max(2, intensity / 8)}
              strokeDasharray={process === 'competition' ? '10 8' : process === 'conflict' ? '4 10' : '0'}
              style={{ transition: 'all 0.35s' }} />
            {/* intensity markers: count scales with the dial */}
            {Array.from({ length: Math.ceil(intensity / 14) }, (_, i) => {
              const x = 136 + i * ((276 - 136) / 6);
              return (
                <circle key={i} cx={x} cy={120}
                  r={3} fill={def.kind === 'associative' ? '#34d399' : '#f87171'} opacity={0.9} style={{ transition: 'fill 0.35s, opacity 0.35s' }} />
              );
            })}
            <text x={200} y={95} textAnchor="middle" fontSize={11} fontWeight="bold" fill={def.kind === 'associative' ? '#34d399' : '#f87171'} style={{ transition: 'all 0.35s' }}>
              {process.toUpperCase()} ({def.kind})
            </text>
            <text x={200} y={200} textAnchor="middle" fontSize={11} fill="#94a3b8">
              Intensity {intensity}% sets how hard the process works on both groups
            </text>
            <text x={200} y={222} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#fbbf24">
              Goal attainment {out.att}% | Tie durability {out.dur}%
            </text>
          </svg>
        </div>

        {/* Process card */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">How {process} works here</div>
          <div className="text-slate-300 text-xs leading-relaxed">{def.how}</div>
          <div className="flex justify-between text-xs text-slate-400 pt-1">
            <span>Goal attainment</span>
            <span className="font-mono text-emerald-300">{out.att}%</span>
          </div>
          <div className="h-2.5 bg-slate-800 rounded">
            <div className="h-2.5 bg-emerald-500 rounded" style={{ width: `${out.att}%`, transition: 'width 0.35s' }} />
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Durability of ties</span>
            <span className="font-mono text-gold-300">{out.dur}%</span>
          </div>
          <div className="h-2.5 bg-slate-800 rounded">
            <div className="h-2.5 bg-gold-500 rounded" style={{ width: `${out.dur}%`, transition: 'width 0.35s' }} />
          </div>
          {nextInChain && (
            <div className="text-amber-300 text-xs pt-1">
              Textbook chain: {process} often ENDS in {nextInChain}. Switch the dial and compare the two outcomes.
            </div>
          )}
          <div className="text-amber-300 text-xs pt-2 border-t border-slate-800">
            Misconception killer: &quot;competition and conflict are the same.&quot; Competition is INDIRECT and rule-bound (rivals may
            never meet); conflict is DIRECT opposition. Also, &quot;conflict is always bad&quot; is wrong -- it can clear the way for a new arrangement.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300">Select the process</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {ORDER.map((p) => (
              <button key={p} onClick={() => setProcess(p)}
                className={`min-h-11 rounded-xl text-[10px] font-semibold border capitalize ${process === p ? 'bg-gold-600 border-gold-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 flex flex-col justify-between">
          <div>
            <label className="text-xs text-slate-300 flex justify-between">
              <span>Process intensity</span>
              <span className="font-mono font-bold text-gold-300">{intensity}%</span>
            </label>
            <input type="range" aria-label="process intensity" min={5} max={100} value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
          </div>
          <select value={scenarioIdx} onChange={(e) => setScenarioIdx(Number(e.target.value))}
            aria-label="scenario" className="mt-3 min-h-11 w-full rounded-xl bg-slate-900 border border-slate-600 text-xs text-slate-200 px-2">
            {SCENARIOS.map((s, i) => (
              <option key={s.label} value={i}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => { setProcess('conflict'); setIntensity(80); }} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500">
          Stage a conflict, then walk the chain
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Set intensity 80% for competition, then for conflict. Which of the two keeps durability higher, and why do the rules of competition protect ties?</li>
          <li>Start at conflict 80%, switch to accommodation, then to assimilation. Record the three durability readings -- is the chain one-way?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_SociologySocialProcessesSim;
