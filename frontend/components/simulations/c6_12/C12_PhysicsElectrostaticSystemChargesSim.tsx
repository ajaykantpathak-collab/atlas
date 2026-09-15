'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

// ─── ISC CLASS 12 PHYSICS NODE CONSTANTS ───────────────────────────────────────
const NODE_C12_PHY_021 = 'c12_phy_021'; // Electrostatic PE of a system of charges
const NODE_C12_PHY_022 = 'c12_phy_022'; // Capacitance (C = Q/V)
const NODE_C12_PHY_023 = 'c12_phy_023'; // Parallel plate capacitor (C = eps0*A/d)
const NODE_C12_PHY_024 = 'c12_phy_024'; // Combination of capacitors (series & parallel)
const NODE_C12_PHY_025 = 'c12_phy_025'; // Dielectrics and polarization
const NODE_C12_PHY_026 = 'c12_phy_026'; // Energy stored in a capacitor (U = 1/2 CV^2)
const NODE_C12_PHY_027 = 'c12_phy_027'; // Drift velocity and mobility
const NODE_C12_PHY_028 = 'c12_phy_028'; // Ohm's law (microscopic derivation)
const NODE_C12_PHY_029 = 'c12_phy_029'; // Resistivity and conductivity
const NODE_C12_PHY_030 = 'c12_phy_030'; // Temperature dependence of resistance

const ALL_NODE_IDS = [
  NODE_C12_PHY_021,
  NODE_C12_PHY_022,
  NODE_C12_PHY_023,
  NODE_C12_PHY_024,
  NODE_C12_PHY_025,
  NODE_C12_PHY_026,
  NODE_C12_PHY_027,
  NODE_C12_PHY_028,
  NODE_C12_PHY_029,
  NODE_C12_PHY_030,
];

// Physical constants
const EPSILON_0 = 8.854e-12; // F/m
const K_COULOMB = 8.98755e9; // N m^2 / C^2
const ELEC_CHARGE = 1.602e-19; // C
const ELEC_MASS = 9.109e-31; // kg

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Mission Chandrayaan-Power: Electrostatic & Solid-State Core',
  intro: 'You are the lead power electronics engineer at ISRO upgrading a lunar rover’s energy distribution system. The rover relies on high-density dielectric supercapacitors and specialized conductors operating under extreme lunar thermal swings (-170°C to +120°C).',
  context: 'To prevent voltage collapse, component breakdown, and excessive thermal dissipation, you must analyze charge configurations, dielectric storage dynamics, microscopic electron drift, and temperature-dependent resistance.',
};

// ─── DISCOVERY HOOK ───────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'A parallel plate capacitor is charged to 100 V, DISCONNECTED from the battery, and then submerged in pure dielectric oil (K = 5). What happens to the energy stored in the electric field?',
  options: [
    'Energy increases by 5x because capacitance increases',
    'Energy decreases to 1/5th because charge is trapped while voltage drops',
    'Energy stays exactly the same by conservation of energy',
    'Energy drops to zero because the dielectric completely conducts the charge away',
  ],
  correctIndex: 1,
  hintAfter: 'Surprise! When isolated, charge cannot change ($Q = \\text{const}$). Since $U = Q^2 / (2C)$ and $C$ increases by $5\\times$, the stored electrical energy actually drops by $5\\times$ (mechanical work is done pulling the dielectric in)! Let’s discover why.',
};

// ─── CHALLENGE INTERFACE ──────────────────────────────────────────────────────
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  bloomLevel?: string;
}

// ─── CHALLENGES ARRAY (22 Progressive Challenges) ─────────────────────────────
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION (1 to 7) ──
  {
    id: 'ch_01_pe_recall',
    nodeId: NODE_C12_PHY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Two point charges $q_1 = +2\\,\\mu\\text{C}$ and $q_2 = -3\\,\\mu\\text{C}$ are separated by $0.1\\,\\text{m}$ in vacuum. Is the electrostatic potential energy positive or negative, and what does it physically signify?',
    options: [
      'Positive; external agent must do positive work to hold them together against repulsion',
      'Negative; the attractive field does work assembling them, forming a bound state',
      'Zero; because positive and negative charges cancel each other out',
      'Vector pointing from positive to negative charge',
    ],
    correctIndex: 1,
    explanation: 'Electrostatic PE is a scalar given by $U = k q_1 q_2 / r$. Since unlike charges have a negative product ($+2 \\times -3 = -6$), $U = -0.54\\,\\text{J}$. The negative sign indicates an attractive bound system where the electric field does the assembly work.',
    hints: [
      'Recall $U = \\frac{1}{4\\pi\\epsilon_0}\\frac{q_1 q_2}{r}$. Keep the signs of charges in the formula.',
      'Unlike charges attract each other. Bringing them in from infinity does not require an external push against repulsion.',
      'A negative potential energy means the system is bound and requires external energy to separate.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_02_cap_geom',
    nodeId: NODE_C12_PHY_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If you double the charge $Q$ on an isolated spherical metal conductor in air, what happens to its capacitance $C$?',
    options: [
      'Capacitance doubles because $C = Q/V$',
      'Capacitance halves because charge pushes harder',
      'Capacitance remains unchanged because potential $V$ also doubles proportionally',
      'Capacitance quadruples due to the square law of electrostatics',
    ],
    correctIndex: 2,
    explanation: 'Capacitance $C = Q/V$ is a geometric constant ($C = 4\\pi\\epsilon_0 R$ for a sphere). Doubling $Q$ doubles the potential $V$, leaving the ratio $Q/V$ strictly constant.',
    hints: [
      'Think of a water bucket: does pouring more water increase the bucket’s cross-sectional area?',
      'Recall $V = \\frac{kQ}{R}$. If $Q$ doubles, what happens to $V$?',
      'Since both $Q$ and $V$ scale together, $C = Q/V$ is purely a property of size, shape, and medium.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03_parallel_plate_drag',
    nodeId: NODE_C12_PHY_023,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each physical parameter to its correct role in determining parallel plate capacitance $C = \\frac{\\epsilon_0 A}{d}$.',
    dragItems: [
      { label: 'Plate Area (A)', targetId: 'slot_area' },
      { label: 'Plate Separation (d)', targetId: 'slot_dist' },
      { label: 'Permittivity (ε₀)', targetId: 'slot_eps' },
      { label: 'Surface Density (σ)', targetId: 'slot_sigma' },
    ],
    correctMapping: {
      slot_area: 'Plate Area (A)',
      slot_dist: 'Plate Separation (d)',
      slot_eps: 'Permittivity (ε₀)',
      slot_sigma: 'Surface Density (σ)',
    },
    explanation: 'Capacitance scales directly with Plate Area (larger charge reservoir), inversely with Separation (smaller gap yields smaller voltage for the same charge density), and directly with medium Permittivity.',
    hints: [
      'Look at the numerator of $\\epsilon_0 A / d$: Area and Permittivity are on top.',
      'Separation $d$ is in the denominator (inverse relationship).',
      'Surface charge density is charge per unit area: $\\sigma = Q/A$.',
    ],
  },
  {
    id: 'ch_04_drift_speed',
    nodeId: NODE_C12_PHY_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the typical order of magnitude of electron drift velocity ($v_d$) in a copper wire carrying an ordinary current of $1\\,\\text{A}$?',
    options: [
      'Speed of light (~$3 \\times 10^8\\,\\text{m/s}$)',
      'Speed of sound in air (~$340\\,\\text{m/s}$)',
      'Extremely slow, around $10^{-4}\\,\\text{m/s}$ (~$0.1\\,\\text{mm/s}$)',
      'Random thermal speed (~$10^6\\,\\text{m/s}$)',
    ],
    correctIndex: 2,
    explanation: 'Although electrical signals travel at near the speed of light along the wire, the physical drift speed of electrons is sluggish (~$10^{-4}\\,\\text{m/s}$). A large current flows because the electron density $n$ in copper is enormous (~$8.5 \\times 10^{28}\\,\\text{m}^{-3}$).',
    hints: [
      'Do not confuse the speed of the electric field signal with the net physical migration speed of the electron swarm.',
      'Electrons undergo billions of collisions every second, yielding only a tiny net bias.',
      'The drift velocity is slower than a crawling snail (fractions of a millimeter per second).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_res_temp_metal',
    nodeId: NODE_C12_PHY_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the electrical resistance of a metallic conductor increase as temperature increases?',
    options: [
      'The number density of free electrons decreases rapidly',
      'Lattice ions vibrate with larger amplitude, causing more frequent collisions and shorter relaxation time',
      'The electrons expand and become heavier',
      'The electric field inside the wire weakens with temperature',
    ],
    correctIndex: 1,
    explanation: 'In metals, carrier density $n$ is nearly constant. As temperature rises, enhanced thermal vibrations of lattice positive ions cause more frequent collisions, reducing the relaxation time $\\tau$. Since $\\rho = m/(n e^2 \\tau)$, resistivity and resistance increase.',
    hints: [
      'Think of trying to sprint through a crowded room where everyone starts jumping and swinging their arms.',
      'More vigorous lattice vibrations shorten the mean free time $\\tau$ between collisions.',
      'Resistivity formula: $\\rho = \\frac{m}{n e^2 \\tau}$. A smaller $\\tau$ means a larger $\\rho$.',
    ],
  },
  {
    id: 'ch_06_dielectric_polarization',
    nodeId: NODE_C12_PHY_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a slab of dielectric (constant $K$) is placed between charged capacitor plates, the internal electric field reduces to $E_0 / K$. What causes this reduction?',
    options: [
      'Free electrons flow across the dielectric gap to short-circuit the plates',
      'Induced bound surface charges create an internal opposing field $E_b$',
      'The dielectric absorbs the electric field lines and converts them to heat',
      'The plates lose their charge to the surrounding air',
    ],
    correctIndex: 1,
    explanation: 'Electric field displaces positive and negative bound charges within the dielectric molecules. This macroscopic polarization produces induced surface charges that generate an opposing internal electric field $E_b$, weakening the net field: $E = E_0 - E_b = E_0/K$.',
    hints: [
      'Dielectrics are insulators—free electrons do NOT cross the gap.',
      'The molecules stretch (induced dipoles) or align (polar dipoles).',
      'The bound charges on the dielectric surfaces face opposite plate polarities, creating an opposing reverse field.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_07_series_cap_sort',
    nodeId: NODE_C12_PHY_024,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Order the steps to calculate the equivalent capacitance and charge on three series capacitors ($C_1, C_2, C_3$) connected across voltage $V$.',
    sortItems: [
      'Recognize that equal charge Q flows onto each capacitor in series',
      'Apply 1/Cs = 1/C1 + 1/C2 + 1/C3 and take the reciprocal to find Cs',
      'Compute total charge from the supply: Q = Cs * V',
      'Find individual voltages: V1 = Q/C1, V2 = Q/C2, V3 = Q/C3',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First identify charge invariance ($Q_1=Q_2=Q_3=Q$), compute reciprocal sum $1/C_s$, calculate total charge $Q = C_s V$, and then find individual voltage drops $V_i = Q/C_i$.',
    hints: [
      'Series connection rule starts with shared charge across all elements.',
      'You cannot find individual voltage drops until you have the common charge $Q$.',
      'The final check is always $V_1 + V_2 + V_3 = V$.',
    ],
  },

  // ── STANDARD (8 to 14) ──
  {
    id: 'ch_08_triangle_pe_num',
    nodeId: NODE_C12_PHY_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Three identical point charges $q = +2\\,\\mu\\text{C}$ are placed at the vertices of an equilateral triangle of side $0.3\\,\\text{m}$. What is the total electrostatic PE of the system in milliJoules (mJ)? (Take $k = 9.0 \\times 10^9\\,\\text{N m}^2/\\text{C}^2$)',
    correctAnswer: 360,
    tolerance: 5,
    unit: 'mJ',
    explanation: 'Total energy is the scalar sum of all 3 distinct pairs: $U = U_{12} + U_{23} + U_{31} = 3 \\times \\frac{k q^2}{r} = 3 \\times \\frac{9\\times 10^9 \\times (2\\times 10^{-6})^2}{0.3} = 3 \\times \\frac{9\\times 10^9 \\times 4\\times 10^{-12}}{0.3} = 3 \\times 0.12 = 0.36\\,\\text{J} = 360\\,\\text{mJ}$.',
    hints: [
      'An equilateral triangle has 3 equal sides and 3 unique charge pairs: (1,2), (2,3), and (1,3).',
      'For one pair: $U_1 = (9\\times 10^9 \\times 4\\times 10^{-12}) / 0.3 = 0.12\\,\\text{J}$.',
      'Multiply by 3 pairs and convert Joules to milliJoules ($1\\,\\text{J} = 1000\\,\\text{mJ}$).',
    ],
  },
  {
    id: 'ch_09_cap_dielectric_energy',
    nodeId: NODE_C12_PHY_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A capacitor is connected to a DC power supply of constant voltage $V$. While connected, a dielectric slab ($K=4$) is smoothly inserted between the plates. What happens to the charge $Q$ and stored energy $U$?',
    options: [
      'Q quadruples and U quadruples',
      'Q stays constant and U drops by 4x',
      'Q drops by 4x and U increases by 4x',
      'Q quadruples and U remains unchanged',
    ],
    correctIndex: 0,
    explanation: 'Because the battery is continuously connected, voltage $V$ is fixed. Capacitance increases to $C\' = KC = 4C$. Therefore, charge $Q\' = C\'V = 4CV = 4Q$ (battery pumps $3Q$ additional charge) and energy $U\' = \\frac{1}{2}C\'V^2 = 4 \\times (\\frac{1}{2}CV^2) = 4U$.',
    hints: [
      'Check the boundary condition: Is the battery CONNECTED or DISCONNECTED?',
      'Connected means $V$ is constant. Use $Q = CV$ and $U = \\frac{1}{2} C V^2$.',
      'Since $C$ increases by $4\\times$, both $Q$ and $U$ scale directly with $C$.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_10_micro_ohm_construct',
    nodeId: NODE_C12_PHY_028,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the derivation steps linking microscopic drift to the macroscopic Ohm’s Law ($V = IR$).',
    availableParts: ['I = n e A v_d', 'v_d = e E tau / m', 'E = V / L', 'R = m L / (n e^2 A tau)'],
    targetState: 'I = n e A v_d v_d = e E tau / m E = V / L R = m L / (n e^2 A tau)',
    validationHint: 'Add the 4 fundamental equations in order from current definition to electric field substitution and final resistance expression.',
    explanation: 'Starting with $I = n e A v_d$, substitute $v_d = \\frac{e E \\tau}{m}$ to get $I = \\frac{n e^2 A \\tau}{m} E$. Then substitute $E = V/L$ to get $I = \\left(\\frac{n e^2 A \\tau}{m L}\\right) V$, which gives $V = I R$ with $R = \\frac{m L}{n e^2 A \\tau}$.',
    hints: [
      'Start with the current carried by moving charges: $I = n e A v_d$.',
      'Express drift velocity $v_d$ in terms of acceleration and relaxation time $\\tau$.',
      'Convert uniform electric field $E$ into potential difference over length $V/L$.',
    ],
  },
  {
    id: 'ch_11_je_graph_slope',
    nodeId: NODE_C12_PHY_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a laboratory test, Current Density ($J$) versus Electric Field ($E$) is plotted for two conductors A and B. Line A has a steeper slope than Line B. Which conductor has higher resistivity?',
    options: [
      'Conductor A, because a steeper slope means greater resistance',
      'Conductor B, because slope represents conductivity (σ = 1/ρ), so a shallower slope means lower σ and higher ρ',
      'Both have identical resistivity because J is proportional to E for all metals',
      'Resistivity cannot be deduced without knowing wire length and cross-section',
    ],
    correctIndex: 1,
    explanation: 'From the vector form of Ohm’s law, $J = \\sigma E$. On a graph of $J$ (y-axis) vs $E$ (x-axis), the slope equals conductivity $\\sigma$. Conductor B has a lower slope $\\implies$ smaller conductivity $\\sigma \\implies$ higher resistivity $\\rho = 1/\\sigma$.',
    hints: [
      'Look at $J = \\sigma E$: $y = m x$, so slope $m = \\sigma$.',
      'Conductivity is the reciprocal of resistivity: $\\sigma = 1/\\rho$.',
      'A shallower slope means lower conductivity, which corresponds to higher resistivity.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_12_dipole_pe_angle',
    nodeId: NODE_C12_PHY_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electric dipole of moment $p = 4.0 \\times 10^{-6}\\,\\text{C}\\cdot\\text{m}$ is in a uniform electric field $E = 5.0 \\times 10^4\\,\\text{N/C}$. Calculate the work required in Joules (J) to rotate the dipole from stable equilibrium ($\\theta = 0^\\circ$) to unstable equilibrium ($\\theta = 180^\\circ$).',
    correctAnswer: 0.4,
    tolerance: 0.02,
    unit: 'J',
    explanation: 'Potential energy of dipole $U(\\theta) = -p E \\cos\\theta$. At $\\theta = 0^\\circ$, $U_i = -pE = -(4.0\\times 10^{-6})(5.0\\times 10^4) = -0.2\\,\\text{J}$. At $\\theta = 180^\\circ$, $U_f = -pE\\cos 180^\\circ = +pE = +0.2\\,\\text{J}$. Work done $W = U_f - U_i = +0.2 - (-0.2) = 0.4\\,\\text{J}$.',
    hints: [
      'Recall dipole potential energy formula: $U = -p E \\cos\\theta$.',
      'Work done by external agent is $W = U(180^\\circ) - U(0^\\circ) = 2 p E$.',
      'Compute $2 \\times (4.0\\times 10^{-6}) \\times (5.0\\times 10^4)$.',
    ],
  },
  {
    id: 'ch_13_parallel_series_circuit',
    nodeId: NODE_C12_PHY_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two capacitors of $3\\,\\mu\\text{F}$ and $6\\,\\mu\\text{F}$ are connected in parallel, and this combination is connected in series with a $9\\,\\mu\\text{F}$ capacitor across $20\\,\\text{V}$. What is the total charge $Q$ drawn from the supply in microCoulombs ($\\mu\\text{C}$)?',
    correctAnswer: 90,
    tolerance: 2,
    unit: 'μC',
    explanation: '1. Parallel combination: $C_p = 3 + 6 = 9\\,\\mu\\text{F}$. 2. Series with $9\\,\\mu\\text{F}$: $1/C_{eq} = 1/9 + 1/9 = 2/9 \\implies C_{eq} = 4.5\\,\\mu\\text{F}$. 3. Total charge $Q = C_{eq} V = 4.5\\,\\mu\\text{F} \\times 20\\,\\text{V} = 90\\,\\mu\\text{C}$.',
    hints: [
      'First combine the parallel pair by adding them: $C_p = C_1 + C_2$.',
      'Then combine $C_p$ in series with $C_3$: $C_{eq} = \\frac{C_p \\times C_3}{C_p + C_3}$.',
      'Finally use $Q = C_{eq} V$.',
    ],
  },
  {
    id: 'ch_14_temp_coeff_calc',
    nodeId: NODE_C12_PHY_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A platinum resistance sensor on the rover has $R_0 = 50.0\\,\\Omega$ at $0^\\circ\\text{C}$. At a lunar midday temperature of $100^\\circ\\text{C}$, its resistance reads $69.0\\,\\Omega$. Calculate the temperature coefficient of resistance $\\alpha$ in $10^{-3}\\,^\\circ\\text{C}^{-1}$ (enter the multiplier only, e.g., 3.8 for $3.8\\times 10^{-3}$).',
    correctAnswer: 3.8,
    tolerance: 0.1,
    unit: '×10⁻³ °C⁻¹',
    explanation: '$\\alpha = \\frac{R - R_0}{R_0 \\Delta T} = \\frac{69.0 - 50.0}{50.0 \\times 100} = \\frac{19.0}{5000} = 0.0038\\,^\\circ\\text{C}^{-1} = 3.8 \\times 10^{-3}\\,^\\circ\\text{C}^{-1}$.',
    hints: [
      'Formula: $R = R_0 (1 + \\alpha \\Delta T) \\implies \\alpha = \\frac{\\Delta R}{R_0 \\Delta T}$.',
      'Change in resistance $\\Delta R = 69.0 - 50.0 = 19.0\\,\\Omega$.',
      'Denominator is $50.0 \\times 100 = 5000$. Divide $19 / 5000$ and multiply by $10^3$.',
    ],
  },

  // ── ADVANCED (15 to 22) ──
  {
    id: 'ch_15_battery_work_dissipation',
    nodeId: NODE_C12_PHY_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A battery of EMF $V$ charges an uncharged capacitor $C$ to voltage $V$. The work done by the battery is $W = QV = CV^2$, but the capacitor stores only $U = \\frac{1}{2}CV^2$. What physically happens to the other $\\frac{1}{2}CV^2$ of energy?',
    options: [
      'It is converted into electrostatic potential energy of the battery plates',
      'It is lost as Joule heat in connecting wires and electromagnetic radiation, regardless of circuit resistance',
      'It remains stored as chemical energy in the electrolyte',
      'The law of conservation of energy does not apply to transient charging circuits',
    ],
    correctIndex: 1,
    explanation: 'During charging, current flows through the circuit resistance. Integrating $I^2 R\\,dt$ from $t=0$ to $\\infty$ yields exactly $\\frac{1}{2} C V^2$, entirely independent of the value of $R$. If $R \\to 0$, the energy is radiated away as electromagnetic waves.',
    hints: [
      'Consider the charging current flowing through the finite resistance of the connecting leads.',
      'As charge accumulates, the potential opposes incoming charge, resulting in resistive heating.',
      'Even in a zero-resistance superconductor circuit, radiation losses account for exactly half the total work.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_16_partial_dielectric',
    nodeId: NODE_C12_PHY_025,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A parallel plate capacitor has plate separation $d = 6.0\\,\\text{mm}$ and vacuum capacitance $C_0 = 120\\,\\text{pF}$. A dielectric slab of constant $K = 3.0$ and thickness $t = 3.0\\,\\text{mm}$ is inserted between the plates. What is the new capacitance in pF?',
    correctAnswer: 180,
    tolerance: 3,
    unit: 'pF',
    explanation: 'Formula for partially filled dielectric: $C = \\frac{\\epsilon_0 A}{d - t + t/K} = \\frac{C_0 d}{d - t + t/K}$. Here $d - t + t/K = 6 - 3 + 3/3 = 3 + 1 = 4.0\\,\\text{mm}$. Thus $C = C_0 \\times (d / 4.0) = 120 \\times (6 / 4) = 180\\,\\text{pF}$.',
    hints: [
      'Treat the partial dielectric as two capacitors in series: an air gap $(d-t)$ and a dielectric slab $t$.',
      'Effective separation becomes $d_{eff} = (d - t) + \\frac{t}{K}$.',
      'Calculate $d_{eff} = (6 - 3) + 3/3 = 4\\,\\text{mm}$, then $C = C_0 \\times \\frac{d}{d_{eff}}$.',
    ],
  },
  {
    id: 'ch_17_quadrupole_net_pe',
    nodeId: NODE_C12_PHY_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Four charges $+q, -q, +q, -q$ are placed cyclically at the vertices of a square of side $a$. Is the total electrostatic potential energy zero?',
    options: [
      'Yes, because there are two positive and two negative charges that symmetrically cancel',
      'No, because the 4 attractive side pairs ($-4 k q^2 / a$) outweigh the 2 repulsive diagonal pairs ($+2 k q^2 / (a\\sqrt{2})$), making $U < 0$',
      'No, because potential energy is a vector that points towards the center',
      'Yes, because electric field at the center of the square is zero',
    ],
    correctIndex: 1,
    explanation: '$U_{total} = 4\\left(-\\frac{kq^2}{a}\\right) + 2\\left(+\\frac{kq^2}{a\\sqrt{2}}\\right) = \\frac{kq^2}{a}(-4 + \\sqrt{2}) \\approx -2.586\\,\\frac{kq^2}{a} \\neq 0$. Symmetry of charges does not imply zero scalar pairwise potential energy!',
    hints: [
      'Count all unique pairs: for 4 charges, there are $4 \\times 3 / 2 = 6$ distinct pairs.',
      'There are 4 sides of length $a$ with unlike charges ($+q$ and $-q$).',
      'There are 2 diagonals of length $a\\sqrt{2}$ with like charges ($+q,+q$ and $-q,-q$). Sum their signed scalar energies.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_18_mobility_drift_eval',
    nodeId: NODE_C12_PHY_027,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A semiconductor slab has electron mobility $\\mu_e = 0.36\\,\\text{m}^2\\text{V}^{-1}\\text{s}^{-1}$ and free carrier density $n = 5.0 \\times 10^{21}\\,\\text{m}^{-3}$. When an electric field of $200\\,\\text{V/m}$ is applied, calculate the current density $J$ in $\\text{A/m}^2$.',
    correctAnswer: 57600,
    tolerance: 500,
    unit: 'A/m²',
    explanation: '1. Drift velocity $v_d = \\mu E = 0.36 \\times 200 = 72\\,\\text{m/s}$. 2. Current density $J = n e v_d = (5.0 \\times 10^{21}) \\times (1.602 \\times 10^{-19}) \\times 72 = 801 \\times 72 \\approx 57,672\\,\\text{A/m}^2$.',
    hints: [
      'Recall mobility relation: $v_d = \\mu E$.',
      'Current density formula: $J = n e v_d = n e \\mu E$.',
      'Multiply: $(5.0 \\times 10^{21}) \\times (1.602 \\times 10^{-19}) \\times 0.36 \\times 200$.',
    ],
  },
  {
    id: 'ch_19_thermistor_vs_metal',
    nodeId: NODE_C12_PHY_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An ISRO scientist tests two temperature probes: Probe X shows a resistance drop from $100\\,\\text{k}\\Omega$ to $2\\,\\text{k}\\Omega$ as temperature rises, while Probe Y rises linearly from $100\\,\\Omega$ to $140\\,\\Omega$. How should they be classified?',
    options: [
      'Probe X is a metallic alloy (Nichrome); Probe Y is a pure metal',
      'Probe X is an NTC Semiconductor Thermistor (carrier generation dominates); Probe Y is a metallic conductor (lattice scattering dominates)',
      'Probe X is a superconductor; Probe Y is an insulator',
      'Both are metals with different crystallographic orientations',
    ],
    correctIndex: 1,
    explanation: 'Probe X has a negative temperature coefficient ($\\alpha < 0$) characteristic of semiconductors where thermal energy frees exponentially more electron-hole pairs. Probe Y has $\\alpha > 0$ with linear response, typical of metals.',
    hints: [
      'Look at the direction of resistance change: X decreases sharply, Y increases linearly.',
      'Semiconductors (thermistors) have $\\alpha < 0$ because carrier concentration $n(T)$ surges.',
      'Metals have $\\alpha > 0$ because carrier concentration $n$ is fixed while collision rate increases.',
    ],
  },
  {
    id: 'ch_20_wire_stretch_res',
    nodeId: NODE_C12_PHY_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A cylindrical wire of resistance $R = 4.0\\,\\Omega$ is uniformly drawn (stretched) so that its length increases by $25\\%$ without changing its mass or density. What is its new resistance in $\\Omega$?',
    correctAnswer: 6.25,
    tolerance: 0.1,
    unit: 'Ω',
    explanation: 'Volume $V = A L$ is constant. If length becomes $L\' = 1.25 L$, area must become $A\' = A / 1.25$. New resistance $R\' = \\rho \\frac{L\'}{A\'} = \\rho \\frac{1.25 L}{A / 1.25} = (1.25)^2 \\left(\\rho \\frac{L}{A}\\right) = 1.5625 \\times 4.0 = 6.25\\,\\Omega$.',
    hints: [
      'When a wire is stretched, its volume $V = A L$ remains strictly constant.',
      'If length increases by $25\\%$, $L\' = 1.25 L$. Thus $A\' = A / 1.25$.',
      'Resistance scales as $L/A \\propto L^2$. Calculate $4.0 \\times (1.25)^2$.',
    ],
  },
  {
    id: 'ch_21_energy_density_field',
    nodeId: NODE_C12_PHY_026,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The electric field between parallel plates with vacuum is $E = 2.0 \\times 10^6\\,\\text{V/m}$. Calculate the electrostatic energy density $u$ in $\\text{J/m}^3$. (Take $\\epsilon_0 = 8.854 \\times 10^{-12}\\,\\text{F/m}$)',
    correctAnswer: 17.7,
    tolerance: 0.3,
    unit: 'J/m³',
    explanation: 'Energy density $u = \\frac{1}{2}\\epsilon_0 E^2 = 0.5 \\times 8.854 \\times 10^{-12} \\times (2.0 \\times 10^6)^2 = 0.5 \\times 8.854 \\times 10^{-12} \\times 4.0 \\times 10^{12} = 17.708\\,\\text{J/m}^3$.',
    hints: [
      'Formula for electrostatic energy density in vacuum: $u = \\frac{1}{2}\\epsilon_0 E^2$.',
      'Square the electric field: $(2.0 \\times 10^6)^2 = 4.0 \\times 10^{12}$.',
      'Multiply by $0.5 \\times 8.854 \\times 10^{-12}$.',
    ],
  },
  {
    id: 'ch_22_nonohmic_diode',
    nodeId: NODE_C12_PHY_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does the microscopic derivation $V = \\left(\\frac{m L}{n e^2 A \\tau}\\right) I$ FAIL to describe the non-linear $V\\text{–}I$ characteristic of a semiconductor p-n junction diode?',
    options: [
      'Because the electron mass $m$ changes drastically inside semiconductors',
      'Because the derivation assumes carrier density $n$ and relaxation time $\\tau$ are independent of applied voltage $V$, which is violated in a diode',
      'Because charge carriers in semiconductors have a positive charge $+e$ only',
      'Because the law of conservation of momentum fails in crystal lattices',
    ],
    correctIndex: 1,
    explanation: 'Ohm’s law assumes $n$ and $\\tau$ are material constants independent of electric field and bias voltage. In a p-n diode, carrier injection across the depletion barrier is an exponential function of voltage ($I = I_0(e^{eV/k_B T} - 1)$), making $R$ dynamic and voltage-dependent.',
    hints: [
      'Review the assumptions made in deriving $V = IR$: we treated $n, e, m, \\tau$ as constants.',
      'In a diode, does the population of mobile carriers across the junction stay constant as voltage is increased past 0.7 V?',
      'Non-ohmic devices have voltage-dependent carrier populations and depletion barriers.',
    ],
  },
];

// ─── EXPLORATION STEPS (Brilliant-Style Interactive Learning) ────────────────
const EXPLORATION_STEPS = [
  {
    title: '1. Multi-Charge Potential Energy Sandbox',
    instruction: 'Drag charges around to assemble a triangle. Watch how like charges increase positive PE (work required to compress) while unlike charges create negative bound energy.',
    interactionType: 'drag-charge',
    nodeId: NODE_C12_PHY_021,
  },
  {
    title: '2. Parallel Plate Capacitor Geometry',
    instruction: 'Adjust Plate Area (A) and Separation (d). Observe how field line density and capacitance $C = \\epsilon_0 A/d$ respond instantly in real-time.',
    interactionType: 'slider-capacitor',
    nodeId: NODE_C12_PHY_023,
  },
  {
    title: '3. Dielectric Polarization & Bound Charges',
    instruction: 'Slide different dielectric materials into the gap. Watch atomic dipoles align, setting up reverse electric field $E_b$ and boosting capacitance by factor $K$.',
    interactionType: 'dielectric-select',
    nodeId: NODE_C12_PHY_025,
  },
  {
    title: '4. Battery Connected vs. Isolated Capacitor',
    instruction: 'Toggle between Battery Connected ($V=\\text{const}$) and Isolated ($Q=\\text{const}$) before inserting the dielectric. Observe the dramatic difference in stored energy!',
    interactionType: 'toggle-battery',
    nodeId: NODE_C12_PHY_026,
  },
  {
    title: '5. Electron Drift & Temperature Scattering',
    instruction: 'Increase Temperature and Applied Electric Field. Watch vibrating lattice ions disrupt electron drift, reducing relaxation time $\\tau$ and increasing resistance.',
    interactionType: 'drift-sim',
    nodeId: NODE_C12_PHY_027,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ─────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you halve the plate separation $d$ while keeping voltage $V$ constant, what happens to the electric field $E$ and stored energy $U$?',
    options: [
      'E stays constant, U doubles',
      'Both E and U double',
      'E doubles, U quadruples',
      'E halves, U doubles',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the plate separation slider to 0.5x in the simulation below and verify how the field intensity and energy gauge double!',
    nodeId: NODE_C12_PHY_023,
  },
  {
    question: 'Predict: If temperature rises in a semiconductor thermistor, what happens to its resistance compared to a copper wire?',
    options: [
      'Thermistor resistance drops sharply, while copper resistance rises linearly',
      'Both thermistor and copper resistances rise at the same rate',
      'Thermistor resistance rises, copper drops',
      'Both drop to zero due to thermal ionization',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the temperature slider up to 100°C and observe the dual Resistance-Temperature curve comparison!',
    nodeId: NODE_C12_PHY_030,
  },
];

// ─── OBSERVATION QUESTIONS ───────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'When you insert a high-K dielectric into an ISOLATED capacitor, what happened to the voltage reading on the electrostatic voltmeter?',
    observableOptions: [
      'Voltage dropped to V₀ / K because bound surface charges weakened the net field',
      'Voltage increased because the dielectric added more voltage',
      'Voltage stayed constant at 100 V',
      'Voltage oscillated wildly',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_025,
  },
  {
    question: 'In the electron lattice simulation, what do you notice about individual electron speeds vs their net drift velocity to the left?',
    observableOptions: [
      'Individual random speeds are massive (~10⁶ m/s), but net drift is a slow crawl (~10⁻⁴ m/s)',
      'Electrons travel in straight parallel laser beams at the speed of light',
      'Electrons stay completely stationary until collisions occur',
      'Higher temperature makes all electrons drift strictly faster in one direction',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_027,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ─────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Rover Power Subsystem Design Challenge',
  description: 'Design a high-reliability capacitor bank to deliver 120 Joules of pulse power for a lunar drill motor at 400 V, operating across -150°C to +100°C.',
  steps: [
    'Calculate baseline capacitance needed: C = 2U / V² = 2(120)/(400²) = 1.5 mF (1500 μF).',
    'Select Ceramic Multi-layer Dielectrics (X7R / Barium Titanate, K ≈ 1200) to keep mass under 200g.',
    'Form series strings of 200V-rated capacitors with balancing resistors to handle 400V supply safely.',
    'Incorporate NTC thermistor heating jackets to compensate for extreme cold-temperature copper resistance surge.',
  ],
};

// ─── PROPS INTERFACE ──────────────────────────────────────────────────────────
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ────────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_021,
  title: 'Electrostatic Energy, Capacitance & Microscopic Conduction',
  definition: 'Comprehensive Class 12 ISC Physics framework covering electrostatic potential energy of charge systems, parallel plate capacitance, dielectric polarization, stored energy, microscopic electron drift, and temperature-dependent resistance.',
  eli5: 'Think of charges as magnets that store energy when pushed together, capacitors as electric tanks storing charge in an invisible field, and electric current as millions of bouncing billiard balls slowly drifting through an obstacle course of vibrating atoms.',
  misconceptions: [
    {
      misconception: 'Capacitance C increases when you put more charge Q on a conductor because C = Q/V.',
      correction: 'C is purely a geometric and medium property. Doubling Q doubles V in the exact same ratio, leaving C = Q/V constant.',
    },
    {
      misconception: 'Dielectrics increase capacitance because they conduct charge across the gap.',
      correction: 'Dielectrics are insulators. They polarize: bound surface charges create an opposing field Eb that lowers V for a given Q, thereby increasing C.',
    },
    {
      misconception: 'Potential energy of a 3-charge system has an extra 3-body force term.',
      correction: 'Coulomb force is purely two-body. Total PE is the scalar sum of all unique pairwise combinations: U = U12 + U23 + U31.',
    },
    {
      misconception: 'Electrons race through circuit wires at the speed of light.',
      correction: 'Electrons drift at a snail’s pace (~0.1 mm/s). The electric field wave propagates at near the speed of light (~10^8 m/s).',
    },
    {
      misconception: 'The slope of a Current Density (J) vs Electric Field (E) graph represents resistivity.',
      correction: 'From J = σE, the slope of a J-E graph represents conductivity σ. Resistivity is the reciprocal of the slope (ρ = 1/slope).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the SI unit of capacitance?',
      options: ['Farad (F)', 'Henry (H)', 'Coulomb (C)', 'Ohm-meter (Ω·m)'],
      correctIndex: 0,
    },
    {
      question: 'In an isolated capacitor (charge constant), what happens to stored energy U when plate separation is doubled?',
      options: ['U doubles because mechanical work was done separating the plates', 'U halves', 'U quadruples', 'U stays unchanged'],
      correctIndex: 0,
    },
    {
      question: 'What is the relationship between current I and drift velocity vd?',
      options: ['I = n e A vd', 'I = vd / (n e A)', 'I = n e² A vd', 'I = m vd / (e τ)'],
      correctIndex: 0,
    },
    {
      question: 'How does the resistance of a semiconductor thermistor behave when heated?',
      options: ['Decreases exponentially', 'Increases linearly', 'Stays constant', 'Oscillates'],
      correctIndex: 0,
    },
    {
      question: 'What is the electrostatic potential energy of an electric dipole p aligned with field E (θ = 0°)?',
      options: ['-pE (Minimum, Stable)', '+pE (Maximum, Unstable)', 'Zero', 'pE / 2'],
      correctIndex: 0,
    },
    {
      question: 'Two identical 10 μF capacitors connected in series have an equivalent capacitance of:',
      options: ['5 μF', '20 μF', '10 μF', '0.2 μF'],
      correctIndex: 0,
    },
    {
      question: 'What is the microscopic expression for resistivity ρ?',
      options: ['ρ = m / (n e² τ)', 'ρ = n e² τ / m', 'ρ = m L / (n e A)', 'ρ = e τ / m'],
      correctIndex: 0,
    },
    {
      question: 'The energy density in a vacuum electric field E is given by:',
      options: ['1/2 ε₀ E²', 'ε₀ E²', '1/2 ε₀ V²', 'Q² / (2 ε₀)'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Mastery achieved when the student understands pairwise PE summation, parallel-plate scaling, dielectric polarization mechanics, capacitor combinations, drift velocity derivations, and temperature coefficients.',
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function C12_PhysicsElectrostaticSystemChargesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_021,
  title = DEFAULT_PROPS.title || 'Electrostatic System of Charges & Capacitors',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Brilliant-style Interactive Exploration State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Physical Interactive Variables (Sliders & Toggles)
  // 1. Charge Sandbox
  const [chargeQ1, setChargeQ1] = useState(2.0); // microCoulombs
  const [chargeQ2, setChargeQ2] = useState(-3.0); // microCoulombs
  const [chargeQ3, setChargeQ3] = useState(2.0); // microCoulombs
  const [chargeDistR, setChargeDistR] = useState(0.15); // meters

  // 2. Parallel Plate Capacitor Sandbox
  const [plateAreaCm2, setPlateAreaCm2] = useState(200); // cm^2
  const [plateGapMm, setPlateGapMm] = useState(2.0); // mm
  const [appliedVoltage, setAppliedVoltage] = useState(100); // Volts
  const [selectedDielectricK, setSelectedDielectricK] = useState(1.0); // K (1=Air, 3=Paper, 6=Mica, 80=Water)
  const [isBatteryConnected, setIsBatteryConnected] = useState(true); // Battery lock vs isolated
  const [trappedChargeQ, setTrappedChargeQ] = useState(0); // For disconnected mode

  // 3. Electron Drift & Lattice Sandbox
  const [temperatureCelsius, setTemperatureCelsius] = useState(25); // -150 to +200 C
  const [electricFieldStrength, setElectricFieldStrength] = useState(150); // V/m
  const [carrierMaterial, setCarrierMaterial] = useState<'copper' | 'thermistor'>('copper');
  const [selectedSubsystem, setSelectedSubsystem] = useState<string | null>(null);

  // Hint & Question States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery & Animation Feedback States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection States
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const electronCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED PHYSICAL QUANTITIES ───────────────────────────────────────────
  // 1. Electrostatic Potential Energy of Triangle System
  const systemPEJoules = useMemo(() => {
    const q1 = chargeQ1 * 1e-6;
    const q2 = chargeQ2 * 1e-6;
    const q3 = chargeQ3 * 1e-6;
    const r = chargeDistR;
    const u12 = (K_COULOMB * q1 * q2) / r;
    const u23 = (K_COULOMB * q2 * q3) / r;
    const u31 = (K_COULOMB * q3 * q1) / r;
    return u12 + u23 + u31;
  }, [chargeQ1, chargeQ2, chargeQ3, chargeDistR]);

  // 2. Parallel Plate Capacitance & Energy
  const areaM2 = useMemo(() => plateAreaCm2 * 1e-4, [plateAreaCm2]);
  const gapM = useMemo(() => plateGapMm * 1e-3, [plateGapMm]);

  const capacitanceFarads = useMemo(() => {
    return (selectedDielectricK * EPSILON_0 * areaM2) / gapM;
  }, [selectedDielectricK, areaM2, gapM]);

  const liveCapacitancePicofarads = useMemo(() => {
    return capacitanceFarads * 1e12;
  }, [capacitanceFarads]);

  // Effective Voltage & Charge depending on battery connection
  const effectiveVoltage = useMemo(() => {
    if (isBatteryConnected) return appliedVoltage;
    if (capacitanceFarads > 0 && trappedChargeQ > 0) {
      return trappedChargeQ / capacitanceFarads;
    }
    return appliedVoltage;
  }, [isBatteryConnected, appliedVoltage, capacitanceFarads, trappedChargeQ]);

  const storedChargeMicroCoulombs = useMemo(() => {
    if (isBatteryConnected) {
      return capacitanceFarads * appliedVoltage * 1e6;
    }
    return trappedChargeQ * 1e6;
  }, [isBatteryConnected, capacitanceFarads, appliedVoltage, trappedChargeQ]);

  const storedEnergyMicroJoules = useMemo(() => {
    if (isBatteryConnected) {
      return 0.5 * capacitanceFarads * Math.pow(appliedVoltage, 2) * 1e6;
    }
    if (capacitanceFarads > 0) {
      return (0.5 * Math.pow(trappedChargeQ, 2)) / capacitanceFarads * 1e6;
    }
    return 0;
  }, [isBatteryConnected, capacitanceFarads, appliedVoltage, trappedChargeQ]);

  const electricFieldBetweenPlates = useMemo(() => {
    return effectiveVoltage / gapM;
  }, [effectiveVoltage, gapM]);

  // 3. Microscopic Drift & Resistance vs Temperature
  const relaxationTimeTau = useMemo(() => {
    const tempKelvin = temperatureCelsius + 273.15;
    const tauBase = 2.5e-14;
    return tauBase * (300 / Math.max(50, tempKelvin));
  }, [temperatureCelsius]);

  const driftVelocityMmPerSec = useMemo(() => {
    const vd = (ELEC_CHARGE * electricFieldStrength * relaxationTimeTau) / ELEC_MASS;
    return vd * 1000; // mm/s
  }, [electricFieldStrength, relaxationTimeTau]);

  const liveResistivity = useMemo(() => {
    if (carrierMaterial === 'copper') {
      const n_copper = 8.5e28;
      return ELEC_MASS / (n_copper * Math.pow(ELEC_CHARGE, 2) * relaxationTimeTau);
    } else {
      const tempKelvin = temperatureCelsius + 273.15;
      const Eg = 1.1 * 1.602e-19;
      const kB = 1.38e-23;
      const n_therm = 1e20 * Math.exp(-Eg / (2 * kB * tempKelvin));
      return ELEC_MASS / (Math.max(1e12, n_therm) * Math.pow(ELEC_CHARGE, 2) * relaxationTimeTau);
    }
  }, [carrierMaterial, relaxationTimeTau, temperatureCelsius]);

  // ─── FILTERED CHALLENGES BY ADAPTIVE BKT MASTERY ────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ──────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY AFTER BKT UPDATES ──────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── SYNC TRAPPED CHARGE WHEN BATTERY DISCONNECTS ──────────────────────────
  useEffect(() => {
    if (!isBatteryConnected && trappedChargeQ === 0) {
      setTrappedChargeQ(capacitanceFarads * appliedVoltage);
    } else if (isBatteryConnected) {
      setTrappedChargeQ(0);
    }
  }, [isBatteryConnected, capacitanceFarads, appliedVoltage, trappedChargeQ]);

  // ─── CANVAS 1: ELECTRON DRIFT & LATTICE SCATTERING ANIMATION ───────────────
  useEffect(() => {
    const canvas = electronCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const numElectrons = 35;
    const electrons: { x: number; y: number; vx: number; vy: number }[] = [];

    for (let i = 0; i < numElectrons; i++) {
      electrons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }

    const latticeCols = 8;
    const latticeRows = 3;
    const spacingX = canvas.width / (latticeCols + 1);
    const spacingY = canvas.height / (latticeRows + 1);

    const render = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const vibAmp = Math.max(1, (temperatureCelsius + 150) / 40);

      // 1. Draw Lattice Positive Ions (+Cu²⁺)
      for (let c = 1; c <= latticeCols; c++) {
        for (let r = 1; r <= latticeRows; r++) {
          const baseX = c * spacingX;
          const baseY = r * spacingY;
          const jitterX = (Math.random() - 0.5) * vibAmp;
          const jitterY = (Math.random() - 0.5) * vibAmp;

          ctx.beginPath();
          ctx.arc(baseX + jitterX, baseY + jitterY, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#f97316';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ea580c';
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+', baseX + jitterX, baseY + jitterY);
        }
      }

      // 2. Animate and Render Drifting Electrons
      const driftAcceleration = -(electricFieldStrength / 100) * 0.15;
      const thermalSpeedMultiplier = Math.sqrt((temperatureCelsius + 273) / 300);

      for (let i = 0; i < electrons.length; i++) {
        const e = electrons[i];

        e.vx += (Math.random() - 0.5) * 0.8 * thermalSpeedMultiplier;
        e.vy += (Math.random() - 0.5) * 0.8 * thermalSpeedMultiplier;
        e.vx += driftAcceleration;

        e.x += e.vx;
        e.y += e.vy;

        if (e.x < 0) e.x = canvas.width;
        if (e.x > canvas.width) e.x = 0;
        if (e.y < 0) e.y = canvas.height;
        if (e.y > canvas.height) e.y = 0;

        for (let c = 1; c <= latticeCols; c++) {
          for (let r = 1; r <= latticeRows; r++) {
            const ix = c * spacingX;
            const iy = r * spacingY;
            const dx = e.x - ix;
            const dy = e.y - iy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 10) {
              e.vx = (Math.random() - 0.5) * 2 * thermalSpeedMultiplier;
              e.vy = (Math.random() - 0.5) * 2 * thermalSpeedMultiplier;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#0284c7';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Electric Field E → [${electricFieldStrength} V/m]`, 10, 16);
      ctx.fillText(`Net Drift Speed vd: ${driftVelocityMmPerSec.toFixed(3)} mm/s (← towards positive terminal)`, 10, 28);

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [temperatureCelsius, electricFieldStrength, driftVelocityMmPerSec]);

  // ─── ESCALATING HINTS CALLBACK ──────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT TIMER (10s) ──────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DISCOVERY ANSWER HANDLER ───────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratory. Let us explore the physics directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all physical parameters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting competency challenges. Think carefully and analyze each system.');
  }, []);

  // ─── PREDICTION HANDLER ───────────────────────────────────────────────────
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to check your intuition.');
  }, []);

  // ─── SUB-SYSTEM SELECTION CLICK (Exploration 1) ─────────────────────────────
  const handleSubsystemClick = useCallback((id: string) => {
    setSelectedSubsystem(id);
    audioManager.play('tap');
    const msgs: Record<string, string> = {
      q1: 'Charge q1 (+2 μC) contributes pairwise potentials with q2 and q3.',
      q2: 'Negative charge q2 (-3 μC) creates deep attractive potential wells.',
      q3: 'Charge q3 (+2 μC) completes the equilateral triangle.',
    };
    speechManager.speak(msgs[id] || '');
  }, []);

  // ─── SLIDER HANDLERS ────────────────────────────────────────────────────────
  const handlePlateAreaChange = useCallback((val: number) => {
    setPlateAreaCm2(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePlateGapChange = useCallback((val: number) => {
    setPlateGapMm(val);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleDielectricChange = useCallback((kVal: number) => {
    setSelectedDielectricK(kVal);
    audioManager.play('pop');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleBatteryToggle = useCallback((connected: boolean) => {
    setIsBatteryConnected(connected);
    audioManager.play('tap');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleTempChange = useCallback((temp: number) => {
    setTemperatureCelsius(temp);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleFieldChange = useCallback((field: number) => {
    setElectricFieldStrength(field);
    audioManager.play('count');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // ─── COMPLETION & SCORE RECORDING ───────────────────────────────────────────
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Module completed successfully! Review your score and misconception profile.');
  }, [errors, onComplete]);

  // ─── ADVANCE TO NEXT CHALLENGE ──────────────────────────────────────────────
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── CENTRAL ANSWER EVALUATION HANDLER ──────────────────────────────────────
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors((e) => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete step-by-step physical breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DRAG & SORT HANDLERS ───────────────────────────────────────────────────
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base = prev.length === challenge.sortItems?.length ? prev : challenge.sortItems?.map((_, i) => i) || [];
      const arr = [...base];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 20, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-2xl shadow-lg shadow-cyan-900/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                ISC Class 12 Physics
              </span>
              <span className="text-xs text-slate-400 font-mono">Electrostatics & Current</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty / Score Indicators */}
        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 border-rose-500 text-rose-400'
                : 'bg-cyan-950/60 border-cyan-500 text-cyan-400'
            }`}
          >
            Tier: {difficulty}
          </motion.div>

          <div className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300">
            Score: {Math.max(0, 100 - errors * 5)}%
          </div>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-6xl opacity-10 font-mono">ISRO</div>
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-200/80 mt-2 bg-indigo-900/40 p-2.5 rounded-lg border border-indigo-700/30">
              ⚡ <strong>Mission Challenge:</strong> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Intuition Check</span>
              <span className="text-xs text-slate-500">• Low Stakes Discovery</span>
            </div>
            <p className="text-base text-white font-semibold leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700/50 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓</span>}
                      {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold mr-1">✗</span>}
                      {opt}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Your intuition for trapped charge is razor-sharp.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter interactive laboratory"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-900/40 flex items-center gap-2"
                >
                  Enter Interactive Laboratory 🔬 →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ──────────���─────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Interactive Concept Studio ({currentSlide + 1} / {EXPLORATION_STEPS.length})
            </span>
            <span className="text-xs text-slate-400">Step {currentSlide + 1} of 5</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h2 className="text-lg font-black text-cyan-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-sm text-amber-300/90 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── SLIDE 0: MULTI-CHARGE PE LAB ── */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
                      <svg viewBox="0 0 300 240" className="w-full max-w-[280px]">
                        <defs>
                          <radialGradient id="posGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="negGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        <line x1="150" y1="40" x2="60" y2="190" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                        <line x1="60" y1="190" x2="240" y2="190" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                        <line x1="240" y1="190" x2="150" y2="40" stroke="#475569" strokeWidth="2" strokeDasharray="4" />

                        <text x="90" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle">r = {chargeDistR}m</text>
                        <text x="150" y="205" fill="#94a3b8" fontSize="10" textAnchor="middle">r = {chargeDistR}m</text>
                        <text x="210" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle">r = {chargeDistR}m</text>

                        <g onClick={() => handleSubsystemClick('q1')} className="cursor-pointer" role="button" aria-label="Charge q1">
                          <circle cx="150" cy="40" r="28" fill={chargeQ1 >= 0 ? "url(#posGlow)" : "url(#negGlow)"} />
                          <circle cx="150" cy="40" r="16" fill={chargeQ1 >= 0 ? "#ef4444" : "#3b82f6"} stroke="#ffffff" strokeWidth="1.5" />
                          <text x="150" y="44" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                            {chargeQ1 > 0 ? `+${chargeQ1}` : chargeQ1}μC
                          </text>
                        </g>

                        <g onClick={() => handleSubsystemClick('q2')} className="cursor-pointer" role="button" aria-label="Charge q2">
                          <circle cx="60" cy="190" r="28" fill={chargeQ2 >= 0 ? "url(#posGlow)" : "url(#negGlow)"} />
                          <circle cx="60" cy="190" r="16" fill={chargeQ2 >= 0 ? "#ef4444" : "#3b82f6"} stroke="#ffffff" strokeWidth="1.5" />
                          <text x="60" y="194" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                            {chargeQ2 > 0 ? `+${chargeQ2}` : chargeQ2}μC
                          </text>
                        </g>

                        <g onClick={() => handleSubsystemClick('q3')} className="cursor-pointer" role="button" aria-label="Charge q3">
                          <circle cx="240" cy="190" r="28" fill={chargeQ3 >= 0 ? "url(#posGlow)" : "url(#negGlow)"} />
                          <circle cx="240" cy="190" r="16" fill={chargeQ3 >= 0 ? "#ef4444" : "#3b82f6"} stroke="#ffffff" strokeWidth="1.5" />
                          <text x="240" y="194" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                            {chargeQ3 > 0 ? `+${chargeQ3}` : chargeQ3}μC
                          </text>
                        </g>
                      </svg>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Charge q₁ (Top):</span>
                          <span className="font-mono text-cyan-400">{chargeQ1} μC</span>
                        </div>
                        <input
                          aria-label="Adjust Charge q1"
                          type="range"
                          min={-5}
                          max={5}
                          step={1}
                          value={chargeQ1}
                          onChange={(e) => setChargeQ1(parseFloat(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Charge q₂ (Left):</span>
                          <span className="font-mono text-cyan-400">{chargeQ2} μC</span>
                        </div>
                        <input
                          aria-label="Adjust Charge q2"
                          type="range"
                          min={-5}
                          max={5}
                          step={1}
                          value={chargeQ2}
                          onChange={(e) => setChargeQ2(parseFloat(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Separation r:</span>
                          <span className="font-mono text-cyan-400">{chargeDistR} m</span>
                        </div>
                        <input
                          aria-label="Adjust charge separation distance r"
                          type="range"
                          min={0.05}
                          max={0.5}
                          step={0.05}
                          value={chargeDistR}
                          onChange={(e) => setChargeDistR(parseFloat(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                        <div className="text-xs text-slate-400">Total Electrostatic Potential Energy:</div>
                        <div className="text-xl font-mono font-bold text-cyan-300">
                          U = {systemPEJoules.toFixed(3)} Joules
                        </div>
                        <div className="text-xs text-slate-400">
                          Status:{' '}
                          <span className={systemPEJoules < 0 ? 'text-blue-400 font-bold' : 'text-rose-400 font-bold'}>
                            {systemPEJoules < 0 ? 'Bound Attractive Configuration (U < 0)' : 'Unbound Repulsive State (U > 0)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 1: PARALLEL PLATE CAPACITOR LAB ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {!predictionMade && (
                    <div className="p-3 bg-indigo-950/60 border border-indigo-700/50 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-indigo-300 uppercase">Predict Before Manipulating:</p>
                      <p className="text-sm text-white font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Select prediction: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-2.5 bg-amber-950/60 border border-amber-700/60 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                      <span>{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <button
                        aria-label="Confirm testing verification"
                        onClick={() => setPredictionVerified(true)}
                        className="px-3 py-1 bg-amber-600 text-white font-bold rounded-lg"
                      >
                        I Tested It! ✓
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                      <svg viewBox="0 0 300 200" className="w-full max-w-[280px]">
                        <rect x="50" y="30" width="200" height="16" rx="3" fill="#ef4444" />
                        <text x="150" y="42" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          + + + + + Positive Plate (+Q) + + + + +
                        </text>

                        {Array.from({ length: 9 }).map((_, i) => {
                          const x = 65 + i * 21;
                          return (
                            <g key={i}>
                              <line
                                x1={x}
                                y1="46"
                                x2={x}
                                y2={46 + plateGapMm * 30}
                                stroke="#38bdf8"
                                strokeWidth="1.5"
                              />
                              <polygon
                                points={`${x-3},${46 + plateGapMm * 15} ${x+3},${46 + plateGapMm * 15} ${x},${46 + plateGapMm * 15 + 6}`}
                                fill="#38bdf8"
                              />
                            </g>
                          );
                        })}

                        <rect x="50" y={46 + plateGapMm * 30} width="200" height="16" rx="3" fill="#3b82f6" />
                        <text x="150" y={58 + plateGapMm * 30} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          - - - - - Negative Plate (-Q) - - - - -
                        </text>

                        <text x="260" y={40 + plateGapMm * 15} fill="#94a3b8" fontSize="10">
                          d = {plateGapMm} mm
                        </text>
                        <text x="150" y="190" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Area A = {plateAreaCm2} cm²
                        </text>
                      </svg>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Plate Area (A):</span>
                          <span className="font-mono text-cyan-400">{plateAreaCm2} cm²</span>
                        </div>
                        <input
                          aria-label="Plate Area slider"
                          type="range"
                          min={50}
                          max={500}
                          step={25}
                          value={plateAreaCm2}
                          onChange={(e) => handlePlateAreaChange(parseFloat(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Plate Separation (d):</span>
                          <span className="font-mono text-cyan-400">{plateGapMm} mm</span>
                        </div>
                        <input
                          aria-label="Plate Separation slider"
                          type="range"
                          min={0.5}
                          max={4.0}
                          step={0.5}
                          value={plateGapMm}
                          onChange={(e) => handlePlateGapChange(parseFloat(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-700 text-center">
                          <div className="text-[10px] text-slate-400">Capacitance (C):</div>
                          <div className="text-sm font-mono font-bold text-cyan-300">
                            {liveCapacitancePicofarads.toFixed(1)} pF
                          </div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-700 text-center">
                          <div className="text-[10px] text-slate-400">Stored Energy (U):</div>
                          <div className="text-sm font-mono font-bold text-amber-300">
                            {storedEnergyMicroJoules.toFixed(2)} μJ
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: DIELECTRICS & POLARIZATION ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { name: 'Vacuum / Air', k: 1.0, color: 'border-slate-600' },
                      { name: 'Paper', k: 3.5, color: 'border-amber-600' },
                      { name: 'Mica', k: 6.0, color: 'border-purple-600' },
                      { name: 'Water (Polar)', k: 80.0, color: 'border-cyan-600' },
                    ].map((mat) => (
                      <motion.button
                        key={mat.name}
                        aria-label={`Select dielectric material: ${mat.name}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDielectricChange(mat.k)}
                        className={`p-3 rounded-xl text-left border ${
                          selectedDielectricK === mat.k
                            ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{mat.name}</div>
                        <div className="text-xs font-mono text-cyan-400 mt-1">K = {mat.k}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left space-y-1">
                      <div className="text-xs text-slate-400">Dielectric Constant Multiplier:</div>
                      <div className="text-2xl font-black font-mono text-cyan-300">{selectedDielectricK}x Boost</div>
                      <div className="text-xs text-slate-400">
                        Opposing Induced Field: $E_b = E_0(1 - 1/K)$
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-center">
                        <div className="text-[10px] text-slate-400">New Capacitance C':</div>
                        <div className="text-lg font-mono font-bold text-emerald-400">
                          {(liveCapacitancePicofarads).toFixed(1)} pF
                        </div>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-center">
                        <div className="text-[10px] text-slate-400">Internal Field E:</div>
                        <div className="text-lg font-mono font-bold text-cyan-300">
                          {(electricFieldBetweenPlates / 1000).toFixed(1)} kV/m
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 3: BATTERY CONNECTED VS ISOLATED ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <motion.button
                      aria-label="Toggle battery connected mode"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBatteryToggle(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        isBatteryConnected
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      🔋 Battery Connected (V = Constant)
                    </motion.button>
                    <motion.button
                      aria-label="Toggle battery disconnected isolated mode"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBatteryToggle(false)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        !isBatteryConnected
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      🔒 Battery Disconnected (Q = Constant)
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-700 text-center">
                      <div className="text-xs text-slate-400">Voltage Across Plates:</div>
                      <div className="text-base font-mono font-bold text-cyan-300">
                        {effectiveVoltage.toFixed(1)} V
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {isBatteryConnected ? 'Locked by battery' : 'Drops by 1/K'}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-700 text-center">
                      <div className="text-xs text-slate-400">Charge on Plates (Q):</div>
                      <div className="text-base font-mono font-bold text-emerald-300">
                        {storedChargeMicroCoulombs.toFixed(2)} μC
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {isBatteryConnected ? 'Increases by K×' : 'Trapped on plates'}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-700 text-center">
                      <div className="text-xs text-slate-400">Stored Energy (U):</div>
                      <div className="text-base font-mono font-bold text-amber-300">
                        {storedEnergyMicroJoules.toFixed(2)} μJ
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {isBatteryConnected ? 'Scales as 1/2 C V² (Increases)' : 'Scales as Q²/(2C) (Decreases!)'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 4: ELECTRON DRIFT & TEMPERATURE SCATTERING ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <canvas
                    ref={electronCanvasRef}
                    width={500}
                    height={150}
                    className="w-full rounded-xl border border-slate-800 shadow-inner"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Temperature (T):</span>
                        <span className="font-mono text-amber-400">{temperatureCelsius}°C</span>
                      </div>
                      <input
                        aria-label="Temperature slider"
                        type="range"
                        min={-150}
                        max={150}
                        step={10}
                        value={temperatureCelsius}
                        onChange={(e) => handleTempChange(parseFloat(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Electric Field (E):</span>
                        <span className="font-mono text-cyan-400">{electricFieldStrength} V/m</span>
                      </div>
                      <input
                        aria-label="Electric Field slider"
                        type="range"
                        min={50}
                        max={400}
                        step={25}
                        value={electricFieldStrength}
                        onChange={(e) => handleFieldChange(parseFloat(e.target.value))}
                        className="w-full accent-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Relaxation Time (τ): </span>
                      <span className="font-mono font-bold text-cyan-300">{(relaxationTimeTau * 1e14).toFixed(2)} × 10⁻¹⁴ s</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Drift Speed (vd): </span>
                      <span className="font-mono font-bold text-emerald-300">{driftVelocityMmPerSec.toFixed(3)} mm/s</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Resistivity (ρ): </span>
                      <span className="font-mono font-bold text-amber-300">{(liveResistivity * 1e8).toFixed(2)} × 10⁻⁸ Ω·m</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Proceed to free exploration sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/50"
              >
                Enter Sandbox Mode 🕹️ →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ──────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-cyan-300">Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400">Manipulate all parameters with zero grading pressure to build physical intuition.</p>
            </div>
            <motion.button
              aria-label="Start challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-900/40"
            >
              I Am Ready for Challenges! 🎯 →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase">Capacitor Bench</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Area: {plateAreaCm2} cm²</span>
                  <span className="text-slate-400">Gap: {plateGapMm} mm</span>
                  <span className="text-slate-400">K: {selectedDielectricK}</span>
                </div>
                <input
                  aria-label="Sandbox Plate Area"
                  type="range"
                  min={50}
                  max={500}
                  value={plateAreaCm2}
                  onChange={(e) => handlePlateAreaChange(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <input
                  aria-label="Sandbox Plate Gap"
                  type="range"
                  min={0.5}
                  max={4.0}
                  step={0.5}
                  value={plateGapMm}
                  onChange={(e) => handlePlateGapChange(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <div className="text-slate-500">Capacitance</div>
                  <div className="font-mono font-bold text-cyan-300">{liveCapacitancePicofarads.toFixed(1)} pF</div>
                </div>
                <div>
                  <div className="text-slate-500">Stored Energy</div>
                  <div className="font-mono font-bold text-amber-300">{storedEnergyMicroJoules.toFixed(2)} μJ</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase">Solid-State Drift Bench</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Temp: {temperatureCelsius}°C</span>
                  <span className="text-slate-400">Field: {electricFieldStrength} V/m</span>
                </div>
                <input
                  aria-label="Sandbox Temperature"
                  type="range"
                  min={-150}
                  max={150}
                  step={10}
                  value={temperatureCelsius}
                  onChange={(e) => handleTempChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <input
                  aria-label="Sandbox Electric Field"
                  type="range"
                  min={50}
                  max={400}
                  step={25}
                  value={electricFieldStrength}
                  onChange={(e) => handleFieldChange(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <div className="text-slate-500">Drift Speed vd</div>
                  <div className="font-mono font-bold text-emerald-300">{driftVelocityMmPerSec.toFixed(3)} mm/s</div>
                </div>
                <div>
                  <div className="text-slate-500">Relaxation Time τ</div>
                  <div className="font-mono font-bold text-cyan-300">{(relaxationTimeTau * 1e14).toFixed(1)} fs</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ───────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-cyan-400 font-mono">
                Competency: <strong className="uppercase">{challenge.competencyLevel}</strong>
              </span>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <div
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-950/50' : 'border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-base md:text-lg font-bold text-white leading-relaxed">
                {challenge.question}
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono border border-slate-700 shrink-0">
                {challenge.nodeId}
              </span>
            </div>

            {/* 1. MCQ Variant */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5 mt-5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.015, x: 4 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`text-left p-3.5 rounded-xl text-sm transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>
                          {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓</span>}
                          {showExplanation && i !== challenge.correctIndex && <span className="text-slate-500 mr-1">✗</span>}
                          {opt}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Variant */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Available Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['slot_area', 'slot_dist', 'slot_eps', 'slot_sigma'].map((slotId) => (
                    <div
                      key={slotId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                        {slotId.replace('slot_', 'Role: ')}
                      </div>
                      <div className="text-xs font-bold text-cyan-300">
                        {droppedLabels[slotId] ? `✓ ${droppedLabels[slotId]}` : <span className="text-slate-600">Drop Label Here</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged mapping"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mapping ✓
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Variant */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-3 cursor-grab text-xs text-slate-200"
                    >
                      <span className="w-5 h-5 rounded-md bg-cyan-900/60 text-cyan-400 font-bold flex items-center justify-center text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify sort order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Order ✓
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Variant */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Numeric answer input"
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-sm text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check numeric answer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Derivation Variant */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono rounded-lg text-xs border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <div key={i} className="px-3 py-1 bg-indigo-900/80 text-white rounded-lg text-xs font-mono flex items-center gap-2">
                      <span>{part}</span>
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click equation components above to build the proof</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify equation derivation"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Derivation ✓
                </motion.button>
              </div>
            )}
          </div>

          {/* Step-by-Step Progressive Disclosure Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-2xl border border-indigo-700/50 space-y-3"
            >
              <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <span>💡</span> Methodical Step-by-Step Explanation:
              </h3>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-indigo-100 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 font-mono">Step {i + 1}: </span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next step in explanation"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-indigo-800 text-white rounded-xl text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to next challenge or finish"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/50"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Module 🎓 →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, MASTERY SUMMARY & REFLECTION ──────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-500/40 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">ISC Physics Mastery Complete!</h2>
            <div className="text-sm text-emerald-300 font-mono">
              Final Score: {Math.max(0, 100 - errors * 5)}% • Mastery Tier: {masteryLevel.toUpperCase()}
            </div>
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              {errors === 0
                ? 'Flawless performance! You have mastered electrostatic potential energy, capacitor combinations, dielectric polarization, and microscopic Ohm’s law.'
                : errors <= 3
                ? 'Strong understanding! Review your minor gaps below before proceeding to electromagnetic induction.'
                : 'Good effort! Revisit the interactive labs and study the misconception profile below to solidify your foundations.'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-cyan-800/40 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-lg">💭</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Concept Reflection</h3>
            </div>
            <p className="text-xs text-slate-300">
              Deepen your conceptual retention by reflecting on these core questions:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  aria-label="Reflection question 1: What was the most surprising thing you learned?"
                  type="text"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g., How stored energy drops when dielectric is inserted into an isolated capacitor..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <input
                  aria-label="Reflection question 2: How would you explain this to a friend?"
                  type="text"
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  placeholder="e.g., Capacitance depends purely on shape and medium, not on how much charge you add..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <input
                  aria-label="Reflection question 3: Where in real life might you use this?"
                  type="text"
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g., Designing spacecraft pulse capacitors or temperature sensors..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <motion.button
                aria-label="Save reflections"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('success');
                }}
                className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold"
              >
                {reflectionSubmitted ? '✓ Reflections Saved' : 'Save Reflections'}
              </motion.button>
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personal Misconception Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 text-xs space-y-1">
                      <div className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</div>
                      <div className="text-emerald-400 font-medium">✓ Physical Truth: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="text-xs space-y-0.5">
              <div className="font-bold text-amber-300">Spaced Review Schedule (SM-2):</div>
              <div className="text-slate-400">
                Next active recall session due in{' '}
                <strong className="text-white font-mono">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </div>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/40 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">🛠️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM OVERLAY FEEDBACK ──────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PhysicsElectrostaticSystemChargesSim;