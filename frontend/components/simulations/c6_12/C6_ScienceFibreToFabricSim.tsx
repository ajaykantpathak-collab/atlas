/**
 * C6 Science -- Fibre to Fabric
 *
 * One chapter concept: fabric is NOT made from cotton wool directly.
 * Fibres are first separated from seeds (ginning), twisted into yarn
 * (spinning), then woven or knitted into fabric. More twist makes
 * stronger yarn; more threads per cm make tighter fabric.
 *
 * Interaction model: a 3-step mini factory. Click cotton bolls to
 * harvest, slide the twist dial to spin yarn (weak yarn snaps on the
 * pull test), then set the loom density and switch weave/knit.
 */
import React, { useState } from 'react';

type Stage = 'field' | 'ginning' | 'spinning' | 'loom';

// zigzag path of fibres wrapping a yarn strand: more twist = more crossings
function yarnPath(twist: number, snapped: boolean): string {
  const crossings = twist * 6;
  const end = snapped ? 260 : 540;
  let d = 'M 40 150';
  for (let i = 1; i <= crossings; i++) {
    const x = 40 + ((end - 40) * i) / crossings;
    const y = 150 + (i % 2 === 0 ? -22 : 22);
    d += ' L ' + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  d += ' L ' + end + ' 150';
  return d;
}

function C6_ScienceFibreToFabricSim() {
  const [stage, setStage] = useState<Stage>('field');
  const [picked, setPicked] = useState(0);
  const [twist, setTwist] = useState(5);
  const [density, setDensity] = useState(4);
  const [knit, setKnit] = useState(false);
  const [pull, setPull] = useState(false);

  const weak = twist < 4;
  const snapped = pull && weak;
  const warpCount = density * 3 + 4;
  const airiness = Math.round(100 - (density / 10) * 80);

  const reset = () => {
    setStage('field');
    setPicked(0);
    setTwist(5);
    setDensity(4);
    setKnit(false);
    setPull(false);
  };

  const stageOrder: Stage[] = ['field', 'ginning', 'spinning', 'loom'];
  const stageIdx = stageOrder.indexOf(stage);
  const canAdvance = stage === 'field' ? picked >= 3 : true;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-rose-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-rose-700">Fibre to Fabric -- the cotton factory</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Your T-shirt did NOT grow on the plant as fabric! Cotton starts as soft <b>fibre</b> inside a fluffy
        boll. Machines comb out the seeds (<b>ginning</b>), spinners twist fibres into <b>yarn</b>, and a loom
        weaves yarn into <b>fabric</b>. You cannot sew with cotton wool -- the twist is what makes it strong.
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {stageOrder.map((s, i) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className={
              'px-3 py-2 rounded-xl text-xs font-black transition-colors ' +
              (stage === s ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')
            }
          >
            {i + 1}. {s === 'field' ? 'Cotton field' : s === 'ginning' ? 'Ginning' : s === 'spinning' ? 'Spinning' : 'Loom'}
          </button>
        ))}
        <button onClick={reset} className="px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_230px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-rose-100 bg-rose-50/40 overflow-hidden">
          <svg viewBox="0 0 640 300" className="w-full">
            <rect width="640" height="300" fill="#fff1f2" />
            {stage === 'field' && (
              <g>
                {[0, 1, 2].map((i) => (
                  <g key={i} onClick={() => setPicked(Math.min(5, picked + 1))} style={{ cursor: 'pointer' }}>
                    <ellipse cx={140 + i * 180} cy={205} rx={46} ry={26} fill="#a16207" />
                    <circle cx={140 + i * 180} cy={170} r={34} fill={picked > i ? '#fecdd3' : '#ffffff'} stroke="#e4e4e7" strokeWidth="3" />
                    <circle cx={124 + i * 180} cy={158} r={12} fill={picked > i ? '#fecdd3' : '#ffffff'} />
                    <circle cx={156 + i * 180} cy={158} r={12} fill={picked > i ? '#fecdd3' : '#ffffff'} />
                    {picked <= i && <circle cx={140 + i * 180} cy={170} r={5} fill="#78350f" />}
                  </g>
                ))}
                <text x="320" y="272" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9f1239">
                  {picked < 3 ? 'Click the bolls to pick at least 3' : 'Picked ' + picked + ' bolls -- now go to Ginning'}
                </text>
              </g>
            )}
            {stage === 'ginning' && (
              <g>
                <rect x="250" y="90" width="140" height="120" rx="14" fill="#fda4af" opacity="0.5" stroke="#fb7185" strokeWidth="3" />
                <text x="320" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9f1239">seed remover (ginning comb)</text>
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i} style={{ transition: 'transform 0.8s ease', transform: 'translate(0px, 0px)' }}>
                    <circle cx={230} cy={130 + i * 24} r={9} fill="#fff" stroke="#d4d4d8" style={{ transition: 'transform 0.9s ease ' + i * 0.1 + 's', transform: 'translate(180px, 0px)' }} />
                    <circle cx={410} cy={130 + i * 24} r={7} fill="#78350f" style={{ transition: 'transform 0.9s ease ' + i * 0.1 + 's', transform: 'translate(-160px, 0px)' }} />
                  </g>
                ))}
                <text x="320" y="268" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9f1239">White fibre goes right, brown seeds drop left</text>
              </g>
            )}
            {stage === 'spinning' && (
              <g>
                <circle cx="40" cy="150" r="26" fill="#f43f5e" />
                <text x="40" y="196" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9f1239">spinning wheel</text>
                <path d={yarnPath(twist, snapped)} stroke={snapped ? '#94a3b8' : '#0ea5e9'} strokeWidth="6" fill="none" strokeLinecap="round" opacity={snapped ? 0.4 : 0.9} style={{ transition: 'stroke 0.3s' }} />
                {pull && !snapped && <circle cx="540" cy="150" r="16" fill="#22c55e" />}
                {pull && !snapped && <text x="540" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">held!</text>}
                {snapped && <text x="262" y="110" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">SNAP! too little twist</text>}
                <text x="320" y="268" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9f1239">
                  Twist = {twist} turns/cm -- {weak ? 'weak yarn, it will snap' : 'strong yarn'}
                </text>
              </g>
            )}
            {stage === 'loom' && (
              <g>
                {!knit
                  ? Array.from({ length: warpCount }, (_, i) => (
                      <line key={'v' + i} x1={100 + i * ((440 - 40) / (warpCount - 1))} y1="70" x2={100 + i * ((440 - 40) / (warpCount - 1))} y2="230" stroke="#0ea5e9" strokeWidth={Math.max(2, 9 - density)} />
                    ))
                  : Array.from({ length: warpCount }, (_, i) => (
                      <circle key={'c' + i} cx={100 + i * ((440 - 40) / (warpCount - 1))} cy="150" r={18} fill="none" stroke="#0ea5e9" strokeWidth="3" />
                    ))}
                {!knit &&
                  Array.from({ length: Math.round(density * 2.4) + 5 }, (_, j) => (
                    <line key={'h' + j} x1="60" y1={80 + j * (140 / (Math.round(density * 2.4) + 4))} x2="580" y2={80 + j * (140 / (Math.round(density * 2.4) + 4))} stroke="#f43f5e" strokeWidth={Math.max(2, 9 - density)} opacity="0.9" />
                  ))}
                <text x="320" y="268" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9f1239">
                  {knit ? 'Knitted: one yarn looped into itself' : 'Woven: two yarn sets crossing'} -- {density} threads/cm, {airiness}% airy
                </text>
              </g>
            )}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-rose-600 text-white text-center">
            <div className="text-xs uppercase tracking-widest opacity-80">Step</div>
            <div className="text-lg font-black">{STAGE_NAMES[stageIdx]}</div>
            <div className="text-[11px] opacity-90 mt-1">{STAGE_NOTES[stageIdx]}</div>
          </div>
          {stage === 'spinning' && (
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Twist</span>
                <span className="text-rose-700 font-black">{twist} turns/cm</span>
              </label>
              <input type="range" min={1} max={10} value={twist} onChange={(e) => setTwist(Number(e.target.value))} className="w-full accent-rose-500" />
              <button onClick={() => setPull(true)} className="w-full mt-2 px-3 py-2 rounded-xl text-xs font-black bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                Pull test the yarn!
              </button>
              {pull && (
                <button onClick={() => setPull(false)} className="w-full mt-2 px-3 py-1 rounded-xl text-[11px] font-bold bg-slate-100 text-slate-500">
                  let go
                </button>
              )}
            </div>
          )}
          {stage === 'loom' && (
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Threads per cm</span>
                <span className="text-rose-700 font-black">{density}</span>
              </label>
              <input type="range" min={2} max={10} value={density} onChange={(e) => setDensity(Number(e.target.value))} className="w-full accent-rose-500" />
              <button onClick={() => setKnit(!knit)} className="w-full mt-2 px-3 py-2 rounded-xl text-xs font-black bg-gold-500 text-white hover:bg-gold-600 transition-colors">
                Switch to {knit ? 'weaving (loom)' : 'knitting (loops)'}
              </button>
            </div>
          )}
          {canAdvance && stage !== 'loom' && (
            <button onClick={() => setStage(stageOrder[stageIdx + 1])} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-amber-400 text-amber-900 hover:bg-amber-300 transition-colors">
              Next: {STAGE_NAMES[stageIdx + 1]} &gt;
            </button>
          )}
          <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
            Misconception buster: cotton wool cannot be woven. Until loose fibres are TWISTED into yarn, they just pull apart.
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Set twist to 1 and run the pull test, then set twist to 10 and test again. How many turns does yarn need to survive?</li>
          <li>On the loom, compare 2 threads/cm with 10 threads/cm. Which fabric would let more wind through on a hot day?</li>
        </ol>
      </div>
    </div>
  );
}

const STAGE_NAMES = ['Cotton field', 'Ginning', 'Spinning', 'Loom'];
const STAGE_NOTES = [
  'Click bolls: cotton fibre holds the seeds.',
  'Combs pull fibre off the seeds.',
  'Twist fibres into one strong yarn.',
  'Weave or knit yarn into fabric.',
];

export { C6_ScienceFibreToFabricSim };
export default C6_ScienceFibreToFabricSim;
