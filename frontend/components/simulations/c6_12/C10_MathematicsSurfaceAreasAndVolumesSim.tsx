'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Maths -- Surface Areas and Volumes
 * Choose a solid, drag radius/height, read CSA/TSA/volume, then try the
 * classic "melt and recast" conversion with real capacity numbers.
 * Self-contained: react + tailwind only.
 */

type Shape = 'cylinder' | 'cone' | 'sphere' | 'hemisphere';

const PI = Math.PI;

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
    nodeId: 'c10_math_cbse_12_001',
    q: 'A cube of side 6 cm sits on top of a cuboid 12 x 8 x 4 cm. The total surface area of the decorative block counts...',
    options: [
      'TSA of both solids MINUS twice the hidden contact area (the 6x6 square where they meet is covered on both solids)',
      'TSA of both solids added as they are',
      'Only the cuboid TSA -- the cube hides inside it',
      'Only the cube TSA -- the cuboid is the base',
    ],
    answer: 0,
    why: 'The glued square hides one face on the cube AND one equal patch on the cuboid: subtract 2 x 6 x 6 = 72 cm^2. Combination-surface rule: list the visible faces, never add raw TSAs blindly. (The cube face 6x6 fully covers part of the 12x8 top.)',
  },
  {
    nodeId: 'c10_math_cbse_12_002',
    q: 'Design a problem needing the total surface area of a cylinder with hemispherical ends (a capsule/roller). What is the right formula for a capsule of radius r and cylinder length h?',
    options: [
      'CSA of cylinder (2 x pi x r x h) + TSA of ONE hemisphere x2 (4 x pi x r^2) -- the two hemispheres together make a full sphere',
      'TSA of the cylinder + nothing else',
      '2 x pi x r x (h + 2r) only',
      'Volume formula pi x r^2 x h',
    ],
    answer: 0,
    why: 'Surface of a capsule = curved wall of the cylinder + one full sphere\'s worth of round ends. The joining circles are INTERNAL -- never count them. Indian-context design: a water-tanker (cylinder + hemispherical bowl at each end), razors, pills.',
  },
  {
    nodeId: 'c10_math_cbse_12_003',
    q: 'A pencil holder: cylinder r = 3.5 cm, h = 12 cm, with a hemispherical cavity r = 3.5 cm dug out of the top. Its capacity (volume) is...',
    options: [
      'pi x 3.5^2 x 12 MINUS (2/3) x pi x 3.5^3 -- volume removed by the cavity',
      'pi x 3.5^2 x 12 PLUS (2/3) x pi x 3.5^3',
      'pi x 3.5^2 x 12 only -- cavities change nothing',
      '(2/3) x pi x 3.5^3 only',
    ],
    answer: 0,
    why: 'Capacity of a hollowed solid = big volume MINUS carved-out volume. (Contrast: a toy, or a solid surmounted by a hemisphere, ADDS volume.) Read the wording: "cavity" subtracts, "surmounted by" adds.',
  },
  {
    nodeId: 'c10_math_cbse_12_003',
    q: 'A solid iron pole: cylinder h = 220 cm, base diameter 24 cm, SURMOUNTED by a hemisphere of the same radius. Total volume?',
    options: [
      'pi x 12^2 x 220 PLUS (2/3) x pi x 12^3 -- the hemisphere sits on top adding metal',
      'pi x 12^2 x 220 MINUS (2/3) x pi x 12^3',
      'pi x 24^2 x 220 only',
      '(4/3) x pi x 12^3 only',
    ],
    answer: 0,
    why: '"Surmounted by" = added on top. Cylinder pi x 144 x 220 = 99,633 cm^3; hemisphere (2/3)pi x 1728 = 3619 cm^3; total about 103,252 cm^3 -- mass = volume x density of iron (7.8 g/cm^3) if asked. Same join-radius trick as the capsule, but for VOLUME.',
  },
  {
    nodeId: 'c10_math_cbse_12_005',
    q: 'How many spherical bullets of radius 0.2 cm come from a lead cube of side 44 cm? A student divides V(cube)/V(sphere) but drops a pi. What is the correct count?',
    options: [
      '44^3 / [(4/3) x pi x 0.2^3] = 85184 / 0.0335 = about 2541 bullets',
      '44^3 / 0.2^3 = 266200 -- pi cancels',
      '44/0.2 = 220 bullets along one edge only',
      '6 x 44^2 / (4 x pi x 0.2^2)',
    ],
    answer: 0,
    why: 'Melt-and-recast conserves VOLUME: n x (4/3)pi r^3 = side^3. Area ratios (option D) answer "how much paint", never "how many bullets". Always check the final arithmetic: n must come out a sensible whole number.',
  },
  {
    nodeId: 'c10_math_cbse_12_006',
    q: 'A cone of height 12 cm, base radius 6 cm is cut by a plane PARALLEL to the base, 4 cm below the vertex (apex). The top piece is...',
    options: [
      'A small cone of height 4 cm and radius 2 cm (similar triangles scale 4/12 = 1/3), and the bottom piece is the FRUSTUM with h = 8, R = 6, r = 2',
      'A cylinder of height 4 cm',
      'A sphere',
      'The plane cut always makes two frustums',
    ],
    answer: 0,
    why: 'Frustum = bottom part of a cone cut by a plane PARALLEL to the base. If the cut is not parallel, the piece is not a frustum at all (that is the definitional answer to "why must the plane be parallel"). Radii scale linearly with distance from the apex.',
  },
  {
    nodeId: 'c10_math_cbse_12_007',
    q: 'Frustum: R = 10, r = 6, h = 8. A student writes slant height l = square root of (8^2 + (10+6)^2). The error is...',
    options: [
      'The formula uses (R - r), not (R + r): l = square root of (h^2 + (R-r)^2) = square root of (64 + 16) = square root of 80 = 8.94 cm',
      'Slant height equals the vertical height h',
      'The formula needs R x r',
      'Nothing -- (R + r) is correct',
    ],
    answer: 0,
    why: 'Drop the inner triangle: the horizontal leg of the right triangle is R - r (the rim overhang), vertical leg h. Then CSA = pi x (R + r) x l and TSA = pi x l x (R + r) + pi x R^2 + pi x r^2 (both circular ends exposed on a bucket).',
  },
  {
    nodeId: 'c10_math_cbse_12_007',
    q: 'Frustum r1 = 20, r2 = 12, h = 15. The student takes l = 15 and writes TSA = pi x 15 x 32 + pi x 400 + pi x 144. Which single check exposes the error?',
    options: [
      'Slant height must exceed the vertical height: l = square root of (15^2 + 8^2) = 17, so CSA = pi x 17 x 32',
      'TSA never includes the circular ends',
      'pi must cancel out',
      'The two radii must be equal in a frustum',
    ],
    answer: 0,
    why: 'l is the hypotenuse, so l > h ALWAYS. Design a real-life version: a brass lampshade or open bucket needs the CSA + one base circle only -- "open" in the question tells you which faces to drop.',
  },
  {
    nodeId: 'c10_math_cbse_12_008',
    q: 'Water flows at 5 km/h through a pipe of diameter 14 cm into a cuboidal tank 50 m x 44 m x 2 m. Time to fill? (Classic board problem.)',
    options: [
      'Volume of tank / (cross-section x speed per hour): 4400 m^3 / (pi x 0.07^2 x 5000) = 4400 / 76.96 = about 57 minutes',
      '50 x 44 x 2 / 14 = 314 hours',
      'It never fills -- flowing water has no volume',
      '2 hours, because the tank is 2 m deep',
    ],
    answer: 0,
    why: 'Convert units FIRST (diameter 14 cm = 0.14 m; speed 5 km/h = 5000 m/h). Water delivered per hour = pipe cross-sectional area x distance travelled = pi r^2 x 5000. Volume conservation is the skeleton; unit discipline is the muscle.',
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
    <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Board-depth drill</p>
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

export function C10_MathematicsSurfaceAreasAndVolumesSim() {
  const [shape, setShape] = useState<Shape>('cylinder');
  const [r, setR] = useState(4);
  const [h, setH] = useState(10);
  const [recast, setRecast] = useState<'sphere' | 'cylinder' | 'cone'>('sphere');
  const [recastR, setRecastR] = useState(2);

  const dims = useMemo(() => {
    const rr = r;
    const hh = shape === 'sphere' || shape === 'hemisphere' ? 2 * r : h;
    let csa = 0;
    let tsa = 0;
    let vol = 0;
    let csaF = '';
    let tsaF = '';
    let volF = '';
    if (shape === 'cylinder') {
      csa = 2 * PI * rr * hh;
      tsa = csa + 2 * PI * rr * rr;
      vol = PI * rr * rr * hh;
      csaF = '2*pi*r*h';
      tsaF = '2*pi*r*(r+h)';
      volF = 'pi*r^2*h';
    } else if (shape === 'cone') {
      const l = Math.sqrt(rr * rr + hh * hh);
      csa = PI * rr * l;
      tsa = csa + PI * rr * rr;
      vol = (PI * rr * rr * hh) / 3;
      csaF = `pi*r*l (l=${l.toFixed(2)})`;
      tsaF = 'pi*r*(l+r)';
      volF = '(1/3)*pi*r^2*h';
    } else if (shape === 'sphere') {
      csa = 4 * PI * rr * rr;
      tsa = csa;
      vol = (4 / 3) * PI * rr * rr * rr;
      csaF = '4*pi*r^2';
      tsaF = '4*pi*r^2';
      volF = '(4/3)*pi*r^3';
    } else {
      csa = 2 * PI * rr * rr;
      tsa = 3 * PI * rr * rr;
      vol = (2 / 3) * PI * rr * rr * rr;
      csaF = '2*pi*r^2 (curved)';
      tsaF = '3*pi*r^2 (incl. base)';
      volF = '(2/3)*pi*r^3';
    }
    return { csa, tsa, vol, csaF, tsaF, volF, hh, slant: shape === 'cone' ? Math.sqrt(rr * rr + hh * hh) : 0 };
  }, [shape, r, h]);

  // Melt the current solid into n small copies of recast shape
  const recastVol = useMemo(() => {
    const rr = recastR;
    if (recast === 'sphere') return (4 / 3) * PI * rr * rr * rr;
    if (recast === 'cylinder') return PI * rr * rr * Math.max(recastR * 2, 1);
    return (PI * rr * rr * (recastR * 2)) / 3; // cone with h = 2r
  }, [recast, recastR]);

  const count = recastVol > 0 ? Math.floor(dims.vol / recastVol) : 0;
  const capacityL = (dims.vol / 1000).toFixed(3); // cm^3 -> litres (units treated as cm)

  // SVG drawing (isometric-ish)
  const drawSolid = () => {
    const s = 12; // px per cm, capped
    const px = Math.min(120, r * s);
    const py = Math.min(150, dims.hh * s);
    if (shape === 'cylinder')
      return (
        <g>
          <rect x={200 - px} y={280 - py} width={px * 2} height={py} fill="#6366f133" stroke="#818cf8" strokeWidth={2.5} />
          <ellipse cx={200} cy={280 - py} rx={px} ry={px * 0.28} fill="#818cf855" stroke="#818cf8" strokeWidth={2.5} />
          <ellipse cx={200} cy={280} rx={px} ry={px * 0.28} fill="none" stroke="#818cf8" strokeWidth={2.5} />
        </g>
      );
    if (shape === 'cone')
      return (
        <g>
          <polygon points={`200,${280 - py} ${200 - px},280 ${200 + px},280`} fill="#f59e0b22" stroke="#fbbf24" strokeWidth={2.5} />
          <ellipse cx={200} cy={280} rx={px} ry={px * 0.28} fill="none" stroke="#fbbf24" strokeWidth={2.5} />
          <line x1={200} y1={280 - py} x2={200 + px} y2={280} stroke="#f87171" strokeWidth={2} strokeDasharray="5 3" />
          <text x={210} y={280 - py / 2} fill="#f87171" fontSize={11} fontFamily="monospace">l={dims.slant.toFixed(1)}</text>
        </g>
      );
    if (shape === 'sphere')
      return (
        <g>
          <circle cx={200} cy={230} r={px} fill="#34d39922" stroke="#34d399" strokeWidth={2.5} />
          <ellipse cx={200} cy={230} rx={px} ry={px * 0.26} fill="none" stroke="#34d399" strokeWidth={1.5} strokeDasharray="4 3" />
        </g>
      );
    return (
      <g>
        <path d={`M ${200 - px},230 A ${px} ${px} 0 0 1 ${200 + px},230 Z`} fill="#f472b622" stroke="#f472b6" strokeWidth={2.5} />
        <ellipse cx={200} cy={230} rx={px} ry={px * 0.26} fill="none" stroke="#f472b6" strokeWidth={2.5} />
      </g>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-rose-950/80 rounded-2xl border border-rose-700">🥫</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Class 10 -- Surface Areas and Volumes</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Solids, Melting and Recasting</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 400 320" className="w-full">
            <line x1={20} y1={296} x2={380} y2={296} stroke="#334155" strokeWidth={2} />
            {drawSolid()}
            <text x={200} y={312} textAnchor="middle" fill="#94a3b8" fontSize={11} fontFamily="monospace">
              r = {r} cm{shape === 'cylinder' || shape === 'cone' ? `, h = ${dims.hh} cm` : ''}
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Curved / Lateral SA</p>
              <p className="font-mono font-bold text-gold-300">{dims.csa.toFixed(1)}</p>
              <p className="text-[9px] text-slate-600">{dims.csaF} cm^2</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Total SA</p>
              <p className="font-mono font-bold text-amber-300">{dims.tsa.toFixed(1)}</p>
              <p className="text-[9px] text-slate-600">{dims.tsaF} cm^2</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Volume</p>
              <p className="font-mono font-bold text-emerald-300">{dims.vol.toFixed(1)}</p>
              <p className="text-[9px] text-slate-600">{dims.volF} cm^3 = {capacityL} L</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {(['cylinder', 'cone', 'sphere', 'hemisphere'] as Shape[]).map((s) => (
                <button key={s} onClick={() => setShape(s)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize ${shape === s ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {s}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Radius r</span><span className="font-mono font-bold text-gold-400">{r} cm</span>
              </div>
              <input type="range" min={1} max={10} value={r} aria-label="radius"
                onChange={(e) => setR(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            {shape !== 'sphere' && shape !== 'hemisphere' && (
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Height h</span><span className="font-mono font-bold text-amber-400">{h} cm</span>
                </div>
                <input type="range" min={2} max={20} value={h} aria-label="height"
                  onChange={(e) => setH(Number(e.target.value))} className="w-full accent-amber-500" />
              </div>
            )}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-emerald-800/60 p-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Melt and recast (volume conserved!)</p>
            <div className="grid grid-cols-3 gap-2">
              {(['sphere', 'cylinder', 'cone'] as const).map((s) => (
                <button key={s} onClick={() => setRecast(s)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold capitalize ${recast === s ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {s === 'sphere' ? 'spheres' : s === 'cylinder' ? 'cylinders' : 'cones'}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Small solid radius</span><span className="font-mono font-bold text-emerald-400">{recastR} cm</span>
              </div>
              <input type="range" min={1} max={6} value={recastR} aria-label="recast radius"
                onChange={(e) => setRecastR(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <p className="text-sm text-slate-300">
              n = V(big) / V(small) = {dims.vol.toFixed(1)} / {recastVol.toFixed(1)} ={' '}
              <span className="font-black text-emerald-400 text-lg">{count}</span> complete small solids
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Melting changes shape, never volume -- that single sentence solves an entire family of
              board questions. Surface area does NOT survive melting: many small spheres carry more
              total surface than the big solid they came from (that is why granulated sugar dissolves
              faster than a sugar cube).
            </p>
          </div>

          <div className="bg-rose-950/40 rounded-2xl border border-rose-800/50 p-4 text-xs">
            <p className="font-bold text-rose-300 mb-1">What to try</p>
            <p>1. Recast a cylinder (r=6, h=20) into spheres of radius 2. Predict n by mental math first.</p>
            <p>2. Double r while halving h on the cylinder -- what happens to volume? And to CSA?</p>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

export default C10_MathematicsSurfaceAreasAndVolumesSim;
