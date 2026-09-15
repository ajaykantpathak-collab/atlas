'use client';
/**
 * C6_SocialScienceRuralAdministrationSim (Class 6 Social Science)
 *
 * ELI5: A land problem is a JOURNEY through departments. The patwari measures
 * and updates records, the tehsildar supervises and orders corrections, the
 * police thana handles threats and crime, the revenue court settles title.
 * Pick the right department at each step -- wrong picks cost weeks.
 */
import React, { useState } from 'react';

interface Stop { id: string; name: string; job: string }
const STOPS: Stop[] = [
  { id: 'patwari', name: 'Patwari', job: 'measures fields, keeps khasra land records' },
  { id: 'tehsildar', name: 'Tehsildar', job: 'revenue officer, checks patwaris, orders corrections' },
  { id: 'police', name: 'Police thana', job: 'files FIR for threats, fraud and violence' },
  { id: 'court', name: 'Revenue court', job: 'settles who owns the land if records conflict' },
];
interface CaseT { id: string; title: string; story: string; steps: string[]; why: string[] }
const CASES: CaseT[] = [
  { id: 'encroach', title: 'Field encroached', story: 'Your neighbour ploughed 0.15 ha of your 0.6 ha field (khasra 112/2) overnight.', steps: ['patwari', 'tehsildar', 'court'], why: ['The patwari measures the field and notes the change in the record.', 'The tehsildar hears the report and orders the record corrected.', 'If the neighbour still disagrees, the revenue court settles the title.'] },
  { id: 'threat', title: 'Neighbour threatens you', story: 'After you complained, the neighbour says he will take the field by force.', steps: ['police', 'patwari', 'tehsildar'], why: ['Threats are a law-and-order matter: file an FIR at the thana.', 'The patwari records the boundary so evidence is on paper.', 'The tehsildar fixes the record so the fight ends for good.'] },
  { id: 'inherit', title: 'Name missing after inheritance', story: 'Your father died; the land record still shows only his name.', steps: ['patwari', 'tehsildar', 'court'], why: ['The patwari updates the khasra record with the death and heir details.', 'The tehsildar verifies and approves the mutation of the record.', 'Only if someone contests the inheritance does the court step in.'] },
];

export function C6_SocialScienceRuralAdministrationSim() {
  const [caseId, setCaseId] = useState('encroach');
  const [step, setStep] = useState(0);
  const [days, setDays] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [showRecord, setShowRecord] = useState(true);
  const c = CASES.find((x) => x.id === caseId)!;
  const done = step >= c.steps.length;

  const reset = (id?: string) => { setCaseId(id || caseId); setStep(0); setDays(0); setLog([]); };
  const go = (stopId: string) => {
    if (done) return;
    const need = c.steps[step];
    if (stopId === need) {
      setStep((s) => s + 1);
      setDays((d) => d + 15);
      setLog((l) => [`Day ${days + 15}: ${c.why[step]}`, ...l]);
    } else {
      setDays((d) => d + 20);
      const wrong = STOPS.find((s) => s.id === stopId)!;
      setLog((l) => [`+20 days lost: ${wrong.name} does a different job (${wrong.job}).`, ...l]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 6 Civics - Rural Administration</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Land Complaint Journey: Pick the Right Office</h1>
        </div>
        <button onClick={() => reset()} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-400">Choose the complaint</label>
            <select value={caseId} aria-label="case type" onChange={(e) => reset(e.target.value)}
              className="w-full min-h-11 mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100">
              {CASES.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}
            </select>
            <p className="text-sm mt-2 text-slate-200">{c.story}</p>
            <div className="flex gap-2 mt-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold">Day {days}</span>
              <button onClick={() => setShowRecord((s) => !s)} className="min-h-11 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all">
                {showRecord ? 'Hide' : 'Show'} khasra record
              </button>
            </div>
          </div>

          {showRecord && (
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <p className="text-amber-300 font-sans font-bold">Khasra record, village Chandni</p>
              <p>Khasra no: 112/2 &nbsp; Area: 0.60 ha &nbsp; Owner: Ravi (as per record)</p>
              <p>Neighbour khasra 113/1 &nbsp; Status: boundary unmarked</p>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden mt-2">
                <div className={`h-full transition-all duration-700 ${step === c.steps.length ? 'w-full bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${(step / c.steps.length) * 100}%` }} />
              </div>
              <p className="text-slate-500">record status: {done ? 'CORRECTED - case closed' : `step ${step + 1} of ${c.steps.length}`}</p>
            </div>
          )}

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">The field as the patwari sees it</p>
            <svg viewBox="0 0 300 110" className="w-full">
              <rect x="20" y="20" width="160" height="70" fill="#14532d" stroke="#4ade80" strokeWidth="2" />
              <rect x="180" y="20" width="100" height="70" fill="#3f6212" stroke="#a3e635" strokeWidth="2" />
              <rect x="180" y="20" width="25" height="70" fill="#7f1d1d" fillOpacity="0.75" stroke="#f87171" strokeDasharray="4 3" />
              <text x="95" y="58" fontSize="10" fill="#d9f99d" textAnchor="middle">Ravi: khasra 112/2 (0.60 ha)</text>
              <text x="232" y="58" fontSize="9" fill="#fef08a" textAnchor="middle">neighbour 113/1</text>
              <text x="192" y="12" fontSize="8" fill="#f87171" textAnchor="middle">disputed 0.15 ha</text>
              <circle cx="180" cy="90" r="4" fill="#e2e8f0" />
              <text x="180" y="104" fontSize="7" fill="#94a3b8" textAnchor="middle">old stone boundary (moved?)</text>
            </svg>
            <p className="text-[11px] text-slate-400 mt-1">The patwari re-measures with the chain and records who ploughed beyond the stone. Paper first, argument later.</p>
            <p className="text-[11px] text-slate-400 mt-1">Also in this chain: the SDM (Sub-Divisional Magistrate) supervises several tehsildars, and a tehsildar can be a woman officer with the same powers.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> the police do NOT decide who owns land. Ownership is settled by land records and revenue courts; police only step in for threats or fraud.
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-sm font-bold text-white mb-2">{done ? 'Case resolved!' : 'Where do you go now?'}</p>
            <p className="text-[11px] text-slate-500 mb-2">Each department is a specialist -- a wrong door costs 20 days, so think before you click.</p>
            <div className="grid grid-cols-2 gap-2">
              {STOPS.map((s) => (
                <button key={s.id} onClick={() => go(s.id)} disabled={done}
                  className="min-h-11 p-3 text-left rounded-xl border transition-all border-slate-800 bg-slate-950 hover:border-indigo-500 hover:bg-indigo-950/30 disabled:opacity-40">
                  <div className="text-sm font-bold text-indigo-300">{s.name}</div>
                  <div className="text-[11px] text-slate-400 leading-snug">{s.job}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">Case diary</p>
            <p className="text-[11px] text-slate-500 mb-2">Real fact: most land disputes end at the tehsildar&apos;s office. The court is the last resort, not the first door.</p>
            {log.length === 0 && <p className="text-xs text-slate-500">Nothing yet -- choose your first department.</p>}
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {log.map((l, i) => (
                <p key={i} className={`text-xs leading-relaxed p-2 rounded-lg border ${l.startsWith('+') ? 'bg-rose-950/40 border-rose-800 text-rose-200' : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'}`}>{l}</p>
              ))}
            </div>
            {done && <p className="text-xs text-emerald-300 font-bold mt-2">Closed in {days} days. {days > 60 ? 'Wrong turns made it slow -- try the perfect route.' : 'Clean journey!'}</p>}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-slate-500 font-bold uppercase tracking-wider">Key words:</span>
        {['patwari', 'khasra record', 'tehsildar', 'SDM', 'FIR', 'mutation', 'revenue court'].map((k) => (
          <span key={k} className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">{k}</span>
        ))}
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Solve the encroachment case in the minimum 45 days -- which single department do people WRONGLY visit first, and why?</p>
        <p className="mt-1">2. Switch to the threat case and compare: why does the correct route start at the police thana instead of the patwari?</p>
      </footer>
    </div>
  );
}

export default C6_SocialScienceRuralAdministrationSim;
