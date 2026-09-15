'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C10_PHY_021 = 'c10_phy_021'; // Scattering of light
const NODE_C10_PHY_022 = 'c10_phy_022'; // Reflection of sound waves and echoes
const NODE_C10_PHY_023 = 'c10_phy_023'; // Natural and damped vibrations
const NODE_C10_PHY_024 = 'c10_phy_024'; // Forced vibrations and resonance
const NODE_C10_PHY_025 = 'c10_phy_025'; // Loudness of sound
const NODE_C10_PHY_026 = 'c10_phy_026'; // Pitch of sound
const NODE_C10_PHY_027 = 'c10_phy_027'; // Quality (timbre) of sound
const NODE_C10_PHY_028 = 'c10_phy_028'; // Ohm's law, emf, and internal resistance
const NODE_C10_PHY_029 = 'c10_phy_029'; // Resistances in series and parallel
const NODE_C10_PHY_030 = 'c10_phy_030'; // Electrical power and energy

const ALL_NODE_IDS = [
  NODE_C10_PHY_021,
  NODE_C10_PHY_022,
  NODE_C10_PHY_023,
  NODE_C10_PHY_024,
  NODE_C10_PHY_025,
  NODE_C10_PHY_026,
  NODE_C10_PHY_027,
  NODE_C10_PHY_028,
  NODE_C10_PHY_029,
  NODE_C10_PHY_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Himalayan Observatory & Lab Expedition',
  intro: 'You are the chief physicist at the High-Altitude Research Station in Ladakh. From the deep blue sky overhead and crimson sunsets across the Karakoram range, to ultrasonic sonar depth sounders in Pangong Tso, acoustic vibration testing in high winds, and powering precision equipment through solar battery arrays — every phenomenon you encounter is governed by ICSE Class 10 Physics principles.',
  context: 'Master the physics of light scattering, acoustics & vibrations, sound characteristics, and DC electrical circuits to keep the station running smoothly.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When looking straight up at the sky away from the sun on a cloudless midday in Ladakh, why does the sky appear deep blue instead of violet or white?',
  options: [
    'Sunlight is split by ice crystals acting as prisms (dispersion)',
    'Air molecules scatter shorter blue/violet wavelengths far more than red, and human eyes are more sensitive to blue',
    'The upper atmosphere acts like a mirror reflecting ocean water (reflection)',
    'Air molecules absorb red light and re-emit it as blue light at a higher temperature',
  ],
  correctIndex: 1,
  hintAfter: 'Scattering is irregular deflection by particles smaller than the wavelength of light — shorter wavelengths scatter much more!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Light Scattering (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C10_PHY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the physical phenomenon responsible for the blue colour of the clear sky?',
    options: [
      'Dispersion of light by water droplets',
      'Irregular scattering of light by air molecules where shorter wavelengths scatter more',
      'Total internal reflection in atmospheric layers',
      'Regular reflection of sea water by clouds',
    ],
    correctIndex: 1,
    hints: [
      'Think about whether a prism is present, or if tiny particles deflect light in all directions.',
      'Air molecules are smaller than the wavelength of visible light.',
      'Shorter wavelengths (blue/violet) are deflected in all directions irregularly — this is scattering.',
    ],
    explanation: 'Scattering of light is the irregular deflection of light by tiny atmospheric particles. Blue light (~400 nm) has a shorter wavelength and is scattered far more than red light (~700 nm).',
    misconceptionIndex: 0,
  },

  // 2. Foundation - Echo distance (Understanding)
  {
    id: 'ch_02',
    nodeId: NODE_C10_PHY_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the minimum distance between a sound source and a hard cliff in air (v = 340 m/s) approximately 17 m to hear a distinct echo?',
    options: [
      'Human ears cannot hear sound that travels less than 34 m',
      'Persistence of hearing requires a 0.1 s delay, during which sound travels 34 m round-trip (17 m each way)',
      'Sound waves lose all their energy if the obstacle is closer than 17 m',
      'Air absorption prevents echoes at short distances',
    ],
    correctIndex: 1,
    hints: [
      'Recall the human persistence of hearing time interval (0.1 s).',
      'Sound has to travel to the obstacle AND back: total distance = v × t.',
      '340 m/s × 0.1 s = 34 m round-trip. Halving gives d = 17 m.',
    ],
    explanation: 'Persistence of hearing is 0.1 s. In 0.1 s, sound travels 340 × 0.1 = 34 m. Since the sound goes to the obstacle and returns, one-way distance d = (v × t)/2 = 34/2 = 17 m.',
    misconceptionIndex: 1,
  },

  // 3. Foundation - Drag Label (Light Spectrum & Sky)
  {
    id: 'ch_03',
    nodeId: NODE_C10_PHY_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each optical role to its corresponding position in the atmospheric scattering diagram.',
    dragItems: [
      { label: 'Blue (High Scattering)', targetId: 'target_sky' },
      { label: 'Red/Orange (Low Scattering)', targetId: 'target_sunset' },
      { label: 'Air Molecule Particle', targetId: 'target_particle' },
      { label: 'Unscattered Noon Sun', targetId: 'target_sun' },
    ],
    correctMapping: {
      target_sky: 'Blue (High Scattering)',
      target_sunset: 'Red/Orange (Low Scattering)',
      target_particle: 'Air Molecule Particle',
      target_sun: 'Unscattered Noon Sun',
    },
    hints: [
      'The sky away from the sun receives scattered short wavelengths.',
      'Sunset rays travel through thick atmosphere leaving long unscattered wavelengths.',
      'Particles act as scattering centres; the midday sun reaches you directly with minimal scattering.',
    ],
    explanation: 'Air molecules scatter short wavelengths (blue) across the sky dome. At sunset, the long path through the atmosphere scatters away blue, leaving red/orange in the direct beam.',
    misconceptionIndex: 0,
  },

  // 4. Foundation - Damped vs Natural Vibration (Recall)
  {
    id: 'ch_04',
    nodeId: NODE_C10_PHY_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When a simple pendulum swings in air, its amplitude gradually decreases while its frequency remains almost unchanged. This motion is an example of:',
    options: [
      'Resonant vibration',
      'Damped vibration caused by energy dissipation against air resistance',
      'Forced vibration by gravitational pull',
      'Undamped natural harmonic oscillation',
    ],
    correctIndex: 1,
    hints: [
      'Notice that energy is continuously lost to friction and air resistance.',
      'Amplitude decays with time while the restoring property/frequency remains nearly constant.',
      'Vibrations whose amplitude decays due to resistive forces are called damped vibrations.',
    ],
    explanation: 'Damped vibrations are periodic motions whose amplitude decays with time due to resistive forces (air drag, friction) converting mechanical energy into heat.',
    misconceptionIndex: 2,
  },

  // 5. Foundation - Pitch vs Loudness vs Quality (Distinguish)
  {
    id: 'ch_05',
    nodeId: NODE_C10_PHY_027,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which sound characteristic allows an astronomer to distinguish a violin from a flute when both play note A (440 Hz) at the exact same loudness?',
    options: [
      'Pitch (determined by fundamental frequency)',
      'Loudness (determined by sound wave intensity)',
      'Quality or Timbre (determined by waveform and harmonic overtone composition)',
      'Speed of sound in the hall',
    ],
    correctIndex: 2,
    hints: [
      'Loudness is identical (same amplitude).',
      'Pitch is identical (same 440 Hz fundamental frequency).',
      'The difference lies in the waveform and mix of overtones — this is Quality (Timbre).',
    ],
    explanation: 'Quality (timbre) is the characteristic that distinguishes two notes of the same pitch and loudness played by different sources, determined by waveform and overtone mixtures.',
    misconceptionIndex: 3,
  },

  // 6. Foundation - Ohm\'s Law V-I Graph (Understanding)
  {
    id: 'ch_06',
    nodeId: NODE_C10_PHY_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A metallic conductor is tested at constant temperature. What does the slope (ΔV / ΔI) of its straight-line V-I graph represent?',
    options: [
      'Electromotive force (emf)',
      'Electrical power (P)',
      'Electrical resistance (R) in ohms',
      'Internal resistance of the voltmeter',
    ],
    correctIndex: 2,
    hints: [
      'From Ohm\'s Law: V = I × R.',
      'Rearrange: V / I = R.',
      'Therefore, the slope ΔV / ΔI on a V vs I plot represents the resistance R.',
    ],
    explanation: 'According to Ohm\'s law, V = IR for an ohmic conductor at constant temperature. The slope of the V-I graph (ΔV/ΔI) gives the resistance R in ohms (Ω).',
    misconceptionIndex: 4,
  },

  // 7. Foundation - Series & Parallel Bounds (Analysis)
  {
    id: 'ch_07',
    nodeId: NODE_C10_PHY_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'You are given three resistors: 2 Ω, 4 Ω, and 8 Ω. Which statement is ALWAYS true about their equivalent resistances?',
    options: [
      'Rs is less than 8 Ω; Rp is greater than 2 Ω',
      'Rs is greater than 8 Ω (Rs = 14 Ω); Rp is less than 2 Ω (Rp ≈ 1.14 Ω)',
      'Both Rs and Rp are equal to the average resistance (4.67 Ω)',
      'Rp is greater than 8 Ω because adding branches increases total resistance',
    ],
    correctIndex: 1,
    hints: [
      'In series, resistances add directly: Rs = R1 + R2 + R3.',
      'In parallel, 1/Rp = 1/R1 + 1/R2 + 1/R3.',
      'Series equivalent is always > largest resistor; Parallel equivalent is always < smallest resistor.',
    ],
    explanation: 'In series, Rs = 2 + 4 + 8 = 14 Ω (> 8 Ω). In parallel, 1/Rp = 1/2 + 1/4 + 1/8 = 7/8, so Rp = 8/7 ≈ 1.14 Ω (< 2 Ω). Parallel branches provide extra paths, lowering total resistance.',
  },

  // 8. Standard - Echo SONAR depth (Numeric - Application)
  {
    id: 'ch_08',
    nodeId: NODE_C10_PHY_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A SONAR transducer on a research boat in Pangong Tso sends an ultrasonic pulse into water (v = 1500 m/s) and receives the sea-bed echo after 1.6 seconds. What is the depth of the lake bed in metres?',
    correctAnswer: 1200,
    tolerance: 10,
    unit: 'm',
    hints: [
      'Remember the pulse travels down to the bed AND back up: round-trip time = 1.6 s.',
      'Total distance travelled = v × t = 1500 × 1.6 = 2400 m.',
      'Depth = (v × t) / 2. Divide 2400 by 2.',
    ],
    explanation: 'Depth d = (v × t) / 2 = (1500 m/s × 1.6 s) / 2 = 2400 / 2 = 1200 m.',
    misconceptionIndex: 1,
  },

  // 9. Standard - Forced Vibration & Resonance (Analysis)
  {
    id: 'ch_09',
    nodeId: NODE_C10_PHY_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Soldiers marching across a suspension bridge are ordered to "break step" (walk out of synchrony). What physical danger does this command prevent?',
    options: [
      'Damping the bridge oscillations so severely that the bridge becomes stiff',
      'Resonance: Rhythmic marching frequency matching the bridge natural frequency, causing catastrophic large-amplitude vibrations',
      'Overheating the bridge metal due to excessive acoustic absorption',
      'Refraction of sound waves causing hearing loss to soldiers',
    ],
    correctIndex: 1,
    hints: [
      'Consider what happens when external driving frequency equals the natural frequency.',
      'At matching frequency, energy transfer is maximum and amplitude builds up rapidly.',
      'Breaking step prevents periodic in-phase forces that cause resonance collapse (like Broughton Bridge, 1831).',
    ],
    explanation: 'If the marching cadence matches the natural frequency of the bridge, resonance occurs. The bridge absorbs maximum energy in phase, producing violent oscillations that can cause collapse.',
  },

  // 10. Standard - Loudness and Intensity (Understanding)
  {
    id: 'ch_08b',
    nodeId: NODE_C10_PHY_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'If the amplitude of vibration of a loudspeaker cone is tripled, by what factor does the radiated sound wave energy (intensity) increase?',
    options: [
      'Increases by 3 times',
      'Increases by 6 times',
      'Increases by 9 times (Intensity ∝ Amplitude²)',
      'Remains unchanged because frequency is constant',
    ],
    correctIndex: 2,
    hints: [
      'Recall the relationship between wave energy/intensity and amplitude.',
      'Energy of a wave is proportional to the square of its amplitude: E ∝ A².',
      'If A is multiplied by 3, Intensity is multiplied by 3² = 9.',
    ],
    explanation: 'Sound wave intensity I and energy E are proportional to the square of the amplitude (I ∝ A²). Tripling the amplitude increases the sound intensity by 3² = 9 times.',
    misconceptionIndex: 2,
  },

  // 11. Standard - Internal Resistance & Terminal PD (Numeric - Application)
  {
    id: 'ch_10',
    nodeId: NODE_C10_PHY_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A solar storage battery has an open-circuit emf of 12 V and an internal resistance r = 0.5 Ω. When connected to an external load R = 5.5 Ω, what is the terminal potential difference V across the load in Volts?',
    correctAnswer: 11,
    tolerance: 0.2,
    unit: 'V',
    hints: [
      'Find total circuit resistance first: R_total = R + r = 5.5 + 0.5 = 6.0 Ω.',
      'Calculate current: I = emf / (R + r) = 12 / 6 = 2 A.',
      'Terminal pd V = emf - Ir = 12 - (2 × 0.5) = 11 V (or V = I × R = 2 × 5.5 = 11 V).',
    ],
    explanation: 'Total circuit resistance = 5.5 + 0.5 = 6 Ω. Current I = 12 / 6 = 2 A. Lost volts inside battery = Ir = 2 × 0.5 = 1 V. Terminal PD V = emf - Ir = 12 - 1 = 11 V.',
    misconceptionIndex: 4,
  },

  // 12. Standard - Electrical Power & Energy (Numeric - Application)
  {
    id: 'ch_11',
    nodeId: NODE_C10_PHY_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electric room heater rated 1000 W (1 kW) is operated for 4 hours daily in the Himalayan observatory. At ₹8 per kWh (commercial unit), what is the cost of operating this heater for 30 days in rupees?',
    correctAnswer: 960,
    tolerance: 5,
    unit: '₹',
    hints: [
      'Daily energy consumed in kWh = Power (kW) × Time (h) = 1 kW × 4 h = 4 kWh.',
      'Monthly energy for 30 days = 4 kWh/day × 30 days = 120 kWh (units).',
      'Total Cost = 120 units × ₹8 = ₹960.',
    ],
    explanation: 'Energy = P × t = 1 kW × 4 h/day × 30 days = 120 kWh. Cost = 120 kWh × ₹8/kWh = ₹960.',
  },

  // 13. Standard - Drag-Sort: Steps in Acoustic Echo Distance Measurement
  {
    id: 'ch_12',
    nodeId: NODE_C10_PHY_022,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of physical events that occur during an echo distance measurement from start to calculation.',
    sortItems: [
      'Source emits sharp acoustic compression wave into air',
      'Sound travels distance d through medium at velocity v',
      'Sound wave reflects off dense obstacle boundary',
      'Reflected wave travels distance d back to receiver after time t',
      'Calculate obstacle distance using formula d = (v × t) / 2',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    hints: [
      'Start with wave emission from the source.',
      'Next comes forward propagation, then boundary reflection.',
      'Finally, return propagation and applying the halved round-trip formula.',
    ],
    explanation: 'A sharp pulse is emitted, travels distance d, reflects at the rigid boundary, returns distance d over total time t, and distance is calculated as d = (v × t) / 2.',
  },

  // 14. Standard - Pitch & String Variables (Analysis)
  {
    id: 'ch_13',
    nodeId: NODE_C10_PHY_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A musician tuning a sitar in Ladakh tightens a string (increases tension T) and presses a fret to shorten its vibrating length L. What happens to the frequency and pitch of the note?',
    options: [
      'Frequency decreases and pitch becomes lower',
      'Both tension increase and length shortening INCREASE frequency, making pitch higher (shriller)',
      'Tension increases pitch, but shortening length decreases pitch, keeping pitch constant',
      'Only loudness increases; pitch is unaltered',
    ],
    correctIndex: 1,
    hints: [
      'Recall how string frequency depends on length: f ∝ 1/L (shorter string = higher frequency).',
      'Recall how frequency depends on tension: f ∝ √T (tighter string = higher frequency).',
      'Both actions increase the vibration rate, resulting in a higher pitch.',
    ],
    explanation: 'Frequency of a stretched string increases with higher tension (f ∝ √T) and shorter vibrating length (f ∝ 1/L). Higher frequency produces a higher, shriller pitch.',
  },

  // 15. Standard - Construct: Power Formula Derivation
  {
    id: 'ch_14',
    nodeId: NODE_C10_PHY_030,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Build the foundational derivation chain linking work W, charge Q, voltage V, current I, and power P.',
    availableParts: ['W = QV', 'Q = It', 'W = VIt', 'P = W/t = VI', 'P = I²R = V²/R'],
    targetState: 'W = QV Q = It W = VIt P = W/t = VI P = I²R = V²/R',
    validationHint: 'Assemble from electrostatic work definition W = QV up to the three equivalent power relations.',
    hints: [
      'Start with definition of potential difference: W = QV.',
      'Substitute Q = It to get electrical energy W = VIt.',
      'Divide by time t to get Power P = VI, then apply Ohm\'s law V = IR.',
    ],
    explanation: 'By definition of potential, W = QV. Since Q = It, W = VIt. Power P = W/t = VI. Substituting V = IR gives P = I²R = V²/R.',
  },

  // 16. Advanced - Scattering: Sunset vs Noon (Evaluation)
  {
    id: 'ch_15',
    nodeId: NODE_C10_PHY_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why the setting sun over the Himalayas appears deep crimson-orange, whereas the overhead midday sun appears yellowish-white.',
    options: [
      'The sun cools down significantly in temperature towards dusk',
      'At sunset, sunlight traverses a much thicker atmospheric path; shorter blue/violet wavelengths are almost entirely scattered out of the direct beam, leaving only transmitted long red wavelengths',
      'Sunset rays undergo total internal reflection inside high-altitude clouds',
      'Refraction splits white light into a rainbow where red bends the most',
    ],
    correctIndex: 1,
    hints: [
      'Consider the path length of light rays through the atmosphere at low angles versus overhead.',
      'Thick path means blue light encounters far more scattering particles and is removed from the direct beam.',
      'Red light has the longest visible wavelength (~700 nm), scatters least, and reaches the observer directly.',
    ],
    explanation: 'At horizon angles (sunrise/sunset), the light path through atmosphere is up to 10× longer. Blue light is scattered away in all directions, leaving the unscattered red/orange rays to reach the eye directly.',
    misconceptionIndex: 0,
  },

  // 17. Advanced - Resistor Mixed Network (Numeric - Analysis)
  {
    id: 'ch_16',
    nodeId: NODE_C10_PHY_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the observatory sensor circuit, two resistors of 6 Ω and 12 Ω are connected in parallel. This entire parallel pair is connected in series with a 4 Ω resistor across a 16 V supply (internal resistance r = 0). What total current in Amperes is drawn from the supply?',
    correctAnswer: 2,
    tolerance: 0.1,
    unit: 'A',
    hints: [
      'First reduce the parallel pair: Rp = (6 × 12) / (6 + 12) = 72 / 18 = 4 Ω.',
      'Add the series resistor: R_total = Rp + 4 = 4 + 4 = 8 Ω.',
      'Calculate current using Ohm\'s law: I = V / R_total = 16 / 8 = 2 A.',
    ],
    explanation: 'Parallel equivalent Rp = (6 × 12)/(6 + 12) = 4 Ω. Total resistance = 4 + 4 = 8 Ω. Total current I = 16 V / 8 Ω = 2 A.',
  },

  // 18. Advanced - Tuning Fork on Resonance Box (Application)
  {
    id: 'ch_17',
    nodeId: NODE_C10_PHY_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'When the stem of a vibrating 256 Hz tuning fork is pressed firmly against a hollow wooden resonance box, the sound becomes significantly louder. Why does this occur?',
    options: [
      'The wooden box creates extra acoustic energy out of nothing',
      'The large surface area of the box is forced into vibration, setting a much larger mass of air into motion per second',
      'The frequency of the tuning fork doubles to 512 Hz',
      'The speed of sound in wood is slower than in air, concentrating the wave',
    ],
    correctIndex: 1,
    hints: [
      'Energy cannot be created from nowhere (conservation of energy).',
      'A small fork stem touches very few air molecules.',
      'The large soundboard/box communicates vibrations to a much larger mass of surrounding air, increasing radiated sound intensity.',
    ],
    explanation: 'The fork forces the large surface of the hollow box to vibrate. A larger vibrating surface pushes a far greater mass of air molecules per second, dramatically increasing the radiated intensity and loudness.',
    misconceptionIndex: 2,
  },

  // 19. Advanced - Damped vs Natural Frequency (Evaluation)
  {
    id: 'ch_18',
    nodeId: NODE_C10_PHY_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "Because damped vibrations lose energy every cycle, their oscillation frequency also decreases by 50% each second." Evaluate this claim.',
    options: [
      'The student is correct: frequency drops proportionally with energy loss',
      'Incorrect: Damping causes exponential decay of amplitude, while the oscillation frequency remains essentially constant (governed by restoring properties)',
      'Incorrect: Frequency actually increases as amplitude decays',
      'Correct: When amplitude hits zero, frequency becomes infinite',
    ],
    correctIndex: 1,
    hints: [
      'Think about what determines frequency: inertia and elastic/restoring stiffness of the oscillator.',
      'Damping friction dissipates energy (reducing amplitude A).',
      'The period T and natural frequency f remain essentially constant while peaks shrink in height.',
    ],
    explanation: 'Damping removes mechanical energy, shrinking the oscillation amplitude over time. However, the period and frequency of oscillation depend on the mass and restoring elasticity, and remain essentially unchanged.',
    misconceptionIndex: 2,
  },

  // 20. Advanced - Harmonics & Overtones Offset (Analysis)
  {
    id: 'ch_19',
    nodeId: NODE_C10_PHY_027,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An open organ pipe at the station produces a fundamental frequency of 300 Hz. What is the frequency of its FIRST OVERTONE in Hz?',
    correctAnswer: 600,
    tolerance: 5,
    unit: 'Hz',
    hints: [
      'Recall the relationship between fundamental frequency f, harmonics, and overtones.',
      'Fundamental f = 1st harmonic = 300 Hz.',
      'The 1st overtone is the 2nd harmonic: 2 × f = 2 × 300 Hz = 600 Hz.',
    ],
    explanation: 'Fundamental f = 300 Hz (1st harmonic). The first overtone is the next higher harmonic, which is the 2nd harmonic (2f = 2 × 300 = 600 Hz). Note that overtone numbering is offset from harmonic numbering.',
    misconceptionIndex: 3,
  },

  // 21. Advanced - Appliance Resistance vs Power (Evaluation)
  {
    id: 'ch_20',
    nodeId: NODE_C10_PHY_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Two heaters operate on 220 V mains: Heater A is rated 500 W and Heater B is rated 2000 W. Which heater has the LOWER electrical resistance element?',
    options: [
      'Heater A (500 W) has lower resistance because it draws less power',
      'Heater B (2000 W) has lower resistance because P = V² / R (Resistance is inversely proportional to Power at constant voltage)',
      'Both have identical resistance because both operate on 220 V',
      'Resistance cannot be determined without knowing the operating temperature',
    ],
    correctIndex: 1,
    hints: [
      'At constant voltage V = 220 V, use P = V² / R.',
      'Rearrange for resistance: R = V² / P.',
      'Higher power P means smaller resistance R. (R_B = 220²/2000 = 24.2 Ω vs R_A = 220²/500 = 96.8 Ω).',
    ],
    explanation: 'From P = V²/R, at fixed mains voltage V, power is inversely proportional to resistance. The 2000 W heater requires a lower resistance (thick wire, ~24.2 Ω) to draw more current and dissipate higher power.',
  },

  // 22. Advanced - Commercial Energy & Joules Conversion (Numeric - Application)
  {
    id: 'ch_21',
    nodeId: NODE_C10_PHY_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How many Megajoules (MJ, where 1 MJ = 10⁶ J) are in 5 commercial units (5 kWh) of electrical energy?',
    correctAnswer: 18,
    tolerance: 0.2,
    unit: 'MJ',
    hints: [
      'Recall: 1 kWh = 1000 W × 3600 s = 3,600,000 J = 3.6 × 10⁶ J = 3.6 MJ.',
      'Multiply 5 kWh by 3.6 MJ/kWh.',
      '5 × 3.6 = 18 MJ.',
    ],
    explanation: '1 commercial unit (1 kWh) = 3.6 × 10⁶ J = 3.6 MJ. Therefore, 5 kWh = 5 × 3.6 MJ = 18 MJ.',
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
  nodeId: NODE_C10_PHY_021,
  title: 'CISCE Class 10 Physics: Waves, Light & Electricity Suite',
  definition:
    'Comprehensive mastery of light scattering, echo reflection, natural & forced vibrations, resonance, sound characteristics (loudness, pitch, quality), Ohm’s law, internal resistance, resistor combinations, and electrical energy/power.',
  eli5:
    'Explore how light scatters to paint the sky blue and sunsets red, how sound bounces in echoes and rings in resonance, how musical instruments produce unique timbres, and how electric circuits deliver power through resistors.',
  misconceptions: [
    {
      misconception: 'The sky is blue because of dispersion or reflection of sunlight.',
      correction: 'The sky is blue due to scattering by air molecules: shorter wavelengths (blue ~400 nm) scatter far more than longer wavelengths (red ~700 nm).',
    },
    {
      misconception: 'Echo distance is simply speed × time (d = v × t).',
      correction: 'Sound travels to the obstacle and returns, so the one-way distance is d = (v × t) / 2. Always divide by 2.',
    },
    {
      misconception: 'Damping decreases the frequency of vibration.',
      correction: 'Damping dissipates energy and decreases amplitude exponentially; the oscillation frequency remains essentially constant.',
    },
    {
      misconception: 'Quality (timbre) of sound depends only on frequency or loudness.',
      correction: 'Quality depends on the waveform and the specific mixture of harmonic overtones, independent of pitch and loudness.',
    },
    {
      misconception: 'Terminal potential difference of a cell is always equal to its emf.',
      correction: 'When current flows, internal resistance creates lost volts (Ir), so terminal pd V = emf - Ir (less than emf).',
    },
  ],
  diagnosticQuestions: [
    { question: 'Why is blue light scattered more than red light in the atmosphere?', options: ['Blue has shorter wavelength', 'Blue has longer wavelength', 'Blue travels slower in air', 'Red is absorbed completely'], correctIndex: 0 },
    { question: 'What is the minimum distance for an echo in air (v = 340 m/s)?', options: ['34 m', '17 m', '8.5 m', '51 m'], correctIndex: 1 },
    { question: 'What condition produces resonance?', options: ['Driving frequency = Natural frequency', 'Zero damping', 'Infinite amplitude', 'Frequency equals 0 Hz'], correctIndex: 0 },
    { question: 'How does sound intensity scale with amplitude A?', options: ['I ∝ A', 'I ∝ A²', 'I ∝ 1/A', 'I ∝ √A'], correctIndex: 1 },
    { question: 'Pitch of sound corresponds to which physical property?', options: ['Amplitude', 'Waveform', 'Frequency', 'Phase'], correctIndex: 2 },
    { question: 'What determines the quality/timbre of a musical note?', options: ['Waveform & overtones', 'Speed of sound', 'Pure loudness', 'Air temperature'], correctIndex: 0 },
    { question: 'In a parallel resistor circuit, the equivalent resistance is always:', options: ['Greater than largest', 'Less than smallest', 'Equal to sum', 'Zero'], correctIndex: 1 },
    { question: '1 commercial unit of electricity (1 kWh) equals how many Joules?', options: ['1,000 J', '3,600 J', '3.6 × 10⁶ J', '3.6 × 10⁵ J'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student achieves ≥80% mastery across light scattering, acoustics, sound properties, and DC circuit analysis.',
};

// ─── EXPLORATION STEPS (5 Interactive Stages) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Light Scattering & Atmospheric Path',
    instruction: 'Drag the Sun Angle slider from Midday (90°) to Sunset (5°) and observe how atmospheric path thickness scatters blue light away, turning the direct beam crimson-orange.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_PHY_021,
  },
  {
    title: '2. Echo Timing & Reflection Barrier',
    instruction: 'Move the cliff distance slider or trigger an acoustic pulse to observe sound propagation, reflection, and echo delay (Persistence of hearing = 0.1 s).',
    interactionType: 'pulse-observe',
    nodeId: NODE_C10_PHY_022,
  },
  {
    title: '3. Tuning Fork Resonance & Damping',
    instruction: 'Adjust the driving frequency towards the fork’s natural frequency (256 Hz) to observe resonant maximum amplitude, or toggle damping to observe decay envelopes.',
    interactionType: 'resonance-tune',
    nodeId: NODE_C10_PHY_024,
  },
  {
    title: '4. Sound Waveform & Harmonic Timbre',
    instruction: 'Toggle overtones (2nd, 3rd, 4th harmonics) on top of the 440 Hz fundamental to witness how complex waveforms shape instrument quality (timbre).',
    interactionType: 'harmonic-builder',
    nodeId: NODE_C10_PHY_027,
  },
  {
    title: '5. DC Circuit: Emf, Load & Internal Resistance',
    instruction: 'Vary the load resistance R and cell internal resistance r to see how current I = E/(R+r), terminal PD V, and power dissipation P change in real-time.',
    interactionType: 'circuit-slider',
    nodeId: NODE_C10_PHY_028,
  },
];

// ─── PREDICTION QUESTIONS (Predict-Then-Check) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the sun sinks from overhead to the horizon, what happens to the path length of light through the atmosphere and the colour of the sun?',
    options: [
      'Path length decreases, sun becomes deep violet',
      'Path length increases up to 10×, blue scatters away, sun looks deep red/orange',
      'Path length stays constant, sun looks green',
      'Path length doubles, all wavelengths disappear completely',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the Sun Elevation angle down to 5° to verify the atmospheric path and colour change!',
    nodeId: NODE_C10_PHY_021,
  },
  {
    question: 'Predict: If an obstacle is placed 10 metres away from a person clapping in air (v = 340 m/s), will they hear a distinct echo?',
    options: [
      'Yes, because any hard wall produces a distinct echo',
      'No, because the round-trip time (20 m / 340 m/s ≈ 0.059 s) is less than the 0.1 s persistence of hearing',
      'Yes, because 10 m is greater than 8.5 m',
      'No, because sound dies out before reaching 10 m',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set the distance slider to 10 m and observe the delay readout in the echo simulator.',
    nodeId: NODE_C10_PHY_022,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the amplitude of the tuning fork when the driving frequency matches its natural frequency (f = f₀)?',
    observableOptions: [
      'Amplitude drops to zero',
      'Amplitude reaches a sharp maximum peak (Resonance)',
      'Frequency doubles instantly',
      'Wave becomes a straight line',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_PHY_024,
  },
  {
    question: 'What happens to the terminal potential difference V across a battery as internal resistance r is increased while load R is fixed?',
    observableOptions: [
      'Terminal PD increases above emf',
      'Terminal PD decreases because "lost volts" (Ir) inside the battery increase',
      'Terminal PD stays strictly equal to emf',
      'Current becomes infinite',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_PHY_028,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Himalayan Station Chief Field Audit',
  description:
    'Apply your Class 10 physics mastery to a practical challenge: estimate the distance to an opposing mountain ridge across a valley using hand claps and a stopwatch, audit the observatory solar-battery power bank to minimise internal heat losses, and configure fog illumination lamps.',
  steps: [
    'Measure echo delay across a valley: compute d = (340 m/s × t) / 2 to map surrounding terrain.',
    'Inspect vehicle fog lamps: confirm why yellow filters (longer λ) reduce backscatter glare in mountain fog.',
    'Audit observatory solar battery storage: balance load resistance R against battery internal resistance r to maximise delivered power.',
    'Calculate monthly station electricity tariff in kWh (commercial units) and formulate an energy conservation plan.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
function C10_PhysicsScatteringLightSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT-STYLE INTERACTIVE STATES ───
  const [sunAngle, setSunAngle] = useState(45); // 5 to 90 degrees
  const [cliffDistance, setCliffDistance] = useState(50); // 5 to 150 m
  const [echoPulseActive, setEchoPulseActive] = useState(false);
  const [echoSoundProgress, setEchoSoundProgress] = useState(0);
  const [drivingFreq, setDrivingFreq] = useState(240); // 200 to 300 Hz (Resonance at 256 Hz)
  const [isDamped, setIsDamped] = useState(true);
  const [dampingFactor, setDampingFactor] = useState(0.4);
  const [harmonicsState, setHarmonicsState] = useState<Record<number, number>>({ 1: 1.0, 2: 0.5, 3: 0.25, 4: 0.1 });
  const [loadResistance, setLoadResistance] = useState(6.0); // Ohms
  const [internalResistance, setInternalResistance] = useState(1.0); // Ohms
  const [batteryEmf, setBatteryEmf] = useState(12.0); // Volts
  const [resistorMode, setResistorMode] = useState<'series' | 'parallel'>('series');
  const [r1Val, setR1Val] = useState(4);
  const [r2Val, setR2Val] = useState(6);

  // ─── PREDICTION & OBSERVATION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [selectedTopicExploration, setSelectedTopicExploration] = useState<string>('light');

  // ─── ADAPTIVE BKT & DIFFICULTY STATES ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── HINTS & REVEALS ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── CHALLENGE INTERACTION STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── VISUAL FEEDBACK & ACCESSIBILITY STATES ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'sim' | 'diagnostic' | 'formulas'>('sim');

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // ─── DERIVED VALUES FOR REAL-TIME DISPLAY ───
  // 1. Light scattering math
  const atmosphericThickness = useMemo(() => {
    // Relative air mass = 1 / sin(angle)
    const rad = (Math.max(5, sunAngle) * Math.PI) / 180;
    return Math.min(10, 1 / Math.sin(rad));
  }, [sunAngle]);

  const blueScatteredPercent = useMemo(() => {
    return Math.min(98, Math.round(atmosphericThickness * 20));
  }, [atmosphericThickness]);

  const directLightColor = useMemo(() => {
    if (sunAngle > 60) return '#fffde7'; // noon yellowish-white
    if (sunAngle > 30) return '#fed7aa'; // afternoon warm yellow-orange
    if (sunAngle > 15) return '#fb923c'; // late evening orange
    return '#ef4444'; // sunset crimson red
  }, [sunAngle]);

  // 2. Sound Echo math
  const echoDelaySec = useMemo(() => {
    return ((2 * cliffDistance) / 340).toFixed(3);
  }, [cliffDistance]);

  const isEchoDistinguishable = useMemo(() => {
    return parseFloat(echoDelaySec) >= 0.1;
  }, [echoDelaySec]);

  // 3. Resonance Amplitude
  const resonanceAmplitude = useMemo(() => {
    const deltaF = Math.abs(drivingFreq - 256);
    const damping = isDamped ? dampingFactor * 10 : 1;
    return Math.max(5, Math.min(100, Math.round(1000 / (deltaF * deltaF + damping * damping + 10))));
  }, [drivingFreq, isDamped, dampingFactor]);

  // 4. Circuit calculations
  const circuitCurrent = useMemo(() => {
    const totalR = loadResistance + internalResistance;
    return totalR > 0 ? batteryEmf / totalR : 0;
  }, [loadResistance, internalResistance, batteryEmf]);

  const terminalPD = useMemo(() => {
    return Math.max(0, batteryEmf - circuitCurrent * internalResistance);
  }, [batteryEmf, circuitCurrent, internalResistance]);

  const powerDelivered = useMemo(() => {
    return terminalPD * circuitCurrent;
  }, [terminalPD, circuitCurrent]);

  const powerLostInternal = useMemo(() => {
    return circuitCurrent * circuitCurrent * internalResistance;
  }, [circuitCurrent, internalResistance]);

  // 5. Equivalent resistor combination
  const eqResistance = useMemo(() => {
    if (resistorMode === 'series') {
      return r1Val + r2Val;
    } else {
      return (r1Val * r2Val) / (r1Val + r2Val);
    }
  }, [resistorMode, r1Val, r2Val]);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY UPDATE ───
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

  // ─── 2D CANVAS WAVEFORM / OSCILLATION ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Draw grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw Center Baseline
      ctx.strokeStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Render Composite Waveform with Harmonics
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * Math.PI * 4;
        let yOffset = 0;

        // Sum active harmonics
        Object.entries(harmonicsState).forEach(([harmonic, amp]) => {
          const h = parseInt(harmonic);
          yOffset += amp * Math.sin(h * (t - time * 1.5)) * 25;
        });

        // Apply Resonance multiplier if in resonance mode
        const ampScale = (resonanceAmplitude / 50) * 0.8;
        const finalY = midY - yOffset * ampScale;

        if (x === 0) ctx.moveTo(x, finalY);
        else ctx.lineTo(x, finalY);
      }
      ctx.stroke();

      // Render Damping Decay Envelope if active
      if (isDamped) {
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const env = 35 * Math.exp((-x / width) * dampingFactor * 4) * (resonanceAmplitude / 50);
          if (x === 0) ctx.moveTo(x, midY - env);
          else ctx.lineTo(x, midY - env);
        }
        for (let x = width - 1; x >= 0; x--) {
          const env = 35 * Math.exp((-x / width) * dampingFactor * 4) * (resonanceAmplitude / 50);
          ctx.lineTo(x, midY + env);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [harmonicsState, resonanceAmplitude, isDamped, dampingFactor]);

  // ─── USECALLBACK HANDLERS ───

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(
      correct ? 'Excellent reasoning! Let us dive into the full visual simulation.' : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the guided exploration. Manipulate each simulation to discover the physics.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test all physics variables freely without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Let us put your knowledge to the test.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now manipulate the controls to verify!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great scientific observation!' : 'Look closely at the graph peak.');
  }, []);

  const handleSunAngleChange = useCallback((angle: number) => {
    setSunAngle(angle);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && angle <= 15) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleCliffDistanceChange = useCallback((dist: number) => {
    setCliffDistance(dist);
    audioManager.play('count');
  }, []);

  const handleTriggerEchoPulse = useCallback(() => {
    if (echoPulseActive) return;
    setEchoPulseActive(true);
    audioManager.play('pop');
    speechManager.speak('Acoustic pulse emitted!');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setEchoSoundProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setEchoPulseActive(false);
        setEchoSoundProgress(0);
        audioManager.play('chime');
      }
    }, 40);
  }, [echoPulseActive]);

  const handleDrivingFreqChange = useCallback((f: number) => {
    setDrivingFreq(f);
    audioManager.play('count');
  }, []);

  const handleToggleHarmonic = useCallback((h: number) => {
    audioManager.play('tap');
    setHarmonicsState((prev) => ({
      ...prev,
      [h]: prev[h] > 0 ? 0 : h === 1 ? 1.0 : h === 2 ? 0.5 : h === 3 ? 0.3 : 0.15,
    }));
  }, []);

  const handleCircuitSliderChange = useCallback((rLoad: number, rInt: number, vCell: number) => {
    setLoadResistance(rLoad);
    setInternalResistance(rInt);
    setBatteryEmf(vCell);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Outstanding effort! You completed the simulation with a score of ${finalScore} percent.`);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          !isNaN(numAnswer) &&
          Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.5);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well deduced.');
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
          speechManager.speak('All hints reviewed. Let us study the complete physical explanation.');
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
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length === challenge.sortItems?.length
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER JSX ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">ICSE Class 10 Physics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">CISCE 2026</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty Badge */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border border-rose-700'
                : 'bg-cyan-950 text-cyan-400 border border-cyan-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            Score: {Math.max(0, 100 - errors * 5)}%
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/60">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
              <span>🏔️</span>
              <span>Mission Narrative Scenario</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-3 pt-3 border-t border-indigo-900/60">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
              <span>⚡</span>
              <span>Discovery Curiosity Hook (Predict Before Learning)</span>
            </div>
            <p className="text-white text-base font-semibold">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${option}`}
                  className={`text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-medium'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 space-y-4">
                <div
                  className={`p-4 rounded-xl text-sm border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border-emerald-700 text-emerald-300'
                      : 'bg-amber-950/50 border-amber-700 text-amber-300'
                  }`}
                >
                  <p className="font-bold">{discoveryCorrect ? '✓ Fantastic intuition!' : '💡 Don\'t worry if that surprised you!'}</p>
                  <p className="mt-1 text-xs">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <span>Enter Interactive Lab</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-indigo-400">Interactive Guided Discovery</span>
              <h2 className="text-lg font-extrabold text-white">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
              </h2>
            </div>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? 'bg-indigo-500 w-6' : i < currentSlide ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-900/60 text-sm text-indigo-200">
            👉 <span className="font-semibold text-white">{EXPLORATION_STEPS[currentSlide].instruction}</span>
          </div>

          {/* SIMULATION VISUALISATION STAGE */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {/* Step 1: Light Scattering */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  {/* SVG Atmosphere & Sun Path Model */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 280" className="w-full h-auto">
                      {/* Space & Earth curve */}
                      <defs>
                        <radialGradient id="skyGrad" cx="50%" cy="100%" r="80%">
                          <stop offset="0%" stopColor="#1e3a8a" />
                          <stop offset="60%" stopColor="#0f172a" />
                          <stop offset="100%" stopColor="#020617" />
                        </radialGradient>
                      </defs>
                      <rect width="400" height="280" fill="url(#skyGrad)" rx="12" />

                      {/* Earth Atmosphere Shell */}
                      <path d="M 40 260 A 180 180 0 0 1 360 260" stroke="#38bdf8" strokeWidth="16" fill="none" opacity="0.35" />
                      <path d="M 60 260 A 160 160 0 0 1 340 260" fill="#064e3b" opacity="0.8" />
                      <text x="200" y="270" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">
                        Himalayan Observatory Observer
                      </text>

                      {/* Observer Icon */}
                      <circle cx="200" cy="220" r="6" fill="#f8fafc" />
                      <line x1="200" y1="220" x2="200" y2="200" stroke="#f8fafc" strokeWidth="2" />

                      {/* Sun Position */}
                      {(() => {
                        const rad = (sunAngle * Math.PI) / 180;
                        const sunX = 200 - Math.cos(rad) * 150;
                        const sunY = 220 - Math.sin(rad) * 150;
                        return (
                          <g>
                            {/* Sun Beam through atmosphere to observer */}
                            <line
                              x1={sunX}
                              y1={sunY}
                              x2="200"
                              y2="220"
                              stroke={directLightColor}
                              strokeWidth="4"
                              strokeDasharray="4,2"
                            />
                            {/* Blue Scattered Rays escaping outwards */}
                            <line x1="160" y1="180" x2="110" y2="130" stroke="#60a5fa" strokeWidth="1.5" />
                            <line x1="180" y1="160" x2="160" y2="100" stroke="#60a5fa" strokeWidth="1.5" />
                            <line x1="190" y1="140" x2="240" y2="90" stroke="#60a5fa" strokeWidth="1.5" />
                            <circle cx={sunX} cy={sunY} r="18" fill={directLightColor} filter="drop-shadow(0 0 12px gold)" />
                            <text x={sunX} y={sunY + 4} textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="bold">
                              {sunAngle}°
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Real-Time Live Readout & Slider */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Sun Elevation Angle:</span>
                        <span className="text-amber-400 font-mono font-bold">{sunAngle}° ({sunAngle > 50 ? 'Noon' : sunAngle > 20 ? 'Afternoon' : 'Sunset/Sunrise'})</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={90}
                        value={sunAngle}
                        onChange={(e) => handleSunAngleChange(Number(e.target.value))}
                        aria-label="Adjust sun elevation angle"
                        className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-400">Atmospheric Path Thickness</p>
                        <p className="text-lg font-mono font-bold text-cyan-400">{atmosphericThickness.toFixed(2)}×</p>
                        <p className="text-xs text-slate-500">{sunAngle <= 15 ? 'Very Thick Path' : 'Thin Path'}</p>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-400">Blue Light Scattered Out</p>
                        <p className="text-lg font-mono font-bold text-indigo-400">{blueScatteredPercent}%</p>
                        <p className="text-xs text-slate-500">Short λ (~400 nm)</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-white/20 shadow-inner shrink-0" style={{ backgroundColor: directLightColor }} />
                      <div>
                        <p className="text-xs text-slate-400">Direct Beam Colour Reaching Eye</p>
                        <p className="text-sm font-bold text-white">
                          {sunAngle > 60 ? 'Yellowish-White (Full Spectrum)' : sunAngle > 20 ? 'Warm Golden-Orange' : 'Deep Crimson-Red (Red λ Transmitted)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predict-Then-Check Container */}
                {!predictionMade && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800">
                    <p className="text-white text-sm font-bold mb-2">🤔 {PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="text-left p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:border-indigo-400"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 2: Echo & Sound Reflection */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 500 180" className="w-full h-auto">
                    {/* Ground */}
                    <line x1="20" y1="150" x2="480" y2="150" stroke="#334155" strokeWidth="3" />

                    {/* Source Person */}
                    <circle cx="50" cy="115" r="8" fill="#38bdf8" />
                    <line x1="50" y1="123" x2="50" y2="148" stroke="#38bdf8" strokeWidth="3" />
                    <text x="50" y="100" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Source</text>

                    {/* Cliff Barrier */}
                    {(() => {
                      const cliffX = 100 + (cliffDistance / 150) * 350;
                      return (
                        <g>
                          <rect x={cliffX} y="20" width="24" height="130" fill="#475569" stroke="#64748b" rx="3" />
                          <text x={cliffX + 12} y="15" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                            Cliff ({cliffDistance} m)
                          </text>

                          {/* Sound Pulse Propagation Wave */}
                          {echoPulseActive && (
                            <g>
                              {echoSoundProgress <= 50 ? (
                                // Forward wavefront
                                <path
                                  d={`M ${50 + (echoSoundProgress / 50) * (cliffX - 50)} 70 Q ${
                                    50 + (echoSoundProgress / 50) * (cliffX - 50) + 15
                                  } 115 ${50 + (echoSoundProgress / 50) * (cliffX - 50)} 150`}
                                  stroke="#22c55e"
                                  strokeWidth="3"
                                  fill="none"
                                />
                              ) : (
                                // Reflected wavefront
                                <path
                                  d={`M ${cliffX - ((echoSoundProgress - 50) / 50) * (cliffX - 50)} 70 Q ${
                                    cliffX - ((echoSoundProgress - 50) / 50) * (cliffX - 50) - 15
                                  } 115 ${cliffX - ((echoSoundProgress - 50) / 50) * (cliffX - 50)} 150`}
                                  stroke="#f43f5e"
                                  strokeWidth="3"
                                  fill="none"
                                />
                              )}
                            </g>
                          )}
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Distance to Cliff (d):</span>
                      <span className="text-cyan-400 font-mono font-bold">{cliffDistance} metres</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={150}
                      value={cliffDistance}
                      onChange={(e) => handleCliffDistanceChange(Number(e.target.value))}
                      aria-label="Set cliff distance"
                      className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleTriggerEchoPulse}
                      disabled={echoPulseActive}
                      className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm shadow-md"
                    >
                      {echoPulseActive ? 'Echo Travelling...' : '🔊 Emit Acoustic Pulse (Clap)'}
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs text-slate-400">Echo Round-Trip Delay (t)</p>
                    <p className="text-xl font-mono font-bold text-amber-400">{echoDelaySec} s</p>
                    <div
                      className={`text-xs px-2 py-1 rounded font-semibold ${
                        isEchoDistinguishable ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {isEchoDistinguishable ? '✓ Clear Distinct Echo (t ≥ 0.1 s)' : '✗ Merged (Reverberation, t < 0.1 s)'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Resonance & Vibrations */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <canvas ref={canvasRef} width={600} height={160} className="w-full h-40 bg-slate-950 rounded-xl border border-slate-800" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">External Driving Frequency:</span>
                      <span className="text-indigo-400 font-mono font-bold">{drivingFreq} Hz (f₀ = 256 Hz)</span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={300}
                      value={drivingFreq}
                      onChange={(e) => handleDrivingFreqChange(Number(e.target.value))}
                      aria-label="Adjust external driving frequency"
                      className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <p className="text-xs text-slate-400">Vibration Mode</p>
                      <p className="text-sm font-bold text-white">{isDamped ? 'Damped Decay' : 'Undamped Free'}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsDamped(!isDamped)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        isDamped ? 'bg-rose-900/60 text-rose-300 border border-rose-600' : 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                      }`}
                    >
                      Toggle Damping
                    </motion.button>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Oscillation Amplitude Response:</span>
                    <span className="ml-2 font-mono font-bold text-amber-400 text-lg">{resonanceAmplitude}%</span>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      Math.abs(drivingFreq - 256) <= 2
                        ? 'bg-emerald-500 text-slate-950 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {Math.abs(drivingFreq - 256) <= 2 ? '⚡ RESONANCE MATCH (f = f₀)' : 'Off-Resonance'}
                  </span>
                </div>
              </div>
            )}

            {/* Step 4: Quality & Waveform Timbre */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <canvas ref={canvasRef} width={600} height={150} className="w-full h-36 bg-slate-950 rounded-xl border border-slate-800" />

                <div>
                  <p className="text-xs text-slate-400 mb-2">Toggle Harmonic Overtones (Mix shapes Instrument Timbre):</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { h: 1, label: 'Fundamental (440 Hz)' },
                      { h: 2, label: '1st Overtone (880 Hz)' },
                      { h: 3, label: '2nd Overtone (1320 Hz)' },
                      { h: 4, label: '3rd Overtone (1760 Hz)' },
                    ].map((item) => (
                      <motion.button
                        key={item.h}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleToggleHarmonic(item.h)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          harmonicsState[item.h] > 0
                            ? 'bg-sky-950/80 border-sky-500 text-sky-200'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        <p>{item.label}</p>
                        <p className="text-xs font-mono mt-1 opacity-75">
                          {harmonicsState[item.h] > 0 ? `Amp: ${(harmonicsState[item.h] * 100).toFixed(0)}%` : 'OFF'}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: DC Circuit: Emf, Internal Resistance & Power */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Circuit Controls */}
                  <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Load Resistance (R):</span>
                        <span className="text-emerald-400 font-mono font-bold">{loadResistance} Ω</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        step={0.5}
                        value={loadResistance}
                        onChange={(e) => handleCircuitSliderChange(Number(e.target.value), internalResistance, batteryEmf)}
                        aria-label="Set load resistance"
                        className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Internal Resistance (r):</span>
                        <span className="text-rose-400 font-mono font-bold">{internalResistance} Ω</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={5}
                        step={0.2}
                        value={internalResistance}
                        onChange={(e) => handleCircuitSliderChange(loadResistance, Number(e.target.value), batteryEmf)}
                        aria-label="Set internal resistance"
                        className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Battery Emf (ε):</span>
                        <span className="text-cyan-400 font-mono font-bold">{batteryEmf} V</span>
                      </div>
                      <input
                        type="range"
                        min={6}
                        max={24}
                        value={batteryEmf}
                        onChange={(e) => handleCircuitSliderChange(loadResistance, internalResistance, Number(e.target.value))}
                        aria-label="Set battery emf"
                        className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Circuit Meter Readouts */}
                  <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Current (I = ε / [R+r])</p>
                      <p className="text-xl font-mono font-bold text-cyan-400">{circuitCurrent.toFixed(2)} A</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Terminal PD (V = ε - Ir)</p>
                      <p className="text-xl font-mono font-bold text-amber-400">{terminalPD.toFixed(2)} V</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Useful Load Power (P = VI)</p>
                      <p className="text-xl font-mono font-bold text-emerald-400">{powerDelivered.toFixed(2)} W</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Internal Lost Power (I²r)</p>
                      <p className="text-xl font-mono font-bold text-rose-400">{powerLostInternal.toFixed(2)} W</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🔬 Free Experimentation Sandbox</span>
              <h2 className="text-xl font-extrabold text-white">Interactive Physics Playground</h2>
              <p className="text-xs text-slate-400">Zero pressure, zero grading. Toggle topics below to explore all parameters freely.</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30"
            >
              Start Challenges Now 🎯 →
            </motion.button>
          </div>

          {/* Sandbox Topic Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            {[
              { id: 'light', label: '☀️ Light Scattering' },
              { id: 'echo', label: '🔊 Echo & SONAR' },
              { id: 'waves', label: '〰️ Waves & Resonance' },
              { id: 'circuits', label: '⚡ DC Circuits & Power' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTopicExploration(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTopicExploration === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Sandbox Visualizer Body */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {selectedTopicExploration === 'light' && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Sun Horizon Angle:</span>
                  <span className="text-amber-400 font-mono font-bold">{sunAngle}°</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={90}
                  value={sunAngle}
                  onChange={(e) => handleSunAngleChange(Number(e.target.value))}
                  aria-label="Sandbox sun horizon angle"
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">Path Length Ratio</p>
                    <p className="text-lg font-mono font-bold text-cyan-400">{atmosphericThickness.toFixed(2)}×</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">Sky Dominant Color</p>
                    <p className="text-lg font-bold text-sky-400">Scattered Blue (~400 nm)</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">Direct Beam</p>
                    <p className="text-lg font-bold" style={{ color: directLightColor }}>
                      {sunAngle < 20 ? 'Crimson Red (~700 nm)' : 'Yellowish-White'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTopicExploration === 'echo' && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Reflector Barrier Distance:</span>
                  <span className="text-cyan-400 font-mono font-bold">{cliffDistance} m</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={150}
                  value={cliffDistance}
                  onChange={(e) => handleCliffDistanceChange(Number(e.target.value))}
                  aria-label="Sandbox reflector barrier distance"
                  className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-400">Echo Delay t = 2d / v (at v = 340 m/s)</p>
                    <p className="text-xl font-mono font-bold text-amber-400">{echoDelaySec} s</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTriggerEchoPulse}
                    disabled={echoPulseActive}
                    className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                  >
                    Emit Sound Pulse
                  </motion.button>
                </div>
              </div>
            )}

            {selectedTopicExploration === 'waves' && (
              <div className="space-y-4">
                <canvas ref={canvasRef} width={600} height={140} className="w-full h-36 bg-slate-950 rounded-xl border border-slate-800" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400">Driving Frequency: {drivingFreq} Hz</label>
                    <input
                      type="range"
                      min={200}
                      max={300}
                      value={drivingFreq}
                      onChange={(e) => handleDrivingFreqChange(Number(e.target.value))}
                      aria-label="Sandbox driving frequency"
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsDamped(!isDamped)}
                      className="px-4 py-2 bg-slate-800 text-xs font-bold rounded-xl border border-slate-700"
                    >
                      Damping: {isDamped ? 'ON' : 'OFF'}
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {selectedTopicExploration === 'circuits' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setResistorMode('series')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                      resistorMode === 'series' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Series (Rs = R₁ + R₂)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setResistorMode('parallel')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                      resistorMode === 'parallel' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Parallel (1/Rp = 1/R₁ + 1/R₂)
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400">R₁ Resistance: {r1Val} Ω</label>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={r1Val}
                      onChange={(e) => setR1Val(Number(e.target.value))}
                      aria-label="Set R1 resistance"
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">R₂ Resistance: {r2Val} Ω</label>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={r2Val}
                      onChange={(e) => setR2Val(Number(e.target.value))}
                      aria-label="Set R2 resistance"
                      className="w-full accent-indigo-500"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Equivalent Combined Resistance:</span>
                  <span className="text-lg font-mono font-bold text-emerald-400">{eqResistance.toFixed(2)} Ω</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE (Adaptive 22 Challenges) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          {/* Challenge Header & Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    NEP Level: {challenge.competencyLevel.toUpperCase()}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">
                    Node: {challenge.nodeId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={showNextHint}
                  disabled={answerRevealed || hintCount >= 3}
                  className="px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40"
                >
                  <span>💡</span>
                  <span>Hint ({hintCount}/3)</span>
                </motion.button>
              </div>
            </div>

            {/* Framer-Motion Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900/90 border-slate-800 text-slate-100'
            }`}
          >
            <p className="text-base sm:text-lg font-bold leading-relaxed mb-6">{challenge.question}</p>

            {/* MCQ TYPE (classify, distinguish, match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(idx)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                      className={`text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                        showExplanation
                          ? idx === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-slate-900/40 border-slate-800 text-slate-500'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Available Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white text-xs font-semibold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col justify-center min-h-[70px] ${
                        droppedLabels[targetId]
                          ? 'bg-indigo-950/40 border-indigo-500 text-indigo-200'
                          : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs text-slate-500 capitalize">{targetId.replace('target_', '')} Target Zone:</span>
                      <span className="text-sm font-bold mt-1">{droppedLabels[targetId] || 'Drop matching label here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
                >
                  Verify Drag Mapping
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder sequence (Top is first step):</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => handleDragStart(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-sm flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold">
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
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
                >
                  Verify Sorted Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC INPUT TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric value..."
                    aria-label="Enter numeric answer"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 focus:outline-none w-56"
                  />
                  <span className="text-slate-300 font-mono font-bold text-base">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md disabled:opacity-40"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-3 py-1 rounded bg-indigo-950 border border-indigo-700 text-indigo-200 text-xs font-mono flex items-center gap-1.5">
                      {p}
                      <button onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-rose-300">
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click components above to assemble chain...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
                >
                  Verify Derivation Chain
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* STEP-BY-STEP EXPLANATION CARD (CLICK-TO-REVEAL) */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/70 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <span>📖</span>
                <span>ICSE Step-by-Step Physics Walkthrough</span>
              </div>

              {challenge.explanation
                .split('. ')
                .filter((s) => s.trim().length > 0)
                .slice(0, revealedSteps + 1)
                .map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-slate-200 text-sm leading-relaxed"
                  >
                    <span className="font-bold text-indigo-400 mr-2">{idx + 1}.</span>
                    {sentence}
                    {!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

              {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRevealedSteps((s) => s + 1)}
                  className="px-4 py-2 rounded-lg bg-indigo-800/60 hover:bg-indigo-700 border border-indigo-600 text-xs font-bold text-indigo-200"
                >
                  Show Next Step →
                </motion.button>
              )}

              {revealedSteps >= challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Mission 🏁' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: MISSION COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-3xl border border-indigo-700 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-extrabold text-white">Himalayan Station Mission Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              You have successfully investigated and resolved all atmospheric, acoustic, harmonic, and electrical challenges across the station.
            </p>

            <div className="flex justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-3xl font-extrabold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Mastery Level</p>
                <p className="text-3xl font-extrabold text-indigo-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-indigo-400 mb-2">Performance Assessment</h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! 🌟 Flawless Mastery! You demonstrated exceptional command across light scattering, wave acoustics, resonance, and DC Ohm’s law.'
                : errors <= 3
                ? 'Great work! 👏 Strong Proficient Understanding! Minor calculation points encountered. Review the summary notes below to lock in a 100% board score.'
                : errors <= 7
                ? 'Good effort! 📈 Solid progress! Continue reviewing the foundational formulas (d = vt/2, P = VI = I²R, emf = V + Ir) to reinforce your mastery.'
                : 'Do not give up — You WILL get this! 💪 Keep practicing and reviewing the step-by-step explanations to master every concept!'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-rose-300 font-bold text-sm">Targeted Misconception Feedback:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Trap: {m.misconception}</p>
                    <p className="text-emerald-400 font-medium">✓ ICSE Key Rule: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-amber-400">Spaced Review Schedule (SM-2)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Based on your performance, review this topic in{' '}
                <span className="text-amber-300 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span> to lock in long-term memory.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Activity Completion Arc */}
          <div className="p-6 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-3">
            <h3 className="text-indigo-300 font-bold text-base">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODAL COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_PhysicsScatteringLightSim;