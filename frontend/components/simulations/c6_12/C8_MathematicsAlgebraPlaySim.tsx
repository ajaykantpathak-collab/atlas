'use client';
/**
 * C8_MathematicsAlgebraPlaySim - "Algebra Play" (Class 8 Maths)
 *
 * ELI5: An equation is a balanced see-saw. Whatever you do to one side,
 * do to the other, and the see-saw stays level. Your mission: do legal moves
 * until x stands all alone on the left.
 */
import React, { useCallback, useState } from 'react';

interface Puzzle {
  x0: number; // hidden solution
  a: number; // coefficient of x on the left
  b: number; // constant on the left
  c: number; // right-hand constant
}

function newPuzzle(): Puzzle {
  const x0 = 1 + Math.floor(Math.random() * 9);
  const a = 2 + Math.floor(Math.random() * 4);
  const b = 1 + Math.floor(Math.random() * 9);
  return { x0, a, b, c: a * x0 + b };
}

const STEPS = [1, 2, 5, 10];

export function C8_MathematicsAlgebraPlaySim() {
  const [puz, setPuz] = useState<Puzzle>(() => newPuzzle());
  const [guess, setGuess] = useState(0);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [log, setLog] = useState<string[]>(['Start: ' + fmt(puz.a, puz.b) + ' = ' + puz.c]);

  function fmt(a: number, b: number) {
    const xa = a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`;
    if (b === 0) return xa;
    return `${xa} ${b > 0 ? '+' : '-'} ${Math.abs(b)}`;
  }

  const push = useCallback((a: number, b: number, c: number, what: string) => {
    setPuz({ x0: puz.x0, a, b, c });
    setMoves((m) => m + 1);
    setLog((l) => [what + ':  ' + fmt(a, b) + ' = ' + c, ...l].slice(0, 6));
    if (a === 1 && b === 0) setSolved(true);
  }, [puz.x0]);

  const applyAdd = (k: number) => {
    if (solved) return;
    push(puz.a, puz.b + k, puz.c + k, `Add ${k} to both sides`);
  };
  const applySub = (k: number) => {
    if (solved) return;
    push(puz.a, puz.b - k, puz.c - k, `Subtract ${k} from both sides`);
  };
  const applyMul = (k: number) => {
    if (solved || k === 0) return;
    push(puz.a * k, puz.b * k, puz.c * k, `Multiply both sides by ${k}`);
  };
  const applyDiv = (k: number) => {
    if (solved || puz.a % k !== 0 || puz.b % k !== 0 || puz.c % k !== 0) return;
    push(puz.a / k, puz.b / k, puz.c / k, `Divide both sides by ${k}`);
  };

  // See-saw physics: tilt proportional to lhs(guess) - rhs
  const lhsAt = puz.a * guess + puz.b;
  const diff = lhsAt - puz.c;
  const tilt = Math.max(-14, Math.min(14, diff * 2.2));
  const balanced = diff === 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Algebra Play - Balance the See-Saw</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Golden rule:</span> an equation is a balance.
          Add, subtract, multiply or divide <span className="font-semibold">both sides</span> by the
          same number and it stays balanced. Use the guess slider to test values - the see-saw tilts
          toward the heavier side. Goal: turn the equation into <span className="font-mono">x = ...</span>
        </p>
      </div>

      {/* See-saw visualization */}
      <div className="mt-4 p-4 bg-gradient-to-b from-sky-50 to-white rounded-2xl border border-slate-200">
        <svg viewBox="0 0 560 190" className="w-full">
          <polygon points="280,150 260,180 300,180" fill="#78350f" />
          <g transform={`rotate(${-tilt} 280 140)`} style={{ transition: 'transform 400ms ease' }}>
            <rect x={80} y={134} width={400} height={10} rx={5} fill="#b45309" />
            <g>
              <rect x={140} y={96} width={130} height={34} rx={8} fill="#6366f1" />
              <text x={205} y={118} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold" fontFamily="monospace">
                {fmt(puz.a, puz.b)}
              </text>
            </g>
            <g>
              <rect x={300} y={96} width={110} height={34} rx={8} fill="#10b981" />
              <text x={355} y={118} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold" fontFamily="monospace">
                {puz.c}
              </text>
            </g>
          </g>
          <circle cx={280} cy={140} r={7} fill="#451a03" />
          <text x={280} y={22} textAnchor="middle" fontSize="13" fill={balanced ? '#059669' : '#475569'} fontWeight="bold">
            {balanced ? `Balanced at guess x = ${guess}` : `Guess x = ${guess}: left = ${lhsAt}, right = ${puz.c}`}
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">DO TO BOTH SIDES (pick a step size)</p>
          <div className="flex flex-wrap gap-2">
            {STEPS.map((k) => (
              <span key={k} className="inline-flex items-center gap-1">
                <button onClick={() => applyAdd(k)} disabled={solved} className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 disabled:opacity-40 transition-all">
                  +{k}
                </button>
                <button onClick={() => applySub(k)} disabled={solved} className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-700 hover:bg-rose-200 disabled:opacity-40 transition-all">
                  -{k}
                </button>
                <button onClick={() => applyMul(k)} disabled={solved} className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 disabled:opacity-40 transition-all">
                  x{k}
                </button>
                <button onClick={() => applyDiv(k)} disabled={solved} className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-40 transition-all">
                  /{k}
                </button>
              </span>
            ))}
          </div>
          <label className="mt-4 text-xs font-semibold text-slate-500 flex justify-between">
            <span>Test guess for x</span>
            <span className="font-mono text-slate-700">{guess}</span>
          </label>
          <input type="range" min={-10} max={15} value={guess} aria-label="Guess x" onChange={(e) => setGuess(Number(e.target.value))} className="w-full mt-2 accent-sky-600" />
          <div className="mt-3 flex gap-2">
            <button onClick={() => { setPuz(newPuzzle()); setMoves(0); setSolved(false); setLog(['New puzzle started']); }} className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all">
              New puzzle
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">MOVE LOG (latest first)</p>
          <div className="font-mono text-sm space-y-1">
            {log.map((l, i) => (
              <div key={i} className={i === 0 ? 'text-indigo-700 font-bold' : 'text-slate-500'}>
                {l}
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm">
            <span className="font-semibold">Moves used: </span>
            <span className="font-mono">{moves}</span>
          </div>
          {solved && (
            <div className="mt-2 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-bold">
              Solved! x = {puz.x0} in {moves} moves. (Check: it balanced!)
            </div>
          )}
        </div>
      </div>

      {/* What to try */}
      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Solve a puzzle in exactly 2 moves (hint: subtract the constant, then divide by the coefficient).</li>
          <li>Test the see-saw with a wrong guess on purpose: which side dips, and by how much per unit of x?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsAlgebraPlaySim;
