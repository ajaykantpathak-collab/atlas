'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Science -- Magnetic Effects of Electric Current
 * Oersted's compass deflection around a straight wire, and a solenoid
 * electromagnet that lifts paperclips: B = mu0 * I / (2*pi*r) and
 * B = mu0 * n * I. Self-contained: react + tailwind only.
 */

const MU0 = 4 * Math.PI * 1e-7;
const EARTH_B = 50; // microtesla

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
    nodeId: 'c10_phy_cbse_02_001',
    q: 'Outside a bar magnet, in which direction do magnetic field lines run, and what does the CROWDING of lines tell you?',
    options: [
      'From north pole to south pole; closer lines mean a STRONGER field at that region',
      'From south to north; crowding means weaker field',
      'They run straight out and vanish; crowding has no meaning',
      'They always intersect at the poles',
    ],
    answer: 0,
    why: 'Field lines emerge from N and curve around to S outside the magnet (inside, they continue S to N -- closed loops). Concentration of lines = field strength. Two lines can NEVER intersect: at an intersection the compass needle would have to point in two directions at once, which is impossible.',
  },
  {
    nodeId: 'c10_phy_cbse_02_001',
    q: 'A student draws bar-magnet field lines as perfectly straight lines radiating outward. What is wrong?',
    options: [
      'Real field lines are CURVES that bend around and return to the south pole -- straight-only lines would never close and ignore the return path',
      'Nothing -- straight lines are correct',
      'Field lines should all point toward the north pole',
      'Field lines must be drawn as circles only',
    ],
    answer: 0,
    why: 'Design check: place paper on a bar magnet, sprinkle iron filings or step a plotting compass around it, mark needle directions and join them -- you trace continuous curved loops from N back to S. A compass aligns TANGENT to the field line at that point.',
  },
  {
    nodeId: 'c10_phy_cbse_02_002',
    q: 'A vertical wire carries current upward. A compass placed to its east side will deflect...',
    options: [
      'By the right-hand thumb rule: thumb up, fingers curl -- on the east side the field points into the page/southward, so the needle turns west-ward from north',
      'Not at all -- vertical wires make no field',
      'Always to the east regardless of current direction',
      'Only if the wire is coiled',
    ],
    answer: 0,
    why: 'Right-hand thumb rule: grasp the wire with the right hand, thumb along the CURRENT; the fingers give the circular field direction around the wire. Reverse the current and every deflection reverses -- exactly what the sim\'s polarity toggle shows.',
  },
  {
    nodeId: 'c10_phy_cbse_02_002',
    q: 'B = mu0 x I / (2 x pi x r). For I = 5.0 A at r = 2.0 cm, B is about... (mu0 = 4 pi x 10^-7 T m/A)',
    options: [
      '5.0 x 10^-5 T = 50 microtesla (comparable to Earth\'s field!)',
      '5.0 x 10^-3 T',
      '2.5 x 10^-7 T',
      'Zero -- straight wires make no field',
    ],
    answer: 0,
    why: 'B = (10^-7 x 5) / 0.02 = 2.5 x 10^-5... compute: mu0/2pi = 2 x 10^-7; B = 2x10^-7 x 5 / 0.02 = 5 x 10^-5 T = 50 uT. That is why lab wires visibly deflect compasses. Design check: vary I with a rheostat, note deflection vs distance -- B halves when r doubles (inverse, not inverse-square).',
  },
  {
    nodeId: 'c10_phy_cbse_02_003',
    q: 'Loop A (1 turn) and loop B (10 turns, same radius, same current) sit side by side. The field at the CENTRE of B compared with A is...',
    options: [
      '10 times stronger -- each turn contributes B and the contributions add: B = mu0 x N x I / (2R)',
      'The same -- turns do not matter',
      '1/10th',
      'Zero -- fields of turns cancel',
    ],
    answer: 0,
    why: 'Clockwise current (viewed from above) makes the field point INTO the page at the centre (clock-face rule); anticlockwise points out. All turns carry current the same way, so fields superpose -- that is the solenoid idea taken to the limit.',
  },
  {
    nodeId: 'c10_phy_cbse_02_005',
    q: 'State the formula for the force on a current-carrying conductor in a magnetic field.',
    options: [
      'F = B I L sin(theta) -- B in tesla, I in ampere, L in metre, theta the angle between conductor and field; direction by Fleming\'s LEFT-hand rule',
      'F = B / (I L)',
      'F = I L / B with direction by Fleming\'s right-hand rule',
      'F = B I L only when the conductor is parallel to the field',
    ],
    answer: 0,
    why: 'Maximum force when perpendicular (sin 90 = 1); ZERO when parallel (sin 0 = 0). Numeric: L = 0.10 m, I = 2 A, B = 0.5 T gives F = 0.1 N. Fleming\'s LEFT hand = motor rule (force), RIGHT hand = generator rule (induced current). Plotting F vs sin(theta) should give a straight line through the origin.',
  },
  {
    nodeId: 'c10_phy_cbse_02_006',
    q: 'In Indian domestic wiring, which wire is the fuse and main switch placed in, and why?',
    options: [
      'The LIVE wire (brown/red) -- so that switching off or a blown fuse disconnects the appliance from the high potential completely',
      'The neutral wire -- it is easier to reach',
      'The earth wire -- it is the safest conductor',
      'Both live and neutral equally, by convention',
    ],
    answer: 0,
    why: 'Live is at ~220 V, neutral near earth potential, earth (green/yellow) is a safety path into the ground rod. If the switch sat in the neutral, an "off" appliance would still have live 220 V inside -- a shock hazard during repairs. "Neutral is at zero potential so it is safe to touch" is FALSE reasoning: neutral can drift from earth potential and any fault makes it dangerous.',
  },
  {
    nodeId: 'c10_phy_cbse_02_006',
    q: 'A 1500 W geyser runs on 220 V mains. Current drawn, and the right 10 A-fuse decision?',
    options: [
      'I = P/V = 1500/220 = 6.8 A -- a 10 A fuse holds; but never run it beside a heater on the same circuit (overload)',
      'I = V/P = 0.147 A -- any fuse works',
      'I = 1500 x 220 A -- the fuse always blows',
      'Fuse rating is unrelated to current',
    ],
    answer: 0,
    why: 'Appliances are connected in PARALLEL so each gets 220 V and can be switched independently; parallel loads ADD their currents, which is how overloading happens (too many high-power appliances on one circuit -> fuse blows legitimately).',
  },
  {
    nodeId: 'c10_phy_cbse_02_007',
    q: 'A 5 A fuse does not blow with a 100 W bulb but blows in a short circuit. Why? And is swapping it for a 15 A fuse "because it is stronger" safe?',
    options: [
      'The bulb draws only 0.45 A; a short circuit makes current enormous and Joule heating (H = I^2 R t) melts the fuse in the live wire. Fitting 15 A defeats the protection -- the wiring can overheat before the fuse acts. UNSAFE.',
      'The fuse blows randomly; ratings are decorative and a bigger fuse is always safer',
      'Fuses blow on voltage, not current',
      'The bulb bypasses the fuse entirely',
    ],
    answer: 0,
    why: 'Fuse rating = maximum safe current; the fuse wire melts by I-squared-R heating. Minimum rating for a 2000 W, 220 V appliance: I = 9.1 A -> fit a 10 A fuse. Demo: thin steel-wool strand + rheostat -- raise current slowly until it glows and parts: that is your fuse.',
  },
  {
    nodeId: 'c10_phy_cbse_02_008',
    q: 'State Faraday\'s law of induction and read the magnet-through-copper-tube experiment.',
    options: [
      'Induced emf is proportional to the RATE OF CHANGE of magnetic flux linked with the coil (e = -N d(phi)/dt); the falling magnet induces eddy currents in the tube that oppose its fall -- it falls slower, like through honey',
      'Induced emf equals the flux itself, constant in time; the magnet falls faster',
      'A stationary magnet near a coil keeps a current flowing',
      'Induction works only with alternating magnets',
    ],
    answer: 0,
    why: 'No change in flux -> no emf, however strong the magnet. Design check: drop the magnet from different heights / through more turns -- bigger d(phi)/dt gives bigger galvanometer kicks; a stopwatch verifies the slowed fall. Closing a switch in a neighbouring coil also induces a momentary current (mutual induction) -- only at make and break.',
  },
  {
    nodeId: 'c10_phy_cbse_02_009',
    q: 'In a simple DC motor, WHY must the split-ring commutator reverse the current every half rotation?',
    options: [
      'After half a turn the forces would flip direction and hold the coil still; reversing the current keeps the torque turning the coil the SAME way',
      'To save battery',
      'To convert the coil into a magnet permanently',
      'To stop the coil overheating',
    ],
    answer: 0,
    why: 'Motor = electrical to mechanical energy. Fleming\'s LEFT-hand rule gives the force direction on each arm. A stuck-vibrating coil usually means the commutator gap is misaligned or insulation not half-scraped. Simple demo: battery, magnet, enamel wire coil, two paper-clip supports.',
  },
  {
    nodeId: 'c10_phy_cbse_02_010',
    q: 'Electric generator principle, the rule for induced current direction, and slip rings vs split rings:',
    options: [
      'Electromagnetic induction (mechanical -> electrical); Fleming\'s RIGHT-hand rule; AC generator uses full slip rings (output alternates), a DC generator adds a split-ring commutator to rectify the output',
      'Electrostatic induction; left-hand rule; both use split rings',
      'Ohm\'s law; right-hand thumb rule; slip rings rectify AC to DC',
      'The generator works only with permanent magnets and DC input',
    ],
    answer: 0,
    why: 'The split ring does NOT change the magnetic field -- it swaps the external connection every half-turn so the outside circuit always sees one polarity. Claims that "the commutator converts AC to DC by changing field direction" are wrong. Waveforms: AC = sine, DC-generator output = rectified humps. Max emf of a rotating coil: e0 = N B A (omega).',
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

export function C10_ScienceMagneticEffectsOfElectricCurrentSim() {
  const [mode, setMode] = useState<'wire' | 'solenoid'>('wire');
  const [current, setCurrent] = useState(2);
  const [distanceCm, setDistanceCm] = useState(5);
  const [turns, setTurns] = useState(40);
  const [lengthCm, setLengthCm] = useState(20);
  const [polarity, setPolarity] = useState<'A-to-B' | 'B-to-A'>('A-to-B');

  const bWireuT = ((MU0 * current) / (2 * Math.PI * (distanceCm / 100))) * 1e6;
  const nTurnsPerM = turns / (lengthCm / 100);
  const bSolenoiduT = (MU0 * nTurnsPerM * current) * 1e6;

  const bField = mode === 'wire' ? bWireuT : bSolenoiduT;
  const deflection = Math.atan(bField / EARTH_B) * (180 / Math.PI); // compass angle
  const fieldRatio = bField / EARTH_B;
  const clips = Math.min(40, Math.floor((bSolenoiduT / 2000) * 40));

  const needleAngle = mode === 'wire' ? Math.min(85, deflection) * (polarity === 'A-to-B' ? 1 : -1) : 90 * (polarity === 'A-to-B' ? 1 : -1);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700">🧭</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 10 -- Magnetic Effects of Electric Current</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Oersted&apos;s Compass and the Electromagnet</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 440 300" className="w-full">
            {mode === 'wire' ? (
              <g>
                {/* straight wire with current arrows */}
                <line x1={40} y1={70} x2={400} y2={70} stroke="#f59e0b" strokeWidth={5} strokeLinecap="round" />
                {[100, 180, 260, 340].map((x) => (
                  <polygon key={x} points={polarity === 'A-to-B' ? `${x},${64} ${x + 14},${70} ${x},${76}` : `${x},${64} ${x - 14},${70} ${x},${76}`}
                    fill="#fde047" className="animate-pulse" />
                ))}
                <text x={30} y={52} fontSize={11} fill="#f59e0b" fontFamily="monospace">A</text>
                <text x={404} y={52} fontSize={11} fill="#f59e0b" fontFamily="monospace">B</text>
                {/* concentric field circles */}
                {[40, 70, 100, 130].map((r, i) => (
                  <circle key={r} cx={220} cy={70} r={r} fill="none" stroke="#818cf8" strokeWidth={1.5}
                    strokeDasharray="6 4" opacity={0.25 + i * 0.15} />
                ))}
                {/* compass below wire */}
                <circle cx={220} cy={200} r={44} fill="#0f172a" stroke="#64748b" strokeWidth={3} />
                <text x={220} y={165} textAnchor="middle" fontSize={9} fill="#64748b">N</text>
                <text x={220} y={248} textAnchor="middle" fontSize={9} fill="#64748b">S</text>
                <g className="transition-transform duration-500" style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '220px 200px' }}>
                  <polygon points="220,168 214,200 226,200" fill="#f87171" />
                  <polygon points="220,232 214,200 226,200" fill="#e2e8f0" />
                </g>
                <line x1={220} y1={114} x2={220} y2={156} stroke="#475569" strokeWidth={1.5} strokeDasharray="3 3" />
                <text x={232} y={140} fontSize={9} fill="#94a3b8">{distanceCm} cm below wire</text>
                {/* field direction label */}
                <text x={70} y={130} fontSize={10} fill="#818cf8" fontFamily="monospace">
                  field circles the wire (right-hand thumb rule)
                </text>
              </g>
            ) : (
              <g>
                {/* solenoid coils */}
                {Array.from({ length: Math.min(turns, 14) }).map((_, i) => (
                  <path key={i} d={`M ${90 + i * 20},60 Q ${110 + i * 20},100 ${90 + i * 20},140`}
                    fill="none" stroke="#f59e0b" strokeWidth={4} opacity={0.9} />
                ))}
                <line x1={80} y1={60} x2={80 + Math.min(turns, 14) * 20 - 10} y2={140} stroke="#f59e0b" strokeWidth={2} opacity={0.3} />
                <text x={90} y={44} fontSize={10} fill="#f59e0b" fontFamily="monospace">{turns} turns over {lengthCm} cm</text>
                {/* poles */}
                <text x={40} y={105} fontSize={16} fontWeight="black" fill={polarity === 'A-to-B' ? '#f87171' : '#60a5fa'}>
                  {polarity === 'A-to-B' ? 'N' : 'S'}
                </text>
                <text x={390} y={105} fontSize={16} fontWeight="black" fill={polarity === 'A-to-B' ? '#60a5fa' : '#f87171'}>
                  {polarity === 'A-to-B' ? 'S' : 'N'}
                </text>
                {/* field lines through core */}
                {[80, 100, 120].map((y) => (
                  <line key={y} x1={60} y1={y} x2={380} y2={y} stroke="#818cf8" strokeWidth={1.5}
                    strokeDasharray="8 5" opacity={0.6}>
                    <animate attributeName="stroke-dashoffset" values="26;0" dur="1s" repeatCount="indefinite" />
                  </line>
                ))}
                {/* paperclips hanging */}
                <g className="transition-transform duration-500" style={{ transform: `translateY(${clips > 0 ? 8 : 40}px)` }}>
                  {Array.from({ length: Math.min(clips, 12) }).map((_, i) => (
                    <g key={i} transform={`translate(${140 + (i % 6) * 30}, ${190 + Math.floor(i / 6) * 36}) rotate(${i * 13})`}>
                      <path d="M 0,0 Q 8,2 8,10 Q 8,18 0,20 Q -4,20 -4,14" fill="none" stroke="#cbd5e1" strokeWidth={2.5} />
                    </g>
                  ))}
                </g>
                <text x={220} y={285} textAnchor="middle" fontSize={11} fill={clips > 0 ? '#34d399' : '#64748b'} fontFamily="monospace">
                  {clips > 0 ? `lifting ${clips} paperclips` : 'too weak to lift clips -- raise I or n'}
                </text>
              </g>
            )}
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Field B</p>
              <p className="font-mono font-bold text-indigo-300">{bField < 1000 ? bField.toFixed(1) : (bField / 1000).toFixed(1) + 'k'} uT</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">vs Earth (50 uT)</p>
              <p className="font-mono font-bold text-amber-300">{fieldRatio.toFixed(2)}x</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Compass deflection</p>
              <p className="font-mono font-bold text-rose-300">{Math.min(deflection, 89).toFixed(1)} deg</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setMode('wire')}
                className={`py-2 rounded-xl text-xs font-bold ${mode === 'wire' ? 'bg-indigo-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Straight wire
              </button>
              <button onClick={() => setMode('solenoid')}
                className={`py-2 rounded-xl text-xs font-bold ${mode === 'solenoid' ? 'bg-indigo-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Solenoid
              </button>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Current I</span>
                <span className="font-mono font-bold text-yellow-400">{current.toFixed(1)} A</span>
              </div>
              <input type="range" min={0} max={6} step={0.1} value={current} aria-label="current"
                onChange={(e) => setCurrent(Number(e.target.value))} className="w-full accent-yellow-500" />
            </div>
            {mode === 'wire' ? (
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Compass distance from wire</span>
                  <span className="font-mono font-bold text-sky-400">{distanceCm} cm</span>
                </div>
                <input type="range" min={1} max={20} value={distanceCm} aria-label="distance"
                  onChange={(e) => setDistanceCm(Number(e.target.value))} className="w-full accent-sky-500" />
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Turns n</span>
                    <span className="font-mono font-bold text-sky-400">{turns}</span>
                  </div>
                  <input type="range" min={5} max={200} value={turns} aria-label="turns"
                    onChange={(e) => setTurns(Number(e.target.value))} className="w-full accent-sky-500" />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Coil length</span>
                    <span className="font-mono font-bold text-cyan-300">{lengthCm} cm (n = {nTurnsPerM.toFixed(0)} /m)</span>
                  </div>
                  <input type="range" min={5} max={40} value={lengthCm} aria-label="coil length"
                    onChange={(e) => setLengthCm(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>
              </div>
            )}
            <button onClick={() => setPolarity((p) => (p === 'A-to-B' ? 'B-to-A' : 'A-to-B'))}
              className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-indigo-800 transition">
              Reverse current direction (poles flip!)
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-indigo-800/60 p-4 text-xs font-mono space-y-1">
            <p className="text-slate-300">
              {mode === 'wire'
                ? `B = mu0*I/(2*pi*r) = ${bWireuT.toFixed(1)} uT at ${distanceCm} cm`
                : `B = mu0*n*I = ${bSolenoiduT < 1000 ? bSolenoiduT.toFixed(0) : (bSolenoiduT / 1000).toFixed(1) + 'k'} uT inside`}
            </p>
            <p className="text-slate-500">tan(deflection) = B_wire / B_earth = {fieldRatio.toFixed(2)}</p>
            {mode === 'solenoid' && <p className="text-slate-500">Soft iron core would multiply this roughly x1000</p>}
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Every current carries a magnetic field with it: Oersted&apos;s compass proved electricity and
              magnetism are one family. The field circles a straight wire (right-hand thumb rule) and
              straightens into a bar-magnet pattern inside a solenoid. Doubling current doubles B; halving
              distance on a wire doubles B; stuffing more turns into the same length multiplies it.
            </p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl border border-indigo-800/50 p-4 text-xs">
            <p className="font-bold text-indigo-300 mb-1">What to try</p>
            <p>1. Find the current that deflects the compass exactly 45 deg -- then verify tan(45) = B/50 means B = 50 uT.</p>
            <p>2. Halve the coil length keeping n fixed. Why does B rise even though turn count is unchanged?</p>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

export default C10_ScienceMagneticEffectsOfElectricCurrentSim;
