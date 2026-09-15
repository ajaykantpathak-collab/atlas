'use client';

import React, { useMemo, useState } from 'react';

// ─── IDENTITY DEFINITIONS ───
type IdentityId = 'sqSum' | 'sqDiff' | 'diffSquares';

const IDENTITY_TABS: { id: IdentityId; label: string; formula: string }[] = [
  { id: 'sqSum', label: '(a + b)^2', formula: '(a + b)^2 = a^2 + 2ab + b^2' },
  { id: 'sqDiff', label: '(a - b)^2', formula: '(a - b)^2 = a^2 - 2ab + b^2' },
  { id: 'diffSquares', label: '(a + b)(a - b)', formula: '(a + b)(a - b) = a^2 - b^2' },
];

// ─── MAIN COMPONENT ───
export function C9_MathematicsExploringAlgebraicIdentitiesSim() {
  const [identity, setIdentity] = useState<IdentityId>('sqSum');
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);
  const [showLabels, setShowLabels] = useState(true);

  const bb = identity === 'diffSquares' ? Math.min(b, a - 1) : Math.min(b, a);
  const bVal = identity === 'sqDiff' ? Math.min(b, a - 1) : bb;

  // ─── REAL NUMERICS: evaluate LHS and RHS separately ───
  const check = useMemo(() => {
    if (identity === 'sqSum') {
      const lhs = (a + bVal) * (a + bVal);
      const parts = { sq: a * a, dbl: 2 * a * bVal, sq2: bVal * bVal };
      return { lhs, rhs: parts.sq + parts.dbl + parts.sq2, parts };
    }
    if (identity === 'sqDiff') {
      const lhs = (a - bVal) * (a - bVal);
      const parts = { sq: a * a, cut: 2 * bVal * (a - bVal), sq2: bVal * bVal };
      return { lhs, rhs: parts.sq - parts.cut + parts.sq2, parts };
    }
    const lhs = (a + bVal) * (a - bVal);
    const parts = { sq: a * a, sq2: bVal * bVal };
    return { lhs, rhs: parts.sq - parts.sq2, parts };
  }, [identity, a, bVal]);

  // ─── SVG GEOMETRY (area model, scaled to 240 px) ───
  const geo = useMemo(() => {
    if (identity === 'diffSquares') {
      const side = Math.round((140 / (a + bVal)) * (a - bVal));
      return { side, wide: 200, wA: side, wB: 200 - side, h: side };
    }
    const total = identity === 'sqSum' ? a + bVal : a;
    const s = 240 / total;
    const wA = Math.round(a * s);
    const wB = Math.round(bVal * s);
    const inner = Math.round((a - bVal) * s);
    return { side: 240, wA, wB, inner };
  }, [identity, a, bVal]);

  const activeTab = IDENTITY_TABS.find((t) => t.id === identity)!;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">CBSE Class 9 Mathematics - Polynomials</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Exploring Algebraic Identities with Areas</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300">Area Model Lab</span>
      </header>

      {/* IDENTITY TABS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {IDENTITY_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setIdentity(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              identity === t.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>a</span>
            <span className="text-indigo-300 font-mono font-bold">{a}</span>
          </label>
          <input type="range" min={2} max={9} value={a} aria-label="value of a"
            onChange={(e) => setA(Number(e.target.value))} className="w-full mt-2 accent-indigo-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>b</span>
            <span className="text-emerald-300 font-mono font-bold">{bVal}</span>
          </label>
          <input type="range" min={1} max={8} value={bVal} aria-label="value of b"
            onChange={(e) => setB(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
        </div>
        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`p-3 rounded-2xl text-sm font-bold border transition-all ${
            showLabels ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          {showLabels ? 'Area labels: ON' : 'Area labels: OFF'}
        </button>
      </div>

      {/* VISUALIZATION + VERIFICATION */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 360 260" className="w-full h-56 md:h-64">
            {identity === 'sqSum' && (
              <g>
                <rect x="20" y="20" width={geo.wA} height={geo.wA} fill="#4f46e5" opacity="0.85" rx="3" />
                <rect x={20 + geo.wA} y="20" width={geo.wB} height={geo.wA} fill="#0ea5e9" opacity="0.8" rx="3" />
                <rect x="20" y={20 + geo.wA} width={geo.wA} height={geo.wB} fill="#10b981" opacity="0.8" rx="3" />
                <rect x={20 + geo.wA} y={20 + geo.wA} width={geo.wB} height={geo.wB} fill="#f59e0b" opacity="0.85" rx="3" />
                {showLabels && (
                  <g fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
                    <text x={20 + geo.wA / 2} y={20 + geo.wA / 2}>a x a = {a * a}</text>
                    <text x={20 + geo.wA + geo.wB / 2} y={20 + geo.wA / 2}>ab = {a * bVal}</text>
                    <text x={20 + geo.wA / 2} y={20 + geo.wA + geo.wB / 2}>ab = {a * bVal}</text>
                    <text x={20 + geo.wA + geo.wB / 2} y={20 + geo.wA + geo.wB / 2}>b x b = {bVal * bVal}</text>
                  </g>
                )}
                <text x="140" y="255" fill="#94a3b8" fontSize="11" textAnchor="middle">
                  Square of side (a + b) = {a + bVal}, total area = {check.lhs}
                </text>
              </g>
            )}
            {identity === 'sqDiff' && (
              <g>
                <rect x="20" y="20" width={geo.inner} height={geo.inner} fill="#4f46e5" opacity="0.85" rx="3" />
                <rect x={20 + geo.inner} y="20" width={geo.wB} height={geo.inner} fill="#0ea5e9" opacity="0.8" rx="3" />
                <rect x="20" y={20 + geo.inner} width={geo.inner} height={geo.wB} fill="#10b981" opacity="0.8" rx="3" />
                <rect x={20 + geo.inner} y={20 + geo.inner} width={geo.wB} height={geo.wB} fill="#f59e0b" opacity="0.85" rx="3" />
                {showLabels && (
                  <g fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                    <text x={20 + geo.inner / 2} y={20 + geo.inner / 2}>(a-b)^2 = {check.lhs}</text>
                    <text x={20 + geo.inner + geo.wB / 2} y={20 + geo.inner / 2}>b(a-b) = {bVal * (a - bVal)}</text>
                    <text x={20 + geo.inner / 2} y={20 + geo.inner + geo.wB / 2}>b(a-b) = {bVal * (a - bVal)}</text>
                    <text x={20 + geo.inner + geo.wB / 2} y={20 + geo.inner + geo.wB / 2}>b^2 = {bVal * bVal}</text>
                  </g>
                )}
                <text x="140" y="255" fill="#94a3b8" fontSize="11" textAnchor="middle">
                  a x a = {a * a} = (a-b)^2 + 2b(a-b) + b^2
                </text>
              </g>
            )}
            {identity === 'diffSquares' && (
              <g>
                <rect x="20" y="20" width={geo.wA} height={geo.h} fill="#4f46e5" opacity="0.85" rx="3" />
                <rect x={20 + geo.wA} y="20" width={geo.wB} height={geo.h} fill="#f59e0b" opacity="0.85" rx="3" />
                <text x="130" y="120" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                  {showLabels ? `(a+b)(a-b) = ${a * a - bVal * bVal}` : ''}
                </text>
                <text x="20" y="60" fill="#c7d2fe" fontSize="11">(a-b) x a piece</text>
                <text x={26 + geo.wA} y="60" fill="#fde68a" fontSize="11">(a-b) x b piece</text>
                <text x="130" y="255" fill="#94a3b8" fontSize="11" textAnchor="middle">
                  Rectangle (a+b) x (a-b) = {a + bVal} x {a - bVal} = {check.lhs} = a^2 - b^2
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* NUMERIC VERIFICATION PANEL */}
        <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Live verification</p>
          <p className="text-sm font-mono text-amber-300">{activeTab.formula}</p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm font-mono space-y-1">
            {identity === 'sqSum' && (
              <p>
                LHS = ({a}+{bVal})^2 = <span className="text-emerald-300 font-bold">{check.lhs}</span>
                <br />
                RHS = {a * a} + 2({a})({bVal}) + {bVal * bVal} = <span className="text-emerald-300 font-bold">{check.rhs}</span>
              </p>
            )}
            {identity === 'sqDiff' && (
              <p>
                LHS = ({a}-{bVal})^2 = <span className="text-emerald-300 font-bold">{check.lhs}</span>
                <br />
                RHS = {a * a} - 2({a})({bVal}) + {bVal * bVal} = <span className="text-emerald-300 font-bold">{check.rhs}</span>
              </p>
            )}
            {identity === 'diffSquares' && (
              <p>
                LHS = ({a}+{bVal})({a}-{bVal}) = <span className="text-emerald-300 font-bold">{check.lhs}</span>
                <br />
                RHS = {a * a} - {bVal * bVal} = <span className="text-emerald-300 font-bold">{check.rhs}</span>
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl text-sm font-bold ${check.lhs === check.rhs ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-300' : 'bg-rose-950/60 border border-rose-700 text-rose-300'}`}>
            {check.lhs === check.rhs ? 'Matched: LHS = RHS for every choice of a and b.' : 'Mismatch: adjust the sliders.'}
          </div>
          <p className="text-xs text-slate-400">
            The 2ab piece is the reason (a+b)^2 is never equal to a^2 + b^2. Drag a and b and watch both sides track each other exactly.
          </p>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-indigo-300">Big idea:</span> an identity is an algebra statement that is true for every value of
          its letters. Each one here is a cut-and-rearrange story about areas: (a+b)^2 splits a big square into four tiles,
          (a-b)^2 removes two strips and adds back the overlapping corner, and (a+b)(a-b) reshapes an L-shape into a rectangle.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set a = 7 and b = 4, choose (a-b)^2, and confirm 49 = 9 + 2 x 4 x 3 + 16 before reading the numbers off the panel.</p>
        <p className="mt-1">2. Use the (a+b)(a-b) tab to compute 102 x 98 mentally (hint: a = 100, b = 2) and verify it in the panel.</p>
      </footer>
    </div>
  );
}

export default C9_MathematicsExploringAlgebraicIdentitiesSim;
