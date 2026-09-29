'use client';

import React, { useMemo, useState } from 'react';

// ─── EMI formula (standard reducing-balance): EMI = P*r*(1+r)^n / ((1+r)^n - 1) ───
export function C12_AppliedMathsEMIAnnuitySim() {
  const [principal, setPrincipal] = useState(500000);
  const [ratePct, setRatePct] = useState(9);
  const [months, setMonths] = useState(60);
  const [view, setView] = useState<'balance' | 'split'>('balance');

  const emi = useMemo(() => {
    const r = ratePct / 1200;
    if (r === 0) return principal / months;
    const k = Math.pow(1 + r, months);
    return (principal * r * k) / (k - 1);
  }, [principal, ratePct, months]);

  const totalPay = emi * months;
  const totalInterest = totalPay - principal;
  const interestShare = (totalInterest / totalPay) * 100;

  // ─── Outstanding balance month by month: B(m+1) = B(m)*(1+r) - EMI ───
  const balancePath = useMemo(() => {
    const r = ratePct / 1200;
    let bal = principal;
    const pts: string[] = [];
    for (let m = 0; m <= months; m++) {
      const x = (m / months) * 440 + 20;
      const y = 210 - (bal / principal) * 180;
      pts.push(x.toFixed(1) + ' ' + y.toFixed(1));
      bal = bal * (1 + r) - emi;
    }
    return pts.join(' L');
  }, [principal, ratePct, months, emi]);

  // Mid-loan snapshot: how much of month m's EMI is interest?
  const midMonth = Math.floor(months / 2);
  const midSplit = useMemo(() => {
    const r = ratePct / 1200;
    let bal = principal;
    for (let m = 0; m < midMonth; m++) bal = bal * (1 + r) - emi;
    return { interest: bal * r, principalPart: emi - bal * r };
  }, [principal, ratePct, emi, midMonth]);

  const inr = (v: number) => v.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  const reset = () => {
    setPrincipal(500000);
    setRatePct(9);
    setMonths(60);
    setView('balance');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 12 Applied Maths - Financial Mathematics</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">EMI and Annuity Machine</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300">Loan Lab</span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Principal P</span>
            <span className="text-gold-300 font-mono font-bold">Rs {inr(principal)}</span>
          </label>
          <input type="range" min={50000} max={5000000} step={50000} value={principal} aria-label="loan principal in rupees"
            onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Interest rate (p.a.)</span>
            <span className="text-rose-300 font-mono font-bold">{ratePct.toFixed(1)} %</span>
          </label>
          <input type="range" min={4} max={18} step={0.1} value={ratePct} aria-label="annual interest rate percent"
            onChange={(e) => setRatePct(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-rose-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Tenure n</span>
            <span className="text-emerald-300 font-mono font-bold">{months} months ({(months / 12).toFixed(1)} yr)</span>
          </label>
          <input type="range" min={6} max={240} step={6} value={months} aria-label="loan tenure in months"
            onChange={(e) => setMonths(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-emerald-500" />
        </div>
      </div>

      {/* LIVE RESULTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-gold-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Monthly EMI</p>
          <p className="text-lg font-extrabold text-gold-300 font-mono">Rs {inr(emi)}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Total paid</p>
          <p className="text-lg font-extrabold text-slate-100 font-mono">Rs {inr(totalPay)}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-rose-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Total interest</p>
          <p className="text-lg font-extrabold text-rose-300 font-mono">Rs {inr(totalInterest)}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Interest share</p>
          <p className="text-lg font-extrabold text-amber-300 font-mono">{interestShare.toFixed(1)} %</p>
        </div>
      </div>

      {/* VIEW TOGGLE + CHART */}
      <div className="flex gap-2 mb-3">
        <button onClick={() => setView('balance')} className={`min-h-11 px-4 rounded-xl text-xs font-bold border ${view === 'balance' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>Outstanding balance</button>
        <button onClick={() => setView('split')} className={`min-h-11 px-4 rounded-xl text-xs font-bold border ${view === 'split' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>EMI split at month {midMonth}</button>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 ml-auto">Reset</button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-4">
        {view === 'balance' ? (
          <svg viewBox="0 0 480 230" className="w-full h-56 md:h-60" preserveAspectRatio="xMidYMid meet">
            <line x1="20" y1="30" x2="20" y2="210" stroke="#475569" />
            <line x1="20" y1="210" x2="460" y2="210" stroke="#475569" />
            <polyline points={balancePath} fill="none" stroke="#818cf8" strokeWidth="3" />
            <text x="24" y="24" fill="#94a3b8" fontSize="10">Rs {inr(principal)} (full loan)</text>
            <text x="24" y="205" fill="#94a3b8" fontSize="10">0</text>
            <text x="440" y="225" fill="#94a3b8" fontSize="10" textAnchor="end">month {months}</text>
            <text x="230" y="225" fill="#64748b" fontSize="10" textAnchor="middle">Each EMI first pays interest, then principal -- the balance curve bends down slowly at first</text>
          </svg>
        ) : (
          <div className="space-y-3 py-2">
            <p className="text-xs text-slate-400">Your EMI of Rs {inr(emi)} in month {midMonth + 1} of {months} splits as:</p>
            <div className="flex h-10 rounded-xl overflow-hidden border border-slate-700">
              <div className="bg-emerald-500 flex items-center justify-center text-[11px] font-bold text-slate-950 transition-all"
                style={{ width: `${(midSplit.principalPart / emi) * 100}%` }}>
                principal Rs {inr(midSplit.principalPart)}
              </div>
              <div className="bg-rose-500 flex items-center justify-center text-[11px] font-bold text-slate-950 transition-all"
                style={{ width: `${(midSplit.interest / emi) * 100}%` }}>
                interest Rs {inr(midSplit.interest)}
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Compare with month 1: interest there is Rs {inr(((principal * ratePct) / 1200))} -- early EMIs are mostly interest.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-gold-300">Formula in play:</span> EMI = P·r·(1+r)<sup>n</sup> / ((1+r)<sup>n</sup> - 1),
          where r = annual rate / 12 / 100. Every number above is computed live from it -- nothing is memorised.
          <span className="font-bold text-amber-300"> Misconception killer:</span> doubling the tenure does NOT halve the EMI -- you pay far more total interest.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set P = Rs 500000, rate = 9%, tenure = 60 months and note the EMI. Then drag tenure to 120 months -- did the EMI halve? What happened to total interest?</p>
        <p className="mt-1">2. Find a rate where total interest becomes more than 50% of what you pay (try long tenures at 14%+).</p>
      </footer>
    </div>
  );
}

export default C12_AppliedMathsEMIAnnuitySim;
