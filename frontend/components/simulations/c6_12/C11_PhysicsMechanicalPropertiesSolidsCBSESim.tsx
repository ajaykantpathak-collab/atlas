'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (CBSE Class 11 Physics - Mechanical Properties of Solids) ───
const NODE_C11_PHY_001 = 'c11_phy_cbse_001'; // Deforming force and restoring force
const NODE_C11_PHY_002 = 'c11_phy_cbse_002'; // Elasticity and plasticity definitions
const NODE_C11_PHY_003 = 'c11_phy_cbse_003'; // Interatomic / Intermolecular forces & potential energy curve
const NODE_C11_PHY_004 = 'c11_phy_cbse_004'; // Normal stress (tensile and compressive)
const NODE_C11_PHY_005 = 'c11_phy_cbse_005'; // Tangential / Shear stress
const NODE_C11_PHY_006 = 'c11_phy_cbse_006'; // Hydraulic / Volumetric stress
const NODE_C11_PHY_007 = 'c11_phy_cbse_007'; // Longitudinal strain (tensile/compressive)
const NODE_C11_PHY_008 = 'c11_phy_cbse_008'; // Shear strain and angle of shear
const NODE_C11_PHY_009 = 'c11_phy_cbse_009'; // Volume strain
const NODE_C11_PHY_010 = 'c11_phy_cbse_010'; // Hooke's Law & Limit of proportionality
const NODE_C11_PHY_011 = 'c11_phy_cbse_011'; // Stress-Strain Curve analysis
const NODE_C11_PHY_012 = 'c11_phy_cbse_012'; // Elastic limit and yield point
const NODE_C11_PHY_013 = 'c11_phy_cbse_013'; // Ultimate tensile strength and fracture point
const NODE_C11_PHY_014 = 'c11_phy_cbse_014'; // Ductile vs Brittle materials
const NODE_C11_PHY_015 = 'c11_phy_cbse_015'; // Elastomers (Rubber behavior)
const NODE_C11_PHY_016 = 'c11_phy_cbse_016'; // Young's Modulus of Elasticity (Y)
const NODE_C11_PHY_017 = 'c11_phy_cbse_017'; // Determination of Young's Modulus (Searle's apparatus)
const NODE_C11_PHY_018 = 'c11_phy_cbse_018'; // Shear Modulus of Rigidity (G)
const NODE_C11_PHY_019 = 'c11_phy_cbse_019'; // Bulk Modulus (K) and Compressibility
const NODE_C11_PHY_020 = 'c11_phy_cbse_020'; // Poisson's Ratio (nu)
const NODE_C11_PHY_021 = 'c11_phy_cbse_021'; // Elastic potential energy stored in stretched wire
const NODE_C11_PHY_022 = 'c11_phy_cbse_022'; // Energy density of stretched wire
const NODE_C11_PHY_023 = 'c11_phy_cbse_023'; // Thermal stress and strain in constrained rods
const NODE_C11_PHY_024 = 'c11_phy_cbse_024'; // Design of structural beams (I-shaped cross section)
const NODE_C11_PHY_025 = 'c11_phy_cbse_025'; // Maximum height of a mountain on Earth limit
const NODE_C11_PHY_026 = 'c11_phy_cbse_026'; // Cable thickness calculation for cranes & elevators
const NODE_C11_PHY_027 = 'c11_phy_cbse_027'; // Elastic hysteresis and energy dissipation

const ALL_NODE_IDS: string[] = [
  NODE_C11_PHY_001, NODE_C11_PHY_002, NODE_C11_PHY_003, NODE_C11_PHY_004,
  NODE_C11_PHY_005, NODE_C11_PHY_006, NODE_C11_PHY_007, NODE_C11_PHY_008,
  NODE_C11_PHY_009, NODE_C11_PHY_010, NODE_C11_PHY_011, NODE_C11_PHY_012,
  NODE_C11_PHY_013, NODE_C11_PHY_014, NODE_C11_PHY_015, NODE_C11_PHY_016,
  NODE_C11_PHY_017, NODE_C11_PHY_018, NODE_C11_PHY_019, NODE_C11_PHY_020,
  NODE_C11_PHY_021, NODE_C11_PHY_022, NODE_C11_PHY_023, NODE_C11_PHY_024,
  NODE_C11_PHY_025, NODE_C11_PHY_026, NODE_C11_PHY_027,
];

// ─── TYPES & INTERFACES ───
interface MaterialProperty {
  id: string;
  name: string;
  youngModulus: number; // GPa
  shearModulus: number; // GPa
  bulkModulus: number;  // GPa
  poissonRatio: number;
  yieldStrength: number; // MPa
  ultimateStrength: number; // MPa
  density: number; // kg/m^3
  color: string;
  type: 'ductile' | 'brittle' | 'elastomer';
}

interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'numeric' | 'drag-label' | 'concept';
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  numericAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
}

interface Misconception {
  id: string;
  statement: string;
  truth: string;
  physicsContext: string;
}

// ─── MATERIALS DATA ───
const MATERIALS: Record<string, MaterialProperty> = {
  steel: {
    id: 'steel',
    name: 'Structural Steel',
    youngModulus: 200,
    shearModulus: 80,
    bulkModulus: 160,
    poissonRatio: 0.30,
    yieldStrength: 250,
    ultimateStrength: 400,
    density: 7850,
    color: '#94a3b8',
    type: 'ductile',
  },
  aluminum: {
    id: 'aluminum',
    name: 'Aircraft Aluminum 7075',
    youngModulus: 70,
    shearModulus: 26,
    bulkModulus: 75,
    poissonRatio: 0.33,
    yieldStrength: 95,
    ultimateStrength: 110,
    density: 2700,
    color: '#cbd5e1',
    type: 'ductile',
  },
  copper: {
    id: 'copper',
    name: 'Annealed Copper',
    youngModulus: 110,
    shearModulus: 42,
    bulkModulus: 140,
    poissonRatio: 0.34,
    yieldStrength: 70,
    ultimateStrength: 220,
    density: 8960,
    color: '#f97316',
    type: 'ductile',
  },
  glass: {
    id: 'glass',
    name: 'Tempered Glass',
    youngModulus: 65,
    shearModulus: 26,
    bulkModulus: 40,
    poissonRatio: 0.22,
    yieldStrength: 50,
    ultimateStrength: 50,
    density: 2500,
    color: '#38bdf8',
    type: 'brittle',
  },
  rubber: {
    id: 'rubber',
    name: 'Vulcanized Rubber',
    youngModulus: 0.05,
    shearModulus: 0.0016,
    bulkModulus: 2.0,
    poissonRatio: 0.49,
    yieldStrength: 15,
    ultimateStrength: 25,
    density: 1100,
    color: '#475569',
    type: 'elastomer',
  },
};

// ─── SCENARIO NARRATIVE ───
const SCENARIO = {
  title: 'ISRO Space Station Girder & Cable Integrity Laboratory',
  intro: 'Welcome to the ISRO Materials Testing Center! You are chief structural engineer for the modular orbital space station. Your task is to analyze alloy wires, structural beams, high-tension suspension cables, and pneumatic seals under extreme mechanical stress, thermal shocks, and shear loads.',
  context: 'Use precision tensometers, hydraulic pressure chambers, shear torsion rigs, and beam strain visualizers to ensure zero structural failure in orbit.',
};

// ─── DISCOVERY PREDICT QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Two identical wires—one made of Steel (Young\'s Modulus Y = 200 GPa) and one of Vulcanized Rubber (Y = 0.05 GPa)—are suspended under equal mass loads. Which material is scientifically defined as MORE ELASTIC in physics?',
  options: [
    'Rubber, because it can stretch to multiple times its length and return to shape easily.',
    'Steel, because it requires a vastly higher stress to produce a given strain and returns with greater restoring force per unit strain.',
    'Both have equal elasticity because both return to their initial dimensions eventually.',
    'Neither, because elasticity is only a chemical property of synthetic polymers.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember! Elasticity in physics is measured by the magnitude of restoring stress produced per unit strain ($Y = \\text{Stress}/\\text{Strain}$). Higher modulus = higher elasticity!',
};

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: 'misc_1',
    statement: 'Rubber is more elastic than steel because it stretches more.',
    truth: 'Steel is more elastic than rubber. In physics, elasticity is the resistance to deformation and force of restoration ($Y = \\sigma / \\epsilon$). Steel requires far greater stress for equal strain.',
    physicsContext: 'Modulus of Elasticity $Y_{\\text{steel}} \\approx 200 \\text{ GPa}$ vs $Y_{\\text{rubber}} \\approx 0.05 \\text{ GPa}$.',
  },
  {
    id: 'misc_2',
    statement: 'Stress and pressure are identical physical concepts.',
    truth: 'While both have units of $\\text{N/m}^2$ (Pa), pressure is an external scalar force per area perpendicular to a fluid surface, whereas stress is an internal restoring vector/tensor force per unit area inside a deformed solid.',
    physicsContext: 'Internal restoring force per cross-sectional area: $\\sigma = F_{\\text{res}} / A$.',
  },
  {
    id: 'misc_3',
    statement: 'Strain has units of meters or millimeters.',
    truth: 'Strain is a dimensionless relative change ratio (e.g., $\\Delta L / L$ or $\\Delta V / V$). It has no units.',
    physicsContext: '$\\epsilon = \\frac{\\Delta L}{L_0} \\quad [\\text{Dimensionless}]$.',
  },
  {
    id: 'misc_4',
    statement: 'Breaking stress depends on the thickness or cross-sectional area of the wire.',
    truth: 'Breaking stress (Ultimate Tensile Strength) is an intrinsic material property. Breaking FORCE depends on cross-sectional area ($F_{\\text{break}} = \\text{Breaking Stress} \\times A$).',
    physicsContext: 'Thicker cables withstand higher total load, but their breaking stress threshold remains constant.',
  },
  {
    id: 'misc_5',
    statement: 'Poisson\'s ratio can be any positive value up to 10.',
    truth: 'For isotropic solids, theoretical Poisson\'s ratio is strictly bounded between $-1.0$ and $+0.5$. Most real metals sit between $0.25$ and $0.35$.',
    physicsContext: 'Rubber approaches $0.5$ (incompressible), while cork has $\\nu \\approx 0$.',
  },
];

// ─── TEACHING SLIDES DATA ───
const TEACHING_SLIDES = [
  {
    id: 'slide_1',
    title: '1. Deforming Forces & Interatomic Potential Energy',
    concept: 'Elasticity & Molecular Restoring Forces',
    nodeId: NODE_C11_PHY_003,
    explanation: 'Solids are held together by interatomic electrostatic bonds modeled as microscopic springs. At equilibrium distance $r_0$, net force is zero and potential energy is minimum. When pulled ($r > r_0$), attractive forces pull atoms back; when compressed ($r < r_0$), powerful repulsive forces push them apart.',
    math: 'F_{\\text{net}} = -\\frac{dU}{dr}, \\quad U(r_0) = \\text{Minimum}',
    keyTakeaway: 'Elasticity is the intrinsic property of a body to regain its original shape and size after removal of deforming forces.',
  },
  {
    id: 'slide_2',
    title: '2. Stress, Strain & Hooke\'s Law',
    concept: 'Normal, Shear & Volumetric Deformations',
    nodeId: NODE_C11_PHY_010,
    explanation: 'Stress is internal restoring force per unit area ($\\sigma = F/A$). Strain is relative change in dimension ($\\epsilon = \\Delta L / L$). Hooke\'s Law states that within the elastic limit, stress is directly proportional to strain.',
    math: '\\sigma = E \\cdot \\epsilon \\implies \\text{Stress} \\propto \\text{Strain}',
    keyTakeaway: 'The constant of proportionality is the Elastic Modulus of the material.',
  },
  {
    id: 'slide_3',
    title: '3. Elastic Moduli: Young\'s, Shear & Bulk Modulus',
    concept: 'Three Modes of Deformation',
    nodeId: NODE_C11_PHY_016,
    explanation: '1. Young\'s Modulus ($Y = \\frac{F/A}{\\Delta L/L}$): Tensile/Compressive strain.\n2. Shear Modulus ($G = \\frac{F/A}{\\theta}$): Tangential shear.\n3. Bulk Modulus ($K = -\\frac{\\Delta P}{\\Delta V/V}$): Volumetric hydraulic compression.',
    math: 'Y = \\frac{F L_0}{A \\Delta L}, \\quad G = \\frac{F}{A \\tan\\theta}, \\quad K = -V \\frac{\\Delta P}{\\Delta V}',
    keyTakeaway: 'Liquids and gases only possess Bulk Modulus, whereas solids possess all three!',
  },
  {
    id: 'slide_4',
    title: '4. Stress-Strain Curve & Material Behavior',
    concept: 'From Elastic Limit to Fracture',
    nodeId: NODE_C11_PHY_011,
    explanation: 'The curve features key milestones: Proportional Limit (Hooke\'s law holds), Yield Point / Elastic Limit (plastic deformation starts), Ultimate Tensile Strength (peak load capacity), and Fracture Point.',
    math: '\\text{Ductile: Large plastic region} \\quad | \\quad \\text{Brittle: Fractures right after elastic limit}',
    keyTakeaway: 'Elastomers (like rubber) have large elastic strain range but do not obey Hooke\'s law linearly.',
  },
  {
    id: 'slide_5',
    title: '5. Poisson\'s Ratio & Elastic Potential Energy',
    concept: 'Lateral Contraction & Stored Strain Energy',
    nodeId: NODE_C11_PHY_021,
    explanation: 'Stretching a wire causes longitudinal elongation and lateral contraction. Poisson\'s ratio $\\nu = -\\frac{\\text{Lateral Strain}}{\\text{Longitudinal Strain}}$. Work done in stretching is stored as elastic strain energy.',
    math: 'u = \\frac{U}{\\text{Volume}} = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} Y \\epsilon^2',
    keyTakeaway: 'In structural engineering, I-beams optimize cross-sectional area to resist bending strain while minimizing weight!',
  },
];

// ─── 10 CHALLENGES (Covering All Specified Nodes) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_hooke',
    nodeId: NODE_C11_PHY_010,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'A structural steel cable of length 2.0 m and cross-sectional area 1.0 cm² ($1.0 \\times 10^{-4}\\text{ m}^2$) is subjected to a tensile load of 20,000 N. If Young\'s modulus of steel is 200 GPa ($2.0 \\times 10^{11}\\text{ N/m}^2$), calculate the elongation $\\Delta L$ in millimeters.',
    numericAnswer: 2.0,
    tolerance: 0.1,
    unit: 'mm',
    explanation: '$\\sigma = F/A = 20000 / 10^{-4} = 2.0 \\times 10^8 \\text{ Pa}$. $\\epsilon = \\sigma / Y = (2.0 \\times 10^8) / (2.0 \\times 10^{11}) = 1.0 \\times 10^{-3}$. $\\Delta L = \\epsilon \\times L_0 = 1.0 \\times 10^{-3} \\times 2.0\\text{ m} = 2.0\\text{ mm}$.',
    hints: [
      'Convert area from cm² to m²: 1 cm² = 10^-4 m².',
      'Use formula ΔL = (F * L0) / (A * Y).',
      'Convert result from meters to mm (multiply by 1000).',
    ],
  },
  {
    id: 'ch_02_poisson',
    nodeId: NODE_C11_PHY_020,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A cylindrical metal alloy rod of diameter 10.0 mm expands in length by 0.2% (longitudinal strain $\\epsilon = +0.0020$) under tension. If Poisson\'s ratio $\\nu = 0.30$, by how many micrometers (\\mu m) does its diameter contract?',
    numericAnswer: 6.0,
    tolerance: 0.2,
    unit: 'μm',
    explanation: 'Lateral strain $\\epsilon_{\\text{lat}} = -\\nu \\cdot \\epsilon_{\\text{long}} = -0.30 \\times 0.0020 = -0.00060$. Contraction in diameter $\\Delta d = |\\epsilon_{\\text{lat}}| \\times d_0 = 0.00060 \\times 10.0\\text{ mm} = 0.0060\\text{ mm} = 6.0\\ \\mu\\text{m}$.',
    hints: [
      'Lateral strain magnitude = Poisson ratio * Longitudinal strain.',
      'Delta d = lateral strain * initial diameter.',
      '1 mm = 1000 micrometers (μm).',
    ],
  },
  {
    id: 'ch_03_energy_density',
    nodeId: NODE_C11_PHY_022,
    type: 'numeric',
    difficulty: 'standard',
    question: 'Calculate the elastic energy density stored in a stretched copper rod when subjected to a uniform tensile stress of $1.1 \\times 10^8\\text{ Pa}$. Given $Y_{\\text{copper}} = 110\\text{ GPa} = 1.1 \\times 10^{11}\\text{ Pa}$. (Answer in $\\text{kJ/m}^3$)',
    numericAnswer: 55.0,
    tolerance: 1.0,
    unit: 'kJ/m³',
    explanation: 'Energy density $u = \\frac{1}{2} \\frac{\\sigma^2}{Y} = \\frac{1}{2} \\frac{(1.1 \\times 10^8)^2}{1.1 \\times 10^{11}} = \\frac{1.21 \\times 10^{16}}{2.2 \\times 10^{11}} = 55,000\\text{ J/m}^3 = 55.0\\text{ kJ/m}^3$.',
    hints: [
      'Energy density u = 0.5 * stress^2 / Y.',
      'Square the stress: (1.1 x 10^8)^2 = 1.21 x 10^16.',
      'Divide by 2Y and convert J/m³ to kJ/m³.',
    ],
  },
  {
    id: 'ch_04_shear_cube',
    nodeId: NODE_C11_PHY_018,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'A aluminum cube of side length 10 cm ($0.10\\text{ m}$) has its bottom face fixed to a floor. A tangential shear force of $2.6 \\times 10^5\\text{ N}$ is applied to its top face. If Shear Modulus $G = 26\\text{ GPa}$, calculate the lateral displacement $\\Delta x$ of the top face in millimeters.',
    numericAnswer: 1.0,
    tolerance: 0.1,
    unit: 'mm',
    explanation: 'Top area $A = 0.10 \\times 0.10 = 0.01\\text{ m}^2$. Shear stress $\\tau = F/A = (2.6 \\times 10^5) / 0.01 = 2.6 \\times 10^7\\text{ Pa}$. Shear strain $\\theta = \\tau / G = (2.6 \\times 10^7) / (2.6 \\times 10^{10}) = 1.0 \\times 10^{-3}\\text{ rad}$. Lateral displacement $\\Delta x = L_0 \\cdot \\theta = 0.10 \\times 10^{-3}\\text{ m} = 0.10\\text{ mm} \\times 10 = 1.0\\text{ mm}$.',
    hints: [
      'Calculate top surface area A = side^2 = 0.01 m².',
      'Shear stress tau = F / A.',
      'Shear angle theta = tau / G, then delta x = side * theta.',
    ],
  },
  {
    id: 'ch_05_bulk_water',
    nodeId: NODE_C11_PHY_019,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A spherical submarine camera of initial volume $0.50\\text{ m}^3$ is lowered to a oceanic depth where hydraulic pressure increases by $2.0 \\times 10^7\\text{ Pa}$ (200 atm). If Bulk Modulus of the hull material is $100\\text{ GPa}$, find the absolute decrease in volume $\\Delta V$ in cubic centimeters ($\\text{cm}^3$).',
    numericAnswer: 100.0,
    tolerance: 5.0,
    unit: 'cm³',
    explanation: '$\\Delta V = V_0 \\cdot \\frac{\\Delta P}{K} = 0.50 \\times \\frac{2.0 \\times 10^7}{1.0 \\times 10^{11}} = 0.50 \\times 2.0 \\times 10^{-4} = 1.0 \\times 10^{-4}\\text{ m}^3 = 100\\text{ cm}^3$.',
    hints: [
      'Formula: delta V = V0 * delta P / K.',
      '1 m³ = 1,000,000 cm³.',
      '0.5 * 2e7 / 1e11 = 1e-4 m³ = 100 cm³.',
    ],
  },
  {
    id: 'ch_06_mountain_height',
    nodeId: NODE_C11_PHY_025,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'The ultimate compressive breaking stress of typical mountain rock is $\\sigma_{\\text{break}} = 3.0 \\times 10^8\\text{ N/m}^2$, and its average mass density is $\\rho = 3000\\text{ kg/m}^3$. Taking $g = 10\\text{ m/s}^2$, calculate the maximum theoretical height $h_{\\text{max}}$ of a mountain on Earth in kilometers.',
    numericAnswer: 10.0,
    tolerance: 0.5,
    unit: 'km',
    explanation: 'Stress at base of mountain column of height $h$ is $\\sigma = h \\rho g$. At maximum height, $\\sigma = \\sigma_{\\text{break}} \\implies h_{\\text{max}} = \\frac{\\sigma_{\\text{break}}}{\\rho g} = \\frac{3.0 \\times 10^8}{3000 \\times 10} = \\frac{3.0 \\times 10^8}{3.0 \\times 10^4} = 10,000\\text{ m} = 10\\text{ km}$.',
    hints: [
      'Pressure at bottom of rock column: P = h * rho * g.',
      'Equate P to breaking stress: 3.0 x 10^8 Pa.',
      'h_max = breaking stress / (density * g). Convert meters to km.',
    ],
  },
  {
    id: 'ch_07_crane_safety',
    nodeId: NODE_C11_PHY_026,
    type: 'numeric',
    difficulty: 'standard',
    question: 'An ISRO heavy launcher crane must lift a mass of $10,000\\text{ kg}$ ($g = 9.8\\text{ m/s}^2$). The maximum permissible tensile stress for steel cable safety is $1.0 \\times 10^8\\text{ N/m}^2$. Calculate the minimum radius $r$ of the steel cable in millimeters.',
    numericAnswer: 17.7,
    tolerance: 0.5,
    unit: 'mm',
    explanation: 'Weight $W = m g = 10000 \\times 9.8 = 98,000\\text{ N}$. Permissible stress $\\sigma = W / (\\pi r^2) \\implies r^2 = W / (\\pi \\sigma) = 98000 / (3.14159 \\times 10^8) = 3.119 \\times 10^{-4}\\text{ m}^2 \\implies r = 0.01766\\text{ m} = 17.7\\text{ mm}$.',
    hints: [
      'Force F = m * g = 98,000 N.',
      'Area A = F / stress = 9.8 x 10^-4 m².',
      'r = sqrt(A / pi). Convert to mm.',
    ],
  },
  {
    id: 'ch_08_thermal_stress',
    nodeId: NODE_C11_PHY_023,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'A steel rail track is laid rigidly between two fixed concrete walls at temperature $20^\\circ\\text{C}$. When temperature rises to $50^\\circ\\text{C}$ ($\\Delta T = 30^\\circ\\text{C}$), thermal expansion is prevented. Given coefficient of linear expansion $\\alpha = 1.2 \\times 10^{-5}\\text{ K}^{-1}$ and $Y = 200\\text{ GPa}$, calculate the thermal stress in Megapascals (MPa).',
    numericAnswer: 72.0,
    tolerance: 1.0,
    unit: 'MPa',
    explanation: 'Thermal strain $\\epsilon_{\\text{thermal}} = \\alpha \\Delta T = 1.2 \\times 10^{-5} \\times 30 = 3.6 \\times 10^{-4}$. Thermal stress $\\sigma = Y \\cdot \\epsilon_{\\text{thermal}} = 2.0 \\times 10^{11} \\times 3.6 \\times 10^{-4} = 7.2 \\times 10^7\\text{ Pa} = 72.0\\text{ MPa}$.',
    hints: [
      'Thermal strain = alpha * delta T.',
      'Thermal stress = Young Modulus * thermal strain.',
      '7.2 x 10^7 Pa = 72 MPa.',
    ],
  },
  {
    id: 'ch_09_classify_materials',
    nodeId: NODE_C11_PHY_014,
    type: 'classify',
    difficulty: 'foundation',
    question: 'Which of the following stress-strain curve behaviors characterizes a BRITTLE material such as cast iron or glass?',
    options: [
      'Large plastic elongation region between yield point and fracture point.',
      'Extremely close proximity of elastic limit and ultimate breaking point, causing sudden fracture with negligible plastic deformation.',
      'Non-linear elastic hysteresis curve with high work energy dissipation (like rubber).',
      'Continuous plastic flow under zero incremental stress.',
    ],
    correctIndex: 1,
    explanation: 'Brittle materials fracture almost immediately after exceeding their elastic limit without undergoing significant plastic strain or necking.',
    hints: [
      'Think about glass breaking when dropped—does it stretch or snap?',
      'Brittle materials lack a prominent yield region.',
    ],
  },
  {
    id: 'ch_10_i_beam_design',
    nodeId: NODE_C11_PHY_024,
    type: 'classify',
    difficulty: 'standard',
    question: 'Why are structural girders used in bridges and space station trusses designed with an I-shaped cross-section (I-beams)?',
    options: [
      'To maximize the electrical conductivity of the structural beam.',
      'Because bending depression $\\delta \\propto \\frac{1}{b d^3}$. Expanding depth $d$ reduces bending strain while removing material near the neutral axis minimizes weight and prevents buckling.',
      'To prevent sound waves from propagating across the girder.',
      'Because circular cylinders have zero resistance to vertical shear.',
    ],
    correctIndex: 1,
    explanation: 'For a beam supported at ends with load at center, bending depression $\\delta = \\frac{W L^3}{4 Y b d^3}$. Increasing depth $d$ dramatically reduces bending strain. Flanges at top/bottom carry maximum compressive/tensile stress while thin web reduces dead weight.',
    hints: [
      'Recall the bending equation delta = W L^3 / (4 Y b d^3).',
      'The flanges carry load at extreme distances from the neutral axis.',
    ],
  },
];

// ─── INTERACTIVE VISUAL CANVAS SIMULATIONS ───

// Canvas 1: Tensile Tensometer Simulation (Wire elongation under load + live stress-strain plot)
const TensometerLabCanvas: React.FC<{
  material: MaterialProperty;
  loadKg: number;
  wireLengthM: number;
  wireRadiusMm: number;
  onUpdateReadout: (stress: number, strain: number, elongationMm: number, energy: number) => void;
}> = ({ material, loadKg, wireLengthM, wireRadiusMm, onUpdateReadout }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const areaM2 = Math.PI * Math.pow(wireRadiusMm * 1e-3, 2);
    const forceN = loadKg * 9.81;
    const stressPa = forceN / areaM2;
    const stressMPa = stressPa / 1e6;

    // Young modulus in Pa
    const YPa = material.youngModulus * 1e9;
    const strain = stressPa / YPa;
    const elongationM = strain * wireLengthM;
    const elongationMm = elongationM * 1000;
    const energyDensityJm3 = 0.5 * stressPa * strain;

    onUpdateReadout(stressMPa, strain, elongationMm, energyDensityJm3 / 1000);

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Left Panel: Physical Tensometer Wire Visualizer
      const startX = 140;
      const startY = 40;
      const baseWireLength = 180;
      // Visual stretch exaggeration factor for clarity
      const visualElongation = Math.min(elongationMm * 15, 120);
      const currentWireLength = baseWireLength + visualElongation;

      // Rigid Top Ceiling Mount
      ctx.fillStyle = '#475569';
      ctx.fillRect(startX - 50, startY - 20, 100, 20);
      ctx.fillStyle = '#0f172a';
      for (let i = -40; i <= 40; i += 15) {
        ctx.beginPath();
        ctx.moveTo(startX + i, startY - 20);
        ctx.lineTo(startX + i + 10, startY);
        ctx.strokeStyle = '#64748b';
        ctx.stroke();
      }

      // Deformed Wire Visual
      const wireWidth = Math.max(3, Math.min(18, wireRadiusMm * 4));
      // Poisson lateral contraction visualization
      const PoissonWidth = wireWidth * (1 - strain * material.poissonRatio * 10);

      ctx.save();
      ctx.strokeStyle = material.color;
      ctx.lineWidth = PoissonWidth;
      ctx.shadowColor = material.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX, startY + currentWireLength);
      ctx.stroke();
      ctx.restore();

      // Atomic Lattice Inset (Microscopic view)
      const latticeX = 300;
      const latticeY = 120;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.fillRect(latticeX - 70, latticeY - 70, 140, 140);
      ctx.strokeRect(latticeX - 70, latticeY - 70, 140, 140);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('Atomic Lattice Spacing', latticeX - 60, latticeY - 55);

      const spacingY = 22 + strain * 50;
      const spacingX = 22 * (1 - strain * material.poissonRatio * 20);
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          const ax = latticeX + ix * spacingX;
          const ay = latticeY + iy * spacingY;
          // Atom sphere
          ctx.beginPath();
          ctx.arc(ax, ay, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();

          // Interatomic Spring Lines
          if (ix < 1) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax + spacingX, ay);
            ctx.strokeStyle = '#64748b';
            ctx.stroke();
          }
          if (iy < 1) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax, ay + spacingY);
            ctx.strokeStyle = '#f59e0b';
            ctx.stroke();
          }
        }
      }

      // Suspended Mass Weight Load
      const loadY = startY + currentWireLength;
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(startX - 30, loadY, 60, 45);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${loadKg} kg`, startX, loadY + 25);
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(`(${forceN.toFixed(0)} N)`, startX, loadY + 38);

      // Elongation Arrow Indicator
      if (visualElongation > 2) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX + 40, startY + baseWireLength);
        ctx.lineTo(startX + 40, loadY);
        ctx.stroke();
        // Arrow heads
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(startX + 40, loadY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(`+${elongationMm.toFixed(3)} mm`, startX + 75, startY + baseWireLength + visualElongation / 2);
      }

      // Right Panel: Real-time Interactive Stress-Strain Plot
      const plotX = 420;
      const plotY = 240;
      const plotW = 220;
      const plotH = 180;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(plotX, plotY - plotH, plotW, plotH);
      ctx.strokeStyle = '#475569';
      ctx.strokeRect(plotX, plotY - plotH, plotW, plotH);

      // Plot Axes Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Strain ε (×10⁻³)', plotX + plotW / 2, plotY + 18);
      ctx.save();
      ctx.translate(plotX - 15, plotY - plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Stress σ (MPa)', 0, 0);
      ctx.restore();

      // Plot Curve (Hooke's linear region + plastic slope)
      const maxPlotStrain = 0.005;
      const maxPlotStress = material.ultimateStrength * 1.1;

      ctx.beginPath();
      ctx.strokeStyle = material.color;
      ctx.lineWidth = 2;
      ctx.moveTo(plotX, plotY);

      const yieldStrain = (material.yieldStrength * 1e6) / YPa;
      const yieldPxX = plotX + (yieldStrain / maxPlotStrain) * plotW;
      const yieldPxY = plotY - (material.yieldStrength / maxPlotStress) * plotH;

      ctx.lineTo(yieldPxX, yieldPxY);

      // Ultimate tensile point curve
      const ultStrain = yieldStrain * 2.5;
      const ultPxX = plotX + (ultStrain / maxPlotStrain) * plotW;
      const ultPxY = plotY - (material.ultimateStrength / maxPlotStress) * plotH;
      ctx.quadraticCurveTo((yieldPxX + ultPxX) / 2, yieldPxY - 15, ultPxX, ultPxY);
      ctx.stroke();

      // Current Operating Point Dot
      const currentPxX = Math.min(plotX + (strain / maxPlotStrain) * plotW, plotX + plotW);
      const currentPxY = Math.max(plotY - (stressMPa / maxPlotStress) * plotH, plotY - plotH);

      ctx.beginPath();
      ctx.arc(currentPxX, currentPxY, 5, 0, Math.PI * 2);
      ctx.fillStyle = stressMPa > material.yieldStrength ? '#ef4444' : '#10b981';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Warning indicator if past yield strength
      if (stressMPa > material.yieldStrength) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('⚠️ PLASTIC DEFORMATION / YIELD!', plotX, plotY - plotH - 10);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [material, loadKg, wireLengthM, wireRadiusMm, onUpdateReadout]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
      <canvas ref={canvasRef} width={680} height={280} className="w-full h-auto block" />
    </div>
  );
};

// Canvas 2: Shear Torsion & Tangential Stress Visualizer
const ShearLabCanvas: React.FC<{
  tangentialForceN: number;
  blockAreaM2: number;
  blockHeightM: number;
  shearModulusGPa: number;
}> = ({ tangentialForceN, blockAreaM2, blockHeightM, shearModulusGPa }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const shearStressPa = tangentialForceN / blockAreaM2;
    const GPa = shearModulusGPa * 1e9;
    const shearAngleRad = shearStressPa / GPa; // theta = tau / G
    const deltaXm = blockHeightM * shearAngleRad;
    const deltaXmm = deltaXm * 1000;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground Anchor Platform
      ctx.fillStyle = '#334155';
      ctx.fillRect(100, 220, 480, 25);
      // Hatch lines
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;
      for (let x = 110; x < 570; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 245);
        ctx.lineTo(x + 10, 220);
        ctx.stroke();
      }

      // Block Deformed Parallelogram
      const baseX = 240;
      const baseY = 220;
      const width = 200;
      const height = 130;
      // Visual shift factor
      const visualShift = Math.min(deltaXmm * 40, 90);

      const botL = { x: baseX, y: baseY };
      const botR = { x: baseX + width, y: baseY };
      const topL = { x: baseX + visualShift, y: baseY - height };
      const topR = { x: baseX + width + visualShift, y: baseY - height };

      // Original Undeformed Outline (dashed)
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#475569';
      ctx.strokeRect(baseX, baseY - height, width, height);
      ctx.setLineDash([]);

      // Sheared Solid Body Fill
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(botL.x, botL.y);
      ctx.lineTo(botR.x, botR.y);
      ctx.lineTo(topR.x, topR.y);
      ctx.lineTo(topL.x, topL.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tangential Shear Force Arrow Vectors
      const arrowY = topL.y;
      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(topL.x, arrowY);
      ctx.lineTo(topL.x + width + 50, arrowY);
      ctx.stroke();
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(topL.x + width + 50, arrowY - 6);
      ctx.lineTo(topL.x + width + 64, arrowY);
      ctx.lineTo(topL.x + width + 50, arrowY + 6);
      ctx.fill();

      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`F_tangential = ${tangentialForceN.toLocaleString()} N`, topL.x + width / 2 - 20, arrowY - 12);

      // Angle of Shear Arc θ
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(baseX, baseY, 40, -Math.PI / 2, -Math.PI / 2 + Math.min(shearAngleRad * 200, Math.PI / 4), false);
      ctx.stroke();
      ctx.fillStyle = '#ec4899';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(`θ = ${(shearAngleRad * 1000).toFixed(3)} mrad`, baseX + 10, baseY - 45);

      // Displacement Readout
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`Lateral Shift Δx: ${deltaXmm.toFixed(4)} mm`, 440, 60);
      ctx.fillText(`Shear Stress τ: ${(shearStressPa / 1e6).toFixed(2)} MPa`, 440, 80);
      ctx.fillText(`Shear Modulus G: ${shearModulusGPa} GPa`, 440, 100);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [tangentialForceN, blockAreaM2, blockHeightM, shearModulusGPa]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
      <canvas ref={canvasRef} width={680} height={270} className="w-full h-auto block" />
    </div>
  );
};

// Interactive SVG Diagram 1: Stress-Strain Interactive Curve Diagram
const StressStrainSVGDiagram: React.FC<{ activePoint: string; onSelectPoint: (pt: string) => void }> = ({
  activePoint,
  onSelectPoint,
}) => {
  const points = [
    { id: 'O', label: 'Origin (0,0)', x: 40, y: 240, desc: 'Zero initial stress and zero initial strain.' },
    { id: 'P', label: 'Proportional Limit (P)', x: 120, y: 140, desc: 'Hooke\'s Law holds strictly linear (Stress = Y × Strain).' },
    { id: 'E', label: 'Elastic Limit / Yield Point (E)', x: 160, y: 110, desc: 'Maximum stress from which material returns to initial shape without permanent set.' },
    { id: 'Y', label: 'Yield Stress (S_y)', x: 200, y: 100, desc: 'Material yields and begins continuous plastic flow without additional load.' },
    { id: 'U', label: 'Ultimate Tensile Strength (U)', x: 310, y: 50, desc: 'Maximum load carrying capacity per unit area. Necking begins here.' },
    { id: 'F', label: 'Fracture / Breaking Point (F)', x: 380, y: 90, desc: 'The material ruptures or snaps apart.' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-sky-400">Interactive Stress-Strain Curve Explorer</h4>
        <span className="text-xs text-slate-400">Click points to inspect physical mechanisms</span>
      </div>

      <svg viewBox="0 0 450 270" className="w-full h-auto bg-slate-950 rounded-lg">
        {/* Grid lines */}
        <line x1="40" y1="240" x2="420" y2="240" stroke="#334155" strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="240" stroke="#334155" strokeWidth="2" />
        <text x="230" y="265" fill="#94a3b8" fontSize="11" textAnchor="middle">Strain ε →</text>
        <text x="15" y="130" fill="#94a3b8" fontSize="11" transform="rotate(-90 15 130)" textAnchor="middle">Stress σ →</text>

        {/* Shaded Regions */}
        {/* Elastic region */}
        <path d="M 40,240 L 160,110 L 160,240 Z" fill="rgba(16, 185, 129, 0.15)" />
        <text x="90" y="220" fill="#10b981" fontSize="10" fontWeight="bold">Elastic Region</text>

        {/* Plastic region */}
        <path d="M 160,240 L 160,110 Q 250,40 310,50 Q 350,60 380,90 L 380,240 Z" fill="rgba(239, 68, 68, 0.12)" />
        <text x="260" y="220" fill="#f87171" fontSize="10" fontWeight="bold">Plastic Strain Region</text>

        {/* Curve Path */}
        <path
          d="M 40,240 L 120,140 Q 140,120 160,110 Q 200,105 310,50 Q 350,60 380,90"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3.5"
        />

        {/* Permanent set dashed line */}
        <path d="M 170,112 L 210,240" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="215" y="235" fill="#f59e0b" fontSize="9">Permanent Set</text>

        {/* Interactive Point Markers */}
        {points.map((pt) => {
          const isSelected = activePoint === pt.id;
          return (
            <g key={pt.id} onClick={() => onSelectPoint(pt.id)} className="cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isSelected ? 8 : 5}
                fill={isSelected ? '#f59e0b' : '#38bdf8'}
                stroke="#ffffff"
                strokeWidth={isSelected ? 2.5 : 1.5}
                className="transition-all hover:scale-125"
              />
              <text
                x={pt.x + (pt.id === 'U' || pt.id === 'F' ? -10 : 8)}
                y={pt.y - 10}
                fill={isSelected ? '#fbbf24' : '#e2e8f0'}
                fontSize="11"
                fontWeight="bold"
              >
                {pt.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Selected Point Explanation Banner */}
      <AnimatePresence mode="wait">
        {activePoint && (
          <motion.div
            key={activePoint}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-3 p-3 bg-slate-800 border border-sky-500/40 rounded-lg text-xs"
          >
            <span className="font-bold text-sky-400">
              {points.find((p) => p.id === activePoint)?.label}:{' '}
            </span>
            <span className="text-slate-200">
              {points.find((p) => p.id === activePoint)?.desc}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// SVG Diagram 2: Structural I-Beam Bending Stress Distribution
const IBeamBendingSVGDiagram: React.FC<{ loadN: number }> = ({ loadN }) => {
  const depressionMm = (loadN / 5000) * 12;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <h4 className="text-sm font-semibold text-amber-400 mb-2">Structural Beam Bending & I-Beam Optimization</h4>
      <svg viewBox="0 0 500 220" className="w-full h-auto bg-slate-950 rounded-lg">
        {/* Left & Right Supports */}
        <polygon points="40,160 25,190 55,190" fill="#64748b" />
        <polygon points="440,160 425,190 455,190" fill="#64748b" />
        <rect x="15" y="190" width="50" height="8" fill="#334155" />
        <rect x="415" y="190" width="50" height="8" fill="#334155" />

        {/* Curved Bent Beam */}
        <path
          d={`M 40,150 Q 240,${150 + depressionMm} 440,150`}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Neutral Axis (Dashed red line) */}
        <path
          d={`M 40,150 Q 240,${150 + depressionMm} 440,150`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Top Compression Arrows */}
        <text x="240" y="110" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">
          COMPRESSION (Top Surface)
        </text>

        {/* Bottom Tension Arrows */}
        <text x="240" y={175 + depressionMm} fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">
          TENSION (Bottom Surface)
        </text>

        {/* Load Force Vector */}
        <line x1="240" y1="40" x2="240" y2="120" stroke="#f59e0b" strokeWidth="3" />
        <polygon points="240,130 234,118 246,118" fill="#f59e0b" />
        <text x="240" y="32" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">
          Load W = {loadN} N
        </text>

        {/* Right Inset: Cross Section of I-Beam */}
        <g transform="translate(360, 25)">
          <rect x="0" y="0" width="90" height="80" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" strokeWidth="1" rx="4" />
          <text x="45" y="14" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">I-Beam Profile</text>
          {/* Top Flange */}
          <rect x="15" y="22" width="60" height="10" fill="#94a3b8" />
          {/* Vertical Web */}
          <rect x="40" y="32" width="10" height="30" fill="#64748b" />
          {/* Bottom Flange */}
          <rect x="15" y="62" width="60" height="10" fill="#94a3b8" />
        </g>
      </svg>
      <div className="mt-2 text-xs text-slate-300">
        {'Bending Depression equation: $\delta = \frac{W L^3}{4 Y b d^3}$. Increasing flange depth $d$ minimizes bending strain efficiently!'}
      </div>
    </div>
  );
};

// SVG Diagram 3: Bulk Modulus Hydraulic Compression Visualizer
const BulkModulusSVGDiagram: React.FC<{ pressureAtm: number; volumeRatio: number }> = ({ pressureAtm, volumeRatio }) => {
  const currentRadius = 65 * Math.cbrt(volumeRatio);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <h4 className="text-sm font-semibold text-emerald-400 mb-2">{'Hydraulic Volumetric Compression ($K = -V \frac{\Delta P}{\Delta V}$)'}</h4>
      <svg viewBox="0 0 450 200" className="w-full h-auto bg-slate-950 rounded-lg">
        {/* Pressure Vessel Chamber */}
        <circle cx="225" cy="100" r="90" fill="rgba(14, 165, 233, 0.1)" stroke="#0284c7" strokeWidth="3" />

        {/* Inward Uniform Hydrostatic Pressure Arrows */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 225 + 85 * Math.cos(rad);
          const y1 = 100 + 85 * Math.sin(rad);
          const x2 = 225 + (currentRadius + 8) * Math.cos(rad);
          const y2 = 100 + (currentRadius + 8) * Math.sin(rad);
          return (
            <g key={angle}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="2" />
              <circle cx={x2} cy={y2} r="3" fill="#38bdf8" />
            </g>
          );
        })}

        {/* Initial Uncompressed Sphere (dashed) */}
        <circle cx="225" cy="100" r="65" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Deformed Compressed Solid Sphere */}
        <circle cx="225" cy="100" r={currentRadius} fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="2.5" />

        <text x="225" y="96" fill="#f8fafc" fontSize="11" textAnchor="middle" fontWeight="bold">
          Compressed Solid
        </text>

        <text x="225" y="114" fill="#10b981" fontSize="10" textAnchor="middle">
          Volume V = {(volumeRatio * 100).toFixed(2)}%
        </text>

        {/* Hydraulic Readout */}
        <rect x="20" y="20" width="130" height="50" fill="rgba(15, 23, 42, 0.85)" stroke="#334155" rx="6" />
        <text x="30" y="40" fill="#94a3b8" fontSize="10">Applied Pressure:</text>
        <text x="30" y="58" fill="#38bdf8" fontSize="12" fontWeight="bold">
          {pressureAtm} atm ({(pressureAtm * 0.1013).toFixed(1)} MPa)
        </text>
      </svg>
    </div>
  );
};

// ─── MAIN COMPONENT EXPORT ───
export default function C11_PhysicsMechanicalPropertiesSolidsCBSESim() {
  // Navigation & Game State
  const [activeTab, setActiveTab] = useState<'predict' | 'theory' | 'lab' | 'challenges' | 'applications'>('predict');
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('steel');
  const [activeStressPoint, setActiveStressPoint] = useState<string>('P');

  // Lab Parameter Sliders
  const [loadKg, setLoadKg] = useState<number>(500); // 500 kg
  const [wireLengthM, setWireLengthM] = useState<number>(2.0); // 2 m
  const [wireRadiusMm, setWireRadiusMm] = useState<number>(1.5); // 1.5 mm
  const [tangentialForceN, setTangentialForceN] = useState<number>(150000); // 150 kN
  const [hydraulicPressureAtm, setHydraulicPressureAtm] = useState<number>(500); // 500 atm
  const [beamLoadN, setBeamLoadN] = useState<number>(3000); // 3000 N

  // Live Readouts from Tensometer Lab
  const [tensometerReadout, setTensometerReadout] = useState({
    stressMPa: 0,
    strain: 0,
    elongationMm: 0,
    energyDensitykJm3: 0,
  });

  // Discovery Question State
  const [predictSelected, setPredictSelected] = useState<number | null>(null);
  const [predictSubmitted, setPredictSubmitted] = useState<boolean>(false);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, number | string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<Record<string, { isCorrect: boolean; msg: string }>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT & Mastery State Management
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    return initialMap;
  });

  const activeMaterial = MATERIALS[selectedMaterialId] || MATERIALS.steel;

  // Real-time calculated properties
  const calculatedVolumeRatio = useMemo(() => {
    const deltaPPa = hydraulicPressureAtm * 101325;
    const KPa = activeMaterial.bulkModulus * 1e9;
    const deltaV_V = deltaPPa / KPa;
    return Math.max(0.7, 1 - deltaV_V);
  }, [hydraulicPressureAtm, activeMaterial]);

  // Handle Tensometer Canvas Callback
  const handleTensometerUpdate = useCallback(
    (stressMPa: number, strain: number, elongationMm: number, energyDensitykJm3: number) => {
      setTensometerReadout({ stressMPa, strain, elongationMm, energyDensitykJm3 });
    },
    []
  );

  // Discovery Question Handler
  const handlePredictSubmit = (optionIndex: number) => {
    setPredictSelected(optionIndex);
    setPredictSubmitted(true);
    if (optionIndex === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Spot on! Steel has a far greater Young Modulus than rubber, making it much more elastic in physics!');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Common intuition misleads us! Rubber stretches easily, but steel exerts far stronger internal restoring stress.');
    }
  };

  // Auto-hint Timer (10 seconds of inactivity in challenges)
  useEffect(() => {
    if (activeTab === 'challenges' && !showHint) {
      const timer = setTimeout(() => {
        setShowHint(true);
        audioManager.play('hint');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [activeTab, currentChallengeIndex, showHint]);

  // Challenge Submission Handler
  const handleChallengeSubmit = (ch: Challenge, val: number | string) => {
    let isCorrect = false;

    if (ch.type === 'numeric' && typeof val === 'number') {
      const target = ch.numericAnswer!;
      const tol = ch.tolerance || 0.1;
      isCorrect = Math.abs(val - target) <= tol;
    } else if (typeof val === 'number') {
      isCorrect = val === ch.correctIndex;
    }

    // Audio & Audio Speech feedback
    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Excellent calculation! Mastery demonstrated.');
      setShowConfetti(true);
      setShowSparkle(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite right. Review the formula parameters and try again.');
    }

    setChallengeFeedback((prev) => ({
      ...prev,
      [ch.id]: {
        isCorrect,
        msg: isCorrect
          ? `Correct! ${ch.explanation}`
          : `Incorrect. Try reviewing the hints. (${ch.explanation})`,
      },
    }));

    // BKT & SRS Memory Updates
    setBktStates((prev) => {
      const currentState = prev[ch.nodeId] || createBKTState();
      const updatedState = bktUpdate(currentState, isCorrect);
      return { ...prev, [ch.nodeId]: updatedState };
    });

    // SRS Spaced Repetition Item Update (2 args for createReviewItem, 3 args for sm2Update)
    const reviewItem = createReviewItem(ch.nodeId, 'Mechanical Properties of Solids');
    const qualityScore = isCorrect ? 5 : 2;
    sm2Update(reviewItem, qualityScore, 0);

    // Record Overall Game Score across ALL Node IDs
    const totalScore = Object.values(challengeFeedback).filter((f) => f.isCorrect).length * 10;
    recordGameScore(ALL_NODE_IDS, totalScore);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6">
      <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex]?.hints[0] || 'Observe physical relationships!'} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Physics Mastery Unlocked!" />
      <SparkleBurst show={showSparkle} x={300} y={200} />

      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">CBSE Class 11 Physics • Chapter 9</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-50 flex items-center gap-2">
             Mechanical Properties of Solids
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">{SCENARIO.title}</p>
        </div>

        {/* Global Nav Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {[
            { id: 'predict', label: '1. Discovery' },
            { id: 'theory', label: '2. Concepts (5)' },
            { id: 'lab', label: '3. Virtual Lab' },
            { id: 'challenges', label: '4. Challenges (10)' },
            { id: 'applications', label: '5. Real-World' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto">
        {/* TAB 1: DISCOVERY PREDICT */}
        {activeTab === 'predict' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-semibold mb-3">
                Predict Before You Learn
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">{SCENARIO.intro}</h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => {
                  const isSelected = predictSelected === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  let cardStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500';

                  if (predictSubmitted) {
                    if (isCorrect) cardStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium';
                    else if (isSelected) cardStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !predictSubmitted && handlePredictSubmit(idx)}
                      disabled={predictSubmitted}
                      className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start gap-3 ${cardStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {predictSubmitted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-800 border border-sky-500/30 rounded-xl text-xs md:text-sm text-slate-300">
                  <span className="font-bold text-sky-400">Physics Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setActiveTab('theory');
                        audioManager.play('whoosh');
                      }}
                      className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded-lg hover:bg-sky-400 text-xs"
                    >
                      Proceed to Visual Theory →
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: VISUAL THEORY LESSONS */}
        {activeTab === 'theory' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-semibold">
                Lesson {slideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={slideIndex === 0}
                  onClick={() => {
                    setSlideIndex((prev) => prev - 1);
                    audioManager.play('tap');
                  }}
                  className="px-3 py-1 bg-slate-800 rounded text-xs font-bold disabled:opacity-40"
                >
                  ← Prev
                </button>
                <button
                  disabled={slideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setSlideIndex((prev) => prev + 1);
                    audioManager.play('tap');
                  }}
                  className="px-3 py-1 bg-sky-500 text-slate-950 rounded text-xs font-bold disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Slide Content Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-sky-400 tracking-wide uppercase">
                    {TEACHING_SLIDES[slideIndex].concept}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 mt-1 mb-4">
                    {TEACHING_SLIDES[slideIndex].title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line mb-4">
                    {TEACHING_SLIDES[slideIndex].explanation}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-300">
                    {TEACHING_SLIDES[slideIndex].math}
                  </div>
                  <div className="p-3 bg-sky-950/40 border border-sky-500/30 rounded-lg text-xs text-sky-200">
                    <span className="font-bold">Key Takeaway: </span>
                    {TEACHING_SLIDES[slideIndex].keyTakeaway}
                  </div>
                </div>
              </div>

              {/* Dynamic Diagram for Slide */}
              <div>
                {slideIndex === 0 && (
                  <TensometerLabCanvas
                    material={activeMaterial}
                    loadKg={loadKg}
                    wireLengthM={wireLengthM}
                    wireRadiusMm={wireRadiusMm}
                    onUpdateReadout={handleTensometerUpdate}
                  />
                )}
                {slideIndex === 1 && (
                  <StressStrainSVGDiagram
                    activePoint={activeStressPoint}
                    onSelectPoint={(pt) => setActiveStressPoint(pt)}
                  />
                )}
                {slideIndex === 2 && (
                  <ShearLabCanvas
                    tangentialForceN={tangentialForceN}
                    blockAreaM2={0.01}
                    blockHeightM={0.1}
                    shearModulusGPa={activeMaterial.shearModulus}
                  />
                )}
                {slideIndex === 3 && (
                  <StressStrainSVGDiagram
                    activePoint={activeStressPoint}
                    onSelectPoint={(pt) => setActiveStressPoint(pt)}
                  />
                )}
                {slideIndex === 4 && <IBeamBendingSVGDiagram loadN={beamLoadN} />}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: VIRTUAL PHYSICS LAB */}
        {activeTab === 'lab' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">ISRO Mechanical Tensometer & Rigidity Testing Bench</h3>
                  <p className="text-xs text-slate-400">Manipulate material properties, dimensions, and loads to observe real-time strain deformation.</p>
                </div>

                {/* Material Selector Buttons */}
                <div className="flex flex-wrap gap-2">
                  {Object.values(MATERIALS).map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => {
                        setSelectedMaterialId(mat.id);
                        audioManager.play('pop');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedMaterialId === mat.id
                          ? 'bg-sky-500 text-slate-950 shadow-md'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {mat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lab Visualizer Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Interactive Canvas */}
                <div className="lg:col-span-2 space-y-4">
                  <TensometerLabCanvas
                    material={activeMaterial}
                    loadKg={loadKg}
                    wireLengthM={wireLengthM}
                    wireRadiusMm={wireRadiusMm}
                    onUpdateReadout={handleTensometerUpdate}
                  />

                  {/* Dynamic Readouts Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tensile Stress (σ)</span>
                      <span className="text-base font-bold text-sky-400">{tensometerReadout.stressMPa.toFixed(2)} MPa</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Longitudinal Strain (ε)</span>
                      <span className="text-base font-bold text-amber-400">{(tensometerReadout.strain * 1000).toFixed(3)} × 10⁻³</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Elongation (ΔL)</span>
                      <span className="text-base font-bold text-emerald-400">{tensometerReadout.elongationMm.toFixed(3)} mm</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Energy Density (u)</span>
                      <span className="text-base font-bold text-purple-400">{tensometerReadout.energyDensitykJm3.toFixed(2)} kJ/m³</span>
                    </div>
                  </div>
                </div>

                {/* Right 1 Col: Controls Panel */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-5">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Parameter Controls</h4>

                  {/* Load Mass Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Tensile Mass Load:</span>
                      <span className="font-bold text-amber-400">{loadKg} kg ({(loadKg * 9.81).toFixed(0)} N)</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="3000"
                      step="10"
                      value={loadKg}
                      onChange={(e) => setLoadKg(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  {/* Wire Length Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Initial Wire Length (L₀):</span>
                      <span className="font-bold text-sky-400">{wireLengthM.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={wireLengthM}
                      onChange={(e) => setWireLengthM(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  {/* Wire Radius Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Wire Radius (r):</span>
                      <span className="font-bold text-emerald-400">{wireRadiusMm.toFixed(2)} mm</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={wireRadiusMm}
                      onChange={(e) => setWireRadiusMm(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  {/* Material Specs Summary Card */}
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1.5 text-slate-300">
                    <div className="font-bold text-slate-100 border-b border-slate-800 pb-1">{activeMaterial.name} Specs</div>
                    <div className="flex justify-between"><span>Young's Modulus Y:</span> <span className="font-mono text-sky-300">{activeMaterial.youngModulus} GPa</span></div>
                    <div className="flex justify-between"><span>Shear Modulus G:</span> <span className="font-mono text-amber-300">{activeMaterial.shearModulus} GPa</span></div>
                    <div className="flex justify-between"><span>Bulk Modulus K:</span> <span className="font-mono text-emerald-300">{activeMaterial.bulkModulus} GPa</span></div>
                    <div className="flex justify-between"><span>Poisson's Ratio ν:</span> <span className="font-mono text-purple-300">{activeMaterial.poissonRatio}</span></div>
                    <div className="flex justify-between"><span>Yield Strength:</span> <span className="font-mono text-rose-300">{activeMaterial.yieldStrength} MPa</span></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: 10 PROGRESSIVE CHALLENGES */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Mission Diagnostic {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
                  <h3 className="text-xl font-bold text-slate-100 mt-1">
                    {CHALLENGES[currentChallengeIndex].question}
                  </h3>
                </div>

                {/* Challenge Navigation Dots */}
                <div className="flex gap-1.5">
                  {CHALLENGES.map((ch, idx) => {
                    const fb = challengeFeedback[ch.id];
                    let dotColor = 'bg-slate-800 border-slate-700';
                    if (fb) dotColor = fb.isCorrect ? 'bg-emerald-500 border-emerald-400' : 'bg-rose-500 border-rose-400';
                    else if (idx === currentChallengeIndex) dotColor = 'bg-sky-500 ring-2 ring-sky-400';

                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setCurrentChallengeIndex(idx);
                          setShowHint(false);
                          audioManager.play('tap');
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold border flex items-center justify-center transition-all ${dotColor}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Challenge Body */}
              {(() => {
                const ch = CHALLENGES[currentChallengeIndex];
                const fb = challengeFeedback[ch.id];

                return (
                  <div className="space-y-6">
                    {/* Classify / Option-based challenges */}
                    {ch.options && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ch.options.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleChallengeSubmit(ch, optIdx)}
                            className="p-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 hover:border-sky-500 text-left text-xs md:text-sm text-slate-200 transition-all flex items-start gap-3"
                          >
                            <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{option}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Numeric Input challenges */}
                    {ch.type === 'numeric' && (
                      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                        <label className="text-xs md:text-sm text-slate-300 font-medium">Enter calculated value ({ch.unit}):</label>
                        <input
                          type="number"
                          step="any"
                          placeholder="e.g. 2.0"
                          value={challengeAnswers[ch.id] || ''}
                          onChange={(e) => setChallengeAnswers({ ...challengeAnswers, [ch.id]: e.target.value })}
                          className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-sky-500 w-full md:w-48"
                        />
                        <button
                          onClick={() => handleChallengeSubmit(ch, parseFloat(String(challengeAnswers[ch.id])))}
                          className="px-6 py-2.5 bg-sky-500 text-slate-950 font-bold rounded-lg hover:bg-sky-400 text-xs md:text-sm transition-all"
                        >
                          Verify Calculation
                        </button>
                      </div>
                    )}

                    {/* Feedback Banner */}
                    <AnimatePresence>
                      {fb && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl border text-xs md:text-sm ${
                            fb.isCorrect ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-rose-950/60 border-rose-500 text-rose-200'
                          }`}
                        >
                          {fb.msg}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* TAB 5: REAL-WORLD APPLICATIONS & MISCONCEPTIONS */}
        {activeTab === 'applications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Misconception Checklist Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                ⚠️ Key CBSE Physics Misconceptions & Corrections
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {MISCONCEPTIONS_CHECKLIST.map((misc) => (
                  <div key={misc.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-start gap-2 text-xs md:text-sm font-semibold text-rose-400">
                      <span>❌ Myth:</span>
                      <span>"{misc.statement}"</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs md:text-sm text-emerald-300">
                      <span>✅ Truth:</span>
                      <span>{misc.truth}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-900">
                      {misc.physicsContext}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Engineering Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BulkModulusSVGDiagram pressureAtm={hydraulicPressureAtm} volumeRatio={calculatedVolumeRatio} />
              <IBeamBendingSVGDiagram loadN={beamLoadN} />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}