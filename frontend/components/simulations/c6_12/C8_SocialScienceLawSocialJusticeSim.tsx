'use client';
/**
 * C8_SocialScienceLawSocialJusticeSim (Class 8 Social Science)
 *
 * ELI5: Laws for safety and environment only bite when they are ENFORCED.
 * You run a chemical factory: spend on pollution control, train workers --
 * but if inspectors rarely come (low enforcement), cutting corners is always
 * cheaper. Watch profit fight health -- and find where the disaster starts.
 */
import React, { useState } from 'react';

export function C8_SocialScienceLawSocialJusticeSim() {
  const [invest, setInvest] = useState(10); // pollution-control investment 0-100
  const [enforce, setEnforce] = useState(10); // inspection strictness 0-100
  const [training, setTraining] = useState(false);
  const [union, setUnion] = useState(false); // workers can complain = pressure
  const [msg, setMsg] = useState('');

  const effEnforce = Math.min(100, enforce + (union ? 15 : 0));
  const controlCost = invest * 0.4; // Rs lakh / month
  const trainCost = training ? 8 : 0;
  const violations = Math.max(0, 90 - invest - (training ? 15 : 0)); //unsafe practices index
  const expectedFine = Math.pow(effEnforce / 100, 2) * violations * 1.5;
  const profit = 100 - 40 - controlCost - trainCost - expectedFine;
  const pollution = Math.max(0, Math.min(100, Math.round(violations * (1.2 - effEnforce / 250))));
  const health = Math.max(0, Math.round(100 - pollution * 0.9));
  const accidents = Math.max(0.1, violations / 12);
  const leakRisk = pollution > 65;

  const preset = (i: number, e: number, t: boolean) => {
    setInvest(i); setEnforce(e); setTraining(t);
    setMsg(t ? 'Preset applied: this factory follows the law even when nobody is watching.' : 'Preset applied: watch how the numbers settle when inspectors are rare.');
  };
  const reset = () => { setInvest(10); setEnforce(10); setTraining(false); setUnion(false); setMsg(''); };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 8 Civics - Law and Social Justice</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">The Factory Dilemma: Law on Paper vs Law in Practice</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Factory owner: pollution-control investment</span>
                <span className="font-mono text-indigo-300">{invest} ({controlCost.toFixed(1)} Rs lakh/month)</span>
              </label>
              <input type="range" min={0} max={100} step={5} value={invest} aria-label="pollution investment"
                onChange={(e) => setInvest(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-indigo-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Government: enforcement strictness (inspections, fines)</span>
                <span className="font-mono text-emerald-300">{enforce}/100</span>
              </label>
              <input type="range" min={0} max={100} step={5} value={enforce} aria-label="enforcement"
                onChange={(e) => setEnforce(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-emerald-500" />
            </div>
            <button onClick={() => setTraining((t) => !t)}
              className={`w-full min-h-11 rounded-xl text-xs font-bold border transition-all ${training ? 'bg-violet-600 border-violet-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-violet-500'}`}>
              Safety training for workers {training ? 'ON (+8 lakh cost, -15 unsafe practices)' : 'OFF'}
            </button>
            <button onClick={() => setUnion((u) => !u)}
              className={`w-full min-h-11 rounded-xl text-xs font-bold border transition-all ${union ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-sky-500'}`}>
              Workers&apos; union files complaints {union ? 'ON (effective enforcement +15)' : 'OFF'}
            </button>
            <div className="flex gap-2">
              <button onClick={() => preset(10, 10, false)} className="flex-1 min-h-11 rounded-xl bg-rose-950 border border-rose-800 text-rose-200 text-xs font-bold hover:bg-rose-900 transition-all">Weak-law town preset</button>
              <button onClick={() => preset(80, 70, true)} className="flex-1 min-h-11 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs font-bold hover:bg-emerald-900 transition-all">Law-bites preset</button>
            </div>
          </div>

          <div className={`p-3 rounded-2xl text-xs leading-relaxed border ${leakRisk ? 'bg-rose-950/60 border-rose-600 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
            {leakRisk
              ? 'DISASTER ZONE: with unsafe practices this high, a Bhopal-type gas leak (1984: thousands died) is a matter of time. Note the owner still shows a healthy profit -- the danger is off his balance sheet.'
              : 'Stable operations. Now try: can the owner earn almost as much profit simply by keeping enforcement LOW instead of investing in safety?'}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Owner profit</p><p className={`font-mono text-lg ${profit > 40 ? 'text-emerald-300' : 'text-amber-300'}`}>{profit.toFixed(1)} Rs lakh/mo</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Expected fine paid</p><p className="font-mono text-lg text-amber-300">{expectedFine.toFixed(1)} Rs lakh/mo</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Unsafe practices index</p><p className="font-mono text-lg text-rose-300">{Math.round(violations)}</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Worker accidents/mo</p><p className="font-mono text-lg text-rose-300">{accidents.toFixed(1)}</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">River pollution</p><p className="font-mono text-lg text-sky-300">{pollution}/100</p>
              <div className="h-1.5 mt-1 rounded-full bg-slate-950 overflow-hidden"><div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${pollution}%` }} /></div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Town health</p><p className="font-mono text-lg text-emerald-300">{health}/100</p>
              <div className="h-1.5 mt-1 rounded-full bg-slate-950 overflow-hidden"><div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${health}%` }} /></div>
            </div>
          </div>
          {msg && <p className="text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">{msg}</p>}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1 leading-relaxed">
            <p className="font-bold text-indigo-300 mb-1">The laws behind this sim</p>
            <p><span className="font-bold">Factories Act 1948:</span> safety rules, working hours, safe machinery.</p>
            <p><span className="font-bold">Water / Environment Acts (1974, 1986):</span> pollution boards can fine and close plants.</p>
            <p><span className="font-bold">Minimum Wages Act 1948:</span> a wage floor that markets alone would not guarantee.</p>
            <p><span className="font-bold">Bhopal 1984:</span> the gas disaster that showed what weak enforcement + weak liability costs -- thousands of lives.</p>
            <p className="mt-1">And the levers citizens hold: public interest litigation, consumer courts, and the free press -- the same union lever you just used.</p>
            <p className="mt-1">Chapter watch-words: workers&apos; safety, environment, minimum wages -- the three costs a market left alone tends to underprice.</p>
          </div>
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">Where each rupee goes (Rs lakh/month)</p>
            <div className="h-6 rounded-lg bg-slate-950 border border-slate-800 flex overflow-hidden text-[9px] font-bold text-slate-900">
              <div className="bg-slate-600 transition-all duration-500" style={{ width: `${40}%` }} />
              <div className="bg-indigo-500 transition-all duration-500" style={{ width: `${controlCost}%` }} />
              <div className="bg-violet-400 transition-all duration-500" style={{ width: `${trainCost}%` }} />
              <div className="bg-amber-400 transition-all duration-500" style={{ width: `${expectedFine}%` }} />
              <div className="bg-emerald-400 transition-all duration-500" style={{ width: `${Math.max(0, profit)}%` }} />
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-slate-400">
              <span>grey: inputs 40</span><span className="text-indigo-300">controls {controlCost.toFixed(0)}</span>
              <span className="text-violet-300">training {trainCost}</span><span className="text-amber-300">fines {expectedFine.toFixed(0)}</span>
              <span className="text-emerald-300">profit {Math.max(0, profit).toFixed(0)}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1 leading-relaxed">
            <p className="font-bold text-indigo-300 mb-1">Read your own town</p>
            <p>{enforce < 40 ? '- Inspectors rarely come: the owner can pocket the safety money and pollution stays high.' : '- Inspectors visit and fine: cutting corners now costs more than controlling them.'}</p>
            <p>{union ? '- The union\'s complaints raise effective enforcement: collective action is part of how laws actually work.' : '- No union: nobody reports violations, so even good inspectors miss them.'}</p>
            <p>{health < 50 ? '- Town health is failing: the hospital queue is the hidden bill for cheap production.' : '- Town health is holding: law + enforcement + voice together, not law alone.'}</p>
            <p>{leakRisk ? '- A court could now order the plant closed -- losing the owner every rupee of profit. Avoiding disaster is also good business.' : '- No closure order pending: the factory stays within legal limits.'}</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> passing a law changes nothing by itself. In the weak-law preset the same Environment Protection rules exist -- yet the factory pollutes freely, because a law without inspections and real fines is just paper.
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-slate-500 font-bold uppercase tracking-wider">Key words:</span>
        {['enforcement', 'PIL', 'minimum wage', 'liability', 'pollution board', 'worker safety'].map((k) => (
          <span key={k} className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">{k}</span>
        ))}
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set enforcement to 0 and investment to 0: read the profit. Then drag ONLY enforcement up -- at what value does cutting corners stop being profitable?</p>
        <p className="mt-1">2. Keep profit above 45 Rs lakh while pushing river pollution below 30 -- which is cheaper for the owner, control equipment or worker training?</p>
      </footer>
    </div>
  );
}

export default C8_SocialScienceLawSocialJusticeSim;
