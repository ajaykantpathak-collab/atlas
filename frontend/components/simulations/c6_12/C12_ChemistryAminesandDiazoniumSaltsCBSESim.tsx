'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { motion, AnimatePresence } from 'framer-motion';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';

// --- ALL 28 CBSE NODE STRING LITERALS ---
const NODE_IDS = [
  'c12_chem_cbse_300', // Amines as Ammonia Derivatives
  'c12_chem_cbse_301', // Pyramidal Structure and sp3 Hybridization of Amines
  'c12_chem_cbse_302', // Classification of Amines
  'c12_chem_cbse_303', // Simple and Mixed Amines
  'c12_chem_cbse_304', // Nomenclature of Amines by Common System
  'c12_chem_cbse_305', // Nomenclature of Amines by IUPAC System
  'c12_chem_cbse_306', // Preparation of Amines by Reduction of Nitro Compounds
  'c12_chem_cbse_307', // Preparation of Amines by Ammonolysis of Alkyl Halides
  'c12_chem_cbse_308', // Preparation of Amines by Reduction of Nitriles
  'c12_chem_cbse_309', // Gabriel Phthalimide Synthesis
  'c12_chem_cbse_310', // Hoffmann Bromamide Degradation Reaction
  'c12_chem_cbse_311', // Physical Properties of Amines
  'c12_chem_cbse_312', // Hydrogen Bonding and Boiling Points of Isomeric Amines
  'c12_chem_cbse_313', // Basic Character of Amines: Kb and pKb
  'c12_chem_cbse_314', // Basicity of Aliphatic Amines: Inductive, Solvation, and Steric Effects
  'c12_chem_cbse_315', // Basicity of Aromatic Amines: Resonance Effect
  'c12_chem_cbse_316', // Alkylation and Acylation Reactions of Amines
  'c12_chem_cbse_317', // Carbylamine Reaction (Isocyanide Test)
  'c12_chem_cbse_318', // Reaction of Amines with Nitrous Acid
  'c12_chem_cbse_319', // Distinguishing Between Primary, Secondary, and Tertiary Amines
  'c12_chem_cbse_320', // Electrophilic Aromatic Substitution Reactions of Aniline
  'c12_chem_cbse_321', // Electrophilic Aromatic Substitution on Benzene
  'c12_chem_cbse_322', // Acetylation of Aniline to Control Reactivity
  'c12_chem_cbse_323', // Preparation of Benzenediazonium Chloride by Diazotisation
  'c12_chem_cbse_324', // Physical Properties of Diazonium Salts
  'c12_chem_cbse_325', // Reactions of Diazonium Salts: Displacement of Nitrogen
  'c12_chem_cbse_326', // Coupling Reactions and Azo Dye Formation
  'c12_chem_cbse_327', // Synthetic Importance of Diazonium Salts in Aromatic Chemistry
] as const;

type NodeID = typeof NODE_IDS[number];

// Interfaces
interface Challenge {
  id: string;
  nodeId: NodeID;
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// 8 Adaptive Challenges covering key concepts across the chapter
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    nodeId: 'c12_chem_cbse_301',
    title: 'Amine Geometry & Hybridization',
    question: 'What is the hybridization and bond angle of nitrogen in trimethylamine, (CH3)3N?',
    options: [
      'sp2 hybridization, 120° bond angle',
      'sp3 hybridization, ~108° bond angle due to lone pair repulsion',
      'sp3 hybridization, 109.5° ideal tetrahedral angle',
      'sp hybridization, 180° linear geometry'
    ],
    correctAnswer: 1,
    explanation: 'Nitrogen in amines is sp3 hybridized. The unshared lone pair exerts repulsion on bonding pairs, compressing the C-N-C bond angle to ~108° (slightly less than 109.5°).',
    hint: 'Think about VSEPR theory and the steric effect of a lone pair on nitrogen.',
    difficulty: 'easy'
  },
  {
    id: 'ch_2',
    nodeId: 'c12_chem_cbse_310',
    title: 'Hoffmann Bromamide Degradation',
    question: 'Ethanamide (CH3CONH2) is treated with Br2 and NaOH. What is the organic product formed, and how many carbon atoms does it contain?',
    options: [
      'Ethanamine (2 carbons)',
      'Methanamine (1 carbon)',
      'Nitromethane (1 carbon)',
      'Propanamine (3 carbons)'
    ],
    correctAnswer: 1,
    explanation: 'Hoffmann bromamide reaction causes degradation (descent of amine series). The carbonyl carbon is lost as Na2CO3, yielding methanamine (CH3NH2) from ethanamide (CH3CONH2).',
    hint: 'Hoffmann degradation leads to a product with ONE LESS carbon atom than the amide.',
    difficulty: 'medium'
  },
  {
    id: 'ch_3',
    nodeId: 'c12_chem_cbse_309',
    title: 'Gabriel Phthalimide Synthesis Limitation',
    question: 'Why can Aniline NOT be prepared by Gabriel Phthalimide Synthesis?',
    options: [
      'Phthalimide does not react with ethanolic KOH',
      'Aryl halides do not undergo nucleophilic substitution with potassium phthalimide',
      'Aniline rapidly oxidizes in air during the reaction',
      'Potassium phthalimide is insoluble in aromatic solvents'
    ],
    correctAnswer: 1,
    explanation: 'Gabriel synthesis involves SN2 nucleophilic substitution by phthalimide anion on an alkyl halide. Aryl halides do not undergo SN2 substitution easily due to partial double bond character of Ar-X bond.',
    hint: 'Consider the reactivity of chlorobenzene vs ethyl chloride towards nucleophilic substitution.',
    difficulty: 'hard'
  },
  {
    id: 'ch_4',
    nodeId: 'c12_chem_cbse_314',
    title: 'Aqueous Basicity Order of Ethyl Amines',
    question: 'What is the correct order of basic strength of ethyl-substituted amines in aqueous solution?',
    options: [
      '(C2H5)3N > (C2H5)2NH > C2H5NH2 > NH3',
      '(C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3',
      '(C2H5)2NH > C2H5NH2 > (C2H5)3N > NH3',
      'C2H5NH2 > (C2H5)2NH > (C2H5)3N > NH3'
    ],
    correctAnswer: 1,
    explanation: 'In aqueous medium, basicity is governed by inductive effect (+I), solvation of substituted ammonium ion, and steric hindrance. For ethyl group: 2° (211) > 3° (3) > 1° > NH3: (C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3.',
    hint: 'For ethyl amines in water, the secondary amine is most basic due to balanced solvation and +I effect.',
    difficulty: 'hard'
  },
  {
    id: 'ch_5',
    nodeId: 'c12_chem_cbse_319',
    title: 'Hinsberg Test Discrimination',
    question: 'An unknown amine reacts with benzenesulphonyl chloride to form a precipitate that is INSOLUBLE in aqueous KOH solution. What class of amine is it?',
    options: [
      'Primary (1°) Amine',
      'Secondary (2°) Amine',
      'Tertiary (3°) Amine',
      'Quaternary Ammonium Salt'
    ],
    correctAnswer: 1,
    explanation: 'A 2° amine reacts with Hinsberg reagent to form N,N-dialkylbenzenesulphonamide. Because it lacks acidic H on nitrogen, it is INSOLUBLE in alkali KOH.',
    hint: 'Primary amine sulphonamides have an acidic hydrogen on N (soluble in KOH). Secondary ones have no N-H left.',
    difficulty: 'medium'
  },
  {
    id: 'ch_6',
    nodeId: 'c12_chem_cbse_322',
    title: 'Protection of Aniline by Acetylation',
    question: 'Why is aniline acetylated with acetic anhydride before performing nitration to prepare p-nitroaniline?',
    options: [
      'To make the benzene ring meta-directing',
      'To prevent oxidation and reduce the strong activating effect of -NH2 group',
      'To increase the solubility of aniline in water',
      'To remove electron density from the ortho position only'
    ],
    correctAnswer: 1,
    explanation: 'Direct nitration of aniline with HNO3/H2SO4 gives m-nitroaniline (47%) due to anilinium ion formation, and tarry oxidation products. Acetylation protects -NH2 into acetanilide, moderating activating strength.',
    hint: 'Think about how the lone pair on nitrogen delocalizes into the carbonyl group of acetanilide.',
    difficulty: 'hard'
  },
  {
    id: 'ch_7',
    nodeId: 'c12_chem_cbse_323',
    title: 'Diazotisation Reaction Conditions',
    question: 'What temperature range must be strictly maintained during the diazotisation of aniline with NaNO2 and HCl?',
    options: [
      '373 - 383 K (100 - 110 °C)',
      '273 - 278 K (0 - 5 °C)',
      '298 - 303 K (25 - 30 °C)',
      '350 - 360 K (77 - 87 °C)'
    ],
    correctAnswer: 1,
    explanation: 'Benzenediazonium chloride is unstable at higher temperatures and hydrolyzes to phenol with evolution of N2 gas. Hence, reaction is kept at ice-cold temperature: 273–278 K (0–5 °C).',
    hint: 'Diazonium salts decompose rapidly above 5 °C, releasing nitrogen gas.',
    difficulty: 'easy'
  },
  {
    id: 'ch_8',
    nodeId: 'c12_chem_cbse_326',
    title: 'Coupling Reaction to Form Azo Dyes',
    question: 'Reaction of benzenediazonium chloride with phenol in weakly alkaline medium (pH 9-10) yields which colored azo dye?',
    options: [
      'p-Aminoazobenzene (Yellow Dye)',
      'p-Hydroxyazobenzene (Orange Dye)',
      '2,4,6-Tribromoaniline (White Precipitate)',
      'Methyl Orange (Red Dye)'
    ],
    correctAnswer: 1,
    explanation: 'Benzenediazonium chloride undergoes coupling reaction with phenol at para position in alkaline medium (pH 9–10) to yield p-hydroxyazobenzene, an orange azo dye.',
    hint: 'Phenol provides a hydroxyl group at para position to the azo group (-N=N-).',
    difficulty: 'medium'
  }
];

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 12 Amines & Diazonium Salts Lab',
  subtitle: 'Master Amine Basicity, Gabriel Synthesis, and Diazotization',
  description: 'Step into a virtual organic lab where you prepare amines via Gabriel synthesis, test basicity, and synthesize diazonium salts for azo dye formation.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Basicity Paradox',
  question: 'In aqueous solution, the basicity order of amines is R2NH > RNH2 > R3N (2° > 1° > 3°). Why are tertiary amines less basic than secondary amines despite having more electron-donating groups?',
  options: [
    'Tertiary amines have no lone pair on nitrogen',
    'The +I effect of three alkyl groups increases electron density, but steric hindrance and poor solvation of the bulky R3NH+ ion outweigh the electronic effect in water',
    'Tertiary amines are always gases, so they cannot be basic in solution',
    'Tertiary amines undergo elimination instead of acting as bases'
],
  correctIndex: 1,
  explanation: 'In aqueous solution, three factors compete: (1) +I effect (more alkyl groups = more basic), (2) steric hindrance (bulky groups block protonation), (3) solvation (R3NH+ is poorly solvated by water due to steric shielding). For 3° amines, steric hindrance and poor solvation outweigh the +I effect, making them less basic than 2° amines.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "preparation",
    "name": "Amine Preparation Lab",
    "description": "Prepare amines by reduction, Gabriel synthesis, and Hoffmann degradation."
  },
  {
    "id": "basicity",
    "name": "Basicity Testing Lab",
    "description": "Compare basicity of 1°, 2°, 3° amines using Kb and pKb."
  },
  {
    "id": "reactions",
    "name": "Amine Reactions Lab",
    "description": "Run carbylamine test, alkylation, acylation, and nitrous acid reactions."
  },
  {
    "id": "diazonium",
    "name": "Diazonium Salt Lab",
    "description": "Synthesize diazonium salts at 0-5°C and perform Sandmeyer, Gattermann, and coupling reactions."
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
    "title": "Gabriel Phthalimide Synthesis Can Prepare Aromatic Primary Amines",
    "description": "Students often believe that Gabriel phthalimide synthesis can be used to synthesize both primary aliphatic and primary aromatic amines. They assume aryl halides react easily with potassium phthalimide via nucleophilic substitution.",
    "correction": "Gabriel phthalimide synthesis is strictly used for preparing aliphatic primary amines. Aryl halides cannot undergo nucleophilic substitution with the phthalimide anion because the carbon-halogen bond acquires partial double bond character due to resonance. Consequently, aromatic primary amines like aniline cannot be prepared by this method."
  },
  {
    "id": "misc_2",
    "title": "Tertiary Amines Are Always Most Basic in Aqueous Solution",
    "description": "Students think tertiary amines are always the most basic in aqueous solution due to the maximum +I effect from three alkyl groups. They wrongly extrapolate gas-phase basicity trends directly to aqueous solutions.",
    "correction": "In aqueous solutions, basicity is governed by a combination of the inductive effect, steric hindrance, and cation solvation. Solvation through hydrogen bonding stabilizes smaller substituted ammonium ions better, making secondary amines generally more basic than tertiary ones. For instance, the basicity order for methyl-substituted amines in aqueous medium is 2° > 1° > 3° > NH3."
  },
  {
    "id": "misc_3",
    "title": "Hoffmann Bromamide Degradation Retains Parent Amide Carbon Count",
    "description": "Students frequently assume that the amine formed from Hoffmann bromamide degradation contains the same number of carbon atoms as the reactant amide. They fail to account for the loss of the carbonyl carbon during the mechanism.",
    "correction": "Hoffmann bromamide degradation yields a primary amine containing one carbon atom fewer than the starting amide. The carbonyl carbon of the amide group is eliminated as a carbonate ion (Na2CO3 or K2CO3). Hence, converting propanamide via this reaction yields ethanamine rather than propanamine."
  },
  {
    "id": "misc_4",
    "title": "Carbylamine Test Gives Foul Smell for All Amines",
    "description": "Students believe that the carbylamine test can be used to identify any amine because all class types produce a foul-smelling compound. They assume secondary and tertiary amines respond similarly when warmed with chloroform and KOH.",
    "correction": "The carbylamine (isocyanide) test is exclusively given by primary (1°) aliphatic and aromatic amines. Secondary (2°) and tertiary (3°) amines do not show this test because they lack the two amino hydrogens required to form an isocyanide. Therefore, this reaction is specifically used to distinguish primary amines from secondary and tertiary amines."
  },
  {
    "id": "misc_5",
    "title": "Aliphatic Diazonium Salts Are Stable at Low Temperatures",
    "description": "Students often assume that aliphatic diazonium salts can be isolated and stored at 0–5 °C just like benzene diazonium chloride. They expect diazotization to yield stable intermediates for both aliphatic and aromatic primary amines.",
    "correction": "Aliphatic diazonium salts are extremely unstable even at 0–5 °C and spontaneously decompose to evolve nitrogen gas and form carbocations and alcohols. In contrast, arenediazonium salts are temporarily stable at 273–278 K because the positive charge on the diazonium group is dispersed over the benzene ring via resonance. Consequently, aliphatic diazonium salts cannot be used for synthetic coupling or Sandmeyer reactions."
  }
];


export default function C12_ChemistryAminesandDiazoniumSaltsCBSESim() {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'learn' | 'lab' | 'tests' | 'arena'>('learn');

  // Module learning navigation
  const [currentModule, setCurrentModule] = useState<number>(0);

  // Pyramidal visualizer state
  const [bondAngle, setBondAngle] = useState<number>(108);
  const [substituentType, setSubstituentType] = useState<'1deg' | '2deg' | '3deg'>('1deg');

  // Solvation vs Basicity simulator state
  const [mediumType, setMediumType] = useState<'gas' | 'aqueous'>('aqueous');
  const [alkylGroup, setAlkylGroup] = useState<'methyl' | 'ethyl'>('ethyl');

  // Resonance step state (Aniline 5 resonance structures)
  const [resStep, setResStep] = useState<number>(0);

  // Lab Reaction Builder State
  const [startingMat, setStartingMat] = useState<'nitro' | 'nitrile' | 'amide' | 'aniline'>('nitro');
  const [reagent, setReagent] = useState<string>('Fe/HCl');
  const [reactionOutput, setReactionOutput] = useState<{ product: string; equation: string; note: string } | null>(null);

  // Hinsberg / Carbylamine Test Visualizer State
  const [testAmine, setTestAmine] = useState<'1deg' | '2deg' | '3deg'>('1deg');
  const [testReagent, setTestReagent] = useState<'hinsberg' | 'carbylamine' | 'hno2'>('hinsberg');
  const [testResult, setTestResult] = useState<{ observation: string; equation: string; explanation: string } | null>(null);

  // Arena & Mastery State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<{ show: boolean; x: number; y: number }>({ show: false, x: 0, y: 0 });
  const [score, setScore] = useState<number>(0);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));

  // Canvas ref for dynamic molecular hydrogen bonding animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio & Speech helper triggers
  const playAudio = (type: SoundEffect) => {
    try {
      audioManager.play(type);
    } catch (e) {
      // fallback safe
    }
  };

  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
    } catch (e) {
      // fallback safe
    }
  };

  // Canvas Hydrogen Bonding / State Simulation
  useEffect(() => {
    if (activeTab !== 'learn' || currentModule !== 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Molecular particles representing Amine & Water forming H-bonds
    const molecules = Array.from({ length: 14 }, (_, i) => ({
      x: Math.random() * (width - 60) + 30,
      y: Math.random() * (height - 60) + 30,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      type: i % 2 === 0 ? 'amine' : 'water',
      radius: i % 2 === 0 ? 18 : 14
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background container grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, width - 10, height - 10);

      // Move particles
      molecules.forEach(m => {
        m.x += m.vx;
        m.y += m.vy;

        if (m.x - m.radius < 10 || m.x + m.radius > width - 10) m.vx *= -1;
        if (m.y - m.radius < 10 || m.y + m.radius > height - 10) m.vy *= -1;
      });

      // Draw potential Hydrogen bonds between N-H and O-H
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const m1 = molecules[i];
          const m2 = molecules[j];
          if (m1.type !== m2.type) {
            const dx = m1.x - m2.x;
            const dy = m1.y - m2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              // Draw dashed H-bond line
              ctx.beginPath();
              ctx.setLineDash([4, 4]);
              ctx.strokeStyle = '#38bdf8';
              ctx.lineWidth = 2;
              ctx.moveTo(m1.x, m1.y);
              ctx.lineTo(m2.x, m2.y);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        }
      }

      // Draw molecules
      molecules.forEach(m => {
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        if (m.type === 'amine') {
          ctx.fillStyle = '#818cf8'; // Indigo for Nitrogen compound
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#c084fc';
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('R-NH₂', m.x, m.y);
        } else {
          ctx.fillStyle = '#0284c7'; // Blue for H2O
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#38bdf8';
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('H₂O', m.x, m.y);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, currentModule]);

  // Initial greeting
  useEffect(() => {
    speakText('Welcome to Amines and Diazonium Salts interactive simulation. Explore 3D structures, basicity, name reactions, and synthetic applications!');
  }, []);

  // Update reaction builder output
  const handleExecuteReaction = () => {
    playAudio('whoosh');
    if (startingMat === 'nitro' && reagent === 'Fe/HCl') {
      setReactionOutput({
        product: 'Aniline / Primary Alkanamine (R-NH₂)',
        equation: 'R-NO₂ + 3Fe + 6HCl → R-NH₂ + 3FeCl₂ + 2H₂O',
        note: 'c12_chem_cbse_306: Preferred method! FeCl₂ hydrolyzes to regenerate HCl, requiring only a small amount of initiated acid.'
      });
    } else if (startingMat === 'nitro' && reagent === 'H2/Pd-C') {
      setReactionOutput({
        product: 'Primary Amine (R-NH₂)',
        equation: 'R-NO₂ + 3H₂ (in ethanol, Pd catalyst) → R-NH₂ + 2H₂O',
        note: 'c12_chem_cbse_306: Catalytic hydrogenation converts nitroalkanes or nitroarenes directly into 1° amines.'
      });
    } else if (startingMat === 'nitrile' && reagent === 'LiAlH4') {
      setReactionOutput({
        product: 'Primary Amine (R-CH₂-NH₂)',
        equation: 'R-C≡N + 4[H] (LiAlH₄ or H₂/Ni) → R-CH₂-NH₂',
        note: 'c12_chem_cbse_308: Ascending the amine series! Adds one carbon atom to the primary carbon chain.'
      });
    } else if (startingMat === 'amide' && reagent === 'Br2/NaOH') {
      setReactionOutput({
        product: 'Primary Amine (R-NH₂)',
        equation: 'R-CONH₂ + Br₂ + 4NaOH → R-NH₂ + Na₂CO₃ + 2NaBr + 2H₂O',
        note: 'c12_chem_cbse_310: Hoffmann Bromamide Degradation! Migration of alkyl/aryl group yields amine with ONE LESS carbon atom.'
      });
    } else if (startingMat === 'aniline' && reagent === 'NaNO2+HCl (0-5°C)') {
      setReactionOutput({
        product: 'Benzenediazonium Chloride (C₆H₅N₂⁺ Cl⁻)',
        equation: 'C₆H₅NH₂ + NaNO₂ + 2HCl (273-278 K) → C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O',
        note: 'c12_chem_cbse_323: Diazotisation! Keep temperature strictly ice-cold (0-5°C) to prevent decomposition into phenol.'
      });
    } else {
      setReactionOutput({
        product: 'No reaction or side products formed',
        equation: 'R-Group + Reagent → Complex Mixture',
        note: 'Select a standard CBSE specified reagent combination to observe amine transformation.'
      });
    }
  };

  // Handle Hinsberg & Distinction test visualizer
  const handleRunDistinctionTest = () => {
    playAudio('pop');
    if (testReagent === 'hinsberg') {
      if (testAmine === '1deg') {
        setTestResult({
          observation: 'Clear solution after addition of KOH (Soluble precipitate)',
          equation: 'C₆H₅SO₂Cl + R-NH₂ → C₆H₅SO₂NH-R + HCl (Acidic N-H reacts with KOH to form soluble salt)',
          explanation: 'c12_chem_cbse_319: Primary amines form N-alkylbenzenesulphonamide containing strong acidic hydrogen on N, dissolving completely in alkali.'
        });
      } else if (testAmine === '2deg') {
        setTestResult({
          observation: 'Insoluble precipitate remains unchanged upon adding KOH',
          equation: 'C₆H₅SO₂Cl + R₂NH → C₆H₅SO₂NR₂ + HCl (No acidic H on N)',
          explanation: 'c12_chem_cbse_319: Secondary amines form N,N-dialkylbenzenesulphonamide. Lacking an acidic hydrogen on nitrogen, it does NOT dissolve in aqueous KOH.'
        });
      } else {
        setTestResult({
          observation: 'No reaction observed (Unreacted insoluble layer)',
          equation: 'R₃N + C₆H₅SO₂Cl → No reaction',
          explanation: 'c12_chem_cbse_319: Tertiary amines have no hydrogens on nitrogen and do not react with benzenesulphonyl chloride.'
        });
      }
    } else if (testReagent === 'carbylamine') {
      if (testAmine === '1deg') {
        setTestResult({
          observation: 'Extremely offensive, foul-smelling Isocyanide (Carbylamine) formed!',
          equation: 'R-NH₂ + CHCl₃ + 3KOH (alc.) --heat--> R-NC + 3KCl + 3H₂O',
          explanation: 'c12_chem_cbse_317: Carbylamine test is specific ONLY for 1° amines (both aliphatic & aromatic). Secondary and tertiary amines do NOT give this test.'
        });
      } else {
        setTestResult({
          observation: 'No foul smell, no reaction',
          equation: '2° or 3° Amine + CHCl₃ + KOH → No Isocyanide formation',
          explanation: 'c12_chem_cbse_317: Secondary and tertiary amines lack two N-H bonds required for carbylamine formation.'
        });
      }
    } else {
      // HNO2
      if (testAmine === '1deg') {
        setTestResult({
          observation: 'Brisk effervescence of Nitrogen gas (N₂ ↑) and formation of alcohol',
          equation: 'R-NH₂ + HNO₂ (NaNO₂+HCl) → R-OH + N₂↑ + H₂O',
          explanation: 'c12_chem_cbse_318: Primary aliphatic amines react with nitrous acid to give unstable diazonium salts, which decompose quantitatively releasing N₂ gas.'
        });
      } else if (testAmine === '2deg') {
        setTestResult({
          observation: 'Yellow oily liquid layer (N-Nitrosamine)',
          equation: 'R₂NH + HNO₂ → R₂N-N=O + H₂O',
          explanation: 'c12_chem_cbse_318: Secondary amines react with nitrous acid to yield yellow oily N-nitrosamines.'
        });
      } else {
        setTestResult({
          observation: 'Clear solution of soluble trialkylammonium nitrite salt formed',
          equation: 'R₃N + HNO₂ → [R₃NH]⁺ NO₂⁻',
          explanation: 'c12_chem_cbse_318: Tertiary amines dissolve in cold nitrous acid to form water-soluble ammonium nitrite salts.'
        });
      }
    }
  };

  // Handle Challenge submission
  const handleAnswerSubmit = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const currentChallenge = CHALLENGES[currentChallengeIdx];
    const isCorrect = optionIndex === currentChallenge.correctAnswer;

    if (isCorrect) {
      playAudio('success');
      playAudio('chime');
      speakText('Correct! Excellent grasp of amine chemistry.');
      setShowSuccessBanner(true);
      setShowConfetti(true);

      const updatedCompleted = [...challengeCompleted];
      updatedCompleted[currentChallengeIdx] = true;
      setChallengeCompleted(updatedCompleted);
      setScore(prev => prev + 100);

      // BKT & SRS updates
      const bktState = createBKTState();
      const newBkt = bktUpdate(bktState, true);
      const srsItem = createReviewItem(currentChallenge.nodeId, 'Chemistry');
      sm2Update(srsItem, 5, 0);
      recordGameScore([...NODE_IDS], 100);
    } else {
      playAudio('error');
      speakText('Not quite right. Review the explanation and try again!');
      const bktState = createBKTState();
      bktUpdate(bktState, false);
      const srsItem = createReviewItem(currentChallenge.nodeId, 'Chemistry');
      sm2Update(srsItem, 2, 0);
    }
  };

  const nextChallenge = () => {
    setShowSuccessBanner(false);
    setShowConfetti(false);
    setSelectedOption(null);
    setShowHint(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      playAudio('whoosh');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Banner & Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
            N
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Amines & Diazonium Salts
            </h1>
            <p className="text-xs text-slate-400">CBSE Class 12 Chemistry • Interactive Simulation</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/60">
          {[
            { id: 'learn', label: '1. Visual Concepts' },
            { id: 'lab', label: '2. Reaction Lab' },
            { id: 'tests', label: '3. Distinction Tests' },
            { id: 'arena', label: '4. Challenge Arena' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                playAudio('tap');
                setActiveTab(tab.id as any);
                speakText(`Switched to ${tab.label}`);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Master Score Display */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <span className="text-xs text-slate-400 font-medium">Arena Score</span>
          <span className="text-lg font-extrabold text-cyan-400">{score}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* TAB 1: VISUAL CONCEPTS & INTERACTIVE MODULES */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Module Switcher Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
              {[
                'Structure & Hybridization',
                'Classification & IUPAC',
                'Basicity & Solvation',
                'Resonance in Aniline',
                'Diazonium Synthesis'
              ].map((modName, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playAudio('tap');
                    setCurrentModule(idx);
                  }}
                  className={`p-3 rounded-xl text-xs font-bold transition-all ${
                    currentModule === idx
                      ? 'bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  Mod {idx + 1}: {modName}
                </button>
              ))}
            </div>

            {/* MODULE 1: Structure & Pyramidal Geometry */}
            {currentModule === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                        c12_chem_cbse_300 • c12_chem_cbse_301
                      </span>
                      <h2 className="text-xl font-bold mt-2 text-white">
                        Pyramidal Structure & sp³ Hybridization of Amines
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Nitrogen in amines is <strong>sp³ hybridized</strong> with 3 sigma bonds and 1 unshared lone pair.
                    Due to lone pair-bonding pair repulsions, the geometry is <strong>trigonal pyramidal</strong> with bond angles compressed from 109.5° to approximately <strong>108°</strong> (e.g., trimethylamine).
                  </p>

                  {/* Interactive SVG Geometry Visualizer */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center relative min-h-[280px]">
                    <svg className="w-64 h-64" viewBox="0 0 200 200">
                      {/* Nitrogen Atom */}
                      <circle cx="100" cy="80" r="24" fill="#6366f1" className="shadow-lg" />
                      <text x="100" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="16">
                        N
                      </text>

                      {/* Lone Pair Cloud */}
                      <ellipse cx="100" cy="42" rx="14" ry="20" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" strokeDasharray="3 3" />
                      <circle cx="95" cy="40" r="3" fill="#38bdf8" />
                      <circle cx="105" cy="40" r="3" fill="#38bdf8" />

                      {/* Bonds based on bond angle control */}
                      {/* Left CH3 */}
                      <line
                        x1="100"
                        y1="80"
                        x2={100 - 65 * Math.sin(((bondAngle / 2) * Math.PI) / 180)}
                        y2={80 + 65 * Math.cos(((bondAngle / 2) * Math.PI) / 180)}
                        stroke="#94a3b8"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx={100 - 65 * Math.sin(((bondAngle / 2) * Math.PI) / 180)}
                        cy={80 + 65 * Math.cos(((bondAngle / 2) * Math.PI) / 180)}
                        r="16"
                        fill="#334155"
                      />
                      <text
                        x={100 - 65 * Math.sin(((bondAngle / 2) * Math.PI) / 180)}
                        y={85 + 65 * Math.cos(((bondAngle / 2) * Math.PI) / 180)}
                        textAnchor="middle"
                        fill="#cbd5e1"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {substituentType === '1deg' ? 'H' : 'CH₃'}
                      </text>

                      {/* Right CH3 */}
                      <line
                        x1="100"
                        y1="80"
                        x2={100 + 65 * Math.sin(((bondAngle / 2) * Math.PI) / 180)}
                        y2={80 + 65 * Math.cos(((bondAngle / 2) * Math.PI) / 180)}
                        stroke="#94a3b8"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx={100 + 65 * Math.sin(((bondAngle / 2) * Math.PI) / 180)}
                        cy={80 + 65 * Math.cos(((bondAngle / 2) * Math.PI) / 180)}
                        r="16"
                        fill="#334155"
                      />
                      <text
                        x={100 + 65 * Math.sin(((bondAngle / 2) * Math.PI) / 180)}
                        y={85 + 65 * Math.cos(((bondAngle / 2) * Math.PI) / 180)}
                        textAnchor="middle"
                        fill="#cbd5e1"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {substituentType === '3deg' ? 'CH₃' : 'H'}
                      </text>

                      {/* Center Wedge/Dash (3rd bond) */}
                      <line x1="100" y1="80" x2="100" y2="155" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="100" cy="155" r="16" fill="#334155" />
                      <text x="100" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">
                        R
                      </text>
                    </svg>

                    <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 p-3 rounded-lg text-xs font-mono">
                      <div>Hybridization: <span className="text-cyan-400 font-bold">sp³</span></div>
                      <div>C-N-C Angle: <span className="text-amber-400 font-bold">{bondAngle}°</span></div>
                      <div>Geometry: <span className="text-indigo-300 font-bold">Pyramidal</span></div>
                    </div>
                  </div>

                  {/* Interactive Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400 block mb-2 font-semibold">
                        Adjust C-N-C Bond Angle Repulsion ({bondAngle}°)
                      </label>
                      <input
                        type="range"
                        min="104"
                        max="112"
                        value={bondAngle}
                        onChange={e => {
                          setBondAngle(Number(e.target.value));
                          playAudio('tap');
                        }}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-2 font-semibold">Degree of Substitution</label>
                      <div className="flex gap-2">
                        {(['1deg', '2deg', '3deg'] as const).map(deg => (
                          <button
                            key={deg}
                            onClick={() => {
                              setSubstituentType(deg);
                              playAudio('pop');
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              substituentType === deg
                                ? 'bg-cyan-500 text-slate-950'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {deg === '1deg' ? '1° Primary' : deg === '2deg' ? '2° Secondary' : '3° Tertiary'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hydrogen Bonding Live Canvas Simulation */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                      c12_chem_cbse_311 • c12_chem_cbse_312
                    </span>
                    <h3 className="text-lg font-bold mt-2 text-white">Hydrogen Bonding & Water Solubility</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Lower aliphatic amines dissolve readily in water by forming strong intermolecular H-bonds between N-H and water molecules.
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center">
                    <canvas ref={canvasRef} width={360} height={220} className="w-full max-w-[360px]" />
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-400">Boiling Point Order (Isomeric):</span>
                      <span className="font-mono font-bold text-cyan-400">1° &gt; 2° &gt; 3°</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Primary amines form 2 intermolecular H-bonds per molecule, secondary form 1, while tertiary amines cannot form intermolecular H-bonds with themselves due to lack of N-H bonds!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: Classification & IUPAC Nomenclature */}
            {currentModule === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                    c12_chem_cbse_302 • c12_chem_cbse_303 • c12_chem_cbse_304 • c12_chem_cbse_305
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2">
                    Classification & Systematic IUPAC Nomenclature
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      class: 'Primary (1°)',
                      formula: 'R-NH₂',
                      common: 'Ethylamine',
                      iupac: 'Ethanamine',
                      desc: 'One hydrogen of NH₃ replaced by alkyl/aryl group.'
                    },
                    {
                      class: 'Secondary (2°)',
                      formula: 'R₂NH or R-NH-R\'',
                      common: 'N-Methylethylamine',
                      iupac: 'N-Methylethanamine',
                      desc: 'Two hydrogens replaced. Simple if R=R\', Mixed if R≠R\'.'
                    },
                    {
                      class: 'Tertiary (3°)',
                      formula: 'R₃N',
                      common: 'Trimethylamine',
                      iupac: 'N,N-Dimethylmethanamine',
                      desc: 'All three hydrogens replaced by alkyl/aryl groups.'
                    }
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3 hover:border-cyan-500/50 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-cyan-400">{card.class}</span>
                        <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-indigo-300">
                          {card.formula}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{card.desc}</p>
                      <div className="border-t border-slate-800 pt-3 space-y-1 text-xs">
                        <div>
                          <span className="text-slate-500">Common Name:</span>{' '}
                          <span className="text-slate-200 font-semibold">{card.common}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">IUPAC Name:</span>{' '}
                          <span className="text-emerald-400 font-mono font-bold">{card.iupac}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* IUPAC Table Reference */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-4">
                  <h3 className="text-sm font-bold text-slate-200 mb-3">Key CBSE IUPAC Examples</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 uppercase font-mono">
                        <tr>
                          <th className="p-2.5">Structure</th>
                          <th className="p-2.5">Common Name</th>
                          <th className="p-2.5">IUPAC Name</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        <tr>
                          <td className="p-2.5 font-mono text-cyan-300">CH₃-CH₂-NH₂</td>
                          <td className="p-2.5">Ethylamine</td>
                          <td className="p-2.5 font-bold text-emerald-400">Ethanamine</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-mono text-cyan-300">CH₃-CH(NH₂)-CH₃</td>
                          <td className="p-2.5">Isopropylamine</td>
                          <td className="p-2.5 font-bold text-emerald-400">Propan-2-amine</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-mono text-cyan-300">CH₃-NH-CH₂-CH₃</td>
                          <td className="p-2.5">Methyl ethyl amine</td>
                          <td className="p-2.5 font-bold text-emerald-400">N-Methylethanamine</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-mono text-cyan-300">H₂N-(CH₂)₆-NH₂</td>
                          <td className="p-2.5">Hexamethylenediamine</td>
                          <td className="p-2.5 font-bold text-emerald-400">Hexane-1,6-diamine</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-mono text-cyan-300">C₆H₅-NH₂</td>
                          <td className="p-2.5">Aniline</td>
                          <td className="p-2.5 font-bold text-emerald-400">Benzenamine</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 3: Basicity & Solvation Effects */}
            {currentModule === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                      c12_chem_cbse_313 • c12_chem_cbse_314
                    </span>
                    <h2 className="text-xl font-bold text-white mt-2">
                      Basicity of Aliphatic Amines: Inductive, Solvation & Steric Effects
                    </h2>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Basicity is measured quantitatively by <strong>pK<sub>b</sub></strong> (where lower pK<sub>b</sub> = stronger base).
                    In aqueous medium, basic strength is decided by 3 competing factors:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs">
                      <div className="text-cyan-400 font-bold mb-1">1. Inductive (+I)</div>
                      <p className="text-slate-400">Alkyl groups push electron density to N, favoring basicity (3° &gt; 2° &gt; 1°).</p>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs">
                      <div className="text-emerald-400 font-bold mb-1">2. Solvation Energy</div>
                      <p className="text-slate-400">Hydration of cation stabilizes basicity (1° &gt; 2° &gt; 3° due to H-bonds with H₂O).</p>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs">
                      <div className="text-amber-400 font-bold mb-1">3. Steric Hindrance</div>
                      <p className="text-slate-400">Bulky alkyl groups block proton attack and hinder hydration.</p>
                    </div>
                  </div>

                  {/* Interactive Medium Simulator */}
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className="text-xs font-bold text-slate-300">Select Phase / Solvent Environment:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setMediumType('gas');
                            playAudio('tap');
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            mediumType === 'gas' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Gas Phase (No Solvation)
                        </button>
                        <button
                          onClick={() => {
                            setMediumType('aqueous');
                            playAudio('tap');
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            mediumType === 'aqueous' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Aqueous Solution
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                      <span className="text-xs font-bold text-slate-300">Alkyl Group:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setAlkylGroup('methyl');
                            playAudio('tap');
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            alkylGroup === 'methyl' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Methyl (-CH₃)
                        </button>
                        <button
                          onClick={() => {
                            setAlkylGroup('ethyl');
                            playAudio('tap');
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            alkylGroup === 'ethyl' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Ethyl (-C₂H₅)
                        </button>
                      </div>
                    </div>

                    {/* Result Card */}
                    <div className="bg-slate-900 border border-cyan-500/30 p-4 rounded-lg">
                      <div className="text-xs text-slate-400 font-mono">Resulting Basicity Order:</div>
                      <div className="text-lg font-bold text-cyan-400 mt-1">
                        {mediumType === 'gas' ? (
                          <span>3° &gt; 2° &gt; 1° &gt; NH₃</span>
                        ) : alkylGroup === 'ethyl' ? (
                          <span>(C₂H₅)₂NH &gt; (C₂H₅)₃N &gt; C₂H₅NH₂ &gt; NH₃ <span className="text-xs text-amber-400 ml-2 font-normal">(2° &gt; 3° &gt; 1° — "213")</span></span>
                        ) : (
                          <span>(CH₃)₂NH &gt; CH₃NH₂ &gt; (CH₃)₃N &gt; NH₃ <span className="text-xs text-amber-400 ml-2 font-normal">(2° &gt; 1° &gt; 3° — "213" / "213")</span></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">Key pK<sub>b</sub> Reference Table</h3>
                    <p className="text-xs text-slate-400 mb-4">Lower pK<sub>b</sub> = Stronger Base</p>

                    <div className="space-y-2.5">
                      {[
                        { compound: 'Diethylamine (2°)', pkb: '3.00', status: 'Very Strong Aliphatic Base' },
                        { compound: 'Triethylamine (3°)', pkb: '3.25', status: 'Strong Aliphatic Base' },
                        { compound: 'Ethylamine (1°)', pkb: '3.29', status: 'Strong Aliphatic Base' },
                        { compound: 'Ammonia (NH₃)', pkb: '4.75', status: 'Moderate Base' },
                        { compound: 'Aniline (C₆H₅NH₂)', pkb: '9.38', status: 'Weak Aromatic Base' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs">
                          <div>
                            <div className="font-semibold text-slate-200">{item.compound}</div>
                            <div className="text-[10px] text-slate-500">{item.status}</div>
                          </div>
                          <div className="font-mono font-bold text-amber-400 text-sm">{item.pkb}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
                    💡 <strong>CBSE Tip:</strong> Aliphatic amines are more basic than ammonia (+I effect increases N electron density). Aromatic amines are weaker than ammonia (resonance delocalizes lone pair).
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 4: Resonance in Aniline */}
            {currentModule === 3 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                    c12_chem_cbse_315 • c12_chem_cbse_320
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2">
                    Resonance Effect & Ortho-Para Directing Nature of Aniline
                  </h2>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  The lone pair on nitrogen in aniline is delocalized into the aromatic ring across <strong>5 canonical structures</strong>.
                  This reduces availability of electrons on nitrogen for protonation (making aniline weaker than ammonia) and increases electron density at <strong>ortho and para positions</strong> for electrophilic substitution.
                </p>

                {/* Interactive Resonance Carousel */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center justify-center min-h-[180px] w-full">
                    {/* SVG Representation of Canonical Resonance Structure */}
                    <svg className="w-64 h-48" viewBox="0 0 240 180">
                      {/* Benzene Ring */}
                      <polygon points="120,40 160,65 160,115 120,140 80,115 80,65" fill="none" stroke="#38bdf8" strokeWidth="3" />
                      
                      {/* -NH2 group */}
                      <line x1="120" y1="40" x2="120" y2="15" stroke="#38bdf8" strokeWidth="3" />
                      <text x="120" y="10" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="14">
                        {resStep === 0 ? 'NH₂' : 'NH₂⁺'}
                      </text>

                      {/* Double bond or negative charges based on step */}
                      {resStep === 0 && (
                        <>
                          <circle cx="120" cy="22" r="3" fill="#38bdf8" />
                          <circle cx="125" cy="22" r="3" fill="#38bdf8" />
                          <line x1="120" y1="50" x2="150" y2="68" stroke="#38bdf8" strokeWidth="3" />
                          <line x1="150" y1="110" x2="120" y2="130" stroke="#38bdf8" strokeWidth="3" />
                          <line x1="90" y1="110" x2="90" y2="70" stroke="#38bdf8" strokeWidth="3" />
                        </>
                      )}

                      {resStep === 1 && (
                        <>
                          {/* Ortho negative charge */}
                          <circle cx="80" cy="65" r="8" fill="rgba(239, 68, 68, 0.4)" />
                          <text x="80" y="69" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="12">-</text>
                          <line x1="120" y1="35" x2="120" y2="40" stroke="#38bdf8" strokeWidth="5" />
                        </>
                      )}

                      {resStep === 2 && (
                        <>
                          {/* Para negative charge */}
                          <circle cx="120" cy="140" r="8" fill="rgba(239, 68, 68, 0.4)" />
                          <text x="120" y="144" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="12">-</text>
                          <line x1="120" y1="35" x2="120" y2="40" stroke="#38bdf8" strokeWidth="5" />
                        </>
                      )}

                      {resStep === 3 && (
                        <>
                          {/* Other Ortho negative charge */}
                          <circle cx="160" cy="65" r="8" fill="rgba(239, 68, 68, 0.4)" />
                          <text x="160" y="69" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="12">-</text>
                          <line x1="120" y1="35" x2="120" y2="40" stroke="#38bdf8" strokeWidth="5" />
                        </>
                      )}

                      {resStep === 4 && (
                        <>
                          {/* Resonance Hybrid */}
                          <circle cx="120" cy="90" r="32" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                          <text x="120" y="95" textAnchor="middle" fill="#a855f7" fontWeight="bold" fontSize="11">Hybrid</text>
                        </>
                      )}
                    </svg>
                  </div>

                  <div className="flex items-center gap-3">
                    {[0, 1, 2, 3, 4].map(step => (
                      <button
                        key={step}
                        onClick={() => {
                          setResStep(step);
                          playAudio('tap');
                        }}
                        className={`w-9 h-9 rounded-full font-bold text-xs transition-all ${
                          resStep === step
                            ? 'bg-cyan-500 text-slate-950 scale-110 shadow-lg shadow-cyan-500/30'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {step === 4 ? 'H' : `I${step + 1}`}
                      </button>
                    ))}
                  </div>

                  <div className="text-center text-xs text-slate-300 max-w-md">
                    {resStep === 0 && 'Structure I: Neutral Aniline with unshared lone pair on Nitrogen.'}
                    {resStep === 1 && 'Structure II: Electron pair shifts into ring, developing negative charge at Ortho position.'}
                    {resStep === 2 && 'Structure III: Negative charge delocalizes to Para position.'}
                    {resStep === 3 && 'Structure IV: Negative charge delocalizes to second Ortho position.'}
                    {resStep === 4 && 'Resonance Hybrid: High electron density concentrated at Ortho and Para positions!'}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 5: Diazonium Synthesis & Reactions */}
            {currentModule === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                    c12_chem_cbse_323 • c12_chem_cbse_325 • c12_chem_cbse_326 • c12_chem_cbse_327
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2">
                    Diazotisation & Synthetic Utility of Benzenediazonium Salts
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Synthesis Scheme */}
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
                    <h3 className="text-sm font-bold text-cyan-400">Preparation by Diazotisation</h3>
                    <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800">
                      C₆H₅NH₂ + NaNO₂ + 2HCl <br />
                      <span className="text-amber-400">--- (273 - 278 K) ---&gt;</span> <br />
                      <span className="text-emerald-400 font-bold">C₆H₅N₂⁺ Cl⁻</span> + NaCl + 2H₂O
                    </div>
                    <p className="text-xs text-slate-400">
                      Nitrous acid (HNO₂) is produced <i>in situ</i>. Arenediazonium salts are stable only at ice-cold temperatures (0-5 °C) due to resonance stabilization.
                    </p>
                  </div>

                  {/* Sandmeyer & Displacement Reactions */}
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
                    <h3 className="text-sm font-bold text-cyan-400">Synthetic Transformations</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                        <span className="text-slate-300 font-mono">Cu₂Cl₂ / HCl (Sandmeyer)</span>
                        <span className="text-emerald-400 font-bold">Chlorobenzene (C₆H₅Cl)</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                        <span className="text-slate-300 font-mono">Cu₂(CN)₂ / KCN</span>
                        <span className="text-emerald-400 font-bold">Benzonitrile (C₆H₅CN)</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                        <span className="text-slate-300 font-mono">KI + Warm</span>
                        <span className="text-emerald-400 font-bold">Iodobenzene (C₆H₅I)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 font-mono">Phenol (pH 9-10)</span>
                        <span className="text-amber-400 font-bold">p-Hydroxyazobenzene (Orange Dye)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REACTION LAB */}
        {activeTab === 'lab' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                c12_chem_cbse_306 • c12_chem_cbse_308 • c12_chem_cbse_310 • c12_chem_cbse_323
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Organic Reaction Builder</h2>
              <p className="text-xs text-slate-400">Synthesize target amine products using standard CBSE pathways.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">1. Select Starting Material</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'nitro', label: 'Nitrobenzene (R-NO₂)' },
                      { id: 'nitrile', label: 'Propanenitrile (R-CN)' },
                      { id: 'amide', label: 'Ethanamide (R-CONH₂)' },
                      { id: 'aniline', label: 'Aniline (C₆H₅NH₂)' }
                    ].map(mat => (
                      <button
                        key={mat.id}
                        onClick={() => {
                          setStartingMat(mat.id as any);
                          playAudio('tap');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold border text-left transition-all ${
                          startingMat === mat.id
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {mat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">2. Choose Reagent & Conditions</label>
                  <select
                    value={reagent}
                    onChange={e => setReagent(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Fe/HCl">Fe + conc. HCl (Reduction)</option>
                    <option value="H2/Pd-C">H₂ / Pd catalyst in ethanol</option>
                    <option value="LiAlH4">LiAlH₄ in ether (Reduction of Nitrile)</option>
                    <option value="Br2/NaOH">Br₂ + 4 NaOH (Hoffmann Bromamide)</option>
                    <option value="NaNO2+HCl (0-5°C)">NaNO₂ + HCl at 273 - 278 K (Diazotisation)</option>
                  </select>
                </div>

                <button
                  onClick={handleExecuteReaction}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold rounded-lg shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
                >
                  ⚡ Execute Transformation
                </button>
              </div>

              {/* Reaction Output Display */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reaction Result</span>
                  {reactionOutput ? (
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="text-xs text-slate-500">Formed Product:</div>
                        <div className="text-lg font-bold text-emerald-400 mt-0.5">{reactionOutput.product}</div>
                      </div>

                      <div>
                        <div className="text-xs text-slate-500">Chemical Equation:</div>
                        <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-cyan-300 border border-slate-800 mt-1">
                          {reactionOutput.equation}
                        </div>
                      </div>

                      <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-lg text-xs text-cyan-200 leading-relaxed">
                        {reactionOutput.note}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 mt-8 text-center">
                      Select reagents and click Execute to observe reaction pathway.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DISTINCTION TESTS */}
        {activeTab === 'tests' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                c12_chem_cbse_317 • c12_chem_cbse_318 • c12_chem_cbse_319
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Laboratory Distinction Tests Visualizer</h2>
              <p className="text-xs text-slate-400">Distinguish between Primary (1°), Secondary (2°), and Tertiary (3°) Amines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Tube Selector & Reagents */}
              <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">Select Amine Sample</label>
                  <div className="flex gap-2">
                    {[
                      { id: '1deg', label: '1° Primary' },
                      { id: '2deg', label: '2° Secondary' },
                      { id: '3deg', label: '3° Tertiary' }
                    ].map(sample => (
                      <button
                        key={sample.id}
                        onClick={() => {
                          setTestAmine(sample.id as any);
                          playAudio('tap');
                        }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          testAmine === sample.id
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {sample.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">Select Diagnostic Reagent</label>
                  <div className="space-y-2">
                    {[
                      { id: 'hinsberg', label: 'Hinsberg Reagent (Benzenesulphonyl Chloride + KOH)' },
                      { id: 'carbylamine', label: 'Carbylamine Test (CHCl₃ + alc. KOH + Heat)' },
                      { id: 'hno2', label: 'Nitrous Acid Test (NaNO₂ + HCl)' }
                    ].map(r => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setTestReagent(r.id as any);
                          playAudio('tap');
                        }}
                        className={`w-full p-3 rounded-lg text-xs font-bold text-left border transition-all ${
                          testReagent === r.id
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleRunDistinctionTest}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold rounded-lg shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all"
                >
                  🧪 Perform Qualitative Test
                </button>
              </div>

              {/* Lab Test Tube SVG Visualizer & Result */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col items-center justify-between">
                <div className="w-full flex justify-center py-4">
                  {/* Test Tube SVG */}
                  <svg className="w-24 h-48" viewBox="0 0 100 200">
                    {/* Glass Tube */}
                    <path
                      d="M 30,20 L 30,160 Q 30,180 50,180 Q 70,180 70,160 L 70,20"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="4"
                    />
                    {/* Lip */}
                    <ellipse cx="50" cy="20" rx="22" ry="5" fill="none" stroke="#94a3b8" strokeWidth="4" />
                    
                    {/* Liquid Content */}
                    <path
                      d="M 32,90 L 32,160 Q 32,178 50,178 Q 68,178 68,160 L 68,90 Z"
                      fill={testResult ? '#06b6d4' : '#334155'}
                      opacity="0.8"
                    />

                    {/* Bubbles if HNO2 and 1deg */}
                    {testResult && testReagent === 'hno2' && testAmine === '1deg' && (
                      <>
                        <circle cx="45" cy="120" r="4" fill="#ffffff" opacity="0.8" />
                        <circle cx="55" cy="100" r="5" fill="#ffffff" opacity="0.8" />
                        <circle cx="48" cy="70" r="3" fill="#ffffff" opacity="0.8" />
                      </>
                    )}
                  </svg>
                </div>

                {testResult ? (
                  <div className="w-full space-y-3 bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 font-bold">Observation:</span>
                      <div className="text-amber-300 font-semibold mt-0.5">{testResult.observation}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold">Equation:</span>
                      <div className="font-mono text-cyan-300 text-[11px] mt-0.5">{testResult.equation}</div>
                    </div>
                    <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">{testResult.explanation}</p>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">Run test to see test tube reaction observation.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHALLENGE ARENA */}
        {activeTab === 'arena' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 relative overflow-hidden">
            {/* Header / Progress Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
                  {CHALLENGES[currentChallengeIdx].nodeId}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">
                  Question {currentChallengeIdx + 1} of {CHALLENGES.length}: {CHALLENGES[currentChallengeIdx].title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {CHALLENGES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentChallengeIdx
                        ? 'bg-cyan-400 ring-4 ring-cyan-500/20 scale-125'
                        : challengeCompleted[idx]
                        ? 'bg-emerald-500'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <p className="text-base font-semibold text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {CHALLENGES[currentChallengeIdx].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === CHALLENGES[currentChallengeIdx].correctAnswer;
                const showFeedback = selectedOption !== null;

                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';
                if (showFeedback) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`p-4 rounded-xl border text-left text-sm transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {showFeedback && isCorrect && <span className="text-emerald-400 font-bold text-lg">✓</span>}
                    {showFeedback && isSelected && !isCorrect && <span className="text-rose-400 font-bold text-lg">✗</span>}
                  </button>
                );
              })}
            </div>

            {/* Hint & Navigation Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  setShowHint(prev => !prev);
                  playAudio('hint');
                }}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
              >
                {showHint ? 'Hide Hint' : '💡 Need a Hint?'}
              </button>

              {selectedOption !== null && (
                <button
                  onClick={nextChallenge}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Question →' : 'Finish Challenge Set'}
                </button>
              )}
            </div>

            {/* Interactive Components */}
      <HintBubble show={showHint} text={CHALLENGES[currentChallengeIdx].hint} />
            <Confetti show={showConfetti} />
            <SuccessBanner show={showSuccessBanner} text="Correct Answer! +100 XP" />
            <SparkleBurst show={showSparkle.show} x={showSparkle.x} y={showSparkle.y} />

            {/* Explanation box on response */}
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mt-4"
              >
                <strong className="text-cyan-400 block mb-1">NCERT Explanation:</strong>
                {CHALLENGES[currentChallengeIdx].explanation}
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 px-6 py-4 text-center text-xs text-slate-500">
        NCERT Aligned • CBSE Class 12 Chemistry • Amines and Diazonium Salts Complete Mastery Module
      </footer>

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
    </div>
  );
}