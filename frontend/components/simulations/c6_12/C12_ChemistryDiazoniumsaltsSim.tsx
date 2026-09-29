"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================
const NODE_DIAZONIUM = 'c12_chem_081';
const NODE_CARBOHYDRATES = 'c12_chem_082';
const NODE_PROTEINS = 'c12_chem_083';
const NODE_NUCLEIC = 'c12_chem_084';
const NODE_VITAMINS = 'c12_chem_085';
const NODE_POLYMERS_CLASS = 'c12_chem_086';
const NODE_POLYMERISATION_METHODS = 'c12_chem_087';
const NODE_SPECIFIC_POLYMERS = 'c12_chem_088';
const NODE_BIODEGRADABLE = 'c12_chem_089';
const NODE_DRUGS = 'c12_chem_090';

const ALL_NODE_IDS = [
  NODE_DIAZONIUM,
  NODE_CARBOHYDRATES,
  NODE_PROTEINS,
  NODE_NUCLEIC,
  NODE_VITAMINS,
  NODE_POLYMERS_CLASS,
  NODE_POLYMERISATION_METHODS,
  NODE_SPECIFIC_POLYMERS,
  NODE_BIODEGRADABLE,
  NODE_DRUGS,
];

// ==========================================
// TYPES & INTERFACES
// ==========================================
type ActiveTab = 'discovery' | 'lab' | 'challenges' | 'summary';
type Workstation = 'diazonium' | 'biomolecules' | 'polymers' | 'drugs';

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
}

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'ISC Class 12 Advanced Organic & Biochemistry Lab',
  subtitle: 'Master Organic Syntheses, Biomolecules, Polymers, and Medicinal Chemistry',
  description:
    'Step into a virtual research suite where you control diazotisation temperature, construct carbohydrates and proteins, synthesize high-tech polymers, and test modern pharmaceuticals.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Skater on Thin Ice',
  question:
    'Aniline is treated with NaNO2 and HCl in an ice-salt bath (0-5°C) to form Benzenediazonium chloride (C6H5N2+Cl-). What happens if you remove the ice bath and let the mixture warm to 25°C?',
  options: [
    'The diazonium salt becomes completely stable and forms crystals.',
    'It rapidly decomposes, releasing N2 gas and reacting with water to form Phenol.',
    'It transforms directly into Chlorobenzene without any gas release.',
    'The amino group is restored back to Aniline.',
  ],
  correctIndex: 1,
  explanation:
    'Diazonium salts are kinetically stable only below 5°C. At higher temperatures, the excellent leaving group N2 gas departs rapidly, and the cation reacts with surrounding water to yield Phenol (C6H5OH + N2 + HCl).',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    id: 'diazonium' as Workstation,
    name: 'Diazonium Lab',
    nodeIds: [NODE_DIAZONIUM],
    description: 'Synthesize Ar-N2+Cl- at 0-5°C and run Sandmeyer, Balz-Schiemann, and Coupling reactions.',
  },
  {
    id: 'biomolecules' as Workstation,
    name: 'Biomolecules Suite',
    nodeIds: [NODE_CARBOHYDRATES, NODE_PROTEINS, NODE_NUCLEIC, NODE_VITAMINS],
    description: 'Explore Glucose vs Fructose, Zwitterions & Denaturation, DNA Helix, and Vitamin Classification.',
  },
  {
    id: 'polymers' as Workstation,
    name: 'Polymer Engineering',
    nodeIds: [NODE_POLYMERS_CLASS, NODE_POLYMERISATION_METHODS, NODE_SPECIFIC_POLYMERS, NODE_BIODEGRADABLE],
    description: 'Simulate Addition vs Condensation, Thermoplastics vs Thermosets, Nylon, HDPE, and PHBV breakdown.',
  },
  {
    id: 'drugs' as Workstation,
    name: 'Medicinal Chemistry',
    nodeIds: [NODE_DRUGS],
    description: 'Examine Analgesics, Antipyretics, Antacids, Antibiotics, and Drug-Target Receptor binding.',
  },
];

// ==========================================
// CHALLENGES (10+ Progressive Items)
// ==========================================
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_DIAZONIUM,
    title: 'Diazotisation & Temperature Control',
    question: 'To convert Aniline into Benzenediazonium chloride in high yield, which condition is CRITICAL?',
    options: [
      'Refluxing at 100°C with concentrated H2SO4',
      'Maintaining 0-5°C temperature using an ice-salt bath with NaNO2 + HCl',
      'Adding Cu powder at room temperature without acid',
      'Bubbling pure N2 gas at 50°C',
    ],
    correctIndex: 1,
    explanation:
      'Diazotisation requires NaNO2 + HCl (generating HNO2 in situ) at 0-5°C. Above 5°C, the diazonium cation decomposes to phenol and N2 gas.',
    hint: 'Think about kinetic stability of the N2+ leaving group in water.',
    difficulty: 'foundation',
  },
  {
    id: 'ch_02',
    nodeId: NODE_DIAZONIUM,
    title: 'Azo Dye Synthesis',
    question: 'Benzenediazonium chloride couples with Phenol in an alkaline medium to yield:',
    options: [
      'p-Aminoazobenzene (Yellow dye)',
      'p-Hydroxyazobenzene (Bright Orange dye)',
      'Chlorobenzene + N2',
      'Fluorobenzene + BF3',
    ],
    correctIndex: 1,
    explanation:
      'In alkaline medium, phenol exists as phenoxide ion (C6H5O-), which strongly activates the para position for electrophilic attack by Ar-N2+, producing orange p-hydroxyazobenzene.',
    hint: 'Phenoxide ion activates the aromatic ring toward weak electrophiles.',
    difficulty: 'standard',
  },
  {
    id: 'ch_03',
    nodeId: NODE_CARBOHYDRATES,
    title: 'Aldose vs Ketose Differentiation',
    question: 'Why does Glucose decolourise Bromine water while Fructose does not?',
    options: [
      'Glucose is a disaccharide while Fructose is a monosaccharide.',
      'Bromine water is a mild oxidising agent that oxidises the aldehyde group in Glucose to Gluconic acid; Ketoses like Fructose do not react.',
      'Fructose forms an insoluble osazone that protects its ring.',
      'Glucose has a ketone group that reduces bromine to bromide.',
    ],
    correctIndex: 1,
    explanation:
      'Bromine water is a mild oxidant specific for aldoses (-CHO to -COOH). Glucose forms gluconic acid (C6H12O7). Fructose is a ketohexose and resists mild oxidation by Br2/H2O.',
    hint: 'Look at the C-1 functional group of an aldohexose vs ketohexose.',
    difficulty: 'standard',
  },
  {
    id: 'ch_04',
    nodeId: NODE_CARBOHYDRATES,
    title: 'Reducing vs Non-Reducing Sugars',
    question: 'Why is Sucrose classified as a non-reducing sugar?',
    options: [
      'It contains no oxygen atoms in its structure.',
      'It cannot be hydrolysed by dilute acids.',
      'Both anomeric carbons (C-1 of glucose and C-2 of fructose) are tied up in the alpha-1,2-glycosidic bond, leaving no free hemiacetal/hemiketal group.',
      'It contains only beta-1,4-glycosidic bonds.',
    ],
    correctIndex: 2,
    explanation:
      'A sugar is reducing if it has a free anomeric carbon that can open into a free carbonyl. In sucrose, C-1 of glucose and C-2 of fructose form the glycosidic bond, locking both rings.',
    hint: 'Check if anomeric carbons are free to open into aldehyde or ketone forms.',
    difficulty: 'standard',
  },
  {
    id: 'ch_05',
    nodeId: NODE_PROTEINS,
    title: 'Isoelectric Point & Zwitterion',
    question: 'At its Isoelectric Point (pI), an amino acid in aqueous solution:',
    options: [
      'Has a net positive charge and moves to the cathode.',
      'Has a net negative charge and moves to the anode.',
      'Exists predominantly as a Zwitterion (H3N+-CHR-COO-) with net electrical neutrality.',
      'Has its peptide bonds completely hydrolysed into ammonia.',
    ],
    correctIndex: 2,
    explanation:
      'At the isoelectric point, internal proton transfer gives H3N+-CHR-COO-. The positive and negative charges balance exactly, resulting in zero net charge and minimum solubility.',
    hint: 'Zwitterion carries dipolar charges (+ and -) that sum to zero.',
    difficulty: 'foundation',
  },
  {
    id: 'ch_06',
    nodeId: NODE_PROTEINS,
    title: 'Protein Denaturation Chemistry',
    question: 'When milk curdles to form Paneer upon heating with lemon juice, what happens at the molecular level?',
    options: [
      'Covalent peptide bonds break, converting casein into free amino acids.',
      'Secondary and tertiary structures are disrupted by heat and pH change, exposing hydrophobic groups and causing coagulation while primary structure remains intact.',
      'Primary amino acid sequence is completely rearranged.',
      'All hydrogen bonds convert into disulphide bridges.',
    ],
    correctIndex: 1,
    explanation:
      'Denaturation disrupts secondary, tertiary, and quaternary structures (hydrogen bonds, ionic interactions). The covalent peptide bonds of the primary sequence remain unbroken.',
    hint: 'Primary structure (sequence of peptide bonds) is strong and survives denaturation.',
    difficulty: 'standard',
  },
  {
    id: 'ch_07',
    nodeId: NODE_NUCLEIC,
    title: 'Chargaff Rule & DNA Stability',
    question: 'A double-stranded DNA sample contains 28% Adenine. What is the percentage of Cytosine in this sample?',
    options: ['28%', '22%', '44%', '56%'],
    correctIndex: 1,
    explanation:
      'According to Chargaff’s rules: %A = %T = 28%. So A + T = 56%. The remaining 44% is split equally between G and C (%G = %C). Thus %C = 44% / 2 = 22%.',
    hint: 'A pairs with T (2 H-bonds) and G pairs with C (3 H-bonds). Total sum = 100%.',
    difficulty: 'advanced',
  },
  {
    id: 'ch_08',
    nodeId: NODE_VITAMINS,
    title: 'Vitamin Classification & Deficiency',
    question: 'Which of the following pairs correctly matches the vitamin, its solubility class, and its deficiency disease?',
    options: [
      'Vitamin C — Fat-soluble — Beriberi',
      'Vitamin A — Fat-soluble — Night blindness',
      'Vitamin D — Water-soluble — Scurvy',
      'Vitamin B1 — Fat-soluble — Rickets',
    ],
    correctIndex: 1,
    explanation:
      'Fat-soluble vitamins are A, D, E, and K. Vitamin A deficiency causes night blindness. Water-soluble vitamins are B-complex and C. Vitamin C deficiency causes scurvy.',
    hint: 'Fat-soluble vitamins = A, D, E, K. Water-soluble = B, C.',
    difficulty: 'foundation',
  },
  {
    id: 'ch_09',
    nodeId: NODE_POLYMERS_CLASS,
    title: 'Addition vs Condensation Polymerisation',
    question: 'Nylon-6,6 is classified as a condensation polymer because:',
    options: [
      'It is formed by opening double bonds of a single alkene monomer without losing any molecule.',
      'It is formed by the stepwise reaction of hexamethylenediamine and adipic acid with the elimination of water molecules.',
      'It hardens permanently on initial heating due to cross-linking.',
      'It is derived directly from natural latex collected from trees.',
    ],
    correctIndex: 1,
    explanation:
      'Condensation polymerisation occurs between bifunctional monomers (diamine + diacid) with the loss of small molecules like H2O. Monomers: H2N(CH2)6NH2 + HOOC(CH2)4COOH.',
    hint: 'Look for two different bifunctional monomers releasing a small molecule (H2O).',
    difficulty: 'standard',
  },
  {
    id: 'ch_10',
    nodeId: NODE_SPECIFIC_POLYMERS,
    title: 'Specific Polymers & Catalysts',
    question: 'High-Density Polythene (HDPE) is manufactured at low pressure using which catalytic system?',
    options: [
      'Benzoyl peroxide free radical initiator',
      'Ziegler-Natta catalyst [TiCl4 or TiCl3 + Al(C2H5)3]',
      'Concentrated H2SO4 at 200°C',
      'Copper powder and HCl',
    ],
    correctIndex: 1,
    explanation:
      'HDPE uses the Ziegler-Natta catalyst (titanium tetrachloride/trichloride + triethylaluminium) at low pressure, yielding linear, closely packed polymer chains.',
    hint: 'Named after Nobel laureates Karl Ziegler and Giulio Natta.',
    difficulty: 'advanced',
  },
  {
    id: 'ch_11',
    nodeId: NODE_BIODEGRADABLE,
    title: 'Biodegradable Polymer Mechanics',
    question: 'Why can PHBV and PGA degrade naturally in compost, whereas conventional polythene persists for centuries?',
    options: [
      'Polythene contains ionic bonds that repel water molecules.',
      'PHBV and PGA contain hydrolysable ester linkages (-COO-) in their backbone that microbial enzymes can cleave; polythene has inert C-C single bonds.',
      'Polythene is made by condensation polymerisation.',
      'PGA contains high amounts of cross-linked sulphur bridges.',
    ],
    correctIndex: 1,
    explanation:
      'Biodegradability relies on hydrolysable bonds (ester or amide linkages). Enzymes from bacteria/fungi hydrolyse ester links in PHBV and PGA into non-toxic metabolites.',
    hint: 'Cleavage of backbone ester (-COO-) or amide (-CONH-) links by water/enzymes.',
    difficulty: 'advanced',
  },
  {
    id: 'ch_12',
    nodeId: NODE_DRUGS,
    title: 'Medicinal Chemistry & Action',
    question: 'Which of the following correctly pairs a drug with its therapeutic classification and primary action?',
    options: [
      'Aspirin — Antacid — Neutralises gastric acid directly',
      'Paracetamol — Antipyretic Analgesic — Reduces fever and relieves mild pain',
      'Ranitidine — Antibiotic — Inhibits bacterial cell wall synthesis',
      'Penicillin — Tranquiliser — Reduces central nervous system anxiety',
    ],
    correctIndex: 1,
    explanation:
      'Paracetamol (acetaminophen) is an antipyretic analgesic. Aspirin is an analgesic/antipyretic/anti-inflammatory. Ranitidine is an H2-antagonist antacid. Penicillin is a bactericidal antibiotic.',
    hint: 'Paracetamol inhibits prostaglandin synthesis in the CNS to reduce fever.',
    difficulty: 'foundation',
  },
];

// ==========================================
// MISCONCEPTIONS (Enrichment Data)
// ==========================================
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Warm Water vs Conc. H2SO4 for Phenol',
    description: 'Students write concentrated H2SO4 when converting diazonium salt to phenol.',
    correction: 'Replacement of -N2+Cl- by -OH requires simply warming with warm water (ArN2+Cl- + H2O (warm) -> ArOH + N2 + HCl).',
  },
  {
    id: 'misc_2',
    title: 'Sandmeyer vs Gattermann Reagents',
    description: 'Writing Cu powder for Sandmeyer or CuCl for Gattermann.',
    correction: 'Sandmeyer uses Cu(I) halide in acid (CuCl/HCl, CuBr/HBr, CuCN/KCN). Gattermann uses Cu powder + HX.',
  },
  {
    id: 'misc_3',
    title: 'Sucrose Reducing Behavior',
    description: 'Thinking sucrose is reducing because it is composed of glucose and fructose.',
    correction: 'Sucrose is non-reducing because both anomeric carbons (C-1 of glucose, C-2 of fructose) are tied in the alpha-1,2 linkage.',
  },
  {
    id: 'misc_4',
    title: 'Denaturation vs Hydrolysis',
    description: 'Believing boiling an egg breaks covalent peptide bonds in primary structure.',
    correction: 'Denaturation breaks secondary/tertiary hydrogen bonds and hydrophobic folds. Primary peptide bonds remain completely intact.',
  },
  {
    id: 'misc_5',
    title: 'Thermoplastics vs Thermosetting',
    description: 'Assuming all plastics soften on reheating.',
    correction: 'Thermosetting plastics like Bakelite cross-link permanently on initial heating and decompose rather than melt upon reheating.',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C12_ChemistryDiazoniumsaltsSim() {
  // State variables
  const [activeTab, setActiveTab] = useState<ActiveTab>('discovery');
  const [activeWorkstation, setActiveWorkstation] = useState<Workstation>('diazonium');
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  // Audio / FX feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');

  // BKT State per Node
  const [bktStates, setBktStates] = useState<{ [nodeId: string]: ReturnType<typeof createBKTState> }>(() => {
    const initial: { [nodeId: string]: ReturnType<typeof createBKTState> } = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Discovery State
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);

  // Interactive Lab States
  // 1. Diazonium Lab State
  const [diazTemp, setDiazTemp] = useState<number>(2); // 0 to 30 °C
  const [diazReagent, setDiazReagent] = useState<'CuCl' | 'HBF4' | 'H3PO2' | 'H2O_warm' | 'Phenol_alk'>('CuCl');
  const [diazOutput, setDiazOutput] = useState<string>('Benzenediazonium Chloride stable in solution.');

  // 2. Carbohydrate Lab State
  const [carbSugar, setCarbSugar] = useState<'glucose' | 'fructose' | 'sucrose' | 'starch'>('glucose');
  const [carbTest, setCarbTest] = useState<'tollens' | 'fehling' | 'bromine' | 'iodine'>('bromine');
  const [testResult, setTestResult] = useState<string>('');

  // 3. Protein Lab State
  const [proteinpH, setProteinpH] = useState<number>(6.0); // Isoelectric ~ 6.0
  const [proteinTemp, setProteinTemp] = useState<number>(25); // 25 to 90 °C
  const [denatured, setDenatured] = useState<boolean>(false);

  // 4. Polymer Lab State
  const [polyType, setPolyType] = useState<'addition' | 'condensation' | 'crosslinked' | 'biodegradable'>('addition');
  const [polyHeat, setPolyHeat] = useState<number>(25);

  // Auto-hint timer (10s)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      sum += masteryProb(bktStates[id]);
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  // Audio helper
  const triggerSound = (type: SoundEffect) => {
    try {
      audioManager.play(type);
    } catch {
      // Audio fallback silent catch
    }
  };

  // Reset hint timer
  const resetHintTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !showFeedback) {
        setShowHint(true);
        setHintText(currentChallenge.hint);
        triggerSound('hint');
      }
    }, 10000);
  }, [activeTab, showFeedback, currentChallenge]);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetHintTimer]);

  // Handle Diazonium Lab Simulation
  useEffect(() => {
    if (diazTemp > 5) {
      setDiazOutput('WARNING: T > 5°C! Diazonium salt decomposed into Phenol (C6H5OH) + N2 (g) ↑ + HCl!');
    } else {
      switch (diazReagent) {
        case 'CuCl':
          setDiazOutput('Sandmeyer Reaction: C6H5N2+Cl- + CuCl/HCl → Chlorobenzene (C6H5Cl) + N2 ↑');
          break;
        case 'HBF4':
          setDiazOutput('Balz-Schiemann Reaction: Heat ArN2+BF4- → Fluorobenzene (C6H5F) + N2 ↑ + BF3');
          break;
        case 'H3PO2':
          setDiazOutput('Reduction to Alkane/Benzene: C6H5N2+Cl- + H3PO2 + H2O → Benzene (C6H6) + N2 ↑ + H3PO3 + HCl');
          break;
        case 'H2O_warm':
          setDiazOutput('Hydrolysis: C6H5N2+Cl- + H2O (warm) → Phenol (C6H5OH) + N2 ↑ + HCl');
          break;
        case 'Phenol_alk':
          setDiazOutput('Coupling Reaction (pH 9-10): Forms p-Hydroxyazobenzene (Bright Orange Azo Dye!)');
          break;
      }
    }
  }, [diazTemp, diazReagent]);

  // Handle Carbohydrate Test Simulation
  useEffect(() => {
    if (carbSugar === 'glucose') {
      if (carbTest === 'tollens') setTestResult('Positive! Silver Mirror (Ag) forms on inner wall.');
      else if (carbTest === 'fehling') setTestResult('Positive! Red Precipitate of Cuprous Oxide (Cu2O) forms.');
      else if (carbTest === 'bromine') setTestResult('Positive! Orange Bromine water decolourised -> Gluconic acid.');
      else if (carbTest === 'iodine') setTestResult('Negative! No blue-black colour.');
    } else if (carbSugar === 'fructose') {
      if (carbTest === 'tollens') setTestResult('Positive! (Tautomerises to aldose in alkaline Tollens medium).');
      else if (carbTest === 'fehling') setTestResult('Positive! (Tautomerises in alkaline Fehling medium).');
      else if (carbTest === 'bromine') setTestResult('Negative! Orange colour persists (Ketoses resist Br2/H2O).');
      else if (carbTest === 'iodine') setTestResult('Negative! No color change.');
    } else if (carbSugar === 'sucrose') {
      if (carbTest === 'iodine') setTestResult('Negative! No blue-black colour.');
      else setTestResult('Negative! Sucrose is a non-reducing sugar (Glycosidic bond locks both anomeric carbons).');
    } else if (carbSugar === 'starch') {
      if (carbTest === 'iodine') setTestResult('Positive! Deep Blue-Black complex formed with Amylose coil!');
      else setTestResult('Negative! Polymeric structure hides individual reducing ends.');
    }
  }, [carbSugar, carbTest]);

  // Handle Protein Denaturation
  useEffect(() => {
    if (proteinTemp > 60 || proteinpH < 4.5 || proteinpH > 9.5) {
      setDenatured(true);
    } else {
      setDenatured(false);
    }
  }, [proteinpH, proteinTemp]);

  // Discovery answer handler
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoveryChoice(idx);
    setDiscoveryAnswered(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      triggerSound('success');
      speechManager.speak('Correct! Above 5 degrees Celsius, diazonium salt decomposes rapidly releasing nitrogen gas to form phenol.');
    } else {
      triggerSound('error');
      speechManager.speak('Not quite. Aromatic diazonium salts are thermally unstable above 5 degrees Celsius.');
    }
  };

  // Challenge Option Select & Check
  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    triggerSound('tap');
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || showFeedback) return;

    const correct = selectedOption === currentChallenge.correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    const targetNode = currentChallenge.nodeId;
    const newBkt = bktUpdate(bktStates[targetNode], correct);
    setBktStates((prev) => ({ ...prev, [targetNode]: newBkt }));

    // SRS update
    const reviewItem = createReviewItem(currentChallenge.id, 'Chemistry');
    sm2Update(reviewItem, correct ? 5 : 2, 0);

    if (correct) {
      setScore((prev) => prev + (currentChallenge.difficulty === 'advanced' ? 15 : currentChallenge.difficulty === 'standard' ? 10 : 5));
      setShowConfetti(true);
      setShowSuccess(true);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      triggerSound('drop-correct');
      triggerSound('chime');
      speechManager.speak('Excellent analysis! That is mathematically and chemically accurate.');
      setTimeout(() => {
        setShowConfetti(false);
        setShowSuccess(false);
        setShowSparkle(false);
      }, 3000);
    } else {
      triggerSound('drop-wrong');
      triggerSound('error');
      speechManager.speak('Review the structural mechanism. Check the hint for detailed guidance.');
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setShowHint(false);
      triggerSound('pop');
    } else {
      // Save completed score
      recordGameScore(Object.values(ALL_NODE_IDS), score);
      setActiveTab('summary');
      triggerSound('celebration');
      speechManager.speak('Congratulations! You have completed the Class 12 Advanced Chemistry Suite.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-4 md:p-6 flex flex-col items-center select-none">
      {/* Top Header & Mastery Status */}
      <header className="w-full max-w-6xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 backdrop-blur-md shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-gold-500/20 text-gold-400 text-xs font-semibold rounded-full border border-gold-500/30">
              ISC Class 12 Chemistry
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
              {ALL_NODE_IDS.length} Curriculum Nodes
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-pink-400 bg-clip-text text-transparent mt-1">
            {SCENARIO.title}
          </h1>
          <p className="text-xs text-slate-400">{SCENARIO.subtitle}</p>
        </div>

        {/* Global Mastery & Score Display */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Class Mastery</div>
            <div className="text-xl font-extrabold text-gold-400">{overallMastery}%</div>
          </div>
          <div className="w-24 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-500 transition-all duration-500"
              style={{ width: `${overallMastery}%` }}
            />
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Score</div>
            <div className="text-xl font-extrabold text-amber-400">{score} pts</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full max-w-6xl flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 mb-6 gap-2">
        <button
          onClick={() => {audioManager.play('tap'); 
            setActiveTab('discovery');
            triggerSound('tap');
          }}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'discovery' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          1. Discovery Lab
        </button>
        <button
          onClick={() => {audioManager.play('tap'); 
            setActiveTab('lab');
            triggerSound('tap');
          }}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'lab' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          2. Interactive Suites
        </button>
        <button
          onClick={() => {audioManager.play('tap'); 
            setActiveTab('challenges');
            triggerSound('tap');
          }}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'challenges' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          3. Board Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {audioManager.play('tap'); 
            setActiveTab('summary');
            triggerSound('tap');
          }}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'summary' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          4. Mastery Summary
        </button>
      </nav>

      {/* TAB 1: DISCOVERY LAB */}
      {activeTab === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-amber-500/20 text-amber-400 rounded-lg text-lg font-bold">?</span>
              <h2 className="text-lg font-bold text-amber-300">{DISCOVERY_QUESTION.title}</h2>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            {/* Visual Reactivity Canvas for Discovery */}
            <div className="w-full bg-slate-950 rounded-xl border border-slate-800 p-4 mb-6 flex flex-col items-center justify-center min-h-[200px]">
              <svg viewBox="0 0 500 160" className="w-full max-w-lg h-auto">
                {/* Ice Bath Container */}
                <rect x="50" y="40" width="120" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="110" y="80" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  Ice-Salt Bath
                </text>
                <text x="110" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  0 - 5 °C
                </text>
                <text x="110" y="118" textAnchor="middle" fill="#e2e8f0" fontSize="11">
                  Ar-N₂⁺ Cl⁻ (Stable)
                </text>

                {/* Arrow */}
                <path d="M 190 80 L 290 80" stroke="#64748b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
                <text x="240" y="70" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
                  Warm to 25°C
                </text>

                {/* Decomposed Product Container */}
                <rect x="310" y="40" width="140" height="90" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="380" y="75" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
                  Decomposition!
                </text>
                <text x="380" y="95" textAnchor="middle" fill="#fca5a5" fontSize="11">
                  Phenol (C₆H₅OH)
                </text>
                <text x="380" y="115" textAnchor="middle" fill="#38bdf8" fontSize="11">
                  + N₂ (g) ↑ Bubbles!
                </text>

                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all ${
                    discoveryChoice === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-800/40 border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`p-4 rounded-xl border text-xs sm:text-sm ${
                  discoveryChoice === DISCOVERY_QUESTION.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                }`}
              >
                <div className="font-bold mb-1">
                  {discoveryChoice === DISCOVERY_QUESTION.correctIndex ? 'Spot on Prediction!' : 'Conceptual Insight:'}
                </div>
                <p>{DISCOVERY_QUESTION.explanation}</p>
                <button
                  onClick={() => {audioManager.play('tap'); 
                    setActiveTab('lab');
                    triggerSound('tap');
                  }}
                  className="mt-4 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-lg text-xs"
                >
                  Proceed to Virtual Chemistry Laboratories →
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 2: INTERACTIVE SUITES / WORKSTATIONS */}
      {activeTab === 'lab' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl space-y-6">
          {/* Workstation Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {WORKSTATIONS_INFO.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {audioManager.play('tap'); 
                  setActiveWorkstation(ws.id);
                  triggerSound('tap');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeWorkstation === ws.id
                    ? 'bg-gold-950/80 border-gold-500 text-white shadow-lg ring-1 ring-gold-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-gold-300">{ws.name}</div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">{ws.description}</div>
              </button>
            ))}
          </div>

          {/* WORKSTATION 1: DIAZONIUM LAB */}
          {activeWorkstation === 'diazonium' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gold-300">Diazonium Salt Reaction Simulator (Ar-N₂⁺ X⁻)</h3>
                  <p className="text-xs text-slate-400">Node c12_chem_081: Temperature control & Substitution reactions</p>
                </div>
                <span className="px-2.5 py-1 bg-gold-950 text-gold-400 border border-gold-800 rounded-full text-xs font-mono">
                  c12_chem_081
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex justify-between">
                      <span>Reaction Bath Temperature:</span>
                      <span className={`font-mono font-bold ${diazTemp > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {diazTemp} °C {diazTemp > 5 ? '(UNSTABLE)' : '(STABLE ICE BATH)'}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={diazTemp}
                      onChange={(e) => setDiazTemp(Number(e.target.value))}
                      className="w-full accent-gold-500 mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-2 block">Select Reactant / Reagent:</label>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => setDiazReagent('CuCl')}
                        className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                          diazReagent === 'CuCl' ? 'bg-gold-900/60 border-gold-400 text-gold-200' : 'bg-slate-800/40 border-slate-700'
                        }`}
                      >
                        CuCl / HCl — Sandmeyer Reaction → Chlorobenzene
                      </button>
                      <button
                        onClick={() => setDiazReagent('HBF4')}
                        className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                          diazReagent === 'HBF4' ? 'bg-gold-900/60 border-gold-400 text-gold-200' : 'bg-slate-800/40 border-slate-700'
                        }`}
                      >
                        HBF4 + Heat — Balz-Schiemann Reaction → Fluorobenzene
                      </button>
                      <button
                        onClick={() => setDiazReagent('H3PO2')}
                        className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                          diazReagent === 'H3PO2' ? 'bg-gold-900/60 border-gold-400 text-gold-200' : 'bg-slate-800/40 border-slate-700'
                        }`}
                      >
                        H3PO2 + H2O — Reduction → Benzene
                      </button>
                      <button
                        onClick={() => setDiazReagent('H2O_warm')}
                        className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                          diazReagent === 'H2O_warm' ? 'bg-gold-900/60 border-gold-400 text-gold-200' : 'bg-slate-800/40 border-slate-700'
                        }`}
                      >
                        Warm H2O — Hydrolysis → Phenol
                      </button>
                      <button
                        onClick={() => setDiazReagent('Phenol_alk')}
                        className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                          diazReagent === 'Phenol_alk' ? 'bg-gold-900/60 border-gold-400 text-gold-200' : 'bg-slate-800/40 border-slate-700'
                        }`}
                      >
                        Phenol + NaOH (Alkaline) — Coupling → Orange Azo Dye
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reaction Visualizer SVG */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between items-center min-h-[260px]">
                  <div className="text-xs text-slate-400 font-mono mb-2">Molecular Transformation Preview</div>
                  <svg viewBox="0 0 360 160" className="w-full max-w-sm h-auto">
                    {/* Benzene Ring with N2+Cl- */}
                    <g transform="translate(60, 80)">
                      <polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12" fill="none" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="0" cy="0" r="12" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3" />
                      <line x1="0" y1="-25" x2="0" y2="-45" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-50" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">
                        N₂⁺ Cl⁻
                      </text>
                    </g>

                    {/* Arrow */}
                    <path d="M 120 80 L 220 80" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow2)" />
                    <text x="170" y="70" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">
                      {diazTemp > 5 ? 'T > 5°C Decomp' : diazReagent}
                    </text>

                    {/* Product Ring */}
                    <g transform="translate(280, 80)">
                      <polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12" fill="none" stroke="#10b981" strokeWidth="2" />
                      <circle cx="0" cy="0" r="12" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3" />
                      <line x1="0" y1="-25" x2="0" y2="-45" stroke="#10b981" strokeWidth="2" />
                      <text x="0" y="-50" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
                        {diazTemp > 5
                          ? '-OH'
                          : diazReagent === 'CuCl'
                          ? '-Cl'
                          : diazReagent === 'HBF4'
                          ? '-F'
                          : diazReagent === 'H3PO2'
                          ? '-H'
                          : diazReagent === 'H2O_warm'
                          ? '-OH'
                          : '-N=N-C₆H₄OH'}
                      </text>
                    </g>

                    <defs>
                      <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                      </marker>
                    </defs>
                  </svg>

                  <div
                    className={`w-full p-3 rounded-lg border text-xs font-mono text-center ${
                      diazTemp > 5 ? 'bg-rose-950/60 border-rose-500 text-rose-300' : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    }`}
                  >
                    {diazOutput}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WORKSTATION 2: BIOMOLECULES SUITE */}
          {activeWorkstation === 'biomolecules' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-amber-300">Biomolecules Testing & Structural Suite</h3>
                  <p className="text-xs text-slate-400">Nodes: Carbohydrates, Amino Acids/Proteins, Nucleic Acids, Vitamins</p>
                </div>
                <div className="flex gap-1">
                  <span className="px-2 py-0.5 bg-amber-950 text-amber-400 text-[10px] font-mono border border-amber-800 rounded">c12_chem_082</span>
                  <span className="px-2 py-0.5 bg-amber-950 text-amber-400 text-[10px] font-mono border border-amber-800 rounded">c12_chem_083</span>
                  <span className="px-2 py-0.5 bg-amber-950 text-amber-400 text-[10px] font-mono border border-amber-800 rounded">c12_chem_084</span>
                  <span className="px-2 py-0.5 bg-amber-950 text-amber-400 text-[10px] font-mono border border-amber-800 rounded">c12_chem_085</span>
                </div>
              </div>

              {/* Sub-Tabs inside Biomolecules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carbohydrate Test Simulator */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider">1. Carbohydrate Qualitative Reagent Test</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Select Sugar Sample:</label>
                      <select
                        value={carbSugar}
                        onChange={(e) => setCarbSugar(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded p-1.5"
                      >
                        <option value="glucose">D-Glucose (Aldohexose)</option>
                        <option value="fructose">D-Fructose (Ketohexose)</option>
                        <option value="sucrose">Sucrose (Non-reducing disaccharide)</option>
                        <option value="starch">Starch (Polysaccharide)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Select Reagent:</label>
                      <select
                        value={carbTest}
                        onChange={(e) => setCarbTest(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded p-1.5"
                      >
                        <option value="bromine">Bromine Water (Br2/H2O)</option>
                        <option value="tollens">Tollens' Reagent [Ag(NH3)2]+</option>
                        <option value="fehling">Fehling's Solution (Cu2+)</option>
                        <option value="iodine">Iodine Solution (I2/KI)</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded text-xs font-mono text-gold-200">{testResult}</div>
                </div>

                {/* Protein Zwitterion & Denaturation */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">2. Amino Acid Zwitterion & Protein Denaturation</h4>
                  <div>
                    <label className="text-[10px] text-slate-400 flex justify-between">
                      <span>Aqueous Solution pH: {proteinpH}</span>
                      <span>{proteinpH < 5 ? 'Cation (+)' : proteinpH > 7.5 ? 'Anion (-)' : 'Zwitterion (Net 0)'}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      step="0.5"
                      value={proteinpH}
                      onChange={(e) => setProteinpH(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 flex justify-between">
                      <span>Temperature: {proteinTemp} °C</span>
                      <span className={denatured ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                        {denatured ? 'DENATURATED (Curdled Paneer/Coagulated White)' : 'Native Native Structure'}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="90"
                      value={proteinTemp}
                      onChange={(e) => setProteinTemp(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-2.5 rounded text-[11px] text-slate-300">
                    <span className="font-bold text-amber-400">Isoelectric Point (pI):</span> At pI, dipolar H₃N⁺-CHR-COO⁻ forms.
                    Denaturation breaks secondary/tertiary hydrogen bonds without breaking primary peptide bonds.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WORKSTATION 3: POLYMER ENGINEERING */}
          {activeWorkstation === 'polymers' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-emerald-300">Polymer Classification & Biodegradability Engine</h3>
                  <p className="text-xs text-slate-400">Nodes: Polymer Classification, Methods, Specific Polymers, Biodegradable</p>
                </div>
                <div className="flex gap-1">
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-800 rounded">
                    c12_chem_086
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-800 rounded">
                    c12_chem_087
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-800 rounded">
                    c12_chem_088
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-800 rounded">
                    c12_chem_089
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Polymer Mode Chooser */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-300 block">Select Polymer Category to Analyze:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPolyType('addition')}
                      className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                        polyType === 'addition' ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200' : 'bg-slate-800/40 border-slate-700'
                      }`}
                    >
                      Addition (Polythene, PVC, Teflon)
                    </button>
                    <button
                      onClick={() => setPolyType('condensation')}
                      className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                        polyType === 'condensation' ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200' : 'bg-slate-800/40 border-slate-700'
                      }`}
                    >
                      Condensation (Nylon-6,6, Terylene)
                    </button>
                    <button
                      onClick={() => setPolyType('crosslinked')}
                      className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                        polyType === 'crosslinked' ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200' : 'bg-slate-800/40 border-slate-700'
                      }`}
                    >
                      Thermosetting (Bakelite)
                    </button>
                    <button
                      onClick={() => setPolyType('biodegradable')}
                      className={`p-2.5 rounded-lg text-xs font-mono text-left border ${
                        polyType === 'biodegradable' ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200' : 'bg-slate-800/40 border-slate-700'
                      }`}
                    >
                      Biodegradable (PHBV, PGA, PLA)
                    </button>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Heat Treatment Slider: {polyHeat} °C</span>
                      <span>
                        {polyHeat > 150
                          ? polyType === 'crosslinked'
                            ? 'Permanent Charring (Does Not Melt)'
                            : 'Melts / Softens'
                          : 'Solid State'}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="25"
                      max="250"
                      value={polyHeat}
                      onChange={(e) => setPolyHeat(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                {/* Polymer Details Display */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  {polyType === 'addition' && (
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="font-bold text-emerald-400">Addition Polymerisation (Chain-Growth):</div>
                      <p>• Monomers carry C=C double bonds (e.g. Ethene, Vinyl Chloride, CF₂=CF₂).</p>
                      <p>• No small by-product molecule eliminated.</p>
                      <p>• HDPE uses Ziegler-Natta catalyst [TiCl₄ + Al(C₂H₅)₃] at low pressure.</p>
                    </div>
                  )}
                  {polyType === 'condensation' && (
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="font-bold text-emerald-400">Condensation Polymerisation (Step-Growth):</div>
                      <p>• Monomers carry two functional groups (e.g. H₂N(CH₂)₆NH₂ + HOOC(CH₂)₄COOH).</p>
                      <p>• Eliminates water (H₂O) or HCl molecules at each step.</p>
                      <p>• Yields Nylon-6,6, Terylene (polyester).</p>
                    </div>
                  )}
                  {polyType === 'crosslinked' && (
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="font-bold text-emerald-400">Thermosetting Plastic (Bakelite):</div>
                      <p>• Phenol + Formaldehyde condense to form 3D cross-linked networks.</p>
                      <p>• Hardens permanently on initial heating. Cannot be remoulded.</p>
                      <p>• Used for electrical switches and utensil handles.</p>
                    </div>
                  )}
                  {polyType === 'biodegradable' && (
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="font-bold text-emerald-400">Biodegradable Polymers (PHBV, PGA, PLA):</div>
                      <p>• Contain hydrolysable ester (-COO-) or amide (-CONH-) links in backbone.</p>
                      <p>• Microbial enzymes hydrolyse links into CO₂, H₂O, and non-toxic biomass.</p>
                      <p>• PGA used in absorbable surgical sutures (dissolves in 2-4 weeks).</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* WORKSTATION 4: MEDICINAL CHEMISTRY */}
          {activeWorkstation === 'drugs' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-pink-300">Medicinal Chemistry & Drug-Target Interactions</h3>
                  <p className="text-xs text-slate-400">Node c12_chem_090: Therapeutic Classification & Enzyme Action</p>
                </div>
                <span className="px-2.5 py-1 bg-pink-950 text-pink-400 border border-pink-800 rounded-full text-xs font-mono">
                  c12_chem_090
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="font-bold text-xs text-pink-400">Analgesics & Antipyretics</div>
                  <p className="text-[11px] text-slate-300">
                    <span className="font-bold text-white">Aspirin:</span> Acetylsalicylic acid (C₆H₄(OCOCH₃)COOH). Inhibits cyclooxygenase
                    enzyme, blocking prostaglandin synthesis.
                  </p>
                  <p className="text-[11px] text-slate-300">
                    <span className="font-bold text-white">Paracetamol:</span> Acetaminophen (C₆H₄(OH)NHCOCH₃). Antipyretic & analgesic.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="font-bold text-xs text-gold-400">Antacids & Antihistamines</div>
                  <p className="text-[11px] text-slate-300">
                    <span className="font-bold text-white">Antacids:</span> Metal hydroxides (Mg(OH)₂, Al(OH)₃) neutralise HCl directly.
                    Ranitidine blocks H₂ receptors.
                  </p>
                  <p className="text-[11px] text-slate-300">
                    <span className="font-bold text-white">Antihistamines:</span> Block histamine receptors to prevent allergic response
                    (Diphenhydramine).
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="font-bold text-xs text-emerald-400">Antimicrobials & Antiseptics</div>
                  <p className="text-[11px] text-slate-300">
                    <span className="font-bold text-white">Antiseptic:</span> Applied to living tissues (Dettol, Bithionol, Iodine).
                  </p>
                  <p className="text-[11px] text-slate-300">
                    <span className="font-bold text-white">Disinfectant:</span> Applied to inanimate objects (0.2-1% Phenol, Chlorine).
                  </p>
                  <p className="text-[11px] text-slate-300">
                    <span className="font-bold text-white">Penicillin:</span> Bactericidal antibiotic inhibiting bacterial cell wall synthesis.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* TAB 3: BOARD CHALLENGES */}
      {activeTab === 'challenges' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-6">
          {/* Progress Header */}
          <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div>
              <span className="text-xs text-slate-400">Challenge Progress</span>
              <div className="text-base font-bold text-gold-300">
                Question {currentChallengeIdx + 1} of {CHALLENGES.length}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  currentChallenge.difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-400 border-rose-800'
                    : currentChallenge.difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                }`}
              >
                {currentChallenge.difficulty.toUpperCase()}
              </span>
              <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded-full">{currentChallenge.nodeId}</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">{currentChallenge.question}</h3>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-3">
              {currentChallenge.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all ${
                    selectedOption === idx
                      ? showFeedback
                        ? idx === currentChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-gold-950/80 border-gold-500 text-white'
                      : showFeedback && idx === currentChallenge.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            {/* Submit / Next Button */}
            {!showFeedback ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 disabled:opacity-40 font-bold rounded-xl text-sm shadow-lg transition-all"
              >
                Validate Chemical Solution
              </button>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm ${
                    isCorrect ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/50 border-rose-500/50 text-rose-300'
                  }`}
                >
                  <div className="font-bold mb-1">{isCorrect ? 'Correct Analysis!' : 'Chemical Misconception Detected:'}</div>
                  <p>{currentChallenge.explanation}</p>
                </div>
                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold rounded-xl text-sm shadow-lg transition-all"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Mastery Summary →'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 4: MASTERY SUMMARY */}
      {activeTab === 'summary' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 text-center">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-amber-300">
              Curriculum Mastery & BKT Evaluation
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              {ALL_NODE_IDS.map((nodeId) => {
                const bkt = bktStates[nodeId];
                const masteryVal = Math.round(masteryProb(bkt) * 100);
                return (
                  <div key={nodeId} className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1">
                    <div className="text-[10px] text-slate-400 font-mono">{nodeId}</div>
                    <div className="text-sm font-bold text-slate-200">{nodeId.replace('c12_chem_', 'Topic ').toUpperCase()}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">BKT Mastery:</span>
                      <span className="text-xs font-bold text-gold-400">{masteryVal}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Misconception Summary Checklist */}
            <div className="text-left space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-amber-300">Common Board Exam Misconception Checklist Refined:</h3>
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

            <button
              onClick={() => {audioManager.play('tap'); 
                setActiveTab('discovery');
                setCurrentChallengeIdx(0);
                setUserAnswers([]);
                setSelectedOption(null);
                setShowFeedback(false);
                setScore(0);
                triggerSound('tap');
              }}
              className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm shadow-lg"
            >
              Restart Full Laboratory Simulation
            </button>
          </div>
        </motion.div>
      )}

      {/* UI Overlay Feedback Components */}
      <HintBubble show={showHint} text={hintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Board Challenge Completed!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}