'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C9_PHY_031 = 'c9_phy_031';
const NODE_C9_PHY_032 = 'c9_phy_032';
const NODE_C9_PHY_033 = 'c9_phy_033';
const NODE_C9_PHY_034 = 'c9_phy_034';
const NODE_C9_PHY_035 = 'c9_phy_035';
const NODE_C9_PHY_036 = 'c9_phy_036';
const NODE_C9_PHY_037 = 'c9_phy_037';
const NODE_C9_PHY_038 = 'c9_phy_038';
const NODE_C9_PHY_039 = 'c9_phy_039';
const NODE_C9_PHY_040 = 'c9_phy_040';

const ALL_NODE_IDS = [
  NODE_C9_PHY_031,
  NODE_C9_PHY_032,
  NODE_C9_PHY_033,
  NODE_C9_PHY_034,
  NODE_C9_PHY_035,
  NODE_C9_PHY_036,
  NODE_C9_PHY_037,
  NODE_C9_PHY_038,
  NODE_C9_PHY_039,
  NODE_C9_PHY_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Submarine Rescue & Deep-Sea Lab',
  intro: 'A marine research team off the Mumbai coast needs your physics expertise. You must calibrate periscope mirrors, tune acoustic sonar pulses to navigate murky depths, and power an emergency submersible circuit.',
  context: 'Master geometric optics, sound wave propagation (infra/sonic/ultrasound), and foundational electrodynamics to rescue the vessel!',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When a diver switches on a powerful flashlight inside a foggy cave, why does an ultrasonic sonar beam penetrate deeper and reflect clearer echoes from obstacles than audible sound or light?',
  options: [
    'Ultrasonic waves move 100 times faster than normal sound in water.',
    'Their very high frequency means very short wavelength, minimizing diffraction and absorption while delivering sharp pinpoint echoes.',
    'Ultrasonic waves are electromagnetic rays like X-rays that pass through fog freely.',
    'Ultrasonic sound produces negative resistance inside liquid water molecules.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Wave speed V is fixed by the medium (1500 m/s in water). High frequency f implies short wavelength (V = f·λ), allowing narrow focused beams!',
};

// ─── PREDICT-THEN-CHECK QUESTIONS ───
export const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If you move a glowing candle from 25 cm (beyond C) to 4 cm (inside F = 10 cm) in front of a concave mirror, what will happen to the image on the screen?',
    options: [
      'The image gets even smaller and stays inverted on the screen.',
      'The real image vanishes from the screen; looking into the mirror reveals a giant upright virtual image behind the glass.',
      'The image turns completely upside down and burns the screen.',
      'No rays reflect at all from the mirror surface.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Object Distance slider in Lab 1 down below 10 cm and observe the virtual ray projection behind the mirror!',
    nodeId: NODE_C9_PHY_031,
  },
  {
    question: 'Prediction: If you increase the frequency of a sound wave while keeping wave speed in air constant (340 m/s), what will happen to its wavelength λ?',
    options: [
      'Wavelength will increase proportionally (longer waves).',
      'Wavelength will decrease proportionally because V = f · λ (shorter waves).',
      'Wavelength remains constant regardless of frequency changes.',
      'Wave speed will immediately double to compensate.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, increase the Frequency slider and observe how the calculated wavelength λ shrinks in real time!',
    nodeId: NODE_C9_PHY_033,
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org 'what do you notice?' pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In Lab 1, as you drag the object closer to the concave mirror from beyond C towards F, what happens to the size and position of the real inverted image?',
    options: [
      'The image moves closer to the mirror and shrinks.',
      'The image moves farther away from the mirror and grows larger in size.',
      'The image immediately disappears and turns green.',
      'The image stays fixed at the center of curvature C.',
    ],
    correctIndex: 1,
    observableOptions: [
      'Image moves away from mirror and becomes magnified',
      'Image moves closer to mirror and becomes smaller',
      'Image orientation flips to erect while remaining at C',
      'No change in image position or size',
    ],
    explanation: 'As object distance u decreases towards focal point F, image distance v increases (1/v = 1/f - 1/u) and linear magnification |m| = v/u grows larger.',
    nodeId: NODE_C9_PHY_031,
  },
  {
    question: 'Observation: In Lab 2, observe the particle motion when switching from Transverse to Longitudinal wave mode. How do the particles oscillate relative to wave energy transfer?',
    options: [
      'In transverse waves, particles oscillate up-and-down (perpendicular); in longitudinal waves, particles oscillate back-and-forth (parallel).',
      'Particles travel across the entire canvas from left to right in both wave modes.',
      'In longitudinal waves, particles spin in circles, while in transverse waves they remain stationary.',
      'There is no difference in particle motion between the two modes.',
    ],
    correctIndex: 0,
    observableOptions: [
      'Transverse = vertical (perpendicular) oscillation; Longitudinal = horizontal (parallel) oscillation',
      'Transverse = particles drift left; Longitudinal = particles drift right',
      'Both waves push medium particles permanently to the right end',
      'Particles only oscillate in transverse mode and freeze in longitudinal',
    ],
    explanation: 'Transverse waves cause medium displacement perpendicular to wave propagation (crests and troughs), while longitudinal waves cause displacement parallel to wave propagation (compressions and rarefactions).',
    nodeId: NODE_C9_PHY_033,
  },
];

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

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // 1. NODE 031 - Foundation - Recall
  {
    id: 'ch_phy_01',
    nodeId: NODE_C9_PHY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A concave mirror has a radius of curvature R = 30 cm. What is its focal length f?',
    options: ['f = 30 cm', 'f = 15 cm', 'f = 60 cm', 'f = 10 cm'],
    correctIndex: 1,
    explanation: 'For spherical mirrors, focal length is half the radius of curvature: f = R / 2. Thus f = 30 / 2 = 15 cm.',
    hints: [
      'Recall the relationship connecting focal length f and radius of curvature R.',
      'Focal point F lies exactly halfway between the pole P and center of curvature C.',
      'Divide 30 cm by 2 to get 15 cm.',
    ],
    misconceptionIndex: 1,
  },
  // 2. NODE 031 - Foundation - Drag-label
  {
    id: 'ch_phy_02',
    nodeId: NODE_C9_PHY_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the optical terms to their correct locations on the concave mirror axis.',
    dragItems: [
      { label: 'Pole (P)', targetId: 'target_pole' },
      { label: 'Focus (F)', targetId: 'target_focus' },
      { label: 'Center (C)', targetId: 'target_center' },
    ],
    correctMapping: {
      target_pole: 'Pole (P)',
      target_focus: 'Focus (F)',
      target_center: 'Center (C)',
    },
    explanation: 'The pole P is the geometric center on the mirror surface. C is the sphere center at distance R, and F is halfway at distance R/2.',
    hints: [
      'The Pole sits directly on the glass surface.',
      'The Focus is midway between the Pole and the Center of Curvature.',
      'The Center of Curvature is the parent sphere center furthest to the left.',
    ],
  },
  // 3. NODE 031 - Standard - Application
  {
    id: 'ch_phy_03',
    nodeId: NODE_C9_PHY_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A dentist places a concave mirror 1.5 cm in front of a tooth (focal length f = 3 cm). What are the image characteristics?',
    options: [
      'Real, inverted, and diminished',
      'Virtual, erect, and magnified',
      'Real, inverted, and magnified',
      'Virtual, erect, and diminished',
    ],
    correctIndex: 1,
    explanation: 'When the object is placed between the Pole (P) and Focus (F) (u < f), a concave mirror forms an upright, enlarged virtual image behind the mirror.',
    hints: [
      'Note that the object distance u = 1.5 cm is less than the focal length f = 3 cm.',
      'Think about the classic shaving or dental mirror position.',
      'Inside the focus, reflected rays diverge in front and appear to meet behind the mirror, forming a virtual, erect, magnified image.',
    ],
    misconceptionIndex: 0,
  },
  // 4. NODE 032 - Standard - Numeric
  {
    id: 'ch_phy_04',
    nodeId: NODE_C9_PHY_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An object is placed 30 cm in front of a concave mirror of focal length 10 cm. Using Cartesian sign convention (u = -30 cm, f = -10 cm), calculate image distance v in cm (include minus sign if real).',
    correctAnswer: -15,
    tolerance: 0.5,
    unit: 'cm',
    explanation: '1/f = 1/u + 1/v => 1/(-10) = 1/(-30) + 1/v => 1/v = -1/10 + 1/30 = -2/30 = -1/15. Therefore v = -15 cm (real image in front).',
    hints: [
      'Write the mirror equation: 1/f = 1/u + 1/v.',
      'Substitute: 1/(-10) = 1/(-30) + 1/v, so 1/v = -1/10 + 1/30.',
      'Common denominator is 30: (-3 + 1)/30 = -2/30 = -1/15. Inverting gives v = -15 cm.',
    ],
  },
  // 5. NODE 032 - Advanced - Analysis
  {
    id: 'ch_phy_05',
    nodeId: NODE_C9_PHY_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A convex mirror with focal length f = +20 cm has an object placed at u = -20 cm. What is the magnification m = -v/u?',
    options: ['m = -1.0', 'm = +0.5', 'm = -0.5', 'm = +2.0'],
    correctIndex: 1,
    explanation: '1/v = 1/f - 1/u = 1/20 - 1/(-20) = 1/20 + 1/20 = 2/20 = 1/10 => v = +10 cm. Magnification m = -v/u = -(+10)/(-20) = +0.5 (erect & diminished).',
    hints: [
      'For a convex mirror, f is positive (+20 cm) and u is negative (-20 cm).',
      'Calculate 1/v = 1/20 + 1/20 = 1/10, hence v = +10 cm.',
      'Magnification formula: m = -v/u = -10 / (-20) = +0.5.',
    ],
    misconceptionIndex: 2,
  },
  // 6. NODE 033 - Foundation - Understanding
  {
    id: 'ch_phy_06',
    nodeId: NODE_C9_PHY_033,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do particles move in a longitudinal mechanical wave compared to the direction of wave travel?',
    options: [
      'Perpendicular (at 90 degrees) to the wave direction',
      'Parallel (back and forth along the same line) to the wave direction',
      'In circular clockwise orbits only',
      'Particles travel permanently from the transmitter to receiver',
    ],
    correctIndex: 1,
    explanation: 'In longitudinal waves (such as sound in air), medium particles oscillate parallel to wave propagation, forming alternating compressions and rarefactions.',
    hints: [
      'Think of a slinky spring being pushed and pulled along its length.',
      'Transverse is perpendicular (crests & troughs); Longitudinal is parallel (compressions & rarefactions).',
      'Particles move to-and-fro along the line of wave motion.',
    ],
    misconceptionIndex: 0,
  },
  // 7. NODE 033 - Foundation - Drag-sort
  {
    id: 'ch_phy_07',
    nodeId: NODE_C9_PHY_033,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of wave propagation events when a tuning fork prongs vibrate forward in air:',
    sortItems: [
      'Fork prong moves outward pushing adjacent air molecules together',
      'High pressure Compression zone forms',
      'Disturbance energy transfers to neighbouring layer of air',
      'Prong moves backward creating a low pressure Rarefaction zone',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The outward movement compresses air, transmitting pressure energy forward, followed by an inward sweep creating a rarefaction.',
    hints: [
      'Start with the physical motion of the tuning fork prong outwards.',
      'Outward compression squashes air into a high pressure zone.',
      'Pressure disturbance is passed from molecule to molecule.',
      'The rebound creates the rarefaction.',
    ],
  },
  // 8. NODE 034 - Standard - Application
  {
    id: 'ch_phy_08',
    nodeId: NODE_C9_PHY_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A sound wave has frequency f = 500 Hz and wavelength λ = 68 cm. Calculate wave speed V in m/s.',
    correctAnswer: 340,
    tolerance: 1,
    unit: 'm/s',
    explanation: 'First convert wavelength to SI units: λ = 68 cm = 0.68 m. Using wave equation V = f · λ = 500 Hz · 0.68 m = 340 m/s.',
    hints: [
      'Convert wavelength from cm to meters first: 68 cm = 0.68 m.',
      'Use the fundamental wave equation: V = f · λ.',
      'Multiply 500 by 0.68 to get 340 m/s.',
    ],
  },
  // 9. NODE 034 - Standard - Analysis
  {
    id: 'ch_phy_09',
    nodeId: NODE_C9_PHY_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During a monsoon thunderstorm in Chennai, an observer sees lightning and hears thunder 4.0 seconds later (speed of sound in air = 340 m/s). How far away was the lightning strike?',
    options: ['1360 m (~1.36 km)', '85 m', '340 m', '1200 km'],
    correctIndex: 0,
    explanation: 'Light travels at 3·10^8 m/s reaching the observer virtually instantaneously. Sound travels at 340 m/s. Distance = Speed · Time = 340 · 4.0 = 1360 meters.',
    hints: [
      'Light travels so fast (~300,000 km/s) that its transit time is negligible.',
      'The entire 4 second delay represents sound traveling through air.',
      'Distance = 340 m/s × 4 s = 1360 m.',
    ],
  },
  // 10. NODE 035 - Foundation - Recall
  {
    id: 'ch_phy_10',
    nodeId: NODE_C9_PHY_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the frequency range of Infrasonic sound waves?',
    options: ['Below 20 Hz', 'Between 20 Hz and 20,000 Hz', 'Above 20,000 Hz', 'Above 340 m/s'],
    correctIndex: 0,
    explanation: 'Infrasonic sound refers to longitudinal pressure waves with frequencies below 20 Hz, which are inaudible to human ears.',
    hints: [
      'The prefix "infra" means below.',
      'Human hearing begins at 20 Hz.',
      'Infrasonic frequencies lie strictly below 20 Hz.',
    ],
    misconceptionIndex: 0,
  },
  // 11. NODE 035 - Standard - Application
  {
    id: 'ch_phy_11',
    nodeId: NODE_C9_PHY_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Asian elephants at Corbett National Park communicate across 5 km of dense sal forest using 15 Hz infrasonic rumbles. Why do these waves travel much further than high-pitched calls?',
    options: [
      '15 Hz waves travel 10 times faster than 1000 Hz sound.',
      'Very low frequency results in very long wavelength (λ ≈ 22.7 m), which diffracts past trees and experiences minimal atmospheric absorption.',
      '15 Hz vibrations convert surrounding air into a vacuum.',
      'Infrasonic waves are supersonic in speed.',
    ],
    correctIndex: 1,
    explanation: 'Since V = f·λ, low frequency means long wavelength. Long waves suffer minimal scattering and absorption, allowing long-distance propagation.',
    hints: [
      'Wave speed in air is identical for all frequencies.',
      'What happens to wavelength λ when frequency f is very small?',
      'Large wavelengths bend around obstacles (diffraction) without getting absorbed.',
    ],
  },
  // 12. NODE 036 - Foundation - Understanding
  {
    id: 'ch_phy_12',
    nodeId: NODE_C9_PHY_036,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What physical characteristic of a sound wave determines its Pitch versus its Loudness?',
    options: [
      'Pitch depends on Frequency; Loudness depends on Amplitude',
      'Pitch depends on Amplitude; Loudness depends on Frequency',
      'Both Pitch and Loudness depend solely on Speed',
      'Pitch depends on Wavelength; Loudness depends on Speed',
    ],
    correctIndex: 0,
    explanation: 'Frequency (number of vibrations per second) determines the perceived Pitch (high vs low treble/bass), while wave Amplitude determines perceived Loudness.',
    hints: [
      'Think of a tight guitar string vibrating rapidly: high frequency creates high pitch.',
      'Plucking hard gives high amplitude and loud sound.',
      'Frequency -> Pitch; Amplitude -> Loudness.',
    ],
    misconceptionIndex: 1,
  },
  // 13. NODE 036 - Standard - Analysis
  {
    id: 'ch_phy_13',
    nodeId: NODE_C9_PHY_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following sounds lies within the human audible sonic range (20 Hz to 20,000 Hz)?',
    options: [
      'Seismic earthquake precursor wave at 2 Hz',
      'Standard telephone voice communication band (300 Hz to 3400 Hz)',
      'Bat echolocation navigation click at 45,000 Hz',
      'Medical fetal sonogram frequency at 3.5 MHz (3,500,000 Hz)',
    ],
    correctIndex: 1,
    explanation: 'The human audible spectrum spans 20 Hz to 20,000 Hz. Human voice bands (300-3400 Hz) sit right in the heart of this audible sonic band.',
    hints: [
      '2 Hz is infrasonic (< 20 Hz).',
      '45 kHz and 3.5 MHz are ultrasonic (> 20 kHz).',
      'Speech frequencies between 300 Hz and 3400 Hz are audible.',
    ],
  },
  // 14. NODE 037 - Foundation - Recall
  {
    id: 'ch_phy_14',
    nodeId: NODE_C9_PHY_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct distinction between Ultrasonic and Supersonic?',
    options: [
      'Ultrasonic refers to wave frequency (> 20 kHz); Supersonic refers to object speed (> speed of sound)',
      'Ultrasonic means fast speed; Supersonic means high frequency',
      'They are identical terms used interchangeably in aviation',
      'Ultrasonic refers to sound in water; Supersonic refers to sound in air',
    ],
    correctIndex: 0,
    explanation: 'Ultrasonic is a frequency term (> 20,000 Hz, above human hearing). Supersonic is a velocity term (traveling faster than Mach 1 / speed of sound).',
    hints: [
      'Notice the root "sonic" in both, but "ultra" relates to frequency band beyond hearing.',
      'A jet plane flying at Mach 2 is supersonic because its speed exceeds 340 m/s.',
      'A silent dog whistle (25 kHz) is ultrasonic.',
    ],
    misconceptionIndex: 0,
  },
  // 15. NODE 037 - Advanced - Application
  {
    id: 'ch_phy_15',
    nodeId: NODE_C9_PHY_037,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An Indian Navy SONAR transmitter sends an ultrasonic pulse into seawater (speed = 1500 m/s). The echo from the seabed is received 2.4 seconds later. What is the sea depth in meters?',
    correctAnswer: 1800,
    tolerance: 5,
    unit: 'm',
    explanation: 'Total two-way distance = Speed · Time = 1500 · 2.4 = 3600 m. One-way depth = Total distance / 2 = 3600 / 2 = 1800 m.',
    hints: [
      'Remember that the sound travels DOWN to the seabed and UP back to the receiver (two-way trip).',
      'Formula for echo depth: d = (V · t) / 2.',
      'Calculate (1500 × 2.4) / 2 = 3600 / 2 = 1800 m.',
    ],
  },
  // 16. NODE 038 - Foundation - Recall
  {
    id: 'ch_phy_16',
    nodeId: NODE_C9_PHY_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the quantisation of charge equation and the magnitude of elementary charge e?',
    options: [
      'Q = ne, where e = 1.6 × 10^-19 C and n is an integer',
      'Q = n/e, where e = 9.1 × 10^-31 C',
      'Q = I·t, where e = 3.0 × 10^8 C',
      'Q = V/R, where e = 1.6 × 10^-16 C',
    ],
    correctIndex: 0,
    explanation: 'Electric charge is quantised: Q = ne, where n = ±1, ±2... and elementary charge e = 1.6 × 10^-19 C. Charge only exists in integral packets of e.',
    hints: [
      'Charge cannot exist in fractional amounts like 0.7e or 1.5e.',
      'The elementary charge of one electron or proton is 1.6 × 10^-19 C.',
      'Formula: Q = n · e.',
    ],
  },
  // 17. NODE 038 - Standard - Application
  {
    id: 'ch_phy_17',
    nodeId: NODE_C9_PHY_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A lab electroscope is charged. Which of the following measured charges is physically possible according to the law of quantisation (e = 1.6 × 10^-19 C)?',
    options: [
      'Q = 4.8 × 10^-19 C (n = 3)',
      'Q = 2.4 × 10^-19 C (n = 1.5)',
      'Q = 5.0 × 10^-19 C (n = 3.125)',
      'Q = 1.0 × 10^-19 C (n = 0.625)',
    ],
    correctIndex: 0,
    explanation: 'n = Q / e. For 4.8 × 10^-19 C, n = (4.8 × 10^-19) / (1.6 × 10^-19) = 3 (an exact integer). All other options yield fractional n, which cannot exist.',
    hints: [
      'Divide each charge value by 1.6 × 10^-19 C.',
      'Only whole integer values of n are physically allowed.',
      '4.8 / 1.6 = 3.0.',
    ],
  },
  // 18. NODE 039 - Foundation - Understanding
  {
    id: 'ch_phy_18',
    nodeId: NODE_C9_PHY_039,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does Conventional Current direction compare to Electronic Current (electron flow) in a copper circuit?',
    options: [
      'Conventional current flows from + to -; Electrons drift from - to +',
      'Both flow in the same direction from - to +',
      'Conventional current flows from - to +; Electrons drift from + to -',
      'Electrons remain stationary while protons flow through the copper wire',
    ],
    correctIndex: 0,
    explanation: 'By historical convention, current is defined as positive charge flow (+ to - terminal externally). Negatively charged free electrons actually drift from - to + terminal.',
    hints: [
      'Electrons have negative charge and are repelled by the negative terminal.',
      'Conventional current was defined before the discovery of electrons.',
      'Conventional is + to -; electronic is - to +.',
    ],
    misconceptionIndex: 1,
  },
  // 19. NODE 039 - Standard - Numeric
  {
    id: 'ch_phy_19',
    nodeId: NODE_C9_PHY_039,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A submersible headlamp draws a steady current of 0.5 A for 4 minutes. Calculate the total charge Q in Coulombs passed through the filament.',
    correctAnswer: 120,
    tolerance: 1,
    unit: 'C',
    explanation: 'Time must be in seconds: t = 4 min = 4 · 60 = 240 s. Q = I · t = 0.5 A · 240 s = 120 Coulombs.',
    hints: [
      'Do not forget to convert time into SI units (seconds): 4 minutes = 240 seconds.',
      'Use the formula: Q = I · t.',
      'Multiply 0.5 A by 240 s to get 120 C.',
    ],
  },
  // 20. NODE 040 - Standard - Application
  {
    id: 'ch_phy_20',
    nodeId: NODE_C9_PHY_040,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An emergency battery does 48 Joules of work (W) to drive 4 Coulombs of charge (Q) through a heating resistor. What is the potential difference V across the resistor in Volts?',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: 'V',
    explanation: 'Potential difference is defined as work done per unit charge: V = W / Q = 48 J / 4 C = 12 Volts (1 V = 1 J/C).',
    hints: [
      'Use the fundamental definition of potential difference: V = W / Q.',
      'Substitute W = 48 J and Q = 4 C.',
      '48 divided by 4 gives 12 Volts.',
    ],
  },
  // 21. NODE 040 - Advanced - Construct
  {
    id: 'ch_phy_21',
    nodeId: NODE_C9_PHY_040,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the correct series closed circuit loop by assembling the necessary standard components in sequence:',
    availableParts: ['Cell (+/-)', 'Key (Switch)', 'Rheostat (Variable Resistor)', 'Ammeter', 'Load Resistor'],
    targetState: 'Cell (+/-) Key (Switch) Rheostat (Variable Resistor) Ammeter Load Resistor',
    validationHint: 'Add all 5 parts in logical order: Source -> Switch -> Controller -> Measuring Device -> Load.',
    explanation: 'A complete functional DC test circuit connects the DC Source (Cell), safety Key, current controller (Rheostat), series measuring meter (Ammeter), and Load in a closed loop.',
    hints: [
      'Start with the energy source (Cell).',
      'Follow with the switch (Key) and variable resistor (Rheostat).',
      'Connect the Ammeter in series and terminate across the Load Resistor.',
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
  nodeId: NODE_C9_PHY_031,
  title: 'Spherical Mirrors, Wave Mechanics & Electrodynamics',
  definition: 'Comprehensive mastery of Class 9 ICSE Physics covering spherical mirror optics (f = R/2, mirror equation 1/f = 1/u + 1/v), longitudinal & transverse mechanical waves (V = f·λ), acoustic frequency spectrum (infrasound < 20Hz, sonic 20-20kHz, ultrasound > 20kHz, Sonar), quantisation of charge (Q = ne), current (I = Q/t), and potential difference (V = W/Q).',
  eli5: 'Think of optics as bouncy light rays governed by focal mirrors, sound as slinky air compressions where pitch is frequency and loudness is swing size, and electricity as flowing electron coins pushed by voltage battery pressure.',
  misconceptions: [
    {
      misconception: 'A concave mirror always forms real images only.',
      correction: 'When an object is placed inside the focal length (between Pole P and Focus F), a concave mirror forms an erect, virtual, and magnified image (shaving/dental mirror case).',
    },
    {
      misconception: 'Focal length and radius of curvature are identical (f = R).',
      correction: 'For spherical mirrors, focus F is exactly halfway between Pole P and Center C, so f = R / 2.',
    },
    {
      misconception: 'Infrasonic waves travel slower than ultrasonic waves in the same air.',
      correction: 'All sound frequencies travel at the identical wave speed in a given medium (e.g. 340 m/s in air); low frequency simply yields proportionally longer wavelength (V = f·λ).',
    },
    {
      misconception: 'Supersonic and Ultrasonic mean the same thing.',
      correction: 'Ultrasonic is a frequency (> 20,000 Hz); Supersonic is a speed faster than sound (> 340 m/s, Mach number).',
    },
    {
      misconception: 'Electrons flow from positive to negative in a circuit.',
      correction: 'Electrons (negative carriers) drift from negative to positive terminal; conventional current is positive-to-negative.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the focal length of a concave mirror with R = 40 cm?', options: ['20 cm', '40 cm', '80 cm', '10 cm'], correctIndex: 0 },
    { question: 'What is the sign of focal length for a convex mirror under Cartesian convention?', options: ['Positive (+)', 'Negative (-)', 'Zero', 'Variable'], correctIndex: 0 },
    { question: 'Sound waves in air are classified as:', options: ['Longitudinal mechanical waves', 'Transverse electromagnetic waves', 'Torsional waves', 'Surface capillary waves'], correctIndex: 0 },
    { question: 'What is the audible frequency range of normal human hearing?', options: ['20 Hz to 20,000 Hz', '0 Hz to 100 Hz', '20 kHz to 2 MHz', '1 Hz to 10 Hz'], correctIndex: 0 },
    { question: 'Which frequency is classified as Infrasonic?', options: ['12 Hz', '500 Hz', '25,000 Hz', '1 MHz'], correctIndex: 0 },
    { question: 'What is the SI unit of electric charge?', options: ['Coulomb (C)', 'Ampere (A)', 'Volt (V)', 'Ohm (Ω)'], correctIndex: 0 },
    { question: 'If 10 C passes a cross-section in 2 s, the current is:', options: ['5 A', '20 A', '0.2 A', '12 A'], correctIndex: 0 },
    { question: '1 Volt is equivalent to:', options: ['1 Joule / Coulomb', '1 Coulomb / Second', '1 Newton / Meter', '1 Watt / Second'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of mirror ray geometry, mirror formulas with sign conventions, mechanical wave calculations, acoustic classifications, quantisation of charge, current, and potential difference.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Concave Mirror Ray Optics & Virtual Image Transition',
    instruction: 'Drag the Object Distance slider (u) from beyond C to inside F. Watch how the real inverted image suddenly morphs into an enlarged virtual image behind the mirror!',
    interactionType: 'slider-optics',
    nodeId: NODE_C9_PHY_031,
  },
  {
    title: 'Lab 2: Mechanical Waves — Transverse vs Longitudinal Simulation',
    instruction: 'Toggle between Transverse (rope particles bobbing vertically) and Longitudinal (air compressions/rarefactions oscillating horizontally). Adjust frequency to see wavelength scale in real-time!',
    interactionType: 'wave-toggle',
    nodeId: NODE_C9_PHY_033,
  },
  {
    title: 'Lab 3: The Acoustic Spectrum — Infrasound, Sonic & Sonar Ultrasound',
    instruction: 'Drag the acoustic frequency slider across 1 Hz to 50,000 Hz. Observe elephant communication, human voice resonance, and submarine SONAR pulse reflections.',
    interactionType: 'frequency-slider',
    nodeId: NODE_C9_PHY_035,
  },
  {
    title: 'Lab 4: Charge Quantisation (Q = ne) & Electron Drift',
    instruction: 'Adjust the electron count slider (n) to witness discrete charge multiples (1.6·10^-19 C). Notice that charge is strictly stepped and never fractional!',
    interactionType: 'charge-quant',
    nodeId: NODE_C9_PHY_038,
  },
  {
    title: 'Lab 5: DC Circuit Dynamics — Voltage Push (V = W/Q) & Current Flow',
    instruction: 'Adjust battery Voltage (V) and circuit Resistance (R). Observe how potential difference pushes charge packets, changing electron drift rate and bulb brightness.',
    interactionType: 'circuit-voltage',
    nodeId: NODE_C9_PHY_040,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Submarine Sonar & Vehicle Mirror Field Engineer',
  description: 'Apply your physics skills: 1) Verify why ambulance wing mirrors use convex curved glass (wide field of view, always erect). 2) Calculate seabed depth using ultrasonic echo returns. 3) Compute domestic electricity consumption using Q = I·t and V = W/Q.',
  steps: [
    'Inspect a car side-view mirror: observe the wide virtual image and identify it as convex.',
    'Calculate the time delay for an ultrasonic echo pulse reflected from a submarine hull 750 m away in seawater (V = 1500 m/s).',
    'Calculate the number of electrons flowing through a smartphone charger drawing 2.0 A for 1 hour (Q = 7200 C, n = Q/e).',
    'Document your findings in a Physics Field Log and share with classmates.',
  ],
};

// ═══════════════════════════════════════════════════════════════════
// MAIN SIMULATION COMPONENT
// ═══════════════════════════════════════════════════════════════════
function C9_PhysicsSphericalMirrorsTermsSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'blue' };

  // ─── CORE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Interaction State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState<Record<number, boolean>>({});
  const [observationAnswered, setObservationAnswered] = useState<Record<number, number>>({});

  // Lab 1: Optics State
  const [objectDistU, setObjectDistU] = useState(24);
  const [focalLengthF, setFocalLengthF] = useState(10);
  const [mirrorType, setMirrorType] = useState<'concave' | 'convex'>('concave');
  const [objectHeightH] = useState(4);

  // Lab 2: Waves State
  const [waveMode, setWaveMode] = useState<'transverse' | 'longitudinal'>('transverse');
  const [waveFreq, setWaveFreq] = useState(2);
  const [waveSpeed, setWaveSpeed] = useState(340);
  const [waveAmp] = useState(30);

  // Lab 3: Acoustic Spectrum State
  const [acousticFreq, setAcousticFreq] = useState(1000);
  const [sonarDistance, setSonarDistance] = useState(300);

  // Lab 4 & 5: Quantisation & Electrodynamics State
  const [electronCountN, setElectronCountN] = useState(4);
  const [circuitVoltage, setCircuitVoltage] = useState(12);
  const [circuitResistance, setCircuitResistance] = useState(6);
  const [circuitTime] = useState(10);

  // Challenge Interaction State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag and Drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual & Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED OPTICS CALCULATIONS ───
  const opticsCalculations = useMemo(() => {
    const f = mirrorType === 'concave' ? -focalLengthF : focalLengthF;
    const u = -objectDistU;
    const invV = 1 / f - 1 / u;
    const v = Math.abs(invV) < 0.0001 ? -9999 : 1 / invV;
    const m = -v / u;
    const imageH = objectHeightH * m;
    const isReal = v < 0 && mirrorType === 'concave';
    const isMagnified = Math.abs(m) > 1;
    const isErect = m > 0;
    return { f, u, v, m, imageH, isReal, isMagnified, isErect };
  }, [objectDistU, focalLengthF, mirrorType, objectHeightH]);

  // ─── DERIVED WAVE & CIRCUIT CALCULATIONS ───
  const waveWavelength = useMemo(() => {
    return waveFreq > 0 ? (waveSpeed / waveFreq).toFixed(2) : '0';
  }, [waveSpeed, waveFreq]);

  const acousticCategory = useMemo(() => {
    if (acousticFreq < 20) return { category: 'Infrasonic', desc: 'Inaudible to humans (Earthquakes, Elephant rumbles, Ocean waves)', color: 'text-purple-400' };
    if (acousticFreq <= 20000) return { category: 'Sonic (Audible)', desc: 'Audible human range (Human speech 300-3400 Hz, Music 50-5000 Hz)', color: 'text-emerald-400' };
    return { category: 'Ultrasonic', desc: 'Inaudible high frequency (Submarine SONAR, Medical Ultrasound, Bat echolocation)', color: 'text-cyan-400' };
  }, [acousticFreq]);

  const electroCalculations = useMemo(() => {
    const currentI = circuitResistance > 0 ? circuitVoltage / circuitResistance : 0;
    const chargeQ = currentI * circuitTime;
    const workW = circuitVoltage * chargeQ;
    const totalChargeElementary = electronCountN * 1.6e-19;
    return { currentI, chargeQ, workW, totalChargeElementary };
  }, [circuitVoltage, circuitResistance, circuitTime, electronCountN]);

  // ─── ADAPTIVE CHALLENGES FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECTS ───
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
    const newDiff = mastery === 'not-started' || mastery === 'beginner'
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

  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.05 * waveFreq;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (waveMode === 'transverse') {
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * 0.03 - time) * waveAmp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        for (let x = 40; x < canvas.width; x += 60) {
          const y = canvas.height / 2 + Math.sin(x * 0.03 - time) * waveAmp;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#f43f5e';
          ctx.fill();

          ctx.beginPath();
          ctx.strokeStyle = '#fda4af';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.moveTo(x, canvas.height / 2 - waveAmp);
          ctx.lineTo(x, canvas.height / 2 + waveAmp);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      } else {
        const numParticles = 40;
        const spacing = canvas.width / numParticles;
        for (let i = 0; i < numParticles; i++) {
          const basePos = i * spacing;
          const displacement = Math.sin(basePos * 0.03 - time) * (waveAmp * 0.6);
          const currentPos = basePos + displacement;
          const density = (Math.cos(basePos * 0.03 - time) + 1) / 2;
          ctx.fillStyle = `rgba(56, 189, 248, ${0.3 + density * 0.7})`;
          ctx.fillRect(currentPos - 1, 20, 3, canvas.height - 40);

          ctx.beginPath();
          ctx.arc(currentPos, canvas.height / 2, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, waveMode, waveFreq, waveAmp]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
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
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete step-by-step ICSE physics solution.');
    }
  }, [hintCount, challenge]);

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
    speechManager.speak('Welcome to the Physics Interactive Labs. Manipulate each simulation to discover the laws of optics, waves, and electrodynamics!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode unlocked! Experiment with all parameters without any grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase Initiated! Put your skills to the test with real-world ICSE problems.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((predIndex: number, optionIndex: number) => {
    setPredictionMade(prev => ({ ...prev, [predIndex]: true }));
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now manipulate the simulation slider to test your hypothesis in real time.');
  }, []);

  const handleObservation = useCallback((obsIndex: number, optionIndex: number) => {
    setObservationAnswered(prev => ({ ...prev, [obsIndex]: optionIndex }));
    const isCorrect = optionIndex === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! That directly aligns with the physics formula.' : 'Observe the visualization carefully as you adjust the controls.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You achieved a mastery score of ${finalScore} percent.`);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
      speechManager.speak('Correct! Excellent physics application.');
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
        speechManager.speak('Hints exhausted. Let us review the correct physics deduction.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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
      const base = prev.length === challenge.sortItems?.length ? prev : challenge.sortItems?.map((_, i) => i) || [];
      const arr = [...base];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  const handleResetLab = useCallback(() => {
    setObjectDistU(24);
    setFocalLengthF(10);
    setMirrorType('concave');
    setWaveFreq(2);
    setWaveMode('transverse');
    setAcousticFreq(1000);
    setCircuitVoltage(12);
    setCircuitResistance(6);
    audioManager.play('pop');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-blue-900/40 rounded-2xl border border-blue-700/50" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">Class 9 ICSE Physics • 10 Core Syllabus Nodes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600/50'
                : difficulty === 'standard'
                ? 'bg-blue-950/60 text-blue-400 border-blue-600/50'
                : 'bg-purple-950/60 text-purple-400 border-purple-600/50'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Mastery: <strong className="text-indigo-300 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-blue-950/60 rounded-2xl border border-indigo-700/50 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span aria-hidden="true">🚀</span> Narrative Scenario
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300 mt-2 bg-indigo-900/40 p-2 rounded-lg border border-indigo-800/40">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Discovery Hook (No Grading Pressure)</span>
              <span className="text-xs text-slate-500">Predict & Think</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-800/50 border-slate-700 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span><span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! High frequency yields pinpoint resolution without spreading!' : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive labs"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <span className="text-blue-400" aria-hidden="true">🔬</span> Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetLab}
              aria-label="Reset lab parameters to defaults"
              className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
            >
              Reset Values
            </motion.button>
          </div>

          <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl text-xs md:text-sm text-blue-200">
            👉 <strong className="text-white">Instruction:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </div>

          {/* ─── LAB CONTENT ACCORDING TO SLIDE ─── */}
          <div className="bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-800 shadow-inner">
            {/* LAB 1: SPHERICAL MIRRORS RAY OPTICS (SVG 1) */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-400 font-bold" id="mirror-type-label">Mirror Type:</label>
                    <button
                      onClick={() => setMirrorType('concave')}
                      aria-label={`Select Concave mirror with focal length minus ${focalLengthF} cm`}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        mirrorType === 'concave' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Concave (f = -{focalLengthF} cm)
                    </button>
                    <button
                      onClick={() => setMirrorType('convex')}
                      aria-label={`Select Convex mirror with focal length plus ${focalLengthF} cm`}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        mirrorType === 'convex' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Convex (f = +{focalLengthF} cm)
                    </button>
                  </div>
                  <div className="text-xs text-slate-300">
                    Radius R: <strong className="text-blue-400">{focalLengthF * 2} cm</strong> (f = R/2)
                  </div>
                </div>

                {/* SVG 1: RAY OPTICS DIAGRAM */}
                <div className="bg-slate-950 rounded-xl p-2 border border-slate-800 overflow-hidden">
                  <svg viewBox="0 0 700 300" role="img" aria-label="Spherical mirror ray tracing optical diagram" className="w-full h-64 md:h-80">
                    <line x1="20" y1="150" x2="680" y2="150" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="630" y="140" fill="#94a3b8" fontSize="10">Principal Axis</text>

                    {mirrorType === 'concave' ? (
                      <path d="M 400 30 Q 380 150 400 270" fill="none" stroke="#38bdf8" strokeWidth="4" />
                    ) : (
                      <path d="M 400 30 Q 420 150 400 270" fill="none" stroke="#38bdf8" strokeWidth="4" />
                    )}
                    <line x1="400" y1="30" x2="410" y2="25" stroke="#64748b" strokeWidth="1" />
                    <line x1="400" y1="150" x2="410" y2="150" stroke="#64748b" strokeWidth="1" />
                    <line x1="400" y1="270" x2="410" y2="275" stroke="#64748b" strokeWidth="1" />

                    <circle cx="400" cy="150" r="4" fill="#38bdf8" />
                    <text x="395" y="170" fill="#38bdf8" fontSize="12" fontWeight="bold">P</text>

                    {mirrorType === 'concave' ? (
                      <>
                        <circle cx={400 - focalLengthF * 10} cy="150" r="4" fill="#fbbf24" />
                        <text x={400 - focalLengthF * 10 - 5} y="170" fill="#fbbf24" fontSize="12" fontWeight="bold">F</text>
                        <circle cx={400 - focalLengthF * 20} cy="150" r="4" fill="#f43f5e" />
                        <text x={400 - focalLengthF * 20 - 5} y="170" fill="#f43f5e" fontSize="12" fontWeight="bold">C</text>
                      </>
                    ) : (
                      <>
                        <circle cx={400 + focalLengthF * 10} cy="150" r="4" fill="#fbbf24" />
                        <text x={400 + focalLengthF * 10 - 5} y="170" fill="#fbbf24" fontSize="12" fontWeight="bold">F</text>
                        <circle cx={400 + focalLengthF * 20} cy="150" r="4" fill="#f43f5e" />
                        <text x={400 + focalLengthF * 20 - 5} y="170" fill="#f43f5e" fontSize="12" fontWeight="bold">C</text>
                      </>
                    )}

                    {/* Object Arrow */}
                    <g>
                      <line
                        x1={400 - objectDistU * 10}
                        y1="150"
                        x2={400 - objectDistU * 10}
                        y2={150 - objectHeightH * 10}
                        stroke="#22c55e"
                        strokeWidth="4"
                      />
                      <polygon
                        points={`${400 - objectDistU * 10 - 4},${150 - objectHeightH * 10 + 6} ${400 - objectDistU * 10 + 4},${150 - objectHeightH * 10 + 6} ${400 - objectDistU * 10},${150 - objectHeightH * 10}`}
                        fill="#22c55e"
                      />
                      <text x={400 - objectDistU * 10 - 15} y={150 - objectHeightH * 10 - 6} fill="#22c55e" fontSize="11" fontWeight="bold">
                        Object (u = -{objectDistU}cm)
                      </text>
                    </g>

                    {/* Image Arrow */}
                    {Math.abs(opticsCalculations.v) < 60 && (
                      <g>
                        <line
                          x1={400 + opticsCalculations.v * 10}
                          y1="150"
                          x2={400 + opticsCalculations.v * 10}
                          y2={150 - opticsCalculations.imageH * 10}
                          stroke="#ec4899"
                          strokeWidth="4"
                          strokeDasharray={opticsCalculations.isReal ? '' : '4 2'}
                        />
                        <polygon
                          points={`${400 + opticsCalculations.v * 10 - 4},${150 - opticsCalculations.imageH * 10 + (opticsCalculations.isErect ? 6 : -6)} ${400 + opticsCalculations.v * 10 + 4},${150 - opticsCalculations.imageH * 10 + (opticsCalculations.isErect ? 6 : -6)} ${400 + opticsCalculations.v * 10},${150 - opticsCalculations.imageH * 10}`}
                          fill="#ec4899"
                        />
                        <text x={400 + opticsCalculations.v * 10 - 20} y={150 - opticsCalculations.imageH * 10 + (opticsCalculations.isErect ? -8 : 16)} fill="#ec4899" fontSize="11" fontWeight="bold">
                          Image (v = {opticsCalculations.v.toFixed(1)}cm)
                        </text>
                      </g>
                    )}

                    {/* Principal Rays */}
                    <line x1={400 - objectDistU * 10} y1={150 - objectHeightH * 10} x2="400" y2={150 - objectHeightH * 10} stroke="#f59e0b" strokeWidth="1.5" />
                    {mirrorType === 'concave' ? (
                      <>
                        <line x1="400" y1={150 - objectHeightH * 10} x2="100" y2={150 + (objectHeightH * 10 * (300 / (focalLengthF * 10)))} stroke="#f59e0b" strokeWidth="1.5" />
                        {!opticsCalculations.isReal && (
                          <line x1="400" y1={150 - objectHeightH * 10} x2="600" y2={150 - (objectHeightH * 10 * (200 / (focalLengthF * 10)))} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                        )}
                      </>
                    ) : (
                      <>
                        <line x1="400" y1={150 - objectHeightH * 10} x2="200" y2={150 - objectHeightH * 10 - 80} stroke="#f59e0b" strokeWidth="1.5" />
                        <line x1="400" y1={150 - objectHeightH * 10} x2={400 + focalLengthF * 10} y2="150" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Sliders and Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Object Distance (u):</span>
                      <strong className="text-emerald-400">{objectDistU} cm</strong>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={36}
                      step={1}
                      value={objectDistU}
                      aria-label="Adjust Object Distance in centimeters"
                      onChange={e => {
                        setObjectDistU(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500"
                    />

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Focal Length (|f|):</span>
                      <strong className="text-amber-400">{focalLengthF} cm</strong>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={18}
                      step={1}
                      value={focalLengthF}
                      aria-label="Adjust Focal Length in centimeters"
                      onChange={e => {
                        setFocalLengthF(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Mirror Formula:</span>
                      <code className="text-indigo-300 font-bold">1/f = 1/u + 1/v</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Calculated Image Distance (v):</span>
                      <strong className={opticsCalculations.v < 0 ? 'text-emerald-400' : 'text-purple-400'}>
                        {opticsCalculations.v.toFixed(2)} cm ({opticsCalculations.v < 0 ? 'In Front (Real)' : 'Behind (Virtual)'})
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Linear Magnification (m = -v/u):</span>
                      <strong className="text-cyan-400">{opticsCalculations.m.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nature & Orientation:</span>
                      <strong className="text-amber-300">
                        {opticsCalculations.isReal ? 'Real & Inverted' : 'Virtual & Erect'} ({opticsCalculations.isMagnified ? 'Magnified' : 'Diminished'})
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Prediction 1 */}
                {!predictionMade[0] && (
                  <div className="p-4 bg-indigo-950/40 border border-indigo-700/50 rounded-xl space-y-3">
                    <p className="text-xs font-bold text-indigo-300 uppercase">🤔 Prediction 1: Ray Optics</p>
                    <p className="text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(0, i)}
                          aria-label={`Prediction option ${i + 1}: ${opt}`}
                          className="p-3 text-left bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Observation 1 */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-cyan-300 uppercase">👁️ Observation 1: What do you notice?</p>
                  <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => {
                      const answered = observationAnswered[0] !== undefined;
                      const isCorrect = i === OBSERVATION_QUESTIONS[0].correctIndex;
                      const isChosen = observationAnswered[0] === i;
                      return (
                        <button
                          key={i}
                          onClick={() => handleObservation(0, i)}
                          disabled={answered}
                          className={`p-3 text-left rounded-lg border text-xs transition-all ${
                            answered && isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : answered && isChosen
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: MECHANICAL WAVES (CANVAS + SVG 2: WAVE ANATOMY) */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-400 font-bold">Wave Type:</label>
                    <button
                      onClick={() => {
                        setWaveMode('transverse');
                        audioManager.play('tap');
                      }}
                      aria-label="Select Transverse Wave mode"
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        waveMode === 'transverse' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Transverse (Perpendicular)
                    </button>
                    <button
                      onClick={() => {
                        setWaveMode('longitudinal');
                        audioManager.play('tap');
                      }}
                      aria-label="Select Longitudinal Wave mode"
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        waveMode === 'longitudinal' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Longitudinal (Parallel)
                    </button>
                  </div>
                  <div className="text-xs text-slate-300">
                    Equation: <strong className="text-sky-400 font-bold">V = f · λ</strong>
                  </div>
                </div>

                {/* HTML5 Canvas Animation */}
                <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                  <canvas ref={waveCanvasRef} width={680} height={180} className="w-full h-44 rounded-lg" />
                </div>

                {/* SVG 2: WAVE ANATOMY DIAGRAM */}
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-2">Wave Anatomy & Physics Terminology</span>
                  <svg viewBox="0 0 680 140" role="img" aria-label="Diagram of transverse and longitudinal wave parameters showing wavelength lambda and amplitude" className="w-full h-32">
                    <line x1="20" y1="70" x2="660" y2="70" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                    
                    {/* Transverse Wave Curve */}
                    <path d="M 40 70 Q 100 15 160 70 T 280 70 T 400 70" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                    
                    {/* Labels on Transverse Wave */}
                    <circle cx="100" cy="15" r="4" fill="#f43f5e" />
                    <text x="105" y="20" fill="#f43f5e" fontSize="10" fontWeight="bold">Crest</text>
                    
                    <circle cx="220" cy="125" r="4" fill="#a855f7" />
                    <text x="225" y="130" fill="#a855f7" fontSize="10" fontWeight="bold">Trough</text>

                    {/* Wavelength Arrow */}
                    <line x1="100" y1="35" x2="340" y2="35" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="190" y="30" fill="#fbbf24" fontSize="11" fontWeight="bold">Wavelength (λ)</text>

                    {/* Amplitude Arrow */}
                    <line x1="280" y1="70" x2="280" y2="15" stroke="#34d399" strokeWidth="1.5" />
                    <text x="288" y="45" fill="#34d399" fontSize="10" fontWeight="bold">Amp (a)</text>

                    {/* Longitudinal representation on the right */}
                    <g transform="translate(420, 20)">
                      <rect x="10" y="15" width="230" height="70" rx="8" fill="#0f172a" stroke="#1e293b" />
                      <text x="20" y="35" fill="#38bdf8" fontSize="10" fontWeight="bold">Longitudinal Sound Wave</text>
                      <text x="20" y="55" fill="#94a3b8" fontSize="9">Compressions (High P) + Rarefactions (Low P)</text>
                      <text x="20" y="73" fill="#cbd5e1" fontSize="9">Speed in air: ~340 m/s | Water: ~1500 m/s</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Frequency (f):</span>
                      <strong className="text-sky-400">{waveFreq} Hz</strong>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={5}
                      step={0.5}
                      value={waveFreq}
                      aria-label="Adjust Wave frequency in Hertz"
                      onChange={e => {
                        setWaveFreq(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-sky-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Wave Speed in Medium (V):</span>
                      <strong className="text-emerald-400">{waveSpeed} m/s</strong>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1500}
                      step={50}
                      value={waveSpeed}
                      aria-label="Adjust Wave speed in meters per second"
                      onChange={e => {
                        setWaveSpeed(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 flex flex-col justify-center">
                    <span className="text-slate-400">Calculated Wavelength (λ = V/f):</span>
                    <strong className="text-amber-400 text-lg">{waveWavelength} meters</strong>
                    <span className="text-slate-500">Period T = {(1 / waveFreq).toFixed(2)} s</span>
                  </div>
                </div>

                {/* Prediction 2 */}
                {!predictionMade[1] && (
                  <div className="p-4 bg-indigo-950/40 border border-indigo-700/50 rounded-xl space-y-3">
                    <p className="text-xs font-bold text-indigo-300 uppercase">🤔 Prediction 2: Wave Mechanics</p>
                    <p className="text-sm text-slate-200">{PREDICTION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(1, i)}
                          aria-label={`Prediction option ${i + 1}: ${opt}`}
                          className="p-3 text-left bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Observation 2 */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-cyan-300 uppercase">👁️ Observation 2: What do you notice?</p>
                  <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[1].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => {
                      const answered = observationAnswered[1] !== undefined;
                      const isCorrect = i === OBSERVATION_QUESTIONS[1].correctIndex;
                      const isChosen = observationAnswered[1] === i;
                      return (
                        <button
                          key={i}
                          onClick={() => handleObservation(1, i)}
                          disabled={answered}
                          className={`p-3 text-left rounded-lg border text-xs transition-all ${
                            answered && isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : answered && isChosen
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: ACOUSTIC SPECTRUM & SONAR (SVG 3) */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Acoustic Frequency:</span>
                    <strong className="text-lg font-black text-cyan-400">{acousticFreq >= 1000 ? `${(acousticFreq / 1000).toFixed(1)} kHz` : `${acousticFreq} Hz`}</strong>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={50000}
                    step={50}
                    value={acousticFreq}
                    aria-label="Adjust acoustic frequency in Hertz"
                    onChange={e => {
                      setAcousticFreq(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-cyan-500"
                  />

                  {/* Spectrum Visual Band */}
                  <div className="relative h-10 rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center text-[10px] font-bold">
                    <div className="w-[10%] h-full bg-purple-950/80 border-r border-purple-500 flex items-center justify-center text-purple-300">
                      Infrasonic (&lt;20Hz)
                    </div>
                    <div className="w-[50%] h-full bg-emerald-950/80 border-r border-emerald-500 flex items-center justify-center text-emerald-300">
                      Sonic Audible Range (20 Hz - 20,000 Hz)
                    </div>
                    <div className="w-[40%] h-full bg-cyan-950/80 flex items-center justify-center text-cyan-300">
                      Ultrasonic (&gt;20,000 Hz)
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 font-semibold">Spectrum Classification: </span>
                    <span className={`font-bold ${acousticCategory.color}`}>{acousticCategory.category}</span>
                    <p className="text-slate-300 text-xs mt-1">{acousticCategory.desc}</p>
                  </div>
                </div>

                {/* SVG 3: UNDERWATER SUBMARINE SONAR PULSE & ECHO DIAGRAM */}
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                    SONAR Acoustic Pulse & Echo Distance Mechanism (d = V·t / 2)
                  </span>
                  <svg viewBox="0 0 680 180" role="img" aria-label="Underwater SONAR pulse reflection diagram from submarine to seabed" className="w-full h-44">
                    {/* Water Background */}
                    <rect x="10" y="10" width="660" height="160" rx="10" fill="#032030" stroke="#0e7490" strokeWidth="1.5" />
                    
                    {/* Submarine */}
                    <g transform="translate(60, 30)">
                      <ellipse cx="60" cy="25" rx="55" ry="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <rect x="50" y="5" width="20" height="10" fill="#334155" />
                      <line x1="60" y1="5" x2="60" y2="0" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="60" cy="0" r="2" fill="#22c55e" />
                      <text x="35" y="28" fill="#e2e8f0" fontSize="9" fontWeight="bold">Submarine</text>
                    </g>

                    {/* Seabed Obstacle */}
                    <g transform="translate(480, 50)">
                      <path d="M 0 110 Q 50 20 100 70 Q 140 10 180 110 Z" fill="#334155" stroke="#64748b" />
                      <text x="60" y="100" fill="#cbd5e1" fontSize="10" fontWeight="bold">Seabed / Obstacle</text>
                    </g>

                    {/* Ultrasonic Beam Transmit (Cyan) */}
                    <path d="M 175 55 Q 320 50 480 80" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="6 4" />
                    <text x="240" y="45" fill="#22d3ee" fontSize="10" fontWeight="bold">Transmitted Pulse (f &gt; 20 kHz)</text>

                    {/* Reflected Echo Beam (Amber) */}
                    <path d="M 480 85 Q 320 125 175 65" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="270" y="125" fill="#fbbf24" fontSize="10" fontWeight="bold">Reflected Echo Return</text>

                    {/* Depth Distance Dimension */}
                    <line x1="175" y1="145" x2="480" y2="145" stroke="#94a3b8" strokeWidth="1" />
                    <text x="280" y="160" fill="#94a3b8" fontSize="10">d = {sonarDistance} m</text>
                  </svg>
                </div>

                {/* Sonar Depth Slider */}
                <div className="p-4 bg-gradient-to-r from-blue-950/70 to-slate-950 rounded-xl border border-blue-800/50 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-300 font-bold">Submarine SONAR Target Distance (Seawater V = 1500 m/s):</span>
                    <strong className="text-cyan-300">{sonarDistance} meters depth</strong>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={1200}
                    step={25}
                    value={sonarDistance}
                    aria-label="Adjust submarine sonar target depth in meters"
                    onChange={e => {
                      setSonarDistance(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs bg-slate-900 p-2 rounded-lg text-slate-300">
                    <span>Two-Way Transit Time: <strong className="text-amber-400">{((2 * sonarDistance) / 1500).toFixed(3)} s</strong></span>
                    <span>Echo Formula: <code className="text-indigo-300">d = (V · t) / 2</code></span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: CHARGE QUANTISATION (SVG 4: QUANTISATION TRAY) */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Integer Number of Elementary Charges (n):</span>
                    <strong className="text-xl font-black text-amber-400">{electronCountN} e</strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={electronCountN}
                    aria-label="Adjust number of elementary charges"
                    onChange={e => {
                      setElectronCountN(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-amber-500"
                  />

                  {/* SVG 4: CHARGE QUANTISATION DIAGRAM */}
                  <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                      Discrete Elementary Charge Packets (Q = n · e)
                    </span>
                    <svg viewBox="0 0 680 120" role="img" aria-label="Charge quantisation diagram showing discrete electron packets of 1.6 times 10 to the power minus 19 Coulombs" className="w-full h-28">
                      <rect x="10" y="10" width="660" height="100" rx="8" fill="#0f172a" stroke="#334155" />
                      {Array.from({ length: 10 }).map((_, i) => {
                        const active = i < electronCountN;
                        const cx = 50 + i * 62;
                        return (
                          <g key={i}>
                            <circle
                              cx={cx}
                              cy="50"
                              r="22"
                              fill={active ? '#f59e0b' : '#1e293b'}
                              stroke={active ? '#fbbf24' : '#475569'}
                              strokeWidth="2"
                            />
                            <text
                              x={cx}
                              y="54"
                              textAnchor="middle"
                              fill={active ? '#09090b' : '#64748b'}
                              fontSize="12"
                              fontWeight="bold"
                            >
                              -e
                            </text>
                            <text
                              x={cx}
                              y="88"
                              textAnchor="middle"
                              fill={active ? '#fbbf24' : '#475569'}
                              fontSize="9"
                            >
                              n={i + 1}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400">Quantisation Law:</span>
                      <p className="text-slate-200 font-bold text-sm mt-1">Q = n · e</p>
                      <span className="text-slate-500">Elementary charge e = 1.6 × 10⁻¹⁹ C</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Total Net Charge:</span>
                      <p className="text-amber-400 font-mono font-bold text-sm mt-1">
                        {(electronCountN * 1.6).toFixed(1)} × 10⁻¹⁹ C
                      </p>
                      <span className="text-slate-500">Notice: Fractional values (e.g. 2.4×10⁻¹⁹ C) are physically impossible!</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: DC CIRCUIT DYNAMICS (SVG 5: CIRCUIT SCHEMATIC) */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                {/* SVG 5: COMPLETE CLOSED LOOP DC CIRCUIT DIAGRAM */}
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                    Closed DC Circuit Loop: Source, Key, Controller, Ammeter & Load
                  </span>
                  <svg viewBox="0 0 680 160" role="img" aria-label="DC Circuit schematic with Battery, Switch Key, Rheostat, Ammeter, and Resistor" className="w-full h-40">
                    <rect x="40" y="30" width="600" height="100" fill="none" stroke="#475569" strokeWidth="3" rx="8" />
                    
                    {/* Battery at Top Center */}
                    <rect x="290" y="15" width="100" height="30" fill="#0f172a" stroke="#22c55e" strokeWidth="2" rx="4" />
                    <text x="300" y="34" fill="#22c55e" fontSize="12" fontWeight="bold">+ {circuitVoltage}V - (Cell)</text>

                    {/* Ammeter on Left */}
                    <circle cx="40" cy="80" r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="35" y="84" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
                    <text x="65" y="84" fill="#38bdf8" fontSize="10">{electroCalculations.currentI.toFixed(2)} A</text>

                    {/* Rheostat on Right */}
                    <rect x="620" y="60" width="40" height="40" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" rx="4" />
                    <text x="626" y="83" fill="#fbbf24" fontSize="9" fontWeight="bold">Rheo</text>

                    {/* Load Resistor at Bottom */}
                    <rect x="280" y="115" width="120" height="30" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" rx="4" />
                    <text x="295" y="134" fill="#f59e0b" fontSize="11" fontWeight="bold">Load: {circuitResistance} Ω</text>

                    {/* Conventional Current Arrow */}
                    <path d="M 440 25 L 480 25" stroke="#ef4444" strokeWidth="2" />
                    <text x="430" y="18" fill="#ef4444" fontSize="9">Conventional (+ to -)</text>

                    {/* Electron Drift Arrow */}
                    <path d="M 240 25 L 200 25" stroke="#38bdf8" strokeWidth="2" />
                    <text x="170" y="18" fill="#38bdf8" fontSize="9">Electrons (- to +)</text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Potential Difference (V):</span>
                      <strong className="text-emerald-400">{circuitVoltage} V</strong>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={24}
                      step={2}
                      value={circuitVoltage}
                      aria-label="Adjust circuit voltage in Volts"
                      onChange={e => {
                        setCircuitVoltage(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Resistance (R):</span>
                      <strong className="text-amber-400">{circuitResistance} Ω</strong>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={20}
                      step={1}
                      value={circuitResistance}
                      aria-label="Adjust circuit resistance in Ohms"
                      onChange={e => {
                        setCircuitResistance(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 flex flex-col justify-center">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current (I = V/R):</span>
                      <strong className="text-sky-400">{electroCalculations.currentI.toFixed(2)} A</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Work Done W (V·Q):</span>
                      <strong className="text-purple-400">{electroCalculations.workW.toFixed(1)} J</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                aria-label="Go to next lab"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter free play sandbox mode"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span aria-hidden="true">🎮</span> Free Play Sandbox
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore without instructions or timers. Test optical geometries, acoustic frequencies, or circuit loops at your own pace!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready to start challenge questions"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 whitespace-nowrap"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-blue-400 uppercase">Interactive Optics Workbench</h4>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Object Distance:</span>
                <strong className="text-emerald-400">{objectDistU} cm</strong>
              </div>
              <input
                type="range"
                min={2}
                max={36}
                value={objectDistU}
                aria-label="Sandbox Object distance in centimeters"
                onChange={e => setObjectDistU(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-1">
                <p className="text-slate-300">Image Distance v: <strong className="text-sky-300">{opticsCalculations.v.toFixed(1)} cm</strong></p>
                <p className="text-slate-300">Magnification m: <strong className="text-purple-300">{opticsCalculations.m.toFixed(2)}</strong></p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase">Circuit & Charge Workbench</h4>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Voltage Push:</span>
                <strong className="text-emerald-400">{circuitVoltage} V</strong>
              </div>
              <input
                type="range"
                min={2}
                max={24}
                value={circuitVoltage}
                aria-label="Sandbox Voltage in Volts"
                onChange={e => setCircuitVoltage(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-1">
                <p className="text-slate-300">Current Flow I: <strong className="text-sky-300">{electroCalculations.currentI.toFixed(2)} A</strong></p>
                <p className="text-slate-300">Charge Moved (in 10s): <strong className="text-amber-300">{electroCalculations.chargeQ.toFixed(1)} C</strong></p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h3 className="text-sm font-semibold text-indigo-300 mt-0.5">
                Competency: <span className="capitalize text-white font-bold">{challenge.competencyLevel}</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={answerRevealed || hintCount >= 3}
                aria-label={`Show hint number ${hintCount + 1}`}
                className="px-3 py-1 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 rounded-lg text-xs font-bold disabled:opacity-40"
              >
                💡 Hint ({hintCount}/3)
              </motion.button>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <p className="text-base md:text-lg font-semibold leading-relaxed mb-6">{challenge.question}</p>

            {/* MCQ Options */}
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
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span><span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}</span>
                    {showExplanation && i === challenge.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      aria-label={`Draggable label: ${item.label}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['target_center', 'target_focus', 'target_pole'].map(tid => (
                    <div
                      key={tid}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(tid)}
                      aria-label={`Drop target for ${tid.replace('target_', '')}`}
                      className="h-20 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center p-2 text-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Drop Here</span>
                      <strong className="text-xs text-sky-400 mt-1">
                        {droppedLabels[tid] ? `✓ ${droppedLabels[tid]}` : '— Empty —'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify diagram labels"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>{displayIdx + 1}. {item}</span>
                    <span className="text-slate-500 text-[10px]">↕ Drag to Reorder</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Check sequence order"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    aria-label="Enter calculated numerical answer"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-64 focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-slate-400 font-bold text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric answer"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Circuit */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-indigo-900/80 border border-indigo-600 text-white rounded-lg text-xs flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove part ${part}`}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above to assemble the closed loop circuit</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate assembled circuit loop"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  Validate Assembled Circuit
                </motion.button>
              </div>
            )}

            {/* Explanations */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-indigo-950/60 border border-indigo-700/50 rounded-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                    📘 ICSE Step-by-Step Physics Deduction:
                  </span>
                  <span className="text-xs text-indigo-400">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-indigo-400 mr-2">{idx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-indigo-900/50">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next deduction step"
                      className="px-4 py-2 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete simulation' : 'Go to next challenge'}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION SCREEN ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-blue-950/80 rounded-3xl border border-emerald-600/50 text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully calibrated the submarine optical periscopes, tuned SONAR acoustic transceivers, and mastered direct current circuits.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 font-bold uppercase">Final Score</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 font-bold uppercase">Mastery Tier</span>
                <p className="text-xl font-black text-indigo-300 mt-2 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 font-bold uppercase">Errors Encountered</span>
                <p className="text-3xl font-black text-rose-400 mt-1">{errors}</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-sm text-slate-200">
            <strong className="text-emerald-400">Feedback: </strong>
            {errors === 0
              ? '✓ Flawless execution! You have achieved 100% mastery across all 10 ICSE Physics nodes.'
              : errors <= 3
              ? '✓ Great performance! Your grasp of wave mechanics and mirror formulas is strong. Review the misconception notes below for full perfection.'
              : '⚠️ Good effort! Review the diagnostic explanations and repeat the interactive ray tracing and circuit labs to cement your understanding.'}
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/50 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide">
                ⚠️ Your Targeted Misconception Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map(idx => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">✗ Trap: {m.misconception}</p>
                      <p className="text-emerald-400">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-5 bg-amber-950/40 border border-amber-800/50 rounded-2xl text-xs text-amber-200">
            <strong className="font-bold text-amber-300">📅 Spaced Repetition Schedule: </strong>
            Next review scheduled in{' '}
            <strong className="text-white">
              {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
            </strong>{' '}
            to permanently lock these physical laws into long-term memory.
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">
              🌐 Real-World Physics Application: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Floating Dynamic Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_PhysicsSphericalMirrorsTermsSim;