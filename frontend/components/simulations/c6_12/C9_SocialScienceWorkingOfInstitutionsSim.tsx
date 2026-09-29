'use client';
/**
 * C9_SocialScienceWorkingOfInstitutionsSim (Class 9 Social Science)
 *
 * ELI5: No one person makes an Indian law. A bill must win the majority maths
 * in the Lok Sabha, survive the Rajya Sabha, get the President's assent and
 * can still face the courts. Set the seats, choose the bill type, and steer
 * it through every institution.
 */
import React, { useState } from 'react';

type BillT = 'ordinary' | 'money' | 'constitutional';
type Stage = 'start' | 'ls' | 'rs' | 'president' | 'again' | 'done';
const BILL_INFO: Record<BillT, { label: string; lsNeed: number; rsNeed: number; note: string }> = {
  ordinary: { label: 'Ordinary bill (e.g. a new labour rule)', lsNeed: 272, rsNeed: 123, note: 'simple majority in both Houses' },
  money: { label: 'Money bill (taxes, spending)', lsNeed: 272, rsNeed: 0, note: 'Rajya Sabha can only recommend, for 14 days' },
  constitutional: { label: 'Constitutional amendment', lsNeed: 362, rsNeed: 163, note: 'special majority: 2/3 of members present-and-voting floor' },
};

export function C9_SocialScienceWorkingOfInstitutionsSim() {
  const [lsSeats, setLsSeats] = useState(280);
  const [rsSeats, setRsSeats] = useState(120);
  const [bill, setBill] = useState<BillT>('ordinary');
  const [court, setCourt] = useState(false);
  const [stage, setStage] = useState<Stage>('start');
  const [returned, setReturned] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [passed, setPassed] = useState(false);

  const info = BILL_INFO[bill];
  const lsOk = lsSeats >= info.lsNeed;
  const rsOk = rsSeats >= info.rsNeed || bill === 'money';
  const reset = () => { setLsSeats(280); setRsSeats(120); setBill('ordinary'); setCourt(false); setStage('start'); setReturned(false); setVerdict(''); setPassed(false); };

  const finish = (ok: boolean, text: string) => { setStage('done'); setPassed(ok); setVerdict(text); };

  const act = () => {
    if (stage === 'start') { setStage('ls'); setVerdict('Bill introduced: ministers explain it, committees examine it. Now the House votes.'); return; }
    if (stage === 'ls') {
      if (!lsOk) { finish(false, `DEFEATED in Lok Sabha: ${lsSeats} of 543 is below the needed ${info.lsNeed}. No majority, no law.`); return; }
      setStage('rs'); setVerdict('Lok Sabha PASSES the bill. It moves to the Rajya Sabha.'); return;
    }
    if (stage === 'rs') {
      if (bill === 'money') { setStage('president'); setVerdict('Rajya Sabha returns recommendations within 14 days -- it cannot block a money bill. Lok Sabha may ignore them.'); return; }
      if (!rsOk) { finish(false, `STALLED in Rajya Sabha: ${rsSeats} of 245 is below the needed ${info.rsNeed}. The bill dies (this is why the Upper House is called a revising chamber).`); return; }
      setStage('president'); setVerdict('Rajya Sabha PASSES the bill. It goes to the President for assent.'); return;
    }
    if (stage === 'president') {
      if (bill === 'ordinary' && !returned) { setStage('again'); setVerdict('President RETURNS the bill for reconsideration (allowed once). Parliament debates again...'); return; }
      const okText = returned ? 'Parliament passed it AGAIN, so the President MUST assent. The bill becomes an Act!' : 'President ASSENTS. The bill becomes an Act of Parliament!';
      setStage('again'); setReturned(true); finish(true, okText); return;
    }
  };
  const assentNow = () => { setReturned(true); setStage('again'); finish(true, 'President ASSENTS. The bill becomes an Act of Parliament!'); };
  const courtCheck = () => {
    if (!court) { setVerdict((v) => v + ' No court challenge filed.'); return; }
    if (bill === 'constitutional') finish(false, 'JUDICIAL REVIEW: the Supreme Court strikes the amendment -- it damages the basic structure (like free elections). Parliament cannot rewrite the constitution\'s core.');
    else setVerdict((v) => v + ' Courts reviewed it and upheld the Act -- within the Constitution.');
  };
  const stageNames: { id: Stage; label: string }[] = [
    { id: 'start', label: 'Introduce' }, { id: 'ls', label: 'Lok Sabha' }, { id: 'rs', label: 'Rajya Sabha' },
    { id: 'president', label: 'President' }, { id: 'again', label: 'Assent' },
  ];
  const order: Stage[] = ['start', 'ls', 'rs', 'president', 'again'];
  const btnLabel = stage === 'start' ? 'Introduce bill in Lok Sabha' : stage === 'ls' ? 'Lok Sabha votes' : stage === 'rs' ? (bill === 'money' ? 'Rajya Sabha reviews (14 days)' : 'Rajya Sabha votes') : stage === 'president' ? (bill === 'ordinary' ? 'President: assent / return' : bill === 'money' ? 'President: money bill must be assented' : 'President: amendment must be assented') : stage === 'again' ? '' : '';

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 9 Civics - Working of Institutions</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Steer a Bill Through Every Institution</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="flex flex-wrap gap-2 mb-4">
        {stageNames.map((s, i) => {
          const idx = order.indexOf(stage);
          const active = stage === s.id;
          const past = order.indexOf(s.id) < idx;
          return (
            <div key={s.id} className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${active ? 'bg-gold-600 border-gold-400 text-white' : past ? 'bg-emerald-950 border-emerald-700 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              {i + 1}. {s.label}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-400 block">Bill type</label>
            <select value={bill} aria-label="bill type"
              onChange={(e) => { setBill(e.target.value as BillT); reset(); setBill(e.target.value as BillT); }}
              className="w-full min-h-11 p-2 rounded-xl bg-slate-950 border border-slate-700 text-sm">
              {(Object.keys(BILL_INFO) as BillT[]).map((b) => <option key={b} value={b}>{BILL_INFO[b].label}</option>)}
            </select>
            <p className="text-xs text-slate-400">{info.note}</p>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Ruling party seats, Lok Sabha (of 543)</span>
                <span className={`font-mono ${lsOk ? 'text-emerald-300' : 'text-rose-400'}`}>{lsSeats} {lsOk ? 'majority OK' : 'no majority'}</span>
              </label>
              <input type="range" min={100} max={520} value={lsSeats} aria-label="lok sabha seats"
                onChange={(e) => setLsSeats(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Government-backed seats, Rajya Sabha (of 245)</span>
                <span className={`font-mono ${rsOk ? 'text-emerald-300' : 'text-rose-400'}`}>{bill === 'money' ? 'not needed' : `${rsSeats} ${rsOk ? 'majority OK' : 'no majority'}`}</span>
              </label>
              <input type="range" min={30} max={200} value={rsSeats} aria-label="rajya sabha seats"
                onChange={(e) => setRsSeats(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            </div>
            <button onClick={() => setCourt((c) => !c)}
              className={`w-full min-h-11 rounded-xl text-xs font-bold border transition-all ${court ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-amber-500'}`}>
              Opposition files court challenge: {court ? 'YES' : 'NO'}
            </button>
            {stage !== 'done' && stage !== 'again' && (
              <div className="flex gap-2">
                <button onClick={act} className="flex-1 min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold transition-all">{btnLabel || '...'}</button>
                {stage === 'president' && bill === 'ordinary' && (
                  <button onClick={assentNow} className="flex-1 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold transition-all">President: assent now</button>
                )}
              </div>
            )}
            {stage === 'again' && (
              <button onClick={() => finish(true, 'Parliament passed it AGAIN, so the President MUST assent. The bill becomes an Act!')}
                className="w-full min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold transition-all">
                Parliament passes it again -- President must assent
              </button>
            )}
            {stage === 'done' && <button onClick={courtCheck} className="w-full min-h-11 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold transition-all">Send to the Supreme Court</button>}
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border text-sm leading-relaxed transition-all ${passed ? 'bg-emerald-950/50 border-emerald-700 text-emerald-200' : verdict.startsWith('DEFEAT') || verdict.startsWith('STALL') || verdict.startsWith('JUDICIAL') ? 'bg-rose-950/50 border-rose-700 text-rose-200' : 'bg-slate-900/70 border-slate-800 text-slate-300'}`}>
            {verdict || 'Set the seat maths, pick a bill, and press Introduce. Every institution can change the outcome.'}
          </div>
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <p><span className="font-bold text-gold-300">Needed numbers:</span> Lok Sabha majority = 272 of 543; constitutional amendment = 362 (two-thirds); Rajya Sabha majority = 123 (163 for amendments).</p>
            <p><span className="font-bold text-gold-300">Real anchors:</span> a money bill cannot be blocked by the Rajya Sabha; an ordinary bill returned by the President must be assented if passed again; courts can strike down what violates the basic structure (Kesavananda Bharati, 1973).</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> the Prime Minister does NOT make laws by decision. Even a powerful PM needs the majority arithmetic of two Houses, the President&apos;s assent and laws that survive the courts -- institutions check each other on purpose.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set Lok Sabha to 250 seats and try to pass the ordinary bill -- where exactly does it die? Now find the minimum LS seats that still work when the Rajya Sabha is hostile (60 seats).</p>
        <p className="mt-1">2. Pass a constitutional amendment with the court challenge ON -- why can a two-thirds Parliament still lose in the Supreme Court?</p>
      </footer>
    </div>
  );
}

export default C9_SocialScienceWorkingOfInstitutionsSim;
