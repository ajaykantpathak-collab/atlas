'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// CONSTANTS & TYPES
// ==========================================

const ALL_NODE_IDS = ['c7_chem_017', 'c7_chem_018', 'c7_chem_019', 'c7_chem_020'] as const;
type NodeId = typeof ALL_NODE_IDS[number];

interface ConceptInfo {
  id: NodeId;
  title: string;
  subtitle: string;
  color: string;
}

const NODE_METADATA: Record<NodeId, ConceptInfo> = {
  c7_chem_017: {
    id: 'c7_chem_017',
    title: 'Water - Universal Solvent',
    subtitle: 'Polarity, Solutions, Colloids & Hydrate Crystals',
    color: '#0284c7'
  },
  c7_chem_018: {
    id: 'c7_chem_018',
    title: 'Hard and Soft Water',
    subtitle: 'Calcium/Magnesium Salts, Softening & Metal Reactivity',
    color: '#0d9488'
  },
  c7_chem_019: {
    id: 'c7_chem_019',
    title: 'Carbon Allotropes',
    subtitle: 'Diamond, Graphite & Amorphous Forms',
    color: '#4f46e5'
  },
  c7_chem_020: {
    id: 'c7_chem_020',
    title: 'Carbon Compounds & Oxides',
    subtitle: 'CO2 Lab Prep, Lime Water Test & CO Toxicity/Reducing Power',
    color: '#ea580c'
  }
};

interface Challenge {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  misconception: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
  hint: string;
}

interface Slide {
  id: number;
  nodeId: NodeId;
  title: string;
  content: string;
  keyPoints: string[];
  visualType: 'polarity' | 'tyndall' | 'hardness' | 'allotropes' | 'limewater';
  interactivePrompt: string;
}

// ==========================================
// TEACHING SLIDES DATA
// ==========================================

const TEACHING_SLIDES: Slide[] = [
  {
    id: 1,
    nodeId: 'c7_chem_017',
    title: 'Why Water Dissolves Almost Everything',
    content: 'Water molecules (H₂O) have a bent geometry. Oxygen pulls shared electrons closer, gaining a partial negative charge (δ-), while hydrogens carry partial positive charges (δ+). This polarity allows water to surround and pull apart charged ions (like Na⁺ and Cl⁻ in salt) and polar molecules (like sugar).',
    keyPoints: [
      'Solutions are homogeneous mixtures with particles < 1 nm.',
      'Suspensions have large particles (>1000 nm) that settle over time.',
      'Colloids have intermediate particles (1-100 nm) that scatter light (Tyndall Effect).'
    ],
    visualType: 'polarity',
    interactivePrompt: 'Drag the salt crystal into the water to observe hydration shells form!'
  },
  {
    id: 2,
    nodeId: 'c7_chem_017',
    title: 'Testing Particle Size with Light: The Tyndall Effect',
    content: 'When a beam of light passes through a true solution, the liquid remains dark because particles are too tiny to scatter light. In a colloid (like milk or starch water), light hits intermediate particles and scatters, creating a glowing path. In a suspension (like muddy water), particles scatter light but eventually settle at the bottom.',
    keyPoints: [
      'Solution: Clear, does not scatter light, cannot be filtered.',
      'Colloid: Cloudy/translucent, shows Tyndall effect, does not settle.',
      'Suspension: Cloudy, settles down under gravity, separated by filter paper.'
    ],
    visualType: 'tyndall',
    interactivePrompt: 'Toggle the laser pointer across Solution, Colloid, and Suspension samples!'
  },
  {
    id: 3,
    nodeId: 'c7_chem_018',
    title: 'Hard Water vs Soft Water & Metal Reactions',
    content: 'Hard water contains dissolved Ca²⁺ and Mg²⁺ ions from rocks. When soap is added, these ions react to form an insoluble white scum (curd) before any lather can form. Soft water lacks these ions and lathers instantly. Temporary hardness (bicarbonates) is removed by boiling; permanent hardness (chlorides/sulfates) requires washing soda (Na₂CO₃).',
    keyPoints: [
      'Temporary Hardness: Ca(HCO₃)₂ & Mg(HCO₃)₂ → decomposed by boiling.',
      'Permanent Hardness: CaCl₂ & MgSO₄ → removed by adding washing soda.',
      'Reactivity of metals with water: Na reacts with cold water; Mg reacts with hot water/steam; Fe/Zn react only with steam.'
    ],
    visualType: 'hardness',
    interactivePrompt: 'Test soap lathering on hard vs soft water and attempt softening with boiling or washing soda!'
  },
  {
    id: 4,
    nodeId: 'c7_chem_019',
    title: 'Carbon Allotropes: Diamond vs Graphite',
    content: 'Allotropy is when an element exists in different structural forms. Diamond and Graphite are both 100% pure carbon! In diamond, each carbon forms 4 strong tetrahedral bonds (3D lattice), making it extremely hard and an electrical insulator. In graphite, each carbon forms 3 bonds in flat hexagonal layers with delocalized free electrons, making it soft, slippery, and electrically conductive.',
    keyPoints: [
      'Diamond: Tetrahedral network, 4 bonds/atom, hardest material, transparent, electrical insulator.',
      'Graphite: Layered sheets, 3 bonds/atom, 1 free electron/atom, soft, black, electrical conductor.',
      'Amorphous Carbon: Coal, coke, soot (lack long-range crystalline order).'
    ],
    visualType: 'allotropes',
    interactivePrompt: 'Switch between Diamond and Graphite atomic structures to test hardness and electrical conductivity!'
  },
  {
    id: 5,
    nodeId: 'c7_chem_020',
    title: 'Oxides of Carbon: Carbon Dioxide & Carbon Monoxide',
    content: 'Carbon forms CO₂ (carbon dioxide) and CO (carbon monoxide). In the lab, CO₂ is made from marble (CaCO₃) + dilute HCl and collected by upward displacement of air because it is denser than air. Bubbled through lime water (Ca(OH)₂), CO₂ forms white CaCO₃ precipitate (milky); excess CO₂ converts it to soluble Ca(HCO₃)₂ (clear again). CO is a toxic reducing agent formed by incomplete combustion.',
    keyPoints: [
      'CO₂ Lab Prep: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑ (collected by upward displacement of air).',
      'Lime Water Test: Ca(OH)₂ + CO₂ → CaCO₃↓ (white) + H₂O; + excess CO₂ → Ca(HCO₃)₂ (soluble).',
      'CO (Carbon Monoxide): Neutral, highly poisonous (binds to hemoglobin forming carboxyhemoglobin), strong reducing agent in blast furnaces.'
    ],
    visualType: 'limewater',
    interactivePrompt: 'Bubble CO₂ into lime water and observe the two-stage color/clarity change!'
  }
];

// ==========================================
// CHALLENGES (ASSESSMENT & PRACTICE)
// ==========================================

const CHALLENGES: Challenge[] = [
  {
    id: 'ch1',
    nodeId: 'c7_chem_017',
    question: 'Why is water known as the universal solvent?',
    options: [
      'It has a neutral pH of 7 and high boiling point',
      'Its polar molecular structure allows it to dissolve more substances than any other liquid',
      'It can easily convert into steam and ice',
      'It contains equal amounts of sodium and chloride ions'
    ],
    correctAnswer: 1,
    explanation: 'Water molecules are polar (oxygen is δ-, hydrogens are δ+). This charge imbalance allows water to attract and pull apart ionic crystals and polar compounds.',
    misconception: 'Confusing water\'s physical state changes with its chemical dissolving power.',
    difficulty: 'foundation',
    hint: 'Think about the partial charges on hydrogen and oxygen atoms in H2O.'
  },
  {
    id: 'ch2',
    nodeId: 'c7_chem_017',
    question: 'A beam of light shines through a glass beaker. The path of light becomes brightly visible. What type of mixture is inside?',
    options: [
      'True solution of sugar in water',
      'Suspension of coarse sand',
      'Colloid such as milk in water',
      'Pure distilled water'
    ],
    correctAnswer: 2,
    explanation: 'Colloids have particle sizes between 1-100 nm, which are large enough to scatter light (the Tyndall Effect) without settling immediately.',
    misconception: 'Believing true solutions scatter light beam paths clearly.',
    difficulty: 'standard',
    hint: 'Particles between 1 and 100 nm scatter light without settling quickly.'
  },
  {
    id: 'ch3',
    nodeId: 'c7_chem_017',
    question: 'Blue copper sulfate crystals (CuSO₄·5H₂O) turn white when gently heated in a dry test tube. What is driven off during heating?',
    options: [
      'Oxygen gas',
      'Sulfur dioxide gas',
      'Water of crystallisation',
      'Hydrogen gas'
    ],
    correctAnswer: 2,
    explanation: 'Heating hydrated copper sulfate drives off its water of crystallisation, leaving behind white anhydrous copper sulfate powder (CuSO₄).',
    misconception: 'Writing that the compound decomposes chemically into sulfur oxides on gentle heating.',
    difficulty: 'standard',
    hint: 'Look at the dot five H2O in hydrated copper sulfate.'
  },
  {
    id: 'ch4',
    nodeId: 'c7_chem_018',
    question: 'Which compound causes TEMPORARY hardness in water, and how can it be removed?',
    options: [
      'Calcium chloride (CaCl₂); removed by filtration',
      'Magnesium bicarbonate (Mg(HCO₃)₂); removed by boiling',
      'Calcium sulfate (CaSO₄); removed by boiling',
      'Sodium carbonate (Na₂CO₃); removed by evaporation'
    ],
    correctAnswer: 1,
    explanation: 'Temporary hardness is caused by bicarbonates of Ca and Mg. Boiling decomposes soluble bicarbonates into insoluble carbonates scale, softening the water.',
    misconception: 'Thinking boiling can remove permanent hardness caused by chlorides or sulfates.',
    difficulty: 'standard',
    hint: 'Bicarbonates decompose when heated to produce insoluble carbonates.'
  },
  {
    id: 'ch5',
    nodeId: 'c7_chem_018',
    question: 'How do different metals react with water across various temperatures?',
    options: [
      'Sodium, magnesium, and iron all react violently with ice cold water',
      'Sodium reacts with cold water, Magnesium reacts with hot water/steam, Iron reacts only with steam',
      'Magnesium reacts with cold water while Sodium requires superheated steam',
      'Iron dissolves completely in cold water to produce iron chloride'
    ],
    correctAnswer: 1,
    explanation: 'Metal reactivity determines reaction conditions: highly reactive Sodium reacts with cold water; Magnesium needs hot water/steam; Iron needs steam at red heat.',
    misconception: 'Assuming all metals react identically with liquid water regardless of temperature.',
    difficulty: 'advanced',
    hint: 'Sodium is at the top of the reactivity series, followed by calcium, magnesium, then iron.'
  },
  {
    id: 'ch6',
    nodeId: 'c7_chem_019',
    question: 'Why does Graphite conduct electricity while Diamond acts as an electrical insulator?',
    options: [
      'Diamond has impurities that block electric current',
      'Graphite has 3 bonds per carbon, leaving 1 free delocalized electron per atom to move',
      'Diamond contains hydrogen atoms that cancel electric charge',
      'Graphite is a metal whereas diamond is a non-metal'
    ],
    correctAnswer: 1,
    explanation: 'In graphite, each carbon atom is bonded to 3 neighbours in layers. The 4th valence electron is free to move along the layers, conducting electricity.',
    misconception: 'Thinking graphite is a metal because it conducts electricity.',
    difficulty: 'standard',
    hint: 'Count how many valence electrons carbon has (4) and how many bonds each carbon forms in graphite (3).'
  },
  {
    id: 'ch7',
    nodeId: 'c7_chem_019',
    question: 'When pure Diamond and pure Graphite are separately burned completely in pure Oxygen gas, what product(s) do they form?',
    options: [
      'Diamond forms carbon dioxide; Graphite forms carbon monoxide and ash',
      'Both form ONLY Carbon Dioxide (CO₂) in identical mass ratios',
      'Diamond forms diamond oxide gas; Graphite forms carbon powder',
      'Both form water vapor and carbon dioxide'
    ],
    correctAnswer: 1,
    explanation: 'Since both diamond and graphite are allotropes made of 100% pure carbon, complete combustion of either produces pure Carbon Dioxide (CO₂).',
    misconception: 'Believing different physical structures result in different combustion end products.',
    difficulty: 'advanced',
    hint: 'Allotropes are different physical forms of the EXACT SAME chemical element.'
  },
  {
    id: 'ch8',
    nodeId: 'c7_chem_020',
    question: 'In the laboratory preparation of Carbon Dioxide, why is dilute Hydrochloric Acid added to Marble Chips instead of dilute Sulfuric Acid?',
    options: [
      'Sulfuric acid reacts too violently and explodes',
      'Sulfuric acid forms an insoluble layer of Calcium Sulfate (CaSO₄) on marble, stopping the reaction',
      'Hydrochloric acid creates a green colored gas that is easier to collect',
      'Sulfuric acid neutralizes carbon dioxide into carbon monoxide'
    ],
    correctAnswer: 1,
    explanation: 'Dilute H₂SO₄ reacts with CaCO₃ to form insoluble Calcium Sulfate (CaSO₄), which coats the marble chips and prevents further acid contact.',
    misconception: 'Assuming any acid works equally well for carbonate gas preparation.',
    difficulty: 'advanced',
    hint: 'Consider the solubility of calcium chloride vs calcium sulfate.'
  },
  {
    id: 'ch9',
    nodeId: 'c7_chem_020',
    question: 'When CO₂ is bubbled into lime water, it first turns milky, but continued bubbling turns it clear again. What compound causes the clarity to return?',
    options: [
      'Calcium hydroxide solution [Ca(OH)₂]',
      'Insoluble calcium carbonate [CaCO₃]',
      'Soluble calcium bicarbonate [Ca(HCO₃)₂]',
      'Calcium oxide powder [CaO]'
    ],
    correctAnswer: 2,
    explanation: 'Excess CO₂ and H₂O convert the insoluble milky precipitate (CaCO₃) into soluble Calcium Bicarbonate [Ca(HCO₃)₂], making the solution clear again.',
    misconception: 'Thinking the lime water simply evaporates or settles down.',
    difficulty: 'standard',
    hint: 'Soluble bicarbonates dissolve in water, removing turbidity.'
  },
  {
    id: 'ch10',
    nodeId: 'c7_chem_020',
    question: 'Why is Carbon Monoxide (CO) extremely dangerous in poorly ventilated rooms with burning stoves?',
    options: [
      'It burns oxygen out of the atmosphere instantly',
      'It dissolves lung tissue on contact',
      'It binds to hemoglobin forming carboxyhemoglobin, preventing oxygen transport in blood',
      'It decomposes into toxic chlorine gas when warmed'
    ],
    correctAnswer: 2,
    explanation: 'Carbon monoxide binds to hemoglobin ~200 times stronger than oxygen, forming stable carboxyhemoglobin which starves tissue of oxygen (asphyxia).',
    misconception: 'Confusing the mild acidity of CO2 with the cellular asphyxiation toxicity of CO.',
    difficulty: 'standard',
    hint: 'Think about red blood cells and oxygen carrying capacity.'
  }
];

// ==========================================
// DISCOVERY PREDICTION QUESTION
// ==========================================

interface DiscoveryQuestion {
  question: string;
  options: { label: string; text: string; correct: boolean; explanation: string }[];
}

const DISCOVERY_PREDICTION: DiscoveryQuestion = {
  question: 'Imagine placing a piece of pure charcoal (amorphous carbon) and a brilliant diamond in separate sealed furnaces filled with pure oxygen gas. If you heat both until they burn completely, what will happen?',
  options: [
    {
      label: 'A',
      text: 'Diamond forms a rare transparent gas, while charcoal forms black smoke and carbon dioxide.',
      correct: false,
      explanation: 'Not quite! Remember that both diamond and charcoal are composed purely of carbon atoms.'
    },
    {
      label: 'B',
      text: 'Both will burn completely to produce ONLY Carbon Dioxide (CO₂) gas and nothing else.',
      correct: true,
      explanation: 'Spot on! Because diamond, graphite, and charcoal are allotropes of pure carbon, complete combustion yields identical Carbon Dioxide gas.'
    },
    {
      label: 'C',
      text: 'Diamond will not burn because it is the hardest substance on Earth.',
      correct: false,
      explanation: 'Hardness is a physical property! Chemically, carbon in diamond will still react with oxygen at around 800°C.'
    }
  ]
};

// ==========================================
// CUSTOM VISUAL SIMULATOR COMPONENTS
// ==========================================

// 1. Water Polarity & Dissolution Simulator
const WaterPolaritySim: React.FC<{
  onStateChange?: (dissolvedCount: number) => void;
}> = ({ onStateChange }) => {
  const [ions, setIons] = useState<{ id: number; type: 'Na' | 'Cl'; x: number; y: number; dissolved: boolean }[]>([
    { id: 1, type: 'Na', x: 190, y: 150, dissolved: false },
    { id: 2, type: 'Cl', x: 210, y: 150, dissolved: false },
    { id: 3, type: 'Na', x: 190, y: 170, dissolved: false },
    { id: 4, type: 'Cl', x: 210, y: 170, dissolved: false },
    { id: 5, type: 'Na', x: 200, y: 160, dissolved: false },
    { id: 6, type: 'Cl', x: 200, y: 140, dissolved: false }
  ]);
  const [stirring, setStirring] = useState(false);

  const handleDissolve = () => {
    audioManager.play('pop');
    setStirring(true);
    setTimeout(() => {
      setIons(prev => {
        const next = prev.map((ion, idx) => ({
          ...ion,
          dissolved: true,
          x: 60 + (idx % 3) * 110 + Math.random() * 30,
          y: 70 + Math.floor(idx / 3) * 70 + Math.random() * 20
        }));
        const count = next.filter(i => i.dissolved).length;
        if (onStateChange) onStateChange(count);
        return next;
      });
      setStirring(false);
      audioManager.play('drop-correct');
    }, 1000);
  };

  const handleReset = () => {
    audioManager.play('tap');
    setIons([
      { id: 1, type: 'Na', x: 190, y: 150, dissolved: false },
      { id: 2, type: 'Cl', x: 210, y: 150, dissolved: false },
      { id: 3, type: 'Na', x: 190, y: 170, dissolved: false },
      { id: 4, type: 'Cl', x: 210, y: 170, dissolved: false },
      { id: 5, type: 'Na', x: 200, y: 160, dissolved: false },
      { id: 6, type: 'Cl', x: 200, y: 140, dissolved: false }
    ]);
    if (onStateChange) onStateChange(0);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl text-white w-full border border-slate-700">
      <div className="text-sm font-semibold mb-2 text-sky-300">
        Water Molecule Polarity (O: δ-, H: δ+) & NaCl Dissolution
      </div>
      <svg width="400" height="240" viewBox="0 0 400 240" className="bg-slate-950 rounded-lg shadow-inner">
        {/* Water background molecules */}
        <g opacity="0.4">
          <circle cx="50" cy="50" r="14" fill="#0284c7" />
          <circle cx="38" cy="40" r="7" fill="#e0f2fe" />
          <circle cx="62" cy="40" r="7" fill="#e0f2fe" />

          <circle cx="340" cy="60" r="14" fill="#0284c7" />
          <circle cx="328" cy="50" r="7" fill="#e0f2fe" />
          <circle cx="352" cy="50" r="7" fill="#e0f2fe" />

          <circle cx="80" cy="200" r="14" fill="#0284c7" />
          <circle cx="68" cy="190" r="7" fill="#e0f2fe" />
          <circle cx="92" cy="190" r="7" fill="#e0f2fe" />

          <circle cx="330" cy="190" r="14" fill="#0284c7" />
          <circle cx="318" cy="180" r="7" fill="#e0f2fe" />
          <circle cx="342" cy="180" r="7" fill="#e0f2fe" />
        </g>

        {/* Stirring spoon animation */}
        {stirring && (
          <motion.line
            x1="200" y1="10" x2="200" y2="180"
            stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"
            animate={{ rotate: [0, 15, -15, 0], x: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 0.3 }}
          />
        )}

        {/* NaCl Crystal Lattice Box if not dissolved */}
        {!ions[0].dissolved && (
          <rect x="175" y="125" width="50" height="50" rx="6" fill="none" stroke="#38bdf8" strokeDasharray="3 3" />
        )}

        {/* Ions with hydration shells when dissolved */}
        {ions.map(ion => (
          <g key={ion.id}>
            {ion.dissolved && (
              /* Hydration shell of H2O oriented towards ion charge */
              <g opacity="0.8">
                <circle cx={ion.x - 20} cy={ion.y} r="8" fill="#0284c7" />
                <circle cx={ion.x + 20} cy={ion.y} r="8" fill="#0284c7" />
                <circle cx={ion.x} cy={ion.y - 20} r="8" fill="#0284c7" />
                <circle cx={ion.x} cy={ion.y + 20} r="8" fill="#0284c7" />
              </g>
            )}
            <motion.circle
              animate={{ cx: ion.x, cy: ion.y }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              r={ion.type === 'Na' ? '12' : '15'}
              fill={ion.type === 'Na' ? '#f59e0b' : '#10b981'}
            />
            <motion.text
              animate={{ x: ion.x - 7, y: ion.y + 4 }}
              fill="#ffffff"
              fontSize="11"
              fontWeight="bold"
            >
              {ion.type === 'Na' ? 'Na⁺' : 'Cl⁻'}
            </motion.text>
          </g>
        ))}
      </svg>

      <div className="flex gap-3 mt-3">
        <button
          onClick={handleDissolve}
          disabled={stirring || ions[0].dissolved}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-medium rounded-lg text-xs transition"
        >
          {stirring ? 'Stirring Water...' : 'Stir & Dissolve Salt'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg text-xs transition"
        >
          Reset Salt Crystal
        </button>
      </div>
    </div>
  );
};

// 2. Tyndall Effect Simulator
const TyndallEffectSim: React.FC = () => {
  const [sample, setSample] = useState<'solution' | 'colloid' | 'suspension'>('solution');
  const [laserOn, setLaserOn] = useState(true);

  const handleSelectSample = (s: 'solution' | 'colloid' | 'suspension') => {
    audioManager.play('tap');
    setSample(s);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl text-white w-full border border-slate-700">
      <div className="flex justify-between items-center w-full mb-3 px-2">
        <span className="text-sm font-semibold text-amber-300">Tyndall Light Scattering Test</span>
        <button
          onClick={() => { audioManager.play('pop'); setLaserOn(!laserOn); }}
          className={`px-3 py-1 text-xs rounded font-medium ${laserOn ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          {laserOn ? 'Laser ON' : 'Laser OFF'}
        </button>
      </div>

      <svg width="400" height="200" viewBox="0 0 400 200" className="bg-slate-950 rounded-lg">
        {/* Laser Device */}
        <rect x="20" y="85" width="50" height="30" fill="#dc2626" rx="4" />
        <rect x="70" y="93" width="10" height="14" fill="#991b1b" />
        <text x="28" y="104" fill="#ffffff" fontSize="10" fontWeight="bold">LASER</text>

        {/* Laser Beam initial path */}
        {laserOn && (
          <line x1="80" y1="100" x2="150" y2="100" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        )}

        {/* Beaker */}
        <path d="M 150 40 L 150 160 Q 150 170 160 170 L 240 170 Q 250 170 250 160 L 250 40" fill="none" stroke="#94a3b8" strokeWidth="4" />

        {/* Beaker Liquid */}
        <path
          d="M 152 70 L 152 160 Q 152 168 160 168 L 240 168 Q 248 168 248 160 L 248 70 Z"
          fill={sample === 'solution' ? 'rgba(56, 189, 248, 0.2)' : sample === 'colloid' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(120, 113, 108, 0.5)'}
        />

        {/* Laser Beam through liquid */}
        {laserOn && sample === 'solution' && (
          // Invisible / ultra faint in true solution
          <line x1="150" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="0.5" opacity="0.2" />
        )}

        {laserOn && sample === 'colloid' && (
          // Glowing scattered path (Tyndall Effect)
          <g>
            <line x1="150" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="8" opacity="0.4" />
            <line x1="150" y1="100" x2="250" y2="100" stroke="#fca5a5" strokeWidth="3" />
            {/* Scattered particles */}
            <circle cx="170" cy="95" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="200" cy="105" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="230" cy="98" r="3" fill="#ffffff" opacity="0.8" />
          </g>
        )}

        {laserOn && sample === 'suspension' && (
          // Scattered and blocked beam with large settling particles
          <g>
            <line x1="150" y1="100" x2="210" y2="100" stroke="#ef4444" strokeWidth="10" opacity="0.5" />
            {/* Large particles at bottom */}
            <circle cx="170" cy="160" r="5" fill="#78716c" />
            <circle cx="190" cy="162" r="6" fill="#78716c" />
            <circle cx="210" cy="158" r="5" fill="#78716c" />
            <circle cx="230" cy="161" r="7" fill="#78716c" />
          </g>
        )}

        {/* Laser beam exit */}
        {laserOn && (
          <line x1="250" y1="100" x2="380" y2="100" stroke="#ef4444" strokeWidth="4" opacity={sample === 'suspension' ? 0.2 : 0.9} />
        )}

        {/* Beaker Label */}
        <text x="165" y="60" fill="#f8fafc" fontSize="12" fontWeight="bold">
          {sample === 'solution' ? 'Sugar Water' : sample === 'colloid' ? 'Milk / Colloid' : 'Muddy Water'}
        </text>
      </svg>

      <div className="flex gap-2 mt-3">
        {(['solution', 'colloid', 'suspension'] as const).map(s => (
          <button
            key={s}
            onClick={() => handleSelectSample(s)}
            className={`px-3 py-1.5 rounded text-xs capitalize font-medium transition ${
              sample === s ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">
        {sample === 'solution' && 'True Solution: Particles <1 nm. Light beam is invisible inside solution.'}
        {sample === 'colloid' && 'Colloid (1-100 nm): Particles scatter light! Tyndall Effect is visible.'}
        {sample === 'suspension' && 'Suspension (>1000 nm): Coarse particles scatter light & settle down.'}
      </p>
    </div>
  );
};

// 3. Hard & Soft Water Lather Simulator
const HardnessLatherSim: React.FC = () => {
  const [waterType, setWaterType] = useState<'soft' | 'temp_hard' | 'perm_hard'>('temp_hard');
  const [treated, setTreated] = useState<'none' | 'boiled' | 'washing_soda'>('none');
  const [latherHeight, setLatherHeight] = useState(10);
  const [scumVisible, setScumVisible] = useState(true);

  const calculateResults = useCallback((type: typeof waterType, treat: typeof treated) => {
    if (type === 'soft') {
      setLatherHeight(80);
      setScumVisible(false);
    } else if (type === 'temp_hard') {
      if (treat === 'boiled' || treat === 'washing_soda') {
        setLatherHeight(75);
        setScumVisible(false);
      } else {
        setLatherHeight(15);
        setScumVisible(true);
      }
    } else if (type === 'perm_hard') {
      if (treat === 'washing_soda') {
        setLatherHeight(75);
        setScumVisible(false);
      } else {
        // Boiling does NOT remove permanent hardness
        setLatherHeight(15);
        setScumVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    calculateResults(waterType, treated);
  }, [waterType, treated, calculateResults]);

  const handleSoapShake = () => {
    audioManager.play('whoosh');
    calculateResults(waterType, treated);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl text-white w-full border border-slate-700">
      <div className="text-sm font-semibold text-emerald-300 mb-2">
        Soap Lather vs Scum Formation Test
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-3">
        <div>
          <label className="text-xs text-slate-400 block mb-1">Water Sample Source:</label>
          <select
            value={waterType}
            onChange={e => {
              audioManager.play('tap');
              setWaterType(e.target.value as any);
              setTreated('none');
            }}
            className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white"
          >
            <option value="soft">Rainwater / Distilled (Soft Water)</option>
            <option value="temp_hard">Well Water (Ca(HCO₃)₂ - Temporary Hard)</option>
            <option value="perm_hard">Borewell Water (CaCl₂ - Permanent Hard)</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-1">Treatment Method:</label>
          <select
            value={treated}
            onChange={e => {
              audioManager.play('tap');
              setTreated(e.target.value as any);
            }}
            className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white"
          >
            <option value="none">Untreated</option>
            <option value="boiled">Boil Water</option>
            <option value="washing_soda">Add Washing Soda (Na₂CO₃)</option>
          </select>
        </div>
      </div>

      <svg width="280" height="200" viewBox="0 0 280 200" className="bg-slate-950 rounded-lg">
        {/* Test Tube */}
        <rect x="110" y="20" width="60" height="150" fill="none" stroke="#94a3b8" strokeWidth="3" rx="4" />
        <path d="M 110 170 Q 140 185 170 170" fill="none" stroke="#94a3b8" strokeWidth="3" />

        {/* Liquid level */}
        <rect x="112" y="100" width="56" height="68" fill="rgba(14, 165, 233, 0.4)" rx="2" />

        {/* Precipitate/Scale at bottom if boiled or treated */}
        {(treated === 'boiled' && waterType === 'temp_hard') && (
          <rect x="115" y="160" width="50" height="8" fill="#f8fafc" opacity="0.9" rx="2" />
        )}
        {(treated === 'washing_soda' && waterType !== 'soft') && (
          <rect x="115" y="160" width="50" height="8" fill="#f1f5f9" opacity="0.9" rx="2" />
        )}

        {/* Scum layer on top of liquid */}
        {scumVisible && (
          <rect x="112" y="95" width="56" height="8" fill="#e2e8f0" rx="1" />
        )}

        {/* Lather foam height */}
        <motion.g
          animate={{ height: latherHeight }}
          transition={{ duration: 0.5 }}
        >
          <rect
            x="112"
            y={100 - latherHeight}
            width="56"
            height={latherHeight}
            fill="rgba(255, 255, 255, 0.8)"
            rx="4"
          />
          {/* Lather Bubbles */}
          {latherHeight > 30 && (
            <g fill="#0284c7" opacity="0.3">
              <circle cx="125" cy={100 - latherHeight / 2} r="4" />
              <circle cx="145" cy={95 - latherHeight / 3} r="5" />
              <circle cx="155" cy={100 - latherHeight / 1.5} r="3" />
            </g>
          )}
        </motion.g>

        <text x="140" y="193" fill="#cbd5e1" fontSize="10" textAnchor="middle">
          {scumVisible ? 'Insoluble Curd / Scum' : 'Rich Lather Foam'}
        </text>
      </svg>

      <button
        onClick={handleSoapShake}
        className="mt-3 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded text-xs transition"
      >
        Add Soap & Shake Tube
      </button>
    </div>
  );
};

// 4. Carbon Allotropes Visualizer (Diamond vs Graphite)
const CarbonAllotropeSim: React.FC = () => {
  const [allotrope, setAllotrope] = useState<'diamond' | 'graphite'>('diamond');
  const [testMode, setTestMode] = useState<'structure' | 'conduction'>('structure');

  const toggleAllotrope = (type: 'diamond' | 'graphite') => {
    audioManager.play('tap');
    setAllotrope(type);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl text-white w-full border border-slate-700">
      <div className="flex justify-between items-center w-full mb-3">
        <span className="text-sm font-semibold text-indigo-300">
          Carbon Allotropes: {allotrope === 'diamond' ? 'Diamond Lattice' : 'Graphite Sheet Layers'}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => toggleAllotrope('diamond')}
            className={`px-3 py-1 rounded text-xs font-semibold ${allotrope === 'diamond' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Diamond
          </button>
          <button
            onClick={() => toggleAllotrope('graphite')}
            className={`px-3 py-1 rounded text-xs font-semibold ${allotrope === 'graphite' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Graphite
          </button>
        </div>
      </div>

      <svg width="380" height="200" viewBox="0 0 380 200" className="bg-slate-950 rounded-lg">
        {allotrope === 'diamond' ? (
          /* Tetrahedral 3D Network */
          <g transform="translate(90, 20)">
            {/* Tetrahedral bonds */}
            <line x1="100" y1="80" x2="50" y2="130" stroke="#818cf8" strokeWidth="3" />
            <line x1="100" y1="80" x2="150" y2="130" stroke="#818cf8" strokeWidth="3" />
            <line x1="100" y1="80" x2="100" y2="30" stroke="#818cf8" strokeWidth="3" />
            <line x1="100" y1="80" x2="100" y2="120" stroke="#818cf8" strokeWidth="3" />

            <line x1="50" y1="130" x2="20" y2="160" stroke="#818cf8" strokeWidth="2" />
            <line x1="150" y1="130" x2="180" y2="160" stroke="#818cf8" strokeWidth="2" />

            {/* Carbon Atoms */}
            <circle cx="100" cy="80" r="12" fill="#38bdf8" />
            <circle cx="50" cy="130" r="10" fill="#0284c7" />
            <circle cx="150" cy="130" r="10" fill="#0284c7" />
            <circle cx="100" cy="30" r="10" fill="#0284c7" />
            <circle cx="100" cy="120" r="8" fill="#0284c7" />

            <text x="100" y="84" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">C</text>
            <text x="100" y="175" fill="#a5f3fc" fontSize="11" textAnchor="middle">
              4 Covalent Bonds / Atom → Rigid 3D Network
            </text>
          </g>
        ) : (
          /* Layered Hexagonal Network with delocalized electrons */
          <g transform="translate(40, 20)">
            {/* Layer 1 Hexagons */}
            <polygon points="50,30 90,30 110,50 90,70 50,70 30,50" fill="none" stroke="#6366f1" strokeWidth="2" />
            <polygon points="110,50 150,50 170,70 150,90 110,90 90,70" fill="none" stroke="#6366f1" strokeWidth="2" />

            {/* Weak Van der Waals forces */}
            <line x1="50" y1="70" x2="50" y2="120" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />
            <line x1="110" y1="90" x2="110" y2="140" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />

            {/* Layer 2 Hexagons */}
            <polygon points="50,120 90,120 110,140 90,160 50,160 30,140" fill="none" stroke="#818cf8" strokeWidth="2" />

            {/* Delocalized electrons moving along layers */}
            <motion.circle
              animate={{ x: [40, 160, 40] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              cx="0" cy="50" r="4" fill="#f59e0b"
            />
            <motion.circle
              animate={{ x: [160, 40, 160] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              cx="0" cy="140" r="4" fill="#f59e0b"
            />

            <text x="150" y="175" fill="#c7d2fe" fontSize="11" textAnchor="middle">
              3 Bonds/Atom + 1 Free Electron (Conducts Electricity)
            </text>
          </g>
        )}
      </svg>

      <div className="mt-3 text-xs text-slate-300 text-center">
        {allotrope === 'diamond' ? (
          <span><strong>Diamond:</strong> Extremely hard, transparent, non-conductor. Used in jewelry & cutting glass.</span>
        ) : (
          <span><strong>Graphite:</strong> Soft, slippery layers, good conductor. Used in pencil lead & cell battery electrodes.</span>
        )}
      </div>
    </div>
  );
};

// 5. Lime Water CO2 Reaction Simulator
const LimeWaterReactionSim: React.FC = () => {
  const [co2Amount, setCo2Amount] = useState(0); // 0: None, 1: Moderate (Milky), 2: Excess (Clear)

  const handleAddCO2 = () => {
    audioManager.play('pop');
    if (co2Amount === 0) setCo2Amount(1);
    else if (co2Amount === 1) setCo2Amount(2);
    else setCo2Amount(0);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl text-white w-full border border-slate-700">
      <div className="text-sm font-semibold text-orange-300 mb-2">
        Lime Water Test for Carbon Dioxide Gas
      </div>

      <svg width="320" height="200" viewBox="0 0 320 200" className="bg-slate-950 rounded-lg">
        {/* Flask */}
        <path d="M 140 40 L 140 80 L 100 160 Q 90 180 120 180 L 200 180 Q 230 180 220 160 L 180 80 L 180 40 Z" fill="none" stroke="#94a3b8" strokeWidth="3" />

        {/* Bubbling Tube */}
        <path d="M 160 10 L 160 150" fill="none" stroke="#e2e8f0" strokeWidth="4" />

        {/* Gas Bubbles */}
        {co2Amount > 0 && (
          <g fill="#ea580c">
            <motion.circle animate={{ y: [140, 60] }} transition={{ repeat: Infinity, duration: 1 }} cx="160" cy="140" r="4" />
            <motion.circle animate={{ y: [150, 70] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }} cx="155" cy="150" r="3" />
          </g>
        )}

        {/* Liquid Solution in Flask */}
        <path
          d="M 115 130 L 100 160 Q 90 180 120 180 L 200 180 Q 230 180 220 160 L 205 130 Z"
          fill={
            co2Amount === 0
              ? 'rgba(56, 189, 248, 0.2)' // Clear Ca(OH)2
              : co2Amount === 1
              ? 'rgba(255, 255, 255, 0.85)' // Milky CaCO3 precipitate
              : 'rgba(56, 189, 248, 0.3)' // Soluble Ca(HCO3)2 (Clear again)
          }
        />

        <text x="160" y="193" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
          {co2Amount === 0 && 'Clear Lime Water [Ca(OH)₂]'}
          {co2Amount === 1 && 'Milky White Precipitate [CaCO₃↓]'}
          {co2Amount === 2 && 'Clear Solution [Ca(HCO₃)₂ soluble]'}
        </text>
      </svg>

      <button
        onClick={handleAddCO2}
        className="mt-3 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg text-xs transition"
      >
        {co2Amount === 0 && 'Bubble CO₂ Gas (Stage 1)'}
        {co2Amount === 1 && 'Pass Excess CO₂ Gas (Stage 2)'}
        {co2Amount === 2 && 'Reset Test Flask'}
      </button>

      <div className="mt-2 text-xs text-slate-400 text-center">
        {co2Amount === 1 && 'Ca(OH)₂ + CO₂ → CaCO₃↓ (Insoluble milky precipitate) + H₂O'}
        {co2Amount === 2 && 'CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (Soluble calcium bicarbonate)'}
      </div>
    </div>
  );
};

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Water as a universal solvent can dissolve absolutely every substance",
    description: "Students believe that because water is called a 'universal solvent', it can dissolve every liquid, solid, and gas, including oil, wax, and sand.",
    correction: "Water is termed a universal solvent because it dissolves more substances than any other liquid, but it cannot dissolve everything. Substances like oil, petrol, and sand are insoluble in water due to differences in their chemical nature.",
  },
  {
    id: "misc_2",
    title: "Hard water is physically hard to touch or contains ice",
    description: "Students often confuse the term 'hard water' with ice or assume it feels physically rigid, rough, or solid against the skin.",
    correction: "Hard water refers to liquid water that contains high concentrations of dissolved minerals, primarily calcium and magnesium salts. It looks and feels like ordinary water, but it does not readily form lather when mixed with soap.",
  },
  {
    id: "misc_3",
    title: "Dissolving a solid in water is identical to melting it",
    description: "Students frequently think that when sugar or salt disappears in water, it has melted because of the liquid environment.",
    correction: "Melting is a phase change caused by heat converting a single solid into liquid form. Dissolving happens when solvent molecules interact with solute particles, breaking them apart and distributing them evenly throughout the liquid.",
  },
  {
    id: "misc_4",
    title: "Clear and transparent water is always pure and safe drinking water",
    description: "Students often assume that if water looks completely clear and free of mud or dirt, it is completely pure and safe to consume.",
    correction: "Water can appear perfectly clear while still containing invisible dissolved chemical pollutants, toxic heavy metals, or harmful pathogens. True purity requires specialized filtration and purification methods beyond simple visual inspection.",
  },
  {
    id: "misc_5",
    title: "Boiling polluted water removes all types of harmful contaminants",
    description: "Students believe that boiling water purifies it completely by eliminating both biological pathogens and chemical pollutants.",
    correction: "Boiling effectively kills micro-organisms such as bacteria and viruses present in water. However, it cannot remove dissolved chemical pollutants, pesticides, or heavy metals, which actually become more concentrated as steam evaporates.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function C7_ChemistryWaterauniversalsolventSim() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'prediction' | 'slides' | 'lab' | 'quiz' | 'mastery'>('prediction');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [predictionAnswered, setPredictionAnswered] = useState(false);
  const [predictionChoice, setPredictionChoice] = useState<number | null>(null);

  // Score & Adaptive Learning States
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // BKT (Bayesian Knowledge Tracing) per Node
  const [bktMap, setBktMap] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => ({
    c7_chem_017: createBKTState(),
    c7_chem_018: createBKTState(),
    c7_chem_019: createBKTState(),
    c7_chem_020: createBKTState()
  }));

  // Automatic hint timer (10s inactivity)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetTimer]);

  // Voice narration triggers
  useEffect(() => {
    if (activeTab === 'slides') {
      const slide = TEACHING_SLIDES[currentSlideIdx];
      speechManager.speak(`${slide.title}. ${slide.content}`);
      speechManager.speak('Great job! Keep going.');
    }
  }, [activeTab, currentSlideIdx]);

  // Prediction selection
  const handleSelectPrediction = (index: number) => {
    if (predictionAnswered) return;
    audioManager.play('tap');
    setPredictionChoice(index);
    setPredictionAnswered(true);
    if (DISCOVERY_PREDICTION.options[index].correct) {
      audioManager.play('celebration');
      speechManager.speak('Excellent prediction! Allotropes share identical carbon chemistry.');
    } else {
      audioManager.play('error');
    }
  };

  // Answer challenge
  const handleAnswerChallenge = (optionIdx: number) => {
    if (isSubmitted) return;
    audioManager.play('tap');
    setSelectedOption(optionIdx);
  };

  const handleSubmitChallenge = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);

    const currentQ = CHALLENGES[currentChallengeIdx];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    // BKT & SRS update
    const prevBKT = bktMap[currentQ.nodeId];
    const updatedBKT = bktUpdate(prevBKT, isCorrect);
    setBktMap(prev => ({ ...prev, [currentQ.nodeId]: updatedBKT }));

    const srsItem = createReviewItem(currentQ.id, 'Chemistry');
    const updatedSRS = sm2Update(srsItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      setScore(s => s + 10);
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setSparklePos({ x: 500, y: 300 });
      speechManager.speak('Correct! Brilliant understanding of chemistry.');
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('Not quite right. Review the diagnostic explanation.');
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setShowSparkle(false);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      setActiveTab('mastery');

      // Record scores into storage
      ALL_NODE_IDS.forEach(nodeId => {
        recordGameScore(Object.values(ALL_NODE_IDS), score);
      });
    }
  };

  // Compute aggregate mastery percentages
  const nodeMasteryScores = useMemo(() => {
    return ALL_NODE_IDS.map(id => {
      const bkt = bktMap[id];
      const p = masteryProb(bkt);
      return {
        nodeId: id,
        title: NODE_METADATA[id].title,
        color: NODE_METADATA[id].color,
        percentage: Math.round(p * 100)
      };
    });
  }, [bktMap]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Top Header Bar */}
      <header className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950 px-2.5 py-1 rounded-full border border-sky-800">
            Class 7 ICSE • Chemistry
          </span>
          <h1 className="text-xl md:text-2xl font-black text-white mt-1">
            Water, Solutions & Carbon Chemistry
          </h1>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('prediction'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'prediction' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Predict
          </button>
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('slides'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'slides' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Visual Lessons
          </button>
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('lab'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'lab' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Lab Workbench
          </button>
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('quiz'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'quiz' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Challenges ({currentChallengeIdx + 1}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('mastery'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'mastery' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Mastery
          </button>
        </nav>
      </header>

      {/* Main Interactive Stage Container */}
      <main className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative min-h-[540px] flex flex-col justify-between">
        
        {/* STAGE 0: DISCOVERY PREDICTION */}
        {activeTab === 'prediction' && (
          <div className="flex flex-col items-center text-center my-auto">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800 mb-3">
              Thought Experiment Predictor
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white max-w-2xl mb-6">
              {DISCOVERY_PREDICTION.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-6">
              {DISCOVERY_PREDICTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPrediction(idx)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition ${
                    predictionChoice === idx
                      ? opt.correct
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-100'
                        : 'bg-rose-950 border-rose-500 text-rose-100'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold bg-slate-900 px-2 py-0.5 rounded w-max mb-2">
                    Option {opt.label}
                  </span>
                  <p className="text-xs font-medium leading-relaxed">{opt.text}</p>
                </button>
              ))}
            </div>

            {predictionAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950 border border-slate-800 p-4 rounded-xl max-w-2xl text-xs text-slate-300 mb-4"
              >
                <p className="font-semibold text-sky-400 mb-1">Scientific Explanation:</p>
                {DISCOVERY_PREDICTION.options[predictionChoice!].explanation}
              </motion.div>
            )}

            <button
              onClick={() => { audioManager.play('swoop'); setActiveTab('slides'); }}
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm transition shadow-lg"
            >
              Start Visual Learning Lessons →
            </button>
          </div>
        )}

        {/* STAGE 1: VISUAL TEACHING SLIDES */}
        {activeTab === 'slides' && (
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: NODE_METADATA[TEACHING_SLIDES[currentSlideIdx].nodeId].color }}
                >
                  {NODE_METADATA[TEACHING_SLIDES[currentSlideIdx].nodeId].title}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Slide {currentSlideIdx + 1} of {TEACHING_SLIDES.length}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                {TEACHING_SLIDES[currentSlideIdx].title}
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mb-4 leading-relaxed">
                {TEACHING_SLIDES[currentSlideIdx].content}
              </p>

              {/* Interactive Visual Simulator Box */}
              <div className="my-4">
                {TEACHING_SLIDES[currentSlideIdx].visualType === 'polarity' && <WaterPolaritySim />}
                {TEACHING_SLIDES[currentSlideIdx].visualType === 'tyndall' && <TyndallEffectSim />}
                {TEACHING_SLIDES[currentSlideIdx].visualType === 'hardness' && <HardnessLatherSim />}
                {TEACHING_SLIDES[currentSlideIdx].visualType === 'allotropes' && <CarbonAllotropeSim />}
                {TEACHING_SLIDES[currentSlideIdx].visualType === 'limewater' && <LimeWaterReactionSim />}
              </div>

              {/* Key Exam Takeaways */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                <p className="font-semibold text-amber-300 mb-1">ICSE Exam Key Takeaways:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {TEACHING_SLIDES[currentSlideIdx].keyPoints.map((kp, i) => (
                    <li key={i}>{kp}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Slide Control Footer */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800">
              <button
                disabled={currentSlideIdx === 0}
                onClick={() => { audioManager.play('tap'); setCurrentSlideIdx(s => s - 1); }}
                className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-700 transition"
              >
                ← Previous
              </button>

              <button
                onClick={() => { audioManager.play('tap'); setActiveTab('lab'); }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
              >
                Open Lab Workbench 🧪
              </button>

              <button
                disabled={currentSlideIdx === TEACHING_SLIDES.length - 1}
                onClick={() => { audioManager.play('tap'); setCurrentSlideIdx(s => s + 1); }}
                className="px-4 py-2 bg-sky-600 disabled:opacity-40 text-white rounded-lg text-xs font-semibold hover:bg-sky-500 transition"
              >
                Next Lesson →
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: EXPERIMENTAL LAB WORKBENCH */}
        {activeTab === 'lab' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white">Interactive Chemistry Workbench</h2>
                <p className="text-xs text-slate-400">Explore all four core node concepts through hands-on simulations.</p>
              </div>
              <button
                onClick={() => { audioManager.play('swoop'); setActiveTab('quiz'); }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition"
              >
                Take Mastery Challenges →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-sky-400 mb-2 uppercase tracking-wide">Node c7_chem_017: Solution & Colloids</h3>
                <TyndallEffectSim />
              </div>
              <div>
                <h3 className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide">Node c7_chem_018: Hard/Soft Water</h3>
                <HardnessLatherSim />
              </div>
              <div>
                <h3 className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wide">Node c7_chem_019: Carbon Allotropes</h3>
                <CarbonAllotropeSim />
              </div>
              <div>
                <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">Node c7_chem_020: Carbon Oxides Test</h3>
                <LimeWaterReactionSim />
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: ADAPTIVE MASTERY CHALLENGES */}
        {activeTab === 'quiz' && (
          <div className="flex flex-col h-full justify-between">
            <div>
              {/* Question Header Info */}
              <div className="flex justify-between items-center mb-4">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: NODE_METADATA[CHALLENGES[currentChallengeIdx].nodeId].color }}
                >
                  Node: {CHALLENGES[currentChallengeIdx].nodeId}
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">
                    Difficulty: {CHALLENGES[currentChallengeIdx].difficulty}
                  </span>
                  <span className="text-xs font-bold text-slate-300">
                    Score: {score}
                  </span>
                </div>
              </div>

              <h2 className="text-base md:text-lg font-bold text-white mb-4">
                Q{currentChallengeIdx + 1}: {CHALLENGES[currentChallengeIdx].question}
              </h2>

              {/* Options list */}
              <div className="space-y-3 mb-4">
                {CHALLENGES[currentChallengeIdx].options.map((option, idx) => {
                  let btnStyle = 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200';
                  if (selectedOption === idx) {
                    btnStyle = 'bg-sky-950 border-sky-500 text-sky-100 font-semibold';
                  }
                  if (isSubmitted) {
                    if (idx === CHALLENGES[currentChallengeIdx].correctAnswer) {
                      btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-100 font-bold';
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-rose-950 border-rose-500 text-rose-100';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerChallenge(idx)}
                      disabled={isSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm transition flex items-center gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Diagnostic Misconception & Explanation Box */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border text-xs leading-relaxed mb-4 ${
                    selectedOption === CHALLENGES[currentChallengeIdx].correctAnswer
                      ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-800 text-rose-200'
                  }`}
                >
                  <p className="font-bold text-sm mb-1">
                    {selectedOption === CHALLENGES[currentChallengeIdx].correctAnswer
                      ? '✓ Correct Analysis!'
                      : '✗ Incorrect — Diagnostic Analysis:'}
                  </p>
                  <p className="mb-2">{CHALLENGES[currentChallengeIdx].explanation}</p>
                  {selectedOption !== CHALLENGES[currentChallengeIdx].correctAnswer && (
                    <p className="text-amber-300 font-medium">
                      Common Misconception to Avoid: {CHALLENGES[currentChallengeIdx].misconception}
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Quiz Action Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-amber-400 hover:underline font-medium"
              >
                Need a Hint?
              </button>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitChallenge}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-emerald-600 disabled:opacity-50 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-lg"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs transition shadow-lg"
                >
                  Next Challenge →
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 4: FINAL MASTERY DASHBOARD */}
        {activeTab === 'mastery' && (
          <div className="flex flex-col items-center text-center my-auto">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 mb-2">
              Topic Mastery Summary
            </span>
            <h2 className="text-2xl font-black text-white mb-2">
              Congratulations! Laboratory Completed 🎉
            </h2>
            <p className="text-xs text-slate-400 max-w-md mb-6">
              You have thoroughly explored water solution dynamics, hard water softening, carbon allotrope bonding, and carbon oxide chemistry!
            </p>

            {/* Node Mastery Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-6">
              {nodeMasteryScores.map(m => (
                <div key={m.nodeId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white">{m.title}</span>
                    <span className="text-xs font-black" style={{ color: m.color }}>{m.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{ width: `${m.percentage}%`, backgroundColor: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => { audioManager.play('swoop'); setActiveTab('quiz'); setCurrentChallengeIdx(0); setScore(0); }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
              >
                Re-take Challenges 🔄
              </button>
              <button
                onClick={() => { audioManager.play('celebration'); setShowConfetti(true); }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-lg"
              >
                Celebrate Completion ✨
              </button>
            </div>
          </div>
        )}

        {/* Overlays & Sim-Engine Utility Feedback */}
        <HintBubble
          show={showHint}
          text={CHALLENGES[currentChallengeIdx]?.hint || 'Think about the atomic arrangement and polarity properties.'}
        />
        <Confetti show={showConfetti} />
        <SuccessBanner show={showSuccess} text="All Chemistry Challenges Mastered!" />
        <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

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

      {/* Footer Meta */}
      <footer className="w-full max-w-5xl mt-6 text-center text-slate-500 text-xs">
        ICSE Class 7 Chemistry • Interactive Simulation Engine • Brilliant.org Design Architecture
      </footer>
    </div>
  );
}