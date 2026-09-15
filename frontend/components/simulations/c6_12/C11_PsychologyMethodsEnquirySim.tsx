'use client';
/**
 * C11_PsychologyMethodsEnquirySim (Class 11 Psychology)
 *
 * ELI5: the method you pick decides what you are ALLOWED to conclude.
 * An experiment can say "causes" (if you randomly assign), a survey can
 * only say "is linked with", a naturalistic observation says "this is what
 * really happens". Skip consent and the whole study is invalid -- no
 * matter how beautiful the data looks.
 */

import React, { useState } from 'react';

// ─── Knowledge-graph node wiring ───
const NODE_C11_PSY_008 = 'c11_psy_008'; // Scientific Methods - Observation and Case Study
const NODE_C11_PSY_009 = 'c11_psy_009'; // Surveys and Experimentation
const NODE_C11_PSY_010 = 'c11_psy_010'; // Psychological Tests and Ethical Issues
export const ALL_NODE_IDS = [NODE_C11_PSY_008, NODE_C11_PSY_009, NODE_C11_PSY_010];

type Method = 'experiment' | 'survey' | 'observation';

const QUESTIONS = [
  { id: 'sleep', q: 'Does sleep loss CAUSE memory slips?' },
  { id: 'anxiety', q: 'How many teens feel exam anxiety?' },
  { id: 'sharing', q: 'How do kids really share toys in a park?' },
] as const;

const clamp = (v: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

export function C11_PsychologyMethodsEnquirySim() {
  const [question, setQuestion] = useState<string>('sleep');
  const [method, setMethod] = useState<Method>('survey');
  const [sample, setSample] = useState(60);
  const [randomAssign, setRandomAssign] = useState(true);
  const [leading, setLeading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [consent, setConsent] = useState(true);

  // validity model (0-100): internal = power to claim causation,
  // external = how well findings generalise, ecology = real-world realism
  let internal = 0;
  let external = 0;
  let ecological = 0;
  if (method === 'experiment') {
    internal = randomAssign ? 92 : 45;   // confounds creep in without random assignment
    external = clamp(30 + sample * 0.15);
    ecological = 35;                      // lab is artificial
  } else if (method === 'survey') {
    internal = leading ? 15 : 38;         // a survey never proves causation
    external = clamp(40 + sample * 0.3);
    ecological = 60;
  } else {
    internal = 25;
    external = clamp(25 + sample * 0.2);
    ecological = hidden ? 95 : 45;        // watched subjects act differently
  }
  if (!consent) { internal = 0; external = 0; ecological = 0; }

  const claim = !consent
    ? 'INVALID -- ethics violation: no informed consent. Data cannot be used.'
    : method === 'experiment' && randomAssign
      ? 'You MAY claim: "X causes Y" (random assignment removed the confounds).'
      : method === 'experiment'
        ? 'Weak claim: "X is linked with Y" -- without random assignment a third variable may explain it.'
        : method === 'survey'
          ? leading
            ? 'BIASED: leading questions planted the answer -- the % is unreliable.'
            : 'You MAY claim: "X% report Y" and "X is linked with Y" -- never "causes".'
          : hidden
            ? 'You MAY claim: "in natural settings, children do X" (they did not know they were watched).'
            : 'Weak claim: subjects knew they were observed -- behaviour may be an act.';

  const verdictCol = !consent ? '#f43f5e' : claim.startsWith('You MAY') ? '#34d399' : '#fbbf24';

  const reset = () => {
    setQuestion('sleep'); setMethod('survey'); setSample(60);
    setRandomAssign(true); setLeading(false); setHidden(true); setConsent(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-fuchsia-950/80 rounded-2xl border border-fuchsia-700">🔍</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Class 11 Psychology -- Methods of Enquiry</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Pick the Method, Inherit the Conclusion</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* study card */}
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3 space-y-3">
          <svg viewBox="0 0 400 210" className="w-full">
            <rect x={0} y={0} width={400} height={210} rx={10} fill="#0b1220" />
            <text x={12} y={18} fontSize={10} fill="#64748b">your study, as the evidence grid sees it</text>
            {Array.from({ length: 24 }, (_, i) => {
              const shown = i < Math.round((sample / 200) * 24);
              const x = 24 + (i % 8) * 45;
              const y = 40 + Math.floor(i / 8) * 52;
              const col = !consent ? '#475569' : shown ? (method === 'experiment' ? '#818cf8' : method === 'survey' ? '#34d399' : '#f472b6') : '#1e293b';
              return (
                <g key={i}>
                  <rect x={x} y={y} width={34} height={38} rx={6} fill={col} opacity={shown ? 0.85 : 0.5} className="transition-all duration-300" />
                  <circle cx={x + 17} cy={y + 13} r={6} fill="#0b1220" />
                  <rect x={x + 8} y={y + 24} width={18} height={9} rx={3} fill="#0b1220" />
                </g>
              );
            })}
            <text x={24} y={200} fontSize={10} fill="#94a3b8">
              {sample} participants drawn as {method === 'experiment' ? 'assignable subjects' : method === 'survey' ? 'respondents' : 'observed cases'}
            </text>
          </svg>

          {/* validity meters */}
          <div className="space-y-2">
            {[
              { label: 'Internal validity (can say "causes")', v: internal, col: '#818cf8' },
              { label: 'Generalisability (applies beyond sample)', v: external, col: '#34d399' },
              { label: 'Ecological validity (real-world realism)', v: ecological, col: '#f472b6' },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{m.label}</span>
                  <span className="font-mono font-bold" style={{ color: m.col }}>{m.v} / 100</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${m.v}%`, background: m.col }} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border p-3 text-xs leading-relaxed" style={{ borderColor: verdictCol + '55', color: verdictCol, background: verdictCol + '11' }}>
            {claim}
          </div>
        </div>

        {/* controls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Research question</p>
              <div className="space-y-1.5">
                {QUESTIONS.map((q) => (
                  <button key={q.id} onClick={() => setQuestion(q.id)}
                    className={`w-full min-h-11 rounded-xl px-2 text-[10px] font-bold leading-tight ${question === q.id ? 'bg-fuchsia-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {q.q}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Method</p>
              <div className="grid grid-cols-3 gap-2">
                {(['experiment', 'survey', 'observation'] as Method[]).map((m) => (
                  <button key={m} onClick={() => setMethod(m)}
                    className={`min-h-11 rounded-xl text-[10px] font-bold capitalize ${method === m ? 'bg-fuchsia-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Sample size</span>
                <span className="font-mono font-bold text-sky-400">{sample} people</span>
              </div>
              <input type="range" min={10} max={200} step={10} value={sample} aria-label="sample size"
                onChange={(e) => setSample(Number(e.target.value))} className="w-full min-h-11 accent-sky-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {method === 'experiment' && (
                <button onClick={() => setRandomAssign((v) => !v)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${randomAssign ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                  Random assign: {randomAssign ? 'ON' : 'OFF'}
                </button>
              )}
              {method === 'survey' && (
                <button onClick={() => setLeading((v) => !v)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${leading ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                  Leading questions: {leading ? 'ON' : 'OFF'}
                </button>
              )}
              {method === 'observation' && (
                <button onClick={() => setHidden((v) => !v)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${hidden ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                  Observer hidden: {hidden ? 'YES' : 'NO'}
                </button>
              )}
              <button onClick={() => setConsent((v) => !v)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${consent ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-slate-950'}`}>
                Consent forms: {consent ? 'SIGNED' : 'SKIPPED'}
              </button>
            </div>
            <button onClick={reset} className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;A big sample fixes a bad method.&quot; It does not. 10,000 survey replies still cannot prove causes, and a perfect
              experiment dies without consent. The method sets the ceiling; the sample only fills the room under it.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Ask &quot;Does sleep loss CAUSE memory slips?&quot; with a Survey at sample 200. Now switch to Experiment with random assignment ON. Watch which meters move.</p>
            <p>2. Run the Experiment with random assignment OFF, then flip Consent to SKIPPED. Which one kills the study completely?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PsychologyMethodsEnquirySim;
