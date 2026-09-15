'use client';
/**
 * C7_ScienceElectricityTorchlightSim (Class 7 Science)
 *
 * ELI5: A torch hides a circuit inside! Two cells push the current, a switch
 * makes a gap, and a bulb needs BOTH contacts -- its bottom tip AND its metal
 * side. Break the loop anywhere and the light dies. Flip one cell and the two
 * pushes cancel: even good batteries give 0 volts.
 */
import React, { useEffect, useState } from 'react';

// ─── Knowledge-graph node wiring ───
const NODE_C7_PHY_028 = 'c7_phy_028'; // Electric current as flow of charge
const NODE_C7_PHY_029 = 'c7_phy_029'; // Circuit components (cell, bulb, switch)
export const ALL_NODE_IDS = [NODE_C7_PHY_028, NODE_C7_PHY_029];

const CELL_V = 1.5; // volts per dry cell
const BULB_R = 6;   // ohms, torch bulb
const FULL_I = 0.5; // amps for full brightness (3 V / 6 ohm)

export function C7_ScienceElectricityTorchlightSim() {
  const [ori, setOri] = useState<[number, number]>([1, 1]); // +1 = + end toward bulb, -1 = flipped
  const [contact, setContact] = useState(90);               // % tightness of bulb in holder
  const [on, setOn] = useState(true);
  const [schematic, setSchematic] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => { setT((v) => v + 0.016); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const voltage = (ori[0] + ori[1]) * CELL_V;
  const switchClosed = on;
  const tipTouch = contact >= 60;      // bottom tip of bulb touches the metal strip
  const loopClosed = switchClosed && tipTouch;
  const current = loopClosed ? voltage / BULB_R : 0;
  const brightness = Math.max(0, Math.min(1, current / FULL_I));
  const flicker = brightness > 0 ? 0.9 + 0.1 * Math.sin(t * 18) : 0;
  const glow = brightness * flicker;
  const status = !switchClosed ? 'Open at the switch' : !tipTouch ? 'Open at the bulb side' : voltage <= 0 ? 'Closed but cells cancel' : 'Closed loop: current flows';

  const flip = (i: number) => setOri((o) => { const n: [number, number] = [...o] as [number, number]; n[i] = -n[i]; return n; });
  const reset = () => { setOri([1, 1]); setContact(90); setOn(true); setSchematic(false); };

  const cellX = [165, 250];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 7 Science - Electricity: Circuits and their Components</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Open a Torch: the Hidden Circuit</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <p className="text-xs text-slate-400 mb-3">A torch is just a circuit in a tube: 2 cells + a switch + a bulb. Flip a battery, loosen the bulb, press the switch -- and watch the loop.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <button onClick={() => flip(0)} className="w-full min-h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all">Flip cell 1 {ori[0] > 0 ? '(+ toward bulb)' : '(+ toward spring)'}</button>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <button onClick={() => flip(1)} className="w-full min-h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all">Flip cell 2 {ori[1] > 0 ? '(+ toward bulb)' : '(+ toward spring)'}</button>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Bulb tightness in holder</span>
            <span className="text-indigo-300 font-mono font-bold">{contact} %</span>
          </label>
          <input type="range" min={40} max={100} step={1} value={contact} aria-label="bulb contact tightness"
            onChange={(e) => setContact(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-indigo-500" />
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-3">
        <svg viewBox="0 0 560 230" className="w-full h-52 md:h-60" preserveAspectRatio="xMidYMid meet">
          {/* light beam */}
          <polygon points="478,100 560,58 560,172 478,130" fill="#fde68a" style={{ opacity: glow * 0.55, transition: 'opacity 0.25s' }} />
          {/* barrel */}
          <rect x={120} y={88} width={300} height={54} rx={14} fill="#334155" stroke="#475569" strokeWidth={2} />
          <rect x={420} y={80} width={52} height={70} rx={10} fill="#475569" stroke="#64748b" strokeWidth={2} />
          {/* spring at back */}
          <path d="M 128 115 q 6 -12 12 0 q 6 12 12 0" fill="none" stroke="#94a3b8" strokeWidth={3} />
          {/* cells */}
          {[0, 1].map((i) => (
            <g key={i}>
              <rect x={cellX[i]} y={100} width={70} height={30} rx={5} fill="#0ea5e9" stroke="#7dd3fc" strokeWidth={1.5} style={{ transition: 'all 0.3s' }} />
              {ori[i] > 0 ? (
                <>
                  <rect x={cellX[i] + 62} y={100} width={8} height={30} rx={2} fill="#e2e8f0" />
                  <text x={cellX[i] + 66} y={96} fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
                </>
              ) : (
                <>
                  <rect x={cellX[i]} y={100} width={8} height={30} rx={2} fill="#e2e8f0" />
                  <text x={cellX[i] + 4} y={96} fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
                </>
              )}
            </g>
          ))}
          {/* bulb */}
          <circle cx={446} cy={115} r={16} fill={brightness > 0 ? '#fbbf24' : '#1e293b'} stroke={tipTouch ? '#94a3b8' : '#f87171'} strokeWidth={2} style={{ transition: 'fill 0.3s' }} />
          <path d="M 440 122 L 446 110 L 452 122" fill="none" stroke={brightness > 0 ? '#fef3c7' : '#64748b'} strokeWidth={2} />
          <circle cx={446} cy={115} r={22} fill="#f59e0b" style={{ opacity: glow * 0.4, transition: 'opacity 0.2s' }} />
          <text x={446} y={165} fill={tipTouch ? '#94a3b8' : '#f87171'} fontSize="9" textAnchor="middle">{tipTouch ? 'tip + side both touch' : 'side contact OPEN'}</text>
          {/* switch slider on barrel -- tap it to press the switch */}
          <g onClick={() => setOn((s) => !s)} style={{ cursor: 'pointer' }}>
            <rect x={350} y={96} width={44} height={38} rx={8} fill="#0f172a" stroke="#64748b" strokeWidth={1.5} />
            <rect x={on ? 384 : 354} y={102} width={10} height={26} rx={3} fill="#a5b4fc" style={{ transition: 'x 0.3s' }} />
          </g>
          <text x={372} y={92} fill="#94a3b8" fontSize="9" textAnchor="middle">switch {on ? 'ON' : 'OFF'} (tap)</text>
          {/* schematic overlay */}
          {schematic && (
            <g fill="none" stroke="#a5b4fc" strokeWidth={2}>
              <path d="M 60 200 H 250 M 310 200 H 446 M 446 200 V 135 M 446 135 V 115 M 60 200 V 60 H 372 M 372 60 V 30 H 446 M 446 30 V 99" strokeDasharray="10 8" strokeDashoffset={`${-t * 60}`} />
              {/* battery symbol */}
              <path d="M 250 188 V 212 M 262 192 V 208 M 274 188 V 212 M 286 192 V 208" />
              <text x={262} y={228} fill="#a5b4fc" fontSize="9" stroke="none">cells (long = +)</text>
              {/* switch symbol */}
              <path d="M 310 200 L 340 184" />
              {/* bulb symbol */}
              <path d="M 438 107 L 454 123 M 454 107 L 438 123" />
            </g>
          )}
        </svg>
        <button onClick={() => setSchematic((s) => !s)} className="min-h-11 px-3 mb-1 ml-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all">
          {schematic ? 'Hide circuit diagram' : 'Show circuit diagram'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Cell push (voltage)</p>
          <p className={`text-lg font-extrabold font-mono ${voltage <= 0 ? 'text-rose-300' : 'text-sky-300'}`}>{voltage.toFixed(1)} V</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Current in loop</p>
          <p className={`text-lg font-extrabold font-mono ${current <= 0 ? 'text-rose-300' : 'text-amber-300'}`}>{current.toFixed(2)} A</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Brightness</p>
          <p className="text-lg font-extrabold font-mono text-yellow-300">{Math.round(brightness * 100)} %</p>
        </div>
        <div className={`p-3 rounded-2xl border text-center ${current > 0 ? 'bg-emerald-950/60 border-emerald-700' : 'bg-rose-950/60 border-rose-700'}`}>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">The loop</p>
          <p className={`text-xs font-bold ${current > 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{status}</p>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <span className="font-bold text-emerald-300">Misconception killer:</span> cells do not work &quot;any which way&quot;. They push like two people pushing a cart -- one flipped cell pushes BACK, so two good cells can give 0 volts. And a bulb needs TWO contacts: the bottom tip AND the metal side. Loose it is, and the loop is open even with the switch ON.
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Turn the torch on, then flip cell 2. Read the voltage: why do two perfectly good cells now give 0.0 V?</p>
        <p className="mt-1">2. Slide bulb tightness down slowly until the light just dies. Which contact opened -- the tip, or the metal side? Then show the circuit diagram and point at the gap.</p>
      </footer>
    </div>
  );
}

export default C7_ScienceElectricityTorchlightSim;
