'use client';
/**
 * C8_MathematicsComparingQuantitiesSim (Class 8 Maths)
 *
 * ELI5: Percentages let us compare anything on a 0-100 scale: a 20% discount,
 * a 15% profit, or money growing at 8% per year. Simple interest grows in a
 * straight line; compound interest snowballs because interest earns interest.
 */
import React, { useState } from 'react';

type Mode = 'discount' | 'profit' | 'interest';

export function C8_MathematicsComparingQuantitiesSim() {
  const [mode, setMode] = useState<Mode>('discount');
  const [price, setPrice] = useState(1000);
  const [discount, setDiscount] = useState(20);
  const [cp, setCp] = useState(400);
  const [sp, setSp] = useState(500);
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(3);

  const sale = Math.round(price * (1 - discount / 100));
  const saved = price - sale;
  const profit = sp - cp;
  const profitPct = cp === 0 ? 0 : Math.round((profit / cp) * 1000) / 10;
  const si = (principal * rate * years) / 100;
  const ciAmount = principal * Math.pow(1 + rate / 100, years);
  const ci = Math.round(ciAmount - principal);
  const maxI = Math.max(si, ci, 1);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Comparing Quantities - Percentage Lab</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Three power tools:</span> Discount reduces a
          marked price by a percent; profit% is profit divided by cost price times 100; and interest
          shows how money grows. Watch the bars below: simple interest climbs the same amount every
          year, compound interest climbs faster and faster.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['discount', 'Discount'], ['profit', 'Profit / Loss'], ['interest', 'SI vs CI']] as [Mode, string][]).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === m ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          {mode === 'discount' && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Marked price (Rs)</span><span className="font-mono text-indigo-600">{price}</span></label>
                <input type="range" min={100} max={5000} step={50} value={price} aria-label="marked price" onChange={(e) => setPrice(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Discount %</span><span className="font-mono text-emerald-600">{discount}%</span></label>
                <input type="range" min={0} max={60} value={discount} aria-label="discount percent" onChange={(e) => setDiscount(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
            </>
          )}
          {mode === 'profit' && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Cost price (Rs)</span><span className="font-mono text-indigo-600">{cp}</span></label>
                <input type="range" min={50} max={2000} step={10} value={cp} aria-label="cost price" onChange={(e) => setCp(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Selling price (Rs)</span><span className="font-mono text-emerald-600">{sp}</span></label>
                <input type="range" min={50} max={2000} step={10} value={sp} aria-label="selling price" onChange={(e) => setSp(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
            </>
          )}
          {mode === 'interest' && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Principal (Rs)</span><span className="font-mono text-indigo-600">{principal}</span></label>
                <input type="range" min={500} max={20000} step={500} value={principal} aria-label="principal" onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Rate % per year</span><span className="font-mono text-emerald-600">{rate}%</span></label>
                <input type="range" min={1} max={20} value={rate} aria-label="rate percent" onChange={(e) => setRate(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Time (years)</span><span className="font-mono text-amber-600">{years}</span></label>
                <input type="range" min={1} max={10} value={years} aria-label="years" onChange={(e) => setYears(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          {mode === 'discount' && (
            <>
              <div className="font-mono text-sm text-slate-600">Sale price = {price} x (1 - {discount}/100)</div>
              <div className="text-2xl font-black text-indigo-700 mt-1">Rs {sale}</div>
              <div className="text-sm text-emerald-700 font-semibold">You save Rs {saved} ({discount}% off)</div>
              <div className="mt-3 h-6 rounded-lg bg-slate-200 overflow-hidden">
                <div className="h-full bg-indigo-500 flex items-center px-2 text-white text-xs font-bold" style={{ width: `${100 - discount}%`, transition: 'width 300ms' }}>{sale}</div>
              </div>
              <div className="mt-1 h-6 rounded-lg bg-slate-200 overflow-hidden">
                <div className="h-full bg-emerald-500 flex items-center px-2 text-white text-xs font-bold" style={{ width: `${discount}%`, transition: 'width 300ms' }}>{saved}</div>
              </div>
            </>
          )}
          {mode === 'profit' && (
            <>
              <div className="font-mono text-sm text-slate-600">Profit = {sp} - {cp} = Rs {profit}</div>
              <div className="font-mono text-sm text-slate-600">Profit% = ({profit}/{cp}) x 100</div>
              <div className={`text-2xl font-black mt-1 ${profit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {profit >= 0 ? 'Profit' : 'Loss'} {Math.abs(profitPct)}%
              </div>
              <div className="mt-3 text-xs text-slate-500">CP vs SP</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-6 flex-1 rounded-lg bg-slate-200 overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${(cp / 2000) * 100}%`, transition: 'width 300ms' }} /></div>
                <span className="font-mono text-xs">{cp}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-6 flex-1 rounded-lg bg-slate-200 overflow-hidden"><div className={`h-full ${profit >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${(sp / 2000) * 100}%`, transition: 'width 300ms' }} /></div>
                <span className="font-mono text-xs">{sp}</span>
              </div>
            </>
          )}
          {mode === 'interest' && (
            <>
              <div className="font-mono text-xs text-slate-600">SI = P x R x T / 100 = {si}</div>
              <div className="font-mono text-xs text-slate-600">CI = P(1 + R/100)^T - P = {ci}</div>
              <div className="text-sm font-bold mt-2">Compound earns Rs {Math.max(0, ci - si)} MORE</div>
              <div className="mt-3 space-y-2">
                {[['SI', si, 'bg-sky-500'], ['CI', ci, 'bg-violet-500']].map(([label, v, color]) => (
                  <div key={label as string} className="flex items-center gap-2">
                    <span className="w-8 font-mono text-xs">{label as string}</span>
                    <div className="h-6 flex-1 rounded-lg bg-slate-200 overflow-hidden">
                      <div className={`h-full ${color as string}`} style={{ width: `${((v as number) / maxI) * 100}%`, transition: 'width 300ms' }} />
                    </div>
                    <span className="font-mono text-xs w-14 text-right">{v as number}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-slate-500">Same principal and rate - the gap is interest on interest.</div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find a discount where you save exactly Rs 500. Then set CP = 800 and SP = 920: what is the profit percent?</li>
          <li>At rate = 10% and T = 10, roughly how many times bigger is CI than SI? (Clue: it is near the famous doubling rule.)</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsComparingQuantitiesSim;
