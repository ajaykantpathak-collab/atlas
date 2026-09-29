'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'A pattern can be described with letter-numbers. A matchstick square needs 4 sticks, but joining ' +
  'squares share a side, so n squares need 3n + 1 sticks. The letter-number rule lets you answer for ' +
  'ANY number of squares without building them -- that is the power of algebra!';

type Pattern = 'squares' | 'triangles' | 'ladder';

const PATTERNS: Record<Pattern, { name: string; perFirst: number; perExtra: number; rule: (n: number) => number; ruleText: (n: string) => string }> = {
  squares: {
    name: 'Row of squares',
    perFirst: 4,
    perExtra: 3,
    rule: (n) => 3 * n + 1,
    ruleText: (n) => `3 x ${n} + 1`,
  },
  triangles: {
    name: 'Row of triangles',
    perFirst: 3,
    perExtra: 2,
    rule: (n) => 2 * n + 1,
    ruleText: (n) => `2 x ${n} + 1`,
  },
  ladder: {
    name: 'Ladder with n rungs',
    perFirst: 5,
    perExtra: 3,
    rule: (n) => 3 * n + 2,
    ruleText: (n) => `3 x ${n} + 2`,
  },
};

export function C7_MathematicsExpressionsUsingLetterNumbersSim() {
  const [pattern, setPattern] = useState<Pattern>('squares');
  const [n, setN] = useState(4);
  const [showRule, setShowRule] = useState(false);

  const p = PATTERNS[pattern];
  const sticks = p.rule(n);

  // Draw the actual matchstick figure
  const figure = useMemo(() => {
    const out: React.ReactNode[] = [];
    const S = 46;
    const x0 = 30;
    const y0 = 50;
    if (pattern === 'squares') {
      for (let i = 0; i < n; i++) {
        const x = x0 + i * S;
        out.push(<line key={`v${i}`} x1={x} y1={y0} x2={x} y2={y0 + S} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
        out.push(<line key={`h${i}`} x1={x} y1={y0} x2={x + S} y2={y0} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
        out.push(<line key={`b${i}`} x1={x} y1={y0 + S} x2={x + S} y2={y0 + S} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
      }
      out.push(<line key="vend" x1={x0 + n * S} y1={y0} x2={x0 + n * S} y2={y0 + S} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
    } else if (pattern === 'triangles') {
      const h = (S * Math.sqrt(3)) / 2;
      for (let i = 0; i < n; i++) {
        const x = x0 + (i * S) / 2;
        const up = i % 2 === 0;
        if (up) {
          out.push(<polygon key={`t${i}`} points={`${x},${y0 + h} ${x + S},${y0 + h} ${x + S / 2},${y0}`} fill="none" stroke="#f59e0b" strokeWidth={4} strokeLinejoin="round" />);
        } else {
          out.push(<polygon key={`t${i}`} points={`${x},${y0} ${x + S},${y0} ${x + S / 2},${y0 + h}`} fill="none" stroke="#f59e0b" strokeWidth={4} strokeLinejoin="round" />);
        }
      }
    } else {
      // ladder: 1 rung + 2 side segments per level, plus 2 closing segments (3n + 2 sticks)
      const step = Math.min(24, 110 / n);
      const top = 40;
      for (let i = 0; i < n; i++) {
        const y = top + 10 + i * step;
        out.push(<line key={`run${i}`} x1={x0} y1={y} x2={x0 + 60} y2={y} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
        out.push(<line key={`l${i}`} x1={x0} y1={y - 10} x2={x0} y2={y + 10} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
        out.push(<line key={`r${i}`} x1={x0 + 60} y1={y - 10} x2={x0 + 60} y2={y + 10} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
      }
      const yBot = top + 10 + (n - 1) * step + 10;
      out.push(<line key="capT" x1={x0} y1={top} x2={x0 + 60} y2={top} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
      out.push(<line key="capB" x1={x0} y1={yBot} x2={x0 + 60} y2={yBot} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />);
    }
    return out;
  }, [pattern, n]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Expressions Using Letter-Numbers</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {(Object.keys(PATTERNS) as Pattern[]).map((k) => (
          <button
            key={k}
            onClick={() => setPattern(k)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${pattern === k ? 'bg-gold-600 border-gold-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {PATTERNS[k].name}
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 overflow-x-auto">
        <svg viewBox="0 0 560 190" className="w-full" style={{ minWidth: 420 }}>
          {figure}
          <text x={30} y={180} fill="#94a3b8" fontSize={13}>
            n = <tspan fill="#34d399" fontWeight="bold">{n}</tspan> -- sticks used:{' '}
            <tspan fill="#f59e0b" fontWeight="bold">{sticks}</tspan>
          </text>
        </svg>
      </div>

      {/* Rule reveal */}
      <div className="mt-4 p-4 bg-slate-800 rounded-2xl border border-slate-600">
        {showRule ? (
          <div className="font-mono text-lg text-center">
            <span className="text-slate-400">Sticks = </span>
            <span className="text-amber-300 font-bold">{p.ruleText('n')}</span>
            <span className="text-slate-400"> = </span>
            <span className="text-emerald-300 font-bold">
              {p.ruleText(String(n))} = {sticks}
            </span>
            <div className="text-xs text-slate-400 mt-2">
              The first shape takes {p.perFirst} sticks; each extra shape adds only {p.perExtra} new sticks.
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-slate-300">Can you find the rule connecting n and the stick count? Peek when ready.</p>
            <button onClick={() => setShowRule(true)} className="mt-2 px-4 py-2 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500">
              Reveal the letter-number rule
            </button>
          </div>
        )}
      </div>

      <div className="p-3 mt-4 bg-slate-800 rounded-2xl border border-slate-600">
        <label className="text-xs text-slate-300 flex justify-between">
          <span>How many shapes (n)</span>
          <span className="font-mono font-bold text-emerald-300">{n}</span>
        </label>
        <input type="range" aria-label="number of shapes n" min={1} max={12} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setShowRule((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showRule ? 'bg-amber-600 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showRule ? 'Hide' : 'Show'} rule
        </button>
        <button
          onClick={() => { setN(10); setShowRule(false); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Challenge: n = 10, guess first!
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Use the table trick: write stick counts for n = 1, 2, 3, 4. The differences are constant -- what does that tell you about the rule?</li>
          <li>For the squares pattern, which n needs exactly 100 sticks? Solve 3n + 1 = 100, then check with the slider.</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsExpressionsUsingLetterNumbersSim;
