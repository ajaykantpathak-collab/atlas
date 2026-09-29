'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ALL CBSE NODE IDS REQUIRED
const NODE_IDS = {
  DETECTION_N: 'c11_chem_cbse_004',
  DETECTION_S: 'c11_chem_cbse_005',
  DETECTION_HALOGENS: 'c11_chem_cbse_006',
  DETECTION_P: 'c11_chem_cbse_007',
  LASSAIGNE_N: 'c11_chem_cbse_008',
  LASSAIGNE_S: 'c11_chem_cbse_009',
  LASSAIGNE_HALOGENS: 'c11_chem_cbse_010',
  QUANT_C_H: 'c11_chem_cbse_011',
  QUANT_N: 'c11_chem_cbse_012',
  QUANT_HALOGENS: 'c11_chem_cbse_013',
  QUANT_MOL_MASS: 'c11_chem_cbse_014',
  EMPIRICAL_FORMULA: 'c11_chem_cbse_015',
  MOLECULAR_FORMULA: 'c11_chem_cbse_016',
  INDUCTIVE_EFFECT: 'c11_chem_cbse_017',
  RESONANCE: 'c11_chem_cbse_018',
  ELECTROMERIC_HYPERCONJUGATION: 'c11_chem_cbse_019',
};

// Types
type TabType = 'visualizer' | 'lessons' | 'challenges' | 'summary';

interface ChallengeItem {
  id: number;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

// Interactive Visualizer Canvas: TLC Chromatography & Distillation
const DistillationCanvas: React.FC<{ activeTechnique: 'distillation' | 'tlc' }> = ({ activeTechnique }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeTechnique === 'distillation') {
        // Draw Distillation Apparatus
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Flask Body
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(120, 220, 50, 0, Math.PI * 2);
        ctx.stroke();

        // Liquid in flask
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(120, 220, 48, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.fill();

        // Boiling bubbles
        for (let i = 0; i < 5; i++) {
          const bx = 100 + Math.sin(frame * 0.1 + i) * 20;
          const by = 240 - ((frame * 2 + i * 20) % 40);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.beginPath();
          ctx.arc(bx, by, 3 + (i % 3), 0, Math.PI * 2);
          ctx.fill();
        }

        // Condenser Column
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(120, 170);
        ctx.lineTo(120, 110);
        ctx.lineTo(280, 180);
        ctx.stroke();

        // Vapors rising
        ctx.fillStyle = 'rgba(236, 72, 153, 0.5)';
        for (let i = 0; i < 8; i++) {
          const vy = 170 - ((frame * 1.5 + i * 15) % 60);
          ctx.beginPath();
          ctx.arc(120, vy, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Condensed drops in tube
        const dropProgress = (frame * 2) % 180;
        const dx = 120 + dropProgress * 0.88;
        const dy = 110 + dropProgress * 0.38;
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(dx, dy, 5, 0, Math.PI * 2);
        ctx.fill();

        // Receiving flask
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(300, 230, 30, 0, Math.PI * 2);
        ctx.stroke();

        // Purified distillate liquid
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(300, 230, 28, 0.3 * Math.PI, 0.7 * Math.PI);
        ctx.fill();

        // Labels
        ctx.fillStyle = '#f8fafc';
        ctx.font = '12px sans-serif';
        ctx.fillText('Impure Liquid Mixture', 60, 290);
        ctx.fillText('Liebig Condenser', 180, 100);
        ctx.fillText('Purified Distillate', 260, 280);
      } else {
        // Draw TLC Plate
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // TLC Glass Plate
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(150, 30, 140, 240);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.strokeRect(150, 30, 140, 240);

        // Baseline
        ctx.strokeStyle = '#ef4444';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(150, 230);
        ctx.lineTo(290, 230);
        ctx.stroke();
        ctx.setLineDash([]);

        // Solvent Front
        const solventHeight = Math.min(200, (frame * 1.5) % 220);
        const currentSolventY = 230 - solventHeight;
        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(150, currentSolventY);
        ctx.lineTo(290, currentSolventY);
        ctx.stroke();

        // Sample Spot A (Rf = 0.6)
        const spotA_Y = 230 - solventHeight * 0.6;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(190, spotA_Y, 7, 0, Math.PI * 2);
        ctx.fill();

        // Sample Spot B (Rf = 0.35)
        const spotB_Y = 230 - solventHeight * 0.35;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(250, spotB_Y, 7, 0, Math.PI * 2);
        ctx.fill();

        // Labels & Measurements
        ctx.fillStyle = '#f8fafc';
        ctx.font = '12px sans-serif';
        ctx.fillText('Solvent Front Line', 20, Math.max(40, currentSolventY));
        ctx.fillText('Base Line (Origin)', 20, 234);

        ctx.fillStyle = '#10b981';
        ctx.fillText(`Spot A (Rf = 0.60)`, 300, Math.max(50, spotA_Y));
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(`Spot B (Rf = 0.35)`, 300, Math.max(70, spotB_Y));
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTechnique]);

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
      <canvas ref={canvasRef} width={450} height={320} className="rounded-lg shadow-lg" />
    </div>
  );
};

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 11 Organic Chemistry Analysis Lab',
  subtitle: 'Master Qualitative and Quantitative Analysis of Organic Compounds',
  description: 'Step into a virtual analytical lab where you perform Lassaigne tests, estimate elements quantitatively, and calculate empirical and molecular formulas.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Lassaigne Test Puzzle',
  question: 'In the Lassaigne test, why is sodium metal used to fuse the organic compound, and what happens if the compound contains nitrogen but the fusion is incomplete?',
  options: [
    'Sodium acts as a catalyst; incomplete fusion gives a false positive for sulphur',
    'Sodium converts covalent N, S, X to ionic NaCN, Na2S, NaX; incomplete fusion gives a false negative for nitrogen',
    'Sodium dissolves the compound; incomplete fusion has no effect on results',
    'Sodium reduces the compound; incomplete fusion gives a false positive for halogens'
],
  correctIndex: 1,
  explanation: 'Sodium metal reacts with covalently bonded N, S, and X in organic compounds during fusion to produce ionic NaCN, Na2S, and NaX respectively. If fusion is incomplete, insufficient NaCN forms, leading to a false negative in the Prussian blue test for nitrogen.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "detection",
    "name": "Element Detection Lab",
    "description": "Perform Lassaigne tests for N, S, X, and P."
  },
  {
    "id": "quantitative",
    "name": "Quantitative Analysis Station",
    "description": "Estimate C, H, N, and halogens by mass."
  },
  {
    "id": "formula",
    "name": "Formula Calculation Lab",
    "description": "Calculate empirical and molecular formulas from percentage composition."
  },
  {
    "id": "effects",
    "name": "Electronic Effects Lab",
    "description": "Study inductive, resonance, electromeric effects, and hyperconjugation."
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
    "title": "Kjeldahl's method can estimate nitrogen in all nitrogenous organic compounds",
    "description": "Students believe that Kjeldahl's method can be universally applied to quantify nitrogen in any organic compound containing N, including nitro compounds, azo compounds, and ring nitrogens.",
    "correction": "Kjeldahl's method fails for nitro compounds (-NO2), azo compounds (-N=N-), and nitrogen present in aromatic rings (e.g., pyridine). In these structures, nitrogen is not quantitatively converted into ammonium sulfate during sulfuric acid digestion. Dumas method must be used instead for such compounds."
  },
  {
    "id": "misc_2",
    "title": "Boiling sodium extract with nitric acid before halogen test is optional",
    "description": "Students incorrectly think that boiling the Sodium Fusion Extract with concentrated nitric acid prior to adding silver nitrate is just a cleaning step rather than a critical reaction.",
    "correction": "If nitrogen or sulfur is present in the compound, the extract contains sodium cyanide or sodium sulfide. These species react with silver nitrate to form interfering white (AgCN) or black (Ag2S) precipitates. Boiling with concentrated nitric acid decomposes NaCN and Na2S into HCN and H2S gases, purging them before testing for halogens."
  },
  {
    "id": "misc_3",
    "title": "Resonance effect diminishes rapidly with distance like inductive effect",
    "description": "Students believe that the resonance (+R/-R) effect decreases as the distance between the functional group and the reaction center increases, mirroring inductive behavior.",
    "correction": "Unlike the inductive effect which operates through sigma bonds and weakens sharply after 3-4 carbons, the resonance effect operates through pi-bonds in conjugated systems. Its electronic influence remains almost equally transmitted across the entire length of the conjugated chain, regardless of distance."
  },
  {
    "id": "misc_4",
    "title": "Hyperconjugation involves the delocalization of pi electrons",
    "description": "Students frequently confuse hyperconjugation with resonance, assuming hyperconjugation involves the delocalization of pi-electrons across unsaturated bonds.",
    "correction": "Hyperconjugation involves the delocalization of sigma electrons from a C-H bond attached to a carbon directly adjacent to an unsaturated center or carbocation (alpha C-H). These C-H sigma electrons overlap with an adjacent unhybridized empty p-orbital or pi-star antibonding orbital, which is why it is distinct from pi-pi resonance."
  },
  {
    "id": "misc_5",
    "title": "Electromeric effect operates permanently in ground state organic molecules",
    "description": "Students categorize the electromeric (+E/-E) effect as a permanent structural property of a molecule, similar to inductive and resonance effects.",
    "correction": "The electromeric effect is a purely temporary electronic effect that operates only in compounds containing multiple bonds when an attacking reagent approaches. As soon as the attacking reagent is removed from the reaction sphere, the shifted pi-electron pair returns instantly to its original positions, restoring the unpolarized molecule."
  }
];


export default function C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<TabType>('visualizer');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Gamification & Feedback States
  const [score, setScore] = useState<number>(0);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);

  // Interactive Visualizer Sub-States
  const [activeElement, setActiveElement] = useState<'N' | 'S' | 'Halogens' | 'P'>('N');
  const [selectedHalogen, setSelectedHalogen] = useState<'Cl' | 'Br' | 'I'>('Cl');
  const [fissionType, setFissionType] = useState<'homolytic' | 'heterolytic'>('homolytic');
  const [purificationMode, setPurificationMode] = useState<'distillation' | 'tlc'>('tlc');

  // Quantitative Solver Live Inputs
  const [massCompound, setMassCompound] = useState<number>(0.25);
  const [massCO2, setMassCO2] = useState<number>(0.44);
  const [massH2O, setMassH2O] = useState<number>(0.18);

  // SRS & BKT Tracking
  const [bktStates, setBktStates] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    Object.values(NODE_IDS).forEach((nodeId) => {
      initial[nodeId] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    Object.values(NODE_IDS).forEach((nodeId) => {
      initial[nodeId] = createReviewItem(nodeId, 'Chemistry');
    });
    return initial;
  });

  // Derived Calculations
  const calculatedPercentC = useMemo(() => {
    if (massCompound <= 0) return 0;
    return Number(((12 / 44) * (massCO2 / massCompound) * 100).toFixed(2));
  }, [massCompound, massCO2]);

  const calculatedPercentH = useMemo(() => {
    if (massCompound <= 0) return 0;
    return Number(((2 / 18) * (massH2O / massCompound) * 100).toFixed(2));
  }, [massCompound, massH2O]);

  const overallMastery = useMemo(() => {
    const levels = Object.values(bktStates).map((st) => getMasteryLevel(st));
    const avg = levels.reduce((acc, curr) => acc + curr, 0) / levels.length;
    return Math.round(avg * 100);
  }, [bktStates]);

  // Lesson Slides Content
  const lessonSlides = [
    {
      title: "Lassaigne's Test (Qualitative Analysis)",
      nodeId: NODE_IDS.LASSAIGNE_N,
      content: (
        <div className="space-y-3 text-slate-200">
          <p className="text-sm leading-relaxed">
            Organic compounds covalently bond {'$N, S, X$'} (halogens). To detect them, we perform <strong>Sodium Fusion</strong> to yield ionic sodium salts ({'$\\text{NaCN}, \\text{Na}_2\\text{S}, \\text{NaX}$'}).
          </p>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
            <p className="font-semibold text-gold-400">Key Confirmatory Reactions:</p>
            <p>• <strong>Nitrogen:</strong> {'$\\text{NaCN} + \\text{FeSO}_4 \\rightarrow \\text{Na}_4[\\text{Fe}(\\text{CN})_6]$'}; Acidified with {'$\\text{FeCl}_3 \\rightarrow$'} <span className="text-gold-400 font-bold">Prussian Blue ({'$\\text{Fe}_4[\\text{Fe}(\\text{CN})_6]_3$'})</span></p>
            <p>• <strong>Sulphur:</strong> {'$\\text{Na}_2\\text{S} + \\text{Sodium Nitroprusside} \\rightarrow$'} <span className="text-purple-400 font-bold">Violet Color</span>; Lead acetate {'$\\rightarrow$'} <span className="text-slate-300 font-bold">Black PbS ppt</span></p>
            <p>• <strong>Halogens:</strong> {'$\\text{NaX} + \\text{AgNO}_3 \\xrightarrow{\\text{HNO}_3}$'} <span className="text-yellow-200 font-bold">AgCl (White), AgBr (Pale Yellow), AgI (Yellow)</span></p>
          </div>
        </div>
      )
    },
    {
      title: "Quantitative Analysis & Combustion",
      nodeId: NODE_IDS.QUANT_C_H,
      content: (
        <div className="space-y-3 text-slate-200">
          <p className="text-sm leading-relaxed">
            A known mass of organic compound is completely oxidized with {'$\\text{CuO}$'} in excess {'$\\text{O}_2$'}. Carbon produces {'$\\text{CO}_2$'} (absorbed in {'$\\text{KOH}$'}) and Hydrogen produces {'$\\text{H}_2\\text{O}$'} (absorbed in anhydrous {'$\\text{CaCl}_2$'}).
          </p>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs font-mono space-y-2">
            <p className="text-emerald-400">{'% C = \\frac{12}{44} \\times \\frac{\\text{Mass of CO}_2}{\\text{Mass of Compound}} \\times 100'}</p>
            <p className="text-gold-400">{'% H = \\frac{2}{18} \\times \\frac{\\text{Mass of H}_2\\text{O}}{\\text{Mass of Compound}} \\times 100'}</p>
            <p className="text-amber-400">% O = 100 - (\%C + \%H + \%N + \%S + \%X)</p>
          </div>
        </div>
      )
    },
    {
      title: "Nitrogen Estimation: Dumas vs Kjeldahl",
      nodeId: NODE_IDS.QUANT_N,
      content: (
        <div className="space-y-3 text-slate-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-bold text-amber-400 block mb-1">Dumas Method</span>
              <p>Organic compound is heated with {'$\\text{CuO}$'} in {'$\\text{CO}_2$'} atmosphere to liberate free {'$\\text{N}_2$'} gas collected over {'$\\text{KOH}$'} solution.</p>
              <p className="mt-2 font-mono text-gold-300">{'%N = \\frac{28}{22400} \\times \\frac{V_{\\text{STP}}}{\\text{Mass of Compound}} \\times 100'}</p>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-bold text-emerald-400 block mb-1">Kjeldahl Method</span>
              <p>Digested with conc. {'$\\text{H}_2\\text{SO}_4 \\rightarrow (\\text{NH}_4)_2\\text{SO}_4$'}. Liberated {'$\\text{NH}_3$'} with {'$\\text{NaOH}$'} is absorbed in standard acid.</p>
              <p className="mt-2 font-mono text-emerald-300">{'%N = \\frac{1.4 \\times M \\times 2 \\times V_{\\text{acid}}}{\\text{Mass of Compound}}'}</p>
            </div>
          </div>
          <p className="text-xs text-rose-300 italic">Note: Kjeldahl method fails for nitro, azo groups, and pyridine nitrogen!</p>
        </div>
      )
    },
    {
      title: "Empirical & Molecular Formula Determination",
      nodeId: NODE_IDS.EMPIRICAL_FORMULA,
      content: (
        <div className="space-y-3 text-slate-200 text-xs">
          <p className="text-sm">Steps to determine molecular formula from elemental percentage composition:</p>
          <ol className="list-decimal list-inside space-y-1 bg-slate-800 p-3 rounded-lg border border-slate-700">
            <li>Divide elemental percentage by its atomic mass to get molar ratio.</li>
            <li>Divide each ratio by the smallest molar ratio to get the simplest atomic ratio.</li>
            <li>Convert simple ratios to whole numbers to find <strong>Empirical Formula</strong>.</li>
            <li>Calculate {'$n = \\frac{\\text{Molecular Mass}}{\\text{Empirical Formula Mass}}$'}.</li>
            <li><strong>Molecular Formula</strong> = {'$(\\text{Empirical Formula})_n$'}.</li>
          </ol>
        </div>
      )
    },
    {
      title: "Bond Cleavage & Electronic Effects",
      nodeId: NODE_IDS.INDUCTIVE_EFFECT,
      content: (
        <div className="space-y-3 text-slate-200 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-bold text-purple-400 block mb-1">Homolytic Fission</span>
              <p>Equal electron sharing cleavage yields neutral <strong>Free Radicals</strong> ($R^\bullet$). Occurs in non-polar bonds under light/heat.</p>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-bold text-gold-400 block mb-1">Heterolytic Fission</span>
              <p>Unequal cleavage yields ionic species: <strong>Carbocation</strong> ($R^+$) and <strong>Carbanion</strong> ($R^-$).</p>
            </div>
          </div>
          <p className="bg-slate-800 p-2 rounded border border-slate-700">
            <strong>Inductive Effect:</strong> Permanent electron displacement along a {'$\\sigma$'}-bond chain due to electronegativity differences ({'$+I$'} and {'$-I$'}).
          </p>
        </div>
      )
    }
  ];

  // Progressive CBSE Challenges
  const challenges: ChallengeItem[] = [
    {
      id: 1,
      nodeId: NODE_IDS.DETECTION_N,
      title: "Prussian Blue Complex",
      question: "In Lassaigne's test for nitrogen, the formation of Prussian Blue is due to which ferric ferrocyanide complex formula?",
      options: [
        "Fe3[Fe(CN)6]2",
        "Fe4[Fe(CN)6]3",
        "Na4[Fe(CN)6]",
        "Fe[Fe(CN)5NOS]"
      ],
      correctIndex: 1,
      explanation: "Lassaigne's extract containing NaCN reacts with FeSO4 and FeCl3 under acidic conditions to form Prussian Blue: Fe4[Fe(CN)6]3.",
      hint: "Remember the iron valence balance: 4 Fe(III) ions match 3 hexacyanoferrate(II) anions with -4 charge."
    },
    {
      id: 2,
      nodeId: NODE_IDS.DETECTION_HALOGENS,
      title: "Halogen Detection Interference",
      question: "Why is Lassaigne's extract boiled with dilute nitric acid before adding silver nitrate solution during test for halogens?",
      options: [
        "To solubilize silver halides",
        "To decompose NaCN and Na2S which would otherwise interfere by forming precipitates",
        "To oxidize halogens to free halogen gas",
        "To increase the pH of the extract"
      ],
      correctIndex: 1,
      explanation: "Boiling with HNO3 decomposes NaCN and Na2S to HCN and H2S gases, preventing interference from AgCN or Ag2S precipitates.",
      hint: "Cyanide and sulphide ions also form insoluble precipitates with silver ions."
    },
    {
      id: 3,
      nodeId: NODE_IDS.QUANT_C_H,
      title: "Combustion Analysis Calculation",
      question: "0.24 g of an organic compound on complete combustion gave 0.44 g CO2 and 0.18 g H2O. What are the percentages of Carbon and Hydrogen?",
      options: [
        "C = 50.0%, H = 8.33%",
        "C = 40.0%, H = 6.67%",
        "C = 60.0%, H = 10.0%",
        "C = 25.0%, H = 12.5%"
      ],
      correctIndex: 0,
      explanation: "%C = (12/44)*(0.44/0.24)*100 = 50.0%; %H = (2/18)*(0.18/0.24)*100 = 8.33%.",
      hint: "Use %C = (12/44)*(mass CO2 / mass compound)*100 and %H = (2/18)*(mass H2O / mass compound)*100."
    },
    {
      id: 4,
      nodeId: NODE_IDS.QUANT_N,
      title: "Kjeldahl Nitrogen Estimation",
      question: "0.50 g of an organic compound was digested by Kjeldahl method. Ammonia evolved neutralized 20 mL of 0.5 M H2SO4. What is the % of Nitrogen?",
      options: [
        "28.0%",
        "56.0%",
        "14.0%",
        "42.0%"
      ],
      correctIndex: 1,
      explanation: "20 mL of 0.5 M H2SO4 = 20 mL of 1 N H2SO4 = 20 meq. %N = (1.4 * 2 * 0.5 * 20) / 0.50 = 56.0%.",
      hint: "Molarity of H2SO4 is multiplied by 2 for normality: %N = (1.4 * M * 2 * V) / mass."
    },
    {
      id: 5,
      nodeId: NODE_IDS.QUANT_HALOGENS,
      title: "Carius Method Chlorine %",
      question: "In Carius estimation, 0.30 g of organic compound gave 0.287 g of AgCl (Molar mass AgCl = 143.5 g/mol). Calculate % of Chlorine.",
      options: [
        "12.50%",
        "23.67%",
        "35.50%",
        "47.33%"
      ],
      correctIndex: 1,
      explanation: "%Cl = (35.5 / 143.5) * (0.287 / 0.30) * 100 = 0.24738 * 0.9566 * 100 = 23.67%.",
      hint: "Use atomic mass ratio: (35.5 / 143.5) * (mass AgCl / mass compound) * 100."
    },
    {
      id: 6,
      nodeId: NODE_IDS.MOLECULAR_FORMULA,
      title: "Molecular Formula Calculation",
      question: "An organic compound has Empirical Formula CH2O and molar mass 180 g/mol. What is its Molecular Formula?",
      options: [
        "C2H4O2",
        "C3H6O3",
        "C6H12O6",
        "C12H22O11"
      ],
      correctIndex: 2,
      explanation: "Empirical mass of CH2O = 12 + 2 + 16 = 30 g/mol. n = 180 / 30 = 6. Molecular formula = (CH2O)6 = C6H12O6.",
      hint: "Divide molar mass by empirical unit mass to find multiplier n."
    },
    {
      id: 7,
      nodeId: NODE_IDS.ELECTROMERIC_HYPERCONJUGATION,
      title: "TLC Retention Factor (Rf)",
      question: "In Thin Layer Chromatography (TLC), if the solute spot travels 4.2 cm and the solvent front travels 7.0 cm, what is the Rf value?",
      options: [
        "0.60",
        "1.67",
        "0.42",
        "0.70"
      ],
      correctIndex: 0,
      explanation: "Rf = (Distance moved by compound) / (Distance moved by solvent front) = 4.2 / 7.0 = 0.60.",
      hint: "Rf is always a fraction less than or equal to 1.0."
    },
    {
      id: 8,
      nodeId: NODE_IDS.INDUCTIVE_EFFECT,
      title: "Bond Fission Reaction",
      question: "The heterolytic cleavage of CH3-Cl bond produces which ionic intermediates?",
      options: [
        "CH3. (methyl radical) + Cl.",
        "CH3+ (carbocation) + Cl- (chloride ion)",
        "CH3- (carbanion) + Cl+",
        "CH4 + Cl2"
      ],
      correctIndex: 1,
      explanation: "Chlorine is more electronegative than carbon, so it takes both bonding electrons yielding CH3+ and Cl-.",
      hint: "Electronegative chlorine pulls the shared electron pair towards itself."
    }
  ];

  // Speech narration helper
  const speakText = (text: string) => {
    speechManager.speak(text);
  };

  // Audio trigger helper
  const triggerAudio = (sound: SoundEffect) => {
    audioManager.play(sound);
  };

  // Tab switching handler
  const handleTabChange = (tab: TabType) => {
    triggerAudio('tap');
    setActiveTab(tab);
    if (tab === 'visualizer') {
      speakText("Welcome to the Organic Qualitative and Quantitative Chemistry Interactive Visualizer.");
    } else if (tab === 'lessons') {
      speakText("Explore structured CBSE lessons on organic analysis and bonding principles.");
    } else if (tab === 'challenges') {
      speakText("Test your problem solving skills with CBSE examination challenges.");
    }
  };

  // Answer selection & evaluation
  const handleSelectOption = (index: number) => {
    if (answerSubmitted) return;
    triggerAudio('tap');
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || answerSubmitted) return;
    setAnswerSubmitted(true);

    const currentChallenge = challenges[currentChallengeIndex];
    const isCorrect = selectedAnswer === currentChallenge.correctIndex;

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const oldBkt = bktStates[nodeId] || createBKTState();
    const updatedBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const oldSrs = srsItems[nodeId] || createReviewItem(nodeId, 'Chemistry');
    const updatedSrs = sm2Update(oldSrs, isCorrect ? 5 : 2, 0);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      triggerAudio('success');
      triggerAudio('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
      setScore((prev) => prev + 15);
      speakText("Correct! Outstanding organic chemistry reasoning.");
    } else {
      triggerAudio('error');
      setHintText(currentChallenge.hint);
      setShowHint(true);
      speakText("That is incorrect. Review the hint provided.");
    }
  };

  const handleNextChallenge = () => {
    triggerAudio('tap');
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setShowHint(false);

    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      triggerAudio('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      recordGameScore(Object.values(NODE_IDS), score + 20);
      speakText("Congratulations! You have completed all CBSE Organic Chemistry Part 2 Challenges.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans max-w-7xl mx-auto flex flex-col gap-4">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All CBSE Challenges Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={hintText} />

      {/* Header Bar */}
      <header className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gold-400 via-gold-400 to-gold-400 bg-clip-text text-transparent">
            Organic Chemistry: Basic Principles & Techniques (Part 2)
          </h1>
          <p className="text-xs text-slate-400">
            CBSE Class 11 • Qualitative Analysis, Quantitative Estimation & Bonding
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block">Overall Mastery</span>
            <span className="text-emerald-400 font-bold text-sm">{overallMastery}%</span>
          </div>

          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block">Score Points</span>
            <span className="text-amber-400 font-bold text-sm">{score} XP</span>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <nav className="flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => handleTabChange('visualizer')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'visualizer'
              ? 'bg-gold-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          🧪 Interactive Lab Simulation
        </button>
        <button
          onClick={() => handleTabChange('lessons')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'lessons'
              ? 'bg-gold-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          📚 CBSE Theory Slides ({currentSlide + 1}/5)
        </button>
        <button
          onClick={() => handleTabChange('challenges')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'challenges'
              ? 'bg-gold-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          🎯 Adaptive Exercises ({currentChallengeIndex + 1}/{challenges.length})
        </button>
        <button
          onClick={() => handleTabChange('summary')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'summary'
              ? 'bg-gold-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          📊 Mastery & SRS Dashboard
        </button>
      </nav>

      {/* TAB 1: INTERACTIVE LAB SIMULATION */}
      {activeTab === 'visualizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Section A: Qualitative Lassaigne's Test Tube Visualizer */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <h2 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🔬</span> Lassaigne's Test Reaction Simulator
            </h2>

            <div className="flex gap-2 text-xs">
              {(['N', 'S', 'Halogens', 'P'] as const).map((elem) => (
                <button
                  key={elem}
                  onClick={() => {
                    triggerAudio('tap');
                    setActiveElement(elem);
                  }}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    activeElement === elem
                      ? 'bg-gold-600 text-white border-gold-400'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Detect {elem}
                </button>
              ))}
            </div>

            {/* Test Tube Visual SVG */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px] relative">
              <svg width="120" height="200" viewBox="0 0 120 200" className="drop-shadow-lg">
                {/* Outer Glass Tube */}
                <path
                  d="M 40,20 L 40,160 Q 40,180 60,180 Q 80,180 80,160 L 80,20"
                  fill="rgba(255,255,255,0.05)"
                  stroke="#94a3b8"
                  strokeWidth="3"
                />
                {/* Fluid Liquid inside tube based on active element */}
                {activeElement === 'N' && (
                  <path
                    d="M 42,90 L 42,160 Q 42,178 60,178 Q 78,178 78,160 L 78,90 Z"
                    fill="#1e3a8a"
                    opacity="0.9"
                  />
                )}
                {activeElement === 'S' && (
                  <path
                    d="M 42,90 L 42,160 Q 42,178 60,178 Q 78,178 78,160 L 78,90 Z"
                    fill="#7e22ce"
                    opacity="0.9"
                  />
                )}
                {activeElement === 'Halogens' && (
                  <path
                    d="M 42,90 L 42,160 Q 42,178 60,178 Q 78,178 78,160 L 78,90 Z"
                    fill={selectedHalogen === 'Cl' ? '#f8fafc' : selectedHalogen === 'Br' ? '#fef08a' : '#eab308'}
                    opacity="0.85"
                  />
                )}
                {activeElement === 'P' && (
                  <path
                    d="M 42,90 L 42,160 Q 42,178 60,178 Q 78,178 78,160 L 78,90 Z"
                    fill="#facc15"
                    opacity="0.9"
                  />
                )}
                {/* Precipitate particles */}
                <circle cx="60" cy="165" r="8" fill="rgba(255,255,255,0.4)" />
                <circle cx="52" cy="158" r="5" fill="rgba(255,255,255,0.3)" />
                <circle cx="68" cy="160" r="6" fill="rgba(255,255,255,0.3)" />
              </svg>

              {/* Dynamic Descriptions */}
              <div className="mt-3 text-center text-xs space-y-1">
                {activeElement === 'N' && (
                  <div>
                    <p className="font-bold text-gold-400">Prussian Blue Coloration / PPT</p>
                    <p className="text-slate-400 font-mono">Fe4[Fe(CN)6]3 formed with FeSO4 + FeCl3 + H+</p>
                  </div>
                )}
                {activeElement === 'S' && (
                  <div>
                    <p className="font-bold text-purple-400">Violet/Purple Complex / Black PbS</p>
                    <p className="text-slate-400 font-mono">Sodium Nitroprusside test: [Fe(CN)5NOS]4-</p>
                  </div>
                )}
                {activeElement === 'Halogens' && (
                  <div className="space-y-2">
                    <div className="flex justify-center gap-2">
                      {(['Cl', 'Br', 'I'] as const).map((h) => (
                        <button
                          key={h}
                          onClick={() => setSelectedHalogen(h)}
                          className={`px-2 py-1 rounded text-[10px] ${
                            selectedHalogen === h ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                    <p className="font-bold text-yellow-300">
                      {selectedHalogen === 'Cl'
                        ? 'White Precipitate (AgCl) soluble in NH4OH'
                        : selectedHalogen === 'Br'
                        ? 'Pale Yellow Precipitate (AgBr) sparingly soluble in NH4OH'
                        : 'Yellow Precipitate (AgI) insoluble in NH4OH'}
                    </p>
                  </div>
                )}
                {activeElement === 'P' && (
                  <div>
                    <p className="font-bold text-yellow-400">Canary Yellow Precipitate</p>
                    <p className="text-slate-400 font-mono">Ammonium Phosphomolybdate with (NH4)2MoO4 + HNO3</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section B: Purification & Chromatography Canvas */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gold-300 flex items-center gap-2">
                <span>⚗️</span> Separation & Purification Visualizer
              </h2>
              <div className="flex gap-1 text-xs">
                <button
                  onClick={() => setPurificationMode('tlc')}
                  className={`px-2.5 py-1 rounded-lg ${
                    purificationMode === 'tlc' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  TLC Plate
                </button>
                <button
                  onClick={() => setPurificationMode('distillation')}
                  className={`px-2.5 py-1 rounded-lg ${
                    purificationMode === 'distillation' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Distillation
                </button>
              </div>
            </div>

            <DistillationCanvas activeTechnique={purificationMode} />
          </div>

          {/* Section C: Live Quantitative Percentage Calculator */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 lg:col-span-2 flex flex-col gap-3">
            <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🧮</span> Real-Time Quantitative Combustion Calculator (C & H Estimation)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex flex-col gap-2">
                <label className="text-slate-300 font-semibold">
                  Mass of Organic Compound (m): <span className="text-gold-300">{massCompound} g</span>
                </label>
                <input
                  type="range"
                  min="0.10"
                  max="1.00"
                  step="0.05"
                  value={massCompound}
                  onChange={(e) => setMassCompound(parseFloat(e.target.value))}
                  className="w-full accent-gold-400"
                />
              </div>

              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex flex-col gap-2">
                <label className="text-slate-300 font-semibold">
                  Mass of CO2 Formed: <span className="text-emerald-300">{massCO2} g</span>
                </label>
                <input
                  type="range"
                  min="0.10"
                  max="2.00"
                  step="0.02"
                  value={massCO2}
                  onChange={(e) => setMassCO2(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex flex-col gap-2">
                <label className="text-slate-300 font-semibold">
                  Mass of H2O Formed: <span className="text-amber-300">{massH2O} g</span>
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="1.00"
                  step="0.01"
                  value={massH2O}
                  onChange={(e) => setMassH2O(parseFloat(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-center">
              <div>
                <span className="text-xs text-slate-400 block">Calculated % Carbon</span>
                <span className="text-2xl font-bold text-emerald-400">{calculatedPercentC}%</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Calculated % Hydrogen</span>
                <span className="text-2xl font-bold text-gold-400">{calculatedPercentH}%</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">% Oxygen (By Difference)</span>
                <span className="text-2xl font-bold text-amber-400">
                  {Math.max(0, Number((100 - (calculatedPercentC + calculatedPercentH)).toFixed(2)))}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THEORY & CBSE LESSON SLIDES */}
      {activeTab === 'lessons' && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-gold-300">
              {lessonSlides[currentSlide].title}
            </h2>
            <span className="text-xs text-slate-400">
              Slide {currentSlide + 1} of {lessonSlides.length}
            </span>
          </div>

          <div className="min-h-[220px]">
            {lessonSlides[currentSlide].content}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-800">
            <button
              disabled={currentSlide === 0}
              onClick={() => {
                triggerAudio('tap');
                setCurrentSlide((prev) => Math.max(0, prev - 1));
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 rounded-lg text-xs font-semibold"
            >
              ← Previous Slide
            </button>
            <button
              disabled={currentSlide === lessonSlides.length - 1}
              onClick={() => {
                triggerAudio('tap');
                setCurrentSlide((prev) => Math.min(lessonSlides.length - 1, prev + 1));
              }}
              className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white disabled:opacity-40 rounded-lg text-xs font-semibold"
            >
              Next Slide →
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: ADAPTIVE CBSE EXERCISES */}
      {activeTab === 'challenges' && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                Challenge {currentChallengeIndex + 1} of {challenges.length}
              </span>
              <h2 className="text-base font-bold text-slate-100">
                {challenges[currentChallengeIndex].title}
              </h2>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
              Node: {challenges[currentChallengeIndex].nodeId}
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed">
            {challenges[currentChallengeIndex].question}
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            {challenges[currentChallengeIndex].options.map((option, idx) => {
              let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';
              if (selectedAnswer === idx) {
                btnStyle = 'bg-gold-600 border-gold-400 text-white shadow-md';
              }
              if (answerSubmitted) {
                if (idx === challenges[currentChallengeIndex].correctIndex) {
                  btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-bold';
                } else if (selectedAnswer === idx) {
                  btnStyle = 'bg-rose-600 border-rose-400 text-white';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {selectedAnswer === idx && <span className="text-xs">✓ Selected</span>}
                </button>
              );
            })}
          </div>

          {answerSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1"
            >
              <span className="font-bold text-gold-300 block">Explanation:</span>
              <p>{challenges[currentChallengeIndex].explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-between items-center pt-2">
            {!answerSubmitted ? (
              <button
                disabled={selectedAnswer === null}
                onClick={handleSubmitAnswer}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg shadow-md transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextChallenge}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg shadow-md transition-all"
              >
                {currentChallengeIndex < challenges.length - 1 ? 'Next Challenge →' : 'Finish Exercises 🎉'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: MASTERY & SRS DASHBOARD */}
      {activeTab === 'summary' && (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gold-300 border-b border-slate-800 pb-2">
            CBSE Learning Node Mastery & SRS Spaced Repetition Tracker
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(NODE_IDS).map(([key, nodeId]) => {
              const bkt = bktStates[nodeId] || createBKTState();
              const level = Math.round(masteryProb(bkt) * 100);
              const srs = srsItems[nodeId] || createReviewItem(nodeId, 'Chemistry');

              return (
                <div key={key} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{key}</span>
                    <span className="text-[10px] text-slate-400">{nodeId}</span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-gold-500 to-emerald-400 h-full transition-all duration-500"
                      style={{ width: `${level}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Mastery: <strong className="text-emerald-400">{level}%</strong></span>
                    <span>Interval: <strong className="text-amber-400">{srs.interval} days</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                triggerAudio('celebration');
                recordGameScore(Object.values(NODE_IDS), score);
                speakText("Score recorded successfully.");
              }}
              className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg shadow-md"
            >
              Sync Final Mastery Score
            </button>
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
    </div>
  );
}