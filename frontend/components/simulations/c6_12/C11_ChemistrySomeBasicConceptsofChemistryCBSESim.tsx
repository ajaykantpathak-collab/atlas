'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';

// Node IDs covered in this simulation
const NODE_IDS = [
  'c11_chem_cbse_002', // Ancient Indian Chemical Traditions
  'c11_chem_cbse_003', // Archaeological Evidence of Ancient Indian Chemistry
  'c11_chem_cbse_004', // Notable Indian Chemists and Their Contributions
  'c11_chem_cbse_005', // Transition from Alchemy to Modern Chemistry in India
  'c11_chem_cbse_007', // Chemistry and Environmental Challenges
  'c11_chem_cbse_008', // Nature of Matter
  'c11_chem_cbse_009', // Three States of Matter and Interconversion
  'c11_chem_cbse_010', // Particle Arrangement in Different States of Matter
  'c11_chem_cbse_011', // Classification of Matter
  'c11_chem_cbse_012', // Elements
  'c11_chem_cbse_013', // Compounds
  'c11_chem_cbse_014', // Homogeneous Mixtures
  'c11_chem_cbse_015', // Heterogeneous Mixtures
  'c11_chem_cbse_016', // Physical and Chemical Properties
  'c11_chem_cbse_017', // SI System of Units
  'c11_chem_cbse_018', // SI Base Quantities and Units
  'c11_chem_cbse_019', // SI Prefixes
  'c11_chem_cbse_020', // Mass and Weight
  'c11_chem_cbse_021', // Volume Measurement
  'c11_chem_cbse_022', // Temperature Scales and Conversion
  'c11_chem_cbse_023', // Density
  'c11_chem_cbse_024', // Scientific Notation
  'c11_chem_cbse_026', // Precision and Accuracy
  'c11_chem_cbse_032', // Gay Lussac's Law of Gaseous Volumes
  'c11_chem_cbse_033', // Avogadro's Law
  'c11_chem_cbse_044', // Solution Concentration - Mass Percent and Mole Fraction
  'c11_chem_cbse_045', // Molarity
  'c11_chem_cbse_046', // Molality
  'c11_chem_cbse_049', // Reactions in Solutions
] as const;

type NodeID = (typeof NODE_IDS)[number];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type?: string;
}

interface Challenge {
  id: string;
  nodeId: NodeID;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: 'c11_chem_cbse_002',
    title: 'Ancient Indian Chemistry',
    difficulty: 'easy',
    description: 'Explore early chemical practices in ancient India.',
    question: 'Which ancient Indian text documents medicinal preparations, dyes, and perfumes, reflecting early Rasayana Shastra knowledge?',
    options: ['Atharvaveda', 'Rigveda', 'Samaveda', 'Yajurveda'],
    correctIndex: 0,
    explanation: 'Atharvaveda details various medicinal plants, dyes, and alchemy preparations, forming early foundations of Rasayana Shastra.',
    hint: 'Look for the Veda specifically concerned with healing, herbs, and practical preparations.',
  },
  {
    id: 'ch_02',
    nodeId: 'c11_chem_cbse_004',
    title: 'Acharya Kanada & Paramanu',
    difficulty: 'easy',
    description: 'Atomic theory in ancient philosophy.',
    question: 'Around 600 BCE, which ancient Indian philosopher proposed that matter is made of indivisible particles called "Paramanu"?',
    options: ['Acharya Kanada', 'Nagarjuna', 'Varahamihira', 'Chakrapani'],
    correctIndex: 0,
    explanation: 'Acharya Kanada formulated the Vaisheshika philosophy describing ultimate indivisible particles called Paramanu.',
    hint: 'He is considered the founder of the Vaisheshika school of philosophy.',
  },
  {
    id: 'ch_03',
    nodeId: 'c11_chem_cbse_009',
    title: 'Particle Motion in States of Matter',
    difficulty: 'easy',
    description: 'Analyze physical properties of states of matter.',
    question: 'Which state of matter exhibits maximum particle freedom of movement and fills any container completely?',
    options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
    correctIndex: 2,
    explanation: 'In gases, particles are far apart with minimal intermolecular forces, allowing complete freedom to fill available volume.',
    hint: 'Think about which state has neither definite shape nor definite volume.',
  },
  {
    id: 'ch_04',
    nodeId: 'c11_chem_cbse_013',
    title: 'Compounds vs Mixtures',
    difficulty: 'easy',
    description: 'Distinguish pure compounds from physical mixtures.',
    question: 'When Hydrogen and Oxygen combine chemically to form Water ($H_2O$), how do the properties of water compare to hydrogen and oxygen?',
    options: [
      'Water properties are identical to hydrogen gas',
      'Water properties are a simple average of constituent elements',
      'Water properties are entirely different from constituent gases',
      'Water retains the combustible nature of hydrogen',
    ],
    correctIndex: 2,
    explanation: 'Compounds have unique chemical properties distinct from their component elements (e.g., H₂ burns, O₂ supports combustion, H₂O extinguishes fire).',
    hint: 'Does water burn like hydrogen gas, or does it extinguish fire?',
  },
  {
    id: 'ch_05',
    nodeId: 'c11_chem_cbse_022',
    title: 'Temperature Unit Conversion',
    difficulty: 'medium',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin.',
    question: 'A human body temperature is recorded as 37 °C. What is this temperature in Kelvin and Fahrenheit?',
    options: [
      '310.15 K and 98.6 °F',
      '273.15 K and 98.6 °F',
      '310.15 K and 100 °F',
      '300.00 K and 95.0 °F',
    ],
    correctIndex: 0,
    explanation: 'K = °C + 273.15 = 37 + 273.15 = 310.15 K. °F = (9/5 × 37) + 32 = 66.6 + 32 = 98.6 °F.',
    hint: 'Use formulas: K = °C + 273.15 and °F = (9/5 × °C) + 32.',
  },
  {
    id: 'ch_06',
    nodeId: 'c11_chem_cbse_026',
    title: 'Precision vs Accuracy',
    difficulty: 'medium',
    description: 'Analyze experimental dartboard data.',
    question: 'A student measures mass 3 times: 2.01 g, 2.00 g, and 2.02 g. The true mass is 5.00 g. These measurements are:',
    options: [
      'Accurate and precise',
      'Precise but not accurate',
      'Accurate but not precise',
      'Neither accurate nor precise',
    ],
    correctIndex: 1,
    explanation: 'The values are very close to each other (precise), but far from the true value of 5.00 g (inaccurate).',
    hint: 'Precision = closeness among repeated values. Accuracy = closeness to true value.',
  },
  {
    id: 'ch_07',
    nodeId: 'c11_chem_cbse_032',
    title: "Gay Lussac's & Avogadro's Laws",
    difficulty: 'medium',
    description: 'Gas volume ratios during chemical combination.',
    question: '100 mL of Hydrogen reacts with 50 mL of Oxygen to yield 100 mL of Water vapor at constant T & P. What simple volume ratio does this illustrate?',
    options: ['2 : 1 : 2', '1 : 1 : 1', '2 : 2 : 1', '3 : 1 : 2'],
    correctIndex: 0,
    explanation: '100 mL H₂ : 50 mL O₂ : 100 mL H₂O(g) simplifies to 2 : 1 : 2 integer volume ratio per Gay Lussac\'s Law.',
    hint: 'Divide all volumes by 50 mL: 100/50 = 2, 50/50 = 1, 100/50 = 2.',
  },
  {
    id: 'ch_08',
    nodeId: 'c11_chem_cbse_045',
    title: 'Molarity Calculation & Dilution',
    difficulty: 'hard',
    description: 'Calculate solution molarity and dilution.',
    question: '4.0 grams of NaOH (Molar mass = 40 g/mol) is dissolved in enough water to make 250 mL of solution. What is the Molarity (M)?',
    options: ['0.40 M', '0.10 M', '0.25 M', '1.00 M'],
    correctIndex: 0,
    explanation: 'Moles NaOH = 4.0 g / 40 g/mol = 0.1 mol. Volume in liters = 250 mL / 1000 = 0.25 L. Molarity = 0.1 mol / 0.25 L = 0.40 M.',
    hint: 'Molarity = (Mass / Molar Mass) / Volume in Liters.',
  },
  {
    id: 'ch_09',
    nodeId: 'c11_chem_cbse_046',
    title: 'Molality vs Molarity',
    difficulty: 'hard',
    description: 'Temperature independence of concentration units.',
    question: 'Why is Molality (m) preferred over Molarity (M) when studying temperature-dependent physical chemistry properties?',
    options: [
      'Molality depends on total solution volume',
      'Molality is based on mass of solvent, which does not expand or contract with temperature',
      'Molarity uses mass instead of volume',
      'Molality requires density of gases',
    ],
    correctIndex: 1,
    explanation: 'Mass does not change with temperature, whereas solution volume expands or contracts with temperature variations.',
    hint: 'Does mass of a solvent change when temperature rises?',
  },
];

export const C11_ChemistrySomeBasicConceptsofChemistryCBSESim: React.FC = () => {
  // State variables
  const [activeTab, setActiveTab] = useState<'learn' | 'states' | 'measurement' | 'gas_laws' | 'solutions' | 'quiz'>('learn');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparkleCoords, setSparkleCoords] = useState({ x: 300, y: 200 });

  // Interactive Simulation Controls
  // States of Matter Lab
  const [temperatureK, setTemperatureK] = useState<number>(300);
  const [pressureAtm, setPressureAtm] = useState<number>(1.0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Measurement & Units Lab
  const [celsiusVal, setCelsiusVal] = useState<number>(25);
  const [dartSpread, setDartSpread] = useState<number>(10);
  const [dartBiasX, setDartBiasX] = useState<number>(0);
  const [dartBiasY, setDartBiasY] = useState<number>(0);
  const [darts, setDarts] = useState<{ x: number; y: number }[]>([]);

  // Density & Mass Lab
  const [sampleMassG, setSampleMassG] = useState<number>(54);
  const [sampleVolumeCm3, setSampleVolumeCm3] = useState<number>(20);

  // Gas Laws Chamber
  const [h2Moles, setH2Moles] = useState<number>(2);
  const [o2Moles, setO2Moles] = useState<number>(1);
  const [reactionProgress, setReactionProgress] = useState<number>(0);
  const [isReacting, setIsReacting] = useState<boolean>(false);

  // Solution Concentration Lab
  const [soluteType, setSoluteType] = useState<'naoh' | 'nacl' | 'glucose'>('naoh');
  const [soluteMassG, setSoluteMassG] = useState<number>(4.0);
  const [solutionVolumeMl, setSolutionVolumeMl] = useState<number>(250);
  const [solventMassKg, setSolventMassKg] = useState<number>(0.25);

  // BKT & Mastery tracking
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [score, setScore] = useState<number>(0);

  // Speech helper wrapper
  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // safe fallback
    }
  };

  // Sound helper wrapper
  const playSound = (type: SoundEffect | 'success' | 'error' | 'sparkle' | 'chime' | 'pop' | 'balance' | 'count' | 'whoosh') => {
    try {
      audioManager.play(type);
    } catch {
      // safe fallback
    }
  };

  // Initial greeting
  useEffect(() => {
    speakText('Welcome to Some Basic Concepts of Chemistry interactive simulation platform!');
  }, []);

  // Canvas particle animation for States of Matter
  useEffect(() => {
    if (activeTab !== 'states') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const numParticles = 40;
    const particles: Particle[] = [];

    // Colors
    const particleColor = temperatureK < 273 ? '#3b82f6' : temperatureK < 373 ? '#10b981' : '#ef4444';

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * (canvas.width - 20) + 10,
        y: Math.random() * (canvas.height - 20) + 10,
        vx: (Math.random() - 0.5) * (temperatureK / 50),
        vy: (Math.random() - 0.5) * (temperatureK / 50),
        radius: 8,
        color: particleColor,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw container boundary
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      // Phase state behavior logic
      const speedFactor = temperatureK / 150;

      particles.forEach((p, index) => {
        if (temperatureK < 273) {
          // Solid lattice vibration around fixed grid points
          const gridX = 40 + (index % 8) * 35;
          const gridY = 40 + Math.floor(index / 8) * 35;
          p.x = gridX + (Math.random() - 0.5) * (temperatureK / 100);
          p.y = gridY + (Math.random() - 0.5) * (temperatureK / 100);
        } else if (temperatureK < 373) {
          // Liquid fluid motion with bottom gravity pull
          p.y += 0.8; // gravity
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor;

          // Liquid boundaries
          if (p.x < 15 || p.x > canvas.width - 15) p.vx *= -1;
          if (p.y > canvas.height - 15) {
            p.y = canvas.height - 15;
            p.vy *= -0.8;
          }
          if (p.y < 80) p.vy += 0.5;
        } else {
          // Gas random collisions and expansion
          p.x += p.vx * speedFactor * 1.5;
          p.y += p.vy * speedFactor * 1.5;

          if (p.x < 15 || p.x > canvas.width - 15) p.vx *= -1;
          if (p.y < 15 || p.y > canvas.height - 15) p.vy *= -1;
        }

        // Draw particle sphere
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.closePath();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [temperatureK, pressureAtm, activeTab]);

  // Handler for Throw Darts (Precision & Accuracy Game)
  const handleThrowDarts = () => {
    playSound('pop');
    const newDarts = [];
    const centerX = 150;
    const centerY = 150;

    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * dartSpread;
      const x = centerX + dartBiasX + r * Math.cos(angle);
      const y = centerY + dartBiasY + r * Math.sin(angle);
      newDarts.push({ x, y });
    }
    setDarts(newDarts);
    speakText('Darts thrown! Observe the scatter and systematic displacement from the bulls-eye target.');
  };

  // Gas reaction handler
  const handleTriggerGasReaction = () => {
    if (h2Moles < 2 || o2Moles < 1) {
      playSound('error');
      speakText('Need at least 2 moles of Hydrogen and 1 mole of Oxygen for stoichiometric reaction!');
      return;
    }

    playSound('whoosh');
    setIsReacting(true);
    setReactionProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 0.05;
      if (p >= 1) {
        p = 1;
        clearInterval(interval);
        setIsReacting(false);
        playSound('sparkle');
        speakText('Reaction complete! 2 moles of H2 gas combined with 1 mole of O2 gas to produce 2 moles of H2O steam.');
      }
      setReactionProgress(p);
    }, 100);
  };

  // Solute Molar Masses
  const molarMassMap = {
    naoh: 40.0,
    nacl: 58.5,
    glucose: 180.16,
  };

  const calculatedMoles = useMemo(() => {
    return soluteMassG / molarMassMap[soluteType];
  }, [soluteMassG, soluteType]);

  const calculatedMolarity = useMemo(() => {
    const volL = solutionVolumeMl / 1000;
    return volL > 0 ? calculatedMoles / volL : 0;
  }, [calculatedMoles, solutionVolumeMl]);

  const calculatedMolality = useMemo(() => {
    return solventMassKg > 0 ? calculatedMoles / solventMassKg : 0;
  }, [calculatedMoles, solventMassKg]);

  const calculatedMassPercent = useMemo(() => {
    const totalMass = soluteMassG + solventMassKg * 1000;
    return totalMass > 0 ? (soluteMassG / totalMass) * 100 : 0;
  }, [soluteMassG, solventMassKg]);

  const calculatedMoleFractionSolute = useMemo(() => {
    const solventMoles = (solventMassKg * 1000) / 18.015; // Water
    const totalMoles = calculatedMoles + solventMoles;
    return totalMoles > 0 ? calculatedMoles / totalMoles : 0;
  }, [calculatedMoles, solventMassKg]);

  // Quiz submission handler
  const handleAnswerSubmit = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const currChallenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = index === currChallenge.correctIndex;

    // SRS & BKT Updates
    const currentBKT = bktStates[currChallenge.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [currChallenge.nodeId]: updatedBKT }));

    const srsItem = createReviewItem(currChallenge.nodeId, 'Chemistry');
    const updatedSRS = sm2Update(srsItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      playSound('success');
      setShowConfetti(true);
      setShowSparkle(true);
      setSparkleCoords({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setScore((prev) => prev + 10);
      speakText('Excellent! That answer is perfectly correct.');
      recordGameScore([...NODE_IDS], 10);
    } else {
      playSound('error');
      speakText('That is not quite right. Review the explanation below.');
    }

    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setShowConfetti(false);
    setShowSparkle(false);
    playSound('tap');
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      setShowSuccess(true);
      speakText('Congratulations! You have completed all interactive chemistry challenges.');
    }
  };

  // Temperature calculations
  const fahrenheitVal = useMemo(() => (celsiusVal * 9) / 5 + 32, [celsiusVal]);
  const kelvinVal = useMemo(() => celsiusVal + 273.15, [celsiusVal]);

  // Density calculation
  const calculatedDensity = useMemo(() => {
    return sampleVolumeCm3 > 0 ? sampleMassG / sampleVolumeCm3 : 0;
  }, [sampleMassG, sampleVolumeCm3]);

  // Overall Mastery percentage across nodes
  const overallMastery = useMemo(() => {
    const total = NODE_IDS.reduce((acc, id) => {
      const st = bktStates[id];
      return acc + (st ? st.pKnown : 0);
    }, 0);
    return Math.round((total / NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col gap-6">
      {/* Header Bar */}
      <header className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full border border-indigo-500/30">
              CBSE Class 11 Chemistry
            </span>
            <span className="text-xs text-slate-400 font-mono">Chapter 1: Basic Concepts</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
            Some Basic Concepts of Chemistry
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Explore Matter, Measurement, Gas Laws, Concentration & Indian Chemical Traditions
          </p>
        </div>

        {/* Dynamic Mastery Badge */}
        <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Mastery Level</div>
            <div className="text-xl font-black text-indigo-400">{overallMastery}%</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 flex items-center justify-center bg-indigo-950/50">
            <span className="text-lg">🧪</span>
          </div>
        </div>
      </header>

      {/* Primary Navigation Tabs */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'learn', label: '📖 Learning Modules', icon: '📚' },
          { id: 'states', label: '🧊 States & Particles Lab', icon: '⚛️' },
          { id: 'measurement', label: '🎯 Units & Accuracy', icon: '📏' },
          { id: 'gas_laws', label: '🎈 Gas Laws Simulation', icon: '💨' },
          { id: 'solutions', label: '🧪 Concentration Lab', icon: '⚗️' },
          { id: 'quiz', label: '⚔️ Adaptive Practice', icon: '🏆' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playSound('tap');
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN INTERACTIVE CONTENT AREA */}
      <main className="flex-1">
        {/* TAB 1: TEACHING MODULES (LEARN) */}
        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar Slide Selector */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Topic Curriculum</h3>
              {[
                { title: '1. Ancient Indian Chemical Heritage', node: 'c11_chem_cbse_002', icon: '🏛️' },
                { title: '2. Matter & Its Physical Classification', node: 'c11_chem_cbse_008', icon: '🧊' },
                { title: '3. SI Units, Prefixes & Precision', node: 'c11_chem_cbse_017', icon: '📏' },
                { title: '4. Laws of Chemical Combination & Gas Laws', node: 'c11_chem_cbse_032', icon: '💨' },
                { title: '5. Solution Concentration: Molarity & Molality', node: 'c11_chem_cbse_045', icon: '🧪' },
              ].map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playSound('tap');
                    setCurrentSlide(idx);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${
                    currentSlide === idx
                      ? 'bg-indigo-600/20 border border-indigo-500/50 text-indigo-300 font-semibold'
                      : 'bg-slate-950/50 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-lg">{slide.icon}</span>
                  <span className="text-sm truncate">{slide.title}</span>
                </button>
              ))}
            </div>

            {/* Slide Interactive Card */}
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-indigo-400">Ancient Indian Chemical Traditions (Rasavidya)</h2>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-indigo-300">
                      c11_chem_cbse_002 | c11_chem_cbse_004
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Ancient India had a rich tradition of chemical knowledge known as <strong>Rasayan Shastra</strong> or <strong>Rasavidya</strong>. Long before modern chemistry developed in the West, Indian scholars excelled in metallurgy, glass production, dyes, perfume extraction, and medicinal alchemy.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-amber-400 text-sm">Acharya Kanada (~600 BCE)</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Formulated the Vaisheshika philosophy proposing that all matter consists of minute, eternal, indivisible particles called <strong>Paramanu</strong>.
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-amber-400 text-sm">Nagarjuna & Rasaratnakara</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Renowned alchemist who detailed extraction of metals like gold, silver, copper, and specialized mercury preparations (Rasashastra).
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-amber-400 text-sm">Archaeological Proof</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Harappa & Mohenjodaro excavations revealed baked bricks, glazed faience pottery, gypsum cement, and advanced copper/bronze metallurgy.
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-amber-400 text-sm">Charaka Samhita & Bhasmas</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Described nano-scale metallic preparations (Bhasmas) for therapeutic medicines—an early precursor to modern nanotechnology!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-indigo-400">Classification & Nature of Matter</h2>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-indigo-300">
                      c11_chem_cbse_008 | c11_chem_cbse_011
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Matter is defined as anything that possesses mass and occupies space. Macroscopically, matter is broadly classified into <strong>Pure Substances</strong> and <strong>Mixtures</strong>.
                  </p>

                  {/* Classification SVG Tree Diagram */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 200" className="w-full max-w-lg h-auto text-xs">
                      {/* Matter Root */}
                      <rect x="200" y="10" width="100" height="30" rx="6" fill="#3b82f6" />
                      <text x="250" y="30" fill="#fff" textAnchor="middle" fontWeight="bold">MATTER</text>

                      {/* Lines */}
                      <line x1="250" y1="40" x2="130" y2="70" stroke="#64748b" strokeWidth="2" />
                      <line x1="250" y1="40" x2="370" y2="70" stroke="#64748b" strokeWidth="2" />

                      {/* Pure Substances */}
                      <rect x="70" y="70" width="120" height="30" rx="6" fill="#10b981" />
                      <text x="130" y="90" fill="#fff" textAnchor="middle" fontWeight="bold">Pure Substances</text>

                      {/* Mixtures */}
                      <rect x="310" y="70" width="120" height="30" rx="6" fill="#f59e0b" />
                      <text x="370" y="90" fill="#fff" textAnchor="middle" fontWeight="bold">Mixtures</text>

                      {/* Pure Sub Lines */}
                      <line x1="130" y1="100" x2="70" y2="130" stroke="#64748b" strokeWidth="2" />
                      <line x1="130" y1="100" x2="180" y2="130" stroke="#64748b" strokeWidth="2" />

                      {/* Elements */}
                      <rect x="20" y="130" width="100" height="30" rx="6" fill="#059669" />
                      <text x="70" y="150" fill="#fff" textAnchor="middle">Elements (Na, O₂)</text>

                      {/* Compounds */}
                      <rect x="130" y="130" width="100" height="30" rx="6" fill="#059669" />
                      <text x="180" y="150" fill="#fff" textAnchor="middle">Compounds (H₂O)</text>

                      {/* Mixture Lines */}
                      <line x1="370" y1="100" x2="310" y2="130" stroke="#64748b" strokeWidth="2" />
                      <line x1="370" y1="100" x2="430" y2="130" stroke="#64748b" strokeWidth="2" />

                      {/* Homogeneous */}
                      <rect x="260" y="130" width="100" height="30" rx="6" fill="#d97706" />
                      <text x="310" y="150" fill="#fff" textAnchor="middle">Homogeneous</text>

                      {/* Heterogeneous */}
                      <rect x="380" y="130" width="100" height="30" rx="6" fill="#d97706" />
                      <text x="430" y="150" fill="#fff" textAnchor="middle">Heterogeneous</text>
                    </svg>
                  </div>
                </motion.div>
              )}

              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-indigo-400">SI Base Quantities & Scientific Units</h2>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-indigo-300">
                      c11_chem_cbse_017 | c11_chem_cbse_018
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The International System of Units (SI) defines 7 fundamental base units. National Physical Laboratory (NPL) in New Delhi maintains SI standards in India.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-slate-300 border border-slate-800">
                      <thead className="bg-slate-800 text-indigo-300 uppercase">
                        <tr>
                          <th className="p-2 border border-slate-700">Base Quantity</th>
                          <th className="p-2 border border-slate-700">SI Unit</th>
                          <th className="p-2 border border-slate-700">Symbol</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-800 bg-slate-950/40">
                          <td className="p-2 font-medium">Length</td>
                          <td className="p-2">metre</td>
                          <td className="p-2 font-mono">m</td>
                        </tr>
                        <tr className="border-b border-slate-800 bg-slate-950/80">
                          <td className="p-2 font-medium">Mass</td>
                          <td className="p-2">kilogram</td>
                          <td className="p-2 font-mono">kg</td>
                        </tr>
                        <tr className="border-b border-slate-800 bg-slate-950/40">
                          <td className="p-2 font-medium">Time</td>
                          <td className="p-2">second</td>
                          <td className="p-2 font-mono">s</td>
                        </tr>
                        <tr className="border-b border-slate-800 bg-slate-950/80">
                          <td className="p-2 font-medium">Electric Current</td>
                          <td className="p-2">ampere</td>
                          <td className="p-2 font-mono">A</td>
                        </tr>
                        <tr className="border-b border-slate-800 bg-slate-950/40">
                          <td className="p-2 font-medium">Thermodynamic Temp</td>
                          <td className="p-2">kelvin</td>
                          <td className="p-2 font-mono">K</td>
                        </tr>
                        <tr className="border-b border-slate-800 bg-slate-950/80">
                          <td className="p-2 font-medium">Amount of Substance</td>
                          <td className="p-2">mole</td>
                          <td className="p-2 font-mono">mol</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-indigo-400">Gay Lussac's & Avogadro's Laws</h2>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-indigo-300">
                      c11_chem_cbse_032 | c11_chem_cbse_033
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-indigo-300 text-sm">Gay Lussac's Law of Gaseous Volumes</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        When gases react together, they do so in volumes which bear a simple whole-number ratio to one another and to the volume of gaseous products, provided all volumes are measured at same T & P.
                      </p>
                      <div className="mt-3 bg-slate-900 p-2 rounded text-center text-xs text-amber-300 font-mono">
                        100 mL H₂ + 50 mL O₂ ➔ 100 mL H₂O(g)
                        <br />
                        Ratio: 2 : 1 : 2
                      </div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-emerald-300 text-sm">Avogadro's Hypothesis</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Equal volumes of all gases at the same temperature and pressure contain an equal number of molecules ($V \propto n$).
                      </p>
                      <div className="mt-3 bg-slate-900 p-2 rounded text-center text-xs text-emerald-300 font-mono">
                        {'$N_A = 6.022 \\times 10^{23} \\text{ particles/mol}$'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-indigo-400">Solution Concentration Units</h2>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-indigo-300">
                      c11_chem_cbse_044 | c11_chem_cbse_045 | c11_chem_cbse_046
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-sky-400 text-sm">Molarity ({'$M$'})</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Moles of solute dissolved per Litre of solution.
                      </p>
                      <div className="mt-2 bg-slate-900 p-2 rounded text-sky-300 text-xs font-mono">
                        {'$M = \\frac{\\text{Moles of Solute}}{\\text{Volume of Solution (L)}}$'}
                      </div>
                      <p className="text-[11px] text-rose-400 mt-1">⚠️ Temperature Dependent (Volume changes with T)</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-emerald-400 text-sm">Molality ({'$m$'})</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Moles of solute dissolved per Kilogram of solvent.
                      </p>
                      <div className="mt-2 bg-slate-900 p-2 rounded text-emerald-300 text-xs font-mono">
                        {'$m = \\frac{\\text{Moles of Solute}}{\\text{Mass of Solvent (kg)}}$'}
                      </div>
                      <p className="text-[11px] text-emerald-400 mt-1">✅ Temperature Independent (Mass is invariant)</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800">
                <button
                  disabled={currentSlide === 0}
                  onClick={() => {
                    playSound('tap');
                    setCurrentSlide((prev) => Math.max(0, prev - 1));
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-xs font-semibold text-slate-300 transition-all"
                >
                  ← Previous Module
                </button>

                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentSlide === i ? 'bg-indigo-500 w-6' : 'bg-slate-700'
                      } transition-all duration-300`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentSlide === 4}
                  onClick={() => {
                    playSound('tap');
                    setCurrentSlide((prev) => Math.min(4, prev + 1));
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl text-xs font-semibold text-white transition-all shadow-lg shadow-indigo-600/30"
                >
                  Next Module →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STATES OF MATTER CANVAS LAB */}
        {activeTab === 'states' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <span>⚛️ Particle Thermal Motion Simulation</span>
                </h3>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-mono">
                  State: {temperatureK < 273 ? 'SOLID ❄️' : temperatureK < 373 ? 'LIQUID 💧' : 'GAS 💨'}
                </span>
              </div>

              <canvas
                ref={canvasRef}
                width={480}
                height={320}
                className="bg-slate-950 rounded-xl border border-slate-800 shadow-inner w-full max-w-[480px]"
              />

              <p className="text-xs text-slate-400 mt-3 text-center">
                Observe how particle kinetic energy and freedom of motion increase with temperature transition.
              </p>
            </div>

            {/* Controls Panel */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-200 text-sm mb-4 border-b border-slate-800 pb-2">
                  Thermodynamic Controls
                </h4>

                {/* Temperature Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Temperature (T):</span>
                    <span className="text-indigo-400 font-bold">{temperatureK} K ({temperatureK - 273} °C)</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={500}
                    step={5}
                    value={temperatureK}
                    onChange={(e) => {
                      playSound('tap');
                      setTemperatureK(Number(e.target.value));
                    }}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>100 K (Ice/Solid)</span>
                    <span>273 K (Melting)</span>
                    <span>373 K (Boiling)</span>
                    <span>500 K (Superheated Gas)</span>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-6">
                  <button
                    onClick={() => {
                      playSound('tap');
                      setTemperatureK(200);
                    }}
                    className="p-2 bg-blue-950/60 border border-blue-800/60 hover:bg-blue-900/60 rounded-xl text-xs font-medium text-blue-300"
                  >
                    Solid (200 K)
                  </button>
                  <button
                    onClick={() => {
                      playSound('tap');
                      setTemperatureK(320);
                    }}
                    className="p-2 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 rounded-xl text-xs font-medium text-emerald-300"
                  >
                    Liquid (320 K)
                  </button>
                  <button
                    onClick={() => {
                      playSound('tap');
                      setTemperatureK(420);
                    }}
                    className="p-2 bg-rose-950/60 border border-rose-800/60 hover:bg-rose-900/60 rounded-xl text-xs font-medium text-rose-300"
                  >
                    Gas (420 K)
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-amber-400">NCERT Key Point (c11_chem_cbse_010):</div>
                <p>
                  • <strong>Solid:</strong> Orderly packed particles with minimal freedom of motion.
                  <br />• <strong>Liquid:</strong> Particles stay close but flow freely around each other.
                  <br />• <strong>Gas:</strong> Extremely far apart with rapid random straight-line motion.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UNITS, MEASUREMENT & ACCURACY LAB */}
        {activeTab === 'measurement' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dartboard Game for Precision & Accuracy */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col items-center shadow-xl">
              <h3 className="font-bold text-white text-base mb-2">Precision vs Accuracy Dartboard</h3>
              <p className="text-xs text-slate-400 mb-4 text-center">
                Accuracy = Closeness to true target center. Precision = Reproducibility among trial throws.
              </p>

              {/* SVG Dartboard Target */}
              <div className="relative">
                <svg viewBox="0 0 300 300" className="w-64 h-64 border border-slate-800 rounded-full shadow-2xl">
                  {/* Outer Rings */}
                  <circle cx="150" cy="150" r="140" fill="#1e293b" stroke="#334155" strokeWidth="3" />
                  <circle cx="150" cy="150" r="105" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <circle cx="150" cy="150" r="70" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <circle cx="150" cy="150" r="35" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
                  <circle cx="150" cy="150" r="10" fill="#f59e0b" />

                  {/* Darts thrown */}
                  {darts.map((d, idx) => (
                    <circle key={idx} cx={d.x} cy={d.y} r="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                  ))}
                </svg>
              </div>

              <div className="w-full space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Scatter / Spread (Imprecision):</label>
                    <input
                      type="range"
                      min={5}
                      max={60}
                      value={dartSpread}
                      onChange={(e) => setDartSpread(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Systematic Bias Shift (Inaccuracy):</label>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      value={dartBiasX}
                      onChange={(e) => {
                        setDartBiasX(Number(e.target.value));
                        setDartBiasY(Number(e.target.value));
                      }}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleThrowDarts}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/30"
                >
                  🎯 Throw 5 Measurement Darts
                </button>
              </div>
            </div>

            {/* Temperature & Density Calculators */}
            <div className="space-y-6">
              {/* Temperature Scale Converter */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
                <h3 className="font-bold text-white text-base">Thermometric Scale Conversions</h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Celsius (°C):</span>
                    <span className="text-indigo-400 font-bold font-mono">{celsiusVal} °C</span>
                  </div>
                  <input
                    type="range"
                    min={-50}
                    max={150}
                    value={celsiusVal}
                    onChange={(e) => setCelsiusVal(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-[11px] text-slate-400">Fahrenheit (°F)</div>
                    <div className="text-lg font-bold font-mono text-amber-400">{fahrenheitVal.toFixed(2)} °F</div>
                    <div className="text-[10px] text-slate-500 mt-1">°F = (9/5 × °C) + 32</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-[11px] text-slate-400">SI Kelvin (K)</div>
                    <div className="text-lg font-bold font-mono text-emerald-400">{kelvinVal.toFixed(2)} K</div>
                    <div className="text-[10px] text-slate-500 mt-1">K = °C + 273.15</div>
                  </div>
                </div>
              </div>

              {/* Density Simulator */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
                <h3 className="font-bold text-white text-base">Density Calculation ($d = m/V$)</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Mass ($m$): {sampleMassG} g</label>
                    <input
                      type="range"
                      min={10}
                      max={200}
                      value={sampleMassG}
                      onChange={(e) => setSampleMassG(Number(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      Volume ($V$): {sampleVolumeCm3} cm³
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      value={sampleVolumeCm3}
                      onChange={(e) => setSampleVolumeCm3(Number(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-300">Calculated Density ($d$):</span>
                  <span className="text-xl font-black font-mono text-sky-400">{calculatedDensity.toFixed(2)} g/cm³</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GAS LAWS SIMULATION */}
        {activeTab === 'gas_laws' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col items-center shadow-2xl">
              <h3 className="font-bold text-white text-lg mb-2">
                Gaseous Volume Combination Chamber
              </h3>
              <p className="text-xs text-slate-400 mb-4 text-center">
                Visualizing Gay Lussac's Law of Combining Volumes & Avogadro's Hypothesis
              </p>

              {/* Interactive Reaction SVG Vessel */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 w-full max-w-md flex flex-col items-center">
                <svg viewBox="0 0 400 220" className="w-full h-auto">
                  {/* Reaction Box */}
                  <rect x="20" y="20" width="360" height="180" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="3" />

                  {/* Reactants side */}
                  {!isReacting && reactionProgress === 0 && (
                    <g>
                      {/* Hydrogen Molecules (H2) */}
                      {Array.from({ length: h2Moles * 2 }).map((_, i) => (
                        <g key={`h_${i}`} transform={`translate(${50 + (i % 4) * 35}, ${50 + Math.floor(i / 4) * 35})`}>
                          <circle cx="0" cy="0" r="8" fill="#3b82f6" />
                          <circle cx="10" cy="0" r="8" fill="#3b82f6" />
                          <text x="5" y="-12" fill="#93c5fd" fontSize="10" textAnchor="middle">H₂</text>
                        </g>
                      ))}

                      {/* Oxygen Molecules (O2) */}
                      {Array.from({ length: o2Moles * 2 }).map((_, i) => (
                        <g key={`o_${i}`} transform={`translate(${230 + (i % 3) * 45}, ${60 + Math.floor(i / 3) * 45})`}>
                          <circle cx="0" cy="0" r="12" fill="#ef4444" />
                          <circle cx="14" cy="0" r="12" fill="#ef4444" />
                          <text x="7" y="-16" fill="#fca5a5" fontSize="10" textAnchor="middle">O₂</text>
                        </g>
                      ))}
                    </g>
                  )}

                  {/* Products Water Molecules (H2O) */}
                  {reactionProgress > 0 && (
                    <g>
                      {Array.from({ length: h2Moles * 2 }).map((_, i) => (
                        <g
                          key={`w_${i}`}
                          transform={`translate(${80 + (i % 4) * 70}, ${60 + Math.floor(i / 4) * 60})`}
                        >
                          <circle cx="0" cy="0" r="12" fill="#ef4444" />
                          <circle cx="-10" cy="10" r="7" fill="#3b82f6" />
                          <circle cx="10" cy="10" r="7" fill="#3b82f6" />
                          <text x="0" y="-16" fill="#67e8f9" fontSize="10" textAnchor="middle">H₂O</text>
                        </g>
                      ))}
                    </g>
                  )}
                </svg>

                <button
                  onClick={handleTriggerGasReaction}
                  disabled={isReacting}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/30"
                >
                  {isReacting ? '💥 Reacting...' : '🔥 Spark Chemical Reaction'}
                </button>
              </div>
            </div>

            {/* Stoichiometric Controls */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-white text-sm mb-4 border-b border-slate-800 pb-2">
                  Gas Reactant Quantities
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Hydrogen Gas ($H_2$): {h2Moles} Vol (moles)</label>
                    <input
                      type="range"
                      min={2}
                      max={6}
                      step={2}
                      value={h2Moles}
                      onChange={(e) => setH2Moles(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Oxygen Gas ($O_2$): {o2Moles} Vol (moles)</label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={1}
                      value={o2Moles}
                      onChange={(e) => setO2Moles(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>
                </div>

                <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-amber-400">Gay Lussac Volumetric Ratio:</div>
                  <div className="font-mono text-center text-indigo-300">
                    {h2Moles * 50} mL $H_2$ + {o2Moles * 50} mL $O_2$ ➔ {h2Moles * 50} mL $H_2O(g)$
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Ratio = <strong>{h2Moles} : {o2Moles} : {h2Moles}</strong> (Simple integer volumes at constant T & P)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SOLUTION CONCENTRATION LAB */}
        {activeTab === 'solutions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-2xl flex flex-col items-center">
              <h3 className="font-bold text-white text-lg mb-2">Volumetric Solution Preparation Lab</h3>
              <p className="text-xs text-slate-400 mb-6 text-center">
                Prepare aqueous solutions and observe real-time concentration metrics.
              </p>

              {/* Volumetric Flask SVG */}
              <svg viewBox="0 0 200 240" className="w-48 h-auto">
                {/* Flask Body */}
                <path
                  d="M80,20 L120,20 L120,80 L170,180 A20,20 0 0,1 150,210 L50,210 A20,20 0 0,1 30,180 L80,80 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="4"
                />

                {/* Solution Fluid Level */}
                <path
                  d={`M${55 - (solutionVolumeMl / 1000) * 15},${200 - (solutionVolumeMl / 1000) * 90} 
                     L${145 + (solutionVolumeMl / 1000) * 15},${200 - (solutionVolumeMl / 1000) * 90} 
                     L150,205 A15,15 0 0,1 140,210 L60,210 A15,15 0 0,1 50,205 Z`}
                  fill={soluteType === 'naoh' ? '#0284c7' : soluteType === 'nacl' ? '#0d9488' : '#d97706'}
                  opacity="0.75"
                />

                {/* Meniscus Line */}
                <line x1="75" y1="110" x2="125" y2="110" stroke="#f59e0b" strokeDasharray="3,3" strokeWidth="2" />
                <text x="130" y="113" fill="#f59e0b" fontSize="9" fontWeight="bold">250 mL Mark</text>
              </svg>

              {/* Real-time Concentration Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-6">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Molarity ($M$)</div>
                  <div className="text-base font-bold text-sky-400 font-mono mt-1">{calculatedMolarity.toFixed(3)} M</div>
                  <div className="text-[9px] text-slate-500">mol / L soln</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Molality ($m$)</div>
                  <div className="text-base font-bold text-emerald-400 font-mono mt-1">{calculatedMolality.toFixed(3)} m</div>
                  <div className="text-[9px] text-slate-500">mol / kg solvent</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Mass Percent</div>
                  <div className="text-base font-bold text-amber-400 font-mono mt-1">{calculatedMassPercent.toFixed(2)} %</div>
                  <div className="text-[9px] text-slate-500">(w/w)</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Mole Fraction ({'$\\chi$'})</div>
                  <div className="text-base font-bold text-indigo-400 font-mono mt-1">{calculatedMoleFractionSolute.toFixed(4)}</div>
                  <div className="text-[9px] text-slate-500">Solute ratio</div>
                </div>
              </div>
            </div>

            {/* Preparation Controls */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
              <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Solute & Solvent Parameters</h4>

              {/* Solute selection */}
              <div>
                <label className="text-xs text-slate-400 block mb-2">Select Solute Species:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'naoh', name: 'NaOH (40 g/mol)' },
                    { id: 'nacl', name: 'NaCl (58.5 g/mol)' },
                    { id: 'glucose', name: 'Glucose (180.16 g/mol)' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        playSound('tap');
                        setSoluteType(s.id as any);
                      }}
                      className={`p-2 rounded-xl text-[11px] font-medium border transition-all ${
                        soluteType === s.id
                          ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Solute Mass */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Solute Mass ($w$):</span>
                  <span className="text-indigo-400 font-mono font-bold">{soluteMassG} g</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={soluteMassG}
                  onChange={(e) => setSoluteMassG(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Solution Volume */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Solution Volume ($V$):</span>
                  <span className="text-indigo-400 font-mono font-bold">{solutionVolumeMl} mL</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={50}
                  value={solutionVolumeMl}
                  onChange={(e) => setSolutionVolumeMl(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Solvent Mass */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Solvent Mass ({'$W_{solvent}$'}):</span>
                  <span className="text-indigo-400 font-mono font-bold">{solventMassKg} kg</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  value={solventMassKg}
                  onChange={(e) => setSolventMassKg(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ADAPTIVE QUIZ & MASTERY PRACTICE */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
            {!showSuccess ? (
              <div>
                {/* Progress Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full">
                    Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Score: <strong className="text-indigo-400">{score} pts</strong>
                  </span>
                </div>

                {/* Challenge Box */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-800 text-amber-400 text-[10px] font-bold rounded uppercase">
                      {CHALLENGES[currentChallengeIndex].difficulty}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {CHALLENGES[currentChallengeIndex].title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {CHALLENGES[currentChallengeIndex].question}
                  </p>

                  {/* Options List */}
                  <div className="space-y-2.5 pt-2">
                    {CHALLENGES[currentChallengeIndex].options.map((option, idx) => {
                      let btnStyle = 'bg-slate-950 border-slate-800 hover:border-indigo-500/50 text-slate-300';
                      if (selectedAnswer !== null) {
                        if (idx === CHALLENGES[currentChallengeIndex].correctIndex) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                        } else if (idx === selectedAnswer) {
                          btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                        } else {
                          btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSubmit(idx)}
                          disabled={selectedAnswer !== null}
                          className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          <span className="text-slate-500 text-[10px]">Option {String.fromCharCode(65 + idx)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hint and Explanation */}
                <div className="mt-6 space-y-3">
                  {!showExplanation && (
                    <button
                      onClick={() => setShowHint((prev) => !prev)}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      💡 {showHint ? 'Hide Hint' : 'Need a Hint?'}
                    </button>
                  )}

      <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex].hint} />

                  {showExplanation && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                      <div className="font-bold text-emerald-400">Explanation & NCERT Concept:</div>
                      <p>{CHALLENGES[currentChallengeIndex].explanation}</p>
                    </motion.div>
                  )}
                </div>

                {/* Next Button */}
                {selectedAnswer !== null && (
                  <button
                    onClick={handleNextChallenge}
                    className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/30"
                  >
                    Continue to Next Challenge →
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="text-5xl">🎉</div>
                <h2 className="text-2xl font-extrabold text-white">Quiz Completed Successfully!</h2>
                <p className="text-slate-400 text-sm">
                  You scored <strong className="text-indigo-400">{score} points</strong> and reinforced your knowledge of Chapter 1 Chemistry concepts!
                </p>

                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setCurrentChallengeIndex(0);
                    setSelectedAnswer(null);
                    setScore(0);
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30"
                >
                  Restart Quiz Practice
                </button>
              </div>
            )}
          </div>
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

      {/* Floating Sparkles & Confetti Feedback Effects */}
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />
      <SuccessBanner show={showSuccess} text="All Basic Concepts Challenges Completed!" />
    </div>
  );
};

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 11 Chemistry Foundations Lab',
  subtitle: 'Master the Mole Concept, Stoichiometry, and Concentration Units',
  description: 'Step into a virtual chemistry lab where you calculate moles, prepare solutions of specific molarity, and solve stoichiometry problems with limiting reagents.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Mole Puzzle',
  question: 'One mole of any substance contains the same number of particles (Avogadro number, 6.022×10²³). Do 1 mole of H₂ gas and 1 mole of O₂ gas have the same mass?',
  options: [
    'Yes, because they have the same number of molecules',
    'No, because 1 mole of H₂ = 2g and 1 mole of O₂ = 32g. Mass depends on molecular weight, not number of particles',
    'Yes, because both are gases at STP',
    'No, because H₂ has 2 atoms and O₂ has 2 atoms but different volumes'
],
  correctIndex: 1,
  explanation: 'The mole concept relates to the NUMBER of particles (6.022×10²³), not mass. Mass of 1 mole = molar mass. H₂ has molar mass 2 g/mol, O₂ has 32 g/mol. So 1 mole of H₂ weighs 2g and 1 mole of O₂ weighs 32g, despite having the same number of molecules.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "mole",
    "name": "Mole Concept Lab",
    "description": "Calculate moles from mass and vice versa using molar mass."
  },
  {
    "id": "concentration",
    "name": "Concentration Station",
    "description": "Prepare solutions with specific molarity, molality, and mole fraction."
  },
  {
    "id": "stoichiometry",
    "name": "Stoichiometry Lab",
    "description": "Balance equations and calculate reactant/product quantities."
  },
  {
    "id": "limiting",
    "name": "Limiting Reagent Lab",
    "description": "Identify limiting reagents and calculate excess reactant."
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
    "title": "Applying Molar Volume of 22.4 L to Liquids and Solids",
    "description": "Students frequently believe that one mole of any substance, regardless of its physical state, occupies 22.4 liters at STP.",
    "correction": "The molar volume of 22.4 L (or 22.7 L under standard pressure of 1 bar) applies strictly to gases at STP. For solids and liquids, volume must be calculated using mass and density. For example, 1 mole of liquid water (18 g) occupies approximately 18 mL at STP, not 22.4 L."
  },
  {
    "id": "misc_2",
    "title": "Identifying Limiting Reagent Solely by the Lowest Molar Quantity",
    "description": "Students assume that the reactant present in the smallest number of moles at the start is automatically the limiting reagent.",
    "correction": "The limiting reagent depends on both the available moles and the stoichiometric coefficients in the balanced chemical equation. To identify it correctly, divide the given moles of each reactant by its stoichiometric coefficient. The reactant with the smallest resulting ratio is the limiting reagent."
  },
  {
    "id": "misc_3",
    "title": "Equating Volume of Solvent with Total Volume of Solution in Molarity",
    "description": "Students think a 1 M solution is prepared by adding 1 mole of solute to 1 liter of solvent.",
    "correction": "Molarity is defined as moles of solute divided by the total volume of the *solution* in liters, not the solvent. Dissolving a solute changes the overall volume, so 1 mole of solute must be dissolved in less solvent and then diluted until the final solution volume reaches 1 L."
  },
  {
    "id": "misc_4",
    "title": "Assuming Molality Is Temperature Dependent Like Molarity",
    "description": "Students incorrectly assume that both molarity and molality values change when the temperature of a solution varies.",
    "correction": "Molarity depends on solution volume, which expands or contracts with temperature changes, making molarity temperature-dependent. Molality depends on the mass of solvent in kilograms. Since mass does not change with temperature, molality remains strictly temperature-independent."
  },
  {
    "id": "misc_5",
    "title": "Assuming Empirical Formula Must Always Differ from Molecular Formula",
    "description": "Students believe that the empirical formula and molecular formula of a chemical compound can never be the same.",
    "correction": "The molecular formula is an integral multiple ($n$) of the empirical formula, where $n = \\text{Molecular Mass} / \\text{Empirical Formula Mass}$. When $n = 1$, the empirical formula and molecular formula are identical, as seen in compounds like $\\text{H}_2\\text{O}$, $\\text{NH}_3$, and $\\text{CO}_2$."
  }
];


export default C11_ChemistrySomeBasicConceptsofChemistryCBSESim;