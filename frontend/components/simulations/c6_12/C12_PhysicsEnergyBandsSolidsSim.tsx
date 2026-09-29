'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (MANDATORY STRING LITERALS) ───
const NODE_C12_PHY_111 = 'c12_phy_111'; // Energy bands in solids
const NODE_C12_PHY_112 = 'c12_phy_112'; // Intrinsic semiconductors
const NODE_C12_PHY_113 = 'c12_phy_113'; // Extrinsic semiconductors (p-type & n-type)
const NODE_C12_PHY_114 = 'c12_phy_114'; // p-n junction and depletion region
const NODE_C12_PHY_115 = 'c12_phy_115'; // Junction diode V-I characteristics
const NODE_C12_PHY_116 = 'c12_phy_116'; // Half-wave rectifier
const NODE_C12_PHY_117 = 'c12_phy_117'; // Full-wave rectifier
const NODE_C12_PHY_118 = 'c12_phy_118'; // LED (light-emitting diode)
const NODE_C12_PHY_119 = 'c12_phy_119'; // Photodiode
const NODE_C12_PHY_120 = 'c12_phy_120'; // Solar cell

const ALL_NODE_IDS = [
  NODE_C12_PHY_111,
  NODE_C12_PHY_112,
  NODE_C12_PHY_113,
  NODE_C12_PHY_114,
  NODE_C12_PHY_115,
  NODE_C12_PHY_116,
  NODE_C12_PHY_117,
  NODE_C12_PHY_118,
  NODE_C12_PHY_119,
  NODE_C12_PHY_120,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Clean Energy & Semiconductor Mission',
  intro: 'You are the Chief Semiconductor Physicist at the Indian Space Research Organisation (ISRO) and Bharat Electronics. Your task is to design, diagnose, and optimize solid-state power systems, sensor payloads, and optoelectronic communication modules for Chandrayaan and modern solar micro-grids.',
  context: 'From band gap tailoring in silicon solar arrays to rectification in high-power converters and high-efficiency GaN/GaAs LEDs, mastery of energy bands and junction physics is your operational key.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When you heat a pure silicon wafer vs a copper wire, how do their electrical resistances respond?',
  options: [
    'Both increase due to greater atomic vibrations.',
    'Copper resistance increases, but Silicon resistance decreases exponentially.',
    'Silicon resistance increases, but Copper resistance decreases.',
    'Neither changes because resistance depends solely on length and area.',
  ],
  correctIndex: 1,
  hintAfter: 'Surprising, right? In metals, heat scatters existing free carriers. In semiconductors, heat breaks covalent bonds, flooding the conduction band with electron-hole pairs! Let us explore why.',
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

// ─── 22 COMPREHENSIVE CHALLENGES (NEP 2020 & CISCE 2026 SPECIFIC) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall - c12_phy_111
  {
    id: 'ch_01_band_gaps',
    nodeId: NODE_C12_PHY_111,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the approximate forbidden energy gap (Eg) for Silicon (Si) and Germanium (Ge) at room temperature?',
    options: [
      'Si ≈ 5.5 eV, Ge ≈ 1.1 eV',
      'Si ≈ 1.1 eV, Ge ≈ 0.72 eV',
      'Si ≈ 0.72 eV, Ge ≈ 1.1 eV',
      'Si ≈ 0 eV (overlapping), Ge ≈ 5.5 eV',
    ],
    correctIndex: 1,
    explanation: 'Silicon has an energy band gap of approximately 1.1 eV, whereas Germanium has a narrower gap of about 0.72 eV. Diamond (Carbon) has a large gap of ~5.5 eV (insulator), while conductors have overlapping bands (Eg = 0).',
    hints: [
      'Recall that semiconductors have small band gaps (~1 eV), not large ones like diamond (~5.5 eV).',
      'Silicon requires slightly more energy to excite electrons across the gap than Germanium.',
      'Silicon is ~1.1 eV and Germanium is ~0.72 eV.',
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation - Drag Label - c12_phy_111 (Band Diagram)
  {
    id: 'ch_02_drag_band_labels',
    nodeId: NODE_C12_PHY_111,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each solid-state band label onto its corresponding structural level in the energy band diagram.',
    dragItems: [
      { label: 'Conduction Band (CB)', targetId: 'band_top' },
      { label: 'Forbidden Energy Gap (Eg)', targetId: 'band_middle' },
      { label: 'Valence Band (VB)', targetId: 'band_bottom' },
    ],
    correctMapping: {
      band_top: 'Conduction Band (CB)',
      band_middle: 'Forbidden Energy Gap (Eg)',
      band_bottom: 'Valence Band (VB)',
    },
    explanation: 'In energy band diagrams, Energy increases vertically. The lower completely/partially filled band is the Valence Band, the upper band is the Conduction Band, and the forbidden energy gap lies between them.',
    hints: [
      'Valence electrons occupy the lower band.',
      'Free mobile electrons that carry conduction current occupy the higher band at the top.',
      'The gap between the top of the VB and bottom of the CB is the forbidden energy gap.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Foundation - Understanding - c12_phy_112
  {
    id: 'ch_03_intrinsic_carriers',
    nodeId: NODE_C12_PHY_112,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a pure intrinsic semiconductor at temperature T > 0 K, what is the exact mathematical relation between electron concentration (ne) and hole concentration (nh)?',
    options: [
      'ne >> nh because electrons are lighter',
      'nh >> ne because covalent vacancies dominate',
      'ne = nh = ni because thermal excitation creates electron-hole pairs in tandem',
      'ne + nh = 0 because charges cancel out',
    ],
    correctIndex: 2,
    explanation: 'Every thermal excitation that lifts an electron across the band gap leaves behind exactly one vacant state (hole) in the valence band. Thus, electron-hole pairs are created simultaneously, enforcing ne = nh = ni.',
    hints: [
      'Think about what happens when a single electron breaks a covalent bond.',
      'When one electron enters the conduction band, what is left behind in the valence band?',
      'One broken bond yields exactly one free electron and one hole, so ne = nh.',
    ],
    misconceptionIndex: 2,
  },

  // 4. Foundation - Recall - c12_phy_113
  {
    id: 'ch_04_dopant_valencies',
    nodeId: NODE_C12_PHY_113,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following elements is a pentavalent donor impurity used to manufacture n-type Silicon?',
    options: [
      'Boron (B)',
      'Indium (In)',
      'Phosphorus (P)',
      'Gallium (Ga)',
    ],
    correctIndex: 2,
    explanation: 'Phosphorus (P), Arsenic (As), and Antimony (Sb) are Group 15 pentavalent elements with 5 valence electrons. They donate an extra electron into the lattice, creating an n-type semiconductor.',
    hints: [
      'Remember the mnemonic: PENta gives N-type; TRI gives P-type.',
      'Boron, Gallium, and Indium are trivalent (Group 13) acceptor impurities.',
      'Phosphorus has 5 valence electrons and donates its 5th electron.',
    ],
    misconceptionIndex: 3,
  },

  // 5. Foundation - Understanding - c12_phy_114
  {
    id: 'ch_05_depletion_contents',
    nodeId: NODE_C12_PHY_114,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What does the depletion region of an unbiased silicon p-n junction actually contain at thermal equilibrium?',
    options: [
      'High concentrations of free electrons and free holes conducting current.',
      'No charges of any kind whatsoever.',
      'Immobile uncompensated donor ions (+ on n-side) and acceptor ions (- on p-side) with no mobile charge carriers.',
      'Immobile negative ions on the n-side and immobile positive ions on the p-side.',
    ],
    correctIndex: 2,
    explanation: 'Diffusion sweeps mobile electrons and holes across the boundary, uncovering immobile ionised donor atoms (+ on the n-side) and ionised acceptor atoms (- on the p-side). The region is depleted of mobile carriers.',
    hints: [
      'When an electron leaves the n-side, what charge remains on the fixed donor atom?',
      'Mobile carriers diffuse away, leaving fixed, uncovered lattice ions.',
      'The n-side loses negative electrons (becomes positive fixed ions); the p-side gains electrons (negative fixed ions).',
    ],
    misconceptionIndex: 4,
  },

  // 6. Foundation - Drag Label - c12_phy_114 (p-n Junction)
  {
    id: 'ch_06_drag_pn_junction',
    nodeId: NODE_C12_PHY_114,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Place the charges and barrier descriptions into the correct regions of this p-n junction diagram.',
    dragItems: [
      { label: 'p-type (Majority Holes)', targetId: 'pn_left' },
      { label: 'Depletion Layer (Immobile Ions & Built-in E-field)', targetId: 'pn_center' },
      { label: 'n-type (Majority Electrons)', targetId: 'pn_right' },
    ],
    correctMapping: {
      pn_left: 'p-type (Majority Holes)',
      pn_center: 'Depletion Layer (Immobile Ions & Built-in E-field)',
      pn_right: 'n-type (Majority Electrons)',
    },
    explanation: 'The p-side has majority holes, the n-side has majority free electrons, and between them lies the space-charge depletion layer establishing the 0.7 V (Si) junction barrier.',
    hints: [
      'The left region is p-type with mobile holes.',
      'The center region contains the barrier potential and fixed charges.',
      'The right region is n-type with mobile electrons.',
    ],
    misconceptionIndex: 4,
  },

  // 7. Standard - Application - c12_phy_115
  {
    id: 'ch_07_forward_bias_numerical',
    nodeId: NODE_C12_PHY_115,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A silicon diode (knee voltage = 0.7 V) is connected in series with a 500 Ω current-limiting resistor across a 5.7 V DC power supply in forward bias. Calculate the circuit current in milliamperes (mA).',
    correctAnswer: 10,
    tolerance: 0.2,
    unit: 'mA',
    explanation: 'By Kirchhoff\'s Voltage Law: V_supply - V_diode - I*R = 0 => 5.7 V - 0.7 V = I * 500 Ω => 5.0 V / 500 Ω = 0.01 A = 10 mA.',
    hints: [
      'Subtract the forward diode drop (0.7 V) from the source voltage to find the net voltage across the resistor.',
      'Net voltage across R = 5.7 V - 0.7 V = 5.0 V.',
      'Current I = V_R / R = 5.0 / 500 = 0.010 A = 10 mA.',
    ],
  },

  // 8. Standard - Analysis - c12_phy_115
  {
    id: 'ch_08_vi_characteristics',
    nodeId: NODE_C12_PHY_115,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does a p-n junction diode exhibit non-linear V-I characteristics, unlike an ordinary ohmic resistor?',
    options: [
      'Because heating changes the resistance according to Joule\'s law.',
      'Because applied forward voltage reduces the barrier width and height exponentially, while reverse voltage reinforces the barrier.',
      'Because electrons in semiconductors travel at relativistic velocities.',
      'Because the diode violates the conservation of energy.',
    ],
    correctIndex: 1,
    explanation: 'In forward bias, external potential opposes the built-in potential, collapsing the depletion barrier and allowing majority carrier diffusion to grow exponentially once cut-in (~0.7 V for Si) is passed.',
    hints: [
      'Consider what happens to the potential barrier when forward vs reverse voltage is applied.',
      'Ohmic resistors have a constant barrier (none); diodes have a dynamic barrier modulated by external voltage.',
      'Forward bias lowers the junction barrier allowing exponential carrier surge.',
    ],
  },

  // 9. Standard - Application - c12_phy_116
  {
    id: 'ch_09_half_wave_ripple',
    nodeId: NODE_C12_PHY_116,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Indian domestic AC mains line (50 Hz, 230 V rms) is fed to a half-wave rectifier circuit via a step-down transformer. What is the fundamental ripple frequency of the output pulsating DC in Hertz (Hz)?',
    correctAnswer: 50,
    tolerance: 0.1,
    unit: 'Hz',
    explanation: 'In a half-wave rectifier, only one pulse is produced per full 360° input AC cycle (the negative half is completely clipped). Hence, the output ripple frequency equals the input frequency: f_ripple = f_in = 50 Hz.',
    hints: [
      'How many output pulses does a single diode produce during one full 20 ms AC input cycle?',
      'Only the positive half-cycle passes; the negative half is blocked.',
      'One pulse per cycle means frequency is unchanged: 50 Hz.',
    ],
  },

  // 10. Standard - Drag Sort - c12_phy_117
  {
    id: 'ch_10_full_wave_conduction_cycle',
    nodeId: NODE_C12_PHY_117,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events during the POSITIVE half-cycle in a centre-tapped full-wave rectifier.',
    sortItems: [
      'Secondary terminal A becomes positive relative to centre-tap CT; terminal B becomes negative.',
      'Diode D1 becomes forward-biased; Diode D2 becomes reverse-biased.',
      'Current flows from terminal A through D1 and through load RL toward CT.',
      'A positive voltage pulse appears across RL while D2 blocks any reverse loop current.',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Terminal A goes positive relative to CT, forward-biasing D1 while B reverse-biases D2. Current flows A -> D1 -> RL -> CT, delivering a rectified pulse.',
    hints: [
      'Start with the secondary transformer polarity shift.',
      'Next identify which diode gets forward-biased and which is cut off.',
      'Trace the current path through the load resistor back to the centre tap.',
    ],
  },

  // 11. Standard - Application - c12_phy_117
  {
    id: 'ch_11_full_wave_efficiency',
    nodeId: NODE_C12_PHY_117,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If a 50 Hz AC signal is fed to a full-wave rectifier, what is the output ripple frequency in Hz?',
    correctAnswer: 100,
    tolerance: 0.1,
    unit: 'Hz',
    explanation: 'A full-wave rectifier conducts during both half-cycles, producing 2 positive pulses per input AC cycle. For a 50 Hz input, the output ripple frequency is 2 × 50 = 100 Hz.',
    hints: [
      'Both positive and negative half-cycles are converted into positive pulses.',
      'Number of pulses per second doubles compared to the input.',
      'Ripple frequency = 2 × 50 Hz = 100 Hz.',
    ],
  },

  // 12. Standard - Analysis - c12_phy_118
  {
    id: 'ch_12_led_bandgap_colour',
    nodeId: NODE_C12_PHY_118,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A Gallium Nitride (GaN) LED emits blue light (~450 nm, Eg ≈ 3.4 eV), while a GaAsP LED emits red light (~650 nm, Eg ≈ 1.9 eV). Why does the GaN LED require a higher forward cut-in operating voltage?',
    options: [
      'GaN has higher electrical resistance in its leads.',
      'The forward voltage must supply energy at least equal to the band gap (V ≈ Eg/e) to excite carriers for radiative recombination.',
      'Blue light travels slower in air, requiring extra battery push.',
      'GaN operates in reverse bias breakdown.',
    ],
    correctIndex: 1,
    explanation: 'In an LED, photon emission occurs when electrons and holes recombine: E_photon = h*c/λ ≈ Eg. To drive electrons into the conduction band across the larger gap, the applied threshold voltage V ≈ Eg/e must be higher (2.8 - 3.4 V for GaN vs ~1.8 V for red GaAsP).',
    hints: [
      'Connect the forward turn-on voltage with the energy gap Eg of the semiconductor.',
      'Higher photon energy (blue vs red) requires crossing a larger band gap.',
      'The applied potential must equal or exceed Eg/e for significant carrier recombination to occur.',
    ],
  },

  // 13. Standard - Application - c12_phy_119
  {
    id: 'ch_13_photodiode_bias_reason',
    nodeId: NODE_C12_PHY_119,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is a photodiode always operated in REVERSE BIAS when detecting optical signals in optical fibre communication links?',
    options: [
      'Reverse bias makes the diode emit photons of infrared light.',
      'Reverse bias widens the depletion layer and creates a strong electric field that rapidly sweeps photogenerated pairs apart, keeping dark current minimal so fractional change (ΔI/I) is easily measured.',
      'Reverse bias reduces the forbidden band gap to zero.',
      'Forward bias would destroy the crystal lattice permanently.',
    ],
    correctIndex: 1,
    explanation: 'In reverse bias, background dark current is tiny (microamperes). Photogenerated electron-hole pairs created in the wide depletion region produce a photocurrent proportional to optical intensity, yielding a high signal-to-noise ratio and fast transient response.',
    hints: [
      'Think about how small the dark reverse current is compared to a massive forward current.',
      'If you added a tiny light-generated current to a large forward current, would you notice it?',
      'Reverse bias provides a wide depletion zone, rapid separation of pairs, and high fractional detection sensitivity.',
    ],
  },

  // 14. Standard - Understanding - c12_phy_120
  {
    id: 'ch_14_solar_cell_pv_effect',
    nodeId: NODE_C12_PHY_120,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does a silicon solar cell generate electrical electromotive force (EMF) without requiring any external battery?',
    options: [
      'By chemical oxidation and reduction reactions at the metal electrodes.',
      'By the photoelectric emission of electrons ejected into outer space.',
      'Incident photons (hν > Eg) create electron-hole pairs in the depletion region, and the built-in electric field sweeps electrons to the n-side and holes to the p-side, establishing an open-circuit voltage.',
      'Thermal heating expands the crystal lattice to squeeze electrons through wires.',
    ],
    correctIndex: 2,
    explanation: 'The photovoltaic effect uses the junction\'s internal built-in electric field. Photons generate electron-hole pairs; the built-in field drives electrons to the n-terminal and holes to the p-terminal, generating an open-circuit EMF of ~0.5-0.6 V per silicon cell.',
    hints: [
      'Notice the role of the built-in junction electric field created by immobile ions.',
      'Light creates mobile pairs; the built-in field separates them to opposite terminals.',
      'Accumulation of electrons on n-side and holes on p-side creates an EMF naturally.',
    ],
    misconceptionIndex: 5,
  },

  // 15. Advanced - Construct - c12_phy_117 (Rectifier Circuit)
  {
    id: 'ch_15_construct_full_wave',
    nodeId: NODE_C12_PHY_117,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the essential components in correct topological order to construct a Centre-Tapped Full-Wave Rectifier circuit.',
    availableParts: [
      'AC Mains Source',
      'Centre-Tapped Transformer',
      'Diode D1 (Upper)',
      'Diode D2 (Lower)',
      'Common Load Resistor (RL)',
      'Ground/CT Return Path',
    ],
    targetState: 'AC Mains Source Centre-Tapped Transformer Diode D1 (Upper) Diode D2 (Lower) Common Load Resistor (RL) Ground/CT Return Path',
    validationHint: 'Connect in sequence: AC Mains -> Centre-Tapped Transformer -> Diode D1 (Upper) -> Diode D2 (Lower) -> Common Load Resistor (RL) -> Ground/CT Return Path.',
    explanation: 'A centre-tapped full-wave rectifier requires the AC source feeding the primary, a centre-tapped secondary driving two alternating diodes into a single load resistor, returning to the centre tap.',
    hints: [
      'Start with the energy source (AC Mains Source).',
      'Add the transformer with centre tap, then both diodes D1 and D2.',
      'Finish with the load resistor and the return path to the centre tap.',
    ],
  },

  // 16. Advanced - Evaluation - c12_phy_118 vs 119 vs 120
  {
    id: 'ch_16_opto_comparison',
    nodeId: NODE_C12_PHY_118,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare the biasing conditions and operating mechanisms of LED, Photodiode, and Solar Cell. Which statement correctly evaluates all three?',
    options: [
      'LED: Forward Bias (Recombination emits light); Photodiode: Reverse Bias (Light generates carriers); Solar Cell: Zero External Bias (Photovoltaic EMF generation).',
      'LED: Reverse Bias; Photodiode: Forward Bias; Solar Cell: Forward Bias.',
      'All three devices must be operated under strong forward bias to conduct electricity.',
      'All three devices are passive resistors governed strictly by Ohm’s Law.',
    ],
    correctIndex: 0,
    explanation: 'LED = Forward bias (carrier injection & radiative recombination). Photodiode = Reverse bias (detects light-generated electron-hole pairs with fast response). Solar Cell = Zero external bias (operates in 4th quadrant of V-I characteristic to deliver net power).',
    hints: [
      'Recall which device emits light vs which devices absorb light.',
      'An LED requires forward bias to push carriers across the junction.',
      'A photodiode uses reverse bias for detection; a solar cell generates its own power without external bias.',
    ],
  },

  // 17. Advanced - Analysis - c12_phy_113 (Charge Neutrality)
  {
    id: 'ch_17_doped_neutrality',
    nodeId: NODE_C12_PHY_113,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student claims: "An n-type semiconductor crystal carries a net negative charge because free electrons are the majority carriers." Evaluate this assertion from first principles.',
    options: [
      'The student is correct; the excess of electrons imparts a negative net electrostatic charge.',
      'The student is incorrect; the crystal is electrically neutral because every donated mobile electron is balanced by an immobile positive donor ion (P+) in the lattice.',
      'The student is incorrect; n-type crystals carry a net positive charge due to hole repulsion.',
      'The student is correct only at absolute zero temperature.',
    ],
    correctIndex: 1,
    explanation: 'Extrinsic semiconductors remain strictly electrically neutral as a whole. In n-type Si, every free electron created by doping comes from a neutral phosphorus atom, leaving a fixed positive P+ ion locked in the lattice: total positive charges equal total negative charges.',
    hints: [
      'Was the dopant atom neutral before being placed into the silicon lattice?',
      'When the fifth electron breaks free, what happens to the parent atom inside the lattice?',
      'Mobile electrons (-) are exactly balanced by immobile donor ions (+), so net charge is zero.',
    ],
    misconceptionIndex: 3,
  },

  // 18. Advanced - Application - c12_phy_115 (Diode KVL)
  {
    id: 'ch_18_diode_reverse_voltage',
    nodeId: NODE_C12_PHY_115,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A silicon diode with reverse breakdown voltage of 50 V is reverse-biased with a 15 V battery in series with a 10 kΩ resistor. What is the approximate voltage drop across the reverse-biased diode in Volts (assuming reverse saturation current is negligible ~0.1 µA)?',
    correctAnswer: 14.999,
    tolerance: 0.1,
    unit: 'V',
    explanation: 'Because reverse leakage current is practically negligible (0.1 µA), the voltage drop across the 10 kΩ resistor is V_R = 10^4 * 10^-7 = 0.001 V. Thus, nearly the entire 15 V supply appears across the reverse-biased junction (15 - 0.001 ≈ 15.0 V).',
    hints: [
      'In reverse bias below breakdown, the diode acts almost like an open circuit with huge resistance.',
      'Very little current flows through the series resistor.',
      'Almost the entire battery voltage (15 V) drops across the high-resistance reverse-biased diode.',
    ],
  },

  // 19. Advanced - Analysis - c12_phy_116 vs 117
  {
    id: 'ch_19_rectifier_filter_comparison',
    nodeId: NODE_C12_PHY_117,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is it significantly easier to smooth the output of a full-wave rectifier with a shunt capacitor filter than a half-wave rectifier?',
    options: [
      'Full-wave rectifiers run at a lower operating temperature.',
      'Because the full-wave ripple frequency is double (100 Hz vs 50 Hz) and there are no zero-voltage gaps, the capacitor has only half the time to discharge between charging peaks.',
      'Full-wave rectifiers produce pure DC without requiring any capacitors.',
      'Diodes in full-wave rectifiers act as capacitors automatically.',
    ],
    correctIndex: 1,
    explanation: 'In full-wave rectification, pulses arrive every 10 ms (at 50 Hz mains) rather than every 20 ms. The shorter discharge time interval (T/2) means the filter capacitor voltage droops far less, yielding much lower peak-to-peak ripple voltage.',
    hints: [
      'Compare the time between consecutive voltage peaks: 10 ms vs 20 ms.',
      'Does a capacitor discharge more or less during a shorter time gap?',
      'Higher ripple frequency (100 Hz) means the capacitor discharges for only half the time between pulses.',
    ],
  },

  // 20. Advanced - Application - c12_phy_120
  {
    id: 'ch_20_solar_panel_satellite',
    nodeId: NODE_C12_PHY_120,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An ISRO satellite payload requires an operating DC bus voltage of 28.0 V. If individual silicon solar cells provide an open-circuit voltage of 0.56 V under solar illumination, how many solar cells must be connected in series in each string?',
    correctAnswer: 50,
    tolerance: 0.1,
    unit: 'cells',
    explanation: 'In series connection, voltages add algebraically: Total Voltage = N * V_cell => N = 28.0 V / 0.56 V = 50 cells in series.',
    hints: [
      'In a series string, the voltages of individual cells add together directly.',
      'Divide the required total bus voltage (28.0 V) by the voltage of a single cell (0.56 V).',
      '28.0 / 0.56 = 50.',
    ],
  },

  // 21. Advanced - Evaluation - c12_phy_112
  {
    id: 'ch_21_temp_coeff_physics',
    nodeId: NODE_C12_PHY_112,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does a semiconductor possess a negative temperature coefficient of resistance (NTC), whereas a metallic conductor has a positive temperature coefficient (PTC)?',
    options: [
      'In metals, carrier density is fixed and lattice scattering increases with T; in semiconductors, exponential thermal generation of electron-hole pairs vastly overwhelms increased lattice scattering.',
      'Metals have band gaps that expand when heated.',
      'Semiconductors lose all their electrons as temperature rises.',
      'Semiconductors violate Ohm’s law by creating energy from nothing.',
    ],
    correctIndex: 0,
    explanation: 'Metals already have ~10^28 free electrons/m^3 (overlapping bands), so heating only increases lattice thermal vibrations (phonon scattering), reducing conductivity (PTC). In semiconductors, ni ∝ T^(3/2) exp(-Eg/2kT); the exponential surge in carrier density dominates, reducing resistivity sharply (NTC).',
    hints: [
      'Think about whether heating creates NEW carriers in a metal (no, already full) vs a semiconductor (yes, breaks bonds).',
      'In semiconductors, the exponential increase in carrier concentration n(T) dominates.',
      'More carriers = higher conductivity = lower resistance (Negative Temperature Coefficient).',
    ],
    misconceptionIndex: 2,
  },

  // 22. Advanced - Drag Sort - c12_phy_114
  {
    id: 'ch_22_junction_formation_steps',
    nodeId: NODE_C12_PHY_114,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the physical steps of p-n junction and barrier formation into the correct chronological sequence.',
    sortItems: [
      'Concentration gradients drive majority electrons from n-side to p-side and holes from p-side to n-side (Diffusion Current).',
      'Crossing carriers recombine near the interface, leaving uncompensated fixed donor ions (n-side) and acceptor ions (p-side).',
      'A space-charge depletion region forms, setting up an internal electric field pointing from n to p.',
      'The built-in electric field opposes majority diffusion and drives minority carriers (Drift Current).',
      'Dynamic equilibrium is reached when Diffusion Current equals Drift Current in magnitude, yielding zero net current.',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: '1. Diffusion of majority carriers begins -> 2. Immobile ions uncovered -> 3. Depletion layer & electric field established -> 4. Opposing drift current grows -> 5. Diffusion = Drift equilibrium reached.',
    hints: [
      'What starts the process immediately when p and n regions meet? (Carrier concentration gradient).',
      'What is left behind when mobile carriers diffuse and recombine?',
      'Equilibrium occurs when diffusion is perfectly balanced by field-driven drift.',
    ],
  },
];

// ─── DEFAULT PROPS ───
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_111,
  title: 'Energy Bands in Solids & Semiconductor Devices',
  definition: 'Energy band theory explains electrical conduction based on discrete atomic levels splitting into continuous Valence and Conduction bands separated by a forbidden energy gap (Eg). Doping, p-n junctions, rectifiers, LEDs, photodiodes, and solar cells build the foundation of modern solid-state electronics.',
  eli5: 'Think of electrons like people in a theater. In metals, the main floor and balcony overlap so everyone moves freely. In insulators, the balcony is impossibly high. In semiconductors, the balcony is just a small step up (~1.1 eV) — warm it up, shine light, or add dopants, and electrons easily jump to carry electrical current!',
  misconceptions: [
    {
      misconception: 'The forbidden band gap is just empty physical space with no atoms.',
      correction: 'The forbidden energy gap is a range of FORBIDDEN ENERGY LEVELS (in eV) that quantum mechanics prevents electrons from possessing in the crystal lattice.',
    },
    {
      misconception: 'Insulators have overlapping bands while conductors have large band gaps.',
      correction: 'Conductors have OVERLAPPING valence and conduction bands (Eg = 0). Insulators have a very wide gap (Eg ≈ 5.5 eV in diamond).',
    },
    {
      misconception: 'Heating a semiconductor increases its resistance just like a metal wire.',
      correction: 'Semiconductors have a NEGATIVE temperature coefficient of resistance. Heating breaks covalent bonds, exponentially increasing carrier density (electron-hole pairs) and lowering resistance.',
    },
    {
      misconception: 'An n-type semiconductor has an overall negative electrostatic charge.',
      correction: 'An n-type semiconductor is electrically NEUTRAL. Every mobile conduction electron is electrostatically balanced by a fixed positive donor ion (P+) in the lattice.',
    },
    {
      misconception: 'The depletion region has no charges at all.',
      correction: 'The depletion region is depleted of MOBILE charge carriers, but is densely packed with IMMOBILE ionised donor (+) and acceptor (-) ions.',
    },
    {
      misconception: 'A solar cell operates on the photoelectric effect and requires an external battery.',
      correction: 'A solar cell works on the PHOTOVOLTAIC EFFECT with ZERO external bias. The internal built-in electric field separates photogenerated electron-hole pairs.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the band gap of diamond?', options: ['0 eV', '1.1 eV', '5.5 eV', '0.72 eV'], correctIndex: 2 },
    { question: 'What charge carriers exist in an intrinsic semiconductor?', options: ['Only electrons', 'Only holes', 'Both electrons and holes in equal numbers', 'Neither'], correctIndex: 2 },
    { question: 'Doping silicon with Boron produces what type of semiconductor?', options: ['n-type', 'p-type', 'Metallic', 'Superconductor'], correctIndex: 1 },
    { question: 'What is the knee voltage of a Silicon diode?', options: ['0.3 V', '0.7 V', '1.8 V', '5.5 V'], correctIndex: 1 },
    { question: 'What is the ripple frequency of a 50 Hz full-wave rectifier?', options: ['25 Hz', '50 Hz', '100 Hz', '200 Hz'], correctIndex: 2 },
    { question: 'Which device must be operated in FORWARD bias to emit light?', options: ['Photodiode', 'LED', 'Solar cell', 'Zener diode regulator'], correctIndex: 1 },
    { question: 'Which device is operated in REVERSE bias for high-speed light detection?', options: ['LED', 'Photodiode', 'Solar cell', 'Full-wave rectifier'], correctIndex: 1 },
    { question: 'What is the source of EMF in an illuminated solar cell?', options: ['External battery', 'Built-in junction electric field separating carriers', 'Chemical reaction', 'Magnetic induction'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student understands energy bands, doping, p-n junction physics, V-I characteristics, rectifiers, LEDs, photodiodes, and solar cells.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Energy Band Simulator',
    instruction: 'Adjust the atomic spacing or material selector to watch discrete atomic energy levels split into continuous Valence & Conduction bands with a forbidden gap Eg.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_111,
  },
  {
    title: '2. Thermal Carrier Generation (Pure Silicon)',
    instruction: 'Raise the temperature slider from 0 K to 500 K. Observe how covalent bonds rupture, generating mobile electron-hole pairs in equal numbers (ne = nh = ni).',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_112,
  },
  {
    title: '3. Extrinsic Doping Lab (n-type & p-type)',
    instruction: 'Toggle between Pentavalent (Phosphorus) and Trivalent (Boron) doping. Observe how donor electrons and acceptor holes populate without disturbing charge neutrality.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_PHY_113,
  },
  {
    title: '4. p-n Junction & Depletion Barrier',
    instruction: 'Slide the bias voltage from -5.0 V (Reverse) to +1.0 V (Forward). Watch the depletion region width and potential barrier change dynamically.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_114,
  },
  {
    title: '5. Optoelectronic Device Suite (LED, Photodiode, Solar Cell)',
    instruction: 'Switch between LED (forward emission), Photodiode (reverse detection), and Solar Cell (zero-bias photovoltaic generation). Adjust light intensity and bias!',
    interactionType: 'click-parts',
    nodeId: NODE_C12_PHY_118,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you apply a REVERSE bias voltage to a silicon p-n junction diode, what happens to the width of the depletion layer?',
    options: [
      'The depletion layer narrows and collapses completely.',
      'The depletion layer widens because majority carriers are pulled away from the junction.',
      'The depletion layer remains completely unaffected.',
      'The depletion layer converts into pure copper.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now move the Bias Voltage slider to negative values (e.g. -3.0 V) in the simulation to verify your prediction!',
    nodeId: NODE_C12_PHY_114,
  },
  {
    question: 'Predict: In a centre-tapped full-wave rectifier with 50 Hz AC input, how many pulses of DC output appear across the load in 1 second?',
    options: [
      '25 pulses',
      '50 pulses',
      '100 pulses (both positive and negative half-cycles are rectified)',
      '0 pulses',
    ],
    correctIndex: 2,
    verifyInstruction: 'Check the Rectifier waveform view below and observe that ripple frequency = 2 × 50 Hz = 100 Hz!',
    nodeId: NODE_C12_PHY_117,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you increase temperature in the Intrinsic Semiconductor model, what happens to the electron-hole pair density and electrical conductivity?',
    observableOptions: [
      'Carrier density drops to zero; conductivity decreases.',
      'Carrier density rises exponentially; conductivity increases (Resistance drops).',
      'Only electrons increase; holes disappear.',
      'No visible change in conductivity.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PHY_112,
  },
  {
    question: 'Observation: In the LED simulation, what happens when you switch from Red (GaAsP) to Blue (GaN)?',
    observableOptions: [
      'Required turn-on voltage decreases to 0.5 V.',
      'Required forward cut-in voltage increases from ~1.8 V to ~3.2 V because of GaN\'s larger band gap.',
      'The diode stops conducting in forward bias.',
      'The wavelength becomes longer.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PHY_118,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Mission Specialist Task: Design an ISRO Deep-Space Power & Sensor Unit',
  description: 'Apply what you have learned to design a space-grade power & telemetry module using semiconductor devices:',
  steps: [
    'Select the semiconductor material for solar panels (Silicon ~1.1 eV or GaAs ~1.4 eV for higher space efficiency).',
    'Calculate the series cell count needed to maintain a 28 V regulated spacecraft bus.',
    'Select a full-wave bridge rectifier to handle onboard AC alternator testing at 400 Hz (Ripple frequency = 800 Hz).',
    'Pair a high-speed reverse-biased PIN photodiode with an infrared GaAs laser diode for satellite-to-satellite optical telemetry.',
  ],
};

// ─── REFLECTION QUESTIONS ───
const REFLECTION_QUESTIONS = [
  'What was the most surprising thing you learned?',
  'How would you explain this to a friend?',
  'Where in real life might you use this?',
];

function C12_PhysicsEnergyBandsSolidsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_111,
  title = DEFAULT_PROPS.title || 'Energy Bands in Solids & Semiconductor Devices',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── INTERACTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);

  // ─── SIMULATION & LAB VARIABLES ───
  const [materialType, setMaterialType] = useState<'conductor' | 'semiconductor' | 'insulator'>('semiconductor');
  const [atomicSpacing, setAtomicSpacing] = useState<number>(2.5); // Angstroms
  const [simTemperature, setSimTemperature] = useState<number>(300); // Kelvin (0 - 600 K)
  const [dopingType, setDopingType] = useState<'intrinsic' | 'n-type' | 'p-type'>('intrinsic');
  const [biasVoltage, setBiasVoltage] = useState<number>(0.0); // -5.0 V to +1.5 V
  const [rectifierMode, setRectifierMode] = useState<'half-wave' | 'full-wave'>('full-wave');
  const [optoDevice, setOptoDevice] = useState<'led' | 'photodiode' | 'solar-cell'>('led');
  const [ledMaterial, setLedMaterial] = useState<'GaAs_IR' | 'GaAsP_Red' | 'GaN_Blue'>('GaAsP_Red');
  const [lightIntensity, setLightIntensity] = useState<number>(80); // mW/cm^2 or %
  const [solarLoadR] = useState<number>(100); // Ohms

  // ─── CHALLENGE & PROGRESS STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Sort & Input State
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
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection state
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<number, string>>({});

  // BKT State & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // HTML5 Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM LOCAL STORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT UPDATE ───
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
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME CALCULATIONS (DERIVED VALUES) ───
  const currentEg = useMemo(() => {
    if (materialType === 'conductor') return 0;
    if (materialType === 'insulator') return 5.5;
    return 1.12;
  }, [materialType]);

  const carrierDensityNi = useMemo(() => {
    if (simTemperature <= 10) return 0;
    const k = 8.617e-5;
    const factor = Math.pow(simTemperature / 300, 1.5);
    const exponent = -currentEg / (2 * k * simTemperature);
    const ni = 1.5e10 * factor * Math.exp(exponent + 1.12 / (2 * k * 300));
    return Math.max(0, ni);
  }, [simTemperature, currentEg]);

  const depletionData = useMemo(() => {
    const builtInV = 0.7;
    const netV = builtInV - biasVoltage;
    const effectiveBarrier = Math.max(0.05, netV);
    const widthMicrons = Math.max(0.05, Math.min(2.5, 0.5 * Math.sqrt(effectiveBarrier / 0.7)));
    const forwardCurrent =
      biasVoltage > 0.65
        ? Math.min(50, Math.exp((biasVoltage - 0.7) / 0.05) * 2)
        : biasVoltage > 0
        ? (biasVoltage / 0.7) * 0.1
        : -0.0001;
    return { effectiveBarrier, widthMicrons, forwardCurrent };
  }, [biasVoltage]);

  const ledData = useMemo(() => {
    if (ledMaterial === 'GaAs_IR') return { name: 'GaAs (Infrared)', eg: 1.42, colour: '#94a3b8', hex: '#64748b', wavelength: 880, turnOn: 1.4 };
    if (ledMaterial === 'GaAsP_Red') return { name: 'GaAsP (Red)', eg: 1.9, colour: '#ef4444', hex: '#f87171', wavelength: 650, turnOn: 1.8 };
    return { name: 'GaN (Blue)', eg: 3.4, colour: '#3b82f6', hex: '#60a5fa', wavelength: 450, turnOn: 3.2 };
  }, [ledMaterial]);

  const solarData = useMemo(() => {
    const isc = (lightIntensity / 100) * 0.035;
    const voc = lightIntensity > 0 ? 0.58 + 0.025 * Math.log(lightIntensity / 100 + 0.01) : 0;
    const vOperating = Math.max(0, Math.min(voc, isc * solarLoadR));
    const iOperating = Math.max(0, isc * (1 - Math.exp((vOperating - voc) / 0.05)));
    const powerMw = vOperating * iOperating * 1000;
    return { isc: isc * 1000, voc, vOperating, iOperating: iOperating * 1000, powerMw };
  }, [lightIntensity, solarLoadR]);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Energy Band & Semiconductor Interactive Laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all parameters without grading!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us test your solid-state physics mastery with CISCE board challenges.');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now manipulate the simulation controls to verify.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us walk through the step-by-step physical explanation.');
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission complete! You scored ${finalScore} percent.`);
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
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('All hints utilized. Study this derivation carefully.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── 2D CANVAS ANIMATION (CARRIER DRIFT & DIFFUSION) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; type: 'electron' | 'hole' }[] = [];
    const count = Math.min(60, Math.floor(carrierDensityNi / 2e9) + (dopingType !== 'intrinsic' ? 30 : 5));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (simTemperature / 150),
        vy: (Math.random() - 0.5) * (simTemperature / 150),
        type: dopingType === 'n-type' ? (Math.random() > 0.15 ? 'electron' : 'hole') : dopingType === 'p-type' ? (Math.random() > 0.15 ? 'hole' : 'electron') : (i % 2 === 0 ? 'electron' : 'hole'),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background lattice grid
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

      // Draw and move carriers
      particles.forEach(p => {
        p.x += p.vx + (biasVoltage > 0 ? (p.type === 'electron' ? 1.2 : -1.2) : 0);
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.type === 'electron' ? 4 : 5, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'electron' ? '#38bdf8' : '#f43f5e';
        ctx.shadowColor = p.type === 'electron' ? '#0284c7' : '#e11d48';
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.type === 'electron' ? 'e⁻' : 'h⁺', p.x, p.y + 3);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [carrierDensityNi, dopingType, simTemperature, biasVoltage]);

  // ─── 2D WAVEFORM CANVAS (RECTIFIER SIMULATOR) ───
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animId: number;

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const midY = canvas.height / 2;
      const scaleY = canvas.height * 0.35;

      // Zero axis
      ctx.strokeStyle = '#475569';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(canvas.width, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Input AC Waveform (Cyan)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const theta = (x * 0.05) + time;
        const y = midY - Math.sin(theta) * scaleY;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Rectified Output Waveform (Yellow/Amber)
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const theta = (x * 0.05) + time;
        let vOut = 0;
        if (rectifierMode === 'half-wave') {
          vOut = Math.max(0, Math.sin(theta));
        } else {
          vOut = Math.abs(Math.sin(theta));
        }
        const y = midY - (vOut * scaleY);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rectifierMode]);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
              ISC Class 12 Physics • Electronics
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Difficulty Badge & Stats */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
            }`}
          >
            {difficulty} TIER
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery</span>
            <span className="text-sm font-bold text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE (CURIOSITY HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-xl">
            <span className="text-xs font-bold px-2.5 py-1 bg-gold-500/20 text-gold-300 rounded-md uppercase tracking-wider">
              Spacecraft Mission Scenario
            </span>
            <h2 className="text-xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-gold-300">
              💡 <strong>Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
              <span>❓</span> Curiosity Hook Question:
            </h3>
            <p className="text-white text-base leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, backgroundColor: '#1e293b' }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/40 text-slate-500 border border-slate-800'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/50'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">
                    {String.fromCharCode(65 + i)}.
                  </span>{' '}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gold-950/40 rounded-xl border border-gold-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className="text-xs sm:text-sm text-gold-200 leading-relaxed">
                  {discoveryCorrect
                    ? '✓ Spot on! Copper is a metal with overlapping bands (PTC); Silicon is a semiconductor where heat generates electron-hole pairs (NTC).'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (5 INTERACTIVE STEPS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="text-xs px-3 py-1 bg-slate-800 rounded-lg text-slate-300 font-mono">
              Node: {EXPLORATION_STEPS[currentSlide].nodeId}
            </span>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40 flex items-center gap-2">
            <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* DYNAMIC INTERACTIVE LAB WORKBENCH */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-6">
            {/* ── SLIDE 0: ENERGY BAND SIMULATOR ── */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['conductor', 'semiconductor', 'insulator'] as const).map(m => (
                      <motion.button
                        key={m}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMaterialType(m);
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all ${
                          materialType === m
                            ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/40'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m}
                      </motion.button>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 flex justify-between mb-1">
                      <span>Interatomic Lattice Spacing (a)</span>
                      <span className="text-gold-400 font-mono">{atomicSpacing} Å</span>
                    </label>
                    <input
                      type="range"
                      min={1.0}
                      max={5.0}
                      step={0.1}
                      value={atomicSpacing}
                      onChange={e => {
                        setAtomicSpacing(parseFloat(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Forbidden Gap (Eg):</span>
                      <span className="font-bold text-amber-400 font-mono">{currentEg} eV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Conduction State:</span>
                      <span className="font-bold text-emerald-400">
                        {materialType === 'conductor'
                          ? 'Freely conducting (Overlapping Bands)'
                          : materialType === 'semiconductor'
                          ? 'Thermally activatable (Small Eg ≈ 1.1 eV)'
                          : 'Non-conducting (Huge Eg ≈ 5.5 eV)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SVG Energy Band Visualizer */}
                <svg viewBox="0 0 320 220" className="w-full h-56 bg-slate-950 rounded-xl border border-slate-800">
                  <text x="160" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    Energy Level Splitting vs Lattice Band Formation
                  </text>
                  <rect
                    x="50"
                    y={materialType === 'conductor' ? 80 : 35}
                    width="220"
                    height="50"
                    rx="8"
                    fill="#3b82f6"
                    fillOpacity="0.25"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <text x="160" y={materialType === 'conductor' ? 105 : 62} textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">
                    Conduction Band (CB) {materialType === 'conductor' ? '[Overlaps]' : '[Empty at 0 K]'}
                  </text>

                  {materialType !== 'conductor' && (
                    <g>
                      <line x1="160" y1="88" x2="160" y2={materialType === 'insulator' ? 145 : 125} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                      <rect x="110" y={materialType === 'insulator' ? 105 : 95} width="100" height="24" rx="6" fill="#1e293b" stroke="#475569" />
                      <text x="160" y={materialType === 'insulator' ? 121 : 111} textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        Eg ≈ {currentEg} eV
                      </text>
                    </g>
                  )}

                  <rect
                    x="50"
                    y={materialType === 'conductor' ? 110 : materialType === 'insulator' ? 150 : 130}
                    width="220"
                    height="50"
                    rx="8"
                    fill="#10b981"
                    fillOpacity="0.25"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <text
                    x="160"
                    y={materialType === 'conductor' ? 140 : materialType === 'insulator' ? 180 : 160}
                    textAnchor="middle"
                    fill="#34d399"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    Valence Band (VB) [Full of Valence Electrons]
                  </text>
                </svg>
              </div>
            )}

            {/* ── SLIDE 1: THERMAL CARRIER GENERATION ── */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 flex justify-between mb-1">
                      <span>Temperature (T)</span>
                      <span className="text-amber-400 font-mono font-bold">{simTemperature} K</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={600}
                      step={10}
                      value={simTemperature}
                      onChange={e => {
                        setSimTemperature(parseInt(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Electron Density (ne):</span>
                      <span className="text-gold-400 font-mono font-bold text-sm">
                        {carrierDensityNi.toExponential(2)} m⁻³
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Hole Density (nh):</span>
                      <span className="text-rose-400 font-mono font-bold text-sm">
                        {carrierDensityNi.toExponential(2)} m⁻³
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/60 text-xs text-gold-300">
                    🔬 <strong>Rule:</strong> In pure intrinsic silicon, thermal excitation creates electron-hole pairs in exact equality: <code className="text-amber-300 font-mono">ne = nh = ni</code>. Resistivity drops with rising temperature (NTC)!
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gold-400 inline-block"></span> Electrons in CB</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Holes in VB</span>
                  </div>
                  <canvas ref={canvasRef} width={300} height={180} className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800" />
                </div>
              </div>
            )}

            {/* ── SLIDE 2: EXTRINSIC DOPING LAB ── */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['intrinsic', 'n-type', 'p-type'] as const).map(d => (
                      <motion.button
                        key={d}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setDopingType(d);
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                          dopingType === d
                            ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/40'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {d}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dopant Class:</span>
                      <span className="font-bold text-amber-400">
                        {dopingType === 'n-type' ? 'Pentavalent Donor (P, As, Sb - 5 valence e⁻)' : dopingType === 'p-type' ? 'Trivalent Acceptor (B, Ga, In - 3 valence e⁻)' : 'Pure Undoped Silicon'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Majority Carrier:</span>
                      <span className="font-bold text-emerald-400">
                        {dopingType === 'n-type' ? 'Free Conduction Electrons (e⁻)' : dopingType === 'p-type' ? 'Valence Band Holes (h⁺)' : 'Equal (ne = nh = ni)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Immobile Lattice Ion:</span>
                      <span className="font-bold text-gold-400">
                        {dopingType === 'n-type' ? 'Fixed Donor Ion (P⁺)' : dopingType === 'p-type' ? 'Fixed Acceptor Ion (B⁻)' : 'None (Neutral Si)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Net Crystal Charge:</span>
                      <span className="font-bold text-emerald-400 font-mono">0 Coulombs (STRICTLY NEUTRAL)</span>
                    </div>
                  </div>
                </div>

                <svg viewBox="0 0 320 200" className="w-full h-52 bg-slate-950 rounded-xl border border-slate-800">
                  <text x="160" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                    Silicon Lattice & Dopant Substitution
                  </text>
                  {[
                    { x: 80, y: 60 }, { x: 160, y: 60 }, { x: 240, y: 60 },
                    { x: 80, y: 120 }, { x: 160, y: 120, dopant: true }, { x: 240, y: 120 },
                    { x: 80, y: 170 }, { x: 160, y: 170 }, { x: 240, y: 170 },
                  ].map((atom, i) => (
                    <g key={i}>
                      <circle
                        cx={atom.x}
                        cy={atom.y}
                        r={atom.dopant && dopingType !== 'intrinsic' ? 18 : 14}
                        fill={atom.dopant && dopingType === 'n-type' ? '#0284c7' : atom.dopant && dopingType === 'p-type' ? '#e11d48' : '#334155'}
                        stroke={atom.dopant && dopingType !== 'intrinsic' ? '#fbbf24' : '#64748b'}
                        strokeWidth={atom.dopant && dopingType !== 'intrinsic' ? 2 : 1}
                      />
                      <text x={atom.x} y={atom.y + 4} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                        {atom.dopant && dopingType === 'n-type' ? 'P⁺' : atom.dopant && dopingType === 'p-type' ? 'B⁻' : 'Si'}
                      </text>
                    </g>
                  ))}
                  {dopingType === 'n-type' && (
                    <motion.g animate={{ x: [0, 10, -10, 0], y: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <circle cx="190" cy="100" r="5" fill="#38bdf8" />
                      <text x="190" y="92" textAnchor="middle" fill="#38bdf8" fontSize="8">5th e⁻</text>
                    </motion.g>
                  )}
                  {dopingType === 'p-type' && (
                    <motion.g animate={{ x: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <circle cx="130" cy="120" r="6" fill="transparent" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2 2" />
                      <text x="130" y="112" textAnchor="middle" fill="#f43f5e" fontSize="8">Hole</text>
                    </motion.g>
                  )}
                </svg>
              </div>
            )}

            {/* ── SLIDE 3: P-N JUNCTION & DEVIATION BARRIER ── */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                {!predictionMade ? (
                  <div className="p-4 bg-slate-950 rounded-xl border border-gold-800/80 space-y-3">
                    <span className="text-xs font-bold text-amber-400 uppercase">Predict-Then-Check</span>
                    <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="p-3 text-left bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gold-950/50 rounded-xl border border-gold-700 text-xs text-gold-300 flex justify-between items-center">
                    <span>💡 <strong>Prediction Logged:</strong> {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                    <button
                      onClick={() => setPredictionMade(false)}
                      className="px-2 py-1 bg-gold-800 rounded text-white text-xs hover:bg-gold-700"
                    >
                      Reset
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between mb-1">
                        <span>Applied Bias Voltage (V)</span>
                        <span className={`font-mono font-bold ${biasVoltage > 0.6 ? 'text-emerald-400' : biasVoltage < 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                          {biasVoltage > 0 ? `+${biasVoltage.toFixed(2)}` : biasVoltage.toFixed(2)} V ({biasVoltage > 0.65 ? 'FORWARD CONDUCTION' : biasVoltage < 0 ? 'REVERSE BIAS' : 'EQUILIBRIUM'})
                        </span>
                      </label>
                      <input
                        type="range"
                        min={-5.0}
                        max={1.0}
                        step={0.05}
                        value={biasVoltage}
                        onChange={e => {
                          setBiasVoltage(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block">Barrier Height</span>
                        <span className="font-bold text-amber-400 font-mono">{depletionData.effectiveBarrier.toFixed(2)} V</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block">Depletion Width</span>
                        <span className="font-bold text-gold-400 font-mono">{depletionData.widthMicrons.toFixed(2)} µm</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block">Current (I)</span>
                        <span className="font-bold text-emerald-400 font-mono">{depletionData.forwardCurrent.toFixed(2)} mA</span>
                      </div>
                    </div>
                  </div>

                  <svg viewBox="0 0 320 180" className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800">
                    <rect x="20" y="25" width="110" height="90" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1.5" />
                    <text x="75" y="45" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">p-type (Anode)</text>
                    <text x="75" y="75" textAnchor="middle" fill="#fca5a5" fontSize="9">Holes (h⁺)</text>

                    <rect x="190" y="25" width="110" height="90" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1.5" />
                    <text x="245" y="45" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">n-type (Cathode)</text>
                    <text x="245" y="75" textAnchor="middle" fill="#bae6fd" fontSize="9">Electrons (e⁻)</text>

                    <motion.rect
                      x={160 - depletionData.widthMicrons * 25}
                      y="25"
                      width={depletionData.widthMicrons * 50}
                      height="90"
                      fill="#f59e0b"
                      fillOpacity="0.3"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <text x="160" y="75" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
                      Depletion Layer
                    </text>
                    <text x="160" y="90" textAnchor="middle" fill="#fef08a" fontSize="7">
                      (Immobile Ions)
                    </text>

                    <path
                      d={`M 30 155 L ${160 - depletionData.widthMicrons * 25} 155 Q 160 ${155 - depletionData.effectiveBarrier * 25} ${160 + depletionData.widthMicrons * 25} ${155 - depletionData.effectiveBarrier * 25} L 290 ${155 - depletionData.effectiveBarrier * 25}`}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2.5"
                    />
                    <text x="160" y="172" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      Potential Barrier Hill (V₀ = ~0.7 V)
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* ── SLIDE 4: OPTOELECTRONICS SUITE ── */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {(['led', 'photodiode', 'solar-cell'] as const).map(op => (
                    <motion.button
                      key={op}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setOptoDevice(op);
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                        optoDevice === op
                          ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/40'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {op === 'led' ? '💡 LED (Light Emitter)' : op === 'photodiode' ? '📡 Photodiode (Sensor)' : '☀️ Solar Cell (Power)'}
                    </motion.button>
                  ))}
                </div>

                {optoDevice === 'led' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <label className="text-xs text-slate-400 block">Select Semiconductor Material:</label>
                      <div className="flex gap-2">
                        {(['GaAs_IR', 'GaAsP_Red', 'GaN_Blue'] as const).map(mat => (
                          <button
                            key={mat}
                            onClick={() => {
                              setLedMaterial(mat);
                              audioManager.play('pop');
                            }}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                              ledMaterial === mat ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {mat === 'GaAs_IR' ? 'GaAs (IR)' : mat === 'GaAsP_Red' ? 'GaAsP (Red)' : 'GaN (Blue)'}
                          </button>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Emitted Wavelength (λ):</span>
                          <span className="font-bold text-amber-400 font-mono">{ledData.wavelength} nm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Band Gap (Eg):</span>
                          <span className="font-bold text-gold-400 font-mono">{ledData.eg} eV</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Cut-in Turn-on Voltage:</span>
                          <span className="font-bold text-emerald-400 font-mono">≈ {ledData.turnOn} V</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[160px]">
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          boxShadow: [
                            `0 0 10px ${ledData.hex}`,
                            `0 0 35px ${ledData.hex}`,
                            `0 0 10px ${ledData.hex}`,
                          ],
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: ledData.hex, color: '#fff' }}
                      >
                        {ledData.wavelength} nm
                      </motion.div>
                      <span className="text-xs text-slate-400 mt-3">{ledData.name} Electroluminescence</span>
                    </div>
                  </div>
                )}

                {optoDevice === 'photodiode' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 flex justify-between mb-1">
                          <span>Incident Light Intensity (Photons/sec)</span>
                          <span className="text-amber-400 font-mono">{lightIntensity} %</span>
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={lightIntensity}
                          onChange={e => setLightIntensity(parseInt(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bias Mode:</span>
                          <span className="font-bold text-rose-400">REVERSE BIAS (Wide Depletion Layer)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Photocurrent (I_photo ∝ Intensity):</span>
                          <span className="font-bold text-emerald-400 font-mono">{(lightIntensity * 0.45).toFixed(1)} µA</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <span className="font-bold text-gold-300 block">📡 Optical Fibre & Smoke Detector Principle:</span>
                      <p className="text-slate-400 leading-relaxed">
                        Incoming light generates electron-hole pairs inside the reverse-biased depletion region. The strong electric field immediately sweeps carriers to opposite terminals, producing a linear current response with nanosecond speed!
                      </p>
                    </div>
                  </div>
                )}

                {optoDevice === 'solar-cell' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 flex justify-between mb-1">
                          <span>Solar Irradiance (Sunlight)</span>
                          <span className="text-amber-400 font-mono">{lightIntensity} mW/cm²</span>
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={lightIntensity}
                          onChange={e => setLightIntensity(parseInt(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-500 block">Open Circuit Voc</span>
                          <span className="font-bold text-amber-400 font-mono">{solarData.voc.toFixed(2)} V</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-500 block">Short Circuit Isc</span>
                          <span className="font-bold text-gold-400 font-mono">{solarData.isc.toFixed(1)} mA</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-500 block">Generated Power</span>
                          <span className="font-bold text-emerald-400 font-mono">{solarData.powerMw.toFixed(1)} mW</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <span className="font-bold text-amber-300 block">☀️ Photovoltaic Effect (Zero External Bias):</span>
                      <p className="text-slate-400 leading-relaxed">
                        Photons (hν &gt; 1.1 eV) create pairs in the depletion region. The junction's internal built-in field sweeps electrons to the n-side and holes to the p-side, driving current through an external load with <strong>zero external battery</strong>!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PREV / NEXT NAVIGATION BAR */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-500">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Try Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded uppercase tracking-wider">
                Free Exploration Sandbox
              </span>
              <h2 className="text-lg font-bold text-white mt-1">Rectification & Waveform Oscilloscope Lab</h2>
              <p className="text-xs text-slate-400">Manipulate AC frequency and toggle Half-Wave vs Full-Wave to observe the output ripple frequency.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              Ready for CISCE Challenges! →
            </motion.button>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setRectifierMode('half-wave');
                    audioManager.play('tap');
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    rectifierMode === 'half-wave' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Half-Wave (1 Diode, f_ripple = f_in)
                </button>
                <button
                  onClick={() => {
                    setRectifierMode('full-wave');
                    audioManager.play('tap');
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    rectifierMode === 'full-wave' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Full-Wave (2 Diodes, f_ripple = 2 f_in)
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Input Mains: <strong>50 Hz AC</strong></span>
                <span className="text-amber-400 font-bold font-mono">
                  Output Ripple: {rectifierMode === 'half-wave' ? '50 Hz' : '100 Hz (Double Frequency)'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="text-gold-400 flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-gold-400 inline-block"></span> Channel 1: Input AC Sine Wave</span>
                <span className="text-amber-400 flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-amber-400 inline-block"></span> Channel 2: Rectified Pulsating DC Output</span>
              </div>
              <canvas ref={waveformCanvasRef} width={600} height={180} className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800 shadow-inner" />
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>⚡</span> {challenge.competencyLevel.toUpperCase()} LEVEL
              </h2>
            </div>
            <span className="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 font-mono">
              Node: {challenge.nodeId}
            </span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-2 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base text-white font-medium mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each label into the targets below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 rounded-lg text-xs text-white font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center transition-colors ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950/60 border-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-mono mb-1 text-slate-400">Target: {targetId}</span>
                      <span className="text-xs font-bold">{droppedLabels[targetId] || 'Drop Label Here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Verify Drag Mapping ✓
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-2">Drag items to arrange in correct physical sequence:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-3 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Verify Sequence ✓
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.001"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500 w-64"
                  />
                  <span className="text-sm text-slate-400 font-bold">{challenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Submit Calculation ✓
                </motion.button>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-gold-700/80 hover:bg-gold-600 text-white rounded-lg text-xs font-semibold shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-900/80 border border-gold-700 text-gold-200 rounded-lg text-xs font-medium flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above to assemble the circuit...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Verify Construction ✓
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📖</span> Step-by-Step CISCE Board Explanation
                  </span>
                  <span className="text-xs text-amber-300 font-mono">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('pop');
                      }}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Mission →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="text-center p-8 bg-gradient-to-b from-slate-900 to-gold-950/60 rounded-3xl border border-gold-800/80 shadow-2xl space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Semiconductor Mission Accomplished!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              You have completed all CISCE Class 12 Energy Bands and Semiconductor challenges.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {Math.max(0, 100 - errors * 5)}%
                </span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Mastery Level</span>
                <span className="text-2xl font-black text-amber-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-xs sm:text-sm text-emerald-300 leading-relaxed">
            {errors === 0
              ? '🌟 PERFECT SCORE! You have mastered semiconductor physics at the highest distinction level!'
              : errors <= 3
              ? '👏 Great work! Solid theoretical understanding of band theory and diode applications. Review minor slips below!'
              : '💪 Good determination! Solid-state physics requires rigorous practice. Review the key misconceptions below to solidify your knowledge.'}
          </div>

          {/* Misconception Review Card */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconceptions Rectified:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ CISCE Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>💭</span> Key Concept Reflections
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deepen your conceptual mastery by reflecting on what you discovered today:
            </p>
            <div className="space-y-4">
              {REFLECTION_QUESTIONS.map((q, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
                  <label className="text-xs font-semibold text-gold-300 block">
                    {idx + 1}. {q}
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers[idx] || ''}
                    onChange={e => setReflectionAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                    placeholder="Type your reflection here..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>📅 Spaced Repetition (SM-2): Review due in <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong></span>
            <span className="text-gold-400 font-mono">Algorithm Active</span>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_PhysicsEnergyBandsSolidsSim;