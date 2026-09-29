'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';

// --- ALL REQUIRED CBSE NODE IDS AS STRING LITERALS ---
const NODE_IDS = {
  c11_chem_cbse_003: 'c11_chem_cbse_003', // Tetravalence of Carbon
  c11_chem_cbse_004: 'c11_chem_cbse_004', // Hybridization and Shapes
  c11_chem_cbse_005: 'c11_chem_cbse_005', // Structural Representations
  c11_chem_cbse_007: 'c11_chem_cbse_007', // IUPAC Nomenclature of Alkanes
  c11_chem_cbse_008: 'c11_chem_cbse_008', // Functional Group & Homologous Series
  c11_chem_cbse_009: 'c11_chem_cbse_009', // Nomenclature of Alkenes and Alkynes
  c11_chem_cbse_010: 'c11_chem_cbse_010', // IUPAC Nomenclature with Functional Groups
  c11_chem_cbse_011: 'c11_chem_cbse_011', // Nomenclature of Benzene & Substituted Benzenes
  c11_chem_cbse_012: 'c11_chem_cbse_012', // Alkyl Groups and Nomenclature
  c11_chem_cbse_013: 'c11_chem_cbse_013', // Nomenclature of Substituted Benzene Compounds
  c11_chem_cbse_021: 'c11_chem_cbse_021', // Positive and Negative Resonance Effect
  c11_chem_cbse_023: 'c11_chem_cbse_023', // Electromeric Effect
  c11_chem_cbse_024: 'c11_chem_cbse_024', // Sublimation
  c11_chem_cbse_025: 'c11_chem_cbse_025', // Crystallization
  c11_chem_cbse_026: 'c11_chem_cbse_026', // Simple and Fractional Distillation
  c11_chem_cbse_027: 'c11_chem_cbse_027', // Distillation Under Reduced Pressure
  c11_chem_cbse_028: 'c11_chem_cbse_028', // Steam Distillation
  c11_chem_cbse_029: 'c11_chem_cbse_029', // Differential Extraction
  c11_chem_cbse_030: 'c11_chem_cbse_030', // Chromatography
};

// Types
type TabType = 'hybridization' | 'representations' | 'iupac' | 'electronic' | 'purification' | 'challenge';

interface ChallengeQuestion {
  id: string;
  nodeId: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const QUESTION_BANK: ChallengeQuestion[] = [
  {
    id: 'q1',
    nodeId: NODE_IDS.c11_chem_cbse_003,
    title: 'Tetravalence & Catenation',
    difficulty: 'easy',
    question: 'Carbon forms four covalent bonds due to its tetravalency. Which property allows carbon atoms to link with one another to form long chains and rings?',
    options: ['Electronegativity', 'Catenation', 'Isomerism', 'Resonance'],
    correctIndex: 1,
    explanation: 'Catenation is the self-linking property of carbon atoms through covalent bonds to form straight chains, branched chains, or cyclic rings.',
    hint: 'Think of self-linking ability of carbon atoms.',
  },
  {
    id: 'q2',
    nodeId: NODE_IDS.c11_chem_cbse_004,
    title: 'Hybridization State',
    difficulty: 'medium',
    question: 'What is the hybridization and bond angle around each carbon atom in Ethyne (H-C≡C-H)?',
    options: ['sp3, 109.5°', 'sp2, 120°', 'sp, 180°', 'sp3d, 90°'],
    correctIndex: 2,
    explanation: 'In ethyne, each carbon forms one sigma bond with H and one sigma bond with C, utilizing sp hybrid orbitals with a linear geometry (180°).',
    hint: 'Triple bonded carbons have 2 sigma bonds and 2 pi bonds.',
  },
  {
    id: 'q3',
    nodeId: NODE_IDS.c11_chem_cbse_005,
    title: 'Structural Representations',
    difficulty: 'easy',
    question: 'In a bond-line (skeletal) formula, what represents the carbon atoms and attached hydrogen atoms?',
    options: ['Explicit C and H letters', 'Line intersections and line ends implicitly', 'Dotted circles', 'Square boxes'],
    correctIndex: 1,
    explanation: 'In bond-line formulas, carbon atoms are implied at line intersections and ends, with hydrogen atoms omitted to achieve clarity.',
    hint: 'Look at the vertices and free ends of line structures.',
  },
  {
    id: 'q4',
    nodeId: NODE_IDS.c11_chem_cbse_007,
    title: 'IUPAC Alkane Rules',
    difficulty: 'medium',
    question: 'What is the correct IUPAC name for CH3-CH(CH3)-CH2-CH3?',
    options: ['2-Methylbutane', '3-Methylbutane', 'Isopentane', '1,1-Dimethylpropane'],
    correctIndex: 0,
    explanation: 'The longest carbon chain has 4 carbons (butane). Numbering from the left gives the methyl group the lowest locant (2). So it is 2-methylbutane.',
    hint: 'Number the 4-carbon chain from the end closer to the branch.',
  },
  {
    id: 'q5',
    nodeId: NODE_IDS.c11_chem_cbse_008,
    title: 'Homologous Series',
    difficulty: 'medium',
    question: 'Successive members of a homologous series differ from each other by which structural unit and molecular mass?',
    options: ['-CH3 unit, 15 u', '-CH2- unit, 14 u', '-CH- unit, 13 u', '-C2H4- unit, 28 u'],
    correctIndex: 1,
    explanation: 'Adjacent members of a homologous series differ by a -CH2- unit, corresponding to a mass difference of 14 atomic mass units (u).',
    hint: 'Carbon has atomic mass 12 u and Hydrogen has 1 u.',
  },
  {
    id: 'q6',
    nodeId: NODE_IDS.c11_chem_cbse_009,
    title: 'Alkenes & Alkynes',
    difficulty: 'medium',
    question: 'What is the systematic IUPAC name for CH2=CH-CH2-C≡CH?',
    options: ['Pent-1-en-4-yne', 'Pent-4-en-1-yne', 'Pent-1-yn-4-ene', 'Pent-2-en-4-yne'],
    correctIndex: 0,
    explanation: 'The chain is numbered from the double bond end to give double and triple bonds the lowest locants (1 and 4). Suffix order is "-en-yne", giving Pent-1-en-4-yne.',
    hint: 'When numbering gives same set of locants, double bond gets lower locant preference over triple bond.',
  },
  {
    id: 'q7',
    nodeId: NODE_IDS.c11_chem_cbse_010,
    title: 'Functional Group Priority',
    difficulty: 'hard',
    question: 'Which functional group has the HIGHEST priority when selecting the principal functional group for IUPAC suffix naming?',
    options: ['-OH (Alcohol)', '-CHO (Aldehyde)', '-COOH (Carboxylic Acid)', '>C=O (Ketone)'],
    correctIndex: 2,
    explanation: '-COOH (Carboxylic acid) has the highest priority among these options, followed by -CHO, >C=O, and -OH.',
    hint: 'Carboxylic acids reign supreme at the top of IUPAC priority order.',
  },
  {
    id: 'q8',
    nodeId: NODE_IDS.c11_chem_cbse_011,
    title: 'Disubstituted Benzenes',
    difficulty: 'medium',
    question: '1,3-Dimethylbenzene is commonly known by which trivial name?',
    options: ['o-Xylene', 'm-Xylene', 'p-Xylene', 'Toluene'],
    correctIndex: 1,
    explanation: 'Positions 1,3 on a benzene ring represent the meta- position. Thus, 1,3-dimethylbenzene is m-xylene.',
    hint: '1,2 is ortho, 1,3 is meta, 1,4 is para.',
  },
  {
    id: 'q9',
    nodeId: NODE_IDS.c11_chem_cbse_012,
    title: 'Alkyl Group Prefix Rules',
    difficulty: 'easy',
    question: 'Which alkyl group prefix is taken into account when arranging substituent names in alphabetical order?',
    options: ['sec-', 'tert-', 'iso', 'hyphenated prefixes like p-'],
    correctIndex: 2,
    explanation: 'The prefixes "iso" and "neo" are considered part of the fundamental alkyl group name for alphabetical sorting, unlike "sec-" and "tert-".',
    hint: 'Iso and Neo are written without hyphens as part of the group name.',
  },
  {
    id: 'q10',
    nodeId: NODE_IDS.c11_chem_cbse_013,
    title: 'Substituted Benzene Locants',
    difficulty: 'hard',
    question: 'When naming 1-chloro-2,4-dinitrobenzene, why is chlorine assigned position 1?',
    options: ['It gives the lowest set of locants (1, 2, 4)', 'Chlorine has higher atomic weight', 'Nitro is a principal functional group', 'Alphabetic priority requires C first'],
    correctIndex: 0,
    explanation: 'The numbering sequence (1, 2, 4) provides the lowest set of locants compared to other potential numbering schemes like (1, 4, 5).',
    hint: 'Apply the lowest locant set rule when numbering ring substituents.',
  },
  {
    id: 'q11',
    nodeId: NODE_IDS.c11_chem_cbse_021,
    title: 'Resonance Effects (+R / -R)',
    difficulty: 'hard',
    question: 'Why does the -OH group in phenol exhibit a +R (positive resonance) effect?',
    options: ['It withdraws electrons via sigma bond', 'It donates lone pair electrons into the conjugated pi system', 'It decreases electron density at ortho/para positions', 'It causes homolytic cleavage'],
    correctIndex: 1,
    explanation: '+R groups possess non-bonding lone pair electrons that can delocalize into the conjugated benzene ring, increasing electron density at ortho/para positions.',
    hint: 'Oxygen has lone pairs that can overflow into the ring.',
  },
  {
    id: 'q12',
    nodeId: NODE_IDS.c11_chem_cbse_023,
    title: 'Electromeric Effect',
    difficulty: 'medium',
    question: 'Which feature distinguishes the Electromeric effect from Inductive and Resonance effects?',
    options: ['It operates only through single sigma bonds', 'It is a permanent electronic displacement', 'It is a temporary effect that occurs only in the presence of an attacking reagent', 'It operates only in saturated alkanes'],
    correctIndex: 2,
    explanation: 'The Electromeric effect involves temporary complete transfer of pi-electrons in a double/triple bond, taking place exclusively under the influence of an attacking reagent.',
    hint: 'It vanishes as soon as the attacking reagent is removed.',
  },
  {
    id: 'q13',
    nodeId: NODE_IDS.c11_chem_cbse_024,
    title: 'Sublimation Purification',
    difficulty: 'easy',
    question: 'Sublimation is ideal for purifying compounds that:',
    options: ['Decompose at their melting points', 'Pass directly from solid to vapor phase upon heating without melting', 'Are miscible in water', 'Have very high boiling points'],
    correctIndex: 1,
    explanation: 'Sublimation separates volatile solids (like camphor, naphthalene, benzoic acid) that turn straight into vapor from non-volatile impurities.',
    hint: 'Phase transition skips the liquid state.',
  },
  {
    id: 'q14',
    nodeId: NODE_IDS.c11_chem_cbse_025,
    title: 'Crystallization Principle',
    difficulty: 'easy',
    question: 'What is the core principle of purification by crystallization?',
    options: ['Difference in boiling points', 'Difference in solubility of compound and impurities at high vs low temperature', 'Difference in density in two immiscible layers', 'Vapor pressure depression'],
    correctIndex: 1,
    explanation: 'Crystallization relies on dissolving the impure compound in hot solvent where it is highly soluble, then cooling it so pure crystals deposit while impurities stay dissolved in mother liquor.',
    hint: 'Compounds dissolve well when hot, crystallize out when cold.',
  },
  {
    id: 'q15',
    nodeId: NODE_IDS.c11_chem_cbse_026,
    title: 'Fractional Distillation',
    difficulty: 'medium',
    question: 'When is fractional distillation preferred over simple distillation?',
    options: ['When boiling point difference is > 100 °C', 'When boiling point difference is small (< 25 °C)', 'When compound decomposes on heating', 'When compound is insoluble in water'],
    correctIndex: 1,
    explanation: 'Fractional distillation uses a fractionating column providing theoretical plates for repeated vaporization-condensation cycles when boiling points are close (< 25 °C).',
    hint: 'Fractionating columns are needed when boiling points are very close.',
  },
  {
    id: 'q16',
    nodeId: NODE_IDS.c11_chem_cbse_027,
    title: 'Distillation Under Reduced Pressure',
    difficulty: 'medium',
    question: 'Glycerol decomposes at its normal boiling point (290 °C). How can it be safely distilled without decomposition?',
    options: ['Steam distillation', 'Vacuum distillation (reduced pressure)', 'Fractional distillation at 1 atm', 'Sublimation'],
    correctIndex: 1,
    explanation: 'Reducing atmospheric pressure lowers the boiling point of liquids, allowing glycerol to boil at a much lower temperature (e.g., 180 °C at 12 mmHg) without decomposing.',
    hint: 'Lowering external pressure lowers liquid boiling point.',
  },
  {
    id: 'q17',
    nodeId: NODE_IDS.c11_chem_cbse_028,
    title: 'Steam Distillation',
    difficulty: 'hard',
    question: 'In steam distillation of aniline, at what temperature does the mixture boil relative to normal boiling points of water (100°C) and aniline (184°C)?',
    options: ['Above 184 °C', 'Exactly 184 °C', 'Below 100 °C', 'Between 100 °C and 184 °C'],
    correctIndex: 2,
    explanation: 'For immiscible liquids, total vapor pressure P = P_water + P_aniline. The mixture boils when P equals atmospheric pressure, which occurs at a temperature BELOW 100 °C.',
    hint: 'Vapor pressures add up, so the boiling point is lower than either component alone.',
  },
  {
    id: 'q18',
    nodeId: NODE_IDS.c11_chem_cbse_029,
    title: 'Differential Extraction',
    difficulty: 'easy',
    question: 'When an aqueous solution containing organic solute is shaken with ether in a separating funnel, which layer typically forms the TOP layer?',
    options: ['Aqueous layer because water is lighter', 'Ether (organic) layer because ether density < 1 g/cm³', 'Emulsion layer', 'Both layers mix completely'],
    correctIndex: 1,
    explanation: 'Ether is less dense than water (d ≈ 0.71 g/cm³), so the organic ether layer floats on top of the aqueous layer.',
    hint: 'Organic solvents like diethyl ether float on water.',
  },
  {
    id: 'q19',
    nodeId: NODE_IDS.c11_chem_cbse_030,
    title: 'TLC & Rf Calculation',
    difficulty: 'medium',
    question: 'In Thin Layer Chromatography (TLC), if a spot moves 3.0 cm and the solvent front moves 6.0 cm, what is the Retention Factor (Rf)?',
    options: ['2.0', '0.50', '18.0', '0.30'],
    correctIndex: 1,
    explanation: 'Retention factor Rf = (distance travelled by spot) / (distance travelled by solvent front) = 3.0 / 6.0 = 0.50.',
    hint: 'Rf = Distance by compound / Distance by solvent.',
  }
];

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 11 Organic Chemistry Foundations Lab',
  subtitle: 'Master Hybridization, Nomenclature, and Purification Techniques',
  description: 'Step into a virtual organic chemistry lab where you explore hybridization, IUPAC nomenclature, resonance effects, and purification methods including distillation and chromatography.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Hybridization Mystery',
  question: 'A carbon atom in methane (CH4) has 4 equivalent C-H bonds, but the 2s and 2p orbitals have different energies. How does carbon form 4 identical bonds?',
  options: [
    'Carbon uses only the 2p orbitals, leaving 2s empty',
    'Carbon promotes one 2s electron to 2p and mixes all four orbitals (sp3 hybridization)',
    'Carbon forms 4 bonds using only 2s orbital overlap',
    'Carbon uses 2s for 2 bonds and 2p for the other 2 bonds'
],
  correctIndex: 1,
  explanation: 'Carbon promotes a 2s electron to the empty 2p orbital, then mixes one 2s and three 2p orbitals to form four equivalent sp3 hybrid orbitals, each with 25% s-character and 75% p-character, arranged tetrahedrally at 109.5°.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "hybridization",
    "name": "Hybridization Lab",
    "description": "Explore sp, sp2, sp3 hybridization and molecular geometry."
  },
  {
    "id": "nomenclature",
    "name": "IUPAC Nomenclature Station",
    "description": "Practice naming alkanes, alkenes, and functional group compounds."
  },
  {
    "id": "effects",
    "name": "Electronic Effects Lab",
    "description": "Study inductive, resonance, and electromeric effects."
  },
  {
    "id": "purification",
    "name": "Purification Techniques Lab",
    "description": "Master distillation, sublimation, crystallization, and chromatography."
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
    "title": "Selecting Longest Chain Without Principal Functional Group in IUPAC",
    "description": "Students often believe that the parent carbon chain in IUPAC nomenclature must strictly be the longest continuous chain of carbon atoms in the molecule, regardless of functional groups.",
    "correction": "The parent carbon chain must be chosen to include the principal functional group and maximum number of multiple bonds, even if a longer continuous carbon chain exists without them. For example, in 2-ethylbutan-1-ol, the longest continuous carbon chain has 5 carbons, but the parent chain is chosen as 4 carbons so that it contains the -OH functional group."
  },
  {
    "id": "misc_2",
    "title": "Viewing Canonical Resonance Structures as Real Oscillating Isomers",
    "description": "Students frequently perceive canonical resonance structures as real, distinct chemical species that rapidly interconvert or oscillate back and forth in dynamic equilibrium.",
    "correction": "Resonance structures are purely hypothetical Lewis representations used on paper to depict electron delocalization for a single real molecule known as the resonance hybrid. The molecule exists in only one static hybrid state at all times, and atoms never change positions between canonical forms."
  },
  {
    "id": "misc_3",
    "title": "Including Pi Bonds When Determining Carbon Atom Hybridization",
    "description": "Students count the total number of bonds (including pi bonds) attached to a carbon atom to deduce its hybridization state, often misidentifying sp or sp2 carbon atoms as sp3.",
    "correction": "Hybridization involves only sigma (σ) bonds and lone pairs, while pi (π) bonds are formed by unhybridized pure p-orbitals. A carbon with two σ bonds and two π bonds (as in ethyne or carbon dioxide) has a steric number of 2 and is sp hybridized, not sp3."
  },
  {
    "id": "misc_4",
    "title": "Believing Steam Distillation Heats Organic Liquids Above Their Boiling Point",
    "description": "Students assume steam distillation works by heating steam-volatile organic liquids to temperatures higher than their normal boiling points because hot steam is passed into the mixture.",
    "correction": "Steam distillation causes an immiscible organic liquid to boil at a temperature *lower* than its normal boiling point (and below 373 K). This occurs because the total vapor pressure of the immiscible mixture equals the sum of individual vapor pressures (P_total = P_water + P_organic), reaching atmospheric pressure well before reaching the organic liquid's normal boiling point."
  },
  {
    "id": "misc_5",
    "title": "Classifying Electromeric Effect as a Permanent Ground-State Property",
    "description": "Students treat the electromeric effect (+E/-E) as a permanent electron displacement inherent to an isolated molecule, similar to inductive (+I/-I) and resonance (+R/-R) effects.",
    "correction": "The electromeric effect is a temporary electronic effect that occurs only when an attacking reagent approaches a multiple bond, causing a complete transfer of a shared pair of π-electrons. As soon as the attacking reagent is removed, the molecule reverts back to its original unpolarized ground state."
  }
];


export default function C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim() {
  const [activeTab, setActiveTab] = useState<TabType>('hybridization');

  // Hybridization State
  const [selectedHybrid, setSelectedHybrid] = useState<'sp3' | 'sp2' | 'sp'>('sp3');
  const [hybridAngleRot, setHybridAngleRot] = useState<number>(20);

  // Structural Representation State
  const [selectedRepMol, setSelectedRepMol] = useState<'ethane' | 'ethene' | 'ethyne' | 'propanol' | 'acetone' | 'benzene'>('propanol');
  const [repType, setRepType] = useState<'complete' | 'condensed' | 'bondline'>('complete');

  // IUPAC Interactive Builder State
  const [chainLen, setChainLen] = useState<number>(4);
  const [substituent, setSubstituent] = useState<'none' | 'methyl' | 'oh' | 'cho' | 'cooh'>('oh');
  const [subPosition, setSubPosition] = useState<number>(1);
  const [benzeneSub, setBenzeneSub] = useState<'ortho' | 'meta' | 'para'>('ortho');

  // Electronic Effects State
  const [effectType, setEffectType] = useState<'+R' | '-R' | 'E+'>('+R');
  const [animStep, setAnimStep] = useState<number>(0);

  // Purification Lab Simulation State
  const [labType, setLabType] = useState<'sublimation' | 'crystallization' | 'distillation' | 'vacuum' | 'steam' | 'extraction' | 'chromatography'>('chromatography');
  const [heatTemp, setHeatTemp] = useState<number>(30);
  const [labRunning, setLabRunning] = useState<boolean>(false);
  const [tlcSpotDist, setTlcSpotDist] = useState<number>(3.5);
  const [tlcSolventDist, setTlcSolventDist] = useState<number>(7.0);

  // Challenge Engine & BKT / SRS States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // SRS and BKT store references
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>({});
  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initial speech audio welcome
  useEffect(() => {
    speechManager.speak('Welcome to CBSE Class 11 Organic Chemistry Basic Principles Simulation.');
    // Initialize BKT & SRS states for all nodes
    const bktInit: Record<string, ReturnType<typeof createBKTState>> = {};
    const srsInit: Record<string, ReturnType<typeof createReviewItem>> = {};
    Object.values(NODE_IDS).forEach((nodeId) => {
      bktInit[nodeId] = createBKTState();
      srsInit[nodeId] = createReviewItem(nodeId, 'Chemistry');
    });
    setBktStates(bktInit);
    setSrsItems(srsInit);
  }, []);

  // Handle Tab Switch
  const switchTab = (tab: TabType) => {
    audioManager.play('tap');
    setActiveTab(tab);
    switch (tab) {
      case 'hybridization':
        speechManager.speak('Explore Carbon Tetravalence and Hybridization geometries.');
        break;
      case 'representations':
        speechManager.speak('Convert between Complete, Condensed, and Bond line formulas.');
        break;
      case 'iupac':
        speechManager.speak('Build carbon chains and determine their IUPAC systematic names.');
        break;
      case 'electronic':
        speechManager.speak('Observe positive and negative resonance and electromeric electron shifts.');
        break;
      case 'purification':
        speechManager.speak('Simulate lab purification procedures including distillation and chromatography.');
        break;
      case 'challenge':
        speechManager.speak('Test your knowledge with adaptive CBSE challenge questions.');
        break;
    }
  };

  // Automated Canvas animation for Purification Lab
  useEffect(() => {
    let animationFrameId: number;
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, 500, 320);

      if (labType === 'sublimation') {
        // Draw China dish
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(250, 240, 80, 0, Math.PI, false);
        ctx.fill();

        // Burner
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(235, 250, 30, 40);
        // Flame
        if (heatTemp > 50) {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(250, 245, 12 + Math.sin(time * 5) * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Mixture in dish
        ctx.fillStyle = '#334155';
        ctx.fillRect(190, 235, 120, 10);

        // Inverted Funnel
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(170, 240);
        ctx.lineTo(240, 100);
        ctx.lineTo(240, 50);
        ctx.lineTo(260, 50);
        ctx.lineTo(260, 100);
        ctx.lineTo(330, 240);
        ctx.stroke();

        // Cotton plug at top
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(250, 48, 12, 0, Math.PI * 2);
        ctx.fill();

        // Vapors rising if heated
        if (heatTemp > 60) {
          for (let i = 0; i < 8; i++) {
            const vy = 220 - ((time * 30 + i * 25) % 120);
            const vx = 250 + Math.sin(time + i) * 20;
            ctx.fillStyle = 'rgba(217, 249, 157, 0.7)';
            ctx.beginPath();
            ctx.arc(vx, vy, 4, 0, Math.PI * 2);
            ctx.fill();
          }
          // Sublimated pure solid on cool funnel walls
          ctx.fillStyle = '#bef264';
          ctx.fillRect(205, 150, 8, 30);
          ctx.fillRect(287, 150, 8, 30);
        }
      } else if (labType === 'chromatography') {
        // TLC Plate background
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(180, 40, 140, 240);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(180, 40, 140, 240);

        // Baseline (Origin)
        ctx.strokeStyle = '#64748b';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(190, 250);
        ctx.lineTo(310, 250);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#64748b';
        ctx.font = '11px sans-serif';
        ctx.fillText('Base Line', 120, 254);

        // Solvent Front animation
        const maxFrontY = 250 - tlcSolventDist * 22;
        const currentFrontY = labRunning ? Math.max(maxFrontY, 250 - (time * 15) % 200) : maxFrontY;

        ctx.strokeStyle = '#0284c7';
        ctx.beginPath();
        ctx.moveTo(190, currentFrontY);
        ctx.lineTo(310, currentFrontY);
        ctx.stroke();
        ctx.fillStyle = '#0284c7';
        ctx.fillText('Solvent Front', 320, currentFrontY + 4);

        // Solute Spot migration
        const maxSpotY = 250 - tlcSpotDist * 22;
        const currentSpotY = labRunning
          ? 250 - ((250 - currentFrontY) * (tlcSpotDist / tlcSolventDist))
          : maxSpotY;

        ctx.fillStyle = '#e11d48';
        ctx.beginPath();
        ctx.arc(250, currentSpotY, 7, 0, Math.PI * 2);
        ctx.fill();

        // Distance indicators
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.lineTo(250, currentSpotY);
        ctx.stroke();
      } else {
        // Distillation / Crystallization / Extraction default lab view
        ctx.fillStyle = '#1e293b';
        ctx.font = '16px sans-serif';
        ctx.fillText(`Interactive ${labType.toUpperCase()} Visualizer`, 120, 150);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(150, 180, 200, 30);
        ctx.fillStyle = '#0f172a';
        ctx.fillText('Active Apparatus Stream', 170, 201);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [labType, heatTemp, labRunning, tlcSpotDist, tlcSolventDist]);

  // Derived IUPAC naming helper for interactive chain builder
  const generatedIupacName = useMemo(() => {
    const prefixes: Record<number, string> = {
      1: 'meth', 2: 'eth', 3: 'prop', 4: 'but', 5: 'pent', 6: 'hex', 7: 'hept', 8: 'oct'
    };
    const root = prefixes[chainLen] || 'alk';

    if (substituent === 'none') {
      return `${root.charAt(0).toUpperCase() + root.slice(1)}ane`;
    }
    if (substituent === 'methyl') {
      const pos = Math.min(subPosition, chainLen);
      return `${pos}-Methyl${root}ane`;
    }
    if (substituent === 'oh') {
      const pos = Math.min(subPosition, chainLen);
      return `${root.charAt(0).toUpperCase() + root.slice(1)}an-${pos}-ol`;
    }
    if (substituent === 'cho') {
      return `${root.charAt(0).toUpperCase() + root.slice(1)}anal`;
    }
    if (substituent === 'cooh') {
      return `${root.charAt(0).toUpperCase() + root.slice(1)}anoic acid`;
    }
    return 'Organic Compound';
  }, [chainLen, substituent, subPosition]);

  // Handle Question Submission
  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const q = QUESTION_BANK[currentQuestionIdx];
    const isCorrect = optionIdx === q.correctIndex;

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setScore((prev) => prev + 10);
      speechManager.speak('Correct answer! Excellent chemistry knowledge.');
      if (currentQuestionIdx === QUESTION_BANK.length - 1) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        recordGameScore(Object.values(NODE_IDS), score + 10);
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect option. Let us review the concept step by step.');
    }

    // Update BKT & SRS for node
    const currBkt = bktStates[q.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [q.nodeId]: updatedBkt }));

    const currSrs = srsItems[q.nodeId] || createReviewItem(q.nodeId, 'Chemistry');
    const updatedSrs = sm2Update(currSrs, isCorrect ? 5 : 2, 0);
    setSrsItems((prev) => ({ ...prev, [q.nodeId]: updatedSrs }));
  };

  const nextQuestion = () => {
    audioManager.play('swoop');
    setIsAnswered(false);
    setSelectedOption(null);
    setShowHint(false);
    setShowSparkle(false);
    if (currentQuestionIdx < QUESTION_BANK.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setCurrentQuestionIdx(0);
    }
  };

  const currentQ = QUESTION_BANK[currentQuestionIdx];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans p-2 sm:p-6 select-none">
      {/* Header Banner */}
      <header className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 backdrop-blur shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
              CBSE Class 11 Chemistry
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/30 rounded-full">
              NCERT Ch 12 Part 1
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-gold-300 to-gold-400 bg-clip-text text-transparent mt-1">
            Organic Chemistry: Basic Principles & Techniques
          </h1>
        </div>

        {/* Dynamic Mastery Badge */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-400">Node Mastery Level</div>
            <div className="text-sm font-bold text-emerald-400">
              {(masteryProb(bktStates[currentQ.nodeId] || createBKTState()) * 100).toFixed(0)}%
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-extrabold text-amber-400 shadow-inner">
            {score}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
        {[
          { id: 'hybridization', label: '1. Hybridization & Shapes' },
          { id: 'representations', label: '2. Structural Formulas' },
          { id: 'iupac', label: '3. IUPAC Nomenclature' },
          { id: 'electronic', label: '4. Electronic Effects' },
          { id: 'purification', label: '5. Virtual Lab (Purification)' },
          { id: 'challenge', label: '6. Adaptive Challenges' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => switchTab(t.id as TabType)}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              activeTab === t.id
                ? 'bg-gradient-to-r from-gold-600 to-emerald-600 text-white shadow-lg shadow-gold-900/30 font-semibold'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        {/* MODULE 1: HYBRIDIZATION & SHAPES */}
        {activeTab === 'hybridization' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-gold-300 mb-2">Tetravalence & Hybridization of Carbon</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Carbon has electronic configuration 1s² 2s² 2px¹ 2py¹. In excited state, one 2s electron is promoted to 2pz orbital, providing four unpaired electrons for bonding.
                </p>

                {/* Hybridization Selector */}
                <div className="space-y-3 mb-6">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select State:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['sp3', 'sp2', 'sp'] as const).map((h) => (
                      <button
                        key={h}
                        onClick={() => {
                          audioManager.play('pop');
                          setSelectedHybrid(h);
                        }}
                        className={`py-2 text-sm font-bold rounded-lg border transition ${
                          selectedHybrid === h
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {h.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orbital & Geometry Parameters Table */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-400">Geometry:</span>
                    <span className="font-semibold text-emerald-400">
                      {selectedHybrid === 'sp3' ? 'Tetrahedral' : selectedHybrid === 'sp2' ? 'Trigonal Planar' : 'Linear'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-400">Bond Angle:</span>
                    <span className="font-semibold text-gold-400">
                      {selectedHybrid === 'sp3' ? '109.5°' : selectedHybrid === 'sp2' ? '120°' : '180°'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-400">% s-character:</span>
                    <span className="font-semibold text-amber-400">
                      {selectedHybrid === 'sp3' ? '25%' : selectedHybrid === 'sp2' ? '33.3%' : '50%'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-400">Example Molecule:</span>
                    <span className="font-semibold text-gold-300">
                      {selectedHybrid === 'sp3' ? 'Methane (CH4), Ethane (C2H6)' : selectedHybrid === 'sp2' ? 'Ethene (C2H4)' : 'Ethyne (C2H2)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">C-C Bond Length:</span>
                    <span className="font-semibold text-rose-400">
                      {selectedHybrid === 'sp3' ? '154 pm' : selectedHybrid === 'sp2' ? '134 pm' : '120 pm'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Angle Rotation Slider */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Perspective Rotate</span>
                  <span>{hybridAngleRot}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hybridAngleRot}
                  onChange={(e) => setHybridAngleRot(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
              </div>
            </div>

            {/* Visualizer Canvas / SVG */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
              <span className="absolute top-4 left-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Interactive Orbital Geometry Visualizer
              </span>

              <svg className="w-full h-80 max-w-md" viewBox="0 0 400 300">
                <defs>
                  <radialGradient id="carbonGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </radialGradient>
                  <radialGradient id="hydrogenGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </radialGradient>
                </defs>

                {/* Central Carbon */}
                <circle cx="200" cy="150" r="28" fill="url(#carbonGrad)" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="155" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="16">C</text>

                {/* Geometry bonds based on hybrid state */}
                {selectedHybrid === 'sp3' && (
                  <g transform={`rotate(${hybridAngleRot}, 200, 150)`}>
                    {/* Top H */}
                    <line x1="200" y1="150" x2="200" y2="50" stroke="#bef264" strokeWidth="4" />
                    <circle cx="200" cy="50" r="16" fill="url(#hydrogenGrad)" />
                    <text x="200" y="55" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    {/* Bottom Left H */}
                    <line x1="200" y1="150" x2="110" y2="210" stroke="#bef264" strokeWidth="4" />
                    <circle cx="110" cy="210" r="16" fill="url(#hydrogenGrad)" />
                    <text x="110" y="215" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    {/* Bottom Right H */}
                    <line x1="200" y1="150" x2="290" y2="210" stroke="#bef264" strokeWidth="4" />
                    <circle cx="290" cy="210" r="16" fill="url(#hydrogenGrad)" />
                    <text x="290" y="215" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    {/* Wedge H (front) */}
                    <polygon points="200,150 230,240 245,230" fill="#38bdf8" opacity="0.8" />
                    <circle cx="240" cy="235" r="16" fill="url(#hydrogenGrad)" />
                    <text x="240" y="240" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    {/* Angle indicator */}
                    <path d="M 200,110 A 40,40 0 0,1 240,170" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="235" y="130" fill="#f59e0b" fontSize="12" fontWeight="bold">109.5°</text>
                  </g>
                )}

                {selectedHybrid === 'sp2' && (
                  <g transform={`rotate(${hybridAngleRot}, 200, 150)`}>
                    {/* Trigonal Planar 120° */}
                    <line x1="200" y1="150" x2="200" y2="50" stroke="#bef264" strokeWidth="4" />
                    <circle cx="200" cy="50" r="16" fill="url(#hydrogenGrad)" />
                    <text x="200" y="55" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    <line x1="200" y1="150" x2="113" y2="200" stroke="#bef264" strokeWidth="4" />
                    <circle cx="113" cy="200" r="16" fill="url(#hydrogenGrad)" />
                    <text x="113" y="205" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    <line x1="200" y1="150" x2="287" y2="200" stroke="#bef264" strokeWidth="4" />
                    <circle cx="287" cy="200" r="16" fill="url(#hydrogenGrad)" />
                    <text x="287" y="205" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    {/* Unhybridized p-orbital perpendicular */}
                    <ellipse cx="200" cy="150" rx="12" ry="45" fill="#f43f5e" opacity="0.3" stroke="#f43f5e" strokeDasharray="2,2" />
                    <text x="220" y="110" fill="#f43f5e" fontSize="11">unhybridized 2pz</text>

                    {/* Angle indicator */}
                    <path d="M 200,100 A 50,50 0 0,1 260,185" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="235" y="130" fill="#f59e0b" fontSize="12" fontWeight="bold">120°</text>
                  </g>
                )}

                {selectedHybrid === 'sp' && (
                  <g transform={`rotate(${hybridAngleRot}, 200, 150)`}>
                    {/* Linear 180° */}
                    <line x1="200" y1="150" x2="80" y2="150" stroke="#bef264" strokeWidth="4" />
                    <circle cx="80" cy="150" r="16" fill="url(#hydrogenGrad)" />
                    <text x="80" y="155" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    <line x1="200" y1="150" x2="320" y2="150" stroke="#bef264" strokeWidth="4" />
                    <circle cx="320" cy="150" r="16" fill="url(#hydrogenGrad)" />
                    <text x="320" y="155" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">H</text>

                    {/* Two unhybridized p-orbitals */}
                    <ellipse cx="200" cy="150" rx="12" ry="50" fill="#f43f5e" opacity="0.3" stroke="#f43f5e" strokeDasharray="2,2" />
                    <ellipse cx="200" cy="150" rx="50" ry="12" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeDasharray="2,2" />

                    {/* Angle indicator */}
                    <path d="M 140,150 A 60,60 0 0,1 260,150" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="200" y="110" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">180°</text>
                  </g>
                )}
              </svg>
            </div>
          </motion.div>
        )}

        {/* MODULE 2: STRUCTURAL REPRESENTATIONS */}
        {activeTab === 'representations' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-emerald-300 mb-2">Structural Representations Converter</h2>
              <p className="text-sm text-slate-300 mb-6">
                Organic molecules can be drawn in complete, condensed, or bond-line (skeletal) notation. Bond-line structures omit C and H labels to highlight the core carbon skeleton.
              </p>

              {/* Molecule Selector Controls */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-6">
                {[
                  { id: 'ethane', label: 'Ethane' },
                  { id: 'ethene', label: 'Ethene' },
                  { id: 'ethyne', label: 'Ethyne' },
                  { id: 'propanol', label: 'Propan-1-ol' },
                  { id: 'acetone', label: 'Propanone' },
                  { id: 'benzene', label: 'Benzene' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      audioManager.play('tap');
                      setSelectedRepMol(m.id as any);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                      selectedRepMol === m.id
                        ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Representation Format Toggle */}
              <div className="flex border-b border-slate-800 mb-6">
                {[
                  { id: 'complete', label: 'Complete Formula (All Bonds Shown)' },
                  { id: 'condensed', label: 'Condensed Formula' },
                  { id: 'bondline', label: 'Bond-Line Formula (Skeletal)' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => {
                      audioManager.play('pop');
                      setRepType(fmt.id as any);
                    }}
                    className={`px-4 py-3 font-semibold text-xs border-b-2 transition ${
                      repType === fmt.id
                        ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>

              {/* Display Canvas Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px]">
                {repType === 'condensed' ? (
                  <div className="text-2xl font-mono text-gold-300 font-bold tracking-wider">
                    {selectedRepMol === 'ethane' && 'CH₃-CH₃'}
                    {selectedRepMol === 'ethene' && 'CH₂=CH₂'}
                    {selectedRepMol === 'ethyne' && 'HC≡CH'}
                    {selectedRepMol === 'propanol' && 'CH₃-CH₂-CH₂-OH'}
                    {selectedRepMol === 'acetone' && 'CH₃-CO-CH₃'}
                    {selectedRepMol === 'benzene' && 'C₆H₆'}
                  </div>
                ) : repType === 'complete' ? (
                  <svg className="w-full h-40 max-w-lg" viewBox="0 0 500 150">
                    {selectedRepMol === 'propanol' && (
                      <g className="font-mono font-bold text-lg fill-gold-300 stroke-gold-300">
                        {/* Carbon chain C1, C2, C3 */}
                        <text x="100" y="80">C</text>
                        <text x="200" y="80">C</text>
                        <text x="300" y="80">C</text>
                        <text x="400" y="80" fill="#f43f5e">O</text>
                        <text x="450" y="80" fill="#f8fafc">H</text>

                        {/* C-C and C-O single bonds */}
                        <line x1="120" y1="75" x2="195" y2="75" stroke="#38bdf8" strokeWidth="3" />
                        <line x1="220" y1="75" x2="295" y2="75" stroke="#38bdf8" strokeWidth="3" />
                        <line x1="320" y1="75" x2="395" y2="75" stroke="#38bdf8" strokeWidth="3" />
                        <line x1="420" y1="75" x2="445" y2="75" stroke="#38bdf8" strokeWidth="3" />

                        {/* Hydrogens attached */}
                        {/* C1 Hydrogens */}
                        <text x="100" y="30" fill="#f8fafc">H</text>
                        <line x1="106" y1="38" x2="106" y2="60" stroke="#94a3b8" strokeWidth="2" />
                        <text x="100" y="130" fill="#f8fafc">H</text>
                        <line x1="106" y1="88" x2="106" y2="112" stroke="#94a3b8" strokeWidth="2" />
                        <text x="50" y="80" fill="#f8fafc">H</text>
                        <line x1="68" y1="75" x2="95" y2="75" stroke="#94a3b8" strokeWidth="2" />

                        {/* C2 Hydrogens */}
                        <text x="200" y="30" fill="#f8fafc">H</text>
                        <line x1="206" y1="38" x2="206" y2="60" stroke="#94a3b8" strokeWidth="2" />
                        <text x="200" y="130" fill="#f8fafc">H</text>
                        <line x1="206" y1="88" x2="206" y2="112" stroke="#94a3b8" strokeWidth="2" />

                        {/* C3 Hydrogens */}
                        <text x="300" y="30" fill="#f8fafc">H</text>
                        <line x1="306" y1="38" x2="306" y2="60" stroke="#94a3b8" strokeWidth="2" />
                        <text x="300" y="130" fill="#f8fafc">H</text>
                        <line x1="306" y1="88" x2="306" y2="112" stroke="#94a3b8" strokeWidth="2" />
                      </g>
                    )}
                    {selectedRepMol !== 'propanol' && (
                      <text x="250" y="80" textAnchor="middle" fill="#38bdf8" fontSize="18" fontWeight="bold">
                        Complete Structural Formula for {selectedRepMol.toUpperCase()}
                      </text>
                    )}
                  </svg>
                ) : (
                  <svg className="w-full h-40 max-w-lg" viewBox="0 0 500 150">
                    {/* Bond-Line Skeletal Representation */}
                    {selectedRepMol === 'propanol' && (
                      <g stroke="#38bdf8" strokeWidth="4" strokeLinecap="round">
                        {/* Zigzag carbon chain */}
                        <polyline points="100,100 180,40 260,100 340,40" fill="none" />
                        <line x1="340" y1="40" x2="400" y2="40" stroke="#f43f5e" strokeWidth="4" />
                        <text x="410" y="48" fill="#f43f5e" fontSize="20" fontWeight="bold" stroke="none">OH</text>
                        <circle cx="100" cy="100" r="5" fill="#10b981" />
                        <circle cx="180" cy="40" r="5" fill="#10b981" />
                        <circle cx="260" cy="100" r="5" fill="#10b981" />
                        <circle cx="340" cy="40" r="5" fill="#10b981" />
                      </g>
                    )}
                    {selectedRepMol === 'benzene' && (
                      <g stroke="#38bdf8" strokeWidth="3" fill="none">
                        <polygon points="250,30 300,60 300,110 250,140 200,110 200,60" />
                        <circle cx="250" cy="85" r="30" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,4" />
                      </g>
                    )}
                    {selectedRepMol !== 'propanol' && selectedRepMol !== 'benzene' && (
                      <text x="250" y="80" textAnchor="middle" fill="#10b981" fontSize="18" fontWeight="bold">
                        Skeletal Bond-Line Representation for {selectedRepMol.toUpperCase()}
                      </text>
                    )}
                  </svg>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* MODULE 3: IUPAC NOMENCLATURE */}
        {activeTab === 'iupac' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Control Panel */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-amber-300">Interactive IUPAC Name Solver</h2>
              <p className="text-xs text-slate-300">
                Adjust carbon chain length and attach functional groups to calculate systematic IUPAC names automatically.
              </p>

              {/* Chain Length Slider */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Parent Carbon Chain Length</span>
                  <span className="font-bold text-emerald-400">{chainLen} Carbons</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={chainLen}
                  onChange={(e) => {
                    audioManager.play('count');
                    setChainLen(Number(e.target.value));
                  }}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
              </div>

              {/* Functional Group / Substituent */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Attach Principal Functional Group
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'none', name: 'None (Alkane)' },
                    { id: 'methyl', name: '-CH3 (Methyl)' },
                    { id: 'oh', name: '-OH (Alcohol)' },
                    { id: 'cho', name: '-CHO (Aldehyde)' },
                    { id: 'cooh', name: '-COOH (Carboxylic Acid)' },
                  ].map((sg) => (
                    <button
                      key={sg.id}
                      onClick={() => {
                        audioManager.play('tap');
                        setSubstituent(sg.id as any);
                      }}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition text-left ${
                        substituent === sg.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {sg.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Position Locant Slider */}
              {(substituent === 'oh' || substituent === 'methyl') && (
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Substituent Position (Locant)</span>
                    <span className="font-bold text-gold-400">C-{subPosition}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={chainLen}
                    value={subPosition}
                    onChange={(e) => setSubPosition(Number(e.target.value))}
                    className="w-full accent-gold-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />
                </div>
              )}

              {/* Benzene Derivative Section */}
              <div className="pt-4 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Disubstituted Benzene Position Rule
                </label>
                <div className="flex gap-2">
                  {(['ortho', 'meta', 'para'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => {
                        audioManager.play('pop');
                        setBenzeneSub(pos);
                      }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                        benzeneSub === pos
                          ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {pos} (1,{pos === 'ortho' ? '2' : pos === 'meta' ? '3' : '4'})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Result Display */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Computed Systematic IUPAC Name</span>
                <div className="mt-2 p-4 bg-slate-950 border border-emerald-500/30 rounded-xl text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-wide font-mono">
                    {generatedIupacName}
                  </span>
                </div>

                {/* Nomenclature Rule Breakdown */}
                <div className="mt-6 space-y-3 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-1">IUPAC Rule Breakdown:</h4>
                  <p>1. <strong className="text-emerald-400">Parent Root Word:</strong> Root prefix for {chainLen} carbons is "{chainLen === 1 ? 'meth' : chainLen === 2 ? 'eth' : chainLen === 3 ? 'prop' : chainLen === 4 ? 'but' : chainLen === 5 ? 'pent' : 'hex'}".</p>
                  <p>2. <strong className="text-gold-400">Lowest Locant Rule:</strong> The chain is numbered from the end that gives the principal functional group the lowest possible locant.</p>
                  <p>3. <strong className="text-amber-400">Suffix Selection:</strong> Primary suffix "-ane" + Secondary suffix for {substituent}.</p>
                </div>
              </div>

              {/* Benzene Name Preview */}
              <div className="mt-4 p-3 bg-gold-950/30 border border-gold-800/50 rounded-xl text-xs flex justify-between items-center">
                <span className="text-gold-300">Dimethylbenzene Iso-Pos:</span>
                <span className="font-bold text-white font-mono">
                  {benzeneSub === 'ortho' && '1,2-dimethylbenzene (o-xylene)'}
                  {benzeneSub === 'meta' && '1,3-dimethylbenzene (m-xylene)'}
                  {benzeneSub === 'para' && '1,4-dimethylbenzene (p-xylene)'}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* MODULE 4: ELECTRONIC EFFECTS (+R/-R & ELECTROMERIC) */}
        {activeTab === 'electronic' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-gold-300">Electronic Effects & Resonance</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Observe curved-arrow notation depicting electron displacement in conjugated systems (+R/-R resonance) and temporary polarization due to attacking reagents (Electromeric effect).
              </p>

              {/* Effect Selector */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '+R', name: '+R Effect (Phenol)' },
                  { id: '-R', name: '-R Effect (Nitro)' },
                  { id: 'E+', name: 'Electromeric (E+)' },
                ].map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => {
                      audioManager.play('pop');
                      setEffectType(eff.id as any);
                      setAnimStep(0);
                    }}
                    className={`py-2 text-xs font-bold rounded-lg border transition ${
                      effectType === eff.id
                        ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {eff.name}
                  </button>
                ))}
              </div>

              {/* Description Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                {effectType === '+R' && (
                  <>
                    <h4 className="font-bold text-emerald-400">+R (Positive Resonance) Effect:</h4>
                    <p className="text-slate-300">
                      Groups with non-bonding lone pairs (e.g., -OH, -NH2) donate electron density into the conjugated pi system.
                    </p>
                    <p className="text-amber-400">
                      Result: Increases electron density specifically at <strong>ortho</strong> and <strong>para</strong> positions.
                    </p>
                  </>
                )}
                {effectType === '-R' && (
                  <>
                    <h4 className="font-bold text-rose-400">-R (Negative Resonance) Effect:</h4>
                    <p className="text-slate-300">
                      Electron-withdrawing groups (e.g., -NO2, -CN, -COOH) draw electron density away from the conjugated ring.
                    </p>
                    <p className="text-amber-400">
                      Result: Decreases electron density at ortho/para positions, making <strong>meta</strong> position relatively more reactive.
                    </p>
                  </>
                )}
                {effectType === 'E+' && (
                  <>
                    <h4 className="font-bold text-gold-400">Electromeric Effect (Temporary):</h4>
                    <p className="text-slate-300">
                      Complete transfer of a shared pair of pi-electrons to one of the bonded atoms in the presence of an attacking electrophile (E+).
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={() => {
                  audioManager.play('swoop');
                  setAnimStep((prev) => (prev + 1) % 4);
                }}
                className="w-full py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
              >
                Trigger Resonance Step ({animStep + 1} / 4)
              </button>
            </div>

            {/* Canvas Curved Arrow Visualization */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center min-h-[320px]">
              <svg className="w-full h-64 max-w-md" viewBox="0 0 400 250">
                {/* Benzene Ring Skeleton */}
                <polygon points="200,60 260,95 260,165 200,200 140,165 140,95" fill="none" stroke="#38bdf8" strokeWidth="3" />

                {/* +R OH group at top */}
                {effectType === '+R' && (
                  <g>
                    <line x1="200" y1="60" x2="200" y2="25" stroke="#38bdf8" strokeWidth="3" />
                    <text x="200" y="20" textAnchor="middle" fill="#f43f5e" fontSize="18" fontWeight="bold">O-H</text>

                    {/* Animated Curved Arrow for electron pair shift */}
                    <path
                      d={
                        animStep === 0
                          ? 'M 200,20 Q 215,40 205,58'
                          : animStep === 1
                          ? 'M 255,90 Q 280,120 255,160'
                          : 'M 145,160 Q 120,120 145,90'
                      }
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      markerEnd="url(#arrowhead)"
                    />

                    {/* Highlighting ortho / para negative charge */}
                    <circle cx="260" cy="95" r="10" fill="#10b981" opacity={animStep === 1 ? 0.8 : 0.2} />
                    <text x="260" y="99" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">δ-</text>

                    <circle cx="200" cy="200" r="10" fill="#10b981" opacity={animStep === 2 ? 0.8 : 0.2} />
                    <text x="200" y="204" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">δ-</text>
                  </g>
                )}

                {/* Arrowhead Marker */}
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#f59e0b" />
                  </marker>
                </defs>
              </svg>
            </div>
          </motion.div>
        )}

        {/* MODULE 5: VIRTUAL PURIFICATION LAB */}
        {activeTab === 'purification' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-gold-300">Purification Methods Lab</h2>

              {/* Lab Technique Selector */}
              <div className="space-y-1.5">
                {[
                  { id: 'chromatography', label: 'TLC Chromatography (Rf)' },
                  { id: 'sublimation', label: 'Sublimation Apparatus' },
                  { id: 'crystallization', label: 'Crystallization' },
                  { id: 'distillation', label: 'Simple & Fractional Distillation' },
                  { id: 'vacuum', label: 'Vacuum Distillation' },
                  { id: 'steam', label: 'Steam Distillation' },
                  { id: 'extraction', label: 'Differential Extraction' },
                ].map((lab) => (
                  <button
                    key={lab.id}
                    onClick={() => {
                      audioManager.play('tap');
                      setLabType(lab.id as any);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                      labType === lab.id
                        ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {lab.label}
                  </button>
                ))}
              </div>

              {/* Interactive Sliders for TLC / Temperature */}
              {labType === 'chromatography' && (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Spot Distance (cm)</span>
                      <span className="font-bold text-emerald-400">{tlcSpotDist} cm</span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="6.5"
                      step="0.1"
                      value={tlcSpotDist}
                      onChange={(e) => setTlcSpotDist(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Solvent Front Distance (cm)</span>
                      <span className="font-bold text-gold-400">{tlcSolventDist} cm</span>
                    </div>
                    <input
                      type="range"
                      min="5.0"
                      max="9.0"
                      step="0.1"
                      value={tlcSolventDist}
                      onChange={(e) => setTlcSolventDist(Number(e.target.value))}
                      className="w-full accent-gold-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                    />
                  </div>

                  {/* Calculated Rf display */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                    <span className="text-slate-400">Retention Factor (Rf):</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {(tlcSpotDist / tlcSolventDist).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {labType === 'sublimation' && (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Burner Temperature (°C)</span>
                    <span className="font-bold text-rose-400">{heatTemp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="150"
                    value={heatTemp}
                    onChange={(e) => setHeatTemp(Number(e.target.value))}
                    className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />
                </div>
              )}

              <button
                onClick={() => {
                  audioManager.play('chime');
                  setLabRunning(!labRunning);
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
              >
                {labRunning ? 'Pause Simulation' : 'Start Process Simulation'}
              </button>
            </div>

            {/* Canvas Rendering Area */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col items-center justify-center">
              <canvas ref={canvasRef} width={500} height={320} className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800" />
            </div>
          </motion.div>
        )}

        {/* MODULE 6: ADAPTIVE CHALLENGES */}
        {activeTab === 'challenge' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative"
          >
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Question {currentQuestionIdx + 1} of {QUESTION_BANK.length}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{currentQ.title}</h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                  currentQ.difficulty === 'easy'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : currentQ.difficulty === 'medium'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
              >
                {currentQ.difficulty.toUpperCase()}
              </span>
            </div>

            {/* Question Text */}
            <p className="text-sm sm:text-base text-slate-200 mb-6 leading-relaxed">
              {currentQ.question}
            </p>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700';
                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswered}
                    className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm border transition-all flex items-center gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2 mb-6"
              >
                <div className="font-bold text-emerald-400">NCERT Solution Explanation:</div>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              </motion.div>
            )}

            {/* Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  audioManager.play('hint');
                  setShowHint(!showHint);
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl transition"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              {isAnswered && (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  Next Question →
                </button>
              )}
            </div>

            {/* Hint Bubble Component */}
      <HintBubble show={showHint} text={currentQ.hint} />
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

      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Organic Chemistry Module Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}