'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';

// Node IDs for CBSE Class 12 Chemistry - Chapter: Solutions
const NODE_IDS = {
  MASS_PERCENT: 'c12_chem_cbse_302',
  VOL_PERCENT: 'c12_chem_cbse_303',
  MASS_VOL_PERCENT: 'c12_chem_cbse_304',
  PPM: 'c12_chem_cbse_305',
  MOLE_FRACTION: 'c12_chem_cbse_306',
  MOLARITY: 'c12_chem_cbse_307',
  MOLALITY: 'c12_chem_cbse_308',
  TEMP_DEPENDENCE: 'c12_chem_cbse_309',
  DYNAMIC_EQUILIBRIUM: 'c12_chem_cbse_311',
  PRESSURE_SOLIDS: 'c12_chem_cbse_313',
  GAS_SOLUBILITY: 'c12_chem_cbse_314',
  HENRYS_LAW: 'c12_chem_cbse_315',
  HENRY_CONSTANT_TEMP: 'c12_chem_cbse_316',
  TEMP_GAS_SOLUBILITY: 'c12_chem_cbse_317',
  DALTON_RAOULT: 'c12_chem_cbse_320',
  VAPOUR_PRESSURE_LOWERING: 'c12_chem_cbse_321',
  ISOTONIC_HYPER_HYPO: 'c12_chem_cbse_332',
  REVERSE_OSMOSIS: 'c12_chem_cbse_333',
  MODIFIED_COLLIGATIVE: 'c12_chem_cbse_267'
};

// Types
type ActiveTab = 'sandbox' | 'gas_henry' | 'vapour_raoult' | 'osmosis_ro' | 'colligative' | 'challenges';

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  calcFormula?: string;
}

export function C12_ChemistrySolutionsCBSESim() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<ActiveTab>('sandbox');
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // BKT and SRS tracking state
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    Object.values(NODE_IDS).forEach(nodeId => {
      initial[nodeId] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    Object.values(NODE_IDS).forEach(nodeId => {
      initial[nodeId] = createReviewItem(nodeId, 'Chemistry');
    });
    return initial;
  });

  // Interactive Sandbox State 1: Concentration Units Visualizer
  const [soluteMass, setSoluteMass] = useState<number>(10); // grams
  const [solventMass, setSolventMass] = useState<number>(90); // grams
  const [soluteMolarMass, setSoluteMolarMass] = useState<number>(180); // g/mol (Glucose)
  const [solutionTemp, setSolutionTemp] = useState<number>(25); // °C
  const [soluteType, setSoluteType] = useState<'glucose' | 'urea' | 'nacl' | 'antifreeze'>('glucose');

  // Interactive Sandbox State 2: Gas Solubility & Henry's Law
  const [gasPressure, setGasPressure] = useState<number>(1.0); // atm
  const [gasTemp, setGasTemp] = useState<number>(20); // °C
  const [selectedGas, setSelectedGas] = useState<'N2' | 'O2' | 'CO2'>('O2');

  // Interactive Sandbox State 3: Vapour Pressure & Raoult's Law
  const [moleFractionSolute, setMoleFractionSolute] = useState<number>(0.2);
  const [pureVapourPressureA, setPureVapourPressureA] = useState<number>(100); // kPa
  const [pureVapourPressureB, setPureVapourPressureB] = useState<number>(40); // kPa
  const [isVolatileSolute, setIsVolatileSolute] = useState<boolean>(false);

  // Interactive Sandbox State 4: Osmosis & Reverse Osmosis
  const [cellOsmoticState, setCellOsmoticState] = useState<'isotonic' | 'hypotonic' | 'hypertonic'>('isotonic');
  const [roAppliedPressure, setRoAppliedPressure] = useState<number>(15); // bar
  const [roOsmoticPressure, setRoOsmoticPressure] = useState<number>(25); // bar (Seawater ~25-30 bar)

  // Interactive Sandbox State 5: Colligative Properties & van 't Hoff Factor
  const [vanTHoffI, setVanTHoffI] = useState<number>(1.0);
  const [molalityVal, setMolalityVal] = useState<number>(1.0); // mol/kg
  const [colligativeType, setColligativeType] = useState<'boiling' | 'freezing' | 'osmotic'>('boiling');

  // Canvas Refs
  const solutionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gasCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const osmosisCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // CBES Challenges List
  const challenges: Challenge[] = useMemo(() => [
    {
      id: 'c1',
      nodeId: NODE_IDS.MASS_PERCENT,
      title: 'Mass Percentage Calculation (w/w)',
      description: 'Understanding concentration expressed as mass of solute per total mass of solution.',
      question: 'If 10 g of Glucose is dissolved in 90 g of Water, what is the mass percentage (w/w) of glucose in solution?',
      options: ['10%', '11.1%', '9%', '100%'],
      correctIndex: 0,
      explanation: 'Mass % = (Mass of Solute / Total Mass of Solution) × 100 = (10 g / (10 g + 90 g)) × 100 = 10%.',
      hint: 'Remember: Total mass = Mass of solute + Mass of solvent!',
      difficulty: 'easy'
    },
    {
      id: 'c2',
      nodeId: NODE_IDS.VOL_PERCENT,
      title: 'Volume Percentage & Antifreeze',
      description: 'Applying V/V concentration in liquid-liquid mixtures.',
      question: 'A 35% (v/v) solution of ethylene glycol in water is used as an antifreeze in car engines. How much ethylene glycol is present in 500 mL of this solution?',
      options: ['175 mL', '350 mL', '150 mL', '200 mL'],
      correctIndex: 0,
      explanation: 'Volume of Solute = (35 / 100) × 500 mL = 175 mL of ethylene glycol.',
      hint: 'Multiply the volume percentage by the total solution volume.',
      difficulty: 'easy'
    },
    {
      id: 'c3',
      nodeId: NODE_IDS.MOLE_FRACTION,
      title: 'Mole Fraction of Binary Mixture',
      description: 'Calculating x_A and verifying sum of mole fractions equals 1.',
      question: 'Calculate the mole fraction of ethylene glycol (C₂H₆O₂, molar mass 62 g/mol) in a solution containing 20% C₂H₆O₂ by mass in water (18 g/mol).',
      options: ['0.068', '0.932', '0.200', '0.125'],
      correctIndex: 0,
      explanation: 'In 100 g solution: 20 g glycol = 20/62 = 0.322 mol. 80 g water = 80/18 = 4.444 mol. x_glycol = 0.322 / (0.322 + 4.444) = 0.068.',
      hint: 'Assume 100 g total solution mass, convert masses to moles, then divide solute moles by total moles.',
      difficulty: 'medium'
    },
    {
      id: 'c4',
      nodeId: NODE_IDS.MOLARITY,
      title: 'Molarity Calculation (M)',
      description: 'Moles of solute per liter of final solution volume.',
      question: 'Calculate the molarity of a solution containing 5 g of NaOH (molar mass 40 g/mol) in 450 mL of solution.',
      options: ['0.278 M', '0.125 M', '0.500 M', '0.011 M'],
      correctIndex: 0,
      explanation: 'Moles NaOH = 5 / 40 = 0.125 mol. Volume = 450 / 1000 = 0.45 L. Molarity = 0.125 / 0.45 = 0.278 M.',
      hint: 'Molarity M = Moles of solute / Solution volume in Liters.',
      difficulty: 'medium'
    },
    {
      id: 'c5',
      nodeId: NODE_IDS.TEMP_DEPENDENCE,
      title: 'Temperature Dependence of Concentrations',
      description: 'Identifying mass-based vs volume-based concentration units.',
      question: 'Which of the following concentration units changes when the temperature of the solution is increased?',
      options: ['Molarity (M)', 'Molality (m)', 'Mole fraction (x)', 'Mass percentage (w/w)'],
      correctIndex: 0,
      explanation: 'Molarity depends on solution volume, which expands with temperature. Mass percentage, molality, and mole fraction depend only on mass and are temperature-independent.',
      hint: 'Volume changes with temperature due to thermal expansion, but mass remains constant.',
      difficulty: 'easy'
    },
    {
      id: 'c6',
      nodeId: NODE_IDS.HENRYS_LAW,
      title: "Henry's Law & Gas Solubility",
      description: 'Relating partial gas pressure above solution to its mole fraction.',
      question: "According to Henry's Law p = K_H · x, if gas A has a higher K_H value than gas B at the same temperature and pressure, which gas is more soluble in water?",
      options: ['Gas B', 'Gas A', 'Both have equal solubility', 'Solubility depends on mass only'],
      correctIndex: 0,
      explanation: 'From p = K_H · x, x = p / K_H. A higher K_H value means a smaller mole fraction x in solution, hence LOWER solubility. Thus Gas B is MORE soluble.',
      hint: 'Mole fraction x is inversely proportional to Henry\'s constant K_H for a given pressure.',
      difficulty: 'medium'
    },
    {
      id: 'c7',
      nodeId: NODE_IDS.TEMP_GAS_SOLUBILITY,
      title: 'Aquatic Life & Gas Solubility',
      description: 'Explaining why cold water holds more dissolved oxygen.',
      question: 'Why are aquatic species (like fish) more comfortable in cold water than in warm water?',
      options: [
        'Dissolution of oxygen in water is exothermic; solubility increases as temperature decreases.',
        'Cold water has higher density which pushes oxygen in.',
        'Gas solubility increases with rising temperature according to Le Chatelier.',
        'Henry\'s constant K_H decreases at higher temperature.'
      ],
      correctIndex: 0,
      explanation: 'Gas dissolution is exothermic (Gas + Liquid ⇌ Solution + Heat). Lowering temperature shifts equilibrium forward, increasing dissolved O₂ available for fish.',
      hint: 'Dissolving gas into liquid liberates heat (exothermic). Think Le Chatelier\'s Principle.',
      difficulty: 'medium'
    },
    {
      id: 'c8',
      nodeId: NODE_IDS.DALTON_RAOULT,
      title: "Vapour Phase Composition (Dalton + Raoult)",
      description: 'Calculating vapour phase mole fraction y_A.',
      question: 'In an ideal solution of liquids A and B, p_A = 60 kPa and p_B = 40 kPa. What is the mole fraction of component A in the vapour phase (y_A)?',
      options: ['0.60', '0.40', '0.50', '0.24'],
      correctIndex: 0,
      explanation: 'Total vapour pressure p_total = p_A + p_B = 60 + 40 = 100 kPa. Vapor mole fraction y_A = p_A / p_total = 60 / 100 = 0.60.',
      hint: 'Dalton\'s law: y_A = p_A / p_total.',
      difficulty: 'medium'
    },
    {
      id: 'c9',
      nodeId: NODE_IDS.ISOTONIC_HYPER_HYPO,
      title: 'Red Blood Cells in Saline',
      description: 'Understanding isotonic (0.9% NaCl), hypertonic, and hypotonic solutions.',
      question: 'What happens to human red blood cells when placed in a 1.5% NaCl solution (hypertonic compared to 0.9% saline plasma)?',
      options: [
        'Cells shrink (crenation) because water flows out of the cell.',
        'Cells swell and burst (hemolysis) because water enters.',
        'Cells remain unaffected because membranes are impermeable to water.',
        'Cells duplicate rapidly due to salt stimulation.'
      ],
      correctIndex: 0,
      explanation: 'A 1.5% NaCl solution is hypertonic (>0.9% NaCl). Water moves out of the red blood cell by osmosis into the higher osmotic pressure solution, causing the cell to shrink.',
      hint: 'Water moves from lower osmotic pressure (inside cell) to higher osmotic pressure (outside).',
      difficulty: 'medium'
    },
    {
      id: 'c10',
      nodeId: NODE_IDS.REVERSE_OSMOSIS,
      title: 'Desalination by Reverse Osmosis',
      description: 'Mechanics of forcing pure water out of seawater across semi-permeable membrane.',
      question: 'In desalination of seawater by Reverse Osmosis (RO), which condition must be fulfilled?',
      options: [
        'Applied pressure on seawater side must be GREATER than its osmotic pressure.',
        'Applied pressure on seawater side must be LESS than its osmotic pressure.',
        'Temperature must be raised above 100°C.',
        'Solute particles are pushed across the membrane leaving pure water behind.'
      ],
      correctIndex: 0,
      explanation: 'Applying pressure greater than the osmotic pressure on the solution side reverses natural osmosis, forcing pure solvent (water) to flow out through the membrane.',
      hint: 'Reverse osmosis overcomes normal osmotic pressure by pushing water backwards out of solution.',
      difficulty: 'medium'
    },
    {
      id: 'c11',
      nodeId: NODE_IDS.MODIFIED_COLLIGATIVE,
      title: "van 't Hoff Factor & Dissociation",
      description: 'Modified colligative property equations incorporating factor i.',
      question: 'What is the van \'t Hoff factor (i) for a completely dissociated aqueous solution of Potassium Sulphate (K₂SO₄)?',
      options: ['3', '2', '1', '4'],
      correctIndex: 0,
      explanation: 'K₂SO₄ dissociates into 2 K⁺ ions and 1 SO₄²⁻ ion = 3 total ions per formula unit. For complete dissociation, i = 3.',
      hint: 'Count the total number of ions formed per molecule when K₂SO₄ dissolves in water.',
      difficulty: 'hard'
    }
  ], []);

  // Voice narration helper
  const speakText = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  // Handler for tab changes
  const handleTabChange = (tab: ActiveTab) => {
    audioManager.play('tap');
    setActiveTab(tab);
    if (tab === 'sandbox') speakText('Concentration units visualizer. Adjust solute mass, volume, and temperature to observe molarity and molality changes.');
    if (tab === 'gas_henry') speakText("Gas solubility and Henry's law simulation. Observe pressure and temperature effects on dissolved gas molecules.");
    if (tab === 'vapour_raoult') speakText("Vapour pressure and Raoult's law. Explore binary mixtures and vapour phase mole fraction.");
    if (tab === 'osmosis_ro') speakText('Osmosis, red blood cell behavior, and reverse osmosis water purification.');
    if (tab === 'colligative') speakText("Colligative properties and van 't Hoff factor i.");
    if (tab === 'challenges') speakText('CBSE Class 12 Solutions challenge laboratory. Test your conceptual mastery.');
  };

  // Canvas Animation 1: Concentration Solution Particle Dynamics
  useEffect(() => {
    if (activeTab !== 'sandbox' || !solutionCanvasRef.current) return;
    const canvas = solutionCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string; isSolute: boolean }> = [];

    // Calculated concentration metrics
    const totalMass = soluteMass + solventMass;
    const massPct = (soluteMass / totalMass) * 100;
    const molesSolute = soluteMass / soluteMolarMass;
    // Assume liquid density ~ 1.0 g/mL + temperature expansion factor
    const tempExpansionFactor = 1.0 + (solutionTemp - 20) * 0.0004;
    const solutionVolumeL = (totalMass / 1000) * tempExpansionFactor;
    const molarity = molesSolute / solutionVolumeL;
    const molality = molesSolute / (solventMass / 1000);

    // Re-initialize particles based on solute count
    const numSolute = Math.min(80, Math.max(5, Math.floor(soluteMass * 1.2)));
    const numWater = 60;

    particles = [];
    for (let i = 0; i < numWater; i++) {
      particles.push({
        x: Math.random() * (canvas.width - 20) + 10,
        y: canvas.height - 20 - Math.random() * (canvas.height * 0.65),
        vx: (Math.random() - 0.5) * (1 + solutionTemp / 30),
        vy: (Math.random() - 0.5) * (1 + solutionTemp / 30),
        radius: 3.5,
        color: '#3b82f6', // Water blue
        isSolute: false
      });
    }

    const soluteColorMap = {
      glucose: '#f59e0b',
      urea: '#10b981',
      nacl: '#ef4444',
      antifreeze: '#8b5cf6'
    };

    for (let i = 0; i < numSolute; i++) {
      particles.push({
        x: Math.random() * (canvas.width - 20) + 10,
        y: canvas.height - 20 - Math.random() * (canvas.height * 0.65),
        vx: (Math.random() - 0.5) * (0.8 + solutionTemp / 40),
        vy: (Math.random() - 0.5) * (0.8 + solutionTemp / 40),
        radius: soluteType === 'glucose' ? 6 : soluteType === 'nacl' ? 4 : 5,
        color: soluteColorMap[soluteType],
        isSolute: true
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Beaker container drawing
      const liquidHeight = Math.min(canvas.height - 40, (totalMass / 120) * 180 * tempExpansionFactor);
      const beakerBottom = canvas.height - 20;
      const beakerTop = beakerBottom - liquidHeight;

      // Draw Beaker Glass Outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(30, 20);
      ctx.lineTo(30, beakerBottom);
      ctx.lineTo(canvas.width - 30, beakerBottom);
      ctx.lineTo(canvas.width - 30, 20);
      ctx.stroke();

      // Liquid Fill Gradient
      const fillGradient = ctx.createLinearGradient(0, beakerTop, 0, beakerBottom);
      fillGradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
      fillGradient.addColorStop(1, 'rgba(29, 78, 216, 0.4)');
      ctx.fillStyle = fillGradient;
      ctx.fillRect(32, beakerTop, canvas.width - 64, liquidHeight);

      // Liquid Surface meniscus
      ctx.fillStyle = 'rgba(147, 197, 253, 0.5)';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, beakerTop, canvas.width / 2 - 32, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off beaker walls and bottom
        if (p.x - p.radius < 32 || p.x + p.radius > canvas.width - 32) p.vx *= -1;
        if (p.y - p.radius < beakerTop + 5 || p.y + p.radius > beakerBottom - 5) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.isSolute) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Overlay metrics text inside canvas top
      ctx.fillStyle = '#f3f4f6';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Temp: ${solutionTemp}°C | Volume: ${(solutionVolumeL * 1000).toFixed(1)} mL`, 40, 45);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, soluteMass, solventMass, soluteMolarMass, solutionTemp, soluteType]);

  // Canvas Animation 2: Gas Solubility & Henry's Law Simulation
  useEffect(() => {
    if (activeTab !== 'gas_henry' || !gasCanvasRef.current) return;
    const canvas = gasCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Henry's Law calculation: p = KH * x => x = p / KH
    // KH increases with temperature!
    const baseKH = selectedGas === 'CO2' ? 1.6 : selectedGas === 'O2' ? 43.0 : 85.0; // kbar at 298K
    const effectiveKH = baseKH * (1 + (gasTemp - 20) * 0.03);
    const moleFractionX = (gasPressure / effectiveKH) * 1e-3;
    const dissolvedPct = Math.min(100, Math.max(5, (gasPressure / (effectiveKH / 30)) * 60));

    // Gas particles in vapor phase vs liquid phase
    const vaporCount = Math.floor(30 * gasPressure);
    const liquidCount = Math.floor(dissolvedPct * 0.8);

    const vaporParticles = Array.from({ length: vaporCount }, () => ({
      x: Math.random() * (canvas.width - 60) + 30,
      y: Math.random() * 80 + 30,
      vx: (Math.random() - 0.5) * (1 + gasTemp / 20),
      vy: (Math.random() - 0.5) * (1 + gasTemp / 20)
    }));

    const liquidParticles = Array.from({ length: liquidCount }, () => ({
      x: Math.random() * (canvas.width - 60) + 30,
      y: Math.random() * 120 + 160,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Top Piston position based on pressure
      const pistonY = 20 + (3 - gasPressure) * 15;

      // Draw Cylinder & Piston
      ctx.fillStyle = '#374151';
      ctx.fillRect(20, pistonY - 10, canvas.width - 40, 15); // Piston head
      ctx.fillStyle = '#9ca3af';
      ctx.fillRect(canvas.width / 2 - 8, 0, 16, pistonY - 10); // Piston rod

      // Vapor region
      ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
      ctx.fillRect(20, pistonY, canvas.width - 40, 140 - pistonY);

      // Liquid region (water bottom)
      const liquidGradient = ctx.createLinearGradient(0, 140, 0, canvas.height - 20);
      liquidGradient.addColorStop(0, 'rgba(14, 165, 233, 0.3)');
      liquidGradient.addColorStop(1, 'rgba(3, 105, 161, 0.6)');
      ctx.fillStyle = liquidGradient;
      ctx.fillRect(20, 140, canvas.width - 40, canvas.height - 160);

      // Membrane / Interface line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 140);
      ctx.lineTo(canvas.width - 20, 140);
      ctx.stroke();

      // Render Gas Vapor particles
      ctx.fillStyle = '#ef4444'; // Red gas molecules
      vaporParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 25 || p.x > canvas.width - 25) p.vx *= -1;
        if (p.y < pistonY + 5 || p.y > 135) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Dissolved Gas particles
      ctx.fillStyle = '#10b981'; // Green dissolved molecules
      liquidParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 25 || p.x > canvas.width - 25) p.vx *= -1;
        if (p.y < 145 || p.y > canvas.height - 25) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Aquatic Life comfort indicator
      const o2Saturation = Math.min(100, Math.round((dissolvedPct / 60) * 100));
      ctx.fillStyle = '#f3f4f6';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Dissolved Gas Saturation: ${o2Saturation}%`, 30, canvas.height - 35);

      if (selectedGas === 'O2') {
        const comfortText = o2Saturation > 60 ? '🐟 Aquatic Life Thriving (High O₂)' : '⚠️ Aquatic Stress (Low O₂ - Warm Water)';
        ctx.fillStyle = o2Saturation > 60 ? '#34d399' : '#f87171';
        ctx.fillText(comfortText, 30, canvas.height - 15);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, gasPressure, gasTemp, selectedGas]);

  // Canvas Animation 3: Osmosis & Reverse Osmosis Piston
  useEffect(() => {
    if (activeTab !== 'osmosis_ro' || !osmosisCanvasRef.current) return;
    const canvas = osmosisCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const isRO = roAppliedPressure > roOsmoticPressure;

    // Water particles moving across SPM
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 80) + 40,
      vx: isRO ? -1.5 : 1.2, // Leftward during RO, Rightward during natural Osmosis
      vy: (Math.random() - 0.5) * 1.0
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const midX = canvas.width / 2;

      // Draw Left Chamber (Pure Water)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fillRect(20, 40, midX - 20, canvas.height - 60);

      // Draw Right Chamber (Salt Solution)
      ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
      ctx.fillRect(midX, 40, midX - 20, canvas.height - 60);

      // Semi-Permeable Membrane (SPM) in center
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(midX, 40);
      ctx.lineTo(midX, canvas.height - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Piston on Right side (RO Pressure)
      const pistonHeight = isRO ? 80 : 50;
      ctx.fillStyle = '#6b7280';
      ctx.fillRect(midX + 10, pistonHeight, midX - 30, 15);
      ctx.fillStyle = '#f3f4f6';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Applied P: ${roAppliedPressure} bar`, midX + 20, pistonHeight - 8);
      ctx.fillText(`Osmotic Π: ${roOsmoticPressure} bar`, midX + 20, pistonHeight + 30);

      // Water Particles moving across membrane
      ctx.fillStyle = '#38bdf8';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 25) p.x = canvas.width - 25;
        if (p.x > canvas.width - 25) p.x = 25;
        if (p.y < 45 || p.y > canvas.height - 25) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Salt Ions stuck on Right Chamber
      ctx.fillStyle = '#eab308';
      for (let i = 0; i < 20; i++) {
        const sx = midX + 25 + (i * 13) % (midX - 50);
        const sy = 90 + (i * 17) % (canvas.height - 120);
        ctx.beginPath();
        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Pure Water', 40, 30);
      ctx.fillStyle = '#eab308';
      ctx.fillText('Saline Solution', midX + 30, 30);

      // RO Flow Direction Banner
      ctx.fillStyle = isRO ? '#34d399' : '#f87171';
      ctx.font = 'bold 13px sans-serif';
      const statusMsg = isRO
        ? '⚡ REVERSE OSMOSIS ACTIVE: Pure Water Flowing Left!'
        : '🌊 Natural Osmosis: Water Flowing Right into Saline';
      ctx.fillText(statusMsg, 30, canvas.height - 5);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, roAppliedPressure, roOsmoticPressure]);

  // Calculations for Sandbox display
  const totalMassCalculated = soluteMass + solventMass;
  const massPctCalculated = (soluteMass / totalMassCalculated) * 100;
  const molesSoluteCalculated = soluteMass / soluteMolarMass;
  const molesSolventCalculated = solventMass / 18.015;
  const moleFractionCalculated = molesSoluteCalculated / (molesSoluteCalculated + molesSolventCalculated);
  const solutionVolL = (totalMassCalculated / 1000) * (1 + (solutionTemp - 20) * 0.0004);
  const molarityCalculated = molesSoluteCalculated / solutionVolL;
  const molalityCalculated = molesSoluteCalculated / (solventMass / 1000);
  const ppmCalculated = (soluteMass / totalMassCalculated) * 1e6;

  // Handle Challenge Answer Selection
  const handleSelectAnswer = (index: number) => {
    if (isAnswerSubmitted) return;
    audioManager.play('tap');
    setSelectedAnswer(index);
  };

  // Submit Challenge Answer & Update SRS / BKT
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const currentChallenge = challenges[currentChallengeIdx];
    const isCorrect = selectedAnswer === currentChallenge.correctIndex;

    // BKT State Update
    const currentBKT = bktStates[currentChallenge.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates(prev => ({ ...prev, [currentChallenge.nodeId]: updatedBKT }));

    // SRS State Update
    const currentSRS = srsItems[currentChallenge.nodeId] || createReviewItem(currentChallenge.nodeId, 'Chemistry');
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 2, 0);
    setSrsItems(prev => ({ ...prev, [currentChallenge.nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speakText('Correct answer! Excellent chemistry problem solving.');
      setScore(prev => prev + 100);
      setShowSparkle(true);
      setSparklePos({ x: 500, y: 300 });

      if (currentChallengeIdx === challenges.length - 1) {
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
        recordGameScore(Object.values(NODE_IDS), score + 100);
      }
    } else {
      audioManager.play('drop-wrong');
      speakText('That is incorrect. Review the step-by-step NCERT explanation below.');
    }
  };

  // Next Challenge
  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setShowSparkle(false);
    if (currentChallengeIdx < challenges.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
    }
  };

  const currentChallenge = challenges[currentChallengeIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-gold-500 selection:text-black">
      {/* Simulation Engine Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="CBSE Solutions Mastered! All Challenges Complete!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* Header Banner */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/30">
              CBSE Class 12 Chemistry
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/30">
              NCERT Chapter 2: Solutions
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent">
            Solutions & Colligative Phenomena
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Interactive visual simulation for concentration units, Henry's Law, Raoult's Law, Osmosis & Colligative Properties.
          </p>
        </div>

        {/* Score & Mastery Metric */}
        <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="text-center px-3">
            <div className="text-xs text-slate-400 uppercase font-semibold">Mastery Score</div>
            <div className="text-2xl font-black text-gold-400">{score} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center px-3">
            <div className="text-xs text-slate-400 uppercase font-semibold">BKT Level</div>
            <div className="text-lg font-bold text-emerald-400">
              {(masteryProb(bktStates[currentChallenge?.nodeId] || createBKTState()) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
        {[
          { id: 'sandbox', label: '1. Concentration Visualizer' },
          { id: 'gas_henry', label: "2. Gas Solubility & Henry's Law" },
          { id: 'vapour_raoult', label: "3. Vapour Pressure & Raoult's Law" },
          { id: 'osmosis_ro', label: '4. Osmosis & Reverse Osmosis' },
          { id: 'colligative', label: "5. Colligative & van 't Hoff i" },
          { id: 'challenges', label: '🎯 CBSE Practice Challenges' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as ActiveTab)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB 1: CONCENTRATION UNITS VISUALIZER */}
      {activeTab === 'sandbox' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Simulation Controls Panel */}
          <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
            <h2 className="text-xl font-bold text-gold-300 flex items-center gap-2">
              🧪 Solution Preparation Controls
            </h2>

            {/* Solute Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Select Solute Compound</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'glucose', name: 'Glucose (C₆H₁₂O₆)', molarMass: 180 },
                  { id: 'urea', name: 'Urea (NH₂CONH₂)', molarMass: 60 },
                  { id: 'nacl', name: 'Sodium Chloride (NaCl)', molarMass: 58.5 },
                  { id: 'antifreeze', name: 'Ethylene Glycol', molarMass: 62 }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSoluteType(item.id as any);
                      setSoluteMolarMass(item.molarMass);
                      audioManager.play('pop');
                    }}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-left transition ${
                      soluteType === item.id
                        ? 'bg-gold-950 border-gold-500 text-gold-300'
                        : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold">{item.name}</div>
                    <div className="text-[10px] text-slate-400">M = {item.molarMass} g/mol</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Solute Mass Slider */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Solute Mass (w₂):</span>
                <span className="font-mono font-bold text-amber-400">{soluteMass} g</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={soluteMass}
                onChange={e => {
                  setSoluteMass(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Solvent Mass Slider */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Solvent Mass Water (w₁):</span>
                <span className="font-mono font-bold text-gold-400">{solventMass} g</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                value={solventMass}
                onChange={e => {
                  setSolventMass(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Temperature (T):</span>
                <span className="font-mono font-bold text-rose-400">{solutionTemp} °C</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={solutionTemp}
                onChange={e => {
                  setSolutionTemp(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Notice: Heating expands volume! Molarity changes with temperature, while Molality remains constant!
              </p>
            </div>
          </div>

          {/* Canvas & Live Computed Concentration Dashboard */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 shadow-xl relative">
              <h3 className="text-sm font-semibold text-slate-300 mb-2 flex items-center justify-between">
                <span>Microscopic Solution Beaker</span>
                <span className="text-xs text-slate-500 font-mono">Dynamic Molecular Particle System</span>
              </h3>
              <canvas
                ref={solutionCanvasRef}
                width={500}
                height={260}
                className="w-full bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
              />
            </div>

            {/* Real-time CBSE Concentration Units Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-slate-900/90 border border-gold-500/30 p-3 rounded-xl">
                <div className="text-[10px] text-gold-400 uppercase font-semibold">Mass % (w/w)</div>
                <div className="text-xl font-mono font-bold text-gold-200">{massPctCalculated.toFixed(2)} %</div>
                <div className="text-[10px] text-slate-400 mt-0.5">(w₂ / Total w) × 100</div>
              </div>

              <div className="bg-slate-900/90 border border-emerald-500/30 p-3 rounded-xl">
                <div className="text-[10px] text-emerald-400 uppercase font-semibold">Mole Fraction (x₂)</div>
                <div className="text-xl font-mono font-bold text-emerald-200">{moleFractionCalculated.toFixed(4)}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">n₂ / (n₁ + n₂)</div>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/30 p-3 rounded-xl">
                <div className="text-[10px] text-amber-400 uppercase font-semibold">Molarity (M)</div>
                <div className="text-xl font-mono font-bold text-amber-200">{molarityCalculated.toFixed(3)} M</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Moles / Solution Vol (L)</div>
              </div>

              <div className="bg-slate-900/90 border border-purple-500/30 p-3 rounded-xl">
                <div className="text-[10px] text-purple-400 uppercase font-semibold">Molality (m)</div>
                <div className="text-xl font-mono font-bold text-purple-200">{molalityCalculated.toFixed(3)} m</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Moles / Solvent Mass (kg)</div>
              </div>

              <div className="bg-slate-900/90 border border-rose-500/30 p-3 rounded-xl">
                <div className="text-[10px] text-rose-400 uppercase font-semibold">Parts Per Million</div>
                <div className="text-xl font-mono font-bold text-rose-200">{ppmCalculated.toFixed(0)} ppm</div>
                <div className="text-[10px] text-slate-400 mt-0.5">(w₂ / Total w) × 10⁶</div>
              </div>

              <div className="bg-slate-900/90 border border-gold-500/30 p-3 rounded-xl">
                <div className="text-[10px] text-gold-400 uppercase font-semibold">Temp Dependence</div>
                <div className="text-xs font-bold text-gold-200 mt-1">
                  Molarity: <span className="text-rose-400">Varies</span>
                </div>
                <div className="text-xs font-bold text-gold-200">
                  Molality: <span className="text-emerald-400">Constant</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 2: GAS SOLUBILITY & HENRY'S LAW */}
      {activeTab === 'gas_henry' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-gold-300">
              💨 Henry's Law: p = K_H · x
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              At constant temperature, the solubility of a gas in a liquid is directly proportional to the partial pressure of the gas above the liquid. Higher K_H indicates lower solubility!
            </p>

            {/* Select Gas */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Select Gas Molecule</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'O2', name: 'Oxygen (O₂)', kh: '43.0 kbar' },
                  { id: 'N2', name: 'Nitrogen (N₂)', kh: '85.0 kbar' },
                  { id: 'CO2', name: 'Carbon Dioxide', kh: '1.6 kbar' }
                ].map(gas => (
                  <button
                    key={gas.id}
                    onClick={() => {
                      setSelectedGas(gas.id as any);
                      audioManager.play('pop');
                    }}
                    className={`p-2 rounded-lg text-xs font-semibold border ${
                      selectedGas === gas.id
                        ? 'bg-gold-950 border-gold-500 text-gold-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>{gas.name}</div>
                    <div className="text-[10px] text-slate-400">K_H ≈ {gas.kh}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gas Pressure Slider */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Gas Pressure (p):</span>
                <span className="font-mono font-bold text-emerald-400">{gasPressure.toFixed(1)} atm</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={gasPressure}
                onChange={e => {
                  setGasPressure(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Water Temperature Slider */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Water Temperature (T):</span>
                <span className="font-mono font-bold text-rose-400">{gasTemp} °C</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={gasTemp}
                onChange={e => {
                  setGasTemp(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>

            {/* NCERT Aquatic Life Concept Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <span>💡 CBSE NCERT Key Insight:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Gas dissolution is <strong>exothermic</strong> (Condensation-like). As temperature rises, K_H increases and gas solubility <strong>decreases</strong>. That is why aquatic life thrives in cold rivers!
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Piston Gas Chamber Simulation
            </h3>
            <canvas
              ref={gasCanvasRef}
              width={500}
              height={320}
              className="w-full bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
            />
          </div>
        </main>
      )}

      {/* TAB 3: VAPOUR PRESSURE & RAOULT'S LAW */}
      {activeTab === 'vapour_raoult' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
            <h2 className="text-xl font-bold text-gold-300">
              ♨️ Vapour Pressure & Raoult's Law
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              For a solution of volatile liquids, partial vapour pressure p_A = x_A · p°_A. Addition of non-volatile solute blocks surface evaporation sites, lowering solvent vapour pressure!
            </p>

            {/* Mole Fraction Slider */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Solute Mole Fraction (x₂):</span>
                <span className="font-mono font-bold text-gold-400">{moleFractionSolute.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.05"
                value={moleFractionSolute}
                onChange={e => {
                  setMoleFractionSolute(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
              <div className="text-[11px] text-slate-400 mt-1">
                Solvent Mole Fraction (x₁) = {(1 - moleFractionSolute).toFixed(2)}
              </div>
            </div>

            {/* Pure Solvent Vapour Pressure */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Pure Solvent Vapour Pressure (p°₁):</span>
                <span className="font-mono font-bold text-gold-400">{pureVapourPressureA} kPa</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                value={pureVapourPressureA}
                onChange={e => {
                  setPureVapourPressureA(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
            </div>

            {/* Calculated Lowering Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Solution Vapour Pressure (p₁):</div>
              <div className="text-2xl font-mono font-bold text-emerald-400">
                {((1 - moleFractionSolute) * pureVapourPressureA).toFixed(1)} kPa
              </div>
              <div className="text-xs text-slate-400">
                Vapour Pressure Lowering Δp = {(moleFractionSolute * pureVapourPressureA).toFixed(1)} kPa
              </div>
              <div className="text-xs font-mono text-gold-300 mt-2">
                Relative Lowering (Δp / p°₁) = {moleFractionSolute.toFixed(2)} = x₂
              </div>
            </div>
          </div>

          {/* SVG Visualizer for Evaporation Surface Blocking */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">
              Molecular Surface Evaporation Model (Non-Volatile Solute Blocking)
            </h3>
            
            <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
              {/* Vapor Molecules Top */}
              <div className="flex justify-around items-center h-20">
                {Array.from({ length: Math.round((1 - moleFractionSolute) * 12) }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 + (i % 3) * 0.4 }}
                    className="w-3 h-3 rounded-full bg-gold-400 shadow-lg shadow-gold-500/50"
                  />
                ))}
              </div>

              {/* Surface Interface Line */}
              <div className="w-full h-px bg-gold-500/50 my-2 relative">
                <span className="absolute right-2 -top-5 text-[10px] text-gold-400 font-mono">Liquid-Vapour Boundary</span>
              </div>

              {/* Surface Liquid Molecules */}
              <div className="flex justify-around items-center h-16 bg-gold-950/40 rounded-lg p-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const isBlocked = i < Math.round(moleFractionSolute * 12);
                  return (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] border ${
                        isBlocked
                          ? 'bg-amber-500 border-amber-300 text-black shadow-md'
                          : 'bg-gold-600 border-gold-300 text-white'
                      }`}
                    >
                      {isBlocked ? 'S' : 'H₂O'}
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              <strong>Mechanism:</strong> Solute particles (S) occupy positions on the liquid surface. Since solute is non-volatile, fewer solvent molecules (H₂O) are available at the surface to escape into vapour phase, reducing equilibrium vapour pressure.
            </p>
          </div>
        </main>
      )}

      {/* TAB 4: OSMOSIS & REVERSE OSMOSIS */}
      {activeTab === 'osmosis_ro' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-gold-300">
              🌊 Osmosis & Reverse Osmosis (RO)
            </h2>

            {/* Reverse Osmosis Applied Pressure Slider */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-amber-400">Desalination RO Controls</h3>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Applied Pressure (P):</span>
                  <span className="font-bold font-mono text-gold-400">{roAppliedPressure} bar</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={roAppliedPressure}
                  onChange={e => {
                    setRoAppliedPressure(Number(e.target.value));
                    audioManager.play('tap');
                  }}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>

              <div className="text-xs text-slate-400">
                Seawater Osmotic Pressure (Π) = <span className="font-mono text-amber-400">25 bar</span>
              </div>

              <div className={`text-xs font-bold p-2.5 rounded-lg text-center ${
                roAppliedPressure > roOsmoticPressure
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                  : 'bg-rose-950 text-rose-300 border border-rose-500'
              }`}>
                {roAppliedPressure > roOsmoticPressure
                  ? '✓ P > Π: Reverse Osmosis Active (Purifying Water)'
                  : '✕ P < Π: Natural Osmosis (Water moves into Saltwater)'}
              </div>
            </div>

            {/* Red Blood Cell Tonicity Selector */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-rose-400">Red Blood Cell Tonicity</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'isotonic', label: 'Isotonic (0.9% NaCl)', desc: 'Cell Normal' },
                  { id: 'hypotonic', label: 'Hypotonic (<0.9% NaCl)', desc: 'Cell Swells/Bursts' },
                  { id: 'hypertonic', label: 'Hypertonic (>0.9% NaCl)', desc: 'Cell Shrinks' }
                ].map(state => (
                  <button
                    key={state.id}
                    onClick={() => {
                      setCellOsmoticState(state.id as any);
                      audioManager.play('pop');
                    }}
                    className={`p-2 rounded-lg text-[11px] font-semibold border ${
                      cellOsmoticState === state.id
                        ? 'bg-rose-950 border-rose-500 text-rose-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>{state.label}</div>
                  </button>
                ))}
              </div>

              {/* Visual Red Blood Cell SVG */}
              <div className="flex items-center justify-center py-4 bg-slate-900 rounded-lg border border-slate-800">
                <svg width="120" height="80" viewBox="0 0 120 80">
                  {cellOsmoticState === 'isotonic' && (
                    <ellipse cx="60" cy="40" rx="35" ry="20" fill="#ef4444" stroke="#fca5a5" strokeWidth="3" />
                  )}
                  {cellOsmoticState === 'hypotonic' && (
                    <ellipse cx="60" cy="40" rx="45" ry="32" fill="#ef4444" stroke="#fca5a5" strokeWidth="4" />
                  )}
                  {cellOsmoticState === 'hypertonic' && (
                    <path
                      d="M 35,40 Q 45,25 60,35 Q 75,25 85,40 Q 75,55 60,45 Q 45,55 35,40 Z"
                      fill="#b91c1c"
                      stroke="#fca5a5"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Semi-Permeable Membrane (SPM) Flow Dynamics
            </h3>
            <canvas
              ref={osmosisCanvasRef}
              width={500}
              height={320}
              className="w-full bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
            />
          </div>
        </main>
      )}

      {/* TAB 5: COLLIGATIVE PROPERTIES & VAN 'T HOFF FACTOR */}
      {activeTab === 'colligative' && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-gold-300">
              📊 Modified Colligative Properties & van 't Hoff Factor (i)
            </h2>

            {/* Solute Dissociation / Association Preset Buttons */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Select Electrolyte / Compound</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Glucose (Non-electrolyte)', i: 1.0, type: 'None' },
                  { name: 'NaCl (NaCl → Na⁺ + Cl⁻)', i: 2.0, type: 'Dissociation' },
                  { name: 'K₂SO₄ (K₂SO₄ → 2K⁺ + SO₄²⁻)', i: 3.0, type: 'Dissociation' },
                  { name: 'Acetic Acid Dimer in Benzene', i: 0.5, type: 'Association' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setVanTHoffI(item.i);
                      audioManager.play('pop');
                    }}
                    className={`p-2.5 rounded-lg text-xs font-semibold border text-left ${
                      vanTHoffI === item.i
                        ? 'bg-purple-950 border-purple-500 text-purple-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>{item.name}</div>
                    <div className="text-[10px] text-purple-400 font-mono">i = {item.i}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Molality Slider */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Molality (m):</span>
                <span className="font-mono font-bold text-gold-400">{molalityVal.toFixed(1)} mol/kg</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={molalityVal}
                onChange={e => {
                  setMolalityVal(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
            </div>

            {/* Four Modified Formulas Display */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono">
              <div className="text-gold-400 font-bold mb-1">NCERT Colligative Equations with Factor i:</div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                1. Boiling Point Elevation: <span className="text-amber-300">ΔT_b = i · K_b · m</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                2. Freezing Point Depression: <span className="text-gold-300">ΔT_f = i · K_f · m</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                3. Osmotic Pressure: <span className="text-emerald-300">Π = i · C · R · T</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                4. Relative VP Lowering: <span className="text-purple-300">(Δp / p°₁) = i · x₂</span>
              </div>
            </div>
          </div>

          {/* Particle Count Multiplication Diagram */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">
              Particle Multiplication Factor Visualizer (i = {vanTHoffI})
            </h3>

            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-2">1 Formula Unit Added</div>
                  <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg mx-auto">
                    AB
                  </div>
                </div>

                <div className="text-2xl text-gold-400 font-bold">➔</div>

                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-2">Particles in Solution ({vanTHoffI}x)</div>
                  <div className="flex gap-2 justify-center">
                    {vanTHoffI === 1.0 && (
                      <div className="w-10 h-10 bg-gold-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        AB
                      </div>
                    )}
                    {vanTHoffI === 2.0 && (
                      <>
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                          A⁺
                        </div>
                        <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          B⁻
                        </div>
                      </>
                    )}
                    {vanTHoffI === 3.0 && (
                      <>
                        <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                          K⁺
                        </div>
                        <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                          K⁺
                        </div>
                        <div className="w-9 h-9 bg-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                          SO₄²⁻
                        </div>
                      </>
                    )}
                    {vanTHoffI === 0.5 && (
                      <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black border-2 border-dashed border-amber-200">
                        (C₂H₄O₂)₂ Dimer
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Calculated Boiling Point Elevation Example */}
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-1">
                <div className="text-slate-400 font-semibold">Calculated ΔT_b (Water K_b = 0.52 K kg/mol):</div>
                <div className="text-xl font-mono font-bold text-emerald-400">
                  ΔT_b = {vanTHoffI} × 0.52 × {molalityVal} = {(vanTHoffI * 0.52 * molalityVal).toFixed(3)} K
                </div>
                <div className="text-slate-400 text-[11px]">
                  New Boiling Point of Water = {(100 + vanTHoffI * 0.52 * molalityVal).toFixed(3)} °C
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 6: CBSE PRACTICE CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="max-w-4xl mx-auto space-y-6">
          {/* Progress Header */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
                Challenge {currentChallengeIdx + 1} of {challenges.length}
              </div>
              <h2 className="text-xl font-bold text-white">{currentChallenge.title}</h2>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-amber-400">
              Difficulty: {currentChallenge.difficulty.toUpperCase()}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-6">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {currentChallenge.description}
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-gold-500/30 text-base md:text-lg font-medium text-gold-100">
              {currentChallenge.question}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentChallenge.options.map((option, idx) => {
                let btnStyle = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800';
                if (selectedAnswer === idx) {
                  btnStyle = 'bg-gold-950 border-gold-500 text-gold-200';
                }
                if (isAnswerSubmitted) {
                  if (idx === currentChallenge.correctIndex) {
                    btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                  } else if (selectedAnswer === idx) {
                    btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-xl border text-left text-sm md:text-base transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && idx === currentChallenge.correctIndex && (
                      <span className="text-emerald-400 font-bold text-lg">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint(!showHint);
                  audioManager.play('hint');
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-amber-300 hover:bg-slate-700 transition"
              >
                {showHint ? 'Hide Hint' : '💡 Show Hint'}
              </button>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-gold-500/25 hover:brightness-110'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:brightness-110"
                >
                  {currentChallengeIdx < challenges.length - 1 ? 'Next Challenge ➔' : 'Complete Module'}
                </button>
              )}
            </div>

            {/* Hint Bubble */}
      <HintBubble show={showHint} text={currentChallenge.hint} />

            {/* Explanation Box */}
            {isAnswerSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-sm"
              >
                <div className="font-bold text-gold-400 flex items-center gap-2">
                  <span>📘 NCERT CBSE Step-by-Step Explanation:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{currentChallenge.explanation}</p>
              </motion.div>
            )}
          </div>
        </main>
      )}

      {/* Footer CBSE Attribution */}
      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        CBSE Class 12 Chemistry Interactive Learning Simulation • Based on NCERT Solutions Textbook Standard
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

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 12 Solutions Lab',
  subtitle: 'Master Colligative Properties, Raoult Law, and Van\'t Hoff Factor',
  description: 'Step into a virtual solutions lab where you prepare ideal and non-ideal solutions, measure colligative properties, and calculate osmotic pressure.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Freezing Point Depression Puzzle',
  question: 'Why does adding salt (NaCl) to water lower its freezing point, and why is the actual freezing point depression slightly less than calculated using the simple formula?',
  options: [
    'Salt increases the freezing point',
    'Salt dissolves and lowers the vapor pressure of water, causing freezing point depression (ΔTf = Kf × m). The actual value is slightly less because NaCl does not fully dissociate at high concentrations; the Van\'t Hoff factor (i) is slightly less than 2',
    'Salt reacts chemically with ice to prevent freezing',
    'Salt makes water denser, preventing ice formation'
],
  correctIndex: 1,
  explanation: 'Adding a non-volatile solute (NaCl) lowers the vapor pressure of water, which depresses the freezing point according to ΔTf = i × Kf × m. Theoretically, i = 2 for NaCl (Na+ + Cl-), but at high concentrations, ion pairing reduces effective dissociation, so i < 2 and the actual depression is slightly less than calculated.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "raoult",
    "name": "Raoult's Law Lab",
    "description": "Study ideal and non-ideal solutions, azeotropes."
  },
  {
    "id": "colligative",
    "name": "Colligative Properties Lab",
    "description": "Measure relative lowering of VP, elevation of BP, depression of FP."
  },
  {
    "id": "osmosis",
    "name": "Osmosis Lab",
    "description": "Study osmotic pressure and reverse osmosis."
  },
  {
    "id": "vant Hoff",
    "name": "Van't Hoff Factor Lab",
    "description": "Calculate degree of dissociation/association using Van't Hoff factor."
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
    "title": "High Henry's Law Constant Means Higher Gas Solubility",
    "description": "Students incorrectly believe that a higher value of Henry's law constant (K_H) indicates greater solubility of a gas in a liquid.",
    "correction": "According to Henry's law, p = K_H * x, where x is the mole fraction of the gas in solution. At a constant partial pressure, mole fraction (solubility) is inversely proportional to K_H, meaning higher K_H values correspond to lower gas solubility at a given temperature."
  },
  {
    "id": "misc_2",
    "title": "Positive Deviation from Raoult's Law Implies Stronger Intermolecular Forces",
    "description": "Students assume positive deviation from Raoult's law indicates stronger solute-solvent interactions because the observed vapor pressure is higher.",
    "correction": "Positive deviation occurs when solute-solvent (A-B) interactions are weaker than solute-solute (A-A) and solvent-solvent (B-B) interactions. Because molecules escape into the vapor phase more easily due to weaker forces, the observed vapor pressure is higher than predicted by Raoult's law."
  },
  {
    "id": "misc_3",
    "title": "Azeotropes Can Be Separated Into Pure Components by Fractional Distillation",
    "description": "Students incorrectly write that azeotropic mixtures can be separated into their pure constituent liquids using fractional distillation.",
    "correction": "Azeotropes are binary liquid mixtures that boil at a constant temperature and distill over completely without changing composition. Because the liquid and vapor phases have identical compositions at the azeotropic composition, fractional distillation cannot separate them."
  },
  {
    "id": "misc_4",
    "title": "Calculated Delta Tb or Delta Tf Represents Actual Boiling or Freezing Point",
    "description": "Students frequently substitute the calculated elevation in boiling point (Delta Tb) or depression in freezing point (Delta Tf) directly as the final boiling or freezing temperature of the solution.",
    "correction": "Delta Tb and Delta Tf represent the change in temperature relative to the pure solvent, where Delta Tb = Tb - Tb° and Delta Tf = Tf° - Tf. To find the solution's actual boiling point, Delta Tb must be added to the pure solvent's boiling point, whereas Delta Tf must be subtracted from the pure solvent's freezing point."
  },
  {
    "id": "misc_5",
    "title": "Van 't Hoff Factor Is Always an Integer Based on Ion Count",
    "description": "Students assume the van 't Hoff factor (i) for an electrolyte is always an integer equal to the total number of ions written in its formula unit (e.g., i = 3 for K2SO4).",
    "correction": "The van 't Hoff factor depends on the degree of dissociation (alpha) via the relation i = 1 + (n - 1)alpha. It equals the total number of theoretical ions (n) only when complete dissociation occurs (alpha = 1); for incomplete dissociation or association, i is a non-integer value."
  }
];


export default C12_ChemistrySolutionsCBSESim;