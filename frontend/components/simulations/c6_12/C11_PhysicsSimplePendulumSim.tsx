'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 PHYSICS NODE IDENTIFIERS ───
const NODE_C11_PHY_091 = 'c11_phy_091'; // Simple pendulum
const NODE_C11_PHY_092 = 'c11_phy_092'; // Spring oscillator
const NODE_C11_PHY_093 = 'c11_phy_093'; // Wave motion and wave equation
const NODE_C11_PHY_094 = 'c11_phy_094'; // Transverse and longitudinal waves
const NODE_C11_PHY_095 = 'c11_phy_095'; // Speed of wave motion and Newton's/Laplace's formula
const NODE_C11_PHY_096 = 'c11_phy_096'; // Principle of superposition and interference
const NODE_C11_PHY_097 = 'c11_phy_097'; // Standing waves in strings
const NODE_C11_PHY_098 = 'c11_phy_098'; // Standing waves in organ pipes
const NODE_C11_PHY_099 = 'c11_phy_099'; // Beats
const NODE_C11_PHY_100 = 'c11_phy_100'; // Doppler effect

const ALL_NODE_IDS = [
  NODE_C11_PHY_091,
  NODE_C11_PHY_092,
  NODE_C11_PHY_093,
  NODE_C11_PHY_094,
  NODE_C11_PHY_095,
  NODE_C11_PHY_096,
  NODE_C11_PHY_097,
  NODE_C11_PHY_098,
  NODE_C11_PHY_099,
  NODE_C11_PHY_100,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Acoustic & Harmonic Observatory at Kodaikanal',
  intro: 'You are the lead acoustician and mechanics researcher at the high-altitude Kodaikanal Observatory. Precision timing systems, seismic wave monitors, acoustic organ resonance chambers, and Doppler radar arrays require exact mathematical calibration.',
  context: 'From calibrating seconds pendulums and high-frequency quartz springs to predicting Laplace sound speed corrections in humid fog and resolving Doppler shifts of approaching trains at the base station, your physics insight governs the observatory.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Two identical simple pendulums swing side by side: Bob A is made of dense lead (mass 500 g) and Bob B is made of light wood (mass 50 g). Both have identical length string (1.0 m) and swing through 5°. Which bob completes 10 oscillations first?',
  options: [
    'Bob A (Lead) — heavier mass pulls down harder and swings faster',
    'Bob B (Wood) — lighter mass has less inertia and accelerates quicker',
    'Both finish at the exact same time — mass cancels out in SHM',
    'Bob A takes twice as long because momentum is 10× greater',
  ],
  correctIndex: 2,
  hintAfter: 'Surprised? In simple harmonic motion, gravitational mass and inertial mass cancel out completely! Let us explore the math and physics behind this.',
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

// ─── 22 CHALLENGES (NEP 2020 & CISCE 2026 SPECIFICATION) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_01_pend_fund',
    nodeId: NODE_C11_PHY_091,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under what condition does a simple pendulum execute true Simple Harmonic Motion (SHM)?',
    options: [
      'Only when angular displacement θ is small (< 15°) such that sin θ ≈ θ',
      'At any angle of release up to 90°',
      'Only when the bob mass exceeds 1 kg',
      'When the string is elastic and stretches during the swing',
    ],
    correctIndex: 0,
    explanation: 'SHM requires restoring force proportional to displacement. F = -mg sin θ ≈ -mg(x/L) holds strictly when sin θ ≈ θ in radians (small-angle approximation, θ < 15°).',
    hints: [
      'Think about the restoring force equation F = -mg sin θ.',
      'For what angles does sin θ equal θ in radians?',
      'Small angles (< 15°) allow linearizing the restoring force into F = -(mg/L)x.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02_spring_diag',
    nodeId: NODE_C11_PHY_092,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the kinematic and physical terms to their proper role in a vertical spring-mass oscillator.',
    dragItems: [
      { label: 'Static Extension δ = mg/k', targetId: 'zone_equilibrium' },
      { label: 'Restoring Force F = -kx', targetId: 'zone_restoring' },
      { label: 'Max Velocity v_max = Aω', targetId: 'zone_mean_pos' },
      { label: 'Max Acceleration a_max = ω²A', targetId: 'zone_extreme' },
    ],
    correctMapping: {
      zone_equilibrium: 'Static Extension δ = mg/k',
      zone_restoring: 'Restoring Force F = -kx',
      zone_mean_pos: 'Max Velocity v_max = Aω',
      zone_extreme: 'Max Acceleration a_max = ω²A',
    },
    explanation: 'Gravity shifts the equilibrium position downward by δ = mg/k. About this new equilibrium, the net restoring force is strictly -kx, giving max speed at the mean position and max acceleration at extremes.',
    hints: [
      'What balances weight mg before release? The static stretch.',
      'Where does the oscillating block move fastest? At the new equilibrium point.',
      'Where is the spring stretched/compressed most? At the extremes.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03_wave_direction',
    nodeId: NODE_C11_PHY_093,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A progressive wave equation is given by y = 0.05 sin(20πt + 4πx) in SI units. In which direction and at what speed does this wave propagate?',
    options: [
      'Negative x-direction (leftward) at speed v = 5 m/s',
      'Positive x-direction (rightward) at speed v = 5 m/s',
      'Negative x-direction (leftward) at speed v = 80π² m/s',
      'Positive x-direction (rightward) at speed v = 0.2 m/s',
    ],
    correctIndex: 0,
    explanation: 'For a wave y = A sin(ωt + kx), the plus sign indicates leftward propagation (-x). Wave speed v = ω/k = (20π)/(4π) = 5 m/s.',
    hints: [
      'Identify ω = 20π rad/s and k = 4π rad/m from y = A sin(ωt + kx).',
      'Wave speed v = ω/k.',
      'Remember: + sign between x and t terms signifies motion along the -x axis.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_wave_types',
    nodeId: NODE_C11_PHY_094,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly pairs wave type with particle motion relative to propagation direction?',
    options: [
      'Transverse: Particles vibrate perpendicular to propagation; Longitudinal: Particles vibrate parallel',
      'Transverse: Particles vibrate parallel to propagation; Longitudinal: Particles vibrate perpendicular',
      'Transverse: Particles move in continuous circles; Longitudinal: Particles remain completely stationary',
      'Transverse: Transports matter; Longitudinal: Transports only energy',
    ],
    correctIndex: 0,
    explanation: 'In transverse waves (e.g., string waves, light), particle oscillation is perpendicular to wave velocity. In longitudinal waves (e.g., sound in air), particle oscillation is parallel, forming compressions and rarefactions.',
    hints: [
      'Think of a shaken rope vs. a compressed slinky.',
      'Sound in air creates compressions along the line of travel.',
      'Transverse means across/perpendicular; longitudinal means along.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05_laplace_reason',
    nodeId: NODE_C11_PHY_095,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why did Laplace correct Newton’s formula v = √(P/ρ) for the speed of sound in air to v = √(γP/ρ)?',
    options: [
      'Sound compressions and rarefactions occur so rapidly that heat cannot exchange; the process is adiabatic (B = γP), not isothermal (B = P)',
      'Newton forgot to multiply by the speed of light',
      'Air becomes an ideal solid when sound waves travel through it',
      'Laplace assumed sound is a transverse electromagnetic wave',
    ],
    correctIndex: 0,
    explanation: 'Newton assumed isothermal compressions where heat flows freely (B_iso = P). Laplace proved vibrations at hundreds of Hz are adiabatic with no time for thermal exchange, so adiabatic bulk modulus B_ad = γP applies.',
    hints: [
      'How fast do sound pressure waves compress and expand air?',
      'Does heat have enough time to conduct away during a 1/500th second cycle?',
      'No heat transfer means adiabatic, introducing the ratio of specific heats γ = Cp/Cv.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06_superposition_principle',
    nodeId: NODE_C11_PHY_096,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What happens when two mechanical wave pulses overlap and pass through each other in a medium?',
    options: [
      'Their displacements add algebraically at each point (y = y₁ + y₂), and both emerge completely intact',
      'They collide and bounce backward with lost energy',
      'They permanently merge into a single pulse of double wavelength',
      'The larger pulse absorbs the smaller pulse entirely',
    ],
    correctIndex: 0,
    explanation: 'The principle of superposition states y_net = y₁ + y₂. Waves pass through each other without altering their individual identities, frequencies, amplitudes, or directions.',
    hints: [
      'Think of two ripples crossing on the surface of a pond.',
      'Superposition is linear addition of individual displacements.',
      'Waves do not collide like solid billiard balls; they superpose and continue.',
    ],
  },
  {
    id: 'ch_07_beats_def',
    nodeId: NODE_C11_PHY_099,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Two tuning forks of frequencies 384 Hz and 388 Hz are sounded simultaneously. How many beats are heard in a 5-second interval?',
    correctAnswer: 20,
    tolerance: 0,
    unit: 'beats',
    explanation: 'Beat frequency f_beat = |f₁ - f₂| = |388 - 384| = 4 Hz (4 beats/s). In 5 seconds, Total Beats = 4 beats/s × 5 s = 20 beats.',
    hints: [
      'Find the beat frequency first using f_beat = |f₁ - f₂|.',
      'f_beat = 388 - 384 = 4 beats per second.',
      'Multiply beat frequency by total time (4 × 5).',
    ],
    misconceptionIndex: 4,
  },

  // Standard Tier (8-15)
  {
    id: 'ch_08_seconds_pendulum',
    nodeId: NODE_C11_PHY_091,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the length of a seconds pendulum (T = 2.0 s) on Earth where g = 9.80 m/s². (Take π² ≈ 9.8696)',
    correctAnswer: 0.993,
    tolerance: 0.01,
    unit: 'm',
    explanation: 'From T = 2π√(L/g), rearranging gives L = gT²/(4π²) = (9.80 × 4)/(4 × 9.8696) = 9.80 / 9.8696 ≈ 0.993 m (or 99.3 cm).',
    hints: [
      'A seconds pendulum has a time period T = 2.0 s (1 second for each half swing).',
      'Rearrange T = 2π√(L/g) to solve for L: L = gT²/(4π²).',
      'Substitute T = 2, g = 9.8: L = 9.8 × 4 / (4 × π²) = 9.8 / 9.87 ≈ 0.993 m.',
    ],
  },
  {
    id: 'ch_09_spring_speed',
    nodeId: NODE_C11_PHY_092,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 0.50 kg mass on a frictionless horizontal spring with k = 200 N/m is pulled 0.06 m from equilibrium and released. Find its maximum speed in m/s.',
    correctAnswer: 1.20,
    tolerance: 0.05,
    unit: 'm/s',
    explanation: 'Angular frequency ω = √(k/m) = √(200 / 0.5) = √400 = 20 rad/s. Maximum speed v_max = Aω = 0.06 m × 20 rad/s = 1.20 m/s.',
    hints: [
      'Find angular frequency ω using ω = √(k/m).',
      'ω = √(200/0.5) = 20 rad/s.',
      'Use v_max = A × ω = 0.06 × 20.',
    ],
  },
  {
    id: 'ch_10_string_modes',
    nodeId: NODE_C11_PHY_097,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the harmonic modes of a stretched string fixed at both ends in order of increasing frequency and number of antinodes.',
    sortItems: [
      'Fundamental mode (1 loop, λ = 2L, f = v/2L)',
      '2nd Harmonic / 1st Overtone (2 loops, λ = L, f = 2v/2L)',
      '3rd Harmonic / 2nd Overtone (3 loops, λ = 2L/3, f = 3v/2L)',
      '4th Harmonic / 3rd Overtone (4 loops, λ = L/2, f = 4v/2L)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'For a string of length L fixed at both ends, allowed frequencies are f_n = n(v/2L) for n = 1, 2, 3, 4 with n antinode loops.',
    hints: [
      'Fundamental has 1 loop and lowest frequency.',
      'Each higher harmonic adds one extra antinode loop and increases frequency by f₁.',
      'Order: Fundamental (n=1) → 2nd harmonic (n=2) → 3rd (n=3) → 4th (n=4).',
    ],
  },
  {
    id: 'ch_11_organ_pipe_ratio',
    nodeId: NODE_C11_PHY_098,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An open organ pipe and a closed organ pipe have the exact same physical length L. What is the ratio of their fundamental frequencies (f_open : f_closed)?',
    options: [
      '2 : 1 (Open pipe sounds one octave higher)',
      '1 : 2 (Closed pipe sounds one octave higher)',
      '1 : 1 (Both produce identical pitch because lengths are equal)',
      '4 : 1 (Open pipe is two octaves higher)',
    ],
    correctIndex: 0,
    explanation: 'Fundamental of open pipe is f_open = v/(2L). Fundamental of closed pipe is f_closed = v/(4L). Therefore f_open / f_closed = (v/2L) / (v/4L) = 4/2 = 2 : 1.',
    hints: [
      'Open pipe has antinodes at both ends: L = λ/2 → f = v/(2L).',
      'Closed pipe has node at closed end, antinode at open end: L = λ/4 → f = v/(4L).',
      'Divide f_open by f_closed: (v/2L) / (v/4L) = 2.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_12_temp_sound_speed',
    nodeId: NODE_C11_PHY_095,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the linear temperature approximation v ≈ 331 + 0.60 t m/s, calculate the speed of sound in air on a hot summer afternoon at 35 °C.',
    correctAnswer: 352,
    tolerance: 1,
    unit: 'm/s',
    explanation: 'v ≈ 331 + (0.60 × 35) = 331 + 21 = 352 m/s.',
    hints: [
      'Use the formula v = 331 + 0.60 × t.',
      'Multiply 0.60 by 35 °C = 21 m/s.',
      'Add 21 m/s to 331 m/s.',
    ],
  },
  {
    id: 'ch_13_doppler_approach',
    nodeId: NODE_C11_PHY_100,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A locomotive blows a 600 Hz whistle while approaching a stationary station master at 34 m/s. Speed of sound in air is 340 m/s. What apparent frequency is heard?',
    correctAnswer: 666.7,
    tolerance: 2,
    unit: 'Hz',
    explanation: 'For a moving source approaching stationary observer: f\' = f × [v / (v - v_s)] = 600 × [340 / (340 - 34)] = 600 × [340 / 306] = 666.67 Hz.',
    hints: [
      'Observer is stationary (v_o = 0), source is approaching (use minus in denominator).',
      'Formula: f\' = f × v / (v - v_s).',
      'Substitute: 600 × 340 / (340 - 34) = 600 × 340 / 306 ≈ 666.7 Hz.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_14_guitar_tuning',
    nodeId: NODE_C11_PHY_099,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A musician sounds a 440 Hz standard tuning fork alongside an out-of-tune sitar string and hears 4 beats/sec. She slightly tightens the string peg and now hears 2 beats/sec. What was the string’s original frequency?',
    options: [
      '436 Hz (tightening increased frequency toward 440 Hz)',
      '444 Hz (tightening increased frequency further away)',
      '442 Hz',
      '438 Hz',
    ],
    correctIndex: 0,
    explanation: 'Initial beat frequency is 4 Hz, so string was either 436 Hz or 444 Hz. Tightening a string increases tension T and frequency (f ∝ √T). Since the beat rate decreased from 4 to 2 Hz, the frequency got closer to 440 Hz (moved from 436 to 438 Hz). Thus, original was 436 Hz.',
    hints: [
      'Initial candidates: 440 - 4 = 436 Hz OR 440 + 4 = 444 Hz.',
      'Tightening peg raises string frequency.',
      'If it were 444 Hz, raising it would increase beat rate (e.g., to 5 or 6 Hz). Because beats dropped to 2 Hz, it must have risen from 436 Hz.',
    ],
  },
  {
    id: 'ch_15_phase_path_diff',
    nodeId: NODE_C11_PHY_093,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A sound wave of wavelength λ = 0.80 m travels through air. What is the phase difference in radians between two points separated along the path by Δx = 0.20 m?',
    correctAnswer: 1.57,
    tolerance: 0.05,
    unit: 'rad (π/2)',
    explanation: 'Phase difference Δφ = (2π/λ) × Δx = (2π / 0.80) × 0.20 = 2π × 0.25 = π/2 ≈ 1.57 rad (90°).',
    hints: [
      'Use the master relation Δφ = (2π/λ) × Δx.',
      'Δx / λ = 0.20 / 0.80 = 1/4 of a wavelength.',
      'A path difference of λ/4 corresponds to a phase difference of 2π / 4 = π/2 ≈ 1.57 rad.',
    ],
  },

  // Advanced Tier (16-22)
  {
    id: 'ch_16_construct_doppler_equation',
    nodeId: NODE_C11_PHY_100,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the master Doppler frequency formula for an observer moving toward a source while the source simultaneously recedes from the observer.',
    availableParts: ["f'", '=', 'f', '×', '[(v + v_o)', '[(v - v_o)', '/', '(v + v_s)]', '(v - v_s)]'],
    targetState: "f' = f × [(v + v_o) / (v + v_s)]",
    validationHint: 'Rule: Observer toward -> +v_o in numerator. Source receding -> +v_s in denominator.',
    explanation: 'When observer approaches (+v_o in numerator), apparent frequency rises. When source recedes (+v_s in denominator), apparent frequency lowers. Net: f\' = f × [(v + v_o) / (v + v_s)].',
    hints: [
      'Observer moving toward source increases frequency -> use (v + v_o) in numerator.',
      'Source moving away from observer decreases frequency -> use (v + v_s) in denominator.',
      'Assemble terms in order: f\' = f × [(v + v_o) / (v + v_s)].',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_17_closed_pipe_resonances',
    nodeId: NODE_C11_PHY_098,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a resonance tube apparatus with tuning fork f = 500 Hz, the 1st resonance occurs at L₁ = 0.17 m and the 2nd resonance at L₂ = 0.51 m. Calculate the experimental speed of sound in m/s.',
    correctAnswer: 340,
    tolerance: 2,
    unit: 'm/s',
    explanation: 'Distance between consecutive resonances is L₂ - L₁ = λ/2 = 0.51 - 0.17 = 0.34 m. Thus λ = 2 × 0.34 = 0.68 m. Speed v = fλ = 500 Hz × 0.68 m = 340 m/s.',
    hints: [
      'The difference L₂ - L₁ eliminates end-correction and equals λ/2.',
      'λ = 2 × (L₂ - L₁) = 2 × (0.51 - 0.17) = 0.68 m.',
      'v = f × λ = 500 × 0.68.',
    ],
  },
  {
    id: 'ch_18_sonometer_law_eval',
    nodeId: NODE_C11_PHY_097,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "Doubling the tension T on a sonometer wire will double its fundamental frequency." Evaluate this statement with physical reasoning.',
    options: [
      'Incorrect: f ∝ √T, so doubling tension increases frequency by only √2 ≈ 1.414×. To double frequency, tension must be quadrupled (4×).',
      'Correct: Tension and frequency are directly linear in Hooke’s elastic regime.',
      'Incorrect: Doubling tension halves the frequency because the wire becomes thinner.',
      'Incorrect: Tension has no effect on frequency; only wire length matters.',
    ],
    correctIndex: 0,
    explanation: 'The fundamental frequency is f = (1/2L)√(T/m). Because f depends on the square root of tension, f_new = √(2) f_old ≈ 1.414 f_old. Quadrupling tension (4T) is required to double frequency.',
    hints: [
      'Look at the sonometer formula: f = (1/2L)√(T/m).',
      'What is the power of T in this relation? It is T^(1/2).',
      'If T -> 2T, then f -> √2 × f ≈ 1.414 f.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_19_superposition_interference_calc',
    nodeId: NODE_C11_PHY_096,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Two coherent sound sources emit waves of identical amplitude A = 4 mm and frequency 200 Hz. If they meet at a point with phase difference Δφ = 2π/3 rad (120°), what is the resultant amplitude in mm? (Use A_res = 2A cos(Δφ/2))',
    correctAnswer: 4.0,
    tolerance: 0.1,
    unit: 'mm',
    explanation: 'Resultant amplitude A_res = 2A cos(Δφ/2) = 2(4 mm) cos(60°) = 8 × 0.5 = 4.0 mm.',
    hints: [
      'For equal amplitudes A₁ = A₂ = A, resultant amplitude is A_res = 2A cos(Δφ/2).',
      'Half of the phase angle: Δφ/2 = (120°)/2 = 60° (or π/3 rad).',
      'cos(60°) = 0.5. So A_res = 2 × 4 × 0.5 = 4.0 mm.',
    ],
  },
  {
    id: 'ch_20_density_humidity_eval',
    nodeId: NODE_C11_PHY_095,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does sound travel FASTER on a humid monsoon day than on a dry winter day at the same temperature and pressure?',
    options: [
      'Water vapour (molar mass 18 g/mol) is lighter than dry air (avg 29 g/mol), reducing total mixture density ρ; since v = √(γP/ρ), lower density increases speed',
      'Liquid water drops in the air conduct sound like solid steel bars',
      'Humidity increases the atmospheric pressure by 50%',
      'Monsoon winds physically drag the wavefronts at supersonic velocities',
    ],
    correctIndex: 0,
    explanation: 'Moist air contains H₂O molecules (M = 18) replacing heavier N₂ (28) and O₂ (32) molecules at constant pressure, lowering the effective density ρ. Since v ∝ 1/√ρ, lower density results in higher sound speed.',
    hints: [
      'Compare molecular mass of water vapor (H₂O = 18) to dry air (N₂ = 28, O₂ = 32).',
      'What happens to the density of the air mixture when lighter water vapor is added?',
      'Since v = √(γP/ρ), lower density ρ leads to higher speed v.',
    ],
  },
  {
    id: 'ch_21_doppler_wall_reflection',
    nodeId: NODE_C11_PHY_100,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A bat flying at 10 m/s directly toward a flat wall emits an ultrasonic pulse at 40 kHz. Speed of sound is 340 m/s. What frequency does the bat detect in the reflected echo?',
    correctAnswer: 42424,
    tolerance: 100,
    unit: 'Hz',
    explanation: 'Step 1: Wall receives f_wall = f × [v/(v - v_bat)] = 40000 × (340/330) = 41212.1 Hz. Step 2: Bat acts as moving observer receiving from stationary wall: f_echo = f_wall × [(v + v_bat)/v] = 41212.1 × (350/340) = 40000 × (350/330) ≈ 42,424 Hz.',
    hints: [
      'This is a two-step Doppler problem: moving source to wall, then moving observer from wall.',
      'Combined formula: f_echo = f × (v + v_bat) / (v - v_bat).',
      'f_echo = 40000 × (340 + 10) / (340 - 10) = 40000 × 350 / 330 ≈ 42424 Hz.',
    ],
  },
  {
    id: 'ch_22_spring_vertical_gravity',
    nodeId: NODE_C11_PHY_092,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does the time period of a vertical mass-spring oscillator compare to an identical horizontal mass-spring oscillator?',
    options: [
      'They have identical time periods T = 2π√(m/k); gravity only shifts the equilibrium position by δ = mg/k without altering the restoring stiffness k',
      'The vertical oscillator is slower because gravity opposes upward motion',
      'The vertical oscillator has half the period because gravity adds downward energy',
      'The horizontal oscillator period depends on the table material while vertical is independent',
    ],
    correctIndex: 0,
    explanation: 'At static equilibrium, kδ = mg. When displaced by x, F_net = mg - k(δ + x) = mg - kδ - kx = -kx. The differential equation d²x/dt² + (k/m)x = 0 remains identical, so T = 2π√(m/k) is unchanged by gravity.',
    hints: [
      'Write net force on vertical mass: F_net = mg - k(δ + x).',
      'Remember static equilibrium condition: kδ = mg.',
      'mg cancels with kδ, leaving F_net = -kx. Frequency is unaffected by constant gravity.',
    ],
    misconceptionIndex: 0,
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
  nodeId: NODE_C11_PHY_091,
  title: 'Simple Pendulum, Oscillations, Sound Waves & Doppler Effect',
  definition: 'An integrated laboratory covering Simple Harmonic Motion (pendulum and spring oscillators), wave equations, Laplace sound speed formula, superposition & standing waves in strings/pipes, beats, and the Doppler effect for acoustics.',
  eli5: 'Oscillations are rhythmic back-and-forth swings. Waves are traveling vibrations that carry energy. When waves overlap, they can amplify, cancel, create standing musical tones, pulse as beats, or shift pitch when objects move!',
  misconceptions: [
    {
      misconception: 'Heavier pendulum bobs or bigger spring loads always take longer to swing because of mass.',
      correction: 'In a simple pendulum, mass cancels out completely in T = 2π√(L/g). For a spring, mass increases inertia but time period T = 2π√(m/k) is strictly independent of amplitude.',
    },
    {
      misconception: 'The simple pendulum formula T = 2π√(L/g) works for wide swings of 60° or 90°.',
      correction: 'The formula requires the small-angle approximation sin θ ≈ θ (in radians), which holds strictly for θ < 15°. Wide swings have longer non-SHM periods.',
    },
    {
      misconception: 'In y = A sin(kx + ωt), the plus sign means the wave is moving rightward (+x).',
      correction: 'A plus sign indicates leftward (-x) propagation; to keep constant phase (kx + ωt = const), x must decrease as t increases.',
    },
    {
      misconception: 'Sound speed increases with higher air pressure at constant temperature.',
      correction: 'At constant temperature, increasing pressure increases density proportionally (Boyle’s law P/ρ = const), leaving v = √(γP/ρ) completely unchanged.',
    },
    {
      misconception: 'Beats occur by adding the two frequencies together.',
      correction: 'Beat frequency is the absolute DIFFERENCE f_beat = |f₁ - f₂|, representing periodic constructive and destructive interference over time.',
    },
    {
      misconception: 'The Doppler frequency increase on approach equals the decrease on recession for a moving source.',
      correction: 'Because the moving source speed v_s sits in the denominator [v/(v ± v_s)], approach shift [v/(v - v_s)] is greater than recession drop [v/(v + v_s)].',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the time period of a seconds pendulum?', options: ['1.0 s', '2.0 s', '0.5 s', '4.0 s'], correctIndex: 1 },
    { question: 'Which parameter does NOT affect the time period of a simple pendulum for small swings?', options: ['String length L', 'Acceleration due to gravity g', 'Mass of the bob m', 'Altitude'], correctIndex: 2 },
    { question: 'What is the phase difference between two points separated by half a wavelength (λ/2)?', options: ['π/2 rad (90°)', 'π rad (180°)', '2π rad (360°)', '0 rad'], correctIndex: 1 },
    { question: 'What type of wave is sound in air at room temperature?', options: ['Transverse electromagnetic', 'Longitudinal mechanical', 'Transverse torsional', 'Surface capillary'], correctIndex: 1 },
    { question: 'In an open organ pipe of length L, the fundamental frequency is:', options: ['v / 4L', 'v / 2L', '2v / L', 'v / L'], correctIndex: 1 },
    { question: 'What is the beat frequency between 256 Hz and 260 Hz tuning forks?', options: ['516 Hz', '4 Hz', '2 Hz', '0.5 Hz'], correctIndex: 1 },
    { question: 'When a sound source moves toward a stationary observer, the apparent frequency:', options: ['Increases', 'Decreases', 'Remains unchanged', 'Becomes zero'], correctIndex: 0 },
    { question: 'Laplace corrected Newton’s formula by assuming sound propagation is:', options: ['Isothermal', 'Adiabatic', 'Isobaric', 'Isochoric'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates rigorous theoretical and mathematical mastery across SHM oscillations, wave mechanics, standing waves in strings/pipes, beats, and Doppler calculations.',
};

// ─── BRILLIANT INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Simple Pendulum & Gravitational Independence of Mass',
    instruction: 'Adjust the pendulum length L, bob mass m, and gravity g. Watch how period T updates in real-time.',
    interactionType: 'pendulum-sim',
    nodeId: NODE_C11_PHY_091,
  },
  {
    title: 'Lab 2: Spring Oscillator — Horizontal vs Vertical Balance',
    instruction: 'Toggle between Horizontal and Vertical modes. Observe that gravity only shifts equilibrium position δ = mg/k while oscillation frequency remains identical.',
    interactionType: 'spring-sim',
    nodeId: NODE_C11_PHY_092,
  },
  {
    title: 'Lab 3: Traveling Wave Equation & Phase Visualizer',
    instruction: 'Change frequency f and wavelength λ. Track how a wave crest travels and observe phase difference between two probe points.',
    interactionType: 'wave-sim',
    nodeId: NODE_C11_PHY_093,
  },
  {
    title: 'Lab 4: Standing Waves in Strings & Organ Pipes (Harmonics)',
    instruction: 'Select harmonic mode n (1 to 4) and switch between string, open pipe, and closed pipe to view nodes and antinodes.',
    interactionType: 'standing-sim',
    nodeId: NODE_C11_PHY_097,
  },
  {
    title: 'Lab 5: Beats & Doppler Wavefront Compression',
    instruction: 'Adjust source speed v_s and tune two sound frequencies to observe acoustic beat envelopes and Doppler wavefront crowding.',
    interactionType: 'doppler-beats-sim',
    nodeId: NODE_C11_PHY_100,
  },
];

// ─── PREDICT-THEN-CHECK ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you take a precision pendulum clock from Earth (g = 9.8 m/s²) to the Moon (g = 1.62 m/s²), what happens to its time period T?',
    options: [
      'T increases by ~2.46× (swings much slower, clock loses time)',
      'T decreases by ~2.46× (swings much faster, clock gains time)',
      'T remains exactly identical because length is unchanged',
      'T becomes zero because moon has no air',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now set the Gravity slider in the sandbox to Moon (1.62 m/s²) and watch the swing timer verify your prediction!',
    nodeId: NODE_C11_PHY_091,
  },
  {
    question: 'Predict: If an organ pipe is closed at one end, what happens to its fundamental frequency compared to when it was open at both ends?',
    options: [
      'Fundamental frequency halves (drops by 1 octave: f_closed = v/4L vs f_open = v/2L)',
      'Fundamental frequency doubles',
      'Frequency stays identical because pipe length is unchanged',
      'It produces only even harmonics',
    ],
    correctIndex: 0,
    verifyInstruction: 'Switch the Organ Pipe model from Open to Closed in Lab 4 and observe the fundamental frequency meter.',
    nodeId: NODE_C11_PHY_098,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the nodes and antinodes in a closed organ pipe?',
    observableOptions: [
      'There is ALWAYS a displacement node at the closed end and an antinode at the open end',
      'There are antinodes at both ends',
      'Nodes and antinodes swap positions every quarter second',
      'There are no nodes formed inside a closed pipe',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_PHY_098,
  },
  {
    question: 'What happens to the wavefront spacing in front of the source as source velocity v_s increases?',
    observableOptions: [
      'Wavefronts get compressed closer together (shorter apparent wavelength λ\', higher frequency f\')',
      'Wavefronts expand farther apart',
      'Wavelength remains completely uniform in all directions',
      'Sound speed in air doubles',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_PHY_100,
  },
];

// ─── REAL-WORLD EXTENSION ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Observatory Acoustic Engineer: Real-World Calibration Task',
  description: 'Apply your master equations to calibrate the Kodaikanal Observatory acoustic sensor array. Using a resonance tube with a 512 Hz fork, record water levels at 1st and 2nd resonance to deduce local speed of sound and calculate air temperature.',
  steps: [
    'Measure resonant air columns: L₁ = 16.5 cm (0.165 m) and L₂ = 50.0 cm (0.500 m)',
    'Compute wavelength: λ = 2 × (L₂ - L₁) = 2 × (0.335 m) = 0.670 m',
    'Calculate experimental speed of sound: v = f × λ = 512 Hz × 0.670 m = 343.04 m/s',
    'Deduce temperature using v = 331 + 0.60 t → t = (343.04 - 331) / 0.60 ≈ 20.07 °C',
  ],
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: PENDULUM SHM & ENERGY MULTI-REPRESENTATION ───
function PendulumMultiRepSVG({ length, mass, gravity, angleDeg }: { length: number; mass: number; gravity: number; angleDeg: number }) {
  const thetaRad = (angleDeg * Math.PI) / 180;
  const period = 2 * Math.PI * Math.sqrt(length / gravity);
  const restoringForce = mass * gravity * Math.sin(thetaRad);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 bg-slate-900/90 rounded-2xl border border-gold-900/60 shadow-lg space-y-3"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>📐</span> Representation 1 & 2: Free Body Force Diagram & Energy Curve
        </span>
        <span className="text-xs font-mono bg-gold-950 px-2 py-0.5 rounded text-gold-300 border border-gold-700">
          T = 2π√(L/g) = {period.toFixed(2)} s
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Diagram 1: Free Body Vectors */}
        <svg viewBox="0 0 280 180" className="w-full h-40 bg-slate-950 rounded-xl border border-slate-800" aria-label="Simple pendulum free body diagram with tension and gravity force resolution">
          <line x1="140" y1="15" x2="140" y2="155" stroke="#334155" strokeDasharray="4 3" strokeWidth="1.5" />
          <rect x="90" y="10" width="100" height="6" fill="#64748b" rx="2" />
          
          {/* Deflected string */}
          <line x1="140" y1="15" x2="195" y2="120" stroke="#cbd5e1" strokeWidth="2.5" />
          <path d="M 140 50 A 35 35 0 0 1 154 47" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="146" y="65" fill="#f59e0b" fontSize="10" fontWeight="bold">θ={angleDeg}°</text>

          {/* Bob */}
          <circle cx="195" cy="120" r="14" fill="#6366f1" stroke="#818cf8" strokeWidth="2" />
          <text x="190" y="124" fill="#ffffff" fontSize="9" fontWeight="bold">{mass.toFixed(1)}kg</text>

          {/* Tension vector T */}
          <line x1="195" y1="120" x2="168" y2="68" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="156" y="70" fill="#38bdf8" fontSize="10" fontWeight="bold">T</text>

          {/* Gravity vector mg */}
          <line x1="195" y1="120" x2="195" y2="165" stroke="#10b981" strokeWidth="2" />
          <polygon points="195,168 191,160 199,160" fill="#10b981" />
          <text x="202" y="162" fill="#10b981" fontSize="10" fontWeight="bold">mg</text>

          {/* Tangential Restoring Force vector -mg sin(theta) */}
          <line x1="195" y1="120" x2="150" y2="142" stroke="#f43f5e" strokeWidth="2.5" />
          <polygon points="148,143 157,137 155,147" fill="#f43f5e" />
          <text x="105" y="152" fill="#f43f5e" fontSize="9.5" fontWeight="bold">F = -mg sin θ</text>
        </svg>

        {/* Representation 2: Potential vs Kinetic Energy Multi-Curve */}
        <svg viewBox="0 0 280 180" className="w-full h-40 bg-slate-950 rounded-xl border border-slate-800" aria-label="Harmonic oscillator potential and kinetic energy parabolic curves">
          {/* Axes */}
          <line x1="30" y1="140" x2="260" y2="140" stroke="#64748b" strokeWidth="1.5" />
          <line x1="145" y1="20" x2="145" y2="145" stroke="#64748b" strokeWidth="1.5" />
          <text x="250" y="155" fill="#94a3b8" fontSize="9">x (pos)</text>
          <text x="135" y="16" fill="#94a3b8" fontSize="9">Energy (J)</text>

          {/* Total Energy Line (Constant) */}
          <line x1="45" y1="40" x2="245" y2="40" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
          <text x="180" y="34" fill="#fbbf24" fontSize="9" fontWeight="bold">Total Energy E</text>

          {/* Potential Energy Parabola (U = 1/2 k x^2) */}
          <path d="M 45 40 Q 145 140 245 40" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="48" y="55" fill="#38bdf8" fontSize="9" fontWeight="bold">U (Potential)</text>

          {/* Kinetic Energy Inverted Parabola (K = E - U) */}
          <path d="M 45 140 Q 145 40 245 140" fill="none" stroke="#ec4899" strokeWidth="2.5" />
          <text x="135" y="65" fill="#ec4899" fontSize="9" fontWeight="bold">K (Kinetic)</text>

          {/* Markers */}
          <text x="36" y="155" fill="#94a3b8" fontSize="9">-A</text>
          <text x="142" y="155" fill="#94a3b8" fontSize="9">0</text>
          <text x="240" y="155" fill="#94a3b8" fontSize="9">+A</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
        <div>
          <span className="text-slate-400 block">Restoring Force F:</span>
          <span className="font-mono text-rose-400 font-bold">{restoringForce.toFixed(2)} N</span>
        </div>
        <div>
          <span className="text-slate-400 block">Restoring Stiffness k_eff:</span>
          <span className="font-mono text-gold-400 font-bold">{(mass * gravity / length).toFixed(2)} N/m</span>
        </div>
        <div>
          <span className="text-slate-400 block">Small Angle Validity:</span>
          <span className="font-mono text-emerald-400 font-bold">{angleDeg <= 15 ? '✓ Valid (<15°)' : '✗ Non-linear'}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: STANDING WAVE HARMONIC MODES (STRINGS & PIPES) ───
function StandingWaveHarmonicsSVG({ modeN, systemType }: { modeN: number; systemType: 'string' | 'openPipe' | 'closedPipe' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-slate-900/90 rounded-2xl border border-gold-900/60 shadow-lg space-y-3"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>🎵</span> Standing Wave Modal Envelope & Boundary Nodes (N) / Antinodes (A)
        </span>
        <span className="text-xs font-mono bg-gold-950 px-2 py-0.5 rounded text-gold-300 border border-gold-700">
          System: {systemType === 'string' ? 'String (Both Ends Fixed)' : systemType === 'openPipe' ? 'Open Organ Pipe (Both Ends Open)' : 'Closed Organ Pipe (One End Closed)'}
        </span>
      </div>

      <svg viewBox="0 0 580 140" className="w-full h-32 bg-slate-950 rounded-xl border border-slate-800" aria-label="Standing wave envelope diagram indicating nodes and antinodes for harmonics">
        {/* Boundary walls */}
        {systemType === 'string' && (
          <>
            <rect x="25" y="20" width="10" height="100" fill="#64748b" rx="2" />
            <rect x="545" y="20" width="10" height="100" fill="#64748b" rx="2" />
            <text x="26" y="15" fill="#94a3b8" fontSize="10">Node</text>
            <text x="540" y="15" fill="#94a3b8" fontSize="10">Node</text>
          </>
        )}
        {systemType === 'closedPipe' && (
          <>
            <rect x="25" y="20" width="10" height="100" fill="#ef4444" rx="2" />
            <line x1="35" y1="20" x2="550" y2="20" stroke="#64748b" strokeWidth="2" />
            <line x1="35" y1="120" x2="550" y2="120" stroke="#64748b" strokeWidth="2" />
            <text x="18" y="15" fill="#f87171" fontSize="10">Closed (Node)</text>
            <text x="500" y="15" fill="#38bdf8" fontSize="10">Open (Antinode)</text>
          </>
        )}
        {systemType === 'openPipe' && (
          <>
            <line x1="35" y1="20" x2="545" y2="20" stroke="#64748b" strokeWidth="2" />
            <line x1="35" y1="120" x2="545" y2="120" stroke="#64748b" strokeWidth="2" />
            <text x="20" y="15" fill="#38bdf8" fontSize="10">Antinode</text>
            <text x="505" y="15" fill="#38bdf8" fontSize="10">Antinode</text>
          </>
        )}

        {/* Harmonic Envelopes */}
        {systemType === 'string' && (
          <>
            <path
              d={Array.from({ length: 100 }, (_, i) => {
                const x = 35 + (i / 99) * 510;
                const y = 70 - 45 * Math.sin((modeN * Math.PI * i) / 99);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <path
              d={Array.from({ length: 100 }, (_, i) => {
                const x = 35 + (i / 99) * 510;
                const y = 70 + 45 * Math.sin((modeN * Math.PI * i) / 99);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#38bdf8"
              strokeDasharray="4 3"
              strokeWidth="1.5"
            />
          </>
        )}

        {systemType === 'openPipe' && (
          <>
            <path
              d={Array.from({ length: 100 }, (_, i) => {
                const x = 35 + (i / 99) * 510;
                const y = 70 - 45 * Math.cos((modeN * Math.PI * i) / 99);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            />
            <path
              d={Array.from({ length: 100 }, (_, i) => {
                const x = 35 + (i / 99) * 510;
                const y = 70 + 45 * Math.cos((modeN * Math.PI * i) / 99);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#10b981"
              strokeDasharray="4 3"
              strokeWidth="1.5"
            />
          </>
        )}

        {systemType === 'closedPipe' && (
          <>
            <path
              d={Array.from({ length: 100 }, (_, i) => {
                const x = 35 + (i / 99) * 510;
                const oddN = 2 * modeN - 1;
                const y = 70 - 45 * Math.sin((oddN * Math.PI * i) / (2 * 99));
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2.5"
            />
            <path
              d={Array.from({ length: 100 }, (_, i) => {
                const x = 35 + (i / 99) * 510;
                const oddN = 2 * modeN - 1;
                const y = 70 + 45 * Math.sin((oddN * Math.PI * i) / (2 * 99));
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#a855f7"
              strokeDasharray="4 3"
              strokeWidth="1.5"
            />
          </>
        )}

        {/* Node / Antinode markers */}
        <line x1="35" y1="70" x2="545" y2="70" stroke="#475569" strokeDasharray="2 2" />
        <circle cx="290" cy="70" r="3" fill="#fbbf24" />
      </svg>

      <div className="flex flex-wrap items-center justify-between text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
        <span><strong>Harmonic Formula:</strong> {systemType === 'closedPipe' ? 'f_n = (2n - 1)v / 4L (Only Odd)' : 'f_n = n(v / 2L) (All Harmonics)'}</span>
        <span><strong>Wavelength relation:</strong> {systemType === 'closedPipe' ? `λ = 4L / ${2 * modeN - 1}` : `λ = 2L / ${modeN}`}</span>
      </div>
    </motion.div>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: DOPPLER EFFECT WAVEFRONT COMPRESSION & BEAT ENVELOPE ───
function DopplerAndBeatsSVG({ sourceSpeed, f1, f2 }: { sourceSpeed: number; f1: number; f2: number }) {
  const fBeat = Math.abs(f1 - f2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-slate-900/90 rounded-2xl border border-purple-900/60 shadow-lg space-y-3"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>📡</span> Multi-Representation: Doppler Wavefront Compression & Interference Envelope
        </span>
        <span className="text-xs font-mono bg-purple-950 px-2 py-0.5 rounded text-purple-300 border border-purple-700">
          f_beat = |f₁ - f₂| = {fBeat} Hz
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Doppler Wavefront Compression */}
        <svg viewBox="0 0 280 160" className="w-full h-36 bg-slate-950 rounded-xl border border-slate-800" aria-label="Doppler shift circular wavefront compression in front of moving source">
          <text x="10" y="16" fill="#c084fc" fontSize="9.5" fontWeight="bold">Doppler Wavefront Shift (Source v_s →)</text>
          
          {/* Compressed wavefronts to right */}
          <circle cx="160" cy="85" r="20" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="145" cy="85" r="38" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="125" cy="85" r="58" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="100" cy="85" r="80" fill="none" stroke="#818cf8" strokeWidth="1.5" opacity="0.6" />

          {/* Source dot */}
          <circle cx="170" cy="85" r="5" fill="#f43f5e" />
          <line x1="170" y1="85" x2="195" y2="85" stroke="#f43f5e" strokeWidth="2" />
          <polygon points="198,85 192,81 192,89" fill="#f43f5e" />
          <text x="160" y="105" fill="#f43f5e" fontSize="9" fontWeight="bold">Source v_s</text>

          {/* Observer stationary */}
          <rect x="235" y="75" width="12" height="20" fill="#10b981" rx="2" />
          <text x="215" y="115" fill="#10b981" fontSize="9" fontWeight="bold">Observer</text>
          <text x="180" y="45" fill="#38bdf8" fontSize="8.5">Compressed λ' (Higher f')</text>
        </svg>

        {/* Acoustic Beat Modulation Envelope */}
        <svg viewBox="0 0 280 160" className="w-full h-36 bg-slate-950 rounded-xl border border-slate-800" aria-label="Beat phenomenon amplitude modulation envelope waveform">
          <text x="10" y="16" fill="#f472b6" fontSize="9.5" fontWeight="bold">Superposition Beat Envelope: A_net(t)</text>

          {/* Envelope */}
          <path
            d="M 10 80 Q 70 30 140 80 Q 210 130 270 80"
            fill="none"
            stroke="#f472b6"
            strokeDasharray="3 3"
            strokeWidth="1.5"
          />
          <path
            d="M 10 80 Q 70 130 140 80 Q 210 30 270 80"
            fill="none"
            stroke="#f472b6"
            strokeDasharray="3 3"
            strokeWidth="1.5"
          />

          {/* Rapid Carrier oscillations inside envelope */}
          <path
            d={Array.from({ length: 130 }, (_, i) => {
              const x = 10 + (i / 129) * 260;
              const env = Math.abs(Math.cos((2 * Math.PI * (i / 129) * 1.5)));
              const y = 80 + env * 35 * Math.sin((2 * Math.PI * (i / 129) * 16));
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#c084fc"
            strokeWidth="1.8"
          />
          <text x="60" y="150" fill="#94a3b8" fontSize="8.5">Waxing (Loud)</text>
          <text x="130" y="150" fill="#94a3b8" fontSize="8.5">Waning (Soft)</text>
          <text x="195" y="150" fill="#94a3b8" fontSize="8.5">Waxing (Loud)</text>
        </svg>
      </div>
    </motion.div>
  );
}

// ──�� MAIN REACT SIMULATION COMPONENT ───
function C11_PhysicsSimplePendulumSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'indigo' };

  // Phase management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Brilliant Patterns state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 200, y: 200 });

  // Drag & Sort & Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── 30+ RICH INTERACTIVE PHYSICS SIMULATION VARIABLES ───
  const [pendulumLength, setPendulumLength] = useState(1.0); // 0.2 to 2.5 m
  const [pendulumMass, setPendulumMass] = useState(0.2); // 0.05 to 1.0 kg
  const [pendulumAngleDeg, setPendulumAngleDeg] = useState(10); // 2 to 30 deg
  const [gravityAcc, setGravityAcc] = useState(9.8); // 1.62 (Moon) to 24.7 (Jupiter)
  const [pendulumRunning, setPendulumRunning] = useState(true);

  // Spring oscillator variables
  const [springMass, setSpringMass] = useState(0.5); // 0.1 to 2.0 kg
  const [springK, setSpringK] = useState(50); // 10 to 200 N/m
  const [springAmplitude, setSpringAmplitude] = useState(0.08); // 0.02 to 0.15 m
  const [springIsVertical, setSpringIsVertical] = useState(false);

  // Wave variables
  const [waveFreq, setWaveFreq] = useState(2.0); // 0.5 to 10 Hz
  const [waveWavelength, setWaveWavelength] = useState(1.5); // 0.5 to 4.0 m
  const [waveAmp, setWaveAmp] = useState(0.04); // 0.01 to 0.08 m
  const [waveTravelDirection, setWaveTravelDirection] = useState<'right' | 'left'>('right');
  const [probeDist, setProbeDist] = useState(0.375); // probe x2 - x1 in m

  // Standing waves & Organ pipes
  const [standingModeN, setStandingModeN] = useState(1); // 1 to 4
  const [systemType, setSystemType] = useState<'string' | 'openPipe' | 'closedPipe'>('string');
  const [pipeLength, setPipeLength] = useState(1.0); // m

  // Beats & Doppler
  const [freqSource1, setFreqSource1] = useState(256); // Hz
  const [freqSource2, setFreqSource2] = useState(260); // Hz
  const [sourceSpeedVs, setSourceSpeedVs] = useState(30); // m/s
  const [observerSpeedVo, setObserverSpeedVo] = useState(0); // m/s
  const [dopplerCase, setDopplerCase] = useState<'approach' | 'recession'>('approach');
  const [soundMediumTemp, setSoundMediumTemp] = useState(20); // Celsius

  // Canvas Refs & BKT
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── DERIVED REAL-TIME PHYSICS CALCULATIONS ───
  const pendulumPeriod = useMemo(() => {
    return 2 * Math.PI * Math.sqrt(pendulumLength / gravityAcc);
  }, [pendulumLength, gravityAcc]);

  const pendulumOmega = useMemo(() => {
    return Math.sqrt(gravityAcc / pendulumLength);
  }, [pendulumLength, gravityAcc]);

  const springOmega = useMemo(() => {
    return Math.sqrt(springK / springMass);
  }, [springK, springMass]);

  const springPeriod = useMemo(() => {
    return 2 * Math.PI * Math.sqrt(springMass / springK);
  }, [springMass, springK]);

  const springStaticExtension = useMemo(() => {
    return (springMass * gravityAcc) / springK;
  }, [springMass, gravityAcc, springK]);

  const speedOfSoundInAir = useMemo(() => {
    return 331.3 * Math.sqrt((soundMediumTemp + 273.15) / 273.15);
  }, [soundMediumTemp]);

  const progressiveWaveSpeed = useMemo(() => {
    return waveFreq * waveWavelength;
  }, [waveFreq, waveWavelength]);

  const wavePhaseDiffRad = useMemo(() => {
    return ((2 * Math.PI) / waveWavelength) * probeDist;
  }, [waveWavelength, probeDist]);

  const standingHarmonicFreq = useMemo(() => {
    const v = 340; // reference speed
    if (systemType === 'string') {
      return (standingModeN * v) / (2 * pipeLength);
    } else if (systemType === 'openPipe') {
      return (standingModeN * v) / (2 * pipeLength);
    } else {
      const oddN = 2 * standingModeN - 1;
      return (oddN * v) / (4 * pipeLength);
    }
  }, [standingModeN, systemType, pipeLength]);

  const beatFrequencyValue = useMemo(() => {
    return Math.abs(freqSource1 - freqSource2);
  }, [freqSource1, freqSource2]);

  const dopplerApparentFreq = useMemo(() => {
    const v = speedOfSoundInAir;
    if (dopplerCase === 'approach') {
      return (freqSource1 * (v + observerSpeedVo)) / (v - sourceSpeedVs);
    } else {
      return (freqSource1 * (v - observerSpeedVo)) / (v + sourceSpeedVs);
    }
  }, [freqSource1, speedOfSoundInAir, observerSpeedVo, sourceSpeedVs, dopplerCase]);

  // Filtered challenges
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Initialize mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive BKT mastery
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

  // Canvas 2D Physics Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      if (phase === 'explore' || phase === 'sandbox' || phase === 'challenge') {
        const activeLab = phase === 'explore' ? EXPLORATION_STEPS[currentSlide].interactionType : 'multi';

        // 1. PENDULUM SIMULATION RENDERING
        if (activeLab === 'pendulum-sim' || (phase === 'sandbox' && currentSlide === 0)) {
          const originX = w * 0.5;
          const originY = 30;
          const pxLength = pendulumLength * 80;
          const theta0 = (pendulumAngleDeg * Math.PI) / 180;
          const currentTheta = pendulumRunning ? theta0 * Math.cos(pendulumOmega * elapsed) : theta0;

          const bobX = originX + pxLength * Math.sin(currentTheta);
          const bobY = originY + pxLength * Math.cos(currentTheta);

          // Support ceiling
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(originX - 50, originY);
          ctx.lineTo(originX + 50, originY);
          ctx.stroke();

          // String
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(originX, originY);
          ctx.lineTo(bobX, bobY);
          ctx.stroke();

          // Bob
          const bobRadius = 12 + pendulumMass * 15;
          ctx.beginPath();
          ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#6366f1';
          ctx.fill();
          ctx.strokeStyle = '#818cf8';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Restoring Force Vector
          const fRest = -pendulumMass * gravityAcc * Math.sin(currentTheta);
          const arrowLen = fRest * 35;
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(bobX, bobY);
          ctx.lineTo(bobX + arrowLen * Math.cos(currentTheta), bobY - arrowLen * Math.sin(currentTheta));
          ctx.stroke();

          // Label
          ctx.fillStyle = '#94a3b8';
          ctx.font = '12px sans-serif';
          ctx.fillText(`T = ${pendulumPeriod.toFixed(2)} s`, originX - 30, h - 15);
          ctx.fillText(`F_rest = ${Math.abs(fRest).toFixed(2)} N`, bobX + 15, bobY);
        }

        // 2. SPRING OSCILLATOR SIMULATION RENDERING
        else if (activeLab === 'spring-sim' || (phase === 'sandbox' && currentSlide === 1)) {
          const originX = springIsVertical ? w * 0.5 : 40;
          const originY = springIsVertical ? 30 : h * 0.5;
          const disp = springAmplitude * 500 * Math.cos(springOmega * elapsed);
          const meanOffset = springIsVertical ? 80 + springStaticExtension * 200 : 160;
          const blockPos = meanOffset + disp;

          // Draw spring coils
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          if (springIsVertical) {
            ctx.moveTo(originX, originY);
            const coils = 12;
            const step = (blockPos - originY) / coils;
            for (let i = 1; i <= coils; i++) {
              const xOffset = i % 2 === 0 ? 15 : -15;
              ctx.lineTo(originX + (i === coils ? 0 : xOffset), originY + step * i);
            }
            ctx.stroke();

            // Block
            ctx.fillStyle = '#10b981';
            ctx.fillRect(originX - 25, blockPos, 50, 40);
            ctx.strokeStyle = '#34d399';
            ctx.strokeRect(originX - 25, blockPos, 50, 40);
            ctx.fillStyle = '#ffffff';
            ctx.font = '11px sans-serif';
            ctx.fillText(`${springMass} kg`, originX - 16, blockPos + 24);
          } else {
            ctx.moveTo(originX, originY);
            const coils = 14;
            const step = (blockPos - originX) / coils;
            for (let i = 1; i <= coils; i++) {
              const yOffset = i % 2 === 0 ? 15 : -15;
              ctx.lineTo(originX + step * i, originY + (i === coils ? 0 : yOffset));
            }
            ctx.stroke();

            // Block
            ctx.fillStyle = '#10b981';
            ctx.fillRect(blockPos, originY - 25, 45, 50);
            ctx.strokeStyle = '#34d399';
            ctx.strokeRect(blockPos, originY - 25, 45, 50);
            ctx.fillStyle = '#ffffff';
            ctx.font = '11px sans-serif';
            ctx.fillText(`${springMass} kg`, blockPos + 8, originY + 5);
          }

          ctx.fillStyle = '#94a3b8';
          ctx.font = '12px sans-serif';
          ctx.fillText(`T = ${springPeriod.toFixed(3)} s  |  ω = ${springOmega.toFixed(1)} rad/s`, 20, h - 15);
        }

        // 3. PROGRESSIVE WAVE & PHASE VISUALIZER
        else if (activeLab === 'wave-sim' || (phase === 'sandbox' && currentSlide === 2)) {
          const k = (2 * Math.PI) / waveWavelength;
          const omega = 2 * Math.PI * waveFreq;
          const dirSign = waveTravelDirection === 'right' ? -1 : 1;
          const centerY = h * 0.5;

          ctx.strokeStyle = '#818cf8';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 0; x < w; x += 2) {
            const xReal = (x / w) * 4.0;
            const yReal = waveAmp * Math.sin(k * xReal + dirSign * omega * elapsed);
            const yScreen = centerY - yReal * 800;
            if (x === 0) ctx.moveTo(x, yScreen);
            else ctx.lineTo(x, yScreen);
          }
          ctx.stroke();

          // Probes for Phase Difference
          const probe1X = w * 0.3;
          const probe2X = probe1X + (probeDist / 4.0) * w;

          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(probe1X, centerY, 6, 0, Math.PI * 2);
          ctx.arc(probe2X, centerY, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fef08a';
          ctx.font = '11px sans-serif';
          ctx.fillText('Probe 1', probe1X - 18, centerY - 15);
          ctx.fillText('Probe 2', probe2X - 18, centerY - 15);
          ctx.fillText(`v = ${progressiveWaveSpeed.toFixed(1)} m/s  |  Δφ = ${(wavePhaseDiffRad / Math.PI).toFixed(2)}π rad (${((wavePhaseDiffRad * 180) / Math.PI).toFixed(0)}°)`, 20, h - 15);
        }

        // 4. STANDING WAVES & HARMONICS
        else if (activeLab === 'standing-sim' || (phase === 'sandbox' && currentSlide === 3)) {
          const centerY = h * 0.5;
          const L_px = w * 0.8;
          const startX = w * 0.1;
          const n = standingModeN;
          const omega = 2 * Math.PI * 2.0;

          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 0; x <= L_px; x += 3) {
            let env = 0;
            if (systemType === 'string') {
              env = Math.sin((n * Math.PI * x) / L_px);
            } else if (systemType === 'openPipe') {
              env = Math.cos((n * Math.PI * x) / L_px);
            } else {
              const oddN = 2 * n - 1;
              env = Math.sin((oddN * Math.PI * x) / (2 * L_px));
            }
            const yVal = env * 40 * Math.cos(omega * elapsed);
            if (x === 0) ctx.moveTo(startX + x, centerY + yVal);
            else ctx.lineTo(startX + x, centerY + yVal);
          }
          ctx.stroke();

          // Pipe boundaries
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 4;
          if (systemType === 'closedPipe') {
            ctx.beginPath();
            ctx.moveTo(startX, centerY - 50);
            ctx.lineTo(startX, centerY + 50);
            ctx.stroke();
          }

          ctx.fillStyle = '#38bdf8';
          ctx.font = '12px sans-serif';
          ctx.fillText(`Mode n = ${n} | Frequency: ${standingHarmonicFreq.toFixed(1)} Hz`, startX, h - 15);
        }

        // 5. BEATS & DOPPLER
        else {
          const centerY = h * 0.5;
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let x = 0; x < w; x += 2) {
            const tLocal = (x / w) * 0.05 + elapsed;
            const y1 = Math.sin(2 * Math.PI * freqSource1 * tLocal);
            const y2 = Math.sin(2 * Math.PI * freqSource2 * tLocal);
            const yRes = (y1 + y2) * 20;
            if (x === 0) ctx.moveTo(x, centerY + yRes);
            else ctx.lineTo(x, centerY + yRes);
          }
          ctx.stroke();

          ctx.fillStyle = '#c084fc';
          ctx.font = '12px sans-serif';
          ctx.fillText(`Beats: |${freqSource1} - ${freqSource2}| = ${beatFrequencyValue} Hz | Doppler f': ${dopplerApparentFreq.toFixed(1)} Hz`, 20, h - 15);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    phase,
    currentSlide,
    pendulumLength,
    pendulumMass,
    pendulumAngleDeg,
    gravityAcc,
    pendulumRunning,
    pendulumOmega,
    pendulumPeriod,
    springMass,
    springK,
    springAmplitude,
    springIsVertical,
    springOmega,
    springPeriod,
    springStaticExtension,
    waveFreq,
    waveWavelength,
    waveAmp,
    waveTravelDirection,
    progressiveWaveSpeed,
    probeDist,
    wavePhaseDiffRad,
    standingModeN,
    systemType,
    standingHarmonicFreq,
    pipeLength,
    freqSource1,
    freqSource2,
    beatFrequencyValue,
    dopplerApparentFreq,
  ]);

  // Handlers
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
      speechManager.speak(`Hint ${nextLevel}: ${challenge.hints[nextLevel - 1]}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the complete step-by-step derivation together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent intuition! Mass cancels out in the simple pendulum equation.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Harmonic Observatory. Interact with the physics labs to discover the governing laws.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You have unlocked the Open Physics Sandbox. Test extreme parameters freely before taking on the challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Starting the CISCE competency evaluation.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now verify with the live simulation controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closer at the boundary conditions.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Observatory mission complete! You scored ${finalScore} percent.`);
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

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
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
        const updatedSrs = sm2Update(srsItem, 5, 3500);
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
          speechManager.speak('Hints exhausted. Review the detailed step-by-step solution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
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
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
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
      setSortArrangement((prev) => {
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

  const handleConstructTogglePart = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts((prev) => [...prev, part]);
  }, []);

  const handleConstructRemovePart = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50 flex items-center justify-center"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-gold-400 font-medium">ISC Class 11 • Physics Mechanics & Acoustics Lab</p>
          </div>
        </div>

        {/* Phase Indicator Badges */}
        <div className="flex items-center gap-2 text-xs">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full font-semibold border ${phase === 'discovery' ? 'bg-gold-600/30 border-gold-400 text-gold-200 shadow' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
          >
            1. Discovery
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full font-semibold border ${phase === 'explore' ? 'bg-gold-600/30 border-gold-400 text-gold-200 shadow' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
          >
            2. Labs
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full font-semibold border ${phase === 'sandbox' ? 'bg-gold-600/30 border-gold-400 text-gold-200 shadow' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
          >
            3. Sandbox
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full font-semibold border ${phase === 'challenge' ? 'bg-gold-600/30 border-gold-400 text-gold-200 shadow' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
          >
            4. Competency
          </motion.span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900/90 rounded-2xl border border-gold-800/60 shadow-lg"
            >
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Field Scenario</span>
              <h3 className="text-lg sm:text-xl font-bold text-gold-200 mt-1">{SCENARIO.title}</h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">?</span>
                Curiosity Hook: {DISCOVERY_QUESTION.question}
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-100 shadow-lg'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900 text-slate-500 border border-slate-800'
                        : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : discoveryAnswered ? '✗ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '✓ Spot on! Mass cancels out in T = 2π√(L/g).' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Interactive Labs"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30 whitespace-nowrap"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h3 className="text-lg font-bold text-gold-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs bg-gold-950 px-3 py-1 rounded-full text-gold-300 border border-gold-700 font-medium">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-sm text-amber-300 flex items-center gap-1.5 font-medium">
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>
            </motion.div>

            {/* Canvas Simulation Window */}
            <motion.div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 relative shadow-inner">
              <canvas ref={canvasRef} width={760} height={260} className="w-full rounded-xl bg-slate-900/50" />

              {/* REAL-TIME SLIDERS */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                {currentSlide === 0 && (
                  <>
                    <div>
                      <label className="text-xs text-slate-400">Length L: {pendulumLength.toFixed(2)} m</label>
                      <input
                        type="range"
                        min={0.2}
                        max={2.5}
                        step={0.05}
                        value={pendulumLength}
                        aria-label="Pendulum Length"
                        onChange={(e) => setPendulumLength(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Bob Mass m: {pendulumMass.toFixed(2)} kg</label>
                      <input
                        type="range"
                        min={0.05}
                        max={1.0}
                        step={0.05}
                        value={pendulumMass}
                        aria-label="Bob Mass"
                        onChange={(e) => setPendulumMass(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Angle θ: {pendulumAngleDeg}°</label>
                      <input
                        type="range"
                        min={2}
                        max={30}
                        step={1}
                        value={pendulumAngleDeg}
                        aria-label="Pendulum Angle"
                        onChange={(e) => setPendulumAngleDeg(parseInt(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Gravity g: {gravityAcc.toFixed(2)} m/s²</label>
                      <input
                        type="range"
                        min={1.62}
                        max={20.0}
                        step={0.1}
                        value={gravityAcc}
                        aria-label="Gravity Acceleration"
                        onChange={(e) => setGravityAcc(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </>
                )}

                {currentSlide === 1 && (
                  <>
                    <div>
                      <label className="text-xs text-slate-400">Spring Constant k: {springK} N/m</label>
                      <input
                        type="range"
                        min={10}
                        max={200}
                        step={5}
                        value={springK}
                        aria-label="Spring Stiffness k"
                        onChange={(e) => setSpringK(parseInt(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Mass m: {springMass.toFixed(2)} kg</label>
                      <input
                        type="range"
                        min={0.1}
                        max={2.0}
                        step={0.1}
                        value={springMass}
                        aria-label="Spring Mass"
                        onChange={(e) => setSpringMass(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Amplitude A: {springAmplitude.toFixed(2)} m</label>
                      <input
                        type="range"
                        min={0.02}
                        max={0.15}
                        step={0.01}
                        value={springAmplitude}
                        aria-label="Spring Amplitude"
                        onChange={(e) => setSpringAmplitude(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle Spring Vertical Mode"
                        onClick={() => setSpringIsVertical((v) => !v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold w-full border ${
                          springIsVertical
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {springIsVertical ? 'Vertical Mode (Shifted δ)' : 'Horizontal Mode'}
                      </motion.button>
                    </div>
                  </>
                )}

                {currentSlide === 2 && (
                  <>
                    <div>
                      <label className="text-xs text-slate-400">Frequency f: {waveFreq.toFixed(1)} Hz</label>
                      <input
                        type="range"
                        min={0.5}
                        max={6.0}
                        step={0.1}
                        value={waveFreq}
                        aria-label="Wave Frequency"
                        onChange={(e) => setWaveFreq(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Wavelength λ: {waveWavelength.toFixed(2)} m</label>
                      <input
                        type="range"
                        min={0.5}
                        max={3.0}
                        step={0.1}
                        value={waveWavelength}
                        aria-label="Wavelength"
                        onChange={(e) => setWaveWavelength(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Probe Spacing Δx: {probeDist.toFixed(3)} m</label>
                      <input
                        type="range"
                        min={0.1}
                        max={1.5}
                        step={0.025}
                        value={probeDist}
                        aria-label="Probe Spacing"
                        onChange={(e) => setProbeDist(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle Wave Propagation Direction"
                        onClick={() => setWaveTravelDirection((d) => (d === 'right' ? 'left' : 'right'))}
                        className="px-3 py-1.5 bg-gold-700 text-white text-xs font-bold rounded-lg w-full border border-gold-500"
                      >
                        Direction: {waveTravelDirection === 'right' ? 'Right (-ωt)' : 'Left (+ωt)'}
                      </motion.button>
                    </div>
                  </>
                )}

                {currentSlide === 3 && (
                  <>
                    <div>
                      <label className="text-xs text-slate-400">Mode n: {standingModeN}</label>
                      <input
                        type="range"
                        min={1}
                        max={4}
                        step={1}
                        value={standingModeN}
                        aria-label="Harmonic Mode Number"
                        onChange={(e) => setStandingModeN(parseInt(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="flex items-center gap-1 col-span-2 pt-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Select String System"
                        onClick={() => setSystemType('string')}
                        className={`flex-1 py-1 text-xs rounded font-bold border ${systemType === 'string' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                      >
                        String
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Select Open Pipe System"
                        onClick={() => setSystemType('openPipe')}
                        className={`flex-1 py-1 text-xs rounded font-bold border ${systemType === 'openPipe' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                      >
                        Open Pipe
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Select Closed Pipe System"
                        onClick={() => setSystemType('closedPipe')}
                        className={`flex-1 py-1 text-xs rounded font-bold border ${systemType === 'closedPipe' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                      >
                        Closed Pipe
                      </motion.button>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Length L: {pipeLength.toFixed(2)} m</label>
                      <input
                        type="range"
                        min={0.4}
                        max={2.0}
                        step={0.1}
                        value={pipeLength}
                        aria-label="Pipe Length"
                        onChange={(e) => setPipeLength(parseFloat(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </>
                )}

                {currentSlide === 4 && (
                  <>
                    <div>
                      <label className="text-xs text-slate-400">Fork 1: {freqSource1} Hz</label>
                      <input
                        type="range"
                        min={240}
                        max={270}
                        step={1}
                        value={freqSource1}
                        aria-label="Tuning Fork 1 Frequency"
                        onChange={(e) => setFreqSource1(parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Fork 2: {freqSource2} Hz</label>
                      <input
                        type="range"
                        min={240}
                        max={270}
                        step={1}
                        value={freqSource2}
                        aria-label="Tuning Fork 2 Frequency"
                        onChange={(e) => setFreqSource2(parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Source Speed v_s: {sourceSpeedVs} m/s</label>
                      <input
                        type="range"
                        min={0}
                        max={80}
                        step={2}
                        value={sourceSpeedVs}
                        aria-label="Doppler Source Velocity"
                        onChange={(e) => setSourceSpeedVs(parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Air Temp: {soundMediumTemp} °C</label>
                      <input
                        type="range"
                        min={-10}
                        max={45}
                        step={1}
                        value={soundMediumTemp}
                        aria-label="Air Temperature"
                        onChange={(e) => setSoundMediumTemp(parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* EMBEDDED TOPIC-SPECIFIC SVG DIAGRAMS FOR MULTI-REPRESENTATION */}
            {currentSlide === 0 && (
              <PendulumMultiRepSVG
                length={pendulumLength}
                mass={pendulumMass}
                gravity={gravityAcc}
                angleDeg={pendulumAngleDeg}
              />
            )}

            {currentSlide === 3 && (
              <StandingWaveHarmonicsSVG modeN={standingModeN} systemType={systemType} />
            )}

            {currentSlide === 4 && (
              <DopplerAndBeatsSVG sourceSpeed={sourceSpeedVs} f1={freqSource1} f2={freqSource2} />
            )}

            {/* PREDICT-THEN-CHECK & OBSERVATION MODULES */}
            {currentSlide === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict-Then-Check</span>
                <p className="text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                {!predictionMade ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Predict: ${opt}`}
                        onClick={() => handlePrediction(i)}
                        className="text-left p-2.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="p-3 bg-gold-950/60 rounded-lg border border-gold-700 text-xs text-gold-200">
                    {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </motion.div>
                )}
              </motion.div>
            )}

            {currentSlide === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Scientific Observation</span>
                <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Observation Option ${i + 1}: ${opt}`}
                      onClick={() => handleObservation(i)}
                      className={`text-left p-2.5 rounded-lg text-xs border ${
                        observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex ? '✓ ' : ''}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* NAVIGATION FOOTER */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous Lab"
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-semibold rounded-xl border border-slate-700 disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next Lab"
                  onClick={() => setCurrentSlide((s) => s + 1)}
                  className="px-5 py-2 bg-gold-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open Sandbox Explorer"
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                >
                  Open Sandbox Explorer →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: OPEN SANDBOX (FREE PLAY) ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-emerald-400">Free Physical Exploration Sandbox</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Zero pressure. Test extreme gravity on Jupiter, create custom beat notes, and test speed of sound formulas.
                </p>
              </div>
              <div className="flex gap-2">
                {['Pendulum', 'Spring', 'Wave', 'Pipes', 'Doppler'].map((tab, idx) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Switch to ${tab} Simulation`}
                    onClick={() => setCurrentSlide(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      currentSlide === idx ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-inner">
              <canvas ref={canvasRef} width={760} height={260} className="w-full rounded-xl bg-slate-900/50" />
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                {currentSlide === 0 && (
                  <>
                    <div>
                      <label className="text-xs text-slate-400">Length: {pendulumLength.toFixed(2)} m</label>
                      <input type="range" min={0.2} max={2.5} step={0.05} value={pendulumLength} aria-label="Length slider" onChange={(e) => setPendulumLength(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Mass: {pendulumMass.toFixed(2)} kg</label>
                      <input type="range" min={0.05} max={1.0} step={0.05} value={pendulumMass} aria-label="Mass slider" onChange={(e) => setPendulumMass(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Gravity: {gravityAcc.toFixed(2)} m/s²</label>
                      <input type="range" min={1.62} max={24.7} step={0.1} value={gravityAcc} aria-label="Gravity slider" onChange={(e) => setGravityAcc(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div className="text-xs text-emerald-400 flex flex-col justify-center">
                      <p className="font-bold">Period T: {pendulumPeriod.toFixed(3)} s</p>
                      <p className="text-slate-400">Freq f: {(1 / pendulumPeriod).toFixed(2)} Hz</p>
                    </div>
                  </>
                )}
                {currentSlide === 1 && (
                  <>
                    <div>
                      <label className="text-xs text-slate-400">Stiffness k: {springK} N/m</label>
                      <input type="range" min={10} max={200} step={5} value={springK} aria-label="Stiffness slider" onChange={(e) => setSpringK(parseInt(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Mass m: {springMass.toFixed(2)} kg</label>
                      <input type="range" min={0.1} max={2.0} step={0.1} value={springMass} aria-label="Mass slider" onChange={(e) => setSpringMass(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Mode</label>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="Toggle vertical spring mode" onClick={() => setSpringIsVertical(v => !v)} className="w-full mt-1 py-1 text-xs bg-slate-800 text-emerald-300 font-bold rounded border border-slate-700">
                        {springIsVertical ? 'Vertical' : 'Horizontal'}
                      </motion.button>
                    </div>
                    <div className="text-xs text-emerald-400 flex flex-col justify-center">
                      <p className="font-bold">Period T: {springPeriod.toFixed(3)} s</p>
                      <p className="text-slate-400">Static δ: {(springStaticExtension * 100).toFixed(1)} cm</p>
                    </div>
                  </>
                )}
                {currentSlide >= 2 && (
                  <>
                    <div>
                      <label className="text-xs text-slate-400">Sound Speed (Laplace)</label>
                      <p className="text-xs text-gold-300 font-bold mt-1">{speedOfSoundInAir.toFixed(1)} m/s</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Beat Frequency</label>
                      <p className="text-xs text-purple-300 font-bold mt-1">{beatFrequencyValue} Hz</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Doppler f' (Approach)</label>
                      <p className="text-xs text-amber-300 font-bold mt-1">{dopplerApparentFreq.toFixed(1)} Hz</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Standing Mode Freq</label>
                      <p className="text-xs text-gold-300 font-bold mt-1">{standingHarmonicFreq.toFixed(1)} Hz</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Advance to Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 text-sm"
              >
                I Am Ready for Challenges →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: COMPETENCY-BASED CHALLENGES ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Challenge Header & Live Stats */}
            <motion.div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    Question {currentChallenge + 1} of {filteredChallenges.length}
                  </h3>
                  <motion.span
                    key={difficulty}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                      difficulty === 'foundation'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                        : difficulty === 'standard'
                        ? 'bg-gold-950 text-gold-400 border-gold-700'
                        : 'bg-purple-950 text-purple-400 border-purple-700'
                    }`}
                  >
                    {difficulty}
                  </motion.span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                    {challenge.competencyLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Mastery: {masteryLevel} • BKT pKnown: {(bktStateRef.current.pKnown * 100).toFixed(0)}%</p>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>

            {/* MAIN CHALLENGE CARD */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl transition-colors border ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <h4 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
                {challenge.question}
              </h4>

              {/* TYPE 1: MCQ */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-100'
                          : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">
                        {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* TYPE 2: DRAG-AND-DROP LABELING */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable physical label: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.03 }}
                        className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-semibold cursor-grab shadow"
                      >
                        :: {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[70px]"
                      >
                        <span className="text-xs text-slate-400 font-medium capitalize mb-1">
                          Target: {targetId.replace('zone_', '').replace('_', ' ')}
                        </span>
                        <span className={`text-xs font-bold ${droppedLabels[targetId] ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : '[ Drop Label Here ]'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Verify Target Positions"
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                  >
                    Verify Target Positions →
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: DRAG SORT ORDER */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map((idx) => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Harmonic mode item: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                      >
                        <span>
                          <strong className="text-gold-400 mr-2">{displayIdx + 1}.</strong> {item}
                        </span>
                        <span className="text-slate-500 text-xs">↕ Drag</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Verify Harmonic Sequence"
                    onClick={handleSortSubmit}
                    className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                  >
                    Verify Sequence →
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: NUMERIC COMPUTATION */}
              {challenge.type === 'numeric' && (
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label="Numeric calculation input"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric answer"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Submit Calculated Value"
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Value →
                  </motion.button>
                </div>
              )}

              {/* TYPE 5: CONSTRUCT EQUATION */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 italic">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Append formula part ${part}`}
                        onClick={() => handleConstructTogglePart(part)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 rounded-lg text-xs font-mono font-semibold border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-gold-900/60 border border-gold-600 rounded-lg text-xs font-mono text-white flex items-center gap-1.5"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Remove ${part}`}
                          onClick={() => handleConstructRemovePart(i)}
                          className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                        >
                          ×
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click parts above to assemble equation...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Validate Assembled Formula"
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl disabled:opacity-40"
                  >
                    Validate Assembled Formula →
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <h5 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <span>📖</span> Step-by-Step Rigorous Derivation
                </h5>

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
                        className="text-xs sm:text-sm text-amber-100 leading-relaxed"
                      >
                        <strong className="text-amber-400 mr-1.5">{i + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Show Next Derivation Step"
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow"
                    >
                      Show Next Step ↓
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Advance to Next Question"
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Complete Evaluation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── PHASE 5: MASTERY COMPLETION ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4">
              <span className="text-5xl">🏆</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Observatory Certification Complete!
              </h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                You have successfully calibrated the mechanics and acoustic wave instruments across all 10 ISC Physics nodes.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">Final Score</span>
                  <span className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">BKT Mastery Level</span>
                  <span className="text-2xl font-bold text-gold-400 capitalize">{masteryLevel}</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">Total Inaccuracies</span>
                  <span className="text-2xl font-bold text-amber-400">{errors}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* MANDATORY MOTIVATIONAL FEEDBACK BANNER */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`p-6 rounded-2xl border ${
                errors === 0
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                  : errors <= 3
                  ? 'bg-gold-950/60 border-gold-500 text-gold-100'
                  : errors <= 7
                  ? 'bg-amber-950/60 border-amber-500 text-amber-100'
                  : 'bg-rose-950/60 border-rose-500 text-rose-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {errors === 0 ? '🌟' : errors <= 3 ? '👏' : errors <= 7 ? '💪' : '🚀'}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-wide">
                    {errors === 0
                      ? 'PERFECT SCORE!'
                      : errors <= 3
                      ? 'Great work!'
                      : errors <= 7
                      ? 'Good effort!'
                      : 'Do not give up — You WILL get this!'}
                  </h3>
                  <p className="text-xs sm:text-sm mt-1 opacity-90 leading-relaxed">
                    {errors === 0
                      ? 'Exemplary performance! You demonstrated flawless command over SHM differential equations, Laplace sound speed corrections, and Doppler algebra.'
                      : errors <= 3
                      ? 'Outstanding comprehension! Minor calculation slips identified, but core principles of phase difference and standing waves are rock-solid.'
                      : errors <= 7
                      ? 'Good effort! Review the misconception cards below to reinforce boundary conditions and Doppler ratio formulas.'
                      : 'Keep pushing! Mechanics and wave physics require iterative practice. Revisit the sandbox and master the foundational equations!'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Targeted Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
                <h4 className="text-sm font-bold text-rose-300">Your Targeted Misconception Profile:</h4>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div key={idx} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900 rounded-xl border border-rose-900/40 text-xs space-y-1">
                        <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ Physics Truth: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Schedule */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-amber-300">Spaced Repetition Schedule (SM-2)</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Next adaptive review session scheduled in:{' '}
                  <strong className="text-amber-400 font-bold">
                    {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                  </strong>
                </p>
              </div>
              <span className="text-2xl">📅</span>
            </motion.div>

            {/* Real-World Activity Card */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800 space-y-3">
              <h4 className="text-base font-bold text-gold-300 flex items-center gap-2">
                <span>🔭</span> {REAL_WORLD_ACTIVITY.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-1.5 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <p key={idx} className="text-xs text-slate-400 font-mono">
                    <span className="text-gold-400 font-bold mr-2">{idx + 1}.</span> {step}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Up!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PhysicsSimplePendulumSim;