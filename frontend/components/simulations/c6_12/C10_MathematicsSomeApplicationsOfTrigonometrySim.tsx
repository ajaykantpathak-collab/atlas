'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Maths -- Some Applications of Trigonometry
 * Heights and distances: an observer, a tower and an angle of elevation.
 * Solve for height or for distance; also a two-angle (moving observer) case.
 * Self-contained: react + tailwind only.
 */

// ─── Class 10 board-depth drill bank ───
// Targets uncovered board diagnostics for this chapter's nodes
// (see backend/its/competency/CLASS10_NODE_DEPTH.json). Static and deterministic.
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_math_cbse_09_001',
    q: 'A student stands 20 m from a building and measures the angle to a window FROM THE VERTICAL instead of from the horizontal. What must she do with her answer?',
    options: [
      'The angle of elevation is measured from the HORIZONTAL line (the level line through the eye), not the vertical -- she must use 90 deg minus her angle before applying tan',
      'The vertical reading is standard and needs no change',
      'She should multiply the angle by 2',
      'Distance does not matter for the angle',
    ],
    answer: 0,
    why: 'Definition check: the angle of elevation sits between the horizontal line through the observer\'s eye and the line of sight (looking UP); the angle of depression sits between the horizontal and the line of sight looking DOWN. Angle from vertical = 90 - angle of elevation.',
  },
  {
    nodeId: 'c10_math_cbse_09_001',
    q: 'From a cliff top, the angle of depression of a boat is 30 deg. What is the angle of elevation of the cliff top from the boat?',
    options: [
      '30 deg -- depression at the top and elevation at the bottom are alternate interior angles between two parallel horizontals',
      '60 deg',
      '90 deg',
      'It depends on the cliff height',
    ],
    answer: 0,
    why: 'The horizontal through the cliff top is parallel to the sea-level horizontal through the boat. The line of sight is a transversal, so the angles are EQUAL (alternate angles). This single fact halves most two-observer problems.',
  },
  {
    nodeId: 'c10_math_cbse_09_002',
    q: 'Looking at a lamp post top from 20 m away, which line is the "horizontal" in the diagram?',
    options: [
      'The level line through the OBSERVER\'S EYE -- the elevation angle is drawn between that line and the upward line of sight',
      'The ground line under the lamp post',
      'The lamp post itself',
      'Any line drawn vertically upward',
    ],
    answer: 0,
    why: 'The horizontal always passes through the point of observation (the eye), and the right triangle has legs = horizontal distance and (lamp height MINUS eye height if the observer is tall). Forgetting to subtract eye/observer height is the classic lost mark.',
  },
  {
    nodeId: 'c10_math_cbse_09_003',
    q: 'From the top of a 20 m lighthouse, the angle of depression of a ship is 30 deg. Distance of the ship from the foot of the lighthouse?',
    options: [
      '20 x square root of 3, about 34.6 m -- because tan 30 deg = 20 / d',
      '20 / square root of 3, about 11.5 m',
      '20 x tan 30 deg, about 11.5 m',
      '40 m',
    ],
    answer: 0,
    why: 'Angle of depression 30 deg at the top equals angle of elevation 30 deg at the ship. tan 30 = opposite/adjacent = 20/d, so d = 20/tan 30 = 20 x square root of 3 = 34.64 m. Label the diagram: horizontal through the top, line of sight, right angle at the tower base.',
  },
  {
    nodeId: 'c10_math_cbse_09_004',
    q: 'A ladder leans against a wall at 60 deg with the ground; its foot is 4 m from the wall. Length of the ladder?',
    options: [
      '8 m -- cos 60 deg = adjacent/hypotenuse = 4/L, so L = 4 / cos 60 = 4 / 0.5 = 8',
      '4 x sin 60 = 3.46 m',
      '4 x tan 60 = 6.93 m',
      '4 x square root of 3 = 6.93 m',
    ],
    answer: 0,
    why: 'The LADDER is the hypotenuse. Ground distance is adjacent to the 60 deg angle, so use cosine: cos 60 = 4/L. Choosing sin (opposite) or tan is the error -- first identify which sides you have and which you want, then pick the ratio.',
  },
  {
    nodeId: 'c10_math_cbse_09_005',
    q: 'With the horizontal distance fixed, if the angle of elevation INCREASES, the height you compute...',
    options: [
      'Increases -- h = d x tan(angle) and tan is increasing from 0 deg to 90 deg (tan 30 = 0.577, tan 45 = 1, tan 60 = 1.732)',
      'Decreases',
      'Stays the same',
      'First increases then decreases',
    ],
    answer: 0,
    why: 'Steeper look-up means a taller object for the same footing. Verify in the sim: keep d fixed, sweep the elevation slider, watch h climb. The converse (walking closer, angle rises) is the two-angle trick.',
  },
  {
    nodeId: 'c10_math_cbse_09_006',
    q: 'Cliff 50 m above the sea, angle of depression of a boat 45 deg. Which ratio gives the boat distance, and what is it?',
    options: [
      'tan 45 deg = 50 / x, so x = 50 m -- depression at the top converts to elevation of 45 deg at the boat',
      'sin 45 deg = 50 / x, so x = 70.7 m',
      'cos 45 deg = 50 / x, so x = 70.7 m',
      'tan 45 deg = x / 50, so x = 50 m by accident but wrong reasoning',
    ],
    answer: 0,
    why: 'The boat distance is the side ADJACENT to the 45 deg elevation angle, while 50 m is opposite -- so tangent, not sine/cosine. Design check: a problem with answer exactly 50 x square root of 3 m needs a 30 deg angle with a 50 m height (d = h x square root of 3).',
  },
  {
    nodeId: 'c10_math_cbse_09_007',
    q: 'A solved example writes tan 30 deg = h/d and tan 60 deg = h/(d - 20), then equates h = d/square root of 3 with h = (d-20) x square root of 3. What set-up produces two equations?',
    options: [
      'Walking TOWARD the tower by 20 m: the same height h is observed from two distances, far point d (angle 30) and near point d - 20 (angle 60)',
      'The tower grew 20 m between measurements',
      'Two towers 20 m apart were measured',
      'The observer\'s eye height changed by 20 m',
    ],
    answer: 0,
    why: 'One height, two observation points -> two equations in h and d. Eliminating h: d/square root of 3 = (d-20) x square root of 3 gives d = 30, h = 10 x square root of 3 = 17.32 m. Same skeleton as the "7 m and 3 m pedestal" or broken-tree problems: draw BOTH triangles before writing any equation.',
  },
  {
    nodeId: 'c10_math_cbse_09_008',
    q: 'A 1.5 m tall boy stands 20 m from a tower; angle of elevation from his EYES is 60 deg. Tower height?',
    options: [
      '20 x square root of 3 + 1.5 = about 36.1 m -- add the boy\'s height to the triangle height above eye level',
      '20 x square root of 3 = 34.6 m only',
      '34.6 - 1.5 = 33.1 m',
      '1.5 x tan 60 = 2.6 m',
    ],
    answer: 0,
    why: 'The right triangle starts at the boy\'s EYE level, so its base-top gives only the tower height ABOVE the eyes. Two students disagreeing usually differ exactly on this +/- observer-height step: the elevation triangle sits on top of the eye line, then the boy\'s 1.5 m is added at the end.',
  },
  {
    nodeId: 'c10_math_cbse_09_009',
    q: 'Cliff 50 m high, angle of depression of a boat 45 deg. A student writes tan 45 = 50/x and solves x = 50. The method is fine; what geometry must the diagram show to justify it?',
    options: [
      'A horizontal line through the cliff top, the line of sight to the boat, and the equal 45 deg angle of elevation marked at the boat (alternate angles between parallel horizontals)',
      'A vertical line from the boat to the cliff top',
      'No construction is needed -- the answer is definitional',
      'The angle must be drawn at the boat as 45 deg below the vertical',
    ],
    answer: 0,
    why: 'Board answers are graded on the labelled diagram: mark the horizontal through the observation point, drop the perpendicular (cliff height), and transfer the depression angle to the boat as an elevation angle. From a 45 m lighthouse with 30 deg depression the ship is 45 x square root of 3 = 77.9 m away -- same skeleton, new numbers.',
  },
];

function DepthDrill() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, done: 0 });
  const item = DEPTH_QUIZ[idx];
  const answered = picked !== null;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setScore((s) => ({ right: s.right + (i === item.answer ? 1 : 0), done: s.done + 1 }));
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-orange-800/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-400">Board-depth drill</p>
        <span className="text-[11px] font-mono text-slate-400">
          {idx + 1}/{DEPTH_QUIZ.length} -- {score.right}/{score.done} correct
        </span>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed">{item.q}</p>
      <div className="space-y-1.5">
        {item.options.map((opt, i) => {
          const state = !answered
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-700'
            : i === item.answer
              ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
              : i === picked
                ? 'bg-rose-900/60 border-rose-600 text-rose-100'
                : 'bg-slate-800/40 border-slate-800 opacity-60';
          return (
            <button key={i} onClick={() => pick(i)} disabled={answered}
              className={`w-full text-left px-3 py-2 rounded-xl border text-xs leading-snug transition ${state}`}>
              <span className="font-bold mr-1.5">{'ABCD'[i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="text-xs leading-relaxed text-amber-200 bg-amber-950/40 border border-amber-800/50 rounded-xl px-3 py-2">
          <span className="font-bold">Misconception killed: </span>
          {item.why}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={() => { setIdx((i) => (i + 1) % DEPTH_QUIZ.length); setPicked(null); }}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 transition">
          Next question
        </button>
        <button onClick={() => { setIdx(0); setPicked(null); setScore({ right: 0, done: 0 }); }}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
          Reset
        </button>
      </div>
    </div>
  );
}

export function C10_MathematicsSomeApplicationsOfTrigonometrySim() {
  const [mode, setMode] = useState<'findHeight' | 'findDistance' | 'twoAngles'>('findHeight');
  const [distance, setDistance] = useState(40);
  const [height, setHeight] = useState(30);
  const [angle, setAngle] = useState(35);
  const [angle2, setAngle2] = useState(55);

  const rad = (deg: number) => (deg * Math.PI) / 180;

  // Scenario geometry (metres)
  const towerH = mode === 'findHeight' ? distance * Math.tan(rad(angle)) : height;
  const groundD = mode === 'findDistance' ? height / Math.tan(rad(angle)) : distance;
  // two-angle: observer walks from far point (angle) to near point (angle2); near distance = h / tan(a2)
  const nearD = mode === 'twoAngles' ? height / Math.tan(rad(angle2)) : 0;
  const farD = mode === 'twoAngles' ? height / Math.tan(rad(angle)) : 0;
  const walked = mode === 'twoAngles' ? farD - nearD : 0;

  // SVG scene mapping: 1 m = 2.2 px horizontally, tower fits 260 px vertically
  const scale = Math.min(220 / Math.max(towerH, 1), 260 / Math.max(groundD, 1));
  const oX = 60;
  const oY = 330;
  const tX = oX + groundD * scale;
  const tY = oY - towerH * scale;
  const nearX = mode === 'twoAngles' ? oX + walked * scale : 0;

  const answer = useMemo(() => {
    if (mode === 'findHeight') return `${towerH.toFixed(2)} m`;
    if (mode === 'findDistance') return `${groundD.toFixed(2)} m`;
    return `${nearD.toFixed(2)} m (near), ${farD.toFixed(2)} m (far), walked ${walked.toFixed(2)} m`;
  }, [mode, towerH, groundD, nearD, farD, walked]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-amber-950/80 rounded-2xl border border-amber-700">🗼</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 10 -- Applications of Trigonometry</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Heights and Distances Surveyor</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 360" className="w-full">
            {/* sky gradient */}
            <rect x={0} y={0} width={460} height={336} fill="rgba(56,189,248,0.05)" />
            {/* ground */}
            <rect x={0} y={336} width={460} height={24} fill="#14532d" opacity={0.7} />
            <line x1={0} y1={336} x2={460} y2={336} stroke="#4ade80" strokeWidth={2} />
            {/* tower */}
            <rect x={tX - 14} y={tY} width={28} height={336 - tY} fill="#f59e0b" stroke="#b45309" strokeWidth={2} rx={2} />
            <circle cx={tX} cy={tY - 6} r={6} fill="#fde68a" />
            {/* line of sight */}
            <line x1={oX} y1={oY} x2={tX} y2={tY} stroke="#38bdf8" strokeWidth={2} strokeDasharray="6 4" />
            {/* elevation angle arc */}
            <path d={`M ${oX + 44},${oY} A 44 44 0 0 0 ${oX + 44 * Math.cos(rad(angle))},${oY - 44 * Math.sin(rad(angle))}`}
              fill="none" stroke="#fbbf24" strokeWidth={2} />
            <text x={oX + 52} y={oY - 12} fill="#fbbf24" fontSize={12} fontWeight="bold">
              {angle} deg
            </text>
            {/* height guide */}
            <line x1={tX + 16} y1={tY} x2={tX + 16} y2={oY} stroke="#94a3b8" strokeWidth={1} strokeDasharray="3 3" />
            <text x={tX + 22} y={(tY + oY) / 2} fill="#cbd5e1" fontSize={11} fontFamily="monospace">
              h = {towerH.toFixed(1)} m
            </text>
            <text x={(oX + tX) / 2} y={oY + 16} fill="#6ee7b7" fontSize={11} fontFamily="monospace" textAnchor="middle">
              d = {groundD.toFixed(1)} m
            </text>
            {/* second observer position (two-angle mode) */}
            {mode === 'twoAngles' && (
              <g>
                <circle cx={nearX} cy={oY} r={6} fill="#f472b6" />
                <line x1={nearX} y1={oY} x2={tX} y2={tY} stroke="#f472b6" strokeWidth={2} strokeDasharray="6 4" />
                <path d={`M ${nearX + 36},${oY} A 36 36 0 0 0 ${nearX + 36 * Math.cos(rad(angle2))},${oY - 36 * Math.sin(rad(angle2))}`}
                  fill="none" stroke="#f472b6" strokeWidth={2} />
                <text x={nearX + 44} y={oY - 10} fill="#f472b6" fontSize={11} fontWeight="bold">{angle2} deg</text>
                <line x1={nearX} y1={326} x2={nearX} y2={346} stroke="#f472b6" strokeWidth={2} />
              </g>
            )}
            {/* observer */}
            <circle cx={oX} cy={oY - 14} r={7} fill="#38bdf8" />
            <rect x={oX - 6} y={oY - 7} width={12} height={14} rx={4} fill="#38bdf8" />
          </svg>
          <div className="text-center text-xs font-mono text-slate-400 mt-1">
            tan(angle) = h / d &nbsp;&nbsp;=&gt;&nbsp;&nbsp; h = d x tan(angle)
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setMode('findHeight')}
                className={`py-2 rounded-xl text-[10px] font-bold ${mode === 'findHeight' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Find height
              </button>
              <button onClick={() => setMode('findDistance')}
                className={`py-2 rounded-xl text-[10px] font-bold ${mode === 'findDistance' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Find distance
              </button>
              <button onClick={() => setMode('twoAngles')}
                className={`py-2 rounded-xl text-[10px] font-bold ${mode === 'twoAngles' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Two angles
              </button>
            </div>
            {(mode === 'findHeight' || mode === 'twoAngles' || mode === 'findDistance') && (
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{mode === 'findHeight' ? 'Distance from tower (d)' : mode === 'findDistance' ? 'Known height (h)' : 'Tower height (h)'}</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {mode === 'findHeight' ? distance : height} m
                  </span>
                </div>
                <input type="range" min={5} max={100} value={mode === 'findHeight' ? distance : height}
                  aria-label="distance or height"
                  onChange={(e) => (mode === 'findHeight' ? setDistance(Number(e.target.value)) : setHeight(Number(e.target.value)))}
                  className="w-full accent-emerald-500" />
              </div>
            )}
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Angle of elevation (far point)</span>
                <span className="font-mono font-bold text-amber-400">{angle} deg</span>
              </div>
              <input type="range" min={10} max={80} value={angle} aria-label="angle of elevation"
                onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
            {mode === 'twoAngles' && (
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Angle at near point</span>
                  <span className="font-mono font-bold text-pink-400">{angle2} deg</span>
                </div>
                <input type="range" min={10} max={85} value={angle2} aria-label="second angle"
                  onChange={(e) => setAngle2(Number(e.target.value))} className="w-full accent-pink-500" />
              </div>
            )}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 text-sm space-y-2">
            <p className="text-slate-300">
              {mode === 'findHeight' && (
                <>h = d x tan(angle) = {distance} x {Math.tan(rad(angle)).toFixed(4)} ={' '}
                  <span className="text-amber-300 font-bold">{towerH.toFixed(2)} m</span></>
              )}
              {mode === 'findDistance' && (
                <>d = h / tan(angle) = {height} / {Math.tan(rad(angle)).toFixed(4)} ={' '}
                  <span className="text-emerald-300 font-bold">{groundD.toFixed(2)} m</span></>
              )}
              {mode === 'twoAngles' && (
                <>d1 = h/tan({angle}) = {farD.toFixed(1)} m, d2 = h/tan({angle2}) = {nearD.toFixed(1)} m,
                  so walked = <span className="text-pink-300 font-bold">{walked.toFixed(2)} m</span></>
              )}
            </p>
            <p className="text-xs text-slate-400">Answer: <span className="font-mono text-slate-200">{answer}</span></p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              The instrument measures the angle, not the height. Trigonometry converts one known length
              plus one angle into the unreachable length: steeper angle, larger tan, taller tower for the
              same distance. The angle of elevation rises as you walk closer -- that is the two-angle trick.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Make a tower exactly 50 m tall with a 45 deg angle -- what distance does that force? Why?</p>
            <p>2. In two-angle mode, fix the angles at 30 and 60 deg. The walked distance is h x (sqrt(3) - 1/sqrt(3)). Verify it.</p>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

export default C10_MathematicsSomeApplicationsOfTrigonometrySim;
