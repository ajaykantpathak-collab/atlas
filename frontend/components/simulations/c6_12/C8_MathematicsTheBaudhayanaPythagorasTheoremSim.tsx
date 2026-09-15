'use client';
/**
 * C8_MathematicsTheBaudhayanaPythagorasTheoremSim (Class 8 Maths)
 *
 * ELI5: Long before Pythagoras, the Indian sage Baudhayana wrote the same
 * rule in his Sulba Sutras: in a right triangle, the square on the
 * hypotenuse equals the squares on the other two sides together.
 * c^2 = a^2 + b^2.
 */
import React, { useState } from 'react';

export function C8_MathematicsTheBaudhayanaPythagorasTheoremSim() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [showSquares, setShowSquares] = useState(true);

  const c = Math.sqrt(a * a + b * b);
  const c2 = a * a + b * b;
  const s = 115 / (a + b); // px per unit

  // Right angle at C; leg b goes up, leg a goes right.
  const C = { x: 165, y: 135 };
  const A = { x: C.x, y: C.y - b * s };
  const B = { x: C.x + a * s, y: C.y };
  // Squares on the legs (outward: b-square left, a-square below)
  const bSq = { x: C.x - b * s, y: A.y, side: b * s };
  const aSq = { x: C.x, y: C.y, side: a * s };
  // Square on hypotenuse: offset AB by the perpendicular (b*s, -a*s) -> points away from C
  const off = { x: b * s, y: -a * s };
  const D = { x: A.x + off.x, y: A.y + off.y };
  const E = { x: B.x + off.x, y: B.y + off.y };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">The Baudhayana-Pythagoras Theorem</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">A theorem with an Indian address:</span> around
          800 BCE, Baudhayana recorded in the Sulba Sutras: the rope stretched along the diagonal of
          a rectangle makes an area the vertical and horizontal sides make together. In symbols:
          a^2 + b^2 = c^2. The three squares below prove it - the two leg squares always fill the
          hypotenuse square exactly.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => { setA(3); setB(4); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-100 text-pink-700 hover:bg-pink-200 transition-all">
          Classic 3-4-5 rope stretcher
        </button>
        <button onClick={() => { setA(5); setB(12); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-100 text-pink-700 hover:bg-pink-200 transition-all">
          5-12-13
        </button>
        <button onClick={() => { setA(8); setB(15); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-100 text-pink-700 hover:bg-pink-200 transition-all">
          8-15-17
        </button>
        <button onClick={() => setShowSquares((v) => !v)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${showSquares ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
          {showSquares ? 'Squares: shown' : 'Squares: hidden'}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Leg a</span><span className="font-mono text-indigo-600">{a}</span></label>
            <input type="range" min={1} max={12} value={a} aria-label="leg a" onChange={(e) => setA(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Leg b</span><span className="font-mono text-emerald-600">{b}</span></label>
            <input type="range" min={1} max={12} value={b} aria-label="leg b" onChange={(e) => setB(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>a^2 + b^2 = {a * a} + {b * b} = <span className="text-indigo-700 font-bold">{c2}</span></div>
            <div>c = sqrt({c2}) = <span className="text-indigo-700 font-bold">{Math.round(c * 1000) / 1000}</span></div>
            <div className="mt-1 text-xs text-slate-500">
              {Number.isInteger(c) ? 'A Pythagorean triple - c is a whole number!' : 'c is not whole here, but the AREA rule still holds exactly.'}
            </div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-500 mb-1">AREA TICKET (c^2 bar = 100%)</p>
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-20">a^2 = {a * a}</span>
                <div className="h-4 flex-1 bg-slate-200 rounded overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${((a * a) / c2) * 100}%`, transition: 'width 250ms' }} /></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20">b^2 = {b * b}</span>
                <div className="h-4 flex-1 bg-slate-200 rounded overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${((b * b) / c2) * 100}%`, transition: 'width 250ms' }} /></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20">c^2 = {c2}</span>
                <div className="h-4 flex-1 bg-slate-200 rounded overflow-hidden"><div className="h-full bg-rose-500" style={{ width: '100%' }} /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 350 280" className="w-full">
            {showSquares && (
              <>
                <rect x={bSq.x} y={bSq.y} width={bSq.side} height={bSq.side} fill="#a7f3d0" stroke="#059669" opacity={0.85} style={{ transition: 'all 250ms' }} />
                <text x={bSq.x + bSq.side / 2} y={bSq.y + bSq.side / 2} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">
                  b^2 = {b * b}
                </text>
                <rect x={aSq.x} y={aSq.y} width={aSq.side} height={aSq.side} fill="#bfdbfe" stroke="#2563eb" opacity={0.85} style={{ transition: 'all 250ms' }} />
                <text x={aSq.x + aSq.side / 2} y={aSq.y + aSq.side / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a8a">
                  a^2 = {a * a}
                </text>
                <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${E.x},${E.y} ${D.x},${D.y}`} fill="#fecdd3" stroke="#e11d48" opacity={0.85} style={{ transition: 'all 250ms' }} />
                <text x={(A.x + B.x + E.x + D.x) / 4} y={(A.y + B.y + E.y + D.y) / 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239">
                  c^2 = {c2}
                </text>
              </>
            )}
            <polygon points={`${C.x},${C.y} ${A.x},${A.y} ${B.x},${B.y}`} fill="#fef3c7" stroke="#b45309" strokeWidth={2} style={{ transition: 'all 250ms' }} />
            <rect x={C.x} y={C.y - 10} width={10} height={10} fill="none" stroke="#b45309" />
            <text x={C.x - 10} y={C.y + 14} textAnchor="end" fontSize="12" fill="#334155">C</text>
            <text x={A.x - 8} y={A.y - 6} fontSize="12" fill="#334155">A</text>
            <text x={B.x + 8} y={B.y + 14} fontSize="12" fill="#334155">B</text>
            <text x={(A.x + B.x) / 2 + (b * s) / 3} y={(A.y + B.y) / 2 - (a * s) / 3} textAnchor="middle" fontSize="11" fill="#9f1239">
              c = {Math.round(c * 100) / 100}
            </text>
            <text x={C.x - 10} y={C.y - (b * s) / 2} textAnchor="end" fontSize="11" fill="#065f46">b = {b}</text>
            <text x={C.x + (a * s) / 2} y={C.y - 8} textAnchor="middle" fontSize="11" fill="#1e3a8a">a = {a}</text>
            <text x={175} y={272} textAnchor="middle" fontSize="11" fill="#475569">
              {showSquares ? 'pink area = blue + green areas, EVERY time' : 'turn the squares on to see the proof'}
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Set a = 6 and hunt for a whole-number b that makes c whole (a 6-8-10 relation hides in there).</li>
          <li>A ladder leans on a wall: foot 5 m out, top 12 m up. Find the ladder length with the sliders.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsTheBaudhayanaPythagorasTheoremSim;
