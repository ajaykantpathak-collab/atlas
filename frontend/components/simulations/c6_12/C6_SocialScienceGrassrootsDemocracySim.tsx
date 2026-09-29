'use client';
/**
 * C6_SocialScienceGrassrootsDemocracySim (Class 6 Social Science)
 *
 * ELI5: The gram sabha is ALL adults of the village. The panchayat (5 elected
 * ward members) PREPARES plans, but only the gram sabha APPROVES the money.
 * This sim: pick a proposal, watch support shift as you persuade blocs,
 * check the quorum, then run the vote.
 */
import React, { useMemo, useState } from 'react';

const MEMBERS = 210;
const BUDGET = 150000;
const BLOCS = [
  { name: 'Women SHG', share: 0.35 },
  { name: 'Farmers', share: 0.3 },
  { name: 'Youth', share: 0.2 },
  { name: 'Elders', share: 0.15 },
];
interface Prop { id: string; name: string; cost: number; support: number[]; note: string }
const PROPS: Prop[] = [
  { id: 'roof', name: 'Repair school roof', cost: 60000, support: [80, 60, 70, 75], note: 'panchayat recommended' },
  { id: 'pump', name: 'New handpump', cost: 45000, support: [90, 85, 60, 70], note: 'panchayat recommended' },
  { id: 'lights', name: 'Solar street lights', cost: 80000, support: [55, 40, 85, 60], note: 'panchayat recommended' },
  { id: 'pond', name: 'Clean village pond', cost: 55000, support: [65, 75, 55, 60], note: 'new plan, not yet reviewed' },
];

export function C6_SocialScienceGrassrootsDemocracySim() {
  const [attendance, setAttendance] = useState(120);
  const [strict, setStrict] = useState(false);
  const [sel, setSel] = useState('lights');
  const [boost, setBoost] = useState<Record<string, number>>({});
  const [points, setPoints] = useState(3);
  const [result, setResult] = useState<Record<string, 'pass' | 'fail'>>({});
  const [msg, setMsg] = useState('');

  const quorum = strict ? Math.ceil(MEMBERS / 5) : Math.ceil(MEMBERS / 10);
  const valid = attendance >= quorum;
  const budgetUsed = useMemo(
    () => PROPS.reduce((s, p) => s + (result[p.id] === 'pass' ? p.cost : 0), 0),
    [result]
  );
  const p = PROPS.find((x) => x.id === sel)!;
  const pct = useMemo(
    () => p.support.map((s, i) => Math.min(100, s + (boost[p.id] || 0) * (i % 2 === 0 ? 14 : 8))),
    [p, boost]
  );
  const yes = Math.round(BLOCS.reduce((s, b, i) => s + b.share * attendance * (pct[i] / 100), 0));
  const no = attendance - yes;
  const passesNow = valid && yes > no;

  const reset = () => {
    setAttendance(120); setStrict(false); setSel('lights'); setBoost({});
    setPoints(3); setResult({}); setMsg('');
  };
  const persuade = () => {
    if (points <= 0 || result[p.id]) return;
    setBoost((b) => ({ ...b, [p.id]: (b[p.id] || 0) + 1 }));
    setPoints((n) => n - 1);
    setMsg('Campaign visit done: the weakest blocs moved toward YES. Watch the bar.');
  };
  const vote = () => {
    if (result[p.id]) return;
    if (!valid) { setMsg(`Meeting INVALID: only ${attendance} present, quorum is ${quorum}. No vote can happen.`); return; }
    if (budgetUsed + p.cost > BUDGET) { setMsg('Budget exhausted: the gram sabha has no funds left for this plan this year.'); return; }
    setResult((r) => ({ ...r, [p.id]: passesNow ? 'pass' : 'fail' }));
    setMsg(passesNow ? `${p.name} PASSES: ${yes} for, ${no} against. Panchayat gets the money.` : `${p.name} REJECTED: ${yes} for, ${no} against. The sabha overruled the plan.`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 6 Civics - Grassroots Democracy</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Gram Sabha: The Village Voting Day</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Villagers attending the sabha (of {MEMBERS})</span>
              <span className="font-mono text-gold-300">{attendance} people</span>
            </label>
            <input type="range" min={5} max={MEMBERS} value={attendance} aria-label="attendance"
              onChange={(e) => setAttendance(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-gold-500" />
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${valid ? 'bg-emerald-950 border-emerald-700 text-emerald-300' : 'bg-rose-950 border-rose-700 text-rose-300'}`}>
                {valid ? 'Quorum met' : 'Below quorum'}
              </span>
              <span className="text-xs text-slate-400">rule: quorum = <span className="font-mono">{quorum}</span> (1/{strict ? '5' : '10'} of members)</span>
              <button onClick={() => setStrict((s) => !s)} className="min-h-11 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all">
                Rule: {strict ? 'Strict 1/5' : 'Normal 1/10'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Agenda (tap a card to select)</p>
            {PROPS.map((pr) => {
              const r = result[pr.id];
              return (
                <button key={pr.id} onClick={() => setSel(pr.id)}
                  className={`w-full min-h-11 p-3 rounded-xl text-left border transition-all ${sel === pr.id ? 'border-gold-500 bg-gold-950/40' : 'border-slate-800 bg-slate-950 hover:border-slate-600'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">{pr.name}</span>
                    <span className="font-mono text-xs text-amber-300">Rs {pr.cost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-slate-500">{pr.note}</span>
                    {r && <span className={`font-bold ${r === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>{r === 'pass' ? 'PASSED' : 'REJECTED'}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-sm font-bold text-white mb-1">Live vote projection: {p.name}</p>
            <div className="h-7 rounded-full overflow-hidden bg-slate-950 border border-slate-800 flex text-xs font-bold">
              <div className="bg-emerald-600 flex items-center justify-center transition-all duration-500" style={{ width: `${(yes / attendance) * 100}%` }}>{yes} FOR</div>
              <div className="bg-rose-700 flex items-center justify-center transition-all duration-500" style={{ width: `${(no / attendance) * 100}%` }}>{no} AGAINST</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {BLOCS.map((b, i) => (
                <div key={b.name} className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex justify-between text-xs"><span className="text-slate-300">{b.name}</span><span className="font-mono text-gold-300">{Math.round(pct[i])}% yes</span></div>
                  <div className="h-1.5 mt-1 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${pct[i]}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={persuade} disabled={points <= 0 || !!result[p.id]}
                className="flex-1 min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold disabled:opacity-40 transition-all">
                Persuade weakest blocs ({points} visits left)
              </button>
              <button onClick={vote} disabled={!!result[p.id]}
                className="flex-1 min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold disabled:opacity-40 transition-all">
                Run the vote
              </button>
            </div>
            <p className="text-xs mt-2 text-slate-400">If voted now: <span className={passesNow ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{passesNow ? 'would PASS (majority yes)' : valid ? 'would FAIL (no majority)' : 'no vote possible'}</span></p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Gram sabha budget 2026</span><span className="font-mono text-amber-300">Rs {(BUDGET - budgetUsed).toLocaleString('en-IN')} left</span></div>
            <div className="h-2 mt-2 rounded-full bg-slate-800 overflow-hidden"><div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${(budgetUsed / BUDGET) * 100}%` }} /></div>
          </div>
          {msg && <div className={`p-3 rounded-2xl text-xs leading-relaxed border ${msg.includes('INVALID') || msg.includes('REJECTED') || msg.includes('exhausted') ? 'bg-rose-950/40 border-rose-800 text-rose-200' : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'}`}>{msg}</div>}
          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> the sarpanch does NOT run the village alone. The panchayat only prepares plans; the gram sabha of all adults approves the budget and can throw a plan out.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Make solar street lights pass with only 70 people attending -- which blocs did your 3 persuasion visits move, and by how many votes?</p>
        <p className="mt-1">2. Drop attendance to 15 and press Run the vote -- explain in one line why the meeting is invalid even if everyone says yes.</p>
      </footer>
    </div>
  );
}

export default C6_SocialScienceGrassrootsDemocracySim;
