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
const NODE_SOFT_HARD_WATER = "c9_chem_021";
const NODE_TYPES_CAUSES_HARDNESS = "c9_chem_022";
const NODE_REMOVAL_HARDNESS = "c9_chem_023";
const NODE_POTABLE_WATER = "c9_chem_024";
const NODE_DISCOVERY_NUCLEUS = "c9_chem_025";
const NODE_RUTHERFORD_MODEL = "c9_chem_026";
const NODE_BOHR_MODEL = "c9_chem_027";
const NODE_ELECTRON_DISTRIBUTION = "c9_chem_028";
const NODE_ISOTOPES = "c9_chem_029";
const NODE_IONIC_BONDING = "c9_chem_030";

const ALL_NODE_IDS = [
  NODE_SOFT_HARD_WATER,
  NODE_TYPES_CAUSES_HARDNESS,
  NODE_REMOVAL_HARDNESS,
  NODE_POTABLE_WATER,
  NODE_DISCOVERY_NUCLEUS,
  NODE_RUTHERFORD_MODEL,
  NODE_BOHR_MODEL,
  NODE_ELECTRON_DISTRIBUTION,
  NODE_ISOTOPES,
  NODE_IONIC_BONDING
] as const;

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface ComponentProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

type TabMode = 'discovery' | 'teach' | 'lab' | 'challenge' | 'summary';
type LabSubTab = 'water' | 'rutherford' | 'bohr' | 'isotopes' | 'ionic';

interface TeachingSlide {
  nodeId: string;
  title: string;
  subtitle: string;
  conceptText: string;
  keyTakeaway: string;
  visualType: 'water-test' | 'hardness-types' | 'softening-chem' | 'water-pipeline' | 'gold-foil' | 'rutherford-limit' | 'bohr-shells' | 'octet-rule' | 'isotope-isotopes' | 'electron-transfer';
}

interface Challenge {
  id: string;
  nodeId: typeof ALL_NODE_IDS[number];
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  misconceptionInfo?: string;
}

interface ElementInfo {
  symbol: string;
  name: string;
  z: number;
  a: number;
  shells: number[];
  valence: number;
  type: 'metal' | 'nonmetal' | 'noble';
}

// ==========================================
// ELEMENTAL DATA & DICTIONARIES
// ==========================================
const ELEMENT_DATA: Record<string, ElementInfo> = {
  H: { symbol: 'H', name: 'Hydrogen', z: 1, a: 1, shells: [1], valence: 1, type: 'nonmetal' },
  He: { symbol: 'He', name: 'Helium', z: 2, a: 4, shells: [2], valence: 2, type: 'noble' },
  C: { symbol: 'C', name: 'Carbon', z: 6, a: 12, shells: [2, 4], valence: 4, type: 'nonmetal' },
  N: { symbol: 'N', name: 'Nitrogen', z: 7, a: 14, shells: [2, 5], valence: 5, type: 'nonmetal' },
  O: { symbol: 'O', name: 'Oxygen', z: 8, a: 16, shells: [2, 6], valence: 6, type: 'nonmetal' },
  Na: { symbol: 'Na', name: 'Sodium', z: 11, a: 23, shells: [2, 8, 1], valence: 1, type: 'metal' },
  Mg: { symbol: 'Mg', name: 'Magnesium', z: 12, a: 24, shells: [2, 8, 2], valence: 2, type: 'metal' },
  Al: { symbol: 'Al', name: 'Aluminium', z: 13, a: 27, shells: [2, 8, 3], valence: 3, type: 'metal' },
  Cl: { symbol: 'Cl', name: 'Chlorine', z: 17, a: 35, shells: [2, 8, 7], valence: 7, type: 'nonmetal' },
  Ar: { symbol: 'Ar', name: 'Argon', z: 18, a: 40, shells: [2, 8, 8], valence: 8, type: 'noble' },
  K: { symbol: 'K', name: 'Potassium', z: 19, a: 39, shells: [2, 8, 8, 1], valence: 1, type: 'metal' },
  Ca: { symbol: 'Ca', name: 'Calcium', z: 20, a: 40, shells: [2, 8, 8, 2], valence: 2, type: 'metal' }
};

// ==========================================
// TEACHING SLIDES DATA
// ==========================================
const TEACHING_SLIDES: TeachingSlide[] = [
  {
    nodeId: NODE_SOFT_HARD_WATER,
    title: "1. Soft Water vs Hard Water",
    subtitle: "c9_chem_021: Action of Soap & Dissolved Ca²⁺/Mg²⁺ Ions",
    conceptText: "Soft water forms immediate rich lather with ordinary soap. Hard water contains dissolved Calcium (Ca²⁺) and Magnesium (Mg²⁺) salts that react with soap (sodium stearate) to form a sticky, curdy precipitate called scum (calcium/magnesium stearate). This wastes soap!",
    keyTakeaway: "Hard water does NOT lather easily; it wastes soap by forming scum.",
    visualType: 'water-test'
  },
  {
    nodeId: NODE_TYPES_CAUSES_HARDNESS,
    title: "2. Types and Causes of Hardness",
    subtitle: "c9_chem_022: Temporary vs Permanent Hardness",
    conceptText: "Temporary hardness is caused by dissolved Bicarbonates: Ca(HCO₃)₂ & Mg(HCO₃)₂. Permanent hardness is caused by dissolved Chlorides and Sulphates: CaCl₂, MgCl₂, CaSO₄, MgSO₄.",
    keyTakeaway: "Temporary = Bicarbonates (removed by boiling). Permanent = Chlorides & Sulphates (needs chemicals).",
    visualType: 'hardness-types'
  },
  {
    nodeId: NODE_REMOVAL_HARDNESS,
    title: "3. Chemical Removal of Hardness",
    subtitle: "c9_chem_023: Boiling & Washing Soda (Na₂CO₃)",
    conceptText: "Boiling decomposes soluble bicarbonates into insoluble carbonates: Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂↑. Permanent hardness requires Washing Soda (Na₂CO₃): CaSO₄ + Na₂CO₃ → CaCO₃↓ + Na₂SO₄.",
    keyTakeaway: "Precipitation of soluble Ca²⁺/Mg²⁺ into insoluble CaCO₃/MgCO₃ softens water.",
    visualType: 'softening-chem'
  },
  {
    nodeId: NODE_POTABLE_WATER,
    title: "4. Making Water Potable",
    subtitle: "c9_chem_024: Filtration, Alum Coagulation, Chlorination",
    conceptText: "Raw river/ground water undergoes 4 sequential steps: 1) Sedimentation & Coagulation (Alum causes fine clay to form heavy flocs), 2) Sand & Charcoal Filtration, 3) Chlorination (kills bacteria/germs), 4) Defluoridation (removes excess Fluoride).",
    keyTakeaway: "Filtration removes solids; Alum clumps fine dirt; Chlorine destroys biological pathogens.",
    visualType: 'water-pipeline'
  },
  {
    nodeId: NODE_DISCOVERY_NUCLEUS,
    title: "5. Discovery of the Nucleus",
    subtitle: "c9_chem_025: Rutherford's Gold Foil Experiment (1909)",
    conceptText: "Alpha particles (He²⁺) were fired at ultra-thin gold foil. Most passed straight through (atom is mostly empty space), some deflected at large angles, and 1 in 8,000 bounced straight back! This proved a tiny, extremely dense positive central core: the Nucleus.",
    keyTakeaway: "Atom is mostly empty space with a tiny, heavy, positively charged nucleus.",
    visualType: 'gold-foil'
  },
  {
    nodeId: NODE_RUTHERFORD_MODEL,
    title: "6. Rutherford's Model & Its Limitation",
    subtitle: "c9_chem_026: The Solar System Analogy & Energy Spiral",
    conceptText: "Rutherford proposed electrons orbit the nucleus like planets around the sun. Limitation: Classical electrodynamics dictates an accelerating orbiting electron must continuously radiate electromagnetic energy, lose speed, spiral inward, and collapse into the nucleus within 10⁻⁸ seconds!",
    keyTakeaway: "Rutherford could not explain atomic stability against continuous energy radiation.",
    visualType: 'rutherford-limit'
  },
  {
    nodeId: NODE_BOHR_MODEL,
    title: "7. Bohr's Model of the Atom",
    subtitle: "c9_chem_027: Quantised Stationary Orbits (K, L, M, N)",
    conceptText: "Niels Bohr resolved the paradox: Electrons move only in fixed, non-radiating 'stationary shells' (K, L, M, N). While in a stationary orbit, electrons radiate ZERO energy! Energy is absorbed or emitted only when an electron jumps between shells: ΔE = E₂ - E₁.",
    keyTakeaway: "Electrons do not radiate energy while moving within allowed stationary shells.",
    visualType: 'bohr-shells'
  },
  {
    nodeId: NODE_ELECTRON_DISTRIBUTION,
    title: "8. Electron Distribution & Octet Rule",
    subtitle: "c9_chem_028: 2n² Capacity & Octet Stability",
    conceptText: "Maximum shell capacity is 2n² (K=2, L=8, M=18, N=32). BUT the outermost shell of any atom cannot contain more than 8 electrons! Octet Rule: Atoms gain, lose, or share electrons to attain 8 valence electrons (or 2 for K shell duplet).",
    keyTakeaway: "Outer shell max = 8. Stable octet drives all chemical reactivity.",
    visualType: 'octet-rule'
  },
  {
    nodeId: NODE_ISOTOPES,
    title: "9. Isotopes & Atomic Mass",
    subtitle: "c9_chem_029: Same Atomic Number (Z), Different Mass Number (A)",
    conceptText: "Isotopes are atoms of the SAME element with identical proton count (Z) but different neutron counts (A). Example: Protium (¹H: 0n), Deuterium (²H: 1n), Tritium (³H: 2n). Fractional atomic masses (e.g. Cl = 35.5) represent weighted average abundances.",
    keyTakeaway: "Same chemical properties (identical electrons), different physical mass (different neutrons).",
    visualType: 'isotope-isotopes'
  },
  {
    nodeId: NODE_IONIC_BONDING,
    title: "10. Electrovalent (Ionic) Bonding",
    subtitle: "c9_chem_030: Complete Transfer of Valence Electrons",
    conceptText: "Electrovalent bonding occurs between a metal (low ionization energy) and a non-metal (high electron affinity). The metal atom COMPLETELY transfers valence electron(s) to become a Cation (+), while the non-metal gains them to become an Anion (-). Electrostatic attraction holds them together.",
    keyTakeaway: "Complete electron transfer from metal → non-metal forms strong ionic bonds (NaCl, MgCl₂).",
    visualType: 'electron-transfer'
  }
];

// ==========================================
// CHALLENGES DATA (Adaptive Question Bank)
// ==========================================
const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'c1',
    nodeId: NODE_SOFT_HARD_WATER,
    title: "Soap Action in Water",
    question: "A student rubs soap in a sample of borewell water and observes a sticky grey curd forming instead of lather. What is this curd and why did it form?",
    options: [
      "It is Scum (Calcium/Magnesium stearate) formed because Ca²⁺/Mg²⁺ ions reacted with soap.",
      "It is Mud particles settling at the bottom due to high density.",
      "It is Lather that has collapsed due to low water temperature.",
      "It is Sodium carbonate precipitating out of soft water."
    ],
    correctIndex: 0,
    explanation: "Dissolved Ca²⁺ and Mg²⁺ ions in hard water react with sodium stearate (soap) to produce insoluble calcium or magnesium stearate, known as scum.",
    hint: "Recall what calcium and magnesium ions produce when they attack soap molecules."
  },
  {
    id: 'c2',
    nodeId: NODE_TYPES_CAUSES_HARDNESS,
    title: "Identifying Hardness Types",
    question: "Water sample X leaves a heavy white crust inside a tea kettle after boiling. Water sample Y shows no white crust after boiling and STILL forms scum with soap. Identify the hardness in X and Y.",
    options: [
      "X has Temporary Hardness [Ca(HCO₃)₂]; Y has Permanent Hardness [MgSO₄/CaCl₂].",
      "X has Permanent Hardness; Y has Temporary Hardness.",
      "Both X and Y have Temporary Hardness.",
      "X is soft water; Y is polluted river water."
    ],
    correctIndex: 0,
    explanation: "Boiling decomposes soluble bicarbonates in X into insoluble CaCO₃ (kettle scale). Permanent hardness in Y (sulphates/chlorides) is unaffected by boiling.",
    hint: "Which type of hardness decomposes upon heating to form solid carbonate scale?"
  },
  {
    id: 'c3',
    nodeId: NODE_REMOVAL_HARDNESS,
    title: "Washing Soda Softening Reaction",
    question: "Which balanced equation correctly represents the chemical removal of permanent calcium sulphate hardness using Washing Soda?",
    options: [
      "CaSO₄ + Na₂CO₃ → CaCO₃↓ + Na₂SO₄",
      "Ca(HCO₃)₂ + Heat → CaCO₃↓ + H₂O + CO₂",
      "CaCl₂ + 2NaOH → Ca(OH)₂↓ + 2NaCl",
      "MgSO₄ + H₂O → Mg(OH)₂↓ + H₂SO₄"
    ],
    correctIndex: 0,
    explanation: "Washing soda (sodium carbonate, Na₂CO₃) reacts with CaSO₄ to precipitate insoluble calcium carbonate (CaCO₃) and leaves soluble sodium sulphate.",
    hint: "Washing soda is Na₂CO₃. Look for the double displacement yielding insoluble CaCO₃."
  },
  {
    id: 'c4',
    nodeId: NODE_POTABLE_WATER,
    title: "Water Purification Pipeline",
    question: "Why is Alum added to turbid raw river water during municipal water purification?",
    options: [
      "It acts as a coagulant, causing fine suspended clay particles to clump into heavy flocs that settle.",
      "It acts as a disinfectant to kill typhoid and cholera bacteria.",
      "It removes excess dissolved fluoride ions to prevent fluorosis.",
      "It neutralizes acid rain to adjust pH to 7.0."
    ],
    correctIndex: 0,
    explanation: "Alum (potassium aluminium sulphate) neutralizes electric charges on colloidal clay particles, causing coagulation into larger flocs that settle down.",
    hint: "Alum is a coagulant, whereas Chlorine is the disinfectant."
  },
  {
    id: 'c5',
    nodeId: NODE_DISCOVERY_NUCLEUS,
    title: "Rutherford's Alpha Experiment",
    question: "What specific observation in the gold foil experiment forced Rutherford to conclude that almost ALL the mass and positive charge of an atom is concentrated in a tiny nucleus?",
    options: [
      "Approximately 1 in 8,000 alpha particles bounced straight back (deflected by >90°).",
      "Most alpha particles passed straight through the foil without deflection.",
      "Alpha particles turned into neutral helium gas atoms upon impact.",
      "Electrons were knocked out of the gold foil creating cathode rays."
    ],
    correctIndex: 0,
    explanation: "Only a direct collision with a heavy, dense positive core could exert enough electrostatic repulsive force to rebound a fast-moving alpha particle backwards.",
    hint: "Think about what rare event Rutherford compared to firing a 15-inch shell at tissue paper and having it bounce back!"
  },
  {
    id: 'c6',
    nodeId: NODE_RUTHERFORD_MODEL,
    title: "Flaw in Rutherford's Atom",
    question: "According to classical electromagnetic theory, why was Rutherford's planetary model of the atom considered unstable?",
    options: [
      "Accelerating orbiting electrons should continuously radiate energy and spiral into the nucleus.",
      "Protons in the nucleus should repel each other and explode instantly.",
      "Electrons would collide with each other due to gravitational attraction.",
      "The nucleus would absorb all surrounding light rays and collapse."
    ],
    correctIndex: 0,
    explanation: "Classical physics dictates that any charged particle undergoing circular acceleration must continuously emit electromagnetic radiation, causing it to lose energy and spiral into the nucleus.",
    hint: "Focus on electron acceleration, continuous energy radiation, and the resulting spiral trajectory."
  },
  {
    id: 'c7',
    nodeId: NODE_BOHR_MODEL,
    title: "Bohr's Postulates",
    question: "How did Niels Bohr overcome the collapse paradox of Rutherford's atomic model?",
    options: [
      "He postulated that electrons orbit in quantised stationary shells where they do NOT radiate energy.",
      "He proposed that electrons carry positive charges inside the nucleus.",
      "He proved that electrons move at the speed of light so gravity holds them.",
      "He suggested that neutrons surround electrons to shield their energy."
    ],
    correctIndex: 0,
    explanation: "Bohr introduced non-radiating stationary energy levels (K, L, M, N). Energy is only exchanged when an electron undergoes a transition between shells.",
    hint: "What special property do Bohr's 'stationary states' possess regarding energy emission?"
  },
  {
    id: 'c8',
    nodeId: NODE_ELECTRON_DISTRIBUTION,
    title: "Applying 2n² and Octet Rules",
    question: "The element Potassium has atomic number Z = 19. What is its correct electronic configuration in ground state?",
    options: [
      "2, 8, 8, 1",
      "2, 8, 9",
      "2, 18, -1",
      "2, 8, 7, 2"
    ],
    correctIndex: 0,
    explanation: "Although the M shell can hold up to 18 electrons (2×3²), the outermost shell cannot exceed 8 electrons. Therefore, after 8 in M shell, the 19th electron enters the N shell: 2,8,8,1.",
    hint: "Remember the outer shell 8-electron limit rule before filling extra into the M shell."
  },
  {
    id: 'c9',
    nodeId: NODE_ISOTOPES,
    title: "Chlorine Fractional Atomic Mass",
    question: "Natural Chlorine exists as 75% ³⁵Cl (mass 35) and 25% ³⁷Cl (mass 37). What is the calculated relative atomic mass of chlorine?",
    options: [
      "35.5 u",
      "36.0 u",
      "35.0 u",
      "37.0 u"
    ],
    correctIndex: 0,
    explanation: "Weighted average = (35 × 0.75) + (37 × 0.25) = 26.25 + 9.25 = 35.5 u.",
    hint: "Multiply each mass by its percentage abundance and sum them up."
  },
  {
    id: 'c10',
    nodeId: NODE_IONIC_BONDING,
    title: "Formation of Magnesium Chloride",
    question: "Which statement accurately describes electron transfer in the formation of an electrovalent MgCl₂ bond?",
    options: [
      "One Mg atom (2,8,2) transfers 1 electron to EACH of two Cl atoms (2,8,7), forming Mg²⁺ and two Cl⁻ ions.",
      "Mg and Cl share two pairs of electrons equally to complete their octets.",
      "Two Mg atoms transfer 1 electron each to a single Cl atom to form Mg₂Cl.",
      "Cl transfers 1 electron to Mg so Mg reaches 2,8,3 configuration."
    ],
    correctIndex: 0,
    explanation: "Mg (2,8,2) loses 2 valence electrons to achieve neon configuration [2,8]²⁺. Each of the two Cl atoms (2,8,7) accepts 1 electron to achieve argon configuration [2,8,8]⁻.",
    hint: "Magnesium has 2 valence electrons to donate, but each chlorine can only accept 1 electron."
  }
];

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Boiling Removes All Types of Water Hardness Completely",
    description: "Students often believe that simply boiling water converts both temporary and permanent hard water into soft water. They view boiling as a universal solution for removing all dissolved salts from hard water.",
    correction: "Boiling only removes temporary hardness by decomposing soluble calcium and magnesium hydrogen carbonates into insoluble carbonates. Permanent hardness, caused by chlorides and sulfates of calcium and magnesium, remains unchanged upon boiling. Removing permanent hardness requires chemical treatment, such as adding washing soda or using ion-exchange resins.",
  },
  {
    id: "misc_2",
    title: "Scum is Dirt Removed From Clothes by Soap",
    description: "Students frequently confuse the insoluble white curdy precipitate (scum) formed in hard water with dirt being washed off clothes. They assume that a higher amount of scum indicates more effective cleaning by the soap.",
    correction: "Scum is not dirt; it is an insoluble substance formed when soap reacts with calcium and magnesium ions in hard water. This reaction wastes soap and prevents it from forming lather until all hardness ions are precipitated. Synthetic detergents avoid this issue because their calcium and magnesium salts are soluble in water.",
  },
  {
    id: "misc_3",
    title: "Boiler Scale Helps Insulate and Protect Water Pipes",
    description: "Students sometimes think that the thick mineral deposit (scale) inside heating kettles and industrial boilers forms a protective shield that strengthens the metal walls.",
    correction: "Boiler scale is composed of insoluble precipitates like calcium carbonate deposited when hard water is heated. Because scale is an extremely poor conductor of heat, it leads to severe energy loss and inefficient heating. Furthermore, localized overheating beneath the scale layer can cause metal boilers to crack or explode under high pressure.",
  },
  {
    id: "misc_4",
    title: "Ion Exchange Resins Filter Hardness Ions Out Mechanically",
    description: "Students often imagine that an ion-exchange resin column softens water by physically trapping hardness-causing minerals like a fine sieve or mesh filter.",
    correction: "Ion exchange is a chemical displacement process rather than physical filtration. Calcium and magnesium ions in the hard water chemically replace sodium or hydrogen ions present on the surface of the resin matrix. Once the resin becomes saturated with hardness ions, it must be regenerated using a concentrated sodium chloride solution.",
  },
  {
    id: "misc_5",
    title: "Soft Water Is Pure Water Free of All Minerals",
    description: "Students commonly equate soft water with distilled or pure water, believing that soft water contains no dissolved salts or chemical ions whatsoever.",
    correction: "Soft water is defined strictly by its ability to readily form lather with soap due to the absence of calcium and magnesium ions. It may still contain significant quantities of other soluble salts, such as sodium chloride or sodium bicarbonate. Therefore, softened water is chemically distinct from pure or distilled water.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C9_ChemistrySoftwaterandhardwaterSim({
  onComplete,
  initialNodeId = NODE_SOFT_HARD_WATER
}: ComponentProps) {
  // ----------------------------------------
  // STATE MANAGEMENT
  // ----------------------------------------
  const [activeTab, setActiveTab] = useState<TabMode>('discovery');
  const [labSubTab, setLabSubTab] = useState<LabSubTab>('water');

  // Slide state
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Discovery state
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);

  // Challenge State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparkleCoords, setSparkleCoords] = useState<{ x: number; y: number }>({ x: 300, y: 200 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Auto hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // SRS & BKT Tracker State
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    return initialMap;
  });

  // Interactive Lab Sandbox States
  // Lab 1: Water Hardness
  const [waterType, setWaterType] = useState<'soft' | 'temp_hard' | 'perm_hard'>('temp_hard');
  const [soapAdded, setSoapAdded] = useState<boolean>(false);
  const [isBoiled, setIsBoiled] = useState<boolean>(false);
  const [sodaAdded, setSodaAdded] = useState<boolean>(false);

  // Lab 2: Rutherford Scattering Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [alphaEnergy, setAlphaEnergy] = useState<number>(5);
  const [impactParam, setImpactParam] = useState<number>(10);
  const [modelType, setModelType] = useState<'rutherford' | 'thomson'>('rutherford');
  const [isFiringAlpha, setIsFiringAlpha] = useState<boolean>(false);
  const [alphaParticles, setAlphaParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; path: Array<{x: number, y: number}> }>>([]);

  // Lab 3: Bohr Atom Builder
  const [selectedElementKey, setSelectedElementKey] = useState<string>('Na');
  const [customShells, setCustomShells] = useState<number[]>([2, 8, 1]);

  // Lab 4: Isotopes Calculator
  const [selectedIsotopeGroup, setSelectedIsotopeGroup] = useState<'H' | 'C' | 'Cl'>('Cl');
  const [cl35Abundance, setCl35Abundance] = useState<number>(75);

  // Lab 5: Ionic Bonding Sandbox
  const [ionicPair, setIonicPair] = useState<'NaCl' | 'MgCl2' | 'CaO'>('NaCl');
  const [transferStep, setTransferStep] = useState<number>(0); // 0: initial neutral, 1: transfer, 2: ions formed

  // Reset activity timer for auto hint
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenge' && !isAnswerSubmitted) {
        audioManager.play('hint');
        setCurrentHintText(CHALLENGES_DATA[challengeIndex].hint);
        setShowHint(true);
      }
    }, 10000);
  }, [activeTab, challengeIndex, isAnswerSubmitted]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, challengeIndex, activeTab]);

  // Sync element data in Bohr Builder
  useEffect(() => {
    const el = ELEMENT_DATA[selectedElementKey];
    if (el) {
      setCustomShells([...el.shells]);
    }
  }, [selectedElementKey]);

  // ----------------------------------------
  // ANIMATION CANVAS FOR RUTHERFORD EXP
  // ----------------------------------------
  useEffect(() => {
    if (activeTab !== 'lab' || labSubTab !== 'rutherford') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const goldNucleus = { x: 300, y: 150, radius: 14, charge: 79 };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (modelType === 'thomson') {
        // Draw Thomson Plum Pudding Diffuse Sphere
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.beginPath();
        ctx.arc(300, 150, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#ef4444';
        ctx.font = '12px sans-serif';
        ctx.fillText("Diffuse Positive Cloud (+79e)", 230, 60);
      } else {
        // Draw Rutherford Dense Tiny Nucleus
        const grad = ctx.createRadialGradient(goldNucleus.x, goldNucleus.y, 2, goldNucleus.x, goldNucleus.y, 25);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(0.5, '#d97706');
        grad.addColorStop(1, 'rgba(217, 119, 6, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(goldNucleus.x, goldNucleus.y, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(goldNucleus.x, goldNucleus.y, goldNucleus.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("Au 79+", goldNucleus.x, goldNucleus.y + 3);

        ctx.fillStyle = '#f59e0b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("Dense Positive Nucleus", goldNucleus.x, goldNucleus.y + 40);
      }

      // Update & Draw Alpha Particles
      setAlphaParticles((prev) => {
        return prev.map((p) => {
          let { x, y, vx, vy, path } = p;
          const newPath = [...path, { x, y }];

          if (modelType === 'rutherford') {
            const dx = x - goldNucleus.x;
            const dy = y - goldNucleus.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist > 5) {
              // Electrostatic Coulomb Repulsion: F = k * Q1 * Q2 / r^2
              const force = (alphaEnergy * 1200) / distSq;
              const ax = (force * (dx / dist)) / 2;
              const ay = (force * (dy / dist)) / 2;
              vx += ax;
              vy += ay;
            }
          } else {
            // Thomson model: negligible deflection
            vx += (Math.random() - 0.5) * 0.02;
          }

          x += vx;
          y += vy;

          // Render trajectory path
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          if (newPath.length > 0) {
            ctx.moveTo(newPath[0].x, newPath[0].y);
            for (let i = 1; i < newPath.length; i++) {
              ctx.lineTo(newPath[i].x, newPath[i].y);
            }
          }
          ctx.stroke();

          // Render Alpha particle head (He²⁺)
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText("α²⁺", x, y + 3);

          return { x, y, vx, vy, path: newPath };
        }).filter((p) => p.x >= 0 && p.x <= canvas.width && p.y >= 0 && p.y <= canvas.height);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, labSubTab, modelType, alphaEnergy]);

  const fireAlphaParticle = useCallback(() => {
    audioManager.play('whoosh');
    const startY = 150 + (impactParam - 20) * 4;
    setAlphaParticles((prev) => [
      ...prev,
      { x: 20, y: startY, vx: alphaEnergy * 0.8, vy: 0, path: [] }
    ]);
  }, [impactParam, alphaEnergy]);

  // ----------------------------------------
  // HANDLERS & ACTIONS
  // ----------------------------------------
  const handleDiscoverySubmit = (choiceIndex: number) => {
    audioManager.play('tap');
    setDiscoveryChoice(choiceIndex);
    setDiscoveryAnswered(true);
    if (choiceIndex === 0) {
      audioManager.play('success');
      speechManager.speak("Spot on! Calcium and Magnesium ions in hard water react with soap to form insoluble scum.");
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite! Hard water contains dissolved Calcium and Magnesium salts that cause scum formation.");
    }
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    audioManager.play('tap');
    setSelectedOption(index);
    resetInactivityTimer();
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const currentQ = CHALLENGES_DATA[challengeIndex];
    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsAnswerSubmitted(true);

    // BKT and SRS updates
    const nodeId = currentQ.nodeId;
    const oldBkt = bktMap[nodeId] || createBKTState();
    const newBkt = bktUpdate(oldBkt, isCorrect);
        const _reviewItem = createReviewItem('C9_ChemistrySoftwate', 'Chemistry');
        sm2Update(_reviewItem, 4, 0);
    setBktMap((prev) => ({ ...prev, [nodeId]: newBkt }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setChallengeScore((prev) => prev + 10);
      setShowSparkle(true);
      setSparkleCoords({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      speechManager.speak("Excellent! That's chemically precise.");
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak(`Incorrect. ${currentQ.explanation}`);
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('swoop');
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);

    if (challengeIndex < CHALLENGES_DATA.length - 1) {
      setChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      speechManager.speak("Congratulations! You have mastered ICSE Class 9 Soft vs Hard Water, Atomic Structure, and Ionic Bonding!");
      
      const finalScore = challengeScore + 10;
      ALL_NODE_IDS.forEach((id) => {
        recordGameScore(Object.values(ALL_NODE_IDS), finalScore);
      });
      if (onComplete) onComplete(finalScore);
    }
  };

  // Calculated Isotope chlorine weighted mass
  const calculatedClMass = useMemo(() => {
    const cl37Ab = 100 - cl35Abundance;
    const avg = (35 * cl35Abundance + 37 * cl37Ab) / 100;
    return avg.toFixed(2);
  }, [cl35Abundance]);

  // Total BKT Mastery score across nodes
  const overallMasteryPercent = useMemo(() => {
    const sum = ALL_NODE_IDS.reduce((acc, id) => {
      return acc + (bktMap[id]?.pKnown || 0.1);
    }, 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* ========================================== */}
      {/* HEADER & NAVIGATION BAR                    */}
      {/* ========================================== */}
      <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-cyan-500/30">
            🧪
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 leading-tight">
              ICSE Class 9 Chemistry: Water, Atoms & Bonding
            </h1>
            <p className="text-xs text-cyan-400 font-medium">
              Interactive Simulation Engine • 10 Core Curriculum Nodes
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex items-center space-x-1 mt-2 sm:mt-0 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['discovery', 'teach', 'lab', 'challenge', 'summary'] as TabMode[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                audioManager.play('tap');
                setActiveTab(tab);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab === 'teach' ? 'Concept Slides' : tab === 'lab' ? 'Interactive Lab' : tab}
            </button>
          ))}
        </nav>

        {/* Mastery Indicator */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Mastery:</span>
          <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${overallMasteryPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-cyan-400">{overallMasteryPercent}%</span>
        </div>
      </header>

      {/* ========================================== */}
      {/* MAIN CONTENT AREA                          */}
      {/* ========================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col">
        {/* HINT BUBBLE & SPARKLES */}
        <HintBubble show={showHint} text={currentHintText} />
        <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />
        <Confetti show={showConfetti} />
        <SuccessBanner show={showSuccessBanner} text="Mastery Unlocked! Challenge Completed!" />

        {/* TAB 1: DISCOVERY MODE (Predict before learn) */}
        {activeTab === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full py-6"
          >
            <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
                Phase 1: Discovery Prediction
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-3">
                The Soap Mystery in Hard Water 🧼
              </h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Imagine you are in Jaipur, India. You rub a soap bar vigorously into borewell water. Instead of rich, fluffy soap bubbles (lather), you observe a sticky, white-grey curdy precipitate forming on top of the bucket. Why does this happen?
              </p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    label: "Dissolved Calcium & Magnesium ions react with soap to produce insoluble scum.",
                    isCorrect: true
                  },
                  {
                    label: "The water is contaminated with fine sand particles that soak up the soap.",
                    isCorrect: false
                  },
                  {
                    label: "The borewell water is too cold, preventing soap from dissolving.",
                    isCorrect: false
                  },
                  {
                    label: "Sodium ions in soap react with pure water to produce hydrogen gas bubbles.",
                    isCorrect: false
                  }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 border flex items-center justify-between ${
                      discoveryChoice === idx
                        ? item.isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                          : 'bg-rose-500/20 border-rose-500 text-rose-200'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {discoveryChoice === idx && (
                      <span className="text-lg">{item.isCorrect ? '✅' : '❌'}</span>
                    )}
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 text-xs text-slate-300 space-y-2"
                >
                  <p className="font-semibold text-cyan-400">
                    💡 Visual Chemistry Insight:
                  </p>
                  <p>
                    Ordinary soap is Sodium Stearate (C₁₇H₃₅COONa). In hard water, Ca²⁺ and Mg²⁺ ions immediately replace Na⁺ to form insoluble Calcium Stearate [(C₁₇H₃₅COO)₂Ca] — the curdy scum!
                  </p>
                  <button
                    onClick={() => {
                      audioManager.play('swoop');
                      setActiveTab('teach');
                    }}
                    className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-lg text-xs hover:brightness-110 shadow-lg shadow-cyan-500/20"
                  >
                    Start Concept Masterclass →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: TEACHING SLIDES */}
        {activeTab === 'teach' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col max-w-4xl mx-auto w-full space-y-4"
          >
            {/* Slide Header */}
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-cyan-400">
                Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex space-x-1">
                {TEACHING_SLIDES.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                      idx === currentSlideIndex ? 'bg-cyan-400 w-6' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Active Slide Body */}
            {(() => {
              const slide = TEACHING_SLIDES[currentSlideIndex];
              return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-6">
                  {/* Text Details */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 block mb-1">
                        Node ID: {slide.nodeId}
                      </span>
                      <h3 className="text-xl font-bold text-slate-100 mb-1">{slide.title}</h3>
                      <h4 className="text-xs font-medium text-cyan-400 mb-4">{slide.subtitle}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {slide.conceptText}
                      </p>
                    </div>

                    <div className="bg-cyan-950/40 border-l-4 border-cyan-500 p-3 rounded-r-lg text-xs text-cyan-200">
                      <span className="font-bold">Key ICSE Exam Takeaway: </span>
                      {slide.keyTakeaway}
                    </div>
                  </div>

                  {/* Interactive Visual Graphic for Slide */}
                  <div className="w-full md:w-80 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[220px]">
                    {slide.visualType === 'water-test' && (
                      <div className="flex justify-around w-full">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-28 bg-cyan-950/40 border border-cyan-500/30 rounded-b-xl relative overflow-hidden flex flex-col justify-end">
                            <div className="w-full h-16 bg-cyan-500/20" />
                            <div className="absolute top-2 left-1 right-1 h-6 bg-slate-300/80 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900 shadow">
                              LATHER 🧼
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-cyan-400 mt-2">Soft Water</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-28 bg-slate-900 border border-rose-500/30 rounded-b-xl relative overflow-hidden flex flex-col justify-end">
                            <div className="w-full h-16 bg-slate-800" />
                            <div className="absolute top-8 left-1 right-1 h-3 bg-slate-400 rounded text-[9px] font-bold text-slate-900 flex items-center justify-center">
                              SCUM ⚪
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-rose-400 mt-2">Hard Water</span>
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'hardness-types' && (
                      <div className="w-full space-y-3 text-[11px]">
                        <div className="p-2 bg-amber-950/30 border border-amber-500/30 rounded-lg">
                          <span className="font-bold text-amber-400">Temporary Hardness</span>
                          <p className="text-slate-300 text-[10px]">Ca(HCO₃)₂, Mg(HCO₃)₂</p>
                          <span className="text-[9px] text-amber-300">🔥 Removable by Boiling</span>
                        </div>
                        <div className="p-2 bg-rose-950/30 border border-rose-500/30 rounded-lg">
                          <span className="font-bold text-rose-400">Permanent Hardness</span>
                          <p className="text-slate-300 text-[10px]">CaCl₂, MgCl₂, CaSO₄, MgSO₄</p>
                          <span className="text-[9px] text-rose-300">🧪 Requires Washing Soda</span>
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'softening-chem' && (
                      <div className="w-full text-center space-y-2 text-xs">
                        <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/30 font-mono text-[10px] text-cyan-300">
                          Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂↑
                        </div>
                        <div className="p-2 bg-indigo-950/50 rounded-lg border border-indigo-500/30 font-mono text-[10px] text-indigo-300">
                          CaSO₄ + Na₂CO₃ → CaCO₃↓ + Na₂SO₄
                        </div>
                        <p className="text-[10px] text-slate-400">Soluble Ca²⁺ ions turn into insoluble CaCO₃ precipitate.</p>
                      </div>
                    )}

                    {slide.visualType === 'gold-foil' && (
                      <svg width="200" height="150" viewBox="0 0 200 150">
                        <circle cx="100" cy="75" r="12" fill="#f59e0b" />
                        <text x="100" y="78" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Au 79+</text>
                        {/* Rays */}
                        <line x1="10" y1="30" x2="190" y2="30" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="10" y1="75" x2="90" y2="75" stroke="#38bdf8" strokeWidth="2" />
                        <path d="M 90 75 L 20 120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
                        <line x1="10" y1="120" x2="190" y2="120" stroke="#38bdf8" strokeWidth="2" />
                      </svg>
                    )}

                    {slide.visualType === 'bohr-shells' && (
                      <svg width="180" height="180" viewBox="0 0 180 180">
                        <circle cx="90" cy="90" r="10" fill="#38bdf8" />
                        <circle cx="90" cy="90" r="30" fill="none" stroke="#64748b" strokeDasharray="3,3" />
                        <circle cx="90" cy="90" r="50" fill="none" stroke="#64748b" strokeDasharray="3,3" />
                        <circle cx="90" cy="90" r="70" fill="none" stroke="#64748b" strokeDasharray="3,3" />
                        <text x="90" y="93" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">Nucleus</text>
                        <text x="122" y="90" fill="#38bdf8" fontSize="9">K</text>
                        <text x="142" y="90" fill="#38bdf8" fontSize="9">L</text>
                        <text x="162" y="90" fill="#38bdf8" fontSize="9">M</text>
                      </svg>
                    )}

                    {slide.visualType === 'electron-transfer' && (
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center font-bold text-amber-300">
                          Na⁺
                        </div>
                        <span className="text-cyan-400 text-lg font-bold">e⁻ ➔</span>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center font-bold text-emerald-300">
                          Cl⁻
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Slide Navigation Controls */}
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentSlideIndex((prev) => prev - 1);
                }}
                className="px-4 py-2 bg-slate-800 disabled:opacity-40 rounded-lg text-xs font-bold hover:bg-slate-700"
              >
                ← Previous
              </button>

              {currentSlideIndex < TEACHING_SLIDES.length - 1 ? (
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setCurrentSlideIndex((prev) => prev + 1);
                  }}
                  className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-lg text-xs font-bold hover:brightness-110 shadow-lg shadow-cyan-500/20"
                >
                  Next Concept →
                </button>
              ) : (
                <button
                  onClick={() => {
                    audioManager.play('celebration');
                    setActiveTab('lab');
                  }}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg text-xs font-bold hover:brightness-110 shadow-lg shadow-emerald-500/20"
                >
                  Enter Hands-on Lab Sandbox 🧪
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: HANDS-ON INTERACTIVE LAB SANDBOX */}
        {activeTab === 'lab' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col space-y-4"
          >
            {/* Lab Sub-navigation */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
              {[
                { id: 'water', label: '💧 Water Hardness & Purification' },
                { id: 'rutherford', label: '⚛️ Rutherford Scattering' },
                { id: 'bohr', label: '🌀 Bohr Shell Builder' },
                { id: 'isotopes', label: '⚖️ Isotopes & Abundance' },
                { id: 'ionic', label: '⚡ Ionic Bonding Transfer' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    audioManager.play('tap');
                    setLabSubTab(sub.id as LabSubTab);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    labSubTab === sub.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* SUB-LAB 1: WATER HARDNESS & PURIFICATION */}
            {labSubTab === 'water' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Controls */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Water Setup & Reagents</h3>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-2">Select Initial Water Sample:</label>
                    <div className="space-y-2">
                      {[
                        { id: 'soft', label: 'Soft Rainwater (Pure)' },
                        { id: 'temp_hard', label: 'Temporary Hard Water [Ca(HCO₃)₂]' },
                        { id: 'perm_hard', label: 'Permanent Hard Water [CaSO₄ / MgCl₂]' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            audioManager.play('tap');
                            setWaterType(opt.id as any);
                            setSoapAdded(false);
                            setIsBoiled(false);
                            setSodaAdded(false);
                          }}
                          className={`w-full p-2.5 rounded-xl text-xs font-medium text-left border ${
                            waterType === opt.id
                              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        audioManager.play('pop');
                        setSoapAdded(true);
                      }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow"
                    >
                      🧼 Add Soap & Shake
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('swoop');
                        setIsBoiled(true);
                        speechManager.speak("Boiling decomposes soluble bicarbonates into insoluble calcium carbonate precipitate.");
                      }}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold shadow"
                    >
                      🔥 Heat / Boil Sample
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('sparkle');
                        setSodaAdded(true);
                        speechManager.speak("Washing soda converts soluble calcium ions into insoluble calcium carbonate.");
                      }}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold shadow"
                    >
                      🧪 Add Washing Soda (Na₂CO₃)
                    </button>
                  </div>
                </div>

                {/* Beaker Visualizer */}
                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-between min-h-[340px] relative">
                  <h4 className="text-xs font-bold text-slate-400 mb-2">Laboratory Reaction Beaker</h4>

                  <div className="w-48 h-64 border-b-4 border-x-4 border-slate-400 rounded-b-3xl relative bg-slate-950/80 overflow-hidden flex flex-col justify-end">
                    {/* Boiling Bubbles animation */}
                    {isBoiled && (
                      <div className="absolute inset-x-0 bottom-0 h-40 flex justify-around items-end">
                        <div className="w-2 h-2 bg-amber-400/80 rounded-full animate-bounce" />
                        <div className="w-3 h-3 bg-amber-400/80 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-amber-400/80 rounded-full animate-bounce" />
                      </div>
                    )}

                    {/* Water Fluid */}
                    <div className="w-full h-40 bg-cyan-500/20 relative">
                      {/* Precipitate Scale at bottom */}
                      {(isBoiled && waterType === 'temp_hard') || (sodaAdded && waterType !== 'soft') ? (
                        <div className="absolute bottom-0 inset-x-0 h-4 bg-slate-200 text-[8px] font-bold text-slate-900 flex items-center justify-center">
                          CaCO₃ Precipitate Scale ↓
                        </div>
                      ) : null}

                      {/* Scum vs Lather on Top */}
                      {soapAdded && (
                        <div className="absolute top-0 inset-x-0">
                          {waterType === 'soft' || (isBoiled && waterType === 'temp_hard') || sodaAdded ? (
                            <div className="h-8 bg-slate-100/90 rounded-b-lg flex items-center justify-center text-[10px] font-bold text-slate-900 shadow">
                              ✨ RICH LATHER 🧼
                            </div>
                          ) : (
                            <div className="h-4 bg-slate-400/90 flex items-center justify-center text-[9px] font-bold text-slate-900">
                              ⚪ CURDY SCUM (No Lather)
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chemical Explanation Banner */}
                  <div className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-cyan-400">Current Status: </span>
                    {waterType === 'soft' && "Soft water. Lathers immediately."}
                    {waterType === 'temp_hard' && (
                      isBoiled
                        ? "Boiling decomposed Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂. Water is now SOFT!"
                        : sodaAdded
                        ? "Washing soda precipitated Ca²⁺. Water softened."
                        : "Temporary hardness due to Ca(HCO₃)₂. Forms scum with soap."
                    )}
                    {waterType === 'perm_hard' && (
                      sodaAdded
                        ? "Washing soda precipitated CaSO₄ + Na₂CO₃ → CaCO₃↓ + Na₂SO₄. Water is SOFT!"
                        : isBoiled
                        ? "Boiling has NO effect on sulphates/chlorides! Still HARD."
                        : "Permanent hardness due to CaSO₄/MgCl₂."
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-LAB 2: RUTHERFORD SCATTERING */}
            {labSubTab === 'rutherford' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Rutherford Gun Controls</h3>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Atomic Model Theory:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          audioManager.play('tap');
                          setModelType('rutherford');
                        }}
                        className={`p-2 rounded-lg text-xs font-bold border ${
                          modelType === 'rutherford'
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Rutherford Nucleus
                      </button>
                      <button
                        onClick={() => {
                          audioManager.play('tap');
                          setModelType('thomson');
                        }}
                        className={`p-2 rounded-lg text-xs font-bold border ${
                          modelType === 'thomson'
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Thomson Plum Pudding
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-400">Impact Parameter (b):</span>
                      <span className="text-cyan-400">{impactParam} px</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="35"
                      value={impactParam}
                      onChange={(e) => setImpactParam(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-500">Low = Head-on collision (Rebound)</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-400">Alpha Velocity / Energy:</span>
                      <span className="text-cyan-400">{alphaEnergy} MeV</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={alphaEnergy}
                      onChange={(e) => setAlphaEnergy(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={fireAlphaParticle}
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
                  >
                    <span>🚀 Fire Alpha Particle (He²⁺)</span>
                  </button>
                </div>

                <div className="lg:col-span-2 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <h4 className="text-xs font-bold text-slate-400 mb-2">Alpha Particle Trajectory Canvas</h4>
                  <canvas
                    ref={canvasRef}
                    width={550}
                    height={300}
                    className="w-full max-w-[550px] bg-slate-950 rounded-xl border border-slate-800 cursor-crosshair"
                  />
                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Notice how particles passing far away travel straight, while head-on collisions repel sharply back!
                  </p>
                </div>
              </div>
            )}

            {/* SUB-LAB 3: BOHR ATOM BUILDER */}
            {labSubTab === 'bohr' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Select Element</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(ELEMENT_DATA).map((sym) => (
                      <button
                        key={sym}
                        onClick={() => {
                          audioManager.play('tap');
                          setSelectedElementKey(sym);
                        }}
                        className={`p-2 rounded-lg text-xs font-bold border ${
                          selectedElementKey === sym
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const el = ELEMENT_DATA[selectedElementKey];
                    return (
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Atomic Number (Z):</span>
                          <span className="font-bold text-cyan-400">{el.z}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mass Number (A):</span>
                          <span className="font-bold text-amber-400">{el.a}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Configuration:</span>
                          <span className="font-mono font-bold text-emerald-400">{el.shells.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Valence Electrons:</span>
                          <span className="font-bold text-purple-400">{el.valence}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                  <h4 className="text-xs font-bold text-slate-400 mb-4">
                    Bohr Orbit Shell Diagram (K, L, M, N)
                  </h4>

                  <svg width="280" height="280" viewBox="0 0 280 280">
                    {/* Nucleus */}
                    <circle cx="140" cy="140" r="18" fill="#f59e0b" />
                    <text x="140" y="144" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">
                      {selectedElementKey} ({ELEMENT_DATA[selectedElementKey].z}+)
                    </text>

                    {/* Concentric Shells */}
                    {customShells.map((count, sIdx) => {
                      const radius = 38 + sIdx * 28;
                      const shellNames = ['K', 'L', 'M', 'N'];
                      const angleStep = (2 * Math.PI) / count;

                      return (
                        <g key={sIdx}>
                          <circle cx="140" cy="140" r={radius} fill="none" stroke="#475569" strokeDasharray="4,4" strokeWidth="1.5" />
                          <text x={140 + radius + 4} y="143" fill="#38bdf8" fontSize="10" fontWeight="bold">
                            {shellNames[sIdx]} ({count})
                          </text>

                          {/* Orbiting Electrons */}
                          {Array.from({ length: count }).map((_, eIdx) => {
                            const angle = eIdx * angleStep;
                            const ex = 140 + radius * Math.cos(angle);
                            const ey = 140 + radius * Math.sin(angle);
                            return (
                              <circle key={eIdx} cx={ex} cy={ey} r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1" />
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            )}

            {/* SUB-LAB 4: ISOTOPES CALCULATOR */}
            {labSubTab === 'isotopes' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Select Isotope System</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'H', label: 'Hydrogen (Protium, Deuterium, Tritium)' },
                      { id: 'C', label: 'Carbon (C-12, C-13, C-14)' },
                      { id: 'Cl', label: 'Chlorine Weighted Average Mass' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          audioManager.play('tap');
                          setSelectedIsotopeGroup(opt.id as any);
                        }}
                        className={`w-full p-3 rounded-xl text-xs font-bold text-left border ${
                          selectedIsotopeGroup === opt.id
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {selectedIsotopeGroup === 'Cl' && (
                    <div className="pt-2 border-t border-slate-800">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Cl-35 Natural Abundance (%):
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={cl35Abundance}
                        onChange={(e) => setCl35Abundance(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-300 mt-1 font-mono">
                        <span>³⁵Cl: {cl35Abundance}%</span>
                        <span>³⁷Cl: {100 - cl35Abundance}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  {selectedIsotopeGroup === 'H' && (
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { symbol: '¹H', name: 'Protium', p: 1, n: 0, a: 1 },
                        { symbol: '²H (D)', name: 'Deuterium', p: 1, n: 1, a: 2 },
                        { symbol: '³H (T)', name: 'Tritium', p: 1, n: 2, a: 3 }
                      ].map((iso, i) => (
                        <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                          <span className="text-2xl font-bold text-cyan-400">{iso.symbol}</span>
                          <h5 className="text-xs font-bold text-slate-200">{iso.name}</h5>
                          <div className="text-[11px] text-slate-400 space-y-1">
                            <p>Protons (Z): <span className="text-emerald-400 font-bold">{iso.p}</span></p>
                            <p>Neutrons (N): <span className="text-amber-400 font-bold">{iso.n}</span></p>
                            <p>Mass No. (A): <span className="text-purple-400 font-bold">{iso.a}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedIsotopeGroup === 'Cl' && (
                    <div className="flex flex-col items-center justify-center space-y-4 my-auto">
                      <h4 className="text-sm font-bold text-slate-200">Weighted Average Atomic Mass Formula</h4>
                      <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 text-center font-mono text-sm text-cyan-300">
                        Average Mass = (35 × {cl35Abundance}%) + (37 × {100 - cl35Abundance}%) = <span className="text-amber-400 font-bold text-lg">{calculatedClMass} u</span>
                      </div>
                      <p className="text-xs text-slate-400 text-center max-w-md">
                        This is why Chlorine in the periodic table has a fractional atomic mass of 35.5 u!
                      </p>
                    </div>
                  )}

                  {selectedIsotopeGroup === 'C' && (
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { symbol: '¹²C', p: 6, n: 6, a: 12, use: 'Standard Atomic Mass Unit' },
                        { symbol: '¹³C', p: 6, n: 7, a: 13, use: 'NMR Spectroscopy' },
                        { symbol: '¹⁴C', p: 6, n: 8, a: 14, use: 'Archaeological Carbon Dating' }
                      ].map((iso, i) => (
                        <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                          <span className="text-2xl font-bold text-amber-400">{iso.symbol}</span>
                          <div className="text-[11px] text-slate-400 space-y-1">
                            <p>Protons: {iso.p}</p>
                            <p>Neutrons: {iso.n}</p>
                            <p className="text-[10px] text-cyan-400 font-semibold">{iso.use}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-LAB 5: IONIC BONDING */}
            {labSubTab === 'ionic' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Ionic Compound</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'NaCl', label: 'Sodium Chloride (NaCl)' },
                      { id: 'MgCl2', label: 'Magnesium Chloride (MgCl₂)' },
                      { id: 'CaO', label: 'Calcium Oxide (CaO)' }
                    ].map((pair) => (
                      <button
                        key={pair.id}
                        onClick={() => {
                          audioManager.play('tap');
                          setIonicPair(pair.id as any);
                          setTransferStep(0);
                        }}
                        className={`w-full p-3 rounded-xl text-xs font-bold text-left border ${
                          ionicPair === pair.id
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {pair.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      audioManager.play('sparkle');
                      setTransferStep((prev) => (prev + 1) % 3);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 rounded-xl text-xs shadow-lg shadow-cyan-500/20"
                  >
                    {transferStep === 0 && "Step 1: Transfer Valence Electron(s) →"}
                    {transferStep === 1 && "Step 2: Form Oppositely Charged Ions →"}
                    {transferStep === 2 && "🔄 Reset Electron Transfer"}
                  </button>
                </div>

                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                  {ionicPair === 'NaCl' && (
                    <div className="flex items-center space-x-8">
                      {/* Sodium Atom/Ion */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-500 ${
                          transferStep >= 1 ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-600 text-slate-300'
                        }`}>
                          {transferStep >= 1 ? 'Na⁺ (2,8)' : 'Na (2,8,1)'}
                        </div>
                        <span className="text-xs text-slate-400">Metal Donor</span>
                      </div>

                      {/* Transfer Arrow */}
                      <div className="flex flex-col items-center">
                        <span className="text-cyan-400 font-bold text-xs mb-1">
                          {transferStep === 1 ? '1 e⁻ transferred' : ''}
                        </span>
                        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 relative">
                          {transferStep === 1 && (
                            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-ping" />
                          )}
                        </div>
                      </div>

                      {/* Chlorine Atom/Ion */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-500 ${
                          transferStep >= 1 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-600 text-slate-300'
                        }`}>
                          {transferStep >= 1 ? 'Cl⁻ (2,8,8)' : 'Cl (2,8,7)'}
                        </div>
                        <span className="text-xs text-slate-400">Non-Metal Acceptor</span>
                      </div>
                    </div>
                  )}

                  {transferStep === 2 && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-6 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 text-center"
                    >
                      ⚡ Electrostatic attraction holds Na⁺ and Cl⁻ together in a stable ionic crystal lattice!
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: ADAPTIVE CHALLENGES */}
        {activeTab === 'challenge' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col max-w-3xl mx-auto w-full space-y-4"
          >
            {/* Challenge Progress Header */}
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400">
                Question {challengeIndex + 1} of {CHALLENGES_DATA.length}
              </span>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400">Score:</span>
                <span className="text-sm font-bold text-cyan-400">{challengeScore} pts</span>
              </div>
            </div>

            {/* Question Card */}
            {(() => {
              const q = CHALLENGES_DATA[challengeIndex];
              return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
                    Topic: {q.title} ({q.nodeId})
                  </span>

                  <h3 className="text-base font-bold text-slate-100 leading-snug">
                    {q.question}
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    {q.options.map((opt, oIdx) => {
                      let btnStyle = "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700";
                      if (selectedOption === oIdx) {
                        btnStyle = "bg-cyan-500/20 border-cyan-500 text-cyan-200 font-semibold";
                      }
                      if (isAnswerSubmitted) {
                        if (oIdx === q.correctIndex) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold";
                        } else if (selectedOption === oIdx) {
                          btnStyle = "bg-rose-500/20 border-rose-500 text-rose-200 font-semibold";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswerSubmitted}
                          onClick={() => handleOptionSelect(oIdx)}
                          className={`w-full p-3.5 rounded-xl text-xs text-left border transition-all duration-200 ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswerSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`p-4 rounded-xl text-xs space-y-1 ${
                        selectedOption === q.correctIndex
                          ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-950/40 border border-rose-500/30 text-rose-200'
                      }`}
                    >
                      <span className="font-bold block">
                        {selectedOption === q.correctIndex ? '✅ Correct Answer!' : '❌ Concept Review Needed:'}
                      </span>
                      <p>{q.explanation}</p>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => {
                        audioManager.play('hint');
                        setCurrentHintText(q.hint);
                        setShowHint((prev) => !prev);
                      }}
                      className="text-xs text-cyan-400 hover:underline font-semibold"
                    >
                      💡 Need a Hint?
                    </button>

                    {!isAnswerSubmitted ? (
                      <button
                        disabled={selectedOption === null}
                        onClick={handleAnswerSubmit}
                        className="px-5 py-2.5 bg-cyan-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs hover:brightness-110 shadow-lg shadow-cyan-500/20"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextChallenge}
                        className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:brightness-110 shadow-lg shadow-emerald-500/20"
                      >
                        {challengeIndex < CHALLENGES_DATA.length - 1 ? 'Next Challenge →' : 'View Final Mastery Summary 🎉'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* TAB 5: FINAL MASTERY & SRS SUMMARY */}
        {activeTab === 'summary' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 max-w-4xl mx-auto w-full space-y-6 py-4"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-3 shadow-2xl">
              <span className="text-4xl">🏆</span>
              <h2 className="text-xl font-bold text-slate-100">ICSE Chemistry Mastery Report</h2>
              <p className="text-xs text-slate-400">
                You have completed the interactive learning module for Soft/Hard Water, Rutherford/Bohr Atomic Models, and Electrovalent Bonding.
              </p>
              <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl font-bold text-cyan-400 text-sm">
                Overall Syllabus BKT Mastery: {overallMasteryPercent}%
              </div>
            </div>

            {/* Node-by-Node BKT Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Concept Knowledge State (BKT Breakdown)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const pVal = bktMap[nodeId]?.pKnown || 0.1;
                  const level = getMasteryLevel(pVal);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 block">{nodeId}</span>
                        <span className="text-[11px] font-medium text-slate-300 capitalize">{level} Mastery</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">{Math.round(pVal * 100)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab('lab');
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs"
              >
                Return to Lab Sandbox
              </button>
              <button
                onClick={() => {
                  audioManager.play('swoop');
                  setChallengeIndex(0);
                  setChallengeScore(0);
                  setActiveTab('challenge');
                }}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20"
              >
                Retake Adaptive Exam
              </button>
            </div>
          </motion.div>
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
      </main>
    </div>
  );
}