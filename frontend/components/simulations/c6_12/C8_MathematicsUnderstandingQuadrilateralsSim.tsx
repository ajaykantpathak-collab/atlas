'use client';
/**
 * C8_MathematicsUnderstandingQuadrilateralsSim (Class 8 Maths)
 *
 * ELI5: The four angles of any quadrilateral ALWAYS add to 360 degrees - one
 * full turn. Fix any three angles and the fourth is forced: D = 360 - (A+B+C).
 * Generalize: an n-sided polygon has interior angle sum (n-2) x 180.
 */
import React, { useState } from 'react';

export function C8_MathematicsUnderstandingQuadrilateralsSim() {
  const [angA, setAngA] = useState(90);
  const [angB, setAngB] = useState(85);
  const [angC, setAngC] = useState(100);
  const [sides, setSides] = useState(4);
  const [score, setScore] = useState({ tries: 0, hits: 0 });

  const sum3 = angA + angB + angC;
  const valid = sum3 < 360;
  const angD = 360 - sum3;
  const kind =
    !valid
      ? 'impossible - three angles already fill the turn'
      : angD === 90 && angA === 90 && angB === 90
        ? 'rectangle-like (all right angles)'
        : angA === angC && angB === angD
          ? 'parallelogram-like (opposite angles equal)'
          : 'a valid general quadrilateral';

  // n-gon interior angle sum
  const polySum = (sides - 2) * 180;
  const eachAngle = Math.round((polySum / sides) * 10) / 10;

  // regular n-gon drawing
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < sides; i++) {
    const t = (-90 + (360 / sides) * i) * (Math.PI / 180);
    pts.push({ x: 105 + 70 * Math.cos(t), y: 100 + 70 * Math.sin(t) });
  }

  const randomize = () => {
    const a = 40 + Math.floor(Math.random() * 100);
    const bq = 40 + Math.floor(Math.random() * Math.min(100, 319 - a));
    const cq = 40 + Math.floor(Math.random() * Math.min(100, 319 - a - bq));
    setAngA(a);
    setAngB(bq);
    setAngC(cq);
  };

  const check = () => {
    setScore((s) => ({ tries: s.tries + 1, hits: valid && angD >= 30 && angD <= 150 ? s.hits + 1 : s.hits }));
  };

  // sector disc showing the four angles filling 360
  let acc = -90;
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];
  const sectors = [angA, angB, angC, angD].map((v, i) => {
    const start = (acc * Math.PI) / 180;
    acc += valid ? v : 0;
    const end = (acc * Math.PI) / 180;
    const large = v > 180 ? 1 : 0;
    return {
      i,
      v,
      color: colors[i],
      d: `M 105 100 L ${105 + 78 * Math.cos(start)} ${100 + 78 * Math.sin(start)} A 78 78 0 ${large} 1 ${105 + 78 * Math.cos(end)} ${100 + 78 * Math.sin(end)} Z`,
    };
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">Understanding Quadrilaterals: The 360 Degree Budget</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">Angle budget:</span> think of 360 degrees as a
          fixed budget of turn that the four corners of a quadrilateral must share. Spend more on
          angle A and less is left for angle D. The pie on the right is that budget - when the three
          sliders spend it all, no fourth corner can exist!
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          {([['Angle A', angA, setAngA, '#6366f1'], ['Angle B', angB, setAngB, '#10b981'], ['Angle C', angC, setAngC, '#f59e0b']] as [string, number, (v: number) => void, string][]).map(([label, val, setter, color]) => (
            <div key={label}>
              <label className="text-xs font-semibold text-slate-500 flex justify-between">
                <span>
                  {label} <span className="inline-block w-2.5 h-2.5 rounded-full align-middle ml-1" style={{ background: color }} />
                </span>
                <span className="font-mono" style={{ color }}>{val} deg</span>
              </label>
              <input type="range" min={20} max={200} value={val} aria-label={label} onChange={(e) => setter(Number(e.target.value))} className="w-full mt-1" />
            </div>
          ))}
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>A + B + C = {sum3} deg</div>
            <div className={valid ? 'text-gold-700 font-bold' : 'text-rose-600 font-bold'}>
              D = 360 - {sum3} = {valid ? `${angD} deg` : 'impossible!'}
            </div>
            <div className="mt-1 text-xs text-slate-500 font-sans">{kind}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={randomize} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gold-100 text-gold-700 hover:bg-gold-200 transition-all">
              Random puzzle
            </button>
            <button onClick={check} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all">
              Score this quadrilateral
            </button>
            <span className="text-xs text-slate-500 self-center font-mono">
              {score.hits}/{score.tries} in range 30-150
            </span>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-gold-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 210 210" className="w-full">
            {sectors.map((s) => (
              <path key={s.i} d={s.d} fill={s.color} opacity={s.i === 3 ? (valid ? 0.9 : 0.25) : 0.9} style={{ transition: 'all 250ms' }} />
            ))}
            <circle cx={105} cy={100} r={6} fill="#fff" stroke="#94a3b8" />
            {!valid && (
              <text x={105} y={40} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e11d48">
                budget overspent!
              </text>
            )}
            <text x={105} y={200} textAnchor="middle" fontSize="10" fill="#475569">four angles = one full turn (pink = forced angle D)</text>
          </svg>
          <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-500 mb-1">GENERALIZATION: SIDES SLIDER</p>
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>Polygon sides n</span>
              <span className="font-mono text-gold-600">{sides}</span>
            </label>
            <input type="range" min={3} max={10} value={sides} aria-label="sides" onChange={(e) => setSides(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
            <svg viewBox="0 0 210 140" className="w-full mt-1">
              <polygon points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="#c7d2fe" stroke="#4338ca" strokeWidth={2} style={{ transition: 'all 250ms' }} />
              <text x={105} y={132} textAnchor="middle" fontSize="10" fill="#475569">
                sum = ({sides}-2) x 180 = {polySum} deg, each = {eachAngle}
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Make a quadrilateral with three equal angles. How big must the fourth be? What shape family is that?</li>
          <li>Push A+B+C past 360 and read the warning. Then find the LARGEST possible angle C when A = B = 80.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsUnderstandingQuadrilateralsSim;
