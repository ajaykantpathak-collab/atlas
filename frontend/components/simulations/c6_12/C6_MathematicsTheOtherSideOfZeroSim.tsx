/**
 * C6 Mathematics -- The Other Side of Zero (Ganita Prakash)
 *
 * One chapter concept: negative numbers live on the other side of zero;
 * adding a positive jumps right, adding a negative jumps left, and the
 * written equation records every jump.
 *
 * Interaction model: ride a lift between floors -10 to +10 with jump
 * buttons, watch the jump trail arc across the number line, and play
 * the "reach the star floor" challenge.
 */
import React, { useState } from 'react';

const MIN = -10;
const MAX = 10;
const U = 38; // px per floor

function floorX(f: number): number {
  return 30 + (f - MIN) * U;
}

function C6_MathematicsTheOtherSideOfZeroSim() {
  const [pos, setPos] = useState(0);
  const [trail, setTrail] = useState<{ from: number; to: number }[]>([]);
  const [history, setHistory] = useState<string[]>(['0']);
  const [target, setTarget] = useState(4);
  const [celebrate, setCelebrate] = useState(false);

  const jump = (d: number) => {
    const next = Math.max(MIN, Math.min(MAX, pos + d));
    setTrail((t) => [...t.slice(-4), { from: pos, to: next }]);
    setHistory((h) => [...h.slice(-5), (d >= 0 ? ' + ' : ' - ') + Math.abs(d)]);
    setPos(next);
    if (next === target) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 1600);
    }
  };

  const reset = () => {
    setPos(0);
    setTrail([]);
    setHistory(['0']);
    setCelebrate(false);
  };

  const newTarget = () => {
    let t = target;
    while (t === target) t = Math.floor(Math.random() * 21) - 10;
    setTarget(t);
    reset();
  };

  const equation = history.join('') + ' = ' + pos;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-gold-200 shadow-xl font-sans text-slate-800">
      <style>{'@keyframes bounceUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } .cheer { animation: bounceUp 0.5s ease-in-out 2; }'}</style>
      <h2 className="text-xl md:text-2xl font-black text-gold-700">The Other Side of Zero -- the Lift Game</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Zero is the ground floor. Positive floors are <b>above</b> ground (1, 2, 3...) and negative floors are the
        <b> basement</b> (-1, -2, -3...). Pressing +3 takes the lift UP 3 floors; pressing -3 takes it DOWN into the
        basement. Watch each jump get written into the equation below!
      </p>

      <div className="rounded-2xl border-2 border-gold-100 bg-gold-50/40 overflow-hidden mt-4">
        <svg viewBox="0 0 840 240" className="w-full">
          <rect x="0" y="0" width="840" height="100" fill="#e0f2fe" />
          <rect x="0" y="128" width="840" height="112" fill="#c7d2fe" />
          <text x="12" y="20" fontSize="11" fill="#0369a1" fontWeight="bold">above ground (+)</text>
          <text x="12" y="235" fontSize="11" fill="#4338ca" fontWeight="bold">basement (-)</text>

          {Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i).map((f) => (
            <g key={'f' + f}>
              <line x1={floorX(f)} y1={f === 0 ? 110 : 120} x2={floorX(f)} y2={f === 0 ? 150 : 140} stroke={f === 0 ? '#0f172a' : '#64748b'} strokeWidth={f === 0 ? 3 : 1.5} />
              <text x={floorX(f)} y="172" textAnchor="middle" fontSize={f === 0 ? 14 : 11} fontWeight={f === 0 ? '900' : '400'} fill={f === 0 ? '#0f172a' : '#475569'}>
                {f > 0 ? '+' + f : f}
              </text>
            </g>
          ))}

          {trail.map((t, i) => (
            <path
              key={'t' + i}
              d={'M ' + floorX(t.from) + ' 115 Q ' + (floorX(t.from) + floorX(t.to)) / 2 + ' ' + (115 - 34) + ' ' + floorX(t.to) + ' 115'}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              opacity={0.25 + (i / trail.length) * 0.75}
            />
          ))}

          {target !== pos && (
            <g>
              <text x={floorX(target)} y="98" textAnchor="middle" fontSize="16">★</text>
              <circle cx={floorX(target)} cy="130" r="12" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" />
            </g>
          )}

          <g className={celebrate ? 'cheer' : ''} style={{ transform: 'translateX(' + (floorX(pos) - floorX(0)) + 'px)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <rect x={-16} y={126} width={32} height={22} rx={5} fill="#0891b2" stroke="#155e75" strokeWidth="2" />
            <text x="0" y="142" textAnchor="middle" fontSize="11" fontWeight="900" fill="#ecfeff">
              LIFT
            </text>
          </g>
        </svg>
      </div>

      <div className="grid md:grid-cols-[1fr_220px] gap-4 mt-4">
        <div className="p-3 rounded-2xl bg-slate-50 border-2 border-slate-200">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Equation so far</div>
          <div className="text-base md:text-lg font-mono font-black text-gold-800 break-words">{equation}</div>
          <div className="text-xs text-slate-500 mt-1">
            The lift is at floor <b className="text-gold-700">{pos > 0 ? '+' + pos : pos}</b>
            {pos === target ? ' -- on the star floor!' : '. Reach the star at ' + (target > 0 ? '+' + target : target) + '!'}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[3, 2, 1].map((d) => (
            <button key={'p' + d} onClick={() => jump(d)} className="px-2 py-2 rounded-xl bg-emerald-500 text-white text-sm font-black hover:bg-emerald-600 active:scale-95 transition-all">
              +{d}
            </button>
          ))}
          {[1, 2, 3].map((d) => (
            <button key={'n' + d} onClick={() => jump(-d)} className="px-2 py-2 rounded-xl bg-orange-500 text-white text-sm font-black hover:bg-orange-600 active:scale-95 transition-all">
              -{d}
            </button>
          ))}
          <button onClick={reset} className="col-span-2 px-2 py-2 rounded-xl bg-slate-200 text-slate-600 text-xs font-black hover:bg-slate-300 transition-colors">
            Back to 0
          </button>
          <button onClick={newTarget} className="px-2 py-2 rounded-xl bg-yellow-400 text-yellow-900 text-xs font-black hover:bg-yellow-500 transition-colors">
            New star
          </button>
        </div>
      </div>

      {celebrate && (
        <div className="mt-3 p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-center font-black text-emerald-700">
          You landed on the star floor! Adding and subtracting integers is just jumping left and right of zero.
        </div>
      )}

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Start at 0 and jump -4 then +7. Which floor do you reach? Write it as an equation BEFORE pressing the buttons.</li>
          <li>Can you reach -6 using exactly three jumps? Find TWO different ways and check both equations end at -6.</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_MathematicsTheOtherSideOfZeroSim };
export default C6_MathematicsTheOtherSideOfZeroSim;
