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

// ============================================================================
// NODE ID DEFINITIONS & METADATA
// ============================================================================

const ALL_NODE_IDS = [
  "c9_chem_041",
  "c9_chem_042",
  "c9_chem_043",
  "c9_chem_044",
  "c9_chem_045",
  "c9_chem_046",
  "c9_chem_047",
  "c9_chem_048",
  "c9_chem_049",
  "c9_chem_050"
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface NodeInfo {
  id: NodeId;
  title: string;
  shortDesc: string;
}

const NODE_DETAILS: Record<NodeId, NodeInfo> = {
  c9_chem_041: { id: "c9_chem_041", title: "Lab Prep of Hydrogen", shortDesc: "Zn + dil H2SO4, purification & downward displacement of water" },
  c9_chem_042: { id: "c9_chem_042", title: "Bosch Process", shortDesc: "Industrial manufacture via water gas & iron chromite catalyst" },
  c9_chem_043: { id: "c9_chem_043", title: "Redox (O/H Concept)", shortDesc: "Oxidation as O addition/H removal; Reduction as O removal/H addition" },
  c9_chem_044: { id: "c9_chem_044", title: "Redox (Electronic Concept)", shortDesc: "OIL RIG: Loss of electrons is oxidation, gain is reduction" },
  c9_chem_045: { id: "c9_chem_045", title: "Oxidising & Reducing Agents", shortDesc: "Electron acceptors (oxidising) vs electron donors (reducing)" },
  c9_chem_046: { id: "c9_chem_046", title: "Gas Behavior & Motion", shortDesc: "Random molecular motion, wall collisions create gas pressure" },
  c9_chem_047: { id: "c9_chem_047", title: "Boyle's Law", shortDesc: "P1V1 = P2V2 at constant temperature for a fixed mass" },
  c9_chem_048: { id: "c9_chem_048", title: "Charles's Law", shortDesc: "V1/T1 = V2/T2 at constant pressure; absolute T in Kelvin" },
  c9_chem_049: { id: "c9_chem_049", title: "Combined Gas Equation", shortDesc: "P1V1/T1 = P2V2/T2 and absolute zero (-273.15 °C = 0 K)" },
  c9_chem_050: { id: "c9_chem_050", title: "Kelvin & Celsius Conversion", shortDesc: "K = °C + 273 and Standard Temperature & Pressure (STP)" },
};

// ============================================================================
// INTERACTIVE VISUAL COMPONENT 1: LAB PREPARATION OF HYDROGEN
// ============================================================================

const HydrogenLabPrepSim: React.FC = () => {
  const [acidAdded, setAcidAdded] = useState(false);
  const [zincPresent, setZincPresent] = useState(true);
  const [isPurified, setIsPurified] = useState(true);
  const [gasCollected, setGasCollected] = useState(0); // 0 to 100%
  const [popTested, setPopTested] = useState(false);
  const [showFlame, setShowFlame] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (acidAdded && zincPresent && gasCollected < 100) {
      interval = setInterval(() => {
        setGasCollected(prev => {
          const next = prev + 5;
          if (next % 20 === 0) audioManager.play('pop');
          return next > 100 ? 100 : next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [acidAdded, zincPresent, gasCollected]);

  const handleStartReaction = () => {
    setAcidAdded(true);
    audioManager.play('whoosh');
    speechManager.speak("Adding dilute sulphuric acid to granulated zinc. Bubbles of hydrogen gas begin to evolve!");
  };

  const handleReset = () => {
    setAcidAdded(false);
    setGasCollected(0);
    setPopTested(false);
    setShowFlame(false);
    audioManager.play('tap');
  };

  const handlePopTest = () => {
    if (gasCollected < 30) return;
    setPopTested(true);
    setShowFlame(true);
    audioManager.play('pop');
    speechManager.speak("Pop! Hydrogen burns with a characteristic pale blue flame and a pop sound!");
    setTimeout(() => setShowFlame(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 text-white shadow-xl my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <span>🧪</span> ICSE Lab Apparatus: Preparation & Collection of H₂
          </h3>
          <p className="text-sm text-slate-300">
            Node: <span className="font-mono text-amber-300">c9_chem_041</span> | Single Displacement: Zn + H₂SO₄ → ZnSO₄ + H₂↑
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleStartReaction}
            disabled={acidAdded}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              acidAdded
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            Pour Dilute H₂SO₄
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm border border-slate-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* SVG Apparatus Graphic */}
      <div className="relative w-full h-72 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 800 300">
          <defs>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="troughGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Woulf's Bottle / Generator Flask */}
          <rect x="80" y="160" width="100" height="110" rx="15" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
          <text x="130" y="220" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Woulf's Bottle</text>
          
          {/* Zinc Granules */}
          {zincPresent && (
            <g fill="#94a3b8">
              <circle cx="100" cy="260" r="6" />
              <circle cx="115" cy="263" r="7" />
              <circle cx="130" cy="258" r="5" />
              <circle cx="145" cy="262" r="6" />
              <circle cx="160" cy="260" r="5" />
            </g>
          )}

          {/* Acid Level */}
          {acidAdded && (
            <rect x="83" y="210" width="94" height="57" fill="url(#liquidGrad)" rx="5" />
          )}

          {/* Thistle Funnel */}
          <path d="M 105 70 L 115 70 L 115 240 L 105 240 Z" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="95,50 125,50 115,70 105,70" fill="#64748b" />
          <text x="110" y="42" textAnchor="middle" fill="#cbd5e1" fontSize="10">Thistle Funnel</text>

          {/* Reaction Bubbles */}
          {acidAdded && gasCollected < 100 && (
            <g fill="#38bdf8" opacity="0.8">
              <circle cx="110" cy="230" r="3"><animate attributeName="cy" values="230;170" dur="1s" repeatCount="indefinite" /></circle>
              <circle cx="130" cy="240" r="4"><animate attributeName="cy" values="240;170" dur="1.2s" repeatCount="indefinite" /></circle>
              <circle cx="150" cy="235" r="3"><animate attributeName="cy" values="235;170" dur="0.8s" repeatCount="indefinite" /></circle>
            </g>
          )}

          {/* Delivery Tube */}
          <path d="M 155 160 L 155 130 L 300 130 L 300 180 L 380 180 L 380 130 L 520 130 L 520 220 L 640 220 L 640 180" 
                fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />

          {/* Lead Nitrate Wash Bottle (Removes H2S) */}
          <rect x="270" y="170" width="60" height="90" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <rect x="272" y="210" width="56" height="48" fill="#1e3a8a" opacity="0.6" />
          <text x="300" y="235" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Lead Nitrate</text>
          <text x="300" y="248" textAnchor="middle" fill="#60a5fa" fontSize="8">(Removes H₂S)</text>

          {/* CaO Drying Tube (Removes H2O) */}
          <rect x="420" y="115" width="80" height="30" rx="5" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
          <text x="460" y="133" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">CaO Drying Tube</text>

          {/* Water Trough */}
          <rect x="580" y="200" width="180" height="70" rx="8" fill="url(#troughGrad)" stroke="#38bdf8" strokeWidth="2" />
          <text x="670" y="255" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">Water Trough</text>

          {/* Inverted Gas Jar */}
          <rect x="620" y="100" width="60" height="120" rx="6" fill="#0f172a" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="2.5" />
          
          {/* Water level inside gas jar (pushed down by H2 gas) */}
          <rect x="622" y={102 + (gasCollected * 0.95)} width="56" height={116 - (gasCollected * 0.95)} fill="#0284c7" opacity="0.6" />
          <text x="650" y="130" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
            {gasCollected > 0 ? `H₂ Gas (${gasCollected}%)` : 'Filled H₂O'}
          </text>

          {/* Downward Displacement Arrow */}
          {acidAdded && (
            <g transform="translate(690, 140)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
              <polygon points="-5,35 5,35 0,45" fill="#38bdf8" />
              <text x="12" y="25" fill="#38bdf8" fontSize="9" fontWeight="bold">Downward Displacement</text>
              <text x="12" y="36" fill="#38bdf8" fontSize="9">of Water</text>
            </g>
          )}

          {/* Flame animation for Pop Test */}
          {showFlame && (
            <g transform="translate(650, 80)">
              <circle cx="0" cy="0" r="18" fill="#fbbf24" opacity="0.8" />
              <circle cx="0" cy="0" r="10" fill="#ef4444" opacity="0.9" />
              <circle cx="0" cy="0" r="5" fill="#38bdf8" />
              <text x="0" y="-25" textAnchor="middle" fill="#fef08a" fontSize="14" fontWeight="bold">POP! 🔥</text>
            </g>
          )}
        </svg>
      </div>

      {/* Control & Observation Bar */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 block font-semibold">REACTION STATUS</span>
          <span className="text-sm text-emerald-300 font-medium">
            {acidAdded ? (gasCollected < 100 ? 'Evolving Hydrogen Gas...' : 'Gas Jar Full!') : 'Ready to start'}
          </span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 block font-semibold">PURIFICATION SEQUENCE</span>
          <span className="text-xs text-amber-300">
            1. Pb(NO₃)₂ removes H₂S | 2. CaO removes H₂O
          </span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-semibold">CHARACTERISTIC TEST</span>
            <span className="text-xs text-sky-300">Burning Splint Test</span>
          </div>
          <button
            onClick={handlePopTest}
            disabled={gasCollected < 30}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              gasCollected >= 30
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            Perform Pop Test 🔥
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// INTERACTIVE VISUAL COMPONENT 2: BOSCH PROCESS (INDUSTRIAL MANUFACTURE)
// ============================================================================

const BoschProcessSim: React.FC = () => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  const steps = [
    {
      step: 1,
      title: "Step 1: Water Gas Generation",
      eqn: "C(s) + H₂O(g) → CO(g) + H₂(g)  [Endothermic, >1000°C]",
      desc: "Superheated steam passed over white-hot coke yields Water Gas (mixture of CO and H₂).",
      temp: "> 1000 °C",
      pressure: "1 atm",
      catalyst: "None"
    },
    {
      step: 2,
      title: "Step 2: Water-Gas Shift Reaction",
      eqn: "CO(g) + H₂O(g) → CO₂(g) + H₂(g)  [Exothermic]",
      desc: "Water gas mixed with excess steam passed over Iron Chromite catalyst (Fe₂O₃ + Cr₂O₃). Yields extra H₂!",
      temp: "450 °C - 500 °C",
      pressure: "25 atm",
      catalyst: "Iron(III) oxide (Fe₂O₃) + Chromium promoter (Cr₂O₃)"
    },
    {
      step: 3,
      title: "Step 3: Separation of Carbon Dioxide",
      eqn: "CO₂(g) + H₂O(l) → H₂CO₃(aq)  [Under 25 atm Pressure]",
      desc: "CO₂ dissolves in water under high pressure (25 atm). Hydrogen is insoluble and passes through.",
      temp: "Room Temp",
      pressure: "25 atm",
      catalyst: "Water Scrubbing Tower"
    },
    {
      step: 4,
      title: "Step 4: Absorption of Residual Carbon Monoxide",
      eqn: "CuCl + CO + 2H₂O → CuCl·CO·2H₂O",
      desc: "Traces of poisonous CO are absorbed by ammoniacal Copper(I) Chloride solution. Pure dry H₂ collected!",
      temp: "Ambient",
      pressure: "Atmospheric",
      catalyst: "Ammoniacal CuCl Solution"
    }
  ];

  const current = steps[activeStep - 1];

  const handleStepClick = (stepNum: 1 | 2 | 3 | 4) => {
    setActiveStep(stepNum);
    audioManager.play('tap');
    speechManager.speak(steps[stepNum - 1].title);
  };

  return (
    <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 text-white shadow-xl my-4">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏭</span> Bosch Process: Large Scale Industrial Hydrogen Production
        </h3>
        <p className="text-sm text-slate-300">
          Node: <span className="font-mono text-amber-300">c9_chem_042</span> | Convert cheap Coke & Steam into massive volumes of pure H₂
        </p>
      </div>

      {/* Step Navigation Pipeline */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {steps.map(s => (
          <button
            key={s.step}
            onClick={() => handleStepClick(s.step as 1 | 2 | 3 | 4)}
            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
              activeStep === s.step
                ? 'bg-sky-950 border-sky-400 text-white shadow-lg shadow-sky-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">STAGE {s.step}</div>
            <div className="text-xs font-semibold truncate">{s.title.split(':')[1]}</div>
          </button>
        ))}
      </div>

      {/* Detailed Stage Visualizer */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="inline-block px-3 py-1 bg-sky-500/10 border border-sky-500/30 rounded-full text-xs text-sky-300 font-bold">
            {current.title}
          </div>
          
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-emerald-400 text-base font-bold shadow-inner">
            {current.eqn}
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{current.desc}</p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">TEMPERATURE</span>
              <span className="text-xs font-bold text-amber-400">{current.temp}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">PRESSURE</span>
              <span className="text-xs font-bold text-sky-400">{current.pressure}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">CATALYST / REAGENT</span>
              <span className="text-xs font-bold text-emerald-400 truncate block">{current.catalyst}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Schematic Diagram */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-sky-500/20">
            {activeStep === 1 && '🔥'}
            {activeStep === 2 && '⚡'}
            {activeStep === 3 && '🫧'}
            {activeStep === 4 && '✨'}
          </div>
          <span className="text-xs text-slate-400 font-semibold mb-1">KEY INDUSTRIAL TAKEAWAY</span>
          <span className="text-xs text-sky-200">
            {activeStep === 1 && "Water Gas (CO + H₂) is an intermediate mixture."}
            {activeStep === 2 && "Iron Chromite catalyst speeds up conversion at 450°C and 25 atm."}
            {activeStep === 3 && "CO₂ dissolves in water under pressure, leaving H₂ gas."}
            {activeStep === 4 && "Ammoniacal CuCl strips final CO traces for pure H₂."}
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// INTERACTIVE VISUAL COMPONENT 3: REDOX & ELECTRON TRANSFER VISUALIZER
// ============================================================================

const RedoxVisualizer: React.FC = () => {
  const [conceptMode, setConceptMode] = useState<'classical' | 'electronic'>('electronic');
  const [selectedReaction, setSelectedReaction] = useState<'cuo_h2' | 'zn_cuso4' | 'na_cl2'>('zn_cuso4');

  const reactions = {
    zn_cuso4: {
      name: "Zn + CuSO₄ → ZnSO₄ + Cu",
      classicalDesc: "Zinc displaces Copper from sulphate solution.",
      electronicDesc: "Zinc atoms donate 2 electrons each to Cu²⁺ ions.",
      oxHalf: "Zn → Zn²⁺ + 2e⁻  (Loss of e⁻ = Oxidation)",
      redHalf: "Cu²⁺ + 2e⁻ → Cu  (Gain of e⁻ = Reduction)",
      oxAgent: "CuSO₄ (Cu²⁺ accepts e⁻)",
      redAgent: "Zn Metal (Zn donates e⁻)",
      donor: "Zn",
      acceptor: "Cu²⁺"
    },
    cuo_h2: {
      name: "CuO + H₂ → Cu + H₂O",
      classicalDesc: "CuO loses Oxygen (Reduction); H₂ gains Oxygen (Oxidation).",
      electronicDesc: "Cu²⁺ in CuO gains 2e⁻; H₂ donates 2e⁻ to form H₂O.",
      oxHalf: "H₂ - 2e⁻ → 2H⁺  (Oxidation)",
      redHalf: "Cu²⁺ + 2e⁻ → Cu  (Reduction)",
      oxAgent: "CuO (Oxidising Agent)",
      redAgent: "H₂ Gas (Reducing Agent)",
      donor: "H₂",
      acceptor: "Cu²⁺ in CuO"
    },
    na_cl2: {
      name: "2Na + Cl₂ → 2NaCl",
      classicalDesc: "Sodium combines with Chlorine to form ionic salt.",
      electronicDesc: "Na loses 1e⁻ (Cation Na⁺); Cl gains 1e⁻ (Anion Cl⁻).",
      oxHalf: "Na → Na⁺ + e⁻  (Oxidation)",
      redHalf: "Cl₂ + 2e⁻ → 2Cl⁻  (Reduction)",
      oxAgent: "Cl₂ Gas (Electron Acceptor)",
      redAgent: "Na Metal (Electron Donor)",
      donor: "Na",
      acceptor: "Cl₂"
    }
  };

  const rxn = reactions[selectedReaction];

  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 text-white shadow-xl my-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
            <span>⚡</span> Oxidation & Reduction: Electronic vs Classical Concept
          </h3>
          <p className="text-sm text-slate-300">
            Nodes: <span className="font-mono text-amber-300">c9_chem_043, c9_chem_044, c9_chem_045</span> | OIL RIG: Loss is Oxidation, Gain is Reduction
          </p>
        </div>

        {/* Concept Toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { setConceptMode('classical'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              conceptMode === 'classical' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Classical (O / H)
          </button>
          <button
            onClick={() => { setConceptMode('electronic'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              conceptMode === 'electronic' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Electronic (e⁻ Transfer)
          </button>
        </div>
      </div>

      {/* Reaction Selector */}
      <div className="flex gap-2 mb-4">
        {(['zn_cuso4', 'cuo_h2', 'na_cl2'] as const).map(k => (
          <button
            key={k}
            onClick={() => { setSelectedReaction(k); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              selectedReaction === k
                ? 'bg-purple-950 border-purple-400 text-purple-200'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            {reactions[k].name}
          </button>
        ))}
      </div>

      {/* Main Visualizer Area */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="text-center p-3 bg-slate-900 rounded-xl border border-purple-500/30">
          <span className="text-lg font-mono font-bold text-amber-300">{rxn.name}</span>
        </div>

        {/* Animated Electron Transfer Diagram */}
        <div className="relative h-36 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-around px-8 overflow-hidden">
          {/* Donor */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-300 text-lg shadow-lg">
              {rxn.donor}
            </div>
            <span className="text-xs font-bold text-amber-400 mt-2">ELECTRON DONOR</span>
            <span className="text-[10px] text-slate-400">Gets Oxidised (Reducing Agent)</span>
          </div>

          {/* Animated Electron Stream */}
          <div className="flex-1 max-w-xs relative flex items-center justify-center">
            <div className="w-full h-1 bg-gradient-to-r from-amber-400 via-purple-400 to-sky-400 rounded-full" />
            <motion.div
              className="absolute w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center text-[10px] font-bold text-slate-950 shadow-lg shadow-cyan-400/50"
              animate={{ x: [-80, 80] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            >
              e⁻
            </motion.div>
          </div>

          {/* Acceptor */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center font-bold text-sky-300 text-lg shadow-lg">
              {rxn.acceptor}
            </div>
            <span className="text-xs font-bold text-sky-400 mt-2">ELECTRON ACCEPTOR</span>
            <span className="text-[10px] text-slate-400">Gets Reduced (Oxidising Agent)</span>
          </div>
        </div>

        {/* Detailed Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 bg-slate-900 rounded-xl border border-amber-500/20">
            <div className="text-xs font-bold text-amber-400 uppercase mb-1">OXIDATION HALF-REACTION</div>
            <div className="font-mono text-sm text-amber-200 mb-2">{rxn.oxHalf}</div>
            <div className="text-xs text-slate-300">
              <span className="font-bold text-amber-300">Reducing Agent:</span> {rxn.redAgent}
            </div>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-xl border border-sky-500/20">
            <div className="text-xs font-bold text-sky-400 uppercase mb-1">REDUCTION HALF-REACTION</div>
            <div className="font-mono text-sm text-sky-200 mb-2">{rxn.redHalf}</div>
            <div className="text-xs text-slate-300">
              <span className="font-bold text-sky-300">Oxidising Agent:</span> {rxn.oxAgent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// INTERACTIVE VISUAL COMPONENT 4: GAS LAWS & MOLECULAR MOTION PISTON SIMULATOR
// ============================================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const GasLawPistonSim: React.FC = () => {
  const [activeLaw, setActiveLaw] = useState<'motion' | 'boyle' | 'charles' | 'combined' | 'tempScale'>('boyle');
  
  // Gas state
  const [temperatureK, setTemperatureK] = useState(300); // Kelvin
  const [volumeL, setVolumeL] = useState(2.0); // Liters
  const [pressureAtm, setPressureAtm] = useState(1.5); // Atmospheres
  const particleCount = 60;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Initialize particles
  useEffect(() => {
    const p: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      p.push({
        x: Math.random() * 200 + 10,
        y: Math.random() * 180 + 10,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
      });
    }
    particlesRef.current = p;
  }, []);

  // Update calculated values based on Law Mode
  useEffect(() => {
    if (activeLaw === 'boyle') {
      // P1V1 = P2V2 -> P = k / V (where k = 1.5 * 2.0 = 3.0)
      const p = 3.0 / volumeL;
      setPressureAtm(parseFloat(p.toFixed(2)));
    } else if (activeLaw === 'charles') {
      // V1/T1 = V2/T2 -> V = k * T (where k = 2.0 / 300 = 0.00666)
      const v = 0.006666 * temperatureK;
      setVolumeL(parseFloat(v.toFixed(2)));
      setPressureAtm(1.0); // Constant pressure
    } else if (activeLaw === 'combined') {
      // P1V1/T1 = P2V2/T2 -> P = (k * T) / V
      const k = (1.5 * 2.0) / 300; // 0.01
      const p = (k * temperatureK) / volumeL;
      setPressureAtm(parseFloat(p.toFixed(2)));
    }
  }, [activeLaw, volumeL, temperatureK]);

  // Animation Loop for Canvas Piston & Particles
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const speedScale = Math.sqrt(temperatureK / 300);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Piston bounds
      const width = Math.min(280, volumeL * 70);
      const height = 180;
      const xStart = 10;
      const yStart = 10;

      // Draw Chamber Box
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.strokeRect(xStart, yStart, width, height);

      // Draw Piston Head
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(xStart + width, yStart, 12, height);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(xStart + width + 12, yStart + height / 2 - 8, 40, 16);

      // Move & render particles
      ctx.fillStyle = '#38bdf8';
      particlesRef.current.forEach(p => {
        p.x += p.vx * speedScale;
        p.y += p.vy * speedScale;

        // Bounce walls
        if (p.x <= xStart + 4 || p.x >= xStart + width - 4) {
          p.vx *= -1;
          p.x = Math.max(xStart + 5, Math.min(xStart + width - 5, p.x));
        }
        if (p.y <= yStart + 4 || p.y >= yStart + height - 4) {
          p.vy *= -1;
          p.y = Math.max(yStart + 5, Math.min(yStart + height - 5, p.y));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [volumeL, temperatureK]);

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 text-white shadow-xl my-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚙️</span> Interactive Gas Laws & Kinetic Piston Simulator
          </h3>
          <p className="text-sm text-slate-300">
            Nodes: <span className="font-mono text-amber-300">c9_chem_046 to c9_chem_050</span> | Molecular collisions create gas pressure
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1">
          {(['motion', 'boyle', 'charles', 'combined', 'tempScale'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => { setActiveLaw(mode); audioManager.play('tap'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all capitalize ${
                activeLaw === mode ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode === 'motion' && 'Molecular Motion'}
              {mode === 'boyle' && "Boyle's Law"}
              {mode === 'charles' && "Charles's Law"}
              {mode === 'combined' && 'Gas Eqn'}
              {mode === 'tempScale' && 'Kelvin / °C'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Piston View */}
        <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
          <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            SEALED GAS CYLINDER SIMULATION
          </div>
          <canvas ref={canvasRef} width={360} height={200} className="bg-slate-900 rounded-lg border border-slate-800" />
          
          <div className="grid grid-cols-3 gap-2 w-full mt-3 text-center">
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">PRESSURE (P)</span>
              <span className="text-sm font-bold text-amber-400">{pressureAtm} atm</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">VOLUME (V)</span>
              <span className="text-sm font-bold text-sky-400">{volumeL} L</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">TEMP (T)</span>
              <span className="text-sm font-bold text-emerald-400">{temperatureK} K ({temperatureK - 273} °C)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Controls & Explanation */}
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          {/* Sliders depending on Active Law */}
          {activeLaw === 'boyle' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-amber-500/20 text-xs text-slate-300">
                <span className="font-bold text-amber-400 block mb-1">BOYLE'S LAW (P₁V₁ = P₂V₂)</span>
                At constant Temperature (300 K), reducing Volume pushes particles into less space → Collision frequency doubles → Pressure doubles!
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold justify-between flex mb-1">
                  <span>Adjust Volume (V):</span>
                  <span className="text-sky-400">{volumeL} Liters</span>
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={volumeL}
                  onChange={e => setVolumeL(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeLaw === 'charles' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/20 text-xs text-slate-300">
                <span className="font-bold text-emerald-400 block mb-1">CHARLES'S LAW (V₁/T₁ = V₂/T₂)</span>
                At constant Pressure (1.0 atm), heating gas increases kinetic energy → Particles move faster & push piston outward → Volume increases directly with Kelvin T!
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold justify-between flex mb-1">
                  <span>Adjust Absolute Temperature (T):</span>
                  <span className="text-emerald-400">{temperatureK} K ({temperatureK - 273} °C)</span>
                </label>
                <input
                  type="range"
                  min="150"
                  max="600"
                  step="10"
                  value={temperatureK}
                  onChange={e => setTemperatureK(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeLaw === 'combined' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-purple-500/20 text-xs text-slate-300">
                <span className="font-bold text-purple-400 block mb-1">COMBINED GAS EQUATION (P₁V₁/T₁ = P₂V₂/T₂)</span>
                Merges Boyle's and Charles's laws into one master formula. Temperature MUST be converted to Kelvin first!
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold justify-between flex mb-1">
                  <span>Adjust Temperature (T):</span>
                  <span className="text-emerald-400">{temperatureK} K</span>
                </label>
                <input
                  type="range"
                  min="150"
                  max="600"
                  step="10"
                  value={temperatureK}
                  onChange={e => setTemperatureK(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold justify-between flex mb-1">
                  <span>Adjust Volume (V):</span>
                  <span className="text-sky-400">{volumeL} L</span>
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={volumeL}
                  onChange={e => setVolumeL(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeLaw === 'tempScale' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-sky-500/20 text-xs text-slate-300">
                <span className="font-bold text-sky-400 block mb-1">KELVIN & CELSIUS SCALE CONVERSION</span>
                Formula: <span className="font-mono text-amber-300 font-bold">K = °C + 273</span> | Absolute Zero: <span className="font-mono text-amber-300 font-bold">0 K = -273.15 °C</span>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold justify-between flex mb-1">
                  <span>Celsius Temperature (°C):</span>
                  <span className="text-amber-400">{temperatureK - 273} °C</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="1"
                  value={temperatureK}
                  onChange={e => setTemperatureK(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Absolute Zero:</span>
                  <span className="font-mono text-amber-300">0 K = -273 °C</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Freezing Point of Water (STP Temp):</span>
                  <span className="font-mono text-emerald-300">273 K = 0 °C</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Room Temperature:</span>
                  <span className="font-mono text-sky-300">298 K = 25 °C</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Boiling Point of Water:</span>
                  <span className="font-mono text-purple-300">373 K = 100 °C</span>
                </div>
              </div>
            </div>
          )}

          {activeLaw === 'motion' && (
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-amber-400 block">KINETIC THEORY OF GASES</span>
              <p>1. Gas molecules move constantly in random straight lines.</p>
              <p>2. Collisions with container walls exert a force per unit area = Gas Pressure.</p>
              <p>3. Temperature measures average kinetic energy. Higher T = Faster particle speed!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TEACHING SLIDES DATA (COVERING ALL 10 NODES)
// ============================================================================

interface TeachingSlide {
  id: number;
  nodeId: NodeId;
  title: string;
  conceptName: string;
  content: string;
  equation?: string;
  bullets: string[];
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 1,
    nodeId: "c9_chem_041",
    title: "1. Laboratory Preparation of Hydrogen",
    conceptName: "Single Displacement & Apparatus",
    equation: "Zn(s) + dil. H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
    content: "Hydrogen gas is prepared in school laboratories by reacting granulated zinc with dilute sulphuric acid in a Woulf's bottle.",
    bullets: [
      "Why Zinc? Sodium/Potassium react explosively; Magnesium is too violent; Iron is too slow; Copper does not react.",
      "Impurities Removed: H₂S removed by Lead Nitrate; SO₂/HCl removed by KMnO₄/Alkali wash; Water vapour removed by CaO drying tube.",
      "Collection Method: Collected by DOWNWARD DISPLACEMENT OF WATER because H₂ is virtually insoluble in water and lighter than air."
    ]
  },
  {
    id: 2,
    nodeId: "c9_chem_042",
    title: "2. Industrial Bosch Process",
    conceptName: "Large Scale Production from Water Gas",
    equation: "CO(g) + H₂O(g) → CO₂(g) + H₂(g)  [Fe₂O₃ + Cr₂O₃, 450°C, 25 atm]",
    content: "The Bosch process produces huge industrial volumes of hydrogen from cheap coke and superheated steam in two major stages.",
    bullets: [
      "Stage 1: Superheated steam passed over red-hot coke (>1000°C) produces Water Gas: C + H₂O → CO + H₂.",
      "Stage 2: Water gas + excess steam passed over heated Iron Chromite catalyst (450°C, 25 atm) yields CO₂ + H₂.",
      "Purification: CO₂ is dissolved in water under 25 atm pressure; residual CO is absorbed in ammoniacal CuCl solution."
    ]
  },
  {
    id: 3,
    nodeId: "c9_chem_043",
    title: "3. Oxidation & Reduction (O / H Concept)",
    conceptName: "Classical Oxygen and Hydrogen Transfer",
    equation: "CuO + H₂ → Cu + H₂O",
    content: "Classical redox defines reactions by the transfer of Oxygen or Hydrogen atoms.",
    bullets: [
      "Oxidation: Gain of Oxygen OR Loss of Hydrogen (e.g., H₂ gains O to form H₂O).",
      "Reduction: Loss of Oxygen OR Gain of Hydrogen (e.g., CuO loses O to form Cu).",
      "Simultaneous Process: Oxidation and Reduction ALWAYS occur together in a single redox reaction!"
    ]
  },
  {
    id: 4,
    nodeId: "c9_chem_044",
    title: "4. Oxidation & Reduction (Electronic Concept)",
    conceptName: "OIL RIG: Electron Loss & Gain",
    equation: "Zn + Cu²⁺ → Zn²⁺ + Cu  [Zn → Zn²⁺ + 2e⁻ | Cu²⁺ + 2e⁻ → Cu]",
    content: "The electronic concept explains redox at the atomic particle level, independent of whether oxygen or hydrogen is present.",
    bullets: [
      "OIL RIG Mnemonic: Oxidation Is Loss of electrons; Reduction Is Gain of electrons.",
      "Oxidation Half-Reaction: Species loses electrons and increases in positive charge (Cation formation).",
      "Reduction Half-Reaction: Species gains electrons and decreases in charge (Anion/neutral atom formation)."
    ]
  },
  {
    id: 5,
    nodeId: "c9_chem_045",
    title: "5. Oxidising & Reducing Agents",
    conceptName: "Electron Acceptors vs Donors",
    content: "Agents are classified by their role as electron donors or electron acceptors.",
    bullets: [
      "Oxidising Agent (Electron Acceptor): Accepts electrons from partner; ITSELF GETS REDUCED! Examples: KMnO₄, K₂Cr₂O₇, O₂, Cl₂.",
      "Reducing Agent (Electron Donor): Donates electrons to partner; ITSELF GETS OXIDISED! Examples: H₂, C, CO, SO₂, Zn.",
      "Key Trick: The species that gets oxidised IS the reducing agent!"
    ]
  },
  {
    id: 6,
    nodeId: "c9_chem_046",
    title: "6. Gas Behaviour & Molecular Motion",
    conceptName: "Kinetic Theory & Pressure Origin",
    content: "Gas particles are in continuous, random motion at high speeds with negligible intermolecular attraction.",
    bullets: [
      "Origin of Pressure: Countless gas molecules hitting the container walls exert force per unit area.",
      "Effect of Temperature: Temperature measures average kinetic energy. Heating causes faster motion and harder wall hits.",
      "Effect of Volume: Shrinking volume forces particles into smaller space → higher collision frequency → higher pressure."
    ]
  },
  {
    id: 7,
    nodeId: "c9_chem_047",
    title: "7. Boyle's Law",
    conceptName: "Pressure-Volume Inverse Proportionality",
    equation: "P₁V₁ = P₂V₂  [At Constant Temperature & Fixed Mass]",
    content: "At constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure.",
    bullets: [
      "Mathematical Form: P ∝ 1/V or PV = Constant.",
      "Graphical Shape: P vs V graph is a Hyperbola; P vs 1/V graph is a straight line through origin.",
      "Essential Condition: Temperature and Mass MUST remain strictly constant!"
    ]
  },
  {
    id: 8,
    nodeId: "c9_chem_048",
    title: "8. Charles's Law",
    conceptName: "Volume-Temperature Direct Proportionality",
    equation: "V₁ / T₁ = V₂ / T₂  [At Constant Pressure & Fixed Mass]",
    content: "At constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature in Kelvin.",
    bullets: [
      "Mathematical Form: V ∝ T (in Kelvin) or V/T = Constant.",
      "Absolute Temperature Mandatory: Always convert Celsius to Kelvin first (K = °C + 273)!",
      "Graphical Shape: V vs T (Kelvin) graph is a straight line passing through origin (0 K)."
    ]
  },
  {
    id: 9,
    nodeId: "c9_chem_049",
    title: "9. Combined Gas Equation & Absolute Zero",
    conceptName: "Master Relationship & Zero Kinetic Point",
    equation: "P₁V₁ / T₁ = P₂V₂ / T₂",
    content: "Merges Boyle's and Charles's laws into a single relationship for tracking simultaneous changes in P, V, and T.",
    bullets: [
      "Absolute Zero Definition: -273.15 °C or 0 K is the lowest theoretical temperature where all molecular motion ceases.",
      "Calculation Protocol: Substitute T in Kelvin, ensure consistent units for P (atm or mmHg) and V (L or mL)."
    ]
  },
  {
    id: 10,
    nodeId: "c9_chem_050",
    title: "10. Kelvin & Celsius Scale Conversion & STP",
    conceptName: "Temperature Conversion & Standard Reference",
    equation: "K = °C + 273   |   °C = K - 273",
    content: "Convert effortlessly between Celsius and absolute Kelvin scales, and master Standard Temperature and Pressure.",
    bullets: [
      "Conversion Rules: 0 °C = 273 K | 25 °C = 298 K | 100 °C = 373 K | -273 °C = 0 K.",
      "STP Reference Conditions: Standard Temperature = 273 K (0 °C); Standard Pressure = 1 atm (760 mmHg).",
      "Molar Volume at STP: 1 mole of any ideal gas occupies 22.4 Liters at STP!"
    ]
  }
];

// ============================================================================
// DISCOVERY QUESTION (PREDICT BEFORE LEARNING)
// ============================================================================

const DISCOVERY_QUESTION = {
  question: "In an ICSE laboratory, a student reacts Granulated Zinc with Dilute Sulphuric Acid to prepare Hydrogen gas. Why is Granulated Zinc preferred over Pure Sodium or Copper metal?",
  options: [
    "Sodium reacts too explosively, while Copper does not react at all with dilute acids.",
    "Copper reacts explosively, while Sodium is too slow to generate bubbles.",
    "Granulated Zinc turns hydrogen gas into oxygen, making it safer to collect.",
    "Sodium and Copper both produce carbon dioxide gas instead of hydrogen."
  ],
  correctIndex: 0,
  explanation: "Sodium & Potassium are too reactive and explode with dilute acids. Copper lies below Hydrogen in the reactivity series and cannot displace hydrogen from dilute acids. Zinc provides a steady, controllable stream of hydrogen!"
};

// ============================================================================
// MASTERY CHALLENGES (10 PROGRESSIVE QUESTIONS COVERING ALL NODES)
// ============================================================================

interface ChallengeQuestion {
  id: number;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconception: string;
  hint: string;
}

const PROGRESSIVE_CHALLENGES: ChallengeQuestion[] = [
  {
    id: 1,
    nodeId: "c9_chem_041",
    question: "How is pure, dry Hydrogen gas collected in the laboratory, and which drying agent is specifically used?",
    options: [
      "Collected by downward displacement of water; dried using Calcium Oxide (CaO).",
      "Collected by upward displacement of water; dried using Concentrated Sulphuric Acid.",
      "Collected by downward displacement of air; dried using Lead Nitrate solution.",
      "Collected over mercury; dried using Silver Nitrate solution."
    ],
    correctIndex: 0,
    explanation: "Hydrogen is collected by downward displacement of water because it is lighter than air and nearly insoluble in water. Calcium oxide (CaO) is a suitable alkaline drying agent that does not react with hydrogen.",
    misconception: "Students often think hydrogen is soluble in water or collected by air displacement. It is collected over water due to very low solubility.",
    hint: "Recall the trough setup: water is pushed down as gas enters the inverted jar."
  },
  {
    id: 2,
    nodeId: "c9_chem_042",
    question: "In Step 2 of the industrial Bosch process (water-gas shift reaction), what catalyst and operating conditions are used to convert Water Gas into extra Hydrogen?",
    options: [
      "Iron(III) oxide catalyst (Fe₂O₃) with Cr₂O₃ promoter at 450°C - 500°C and 25 atm pressure.",
      "Platinum catalyst at room temperature and 1 atm pressure.",
      "Nickel catalyst at 1000°C with no extra steam.",
      "Copper catalyst at 0°C under vacuum."
    ],
    correctIndex: 0,
    explanation: "The reaction CO + H₂O → CO₂ + H₂ uses Iron(III) oxide (Fe₂O₃) with Chromium promoter (Cr₂O₃) at 450°C - 500°C and 25 atm to maximize hydrogen yield.",
    misconception: "Leaving out catalyst or temperature conditions in ICSE board exam answers leads to mark loss.",
    hint: "Think of Iron Chromite catalyst at around 450°C under 25 atm pressure."
  },
  {
    id: 3,
    nodeId: "c9_chem_043",
    question: "In the reaction CuO + H₂ → Cu + H₂O, identify the substance that is REDUCED and explain why using the classical concept.",
    options: [
      "CuO is reduced because it loses Oxygen to form Cu.",
      "H₂ is reduced because it gains Oxygen to form H₂O.",
      "Cu is reduced because it gains Hydrogen.",
      "H₂O is reduced because it loses electrons."
    ],
    correctIndex: 0,
    explanation: "In the classical view, reduction is the loss of Oxygen. Copper(II) oxide (CuO) loses oxygen to become metallic copper (Cu), so CuO is reduced.",
    misconception: "Confusing oxidised species with reduced species. The reactant that loses oxygen is reduced.",
    hint: "Which starting material loses its oxygen atom during the reaction?"
  },
  {
    id: 4,
    nodeId: "c9_chem_044",
    question: "In the electronic concept of redox (OIL RIG), what happens during the half-reaction Zn → Zn²⁺ + 2e⁻?",
    options: [
      "Zinc loses 2 electrons and undergoes Oxidation.",
      "Zinc gains 2 electrons and undergoes Reduction.",
      "Zinc loses 2 protons and undergoes Neutralisation.",
      "Zinc gains 2 neutrons and undergoes Decomposition."
    ],
    correctIndex: 0,
    explanation: "OIL RIG: Oxidation Is Loss of electrons. Zinc atom donates 2 electrons to form Zn²⁺ cation, so Zinc undergoes oxidation.",
    misconception: "Thinking electron loss is reduction because charge increases. Remember: Loss = Oxidation!",
    hint: "Use the mnemonic OIL RIG (Oxidation Is Loss, Reduction Is Gain)."
  },
  {
    id: 5,
    nodeId: "c9_chem_045",
    question: "In the reaction Zn + CuSO₄ → ZnSO₄ + Cu, which substance acts as the REDUCING AGENT and why?",
    options: [
      "Zn metal, because it donates electrons and is itself oxidised to Zn²⁺.",
      "CuSO₄, because it donates electrons to zinc.",
      "Cu metal, because it accepts electrons from sulphate.",
      "ZnSO₄, because it accepts oxygen from water."
    ],
    correctIndex: 0,
    explanation: "A reducing agent is an electron donor that causes reduction of the partner while itself getting oxidised. Zinc donates electrons, so Zn is the reducing agent.",
    misconception: "Naming the oxidising agent as the substance oxidised. The species that gets oxidised IS the reducing agent!",
    hint: "Who donates the electrons in this displacement reaction?"
  },
  {
    id: 6,
    nodeId: "c9_chem_046",
    question: "According to the kinetic theory of gases, how do gas molecules exert pressure on the walls of a sealed container?",
    options: [
      "By continuously colliding with the container walls and exerting force per unit area.",
      "By reacting chemically with the metal container.",
      "By pulling the walls inward due to gravitational weight.",
      "By staying completely stationary and pressing down under gravity."
    ],
    correctIndex: 0,
    explanation: "Gas pressure is the cumulative effect of billions of freely moving gas molecules colliding repeatedly with the container walls, creating outward force per unit area.",
    misconception: "Believing gas pressure is simply caused by gravity or gas weight. Pressure acts in all directions due to collisions.",
    hint: "Picture tiny billiard balls bouncing against container boundaries."
  },
  {
    id: 7,
    nodeId: "c9_chem_047",
    question: "A fixed mass of gas occupies 500 mL at a pressure of 1.0 atm at constant temperature. If the pressure is increased to 2.5 atm, what is the new volume according to Boyle's Law?",
    options: [
      "200 mL",
      "1250 mL",
      "250 mL",
      "1000 mL"
    ],
    correctIndex: 0,
    explanation: "Using Boyle's Law P₁V₁ = P₂V₂: (1.0 atm)(500 mL) = (2.5 atm)(V₂). Solving gives V₂ = 500 / 2.5 = 200 mL.",
    misconception: "Directly multiplying instead of using inverse proportion. Higher pressure MUST result in smaller volume!",
    hint: "Formula: V₂ = (P₁ × V₁) / P₂"
  },
  {
    id: 8,
    nodeId: "c9_chem_048",
    question: "A gas occupies 300 mL at 27 °C. At what temperature (in °C) will its volume become 600 mL at constant pressure?",
    options: [
      "327 °C",
      "54 °C",
      "600 °C",
      "150 °C"
    ],
    correctIndex: 0,
    explanation: "Convert T₁ to Kelvin: 27 °C + 273 = 300 K. Using Charles's Law V₁/T₁ = V₂/T₂: 300 / 300 = 600 / T₂ → T₂ = 600 K. Convert back to °C: 600 - 273 = 327 °C.",
    misconception: "Doubling 27 °C directly to get 54 °C! Charles's Law MUST use absolute Kelvin scale first.",
    hint: "Convert 27 °C to Kelvin first, double the Kelvin T, then subtract 273."
  },
  {
    id: 9,
    nodeId: "c9_chem_049",
    question: "Using the combined gas equation P₁V₁/T₁ = P₂V₂/T₂, calculate the final volume of a gas if 2.0 L at 300 K and 1.5 atm is heated to 450 K and pressure reduced to 1.0 atm.",
    options: [
      "4.5 L",
      "3.0 L",
      "1.5 L",
      "6.0 L"
    ],
    correctIndex: 0,
    explanation: "P₁V₁/T₁ = P₂V₂/T₂ → (1.5 × 2.0) / 300 = (1.0 × V₂) / 450 → 3.0 / 300 = V₂ / 450 → 0.01 = V₂ / 450 → V₂ = 4.5 L.",
    misconception: "Forgetting to rearrange terms carefully or using Celsius instead of Kelvin.",
    hint: "Rearrange formula: V₂ = (P₁ × V₁ × T₂) / (P₂ × T₁)"
  },
  {
    id: 10,
    nodeId: "c9_chem_050",
    question: "Convert a temperature of 25 °C into Kelvin, and state the standard temperature value at STP.",
    options: [
      "298 K; Standard Temperature at STP is 273 K (0 °C).",
      "248 K; Standard Temperature at STP is 300 K (27 °C).",
      "298 K; Standard Temperature at STP is 373 K (100 °C).",
      "273 K; Standard Temperature at STP is 0 K (-273 °C)."
    ],
    correctIndex: 0,
    explanation: "K = °C + 273 = 25 + 273 = 298 K. Standard Temperature at STP is defined as 273 K (0 °C) and Standard Pressure is 1 atm (760 mmHg).",
    misconception: "Writing degree symbol for Kelvin (°K). Kelvin scale does NOT use the degree sign!",
    hint: "Formula: K = °C + 273. STP Temperature is freezing point of water."
  }
];

// ============================================================================
// MAIN COMPONENT EXPORT
// ============================================================================

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Concentrated Nitric Acid Can Prepare Hydrogen Gas in Labs",
    description: "Students believe that any acid, including concentrated nitric acid, can react with zinc to produce hydrogen gas in the laboratory. They assume all acids react similarly with active metals to liberate hydrogen gas.",
    correction: "Concentrated nitric acid is a powerful oxidizing agent that rapidly oxidizes hydrogen gas into water as soon as it forms. Consequently, the reaction yields oxides of nitrogen rather than hydrogen gas. Therefore, dilute hydrochloric acid or dilute sulfuric acid must be used for laboratory hydrogen preparation.",
  },
  {
    id: "misc_2",
    title: "Hydrogen Gas Is Collected by Downward Displacement of Air",
    description: "Students often assume that hydrogen gas is collected by downward displacement of air simply because it is lighter than air.",
    correction: "Hydrogen forms an explosive mixture when mixed with atmospheric oxygen, making collection by air displacement extremely hazardous. Additionally, hydrogen diffuses rapidly into air, preventing efficient collection. Instead, it is collected by the downward displacement of water because hydrogen is virtually insoluble in water.",
  },
  {
    id: "misc_3",
    title: "Pure Zinc Is Preferred Over Granulated Zinc for Reaction",
    description: "Students think that chemically pure zinc metal is superior to granulated zinc for preparing hydrogen gas efficiently.",
    correction: "Pure zinc reacts extremely slowly with dilute acids, resulting in a negligible rate of gas evolution. Granulated zinc contains trace copper impurities that form local electrochemical cells, significantly accelerating the reaction rate. Furthermore, the granulated form provides a larger surface area for faster hydrogen production.",
  },
  {
    id: "misc_4",
    title: "Hydrogen Gas Acts as a Supporter of Combustion",
    description: "Students often confuse being combustible with supporting combustion, assuming hydrogen helps other substances burn.",
    correction: "Hydrogen gas is combustible, meaning it burns in oxygen with a characteristic pop sound and pale blue flame. However, it does not support combustion, so a burning splinter inserted inside a gas jar filled with pure hydrogen is immediately extinguished. Only the hydrogen gas itself burns at the mouth of the jar where oxygen is present.",
  },
  {
    id: "misc_5",
    title: "Initial Gas Bubbles Collected Are Pure Hydrogen Gas",
    description: "Students assume that the gas coming out of the delivery tube immediately upon reaction start is pure hydrogen ready for collection.",
    correction: "The gas escaping initially consists mainly of air originally present inside the flask, forming a dangerous explosive air-hydrogen mixture. Bringing a flame near the tube during this phase can cause the entire apparatus to explode. The first few bubbles must be allowed to escape until pure hydrogen completely purges the air from the apparatus.",
  },
];

export default function C9_ChemistryLaboratorypreparationofhydrogenSim() {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<'discovery' | 'sims' | 'teaching' | 'challenges' | 'summary'>('discovery');
  const [activeSimTab, setActiveSimTab] = useState<'lab' | 'bosch' | 'redox' | 'gases'>('lab');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Discovery state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Challenge state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // FX state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [hintText, setHintText] = useState("");
  const [showHintBubble, setShowHintBubble] = useState(false);

  // BKT & Mastery States per Node
  const [bktStates, setBktStates] = useState<Record<NodeId, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Auto Hint Timer (10s inactivity)
  useEffect(() => {
    if (currentTab === 'challenges' && !isAnswerSubmitted) {
      const timer = setTimeout(() => {
        const challenge = PROGRESSIVE_CHALLENGES[currentChallengeIndex];
        setHintText(challenge.hint);
        setShowHintBubble(true);
        audioManager.play('hint');
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setShowHintBubble(false);
    }
  }, [currentTab, currentChallengeIndex, isAnswerSubmitted]);

  // Handle Discovery Submit
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak("Excellent prediction! Zinc provides a controlled, safe stream of hydrogen.");
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak("Good try! Sodium is too violent while copper is completely unreactive.");
    }
  };

  // Handle Challenge Answer Selection
  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const challenge = PROGRESSIVE_CHALLENGES[currentChallengeIndex];
    const isCorrect = selectedAnswer === challenge.correctIndex;

    // BKT & Score Update
    const currentBKT = bktStates[challenge.nodeId];
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
        const _reviewItem = createReviewItem('C9_ChemistryLaborato', 'challenge');
        sm2Update(_reviewItem, 4, 0);
    setBktStates(prev => ({ ...prev, [challenge.nodeId]: updatedBKT }));

    // Record SRS & Local Storage
    recordGameScore(challenge.nodeId, isCorrect ? 100 : 0);

    if (isCorrect) {
      setScore(prev => prev + 10);
      audioManager.play('drop-correct');
      speechManager.speak("Correct! " + challenge.explanation);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Incorrect. " + challenge.misconception);
    }
  };

  // Handle Next Challenge / Finish
  const handleNextChallenge = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowHintBubble(false);

    if (currentChallengeIndex < PROGRESSIVE_CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      audioManager.play('swoop');
    } else {
      // Completed all challenges
      setCurrentTab('summary');
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      speechManager.speak("Congratulations! You have mastered ICSE Class 9 Hydrogen Preparation and Gas Laws!");
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const currentChallenge = PROGRESSIVE_CHALLENGES[currentChallengeIndex];
  const currentSlide = TEACHING_SLIDES[currentSlideIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 relative overflow-x-hidden">
      {/* Feedback Overlay Engine Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Chemistry Laboratory Master Class Completed!" />
      <SparkleBurst show={showSparkle} x={600} y={300} />
      <HintBubble show={showHintBubble} text={hintText} />

      {/* Main Header & Subject Config Info */}
      <header className="max-w-6xl mx-auto mb-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs text-emerald-400 font-bold uppercase tracking-wider">
              Class 9 ICSE Chemistry
            </span>
            <span className="text-xs text-slate-400 font-mono">10 Curriculum Nodes Covered</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400">
            Laboratory Preparation of Hydrogen & Gas Laws
          </h1>
        </div>

        {/* Global Progress & Score Pill */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block font-semibold">LAB SCORE</span>
            <span className="text-lg font-bold text-amber-400 font-mono">{score} pts</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block font-semibold">MASTERY</span>
            <span className="text-sm font-bold text-emerald-400">
              {Math.round((Object.values(bktStates).reduce((a, b) => a + b.pKnown, 0) / ALL_NODE_IDS.length) * 100)}%
            </span>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="max-w-6xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'discovery', label: '1. Discovery Phase 💡' },
          { id: 'sims', label: '2. Virtual Lab Simulations 🧪' },
          { id: 'teaching', label: '3. Teaching Modules 📚' },
          { id: 'challenges', label: '4. Progressive Mastery 🎯' },
          { id: 'summary', label: '5. Mastery Certificate 🏆' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setCurrentTab(tab.id as any); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              currentTab === tab.id
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* VIEW 1: DISCOVERY PHASE */}
      {currentTab === 'discovery' && (
        <main className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="mb-6">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-400 font-bold uppercase">
              Predictive Discovery Activity
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              Predict Before Learning: Choice of Metals for Hydrogen Prep
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Think like a chemist in an ICSE practical laboratory!
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 mb-6">
            <p className="text-base text-slate-200 font-medium leading-relaxed mb-6">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDiscoverySelected(idx); audioManager.play('tap'); }}
                  disabled={discoverySubmitted}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                    discoverySelected === idx
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                  }`}
                >
                  <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>
          </div>

          {!discoverySubmitted ? (
            <button
              onClick={handleDiscoverySubmit}
              disabled={discoverySelected === null}
              className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${
                discoverySelected !== null
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit Prediction & Unlock Virtual Lab
            </button>
          ) : (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-xl space-y-3">
              <div className="text-emerald-300 font-bold text-sm">
                {discoverySelected === DISCOVERY_QUESTION.correctIndex ? '🎉 Spot-on prediction!' : '💡 Key Insight:'}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {DISCOVERY_QUESTION.explanation}
              </p>
              <button
                onClick={() => { setCurrentTab('sims'); audioManager.play('whoosh'); }}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-sm shadow-md mt-2"
              >
                Proceed to Virtual Lab Simulations →
              </button>
            </div>
          )}
        </main>
      )}

      {/* VIEW 2: INTERACTIVE SIMULATIONS SUITE */}
      {currentTab === 'sims' && (
        <main className="max-w-6xl mx-auto">
          {/* Sub-tab Switcher */}
          <div className="flex gap-2 mb-4 bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-fit">
            {[
              { id: 'lab', label: '1. Lab Prep Apparatus (Zn + H₂SO₄)' },
              { id: 'bosch', label: '2. Bosch Process (Industrial)' },
              { id: 'redox', label: '3. Redox & Electrons (OIL RIG)' },
              { id: 'gases', label: '4. Gas Laws & Kinetic Piston' },
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => { setActiveSimTab(sub.id as any); audioManager.play('tap'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSimTab === sub.id
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Active Sim Component */}
          {activeSimTab === 'lab' && <HydrogenLabPrepSim />}
          {activeSimTab === 'bosch' && <BoschProcessSim />}
          {activeSimTab === 'redox' && <RedoxVisualizer />}
          {activeSimTab === 'gases' && <GasLawPistonSim />}
        </main>
      )}

      {/* VIEW 3: TEACHING SLIDES */}
      {currentTab === 'teaching' && (
        <main className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs font-mono text-amber-400">
                MODULE {currentSlideIndex + 1} OF {TEACHING_SLIDES.length} | Node: {currentSlide.nodeId}
              </span>
              <h2 className="text-2xl font-bold text-white">{currentSlide.title}</h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentSlideIndex(prev => Math.max(0, prev - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlideIndex === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs rounded-lg font-bold"
              >
                ← Prev
              </button>
              <button
                onClick={() => {
                  setCurrentSlideIndex(prev => Math.min(TEACHING_SLIDES.length - 1, prev + 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40 text-xs rounded-lg font-bold shadow-md"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs text-emerald-400 font-bold w-fit">
              {currentSlide.conceptName}
            </div>

            {currentSlide.equation && (
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-amber-300 text-center font-bold text-base shadow-inner">
                {currentSlide.equation}
              </div>
            )}

            <p className="text-slate-200 text-sm leading-relaxed">{currentSlide.content}</p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">KEY BOARD EXAM POINTS</span>
              {currentSlide.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* VIEW 4: PROGRESSIVE MASTERY CHALLENGES */}
      {currentTab === 'challenges' && (
        <main className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          {/* Progress Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400">
                CHALLENGE {currentChallengeIndex + 1} OF {PROGRESSIVE_CHALLENGES.length}
              </span>
              <h2 className="text-xl font-bold text-white">Adaptive Mastery Question</h2>
              <span className="text-xs text-slate-400">
                Testing Node: <span className="font-mono text-amber-300">{currentChallenge.nodeId}</span>
              </span>
            </div>

            <div className="w-32 bg-slate-950 h-3 rounded-full border border-slate-800 overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-300"
                style={{ width: `${((currentChallengeIndex + 1) / PROGRESSIVE_CHALLENGES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 mb-6">
            <p className="text-base text-slate-200 font-semibold mb-6 leading-relaxed">
              {currentChallenge.question}
            </p>

            <div className="space-y-3">
              {currentChallenge.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSelectedAnswer(idx); audioManager.play('tap'); }}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all ${
                    selectedAnswer === idx
                      ? isAnswerSubmitted
                        ? idx === currentChallenge.correctIndex
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                          : 'bg-rose-950 border-rose-400 text-rose-200'
                        : 'bg-sky-950 border-sky-400 text-sky-200 shadow-md'
                      : isAnswerSubmitted && idx === currentChallenge.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback & Actions */}
          {!isAnswerSubmitted ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${
                selectedAnswer !== null
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                selectedAnswer === currentChallenge.correctIndex
                  ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/30 text-rose-200'
              }`}>
                <div className="font-bold mb-1">
                  {selectedAnswer === currentChallenge.correctIndex ? '🎉 Correct Explanation:' : '💡 Diagnostic Insight:'}
                </div>
                {selectedAnswer === currentChallenge.correctIndex
                  ? currentChallenge.explanation
                  : currentChallenge.misconception}
              </div>

              <button
                onClick={handleNextChallenge}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-base shadow-lg shadow-emerald-500/20"
              >
                {currentChallengeIndex < PROGRESSIVE_CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Mastery Certificate 🏆'}
              </button>
            </div>
          )}
        </main>
      )}

      {/* VIEW 5: SUMMARY & MASTERY CERTIFICATE */}
      {currentTab === 'summary' && (
        <main className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-amber-500/20 border-2 border-amber-400 rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg shadow-amber-500/20">
            🏆
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-white">Curriculum Mastery Achieved!</h2>
            <p className="text-sm text-slate-300 mt-1">
              You have completed all 10 ICSE Class 9 Chemistry nodes on Hydrogen Preparation & Gas Laws.
            </p>
          </div>

          {/* Final Score Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block font-semibold">FINAL SCORE</span>
              <span className="text-2xl font-bold text-amber-400 font-mono">{score} pts</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-semibold">NODES MASTERED</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">10 / 10</span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="text-xs text-slate-400 block font-semibold">AVERAGE BKT</span>
              <span className="text-2xl font-bold text-sky-400 font-mono">
                {Math.round((Object.values(bktStates).reduce((a, b) => a + b.pKnown, 0) / ALL_NODE_IDS.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Node Mastery Table */}
          <div className="text-left bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">INDIVIDUAL NODE BREAKDOWN</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {ALL_NODE_IDS.map(id => {
                const info = NODE_DETAILS[id];
                const pKnown = bktStates[id]?.pKnown || 0;
                return (
                  <div key={id} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-mono text-amber-300 font-bold block">{id}</span>
                      <span className="text-slate-300 text-[11px] truncate block">{info.title}</span>
                    </div>
                    <span className="font-bold text-emerald-400">{Math.round(pKnown * 100)}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentTab('discovery');
              setCurrentChallengeIndex(0);
              setScore(0);
              audioManager.play('tap');
            }}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20"
          >
            Restart Full Simulation Experience 🔄
          </button>
        </main>
      )}
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