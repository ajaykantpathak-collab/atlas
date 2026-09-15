'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_PHY_091 = 'c12_phy_091'; // Single slit diffraction
const NODE_C12_PHY_092 = 'c12_phy_092'; // Photoelectric effect (observations)
const NODE_C12_PHY_093 = 'c12_phy_093'; // Einstein's photoelectric equation
const NODE_C12_PHY_094 = 'c12_phy_094'; // Photon and photon momentum (p = h/lambda)
const NODE_C12_PHY_095 = 'c12_phy_095'; // Particle nature of light (dual nature)
const NODE_C12_PHY_096 = 'c12_phy_096'; // de Broglie hypothesis and matter waves
const NODE_C12_PHY_097 = 'c12_phy_097'; // Davisson-Germer experiment
const NODE_C12_PHY_098 = 'c12_phy_098'; // Alpha-particle scattering experiment
const NODE_C12_PHY_099 = 'c12_phy_099'; // Rutherford's nuclear model
const NODE_C12_PHY_100 = 'c12_phy_100'; // Bohr's postulates and atomic model

const ALL_NODE_IDS = [
  NODE_C12_PHY_091,
  NODE_C12_PHY_092,
  NODE_C12_PHY_093,
  NODE_C12_PHY_094,
  NODE_C12_PHY_095,
  NODE_C12_PHY_096,
  NODE_C12_PHY_097,
  NODE_C12_PHY_098,
  NODE_C12_PHY_099,
  NODE_C12_PHY_100,
];

// ─── PHYSICAL CONSTANTS ───
const H_PLANCK = 6.626e-34; // J*s
const C_LIGHT = 3.0e8; // m/s
const Q_E = 1.602e-19; // C
const M_ELECTRON = 9.109e-31; // kg
const M_PROTON = 1.673e-27; // kg
const K_COULOMB = 8.988e9; // N*m^2/C^2

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Quantum-Wave Metamorphic Lab',
  intro: 'You are the Lead Quantum Optical Physicist at the National Synchrotron Facility in Bengaluru. A series of deep anomalies have emerged across multiple detector arrays: light is bending past micro-apertures while behaving like corpuscular bullets against alkali photocathodes, electrons are forming X-ray-like diffraction patterns, and radioactive alpha tracks are bouncing straight backwards from gold targets.',
  context: 'To calibrate the synchrotron, you must master the complete continuum: from wave optics and single slit diffraction to photon momentum, de Broglie matter waves, nuclear scattering, and Bohr energy transitions.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In single-slit diffraction, if you make the slit significantly narrower (smaller width "a"), what happens to the central bright fringe on the screen?',
  options: [
    'It becomes narrower and sharper because less light passes through.',
    'It spreads out and becomes wider because theta ~ lambda / a.',
    'It stays exactly the same width but turns dimmer.',
    'It splits into two identical half-intensity central peaks.',
  ],
  correctIndex: 1,
  hintAfter: 'Wave diffraction increases when the aperture size is comparable to or smaller than the wavelength! Let us test this live.',
};

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    id: 'pred_diff_width',
    question: 'Predict: If you increase the wavelength of incident light from 400 nm (violet) to 700 nm (red) while keeping slit width constant, what will happen to the angular width of the central diffraction peak?',
    options: [
      'The central peak will become significantly wider.',
      'The central peak will become narrower and sharper.',
      'The central peak will disappear completely.',
      'The width will stay exactly unchanged.',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 1, drag the Wavelength (λ) slider from 400 nm up to 700 nm and observe the fringe spreading.',
    explanation: 'Angular half-width is θ = λ / a. Longer wavelengths (red) experience greater angular bending and produce a wider central maximum.',
  },
  {
    id: 'pred_photoelectric_retard',
    question: 'Predict: In a photoelectric cell with monochromatic light above threshold, what happens to the stopping potential (V_s) if you double the light intensity?',
    options: [
      'Stopping potential doubles because more light carries more total energy.',
      'Stopping potential remains strictly identical because photon energy hν did not change.',
      'Stopping potential drops to zero.',
      'Stopping potential becomes negative.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, double the Light Intensity slider and observe that maximum kinetic energy (and retarding cutoff) stays unchanged.',
    explanation: 'Stopping potential depends exclusively on individual photon energy (E = hν) and cathode work function (Φ). Intensity only alters the count rate of emitted photoelectrons.',
  },
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_diff_profile',
    question: 'Observation: Look closely at the diffraction intensity curve on the screen. What do you notice about the secondary maxima compared to the central maximum?',
    observableOptions: [
      'Secondary peaks are drastically dimmer than the central peak (first secondary is only ~4.5% of central peak intensity).',
      'All diffraction peaks have identical brightness across the whole screen.',
      'Secondary peaks are completely black with zero illumination.',
      'The intensity alternates between pure white and pure green across the canvas.',
    ],
    correctIndex: 0,
    explanation: 'In Fraunhofer single-slit diffraction, the sinc² function causes secondary maxima to drop off rapidly: I₁ ≈ 0.047 I₀, I₂ ≈ 0.016 I₀.',
  },
  {
    id: 'obs_rutherford_trajectories',
    question: 'Observation: Watch the alpha particles fired past the gold nucleus at different impact parameters (b). What do you observe about the trajectories?',
    observableOptions: [
      'Only particles with very small impact parameter (nearly head-on) experience large-angle backward deflection.',
      'All alpha particles curve uniformly by 90 degrees regardless of distance.',
      'The gold nucleus pulls alpha particles inwards via attractive gravitational force.',
      'Alpha particles lose charge and turn into neutral neutrons upon passing.',
    ],
    correctIndex: 0,
    explanation: 'Due to the 1/r² repulsive Coulomb field, scattering angle θ is inversely related to impact parameter b: cot(θ/2) ∝ b. Only extremely close encounters produce large deflections.',
  },
];

// ─── REAL WORLD ACTIVITY (CAPSTONE TAKEAWAY) ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Chandrayaan X-ray Spectrometer & Synchrotron Beamline Calibration',
  description: 'Apply wave-particle duality principles to calibrate an aerospace payload at the Raja Ramanna Centre for Advanced Technology (RRCAT) in Indore or ISRO URSC Bangalore.',
  steps: [
    'Calculate the de Broglie wavelength of 10 keV synchrotron electrons to ensure atomic lattice diffraction resolution under 0.12 nm.',
    'Select a low work-function photocathode (Caesium-Antimonide) to maximize solar UV quantum efficiency on interplanetary probes.',
    'Calculate radiation pressure on solar sails using photon momentum transfer Δp = 2h/λ for high-reflectivity dielectric films.',
    'Model Rutherford backscattering spectrometry (RBS) to non-destructively measure thin-film metal coating thicknesses on satellite components.',
  ],
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

// ─── 21 CISCE CHALLENGES ARRAY (7 Foundation, 7 Standard, 7 Advanced) ───
const CHALLENGES: Challenge[] = [
  // ── Foundation (7) ──
  {
    id: 'ch_diff_01',
    nodeId: NODE_C12_PHY_091,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Fraunhofer single-slit diffraction with slit width "a" and wavelength lambda, what is the exact condition for the nth secondary MINIMUM (dark fringe)?',
    options: [
      'a * sin(theta) = n * lambda, where n = 1, 2, 3...',
      'a * sin(theta) = (n + 1/2) * lambda, where n = 0, 1, 2...',
      'a * sin(theta) = n * lambda, where n = 0, 1, 2...',
      '2a * sin(theta) = n * lambda, where n = 1, 2, 3...',
    ],
    correctIndex: 0,
    explanation: 'The secondary minima occur when the slit can be divided into 2n zones that cancel in pairs: a * sin(theta) = n * lambda with n = 1, 2, 3... Note that n = 0 corresponds to the central maximum, NOT a minimum.',
    hints: [
      'Divide the slit into pairs of cancelling wavelets with lambda/2 phase difference.',
      'Remember that theta = 0 is where all secondary wavelets arrive in phase to form the central maximum.',
      'The dark fringe condition starts strictly at integer n = 1, 2, 3...',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_pe_obs_01',
    nodeId: NODE_C12_PHY_092,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When the intensity of incident light above the threshold frequency is doubled while keeping frequency constant, what happens to the photocurrent and the maximum kinetic energy (K_max)?',
    options: [
      'Photocurrent doubles; K_max remains completely unchanged.',
      'Photocurrent doubles; K_max also doubles.',
      'Photocurrent remains constant; K_max doubles.',
      'Both photocurrent and K_max are quadrupled.',
    ],
    correctIndex: 0,
    explanation: 'Intensity governs the number of incident photons per second (hence doubling emitted photoelectrons and photocurrent), whereas photon energy E = h*nu depends only on frequency, keeping K_max constant.',
    hints: [
      'Think about what intensity represents in the photon picture: the count rate of photons.',
      'Does each individual photon carry more energy when you increase brightness?',
      'Higher intensity = more photons = higher current, but same energy per photon = constant K_max.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_pe_obs_02',
    nodeId: NODE_C12_PHY_092,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which is the rigorous CISCE definition of "threshold frequency" (nu_0)?',
    options: [
      'The minimum frequency of incident radiation below which no photoelectric emission occurs from a given metal.',
      'The maximum frequency of radiation that can eject electrons from a cathode.',
      'The exact frequency at which photoelectrons reach the speed of light.',
      'The frequency at which the work function of a metal drops to zero.',
    ],
    correctIndex: 0,
    explanation: 'Threshold frequency is the MINIMUM frequency below which no photoemission occurs, regardless of incident intensity. Omitting "minimum" or writing "maximum" is a major examiner penalty.',
    hints: [
      'Look for the keyword "minimum" frequency.',
      'Remember that light below this frequency has photons with energy less than the work function Phi.',
      'The correct statement establishes a lower limit below which zero emission takes place.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mom_01',
    nodeId: NODE_C12_PHY_094,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Order the logical algebraic steps to derive a photon\'s momentum p = h / lambda from relativistic quantum principles:',
    sortItems: [
      'Start with Einstein quantum energy packet: E = h * f',
      'Equate with relativistic massless energy-momentum relation: E = p * c',
      'Equate expressions: p * c = h * f => p = (h * f) / c',
      'Substitute wave speed relation c = f * lambda => f / c = 1 / lambda to get p = h / lambda',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Combining E = hf with E = pc gives p = hf/c. Using c = f*lambda gives f/c = 1/lambda, yielding p = h/lambda.',
    hints: [
      'Begin by stating the two definitions of energy for a photon: E = hf and E = pc.',
      'Set them equal to solve for p in terms of f and c.',
      'Replace f/c with 1/lambda using c = f*lambda.',
    ],
  },
  {
    id: 'ch_dual_01',
    nodeId: NODE_C12_PHY_095,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each optical phenomenon to the physical nature of light it definitively proves:',
    dragItems: [
      { label: 'Single Slit Diffraction', targetId: 'wave_nature' },
      { label: 'Young Double Slit Interference', targetId: 'wave_nature' },
      { label: 'Photoelectric Effect', targetId: 'particle_nature' },
      { label: 'Transverse Polarisation', targetId: 'wave_nature' },
    ],
    correctMapping: {
      wave_nature: 'Single Slit Diffraction',
      particle_nature: 'Photoelectric Effect',
    },
    explanation: 'Interference, diffraction, and polarisation demonstrate continuous wave propagation and phase cancellation. The photoelectric effect and Compton scattering prove localized quantum particle collisions.',
    hints: [
      'Where do waves add and cancel out to produce dark fringes? Interference and Diffraction.',
      'Which phenomenon relies on one-on-one photon-electron energy delivery? Photoelectric effect.',
      'Polarisation requires transverse field oscillations (waves).',
    ],
  },
  {
    id: 'ch_ruth_01',
    nodeId: NODE_C12_PHY_098,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the Geiger-Marsden experimental observation to Rutherford\'s direct atomic inference in sequence:',
    sortItems: [
      'Observation: Over 99% of alpha particles pass straight through with zero deflection => Inference: The atom is mostly empty space.',
      'Observation: ~1 in 8000 alphas deflected by large angles (>90 deg) => Inference: Positive charge is concentrated in a tiny dense core.',
      'Observation: ~1 in 20000 alphas bounce almost straight backwards (180 deg) => Inference: Almost the entire mass of the atom resides in the nucleus.',
      'Synthesis: Proposed Nuclear Planetary Model replacing Thomson\'s plum pudding model.',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The undeflected particles prove emptiness, large deflections prove a concentrated positive charge, and rebounds prove the nucleus holds almost all atomic mass.',
    hints: [
      'Start with the dominant majority of particles that pass undeflected.',
      'Follow with the rare large-angle scattering.',
      'Conclude with the head-on rebounds and the resulting planetary nuclear model.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bohr_01',
    nodeId: NODE_C12_PHY_100,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'State Bohr\'s Second Postulate regarding the quantization of electron angular momentum (L):',
    options: [
      'L = m * v * r = n * h / (2 * pi), where n = 1, 2, 3...',
      'L = m * v * r = n * h / pi, where n = 1, 2, 3...',
      'L = m * v^2 / r = n * h / (2 * pi)',
      'L = m * v * r = (n + 1/2) * h / (2 * pi)',
    ],
    correctIndex: 0,
    explanation: 'Bohr postulated that electrons can only occupy discrete stationary orbits where their orbital angular momentum is an integral multiple of h / (2*pi), i.e., m*v*r = n*h/(2*pi).',
    hints: [
      'Look for the integer principal quantum number n multiplied by h / (2*pi).',
      'Angular momentum L for circular orbit is m * v * r.',
      'm * v * r = n * h / (2 * pi) with n = 1, 2, 3...',
    ],
    misconceptionIndex: 2,
  },

  // ── Standard (7) ──
  {
    id: 'ch_diff_02',
    nodeId: NODE_C12_PHY_091,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A red laser (lambda = 600 nm) illuminates a slit of width a = 0.2 mm. Screen distance D = 2.0 m. What is the linear width of the central maximum in mm? (Linear width = 2*D*lambda / a)',
    correctAnswer: 12.0,
    tolerance: 0.5,
    unit: 'mm',
    explanation: 'Linear width W = 2 * D * lambda / a = 2 * 2.0 * (600e-9) / (0.2e-3) = 2.4e-6 / 2e-4 = 0.012 m = 12.0 mm.',
    hints: [
      'Convert all units to standard SI: lambda = 600e-9 m, a = 0.2e-3 m, D = 2.0 m.',
      'Formula: Width = 2 * D * lambda / a.',
      'Multiply (2 * 2.0 * 600e-9 / 0.0002) and convert metres to millimetres (multiply by 1000). Result is 12 mm.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_ein_01',
    nodeId: NODE_C12_PHY_093,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Photons of energy 4.50 eV strike a metal surface having a work function Phi = 2.30 eV. What is the stopping potential V_s required to reduce the photocurrent to zero?',
    correctAnswer: 2.2,
    tolerance: 0.1,
    unit: 'V',
    explanation: 'According to Einstein: K_max = h*nu - Phi = 4.50 eV - 2.30 eV = 2.20 eV. Since e*V_s = K_max, V_s = 2.20 V.',
    hints: [
      'Recall K_max = Photon Energy - Work Function.',
      'K_max = 4.50 eV - 2.30 eV = 2.20 eV.',
      'Since 1 eV of kinetic energy is stopped by 1 Volt, V_s = 2.2 V.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_ein_02',
    nodeId: NODE_C12_PHY_093,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a plot of Stopping Potential (V_s on y-axis) versus Frequency (nu on x-axis), what does the slope of the straight line represent?',
    options: [
      'h / e (Planck constant divided by electron charge)',
      'Planck constant h directly',
      'Work function Phi / e',
      'The threshold frequency nu_0',
    ],
    correctIndex: 0,
    explanation: 'From e*V_s = h*nu - Phi, dividing by e gives V_s = (h/e)*nu - (Phi/e). The linear slope is h/e. Multiplying the slope by e yields Planck\'s constant h.',
    hints: [
      'Write the equation in y = m*x + c form with V_s on the y-axis.',
      'e * V_s = h * nu - Phi => V_s = (h/e) * nu - (Phi/e).',
      'The coefficient of nu is h/e, not h.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mom_02',
    nodeId: NODE_C12_PHY_094,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A spacecraft solar sail is designed to propel an ISRO deep-space probe. Why is a highly reflective mirror coating chosen rather than a matte black absorber?',
    options: [
      'Reflection reverses photon momentum from +p to -p, transferring delta p = 2p per photon (twice the force of absorption).',
      'Reflection absorbs all photon mass to increase spacecraft momentum.',
      'Black absorbers destroy photons without conservation of momentum.',
      'Reflectors convert light frequency into electric voltage directly.',
    ],
    correctIndex: 0,
    explanation: 'An absorbing surface gains momentum p when stopping a photon. A reflecting surface reverses the photon\'s momentum (delta p = p - (-p) = 2p), doubling the transferred force and radiation pressure.',
    hints: [
      'Calculate the change in momentum: Delta p = p_initial - p_final.',
      'For absorption: Delta p = p - 0 = p. For reflection: Delta p = p - (-p) = 2p.',
      'Twice the momentum transfer per photon creates double the propulsion force.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_deb_01',
    nodeId: NODE_C12_PHY_096,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electron is accelerated from rest through a potential difference V = 100 Volts. Calculate its de Broglie wavelength in Angstroms (1 A = 0.1 nm = 1e-10 m). (Use lambda = 12.27 / sqrt(V) A)',
    correctAnswer: 1.23,
    tolerance: 0.05,
    unit: 'Angstrom',
    explanation: 'lambda = h / sqrt(2*m*e*V) = 1.227 nm / sqrt(V) in Angstroms = 12.27 / sqrt(100) = 12.27 / 10 = 1.227 A ~= 1.23 A.',
    hints: [
      'Use the handy Class 12 formula: lambda = 12.27 / sqrt(V) in Angstroms.',
      'Square root of 100 V is 10.',
      '12.27 / 10 = 1.227 A, which is ~1.23 A (comparable to atomic lattice spacing).',
    ],
  },
  {
    id: 'ch_bohr_02',
    nodeId: NODE_C12_PHY_100,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For a Hydrogen atom (Z = 1), using Bohr\'s energy formula E_n = -13.6 / n^2 eV, calculate the total energy of the electron in the second excited state (n = 3) in eV:',
    correctAnswer: -1.51,
    tolerance: 0.05,
    unit: 'eV',
    explanation: 'The ground state is n = 1 (-13.6 eV). First excited state is n = 2 (-3.40 eV). Second excited state is n = 3: E_3 = -13.6 / 3^2 = -13.6 / 9 = -1.511 eV.',
    hints: [
      'Careful with terminology: "Second excited state" means n = 3 (ground state is n = 1).',
      'Divide -13.6 by n^2 = 3^2 = 9.',
      '-13.6 / 9 = -1.51 eV.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_dg_01',
    nodeId: NODE_C12_PHY_097,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the historic Davisson-Germer experiment on a Nickel crystal target, what specific accelerating voltage and scattering angle produced the sharp intensity peak that proved electron wave diffraction?',
    options: [
      '54 Volts accelerating potential at a scattering angle of 50 degrees.',
      '100 Volts accelerating potential at a scattering angle of 90 degrees.',
      '220 Volts accelerating potential at a scattering angle of 30 degrees.',
      '12 Volts accelerating potential at a scattering angle of 180 degrees.',
    ],
    correctIndex: 0,
    explanation: 'Davisson and Germer observed a pronounced constructive interference maximum at V = 54 V and θ = 50°, yielding a de Broglie wavelength of 0.165 nm matching Bragg\'s X-ray crystal law (2d sin θ = λ).',
    hints: [
      'Recall the classic NCERT/CISCE experimental parameters for nickel crystal electron diffraction.',
      'The voltage is between 50 V and 60 V (specifically 54 V).',
      'The angle is exactly 50 degrees.',
    ],
  },

  // ── Advanced (7) ──
  {
    id: 'ch_diff_adv_01',
    nodeId: NODE_C12_PHY_091,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At the Raja Ramanna Centre for Advanced Technology (RRCAT) in Indore, an optical physicist immerses a single-slit apparatus (slit width a = 0.15 mm) completely in water (refractive index n = 4/3). What happens to the linear width of the central diffraction maximum on the immersed screen?',
    options: [
      'It decreases by a factor of 4/3 because wavelength in water is lambda_water = lambda_air / n.',
      'It increases by a factor of 4/3 because speed of light drops in water.',
      'It remains completely unchanged because slit geometry a is physical and constant.',
      'It vanishes completely because water absorbs all diffraction wavelets.',
    ],
    correctIndex: 0,
    explanation: 'In a medium of refractive index n, the wavelength decreases: λ\' = λ/n. Since central fringe width W = 2Dλ/a, the width decreases proportionally by 1/n (i.e. multiplied by 3/4).',
    hints: [
      'What happens to light wavelength inside a dielectric medium with index n?',
      'λ_water = λ_air / n = 3/4 * λ_air.',
      'Since W is directly proportional to λ, W_water = W_air / n.',
    ],
  },
  {
    id: 'ch_pe_adv_eval',
    nodeId: NODE_C12_PHY_093,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate this scenario: An engineer at BEL Bangalore proposes using a high-intensity 1000-Watt red laser (λ = 680 nm, photon energy ~1.82 eV) to operate a photocell coated with Zinc (Work Function Φ = 4.30 eV). Will the photocell generate any measurable electric current?',
    options: [
      'No photocurrent will ever flow, no matter how high the laser wattage, because each individual photon energy (1.82 eV) is strictly below the work function (4.30 eV).',
      'Yes, the massive intensity supplies enough cumulative wave energy per second to exceed 4.30 eV.',
      'Yes, because red light has higher radiation pressure than UV light.',
      'Yes, but only after a 10-minute thermal heating delay.',
    ],
    correctIndex: 0,
    explanation: 'Photoelectric emission is an instantaneous quantum 1-to-1 interaction. If hν < Φ, zero electrons are ejected regardless of intensity. Classical wave accumulation theory fails here completely.',
    hints: [
      'Compare individual photon energy (1.82 eV) with threshold work function (4.30 eV).',
      'Can multiple low-energy visible photons accumulate classically to eject an electron in standard photocells?',
      'hν < Φ means strictly zero emission regardless of beam power.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_deb_adv_ratio',
    nodeId: NODE_C12_PHY_096,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A proton and an alpha particle (m_alpha = 4*m_proton, q_alpha = 2*e) are accelerated from rest through the identical potential difference V. What is the ratio of their de Broglie wavelengths (lambda_proton / lambda_alpha)?',
    options: [
      '2 * sqrt(2) : 1 (or sqrt(8) : 1)',
      '1 : 2 * sqrt(2)',
      '4 : 1',
      '2 : 1',
    ],
    correctIndex: 0,
    explanation: 'λ = h / √(2mqV). Thus λ_p / λ_α = √(m_α q_α / m_p q_p) = √(4m_p * 2e / (m_p * e)) = √8 = 2√2.',
    hints: [
      'Recall de Broglie formula in terms of accelerating voltage: λ = h / √(2mqV).',
      'Form ratio: λ_p / λ_α = √( (m_α * q_α) / (m_p * q_p) ).',
      'Substitute m_α = 4 m_p and q_α = 2 q_p to get √(4 * 2) = √8 = 2√2.',
    ],
  },
  {
    id: 'ch_ruther_adv_closest',
    nodeId: NODE_C12_PHY_098,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a nuclear physics lab at TIFR Mumbai, if the kinetic energy of incident alpha particles in a Rutherford scattering experiment is quadrupled (increased from E to 4E), how does the distance of closest approach (r_0) to the target nucleus change?',
    options: [
      'r_0 is reduced to 1/4th of its original value (r_0 ∝ 1/K).',
      'r_0 doubles (r_0 ∝ √K).',
      'r_0 quadruples (r_0 ∝ K).',
      'r_0 remains constant because nuclear radius is fixed.',
    ],
    correctIndex: 0,
    explanation: 'At closest approach, kinetic energy K converts entirely into electrostatic potential energy: K = (1 / 4πε₀) * (2Ze² / r_0). Therefore, r_0 = (2Ze² / 4πε₀) * (1/K). Increasing K by 4 reduces r_0 to r_0 / 4.',
    hints: [
      'Equate initial kinetic energy K to electrostatic potential energy at turnaround distance r_0.',
      'K = (k * 2 * Z * e^2) / r_0 => r_0 is inversely proportional to K.',
      'If K multiplies by 4, r_0 divides by 4.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bohr_adv_rydberg',
    nodeId: NODE_C12_PHY_100,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Calculate the wavelength (in nm) of the first line of the Balmer series (H-alpha line, transition n = 3 to n = 2) in Hydrogen spectrum. (Rydberg constant R = 1.097e7 m^-1, 1/lambda = R*(1/4 - 1/9) = 5R/36). Enter answer in nm to nearest integer:',
    correctAnswer: 656.0,
    tolerance: 5.0,
    unit: 'nm',
    explanation: '1/λ = R * (1/2² - 1/3²) = R * (1/4 - 1/9) = 5R / 36. λ = 36 / (5 * 1.097e7) = 36 / 5.485e7 = 6.563e-7 m = 656.3 nm.',
    hints: [
      'Balmer series ends on lower level n_1 = 2. First line comes from upper level n_2 = 3.',
      '1/λ = R * (1/4 - 1/9) = (5/36) * R.',
      'λ = 36 / (5 * 1.097e7) ≈ 656 nm (the iconic crimson red hydrogen emission line).',
    ],
  },
  {
    id: 'ch_design_creativity',
    nodeId: NODE_C12_PHY_094,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Creative Synthesis: To design an ultra-sensitive photon-pressure thrust meter for ISRO\'s deep-space satellite, which configuration provides maximum possible thrust force per Watt of incident laser beam power?',
    options: [
      'Perpendicular reflection from an ideal 100% reflective dielectrically coated mirror (F = 2P/c).',
      'Perpendicular absorption by an ideal black carbon nanotube absorber (F = P/c).',
      'Grazing incidence reflection at 85 degrees to the sail surface.',
      'Transmitting the laser directly through high-refractive index quartz glass without reflection.',
    ],
    correctIndex: 0,
    explanation: 'For total absorption, Force = P/c. For normal reflection, photon momentum changes from +p to -p, yielding twice the impulse and Force = 2P/c, maximizing photon-propulsion efficiency.',
    hints: [
      'Recall change of momentum Δp: reflection produces double the impulse of absorption.',
      'Force is rate of change of momentum: F = Δp / Δt = 2P/c for normal reflection.',
      'Dielectric reflection maximizes transferred thrust.',
    ],
  },
  {
    id: 'ch_bohr_adv_radius_eval',
    nodeId: NODE_C12_PHY_100,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate Bohr\'s orbital radius relationship: For a singly ionized Helium ion (He+, Z = 2), what is the orbital radius of the electron in the first excited state (n = 2) relative to the Bohr radius of ground-state Hydrogen (r_0 = 0.529 A)?',
    options: [
      '2 * r_0 (because r_n = r_0 * n^2 / Z = r_0 * 4 / 2 = 2 * r_0)',
      '4 * r_0',
      'r_0 / 2',
      'r_0 directly',
    ],
    correctIndex: 0,
    explanation: 'Bohr radius formula for hydrogen-like ions: r(n, Z) = r_0 * (n² / Z). For He+ (Z = 2) in first excited state (n = 2): r = r_0 * (2² / 2) = r_0 * (4 / 2) = 2 * r_0.',
    hints: [
      'Use the scaling formula: r_n = r_0 * n² / Z.',
      'For He+, atomic number Z = 2.',
      'For the first excited state, principal quantum number n = 2. Thus n²/Z = 4/2 = 2.',
    ],
  },
];

// ─── SVG DIAGRAM 1: SINGLE SLIT DIFFRACTION GEOMETRY ───
function SingleSlitWavefrontSVG({ slitWidth, wavelength }: { slitWidth: number; wavelength: number }) {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-44 bg-slate-950 rounded-xl border border-slate-800" aria-label="Fraunhofer Single Slit Diffraction Geometric Ray and Wavefront Diagram">
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
        </marker>
      </defs>
      {/* Incident plane waves */}
      {[20, 40, 60].map((x, i) => (
        <line key={i} x1={x} y1="30" x2={x} y2="150" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
      ))}
      <text x="35" y="22" fill="#818cf8" fontSize="10" fontWeight="bold">Plane Waves (λ)</text>

      {/* Slit Barrier */}
      <line x1="90" y1="10" x2="90" y2="65" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      <line x1="90" y1="115" x2="90" y2="170" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      <text x="96" y="94" fill="#38bdf8" fontSize="11" fontWeight="bold">Slit (a)</text>

      {/* Ray paths from top and bottom edge */}
      <line x1="90" y1="65" x2="320" y2="40" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <line x1="90" y1="115" x2="320" y2="40" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

      {/* Perpendicular path difference line */}
      <line x1="90" y1="65" x2="110" y2="110" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
      <text x="114" y="125" fill="#f43f5e" fontSize="10" fontWeight="bold">Δx = a·sinθ = λ</text>

      {/* Screen */}
      <line x1="320" y1="15" x2="320" y2="165" stroke="#cbd5e1" strokeWidth="3" />
      <text x="325" y="42" fill="#ef4444" fontSize="10">1st Min (n=1)</text>
      <text x="325" y="94" fill="#22c55e" fontSize="10" fontWeight="bold">Central Max</text>
      <text x="325" y="145" fill="#ef4444" fontSize="10">1st Min (n=-1)</text>

      {/* Diffraction Envelope Curve on Screen */}
      <path d="M 320 25 Q 350 40 320 60 Q 380 90 320 120 Q 350 140 320 155" fill="none" stroke="#facc15" strokeWidth="2" />
    </svg>
  );
}

// ─── SVG DIAGRAM 2: PHOTOELECTRIC ENERGY LEVEL INTERACTION ───
function PhotoelectricDiagramSVG({ workFuncEv, photonEv }: { workFuncEv: number; photonEv: number }) {
  const kMax = Math.max(0, photonEv - workFuncEv);
  return (
    <svg viewBox="0 0 400 180" className="w-full h-44 bg-slate-950 rounded-xl border border-slate-800" aria-label="Photoelectric Effect Energy Conservation Diagram">
      {/* Metal Fermi Sea & Surface */}
      <rect x="30" y="70" width="160" height="90" fill="#1e293b" stroke="#475569" rx="6" />
      <text x="45" y="95" fill="#94a3b8" fontSize="11" fontWeight="bold">Cathode Metal Surface</text>
      <text x="45" y="120" fill="#cbd5e1" fontSize="10">Work Function Φ = {workFuncEv.toFixed(2)} eV</text>

      {/* Incident Photon */}
      <path d="M 40 20 Q 55 35 70 20 T 100 20 T 130 20" fill="none" stroke="#facc15" strokeWidth="2.5" />
      <polygon points="128 16, 138 20, 128 24" fill="#facc15" />
      <text x="40" y="15" fill="#facc15" fontSize="11" fontWeight="bold">Photon: E = hν ({photonEv.toFixed(2)} eV)</text>

      {/* Electron Ejection Arrow */}
      {photonEv >= workFuncEv ? (
        <g>
          <line x1="140" y1="70" x2="260" y2="40" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
          <circle cx="260" cy="40" r="6" fill="#38bdf8" />
          <text x="272" y="44" fill="#38bdf8" fontSize="11" fontWeight="bold">e⁻ (K_max = {kMax.toFixed(2)} eV)</text>
          <text x="210" y="110" fill="#22c55e" fontSize="10" fontWeight="bold">✓ Photoemission Occurs (hν ≥ Φ)</text>
        </g>
      ) : (
        <g>
          <text x="210" y="100" fill="#ef4444" fontSize="11" fontWeight="bold">✗ No Emission (hν &lt; Φ)</text>
          <text x="210" y="120" fill="#94a3b8" fontSize="9">Photon energy is below threshold</text>
        </g>
      )}

      {/* Einstein Equation Header */}
      <rect x="200" y="140" width="185" height="30" fill="#0f172a" stroke="#334155" rx="4" />
      <text x="210" y="160" fill="#38bdf8" fontSize="10" fontFamily="monospace">K_max = hν - Φ = e·V_s</text>
    </svg>
  );
}

// ─── SVG DIAGRAM 3: BOHR ATOM TRANSITIONS ───
function BohrAtomicLevelsSVG({ selectedN }: { selectedN: number }) {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-44 bg-slate-950 rounded-xl border border-slate-800" aria-label="Bohr Quantized Energy Orbit Transitions Diagram">
      {/* Nucleus */}
      <circle cx="80" cy="90" r="14" fill="#ef4444" />
      <text x="73" y="94" fill="#ffffff" fontSize="10" fontWeight="bold">+e</text>
      <text x="60" y="120" fill="#94a3b8" fontSize="9">Proton Core</text>

      {/* Orbits n=1,2,3,4 */}
      {[1, 2, 3, 4].map((n) => {
        const rad = 25 + n * 24;
        const isCurrent = selectedN === n;
        return (
          <g key={n}>
            <circle
              cx="80"
              cy="90"
              r={rad}
              fill="none"
              stroke={isCurrent ? '#38bdf8' : '#334155'}
              strokeWidth={isCurrent ? 2.5 : 1}
              strokeDasharray={isCurrent ? 'none' : '3 3'}
            />
            <text x={80 + rad - 12} y="85" fill={isCurrent ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="bold">
              n={n}
            </text>
          </g>
        );
      })}

      {/* Energy Level Ladder on Right */}
      <g transform="translate(230, 15)">
        <text x="0" y="12" fill="#cbd5e1" fontSize="10" fontWeight="bold">Bohr Energy Ladder (eV):</text>
        {[
          { n: 4, e: '-0.85 eV', y: 30 },
          { n: 3, e: '-1.51 eV', y: 55 },
          { n: 2, e: '-3.40 eV', y: 88 },
          { n: 1, e: '-13.60 eV (Ground)', y: 135 },
        ].map((lvl) => (
          <g key={lvl.n}>
            <line x1="0" y1={lvl.y} x2="140" y2={lvl.y} stroke={selectedN === lvl.n ? '#38bdf8' : '#475569'} strokeWidth={selectedN === lvl.n ? 2.5 : 1.5} />
            <text x="145" y={lvl.y + 4} fill={selectedN === lvl.n ? '#38bdf8' : '#94a3b8'} fontSize="9" fontFamily="monospace">
              {lvl.e}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

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
  nodeId: NODE_C12_PHY_091,
  title: 'Wave-Particle Duality, Quantum Optics & Atomic Structure',
  definition: 'Comprehensive mastery of Fraunhofer single-slit diffraction, the photoelectric effect, photon momentum, wave-particle duality, matter waves, alpha scattering, and Bohr atomic model.',
  eli5: 'Light is both ripples and bullets: it bends around tiny gaps like waves, yet knocks electrons off metal like ping-pong balls. Matter does the same: tiny electrons ripple like waves around atoms in locked, non-collapsing quantum orbits!',
  misconceptions: [
    {
      misconception: 'The central diffraction maximum corresponds to n = 1 in a*sin(theta) = n*lambda.',
      correction: 'n = 0 gives the central maximum (all wavelets in phase). The minima condition a*sin(theta) = n*lambda strictly starts at n = 1, 2, 3...',
    },
    {
      misconception: 'Higher light intensity ejects photoelectrons with higher kinetic energy.',
      correction: 'Intensity only increases the number of emitted electrons (photocurrent). The maximum kinetic energy depends strictly on light frequency.',
    },
    {
      misconception: 'The slope of the Stopping Potential (V_s) versus Frequency (nu) graph is Planck\'s constant h.',
      correction: 'The slope is h/e. You must multiply the slope by electronic charge e (1.6e-19 C) to obtain h.',
    },
    {
      misconception: 'Photons have zero momentum because their rest mass is zero.',
      correction: 'Photons travel at c and carry relativistic momentum p = E/c = h/lambda, creating radiation pressure.',
    },
    {
      misconception: 'Distance of closest approach r_0 equals the exact radius of the nucleus.',
      correction: 'r_0 is an upper bound on the nuclear radius (~4.5e-14 m for 5 MeV alpha on gold). The actual nucleus is ~10^-15 m.',
    },
  ],
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Fraunhofer Single-Slit Diffraction',
    instruction: 'Adjust the slit width (a) and wavelength (lambda) sliders. Observe how the sinc^2 intensity profile and central bright fringe width respond in real-time.',
    interactionType: 'slider-diffraction',
    nodeId: NODE_C12_PHY_091,
  },
  {
    title: 'Lab 2: Einstein Photoelectric Photocell',
    instruction: 'Select a target metal cathode and dial the light frequency past the threshold frequency. Watch photoelectrons get ejected and adjust retarding voltage to find the stopping potential.',
    interactionType: 'photoelectric-sim',
    nodeId: NODE_C12_PHY_093,
  },
  {
    title: 'Lab 3: Photon Momentum & Matter Waves',
    instruction: 'Compare the de Broglie wavelength of an electron, proton, and macroscopic cricket ball at different accelerating voltages.',
    interactionType: 'matter-wave-sim',
    nodeId: NODE_C12_PHY_096,
  },
  {
    title: 'Lab 4: Rutherford Alpha Scattering & Davisson-Germer',
    instruction: 'Fire alpha particles at a gold nucleus with varying impact parameters to observe hyperbolic trajectories and 180-degree Coulomb rebounds.',
    interactionType: 'alpha-scattering-sim',
    nodeId: NODE_C12_PHY_098,
  },
  {
    title: 'Lab 5: Bohr Hydrogen Quantum Transitions',
    instruction: 'Click on different quantum energy levels (n = 1 to 4) to trigger electron quantum jumps and observe the emitted spectral photons with exact wavelengths.',
    interactionType: 'bohr-atom-sim',
    nodeId: NODE_C12_PHY_100,
  },
];

// ─── MAIN COMPONENT ───
function C12_PhysicsSingleSlitDiffractionSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const [sandboxTab, setSandboxTab] = useState<'diffraction' | 'photoelectric' | 'matter' | 'scattering' | 'bohr'>('diffraction');

  // Brilliant-style Predict & Observe state
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [predictionAnswered, setPredictionAnswered] = useState<Record<number, number>>({});
  const [observationIndex, setObservationIndex] = useState(0);
  const [observationAnswered, setObservationAnswered] = useState<Record<number, number>>({});

  // Simulation Sliders & State Variables
  const [slitWidthMicrons, setSlitWidthMicrons] = useState<number>(100); // 10 to 400 microns
  const [wavelengthNm, setWavelengthNm] = useState<number>(600); // 400 to 750 nm
  const [screenDistanceM, setScreenDistanceM] = useState<number>(1.5); // 0.5 to 3.0 m

  const [selectedMetal, setSelectedMetal] = useState<'Cs' | 'Na' | 'Zn' | 'Pt'>('Cs');
  const [lightFrequencyPHz, setLightFrequencyPHz] = useState<number>(0.8); // 0.3 to 2.0 PHz
  const [lightIntensityPct, setLightIntensityPct] = useState<number>(60); // 0 to 100%
  const [retardingVoltage, setRetardingVoltage] = useState<number>(0.0); // 0 to 5 V

  const [acceleratingVoltageV, setAcceleratingVoltageV] = useState<number>(100);
  const [selectedParticle, setSelectedParticle] = useState<'electron' | 'proton' | 'cricket_ball'>('electron');

  const [alphaEnergyMeV, setAlphaEnergyMeV] = useState<number>(5.0);
  const [targetAtomicZ, setTargetAtomicZ] = useState<number>(79);
  const [impactParameterFm, setImpactParameterFm] = useState<number>(10);

  const [bohrLevelN, setBohrLevelN] = useState<number>(1);
  const [lastEmittedPhoton, setLastEmittedPhoton] = useState<{ energyEv: number; wavelengthNm: number; series: string } | null>(null);

  // Adaptive Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Non-MCQ Interactive State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual Feedback & Animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const diffractionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleSimCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const scatteringCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED PHYSICAL CALCULATIONS ───
  const slitWidthM = slitWidthMicrons * 1e-6;
  const lambdaM = wavelengthNm * 1e-9;
  const centralAngularHalfWidthRad = lambdaM / slitWidthM;
  const centralLinearWidthMm = ((2 * screenDistanceM * lambdaM) / slitWidthM) * 1000;

  const metalWorkFunctions: Record<'Cs' | 'Na' | 'Zn' | 'Pt', { phiEv: number; name: string }> = {
    Cs: { phiEv: 2.14, name: 'Caesium' },
    Na: { phiEv: 2.36, name: 'Sodium' },
    Zn: { phiEv: 4.30, name: 'Zinc' },
    Pt: { phiEv: 5.65, name: 'Platinum' },
  };
  const currentWorkFunction = metalWorkFunctions[selectedMetal].phiEv;
  const incidentPhotonEnergyEv = (H_PLANCK * (lightFrequencyPHz * 1e15)) / Q_E;
  const maxKineticEnergyEv = Math.max(0, incidentPhotonEnergyEv - currentWorkFunction);
  const stoppingPotentialCalculated = maxKineticEnergyEv;
  const isPhotoelectricEmitting = incidentPhotonEnergyEv >= currentWorkFunction && lightIntensityPct > 0;

  const calculatedDeBroglie = useMemo(() => {
    if (selectedParticle === 'electron') {
      const p = Math.sqrt(2 * M_ELECTRON * Q_E * acceleratingVoltageV);
      const lam = H_PLANCK / p;
      return { lambdaM: lam, lambdaAngstrom: lam * 1e10, mass: M_ELECTRON, name: 'Electron' };
    } else if (selectedParticle === 'proton') {
      const p = Math.sqrt(2 * M_PROTON * Q_E * acceleratingVoltageV);
      const lam = H_PLANCK / p;
      return { lambdaM: lam, lambdaAngstrom: lam * 1e10, mass: M_PROTON, name: 'Proton' };
    } else {
      const massKg = 0.15;
      const v = 30;
      const p = massKg * v;
      const lam = H_PLANCK / p;
      return { lambdaM: lam, lambdaAngstrom: lam * 1e10, mass: massKg, name: 'Cricket Ball (0.15 kg, 30 m/s)' };
    }
  }, [selectedParticle, acceleratingVoltageV]);

  const closestApproachFm = useMemo(() => {
    const energyJoules = alphaEnergyMeV * 1e6 * Q_E;
    const r0 = (K_COULOMB * 2 * targetAtomicZ * Q_E * Q_E) / energyJoules;
    return r0 * 1e15;
  }, [alphaEnergyMeV, targetAtomicZ]);

  const bohrRadiusA = bohrLevelN * bohrLevelN * 0.529;

  // Adaptive Challenges Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas 1: Single Slit Diffraction
  useEffect(() => {
    const canvas = diffractionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      const bandHeight = 45;
      const centerY = width / 2;

      let waveColor = '#38bdf8';
      if (wavelengthNm < 480) waveColor = '#818cf8';
      else if (wavelengthNm < 560) waveColor = '#34d399';
      else if (wavelengthNm < 620) waveColor = '#facc15';
      else waveColor = '#f87171';

      const scaleFactor = (slitWidthMicrons * 0.05) / (wavelengthNm * 0.002);

      for (let x = 0; x < width; x++) {
        const thetaNorm = (x - centerY) * 0.015 * scaleFactor;
        const beta = Math.PI * thetaNorm;
        let intensity = beta === 0 ? 1 : Math.pow(Math.sin(beta) / beta, 2);
        intensity = Math.min(1, Math.max(0, intensity));

        ctx.fillStyle = waveColor;
        ctx.globalAlpha = intensity;
        ctx.fillRect(x, 10, 1, bandHeight);
      }
      ctx.globalAlpha = 1.0;

      const graphBaseline = height - 25;
      const graphMaxHeight = height - bandHeight - 50;

      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      for (let x = 0; x < width; x++) {
        const thetaNorm = (x - centerY) * 0.015 * scaleFactor;
        const beta = Math.PI * thetaNorm;
        const intensity = beta === 0 ? 1 : Math.pow(Math.sin(beta) / beta, 2);
        const y = graphBaseline - intensity * graphMaxHeight;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Central Maximum (n = 0)', centerY - 65, graphBaseline - graphMaxHeight - 5);
      ctx.fillText('-λ/a', centerY - 60 / scaleFactor - 18, graphBaseline + 16);
      ctx.fillText('+λ/a', centerY + 60 / scaleFactor - 18, graphBaseline + 16);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [slitWidthMicrons, wavelengthNm, screenDistanceM]);

  // Canvas 2: Photoelectric Particle Simulation
  useEffect(() => {
    const canvas = particleSimCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Photoelectron {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }

    let particles: Photoelectron[] = [];
    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#334155';
      ctx.fillRect(15, 20, 18, height - 40);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(width - 33, 20, 18, height - 40);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px monospace';
      ctx.fillText(`Cathode (${selectedMetal})`, 10, 15);
      ctx.fillText('Collector Anode', width - 110, 15);

      if (retardingVoltage > 0) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.setLineDash([6, 6]);
        for (let y = 40; y < height - 30; y += 25) {
          ctx.beginPath();
          ctx.moveTo(width - 40, y);
          ctx.lineTo(40, y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      if (isPhotoelectricEmitting && particles.length < lightIntensityPct * 0.8) {
        if (Math.random() < lightIntensityPct * 0.02) {
          const initV = Math.sqrt(maxKineticEnergyEv) * 2.8 + Math.random() * 0.5;
          particles.push({
            x: 35,
            y: 35 + Math.random() * (height - 70),
            vx: initV,
            vy: (Math.random() - 0.5) * 0.8,
            size: 3.5,
          });
        }
      }

      const retardingDecel = retardingVoltage * 0.75;
      particles.forEach((p) => {
        p.vx -= retardingDecel * 0.05;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.vx > 0 ? '#38bdf8' : '#f43f5e';
        ctx.fill();
      });

      particles = particles.filter(p => p.x > 30 && p.x < width - 35 && p.y > 20 && p.y < height - 20);
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedMetal, isPhotoelectricEmitting, lightIntensityPct, maxKineticEnergyEv, retardingVoltage]);

  // Canvas 3: Rutherford Scattering
  useEffect(() => {
    const canvas = scatteringCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const nucX = width / 2;
      const nucY = height / 2;

      ctx.beginPath();
      ctx.arc(nucX, nucY, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#eab308';
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(`+${targetAtomicZ}e`, nucX - 10, nucY + 3);

      const impactValues = [-60, -35, -15, -3, 0, 3, 15, 35, 60];
      impactValues.forEach((b) => {
        ctx.beginPath();
        ctx.strokeStyle = Math.abs(b) <= 3 ? '#ef4444' : 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = Math.abs(b) <= 3 ? 2.5 : 1.2;

        let started = false;
        for (let x = 0; x < width; x += 4) {
          const dx = x - nucX;
          const r = Math.sqrt(dx * dx + b * b);
          const deflection = (targetAtomicZ * 35) / (alphaEnergyMeV * (r + 15));
          const y = nucY + b + (b >= 0 ? deflection : -deflection);

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      const bTest = impactParameterFm * 1.2;
      const bulletX = ((t * 120) % (width + 60)) - 30;
      const dxB = bulletX - nucX;
      const rB = Math.sqrt(dxB * dxB + bTest * bTest);
      const deflB = (targetAtomicZ * 35) / (alphaEnergyMeV * (rB + 15));
      const bulletY = nucY + bTest + (bTest >= 0 ? deflB : -deflB);

      ctx.beginPath();
      ctx.arc(bulletX, bulletY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [targetAtomicZ, alphaEnergyMeV, impactParameterFm]);

  // Handlers
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Quantum Optics Interactive Laboratories.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free exploration sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for rigorous CISCE competency challenges.');
  }, []);

  const handleBohrTransitionTrigger = useCallback((fromN: number, toN: number) => {
    if (fromN <= toN) return;
    const eInitial = -13.6 / (fromN * fromN);
    const eFinal = -13.6 / (toN * toN);
    const deltaEEv = eInitial - eFinal;
    const deltaEJoules = deltaEEv * Q_E;
    const lambdaNm = ((H_PLANCK * C_LIGHT) / deltaEJoules) * 1e9;

    let series = 'Balmer (Visible)';
    if (toN === 1) series = 'Lyman (Ultraviolet)';
    else if (toN === 3) series = 'Paschen (Infrared)';

    setLastEmittedPhoton({ energyEv: deltaEEv, wavelengthNm: lambdaNm, series });
    setBohrLevelN(toN);
    audioManager.play('sparkle');
    speechManager.speak(`Quantum jump from n=${fromN} to n=${toN}! Emitted a ${deltaEEv.toFixed(2)} eV photon.`);
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Magnificent work! You scored ${finalScore} percent and achieved quantum mastery.`);
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
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
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
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Review the step-by-step physical breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800">
                ISC Class 12 Physics • Wave & Quantum Optics
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  difficulty === 'standard' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                  'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Indicators */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((pStep) => (
            <motion.span
              key={pStep}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                phase === pStep
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {pStep}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-xl">
            <h2 className="text-xl font-bold text-indigo-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-200/80 bg-indigo-900/30 p-3 rounded-xl border border-indigo-700/40">
              🔭 <strong>Field Context:</strong> {SCENARIO.context}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <span>⚡ Discovery Question (Pre-Exploration Intuition Hook)</span>
            </div>
            <h3 className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                  className={`text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={discoveryCorrect ? 'text-emerald-400 text-sm font-medium' : 'text-amber-300 text-sm'}>
                  {discoveryCorrect
                    ? '✓ Spot on! Narrowing the slit forces waves to spread wider into the geometric shadow region.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Laboratories"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION WITH MULTI-REPRESENTATION & TOPIC SVGS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center">
                    {currentSlide + 1}
                  </span>
                  {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <span className="text-xs text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-300 text-sm bg-amber-950/40 p-3 rounded-xl border border-amber-800/50">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </motion.p>

              {/* ─── BRILLIANT-STYLE PREDICTION CARD (Lab 1 & Lab 2) ─── */}
              {currentSlide < PREDICTION_QUESTIONS.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/60 space-y-3"
                >
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                    <span>🔮 Brilliant Predict-Then-Check</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[currentSlide].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[currentSlide].options.map((opt, oIdx) => {
                      const answered = predictionAnswered[currentSlide] !== undefined;
                      const isChosen = predictionAnswered[currentSlide] === oIdx;
                      const isRight = oIdx === PREDICTION_QUESTIONS[currentSlide].correctIndex;
                      return (
                        <motion.button
                          key={oIdx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={answered}
                          onClick={() => {
                            setPredictionAnswered(prev => ({ ...prev, [currentSlide]: oIdx }));
                            audioManager.play(isRight ? 'success' : 'pop');
                          }}
                          className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                            answered && isRight
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : answered && isChosen
                              ? 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-indigo-400'
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                  {predictionAnswered[currentSlide] !== undefined && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-lg text-xs border border-indigo-800">
                      <p className="text-emerald-300 font-semibold mb-1">🔬 Verify in the interactive sim below:</p>
                      <p className="text-slate-300">{PREDICTION_QUESTIONS[currentSlide].verifyInstruction}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* LIVE APPARATUS & MULTI-REPRESENTATIONS */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                {/* Step 0: Single Slit Diffraction */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Representation 1: SVG Geometric Ray Diagram */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400">Representation 1: Geometric Wavelet Diffraction Ray Diagram</span>
                        <SingleSlitWavefrontSVG slitWidth={slitWidthMicrons} wavelength={wavelengthNm} />
                      </motion.div>
                      {/* Representation 2: Intensity Canvas Profile */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400">Representation 2: Sinc² Intensity Curve & Screen Fringes</span>
                        <canvas ref={diffractionCanvasRef} width={500} height={180} className="w-full h-44 rounded-xl border border-slate-800" />
                      </motion.div>
                    </div>

                    {/* Representation 3: Mathematical Formula Table */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-slate-300 font-semibold">Slit Width (a): {slitWidthMicrons} μm</label>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={350}
                          value={slitWidthMicrons}
                          aria-label="Adjust slit width"
                          onChange={(e) => setSlitWidthMicrons(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-slate-300 font-semibold">Wavelength (λ): {wavelengthNm} nm</label>
                        </div>
                        <input
                          type="range"
                          min={400}
                          max={720}
                          value={wavelengthNm}
                          aria-label="Adjust light wavelength"
                          onChange={(e) => setWavelengthNm(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-center">
                        <span className="text-slate-400 font-mono">Central Width = 2Dλ / a:</span>
                        <span className="text-indigo-400 font-bold text-sm font-mono">{centralLinearWidthMm.toFixed(2)} mm</span>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Step 1: Photoelectric Cell */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Representation 1: Photoelectric Energy SVG */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400">Representation 1: Work Function & Photon Delivery</span>
                        <PhotoelectricDiagramSVG workFuncEv={currentWorkFunction} photonEv={incidentPhotonEnergyEv} />
                      </motion.div>
                      {/* Representation 2: Retarding Vacuum Tube Canvas */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400">Representation 2: Ejected Photoelectron Vacuum Chamber</span>
                        <canvas ref={particleSimCanvasRef} width={500} height={180} className="w-full h-44 rounded-xl border border-slate-800" />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-slate-400 block mb-1">Cathode Metal:</label>
                        <select
                          value={selectedMetal}
                          aria-label="Select cathode target metal"
                          onChange={(e) => setSelectedMetal(e.target.value as 'Cs' | 'Na' | 'Zn' | 'Pt')}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                        >
                          <option value="Cs">Caesium (2.14 eV)</option>
                          <option value="Na">Sodium (2.36 eV)</option>
                          <option value="Zn">Zinc (4.30 eV)</option>
                          <option value="Pt">Platinum (5.65 eV)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Frequency: {lightFrequencyPHz.toFixed(2)} PHz</label>
                        <input
                          type="range"
                          min={0.4}
                          max={1.8}
                          step={0.05}
                          value={lightFrequencyPHz}
                          aria-label="Adjust light frequency"
                          onChange={(e) => setLightFrequencyPHz(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                        <span className="text-sky-300 font-mono">E = {incidentPhotonEnergyEv.toFixed(2)} eV</span>
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Light Intensity: {lightIntensityPct}%</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={lightIntensityPct}
                          aria-label="Adjust light intensity"
                          onChange={(e) => setLightIntensityPct(Number(e.target.value))}
                          className="w-full accent-amber-400"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Retarding Volts: {retardingVoltage.toFixed(2)} V</label>
                        <input
                          type="range"
                          min={0}
                          max={4.0}
                          step={0.1}
                          value={retardingVoltage}
                          aria-label="Adjust retarding voltage"
                          onChange={(e) => setRetardingVoltage(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                        <span className="text-rose-400 font-mono">Stopping V_s = {stoppingPotentialCalculated.toFixed(2)} V</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Matter Waves */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(['electron', 'proton', 'cricket_ball'] as const).map((part) => (
                        <motion.button
                          key={part}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedParticle(part)}
                          aria-label={`Select particle: ${part.replace('_', ' ')}`}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            selectedParticle === part
                              ? 'bg-indigo-950 border-indigo-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="font-bold capitalize text-sm">{part.replace('_', ' ')}</div>
                          <div className="text-xs text-slate-400 mt-1">
                            {part === 'electron' ? 'm = 9.1e-31 kg' : part === 'proton' ? 'm = 1.67e-27 kg' : 'm = 0.15 kg'}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs">
                        <label className="text-slate-300 font-semibold">Accelerating Voltage (V): {acceleratingVoltageV} Volts</label>
                        <span className="text-indigo-400 font-mono">p = sqrt(2mqV)</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={600}
                        step={10}
                        value={acceleratingVoltageV}
                        aria-label="Accelerating voltage in volts"
                        onChange={(e) => setAcceleratingVoltageV(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center text-xs">
                        <div>
                          <div className="text-slate-400">Calculated de Broglie Wavelength (λ = h/p):</div>
                          <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                            {selectedParticle === 'cricket_ball'
                              ? `${calculatedDeBroglie.lambdaM.toExponential(3)} m (Macroscopic - No Aperture)`
                              : `${calculatedDeBroglie.lambdaAngstrom.toFixed(3)} Å (${calculatedDeBroglie.lambdaM.toExponential(3)} m)`}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Step 3: Rutherford Scattering */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <canvas ref={scatteringCanvasRef} width={650} height={180} className="w-full rounded-xl border border-slate-800 shadow-inner" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-slate-400 block mb-1">Target Foil Nucleus:</label>
                        <select
                          value={targetAtomicZ}
                          aria-label="Select target foil nucleus"
                          onChange={(e) => setTargetAtomicZ(Number(e.target.value))}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                        >
                          <option value={79}>Gold (Z = 79)</option>
                          <option value={47}>Silver (Z = 47)</option>
                          <option value={13}>Aluminium (Z = 13)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Alpha Kinetic Energy: {alphaEnergyMeV} MeV</label>
                        <input
                          type="range"
                          min={2.0}
                          max={9.0}
                          step={0.5}
                          value={alphaEnergyMeV}
                          aria-label="Alpha particle kinetic energy"
                          onChange={(e) => setAlphaEnergyMeV(Number(e.target.value))}
                          className="w-full accent-amber-400"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-center">
                        <span className="text-slate-400">Distance of Closest Approach (r_0):</span>
                        <span className="text-amber-400 font-bold font-mono text-sm">{closestApproachFm.toFixed(2)} fm</span>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Step 4: Bohr Hydrogen Model with SVG representation */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Representation 1: SVG Quantized Orbits & Energy Ladder */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400">Representation 1: Bohr Quantum Orbits & Energy Transitions</span>
                        <BohrAtomicLevelsSVG selectedN={bohrLevelN} />
                      </motion.div>

                      {/* Representation 2: Interactive Jump Buttons */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                        <div className="text-xs font-semibold text-slate-300">Trigger Quantum Emission Transitions:</div>
                        <div className="grid grid-cols-2 gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBohrTransitionTrigger(2, 1)}
                            aria-label="Transition n=2 to n=1 Lyman alpha"
                            className="p-2.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700 rounded-lg text-white font-medium text-left"
                          >
                            n=2 → n=1 (Lyman-α, 10.2 eV)
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBohrTransitionTrigger(3, 1)}
                            aria-label="Transition n=3 to n=1 Lyman beta"
                            className="p-2.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700 rounded-lg text-white font-medium text-left"
                          >
                            n=3 → n=1 (Lyman-β, 12.09 eV)
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBohrTransitionTrigger(3, 2)}
                            aria-label="Transition n=3 to n=2 Balmer alpha"
                            className="p-2.5 bg-rose-900/60 hover:bg-rose-800 border border-rose-700 rounded-lg text-white font-medium text-left"
                          >
                            n=3 → n=2 (Balmer-α, 1.89 eV)
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBohrTransitionTrigger(4, 2)}
                            aria-label="Transition n=4 to n=2 Balmer beta"
                            className="p-2.5 bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-700 rounded-lg text-white font-medium text-left"
                          >
                            n=4 → n=2 (Balmer-β, 2.55 eV)
                          </motion.button>
                        </div>

                        {lastEmittedPhoton && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-950 rounded-lg border border-indigo-800/80">
                            <div className="text-emerald-400 font-bold">✓ Emitted Photon Properties:</div>
                            <div className="text-slate-300 font-mono mt-1">
                              Energy: {lastEmittedPhoton.energyEv.toFixed(2)} eV | λ: {lastEmittedPhoton.wavelengthNm.toFixed(1)} nm ({lastEmittedPhoton.series})
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* ─── BRILLIANT-STYLE OBSERVATION QUESTION (Lab 0 & Lab 3) ─── */}
              {(currentSlide === 0 || currentSlide === 3) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-700/50 space-y-3"
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <span>👁️ Brilliant Observation: What Do You Notice?</span>
                  </div>
                  {(() => {
                    const obsObj = currentSlide === 0 ? OBSERVATION_QUESTIONS[0] : OBSERVATION_QUESTIONS[1];
                    const obsIdx = currentSlide === 0 ? 0 : 1;
                    const answered = observationAnswered[obsIdx] !== undefined;
                    return (
                      <>
                        <p className="text-sm font-semibold text-white">{obsObj.question}</p>
                        <div className="space-y-2">
                          {obsObj.observableOptions.map((opt, optI) => {
                            const isChosen = observationAnswered[obsIdx] === optI;
                            const isRight = optI === obsObj.correctIndex;
                            return (
                              <motion.button
                                key={optI}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={answered}
                                onClick={() => {
                                  setObservationAnswered(prev => ({ ...prev, [obsIdx]: optI }));
                                  audioManager.play(isRight ? 'success' : 'pop');
                                }}
                                className={`w-full p-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                                  answered && isRight
                                    ? 'bg-emerald-900/80 border-emerald-400 text-emerald-100'
                                    : answered && isChosen
                                    ? 'bg-rose-950 border-rose-500 text-rose-200'
                                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-emerald-400'
                                }`}
                              >
                                {opt}
                              </motion.button>
                            );
                          })}
                        </div>
                        {answered && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-300 bg-emerald-950/80 p-2 rounded-lg border border-emerald-800">
                            💡 {obsObj.explanation}
                          </motion.p>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous interactive lab"
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Next interactive lab"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
                  >
                    Next Lab ({currentSlide + 2}/{EXPLORATION_STEPS.length}) →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Enter free sandbox simulator"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox Simulator →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Quantum Physics Full Sandbox Suite</h2>
                <p className="text-slate-400 text-sm mt-0.5">Freely adjust all physical variables without grading or timers.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Begin CISCE competency challenges"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm shadow-xl"
              >
                Ready for CISCE Competency Challenges! →
              </motion.button>
            </div>

            {/* Sandbox Module Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              {(['diffraction', 'photoelectric', 'matter', 'scattering', 'bohr'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSandboxTab(tab)}
                  aria-label={`Switch to ${tab} sandbox`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    sandboxTab === tab
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'diffraction' ? '1. Single Slit' :
                   tab === 'photoelectric' ? '2. Photoelectric' :
                   tab === 'matter' ? '3. Matter Waves' :
                   tab === 'scattering' ? '4. Rutherford Scattering' : '5. Bohr Atom'}
                </motion.button>
              ))}
            </div>

            {/* Active Sandbox View */}
            <AnimatePresence mode="wait">
              <motion.div
                key={sandboxTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800"
              >
                {sandboxTab === 'diffraction' && (
                  <div className="space-y-4">
                    <SingleSlitWavefrontSVG slitWidth={slitWidthMicrons} wavelength={wavelengthNm} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="text-slate-300">Slit Width: {slitWidthMicrons} μm</label>
                        <input
                          type="range"
                          min={10}
                          max={400}
                          value={slitWidthMicrons}
                          aria-label="Slit width in microns"
                          onChange={(e) => setSlitWidthMicrons(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-300">Wavelength: {wavelengthNm} nm</label>
                        <input
                          type="range"
                          min={380}
                          max={750}
                          value={wavelengthNm}
                          aria-label="Wavelength in nanometres"
                          onChange={(e) => setWavelengthNm(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg flex flex-col justify-center">
                        <span className="text-slate-400">Angular Half Width (λ/a):</span>
                        <span className="text-indigo-400 font-bold">{(centralAngularHalfWidthRad * 1000).toFixed(2)} mrad</span>
                      </motion.div>
                    </div>
                  </div>
                )}

                {sandboxTab === 'photoelectric' && (
                  <div className="space-y-4">
                    <PhotoelectricDiagramSVG workFuncEv={currentWorkFunction} photonEv={incidentPhotonEnergyEv} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400">Metal:</label>
                        <select
                          value={selectedMetal}
                          aria-label="Metal selection"
                          onChange={(e) => setSelectedMetal(e.target.value as 'Cs' | 'Na' | 'Zn' | 'Pt')}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                        >
                          <option value="Cs">Caesium (2.14 eV)</option>
                          <option value="Na">Sodium (2.36 eV)</option>
                          <option value="Zn">Zinc (4.30 eV)</option>
                          <option value="Pt">Platinum (5.65 eV)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-slate-400">Frequency: {lightFrequencyPHz.toFixed(2)} PHz</label>
                        <input
                          type="range"
                          min={0.3}
                          max={2.0}
                          step={0.05}
                          value={lightFrequencyPHz}
                          aria-label="Light frequency in PHz"
                          onChange={(e) => setLightFrequencyPHz(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400">Intensity: {lightIntensityPct}%</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={lightIntensityPct}
                          aria-label="Light intensity percentage"
                          onChange={(e) => setLightIntensityPct(Number(e.target.value))}
                          className="w-full accent-amber-400"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400">Retarding Volts: {retardingVoltage.toFixed(2)} V</label>
                        <input
                          type="range"
                          min={0}
                          max={5.0}
                          step={0.1}
                          value={retardingVoltage}
                          aria-label="Retarding voltage"
                          onChange={(e) => setRetardingVoltage(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {sandboxTab === 'matter' && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {(['electron', 'proton', 'cricket_ball'] as const).map((p) => (
                        <motion.button
                          key={p}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedParticle(p)}
                          aria-label={`Select ${p}`}
                          className={`px-4 py-2 rounded-lg text-xs font-bold capitalize ${
                            selectedParticle === p ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {p.replace('_', ' ')}
                        </motion.button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-slate-300">Accelerating Voltage: {acceleratingVoltageV} V</label>
                        <input
                          type="range"
                          min={10}
                          max={1000}
                          step={10}
                          value={acceleratingVoltageV}
                          aria-label="Accelerating voltage in sandbox"
                          onChange={(e) => setAcceleratingVoltageV(Number(e.target.value))}
                          className="w-full accent-indigo-500 mt-2"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-slate-400">de Broglie Wavelength:</div>
                        <div className="text-lg font-mono font-bold text-emerald-400">
                          {selectedParticle === 'cricket_ball'
                            ? `${calculatedDeBroglie.lambdaM.toExponential(3)} m`
                            : `${calculatedDeBroglie.lambdaAngstrom.toFixed(3)} Å`}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {sandboxTab === 'scattering' && (
                  <div className="space-y-4">
                    <canvas ref={scatteringCanvasRef} width={650} height={180} className="w-full rounded-xl border border-slate-800" />
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400">Target Z:</label>
                        <input
                          type="range"
                          min={10}
                          max={92}
                          value={targetAtomicZ}
                          aria-label="Target atomic number"
                          onChange={(e) => setTargetAtomicZ(Number(e.target.value))}
                          className="w-full accent-yellow-500"
                        />
                        <span className="text-slate-300">Z = {targetAtomicZ}</span>
                      </div>
                      <div>
                        <label className="text-slate-400">Alpha Energy: {alphaEnergyMeV} MeV</label>
                        <input
                          type="range"
                          min={1.0}
                          max={10.0}
                          step={0.5}
                          value={alphaEnergyMeV}
                          aria-label="Alpha energy"
                          onChange={(e) => setAlphaEnergyMeV(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Closest Approach r_0:</span>
                        <div className="text-amber-400 font-bold font-mono">{closestApproachFm.toFixed(2)} fm</div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {sandboxTab === 'bohr' && (
                  <div className="space-y-4">
                    <BohrAtomicLevelsSVG selectedN={bohrLevelN} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((n) => (
                        <motion.button
                          key={n}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setBohrLevelN(n)}
                          aria-label={`Set Bohr orbit level n=${n}`}
                          className={`p-3 rounded-xl border text-xs font-bold ${
                            bohrLevelN === n ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          n = {n} ({(-13.6 / (n * n)).toFixed(2)} eV)
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CISCE CHALLENGE PHASE WITH SHAKE ANIMATION ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span whileHover={{ scale: 1.05 }} className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 capitalize">
                  Competency: {challenge.competencyLevel}
                </motion.span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Errors: <strong className="text-rose-400">{errors}</strong></span>
                <span className="text-slate-400">• Mastery: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong></span>
              </div>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* CHALLENGE CARD WITH SHAKE ANIMATION ON WRONG ANSWER */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-2xl shadow-rose-900/40'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed mb-4">
              {challenge.question}
            </h3>

            {/* MCQ FORMAT */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* NUMERIC INPUT FORMAT */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.01"
                    value={numericInput}
                    aria-label="Calculated numerical answer"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    disabled={showExplanation}
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-indigo-500 outline-none"
                  />
                  <span className="text-slate-300 font-semibold text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(parseFloat(numericInput))}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit calculated numerical answer"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg disabled:opacity-40"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* DRAG SORT FORMAT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400 mb-2">Drag items or arrange them into correct scientific sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Sequence step ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i))}
                  disabled={showExplanation}
                  aria-label="Verify sorted order"
                  className="mt-3 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* DRAG LABEL FORMAT */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 mb-3">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg cursor-grab text-white text-xs font-semibold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('wave_nature')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-sky-800 min-h-[90px] flex flex-col justify-center items-center text-center"
                  >
                    <span className="text-sky-400 font-bold text-xs mb-1">Wave Nature Target Area</span>
                    <span className="text-slate-300 text-sm">{droppedLabels['wave_nature'] || 'Drop wave phenomena here'}</span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('particle_nature')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-amber-800 min-h-[90px] flex flex-col justify-center items-center text-center"
                  >
                    <span className="text-amber-400 font-bold text-xs mb-1">Particle Nature Target Area</span>
                    <span className="text-slate-300 text-sm">{droppedLabels['particle_nature'] || 'Drop particle phenomena here'}</span>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  aria-label="Confirm classification"
                  className="mt-3 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
                >
                  Confirm Classification
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-4">
                <div className="text-indigo-300 font-bold text-sm flex items-center gap-2">
                  <span>📖 Step-by-Step Examiner Solution:</span>
                </div>

                <div className="space-y-2 text-sm text-slate-300">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((step, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-800 text-indigo-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}{!step.endsWith('.') && '.'}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next step"
                      className="px-4 py-2 bg-indigo-800 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Next challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE WITH PERSONALIZED MOTIVATIONAL FEEDBACK & REAL WORLD ACTIVITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-800/80 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/20"
            >
              🎉
            </motion.div>

            {/* Motivational Heading based on error count */}
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-1">
              <span className={`text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border ${
                errors === 0 ? 'bg-emerald-950 text-emerald-400 border-emerald-700' :
                errors <= 3 ? 'bg-sky-950 text-sky-400 border-sky-700' :
                errors <= 7 ? 'bg-amber-950 text-amber-400 border-amber-700' :
                'bg-rose-950 text-rose-400 border-rose-700'
              }`}>
                {errors === 0 ? 'PERFECT SCORE!' : errors <= 3 ? 'Great work!' : errors <= 7 ? 'Good effort!' : 'Do not give up — You WILL get this!'}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Quantum Continuum Mastered!</h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Final Score:</span>{' '}
                <strong className="text-emerald-400 text-base">{Math.max(0, 100 - errors * 5)}%</strong>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Mastery Level:</span>{' '}
                <strong className="text-indigo-400 text-base capitalize">{masteryLevel}</strong>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Total Errors:</span>{' '}
                <strong className="text-rose-400 text-base">{errors}</strong>
              </motion.div>
            </div>

            <p className="text-sm text-indigo-200/90 max-w-xl mx-auto leading-relaxed pt-2">
              {errors === 0
                ? 'Flawless physics achievement! You demonstrated impeccable quantum intuition and problem-solving across diffraction, duality, matter waves, and Bohr atomic postulates.'
                : errors <= 3
                ? 'Impressive mastery! You solved the core ISC wave-quantum problems with sharp precision.'
                : errors <= 7
                ? 'Solid foundational progress! Review the step explanations and retry to achieve an unblemished record.'
                : 'Do not give up — quantum mechanics challenges even the sharpest minds. Review the detailed derivations and rerun the simulations!'}
            </p>
          </motion.div>

          {/* REAL WORLD ACTIVITY CAPSTONE CARD */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900 rounded-2xl border border-indigo-700/60 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <span>🚀 Real-World Engineering Capstone: {REAL_WORLD_ACTIVITY.title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.02 }} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {hitMisconceptions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️ Personalized Misconception Diagnostic Profile:</span>
              </h3>
              <div className="space-y-3 pt-1">
                {hitMisconceptions.map((mIdx, i) => {
                  const mObj = misconceptions?.[mIdx];
                  if (!mObj) return null;
                  return (
                    <motion.div key={i} whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900/90 rounded-xl border border-rose-800/40 text-xs space-y-1">
                      <div className="text-rose-400 font-semibold">✗ Misconception: {mObj.misconception}</div>
                      <div className="text-emerald-300 font-medium">✓ Physical Truth: {mObj.correction}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/40 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-amber-400 block mb-0.5">Spaced Repetition Review Schedule (SM-2):</span>
              <p className="text-slate-400">
                Next scheduled review in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 Days' : '3 Days'}</strong>.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setCurrentChallenge(0);
                setErrors(0);
              }}
              aria-label="Re-explore labs"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold"
            >
              Re-explore Labs ↺
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* FEEDBACK OVERLAYS */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Confirmed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PhysicsSingleSlitDiffractionSim;