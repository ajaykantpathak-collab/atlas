'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ----------------------------------------------------------------------
// DATA TYPES & CONSTANTS
// ----------------------------------------------------------------------

type TabType = 'learn' | 'lab' | 'series' | 'challenges' | 'mastery';
type LabSubTab = 'daniell' | 'displacement' | 'fractional' | 'titration';

interface MetalCouple {
  id: string;
  name: string;
  symbol: string;
  ion: string;
  e0: number; // Standard reduction potential in Volts
  color: string;
  solutionColor: string;
  nodeId: string;
}

const ELECTROCHEMICAL_SERIES: MetalCouple[] = [
  { id: 'li', name: 'Lithium', symbol: 'Li', ion: 'Li⁺', e0: -3.05, color: '#e2e8f0', solutionColor: '#f1f5f9', nodeId: 'c11_chem_cbse_025' },
  { id: 'k', name: 'Potassium', symbol: 'K', ion: 'K⁺', e0: -2.93, color: '#cbd5e1', solutionColor: '#f8fafc', nodeId: 'c11_chem_cbse_025' },
  { id: 'ca', name: 'Calcium', symbol: 'Ca', ion: 'Ca²⁺', e0: -2.87, color: '#e2e8f0', solutionColor: '#f1f5f9', nodeId: 'c11_chem_cbse_025' },
  { id: 'na', name: 'Sodium', symbol: 'Na', ion: 'Na⁺', e0: -2.71, color: '#fed7aa', solutionColor: '#fff7ed', nodeId: 'c11_chem_cbse_004' },
  { id: 'mg', name: 'Magnesium', symbol: 'Mg', ion: 'Mg²⁺', e0: -2.37, color: '#94a3b8', solutionColor: '#f1f5f9', nodeId: 'c11_chem_cbse_022' },
  { id: 'al', name: 'Aluminium', symbol: 'Al', ion: 'Al³⁺', e0: -1.66, color: '#cbd5e1', solutionColor: '#f8fafc', nodeId: 'c11_chem_cbse_022' },
  { id: 'zn', name: 'Zinc', symbol: 'Zn', ion: 'Zn²⁺', e0: -0.76, color: '#a1a1aa', solutionColor: '#e0f2fe', nodeId: 'c11_chem_cbse_006' },
  { id: 'fe', name: 'Iron', symbol: 'Fe', ion: 'Fe²⁺', e0: -0.44, color: '#78716c', solutionColor: '#dcfce7', nodeId: 'c11_chem_cbse_015' },
  { id: 'ni', name: 'Nickel', symbol: 'Ni', ion: 'Ni²⁺', e0: -0.25, color: '#a8a29e', solutionColor: '#dcfce7', nodeId: 'c11_chem_cbse_006' },
  { id: 'sn', name: 'Tin', symbol: 'Sn', ion: 'Sn²⁺', e0: -0.14, color: '#94a3b8', solutionColor: '#f1f5f9', nodeId: 'c11_chem_cbse_010' },
  { id: 'pb', name: 'Lead', symbol: 'Pb', ion: 'Pb²⁺', e0: -0.13, color: '#64748b', solutionColor: '#f1f5f9', nodeId: 'c11_chem_cbse_029' },
  { id: 'h2', name: 'Hydrogen (SHE)', symbol: 'H₂', ion: 'H⁺', e0: 0.00, color: '#38bdf8', solutionColor: '#e0f2fe', nodeId: 'c11_chem_cbse_021' },
  { id: 'cu', name: 'Copper', symbol: 'Cu', ion: 'Cu²⁺', e0: 0.34, color: '#f97316', solutionColor: '#0284c7', nodeId: 'c11_chem_cbse_027' },
  { id: 'i2', name: 'Iodine', symbol: 'I₂', ion: 'I⁻', e0: 0.54, color: '#a855f7', solutionColor: '#f3e8ff', nodeId: 'c11_chem_cbse_026' },
  { id: 'fe3', name: 'Iron(III)', symbol: 'Fe³⁺', ion: 'Fe²⁺', e0: 0.77, color: '#ea580c', solutionColor: '#ffedd5', nodeId: 'c11_chem_cbse_023' },
  { id: 'ag', name: 'Silver', symbol: 'Ag', ion: 'Ag⁺', e0: 0.80, color: '#e2e8f0', solutionColor: '#f8fafc', nodeId: 'c11_chem_cbse_028' },
  { id: 'br2', name: 'Bromine', symbol: 'Br���', ion: 'Br⁻', e0: 1.09, color: '#b45309', solutionColor: '#fef3c7', nodeId: 'c11_chem_cbse_016' },
  { id: 'cr2o7', name: 'Dichromate', symbol: 'Cr₂O₇²⁻', ion: 'Cr³⁺', e0: 1.33, color: '#ea580c', solutionColor: '#ffedd5', nodeId: 'c11_chem_cbse_018' },
  { id: 'cl2', name: 'Chlorine', symbol: 'Cl₂', ion: 'Cl⁻', e0: 1.36, color: '#84cc16', solutionColor: '#ecfccb', nodeId: 'c11_chem_cbse_016' },
  { id: 'mno4', name: 'Permanganate', symbol: 'MnO₄⁻', ion: 'Mn²⁺', e0: 1.51, color: '#c026d3', solutionColor: '#fae8ff', nodeId: 'c11_chem_cbse_018' },
  { id: 'f2', name: 'Fluorine', symbol: 'F₂', ion: 'F⁻', e0: 2.87, color: '#eab308', solutionColor: '#fef9c3', nodeId: 'c11_chem_cbse_026' },
];

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  difficulty: 'Foundation' | 'Standard' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const ALL_NODES = [
  'c11_chem_cbse_004', 'c11_chem_cbse_006', 'c11_chem_cbse_007', 'c11_chem_cbse_010',
  'c11_chem_cbse_013', 'c11_chem_cbse_014', 'c11_chem_cbse_015', 'c11_chem_cbse_016',
  'c11_chem_cbse_017', 'c11_chem_cbse_018', 'c11_chem_cbse_020', 'c11_chem_cbse_021',
  'c11_chem_cbse_022', 'c11_chem_cbse_023', 'c11_chem_cbse_024', 'c11_chem_cbse_025',
  'c11_chem_cbse_026', 'c11_chem_cbse_027', 'c11_chem_cbse_028', 'c11_chem_cbse_029'
];

const CHALLENGES: Challenge[] = [
  {
    id: 'ch1',
    nodeId: 'c11_chem_cbse_004',
    title: 'Electronic Definition & Half-Reactions',
    difficulty: 'Foundation',
    question: 'In the redox reaction 2Na(s) + Cl₂(g) → 2NaCl(s), which species undergoes oxidation according to the electronic interpretation?',
    options: [
      'Cl₂ gains electrons and is oxidized',
      'Na loses an electron (Na → Na⁺ + e⁻) and is oxidized',
      'NaCl acts as the reducing agent',
      'Chlorine loses electrons to form chloride ions'
    ],
    correctIndex: 1,
    explanation: 'Oxidation is defined as loss of electrons (OIL). Sodium loses an electron to become Na⁺, undergoing oxidation.',
    hint: 'Remember the mnemonic OIL RIG: Oxidation Is Loss, Reduction Is Gain.'
  },
  {
    id: 'ch2',
    nodeId: 'c11_chem_cbse_010',
    title: 'Stock Notation & Nomenclature',
    difficulty: 'Foundation',
    question: 'What is the correct Stock notation for Auric chloride (HAuCl₄) and Stannous chloride (SnCl₂)?',
    options: [
      'Au(I)Cl and Sn(IV)Cl₄',
      'Au(III)Cl₃ and Sn(II)Cl₂',
      'Au(IV)Cl₄ and Sn(I)Cl₂',
      'Au(II)Cl₂ and Sn(III)Cl₃'
    ],
    correctIndex: 1,
    explanation: 'Stock notation uses Roman numerals in parentheses for metal oxidation states: Au is in +3 state, Sn is in +2 state: Au(III) and Sn(II).',
    hint: 'Auric means gold in +3 oxidation state; Stannous means tin in +2 oxidation state.'
  },
  {
    id: 'ch3',
    nodeId: 'c11_chem_cbse_013',
    title: 'Classification of Redox Reactions',
    difficulty: 'Standard',
    question: 'Identify the reaction type: 2KClO₃(s) → 2KCl(s) + 3O₂(g)',
    options: [
      'Combination redox reaction',
      'Decomposition redox reaction',
      'Disproportionation reaction',
      'Non-metal displacement reaction'
    ],
    correctIndex: 1,
    explanation: 'A compound (KClO₃) breaks down into simpler substances with elemental O₂ produced, changing oxidation states. Thus it is a decomposition redox reaction.',
    hint: 'One compound breaks down into two products, one of which is an element (O₂).'
  },
  {
    id: 'ch4',
    nodeId: 'c11_chem_cbse_014',
    title: 'Fractional Oxidation Numbers',
    difficulty: 'Advanced',
    question: 'Carbon suboxide (C₃O₂) has an average carbon oxidation number of +4/3. What are the actual non-fractional oxidation states of the 3 carbon atoms (O=C=C=C=O)?',
    options: [
      'All three carbon atoms are +4/3',
      'Terminal carbons are +2 each, middle carbon is 0',
      'Terminal carbons are +4 each, middle carbon is -4',
      'Terminal carbons are +1 each, middle carbon is +2'
    ],
    correctIndex: 1,
    explanation: 'Structural formula O=C=C=C=O shows terminal carbons bonded to oxygen (+2 each) and middle carbon bonded only to carbon (0). Average = (+2 + 0 + +2)/3 = +4/3.',
    hint: 'Carbon bonded to oxygen gets +2; carbon bonded to carbon gets 0.'
  },
  {
    id: 'ch5',
    nodeId: 'c11_chem_cbse_017',
    title: 'Disproportionation Reactions',
    difficulty: 'Standard',
    question: 'Why does Fluorine (F₂) NOT undergo disproportionation reactions with alkalis, unlike Cl₂, Br₂, and I₂?',
    options: [
      'Fluorine is a gas at room temperature',
      'Fluorine is the most electronegative element and has no positive oxidation state',
      'Fluorine forms strong hydrogen bonds in water',
      'Fluorine cannot react with sodium hydroxide'
    ],
    correctIndex: 1,
    explanation: 'Disproportionation requires an element to be simultaneously oxidized (higher ON) and reduced (lower ON). Fluorine is the most electronegative element and can only show 0 or -1 oxidation state.',
    hint: 'Can fluorine ever show a positive oxidation state?'
  },
  {
    id: 'ch6',
    nodeId: 'c11_chem_cbse_024',
    title: 'Feasibility of Redox Reactions (E°cell)',
    difficulty: 'Standard',
    question: 'Given E°(Fe³⁺/Fe²⁺) = +0.77 V and E°(I��/I⁻) = +0.54 V, calculate E°cell for the reaction: 2Fe³⁺(aq) + 2I⁻(aq) → 2Fe²⁺(aq) + I₂(s). Is it spontaneous?',
    options: [
      'E°cell = -0.23 V (Non-spontaneous)',
      'E°cell = +0.23 V (Spontaneous)',
      'E°cell = +1.31 V (Spontaneous)',
      'E°cell = -1.31 V (Non-spontaneous)'
    ],
    correctIndex: 1,
    explanation: 'E°cell = E°cathode - E°anode = E°(Fe³⁺/Fe²⁺) - E°(I₂/I⁻) = 0.77 - 0.54 = +0.23 V. Since E°cell > 0, the reaction is spontaneous.',
    hint: 'Fe³⁺ is reduced at cathode (0.77 V), I⁻ is oxidized at anode (0.54 V). E°cell = E°cat - E°an.'
  },
  {
    id: 'ch7',
    nodeId: 'c11_chem_cbse_025',
    title: 'Ordering Metals by Reducing Strength',
    difficulty: 'Standard',
    question: 'Arrange the metals in order of INCREASING reducing power given their standard electrode potentials: K (-2.93 V), Ag (+0.80 V), Mg (-2.37 V), Cr (-0.74 V), Fe (-0.44 V).',
    options: [
      'K < Mg < Cr < Fe < Ag',
      'Ag < Fe < Cr < Mg < K',
      'Ag < K < Mg < Cr < Fe',
      'K < Ag < Mg < Fe < Cr'
    ],
    correctIndex: 1,
    explanation: 'More negative E° value indicates stronger reducing power. Arranging from weakest (most positive E°) to strongest (most negative E°): Ag (+0.80) < Fe (-0.44) < Cr (-0.74) < Mg (-2.37) < K (-2.93).',
    hint: 'Weakest reducing agent has highest positive E°; strongest has most negative E°.'
  },
  {
    id: 'ch8',
    nodeId: 'c11_chem_cbse_027',
    title: 'Daniell Cell & Salt Bridge Function',
    difficulty: 'Advanced',
    question: 'In a Daniell Cell (Zn|Zn²⁺||Cu²⁺|Cu), what is the function of the salt bridge and electron flow direction in the external circuit?',
    options: [
      'Electrons flow Cu → Zn; Salt bridge increases cell voltage',
      'Electrons flow Zn → Cu; Salt bridge maintains electrical neutrality by ion migration',
      'Electrons flow through the salt bridge; Ions flow through external wire',
      'Electrons flow Zn → Cu; Salt bridge prevents chemical reaction from starting'
    ],
    correctIndex: 1,
    explanation: 'Oxidation occurs at Zn anode (releasing e⁻), electrons flow from Zn → Cu through external wire. The salt bridge completes the circuit and maintains charge neutrality via KCl/NH₄NO₃ ion flow.',
    hint: 'Zinc loses electrons (anode). Where do electrons go? What role do ions play in maintaining charge balance?'
  }
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 11 Redox Reactions Electrochemistry Lab',
  subtitle: 'Master Oxidation States, Balancing, and Electrochemical Cells',
  description: 'Step into a virtual electrochemistry lab where you balance redox equations, build Daniell cells, and explore standard electrode potentials.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Rusting Iron Mystery',
  question: 'Iron rusts when exposed to air and moisture, forming Fe2O3·xH2O. Is this an oxidation, reduction, or redox process, and which species is the oxidizing agent?',
  options: [
    'Only oxidation of Fe; water is the oxidizing agent',
    'Only reduction of O2; iron is the oxidizing agent',
    'Redox process; Fe is oxidized (loses electrons) and O2 is reduced (gains electrons). O2 is the oxidizing agent',
    'Redox process; Fe is reduced and O2 is oxidized'
],
  correctIndex: 2,
  explanation: 'Rusting is a redox process: Fe(0) is oxidized to Fe(+3), losing electrons. O2(0) is reduced to O(-2) in Fe2O3, gaining those electrons. Oxygen is the oxidizing agent (accepts electrons), and iron is the reducing agent (donates electrons).',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "oxidation_states",
    "name": "Oxidation States Lab",
    "description": "Assign and calculate oxidation numbers in compounds."
  },
  {
    "id": "balancing",
    "name": "Redox Balancing Station",
    "description": "Balance redox equations using half-reaction and oxidation number methods."
  },
  {
    "id": "electrochemical",
    "name": "Electrochemical Cell Lab",
    "description": "Build Daniell cells and measure standard electrode potentials."
  },
  {
    "id": "displacement",
    "name": "Displacement Reactions Lab",
    "description": "Explore metal displacement and reactivity series."
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
    "title": "Multiplying Standard Electrode Potential by Stoichiometric Coefficients",
    "description": "Students believe that when a half-reaction is multiplied by an integer to balance electrons, its standard electrode potential (E°) must also be multiplied by that same integer.",
    "correction": "Standard electrode potential (E°) is an intensive property and does not depend on the quantity of matter or stoichiometric coefficients in the equation. While Gibbs free energy change (ΔG°) is extensive and scales with stoichiometry, E° remains completely unchanged regardless of the multiplier used to balance electron transfer."
  },
  {
    "id": "misc_2",
    "title": "Fractional Oxidation States Imply Fractional Electron Transfer",
    "description": "Students incorrectly believe that a fractional oxidation state, such as +8/3 in Fe3O4 or +2.5 in S4O6^2-, means individual atoms gain or lose fractions of an electron.",
    "correction": "Electrons cannot be transferred in fractions during chemical reactions. A fractional oxidation state represents the structural average of different integer oxidation states possessed by non-equivalent atoms of the same element in a molecule. For example, in Fe3O4, two iron atoms have an oxidation state of +3 and one has +2, resulting in an average oxidation state of +8/3."
  },
  {
    "id": "misc_3",
    "title": "Salt Bridge Transports Electrons to Complete the Circuit",
    "description": "Students assume that electrons flow through the salt bridge from the anode compartment to the cathode compartment to complete the electrochemical circuit.",
    "correction": "Electrons flow exclusively through the external metallic wire from the anode to the cathode. The salt bridge completes the internal circuit by facilitating the movement of cations and anions into the respective half-cell solutions to maintain electrical neutrality."
  },
  {
    "id": "misc_4",
    "title": "Cathode Is Always Positive and Anode Is Always Negative",
    "description": "Students believe that the cathode carries a fixed positive charge and the anode carries a fixed negative charge across all electrochemical systems.",
    "correction": "Electrodes are defined strictly by the chemical process taking place: oxidation always occurs at the anode, and reduction always occurs at the cathode. In a Galvanic cell (like the Daniell cell), the anode is negative and the cathode is positive, whereas in an electrolytic cell, the anode is positive and the cathode is negative."
  },
  {
    "id": "misc_5",
    "title": "Identifying Only the Central Atom as the Redox Agent",
    "description": "Students often name only the specific element undergoing a change in oxidation number (e.g., Mn) as the oxidizing or reducing agent rather than the entire compound.",
    "correction": "An oxidizing or reducing agent must always be identified as the complete chemical formula of the reactant species (e.g., KMnO4 or MnO4^-) participating in the reaction. Although a specific atom within the compound changes its oxidation state, the whole compound or ion accepts or donates the electrons."
  }
];


export default function C11_ChemistryRedoxReactionsCBSESim() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<TabType>('learn');
  const [labSubTab, setLabSubTab] = useState<LabSubTab>('daniell');
  const [slideIndex, setSlideIndex] = useState<number>(0);

  // Audio & Voice options
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // BKT & Mastery States
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODES.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODES.forEach((id) => {
      initial[id] = createReviewItem(id, 'Chemistry');
    });
    return initial;
  });

  // Challenge State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Daniell Cell Lab State
  const [anodeMetalId, setAnodeMetalId] = useState<string>('zn');
  const [cathodeMetalId, setCathodeMetalId] = useState<string>('cu');
  const [cellRunning, setCellRunning] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Metal Displacement Lab State
  const [displaceSolid, setDisplaceSolid] = useState<string>('zn');
  const [displaceSolution, setDisplaceSolution] = useState<string>('cu');
  const [displacementProgress, setDisplacementProgress] = useState<number>(0);
  const [isDisplacing, setIsDisplacing] = useState<boolean>(false);

  // Fractional ON Visualizer State
  const [selectedMolecule, setSelectedMolecule] = useState<'C3O2' | 'Br3O8' | 'S4O6' | 'Fe3O4'>('C3O2');
  const [hoveredAtomInfo, setHoveredAtomInfo] = useState<string | null>(null);

  // Titration Simulator State
  const [titrationVolume, setTitrationVolume] = useState<number>(0);
  const [titrationDone, setTitrationDone] = useState<boolean>(false);

  // ----------------------------------------------------------------------
  // COMPUTED VALUES
  // ----------------------------------------------------------------------

  const currentChallenge = CHALLENGES[currentChallengeIdx];

  const overallMastery = useMemo(() => {
    let total = 0;
    ALL_NODES.forEach((id) => {
      total += masteryProb(bktStates[id]);
    });
    return Math.round((total / ALL_NODES.length) * 100);
  }, [bktStates]);

  const anodeData = useMemo(() => ELECTROCHEMICAL_SERIES.find(m => m.id === anodeMetalId) || ELECTROCHEMICAL_SERIES[6], [anodeMetalId]);
  const cathodeData = useMemo(() => ELECTROCHEMICAL_SERIES.find(m => m.id === cathodeMetalId) || ELECTROCHEMICAL_SERIES[12], [cathodeMetalId]);

  const cellE0 = useMemo(() => {
    return parseFloat((cathodeData.e0 - anodeData.e0).toFixed(2));
  }, [anodeData, cathodeData]);

  // ----------------------------------------------------------------------
  // EFFECTS & AUDIO HANDLERS
  // ----------------------------------------------------------------------

  const playSound = (type: SoundEffect | 'success' | 'error' | 'celebration' | 'hint' | 'pop' | 'chime' | 'sparkle' | 'balance' | 'count') => {
    if (soundEnabled) {
      audioManager.play(type);
    }
  };

  const speakText = (text: string) => {
    if (speechEnabled) {
      speechManager.speak(text);
    }
  };

  // Canvas Animation for Daniell Cell
  useEffect(() => {
    if (activeTab !== 'lab' || labSubTab !== 'daniell') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particleOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw Beakers
      // Left Beaker (Anode)
      ctx.fillStyle = anodeData.solutionColor;
      ctx.fillRect(40, 120, 140, 140);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 100, 140, 160);

      // Right Beaker (Cathode)
      ctx.fillStyle = cathodeData.solutionColor;
      ctx.fillRect(260, 120, 140, 140);
      ctx.strokeRect(260, 100, 140, 160);

      // Draw Electrodes
      // Anode Rod
      ctx.fillStyle = anodeData.color;
      ctx.fillRect(80, 60, 25, 170);
      ctx.strokeStyle = '#475569';
      ctx.strokeRect(80, 60, 25, 170);

      // Cathode Rod
      ctx.fillStyle = cathodeData.color;
      ctx.fillRect(335, 60, 25, 170);
      ctx.strokeRect(335, 60, 25, 170);

      // Salt Bridge (U-tube)
      ctx.beginPath();
      ctx.lineWidth = 22;
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.85)';
      ctx.moveTo(135, 160);
      ctx.lineTo(135, 80);
      ctx.lineTo(305, 80);
      ctx.lineTo(305, 160);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 18;
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
      ctx.moveTo(135, 160);
      ctx.lineTo(135, 80);
      ctx.lineTo(305, 80);
      ctx.lineTo(305, 160);
      ctx.stroke();

      // External Wires & Voltmeter
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f59e0b';
      ctx.moveTo(92, 60);
      ctx.lineTo(92, 25);
      ctx.lineTo(220, 25);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(347, 60);
      ctx.lineTo(347, 25);
      ctx.lineTo(220, 25);
      ctx.stroke();

      // Voltmeter dial
      ctx.beginPath();
      ctx.arc(220, 25, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = cellE0 > 0 ? '#4ade80' : '#ef4444';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${cellE0 > 0 ? '+' : ''}${cellE0}V`, 220, 29);

      // Labels
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`ANODE (-): ${anodeData.symbol}`, 92, 250);
      ctx.fillText(`CATHODE (+): ${cathodeData.symbol}`, 347, 250);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('Salt Bridge (KCl)', 220, 75);

      // Animated Electrons & Ions
      if (cellRunning && cellE0 > 0) {
        particleOffset = (particleOffset + 1.2) % 40;

        // Electrons flowing through wire (Anode -> Cathode)
        ctx.fillStyle = '#38bdf8';
        for (let x = 92; x <= 347; x += 25) {
          const currentX = x + (particleOffset % 25);
          if (currentX >= 92 && currentX <= 347) {
            ctx.beginPath();
            ctx.arc(currentX, 25, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Ions in solution (Anode dissolving into Zn2+)
        ctx.fillStyle = '#60a5fa';
        ctx.font = '9px sans-serif';
        const ionY = 160 + Math.sin(particleOffset * 0.1) * 8;
        ctx.fillText(`${anodeData.ion}`, 70, ionY);
        ctx.fillText(`${anodeData.ion}`, 115, ionY + 20);

        // Ions at Cathode (Cu2+ depositing as Cu)
        ctx.fillStyle = '#f97316';
        ctx.fillText(`${cathodeData.ion}`, 320, 200 - (particleOffset * 0.8) % 40);

        // Salt Bridge Ion Migration (K+ to Cathode, Cl- to Anode)
        ctx.fillStyle = '#ef4444'; // Cl-
        ctx.fillText('Cl⁻ →', 125, 110 + (particleOffset % 30));

        ctx.fillStyle = '#a855f7'; // K+
        ctx.fillText('← K⁺', 295, 110 + (particleOffset % 30));
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [activeTab, labSubTab, anodeData, cathodeData, cellE0, cellRunning]);

  // ----------------------------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------------------------

  const handleNextSlide = () => {
    playSound('whoosh');
    setSlideIndex((prev) => Math.min(prev + 1, 4));
    speakText(`Slide ${slideIndex + 2}`);
  };

  const handlePrevSlide = () => {
    playSound('whoosh');
    setSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const startDisplacement = () => {
    if (isDisplacing) return;
    playSound('pop');
    setIsDisplacing(true);
    setDisplacementProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDisplacementProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsDisplacing(false);
        playSound('chime');
        const anode = ELECTROCHEMICAL_SERIES.find(m => m.id === displaceSolid);
        const soln = ELECTROCHEMICAL_SERIES.find(m => m.id === displaceSolution);
        if (anode && soln && anode.e0 < soln.e0) {
          speakText('Displacement reaction complete! More reactive metal displaces less reactive metal.');
        } else {
          speakText('No reaction observed because the solid metal is less reactive than the metal in solution.');
        }
      }
    }, 100);
  };

  const handleTitrationDrop = () => {
    if (titrationDone) return;
    playSound('count');
    const newVol = parseFloat((titrationVolume + 1.0).toFixed(1));
    setTitrationVolume(newVol);
    if (newVol >= 25.0) {
      setTitrationDone(true);
      playSound('sparkle');
      speakText('Titration equivalence point reached! Permanganate self-indicator turns persistent pink.');
    }
  };

  const handleResetTitration = () => {
    playSound('tap');
    setTitrationVolume(0);
    setTitrationDone(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (challengeSubmitted) return;
    playSound('tap');
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || challengeSubmitted) return;

    setChallengeSubmitted(true);
    const isCorrect = selectedOption === currentChallenge.correctIndex;
    const nodeId = currentChallenge.nodeId;

    // Update BKT & SRS
    setBktStates((prev) => ({
      ...prev,
      [nodeId]: bktUpdate(prev[nodeId], isCorrect)
    }));

    setSrsItems((prev) => ({
      ...prev,
      [nodeId]: sm2Update(prev[nodeId], isCorrect ? 4 : 1, 0)
    }));

    if (isCorrect) {
      playSound('drop-correct');
      playSound('sparkle');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      setSparklePos({ x: 500, y: 300 });
      speakText('Correct! Excellent understanding of CBSE redox principles.');
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setShowSuccessBanner(false), 3500);

      // Record score
      recordGameScore(ALL_NODES, 100);
    } else {
      playSound('drop-wrong');
      speakText('Incorrect answer. Review the concept explanation below.');
    }
  };

  const handleNextChallenge = () => {
    playSound('whoosh');
    setSelectedOption(null);
    setChallengeSubmitted(false);
    setShowHint(false);
    setSparklePos(null);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      setCurrentChallengeIdx(0);
      playSound('celebration');
      speakText('All redox challenges completed! Great work.');
    }
  };

  // ----------------------------------------------------------------------
  // RENDER SLIDES CONTENT (CBSE SYLLABUS)
  // ----------------------------------------------------------------------

  const slideContents = [
    {
      title: '1. Electronic Interpretation & Redox Agents',
      nodes: ['c11_chem_cbse_004', 'c11_chem_cbse_007'],
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            Classic chemistry defined oxidation as oxygen addition and reduction as hydrogen addition. The modern <span className="text-cyan-400 font-semibold">electronic interpretation</span> unifies all redox reactions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <div className="bg-slate-800/80 border border-cyan-500/30 rounded-xl p-4">
              <h4 className="text-cyan-400 font-bold text-base mb-1">Oxidation (OIL)</h4>
              <p className="text-xs text-slate-300 mb-2">Loss of electrons by a species.</p>
              <div className="font-mono text-xs bg-slate-900 p-2 rounded text-amber-300">
                Na(s) → Na⁺(aq) + e⁻
              </div>
              <p className="text-xs text-slate-400 mt-2">
                <span className="font-semibold text-emerald-400">Reducing Agent (Reductant):</span> Donates electrons to reduce another species (is itself oxidized).
              </p>
            </div>
            <div className="bg-slate-800/80 border border-purple-500/30 rounded-xl p-4">
              <h4 className="text-purple-400 font-bold text-base mb-1">Reduction (RIG)</h4>
              <p className="text-xs text-slate-300 mb-2">Gain of electrons by a species.</p>
              <div className="font-mono text-xs bg-slate-900 p-2 rounded text-cyan-300">
                Cl₂(g) + 2e⁻ → 2Cl⁻(aq)
              </div>
              <p className="text-xs text-slate-400 mt-2">
                <span className="font-semibold text-purple-400">Oxidizing Agent (Oxidant):</span> Accepts electrons to oxidize another species (is itself reduced).
              </p>
            </div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
            <span>Overall Reaction: 2Na + Cl₂ → 2NaCl</span>
            <span className="text-amber-400 font-mono">Mnemonic: OIL RIG</span>
          </div>
        </div>
      )
    },
    {
      title: '2. Reaction Types & Disproportionation',
      nodes: ['c11_chem_cbse_013', 'c11_chem_cbse_015', 'c11_chem_cbse_016', 'c11_chem_cbse_017'],
      content: (
        <div className="space-y-3">
          <p className="text-slate-300 text-sm">
            CBSE classifies Redox reactions into four primary categories:
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
              <div className="text-cyan-400 font-semibold mb-1">Combination</div>
              <div className="text-slate-400 font-mono">C + O₂ → CO₂</div>
              <p className="text-[11px] text-slate-400 mt-1">At least one reactant must be elemental.</p>
            </div>
            <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
              <div className="text-cyan-400 font-semibold mb-1">Decomposition</div>
              <div className="text-slate-400 font-mono">2KClO₃ → 2KCl + 3O₂</div>
              <p className="text-[11px] text-slate-400 mt-1">Note: CaCO₃ → CaO + CO₂ is NOT redox!</p>
            </div>
            <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
              <div className="text-cyan-400 font-semibold mb-1">Displacement</div>
              <div className="text-slate-400 font-mono">Zn + CuSO₄ → ZnSO₄ + Cu</div>
              <p className="text-[11px] text-slate-400 mt-1">Metal or Non-metal (e.g. Cl₂ + 2KBr → 2KCl + Br₂).</p>
            </div>
            <div className="bg-slate-800/70 p-3 rounded-lg border border-purple-500/40">
              <div className="text-purple-400 font-semibold mb-1">Disproportionation</div>
              <div className="text-slate-400 font-mono">2H₂O₂ → 2H₂O + O₂</div>
              <p className="text-[11px] text-slate-400 mt-1">Same element simultaneously oxidized (-1→0) and reduced (-1→-2).</p>
            </div>
          </div>
          <div className="bg-amber-900/30 border border-amber-500/30 p-2.5 rounded text-xs text-amber-200">
            <strong>Key CBSE Rule for Disproportionation:</strong> The element must exist in at least 3 oxidation states. <span className="underline">Fluorine (F₂)</span> cannot disproportionate because it is the most electronegative element and has no positive oxidation state.
          </div>
        </div>
      )
    },
    {
      title: '3. Stock Notation & Fractional Oxidation States',
      nodes: ['c11_chem_cbse_010', 'c11_chem_cbse_014'],
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs">
            <h4 className="text-amber-400 font-semibold text-sm mb-1">Stock Notation (Alfred Stock)</h4>
            <p className="text-slate-300 mb-2">
              Expresses metal oxidation state as a Roman numeral in parentheses:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-slate-200">
              <div className="bg-slate-900 p-1.5 rounded">Au(III)Cl₃</div>
              <div className="bg-slate-900 p-1.5 rounded">Sn(II)Cl₂</div>
              <div className="bg-slate-900 p-1.5 rounded">Fe₂(III)O₃</div>
            </div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs">
            <h4 className="text-cyan-400 font-semibold text-sm mb-1">Fractional Oxidation Numbers = Averages!</h4>
            <p className="text-slate-300 mb-2">
              Fractional oxidation numbers represent structural averages of non-equivalent atoms:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1">
              <li><strong className="text-slate-200">Carbon suboxide (C₃O₂):</strong> Avg ON = +4/3. Structure O=C⁽⁺²⁾=C⁽⁰⁾=C⁽⁺²⁾=O.</li>
              <li><strong className="text-slate-200">Tribromooctaoxide (Br₃O₈):</strong> Avg ON = +16/3 (Two Br at +6, One Br at +4).</li>
              <li><strong className="text-slate-200">Tetrathionate (S₄O₆²⁻):</strong> Avg ON = +2.5 (Two terminal S at +5, two middle S at 0).</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: '4. Daniell Cell & Galvanic Cell Representation',
      nodes: ['c11_chem_cbse_020', 'c11_chem_cbse_027', 'c11_chem_cbse_028'],
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <p>
            A <span className="text-cyan-400 font-semibold">Galvanic cell</span> converts chemical energy from spontaneous redox reactions into electrical energy.
          </p>
          <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/40 font-mono text-center">
            <div className="text-amber-300 text-sm mb-1">Daniell Cell Notation:</div>
            <div className="text-lg text-cyan-400 font-bold">Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)</div>
            <div className="text-slate-400 text-[11px] mt-1 flex justify-between px-6">
              <span>Anode (Left, Oxidation)</span>
              <span>Salt Bridge (||)</span>
              <span>Cathode (Right, Reduction)</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
              <strong className="text-amber-400 block mb-1">Anode Half-Reaction</strong>
              <span>Zn(s) → Zn²⁺(aq) + 2e⁻</span>
              <p className="text-[11px] text-slate-400 mt-1">Negative electrode; electron donor.</p>
            </div>
            <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
              <strong className="text-emerald-400 block mb-1">Cathode Half-Reaction</strong>
              <span>Cu²⁺(aq) + 2e⁻ → Cu(s)</span>
              <p className="text-[11px] text-slate-400 mt-1">Positive electrode; electron acceptor.</p>
            </div>
          </div>
          <div className="bg-purple-950/40 p-2.5 rounded border border-purple-500/30 text-purple-200 text-[11px]">
            <strong>Salt Bridge Purpose:</strong> Maintains electrical neutrality by ion diffusion (K⁺ to cathode, Cl⁻ to anode) and completes the circuit without mechanical mixing.
          </div>
        </div>
      )
    },
    {
      title: '5. Standard Potential, Series & Titrations',
      nodes: ['c11_chem_cbse_018', 'c11_chem_cbse_021', 'c11_chem_cbse_022', 'c11_chem_cbse_023', 'c11_chem_cbse_024', 'c11_chem_cbse_025', 'c11_chem_cbse_026', 'c11_chem_cbse_029'],
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <h4 className="text-emerald-400 font-semibold mb-1">Standard Cell Potential Calculation</h4>
            <div className="font-mono text-cyan-300 bg-slate-900 p-2 rounded text-center text-sm">
              E°cell = E°cathode - E°anode
            </div>
            <p className="text-slate-400 mt-1.5 text-[11px]">
              If <strong>E°cell &gt; 0</strong>, the reaction is <span className="text-emerald-400 font-semibold">spontaneous (feasible)</span>.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
              <span className="text-amber-400 font-semibold block mb-1">Electrochemical Series Trend</span>
              <p className="text-[11px] text-slate-400">
                • More negative E° → Stronger Reducing Power (Li = -3.05 V)<br />
                • More positive E° → Stronger Oxidizing Power (F₂ = +2.87 V)
              </p>
            </div>
            <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
              <span className="text-purple-400 font-semibold block mb-1">Redox Titrations</span>
              <p className="text-[11px] text-slate-400">
                • <strong>Self-indicator:</strong> KMnO₄ (turns permanent pink at endpoint)<br />
                • <strong>Iodometric:</strong> I₂ + starch (blue complex)
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  // ----------------------------------------------------------------------
  // JSX RETURN
  // ----------------------------------------------------------------------

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-12">
      {/* HEADER BAR */}
      <header className="w-full bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-cyan-500/20">
            e⁻
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
              CBSE Class 11 Redox Reactions Interactive Lab
              <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded-full font-mono">
                NCERT Chapter 7
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Master oxidation-reduction, cell potentials, disproportionation & titrations
            </p>
          </div>
        </div>

        {/* Global Controls & Overall Mastery */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400">Mastery:</span>
            <div className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${overallMastery}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400">{overallMastery}%</span>
          </div>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playSound('tap');
            }}
            className={`p-2 rounded-lg border transition ${soundEnabled ? 'bg-slate-800 text-cyan-400 border-cyan-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}
            title="Toggle Sound Effects"
          >
            🔊
          </button>

          <button
            onClick={() => {
              setSpeechEnabled(!speechEnabled);
              playSound('tap');
            }}
            className={`p-2 rounded-lg border transition ${speechEnabled ? 'bg-slate-800 text-emerald-400 border-emerald-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}
            title="Toggle Audio Voice Narrator"
          >
            🗣️
          </button>
        </div>
      </header>

      {/* MAIN NAVIGATION TABS */}
      <nav className="w-full bg-slate-900/50 border-b border-slate-800/80 px-6 py-2 flex items-center justify-center gap-2">
        <button
          onClick={() => { setActiveTab('learn'); playSound('tap'); }}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${activeTab === 'learn' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          📖 Learn & Concepts
        </button>
        <button
          onClick={() => { setActiveTab('lab'); playSound('tap'); }}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${activeTab === 'lab' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🧪 Interactive Lab
        </button>
        <button
          onClick={() => { setActiveTab('series'); playSound('tap'); }}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${activeTab === 'series' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          ⚡ Electrochemical Series
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); playSound('tap'); }}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${activeTab === 'challenges' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🎯 CBSE Practice ({CHALLENGES.length})
        </button>
        <button
          onClick={() => { setActiveTab('mastery'); playSound('tap'); }}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${activeTab === 'mastery' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          📊 BKT & SRS Tracker
        </button>
      </nav>

      {/* BODY CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col gap-6">

        {/* TAB 1: LEARN (5 TEACHING SLIDES) */}
        {activeTab === 'learn' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-cyan-950 text-cyan-400 font-mono text-xs px-2.5 py-1 rounded-md border border-cyan-800/50">
                    Slide {slideIndex + 1} / 5
                  </span>
                  <h2 className="text-lg font-bold text-slate-100">{slideContents[slideIndex].title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    disabled={slideIndex === 0}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 disabled:opacity-40 hover:bg-slate-700"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleNextSlide}
                    disabled={slideIndex === 4}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold disabled:opacity-40 hover:bg-cyan-400"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Slide Body */}
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px]"
              >
                {slideContents[slideIndex].content}
              </motion.div>

              {/* Node Coverage Tags */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                <span>CBSE Covered Nodes:</span>
                {slideContents[slideIndex].nodes.map((nId) => (
                  <span key={nId} className="bg-slate-800 text-cyan-400 font-mono px-2 py-0.5 rounded border border-slate-700">
                    {nId}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LAB (CANVAS + SVG SIMULATIONS) */}
        {activeTab === 'lab' && (
          <div className="flex flex-col gap-4">
            {/* Lab Sub-Nav */}
            <div className="flex items-center justify-center gap-3 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => { setLabSubTab('daniell'); playSound('tap'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${labSubTab === 'daniell' ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40' : 'text-slate-400'}`}
              >
                ⚡ Daniell Cell Simulator
              </button>
              <button
                onClick={() => { setLabSubTab('displacement'); playSound('tap'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${labSubTab === 'displacement' ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40' : 'text-slate-400'}`}
              >
                🧪 Metal & Halogen Displacement
              </button>
              <button
                onClick={() => { setLabSubTab('fractional'); playSound('tap'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${labSubTab === 'fractional' ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40' : 'text-slate-400'}`}
              >
                ⚛️ Fractional ON & Molecular Structure
              </button>
              <button
                onClick={() => { setLabSubTab('titration'); playSound('tap'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${labSubTab === 'titration' ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40' : 'text-slate-400'}`}
              >
                ���� Redox Titration (KMnO₄)
              </button>
            </div>

            {/* SUB-LAB 1: DANIELL CELL (CANVAS ANIMATION) */}
            {labSubTab === 'daniell' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative shadow-xl">
                  <div className="w-full flex justify-between items-center mb-2 px-2">
                    <span className="text-xs font-semibold text-slate-300">Live Galvanic Cell Visualizer</span>
                    <button
                      onClick={() => { setCellRunning(!cellRunning); playSound('tap'); }}
                      className={`text-xs px-3 py-1 rounded-md font-medium transition ${cellRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}`}
                    >
                      {cellRunning ? 'Pause Electron Flow' : 'Resume Flow'}
                    </button>
                  </div>

                  <canvas
                    ref={canvasRef}
                    width={440}
                    height={270}
                    className="bg-slate-950 rounded-xl border border-slate-800 max-w-full"
                  />

                  {/* Cell Notation Box */}
                  <div className="mt-4 w-full bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Cell Notation Representation (CBSE Format)</span>
                    <span className="text-cyan-400 font-mono font-bold text-base">
                      {anodeData.symbol}(s) | {anodeData.ion}(aq, 1M) || {cathodeData.ion}(aq, 1M) | {cathodeData.symbol}(s)
                    </span>
                  </div>
                </div>

                {/* Cell Control Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Cell Electrodes Configuration</h3>

                  <div>
                    <label className="text-xs text-amber-400 font-semibold block mb-1">Anode (Oxidation / Negative Pole):</label>
                    <select
                      value={anodeMetalId}
                      onChange={(e) => { setAnodeMetalId(e.target.value); playSound('tap'); }}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-lg p-2 focus:ring-2 focus:ring-cyan-500"
                    >
                      {ELECTROCHEMICAL_SERIES.slice(0, 11).map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.symbol}) — E° = {m.e0} V
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-emerald-400 font-semibold block mb-1">Cathode (Reduction / Positive Pole):</label>
                    <select
                      value={cathodeMetalId}
                      onChange={(e) => { setCathodeMetalId(e.target.value); playSound('tap'); }}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-lg p-2 focus:ring-2 focus:ring-cyan-500"
                    >
                      {ELECTROCHEMICAL_SERIES.slice(11).map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.symbol}) — E° = {m.e0} V
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Anode Reduction Potential (E°an):</span>
                      <span className="font-mono text-amber-400">{anodeData.e0} V</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Cathode Reduction Potential (E°cat):</span>
                      <span className="font-mono text-emerald-400">{cathodeData.e0} V</span>
                    </div>
                    <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm">
                      <span>Calculated E°cell:</span>
                      <span className={cellE0 > 0 ? 'text-emerald-400 font-mono' : 'text-red-400 font-mono'}>
                        {cellE0 > 0 ? `+${cellE0}` : cellE0} V
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      {cellE0 > 0 ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          ✓ Reaction is <strong>Spontaneous</strong> (Feasible)
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-1">
                          ✗ Non-Spontaneous under standard conditions
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-LAB 2: METAL & HALOGEN DISPLACEMENT */}
            {labSubTab === 'displacement' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Competitive Metal & Halogen Displacement</h3>
                    <p className="text-xs text-slate-400">
                      A element higher in reactivity displaces lower elements from their salt solution (X + YZ → XZ + Y).
                    </p>
                  </div>
                  <button
                    onClick={startDisplacement}
                    disabled={isDisplacing}
                    className="bg-cyan-500 text-slate-950 px-5 py-2 rounded-xl font-bold text-xs hover:bg-cyan-400 disabled:opacity-50 transition"
                  >
                    {isDisplacing ? 'Reacting...' : '🧪 Submerge Metal / Add Halogen'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Selectors */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Elemental Reactant (Solid/Gas):</label>
                      <select
                        value={displaceSolid}
                        onChange={(e) => { setDisplaceSolid(e.target.value); playSound('tap'); }}
                        className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-100 p-2 rounded-lg"
                      >
                        <option value="zn">Zinc Strip (Zn)</option>
                        <option value="cu">Copper Strip (Cu)</option>
                        <option value="ag">Silver Wire (Ag)</option>
                        <option value="cl2">Chlorine Gas (Cl₂)</option>
                        <option value="br2">Bromine Water (Br₂)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Salt Solution in Beaker:</label>
                      <select
                        value={displaceSolution}
                        onChange={(e) => { setDisplaceSolution(e.target.value); playSound('tap'); }}
                        className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-100 p-2 rounded-lg"
                      >
                        <option value="cu">Copper(II) Sulfate (CuSO₄ - Blue)</option>
                        <option value="ag">Silver Nitrate (AgNO₃ - Colorless)</option>
                        <option value="zn">Zinc Sulfate (ZnSO₄ - Colorless)</option>
                        <option value="br2">Potassium Bromide (KBr - Colorless)</option>
                        <option value="i2">Potassium Iodide (KI - Colorless)</option>
                      </select>
                    </div>
                  </div>

                  {/* SVG Beaker Animation */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[220px]">
                    <svg width="220" height="180" viewBox="0 0 220 180" className="overflow-visible">
                      {/* Beaker Container */}
                      <rect x="40" y="40" width="140" height="120" rx="4" fill="none" stroke="#94a3b8" strokeWidth="4" />
                      
                      {/* Solution Fluid */}
                      <path
                        d="M 42 70 L 178 70 L 178 158 C 178 158 178 158 178 158 L 42 158 Z"
                        fill={
                          displaceSolution === 'cu'
                            ? `rgba(2, 132, 199, ${1 - (displacementProgress / 100) * 0.7})`
                            : displaceSolution === 'br2' && displacementProgress > 50
                            ? 'rgba(180, 83, 9, 0.6)'
                            : displaceSolution === 'i2' && displacementProgress > 50
                            ? 'rgba(168, 85, 247, 0.6)'
                            : 'rgba(226, 232, 240, 0.15)'
                        }
                        className="transition-colors duration-500"
                      />

                      {/* Submerged Metal Rod */}
                      <rect
                        x="95"
                        y="15"
                        width="30"
                        height="110"
                        fill={ELECTROCHEMICAL_SERIES.find(m => m.id === displaceSolid)?.color || '#94a3b8'}
                        stroke="#475569"
                        strokeWidth="2"
                        rx="2"
                      />

                      {/* Precipitate / Coating on Rod during progress */}
                      {displacementProgress > 20 && (
                        <rect
                          x="93"
                          y="70"
                          width="34"
                          height="55"
                          fill={ELECTROCHEMICAL_SERIES.find(m => m.id === displaceSolution)?.color || '#f97316'}
                          opacity={displacementProgress / 100}
                          rx="2"
                        />
                      )}
                    </svg>

                    <div className="text-xs font-mono text-center mt-2 text-slate-300">
                      Displacement Progress: {displacementProgress}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-LAB 3: FRACTIONAL OXIDATION & STRUCTURES */}
            {labSubTab === 'fractional' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Fractional Oxidation States & Molecular Structures</h3>
                    <p className="text-xs text-slate-400">
                      Fractional oxidation numbers are averages of distinct integer oxidation states of individual atoms.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {(['C3O2', 'Br3O8', 'S4O6', 'Fe3O4'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => { setSelectedMolecule(m); setHoveredAtomInfo(null); playSound('tap'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${selectedMolecule === m ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}
                      >
                        {m === 'S4O6' ? 'S₄O₆²⁻' : m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[250px] relative">
                  {/* Molecule 1: C3O2 */}
                  {selectedMolecule === 'C3O2' && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-xs text-slate-400">Carbon Suboxide (Average Carbon ON = +4/3)</div>
                      <svg width="450" height="100" viewBox="0 0 450 100">
                        {/* Bonds */}
                        <line x1="50" y1="46" x2="130" y2="46" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="50" y1="54" x2="130" y2="54" stroke="#cbd5e1" strokeWidth="4" />
                        
                        <line x1="130" y1="46" x2="225" y2="46" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="130" y1="54" x2="225" y2="54" stroke="#cbd5e1" strokeWidth="4" />

                        <line x1="225" y1="46" x2="320" y2="46" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="225" y1="54" x2="320" y2="54" stroke="#cbd5e1" strokeWidth="4" />

                        <line x1="320" y1="46" x2="400" y2="46" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="320" y1="54" x2="400" y2="54" stroke="#cbd5e1" strokeWidth="4" />

                        {/* Oxygen 1 */}
                        <circle cx="50" cy="50" r="24" fill="#ef4444" />
                        <text x="50" y="55" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">O (-2)</text>

                        {/* Carbon 1 */}
                        <circle cx="130" cy="50" r="26" fill="#38bdf8" className="cursor-pointer" onClick={() => { playSound('pop'); setHoveredAtomInfo('Terminal Carbon: Bonded to O (-2) and C (0) -> Oxidation State = +2'); }} />
                        <text x="130" y="55" fill="#0f172a" textAnchor="middle" fontSize="14" fontWeight="bold">C (+2)</text>

                        {/* Carbon 2 (Middle) */}
                        <circle cx="225" cy="50" r="26" fill="#fbbf24" className="cursor-pointer" onClick={() => { playSound('pop'); setHoveredAtomInfo('Middle Carbon: Bonded ONLY to two carbon atoms -> Oxidation State = 0'); }} />
                        <text x="225" y="55" fill="#0f172a" textAnchor="middle" fontSize="14" fontWeight="bold">C (0)</text>

                        {/* Carbon 3 */}
                        <circle cx="320" cy="50" r="26" fill="#38bdf8" className="cursor-pointer" onClick={() => { playSound('pop'); setHoveredAtomInfo('Terminal Carbon: Bonded to O (-2) and C (0) -> Oxidation State = +2'); }} />
                        <text x="320" y="55" fill="#0f172a" textAnchor="middle" fontSize="14" fontWeight="bold">C (+2)</text>

                        {/* Oxygen 2 */}
                        <circle cx="400" cy="50" r="24" fill="#ef4444" />
                        <text x="400" y="55" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">O (-2)</text>
                      </svg>
                    </div>
                  )}

                  {/* Molecule 2: Br3O8 */}
                  {selectedMolecule === 'Br3O8' && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-xs text-slate-400">Tribromooctaoxide (Average Bromine ON = +16/3)</div>
                      <div className="flex items-center gap-8 font-mono text-sm">
                        <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-xl text-center cursor-pointer" onClick={() => setHoveredAtomInfo('Terminal Br Atom: Bonded to 3 Oxygen atoms -> Oxidation State = +6')}>
                          <span className="text-amber-400 font-bold text-base block">Br (+6)</span>
                          <span className="text-[10px] text-slate-400">Terminal Bromine</span>
                        </div>
                        <div className="bg-slate-900 border border-cyan-500/40 p-3 rounded-xl text-center cursor-pointer" onClick={() => setHoveredAtomInfo('Middle Br Atom: Bonded to 2 Oxygen atoms -> Oxidation State = +4')}>
                          <span className="text-cyan-400 font-bold text-base block">Br (+4)</span>
                          <span className="text-[10px] text-slate-400">Central Bromine</span>
                        </div>
                        <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-xl text-center cursor-pointer" onClick={() => setHoveredAtomInfo('Terminal Br Atom: Bonded to 3 Oxygen atoms -> Oxidation State = +6')}>
                          <span className="text-amber-400 font-bold text-base block">Br (+6)</span>
                          <span className="text-[10px] text-slate-400">Terminal Bromine</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Molecule 3: S4O6 */}
                  {selectedMolecule === 'S4O6' && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-xs text-slate-400">Tetrathionate Ion S₄O₆²⁻ (Average Sulfur ON = +2.5)</div>
                      <div className="flex items-center gap-4 font-mono text-sm">
                        <div className="bg-slate-900 border border-emerald-500/40 p-2.5 rounded-lg text-center" onClick={() => setHoveredAtomInfo('Terminal Sulfur: Bonded to 3 Oxygen atoms -> Oxidation State = +5')}>
                          <span className="text-emerald-400 font-bold block">S (+5)</span>
                        </div>
                        <span className="text-slate-500">—</span>
                        <div className="bg-slate-900 border border-amber-500/40 p-2.5 rounded-lg text-center" onClick={() => setHoveredAtomInfo('Inner Sulfur: S-S single bond -> Oxidation State = 0')}>
                          <span className="text-amber-400 font-bold block">S (0)</span>
                        </div>
                        <span className="text-slate-500">—</span>
                        <div className="bg-slate-900 border border-amber-500/40 p-2.5 rounded-lg text-center" onClick={() => setHoveredAtomInfo('Inner Sulfur: S-S single bond -> Oxidation State = 0')}>
                          <span className="text-amber-400 font-bold block">S (0)</span>
                        </div>
                        <span className="text-slate-500">—</span>
                        <div className="bg-slate-900 border border-emerald-500/40 p-2.5 rounded-lg text-center" onClick={() => setHoveredAtomInfo('Terminal Sulfur: Bonded to 3 Oxygen atoms -> Oxidation State = +5')}>
                          <span className="text-emerald-400 font-bold block">S (+5)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Molecule 4: Fe3O4 */}
                  {selectedMolecule === 'Fe3O4' && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-xs text-slate-400">Magnetite Fe₃O₄ (Mixed Oxide: FeO · Fe₂O₃, Average ON = +8/3)</div>
                      <div className="flex items-center gap-6 font-mono text-xs">
                        <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-xl text-center">
                          <span className="text-amber-300 font-bold block text-sm">1 × Fe(II)</span>
                          <span className="text-[11px] text-slate-400">Fe⁺² in FeO</span>
                        </div>
                        <span className="text-slate-500 text-lg">+</span>
                        <div className="bg-slate-900 border border-cyan-500/40 p-3 rounded-xl text-center">
                          <span className="text-cyan-300 font-bold block text-sm">2 × Fe(III)</span>
                          <span className="text-[11px] text-slate-400">Fe⁺³ in Fe₂O₃</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Info Panel for Hover/Click */}
                  <div className="mt-4 p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-center text-cyan-300 min-h-[42px] flex items-center justify-center w-full max-w-lg">
                    {hoveredAtomInfo || 'Click on any atom above to inspect its exact oxidation state!'}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-LAB 4: TITRATION SIMULATOR */}
            {labSubTab === 'titration' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">KMnO₄ Permanganate Redox Titration</h3>
                    <p className="text-xs text-slate-400">
                      MnO₄⁻ acts as its own self-indicator. Endpoint is marked by a persistent light pink tint.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleTitrationDrop}
                      disabled={titrationDone}
                      className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-500 disabled:opacity-50 transition"
                    >
                      💧 Add 1.0 mL KMnO₄
                    </button>
                    <button
                      onClick={handleResetTitration}
                      className="bg-slate-800 text-slate-300 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-700"
                    >
                      🔄 Reset Flask
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Titration SVG Equipment */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[260px]">
                    <svg width="200" height="240" viewBox="0 0 200 240">
                      {/* Burette */}
                      <rect x="92" y="10" width="16" height="120" fill="none" stroke="#94a3b8" strokeWidth="2" />
                      {/* Burette Liquid */}
                      <rect x="94" y={12 + (titrationVolume / 25) * 60} width="12" height={116 - (titrationVolume / 25) * 60} fill="#c026d3" opacity="0.85" />

                      {/* Drop Animation */}
                      {titrationVolume > 0 && !titrationDone && (
                        <circle cx="100" cy="145" r="3" fill="#c026d3" className="animate-bounce" />
                      )}

                      {/* Conical Flask */}
                      <path d="M 85 150 L 115 150 L 155 220 C 155 220 155 225 150 225 L 50 225 C 45 225 45 220 45 220 Z" fill="none" stroke="#94a3b8" strokeWidth="3" />
                      
                      {/* Solution in Flask */}
                      <path
                        d="M 60 190 L 140 190 L 150 223 L 50 223 Z"
                        fill={titrationDone ? '#f472b6' : 'rgba(226, 232, 240, 0.2)'}
                        opacity={titrationDone ? 0.75 : 0.4}
                        className="transition-colors duration-500"
                      />
                    </svg>

                    <div className="text-xs font-mono text-slate-300 mt-2">
                      Burette Reading: <span className="text-purple-400 font-bold">{titrationVolume.toFixed(1)} mL</span> / 25.0 mL
                    </div>
                  </div>

                  {/* Reaction Equations & Titration Info */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
                    <h4 className="font-bold text-amber-400 border-b border-slate-800 pb-2">Ionic Half-Reactions</h4>
                    <div>
                      <span className="text-purple-400 font-semibold block">Oxidant (Burette):</span>
                      <code className="text-slate-300 block bg-slate-900 p-2 rounded mt-1 font-mono">
                        MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O
                      </code>
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold block">Reductant (Flask):</span>
                      <code className="text-slate-300 block bg-slate-900 p-2 rounded mt-1 font-mono">
                        Fe²⁺ → Fe³⁺ + e⁻
                      </code>
                    </div>
                    <div className="border-t border-slate-800 pt-2 text-[11px] text-slate-400">
                      <strong>Equivalence Point:</strong> 5 moles of Fe²⁺ react with 1 mole of MnO₄⁻.<br />
                      Status: {titrationDone ? (
                        <span className="text-pink-400 font-bold">Endpoint Reached (Permanent Pink Color)</span>
                      ) : (
                        <span className="text-slate-400">Titration in Progress...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ELECTROCHEMICAL SERIES REFERENCE */}
        {activeTab === 'series' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Standard Electrochemical Series (298 K, 1 M, 1 atm)</h2>
                <p className="text-xs text-slate-400">NCERT Table 7.1 — Standard Reduction Potentials E° (Volts)</p>
              </div>
              <span className="bg-cyan-950 text-cyan-400 font-mono text-xs px-3 py-1 rounded-lg border border-cyan-800">
                SHE Reference E°(H⁺/H₂) = 0.00 V
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-3">Oxidized Form / Reduced Form</th>
                    <th className="p-3">Half-Cell Reaction</th>
                    <th className="p-3">E° (Volts)</th>
                    <th className="p-3">Relative Power</th>
                    <th className="p-3">CBSE Node</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ELECTROCHEMICAL_SERIES.map((couple) => (
                    <tr key={couple.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-3 font-semibold text-slate-200">
                        {couple.symbol} ({couple.name})
                      </td>
                      <td className="p-3 font-mono text-cyan-300">
                        {couple.ion} + e⁻ → {couple.symbol}
                      </td>
                      <td className="p-3 font-mono font-bold">
                        <span className={couple.e0 < 0 ? 'text-amber-400' : couple.e0 === 0 ? 'text-cyan-400' : 'text-emerald-400'}>
                          {couple.e0 > 0 ? `+${couple.e0}` : couple.e0.toFixed(2)} V
                        </span>
                      </td>
                      <td className="p-3">
                        {couple.e0 <= -1.5 && <span className="text-amber-400 font-semibold">⚡ Strongest Reducing Agent</span>}
                        {couple.e0 > -1.5 && couple.e0 < 0 && <span className="text-yellow-400">Moderate Reducing Agent</span>}
                        {couple.e0 === 0 && <span className="text-cyan-400 font-bold">Standard Hydrogen Reference</span>}
                        {couple.e0 > 0 && couple.e0 < 1.5 && <span className="text-emerald-400">Moderate Oxidizing Agent</span>}
                        {couple.e0 >= 1.5 && <span className="text-purple-400 font-semibold">🔥 Strongest Oxidizing Agent</span>}
                      </td>
                      <td className="p-3 font-mono text-slate-500 text-[11px]">
                        {couple.nodeId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CBSE PRACTICE CHALLENGES (8 PROGRESSIVE TASKS) */}
        {activeTab === 'challenges' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-cyan-950 text-cyan-400 font-mono text-xs px-3 py-1 rounded-md border border-cyan-800">
                    Challenge {currentChallengeIdx + 1} / {CHALLENGES.length}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${currentChallenge.difficulty === 'Foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : currentChallenge.difficulty === 'Standard' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-purple-950 text-purple-400 border border-purple-800'}`}>
                    {currentChallenge.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setShowHint(!showHint); playSound('hint'); }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                  >
                    💡 Hint
                  </button>
                  <span className="text-xs text-slate-500 font-mono">Node: {currentChallenge.nodeId}</span>
                </div>
              </div>

              {/* Question Body */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-100 leading-relaxed">
                  {currentChallenge.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentChallenge.question}
                </p>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentChallenge.options.map((option, idx) => {
                    let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-950';
                    if (selectedOption === idx) {
                      borderClass = 'border-cyan-500 bg-cyan-950/40 text-cyan-200';
                    }
                    if (challengeSubmitted) {
                      if (idx === currentChallenge.correctIndex) {
                        borderClass = 'border-emerald-500 bg-emerald-950/50 text-emerald-200 font-bold';
                      } else if (selectedOption === idx) {
                        borderClass = 'border-red-500 bg-red-950/50 text-red-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border text-xs transition flex items-start gap-3 ${borderClass}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[11px] shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit / Next Button */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  {challengeSubmitted && (
                    <div className="text-xs text-slate-300 max-w-xl">
                      <strong className="text-cyan-400 block mb-1">CBSE Explanation:</strong>
                      {currentChallenge.explanation}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {!challengeSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="bg-cyan-500 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-cyan-400 disabled:opacity-40 transition"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      className="bg-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-400 transition"
                    >
                      Next Challenge →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BKT & SRS MASTERY TRACKER */}
        {activeTab === 'mastery' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Bayesian Knowledge Tracing (BKT) & Spaced Repetition (SRS)</h2>
              <p className="text-xs text-slate-400">
                Track your real-time probability of mastery p(L) across all 20 CBSE Redox Nodes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_NODES.map((nodeId) => {
                const bkt = bktStates[nodeId];
                const masteryPct = Math.round(masteryProb(bkt) * 100);
                const srs = srsItems[nodeId];

                return (
                  <div key={nodeId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-cyan-400 block font-bold">{nodeId}</span>
                      <span className="text-[11px] text-slate-400">
                        {SUBJECT_CONFIG.chemistry ? 'Redox Chemistry Node' : 'NCERT Redox Topic'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-400">{masteryPct}% p(L)</div>
                        <div className="text-[10px] text-slate-500">Repetitions: {srs.repetitions}</div>
                      </div>
                      <div className="w-12 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full" style={{ width: `${masteryPct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
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
      </main>

      {/* OVERLAY COMPONENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Excellent! Challenge Solved!" />
      {sparklePos && <SparkleBurst show={true} x={sparklePos.x} y={sparklePos.y} />}
    </div>
  );
}