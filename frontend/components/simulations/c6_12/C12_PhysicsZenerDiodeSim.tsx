'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_PHY_121 = 'c12_phy_121'; // Zener diode
const NODE_C12_PHY_122 = 'c12_phy_122'; // Zener diode as voltage regulator
const NODE_C12_PHY_123 = 'c12_phy_123'; // Radioactive decay (alpha, beta, gamma)
const NODE_C12_PHY_124 = 'c12_phy_124'; // Half-life and decay law
const NODE_C12_PHY_125 = 'c12_phy_125'; // Junction transistor (n-p-n and p-n-p)
const NODE_C12_PHY_126 = 'c12_phy_126'; // Transistor characteristics and amplifier (CE)
const NODE_C12_PHY_127 = 'c12_phy_127'; // Logic gates (AND, OR, NOT, NAND, NOR)
const NODE_C12_PHY_128 = 'c12_phy_128'; // Combination of logic gates
const NODE_C12_PHY_129 = 'c12_phy_129'; // Communication systems (elements and modulation)
const NODE_C12_PHY_130 = 'c12_phy_130'; // Malus's law and polarization of light

const ALL_NODE_IDS = [
  NODE_C12_PHY_121,
  NODE_C12_PHY_122,
  NODE_C12_PHY_123,
  NODE_C12_PHY_124,
  NODE_C12_PHY_125,
  NODE_C12_PHY_126,
  NODE_C12_PHY_127,
  NODE_C12_PHY_128,
  NODE_C12_PHY_129,
  NODE_C12_PHY_130,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The ISRO Vikram Science Payload Diagnostic',
  intro: 'A lunar exploration lander carrying sensitive scientific instruments has experienced erratic power fluctuations, noisy sensor telemetry, and logic bus corruptions. As the chief instrumentation engineer at ISRO Control, your task is to stabilize voltage supplies using Zener diodes, analyze telemetry decay rates, verify transistor amplifiers, construct robust logic subsystems, and filter polarized optical sensors.',
  context: 'You will interact with real-time electronic test benches, examine semiconductor breakdown, radioactive decay curves, transistor characteristics, logic networks, and optical polarization analyzers before validating final mission modules.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An unregulated supply voltage surges from 10 V to 16 V. A 5.1 V Zener diode with a series resistor Rs is connected in parallel with a sensitive camera payload. What happens to the voltage across the camera?',
  options: [
    'It rises from 5.1 V to 8.16 V proportionally.',
    'It remains clamped tightly near 5.1 V while the extra voltage drops across the series resistor.',
    'It drops to 0 V because the reverse current burns out the diode immediately.',
    'It oscillates between 0.7 V and 16 V as the junction flips.',
  ],
  correctIndex: 1,
  hintAfter: 'Keep calm! In reverse breakdown, a Zener diode maintains an essentially constant voltage regardless of incoming surge currents.',
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
  bloomLevel?: string;
}

// ─── 22 CHALLENGES (Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // 1. Zener Diode Basics (Foundation - Recall)
  {
    id: 'ch_01_zener_basis',
    nodeId: NODE_C12_PHY_121,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under what operating conditions does a Zener diode maintain its characteristic constant voltage Vz?',
    options: [
      'In forward bias past the 0.7 V silicon knee voltage',
      'In reverse breakdown bias where heavy doping facilitates quantum tunneling',
      'In zero bias where thermal equilibrium maintains a wide depletion layer',
      'In reverse bias below the breakdown knee where only leakage current flows',
    ],
    correctIndex: 1,
    explanation: 'A Zener diode is heavily doped to operate stably in the reverse breakdown region. Once in breakdown, it clamps the potential difference across itself to Vz.',
    hints: [
      'Think about whether a regulator diode operates in forward or reverse bias.',
      'Recall that ordinary diodes are kept away from reverse breakdown, but Zener diodes are designed specifically for it.',
      'In reverse breakdown, heavy doping causes a sharp, non-destructive voltage clamp.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Drag-Label Zener Regulator Schematic (Foundation - Understanding)
  {
    id: 'ch_02_zener_schematic',
    nodeId: NODE_C12_PHY_122,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each circuit role label to its corresponding target block in the voltage regulator topology.',
    dragItems: [
      { label: 'Series Dropping Resistor (Rs)', targetId: 'rs_box' },
      { label: 'Reverse-Biased Zener Diode (Vz)', targetId: 'zener_box' },
      { label: 'Unregulated Input (Vi)', targetId: 'vi_box' },
      { label: 'Regulated Load (RL)', targetId: 'rl_box' },
    ],
    correctMapping: {
      rs_box: 'Series Dropping Resistor (Rs)',
      zener_box: 'Reverse-Biased Zener Diode (Vz)',
      vi_box: 'Unregulated Input (Vi)',
      rl_box: 'Regulated Load (RL)',
    },
    explanation: 'The series resistor Rs drops excess voltage (Vi - Vz) and limits current, the reverse-biased Zener clamps the output voltage, and the load RL sits in parallel across the Zener.',
    hints: [
      'Where does the fluctuating raw power enter? That is Vi on the far left.',
      'What resistor is connected directly in line with the input supply to drop excess voltage? That is Rs.',
      'The Zener diode is placed in parallel with the load so that Vout = Vz.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Zener Breakdown vs Avalanche Breakdown (Standard - Analysis)
  {
    id: 'ch_03_breakdown_mechanisms',
    nodeId: NODE_C12_PHY_121,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An ISRO test engineer notes that below 5 V, breakdown voltage decreases slightly with rising temperature (negative temp. coefficient), while above 6 V it increases (positive temp. coefficient). Why?',
    options: [
      'Zener breakdown (<5 V) is field-induced direct valence tunneling, whereas avalanche (>6 V) is collision impact ionization impeded by lattice vibrations.',
      'Avalanche breakdown occurs only in superconductors, whereas Zener breakdown is purely thermionic emission.',
      'Above 6 V, the depletion region shrinks to zero thickness, stopping all carrier flow.',
      'Below 5 V, minority carriers recombine faster than the speed of light.',
    ],
    correctIndex: 0,
    explanation: 'Zener breakdown occurs in heavily doped junctions with narrow depletion zones via electric field tunneling (negative temp. coefficient). Avalanche breakdown occurs in lighter doping where carriers gain kinetic energy and collide with the lattice; increased thermal scattering hinders this, giving a positive temp. coefficient.',
    hints: [
      'Contrast quantum tunneling across a nanometer-thin barrier against kinetic collision cascades.',
      'How do increased thermal lattice vibrations affect carrier mean free paths during collision ionization?',
      'Field emission needs less voltage as band gaps slightly shrink with heat; collisions require higher voltage when scattering increases.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Numeric Zener Series Resistor Calculation (Standard - Application)
  {
    id: 'ch_04_zener_rs_calc',
    nodeId: NODE_C12_PHY_122,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 6.0 V Zener regulator receives an unregulated input that dips to a minimum of 10.0 V. The maximum load current is 35 mA and the minimum Zener holding current Iz(min) is 5 mA. Calculate the maximum safe series resistance Rs in ohms.',
    correctAnswer: 100,
    tolerance: 3,
    unit: 'Ω',
    explanation: 'Using the design equation: Rs = (Vi(min) - Vz) / (Iz(min) + IL(max)) = (10.0 - 6.0) V / (0.005 A + 0.035 A) = 4.0 V / 0.040 A = 100 Ω.',
    hints: [
      'Recall the worst-case condition: at minimum input voltage, Rs must supply both maximum load current and minimum Zener current.',
      'Current through Rs is Is = Iz(min) + IL(max) = 5 mA + 35 mA = 40 mA = 0.040 A.',
      'Voltage across Rs is Vi(min) - Vz = 10.0 - 6.0 = 4.0 V. Rs = 4.0 / 0.040.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Alpha, Beta, Gamma Radiation Properties (Foundation - Recall)
  {
    id: 'ch_05_decay_properties',
    nodeId: NODE_C12_PHY_123,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which emitted radioactive particle/radiation possesses the highest ionizing power and lowest penetrating power?',
    options: [
      'Alpha (α) particle (⁴₂He nucleus, charge +2e, mass ~4 u)',
      'Beta-minus (β⁻) particle (fast electron, charge -1e)',
      'Gamma (γ) ray photon (electromagnetic radiation, charge 0, rest mass 0)',
      'Positron (β⁺) particle (charge +1e)',
    ],
    correctIndex: 0,
    explanation: 'Due to its double positive charge (+2e) and large mass (~4 u), an alpha particle has immense ionizing capability but can be stopped by a simple sheet of paper or a few cm of air.',
    hints: [
      'Ionizing power scales with mass and the square of electric charge.',
      'Heavier, slow particles collide vigorously with orbital electrons in short distances.',
      'A helium-4 nucleus has charge +2e and mass ~4 u, making it the most ionizing and least penetrating.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Nuclear Decay Stoichiometry (Standard - Analysis)
  {
    id: 'ch_06_uranium_chain',
    nodeId: NODE_C12_PHY_123,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the radioactive decay series from ²³⁸₉₂U to stable ²⁰⁶₈₂Pb, how many total alpha (α) particles are emitted?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'particles',
    explanation: 'Mass number decreases from 238 to 206, a drop of ΔA = 32. Since each alpha particle carries away 4 nucleons (⁴₂He) and beta emissions have A=0, the number of alpha particles is 32 / 4 = 8.',
    hints: [
      'Look strictly at the change in mass number A. Beta particles have zero mass number.',
      'ΔA = 238 - 206 = 32.',
      'Each alpha particle removes 4 units of mass number: 32 / 4 = 8.',
    ],
  },
  // 7. Beta Decay Nuances & Conservation (Standard - Understanding)
  {
    id: 'ch_07_beta_minus_rules',
    nodeId: NODE_C12_PHY_123,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In beta-minus (β⁻) decay of ¹⁴₆C to ¹⁴₇N, why does the mass number A remain strictly 14 while atomic number Z increases to 7?',
    options: [
      'A neutron inside the nucleus converts into a proton, an electron, and an antineutrino (¹₀n → ¹₁p + ⁰₋₁e + ν̄)',
      'An external electron is captured into the nucleus, annihilating a proton',
      'Two protons fuse together inside the nucleus to form a deuteron',
      'The nucleus loses 2 alpha particles and absorbs 4 positrons simultaneously',
    ],
    correctIndex: 0,
    explanation: 'In beta-minus decay, a neutron converts to a proton. Because one nucleon is replaced by another, total nucleon number A is unchanged, while proton number Z increases by 1.',
    hints: [
      'Mass number counts total nucleons (protons + neutrons).',
      'When a neutral nucleon turns into a positive nucleon, what happens to the total count?',
      'Neutron (A=1) becomes proton (A=1), so ΔA = 0, and Z goes from 6 to 7.',
    ],
    misconceptionIndex: 1,
  },
  // 8. Half-Life & Archaeological Dating (Standard - Application)
  {
    id: 'ch_08_halflife_dating',
    nodeId: NODE_C12_PHY_124,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A charcoal artifact unearthed at an Indus Valley excavation near Lothal has a ¹⁴C activity equal to 12.5% (1/8) of living wood. Given T₁/₂ = 5730 years, determine the age of the artifact in years.',
    correctAnswer: 17190,
    tolerance: 100,
    unit: 'years',
    explanation: '12.5% activity corresponds to (1/2)³ of original activity, meaning exactly 3 half-lives have elapsed. Age = 3 × 5730 years = 17,190 years.',
    hints: [
      'Express the remaining fraction 12.5% as a power of (1/2): 12.5% = 1/8 = (1/2)ⁿ.',
      'Here n = 3 half-lives.',
      'Total time = n × T₁/₂ = 3 × 5730 years.',
    ],
    misconceptionIndex: 0,
  },
  // 9. Mean Life vs Half-Life Relationship (Foundation - Recall)
  {
    id: 'ch_09_mean_life_relation',
    nodeId: NODE_C12_PHY_124,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct mathematical relationship between mean life (τ) and half-life (T₁/₂) for a radioactive substance?',
    options: [
      'τ = T₁/₂ / 0.693 = 1.44 × T₁/₂',
      'τ = 0.693 × T₁/₂',
      'τ = (T₁/₂)² / 2',
      'τ = T₁/₂ / 2',
    ],
    correctIndex: 0,
    explanation: 'Since T₁/₂ = (ln 2)/λ = 0.693/λ and mean life τ = 1/λ, we have τ = T₁/₂ / 0.693 ≈ 1.443 × T₁/₂. The average lifetime is longer than the median half-life.',
    hints: [
      'Half-life is the median time, whereas mean life is the statistical average across the long exponential tail.',
      'Recall that ln(2) ≈ 0.693, and 1 / 0.693 ≈ 1.44.',
      'Therefore, τ = 1.44 × T₁/₂.',
    ],
  },
  // 10. Drag-Sort: Radioactive Decay Investigation Steps (Standard - Analysis)
  {
    id: 'ch_10_decay_sort',
    nodeId: NODE_C12_PHY_124,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the scientific steps required to determine the half-life of a radioactive sample experimentally from laboratory data.',
    sortItems: [
      'Measure background radiation count with an empty chamber',
      'Record sample count rate (activity) at successive regular time intervals',
      'Subtract background count to obtain net activity A(t)',
      'Plot ln(A) versus time t and calculate decay constant λ from the slope',
      'Compute half-life using T₁/₂ = 0.693 / λ',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'One must first quantify background noise, record sample counts, compute net activity, perform linear regression on ln(A) vs t to extract the slope -λ, and finally calculate T₁/₂.',
    hints: [
      'Always start by zeroing/measuring background noise before sample measurement.',
      'After recording raw counts, compute net counts before taking logarithms.',
      'The linear slope of ln(A) gives -λ, which yields T₁/₂ = 0.693 / λ.',
    ],
  },
  // 11. Transistor Structure & Doping Levels (Foundation - Understanding)
  {
    id: 'ch_11_transistor_doping',
    nodeId: NODE_C12_PHY_125,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a junction transistor (BJT), how do the three regions compare in doping concentration and physical geometry?',
    options: [
      'Emitter: heavily doped & medium size; Base: very thin & lightly doped; Collector: moderately doped & largest size',
      'Base: heavily doped & largest size; Emitter: thin & lightly doped; Collector: medium',
      'All three regions have identical doping and identical dimensions for symmetry',
      'Collector: heavily doped & narrowest; Base: thick & moderately doped; Emitter: large',
    ],
    correctIndex: 0,
    explanation: 'The emitter is heavily doped to inject numerous carriers. The base is extremely thin and lightly doped to minimize recombination (keeping base current low). The collector is large to dissipate heat and moderately doped.',
    hints: [
      'Which terminal supplies charge carriers into the structure? It must have the most doping.',
      'Why is the base kept very thin? To ensure 95-99% of injected carriers diffuse straight across.',
      'Why is the collector physically the largest? To conduct away heat generated by collector dissipation.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Transistor Current Identity Application (Foundation - Application)
  {
    id: 'ch_12_transistor_current_calc',
    nodeId: NODE_C12_PHY_125,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'For an n-p-n transistor in the active amplifying region, the emitter current is IE = 8.40 mA and the base current is IB = 0.08 mA. Compute the collector current IC in mA.',
    correctAnswer: 8.32,
    tolerance: 0.02,
    unit: 'mA',
    explanation: 'By Kirchhoff’s Current Law applied to the transistor junction node: IE = IB + IC, hence IC = IE - IB = 8.40 mA - 0.08 mA = 8.32 mA.',
    hints: [
      'Remember the fundamental current equation: IE = IB + IC.',
      'Subtract base current IB from emitter current IE.',
      '8.40 - 0.08 = 8.32 mA.',
    ],
  },
  // 13. CE Transistor Amplifier Phase Inversion (Standard - Understanding)
  {
    id: 'ch_13_ce_phase_inversion',
    nodeId: NODE_C12_PHY_126,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does a common-emitter (CE) voltage amplifier produce an output voltage that is 180° out of phase with the input signal?',
    options: [
      'As base voltage Vin rises, IB and IC increase, causing a larger drop across RL, which lowers Vce = Vcc - IC·RL',
      'The transistor reverses the direction of magnetic fields inside the silicon substrate',
      'The AC input frequency doubles inside the depletion region, inverting the waveform',
      'Thermal noise at the emitter resistor delays the signal by half a cycle',
    ],
    correctIndex: 0,
    explanation: 'When input Vbe rises, forward bias increases, driving higher IC. Since Vout = Vce = Vcc - IC·RL, the increased drop across RL causes the collector potential to drop, creating a 180° phase inversion.',
    hints: [
      'Trace the loop equation at the output: Vce = Vcc - IC·RL.',
      'When Vin goes positive, does IC increase or decrease?',
      'If IC increases, the voltage subtracted from Vcc increases, pulling Vce downward.',
    ],
    misconceptionIndex: 1,
  },
  // 14. CE Amplifier Voltage Gain Calculation (Advanced - Application)
  {
    id: 'ch_14_ce_gain_calc',
    nodeId: NODE_C12_PHY_126,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A common-emitter amplifier has current gain β = 120, input resistance rin = 1.5 kΩ (1500 Ω), and load resistance RL = 6.0 kΩ (6000 Ω). Calculate the magnitude of the voltage gain |Av|.',
    correctAnswer: 480,
    tolerance: 5,
    unit: '',
    explanation: '|Av| = β × (RL / rin) = 120 × (6000 / 1500) = 120 × 4 = 480.',
    hints: [
      'Voltage gain magnitude in CE configuration is given by |Av| = β × (RL / rin).',
      'Compute the resistance ratio: RL / rin = 6000 / 1500 = 4.',
      'Multiply by β: 120 × 4 = 480.',
    ],
  },
  // 15. Logic Gate Truth Table Identification (Foundation - Recall)
  {
    id: 'ch_15_logic_nand_table',
    nodeId: NODE_C12_PHY_127,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A two-input logic gate produces an output Y = 0 ONLY when both inputs A = 1 and B = 1. For all other combinations (00, 01, 10), Y = 1. Which gate is this?',
    options: [
      'NAND gate (Y = (A · B)′)',
      'NOR gate (Y = (A + B)′)',
      'AND gate (Y = A · B)',
      'XOR gate (Y = A ⊕ B)',
    ],
    correctIndex: 0,
    explanation: 'A NAND gate is an AND gate followed by a NOT inversion: Y = (A · B)′. It outputs 1 for (0,0), (0,1), (1,0) and outputs 0 only for (1,1).',
    hints: [
      'AND gives 1 only when both are 1. What does NOT-AND (NAND) give?',
      'Inverting {0, 0, 0, 1} yields {1, 1, 1, 0}.',
      'The gate is NAND.',
    ],
  },
  // 16. Construct OR Gate from NANDs (Standard - Creativity)
  {
    id: 'ch_16_construct_or_from_nand',
    nodeId: NODE_C12_PHY_128,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the Boolean stages using De Morgan’s theorem to synthesize an OR gate (Y = A + B) using only NAND operations.',
    availableParts: ['A′ = (A·A)′', 'B′ = (B·B)′', 'Y = (A′·B′)′', 'Y = (A+B)′', 'A·B'],
    targetState: "A′ = (A·A)′ B′ = (B·B)′ Y = (A′·B′)′",
    validationHint: 'Invert input A using a NAND, invert input B using a NAND, then combine both inverted inputs with a 3rd NAND.',
    explanation: 'By De Morgan’s Law, A + B = ((A + B)′)′ = (A′ · B′)′. Inverting A with NAND-1 gives A′, inverting B with NAND-2 gives B′, and feeding A′ and B′ into NAND-3 yields (A′ · B′)′ = A + B.',
    hints: [
      'Remember De Morgan’s identity: A + B = (A′ · B′)′.',
      'First step: invert A and B separately using NAND gates with tied inputs.',
      'Second step: feed those inverted outputs into a final NAND gate.',
    ],
  },
  // 17. Half-Adder Logic Outputs (Standard - Analysis)
  {
    id: 'ch_17_half_adder_analysis',
    nodeId: NODE_C12_PHY_128,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A digital computer arithmetic half-adder module processes binary inputs A = 1 and B = 1. What are the Sum (S) and Carry (C) outputs?',
    options: [
      'Sum S = 0, Carry C = 1 (since 1 + 1 = 10₂ in binary)',
      'Sum S = 1, Carry C = 1',
      'Sum S = 1, Carry C = 0',
      'Sum S = 0, Carry C = 0',
    ],
    correctIndex: 0,
    explanation: 'In a half-adder: Sum = A ⊕ B (XOR), Carry = A · B (AND). For A=1, B=1: Sum = 1 ⊕ 1 = 0, Carry = 1 · 1 = 1.',
    hints: [
      'Binary addition of 1 + 1 equals 2 in decimal, which is binary "10".',
      'The least significant bit is the Sum (0), and the next bit is the Carry (1).',
      'Sum uses XOR (1 ⊕ 1 = 0) and Carry uses AND (1 · 1 = 1).',
    ],
  },
  // 18. Communication System Antenna Length (Standard - Application)
  {
    id: 'ch_18_antenna_length_calc',
    nodeId: NODE_C12_PHY_129,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An All India Radio transmitter broadcasts an AM carrier at frequency f = 1.5 MHz (1.5 × 10⁶ Hz). Calculate the optimal quarter-wavelength (λ/4) antenna length in meters. (c = 3.0 × 10⁸ m/s)',
    correctAnswer: 50,
    tolerance: 1,
    unit: 'm',
    explanation: 'Wavelength λ = c / f = (3.0 × 10⁸ m/s) / (1.5 × 10⁶ Hz) = 200 m. The quarter-wave antenna length L = λ / 4 = 200 / 4 = 50 m.',
    hints: [
      'First find wavelength λ = c / f.',
      'λ = (3 × 10⁸) / (1.5 × 10⁶) = 200 m.',
      'Quarter-wave antenna length is λ / 4 = 200 / 4 = 50 m.',
    ],
  },
  // 19. AM vs FM Modulation Distinctions (Standard - Evaluation)
  {
    id: 'ch_19_am_fm_evaluation',
    nodeId: NODE_C12_PHY_129,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is Frequency Modulation (FM, 88-108 MHz) inherently less noisy and clearer than Amplitude Modulation (AM, 540-1600 kHz) in urban environments?',
    options: [
      'Natural atmospheric and electrical interference predominantly disrupts signal amplitude; FM demodulators ignore amplitude variations by clipping them',
      'FM signals travel faster than the speed of light in terrestrial atmosphere',
      'AM radio waves cannot travel through air without copper guide wires',
      'FM transmits audio entirely without carrier electromagnetic waves',
    ],
    correctIndex: 0,
    explanation: 'Electrical lightning, appliance sparks, and power line noise corrupt amplitude. In FM, the information is encoded purely in instantaneous frequency shifts while amplitude is fixed; amplitude limiters in the FM receiver easily reject noise spikes.',
    hints: [
      'Think about what property of a wave is disturbed by electrical sparks and lightning crackle: amplitude or frequency?',
      'In FM, carrier amplitude is constant and variations in amplitude are clipped off at the receiver.',
      'Because information is held in frequency deviations, amplitude noise is discarded.',
    ],
    misconceptionIndex: 0,
  },
  // 20. Malus’s Law 2-Polarizer Calculation (Standard - Application)
  {
    id: 'ch_20_malus_two_polarizer',
    nodeId: NODE_C12_PHY_130,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Unpolarized light of intensity I_unpol = 32.0 W/m² passes through a polarizer, and then through an analyzer whose transmission axis is oriented at θ = 60° relative to the polarizer. Calculate the final transmitted intensity in W/m².',
    correctAnswer: 4.0,
    tolerance: 0.2,
    unit: 'W/m²',
    explanation: 'Step 1: After 1st polarizer, unpolarized light is halved: I₀ = 32 / 2 = 16 W/m². Step 2: By Malus’s Law, I = I₀ · cos²(60°) = 16 · (1/2)² = 16 · 0.25 = 4.0 W/m².',
    hints: [
      'Do not forget the factor of 1/2 when unpolarized light enters the first polarizer: I₀ = I_unpol / 2.',
      'I₀ = 32 / 2 = 16 W/m².',
      'Now apply Malus’s law: I = I₀ cos²(60°). cos(60°) = 0.5, so cos²(60°) = 0.25.',
    ],
    misconceptionIndex: 0,
  },
  // 21. Three-Polarizer Crossed Paradox (Advanced - Analysis)
  {
    id: 'ch_21_three_polarizer_crossed',
    nodeId: NODE_C12_PHY_130,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two polarizers P₁ and P₃ are crossed at 90°, transmitting zero light. A third polarizer P₂ is inserted between them at an angle of 45° to both. What fraction of incident unpolarized light (I_unpol) now emerges from P₃?',
    options: [
      '1/8 (12.5%) of I_unpol',
      '0% — crossed polarizers always block 100% of light regardless of intermediate sheets',
      '1/2 (50%) of I_unpol',
      '1/4 (25%) of I_unpol',
    ],
    correctIndex: 0,
    explanation: 'After P₁: I₁ = I_unpol / 2. After P₂ at 45°: I₂ = I₁ · cos²(45°) = (I_unpol / 2) · (1/2) = I_unpol / 4. After P₃ at 45° to P₂: I₃ = I₂ · cos²(45°) = (I_unpol / 4) · (1/2) = I_unpol / 8 = 0.125 · I_unpol.',
    hints: [
      'Calculate step-by-step: each polarizer re-polarizes light along its own transmission axis.',
      'The angle between P₁ and P₂ is 45° (factor of cos²45° = 1/2).',
      'The angle between P₂ and P₃ is also 45° (another factor of cos²45° = 1/2). Total = (1/2) × (1/2) × (1/2) = 1/8.',
    ],
    misconceptionIndex: 1,
  },
  // 22. Transverse Nature Proof (Foundation - Recall)
  {
    id: 'ch_22_transverse_proof',
    nodeId: NODE_C12_PHY_130,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which optical phenomenon provides definitive, unambiguous experimental proof that light waves are transverse rather than longitudinal?',
    options: [
      'Polarization (only transverse oscillations perpendicular to propagation can be restricted to a plane)',
      'Refraction through a glass prism',
      'Interference fringes in Young’s double slit experiment',
      'Total internal reflection in an optical fiber',
    ],
    correctIndex: 0,
    explanation: 'Interference and diffraction occur in all wave types (including longitudinal sound waves). Only transverse waves have electric field oscillations perpendicular to travel that can be selectively transmitted or blocked by polarization.',
    hints: [
      'Sound waves (longitudinal) also undergo interference, diffraction, and refraction.',
      'What phenomenon is impossible for sound waves in air?',
      'Polarization requires oscillations in a transverse plane.',
    ],
    misconceptionIndex: 2,
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
  nodeId: NODE_C12_PHY_121,
  title: 'Semiconductor Electronics & Modern Physics Lab',
  definition: 'A comprehensive interactive suite exploring Zener diodes, voltage regulation, nuclear decay laws, junction transistors, logic gate combinations, telecommunication modulation, and Malus polarization.',
  eli5: 'Explore how microscopic quantum effects inside tiny semiconductor crystals regulate spaceships, amplify sound, perform binary logic, and polarize cosmic light!',
  misconceptions: [
    {
      misconception: 'A Zener diode regulates voltage when forward-biased.',
      correction: 'A Zener diode acts like an ordinary diode in forward bias (0.7 V drop); its voltage regulation and clamping occur strictly in reverse breakdown.',
    },
    {
      misconception: 'The series resistor Rs in a Zener circuit is optional.',
      correction: 'Without Rs, surging supply voltages would drive infinite current through the Zener diode and destroy it by thermal runaway.',
    },
    {
      misconception: 'Alpha particles penetrate through heavy lead shielding.',
      correction: 'Alpha particles have very high ionizing power but are stopped by a sheet of paper; only energetic gamma rays require dense lead shielding.',
    },
    {
      misconception: 'A CE amplifier output is in phase with its input.',
      correction: 'The common-emitter amplifier inverts the signal by 180° because higher input voltage increases collector current and drops Vce.',
    },
    {
      misconception: 'Longitudinal waves like sound can be polarized.',
      correction: 'Only transverse waves with oscillations perpendicular to propagation can be polarized; longitudinal compressions cannot be polarized.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary role of a Zener diode in reverse breakdown?', options: ['Rectify AC to DC', 'Maintain a constant output voltage', 'Emit visible laser light', 'Store electrostatic charge'], correctIndex: 1 },
    { question: 'What is the equation for radioactive decay half-life?', options: ['T₁/₂ = 0.693 / λ', 'T₁/₂ = λ / 0.693', 'T₁/₂ = 1 / λ²', 'T₁/₂ = 2.718 · λ'], correctIndex: 0 },
    { question: 'In an active n-p-n transistor, the emitter-base junction is:', options: ['Reverse biased', 'Forward biased', 'Zero biased', 'Breakdown biased'], correctIndex: 1 },
    { question: 'Which logic gate is universal?', options: ['AND', 'OR', 'NAND', 'XOR'], correctIndex: 2 },
    { question: 'According to Malus’s Law, transmitted intensity I is proportional to:', options: ['cos(θ)', 'cos²(θ)', 'sin(θ)', 'tan²(θ)'], correctIndex: 1 },
    { question: 'In beta-minus decay, atomic number Z:', options: ['Decreases by 2', 'Increases by 1', 'Remains unchanged', 'Decreases by 1'], correctIndex: 1 },
    { question: 'Why is modulation necessary in communication?', options: ['To reduce antenna size and enable multiplexing', 'To change light speed', 'To convert digital to analog sound', 'To heat the atmosphere'], correctIndex: 0 },
    { question: 'What is the sum output of a half-adder for inputs (1, 0)?', options: ['0', '1', '10', 'Undefined'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate deep conceptual mastery of semiconductor devices, nuclear decay laws, digital logic combinations, communication modulation, and wave polarization.',
};

// ─── EXPLORATION STEPS (Brilliant.org style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Zener Reverse Breakdown V-I Curve',
    instruction: 'Adjust the reverse voltage slider to drive the diode into the sharp breakdown knee region and observe voltage clamping.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_121,
  },
  {
    title: 'Lab 2: Dynamic Voltage Regulator Circuit',
    instruction: 'Vary the unregulated input voltage (Vi) and load current (IL) to verify how the Zener absorbs surplus current while keeping Vout rock steady at 5.1 V.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_122,
  },
  {
    title: 'Lab 3: Radioactive Exponential Decay & Half-Life',
    instruction: 'Advance the elapsed time clock to watch radioactive nuclei decay spontaneously and witness the remaining fraction halve every T₁/₂.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_124,
  },
  {
    title: 'Lab 4: Common-Emitter Amplifier & 180° Inversion',
    instruction: 'Modify base input signal amplitude to see amplified collector current and inverted AC output waveform in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_126,
  },
  {
    title: 'Lab 5: Optical Polarization & Malus’s Law Analyzer',
    instruction: 'Rotate the optical analyzer angle (θ) from 0° to 90° and observe real-time cosine-squared intensity attenuation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_130,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the input surge voltage to a 5.1 V Zener regulator rises from 10 V to 18 V, what will happen to the Zener current Iz and load voltage Vout?',
    options: [
      'Iz rises sharply to drop the extra voltage across Rs, while Vout stays tightly clamped at 5.1 V',
      'Both Iz and Vout increase proportionally to 18 V',
      'Iz drops to zero and Vout collapses to 0 V',
      'Vout increases to 9.2 V while Iz stays fixed at 0 mA',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Unregulated Voltage slider to 18 V and watch the Iz meter jump while Vout stays at 5.1 V!',
    nodeId: NODE_C12_PHY_122,
  },
  {
    question: 'Predict: If two polarizers are set with an analyzer angle of θ = 60° to the polarizer axis, what percentage of the polarized beam will pass through?',
    options: [
      '25% (since cos(60°) = 0.5, so cos²(60°) = 0.25)',
      '50% (since 60° / 120° = 0.5)',
      '75% (since sin²(60°) = 0.75)',
      '0% (all light is blocked beyond 45°)',
    ],
    correctIndex: 0,
    verifyInstruction: 'Set the Analyzer Angle slider to 60° and observe the transmitted power gauge drop to 25%!',
    nodeId: NODE_C12_PHY_130,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the slope of the Zener V-I characteristic once the reverse voltage surpasses Vz = 5.1 V?',
    observableOptions: [
      'The curve turns sharply downward and becomes nearly vertical (very low dynamic resistance ΔV/ΔI)',
      'The curve flattens horizontally to zero current',
      'The voltage increases exponentially while current remains at 0 mA',
      'The line mirrors Ohm’s law with a constant positive resistance slope',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_121,
  },
  {
    question: 'What happens to the remaining active nuclei count when elapsed time t moves from 1 half-life (5730 yr) to 2 half-lives (11,460 yr)?',
    observableOptions: [
      'It drops from 50% to 25% (it halves again, rather than dropping to zero)',
      'It reaches 0% completely',
      'It increases back to 100% due to thermal regeneration',
      'It remains constant at 50%',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_124,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Payload Power & Sensor Architecture Challenge',
  description: 'Apply your modern physics and semiconductor knowledge to configure telemetry modules for a satellite sensor package orbiting Mars.',
  steps: [
    'Design a 5.1 V Zener protection stage for solar array voltage spikes up to 24 V.',
    'Select radioactive thermal power isotopes based on decay constant and half-life.',
    'Configure universal NAND gate arrays to implement error-detecting parity checks.',
    'Align optical Polaroid filters on satellite cameras to extinguish planetary glare using Malus’s law.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export default function C12_PhysicsZenerDiodeSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_121,
  title = DEFAULT_PROPS.title || 'Physics Modern Electronics Lab',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // ─── LAB SIMULATION STATE VARIABLES (30+ states) ───
  // Lab 1: Zener V-I
  const [zenerAppliedVoltage, setZenerAppliedVoltage] = useState(0); // -8V to +2V
  const [zenerDopingLevel, setZenerDopingLevel] = useState<'heavy' | 'light'>('heavy');

  // Lab 2: Regulator Circuit
  const [regulatorVi, setRegulatorVi] = useState(12.0); // 8V - 20V
  const [regulatorRs, setRegulatorRs] = useState(100); // 50 - 300 ohms
  const [regulatorRL, setRegulatorRL] = useState(200); // 50 - 1000 ohms
  const [regulatorVz] = useState(5.1);

  // Lab 3: Radioactive Decay
  const [decayTimeYears, setDecayTimeYears] = useState(0); // 0 to 25000 yrs
  const [initialNucleiCount] = useState(1000);
  const [selectedIsotope, setSelectedIsotope] = useState<'C14' | 'Ra226' | 'Tc99m'>('C14');

  // Lab 4: Transistor Amplifier
  const [transistorVinPeak, setTransistorVinPeak] = useState(10); // mV
  const [transistorBeta, setTransistorBeta] = useState(100);
  const [transistorRL, setTransistorRL] = useState(4.0); // kOhms
  const [transistorRin] = useState(1.0); // kOhms
  const [transistorVcc] = useState(12.0); // V

  // Lab 5: Polarization & Malus
  const [polarizerAngleDeg, setPolarizerAngleDeg] = useState(0);
  const [analyzerAngleDeg, setAnalyzerAngleDeg] = useState(45);
  const [inputIntensityW, setInputIntensityW] = useState(100);
  const [hasIntermediatePolarizer, setHasIntermediatePolarizer] = useState(false);
  const [intermediateAngleDeg, setIntermediateAngleDeg] = useState(45);

  // Logic Gate Interactive Sandbox
  const [logicInputA, setLogicInputA] = useState<0 | 1>(0);
  const [logicInputB, setLogicInputB] = useState<0 | 1>(0);
  const [selectedLogicGate, setSelectedLogicGate] = useState<'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR'>('NAND');

  // ─── SRS & BKT ADAPTIVE MASTERY ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // ─── CHALLENGE ENGINE STATES ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge Drag & Drop / Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery & Feedback State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // 2D Canvas & Auto-Hint Timer Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── REAL-TIME COMPUTATIONS ───

  // 1. Zener V-I Characteristic model
  const zenerCurrent = useMemo(() => {
    const V = zenerAppliedVoltage;
    if (V > 0.7) {
      // Forward bias
      return (V - 0.7) * 40; // mA
    } else if (V >= -5.1) {
      // Reverse leakage
      return -0.01 * Math.exp(Math.abs(V) / 2);
    } else {
      // Breakdown region: sharp vertical rise
      const excess = Math.abs(V) - 5.1;
      return -(0.05 + excess * 80); // mA
    }
  }, [zenerAppliedVoltage]);

  // 2. Regulator Circuit Currents & Voltages
  const regulatorCalculations = useMemo(() => {
    const Vi = regulatorVi;
    const Rs = regulatorRs;
    const RL = regulatorRL;
    const Vz = regulatorVz;

    // Check if supply is sufficient for breakdown
    const vThevenin = (Vi * RL) / (Rs + RL);
    if (vThevenin < Vz) {
      // Not in breakdown
      const Vout = vThevenin;
      const IL = (Vout / RL) * 1000; // mA
      const Is = IL;
      const Iz = 0;
      return { Vout, Is, IL, Iz, inBreakdown: false };
    } else {
      // In active regulation
      const Vout = Vz;
      const IL = (Vout / RL) * 1000; // mA
      const Is = ((Vi - Vz) / Rs) * 1000; // mA
      const Iz = Math.max(0, Is - IL);
      const inBreakdown = Iz >= 2.0; // minimum holding current threshold
      return { Vout, Is, IL, Iz, inBreakdown };
    }
  }, [regulatorVi, regulatorRs, regulatorRL, regulatorVz]);

  // 3. Radioactive Decay Calculations
  const decayCalculations = useMemo(() => {
    let halfLifeYears = 5730;
    if (selectedIsotope === 'Ra226') halfLifeYears = 1600;
    if (selectedIsotope === 'Tc99m') halfLifeYears = 0.000684; // 6 hours

    const lambda = 0.693147 / halfLifeYears;
    const remainingFraction = Math.exp(-lambda * decayTimeYears);
    const currentNuclei = Math.round(initialNucleiCount * remainingFraction);
    const halfLivesPassed = decayTimeYears / halfLifeYears;
    return { halfLifeYears, lambda, remainingFraction, currentNuclei, halfLivesPassed };
  }, [selectedIsotope, decayTimeYears, initialNucleiCount]);

  // 4. Transistor Amplifier Outputs
  const amplifierCalculations = useMemo(() => {
    const voltageGain = -transistorBeta * (transistorRL / transistorRin);
    const voutPeakV = (Math.abs(voltageGain) * (transistorVinPeak / 1000));
    const powerGain = transistorBeta * Math.abs(voltageGain);
    return { voltageGain, voutPeakV, powerGain };
  }, [transistorBeta, transistorRL, transistorRin, transistorVinPeak]);

  // 5. Malus Polarization Calculations
  const malusCalculations = useMemo(() => {
    const i0 = inputIntensityW / 2; // after 1st polarizer
    if (!hasIntermediatePolarizer) {
      const thetaRad = ((analyzerAngleDeg - polarizerAngleDeg) * Math.PI) / 180;
      const transmitted = i0 * Math.pow(Math.cos(thetaRad), 2);
      return { i0, transmitted, percentage: (transmitted / inputIntensityW) * 100 };
    } else {
      const theta1Rad = ((intermediateAngleDeg - polarizerAngleDeg) * Math.PI) / 180;
      const iMid = i0 * Math.pow(Math.cos(theta1Rad), 2);
      const theta2Rad = ((analyzerAngleDeg - intermediateAngleDeg) * Math.PI) / 180;
      const transmitted = iMid * Math.pow(Math.cos(theta2Rad), 2);
      return { i0, transmitted, percentage: (transmitted / inputIntensityW) * 100 };
    }
  }, [inputIntensityW, polarizerAngleDeg, analyzerAngleDeg, hasIntermediatePolarizer, intermediateAngleDeg]);

  // 6. Logic Gate output
  const logicOutput = useMemo(() => {
    const A = logicInputA;
    const B = logicInputB;
    switch (selectedLogicGate) {
      case 'AND': return (A && B) ? 1 : 0;
      case 'OR': return (A || B) ? 1 : 0;
      case 'NOT': return A ? 0 : 1;
      case 'NAND': return !(A && B) ? 1 : 0;
      case 'NOR': return !(A || B) ? 1 : 0;
      case 'XOR': return (A !== B) ? 1 : 0;
      default: return 0;
    }
  }, [logicInputA, logicInputB, selectedLogicGate]);

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS ANIMATION EFFECT (CE Amplifier Waveforms) ───
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const midY1 = h * 0.3;
      const midY2 = h * 0.75;

      // Draw Grid / Centerlines
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY1);
      ctx.lineTo(w, midY1);
      ctx.moveTo(0, midY2);
      ctx.lineTo(w, midY2);
      ctx.stroke();

      // Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Input Signal Vin (${transistorVinPeak} mV peak)`, 10, midY1 - 18);

      ctx.fillStyle = '#f43f5e';
      ctx.fillText(`Output Signal Vout (${amplifierCalculations.voutPeakV.toFixed(2)} V peak, 180° Inverted)`, 10, midY2 - 18);

      // Draw Input Waveform (Sine)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = midY1 - Math.sin((x * 0.04) + time) * 14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Output Waveform (180° Inverted Sine, larger amplitude)
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        // -Math.sin creates the 180 degree phase shift
        const y = midY2 - (-Math.sin((x * 0.04) + time)) * 24;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [transistorVinPeak, amplifierCalculations]);

  // ─── CANVAS ANIMATION EFFECT (Challenge Indicator Pulse) ───
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6366f1';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Quantum Diagnostics Node: ${challenge.nodeId}`, 10, 18);

      // Pulsing telemetry status dot
      const rad = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 14, rad, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, challenge]);

  // ─── 14+ USECALLBACK EVENT HANDLERS ───

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction! Let us examine why in the laboratory.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Modern Physics Exploration Suite. Manipulate the physical variables to discover core principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You have entered free sandbox mode. Test any configuration without scoring pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission diagnostic initiated. Solve the engineering challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction logged! Now adjust the control slider to check the telemetry.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation!' : 'Look closely at the graphical readouts.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
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
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission diagnostic accomplished! You scored ${finalScore} percent.`);
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Telemetry verified.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us review the underlying physics principles.');
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

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER JSX ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans selection:bg-cyan-500 selection:text-black">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 20, scale: 1.15 }}
            className="text-3xl p-2 bg-cyan-950/60 rounded-xl border border-cyan-700/50"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">Class 12 Physics (ISC / CISCE) • Modern Physics & Solid State</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            }`}
          >
            {difficulty} Tier
          </motion.span>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mastery: {masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg"
          >
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-2">
              <span>🚀</span>
              <span>Mission Narrative Scenario</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-3 italic">{SCENARIO.context}</p>
          </motion.div>

          {/* Interactive Curiosity Test Bench */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Discovery Question • Low-Stakes Intuition Check
              </span>
              <span className="text-xs text-slate-500">Not Graded</span>
            </div>

            <p className="text-white text-base md:text-lg font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  aria-label={`Option ${idx + 1}: ${option}`}
                  className={`p-4 text-left rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-cyan-500/50'
                  }`}
                >
                  <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! In reverse breakdown, a Zener diode clamps voltage at Vz while Rs drops the surplus.'
                    : '⚡ Insight: ' + DISCOVERY_QUESTION.hintAfter}
                </p>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20"
                >
                  Enter Visual Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (Brilliant.org Style Guided Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                Interactive Concept Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-amber-300/90 text-sm font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl"
            >
              {/* SLIDE 0: Zener V-I Characteristics */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Controls */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <label className="text-xs font-bold text-slate-300 uppercase block">
                        Applied Voltage V: <span className="text-cyan-400 text-sm font-mono">{zenerAppliedVoltage.toFixed(2)} V</span>
                      </label>
                      <input
                        type="range"
                        min={-8.0}
                        max={1.5}
                        step={0.1}
                        value={zenerAppliedVoltage}
                        onChange={(e) => {
                          setZenerAppliedVoltage(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set Zener Applied Voltage"
                        className="w-full accent-cyan-400 cursor-pointer"
                      />

                      <div className="p-3 bg-slate-900 rounded-lg space-y-1 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Operating Mode:</span>
                          <span className={`font-bold ${
                            zenerAppliedVoltage < -5.1 ? 'text-rose-400' : zenerAppliedVoltage > 0.7 ? 'text-emerald-400' : 'text-slate-300'
                          }`}>
                            {zenerAppliedVoltage < -5.1 ? 'Reverse Breakdown' : zenerAppliedVoltage > 0.7 ? 'Forward Conduction' : 'Reverse Leakage'}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Diode Current I:</span>
                          <span className="text-cyan-300 font-mono font-bold">{zenerCurrent.toFixed(2)} mA</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Zener Voltage Vz:</span>
                          <span className="text-amber-400 font-mono font-bold">5.10 V</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 leading-relaxed">
                        Notice how below <strong className="text-rose-300">-5.1 V</strong>, the reverse current plunges vertically while the voltage is firmly pinned!
                      </div>
                    </div>

                    {/* SVG V-I Graph */}
                    <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 450 260" className="w-full h-auto max-h-[260px]">
                        {/* Axes */}
                        <line x1="225" y1="20" x2="225" y2="240" stroke="#475569" strokeWidth="1.5" />
                        <line x1="20" y1="130" x2="430" y2="130" stroke="#475569" strokeWidth="1.5" />

                        {/* Labels */}
                        <text x="420" y="122" fill="#94a3b8" fontSize="11" textAnchor="end">+V (Forward Volts)</text>
                        <text x="25" y="122" fill="#94a3b8" fontSize="11">-V (Reverse Volts)</text>
                        <text x="235" y="30" fill="#94a3b8" fontSize="11">+I (mA)</text>
                        <text x="235" y="235" fill="#94a3b8" fontSize="11">-I (mA)</text>

                        {/* Vz Marker */}
                        <line x1="90" y1="125" x2="90" y2="135" stroke="#f59e0b" strokeWidth="2" />
                        <text x="90" y="148" fill="#f59e0b" fontSize="10" textAnchor="middle">-Vz (5.1 V)</text>

                        {/* Characteristic Curve */}
                        {/* Forward quadrant (225,130) -> (260,130) -> (300, 30) */}
                        <path
                          d="M 60 220 L 90 135 Q 120 131 225 130 Q 255 130 260 125 Q 275 90 300 30"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="3"
                        />

                        {/* Current Operating Point Dot */}
                        {(() => {
                          let cx = 225 + zenerAppliedVoltage * 45;
                          let cy = 130 - (zenerCurrent * 2.5);
                          cx = Math.max(30, Math.min(410, cx));
                          cy = Math.max(30, Math.min(230, cy));
                          return (
                            <g>
                              <circle cx={cx} cy={cy} r="6" fill="#f43f5e" className="animate-ping opacity-75" />
                              <circle cx={cx} cy={cy} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                            </g>
                          );
                        })()}
                      </svg>
                      <span className="text-xs text-slate-500 mt-1">Real-Time V-I Dynamic Characteristic Curve</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Zener Regulator Circuit Lab */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Predict Then Check */}
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/60">
                      <p className="text-white text-sm font-semibold mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200 border border-slate-700"
                          >
                            <span className="text-cyan-400 font-bold mr-1">{i + 1}.</span> {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Controls */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300">
                          <span>Unregulated Input Vi:</span>
                          <span className="text-cyan-400 font-mono">{regulatorVi.toFixed(1)} V</span>
                        </div>
                        <input
                          type="range"
                          min={8}
                          max={22}
                          step={0.5}
                          value={regulatorVi}
                          onChange={(e) => {
                            setRegulatorVi(parseFloat(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300">
                          <span>Series Resistor Rs:</span>
                          <span className="text-indigo-400 font-mono">{regulatorRs} Ω</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={300}
                          step={10}
                          value={regulatorRs}
                          onChange={(e) => {
                            setRegulatorRs(parseInt(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300">
                          <span>Load Resistor RL:</span>
                          <span className="text-purple-400 font-mono">{regulatorRL} Ω</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={600}
                          step={25}
                          value={regulatorRL}
                          onChange={(e) => {
                            setRegulatorRL(parseInt(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-purple-400 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Circuit Schematic & Meter Readouts */}
                    <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      {/* Telemetry Gauges */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="p-2.5 bg-slate-900 rounded-lg text-center border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">Output Vout</span>
                          <span className="text-lg font-bold font-mono text-emerald-400">{regulatorCalculations.Vout.toFixed(2)} V</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-center border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">Supply Is</span>
                          <span className="text-lg font-bold font-mono text-cyan-400">{regulatorCalculations.Is.toFixed(1)} mA</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-center border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">Zener Iz</span>
                          <span className="text-lg font-bold font-mono text-amber-400">{regulatorCalculations.Iz.toFixed(1)} mA</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-center border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">Load IL</span>
                          <span className="text-lg font-bold font-mono text-purple-400">{regulatorCalculations.IL.toFixed(1)} mA</span>
                        </div>
                      </div>

                      {/* Schematic SVG */}
                      <svg viewBox="0 0 420 180" className="w-full h-auto">
                        {/* Wires */}
                        <path d="M 40 40 L 120 40 M 180 40 L 260 40 L 360 40 L 360 140 L 40 140 Z" fill="none" stroke="#64748b" strokeWidth="2.5" />
                        <line x1="260" y1="40" x2="260" y2="140" stroke="#64748b" strokeWidth="2" />

                        {/* Vi Source */}
                        <circle cx="40" cy="90" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="40" y="94" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Vi</text>

                        {/* Rs Resistor */}
                        <rect x="120" y="28" width="60" height="24" rx="4" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                        <text x="150" y="44" fill="#ffffff" fontSize="10" textAnchor="middle">Rs ({regulatorRs}Ω)</text>

                        {/* Zener Diode Symbol in Reverse Bias */}
                        <g transform="translate(260, 90)">
                          <polygon points="0,18 -14,-6 14,-6" fill="#f59e0b" />
                          <line x1="-16" y1="18" x2="16" y2="18" stroke="#f59e0b" strokeWidth="2.5" />
                          {/* Z-Cathode bent wings */}
                          <line x1="-16" y1="18" x2="-16" y2="12" stroke="#f59e0b" strokeWidth="2.5" />
                          <line x1="16" y1="18" x2="16" y2="24" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="24" y="6" fill="#f59e0b" fontSize="10">Vz (5.1V)</text>
                        </g>

                        {/* RL Load */}
                        <rect x="345" y="65" width="30" height="50" rx="4" fill="#4c1d95" stroke="#a78bfa" strokeWidth="2" />
                        <text x="360" y="93" fill="#ffffff" fontSize="9" textAnchor="middle" transform="rotate(-90 360 93)">RL ({regulatorRL}Ω)</text>

                        {/* Vout Output terminals */}
                        <circle cx="395" cy="40" r="4" fill="#34d399" />
                        <circle cx="395" cy="140" r="4" fill="#34d399" />
                        <text x="410" y="94" fill="#34d399" fontSize="11" fontWeight="bold">Vout</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Radioactive Decay & Half-Life */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Controls */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Select Isotope</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['C14', 'Ra226', 'Tc99m'] as const).map((iso) => (
                            <motion.button
                              key={iso}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                setSelectedIsotope(iso);
                                setDecayTimeYears(0);
                                audioManager.play('tap');
                              }}
                              className={`py-1.5 px-2 rounded-lg text-xs font-bold border ${
                                selectedIsotope === iso
                                  ? 'bg-cyan-600 border-cyan-400 text-white'
                                  : 'bg-slate-800 border-slate-700 text-slate-400'
                              }`}
                            >
                              {iso === 'C14' ? '¹⁴C' : iso === 'Ra226' ? '²²⁶Ra' : '⁹⁹ᵐTc'}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Elapsed Time:</span>
                          <span className="text-cyan-400 font-mono">
                            {selectedIsotope === 'Tc99m'
                              ? `${(decayTimeYears * 365 * 24).toFixed(1)} hrs`
                              : `${Math.round(decayTimeYears)} yrs`}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={selectedIsotope === 'C14' ? 25000 : selectedIsotope === 'Ra226' ? 8000 : 0.0035}
                          step={selectedIsotope === 'C14' ? 250 : selectedIsotope === 'Ra226' ? 100 : 0.00005}
                          value={decayTimeYears}
                          onChange={(e) => {
                            setDecayTimeYears(parseFloat(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-slate-400">
                          <span>Half-Life T₁/₂:</span>
                          <span className="text-amber-400 font-bold">
                            {selectedIsotope === 'Tc99m' ? '6.0 hrs' : `${decayCalculations.halfLifeYears} yrs`}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Half-Lives Elapsed (n):</span>
                          <span className="text-cyan-300 font-bold">{decayCalculations.halfLivesPassed.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Active Nuclei (N/N₀):</span>
                          <span className="text-emerald-400 font-bold">
                            {(decayCalculations.remainingFraction * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Decay Particle Grid */}
                    <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">
                          Nuclei Simulation: {decayCalculations.currentNuclei} of 1000 Undecayed
                        </span>
                        <span className="text-xs text-amber-400 font-mono">N = N₀ · e^(-λt)</span>
                      </div>

                      {/* Dot Matrix representing individual random atoms */}
                      <div className="grid grid-cols-25 gap-1 p-3 bg-slate-900/60 rounded-xl max-h-[160px] overflow-hidden">
                        {Array.from({ length: 150 }).map((_, i) => {
                          const isDecayed = (i / 150) >= decayCalculations.remainingFraction;
                          return (
                            <motion.div
                              key={i}
                              initial={false}
                              animate={{
                                scale: isDecayed ? 0.7 : 1,
                                backgroundColor: isDecayed ? '#334155' : '#06b6d4',
                              }}
                              className="w-2.5 h-2.5 rounded-full"
                            />
                          );
                        })}
                      </div>

                      <div className="mt-3 p-2.5 bg-slate-900 rounded-lg flex items-center justify-between text-xs text-slate-400">
                        <span>● Blue = Parent Nucleus</span>
                        <span>● Slate = Daughter Nucleus</span>
                        <span className="text-cyan-300 font-bold">Statistical Law of Radioactive Decay</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Common-Emitter Amplifier */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Controls */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Input Signal Amplitude:</span>
                          <span className="text-cyan-400 font-mono">{transistorVinPeak} mV</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={25}
                          value={transistorVinPeak}
                          onChange={(e) => {
                            setTransistorVinPeak(parseInt(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Transistor Current Gain β:</span>
                          <span className="text-indigo-400 font-mono">{transistorBeta}</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={200}
                          step={10}
                          value={transistorBeta}
                          onChange={(e) => {
                            setTransistorBeta(parseInt(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Collector Load RL:</span>
                          <span className="text-purple-400 font-mono">{transistorRL.toFixed(1)} kΩ</span>
                        </div>
                        <input
                          type="range"
                          min={1.0}
                          max={8.0}
                          step={0.5}
                          value={transistorRL}
                          onChange={(e) => {
                            setTransistorRL(parseFloat(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-purple-400 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg space-y-1 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Voltage Gain Av:</span>
                          <span className="text-rose-400 font-mono font-bold">{amplifierCalculations.voltageGain.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Peak Output Vout:</span>
                          <span className="text-emerald-400 font-mono font-bold">{amplifierCalculations.voutPeakV.toFixed(2)} V</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Phase Relationship:</span>
                          <span className="text-amber-400 font-bold">180° Inverted</span>
                        </div>
                      </div>
                    </div>

                    {/* Waveform Canvas */}
                    <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <canvas ref={waveCanvasRef} width={420} height={200} className="w-full h-[200px] rounded-lg bg-slate-900" />
                      <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
                        <span className="text-cyan-400">● Base Input (mV)</span>
                        <span className="text-rose-400">● Collector Output (V, 180° Inverted)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Polarization & Malus’s Law */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Controls */}
                    <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Analyzer Angle θ:</span>
                          <span className="text-cyan-400 font-mono">{analyzerAngleDeg}°</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={90}
                          step={5}
                          value={analyzerAngleDeg}
                          onChange={(e) => {
                            setAnalyzerAngleDeg(parseInt(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg">
                        <span className="text-xs text-slate-300">Insert 3rd Polarizer (45°):</span>
                        <input
                          type="checkbox"
                          checked={hasIntermediatePolarizer}
                          onChange={(e) => {
                            setHasIntermediatePolarizer(e.target.checked);
                            audioManager.play('tap');
                          }}
                          className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-slate-400">
                          <span>Incident Unpolarized I_in:</span>
                          <span className="text-slate-200">{inputIntensityW} W/m²</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>After Polarizer 1 (I₀):</span>
                          <span className="text-cyan-300">{malusCalculations.i0} W/m² (50%)</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Final Transmitted I:</span>
                          <span className="text-emerald-400 font-bold">{malusCalculations.transmitted.toFixed(2)} W/m²</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Transmitted %:</span>
                          <span className="text-amber-400 font-bold">{malusCalculations.percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Polaroid Sheets Schematic */}
                    <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <svg viewBox="0 0 420 180" className="w-full h-auto">
                        {/* Light Beam Ray */}
                        <line x1="20" y1="90" x2="400" y2="90" stroke="#fef08a" strokeWidth={Math.max(1, (malusCalculations.transmitted / 100) * 12)} strokeOpacity="0.8" />

                        {/* Unpolarized Light Source */}
                        <circle cx="40" cy="90" r="16" fill="#fef08a" />
                        <text x="40" y="125" fill="#fef08a" fontSize="9" textAnchor="middle">Unpolarized</text>

                        {/* Polarizer 1 (Vertical 0°) */}
                        <g transform="translate(140, 45)">
                          <rect x="0" y="0" width="30" height="90" rx="4" fill="#0284c7" fillOpacity="0.7" stroke="#38bdf8" strokeWidth="2" />
                          <line x1="15" y1="10" x2="15" y2="80" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
                          <text x="15" y="105" fill="#38bdf8" fontSize="9" textAnchor="middle">P₁ (0°)</text>
                        </g>

                        {/* Optional Polarizer 2 (45°) */}
                        {hasIntermediatePolarizer && (
                          <g transform="translate(230, 45)">
                            <rect x="0" y="0" width="30" height="90" rx="4" fill="#6366f1" fillOpacity="0.7" stroke="#818cf8" strokeWidth="2" />
                            <line x1="5" y1="75" x2="25" y2="15" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
                            <text x="15" y="105" fill="#818cf8" fontSize="9" textAnchor="middle">P₂ (45°)</text>
                          </g>
                        )}

                        {/* Analyzer Polarizer (Rotatable θ) */}
                        <g transform={`translate(${hasIntermediatePolarizer ? 320 : 270}, 45)`}>
                          <rect x="0" y="0" width="30" height="90" rx="4" fill="#ec4899" fillOpacity="0.7" stroke="#f472b6" strokeWidth="2" />
                          {/* Rotated Axis Line */}
                          {(() => {
                            const rad = (analyzerAngleDeg * Math.PI) / 180;
                            const x1 = 15 - Math.sin(rad) * 35;
                            const y1 = 45 - Math.cos(rad) * 35;
                            const x2 = 15 + Math.sin(rad) * 35;
                            const y2 = 45 + Math.cos(rad) * 35;
                            return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeWidth="2.5" />;
                          })()}
                          <text x="15" y="105" fill="#f472b6" fontSize="9" textAnchor="middle">Analyzer ({analyzerAngleDeg}°)</text>
                        </g>
                      </svg>

                      <div className="p-2 bg-slate-900 rounded-lg text-xs text-center text-slate-400">
                        Malus’s Law: <span className="text-emerald-300 font-mono font-bold">I = I₀ · cos²(θ)</span> • Crossed Polarizers (90°) give I = 0 W/m²
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={handlePrevSlide}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-cyan-500/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-cyan-400">Free Sandbox & Logic Laboratory</h3>
              <p className="text-xs text-slate-400">Freely explore logic synthesis and power regulation before formal challenges.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logic Gate Interactive Workbench */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Digital Logic Gate Simulator
              </span>

              <div className="flex flex-wrap gap-2">
                {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'] as const).map((g) => (
                  <motion.button
                    key={g}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedLogicGate(g);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      selectedLogicGate === g
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {g} Gate
                  </motion.button>
                ))}
              </div>

              {/* Input Switches */}
              <div className="flex gap-4 items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setLogicInputA(a => (a === 1 ? 0 : 1));
                    audioManager.play('tap');
                  }}
                  className={`flex-1 p-3 rounded-xl border text-center font-bold text-sm ${
                    logicInputA === 1 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Input A: {logicInputA} ({logicInputA ? 'HIGH / 5V' : 'LOW / 0V'})
                </motion.button>

                {selectedLogicGate !== 'NOT' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setLogicInputB(b => (b === 1 ? 0 : 1));
                      audioManager.play('tap');
                    }}
                    className={`flex-1 p-3 rounded-xl border text-center font-bold text-sm ${
                      logicInputB === 1 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Input B: {logicInputB} ({logicInputB ? 'HIGH / 5V' : 'LOW / 0V'})
                  </motion.button>
                )}
              </div>

              {/* Logic Result Display */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Boolean Expression:</span>
                  <span className="text-sm font-mono font-bold text-cyan-300">
                    {selectedLogicGate === 'AND' && 'Y = A · B'}
                    {selectedLogicGate === 'OR' && 'Y = A + B'}
                    {selectedLogicGate === 'NOT' && 'Y = A′'}
                    {selectedLogicGate === 'NAND' && 'Y = (A · B)′'}
                    {selectedLogicGate === 'NOR' && 'Y = (A + B)′'}
                    {selectedLogicGate === 'XOR' && 'Y = A ⊕ B'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Output Y:</span>
                  <span className={`text-2xl font-bold font-mono ${logicOutput === 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {logicOutput}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Zener Surge Simulator */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                Zener Surge Regulator Live Test
              </span>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Surge Input Vi:</span>
                  <span className="text-cyan-400 font-mono">{regulatorVi.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={24}
                  step={0.5}
                  value={regulatorVi}
                  onChange={(e) => setRegulatorVi(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">Regulated Output</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{regulatorCalculations.Vout.toFixed(2)} V</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">Zener Current Iz</span>
                  <span className="text-xl font-bold font-mono text-amber-400">{regulatorCalculations.Iz.toFixed(1)} mA</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Notice that even when input surges to 24 V, the output remains rigidly clamped at 5.1 V!
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ENGINE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Indicator Canvas */}
          <canvas ref={canvasRef} width={400} height={26} className="w-full h-[26px] rounded-lg bg-slate-900/60" />

          {/* Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                Telemetry Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-500 ml-2">
                [Competency: <strong className="text-slate-300 capitalize">{challenge.competencyLevel}</strong>]
              </span>
            </div>

            <span className="text-xs font-mono text-slate-400">
              Accuracy: {scoreBreakdown.correct} / {scoreBreakdown.total}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Box */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <h3 className="text-base md:text-lg font-semibold mb-4 leading-relaxed">{challenge.question}</h3>

            {/* MCQ / Classify / Distinguish Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    disabled={showExplanation || answerRevealed}
                    onClick={() => handleAnswer(i)}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full p-3.5 text-left rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-cyan-500/50'
                    }`}
                  >
                    <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['vi_box', 'rs_box', 'zener_box', 'rl_box'].map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex flex-col justify-center items-center text-center transition-all ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-cyan-500'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                        {targetId.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-bold">{droppedLabels[targetId] || 'Drop Label Here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl"
                >
                  Verify Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
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
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl"
                >
                  Verify Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-cyan-400 outline-none w-48"
                  />
                  <span className="text-slate-400 font-bold">{challenge.unit}</span>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    disabled={!numericInput || showExplanation}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm rounded-xl disabled:opacity-50"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-xs font-bold text-white rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction Strip */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-cyan-900/80 border border-cyan-500/50 rounded-lg text-xs font-mono text-cyan-200 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above to synthesize logic equation</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={constructParts.length === 0 || showExplanation}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl disabled:opacity-50"
                >
                  Validate Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-800/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Step-by-Step Physics Breakdown
                  </span>
                  <span className="text-xs text-slate-400">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim()).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim())
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-amber-200/90 leading-relaxed"
                      >
                        <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Diagnostic →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD RETROSPECTIVE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/60 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Mission Diagnostic Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You evaluated semiconductor regulators, nuclear decay rates, transistor amplification circuits, digital logic gates, and optical wave polarization.
            </p>

            <div className="flex justify-center gap-6 pt-2 font-mono">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Mastery Rating</span>
                <span className="text-2xl font-bold text-cyan-400 uppercase">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/50">
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-1">
              Engineering Assessment Feedback:
            </h4>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {errors === 0
                ? 'Flawless performance! You have complete mastery of Class 12 solid state and modern physics topics.'
                : errors <= 3
                ? 'Strong engineering intuition! Review the minor misconceptions below to lock in a perfect score.'
                : 'Good effort. Modern electronics requires rigorous application of Kirchhoff laws and quantum breakdown models. Review the targeted profile below!'}
            </p>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Profile:
              </h4>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800/50 text-xs space-y-1">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider">
              SM-2 Spaced Repetition Review Protocol:
            </h4>
            <p className="text-slate-300">
              Optimal memory consolidation occurs when reviewing concepts at escalating intervals. Based on your performance, this module is scheduled for review in{' '}
              <strong className="text-amber-400 font-mono">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              .
            </p>
          </div>

          {/* Real-World Activity Retrospective */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-cyan-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i}><span className="text-slate-300">{step}</span></li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Diagnostic Module Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}