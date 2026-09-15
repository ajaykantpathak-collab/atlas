'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (c12_phy_cbse_001 to c12_phy_cbse_025) ───
const NODE_001 = 'c12_phy_cbse_001'; // Nuclear size & charge radius R = R0 A^(1/3)
const NODE_002 = 'c12_phy_cbse_002'; // Atomic mass unit (u) & mass equivalence
const NODE_003 = 'c12_phy_cbse_003'; // Mass defect (Δm)
const NODE_004 = 'c12_phy_cbse_004'; // Binding energy (Eb)
const NODE_005 = 'c12_phy_cbse_005'; // Binding energy per nucleon (Ebn)
const NODE_006 = 'c12_phy_cbse_006'; // Binding energy curve & peak stability (Fe-56)
const NODE_007 = 'c12_phy_cbse_007'; // Nuclear forces (Short-range, charge independent, saturation)
const NODE_008 = 'c12_phy_cbse_008'; // Nuclear density independence of mass number A
const NODE_009 = 'c12_phy_cbse_009'; // Radioactive decay law N(t) = N0 e^(-λt)
const NODE_010 = 'c12_phy_cbse_010'; // Activity A = λN and units (Bq, Ci)
const NODE_011 = 'c12_phy_cbse_011'; // Half-life T1/2 = ln(2)/λ
const NODE_012 = 'c12_phy_cbse_012'; // Mean life τ = 1/λ
const NODE_013 = 'c12_phy_cbse_013'; // Alpha decay dynamics & Q-value
const NODE_014 = 'c12_phy_cbse_014'; // Beta-minus decay (neutron -> proton + electron + antineutrino)
const NODE_015 = 'c12_phy_cbse_015'; // Beta-plus decay (proton -> neutron + positron + neutrino)
const NODE_016 = 'c12_phy_cbse_016'; // Neutrino hypothesis & continuous beta spectrum
const NODE_017 = 'c12_phy_cbse_017'; // Gamma decay & nuclear energy level transitions
const NODE_018 = 'c12_phy_cbse_018'; // Q-value calculations in nuclear reactions
const NODE_019 = 'c12_phy_cbse_019'; // Nuclear fission (U-235 neutron induced splitting)
const NODE_020 = 'c12_phy_cbse_020'; // Chain reaction & neutron multiplication factor k
const NODE_021 = 'c12_phy_cbse_021'; // Controlled fission & nuclear reactor components
const NODE_022 = 'c12_phy_cbse_022'; // Thermonuclear fusion (proton-proton chain in Sun)
const NODE_023 = 'c12_phy_cbse_023'; // Controlled fusion (Tokamak & Lawson criterion)
const NODE_024 = 'c12_phy_cbse_024'; // Pair production and pair annihilation
const NODE_025 = 'c12_phy_cbse_025'; // Practical applications: Radiocarbon dating & nuclear medicine

const ALL_NODE_IDS = [
  NODE_001, NODE_002, NODE_003, NODE_004, NODE_005,
  NODE_006, NODE_007, NODE_008, NODE_009, NODE_010,
  NODE_011, NODE_012, NODE_013, NODE_014, NODE_015,
  NODE_016, NODE_017, NODE_018, NODE_019, NODE_020,
  NODE_021, NODE_022, NODE_023, NODE_024, NODE_025,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The BARC Atomic Energy Research & Reactor Diagnostics',
  intro: 'Welcome to the Bhabha Atomic Research Centre (BARC) Advanced Simulator. You have been tasked with probing atomic nuclei, measuring binding energy profiles, regulating nuclear chain reactions in the Dhruva reactor, and tracking radioactive isotope decay rates.',
  context: 'Explore nuclear density, calculate mass defects, balance nuclear transmutations, prevent thermal runaways in fission cores, and simulate stellar fusion reactions inside our virtual particle tokamak laboratory.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you combine a light lithium nucleus (Li-6) and a deuterium nucleus (H-2) to form a helium-4 nucleus (He-4 + He-4), total nucleons (8) remain exactly the same. Where does the massive energy release come from?',
  options: [
    'Electrons in orbit drop to lower energy shells, emitting X-rays.',
    'The product helium nuclei have greater binding energy per nucleon; missing rest mass is converted into kinetic energy via E = Δm c².',
    'Protons destroy neutrons and release magnetic energy.',
    'The strong nuclear force vanishes, causing an electrostatic blast.',
  ],
  correctIndex: 1,
  hintAfter: 'Think about mass defect! Bound nucleons in tightly held nuclei like He-4 weigh LESS than when loosely bound in lighter nuclei.',
};

// ─── INTERFACES ───
interface TeachingSlide {
  id: string;
  title: string;
  subtitle: string;
  concept: string;
  formula?: string;
  explanation: string;
  keyTakeaway: string;
  visualType: 'radius_density' | 'binding_energy' | 'decay_law' | 'fission_reaction' | 'fusion_sun';
}

interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'numeric' | 'drag-sort' | 'distinguish' | 'balance-equation';
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctNumeric?: number;
  tolerance?: number;
  unit?: string;
  sortItems?: { id: string; text: string; val: number }[];
  equationParts?: { reactant1: string; reactant2: string; product1: string; product2Options: string[]; correctProduct2: string };
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface Misconception {
  id: string;
  title: string;
  misconception: string;
  reality: string;
  explanation: string;
}

// ─── TEACHING SLIDES DATA ───
const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_1',
    title: '1. Nuclear Composition & Constant Density',
    subtitle: 'Size of the Nucleus',
    concept: 'Nuclear Radius & Density',
    formula: 'R = R_0 A^{1/3} \\quad \\text{where } R_0 \\approx 1.2 \\text{ fm}, \\quad \\rho \\approx 2.3 \\times 10^{17} \\text{ kg/m}^3',
    explanation: 'The volume of a nucleus is directly proportional to its mass number A (total protons Z + neutrons N). Because mass is proportional to A and volume is proportional to A, the nuclear matter density ρ is CONSTANT for all nuclei regardless of their size!',
    keyTakeaway: 'Whether it is a light Helium nucleus or a heavy Uranium nucleus, nuclear matter has the exact same ultra-dense packed density of ~2.3 × 10¹⁷ kg/m³.',
    visualType: 'radius_density',
  },
  {
    id: 'slide_2',
    title: '2. Mass Defect & Binding Energy Curve',
    subtitle: 'The Glue of Matter',
    concept: 'Mass Defect Δm & Binding Energy E_bn',
    formula: '\\Delta m = [Z m_p + (A-Z) m_n] - M_{\\text{nucleus}}, \\quad E_b = \\Delta m \\cdot c^2 = \\Delta m \\times 931.5 \\text{ MeV}',
    explanation: 'The mass of a stable nucleus is ALWAYS LESS than the sum of the individual masses of its constituent protons and neutrons. This missing mass Δm is converted into binding energy Eb. The Binding Energy per Nucleon (Ebn = Eb/A) peaks at Fe-56 (~8.75 MeV/nucleon).',
    keyTakeaway: 'Nuclei with lower Ebn gain stability by either fusing together (light nuclei below A=56) or undergoing fission (heavy nuclei above A=56).',
    visualType: 'binding_energy',
  },
  {
    id: 'slide_3',
    title: '3. Radioactive Decay Law & Activity',
    subtitle: 'Spontaneous Disintegration',
    concept: 'Decay Law & Half-Life',
    formula: 'N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}, \\quad A(t) = \\lambda N(t)',
    explanation: 'Radioactivity is a purely random nuclear statistical process. The decay rate (Activity A) is proportional to the number of radioactive nuclei present. After 1 half-life T1/2, 50% of the sample decays. After 2 half-lives, 75% decays, leaving 25%.',
    keyTakeaway: 'Half-life depends purely on the decay constant λ of the nuclear species and is completely unaffected by temperature, pressure, or chemical bonds.',
    visualType: 'decay_law',
  },
  {
    id: 'slide_4',
    title: '4. Alpha, Beta & Gamma Transmutations',
    subtitle: 'Nuclear Radiation Mechanics',
    concept: 'Conservation Laws in Decay',
    formula: '\\alpha: \\, ^{A}_{Z}X \\rightarrow ^{A-4}_{Z-2}Y + ^{4}_{2}\\text{He}, \\quad \\beta^{-}: \\, n \\rightarrow p + e^{-} + \\bar{\\nu}_e',
    explanation: 'Alpha decay ejects a ⁴₂He nucleus to reduce massive electrostatic repulsion. Beta-minus decay converts a neutron into a proton, emitting an electron and an antineutrino to preserve lepton number and spin continuous spectrum. Gamma decay releases pure high-energy photons without changing Z or A.',
    keyTakeaway: 'In all nuclear decays, total electric charge Z, mass number A, linear momentum, angular momentum, and total energy are strictly conserved.',
    visualType: 'fission_reaction',
  },
  {
    id: 'slide_5',
    title: '5. Nuclear Fission & Thermonuclear Fusion',
    subtitle: 'Energy Generation Mechanisms',
    concept: 'Chain Reactions & Stellar Power',
    formula: '^{235}_{92}\\text{U} + ^{1}_{0}n \\rightarrow ^{141}_{56}\\text{Ba} + ^{92}_{36}\\text{Kr} + 3 ^{1}_{0}n + 200 \\text{ MeV}',
    explanation: 'Nuclear Fission splits heavy unstable nuclei into medium fragments, releasing ~200 MeV per event and extra neutrons. If neutron multiplication factor k = 1, a steady controlled nuclear reactor power output is maintained. Thermonuclear Fusion joins light nuclei (like Deuterium + Tritium) at extreme temperatures (~10⁷ K) in stars or Tokamaks.',
    keyTakeaway: 'Fusion yields significantly more energy PER UNIT MASS than fission and produces no long-lived high-level radioactive actinide waste.',
    visualType: 'fusion_sun',
  },
];

// ─── CHALLENGES DATA (8 Challenges) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    nodeId: NODE_008,
    type: 'classify',
    difficulty: 'foundation',
    question: 'How does the density of a Iron nucleus (A = 56) compare to the density of a Uranium nucleus (A = 238)?',
    options: [
      'Iron nucleus density is much greater because it sits at the peak of the binding energy curve.',
      'Uranium nucleus density is nearly 4 times larger because it has a higher mass number A.',
      'Both nuclei have identical nuclear density because density is independent of mass number A.',
      'Uranium nucleus is hollow, so its average density is much smaller than Iron.',
    ],
    correctIndex: 2,
    explanation: 'Since R = R0 A^(1/3), Volume V ∝ R³ ∝ A. Density ρ = Mass / Volume = (A · m_u) / (V0 · A) = m_u / V0, which is independent of A! All nuclei have ~2.3 × 10¹⁷ kg/m³.',
    hints: [
      'Look at the formula for nuclear radius: R = R0 A^(1/3).',
      'What happens when you calculate volume V = 4/3 π R³?',
      'Notice how mass A and volume A cancel out when taking density ρ = M/V.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_2',
    nodeId: NODE_003,
    type: 'numeric',
    difficulty: 'standard',
    question: 'Calculate the mass defect (Δm in atomic mass units u) for a Helium nucleus (⁴₂He) given: mass of proton m_p = 1.007276 u, mass of neutron m_n = 1.008665 u, measured mass of ⁴₂He nucleus M = 4.001506 u.',
    correctNumeric: 0.030376,
    tolerance: 0.001,
    unit: 'u',
    explanation: 'Δm = [2 · m_p + 2 · m_n] - M = [2(1.007276) + 2(1.008665)] - 4.001506 = [2.014552 + 2.017330] - 4.001506 = 4.031882 - 4.001506 = 0.030376 u.',
    hints: [
      'Helium-4 nucleus has Z = 2 protons and N = 2 neutrons.',
      'Calculate theoretical sum = 2 * mp + 2 * mn.',
      'Subtract actual nuclear mass M from total constituent mass.',
    ],
  },
  {
    id: 'ch_3',
    nodeId: NODE_011,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A sample of radioactive Cobalt-60 has an initial activity of 800 Bq. If its half-life T1/2 is 5.27 years, what will be its activity after 15.81 years?',
    correctNumeric: 100,
    tolerance: 1,
    unit: 'Bq',
    explanation: 'Time t = 15.81 years = 3 half-lives (15.81 / 5.27 = 3). After 3 half-lives, activity drops to A0 / (2³) = 800 / 8 = 100 Bq.',
    hints: [
      'Find how many half-lives have passed: n = total time / half-life.',
      '15.81 / 5.27 = 3 half-lives.',
      'Calculate A = A0 * (1/2)^n = 800 * (1/8).',
    ],
  },
  {
    id: 'ch_4',
    nodeId: NODE_014,
    type: 'balance-equation',
    difficulty: 'standard',
    question: 'Complete the nuclear beta-minus decay equation for Carbon-14: ¹⁴₆C → ¹⁴₇N + ? + ν̄_e',
    equationParts: {
      reactant1: '¹⁴₆C',
      reactant2: '→',
      product1: '¹⁴₇N +',
      product2Options: ['⁰₋₁e (electron β⁻)', '⁴₂He (alpha α)', '⁰₊₁e (positron β⁺)', '¹₀n (neutron)'],
      correctProduct2: '⁰₋₁e (electron β⁻)',
    },
    explanation: 'In β⁻ decay, a neutron converts to a proton: n → p + e⁻ + ν̄_e. The mass number A stays 14, charge Z increases from 6 to 7, and a high-speed electron (β⁻ particle) and antineutrino are emitted.',
    hints: [
      'Check charge conservation: Left side has Z = 6. Nitrogen has Z = 7.',
      'To make right side equal to 6, the missing particle must carry charge -1.',
      'An electron ⁰₋₁e has mass number 0 and charge -1.',
    ],
  },
  {
    id: 'ch_5',
    nodeId: NODE_006,
    type: 'drag-sort',
    difficulty: 'advanced',
    question: 'Rank the following nuclei in order of INCREASING Binding Energy per Nucleon (Ebn) (from lowest stability to highest peak stability):',
    sortItems: [
      { id: 'h2', text: 'Deuterium (²₁H) [1.11 MeV/nucl]', val: 1.11 },
      { id: 'he4', text: 'Helium-4 (⁴₂He) [7.07 MeV/nucl]', val: 7.07 },
      { id: 'u235', text: 'Uranium-235 (²³⁵₉₂U) [7.59 MeV/nucl]', val: 7.59 },
      { id: 'fe56', text: 'Iron-56 (⁵⁶₂₆Fe) [8.75 MeV/nucl]', val: 8.75 },
    ],
    explanation: 'Deuterium (1.11 MeV) < Helium-4 (7.07 MeV) < Uranium-235 (7.59 MeV) < Iron-56 (8.75 MeV). Iron-56 sits at the absolute peak of the binding energy curve.',
    hints: [
      'Very light nuclei like Deuterium have very low binding energy per nucleon.',
      'Uranium has ~7.6 MeV/nucleon due to proton electrostatic repulsion.',
      'Iron-56 is the most tightly bound stable nucleus in the universe.',
    ],
  },
  {
    id: 'ch_6',
    nodeId: NODE_019,
    type: 'numeric',
    difficulty: 'standard',
    question: 'In a single fission event of Uranium-235, 200 MeV of energy is released. How much energy in Joules (J) is released per fission event? (1 eV = 1.6 × 10⁻¹⁹ J)',
    correctNumeric: 3.2e-11,
    tolerance: 0.2e-11,
    unit: 'J',
    explanation: '200 MeV = 200 × 10⁶ eV = 2 × 10⁸ eV. Energy in Joules = 2 × 10⁸ × (1.6 × 10⁻¹⁹ J) = 3.2 × 10⁻¹¹ J.',
    hints: [
      'Multiply 200 by 10^6 to get energy in eV.',
      'Convert eV to Joules by multiplying by 1.6 * 10^-19 J/eV.',
      '200 * 10^6 * 1.6 * 10^-19 = 3.2 * 10^-11 J.',
    ],
  },
  {
    id: 'ch_7',
    nodeId: NODE_021,
    type: 'distinguish',
    difficulty: 'advanced',
    question: 'What is the primary role of Heavy Water (D₂O) or Graphite in a nuclear power reactor core like BARC’s Dhruva?',
    options: [
      'To absorb excess neutrons and stop thermal runaway.',
      'To slow down fast fission neutrons to thermal energy levels (~0.025 eV) so they can effectively induce further U-235 fission.',
      'To convert alpha particles into electric current directly.',
      'To prevent gamma rays from leaking out into the reactor containment building.',
    ],
    correctIndex: 1,
    explanation: 'Fast neutrons released during fission (~2 MeV) have a low probability (cross-section) of causing further U-235 fission. Heavy water or graphite acts as a MODERATOR to slow them down to thermal speeds via elastic collisions without absorbing them.',
    hints: [
      'Cadmium and Boron rods absorb neutrons. What do heavy water and graphite do?',
      'Fast neutrons pass right by U-235 without being captured easily.',
      'Slowing down (moderating) neutrons increases the probability of thermal neutron fission.',
    ],
  },
  {
    id: 'ch_8',
    nodeId: NODE_022,
    type: 'classify',
    difficulty: 'advanced',
    question: 'Why does nuclear fusion require extremely high temperatures (~10⁷ K) to take place in stellar cores or experimental tokamaks?',
    options: [
      'High temperature neutralizes the magnetic field of neutrons.',
      'To provide nuclei with enough thermal kinetic energy to overcome the repulsive electrostatic Coulomb barrier between positively charged protons.',
      'High temperature destroys electron shells so that weak force becomes infinitely strong.',
      'To break protons apart into free quarks.',
    ],
    correctIndex: 1,
    explanation: 'Positively charged nuclei strongly repel each other at distances greater than 10⁻¹⁵ m due to Coulomb repulsion. Extremely high kinetic temperatures (velocity ~ 10⁶ m/s) allow nuclei to approach within ~1 fm where the short-range attractive nuclear force overcomes repulsion.',
    hints: [
      'Protons carry positive electric charge. Like charges repel.',
      'To bring two positive protons close enough for the nuclear strong force to lock them together, what force must be overcome?',
      'Thermal kinetic energy (kT) supplies the barrier penetration energy.',
    ],
  },
];

// ─── MISCONCEPTIONS LIST ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Nuclear Density vs Atomic Number',
    misconception: 'Heavy nuclei like Uranium are much denser in nuclear matter than light nuclei like Helium.',
    reality: 'Nuclear density is CONSTANT (~2.3 × 10¹⁷ kg/m³) for ALL stable nuclei regardless of mass number A.',
    explanation: 'Nuclear radius grows as R = R0 A^(1/3). Hence Volume V ∝ A. Since mass M ∝ A, the ratio M/V (density) cancels out mass number A completely.',
  },
  {
    id: 'misc_2',
    title: 'Binding Energy Sign & Stability',
    misconception: 'Nuclei with higher total Binding Energy are always more stable than those with lower total Binding Energy.',
    reality: 'Stability is determined by Binding Energy PER NUCLEON (Ebn = Eb/A), not total binding energy!',
    explanation: 'Uranium-238 has a massive total binding energy (~1800 MeV), but its Ebn is only ~7.5 MeV/nucl. Iron-56 has a smaller total Eb (~492 MeV) but its Ebn is ~8.75 MeV/nucl, making Fe-56 far more stable.',
  },
  {
    id: 'misc_3',
    title: 'Half-Life & External Conditions',
    misconception: 'Heating a radioactive sample or placing it under high pressure will speed up its half-life decay.',
    reality: 'Radioactive decay constant λ is an intrinsic nuclear constant completely immune to external temperature, pressure, or chemical state.',
    explanation: 'Nuclear transitions occur at energy scales of MeV, whereas chemical, thermal, and mechanical interactions operate at eV scales (six orders of magnitude smaller).',
  },
  {
    id: 'misc_4',
    title: 'Fission vs Fusion Energy Yield',
    misconception: 'Fission releases more energy per gram of fuel than nuclear fusion.',
    reality: 'Fusion releases far MORE energy per unit mass (per gram of fuel) than fission.',
    explanation: 'A single U-235 fission yields ~200 MeV (0.85 MeV/u), whereas D-T fusion yields 17.6 MeV for mass 5 u (~3.5 MeV/u)—more than 4 times greater energy yield per kilogram!',
  },
  {
    id: 'misc_5',
    title: 'Beta Decay Spectrum & Neutrinos',
    misconception: 'Beta decay electrons are emitted with a single discrete kinetic energy value, just like alpha particles.',
    reality: 'Beta particles are emitted with a continuous energy spectrum from zero up to Q-value.',
    explanation: 'Because beta decay is a three-body decay (daughter nucleus + beta particle + (anti)neutrino), the total decay energy Q is shared continuously between the electron and the undetected neutrino.',
  },
];

// ─── MAIN COMPONENT ───
export default function C12_PhysicsNucleiCBSESim() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'predict' | 'slides' | 'lab' | 'challenges' | 'misconceptions'>('predict');
  const [labSubTab, setLabSubTab] = useState<'nucleus' | 'decay' | 'reactor'>('nucleus');
  const [slideIndex, setSlideIndex] = useState(0);

  // Predict tab state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Lab Tab 1: Nucleus & BE Explorer State
  const [zVal, setZVal] = useState<number>(26); // Default Iron-56
  const [nVal, setNVal] = useState<number>(30);
  const nucleusCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Lab Tab 2: Radioactive Decay Simulation State
  const [decayHalfLife, setDecayHalfLife] = useState<number>(3); // seconds
  const [isDecayRunning, setIsDecayRunning] = useState<boolean>(false);
  const [decayTime, setDecayTime] = useState<number>(0);
  const [initialNucleiCount, setInitialNucleiCount] = useState<number>(100);
  const [remainingNuclei, setRemainingNuclei] = useState<number>(100);
  const [decayEmittedParticles, setDecayEmittedParticles] = useState<{ id: number; x: number; y: number; vx: number; vy: number; type: 'alpha' | 'beta' | 'gamma' }[]>([]);
  const decayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Lab Tab 3: Nuclear Reactor Simulator State
  const [rodInsertion, setRodInsertion] = useState<number>(50); // percentage 0 to 100
  const [moderatorType, setModeratorType] = useState<'heavy_water' | 'light_water' | 'graphite'>('heavy_water');
  const [reactorPower, setReactorPower] = useState<number>(500); // MW
  const [neutronCount, setNeutronCount] = useState<number>(30);
  const [reactorTemp, setReactorTemp] = useState<number>(300); // Celsius
  const reactorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // SRS and BKT State
  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id, 'Physics');
    });
    return initial;
  });

  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Challenge Phase State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [challengeAnswer, setChallengeAnswer] = useState<any>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [dragSortedList, setDragSortedList] = useState<any[]>([]);

  // Simulation visuals & score
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Inactivity timer for hints
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Calculated properties for Nucleus Lab
  const totalA = zVal + nVal;
  const nuclearRadiusFm = useMemo(() => 1.2 * Math.pow(totalA, 1 / 3), [totalA]);
  const nuclearDensityKgM3 = 2.3e17; // Constant

  // Theoretical mass defect calculation (approx values for demo lab)
  const massDefectVal = useMemo(() => {
    const mp = 1.007276;
    const mn = 1.008665;
    // Semi-empirical mass formula approximation for smooth binding energy curve simulation
    const aV = 15.8;
    const aS = 18.3;
    const aC = 0.714;
    const aA = 23.2;
    const ebApprox = aV * totalA - aS * Math.pow(totalA, 2/3) - aC * (zVal * zVal) / Math.pow(totalA, 1/3) - aA * Math.pow(totalA - 2 * zVal, 2) / totalA;
    const ebClamped = Math.max(0, ebApprox);
    const dm = ebClamped / 931.5;
    return dm;
  }, [zVal, totalA]);

  const ebTotalMeV = useMemo(() => massDefectVal * 931.5, [massDefectVal]);
  const ebnPerNucleonMeV = useMemo(() => (totalA > 0 ? ebTotalMeV / totalA : 0), [ebTotalMeV, totalA]);

  // Overall Mastery Level calculation
  const overallMastery = useMemo(() => {
    const pKnowns = Object.values(bktStates).map(bkt => bkt.pKnown);
    const sum = pKnowns.reduce((acc, val) => acc + val, 0);
    return getMasteryLevel(sum / ALL_NODE_IDS.length);
  }, [bktStates]);

  // Handle Drag-Sort setup when challenge changes
  useEffect(() => {
    if (currentChallenge && currentChallenge.type === 'drag-sort' && currentChallenge.sortItems) {
      // Shuffle initial order
      const shuffled = [...currentChallenge.sortItems].sort(() => Math.random() - 0.5);
      setDragSortedList(shuffled);
    }
  }, [currentChallengeIdx, currentChallenge]);

  // Reset inactivity hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeTab, currentChallengeIdx, resetInactivityTimer]);

  // Speak greeting on initial mount
  useEffect(() => {
    speechManager.speak('Welcome to the BARC Nuclear Physics Interactive Laboratory. Let us explore the secrets of atomic nuclei!');
    audioManager.play('whoosh');
  }, []);

  // ─── CANVAS 1: Nucleus Structure Visualizer ───
  useEffect(() => {
    if (activeTab !== 'lab' || labSubTab !== 'nucleus') return;
    const canvas = nucleusCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw outer electron orbits preview background
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Generate deterministic particle positions in 3D sphere packing
      const nucleons: { x: number; y: number; z: number; type: 'proton' | 'neutron' }[] = [];
      let countP = 0;
      let countN = 0;

      const totalNuc = Math.min(totalA, 80); // cap for visual clarity
      const radiusScale = Math.min(70, 20 + Math.pow(totalNuc, 1/3) * 12);

      for (let i = 0; i < totalNuc; i++) {
        // Golden spiral distribution on sphere surface + volume filling
        const phi = Math.acos(1 - 2 * (i + 0.5) / totalNuc);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5) + angle * 0.5;
        const rNorm = Math.pow((i + 1) / totalNuc, 0.5) * radiusScale;

        const x = rNorm * Math.sin(phi) * Math.cos(theta);
        const y = rNorm * Math.sin(phi) * Math.sin(theta);
        const z = rNorm * Math.cos(phi);

        const isProton = (i % 2 === 0 && countP < zVal) || countN >= nVal;
        if (isProton) countP++; else countN++;

        nucleons.push({ x, y, z, type: isProton ? 'proton' : 'neutron' });
      }

      // Sort by Z for simple 3D depth rendering
      nucleons.sort((a, b) => a.z - b.z);

      // Render Nucleons & Nuclear Strong Force springs
      nucleons.forEach((nuc) => {
        const rad = 8 + (nuc.z / radiusScale) * 2;
        const screenX = cx + nuc.x;
        const screenY = cy + nuc.y;

        // Draw short-range attractive force glow lines to nearest neighbors
        nucleons.forEach((other) => {
          const dx = other.x - nuc.x;
          const dy = other.y - nuc.y;
          const dz = other.z - nuc.z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist > 0 && dist < 25) {
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(cx + other.x, cy + other.y);
            ctx.strokeStyle = nuc.type === 'proton' && other.type === 'proton' 
              ? 'rgba(239, 68, 68, 0.25)' 
              : 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        // Draw nucleon particle gradient
        const grad = ctx.createRadialGradient(
          screenX - rad * 0.3, screenY - rad * 0.3, rad * 0.1,
          screenX, screenY, rad
        );

        if (nuc.type === 'proton') {
          grad.addColorStop(0, '#fca5a5');
          grad.addColorStop(0.7, '#ef4444');
          grad.addColorStop(1, '#991b1b');
        } else {
          grad.addColorStop(0, '#93c5fd');
          grad.addColorStop(0.7, '#3b82f6');
          grad.addColorStop(1, '#1e3a8a');
        }

        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(3, rad), 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Plus symbol for protons
        if (nuc.type === 'proton' && rad > 6) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+', screenX, screenY);
        }
      });

      // Electrostatic repulsion vector arrows if high proton count Z > 40
      if (zVal > 30) {
        ctx.beginPath();
        ctx.arc(cx, cy, radiusScale + 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      angle += 0.01;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, labSubTab, zVal, nVal, totalA]);

  // ─── CANVAS 2: Radioactive Decay Simulation ───
  useEffect(() => {
    if (activeTab !== 'lab' || labSubTab !== 'decay') return;
    const canvas = decayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sampleNuclei = Array.from({ length: initialNucleiCount }, (_, i) => ({
      id: i,
      x: 30 + (i % 10) * 26 + (Math.random() - 0.5) * 6,
      y: 40 + Math.floor(i / 10) * 26 + (Math.random() - 0.5) * 6,
      decayed: false,
      decayTime: 0,
    }));

    let lastTimestamp = performance.now();
    const lambda = Math.LN2 / decayHalfLife;

    const render = (now: number) => {
      const dt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isDecayRunning) {
        setDecayTime(prev => {
          const newTime = prev + dt;
          // Calculate decay events
          let newlyDecayedCount = 0;
          sampleNuclei.forEach(nuc => {
            if (!nuc.decayed) {
              const prob = 1 - Math.exp(-lambda * dt);
              if (Math.random() < prob) {
                nuc.decayed = true;
                nuc.decayTime = newTime;
                newlyDecayedCount++;
              }
            }
          });

          if (newlyDecayedCount > 0) {
            audioManager.play('pop');
          }

          const activeRemaining = sampleNuclei.filter(n => !n.decayed).length;
          setRemainingNuclei(activeRemaining);

          return newTime;
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Left Panel: Sample Grid
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(10, 10, 290, 280);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(10, 10, 290, 280);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Radioactive Sample (${sampleNuclei.filter(n => !n.decayed).length} active)`, 20, 28);

      sampleNuclei.forEach(nuc => {
        ctx.beginPath();
        ctx.arc(nuc.x, nuc.y, 8, 0, Math.PI * 2);
        if (nuc.decayed) {
          ctx.fillStyle = '#64748b'; // Stable daughter nucleus
        } else {
          ctx.fillStyle = '#ef4444'; // Unstable parent nucleus
        }
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.stroke();

        // Pulsing glow for undecayed
        if (!nuc.decayed) {
          ctx.beginPath();
          ctx.arc(nuc.x, nuc.y, 10, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
          ctx.stroke();
        }
      });

      // Render Right Panel: Real-Time Decay Curve Graph N(t)
      const gx = 320;
      const gy = 20;
      const gw = 260;
      const gh = 250;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(gx, gy, gw, gh);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(gx, gy, gw, gh);

      // Draw Grid Lines & Axes
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let y = gy + 40; y < gy + gh; y += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, y);
        ctx.lineTo(gx + gw, y);
        ctx.stroke();
      }

      // Theoretical Exponential Curve N0 e^(-λt)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      for (let px = 0; px <= gw; px += 5) {
        const tVal = (px / gw) * (decayHalfLife * 4);
        const nTheory = initialNucleiCount * Math.exp(-lambda * tVal);
        const py = gy + gh - (nTheory / initialNucleiCount) * (gh - 30);
        if (px === 0) ctx.moveTo(gx + px, py);
        else ctx.lineTo(gx + px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Half-life Marker Lines
      const h1x = gx + (decayHalfLife / (decayHalfLife * 4)) * gw;
      ctx.beginPath();
      ctx.moveTo(h1x, gy);
      ctx.lineTo(h1x, gy + gh);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '10px sans-serif';
      ctx.fillText('T1/2', h1x - 10, gy + gh - 5);

      // Current Time Point Marker
      const maxPlotTime = decayHalfLife * 4;
      const curX = gx + Math.min(1, decayTime / maxPlotTime) * gw;
      const activeCount = sampleNuclei.filter(n => !n.decayed).length;
      const curY = gy + gh - (activeCount / initialNucleiCount) * (gh - 30);

      ctx.beginPath();
      ctx.arc(curX, curY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [activeTab, labSubTab, isDecayRunning, decayHalfLife, initialNucleiCount, decayTime]);

  // ─── CANVAS 3: Nuclear Reactor Chain Reaction Simulator ───
  useEffect(() => {
    if (activeTab !== 'lab' || labSubTab !== 'reactor') return;
    const canvas = reactorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // Fast neutron particles in core
    const neutrons = Array.from({ length: Math.round(neutronCount) }, () => ({
      x: 50 + Math.random() * 500,
      y: 50 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Reactor Core Vessel
      ctx.fillStyle = '#090d16';
      ctx.fillRect(20, 20, 560, 260);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, 560, 260);

      // Calculate Multiplication Factor k based on rod insertion
      // rodInsertion = 100% means rods fully inserted (k < 1 subcritical)
      // rodInsertion = 50% means k = 1.0 (critical steady state)
      // rodInsertion = 0% means k > 1.2 (supercritical thermal runaway)
      const kFactor = 1.4 - (rodInsertion / 100) * 0.8;
      const targetPower = Math.round(100 * Math.exp((kFactor - 1) * 3));
      setReactorPower(prev => Math.max(10, Math.min(3000, Math.round(prev + (targetPower - prev) * 0.05))));
      setReactorTemp(prev => Math.max(25, Math.min(1200, Math.round(25 + reactorPower * 0.25))));

      // Draw Fuel Rods (Uranium assemblies)
      for (let x = 80; x <= 500; x += 80) {
        ctx.fillStyle = '#334155';
        ctx.fillRect(x, 40, 24, 220);
        ctx.fillStyle = reactorPower > 1500 ? '#ef4444' : '#eab308';
        ctx.fillRect(x + 4, 44, 16, 212);

        ctx.fillStyle = '#ffffff';
        ctx.font = '9px sans-serif';
        ctx.fillText('U235', x + 1, 35);
      }

      // Draw Control Rods (Cadmium/Boron) lowered from top
      const rodHeight = (rodInsertion / 100) * 200;
      for (let x = 120; x <= 440; x += 80) {
        ctx.fillStyle = '#475569';
        ctx.fillRect(x, 20, 20, rodHeight);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, 20, 20, rodHeight);

        // Control rod handle label
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '8px sans-serif';
        ctx.fillText('Cd/B', x + 1, 16);
      }

      // Move & render Neutrons
      neutrons.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 30 || n.x > 550) n.vx *= -1;
        if (n.y < 30 || n.y > 270) n.vy *= -1;

        // Absorption by control rods check
        for (let x = 120; x <= 440; x += 80) {
          if (n.x >= x && n.x <= x + 20 && n.y <= 20 + rodHeight) {
            // Absorbed neutron resets to random spawn
            n.x = 50 + Math.random() * 500;
            n.y = 50 + Math.random() * 200;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Reactor status badge
      ctx.font = 'bold 12px sans-serif';
      if (kFactor > 1.05) {
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`SUPERCRITICAL (k = ${kFactor.toFixed(2)}) - CAUTION!`, 30, 270);
      } else if (kFactor < 0.95) {
        ctx.fillStyle = '#64748b';
        ctx.fillText(`SUBCRITICAL SHUTDOWN (k = ${kFactor.toFixed(2)})`, 30, 270);
      } else {
        ctx.fillStyle = '#22c55e';
        ctx.fillText(`CRITICAL STEADY STATE (k = ${kFactor.toFixed(2)})`, 30, 270);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, labSubTab, rodInsertion, neutronCount]);

  // ─── EVENT HANDLERS ───

  // Discovery answer submit
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction! The mass defect is directly converted into binding energy.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite! Bound nucleons weigh less than free nucleons, converting lost mass into binding energy.');
    }
  };

  // Challenge Option Select / Submit
  const handleChallengeSubmit = () => {
    if (challengeSubmitted) return;

    let isCorrect = false;
    const ch = currentChallenge;

    if (ch.type === 'classify' || ch.type === 'distinguish') {
      isCorrect = challengeAnswer === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const numVal = parseFloat(challengeAnswer);
      if (!isNaN(numVal) && ch.correctNumeric !== undefined) {
        const tol = ch.tolerance || 0.01;
        isCorrect = Math.abs(numVal - ch.correctNumeric) <= tol;
      }
    } else if (ch.type === 'balance-equation') {
      isCorrect = challengeAnswer === ch.equationParts?.correctProduct2;
    } else if (ch.type === 'drag-sort') {
      // Check if current dragSortedList matches ascending val order
      const isSorted = dragSortedList.every((item, idx) => {
        if (idx === 0) return true;
        return item.val >= dragSortedList[idx - 1].val;
      });
      isCorrect = isSorted;
    }

    setChallengeSubmitted(true);
    setIsCorrectAnswer(isCorrect);

    // Update SRS & BKT
    const nodeId = ch.nodeId;
    const quality = isCorrect ? 5 : 2;

    const updatedSrs = sm2Update(srsItems[nodeId], quality, 0);
    setSrsItems(prev => ({ ...prev, [nodeId]: updatedSrs }));

    const updatedBkt = bktUpdate(bktStates[nodeId], isCorrect);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBkt }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Correct answer! Fantastic mastery of nuclear physics.');
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => { setShowSuccess(false); setShowSparkle(false); }, 2500);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the detailed explanation and hint below!');
    }
  };

  // Next Challenge
  const handleNextChallenge = () => {
    setChallengeSubmitted(false);
    setChallengeAnswer(null);
    setShowHint(false);
    setCurrentHintIndex(0);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Finished all challenges
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all BARC Nuclear Physics Diagnostic Challenges!');
      recordGameScore(ALL_NODE_IDS, 100);
      setShowConfetti(true);
    }
  };

  // Move Drag-Sort item up or down
  const moveSortItem = (index: number, direction: 'up' | 'down') => {
    if (challengeSubmitted) return;
    audioManager.play('tap');
    const newList = [...dragSortedList];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newList.length) return;
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;
    setDragSortedList(newList);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* ─── VISUAL EFFECT OVERLAYS ─── */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Nuclear Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* ─── HEADER BAR ─── */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-cyan-500/20">
            ⚛️
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-wide">Nuclei Laboratory</h1>
            <p className="text-xs text-slate-400">Class 12 Physics (CBSE) • BARC Simulation Engine</p>
          </div>
        </div>

        {/* Global Progress & Adaptive Mastery Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700/60">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">BKT Mastery Level</div>
              <div className="text-sm font-bold text-cyan-400 capitalize">{overallMastery}</div>
            </div>
            <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                style={{
                  width: `${(Object.values(bktStates).reduce((a, b) => a + b.pKnown, 0) / ALL_NODE_IDS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ─── NAVIGATION TABS ─── */}
      <nav className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-2 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'predict', label: '1. Predict', icon: '❓' },
          { id: 'slides', label: '2. Learn Concepts', icon: '📚' },
          { id: 'lab', label: '3. Interactive Lab', icon: '🔬' },
          { id: 'challenges', label: '4. Challenges', icon: '⚡' },
          { id: 'misconceptions', label: '5. Misconception Lab', icon: '🧠' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              audioManager.play('tap');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">

        {/* ─── TAB 1: PREDICT (DISCOVERY QUESTION) ─── */}
        {activeTab === 'predict' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Narrative Banner */}
            <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-slate-900 p-6 rounded-2xl border border-cyan-500/30 shadow-xl">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
                MISSION BRIEFING
              </span>
              <h2 className="text-2xl font-bold text-cyan-100 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <span>📍</span>
                <span>{SCENARIO.context}</span>
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Predict Before Learning
                </span>
                <span className="text-xs text-slate-500">Formulate a Physics Hypothesis</span>
              </div>

              <h3 className="text-lg font-bold text-slate-100 leading-snug">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => {
                      setDiscoverySelected(idx);
                      audioManager.play('tap');
                    }}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                      discoverySelected === idx
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoverySelected === null}
                  onClick={handleDiscoverySubmit}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all ${
                    discoverySelected !== null
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Confirm & Test Hypothesis
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-5 rounded-xl border flex flex-col gap-3 ${
                    discoverySelected === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span>
                      {discoverySelected === DISCOVERY_QUESTION.correctIndex
                        ? '🎉 Spot-on Physics Intuition!'
                        : '💡 Key Scientific Insight'}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <button
                    onClick={() => setActiveTab('slides')}
                    className="mt-2 self-end px-5 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 font-semibold text-xs border border-cyan-500/40 hover:bg-cyan-500/30"
                  >
                    Proceed to Visual Learning →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── TAB 2: LEARN CONCEPTS (TEACHING SLIDES) ─── */}
        {activeTab === 'slides' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Slide Navigation Stepper */}
            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">
                Slide {slideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex items-center gap-2">
                {TEACHING_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSlideIndex(idx);
                      audioManager.play('tap');
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      slideIndex === idx ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slide Detail Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    {TEACHING_SLIDES[slideIndex].subtitle}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-100 mt-1 mb-4">
                    {TEACHING_SLIDES[slideIndex].title}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {TEACHING_SLIDES[slideIndex].explanation}
                  </p>

                  {/* Math Formula Highlight */}
                  {TEACHING_SLIDES[slideIndex].formula && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 mb-6 font-mono text-xs md:text-sm text-cyan-300 flex items-center justify-center">
                      <code>{TEACHING_SLIDES[slideIndex].formula}</code>
                    </div>
                  )}
                </div>

                {/* Key Takeaway Box */}
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-blue-200 text-xs leading-relaxed">
                  <span className="font-bold block mb-1">💡 Key Concept takeaway:</span>
                  {TEACHING_SLIDES[slideIndex].keyTakeaway}
                </div>
              </div>

              {/* Dynamic SVG / Canvas Visualizer for Slide */}
              <div className="w-full md:w-80 h-72 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                {slideIndex === 0 && (
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="60" fill="url(#nucGrad)" stroke="#38bdf8" strokeWidth="2" />
                    <defs>
                      <radialGradient id="nucGrad">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </radialGradient>
                    </defs>
                    <line x1="100" y1="100" x2="160" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="125" y="90" fill="#f59e0b" fontSize="11" fontWeight="bold">R = R₀A¹/³</text>
                    <text x="100" y="180" fill="#94a3b8" fontSize="10" textAnchor="middle">ρ = 2.3 × 10¹⁷ kg/m³ (Const)</text>
                  </svg>
                )}

                {slideIndex === 1 && (
                  <svg className="w-full h-full" viewBox="0 0 200 180">
                    <path d="M 20 160 Q 40 40, 80 30 T 180 60" fill="none" stroke="#22c55e" strokeWidth="3" />
                    <circle cx="80" cy="30" r="5" fill="#ef4444" />
                    <text x="80" y="20" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Fe-56 (8.75 MeV)</text>
                    <line x1="20" y1="160" x2="180" y2="160" stroke="#475569" strokeWidth="1" />
                    <line x1="20" y1="20" x2="20" y2="160" stroke="#475569" strokeWidth="1" />
                    <text x="100" y="175" fill="#94a3b8" fontSize="9" textAnchor="middle">Mass Number A</text>
                    <text x="15" y="90" fill="#94a3b8" fontSize="9" textAnchor="middle" transform="rotate(-90 15 90)">Ebn (MeV)</text>
                  </svg>
                )}

                {slideIndex === 2 && (
                  <svg className="w-full h-full" viewBox="0 0 200 180">
                    <path d="M 20 20 Q 50 140, 180 150" fill="none" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="60" y1="20" x2="60" y2="150" stroke="#f59e0b" strokeDasharray="2,2" />
                    <text x="60" y="165" fill="#f59e0b" fontSize="9" textAnchor="middle">T1/2</text>
                    <line x1="20" y1="85" x2="60" y2="85" stroke="#f59e0b" strokeDasharray="2,2" />
                    <text x="10" y="90" fill="#f59e0b" fontSize="9">N₀/2</text>
                  </svg>
                )}

                {slideIndex === 3 && (
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-xs text-red-300 font-mono">
                      α-Decay: Ejects ⁴₂He Nucleus
                    </div>
                    <div className="p-3 bg-blue-950/60 border border-blue-500/40 rounded-lg text-xs text-blue-300 font-mono">
                      β⁻-Decay: n → p + e⁻ + ν̄_e
                    </div>
                    <div className="p-3 bg-purple-950/60 border border-purple-500/40 rounded-lg text-xs text-purple-300 font-mono">
                      γ-Decay: Pure Photon Emission
                    </div>
                  </div>
                )}

                {slideIndex === 4 && (
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-full p-3 bg-amber-950/40 border border-amber-500/40 rounded-lg text-xs text-amber-200">
                      ⚡ Fission: ²³⁵U + n → Ba + Kr + 3n + 200 MeV
                    </div>
                    <div className="w-full p-3 bg-cyan-950/40 border border-cyan-500/40 rounded-lg text-xs text-cyan-200">
                      🔥 Fusion: ²H + ³H → ⁴He + n + 17.6 MeV
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center">
              <button
                disabled={slideIndex === 0}
                onClick={() => {
                  setSlideIndex(prev => prev - 1);
                  audioManager.play('tap');
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  slideIndex === 0
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                ← Previous Slide
              </button>

              <button
                onClick={() => {
                  if (slideIndex < TEACHING_SLIDES.length - 1) {
                    setSlideIndex(prev => prev + 1);
                    audioManager.play('tap');
                  } else {
                    setActiveTab('lab');
                    audioManager.play('whoosh');
                  }
                }}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110"
              >
                {slideIndex < TEACHING_SLIDES.length - 1 ? 'Next Slide →' : 'Enter Interactive Lab 🔬'}
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── TAB 3: INTERACTIVE LAB ─── */}
        {activeTab === 'lab' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Lab Mode Selector Tabs */}
            <div className="flex items-center gap-3 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
              {[
                { id: 'nucleus', label: '1. Nucleus & Binding Energy', icon: '⚛️' },
                { id: 'decay', label: '2. Radioactive Decay Simulator', icon: '⏳' },
                { id: 'reactor', label: '3. Dhruva Reactor Core', icon: '☢️' },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setLabSubTab(sub.id as any);
                    audioManager.play('tap');
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    labSubTab === sub.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.label}</span>
                </button>
              ))}
            </div>

            {/* SUB-LAB 1: NUCLEUS & BINDING ENERGY EXPLORER */}
            {labSubTab === 'nucleus' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visualizer Canvas */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative shadow-xl">
                  <div className="w-full flex justify-between items-center mb-2 px-2">
                    <span className="text-xs font-semibold text-cyan-400">3D Nucleon Packing Simulation</span>
                    <span className="text-xs text-slate-400 font-mono">
                      Radius R = {nuclearRadiusFm.toFixed(2)} fm
                    </span>
                  </div>
                  <canvas
                    ref={nucleusCanvasRef}
                    width={480}
                    height={300}
                    className="w-full max-w-full rounded-xl bg-slate-950 border border-slate-800/80"
                  />
                  <div className="flex items-center justify-center gap-6 mt-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                      <span className="text-slate-300">Protons (Z = {zVal})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                      <span className="text-slate-300">Neutrons (N = {nVal})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">A = {totalA}</span>
                    </div>
                  </div>
                </div>

                {/* Sliders & Physics Readouts */}
                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col gap-5 shadow-xl">
                  <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
                    Nuclear Composition Controls
                  </h3>

                  {/* Proton Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-red-400">Atomic Number Z (Protons):</span>
                      <span className="text-slate-200">{zVal}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={92}
                      value={zVal}
                      onChange={e => {
                        setZVal(parseInt(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-red-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Neutron Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-blue-400">Neutrons N:</span>
                      <span className="text-slate-200">{nVal}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={146}
                      value={nVal}
                      onChange={e => {
                        setNVal(parseInt(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Real-time Math Outputs */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                      <span className="text-slate-400">Mass Defect (Δm):</span>
                      <span className="font-mono text-amber-400 font-bold">{massDefectVal.toFixed(4)} u</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                      <span className="text-slate-400">Total Binding Energy (Eb):</span>
                      <span className="font-mono text-cyan-400 font-bold">{ebTotalMeV.toFixed(1)} MeV</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 text-xs flex justify-between items-center">
                      <span className="text-slate-400">BE per Nucleon (Ebn):</span>
                      <span className="font-mono text-emerald-400 font-bold">{ebnPerNucleonMeV.toFixed(2)} MeV/nucl</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                      <span className="text-slate-400">Nuclear Matter Density:</span>
                      <span className="font-mono text-indigo-400 font-bold">2.3 × 10¹⁷ kg/m³</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-LAB 2: RADIOACTIVE DECAY SIMULATOR */}
            {labSubTab === 'decay' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative shadow-xl">
                  <canvas
                    ref={decayCanvasRef}
                    width={590}
                    height={300}
                    className="w-full max-w-full rounded-xl bg-slate-950 border border-slate-800"
                  />
                </div>

                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col gap-5 shadow-xl justify-between">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
                      Decay Kinetics Parameters
                    </h3>

                    {/* Half-Life Slider */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-amber-400">Half-life (T1/2):</span>
                        <span className="text-slate-200">{decayHalfLife} seconds</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={decayHalfLife}
                        disabled={isDecayRunning}
                        onChange={e => {
                          setDecayHalfLife(parseInt(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex flex-col gap-2 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Decay Const λ:</span>
                        <span className="text-cyan-400">{(Math.LN2 / decayHalfLife).toFixed(3)} s⁻¹</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time Elapsed:</span>
                        <span className="text-emerald-400">{decayTime.toFixed(1)} s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Remaining N(t):</span>
                        <span className="text-red-400">{remainingNuclei} / {initialNucleiCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setIsDecayRunning(!isDecayRunning);
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${
                        isDecayRunning
                          ? 'bg-amber-600 hover:bg-amber-500 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isDecayRunning ? 'Pause Decay' : 'Start Decay'}
                    </button>
                    <button
                      onClick={() => {
                        setIsDecayRunning(false);
                        setDecayTime(0);
                        setRemainingNuclei(initialNucleiCount);
                        audioManager.play('whoosh');
                      }}
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-LAB 3: DHRUVA REACTOR CORE */}
            {labSubTab === 'reactor' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center shadow-xl">
                  <canvas
                    ref={reactorCanvasRef}
                    width={590}
                    height={300}
                    className="w-full max-w-full rounded-xl bg-slate-950 border border-slate-800"
                  />
                </div>

                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col gap-5 shadow-xl">
                  <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
                    Control Rod Assembly
                  </h3>

                  {/* Rod Insertion Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Cadmium Control Rod Insertion:</span>
                      <span className="text-cyan-400">{rodInsertion}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={rodInsertion}
                      onChange={e => {
                        setRodInsertion(parseInt(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>0% (Supercritical)</span>
                      <span>50% (Critical)</span>
                      <span>100% (Shutdown)</span>
                    </div>
                  </div>

                  {/* Moderator Selection */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-slate-300">Neutron Moderator:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['heavy_water', 'light_water', 'graphite'].map(m => (
                        <button
                          key={m}
                          onClick={() => {
                            setModeratorType(m as any);
                            audioManager.play('tap');
                          }}
                          className={`py-2 px-1 rounded-lg text-[10px] font-bold capitalize transition-all border ${
                            moderatorType === m
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {m.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reactor Diagnostics Readouts */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Thermal Output Power:</span>
                      <span className="text-amber-400 font-bold">{reactorPower} MW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Core Temperature:</span>
                      <span className={reactorTemp > 800 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        {reactorTemp} °C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ─── TAB 4: ADAPTIVE CHALLENGES ─── */}
        {activeTab === 'challenges' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Challenge Progress */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <span className="text-xs font-semibold text-slate-400 capitalize">
                  Difficulty: {currentChallenge.difficulty}
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                Node ID: {currentChallenge.nodeId}
              </span>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col gap-6">
              <h3 className="text-lg font-bold text-slate-100 leading-snug">
                {currentChallenge.question}
              </h3>

              {/* Classify / Distinguish Options */}
              {(currentChallenge.type === 'classify' || currentChallenge.type === 'distinguish') && (
                <div className="grid grid-cols-1 gap-3">
                  {currentChallenge.options?.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={challengeSubmitted}
                      onClick={() => {
                        setChallengeAnswer(idx);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                        challengeAnswer === idx
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {currentChallenge.type === 'numeric' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      disabled={challengeSubmitted}
                      placeholder="Enter value..."
                      value={challengeAnswer || ''}
                      onChange={e => setChallengeAnswer(e.target.value)}
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-cyan-300 font-mono text-sm focus:outline-none focus:border-cyan-400 flex-1"
                    />
                    <span className="text-sm font-bold text-slate-400">{currentChallenge.unit}</span>
                  </div>
                </div>
              )}

              {/* Balance Equation Select */}
              {currentChallenge.type === 'balance-equation' && (
                <div className="flex flex-col gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 text-center font-mono text-base text-cyan-300">
                    {currentChallenge.equationParts?.reactant1} {currentChallenge.equationParts?.reactant2} {currentChallenge.equationParts?.product1}{' '}
                    <span className="underline decoration-cyan-400 font-bold text-amber-400">
                      [ {challengeAnswer || '?'} ]
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentChallenge.equationParts?.product2Options.map((opt, idx) => (
                      <button
                        key={idx}
                        disabled={challengeSubmitted}
                        onClick={() => {
                          setChallengeAnswer(opt);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-sm font-mono font-medium transition-all ${
                          challengeAnswer === opt
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                            : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Drag-Sort Reordering */}
              {currentChallenge.type === 'drag-sort' && (
                <div className="flex flex-col gap-3">
                  <span className="text-xs text-slate-400">Arrange items in ascending order using Up/Down buttons:</span>
                  {dragSortedList.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-sm text-slate-200 font-medium"
                    >
                      <span>{item.text}</span>
                      <div className="flex items-center gap-1">
                        <button
                          disabled={challengeSubmitted || idx === 0}
                          onClick={() => moveSortItem(idx, 'up')}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-xs font-bold"
                        >
                          ▲
                        </button>
                        <button
                          disabled={challengeSubmitted || idx === dragSortedList.length - 1}
                          onClick={() => moveSortItem(idx, 'down')}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-xs font-bold"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit & Hint Buttons */}
              <div className="flex items-center gap-3">
                {!challengeSubmitted ? (
                  <button
                    disabled={challengeAnswer === null && currentChallenge.type !== 'drag-sort'}
                    onClick={handleChallengeSubmit}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all ${
                      challengeAnswer !== null || currentChallenge.type === 'drag-sort'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="flex-1 py-3.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
                  >
                    Next Challenge →
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    audioManager.play('hint');
                  }}
                  className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
                >
                  💡 Hint
                </button>
              </div>

              {/* Hint Bubble Component */}
              <HintBubble
                show={showHint}
                text={currentChallenge.hints[currentHintIndex] || currentChallenge.hints[0]}
              />

              {/* Answer Feedback Banner */}
              {challengeSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl border flex flex-col gap-2 ${
                    isCorrectAnswer
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-red-950/40 border-red-500/40 text-red-200'
                  }`}
                >
                  <span className="font-bold text-sm">
                    {isCorrectAnswer ? '✅ Excellent!' : '❌ Solution Breakdown'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentChallenge.explanation}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── TAB 5: MISCONCEPTION LAB ─── */}
        {activeTab === 'misconceptions' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h2 className="text-xl font-bold text-slate-100 mb-1">
                🧠 Common Nuclear Physics Misconceptions Diagnostic
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                CBSE Board Examination Trap Buster: Correcting fundamental misconceptions about nuclei.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS_CHECKLIST.map((misc) => (
                  <div
                    key={misc.id}
                    className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3"
                  >
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      {misc.title}
                    </span>
                    <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-lg text-xs text-red-300">
                      <span className="font-bold block mb-1">❌ Common Myth:</span>
                      {misc.misconception}
                    </div>
                    <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
                      <span className="font-bold block mb-1">✅ Physics Reality:</span>
                      {misc.reality}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {misc.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-4 mt-auto text-center text-xs text-slate-500">
        BARC Nuclear Physics Interactive Module • Class 12 CBSE Physics Chapter 13 (Nuclei)
      </footer>
    </div>
  );
}