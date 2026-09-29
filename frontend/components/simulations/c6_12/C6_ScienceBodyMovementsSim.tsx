/**
 * C6 Science -- Body Movements (Curiosity)
 *
 * One chapter concept: animals move using joints -- the shoulder is a
 * ball-and-socket joint that swings all the way around, while the elbow
 * and knee are hinge joints that bend only ONE way, and the neck is a
 * pivot joint that turns.
 *
 * Interaction model: drive a skeleton arm with shoulder and elbow
 * angle sliders (real forward-kinematics math), switch joints, and
 * press "wave hello" for automatic motion. The hinge slider physically
 * refuses to rotate backwards -- just like a real elbow.
 */
import React, { useState, useEffect } from 'react';

type Joint = 'shoulder' | 'elbow' | 'neck';

const SX = 130;
const SY = 90;
const L1 = 80; // upper arm
const L2 = 75; // forearm
const D2R = Math.PI / 180;

function C6_ScienceBodyMovementsSim() {
  const [joint, setJoint] = useState<Joint>('elbow');
  const [shoulderA, setShoulderA] = useState(20); // degrees from straight down, -180..180 (ball-and-socket)
  const [elbowA, setElbowA] = useState(60); // 0..150 only (hinge)
  const [neckA, setNeckA] = useState(0); // -70..70 (pivot)
  const [waving, setWaving] = useState(false);

  useEffect(() => {
    if (!waving) return;
    let dir = 1;
    const id = setInterval(() => {
      setElbowA((a) => {
        const next = a + dir * 8;
        if (next >= 140 || next <= 20) dir = -dir;
        return Math.max(10, Math.min(145, next));
      });
    }, 60);
    return () => clearInterval(id);
  }, [waving]);

  // forward kinematics: elbow position from shoulder angle, hand from elbow bend
  const sRad = (90 + shoulderA) * D2R;
  const ex = SX + L1 * Math.cos(sRad);
  const ey = SY + L1 * Math.sin(sRad);
  const eRad = sRad + elbowA * D2R;
  const hx = ex + L2 * Math.cos(eRad);
  const hy = ey + L2 * Math.sin(eRad);

  const clampHinge = (v: number) => {
    const next = Math.max(0, Math.min(150, v));
    if (v !== next) {
      // the hinge simply refuses -- no backwards bend, like a real elbow
      return next;
    }
    return next;
  };

  const angle = joint === 'shoulder' ? shoulderA : joint === 'elbow' ? elbowA : neckA;
  const setAngle = (v: number) => {
    if (joint === 'shoulder') setShoulderA(Math.max(-170, Math.min(170, v)));
    else if (joint === 'elbow') setElbowA(clampHinge(v));
    else setNeckA(Math.max(-70, Math.min(70, v)));
  };
  const min = joint === 'shoulder' ? -170 : joint === 'elbow' ? 0 : -70;
  const max = joint === 'shoulder' ? 170 : joint === 'elbow' ? 150 : 70;

  const jointInfo: Record<Joint, { name: string; kind: string; note: string }> = {
    shoulder: { name: 'Shoulder', kind: 'Ball-and-socket joint', note: 'Moves in almost ANY direction -- swing it all the way around!' },
    elbow: { name: 'Elbow', kind: 'Hinge joint', note: 'Bends only ONE way, like a door hinge. Try to push the slider past 150 -- it refuses!' },
    neck: { name: 'Neck', kind: 'Pivot joint', note: 'Turns left and right for saying "no" -- about 70 degrees each side.' },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-rose-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-rose-700">Body Movements -- Joints in Action</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Where two bones meet, there is a <b>joint</b>. The kind of joint decides HOW that body part can move:
        shoulders roll like a ball in a cup, elbows fold like door hinges, and the neck twists on a pivot. Move
        the sliders and watch the skeleton arm obey!
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {(['shoulder', 'elbow', 'neck'] as Joint[]).map((j) => (
          <button key={j} onClick={() => { setJoint(j); setWaving(false); }} className={'px-4 py-1.5 rounded-full text-sm font-bold transition-all ' + (joint === j ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-100 text-rose-700 hover:bg-rose-200')}>
            {jointInfo[j].name}
          </button>
        ))}
        <button onClick={() => setWaving(!waving)} className={'ml-auto px-4 py-1.5 rounded-full text-xs font-black transition-colors ' + (waving ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200')}>
          {waving ? 'Stop waving' : 'Wave hello!'}
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_230px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-rose-100 bg-rose-50/40 overflow-hidden">
          <svg viewBox="0 0 320 280" className="w-full">
            <rect width="320" height="280" fill="#fff1f2" />
            {/* simple body hint */}
            <circle cx={SX} cy={SY - 45} r="26" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <rect x={SX - 30} y={SY - 14} width="60" height="90" rx="14" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <rect x={SX - 26} y={SY + 76} width="22" height="70" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <rect x={SX + 4} y={SY + 76} width="22" height="70" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            {/* the moving arm (or head for neck) */}
            {joint === 'neck' ? (
              <g style={{ transform: 'rotate(' + neckA + 'deg)', transformOrigin: SX + 'px ' + (SY - 60) + 'px', transition: 'transform 0.15s ease-out' }}>
                <circle cx={SX} cy={SY - 45} r="26" fill="#fda4af" stroke="#e11d48" strokeWidth="2.5" />
              </g>
            ) : (
              <g style={{ transition: 'all 0.1s linear' }}>
                <line x1={SX} y1={SY} x2={ex} y2={ey} stroke="#e11d48" strokeWidth="12" strokeLinecap="round" />
                <line x1={ex} y1={ey} x2={hx} y2={hy} stroke="#fb7185" strokeWidth="10" strokeLinecap="round" />
                <circle cx={ex} cy={ey} r="8" fill="#be123c" />
                <circle cx={hx} cy={hy} r="7" fill="#be123c" />
              </g>
            )}
            <circle cx={SX} cy={SY} r="10" fill="#be123c" />
            <text x="160" y="268" textAnchor="middle" fontSize="11" fill="#9f1239" fontWeight="bold">
              {joint === 'neck' ? 'pivot joint: turning ' + neckA + '\u00B0' : jointInfo[joint].name + ': ' + Math.round(angle) + '\u00B0'}
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-500">
              <span>{jointInfo[joint].name} angle</span>
              <span className="text-rose-700 font-black">{Math.round(angle)}&deg;</span>
            </label>
            <input type="range" min={min} max={max} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-rose-600" />
            <div className="text-[10px] text-slate-400">allowed: {min}&deg; to {max}&deg; (set by the joint type!)</div>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
            <div className="text-xs font-black text-rose-800">{jointInfo[joint].kind}</div>
            <div className="text-[11px] text-rose-600 mt-1">{jointInfo[joint].note}</div>
          </div>
          <button onClick={() => { setShoulderA(20); setElbowA(60); setNeckA(0); setWaving(false); }} className="w-full px-3 py-2 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold hover:bg-slate-200 transition-colors">
            Straighten everything
          </button>
          <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
            Muscles pull on bones to make joints move -- bones never push!
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Swing the shoulder a full circle, then try the same with the elbow. Which one refuses, and what do we call that kind of joint?</li>
          <li>Press "Wave hello" and watch which joint does all the work. Now bend your own arm -- which joint are YOU using?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceBodyMovementsSim };
export default C6_ScienceBodyMovementsSim;
