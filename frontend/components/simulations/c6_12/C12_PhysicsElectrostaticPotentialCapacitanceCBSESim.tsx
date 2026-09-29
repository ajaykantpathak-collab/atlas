'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_PHY_CBSE_001 = 'c12_phy_cbse_001'; // Electrostatic Potential due to Point Charge
const NODE_C12_PHY_CBSE_002 = 'c12_phy_cbse_002'; // Potential Difference & Work Done
const NODE_C12_PHY_CBSE_003 = 'c12_phy_cbse_003'; // Electric Potential due to Dipole
const NODE_C12_PHY_CBSE_004 = 'c12_phy_cbse_004'; // Equipotential Surfaces
const NODE_C12_PHY_CBSE_005 = 'c12_phy_cbse_005'; // E = -dV/dr Relation
const NODE_C12_PHY_CBSE_006 = 'c12_phy_cbse_006'; // Potential Energy of Point Charges System
const NODE_C12_PHY_CBSE_007 = 'c12_phy_cbse_007'; // Potential Energy of Dipole in External Field
const NODE_C12_PHY_CBSE_008 = 'c12_phy_cbse_008'; // Conductors & Electrostatic Shielding
const NODE_C12_PHY_CBSE_009 = 'c12_phy_cbse_009'; // Dielectrics & Polarisation
const NODE_C12_PHY_CBSE_010 = 'c12_phy_cbse_010'; // Electric Susceptibility & Dielectric Constant
const NODE_C12_PHY_CBSE_011 = 'c12_phy_cbse_011'; // Capacitance Concept (Q = CV)
const NODE_C12_PHY_CBSE_012 = 'c12_phy_cbse_012'; // Parallel Plate Capacitor Formula
const NODE_C12_PHY_CBSE_013 = 'c12_phy_cbse_013'; // Dielectric Slab Insertion
const NODE_C12_PHY_CBSE_014 = 'c12_phy_cbse_014'; // Conducting Slab Insertion
const NODE_C12_PHY_CBSE_015 = 'c12_phy_cbse_015'; // Series Combination of Capacitors
const NODE_C12_PHY_CBSE_016 = 'c12_phy_cbse_016'; // Parallel Combination of Capacitors
const NODE_C12_PHY_CBSE_017 = 'c12_phy_cbse_017'; // Energy Stored in Capacitor
const NODE_C12_PHY_CBSE_018 = 'c12_phy_cbse_018'; // Energy Density of Electric Field
const NODE_C12_PHY_CBSE_019 = 'c12_phy_cbse_019'; // Redistribution of Charge & Energy Loss
const NODE_C12_PHY_CBSE_020 = 'c12_phy_cbse_020'; // Van de Graaff Generator Working
const NODE_C12_PHY_CBSE_021 = 'c12_phy_cbse_021'; // High Voltage Applications & Breakdown

const ALL_NODE_IDS = [
  NODE_C12_PHY_CBSE_001,
  NODE_C12_PHY_CBSE_002,
  NODE_C12_PHY_CBSE_003,
  NODE_C12_PHY_CBSE_004,
  NODE_C12_PHY_CBSE_005,
  NODE_C12_PHY_CBSE_006,
  NODE_C12_PHY_CBSE_007,
  NODE_C12_PHY_CBSE_008,
  NODE_C12_PHY_CBSE_009,
  NODE_C12_PHY_CBSE_010,
  NODE_C12_PHY_CBSE_011,
  NODE_C12_PHY_CBSE_012,
  NODE_C12_PHY_CBSE_013,
  NODE_C12_PHY_CBSE_014,
  NODE_C12_PHY_CBSE_015,
  NODE_C12_PHY_CBSE_016,
  NODE_C12_PHY_CBSE_017,
  NODE_C12_PHY_CBSE_018,
  NODE_C12_PHY_CBSE_019,
  NODE_C12_PHY_CBSE_020,
  NODE_C12_PHY_CBSE_021,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: AstroSat High-Voltage Charge Storage Diagnostic',
  intro: 'You are the Lead Electrostatic Systems Engineer at ISRO. AstroSat’s high-energy ion analyzer and particle acceleration grids require calibrated potential landscapes, ultra-stable dielectric capacitors, and high-voltage Van de Graaff accelerators.',
  context: 'Map electric potential topographies, insert dielectric medium slabs, construct energy-storing capacitor networks, and prevent dielectric air breakdown in space payloads.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A parallel plate capacitor is charged by a 12 V battery and then DISCONNECTED from the battery. A dielectric slab of constant K = 4 is now inserted between the plates. What happens to the energy stored in the capacitor?',
  options: [
    'Energy increases 4 times because capacitance increases.',
    'Energy decreases to 1/4 of its initial value because work is done by electrostatic attraction on the slab.',
    'Energy remains unchanged because charge is conserved.',
    'Energy drops to zero due to dielectric dissipation.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Charge Q stays fixed when disconnected ($Q = \text{const}$). Stored energy $U = \frac{Q^2}{2C}$. Since $C$ increases by factor $K$, $U$ must decrease!',
};

// ─── TEACHING SLIDES ───
const TEACHING_SLIDES = [
  {
    title: '1. Electrostatic Potential & Equipotential Surfaces',
    visualType: 'field_map',
    content: 'Electrostatic potential $V$ at a distance $r$ from charge $Q$ is $V = \frac{1}{4\pi\varepsilon_0} \frac{Q}{r}$. Equipotential surfaces are surfaces of constant potential. Electric field lines are ALWAYS perpendicular to equipotential surfaces, pointing from higher to lower potential ($E = -\frac{dV}{dr}$). Zero work is done moving a charge along an equipotential surface!',
    formula: 'V = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{r}, \\quad \\vec{E} = -\\nabla V',
  },
  {
    title: '2. Potential Energy & Dipoles',
    visualType: 'dipole_energy',
    content: 'The potential energy of a two-charge system is $U = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r_{12}}$. For an electric dipole $\\vec{p}$ in an external field $\\vec{E}$, the potential energy is $U = -\\vec{p} \\cdot \\vec{E} = -p E \\cos\\theta$. Stable equilibrium occurs at $\\theta = 0^\\circ$ ($U_{\\text{min}} = -pE$), while unstable equilibrium occurs at $\\theta = 180^\\circ$ ($U_{\\text{max}} = +pE$).',
    formula: 'U = -\\vec{p} \\cdot \\vec{E} = -p E \\cos\\theta',
  },
  {
    title: '3. Parallel Plate Capacitance & Dielectrics',
    visualType: 'capacitor_sim',
    content: 'Capacitance $C = \\frac{Q}{V}$. For a parallel plate capacitor in vacuum, $C_0 = \\frac{\\varepsilon_0 A}{d}$. When a dielectric of relative permittivity $K$ completely fills the gap, bound surface charges lower the net electric field ($E = E_0 / K$), causing $C = K C_0$. Electric susceptibility $\\chi_e = K - 1$.',
    formula: 'C = \\frac{K \\varepsilon_0 A}{d}, \\quad E_{net} = E_0 - E_p = \\frac{E_0}{K}',
  },
  {
    title: '4. Capacitor Networks & Energy Redistribution',
    visualType: 'circuits',
    content: 'In Series: $\\frac{1}{C_{eq}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots$ (Same charge $Q$). In Parallel: $C_{eq} = C_1 + C_2 + \\dots$ (Same potential $V$). Energy stored $U = \\frac{1}{2} C V^2 = \\frac{1}{2} Q V = \\frac{Q^2}{2C}$. When two charged capacitors are connected, charge flows until potentials equalize, resulting in energy loss as heat/radiation: $\\Delta U = \\frac{C_1 C_2}{2(C_1+C_2)} (V_1 - V_2)^2$.',
    formula: 'U = \\frac{1}{2} C V^2 = \\frac{1}{2} \\varepsilon_0 E^2 (\\text{Volume})',
  },
  {
    title: '5. Van de Graaff Generator & Electrostatic Shielding',
    visualType: 'vande_graaff',
    content: 'Inside a hollow conductor, $E = 0$ and $V = \\text{constant} = V_{\\text{surface}}$. This is electrostatic shielding! In a Van de Graaff generator, charge transferred to an inner hollow sphere flows entirely to the outer surface, building voltages up to millions of volts until dielectric breakdown of air ($E_{\\text{max}} \\approx 3 \\times 10^6 \\text{ V/m}$) produces corona discharge.',
    formula: 'V_{\\text{inner}} - V_{\\text{outer}} = \\frac{q}{4\\pi\\varepsilon_0} \\left( \\frac{1}{r} - \\frac{1}{R} \\right) > 0',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'numeric' | 'drag-label' | 'multiple-choice';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 10 DETAILED CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_equipotential_work',
    nodeId: NODE_C12_PHY_CBSE_004,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A charge of +5 µC is moved across a surface where the potential is everywhere constant at +50 V. How much work is performed by the electrostatic field?',
    options: [
      '250 µJ',
      '0 J',
      '-250 µJ',
      '50 µJ',
    ],
    correctIndex: 1,
    explanation: 'Work done $W = -q \\Delta V$. Since the potential is uniform on an equipotential surface, $\\Delta V = 0$, so $W = 0$.',
    hints: [
      'What is $\\Delta V$ between two points on the exact same equipotential surface?',
      'Recall $W_{ext} = q (V_f - V_i)$.',
      'When $V_f = V_i$, no work is done by or against the electric field.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_field_potential_rel',
    nodeId: NODE_C12_PHY_CBSE_005,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In a region of space, the potential varies along the x-axis as $V(x) = 4x^2 - 3x$ (in Volts). Calculate the magnitude of the electric field at $x = 2\\text{ m}$.',
    correctAnswer: 13,
    tolerance: 0.2,
    unit: 'V/m',
    explanation: '$E_x = -\\frac{dV}{dx} = -(8x - 3)$. At $x = 2$, $E_x = -(8(2)-3) = -13\\text{ V/m}$. Magnitude is 13 V/m.',
    hints: [
      'Use the differential relation $E = -\\frac{dV}{dx}$.',
      'Differentiate $4x^2 - 3x$ with respect to $x$ to get $8x - 3$.',
      'Plug in $x = 2$ and take the magnitude.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_dielectric_constant_capacitance',
    nodeId: NODE_C12_PHY_CBSE_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A parallel plate air capacitor has a capacitance of 10 pF. A dielectric slab of constant $K = 5.5$ is completely inserted into the gap. What is the new capacitance in pF?',
    correctAnswer: 55,
    tolerance: 0.5,
    unit: 'pF',
    explanation: '$C_{new} = K \\times C_0 = 5.5 \\times 10\\text{ pF} = 55\\text{ pF}$.',
    hints: [
      'Inserting a dielectric increases capacitance by a factor of $K$.',
      'Multiply $C_0$ by $K$.',
      '$10 \\times 5.5 = 55\\text{ pF}$.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_energy_disconnected_dielectric',
    nodeId: NODE_C12_PHY_CBSE_017,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A capacitor of capacitance $C$ charged to voltage $V$ stores energy $U_0$. It is disconnected from the battery, and a dielectric slab ($K = 3$) is inserted. What is the new energy stored in terms of $U_0$?',
    options: [
      '3 U0',
      '9 U0',
      'U0 / 3',
      'U0 / 9',
    ],
    correctIndex: 2,
    explanation: 'When disconnected, charge $Q$ is constant. $U = \\frac{Q^2}{2C}$. Since $C$ increases to $3C$, stored energy becomes $U = \\frac{Q^2}{2(3C)} = \\frac{U_0}{3}$.',
    hints: [
      'Since it is disconnected, which variable stays constant: Q or V?',
      'Charge Q stays constant. Use $U = \\frac{Q^2}{2C}$.',
      'Capacitance increases by factor 3, so energy decreases to 1/3.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_series_parallel_network',
    nodeId: NODE_C12_PHY_CBSE_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two capacitors of $6\\ \\mu\\text{F}$ and $3\\ \\mu\\text{F}$ are connected in SERIES across a 12 V power supply. Calculate the charge on the $6\\ \\mu\\text{F}$ capacitor in $\\mu\\text{C}$.',
    correctAnswer: 24,
    tolerance: 0.5,
    unit: 'µC',
    explanation: 'Equivalent capacitance $C_{eq} = \\frac{6 \\times 3}{6 + 3} = 2\\ \\mu\\text{F}$. Total charge $Q = C_{eq} \\times V = 2\\ \\mu\\text{F} \\times 12\\text{ V} = 24\\ \\mu\\text{C}$. In series, each capacitor carries the same total charge of $24\\ \\mu\\text{C}$.',
    hints: [
      'Find $C_{eq}$ for two series capacitors: $1/C = 1/6 + 1/3 = 1/2 \\Rightarrow C_{eq} = 2\\ \\mu\\text{F}$.',
      'In series, charge $Q$ is identical on all capacitors: $Q = C_{eq} \\times V$.',
      '$Q = 2\\ \\mu\\text{F} \\times 12\\text{ V} = 24\\ \\mu\\text{C}$.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_dipole_work_rotation',
    nodeId: NODE_C12_PHY_CBSE_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An electric dipole with moment $p = 4 \\times 10^{-9}\\text{ C}\\cdot\\text{m}$ is aligned with a uniform electric field $E = 10^5\\text{ N/C}$ ($\\theta = 0^\\circ$). How much work in microjoules ($\\mu\\text{J}$) is required to rotate it by $180^\\circ$?',
    correctAnswer: 800,
    tolerance: 5,
    unit: 'µJ',
    explanation: '$W = \\Delta U = U(180^\\circ) - U(0^\\circ) = -pE\\cos(180^\\circ) - (-pE\\cos(0^\\circ)) = pE - (-pE) = 2pE$. $W = 2 \\times 4 \\times 10^{-9} \\times 10^5 = 8 \\times 10^{-4}\\text{ J} = 800\\ \\mu\\text{J}$.',
    hints: [
      'Work required to rotate dipole from $\\theta_1$ to $\\theta_2$ is $W = pE (\\cos\\theta_1 - \\cos\\theta_2)$.',
      'Here $\\theta_1 = 0^\\circ$ and $\\theta_2 = 180^\\circ$.',
      '$\\cos(0^\\circ) = 1$, $\\cos(180^\\circ) = -1$, so $W = pE(1 - (-1)) = 2pE$.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_07_energy_loss_redistribution',
    nodeId: NODE_C12_PHY_CBSE_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A $2\\ \\mu\\text{F}$ capacitor charged to 100 V is connected in parallel to an uncharged $3\\ \\mu\\text{F}$ capacitor. Calculate the electrostatic energy lost during charge sharing in millijoules (mJ).',
    correctAnswer: 6,
    tolerance: 0.2,
    unit: 'mJ',
    explanation: 'Initial energy $U_i = \\frac{1}{2} C_1 V_1^2 = \\frac{1}{2} (2 \\times 10^{-6}) (100)^2 = 10\\text{ mJ}$. Common potential $V = \\frac{C_1 V_1}{C_1 + C_2} = \\frac{2 \\times 100}{2 + 3} = 40\\text{ V}$. Final energy $U_f = \\frac{1}{2} (C_1 + C_2) V^2 = \\frac{1}{2} (5 \\times 10^{-6}) (40)^2 = 4\\text{ mJ}$. Energy loss $\\Delta U = 10 - 4 = 6\\text{ mJ}$.',
    hints: [
      'Formula for energy loss: $\\Delta U = \\frac{C_1 C_2}{2(C_1+C_2)} (V_1 - V_2)^2$.',
      'Here $V_2 = 0\\text{ V}$. Plug in $C_1 = 2\\ \\mu\\text{F}$, $C_2 = 3\\ \\mu\\text{F}$, $V_1 = 100\\text{ V}$.',
      '$\\Delta U = \\frac{2 \\times 3}{2(2+3)} (100)^2 \\times 10^{-6} = \\frac{6}{10} \\times 10000 \\times 10^{-6}\\text{ J} = 0.006\\text{ J} = 6\\text{ mJ}$.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_08_conducting_slab_capacitance',
    nodeId: NODE_C12_PHY_CBSE_014,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A metal slab of thickness $t = d/2$ is introduced between the plates of a parallel plate capacitor of plate separation $d$ and air capacitance $C_0$. What is the new capacitance?',
    options: [
      '2 C0',
      'C0 / 2',
      '4 C0',
      '1.5 C0',
    ],
    correctIndex: 0,
    explanation: 'Inside a conductor, $E = 0$. The effective dielectric gap reduces from $d$ to $d - t = d - d/2 = d/2$. Thus $C = \\frac{\\varepsilon_0 A}{d - t} = \\frac{\\varepsilon_0 A}{d/2} = 2 C_0$.',
    hints: [
      'What is the electric field inside a conductor in electrostatic equilibrium?',
      'Field inside the conductor is zero, so potential drops only across thickness $(d - t)$.',
      'New formula: $C = \\frac{\\varepsilon_0 A}{d - t}$. For $t = d/2$, $C = 2 C_0$.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_09_vande_graaff_limit',
    nodeId: NODE_C12_PHY_CBSE_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Van de Graaff sphere has radius $R = 0.5\\text{ m}$. The dielectric breakdown strength of surrounding air is $3 \\times 10^6\\text{ V/m}$. Calculate the maximum potential in megavolts (MV) to which this sphere can be charged before spark discharge occurs.',
    correctAnswer: 1.5,
    tolerance: 0.1,
    unit: 'MV',
    explanation: '$E_{\\text{max}} = \\frac{V_{\\text{max}}}{R} \\Rightarrow V_{\\text{max}} = E_{\\text{max}} \\times R = (3 \\times 10^6\\text{ V/m}) \\times 0.5\\text{ m} = 1.5 \\times 10^6\\text{ V} = 1.5\\text{ MV}$.',
    hints: [
      'At the surface of a spherical conductor, electric field $E = V / R$.',
      'Maximum electric field before air breakdown is $3 \\times 10^6\\text{ V/m}$.',
      'Multiply breakdown field by radius $R = 0.5\\text{ m}$.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_10_drag_label_components',
    nodeId: NODE_C12_PHY_CBSE_008,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match each electrostatic phenomenon to its underlying physical property.',
    dragItems: [
      { label: 'E = 0 inside cavity', targetId: 'shielding' },
      { label: 'C = K C0', targetId: 'dielectric' },
      { label: 'V = constant on boundary', targetId: 'equipotential' },
      { label: 'U = -p dot E', targetId: 'dipole_u' },
    ],
    correctMapping: {
      shielding: 'E = 0 inside cavity',
      dielectric: 'C = K C0',
      equipotential: 'V = constant on boundary',
      dipole_u: 'U = -p dot E',
    },
    explanation: 'Electrostatic shielding voids internal fields, dielectrics scale capacitance by K, equipotentials have uniform voltage, and dipole potential energy is $-p E \\cos\\theta$.',
    hints: [
      'Which phenomenon keeps sensitive instruments safe inside a metal box?',
      'Which factor scales capacitance when an insulating slab is added?',
      'Recall potential energy equation for dipole in external field.',
    ],
    misconceptionIndex: 4,
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    misconception: 'Equipotential surfaces are always parallel flat planes.',
    correction: 'Equipotential surfaces take shapes matching charge symmetry—spherical around point charges, cylindrical around line charges, and planar only in uniform fields.',
  },
  {
    id: 'misc_2',
    misconception: 'Electric field points from low potential to high potential.',
    correction: 'Electric field ALWAYS points in the direction of steepest DECREASE of potential ($E = -dV/dr$).',
  },
  {
    id: 'misc_3',
    misconception: 'Inserting a dielectric ALWAYS increases stored electrostatic energy.',
    correction: 'If disconnected from battery ($Q = \\text{const}$), energy DECREASES ($U = Q^2 / (2KC_0)$). Energy only increases if connected to a battery ($V = \\text{const}$).',
  },
  {
    id: 'misc_4',
    misconception: 'Capacitors in series have equal stored energies regardless of capacitance.',
    correction: 'Capacitors in series have equal CHARGES ($Q$), but energy $U = Q^2 / (2C)$ is inversely proportional to capacitance.',
  },
  {
    id: 'misc_5',
    misconception: 'Electric field inside a dielectric is zero like in a conductor.',
    correction: 'In a dielectric, induced bound charges reduce the external field to $E_0 / K$, but do not cancel it completely like in conductors where $E = 0$.',
  },
];

// ─── MAIN COMPONENT ───
const C12_PhysicsElectrostaticPotentialCapacitanceCBSESim: React.FC = () => {
  // Navigation / Phase
  const [phase, setPhase] = useState<'intro' | 'discovery' | 'teach' | 'lab' | 'challenge' | 'summary'>('intro');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [challengeIdx, setChallengeIdx] = useState<number>(0);

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Interactive Lab Simulation Parameters
  const [activeLabTab, setActiveLabTab] = useState<'field_potential' | 'parallel_plate' | 'circuits' | 'vande_graaff'>('field_potential');
  
  // Canvas / Lab state: Field & Potential
  const [chargeQ1, setChargeQ1] = useState<number>(5); // in nC
  const [chargeQ2, setChargeQ2] = useState<number>(-5); // in nC
  const [testChargePos, setTestChargePos] = useState<{ x: number; y: number }>({ x: 250, y: 150 });
  const [showEquipotentials, setShowEquipotentials] = useState<boolean>(true);

  // Canvas / Lab state: Parallel Plate Capacitor
  const [plateArea, setPlateArea] = useState<number>(100); // cm^2
  const [plateDistance, setPlateDistance] = useState<number>(4); // mm
  const [dielectricK, setDielectricK] = useState<number>(4);
  const [isBatteryConnected, setIsBatteryConnected] = useState<boolean>(true);
  const [appliedVoltage, setAppliedVoltage] = useState<number>(12); // Volts
  const [slabInserted, setSlabInserted] = useState<boolean>(true);

  // Circuit Workbench state
  const [c1Value, setC1Value] = useState<number>(6); // uF
  const [c2Value, setC2Value] = useState<number>(3); // uF
  const [circuitMode, setCircuitMode] = useState<'series' | 'parallel'>('series');
  const [circuitVoltage, setCircuitVoltage] = useState<number>(12);

  // Van de Graaff state
  const [vdgRadius, setVdgRadius] = useState<number>(0.4); // meters
  const [vdgCurrent, setVdgCurrent] = useState<number>(10); // uA belt current
  const [vdgCharged, setVdgCharged] = useState<boolean>(false);
  const [sparkFired, setSparkFired] = useState<boolean>(false);

  // Evaluation & SRS/BKT State
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [dragState, setDragState] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // System feedback states
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Scoring & Mastery tracking
  const [score, setScore] = useState<number>(0);
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const autoHintTimer = useRef<NodeJS.Timeout | null>(null);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (autoHintTimer.current) clearTimeout(autoHintTimer.current);
    setShowHint(false);
    autoHintTimer.current = setTimeout(() => {
      if (phase === 'challenge') {
        const curCh = CHALLENGES[challengeIdx];
        setHintText(curCh.hints[0] || 'Observe the variables carefully and apply the core electrostatics equation!');
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [phase, challengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (autoHintTimer.current) clearTimeout(autoHintTimer.current);
    };
  }, [phase, challengeIdx, resetInactivityTimer]);

  // ─── CANVAS SIMULATION RENDER (FIELD MAP) ───
  useEffect(() => {
    if (phase !== 'lab' || activeLabTab !== 'field_potential') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Charge locations
    const pos1 = { x: width * 0.3, y: height * 0.5 };
    const pos2 = { x: width * 0.7, y: height * 0.5 };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const step = 25;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Equipotential Contour Lines if enabled
      if (showEquipotentials) {
        ctx.lineWidth = 1.5;
        const potentialLevels = [-100, -60, -30, -15, 15, 30, 60, 100];
        
        // Sampling grid to estimate contours
        const resolution = 8;
        for (let x = 0; x < width; x += resolution) {
          for (let y = 0; y < height; y += resolution) {
            const r1 = Math.hypot(x - pos1.x, y - pos1.y) || 1;
            const r2 = Math.hypot(x - pos2.x, y - pos2.y) || 1;
            // V = k (q1/r1 + q2/r2)
            const V = (8990 * chargeQ1) / r1 + (8990 * chargeQ2) / r2;

            for (let level of potentialLevels) {
              if (Math.abs(V - level) < 2.5) {
                ctx.fillStyle = level > 0 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(59, 130, 246, 0.35)';
                ctx.fillRect(x, y, resolution, resolution);
              }
            }
          }
        }
      }

      // Draw Field Vectors
      ctx.lineWidth = 1;
      const arrowStep = 40;
      for (let x = 20; x < width; x += arrowStep) {
        for (let y = 20; y < height; y += arrowStep) {
          const r1 = Math.hypot(x - pos1.x, y - pos1.y) || 1;
          const r2 = Math.hypot(x - pos2.x, y - pos2.y) || 1;

          // Field vectors from q1 & q2
          const Ex1 = (chargeQ1 * (x - pos1.x)) / Math.pow(r1, 3);
          const Ey1 = (chargeQ1 * (y - pos1.y)) / Math.pow(r1, 3);
          const Ex2 = (chargeQ2 * (x - pos2.x)) / Math.pow(r2, 3);
          const Ey2 = (chargeQ2 * (y - pos2.y)) / Math.pow(r2, 3);

          const Ex = Ex1 + Ex2;
          const Ey = Ey1 + Ey2;
          const EMag = Math.hypot(Ex, Ey) || 0.001;

          const len = Math.min(18, EMag * 150);
          const angle = Math.atan2(Ey, Ex);

          ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + len * Math.cos(angle), y + len * Math.sin(angle));
          ctx.stroke();
        }
      }

      // Draw Charges
      // Charge 1
      ctx.beginPath();
      ctx.arc(pos1.x, pos1.y, 18, 0, 2 * Math.PI);
      ctx.fillStyle = chargeQ1 >= 0 ? '#ef4444' : '#3b82f6';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${chargeQ1 > 0 ? '+' : ''}${chargeQ1}nC`, pos1.x, pos1.y);

      // Charge 2
      ctx.beginPath();
      ctx.arc(pos2.x, pos2.y, 18, 0, 2 * Math.PI);
      ctx.fillStyle = chargeQ2 >= 0 ? '#ef4444' : '#3b82f6';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.fillText(`${chargeQ2 > 0 ? '+' : ''}${chargeQ2}nC`, pos2.x, pos2.y);

      // Draw Test Charge Probe
      ctx.beginPath();
      ctx.arc(testChargePos.x, testChargePos.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#eab308';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Readouts for probe
      const r1 = Math.hypot(testChargePos.x - pos1.x, testChargePos.y - pos1.y) || 1;
      const r2 = Math.hypot(testChargePos.x - pos2.x, testChargePos.y - pos2.y) || 1;
      const vProbe = ((8990 * chargeQ1) / r1 + (8990 * chargeQ2) / r2).toFixed(1);

      ctx.fillStyle = '#fef08a';
      ctx.font = '12px sans-serif';
      ctx.fillText(`V = ${vProbe} V`, testChargePos.x, testChargePos.y - 18);

      animFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameId);
  }, [phase, activeLabTab, chargeQ1, chargeQ2, testChargePos, showEquipotentials]);

  // Dynamic calculations for parallel plate capacitor
  const calcCapacitance = useMemo(() => {
    const kFactor = slabInserted ? dielectricK : 1.0;
    // C = K * eps0 * A / d
    // eps0 = 8.854e-12
    const areaM2 = plateArea * 1e-4;
    const distM = plateDistance * 1e-3;
    const C_Farads = (kFactor * 8.854e-12 * areaM2) / distM;
    const C_pF = C_Farads * 1e12;

    let voltage = appliedVoltage;
    let charge_nC = C_pF * voltage / 1000;
    
    // If disconnected, Q remains fixed based on slab state before insertion
    const C_air_pF = (8.854e-12 * areaM2) / distM * 1e12;
    if (!isBatteryConnected) {
      // Fixed charge based on initial 12V charging in air
      charge_nC = (C_air_pF * 12) / 1000;
      voltage = (charge_nC * 1000) / C_pF;
    }

    const storedEnergy_nJ = 0.5 * C_pF * Math.pow(voltage, 2) / 1000;
    const electricField_kVm = voltage / (plateDistance / 1000) / 1000;

    return {
      cap_pF: C_pF.toFixed(2),
      voltage: voltage.toFixed(2),
      charge_nC: charge_nC.toFixed(2),
      energy_nJ: storedEnergy_nJ.toFixed(2),
      eField: electricField_kVm.toFixed(2),
    };
  }, [plateArea, plateDistance, dielectricK, isBatteryConnected, appliedVoltage, slabInserted]);

  // Series / Parallel Circuit Calculations
  const calcCircuitProps = useMemo(() => {
    let Ceq = 0;
    let Qtotal = 0;
    let Utotal = 0;
    let v1 = 0;
    let v2 = 0;
    let q1 = 0;
    let q2 = 0;

    if (circuitMode === 'series') {
      Ceq = (c1Value * c2Value) / (c1Value + c2Value);
      Qtotal = Ceq * circuitVoltage; // uC
      q1 = Qtotal;
      q2 = Qtotal;
      v1 = Qtotal / c1Value;
      v2 = Qtotal / c2Value;
    } else {
      Ceq = c1Value + c2Value;
      v1 = circuitVoltage;
      v2 = circuitVoltage;
      q1 = c1Value * v1;
      q2 = c2Value * v2;
      Qtotal = q1 + q2;
    }
    Utotal = 0.5 * Ceq * Math.pow(circuitVoltage, 2); // uJ

    return {
      Ceq: Ceq.toFixed(2),
      Qtotal: Qtotal.toFixed(2),
      Utotal: Utotal.toFixed(2),
      v1: v1.toFixed(2),
      v2: v2.toFixed(2),
      q1: q1.toFixed(2),
      q2: q2.toFixed(2),
    };
  }, [c1Value, c2Value, circuitMode, circuitVoltage]);

  // Van de Graaff calculations
  const calcVDG = useMemo(() => {
    // Breakdown field in air = 3e6 V/m
    const Vmax_MV = (3e6 * vdgRadius) / 1e6; // MV
    const C_sphere_pF = 4 * Math.PI * 8.854e-12 * vdgRadius * 1e12;
    return {
      Vmax_MV: Vmax_MV.toFixed(2),
      C_sphere_pF: C_sphere_pF.toFixed(1),
    };
  }, [vdgRadius]);

  // ─── ACTION HANDLERS ───
  const handleStartDiscovery = () => {
    audioManager.play('whoosh');
    setPhase('discovery');
  };

  const handleDiscoverySubmit = () => {
    if (discoveryAnswer === null) return;
    setDiscoverySubmitted(true);
    if (discoveryAnswer === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Spot on intuition! With fixed charge, higher capacitance means reduced stored energy!');
    } else {
      audioManager.play('error');
      speechManager.speak('Good attempt! Let us explore why energy decreases when disconnected.');
    }
  };

  const handleProceedToTeach = () => {
    audioManager.play('pop');
    setPhase('teach');
    setCurrentSlide(0);
  };

  const handleNextSlide = () => {
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      audioManager.play('whoosh');
      setCurrentSlide((prev) => prev + 1);
    } else {
      audioManager.play('sparkle');
      setPhase('lab');
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      audioManager.play('whoosh');
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleProceedToChallenges = () => {
    audioManager.play('chime');
    setPhase('challenge');
    setChallengeIdx(0);
    setUserNumericInput('');
    setSelectedOption(null);
    setDragState({});
    setChallengeFeedback(null);
  };

  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    const curCh = CHALLENGES[challengeIdx];
    let isCorrect = false;

    if (curCh.type === 'multiple-choice') {
      if (selectedOption === curCh.correctIndex) isCorrect = true;
    } else if (curCh.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && curCh.correctAnswer !== undefined && curCh.tolerance !== undefined) {
        if (Math.abs(val - curCh.correctAnswer) <= curCh.tolerance) {
          isCorrect = true;
        }
      }
    } else if (curCh.type === 'drag-label') {
      if (curCh.correctMapping) {
        let matchAll = true;
        for (const [key, val] of Object.entries(curCh.correctMapping)) {
          if (dragState[key] !== val) matchAll = false;
        }
        isCorrect = matchAll;
      }
    }

    // SRS & BKT Update
    const reviewItem = createReviewItem(curCh.nodeId, 'Physics');
    const updatedReview = sm2Update(reviewItem, isCorrect ? 5 : 2, 0);

    const bktState = bktStates[curCh.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(bktState, isCorrect);
    setBktStates((prev) => ({ ...prev, [curCh.nodeId]: updatedBkt }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Outstanding precision! Your calculation matches electrodynamics principles.');
      setChallengeFeedback({ isCorrect: true, text: 'Correct! ' + curCh.explanation });
      setScore((prev) => prev + 100);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Review the formula and check your values.');
      setChallengeFeedback({ isCorrect: false, text: 'Incorrect. ' + curCh.explanation });
    }
  };

  const handleNextChallenge = () => {
    if (challengeIdx < CHALLENGES.length - 1) {
      audioManager.play('swoop');
      setChallengeIdx((prev) => prev + 1);
      setUserNumericInput('');
      setSelectedOption(null);
      setDragState({});
      setChallengeFeedback(null);
    } else {
      audioManager.play('celebration');
      recordGameScore(ALL_NODE_IDS, score + 100);
      setShowConfetti(true);
      setShowSuccess(true);
      setPhase('summary');
    }
  };

  // Canvas Drag Handler for test charge
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (phase !== 'lab' || activeLabTab !== 'field_potential') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTestChargePos({ x, y });
    audioManager.play('tap');
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (phase !== 'lab' || activeLabTab !== 'field_potential' || e.buttons !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(10, Math.min(canvas.width - 10, e.clientX - rect.left));
    const y = Math.max(10, Math.min(canvas.height - 10, e.clientY - rect.top));
    setTestChargePos({ x, y });
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center justify-start select-none">
      {/* ─── TOP HEADER & NAV ─── */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center font-black text-xl shadow-lg shadow-gold-500/20">
            ⚡
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Electrostatic Potential & Capacitance
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gold-950 border border-gold-500/30 text-gold-400">
                CBSE Class 12 Physics
              </span>
            </h1>
            <p className="text-xs text-slate-400">{SCENARIO.title}</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs">
          {(['intro', 'discovery', 'teach', 'lab', 'challenge', 'summary'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all font-medium ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-md shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center">

        {/* 1. INTRO PHASE */}
        {phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 flex flex-col items-center text-center max-w-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-gold-950 border border-gold-500/40 text-gold-400 flex items-center justify-center text-3xl mb-6 shadow-xl">
              🛰️
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              ISRO AstroSat High-Voltage Diagnostic Lab
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              {SCENARIO.intro}
            </p>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-left text-xs md:text-sm text-slate-400 mb-8 w-full">
              <strong className="text-gold-400 block mb-1">Mission Context:</strong>
              {SCENARIO.context}
            </div>

            <button
              onClick={handleStartDiscovery}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-base shadow-lg shadow-gold-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              Initiate Diagnostic Calibration →
            </button>
          </motion.div>
        )}

        {/* 2. DISCOVERY QUESTION (PREDICT BEFORE LEARN) */}
        {phase === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-wider uppercase mb-3">
              <span>Predict-Before-Learn Hypothesis</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-6">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="space-y-3 mb-6">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={discoverySubmitted}
                  onClick={() => {
                    audioManager.play('tap');
                    setDiscoveryAnswer(idx);
                  }}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                    discoveryAnswer === idx
                      ? 'border-gold-500 bg-gold-950/40 text-gold-100 font-medium'
                      : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    discoveryAnswer === idx ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            {!discoverySubmitted ? (
              <button
                disabled={discoveryAnswer === null}
                onClick={handleDiscoverySubmit}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  discoveryAnswer !== null
                    ? 'bg-gold-600 text-white hover:bg-gold-500 shadow-lg shadow-gold-600/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Submit Hypothesis
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className={`p-4 rounded-xl text-sm border ${
                  discoveryAnswer === DISCOVERY_QUESTION.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                }`}>
                  <strong className="block font-bold mb-1">
                    {discoveryAnswer === DISCOVERY_QUESTION.correctIndex ? '✔ Correct Hypothesis!' : '💡 Key Insight:'}
                  </strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>

                <button
                  onClick={handleProceedToTeach}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-bold hover:brightness-110 shadow-lg"
                >
                  Begin Interactive Module →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 3. TEACHING SLIDES */}
        {phase === 'teach' && (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl min-h-[500px]"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span className="text-gold-400 font-semibold uppercase tracking-wider">Concept Slide {currentSlide + 1} of {TEACHING_SLIDES.length}</span>
                <span>CBSE Syllabus Core</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                {TEACHING_SLIDES[currentSlide].title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 items-center">
                <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-4">
                  <p>{TEACHING_SLIDES[currentSlide].content}</p>
                  
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-gold-300 font-mono text-xs md:text-sm">
                    <strong>Formula:</strong> {TEACHING_SLIDES[currentSlide].formula}
                  </div>
                </div>

                {/* VISUAL CONCEPT DIAGRAMS */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
                  {TEACHING_SLIDES[currentSlide].visualType === 'field_map' && (
                    <svg className="w-full h-44" viewBox="0 0 300 180">
                      <circle cx="100" cy="90" r="16" fill="#ef4444" />
                      <text x="100" y="94" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">+Q</text>

                      {/* Concentric equipotential circles */}
                      <circle cx="100" cy="90" r="35" fill="none" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="1.5" />
                      <circle cx="100" cy="90" r="60" fill="none" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="1.5" />
                      <circle cx="100" cy="90" r="85" fill="none" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="1.5" />

                      {/* E field arrows */}
                      <line x1="116" y1="90" x2="180" y2="90" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow)" />
                      <line x1="100" y1="74" x2="100" y2="15" stroke="#f43f5e" strokeWidth="2" />
                      <text x="185" y="94" fill="#f43f5e" fontSize="11" fontWeight="bold">E = -dV/dr</text>
                      <text x="190" y="55" fill="#38bdf8" fontSize="10">Equipotentials (V = const)</text>
                    </svg>
                  )}

                  {TEACHING_SLIDES[currentSlide].visualType === 'dipole_energy' && (
                    <svg className="w-full h-44" viewBox="0 0 300 180">
                      {/* Uniform electric field lines */}
                      <g stroke="#475569" strokeWidth="1.5">
                        <line x1="20" y1="40" x2="280" y2="40" />
                        <line x1="20" y1="90" x2="280" y2="90" />
                        <line x1="20" y1="140" x2="280" y2="140" />
                      </g>
                      <text x="260" y="30" fill="#94a3b8" fontSize="11">E Field</text>
                      
                      {/* Dipole rod */}
                      <line x1="110" y1="120" x2="190" y2="60" stroke="#eab308" strokeWidth="4" />
                      <circle cx="110" cy="120" r="12" fill="#3b82f6" />
                      <text x="110" y="124" fill="#fff" fontSize="10" textAnchor="middle">-q</text>
                      <circle cx="190" cy="60" r="12" fill="#ef4444" />
                      <text x="190" y="64" fill="#fff" fontSize="10" textAnchor="middle">+q</text>
                      <text x="150" y="105" fill="#eab308" fontSize="11" fontWeight="bold">p vector</text>
                    </svg>
                  )}

                  {TEACHING_SLIDES[currentSlide].visualType === 'capacitor_sim' && (
                    <svg className="w-full h-44" viewBox="0 0 300 180">
                      {/* Top plate */}
                      <rect x="50" y="30" width="200" height="12" fill="#94a3b8" rx="2" />
                      <text x="150" y="24" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">+ + + + + + + + + + +</text>
                      {/* Bottom plate */}
                      <rect x="50" y="138" width="200" height="12" fill="#94a3b8" rx="2" />
                      <text x="150" y="162" fill="#3b82f6" fontSize="11" fontWeight="bold" textAnchor="middle">- - - - - - - - - - -</text>

                      {/* Dielectric slab */}
                      <rect x="60" y="46" width="180" height="88" fill="rgba(14, 165, 233, 0.25)" stroke="#0284c7" strokeDasharray="4 4" rx="4" />
                      <text x="150" y="94" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Dielectric (K)</text>
                    </svg>
                  )}

                  {TEACHING_SLIDES[currentSlide].visualType === 'circuits' && (
                    <svg className="w-full h-44" viewBox="0 0 300 180">
                      {/* Series Schematic */}
                      <g stroke="#94a3b8" strokeWidth="2" fill="none">
                        <line x1="30" y1="60" x2="80" y2="60" />
                        <line x1="80" y1="45" x2="80" y2="75" strokeWidth="3" />
                        <line x1="90" y1="45" x2="90" y2="75" strokeWidth="3" />
                        <line x1="90" y1="60" x2="140" y2="60" />
                        <line x1="140" y1="45" x2="140" y2="75" strokeWidth="3" />
                        <line x1="150" y1="45" x2="150" y2="75" strokeWidth="3" />
                        <line x1="150" y1="60" x2="200" y2="60" />
                      </g>
                      <text x="85" y="35" fill="#cbd5e1" fontSize="10" textAnchor="middle">C1</text>
                      <text x="145" y="35" fill="#cbd5e1" fontSize="10" textAnchor="middle">C2</text>
                      <text x="115" y="95" fill="#38bdf8" fontSize="11" textAnchor="middle">Series: 1/Ceq = 1/C1 + 1/C2</text>

                      <line x1="20" y1="115" x2="280" y2="115" stroke="#334155" strokeDasharray="3 3" />
                      <text x="150" y="145" fill="#a855f7" fontSize="11" textAnchor="middle">Parallel: Ceq = C1 + C2</text>
                    </svg>
                  )}

                  {TEACHING_SLIDES[currentSlide].visualType === 'vande_graaff' && (
                    <svg className="w-full h-44" viewBox="0 0 300 180">
                      {/* Large outer sphere */}
                      <circle cx="150" cy="80" r="50" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="150" cy="80" r="48" fill="rgba(248, 250, 252, 0.05)" />
                      {/* Belt line */}
                      <rect x="145" y="70" width="10" height="90" fill="#475569" />
                      {/* Inner sphere contact */}
                      <circle cx="150" cy="80" r="8" fill="#eab308" />
                      <text x="150" y="24" fill="#eab308" fontSize="11" textAnchor="middle">High Potential V = Q / 4πε0R</text>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-4">
              <button
                disabled={currentSlide === 0}
                onClick={handlePrevSlide}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentSlide > 0
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                }`}
              >
                ← Back
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i === currentSlide ? 'bg-gold-500 w-6' : 'bg-slate-700'
                    } transition-all`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="px-5 py-2 rounded-lg bg-gold-600 hover:bg-gold-500 text-white font-semibold text-sm shadow-md shadow-gold-600/30 transition-all"
              >
                {currentSlide === TEACHING_SLIDES.length - 1 ? 'Enter Interactive Lab →' : 'Next Concept →'}
              </button>
            </div>
          </motion.div>
        )}

        {/* 4. INTERACTIVE LABORATORY WORKBENCH */}
        {phase === 'lab' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col gap-6"
          >
            {/* LAB TABS */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔬</span>
                <h3 className="font-bold text-white text-base md:text-lg">
                  Electrostatics Interactive Diagnostics Lab
                </h3>
              </div>

              <div className="flex gap-2">
                {[
                  { id: 'field_potential', label: 'Potential & Field Mapping' },
                  { id: 'parallel_plate', label: 'Dielectric Capacitor' },
                  { id: 'circuits', label: 'Capacitor Networks' },
                  { id: 'vande_graaff', label: 'Van de Graaff' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      audioManager.play('tap');
                      setActiveLabTab(tab.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeLabTab === tab.id
                        ? 'bg-gold-600 text-white shadow-md shadow-gold-600/30'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB 1: FIELD & POTENTIAL MAPPER */}
            {activeLabTab === 'field_potential' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 relative bg-slate-950 rounded-xl border border-slate-800 p-2 flex flex-col items-center">
                  <canvas
                    ref={canvasRef}
                    width={560}
                    height={320}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    className="w-full h-[320px] rounded-lg cursor-crosshair bg-slate-950"
                  />
                  <span className="text-[11px] text-slate-400 mt-2">
                    💡 Click or drag anywhere on the grid to move yellow voltage test probe.
                  </span>
                </div>

                <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex flex-col gap-4 text-xs">
                  <h4 className="font-bold text-gold-400 text-sm">Charge Controls</h4>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Charge Q1: <span className="text-rose-400 font-bold">{chargeQ1} nC</span>
                    </label>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="1"
                      value={chargeQ1}
                      onChange={(e) => setChargeQ1(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Charge Q2: <span className="text-gold-400 font-bold">{chargeQ2} nC</span>
                    </label>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="1"
                      value={chargeQ2}
                      onChange={(e) => setChargeQ2(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Equipotential Lines</span>
                    <button
                      onClick={() => setShowEquipotentials(!showEquipotentials)}
                      className={`px-3 py-1 rounded-md font-bold transition-all ${
                        showEquipotentials ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {showEquipotentials ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                    <strong className="text-slate-100 block mb-1">Physics Takeaway:</strong>
                    <p>• Equipotential lines form closed loops around single charges.</p>
                    <p>• E field lines cross equipotentials at strict 90° right angles.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PARALLEL PLATE & DIELECTRIC SIMULATOR */}
            {activeLabTab === 'parallel_plate' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                    <span>Parallel Plate Apparatus</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${isBatteryConnected ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'}`}>
                      {isBatteryConnected ? '🔋 Battery Connected (V = Const)' : '⚡ Disconnected (Q = Const)'}
                    </span>
                  </div>

                  {/* VISUAL CAPACITOR RENDER */}
                  <div className="flex flex-col items-center justify-center my-6 relative min-h-[180px]">
                    {/* Top Plate */}
                    <div
                      style={{ width: `${Math.min(320, plateArea * 2.5)}px` }}
                      className="h-5 bg-gradient-to-r from-slate-400 to-slate-200 rounded-t-md flex items-center justify-center border-b border-slate-600 relative shadow-md"
                    >
                      <span className="text-[10px] font-mono text-slate-900 font-bold">TOP PLATE (+Q)</span>
                    </div>

                    {/* Gap / Dielectric Slab */}
                    <div
                      style={{
                        height: `${plateDistance * 18}px`,
                        width: `${Math.min(320, plateArea * 2.5)}px`,
                      }}
                      className="transition-all duration-300 flex items-center justify-center relative border-x border-dashed border-slate-800 my-1"
                    >
                      {slabInserted && (
                        <div className="w-full h-full bg-gold-500/20 border-2 border-gold-400/60 rounded flex items-center justify-center text-gold-300 font-bold text-xs backdrop-blur-sm">
                          Dielectric Medium (K = {dielectricK})
                        </div>
                      )}
                    </div>

                    {/* Bottom Plate */}
                    <div
                      style={{ width: `${Math.min(320, plateArea * 2.5)}px` }}
                      className="h-5 bg-gradient-to-r from-slate-400 to-slate-200 rounded-b-md flex items-center justify-center border-t border-slate-600 shadow-md"
                    >
                      <span className="text-[10px] font-mono text-slate-900 font-bold">BOTTOM PLATE (-Q)</span>
                    </div>
                  </div>

                  {/* READOUT METRICS */}
                  <div className="grid grid-cols-4 gap-2 text-center bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block">Capacitance</span>
                      <strong className="text-gold-400 text-sm">{calcCapacitance.cap_pF} pF</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Charge Q</span>
                      <strong className="text-amber-400 text-sm">{calcCapacitance.charge_nC} nC</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Voltage V</span>
                      <strong className="text-emerald-400 text-sm">{calcCapacitance.voltage} V</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Stored Energy</span>
                      <strong className="text-rose-400 text-sm">{calcCapacitance.energy_nJ} nJ</strong>
                    </div>
                  </div>
                </div>

                {/* CONTROLS */}
                <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex flex-col gap-4 text-xs">
                  <h4 className="font-bold text-gold-400 text-sm">Capacitor Controls</h4>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Plate Area (A): <span className="text-white font-bold">{plateArea} cm²</span>
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="160"
                      value={plateArea}
                      onChange={(e) => setPlateArea(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Distance (d): <span className="text-white font-bold">{plateDistance} mm</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={plateDistance}
                      onChange={(e) => setPlateDistance(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Dielectric Constant (K): <span className="text-gold-400 font-bold">{dielectricK}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={dielectricK}
                      onChange={(e) => setDielectricK(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setSlabInserted(!slabInserted)}
                      className={`py-2 rounded-lg font-bold transition-all ${
                        slabInserted ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {slabInserted ? 'Slab Inserted ✔' : 'Insert Dielectric Slab'}
                    </button>

                    <button
                      onClick={() => setIsBatteryConnected(!isBatteryConnected)}
                      className={`py-2 rounded-lg font-bold transition-all border ${
                        isBatteryConnected
                          ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                          : 'bg-amber-950 border-amber-600 text-amber-300'
                      }`}
                    >
                      {isBatteryConnected ? 'Disconnect Battery' : 'Connect Battery'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CAPACITOR NETWORKS WORKBENCH */}
            {activeLabTab === 'circuits' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                    <span>Circuit Topology Analyzer</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCircuitMode('series')}
                        className={`px-3 py-1 rounded font-bold ${
                          circuitMode === 'series' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Series Circuit
                      </button>
                      <button
                        onClick={() => setCircuitMode('parallel')}
                        className={`px-3 py-1 rounded font-bold ${
                          circuitMode === 'parallel' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Parallel Circuit
                      </button>
                    </div>
                  </div>

                  {/* DIAGRAM SVG */}
                  <div className="flex items-center justify-center my-4 bg-slate-900/60 p-6 rounded-xl border border-slate-800">
                    {circuitMode === 'series' ? (
                      <svg className="w-full h-40" viewBox="0 0 320 120">
                        {/* Wires */}
                        <path d="M 20 60 L 70 60 M 110 60 L 190 60 M 230 60 L 300 60" stroke="#38bdf8" strokeWidth="3" fill="none" />
                        <path d="M 20 60 L 20 100 L 140 100 M 180 100 L 300 100 L 300 60" stroke="#38bdf8" strokeWidth="3" fill="none" />
                        {/* Battery */}
                        <line x1="140" y1="90" x2="140" y2="110" stroke="#ef4444" strokeWidth="4" />
                        <line x1="180" y1="95" x2="180" y2="105" stroke="#3b82f6" strokeWidth="4" />
                        <text x="160" y="85" fill="#ffffff" fontSize="11" textAnchor="middle">{circuitVoltage}V</text>

                        {/* Capacitor 1 */}
                        <line x1="70" y1="45" x2="70" y2="75" stroke="#e2e8f0" strokeWidth="4" />
                        <line x1="110" y1="45" x2="110" y2="75" stroke="#e2e8f0" strokeWidth="4" />
                        <text x="90" y="35" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">C1 ({c1Value}µF)</text>
                        <text x="90" y="90" fill="#cbd5e1" fontSize="10" textAnchor="middle">V1 = {calcCircuitProps.v1}V</text>

                        {/* Capacitor 2 */}
                        <line x1="190" y1="45" x2="190" y2="75" stroke="#e2e8f0" strokeWidth="4" />
                        <line x1="230" y1="45" x2="230" y2="75" stroke="#e2e8f0" strokeWidth="4" />
                        <text x="210" y="35" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">C2 ({c2Value}µF)</text>
                        <text x="210" y="90" fill="#cbd5e1" fontSize="10" textAnchor="middle">V2 = {calcCircuitProps.v2}V</text>
                      </svg>
                    ) : (
                      <svg className="w-full h-40" viewBox="0 0 320 120">
                        {/* Main loops */}
                        <path d="M 30 60 L 120 60 L 120 25 L 200 25 L 200 60 M 120 60 L 120 95 L 200 95 L 200 60 M 200 60 L 290 60" stroke="#38bdf8" strokeWidth="3" fill="none" />
                        {/* Battery */}
                        <path d="M 30 60 L 30 110 L 140 110 M 180 110 L 290 110 L 290 60" stroke="#38bdf8" strokeWidth="3" fill="none" />
                        <line x1="140" y1="100" x2="140" y2="120" stroke="#ef4444" strokeWidth="4" />
                        <line x1="180" y1="105" x2="180" y2="115" stroke="#3b82f6" strokeWidth="4" />

                        {/* C1 Top branch */}
                        <line x1="150" y1="15" x2="150" y2="35" stroke="#e2e8f0" strokeWidth="4" />
                        <line x1="170" y1="15" x2="170" y2="35" stroke="#e2e8f0" strokeWidth="4" />
                        <text x="160" y="10" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">C1 ({c1Value}µF)</text>

                        {/* C2 Bottom branch */}
                        <line x1="150" y1="85" x2="150" y2="105" stroke="#e2e8f0" strokeWidth="4" />
                        <line x1="170" y1="85" x2="170" y2="105" stroke="#e2e8f0" strokeWidth="4" />
                        <text x="160" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">C2 ({c2Value}µF)</text>
                      </svg>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block">Equivalent Ceq</span>
                      <strong className="text-gold-400 text-sm">{calcCircuitProps.Ceq} µF</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Total Charge Q</span>
                      <strong className="text-amber-400 text-sm">{calcCircuitProps.Qtotal} µC</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Total Energy U</span>
                      <strong className="text-emerald-400 text-sm">{calcCircuitProps.Utotal} µJ</strong>
                    </div>
                  </div>
                </div>

                {/* CONTROLS */}
                <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex flex-col gap-4 text-xs">
                  <h4 className="font-bold text-gold-400 text-sm">Component Values</h4>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Capacitor C1: <span className="text-gold-400 font-bold">{c1Value} µF</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={c1Value}
                      onChange={(e) => setC1Value(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Capacitor C2: <span className="text-gold-400 font-bold">{c2Value} µF</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={c2Value}
                      onChange={(e) => setC2Value(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Supply Voltage: <span className="text-emerald-400 font-bold">{circuitVoltage} V</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      step="2"
                      value={circuitVoltage}
                      onChange={(e) => setCircuitVoltage(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: VAN DE GRAAFF GENERATOR */}
            {activeLabTab === 'vande_graaff' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[300px]">
                  <h4 className="text-sm font-bold text-slate-300 self-start">Van de Graaff High Potential Generator</h4>

                  {/* SPHERE & BELT GRAPHIC */}
                  <div className="relative flex flex-col items-center my-4">
                    {/* Metal Sphere */}
                    <div
                      style={{
                        width: `${vdgRadius * 260}px`,
                        height: `${vdgRadius * 260}px`,
                      }}
                      className={`rounded-full border-4 ${
                        sparkFired
                          ? 'border-amber-400 bg-amber-500/30 shadow-2xl shadow-amber-500'
                          : vdgCharged
                          ? 'border-gold-400 bg-gold-500/20 shadow-xl shadow-gold-500/40'
                          : 'border-slate-500 bg-slate-800'
                      } flex items-center justify-center transition-all duration-300 relative`}
                    >
                      <span className="text-xs font-mono font-bold text-white text-center px-2">
                        {vdgCharged ? `${calcVDG.Vmax_MV} MV Potential` : 'Uncharged Sphere'}
                      </span>
                    </div>

                    {/* Spark graphic */}
                    {sparkFired && (
                      <div className="absolute -right-20 top-4 text-3xl font-extrabold text-amber-300 animate-bounce">
                        ⚡ CORONA SPARK!
                      </div>
                    )}
                  </div>

                  <div className="w-full grid grid-cols-2 gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-center">
                    <div>
                      <span className="text-slate-400 block">Max Voltage Limit</span>
                      <strong className="text-amber-400 text-sm">{calcVDG.Vmax_MV} MV</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Sphere Capacitance</span>
                      <strong className="text-gold-400 text-sm">{calcVDG.C_sphere_pF} pF</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex flex-col gap-4 text-xs">
                  <h4 className="font-bold text-gold-400 text-sm">Generator Controls</h4>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Sphere Radius (R): <span className="text-white font-bold">{vdgRadius} m</span>
                    </label>
                    <input
                      type="range"
                      min="0.2"
                      max="1.0"
                      step="0.1"
                      value={vdgRadius}
                      onChange={(e) => setVdgRadius(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        audioManager.play('whoosh');
                        setVdgCharged(true);
                        setSparkFired(false);
                      }}
                      className="py-2.5 rounded-lg bg-gold-600 hover:bg-gold-500 text-white font-bold transition-all"
                    >
                      Transfer Charge via Belt
                    </button>

                    <button
                      disabled={!vdgCharged}
                      onClick={() => {
                        audioManager.play('sparkle');
                        setSparkFired(true);
                        setTimeout(() => setSparkFired(false), 2000);
                      }}
                      className={`py-2.5 rounded-lg font-bold transition-all ${
                        vdgCharged
                          ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30'
                          : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      Trigger Dielectric Air Discharge
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* LAB FOOTER BUTTON TO MOVE TO CHALLENGES */}
            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={handleProceedToChallenges}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm shadow-lg shadow-gold-500/25 hover:brightness-110 transition-all"
              >
                Proceed to Exam Challenges (10 Questions) →
              </button>
            </div>
          </motion.div>
        )}

        {/* 5. CHALLENGES PHASE */}
        {phase === 'challenge' && (
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6"
          >
            {/* CHALLENGE HEADER */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-gold-950 border border-gold-500/30 text-gold-400 font-bold text-xs">
                  Challenge {challengeIdx + 1} of {CHALLENGES.length}
                </span>
                <span className="text-xs text-slate-400 capitalize">
                  {CHALLENGES[challengeIdx].difficulty} • {CHALLENGES[challengeIdx].competencyLevel}
                </span>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Score: {score} pts</span>
            </div>

            {/* QUESTION TEXT */}
            <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
              {CHALLENGES[challengeIdx].question}
            </h3>

            {/* INPUT / OPTION TYPES */}
            {/* MULTIPLE CHOICE */}
            {CHALLENGES[challengeIdx].type === 'multiple-choice' && (
              <div className="space-y-3">
                {CHALLENGES[challengeIdx].options?.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={challengeFeedback !== null}
                    onClick={() => {
                      audioManager.play('tap');
                      setSelectedOption(idx);
                    }}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                      selectedOption === idx
                        ? 'border-gold-500 bg-gold-950/40 text-gold-100 font-medium'
                        : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      selectedOption === idx ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {/* NUMERIC ENTRY */}
            {CHALLENGES[challengeIdx].type === 'numeric' && (
              <div className="flex flex-col gap-3">
                <label className="text-xs text-slate-400">Enter numerical answer below:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    disabled={challengeFeedback !== null}
                    value={userNumericInput}
                    onChange={(e) => setUserNumericInput(e.target.value)}
                    placeholder="e.g. 24"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-base focus:border-gold-500 focus:outline-none"
                  />
                  {CHALLENGES[challengeIdx].unit && (
                    <span className="text-sm font-bold text-gold-400 bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl">
                      {CHALLENGES[challengeIdx].unit}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* DRAG / MATCHING LABELS */}
            {CHALLENGES[challengeIdx].type === 'drag-label' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Select target mapping for each property:</p>
                {CHALLENGES[challengeIdx].dragItems?.map((item) => (
                  <div key={item.targetId} className="flex flex-col sm:flex-row items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 gap-3">
                    <span className="text-xs font-medium text-slate-300">{item.label}</span>
                    <select
                      value={dragState[item.targetId] || ''}
                      onChange={(e) => setDragState({ ...dragState, [item.targetId]: e.target.value })}
                      className="bg-slate-900 border border-slate-700 text-gold-300 text-xs rounded-lg px-3 py-2 outline-none"
                    >
                      <option value="">-- Select Property --</option>
                      {CHALLENGES[challengeIdx].dragItems?.map((opt) => (
                        <option key={opt.label} value={opt.label}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* SUBMIT / FEEDBACK AREA */}
            {challengeFeedback === null ? (
              <button
                onClick={handleChallengeSubmit}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm shadow-lg shadow-gold-500/25 hover:brightness-110 transition-all"
              >
                Validate Solution
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className={`p-4 rounded-xl text-sm border ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}>
                  <strong className="block font-bold mb-1">
                    {challengeFeedback.isCorrect ? '✔ Correct Answer!' : '❌ Incorrect'}
                  </strong>
                  {challengeFeedback.text}
                </div>

                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm hover:brightness-110 shadow-lg"
                >
                  {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Module Diagnostic 🎉'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 6. SUMMARY & MISCONCEPTIONS PHASE */}
        {phase === 'summary' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-3xl shadow-xl">
              🏆
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                Mission Accomplished! AstroSat Diagnostic Passed
              </h2>
              <p className="text-slate-400 text-sm">
                You have mastered Electrostatic Potential, Equipotentials, Dielectric Capacitance, and Circuit Networks for CBSE Class 12.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <strong className="text-2xl font-bold text-gold-400">{score} pts</strong>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Nodes Mastered</span>
                <strong className="text-2xl font-bold text-emerald-400">21 / 21</strong>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
                <span className="text-xs text-slate-400 block">BKT Mastery Level</span>
                <strong className="text-2xl font-bold text-amber-400">
                  {(masteryProb(0.95) * 100).toFixed(0)}%
                </strong>
              </div>
            </div>

            {/* MISCONCEPTIONS REVIEW */}
            <div className="w-full text-left bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-bold text-slate-200 text-sm mb-3">Key Misconceptions Mastered:</h4>
              <div className="space-y-2 text-xs">
                {MISCONCEPTIONS_CHECKLIST.map((m) => (
                  <div key={m.id} className="p-2.5 rounded bg-slate-900 border border-slate-800/80">
                    <span className="text-rose-400 font-semibold block">⚠️ Myth: {m.misconception}</span>
                    <span className="text-emerald-300 mt-1 block">✔ Fact: {m.correction}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                audioManager.play('whoosh');
                setPhase('intro');
              }}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm hover:brightness-110 shadow-lg shadow-gold-500/25 transition-all"
            >
              Restart Mission Module
            </button>
          </motion.div>
        )}
      </div>

      {/* ─── SYSTEM OVERLAYS ─── */}
      <HintBubble show={showHint} text={hintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Diagnostic Assessment Passed!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
};

export default C12_PhysicsElectrostaticPotentialCapacitanceCBSESim;