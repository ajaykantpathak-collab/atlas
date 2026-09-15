'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 PHYSICS OPTICS NODES ───
const NODE_C12_PHY_081 = 'c12_phy_081'; // Dispersion through a prism
const NODE_C12_PHY_082 = 'c12_phy_082'; // Refraction at spherical surfaces
const NODE_C12_PHY_083 = 'c12_phy_083'; // Lens maker's formula
const NODE_C12_PHY_084 = 'c12_phy_084'; // Combination of thin lenses
const NODE_C12_PHY_085 = 'c12_phy_085'; // Power of a lens
const NODE_C12_PHY_086 = 'c12_phy_086'; // Compound microscope
const NODE_C12_PHY_087 = 'c12_phy_087'; // Astronomical telescope
const NODE_C12_PHY_088 = 'c12_phy_088'; // Huygens' principle and wavefronts
const NODE_C12_PHY_089 = 'c12_phy_089'; // Interference of light (principle)
const NODE_C12_PHY_090 = 'c12_phy_090'; // Young's double slit experiment

const ALL_NODE_IDS = [
  NODE_C12_PHY_081,
  NODE_C12_PHY_082,
  NODE_C12_PHY_083,
  NODE_C12_PHY_084,
  NODE_C12_PHY_085,
  NODE_C12_PHY_086,
  NODE_C12_PHY_087,
  NODE_C12_PHY_088,
  NODE_C12_PHY_089,
  NODE_C12_PHY_090,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Master Spectroscopist at Vainu Bappu Observatory',
  intro: 'You are the chief optical physicist designing the next-generation spectroscopic imaging suite at the Vainu Bappu Observatory in Kavalur, Tamil Nadu. A mysterious multi-band stellar signature has been detected from Alpha Centauri. To decipher its chemical composition, distance, and radial velocity, you must calibrate the dispersion prisms, thin-lens assemblies, compound microscope analyzers, astronomical telescopes, Huygens wave propagation systems, and Young interferometric stages.',
  context: 'Perform real-time ray-tracing calibrations, compute spherical curvature refractions, adjust thin-lens combinations, align compound microscope and telescope stages, and construct interference fringes to unlock deep cosmic signatures.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When white light enters a dense flint-glass prism, why does violet light bend much more sharply than red light?',
  options: [
    'Violet carries more mass so it is gravitationally pulled downwards in glass',
    'Violet has a shorter wavelength, causing a higher refractive index (Cauchy relation: n = A + B/λ²)',
    'Red light experiences higher physical friction against silica glass atoms',
    'The prism contains blue dye molecules that absorb and re-emit violet photons downwards',
  ],
  correctIndex: 1,
  hintAfter: 'Cauchy’s dispersion equation governs this: n(λ) = A + B/λ²! Let us dive into real-time multi-wavelength ray tracing to see this live.',
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

// ─── 26 COMPREHENSIVE CHALLENGES ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-8)
  {
    id: 'ch_01_dispersion_cauchy',
    nodeId: NODE_C12_PHY_081,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Cauchy’s empirical formula n = A + B/λ² + C/λ⁴, as the wavelength λ decreases from red (~700 nm) to violet (~400 nm), what happens to the refractive index n of the optical glass?',
    options: [
      'Refractive index n increases, causing greater angular deviation δ = (n - 1)A',
      'Refractive index n decreases, causing lesser angular deviation δ',
      'Refractive index remains strictly constant for all visible electromagnetic waves',
      'Refractive index becomes zero at 550 nm',
    ],
    correctIndex: 0,
    explanation: 'Because λ is in the denominator of Cauchy’s formula, shorter wavelengths (violet) experience a strictly higher refractive index: n_v > n_r. Through the thin-prism angular deviation equation δ = (n - 1)A, violet light undergoes the maximum deviation.',
    hints: [
      'Look at the position of λ² in Cauchy’s equation: it is in the denominator.',
      'Since λ_violet < λ_red, dividing by a smaller value of λ² yields a larger value for B/λ².',
      'A higher refractive index n means greater optical deceleration and greater refraction away from the incident path.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_spherical_formula',
    nodeId: NODE_C12_PHY_082,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which equation correctly represents paraxial refraction at a single spherical curved interface between medium n₁ and medium n₂ with radius of curvature R?',
    options: [
      'n₂/v - n₁/u = (n₂ - n₁)/R',
      'n₁/v - n₂/u = (n₂ - n₁)/R',
      '1/v - 1/u = (n₂ - n₁)/R',
      'n₂/v + n₁/u = (n₂ + n₁)/R',
    ],
    correctIndex: 0,
    explanation: 'Applying Snell’s law in the paraxial limit (sin θ ≈ tan θ ≈ θ) with New Cartesian Sign Conventions yields n₂/v - n₁/u = (n₂ - n₁)/R, where medium 1 contains the incident ray and medium 2 contains the refracted ray.',
    hints: [
      'The medium into which light enters is n₂ associated with image distance v.',
      'The medium from which light originates is n₁ associated with object distance u.',
      'The operator between image and object terms is subtraction (-).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_lens_power_sign',
    nodeId: NODE_C12_PHY_085,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An ophthalmologist prescribes a corrective spectacle lens with optical power P = -2.50 D. What is its focal length in centimetres and optical nature?',
    options: [
      'f = -40 cm, diverging (concave) lens',
      'f = +40 cm, converging (convex) lens',
      'f = -25 cm, cylindrical astigmatic lens',
      'f = -4.0 cm, plano-convex lens',
    ],
    correctIndex: 0,
    explanation: 'Optical power P = 1 / f(in metres). Thus, f = 1 / (-2.50) m = -0.40 m = -40 cm. The negative focal length indicates a diverging (concave) lens used for correcting myopia.',
    hints: [
      'Use the definition P = 1/f where f is expressed in metres.',
      'f = 1 / (-2.5) = -0.4 metres.',
      'Multiply -0.4 m by 100 to convert to -40 cm. Negative sign indicates concave.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_huygens_wavefront',
    nodeId: NODE_C12_PHY_088,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the geometric shape of the wavefront produced by a point source placed at the principal focus of a convex lens, and a long straight linear glowing filament in free space?',
    options: [
      'Plane wavefront from the lens; cylindrical wavefront from the linear filament',
      'Spherical wavefront from the lens; plane wavefront from the linear filament',
      'Cylindrical wavefront from the lens; spherical wavefront from the linear filament',
      'Ellipsoidal wavefront from both sources',
    ],
    correctIndex: 0,
    explanation: 'A point source at the focal point of a convex lens produces parallel emergent rays; surfaces perpendicular to parallel rays are planes (plane wavefront). A linear filament source radiates waves with axial symmetry, forming expanding coaxial cylindrical wavefronts.',
    hints: [
      'Parallel collimated rays correspond to planar constant-phase surfaces.',
      'A line source has cylindrical symmetry around the wire axis.',
      'Wavefront surfaces are always perpendicular to the light rays at all points.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_interference_coherence',
    nodeId: NODE_C12_PHY_089,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why can two independent 60 W incandescent light bulbs placed 2 cm apart NEVER produce an observable stationary interference pattern on a screen?',
    options: [
      'They are mutually incoherent because spontaneous atomic emissions occur in random, uncorrelated ~10⁻⁹ s bursts',
      'Incandescent filaments emit thermal neutrons rather than electromagnetic photons',
      'The light intensities are far too high for linear Maxwellian superposition',
      'Photons collide elastically in mid-air and scatter away before reaching the screen',
    ],
    correctIndex: 0,
    explanation: 'Stationary interference requires a constant, time-invariant phase difference (coherence). Independent thermal sources emit wave packets through independent atoms with random phase changes every ~10⁻⁹ seconds, washing out the pattern millions of times per second.',
    hints: [
      'Sustained interference requires the phase difference Δφ to remain strictly constant over time.',
      'Do independent atoms in two separate filament bulbs communicate their quantum phases?',
      'Random phase transitions cause rapid fringe washing at gigahertz frequencies.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_young_fringe_formula',
    nodeId: NODE_C12_PHY_090,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Young’s Double Slit Experiment with slit separation d, slit-to-screen distance D, and wavelength λ, what is the exact formula for the fringe width β?',
    options: [
      'β = λD / d',
      'β = λd / D',
      'β = dD / λ',
      'β = 2λD / d²',
    ],
    correctIndex: 0,
    explanation: 'The fringe width β is the spatial distance between two consecutive bright or dark fringes: β = y_{n+1} - y_n = ((n+1)λD/d) - (nλD/d) = λD/d. All interference fringes are equally spaced.',
    hints: [
      'Increasing screen distance D spreads out the fringes (D belongs in the numerator).',
      'Placing slits closer together (smaller d) increases angular separation (d belongs in the denominator).',
      'Dimensional analysis: [m] × [m] / [m] = [m], confirming β = λD/d.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_07_lens_combination_label',
    nodeId: NODE_C12_PHY_084,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each optical parameter to its designated position on the combined thin-lens ray diagram.',
    dragItems: [
      { label: 'Lens 1 (f₁)', targetId: 'part_lens1' },
      { label: 'Lens 2 (f₂)', targetId: 'part_lens2' },
      { label: 'Combined Focus (F)', targetId: 'part_focus' },
      { label: 'Principal Axis', targetId: 'part_axis' },
    ],
    correctMapping: {
      part_lens1: 'Lens 1 (f₁)',
      part_lens2: 'Lens 2 (f₂)',
      part_focus: 'Combined Focus (F)',
      part_axis: 'Principal Axis',
    },
    explanation: 'Coaxial thin lenses in contact add optical powers: 1/F = 1/f₁ + 1/f₂ (P = P₁ + P₂). Light rays refract successively through both lens surfaces before converging at the equivalent focal point F.',
    hints: [
      'Lens 1 is the front refracting element on the left.',
      'Lens 2 is in immediate coaxial contact with Lens 1.',
      'Combined focus is the point where incoming parallel rays converge on the axis.',
    ],
  },
  {
    id: 'ch_08_lensmaker_basic',
    nodeId: NODE_C12_PHY_083,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard Lens Maker’s Formula for a thin lens of refractive index n₂ placed in a surrounding medium of refractive index n₁ with radii of curvature R₁ and R₂?',
    options: [
      '1/f = (n₂/n₁ - 1)(1/R₁ - 1/R₂)',
      '1/f = (n₁/n₂ - 1)(1/R₁ + 1/R₂)',
      '1/f = (n₂ - n₁)(R₁ - R₂)',
      '1/f = (n₂ + n₁)(1/R₁ - 1/R₂)',
    ],
    correctIndex: 0,
    explanation: 'The Lens Maker’s Formula relates focal length f to the relative refractive index (n₂/n₁) and surface curvatures: 1/f = (n₂/n₁ - 1)(1/R₁ - 1/R₂), derived by summing spherical surface refractions.',
    hints: [
      'The relative refractive index is n_lens / n_medium = n₂ / n₁.',
      'The curvature factor is (1/R₁ - 1/R₂).',
      'Subtracting 1 from relative refractive index gives (n₂/n₁ - 1).',
    ],
    misconceptionIndex: 1,
  },

  // Standard Tier (9-17)
  {
    id: 'ch_09_lensmaker_calc',
    nodeId: NODE_C12_PHY_083,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A symmetric biconvex glass lens (refractive index n = 1.50) has both spherical surfaces of radius |R| = 30 cm in air. Calculate its focal length f in centimetres.',
    correctAnswer: 30,
    tolerance: 0.5,
    unit: 'cm',
    explanation: 'By Cartesian sign convention, R₁ = +30 cm (convex to incident light) and R₂ = -30 cm (concave to incident light). 1/f = (1.50 - 1)(1/30 - 1/(-30)) = 0.50 × (2/30) = 1/30 => f = +30.0 cm.',
    hints: [
      'Apply 1/f = (n - 1)(1/R₁ - 1/R₂).',
      'Remember the sign convention: R₁ = +30 cm, R₂ = -30 cm.',
      '1/30 - (-1/30) = 2/30 = 1/15. Then 0.5 × (1/15) = 1/30 => f = 30 cm.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_10_angular_dispersion_num',
    nodeId: NODE_C12_PHY_081,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A thin crown glass prism with refracting angle A = 6.0° has refractive indices n_v = 1.660 and n_r = 1.610. Calculate the angular dispersion (δ_v - δ_r) in degrees.',
    correctAnswer: 0.3,
    tolerance: 0.02,
    unit: 'degrees',
    explanation: 'Angular dispersion = (n_v - n_r) × A = (1.660 - 1.610) × 6.0° = 0.050 × 6.0° = 0.30°.',
    hints: [
      'Angular dispersion formula: θ = δ_v - δ_r = (n_v - n_r) × A.',
      'Subtract n_r from n_v: 1.660 - 1.610 = 0.050.',
      'Multiply 0.050 by prism angle A = 6.0° to obtain 0.30°.',
    ],
  },
  {
    id: 'ch_11_compound_microscope_mag',
    nodeId: NODE_C12_PHY_086,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A compound microscope has objective linear magnification m_o = 15. The eyepiece has focal length f_e = 5 cm. If the final image forms at the least distance of distinct vision D = 25 cm, calculate total magnifying power M.',
    correctAnswer: 90,
    tolerance: 1,
    unit: 'x',
    explanation: 'Total magnification M = m_o × m_e = m_o × (1 + D / f_e) = 15 × (1 + 25 / 5) = 15 × (1 + 5) = 15 × 6 = 90x.',
    hints: [
      'For the image formed at D, eyepiece angular magnification is m_e = (1 + D / f_e).',
      'Compute m_e: 1 + 25 / 5 = 1 + 5 = 6.',
      'Multiply objective magnification by eyepiece magnification: 15 × 6 = 90.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_12_astro_telescope_normal',
    nodeId: NODE_C12_PHY_087,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An astronomical telescope at Kavalur has an objective of focal length f_o = 120 cm and an eyepiece of focal length f_e = 4 cm. What is its magnifying power M in normal adjustment (image at infinity)?',
    correctAnswer: 30,
    tolerance: 0.5,
    unit: 'x',
    explanation: 'In normal adjustment (relaxed eye), magnifying power |M| = f_o / f_e = 120 / 4 = 30x (with inverted sign M = -30).',
    hints: [
      'In normal adjustment, both object and final image are located at infinity.',
      'Magnification magnitude is the ratio of focal lengths: |M| = f_o / f_e.',
      'Divide 120 cm by 4 cm to get 30.',
    ],
  },
  {
    id: 'ch_13_ydse_path_difference',
    nodeId: NODE_C12_PHY_089,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Monochromatic light of wavelength λ = 500 nm reaches point P on an observing screen from two coherent slits with a path difference Δx = 1750 nm. What interference state occurs at P?',
    options: [
      '4th Dark fringe (destructive interference, Δx = 3.5λ)',
      '3rd Bright fringe (constructive interference, Δx = 3.0λ)',
      'Central Bright maximum',
      'Incoherent background luminance with zero contrast',
    ],
    correctIndex: 0,
    explanation: 'Path difference Δx = 1750 nm = 3.5 × 500 nm = (3 + 1/2)λ = (2n - 1)λ/2 for n = 4. This is an odd half-integral multiple of wavelength, producing exact destructive cancellation (4th dark fringe).',
    hints: [
      'Divide the path difference 1750 nm by the wavelength 500 nm: 1750 / 500 = 3.5.',
      '3.5 is an odd half-integer (7/2) multiple of λ.',
      'Odd half-multiples of wavelength create complete destructive interference (dark fringes).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_14_rainbow_mechanism_sort',
    nodeId: NODE_C12_PHY_081,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of physical optical phenomena that sunlight undergoes inside a spherical raindrop to form a primary rainbow.',
    sortItems: [
      'Refraction and dispersion upon entering the front drop surface',
      'Total internal reflection at the rear interior water-air boundary',
      'Refraction and further angular dispersion exiting the front surface towards observer',
      'Concentration of emergent rays at rainbow caustic angles (40°-42°)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'A primary rainbow requires: 1) Refraction with dispersion entering the droplet, 2) One internal reflection at the rear, 3) Refraction on emergence, and 4) Concentration near 42° (red) and 40° (violet). CISCE examiners penalize confusing rainbows with atmospheric Rayleigh scattering!',
    hints: [
      'First, light must penetrate the raindrop boundary, bending and dispersing.',
      'Second, light hits the back inner surface and reflects internally.',
      'Third, light exits back into air, bending further away from normal.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_15_lens_submersion',
    nodeId: NODE_C12_PHY_083,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A convex glass lens (n_g = 1.50) of focal length +20 cm in air is submerged into carbon disulfide liquid of refractive index n_l = 1.65. What happens to its optical behavior and focal length?',
    options: [
      'It turns into a diverging lens with negative focal length (f < 0)',
      'Its focal length decreases to +5 cm and it converges light much more strongly',
      'It becomes a perfect mirror with zero focal length',
      'Its focal length remains exactly +20 cm because glass geometry is unchanged',
    ],
    correctIndex: 0,
    explanation: 'Relative refractive index n_rel = n_g / n_l = 1.50 / 1.65 = 0.909 < 1. In the Lens Maker’s Formula 1/f = (n_rel - 1)(1/R₁ - 1/R₂), the term (n_rel - 1) = -0.091 is negative. Hence, the convex lens diverges incident light!',
    hints: [
      'The refracting power depends on (n_lens / n_liquid - 1).',
      'When the surrounding liquid is optically denser than glass, rays bend away from the thickest section.',
      '(0.909 - 1) is negative, inverting the sign of focal length from positive to negative.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_16_spherical_refraction_calc',
    nodeId: NODE_C12_PHY_082,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A point object in air (n₁ = 1.0) is placed at u = -30 cm from a convex glass surface (n₂ = 1.5, radius of curvature R = +20 cm). What is the image distance v in centimetres?',
    correctAnswer: -180,
    tolerance: 3,
    unit: 'cm',
    explanation: 'Applying n₂/v - n₁/u = (n₂ - n₁)/R => 1.5/v - 1.0/(-30) = (1.5 - 1.0)/20 => 1.5/v + 1/30 = 0.5/20 = 1/40 => 1.5/v = 1/40 - 1/30 = (3 - 4)/120 = -1/120 => v = 1.5 × (-120) = -180 cm (virtual image).',
    hints: [
      'Use the master formula: n₂/v - n₁/u = (n₂ - n₁)/R.',
      'Substitute: 1.5/v - 1/(-30) = 0.5/20 = 1/40.',
      '1.5/v = 1/40 - 1/30 = -1/120. Solve for v: v = 1.5 × (-120) = -180 cm.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_17_thin_lens_combination_power',
    nodeId: NODE_C12_PHY_084,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two thin lenses of focal lengths f₁ = +25 cm and f₂ = -50 cm are placed in coaxial contact. Calculate the total equivalent power P of the combination in Dioptres (D).',
    correctAnswer: 2.0,
    tolerance: 0.1,
    unit: 'D',
    explanation: 'Power P₁ = 100 / f₁ = 100 / 25 = +4.0 D. Power P₂ = 100 / f₂ = 100 / (-50) = -2.0 D. Total power P = P₁ + P₂ = +4.0 + (-2.0) = +2.0 D.',
    hints: [
      'Convert each focal length to Dioptres: P = 100 / f(in cm).',
      'P₁ = 100/25 = +4 D; P₂ = 100/(-50) = -2 D.',
      'Sum the powers: P_net = P₁ + P₂ = +4 - 2 = +2 D.',
    ],
  },

  // Advanced Tier (18-26)
  {
    id: 'ch_18_lens_mirror_combo',
    nodeId: NODE_C12_PHY_084,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A convex lens of focal length f_L = +20 cm has its flat rear face silvered to act as a plane mirror (power P_m = 0). What is the effective focal length F of this combination in centimetres?',
    correctAnswer: 10,
    tolerance: 0.5,
    unit: 'cm',
    explanation: 'Light traverses the converging lens, reflects off the silvered back mirror, and passes back through the lens. Total equivalent power P = 2P_L + P_m = 2 × (1/f_L). Therefore, effective focal length F = f_L / 2 = 20 / 2 = 10 cm (acting as a concave mirror).',
    hints: [
      'The light beam passes through the lens twice (forward and backward after reflection).',
      'A plane mirror has infinite focal length and zero power: P_m = 0.',
      'Effective power P_eq = 2P_lens + P_mirror = 2(1/20) = 1/10 => F = 10 cm.',
    ],
  },
  {
    id: 'ch_19_rayleigh_scattering_ratio',
    nodeId: NODE_C12_PHY_081,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'By Rayleigh’s scattering law (Intensity I ∝ 1/λ⁴), compare violet light (λ₁ = 400 nm) to red light (λ₂ = 700 nm). By what numerical factor is violet scattered more intensely than red? (Round to 1 decimal place)',
    correctAnswer: 9.4,
    tolerance: 0.3,
    unit: 'times',
    explanation: 'I_v / I_r = (λ_r / λ_v)⁴ = (700 / 400)⁴ = (1.75)⁴ = 9.3789 ≈ 9.4 times more strongly. This selective Rayleigh scattering of short wavelengths illuminates the daytime sky blue!',
    hints: [
      'Scattering intensity varies inversely with the 4th power of wavelength: I ∝ 1/λ⁴.',
      'Ratio = (700 / 400)⁴ = (1.75)⁴.',
      '1.75 × 1.75 × 1.75 × 1.75 ≈ 9.38.',
    ],
  },
  {
    id: 'ch_20_ydse_screen_shift',
    nodeId: NODE_C12_PHY_090,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a YDSE setup, slits separated by d = 0.25 mm produce fringes with light of λ = 600 nm on a screen at D = 1.5 m. Find the linear distance in millimetres between the central maximum and the 3rd bright fringe.',
    correctAnswer: 10.8,
    tolerance: 0.3,
    unit: 'mm',
    explanation: 'Fringe width β = λD / d = (600 × 10⁻⁹ × 1.5) / (0.25 × 10⁻³) = 9.0 × 10⁻⁷ / 2.5 × 10⁻⁴ = 3.6 × 10⁻³ m = 3.6 mm. Position of 3rd bright fringe y₃ = 3 × β = 3 × 3.6 mm = 10.8 mm.',
    hints: [
      'Calculate single fringe width β = λD / d in SI units.',
      'β = (600 × 10⁻⁹ m × 1.5 m) / (0.25 × 10⁻³ m) = 3.6 mm.',
      'Distance to 3rd bright fringe is y₃ = 3 × β = 3 × 3.6 mm = 10.8 mm.',
    ],
  },
  {
    id: 'ch_21_telescope_at_d',
    nodeId: NODE_C12_PHY_087,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An astronomical telescope has f_o = 100 cm and f_e = 5 cm. Calculate its magnifying power when the final image is formed at the least distance of distinct vision (D = 25 cm).',
    correctAnswer: 24,
    tolerance: 0.5,
    unit: 'x',
    explanation: 'Magnification with final image at D is M = (f_o / f_e) × (1 + f_e / D) = (100 / 5) × (1 + 5 / 25) = 20 × (1 + 0.20) = 20 × 1.20 = 24x.',
    hints: [
      'Use the distinct vision magnification formula: M = (f_o / f_e)(1 + f_e / D).',
      'Normal magnification component is 100 / 5 = 20.',
      'Multiply by the distinct vision factor: (1 + 5/25) = 1.2 => 20 × 1.2 = 24.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_22_construct_microscope_formula',
    nodeId: NODE_C12_PHY_086,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the standard algebraic formula for the magnifying power of a compound microscope in normal adjustment (final image at infinity).',
    availableParts: ['M =', '(L / f_o)', '×', '(D / f_e)', '(1 + D / f_e)', '+', '(f_o / f_e)'],
    targetState: 'M = (L / f_o) × (D / f_e)',
    validationHint: 'Select the tokens in exact order: M =, (L / f_o), ×, (D / f_e)',
    explanation: 'For normal adjustment, intermediate image forms at the focal plane of the eyepiece. Magnifying power is M = (L / f_o) × (D / f_e), where L is tube length.',
    hints: [
      'Start with the magnifying power symbol M =.',
      'Next is the objective linear magnification approximation: (L / f_o).',
      'Multiply by the relaxed eyepiece angular magnification: (D / f_e).',
    ],
  },
  {
    id: 'ch_23_snell_huygens_proof',
    nodeId: NODE_C12_PHY_088,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Huygens’ wave-theoretic proof of Snell’s law, if a plane wavefront travels distance v₁t in medium 1 and distance v₂t in medium 2 along common interface hypotenuse AC, what does sin i / sin r equal?',
    options: [
      '(v₁t / AC) / (v₂t / AC) = v₁ / v₂ = ₁n₂ (Refractive index)',
      '(v₂t / AC) / (v₁t / AC) = v₂ / v₁',
      '(AC / v₁t) × (AC / v₂t) = AC²',
      'v₁² / v₂²',
    ],
    correctIndex: 0,
    explanation: 'From right triangles on the refracting boundary: sin i = v₁t / AC and sin r = v₂t / AC. Dividing the two gives sin i / sin r = (v₁t) / (v₂t) = v₁ / v₂ = n₂ / n₁ = ₁n₂. This proves Snell’s law from wave kinematics!',
    hints: [
      'Angle of incidence right triangle has opposite side = v₁t and hypotenuse = AC.',
      'Angle of refraction right triangle has opposite side = v₂t and hypotenuse = AC.',
      'Dividing sin i by sin r cancels the common hypotenuse AC leaving v₁ / v₂.',
    ],
  },
  {
    id: 'ch_24_resolving_power_microscope',
    nodeId: NODE_C12_PHY_086,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An optical spectroscopist wants to maximize the resolving power of a research microscope to distinguish ultrafine biological structures. Which physical modification is most effective?',
    options: [
      'Use cedarwood oil immersion (n ≈ 1.51) and short-wavelength blue/UV illumination',
      'Stack 10 extra eyepiece lenses to achieve 10,000x empty magnification',
      'Use infrared illumination because infrared carries longer wavelengths',
      'Increase the tube length L to 4 metres while using monochromatic red light',
    ],
    correctIndex: 0,
    explanation: 'Limit of resolution d_min = 1.22λ / (2n sin θ). Resolving power = 1 / d_min = (2n sin θ) / (1.22λ). Increasing the numerical aperture n sin θ (oil immersion) and decreasing wavelength λ (blue/UV) maximizes resolving power. Adding eyepieces only magnifies diffraction blur (empty magnification).',
    hints: [
      'Resolving power depends directly on numerical aperture (n sin θ) and inversely on wavelength λ.',
      'To resolve smaller details, you must decrease the resolution limit d_min.',
      'Higher medium index n and smaller wavelength λ minimize d_min.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_25_ydse_mica_sheet_shift',
    nodeId: NODE_C12_PHY_090,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A thin transparent mica sheet of thickness t = 12 µm and refractive index n = 1.50 is placed in the path of one interfering beam in YDSE (λ = 600 nm, D = 1.0 m, d = 1.0 mm). Calculate the resulting spatial shift of the central fringe in millimetres.',
    correctAnswer: 6.0,
    tolerance: 0.2,
    unit: 'mm',
    explanation: 'Introducing a film of thickness t and index n introduces an additional optical path difference Δ = (n - 1)t. The spatial fringe shift on the screen is y_shift = (D / d) × (n - 1)t = (1.0 / 1.0 × 10⁻³) × (1.50 - 1)(12 × 10⁻⁶) = 1000 × (0.50 × 12 × 10⁻⁶) = 1000 × 6 × 10⁻⁶ m = 6.0 × 10⁻³ m = 6.0 mm.',
    hints: [
      'Additional optical path difference introduced by the sheet is Δ = (n - 1)t.',
      'Fringe shift equation is y_shift = (D / d)(n - 1)t.',
      'Substitute: y_shift = (1.0 / 0.001) × (0.50 × 12 × 10⁻⁶) = 1000 × 6 × 10⁻⁶ = 0.006 m = 6.0 mm.',
    ],
  },
  {
    id: 'ch_26_huygens_reflection_law',
    nodeId: NODE_C12_PHY_088,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Huygens’ geometric construction of reflection of a plane wavefront at a specular plane mirror, why is the angle of incidence i strictly equal to the angle of reflection r?',
    options: [
      'The incident and reflected right triangles share a common hypotenuse and congruent side vt, making them congruent (RHS congruence)',
      'Photons collide with mirror atoms with infinite relativistic mass',
      'The normal to the mirror absorbs and inverts the phase angle by 360°',
      'Fermat’s principle only applies to refraction, not reflection',
    ],
    correctIndex: 0,
    explanation: 'In triangles ΔABC and ΔADC formed along mirror boundary AC: ∠B = ∠D = 90°, side BC = AD = vt (wavelet travel distance), and hypotenuse AC is common. By RHS congruence criterion, ΔABC ≅ ΔADC, therefore angle of incidence i = angle of reflection r.',
    hints: [
      'Consider the two right triangles built on the mirror interface hypotenuse.',
      'Both wavelets travel at speed v for the same time t, giving equal side lengths vt.',
      'Right-angle Hypotenuse Side (RHS) congruence proves angle equality i = r.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_081,
  title: 'ISC Class 12 Optics: Dispersion, Lenses, Wavefronts & Interference',
  definition: 'Comprehensive mastery of wave and ray optics: dispersion through prisms (Cauchy law), spherical surface refraction, lens maker’s formula, thin-lens combinations, microscope and telescope designs, Huygens’ wave construction, and Young’s double slit interference fringes.',
  eli5: 'Light behaves as both a ray that bends and splits into rainbows through glass lenses, and a ripple wave that forms interference barcode patterns when split through twin slits!',
  misconceptions: [
    { misconception: 'A rainbow is caused by Rayleigh scattering of sunlight in atmospheric air molecules.', correction: 'Rainbows are caused by refraction, dispersion, and total internal reflection inside raindrops. Rayleigh scattering causes the sky’s blue hue.' },
    { misconception: 'A biconvex lens always converges light regardless of the surrounding liquid.', correction: 'If submerged in a medium optically denser than glass (n_medium > n_glass), a biconvex lens diverges light rays!' },
    { misconception: 'Microscope magnification can be increased infinitely with stronger ocular lenses to view atomic bonds.', correction: 'Useful magnification is strictly bounded by the wave diffraction limit of resolution d_min = 1.22λ / (2n sin θ).' },
    { misconception: 'A wavefront is simply a single isolated ray of light.', correction: 'A wavefront is a 2D or 3D surface representing the continuous locus of all points oscillating in identical phase.' },
    { misconception: 'In Young’s double slit experiment, destructive interference destroys photon energy.', correction: 'Energy is strictly conserved; destructive interference redistributes wave energy into the adjacent bright fringes.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the Cauchy dispersion relation for optical glass?', options: ['n = A + B/λ²', 'n = Aλ²', 'n = A / λ', 'n = A - Bλ'], correctIndex: 0 },
    { question: 'What is the optical power of a +50 cm focal length convex lens?', options: ['+2.0 D', '+0.02 D', '+5.0 D', '-2.0 D'], correctIndex: 0 },
    { question: 'What is the master relation for refraction at a spherical boundary?', options: ['n₂/v - n₁/u = (n₂ - n₁)/R', '1/v - 1/u = 1/f', 'n₁/v - n₂/u = 1/R', 'n₂/v + n₁/u = n₁/R'], correctIndex: 0 },
    { question: 'In normal adjustment, what is the magnifying power of an astronomical telescope?', options: ['M = -f_o / f_e', 'M = -f_e / f_o', 'M = 1 + D/f_e', 'M = L × D / (f_o f_e)'], correctIndex: 0 },
    { question: 'What type of wavefront emerges from a point source in isotropic medium?', options: ['Spherical', 'Plane', 'Cylindrical', 'Hyperbolic'], correctIndex: 0 },
    { question: 'What is the path difference for the nth constructive interference fringe?', options: ['Δx = nλ', 'Δx = (n + 1/2)λ', 'Δx = λ / n', 'Δx = 2n²λ'], correctIndex: 0 },
    { question: 'What is the fringe width in Young’s double slit experiment?', options: ['β = λD / d', 'β = λd / D', 'β = dD / λ', 'β = 2λD / d'], correctIndex: 0 },
    { question: 'Two thin lenses of +4 D and -2 D are placed in contact. What is the net power?', options: ['+2 D', '+6 D', '-8 D', '+0.5 D'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of prism dispersion, spherical surface refractions, lens maker formula, coaxial lens combinations, microscope/telescope optics, Huygens wave derivations, and double-slit interference physics.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Prism Dispersion & Cauchy Spectrum',
    instruction: 'Drag the Prism Angle (A) and Material Cauchy Constant (B) sliders to observe how violet and red rays separate in real-time.',
    interactionType: 'slider-prism',
    nodeId: NODE_C12_PHY_081,
  },
  {
    title: 'Lab 2: Spherical Refraction & Ball Interface',
    instruction: 'Adjust the object distance u and surface radius R to see the exact real or virtual caustic focus form behind the curved interface.',
    interactionType: 'slider-spherical',
    nodeId: NODE_C12_PHY_082,
  },
  {
    title: 'Lab 3: Lens Maker & Medium Immersion Inversion',
    instruction: 'Change the surrounding liquid refractive index from Air (1.0) to Dense Oil (1.75) to witness a biconvex lens flip from converging to diverging!',
    interactionType: 'slider-lensmaker',
    nodeId: NODE_C12_PHY_083,
  },
  {
    title: 'Lab 4: Astronomical Telescope Ray Tracer',
    instruction: 'Change objective focal length f_o and eyepiece f_e to adjust magnification and telescope barrel length L = f_o + f_e.',
    interactionType: 'slider-telescope',
    nodeId: NODE_C12_PHY_087,
  },
  {
    title: 'Lab 5: Young’s Double Slit Wavefront Interference',
    instruction: 'Vary the slit separation d and wavelength λ to watch the interference fringes and cosine-squared intensity barcode expand in real time.',
    interactionType: 'slider-ydse',
    nodeId: NODE_C12_PHY_090,
  },
  {
    title: 'Lab 6: Compound Microscope Ray Alignment',
    instruction: 'Adjust objective focal length f_o and tube length L to observe intermediate real image formation and total ocular magnification.',
    interactionType: 'slider-microscope',
    nodeId: NODE_C12_PHY_086,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you submerge a glass convex lens (n = 1.50) into a liquid with n = 1.65, what will happen to parallel incident light rays?',
    options: [
      'They will diverge outward as if from a virtual focus behind the lens',
      'They will converge more tightly to a closer real focus',
      'They will pass completely unrefracted in a straight line',
      'They will be totally absorbed by the glass volume',
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 3 and drag the Medium Refractive Index slider above 1.50 to verify your prediction live!',
    nodeId: NODE_C12_PHY_083,
  },
  {
    question: 'Predict: In Young’s double slit experiment, if you halve the slit separation d (d → d/2), what will happen to the fringe width β?',
    options: [
      'Fringe width β will double (fringes spread twice as wide)',
      'Fringe width β will be cut in half',
      'Fringe width β will remain completely unchanged',
      'The fringe pattern will vanish instantly into uniform grey',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 5, drag the slit separation d down from 0.40 mm to 0.20 mm and observe the fringe barcode double in width!',
    nodeId: NODE_C12_PHY_090,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the violet ray compared to the red ray as you increase the prism angle A in Lab 1?',
    observableOptions: [
      'Violet ray always bends downwards with greater deviation δ_v > δ_r',
      'Red ray bends more than violet ray',
      'Both colours travel at the identical angle regardless of angle A',
      'All light turns completely monochromatic green',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_081,
  },
  {
    question: 'In the YDSE intensity graph in Lab 5, what is the intensity value at the centres of the dark fringes?',
    observableOptions: [
      'Exactly zero (complete destructive wave cancellation I = 0)',
      'Half of peak intensity (I = I_max / 2)',
      'Equal to single slit intensity I₀',
      'Negative intensity value',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_090,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Observatory Optical Alignment Project',
  description: 'Design the primary spectrometer grating and double-slit collimator for the 2.34 m Vainu Bappu Telescope at Kavalur. Calculate the exact dispersive power needed to resolve hydrogen Balmer alpha (656.3 nm) and beta (486.1 nm) stellar absorption lines.',
  steps: [
    'Measure the mean refractive index n_y of the telescope flint prism',
    'Calculate the angular dispersion δ_v - δ_r for an 8° prism refracting angle',
    'Align the two-lens achromatic doublet to eliminate chromatic aberration across visible wavelengths',
    'Calibrate the double-slit sensor to measure stellar angular diameters with optical interferometry',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export function C12_PhysicsDispersionThroughPrismSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_081,
    title = DEFAULT_PROPS.title || 'Optics & Wave Physics',
    diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // Phase management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration & Sandbox state
  const [prismAngle, setPrismAngle] = useState(6.0); // degrees
  const [cauchyB, setCauchyB] = useState(0.05); // dispersion constant
  const [sphericalU, setSphericalU] = useState(-30); // cm
  const [sphericalR, setSphericalR] = useState(20); // cm
  const [lensGlassN, setLensGlassN] = useState(1.5);
  const [mediumN, setMediumN] = useState(1.0); // air or liquid
  const [telescopeFo, setTelescopeFo] = useState(100); // cm
  const [telescopeFe, setTelescopeFe] = useState(5); // cm
  const [microscopeFo, setMicroscopeFo] = useState(1.5); // cm
  const [microscopeL, setMicroscopeL] = useState(16); // cm
  const [ydseLambda, setYdseLambda] = useState(600); // nm
  const [ydseD, setYdseD] = useState(1.2); // m
  const [ydseSlitD, setYdseSlitD] = useState(0.3); // mm
  const [activeTabVisual, setActiveTabVisual] = useState<'ray' | 'wave' | 'graph'>('ray');

  // Predict-then-check & observation states
  const [activePredictionTab, setActivePredictionTab] = useState(0);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge & Evaluation state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Numeric & Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Persistent BKT ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY CURRENT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOTIVATIONAL FEEDBACK GENERATOR BASED ON ERRORS ───
  const getMotivationalMessage = useCallback((errorCount: number) => {
    if (errorCount === 0) {
      return {
        title: 'PERFECT SCORE! 🌟',
        subtitle: 'Flawless Mastery! You achieved 100% precision across all Class 12 Optics derivations, ray geometry, and wave interference questions.',
        color: 'text-emerald-400',
        badge: 'bg-emerald-950/80 border-emerald-500 text-emerald-300',
      };
    }
    if (errorCount >= 1 && errorCount <= 3) {
      return {
        title: 'Great work! 👏',
        subtitle: 'Outstanding optical intuition! You are almost fully calibrated for the board exams. A quick polish on sign conventions and you are golden.',
        color: 'text-sky-400',
        badge: 'bg-sky-950/80 border-sky-500 text-sky-300',
      };
    }
    if (errorCount >= 4 && errorCount <= 7) {
      return {
        title: 'Good effort! 💪',
        subtitle: 'Solid progress! Review the step-by-step mathematical proofs for spherical boundaries and Young slit formulas to reinforce your grasp.',
        color: 'text-amber-400',
        badge: 'bg-amber-950/80 border-amber-500 text-amber-300',
      };
    }
    return {
      title: 'Do not give up — You WILL get this! 🚀',
      subtitle: 'Optics is intricate with sign conventions and phase angles! Explore the interactive sandbox labs above to visualize each principle again.',
      color: 'text-rose-400',
      badge: 'bg-rose-950/80 border-rose-500 text-rose-300',
    };
  }, []);

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATE ───
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

  // ─── 2D CANVAS WAVEFRONT ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dynamic Huygens spherical wavelets expanding from two coherent slit centres
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
      ctx.lineWidth = 1.5;
      const slit1Y = canvas.height * 0.35;
      const slit2Y = canvas.height * 0.65;
      const sourceX = 45;

      // Draw Slit barriers
      ctx.fillStyle = '#334155';
      ctx.fillRect(sourceX - 3, 0, 6, slit1Y - 10);
      ctx.fillRect(sourceX - 3, slit1Y + 10, 6, slit2Y - slit1Y - 20);
      ctx.fillRect(sourceX - 3, slit2Y + 10, 6, canvas.height - slit2Y - 10);

      // Slit markers
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(sourceX, slit1Y, 3, 0, Math.PI * 2);
      ctx.arc(sourceX, slit2Y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Expanding wavelets from slit 1 & 2
      for (let r = (frame * 15) % 25; r < canvas.width; r += 25) {
        ctx.beginPath();
        ctx.arc(sourceX, slit1Y, r, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sourceX, slit2Y, r, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
      }

      // Draw Screen on the right
      const screenX = canvas.width - 30;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(screenX, 0, 30, canvas.height);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, canvas.height);
      ctx.stroke();

      // Draw interference fringe intensity barcode on the screen
      for (let i = 0; i < canvas.height; i += 2) {
        const yDist = (i - canvas.height / 2);
        const phaseDiff = (2 * Math.PI * (ydseSlitD * 0.001) * (yDist * 0.0008)) / ((ydseLambda * 1e-9) * ydseD);
        const intensity = Math.pow(Math.cos(phaseDiff / 2), 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${intensity})`;
        ctx.fillRect(screenX + 4, i, 22, 2);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [ydseLambda, ydseSlitD, ydseD]);

  // ─── DERIVED REAL-TIME OPTICS CALCULATIONS ───
  const dispersionData = useMemo(() => {
    const nv = 1.50 + cauchyB;
    const nr = 1.50 + cauchyB * 0.4;
    const ny = (nv + nr) / 2;
    const deltaV = (nv - 1) * prismAngle;
    const deltaR = (nr - 1) * prismAngle;
    const angularDisp = deltaV - deltaR;
    const dispersivePower = angularDisp / ((ny - 1) * prismAngle);
    return { nv, nr, ny, deltaV, deltaR, angularDisp, dispersivePower };
  }, [prismAngle, cauchyB]);

  const sphericalData = useMemo(() => {
    const n1 = 1.0;
    const n2 = 1.5;
    const termRight = (n2 - n1) / sphericalR + n1 / sphericalU;
    const v = termRight !== 0 ? n2 / termRight : 9999;
    const isReal = v > 0;
    return { v, isReal };
  }, [sphericalU, sphericalR]);

  const lensMakerData = useMemo(() => {
    const nRel = lensGlassN / mediumN;
    const invF = (nRel - 1) * 0.1;
    const f = invF !== 0 ? 1 / invF : 9999;
    const powerD = 100 / f;
    const isConverging = f > 0;
    return { nRel, f, powerD, isConverging };
  }, [lensGlassN, mediumN]);

  const telescopeData = useMemo(() => {
    const magNormal = telescopeFo / telescopeFe;
    const tubeLength = telescopeFo + telescopeFe;
    const magDistinct = magNormal * (1 + telescopeFe / 25);
    return { magNormal, tubeLength, magDistinct };
  }, [telescopeFo, telescopeFe]);

  const microscopeData = useMemo(() => {
    const mo = microscopeL / microscopeFo;
    const meDistinct = 1 + 25 / 5;
    const totalMagDistinct = mo * meDistinct;
    return { mo, meDistinct, totalMagDistinct };
  }, [microscopeFo, microscopeL]);

  const ydseData = useMemo(() => {
    const lambdaM = ydseLambda * 1e-9;
    const slitDM = ydseSlitD * 1e-3;
    const betaMM = (lambdaM * ydseD) / slitDM * 1000;
    return { betaMM };
  }, [ydseLambda, ydseD, ydseSlitD]);

  // ─── CALLBACK HANDLERS ───
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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb! You understand Cauchy dispersion.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive optics laboratory. Move the sliders to test the physics.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now try the free sandbox mode. Test all optical parameters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the ISC Class 12 board-level challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Check your prediction using the interactive slider.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[activePredictionTab]?.correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Observe the ray angles carefully.');
  }, [activePredictionTab]);

  const handlePrismAngleChange = useCallback((val: number) => {
    setPrismAngle(val);
    audioManager.play('count');
  }, []);

  const handleCauchyChange = useCallback((val: number) => {
    setCauchyB(val);
    audioManager.play('count');
  }, []);

  const handleMediumChange = useCallback((val: number) => {
    setMediumN(val);
    audioManager.play('count');
  }, []);

  const handleYdseSlitChange = useCallback((val: number) => {
    setYdseSlitD(val);
    audioManager.play('count');
  }, []);

  const handleYdseLambdaChange = useCallback((val: number) => {
    setYdseLambda(val);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent! You have mastered ISC Class 12 Optics and Wave Theory.');
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
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
        speechManager.speak('Review the step-by-step physical derivation below.');
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
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const motivational = getMotivationalMessage(errors);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
    >
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-2 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50"
            role="img"
            aria-label="Physics atom icon"
          >
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-mono">ISC Class 12 • 10 Core Optics & Wave Nodes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-sky-950/60 text-sky-400 border-sky-700'
                : 'bg-rose-950/60 text-rose-400 border-rose-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-900 rounded-full text-xs text-slate-300 border border-slate-700"
          >
            Phase: <strong className="text-indigo-400 uppercase">{phase}</strong>
          </motion.span>
        </div>
      </motion.div>

      {/* Navigation Pills */}
      <motion.nav
        aria-label="Simulation phase navigation"
        className="flex flex-wrap gap-2 pb-2"
      >
        {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
          <motion.button
            key={p}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setPhase(p);
              audioManager.play('tap');
            }}
            aria-label={`Switch to ${p} phase`}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border ${
              phase === p
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {p === 'discovery' && '1. Discovery 🔭'}
            {p === 'explore' && '2. Interactive Labs 🧪'}
            {p === 'sandbox' && '3. Free Sandbox 🛠️'}
            {p === 'challenge' && '4. Board Challenges 🏆'}
          </motion.button>
        ))}
      </motion.nav>

      <AnimatePresence mode="wait">
        {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/40 shadow-inner"
            >
              <h2 className="text-xl font-bold text-indigo-300 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-indigo-400/90 mt-3 font-mono">{SCENARIO.context}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800"
            >
              <h3 className="text-base font-bold text-white mb-4">Initial Curiosity Inquiry:</h3>
              <p className="text-slate-200 text-sm font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all border flex items-start gap-2 ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 border-slate-700 hover:border-indigo-500 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-indigo-400 mr-1">{String.fromCharCode(65 + i)}.</span>
                    <span className="flex-1">{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-1">✓</span>
                    )}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-rose-400 font-bold ml-1">✗</span>
                    )}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '✓ Excellent physical deduction! Proceed to the dynamic optics laboratory.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter interactive optics labs"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                  >
                    Enter Interactive Optics Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Prediction Hook Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider">
                  Hypothesis & Prediction Chamber
                </h3>
                <span className="text-xs text-slate-400">Scientific Method Step 2</span>
              </div>
              <p className="text-sm text-slate-200">
                {PREDICTION_QUESTIONS[0].question}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[0].options.map((predOpt, pIdx) => (
                  <motion.button
                    key={pIdx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePrediction(pIdx)}
                    aria-label={`Predict option ${pIdx + 1}: ${predOpt}`}
                    className={`p-3 text-left rounded-xl text-xs font-medium border ${
                      predictionIndex === pIdx
                        ? 'bg-sky-950 border-sky-400 text-sky-200 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {predictionIndex === pIdx && <span className="mr-1">🎯</span>}
                    {predOpt}
                  </motion.button>
                ))}
              </div>
              {predictionMade && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-emerald-400 font-mono"
                >
                  ✓ Prediction recorded! {PREDICTION_QUESTIONS[0].verifyInstruction}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="flex flex-wrap items-center justify-between gap-3"
            >
              <h2 className="text-lg font-bold text-sky-300">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous laboratory station"
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg disabled:opacity-40 border border-slate-700"
                >
                  ← Prev Lab
                </motion.button>
                <span className="text-xs text-slate-400 self-center px-2 font-mono">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                    else handleAdvanceToSandbox();
                  }}
                  aria-label="Next laboratory station"
                  className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-md shadow-indigo-600/30"
                >
                  {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Free Sandbox →' : 'Next Lab →'}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-amber-950/30 border border-amber-700/40 rounded-xl"
            >
              <p className="text-xs md:text-sm text-amber-300 font-medium">
                💡 <strong>Objective:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>
            </motion.div>

            {/* Interactive Simulation Display for Current Lab */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Visual Screen (Canvas / SVG Ray Tracing) */}
              <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                className="lg:col-span-2 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between min-h-[350px]"
              >
                {/* Lab 1: Prism Dispersion */}
                {currentSlide === 0 && (
                  <div className="relative w-full h-[290px]">
                    <svg viewBox="0 0 500 290" className="w-full h-full" aria-label="Prism dispersion ray diagram">
                      {/* Prism body */}
                      <polygon points="150,230 250,50 350,230" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="2.5" />
                      <text x="250" y="40" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">Refracting Angle A = {prismAngle}°</text>

                      {/* Incident White Ray */}
                      <line x1="30" y1="140" x2="190" y2="150" stroke="#f8fafc" strokeWidth="3" />
                      <text x="50" y="130" fill="#f8fafc" fontSize="10">White Incident Ray</text>

                      {/* Dispersed Internal Rays */}
                      <line x1="190" y1="150" x2="295" y2={160 - dispersionData.angularDisp * 8} stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="190" y1="150" x2="290" y2={175 + dispersionData.angularDisp * 8} stroke="#a855f7" strokeWidth="2" strokeDasharray="3,3" />

                      {/* Emergent Red Ray */}
                      <line x1="295" y1={160 - dispersionData.angularDisp * 8} x2="460" y2={190 + dispersionData.deltaR * 6} stroke="#ef4444" strokeWidth="2.5" />
                      <text x="465" y={190 + dispersionData.deltaR * 6} fill="#ef4444" fontSize="10">Red (δ_r = {dispersionData.deltaR.toFixed(2)}°)</text>

                      {/* Emergent Violet Ray */}
                      <line x1="290" y1={175 + dispersionData.angularDisp * 8} x2="460" y2={235 + dispersionData.deltaV * 6} stroke="#a855f7" strokeWidth="2.5" />
                      <text x="465" y={235 + dispersionData.deltaV * 6} fill="#a855f7" fontSize="10">Violet (δ_v = {dispersionData.deltaV.toFixed(2)}°)</text>

                      {/* Spectrum Spread Arc */}
                      <path d={`M 440,${190 + dispersionData.deltaR * 6} Q 450,210 440,${235 + dispersionData.deltaV * 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="410" y="215" fill="#38bdf8" fontSize="9" textAnchor="end">Angular Spread = {dispersionData.angularDisp.toFixed(3)}°</text>
                    </svg>
                  </div>
                )}

                {/* Lab 2: Spherical Refraction */}
                {currentSlide === 1 && (
                  <div className="relative w-full h-[290px]">
                    <svg viewBox="0 0 500 290" className="w-full h-full" aria-label="Spherical surface refraction ray diagram">
                      <line x1="20" y1="145" x2="480" y2="145" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,4" />
                      {/* Spherical Boundary */}
                      <path d="M 250,30 A 120,120 0 0,1 250,260" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="3" />
                      <text x="260" y="45" fill="#38bdf8" fontSize="10">Glass Medium (n₂ = 1.50)</text>
                      <text x="170" y="45" fill="#94a3b8" fontSize="10">Air (n₁ = 1.0)</text>

                      {/* Object */}
                      <circle cx={250 + sphericalU * 4} cy="145" r="4" fill="#f59e0b" />
                      <text x={250 + sphericalU * 4} y="135" fill="#f59e0b" fontSize="10" textAnchor="middle">Object (u = {sphericalU} cm)</text>

                      {/* Ray Paths */}
                      <line x1={250 + sphericalU * 4} y1="145" x2="250" y2="85" stroke="#f59e0b" strokeWidth="2" />
                      {sphericalData.isReal ? (
                        <line x1="250" y1="85" x2={Math.min(480, 250 + sphericalData.v * 1.5)} y2="145" stroke="#22c55e" strokeWidth="2" />
                      ) : (
                        <>
                          <line x1="250" y1="85" x2="450" y2="55" stroke="#ef4444" strokeWidth="2" />
                          <line x1="250" y1="85" x2={Math.max(20, 250 + sphericalData.v * 0.8)} y2="145" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                        </>
                      )}
                      <text x="250" y="275" fill={sphericalData.isReal ? '#22c55e' : '#ef4444'} fontSize="11" textAnchor="middle">
                        Image Distance v = {sphericalData.v.toFixed(1)} cm ({sphericalData.isReal ? '✓ Real Focus' : '✗ Virtual Focus'})
                      </text>
                    </svg>
                  </div>
                )}

                {/* Lab 3: Lens Maker & Liquid Immersion */}
                {currentSlide === 2 && (
                  <div className="relative w-full h-[290px]">
                    <svg viewBox="0 0 500 290" className="w-full h-full" aria-label="Lens maker formula and liquid submersion diagram">
                      {/* Liquid Medium */}
                      <rect x="30" y="20" width="440" height="250" rx="12" fill={mediumN > 1.2 ? 'rgba(14, 165, 233, 0.2)' : 'transparent'} stroke="#0ea5e9" strokeWidth="1" />
                      <text x="50" y="45" fill="#0ea5e9" fontSize="11">Surrounding Liquid n_med = {mediumN.toFixed(2)}</text>

                      {/* Biconvex Lens */}
                      <path d="M 235,50 Q 255,145 235,240 Q 265,145 235,50" fill="rgba(99, 102, 241, 0.4)" stroke="#818cf8" strokeWidth="2" />

                      {/* Incident Parallel Rays */}
                      <line x1="40" y1="95" x2="245" y2="95" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="40" y1="195" x2="245" y2="195" stroke="#38bdf8" strokeWidth="2" />

                      {/* Refracted Rays */}
                      {lensMakerData.isConverging ? (
                        <>
                          <line x1="245" y1="95" x2={Math.min(460, 250 + lensMakerData.f * 2.5)} y2="145" stroke="#22c55e" strokeWidth="2" />
                          <line x1="245" y1="195" x2={Math.min(460, 250 + lensMakerData.f * 2.5)} y2="145" stroke="#22c55e" strokeWidth="2" />
                          <text x="250" y="280" fill="#22c55e" fontSize="11" textAnchor="middle">
                            ✓ CONVERGING LENS: f = +{lensMakerData.f.toFixed(1)} cm (Power = +{lensMakerData.powerD.toFixed(2)} D)
                          </text>
                        </>
                      ) : (
                        <>
                          <line x1="245" y1="95" x2="460" y2="45" stroke="#ef4444" strokeWidth="2" />
                          <line x1="245" y1="195" x2="460" y2="245" stroke="#ef4444" strokeWidth="2" />
                          <text x="250" y="280" fill="#ef4444" fontSize="11" textAnchor="middle">
                            ✗ DIVERGING LENS (INVERTED!): f = {lensMakerData.f.toFixed(1)} cm (Power = {lensMakerData.powerD.toFixed(2)} D)
                          </text>
                        </>
                      )}
                    </svg>
                  </div>
                )}

                {/* Lab 4: Telescope */}
                {currentSlide === 3 && (
                  <div className="relative w-full h-[290px]">
                    <svg viewBox="0 0 500 290" className="w-full h-full" aria-label="Astronomical telescope ray diagram">
                      {/* Objective Lens */}
                      <ellipse cx="100" cy="145" rx="6" ry="75" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" strokeWidth="2" />
                      <text x="100" y="55" fill="#38bdf8" fontSize="10" textAnchor="middle">Objective (f_o={telescopeFo}cm)</text>

                      {/* Eyepiece Lens */}
                      <ellipse cx={100 + telescopeData.tubeLength * 2.1} cy="145" rx="4" ry="45" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2" />
                      <text x={100 + telescopeData.tubeLength * 2.1} y="85" fill="#a855f7" fontSize="10" textAnchor="middle">Eyepiece (f_e={telescopeFe}cm)</text>

                      {/* Incident Starlight */}
                      <line x1="20" y1="105" x2="100" y2="105" stroke="#f8fafc" strokeWidth="1.5" />
                      <line x1="20" y1="185" x2="100" y2="185" stroke="#f8fafc" strokeWidth="1.5" />

                      {/* Intermediate focus at common focal point */}
                      <line x1="100" y1="105" x2={100 + telescopeFo * 2.1} y2="145" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="100" y1="185" x2={100 + telescopeFo * 2.1} y2="145" stroke="#38bdf8" strokeWidth="1.5" />

                      {/* Parallel Emergence into Eye */}
                      <line x1={100 + telescopeData.tubeLength * 2.1} y1="130" x2="480" y2="130" stroke="#22c55e" strokeWidth="2" />
                      <line x1={100 + telescopeData.tubeLength * 2.1} y1="160" x2="480" y2="160" stroke="#22c55e" strokeWidth="2" />

                      <text x="250" y="270" fill="#22c55e" fontSize="11" textAnchor="middle">
                        Normal Magnification M = -{telescopeData.magNormal.toFixed(1)}x • Barrel Length L = {telescopeData.tubeLength.toFixed(1)} cm
                      </text>
                    </svg>
                  </div>
                )}

                {/* Lab 5: YDSE Wavefront Simulation */}
                {currentSlide === 4 && (
                  <div className="relative w-full h-[290px]">
                    <canvas ref={canvasRef} width={480} height={270} className="w-full h-full rounded-xl bg-slate-950" />
                    <div className="absolute top-2 left-2 px-2.5 py-1 bg-slate-900/80 backdrop-blur rounded border border-slate-700 text-[10px] text-sky-400 font-mono">
                      Fringe Width β = {ydseData.betaMM.toFixed(2)} mm • Slit d = {ydseSlitD} mm
                    </div>
                  </div>
                )}

                {/* Lab 6: Compound Microscope */}
                {currentSlide === 5 && (
                  <div className="relative w-full h-[290px]">
                    <svg viewBox="0 0 500 290" className="w-full h-full" aria-label="Compound microscope ray diagram">
                      <line x1="20" y1="145" x2="480" y2="145" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />

                      {/* Specimen Object */}
                      <line x1="60" y1="145" x2="60" y2="125" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                      <text x="60" y="115" fill="#f59e0b" fontSize="10" textAnchor="middle">Object</text>

                      {/* Small Objective Lens */}
                      <ellipse cx="120" cy="145" rx="5" ry="35" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" strokeWidth="2" />
                      <text x="120" y="95" fill="#38bdf8" fontSize="10" textAnchor="middle">Objective (f_o={microscopeFo}cm)</text>

                      {/* Intermediate Real Inverted Image */}
                      <line x1="260" y1="145" x2="260" y2="185" stroke="#ec4899" strokeWidth="2.5" />
                      <text x="260" y="200" fill="#ec4899" fontSize="10" textAnchor="middle">Real Image (m_o = {microscopeData.mo.toFixed(1)}x)</text>

                      {/* Large Eyepiece Lens */}
                      <ellipse cx="380" cy="145" rx="7" ry="60" fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2" />
                      <text x="380" y="70" fill="#a855f7" fontSize="10" textAnchor="middle">Eyepiece Lens</text>

                      <text x="250" y="275" fill="#22c55e" fontSize="11" textAnchor="middle">
                        Distinct Vision Magnification M = {microscopeData.totalMagDistinct.toFixed(1)}x (Tube Length L = {microscopeL} cm)
                      </text>
                    </svg>
                  </div>
                )}
              </motion.div>

              {/* Interactive Control Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4"
              >
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Live Modulators
                </h3>

                {currentSlide === 0 && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Prism Refracting Angle A</span>
                        <strong className="text-indigo-400">{prismAngle.toFixed(1)}°</strong>
                      </div>
                      <input
                        type="range"
                        min="2.0"
                        max="12.0"
                        step="0.5"
                        value={prismAngle}
                        onChange={(e) => handlePrismAngleChange(parseFloat(e.target.value))}
                        aria-label="Adjust prism refracting angle"
                        aria-valuenow={prismAngle}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Cauchy Constant B</span>
                        <strong className="text-sky-400">{cauchyB.toFixed(3)}</strong>
                      </div>
                      <input
                        type="range"
                        min="0.01"
                        max="0.09"
                        step="0.005"
                        value={cauchyB}
                        onChange={(e) => handleCauchyChange(parseFloat(e.target.value))}
                        aria-label="Adjust Cauchy dispersion constant B"
                        aria-valuenow={cauchyB}
                        className="w-full accent-sky-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 font-mono text-slate-300">
                      <p>n_violet: <span className="text-purple-400">{dispersionData.nv.toFixed(3)}</span></p>
                      <p>n_red: <span className="text-rose-400">{dispersionData.nr.toFixed(3)}</span></p>
                      <p>Angular Dispersion: <span className="text-amber-400">{dispersionData.angularDisp.toFixed(3)}°</span></p>
                      <p>Dispersive Power ω: <span className="text-emerald-400">{dispersionData.dispersivePower.toFixed(4)}</span></p>
                    </div>
                  </>
                )}

                {currentSlide === 1 && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Object Distance u</span>
                        <strong className="text-amber-400">{sphericalU} cm</strong>
                      </div>
                      <input
                        type="range"
                        min="-80"
                        max="-10"
                        step="2"
                        value={sphericalU}
                        onChange={(e) => setSphericalU(parseInt(e.target.value))}
                        aria-label="Adjust spherical refraction object distance u"
                        aria-valuenow={sphericalU}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Curvature Radius R</span>
                        <strong className="text-sky-400">+{sphericalR} cm</strong>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="40"
                        step="2"
                        value={sphericalR}
                        onChange={(e) => setSphericalR(parseInt(e.target.value))}
                        aria-label="Adjust spherical surface radius of curvature"
                        aria-valuenow={sphericalR}
                        className="w-full accent-sky-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono space-y-1 text-slate-300">
                      <p>Formula: n₂/v - n₁/u = (n₂-n₁)/R</p>
                      <p>Calculated v: <strong className={sphericalData.isReal ? 'text-emerald-400' : 'text-rose-400'}>{sphericalData.v.toFixed(1)} cm</strong></p>
                    </div>
                  </>
                )}

                {currentSlide === 2 && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Surrounding Medium Index n</span>
                        <strong className="text-sky-400">{mediumN.toFixed(2)}</strong>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="1.75"
                        step="0.05"
                        value={mediumN}
                        onChange={(e) => handleMediumChange(parseFloat(e.target.value))}
                        aria-label="Adjust surrounding medium refractive index"
                        aria-valuenow={mediumN}
                        className="w-full accent-sky-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono space-y-1 text-slate-300">
                      <p>Glass Index n_g: 1.50</p>
                      <p>Relative Index n_rel: {lensMakerData.nRel.toFixed(3)}</p>
                      <p>Lens Focal Length: <strong className={lensMakerData.isConverging ? 'text-emerald-400' : 'text-rose-400'}>{lensMakerData.f.toFixed(1)} cm</strong></p>
                    </div>
                  </>
                )}

                {currentSlide === 3 && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Objective Focal Length f_o</span>
                        <strong className="text-sky-400">{telescopeFo} cm</strong>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="150"
                        step="5"
                        value={telescopeFo}
                        onChange={(e) => setTelescopeFo(parseInt(e.target.value))}
                        aria-label="Adjust telescope objective focal length"
                        aria-valuenow={telescopeFo}
                        className="w-full accent-sky-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Eyepiece Focal Length f_e</span>
                        <strong className="text-purple-400">{telescopeFe} cm</strong>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="10"
                        step="1"
                        value={telescopeFe}
                        onChange={(e) => setTelescopeFe(parseInt(e.target.value))}
                        aria-label="Adjust telescope eyepiece focal length"
                        aria-valuenow={telescopeFe}
                        className="w-full accent-purple-500"
                      />
                    </div>
                  </>
                )}

                {currentSlide === 4 && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Slit Separation d</span>
                        <strong className="text-sky-400">{ydseSlitD} mm</strong>
                      </div>
                      <input
                        type="range"
                        min="0.15"
                        max="0.60"
                        step="0.05"
                        value={ydseSlitD}
                        onChange={(e) => handleYdseSlitChange(parseFloat(e.target.value))}
                        aria-label="Adjust double slit separation d"
                        aria-valuenow={ydseSlitD}
                        className="w-full accent-sky-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Wavelength λ</span>
                        <strong className="text-emerald-400">{ydseLambda} nm</strong>
                      </div>
                      <input
                        type="range"
                        min="400"
                        max="700"
                        step="25"
                        value={ydseLambda}
                        onChange={(e) => handleYdseLambdaChange(parseInt(e.target.value))}
                        aria-label="Adjust light wavelength lambda"
                        aria-valuenow={ydseLambda}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </>
                )}

                {currentSlide === 5 && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Objective Focal f_o</span>
                        <strong className="text-sky-400">{microscopeFo.toFixed(1)} cm</strong>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="3.0"
                        step="0.1"
                        value={microscopeFo}
                        onChange={(e) => setMicroscopeFo(parseFloat(e.target.value))}
                        aria-label="Adjust microscope objective focal length"
                        aria-valuenow={microscopeFo}
                        className="w-full accent-sky-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Tube Length L</span>
                        <strong className="text-purple-400">{microscopeL} cm</strong>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="24"
                        step="1"
                        value={microscopeL}
                        onChange={(e) => setMicroscopeL(parseInt(e.target.value))}
                        aria-label="Adjust microscope tube length L"
                        aria-valuenow={microscopeL}
                        className="w-full accent-purple-500"
                      />
                    </div>
                  </>
                )}

                {/* Observation Check */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                    Live Phenomenon Check:
                  </span>
                  <p className="text-xs text-slate-300">
                    {OBSERVATION_QUESTIONS[0].question}
                  </p>
                  <div className="space-y-1">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((obs, oIdx) => (
                      <motion.button
                        key={oIdx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleObservation(oIdx)}
                        aria-label={`Select observation answer ${oIdx + 1}: ${obs}`}
                        className={`w-full text-left p-2 rounded-lg text-[11px] border flex items-center justify-between ${
                          observationIndex === oIdx && oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                            : observationIndex === oIdx && oIdx !== OBSERVATION_QUESTIONS[0].correctIndex
                            ? 'bg-rose-950 border-rose-500 text-rose-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        <span>{obs}</span>
                        {observationIndex === oIdx && oIdx === OBSERVATION_QUESTIONS[0].correctIndex && (
                          <span className="text-emerald-400 font-bold ml-1">✓</span>
                        )}
                        {observationIndex === oIdx && oIdx !== OBSERVATION_QUESTIONS[0].correctIndex && (
                          <span className="text-rose-400 font-bold ml-1">✗</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 rounded-2xl border border-emerald-700/50"
            >
              <h2 className="text-lg font-bold text-emerald-300 mb-1">Unrestricted Optics Sandbox</h2>
              <p className="text-xs md:text-sm text-slate-300">
                Manipulate all optical instruments simultaneously with real-time ray and wave dynamics. There is no grading here. Feel free to explore and test edge cases!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2"
              >
                <span className="text-xs font-bold text-indigo-400 uppercase">Prism Dispersion</span>
                <p className="text-xs text-slate-400">Angle: {prismAngle}° | δ_v - δ_r = {dispersionData.angularDisp.toFixed(2)}°</p>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="0.5"
                  value={prismAngle}
                  onChange={(e) => handlePrismAngleChange(parseFloat(e.target.value))}
                  aria-label="Sandbox prism angle"
                  aria-valuenow={prismAngle}
                  className="w-full accent-indigo-500"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2"
              >
                <span className="text-xs font-bold text-sky-400 uppercase">Medium Refractive Index</span>
                <p className="text-xs text-slate-400">n_med: {mediumN.toFixed(2)} ({mediumN > 1.5 ? '✗ Diverges!' : '✓ Converges'})</p>
                <input
                  type="range"
                  min="1.0"
                  max="1.7"
                  step="0.05"
                  value={mediumN}
                  onChange={(e) => handleMediumChange(parseFloat(e.target.value))}
                  aria-label="Sandbox medium index"
                  aria-valuenow={mediumN}
                  className="w-full accent-sky-500"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2"
              >
                <span className="text-xs font-bold text-purple-400 uppercase">Telescope Power</span>
                <p className="text-xs text-slate-400">f_o/f_e = {telescopeFo}/{telescopeFe} = {telescopeData.magNormal.toFixed(1)}x</p>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="10"
                  value={telescopeFo}
                  onChange={(e) => setTelescopeFo(parseInt(e.target.value))}
                  aria-label="Sandbox telescope objective length"
                  aria-valuenow={telescopeFo}
                  className="w-full accent-purple-500"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2"
              >
                <span className="text-xs font-bold text-emerald-400 uppercase">YDSE Fringe Width</span>
                <p className="text-xs text-slate-400">β = {ydseData.betaMM.toFixed(2)} mm</p>
                <input
                  type="range"
                  min="0.15"
                  max="0.60"
                  step="0.05"
                  value={ydseSlitD}
                  onChange={(e) => handleYdseSlitChange(parseFloat(e.target.value))}
                  aria-label="Sandbox double slit spacing"
                  aria-valuenow={ydseSlitD}
                  className="w-full accent-emerald-500"
                />
              </motion.div>
            </div>

            <div className="flex justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Start board examination challenge questions"
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-emerald-600/30 text-base flex items-center gap-2"
              >
                <span>I Am Ready for Challenges!</span>
                <span>→</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: BOARD EXAM CHALLENGE SUITE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Progress Bar & Header */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="font-mono">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="capitalize font-bold text-indigo-400">
                  Competency: {challenge.competencyLevel}
                </span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                  : 'bg-slate-900/90 border-slate-800 text-slate-100'
              }`}
            >
              <h2 className="text-base md:text-lg font-bold mb-4 leading-snug">
                {challenge.question}
              </h2>

              {/* MCQ Type */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`p-4 text-left rounded-xl text-sm font-medium transition-all border flex items-start justify-between ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 border-slate-700 hover:border-indigo-500 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                      )}
                      {showExplanation && i !== challenge.correctIndex && (
                        <span className="text-rose-400/60 font-mono text-xs ml-2">✗</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-Label Type */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Draggable label: ${item.label}`}
                        className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <svg viewBox="0 0 400 180" className="w-full bg-slate-950 rounded-xl border border-slate-800" aria-label="Drop target schematic for lens combination">
                    <line x1="20" y1="90" x2="380" y2="90" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,4" />

                    <rect x="50" y="30" width="110" height="40" rx="8" fill="#1e293b" stroke="#6366f1" />
                    <text x="105" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.part_lens1 || 'Drop Lens 1 here'}</text>
                    <rect x="50" y="30" width="110" height="40" rx="8" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_lens1')} />

                    <rect x="170" y="30" width="110" height="40" rx="8" fill="#1e293b" stroke="#6366f1" />
                    <text x="225" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.part_lens2 || 'Drop Lens 2 here'}</text>
                    <rect x="170" y="30" width="110" height="40" rx="8" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_lens2')} />

                    <rect x="290" y="30" width="100" height="40" rx="8" fill="#1e293b" stroke="#22c55e" />
                    <text x="340" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.part_focus || 'Drop Focus here'}</text>
                    <rect x="290" y="30" width="100" height="40" rx="8" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_focus')} />

                    <rect x="150" y="120" width="100" height="40" rx="8" fill="#1e293b" stroke="#f59e0b" />
                    <text x="200" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.part_axis || 'Drop Axis here'}</text>
                    <rect x="150" y="120" width="100" height="40" rx="8" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_axis')} />
                  </svg>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    aria-label="Verify diagram label mapping"
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-600/30"
                  >
                    Verify Diagram Labels
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Type */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag or re-order items into chronological physical sequence:</p>
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(i => challenge.sortItems![i]) : challenge.sortItems).map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      aria-label={`Sort sequence item ${idx + 1}: ${item}`}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm cursor-grab active:cursor-grabbing flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-900 text-indigo-300 text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    aria-label="Confirm sequential arrangement"
                    className="mt-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-600/30"
                  >
                    Confirm Process Sequence
                  </motion.button>
                </div>
              )}

              {/* Numeric Type */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      aria-label={`Enter numerical answer in ${challenge.unit}`}
                      className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || numericInput === ''}
                      aria-label="Submit numeric calculation"
                      className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-600/30"
                    >
                      Calculate & Submit
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Formula Type */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConstructToggle(part)}
                        aria-label={`Add token ${part} to formula`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono font-bold text-sky-300"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="min-h-[50px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                    {constructParts.map((p, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-indigo-900/70 border border-indigo-700 text-indigo-200 rounded text-xs font-mono flex items-center gap-1"
                      >
                        {p}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => handleConstructRemove(idx)}
                          aria-label={`Remove token ${p}`}
                          className="text-rose-400 ml-1 hover:text-rose-300"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600">Click mathematical tokens above to assemble formula</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Verify constructed optical formula"
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-600/30"
                  >
                    Verify Constructed Formula
                  </motion.button>
                </div>
              )}

              {/* Progressive Step-by-Step Derivation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-800/60 space-y-3"
                >
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Step-by-Step Board Examination Derivation:
                  </h4>
                  <div className="space-y-2">
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                      >
                        <strong className="text-amber-400 mr-1.5">{i + 1}.</strong>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                  </div>

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal subsequent derivation step"
                      className="mt-2 px-4 py-2 bg-amber-800/80 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to next optics challenge"
                      className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & META-COGNITIVE MASTERY PROFILE ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Completion Hero Banner with Personalized Motivational Feedback */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/60 text-center space-y-4 shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border mb-2 ${motivational.badge}`}
              >
                {motivational.title}
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-black text-white">
                Optics Master Certification Complete!
              </h2>

              <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
                {motivational.subtitle}
              </p>

              <div className="flex justify-center gap-6 py-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 w-36"
                >
                  <span className="text-xs text-slate-400 block mb-1">Final Score</span>
                  <strong className="text-2xl font-black text-emerald-400">
                    {Math.max(0, 100 - errors * 5)}%
                  </strong>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 w-36"
                >
                  <span className="text-xs text-slate-400 block mb-1">Mastery Tier</span>
                  <strong className="text-2xl font-black text-indigo-400 capitalize">
                    {masteryLevel}
                  </strong>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 w-36"
                >
                  <span className="text-xs text-slate-400 block mb-1">Errors Logged</span>
                  <strong className={`text-2xl font-black ${errors === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {errors}
                  </strong>
                </motion.div>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setPhase('explore');
                    setCurrentChallenge(0);
                    setErrors(0);
                  }}
                  aria-label="Restart simulation exploration"
                  className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/30"
                >
                  Re-explore Interactive Laboratories 🔄
                </motion.button>
              </div>
            </motion.div>

            {/* Spaced Repetition System (SRS) Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 rounded-2xl border border-indigo-700/50 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="Spaced repetition calendar">📅</span>
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                    Spaced Repetition Schedule (SRS)
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-900/80 border border-indigo-500 text-indigo-200">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Based on your performance ({errors === 0 ? '0 errors — optimal mastery!' : errors <= 3 ? `${errors} minor error${errors > 1 ? 's' : ''} — solid grasp!` : `${errors} errors — needs reinforcement`}), your next optimal review session is scheduled:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className={`p-3 rounded-xl border text-center transition-all ${errors === 0 ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold shadow-md' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                  <span className="block text-[11px] uppercase tracking-wider">0 Errors</span>
                  <span className="text-sm font-black">Review in 7 days</span>
                  <span className="block text-[10px] mt-0.5 opacity-80">Long-term retention</span>
                </div>
                <div className={`p-3 rounded-xl border text-center transition-all ${errors >= 1 && errors <= 3 ? 'bg-sky-950/70 border-sky-500 text-sky-300 font-bold shadow-md' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                  <span className="block text-[11px] uppercase tracking-wider">1–3 Errors</span>
                  <span className="text-sm font-black">Review in 3 days</span>
                  <span className="block text-[10px] mt-0.5 opacity-80">Targeted reinforcement</span>
                </div>
                <div className={`p-3 rounded-xl border text-center transition-all ${errors >= 4 ? 'bg-rose-950/70 border-rose-500 text-rose-300 font-bold shadow-md' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                  <span className="block text-[11px] uppercase tracking-wider">4+ Errors</span>
                  <span className="text-sm font-black">Review in 1 day</span>
                  <span className="block text-[10px] mt-0.5 opacity-80">Immediate review</span>
                </div>
              </div>
              <div className="text-xs text-indigo-400/90 font-mono flex items-center justify-between border-t border-indigo-900/50 pt-2">
                <span>SM-2 Memory Decay Algorithm Active</span>
                <span>Next Recommended Interval: <strong className="text-indigo-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong></span>
              </div>
            </motion.div>

            {/* Misconception Diagnostic Card */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  Targeted Board Exam Misconception Corrections:
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions[idx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ x: 3 }}
                        className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs md:text-sm space-y-1"
                      >
                        <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-400 font-semibold">✓ Accurate Physical Principle: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real-World Activity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 2 }}
                    className="text-xs text-slate-400 flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-indigo-950 text-indigo-400 text-[10px] flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_PhysicsDispersionThroughPrismSim;