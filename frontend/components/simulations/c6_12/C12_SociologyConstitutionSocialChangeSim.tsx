'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'The Indian Constitution is not only a rulebook for government -- it is an instrument of social change. Each ' +
  'provision targets a social structure: unequal status, unelected village power, unequal land, exclusion from ' +
  'school. Step through the timeline and watch the three dials (model of intended effects) respond.';

interface Step {
  year: string;
  name: string;
  target: string;
  anchor: string;
  delta: { eq: number; voice: number; access: number };
}

const STEPS: Step[] = [
  {
    year: '1947', name: 'Baseline: colonial society', target: 'No universal rights; franchise limited; caste and gender hierarchies in law and custom.',
    anchor: 'Only about 1 in 10 adults could vote in the last provincial elections before independence.',
    delta: { eq: 20, voice: 10, access: 20 },
  },
  {
    year: '1950', name: 'The Constitution begins work', target: 'Equality before law (Art 14), abolition of untouchability (Art 17), universal adult franchise (Art 326).',
    anchor: 'The first general election (1951-52) enrolled about 173 million voters -- among the largest electorates in the world at the time.',
    delta: { eq: 30, voice: 25, access: 10 },
  },
  {
    year: '1951', name: 'First Amendment: land reform', target: 'Shields agrarian reform laws (Ninth Schedule) so zamindari abolition can redraw rural property.',
    anchor: 'Millions of tenants gained occupancy rights as intermediary landholding was legally abolished state by state.',
    delta: { eq: 10, voice: 5, access: 20 },
  },
  {
    year: '1976', name: '42nd Amendment: the Preamble widens', target: 'Adds "socialist", "secular" and "integrity" -- naming the goals of change in the Constitution itself.',
    anchor: 'The Preamble becomes a cited reference in equality and secularism debates in courts and classrooms.',
    delta: { eq: 10, voice: 5, access: 5 },
  },
  {
    year: '1993', name: '73rd and 74th Amendments: local democracy', target: 'Panchayats and municipalities become constitutional; at least one-third of seats reserved for women.',
    anchor: 'Today roughly 1.4 million elected women representatives serve in panchayats -- about 46% of seats, above the mandated floor.',
    delta: { eq: 10, voice: 30, access: 10 },
  },
  {
    year: '2002', name: '86th Amendment: education as a right', target: 'Art 21A makes free and compulsory elementary education a fundamental right; RTE Act follows in 2009.',
    anchor: 'Elementary school enrolment moves close to universal, while retention and learning remain the live policy frontier.',
    delta: { eq: 5, voice: 5, access: 30 },
  },
];

export function C12_SociologyConstitutionSocialChangeSim() {
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState<'target' | 'outcome'>('target');

  const step = STEPS[idx];

  const dials = useMemo(() => {
    const cum = STEPS.slice(0, idx + 1).reduce(
      (a, s) => ({ eq: a.eq + s.delta.eq, voice: a.voice + s.delta.voice, access: a.access + s.delta.access }),
      { eq: 0, voice: 0, access: 0 }
    );
    return {
      eq: Math.min(100, cum.eq),
      voice: Math.min(100, cum.voice),
      access: Math.min(100, cum.access),
    };
  }, [idx]);

  const dialRows = [
    { key: 'eq', label: 'Equal status before law', value: dials.eq, color: '#fbbf24' },
    { key: 'voice', label: 'Voice: who participates', value: dials.voice, color: '#34d399' },
    { key: 'access', label: 'Access to resources', value: dials.access, color: '#38bdf8' },
  ];

  const reset = () => {
    setIdx(0);
    setMode('target');
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">The Constitution as a Change Engine</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Stepper + provision card */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Provision {idx + 1} of {STEPS.length}</div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-black text-gold-300">{step.year}</span>
            <span className="font-bold text-slate-200">{step.name}</span>
          </div>
          {mode === 'target' ? (
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-500">Targets: </span>{step.target}
            </div>
          ) : (
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-500">Evidence note: </span>{step.anchor}
            </div>
          )}
          <button onClick={() => setMode(mode === 'target' ? 'outcome' : 'target')}
            className="w-full min-h-11 mt-1 rounded-xl text-xs font-semibold border bg-slate-900 border-slate-600 hover:bg-slate-700">
            Show: {mode === 'target' ? 'social structure targeted' : 'evidence note (then and now)'}
          </button>
          {/* timeline rail */}
          <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-800">
            {STEPS.map((s, i) => (
              <button key={s.year} onClick={() => setIdx(i)} aria-label={`jump to ${s.year}`}
                className={`rounded-full text-[10px] font-mono border min-h-11 min-w-11 flex items-center justify-center ${i === idx ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:bg-slate-700'}`}>
                {s.year.slice(2)}
              </button>
            ))}
          </div>
        </div>

        {/* Dials */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-3">
          <div className="text-xs uppercase tracking-wide text-slate-400">Social-change dials (model of intended effects)</div>
          {dialRows.map((d) => (
            <div key={d.key}>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{d.label}</span>
                <span className="font-mono font-bold" style={{ color: d.color }}>{d.value}/100</span>
              </div>
              <div className="h-3 bg-slate-800 rounded mt-1">
                <div className="h-3 rounded" style={{ width: `${d.value}%`, background: d.color, transition: 'width 0.4s' }} />
              </div>
            </div>
          ))}
          <div className="text-xs text-slate-400">
            Dials accumulate every provision up to {step.year}. The dials are an illustrative model of DIRECTION, not measured national outcomes.
          </div>
          <div className="text-amber-300 text-xs pt-2 border-t border-slate-800">
            Misconception killer: &quot;a law passes, society changes overnight.&quot; Every dial here moved because provisions were carried by
            courts, movements and local elections over decades. The Constitution sets the direction; society does the walking.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 flex items-end gap-2">
          <button onClick={() => setIdx((i) => Math.max(0, i - 1))} className="flex-1 min-h-11 rounded-xl text-sm font-semibold border bg-slate-900 border-slate-600 hover:bg-slate-700">
            Back one provision
          </button>
          <button onClick={() => setIdx((i) => Math.min(STEPS.length - 1, i + 1))} className="flex-1 min-h-11 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500">
            Next provision
          </button>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Jump to a year</span>
            <span className="font-mono font-bold text-gold-300">{step.year}</span>
          </label>
          <select value={idx} onChange={(e) => setIdx(Number(e.target.value))} aria-label="jump to year"
            className="mt-2 min-h-11 w-full rounded-xl bg-slate-900 border border-slate-600 text-xs text-slate-200 px-2">
            {STEPS.map((s, i) => (
              <option key={s.year} value={i}>{s.year} -- {s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => setIdx(STEPS.length - 1)} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500">
          Fast-forward to 2002
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Step from 1947 to 1993 without looking at the dials. Which provision moves the &quot;voice&quot; dial the most, and how many women does that decision reach today?</li>
          <li>Compare the 1950 and 2002 stops. Which dial needed TWO separate provisions to finish moving -- and what does that suggest about implementation gaps?</li>
        </ol>
      </div>
    </div>
  );
}

export default C12_SociologyConstitutionSocialChangeSim;
