'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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

// ==========================================
// ALL 31 REQUIRED CBSE NODE IDS
// ==========================================
const ALL_NODE_IDS = [
  'c12_chem_cbse_302', 'c12_chem_cbse_303', 'c12_chem_cbse_304', 'c12_chem_cbse_305',
  'c12_chem_cbse_306', 'c12_chem_cbse_307', 'c12_chem_cbse_308', 'c12_chem_cbse_309',
  'c12_chem_cbse_310', 'c12_chem_cbse_311', 'c12_chem_cbse_312', 'c12_chem_cbse_313',
  'c12_chem_cbse_314', 'c12_chem_cbse_315', 'c12_chem_cbse_316', 'c12_chem_cbse_317',
  'c12_chem_cbse_318', 'c12_chem_cbse_319', 'c12_chem_cbse_320', 'c12_chem_cbse_321',
  'c12_chem_cbse_322', 'c12_chem_cbse_323', 'c12_chem_cbse_324', 'c12_chem_cbse_325',
  'c12_chem_cbse_326', 'c12_chem_cbse_327', 'c12_chem_cbse_328', 'c12_chem_cbse_329',
  'c12_chem_cbse_330', 'c12_chem_cbse_331', 'c12_chem_cbse_332'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// Types
type TabType = 'lessons' | 'workbench' | 'acidity' | 'challenges';
type SubstrateType = 'ethanal' | 'propanone' | 'benzaldehyde' | 'formaldehyde' | 'propanal';
type NucleophileType = 'CN' | 'RMgX' | 'NaHSO3' | 'H2N-OH' | 'H2N-NH2';
type SubstituentType = 'NO2' | 'F' | 'Cl' | 'Br' | 'I' | 'H' | 'CH3' | 'OCH3';

interface TeachingSlide {
  title: string;
  subtitle: string;
  nodeIds: NodeId[];
  content: string[];
  keyPoints: string[];
  formula: string;
}

interface ChallengeQuestion {
  id: number;
  nodeId: NodeId;
  nodeIds: NodeId[];
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

// ------------------------------------------
// LESSON DATA (5 CBSE Teaching Slides)
// ------------------------------------------
const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: '1. Bonding, Hybridization & Polarity of Carbonyl Group',
    subtitle: 'Nodes: c12_chem_cbse_303, c12_chem_cbse_304, c12_chem_cbse_302',
    nodeIds: ['c12_chem_cbse_303', 'c12_chem_cbse_304', 'c12_chem_cbse_302'],
    content: [
      'The carbonyl carbon is sp² hybridized and forms 3 σ-bonds in a trigonal planar geometry with ~120° bond angles.',
      'The unhybridized p-orbital overlaps with oxygen’s p-orbital to form a π-bond above and below the σ-plane.',
      'Oxygen is significantly more electronegative than carbon (3.5 vs 2.5), causing strong polarization: C(δ+)—O(δ-).',
      'This dipole moment makes the carbonyl carbon electrophilic (Lewis acid) and oxygen nucleophilic (Lewis base).'
    ],
    keyPoints: [
      'sp² hybridized carbon, trigonal planar geometry (120°)',
      'Dipole moment ~2.3 - 2.8 D due to electronegativity difference',
      'Resonance contributor >C⁺—O⁻ enhances electrophilicity of carbon'
    ],
    formula: '\\text{Polarity: } \\overset{\\delta+}{\\text{C}}=\\overset{\\delta-}{\\text{O}} \\longleftrightarrow \\overset{+}{\\text{C}}-\\overset{-}{\\text{O}}'
  },
  {
    title: '2. Mechanism of Nucleophilic Addition Reactions',
    subtitle: 'Nodes: c12_chem_cbse_306, c12_chem_cbse_307, c12_chem_cbse_308, c12_chem_cbse_313, c12_chem_cbse_314, c12_chem_cbse_315',
    nodeIds: ['c12_chem_cbse_306', 'c12_chem_cbse_307', 'c12_chem_cbse_308', 'c12_chem_cbse_313', 'c12_chem_cbse_314', 'c12_chem_cbse_315'],
    content: [
      'Step 1: Nucleophile (Nu⁻) attacks the electrophilic carbonyl carbon perpendicular to the planar sp² orbitals (~107° Bürgi-Dunitz angle).',
      'Hybridization changes from sp² (120° trigonal planar) to sp³ (109.5° tetrahedral alkoxide intermediate).',
      'Step 2: Protonation of the tetrahedral alkoxide intermediate by reaction medium yields the neutral addition product.',
      'Aldehydes are generally MORE reactive than ketones due to steric hindrance and lower +I inductive stabilization in aldehydes.'
    ],
    keyPoints: [
      'Perpendicular attack trajectory (~107°)',
      'sp² → sp³ hybridization shift during attack',
      'Reactivity order: HCHO > RCHO > R₂CO > ArCHO'
    ],
    formula: '\\text{Nu}^- + \\text{R}_2\\text{C}=\\text{O} \\xrightarrow{\\text{Slow}} \\text{R}_2\\text{C}(\\text{Nu})-\\text{O}^- \\xrightarrow[+\\text{H}^+]{\\text{Fast}} \\text{R}_2\\text{C}(\\text{Nu})-\\text{OH}'
  },
  {
    title: '3. Diagnostic Tests & Special Preparations',
    subtitle: 'Nodes: c12_chem_cbse_309, c12_chem_cbse_310, c12_chem_cbse_311, c12_chem_cbse_312, c12_chem_cbse_319, c12_chem_cbse_320, c12_chem_cbse_321, c12_chem_cbse_322, c12_chem_cbse_323, c12_chem_cbse_324, c12_chem_cbse_325',
    nodeIds: ['c12_chem_cbse_309', 'c12_chem_cbse_310', 'c12_chem_cbse_311', 'c12_chem_cbse_312', 'c12_chem_cbse_319', 'c12_chem_cbse_320', 'c12_chem_cbse_321', 'c12_chem_cbse_322', 'c12_chem_cbse_323', 'c12_chem_cbse_324', 'c12_chem_cbse_325'],
    content: [
      'Tollens’ Test: Ammoniacal silver nitrate [Ag(NH₃)₂]⁺ oxidizes aldehydes to carboxylates, producing a shiny Silver Mirror.',
      'Fehling’s Test: Fehling A (CuSO₄) + Fehling B (Rochelle salt + NaOH) gives a reddish-brown precipitate of Cu₂O with aliphatic aldehydes.',
      'Iodoform Test: Compounds containing CH₃C=O or CH₃CH(OH)- react with I₂ + NaOH to form a bright yellow precipitate of CHI₃.',
      'Rosenmund Reduction: Acyl chlorides reduced with H₂ over Pd-BaSO₄ yield aldehydes.'
    ],
    keyPoints: [
      'Tollens: RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag↓ (Silver Mirror) + 4NH₃ + 2H₂O',
      'Fehling: RCHO + 2Cu²⁺ + 5OH⁻ → RCOO⁻ + Cu₂O↓ (Red) + 3H₂O',
      'Clemmensen (Zn-Hg / conc. HCl) vs Wolff-Kishner (NH₂NH₂ / KOH / ethylene glycol)'
    ],
    formula: '\\text{R-CHO} + 2[\\text{Ag}(\\text{NH}_3)_2]^+ + 3\\text{OH}^- \\rightarrow \\text{RCOO}^- + 2\\text{Ag}\\downarrow + 4\\text{NH}_3 + 2\\text{H}_2\\text{O}'
  },
  {
    title: '4. Aldol Condensation & Cannizzaro Reaction',
    subtitle: 'Nodes: c12_chem_cbse_316, c12_chem_cbse_317, c12_chem_cbse_318',
    nodeIds: ['c12_chem_cbse_316', 'c12_chem_cbse_317', 'c12_chem_cbse_318'],
    content: [
      'Aldol Condensation: Carbonyl compounds with α-hydrogens undergo base-catalyzed removal of α-H to form a resonance-stabilized enolate ion.',
      'The enolate attacks another carbonyl molecule to yield a β-hydroxy aldehyde/ketone, which dehydrates upon heating to an α,β-unsaturated aldehyde/ketone.',
      'Cross Aldol: Occurs between two different carbonyls. If both have α-hydrogens, four different products form.',
      'Cannizzaro Reaction: Aldehydes WITHOUT α-hydrogens (e.g., HCHO, C₆H₅CHO) undergo self-oxidation-reduction (disproportionation) with 50% KOH to yield an alcohol and a carboxylic acid salt.'
    ],
    keyPoints: [
      'Requires α-hydrogens for Aldol condensation',
      'NO α-hydrogens required for Cannizzaro reaction',
      'Disproportionation: Hydride transfer from one aldehyde to another'
    ],
    formula: '2\\text{HCHO} + \\text{NaOH (conc.)} \\rightarrow \\text{CH}_3\\text{OH} + \\text{HCOONa}'
  },
  {
    title: '5. Carboxylic Acid Structure, Resonance & Acidity Trends',
    subtitle: 'Nodes: c12_chem_cbse_305, c12_chem_cbse_326, c12_chem_cbse_327, c12_chem_cbse_328, c12_chem_cbse_329, c12_chem_cbse_330, c12_chem_cbse_331, c12_chem_cbse_332',
    nodeIds: ['c12_chem_cbse_305', 'c12_chem_cbse_326', 'c12_chem_cbse_327', 'c12_chem_cbse_328', 'c12_chem_cbse_329', 'c12_chem_cbse_330', 'c12_chem_cbse_331', 'c12_chem_cbse_332'],
    content: [
      'Carboxylic acids are much stronger acids than alcohols or phenols because the carboxylate ion (RCOO⁻) is stabilized by two EQUIVALENT resonance structures carrying negative charge on electronegative oxygen atoms.',
      'Electron-Withdrawing Groups (-I, -R e.g., -NO₂, -F, -Cl) stabilize RCOO⁻ by dispersing negative charge → INCREASE Acidity (Lower pKa).',
      'Electron-Donating Groups (+I, +R e.g., -CH₃, -OCH₃) destabilize RCOO⁻ → DECREASE Acidity (Higher pKa).',
      'Carboxylic acids form cyclic dimers in non-polar solvents via 2 intermolecular hydrogen bonds, raising boiling points.'
    ],
    keyPoints: [
      'pKa values: Carboxylic acids (~4-5) < Phenols (~10) < Alcohols (~16)',
      'Acidity Order: NO₂CH₂COOH > FCH₂COOH > ClCH₂COOH > BrCH₂COOH > CH₃COOH',
      'Bicarbonate Test: RCOOH + NaHCO₃ → RCOONa + H₂O + CO₂↑ (effervescence)'
    ],
    formula: '\\text{R-COOH} \\rightleftharpoons \\text{R-COO}^- + \\text{H}^+ \\quad (pK_a = -\\log_{10} K_a)'
  }
];

// ------------------------------------------
// PRACTICE CHALLENGES (8 Adaptive CBSE Questions)
// ------------------------------------------
const CHALLENGE_QUESTIONS: ChallengeQuestion[] = [
  {
    id: 1,
    nodeId: 'c12_chem_cbse_302',
    nodeIds: ['c12_chem_cbse_302'],
    question: 'What is the correct IUPAC name of the dicarboxylic acid with structure HOOC-CH₂-CH₂-COOH?',
    options: ['Succinic acid', 'Butanedioic acid', 'Propanedioic acid', 'Ethanedioic acid'],
    correctAnswer: 1,
    explanation: 'IUPAC naming counts all carbon atoms including carboxyl carbons. 4 carbons = Butanedioic acid. Succinic acid is its common name.',
    hint: 'Count the total number of carbon atoms in the longest continuous chain including both carboxyl carbons.'
  },
  {
    id: 2,
    nodeId: 'c12_chem_cbse_303',
    nodeIds: ['c12_chem_cbse_303', 'c12_chem_cbse_304'],
    question: 'In the carbonyl group (>C=O), what is the hybridization of the carbon atom and the dominant nature of the carbon-oxygen double bond?',
    options: [
      'sp³ hybridized with non-polar covalent bonding',
      'sp hybridized with linear geometry',
      'sp² hybridized with a polar π-cloud strongly polarized towards oxygen',
      'sp² hybridized with equal electron density distribution'
    ],
    correctAnswer: 2,
    explanation: 'The carbonyl carbon is sp² hybridized forming trigonal planar bonds (120°). Due to higher electronegativity of oxygen (3.5 vs 2.5), the π-electron cloud is drawn towards oxygen.',
    hint: 'Recall the geometry (120°) and the electronegativity difference between C and O.'
  },
  {
    id: 3,
    nodeId: 'c12_chem_cbse_306',
    nodeIds: ['c12_chem_cbse_306', 'c12_chem_cbse_313', 'c12_chem_cbse_314'],
    question: 'During nucleophilic addition to a carbonyl carbon, at what angle relative to the carbonyl plane does the nucleophile approach, and how does the carbon hybridization change?',
    options: [
      '180° approach, changes sp² to sp',
      '~107° (Bürgi-Dunitz angle), changes sp² to sp³ tetrahedral intermediate',
      '90° approach, changes sp³ to sp²',
      '120° approach, hybridization remains sp² throughout'
    ],
    correctAnswer: 1,
    explanation: 'The nucleophile approaches at ~107° (perpendicular to the plane) to maximize overlap with the π* antibonding orbital. The carbon transitions from sp² (trigonal planar) to sp³ (tetrahedral alkoxide intermediate).',
    hint: 'Think about the transition from planar (120°) to tetrahedral (109.5°) geometry.'
  },
  {
    id: 4,
    nodeId: 'c12_chem_cbse_307',
    nodeIds: ['c12_chem_cbse_307', 'c12_chem_cbse_308', 'c12_chem_cbse_315', 'c12_chem_cbse_316', 'c12_chem_cbse_317'],
    question: 'Ethanal reacts with HCN in the presence of a base catalyst to yield ethanal cyanohydrin. What is the precise function of the base catalyst?',
    options: [
      'To protonate the carbonyl oxygen atom',
      'To generate the strong nucleophile CN⁻ from weak acid HCN',
      'To cause dehydration of the cyanohydrin product',
      'To act as an oxidizing agent for ethanal'
    ],
    correctAnswer: 1,
    explanation: 'HCN is a weak acid and does not ionize readily. Base (OH⁻) removes H⁺ from HCN to generate CN⁻, which is a powerful nucleophile that attacks the carbonyl carbon rapidly.',
    hint: 'Pure HCN is a weak acid; nucleophilic addition requires a strong nucleophile.'
  },
  {
    id: 5,
    nodeId: 'c12_chem_cbse_320',
    nodeIds: ['c12_chem_cbse_320'],
    question: 'An organic compound X (C₂H₄O) gives a bright Silver Mirror with Tollens’ reagent AND a yellow precipitate of Iodoform with I₂/NaOH. What is compound X?',
    options: ['Propanone (CH₃COCH₃)', 'Benzaldehyde (C₆H₅CHO)', 'Ethanal (CH₃CHO)', 'Methanal (HCHO)'],
    correctAnswer: 2,
    explanation: 'Ethanal (CH₃CHO) is an aldehyde (gives positive Tollens’ silver mirror test) AND possesses a methyl carbonyl group (CH₃C=O) which gives a positive Iodoform test (yellow CHI₃ ppt).',
    hint: 'It must be an aldehyde (Tollens+) AND contain a -COCH₃ group (Iodoform+).'
  },
  {
    id: 6,
    nodeId: 'c12_chem_cbse_318',
    nodeIds: ['c12_chem_cbse_316', 'c12_chem_cbse_317', 'c12_chem_cbse_318', 'c12_chem_cbse_322', 'c12_chem_cbse_323', 'c12_chem_cbse_324'],
    question: 'When Benzaldehyde (C₆H₅CHO) is heated with 50% concentrated NaOH, it produces Benzyl alcohol and Sodium benzoate. Which reaction is this?',
    options: [
      'Aldol Condensation because it contains α-hydrogens',
      'Cannizzaro Reaction because benzaldehyde lacks α-hydrogens and undergoes disproportionation',
      'Clemmensen Reduction',
      'Stephen Reaction'
    ],
    correctAnswer: 1,
    explanation: 'Benzaldehyde has no α-hydrogens. In concentrated alkali, one molecule is reduced to Benzyl alcohol (C₆H₅CH₂OH) while another is oxidized to Benzolate ion (C₆H₅COO⁻). This self-redox is the Cannizzaro reaction.',
    hint: 'Check if benzaldehyde has any hydrogens attached to the carbon adjacent to the aldehyde carbon.'
  },
  {
    id: 7,
    nodeId: 'c12_chem_cbse_309',
    nodeIds: ['c12_chem_cbse_309', 'c12_chem_cbse_310', 'c12_chem_cbse_311', 'c12_chem_cbse_312', 'c12_chem_cbse_325'],
    question: 'Which reagent selectively converts Benzoyl chloride (C₆H₅COCl) to Benzaldehyde (C₆H₅CHO) without over-reducing it to benzyl alcohol?',
    options: [
      'LiAlH₄ in dry ether',
      'H₂ gas over Pd-BaSO₄ (Rosenmund Reduction)',
      'Zn-Hg and concentrated HCl',
      'KMnO₄ in acidic medium'
    ],
    correctAnswer: 1,
    explanation: 'Hydrogenation of acyl chlorides over palladium poisoned with barium sulphate (Pd-BaSO₄) is the Rosenmund Reduction, stopping reduction selectively at the aldehyde stage.',
    hint: 'Name the poisoned catalyst reaction specific for acyl chlorides to aldehydes.'
  },
  {
    id: 8,
    nodeId: 'c12_chem_cbse_328',
    nodeIds: ['c12_chem_cbse_305', 'c12_chem_cbse_326', 'c12_chem_cbse_327', 'c12_chem_cbse_328', 'c12_chem_cbse_329', 'c12_chem_cbse_330', 'c12_chem_cbse_331', 'c12_chem_cbse_332'],
    question: 'Arrange the following substituted acetic acids in order of INCREASING acid strength (lowest to highest acidity): (I) CH₃COOH, (II) FCH₂COOH, (III) O₂NCH₂COOH, (IV) ClCH₂COOH.',
    options: [
      'I < IV < II < III',
      'III < II < IV < I',
      'I < II < IV < III',
      'IV < I < II < III'
    ],
    correctAnswer: 0,
    explanation: 'Acidity increases with strong electron-withdrawing groups (-I effect): -NO₂ > -F > -Cl > -H. CH₃COOH (pKa 4.76) < ClCH₂COOH (2.86) < FCH₂COOH (2.59) < O₂NCH₂COOH (1.68).',
    hint: 'Stronger electron-withdrawing groups disperse the negative charge on carboxylate better, increasing acidity.'
  }
];

// ==========================================
// MAIN SIMULATION COMPONENT
// ==========================================
export const C12_ChemistryAldehydesKetonesandCarboxylicACBSESim: React.FC = () => {
  // Navigation & View state
  const [currentTab, setCurrentTab] = useState<TabType>('lessons');
  const [slideIndex, setSlideIndex] = useState<number>(0);
  
  // Interactive Mechanism Workbench State
  const [selectedSubstrate, setSelectedSubstrate] = useState<SubstrateType>('ethanal');
  const [selectedNucleophile, setSelectedNucleophile] = useState<NucleophileType>('CN');
  const [attackAngle, setAttackAngle] = useState<number>(107);
  const [mechanismStep, setMechanismStep] = useState<1 | 2 | 3>(1);
  const [isPlayingAnim, setIsPlayingAnim] = useState<boolean>(false);

  // Acidity Analyzer State
  const [aciditySubstituent, setAciditySubstituent] = useState<SubstituentType>('NO2');
  const [acidityPosition, setAcidityPosition] = useState<'alpha' | 'beta' | 'para'>('alpha');

  // Diagnostic Test Visualizer State
  const [activeTest, setActiveTest] = useState<'tollens' | 'fehling' | 'iodoform'>('tollens');
  const [testSubstrate, setTestSubstrate] = useState<'ethanal' | 'propanone' | 'benzaldehyde'>('ethanal');
  const [testResult, setTestResult] = useState<string | null>(null);

  // Challenges & SRS / BKT State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [challengeScores, setChallengeScores] = useState<Record<number, boolean>>({});
  
  // Platform UI feedback states
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // BKT State tracking per node
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // SRS State tracking per node
  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id, 'Chemistry');
    });
    return initial;
  });

  // Ref for Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ------------------------------------------
  // AUDIO & SPEECH INITIALIZATION
  // ------------------------------------------
  useEffect(() => {
    speechManager.speak('Welcome to Aldehydes, Ketones, and Carboxylic Acids Interactive Masterclass.');
  }, []);

  const handleTabChange = (tab: TabType) => {
    audioManager.play('tap');
    setCurrentTab(tab);
    if (tab === 'workbench') {
      speechManager.speak('Nucleophilic addition proceeds via perpendicular attack on the electrophilic carbonyl carbon.');
    } else if (tab === 'acidity') {
      speechManager.speak('Carboxylic acids are strong organic acids because the carboxylate ion delocalizes charge equally across two oxygens.');
    }
  };

  // ------------------------------------------
  // MECHANISM CANVAS ANIMATION ENGINE
  // ------------------------------------------
  useEffect(() => {
    if (currentTab !== 'workbench') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let progress = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      const centerX = width / 2;
      const centerY = height / 2 + 20;

      // Draw Grid / Background
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Geometry coordinates based on mechanism step
      const isTetrahedral = mechanismStep >= 2;
      const oxygenOffsetAngle = isTetrahedral ? -Math.PI / 3 : -Math.PI / 2;
      const angleR1 = isTetrahedral ? (3 * Math.PI) / 4 : (5 * Math.PI) / 6;
      const angleR2 = isTetrahedral ? Math.PI / 4 : Math.PI / 6;

      const bondLength = 90;

      // Carbon nucleus
      const carbonX = centerX;
      const carbonY = centerY;

      // Oxygen nucleus
      const oxX = carbonX + Math.cos(oxygenOffsetAngle) * bondLength;
      const oxY = carbonY + Math.sin(oxygenOffsetAngle) * bondLength;

      // R1 & R2
      const r1X = carbonX + Math.cos(angleR1) * bondLength;
      const r1Y = carbonY + Math.sin(angleR1) * bondLength;
      const r2X = carbonX + Math.cos(angleR2) * bondLength;
      const r2Y = carbonY + Math.sin(angleR2) * bondLength;

      // Draw Orbitals / Electron Cloud
      ctx.save();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      
      // Upper π lobe
      ctx.beginPath();
      ctx.ellipse(carbonX, carbonY - 45, 35, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Lower π lobe
      ctx.beginPath();
      ctx.ellipse(carbonX, carbonY + 45, 35, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Draw Double / Single Bond to Oxygen
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(carbonX, carbonY);
      ctx.lineTo(oxX, oxY);
      ctx.stroke();

      if (!isTetrahedral) {
        // Second bond of C=O double bond
        ctx.strokeStyle = '#fb7185';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(carbonX + 12, carbonY);
        ctx.lineTo(oxX + 12, oxY);
        ctx.stroke();
      }

      // Draw Bonds to R1 and R2
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(carbonX, carbonY);
      ctx.lineTo(r1X, r1Y);
      ctx.moveTo(carbonX, carbonY);
      ctx.lineTo(r2X, r2Y);
      ctx.stroke();

      // Draw Atoms (C, O, R1, R2)
      // Carbon Atom
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(carbonX, carbonY, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('C', carbonX, carbonY);

      // Carbon Partial Charge
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('δ+', carbonX + 28, carbonY + 15);

      // Oxygen Atom
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(oxX, oxY, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('O', oxX, oxY);

      // Oxygen Partial Charge / Formal Charge
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(isTetrahedral ? '(-)' : 'δ-', oxX + 28, oxY - 10);

      // R1 & R2 Labels
      const r1Label = selectedSubstrate === 'formaldehyde' ? 'H' : selectedSubstrate === 'benzaldehyde' ? 'C₆H₅' : 'CH₃';
      const r2Label = selectedSubstrate === 'propanone' ? 'CH₃' : 'H';

      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(r1X, r1Y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(r1Label, r1X, r1Y);

      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(r2X, r2Y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(r2Label, r2X, r2Y);

      // Nucleophile Trajectory and Attack Position
      const radAttack = (attackAngle * Math.PI) / 180;
      const nuDist = mechanismStep === 1 ? 160 : 85;
      const nuX = carbonX + Math.cos(radAttack) * nuDist;
      const nuY = carbonY + Math.sin(radAttack) * nuDist;

      // Draw Nucleophile Attack Trajectory Line
      if (mechanismStep === 1) {
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(carbonX, carbonY);
        ctx.lineTo(nuX, nuY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Curved Electron Arrow
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(carbonX + 5, carbonY - 20, 25, 0, Math.PI, true);
        ctx.stroke();
      }

      // Nucleophile Bond (if formed)
      if (mechanismStep >= 2) {
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(carbonX, carbonY);
        ctx.lineTo(nuX, nuY);
        ctx.stroke();
      }

      // Draw Nucleophile Particle
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(nuX, nuY, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(selectedNucleophile === 'CN' ? 'CN⁻' : selectedNucleophile === 'RMgX' ? 'R⁻' : 'Nu⁻', nuX, nuY);

      // Draw Angle Arc
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(carbonX, carbonY, 40, -Math.PI / 2, radAttack);
      ctx.stroke();
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px monospace';
      ctx.fillText(`${attackAngle}°`, carbonX + 45, carbonY + 10);

      if (isPlayingAnim) {
        progress += 0.02;
        if (progress > 1) {
          setIsPlayingAnim(false);
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [currentTab, selectedSubstrate, selectedNucleophile, attackAngle, mechanismStep, isPlayingAnim]);

  // ------------------------------------------
  // INTERACTIVE TEST ENGINE (Tollens/Fehling/Iodoform)
  // ------------------------------------------
  const runDiagnosticTest = () => {
    audioManager.play('chime');
    let positive = false;
    let message = '';

    if (activeTest === 'tollens') {
      if (testSubstrate === 'ethanal' || testSubstrate === 'benzaldehyde') {
        positive = true;
        message = 'POSITIVE: Bright Silver Mirror formed on inner glass surface! [Ag⁺ reduced to Ag⁰]';
      } else {
        positive = false;
        message = 'NEGATIVE: Ketones do not reduce Tollens reagent under standard conditions.';
      }
    } else if (activeTest === 'fehling') {
      if (testSubstrate === 'ethanal') {
        positive = true;
        message = 'POSITIVE: Reddish-brown precipitate of Cu₂O formed! (Aliphatic aldehyde oxidized)';
      } else {
        positive = false;
        message = 'NEGATIVE: Benzaldehyde (aromatic) and Propanone (ketone) do not reduce Fehling solution.';
      }
    } else if (activeTest === 'iodoform') {
      if (testSubstrate === 'ethanal' || testSubstrate === 'propanone') {
        positive = true;
        message = 'POSITIVE: Bright yellow crystalline precipitate of Iodoform (CHI₃) formed!';
      } else {
        positive = false;
        message = 'NEGATIVE: Benzaldehyde lacks the CH₃C=O group required for iodoform reaction.';
      }
    }

    setTestResult(message);
    speechManager.speak(message);
  };

  // ------------------------------------------
  // CALCULATED ACIDITY VALUES (pKa)
  // ------------------------------------------
  const calculatedPka = useMemo(() => {
    let basePka = 4.76; // Acetic acid base
    if (aciditySubstituent === 'NO2') basePka -= 3.08;
    else if (aciditySubstituent === 'F') basePka -= 2.17;
    else if (aciditySubstituent === 'Cl') basePka -= 1.90;
    else if (aciditySubstituent === 'Br') basePka -= 1.86;
    else if (aciditySubstituent === 'I') basePka -= 1.60;
    else if (aciditySubstituent === 'CH3') basePka += 0.12;
    else if (aciditySubstituent === 'OCH3') basePka += 0.20;

    if (acidityPosition === 'beta') basePka += 0.8;
    if (acidityPosition === 'para') basePka += 0.3;

    return Number(basePka.toFixed(2));
  }, [aciditySubstituent, acidityPosition]);

  // ------------------------------------------
  // HANDLERS FOR CHALLENGE SUBMISSION
  // ------------------------------------------
  const handleAnswerSubmit = (optionIdx: number) => {
    if (showAnswerFeedback) return;
    setSelectedOption(optionIdx);
    setShowAnswerFeedback(true);

    const challenge = CHALLENGE_QUESTIONS[currentChallengeIdx];
    const isCorrect = optionIdx === challenge.correctAnswer;

    // Update Scores
    setChallengeScores(prev => ({ ...prev, [challenge.id]: isCorrect }));

    // BKT & SRS Updates for all linked node IDs
    const updatedBkt = { ...bktMap };
    const updatedSrs = { ...srsMap };

    challenge.nodeIds.forEach(nodeId => {
      if (updatedBkt[nodeId]) {
        updatedBkt[nodeId] = bktUpdate(updatedBkt[nodeId], isCorrect);
      }
      if (updatedSrs[nodeId]) {
        updatedSrs[nodeId] = sm2Update(updatedSrs[nodeId], isCorrect ? 5 : 2, 0);
      }
    });

    setBktMap(updatedBkt);
    setSrsMap(updatedSrs);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      speechManager.speak('Correct answer! Excellent chemistry reasoning.');
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect answer. Review the concept explanation below.');
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('pop');
    setShowAnswerFeedback(false);
    setSelectedOption(null);
    setShowHint(false);

    if (currentChallengeIdx < CHALLENGE_QUESTIONS.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      speechManager.speak('Great job! You have completed all challenges for this chapter.');

      // Record total score
      const totalCorrect = Object.values(challengeScores).filter(Boolean).length;
      recordGameScore([...ALL_NODE_IDS], totalCorrect * 125);
    }
  };

  const currentChallenge = CHALLENGE_QUESTIONS[currentChallengeIdx];

  // ==========================================
  // RENDER UI
  // ==========================================
  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-12">
      {/* Header Banner */}
      <header className="w-full bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-cyan-500/20">
            C=O
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              Aldehydes, Ketones & Carboxylic Acids
            </h1>
            <p className="text-xs text-slate-400">Class 12 CBSE Chemistry • NCERT Interactive Masterclass</p>
          </div>
        </div>

        {/* Tab Selector */}
        <nav className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabChange('lessons')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'lessons'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            📖 Interactive Lessons
          </button>
          <button
            onClick={() => handleTabChange('workbench')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'workbench'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            ⚛️ Reaction Workbench
          </button>
          <button
            onClick={() => handleTabChange('acidity')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'acidity'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            🧪 Acidity & Diagnostic Tests
          </button>
          <button
            onClick={() => handleTabChange('challenges')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'challenges'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            🎯 CBSE Practice ({Object.keys(challengeScores).length}/8)
          </button>
        </nav>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 flex flex-col gap-6">
        {/* ================= TAB 1: LESSONS ================= */}
        {currentTab === 'lessons' && (
          <div className="flex flex-col gap-6">
            {/* Slide Navigation Header */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-sm font-semibold text-cyan-400">
                Slide {slideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={slideIndex === 0}
                  onClick={() => {
                    audioManager.play('swoop');
                    setSlideIndex(prev => prev - 1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700 text-xs font-bold"
                >
                  ← Previous
                </button>
                <button
                  disabled={slideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    audioManager.play('swoop');
                    setSlideIndex(prev => prev + 1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white disabled:opacity-40 hover:bg-cyan-500 text-xs font-bold"
                >
                  Next Slide →
                </button>
              </div>
            </div>

            {/* Slide Card Content */}
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl flex flex-col gap-6"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-100">{TEACHING_SLIDES[slideIndex].title}</h2>
                <p className="text-xs font-mono text-cyan-400 mt-1">{TEACHING_SLIDES[slideIndex].subtitle}</p>
              </div>

              {/* Diagrams / Visuals per slide */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
                {/* SVG Visualizations */}
                {slideIndex === 0 && (
                  <div className="flex flex-col items-center justify-center p-4">
                    <svg viewBox="0 0 300 200" className="w-full h-48 max-w-xs">
                      {/* C=O Orbital Hybridization Diagram */}
                      <ellipse cx="150" cy="70" rx="35" ry="18" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeDasharray="3,3" />
                      <ellipse cx="150" cy="130" rx="35" ry="18" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeDasharray="3,3" />
                      <line x1="120" y1="100" x2="180" y2="100" stroke="#f43f5e" strokeWidth="4" />
                      <circle cx="110" cy="100" r="18" fill="#38bdf8" />
                      <text x="110" y="104" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">C</text>
                      <circle cx="190" cy="100" r="18" fill="#f43f5e" />
                      <text x="190" y="104" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">O</text>
                      <text x="110" y="130" textAnchor="middle" fill="#38bdf8" fontSize="10">sp² (120°)</text>
                      <text x="190" y="70" textAnchor="middle" fill="#f43f5e" fontSize="10">δ-</text>
                      <text x="110" y="70" textAnchor="middle" fill="#38bdf8" fontSize="10">δ+</text>
                    </svg>
                    <p className="text-xs text-center text-slate-400 mt-2">Carbonyl Group: Planar σ-framework with perpendicular π-cloud overlap.</p>
                  </div>
                )}

                {slideIndex === 1 && (
                  <div className="flex flex-col items-center justify-center p-4">
                    <svg viewBox="0 0 300 200" className="w-full h-48 max-w-xs">
                      {/* Nucleophilic attack arrow */}
                      <circle cx="150" cy="100" r="16" fill="#38bdf8" />
                      <text x="150" y="104" textAnchor="middle" fill="#0f172a" fontWeight="bold">C</text>
                      <circle cx="210" cy="100" r="16" fill="#f43f5e" />
                      <text x="210" y="104" textAnchor="middle" fill="#ffffff" fontWeight="bold">O</text>
                      <circle cx="90" cy="40" r="16" fill="#a855f7" />
                      <text x="90" y="44" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Nu⁻</text>
                      <path d="M 105 50 Q 130 70 145 88" fill="none" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow)" />
                      <text x="160" y="55" fill="#f8fafc" fontSize="11" fontFamily="monospace">107° Attack</text>
                    </svg>
                    <p className="text-xs text-center text-slate-400 mt-2">Bürgi-Dunitz Angle (~107°): Optimal attack path into π* antibonding orbital.</p>
                  </div>
                )}

                {slideIndex === 2 && (
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="w-12 h-16 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-slate-300 font-bold">
                          Ag
                        </div>
                        <span className="text-[10px] text-cyan-400">Tollens Mirror</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-16 bg-red-900/60 rounded border border-red-700 flex items-center justify-center text-red-200 font-bold">
                          Cu₂O
                        </div>
                        <span className="text-[10px] text-red-400">Fehling Red</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-16 bg-yellow-900/60 rounded border border-yellow-700 flex items-center justify-center text-yellow-200 font-bold">
                          CHI₃
                        </div>
                        <span className="text-[10px] text-yellow-400">Iodoform Yellow</span>
                      </div>
                    </div>
                  </div>
                )}

                {slideIndex === 3 && (
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center w-full">
                      <span className="text-xs font-bold text-cyan-400">Aldol vs Cannizzaro Decision Rule</span>
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                        <div className="p-2 bg-slate-800 rounded">
                          <p className="font-bold text-emerald-400">α-H Present</p>
                          <p className="text-[10px] text-slate-400">Undergoes Aldol Condensation</p>
                        </div>
                        <div className="p-2 bg-slate-800 rounded">
                          <p className="font-bold text-purple-400">NO α-H</p>
                          <p className="text-[10px] text-slate-400">Undergoes Cannizzaro Reaction</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slideIndex === 4 && (
                  <div className="flex flex-col items-center justify-center p-4">
                    <svg viewBox="0 0 300 150" className="w-full h-36">
                      {/* Carboxylate Resonance */}
                      <text x="30" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold">R-C</text>
                      <text x="70" y="45" fill="#f43f5e" fontSize="14" fontWeight="bold">=O</text>
                      <text x="70" y="95" fill="#f43f5e" fontSize="14" fontWeight="bold">-O⁻</text>
                      <text x="120" y="70" fill="#e2e8f0" fontSize="18" fontWeight="bold">↔</text>
                      <text x="160" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold">R-C</text>
                      <text x="200" y="45" fill="#f43f5e" fontSize="14" fontWeight="bold">-O⁻</text>
                      <text x="200" y="95" fill="#f43f5e" fontSize="14" fontWeight="bold">=O</text>
                    </svg>
                    <p className="text-xs text-center text-slate-400">Equivalent Carboxylate Resonance Structures Delocalize Charge.</p>
                  </div>
                )}

                {/* Text Explanations */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-slate-200">Key CBSE NCERT Concepts:</h3>
                  <ul className="list-disc list-inside space-y-2 text-xs text-slate-300">
                    {TEACHING_SLIDES[slideIndex].content.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Formula / Reactions Box */}
              <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-800/50 flex flex-col gap-1">
                <span className="text-xs font-mono font-bold text-cyan-300">Reaction / Chemical Equation:</span>
                <code className="text-sm font-mono text-cyan-100">{TEACHING_SLIDES[slideIndex].formula}</code>
              </div>
            </motion.div>
          </div>
        )}

        {/* ================= TAB 2: REACTION WORKBENCH ================= */}
        {currentTab === 'workbench' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Control Panel */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col gap-5">
              <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
                ⚛️ Substrate & Nucleophile
              </h2>

              {/* Substrate Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400">Select Carbonyl Substrate:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['ethanal', 'propanone', 'benzaldehyde', 'formaldehyde'] as SubstrateType[]).map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        audioManager.play('pop');
                        setSelectedSubstrate(sub);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold border capitalize transition-all ${
                        selectedSubstrate === sub
                          ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nucleophile Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400">Select Attacking Reagent / Nu⁻:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['CN', 'RMgX', 'NaHSO3', 'H2N-OH'] as NucleophileType[]).map(nu => (
                    <button
                      key={nu}
                      onClick={() => {
                        audioManager.play('pop');
                        setSelectedNucleophile(nu);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedNucleophile === nu
                          ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {nu === 'CN' ? 'HCN (CN⁻)' : nu === 'RMgX' ? 'Grignard (R⁻)' : nu === 'NaHSO3' ? 'NaHSO₃' : 'Hydroxylamine'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attack Trajectory Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-400">Attack Angle (Bürgi-Dunitz):</span>
                  <span className="font-mono text-cyan-400 font-bold">{attackAngle}°</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="135"
                  value={attackAngle}
                  onChange={e => {
                    audioManager.play('tap');
                    setAttackAngle(Number(e.target.value));
                  }}
                  className="w-full accent-cyan-500 cursor-pointer bg-slate-950 rounded-lg h-2"
                />
                <p className="text-[11px] text-slate-500">NCERT Note: Perpendicular trajectory (~107°) maximizes orbital overlap with π*.</p>
              </div>

              {/* Mechanism Step Controls */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-400">Reaction Mechanism Step:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setMechanismStep(1);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                      mechanismStep === 1 ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    1. Attack
                  </button>
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setMechanismStep(2);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                      mechanismStep === 2 ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    2. Tetrahedral
                  </button>
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setMechanismStep(3);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                      mechanismStep === 3 ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    3. Product
                  </button>
                </div>
              </div>
            </div>

            {/* Canvas Interactive Simulation */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col gap-4 items-center justify-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  2D Dynamic Reaction Trajectory Canvas
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Hybridization: {mechanismStep === 1 ? 'sp² (Planar 120°)' : 'sp³ (Tetrahedral 109.5°)'}
                </span>
              </div>

              <canvas
                ref={canvasRef}
                width={500}
                height={320}
                className="w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner"
              />

              {/* Dynamic Mechanism Description Box */}
              <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                {mechanismStep === 1 && (
                  <p>
                    <strong className="text-purple-400">Step 1: Nucleophilic Attack.</strong> Reagent Nu⁻ approaches the electrophilic carbonyl carbon at an angle of {attackAngle}° to the C=O plane.
                  </p>
                )}
                {mechanismStep === 2 && (
                  <p>
                    <strong className="text-cyan-400">Step 2: Tetrahedral Intermediate.</strong> Carbon hybridization changes from sp² to sp³, creating a alkoxide anion intermediate with a full negative charge on oxygen.
                  </p>
                )}
                {mechanismStep === 3 && (
                  <p>
                    <strong className="text-emerald-400">Step 3: Protonation & Final Addition Product.</strong> The alkoxide anion captures a proton (H⁺) from the solvent to yield the stable neutral addition product.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ACIDITY & DIAGNOSTIC TESTS ================= */}
        {currentTab === 'acidity' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Acidity Substituted Acid Calculator */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col gap-5">
              <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
                🧪 Substituent Effect on Carboxylic Acid Strength
              </h2>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-slate-400">Select Substituent Group:</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['NO2', 'F', 'Cl', 'Br', 'I', 'H', 'CH3', 'OCH3'] as SubstituentType[]).map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        audioManager.play('pop');
                        setAciditySubstituent(sub);
                      }}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        aciditySubstituent === sub
                          ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      -{sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated pKa Bar */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Calculated Acid Strength (pKa):</span>
                  <span className="text-2xl font-black text-cyan-400">{calculatedPka}</span>
                </div>

                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                  <div
                    className="bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(10, (calculatedPka / 6) * 100))}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Strong Acid (Low pKa ~1.5)</span>
                  <span>Weak Acid (High pKa ~5.0)</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <p>
                  <strong className="text-cyan-400">Electron Withdrawing Groups (-I, -R):</strong> Disperse negative charge on RCOO⁻ → Stabilize conjugate base → <strong>INCREASE Acidity</strong>.
                </p>
                <p>
                  <strong className="text-rose-400">Electron Donating Groups (+I):</strong> Intensify negative charge on RCOO⁻ → Destabilize conjugate base → <strong>DECREASE Acidity</strong>.
                </p>
              </div>
            </div>

            {/* Diagnostic Reaction Tube Simulator */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col gap-5">
              <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
                🧪 Organic Qualitative Laboratory Tests
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveTest('tollens');
                    setTestResult(null);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                    activeTest === 'tollens' ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Tollens' Test
                </button>
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveTest('fehling');
                    setTestResult(null);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                    activeTest === 'fehling' ? 'bg-red-600 text-white border-red-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Fehling's Test
                </button>
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveTest('iodoform');
                    setTestResult(null);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                    activeTest === 'iodoform' ? 'bg-yellow-600 text-white border-yellow-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Iodoform Test
                </button>
              </div>

              {/* Substrate Selector for Test */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400">Select Test Compound:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['ethanal', 'propanone', 'benzaldehyde'] as const).map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        audioManager.play('pop');
                        setTestSubstrate(sub);
                        setTestResult(null);
                      }}
                      className={`p-2 rounded-xl text-xs font-bold capitalize border ${
                        testSubstrate === sub ? 'bg-slate-800 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Run Test Action */}
              <button
                onClick={runDiagnosticTest}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg hover:brightness-110 active:scale-[0.98] transition-all text-xs"
              >
                ▶ Run Reaction Test in Beaker
              </button>

              {/* Test Output Observation Box */}
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-950 p-4 rounded-xl border border-cyan-800/80 text-xs text-slate-200"
                >
                  <p className="font-bold text-cyan-400 mb-1">Laboratory Observation:</p>
                  <p>{testResult}</p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: PRACTICE CHALLENGES ================= */}
        {currentTab === 'challenges' && (
          <div className="max-w-3xl mx-auto w-full bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl flex flex-col gap-6">
            {/* Progress Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  CBSE Mastery Challenge {currentChallengeIdx + 1} of {CHALLENGE_QUESTIONS.length}
                </span>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Node: {currentChallenge.nodeId}</p>
              </div>

              {/* Score Pills */}
              <div className="flex gap-1">
                {CHALLENGE_QUESTIONS.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`w-6 h-2 rounded-full transition-all ${
                      challengeScores[q.id] === true
                        ? 'bg-emerald-500'
                        : challengeScores[q.id] === false
                        ? 'bg-rose-500'
                        : idx === currentChallengeIdx
                        ? 'bg-cyan-400 animate-pulse'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Card */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
                {currentChallenge.question}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {currentChallenge.options.map((optionText, idx) => {
                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (showAnswerFeedback) {
                    if (idx === currentChallenge.correctAnswer) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showAnswerFeedback}
                      onClick={() => handleAnswerSubmit(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{optionText}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hint & Feedback Section */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  audioManager.play('chime');
                  setShowHint(prev => !prev);
                }}
                className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
              >
                💡 {showHint ? 'Hide CBSE Hint' : 'Show CBSE Hint'}
              </button>

              {showAnswerFeedback && (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white text-xs hover:brightness-110 active:scale-95 transition-all shadow-md"
                >
                  {currentChallengeIdx < CHALLENGE_QUESTIONS.length - 1 ? 'Next Question →' : 'Complete Challenge Module 🎉'}
                </button>
              )}
            </div>

            {/* Hint Box */}
            {showHint && (
      <HintBubble show={showHint} text={currentChallenge.hint} />
            )}

            {/* Answer Explanation Box */}
            {showAnswerFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  selectedOption === currentChallenge.correctAnswer
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                }`}
              >
                <p className="font-bold mb-1">
                  {selectedOption === currentChallenge.correctAnswer ? '✓ Correct Explanation:' : '✗ Concept Explanation:'}
                </p>
                <p>{currentChallenge.explanation}</p>
              </motion.div>
            )}
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

      {/* Platform Animation & Feedback Overlays */}
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="CBSE Masterclass Completed!" />
    </div>
  );
};

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 12 Aldehydes, Ketones & Carboxylic Acids Lab',
  subtitle: 'Master Carbonyl Chemistry, Nucleophilic Addition, and Aldol Condensation',
  description: 'Step into a virtual organic synthesis lab where you prepare aldehydes and ketones, run nucleophilic addition reactions, and perform Aldol condensation.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Carbonyl Reactivity Puzzle',
  question: 'Why are aldehydes more reactive than ketones toward nucleophilic addition reactions?',
  options: [
    'Aldehydes have lower molecular weight',
    'Aldehydes have one alkyl group (electron-donating) vs ketones with two, so aldehydes have less steric hindrance and more electrophilic carbonyl carbon',
    'Aldehydes are more acidic than ketones',
    'Ketones have stronger C=O bonds than aldehydes'
],
  correctIndex: 1,
  explanation: 'Aldehydes are more reactive because: (1) Steric factor - aldehydes have only one alkyl group vs two in ketones, making the carbonyl carbon more accessible. (2) Electronic factor - alkyl groups are electron-donating, reducing the electrophilicity of the carbonyl carbon. Ketones with two alkyl groups have less electrophilic carbon.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "preparation",
    "name": "Preparation Lab",
    "description": "Prepare aldehydes by Rosenmund reduction and ketones from acyl chlorides."
  },
  {
    "id": "addition",
    "name": "Nucleophilic Addition Lab",
    "description": "Run HCN, NaHSO3, and Grignard addition reactions."
  },
  {
    "id": "condensation",
    "name": "Aldol & Cannizzaro Lab",
    "description": "Perform Aldol condensation and Cannizzaro reactions."
  },
  {
    "id": "acidity",
    "name": "Carboxylic Acid Acidity Lab",
    "description": "Study acidity of carboxylic acids and substituent effects."
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
    "title": "Confusing Alpha-Hydrogen Requirement in Aldol and Cannizzaro Reactions",
    "description": "Students often believe that any aldehyde can undergo both Aldol condensation and Cannizzaro reaction depending solely on the strength of the base used.",
    "correction": "Aldol condensation requires aldehydes or ketones with at least one alpha-hydrogen atom, which acts as an acidic proton to form an enolate ion intermediate. In contrast, the Cannizzaro reaction is a disproportionation reaction specific to aldehydes lacking alpha-hydrogens, such as formaldehyde or benzaldehyde, when treated with concentrated alkali. Therefore, the presence or absence of an alpha-hydrogen dictates which reaction path the compound will follow."
  },
  {
    "id": "misc_2",
    "title": "Assuming Carbonyl Double Bonds Undergo Electrophilic Addition Like Alkenes",
    "description": "Students frequently assume that because carbonyl compounds contain a carbon-oxygen double bond, they undergo electrophilic addition reactions similar to carbon-carbon double bonds in alkenes.",
    "correction": "Unlike alkenes which possess non-polar double bonds and attract electrophiles, the carbon-oxygen double bond in carbonyls is highly polar due to the higher electronegativity of oxygen. This polarization creates an electron-deficient carbonyl carbon that is susceptible to initial attack by nucleophiles. Thus, nucleophilic addition, rather than electrophilic addition, is the characteristic reaction of aldehydes and ketones."
  },
  {
    "id": "misc_3",
    "title": "Electron-Donating Groups Increase Carboxylic Acid Acidity by Releasing Hydrogens",
    "description": "Students often incorrectly assume that electron-donating groups (+I effect) enhance the acidity of carboxylic acids by supplying more electron density to push out the proton easily.",
    "correction": "Electron-donating groups actually decrease acidity because they intensify the negative charge on the carboxylate anion, destabilizing it. Conversely, electron-withdrawing groups (-I effect) withdraw electron density, helping to disperse the negative charge across the conjugate base. This stabilization of the carboxylate anion makes the parent carboxylic acid significantly more acidic."
  },
  {
    "id": "misc_4",
    "title": "Believing Hydroxyl Group in Esterification Originates from the Alcohol",
    "description": "Students typically assume that during acid-catalyzed esterification, the alcohol molecule loses its complete hydroxyl (-OH) group while the carboxylic acid contributes only a hydrogen ion.",
    "correction": "Isotopic labeling experiments using Oxygen-18 demonstrate that the hydroxyl (-OH) group is actually cleaved from the carboxylic acid molecule during esterification. The alcohol molecule contributes only its acidic proton (-H+), leaving its alkoxy oxygen intact to form the ester bond. Thus, the oxygen atom in the ester's alkoxy component (-OR) originates entirely from the alcohol."
  },
  {
    "id": "misc_5",
    "title": "Believing Ketones Are More Reactive Than Aldehydes in Nucleophilic Addition",
    "description": "Students sometimes think that ketones are more reactive towards nucleophiles than aldehydes because ketones have two alkyl groups that can better stabilize the reaction intermediate.",
    "correction": "Aldehydes are generally far more reactive than ketones towards nucleophilic addition due to steric and electronic factors. Sterically, aldehydes have only one bulky alkyl group, offering less hindrance to the approaching nucleophile compared to the two alkyl groups in ketones. Electronically, two alkyl groups in ketones donate electron density via the +I effect, reducing the electrophilicity of the carbonyl carbon more than the single alkyl group in aldehydes."
  }
];


export default C12_ChemistryAldehydesKetonesandCarboxylicACBSESim;