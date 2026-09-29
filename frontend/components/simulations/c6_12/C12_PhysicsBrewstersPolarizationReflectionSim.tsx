'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_PHY_131 = 'c12_phy_131'; // Brewster's law & polarization by reflection
const NODE_C12_PHY_132 = 'c12_phy_132'; // Radioactive decay constant and mean life
const NODE_C12_PHY_133 = 'c12_phy_133'; // Soddy-Fajans displacement laws
const NODE_C12_PHY_134 = 'c12_phy_134'; // Energy density in electric field
const NODE_C12_PHY_135 = 'c12_phy_135'; // RC circuit (charging and discharging)
const NODE_C12_PHY_136 = 'c12_phy_136'; // LC oscillations and energy transfer
const NODE_C12_PHY_137 = 'c12_phy_137'; // Rotating coil EMF (NBAωsin(ωt))
const NODE_C12_PHY_138 = 'c12_phy_138'; // X-rays (continuous & characteristic spectra)
const NODE_C12_PHY_139 = 'c12_phy_139'; // Transistor as oscillator and feedback
const NODE_C12_PHY_140 = 'c12_phy_140'; // Amplitude modulation (sidebands & bandwidth)

const ALL_NODE_IDS = [
  NODE_C12_PHY_131,
  NODE_C12_PHY_132,
  NODE_C12_PHY_133,
  NODE_C12_PHY_134,
  NODE_C12_PHY_135,
  NODE_C12_PHY_136,
  NODE_C12_PHY_137,
  NODE_C12_PHY_138,
  NODE_C12_PHY_139,
  NODE_C12_PHY_140,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Mission: Optical & Electromagnetic Signal Lab (ISRO Tech Station)',
  intro: 'You are the Chief Flight Systems Physicist at the Bengaluru Space Centre. High-altitude satellites and deep-space telemetry ground stations require precise optics, radiation tracking, power buffering circuits, and robust radio communication.',
  context: 'Your mission is to calibrate anti-glare Brewster windows, verify nuclear isotope power cells, tune resonant LC/RC sub-systems, run Coolidge X-ray diagnostic tubes, and configure AM telemetry transmitters before orbital insertion.',
};

// ─── PREDICTION QUESTIONS (BRILLIANT.ORG PREDICT-THEN-CHECK PATTERN) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_brewster_geom',
    question: 'When unpolarized sunlight hits calm glass/water at Brewster’s polarizing angle (~56.3° for glass), what is the special geometric relationship between the reflected and refracted rays?',
    options: [
      'They are parallel to each other (angle = 0°)',
      'They are mutually perpendicular (angle between them = 90°)',
      'The angle between them is exactly 180°',
      'Both rays reflect back into the air with zero penetration',
    ],
    correctIndex: 1,
    explanation: 'At Brewster’s angle i_p, tan(i_p) = n. Since sin(i_p)/cos(i_p) = sin(i_p)/sin(r), we get cos(i_p) = sin(r) = cos(90° - r), which means i_p + r = 90°. Thus, the angle between reflected and refracted rays is 180° - (i_p + r) = 90°. The reflected light becomes 100% plane-polarized because induced dipoles cannot radiate along their oscillation axis!',
    verifyInstruction: 'Adjust the incident angle slider in Lab 1 to Brewster’s angle (~56.3° for glass) and check the angle between reflected and refracted rays.',
  },
  {
    id: 'pred_rc_transient',
    question: 'During the charging of a capacitor in a series RC circuit connected to DC source V_0, what percentage of the maximum charge Q_max is accumulated after exactly one time constant (t = τ = RC)?',
    options: [
      '50.0% of maximum charge',
      '63.2% of maximum charge (1 - 1/e)',
      '70.7% of maximum charge',
      '86.5% of maximum charge',
    ],
    correctIndex: 1,
    explanation: 'The charging equation is Q(t) = Q_max(1 - e^(-t/τ)). At t = τ, Q(τ) = Q_max(1 - e^-1) = Q_max(1 - 0.3679) ≈ 63.2% of Q_max.',
    verifyInstruction: 'Toggle the switch to CHARGE in Lab 2 and watch the real-time voltage curve cross the 63.2% mark at t = τ.',
  },
];

// ─── DISCOVERY QUESTION (FALLBACK) ───
const DISCOVERY_QUESTION = PREDICTION_QUESTIONS[0];

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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about reflected light at Brewster\'s angle?',
    observableOptions: [
      'The reflected ray is completely polarized perpendicular to the plane of incidence (✓)',
      'The reflected ray is completely unpolarized (✗)',
      'The reflected ray disappears entirely (✗)',
      'The reflected ray is polarized parallel to the plane of incidence (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When you increase the angle of incidence beyond Brewster\'s angle, what happens to the polarization of reflected light?',
    observableOptions: [
      'The reflected light becomes partially polarized but less completely than at Brewster\'s angle (✓)',
      'The reflected light becomes completely polarized (✗)',
      'No polarization occurs at any other angle (✗)',
      'The reflected light becomes circularly polarized (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Brewster Law (Recall)
  {
    id: 'ch_01_brewster_recall',
    nodeId: NODE_C12_PHY_131,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Brewster’s Law, how is the polarizing angle i_p related to the relative refractive index n = n2/n1 of the interface?',
    options: [
      'sin(i_p) = n',
      'tan(i_p) = n',
      'cos(i_p) = n',
      'tan(i_p) = 1/n',
    ],
    correctIndex: 1,
    explanation: 'Brewster’s law states that the tangent of the polarizing angle equals the relative refractive index: tan(i_p) = n = n2/n1.',
    hints: [
      'Think about the ratio of sin(i_p) to cos(i_p) derived from Snell’s law.',
      'Remember that at the polarizing angle, r = 90° - i_p, making sin(r) = cos(i_p).',
      'The formula is simply tan(i_p) = n.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Radioactive Half-Life & Decay Constant (Understanding)
  {
    id: 'ch_02_radioactivity_mean_life',
    nodeId: NODE_C12_PHY_132,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does the mean life (tau) of a radioactive isotope compare to its half-life (T_1/2)?',
    options: [
      'Mean life is equal to half-life (tau = T_1/2)',
      'Mean life is shorter (tau = 0.693 T_1/2)',
      'Mean life is longer (tau = 1.443 T_1/2 = 1/lambda)',
      'Mean life is exactly double the half-life (tau = 2 T_1/2)',
    ],
    correctIndex: 2,
    explanation: 'Mean life tau = 1/lambda = T_1/2 / ln(2) = 1.443 T_1/2. Thus, the average life of a nucleus is approximately 44.3% longer than its half-life.',
    hints: [
      'Recall tau = 1/lambda and T_1/2 = 0.693/lambda.',
      'Dividing tau by T_1/2 gives 1 / 0.693.',
      '1 / 0.693 is approximately 1.443, meaning mean life is longer.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Soddy-Fajans Alpha Decay (Understanding)
  {
    id: 'ch_03_soddy_alpha_shift',
    nodeId: NODE_C12_PHY_133,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a parent nucleus undergoes an alpha decay by emitting a 4_2He nucleus, how does its position shift in the Periodic Table?',
    options: [
      'Shifts 1 place to the right',
      'Shifts 2 places to the left',
      'Shifts 4 places to the left',
      'Remains in the same group (no shift)',
    ],
    correctIndex: 1,
    explanation: 'Alpha emission removes 2 protons (Delta Z = -2) and 4 nucleons (Delta A = -4). Since atomic number Z drops by 2, the daughter shifts 2 places to the left.',
    hints: [
      'An alpha particle is a helium nucleus with charge +2e and mass 4 u.',
      'Check the change in atomic number Z.',
      'Delta Z = -2 moves the element 2 positions left in the periodic table.',
    ],
  },
  // 4. Foundation - RC Circuit Time Constant (Recall)
  {
    id: 'ch_04_rc_time_constant_fraction',
    nodeId: NODE_C12_PHY_135,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'During the charging of a capacitor in a series RC circuit, what percentage of the maximum charge Q_max is accumulated after one time constant (t = tau = RC)?',
    options: ['50.0%', '63.2%', '70.7%', '86.5%'],
    correctIndex: 1,
    explanation: 'At t = tau, Q(tau) = Q_max(1 - e^-1) = Q_max(1 - 0.3679) ≈ 63.2% of Q_max.',
    hints: [
      'Evaluate (1 - e^-1).',
      'e^-1 is approximately 0.368.',
      '1 - 0.368 = 0.632, corresponding to 63.2%.',
    ],
  },
  // 5. Foundation - Drag Label (Diagram labeling for Brewster Interface)
  {
    id: 'ch_05_drag_label_brewster',
    nodeId: NODE_C12_PHY_131,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct labels onto the Brewster reflection-refraction diagram.',
    dragItems: [
      { label: 'Incident Ray (Unpolarized)', targetId: 'target_incident' },
      { label: 'Reflected Ray (100% s-polarized)', targetId: 'target_reflected' },
      { label: 'Refracted Ray (Partially polarized)', targetId: 'target_refracted' },
      { label: '90° Angle (Perpendicularity)', targetId: 'target_angle90' },
    ],
    correctMapping: {
      target_incident: 'Incident Ray (Unpolarized)',
      target_reflected: 'Reflected Ray (100% s-polarized)',
      target_refracted: 'Refracted Ray (Partially polarized)',
      target_angle90: '90° Angle (Perpendicularity)',
    },
    explanation: 'At Brewster’s angle i_p, the reflected ray is purely s-polarized (electric vectors perpendicular to plane of incidence), and the reflected & refracted rays form a precise 90° angle.',
    hints: [
      'The ray coming in from the top-left is unpolarized incident light.',
      'The ray bouncing off the surface into the top-right is purely plane polarized.',
      'The ray entering the denser medium at the bottom is refracted.',
    ],
  },
  // 6. Foundation - Electric Field Energy Density (Recall)
  {
    id: 'ch_06_energy_density_formula',
    nodeId: NODE_C12_PHY_134,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the electrostatic energy density u_E stored in a vacuum region containing a uniform electric field E?',
    options: [
      'u_E = epsilon_0 E^2',
      'u_E = 1/2 epsilon_0 E^2',
      'u_E = 1/2 epsilon_0 E',
      'u_E = 1/2 (E^2 / epsilon_0)',
    ],
    correctIndex: 1,
    explanation: 'Energy density u_E = Total Energy / Volume = (1/2 C V^2) / (A d) = 1/2 epsilon_0 E^2 (measured in J/m^3).',
    hints: [
      'Remember that total capacitor energy is 1/2 C V^2.',
      'Substitute C = epsilon_0 A / d and V = E d.',
      'Dividing by volume (A d) leaves 1/2 epsilon_0 E^2.',
    ],
    misconceptionIndex: 2,
  },
  // 7. Foundation - LC Frequency (Recall)
  {
    id: 'ch_07_lc_resonant_freq',
    nodeId: NODE_C12_PHY_136,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the natural oscillation frequency f of an ideal LC circuit with inductance L and capacitance C?',
    options: [
      'f = 2pi sqrt(LC)',
      'f = 1 / (2pi sqrt(LC))',
      'f = sqrt(L / C)',
      'f = 1 / (2pi LC)',
    ],
    correctIndex: 1,
    explanation: 'The angular frequency is omega = 1/sqrt(LC), giving cyclical frequency f = omega / (2pi) = 1 / (2pi sqrt(LC)).',
    hints: [
      'Recall omega = 1 / sqrt(LC).',
      'Convert angular frequency omega to ordinary frequency f using f = omega / (2pi).',
      'The result is f = 1 / (2pi sqrt(LC)).',
    ],
  },
  // 8. Standard - Numeric Brewster Air-Glass calculation (Application)
  {
    id: 'ch_08_numeric_brewster_glass',
    nodeId: NODE_C12_PHY_131,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Light in air strikes crown glass having refractive index n = 1.54. Calculate the polarizing angle i_p in degrees. (Round to 1 decimal place)',
    correctAnswer: 57.0,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'tan(i_p) = n = 1.54 => i_p = arctan(1.54) ≈ 57.00°. The corresponding angle of refraction is r = 90° - 57.0° = 33.0°.',
    hints: [
      'Apply Brewster’s formula: tan(i_p) = n.',
      'Take the inverse tangent of 1.54.',
      'arctan(1.54) is approximately 57.0°.',
    ],
  },
  // 9. Standard - Drag-Sort Decay Series (Analysis)
  {
    id: 'ch_09_drag_sort_soddy_chain',
    nodeId: NODE_C12_PHY_133,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the nuclear states in sequential order for the decay chain: 238_92 U --(alpha)--> State 1 --(beta-)--> State 2 --(beta-)--> State 3.',
    sortItems: [
      '238_92 U (Uranium parent)',
      '234_90 Th (Thorium after alpha decay)',
      '234_91 Pa (Protactinium after 1st beta- decay)',
      '234_92 U (Uranium isotope after 2nd beta- decay)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: '1) 238_92 U loses alpha -> 234_90 Th. 2) 234_90 Th loses beta- -> 234_91 Pa. 3) 234_91 Pa loses beta- -> 234_92 U. Notice the final product is an isotope of the original parent!',
    hints: [
      'Alpha decay drops A by 4 and Z by 2 (92 -> 90).',
      'Beta-minus decay increases Z by 1 without changing A (90 -> 91).',
      'The next beta-minus increases Z again from 91 to 92.',
    ],
  },
  // 10. Standard - Rotating Coil Dynamo EMF (Application)
  {
    id: 'ch_10_ac_generator_peak_emf',
    nodeId: NODE_C12_PHY_137,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A rectangular coil of N = 100 turns and area A = 0.05 m^2 rotates at 50 rev/s in a uniform field B = 0.2 T. What is the peak induced EMF (epsilon_0)?',
    options: ['157 V', '314 V', '628 V', '50 V'],
    correctIndex: 1,
    explanation: 'omega = 2pi f = 2pi(50) = 100pi ≈ 314.16 rad/s. Peak EMF epsilon_0 = N B A omega = 100 * 0.2 * 0.05 * 314.16 = 314.16 V ≈ 314 V.',
    hints: [
      'First convert frequency f = 50 rev/s to angular velocity omega = 2pi f rad/s.',
      'omega = 2 * 3.1416 * 50 = 314.16 rad/s.',
      'Multiply N * B * A * omega: 100 * 0.2 * 0.05 * 314.16 = 314.16 V.',
    ],
  },
  // 11. Standard - Duane-Hunt Law Cut-off Wavelength (Analysis)
  {
    id: 'ch_11_duane_hunt_cutoff',
    nodeId: NODE_C12_PHY_138,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In an X-ray Coolidge tube, if the accelerating potential difference V between cathode and target is doubled, what happens to the minimum cut-off wavelength lambda_min of the continuous bremsstrahlung spectrum?',
    options: [
      'lambda_min is doubled',
      'lambda_min is halved',
      'lambda_min quadruples',
      'lambda_min remains unchanged because it depends only on the target metal',
    ],
    correctIndex: 1,
    explanation: 'By the Duane-Hunt law, lambda_min = hc / (e V). Since lambda_min is inversely proportional to V, doubling the voltage cuts lambda_min in half.',
    hints: [
      'Look at the relationship: maximum photon energy h c / lambda_min = e V.',
      'Rearrange for lambda_min = hc / (e V).',
      'Doubling the denominator halves the overall wavelength.',
    ],
  },
  // 12. Standard - Amplitude Modulation Bandwidth (Application)
  {
    id: 'ch_12_am_bandwidth_calc',
    nodeId: NODE_C12_PHY_140,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An All-India Radio (AIR) transmitter uses a carrier frequency f_c = 1200 kHz modulated by an audio signal containing frequencies up to f_m = 4.5 kHz. What is the total bandwidth occupied by the AM signal in kHz?',
    correctAnswer: 9.0,
    tolerance: 0.1,
    unit: 'kHz',
    explanation: 'The AM signal consists of carrier f_c, USB at (f_c + f_m), and LSB at (f_c - f_m). Total bandwidth = 2 * f_m = 2 * 4.5 kHz = 9.0 kHz (independent of f_c).',
    hints: [
      'Recall Bandwidth = (f_c + f_m) - (f_c - f_m).',
      'The carrier cancels out, leaving 2 * f_m.',
      '2 * 4.5 kHz = 9.0 kHz.',
    ],
  },
  // 13. Standard - Barkhausen Criterion & Oscillator Types (Distinguish)
  {
    id: 'ch_13_oscillator_distinction',
    nodeId: NODE_C12_PHY_139,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do Hartley and Colpitts oscillators create their respective feedback fractions beta?',
    options: [
      'Hartley uses a tapped inductor (split L); Colpitts uses a tapped capacitor divider (split C)',
      'Hartley uses a tapped capacitor divider; Colpitts uses a tapped inductor',
      'Both use quartz crystals with piezoelectric mechanical resonance',
      'Hartley uses three RC high-pass filters; Colpitts uses an LC transformer only',
    ],
    correctIndex: 0,
    explanation: 'Mnemonic: "H"artley = "H"eavy coil (tapped inductor L1, L2). "C"olpitts = "C"apacitor divider (C1, C2 in series across L).',
    hints: [
      'Remember: Hartley = tapped coil (inductor).',
      'Colpitts = tapped capacitor network (C1 and C2 in series).',
      'Option 1 correctly identifies both.',
    ],
  },
  // 14. Standard - Construct Challenge (RC Energy Balance)
  {
    id: 'ch_14_construct_rc_energy',
    nodeId: NODE_C12_PHY_135,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Assemble the fundamental energy relationship during charging of a capacitor C from a DC battery of EMF V_0.',
    availableParts: ['W_battery = C*V_0^2', 'U_capacitor = 1/2*C*V_0^2', 'Heat_resistor = 1/2*C*V_0^2', '+', '='],
    targetState: 'W_battery = C*V_0^2 = U_capacitor = 1/2*C*V_0^2 + Heat_resistor = 1/2*C*V_0^2',
    validationHint: 'Show that Battery Work equals Stored Energy plus Heat Dissipated in Resistor.',
    explanation: 'Total work done by the battery is Q*V_0 = C*V_0^2. Exactly 50% (1/2 C V_0^2) is stored in the electric field, and 50% is dissipated as heat in the resistor regardless of R.',
    hints: [
      'Total battery work is C V_0^2.',
      'Capacitor stores 1/2 C V_0^2.',
      'Resistor dissipates the remaining 1/2 C V_0^2 as Joule heat.',
    ],
  },
  // 15. Advanced - Brewster Relative Refraction (Water to Glass) (Application / CISCE Exam Flag)
  {
    id: 'ch_15_brewster_water_glass',
    nodeId: NODE_C12_PHY_131,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Light travelling inside water (n1 = 1.33) is incident on a submerged glass block (n2 = 1.50). Calculate Brewster’s polarizing angle i_p in water. (Round to 1 decimal place)',
    correctAnswer: 48.4,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'Relative refractive index n = n2 / n1 = 1.50 / 1.33 ≈ 1.1278. tan(i_p) = 1.1278 => i_p = arctan(1.1278) ≈ 48.4°. (Examiner Note: Always use relative index n2/n1, not absolute n2!).',
    hints: [
      'Do not use n = 1.50 blindly. Light comes from water, not air!',
      'Compute relative index n = n_glass / n_water = 1.50 / 1.33.',
      'Find arctan(1.1278) in degrees.',
    ],
    misconceptionIndex: 1,
  },
  // 16. Advanced - Moseley Law Evaluation (Analysis / Evaluation)
  {
    id: 'ch_16_moseley_evaluation',
    nodeId: NODE_C12_PHY_138,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Moseley’s Law for characteristic K_alpha X-rays is expressed as sqrt(nu) = a(Z - b). Why is the screening constant b approximately equal to 1 for the K-series?',
    options: [
      'Because the target nucleus loses one proton during electron bombardment',
      'Because one electron remains in the K-shell after ionization, shielding the nucleus for the transitioning L electron',
      'Because of relativistic spin precession of the outer M-shell electrons',
      'Because the incoming beam of electrons has unit negative charge -e',
    ],
    correctIndex: 1,
    explanation: 'When one K electron is ejected, the single remaining 1s electron screens the nuclear charge Z*e so the effective nuclear charge felt by the incoming 2p (L-shell) electron is (Z - 1)e.',
    hints: [
      'Consider how many electrons initially occupied the K-shell.',
      'One was knocked out, leaving 1 electron behind.',
      'That 1 inner electron shields 1 unit of positive nuclear charge.',
    ],
  },
  // 17. Advanced - AM Power Efficiency Analysis (Evaluation)
  {
    id: 'ch_17_am_power_efficiency',
    nodeId: NODE_C12_PHY_140,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'At maximum distortion-free modulation index mu = 1.0 (100% modulation), what exact fraction of the total transmitted AM power P_t is carried by the information-bearing sidebands (P_sb)?',
    options: ['33.3% (1/3 of P_t)', '50.0% (1/2 of P_t)', '66.7% (2/3 of P_t)', '100% (all power)'],
    correctIndex: 0,
    explanation: 'Total power P_t = P_c(1 + mu^2 / 2). For mu = 1, P_t = 1.5 P_c. Total sideband power P_sb = 0.5 P_c. Thus P_sb / P_t = 0.5 / 1.5 = 1/3 (33.3%). 66.7% of power is wasted in the unmodulated carrier!',
    hints: [
      'Formula: P_t = P_c * (1 + mu^2 / 2).',
      'For mu = 1, P_t = 1.5 P_c, while sidebands carry P_c * (1^2 / 2) = 0.5 P_c.',
      '0.5 / 1.5 = 1/3 ≈ 33.3%.',
    ],
  },
  // 18. Advanced - Simultaneous Alpha/Beta Decay Series (Analysis / Application)
  {
    id: 'ch_18_alpha_beta_series_count',
    nodeId: NODE_C12_PHY_133,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The radioactive isotope 232_90 Th undergoes a series of disintegrations to become stable 208_82 Pb. How many alpha and beta-minus particles are emitted in total?',
    options: [
      '6 alpha and 4 beta-',
      '8 alpha and 6 beta-',
      '4 alpha and 2 beta-',
      '6 alpha and 2 beta-',
    ],
    correctIndex: 0,
    explanation: 'Delta A = 232 - 208 = 24. Since only alpha reduces A by 4: n_alpha = 24 / 4 = 6 alphas. 6 alphas reduce Z by 6 * 2 = 12 (90 -> 78). But final Z = 82, requiring Delta Z = +4 from beta- emissions: n_beta = 4.',
    hints: [
      'First solve for mass number drop: Delta A = -4 * n_alpha.',
      '232 - 208 = 24 => n_alpha = 6.',
      'Now balance atomic number: 90 - (2*6) + n_beta = 82 => n_beta = 4.',
    ],
  },
  // 19. Advanced - LC Energy Split at q = Q_0 / sqrt(2) (Application)
  {
    id: 'ch_19_lc_energy_split',
    nodeId: NODE_C12_PHY_136,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In an ideal LC oscillating circuit, at the instant when the capacitor charge is q = Q_0 / 2, what fraction of the total system energy is stored in the magnetic field of the inductor?',
    options: ['25% (1/4)', '50% (1/2)', '75% (3/4)', '87.5% (7/8)'],
    correctIndex: 2,
    explanation: 'Electric energy U_E = q^2 / (2C) = (Q_0 / 2)^2 / (2C) = 1/4 (Q_0^2 / 2C) = 1/4 U_total. By conservation of energy, magnetic energy U_B = U_total - U_E = 3/4 U_total (75%).',
    hints: [
      'Capacitor energy scales with the square of charge q.',
      '(1/2)^2 = 1/4 of total energy is in the electric field.',
      'The rest (1 - 1/4 = 3/4 = 75%) must reside in the inductor.',
    ],
  },
  // 20. Advanced - Phase Shift RC Oscillator Frequency (Creativity / Evaluation)
  {
    id: 'ch_20_rc_phase_shift_freq',
    nodeId: NODE_C12_PHY_139,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A transistor Phase-Shift RC Oscillator uses a 3-section RC ladder network. What is the sustained oscillation frequency f and required minimum amplifier gain A?',
    options: [
      'f = 1 / (2pi R C sqrt(6)), with A_min = 29',
      'f = 1 / (2pi R C), with A_min = 3',
      'f = sqrt(6) / (2pi R C), with A_min = 10',
      'f = 1 / (2pi sqrt(L C)), with A_min = 5',
    ],
    correctIndex: 0,
    explanation: 'Each RC section produces 60° phase shift at f = 1/(2pi R C sqrt(6)) giving 180° total, which adds to the 180° inversion of the CE transistor to yield 360° (Barkhausen phase condition). The attenuation is |beta| = 1/29, requiring amplifier gain A >= 29.',
    hints: [
      'Three RC sections each provide 60° shift, totaling 180° feedback shift.',
      'The mathematical derivation yields a sqrt(6) factor in the denominator.',
      'The feedback ladder attenuates the signal by a factor of 29, so gain must be at least 29.',
    ],
  },
  // 21. Advanced - Rotating Coil Phase Difference with Flux (Analysis)
  {
    id: 'ch_21_dynamo_flux_emf_phase',
    nodeId: NODE_C12_PHY_137,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the instantaneous induced EMF in an AC generator maximum when the magnetic flux passing through the coil is exactly zero?',
    options: [
      'Because Faraday’s law states EMF = -dPhi/dt; the rate of change of flux is maximum when flux passes through zero',
      'Because coil resistance drops to zero when parallel to magnetic lines',
      'Because the slip rings disconnect momentarily at maximum flux',
      'Because Lenz’s law reverses the sign of magnetic permeability',
    ],
    correctIndex: 0,
    explanation: 'When Phi(t) = NBA cos(omega t) is zero (omega t = 90°), its derivative dPhi/dt = -NBA omega sin(omega t) is at peak magnitude. EMF depends on the derivative (rate of cutting lines), not on the flux itself.',
    hints: [
      'Differentiate cos(omega t) with respect to time.',
      'The derivative is -omega sin(omega t).',
      'When cosine is 0, sine is +/- 1 (maximum slope).',
    ],
    misconceptionIndex: 3,
  },
  // 22. Advanced - Spherical Field Energy Density Integration (Application / JEE Adv)
  {
    id: 'ch_22_spherical_energy_density',
    nodeId: NODE_C12_PHY_134,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An isolated conducting sphere of radius R in vacuum holds charge Q. Integrating the electric energy density u_E = 1/2 epsilon_0 E^2 over all surrounding space (from r = R to infinity) yields which total electrostatic self-energy?',
    options: [
      'U = Q^2 / (8 pi epsilon_0 R)',
      'U = Q^2 / (4 pi epsilon_0 R)',
      'U = Q^2 / (2 pi epsilon_0 R^2)',
      'U = Q / (8 pi epsilon_0 R)',
    ],
    correctIndex: 0,
    explanation: 'E(r) = Q / (4 pi epsilon_0 r^2). u_E(r) = Q^2 / (32 pi^2 epsilon_0 r^4). Integrating u_E * 4 pi r^2 dr from R to infinity gives [Q^2 / (8 pi epsilon_0)] * [-1/r]_R^inf = Q^2 / (8 pi epsilon_0 R) = 1/2 Q^2 / C (where C = 4 pi epsilon_0 R).',
    hints: [
      'Substitute E = Q / (4 pi epsilon_0 r^2) into u = 1/2 epsilon_0 E^2.',
      'Integrate with spherical volume element dV = 4 pi r^2 dr.',
      'The integral of 1/r^2 from R to infinity evaluates to 1/R.',
    ],
  },
];

// ─── EXPLORATION STEPS (BRILLIANT.ORG INTERACTIVE VISUAL LABS) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Brewster’s Polarization by Reflection',
    instruction: 'Adjust the incident angle slider until the reflected and refracted rays form a strict 90° right angle. Observe the s-polarization filter effect!',
    interactionType: 'slider-brewster',
    nodeId: NODE_C12_PHY_131,
  },
  {
    title: 'Lab 2: RC Circuit Transient Response',
    instruction: 'Toggle the switch between CHARGE and DISCHARGE. Observe the real-time exponential growth/decay curves and notice the 63.2% tau milestone.',
    interactionType: 'toggle-rc',
    nodeId: NODE_C12_PHY_135,
  },
  {
    title: 'Lab 3: LC Tank Oscillation & Energy Sloshing',
    instruction: 'Drag the inductance (L) and capacitance (C) sliders. Watch the electric energy in the capacitor and magnetic energy in the inductor trade places!',
    interactionType: 'slider-lc',
    nodeId: NODE_C12_PHY_136,
  },
  {
    title: 'Lab 4: AC Generator Dynamo & Sinusoidal EMF',
    instruction: 'Increase the rotational speed (omega) and magnetic field (B). Observe how the induced EMF sine wave amplitude and frequency scale in real time.',
    interactionType: 'slider-dynamo',
    nodeId: NODE_C12_PHY_137,
  },
  {
    title: 'Lab 5: Coolidge X-Ray Spectrum & Moseley Law',
    instruction: 'Vary the accelerating tube voltage (kV) and target metal (Z). Watch the cut-off lambda_min shift via Duane-Hunt and characteristic K-lines jump!',
    interactionType: 'slider-xray',
    nodeId: NODE_C12_PHY_138,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Telemetry & Optical Filter Engineer Challenge',
  description: 'Apply what you have mastered to configure an Earth-imaging satellite payload: (1) Position Brewster anti-reflection windows on payload optics to eliminate ocean sun-glint; (2) Calculate the RC solar panel power buffer time constant; (3) Specify the AM telemetry carrier and sideband frequencies for downlinking data to the ISTRAC Bengaluru ground dish.',
  steps: [
    'Calculate the Brewster angle for an anti-glare sapphire lens (n = 1.77)',
    'Choose RC values so the power filter charges to 99% in under 10 milliseconds',
    'Calculate the lower and upper sideband frequencies for a 150 MHz carrier modulated with 20 kHz telemetry audio',
    'Record your configuration notes and verify against CISCE/ISC board standards',
  ],
};

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
  nodeId: NODE_C12_PHY_131,
  title: 'Class 12 Physics: Optics, Radiation & EM Oscillations Master Suite',
  definition: 'Comprehensive mastery of Brewster’s polarizing law, Radioactive decay and Soddy-Fajans shifts, Electric energy density, RC/LC transients, AC Dynamo EMF, Coolidge X-rays, Transistor oscillators, and Amplitude Modulation.',
  eli5: 'Discover how bouncing light gets sorted into pure polarized waves, how capacitors and inductors slosh electric and magnetic energy like a swing, how spinning coils generate electricity for entire cities, and how radio waves carry voice data across continents!',
  misconceptions: [
    {
      misconception: 'At Brewster’s angle, both reflected and refracted rays are completely plane-polarized.',
      correction: 'Only the reflected ray is 100% plane-polarized (pure s-component). The refracted ray is only partially polarized because it transmits all of the p-component plus the remaining s-component.',
    },
    {
      misconception: 'Brewster’s law is always tan(i_p) = n_glass, regardless of surrounding medium.',
      correction: 'n in Brewster’s law is the RELATIVE refractive index n2/n1. If glass (n2=1.5) is immersed in water (n1=1.33), then n = 1.5/1.33 ≈ 1.13, giving i_p ≈ 48.4°.',
    },
    {
      misconception: 'In an RC circuit, all battery energy goes into charging the capacitor with zero losses.',
      correction: 'During charging, the battery delivers Q*V_0 = C*V_0^2 of work. Exactly 50% (1/2 C V_0^2) is stored in the electric field, and 50% is dissipated as heat in the resistor regardless of R.',
    },
    {
      misconception: 'Induced EMF in a rotating coil dynamo is highest when the magnetic flux passing through it is maximum.',
      correction: 'EMF depends on the RATE of change of flux (dPhi/dt), not flux itself. When flux is zero (coil parallel to field), rate of cutting lines is maximum, producing peak EMF.',
    },
    {
      misconception: 'The minimum cut-off wavelength lambda_min in X-ray production depends on the target metal.',
      correction: 'By the Duane-Hunt law, lambda_min = hc/(eV), which depends SOLELY on the accelerating voltage V and is independent of target material.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is Brewster’s law relating polarizing angle i_p and refractive index n?', options: ['tan(i_p) = n', 'sin(i_p) = n', 'cos(i_p) = n', 'i_p = n * 90°'], correctIndex: 0 },
    { question: 'What is the angle between reflected and refracted rays at Brewster’s angle?', options: ['0°', '45°', '90°', '180°'], correctIndex: 2 },
    { question: 'What is the relation between radioactive decay constant lambda and half-life T_1/2?', options: ['T_1/2 = 0.693 / lambda', 'T_1/2 = lambda / 0.693', 'T_1/2 = 1 / lambda', 'T_1/2 = 2 * lambda'], correctIndex: 0 },
    { question: 'What happens to mass number A and atomic number Z after one alpha decay?', options: ['A drops by 4, Z drops by 2', 'A drops by 2, Z drops by 4', 'A unchanged, Z increases by 1', 'A drops by 1, Z unchanged'], correctIndex: 0 },
    { question: 'What is the electrostatic energy density in a uniform electric field E in vacuum?', options: ['1/2 epsilon_0 E^2', 'epsilon_0 E^2', '1/2 E^2 / epsilon_0', 'epsilon_0 E'], correctIndex: 0 },
    { question: 'In a charging RC circuit, what is the time constant tau?', options: ['tau = R * C', 'tau = R / C', 'tau = C / R', 'tau = 1 / (R * C)'], correctIndex: 0 },
    { question: 'What is the resonant frequency of an ideal LC oscillating tank?', options: ['f = 1 / (2pi sqrt(LC))', 'f = 2pi sqrt(LC)', 'f = sqrt(L/C)', 'f = 1 / (LC)'], correctIndex: 0 },
    { question: 'What is the peak EMF produced by a rotating coil of N turns, area A, in field B at angular speed omega?', options: ['epsilon_0 = N B A omega', 'epsilon_0 = N B A', 'epsilon_0 = B A omega', 'epsilon_0 = N B omega'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student achieves >80% accuracy across all 10 Class 12 ISC Physics nodes, demonstrating competency in formulas, derivations, graph interpretations, and circuit design.',
};

// ─── MAIN COMPONENT ───
function C12_PhysicsBrewstersPolarizationReflectionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_131,
  title = DEFAULT_PROPS.title || 'Physics Simulation',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── PREDICTION SYSTEM STATE (BRILLIANT PATTERN) ───
  const [predIndex, setPredIndex] = useState(0);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [predSubmitted, setPredSubmitted] = useState<Record<number, boolean>>({});

  // ─── ESCALATING HINTS & PROGRESSIVE REVEAL ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & DROP / INTERACTION STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── FEEDBACK & ANIMATIONS ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── SIMULATION VARIABLE STATES ───
  // 1. Brewster Lab Variables
  const [incidentAngleDeg, setIncidentAngleDeg] = useState(56.3);
  const [refractiveIndexMedium, setRefractiveIndexMedium] = useState(1.50);
  const [incidentMediumIndex] = useState(1.00);

  // 2. RC Transient Lab Variables
  const [rcResistance, setRcResistance] = useState(1000);
  const [rcCapacitance, setRcCapacitance] = useState(10);
  const [rcBatteryVoltage] = useState(10);
  const [rcSwitchState, setRcSwitchState] = useState<'charge' | 'discharge'>('charge');
  const [rcTimeElapsed, setRcTimeElapsed] = useState(0);
  const [rcIsRunning, setRcIsRunning] = useState(false);

  // 3. LC Tank Lab Variables
  const [lcInductance, setLcInductance] = useState(10);
  const [lcCapacitance, setLcCapacitance] = useState(25);
  const [lcInitialVoltage] = useState(100);

  // 4. AC Generator Dynamo Variables
  const [dynamoTurns] = useState(200);
  const [dynamoArea] = useState(0.04);
  const [dynamoFieldB, setDynamoFieldB] = useState(0.5);
  const [dynamoRpm, setDynamoRpm] = useState(600);

  // 5. Coolidge X-Ray & Moseley Lab Variables
  const [xrayVoltageKv, setXrayVoltageKv] = useState(40);
  const [xrayTargetZ, setXrayTargetZ] = useState(42);

  // 6. AM Modulation Lab Variables
  const [amCarrierFreqKhz, setAmCarrierFreqKhz] = useState(1000);
  const [amModFreqKhz, setAmModFreqKhz] = useState(5);

  // 7. General Lab Sandbox Tab Selection
  const [sandboxActiveTab, setSandboxActiveTab] = useState<'brewster' | 'rc' | 'lc' | 'dynamo' | 'xray' | 'am'>('brewster');

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD MASTERY & PERSISTENCE ───
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
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME COMPUTED PHYSICS VALUES ───
  const computedBrewsterAngle = useMemo(() => {
    const relIndex = refractiveIndexMedium / incidentMediumIndex;
    return (Math.atan(relIndex) * 180) / Math.PI;
  }, [refractiveIndexMedium, incidentMediumIndex]);

  const computedRefractionAngle = useMemo(() => {
    const iRad = (incidentAngleDeg * Math.PI) / 180;
    const sinR = (incidentMediumIndex * Math.sin(iRad)) / refractiveIndexMedium;
    if (Math.abs(sinR) > 1) return 90;
    return (Math.asin(sinR) * 180) / Math.PI;
  }, [incidentAngleDeg, incidentMediumIndex, refractiveIndexMedium]);

  const angleBetweenReflectedAndRefracted = useMemo(() => {
    return 180 - (incidentAngleDeg + computedRefractionAngle);
  }, [incidentAngleDeg, computedRefractionAngle]);

  const isAtBrewster = useMemo(() => {
    return Math.abs(incidentAngleDeg - computedBrewsterAngle) < 0.8;
  }, [incidentAngleDeg, computedBrewsterAngle]);

  // RC Transient Calculations
  const rcTauMs = useMemo(() => {
    return (rcResistance * (rcCapacitance * 1e-6)) * 1000;
  }, [rcResistance, rcCapacitance]);

  const rcCurrentVoltage = useMemo(() => {
    const t = rcTimeElapsed / 1000;
    const tau = rcTauMs / 1000;
    if (rcSwitchState === 'charge') {
      return rcBatteryVoltage * (1 - Math.exp(-t / tau));
    } else {
      return rcBatteryVoltage * Math.exp(-t / tau);
    }
  }, [rcTimeElapsed, rcTauMs, rcBatteryVoltage, rcSwitchState]);

  // LC Resonant Calculations
  const lcFreqHz = useMemo(() => {
    const lH = lcInductance * 1e-3;
    const cF = lcCapacitance * 1e-6;
    return 1 / (2 * Math.PI * Math.sqrt(lH * cF));
  }, [lcInductance, lcCapacitance]);

  const lcOmega = useMemo(() => 2 * Math.PI * lcFreqHz, [lcFreqHz]);
  const lcMaxChargeQ0 = useMemo(() => (lcCapacitance * 1e-6) * lcInitialVoltage, [lcCapacitance, lcInitialVoltage]);
  const lcMaxCurrentI0 = useMemo(() => lcMaxChargeQ0 * lcOmega, [lcMaxChargeQ0, lcOmega]);

  // Dynamo Peak EMF
  const dynamoFreqHz = useMemo(() => dynamoRpm / 60, [dynamoRpm]);
  const dynamoOmega = useMemo(() => 2 * Math.PI * dynamoFreqHz, [dynamoFreqHz]);
  const dynamoPeakEmf = useMemo(() => dynamoTurns * dynamoFieldB * dynamoArea * dynamoOmega, [dynamoTurns, dynamoFieldB, dynamoArea, dynamoOmega]);

  // X-Ray Cutoff & Moseley
  const xrayLambdaMinAngstrom = useMemo(() => {
    return 12400 / (xrayVoltageKv * 1000);
  }, [xrayVoltageKv]);

  const xrayKAlphaAngstrom = useMemo(() => {
    const zScreened = Math.max(1, xrayTargetZ - 1);
    return 1215.6 / (zScreened * zScreened);
  }, [xrayTargetZ]);

  // AM Calculations
  const amBandwidthKhz = useMemo(() => 2 * amModFreqKhz, [amModFreqKhz]);

  // ─── RC TIMER ANIMATION EFFECT ───
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (rcIsRunning) {
      interval = setInterval(() => {
        setRcTimeElapsed(prev => {
          if (prev >= 5 * rcTauMs) {
            setRcIsRunning(false);
            return 5 * rcTauMs;
          }
          return prev + (rcTauMs / 20);
        });
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [rcIsRunning, rcTauMs]);

  // ─── 2D HTML CANVAS CONTINUOUS PHYSICS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sandboxActiveTab === 'dynamo' || phase === 'challenge') {
        const cx = 80;
        const cy = 60;
        const angle = (frame * (dynamoRpm / 600)) % (2 * Math.PI);

        // Magnet poles
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(10, 30, 25, 60);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(125, 30, 25, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText('N', 18, 65);
        ctx.fillText('S', 133, 65);

        // Coil rotating in center
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.strokeRect(-25, -15, 50, 30);
        ctx.restore();

        // Waveform on right side
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 160; x < canvas.width - 10; x++) {
          const tRel = (x - 160) * 0.05 - frame * 0.05;
          const y = 60 - Math.sin(tRel) * 30 * (dynamoPeakEmf / 300);
          if (x === 160) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText(`Peak EMF = ${dynamoPeakEmf.toFixed(1)} V`, 160, 20);
      } else if (sandboxActiveTab === 'lc') {
        const t = frame * 0.05;
        const ue = Math.cos(t) * Math.cos(t);
        const ub = Math.sin(t) * Math.sin(t);

        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(40, 90 - ue * 60, 40, ue * 60);
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(110, 90 - ub * 60, 40, ub * 60);

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px sans-serif';
        ctx.fillText(`Electric U_E: ${(ue * 100).toFixed(0)}%`, 30, 110);
        ctx.fillText(`Magnetic U_B: ${(ub * 100).toFixed(0)}%`, 105, 110);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [sandboxActiveTab, phase, dynamoRpm, dynamoPeakEmf]);

  // ─── ESCALATING HINTS HANDLER ───
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
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // ─── AUTOHINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── PREDICTION HANDLER ───
  const handlePredictionAnswer = useCallback((optionIdx: number) => {
    const currentQ = PREDICTION_QUESTIONS[predIndex];
    setPredAnswers(prev => ({ ...prev, [predIndex]: optionIdx }));
    setPredSubmitted(prev => ({ ...prev, [predIndex]: true }));
    const isCorrect = optionIdx === currentQ.correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great prediction! Verify your hypothesis in the interactive lab.' : currentQ.verifyInstruction);
  }, [predIndex]);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive physics exploration. Test your predictions by adjusting controls.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test all optical, nuclear, and electromagnetic systems without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Solve progressive ISC physics problems to build mastery.');
  }, []);

  // ─── SLIDER & INTERACTION HANDLERS ───
  const handleBrewsterAngleChange = useCallback((val: number) => {
    setIncidentAngleDeg(val);
    audioManager.play('count');
    if (Math.abs(val - computedBrewsterAngle) < 0.5) {
      audioManager.play('balance');
    }
  }, [computedBrewsterAngle]);

  const handleRcToggleSwitch = useCallback(() => {
    setRcSwitchState(prev => (prev === 'charge' ? 'discharge' : 'charge'));
    setRcTimeElapsed(0);
    setRcIsRunning(true);
    audioManager.play('tap');
  }, []);

  const handleResetRc = useCallback(() => {
    setRcTimeElapsed(0);
    setRcIsRunning(false);
    audioManager.play('pop');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! Mission Accomplished. You have demonstrated stellar Class 12 Physics mastery.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── ANSWER SUBMISSION & GRADING HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent physics reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ bestScore: 100, date: Date.now() }));
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
        speechManager.speak('Let us study the complete step-by-step solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DRAG HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ─── SORT HANDLERS ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/60 rounded-xl border border-gold-700/50">🔬</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">CISCE ISC Class 12 Physics • Interactive STEM Master Simulation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-300 border-rose-600'
                : 'bg-gold-950/60 text-gold-300 border-gold-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-800 rounded-full text-slate-300 border border-slate-700">
            Phase: <span className="text-amber-400 uppercase font-bold">{phase}</span>
          </span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY & PREDICTION HOOK (BRILLIANT PATTERN) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gold-400 text-lg font-bold">🚀 Mission Briefing</span>
              <span className="text-xs px-2 py-0.5 bg-gold-900/80 text-gold-200 rounded-full font-mono">ISRO GROUND LAB</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 font-mono">Context: {SCENARIO.context}</p>
          </div>

          {/* Prediction Card */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span>🔮 Predict First</span>
                <span className="text-slate-400 font-mono font-normal">Prediction {predIndex + 1} of {PREDICTION_QUESTIONS.length}</span>
              </span>
              <div className="flex gap-1.5">
                {PREDICTION_QUESTIONS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPredIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === predIndex ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'}`}
                    aria-label={`Go to prediction ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-base sm:text-lg font-semibold text-white leading-snug">
              {PREDICTION_QUESTIONS[predIndex].question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PREDICTION_QUESTIONS[predIndex].options.map((opt, i) => {
                const isSelected = predAnswers[predIndex] === i;
                const submitted = predSubmitted[predIndex];
                const isCorrect = i === PREDICTION_QUESTIONS[predIndex].correctIndex;
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handlePredictionAnswer(i)}
                    disabled={submitted}
                    aria-label={`Prediction option: ${opt}`}
                    className={`p-4 text-left text-sm rounded-xl border transition-all duration-200 ${
                      submitted && isCorrect
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg'
                        : submitted && isSelected && !isCorrect
                        ? 'bg-rose-950/40 border-rose-600 text-rose-300'
                        : submitted
                        ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 border-slate-700 hover:bg-slate-750 text-slate-200 hover:border-gold-500/50'
                    }`}
                  >
                    <span className="font-mono text-gold-400 font-bold mr-2">[{String.fromCharCode(65 + i)}]</span> {opt}
                  </motion.button>
                );
              })}
            </div>

            {predSubmitted[predIndex] && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 mt-4 space-y-3">
                <p className={`text-sm font-medium ${predAnswers[predIndex] === PREDICTION_QUESTIONS[predIndex].correctIndex ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {predAnswers[predIndex] === PREDICTION_QUESTIONS[predIndex].correctIndex ? '✓ Excellent hypothesis! ' : '💡 Concept insight: '}
                  {PREDICTION_QUESTIONS[predIndex].explanation}
                </p>
                <div className="p-3 bg-gold-950/40 border border-gold-700/50 rounded-lg text-xs text-gold-300 font-mono">
                  🔍 <strong>How to verify:</strong> {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                </div>
                <div className="flex gap-3 pt-2">
                  {predIndex < PREDICTION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setPredIndex(prev => prev + 1)}
                      aria-label="Next prediction"
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                    >
                      Next Prediction ({predIndex + 2}/{PREDICTION_QUESTIONS.length}) →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleAdvanceToExploration}
                      aria-label="Proceed to interactive exploration"
                      className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
                    >
                      Enter Interactive Optics Lab to Verify →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: BRILLIANT INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Slide Progress */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>EXPLORATION STEP {currentSlide + 1} OF {EXPLORATION_STEPS.length}</span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-6 bg-gold-400' : i < currentSlide ? 'w-2 bg-gold-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-2.5 py-1 bg-gold-950 text-gold-300 rounded-md border border-gold-800 font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 <span className="font-semibold">{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </p>

              {/* ─── SLIDE 0: BREWSTER VISUALIZATION ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative flex justify-center">
                    <svg viewBox="0 0 440 260" className="w-full max-w-md h-auto select-none">
                      <rect x="20" y="20" width="400" height="110" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                      <rect x="20" y="130" width="400" height="110" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                      <line x1="20" y1="130" x2="420" y2="130" stroke="#06b6d4" strokeWidth="2" />
                      <text x="30" y="45" fill="#94a3b8" fontSize="11" fontFamily="monospace">Rarer Medium (Air, n1 = 1.00)</text>
                      <text x="30" y="155" fill="#38bdf8" fontSize="11" fontFamily="monospace">Denser Medium (Glass, n2 = {refractiveIndexMedium.toFixed(2)})</text>

                      {/* Normal */}
                      <line x1="220" y1="30" x2="220" y2="230" stroke="#64748b" strokeDasharray="4 4" strokeWidth="1.5" />
                      <text x="225" y="45" fill="#64748b" fontSize="10">Normal</text>

                      {/* Incident Ray */}
                      {(() => {
                        const len = 120;
                        const rad = (incidentAngleDeg * Math.PI) / 180;
                        const x0 = 220 - len * Math.sin(rad);
                        const y0 = 130 - len * Math.cos(rad);
                        return (
                          <g>
                            <line x1={x0} y1={y0} x2="220" y2="130" stroke="#f59e0b" strokeWidth="3" />
                            <circle cx={(x0 + 220) / 2} cy={(y0 + 130) / 2} r="3" fill="#f59e0b" />
                            <circle cx="170" cy="90" r="3" fill="#ffffff" />
                            <line x1="165" y1="85" x2="175" y2="95" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={x0 - 10} y={y0 - 5} fill="#f59e0b" fontSize="10">Incident (i = {incidentAngleDeg.toFixed(1)}°)</text>
                          </g>
                        );
                      })()}

                      {/* Reflected Ray */}
                      {(() => {
                        const len = 120;
                        const rad = (incidentAngleDeg * Math.PI) / 180;
                        const x1 = 220 + len * Math.sin(rad);
                        const y1 = 130 - len * Math.cos(rad);
                        return (
                          <g>
                            <line x1="220" y1="130" x2={x1} y2={y1} stroke={isAtBrewster ? '#22c55e' : '#f97316'} strokeWidth={isAtBrewster ? 3.5 : 2} />
                            <circle cx="270" cy="90" r="4" fill="#22c55e" stroke="#ffffff" strokeWidth="1" />
                            <text x={x1 - 20} y={y1 - 5} fill={isAtBrewster ? '#22c55e' : '#f97316'} fontSize="10" fontWeight="bold">
                              {isAtBrewster ? '100% s-Polarized Reflected Ray' : 'Partially Polarized'}
                            </text>
                          </g>
                        );
                      })()}

                      {/* Refracted Ray */}
                      {(() => {
                        const len = 110;
                        const rRad = (computedRefractionAngle * Math.PI) / 180;
                        const x2 = 220 + len * Math.sin(rRad);
                        const y2 = 130 + len * Math.cos(rRad);
                        return (
                          <g>
                            <line x1="220" y1="130" x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="2.5" />
                            <text x={x2 - 10} y={y2 + 15} fill="#38bdf8" fontSize="10">Refracted (r = {computedRefractionAngle.toFixed(1)}°)</text>
                          </g>
                        );
                      })()}

                      {/* 90° Arc indicator when close to Brewster */}
                      {isAtBrewster && (
                        <g>
                          <rect x="228" y="112" width="14" height="14" fill="none" stroke="#22c55e" strokeWidth="1.5" transform="rotate(-33.7 220 130)" />
                          <text x="260" y="145" fill="#22c55e" fontSize="11" fontWeight="bold">90° Perpendicular!</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Incident Angle (i):</span>
                        <span className="font-mono text-gold-300 font-bold">{incidentAngleDeg.toFixed(1)}°</span>
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={85}
                        step={0.5}
                        value={incidentAngleDeg}
                        onChange={(e) => handleBrewsterAngleChange(parseFloat(e.target.value))}
                        aria-label="Set Incident Angle"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Refractive Index (n2):</span>
                        <span className="font-mono text-gold-300 font-bold">{refractiveIndexMedium.toFixed(2)}</span>
                      </label>
                      <input
                        type="range"
                        min={1.1}
                        max={2.4}
                        step={0.02}
                        value={refractiveIndexMedium}
                        onChange={(e) => setRefractiveIndexMedium(parseFloat(e.target.value))}
                        aria-label="Set Refractive Index"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target Brewster i_p:</span>
                        <span className="font-mono text-emerald-400 font-bold">{computedBrewsterAngle.toFixed(1)}°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Angle between rays:</span>
                        <span className={`font-mono font-bold ${isAtBrewster ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {angleBetweenReflectedAndRefracted.toFixed(1)}°
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: RC TRANSIENT RESPONSE ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 420 220" className="w-full h-auto select-none">
                      <line x1="40" y1="180" x2="400" y2="180" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="40" y1="180" x2="40" y2="20" stroke="#64748b" strokeWidth="1.5" />
                      <text x="390" y="195" fill="#64748b" fontSize="10">t (ms)</text>
                      <text x="15" y="30" fill="#64748b" fontSize="10">V_C (V)</text>

                      <line x1="40" y1="40" x2="400" y2="40" stroke="#334155" strokeDasharray="3 3" />
                      <text x="45" y="35" fill="#38bdf8" fontSize="10">V_0 = {rcBatteryVoltage} V</text>

                      <line x1="112" y1="180" x2="112" y2="91" stroke="#f59e0b" strokeDasharray="2 2" />
                      <circle cx="112" cy="91" r="4" fill="#f59e0b" />
                      <text x="118" y="95" fill="#f59e0b" fontSize="9">tau = {rcTauMs.toFixed(1)} ms (63.2%)</text>

                      <path
                        d={(() => {
                          const pts: string[] = [];
                          for (let t = 0; t <= 5 * rcTauMs; t += rcTauMs / 10) {
                            const x = 40 + (t / (5 * rcTauMs)) * 340;
                            const frac = rcSwitchState === 'charge' ? (1 - Math.exp(-t / rcTauMs)) : Math.exp(-t / rcTauMs);
                            const y = 180 - frac * 140;
                            pts.push(`${t === 0 ? 'M' : 'L'} ${x} ${y}`);
                          }
                          return pts.join(' ');
                        })()}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2.5"
                      />

                      {(() => {
                        const xNow = 40 + (rcTimeElapsed / (5 * rcTauMs)) * 340;
                        const yNow = 180 - (rcCurrentVoltage / rcBatteryVoltage) * 140;
                        return (
                          <g>
                            <line x1={xNow} y1="180" x2={xNow} y2={yNow} stroke="#22c55e" strokeWidth="2" />
                            <circle cx={xNow} cy={yNow} r="5" fill="#22c55e" />
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRcToggleSwitch}
                        aria-label="Toggle charge or discharge"
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider ${
                          rcSwitchState === 'charge'
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                            : 'bg-gold-600 hover:bg-gold-500 text-white shadow-lg'
                        }`}
                      >
                        Mode: {rcSwitchState.toUpperCase()}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleResetRc}
                        aria-label="Reset RC timer"
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
                      >
                        Reset
                      </motion.button>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Resistance (R):</span>
                        <span className="font-mono text-gold-300 font-bold">{rcResistance} Ω</span>
                      </label>
                      <input
                        type="range"
                        min={200}
                        max={5000}
                        step={100}
                        value={rcResistance}
                        onChange={(e) => setRcResistance(parseFloat(e.target.value))}
                        aria-label="Set Resistance"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Capacitance (C):</span>
                        <span className="font-mono text-gold-300 font-bold">{rcCapacitance} µF</span>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={50}
                        step={1}
                        value={rcCapacitance}
                        onChange={(e) => setRcCapacitance(parseFloat(e.target.value))}
                        aria-label="Set Capacitance"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time Constant tau = RC:</span>
                        <span className="text-amber-400 font-bold">{rcTauMs.toFixed(1)} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Current V_C:</span>
                        <span className="text-emerald-400 font-bold">{rcCurrentVoltage.toFixed(2)} V</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: LC OSCILLATION LAB ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <canvas ref={canvasRef} width={380} height={140} className="w-full rounded-xl" />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Inductance L:</span>
                        <span className="font-mono text-gold-300 font-bold">{lcInductance} mH</span>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={50}
                        step={1}
                        value={lcInductance}
                        onChange={(e) => setLcInductance(parseFloat(e.target.value))}
                        aria-label="Set Inductance"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Capacitance C:</span>
                        <span className="font-mono text-gold-300 font-bold">{lcCapacitance} µF</span>
                      </label>
                      <input
                        type="range"
                        min={5}
                        max={100}
                        step={5}
                        value={lcCapacitance}
                        onChange={(e) => setLcCapacitance(parseFloat(e.target.value))}
                        aria-label="Set Capacitance"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Resonant f = 1/(2π√LC):</span>
                        <span className="text-emerald-400 font-bold">{lcFreqHz.toFixed(1)} Hz</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Peak Current I_0:</span>
                        <span className="text-gold-400 font-bold">{lcMaxCurrentI0.toFixed(2)} A</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: AC DYNAMO ROTATING COIL ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <canvas ref={canvasRef} width={380} height={140} className="w-full rounded-xl" />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Speed (RPM):</span>
                        <span className="font-mono text-gold-300 font-bold">{dynamoRpm} RPM ({dynamoFreqHz.toFixed(0)} Hz)</span>
                      </label>
                      <input
                        type="range"
                        min={120}
                        max={1800}
                        step={60}
                        value={dynamoRpm}
                        onChange={(e) => setDynamoRpm(parseFloat(e.target.value))}
                        aria-label="Set Dynamo RPM"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Magnetic Field B:</span>
                        <span className="font-mono text-gold-300 font-bold">{dynamoFieldB.toFixed(2)} T</span>
                      </label>
                      <input
                        type="range"
                        min={0.1}
                        max={1.5}
                        step={0.05}
                        value={dynamoFieldB}
                        onChange={(e) => setDynamoFieldB(parseFloat(e.target.value))}
                        aria-label="Set Magnetic Field"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Peak EMF ε_0 = NBAω:</span>
                        <span className="text-amber-400 font-bold">{dynamoPeakEmf.toFixed(1)} V</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">RMS EMF = ε_0 / √2:</span>
                        <span className="text-emerald-400 font-bold">{(dynamoPeakEmf / Math.SQRT2).toFixed(1)} V</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: X-RAY COOLIDGE & MOSELEY LAB ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 420 200" className="w-full h-auto select-none">
                      <line x1="40" y1="170" x2="400" y2="170" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="40" y1="170" x2="40" y2="20" stroke="#64748b" strokeWidth="1.5" />
                      <text x="380" y="185" fill="#64748b" fontSize="10">λ (Å)</text>
                      <text x="15" y="30" fill="#64748b" fontSize="10">Intensity</text>

                      {(() => {
                        const xMin = 40 + xrayLambdaMinAngstrom * 50;
                        const xKalpha = 40 + xrayKAlphaAngstrom * 50;
                        return (
                          <g>
                            <line x1={xMin} y1="170" x2={xMin} y2={140} stroke="#ef4444" strokeWidth="2" />
                            <text x={xMin - 15} y="185" fill="#ef4444" fontSize="9" fontWeight="bold">λ_min ({xrayLambdaMinAngstrom.toFixed(2)}Å)</text>

                            <path
                              d={`M ${xMin} 170 Q ${xMin + 40} 60, ${xMin + 120} 100 T 380 160`}
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="2.5"
                            />

                            {xKalpha > xMin && xKalpha < 380 && (
                              <g>
                                <line x1={xKalpha} y1="170" x2={xKalpha} y2="35" stroke="#22c55e" strokeWidth="3" />
                                <text x={xKalpha - 10} y="30" fill="#22c55e" fontSize="9" fontWeight="bold">K_α ({xrayKAlphaAngstrom.toFixed(2)}Å)</text>
                              </g>
                            )}
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Tube Voltage (kV):</span>
                        <span className="font-mono text-gold-300 font-bold">{xrayVoltageKv} kV</span>
                      </label>
                      <input
                        type="range"
                        min={15}
                        max={80}
                        step={1}
                        value={xrayVoltageKv}
                        onChange={(e) => setXrayVoltageKv(parseFloat(e.target.value))}
                        aria-label="Set X-ray Tube Voltage"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Target Element (Z):</span>
                        <span className="font-mono text-emerald-300 font-bold">
                          {xrayTargetZ === 42 ? 'Molybdenum (Z=42)' : xrayTargetZ === 74 ? 'Tungsten (Z=74)' : `Target Z=${xrayTargetZ}`}
                        </span>
                      </label>
                      <input
                        type="range"
                        min={20}
                        max={80}
                        step={1}
                        value={xrayTargetZ}
                        onChange={(e) => setXrayTargetZ(parseInt(e.target.value, 10))}
                        aria-label="Set Target Atomic Number"
                        className="w-full accent-gold-400 mt-1"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cut-off λ_min = hc/eV:</span>
                        <span className="text-rose-400 font-bold">{xrayLambdaMinAngstrom.toFixed(3)} Å</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">K_α Wavelength (Moseley):</span>
                        <span className="text-emerald-400 font-bold">{xrayKAlphaAngstrom.toFixed(3)} Å</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous lab slide"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl font-bold text-xs"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Next lab slide"
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Open sandbox mode"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs shadow-lg"
              >
                Open Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-emerald-300">🎮 Interactive STEM Sandbox</h3>
              <p className="text-xs text-slate-400">Test physics variables freely with real-time computational graphs.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Begin CISCE challenge test"
              className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
            >
              Start CISCE Challenges →
            </motion.button>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'brewster' as const, label: '1. Brewster Optics' },
              { id: 'rc' as const, label: '2. RC Transient' },
              { id: 'lc' as const, label: '3. LC Tank' },
              { id: 'dynamo' as const, label: '4. AC Dynamo' },
              { id: 'xray' as const, label: '5. Coolidge X-Ray' },
              { id: 'am' as const, label: '6. AM Telemetry' },
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSandboxActiveTab(tab.id)}
                aria-label={`Select ${tab.label}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  sandboxActiveTab === tab.id
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Sandbox Tab Content Container */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {sandboxActiveTab === 'am' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Carrier Frequency f_c:</span>
                      <span className="font-mono text-gold-300 font-bold">{amCarrierFreqKhz} kHz</span>
                    </label>
                    <input
                      type="range"
                      min={500}
                      max={2000}
                      step={50}
                      value={amCarrierFreqKhz}
                      onChange={(e) => setAmCarrierFreqKhz(parseFloat(e.target.value))}
                      aria-label="Set Carrier Frequency"
                      className="w-full accent-gold-400 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Modulating Frequency f_m:</span>
                      <span className="font-mono text-gold-300 font-bold">{amModFreqKhz} kHz</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={0.5}
                      value={amModFreqKhz}
                      onChange={(e) => setAmModFreqKhz(parseFloat(e.target.value))}
                      aria-label="Set Modulating Frequency"
                      className="w-full accent-gold-400 mt-1"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap justify-around text-center gap-4 text-xs font-mono">
                  <div>
                    <p className="text-slate-400">Lower Sideband (LSB)</p>
                    <p className="text-lg font-bold text-amber-400">{amCarrierFreqKhz - amModFreqKhz} kHz</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Carrier (f_c)</p>
                    <p className="text-lg font-bold text-gold-400">{amCarrierFreqKhz} kHz</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Upper Sideband (USB)</p>
                    <p className="text-lg font-bold text-emerald-400">{amCarrierFreqKhz + amModFreqKhz} kHz</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Total Bandwidth (2 f_m)</p>
                    <p className="text-lg font-bold text-purple-400">{amBandwidthKhz} kHz</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-6">
                Active real-time sandbox module: <span className="font-bold text-gold-300 uppercase">{sandboxActiveTab}</span>. Adjust controls above or launch challenge series!
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SYSTEM (22 PROGRESSIVE NEP 2020 PROBLEMS) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <span className="text-gold-400 font-bold uppercase">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                Node: {challenge.nodeId}
              </span>
              <span className="text-xs text-amber-400 font-semibold uppercase">
                Level: {challenge.difficulty}
              </span>
            </div>

            <p className="text-base sm:text-lg font-bold text-white mb-6 leading-snug">
              {challenge.question}
            </p>

            {/* ─── CHALLENGE TYPE 1: MCQ (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold shadow-lg'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500/50'
                    }`}
                  >
                    <span className="font-mono text-gold-400 font-bold mr-2">[{String.fromCharCode(65 + i)}]</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── CHALLENGE TYPE 2: DRAG-LABEL (Interactive Diagram) ──�� */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1 font-mono">Drag labels onto matching diagram slots:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-2 bg-gold-900/80 hover:bg-gold-800 border border-gold-600 text-white rounded-lg text-xs font-semibold cursor-grab select-none shadow-md"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map(item => (
                    <div
                      key={item.targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 flex flex-col justify-center items-center min-h-[70px] text-center"
                    >
                      <span className="text-xs font-mono text-slate-400 mb-1">Target Slot: {item.targetId.replace('target_', '')}</span>
                      <span className={`text-xs font-bold ${droppedLabels[item.targetId] ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {droppedLabels[item.targetId] || '[ Drop matching label here ]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Submit label assignments"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Diagram Labels →
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 3: DRAG-SORT (Process Sequences) ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-mono">Drag and reorder items to match correct sequence:</span>
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
                      const from = parseInt(draggedItem || '0', 10);
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    role="button"
                    aria-label={`Sort step ${displayIdx + 1}: ${item}`}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span><strong className="text-gold-400 mr-2">{displayIdx + 1}.</strong> {item}</span>
                    <span className="text-slate-500 font-mono">↕ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  aria-label="Submit arranged sequence"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md mt-2"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 4: NUMERIC (Physics Computation) ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Enter calculated numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500 w-48"
                  />
                  <span className="text-sm font-mono text-gold-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    aria-label="Submit numeric computation"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 5: CONSTRUCT EQUATION ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1 font-mono">Click components to assemble equation:</span>
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add component ${part}`}
                      className="px-3 py-1.5 bg-gold-950 hover:bg-gold-900 border border-gold-700 text-gold-200 rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gold-900/80 text-white rounded-md text-xs font-mono flex items-center gap-1.5">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                        aria-label="Remove part"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 font-mono">[ Assembled equation appears here ]</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  aria-label="Submit assembled equation"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Equation Structure →
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-4">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                  📘 Step-by-Step Physics Derivation & Walkthrough
                </span>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((step, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-100/90 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-mono">Step {i + 1}:</strong> {step}{!step.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Reveal next step"
                    className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold font-mono"
                  >
                    Reveal Next Step ➔
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    aria-label="Advance to next challenge"
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Class 12 Physics Suite Completed!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Your overall proficiency score: <span className="text-emerald-400 font-bold font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</span> •
              Adaptive Mastery Level: <span className="text-gold-400 font-bold uppercase font-mono">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-sm font-medium text-slate-200">
              {errors === 0
                ? '🌟 Flawless Mastery! You scored 100% on CISCE physics competency problems.'
                : errors <= 3
                ? '🌟 Stellar Performance! You demonstrated thorough understanding of radiation, optics, and AC oscillations.'
                : '📈 Good Effort! Review the misconception profile below to polish your derivation steps before your board exams.'}
            </p>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 font-mono uppercase">🎯 Diagnostic Misconceptions Identified</h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule (SM-2 Visibility) */}
          <div className="p-6 bg-gradient-to-r from-amber-950/40 to-gold-950/40 rounded-2xl border border-amber-600/50 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-bold text-amber-300 font-mono uppercase flex items-center gap-2">
                <span>📅</span> Spaced Repetition Schedule (SM-2 Algorithm)
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase tracking-wide">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your response performance ({errors} error{errors === 1 ? '' : 's'}), your optimal spaced retrieval window is scheduled for{' '}
              <strong className="text-amber-300 font-semibold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to ensure neural memory retention before CISCE examinations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center font-mono text-xs">
              <div className={`p-2.5 rounded-xl border ${errors === 0 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold shadow' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                0 Errors: Review in 7 days
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-amber-950/80 border-amber-500 text-amber-300 font-bold shadow' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                1-3 Errors: Review in 3 days
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 4 ? 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold shadow' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                4+ Errors: Review in 1 day
              </div>
            </div>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gold-400 text-lg">🛰️</span>
              <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                  <span className="text-gold-400 font-bold mr-1">0{i + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="CISCE Physics Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PhysicsBrewstersPolarizationReflectionSim;