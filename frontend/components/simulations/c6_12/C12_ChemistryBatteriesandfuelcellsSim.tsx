"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c12_chem_021',
  'c12_chem_022',
  'c12_chem_023',
  'c12_chem_024',
  'c12_chem_025',
  'c12_chem_026',
  'c12_chem_027',
  'c12_chem_028',
  'c12_chem_029',
  'c12_chem_030'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface NodeInfo {
  id: NodeId;
  title: string;
  tagline: string;
  color: string;
}

const NODE_INFO: Record<NodeId, NodeInfo> = {
  c12_chem_021: { id: 'c12_chem_021', title: 'Batteries & Fuel Cells', tagline: 'Portable Electrochemistry & Energy', color: '#3B82F6' },
  c12_chem_022: { id: 'c12_chem_022', title: 'Corrosion', tagline: 'Unwanted Micro-Galvanic Cells', color: '#EF4444' },
  c12_chem_023: { id: 'c12_chem_023', title: 'Rate of Reaction', tagline: 'Speed of Concentration Changes', color: '#10B981' },
  c12_chem_024: { id: 'c12_chem_024', title: 'Rate Law & Order', tagline: 'Experimental Dependencies', color: '#8B5CF6' },
  c12_chem_025: { id: 'c12_chem_025', title: 'Molecularity vs Order', tagline: 'Theoretical vs Experimental Steps', color: '#EC4899' },
  c12_chem_026: { id: 'c12_chem_026', title: 'Integrated Rate Equations', tagline: 'Concentration vs Time Formulas', color: '#F59E0B' },
  c12_chem_027: { id: 'c12_chem_027', title: 'Half-Life of Reactions', tagline: 'Time to Reach 50% Concentration', color: '#6366F1' },
  c12_chem_028: { id: 'c12_chem_028', title: 'Collision Theory', tagline: 'Energy Barriers & Orientation', color: '#14B8A6' },
  c12_chem_029: { id: 'c12_chem_029', title: 'Arrhenius Equation', tagline: 'Temperature & Activation Energy', color: '#F97316' },
  c12_chem_030: { id: 'c12_chem_030', title: 'Surface Adsorption', tagline: 'Physisorption vs Chemisorption', color: '#06B6D4' }
};

interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  misconceptionId?: string;
  interactiveType?: 'battery' | 'corrosion' | 'kinetics' | 'halflife' | 'arrhenius' | 'adsorption';
  targetValue?: number;
}

// ==========================================
// INTERACTIVE VISUAL COMPONENTS
// ==========================================

// 1. Battery & Fuel Cell Visualizer
const BatteryFuelCellVisual: React.FC<{
  cellType: 'dry' | 'lead' | 'fuel';
  state: 'discharging' | 'charging';
  onStateToggle?: () => void;
}> = ({ cellType, state, onStateToggle }) => {
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimFrame(f => (f + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-between min-h-[320px] text-white relative overflow-hidden shadow-xl">
      <div className="flex justify-between w-full items-center mb-2 px-2">
        <span className="font-bold text-sm text-blue-400 uppercase tracking-wider">
          {cellType === 'dry' ? 'Leclanché Dry Cell (Primary)' : cellType === 'lead' ? `Lead Storage Cell (${state})` : 'H₂-O₂ Fuel Cell (Continuous)'}
        </span>
        {cellType === 'lead' && (
          <button
            onClick={onStateToggle}
            className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition-colors"
          >
            Switch to {state === 'discharging' ? 'Charging Mode' : 'Discharge Mode'}
          </button>
        )}
      </div>

      {/* Main Schematic Graphic */}
      <svg className="w-full h-56" viewBox="0 0 500 220">
        <defs>
          <linearGradient id="anodeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="cathodeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="electrolyteGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Outer Container / Tank */}
        <rect x="60" y="50" width="380" height="150" rx="10" fill="url(#electrolyteGrad)" stroke="#475569" strokeWidth="3" />

        {/* Electrodes */}
        {cellType === 'dry' && (
          <>
            {/* Zinc outer container */}
            <path d="M 60 50 L 60 200 L 440 200 L 440 50" fill="none" stroke="#94a3b8" strokeWidth="12" />
            {/* Carbon Cathode Rod */}
            <rect x="235" y="30" width="30" height="150" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
            <text x="250" y="20" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
            <text x="60" y="40" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">-</text>

            {/* Electrolyte Label */}
            <text x="140" y="130" fill="#93c5fd" fontSize="11">Moist Paste:</text>
            <text x="140" y="145" fill="#cbd5e1" fontSize="10">NH₄Cl + ZnCl₂ + MnO₂</text>
            <text x="320" y="130" fill="#fef08a" fontSize="11">Cathode Reaction:</text>
            <text x="320" y="145" fill="#cbd5e1" fontSize="10">MnO₂ + NH₄⁺ + e⁻ → MnO(OH) + NH₃</text>
          </>
        )}

        {cellType === 'lead' && (
          <>
            {/* Lead Anode Plate */}
            <rect x="120" y="40" width="40" height="140" rx="4" fill="url(#anodeGrad)" stroke="#cbd5e1" strokeWidth="2" />
            {/* Lead Dioxide Cathode Plate */}
            <rect x="340" y="40" width="40" height="140" rx="4" fill="url(#cathodeGrad)" stroke="#fbbf24" strokeWidth="2" />

            <text x="140" y="30" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">{state === 'discharging' ? '-' : '+'}</text>
            <text x="360" y="30" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">{state === 'discharging' ? '+' : '-'}</text>

            <text x="140" y="100" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">Pb</text>
            <text x="360" y="100" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">PbO₂</text>

            {/* Electrolyte density */}
            <text x="250" y="170" fill="#93c5fd" fontSize="11" textAnchor="middle">
              Dilute H₂SO₄ ({state === 'discharging' ? 'Density ~ 1.25 → 1.15 g/cm³' : 'Density Restores to ~1.25 g/cm³'})
            </text>
          </>
        )}

        {cellType === 'fuel' && (
          <>
            {/* Porous Carbon Anode */}
            <rect x="130" y="40" width="30" height="140" fill="#334155" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 2" />
            {/* Porous Carbon Cathode */}
            <rect x="340" y="40" width="30" height="140" fill="#334155" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />

            {/* Continuous Gas Inlets */}
            <path d="M 40 100 L 130 100" stroke="#60a5fa" strokeWidth="6" markerEnd="url(#arrow)" />
            <text x="80" y="90" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">H₂ gas in</text>

            <path d="M 460 100 L 370 100" stroke="#f43f5e" strokeWidth="6" />
            <text x="425" y="90" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">O₂ gas in</text>

            {/* Water Outlet */}
            <path d="M 250 190 L 250 215" stroke="#38bdf8" strokeWidth="4" />
            <text x="250" y="210" fill="#38bdf8" fontSize="10" textAnchor="middle">H₂O product out</text>

            <text x="250" y="110" fill="#e2e8f0" fontSize="11" textAnchor="middle">Hot Aqueous KOH Electrolyte</text>
          </>
        )}

        {/* External Circuit with Moving Electrons */}
        <path d="M 140 40 L 140 15 L 360 15 L 360 40" fill="none" stroke="#fbbf24" strokeWidth="3" />
        <circle cx="250" cy="15" r="14" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
        <text x="250" y="19" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">💡</text>

        {/* Animated Electron Flow Dots */}
        {Array.from({ length: 5 }).map((_, i) => {
          const progress = ((animFrame * 2 + i * 20) % 100) / 100;
          let ex = 140 + progress * 220;
          let ey = 15;
          if (state === 'charging' && cellType === 'lead') {
            ex = 360 - progress * 220;
          }
          return <circle key={i} cx={ex} cy={ey} r="4" fill="#38bdf8" />;
        })}
      </svg>

      <div className="text-xs text-center text-slate-300 bg-slate-800/80 p-2 rounded-lg w-full">
        {cellType === 'dry' && "Anode: Zn → Zn²⁺ + 2e⁻ | Cathode: 2NH₄⁺ + 2MnO₂ + 2e⁻ → Mn₂O₃ + 2NH₃ + H₂O. Non-rechargeable!"}
        {cellType === 'lead' && state === 'discharging' && "Discharge: Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O. Acid density drops!"}
        {cellType === 'lead' && state === 'charging' && "Recharging: 2PbSO₄ + 2H₂O → Pb + PbO₂ + 2H₂SO₄. Acid density restored!"}
        {cellType === 'fuel' && "Continuous Redox: 2H₂ + 4OH⁻ → 4H₂O + 4e⁻ (Anode), O₂ + 2H₂O + 4e⁻ → 4OH⁻ (Cathode). Only byproduct is H₂O!"}
      </div>
    </div>
  );
};

// 2. Corrosion Micro-Cell Visualizer
const CorrosionCellVisual: React.FC<{
  protectionMode: 'none' | 'galvanized' | 'tinCoated' | 'sacrificialMg';
}> = ({ protectionMode }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-between min-h-[320px] text-white relative shadow-xl">
      <div className="w-full flex justify-between items-center mb-1">
        <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
          Microscopic Corrosion Cell & Protection
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-600 font-semibold text-yellow-400">
          {protectionMode === 'none' ? 'Bare Iron (Scratch Exposed)' :
           protectionMode === 'galvanized' ? 'Galvanized (Zn Coated)' :
           protectionMode === 'tinCoated' ? 'Tin Plated (Scratched)' : 'Sacrificial Mg Anode'}
        </span>
      </div>

      <svg className="w-full h-56" viewBox="0 0 500 210">
        {/* Metal Base Block (Iron) */}
        <rect x="50" y="110" width="400" height="80" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
        <text x="250" y="155" fill="#e2e8f0" fontSize="16" fontWeight="bold" textAnchor="middle">Iron Substrate (Fe)</text>

        {/* Protection Coating Layers */}
        {protectionMode === 'galvanized' && (
          <>
            <rect x="50" y="95" width="170" height="15" fill="#a1a1aa" />
            <rect x="280" y="95" width="170" height="15" fill="#a1a1aa" />
            <text x="135" y="106" fill="#18181b" fontSize="10" fontWeight="bold" textAnchor="middle">Zinc (Zn) Layer</text>
            <text x="365" y="106" fill="#18181b" fontSize="10" fontWeight="bold" textAnchor="middle">Zinc (Zn) Layer</text>
          </>
        )}

        {protectionMode === 'tinCoated' && (
          <>
            <rect x="50" y="95" width="170" height="15" fill="#fbbf24" />
            <rect x="280" y="95" width="170" height="15" fill="#fbbf24" />
            <text x="135" y="106" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">Tin (Sn) Layer</text>
            <text x="365" y="106" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">Tin (Sn) Layer</text>
          </>
        )}

        {protectionMode === 'sacrificialMg' && (
          <>
            <rect x="360" y="60" width="60" height="40" fill="#38bdf8" stroke="#7dd3fc" strokeWidth="2" />
            <text x="390" y="84" fill="#0c4a6e" fontSize="11" fontWeight="bold" textAnchor="middle">Mg Block</text>
            {/* Wire link */}
            <path d="M 390 60 L 390 30 L 150 30 L 150 110" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 2" />
          </>
        )}

        {/* Moisture Drop / Water Film Drop */}
        <path d="M 180 110 Q 250 20 320 110 Z" fill="#38bdf8" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2" />
        <text x="250" y="70" fill="#7dd3fc" fontSize="11" textAnchor="middle">Moist Air / Electrolyte Drop (H₂O + O₂ + H⁺)</text>

        {/* Reaction Annotations based on mode */}
        {protectionMode === 'none' && (
          <>
            <text x="200" y="130" fill="#ef4444" fontSize="10" fontWeight="bold">Anode: Fe → Fe²⁺ + 2e⁻</text>
            <text x="280" y="95" fill="#34d399" fontSize="10" fontWeight="bold">Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O</text>
            {/* Rust formation note */}
            <text x="250" y="180" fill="#f97316" fontSize="11" textAnchor="middle" fontWeight="bold">
              Rust Forms: 2Fe²⁺ + O₂ + 4H₂O → Fe₂O₃·xH₂O (Reddish Brown Flakes)
            </text>
          </>
        )}

        {protectionMode === 'galvanized' && (
          <>
            <text x="100" y="80" fill="#a1a1aa" fontSize="11" fontWeight="bold">Sacrificial Anode: Zn → Zn²⁺ + 2e⁻</text>
            <text x="250" y="130" fill="#34d399" fontSize="11" fontWeight="bold">Fe acts as Protected Cathode!</text>
            <text x="250" y="180" fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold">
              Zinc corrodes preferentially (E° Zn²⁺/Zn = -0.76V vs Fe²⁺/Fe = -0.44V)
            </text>
          </>
        )}

        {protectionMode === 'tinCoated' && (
          <>
            <text x="250" y="130" fill="#ef4444" fontSize="11" fontWeight="bold">Iron Fe is MORE reactive than Sn (E° Sn²⁺/Sn = -0.14V)</text>
            <text x="250" y="180" fill="#f87171" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ DANGER: Scratched Tin accelerates Fe rusting by making Fe the Anode!
            </text>
          </>
        )}

        {protectionMode === 'sacrificialMg' && (
          <>
            <text x="390" y="50" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">Mg dissolves (Anode)</text>
            <text x="250" y="180" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
              Electrons flow to Fe pipeline → Pipe remains intact Cathode!
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

// 3. Collision Kinetics & Arrhenius Visualizer
const CollisionKineticsVisual: React.FC<{
  temp: number; // 25 to 100 deg C
  hasCatalyst: boolean;
  onTempChange: (t: number) => void;
  onCatalystToggle: () => void;
}> = ({ temp, hasCatalyst, onTempChange, onCatalystToggle }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute Ea and threshold
  const baseEa = 50; // kJ/mol
  const effectiveEa = hasCatalyst ? 25 : baseEa;
  const tempK = temp + 273;
  const kVal = (1e6 * Math.exp(-effectiveEa * 1000 / (8.314 * tempK))).toFixed(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (temp / 15),
      vy: (Math.random() - 0.5) * (temp / 15),
      radius: 6,
      color: Math.random() > 0.5 ? '#38bdf8' : '#f59e0b'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particle dynamics
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 10 || p.x > canvas.width - 10) p.vx *= -1;
        if (p.y < 10 || p.y > canvas.height - 10) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [temp]);

  return (
    <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between text-white shadow-xl">
      {/* Simulation Controls & Canvas */}
      <div className="flex-1 flex flex-col items-center">
        <div className="flex justify-between w-full text-xs font-bold mb-2">
          <span className="text-emerald-400">Molecular Collisions Simulation</span>
          <span className="text-orange-400">T = {temp}°C ({tempK} K)</span>
        </div>
        <div className="relative border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
          <canvas ref={canvasRef} width={280} height={180} />
          {hasCatalyst && (
            <div className="absolute top-2 left-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded font-bold">
              ⚡ Catalyst Active
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 w-full max-w-xs">
          <label className="text-xs font-semibold text-slate-300">Temp:</label>
          <input
            type="range"
            min="25"
            max="100"
            value={temp}
            onChange={e => onTempChange(Number(e.target.value))}
            className="flex-1 accent-orange-500 cursor-pointer"
          />
          <button
            onClick={onCatalystToggle}
            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
              hasCatalyst ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600'
            }`}
          >
            {hasCatalyst ? 'Remove Catalyst' : 'Add Catalyst'}
          </button>
        </div>
      </div>

      {/* Energy Profile Curve */}
      <div className="flex-1 flex flex-col items-center w-full">
        <span className="text-xs font-bold text-slate-300 mb-1">Energy Profile & Activation Barrier (Ea)</span>
        <svg className="w-full h-44" viewBox="0 0 260 160">
          {/* Axes */}
          <path d="M 30 140 L 240 140" stroke="#64748b" strokeWidth="2" />
          <path d="M 30 140 L 30 20" stroke="#64748b" strokeWidth="2" />
          <text x="135" y="155" fill="#94a3b8" fontSize="10" textAnchor="middle">Reaction Progress</text>
          <text x="15" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 15 80)">Enthalpy (H)</text>

          {/* Reactants level */}
          <line x1="30" y1="100" x2="70" y2="100" stroke="#38bdf8" strokeWidth="3" />
          <text x="50" y="90" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Reactants</text>

          {/* Uncatalyzed Curve */}
          <path
            d="M 70 100 Q 125 10 180 120"
            fill="none"
            stroke="#f97316"
            strokeWidth={hasCatalyst ? "1.5" : "3"}
            strokeDasharray={hasCatalyst ? "4 2" : "none"}
            opacity={hasCatalyst ? 0.5 : 1}
          />

          {/* Catalyzed Curve */}
          {hasCatalyst && (
            <path d="M 70 100 Q 125 55 180 120" fill="none" stroke="#10b981" strokeWidth="3" />
          )}

          {/* Products level */}
          <line x1="180" y1="120" x2="230" y2="120" stroke="#a7f3d0" strokeWidth="3" />
          <text x="205" y="110" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold">Products</text>

          {/* Ea Arrow */}
          <line x1="125" y1="100" x2="125" y2={hasCatalyst ? 55 : 30} stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="135" y={hasCatalyst ? 70 : 45} fill="#fbbf24" fontSize="10" fontWeight="bold">
            Ea = {effectiveEa} kJ/mol
          </text>
        </svg>

        <div className="bg-slate-800 p-2 rounded text-center text-xs text-slate-300 w-full mt-1">
          Arrhenius: <span className="text-orange-400 font-mono">k = A e^(-Ea/RT)</span>
          <br />
          Relative Rate Constant k ≈ <span className="text-emerald-400 font-bold font-mono">{kVal}</span>
        </div>
      </div>
    </div>
  );
};

// 4. Integrated Rate & Half-life Plotter
const IntegratedRateVisual: React.FC<{
  order: 0 | 1;
  initialConc: number;
  kConst: number;
}> = ({ order, initialConc, kConst }) => {
  const halfLife = order === 0 ? (initialConc / (2 * kConst)).toFixed(1) : (0.693 / kConst).toFixed(1);

  // Generate data points for concentration vs time
  const points = useMemo(() => {
    const pts = [];
    for (let t = 0; t <= 50; t += 2) {
      let conc = 0;
      if (order === 0) {
        conc = Math.max(0, initialConc - kConst * t * 0.1);
      } else {
        conc = initialConc * Math.exp(-kConst * t * 0.05);
      }
      pts.push({ t, conc });
    }
    return pts;
  }, [order, initialConc, kConst]);

  return (
    <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-between text-white shadow-xl min-h-[300px]">
      <div className="flex justify-between w-full items-center mb-2">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
          {order === 0 ? 'Zero-Order Kinetics ([A] = [A]₀ - kt)' : 'First-Order Kinetics (ln[A] = ln[A]₀ - kt)'}
        </span>
        <span className="text-xs bg-indigo-950 border border-indigo-700 px-2 py-0.5 rounded text-indigo-300 font-semibold">
          t₁/₂ = {halfLife} s ({order === 0 ? 'Depends on [A]₀' : 'Independent of [A]₀!'})
        </span>
      </div>

      <svg className="w-full h-48" viewBox="0 0 450 180">
        {/* Axes */}
        <line x1="50" y1="150" x2="420" y2="150" stroke="#64748b" strokeWidth="2" />
        <line x1="50" y1="150" x2="50" y2="20" stroke="#64748b" strokeWidth="2" />
        <text x="235" y="172" fill="#94a3b8" fontSize="10" textAnchor="middle">Time (t / s)</text>
        <text x="20" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 20 85)">[A] (mol L⁻¹)</text>

        {/* Plotting Line */}
        <path
          d={points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${50 + p.t * 7} ${150 - (p.conc / initialConc) * 120}`).join(' ')}
          fill="none"
          stroke={order === 0 ? '#f59e0b' : '#6366f1'}
          strokeWidth="3"
        />

        {/* Half Life Guide Lines */}
        <line x1="50" y1="90" x2="420" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
        <text x="425" y="93" fill="#cbd5e1" fontSize="9">[A]₀ / 2</text>

        {/* Mark Half Life Point */}
        <circle cx={50 + Number(halfLife) * 7} cy="90" r="5" fill="#ef4444" />
        <line x1={50 + Number(halfLife) * 7} y1="90" x2={50 + Number(halfLife) * 7} y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x={50 + Number(halfLife) * 7} y="163" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">t₁/₂</text>
      </svg>

      <div className="grid grid-cols-2 gap-2 text-xs w-full bg-slate-800/80 p-2 rounded">
        <div>
          <span className="text-slate-400">Zero-Order Linear Plot:</span>
          <span className="font-mono text-amber-400 ml-1">[A] vs t</span>
        </div>
        <div>
          <span className="text-slate-400">First-Order Linear Plot:</span>
          <span className="font-mono text-indigo-400 ml-1">ln[A] vs t</span>
        </div>
      </div>
    </div>
  );
};

// 5. Surface Adsorption Visualizer
const AdsorptionSurfaceVisual: React.FC<{
  type: 'physisorption' | 'chemisorption';
  temp: number;
}> = ({ type, temp }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-between text-white shadow-xl min-h-[300px]">
      <div className="flex justify-between w-full items-center mb-1">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
          {type === 'physisorption' ? 'Physisorption (Weak van der Waals)' : 'Chemisorption (Chemical Bond Formation)'}
        </span>
        <span className="text-xs bg-slate-800 border border-slate-600 px-2 py-0.5 rounded text-cyan-300">
          Temp: {temp}°C
        </span>
      </div>

      <svg className="w-full h-44" viewBox="0 0 450 170">
        {/* Solid Adsorbent Matrix */}
        <rect x="40" y="110" width="370" height="50" fill="#334155" stroke="#64748b" strokeWidth="2" />
        <text x="225" y="140" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">
          Solid Adsorbent (e.g., Powdered Charcoal / Ni)
        </text>

        {/* Surface Unbalanced Valence Forces (Dangling bonds) */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={60 + i * 42} y1="110" x2={60 + i * 42} y2="95" stroke="#06b6d4" strokeWidth="2" strokeDasharray="2 2" />
        ))}

        {/* Adsorbate Molecules */}
        {type === 'physisorption' ? (
          <>
            {/* Multi-layered weak attachment */}
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={i} transform={`translate(${60 + i * 42}, ${temp > 60 ? 40 + (i % 3) * 20 : 85})`}>
                <circle cx="0" cy="0" r="10" fill="#38bdf8" fillOpacity="0.8" stroke="#7dd3fc" />
                <text x="0" y="3" fill="#0c4a6e" fontSize="8" textAnchor="middle" fontWeight="bold">Gas</text>
              </g>
            ))}
            <text x="225" y="30" fill="#7dd3fc" fontSize="11" textAnchor="middle">
              {temp > 60 ? '⚠️ High Temp causes Desorption (Molecules fly off)' : 'Low Heat of Adsorption (20-40 kJ/mol), Reversible & Multilayer'}
            </text>
          </>
        ) : (
          <>
            {/* Monolayer chemical bonding */}
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={i} transform={`translate(${60 + i * 42}, 82)`}>
                <line x1="0" y1="13" x2="0" y2="28" stroke="#f43f5e" strokeWidth="3" />
                <circle cx="0" cy="0" r="11" fill="#f43f5e" stroke="#fda4af" />
                <text x="0" y="3" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">H</text>
              </g>
            ))}
            <text x="225" y="30" fill="#fda4af" fontSize="11" textAnchor="middle">
              High Heat of Adsorption (80-240 kJ/mol), Specific, Irreversible & Monolayer
            </text>
          </>
        )}
      </svg>

      <div className="text-xs text-center text-slate-300 bg-slate-800/80 p-2 rounded w-full">
        {type === 'physisorption'
          ? "Physisorption decreases continuously with increasing temperature."
          : "Chemisorption first increases with temperature (requires activation energy) and then decreases at high T due to desorption."}
      </div>
    </div>
  );
};

// ==========================================
// SCENARIO & TEACHING DATA
// ==========================================

const SCENARIO = {
  title: "Class 12 Chemistry: Energy, Rates & Surface Chemistry Laboratory",
  description: "Step into an advanced electrochemical & kinetics virtual lab. Master primary/secondary batteries, corrosion micro-cells, order of reaction, integrated rate laws, Arrhenius temperature dependence, and surface adsorption."
};

const DISCOVERY_QUESTION = {
  question: "A student notices that a car battery (lead accumulator) can be recharged repeatedly, whereas a dry cell in a torch must be thrown away once spent. What is the fundamental chemical difference?",
  options: [
    "The lead accumulator stores electricity directly as static charge, whereas the dry cell makes electricity from heat.",
    "In the lead accumulator, discharge products (PbSO₄) stay attached to the electrodes and can be chemically reversed by an external direct current.",
    "The dry cell has no electrolyte, so it runs out of electrons immediately.",
    "The lead accumulator uses liquid fuel supplied continuously through external pipes."
  ],
  correctAnswer: 1,
  explanation: "Correct! In secondary cells like the lead accumulator, the discharge product (PbSO₄) remains on the electrodes. Passing a reverse DC forces the chemical reaction backwards (regenerating Pb, PbO₂, and H₂SO₄). In primary dry cells, the zinc container is consumed and products cannot easily be restored."
};

interface Slide {
  id: number;
  nodeId: NodeId;
  title: string;
  concept: string;
  content: string;
  interactiveComponent?: 'battery' | 'corrosion' | 'kinetics' | 'halflife' | 'adsorption';
}

const TEACHING_SLIDES: Slide[] = [
  {
    id: 1,
    nodeId: 'c12_chem_021',
    title: 'Batteries & Fuel Cells',
    concept: 'Primary, Secondary, and Continuous Fuel Cells',
    content: `Galvanic cells convert spontaneous redox chemical energy directly into electrical energy.
• Primary Cells: Non-rechargeable (e.g., Leclanché Dry Cell & Mercury Cell). The zinc anode is consumed or products disperse. Mercury cell gives a constant voltage throughout its life because no ion concentrations change overall.
• Secondary Cells: Rechargeable (e.g., Lead Storage Battery). Discharge reaction: Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O. Sulphuric acid density falls during discharge (~1.25 to 1.15 g/cm³) and is regenerated during charging.
• Fuel Cells: Continuous supply of reactants (H₂ + O₂). Highly efficient, producing only H₂O with zero toxic emissions.`,
    interactiveComponent: 'battery'
  },
  {
    id: 2,
    nodeId: 'c12_chem_022',
    title: 'Corrosion: Microscopic Electrochemical Attack',
    concept: 'Rusting of Iron & Protection Methods',
    content: `Corrosion is the electrochemical destruction of metals by environmental moisture and oxygen.
• Anode site: Fe(s) → Fe²⁺(aq) + 2e⁻
• Cathode site: O₂(g) + 4H⁺(aq) + 4e⁻ → 2H₂O(l)
• Overall Rust: 2Fe²⁺ + O₂ + 4H₂O → Fe₂O��·xH₂O (hydrated iron(III) oxide).
• Galvanisation: Coating iron with Zinc. Zinc has lower reduction potential (E° = -0.76V) than iron (E° = -0.44V), so Zn acts as a sacrificial anode even if scratched.
• Danger of Tin coating: Tin (E° = -0.14V) is less reactive than iron. If scratched, exposed iron becomes the anode and rusts faster!`,
    interactiveComponent: 'corrosion'
  },
  {
    id: 3,
    nodeId: 'c12_chem_023',
    title: 'Chemical Kinetics: Rate of Reaction',
    concept: 'Average vs Instantaneous Rate & Factors',
    content: `Rate of reaction is the change in concentration of a reactant or product per unit time: Rate = -d[R]/dt = +d[P]/dt.
• Rate is ALWAYS positive. Negative sign for reactants accounts for their disappearance.
• Unified Rate for aA + bB → cC + dD:
  Rate = -(1/a)d[A]/dt = -(1/b)d[B]/dt = +(1/c)d[C]/dt = +(1/d)d[D]/dt.
• Factors: Concentration, Surface Area (powdered vs solid lump), Temperature, and Catalyst. A catalyst accelerates both forward & backward reactions without altering yield or K_eq.`,
    interactiveComponent: 'kinetics'
  },
  {
    id: 4,
    nodeId: 'c12_chem_024',
    title: 'Rate Law and Order of Reaction',
    concept: 'Experimental Rate Equation',
    content: `The Rate Law relates reaction rate to reactant molar concentrations: Rate = k[A]^m [B]^n.
• Rate constant (k): Specific rate of reaction when reactant concentrations are 1 mol L⁻¹.
• Order of reaction (m + n): The sum of powers of concentrations in the experimentally determined rate law.
• Order MUST be determined experimentally and CANNOT be assumed from stoichiometric coefficients in a balanced equation!
• Order can be 0, 1, 2, fractional, or negative. Units of k: (mol L⁻¹)^(1-n) s⁻¹.`,
    interactiveComponent: 'kinetics'
  },
  {
    id: 5,
    nodeId: 'c12_chem_025',
    title: 'Molecularity vs Order of Reaction',
    concept: 'Theoretical Elementary Step vs Experimental Overall Order',
    content: `Crucial ICSE/ISC distinction:
• Molecularity: Theoretical count of reacting molecules colliding in a single elementary step (Unimolecular=1, Bimolecular=2, Termolecular=3). Always positive integer, never zero or fractional! Has NO meaning for complex multi-step reactions.
• Order: Experimental sum of powers in rate law. Can be 0, fractional, or integer. Applies to overall complex reactions.
• The rate-determining step (slowest elementary step) dictates the overall order of a complex reaction.`,
    interactiveComponent: 'kinetics'
  },
  {
    id: 6,
    nodeId: 'c12_chem_026',
    title: 'Integrated Rate Equations',
    concept: 'Zero-Order and First-Order Equations',
    content: `Integrated rate equations connect concentration directly with time (t):
• Zero-Order Reaction: Rate = k. Formula: [A] = [A]₀ - kt. Plot of [A] vs t is a straight line (slope = -k). Units of k = mol L⁻¹ s⁻¹. Example: Decomposition of NH₃ on hot Pt surface.
• First-Order Reaction: Rate = k[A]. Formula: ln[A] = ln[A]₀ - kt or 2.303 log([A]₀/[A]) = kt. Plot of ln[A] vs t is linear (slope = -k). Units of k = s⁻¹. Example: Radioactive decay, ester hydrolysis.`,
    interactiveComponent: 'halflife'
  },
  {
    id: 7,
    nodeId: 'c12_chem_027',
    title: 'Half-Life of Reactions (t₁/₂)',
    concept: 'Time Required for 50% Reactant Disappearance',
    content: `Half-life period (t₁/₂) is the time needed for [A] to reduce to [A]₀/2:
• First-Order Half-Life: t₁/₂ = 0.693 / k. Unique property: Independent of initial concentration [A]₀!
• Zero-Order Half-Life: t₁/₂ = [A]₀ / 2k. Directly proportional to initial concentration [A]₀!
• Useful Rule for 1st order: After n half-lives, remaining fraction = (1/2)^n. 75% completion requires exactly 2 half-lives!`,
    interactiveComponent: 'halflife'
  },
  {
    id: 8,
    nodeId: 'c12_chem_028',
    title: 'Collision Theory of Reaction Rates',
    concept: 'Energy Barriers & Orientation Requirement',
    content: `For a chemical collision to produce products (Effective Collision), TWO conditions must be met:
1. Energy Factor: Colliding molecules must possess energy ≥ Activation Energy (Ea) / Threshold Energy.
2. Orientation Factor: Reacting groups must collide with proper spatial alignment.
• Activated Complex: Unstable, high-energy transition state formed at peak of energy barrier.
• Catalyst provides an alternative path with LOWER activation energy, increasing the fraction of effective collisions.`,
    interactiveComponent: 'kinetics'
  },
  {
    id: 9,
    nodeId: 'c12_chem_029',
    title: 'The Arrhenius Equation',
    concept: 'Quantifying Temperature Dependence',
    content: `Arrhenius Equation: k = A e^(-Ea / RT)
• A = Pre-exponential / frequency factor; Ea = Activation energy (J/mol); R = 8.314 J K⁻¹ mol⁻¹; T = Temperature in Kelvin.
• Logarithmic Form: log k = log A - Ea / (2.303 R T). A plot of log k vs 1/T yields a straight line with slope = -Ea / (2.303 R).
• Two-Temperature Formula: log(k₂ / k₁) = (Ea / 2.303 R) * [(T₂ - T₁) / (T₁ T₂)].
• A small 10 K rise in temperature often doubles or triples rate because the fraction of molecules with E ≥ Ea jumps exponentially!`,
    interactiveComponent: 'kinetics'
  },
  {
    id: 10,
    nodeId: 'c12_chem_030',
    title: 'Surface Chemistry: Adsorption',
    concept: 'Physisorption vs Chemisorption',
    content: `Adsorption is the accumulation of adsorbate on the surface of an adsorbent due to unbalanced surface forces.
• Physisorption: Weak van der Waals forces, reversible, low heat of adsorption (20-40 kJ/mol), forms multilayers, decreases continuously with temperature.
• Chemisorption: Strong chemical bonds, irreversible, high heat of adsorption (80-240 kJ/mol), forms monolayer, highly specific. Increases initially with T (requires activation energy) then decreases.
• Applications: Activated charcoal in gas masks, catalytic hydrogenation of vegetable oils with nickel.`,
    interactiveComponent: 'adsorption'
  }
];

// ==========================================
// COMPREHENSIVE CHALLENGES DATABASE
// ==========================================

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    nodeId: 'c12_chem_021',
    title: 'Lead Storage Battery Chemistry',
    question: 'During discharge of a lead accumulator battery in an automobile, what happens to the sulphuric acid electrolyte density and the electrode products?',
    options: [
      'Acid density rises because H₂SO₄ is produced, and lead dissolves into water.',
      'Acid density falls because H₂SO₄ is consumed to form PbSO₄ and H₂O at both electrodes.',
      'Acid density remains unchanged because it acts strictly as a catalyst.',
      'Lead dioxide is converted into lead metal while acid density increases.'
    ],
    correctAnswer: 1,
    explanation: 'Correct! The overall discharge reaction is Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O. H₂SO₄ is consumed and water is produced, causing acid density to drop from ~1.25 to 1.15 g/cm³.',
    misconceptionId: 'misc_battery_1'
  },
  {
    id: 'ch_2',
    nodeId: 'c12_chem_021',
    title: 'Fuel Cell Advantages',
    question: 'Why is a hydrogen-oxygen fuel cell NOT described as a storage battery, and what is its primary operational advantage?',
    options: [
      'It cannot produce electrical energy directly and relies on solar heat.',
      'It stores charge internally like a capacitor and requires AC charging.',
      'Reactants are continuously fed from outside, so it never runs down as long as fuel is supplied, producing clean water.',
      'It uses expensive solid catalysts that prevent any electrons from flowing.'
    ],
    correctAnswer: 2,
    explanation: 'Correct! Fuel cells are continuous energy converters rather than sealed storage devices. Fuel (H₂) and oxidant (O₂) are supplied continuously, yielding electricity and pure water without pollution.',
    misconceptionId: 'misc_fuelcell_1'
  },
  {
    id: 'ch_3',
    nodeId: 'c12_chem_022',
    title: 'Galvanisation vs Tin Coating Mechanism',
    question: 'If a galvanised iron sheet (zinc coated) and a tin-plated iron tin are both scratched, what happens electrochemically?',
    options: [
      'Both iron surfaces rust at the exact same speed.',
      'In galvanised iron, Zn (E° = -0.76V) corrodes preferentially to protect Fe. In scratched tin-plate, Fe (E° = -0.44V) is more reactive than Sn (-0.14V) and rusts FASTER!',
      'Tin sacrifices itself to save iron, while zinc causes rapid iron rusting.',
      'Zinc and tin both react with iron to form a non-corrosive stainless alloy.'
    ],
    correctAnswer: 1,
    explanation: 'Correct! Zinc is more reactive than iron and acts as a sacrificial anode. Tin is LESS reactive than iron; if the tin coating is scratched, the exposed iron becomes the anode in a micro-galvanic cell and corrodes even faster than uncoated iron!',
    misconceptionId: 'misc_corrosion_tin'
  },
  {
    id: 'ch_4',
    nodeId: 'c12_chem_023',
    title: 'Unified Reaction Rate Calculation',
    question: 'For the reaction 2 N₂O₅(g) → 4 NO₂(g) + O₂(g), if the rate of formation of NO₂ is 0.080 mol L⁻¹ s⁻¹, what is the rate of disappearance of N₂O₅?',
    options: [
      '0.160 mol L⁻¹ s⁻¹',
      '0.080 mol L⁻¹ s⁻¹',
      '0.040 mol L⁻¹ s⁻¹',
      '0.020 mol L⁻¹ s⁻¹'
    ],
    correctAnswer: 2,
    explanation: 'Correct! Unified rate = -(1/2) d[N₂O₅]/dt = +(1/4) d[NO₂]/dt. Therefore, d[N₂O₅]/dt = (2/4) * d[NO₂]/dt = (1/2) * 0.080 = 0.040 mol L⁻¹ s⁻¹.',
    interactiveType: 'kinetics'
  },
  {
    id: 'ch_5',
    nodeId: 'c12_chem_024',
    title: 'Determining Order from Rate Data',
    question: 'For reaction A + B → Products, doubling [A] while keeping [B] constant quadruples the rate. Doubling [B] while keeping [A] constant doubles the rate. What is the rate law and overall order?',
    options: [
      'Rate = k[A][B], overall order = 2',
      'Rate = k[A]²[B]¹, overall order = 3',
      'Rate = k[A]²[B]², overall order = 4',
      'Rate = k[A]¹[B]⁰, overall order = 1'
    ],
    correctAnswer: 1,
    explanation: 'Correct! 2^m = 4 → m = 2 (second order in A). 2^n = 2 → n = 1 (first order in B). Rate Law = k[A]²[B]¹, overall order = 2 + 1 = 3.',
    misconceptionId: 'misc_order_1'
  },
  {
    id: 'ch_6',
    nodeId: 'c12_chem_025',
    title: 'Molecularity vs Order Distinction',
    question: 'Why can the order of a reaction be zero or fractional, whereas molecularity can NEVER be zero or fractional?',
    options: [
      'Order is calculated from mass numbers, while molecularity is measured with a thermometer.',
      'Molecularity is a theoretical count of colliding reactant molecules in a single step (you cannot have 0 or half a molecule colliding). Order is an experimental exponent describing concentration dependence.',
      'Molecularity applies only to gases, while order applies only to aqueous solutions.',
      'Order describes equilibrium, while molecularity describes thermodynamics.'
    ],
    correctAnswer: 1,
    explanation: 'Correct! Molecularity counts physical bodies colliding in an elementary step (1, 2, or 3). Order is an experimental exponent in the rate law derived from laboratory rate measurements.',
    misconceptionId: 'misc_mol_vs_order'
  },
  {
    id: 'ch_7',
    nodeId: 'c12_chem_026',
    title: 'First-Order Integrated Calculation',
    question: 'A first-order reaction has a rate constant k = 0.0693 min⁻¹. How long will it take for the concentration of reactant to decrease from 0.80 M to 0.20 M?',
    options: [
      '10 minutes',
      '20 minutes',
      '30 minutes',
      '40 minutes'
    ],
    correctAnswer: 1,
    explanation: 'Correct! t₁/₂ = 0.693 / 0.0693 = 10 min. Dropping from 0.80 M to 0.20 M is two half-lives (0.80 → 0.40 → 0.20 M). Total time = 2 * 10 min = 20 minutes!',
    interactiveType: 'halflife'
  },
  {
    id: 'ch_8',
    nodeId: 'c12_chem_027',
    title: 'Zero-Order vs First-Order Half-Life',
    question: 'If the initial concentration of a reactant [A]₀ is doubled, how do the half-lives of a zero-order and a first-order reaction change?',
    options: [
      'Both half-lives double.',
      'Both half-lives remain completely unchanged.',
      'Zero-order half-life doubles (t₁/₂ = [A]₀/2k); First-order half-life remains UNCHANGED (t₁/₂ = 0.693/k).',
      'Zero-order half-life halves, while first-order half-life quadruples.'
    ],
    correctAnswer: 2,
    explanation: 'Correct! Zero-order half-life t₁/₂ = [A]₀/2k (proportional to [A]₀). First-order half-life t₁/₂ = 0.693/k (independent of initial concentration!).',
    misconceptionId: 'misc_halflife_order'
  },
  {
    id: 'ch_9',
    nodeId: 'c12_chem_028',
    title: 'Collision Theory & Catalytic Mechanism',
    question: 'How does adding a catalyst increase the rate of a chemical reaction according to collision theory?',
    options: [
      'It increases the average kinetic energy of the colliding molecules.',
      'It provides an alternative reaction pathway with a lower activation energy barrier (Ea), increasing effective collisions.',
      'It shifts the reaction equilibrium toward products and increases reaction enthalpy (ΔH).',
      'It increases the volume of the container to allow more room for collisions.'
    ],
    correctAnswer: 1,
    explanation: 'Correct! A catalyst lowers the activation energy barrier (Ea) without altering initial reactant/final product energy levels or ΔH. Lower Ea means a larger fraction of collisions satisfy E ≥ Ea.',
    interactiveType: 'kinetics'
  },
  {
    id: '10',
    nodeId: 'c12_chem_029',
    title: 'Arrhenius Plot Graphical Slope',
    question: 'When log k is plotted against 1/T (where T is in Kelvin), a straight line is obtained. What is the slope of this line?',
    options: [
      '+Ea / R',
      '-Ea / (2.303 R)',
      '-Ea * R',
      '+log A'
    ],
    correctAnswer: 1,
    explanation: 'Correct! From log k = log A - Ea / (2.303 R T), plotting y = log k vs x = 1/T yields slope = -Ea / (2.303 R). Activation energy Ea = -slope * 2.303 * R.',
    misconceptionId: 'misc_arrhenius_slope'
  },
  {
    id: '11',
    nodeId: 'c12_chem_030',
    title: 'Physisorption vs Chemisorption Temperature Trend',
    question: 'Why does physisorption decrease continuously with temperature, whereas chemisorption first increases and then decreases as temperature rises?',
    options: [
      'Physisorption involves chemical bonds that break easily, whereas chemisorption is non-specific.',
      'Physisorption is exothermic with weak van der Waals forces so heat causes desorption. Chemisorption requires activation energy initially to form chemical bonds, but high T eventually causes desorption.',
      'Chemisorption occurs only in liquids at freezing temperatures.',
      'Physisorption forms a single monolayer while chemisorption forms infinite layers.'
    ],
    correctAnswer: 1,
    explanation: 'Correct! Chemisorption involves chemical bond formation requiring activation energy. Heating supplies this Ea, increasing initial chemisorption. At very high T, thermal agitation breaks bonds and desorption dominates.',
    interactiveType: 'adsorption'
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Primary Cells Stop Working Because Electrons Are Used Up",
    description: "Students often believe that primary batteries stop working because all the stored electrons are consumed during electrical output.",
    correction: "Electrons are never consumed during current flow; they simply circulate from the anode to the cathode through the external circuit. Primary cells become exhausted because the chemical reactants reach equilibrium or are completely converted into products. Furthermore, the cell reactions in primary cells are irreversible by applying an external electrical potential.",
  },
  {
    id: "misc_2",
    title: "Density of Sulfuric Acid Increases During Discharge of Lead-Acid Battery",
    description: "Students incorrectly assume that the concentration and density of sulfuric acid increase as a lead-acid battery discharges energy.",
    correction: "During discharge, sulfuric acid is consumed while water is produced, which decreases the overall density of the electrolyte. Recharging reverses the chemical reaction, converting lead sulfate back into lead, lead dioxide, and sulfuric acid. Monitoring electrolyte density with a hydrometer is a standard method to determine a battery's state of charge.",
  },
  {
    id: "misc_3",
    title: "Fuel Cells Store Chemical Energy Internally Like Secondary Batteries",
    description: "Students frequently view fuel cells as self-contained devices that store a fixed amount of chemical energy inside their casing.",
    correction: "Unlike primary or secondary batteries, fuel cells do not store active chemical reactants internally. They generate electricity continuously as long as fuel (like hydrogen) and oxidants (like oxygen) are supplied from external reservoirs. Consequently, fuel cells never run down or require electrical recharging in the traditional sense.",
  },
  {
    id: "misc_4",
    title: "Theoretical Efficiency of Fuel Cells Is Bound by Carnot Theorem",
    description: "Students often assume that fuel cells operate under the same thermodynamic Carnot efficiency limits as thermal power plants.",
    correction: "Thermal power generators convert chemical energy into heat before producing work, making them subject to Carnot limits based on operating temperatures. Fuel cells bypass the thermal step and directly convert chemical energy into electrical energy through electrochemical redox reactions. Their maximum theoretical efficiency is governed by the ratio of Gibbs free energy change to enthalpy change (ΔG/ΔH), allowing efficiencies well above thermal limits.",
  },
  {
    id: "misc_5",
    title: "Cadmium Serves as Cathode During Discharging in Ni-Cd Cell",
    description: "Students commonly misidentify metallic Cadmium as the cathode in a Nickel-Cadmium battery during discharge.",
    correction: "During discharge, metallic Cadmium undergoes oxidation to cadmium hydroxide and therefore acts as the anode. The cathode actually consists of nickel oxide-hydroxide, which gets reduced during the discharging process. Upon recharging, the directions of these electrochemical half-reactions are reversed.",
  },
];

export default function C12_ChemistryBatteriesandfuelcellsSim() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // User Interaction & Answers
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Score & Mastery
  const [score, setScore] = useState(0);
  const [bktState, setBktState] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const init: any = {};
    ALL_NODE_IDS.forEach(id => {
      init[id] = createBKTState();
    });
    return init;
  });

  // Interactive Visual Tools State
  const [batteryType, setBatteryType] = useState<'dry' | 'lead' | 'fuel'>('lead');
  const [batteryState, setBatteryState] = useState<'discharging' | 'charging'>('discharging');
  const [protectionMode, setProtectionMode] = useState<'none' | 'galvanized' | 'tinCoated' | 'sacrificialMg'>('galvanized');
  const [kineticsTemp, setKineticsTemp] = useState(25);
  const [hasCatalyst, setHasCatalyst] = useState(false);
  const [rateOrder, setRateOrder] = useState<0 | 1>(1);
  const [adsorptionType, setAdsorptionType] = useState<'physisorption' | 'chemisorption'>('physisorption');

  // Feedback & Effects
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // Diagnostic Handler
  const handleDiscoverySubmit = () => {
    if (selectedDiscoveryOpt === null) return;
    setDiscoverySubmitted(true);
    if (selectedDiscoveryOpt === DISCOVERY_QUESTION.correctAnswer) {
      audioManager.play('success');
      speechManager.speak("Excellent intuition! You understand chemical reversibility.");
      speechManager.speak('Great job! Keep going.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite! Let's explore the laboratory to see why.");
    }
  };

  // Challenge Handler
  const handleChallengeSubmit = () => {
    if (selectedOpt === null || answerSubmitted) return;
    const challenge = CHALLENGES[currentChallengeIndex];
    const correct = selectedOpt === challenge.correctAnswer;
    setIsCorrect(correct);
    setAnswerSubmitted(true);

    // Update BKT & SRS
    const nodeId = challenge.nodeId;
    const updatedBkt = bktUpdate(bktState[nodeId], correct);
    setBktState(prev => ({ ...prev, [nodeId]: updatedBkt }));

    const reviewItem = createReviewItem(challenge.id, 'Chemistry');
    const updatedSrs = sm2Update(reviewItem, correct ? 5 : 2, 0);

    if (correct) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak("Spot on! Great chemistry reasoning.");
      setScore(s => s + 10);
      setShowSparkle(true);
      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccess(true);
        recordGameScore(Object.values(ALL_NODE_IDS), score + 10);
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Let's review the reaction mechanism.");
      setShowHint(true);
    }
  };

  const handleNextChallenge = () => {
    setSelectedOpt(null);
    setAnswerSubmitted(false);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(c => c + 1);
    } else {
      setActiveTab('summary');
    }
  };

  const currentChallenge = CHALLENGES[currentChallengeIndex];
  const currentSlide = TEACHING_SLIDES[currentSlideIndex];

  // Calculated overall mastery
  const overallMastery = useMemo(() => {
    const levels = ALL_NODE_IDS.map(id => getMasteryLevel(bktState[id]));
    const sum = levels.reduce((acc, curr) => acc + (curr === 'mastered' ? 1 : curr === 'proficient' ? 0.6 : 0.2), 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktState]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-3 md:p-6 font-sans select-none">
      {/* Top Header Banner */}
      <header className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 flex flex-col md:flex-row justify-between items-center shadow-2xl gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
            ⚡
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">{SCENARIO.title}</h1>
            <p className="text-xs text-slate-400">Class 12 ISC Chemistry • Physical Chemistry Suite</p>
          </div>
        </div>

        {/* Global Progress & Mastery */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Overall Mastery</span>
            <span className="text-base font-black text-emerald-400">{overallMastery}%</span>
          </div>
          <div className="w-24 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${overallMastery}%` }} />
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="w-full max-w-5xl bg-slate-900/80 border border-slate-800 rounded-xl p-1.5 mb-6 flex justify-between gap-1 overflow-x-auto">
        {[
          { id: 'discovery', label: '1. Predict', icon: '❓' },
          { id: 'learn', label: '2. Concept Slides', icon: '📖' },
          { id: 'lab', label: '3. Interactive Lab', icon: '🧪' },
          { id: 'challenges', label: '4. Practice Suite', icon: '🎯' },
          { id: 'summary', label: '5. Mastery Summary', icon: '🏆' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as any);
            }}
            className={`flex-1 min-w-[100px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-5xl flex-1 flex flex-col">
        {/* TAB 1: DISCOVERY QUESTION */}
        {activeTab === 'discovery' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">Discovery Challenge • Predict Before Learning</span>
              <h2 className="text-lg md:text-xl font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h2>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!discoverySubmitted) {
                        audioManager.play('tap');
                        setSelectedDiscoveryOpt(idx);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                      selectedDiscoveryOpt === idx
                        ? 'bg-indigo-950/80 border-indigo-500 text-white'
                        : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={selectedDiscoveryOpt === null}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Confirm Prediction
                </button>
              ) : (
                <div className="bg-slate-950 border border-indigo-900/60 p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <span>💡 Educational Feedback:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.explanation}</p>
                  <button
                    onClick={() => setActiveTab('learn')}
                    className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    Proceed to Interactive Lessons →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: CONCEPT SLIDES */}
        {activeTab === 'learn' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Slide Navigation Header */}
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400">
                Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}: <span className="text-indigo-400">{currentSlide.title}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentSlideIndex(s => Math.max(0, s - 1))}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setCurrentSlideIndex(s => Math.min(TEACHING_SLIDES.length - 1, s + 1))}
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-bold rounded"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Slide Content Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold uppercase">
                  Node: {NODE_INFO[currentSlide.nodeId].title}
                </span>
                <h2 className="text-xl font-bold text-white">{currentSlide.concept}</h2>
                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-normal bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {currentSlide.content}
                </div>
              </div>

              {/* Interactive Visual Preview embedded in slide */}
              <div className="flex flex-col justify-center">
                {currentSlide.interactiveComponent === 'battery' && <BatteryFuelCellVisual cellType={batteryType} state={batteryState} onStateToggle={() => setBatteryState(s => s === 'discharging' ? 'charging' : 'discharging')} />}
                {currentSlide.interactiveComponent === 'corrosion' && <CorrosionCellVisual protectionMode={protectionMode} />}
                {currentSlide.interactiveComponent === 'kinetics' && <CollisionKineticsVisual temp={kineticsTemp} hasCatalyst={hasCatalyst} onTempChange={setKineticsTemp} onCatalystToggle={() => setHasCatalyst(c => !c)} />}
                {currentSlide.interactiveComponent === 'halflife' && <IntegratedRateVisual order={rateOrder} initialConc={1.0} kConst={0.05} />}
                {currentSlide.interactiveComponent === 'adsorption' && <AdsorptionSurfaceVisual type={adsorptionType} temp={kineticsTemp} />}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: INTERACTIVE VIRTUAL LAB */}
        {activeTab === 'lab' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-white">ISC Chemistry Virtual Laboratory</h2>
                  <p className="text-xs text-slate-400">Manipulate variables & explore molecular chemistry live</p>
                </div>
              </div>

              {/* Lab Selector Bar */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { key: 'battery', label: '1. Cell Lab' },
                  { key: 'corrosion', label: '2. Corrosion' },
                  { key: 'kinetics', label: '3. Kinetics' },
                  { key: 'halflife', label: '4. Rate Laws' },
                  { key: 'adsorption', label: '5. Adsorption' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      audioManager.play('pop');
                      if (item.key === 'battery') setBatteryType('lead');
                    }}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-200 text-center border border-slate-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Active Lab Component Display */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase mb-3">Cell & Battery Simulator</h3>
                  <div className="flex gap-2 mb-4">
                    {(['dry', 'lead', 'fuel'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setBatteryType(t)}
                        className={`px-3 py-1 text-xs rounded font-bold capitalize ${batteryType === t ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        {t} Cell
                      </button>
                    ))}
                  </div>
                  <BatteryFuelCellVisual cellType={batteryType} state={batteryState} onStateToggle={() => setBatteryState(s => s === 'discharging' ? 'charging' : 'discharging')} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-xs font-bold text-red-400 uppercase mb-3">Corrosion Prevention Controls</h3>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {(['none', 'galvanized', 'tinCoated', 'sacrificialMg'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setProtectionMode(m)}
                          className={`p-1.5 text-[11px] rounded font-semibold capitalize ${protectionMode === m ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                    <CorrosionCellVisual protectionMode={protectionMode} />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-xs font-bold text-emerald-400 uppercase mb-3">Collision & Activation Energy</h3>
                    <CollisionKineticsVisual temp={kineticsTemp} hasCatalyst={hasCatalyst} onTempChange={setKineticsTemp} onCatalystToggle={() => setHasCatalyst(c => !c)} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: PRACTICE SUITE */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Progress indicator */}
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300">
                Question {currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-800">
                Topic: {NODE_INFO[currentChallenge.nodeId].title}
              </span>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-base md:text-lg font-bold text-white leading-snug">{currentChallenge.question}</h2>

              {/* Dynamic Interactive visual aid if challenge has one */}
              {currentChallenge.interactiveType === 'kinetics' && (
                <CollisionKineticsVisual temp={kineticsTemp} hasCatalyst={hasCatalyst} onTempChange={setKineticsTemp} onCatalystToggle={() => setHasCatalyst(c => !c)} />
              )}
              {currentChallenge.interactiveType === 'halflife' && (
                <IntegratedRateVisual order={rateOrder} initialConc={1.0} kConst={0.05} />
              )}
              {currentChallenge.interactiveType === 'adsorption' && (
                <AdsorptionSurfaceVisual type={adsorptionType} temp={kineticsTemp} />
              )}

              {/* Options */}
              <div className="space-y-3">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!answerSubmitted) {
                        audioManager.play('tap');
                        setSelectedOpt(idx);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all flex items-start gap-3 ${
                      selectedOpt === idx
                        ? 'bg-indigo-950 border-indigo-500 text-white shadow-lg'
                        : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    } ${
                      answerSubmitted && idx === currentChallenge.correctAnswer
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : ''
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {/* Submit & Next Controls */}
              {!answerSubmitted ? (
                <button
                  onClick={handleChallengeSubmit}
                  disabled={selectedOpt === null}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-red-950/60 border-red-800 text-red-200'}`}>
                    <span className="font-bold block mb-1">{isCorrect ? '✨ Correct Explanation:' : '⚠️ Misconception Alert & Explanation:'}</span>
                    {currentChallenge.explanation}
                  </div>
                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Question →' : 'View Final Mastery Summary 🎉'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 5: MASTERY SUMMARY */}
        {activeTab === 'summary' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                🎓
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Class 12 Chemistry Mastery Complete!</h2>
                <p className="text-xs text-slate-400 mt-1">ISC Physical Chemistry: Electrochemistry, Kinetics & Surface Chemistry</p>
              </div>

              {/* Node Mastery Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {ALL_NODE_IDS.map(id => {
                  const node = NODE_INFO[id];
                  const lvl = getMasteryLevel(bktState[id]);
                  return (
                    <div key={id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-white block">{node.title}</span>
                        <span className="text-[10px] text-slate-400">{node.tagline}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        lvl === 'mastered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        lvl === 'proficient' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {lvl}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setCurrentChallengeIndex(0);
                  setActiveTab('challenges');
                }}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg text-xs uppercase tracking-wider transition-all"
              >
                Restart Practice Suite
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Helper / Feedback Popups */}
      <HintBubble show={showHint} text={currentChallenge?.explanation || ''} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Unit Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      {/* Misconception Checklist */}
      <div className="text-left space-y-3 pt-4 border-t border-slate-800 mt-6">
        <h3 className="text-sm font-bold text-amber-300">Common Misconception Checklist:</h3>
        <div className="grid grid-cols-1 gap-2">
          {MISCONCEPTIONS_CHECKLIST.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
              <div className="font-bold text-rose-400">{m.title}</div>
              <div className="text-slate-400">{m.description}</div>
              <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const defaultProps = {
  nodes: ALL_NODE_IDS,
  title: SCENARIO.title,
  description: SCENARIO.description
};