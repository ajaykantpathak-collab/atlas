'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
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
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// List of all node IDs required by the prompt
const NODE_IDS = [
  'c12_chem_cbse_301',
  'c12_chem_cbse_302',
  'c12_chem_cbse_303',
  'c12_chem_cbse_304',
  'c12_chem_cbse_305',
  'c12_chem_cbse_308',
  'c12_chem_cbse_309',
  'c12_chem_cbse_310',
  'c12_chem_cbse_311',
  'c12_chem_cbse_312',
  'c12_chem_cbse_313',
  'c12_chem_cbse_314',
  'c12_chem_cbse_315',
  'c12_chem_cbse_316',
  'c12_chem_cbse_317',
  'c12_chem_cbse_318',
  'c12_chem_cbse_323',
  'c12_chem_cbse_324',
  'c12_chem_cbse_326',
  'c12_chem_cbse_328',
  'c12_chem_cbse_329',
  'c12_chem_cbse_331',
  'c12_chem_cbse_332',
  'c12_chem_cbse_333',
  'c12_chem_cbse_335'
] as const;

type NodeId = (typeof NODE_IDS)[number];

// Challenge interface
interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  category: 'Foundation' | 'Standard' | 'Advanced';
}

// Initial challenges addressing key CBSE topics
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_301',
    nodeId: 'c12_chem_cbse_301',
    title: 'Carbohydrate Definition & Classification',
    question: 'Chemically, carbohydrates are defined as:',
    options: [
      'Hydrates of carbon with general formula Cx(H2O)y exclusively',
      'Optically active polyhydroxy aldehydes or polyhydroxy ketones (or substances yielding them on hydrolysis)',
      'Long-chain fatty acids attached to glycerol',
      'Polyhydroxy hydrocarbons lacking any carbonyl functional groups'
    ],
    correctIndex: 1,
    explanation: 'Carbohydrates are optically active polyhydroxy aldehydes or ketones, or compounds which produce such units on hydrolysis.',
    hint: 'Think about functional groups present (aldehyde/ketone + multiple OH groups) and optical activity.',
    category: 'Foundation'
  },
  {
    id: 'ch_305',
    nodeId: 'c12_chem_cbse_305',
    title: 'Chemical Evidence for Glucose Structure',
    question: 'Prolonged heating of D-Glucose with Red Phosphorus and HI yields:',
    options: ['Gluconic Acid', 'Saccharic Acid', 'n-Hexane', 'n-Hexanol'],
    correctIndex: 2,
    explanation: 'Heating glucose with HI for a long time gives n-hexane, proving that all six carbon atoms are linked in a straight chain.',
    hint: 'HI reduces all -OH and -CHO groups to hydrocarbon chains.',
    category: 'Standard'
  },
  {
    id: 'ch_310',
    nodeId: 'c12_chem_cbse_310',
    title: 'Sucrose Hydrolysis & Invert Sugar',
    question: 'Why is hydrolysed sucrose (+66.5°) called "Invert Sugar"?',
    options: [
      'Because glucose turns into fructose during heating',
      'Because the optical rotation changes from dextrorotatory (+66.5°) to laevorotatory (-39.9°)',
      'Because the C1 and C2 glycosidic linkage flips upside down',
      'Because sucrose converts into a non-reducing polysaccharide'
    ],
    correctIndex: 1,
    explanation: 'Sucrose is dextrorotatory (+66.5°). Hydrolysis gives D-(+)-glucose (+52.5°) and D-(-)-fructose (-92.4°). Net rotation becomes -39.9° (laevo), inverting the sign of rotation.',
    hint: 'Compare the specific rotation magnitude of fructose (-92.4°) versus glucose (+52.5°).',
    category: 'Standard'
  },
  {
    id: 'ch_314',
    nodeId: 'c12_chem_cbse_314',
    title: 'Structure of Starch: Amylose vs Amylopectin',
    question: 'Which statement correctly distinguishes Amylose from Amylopectin?',
    options: [
      'Amylose is branched with C1-C6 linkages; Amylopectin is unbranched',
      'Amylose is water-soluble (15-20%) with C1-C4 alpha-linkages; Amylopectin is insoluble (80-85%) with C1-C4 main chain and C1-C6 branching',
      'Amylose contains beta-D-glucose; Amylopectin contains alpha-D-glucose',
      'Amylose is found only in animals; Amylopectin is found in plants'
    ],
    correctIndex: 1,
    explanation: 'Starch consists of Amylose (15-20% water soluble, straight C1-C4 chain) and Amylopectin (80-85% insoluble, C1-C4 chain with C1-C6 branching every 20-25 glucose units).',
    hint: 'Amylose is linear; Amylopectin is branched at C1-C6.',
    category: 'Standard'
  },
  {
    id: 'ch_323',
    nodeId: 'c12_chem_cbse_323',
    title: 'Denaturation of Proteins',
    question: 'During thermal denaturation of a native protein (e.g. boiling an egg), which structure remains intact?',
    options: [
      'Primary Structure (amino acid sequence)',
      'Secondary Structure (alpha-helix / beta-sheet)',
      'Tertiary Structure (3D globular folding)',
      'Quaternary Structure (subunit aggregation)'
    ],
    correctIndex: 0,
    explanation: 'Denaturation disrupts hydrogen bonds, hydrophobic interactions, and tertiary/secondary structures, but covalent peptide bonds in the primary structure remain unbroken.',
    hint: 'Peptide bonds are strong covalent bonds that survive moderate heat and pH changes.',
    category: 'Foundation'
  },
  {
    id: 'ch_326',
    nodeId: 'c12_chem_cbse_326',
    title: 'Enzyme Action & Activation Energy',
    question: 'Enzymes accelerate biochemical reactions primarily by:',
    options: [
      'Increasing the overall enthalpy change (ΔH) of the reaction',
      'Lowering the activation energy required to reach the transition state',
      'Shifting the chemical equilibrium towards the products',
      'Increasing the temperature of the cell cytoplasm'
    ],
    correctIndex: 1,
    explanation: 'Enzymes lower the activation energy barrier without changing the equilibrium constant or overall ΔG.',
    hint: 'Think of lowering a mountain pass height so reactants cross faster.',
    category: 'Standard'
  },
  {
    id: 'ch_329',
    nodeId: 'c12_chem_cbse_329',
    title: 'Nucleotides & Phosphodiester Bonds',
    question: 'The backbone of a single strand of DNA/RNA consists of alternating sugar and phosphate units linked by:',
    options: [
      '1\'-5\' Glycosidic bonds',
      '3\'-5\' Phosphodiester linkages',
      'Disulphide bridges',
      'Hydrogen bonds between complementary bases'
    ],
    correctIndex: 1,
    explanation: 'Nucleotides join together through phosphodiester linkages between the 3\' carbon of one sugar and the 5\' carbon of the next.',
    hint: 'Focus on sugar carbon positions involved in forming nucleic acid chains.',
    category: 'Advanced'
  },
  {
    id: 'ch_335',
    nodeId: 'c12_chem_cbse_335',
    title: 'Nitrogenous Bases: Purines vs Pyrimidines',
    question: 'Which of the following pairs contains ONE Purine and ONE Pyrimidine found in RNA?',
    options: [
      'Adenine and Guanine',
      'Cytosine and Thymine',
      'Adenine and Uracil',
      'Thymine and Uracil'
    ],
    correctIndex: 2,
    explanation: 'Purines are double-ringed (Adenine, Guanine). Pyrimidines are single-ringed (Cytosine, Uracil in RNA, Thymine in DNA). Adenine (Purine) pairs with Uracil (Pyrimidine) in RNA.',
    hint: 'Adenine is a purine; Uracil is the pyrimidine unique to RNA.',
    category: 'Advanced'
  }
];

// Interactive Modules for teaching
interface SlideContent {
  id: string;
  title: string;
  nodes: NodeId[];
  summary: string;
  bulletPoints: string[];
  equation?: string;
  interactiveMode: 'fischer' | 'invert' | 'enzyme' | 'dna' | 'protein';
}

const LESSON_SLIDES: SlideContent[] = [
  {
    id: 'slide_1',
    title: '1. Monosaccharides: D-Glucose Structural Evidence',
    nodes: ['c12_chem_cbse_301', 'c12_chem_cbse_302', 'c12_chem_cbse_303', 'c12_chem_cbse_305'],
    summary: 'D-Glucose (C6H12O6) is an aldohexose. Elucidation of its straight-chain Fischer structure relied on 6 key chemical reactions.',
    bulletPoints: [
      'HI prolonged heating → n-Hexane (Straight chain of 6 carbons)',
      'NH2OH → Oxime & HCN → Cyanohydrin (Presence of Carbonyl group >C=O)',
      'Bromine water (Br2/H2O) → Gluconic Acid (Carbonyl is an Aldehyde -CHO)',
      'Acetic anhydride → Pentaacetate (Presence of 5 -OH groups on different carbons)',
      'Nitric acid (HNO3) → Saccharic Acid (Primary alcohol at C-6 is oxidized)'
    ],
    equation: 'C6H12O6 + Br2 + H2O → HOCH2-(CHOH)4-COOH + 2HBr',
    interactiveMode: 'fischer'
  },
  {
    id: 'slide_2',
    title: '2. Disaccharides & Invert Sugar',
    nodes: ['c12_chem_cbse_309', 'c12_chem_cbse_310', 'c12_chem_cbse_311', 'c12_chem_cbse_312'],
    summary: 'Disaccharides are formed by condensation of 2 monosaccharides with loss of H2O (Glycosidic Linkage).',
    bulletPoints: [
      'Sucrose: α-D-Glucose (C1) + β-D-Fructose (C2) [Non-reducing: both anomeric carbons bound]',
      'Invert Sugar: Sucrose (+66.5°) hydrolyses into D-(+)-glucose (+52.5°) and D-(-)-fructose (-92.4°). Net rotation = -39.9° (laevorotatory)',
      'Maltose: 2 × α-D-Glucose (1→4 linkage) [Reducing sugar: free C1 aldehyde on 2nd unit]',
      'Lactose: β-D-Galactose (C1) + β-D-Glucose (C4) [Reducing sugar, found in milk]'
    ],
    equation: 'Sucrose (Dextro +66.5°) + H2O → D-Glucose (+52.5°) + D-Fructose (-92.4°) [Net: -39.9°]',
    interactiveMode: 'invert'
  },
  {
    id: 'slide_3',
    title: '3. Polysaccharides: Starch, Cellulose & Glycogen',
    nodes: ['c12_chem_cbse_313', 'c12_chem_cbse_314', 'c12_chem_cbse_315', 'c12_chem_cbse_316', 'c12_chem_cbse_317', 'c12_chem_cbse_318'],
    summary: 'Polysaccharides are high molecular weight polymers of monosaccharides joined by glycosidic bonds.',
    bulletPoints: [
      'Amylose: 15–20% of starch, water-soluble, straight unbranched C1–C4 α-D-glucose polymer.',
      'Amylopectin: 80–85% of starch, insoluble, branched C1–C4 main chain with C1–C6 branches (every 20–25 units).',
      'Cellulose: Linear β-D-glucose polymer (C1–C4 β-linkages). Structural support in plant cell walls.',
      'Glycogen: "Animal starch" stored in liver/muscles; structurally like amylopectin but much more highly branched.'
    ],
    interactiveMode: 'protein'
  },
  {
    id: 'slide_4',
    title: '4. Proteins & Enzyme Kinetics',
    nodes: ['c12_chem_cbse_323', 'c12_chem_cbse_324', 'c12_chem_cbse_326'],
    summary: 'Proteins are polymers of α-amino acids linked by peptide bonds. Enzymes act as highly specific biological catalysts.',
    bulletPoints: [
      'Fibrous vs Globular: Keratin/Myosin (fibrous, insoluble, parallel chains) vs Insulin/Albumin (globular, soluble, folded spherical).',
      'Denaturation: Heat/pH changes disrupt 2° and 3° hydrogen bonding & folding. Primary structure stays intact! (e.g. egg white coagulation).',
      'Enzymes: Biological catalysts that dramatically lower Activation Energy (Ea) without shifting equilibrium.'
    ],
    interactiveMode: 'enzyme'
  },
  {
    id: 'slide_5',
    title: '5. Nucleic Acids: DNA, RNA & DNA Fingerprinting',
    nodes: ['c12_chem_cbse_328', 'c12_chem_cbse_329', 'c12_chem_cbse_331', 'c12_chem_cbse_332', 'c12_chem_cbse_333', 'c12_chem_cbse_335'],
    summary: 'Nucleic acids are biopolymers of nucleotides (Sugar + Nitrogenous Base + Phosphate group).',
    bulletPoints: [
      'DNA: Deoxyribose sugar + A, G, C, T. Double helix held by H-bonds (A=T with 2 H-bonds, G≡C with 3 H-bonds).',
      'RNA: Ribose sugar + A, G, C, U. Single-stranded (mRNA, tRNA, rRNA) for protein synthesis.',
      'Nucleoside = Base + Sugar (at C1\'); Nucleotide = Base + Sugar + Phosphate (at C5\').',
      'DNA Fingerprinting: Unique base repeats used in paternity tests, forensics, and evolutionary biology.'
    ],
    interactiveMode: 'dna'
  }
];

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 12 Biomolecules Lab',
  subtitle: 'Master Carbohydrates, Proteins, and Nucleic Acids',
  description: 'Step into a virtual biochemistry lab where you classify carbohydrates, build protein structures, and explore DNA double helix geometry.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Glucose-Fructose Puzzle',
  question: 'Glucose and fructose have the same molecular formula (C6H12O6) but different structures. Glucose is an aldohexose and fructose is a ketohexose. How can you distinguish them chemically?',
  options: [
    'They cannot be distinguished chemically',
    'Glucose gives a positive Tollen\'s test (silver mirror) and Fehling\'s test (red Cu2O ppt) because it has a free aldehyde group. Fructose also gives these tests due to tautomerization under basic conditions, but bromine water oxidizes only glucose (aldehyde) not fructose (ketone)',
    'Only fructose reacts with Tollen\'s reagent',
    'Glucose is sweet and fructose is not'
],
  correctIndex: 1,
  explanation: 'Both glucose (aldose) and fructose (ketose) reduce Tollen\'s and Fehling\'s solutions because fructose tautomerizes to glucose and mannose under basic conditions. However, bromine water selectively oxidizes aldehydes (glucose → gluconic acid) but not ketones (fructose unchanged), distinguishing them.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "carbohydrates",
    "name": "Carbohydrate Lab",
    "description": "Classify mono-, di-, and polysaccharides; test reducing sugars."
  },
  {
    "id": "proteins",
    "name": "Protein Structure Lab",
    "description": "Explore primary, secondary, tertiary, and quaternary protein structures."
  },
  {
    "id": "nucleic",
    "name": "Nucleic Acid Lab",
    "description": "Study DNA double helix, base pairing, and RNA types."
  },
  {
    "id": "vitamins",
    "name": "Vitamins & Enzymes Lab",
    "description": "Classify vitamins (fat/water soluble) and study enzyme kinetics."
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
    "title": "Fructose is a Non-Reducing Sugar Due to its Ketone Group",
    "description": "Students often believe that fructose is a non-reducing sugar because ketones typically do not reduce Fehling's or Tollens' reagents.",
    "correction": "Fructose is a reducing sugar despite containing a keto group at C-2. Under alkaline conditions (such as in Fehling's or Tollens' reagent), fructose undergoes keto-enol tautomerization to isomerize into aldoses like glucose and mannose, which easily reduce these reagents."
  },
  {
    "id": "misc_2",
    "title": "Protein Denaturation Involves Cleavage of Covalent Peptide Bonds",
    "description": "Students incorrectly assume that denaturation breaks down the primary structure of proteins by breaking peptide bonds and converting them into free amino acids.",
    "correction": "Denaturation disrupts only the secondary and tertiary structures of proteins by destabilizing hydrogen bonds, disulfide bridges, and hydrophobic interactions. The primary structure and its covalent peptide bonds remain completely intact during denaturation."
  },
  {
    "id": "misc_3",
    "title": "D and L Designations Indicate Dextrorotatory and Laevorotatory Rotation",
    "description": "Students equate the 'D' and 'L' prefixes in carbohydrate nomenclature with dextrorotatory (+) and laevorotatory (-) optical rotation.",
    "correction": "'D' and 'L' refer strictly to absolute spatial configuration relative to D-glyceraldehyde, determined by the position of the -OH group on the lowest chiral carbon in a Fischer projection. Optical rotation (+ or -) is an experimentally measured property independent of D/L configuration; for instance, D-fructose is laevorotatory, written as D-(-)-fructose."
  },
  {
    "id": "misc_4",
    "title": "Amino Acids Exist as Uncharged Neutral Molecules in Aqueous Solution",
    "description": "Students often draw and treat amino acids in aqueous solution as uncharged molecules containing free -COOH and -NH2 groups.",
    "correction": "In aqueous medium, the acidic -COOH group transfers a proton to the basic -NH2 group via an intramolecular acid-base reaction. This creates a dipolar, hybrid ion known as a zwitterion (H3N+-CHR-COO-), which explains why amino acids have high melting points and amphoteric behavior."
  },
  {
    "id": "misc_5",
    "title": "Sucrose is Reducing Because its Monosaccharide Component Units are Reducing",
    "description": "Students assume sucrose must be a reducing sugar simply because it is composed of glucose and fructose, both of which are reducing sugars.",
    "correction": "Sucrose is a non-reducing disaccharide because the glycosidic bond is formed between C-1 of α-D-glucose and C-2 of β-D-fructose. Since both carbonyl/reducing carbons (hemiacetal and hemiketal groups) are bonded together in the glycosidic link, no free aldehyde or ketone group is available to reduce Fehling's or Tollens' reagent."
  }
];


export default function C12_ChemistryBiomoleculesCBSESim() {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'learn' | 'workbench' | 'quiz'>('learn');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Challenge & SRS/BKT States
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);

  // BKT States map
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Partial<Record<NodeId, ReturnType<typeof createBKTState>>> = {};
    NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // SRS States map
  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((ch) => {
      initial[ch.id] = createReviewItem(ch.id, 'Chemistry');
    });
    return initial;
  });

  // Interactive Workbench Controls State
  // 1. Fischer Reaction Simulator
  const [glucoseReagent, setGlucoseReagent] = useState<'HI' | 'Br2' | 'HNO3' | 'Ac2O' | 'HCN'>('HI');
  
  // 2. Invert Sugar Calculator
  const [hydrolysisPercent, setHydrolysisPercent] = useState<number>(50); // 0% to 100%
  
  // 3. Protein/Enzyme Simulator
  const [temperature, setTemperature] = useState<number>(37); // °C
  const [phLevel, setPhLevel] = useState<number>(7.4);
  
  // 4. DNA strand assembly
  const [selectedBases, setSelectedBases] = useState<string[]>(['A', 'T', 'G', 'C']);

  // Canvas Reference for animated simulations
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio & Speech helper wraps
  const playSound = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // Audio fallback
    }
  }, []);

  const speakText = useCallback((text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Speech fallback
    }
  }, []);

  // Speak initial slide topic on mount/change
  useEffect(() => {
    if (activeTab === 'learn') {
      const slide = LESSON_SLIDES[currentSlideIndex];
      speakText(`${slide.title}. ${slide.summary}`);
    }
  }, [activeTab, currentSlideIndex, speakText]);

  // Render Canvas for Enzyme Activity & Denaturation / DNA Helix Visualizer
  useEffect(() => {
    if (activeTab !== 'workbench' && activeTab !== 'learn') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.04;

      const slideMode = LESSON_SLIDES[currentSlideIndex].interactiveMode;

      if (slideMode === 'enzyme' || activeTab === 'workbench') {
        // Draw Protein Folding / Enzyme Denaturation Canvas Simulation
        const isDenatured = temperature > 60 || phLevel < 3 || phLevel > 11;
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Enzyme Active Site / Globule
        ctx.lineWidth = 4;
        ctx.strokeStyle = isDenatured ? '#ef4444' : '#10b981';
        ctx.fillStyle = isDenatured ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.15)';

        ctx.beginPath();
        const nodes = 16;
        for (let i = 0; i <= nodes; i++) {
          const angle = (i / nodes) * Math.PI * 2;
          const noise = isDenatured 
            ? Math.sin(angle * 5 + time * 3) * 25 + Math.cos(angle * 3 + time * 2) * 15
            : Math.sin(angle * 3 + time) * 6;
          const r = (isDenatured ? 90 : 70) + noise;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Active site key lock indicator
        ctx.fillStyle = isDenatured ? '#f87171' : '#34d399';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          isDenatured ? 'STATUS: DENATURED (Inactive)' : 'STATUS: ACTIVE ENZYME (Native State)',
          0,
          130
        );

        // Substrate binding simulation
        if (!isDenatured) {
          const subX = Math.sin(time * 2) * 20;
          const subY = -20 + Math.cos(time * 2) * 10;
          ctx.beginPath();
          ctx.arc(subX, subY, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#6366f1';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px sans-serif';
          ctx.fillText('Substrate', subX, subY + 4);
        }

        ctx.restore();
      } else if (slideMode === 'dna') {
        // Draw Animated DNA Double Helix Canvas
        ctx.save();
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;

        ctx.lineWidth = 3;
        for (let y = 20; y < height - 20; y += 12) {
          const offset = Math.sin(y * 0.05 + time) * 60;
          const x1 = centerX + offset;
          const x2 = centerX - offset;

          // Strand 1 (Sugar-phosphate 1)
          ctx.beginPath();
          ctx.arc(x1, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6';
          ctx.fill();

          // Strand 2 (Sugar-phosphate 2)
          ctx.beginPath();
          ctx.arc(x2, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ec4899';
          ctx.fill();

          // Base Pair H-bond rungs
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = offset > 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(236, 72, 153, 0.4)';
          ctx.stroke();
        }
        ctx.restore();
      } else {
        // Default Sugar Ring Orbit animation
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = '#4f46e5';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Interactive Biomolecule Visualizer', 0, -80);

        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + time * 0.5;
          const x = Math.cos(angle) * 70;
          const y = Math.sin(angle) * 70;

          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#06b6d4' : '#8b5cf6';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px sans-serif';
          ctx.fillText(`C${i + 1}`, x, y + 3);
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeTab, currentSlideIndex, temperature, phLevel]);

  // Calculated Invert Sugar Rotation value
  const netRotation = useMemo(() => {
    // Sucrose initial = +66.5°
    // Hydrolysed: Glucose = +52.5°, Fructose = -92.4°
    // Average equimolar mixture = (+52.5 - 92.4) / 2 = -19.95° (Net -39.9° total inversion)
    const factor = hydrolysisPercent / 100;
    const initialRot = 66.5;
    const finalRot = -39.9;
    return (initialRot * (1 - factor) + finalRot * factor).toFixed(2);
  }, [hydrolysisPercent]);

  // Enzyme reaction rate calculation based on Temp & pH
  const enzymeRate = useMemo(() => {
    // Optimum Temp = 37°C, Optimum pH = 7.4
    const tempFactor = Math.max(0, 1 - Math.pow((temperature - 37) / 25, 2));
    const phFactor = Math.max(0, 1 - Math.pow((phLevel - 7.4) / 3.5, 2));
    return Math.round(tempFactor * phFactor * 100);
  }, [temperature, phLevel]);

  // Handle slide changing in Learn mode
  const handleNextSlide = () => {
    playSound('swoop');
    setCurrentSlideIndex((prev) => (prev + 1) % LESSON_SLIDES.length);
  };

  const handlePrevSlide = () => {
    playSound('swoop');
    setCurrentSlideIndex((prev) => (prev - 1 + LESSON_SLIDES.length) % LESSON_SLIDES.length);
  };

  // Handle Quiz answer submission
  const handleAnswerOption = (index: number) => {
    if (isSubmitted) return;
    playSound('tap');
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;

    const currentChallenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = selectedOption === currentChallenge.correctIndex;

    setIsSubmitted(true);

    // Update BKT & SRS States
    const targetNode = currentChallenge.nodeId;
    setBktStates((prev) => {
      const updated = bktUpdate(prev[targetNode], isCorrect);
      return { ...prev, [targetNode]: updated };
    });

    setSrsItems((prev) => {
      const updated = sm2Update(prev[currentChallenge.id], isCorrect ? 5 : 1, 0);
      return { ...prev, [currentChallenge.id]: updated };
    });

    if (isCorrect) {
      playSound('success');
      playSound('sparkle');
      setShowSparkle(true);
      setShowConfetti(true);
      setScore((prev) => prev + 10);
      speakText('Correct! Great chemical intuition.');
      setTimeout(() => setShowSparkle(false), 1500);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      playSound('error');
      speakText('Incorrect. Check the chemical explanation below.');
    }
  };

  const handleNextChallenge = () => {
    playSound('pop');
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges!
      playSound('celebration');
      setShowSuccessBanner(true);
      speakText('Congratulations! You completed all Biomolecules challenges.');
      recordGameScore([...NODE_IDS], score);
    }
  };

  // Render SVG Glucose Fischer Structure & Reaction Evidence
  const renderFischerReactionSVG = () => {
    let reactionLabel = '';
    let productProduct = '';

    switch (glucoseReagent) {
      case 'HI':
        reactionLabel = 'Prolonged Heating with Red P / HI';
        productProduct = 'CH3-CH2-CH2-CH2-CH2-CH3 (n-Hexane)';
        break;
      case 'Br2':
        reactionLabel = 'Oxidation with Mild Bromine Water (Br2/H2O)';
        productProduct = 'HOCH2-(CHOH)4-COOH (Gluconic Acid)';
        break;
      case 'HNO3':
        reactionLabel = 'Oxidation with Strong Nitric Acid (HNO3)';
        productProduct = 'HOOC-(CHOH)4-COOH (Saccharic Acid)';
        break;
      case 'Ac2O':
        reactionLabel = 'Acetylation with Acetic Anhydride ((CH3CO)2O)';
        productProduct = 'CH2(OCOCH3)-(CHOCOCH3)4-CHO (Pentaacetate)';
        break;
      case 'HCN':
        reactionLabel = 'Nucleophilic Addition with Hydrogen Cyanide (HCN)';
        productProduct = 'HOCH2-(CHOH)4-CH(OH)CN (Glucose Cyanohydrin)';
        break;
    }

    return (
      <div className="flex flex-col items-center bg-slate-900/80 p-5 rounded-2xl border border-indigo-500/30 text-white w-full">
        <h4 className="text-lg font-bold text-cyan-300 mb-3">
          D-Glucose Open-Chain Fischer Projection & Chemical Proof
        </h4>
        
        <div className="flex flex-wrap items-center justify-center gap-6 my-4">
          {/* Fischer Projection SVG */}
          <svg width="180" height="280" className="bg-slate-950 p-3 rounded-xl border border-slate-700">
            {/* Main vertical carbon backbone */}
            <line x1="90" y1="35" x2="90" y2="245" stroke="#64748b" strokeWidth="4" />
            
            {/* C1 Aldehyde */}
            <text x="90" y="30" fill="#f43f5e" fontSize="16" fontWeight="bold" textAnchor="middle">CHO (C1)</text>
            
            {/* C2 Horizontal */}
            <line x1="40" y1="75" x2="140" y2="75" stroke="#38bdf8" strokeWidth="3" />
            <text x="30" y="80" fill="#94a3b8" fontSize="13" textAnchor="end">H</text>
            <text x="150" y="80" fill="#38bdf8" fontSize="13">OH</text>
            <circle cx="90" cy="75" r="4" fill="#fbbf24" />

            {/* C3 Horizontal (OH on Left for D-Glucose!) */}
            <line x1="40" y1="115" x2="140" y2="115" stroke="#38bdf8" strokeWidth="3" />
            <text x="30" y="120" fill="#38bdf8" fontSize="13" textAnchor="end">HO</text>
            <text x="150" y="120" fill="#94a3b8" fontSize="13">H</text>
            <circle cx="90" cy="115" r="4" fill="#fbbf24" />

            {/* C4 Horizontal */}
            <line x1="40" y1="155" x2="140" y2="155" stroke="#38bdf8" strokeWidth="3" />
            <text x="30" y="160" fill="#94a3b8" fontSize="13" textAnchor="end">H</text>
            <text x="150" y="160" fill="#38bdf8" fontSize="13">OH</text>
            <circle cx="90" cy="155" r="4" fill="#fbbf24" />

            {/* C5 Horizontal */}
            <line x1="40" y1="195" x2="140" y2="195" stroke="#38bdf8" strokeWidth="3" />
            <text x="30" y="200" fill="#94a3b8" fontSize="13" textAnchor="end">H</text>
            <text x="150" y="200" fill="#38bdf8" fontSize="13">OH</text>
            <circle cx="90" cy="195" r="4" fill="#fbbf24" />

            {/* C6 Primary Alcohol */}
            <text x="90" y="260" fill="#818cf8" fontSize="15" fontWeight="bold" textAnchor="middle">CH₂OH (C6)</text>
          </svg>

          {/* Reaction arrow & Product SVG */}
          <div className="flex flex-col items-center justify-center max-w-xs text-center space-y-3">
            <div className="bg-indigo-950/80 px-4 py-2 rounded-lg border border-indigo-500/40">
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold block">Reagent</span>
              <span className="text-lg font-bold text-yellow-400">{glucoseReagent}</span>
            </div>
            
            <svg width="120" height="40" className="overflow-visible">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                </marker>
              </defs>
              <line x1="10" y1="20" x2="100" y2="20" stroke="#818cf8" strokeWidth="4" markerEnd="url(#arrow)" />
            </svg>

            <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/40 text-emerald-200">
              <p className="text-xs font-semibold text-emerald-400 mb-1">Reaction Result:</p>
              <p className="text-xs font-mono font-bold text-white">{reactionLabel}</p>
              <div className="mt-2 text-sm font-bold text-yellow-300 bg-slate-900/90 p-2 rounded border border-emerald-700/50">
                {productProduct}
              </div>
            </div>
          </div>
        </div>

        {/* Reagent Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {(['HI', 'Br2', 'HNO3', 'Ac2O', 'HCN'] as const).map((reagent) => (
            <button
              key={reagent}
              onClick={() => {
                playSound('tap');
                setGlucoseReagent(reagent);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                glucoseReagent === reagent
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              + {reagent}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render SVG Pyranose/Haworth & Base Pair Diagrams
  const renderHaworthDisaccharideSVG = () => {
    return (
      <svg width="340" height="180" viewBox="0 0 340 180" className="bg-slate-950 p-2 rounded-xl border border-indigo-900/60">
        <text x="170" y="20" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">
          α-1,4-Glycosidic Linkage in Maltose
        </text>
        
        {/* Ring 1 (α-D-Glucose Unit 1) */}
        <polygon points="40,80 80,60 120,80 120,110 80,130 40,110" fill="none" stroke="#38bdf8" strokeWidth="3" />
        <text x="80" y="95" fill="#38bdf8" fontSize="12" textAnchor="middle">Glucose 1</text>
        <text x="125" y="80" fill="#fbbf24" fontSize="11" fontWeight="bold">C1 (Anomeric)</text>

        {/* Glycosidic Bond bridging C1 and C4 */}
        <path d="M 120,95 Q 150,120 180,95" fill="none" stroke="#f43f5e" strokeWidth="4" strokeDasharray="4 2" />
        <text x="150" y="130" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
          α(1→4) Bond (-H₂O)
        </text>

        {/* Ring 2 (α-D-Glucose Unit 2) */}
        <polygon points="180,80 220,60 260,80 260,110 220,130 180,110" fill="none" stroke="#34d399" strokeWidth="3" />
        <text x="220" y="95" fill="#34d399" fontSize="12" textAnchor="middle">Glucose 2</text>
        <text x="175" y="80" fill="#fbbf24" fontSize="11" fontWeight="bold">C4</text>
        <text x="265" y="95" fill="#e879f9" fontSize="11" fontWeight="bold">Free C1 (-CHO)</text>

        <circle cx="260" cy="95" r="5" fill="#e879f9" />
        <text x="170" y="165" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Free hemiacetal C1 makes Maltose a REDUCING sugar!
        </text>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Top Banner Header */}
      <header className="max-w-6xl mx-auto bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                CBSE Class 12 Chemistry
              </span>
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                Chapter 10: Biomolecules
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-300">
              Biomolecules Interactive Lab
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Master carbohydrates, protein folding, enzyme kinetics, and DNA structures through visual manipulation and CBSE-standard problem solving.
            </p>
          </div>

          {/* Master Score & Progress Card */}
          <div className="flex items-center space-x-4 bg-slate-900/90 border border-slate-700/80 p-4 rounded-2xl shadow-inner">
            <div className="text-center">
              <span className="text-xs text-slate-400 block font-semibold">Mastery Score</span>
              <span className="text-2xl font-black text-cyan-400">{score} pts</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-center">
              <span className="text-xs text-slate-400 block font-semibold">Nodes Covered</span>
              <span className="text-lg font-bold text-emerald-400">25 / 25</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex space-x-2 mt-6 border-t border-slate-800 pt-4">
          <button
            onClick={() => {
              playSound('tap');
              setActiveTab('learn');
            }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'learn'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>📖</span>
            <span>Concept Lessons ({currentSlideIndex + 1}/5)</span>
          </button>

          <button
            onClick={() => {
              playSound('tap');
              setActiveTab('workbench');
            }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'workbench'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🧪</span>
            <span>Interactive Biomolecule Workbench</span>
          </button>

          <button
            onClick={() => {
              playSound('tap');
              setActiveTab('quiz');
            }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🎯</span>
            <span>CBSE Exam Challenges ({currentChallengeIndex + 1}/{CHALLENGES.length})</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Content Region */}
      <main className="max-w-6xl mx-auto">
        {/* TAB 1: CONCEPT LESSONS SLIDER */}
        {activeTab === 'learn' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left: Text & Explanation */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 bg-indigo-900/60 text-indigo-300 rounded-full border border-indigo-700/50">
                    Topic {currentSlideIndex + 1} of {LESSON_SLIDES.length}
                  </span>
                  <button
                    onClick={() => speakText(LESSON_SLIDES[currentSlideIndex].summary)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-cyan-400 transition-all text-xs flex items-center space-x-1"
                  >
                    <span>🔊 Speak Explanation</span>
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">
                  {LESSON_SLIDES[currentSlideIndex].title}
                </h2>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-850">
                  {LESSON_SLIDES[currentSlideIndex].summary}
                </p>

                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  Key CBSE Concepts & Reaction Rules:
                </h3>
                <ul className="space-y-2 mb-4">
                  {LESSON_SLIDES[currentSlideIndex].bulletPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-300 space-x-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {LESSON_SLIDES[currentSlideIndex].equation && (
                  <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-500/40 text-xs font-mono text-yellow-300 mt-2">
                    <span className="text-indigo-400 font-sans font-semibold block text-[10px] uppercase">
                      CBSE Equation:
                    </span>
                    {LESSON_SLIDES[currentSlideIndex].equation}
                  </div>
                )}
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-6">
                <button
                  onClick={handlePrevSlide}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
                >
                  ← Previous Concept
                </button>
                <div className="flex space-x-1.5">
                  {LESSON_SLIDES.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlideIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextSlide}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-cyan-600/30"
                >
                  Next Concept →
                </button>
              </div>
            </div>

            {/* Right: Topic-Specific Visualizer */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {currentSlideIndex === 0 && renderFischerReactionSVG()}
              {currentSlideIndex === 1 && (
                <div className="flex flex-col items-center justify-center space-y-4 bg-slate-900/80 p-5 rounded-3xl border border-slate-800">
                  {renderHaworthDisaccharideSVG()}
                </div>
              )}
              {currentSlideIndex >= 2 && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 flex flex-col items-center justify-center min-h-[300px]">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={260}
                    className="bg-slate-950 rounded-2xl border border-slate-800 shadow-inner"
                  />
                  <span className="text-xs text-slate-400 mt-2">
                    Real-time Canvas Engine Visualizer
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: INTERACTIVE WORKBENCH LAB */}
        {activeTab === 'workbench' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Workbench Section 1: Invert Sugar Optical Rotation Calculator */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-cyan-300 flex items-center space-x-2">
                    <span>🔄</span>
                    <span>Sucrose Hydrolysis & Invert Sugar Simulator</span>
                  </h3>
                  <span className="text-xs px-2.5 py-1 bg-cyan-950 border border-cyan-800 text-cyan-300 rounded-lg font-mono">
                    c12_chem_cbse_310
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Sucrose is dextrorotatory (+66.5°). Upon acid/enzyme hydrolysis, it splits into equimolar D-Glucose (+52.5°) and D-Fructose (-92.4°). Because laevorotation of fructose is greater than dextrorotation of glucose, the mixture becomes laevorotatory!
                </p>

                {/* Hydrolysis Slider */}
                <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-4">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400">Hydrolysis Progress:</span>
                    <span className="text-cyan-400 font-mono text-sm">{hydrolysisPercent}% Complete</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={hydrolysisPercent}
                    onChange={(e) => {
                      playSound('tap');
                      setHydrolysisPercent(Number(e.target.value));
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0% (Pure Sucrose)</span>
                    <span>50% Partial</span>
                    <span>100% (Invert Sugar)</span>
                  </div>
                </div>

                {/* Optical Polarimeter Display */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-900/60 text-center flex flex-col items-center">
                  <span className="text-xs text-slate-400 uppercase font-semibold mb-1">
                    Simulated Polarimeter Rotation [α]<sub>D</sub>
                  </span>
                  <div
                    className={`text-3xl font-black font-mono my-2 ${
                      Number(netRotation) > 0 ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {Number(netRotation) > 0 ? `+${netRotation}° (Dextro)` : `${netRotation}° (Laevo)`}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    {hydrolysisPercent === 100
                      ? 'Inversion complete! The sign of optical rotation has inverted from (+) to (-).'
                      : 'Drag slider to watch optical rotation invert during reaction.'}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>D-Glucose: +52.5°</span>
                <span>D-Fructose: -92.4°</span>
                <span>Equimolar Net: -39.9°</span>
              </div>
            </div>

            {/* Workbench Section 2: Enzyme Activity & Denaturation Visualizer */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-emerald-300 flex items-center space-x-2">
                    <span>🧪</span>
                    <span>Protein Denaturation & Enzyme Kinetics</span>
                  </h3>
                  <span className="text-xs px-2.5 py-1 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-lg font-mono">
                    c12_chem_cbse_323 / 326
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Enzymes require optimal temperature and pH. Extremes of heat or pH break secondary and tertiary hydrogen bonds, causing unfolding (denaturation) and loss of biological activity while primary structure remains intact.
                </p>

                {/* Control Sliders */}
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-4">
                  {/* Temperature Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold mb-1">
                      <span className="text-slate-400">Temperature (°C):</span>
                      <span className={`font-mono text-sm ${temperature > 55 ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                        {temperature}°C
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={temperature}
                      onChange={(e) => {
                        playSound('tap');
                        setTemperature(Number(e.target.value));
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                  </div>

                  {/* pH Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold mb-1">
                      <span className="text-slate-400">pH Level:</span>
                      <span className={`font-mono text-sm ${phLevel < 3 || phLevel > 11 ? 'text-rose-400 font-bold' : 'text-cyan-400'}`}>
                        pH {phLevel}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="14"
                      step="0.2"
                      value={phLevel}
                      onChange={(e) => {
                        playSound('tap');
                        setPhLevel(Number(e.target.value));
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </div>

                {/* Realtime Canvas output */}
                <div className="flex flex-col items-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <canvas ref={canvasRef} width={280} height={180} className="rounded-xl border border-slate-900" />
                  <div className="mt-2 text-xs font-bold text-center">
                    Enzyme Catalytic Efficiency Rate:{' '}
                    <span className={enzymeRate > 50 ? 'text-emerald-400 font-mono text-sm' : 'text-rose-400 font-mono text-sm'}>
                      {enzymeRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: CBSE ADAPTIVE EXAM CHALLENGES */}
        {activeTab === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative"
          >
            {/* Challenge Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-full border border-cyan-500/30">
                  Question {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className="px-2.5 py-0.5 bg-purple-950 text-purple-300 text-[11px] font-mono rounded border border-purple-800">
                  {CHALLENGES[currentChallengeIndex].nodeId}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg">
                Category: {CHALLENGES[currentChallengeIndex].category}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
              {CHALLENGES[currentChallengeIndex].question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {CHALLENGES[currentChallengeIndex].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === CHALLENGES[currentChallengeIndex].correctIndex;

                let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

                if (isSubmitted) {
                  if (isCorrectOption) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold shadow-lg shadow-emerald-950/50';
                  } else if (isSelected && !isCorrectOption) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-950/50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerOption(idx)}
                    disabled={isSubmitted}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold font-mono">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {isSubmitted && isCorrectOption && (
                      <span className="text-emerald-400 font-bold text-base">✓</span>
                    )}
                    {isSubmitted && isSelected && !isCorrectOption && (
                      <span className="text-rose-400 font-bold text-base">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint & Explanation Section */}
            <div className="flex flex-col space-y-3">
              {!isSubmitted && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      playSound('hint');
                      setShowHint(!showHint);
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-all flex items-center space-x-1"
                  >
                    <span>💡</span>
                    <span>{showHint ? 'Hide CBSE Hint' : 'Need a Hint?'}</span>
                  </button>

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg ${
                      selectedOption !== null
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30 hover:scale-105'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                </div>
              )}

      <HintBubble
                show={showHint && !isSubmitted}
                text={CHALLENGES[currentChallengeIndex].hint}
              />

              {isSubmitted && (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                      selectedOption === CHALLENGES[currentChallengeIndex].correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <span className="font-bold uppercase tracking-wider block mb-1">
                      {selectedOption === CHALLENGES[currentChallengeIndex].correctIndex
                        ? '✓ CBSE Explanation'
                        : '✕ Chemical Solution'}
                    </span>
                    {CHALLENGES[currentChallengeIndex].explanation}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-cyan-600/30 flex items-center space-x-2"
                    >
                      <span>
                        {currentChallengeIndex < CHALLENGES.length - 1
                          ? 'Next Question →'
                          : 'Complete Practice'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>

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

      {/* Visual Feedback FX Components */}
      <SparkleBurst show={showSparkle} x={600} y={300} />
      <Confetti show={showConfetti} />
      <SuccessBanner
        show={showSuccessBanner}
        text="All Biomolecules CBSE Nodes Mastered Successfully!"
      />
    </div>
  );
}