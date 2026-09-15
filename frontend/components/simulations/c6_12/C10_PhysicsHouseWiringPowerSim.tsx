'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 10 Physics Nodes) ───
const NODE_C10_PHY_031 = 'c10_phy_031'; // House wiring & power distribution
const NODE_C10_PHY_032 = 'c10_phy_032'; // Magnetic effect of current (Oersted)
const NODE_C10_PHY_033 = 'c10_phy_033'; // Electromagnetic induction
const NODE_C10_PHY_034 = 'c10_phy_034'; // Transformer
const NODE_C10_PHY_035 = 'c10_phy_035'; // Calorimetry and specific heat capacity
const NODE_C10_PHY_036 = 'c10_phy_036'; // Latent heat and change of state
const NODE_C10_PHY_037 = 'c10_phy_037'; // Radioactivity and nuclear structure
const NODE_C10_PHY_038 = 'c10_phy_038'; // Alpha, beta, and gamma decay
const NODE_C10_PHY_039 = 'c10_phy_039'; // Uses and hazards of radioisotopes
const NODE_C10_PHY_040 = 'c10_phy_040'; // Nuclear fission
const NODE_C10_PHY_041 = 'c10_phy_041'; // Nuclear fusion
const NODE_C10_PHY_042 = 'c10_phy_042'; // Electrostatics - Coulomb's law

const ALL_NODE_IDS = [
  NODE_C10_PHY_031,
  NODE_C10_PHY_032,
  NODE_C10_PHY_033,
  NODE_C10_PHY_034,
  NODE_C10_PHY_035,
  NODE_C10_PHY_036,
  NODE_C10_PHY_037,
  NODE_C10_PHY_038,
  NODE_C10_PHY_039,
  NODE_C10_PHY_040,
  NODE_C10_PHY_041,
  NODE_C10_PHY_042,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Power Grid to Quantum Core: The Energy Architect',
  intro: 'A state-of-the-art green research facility in Bengaluru is experiencing power anomalies, thermal spikes, and radiation shielding calibration errors. As the chief electrical & nuclear systems physicist, you must trace power from the 400 kV grid down to domestic ring circuits, tune transformers, balance calorimeter heats, safely isolate nuclear decays, and stabilize electrostatics.',
  context: 'From transmission lines carrying 220 V at 50 Hz to atomic nuclei undergoing fission/fusion, you will manipulate physical variables in real-time to solve operational crises.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Why does electricity leave power stations at 400,000 Volts (400 kV) instead of the 220 Volts used in your home appliances?',
  options: [
    'To make the electrons travel faster than light speed',
    'To reduce current (I) so that heat loss (I²R) in wires is dramatically minimized',
    'Because high voltage pushes more charge through thinner rubber insulators',
    'To make the generator magnets spin 1000 times faster',
  ],
  correctIndex: 1,
  hintAfter: 'Power is P = VI. For fixed power, higher voltage means much smaller current, slashing I²R line heat losses!',
};

// ─── CHALLENGE INTERFACE ───
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
}

// ─── 24 RICH CHALLENGES (Foundation, Standard, Advanced with NEP 2020 Competencies) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c10_phy_031)
  {
    id: 'ch_phy_01',
    nodeId: NODE_C10_PHY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the voltage and AC frequency of the domestic electrical supply in India?',
    options: ['110 V at 60 Hz', '220 V at 50 Hz', '440 V at 50 Hz', '220 V at 100 Hz'],
    correctIndex: 1,
    explanation: 'Indian domestic supply is standardized at 220 V single-phase alternating current at a frequency of 50 Hz (50 cycles/sec, alternating direction 100 times/sec).',
    hints: [
      'Think about the standard rating printed on Indian appliance labels.',
      'The AC frequency corresponds to 50 cycles per second.',
      'The standard domestic root-mean-square voltage is 220 V at 50 Hz.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label (c10_phy_031)
  {
    id: 'ch_phy_02',
    nodeId: NODE_C10_PHY_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a standard 3-pin plug looking from the front, correctly map the terminals and their functions.',
    dragItems: [
      { label: 'Earth (Top / Longer)', targetId: 'pin_top' },
      { label: 'Neutral (Left / Blue)', targetId: 'pin_left' },
      { label: 'Live (Right / Brown)', targetId: 'pin_right' },
    ],
    correctMapping: {
      pin_top: 'Earth (Top / Longer)',
      pin_left: 'Neutral (Left / Blue)',
      pin_right: 'Live (Right / Brown)',
    },
    explanation: 'The top pin is Earth (longer & thicker so earth connects first and disconnects last), left is Neutral (~0 V, Blue/Black), and right is Live (220 V, Brown/Red).',
    hints: [
      'The longer, thicker pin always connects safety ground first.',
      'When facing the socket, Live is on the right.',
      'Neutral sits on the left, completing the circuit return path.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation - Understanding (c10_phy_032)
  {
    id: 'ch_phy_03',
    nodeId: NODE_C10_PHY_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "In Oersted's experiment, what happens to a magnetic compass placed directly beneath a wire carrying current from South to North?",
    options: [
      'The north pole of the needle deflects towards the West',
      'The needle does not move because copper is non-magnetic',
      'The needle spins continuously like a motor',
      'The north pole deflects towards the East',
    ],
    correctIndex: 0,
    explanation: "By the SNOW rule (Current South to North Over wire causes North pole to deflect West; or right-hand thumb rule below wire), the needle's north pole deflects West.",
    hints: [
      'Use the SNOW memory rule: South to North Over West.',
      'Grasp the wire with the right hand, thumb pointing North (upwards).',
      'Beneath the wire, the curled fingers point towards the West.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Drag Sort (c10_phy_031)
  {
    id: 'ch_phy_04',
    nodeId: NODE_C10_PHY_031,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of grid distribution stages from power generation to your room socket.',
    sortItems: [
      'Power Station Generation (11 kV)',
      'Step-up Transformer for Grid Transmission (132/220/400 kV)',
      'City Substation Step-down (33 kV → 11 kV)',
      'Local Distribution Step-down Transformer (220 V, 50 Hz)',
      'Consumer kWh Meter & Main Ring Circuit',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Generation (11 kV) → Step-up (400 kV) → Heavy Substation (33 kV) → Local Substation (220 V) → Consumer kWh Meter.',
    hints: [
      'Start at the power plant generator.',
      'Voltage is stepped up high for transmission, then stepped down in stages.',
      'The domestic kWh meter receives 220 V at the final domestic entry.',
    ],
  },
  // 5. Foundation - Recall (c10_phy_038)
  {
    id: 'ch_phy_05',
    nodeId: NODE_C10_PHY_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly ranks radioactive emissions in decreasing order of penetrating power?',
    options: [
      'Alpha > Beta > Gamma',
      'Gamma > Beta > Alpha',
      'Beta > Gamma > Alpha',
      'Alpha > Gamma > Beta',
    ],
    correctIndex: 1,
    explanation: 'Gamma rays have the highest penetrating power (require thick lead/concrete), Beta is moderate (stopped by aluminium), and Alpha is least penetrating (stopped by paper).',
    hints: [
      'Massless photons penetrate much deeper than heavy helium nuclei.',
      'Alpha particles are heavy (4u, +2e) and stop in air or thin paper.',
      'The order of penetrating power is Gamma > Beta > Alpha.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Numeric (c10_phy_035)
  {
    id: 'ch_phy_06',
    nodeId: NODE_C10_PHY_035,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the heat energy required (in Joules) to raise the temperature of 0.5 kg of water from 25 °C to 75 °C. (Specific heat capacity of water c = 4200 J kg⁻¹ K⁻¹).',
    correctAnswer: 105000,
    tolerance: 500,
    unit: 'J',
    explanation: 'Q = m · c · ΔT = 0.5 kg × 4200 J/(kg·K) × (75 - 25) K = 0.5 × 4200 × 50 = 105,000 J = 1.05 × 10⁵ J.',
    hints: [
      'Use the formula Q = m · c · ΔT.',
      'ΔT = 75 - 25 = 50 °C = 50 K.',
      'Multiply: 0.5 × 4200 × 50.',
    ],
  },
  // 7. Foundation - Recall (c10_phy_037)
  {
    id: 'ch_phy_07',
    nodeId: NODE_C10_PHY_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many protons and neutrons are contained in the nucleus of Uranium-238 (²³⁸₉₂U)?',
    options: [
      '92 protons, 238 neutrons',
      '92 protons, 146 neutrons',
      '146 protons, 92 neutrons',
      '238 protons, 92 neutrons',
    ],
    correctIndex: 1,
    explanation: 'Atomic number Z = 92 (number of protons). Mass number A = 238 (nucleons). Number of neutrons = A - Z = 238 - 92 = 146 neutrons.',
    hints: [
      'The lower subscript (Z) gives the number of protons.',
      'The upper superscript (A) gives the total nucleons (protons + neutrons).',
      'Subtract: 238 - 92 to get neutrons.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Foundation - Understanding (c10_phy_034)
  {
    id: 'ch_phy_08',
    nodeId: NODE_C10_PHY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a step-up or step-down transformer fail completely when connected to a steady Direct Current (DC) battery source?',
    options: [
      'The battery voltage is too low to excite the iron atoms',
      'A steady DC current produces a constant magnetic flux, so no changing flux exists to induce secondary EMF',
      'DC current reverses polarity too quickly for the primary coil',
      'Soft iron cores only conduct alternating magnetic fields',
    ],
    correctIndex: 1,
    explanation: "Faraday's law dictates that induced EMF requires a rate of change of magnetic flux (dΦ/dt). Steady DC creates a static magnetic field (dΦ/dt = 0), yielding zero induced EMF in the secondary coil.",
    hints: [
      'What is the fundamental condition required for electromagnetic induction?',
      'Does steady DC current produce a changing or constant magnetic field?',
      'Without changing magnetic flux, induced secondary voltage is exactly zero.',
    ],
  },
  // 9. Standard - Application (c10_phy_034)
  {
    id: 'ch_phy_09',
    nodeId: NODE_C10_PHY_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A step-down transformer has 1000 turns in the primary coil and is connected to a 220 V AC mains. If the output voltage is to be 11 V, how many turns must be wound on the secondary coil?',
    correctAnswer: 50,
    tolerance: 0,
    unit: 'turns',
    explanation: 'Vs / Vp = Ns / Np ⇒ Ns = Np × (Vs / Vp) = 1000 × (11 / 220) = 1000 × (1/20) = 50 turns.',
    hints: [
      'Use the transformer turns ratio equation: Vs / Vp = Ns / Np.',
      'Substitute: 11 / 220 = Ns / 1000.',
      'Ns = 1000 / 20 = 50 turns.',
    ],
  },
  // 10. Standard - Analysis (c10_phy_033)
  {
    id: 'ch_phy_10',
    nodeId: NODE_C10_PHY_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A bar magnet is held motionless inside a tightly wound solenoid connected to a sensitive galvanometer. What will the galvanometer read, and why?',
    options: [
      'A strong steady deflection proportional to magnet field strength',
      'Zero deflection, because there is no relative motion or rate of change of magnetic flux',
      'An alternating deflection oscillating at 50 Hz',
      'A steady deflection towards the North scale',
    ],
    correctIndex: 1,
    explanation: 'Electromagnetic induction requires a changing magnetic field linked with the conductor. When the magnet and coil are at rest relative to each other, magnetic flux is constant, so induced EMF = 0.',
    hints: [
      'Is there relative motion between the magnet and the coil?',
      'Does the magnetic field lines cut across the coils when everything is stationary?',
      'No relative motion means no flux change, hence zero galvanometer deflection.',
    ],
  },
  // 11. Standard - Application (c10_phy_038)
  {
    id: 'ch_phy_11',
    nodeId: NODE_C10_PHY_038,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the balanced nuclear decay equation for Thorium-234 (²³⁴₉₀Th) undergoing Beta (β⁻) emission.',
    availableParts: ['²³⁴₉₁Pa', '²³⁰₈₈Ra', '⁰₋₁e', '⁴₂He', 'γ', '+'],
    targetState: '²³⁴₉₁Pa + ⁰₋₁e',
    validationHint: 'In beta decay, a neutron converts to a proton: A remains unchanged (234), Z increases by 1 (90 → 91 Protactinium).',
    explanation: '²³⁴₉₀Th → ²³⁴₉₁Pa + ⁰₋₁e. A neutron becomes a proton (Z + 1), spitting out an electron (beta particle). Total nucleons (234) and charge (90 = 91 - 1) balance.',
    hints: [
      'In beta emission, a neutron becomes a proton, raising Z by 1.',
      'Mass number A stays 234; atomic number rises from 90 to 91 (Pa).',
      'Add the beta electron particle ⁰₋₁e to complete the equation.',
    ],
  },
  // 12. Standard - Application (c10_phy_036)
  {
    id: 'ch_phy_12',
    nodeId: NODE_C10_PHY_036,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How much total heat energy (in Joules) is required to convert 2 kg of ice at 0 °C completely into water at 20 °C? (Specific latent heat of fusion L = 3.36 × 10⁵ J kg⁻¹, c_water = 4200 J kg⁻¹ K⁻¹).',
    correctAnswer: 840000,
    tolerance: 1000,
    unit: 'J',
    explanation: 'Stage 1 (Melting): Q₁ = m · L = 2 × 336,000 = 672,000 J. Stage 2 (Warming water 0 to 20°C): Q₂ = m · c · ΔT = 2 × 4200 × 20 = 168,000 J. Total Q = Q₁ + Q₂ = 840,000 J = 8.4 × 10⁵ J.',
    hints: [
      'Break into two stages: melting at 0°C (Q = mL) + warming water (Q = mcΔT).',
      'Q₁ = 2 × 336,000 = 672,000 J.',
      'Q₂ = 2 × 4200 × 20 = 168,000 J. Sum both numbers.',
    ],
  },
  // 13. Standard - Analysis (c10_phy_042)
  {
    id: 'ch_phy_13',
    nodeId: NODE_C10_PHY_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Two identical small conducting spheres carry charges +q and +4q separated by distance r with electrostatic repulsive force F. If their separation distance is doubled to 2r, what is the new force?',
    options: ['F / 4', 'F / 2', '2 F', 'F / 16'],
    correctIndex: 0,
    explanation: "Coulomb's law is an inverse-square law: F ∝ 1/r². When distance doubles (r → 2r), the force becomes 1/(2)² = 1/4 of its initial value (F / 4).",
    hints: [
      "Recall Coulomb's inverse-square law: Force ∝ 1 / (distance)².",
      'If separation increases by a factor of 2, force changes by 1 / (2²).',
      '1 / 4 = F / 4.',
    ],
  },
  // 14. Standard - Evaluation (c10_phy_039)
  {
    id: 'ch_phy_14',
    nodeId: NODE_C10_PHY_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A paper manufacturing plant in Maharashtra needs an automated sensor to measure paper thickness continuously during roller production. Which radioisotope source is ideal?',
    options: [
      'Americium-241 (Alpha emitter) — because alpha particles stop on dust',
      'Strontium-90 (Beta emitter) — because beta rays are partially absorbed by thin paper sheets in proportion to thickness',
      'Cobalt-60 (High-energy Gamma emitter) — because gamma rays penetrate several feet of lead',
      'Uranium-235 (Fission fuel) — because it provides thermal energy to dry the paper',
    ],
    correctIndex: 1,
    explanation: 'Strontium-90 (beta emitter) is ideal because beta radiation has moderate penetration that is sensitively absorbed by millimeters of paper. Alpha cannot penetrate at all, and gamma penetrates too easily without variation.',
    hints: [
      'Alpha particles are blocked completely by even a thin sheet of paper.',
      'Gamma rays pass straight through thin paper without being absorbed.',
      'Beta particles provide the precise intermediate sensitivity needed to detect thickness variations.',
    ],
  },
  // 15. Standard - Application (c10_phy_042)
  {
    id: 'ch_phy_15',
    nodeId: NODE_C10_PHY_042,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An insulated metal sphere has acquired an excess of 5 × 10¹² electrons. Calculate the net negative electric charge on the sphere in microcoulombs (μC). (Charge on electron e = 1.6 × 10⁻¹⁹ C; 1 μC = 10⁻⁶ C).',
    correctAnswer: 0.8,
    tolerance: 0.05,
    unit: 'μC',
    explanation: 'Q = n · e = (5 × 10¹²) × (1.6 × 10⁻¹⁹ C) = 8.0 × 10⁻⁷ C = 0.8 × 10⁻⁶ C = 0.8 μC.',
    hints: [
      'Use charge quantization: Q = n · e.',
      'Multiply: 5 × 10¹² × 1.6 × 10⁻¹⁹ = 8.0 × 10⁻⁷ Coulombs.',
      'Convert 8.0 × 10⁻⁷ C to microcoulombs (divide by 10⁻⁶) = 0.8 μC.',
    ],
  },
  // 16. Standard - Analysis (c10_phy_040 & c10_phy_041)
  {
    id: 'ch_phy_16',
    nodeId: NODE_C10_PHY_040,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which statement correctly distinguishes Nuclear Fission from Nuclear Fusion?',
    options: [
      'Fission combines light hydrogen nuclei; Fusion splits heavy uranium nuclei',
      'Fission splits a heavy nucleus into lighter fragments releasing neutrons; Fusion combines light nuclei into a heavier nucleus requiring millions of degrees Kelvin',
      'Fission produces zero radioactive waste; Fusion produces heavy transuranic radioactive waste',
      'Fission cannot be controlled in reactors; Fusion is the standard commercial power source today',
    ],
    correctIndex: 1,
    explanation: 'Nuclear fission splits heavy nuclei (U-235) with neutrons (controllable in commercial reactors); nuclear fusion combines light nuclei (H → He) at extreme thermonuclear temperatures (~15 million K in the Sun).',
    hints: [
      'Remember: Fission = splitting heavy atoms; Fusion = joining light atoms.',
      'The Sun is powered by thermonuclear fusion at millions of degrees.',
      'Commercial nuclear reactors (e.g., Tarapur, Kudankulam) use controlled fission.',
    ],
  },
  // 17. Advanced - Evaluation / Scenario (c10_phy_031)
  {
    id: 'ch_phy_17',
    nodeId: NODE_C10_PHY_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An electrician incorrectly connects the household fuse in the Neutral wire instead of the Live wire. An electric geyser with a grounded metal casing suffers an internal insulation breakdown where the live wire touches the metal casing. What danger arises?',
    options: [
      'The appliance will not consume any power from the grid',
      'If the fuse blows, the geysers metal casing remains at dangerous 220 V live potential, creating a lethal shock hazard if touched',
      'The geyser will boil water twice as fast',
      'The kWh meter will run backwards and credit units',
    ],
    correctIndex: 1,
    explanation: 'The fuse MUST always be placed in the LIVE wire. If in neutral and blown, the appliance remains directly connected to the 220 V live line, leaving the metal body live and lethal to any human touching it.',
    hints: [
      'Where is the 220 V high electrical potential supplied from?',
      'If a fuse in the neutral wire blows, is the connection to the 220 V live wire severed?',
      'The metal casing remains hot at 220 V, posing a deadly shock hazard.',
    ],
    misconceptionIndex: 1,
  },
  // 18. Advanced - Numeric Method of Mixtures (c10_phy_035)
  {
    id: 'ch_phy_18',
    nodeId: NODE_C10_PHY_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 0.2 kg block of copper at 100 °C is dropped into 0.28 kg of water at 20 °C in a copper calorimeter of mass 0.1 kg at 20 °C. What is the final equilibrium temperature T (in °C)? (c_copper = 390 J kg⁻¹ K⁻¹, c_water = 4200 J kg⁻¹ K⁻¹).',
    correctAnswer: 25.0,
    tolerance: 0.8,
    unit: '°C',
    explanation: 'Heat lost by hot copper = Heat gained by water + calorimeter. 0.2 × 390 × (100 - T) = [0.28 × 4200 + 0.1 × 390] × (T - 20). 78(100 - T) = (1176 + 39)(T - 20) ⇒ 7800 - 78T = 1215T - 24300 ⇒ 32100 = 1293T ⇒ T ≈ 24.82 °C (≈ 25.0 °C).',
    hints: [
      'Equation: m_cu · c_cu · (100 - T) = (m_w · c_w + m_cal · c_cu) · (T - 20).',
      'Left: 78 · (100 - T) = 7800 - 78T.',
      'Right: (1176 + 39) · (T - 20) = 1215(T - 20). Solve for T.',
    ],
  },
  // 19. Advanced - Analysis / Verification (c10_phy_040)
  {
    id: 'ch_phy_19',
    nodeId: NODE_C10_PHY_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the induced fission reaction ²³⁵₉₂U + ¹₀n → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + x ¹₀n + Energy, what is the exact number of ejected neutrons x, and what accounts for the release of ~200 MeV energy?',
    options: [
      'x = 3 neutrons; energy originates from the mass defect (Δm) converted via E = Δm · c²',
      'x = 1 neutron; energy is purely the mechanical kinetic rebound of nucleons',
      'x = 2 neutrons; energy is from chemical bond rupture in the nucleus',
      'x = 4 neutrons; energy comes from cosmic gravitational collapse',
    ],
    correctIndex: 0,
    explanation: 'Mass balance: 235 + 1 = 141 + 92 + x(1) ⇒ 236 = 233 + x ⇒ x = 3 neutrons. Charge balance: 92 = 56 + 36 + 0. The product masses are slightly less than reactant masses; this mass defect Δm transforms to ~200 MeV energy via Einstein’s mass-energy equivalence.',
    hints: [
      'Equate total mass numbers: 235 + 1 = 141 + 92 + x.',
      '236 - 233 = 3 neutrons.',
      'The missing mass (mass defect) converts to energy according to E = Δm · c².',
    ],
  },
  // 20. Advanced - Drag Sort (c10_phy_042)
  {
    id: 'ch_phy_20',
    nodeId: NODE_C10_PHY_042,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the four sequential steps required to charge a neutral metal sphere negatively by electrostatic induction using a positively charged glass rod.',
    sortItems: [
      'Bring positively charged glass rod near (without touching) the neutral metal sphere',
      'Connect the far side of the sphere to Earth with a grounding wire (electrons enter from Earth)',
      'Disconnect the Earth grounding wire while keeping the glass rod in position',
      'Remove the positively charged glass rod so excess trapped negative charges distribute uniformly',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Step 1: Rod attracts electrons to near side, leaving far side positive. Step 2: Earthing neutralizes far side by drawing electrons from Earth. Step 3: Remove ground wire first to trap excess electrons. Step 4: Remove inducing rod.',
    hints: [
      'First bring the charged rod near to polarize charges without touching.',
      'Earth the far side so electrons flow up from Earth.',
      'Disconnect the earth wire BEFORE removing the rod so charge remains trapped.',
    ],
  },
  // 21. Advanced - Creativity / Staircase Wiring (c10_phy_031)
  {
    id: 'ch_phy_21',
    nodeId: NODE_C10_PHY_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In staircase wiring with two 2-way switches (S1 at ground floor, S2 at first floor) controlling a single landing bulb, what circuit state allows the lamp to glow?',
    options: [
      'The lamp only glows when both switches connect to the same common strapper wire (continuous circuit)',
      'The lamp glows only when one switch is turned off and the other disconnected',
      'Both switches must be connected directly to the Earth grounding wire',
      'The neutral wire must be connected through both switches in series',
    ],
    correctIndex: 0,
    explanation: 'A two-way staircase circuit uses two strapper wires connecting the two switches. When both switches are in corresponding positions (both up or both down), a continuous circuit from Live through the bulb to Neutral is closed.',
    hints: [
      'Two-way switches connect either strapper wire A or strapper wire B.',
      'Flipping either switch alternates between open and closed circuits.',
      'When both switches connect to the same strapper wire, current flows and the bulb illuminates.',
    ],
  },
  // 22. Advanced - Fleming Rule Application (c10_phy_032 & c10_phy_033)
  {
    id: 'ch_phy_22',
    nodeId: NODE_C10_PHY_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "Using Fleming's Left Hand Rule: A horizontal copper wire carries an electric current directed towards the East in a magnetic field pointing horizontally towards the North. What is the direction of the magnetic force acting on the wire?",
    options: [
      'Vertically Upwards (out of the ground)',
      'Vertically Downwards (into the ground)',
      'Horizontally towards the South',
      'Horizontally towards the West',
    ],
    correctIndex: 0,
    explanation: "Stretch left hand mutually perpendicular: Forefinger (Field B) points North; Middle finger (Current I) points East. The Thumb (Force F) points vertically upwards.",
    hints: [
      'Use the LEFT hand for motor force (FBI rule).',
      'Point forefinger North, rotate wrist so middle finger points East.',
      'Notice that the extended thumb points vertically upwards.',
    ],
  },
  // 23. Advanced - Evaluation of High Voltage Power Grid (c10_phy_031 & c10_phy_034)
  {
    id: 'ch_phy_23',
    nodeId: NODE_C10_PHY_031,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 440 kW power plant transmits electricity through lines of total resistance R = 5 Ω. If transmission voltage is stepped up from 2200 V to 220,000 V (220 kV), by what factor is the line power loss (I²R) reduced?',
    correctAnswer: 10000,
    tolerance: 10,
    unit: 'times',
    explanation: 'At 2.2 kV: I₁ = P/V = 440,000 / 2200 = 200 A ⇒ Loss₁ = 200² × 5 = 200,000 W. At 220 kV: I₂ = 440,000 / 220,000 = 2 A ⇒ Loss₂ = 2² × 5 = 20 W. Ratio = Loss₁ / Loss₂ = 200,000 / 20 = 10,000 times reduction!',
    hints: [
      'Current is inversely proportional to transmission voltage: I = P / V.',
      'Stepping voltage up by 100 times (2.2 kV → 220 kV) reduces current by 100 times.',
      'Power loss depends on I²: (100)² = 10,000 times reduction.',
    ],
  },
  // 24. Advanced - Alpha vs Beta Decay Chain (c10_phy_038)
  {
    id: 'ch_phy_24',
    nodeId: NODE_C10_PHY_038,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A radioactive parent nucleus ²³⁸₉₂U decays into stable Lead-206 (²⁰⁶₈₂Pb) through a series of alpha (α) and beta (β⁻) emissions. How many total Alpha particles are emitted in this entire decay chain?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'alpha particles',
    explanation: 'Each alpha emission reduces mass number A by 4 (Beta emissions do not change A). Total ΔA = 238 - 206 = 32. Number of alpha particles = 32 / 4 = 8 alpha particles. (Correspondingly: 92 - 2(8) = 76; to reach Z = 82, 82 - 76 = 6 beta particles are emitted).',
    hints: [
      'Only Alpha particles alter the mass number A (reducing it by 4 per particle).',
      'Find the change in mass number: 238 - 206 = 32.',
      'Divide the mass loss by 4: 32 / 4 = 8.',
    ],
  },
];

// ─── PROPS INTERFACE ───
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_PHY_031,
  title: 'ICSE Class 10 Physics: House Wiring, Electromagnetism, Thermal & Nuclear Physics',
  definition:
    'House wiring and power distribution encompasses the multi-stage delivery of stepped-up grid power (11 kV stepped to 132/220/400 kV to minimize I²R losses) down to domestic 220 V at 50 Hz ring main circuits with parallel loads, 3-pin plugs, MCBs, and earthing. Linked modules explore electromagnetic induction, transformers, calorimetry (Q = mcΔT), latent heat (Q = mL), radioactivity (alpha, beta, gamma decay), nuclear fission and fusion, and electrostatics.',
  eli5:
    'Think of electricity like high-pressure water pumped through highways without spilling, then delivered gently to your house. We also learn how magnets make currents, how hot things share heat, how ice melts without getting warmer, how atomic nuclei burst with power, and how static charges push and pull!',
  misconceptions: [
    {
      misconception: "The company's fuse and the consumer main fuse in house wiring are the same.",
      correction:
        "The company's fuse is fitted BEFORE the kWh meter by the electricity supplier and is sealed; the consumer's main fuse is AFTER the meter on the distribution board and is accessible.",
    },
    {
      misconception: 'The fuse can be placed in either the Live or Neutral wire.',
      correction:
        'The fuse MUST ALWAYS be placed in the LIVE wire. If placed in neutral and blown, the appliance casing remains connected to 220 V live line, posing a fatal shock risk.',
    },
    {
      misconception: 'The Earth pin in a 3-pin plug is made longer and thicker just for convenient grip.',
      correction:
        'The earth pin is longer so the appliance is securely earthed BEFORE being energized, and thicker so it cannot accidentally be forced into live or neutral sockets.',
    },
    {
      misconception: 'In a step-up transformer, both voltage AND current increase, creating free energy.',
      correction:
        'Transformers obey energy conservation (Vp·Ip = Vs·Is). A step-up transformer increases voltage but decreases current proportionately. Energy is conserved.',
    },
    {
      misconception: 'When ice at 0 °C melts into water at 50 °C, you only calculate Q = mL.',
      correction:
        'You must calculate BOTH stages: melting of ice at 0 °C (Q₁ = mL) PLUS warming of the melted liquid water from 0 °C to 50 °C (Q₂ = mcΔT).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'In India, domestic AC mains supply is rated at:',
      options: ['110 V, 60 Hz', '220 V, 50 Hz', '440 V, 50 Hz', '220 V, 100 Hz'],
      correctIndex: 1,
    },
    {
      question: 'Which wire in a standard 3-pin plug is connected to the right terminal?',
      options: ['Earth wire (Green)', 'Neutral wire (Blue)', 'Live wire (Brown/Red)', 'None'],
      correctIndex: 2,
    },
    {
      question: 'Why are domestic appliances connected in parallel combination?',
      options: [
        'They divide the voltage equally',
        'Each appliance receives full 220 V and operates independently',
        'To reduce total current to zero',
        'Because series wiring is illegal in cities',
      ],
      correctIndex: 1,
    },
    {
      question: 'Oersted’s experiment demonstrated that:',
      options: [
        'A changing magnetic field creates a voltage',
        'An electric current produces a surrounding magnetic field',
        'Static charges attract all metals',
        'Electrons have zero rest mass',
      ],
      correctIndex: 1,
    },
    {
      question: 'What is the function of laminating the soft iron core of a transformer?',
      options: [
        'To increase the magnetic field strength',
        'To prevent electrical shocks on the outer casing',
        'To minimize eddy current energy losses as heat',
        'To change AC into DC',
      ],
      correctIndex: 2,
    },
    {
      question: 'Specific heat capacity of water is approximately:',
      options: ['390 J kg⁻¹ K⁻¹', '2100 J kg⁻¹ K⁻¹', '4200 J kg⁻¹ K⁻¹', '3.36 × 10⁵ J kg⁻¹'],
      correctIndex: 2,
    },
    {
      question: 'During a phase change (e.g., ice melting at 0 °C), what happens to temperature?',
      options: [
        'It continuously rises as heat is absorbed',
        'It remains constant at 0 °C until the state change is complete',
        'It drops below 0 °C',
        'It fluctuates randomly',
      ],
      correctIndex: 1,
    },
    {
      question: 'In Beta (β⁻) radioactive decay, how do mass number A and atomic number Z change?',
      options: [
        'A decreases by 4, Z decreases by 2',
        'A remains unchanged, Z increases by 1',
        'A increases by 1, Z decreases by 1',
        'Both A and Z remain unchanged',
      ],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrates mastery over house wiring schematics, electromagnetic induction, transformer equations, calorimetry mixtures, radioactive decay laws, and electrostatic charge interactions.',
};

// ─── EXPLORATION STEPS (Brilliant.org Learn-by-Doing Interactive Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: High-Voltage Grid & Ring Main Wiring',
    instruction: 'Drag the Grid Voltage slider and toggle appliance switches to observe current, I²R line loss, and ring main current paths.',
    interactionType: 'grid-wiring-sim',
    nodeId: NODE_C10_PHY_031,
  },
  {
    title: 'Lab 2: Oersted & Faraday Induction Playground',
    instruction: 'Move the bar magnet velocity slider and wire current to observe magnetic field vectors and galvanometer deflections.',
    interactionType: 'magnet-induction-sim',
    nodeId: NODE_C10_PHY_032,
  },
  {
    title: 'Lab 3: Transformer Turns Ratio & Lamination Core',
    instruction: 'Adjust primary & secondary turns to see real-time voltage stepping and eddy current thermal damping.',
    interactionType: 'transformer-sim',
    nodeId: NODE_C10_PHY_034,
  },
  {
    title: 'Lab 4: Calorimetry & Latent Heat Phase Transition',
    instruction: 'Heat ice from -10 °C to 110 °C on the interactive heating curve and watch molecular bonding plateaus.',
    interactionType: 'calorimetry-sim',
    nodeId: NODE_C10_PHY_036,
  },
  {
    title: 'Lab 5: Nuclear Decay & Electrostatics Force Chamber',
    instruction: 'Trigger Alpha, Beta, and Gamma decays, and vary electrostatic charge distances in the Coulomb force field.',
    interactionType: 'nuclear-electrostatics-sim',
    nodeId: NODE_C10_PHY_038,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you step up grid transmission voltage by 10× (e.g. 22 kV to 220 kV) for the same delivered power, what happens to heat loss (I²R) in transmission cables?',
    options: [
      'Line heat loss drops by 100× (to 1/100th)',
      'Line heat loss increases by 10×',
      'Line heat loss remains unchanged',
      'Line heat loss drops by 10× only',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Grid Voltage slider to 220 kV in the simulator below and watch the Line Heat Loss gauge plunge!',
  },
  {
    question: 'Predict: When 1 kg of ice at 0 °C absorbs heat, why does a thermometer stay stuck at 0 °C until all ice is water?',
    options: [
      'The thermometer is broken by cold ice crystals',
      'Energy is completely used to break intermolecular lattice bonds (latent heat), not to increase particle kinetic energy',
      'Water has zero heat capacity at 0 °C',
      'Heat energy turns into invisible light rays',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4, apply heat to the Ice block and observe the flat temperature plateau at 0 °C during fusion!',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the secondary coil voltage and current when secondary turns Ns exceed primary turns Np (Ns > Np)?',
    observableOptions: [
      'Voltage is stepped UP (Vs > Vp) and Current is stepped DOWN (Is < Ip)',
      'Both Voltage and Current increase simultaneously',
      'Voltage drops to zero',
      'Current doubles without any voltage change',
    ],
    correctIndex: 0,
  },
  {
    question: 'Observation: In the Alpha, Beta, Gamma radiation chamber, what material was required to finally stop the Gamma rays?',
    observableOptions: [
      'A single sheet of notebook paper',
      'A 3 mm aluminium sheet',
      'Thick lead blocks or high-density concrete walls',
      'A thin layer of air',
    ],
    correctIndex: 2,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Home Electrical & Energy Safety Audit',
  description:
    'Perform a real-life physical safety inspection of your home electrical setup and calculate appliance energy usage.',
  steps: [
    'Inspect your main distribution box: identify the master MCB/fuse and individual circuit trip switches.',
    'Check high-power appliances (Geyser, AC, Microwave, Iron) to ensure they are connected to 3-pin earthed sockets with the longer top pin.',
    'Find the power wattage (W) on an appliance label (e.g., 2000 W geyser running 1 hour = 2 kWh units). Calculate monthly units.',
    'Map two-way switches in your home corridor or staircase and verify their alternating operation.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ═══════════════════════════════════════════════════════════════════
// COMPONENT IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════
export function C10_PhysicsHouseWiringPowerSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || {
    name: 'Physics',
    emoji: '⚡',
    color: 'sky',
  };

  // ─── 35+ RICH STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Brilliant.org pattern states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Escalating hints and step-by-step disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge Drag, Numeric & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Simulation Interactive Physics Variables
  const [gridVoltageKV, setGridVoltageKV] = useState<number>(220); // 11 to 400 kV
  const [linePowerMW, setLinePowerMW] = useState<number>(44); // 44 MW
  const [appliancesOn, setAppliancesOn] = useState<{ geyser: boolean; ac: boolean; lamp: boolean }>({
    geyser: true,
    ac: true,
    lamp: true,
  });
  const [faultActive, setFaultActive] = useState<boolean>(false);
  const [fuseLocation, setFuseLocation] = useState<'live' | 'neutral'>('live');
  const [earthConnected, setEarthConnected] = useState<boolean>(true);

  // Lab 2 variables (Oersted & Induction)
  const [wireCurrentA, setWireCurrentA] = useState<number>(5); // -10 to +10 A
  const [magnetVelocity, setMagnetVelocity] = useState<number>(0); // -10 to 10 m/s
  const [coilTurns, setCoilTurns] = useState<number>(100);

  // Lab 3 variables (Transformer)
  const [primaryTurnsNp, setPrimaryTurnsNp] = useState<number>(500);
  const [secondaryTurnsNs, setSecondaryTurnsNs] = useState<number>(50);
  const [coreIsLaminated, setCoreIsLaminated] = useState<boolean>(true);

  // Lab 4 variables (Calorimetry & Phase)
  const [thermalHeatInputKJ, setThermalHeatInputKJ] = useState<number>(0); // 0 to 1200 kJ
  const [waterMassKg, setWaterMassKg] = useState<number>(1.0);

  // Lab 5 variables (Nuclear & Electrostatics)
  const [selectedDecayType, setSelectedDecayType] = useState<'alpha' | 'beta' | 'gamma'>('alpha');
  const [coulombQ1, setCoulombQ1] = useState<number>(2); // μC
  const [coulombQ2, setCoulombQ2] = useState<number>(2); // μC
  const [coulombDistanceR, setCoulombDistanceR] = useState<number>(2); // cm

  // BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY BKT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: BKT MASTERY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── EFFECT 3: CLEANUP INACTIVITY TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── EFFECT 4: CANVAS 1 (2D AC Power Waves & Grid Electron Flow Animation) ───
  useEffect(() => {
    const canvas = canvasRef1.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw AC Sinusoidal Wave (50 Hz visualization)
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin((x * 0.04) + frame * 0.08) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Current particle nodes along the line
      ctx.fillStyle = '#f59e0b';
      for (let i = 0; i < 6; i++) {
        const px = ((frame * 2 + i * 60) % canvas.width);
        const py = canvas.height / 2 + Math.sin((px * 0.04) + frame * 0.08) * 35;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Title HUD
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Live AC 50 Hz Line Waveform (220 V RMS)', 10, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [gridVoltageKV]);

  // ─── EFFECT 5: CANVAS 2 (Electromagnetic Field Lines & Induction Particles) ───
  useEffect(() => {
    const canvas = canvasRef2.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw concentric circular magnetic field lines around wire
      const currentMag = Math.abs(wireCurrentA);
      const direction = wireCurrentA >= 0 ? 1 : -1;
      ctx.lineWidth = 1.5;

      for (let r = 25; r <= 85; r += 20) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.8 - r * 0.007})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();

        // Arrow pointers along circle
        const angle = (tick * 0.03 * direction + r) % (Math.PI * 2);
        const ax = centerX + Math.cos(angle) * r;
        const ay = centerY + Math.sin(angle) * r;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(ax, ay, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central wire conductor
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#b45309';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // Current indicator text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(wireCurrentA >= 0 ? '⊙ OUT' : '⊗ IN', centerX, centerY + 3);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText(`Current: ${wireCurrentA} A | Right-Hand Thumb Rule Field`, 8, 14);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [wireCurrentA]);

  // ─── 14+ USECALLBACK EVENT HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
      speechManager.speak('Let us study the complete step-by-step solution together.');
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback(
    (selectedIndex: number) => {
      const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
      setDiscoveryCorrect(isCorrect);
      setDiscoveryAnswered(true);
      if (isCorrect) {
        audioManager.play('success');
        speechManager.speak('Brilliant intuition! High voltage drastically lowers transmission current and heat losses.');
      } else {
        audioManager.play('pop');
        speechManager.speak(DISCOVERY_QUESTION.hintAfter);
      }
    },
    []
  );

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Interact with the circuit and physical parameters directly!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setHintCount(0);
    setShowExplanation(false);
    audioManager.play('whoosh');
    speechManager.speak('Now test your physics mastery on adaptive board challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulator below to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent scientific observation! You verified the energy conservation balance.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Look closely at the voltage and current meters simultaneously.');
    }
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && activeChallenge.sortItems) {
          prev = activeChallenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work, Physicist! You have demonstrated ICSE Class 10 mastery.');
  }, [errors, onComplete]);

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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well deduced.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Hints exhausted. Review the step-by-step ICSE walkthrough.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleSparkleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  // ─── REAL-TIME DERIVED SIMULATION VALUES ───
  // Grid transmission calculations
  const gridCurrentA = useMemo(() => {
    return (linePowerMW * 1000) / gridVoltageKV; // I = P / V
  }, [linePowerMW, gridVoltageKV]);

  const lineHeatLossKW = useMemo(() => {
    const lineResistance = 10; // 10 ohms
    return Math.round((Math.pow(gridCurrentA, 2) * lineResistance) / 1000); // I²R in kW
  }, [gridCurrentA]);

  // Transformer derived values
  const secondaryVoltageVs = useMemo(() => {
    const vp = 220; // 220 V AC input
    return Math.round(vp * (secondaryTurnsNs / primaryTurnsNp) * 10) / 10;
  }, [secondaryTurnsNs, primaryTurnsNp]);

  const secondaryCurrentIs = useMemo(() => {
    const ip = 2.0; // 2 A input
    return Math.round(ip * (primaryTurnsNp / secondaryTurnsNs) * 10) / 10;
  }, [primaryTurnsNp, secondaryTurnsNs]);

  // Induction derived EMF
  const inducedEMF_V = useMemo(() => {
    return Math.round(Math.abs(magnetVelocity) * (coilTurns / 20) * 10) / 10;
  }, [magnetVelocity, coilTurns]);

  // Calorimetry heating curve temperature derived
  const calorimeterTemp = useMemo(() => {
    // 1 kg ice from -10°C
    // Phase 1: Warming ice to 0°C (requires 1 * 2.1 * 10 = 21 kJ)
    // Phase 2: Melting ice at 0°C (requires 1 * 336 = 336 kJ; total = 357 kJ)
    // Phase 3: Warming water 0 to 100°C (requires 1 * 4.2 * 100 = 420 kJ; total = 777 kJ)
    // Phase 4: Boiling at 100°C
    const Q = thermalHeatInputKJ;
    if (Q <= 21) {
      return Math.round(-10 + (Q / 21) * 10);
    } else if (Q <= 357) {
      return 0; // Latent heat fusion plateau
    } else if (Q <= 777) {
      return Math.round(((Q - 357) / 420) * 100);
    } else {
      return 100; // Latent heat vaporization plateau
    }
  }, [thermalHeatInputKJ]);

  // Coulomb's force derived
  const coulombForceN = useMemo(() => {
    // F = k * q1 * q2 / r^2
    const k = 90; // scaled for UI display
    const force = (k * Math.abs(coulombQ1) * Math.abs(coulombQ2)) / Math.pow(coulombDistanceR, 2);
    return Math.round(force * 10) / 10;
  }, [coulombQ1, coulombQ2, coulombDistanceR]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-sky-950/80 rounded-xl border border-sky-800/60 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30">
                ICSE CLASS 10
              </span>
              <span className="text-xs text-slate-400">Physics Module (Nodes 031 - 042)</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Status / BKT Pill */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400">BKT Mastery: </span>
            <span className="font-bold text-sky-400 uppercase">{masteryLevel}</span>
          </div>
          <motion.div
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-sky-950 text-sky-400 border-sky-700'
                : 'bg-purple-950 text-purple-400 border-purple-700'
            }`}
          >
            Tier: {difficulty.toUpperCase()}
          </motion.div>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 1: DISCOVERY HOOK (Low-Stakes Curiosity Starter)
      ══════════════��════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-sky-950/70 via-slate-900 to-indigo-950/70 rounded-2xl border border-sky-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-sky-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>⚡ Mission Briefing</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <p className="text-xs text-sky-300/80 mt-3 p-2.5 bg-sky-900/30 rounded-lg border border-sky-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Hook Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span>🔍 Curiosity Discovery Question (Ungraded)</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${option}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200 hover:border-sky-500'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 text-xs text-slate-400 font-mono">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-sky-950/60 rounded-xl border border-sky-700/60 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '🎯 Spot on!' : '💡 No worries if you were unsure!'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Physics Labs"
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg whitespace-nowrap text-sm"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ═════════��═════════════════════════════════════════════════════════
          PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Labs)
      ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Navigator Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  aria-label={`Go to ${step.title}`}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentSlide === idx
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  Lab {idx + 1}
                </motion.button>
              ))}
            </div>
            <div className="text-xs font-mono text-slate-400 px-3">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </div>
          </div>

          {/* Interactive Slide Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span className="text-sky-400 font-mono">0{currentSlide + 1}.</span>
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 font-medium mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: GRID & HOUSE WIRING ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Predict-Then-Check 1 */}
                  {!predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700/60 space-y-3"
                    >
                      <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        🎯 Step 1: Predict Before Interacting
                      </p>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction choice ${i + 1}`}
                            className="p-2.5 text-left bg-slate-800/90 hover:bg-slate-700 rounded-xl text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Simulator Controls & Canvas Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Visualizer Canvas & Wiring Schematic */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                      <canvas ref={canvasRef1} width={460} height={110} className="w-full rounded-xl" />

                      {/* House Ring Circuit SVG Schematic */}
                      <svg viewBox="0 0 420 220" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                        {/* Distribution board entry */}
                        <rect x="15" y="25" width="85" height="170" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="57" y="45" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Dist. Board</text>
                        <text x="57" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8">kWh Meter</text>

                        {/* Fuse box indicator */}
                        <rect x="25" y="80" width="65" height="30" rx="4" fill={faultActive && fuseLocation === 'live' ? '#ef4444' : '#22c55e'} />
                        <text x="57" y="98" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                          {faultActive && fuseLocation === 'live' ? '⚡ BLOWN' : 'MAIN FUSE'}
                        </text>

                        {/* Ring Wires (Live=Red, Neutral=Blue, Earth=Green) */}
                        {/* Live loop */}
                        <path d="M 100 70 L 390 70 L 390 190 L 100 190" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                        <text x="240" y="64" fill="#ef4444" fontSize="9" fontWeight="bold">LIVE RING (220 V)</text>

                        {/* Neutral loop */}
                        <path d="M 100 95 L 375 95 L 375 175 L 100 175" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" />
                        <text x="240" y="90" fill="#3b82f6" fontSize="8">NEUTRAL RETURN (~0 V)</text>

                        {/* Earth loop */}
                        <path d="M 100 120 L 360 120 L 360 160 L 100 160" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,3" />
                        <text x="240" y="115" fill="#22c55e" fontSize="8">EARTH GROUND</text>

                        {/* Parallel Appliance Sockets */}
                        {[
                          { id: 'geyser', name: 'Geyser (2 kW)', x: 140, state: appliancesOn.geyser },
                          { id: 'ac', name: 'AC (1.5 kW)', x: 230, state: appliancesOn.ac },
                          { id: 'lamp', name: 'Lamp (60 W)', x: 320, state: appliancesOn.lamp },
                        ].map((app) => (
                          <g key={app.id}>
                            <rect
                              x={app.x}
                              y="130"
                              width="65"
                              height="48"
                              rx="6"
                              fill={app.state ? '#0284c7' : '#334155'}
                              stroke={app.state ? '#38bdf8' : '#64748b'}
                              strokeWidth="1.5"
                            />
                            <text x={app.x + 32} y="150" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                              {app.name}
                            </text>
                            <circle cx={app.x + 32} cy="165" r="4" fill={app.state ? '#4ade80' : '#ef4444'} />
                          </g>
                        ))}
                      </svg>
                    </div>

                    {/* Interactive Real-Time Parameters */}
                    <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        🎛️ Live Parameter Controls
                      </h4>

                      {/* Slider 1: Grid Voltage */}
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Transmission Grid Voltage:</span>
                          <span className="font-bold text-sky-400 font-mono">{gridVoltageKV} kV</span>
                        </div>
                        <input
                          type="range"
                          min={11}
                          max={400}
                          step={1}
                          value={gridVoltageKV}
                          onChange={(e) => {
                            setGridVoltageKV(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set Transmission Grid Voltage"
                          className="w-full accent-sky-500 cursor-pointer"
                        />
                      </div>

                      {/* Live Calculated Stats Cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-[10px] uppercase text-slate-400">Line Current (I = P/V)</p>
                          <p className="text-base font-black text-amber-400 font-mono">
                            {gridCurrentA.toFixed(1)} A
                          </p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-[10px] uppercase text-slate-400">Heat Loss (I²R)</p>
                          <p className={`text-base font-black font-mono ${lineHeatLossKW > 500 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {lineHeatLossKW} kW
                          </p>
                        </div>
                      </div>

                      {/* Appliance Parallel Switches */}
                      <div>
                        <p className="text-xs text-slate-400 mb-2 font-semibold">Toggle Parallel Appliances:</p>
                        <div className="flex gap-2">
                          {(['geyser', 'ac', 'lamp'] as const).map((key) => (
                            <motion.button
                              key={key}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setAppliancesOn((prev) => ({ ...prev, [key]: !prev[key] }));
                                audioManager.play('tap');
                              }}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                                appliancesOn[key]
                                  ? 'bg-sky-600/30 border-sky-500 text-sky-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-400'
                              }`}
                            >
                              {key.toUpperCase()} {appliancesOn[key] ? 'ON' : 'OFF'}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Fault Simulation Test */}
                      <div className="p-3 bg-rose-950/30 rounded-xl border border-rose-900/60 space-y-2">
                        <p className="text-xs font-bold text-rose-300">Safety Fault Simulation:</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setFaultActive(!faultActive);
                              audioManager.play(faultActive ? 'tap' : 'error');
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                              faultActive ? 'bg-rose-600 text-white' : 'bg-slate-800 text-rose-400 border border-rose-800'
                            }`}
                          >
                            {faultActive ? 'Reset Fault' : 'Trigger Live-Casing Short'}
                          </button>
                          <button
                            onClick={() => {
                              setFuseLocation((prev) => (prev === 'live' ? 'neutral' : 'live'));
                              audioManager.play('tap');
                            }}
                            className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-700"
                          >
                            Fuse in: <strong className="text-amber-300">{fuseLocation.toUpperCase()}</strong>
                          </button>
                        </div>
                        {faultActive && (
                          <p className="text-[11px] text-rose-200">
                            {fuseLocation === 'live'
                              ? '✓ Live fuse blew immediately! Appliance safely isolated.'
                              : '⚠️ DANGER: Neutral fuse blew, but 220 V live remains in contact with casing! Lethal shock risk.'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: OERSTED & INDUCTION PLAYGROUND ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Canvas 2: Oersted Field Lines */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <canvas ref={canvasRef2} width={340} height={190} className="w-full rounded-xl" />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Wire Current (I):</span>
                        <span className="font-bold text-amber-400 font-mono">{wireCurrentA} A</span>
                      </div>
                      <input
                        type="range"
                        min={-10}
                        max={10}
                        value={wireCurrentA}
                        onChange={(e) => {
                          setWireCurrentA(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set Wire Current"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Faraday Induction Coil Diagram */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                      <svg viewBox="0 0 340 180" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                        {/* Solenoid Coil */}
                        <rect x="120" y="50" width="140" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        {Array.from({ length: 8 }).map((_, i) => (
                          <ellipse
                            key={i}
                            cx={140 + i * 14}
                            cy="85"
                            rx="5"
                            ry="25"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="3"
                          />
                        ))}

                        {/* Moving Bar Magnet */}
                        <g transform={`translate(${40 + magnetVelocity * 5}, 65)`}>
                          <rect x="0" y="0" width="40" height="40" rx="4" fill="#ef4444" />
                          <text x="20" y="24" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">N</text>
                          <rect x="40" y="0" width="40" height="40" rx="4" fill="#3b82f6" />
                          <text x="60" y="24" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">S</text>
                        </g>

                        {/* Galvanometer Meter */}
                        <circle cx="295" cy="85" r="28" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                        <text x="295" y="70" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">GALV</text>
                        {/* Needle */}
                        <line
                          x1="295"
                          y1="85"
                          x2={295 + magnetVelocity * 2.2}
                          y2={65 - Math.abs(magnetVelocity) * 0.5}
                          stroke="#ef4444"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <text x="295" y="103" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="mono">
                          {magnetVelocity > 0 ? '+ DEFLECT' : magnetVelocity < 0 ? '- DEFLECT' : '0 ZERO'}
                        </text>
                      </svg>

                      {/* Slider for Magnet Velocity */}
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Magnet Velocity (v):</span>
                          <span className="font-bold text-sky-400 font-mono">{magnetVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min={-10}
                          max={10}
                          value={magnetVelocity}
                          onChange={(e) => {
                            setMagnetVelocity(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set Magnet Velocity"
                          className="w-full accent-sky-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-400">Induced EMF (Faraday):</span>
                        <span className="font-black text-emerald-400 font-mono text-sm">{inducedEMF_V} V</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: TRANSFORMER ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* Observation Question 1 */}
                  {!observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-sky-950/60 rounded-2xl border border-sky-700/60 space-y-3"
                    >
                      <p className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                        🔬 Step 2: Observe The Physics Rule
                      </p>
                      <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation answer ${i + 1}`}
                            className="p-2.5 text-left bg-slate-800/90 hover:bg-slate-700 rounded-xl text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Transformer SVG Visualization */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <svg viewBox="0 0 400 220" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                        {/* Laminated Soft Iron Core */}
                        <rect x="70" y="30" width="260" height="160" rx="12" fill="#334155" stroke="#64748b" strokeWidth="4" />
                        <rect x="130" y="70" width="140" height="80" rx="8" fill="#0f172a" />

                        {/* Core Laminations */}
                        {coreIsLaminated &&
                          [90, 110, 270, 290].map((lx, i) => (
                            <line key={i} x1={lx} y1="30" x2={lx} y2="190" stroke="#1e293b" strokeWidth="2" />
                          ))}

                        {/* Primary Coil (Left) */}
                        <g>
                          {Array.from({ length: Math.min(10, Math.max(3, Math.floor(primaryTurnsNp / 50))) }).map((_, i) => (
                            <rect key={i} x="55" y={45 + i * 12} width="30" height="8" rx="2" fill="#f59e0b" />
                          ))}
                          <text x="45" y="110" textAnchor="end" fill="#f59e0b" fontSize="10" fontWeight="bold">
                            Np: {primaryTurnsNp}
                          </text>
                          <text x="45" y="125" textAnchor="end" fill="#94a3b8" fontSize="8">
                            Vp: 220 V (AC)
                          </text>
                        </g>

                        {/* Secondary Coil (Right) */}
                        <g>
                          {Array.from({ length: Math.min(10, Math.max(3, Math.floor(secondaryTurnsNs / 50))) }).map((_, i) => (
                            <rect key={i} x="315" y={45 + i * 12} width="30" height="8" rx="2" fill="#38bdf8" />
                          ))}
                          <text x="355" y="110" textAnchor="start" fill="#38bdf8" fontSize="10" fontWeight="bold">
                            Ns: {secondaryTurnsNs}
                          </text>
                          <text x="355" y="125" textAnchor="start" fill="#4ade80" fontSize="9" fontWeight="bold">
                            Vs: {secondaryVoltageVs} V
                          </text>
                        </g>

                        {/* Center Tag */}
                        <text x="200" y="115" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                          {secondaryTurnsNs > primaryTurnsNp ? 'STEP-UP (Vs > Vp)' : 'STEP-DOWN (Vs < Vp)'}
                        </text>
                      </svg>
                    </div>

                    {/* Transformer Slider Controls */}
                    <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Primary Turns (Np):</span>
                          <span className="font-bold text-amber-400 font-mono">{primaryTurnsNp} turns</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={1000}
                          step={50}
                          value={primaryTurnsNp}
                          onChange={(e) => setPrimaryTurnsNp(Number(e.target.value))}
                          aria-label="Set Primary Turns Np"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Secondary Turns (Ns):</span>
                          <span className="font-bold text-sky-400 font-mono">{secondaryTurnsNs} turns</span>
                        </div>
                        <input
                          type="range"
                          min={25}
                          max={1000}
                          step={25}
                          value={secondaryTurnsNs}
                          onChange={(e) => setSecondaryTurnsNs(Number(e.target.value))}
                          aria-label="Set Secondary Turns Ns"
                          className="w-full accent-sky-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-300">Laminated Core (Minimizes Eddy Losses):</span>
                        <button
                          onClick={() => setCoreIsLaminated(!coreIsLaminated)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            coreIsLaminated ? 'bg-emerald-600 text-white' : 'bg-rose-900 text-rose-300'
                          }`}
                        >
                          {coreIsLaminated ? 'Laminated ✓' : 'Solid Block ✗'}
                        </button>
                      </div>

                      {/* Trade-off Display */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Power Balance (Ideal):</span>
                          <span className="text-sky-300 font-mono font-bold">Vp·Ip = Vs·Is</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Secondary Current (Is):</span>
                          <span className="text-amber-400 font-mono font-bold">{secondaryCurrentIs} A</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: CALORIMETRY & LATENT HEAT ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Interactive Heating Curve SVG */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <svg viewBox="0 0 420 220" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                        {/* Axes */}
                        <line x1="45" y1="190" x2="390" y2="190" stroke="#64748b" strokeWidth="2" />
                        <line x1="45" y1="20" x2="45" y2="190" stroke="#64748b" strokeWidth="2" />
                        <text x="380" y="205" textAnchor="end" fill="#94a3b8" fontSize="9">Heat Added Q (kJ)</text>
                        <text x="40" y="18" textAnchor="end" fill="#94a3b8" fontSize="9">Temp (°C)</text>

                        {/* Grid labels */}
                        <text x="35" y="195" textAnchor="end" fill="#64748b" fontSize="8">-10</text>
                        <text x="35" y="150" textAnchor="end" fill="#64748b" fontSize="8">0°C</text>
                        <text x="35" y="55" textAnchor="end" fill="#64748b" fontSize="8">100°C</text>

                        {/* Constant temperature plateau lines */}
                        <line x1="45" y1="145" x2="390" y2="145" stroke="#334155" strokeDasharray="3,3" />
                        <line x1="45" y1="50" x2="390" y2="50" stroke="#334155" strokeDasharray="3,3" />

                        {/* Heating Curve Profile Path */}
                        {/* Region 1: Ice warming (-10 to 0) -> x: 45 to 70 */}
                        {/* Region 2: Melting plateau (0°C) -> x: 70 to 180 */}
                        {/* Region 3: Water warming (0 to 100°C) -> x: 180 to 290 */}
                        {/* Region 4: Boiling plateau (100°C) -> x: 290 to 390 */}
                        <path
                          d="M 45 180 L 70 145 L 180 145 L 290 50 L 390 50"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="3"
                        />

                        {/* Labels on Curve */}
                        <text x="125" y="138" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">
                          Latent Heat of Fusion (mL)
                        </text>
                        <text x="340" y="42" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">
                          Latent Heat Vaporization
                        </text>

                        {/* Dynamic Progress Indicator Point */}
                        {(() => {
                          const Q = thermalHeatInputKJ;
                          let cx = 45;
                          let cy = 180;
                          if (Q <= 21) {
                            cx = 45 + (Q / 21) * 25;
                            cy = 180 - (Q / 21) * 35;
                          } else if (Q <= 357) {
                            cx = 70 + ((Q - 21) / 336) * 110;
                            cy = 145;
                          } else if (Q <= 777) {
                            cx = 180 + ((Q - 357) / 420) * 110;
                            cy = 145 - ((Q - 357) / 420) * 95;
                          } else {
                            cx = 290 + Math.min(100, ((Q - 777) / 400) * 100);
                            cy = 50;
                          }
                          return (
                            <g>
                              <circle cx={cx} cy={cy} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                              <text x={cx} y={cy - 10} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                                {calorimeterTemp} °C
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Heat Control Slider & Phase State */}
                    <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Heat Energy Added (Q):</span>
                          <span className="font-bold text-amber-400 font-mono">{thermalHeatInputKJ} kJ</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1000}
                          step={10}
                          value={thermalHeatInputKJ}
                          onChange={(e) => {
                            setThermalHeatInputKJ(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set Heat Energy Added"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      {/* State Card */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Current Phase:</span>
                          <span className="font-bold text-sky-300">
                            {thermalHeatInputKJ <= 21
                              ? 'Solid Ice Warming'
                              : thermalHeatInputKJ <= 357
                              ? 'Melting Ice-Water Mixture (0 °C)'
                              : thermalHeatInputKJ <= 777
                              ? 'Liquid Water Warming'
                              : 'Boiling Steam Mixture (100 °C)'}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Thermometer Reading:</span>
                          <span className="font-bold text-amber-400 font-mono text-sm">{calorimeterTemp} °C</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        Notice how the temperature is clamped at <strong className="text-sky-300">0 °C</strong> during bond loosening (melting) and at <strong className="text-sky-300">100 °C</strong> during vaporization, proving latent heat does not raise kinetic energy.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: NUCLEAR DECAY & COULOMB'S LAW ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Decay Chamber Simulation */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-300 uppercase">Radioactive Emission Chamber</h4>
                        <div className="flex gap-1">
                          {(['alpha', 'beta', 'gamma'] as const).map((t) => (
                            <button
                              key={t}
                              onClick={() => {
                                setSelectedDecayType(t);
                                audioManager.play('tap');
                              }}
                              className={`px-2 py-1 rounded text-xs font-bold ${
                                selectedDecayType === t
                                  ? 'bg-sky-600 text-white'
                                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              {t.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Decay SVG Visual */}
                      <svg viewBox="0 0 320 130" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                        {/* Parent Nucleus */}
                        <circle cx="50" cy="65" r="24" fill="#6366f1" stroke="#818cf8" strokeWidth="2" />
                        <text x="50" y="69" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                          {selectedDecayType === 'alpha' ? '²³⁸₉₂U' : selectedDecayType === 'beta' ? '²³⁴₉₀Th' : 'Excited*'}
                        </text>

                        {/* Particle Path through Obstacles */}
                        {/* Paper Sheet */}
                        <rect x="120" y="20" width="6" height="90" fill="#cbd5e1" />
                        <text x="123" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Paper</text>

                        {/* Aluminium Sheet */}
                        <rect x="180" y="20" width="8" height="90" fill="#94a3b8" />
                        <text x="184" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Aluminium</text>

                        {/* Lead Block */}
                        <rect x="250" y="20" width="18" height="90" fill="#475569" />
                        <text x="259" y="120" textAnchor="middle" fill="#94a3b8" fontSize="7">Lead</text>

                        {/* Beam Line */}
                        {selectedDecayType === 'alpha' && (
                          <line x1="75" y1="65" x2="120" y2="65" stroke="#ef4444" strokeWidth="4" strokeDasharray="4,2" />
                        )}
                        {selectedDecayType === 'beta' && (
                          <line x1="75" y1="65" x2="180" y2="65" stroke="#f59e0b" strokeWidth="2.5" />
                        )}
                        {selectedDecayType === 'gamma' && (
                          <line x1="75" y1="65" x2="250" y2="65" stroke="#38bdf8" strokeWidth="2" />
                        )}
                      </svg>
                      <p className="text-xs text-slate-300">
                        {selectedDecayType === 'alpha'
                          ? 'Alpha (⁴₂He, +2e): High ionization, stopped completely by paper.'
                          : selectedDecayType === 'beta'
                          ? 'Beta (⁰₋₁e, -e): Moderate penetration, stopped by aluminium.'
                          : 'Gamma (EM Photon, 0): Extreme penetration, requires thick lead.'}
                      </p>
                    </div>

                    {/* Electrostatics Coulomb Law */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold text-slate-300 uppercase">Coulomb Force Simulator (F ∝ q₁q₂ / r²)</h4>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Separation Distance (r):</span>
                          <span className="font-bold text-sky-400 font-mono">{coulombDistanceR} cm</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={6}
                          value={coulombDistanceR}
                          onChange={(e) => setCoulombDistanceR(Number(e.target.value))}
                          aria-label="Set Coulomb Distance r"
                          className="w-full accent-sky-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-400">Repulsive Coulomb Force:</span>
                        <span className="font-black text-amber-400 font-mono text-sm">{coulombForceN} N</span>
                      </div>

                      <p className="text-[11px] text-slate-400">
                        Doubling separation from 1 cm to 2 cm reduces force to exactly <strong>1/4th (25%)</strong> due to the inverse-square law.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Exploration Controls */}
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-bold shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 3: SANDBOX / FREE PLAY (Zero Pressure Exploration)
      ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>🧪 Free Exploration Sandbox</span>
            </div>
            <h3 className="text-xl font-bold text-white">Full Physical Grid & Nuclear Simulator</h3>
            <p className="text-xs text-slate-400">
              No tests, no grades. Fine-tune voltages, transformer windings, and calorimeter heats freely.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-sky-400">Power Grid: {gridVoltageKV} kV</p>
                <input
                  type="range"
                  min={11}
                  max={400}
                  value={gridVoltageKV}
                  onChange={(e) => setGridVoltageKV(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <p className="text-xs text-slate-400">Loss: {lineHeatLossKW} kW</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-amber-400">Transformer Vs: {secondaryVoltageVs} V</p>
                <input
                  type="range"
                  min={25}
                  max={800}
                  value={secondaryTurnsNs}
                  onChange={(e) => setSecondaryTurnsNs(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <p className="text-xs text-slate-400">Ns: {secondaryTurnsNs} turns</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-emerald-400">Calorimetry: {calorimeterTemp} °C</p>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={thermalHeatInputKJ}
                  onChange={(e) => setThermalHeatInputKJ(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <p className="text-xs text-slate-400">Heat: {thermalHeatInputKJ} kJ</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Start Board Challenges"
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-2xl shadow-xl text-sm"
              >
                Ready for ICSE Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 4: ADAPTIVE CHALLENGES (24 Questions + NEP 2020 Competencies)
      ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-700">
                  NEP: {activeChallenge.competencyLevel.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Presentation Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 bg-slate-900 rounded-3xl border transition-colors shadow-2xl space-y-6 ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-600'
                : 'border-slate-800'
            }`}
          >
            <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
              {activeChallenge.question}
            </h3>

            {/* MCQ FORMAT */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200 hover:border-sky-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-0.5 rounded bg-slate-950 text-xs font-mono text-slate-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL FORMAT */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-xl text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* 3-Pin Plug Target SVG */}
                <svg viewBox="0 0 360 200" className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-800">
                  {/* Top Pin (Earth) */}
                  <rect x="145" y="20" width="70" height="45" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="180" y="47" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {droppedLabels.pin_top || 'Drop Top Pin'}
                  </text>
                  <rect
                    x="145"
                    y="20"
                    width="70"
                    height="45"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('pin_top')}
                  />

                  {/* Left Pin (Neutral) */}
                  <rect x="50" y="110" width="85" height="45" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="92" y="137" textAnchor="middle" fill="#38bdf8" fontSize="9">
                    {droppedLabels.pin_left || 'Drop Left Pin'}
                  </text>
                  <rect
                    x="50"
                    y="110"
                    width="85"
                    height="45"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('pin_left')}
                  />

                  {/* Right Pin (Live) */}
                  <rect x="225" y="110" width="85" height="45" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="267" y="137" textAnchor="middle" fill="#38bdf8" fontSize="9">
                    {droppedLabels.pin_right || 'Drop Right Pin'}
                  </text>
                  <rect
                    x="225"
                    y="110"
                    width="85"
                    height="45"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('pin_right')}
                  />
                </svg>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm"
                >
                  Verify Pin Mapping
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT FORMAT */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-sky-400 text-xs font-bold flex items-center justify-center">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC FORMAT */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-sky-500 outline-none w-64"
                  />
                  <span className="text-slate-300 font-bold text-sm">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT NUCLEAR EQUATION FORMAT */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-sm font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 font-mono text-sm">²³⁴₉₀Th →</span>
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-sky-800 text-white font-mono rounded-lg text-sm flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm"
                >
                  Verify Equation
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-sky-950/50 border border-sky-700/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                  <span>📖 Step-by-Step ICSE Board Walkthrough</span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-sky-300">{idx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps <
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-sky-800 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'View Final Mastery Score →'
                        : 'Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 5: COMPLETION & REAL-WORLD REFLECTION
      ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">ICSE Physics Mastery Achieved!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed all 12 physics modules spanning house distribution networks, magnetic induction, transformers, thermal calorimetry, nuclear physics, and electrostatics.
            </p>

            <div className="flex justify-center gap-6 py-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <p className="text-xs uppercase text-slate-400">Score</p>
                <p className="text-2xl font-black text-emerald-400 font-mono">
                  {Math.max(0, 100 - errors * 5)}%
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <p className="text-xs uppercase text-slate-400">Mastery</p>
                <p className="text-2xl font-black text-sky-400 uppercase font-mono">{masteryLevel}</p>
              </div>
            </div>

            {/* Motivational Banner */}
            <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 text-left max-w-2xl mx-auto">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                🌟 Performance Appraisal
              </p>
              <p className="text-sm text-slate-200">
                {errors === 0
                  ? 'Flawless distinction! You have grasped both foundational concepts and high-order quantitative problems.'
                  : errors <= 3
                  ? 'Splendid performance! You demonstrate solid physical intuition and problem-solving.'
                  : 'Good effort! Review your misconception notes below to achieve 100% precision in the board exams.'}
              </p>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-rose-900/60 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️ Your Targeted Misconception Profile</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <p className="text-xs text-rose-400 font-bold">❌ Common Mistake: {m.misconception}</p>
                      <p className="text-xs text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Schedule */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-400">📅 Spaced Repetition Review Schedule</h3>
            <p className="text-xs text-slate-300">
              To consolidate these neural pathways into long-term memory, return for a quick 3-minute review in{' '}
              <strong className="text-amber-300">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              .
            </p>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl border border-indigo-800/60 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🏠 {REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-900 text-indigo-300 font-bold font-mono">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ICSE Physics Module Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_PhysicsHouseWiringPowerSim;