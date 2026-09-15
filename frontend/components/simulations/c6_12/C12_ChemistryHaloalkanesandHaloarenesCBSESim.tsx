'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';

// --- ALL CBSE NODE IDS INCLUDED AS CONSTANTS ---
const NODE_IDS = {
  c12_chem_cbse_302: 'c12_chem_cbse_302', // Alkyl Halides 1°, 2°, 3°
  c12_chem_cbse_303: 'c12_chem_cbse_303', // Allylic & Benzylic Halides
  c12_chem_cbse_304: 'c12_chem_cbse_304', // Vinylic & Aryl Halides
  c12_chem_cbse_306: 'c12_chem_cbse_306', // IUPAC Nomenclature of Haloarenes
  c12_chem_cbse_307: 'c12_chem_cbse_307', // Polarity of C-X Bond
  c12_chem_cbse_308: 'c12_chem_cbse_308', // C-X Bond Parameters: Length, Enthalpy, Dipole
  c12_chem_cbse_310: 'c12_chem_cbse_310', // Free Radical Halogenation
  c12_chem_cbse_311: 'c12_chem_cbse_311', // Markovnikov Addition to Alkenes
  c12_chem_cbse_312: 'c12_chem_cbse_312', // Halogen Exchange: Finkelstein & Swarts
  c12_chem_cbse_313: 'c12_chem_cbse_313', // Electrophilic Substitution for Haloarenes
  c12_chem_cbse_314: 'c12_chem_cbse_314', // Sandmeyer Reaction
  c12_chem_cbse_315: 'c12_chem_cbse_315', // Boiling Points & Isomerism
  c12_chem_cbse_316: 'c12_chem_cbse_316', // Density Trends
  c12_chem_cbse_317: 'c12_chem_cbse_317', // Solubility Trends
  c12_chem_cbse_321: 'c12_chem_cbse_321', // Reactivity Trends in SN1 & SN2
  c12_chem_cbse_322: 'c12_chem_cbse_322', // Ambident Nucleophiles (CN-, NO2-)
  c12_chem_cbse_323: 'c12_chem_cbse_323', // Optical Activity & Polarimeter
  c12_chem_cbse_324: 'c12_chem_cbse_324', // Chirality & Enantiomers
  c12_chem_cbse_325: 'c12_chem_cbse_325', // Inversion, Retention, Racemisation
  c12_chem_cbse_327: 'c12_chem_cbse_327', // Grignard Reagents (RMgX)
  c12_chem_cbse_328: 'c12_chem_cbse_328', // Wurtz Reaction
  c12_chem_cbse_330: 'c12_chem_cbse_330', // Nucleophilic Substitution of Activated Haloarenes
  c12_chem_cbse_331: 'c12_chem_cbse_331', // Electrophilic Substitution of Haloarenes
  c12_chem_cbse_332: 'c12_chem_cbse_332', // Wurtz-Fittig & Fittig Reactions
  c12_chem_cbse_333: 'c12_chem_cbse_333', // Polyhalogen Compounds Overview
  c12_chem_cbse_334: 'c12_chem_cbse_334', // Dichloromethane & Chloroform
  c12_chem_cbse_335: 'c12_chem_cbse_335', // Iodoform Test
  c12_chem_cbse_267: 'c12_chem_cbse_267', // CCl4 and Freons
  c12_chem_cbse_268: 'c12_chem_cbse_268', // DDT Properties & Hazards
  c12_chem_cbse_269: 'c12_chem_cbse_269', // Environmental Effects of Polyhalogens
};

// Types & Interfaces
type TabType = 'classification' | 'bond_props' | 'reactions' | 'stereochem' | 'polyhalogen' | 'challenges';

interface Challenge {
  id: number;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: NODE_IDS.c12_chem_cbse_302,
    title: 'Classification of Alkyl Halides',
    question: 'Identify the classification of 2-chloro-2-methylpropane (tert-butyl chloride).',
    options: ['Primary (1°) alkyl halide', 'Secondary (2°) alkyl halide', 'Tertiary (3°) alkyl halide', 'Allylic halide'],
    correctIndex: 2,
    explanation: 'The carbon bearing the chlorine atom is attached to three other carbon atoms (methyl groups), making it a 3° (tertiary) alkyl halide.',
    hint: 'Count how many carbon atoms are directly attached to the C atom bonded to Cl.'
  },
  {
    id: 2,
    nodeId: NODE_IDS.c12_chem_cbse_308,
    title: 'C-X Bond Parameters Anomaly',
    question: 'Why does Chloromethane (CH3Cl) have a higher dipole moment (1.860 D) than Fluoromethane (CH3F, 1.847 D)?',
    options: [
      'Fluorine is less electronegative than Chlorine',
      'The C-Cl bond length is significantly longer than C-F, overriding electronegativity difference (p = q × d)',
      'Fluoromethane is non-polar due to tetrahedral symmetry',
      'Chlorine forms stronger hydrogen bonds than fluorine'
    ],
    correctIndex: 1,
    explanation: 'Dipole moment equals charge times distance (p = q × d). Although C-F has higher charge separation (q), the much greater bond length (d) of C-Cl makes its product q × d larger.',
    hint: 'Remember that dipole moment depends on both charge separation (q) and bond distance (d).'
  },
  {
    id: 3,
    nodeId: NODE_IDS.c12_chem_cbse_312,
    title: 'Halogen Exchange Reactions',
    question: 'In the Finkelstein reaction (R-Cl + NaI → R-I + NaCl), what drives the reaction forward according to Le Chatelier’s principle?',
    options: [
      'High temperature of boiling water',
      'Precipitation of NaCl/NaBr in dry acetone as it is insoluble',
      'Evaporation of dry acetone solvent',
      'Addition of metallic sodium catalyst'
    ],
    correctIndex: 1,
    explanation: 'NaCl and NaBr are insoluble in dry acetone and precipitate out. Removing products from the solution shifts equilibrium forward according to Le Chatelier’s principle.',
    hint: 'Think about solubility of inorganic salts (NaCl vs NaI) in organic solvents like dry acetone.'
  },
  {
    id: 4,
    nodeId: NODE_IDS.c12_chem_cbse_321,
    title: 'SN1 vs SN2 Reactivity',
    question: 'Which of the following substrates undergoes SN2 substitution fastest?',
    options: ['(CH3)3C-Br (3°)', 'CH3-CH2-CH(Br)-CH3 (2°)', 'CH3-CH2-CH2-Br (1°)', 'CH3-Br (Methyl halide)'],
    correctIndex: 3,
    explanation: 'SN2 proceeds via single-step backside attack. Minimal steric hindrance around methyl carbon (CH3-Br) yields the highest rate of SN2 substitution.',
    hint: 'Steric hindrance strongly slows down SN2. Which molecule has the least bulky groups around carbon?'
  },
  {
    id: 5,
    nodeId: NODE_IDS.c12_chem_cbse_322,
    title: 'Ambident Nucleophiles Selectivity',
    question: 'Why does haloalkane react with KCN to form alkyl cyanide (R-CN), but with AgCN it forms alkyl isocyanide (R-NC)?',
    options: [
      'KCN is ionic producing free CN- (C-attack), while AgCN is covalent forcing attack through N lone pair',
      'AgCN is a stronger acid than KCN',
      'KCN reacts via SN1 while AgCN reacts via E2 elimination',
      'AgCN oxidises carbon into an isocyanide'
    ],
    correctIndex: 0,
    explanation: 'KCN is ionic, yielding free cyanide ions where nucleophilic attack occurs predominantly via carbon (stronger C-C bond). AgCN is predominantly covalent; silver shields carbon, so nitrogen lone pair attacks.',
    hint: 'Consider ionic vs covalent nature of potassium and silver salts.'
  },
  {
    id: 6,
    nodeId: NODE_IDS.c12_chem_cbse_325,
    title: 'Stereochemistry of Nucleophilic Substitution',
    question: 'Complete SN1 hydrolysis of optically active (R)-2-bromooctane yields a product mixture that is:',
    options: ['100% Inverted (S)-2-octanol', '100% Retained (R)-2-octanol', 'Racemic mixture (50% R + 50% S) showing zero net rotation', 'Optically active insoluble polymer'],
    correctIndex: 2,
    explanation: 'SN1 proceeds through a planar carbocation intermediate. Nucleophile attack can occur with equal probability from top face or bottom face, resulting in racemisation.',
    hint: 'The intermediate carbocation is sp2 hybridised and planar.'
  },
  {
    id: 7,
    nodeId: NODE_IDS.c12_chem_cbse_330,
    title: 'Activation of Haloarenes',
    question: 'Why does chlorobenzene react with NaOH at 623K/300atm, but 2,4,6-trinitrochlorobenzene reacts with warm water alone?',
    options: [
      'Nitro groups at ortho/para positions strongly withdraw electron density by resonance, stabilising intermediate carbanion (Meisenheimer complex)',
      'Nitro groups increase steric hindrance forcing Cl to drop off',
      'Nitro groups act as catalysts for SN2 backside attack',
      'Trinitrochlorobenzene undergoes free radical halogenation'
    ],
    correctIndex: 0,
    explanation: '-NO2 groups at ortho and para positions stabilise the negative charge of the intermediate carbanion through resonance (-I and -R effects), making nucleophilic attack dramatically easier.',
    hint: 'Consider resonance electron-withdrawing (-R) effect of -NO2 at ortho and para positions.'
  },
  {
    id: 8,
    nodeId: NODE_IDS.c12_chem_cbse_335,
    title: 'Iodoform Diagnostic Test',
    question: 'Which of the following compounds gives a positive Iodoform test (yellow precipitate of CHI3)?',
    options: ['Methanol (CH3OH)', 'Propan-1-ol (CH3CH2CH2OH)', 'Ethanol (CH3CH2OH)', 'Benzophenone (C6H5COC6H5)'],
    correctIndex: 2,
    explanation: 'Iodoform test requires a CH3-C=O group or a CH3-CH(OH)- group. Ethanol (CH3CH2OH) contains CH3-CH(OH)- and oxidises to acetaldehyde (CH3CHO), forming yellow CHI3 precipitate.',
    hint: 'Look for a compound with CH3-CH(OH)- or CH3-C=O structural group.'
  }
];

export function C12_ChemistryHaloalkanesandHaloarenesCBSESim() {
  const [activeTab, setActiveTab] = useState<TabType>('classification');
  
  // Adaptive Learning States
  const [bkt, setBkt] = useState<Record<string, ReturnType<typeof createBKTState>>>({});
  const [srs, setSrs] = useState<Record<string, ReturnType<typeof createReviewItem>>>({});
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Interactive Model Simulation States
  const [selectedMolecule, setSelectedMolecule] = useState<'alkyl1' | 'alkyl3' | 'allylic' | 'benzylic' | 'vinylic' | 'aryl'>('alkyl1');
  const [selectedHalogen, setSelectedHalogen] = useState<'F' | 'Cl' | 'Br' | 'I'>('Cl');
  const [snMechanism, setSnMechanism] = useState<'SN1' | 'SN2'>('SN2');
  const [snProgress, setSnProgress] = useState(0); // 0 to 100%
  const [isSnAnimating, setIsSnAnimating] = useState(false);
  const [polarimeterAngle, setPolarimeterAngle] = useState(0);
  const [enantiomerType, setEnantiomerType] = useState<'dextro' | 'laevo' | 'racemic'>('dextro');
  const [odoformTested, setOdoformTested] = useState(false);
  const [odoformPositive, setOdoformPositive] = useState(true);

  // Canvas Ref for Mechanism / Reaction animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialise BKT & SRS states
  useEffect(() => {
    const initialBkt: Record<string, ReturnType<typeof createBKTState>> = {};
    const initialSrs: Record<string, ReturnType<typeof createReviewItem>> = {};
    Object.keys(NODE_IDS).forEach((key) => {
      initialBkt[key] = createBKTState();
      initialSrs[key] = createReviewItem(key, 'Chemistry');
    });
    setBkt(initialBkt);
    setSrs(initialSrs);

    // Initial narration
    speechManager.speak('Welcome to CBSE Class 12 Haloalkanes and Haloarenes Interactive Laboratory!');
  }, []);

  // SN1/SN2 Canvas Reaction Animation Loop
  useEffect(() => {
    if (activeTab !== 'reactions') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const t = snProgress / 100;

      if (snMechanism === 'SN2') {
        // Concerted Backside Attack Mechanism
        // Nucleophile Nu- coming from left
        const nuX = 80 + t * (centerX - 120);
        const nuY = centerY;

        // Leaving Group X- leaving to right
        const haloX = centerX + 40 + t * 140;
        const haloY = centerY;

        // Central Carbon
        ctx.beginPath();
        ctx.arc(centerX, centerY, 22, 0, 2 * Math.PI);
        ctx.fillStyle = '#38bdf8'; // Carbon cyan
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('C', centerX, centerY);

        // Nucleophile OH-
        ctx.beginPath();
        ctx.arc(nuX, nuY, 18, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981'; // Nu Green
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('OH⁻', nuX, nuY);

        // Halogen X
        ctx.beginPath();
        ctx.arc(haloX, haloY, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#ef4444'; // Halogen Red
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(selectedHalogen, haloX, haloY);

        // Transition State Partial Bonds (Dashed lines)
        if (t > 0.3 && t < 0.7) {
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 3;

          // C-Nu partial bond
          ctx.beginPath();
          ctx.moveTo(nuX + 18, centerY);
          ctx.lineTo(centerX - 22, centerY);
          ctx.stroke();

          // C-X partial bond
          ctx.beginPath();
          ctx.moveTo(centerX + 22, centerY);
          ctx.lineTo(haloX - 20, centerY);
          ctx.stroke();
          ctx.setLineDash([]);

          // TS brackets
          ctx.strokeStyle = '#f59e0b';
          ctx.font = 'bold 20px Inter';
          ctx.strokeText('[ TS: Walden Inversion ]', centerX, centerY - 70);
        }
      } else {
        // SN1 Two-Step Mechanism
        // Step 1: Carbocation Formation (t < 0.5)
        // Step 2: Nucleophilic Attack (t >= 0.5)
        const carbocationX = centerX;
        const carbocationY = centerY;

        if (t < 0.5) {
          const step1T = t * 2;
          const haloX = centerX + 40 + step1T * 120;
          
          // Carbon
          ctx.beginPath();
          ctx.arc(carbocationX, carbocationY, 24, 0, 2 * Math.PI);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 14px Inter';
          ctx.fillText('C⁺', carbocationX, carbocationY);

          // Leaving Halogen
          ctx.beginPath();
          ctx.arc(haloX, carbocationY, 20, 0, 2 * Math.PI);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${selectedHalogen}⁻`, haloX, carbocationY);

          ctx.fillStyle = '#fbbf24';
          ctx.font = '14px Inter';
          ctx.fillText('Step 1: Slow ionization → Planar Carbocation', centerX, 40);
        } else {
          const step2T = (t - 0.5) * 2;
          const nuX = 80 + step2T * (centerX - 120);

          // Planar Carbocation
          ctx.beginPath();
          ctx.arc(carbocationX, carbocationY, 24, 0, 2 * Math.PI);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 14px Inter';
          ctx.fillText('C', carbocationX, carbocationY);

          // Incoming OH-
          ctx.beginPath();
          ctx.arc(nuX, carbocationY, 18, 0, 2 * Math.PI);
          ctx.fillStyle = '#10b981';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText('OH⁻', nuX, carbocationY);

          ctx.fillStyle = '#10b981';
          ctx.font = '14px Inter';
          ctx.fillText('Step 2: Fast attack from top/bottom → Racemisation', centerX, 40);
        }
      }

      if (isSnAnimating) {
        setSnProgress((prev) => {
          if (prev >= 100) {
            setIsSnAnimating(false);
            return 100;
          }
          return prev + 1;
        });
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, snMechanism, snProgress, isSnAnimating, selectedHalogen]);

  const handleStartSnAnim = () => {
    audioManager.play('whoosh');
    setSnProgress(0);
    setIsSnAnimating(true);
  };

  const handleChallengeSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    const curr = CHALLENGES[currentChallengeIndex];
    const isCorrect = selectedOption === curr.correctIndex;

    // SRS & BKT updates
    const updatedBkt = bktUpdate(bkt[curr.nodeId] || createBKTState(), isCorrect);
    const updatedSrs = sm2Update(srs[curr.nodeId] || createReviewItem(curr.nodeId, 'Chemistry'), isCorrect ? 5 : 1, 0);
    
    setBkt({ ...bkt, [curr.nodeId]: updatedBkt });
    setSrs({ ...srs, [curr.nodeId]: updatedSrs });

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setScore((prev) => prev + 10);
      setShowSparkle(true);
      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        recordGameScore(Object.values(NODE_IDS), score + 10);
        speechManager.speak('Congratulations! You have mastered Haloalkanes and Haloarenes!');
      } else {
        speechManager.speak('Correct answer! Excellent understanding.');
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That is incorrect. Review the solution explanation carefully.');
    }
  };

  const nextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHint(false);
      audioManager.play('tap');
    }
  };

  // Helper values for C-X parameters table
  const getCXParams = (halogen: 'F' | 'Cl' | 'Br' | 'I') => {
    switch (halogen) {
      case 'F':
        return { length: '139 pm', enthalpy: '452 kJ/mol', dipole: '1.847 D', polarity: 'Very High' };
      case 'Cl':
        return { length: '178 pm', enthalpy: '351 kJ/mol', dipole: '1.860 D (Peak)', polarity: 'High' };
      case 'Br':
        return { length: '193 pm', enthalpy: '293 kJ/mol', dipole: '1.830 D', polarity: 'Moderate' };
      case 'I':
        return { length: '214 pm', enthalpy: '234 kJ/mol', dipole: '1.636 D', polarity: 'Low' };
    }
  };

  const activeCX = getCXParams(selectedHalogen);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-12">
      {/* Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
            C12
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Haloalkanes & Haloarenes
            </h1>
            <p className="text-xs text-slate-400">CBSE Class 12 Chemistry • Chapter 10 Master Engine</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveTab('classification'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'classification' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Classification
          </button>
          <button
            onClick={() => { setActiveTab('bond_props'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'bond_props' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. C-X & Physical Props
          </button>
          <button
            onClick={() => { setActiveTab('reactions'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'reactions' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Reactions & SN1/SN2
          </button>
          <button
            onClick={() => { setActiveTab('stereochem'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'stereochem' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Stereochemistry
          </button>
          <button
            onClick={() => { setActiveTab('polyhalogen'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'polyhalogen' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            5. Polyhalogens
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'challenges' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-400 hover:text-white'
            }`}
          >
            🎯 Practice Lab ({score} pts)
          </button>
        </div>
      </header>

      {/* Main Interactive Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-grow">
        <AnimatePresence mode="wait">
          {/* TAB 1: CLASSIFICATION & NOMENCLATURE */}
          {activeTab === 'classification' && (
            <motion.div
              key="classification"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Interactive Visualizer */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    Molecular Structure & Hybridisation Explorer
                  </h2>
                  <p className="text-xs text-slate-400 mb-6">
                    Select a compound class to inspect its hybridisation, carbon environment, and CBSE classification.
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <button
                      onClick={() => { setSelectedMolecule('alkyl1'); audioManager.play('pop'); }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                        selectedMolecule === 'alkyl1'
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">1° Alkyl Halide</div>
                      <div className="text-[10px] opacity-70">Ethyl chloride (sp³)</div>
                    </button>
                    <button
                      onClick={() => { setSelectedMolecule('alkyl3'); audioManager.play('pop'); }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                        selectedMolecule === 'alkyl3'
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">3° Alkyl Halide</div>
                      <div className="text-[10px] opacity-70">tert-Butyl bromide (sp³)</div>
                    </button>
                    <button
                      onClick={() => { setSelectedMolecule('allylic'); audioManager.play('pop'); }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                        selectedMolecule === 'allylic'
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">Allylic Halide</div>
                      <div className="text-[10px] opacity-70">3-Chloroprop-1-ene</div>
                    </button>
                    <button
                      onClick={() => { setSelectedMolecule('benzylic'); audioManager.play('pop'); }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                        selectedMolecule === 'benzylic'
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">Benzylic Halide</div>
                      <div className="text-[10px] opacity-70">Benzyl chloride (sp³)</div>
                    </button>
                    <button
                      onClick={() => { setSelectedMolecule('vinylic'); audioManager.play('pop'); }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                        selectedMolecule === 'vinylic'
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">Vinylic Halide</div>
                      <div className="text-[10px] opacity-70">Chloroethene (sp²)</div>
                    </button>
                    <button
                      onClick={() => { setSelectedMolecule('aryl'); audioManager.play('pop'); }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                        selectedMolecule === 'aryl'
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">Aryl Halide</div>
                      <div className="text-[10px] opacity-70">Chlorobenzene (sp²)</div>
                    </button>
                  </div>

                  {/* Dynamic SVG Molecular Structure Display */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[260px]">
                    {selectedMolecule === 'alkyl1' && (
                      <svg viewBox="0 0 300 150" className="w-full max-w-sm">
                        <line x1="60" y1="75" x2="130" y2="75" stroke="#94a3b8" strokeWidth="4" />
                        <line x1="130" y1="75" x2="210" y2="75" stroke="#f43f5e" strokeWidth="4" />
                        {/* H bonds */}
                        <line x1="130" y1="75" x2="130" y2="25" stroke="#64748b" strokeWidth="2" />
                        <line x1="130" y1="75" x2="130" y2="125" stroke="#64748b" strokeWidth="2" />
                        <circle cx="60" cy="75" r="18" fill="#38bdf8" />
                        <text x="60" y="80" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">CH3</text>
                        <circle cx="130" cy="75" r="18" fill="#38bdf8" />
                        <text x="130" y="80" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>
                        <circle cx="210" cy="75" r="20" fill="#ef4444" />
                        <text x="210" y="80" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Cl</text>
                        <circle cx="130" cy="25" r="10" fill="#94a3b8" />
                        <text x="130" y="29" fill="#0f172a" fontSize="10" textAnchor="middle">H</text>
                        <circle cx="130" cy="125" r="10" fill="#94a3b8" />
                        <text x="130" y="129" fill="#0f172a" fontSize="10" textAnchor="middle">H</text>
                      </svg>
                    )}

                    {selectedMolecule === 'alkyl3' && (
                      <svg viewBox="0 0 300 180" className="w-full max-w-sm">
                        <line x1="70" y1="35" x2="150" y2="90" stroke="#94a3b8" strokeWidth="4" />
                        <line x1="70" y1="145" x2="150" y2="90" stroke="#94a3b8" strokeWidth="4" />
                        <line x1="150" y1="90" x2="230" y2="90" stroke="#f43f5e" strokeWidth="4" />
                        <line x1="150" y1="90" x2="150" y2="20" stroke="#94a3b8" strokeWidth="4" />
                        <circle cx="70" cy="35" r="16" fill="#38bdf8" />
                        <text x="70" y="39" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">CH3</text>
                        <circle cx="70" cy="145" r="16" fill="#38bdf8" />
                        <text x="70" y="149" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">CH3</text>
                        <circle cx="150" cy="20" r="16" fill="#38bdf8" />
                        <text x="150" y="24" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">CH3</text>
                        <circle cx="150" cy="90" r="20" fill="#38bdf8" />
                        <text x="150" y="95" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">C</text>
                        <circle cx="230" cy="90" r="22" fill="#ef4444" />
                        <text x="230" y="95" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Br</text>
                      </svg>
                    )}

                    {selectedMolecule === 'allylic' && (
                      <svg viewBox="0 0 320 150" className="w-full max-w-sm">
                        <line x1="40" y1="70" x2="110" y2="70" stroke="#38bdf8" strokeWidth="6" />
                        <line x1="40" y1="80" x2="110" y2="80" stroke="#38bdf8" strokeWidth="6" />
                        <line x1="110" y1="75" x2="190" y2="75" stroke="#94a3b8" strokeWidth="4" />
                        <line x1="190" y1="75" x2="260" y2="75" stroke="#ef4444" strokeWidth="4" />
                        <circle cx="40" cy="75" r="18" fill="#38bdf8" />
                        <text x="40" y="79" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">CH2</text>
                        <circle cx="110" cy="75" r="18" fill="#38bdf8" />
                        <text x="110" y="79" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">CH</text>
                        <circle cx="190" cy="75" r="18" fill="#10b981" />
                        <text x="190" y="79" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">CH2 (sp³)</text>
                        <circle cx="260" cy="75" r="20" fill="#ef4444" />
                        <text x="260" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Cl</text>
                      </svg>
                    )}

                    {selectedMolecule === 'vinylic' && (
                      <svg viewBox="0 0 300 150" className="w-full max-w-sm">
                        <line x1="70" y1="70" x2="160" y2="70" stroke="#38bdf8" strokeWidth="6" />
                        <line x1="70" y1="80" x2="160" y2="80" stroke="#38bdf8" strokeWidth="6" />
                        <line x1="160" y1="75" x2="230" y2="75" stroke="#ef4444" strokeWidth="4" />
                        <circle cx="70" cy="75" r="20" fill="#38bdf8" />
                        <text x="70" y="80" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">CH2</text>
                        <circle cx="160" cy="75" r="20" fill="#f59e0b" />
                        <text x="160" y="80" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">CH (sp²)</text>
                        <circle cx="230" cy="75" r="22" fill="#ef4444" />
                        <text x="230" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Cl</text>
                      </svg>
                    )}

                    {selectedMolecule === 'benzylic' && (
                      <svg viewBox="0 0 320 160" className="w-full max-w-sm">
                        <polygon points="60,40 100,40 120,80 100,120 60,120 40,80" fill="none" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="80" cy="80" r="22" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="120" y1="80" x2="190" y2="80" stroke="#94a3b8" strokeWidth="4" />
                        <line x1="190" y1="80" x2="260" y2="80" stroke="#ef4444" strokeWidth="4" />
                        <circle cx="190" cy="80" r="18" fill="#10b981" />
                        <text x="190" y="84" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">CH2 (sp³)</text>
                        <circle cx="260" cy="80" r="20" fill="#ef4444" />
                        <text x="260" y="85" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Cl</text>
                      </svg>
                    )}

                    {selectedMolecule === 'aryl' && (
                      <svg viewBox="0 0 300 160" className="w-full max-w-sm">
                        <polygon points="80,40 130,40 155,80 130,120 80,120 55,80" fill="none" stroke="#38bdf8" strokeWidth="4" />
                        <circle cx="105" cy="80" r="24" fill="none" stroke="#38bdf8" strokeWidth="3" />
                        <line x1="155" y1="80" x2="230" y2="80" stroke="#ef4444" strokeWidth="4" />
                        <circle cx="155" cy="80" r="6" fill="#f59e0b" />
                        <circle cx="230" cy="80" r="22" fill="#ef4444" />
                        <text x="230" y="85" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Cl</text>
                        <text x="155" y="60" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">sp² C</text>
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Theory & NCERT CBSE Content */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-slate-100 mb-2">Classification Key Concepts</h3>
                  <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">1. sp³ C-X Compounds ({NODE_IDS.c12_chem_cbse_302}):</span>
                      <p className="mt-1 text-slate-400">
                        Halogen bonded to an sp³-hybridised carbon. Classified as 1° (primary), 2° (secondary), or 3° (tertiary) depending on the number of attached alkyl groups.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">2. Allylic & Benzylic ({NODE_IDS.c12_chem_cbse_303}):</span>
                      <p className="mt-1 text-slate-400">
                        Allylic: halogen attached to sp³ carbon next to C=C double bond.<br />
                        Benzylic: halogen attached to sp³ carbon directly linked to aromatic ring. Show strong resonance carbocation stability.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">3. sp² C-X Compounds ({NODE_IDS.c12_chem_cbse_304}):</span>
                      <p className="mt-1 text-slate-400">
                        Vinylic (C=C-X) and Aryl halides (Ar-X). Higher s-character (33%) makes sp² C more electronegative, forming shorter, stronger C-X bonds that are unreactive to nucleophilic attack.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">4. IUPAC Locants ({NODE_IDS.c12_chem_cbse_306}):</span>
                      <p className="mt-1 text-slate-400">
                        1,2-dihalobenzene = <em>o-</em> (ortho); 1,3-dihalobenzene = <em>m-</em> (meta); 1,4-dihalobenzene = <em>p-</em> (para).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: C-X BOND & PHYSICAL PROPERTIES */}
          {activeTab === 'bond_props' && (
            <motion.div
              key="bond_props"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Halogen Interactive Parameter Selector */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-2">
                    C-X Bond Parameters & Trends Explorer
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Select halogen (F, Cl, Br, I) to inspect bond length, bond enthalpy, dipole moment anomaly, and density.
                  </p>

                  {/* Halogen Selection Buttons */}
                  <div className="flex gap-3 mb-6">
                    {(['F', 'Cl', 'Br', 'I'] as const).map((hal) => (
                      <button
                        key={hal}
                        onClick={() => { setSelectedHalogen(hal); audioManager.play('tap'); }}
                        className={`flex-1 py-3 rounded-xl border font-bold text-sm transition ${
                          selectedHalogen === hal
                            ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        C-{hal}
                      </button>
                    ))}
                  </div>

                  {/* Real-time Data Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="text-xs text-slate-400">Bond Length ({NODE_IDS.c12_chem_cbse_308})</div>
                      <div className="text-xl font-bold text-cyan-400 mt-1">{activeCX.length}</div>
                      <div className="text-[10px] text-slate-500 mt-1">Increases down group (size increases)</div>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="text-xs text-slate-400">Bond Enthalpy ({NODE_IDS.c12_chem_cbse_308})</div>
                      <div className="text-xl font-bold text-emerald-400 mt-1">{activeCX.enthalpy}</div>
                      <div className="text-[10px] text-slate-500 mt-1">Decreases down group (weaker bond)</div>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="text-xs text-slate-400">Dipole Moment ({NODE_IDS.c12_chem_cbse_308})</div>
                      <div className="text-xl font-bold text-amber-400 mt-1">{activeCX.dipole}</div>
                      <div className="text-[10px] text-slate-500 mt-1">Peak at C-Cl due to q × d balancing</div>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="text-xs text-slate-400">Polarity ({NODE_IDS.c12_chem_cbse_307})</div>
                      <div className="text-xl font-bold text-rose-400 mt-1">{activeCX.polarity}</div>
                      <div className="text-[10px] text-slate-500 mt-1">δ+ Carbon susceptible to Nu attack</div>
                    </div>
                  </div>

                  {/* Bond Visualiser Representation */}
                  <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full fill-cyan-400 bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-300">
                        δ+ C
                      </div>
                    </div>

                    {/* Animated Polar Bond Connector */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-rose-500 h-full transition-all duration-500"
                          style={{
                            width:
                              selectedHalogen === 'F'
                                ? '40%'
                                : selectedHalogen === 'Cl'
                                ? '60%'
                                : selectedHalogen === 'Br'
                                ? '75%'
                                : '90%',
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 font-mono">
                        Distance: {activeCX.length}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center font-bold text-rose-300">
                        δ- {selectedHalogen}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Properties Theory */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-slate-100 mb-2">Physical Properties Insights</h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">1. Boiling Points ({NODE_IDS.c12_chem_cbse_315}):</span>
                      <p className="mt-1 text-slate-400">
                        Order: RI &gt; RBr &gt; RCl &gt; RF due to increasing molecular mass & van der Waals forces. Branching decreases surface area and lowers boiling point. Para-isomers have highest MP due to crystal symmetry.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">2. Density ({NODE_IDS.c12_chem_cbse_316}):</span>
                      <p className="mt-1 text-slate-400">
                        Bromo, iodo and polychloro derivatives are denser than water. Density increases with number of carbon atoms, halogen atoms, and atomic mass of halogen.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">3. Water Solubility ({NODE_IDS.c12_chem_cbse_317}):</span>
                      <p className="mt-1 text-slate-400">
                        Very slightly soluble in water because new haloalkane-water interactions are weaker than hydrogen bonds between water molecules. Highly soluble in organic solvents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: REACTIONS & MECHANISMS (SN1 / SN2 / SYNTHESIS) */}
          {activeTab === 'reactions' && (
            <motion.div
              key="reactions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Interactive Reaction Canvas Visualiser */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-cyan-400">
                      SN1 vs SN2 Reaction Simulator
                    </h2>
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => { setSnMechanism('SN2'); setSnProgress(0); audioManager.play('tap'); }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          snMechanism === 'SN2' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        SN2 (Concerted)
                      </button>
                      <button
                        onClick={() => { setSnMechanism('SN1'); setSnProgress(0); audioManager.play('tap'); }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          snMechanism === 'SN1' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        SN1 (Stepwise)
                      </button>
                    </div>
                  </div>

                  {/* Canvas Render Element */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={260}
                      className="w-full h-auto block"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={handleStartSnAnim}
                      disabled={isSnAnimating}
                      className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-lg hover:brightness-110 disabled:opacity-50"
                    >
                      {isSnAnimating ? 'Simulating Reaction...' : '▶ Trigger Reaction Simulation'}
                    </button>

                    <div className="text-right text-xs text-slate-400">
                      Mechanism Order: <span className="font-bold text-cyan-300">{snMechanism === 'SN2' ? '1° > 2° > 3°' : '3° > 2° > 1°'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CBSE Reaction Methods Summary */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-slate-100 mb-2">Key Chemical Reactions</h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">Halogen Exchange ({NODE_IDS.c12_chem_cbse_312}):</span>
                      <p className="mt-1 text-slate-400">
                        • Finkelstein: R-Cl + NaI → R-I + NaCl↓ (in dry acetone)<br />
                        • Swarts: R-Cl + AgF → R-F + AgCl (Metals: AgF, Hg2F2, CoF2)
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">Sandmeyer Reaction ({NODE_IDS.c12_chem_cbse_314}):</span>
                      <p className="mt-1 text-slate-400">
                        Ar-NH2 + NaNO2 + 2HX (273-278K) → Ar-N2+ X- (Diazonium salt)<br />
                        Ar-N2+ X- + Cu2Cl2 → Ar-Cl + N2
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">Ambident Nucleophiles ({NODE_IDS.c12_chem_cbse_322}):</span>
                      <p className="mt-1 text-slate-400">
                        • KCN (ionic) → R-CN (Alkyl Cyanide)<br />
                        • AgCN (covalent) → R-NC (Isocyanide)
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">Grignard & Wurtz ({NODE_IDS.c12_chem_cbse_327}, {NODE_IDS.c12_chem_cbse_328}):</span>
                      <p className="mt-1 text-slate-400">
                        • Grignard: R-X + Mg (dry ether) → R-MgX (Protic solvents protonate RMgX to R-H)<br />
                        • Wurtz: 2 R-X + 2 Na (dry ether) → R-R + 2 NaX
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: STEREOCHEMISTRY & OPTICAL ACTIVITY */}
          {activeTab === 'stereochem' && (
            <motion.div
              key="stereochem"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Polarimeter Simulation */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-2">
                    Polarimeter & Chirality Simulator
                  </h2>
                  <p className="text-xs text-slate-400 mb-6">
                    Observe optical rotation of plane-polarised light passed through enantiomer solutions.
                  </p>

                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => { setEnantiomerType('dextro'); setPolarimeterAngle(45); audioManager.play('pop'); }}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition ${
                        enantiomerType === 'dextro' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      (+) Dextrorotatory (d)
                    </button>
                    <button
                      onClick={() => { setEnantiomerType('laevo'); setPolarimeterAngle(-45); audioManager.play('pop'); }}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition ${
                        enantiomerType === 'laevo' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      (-) Laevorotatory (l)
                    </button>
                    <button
                      onClick={() => { setEnantiomerType('racemic'); setPolarimeterAngle(0); audioManager.play('pop'); }}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition ${
                        enantiomerType === 'racemic' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      (±) Racemic Mixture
                    </button>
                  </div>

                  {/* SVG Polarimeter Light Beam */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex items-center justify-center">
                    <svg viewBox="0 0 500 160" className="w-full">
                      {/* Light source */}
                      <circle cx="40" cy="80" r="15" fill="#f59e0b" />
                      <text x="40" y="84" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">Light</text>

                      {/* Unpolarised light rays */}
                      <line x1="60" y1="80" x2="110" y2="80" stroke="#f59e0b" strokeWidth="3" />
                      <line x1="85" y1="65" x2="85" y2="95" stroke="#f59e0b" strokeWidth="2" />

                      {/* Nicol Prism */}
                      <polygon points="110,40 130,40 150,120 130,120" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
                      <text x="130" y="138" fill="#94a3b8" fontSize="9" textAnchor="middle">Nicol Prism</text>

                      {/* Plane Polarised Light Vertical */}
                      <line x1="150" y1="80" x2="230" y2="80" stroke="#38bdf8" strokeWidth="3" />
                      <line x1="190" y1="60" x2="190" y2="100" stroke="#38bdf8" strokeWidth="3" />

                      {/* Sample Tube */}
                      <rect x="230" y="55" width="120" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                      <text x="290" y="84" fill="#10b981" fontSize="10" textAnchor="middle">Chiral Sample</text>

                      {/* Rotated Light output */}
                      <line x1="350" y1="80" x2="440" y2="80" stroke="#ec4899" strokeWidth="3" />

                      {/* Rotated Arrow according to polarimeterAngle */}
                      <g transform={`translate(400, 80) rotate(${polarimeterAngle})`}>
                        <line x1="0" y1="-25" x2="0" y2="25" stroke="#ec4899" strokeWidth="4" />
                        <polygon points="-4,-20 0,-28 4,-20" fill="#ec4899" />
                      </g>

                      {/* Angle Display */}
                      <text x="400" y="140" fill="#ec4899" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Rotation: {polarimeterAngle}°
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stereochemistry Concepts */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-slate-100 mb-2">Stereochemical Definitions</h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">Chirality & Enantiomers ({NODE_IDS.c12_chem_cbse_324}):</span>
                      <p className="mt-1 text-slate-400">
                        Molecules non-superimposable on their mirror images possess asymmetric carbons (stereocentres). Enantiomers rotate plane polarised light by equal magnitude in opposite directions.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">Inversion (SN2) ({NODE_IDS.c12_chem_cbse_325}):</span>
                      <p className="mt-1 text-slate-400">
                        Walden Inversion: Incoming nucleophile attacks from opposite side of leaving group, turning umbrella inside out.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">Racemisation (SN1) ({NODE_IDS.c12_chem_cbse_325}):</span>
                      <p className="mt-1 text-slate-400">
                        Formation of 50:50 mixture of (+) and (-) enantiomers via planar carbocation, resulting in zero net optical activity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: POLYHALOGEN COMPOUNDS & ENVIRONMENT */}
          {activeTab === 'polyhalogen' && (
            <motion.div
              key="polyhalogen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Interactive Iodoform Test Simulation */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 mb-2">
                    Iodoform Lab Test Simulator (CHI₃)
                  </h2>
                  <p className="text-xs text-slate-400 mb-6">
                    Test organic compounds with NaOH + I₂ to detect presence of CH₃-C=O or CH₃-CH(OH)- groups.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => {
                        setOdoformTested(true);
                        setOdoformPositive(true);
                        audioManager.play('chime');
                        speechManager.speak('Positive iodoform test! Yellow CHI3 precipitate forms.');
                      }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-left hover:border-cyan-500 transition"
                    >
                      <div className="font-bold text-xs text-cyan-300">Ethanol / Acetone</div>
                      <div className="text-[10px] text-slate-400">Contains CH₃-CH(OH)- / CH₃-CO-</div>
                    </button>
                    <button
                      onClick={() => {
                        setOdoformTested(true);
                        setOdoformPositive(false);
                        audioManager.play('error');
                        speechManager.speak('Negative test. No yellow precipitate.');
                      }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-left hover:border-cyan-500 transition"
                    >
                      <div className="font-bold text-xs text-cyan-300">Propan-1-ol / Benzene</div>
                      <div className="text-[10px] text-slate-400">Lacks CH₃-CO- methyl ketone group</div>
                    </button>
                  </div>

                  {/* Test Tube Graphic */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px]">
                    <div className="w-16 h-40 border-2 border-slate-600 rounded-b-full bg-slate-900/50 relative overflow-hidden flex flex-col justify-end p-1">
                      {odoformTested && (
                        <div
                          className={`w-full transition-all duration-700 rounded-b-full ${
                            odoformPositive ? 'h-24 bg-amber-400' : 'h-20 bg-amber-900/40'
                          }`}
                        >
                          {odoformPositive && (
                            <div className="text-[9px] font-bold text-slate-950 text-center mt-4">
                              CHI₃ Yellow Precipitate
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-3 text-xs font-semibold text-slate-300">
                      {odoformTested
                        ? odoformPositive
                          ? '✅ Positive Test: Characteristic Yellow CHI3 Precipitate'
                          : '❌ Negative Test: Solution remains clear'
                        : 'Select a substrate above to run the reagent test'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Polyhalogen Environmental Overview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-slate-100 mb-2">Polyhalogen Compounds Summary</h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">DCM & Chloroform ({NODE_IDS.c12_chem_cbse_334}):</span>
                      <p className="mt-1 text-slate-400">
                        • Dichloromethane (CH2Cl2): solvent, CNS harm.<br />
                        • Chloroform (CHCl3): oxidises in light/air to poisonous Phosgene gas (COCl2). Stored in dark sealed bottles.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">Freons & CCl4 ({NODE_IDS.c12_chem_cbse_267}):</span>
                      <p className="mt-1 text-slate-400">
                        Freon-12 (CCl2F2) prepared via Swarts reaction. Extremely stable, releases Cl radicals in stratosphere destroying ozone layer.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-cyan-400 font-bold">DDT & Environment ({NODE_IDS.c12_chem_cbse_268}, {NODE_IDS.c12_chem_cbse_269}):</span>
                      <p className="mt-1 text-slate-400">
                        p,p&apos;-dichlorodiphenyltrichloroethane. Non-biodegradable fat-soluble insecticide causing severe bioaccumulation across food chains.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: ADAPTIVE PRACTICE CHALLENGES */}
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                {/* Score & Progress Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      Question {currentChallengeIndex + 1} of {CHALLENGES.length}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {CHALLENGES[currentChallengeIndex].title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">Mastery Score:</span>
                    <span className="font-bold text-emerald-400">{score} pts</span>
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-sm text-slate-200 mb-6 leading-relaxed">
                  {CHALLENGES[currentChallengeIndex].question}
                </p>

                {/* Options List */}
                <div className="space-y-3 mb-6">
                  {CHALLENGES[currentChallengeIndex].options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500';
                    if (selectedOption === idx) {
                      btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200';
                    }
                    if (isSubmitted) {
                      if (idx === CHALLENGES[currentChallengeIndex].correctIndex) {
                        btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      } else if (selectedOption === idx) {
                        btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => { setSelectedOption(idx); audioManager.play('tap'); }}
                        className={`w-full p-4 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Actions & Hints */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => { setShowHint(!showHint); audioManager.play('hint'); }}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    {showHint ? 'Hide Hint' : '💡 Need a Hint?'}
                  </button>

                  {!isSubmitted ? (
                    <button
                      onClick={handleChallengeSubmit}
                      disabled={selectedOption === null}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg disabled:opacity-50"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={nextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-lg"
                    >
                      {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Module'}
                    </button>
                  )}
                </div>

                {/* Hint Component */}
      <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex].hint} />

                {/* Solution Explanation Box */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs"
                  >
                    <span className="font-bold text-cyan-400">CBSE Solution Explanation:</span>
                    <p className="mt-1 text-slate-300 leading-relaxed">
                      {CHALLENGES[currentChallengeIndex].explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* Floating Sparkles, Success Banner, Confetti */}
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Unlocked! CBSE Chemistry Complete!" />
      <Confetti show={showConfetti} />
    </div>
  );
}

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 12 Haloalkanes & Haloarenes Lab',
  subtitle: 'Master SN1/SN2 Mechanisms, Elimination, and Aryl Halide Reactions',
  description: 'Step into a virtual organic lab where you compare SN1 and SN2 mechanisms, study stereochemistry, and explore Friedel-Crafts reactions of aryl halides.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The SN1 vs SN2 Puzzle',
  question: 'When (CH3)3C-Br (tert-butyl bromide) reacts with OH-, the reaction follows SN1 mechanism, but CH3-Br (methyl bromide) follows SN2. Why?',
  options: [
    'Tertiary alkyl halides are more reactive in SN2',
    'Tertiary carbocation (3°) is stabilized by hyperconjugation and +I effect of 3 methyl groups, making SN1 favorable. Methyl has no carbocation stability, so SN2 (backside attack) is preferred. Steric hindrance also blocks SN2 in 3° substrates',
    'Methyl bromide cannot undergo any reaction',
    'Both follow the same mechanism'
],
  correctIndex: 1,
  explanation: 'SN1 requires a stable carbocation intermediate. 3° carbocations are stabilized by hyperconjugation and +I effect of three alkyl groups. Methyl carbocation (CH3+) is extremely unstable, so CH3-Br cannot do SN1. Instead, SN2 backside attack is favored for methyl (no steric hindrance). 3° substrates have too much steric hindrance for SN2 backside attack.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "sn1_sn2",
    "name": "SN1/SN2 Mechanism Lab",
    "description": "Compare substitution mechanisms and study rate laws."
  },
  {
    "id": "elimination",
    "name": "Elimination Reactions Lab",
    "description": "Study E1/E2 mechanisms and Saytzeff rule."
  },
  {
    "id": "stereochemistry",
    "name": "Stereochemistry Lab",
    "description": "Explore inversion vs retention of configuration."
  },
  {
    "id": "aryl",
    "name": "Aryl Halide Lab",
    "description": "Study Friedel-Crafts reactions and electrophilic substitution of aryl halides."
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
    "title": "Aqueous vs. Alcoholic KOH Function in Haloalkane Reactions",
    "description": "Students frequently believe that treating a haloalkane with aqueous KOH leads to elimination (alkene formation), whereas alcoholic KOH leads to substitution (alcohol formation).",
    "correction": "Aqueous KOH is highly solvated by water, making the hydroxide ion a weak base but a good nucleophile that causes nucleophilic substitution to yield alcohols. Alcoholic KOH contains alkoxide ions (RO⁻), which act as stronger bases and preferentially abstract a beta-hydrogen to cause dehydrohalogenation (elimination) yielding alkenes."
  },
  {
    "id": "misc_2",
    "title": "Stereochemical Outcome of SN1 Reactions",
    "description": "Students assume that an SN1 reaction of an optically active tertiary haloalkane always produces a perfectly balanced 50:50 racemic mixture.",
    "correction": "Although the SN1 mechanism proceeds through a planar carbocation intermediate allowing attack from both faces, complete 100% racemization rarely occurs. The leaving halide ion briefly shields the front side as an ion pair, causing nucleophilic attack from the rear face to slightly predominate, resulting in partial racemization with net inversion."
  },
  {
    "id": "misc_3",
    "title": "SN1 Reactivity of Primary Allylic and Benzylic Halides",
    "description": "Students assume primary allylic and benzylic halides cannot undergo SN1 reactions simply because they are primary (1°) alkyl halides.",
    "correction": "Primary allylic and benzylic halides readily undergo SN1 reactions despite being primary because their carbocation intermediates are strongly stabilized by resonance with the adjacent pi-system or benzene ring. Consequently, their SN1 reactivity is significantly higher than that of standard primary or even secondary alkyl halides."
  },
  {
    "id": "misc_4",
    "title": "Directive Effect of Halogens in Electrophilic Substitution",
    "description": "Students believe that because halogens are net electron-withdrawing groups (-I effect), haloarenes must direct incoming electrophiles to the meta position.",
    "correction": "Halogens are ortho- and para-directing because resonance (+R effect) delocalizes lone-pair electrons into the aromatic ring, specifically stabilizing the intermediate carbocation at the ortho and para positions. However, because their strong inductive (-I) effect dominates overall electron density, haloarenes remain deactivated compared to benzene."
  },
  {
    "id": "misc_5",
    "title": "Effect of Meta-Nitro Groups on Nucleophilic Aromatic Substitution",
    "description": "Students believe that placing strong electron-withdrawing nitro (-NO2) groups at the meta position accelerates nucleophilic aromatic substitution of aryl halides just as effectively as at ortho and para positions.",
    "correction": "Nitro groups significantly increase haloarene reactivity toward nucleophilic substitution only when located at the ortho and para positions relative to the halogen. Resonance delocalization of the negative charge in the intermediate Meisenheimer complex onto the oxygen atoms of the nitro group occurs exclusively from the ortho and para positions, not from the meta position."
  }
];


export default C12_ChemistryHaloalkanesandHaloarenesCBSESim;