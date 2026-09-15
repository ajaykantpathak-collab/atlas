"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- NODE IDENTIFIERS ---
const NODE_061 = 'c12_chem_061'; // Colour and magnetic properties of complexes
const NODE_062 = 'c12_chem_062'; // Bonding in metal carbonyls
const NODE_063 = 'c12_chem_063'; // Haloalkanes - classification and nomenclature
const NODE_064 = 'c12_chem_064'; // Haloalkanes - preparation
const NODE_065 = 'c12_chem_065'; // SN1 and SN2 reactions
const NODE_066 = 'c12_chem_066'; // Elimination reactions
const NODE_067 = 'c12_chem_067'; // Haloarenes
const NODE_068 = 'c12_chem_068'; // Alcohols - preparation
const NODE_069 = 'c12_chem_069'; // Alcohols - physical properties
const NODE_070 = 'c12_chem_070'; // Alcohols - chemical reactions

const ALL_NODE_IDS = [
  NODE_061, NODE_062, NODE_063, NODE_064, NODE_065,
  NODE_066, NODE_067, NODE_068, NODE_069, NODE_070
];

// --- TYPES ---
interface BKTStateMap {
  [nodeId: string]: ReturnType<typeof createBKTState>;
}

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  misconceptionId?: string;
  category: 'coordination' | 'haloalkane' | 'alcohol';
}

interface Misconception {
  id: string;
  nodeId: string;
  title: string;
  description: string;
  correction: string;
}

interface TeachingSlide {
  id: string;
  nodeId: string;
  title: string;
  subtitle: string;
  content: string;
  visualType: 'crystalField' | 'carbonyl' | 'sn1sn2' | 'elimination' | 'haloarene' | 'alcoholLab';
  keyTakeaway: string;
}

// --- VISUAL ENGINE COMPONENTS ---

// 1. Crystal Field Visualizer (c12_chem_061)
const CrystalFieldVisualizer: React.FC<{
  dElectrons: number;
  ligandStrength: 'weak' | 'strong';
  geometry: 'octahedral' | 'tetrahedral';
  onStateChange?: (unpaired: number, isHighSpin: boolean) => void;
}> = ({ dElectrons, ligandStrength, geometry, onStateChange }) => {
  const isOctahedral = geometry === 'octahedral';
  const isWeak = ligandStrength === 'weak';
  
  // Calculate filling
  // Octahedral: t2g (3 lower), eg (2 higher)
  // Tetrahedral: e (2 lower), t2 (3 higher)
  let lowerCount = 0;
  let upperCount = 0;
  let isHighSpin = false;

  if (isOctahedral) {
    if (dElectrons <= 3) {
      lowerCount = dElectrons;
      upperCount = 0;
    } else if (dElectrons >= 4 && dElectrons <= 7) {
      if (isWeak) {
        isHighSpin = true;
        // Fill lower 3, then upper 2, then pair lower
        if (dElectrons === 4) { lowerCount = 3; upperCount = 1; }
        else if (dElectrons === 5) { lowerCount = 3; upperCount = 2; }
        else if (dElectrons === 6) { lowerCount = 4; upperCount = 2; }
        else { lowerCount = 5; upperCount = 2; }
      } else {
        isHighSpin = false;
        // Pair in t2g first
        lowerCount = Math.min(6, dElectrons);
        upperCount = dElectrons > 6 ? dElectrons - 6 : 0;
      }
    } else {
      lowerCount = 6;
      upperCount = dElectrons - 6;
    }
  } else {
    // Tetrahedral - almost always high spin due to small Delta_t
    isHighSpin = true;
    if (dElectrons <= 2) {
      lowerCount = dElectrons;
      upperCount = 0;
    } else if (dElectrons <= 5) {
      lowerCount = 2;
      upperCount = dElectrons - 2;
    } else {
      lowerCount = 2 + Math.min(2, dElectrons - 5);
      upperCount = 3 + Math.max(0, dElectrons - 7);
    }
  }

  // Count unpaired
  const lowerSlots = isOctahedral ? 3 : 2;
  const upperSlots = isOctahedral ? 2 : 3;

  const countUnpairedInSet = (count: number, slots: number) => {
    const singles = Math.max(0, count <= slots ? count : slots * 2 - count);
    return singles;
  };

  const unpairedLower = countUnpairedInSet(lowerCount, lowerSlots);
  const unpairedUpper = countUnpairedInSet(upperCount, upperSlots);
  const totalUnpaired = unpairedLower + unpairedUpper;
  const mu = Math.sqrt(totalUnpaired * (totalUnpaired + 2)).toFixed(2);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(totalUnpaired, isHighSpin);
    }
  }, [totalUnpaired, isHighSpin, onStateChange]);

  // Colors for d-d transition absorption
  const absorbedColors: { [key: number]: { color: string; label: string; compColor: string; compHex: string } } = {
    0: { color: 'none', label: 'None (d⁰)', compColor: 'Colorless', compHex: '#e2e8f0' },
    1: { color: '#eab308', label: 'Yellow-Green', compColor: 'Purple / Violet', compHex: '#a855f7' },
    2: { color: '#3b82f6', label: 'Blue', compColor: 'Orange', compHex: '#f97316' },
    3: { color: '#ef4444', label: 'Red', compColor: 'Green', compHex: '#22c55e' },
    4: { color: '#10b981', label: 'Green', compColor: 'Pink / Red', compHex: '#ec4899' },
    5: { color: '#f97316', label: 'Orange', compColor: 'Pale Blue', compHex: '#38bdf8' },
    6: { color: '#8b5cf6', label: 'Violet', compColor: 'Yellow', compHex: '#fde047' },
    7: { color: '#ec4899', label: 'Pink', compColor: 'Green-Blue', compHex: '#06b6d4' },
    8: { color: '#06b6d4', label: 'Cyan', compColor: 'Red-Orange', compHex: '#ea580c' },
    9: { color: '#eab308', label: 'Yellow', compColor: 'Deep Blue', compHex: '#1d4ed8' },
    10: { color: 'none', label: 'None (d¹⁰)', compColor: 'Colorless', compHex: '#e2e8f0' },
  };

  const absInfo = absorbedColors[dElectrons] || absorbedColors[0];

  return (
    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h4 className="font-bold text-cyan-400 text-base">Crystal Field d-Orbital Splitting</h4>
          <p className="text-xs text-slate-400">
            Geometry: <span className="text-white font-semibold">{geometry}</span> | Field: <span className="text-amber-400 font-semibold">{ligandStrength.toUpperCase()}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-slate-800 px-3 py-1.5 rounded-lg text-xs">
          <div>
            <span className="text-slate-400">Unpaired: </span>
            <span className="font-bold text-amber-400 text-sm">{totalUnpaired}</span>
          </div>
          <div className="border-l border-slate-700 pl-3">
            <span className="text-slate-400">μ = </span>
            <span className="font-bold text-emerald-400 text-sm">{mu} BM</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Orbital Split Diagram */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative min-h-[220px] flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 flex justify-between">
            <span>Energy (E) ↑</span>
            <span>{isOctahedral ? 'Δₒ Splitting' : 'Δₜ Splitting'}</span>
          </div>

          {/* Upper Set */}
          <div className="space-y-1">
            <div className="text-xs text-center text-slate-400 font-semibold">
              {isOctahedral ? 'e_g (d_x²-y², d_z²)' : 't_2 (d_xy, d_yz, d_zx)'}
            </div>
            <div className="flex justify-center space-x-3">
              {Array.from({ length: upperSlots }).map((_, slotIdx) => {
                // Calculate arrows in this orbital
                const electronCount = upperCount;
                const hasSingle = electronCount > slotIdx;
                const hasPair = electronCount > slotIdx + upperSlots;
                return (
                  <div key={`upper-${slotIdx}`} className="w-12 h-12 border-2 border-cyan-500/50 bg-slate-900/80 rounded-lg flex items-center justify-center relative shadow-inner">
                    <AnimatePresence>
                      {hasSingle && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400 text-lg font-bold">
                          ↑
                        </motion.span>
                      )}
                      {hasPair && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-amber-400 text-lg font-bold ml-0.5">
                          ↓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Splitting Gap Indicator */}
          <div className="my-2 border-t border-dashed border-slate-700 flex justify-center items-center relative">
            <span className="bg-slate-950 px-2 text-[10px] text-slate-500 font-mono">
              {isOctahedral ? (isWeak ? 'Small Δₒ (High Spin)' : 'Large Δₒ (Low Spin)') : 'Small Δₜ'}
            </span>
          </div>

          {/* Lower Set */}
          <div className="space-y-1">
            <div className="flex justify-center space-x-3">
              {Array.from({ length: lowerSlots }).map((_, slotIdx) => {
                const electronCount = lowerCount;
                const hasSingle = electronCount > slotIdx;
                const hasPair = electronCount > slotIdx + lowerSlots;
                return (
                  <div key={`lower-${slotIdx}`} className="w-12 h-12 border-2 border-indigo-500/50 bg-slate-900/80 rounded-lg flex items-center justify-center relative shadow-inner">
                    <AnimatePresence>
                      {hasSingle && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400 text-lg font-bold">
                          ↑
                        </motion.span>
                      )}
                      {hasPair && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-amber-400 text-lg font-bold ml-0.5">
                          ↓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-center text-slate-400 font-semibold">
              {isOctahedral ? 't_2g (d_xy, d_yz, d_zx)' : 'e (d_x²-y², d_z²)'}
            </div>
          </div>
        </div>

        {/* Color & Magnetic Summary */}
        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-slate-300">Observed Complex Color & Transition</div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div
              className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: absInfo.compHex, color: ['Colorless', 'Yellow'].includes(absInfo.compColor) ? '#0f172a' : '#ffffff' }}
            >
              {absInfo.compColor === 'Colorless' ? 'Ø' : '★'}
            </div>
            <div className="text-xs space-y-0.5">
              <div className="text-slate-400">Absorbed: <span className="text-slate-200 font-medium">{absInfo.label}</span></div>
              <div className="font-bold text-slate-100">Transmitted: <span style={{ color: absInfo.compHex }}>{absInfo.compColor}</span></div>
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Magnetic Nature:</span>
              <span className={`font-bold ${totalUnpaired > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {totalUnpaired > 0 ? 'Paramagnetic' : 'Diamagnetic'}
              </span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">d-d Transition:</span>
              <span className="text-slate-200">
                {dElectrons > 0 && dElectrons < 10 ? 'Allowed (Coloured)' : 'Forbidden / No gap (Colourless)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Metal Carbonyl Synergic Bonding Visualizer (c12_chem_062)
const CarbonylBondingVisualizer: React.FC<{
  metal: 'Ni' | 'Fe' | 'Cr';
}> = ({ metal }) => {
  const [activeTab, setActiveTab] = useState<'sigma' | 'pi' | 'both'>('both');

  const metalData = {
    Ni: { formula: 'Ni(CO)₄', oxidation: 0, valence: 10, ligands: 4, shape: 'Tetrahedral', irFrequency: '2058 cm⁻¹' },
    Fe: { formula: 'Fe(CO)₅', oxidation: 0, valence: 8, ligands: 5, shape: 'Trigonal Bipyramidal', irFrequency: '2034 cm⁻¹' },
    Cr: { formula: 'Cr(CO)₆', oxidation: 0, valence: 6, ligands: 6, shape: 'Octahedral', irFrequency: '2000 cm⁻¹' },
  }[metal];

  const totalElectrons = metalData.valence + metalData.ligands * 2;

  return (
    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h4 className="font-bold text-amber-400 text-base">Bonding in Metal Carbonyls: Synergic Bond</h4>
          <p className="text-xs text-slate-400">Complex: <span className="text-white font-mono font-bold">{metalData.formula}</span> ({metalData.shape})</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1 rounded-lg text-xs font-mono">
          <span className="text-slate-400">Rule:</span>
          <span className="text-emerald-400 font-bold">{totalElectrons} e⁻ (18-Electron Rule)</span>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        <button
          onClick={() => { setActiveTab('sigma'); audioManager.play('tap'); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'sigma' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
        >
          σ-Donation (C → M)
        </button>
        <button
          onClick={() => { setActiveTab('pi'); audioManager.play('tap'); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'pi' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
        >
          π Back-Bonding (M → π* CO)
        </button>
        <button
          onClick={() => { setActiveTab('both'); audioManager.play('tap'); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'both' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
        >
          Synergic (Both)
        </button>
      </div>

      {/* SVG Bond Visualizer */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative flex justify-center items-center min-h-[200px]">
        <svg viewBox="0 0 500 180" className="w-full max-w-lg h-auto">
          {/* Metal Atom */}
          <circle cx="120" cy="90" r="35" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
          <text x="120" y="95" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="18">{metal}(0)</text>

          {/* Carbon Atom */}
          <circle cx="280" cy="90" r="24" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
          <text x="280" y="95" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="16">C</text>

          {/* Oxygen Atom */}
          <circle cx="390" cy="90" r="24" fill="#334155" stroke="#ef4444" strokeWidth="2" />
          <text x="390" y="95" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="16">O</text>

          {/* Triple C≡O bond lines */}
          <line x1="304" y1="82" x2="366" y2="82" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="304" y1="90" x2="366" y2="90" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="304" y1="98" x2="366" y2="98" stroke="#cbd5e1" strokeWidth="2" />

          {/* Sigma Donation Arrow (C -> M) */}
          {(activeTab === 'sigma' || activeTab === 'both') && (
            <g>
              <defs>
                <marker id="arrowhead-cyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                </marker>
              </defs>
              <line x1="254" y1="85" x2="160" y2="85" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowhead-cyan)" strokeDasharray="4" className="animate-pulse" />
              <text x="207" y="75" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">σ-lone pair donation</text>
            </g>
          )}

          {/* Pi Back-donation Arrow (M -> CO pi*) */}
          {(activeTab === 'pi' || activeTab === 'both') && (
            <g>
              <defs>
                <marker id="arrowhead-amber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#f59e0b" />
                </marker>
              </defs>
              <path d="M 155 102 Q 207 130 256 102" fill="none" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead-amber)" strokeDasharray="4" />
              <text x="207" y="145" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">π Back-bonding (M d → CO π*)</text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-slate-400">IR C-O Stretching Frequency:</span>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-slate-400 line-through">Free CO: 2143 cm⁻¹</span>
            <span className="text-emerald-400 font-bold font-mono">Bound: {metalData.irFrequency}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Back-donation populates CO π* antibonding orbitals, weakening C-O bond order.</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-slate-400">Oxidation State of Metal:</span>
          <div className="font-bold text-amber-400 mt-1 text-sm">Zero (0)</div>
          <p className="text-[11px] text-slate-500 mt-1">CO is a neutral ligand. Simple binary carbonyls have oxidation state 0.</p>
        </div>
      </div>
    </div>
  );
};

// 3. SN1 vs SN2 Reaction Simulator (c12_chem_065)
const SN1SN2Simulator: React.FC<{
  substrateType: 'primary' | 'secondary' | 'tertiary';
  nucleophileStrength: 'strong' | 'weak';
  solvent: 'protic' | 'aprotic';
}> = ({ substrateType, nucleophileStrength, solvent }) => {
  const [step, setStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Determine mechanism preference
  const isSN2 = substrateType === 'primary' || (substrateType === 'secondary' && nucleophileStrength === 'strong' && solvent === 'aprotic');
  const mechanism = isSN2 ? 'SN2 (Bimolecular)' : 'SN1 (Unimolecular)';

  const resetSim = () => {
    setStep(0);
    setIsAnimating(false);
  };

  const handleNextStep = () => {
    audioManager.play('pop');
    if (isSN2) {
      if (step < 2) setStep(step + 1);
    } else {
      if (step < 3) setStep(step + 1);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h4 className="font-bold text-emerald-400 text-base">Nucleophilic Substitution Simulator</h4>
          <p className="text-xs text-slate-400">
            Substrate: <span className="text-white font-semibold">{substrateType.toUpperCase()}</span> | Nu: <span className="text-amber-400">{nucleophileStrength}</span> | Solvent: <span className="text-cyan-400">{solvent}</span>
          </p>
        </div>
        <div className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold text-xs">
          {mechanism}
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px] relative">
        {/* Visual Animation Area */}
        <div className="w-full max-w-md flex justify-around items-center h-32 relative">
          {isSN2 ? (
            /* SN2 Mechanism Visual */
            <div className="w-full flex justify-between items-center px-4">
              {step === 0 && (
                <div className="w-full flex justify-around items-center">
                  <div className="bg-amber-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">Nu⁻ (Backside)</div>
                  <div className="text-slate-500 font-mono">→</div>
                  <div className="border border-slate-700 bg-slate-900 px-4 py-3 rounded-xl flex items-center space-x-2">
                    <span className="font-bold text-slate-200">{substrateType === 'primary' ? 'CH₃CH₂' : 'R₂CH'}</span>
                    <span className="text-red-400 font-bold text-lg">- Br</span>
                  </div>
                </div>
              )}
              {step === 1 && (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-full text-center space-y-2">
                  <div className="inline-block bg-indigo-950 border-2 border-dashed border-indigo-500 p-4 rounded-2xl">
                    <span className="text-xs text-indigo-300 font-mono font-bold">[ Nu ⋯ C(R₂) ⋯ Br ]<sup>‡</sup></span>
                    <p className="text-[10px] text-indigo-400 mt-1">Trigonal Bipyramidal Transition State (5-coordinate)</p>
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex justify-around items-center">
                  <div className="border border-emerald-500/50 bg-emerald-950/40 px-4 py-3 rounded-xl flex items-center space-x-2 shadow-lg">
                    <span className="text-amber-400 font-bold text-lg">Nu -</span>
                    <span className="font-bold text-slate-200">{substrateType === 'primary' ? 'CH₂CH₃' : 'CHR₂'}</span>
                  </div>
                  <div className="bg-red-950 border border-red-700 px-3 py-1.5 rounded-full text-xs font-bold text-red-300">+ Br⁻</div>
                </motion.div>
              )}
            </div>
          ) : (
            /* SN1 Mechanism Visual */
            <div className="w-full flex justify-between items-center px-2">
              {step === 0 && (
                <div className="w-full flex justify-center items-center">
                  <div className="border border-slate-700 bg-slate-900 px-4 py-3 rounded-xl flex items-center space-x-2">
                    <span className="font-bold text-slate-200">(CH₃)₃C</span>
                    <span className="text-red-400 font-bold text-lg">- Br</span>
                  </div>
                </div>
              )}
              {step === 1 && (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-full flex justify-around items-center">
                  <div className="border-2 border-cyan-500 bg-cyan-950/50 px-4 py-3 rounded-xl text-center">
                    <span className="font-bold text-cyan-300 text-lg">(CH₃)₃C⁺</span>
                    <p className="text-[10px] text-cyan-400">Planar Carbocation Intermediate</p>
                  </div>
                  <div className="bg-red-950 border border-red-700 px-2.5 py-1 rounded-full text-xs text-red-300">+ Br⁻</div>
                </motion.div>
              )}
              {step === 2 && (
                <div className="w-full flex justify-around items-center">
                  <div className="bg-amber-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce">Nu⁻ Attacks Either Face</div>
                  <div className="border border-cyan-500 bg-cyan-950/50 px-3 py-2 rounded-xl text-cyan-300 font-bold">(CH₃)₃C⁺</div>
                </div>
              )}
              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center space-y-1">
                  <div className="inline-block border border-emerald-500 bg-emerald-950 px-4 py-2 rounded-xl text-emerald-300 font-bold text-sm">
                    (CH₃)₃C - Nu
                  </div>
                  <p className="text-[11px] text-amber-400 font-semibold">Racemisation (if chiral starting halide)</p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Step Controls */}
        <div className="flex items-center space-x-3 mt-4">
          <button
            onClick={resetSim}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
          >
            Reset
          </button>
          <button
            onClick={handleNextStep}
            disabled={(isSN2 && step === 2) || (!isSN2 && step === 3)}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-bold transition shadow-md"
          >
            {(isSN2 && step === 2) || (!isSN2 && step === 3) ? 'Complete' : 'Advance Reaction Step →'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400">Order:</span>
          <div className="font-bold text-slate-200">{isSN2 ? '2nd Order (Rate = k[R-X][Nu])' : '1st Order (Rate = k[R-X])'}</div>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400">Stereochemistry:</span>
          <div className="font-bold text-amber-400">{isSN2 ? 'Walden Inversion (100%)' : 'Racemisation (50:50)'}</div>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400">Intermediate:</span>
          <div className="font-bold text-cyan-400">{isSN2 ? 'None (Transition State)' : 'Carbocation'}</div>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400">Favoured Solvent:</span>
          <div className="font-bold text-emerald-400">{isSN2 ? 'Polar Aprotic (Acetone, DMF)' : 'Polar Protic (Water, EtOH)'}</div>
        </div>
      </div>
    </div>
  );
};

// 4. Elimination & Saytzeff Rule Visualizer (c12_chem_066)
const EliminationSimulator: React.FC<{
  substrate: '2-bromobutane' | '1-bromobutane';
  baseType: 'small' | 'bulky';
}> = ({ substrate, baseType }) => {
  const is2Bromo = substrate === '2-bromobutane';
  const isSmall = baseType === 'small';

  // Major product according to Zaitsev / Hofmann
  let majorProduct = 'but-2-ene';
  let minorProduct = 'but-1-ene';
  let majorRatio = '80%';
  let minorRatio = '20%';

  if (is2Bromo) {
    if (isSmall) {
      majorProduct = 'but-2-ene (Saytzeff - More Substituted)';
      minorProduct = 'but-1-ene (Minor)';
      majorRatio = '81%';
      minorRatio = '19%';
    } else {
      majorProduct = 'but-1-ene (Hofmann - Less Hindered)';
      minorProduct = 'but-2-ene (Minor)';
      majorRatio = '73%';
      minorRatio = '27%';
    }
  } else {
    majorProduct = 'but-1-ene';
    minorProduct = 'None';
    majorRatio = '100%';
    minorRatio = '0%';
  }

  return (
    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h4 className="font-bold text-rose-400 text-base">Dehydrohalogenation & Saytzeff's Rule</h4>
          <p className="text-xs text-slate-400">
            Substrate: <span className="text-white font-mono font-bold">{substrate}</span> | Base: <span className="text-amber-400">{isSmall ? 'Alc. KOH (Small)' : 't-BuOK (Bulky)'}</span>
          </p>
        </div>
        <div className="bg-rose-950 border border-rose-700 text-rose-300 font-bold px-3 py-1 rounded-lg text-xs">
          β-Elimination
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="text-xs text-slate-400">Reaction Outcome Distribution:</div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-emerald-400">Major Product: {majorProduct}</span>
              <span className="font-mono text-emerald-300 font-bold">{majorRatio}</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: majorRatio }}
                className="bg-emerald-500 h-full rounded-full"
              />
            </div>
          </div>

          {minorProduct !== 'None' && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Minor Product: {minorProduct}</span>
                <span className="font-mono text-slate-400">{minorRatio}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: minorRatio }}
                  className="bg-slate-500 h-full rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-900 rounded-lg text-xs border border-slate-800 space-y-1">
          <div className="font-semibold text-amber-300">Saytzeff's Rule (Zaitsev):</div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            "In dehydrohalogenation reactions, the preferred product is the alkene that has the greater number of alkyl groups attached to the doubly bonded carbon atoms (more substituted alkene)."
          </p>
        </div>
      </div>
    </div>
  );
};

// 5. Alcohol Reagent & Reaction Lab (c12_chem_068, c12_chem_069, c12_chem_070)
const AlcoholLabVisualizer: React.FC<{
  alcoholClass: '1deg' | '2deg' | '3deg';
  reagent: 'lucas' | 'pcc' | 'kmno4' | 'socl2' | 'na';
}> = ({ alcoholClass, reagent }) => {
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    let res = '';
    if (reagent === 'lucas') {
      if (alcoholClass === '3deg') res = 'Immediate turbidity (Instant insoluble alkyl chloride separation)';
      else if (alcoholClass === '2deg') res = 'Turbidity appears within 5 minutes';
      else res = 'No turbidity at room temperature; turns turbid only on heating';
    } else if (reagent === 'pcc') {
      if (alcoholClass === '1deg') res = 'Oxidises cleanly to Aldehyde (R-CHO) without over-oxidation';
      else if (alcoholClass === '2deg') res = 'Oxidises to Ketone (R₂C=O)';
      else res = 'No reaction / Resistant to mild oxidation';
    } else if (reagent === 'kmno4') {
      if (alcoholClass === '1deg') res = 'Oxidises to Carboxylic Acid (R-COOH); Purple KMnO₄ turns colorless/brown';
      else if (alcoholClass === '2deg') res = 'Oxidises to Ketone (R₂C=O)';
      else res = 'Resistant under normal acidic conditions';
    } else if (reagent === 'socl2') {
      res = 'Converts R-OH → R-Cl + SO₂ (g) ↑ + HCl (g) ↑ [Best lab prep as by-products escape as gases]';
    } else if (reagent === 'na') {
      res = 'Effervescence of H₂ gas ↑ and forms Sodium Alkoxide (2 R-OH + 2 Na → 2 R-ONa + H₂)';
    }
    setTestResult(res);
  }, [alcoholClass, reagent]);

  return (
    <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h4 className="font-bold text-cyan-400 text-base">Alcohol Chemical Reactions Lab</h4>
          <p className="text-xs text-slate-400">
            Alcohol: <span className="text-white font-bold">{alcoholClass === '1deg' ? 'Primary (1°)' : alcoholClass === '2deg' ? 'Secondary (2°)' : 'Tertiary (3°)'}</span>
          </p>
        </div>
        <div className="bg-cyan-950 border border-cyan-700 text-cyan-300 px-3 py-1 rounded-lg text-xs font-mono font-bold">
          Reagent: {reagent.toUpperCase()}
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center space-x-4">
        <div className="w-12 h-24 bg-slate-900 border-2 border-slate-700 rounded-b-xl flex flex-col justify-end p-1 relative shadow-inner flex-shrink-0">
          <motion.div
            key={`${alcoholClass}-${reagent}`}
            initial={{ height: '20%' }}
            animate={{ height: '70%' }}
            className={`w-full rounded-b-lg transition-colors ${
              reagent === 'lucas' && alcoholClass === '3deg' ? 'bg-slate-300 opacity-90' :
              reagent === 'kmno4' ? 'bg-purple-600' : 'bg-cyan-500/80'
            }`}
          />
        </div>

        <div className="space-y-2 flex-1">
          <div className="text-xs text-slate-400">Observation & Product:</div>
          <motion.div
            key={testResult}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-emerald-300 font-semibold leading-relaxed"
          >
            {testResult}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- DATA STRUCTURES: ENRICHMENT CONTENT ---

const SCENARIOS = {
  title: "Class 12 Chemistry: Complex Properties, Organometallics & Organic Transformation Lab",
  description: "Master coordination complex magnetic moments, synergic carbonyl bonding, substitution/elimination pathways, haloarene resonance, and alcohol reactions for ISC board exams."
};

const DISCOVERY_QUESTION = {
  prompt: "Why is the [Ti(H₂O)₆]³⁺ complex solution distinctly purple in color, while a [Zn(H₂O)₆]²⁺ solution is completely colorless?",
  options: [
    "Ti³⁺ has a d¹ configuration with an unpaired electron capable of visible d-d transition; Zn²⁺ is d¹⁰ with fully filled d-orbitals.",
    "Zn²⁺ absorbs purple light while Ti³⁺ reflects all visible wavelengths.",
    "Water ligands break down in the presence of Zinc ions.",
    "Titanium is a heavier element than Zinc and thus absorbs UV rays."
  ],
  correctIndex: 0,
  explanation: "Correct! [Ti(H₂O)₆]³⁺ contains Ti³⁺ (d¹). Under octahedral CFT splitting, visible yellow-green light promotes the single electron from t₂g to e_g (a d-d transition), transmitting the complementary purple color. Zn²⁺ is d¹⁰; with all d-orbitals completely filled, no d-d transition is possible, making it colorless."
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'm1',
    nodeId: NODE_061,
    title: 'All transition metal complexes are coloured',
    description: 'Students assume any complex with a d-block metal must show visible colour.',
    correction: 'Colour from d-d transitions requires an incomplete d-subshell (d¹ to d⁹). d⁰ and d¹⁰ species (e.g. Sc³⁺, Zn²⁺) cannot undergo d-d transitions and are colourless.'
  },
  {
    id: 'm2',
    nodeId: NODE_062,
    title: 'Oxidation state in binary carbonyls equals ligand count',
    description: 'Believing metal in Ni(CO)₄ has oxidation state +4.',
    correction: 'CO is a neutral ligand; in simple binary carbonyls like Ni(CO)₄, Fe(CO)₅, and Cr(CO)₆, the metal oxidation state is zero (0).'
  },
  {
    id: 'm3',
    nodeId: NODE_065,
    title: 'All nucleophilic substitutions cause inversion',
    description: 'Assuming SN1 reactions lead exclusively to Walden inversion.',
    correction: 'SN2 causes 100% inversion via backside attack. SN1 forms a planar carbocation intermediate, leading to attack from either face and racemisation.'
  },
  {
    id: 'm4',
    nodeId: NODE_067,
    title: 'Chlorobenzene undergoes fast SN2 like chloromethane',
    description: 'Treating chlorobenzene as highly reactive towards nucleophiles at room temperature.',
    correction: 'Haloarenes are unreactive towards nucleophilic substitution because the C-X bond has partial double bond character due to resonance and the carbon is sp² hybridised.'
  }
];

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_061',
    nodeId: NODE_061,
    title: 'Crystal Field Theory: Colour & Magnetism',
    subtitle: 'd-d Transitions & Spin States',
    content: 'In octahedral field, 5 d-orbitals split into lower t2g and higher eg. Photons of visible light match Δ⒪ energy gap, exciting an electron from t2g to eg (d-d transition). The transmitted light is the complementary colour. Magnetic moment μ = √(n(n+2)) BM depends on unpaired electrons (n).',
    visualType: 'crystalField',
    keyTakeaway: 'd-d transition absorbs visible photon → Complementary color seen. Strong ligands give low spin; weak ligands give high spin.'
  },
  {
    id: 'slide_062',
    nodeId: NODE_062,
    title: 'Bonding in Metal Carbonyls',
    subtitle: 'Synergic Bonding & 18-Electron Rule',
    content: 'Bonding has two reinforcing parts: (1) σ-donation from carbon lone pair to empty metal orbital (M←CO), and (2) π back-bonding from filled metal d-orbitals to empty π* antibonding orbitals of CO (M→CO). This synergic effect strengthens M-C bond but lowers C-O stretch IR frequency from 2143 to ~2058 cm⁻¹.',
    visualType: 'carbonyl',
    keyTakeaway: 'Synergic bonding = σ-donation + π back-donation into CO π*. Metal oxidation state is 0 in simple binary carbonyls.'
  },
  {
    id: 'slide_065',
    nodeId: NODE_065,
    title: 'SN1 vs SN2 Mechanisms',
    subtitle: 'Kinetics, Stereochemistry & Substrates',
    content: 'SN2 is a 1-step concerted backside attack favoured by 1° halides, strong nucleophiles, and polar aprotic solvents (gives 100% Walden inversion). SN1 is a 2-step process involving a planar carbocation intermediate, favoured by 3° halides and polar protic solvents (gives racemisation).',
    visualType: 'sn1sn2',
    keyTakeaway: 'SN2: 1° > 2° > 3° (Inversion, 2nd order). SN1: 3° > 2° > 1° (Racemisation, 1st order).'
  },
  {
    id: 'slide_066',
    nodeId: NODE_066,
    title: 'Elimination Reactions & Saytzeff Rule',
    subtitle: 'Dehydrohalogenation with Alcoholic KOH',
    content: 'Heating haloalkanes with alcoholic KOH removes H-X to yield alkenes (β-elimination). According to Saytzeff’s (Zaitsev) rule, the major product is the more substituted alkene (joined to more alkyl groups) because of hyperconjugative stability.',
    visualType: 'elimination',
    keyTakeaway: 'Dehydrohalogenation with Alc. KOH yields the more substituted alkene as major product (Saytzeff rule).'
  },
  {
    id: 'slide_070',
    nodeId: NODE_070,
    title: 'Alcohol Reaction Lab & Lucas Test',
    subtitle: 'Distinguishing 1°, 2°, and 3° Alcohols',
    content: 'Lucas reagent (conc. HCl + anhyd. ZnCl2) tests carbocation stability: 3° alcohols react immediately (turbidity), 2° in 5 mins, 1° only on heating. Oxidation with PCC stops 1° alcohols at aldehydes, while KMnO4 oxidises 1° to carboxylic acids and 2° to ketones.',
    visualType: 'alcoholLab',
    keyTakeaway: 'Lucas test: 3° immediate, 2° 5 mins, 1° heat. PCC stops primary alcohol oxidation at aldehyde.'
  }
];

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    nodeId: NODE_061,
    title: 'Magnetic Moment Calculation',
    prompt: 'Calculate the spin-only magnetic moment (μ) for a high-spin d⁵ octahedral complex such as [FeF₆]³⁻.',
    options: ['1.73 BM', '3.87 BM', '5.92 BM', '0.00 BM'],
    correctIndex: 2,
    explanation: 'High-spin d⁵ has configuration t₂g³ e_g². All 5 electrons are unpaired (n = 5). μ = √(5(5+2)) = √35 ≈ 5.92 BM.',
    hint: 'Use μ = √(n(n+2)) where n is the number of unpaired electrons.',
    category: 'coordination'
  },
  {
    id: 'c2',
    nodeId: NODE_061,
    title: 'Low-Spin Complex Behavior',
    prompt: 'Why is [Fe(CN)₆]⁴⁻ diamagnetic while [FeF₆]³⁻ is strongly paramagnetic?',
    options: [
      'CN⁻ is a strong-field ligand causing large Δ⒪ and electron pairing (t₂g⁶ e_g⁰, n=0); F⁻ is a weak-field ligand giving high-spin (t₂g³ e_g², n=5).',
      'CN⁻ removes all electrons from iron.',
      'Fluoride turns iron into a d¹⁰ ion.',
      'Iron in cyanide complex has positive spin alignment.'
    ],
    correctIndex: 0,
    explanation: 'Fe²⁺ in [Fe(CN)₆]⁴⁻ is d⁶ with strong CN⁻, giving low-spin t₂g⁶ (n=0, diamagnetic). Fe³⁺ in [FeF₆]³⁻ is d⁵ with weak F⁻, giving high-spin t₂g³ e_g² (n=5, paramagnetic).',
    hint: 'Look up CN⁻ and F⁻ in the spectrochemical series.',
    category: 'coordination'
  },
  {
    id: 'c3',
    nodeId: NODE_062,
    title: 'Carbonyl IR Stretching Frequency',
    prompt: 'Why is the C-O stretching frequency in Ni(CO)₄ (~2058 cm⁻¹) lower than free carbon monoxide (2143 cm⁻¹)?',
    options: [
      'Metal-to-ligand π back-donation populates the C-O π* antibonding orbital, reducing C-O bond order.',
      'Nickel pulls electrons directly out of the C-O σ bond.',
      'CO molecules condense inside the crystal lattice.',
      'Free CO vibrates faster due to thermal noise.'
    ],
    correctIndex: 0,
    explanation: 'Back-bonding (M d → CO π*) places electron density into the antibonding π* molecular orbital of CO, lowering the C-O bond order and decreasing its IR stretching frequency.',
    hint: 'Consider which molecular orbital of CO receives electron density during back-donation.',
    category: 'coordination'
  },
  {
    id: 'c4',
    nodeId: NODE_063,
    title: 'IUPAC Nomenclature',
    prompt: 'What is the correct IUPAC name for (CH₃)₃CCl?',
    options: ['Isopropyl chloride', '2-chloro-2-methylpropane', 'tert-butyl chloride', '1-chlorobutane'],
    correctIndex: 1,
    explanation: 'The longest carbon chain has 3 carbons (propane). Chlorine and a methyl group are both at carbon-2, giving 2-chloro-2-methylpropane. Tert-butyl chloride is the common name.',
    hint: 'Select the longest continuous carbon chain containing the C-Cl bond.',
    category: 'haloalkane'
  },
  {
    id: 'c5',
    nodeId: NODE_064,
    title: 'Best Reagent for Alkyl Chloride Prep',
    prompt: 'Why is thionyl chloride (SOCl₂) preferred over PCl₅ for converting ethanol to chloroethane?',
    options: [
      'SOCl₂ produces gaseous by-products (SO₂ and HCl) that escape, making isolation of pure chloroethane easy.',
      'PCl₅ is too explosive for high school labs.',
      'SOCl₂ gives a higher oxidation state.',
      'SOCl₂ works without heating.'
    ],
    correctIndex: 0,
    explanation: 'CH₃CH₂OH + SOCl₂ → CH₃CH₂Cl + SO₂ (g) ↑ + HCl (g) ↑. Both by-products escape as gases, leaving clean liquid chloroethane.',
    hint: 'Focus on the physical state of the by-products.',
    category: 'haloalkane'
  },
  {
    id: 'c6',
    nodeId: NODE_065,
    title: 'SN2 Kinetics & Stereochemistry',
    prompt: 'What stereochemical outcome and rate law are observed when (S)-2-bromobutane undergoes SN2 reaction with aqueous NaOH?',
    options: [
      'Complete inversion to (R)-butan-2-ol; Rate = k[2-bromobutane][OH⁻]',
      'Racemisation mixture; Rate = k[2-bromobutane]',
      'Retention of configuration; Rate = k[OH⁻]',
      'No reaction occurs'
    ],
    correctIndex: 0,
    explanation: 'SN2 proceeds via single-step backside attack causing 100% Walden inversion ((S) → (R)) and second-order kinetics dependent on both substrate and nucleophile.',
    hint: 'SN2 involves backside attack in a single concerted step.',
    category: 'haloalkane'
  },
  {
    id: 'c7',
    nodeId: NODE_066,
    title: 'Saytzeff Rule Application',
    prompt: 'What is the major organic product when 2-bromobutane is heated with alcoholic KOH?',
    options: ['But-1-ene', 'But-2-ene', 'Butan-2-ol', 'Butyne'],
    correctIndex: 1,
    explanation: 'By Saytzeff’s rule, dehydrohalogenation eliminates a β-hydrogen from C3 to form but-2-ene (more substituted, more stable alkene) as the major product.',
    hint: 'Choose the alkene with more alkyl groups attached to the double bond.',
    category: 'haloalkane'
  },
  {
    id: 'c8',
    nodeId: NODE_067,
    title: 'Unreactivity of Haloarenes',
    prompt: 'Why is chlorobenzene extremely unreactive towards nucleophilic substitution compared to chloroethane?',
    options: [
      'C-Cl bond has partial double bond character due to resonance with the benzene ring and the carbon is sp² hybridised.',
      'Benzene ring repels all organic reagents.',
      'Chlorine atom in chlorobenzene carries a full positive charge.',
      'Chlorobenzene is insoluble in water.'
    ],
    correctIndex: 0,
    explanation: 'Resonance delocalises the halogen lone pair into the ring, giving the C-Cl bond partial double bond character (shorter & stronger). Also, sp² carbon holds bonding electrons more tightly than sp³.',
    hint: 'Think about lone pair delocalisation into the aromatic π-cloud.',
    category: 'haloalkane'
  },
  {
    id: 'c9',
    nodeId: NODE_068,
    title: 'Hydroboration-Oxidation Regiochemistry',
    prompt: 'Predict the major alcohol obtained when propene is treated with diborane (BH₃)₂ followed by alkaline H₂O₂.',
    options: ['Propan-2-ol', 'Propan-1-ol', 'Propane-1,2-diol', 'Propanone'],
    correctIndex: 1,
    explanation: 'Hydroboration-oxidation yields the anti-Markovnikov alcohol. For propene (CH₃CH=CH₂), the -OH group attaches to the terminal less-substituted carbon, giving propan-1-ol.',
    hint: 'Does hydroboration-oxidation give Markovnikov or anti-Markovnikov addition of water?',
    category: 'alcohol'
  },
  {
    id: 'c10',
    nodeId: NODE_070,
    title: 'Lucas Test Distinction',
    prompt: 'Which alcohol gives an immediate cloudy turbidity upon adding Lucas reagent (conc. HCl + anhyd. ZnCl₂) at room temperature?',
    options: ['Ethanol (1°)', 'Propan-2-ol (2°)', '2-methylpropan-2-ol (3°)', 'Methanol (1°)'],
    correctIndex: 2,
    explanation: '2-methylpropan-2-ol is a 3° alcohol. It rapidly forms a highly stable 3° carbocation, yielding immediate turbidity from insoluble 2-chloro-2-methylpropane.',
    hint: 'Carbocation stability determines the rate: 3° > 2° > 1°.',
    category: 'alcohol'
  }
];

const MISCONCEPTIONS_CHECKLIST = [
  {
    id: "misc_1",
    title: "Absorbed Light Color is the Color Observed in Complexes",
    description: "Students often believe that the color displayed by a coordination complex is identical to the exact color of light absorbed during d-d transitions.",
    correction: "The observed color of a complex is actually the complementary color of the light absorbed. When a complex absorbs light of a specific wavelength to promote an electron across the split d-orbitals, the transmitted or reflected light consists of the remaining unabsorbed wavelengths, which combine to give the observed complementary color.",
  },
  {
    id: "misc_2",
    title: "All Colored Transition Metal Complexes Rely on d-d Transitions",
    description: "Students frequently assume that any colored coordination compound must owe its color solely to d-d electronic transitions. Consequently, they fail to explain why species with d0 or d10 configurations display intense colors.",
    correction: "d-d transitions require partially filled d-orbitals ($d^1$ to $d^9$) to occur. Complexes with $d^0$ or $d^{10}$ central metal ions, such as $\\text{KMnO}_4$ ($d^0$) or $\\text{K}_2\\text{Cr}_2\\text{O}_7$ ($d^0$), derive their intense colors from Charge Transfer (CT) spectra rather than d-d transitions.",
  },
  {
    id: "misc_3",
    title: "Strong Field Ligands Always Produce Diamagnetic Complexes",
    description: "Students often believe that strong field ligands force all d-electrons to pair up, making the resulting complex strictly diamagnetic. They overlook the total electron count of the central metal ion.",
    correction: "Strong field ligands cause large crystal field splitting ($\\Delta_o > P$) and favor low spin states by forcing electron pairing. However, if the metal ion has an odd number of d-electrons (such as a low-spin $d^5$ configuration), at least one unpaired electron must remain, rendering the complex paramagnetic.",
  },
  {
    id: "misc_4",
    title: "Tetrahedral Complexes Can Form Low Spin Configurations",
    description: "Students commonly assume that tetrahedral complexes can exist in both high spin and low spin configurations depending on whether the ligands are strong field or weak field.",
    correction: "The crystal field splitting energy in tetrahedral fields ($\\Delta_t$) is significantly smaller than in octahedral fields ($\\Delta_t \\approx \\frac{4}{9}\\Delta_o$). Because $\\Delta_t$ is almost always less than the electron pairing energy ($P$), pairing is energetically unfavorable. Consequently, tetrahedral complexes are almost exclusively high spin regardless of the ligand.",
  },
  {
    id: "misc_5",
    title: "Higher Positive CFSE Values Indicate Greater Complex Stability",
    description: "Students frequently confuse the sign and magnitude of Crystal Field Stabilization Energy (CFSE), assuming a higher positive value implies greater stabilization.",
    correction: "CFSE represents the net decrease in potential energy (energy released) when d-orbitals split in a crystal field compared to a hypothetical spherical field. Therefore, a more negative CFSE value (or a larger magnitude of released energy) corresponds to greater thermodynamic stability of the complex.",
  },
];

// --- MAIN COMPONENT ---
export default function C12_ChemistryColourandmagneticpropertiesofcomplexesSim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'slides' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // User Answers & Scores
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [challengeAnswers, setChallengeAnswers] = useState<{ [id: string]: number }>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState<{ [id: string]: boolean }>({});

  // Interactive Lab States
  const [dElectrons, setDElectrons] = useState<number>(5);
  const [ligandStrength, setLigandStrength] = useState<'weak' | 'strong'>('weak');
  const [geometry, setGeometry] = useState<'octahedral' | 'tetrahedral'>('octahedral');
  const [metalCarbonyl, setMetalCarbonyl] = useState<'Ni' | 'Fe' | 'Cr'>('Ni');
  const [subType, setSubType] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [nuStrength, setNuStrength] = useState<'strong' | 'weak'>('strong');
  const [solventType, setSolventType] = useState<'protic' | 'aprotic'>('aprotic');
  const [elimSubstrate, setElimSubstrate] = useState<'2-bromobutane' | '1-bromobutane'>('2-bromobutane');
  const [elimBase, setElimBase] = useState<'small' | 'bulky'>('small');
  const [alcoholClass, setAlcoholClass] = useState<'1deg' | '2deg' | '3deg'>('1deg');
  const [alcoholReagent, setAlcoholReagent] = useState<'lucas' | 'pcc' | 'kmno4' | 'socl2' | 'na'>('lucas');

  // Educational Engine States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [bannerText, setBannerText] = useState<string>('Great Job!');
  const [showHintBubble, setShowHintBubble] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');

  // BKT Mastery Tracking
  const [bktStates, setBktStates] = useState<BKTStateMap>(() => {
    const map: BKTStateMap = {};
    ALL_NODE_IDS.forEach(nodeId => {
      map[nodeId] = createBKTState();
    });
    return map;
  });

  // Auto-hint timer
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const triggerAutoHint = useCallback((text: string) => {
    setHintText(text);
    setShowHintBubble(true);
    audioManager.play('hint');
  }, []);

  const resetInactivityTimer = useCallback((text: string) => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setShowHintBubble(false);
    inactivityTimer.current = setTimeout(() => {
      triggerAutoHint(text);
    }, 12000); // 12 seconds inactivity
  }, [triggerAutoHint]);

  useEffect(() => {
    if (activeTab === 'challenges') {
      const curr = CHALLENGES[currentChallengeIndex];
      resetInactivityTimer(curr.hint);
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [activeTab, currentChallengeIndex, resetInactivityTimer]);

  // Handle Discovery Question Submit
  const handleDiscoverySubmit = (index: number) => {
    if (discoverySubmitted) return;
    setSelectedDiscoveryOption(index);
    setDiscoverySubmitted(true);

    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak("Excellent discovery! Unpaired d-electrons undergo d-d transitions under crystal field splitting.");
      setShowSparkle(true);
      setShowConfetti(true);
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite. Consider the d-electron count and d-d transition requirement.");
    }
  };

  // Handle Challenge Answer
  const handleChallengeSelect = (optionIndex: number) => {
    const currentChallenge = CHALLENGES[currentChallengeIndex];
    if (challengeSubmitted[currentChallenge.id]) return;

    setChallengeAnswers(prev => ({ ...prev, [currentChallenge.id]: optionIndex }));
    setChallengeSubmitted(prev => ({ ...prev, [currentChallenge.id]: true }));

    const isCorrect = optionIndex === currentChallenge.correctIndex;
    const nodeId = currentChallenge.nodeId;

    // BKT & SRS Update
    setBktStates(prev => {
      const updated = bktUpdate(prev[nodeId] || createBKTState(), isCorrect);
        const _reviewItem = createReviewItem('C12_ChemistryColoura', 'challenge');
        sm2Update(_reviewItem, 4, 0);
      return { ...prev, [nodeId]: updated };
    });

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak("Correct answer! Mastery level increased.");
      setShowSparkle(true);
      setBannerText("Mastery Point Earned!");
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Incorrect. Read the explanation and try to apply the concept.");
    }
  };

  // Overall Score Calculation
  const totalScore = useMemo(() => {
    let score = 0;
    CHALLENGES.forEach(c => {
      if (challengeAnswers[c.id] === c.correctIndex) {
        score += 10;
      }
    });
    return score;
  }, [challengeAnswers]);

  // Final Completion
  useEffect(() => {
    if (activeTab === 'summary') {
      recordGameScore(NODE_061, totalScore);
      audioManager.play('celebration');
      speechManager.speak("Congratulations! You have completed the Class 12 ISC Chemistry Interactive Simulation.");
    }
  }, [activeTab, totalScore]);

  const activeSlide = TEACHING_SLIDES[currentSlideIndex];
  const activeChallenge = CHALLENGES[currentChallengeIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 space-y-6 max-w-6xl mx-auto selection:bg-cyan-500 selection:text-slate-950">
      {/* HEADER BAR */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-cyan-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Class 12 ISC
            </span>
            <span className="text-xs text-slate-400 font-medium">Chemistry Unit 6 & 7</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black text-slate-100 mt-1 tracking-tight">
            Complexes, Carbonyls, Organics & Reactions Lab
          </h1>
        </div>

        {/* Global Progress & Mastery */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Score</div>
            <div className="text-xl font-black text-amber-400 font-mono">{totalScore} / 100</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 flex items-center justify-center bg-slate-950 font-bold text-xs text-cyan-400">
            {Math.round((totalScore / 100) * 100)}%
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === 'discovery' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'}`}
        >
          1. Discovery
        </button>
        <button
          onClick={() => { setActiveTab('slides'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === 'slides' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'}`}
        >
          2. Visual Lessons
        </button>
        <button
          onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === 'lab' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'}`}
        >
          3. Interactive Lab
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === 'challenges' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'}`}
        >
          4. Board Challenges
        </button>
        <button
          onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === 'summary' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'}`}
        >
          5. Mastery Summary
        </button>
      </nav>

      {/* SECTION 1: DISCOVERY QUESTION */}
      {activeTab === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs px-3 py-1 rounded-full">
              Predict & Discover
            </div>
            <h2 className="text-xl font-bold text-slate-100">{DISCOVERY_QUESTION.prompt}</h2>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  className={`p-4 rounded-xl text-left text-xs sm:text-sm transition border ${
                    selectedDiscoveryOption === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-red-950 border-red-500 text-red-200'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            {discoverySubmitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
                <div className="font-bold text-cyan-400">Explanation:</div>
                <p className="leading-relaxed">{DISCOVERY_QUESTION.explanation}</p>
                <button
                  onClick={() => { setActiveTab('slides'); audioManager.play('swoop'); }}
                  className="mt-3 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition"
                >
                  Proceed to Visual Lessons →
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* SECTION 2: VISUAL TEACHING SLIDES */}
      {activeTab === 'slides' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}</span>
                <h2 className="text-lg font-bold text-slate-100">{activeSlide.title}</h2>
                <p className="text-xs text-slate-400">{activeSlide.subtitle}</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    if (currentSlideIndex > 0) {
                      setCurrentSlideIndex(currentSlideIndex - 1);
                      audioManager.play('pop');
                    }
                  }}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg transition"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => {
                    if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                      setCurrentSlideIndex(currentSlideIndex + 1);
                      audioManager.play('pop');
                    } else {
                      setActiveTab('lab');
                      audioManager.play('swoop');
                    }
                  }}
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition"
                >
                  {currentSlideIndex === TEACHING_SLIDES.length - 1 ? 'Go to Lab →' : 'Next →'}
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeSlide.content}</p>

            {/* Slide Visual Rendering */}
            <div className="pt-2">
              {activeSlide.visualType === 'crystalField' && (
                <CrystalFieldVisualizer dElectrons={dElectrons} ligandStrength={ligandStrength} geometry={geometry} />
              )}
              {activeSlide.visualType === 'carbonyl' && (
                <CarbonylBondingVisualizer metal={metalCarbonyl} />
              )}
              {activeSlide.visualType === 'sn1sn2' && (
                <SN1SN2Simulator substrateType={subType} nucleophileStrength={nuStrength} solvent={solventType} />
              )}
              {activeSlide.visualType === 'elimination' && (
                <EliminationSimulator substrate={elimSubstrate} baseType={elimBase} />
              )}
              {activeSlide.visualType === 'alcoholLab' && (
                <AlcoholLabVisualizer alcoholClass={alcoholClass} reagent={alcoholReagent} />
              )}
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 font-semibold">
              💡 <span className="underline">Key Takeaway</span>: {activeSlide.keyTakeaway}
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 3: INTERACTIVE LAB HUB */}
      {activeTab === 'lab' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-base flex items-center space-x-2">
              <span>🧪 Interactive Chemistry Laboratory Controls</span>
            </h3>
            <p className="text-xs text-slate-400">Manipulate complex geometries, ligands, organic substrates, and reagents to observe real-time split diagrams and mechanism outcomes.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lab Module 1: Coordination Complexes */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-cyan-400 uppercase tracking-wider">Module A: CFT & Carbonyls</h4>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">d-Electron Count: <span className="text-white font-bold">{dElectrons}</span></label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={dElectrons}
                      onChange={(e) => setDElectrons(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="flex space-x-2 pt-1">
                    <button
                      onClick={() => setLigandStrength('weak')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${ligandStrength === 'weak' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Weak Field (F⁻)
                    </button>
                    <button
                      onClick={() => setLigandStrength('strong')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${ligandStrength === 'strong' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Strong Field (CN⁻)
                    </button>
                  </div>

                  <div className="flex space-x-2 pt-1">
                    <button
                      onClick={() => setGeometry('octahedral')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${geometry === 'octahedral' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Octahedral (O_h)
                    </button>
                    <button
                      onClick={() => setGeometry('tetrahedral')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${geometry === 'tetrahedral' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Tetrahedral (T_d)
                    </button>
                  </div>
                </div>

                <CrystalFieldVisualizer dElectrons={dElectrons} ligandStrength={ligandStrength} geometry={geometry} />
              </div>

              {/* Lab Module 2: Organic Substitution & Elimination */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider">Module B: Substitution & Reactions</h4>

                <div className="space-y-2 text-xs">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSubType('primary')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${subType === 'primary' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Primary (1°)
                    </button>
                    <button
                      onClick={() => setSubType('secondary')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${subType === 'secondary' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Secondary (2°)
                    </button>
                    <button
                      onClick={() => setSubType('tertiary')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${subType === 'tertiary' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Tertiary (3°)
                    </button>
                  </div>

                  <div className="flex space-x-2 pt-1">
                    <button
                      onClick={() => setSolventType('aprotic')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${solventType === 'aprotic' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Aprotic (Acetone)
                    </button>
                    <button
                      onClick={() => setSolventType('protic')}
                      className={`flex-1 py-1 rounded text-xs font-bold border transition ${solventType === 'protic' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                      Protic (H₂O/EtOH)
                    </button>
                  </div>
                </div>

                <SN1SN2Simulator substrateType={subType} nucleophileStrength={nuStrength} solvent={solventType} />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 4: BOARD EXAM CHALLENGES */}
      {activeTab === 'challenges' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Question {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
                <h3 className="text-base font-bold text-slate-100">{activeChallenge.title}</h3>
              </div>
              <div className="text-xs bg-slate-800 px-3 py-1 rounded-lg text-slate-300 font-mono">
                Node: {activeChallenge.nodeId}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">{activeChallenge.prompt}</p>

            <div className="grid grid-cols-1 gap-3">
              {activeChallenge.options.map((opt, idx) => {
                const isSelected = challengeAnswers[activeChallenge.id] === idx;
                const isSubmitted = challengeSubmitted[activeChallenge.id];
                const isCorrect = idx === activeChallenge.correctIndex;

                let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
                if (isSubmitted) {
                  if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                  else if (isSelected) btnStyle = 'bg-red-950 border-red-500 text-red-200';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleChallengeSelect(idx)}
                    disabled={isSubmitted}
                    className={`p-4 rounded-xl text-left text-xs sm:text-sm transition border ${btnStyle}`}
                  >
                    <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                );
              })}
            </div>

            {challengeSubmitted[activeChallenge.id] && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm space-y-2">
                <div className="font-bold text-cyan-400">Official ISC Explanation:</div>
                <p className="text-slate-300 leading-relaxed">{activeChallenge.explanation}</p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      if (currentChallengeIndex < CHALLENGES.length - 1) {
                        setCurrentChallengeIndex(currentChallengeIndex + 1);
                        audioManager.play('pop');
                      } else {
                        setActiveTab('summary');
                        audioManager.play('swoop');
                      }
                    }}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    {currentChallengeIndex === CHALLENGES.length - 1 ? 'Finish & View Summary →' : 'Next Question →'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* SECTION 5: MASTERY SUMMARY */}
      {activeTab === 'summary' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 text-center">
            <div className="w-20 h-20 bg-emerald-950 border-4 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center text-3xl font-black mx-auto shadow-2xl">
              ✓
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-100">Simulation Complete!</h2>
              <p className="text-xs text-slate-400 mt-1">You have covered all 10 Class 12 ISC Chemistry learning nodes.</p>
            </div>

            {/* Node Breakdown Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-left pt-2">
              {ALL_NODE_IDS.map((nodeId, idx) => {
                const state = bktStates[nodeId];
                const p = state ? state.p : 0.5;
                const percent = Math.round(p * 100);

                return (
                  <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-500 font-mono">Node {idx + 61}</div>
                    <div className="font-mono text-xs font-bold text-slate-200">{nodeId}</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="text-[10px] text-cyan-400 font-bold text-right">{percent}% Mastered</div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 max-w-xl mx-auto text-left">
              <div className="font-bold text-amber-400">Examiner Advice for Board Exams:</div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                <li>Always explicitly state <span className="text-white font-semibold">d-d transition</span> when explaining color in complexes.</li>
                <li>Write complete arrow notations (<span className="text-white font-semibold">M←CO and M→CO</span>) for synergic bonding.</li>
                <li>Never write only "conc." for nitration; write <span className="text-white font-semibold">conc. HNO₃ + conc. H₂SO₄</span>.</li>
                <li>Always include gaseous by-products (<span className="text-white font-semibold">SO₂ + HCl</span>) when specifying SOCl₂ prep.</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setActiveTab('discovery');
                setDiscoverySubmitted(false);
                setSelectedDiscoveryOption(null);
                setChallengeAnswers({});
                setChallengeSubmitted({});
                setCurrentChallengeIndex(0);
                audioManager.play('swoop');
              }}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition shadow-lg"
            >
              Restart Full Simulation
            </button>
          </div>
        </motion.div>
      )}

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHintBubble} text={hintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text={bannerText} />
      {showSparkle && <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />}

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