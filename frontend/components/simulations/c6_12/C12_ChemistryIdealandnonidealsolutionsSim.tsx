'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ============================================================================
// NODE ID CONSTANTS (REQUIRED FOR MASTERY TRACKING)
// ============================================================================
const NODE_C12_CHEM_011 = 'c12_chem_011'; // Ideal and non-ideal solutions
const NODE_C12_CHEM_012 = 'c12_chem_012'; // Colligative properties
const NODE_C12_CHEM_013 = 'c12_chem_013'; // Van't Hoff factor
const NODE_C12_CHEM_014 = 'c12_chem_014'; // Electrochemistry - conductance
const NODE_C12_CHEM_015 = 'c12_chem_015'; // Electrolytic and metallic conduction
const NODE_C12_CHEM_016 = 'c12_chem_016'; // Molar conductivity and Kohlrausch's law
const NODE_C12_CHEM_017 = 'c12_chem_017'; // Electrochemical cells
const NODE_C12_CHEM_018 = 'c12_chem_018'; // Electrode potential and standard electrode potential
const NODE_C12_CHEM_019 = 'c12_chem_019'; // Nernst equation
const NODE_C12_CHEM_020 = 'c12_chem_020'; // Gibbs energy and cell

const ALL_NODE_IDS = [
  NODE_C12_CHEM_011,
  NODE_C12_CHEM_012,
  NODE_C12_CHEM_013,
  NODE_C12_CHEM_014,
  NODE_C12_CHEM_015,
  NODE_C12_CHEM_016,
  NODE_C12_CHEM_017,
  NODE_C12_CHEM_018,
  NODE_C12_CHEM_019,
  NODE_C12_CHEM_020,
] as const;

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
type MainTab = 'discovery' | 'slides' | 'lab' | 'challenges' | 'summary';
type LabMode = 'solutions' | 'colligative' | 'conductance' | 'galvanic';

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconception: string;
  hint: string;
}

interface TeachingSlide {
  id: number;
  nodeIds: string[];
  title: string;
  subtitle: string;
  text: string;
  keyTakeaway: string;
  visualType: LabMode;
}

// ============================================================================
// SIMULATION DATA & ENRICHMENT CONTENT
// ============================================================================
const SCENARIO = {
  title: "Physical Chemistry Master Lab: Solutions & Electrochemistry",
  subtitle: "ISC Class 12 Advanced Interactive Simulator",
  description: "Explore thermodynamic behavior of liquid solutions, colligative phenomena, ionic conductance, Kohlrausch's law, and electrochemical cell thermodynamics."
};

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 1,
    nodeIds: [NODE_C12_CHEM_011],
    title: "Ideal & Non-Ideal Solutions",
    subtitle: "Raoult's Law & Azeotropes",
    text: "An ideal solution obeys Raoult's law (P_i = x_i P_i^0) over all concentrations, with ΔH_mix = 0 and ΔV_mix = 0. In non-ideal solutions, A-B interactions differ from A-A / B-B. Positive deviation (e.g. Ethanol + Water) creates a minimum-boiling azeotrope; negative deviation (e.g. Chloroform + Acetone) forms a maximum-boiling azeotrope.",
    keyTakeaway: "Positive deviation → P_total is higher, boiling point drops. Negative deviation → P_total is lower, boiling point rises.",
    visualType: 'solutions'
  },
  {
    id: 2,
    nodeIds: [NODE_C12_CHEM_012, NODE_C12_CHEM_013],
    title: "Colligative Properties & Van 't Hoff Factor",
    subtitle: "Particle Count Dependence & Abnormal Molar Mass",
    text: "Colligative properties depend strictly on the number of solute particles, not their identity: Vapour Pressure Lowering, Boiling Point Elevation (ΔT_b = i K_b m), Freezing Point Depression (ΔT_f = i K_f m), and Osmotic Pressure (π = i CRT). The Van 't Hoff factor i accounts for dissociation (i > 1) or association (i < 1).",
    keyTakeaway: "For dissociation: i = 1 + (n-1)α. For dimerization: i = 1 - α/2.",
    visualType: 'colligative'
  },
  {
    id: 3,
    nodeIds: [NODE_C12_CHEM_014, NODE_C12_CHEM_015, NODE_C12_CHEM_016],
    title: "Conductance & Kohlrausch's Law",
    subtitle: "Ionic Transport & Limiting Molar Conductivity",
    text: "Conductance G = 1/R; Specific Conductance κ = G(l/A). Molar conductivity Λ_m = (1000 κ)/M. While κ decreases with dilution (fewer ions/cm³), Λ_m increases. Strong electrolytes follow Debye-Hückel-Onsager extrapolation, while weak electrolytes steepen. Kohlrausch's Law states Λ°_m = ν_+ λ°_+ + ν_- λ°_-.",
    keyTakeaway: "Kohlrausch's law allows calculating Λ°_m of weak electrolytes by combining strong electrolyte data.",
    visualType: 'conductance'
  },
  {
    id: 4,
    nodeIds: [NODE_C12_CHEM_017, NODE_C12_CHEM_018],
    title: "Electrochemical Cells & SHE",
    subtitle: "Spontaneous Redox & Reference Potentials",
    text: "Galvanic cells convert chemical energy to electrical work (Anode: Oxidation (-), Cathode: Reduction (+)). The Salt Bridge maintains charge neutrality. Standard Electrode Potentials (E°) are measured relative to the Standard Hydrogen Electrode (SHE, E° = 0.00 V). E°_cell = E°_cathode - E°_anode.",
    keyTakeaway: "More negative E° → Stronger reducing agent (Anode). More positive E° → Stronger oxidizing agent (Cathode).",
    visualType: 'galvanic'
  },
  {
    id: 5,
    nodeIds: [NODE_C12_CHEM_019, NODE_C12_CHEM_020],
    title: "Nernst Equation & Cell Thermodynamics",
    subtitle: "Non-Standard EMF & Gibbs Free Energy",
    text: "Cell potential under non-standard conditions follows Nernst: E_cell = E°_cell - (0.0591/n) log Q at 298 K. The electrical work done by the cell equals the decrease in Gibbs free energy: ΔG = -nF E_cell. Under standard state, ΔG° = -nF E°_cell = -RT ln K.",
    keyTakeaway: "Spontaneous reaction → E_cell > 0 and ΔG < 0. At equilibrium, E_cell = 0 and Q = K.",
    visualType: 'galvanic'
  }
];

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    nodeId: NODE_C12_CHEM_011,
    title: "Identify Deviation in Acetone-Chloroform Solution",
    question: "When acetone and chloroform are mixed, hydrogen bonding forms between them. What deviation from Raoult's law occurs and what type of azeotrope is formed?",
    options: [
      "Positive deviation; Minimum-boiling azeotrope",
      "Negative deviation; Maximum-boiling azeotrope",
      "Ideal solution; No azeotrope",
      "Positive deviation; Maximum-boiling azeotrope"
    ],
    correctIndex: 1,
    explanation: "Intermolecular H-bonding between acetone and chloroform makes A-B attractions stronger than A-A and B-B. Vapour pressure dips below ideal (Negative Deviation), causing the boiling point to reach a maximum (Maximum-boiling azeotrope).",
    misconception: "Confusing negative deviation with minimum boiling. Stronger intermolecular forces decrease vapor pressure, requiring higher temperature to boil!",
    hint: "Stronger A-B attraction → molecules escape less easily → lower total vapour pressure → higher boiling point."
  },
  {
    id: 'c2',
    nodeId: NODE_C12_CHEM_012,
    title: "Freezing Point Depression Calculation",
    question: "2.0 g of a non-electrolyte solute dissolved in 50 g of benzene depresses the freezing point by 0.93 K. (K_f of benzene = 5.12 K kg mol⁻¹). What is the molar mass of the solute?",
    options: [
      "110 g mol⁻¹",
      "220 g mol⁻¹",
      "440 g mol⁻¹",
      "55 g mol⁻¹"
    ],
    correctIndex: 1,
    explanation: "Molality m = ΔT_f / K_f = 0.93 / 5.12 = 0.1816 mol/kg. Moles of solute = 0.1816 × 0.050 kg = 0.00908 mol. Molar mass M = 2.0 g / 0.00908 mol = 220 g mol⁻¹.",
    misconception: "Forgetting to convert 50 g of solvent into 0.050 kg!",
    hint: "Use ΔT_f = K_f × (w_solute × 1000) / (M_solute × w_solvent)."
  },
  {
    id: 'c3',
    nodeId: NODE_C12_CHEM_013,
    title: "Van 't Hoff Factor & Dissociation",
    question: "A 0.1 m solution of Ca(NO₃)₂ has an observed freezing point depression of 0.465 K. If K_f for water is 1.86 K kg mol⁻¹, what is the Van 't Hoff factor (i) and degree of dissociation (α)?",
    options: [
      "i = 2.50, α = 0.75",
      "i = 2.00, α = 0.50",
      "i = 3.00, α = 1.00",
      "i = 1.50, α = 0.25"
    ],
    correctIndex: 0,
    explanation: "Calculated ΔT_f (ideal) = 1.86 × 0.1 = 0.186 K. Observed i = ΔT_f(obs) / ΔT_f(calc) = 0.465 / 0.186 = 2.50. For Ca(NO₃)₂ → Ca²⁺ + 2NO₃⁻ (n = 3), i = 1 + (3-1)α → 2.50 = 1 + 2α → α = 0.75 (75%).",
    misconception: "Assuming Ca(NO₃)₂ always fully dissociates to i = 3 without checking observed colligative data.",
    hint: "i = Observed ΔT_f / Theoretical ΔT_f, then use i = 1 + (n-1)α."
  },
  {
    id: 'c4',
    nodeId: NODE_C12_CHEM_014,
    title: "Specific Conductance & Temperature",
    question: "Why does specific conductance (κ) decrease upon dilution, while metallic conductance decreases with increasing temperature?",
    options: [
      "Dilution increases ion count per cm³; metallic lattice vibrations decrease with heat.",
      "Dilution decreases ion count per cm³; metallic lattice vibrations increase with heat, scattering electrons.",
      "Dilution reduces total solution volume; metals expand when heated.",
      "Both are governed strictly by osmotic pressure differences."
    ],
    correctIndex: 1,
    explanation: "Specific conductance κ is conductance per unit volume (1 cm³). Dilution spreads ions over a larger volume, lowering charge density per cm³. In metals, higher temperature increases lattice ion thermal vibrations, causing more electron collisions.",
    misconception: "Confusing specific conductance (κ) with molar conductivity (Λ_m). Λ_m increases on dilution, but κ decreases!",
    hint: "κ is conductance per 1 cm³. Does dilution put more or fewer ions into that single 1 cm³ box?"
  },
  {
    id: 'c5',
    nodeId: NODE_C12_CHEM_015,
    title: "Conduction Mechanism Comparison",
    question: "Which statement correctly distinguishes metallic conduction from electrolytic conduction?",
    options: [
      "Metallic conduction involves matter transfer; electrolytic does not.",
      "Electrolytic conduction involves electron flow without chemical change.",
      "Metallic conduction occurs via electron drift with no matter transfer; electrolytic involves ion migration accompanied by chemical reaction.",
      "Electrolytic conductance decreases as temperature rises."
    ],
    correctIndex: 2,
    explanation: "Metallic conduction relies on delocalized electron sea movement (no chemical change, no mass flow). Electrolytic conduction involves movement of cations/anions to electrodes where oxidation/reduction occurs.",
    misconception: "Thinking electrolytic conductance decreases with heat. Heat actually reduces solvent viscosity, increasing ion speed!",
    hint: "Consider what happens to copper wire vs salt solution when electricity passes through."
  },
  {
    id: 'c6',
    nodeId: NODE_C12_CHEM_016,
    title: "Kohlrausch's Law Application",
    question: "Given limiting molar conductivities Λ°_m(HCl) = 426 S cm² mol⁻¹, Λ°_m(NaCl) = 126 S cm² mol⁻¹, and Λ°_m(CH₃COONa) = 91 S cm² mol⁻¹. What is Λ°_m for acetic acid (CH₃COOH)?",
    options: [
      "643 S cm² mol⁻¹",
      "391 S cm² mol⁻¹",
      "209 S cm² mol⁻¹",
      "517 S cm² mol⁻¹"
    ],
    correctIndex: 1,
    explanation: "According to Kohlrausch's Law: Λ°_m(CH₃COOH) = Λ°_m(HCl) + Λ°_m(CH₃COONa) - Λ°_m(NaCl) = 426 + 91 - 126 = 391 S cm² mol⁻¹.",
    misconception: "Adding all three values directly without subtracting NaCl to cancel Na⁺ and Cl⁻ ions.",
    hint: "Target is CH₃COO⁻ + H⁺. Add the salts containing acetate and H⁺, then subtract the spectator salt (NaCl)."
  },
  {
    id: 'c7',
    nodeId: NODE_C12_CHEM_017,
    title: "Daniell Cell & Salt Bridge Function",
    question: "In a standard Daniell Cell: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s), which electrode is the anode, and what is the primary role of the salt bridge?",
    options: [
      "Copper is anode; Salt bridge carries electrons between beakers.",
      "Zinc is anode; Salt bridge maintains electrical neutrality by allowing ion migration.",
      "Zinc is cathode; Salt bridge increases cell resistance.",
      "Copper is cathode; Salt bridge prevents redox from happening."
    ],
    correctIndex: 1,
    explanation: "Zinc oxidizes (Zn → Zn²⁺ + 2e⁻) making it the Anode (negative pole). Electrons move through the wire. The salt bridge lets anions (Cl⁻/NO₃⁻) move to the anode beaker and cations (K⁺) to cathode beaker, preserving charge neutrality.",
    misconception: "Believing electrons travel through the salt bridge. Electrons ONLY travel through the metal wire!",
    hint: "Remember AN OX (Anode = Oxidation) and RED CAT (Reduction = Cathode)."
  },
  {
    id: 'c8',
    nodeId: NODE_C12_CHEM_018,
    title: "Standard EMF Prediction",
    question: "Given E°(Zn²⁺/Zn) = -0.76 V and E°(Ag⁺/Ag) = +0.80 V. What is the standard cell potential E°_cell for a spontaneous cell composed of these half-cells?",
    options: [
      "+0.04 V",
      "+1.56 V",
      "-1.56 V",
      "+2.36 V"
    ],
    correctIndex: 1,
    explanation: "The more positive potential undergoes reduction at cathode (Ag⁺/Ag). The more negative potential undergoes oxidation at anode (Zn²⁺/Zn). E°_cell = E°_cathode - E°_anode = (+0.80 V) - (-0.76 V) = +1.56 V.",
    misconception: "Subtracting in the wrong order or multiplying standard electrode potentials by stoichiometric coefficients when balancing electrons.",
    hint: "E°_cell = E°_reduction(cathode) - E°_reduction(anode). E° is an intensive property!"
  },
  {
    id: 'c9',
    nodeId: NODE_C12_CHEM_019,
    title: "Nernst Equation Calculation",
    question: "For the cell reaction Zn(s) + Cu²⁺(0.01 M) → Zn²⁺(0.1 M) + Cu(s) with E°_cell = 1.10 V at 298 K, what is the cell EMF (E_cell)?",
    options: [
      "1.070 V",
      "1.130 V",
      "1.100 V",
      "0.980 V"
    ],
    correctIndex: 0,
    explanation: "n = 2. Q = [Zn²⁺]/[Cu²⁺] = 0.1 / 0.01 = 10. E_cell = E° - (0.0591 / 2) log(10) = 1.10 - 0.02955 (1) = 1.07045 V ≈ 1.070 V.",
    misconception: "Using [Cu²⁺]/[Zn²⁺] for Q, or forgetting to divide 0.0591 by n=2.",
    hint: "Q = [Products] / [Reactants] = [Zn²⁺] / [Cu²⁺]. Then calculate E = E° - (0.0591/n) log Q."
  },
  {
    id: 'c10',
    nodeId: NODE_C12_CHEM_020,
    title: "Gibbs Energy & Equilibrium Constant",
    question: "A cell has E°_cell = +1.10 V and transfers 2 moles of electrons. Calculate standard Gibbs free energy change ΔG° in kJ mol⁻¹. (F = 96487 C mol⁻¹).",
    options: [
      "-212.3 kJ mol⁻¹",
      "+212.3 kJ mol⁻¹",
      "-106.1 kJ mol⁻¹",
      "-424.5 kJ mol⁻¹"
    ],
    correctIndex: 0,
    explanation: "ΔG° = -n F E°_cell = - (2 mol e⁻) × (96487 C/mol) × (1.10 J/C) = -212,271.4 J mol⁻¹ = -212.27 kJ mol⁻¹ ≈ -212.3 kJ mol⁻¹.",
    misconception: "Forgetting the negative sign in ΔG° = -nFE° or failing to convert J to kJ.",
    hint: "Remember ΔG° = -nFE°_cell. Volt = Joule / Coulomb."
  }
];

// ============================================================================
// CUSTOM INTERACTIVE VISUALIZERS
// ============================================================================

// 1. Solution Vapour Pressure Visualizer
const VapourPressureVisualizer: React.FC = () => {
  const [solutionType, setSolutionType] = useState<'ideal' | 'positive' | 'negative'>('ideal');
  const [moleFractionA, setMoleFractionA] = useState<number>(0.5);

  const pA0 = 100; // kPa
  const pB0 = 60;  // kPa

  const xA = moleFractionA;
  const xB = 1 - xA;

  let pA = xA * pA0;
  let pB = xB * pB0;
  let pTotal = pA + pB;

  if (solutionType === 'positive') {
    const dev = 4 * xA * xB * 35;
    pA += dev * xA;
    pB += dev * xB;
    pTotal = pA + pB;
  } else if (solutionType === 'negative') {
    const dev = 4 * xA * xB * 25;
    pA -= dev * xA;
    pB -= dev * xB;
    pTotal = pA + pB;
  }

  // Generate curves for SVG rendering
  const steps = 50;
  const idealPath: string[] = [];
  const totalPath: string[] = [];
  const pAPath: string[] = [];
  const pBPath: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const x = i / steps;
    const yA_ideal = x * pA0;
    const yB_ideal = (1 - x) * pB0;
    const yTot_ideal = yA_ideal + yB_ideal;

    let yA_real = yA_ideal;
    let yB_real = yB_ideal;
    if (solutionType === 'positive') {
      const dev = 4 * x * (1 - x) * 35;
      yA_real += dev * x;
      yB_real += dev * (1 - x);
    } else if (solutionType === 'negative') {
      const dev = 4 * x * (1 - x) * 25;
      yA_real -= dev * x;
      yB_real -= dev * (1 - x);
    }
    const yTot_real = yA_real + yB_real;

    // SVG coordinates mapping (Width 360, Height 200)
    const px = 40 + x * 280;
    const pyTot = 180 - (yTot_real / 140) * 150;
    const pyA = 180 - (yA_real / 140) * 150;
    const pyB = 180 - (yB_real / 140) * 150;

    const pyTot_ideal = 180 - (yTot_ideal / 140) * 150;

    if (i === 0) {
      idealPath.push(`M ${px} ${pyTot_ideal}`);
      totalPath.push(`M ${px} ${pyTot}`);
      pAPath.push(`M ${px} ${pyA}`);
      pBPath.push(`M ${px} ${pyB}`);
    } else {
      idealPath.push(`L ${px} ${pyTot_ideal}`);
      totalPath.push(`L ${px} ${pyTot}`);
      pAPath.push(`L ${px} ${pyA}`);
      pBPath.push(`L ${px} ${pyB}`);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h4 className="font-semibold text-cyan-400 flex items-center gap-2">
          <span>🧪</span> Solution Vapour Pressure & Azeotrope Simulator
        </h4>
        <div className="flex gap-2">
          {(['ideal', 'positive', 'negative'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                audioManager.play('tap');
                setSolutionType(type);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                solutionType === type
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2 bg-slate-950 rounded-lg p-2 border border-slate-800 relative">
          <svg viewBox="0 0 360 210" className="w-full h-48 overflow-visible">
            {/* Grid & Axes */}
            <line x1="40" y1="180" x2="320" y2="180" stroke="#475569" strokeWidth="2" />
            <line x1="40" y1="30" x2="40" y2="180" stroke="#475569" strokeWidth="2" />
            <line x1="320" y1="30" x2="320" y2="180" stroke="#475569" strokeWidth="2" />

            {/* Ideal Reference Dashed Lines */}
            <path d={idealPath.join(' ')} stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <line x1="40" y1="180" x2="320" y2={180 - (pA0 / 140) * 150} stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="40" y1={180 - (pB0 / 140) * 150} x2="320" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />

            {/* Real Curves */}
            <path d={pAPath.join(' ')} stroke="#38bdf8" strokeWidth="2" fill="none" />
            <path d={pBPath.join(' ')} stroke="#a855f7" strokeWidth="2" fill="none" />
            <path d={totalPath.join(' ')} stroke="#f43f5e" strokeWidth="3" fill="none" />

            {/* Current Mole Fraction Marker */}
            <line
              x1={40 + xA * 280}
              y1="30"
              x2={40 + xA * 280}
              y2="180"
              stroke="#e2e8f0"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle
              cx={40 + xA * 280}
              cy={180 - (pTotal / 140) * 150}
              r="5"
              fill="#f43f5e"
              className="animate-pulse"
            />

            {/* Labels */}
            <text x="35" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">P (kPa)</text>
            <text x="40" y="195" fill="#38bdf8" fontSize="10" textAnchor="middle">x_A = 0 (Pure B)</text>
            <text x="320" y="195" fill="#38bdf8" fontSize="10" textAnchor="middle">x_A = 1 (Pure A)</text>

            <text x="325" y={180 - (pA0 / 140) * 150} fill="#38bdf8" fontSize="9">P_A°</text>
            <text x="25" y={180 - (pB0 / 140) * 150} fill="#a855f7" fontSize="9">P_B°</text>
          </svg>
        </div>

        <div className="bg-slate-850 p-3 rounded-lg border border-slate-700/60 flex flex-col justify-between text-xs space-y-2">
          <div>
            <div className="font-semibold text-slate-200 mb-1">Intermolecular Interactions</div>
            {solutionType === 'ideal' && (
              <p className="text-slate-400">
                <span className="text-cyan-400 font-bold">A-B = A-A = B-B</span>. ΔH_mix = 0, ΔV_mix = 0. Example: Benzene + Toluene.
              </p>
            )}
            {solutionType === 'positive' && (
              <p className="text-amber-300">
                <span className="font-bold">A-B &lt; A-A, B-B</span>. ΔH_mix &gt; 0, ΔV_mix &gt; 0. Forms <b>Minimum-Boiling Azeotrope</b> (e.g. Ethanol + Water).
              </p>
            )}
            {solutionType === 'negative' && (
              <p className="text-emerald-300">
                <span className="font-bold">A-B &gt; A-A, B-B</span>. ΔH_mix &lt; 0, ΔV_mix &lt; 0. Forms <b>Maximum-Boiling Azeotrope</b> (e.g. Acetone + Chloroform).
              </p>
            )}
          </div>

          <div className="p-2 bg-slate-900 rounded border border-slate-700 space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>P_A: <strong className="text-sky-400">{pA.toFixed(1)} kPa</strong></span>
              <span>P_B: <strong className="text-purple-400">{pB.toFixed(1)} kPa</strong></span>
            </div>
            <div className="flex justify-between text-slate-100 font-bold pt-1 stroke-slate-700 border-t border-slate-800">
              <span>P_Total:</span>
              <span className="text-rose-400">{pTotal.toFixed(1)} kPa</span>
            </div>
          </div>

          <div>
            <label className="flex justify-between text-slate-300 mb-1">
              <span>Mole Fraction x_A:</span>
              <span className="text-cyan-400 font-bold">{xA.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={moleFractionA}
              onChange={(e) => setMoleFractionA(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Colligative Properties & Van 't Hoff Simulator
const ColligativeParticleSim: React.FC = () => {
  const [solute, setSolute] = useState<'glucose' | 'nacl' | 'cacl2' | 'acetic_acid'>('nacl');
  const [molality, setMolality] = useState<number>(0.2); // m (mol/kg)

  // Solvent constants (Water)
  const Kf = 1.86; // K kg/mol
  const Kb = 0.512; // K kg/mol
  const R = 0.0821; // L atm / mol K
  const T = 298.15; // K

  // Solute van 't hoff factor config
  const soluteConfig = {
    glucose: { name: 'Glucose (C₆H₁₂O₆)', i: 1.0, type: 'Non-electrolyte' },
    nacl: { name: 'Sodium Chloride (NaCl)', i: 1.9, type: 'Strong Electrolyte (n=2)' },
    cacl2: { name: 'Calcium Chloride (CaCl₂)', i: 2.7, type: 'Strong Electrolyte (n=3)' },
    acetic_acid: { name: 'Acetic Acid in Benzene', i: 0.55, type: 'Associating Dimer (i < 1)' }
  };

  const current = soluteConfig[solute];
  const deltaTf = current.i * Kf * molality;
  const deltaTb = current.i * Kb * molality;
  const osmoticPressure = current.i * molality * R * T; // Approx M ~ m for dilute

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h4 className="font-semibold text-emerald-400 flex items-center gap-2">
          <span>⚖️</span> Colligative Properties & Van 't Hoff Factor (i)
        </h4>
        <div className="flex flex-wrap gap-1">
          {(Object.keys(soluteConfig) as Array<keyof typeof soluteConfig>).map((key) => (
            <button
              key={key}
              onClick={() => {
                audioManager.play('pop');
                setSolute(key);
              }}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                solute === key
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {soluteConfig[key].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Particle Visualization Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center mb-2 z-10">
            <span className="text-xs font-semibold text-slate-400">Solution Micro-State</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              {current.type}
            </span>
          </div>

          <div className="h-36 bg-slate-900/80 rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-800">
            {/* Water solvent molecules */}
            {Array.from({ length: 24 }).map((_, idx) => (
              <motion.div
                key={`w-${idx}`}
                className="w-2 h-2 rounded-full bg-sky-500/40 absolute"
                animate={{
                  x: [(idx * 13) % 220 - 110, ((idx * 13) % 220 - 110) + (idx % 2 === 0 ? 8 : -8)],
                  y: [(idx * 7) % 100 - 50, ((idx * 7) % 100 - 50) + (idx % 3 === 0 ? 6 : -6)],
                }}
                transition={{ duration: 2 + (idx % 3), repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}

            {/* Dissolved Solute Particles */}
            {Array.from({ length: Math.round(molality * 35 * current.i) }).map((_, idx) => (
              <motion.div
                key={`p-${idx}`}
                className={`w-3.5 h-3.5 rounded-full absolute shadow-md flex items-center justify-center text-[8px] font-bold ${
                  current.i < 1
                    ? 'bg-purple-500 text-white border border-purple-300'
                    : solute === 'cacl2' && idx % 3 === 0
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-emerald-400 text-slate-950'
                }`}
                animate={{
                  x: [(idx * 23 + 15) % 240 - 120, ((idx * 23 + 15) % 240 - 120) + (idx % 2 === 0 ? 12 : -12)],
                  y: [(idx * 17 + 9) % 110 - 55, ((idx * 17 + 9) % 110 - 55) + (idx % 2 === 0 ? -10 : 10)],
                }}
                transition={{ duration: 1.5 + (idx % 2), repeat: Infinity, repeatType: 'reverse' }}
              >
                {current.i < 1 ? 'D' : solute === 'cacl2' ? (idx % 3 === 0 ? 'Ca' : 'Cl') : solute === 'nacl' ? (idx % 2 === 0 ? '+' : '-') : 'S'}
              </motion.div>
            ))}
          </div>

          <div className="mt-3 flex justify-between items-center text-xs text-slate-300 z-10">
            <span>Molality (m): <strong className="text-emerald-400">{molality.toFixed(2)} mol/kg</strong></span>
            <span>Van 't Hoff factor (i): <strong className="text-amber-400">{current.i}</strong></span>
          </div>

          <input
            type="range"
            min="0.05"
            max="0.5"
            step="0.05"
            value={molality}
            onChange={(e) => setMolality(parseFloat(e.target.value))}
            className="w-full mt-2 accent-emerald-400 cursor-pointer"
          />
        </div>

        {/* Outputs Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-850 p-3 rounded-lg border border-slate-700/70 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-medium">Freezing Pt Depression</span>
            <div className="text-lg font-bold text-cyan-400">ΔT_f = {deltaTf.toFixed(3)} K</div>
            <span className="text-[10px] text-slate-500">T_f = -{deltaTf.toFixed(3)} °C</span>
          </div>

          <div className="bg-slate-850 p-3 rounded-lg border border-slate-700/70 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-medium">Boiling Pt Elevation</span>
            <div className="text-lg font-bold text-amber-400">ΔT_b = {deltaTb.toFixed(3)} K</div>
            <span className="text-[10px] text-slate-500">T_b = {(100 + deltaTb).toFixed(3)} °C</span>
          </div>

          <div className="bg-slate-850 p-3 rounded-lg border border-slate-700/70 flex flex-col justify-between col-span-2">
            <span className="text-xs text-slate-400 font-medium">Osmotic Pressure (π = iCRT)</span>
            <div className="flex justify-between items-baseline">
              <div className="text-xl font-extrabold text-emerald-400">{osmoticPressure.toFixed(2)} atm</div>
              <span className="text-xs text-slate-400">{(osmoticPressure * 1.01325).toFixed(2)} bar</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Colligative effect scales strictly with effective particle concentration: <strong className="text-emerald-300">i × m</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Conductance & Kohlrausch's Law Simulator
const ConductivityLab: React.FC = () => {
  const [electrolyteType, setElectrolyteType] = useState<'strong' | 'weak'>('strong');
  const [concentration, setConcentration] = useState<number>(0.04); // mol/L

  // Synthetic calculations
  const sqrtC = Math.sqrt(concentration);
  
  // Strong: KCl (Lambda_m = Lambda_0 - A * sqrtC)
  const lambda0_strong = 149.9; // S cm2 mol-1
  const A_strong = 85.0;
  const lambdaM_strong = lambda0_strong - A_strong * sqrtC;
  const kappa_strong = (lambdaM_strong * concentration) / 1000;

  // Weak: CH3COOH (Ostwald dilution law: alpha^2 C / (1-alpha) = Ka)
  const Ka = 1.8e-5;
  const alpha = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * concentration)) / (2 * concentration);
  const lambda0_weak = 390.5; // S cm2 mol-1
  const lambdaM_weak = alpha * lambda0_weak;
  const kappa_weak = (lambdaM_weak * concentration) / 1000;

  const currentLambda = electrolyteType === 'strong' ? lambdaM_strong : lambdaM_weak;
  const currentKappa = electrolyteType === 'strong' ? kappa_strong : kappa_weak;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h4 className="font-semibold text-purple-400 flex items-center gap-2">
          <span>⚡</span> Molar Conductivity (Λ_m) & Kohlrausch's Law
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => {
              audioManager.play('tap');
              setElectrolyteType('strong');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase ${
              electrolyteType === 'strong' ? 'bg-purple-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            KCl (Strong)
          </button>
          <button
            onClick={() => {
              audioManager.play('tap');
              setElectrolyteType('weak');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase ${
              electrolyteType === 'weak' ? 'bg-purple-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            CH₃COOH (Weak)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Plot SVG */}
        <div className="md:col-span-2 bg-slate-950 rounded-xl p-3 border border-slate-800 relative">
          <svg viewBox="0 0 320 180" className="w-full h-44 overflow-visible">
            {/* Grid */}
            <line x1="40" y1="150" x2="300" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="150" stroke="#475569" strokeWidth="2" />

            {/* Labels */}
            <text x="35" y="15" fill="#94a3b8" fontSize="9" textAnchor="end">Λ_m (S cm² mol⁻¹)</text>
            <text x="170" y="168" fill="#94a3b8" fontSize="9" textAnchor="middle">√c (mol/L)½</text>

            {/* Curves */}
            {/* Strong Electrolyte line */}
            <line x1="40" y1="40" x2="280" y2="85" stroke="#a855f7" strokeWidth="2.5" />
            <line x1="40" y1="40" x2="15" y2="36" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Weak Electrolyte steep curve */}
            <path
              d="M 42 22 Q 48 120, 280 145"
              stroke="#38bdf8"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Highlight current point */}
            {electrolyteType === 'strong' ? (
              <circle
                cx={40 + (sqrtC / 0.35) * 240}
                cy={150 - (lambdaM_strong / 400) * 130}
                r="5"
                fill="#a855f7"
                className="animate-ping"
              />
            ) : (
              <circle
                cx={40 + (sqrtC / 0.35) * 240}
                cy={150 - (lambdaM_weak / 400) * 130}
                r="5"
                fill="#38bdf8"
                className="animate-ping"
              />
            )}
          </svg>
          <div className="text-[10px] text-slate-400 flex justify-between px-2 mt-1">
            <span className="text-purple-400">--- KCl (Linear Onsager Extrapolation)</span>
            <span className="text-sky-400">--- CH₃COOH (Kohlrausch Law Required)</span>
          </div>
        </div>

        {/* Dynamic Math Panel */}
        <div className="bg-slate-850 p-3 rounded-xl border border-slate-700/80 flex flex-col justify-between text-xs space-y-2">
          <div>
            <span className="text-slate-400 font-medium">Concentration (C):</span>
            <div className="text-lg font-bold text-slate-100">{concentration.toFixed(3)} mol/L</div>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.002"
              value={concentration}
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              className="w-full mt-1 accent-purple-400 cursor-pointer"
            />
          </div>

          <div className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Specific Cond. (κ):</span>
              <span className="text-amber-400 font-mono">{(currentKappa * 1000).toFixed(3)} mS/cm</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Molar Cond. (Λ_m):</span>
              <span className="text-purple-300 font-bold font-mono">{currentLambda.toFixed(1)} S cm²/mol</span>
            </div>
            {electrolyteType === 'weak' && (
              <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-1">
                <span>Degree of Diss. (α):</span>
                <span className="text-emerald-400 font-bold font-mono">{(alpha * 100).toFixed(1)} %</span>
              </div>
            )}
          </div>

          <p className="text-[10px] text-slate-400 leading-snug">
            Kohlrausch's Law: <strong className="text-purple-300">Λ°_m(CH₃COOH) = λ°(H⁺) + λ°(CH₃COO⁻)</strong> derived via strong electrolytes!
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. Galvanic Cell & Nernst Equation Visualizer
const GalvanicCellSim: React.FC = () => {
  const [znConc, setZnConc] = useState<number>(0.1); // M
  const [cuConc, setCuConc] = useState<number>(1.0); // M
  const [tempK, setTempK] = useState<number>(298);  // K

  const E0_cell = 1.10; // V
  const n = 2;
  const R = 8.314;
  const F = 96487;

  const Q = znConc / cuConc;
  const nernstFactor = (R * tempK * Math.log(Q)) / (n * F);
  const E_cell = E0_cell - nernstFactor;

  // Gibbs free energy calculation
  const deltaG = -n * F * E_cell / 1000; // kJ/mol

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h4 className="font-semibold text-amber-400 flex items-center gap-2">
          <span>🔋</span> Daniell Electrochemical Cell & Nernst Equation
        </h4>
        <span className="text-xs px-2 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded font-mono">
          E°_cell = +1.10 V
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cell Diagram Graphic */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative flex flex-col items-center justify-between">
          <svg viewBox="0 0 300 160" className="w-full h-40">
            {/* Wire & Voltmeter */}
            <path d="M 60 60 L 60 20 L 240 20 L 240 60" stroke="#f59e0b" strokeWidth="3" fill="none" />
            <circle cx="150" cy="20" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text x="150" y="24" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
              {E_cell.toFixed(3)} V
            </text>

            {/* Electron Flow Animation dots */}
            <motion.circle
              r="3"
              fill="#38bdf8"
              animate={{
                cx: [60, 60, 150, 240, 240],
                cy: [60, 20, 20, 20, 60]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Anode Beaker (Zinc) */}
            <rect x="30" y="60" width="60" height="80" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="35" y="65" width="50" height="70" fill="#38bdf8" fillOpacity="0.2" />
            <rect x="52" y="45" width="16" height="75" fill="#94a3b8" rx="1" />
            <text x="60" y="152" fill="#94a3b8" fontSize="9" textAnchor="middle">Zn Anode (-)</text>

            {/* Cathode Beaker (Copper) */}
            <rect x="210" y="60" width="60" height="80" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="215" y="65" width="50" height="70" fill="#b45309" fillOpacity="0.3" />
            <rect x="232" y="45" width="16" height="75" fill="#d97706" rx="1" />
            <text x="240" y="152" fill="#d97706" fontSize="9" textAnchor="middle">Cu Cathode (+)</text>

            {/* Salt Bridge */}
            <path d="M 80 80 L 80 50 L 220 50 L 220 80" stroke="#e2e8f0" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d="M 80 80 L 80 50 L 220 50 L 220 80" stroke="#a855f7" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="150" y="44" fill="#e2e8f0" fontSize="8" textAnchor="middle">KCl Salt Bridge</text>
          </svg>

          <div className="w-full flex justify-between text-[11px] text-slate-300 mt-2 px-2 border-t border-slate-800 pt-2">
            <span>Oxidation: Zn → Zn²⁺ + 2e⁻</span>
            <span>Reduction: Cu²⁺ + 2e⁻ → Cu</span>
          </div>
        </div>

        {/* Nernst Controls & Thermodynamics */}
        <div className="bg-slate-850 p-4 rounded-xl border border-slate-700/80 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">[Zn²⁺] Anode Concentration:</span>
              <span className="text-sky-400 font-bold">{znConc.toFixed(3)} M</span>
            </div>
            <input
              type="range"
              min="0.001"
              max="2.0"
              step="0.01"
              value={znConc}
              onChange={(e) => setZnConc(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">[Cu²⁺] Cathode Concentration:</span>
              <span className="text-amber-400 font-bold">{cuConc.toFixed(3)} M</span>
            </div>
            <input
              type="range"
              min="0.001"
              max="2.0"
              step="0.01"
              value={cuConc}
              onChange={(e) => setCuConc(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-300 flex justify-between">
              <span>Reaction Quotient (Q):</span>
              <strong className="text-purple-300">{Q.toFixed(3)}</strong>
            </div>
            <div className="text-xs font-mono text-slate-300 flex justify-between">
              <span>Cell Potential (E_cell):</span>
              <strong className="text-amber-400 font-bold">{E_cell.toFixed(3)} V</strong>
            </div>
            <div className="text-xs font-mono text-slate-300 flex justify-between border-t border-slate-800 pt-1">
              <span>Gibbs Free Energy (ΔG):</span>
              <strong className={deltaG < 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {deltaG.toFixed(1)} kJ/mol
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Azeotropic Mixtures Are Chemical Compounds with Fixed Boiling Points",
    description: "Students often believe that because an azeotrope boils at a constant temperature like a pure liquid, it must be a newly formed chemical compound. They assume the individual components lose their chemical identity completely.",
    correction: "Azeotropes are liquid mixtures, not chemical compounds, whose liquid and vapor phases have identical compositions at a specific boiling point. The components retain their individual chemical identities but cannot be separated by standard fractional distillation. Additionally, changing the external pressure alters the azeotropic composition and boiling point, which does not happen with pure chemical compounds.",
  },
  {
    id: "misc_2",
    title: "Positive Deviation from Raoult Law Corresponds to Exothermic Mixing",
    description: "Students frequently confuse positive deviation with energy release, assuming that heat is given out during mixing. They mistakenly associate the term 'positive' with an exothermic process.",
    correction: "Positive deviation occurs when solute-solvent (A-B) intermolecular forces are weaker than the solute-solute (A-A) and solvent-solvent (B-B) forces. Because energy is required to break the stronger pure component interactions, heat is absorbed during mixing, making $\\Delta H_{mix} > 0$ (endothermic). Conversely, negative deviation forms stronger A-B interactions, releasing heat and making $\\Delta H_{mix} < 0$ (exothermic).",
  },
  {
    id: "misc_3",
    title: "Positive Deviation Solutions Form Maximum Boiling Azeotropes",
    description: "Students often assume that positive deviation from Raoult's law leads to an increased boiling point, thereby forming a maximum boiling azeotrope. They directly link the word 'positive' to a higher boiling temperature.",
    correction: "Positive deviation means the vapor pressure of the solution is higher than expected from Raoult's law. Because a higher vapor pressure allows the liquid to boil at a lower temperature, solutions with large positive deviations form minimum boiling azeotropes. Conversely, solutions showing large negative deviations have lower vapor pressure and form maximum boiling azeotropes.",
  },
  {
    id: "misc_4",
    title: "Total Volume Is Always Additive When Mixing Any Two Liquids",
    description: "Students believe that mixing equal volumes of two liquids will always yield double the volume, regardless of the solution's non-ideality. They ignore how molecular interactions affect molecular packing.",
    correction: "Total volume is strictly additive ($\\Delta V_{mix} = 0$) only in ideal solutions where A-B interactions equal A-A and B-B interactions. In non-ideal solutions showing positive deviation, weaker A-B forces cause expansion ($\\Delta V_{mix} > 0$). In solutions showing negative deviation, stronger A-B forces pull molecules closer together, resulting in volume contraction ($\\Delta V_{mix} < 0$).",
  },
  {
    id: "misc_5",
    title: "Raoult Law Applies Equally to Completely and Partially Miscible Liquids",
    description: "Students tend to assume Raoult's law can be applied uniformly across any liquid mixture regardless of liquid miscibility. They overlook the condition that Raoult's law requires a single homogeneous phase.",
    correction: "Raoult's law strictly applies to homogeneous solutions formed by completely miscible volatile liquids across the full composition range. For partially miscible liquids, the system splits into two separate conjugate liquid layers, preventing uniform application of Raoult's law across all proportions. Instead, Raoult's law applies only to the solvent component in each saturated single-phase layer, while Henry's law governs the dilute solute component.",
  },
];

export default function C12_ChemistryIdealandnonidealsolutionsSim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<MainTab>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [labMode, setLabMode] = useState<LabMode>('solutions');

  // Interactive Quiz & Game State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Discovery Question State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Mastery & SRS States
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Calculate Overall Progress & Mastery
  const overallMastery = useMemo(() => {
    const levels = ALL_NODE_IDS.map((id) => masteryProb(bktMap[id]));
    const sum = levels.reduce((acc, l) => acc + l, 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  // Handle Challenge Option Submission
  const handleChallengeSubmit = () => {
    if (selectedOption === null || hasSubmitted) return;

    const currentChallenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = selectedOption === currentChallenge.correctIndex;
    setHasSubmitted(true);

    // BKT & SRS Update
    const updatedBkt = bktUpdate(bktMap[currentChallenge.nodeId], isCorrect);
    setBktMap((prev) => ({ ...prev, [currentChallenge.nodeId]: updatedBkt }));

    const reviewItem = createReviewItem(currentChallenge.nodeId, 'Chemistry');
    sm2Update(reviewItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Correct! Excellent chemical reasoning.');
      speechManager.speak('Great job! Keep going.');
      setScore((prev) => prev + 10);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite. Review the misconception feedback.');
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedOption(null);
    setHasSubmitted(false);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      recordGameScore(Object.values(ALL_NODE_IDS), score + 50);
      setActiveTab('summary');
    }
  };

  // Diagnostic Question for Discovery Tab
  const handleDiscoverySubmit = () => {
    if (discoveryAnswer === null || discoverySubmitted) return;
    setDiscoverySubmitted(true);
    if (discoveryAnswer === 1) {
      audioManager.play('success');
      speechManager.speak("Spot on! Hydrogen bonding pulls acetone and chloroform closer together.");
    } else {
      audioManager.play('error');
      speechManager.speak("Notice how unlike molecules form new hydrogen bonds.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col justify-between max-w-7xl mx-auto">
      {/* HEADER BAR */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-cyan-500/20">
            ⚛️
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight leading-tight">{SCENARIO.title}</h1>
            <p className="text-xs text-slate-400">{SCENARIO.subtitle}</p>
          </div>
        </div>

        {/* Global Mastery & Navigation Pill */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Mastery:</span>
            <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${overallMastery}%` }}
              />
            </div>
            <span className="text-xs font-bold text-cyan-400 font-mono">{overallMastery}%</span>
          </div>

          <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['discovery', 'slides', 'lab', 'challenges'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab(tab);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* HINT & CONFETTI OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Simulation & Mastery Complete!" />
      <SparkleBurst show={showSparkle} x={400} y={250} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* 1. DISCOVERY QUESTION TAB */}
        {activeTab === 'discovery' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 mb-3 inline-block">
                Discovery Task • Predict Before Learning
              </span>
              <h2 className="text-xl font-bold text-slate-100 mb-2">
                What happens to boiling point when Acetone & Chloroform are mixed?
              </h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Pure acetone molecules attract each other via dipole forces. Pure chloroform molecules attract each other via weak dipoles. When mixed, a new, strong intermolecular <strong>Hydrogen Bond (C-H···O=C)</strong> forms between them.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {[
                  "Vapour pressure increases → Solution boils at a LOWER temperature than either pure liquid.",
                  "Vapour pressure decreases → Solution boils at a HIGHER temperature than either pure liquid.",
                  "No change in vapour pressure or boiling point.",
                  "The two liquids immediately separate into two immiscible layers."
                ].map((optionText, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('pop');
                      setDiscoveryAnswer(idx);
                    }}
                    className={`p-4 rounded-xl text-left text-xs font-medium border transition-all ${
                      discoveryAnswer === idx
                        ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-300'
                    }`}
                  >
                    {optionText}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoveryAnswer === null}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xs uppercase tracking-wider text-white disabled:opacity-50"
                >
                  Confirm Prediction
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed space-y-2">
                  <p className="text-emerald-400 font-bold">
                    {discoveryAnswer === 1 ? "✓ Correct Prediction!" : "💡 Key Insight:"}
                  </p>
                  <p className="text-slate-300">
                    Stronger A-B hydrogen bonding holds molecules in the liquid phase more tightly. Fewer molecules escape into vapour, dropping vapour pressure (<strong>Negative Deviation</strong>). To make vapour pressure reach 1 atm, you must heat it to a higher temperature—creating a <strong>Maximum-Boiling Azeotrope</strong>!
                  </p>
                  <button
                    onClick={() => {
                      audioManager.play('whoosh');
                      setActiveTab('slides');
                    }}
                    className="mt-2 px-4 py-2 bg-cyan-500 text-slate-950 rounded-lg font-bold uppercase text-[11px]"
                  >
                    Proceed to Interactive Lessons →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 2. VISUAL LEARNING SLIDES TAB */}
        {activeTab === 'slides' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="flex gap-2">
                {TEACHING_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      audioManager.play('tap');
                      setCurrentSlideIndex(idx);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      currentSlideIndex === idx
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Slide {slide.id}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-400">
                Topic Node: <strong className="text-cyan-400">{TEACHING_SLIDES[currentSlideIndex].nodeIds[0]}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Dynamic Slide Visualizer */}
              <div className="lg:col-span-7">
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'solutions' && <VapourPressureVisualizer />}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'colligative' && <ColligativeParticleSim />}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'conductance' && <ConductivityLab />}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'galvanic' && <GalvanicCellSim />}
              </div>

              {/* Slide Explanatory Text */}
              <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 shadow-xl">
                <div>
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                    {TEACHING_SLIDES[currentSlideIndex].subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">
                    {TEACHING_SLIDES[currentSlideIndex].title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {TEACHING_SLIDES[currentSlideIndex].text}
                </p>

                <div className="p-3 bg-slate-950 rounded-lg border border-cyan-900/50">
                  <div className="text-[11px] font-bold text-cyan-300 mb-1">Key Examination Takeaway:</div>
                  <div className="text-xs text-slate-300 italic">
                    "{TEACHING_SLIDES[currentSlideIndex].keyTakeaway}"
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    disabled={currentSlideIndex === 0}
                    onClick={() => setCurrentSlideIndex((prev) => prev - 1)}
                    className="px-3 py-1.5 bg-slate-800 rounded text-xs disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                        setCurrentSlideIndex((prev) => prev + 1);
                      } else {
                        setActiveTab('lab');
                      }
                    }}
                    className="px-4 py-1.5 bg-cyan-500 text-slate-950 font-bold rounded text-xs"
                  >
                    {currentSlideIndex === TEACHING_SLIDES.length - 1 ? "Open Full Lab →" : "Next Slide →"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. INTERACTIVE EXPERIMENTAL LAB TAB */}
        {activeTab === 'lab' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Interactive Laboratory Workbench:
              </span>
              <div className="flex flex-wrap gap-2">
                {(['solutions', 'colligative', 'conductance', 'galvanic'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      audioManager.play('tap');
                      setLabMode(mode);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      labMode === mode
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {labMode === 'solutions' && <VapourPressureVisualizer />}
            {labMode === 'colligative' && <ColligativeParticleSim />}
            {labMode === 'conductance' && <ConductivityLab />}
            {labMode === 'galvanic' && <GalvanicCellSim />}
          </motion.div>
        )}

        {/* 4. PROGRESSIVE CHALLENGES TAB */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Challenge Header info */}
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-xs flex items-center justify-center">
                  {currentChallengeIndex + 1}
                </span>
                <span className="text-xs font-bold text-slate-200">
                  {CHALLENGES[currentChallengeIndex].title}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Node: {CHALLENGES[currentChallengeIndex].nodeId}
              </span>
            </div>

            {/* Main Question Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-base font-semibold text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CHALLENGES[currentChallengeIndex].options.map((opt, idx) => {
                  let buttonStyle = "border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-300";
                  if (selectedOption === idx) {
                    buttonStyle = "border-cyan-400 bg-cyan-950/60 text-cyan-200 font-semibold";
                  }
                  if (hasSubmitted) {
                    if (idx === CHALLENGES[currentChallengeIndex].correctIndex) {
                      buttonStyle = "border-emerald-500 bg-emerald-950/80 text-emerald-200 font-bold";
                    } else if (selectedOption === idx) {
                      buttonStyle = "border-rose-500 bg-rose-950/80 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasSubmitted}
                      onClick={() => {
                        audioManager.play('pop');
                        setSelectedOption(idx);
                      }}
                      className={`p-4 rounded-xl text-left text-xs transition-all border ${buttonStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons & Feedback */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>💡</span> {showHint ? "Hide Hint" : "Show Educational Hint"}
                </button>

                {!hasSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xs uppercase tracking-wider text-white disabled:opacity-40"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? "Next Challenge →" : "View Final Results →"}
                  </button>
                )}
              </div>

              {/* Hint Bubble */}
              {showHint && (
                <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex].hint} />
              )}

              {/* Misconception & Detailed Feedback Box */}
              {hasSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    selectedOption === CHALLENGES[currentChallengeIndex].correctIndex
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800 text-rose-200'
                  }`}
                >
                  <div className="font-bold flex items-center gap-2">
                    {selectedOption === CHALLENGES[currentChallengeIndex].correctIndex
                      ? "✓ Correct Explanation:"
                      : "⚠️ Common Misconception Alert:"}
                  </div>
                  <p className="leading-relaxed">
                    {CHALLENGES[currentChallengeIndex].explanation}
                  </p>
                  {selectedOption !== CHALLENGES[currentChallengeIndex].correctIndex && (
                    <p className="text-amber-300 italic pt-1 border-t border-rose-900/40">
                      <strong>Exam Pitfall:</strong> {CHALLENGES[currentChallengeIndex].misconception}
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* 5. SUMMARY & MASTERY TAB */}
        {activeTab === 'summary' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-2xl space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-3xl mx-auto">
                🏆
              </div>
              <h2 className="text-2xl font-extrabold text-slate-100">
                Class 12 Physical Chemistry Mastery Complete!
              </h2>
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                You have mastered all 10 core nodes spanning solution thermodynamics, colligative phenomena, electrolytic conductance, Kohlrausch's law, and electrochemical cell kinetics.
              </p>

              {/* Mastery Breakdown per Node */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4">
                {ALL_NODE_IDS.map((nodeId) => {
                  const lvl = Math.round(masteryProb(bktMap[nodeId]) * 100);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-mono">{nodeId}</div>
                      <div className="text-sm font-bold text-cyan-400">{lvl}%</div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  audioManager.play('whoosh');
                  setCurrentChallengeIndex(0);
                  setActiveTab('lab');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xs uppercase text-white shadow-lg"
              >
                Return to Interactive Workbench
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-8 pt-4 border-t border-slate-800/60 text-center text-[11px] text-slate-500 flex flex-wrap justify-between items-center">
        <span>ISC Class 12 Chemistry Syllabus • Physical Chemistry Module</span>
        <span>Covers Nodes c12_chem_011 to c12_chem_020</span>
      </footer>

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