'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs list mapping CBSE Electrochemistry
const NODE_IDS = {
  INTRO: 'c12_chem_cbse_300',
  SPONTANOUS: 'c12_chem_cbse_301',
  ELECTROLYTIC_CELL: 'c12_chem_cbse_303',
  DANIELL_CELL: 'c12_chem_cbse_304',
  CELL_EMF: 'c12_chem_cbse_306',
  SHE: 'c12_chem_cbse_307',
  NOTATION: 'c12_chem_cbse_308',
  SERIES: 'c12_chem_cbse_309',
  NERNST: 'c12_chem_cbse_311',
  EQUILIBRIUM: 'c12_chem_cbse_312',
  CONDUCTIVITY_CELL: 'c12_chem_cbse_315',
  VAR_CONDUCTIVITY: 'c12_chem_cbse_317',
  VAR_MOLAR: 'c12_chem_cbse_318',
  ELECTROLYTES_BEHAVIOR: 'c12_chem_cbse_319',
  LIMITING_MOLAR: 'c12_chem_cbse_321',
  KOHLRAUSCH_APPS: 'c12_chem_cbse_322',
  ELECTROLYSIS: 'c12_chem_cbse_323',
  FARADAY_LAWS: 'c12_chem_cbse_324',
  FARADAY_QUANTITATIVE: 'c12_chem_cbse_325',
  PRODUCTS_ELECTROLYSIS: 'c12_chem_cbse_326',
  OVERPOTENTIAL: 'c12_chem_cbse_327',
  HYDROGEN_ECONOMY: 'c12_chem_cbse_333'
};

// Standard Reduction Potentials E° (V) at 298 K
interface ElectrodeData {
  id: string;
  name: string;
  halfRxn: string;
  e0: number;
  n: number;
  color: string;
}

const ELECTRODE_SERIES: ElectrodeData[] = [
  { id: 'F2', name: 'Fluorine', halfRxn: 'F₂ + 2e⁻ ⇌ 2F⁻', e0: 2.87, n: 2, color: '#f43f5e' },
  { id: 'Au', name: 'Gold', halfRxn: 'Au³⁺ + 3e⁻ ⇌ Au', e0: 1.40, n: 3, color: '#eab308' },
  { id: 'Cl2', name: 'Chlorine', halfRxn: 'Cl₂ + 2e⁻ ⇌ 2Cl⁻', e0: 1.36, n: 2, color: '#22c55e' },
  { id: 'O2', name: 'Oxygen', halfRxn: 'O₂ + 4H⁺ + 4e⁻ ⇌ 2H₂O', e0: 1.23, n: 4, color: '#3b82f6' },
  { id: 'Ag', name: 'Silver', halfRxn: 'Ag⁺ + e⁻ ⇌ Ag', e0: 0.80, n: 1, color: '#cbd5e1' },
  { id: 'Cu', name: 'Copper', halfRxn: 'Cu²⁺ + 2e⁻ ⇌ Cu', e0: 0.34, n: 2, color: '#f97316' },
  { id: 'SHE', name: 'Hydrogen (SHE)', halfRxn: '2H⁺ + 2e⁻ ⇌ H₂', e0: 0.00, n: 2, color: '#38bdf8' },
  { id: 'Fe', name: 'Iron', halfRxn: 'Fe²⁺ + 2e⁻ ⇌ Fe', e0: -0.44, n: 2, color: '#94a3b8' },
  { id: 'Zn', name: 'Zinc', halfRxn: 'Zn²⁺ + 2e⁻ ⇌ Zn', e0: -0.76, n: 2, color: '#a855f7' },
  { id: 'Al', name: 'Aluminium', halfRxn: 'Al³⁺ + 3e⁻ ⇌ Al', e0: -1.66, n: 3, color: '#64748b' },
  { id: 'Mg', name: 'Magnesium', halfRxn: 'Mg²⁺ + 2e⁻ ⇌ Mg', e0: -2.36, n: 2, color: '#ec4899' },
  { id: 'Na', name: 'Sodium', halfRxn: 'Na⁺ + e⁻ ⇌ Na', e0: -2.71, n: 1, color: '#10b981' },
  { id: 'Li', name: 'Lithium', halfRxn: 'Li⁺ + e⁻ ⇌ Li', e0: -3.05, n: 1, color: '#ef4444' }
];

// Limiting Ionic Molar Conductivities (S cm² mol⁻¹) at 298 K
const LIMITING_IONIC_CONDUCTANCE: Record<string, number> = {
  'H+': 349.6,
  'OH-': 199.1,
  'Na+': 50.1,
  'K+': 73.5,
  'Cl-': 76.3,
  'Ac-': 40.9, // CH3COO-
  'Ca2+': 119.0,
  'SO4 2-': 160.0
};

// Challenges Interface
interface Challenge {
  id: number;
  nodeId: string;
  title: string;
  concept: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  speechText: string;
  type: 'multiple-choice' | 'numerical';
  targetValue?: number;
  unit?: string;
  tolerance?: number;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: NODE_IDS.DANIELL_CELL,
    title: 'Daniell Cell External Opposing Potential',
    concept: 'c12_chem_cbse_301 & c12_chem_cbse_304: Spontaneous vs Electrolytic',
    question: 'In a Daniell cell (E° = 1.10 V), an external opposing potential E_ext = 1.40 V is applied. What happens to electron flow and current?',
    options: [
      'Electrons flow from Zinc to Copper; current flows from Copper to Zinc.',
      'No electrons or current flow; system is at equilibrium.',
      'Electrons flow from Copper to Zinc; net current flows from Zinc to Copper.',
      'Zinc continues to dissolve at the anode and copper deposits at the cathode.'
    ],
    correctIndex: 2,
    explanation: 'When E_ext > E°cell (1.40 V > 1.10 V), the cell reaction reverses! It operates as an electrolytic cell. Electrons flow from Cu to Zn, and copper dissolves while zinc deposits.',
    hint: 'Think about what happens when the external battery overcomes the natural 1.10 V chemical pressure!',
    speechText: 'When external voltage exceeds 1.10 volts, the Daniell cell reverses into an electrolytic cell!',
    type: 'multiple-choice'
  },
  {
    id: 2,
    nodeId: NODE_IDS.CELL_EMF,
    title: 'Standard EMF of Galvanic Cell',
    concept: 'c12_chem_cbse_306 & c12_chem_cbse_308: Cell Notation & EMF Calculation',
    question: 'Calculate the standard EMF (E°cell) for the cell: Mg(s) | Mg²⁺(aq) || Cu²⁺(aq) | Cu(s). Given E°(Mg²⁺/Mg) = -2.36 V and E°(Cu²⁺/Cu) = +0.34 V.',
    options: ['+2.02 V', '+2.70 V', '-2.70 V', '+1.70 V'],
    correctIndex: 1,
    explanation: 'E°cell = E°cathode - E°anode = E°(Cu²⁺/Cu) - E°(Mg²⁺/Mg) = +0.34 - (-2.36) = +2.70 V.',
    hint: 'Remember E°cell = E°right - E°left (Cathode minus Anode).',
    speechText: 'Subtract the standard reduction potential of the anode from that of the cathode.',
    type: 'multiple-choice'
  },
  {
    id: 3,
    nodeId: NODE_IDS.NERNST,
    title: 'Nernst Equation Calculation',
    concept: 'c12_chem_cbse_311: Cell potential under non-standard conditions',
    question: 'Calculate Ecell at 298 K for Zn(s) | Zn²⁺(0.1 M) || Cu²⁺(0.01 M) | Cu(s). Given E°cell = 1.10 V and n = 2.',
    options: ['1.129 V', '1.0705 V', '1.100 V', '1.041 V'],
    correctIndex: 1,
    explanation: 'Ecell = E°cell - (0.0591 / n) * log([Zn²⁺] / [Cu²⁺]) = 1.10 - (0.0591 / 2) * log(0.1 / 0.01) = 1.10 - 0.02955 * log(10) = 1.10 - 0.02955 = 1.07045 V ≈ 1.0705 V.',
    hint: 'Use Ecell = E°cell - (0.0591/n) log([Anode ion]/[Cathode ion]). Note log(10) = 1.',
    speechText: 'Apply the Nernst equation with reaction quotient log of zero point one over zero point zero one.',
    type: 'multiple-choice'
  },
  {
    id: 4,
    nodeId: NODE_IDS.EQUILIBRIUM,
    title: 'Equilibrium Constant from Standard EMF',
    concept: 'c12_chem_cbse_312: Thermodynamic equilibrium in galvanic cells',
    question: 'For a cell with E°cell = 0.2955 V at 298 K with n = 2, calculate the log10 of the equilibrium constant log10(Kc). (Take 2.303RT/F = 0.0591 V).',
    options: ['5.0', '10.0', '2.5', '1.0'],
    correctIndex: 1,
    explanation: 'E°cell = (0.0591 / n) * log10(Kc) => 0.2955 = (0.0591 / 2) * log10(Kc) => 0.2955 = 0.02955 * log10(Kc) => log10(Kc) = 10.0.',
    hint: 'Rearrange E°cell = (0.0591 / n) * log10(Kc) to solve for log10(Kc).',
    speechText: 'At equilibrium, cell potential drops to zero, yielding log K_c equals n times E-zero over zero point zero five nine one.',
    type: 'multiple-choice'
  },
  {
    id: 5,
    nodeId: NODE_IDS.LIMITING_MOLAR,
    title: 'Kohlrausch Law Calculation for Weak Acid',
    concept: 'c12_chem_cbse_321: Limiting Molar Conductivity of CH₃COOH',
    question: 'Calculate Λ°m for acetic acid (CH₃COOH) using limiting molar conductivities: HCl = 426 S cm² mol⁻¹, NaCl = 126 S cm² mol⁻¹, CH₃COONa = 91 S cm² mol⁻¹.',
    options: ['391 S cm² mol⁻¹', '643 S cm² mol⁻¹', '209 S cm² mol⁻¹', '491 S cm² mol⁻¹'],
    correctIndex: 0,
    explanation: 'By Kohlrausch Law: Λ°m(CH₃COOH) = Λ°m(HCl) + Λ°m(CH₃COONa) - Λ°m(NaCl) = 426 + 91 - 126 = 391 S cm² mol⁻¹.',
    hint: 'Combine strong electrolyte conductivities so that Na+ and Cl- cancel out!',
    speechText: 'Add HCl and Sodium Acetate conductivities, then subtract Sodium Chloride.',
    type: 'multiple-choice'
  },
  {
    id: 6,
    nodeId: NODE_IDS.KOHLRAUSCH_APPS,
    title: 'Degree of Dissociation & Ka',
    concept: 'c12_chem_cbse_322: Degree of dissociation (α) application',
    question: 'A 0.01 M acetic acid solution has molar conductivity Λm = 39.1 S cm² mol⁻¹. If Λ°m = 391 S cm² mol⁻¹, what is its degree of dissociation (α)?',
    options: ['0.01 (1%)', '0.10 (10%)', '0.50 (50%)', '0.001 (0.1%)'],
    correctIndex: 1,
    explanation: 'Degree of dissociation α = Λm / Λ°m = 39.1 / 391 = 0.10 (or 10%).',
    hint: 'Divide the measured molar conductivity by limiting molar conductivity at infinite dilution.',
    speechText: 'Alpha equals molar conductivity divided by limiting molar conductivity.',
    type: 'multiple-choice'
  },
  {
    id: 7,
    nodeId: NODE_IDS.FARADAY_QUANTITATIVE,
    title: 'Faraday First Law - Deposited Copper Mass',
    concept: 'c12_chem_cbse_324 & c12_chem_cbse_325: Electrolysis Calculations',
    question: 'A current of 5.0 A is passed through CuSO₄ solution for 1930 seconds. Calculate the mass of Copper deposited at cathode. (Molar mass Cu = 63.5 g/mol, 1 F = 96500 C/mol).',
    options: ['6.35 g', '3.175 g', '1.587 g', '12.70 g'],
    correctIndex: 1,
    explanation: 'Q = I * t = 5.0 * 1930 = 9650 C. Moles of e⁻ = Q / F = 9650 / 96500 = 0.10 mol e⁻. Reaction: Cu²⁺ + 2e⁻ -> Cu. Moles Cu = 0.10 / 2 = 0.05 mol. Mass = 0.05 * 63.5 = 3.175 g.',
    hint: 'Calculate total charge Q = I * t, convert to moles of electrons, divide by 2 for Cu²⁺ reduction, then multiply by molar mass.',
    speechText: 'Multiply current by time to get charge in coulombs, then determine copper moles.',
    type: 'multiple-choice'
  },
  {
    id: 8,
    nodeId: NODE_IDS.OVERPOTENTIAL,
    title: 'Anode Product in Aqueous NaCl Electrolysis',
    concept: 'c12_chem_cbse_326 & c12_chem_cbse_327: Overpotential & Competition',
    question: 'During electrolysis of concentrated aqueous NaCl solution, Cl₂ gas is produced at the anode instead of O₂ gas. Why?',
    options: ['Standard oxidation potential of Cl⁻ is higher than water.', 'Water cannot be oxidized at all under any voltage.', 'Oxidation of water to O₂ gas suffers from a high overpotential (kinetic barrier).', 'Sodium metal coats the anode and blocks oxygen.'],
    correctIndex: 2,
    explanation: 'Although oxidation of water (E° = 1.23 V) is thermodynamically preferred over Cl⁻ (E° = 1.36 V), the oxidation of water to form O₂ is kinetically very slow and requires a significant extra potential (overpotential). Hence, Cl₂ gas is liberated preferentially.',
    hint: 'Thermodynamics favours oxygen, but kinetics creates a high overpotential barrier for oxygen evolution!',
    speechText: 'Overpotential creates a kinetic obstacle for oxygen, making chlorine gas evolution preferred.',
    type: 'multiple-choice'
  }
];

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 12 Electrochemistry Lab',
  subtitle: 'Master Nernst Equation, Galvanic Cells, and Corrosion',
  description: 'Step into a virtual electrochemistry lab where you build galvanic cells, apply the Nernst equation, and study battery chemistry and corrosion prevention.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Concentration Cell Puzzle',
  question: 'A concentration cell has two Cu/Cu2+ half-cells with [Cu2+] = 1.0M on one side and [Cu2+] = 0.01M on the other. What is the cell potential at 298K, and which electrode is the anode?',
  options: [
    'E = 0V because both electrodes are copper',
    'E = 0.059V (Nernst equation). The dilute side (0.01M) is the anode (oxidation), concentrated side is cathode (reduction)',
    'E = 1.1V because copper has a high standard potential',
    'E = 0.118V and the concentrated side is the anode'
],
  correctIndex: 1,
  explanation: 'Using Nernst equation: E = (0.0591/n) × log([Cu2+]cathode/[Cu2+]anode) = (0.0591/2) × log(1.0/0.01) = 0.0296 × 2 = 0.059V. The dilute half-cell (0.01M) has greater tendency to dissolve Cu, so it is the anode (oxidation). The concentrated side is the cathode (reduction).',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "galvanic",
    "name": "Galvanic Cell Lab",
    "description": "Build galvanic cells and measure EMF using standard electrode potentials."
  },
  {
    "id": "nernst",
    "name": "Nernst Equation Lab",
    "description": "Calculate cell potentials at non-standard concentrations."
  },
  {
    "id": "conductance",
    "name": "Conductance Lab",
    "description": "Study molar conductivity and Kohlrausch law."
  },
  {
    "id": "batteries",
    "name": "Batteries & Corrosion Lab",
    "description": "Explore lead-acid, dry cells, fuel cells, and corrosion chemistry."
  }
];

// ==========================================
// MISCONCEPTIONS (Enrichment Data)
// ==========================================
interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    "id": "misc_1",
    "title": "Multiplying Reaction Coefficients Changes Standard Electrode Potential",
    "description": "Students often believe that when a redox half-reaction is multiplied by a stoichiometric coefficient, its standard reduction potential (E°) must also be multiplied by that same number.",
    "correction": "Standard electrode potential (E°) is an intensive property, which means its value is independent of the amount of substance or the stoichiometric coefficients in the balanced equation. In contrast, Gibbs energy change (ΔG° = -nFE°) is an extensive property and does scale with reaction stoichiometry. Therefore, while ΔG° changes when multiplying coefficients, E° remains completely unchanged."
  },
  {
    "id": "misc_2",
    "title": "Conductivity Increases Upon Dilution of Electrolytic Solution",
    "description": "Students frequently confuse conductivity (specific conductance, κ) with molar conductivity (Λm), assuming that both values increase when a solution is diluted.",
    "correction": "Molar conductivity (Λm) increases upon dilution because total ionic mobility rises and ions are spread over a larger volume. However, conductivity (κ) always decreases with dilution because the number of current-carrying ions present per unit volume of solution decreases. Thus, conductivity and molar conductivity show opposite trends during dilution."
  },
  {
    "id": "misc_3",
    "title": "Standard Cell Potential Becomes Zero at Chemical Equilibrium",
    "description": "Students confuse the operational cell potential (Ecell) with the standard cell potential (E°cell), incorrectly believing that E°cell drops to zero once a cell reaction reaches equilibrium.",
    "correction": "At chemical equilibrium, only the real-time cell potential (Ecell) becomes zero because net electron flow stops. The standard cell potential (E°cell) is a fixed thermodynamic constant defined under standard conditions (1 M concentration, 1 atm pressure, 298 K) and does not change. Instead, E°cell is directly related to the equilibrium constant via the equation E°cell = (RT/nF) ln K."
  },
  {
    "id": "misc_4",
    "title": "Anode is Always Positive and Cathode is Always Negative",
    "description": "Students memorize electrode polarities rigidly, believing that the anode is positive and the cathode is negative across all electrochemical systems.",
    "correction": "The fundamental definition of electrodes relies on the reaction taking place: oxidation always occurs at the anode, and reduction always occurs at the cathode. In a galvanic (voltaic) cell, the anode is negative and the cathode is positive due to spontaneous chemical electron release. Conversely, in an electrolytic cell driven by an external power source, the anode is positive and the cathode is negative."
  },
  {
    "id": "misc_5",
    "title": "Kohlrausch Law Applies Exclusively to Weak Electrolyte Solutions",
    "description": "Students assume Kohlrausch law of independent migration of ions is relevant only for weak electrolytes because strong electrolytes can be measured directly via extrapolation.",
    "correction": "Kohlrausch law states that the limiting molar conductivity of any electrolyte equals the sum of the individual limiting ionic conductivities of its constituent cations and anions. This fundamental principle applies equally to both strong and weak electrolytes. While it is uniquely required to calculate limiting molar conductivity for weak electrolytes indirectly, it remains fully valid for strong electrolytes."
  }
];


export default function C12_ChemistryElectrochemistryCBSESim() {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'simulations' | 'challenges' | 'theory'>('simulations');
  const [activeSimModule, setActiveSimModule] = useState<'daniell' | 'she' | 'kohlrausch' | 'faraday' | 'fuelcell'>('daniell');

  // Daniell Cell State
  const [eExt, setEExt] = useState<number>(0.0); // 0.0 to 2.0 V
  const [znConc, setZnConc] = useState<number>(1.0); // 0.01 to 2.0 M
  const [cuConc, setCuConc] = useState<number>(1.0); // 0.01 to 2.0 M

  // SHE Pair State
  const [selectedElectrodeId, setSelectedElectrodeId] = useState<string>('Zn');

  // Kohlrausch Lab State
  const [electrolyteType, setElectrolyteType] = useState<'strong' | 'weak'>('strong');
  const [solutionConc, setSolutionConc] = useState<number>(0.05); // concentration M

  // Faraday Lab State
  const [currentAmp, setCurrentAmp] = useState<number>(2.5); // Amperes
  const [timeSec, setTimeSec] = useState<number>(1800); // Seconds
  const [electrolysisTarget, setElectrolysisTarget] = useState<'Cu' | 'Ag' | 'Al' | 'H2'>('Cu');

  // Challenge System State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Gamification & Feedback State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // SRS & BKT Tracking
  const [bktState, setBktState] = useState(() =>
    createBKTState()
  );

  // Canvas Refs
  const cellCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const curveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const faradayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Speech Welcome
  useEffect(() => {
    speechManager.speak('Welcome to CBSE Class 12 Electrochemistry Interactive Simulation Lab. Explore Galvanic cells, Nernst equation, Kohlrausch law, and Faraday electrolysis!');
  }, []);

  // Calculate Nernst Potential for Daniell Cell
  const daniellCalculations = useMemo(() => {
    const E0 = 1.10; // Standard EMF
    const n = 2;
    // Ecell = E0 - (0.0591 / n) * log10([Zn2+] / [Cu2+])
    const ratio = znConc / cuConc;
    const eNernst = E0 - (0.0591 / n) * Math.log10(ratio);
    const netE = eNernst - eExt; // Net driving potential
    let mode: 'galvanic' | 'equilibrium' | 'electrolytic' = 'galvanic';

    if (Math.abs(netE) < 0.01) {
      mode = 'equilibrium';
    } else if (netE < 0) {
      mode = 'electrolytic';
    } else {
      mode = 'galvanic';
    }

    const deltaG = -n * 96485 * eNernst / 1000; // kJ/mol

    return { eNernst, netE, mode, deltaG };
  }, [znConc, cuConc, eExt]);

  // Canvas Animation: Daniell Cell Visualiser
  useEffect(() => {
    if (activeTab !== 'simulations' || activeSimModule !== 'daniell') return;
    const canvas = cellCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw Beaker 1 (Zinc - Left)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.fillRect(40, 100, 180, 200);
      ctx.strokeRect(40, 100, 180, 200);

      // Liquid ZnSO4
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.fillRect(45, 140, 170, 155);

      // Zinc Electrode (Anode)
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(80, 60, 30, 180);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Zn Anode (-)', 65, 50);

      // Draw Beaker 2 (Copper - Right)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#f97316';
      ctx.fillRect(280, 100, 180, 200);
      ctx.strokeRect(280, 100, 180, 200);

      // Liquid CuSO4
      ctx.fillStyle = 'rgba(249, 115, 22, 0.25)';
      ctx.fillRect(285, 140, 170, 155);

      // Copper Electrode (Cathode)
      ctx.fillStyle = '#f97316';
      ctx.fillRect(390, 60, 30, 180);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Cu Cathode (+)', 365, 50);

      // Salt Bridge U-tube
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.moveTo(180, 180);
      ctx.lineTo(180, 90);
      ctx.lineTo(320, 90);
      ctx.lineTo(320, 180);
      ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('Salt Bridge (KCl in Agar)', 200, 80);

      // Wire and External Voltage Source
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(95, 60);
      ctx.lineTo(95, 20);
      ctx.lineTo(240, 20);
      ctx.moveTo(405, 60);
      ctx.lineTo(405, 20);
      ctx.lineTo(260, 20);
      ctx.stroke();

      // Battery / Voltmeter Symbol
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.fillRect(225, 5, 50, 30);
      ctx.strokeRect(225, 5, 50, 30);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`${eExt.toFixed(2)}V`, 233, 24);

      // Flowing Electrons Animation
      particleOffset = (particleOffset + (daniellCalculations.mode === 'galvanic' ? 1.5 : daniellCalculations.mode === 'electrolytic' ? -1.5 : 0)) % 20;

      if (daniellCalculations.mode !== 'equilibrium') {
        ctx.fillStyle = '#facc15';
        for (let x = 95; x <= 405; x += 25) {
          let px = x;
          if (daniellCalculations.mode === 'galvanic') {
            px += particleOffset;
          } else {
            px -= particleOffset;
          }
          if (px >= 95 && px <= 405) {
            ctx.beginPath();
            ctx.arc(px, 20, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Render Mode Status Text
      ctx.fillStyle = daniellCalculations.mode === 'galvanic' ? '#4ade80' : daniellCalculations.mode === 'electrolytic' ? '#f43f5e' : '#fba518';
      ctx.font = 'bold 14px sans-serif';
      const statusText = daniellCalculations.mode === 'galvanic'
        ? 'Spontaneous Galvanic Mode (E_ext < E_cell)'
        : daniellCalculations.mode === 'electrolytic'
        ? 'Non-Spontaneous Electrolytic Mode (E_ext > E_cell)'
        : 'Equilibrium (No Net Flow)';
      ctx.fillText(statusText, 80, 325);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, activeSimModule, daniellCalculations, eExt]);

  // Kohlrausch Curves Visualizer (Canvas)
  useEffect(() => {
    if (activeTab !== 'simulations' || activeSimModule !== 'kohlrausch') return;
    const canvas = curveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Draw Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(50, h - 40);
    ctx.lineTo(w - 20, h - 40);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('√c (mol/L)^½', w / 2, h - 10);
    ctx.save();
    ctx.translate(15, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Λm (S cm² mol⁻¹)', 0, 0);
    ctx.restore();

    // Plot Strong Electrolyte (KCl) - Linear: Λm = Λ°m - A√c
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const lambda0_strong = 150;
    const slope_strong = 80;
    for (let cSqrt = 0; cSqrt <= 0.5; cSqrt += 0.01) {
      const lambda = lambda0_strong - slope_strong * cSqrt;
      const x = 50 + (cSqrt / 0.5) * (w - 80);
      const y = (h - 40) - (lambda / 400) * (h - 60);
      if (cSqrt === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Strong (KCl)', w - 120, 60);

    // Plot Weak Electrolyte (CH3COOH) - Steep Curve at low c
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let cSqrt = 0.01; cSqrt <= 0.5; cSqrt += 0.005) {
      const c = cSqrt * cSqrt;
      const alpha = 0.000018 / (c + 0.000018); // rough approximation
      const lambda = 391 * Math.sqrt(alpha);
      const x = 50 + (cSqrt / 0.5) * (w - 80);
      const y = (h - 40) - (lambda / 400) * (h - 60);
      if (cSqrt === 0.01) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#f43f5e';
    ctx.fillText('Weak (CH₃COOH)', w - 140, 100);

    // Active Point Highlight based on solutionConc slider
    const currentSqrt = Math.sqrt(solutionConc);
    const xPos = 50 + (Math.min(currentSqrt, 0.5) / 0.5) * (w - 80);
    ctx.strokeStyle = '#eab308';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(xPos, 20);
    ctx.lineTo(xPos, h - 40);
    ctx.stroke();
    ctx.setLineDash([]);

  }, [activeTab, activeSimModule, solutionConc, electrolyteType]);

  // Handle Challenge Answer Selection
  const handleSelectAnswer = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
    audioManager.play('tap');
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const currentChallenge = CHALLENGES[challengeIndex];
    const isCorrect = selectedAnswer === currentChallenge.correctIndex;

    // BKT & SRS Update
    const newBkt = bktUpdate(bktState, isCorrect);
    setBktState(newBkt);

    const reviewItem = createReviewItem(currentChallenge.nodeId, 'Chemistry');
    const updatedSrs = sm2Update(reviewItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      setScore(prev => prev + 100);
      setShowConfetti(true);
      setShowSuccess(true);
      setShowSparkle(true);
      audioManager.play('celebration');
      audioManager.play('drop-correct');
      speechManager.speak('Excellent job! Correct answer!');
      setTimeout(() => {
        setShowConfetti(false);
        setShowSuccess(false);
        setShowSparkle(false);
      }, 2500);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('That is not quite right. Check the hint for clarification.');
    }
  };

  const handleNextChallenge = () => {
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
      audioManager.play('whoosh');
      speechManager.speak(CHALLENGES[challengeIndex + 1].speechText);
    } else {
      // Completed all challenges
      recordGameScore(Object.values(NODE_IDS), score);
      audioManager.play('chime');
      speechManager.speak('Congratulations! You have completed all CBSE Electrochemistry challenges!');
    }
  };

  // Electrode potential for selected reference
  const currentPairData = useMemo(() => {
    const selected = ELECTRODE_SERIES.find(e => e.id === selectedElectrodeId) || ELECTRODE_SERIES[8]; // Zn
    const she = ELECTRODE_SERIES.find(e => e.id === 'SHE')!;
    // Standard EMF = E°cathode - E°anode
    // If selected E° > 0, SHE acts as anode, selected acts as cathode.
    // If selected E° < 0, selected acts as anode, SHE acts as cathode.
    const isCathode = selected.e0 > 0;
    const e0Cell = Math.abs(selected.e0);
    const notation = isCathode
      ? `Pt(s) | H₂(g, 1 bar) | H⁺(aq, 1M) || ${selected.id}ⁿ⁺(aq, 1M) | ${selected.id}(s)`
      : `${selected.id}(s) | ${selected.id}ⁿ⁺(aq, 1M) || H⁺(aq, 1M) | H₂(g, 1 bar) | Pt(s)`;

    return { selected, isCathode, e0Cell, notation };
  }, [selectedElectrodeId]);

  // Faraday Calculations
  const faradayCalculations = useMemo(() => {
    const totalCharge = currentAmp * timeSec; // Coulombs
    const molesE = totalCharge / 96485;
    let n = 2;
    let molarMass = 63.5;
    let name = 'Copper (Cu)';

    if (electrolysisTarget === 'Ag') {
      n = 1;
      molarMass = 107.9;
      name = 'Silver (Ag)';
    } else if (electrolysisTarget === 'Al') {
      n = 3;
      molarMass = 27.0;
      name = 'Aluminium (Al)';
    } else if (electrolysisTarget === 'H2') {
      n = 2;
      molarMass = 2.016;
      name = 'Hydrogen Gas (H₂)';
    }

    const molesProduct = molesE / n;
    const massGram = molesProduct * molarMass;
    const volumeGasSTP = (molesProduct * 22.7).toFixed(3); // Liters at STP

    return { totalCharge, molesE, molesProduct, massGram, name, volumeGasSTP };
  }, [currentAmp, timeSec, electrolysisTarget]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col items-center">
      {/* Header & Title */}
      <header className="w-full max-w-6xl mb-6 bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 md:p-6 backdrop-blur flex flex-col md:flex-row justify-between items-center shadow-lg shadow-cyan-950/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-full text-xs font-semibold uppercase tracking-wide">
              CBSE Class 12 Chemistry
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-xs font-semibold">
              Chapter 3: Electrochemistry
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 mt-2">
            Interactive Electrochemistry Virtual Simulator
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Visualise Galvanic Cells, Nernst Equation, Kohlrausch Law & Faraday's Laws
          </p>
        </div>

        {/* Score & Mastery Tracker */}
        <div className="mt-4 md:mt-0 flex items-center gap-4 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase font-bold">Mastery Level</div>
            <div className="text-lg font-black text-cyan-400">
              {(masteryProb(bktState) * 100).toFixed(0)}%
            </div>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase font-bold">Total Score</div>
            <div className="text-lg font-black text-amber-400">{score} pts</div>
          </div>
        </div>
      </header>

      {/* Main Mode Tabs */}
      <div className="w-full max-w-6xl flex justify-center mb-6 gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveTab('simulations');
            audioManager.play('pop');
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'simulations'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>🔬 Interactive Visual Labs</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('pop');
            speechManager.speak(CHALLENGES[challengeIndex].speechText);
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'challenges'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>🎯 CBSE Numerical & Conceptual Challenges</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('theory');
            audioManager.play('pop');
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'theory'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>📚 CBSE Formula & Key Notes Summary</span>
        </button>
      </div>

      {/* TAB 1: VISUAL SIMULATIONS */}
      {activeTab === 'simulations' && (
        <div className="w-full max-w-6xl flex flex-col gap-6">
          {/* Sub-module selection header */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveSimModule('daniell');
                audioManager.play('pop');
              }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeSimModule === 'daniell'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Daniell Cell & Opposing Potential
            </button>
            <button
              onClick={() => {
                setActiveSimModule('she');
                audioManager.play('pop');
              }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeSimModule === 'she'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard Hydrogen Electrode (SHE)
            </button>
            <button
              onClick={() => {
                setActiveSimModule('kohlrausch');
                audioManager.play('pop');
              }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeSimModule === 'kohlrausch'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Molar Conductance & Kohlrausch
            </button>
            <button
              onClick={() => {
                setActiveSimModule('faraday');
                audioManager.play('pop');
              }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeSimModule === 'faraday'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Electrolysis & Faraday's Laws
            </button>
            <button
              onClick={() => {
                setActiveSimModule('fuelcell');
                audioManager.play('pop');
              }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeSimModule === 'fuelcell'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hydrogen Fuel Cell
            </button>
          </div>

          {/* Module A: Daniell Cell */}
          {activeSimModule === 'daniell' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
              <div className="lg:col-span-7 flex flex-col items-center">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">
                  Daniell Cell Setup: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)
                </h3>
                <canvas
                  ref={cellCanvasRef}
                  width={500}
                  height={350}
                  className="bg-slate-950 rounded-xl border border-slate-800 shadow-inner w-full max-w-[500px]"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">
                    Variable Parameters Control
                  </h4>

                  {/* External Voltage Slider */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">External Opposing Voltage (E_ext)</span>
                      <span className="text-cyan-400 font-bold">{eExt.toFixed(2)} V</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="2.0"
                      step="0.05"
                      value={eExt}
                      onChange={(e) => {
                        setEExt(parseFloat(e.target.value));
                        audioManager.play('pop');
                      }}
                      className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                      <span>0.0 V (Pure Galvanic)</span>
                      <span>1.10 V (Equilibrium)</span>
                      <span>2.0 V (Electrolytic)</span>
                    </div>
                  </div>

                  {/* Zn Ion Concentration Slider */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">[Zn²⁺] Concentration</span>
                      <span className="text-purple-400 font-bold">{znConc.toFixed(2)} M</span>
                    </div>
                    <input
                      type="range"
                      min="0.01"
                      max="2.0"
                      step="0.05"
                      value={znConc}
                      onChange={(e) => setZnConc(parseFloat(e.target.value))}
                      className="w-full accent-purple-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Cu Ion Concentration Slider */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">[Cu²⁺] Concentration</span>
                      <span className="text-orange-400 font-bold">{cuConc.toFixed(2)} M</span>
                    </div>
                    <input
                      type="range"
                      min="0.01"
                      max="2.0"
                      step="0.05"
                      value={cuConc}
                      onChange={(e) => setCuConc(parseFloat(e.target.value))}
                      className="w-full accent-orange-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Real-time Nernst Calculations Display */}
                <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/20 font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nernst Potential E_cell:</span>
                    <span className="text-cyan-400 font-bold">{daniellCalculations.eNernst.toFixed(4)} V</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gibbs Free Energy ΔG:</span>
                    <span className={`font-bold ${daniellCalculations.deltaG < 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {daniellCalculations.deltaG.toFixed(2)} kJ/mol
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reaction Quotient Q ([Zn²⁺]/[Cu²⁺]):</span>
                    <span className="text-amber-400 font-bold">{(znConc / cuConc).toFixed(3)}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-snug">
                    {daniellCalculations.mode === 'galvanic' && '⚡ Spontaneous reaction: Zn dissolves at anode, Cu deposits at cathode.'}
                    {daniellCalculations.mode === 'equilibrium' && '⚖️ Dynamic equilibrium: Net current = 0, ΔG = 0.'}
                    {daniellCalculations.mode === 'electrolytic' && '🔋 Driven non-spontaneous reaction: Cu dissolves at anode, Zn deposits at cathode!'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Module B: Standard Hydrogen Electrode (SHE) */}
          {activeSimModule === 'she' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
              <div className="lg:col-span-6 flex flex-col items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="text-md font-bold text-cyan-400 mb-3 text-center">
                  Standard Hydrogen Electrode (SHE) Reference Setup
                </h3>

                {/* SVG Reference Diagram of SHE */}
                <svg width="320" height="260" viewBox="0 0 320 260" className="w-full max-w-[320px]">
                  {/* Glass Beaker */}
                  <rect x="60" y="80" width="200" height="150" rx="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                  {/* Acid solution */}
                  <rect x="65" y="110" width="190" height="115" rx="5" fill="rgba(14, 165, 233, 0.2)" />
                  <text x="100" y="210" fill="#38bdf8" fontSize="11" fontWeight="bold">1.0 M H⁺(aq) Acid Solution</text>

                  {/* Hydrogen Gas Inlet Tube */}
                  <rect x="145" y="30" width="30" height="140" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  {/* H2 Gas Arrow */}
                  <text x="70" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">H₂ gas at 1 bar ➔</text>

                  {/* Pt Wire & Foil */}
                  <line x1="160" y1="20" x2="160" y2="180" stroke="#94a3b8" strokeWidth="3" />
                  <rect x="148" y="170" width="24" height="24" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="175" y="185" fill="#e2e8f0" fontSize="10">Pt Black Coated Foil</text>

                  {/* Bubbles */}
                  <circle cx="150" cy="150" r="3" fill="#38bdf8" opacity="0.8" />
                  <circle cx="170" cy="130" r="4" fill="#38bdf8" opacity="0.8" />
                  <circle cx="155" cy="120" r="2" fill="#38bdf8" opacity="0.8" />
                </svg>

                <div className="mt-3 text-center text-xs text-slate-400">
                  SHE Half-Reaction: <span className="text-cyan-300 font-mono">2H⁺(aq, 1M) + 2e⁻ ⇌ H₂(g, 1 bar)</span> | E° = <span className="text-emerald-400 font-bold">0.00 V</span>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">
                    Pair SHE with Standard Metal Half-Cell
                  </h4>

                  <label className="text-xs text-slate-300 block mb-2 font-medium">Select Metal Electrode:</label>
                  <select
                    value={selectedElectrodeId}
                    onChange={(e) => {
                      setSelectedElectrodeId(e.target.value);
                      audioManager.play('pop');
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-cyan-300 p-2.5 rounded-lg text-sm font-bold focus:outline-none focus:border-cyan-500"
                  >
                    {ELECTRODE_SERIES.filter(e => e.id !== 'SHE').map(e => (
                      <option key={e.id} value={e.id}>
                        {e.name} ({e.halfRxn}) — E° = {e.e0 > 0 ? `+${e.e0.toFixed(2)}` : e.e0.toFixed(2)} V
                      </option>
                    ))}
                  </select>

                  <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Selected Standard Potential:</span>
                      <span className="font-bold text-cyan-400">{currentPairData.selected.e0.toFixed(2)} V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Measured Cell EMF (E°cell):</span>
                      <span className="font-bold text-emerald-400">{currentPairData.e0Cell.toFixed(2)} V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Role of SHE:</span>
                      <span className="font-bold text-amber-300">
                        {currentPairData.isCathode ? 'Anode (Oxidation)' : 'Cathode (Reduction)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cell Notation Box */}
                <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30">
                  <h5 className="text-xs text-purple-400 uppercase font-bold mb-1">Standard IUPAC Cell Notation:</h5>
                  <div className="font-mono text-sm text-cyan-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
                    {currentPairData.notation}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    By convention, oxidation half-cell (Anode) is written on the LEFT and reduction half-cell (Cathode) on the RIGHT, separated by salt bridge <span className="text-cyan-400 font-bold">||</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Module C: Conductance & Kohlrausch's Law */}
          {activeSimModule === 'kohlrausch' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
              <div className="lg:col-span-7 flex flex-col items-center">
                <h3 className="text-sm font-bold text-cyan-400 mb-2">
                  Variation of Molar Conductivity (Λm) vs √c
                </h3>
                <canvas
                  ref={curveCanvasRef}
                  width={480}
                  height={280}
                  className="bg-slate-950 rounded-xl border border-slate-800 w-full max-w-[480px]"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3">
                    Electrolyte Parameters
                  </h4>

                  <div className="mb-4">
                    <label className="text-xs text-slate-300 block mb-1">Concentration c (mol/L):</label>
                    <input
                      type="range"
                      min="0.001"
                      max="0.25"
                      step="0.005"
                      value={solutionConc}
                      onChange={(e) => setSolutionConc(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-cyan-300 mt-1">
                      <span>c = {solutionConc.toFixed(3)} M</span>
                      <span>√c = {Math.sqrt(solutionConc).toFixed(3)}</span>
                    </div>
                  </div>

                  {/* Calculations for Acetic Acid Ka & Alpha */}
                  {(() => {
                    const lambda0 = 390.5; // S cm2 mol-1 for CH3COOH
                    // Alpha = sqrt(Ka / c) roughly
                    const alpha = Math.min(1.0, Math.sqrt(1.8e-5 / solutionConc));
                    const lambdaM = lambda0 * alpha;
                    return (
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5">
                        <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 text-[11px]">
                          Weak Electrolyte (CH₃COOH) Calculations:
                        </div>
                        <div className="flex justify-between">
                          <span>Λ°m (Infinite Dilution):</span>
                          <span className="text-cyan-400">390.5 S cm² mol⁻¹</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Λm (at conc c):</span>
                          <span className="text-amber-400">{lambdaM.toFixed(1)} S cm² mol⁻¹</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Degree of Dissociation α:</span>
                          <span className="text-emerald-400">{(alpha * 100).toFixed(2)}%</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-cyan-400 mb-1">Kohlrausch Law of Independent Migration:</div>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    "At infinite dilution, molar conductivity of an electrolyte is equal to the sum of limiting ionic conductivities of its constituent cations and anions."
                  </p>
                  <div className="font-mono text-cyan-300 text-[11px] mt-1 bg-slate-900 p-2 rounded">
                    Λ°m(CH₃COOH) = λ°(H⁺) + λ°(CH₃COO⁻) = 349.6 + 40.9 = 390.5 S cm² mol⁻¹
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Module D: Electrolysis & Faraday's Laws */}
          {activeSimModule === 'faraday' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
              <div className="lg:col-span-6 flex flex-col gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-cyan-400 mb-1">
                  Faraday's Quantitative Electrolysis Visualiser
                </h3>

                {/* Target Element Selector */}
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Target Element Deposited:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Cu', label: 'Copper (Cu²⁺ + 2e⁻ -> Cu)' },
                      { id: 'Ag', label: 'Silver (Ag⁺ + e⁻ -> Ag)' },
                      { id: 'Al', label: 'Aluminium (Al³⁺ + 3e⁻ -> Al)' },
                      { id: 'H2', label: 'Hydrogen Gas (2H⁺ + 2e⁻ -> H₂)' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setElectrolysisTarget(item.id as any);
                          audioManager.play('pop');
                        }}
                        className={`p-2 rounded-lg text-xs font-semibold text-left border ${
                          electrolysisTarget === item.id
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Electric Current (I):</span>
                      <span className="text-cyan-400 font-bold">{currentAmp.toFixed(1)} A</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="10.0"
                      step="0.5"
                      value={currentAmp}
                      onChange={(e) => setCurrentAmp(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Electrolysis Time (t):</span>
                      <span className="text-purple-400 font-bold">{timeSec} s ({(timeSec / 60).toFixed(1)} mins)</span>
                    </div>
                    <input
                      type="range"
                      min="300"
                      max="7200"
                      step="300"
                      value={timeSec}
                      onChange={(e) => setTimeSec(parseInt(e.target.value))}
                      className="w-full accent-purple-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-amber-400 mb-3 uppercase tracking-wide">
                    Electrolysis Output Calculations
                  </h4>

                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Total Charge Q = I × t:</span>
                      <span className="text-cyan-400 font-bold">{faradayCalculations.totalCharge.toLocaleString()} Coulombs</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Moles of Electrons (Q / F):</span>
                      <span className="text-purple-400 font-bold">{faradayCalculations.molesE.toFixed(4)} mol e⁻</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Moles of Product:</span>
                      <span className="text-amber-400 font-bold">{faradayCalculations.molesProduct.toFixed(4)} mol</span>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-lg border border-emerald-500/40 flex justify-between items-center">
                      <span className="text-slate-200 font-sans font-bold">Mass Deposited / Produced:</span>
                      <span className="text-emerald-400 font-bold text-lg">{faradayCalculations.massGram.toFixed(3)} g</span>
                    </div>

                    {electrolysisTarget === 'H2' && (
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
                        <span className="text-slate-400">Gas Volume at STP (22.7 L/mol):</span>
                        <span className="text-sky-400 font-bold">{faradayCalculations.volumeGasSTP} L</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-amber-400 font-bold">Faraday's First Law Formula:</span>
                  <div className="font-mono text-cyan-300 mt-0.5">m = (M × I × t) / (n × F)</div>
                  Where M = Molar Mass, n = valency factor, F = 96485 C mol⁻¹.
                </div>
              </div>
            </div>
          )}

          {/* Module E: Hydrogen Fuel Cell */}
          {activeSimModule === 'fuelcell' && (
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col items-center">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">
                Hydrogen-Oxygen Fuel Cell (Clean Electrochemical Energy)
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl text-center mb-6">
                Fuel cells convert the chemical energy of hydrogen combustion directly into electrical energy with approximately 70% efficiency and ZERO harmful emissions (pure water is the only product!).
              </p>

              <svg width="560" height="260" viewBox="0 0 560 260" className="w-full max-w-[560px] bg-slate-950 rounded-xl border border-slate-800 p-2">
                {/* Fuel Cell Chamber */}
                <rect x="180" y="40" width="200" height="180" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" rx="8" />

                {/* Porous Anode Electrode */}
                <rect x="210" y="50" width="20" height="160" fill="#334155" stroke="#a855f7" strokeWidth="2" />
                <text x="185" y="30" fill="#a855f7" fontSize="11" fontWeight="bold">Anode (-)</text>

                {/* Porous Cathode Electrode */}
                <rect x="330" y="50" width="20" height="160" fill="#334155" stroke="#f97316" strokeWidth="2" />
                <text x="335" y="30" fill="#f97316" fontSize="11" fontWeight="bold">Cathode (+)</text>

                {/* Electrolyte aqueous KOH */}
                <rect x="230" y="50" width="100" height="160" fill="rgba(56, 189, 248, 0.15)" />
                <text x="245" y="130" fill="#38bdf8" fontSize="10">aq KOH Electrolyte</text>

                {/* H2 Inlet */}
                <path d="M 80 80 L 210 80" stroke="#38bdf8" strokeWidth="4" />
                <text x="90" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold">H₂ In (Fuel) ➔</text>

                {/* O2 Inlet */}
                <path d="M 480 80 L 350 80" stroke="#f97316" strokeWidth="4" />
                <text x="400" y="70" fill="#f97316" fontSize="12" fontWeight="bold">⬅ O₂ In (Air)</text>

                {/* Water Outlet */}
                <path d="M 350 180 L 480 180" stroke="#10b981" strokeWidth="4" />
                <text x="380" y="200" fill="#10b981" fontSize="12" fontWeight="bold">➔ Pure H₂O Outlet</text>

                {/* Electric Load Wire */}
                <path d="M 220 50 L 220 15 L 340 15 L 340 50" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <circle cx="280" cy="15" r="14" fill="#f59e0b" />
                <text x="274" y="20" fill="#0f172a" fontSize="14" fontWeight="extrabold">💡</text>
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-6">
                <div className="bg-slate-950 p-3 rounded-lg border border-purple-500/30 text-xs font-mono">
                  <div className="text-purple-400 font-bold mb-1">Anode Half-Reaction:</div>
                  <div className="text-slate-300">2H₂(g) + 4OH⁻(aq) ➔ 4H₂O(l) + 4e⁻</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-orange-500/30 text-xs font-mono">
                  <div className="text-orange-400 font-bold mb-1">Cathode Half-Reaction:</div>
                  <div className="text-slate-300">O₂(g) + 2H₂O(l) + 4e⁻ ➔ 4OH⁻(aq)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  Challenge {challengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  {CHALLENGES[challengeIndex].title}
                </h2>
              </div>
              <div className="text-xs bg-slate-800 px-3 py-1.5 rounded-full text-slate-300 border border-slate-700">
                {CHALLENGES[challengeIndex].concept}
              </div>
            </div>

            {/* Question Text */}
            <div className="text-base text-slate-200 font-medium leading-relaxed mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              {CHALLENGES[challengeIndex].question}
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {CHALLENGES[challengeIndex].options.map((option, idx) => {
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/50';

                if (selectedAnswer === idx) {
                  btnStyle = 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold';
                }

                if (isAnswerSubmitted) {
                  if (idx === CHALLENGES[challengeIndex].correctIndex) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                  } else if (selectedAnswer === idx) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Hint & Speech Button Bar */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => {
                  setShowHint(prev => !prev);
                  audioManager.play('hint');
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg"
              >
                <span>💡 {showHint ? 'Hide Hint' : 'Show CBSE Hint'}</span>
              </button>

              <button
                onClick={() => speechManager.speak(CHALLENGES[challengeIndex].question)}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/30 px-3 py-1.5 rounded-lg"
              >
                <span>🔊 Read Question</span>
              </button>
            </div>

            {/* Hint Bubble Component */}
      <HintBubble show={showHint} text={CHALLENGES[challengeIndex].hint} />

            {/* Feedback Explanation */}
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border mb-6 text-xs leading-relaxed ${
                    selectedAnswer === CHALLENGES[challengeIndex].correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">
                    {selectedAnswer === CHALLENGES[challengeIndex].correctIndex ? '✅ Correct Solution:' : '❌ Explanation:'}
                  </div>
                  {CHALLENGES[challengeIndex].explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 shadow-cyan-500/25'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/25 hover:opacity-90"
                >
                  {challengeIndex < CHALLENGES.length - 1 ? 'Next Challenge ➔' : 'Complete Electrochemistry Module'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: THEORY & KEY FORMULAS */}
      {activeTab === 'theory' && (
        <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-extrabold text-cyan-400 border-b border-slate-800 pb-3">
            CBSE Class 12 Electrochemistry — Quick Reference & Master Formula Sheet
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">1. Nernst Equation & Gibbs Free Energy</h3>
              <p className="font-mono text-cyan-300">Ecell = E°cell - (0.0591 / n) log10(Q)</p>
              <p className="font-mono text-cyan-300">ΔG = -n F Ecell</p>
              <p className="font-mono text-cyan-300">E°cell = (0.0591 / n) log10(Kc)</p>
              <p className="text-slate-400 text-[11px] mt-1">
                At 298 K, 2.303 RT / F = 0.0591 V. n = number of moles of electrons involved.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-purple-400 text-sm">2. Conductance & Kohlrausch's Law</h3>
              <p className="font-mono text-cyan-300">Cell Constant G* = l / A = R × κ</p>
              <p className="font-mono text-cyan-300">Molar Conductance Λm = (κ × 1000) / M</p>
              <p className="font-mono text-cyan-300">Degree of Dissociation α = Λm / Λ°m</p>
              <p className="font-mono text-cyan-300">Ka = (c × α²) / (1 - α)</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-400 text-sm">3. Faraday's Laws of Electrolysis</h3>
              <p className="font-mono text-cyan-300">m = Z × Q = (M × I × t) / (n × F)</p>
              <p className="text-slate-400 text-[11px] mt-1">
                1 Faraday (F) = 96485 C mol⁻¹ = charge on 1 mole of electrons.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-rose-400 text-sm">4. Standard Hydrogen Electrode (SHE)</h3>
              <p className="text-slate-300">Reference potential assigned zero volts at all temperatures.</p>
              <p className="font-mono text-cyan-300">Pt(s) | H2(g, 1 bar) | H+(aq, 1 M)</p>
            </div>
          </div>
        </div>
      )}

      {/* Misconception Summary Checklist */}
      <div className="text-left space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-amber-300">Common Board Exam Misconception Checklist:</h3>
        <div className="grid grid-cols-1 gap-2">
          {MISCONCEPTIONS.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
              <div className="font-bold text-rose-400">{m.title}</div>
              <div className="text-slate-400">{m.description}</div>
              <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gamification Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Correct Answer! Mastery Increasing!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}