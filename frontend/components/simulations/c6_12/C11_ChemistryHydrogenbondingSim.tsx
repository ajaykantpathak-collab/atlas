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
export const ALL_NODE_IDS = [
  'c11_chem_041', // Hydrogen bonding
  'c11_chem_042', // Thermodynamics - systems and surroundings
  'c11_chem_043', // First law of thermodynamics
  'c11_chem_044', // Enthalpy and heat changes
  'c11_chem_045', // Hess's law
  'c11_chem_046', // Types of enthalpy changes
  'c11_chem_047', // Second law of thermodynamics
  'c11_chem_048', // Entropy
  'c11_chem_049', // Gibbs free energy
  'c11_chem_050', // Third law of thermodynamics
] as const;

export type NodeId = (typeof ALL_NODE_IDS)[number];

export interface NodeInfo {
  id: NodeId;
  title: string;
  category: string;
  description: string;
}

export const NODE_DETAILS: Record<NodeId, NodeInfo> = {
  c11_chem_041: {
    id: 'c11_chem_041',
    title: 'Hydrogen Bonding',
    category: 'Chemical Bonding',
    description: 'Dipole-dipole attraction between H attached to N/O/F and lone pairs on nearby N/O/F.'
  },
  c11_chem_042: {
    id: 'c11_chem_042',
    title: 'Systems & Surroundings',
    category: 'Thermodynamics Basics',
    description: 'System, surroundings, boundaries (Open, Closed, Isolated), intensive/extensive properties.'
  },
  c11_chem_043: {
    id: 'c11_chem_043',
    title: 'First Law of Thermodynamics',
    category: 'Energy Conservation',
    description: 'Conservation of energy: ΔU = q + w, state vs path functions, cyclic processes.'
  },
  c11_chem_044: {
    id: 'c11_chem_044',
    title: 'Enthalpy & Heat Changes',
    category: 'Enthalpy Fundamentals',
    description: 'H = U + PV, q_p = ΔH, Cp - Cv = R, reversible vs irreversible P-V work.'
  },
  c11_chem_045: {
    id: 'c11_chem_045',
    title: "Hess's Law",
    category: 'Thermochemistry',
    description: 'Constant heat summation: total enthalpy change is independent of pathway.'
  },
  c11_chem_046: {
    id: 'c11_chem_046',
    title: 'Types of Enthalpy Changes',
    category: 'Thermochemistry',
    description: 'Enthalpies of formation, combustion, neutralisation (-57.3 kJ/mol), solution, and atomisation.'
  },
  c11_chem_047: {
    id: 'c11_chem_047',
    title: 'Second Law of Thermodynamics',
    category: 'Spontaneity',
    description: 'Spontaneous direction of heat flow and overall entropy of the universe increasing (ΔS_univ ≥ 0).'
  },
  c11_chem_048: {
    id: 'c11_chem_048',
    title: 'Entropy',
    category: 'Disorder & Microstates',
    description: 'S as quantitative measure of randomness/microstates, ΔS = q_rev/T, phase transition entropy.'
  },
  c11_chem_049: {
    id: 'c11_chem_049',
    title: 'Gibbs Free Energy',
    category: 'Chemical Equilibrium',
    description: 'G = H - TS, ΔG = ΔH - TΔS, ΔG° = -RT ln K, spontaneity temperature crossover.'
  },
  c11_chem_050: {
    id: 'c11_chem_050',
    title: 'Third Law of Thermodynamics',
    category: 'Absolute Zero',
    description: 'Entropy of a perfectly crystalline solid at 0 K is zero; residual entropy and unattainability.'
  }
};

// ==========================================
// SCENARIOS & DISCOVERY QUESTIONS
// ==========================================
export const SCENARIO = {
  title: 'ISC Class 11 Physical Chemistry Virtual Laboratory',
  subtitle: 'Master Chemical Thermodynamics & Hydrogen Bonding Through Interactive Visual Experiments',
  instructor: 'Dr. Aris Thorne (Virtual ISC Chemistry Chair)'
};

export const DISCOVERY_PREDICTIONS = [
  {
    id: 'pred1',
    nodeId: 'c11_chem_041' as NodeId,
    question: 'Why does ice float on liquid water even though solid states are usually denser than liquids?',
    options: [
      'Ice traps air bubbles during freezing',
      'Hydrogen bonds form an open hexagonal lattice with extra empty space',
      'Covalent O-H bonds elongate upon cooling',
      'Water molecules lose mass as they freeze'
    ],
    correctIndex: 1,
    explanation: 'Intermolecular hydrogen bonds hold water molecules in a fixed, open hexagonal lattice in ice, creating higher empty volume and lower density than liquid water.'
  },
  {
    id: 'pred2',
    nodeId: 'c11_chem_043' as NodeId,
    question: 'If a gas expands inside a perfectly insulated vessel doing 50 J of work, what happens to its internal energy ΔU?',
    options: [
      'ΔU increases by 50 J',
      'ΔU stays 0 J',
      'ΔU decreases by 50 J',
      'ΔU increases by 100 J'
    ],
    correctIndex: 2,
    explanation: 'For an adiabatic vessel, heat q = 0. According to the First Law (ΔU = q + w), since the gas does work (w = -50 J), ΔU = 0 + (-50 J) = -50 J.'
  },
  {
    id: 'pred3',
    nodeId: 'c11_chem_049' as NodeId,
    question: 'An endothermic reaction (ΔH > 0) has a positive entropy change (ΔS > 0). When will it be spontaneous?',
    options: [
      'Never spontaneous at any temperature',
      'Spontaneous only at low temperatures',
      'Spontaneous only at high temperatures where TΔS > ΔH',
      'Spontaneous at all temperatures'
    ],
    correctIndex: 2,
    explanation: 'Since ΔG = ΔH - TΔS, when ΔH > 0 and ΔS > 0, ΔG becomes negative only when T is high enough such that TΔS exceeds ΔH.'
  }
];

// ==========================================
// VISUAL SIMULATION COMPONENTS
// ==========================================

// 1. Hydrogen Bonding Visualizer
export const HydrogenBondVisualizer: React.FC<{
  mode: 'water' | 'ice' | 'nitrophenol' | 'hf';
  temperature: number;
}> = ({ mode, temperature }) => {
  const [activeHbonds, setActiveHbonds] = useState<number>(12);

  useEffect(() => {
    // Temperature effect on H-bonds
    if (mode === 'ice') setActiveHbonds(16);
    else if (mode === 'water') {
      const remaining = Math.max(4, Math.round(16 - (temperature / 100) * 8));
      setActiveHbonds(remaining);
    }
  }, [mode, temperature]);

  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-cyan-800/40 text-cyan-100 flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-3 px-2">
        <h4 className="font-semibold text-lg text-cyan-300">
          {mode === 'water' && 'Liquid Water Dynamic H-Bond Network'}
          {mode === 'ice' && 'Ice Hexagonal Lattice Structure (Open Space)'}
          {mode === 'nitrophenol' && 'Ortho vs Para-Nitrophenol Hydrogen Bonding'}
          {mode === 'hf' && 'Hydrogen Fluoride Zig-Zag Chains'}
        </h4>
        <span className="text-xs bg-cyan-950 border border-cyan-700/50 px-2 py-1 rounded text-cyan-300 font-mono">
          Temp: {temperature}°C
        </span>
      </div>

      <div className="relative w-full h-64 bg-slate-900/90 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 500 240">
          <defs>
            <radialGradient id="hGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="oGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {mode === 'ice' && (
            <g>
              {/* Hexagonal Ice Lattice Representation */}
              {/* Ring 1 */}
              <polygon points="250,40 310,75 310,145 250,180 190,145 190,75" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5" />
              {/* Oxygen Nodes */}
              {[
                { x: 250, y: 40 }, { x: 310, y: 75 }, { x: 310, y: 145 },
                { x: 250, y: 180 }, { x: 190, y: 145 }, { x: 190, y: 75 }
              ].map((pos, idx) => (
                <g key={idx}>
                  <circle cx={pos.x} cy={pos.y} r="14" fill="#ef4444" />
                  <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">δ⁻ O</text>
                  {/* Hydrogen attached */}
                  <circle cx={pos.x + 12} cy={pos.y - 10} r="7" fill="#38bdf8" />
                  <text x={pos.x + 12} y={pos.y - 8} textAnchor="middle" fill="black" fontSize="7">δ+</text>
                </g>
              ))}
              <text x="250" y="115" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">
                Open Lattice (Density ~0.917 g/cm³)
              </text>
            </g>
          )}

          {mode === 'water' && (
            <g>
              {/* Random liquid water molecules with dynamic hydrogen bonds */}
              {[
                { x: 100, y: 80, angle: 20 },
                { x: 200, y: 60, angle: -40 },
                { x: 320, y: 90, angle: 10 },
                { x: 140, y: 160, angle: 45 },
                { x: 260, y: 170, angle: -15 },
                { x: 390, y: 160, angle: 70 }
              ].map((mol, idx) => (
                <g key={idx} transform={`translate(${mol.x}, ${mol.y}) rotate(${mol.angle})`}>
                  {/* Oxygen */}
                  <circle cx="0" cy="0" r="14" fill="#ef4444" />
                  <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">O</text>
                  {/* Lone Pairs */}
                  <circle cx="-6" cy="-12" r="3" fill="#fef08a" />
                  <circle cx="6" cy="-12" r="3" fill="#fef08a" />
                  {/* Hydrogens */}
                  <line x1="0" y1="0" x2="-16" y2="14" stroke="#e2e8f0" strokeWidth="3" />
                  <circle cx="-16" cy="14" r="7" fill="#38bdf8" />
                  <line x1="0" y1="0" x2="16" y2="14" stroke="#e2e8f0" strokeWidth="3" />
                  <circle cx="16" cy="14" r="7" fill="#38bdf8" />
                </g>
              ))}

              {/* Dotted H-bonds */}
              <line x1="100" y1="80" x2="200" y2="60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="200" y1="60" x2="320" y2="90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="140" y1="160" x2="260" y2="170" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
              {activeHbonds > 8 && (
                <line x1="200" y1="60" x2="140" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
              )}

              <text x="250" y="225" textAnchor="middle" fill="#f59e0b" fontSize="11">
                Dashed line = Hydrogen Bond (~20 kJ/mol, ~200 pm) | Solid line = Polar Covalent (~460 kJ/mol)
              </text>
            </g>
          )}

          {mode === 'nitrophenol' && (
            <g>
              {/* Left: Ortho-nitrophenol (Intramolecular H-bond) */}
              <g transform="translate(110, 30)">
                <text x="60" y="15" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">o-Nitrophenol (Intramolecular)</text>
                {/* Benzene Ring */}
                <polygon points="60,40 90,60 90,95 60,115 30,95 30,60" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="60" cy="77" r="18" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                {/* OH Group */}
                <line x1="60" y1="40" x2="60" y2="20" stroke="#e2e8f0" strokeWidth="2" />
                <circle cx="60" cy="20" r="8" fill="#ef4444" />
                <line x1="60" y1="20" x2="80" y2="20" stroke="#e2e8f0" strokeWidth="2" />
                <circle cx="80" cy="20" r="5" fill="#38bdf8" />
                {/* NO2 Group */}
                <line x1="90" y1="60" x2="110" y2="50" stroke="#e2e8f0" strokeWidth="2" />
                <circle cx="110" cy="50" r="8" fill="#3b82f6" />
                <line x1="110" y1="50" x2="115" y2="30" stroke="#e2e8f0" strokeWidth="2" />
                <circle cx="115" cy="30" r="7" fill="#ef4444" />
                {/* Intramolecular H-Bond line */}
                <line x1="80" y1="20" x2="115" y2="30" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                <text x="60" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="10">Lower BP, Steam Volatile</text>
              </g>

              {/* Right: Para-nitrophenol (Intermolecular H-bond) */}
              <g transform="translate(320, 30)">
                <text x="60" y="15" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">p-Nitrophenol (Intermolecular)</text>
                {/* Benzene Ring */}
                <polygon points="60,40 90,60 90,95 60,115 30,95 30,60" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="60" cy="77" r="18" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                {/* OH at top */}
                <line x1="60" y1="40" x2="60" y2="20" stroke="#e2e8f0" strokeWidth="2" />
                <circle cx="60" cy="20" r="8" fill="#ef4444" />
                {/* NO2 at bottom */}
                <line x1="60" y1="115" x2="60" y2="135" stroke="#e2e8f0" strokeWidth="2" />
                <circle cx="60" cy="135" r="8" fill="#3b82f6" />
                {/* H-bond arrow pointing outward */}
                <line x1="60" y1="20" x2="60" y2="0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                <text x="60" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="10">Higher BP, Intermolecular Chains</text>
              </g>
            </g>
          )}

          {mode === 'hf' && (
            <g transform="translate(40, 60)">
              <text x="210" y="0" textAnchor="middle" fill="#67e8f9" fontSize="13" fontWeight="bold">Hydrogen Fluoride (HF) Zig-Zag Intermolecular H-Bonding</text>
              {[
                { x: 40, y: 70 }, { x: 120, y: 110 }, { x: 200, y: 70 },
                { x: 280, y: 110 }, { x: 360, y: 70 }
              ].map((pos, idx) => (
                <g key={idx}>
                  {/* Fluorine */}
                  <circle cx={pos.x} cy={pos.y} r="14" fill="#10b981" />
                  <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">F</text>
                  {/* Hydrogen */}
                  <circle cx={pos.x + (idx % 2 === 0 ? 18 : -18)} cy={pos.y + (idx % 2 === 0 ? 10 : -10)} r="7" fill="#38bdf8" />
                  <text x={pos.x + (idx % 2 === 0 ? 18 : -18)} y={pos.y + (idx % 2 === 0 ? 12 : -8)} textAnchor="middle" fill="black" fontSize="7">H</text>
                </g>
              ))}
              {/* ZigZag dashed lines */}
              <path d="M 40,70 L 120,110 L 200,70 L 280,110 L 360,70" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
              <text x="210" y="150" textAnchor="middle" fill="#a7f3d0" fontSize="11">
                F is most electronegative element → Exceptionally strong H-bond (~40 kJ/mol)
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="mt-3 text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-cyan-900/40 w-full flex justify-between items-center">
        <span><strong>Key Rule:</strong> Must involve H attached to <strong>N, O, or F</strong> & lone pair on another N, O, F.</span>
        <span className="text-cyan-400 font-mono">Distance ≤ 200 pm</span>
      </div>
    </div>
  );
};

// 2. Thermodynamic System & P-V Piston Simulator
export const PistonWorkSimulator: React.FC<{
  systemType: 'open' | 'closed' | 'isolated';
  processType: 'isothermal' | 'isobaric' | 'isochoric' | 'adiabatic';
  temperature: number;
  externalPressure: number;
  onStateChange?: (data: { q: number; w: number; deltaU: number; deltaH: number }) => void;
}> = ({ systemType, processType, temperature, externalPressure, onStateChange }) => {
  const [volume, setVolume] = useState<number>(3.0); // dm^3
  const [heatAdded, setHeatAdded] = useState<number>(100); // Joules

  // Thermodynamic Calculations
  const calculatedData = useMemo(() => {
    let w = 0; // Work done on system
    let q = 0;
    let deltaU = 0;
    let deltaH = 0;

    const n = 1.0; // 1 mole ideal gas
    const R = 8.314;
    const Cv = 1.5 * R; // Monatomic ideal gas
    const Cp = 2.5 * R;

    if (processType === 'isochoric') {
      // Delta V = 0
      w = 0;
      q = heatAdded;
      deltaU = q;
      deltaH = (Cp / Cv) * deltaU;
    } else if (processType === 'isobaric') {
      const vInitial = 2.0;
      const vFinal = volume;
      // Irreversible expansion work against P_ext in Joules (1 bar dm^3 = 100 J)
      w = -externalPressure * (vFinal - vInitial) * 100;
      q = heatAdded;
      deltaU = q + w;
      deltaH = deltaU + (vFinal - vInitial) * externalPressure * 100;
    } else if (processType === 'isothermal') {
      // Delta T = 0 => Delta U = 0 for ideal gas
      deltaU = 0;
      q = heatAdded;
      w = -q; // w = -q so Delta U = 0
      deltaH = 0;
    } else if (processType === 'adiabatic') {
      // q = 0
      q = 0;
      const vInitial = 2.0;
      const vFinal = volume;
      w = -externalPressure * (vFinal - vInitial) * 100;
      deltaU = w;
      deltaH = (Cp / Cv) * deltaU;
    }

    if (systemType === 'isolated') {
      q = 0;
      w = 0;
      deltaU = 0;
      deltaH = 0;
    }

    return { q: Math.round(q), w: Math.round(w), deltaU: Math.round(deltaU), deltaH: Math.round(deltaH) };
  }, [systemType, processType, temperature, externalPressure, volume, heatAdded]);

  useEffect(() => {
    if (onStateChange) onStateChange(calculatedData);
  }, [calculatedData, onStateChange]);

  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-indigo-800/40 text-slate-100">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h4 className="font-bold text-indigo-300 text-base">
            First Law Piston Chamber (ΔU = q + w)
          </h4>
          <p className="text-xs text-slate-400">
            System: <span className="text-amber-400 uppercase font-bold">{systemType}</span> | Process:{' '}
            <span className="text-emerald-400 uppercase font-bold">{processType}</span>
          </p>
        </div>
        <div className="text-right text-xs font-mono">
          <span className="bg-indigo-950 border border-indigo-700/50 px-2.5 py-1 rounded text-indigo-300">
            P_ext: {externalPressure} bar
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        {/* Visual Cylinder Simulation */}
        <div className="relative h-56 bg-slate-900 rounded-lg border border-slate-700 p-2 flex flex-col justify-end items-center overflow-hidden">
          {/* Insulation / System Boundary styling */}
          {systemType === 'isolated' && (
            <div className="absolute inset-0 border-8 border-amber-600/60 rounded-lg pointer-events-none flex items-center justify-center">
              <span className="bg-amber-950/90 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-700">
                Insulated Rigid Wall (No Matter / Heat)
              </span>
            </div>
          )}
          {systemType === 'closed' && (
            <div className="absolute inset-0 border-4 stroke-dashed border-cyan-500/50 rounded-lg pointer-events-none" />
          )}

          {/* Gas Chamber */}
          <div
            className="w-48 bg-indigo-950/60 border-x-4 border-b-4 border-slate-600 rounded-b-lg relative transition-all duration-300 flex flex-col justify-end"
            style={{ height: `${Math.min(180, volume * 40)}px` }}
          >
            {/* Movable Piston */}
            <div className="w-full h-6 bg-slate-400 border-2 border-slate-200 shadow-md flex items-center justify-center relative">
              <div className="w-3 h-12 bg-slate-500 absolute -top-10 rounded-t" />
              <span className="text-[10px] text-slate-950 font-bold">PISTON</span>
            </div>

            {/* Bouncing Gas Molecules */}
            <div className="w-full h-full relative overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 bg-cyan-400 rounded-full absolute shadow-sm shadow-cyan-400"
                  animate={{
                    x: [(i * 15) % 150, (i * 25 + 30) % 150, (i * 15) % 150],
                    y: [(i * 10) % 100, (i * 20 + 20) % 100, (i * 10) % 100]
                  }}
                  transition={{
                    duration: 1.5 + (i % 3) * 0.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls below cylinder */}
          <div className="w-full flex justify-around mt-2 z-10 text-xs">
            <label className="flex items-center gap-1">
              <span>Volume (V):</span>
              <input
                type="range"
                min="1.5"
                max="4.5"
                step="0.1"
                value={volume}
                disabled={processType === 'isochoric'}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-24 accent-indigo-500"
              />
              <span className="font-mono text-indigo-300">{volume.toFixed(1)} dm³</span>
            </label>
          </div>
        </div>

        {/* Live Energy Output Board */}
        <div className="bg-slate-900/90 rounded-lg border border-slate-800 p-3.5 flex flex-col justify-between text-xs font-mono">
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">Heat Exchanged (q):</span>
              <span className={`font-bold ${calculatedData.q >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {calculatedData.q > 0 ? `+${calculatedData.q}` : calculatedData.q} J
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">Work Done on System (w):</span>
              <span className={`font-bold ${calculatedData.w >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {calculatedData.w > 0 ? `+${calculatedData.w}` : calculatedData.w} J
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5 bg-slate-950 p-2 rounded border border-indigo-900/50">
              <span className="text-indigo-300 font-bold">Internal Energy (ΔU = q + w):</span>
              <span className="text-indigo-300 font-bold text-sm">
                {calculatedData.deltaU > 0 ? `+${calculatedData.deltaU}` : calculatedData.deltaU} J
              </span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-400">Enthalpy Change (ΔH = q_p):</span>
              <span className="text-amber-400 font-bold">
                {calculatedData.deltaH > 0 ? `+${calculatedData.deltaH}` : calculatedData.deltaH} J
              </span>
            </div>
          </div>

          <div className="mt-3 p-2 bg-slate-950/80 rounded border border-slate-800 text-[11px] text-slate-300 font-sans">
            <strong>ISC Sign Convention:</strong> Heat absorbed by system = <span className="text-emerald-400 font-bold">+q</span> | Work done BY system (expansion) = <span className="text-rose-400 font-bold">-w</span>.
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Hess's Law Cycle Builder
export const HessLawCycleBuilder: React.FC<{
  targetReaction: string;
  givenReactions: Array<{
    id: string;
    eq: string;
    deltaH: number;
    defaultMultiplier?: number;
    defaultReversed?: boolean;
  }>;
  targetDeltaH: number;
  onSolve?: (userSum: number, isCorrect: boolean) => void;
}> = ({ targetReaction, givenReactions, targetDeltaH, onSolve }) => {
  const [states, setStates] = useState<Record<string, { reversed: boolean; multiplier: number }>>(() => {
    const initial: Record<string, { reversed: boolean; multiplier: number }> = {};
    givenReactions.forEach((r) => {
      initial[r.id] = { reversed: r.defaultReversed || false, multiplier: r.defaultMultiplier || 1 };
    });
    return initial;
  });

  const currentTotalDeltaH = useMemo(() => {
    return givenReactions.reduce((acc, r) => {
      const state = states[r.id] || { reversed: false, multiplier: 1 };
      const sign = state.reversed ? -1 : 1;
      return acc + r.deltaH * sign * state.multiplier;
    }, 0);
  }, [givenReactions, states]);

  const isCorrect = Math.abs(currentTotalDeltaH - targetDeltaH) < 0.1;

  const handleToggleReverse = (id: string) => {
    audioManager.play('tap');
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], reversed: !prev[id].reversed }
    }));
  };

  const handleMultiplierChange = (id: string, mult: number) => {
    audioManager.play('pop');
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], multiplier: mult }
    }));
  };

  useEffect(() => {
    if (onSolve) onSolve(currentTotalDeltaH, isCorrect);
  }, [currentTotalDeltaH, isCorrect, onSolve]);

  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-emerald-800/40 text-emerald-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Hess's Law Thermochemical Cycle Summation
          </span>
          <h4 className="text-base font-bold text-white">Target: {targetReaction}</h4>
        </div>
        <div className="bg-emerald-950 border border-emerald-700/60 px-3 py-1.5 rounded-lg text-sm font-mono">
          Target ΔH° = <span className="text-emerald-300 font-bold">{targetDeltaH} kJ/mol</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {givenReactions.map((r) => {
          const st = states[r.id] || { reversed: false, multiplier: 1 };
          const effectiveDeltaH = r.deltaH * (st.reversed ? -1 : 1) * st.multiplier;

          return (
            <div
              key={r.id}
              className={`p-3 rounded-lg border transition-all ${
                st.reversed || st.multiplier !== 1
                  ? 'bg-slate-900 border-amber-600/50'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="font-mono text-xs sm:text-sm text-slate-200">
                  <span className="text-slate-400 mr-2">[{r.id}]</span>
                  {st.multiplier !== 1 && <span className="text-amber-400 font-bold">{st.multiplier} × ( </span>}
                  <span className={st.reversed ? 'line-through text-slate-500' : ''}>{r.eq}</span>
                  {st.multiplier !== 1 && <span className="text-amber-400 font-bold"> )</span>}
                  {st.reversed && <span className="ml-2 text-rose-400 text-xs font-sans">(REVERSED)</span>}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleToggleReverse(r.id)}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      st.reversed
                        ? 'bg-rose-950 border-rose-600 text-rose-200'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Flip Sign
                  </button>

                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded overflow-hidden">
                    {[1, 2, 0.5].map((m) => (
                      <button
                        key={m}
                        onClick={() => handleMultiplierChange(r.id, m)}
                        className={`px-2 py-0.5 text-xs font-mono ${
                          st.multiplier === m
                            ? 'bg-amber-600 text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        ×{m}
                      </button>
                    ))}
                  </div>

                  <span className="font-mono text-xs font-bold w-24 text-right text-emerald-300">
                    {effectiveDeltaH > 0 ? `+${effectiveDeltaH.toFixed(1)}` : effectiveDeltaH.toFixed(1)} kJ
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center font-mono">
        <span className="text-xs text-slate-400">Summed Calculated ΔH°:</span>
        <div className="flex items-center gap-3">
          <span className={`text-base font-bold ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
            {currentTotalDeltaH > 0 ? `+${currentTotalDeltaH.toFixed(1)}` : currentTotalDeltaH.toFixed(1)} kJ/mol
          </span>
          {isCorrect && (
            <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded">
              ✓ Cycle Verified!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. Gibbs Free Energy & Spontaneity Crossover Visualizer
export const GibbsSpontaneityVisualizer: React.FC<{
  initialDeltaH: number; // kJ/mol
  initialDeltaS: number; // J/mol.K
}> = ({ initialDeltaH, initialDeltaS }) => {
  const [deltaH, setDeltaH] = useState<number>(initialDeltaH);
  const [deltaS, setDeltaS] = useState<number>(initialDeltaS);
  const [temp, setTemp] = useState<number>(298); // Kelvin

  // Calculations
  const deltaSInKj = deltaS / 1000;
  const deltaG = deltaH - temp * deltaSInKj;
  const crossoverTemp = deltaS !== 0 ? Math.round(deltaH / deltaSInKj) : 0;
  const isSpontaneous = deltaG < 0;

  // Equilibrium Constant K = exp(-DeltaG° / RT)
  const R = 0.008314; // kJ/mol.K
  const kEq = Math.exp(-deltaG / (R * temp));

  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-violet-800/40 text-violet-100">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-violet-300 text-base">
          Gibbs Free Energy & Spontaneity (ΔG = ΔH - TΔS)
        </h4>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
            isSpontaneous
              ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
              : 'bg-rose-950 border-rose-600 text-rose-300'
          }`}
        >
          {isSpontaneous ? 'SPONTANEOUS (ΔG < 0)' : 'NON-SPONTANEOUS (ΔG > 0)'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sliders Controls */}
        <div className="space-y-4 bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Enthalpy (ΔH):</span>
              <span className="font-mono text-amber-300">{deltaH} kJ/mol</span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              step="5"
              value={deltaH}
              onChange={(e) => {
                setDeltaH(parseFloat(e.target.value));
                audioManager.play('tap');
              }}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Entropy (ΔS):</span>
              <span className="font-mono text-cyan-300">{deltaS} J/mol·K</span>
            </div>
            <input
              type="range"
              min="-300"
              max="300"
              step="10"
              value={deltaS}
              onChange={(e) => {
                setDeltaS(parseFloat(e.target.value));
                audioManager.play('tap');
              }}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Temperature (T):</span>
              <span className="font-mono text-violet-300">{temp} K ({temp - 273}°C)</span>
            </div>
            <input
              type="range"
              min="50"
              max="1200"
              step="10"
              value={temp}
              onChange={(e) => {
                setTemp(parseFloat(e.target.value));
                audioManager.play('tap');
              }}
              className="w-full accent-violet-500"
            />
          </div>
        </div>

        {/* Live Output & Graph */}
        <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between font-mono text-xs">
          <div className="space-y-2">
            <div className="flex justify-between pb-1 border-b border-slate-800">
              <span className="text-slate-400">ΔH Term:</span>
              <span className="text-amber-300">{deltaH > 0 ? `+${deltaH}` : deltaH} kJ/mol</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-slate-800">
              <span className="text-slate-400">-TΔS Term:</span>
              <span className="text-cyan-300">{(-temp * deltaSInKj).toFixed(1)} kJ/mol</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded border border-violet-900/60 text-sm font-bold">
              <span className="text-violet-300">Net ΔG:</span>
              <span className={isSpontaneous ? 'text-emerald-400' : 'text-rose-400'}>
                {deltaG > 0 ? `+${deltaG.toFixed(1)}` : deltaG.toFixed(1)} kJ/mol
              </span>
            </div>
            <div className="flex justify-between pt-1 text-[11px]">
              <span className="text-slate-400">Equilibrium Constant (K):</span>
              <span className="text-emerald-300">{kEq > 1e5 ? '> 10⁵' : kEq < 1e-5 ? '< 10⁻⁵' : kEq.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-3 p-2 bg-slate-950 rounded border border-slate-800 font-sans text-[11px] text-slate-300">
            {deltaH > 0 && deltaS > 0 && (
              <p>
                <strong>Endothermic & Entropy Favorable:</strong> Non-spontaneous at low T; becomes spontaneous above{' '}
                <span className="text-amber-300 font-bold">{crossoverTemp} K</span>.
              </p>
            )}
            {deltaH < 0 && deltaS < 0 && (
              <p>
                <strong>Exothermic & Entropy Unfavorable:</strong> Spontaneous at low T; becomes non-spontaneous above{' '}
                <span className="text-amber-300 font-bold">{crossoverTemp} K</span>.
              </p>
            )}
            {deltaH < 0 && deltaS > 0 && <p className="text-emerald-400"><strong>Always Spontaneous</strong> at all temperatures (ΔG &lt; 0).</p>}
            {deltaH > 0 && deltaS < 0 && <p className="text-rose-400"><strong>Never Spontaneous</strong> at any temperature (ΔG &gt; 0).</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// TEACHING SLIDES DATA (5 Interactive Modules)
// ==========================================
export interface TeachingSlide {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  content: string[];
  visualType: 'hbond' | 'piston' | 'hess' | 'gibbs' | 'thirdlaw';
  interactiveProps?: Record<string, unknown>;
}

export const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide1',
    nodeId: 'c11_chem_041',
    title: 'Hydrogen Bonding & Anomalous Properties',
    subtitle: 'Dipole-Dipole Attraction Involving N, O, and F',
    content: [
      'A hydrogen bond is an electrostatic attraction between a hydrogen covalently attached to nitrogen, oxygen, or fluorine and the lone pair of electrons on another N, O, or F.',
      'Three strict conditions: (1) H bonded directly to small, electronegative N/O/F; (2) Lone pair available on receiving atom; (3) Proximity < 200 pm.',
      'Intermolecular H-bonding raises boiling points dramatically (Water, HF, Alcohols) and expands ice into an open hexagonal lattice.',
      'Intramolecular H-bonding occurs inside the same molecule (e.g. o-nitrophenol), making it more volatile and lower-melting than p-nitrophenol.'
    ],
    visualType: 'hbond',
    interactiveProps: { mode: 'water', temperature: 25 }
  },
  {
    id: 'slide2',
    nodeId: 'c11_chem_042',
    title: 'Systems, Surroundings & First Law of Thermodynamics',
    subtitle: 'Energy Conservation: ΔU = q + w',
    content: [
      'System: Chosen region under study. Surroundings: Rest of the universe. Boundary defines energy and matter transfer.',
      'Open System: Exchanges both matter & energy. Closed System: Exchanges energy only. Isolated System: Exchanges neither.',
      'Intensive properties (Temperature, Density) pass the halving test; Extensive properties (Mass, Volume, Enthalpy) halve when sample is halved.',
      'First Law: Energy is conserved (ΔU = q + w). State functions (U, H, S, G) depend only on initial and final states; q and w are path functions.'
    ],
    visualType: 'piston',
    interactiveProps: { systemType: 'closed', processType: 'isobaric', temperature: 300, externalPressure: 1.0 }
  },
  {
    id: 'slide3',
    nodeId: 'c11_chem_045',
    title: "Hess's Law of Constant Heat Summation",
    subtitle: 'Path-Independence of Enthalpy Changes',
    content: [
      "Hess's Law states that the overall enthalpy change (ΔH) for a reaction is identical whether carried out in one step or several intermediate steps.",
      'Because enthalpy H is a state function, thermochemical equations can be treated as algebraic equations: added, subtracted, reversed, or multiplied.',
      'Flipping a thermochemical equation reverses the sign of ΔH (+ to - or vice versa). Multiplying by a coefficient multiplies ΔH by the same factor.',
      'Allows indirect calculation of heats of formation (e.g., CO formation) that cannot be measured cleanly in a calorimeter.'
    ],
    visualType: 'hess',
    interactiveProps: {
      targetReaction: 'C(s, graphite) + ½ O₂(g) → CO(g)',
      targetDeltaH: -110.5,
      givenReactions: [
        { id: 'R1', eq: 'C(s, graphite) + O₂(g) → CO₂(g)', deltaH: -393.5 },
        { id: 'R2', eq: 'CO(g) + ½ O₂(g) → CO₂(g)', deltaH: -283.0, defaultReversed: true }
      ]
    }
  },
  {
    id: 'slide4',
    nodeId: 'c11_chem_049',
    title: 'Second Law & Gibbs Free Energy (G = H - TS)',
    subtitle: 'Predicting Spontaneity and Equilibrium Position',
    content: [
      'Second Law: For any spontaneous process, the total entropy of the universe increases (ΔS_universe ≥ 0).',
      'Gibbs Free Energy change at constant T and P: ΔG = ΔH - TΔS. Process is spontaneous if ΔG < 0, non-spontaneous if ΔG > 0, and at equilibrium if ΔG = 0.',
      'Standard free energy change connects directly to the equilibrium constant: ΔG° = -RT ln K.',
      'Temperature dictates spontaneity when ΔH and ΔS have the same sign (crossover temperature T = ΔH / ΔS).'
    ],
    visualType: 'gibbs',
    interactiveProps: { initialDeltaH: 50, initialDeltaS: 150 }
  },
  {
    id: 'slide5',
    nodeId: 'c11_chem_050',
    title: 'Third Law of Thermodynamics & Absolute Zero',
    subtitle: 'Zero Entropy Reference & Residual Entropy',
    content: [
      'Third Law: The entropy of a perfectly crystalline solid at absolute zero (0 K) is zero.',
      'Microscopic reason: At 0 K in a perfect crystal, all thermal motion ceases, leaving exactly one microstate (W = 1, S = k ln W = 0).',
      'Provides an absolute reference point allowing calculation of absolute molar entropies (S°) from 0 K upward.',
      'Unattainability Principle: It is impossible to reach 0 K in a finite number of cooling steps. Real crystals with frozen disorder (CO, NO, Ice) possess residual entropy.'
    ],
    visualType: 'hbond',
    interactiveProps: { mode: 'ice', temperature: -273 }
  }
];

// ==========================================
// 10 PROGRESSIVE INTERACTIVE CHALLENGES
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch1',
    nodeId: 'c11_chem_041',
    title: 'Challenge 1: Hydrogen Bonding Conditions',
    question: 'Which of the following compounds CANNOT form intermolecular hydrogen bonds between its own molecules?',
    options: ['Ethanol (C₂H₅OH)', 'Hydrogen fluoride (HF)', 'Dimethyl ether (CH₃-O-CH₃)', 'Liquid ammonia (NH₃)'],
    correctIndex: 2,
    explanation: 'In dimethyl ether, all hydrogen atoms are covalently attached to carbon (C-H), not to oxygen. Although oxygen has lone pairs, there is no partially positive H attached to N, O, or F.',
    hint: 'Look for a compound where hydrogen is NOT directly attached to N, O, or F.'
  },
  {
    id: 'ch2',
    nodeId: 'c11_chem_042',
    title: 'Challenge 2: Property Classification',
    question: 'A sample of hot tea is divided into two equal cups. Which property changes to half its original value in each cup?',
    options: ['Temperature', 'Density', 'Refractive index', 'Internal energy (U)'],
    correctIndex: 3,
    explanation: 'Internal energy U is an extensive property, so it depends on the amount of matter and halves when divided. Temperature, density, and refractive index are intensive properties and remain unchanged.',
    hint: 'Apply the halving test: which property depends on the total mass of the system?'
  },
  {
    id: 'ch3',
    nodeId: 'c11_chem_043',
    title: 'Challenge 3: First Law Calculation',
    question: 'A gas absorbs 450 J of heat from its surroundings while expanding against a constant external pressure, doing 200 J of work. What is ΔU?',
    options: ['+650 J', '+250 J', '-250 J', '-650 J'],
    correctIndex: 1,
    explanation: 'Heat absorbed q = +450 J. Work done BY the gas w = -200 J. Using ΔU = q + w, ΔU = (+450 J) + (-200 J) = +250 J.',
    hint: 'Use the sign convention: heat absorbed = positive, work done by system = negative.'
  },
  {
    id: 'ch4',
    nodeId: 'c11_chem_044',
    title: 'Challenge 4: Heat Capacity Relation',
    question: 'For one mole of an ideal gas, why is Cp,m always larger than Cv,m by R (Cp - Cv = R)?',
    options: [
      'At constant volume, extra heat is converted into electrical work',
      'At constant pressure, additional heat must be supplied to perform expansion work against surroundings',
      'The mass of the gas increases during constant pressure heating',
      'Internal energy depends on volume for an ideal gas'
    ],
    correctIndex: 1,
    explanation: 'At constant volume no work is done (w = 0). At constant pressure, heating causes gas expansion, requiring additional heat to perform pressure-volume work equal to PΔV = RΔT.',
    hint: 'Think about what extra task the gas must perform when heated in a open/flexible container compared to a rigid box.'
  },
  {
    id: 'ch5',
    nodeId: 'c11_chem_045',
    title: "Challenge 5: Hess's Law Application",
    question: 'Given: (1) C + O₂ → CO₂ (ΔH = -393.5 kJ) and (2) CO + ½ O₂ → CO₂ (ΔH = -283.0 kJ). What is ΔH for C + ½ O₂ → CO?',
    options: ['-676.5 kJ/mol', '-110.5 kJ/mol', '+110.5 kJ/mol', '+676.5 kJ/mol'],
    correctIndex: 1,
    explanation: 'Reverse reaction (2): CO₂ → CO + ½ O₂ (ΔH = +283.0 kJ). Add to reaction (1): -393.5 + 283.0 = -110.5 kJ/mol.',
    hint: 'Reverse the second equation and add its flipped enthalpy to the first equation.'
  },
  {
    id: 'ch6',
    nodeId: 'c11_chem_046',
    title: 'Challenge 6: Heat of Neutralisation',
    question: 'Why is the heat of neutralisation of any strong acid with any strong base in dilute solution constant at approximately -57.3 kJ/mol?',
    options: [
      'All strong acids have the same molecular mass',
      'The net ionic reaction in all cases is H⁺(aq) + OH⁻(aq) → H₂O(l) while spectator ions remain unchanged',
      'Water has a high specific heat capacity',
      'Strong bases absorb heat during dissolution'
    ],
    correctIndex: 1,
    explanation: 'Strong acids and strong bases are completely ionised in dilute solution. The net ionic change is simply the formation of 1 mole of liquid water from H+ and OH- ions.',
    hint: 'Write the net ionic equation for mixing HCl(aq) with NaOH(aq) or HNO3(aq) with KOH(aq).'
  },
  {
    id: 'ch7',
    nodeId: 'c11_chem_047',
    title: 'Challenge 7: Second Law Criterion',
    question: 'Why can an endothermic process (ΔH > 0) such as ice melting at room temperature occur spontaneously?',
    options: [
      'The First Law of Thermodynamics is violated',
      'The entropy increase of the system is large enough that the total entropy of the universe increases (ΔS_univ > 0)',
      'Heat spontaneously flows from cold bodies to hot bodies',
      'Endothermic processes always reduce surroundings temperature to absolute zero'
    ],
    correctIndex: 1,
    explanation: 'For ice melting, liquid water has much higher entropy than ice lattice. The system entropy increase dominates, ensuring ΔS_universe = ΔS_sys + ΔS_surr > 0.',
    hint: 'Focus on the total entropy change of the universe (system + surroundings).'
  },
  {
    id: 'ch8',
    nodeId: 'c11_chem_048',
    title: 'Challenge 8: Entropy Calculation',
    question: 'What is the entropy change ΔS of the system when 1 mole of ice melts reversibly at 273 K? (Heat of fusion ΔH_fus = 6.0 kJ/mol)',
    options: ['+22.0 J/K', '+2.2 J/K', '-22.0 J/K', '0 J/K'],
    correctIndex: 0,
    explanation: 'ΔS = q_rev / T = 6000 J / 273 K = +21.98 J/K (~ +22.0 J/K). Melting increases disorder, so ΔS is positive.',
    hint: 'Use ΔS = q_rev / T. Remember to convert 6.0 kJ to 6000 Joules before dividing by 273 K.'
  },
  {
    id: 'ch9',
    nodeId: 'c11_chem_049',
    title: 'Challenge 9: Gibbs Free Energy & Equilibrium',
    question: 'If a chemical reaction has a standard free energy change ΔG° = -17.1 kJ/mol at 298 K, what can be concluded about its equilibrium constant K?',
    options: ['K < 1 (reactants favoured)', 'K = 1', 'K > 1 (products favoured)', 'K = 0'],
    correctIndex: 2,
    explanation: 'Since ΔG° = -RT ln K, a negative ΔG° yields ln K > 0, which means K > 1 (thermodynamically favourable product formation).',
    hint: 'Recall the equation ΔG° = -RT ln K. What sign of ln K corresponds to a negative ΔG°?'
  },
  {
    id: 'ch10',
    nodeId: 'c11_chem_050',
    title: 'Challenge 10: Third Law Precision',
    question: 'Why does solid carbon monoxide (CO) retain a small residual entropy of ~5.7 J/mol·K even when cooled near 0 K?',
    options: [
      'CO molecules can freeze in two random orientations (C-O or O-C) in the lattice',
      'CO decomposes into carbon and oxygen at 0 K',
      'The Third Law applies only to liquid helium',
      'CO gas cannot be solidified under any pressure'
    ],
    correctIndex: 0,
    explanation: 'Carbon monoxide molecules have a small dipole moment and can freeze in two orientational states (CO or OC), resulting in orientational disorder (residual entropy S = R ln 2 ≈ 5.76 J/mol·K).',
    hint: 'Consider whether the CO crystal is a perfectly ordered single microstate or if orientational disorder is trapped.'
  }
];

// MISCONCEPTIONS FOR SPECIFIC FEEDBACK
export const MISCONCEPTIONS: Record<string, { misconception: string; correction: string }> = {
  hbond_covalent: {
    misconception: 'Hydrogen bonding is a shared covalent bond.',
    correction: 'A hydrogen bond is an electrostatic dipole-dipole attraction (~20 kJ/mol), not a covalent electron-sharing bond (~450 kJ/mol).'
  },
  system_boundary: {
    misconception: 'Sealed water bottle is an isolated system.',
    correction: 'A sealed glass bottle prevents matter exchange but allows heat transfer through walls, so it is a closed system, not isolated.'
  },
  work_sign: {
    misconception: 'Work done by gas expansion is positive.',
    correction: 'In ISC/IUPAC chemistry convention, work done BY system on surroundings loses internal energy, so w is negative.'
  },
  spontaneity_enthalpy: {
    misconception: 'All exothermic reactions are spontaneous and endothermic are never spontaneous.',
    correction: 'Spontaneity depends on ΔG = ΔH - TΔS. Endothermic reactions with positive ΔS become spontaneous at high temperatures.'
  },
  third_law_solid: {
    misconception: 'All solids have zero entropy at 0 K.',
    correction: 'Only PERFECTLY crystalline solids with zero disorder have zero entropy at 0 K. Real solids with defects have residual entropy.'
  }
};

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Hydrogen Bonding Occurs in All Hydrogen Containing Compounds",
    description: "Students often believe that any molecule containing hydrogen atoms can form hydrogen bonds with neighboring molecules. They think compounds like methane or hydrogen chloride form hydrogen bonds simply because hydrogen is present in their structure.",
    correction: "Hydrogen bonding only occurs when hydrogen is directly bonded to a highly electronegative atom with a small atomic radius, specifically fluorine, oxygen, or nitrogen. In molecules like methane, the carbon-hydrogen bond lacks sufficient polarity to create the strong partial positive charge required on hydrogen. Therefore, only compounds containing F-H, O-H, or N-H bonds can form standard hydrogen bonds.",
  },
  {
    id: "misc_2",
    title: "Intramolecular Hydrogen Bonding Increases Boiling Point of Compounds",
    description: "Students frequently assume that all forms of hydrogen bonding cause an increase in boiling point compared to non-bonded molecules. They fail to distinguish between the distinct physical effects of intermolecular and intramolecular hydrogen bonds.",
    correction: "Intramolecular hydrogen bonding occurs within a single molecule, causing it to fold into a ring structure and reducing its ability to interact with neighboring molecules. This weakens the attractive forces between separate molecules, making the compound more volatile and lowering its boiling point. In contrast, intermolecular hydrogen bonding links distinct molecules together, which significantly raises the boiling point.",
  },
  {
    id: "misc_3",
    title: "Ice Is Denser Than Water Because Solids Pack More Tightly",
    description: "Students believe that solid ice must be denser than liquid water because solid states generally feature tightly packed particles. They assume hydrogen bonds draw water molecules closer together in ice than in liquid water.",
    correction: "In ice, hydrogen bonds freeze into a highly ordered, open three-dimensional tetrahedral cage structure with large vacant spaces. This open lattice arrangement causes ice to expand, giving it a lower density than liquid water at zero degrees Celsius. When ice melts, some hydrogen bonds break and the open cage collapses, allowing water molecules to pack more closely together.",
  },
  {
    id: "misc_4",
    title: "Covalent Bonds Hold the Two Strands of DNA Together",
    description: "Students often think that the two strands of a DNA double helix are bound together by strong covalent bonds. They confuse the phosphodiester bonds of the single-strand backbone with the forces connecting the complementary bases.",
    correction: "The two complementary strands of DNA are held together across the double helix by weak intermolecular hydrogen bonds between nitrogenous base pairs. Adenine pairs with thymine via two hydrogen bonds, while guanine pairs with cytosine via three hydrogen bonds. Covalent phosphodiester bonds form the individual strand backbones, but the weaker hydrogen bonds allow the strands to separate easily during cell replication.",
  },
  {
    id: "misc_5",
    title: "Hydrogen Bonds Are Equivalent in Strength to Covalent Bonds",
    description: "Students often assume that because hydrogen bonding strongly affects physical properties, it is a true primary chemical bond comparable in strength to a covalent bond. They view hydrogen bonding as a shared electron pair interaction between two atoms.",
    correction: "A hydrogen bond is an attractive electrostatic interaction rather than a primary chemical bond formed by electron sharing. The bond energy of a hydrogen bond is typically around 10 to 40 kilojoules per mole, which is significantly weaker than a covalent bond ranging from 200 to 400 kilojoules per mole. While strong enough to alter physical properties like melting and boiling points, hydrogen bonds can be readily disrupted by heat energy.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_ChemistryHydrogenbondingSim() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'learn' | 'explore' | 'challenges' | 'srs' | 'summary'>('learn');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // User Interactive Answers & Score
  const [userPrediction, setUserPrediction] = useState<number | null>(null);
  const [showPredictionFeedback, setShowPredictionFeedback] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Gamification & Feedback State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // BKT Masteries
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initMap: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initMap[id] = createBKTState();
    });
    return initMap as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // Current Challenge Data
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Auto-hint timer (10s inactivity)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (activeTab === 'challenges' && !isAnswerSubmitted) {
      setShowHint(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowHint(true);
        audioManager.play('hint');
      }, 10000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIndex, isAnswerSubmitted]);

  // Handle Challenge Answer Submission
  const handleAnswerSubmit = (index: number) => {
    if (isAnswerSubmitted) return;

    setSelectedAnswer(index);
    setIsAnswerSubmitted(true);
    const isCorrect = index === currentChallenge.correctIndex;
    const nodeId = currentChallenge.nodeId;

    // Audio & Feedback
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent reasoning! That matches the thermodynamic principle.');
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      setScore((prev) => prev + 10);
      setShowSparkle(true);
      setShowSuccess(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite. Consider the underlying sign convention and entropy factors.');
    }

    // Update BKT & SRS
    setBktStates((prev) => {
      const currentBkt = prev[nodeId] || createBKTState();
      const updated = bktUpdate(currentBkt, isCorrect);
      return { ...prev, [nodeId]: updated };
    });

    const srsItem = createReviewItem(nodeId, 'Chemistry');
    sm2Update(srsItem, isCorrect ? 5 : 2, 0);
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      setActiveTab('summary');
      audioManager.play('celebration');
      setShowConfetti(true);
      recordGameScore(ALL_NODE_IDS, score);
    }
  };

  // Calculate Overall Mastery
  const overallMastery = useMemo(() => {
    const levels = ALL_NODE_IDS.map((id) => getMasteryLevel(bktStates[id]));
    const sum = levels.reduce((acc, curr) => acc + (curr === 'mastered' ? 1 : curr === 'proficient' ? 0.6 : 0.2), 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
              ISC Class 11 Chemistry
            </span>
            <span className="text-xs text-slate-400">Nodes c11_chem_041 – 050</span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">{SCENARIO.title}</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-xs font-semibold">
          {[
            { id: 'learn', label: '1. Learn Concepts' },
            { id: 'explore', label: '2. Lab Simulator' },
            { id: 'challenges', label: '3. Practice Challenges' },
            { id: 'summary', label: '4. Mastery Report' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioManager.play('tap');
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Global Score & Mastery */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400">Score:</span>
            <span className="text-amber-400 font-bold text-sm">{score} XP</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400">Mastery:</span>
            <span className="text-emerald-400 font-bold text-sm">{overallMastery}%</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col">
        {/* TAB 1: LEARN CONCEPTS (Discovery Question & Interactive Slides) */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Discovery Predict Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-950 text-amber-300 text-xs px-2.5 py-0.5 rounded border border-amber-700/60 font-semibold">
                  Discovery Warm-Up
                </span>
                <span className="text-xs text-slate-400">Predict Before Learning</span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-3">
                {DISCOVERY_PREDICTIONS[0].question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                {DISCOVERY_PREDICTIONS[0].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setUserPrediction(idx);
                      setShowPredictionFeedback(true);
                      if (idx === DISCOVERY_PREDICTIONS[0].correctIndex) {
                        audioManager.play('chime');
                        speechManager.speak('Spot on prediction!');
                      }
                    }}
                    className={`p-3 rounded-lg text-xs text-left border transition-all ${
                      userPrediction === idx
                        ? idx === DISCOVERY_PREDICTIONS[0].correctIndex
                          ? 'bg-emerald-950 border-emerald-600 text-emerald-200'
                          : 'bg-rose-950 border-rose-600 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {showPredictionFeedback && (
                <div className="p-3 bg-slate-950 rounded-lg border border-cyan-800/50 text-xs text-cyan-200 font-sans">
                  <strong>Insight:</strong> {DISCOVERY_PREDICTIONS[0].explanation}
                </div>
              )}
            </div>

            {/* Teaching Interactive Slide View */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs text-cyan-400 font-mono font-semibold uppercase">
                    Module {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    {TEACHING_SLIDES[currentSlideIndex].title}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={currentSlideIndex === 0}
                    onClick={() => {
                      audioManager.play('whoosh');
                      setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className="px-3 py-1.5 bg-slate-800 text-xs rounded border border-slate-700 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                    onClick={() => {
                      audioManager.play('whoosh');
                      setCurrentSlideIndex((prev) => Math.min(TEACHING_SLIDES.length - 1, prev + 1));
                    }}
                    className="px-3 py-1.5 bg-cyan-600 text-xs text-white rounded font-bold shadow hover:bg-cyan-500 disabled:opacity-40"
                  >
                    Next Concept
                  </button>
                </div>
              </div>

              {/* Slide Content Bullet Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-xs text-slate-300">
                  <h4 className="font-semibold text-slate-200 text-sm">Key Principles & Board Guidelines:</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    {TEACHING_SLIDES[currentSlideIndex].content.map((point, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-amber-900/40 text-[11px] text-amber-300">
                    <strong>ISC Exam Warning:</strong> Avoid vague definitions! Always state exact conditions: "H attached to N, O, or F", "at constant pressure", "perfect crystal at 0 K".
                  </div>
                </div>

                {/* Interactive Visual Visualizer per slide */}
                <div className="flex flex-col justify-center">
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'hbond' && (
                    <HydrogenBondVisualizer
                      mode={TEACHING_SLIDES[currentSlideIndex].interactiveProps?.mode as any || 'water'}
                      temperature={25}
                    />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'piston' && (
                    <PistonWorkSimulator
                      systemType="closed"
                      processType="isobaric"
                      temperature={300}
                      externalPressure={1.0}
                    />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'hess' && (
                    <HessLawCycleBuilder
                      targetReaction="C(s) + ½ O₂(g) → CO(g)"
                      targetDeltaH={-110.5}
                      givenReactions={[
                        { id: 'R1', eq: 'C(s, graphite) + O₂(g) → CO₂(g)', deltaH: -393.5 },
                        { id: 'R2', eq: 'CO(g) + ½ O₂(g) → CO₂(g)', deltaH: -283.0, defaultReversed: true }
                      ]}
                    />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'gibbs' && (
                    <GibbsSpontaneityVisualizer initialDeltaH={50} initialDeltaS={150} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPLORE LABORATORY SIMULATORS */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">
                Interactive Thermodynamics & Bonding Workbench
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Test parameters in real-time. Change temperature, pressure, boundary conditions, and watch system work, heat exchange, and spontaneity respond immediately.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase text-cyan-400 mb-2">1. Hydrogen Bonding & Lattice Simulator</h4>
                  <HydrogenBondVisualizer mode="water" temperature={40} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-indigo-400 mb-2">2. Piston Work & Energy Conservation</h4>
                  <PistonWorkSimulator
                    systemType="closed"
                    processType="isobaric"
                    temperature={350}
                    externalPressure={2.0}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase text-violet-400 mb-2">3. Gibbs Free Energy & Equilibrium Crossover</h4>
                <GibbsSpontaneityVisualizer initialDeltaH={-92.4} initialDeltaS={-198.7} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRACTICE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </span>
                  <h2 className="text-lg font-bold text-white">{currentChallenge.title}</h2>
                </div>
                <div className="text-xs font-mono bg-slate-950 px-3 py-1 rounded border border-slate-800 text-slate-300">
                  Node: {currentChallenge.nodeId}
                </div>
              </div>

              {/* Question text */}
              <p className="text-sm font-medium text-slate-200 mb-5 leading-relaxed">
                {currentChallenge.question}
              </p>

              {/* Answer options */}
              <div className="space-y-3 mb-5">
                {currentChallenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`w-full p-3.5 rounded-lg text-xs font-sans text-left border transition-all flex justify-between items-center ${
                      selectedAnswer === idx
                        ? idx === currentChallenge.correctIndex
                          ? 'bg-emerald-950 border-emerald-600 text-emerald-200'
                          : 'bg-rose-950 border-rose-600 text-rose-200'
                        : isAnswerSubmitted && idx === currentChallenge.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{option}</span>
                    <span className="font-mono text-[10px] opacity-60">[{String.fromCharCode(65 + idx)}]</span>
                  </button>
                ))}
              </div>

              {/* Explanation feedback */}
              {isAnswerSubmitted && (
                <div className="p-4 bg-slate-950 rounded-lg border border-cyan-800/60 text-xs space-y-2 mb-4">
                  <div className="font-bold text-cyan-300">Explanatory Feedback:</div>
                  <p className="text-slate-300 leading-relaxed">{currentChallenge.explanation}</p>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                >
                  💡 Need Hint?
                </button>

                {isAnswerSubmitted && (
                  <button
                    onClick={handleNextChallenge}
                    className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow hover:bg-emerald-500 transition-colors"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Mastery →'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MASTERY REPORT */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl">
                🏆
              </div>
              <h2 className="text-xl font-extrabold text-white">Simulation Complete!</h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                You have systematically covered all 10 core nodes for ISC Class 11 Thermodynamics and Hydrogen Bonding.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto my-4 font-mono">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Score</span>
                  <span className="text-lg font-bold text-amber-400">{score} XP</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Nodes Mastery</span>
                  <span className="text-lg font-bold text-emerald-400">{overallMastery}%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Challenges Done</span>
                  <span className="text-lg font-bold text-cyan-400">{CHALLENGES.length}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">SRS Retention</span>
                  <span className="text-lg font-bold text-violet-400">Optimal</span>
                </div>
              </div>

              {/* Node Breakdown Table */}
              <div className="text-left max-w-3xl mx-auto bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Node-by-Node BKT Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {ALL_NODE_IDS.map((id) => {
                    const info = NODE_DETAILS[id];
                    const level = getMasteryLevel(bktStates[id]);
                    return (
                      <div key={id} className="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 block">{id}</span>
                          <span className="font-semibold text-slate-200">{info.title}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                            level === 'mastered'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : level === 'proficient'
                              ? 'bg-amber-950 text-amber-300 border-amber-700'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab('learn');
                  setCurrentSlideIndex(0);
                  setCurrentChallengeIndex(0);
                }}
                className="px-6 py-2.5 bg-cyan-600 text-white font-bold text-xs rounded-lg shadow hover:bg-cyan-500 transition-colors"
              >
                Restart Simulation Session
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Feedback Effects */}
      <HintBubble show={showHint} text={currentChallenge?.hint || 'Think about the basic definition & conditions.'} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
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