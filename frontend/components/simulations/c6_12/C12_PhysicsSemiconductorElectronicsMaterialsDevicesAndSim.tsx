'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 Physics -- Semiconductor Electronics
 * p-n junction diode driven by a real source + series resistor: Shockley
 * equation I = I0(e^{V/nVT} - 1) intersected with the load line by bisection.
 * Self-contained: react + tailwind only.
 */

const I0_STEPS = [-9, -8, -7, -6, -5]; // log10 A

export function C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim() {
  const [supply, setSupply] = useState(5); // V
  const [resOhm, setResOhm] = useState(470);
  const [tempK, setTempK] = useState(300);
  const [i0Idx, setI0Idx] = useState(2); // index into I0_STEPS
  const [showLoadLine, setShowLoadLine] = useState(true);

  const i0 = Math.pow(10, I0_STEPS[i0Idx]); // A
  const vT = tempK / 11605; // thermal voltage kT/q
  const eta = 1;

  const diodeI = (v: number) => i0 * (Math.exp(v / (eta * vT)) - 1); // A

  // Operating point: solve diodeI(V) = (Vs - V)/R by bisection (monotonic in V)
  const q = useMemo(() => {
    let lo = -2;
    let hi = supply;
    const g = (v: number) => diodeI(v) - (supply - v) / resOhm;
    for (let i = 0; i < 90; i++) {
      const mid = (lo + hi) / 2;
      if (g(mid) > 0) hi = mid;
      else lo = mid;
    }
    const vD = (lo + hi) / 2;
    const iD = diodeI(vD);
    return { vD, iD };
  }, [supply, resOhm, tempK, i0]);

  const rd = q.iD > 0 ? vT / q.iD : Infinity; // dynamic resistance
  const pDiode = q.vD * q.iD * 1000; // mW

  // Plot: V from -2 .. +1.2 V, I log-ish scaled to mA
  const plotPts: string[] = [];
  const maxImA = Math.max(2, (supply / resOhm) * 1000 * 1.15);
  for (let i = 0; i <= 200; i++) {
    const v = -2 + (3.2 * i) / 200;
    const iMa = Math.min(maxImA, (diodeI(v) * 1000));
    const capV = iMa >= maxImA ? v : v;
    void capV;
    plotPts.push(`${40 + ((v + 2) / 3.2) * 380},${240 - (iMa / maxImA) * 200}`);
  }
  const pxV = (v: number) => 40 + ((v + 2) / 3.2) * 380;
  const pyI = (iMa: number) => 240 - (Math.min(iMa, maxImA) / maxImA) * 200;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-orange-950/80 rounded-2xl border border-orange-700 font-mono">&gt;|</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Class 12 -- Semiconductor Electronics</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Diode + Load Line: Finding the Q-Point</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 280" className="w-full">
            <line x1={40} y1={240} x2={440} y2={240} stroke="#475569" strokeWidth={2} />
            <line x1={pxV(0)} y1={20} x2={pxV(0)} y2={250} stroke="#475569" strokeWidth={2} />
            <text x={230} y={268} textAnchor="middle" fill="#64748b" fontSize={11} fontFamily="monospace">diode voltage VD (V)</text>
            <text x={16} y={135} fill="#64748b" fontSize={11} fontFamily="monospace" transform="rotate(-90 16 135)">ID (mA)</text>
            <polyline points={plotPts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            {showLoadLine && (
              <line x1={pxV(-2)} y1={pyI((supply + 2) / resOhm * 1000)} x2={pxV(supply)} y2={pyI(0)}
                stroke="#fbbf24" strokeWidth={2} strokeDasharray="6 4" />
            )}
            <circle cx={pxV(q.vD)} cy={pyI(q.iD * 1000)} r={6} fill="#f472b6" stroke="#fff" strokeWidth={1.5} />
            <text x={pxV(q.vD) + 10} y={pyI(q.iD * 1000) - 10} fill="#f9a8d4" fontSize={11} fontFamily="monospace" fontWeight="bold">
              Q: {q.vD.toFixed(3)} V, {(q.iD * 1000).toFixed(2)} mA
            </text>
            <text x={44} y={34} fill="#38bdf8" fontSize={10} fontFamily="monospace">Shockley curve at T = {tempK} K</text>
            {showLoadLine && <text x={44} y={48} fill="#fbbf24" fontSize={10} fontFamily="monospace">load line: I = (Vs - V)/R</text>}
            <text x={pxV(0.6)} y={256} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">0.6</text>
            <text x={pxV(-2)} y={256} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">-2</text>
          </svg>

          {/* circuit sketch */}
          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <svg viewBox="0 0 440 90" className="w-full">
              <path d="M 20 45 L 60 45 M 60 25 L 60 65 M 72 32 L 72 58 M 72 45 L 110 45" stroke="#94a3b8" strokeWidth={2} fill="none" />
              <text x={40} y={78} fill="#94a3b8" fontSize={10} fontFamily="monospace">{supply} V</text>
              <path d="M 110 45 L 150 45 M 150 32 L 158 32 M 158 32 L 158 58 M 158 58 L 150 58 M 158 45 L 200 45" stroke="#fbbf24" strokeWidth={2} fill="none" />
              <text x={148} y={78} fill="#fbbf24" fontSize={10} fontFamily="monospace">R = {resOhm} ohm</text>
              <polygon points="200,30 200,60 232,45" fill="none" stroke="#38bdf8" strokeWidth={2} />
              <line x1="232" y1="30" x2="232" y2="60" stroke="#38bdf8" strokeWidth={2} />
              <text x={198} y={78} fill="#38bdf8" fontSize={10} fontFamily="monospace">diode</text>
              <path d="M 232 45 L 300 45 L 300 15 M 300 15 L 295 24 M 300 15 L 305 24" stroke="#94a3b8" strokeWidth={2} fill="none" />
              <text x={310} y={22} fill="#6ee7b7" fontSize={10} fontFamily="monospace">{(q.iD * 1000).toFixed(1)} mA</text>
            </svg>
            <div className="text-xs font-mono grid grid-cols-3 gap-2 mt-1">
              <div><span className="text-slate-500">VD across diode</span><div className="text-pink-300 font-bold text-sm">{q.vD.toFixed(3)} V</div></div>
              <div><span className="text-slate-500">Dynamic resistance VT/ID</span><div className="text-gold-300 font-bold text-sm">{rd < 1e6 ? rd.toFixed(1) + ' ohm' : '--'}</div></div>
              <div><span className="text-slate-500">Diode dissipation</span><div className="text-amber-300 font-bold text-sm">{pDiode.toFixed(2)} mW</div></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Supply voltage Vs</span><span className="font-mono font-bold text-emerald-400">{supply} V</span>
              </div>
              <input type="range" min={0.5} max={12} step={0.1} value={supply} aria-label="Supply voltage"
                onChange={(e) => setSupply(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Series resistor R</span><span className="font-mono font-bold text-amber-400">{resOhm} ohm</span>
              </div>
              <input type="range" min={50} max={2000} step={10} value={resOhm} aria-label="Series resistance"
                onChange={(e) => setResOhm(Number(e.target.value))} className="w-full accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Junction temperature</span><span className="font-mono font-bold text-gold-400">{tempK} K (VT = {vT.toFixed(4)} V)</span>
              </div>
              <input type="range" min={250} max={420} step={5} value={tempK} aria-label="Temperature"
                onChange={(e) => setTempK(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Saturation current I0</span><span className="font-mono font-bold text-pink-400">{i0 >= 1e-6 ? (i0 * 1e6).toFixed(0) + ' uA' : (i0 * 1e9).toFixed(1) + ' nA'}</span>
              </div>
              <input type="range" min={0} max={4} step={1} value={i0Idx} aria-label="Saturation current"
                onChange={(e) => setI0Idx(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <button onClick={() => setShowLoadLine((s) => !s)}
              className={`w-full py-2 rounded-xl text-xs font-bold ${showLoadLine ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
              {showLoadLine ? 'Hide load line' : 'Show load line'}
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-orange-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-orange-300 font-bold">Verification</div>
            <div className="text-slate-400">KVL: {supply} = {q.vD.toFixed(3)} + {(q.iD * resOhm).toFixed(3)} V across R -- sums to {(q.vD + q.iD * resOhm).toFixed(3)} V</div>
            <div className="text-slate-400">Reverse bias: I = -I0 = {i0 >= 1e-6 ? (i0 * 1e6).toFixed(0) + ' uA' : (i0 * 1e9).toFixed(1) + ' nA'} -- a few stray carriers only</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              The diode curve is brutally exponential: every +18 mV near room temperature DOUBLES the
              forward current. That is why a diode is never wired straight across a battery -- the
              series resistor sets a load line and the circuit settles where the two graphs cross.
              Doubling R halves the load-line current intercept, sliding the Q-point down the knee.
            </p>
          </div>

          <div className="bg-orange-950/40 rounded-2xl border border-orange-800/50 p-4 text-xs">
            <p className="font-bold text-orange-300 mb-1">What to try</p>
            <p>1. Heat the junction from 250 K to 420 K with Vs and R fixed: VD should FALL (roughly -2 mV/K). Watch the Q-point move.</p>
            <p>2. Make R = 50 ohm with Vs = 12 V and read the dissipation -- explain why the diode would burn without the resistor limiting current.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim;
