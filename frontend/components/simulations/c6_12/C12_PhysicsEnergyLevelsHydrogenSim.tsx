'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 12 Physics: Modern Physics & Nuclear Physics) ───
const NODE_C12_PHY_101 = 'c12_phy_101'; // Energy levels in hydrogen atom
const NODE_C12_PHY_102 = 'c12_phy_102'; // Hydrogen spectrum and Rydberg constant
const NODE_C12_PHY_103 = 'c12_phy_103'; // Nuclear composition (protons, neutrons)
const NODE_C12_PHY_104 = 'c12_phy_104'; // Isotopes and atomic mass unit
const NODE_C12_PHY_105 = 'c12_phy_105'; // Mass-energy relation (E = mc^2)
const NODE_C12_PHY_106 = 'c12_phy_106'; // Mass defect and binding energy
const NODE_C12_PHY_107 = 'c12_phy_107'; // Binding energy per nucleon and nuclear stability
const NODE_C12_PHY_108 = 'c12_phy_108'; // Nuclear fission
const NODE_C12_PHY_109 = 'c12_phy_109'; // Chain reaction and critical mass
const NODE_C12_PHY_110 = 'c12_phy_110'; // Nuclear fusion and stellar energy

const ALL_NODE_IDS = [
  NODE_C12_PHY_101,
  NODE_C12_PHY_102,
  NODE_C12_PHY_103,
  NODE_C12_PHY_104,
  NODE_C12_PHY_105,
  NODE_C12_PHY_106,
  NODE_C12_PHY_107,
  NODE_C12_PHY_108,
  NODE_C12_PHY_109,
  NODE_C12_PHY_110,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Astrophysicist at IUCAA: Deciphering the Solar Core & Quantum Spectra',
  intro: 'You are an astrophysicist at the Inter-University Centre for Astronomy and Astrophysics (IUCAA), Pune. A deep-space spectrograph from the Aditya-L1 solar probe just sent back mysterious emission spectra alongside anomalous mass-energy flux measurements from stellar reactions. To calibrate the sensors and verify reactor stability back at BARC, you must decode quantum transitions in hydrogen and trace how nuclear binding curves govern energy release across the cosmos.',
  context: 'From Bohr orbits in atomic hydrogen to stellar proton-proton fusion and neutron multiplication in reactors, your quantum and nuclear analysis will validate crucial mission data.',
};

// ─── DISCOVERY QUESTION (Hook before exploration) ───
const DISCOVERY_QUESTION = {
  question: 'In a hydrogen discharge tube, an electron falls from the n = 3 orbit to n = 2. A red photon (H-alpha, ~656 nm) is emitted. If the electron instead drops from n = 2 to n = 1 (a step of 1 level), will the emitted photon have higher or lower energy than the 3 -> 2 jump?',
  options: [
    'Much higher energy (~10.2 eV vs 1.89 eV) in the ultraviolet',
    'Lower energy, because n = 1 is closer to the nucleus',
    'Exactly the same energy, because both are a jump of Delta n = 1',
    'Zero energy, because the ground state cannot receive emitted photons',
  ],
  correctIndex: 0,
  hintAfter: 'Because En = -13.6/n^2 eV, energy gaps crowd together at higher n! The jump to the ground state is by far the most energetic. Let us explore the quantum ladder hands-on!',
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

// ─── 22 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION 1
  {
    id: 'ch_phy_01',
    nodeId: NODE_C12_PHY_101,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Bohr model of hydrogen, what is the total energy E_1 of the electron in the ground state (n = 1)?',
    options: ['+13.6 eV', '-13.6 eV', '-27.2 eV', '0 eV'],
    correctIndex: 1,
    explanation: 'The ground state energy of hydrogen is E_1 = -13.6/1^2 = -13.6 eV. The negative sign denotes that the electron is electrostatically bound to the nucleus.',
    hints: [
      'Recall the master formula for hydrogen energy levels: E_n = -13.6 / n^2 eV.',
      'For n = 1, substitute n = 1 into the formula.',
      'Remember that bound states always have negative total energy.',
    ],
    misconceptionIndex: 0,
  },
  // FOUNDATION 2
  {
    id: 'ch_phy_02',
    nodeId: NODE_C12_PHY_102,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each spectral series label to its corresponding final quantum state (n_lower).',
    dragItems: [
      { label: 'Lyman (UV)', targetId: 'target_n1' },
      { label: 'Balmer (Visible)', targetId: 'target_n2' },
      { label: 'Paschen (IR)', targetId: 'target_n3' },
      { label: 'Brackett (Far-IR)', targetId: 'target_n4' },
    ],
    correctMapping: {
      target_n1: 'Lyman (UV)',
      target_n2: 'Balmer (Visible)',
      target_n3: 'Paschen (IR)',
      target_n4: 'Brackett (Far-IR)',
    },
    explanation: 'Spectral series are classified strictly by their lower level n_1: Lyman (n_1=1, Ultraviolet), Balmer (n_1=2, Visible), Paschen (n_1=3, Infrared), Brackett (n_1=4, Far-Infrared).',
    hints: [
      'The series with highest photon energy ends on the ground state n=1.',
      'The only visible series is the one discovered first by Johann Balmer (ends on n=2).',
      'Paschen ends on n=3 and Brackett on n=4 in the infrared band.',
    ],
    misconceptionIndex: 1,
  },
  // FOUNDATION 3
  {
    id: 'ch_phy_03',
    nodeId: NODE_C12_PHY_103,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A nucleus of Uranium-238 is denoted as 238_92 U. How many neutrons does it contain?',
    options: ['92', '238', '146', '330'],
    correctIndex: 2,
    explanation: 'Neutron number N is calculated by N = A - Z. For Uranium-238, N = 238 - 92 = 146 neutrons.',
    hints: [
      'Mass number A is total nucleons (protons + neutrons).',
      'Atomic number Z is the number of protons (92).',
      'Calculate N = 238 - 92.',
    ],
    misconceptionIndex: 2,
  },
  // FOUNDATION 4
  {
    id: 'ch_phy_04',
    nodeId: NODE_C12_PHY_104,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why do isotopes like Protium (1_1 H) and Deuterium (2_1 H) exhibit identical chemical properties despite having different masses?',
    options: [
      'They have the same atomic number Z and identical electron configuration',
      'They have identical mass numbers A',
      'Their nuclear binding energies are identical',
      'They have the same number of neutrons',
    ],
    correctIndex: 0,
    explanation: 'Chemical behaviour is entirely governed by the number and arrangement of valence electrons. Since all isotopes of an element have the exact same atomic number Z (and thus same electron count), they form identical chemical bonds.',
    hints: [
      'Chemical reactions involve valence electron sharing and transfer, not nuclear mass.',
      'Both Protium and Deuterium have Z = 1 (1 proton, 1 electron).',
      'Same electron configuration leads to the same chemistry.',
    ],
    misconceptionIndex: 3,
  },
  // FOUNDATION 5
  {
    id: 'ch_phy_05',
    nodeId: NODE_C12_PHY_105,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Using the standard nuclear equivalence 1 u = 931.5 MeV, calculate the energy equivalent of a mass defect of 0.1 u in MeV.',
    correctAnswer: 93.15,
    tolerance: 0.2,
    unit: 'MeV',
    explanation: 'E = Delta m x 931.5 MeV/u = 0.1 u x 931.5 MeV/u = 93.15 MeV.',
    hints: [
      'Directly multiply the mass in u by 931.5 MeV/u.',
      '0.1 x 931.5 = ?',
      'The result is 93.15 MeV.',
    ],
  },
  // FOUNDATION 6
  {
    id: 'ch_phy_06',
    nodeId: NODE_C12_PHY_106,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What happens to the "missing mass" (mass defect Delta m) when free protons and neutrons bind together into a stable nucleus?',
    options: [
      'It is converted into binding energy and radiated away during formation',
      'It is destroyed and vanishes from the universe completely',
      'It turns into additional orbital electrons',
      'It gets stored inside neutrons as gravitational potential energy',
    ],
    correctIndex: 0,
    explanation: 'By Einstein mass-energy equivalence E = Delta m x c^2, the mass shortfall is released as binding energy (usually gamma photons). Mass-energy is strictly conserved.',
    hints: [
      'Mass and energy are interchangeable manifestations of the same entity.',
      'When attractive nuclear forces bind nucleons, work is released as radiation.',
      'Mass-energy is conserved: mass becomes binding energy.',
    ],
    misconceptionIndex: 4,
  },
  // FOUNDATION 7
  {
    id: 'ch_phy_07',
    nodeId: NODE_C12_PHY_107,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On the binding energy per nucleon (BE/A) curve, which nucleus sits at the highest peak (~8.8 MeV/nucleon), representing maximum stability?',
    options: ['Iron-56 (56_26 Fe)', 'Helium-4 (4_2 He)', 'Uranium-235 (235_92 U)', 'Carbon-12 (12_6 C)'],
    correctIndex: 0,
    explanation: 'Iron-56 (56 Fe) sits at the peak of the BE/A curve with ~8.75 to 8.8 MeV per nucleon. It is the most tightly bound and stable nucleus known.',
    hints: [
      'Look at the middle-mass region around A = 56.',
      'Heavy stars end their fusion cycles when the core turns into this metallic element.',
      'The element is Iron (Fe).',
    ],
  },

  // STANDARD 1
  {
    id: 'ch_phy_08',
    nodeId: NODE_C12_PHY_101,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the wavelength (in nm) of the H-alpha line in hydrogen for transition from n = 3 to n = 2. (Use hc = 1240 eV.nm; E_3 = -1.51 eV, E_2 = -3.40 eV)',
    correctAnswer: 656,
    tolerance: 3,
    unit: 'nm',
    explanation: 'Delta E = E_3 - E_2 = -1.51 - (-3.40) = +1.89 eV. Wavelength lambda = hc / Delta E = 1240 / 1.89 ~= 656 nm (red visible light).',
    hints: [
      'Calculate photon energy: Delta E = E_initial - E_final = (-1.51) - (-3.40) eV.',
      'Delta E = 1.89 eV.',
      'Use lambda = 1240 / 1.89 nm.',
    ],
  },
  // STANDARD 2
  {
    id: 'ch_phy_09',
    nodeId: NODE_C12_PHY_102,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the steps required to compute the wavelength of an emitted photon from the Rydberg formula: 1/lambda = R (1/n_1^2 - 1/n_2^2).',
    sortItems: [
      'Identify lower level n_1 and higher level n_2 (n_2 > n_1)',
      'Compute the bracket fraction: (1/n_1^2 - 1/n_2^2)',
      'Multiply bracket fraction by Rydberg constant R (1.097 x 10^7 m^-1) to get wave number 1/lambda',
      'Take the reciprocal of wave number to find lambda in metres, then multiply by 10^9 to get nm',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Evaluating Rydberg transitions requires: (1) finding quantum indices, (2) computing bracket difference of inverse squares, (3) multiplying by R to find wave number, and (4) inverting to get wavelength in nm.',
    hints: [
      'First establish quantum numbers n_1 and n_2.',
      'Then evaluate the mathematical bracket before multiplying by constant R.',
      'Remember that the Rydberg formula gives 1/lambda (wave number), so you must take the reciprocal at the end.',
    ],
  },
  // STANDARD 3
  {
    id: 'ch_phy_10',
    nodeId: NODE_C12_PHY_108,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A heavy nucleus of mass number A = 240 with BE/A = 7.6 MeV/nucleon splits into two equal fragments of A = 120 each with BE/A = 8.5 MeV/nucleon. What is the total energy Q released in MeV?',
    correctAnswer: 216,
    tolerance: 4,
    unit: 'MeV',
    explanation: 'Gain in BE per nucleon = 8.5 - 7.6 = 0.9 MeV/nucleon. For 240 nucleons: Q = 240 x 0.9 = 216 MeV (~200 MeV).',
    hints: [
      'Shortcut: Q = (BE/A_products - BE/A_reactant) x total nucleons.',
      'Gain per nucleon = 8.5 - 7.6 = 0.9 MeV.',
      'Total Q = 240 x 0.9 = 216 MeV.',
    ],
  },
  // STANDARD 4
  {
    id: 'ch_phy_11',
    nodeId: NODE_C12_PHY_108,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the correct balanced nuclear fission equation for Uranium-235 induced by a thermal neutron.',
    availableParts: ['235_92 U + 1_0 n', '->', '141_56 Ba + 92_36 Kr', '+ 3 1_0 n', '+ Q (200 MeV)'],
    targetState: '235_92 U + 1_0 n -> 141_56 Ba + 92_36 Kr + 3 1_0 n + Q (200 MeV)',
    validationHint: 'Check that mass numbers (235+1 = 141+92+3 = 236) and atomic numbers (92+0 = 56+36+0 = 92) balance.',
    explanation: 'The balanced equation 235_92 U + 1_0 n -> 141_56 Ba + 92_36 Kr + 3 1_0 n + Q conserves both total nucleon count A (236) and charge Z (92).',
    hints: [
      'Reactants: Uranium-235 plus one incoming neutron.',
      'Products: Barium-141 and Krypton-92 fragments.',
      'Three secondary neutrons and ~200 MeV of energy are released.',
    ],
  },
  // STANDARD 5
  {
    id: 'ch_phy_12',
    nodeId: NODE_C12_PHY_109,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What are the distinct physical roles of the MODERATOR vs CONTROL RODS in a thermal nuclear reactor like Kakrapar Atomic Power Station?',
    options: [
      'Moderator slows fast neutrons down to ~0.025 eV; Control rods absorb excess neutrons to keep k = 1',
      'Moderator absorbs neutrons to shut down reactor; Control rods heat up the coolant',
      'Moderator accelerates neutrons; Control rods slow down the turbines',
      'Both components absorb neutrons equally to prevent explosions',
    ],
    correctIndex: 0,
    explanation: 'The moderator (heavy water/graphite) elastically slows 2 MeV fission neutrons to 0.025 eV thermal energies so U-235 can capture them. Control rods (cadmium/boron) absorb neutrons to maintain criticality k = 1.',
    hints: [
      'Do not confuse slowing down with absorbing!',
      'Heavy water or graphite slows neutrons without absorbing them.',
      'Cadmium and Boron have huge absorption cross-sections to regulate reactor power.',
    ],
    misconceptionIndex: 5,
  },
  // STANDARD 6
  {
    id: 'ch_phy_13',
    nodeId: NODE_C12_PHY_110,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In deuterium-tritium fusion (2_1 H + 3_1 H -> 4_2 He + 1_0 n), reactant mass is 5.03015 u and product mass is 5.01127 u. Calculate Q in MeV using 1 u = 931.5 MeV.',
    correctAnswer: 17.59,
    tolerance: 0.2,
    unit: 'MeV',
    explanation: 'Mass defect Delta m = 5.03015 - 5.01127 = 0.01888 u. Energy Q = 0.01888 u x 931.5 MeV/u = 17.587 MeV ~= 17.6 MeV.',
    hints: [
      'Find mass defect: Delta m = Mass(reactants) - Mass(products).',
      'Delta m = 5.03015 - 5.01127 = 0.01888 u.',
      'Multiply Delta m by 931.5 MeV/u.',
    ],
  },
  // STANDARD 7
  {
    id: 'ch_phy_14',
    nodeId: NODE_C12_PHY_105,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In pair production (gamma -> e- + e+), why is the reaction strictly forbidden in empty vacuum, requiring the presence of a heavy atomic nucleus?',
    options: [
      'A nucleus is required to absorb recoil momentum and satisfy simultaneous conservation of momentum and energy',
      'The nucleus must supply electric charge to the positron',
      'Empty vacuum has zero temperature so photons cannot split',
      'Electrons cannot exist without protons nearby',
    ],
    correctIndex: 0,
    explanation: 'A single photon carries momentum p = E/c. In the center-of-mass frame of the e-e+ pair at rest, net momentum is zero. A single photon cannot conserve both energy and momentum without a recoil nucleus absorbing excess momentum.',
    hints: [
      'Consider momentum conservation alongside energy conservation.',
      'A single photon has non-zero momentum, but pair at threshold has zero momentum in its rest frame.',
      'The heavy nucleus absorbs recoil momentum while taking negligible energy.',
    ],
    misconceptionIndex: 6,
  },

  // ADVANCED 1
  {
    id: 'ch_phy_15',
    nodeId: NODE_C12_PHY_107,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "Because Uranium-238 has a total binding energy of ~1800 MeV while Iron-56 has only ~490 MeV, Uranium-238 is a much more stable nucleus." Evaluate this statement with physics principles.',
    options: [
      'The claim is FALSE: Nuclear stability is determined solely by binding energy per nucleon (BE/A), which is ~8.8 MeV for Fe-56 vs ~7.6 MeV for U-238',
      'The claim is TRUE: Total binding energy is the only true measure of nuclear cohesion',
      'The claim is TRUE: Uranium resists fission better than Iron resists fusion',
      'The claim is FALSE: Both nuclei have identical stability because they are both heavy',
    ],
    correctIndex: 0,
    explanation: 'Total binding energy is an extensive property that scales with nucleon count A. Stability is an intensive property measured by BE/A (how tightly each individual nucleon is bound). Iron-56 requires more energy per nucleon to disassemble than U-238.',
    hints: [
      'Distinguish extensive quantities (total BE) from intensive quantities (BE/A).',
      'More nucleons naturally add more total binding, but each nucleon in U-238 is held less tightly.',
      'Iron-56 sits at the peak of BE/A and is far more stable.',
    ],
  },
  // ADVANCED 2
  {
    id: 'ch_phy_16',
    nodeId: NODE_C12_PHY_101,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Calculate the orbital speed v_1 of an electron in the ground state (n=1) of a hydrogen atom in units of 10^6 m/s. (Given v_n = 2.18 x 10^6 / n m/s)',
    correctAnswer: 2.18,
    tolerance: 0.05,
    unit: 'x 10^6 m/s',
    explanation: 'v_1 = (2.18 x 10^6) / 1 = 2.18 x 10^6 m/s. Notice this is approximately c / 137, where 1/137 is the fine-structure constant.',
    hints: [
      'Substitute n = 1 into the orbital velocity equation v_n = 2.18 x 10^6 / n m/s.',
      'The answer is 2.18 x 10^6 m/s.',
      'Enter 2.18.',
    ],
  },
  // ADVANCED 3
  {
    id: 'ch_phy_17',
    nodeId: NODE_C12_PHY_110,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The Sun core temperature is ~1.5 x 10^7 K (kT ~ 1.3 keV), whereas the Coulomb repulsion barrier between two protons is ~500 keV. Why does the Sun fuse steadily for 10 billion years rather than failing or exploding?',
    options: [
      'Quantum mechanical tunneling through the barrier combined with Maxwell-Boltzmann tail and slow weak-force proton-to-neutron conversion regulates the fusion rate',
      'The Sun contains massive control rods made of cosmic boron',
      'Protons lose their positive charge inside high-density plasma',
      'Gravitational contraction eliminates all electrostatic forces',
    ],
    correctIndex: 0,
    explanation: 'Proton-proton fusion in stars relies on quantum tunneling through the 500 keV barrier by protons in the Maxwellian energy tail. The bottleneck step p + p -> d + e+ + nu_e requires weak interaction (converting a proton to a neutron), keeping the solar furnace extraordinarily steady over billions of years.',
    hints: [
      'Particles with wave-like nature can tunnel through barriers even when kinetic energy is below peak.',
      'The weak interaction step converting a proton to a neutron is very slow and acts as a cosmic regulator.',
      'Quantum tunneling and weak interaction together ensure a steady, non-explosive burn.',
    ],
  },
  // ADVANCED 4
  {
    id: 'ch_phy_18',
    nodeId: NODE_C12_PHY_109,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In an operating nuclear reactor at Kalpakkam, the multiplication factor suddenly drifts to k = 1.002. What physical consequence occurs if control rods are not adjusted?',
    options: [
      'Neutron population and thermal power output grow exponentially generation by generation',
      'The reactor immediately undergoes a chemical explosion of graphite within 1 millisecond',
      'The fission reaction stops immediately because k is not equal to 1',
      'The binding energy per nucleon drops to zero',
    ],
    correctIndex: 0,
    explanation: 'When k > 1 (supercritical), each generation produces more neutrons than the previous (N_gen = N_0 * k^g). Power increases exponentially. Operators adjust control rods to restore k = 1.000 (criticality) at the desired higher power level.',
    hints: [
      'k represents the ratio of neutrons in successive generations.',
      'When k > 1, the geometric progression multiplies the neutron population.',
      'Exponential growth in power occurs until control rods absorb excess neutrons.',
    ],
  },
  // ADVANCED 5
  {
    id: 'ch_phy_19',
    nodeId: NODE_C12_PHY_104,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why is the nuclear density (rho ~ 2.3 x 10^17 kg/m^3) virtually constant across all stable nuclei from Carbon-12 to Uranium-238?',
    options: [
      'Nuclear mass is proportional to A, and nuclear volume is proportional to R^3 ~ (A^(1/3))^3 ~ A, so mass/volume is independent of A',
      'All nuclei contain the exact same number of total protons and electrons',
      'The electrostatic repulsion compresses heavy nuclei to exactly match light nuclei',
      'Quarks inside nucleons expand to fill any available volume',
    ],
    correctIndex: 0,
    explanation: 'Since R = r_0 A^(1/3), volume V = (4/3)pi R^3 = (4/3)pi r_0^3 A proportional to A. Since nuclear mass M ~= A * m_u is also proportional to A, the density rho = M / V is constant (~2.3 x 10^17 kg/m^3), resembling an incompressible nuclear fluid.',
    hints: [
      'Look at the nuclear radius formula: R = r_0 A^(1/3).',
      'Cube the radius to see how volume scales with mass number A.',
      'Notice that A in mass cancels A in volume.',
    ],
  },
  // ADVANCED 6
  {
    id: 'ch_phy_20',
    nodeId: NODE_C12_PHY_106,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'For Helium-4 (4_2 He), mass of 2 protons + 2 neutrons = 4.03190 u and actual alpha nucleus mass is 4.00151 u. Compute binding energy per nucleon in MeV. (Use 1 u = 931.5 MeV)',
    correctAnswer: 7.07,
    tolerance: 0.1,
    unit: 'MeV/nucleon',
    explanation: 'Delta m = 4.03190 - 4.00151 = 0.03039 u. Total BE = 0.03039 x 931.5 = 28.308 MeV. BE/A = 28.308 / 4 = 7.077 MeV/nucleon.',
    hints: [
      'Step 1: Delta m = 4.03190 - 4.00151 = 0.03039 u.',
      'Step 2: Total BE = 0.03039 x 931.5 = 28.31 MeV.',
      'Step 3: Divide total BE by A = 4 nucleons.',
    ],
  },
  // ADVANCED 7
  {
    id: 'ch_phy_21',
    nodeId: NODE_C12_PHY_110,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is Deuterium-Tritium (D-T) fusion preferred over Proton-Proton (p-p) fusion for experimental terrestrial magnetic-confinement reactors like ITER?',
    options: [
      'D-T reaction has a much higher cross-section at achievable temperatures (~10^8 K) and does not rely on the slow weak-interaction bottleneck',
      'Protons cannot be ionized inside magnetic fields',
      'Tritium is naturally abundant in ordinary seawater without breeding',
      'D-T fusion produces zero radioactive neutrons',
    ],
    correctIndex: 0,
    explanation: 'D-T fusion involves the strong nuclear interaction directly between nucleons already containing neutrons, yielding a massive cross-section at ~10-15 keV. Proton-proton fusion in the Sun requires weak-force beta conversion (p -> n + e+ + nu), which has a cross-section 10^24 times smaller!',
    hints: [
      'Remember why the Sun burns slowly: p-p fusion requires converting a proton into a neutron.',
      'D and T already have neutrons, so fusion occurs purely via the fast strong force.',
      'D-T gives high reaction rates at laboratory-attainable plasma temperatures.',
    ],
  },
  // ADVANCED 8
  {
    id: 'ch_phy_22',
    nodeId: NODE_C12_PHY_103,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using R = r_0 A^(1/3) with r_0 = 1.2 fm, calculate the nuclear radius of Gold-197 (A = 197) in fermis (fm). (Given 197^(1/3) ~= 5.82)',
    correctAnswer: 6.98,
    tolerance: 0.1,
    unit: 'fm',
    explanation: 'R = 1.2 fm x 197^(1/3) = 1.2 x 5.8186 ~= 6.98 fm (~7.0 x 10^-15 m).',
    hints: [
      'Formula: R = 1.2 x A^(1/3) fm.',
      'Substitute A^(1/3) = 5.82.',
      '1.2 x 5.82 = 6.984 fm.',
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_101,
  title: 'Quantum Energy Levels & Nuclear Stability Simulation',
  definition:
    'Bohr atomic model quantises electron orbits such that En = -13.6/n^2 eV, giving rise to the discrete hydrogen emission spectrum governed by the Rydberg formula. Inside the dense nucleus, mass defect Delta m transforms into nuclear binding energy (E = Delta m c^2), with the BE per nucleon curve peaking at Iron-56 explaining why fission of heavy nuclei and fusion of light nuclei are exothermic.',
  eli5:
    'Think of the atom as an energy ladder where electrons hop down rungs to shoot out coloured photons. Inside the nucleus, protons and neutrons pack tightly like magnets; the tiny lost mass becomes the super-strong glue holding them together, powering both reactors and the Sun!',
  misconceptions: [
    {
      misconception: 'The total energy of an orbiting electron is positive because it has kinetic velocity.',
      correction: 'Total energy is E = K + U = (+13.6/n^2) + (-27.2/n^2) = -13.6/n^2 eV. Negative potential energy dominates, proving the electron is bound.',
    },
    {
      misconception: 'All spectral lines of hydrogen lie in the visible rainbow spectrum.',
      correction: 'Only the Balmer series (ending at n=2) is visible. Lyman is ultraviolet, and Paschen, Brackett, and Pfund are infrared.',
    },
    {
      misconception: 'Adding a neutron changes the chemical element.',
      correction: 'Chemical element identity is governed by proton number Z alone. Changing neutron number N creates isotopes of the same element.',
    },
    {
      misconception: 'Isotopes have different chemical bonding properties because their atomic weights differ.',
      correction: 'Chemical properties depend strictly on electron arrangement (Z). Isotopes share identical chemistry and only differ in mass-dependent physical properties.',
    },
    {
      misconception: 'Mass defect means mass is completely destroyed and lost from existence.',
      correction: 'Mass is converted into binding energy via E = mc^2. Total mass-energy is strictly conserved.',
    },
    {
      misconception: 'The moderator in a nuclear reactor absorbs neutrons to slow down power.',
      correction: 'The moderator slows fast neutrons to thermal speeds without absorbing them. Control rods absorb neutrons.',
    },
    {
      misconception: 'In pair production, a high-energy photon can spontaneously split into an electron-positron pair in pure vacuum.',
      correction: 'A nearby heavy nucleus is mandatory to absorb recoil momentum, satisfying both conservation of energy and momentum.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the binding energy of the electron in the first excited state (n = 2) of hydrogen?',
      options: ['13.6 eV', '3.4 eV', '1.51 eV', '0.85 eV'],
      correctIndex: 1,
    },
    {
      question: 'Which spectral series of hydrogen atom falls in the ultraviolet region of the EM spectrum?',
      options: ['Balmer', 'Paschen', 'Lyman', 'Brackett'],
      correctIndex: 2,
    },
    {
      question: 'What is the energy equivalent of 1 unified atomic mass unit (1 u)?',
      options: ['931.5 MeV', '0.511 MeV', '1.6 x 10^-19 J', '200 MeV'],
      correctIndex: 0,
    },
    {
      question: 'Why is Iron-56 (56 Fe) considered the most stable nucleus in astrophysics?',
      options: ['It has highest total mass', 'It has highest binding energy per nucleon (~8.8 MeV)', 'It contains zero neutrons', 'It cannot be melted in stars'],
      correctIndex: 1,
    },
    {
      question: 'How much energy is typically released in a single thermal fission of Uranium-235?',
      options: ['17.6 MeV', '26.7 MeV', '200 MeV', '10.2 eV'],
      correctIndex: 2,
    },
    {
      question: 'What multiplication factor k signifies a critical, steady-state nuclear reactor?',
      options: ['k = 0', 'k < 1', 'k = 1.000', 'k > 1'],
      correctIndex: 2,
    },
    {
      question: 'What primary thermonuclear reaction cycle powers the Sun core (~1.5 x 10^7 K)?',
      options: ['Uranium fission', 'Proton-Proton (p-p) chain fusion', 'Carbon burning', 'Helium flash'],
      correctIndex: 1,
    },
    {
      question: 'How does nuclear radius R scale with mass number A?',
      options: ['R proportional to A', 'R proportional to A^2', 'R proportional to A^(1/3)', 'R is constant for all nuclei'],
      correctIndex: 2,
    },
  ],
  masteryCriteria: 'Mastery is achieved by calculating quantum transitions, deriving binding energies, and analyzing nuclear fission/fusion dynamics with >= 85% score.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Quantum Ladder: Bohr Hydrogen Orbits',
    instruction: 'Adjust the Principal Quantum Number (n) slider or click energy rungs to watch the orbit radius r_n = 0.529 n^2 A and electron speed v_n update in real-time.',
    interactionType: 'slider-quantum',
    nodeId: NODE_C12_PHY_101,
  },
  {
    title: '2. Spectral Emission & Rydberg Photon Simulator',
    instruction: 'Select an initial level (n_initial) and a final level (n_final). Watch the electron jump downward, radiating a photon with calculated Delta E, wavelength lambda, and spectral colour.',
    interactionType: 'quantum-jump',
    nodeId: NODE_C12_PHY_102,
  },
  {
    title: '3. Mass Defect & E = mc^2 Nucleus Builder',
    instruction: 'Select a nucleus (Deuteron, Helium-4, Carbon-12, Iron-56, Uranium-238). Observe the difference between separated nucleon masses and assembled mass to compute Delta m and BE.',
    interactionType: 'mass-defect',
    nodeId: NODE_C12_PHY_106,
  },
  {
    title: '4. The Binding Energy Valley of Stability',
    instruction: 'Drag the Mass Number (A) slider along the BE/A stability curve. Discover why fusing light nuclei (left) and splitting heavy nuclei (right) both roll toward Iron-56 releasing energy.',
    interactionType: 'binding-curve',
    nodeId: NODE_C12_PHY_107,
  },
  {
    title: '5. Reactor Criticality & Chain Reaction Simulator',
    instruction: 'Adjust control rod insertion depth to balance the neutron multiplication factor k. Maintain k = 1.000 for steady nuclear power generation without subcritical shutdown or runaway.',
    interactionType: 'reactor-control',
    nodeId: NODE_C12_PHY_109,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an electron drops from n = 3 to n = 2 in hydrogen, what colour photon will be emitted?',
    options: ['Red visible light (~656 nm)', 'Ultraviolet (~122 nm)', 'Infrared (~1875 nm)', 'Gamma ray (<0.01 nm)'],
    correctIndex: 0,
    verifyInstruction: 'Set n_initial = 3 and n_final = 2 in the simulator below to confirm the Balmer H-alpha red photon!',
    nodeId: NODE_C12_PHY_102,
  },
  {
    question: 'Predict: When Uranium-235 (BE/A ~7.6 MeV) undergoes thermal fission into two fragments (BE/A ~8.5 MeV), what happens to the total binding energy?',
    options: [
      'Total binding energy increases by ~200 MeV, releasing that excess as heat and kinetic energy',
      'Total binding energy decreases to zero because the nucleus broke',
      'Binding energy is unchanged because nucleon count is conserved',
      'All protons convert into electrons',
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the mass number slider to A=240 on the binding energy curve to see the upward step of 0.9 MeV/nucleon!',
    nodeId: NODE_C12_PHY_108,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'As quantum number n increases from 1 to 5, what happens to the spacing between adjacent energy levels (Delta E = E_(n+1) - E_n)?',
    observableOptions: [
      'The spacing shrinks dramatically (10.2 eV between 1->2, but only 0.66 eV between 3->4)',
      'The spacing remains completely constant like rungs on a wooden ladder',
      'The spacing expands infinitely',
      'The energy levels become negative infinity',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_101,
  },
  {
    question: 'On the BE/A versus A graph, what happens to the curve past the Iron-56 peak (A > 56) towards Uranium (A = 238)?',
    observableOptions: [
      'The curve gradually declines from ~8.8 MeV down to ~7.6 MeV due to cumulative proton Coulomb repulsion',
      'The curve shoots vertically upward to 100 MeV',
      'The curve oscillates between positive and negative values',
      'The curve drops instantly to zero at Lead',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_107,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Astrophysics Field Mission: Stellar Energy & BARC Reactor Diagnostics',
  description:
    'Apply your Class 12 nuclear physics mastery to evaluate real-world Indian energy installations and solar observatory data.',
  steps: [
    '1. Calculate the daily mass consumption of the Sun radiating 3.8 x 10^26 W via E = mc^2 (approx 4.2 million tonnes of mass converted per second).',
    '2. Compare the fuel efficiency: burning 1 kg of coal yields ~3 x 10^7 J, whereas fissioning 1 kg of U-235 yields ~8.2 x 10^13 J (nearly 3 million times more!).',
    '3. Cite Indian nuclear reactors (Tarapur, Kakrapar, Kalpakkam, Kudankulam) and identify how pressurized heavy water (PHWR) uses D2O as both moderator and coolant.',
    '4. Verify the Balmer emission spectrum in the laboratory using a hydrogen discharge lamp and a transmission diffraction spectrometer.',
  ],
};

// ─── COMPONENT IMPLEMENTATION ───
function C12_PhysicsEnergyLevelsHydrogenSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_101,
  title = DEFAULT_PROPS.title || 'Quantum Energy Levels & Nuclear Stability',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'cyan' };

  // ─── STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Quantum slider states
  const [quantumN, setQuantumN] = useState<number>(1);
  const [nInitial, setNInitial] = useState<number>(3);
  const [nFinal, setNFinal] = useState<number>(2);
  const [photonEmitted, setPhotonEmitted] = useState<boolean>(false);
  const [photonWavelength, setPhotonWavelength] = useState<number>(656);
  const [photonEnergyEV, setPhotonEnergyEV] = useState<number>(1.89);

  // Nuclear builder states
  const [selectedNucleusKey, setSelectedNucleusKey] = useState<'H2' | 'He4' | 'C12' | 'Fe56' | 'U238'>('He4');

  // Binding energy curve state
  const [sliderMassA, setSliderMassA] = useState<number>(56);

  // Reactor simulator state
  const [controlRodDepth, setControlRodDepth] = useState<number>(50);
  const [reactorPowerMW, setReactorPowerMW] = useState<number>(1000);
  const [multiplicationK, setMultiplicationK] = useState<number>(1.0);
  const [moderatorType, setModeratorType] = useState<'D2O' | 'Graphite' | 'None'>('D2O');

  // Reflection questions responses
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Predict states
  const [predictionMade, setPredictionMade] = useState(false);

  // Hint & challenge states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge interactive inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [lastSelectedOption, setLastSelectedOption] = useState<number | null>(null);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Misconception & feedback states
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reactorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── CALCULATED QUANTUM VALUES ───
  const currentLevelEnergy = useMemo(() => {
    return Number((-13.6 / (quantumN * quantumN)).toFixed(2));
  }, [quantumN]);

  const currentLevelRadius = useMemo(() => {
    return Number((0.529 * quantumN * quantumN).toFixed(3));
  }, [quantumN]);

  const currentLevelVelocity = useMemo(() => {
    return Number((2.18 / quantumN).toFixed(2));
  }, [quantumN]);

  // ─── CALCULATED BINDING ENERGY OF SELECTED NUCLEUS ───
  const nucleusData = useMemo(() => {
    const db: Record<string, { name: string; symbol: string; Z: number; N: number; massActual: number }> = {
      H2: { name: 'Deuterium', symbol: '2_1 H', Z: 1, N: 1, massActual: 2.014102 },
      He4: { name: 'Helium-4', symbol: '4_2 He', Z: 2, N: 2, massActual: 4.001506 },
      C12: { name: 'Carbon-12', symbol: '12_6 C', Z: 6, N: 6, massActual: 11.996708 },
      Fe56: { name: 'Iron-56', symbol: '56_26 Fe', Z: 26, N: 30, massActual: 55.92067 },
      U238: { name: 'Uranium-238', symbol: '238_92 U', Z: 92, N: 146, massActual: 238.0003 },
    };
    const sel = db[selectedNucleusKey];
    const mp = 1.007276;
    const mn = 1.008665;
    const massConstituents = sel.Z * mp + sel.N * mn;
    const deltaM = Math.max(0, massConstituents - sel.massActual);
    const totalBE = deltaM * 931.5;
    const bePerNucleon = totalBE / (sel.Z + sel.N);
    return {
      ...sel,
      A: sel.Z + sel.N,
      massConstituents: Number(massConstituents.toFixed(5)),
      deltaM: Number(deltaM.toFixed(5)),
      totalBE: Number(totalBE.toFixed(2)),
      bePerNucleon: Number(bePerNucleon.toFixed(2)),
    };
  }, [selectedNucleusKey]);

  // ─── BINDING ENERGY CURVE FUNCTION ───
  const getCurveBEPerA = useCallback((A: number) => {
    if (A <= 1) return 0;
    if (A === 2) return 1.11;
    if (A === 3) return 2.83;
    if (A === 4) return 7.07;
    const be = 8.8 * (1 - Math.exp(-A / 8)) - 0.005 * Math.max(0, A - 56);
    return Math.max(0, Number(be.toFixed(2)));
  }, []);

  const currentSliderBEA = useMemo(() => {
    return getCurveBEPerA(sliderMassA);
  }, [sliderMassA, getCurveBEPerA]);

  // ─── REACTOR SIMULATION UPDATE ───
  useEffect(() => {
    let k = 1.0 + (50 - controlRodDepth) * 0.0002;
    if (moderatorType === 'None') k -= 0.15;
    setMultiplicationK(Number(k.toFixed(4)));

    const interval = setInterval(() => {
      setReactorPowerMW((prev) => {
        if (k === 1.0) return prev;
        const delta = (k - 1.0) * prev * 0.1;
        const next = Math.max(0, Math.min(3000, prev + delta));
        return Number(next.toFixed(1));
      });
    }, 200);

    return () => clearInterval(interval);
  }, [controlRodDepth, moderatorType]);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    setLastSelectedOption(idx);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Excellent physical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Quantum & Nuclear Lab. Let us explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test all quantum and nuclear controls freely with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for ISC board-level challenges. Good luck!');
  }, []);

  const handleQuantumTransition = useCallback((nInit: number, nFin: number) => {
    if (nInit <= nFin) {
      audioManager.play('error');
      speechManager.speak('Emission requires falling from a higher orbit to a lower orbit!');
      return;
    }
    setNInitial(nInit);
    setNFinal(nFin);
    const eInit = -13.6 / (nInit * nInit);
    const eFin = -13.6 / (nFin * nFin);
    const dE = eInit - eFin;
    const waveNm = Math.round(1240 / dE);
    setPhotonEnergyEV(Number(dE.toFixed(2)));
    setPhotonWavelength(waveNm);
    setPhotonEmitted(true);
    audioManager.play('sparkle');
    speechManager.speak(`Transition from n=${nInit} to n=${nFin} emitted a ${dE.toFixed(2)} electron-volt photon at ${waveNm} nanometres.`);
    setTimeout(() => setPhotonEmitted(false), 2000);
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulator below to verify your answer.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      speechManager.speak('All hints exhausted. Let us analyze the step-by-step solution.');
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Phenomenal work! You have completed the modern and nuclear physics simulation.');
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
    setLastSelectedOption(null);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
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
        setLastSelectedOption(answer as number);
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
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
          speechManager.speak('Explanations unlocked. Let us review the concept.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      let arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── 2D CANVAS ANIMATION (Bohr Atom Orbit Electron) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw proton nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#fca5a5';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+1e', cx, cy);

      // Draw orbits n=1 to n=5
      for (let n = 1; n <= 5; n++) {
        const r = 24 + n * 24;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = n === quantumN ? '#38bdf8' : '#334155';
        ctx.lineWidth = n === quantumN ? 2.5 : 1;
        ctx.setLineDash(n === quantumN ? [] : [4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label orbit
        ctx.fillStyle = n === quantumN ? '#38bdf8' : '#64748b';
        ctx.font = '10px monospace';
        ctx.fillText(`n=${n}`, cx + r - 4, cy - 6);
      }

      // Draw orbiting electron on current quantumN orbit
      const activeRadius = 24 + quantumN * 24;
      const speed = 0.04 / Math.sqrt(quantumN);
      angle += speed;

      const ex = cx + activeRadius * Math.cos(angle);
      const ey = cy + activeRadius * Math.sin(angle);

      // Electron glow
      const grad = ctx.createRadialGradient(ex, ey, 2, ex, ey, 10);
      grad.addColorStop(0, '#60a5fa');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ex, ey, 10, 0, Math.PI * 2);
      ctx.fill();

      // Electron core
      ctx.beginPath();
      ctx.arc(ex, ey, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [quantumN]);

  // ─── 2D CANVAS ANIMATION (Reactor Core Fission Cascade) ───
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = reactorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; color: string; life: number }[] = [];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rodHeight = (controlRodDepth / 100) * (canvas.height - 40);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(40, 20, 20, rodHeight);
      ctx.fillRect(140, 20, 20, rodHeight);
      ctx.fillRect(240, 20, 20, rodHeight);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px monospace';
      ctx.fillText('Boron Rods', 40, 15);

      if (Math.random() < reactorPowerMW / 4000) {
        particles.push({
          x: Math.random() * canvas.width,
          y: 60 + Math.random() * (canvas.height - 80),
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          color: moderatorType === 'D2O' ? '#38bdf8' : '#f59e0b',
          life: 80,
        });
      }

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles.splice(idx, 1);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, controlRodDepth, reactorPowerMW, moderatorType]);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-cyan-950/60 rounded-2xl border border-cyan-700/50" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">ISC Class 12 Physics &bull; Unit 8: Atoms & Nuclei</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
            }`}
          >
            {difficulty} TIER
          </motion.span>
          <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
            Mastery: <strong className="text-cyan-300 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/50 shadow-inner">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span aria-hidden="true">⚡</span> Curiosity Hook &bull; Rapid Prediction
            </h3>
            <p className="text-sm text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : lastSelectedOption === i
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : 'bg-slate-800/60 text-slate-500 border border-slate-800'
                      : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:border-cyan-500 border border-slate-700'
                  }`}
                >
                  <div>
                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </div>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                  )}
                  {discoveryAnswered && lastSelectedOption === i && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-rose-400 font-bold ml-2">✗ Incorrect</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Outstanding intuition!' : '💡 ' + DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/40"
                >
                  Enter Interactive Labs &rarr;
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Guided Discovery) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'}`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* ─── INTERACTIVE LAB CONTAINER ─── */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[420px]">
            {/* SLIDE 0: BOHR ATOM ORBIT LAB */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <canvas ref={canvasRef} width={300} height={300} className="w-[280px] h-[280px]" aria-label="Bohr Hydrogen Atom Orbit Animation Canvas" />
                  <span className="text-xs text-slate-400 mt-1">Real-time electron velocity: {currentLevelVelocity} x 10^6 m/s</span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <label htmlFor="quantum-n-slider" className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                      Principal Quantum Number: n = {quantumN}
                    </label>
                    <input
                      id="quantum-n-slider"
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={quantumN}
                      aria-label="Adjust Principal Quantum Number n"
                      onChange={(e) => {
                        setQuantumN(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
                      <span>n=1 (Ground)</span>
                      <span>n=2</span>
                      <span>n=3</span>
                      <span>n=4</span>
                      <span>n=5</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Total Energy (En)</p>
                      <p className="text-base font-mono font-black text-cyan-400">{currentLevelEnergy} eV</p>
                      <span className="text-[9px] text-slate-500">-13.6/n^2</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Radius (rn)</p>
                      <p className="text-base font-mono font-black text-indigo-400">{currentLevelRadius} &Aring;</p>
                      <span className="text-[9px] text-slate-500">0.529 n^2</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Velocity (vn)</p>
                      <p className="text-base font-mono font-black text-emerald-400">{currentLevelVelocity}</p>
                      <span className="text-[9px] text-slate-500">x10^6 m/s</span>
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-800/40 text-xs text-cyan-200">
                    💡 <strong>Physical Insight:</strong> As n grows, orbit radius swells as <em>n^2</em>, while speed drops as <em>1/n</em>. Potential energy (-27.2/n^2 eV) is double the kinetic energy (+13.6/n^2 eV) in magnitude, ensuring the electron remains bound!
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 1: SPECTRAL EMISSION & RYDBERG LAB (Includes SVG Diagram 1: Quantum Energy Ladder) */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Choose Transition Rungs</h3>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label htmlFor="n-initial-select" className="text-xs text-slate-400 block mb-1">From (n_initial):</label>
                        <select
                          id="n-initial-select"
                          value={nInitial}
                          aria-label="Select Initial Energy Level"
                          onChange={(e) => setNInitial(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-sm"
                        >
                          {[5, 4, 3, 2].map((num) => (
                            <option key={num} value={num}>
                              n = {num} ({(-13.6 / (num * num)).toFixed(2)} eV)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label htmlFor="n-final-select" className="text-xs text-slate-400 block mb-1">To (n_final):</label>
                        <select
                          id="n-final-select"
                          value={nFinal}
                          aria-label="Select Final Energy Level"
                          onChange={(e) => setNFinal(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-sm"
                        >
                          {[1, 2, 3, 4].map((num) => (
                            <option key={num} value={num} disabled={num >= nInitial}>
                              n = {num} ({(-13.6 / (num * num)).toFixed(2)} eV)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuantumTransition(nInitial, nFinal)}
                      aria-label="Trigger Quantum Jump and Emit Photon"
                      className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold rounded-xl text-sm shadow-md"
                    >
                      ⚡ Trigger Quantum Jump &amp; Emit Photon
                    </motion.button>

                    {/* SVG DIAGRAM 1: Quantum Energy Level Ladder */}
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Topic SVG 1: Hydrogen Quantum Energy Levels</p>
                      <svg viewBox="0 0 320 120" className="w-full h-24" aria-label="Hydrogen Energy Ladder Diagram">
                        {/* Energy rungs */}
                        <line x1="40" y1="105" x2="280" y2="105" stroke="#ef4444" strokeWidth="2" />
                        <text x="35" y="108" fill="#ef4444" fontSize="8" textAnchor="end">n=1 (-13.6 eV)</text>

                        <line x1="40" y1="70" x2="280" y2="70" stroke="#38bdf8" strokeWidth="2" />
                        <text x="35" y="73" fill="#38bdf8" fontSize="8" textAnchor="end">n=2 (-3.40 eV)</text>

                        <line x1="40" y1="45" x2="280" y2="45" stroke="#818cf8" strokeWidth="1.5" />
                        <text x="35" y="48" fill="#818cf8" fontSize="8" textAnchor="end">n=3 (-1.51 eV)</text>

                        <line x1="40" y1="30" x2="280" y2="30" stroke="#a78bfa" strokeWidth="1.5" />
                        <text x="35" y="33" fill="#a78bfa" fontSize="8" textAnchor="end">n=4 (-0.85 eV)</text>

                        <line x1="40" y1="18" x2="280" y2="18" stroke="#cbd5e1" strokeWidth="1" />
                        <text x="35" y="21" fill="#cbd5e1" fontSize="8" textAnchor="end">n=5 (-0.54 eV)</text>

                        {/* Transition arrows */}
                        <line x1="120" y1="70" x2="120" y2="105" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
                        <text x="125" y="90" fill="#fbbf24" fontSize="7">Lyman &alpha; (121.6 nm)</text>

                        <line x1="200" y1="45" x2="200" y2="70" stroke="#f87171" strokeWidth="2" />
                        <text x="205" y="60" fill="#f87171" fontSize="7">Balmer H&alpha; (656 nm)</text>
                      </svg>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Rydberg Transition Result</p>
                    <div className="text-2xl font-black font-mono text-cyan-300">
                      &Delta;E = {photonEnergyEV} eV
                    </div>
                    <div className="text-sm text-slate-300 font-mono mt-1">
                      Wavelength: <strong className="text-amber-400">{photonWavelength} nm</strong>
                    </div>
                    <div className="mt-2 text-xs px-3 py-1 rounded-full font-bold bg-slate-900 border border-slate-700 text-slate-300">
                      Series: {nFinal === 1 ? 'Lyman (UV)' : nFinal === 2 ? 'Balmer (Visible)' : nFinal === 3 ? 'Paschen (IR)' : 'Brackett (Far-IR)'}
                    </div>

                    <AnimatePresence>
                      {photonEmitted && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                          style={{
                            backgroundColor:
                              photonWavelength > 700 ? '#ef4444' : photonWavelength > 600 ? '#f97316' : photonWavelength > 450 ? '#38bdf8' : '#a855f7',
                          }}
                        >
                          &sim;&sim;&sim; Emitted Wave Packet &sim;&sim;&sim;
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {!predictionMade && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-indigo-800/40">
                    <p className="text-xs font-bold text-indigo-300 uppercase mb-2">Predict Before Triggering:</p>
                    <p className="text-sm text-slate-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          aria-label={`Predict option ${i + 1}: ${opt}`}
                          className="text-left p-2 bg-slate-900 rounded-lg text-xs text-slate-300 hover:border-cyan-500 border border-slate-800"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SLIDE 2: MASS DEFECT & BINDING ENERGY BUILDER (Includes SVG Diagram 2: Mass Defect Balance) */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(['H2', 'He4', 'C12', 'Fe56', 'U238'] as const).map((key) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedNucleusKey(key);
                        audioManager.play('tap');
                      }}
                      aria-label={`Select nucleus ${key}`}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedNucleusKey === key
                          ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50 border border-cyan-400'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {key === 'H2' ? 'Deuterium (^2H)' : key === 'He4' ? 'Helium-4 (^4He)' : key === 'C12' ? 'Carbon-12 (^12C)' : key === 'Fe56' ? 'Iron-56 (^56Fe)' : 'Uranium-238 (^238U)'}
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Mass Accounting Box */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
                    <h3 className="text-xs font-bold uppercase text-slate-400">Nucleon Mass Accounting</h3>
                    <div className="text-xs space-y-1.5 font-mono text-slate-300">
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span>Protons (Z = {nucleusData.Z}) &times; 1.00728 u:</span>
                        <span className="text-cyan-300">{(nucleusData.Z * 1.007276).toFixed(5)} u</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span>Neutrons (N = {nucleusData.N}) &times; 1.00867 u:</span>
                        <span className="text-indigo-300">{(nucleusData.N * 1.008665).toFixed(5)} u</span>
                      </div>
                      <div className="flex justify-between font-bold text-amber-300 pt-1">
                        <span>Sum of Free Nucleons:</span>
                        <span>{nucleusData.massConstituents} u</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Actual Measured Nuclear Mass:</span>
                        <span className="text-emerald-400">{nucleusData.massActual} u</span>
                      </div>
                      <div className="flex justify-between font-black text-rose-400 text-sm pt-1 border-t border-slate-800">
                        <span>Mass Defect (&Delta;m):</span>
                        <span>{nucleusData.deltaM} u</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Energy Conversion Box + Topic SVG 2 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between items-center text-center">
                    <div className="w-full">
                      <p className="text-xs text-slate-400 uppercase font-bold">Einstein Equivalence (1 u = 931.5 MeV)</p>
                      <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                        BE = {nucleusData.totalBE} MeV
                      </div>
                      <div className="mt-2 p-2 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Binding Energy Per Nucleon (BE/A)</p>
                        <p className="text-lg font-black font-mono text-emerald-400">
                          {nucleusData.bePerNucleon} <span className="text-xs font-normal text-slate-400">MeV/nucleon</span>
                        </p>
                      </div>
                    </div>

                    {/* SVG DIAGRAM 2: Mass Defect Visual Balance */}
                    <div className="w-full mt-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Topic SVG 2: Mass Defect &Delta;m &rarr; Nuclear Binding Energy</p>
                      <svg viewBox="0 0 280 60" className="w-full h-14" aria-label="Mass Defect to Binding Energy Diagram">
                        <rect x="10" y="15" width="90" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="55" y="33" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">Free Nucleons</text>
                        <text x="55" y="42" fill="#94a3b8" fontSize="7" textAnchor="middle">{nucleusData.massConstituents} u</text>

                        <path d="M 105 30 L 135 30" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                        <polygon points="135,27 142,30 135,33" fill="#f59e0b" />
                        <text x="123" y="24" fill="#fbbf24" fontSize="7" textAnchor="middle">&Delta;m c&sup2;</text>

                        <rect x="145" y="15" width="125" height="30" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                        <text x="207" y="30" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Bound Nucleus + Q</text>
                        <text x="207" y="41" fill="#34d399" fontSize="7" textAnchor="middle">{nucleusData.totalBE} MeV Released</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3: BINDING ENERGY VALLEY OF STABILITY (Includes SVG Diagram 3: BE/A Curve) */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="mass-a-slider" className="text-xs font-bold text-slate-400 uppercase">
                      Select Mass Number (A): <strong className="text-cyan-400 font-mono text-base">{sliderMassA}</strong>
                    </label>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      BE/A = {currentSliderBEA} MeV/nucleon
                    </span>
                  </div>
                  <input
                    id="mass-a-slider"
                    type="range"
                    min={1}
                    max={240}
                    step={1}
                    value={sliderMassA}
                    aria-label="Adjust Mass Number A along Binding Energy Curve"
                    onChange={(e) => {
                      setSliderMassA(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>A=1 (H)</span>
                    <span>A=4 (He)</span>
                    <span className="text-amber-400 font-bold">A=56 (Fe Peak)</span>
                    <span>A=120 (Fragments)</span>
                    <span>A=238 (U)</span>
                  </div>
                </div>

                {/* SVG DIAGRAM 3: BE/A Stability Curve */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Topic SVG 3: Nuclear Stability Curve (Binding Energy per Nucleon vs Mass Number A)</p>
                  <svg viewBox="0 0 500 180" className="w-full h-44" aria-label="Binding Energy per Nucleon Curve">
                    <line x1="40" y1="20" x2="40" y2="150" stroke="#334155" strokeWidth="1.5" />
                    <line x1="40" y1="150" x2="480" y2="150" stroke="#334155" strokeWidth="1.5" />

                    <text x="35" y="25" textAnchor="end" fill="#94a3b8" fontSize="9">9 MeV</text>
                    <text x="35" y="85" textAnchor="end" fill="#94a3b8" fontSize="9">5 MeV</text>
                    <text x="35" y="150" textAnchor="end" fill="#94a3b8" fontSize="9">0</text>
                    <text x="480" y="165" textAnchor="end" fill="#94a3b8" fontSize="9">Mass Number (A)</text>

                    {/* Fusion Zone Annotation */}
                    <rect x="50" y="115" width="70" height="25" rx="4" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="85" y="130" fill="#38bdf8" fontSize="8" textAnchor="middle">Fusion Domain</text>

                    {/* Fission Zone Annotation */}
                    <rect x="360" y="65" width="100" height="25" rx="4" fill="#f43f5e" fillOpacity="0.1" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="410" y="80" fill="#f43f5e" fontSize="8" textAnchor="middle">Fission Domain</text>

                    {/* Smooth Curve Path */}
                    <path
                      d="M 40 150 Q 55 50 140 28 Q 250 32 460 52"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3"
                    />

                    {/* Peak Iron-56 */}
                    <circle cx="140" cy="28" r="5" fill="#f59e0b" />
                    <text x="140" y="20" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Fe-56 (8.8 MeV)</text>

                    {/* Current Slider Position Indicator */}
                    {(() => {
                      const posX = 40 + (sliderMassA / 240) * 420;
                      const posY = 150 - (currentSliderBEA / 9) * 130;
                      return (
                        <g>
                          <line x1={posX} y1={posY} x2={posX} y2="150" stroke="#a855f7" strokeDasharray="3,3" />
                          <circle cx={posX} cy={posY} r="6" fill="#ec4899" stroke="#ffffff" strokeWidth="1.5" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              </div>
            )}

            {/* SLIDE 4: REACTOR CRITICALITY SIMULATOR (Includes Canvas + Fission Architecture) */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <canvas ref={reactorCanvasRef} width={300} height={180} className="w-full h-44 rounded-lg bg-slate-900/60" aria-label="Nuclear Reactor Core Chain Reaction Canvas" />
                  <div className="flex items-center gap-4 mt-3 text-xs font-mono">
                    <span className="text-slate-400">Power: <strong className="text-cyan-300">{reactorPowerMW} MW</strong></span>
                    <span className="text-slate-400">k: <strong className={multiplicationK === 1 ? 'text-emerald-400' : multiplicationK > 1 ? 'text-rose-400' : 'text-amber-400'}>{multiplicationK}</strong></span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label htmlFor="control-rod-slider" className="text-xs text-slate-400 font-bold block mb-1">
                      Control Rod Insertion: {controlRodDepth}%
                    </label>
                    <input
                      id="control-rod-slider"
                      type="range"
                      min={0}
                      max={100}
                      value={controlRodDepth}
                      aria-label="Adjust Control Rod Insertion Depth"
                      onChange={(e) => {
                        setControlRodDepth(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                      <span>0% (Supercritical)</span>
                      <span className="text-emerald-400 font-bold">50% (k=1.000 Steady)</span>
                      <span>100% (Subcritical)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 font-bold block mb-1">Moderator Selection:</label>
                    <div className="flex gap-2">
                      {(['D2O', 'Graphite', 'None'] as const).map((m) => (
                        <motion.button
                          key={m}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setModeratorType(m);
                            audioManager.play('tap');
                          }}
                          aria-label={`Select moderator ${m}`}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${
                            moderatorType === m ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {m === 'D2O' ? 'Heavy Water (D2O)' : m}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── SLIDE NAVIGATION ─── */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous Lab Step"
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl"
            >
              &larr; Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                aria-label="Next Lab Step"
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-cyan-900/40"
              >
                Next Lab &rarr;
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Open Free Exploration Sandbox"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/40"
              >
                Free Exploration Sandbox &rarr;
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX FREE-PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-cyan-300">Physics Sandbox &bull; Free Play Mode</h2>
              <p className="text-xs text-slate-400">Freely manipulate quantum jumps and nuclear binding parameters without test pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start Graded Challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-bold rounded-xl shadow-lg"
            >
              Start Graded Challenges &rarr;
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase text-cyan-400">Atomic Energy Ladder</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuantumN(n)}
                    aria-label={`Select energy level n = ${n}`}
                    className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold ${
                      quantumN === n ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    n={n}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono space-y-1">
                <p>En = {currentLevelEnergy} eV</p>
                <p>rn = {currentLevelRadius} &Aring;</p>
                <p>vn = {currentLevelVelocity} &times; 10^6 m/s</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase text-emerald-400">Stability Curve Explorer</h3>
              <input
                type="range"
                min={1}
                max={240}
                value={sliderMassA}
                aria-label="Sandbox Mass Number A slider"
                onChange={(e) => setSliderMassA(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono space-y-1">
                <p>Mass Number A: {sliderMassA}</p>
                <p>BE/A: {currentSliderBEA} MeV/nucleon</p>
                <p>Estimated Total BE: {(sliderMassA * currentSliderBEA).toFixed(1)} MeV</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 uppercase font-bold border border-slate-700">
                {challenge.competencyLevel}
              </span>
            </div>
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300' : difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300' : 'bg-cyan-500/20 text-cyan-300'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className={`p-5 rounded-2xl transition-all duration-300 border ${
            wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900 border-slate-800'
          }`}>
            <h3 className="text-base font-semibold text-white leading-relaxed mb-4">
              {challenge.question}
            </h3>

            {/* MCQ Types with Framer Motion Shake Animation */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake && lastSelectedOption === i ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100 font-bold'
                        : showExplanation && lastSelectedOption === i && i !== challenge.correctIndex
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : 'bg-slate-950 text-slate-200 hover:bg-slate-800 hover:border-cyan-500 border border-slate-800'
                    }`}
                  >
                    <div>
                      <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + i)}.</span> {opt}
                    </div>
                    {showExplanation && i === challenge.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                    {showExplanation && lastSelectedOption === i && i !== challenge.correctIndex && (
                      <span className="text-rose-400 font-bold ml-2">✗ Incorrect</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Draggable spectral series label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {['target_n1', 'target_n2', 'target_n3', 'target_n4'].map((tid, idx) => (
                    <div
                      key={tid}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(tid)}
                      aria-label={`Drop target for Quantum Level n=${idx + 1}`}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[70px] flex flex-col justify-center"
                    >
                      <span className="text-[10px] text-slate-400 block font-mono">Quantum Level n={idx + 1}</span>
                      <span className="text-xs font-bold text-cyan-300 mt-1">
                        {droppedLabels[tid] ? `✓ ${droppedLabels[tid]}` : 'Drop Series Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Mappings"
                  className="px-6 py-2 bg-cyan-600 text-white font-bold rounded-xl text-sm"
                >
                  Verify Mappings &rarr;
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-2.5">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    draggable
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 rounded-xl text-xs font-medium text-slate-200 border border-slate-800 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Check Sequence"
                  className="mt-2 px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl text-sm"
                >
                  Check Sequence &rarr;
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  aria-label="Enter numeric calculated value"
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-cyan-400 outline-none w-48"
                />
                <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Submit numeric answer"
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold rounded-xl text-sm"
                >
                  Submit &rarr;
                </motion.button>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((p) => [...p, part])}
                      aria-label={`Add component ${part}`}
                      className="px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-cyan-900/60 border border-cyan-600 rounded-lg text-xs font-mono text-cyan-200 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((p) => p.filter((_, i) => i !== idx))}
                        aria-label={`Remove component ${part}`}
                        className="text-rose-400 hover:text-rose-200 font-bold"
                      >
                        &times;
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above to build your reaction...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Reaction"
                  className="px-6 py-2 bg-cyan-600 text-white font-bold rounded-xl text-sm"
                >
                  Verify Reaction &rarr;
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-slate-950 rounded-xl border border-cyan-800/50 space-y-3">
                <h4 className="text-xs font-bold uppercase text-cyan-300">Detailed Physical Solution</h4>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-cyan-400 font-mono">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      aria-label="Reveal Next Step"
                      className="px-4 py-1.5 bg-slate-800 text-cyan-300 text-xs font-bold rounded-lg border border-slate-700"
                    >
                      Reveal Next Step &rarr;
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge or finalize"
                      className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery &rarr;' : 'Next Challenge &rarr;'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700/60 text-center space-y-3">
            <span className="text-4xl" aria-hidden="true">🎓</span>

            {/* Motivational Feedback Banner based on error count */}
            <div className="py-2">
              <span className={`text-xl md:text-2xl font-black uppercase tracking-wide px-4 py-1.5 rounded-full border ${
                errors === 0
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : errors <= 3
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : errors <= 7
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/50'
              }`}>
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
              Simulation Completed with High Honors!
            </h2>
            <div className="flex justify-center gap-6 text-sm font-mono mt-2">
              <span className="text-slate-300">Final Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong></span>
              <span className="text-slate-300">Errors Recorded: <strong className="text-rose-400 text-lg">{errors}</strong></span>
              <span className="text-slate-300">Mastery Level: <strong className="text-cyan-300 text-lg capitalize">{masteryLevel}</strong></span>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Post-Simulation Deep Reflection
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses((prev) => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How Iron-56 is the cosmic tipping point between fission and fusion..."
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={(e) => setReflectionResponses((prev) => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., Quantum jumps are like hopping down ladder rungs where lower gaps release more punch..."
                  aria-label="Reflection: How would you explain this to a friend?"
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={(e) => setReflectionResponses((prev) => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., In nuclear power engineering at Kakrapar or analyzing solar observatory spectra..."
                  aria-label="Reflection: Where in real life might you use this?"
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconceptions Remediation */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-xs font-bold uppercase text-rose-300 tracking-wider">Targeted Misconception Diagnostics</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Board Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/40 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-amber-300 uppercase">Spaced Repetition Review Schedule</h4>
              <p className="text-xs text-slate-300">
                To cement long-term memory, return to this simulation in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </p>
            </div>
            <span className="text-2xl" aria-hidden="true">⏳</span>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span aria-hidden="true">🔭</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <p key={idx} className="text-xs text-slate-400 font-mono">
                  {step}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_PhysicsEnergyLevelsHydrogenSim };
export default C12_PhysicsEnergyLevelsHydrogenSim;