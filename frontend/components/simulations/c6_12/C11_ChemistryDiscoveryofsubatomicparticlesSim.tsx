"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// --- NODE IDENTIFIERS ---
const NODE_011 = 'c11_chem_011'; // Discovery of subatomic particles
const NODE_012 = 'c11_chem_012'; // Rutherford's scattering experiment
const NODE_013 = 'c11_chem_013'; // Electromagnetic wave theory and Planck's quantum theory
const NODE_014 = 'c11_chem_014'; // Types of spectra
const NODE_015 = 'c11_chem_015'; // Bohr's atomic model
const NODE_016 = 'c11_chem_016'; // Bohr's model - limitations and hydrogen spectra
const NODE_017 = 'c11_chem_017'; // de Broglie's equation and Heisenberg's uncertainty principle
const NODE_018 = 'c11_chem_018'; // Quantum mechanical model - Schrodinger equation
const NODE_019 = 'c11_chem_019'; // Quantum numbers
const NODE_020 = 'c11_chem_020'; // Shapes of s, p and d orbitals

const ALL_NODE_IDS = [
  NODE_011, NODE_012, NODE_013, NODE_014, NODE_015,
  NODE_016, NODE_017, NODE_018, NODE_019, NODE_020
] as const;

type NodeID = typeof ALL_NODE_IDS[number];

// --- INTERFACES ---
interface BKTState {
  pL: number;
  pG: number;
  pS: number;
  pT: number;
}

type BKTMap = Record<NodeID, ReturnType<typeof createBKTState>>;

interface ChallengeOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  misconceptionRef?: string;
}

interface Challenge {
  id: string;
  nodeId: NodeID;
  title: string;
  subtitle: string;
  question: string;
  hint: string;
  options: ChallengeOption[];
  calcInput?: {
    targetValue: number;
    tolerance: number;
    unit: string;
    prompt: string;
  };
}

interface TeachingSlide {
  id: string;
  nodeId: NodeID;
  title: string;
  subtitle: string;
  content: string;
  keyPoints: string[];
  labTab: 'discharge' | 'rutherford' | 'planck' | 'spectra' | 'bohr' | 'debroglie' | 'schrodinger' | 'orbitals';
}

// --- CONSTANTS & DATA ---
const SCENARIO = {
  title: "The Subatomic Journey: From Rays to Quantum Orbitals",
  description: "Step into the ultimate atomic physics & chemistry laboratory. Re-enact landmark experiments—from Thomson's discharge tube and Rutherford's gold foil to Planck's quanta, Bohr's jumps, de Broglie's matter waves, and Schrödinger's 3D electron probability clouds.",
  targetAudience: "Class 11 (ISC) Chemistry Students"
};

const DISCOVERY_QUESTION = {
  question: "If an atom is mostly empty space with a tiny positive nucleus, why don't orbiting negative electrons continuously radiate energy and collapse into the nucleus as classical physics predicts?",
  options: [
    { id: 'c1', text: "Electrons carry anti-gravity charges that repel the nucleus.", isCorrect: false, feedback: "Incorrect. Gravitational forces inside atoms are negligible compared to electrostatic attraction." },
    { id: 'c2', text: "Electrons exist in stationary non-radiating quantum states, and behave like 3D standing probability waves.", isCorrect: true, feedback: "Spot on! Planck's quantisation, Bohr's stationary states, and Schrödinger's wave mechanics solved classical collapse." },
    { id: 'c3', text: "The positive charge of the nucleus shields the magnetic radiation completely.", isCorrect: false, feedback: "Incorrect. Electrostatic shielding occurs between electrons, not between nucleus and radiating accelerated charges." },
    { id: 'c4', text: "Electrons travel at the speed of light so time stops for them.", isCorrect: false, feedback: "Incorrect. Electron velocities in hydrogen (n=1) are ~2.188 x 10^6 m/s, about 0.7% the speed of light." }
  ]
};

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_011',
    nodeId: NODE_011,
    title: "1. Discovery of Subatomic Particles",
    subtitle: "Cathode Rays, Canal Rays & Chadwick's Neutron",
    content: "High-voltage discharge tubes revealed cathode rays (electrons with constant e/m ratio) and Goldstein's canal rays (positive gas ions whose e/m depends on gas species). Chadwick later bombarded Beryllium with alpha particles to discover the neutral neutron.",
    keyPoints: [
      "Electron: mass ~9.1x10^-31 kg, charge -1.602x10^-19 C, e/m is universal.",
      "Proton: H+ canal ray, mass ~1.673x10^-27 kg, charge +1.602x10^-19 C.",
      "Neutron: neutral particle, mass ~1.675x10^-27 kg (discovered 1932)."
    ],
    labTab: 'discharge'
  },
  {
    id: 'slide_012',
    nodeId: NODE_012,
    title: "2. Rutherford's Scattering Experiment",
    subtitle: "Probing the Atom with Alpha Particles",
    content: "Alpha particles (He2+) fired at a thin gold foil revealed that most passed straight through, some deflected at small angles, and ~1 in 8,000 bounced back (>90 deg). This proved the existence of a dense positive core: the nucleus.",
    keyPoints: [
      "Most of the atom is empty space (~10^-10 m atom vs ~10^-15 m nucleus).",
      "Dense positive nucleus contains almost all atomic mass.",
      "Defect: Classical physics predicted orbiting electrons would spiral inward in 10^-12 s."
    ],
    labTab: 'rutherford'
  },
  {
    id: 'slide_013',
    nodeId: NODE_013,
    title: "3. Quantum Theory & Electromagnetic Radiation",
    subtitle: "Planck's Constant & Photon Energy",
    content: "Classical wave theory suffered the 'ultraviolet catastrophe' and failed to explain the photoelectric threshold. Max Planck proposed energy quantization E = hν (where h = 6.626 x 10^-34 J s).",
    keyPoints: [
      "Light behaves as discrete packets of energy called photons: E = hν = hc / λ.",
      "Photoelectric effect: Ejection depends on photon frequency ν, not light intensity.",
      "Shorter wavelength (UV/Blue) light carries higher energy photons than long wavelength (Red/IR)."
    ],
    labTab: 'planck'
  },
  {
    id: 'slide_014',
    nodeId: NODE_014,
    title: "4. Types of Spectra & Spectral Fingerprints",
    subtitle: "Continuous, Emission, Absorption, Line vs Band",
    content: "Quantized electronic energy jumps produce unique line spectra for isolated atoms (e.g. Sodium D-lines, Hydrogen series), while molecules produce band spectra due to closely spaced vibrational-rotational energy levels.",
    keyPoints: [
      "Continuous spectrum: unbroken rainbow from incandescent solids/liquids.",
      "Emission spectrum: bright lines on dark background as excited electrons drop.",
      "Absorption spectrum: dark lines on continuous rainbow when cool gas absorbs matching hν."
    ],
    labTab: 'spectra'
  },
  {
    id: 'slide_015_016',
    nodeId: NODE_015,
    title: "5. Bohr's Atomic Model & Hydrogen Spectra",
    subtitle: "Stationary Orbits & Rydberg Formula",
    content: "Niels Bohr postulated stationary orbits where angular momentum m v r = n h / (2π). Energy levels En = -13.6 / n^2 eV. Transitions generate spectral series calculated by Rydberg's equation 1/λ = R_H (1/n1^2 - 1/n2^2).",
    keyPoints: [
      "Lyman (n1=1, UV), Balmer (n1=2, Visible), Paschen (n1=3, IR).",
      "Rydberg Constant R_H ≈ 1.097 x 10^7 m^-1.",
      "Limitations: Cannot explain multi-electron atoms, fine structure splitting, Zeeman/Stark effects, or electron wave nature."
    ],
    labTab: 'bohr'
  },
  {
    id: 'slide_017',
    nodeId: NODE_017,
    title: "6. Wave-Particle Duality & Uncertainty",
    subtitle: "de Broglie Wavelength & Heisenberg Uncertainty Principle",
    content: "de Broglie proposed matter waves λ = h / (m v). Heisenberg proved Δx · Δp ≥ h / (4π), proving that exact electron trajectories (Bohr's orbits) are physically impossible to measure.",
    keyPoints: [
      "Electrons show wave diffraction (Davisson-Germer); macroscopic objects have immeasurably small λ.",
      "Heisenberg limit: Pinpointing position (small Δx) violently disturbs momentum (large Δp).",
      "Replaced fixed orbits with 3D probability density maps."
    ],
    labTab: 'debroglie'
  },
  {
    id: 'slide_018',
    nodeId: NODE_018,
    title: "7. The Quantum Mechanical Model",
    subtitle: "Schrödinger Equation & Orbital Probability Clouds",
    content: "The Schrödinger wave equation HΨ = EΨ yields the wave function Ψ. While Ψ is amplitude, |Ψ|^2 represents probability density—the chance per unit volume of finding an electron.",
    keyPoints: [
      "Orbital: 3D region of space around nucleus where |Ψ|^2 is high (~90-95%).",
      "Orbit vs Orbital: Orbit is 2D fixed circle (Bohr); Orbital is 3D wave probability cloud.",
      "Radial probability curve (4π r^2 |Ψ|^2) determines most probable distance."
    ],
    labTab: 'schrodinger'
  },
  {
    id: 'slide_019_020',
    nodeId: NODE_019,
    title: "8. Quantum Numbers & Orbital Shapes",
    subtitle: "n, l, m, s and Shapes of s, p, d Orbitals",
    content: "Four quantum numbers specify electron states: n (shell/size), l (subshell/shape), m (orientation), s (spin). Subshells contain 2l+1 orbitals holding max 2n^2 electrons per shell.",
    keyPoints: [
      "s orbital (l=0): Spherical, non-directional (1 orbital).",
      "p orbital (l=1): Dumbbell shape along px, py, pz axes (3 orbitals, 1 nodal plane).",
      "d orbital (l=2): Cloverleaf shapes (dxy, dyz, dxz, dx^2-y^2) and dz^2 doughnut (5 orbitals)."
    ],
    labTab: 'orbitals'
  }
];

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_011',
    nodeId: NODE_011,
    title: "Discharge Tube Specific Charge Analysis",
    subtitle: "Node c11_chem_011",
    question: "Why does the charge-to-mass ratio (e/m) of anode rays (canal rays) vary with the gas inside the discharge tube, whereas cathode rays maintain a constant e/m ratio?",
    hint: "Think about what particles actually make up cathode rays vs anode rays.",
    options: [
      {
        id: 'opt1',
        text: "Anode rays consist of positive gas ions (mass depends on gas atom), while cathode rays are universal electrons stripped from matter.",
        isCorrect: true,
        explanation: "Correct! Cathode rays are elementary electrons (constant mass & charge). Anode rays are residual gas cations (H+, He+, Ne+), so their ion mass changes with gas species."
      },
      {
        id: 'opt2',
        text: "Cathode rays are light photons with no mass, while anode rays are neutral atoms.",
        isCorrect: false,
        explanation: "Cathode rays are charged material particles (electrons), not photons. Anode rays are positive ions, not neutral atoms."
      },
      {
        id: 'opt3',
        text: "The electric field inside the discharge tube only accelerates cathode rays.",
        isCorrect: false,
        explanation: "Both positive and negative charged particles experience electric force in opposite directions."
      }
    ]
  },
  {
    id: 'ch_012',
    nodeId: NODE_012,
    title: "Rutherford Scattering Rebound Ratio",
    subtitle: "Node c11_chem_012",
    question: "In a gold-foil scattering experiment, approximately 1 in 8,000 alpha particles rebounded backward by >90 degrees. What fundamental atomic feature does this prove?",
    hint: "A tiny rebound fraction means the repulsive force is concentrated in an extremely small volume.",
    options: [
      {
        id: 'opt1',
        text: "Electrons are concentrated in a dense outer shell that repels positive alpha particles.",
        isCorrect: false,
        explanation: "Electrons are far too light (~1/7350th mass of alpha particle) to bounce a heavy alpha particle back!"
      },
      {
        id: 'opt2',
        text: "Positive charge and almost all mass are concentrated in a tiny central nucleus (~10^-15 m across).",
        isCorrect: true,
        explanation: "Spot on! The rare rebound proves direct head-on collision with an incredibly dense, positively charged nucleus."
      },
      {
        id: 'opt3',
        text: "Gold foil atoms are solid indivisible spheres with no internal structure.",
        isCorrect: false,
        explanation: "If atoms were solid spheres (Dalton model), ALL alpha particles would rebound, not just 1 in 8,000!"
      }
    ]
  },
  {
    id: 'ch_013',
    nodeId: NODE_013,
    title: "Photon Energy Calculation",
    subtitle: "Node c11_chem_013",
    question: "Calculate the energy of a single photon from a blue laser having a wavelength λ = 400 nm. (Given h = 6.626 x 10^-34 J s, c = 3.0 x 10^8 m/s).",
    hint: "Use E = h c / λ. Convert 400 nm to metres: 400 x 10^-9 m.",
    options: [
      {
        id: 'opt1',
        text: "4.97 x 10^-19 J",
        isCorrect: true,
        explanation: "E = (6.626x10^-34 * 3x10^8) / (400x10^-9) = 1.9878x10^-25 / 4x10^-7 = 4.9695 x 10^-19 Joules."
      },
      {
        id: 'opt2',
        text: "2.84 x 10^-27 J",
        isCorrect: false,
        explanation: "Make sure you converted nanometres to metres (1 nm = 10^-9 m)."
      },
      {
        id: 'opt3',
        text: "7.95 x 10^-15 J",
        isCorrect: false,
        explanation: "Check your power of 10 arithmetic when dividing by 10^-7."
      }
    ]
  },
  {
    id: 'ch_014',
    nodeId: NODE_014,
    title: "Atomic Line vs Molecular Band Spectrum",
    subtitle: "Node c11_chem_014",
    question: "A scientist observes a spectrum consisting of broad, closely spaced clusters of lines that merge into ribbons. What species produced this spectrum and why?",
    hint: "Which chemical species possesses extra vibrational and rotational energy levels?",
    options: [
      {
        id: 'opt1',
        text: "Isolated Sodium atoms because atomic electronic levels split into fine lines.",
        isCorrect: false,
        explanation: "Isolated atoms produce sharp discrete line spectra, not broad band spectra."
      },
      {
        id: 'opt2',
        text: "Molecular nitrogen (N2) because electronic transitions are overlaid with quantised vibrational & rotational transitions.",
        isCorrect: true,
        explanation: "Correct! Molecules possess quantised vibrational and rotational states closely spaced around electronic levels, producing band spectra."
      },
      {
        id: 'opt3',
        text: "Hot incandescent tungsten filament producing a continuous thermal rainbow.",
        isCorrect: false,
        explanation: "Tungsten solids give an unbroken continuous spectrum, not distinct bands of lines."
      }
    ]
  },
  {
    id: 'ch_015',
    nodeId: NODE_015,
    title: "Bohr Radius & Energy Scaling",
    subtitle: "Node c11_chem_015",
    question: "For a hydrogen atom in the 3rd orbit (n = 3), what are its orbital radius r3 and total energy E3?",
    hint: "r_n = 0.529 · n^2 Å, E_n = -13.6 / n^2 eV.",
    options: [
      {
        id: 'opt1',
        text: "r3 = 4.761 Å, E3 = -1.51 eV",
        isCorrect: true,
        explanation: "r3 = 0.529 * 3^2 = 4.761 Å. E3 = -13.6 / 3^2 = -13.6 / 9 = -1.511 eV."
      },
      {
        id: 'opt2',
        text: "r3 = 1.587 Å, E3 = -4.53 eV",
        isCorrect: false,
        explanation: "Remember that radius scales with n^2 (3^2=9), not with n!"
      },
      {
        id: 'opt3',
        text: "r3 = 4.761 Å, E3 = +1.51 eV",
        isCorrect: false,
        explanation: "Bound electron energy in an atom is always negative!"
      }
    ]
  },
  {
    id: 'ch_016',
    nodeId: NODE_016,
    title: "Hydrogen Spectral Transition & Balmer Wavelength",
    subtitle: "Node c11_chem_016",
    question: "An excited electron in hydrogen falls from n2 = 3 to n1 = 2 (H-alpha line). In which spectral region does this line appear and what is its wavelength?",
    hint: "Balmer series (n1=2) lies in the visible spectrum. Use 1/λ = R_H (1/2^2 - 1/3^2).",
    options: [
      {
        id: 'opt1',
        text: "Visible Red region at λ ≈ 656.3 nm",
        isCorrect: true,
        explanation: "1/λ = 1.097x10^7 * (1/4 - 1/9) = 1.097x10^7 * (5/36) => λ ≈ 6.563x10^-7 m = 656.3 nm (Visible H-alpha red line)."
      },
      {
        id: 'opt2',
        text: "Ultraviolet region at λ ≈ 121.6 nm",
        isCorrect: false,
        explanation: "121.6 nm is the Lyman-alpha line (n2=2 to n1=1) in the UV region."
      },
      {
        id: 'opt3',
        text: "Infrared region at λ ≈ 1875 nm",
        isCorrect: false,
        explanation: "1875 nm belongs to the Paschen series (n1=3) in the Infrared region."
      }
    ]
  },
  {
    id: 'ch_017',
    nodeId: NODE_017,
    title: "de Broglie & Heisenberg Limits",
    subtitle: "Node c11_chem_017",
    question: "If an electron's position is localized within Δx = 1.0 x 10^-10 m (atomic scale), what is the minimum uncertainty in its momentum Δp?",
    hint: "Use Heisenberg's relation Δx · Δp ≥ h / (4π). (h/4π ≈ 5.27 x 10^-35 J s).",
    options: [
      {
        id: 'opt1',
        text: "Δp ≥ 5.27 x 10^-25 kg m/s",
        isCorrect: true,
        explanation: "Δp = (6.626x10^-34 / (4 * 3.1416)) / 1.0x10^-10 = 5.27 x 10^-35 / 10^-10 = 5.27 x 10^-25 kg m/s."
      },
      {
        id: 'opt2',
        text: "Δp ≥ 6.63 x 10^-44 kg m/s",
        isCorrect: false,
        explanation: "Do not forget to divide h by 4π before dividing by Δx."
      },
      {
        id: 'opt3',
        text: "Δp = 0 because quantum particles have exact trajectories.",
        isCorrect: false,
        explanation: "Heisenberg's principle proves Δx and Δp can never simultaneously be zero!"
      }
    ]
  },
  {
    id: 'ch_018',
    nodeId: NODE_018,
    title: "Wave Function Ψ vs Probability Density |Ψ|^2",
    subtitle: "Node c11_chem_018",
    question: "In the Schrödinger quantum mechanical model, what is the physical significance of the wave function Ψ versus its squared magnitude |Ψ|^2?",
    hint: "Think about whether wave amplitude by itself can be negative or measurable.",
    options: [
      {
        id: 'opt1',
        text: "Ψ represents wave amplitude (can be negative/complex); |Ψ|^2 represents real probability density of finding the electron per unit volume.",
        isCorrect: true,
        explanation: "Spot on! Ψ has no direct physical measurability, whereas |Ψ|^2 is the always non-negative probability density."
      },
      {
        id: 'opt2',
        text: "Ψ is the circular orbit radius and |Ψ|^2 is the electron charge.",
        isCorrect: false,
        explanation: "Incorrect. Orbits are replaced by 3D probability density maps |Ψ|^2."
      },
      {
        id: 'opt3',
        text: "Both Ψ and |Ψ|^2 give the exact velocity of the electron at any instant.",
        isCorrect: false,
        explanation: "Heisenberg's uncertainty principle forbids knowing exact velocity at a precise coordinate."
      }
    ]
  },
  {
    id: 'ch_019_020',
    nodeId: NODE_019,
    title: "Quantum Number Set & Orbital Node Analysis",
    subtitle: "Nodes c11_chem_019 & c11_chem_020",
    question: "For a 3p orbital (n = 3, l = 1), determine the number of radial nodes, angular nodes, total nodes, and valid magnetic quantum numbers m.",
    hint: "Radial nodes = n - l - 1. Angular nodes = l. Total nodes = n - 1.",
    options: [
      {
        id: 'opt1',
        text: "1 radial node, 1 angular node, 2 total nodes; m = {-1, 0, +1}.",
        isCorrect: true,
        explanation: "Correct! Radial = 3-1-1 = 1; Angular = 1; Total = 3-1 = 2; m ranges from -l to +l {-1, 0, +1} forming px, py, pz."
      },
      {
        id: 'opt2',
        text: "2 radial nodes, 0 angular nodes, 2 total nodes; m = {0}.",
        isCorrect: false,
        explanation: "That would describe a 3s orbital (l=0), not a 3p orbital (l=1)!"
      },
      {
        id: 'opt3',
        text: "0 radial nodes, 3 angular nodes, 3 total nodes; m = {-2, -1, 0, +1, +2}.",
        isCorrect: false,
        explanation: "That describes a d subshell (l=2), not a p subshell (l=1)."
      }
    ]
  }
];

const MISCONCEPTIONS = [
  {
    title: "Confusing Cathode and Anode Rays",
    description: "Students often write that anode rays are fundamental particles like cathode rays. Anode rays are gas cations whose e/m ratio depends on the gas enclosed in the tube.",
    nodeId: NODE_011
  },
  {
    title: "Rebounding Alpha Particles Misinterpretation",
    description: "Thinking electrons deflect alpha particles. Electrons are 1/7350x lighter and cannot deflect fast He2+ ions; only the dense positive nucleus causes large deflection.",
    nodeId: NODE_012
  },
  {
    title: "Intensity vs Frequency in Photoelectric Effect",
    description: "Assuming brighter low-frequency light will eventually eject electrons. Ejection depends solely on photon frequency ν > threshold ν0; intensity only changes photon flux.",
    nodeId: NODE_013
  },
  {
    title: "Bohr Model Applicability",
    description: "Applying Bohr's formula to multi-electron atoms (e.g., Helium, Carbon). Bohr's model is strictly valid ONLY for 1-electron systems (H, He+, Li2+).",
    nodeId: NODE_015
  },
  {
    title: "Orbit vs Orbital",
    description: "Treating orbitals as 2D planar circular tracks. An orbital is a 3D probability cloud region |Ψ|^2 where finding an electron is probable.",
    nodeId: NODE_018
  }
];

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Anode Rays Originate Directly From the Anode Electrode Material",
    description: "Students often believe that canal rays (anode rays) are emitted directly from the surface of the anode electrode, analogous to cathode rays coming from the cathode. They assume the nature of the anode material determines the ray properties.",
    correction: "Canal rays are not emitted from the anode; instead, they are positive ions produced when cathode rays ionize the neutral gas molecules remaining inside the tube. Because these rays consist of different gaseous ions, their charge-to-mass ratio depends entirely on the identity of the gas inside the tube. In contrast, cathode rays consist of identical electrons regardless of the gas used.",
  },
  {
    id: "misc_2",
    title: "Alpha Particles Rebound Due to Solid Physical Nuclear Collisions",
    description: "Students assume that the small fraction of alpha particles deflected backwards in Rutherford's gold foil experiment physically collided with a hard, solid nuclear surface. They view the nucleus as a rigid billiard-ball-like obstacle.",
    correction: "The large-angle deflection and rebounding of positively charged alpha particles occur due to electrostatic Coulombic repulsion from the concentrated positive charge inside the nucleus. As an alpha particle approaches the extremely dense positive nucleus, strong repulsive forces slow it down and turn its trajectory back without any direct physical contact. The deflection is purely an electromagnetic interaction rather than a mechanical impact.",
  },
  {
    id: "misc_3",
    title: "Thomson Directly Measured Individual Charge and Mass of Electrons",
    description: "Students frequently believe J.J. Thomson directly measured the exact charge and exact mass of the electron as individual values during his cathode ray experiments. They confuse his determination of a specific ratio with the absolute measurement of its components.",
    correction: "J.J. Thomson only determined the specific charge-to-mass ratio (e/m) of cathode ray particles by balancing deflections from electric and magnetic fields. He was unable to isolate either the absolute charge or the mass of the electron independently. The individual elementary charge was later measured by Millikan, allowing scientists to calculate the electron's mass using Thomson's ratio.",
  },
  {
    id: "misc_4",
    title: "Oil Droplets in Millikan's Experiment Are Naturally Electrically Charged",
    description: "Students often believe that the oil droplets used in Millikan's experiment are inherently charged or become charged merely by falling through air. They overlook the external mechanisms required to impart charge onto the drops.",
    correction: "In Millikan's oil drop experiment, neutral oil droplets acquire charge through friction at the atomizer nozzle or by absorbing ions produced when X-rays ionize the surrounding air. By controlling the electric field to suspend these charged drops, Millikan demonstrated that electric charge is quantized as integral multiples of a fundamental constant. Oil droplets do not inherently possess an electrical charge on their own.",
  },
  {
    id: "misc_5",
    title: "Cathode Ray Charge to Mass Ratio Depends on Residual Gas",
    description: "Students assume that changing the gas inside the discharge tube alters the charge-to-mass ratio (e/m) of cathode rays. They treat cathode rays similarly to anode rays in terms of gas dependency.",
    correction: "Cathode rays are streams of electrons, which are universal fundamental particles present in all atoms regardless of the element. Consequently, the charge-to-mass ratio (e/m) of cathode rays remains completely constant irrespective of the gas used or the electrode material. Gas identity only affects canal rays, whose constituent particles are heavier positive ions.",
  },
];

// --- MAIN REACT COMPONENT ---
export default function C11_ChemistryDiscoveryofsubatomicparticlesSim() {
  // Navigation & Game State
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenge' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [activeLabTab, setActiveLabTab] = useState<'discharge' | 'rutherford' | 'planck' | 'spectra' | 'bohr' | 'debroglie' | 'schrodinger' | 'orbitals'>('discharge');
  
  // Score & Mastery Tracking
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT State for all 10 nodes
  const [bktMap, setBktMap] = useState<BKTMap>(() => {
    const initial: Partial<BKTMap> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial as BKTMap;
  });

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<string | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenge Response State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [calcInputValue, setCalcInputValue] = useState<string>('');

  // ---------------------------------------------------------
  // LAB SIMULATION STATES
  // ---------------------------------------------------------

  // Lab 1: Discharge Tube
  const [gasType, setGasType] = useState<'H2' | 'He' | 'Ne'>('H2');
  const [tubeVoltage, setTubeVoltage] = useState<number>(5000); // Volts
  const [electricField, setElectricField] = useState<'off' | 'up' | 'down'>('up');
  const [rayMode, setRayMode] = useState<'cathode' | 'anode'>('cathode');

  // Lab 2: Rutherford Gold Foil
  const [alphaParticleCount, setAlphaParticleCount] = useState<number>(0);
  const [deflectionStats, setDeflectionStats] = useState<{ straight: number; small: number; rebound: number }>({ straight: 0, small: 0, rebound: 0 });
  const [isFiringAlpha, setIsFiringAlpha] = useState<boolean>(false);
  const [foilMaterial, setFoilMaterial] = useState<'gold' | 'aluminum'>('gold');

  // Lab 3: Planck & Photoelectric
  const [lightWavelength, setLightWavelength] = useState<number>(450); // nm
  const [lightIntensity, setLightIntensity] = useState<number>(50); // %
  const [targetMetal, setTargetMetal] = useState<'Na' | 'Cu' | 'Pt'>('Na'); // Work functions: Na=2.3eV, Cu=4.7eV, Pt=5.6eV

  // Lab 4: Spectra Simulator
  const [spectrumMode, setSpectrumMode] = useState<'emission' | 'absorption' | 'continuous' | 'band'>('emission');
  const [spectraGas, setSpectraGas] = useState<'hydrogen' | 'sodium' | 'nitrogen'>('hydrogen');

  // Lab 5: Bohr Atom
  const [bohrN, setBohrN] = useState<number>(1);
  const [isElectronTransitioning, setIsElectronTransitioning] = useState<boolean>(false);
  const [emittedPhotonWavelength, setEmittedPhotonWavelength] = useState<number | null>(null);

  // Lab 6: de Broglie & Heisenberg
  const [particleMassType, setParticleMassType] = useState<'electron' | 'proton' | 'cricket_ball'>('electron');
  const [particleVelocity, setParticleVelocity] = useState<number>(2.0e6); // m/s
  const [slitWidth, setSlitWidth] = useState<number>(1.0e-10); // m (Delta x)

  // Lab 7: Schrödinger Probability Density
  const [schrodingerState, setSchrodingerState] = useState<'1s' | '2s' | '2p' | '3s'>('1s');

  // Lab 8: Quantum Numbers & Orbitals
  const [qnN, setQnN] = useState<number>(2);
  const [qnL, setQnL] = useState<number>(1);
  const [qnM, setQnM] = useState<number>(0);
  const [qnS, setQnS] = useState<number>(0.5);
  const [orbitalRotation, setOrbitalRotation] = useState<number>(0);

  // Audio helper wrapper
  const playSound = useCallback((type: SoundEffect | 'success' | 'error' | 'celebration' | 'hint' | 'pickup' | 'drop-correct' | 'drop-wrong' | 'whoosh' | 'sparkle' | 'chime' | 'pop' | 'count' | 'balance' | 'swoop') => {
    try {
      audioManager.play(type);
    } catch (e) {
      console.warn("Audio play prevented:", e);
    }
  }, []);

  const speakText = useCallback((text: string) => {
    try {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    } catch (e) {
      console.warn("Speech synthesis prevented:", e);
    }
  }, []);

  // Update BKT & SRS helper
  const updateNodeMastery = useCallback((nodeId: NodeID, isCorrect: boolean) => {
    setBktMap(prev => {
      const current = prev[nodeId] || createBKTState();
      const updated = bktUpdate(current, isCorrect);
      const level = masteryProb(updated);
      recordGameScore(ALL_NODE_IDS, Math.round(level * 100));
      return { ...prev, [nodeId]: updated };
    });

    // SRS Spaced repetition update
    const revItem = createReviewItem(nodeId, 'Chemistry');
    const rating = isCorrect ? 4 : 1;
    sm2Update(revItem, rating, 0);
  }, []);

  // Handle Discovery Question Submit
  const handleDiscoverySubmit = (optionId: string) => {
    playSound('tap');
    setDiscoverySelected(optionId);
    setDiscoverySubmitted(true);
    const opt = DISCOVERY_QUESTION.options.find(o => o.id === optionId);
    if (opt?.isCorrect) {
      playSound('success');
      speakText("Correct! Quantum mechanics replaced classical radiating orbits with non-radiating wave states.");
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      playSound('error');
      speakText(opt?.feedback || "Not quite right.");
    }
  };

  // Rutherford Alpha Gun Animation
  const fireAlphaParticles = useCallback(() => {
    if (isFiringAlpha) return;
    setIsFiringAlpha(true);
    playSound('whoosh');

    let count = 0;
    let straight = 0;
    let small = 0;
    let rebound = 0;

    const interval = setInterval(() => {
      count += 50;
      // 1 in 8000 rebound, ~5% small deflection, rest straight
      for (let i = 0; i < 50; i++) {
        const rand = Math.random();
        if (rand < 0.000125) rebound++;
        else if (rand < 0.05) small++;
        else straight++;
      }

      setAlphaParticleCount(prev => prev + 50);
      setDeflectionStats(prev => ({
        straight: prev.straight + straight,
        small: prev.small + small,
        rebound: prev.rebound + rebound
      }));

      if (count >= 500) {
        clearInterval(interval);
        setIsFiringAlpha(false);
        playSound('pop');
        if (rebound > 0) {
          playSound('sparkle');
          speakText("Nuclear rebound detected! Direct hit on a dense positive nucleus.");
        }
      }
    }, 100);
  }, [isFiringAlpha, playSound, speakText]);

  // Photoelectric Work Functions (in eV)
  const workFunctions = { Na: 2.3, Cu: 4.7, Pt: 5.6 };
  const currentPhotonEnergyEv = useMemo(() => {
    // E = hc / λ = (1240 eV nm) / λ(nm)
    return parseFloat((1240 / lightWavelength).toFixed(2));
  }, [lightWavelength]);

  const isPhotoelectricEjection = useMemo(() => {
    return currentPhotonEnergyEv >= workFunctions[targetMetal];
  }, [currentPhotonEnergyEv, targetMetal]);

  // Bohr calculations
  const bohrRadius = useMemo(() => (0.529 * Math.pow(bohrN, 2)).toFixed(3), [bohrN]);
  const bohrEnergy = useMemo(() => (-13.6 / Math.pow(bohrN, 2)).toFixed(2), [bohrN]);
  const bohrVelocity = useMemo(() => (2.188 / bohrN).toFixed(3), [bohrN]); // x10^6 m/s

  const triggerBohrTransition = (targetN: number) => {
    if (targetN === bohrN || isElectronTransitioning) return;
    setIsElectronTransitioning(true);
    playSound('swoop');

    // Calculate wavelength via Rydberg: 1/λ = R (1/n1^2 - 1/n2^2)
    const n1 = Math.min(bohrN, targetN);
    const n2 = Math.max(bohrN, targetN);
    const R = 1.097e7; // m^-1
    const invLambda = R * (1 / (n1 * n1) - 1 / (n2 * n2));
    const lambdaNm = Math.round((1 / invLambda) * 1e9);

    setEmittedPhotonWavelength(lambdaNm);
    setBohrN(targetN);

    setTimeout(() => {
      setIsElectronTransitioning(false);
      playSound(targetN > bohrN ? 'pop' : 'chime');
      if (targetN < bohrN) {
        speakText(`Electron fell to level ${targetN}, emitting a photon of ${lambdaNm} nanometres.`);
      } else {
        speakText(`Electron absorbed photon energy and jumped to level ${targetN}.`);
      }
    }, 800);
  };

  // de Broglie wavelength calculation
  const deBroglieLambda = useMemo(() => {
    const h = 6.626e-34;
    let m = 9.1e-31; // electron kg
    if (particleMassType === 'proton') m = 1.673e-27;
    if (particleMassType === 'cricket_ball') m = 0.16;

    const lambda = h / (m * particleVelocity);
    return lambda;
  }, [particleMassType, particleVelocity]);

  // Heisenberg Uncertainty delta P
  const heisenbergDeltaP = useMemo(() => {
    const h = 6.626e-34;
    return h / (4 * Math.PI * slitWidth);
  }, [slitWidth]);

  // Handle Challenge Option Submission
  const handleChallengeSubmit = (option: ChallengeOption) => {
    if (challengeSubmitted) return;
    setSelectedOption(option.id);
    setChallengeSubmitted(true);

    const currentCh = CHALLENGES[currentChallengeIndex];
    if (option.isCorrect) {
      playSound('drop-correct');
      setScore(prev => prev + 100 + streak * 10);
      setStreak(prev => prev + 1);
      updateNodeMastery(currentCh.nodeId, true);
      speakText("Excellent analysis! That's completely correct.");
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccess(true);
        playSound('celebration');
        speakText("Congratulations! You have mastered subatomic discovery and quantum atomic structure.");
      }
    } else {
      playSound('drop-wrong');
      setStreak(0);
      updateNodeMastery(currentCh.nodeId, false);
      speakText(option.explanation);
    }
  };

  const handleNextChallenge = () => {
    playSound('tap');
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setShowHint(false);
    } else {
      setActiveTab('summary');
    }
  };

  // Overall Mastery Calculation
  const overallMasteryPercent = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach(id => {
      total += masteryProb(bktMap[id] || createBKTState());
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 select-none">
      {/* GLOBAL HEADER */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-500 via-gold-500 to-purple-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
            <span className="text-2xl font-black text-white">⚛</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gold-400 via-gold-200 to-purple-300 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">{SCENARIO.targetAudience} • Interactive Chemistry Simulator</p>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-400">Mastery</div>
            <div className="text-sm font-bold text-gold-400">{overallMasteryPercent}%</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400">Score</div>
            <div className="text-sm font-bold text-emerald-400">{score}</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400">Streak</div>
            <div className="text-sm font-bold text-amber-400">🔥 {streak}</div>
          </div>
        </div>
      </header>

      {/* TOP NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto my-6 flex flex-wrap gap-2 justify-center border-b border-slate-800 pb-3">
        {[
          { id: 'discovery', label: '1. Discovery Question', icon: '🔍' },
          { id: 'learn', label: '2. Concepts & Theory', icon: '📚' },
          { id: 'lab', label: '3. Virtual Lab Engine', icon: '🧪' },
          { id: 'challenge', label: '4. Mastery Challenges', icon: '🎯' },
          { id: 'summary', label: '5. Mastery Summary', icon: '🏆' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {audioManager.play('tap'); 
              playSound('tap');
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-gold-600 to-purple-600 text-white shadow-md shadow-gold-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">

          {/* TAB 1: DISCOVERY QUESTION */}
          {activeTab === 'discovery' && (
            <motion.div
              key="tab-discovery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto shadow-2xl"
            >
              <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold mb-4">
                PREDICT BEFORE YOU LEARN
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-100 mb-4 leading-relaxed">
                {DISCOVERY_QUESTION.question}
              </h2>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map(opt => {
                  const isChosen = discoverySelected === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleDiscoverySubmit(opt.id)}
                      disabled={discoverySubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                        isChosen
                          ? opt.isCorrect
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-500 text-rose-200'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <div>{opt.text}</div>
                        {discoverySubmitted && isChosen && (
                          <div className={`text-xs mt-2 font-medium ${opt.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {opt.feedback}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {audioManager.play('tap'); 
                      playSound('tap');
                      setActiveTab('learn');
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold text-sm shadow-lg shadow-gold-500/20 hover:brightness-110"
                  >
                    Start Visual Guided Theory →
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: CONCEPTUAL THEORY SLIDES */}
          {activeTab === 'learn' && (
            <motion.div
              key="tab-learn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* SLIDE NAVIGATION BAR */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-xl overflow-x-auto">
                <div className="flex gap-2">
                  {TEACHING_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => {audioManager.play('tap'); 
                        playSound('tap');
                        setCurrentSlideIndex(idx);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        currentSlideIndex === idx
                          ? 'bg-gold-600 text-white'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Slide {idx + 1}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-400 shrink-0 ml-4">
                  Node: {TEACHING_SLIDES[currentSlideIndex].nodeId}
                </span>
              </div>

              {/* CURRENT SLIDE CARD */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs font-semibold">
                    {TEACHING_SLIDES[currentSlideIndex].subtitle}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-100">
                    {TEACHING_SLIDES[currentSlideIndex].title}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {TEACHING_SLIDES[currentSlideIndex].content}
                  </p>

                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">Key Mastery Points</h4>
                    <ul className="space-y-2">
                      {TEACHING_SLIDES[currentSlideIndex].keyPoints.map((pt, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-gold-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {audioManager.play('tap'); 
                        playSound('tap');
                        setActiveLabTab(TEACHING_SLIDES[currentSlideIndex].labTab);
                        setActiveTab('lab');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-semibold text-xs transition-all flex items-center gap-2"
                    >
                      <span>🧪</span>
                      <span>Open Interactive Visual Lab</span>
                    </button>
                  </div>
                </div>

                {/* MINI PREVIEW GRAPHIC */}
                <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[240px]">
                  <div className="text-4xl mb-3">
                    {TEACHING_SLIDES[currentSlideIndex].labTab === 'discharge' && '⚡'}
                    {TEACHING_SLIDES[currentSlideIndex].labTab === 'rutherford' && '🎯'}
                    {TEACHING_SLIDES[currentSlideIndex].labTab === 'planck' && '💡'}
                    {TEACHING_SLIDES[currentSlideIndex].labTab === 'spectra' && '🌈'}
                    {TEACHING_SLIDES[currentSlideIndex].labTab === 'bohr' && '🪐'}
                    {TEACHING_SLIDES[currentSlideIndex].labTab === 'debroglie' && '🌊'}
                    {TEACHING_SLIDES[currentSlideIndex].labTab === 'schrodinger' && '☁️'}
                    {TEACHING_SLIDES[currentSlideIndex].labTab === 'orbitals' && '🔮'}
                  </div>
                  <div className="text-xs text-slate-400 text-center max-w-xs">
                    Click "Open Interactive Visual Lab" to run real-time simulations and manipulate physical variables for this concept.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: VIRTUAL LAB ENGINE */}
          {activeTab === 'lab' && (
            <motion.div
              key="tab-lab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              {/* LAB TABS NAV */}
              <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
                {[
                  { id: 'discharge', label: '1. Discharge Tube (Node 011)', icon: '⚡' },
                  { id: 'rutherford', label: '2. Rutherford Scattering (Node 012)', icon: '🎯' },
                  { id: 'planck', label: '3. Planck & Photoelectric (Node 013)', icon: '💡' },
                  { id: 'spectra', label: '4. Spectra Analyzer (Node 014)', icon: '🌈' },
                  { id: 'bohr', label: '5. Bohr Quantum Jumps (Node 015/016)', icon: '🪐' },
                  { id: 'debroglie', label: '6. Matter Waves & Uncertainty (Node 017)', icon: '🌊' },
                  { id: 'schrodinger', label: '7. Schrödinger Clouds (Node 018)', icon: '☁️' },
                  { id: 'orbitals', label: '8. Orbital Shapes 3D (Node 019/020)', icon: '🔮' }
                ].map(lTab => (
                  <button
                    key={lTab.id}
                    onClick={() => {audioManager.play('tap'); 
                      playSound('tap');
                      setActiveLabTab(lTab.id as any);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeLabTab === lTab.id
                        ? 'bg-gold-600 text-white shadow-md shadow-gold-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>{lTab.icon}</span>
                    <span>{lTab.label}</span>
                  </button>
                ))}
              </div>

              {/* LAB 1: DISCHARGE TUBE ENGINE */}
              {activeLabTab === 'discharge' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>⚡</span> Cathode Ray & Goldstein Canal Ray Tube Simulator
                    </h3>

                    {/* SVG DISCHARGE TUBE CANVAS */}
                    <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                      <svg className="w-full h-full" viewBox="0 0 600 220">
                        {/* Glass Tube Outer Outline */}
                        <rect x="50" y="50" width="500" height="120" rx="60" fill="none" stroke="#334155" strokeWidth="4" />
                        <rect x="52" y="52" width="496" height="116" rx="58" fill="#0f172a" opacity="0.8" />

                        {/* Electrodes */}
                        {/* Cathode (-) */}
                        <line x1="100" y1="70" x2="100" y2="150" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                        <text x="80" y="115" fill="#ef4444" fontSize="16" fontWeight="bold">-</text>
                        {rayMode === 'anode' && (
                          <line x1="100" y1="95" x2="100" y2="125" stroke="#0f172a" strokeWidth="6" strokeDasharray="4 4" />
                        )}

                        {/* Anode (+) */}
                        <line x1="500" y1="70" x2="500" y2="150" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
                        <text x="515" y="115" fill="#3b82f6" fontSize="16" fontWeight="bold">+</text>

                        {/* Electric Deflection Plates */}
                        {electricField !== 'off' && (
                          <>
                            <rect x="250" y="25" width="100" height="10" fill={electricField === 'up' ? '#3b82f6' : '#ef4444'} rx="3" />
                            <text x="295" y="20" fill="#cbd5e1" fontSize="10">{electricField === 'up' ? '+ Plate' : '- Plate'}</text>
                            <rect x="250" y="185" width="100" height="10" fill={electricField === 'up' ? '#ef4444' : '#3b82f6'} rx="3" />
                            <text x="295" y="205" fill="#cbd5e1" fontSize="10">{electricField === 'up' ? '- Plate' : '+ Plate'}</text>
                          </>
                        )}

                        {/* Ray Beam Path */}
                        {rayMode === 'cathode' ? (
                          // Cathode rays: electrons move left to right (Cathode -> Anode)
                          <g>
                            <path
                              d={`M 100 110 Q 300 ${
                                electricField === 'up' ? 60 : electricField === 'down' ? 160 : 110
                              } 500 ${electricField === 'up' ? 70 : electricField === 'down' ? 150 : 110}`}
                              fill="none"
                              stroke="#22d3ee"
                              strokeWidth="4"
                              strokeDasharray="8 4"
                              className="animate-pulse"
                            />
                            {/* Electron dots */}
                            <circle cx="200" cy={electricField === 'up' ? 95 : electricField === 'down' ? 125 : 110} r="4" fill="#06b6d4" />
                            <circle cx="350" cy={electricField === 'up' ? 75 : electricField === 'down' ? 145 : 110} r="4" fill="#06b6d4" />
                          </g>
                        ) : (
                          // Anode / Canal Rays: Positive ions move right to left through perforated cathode
                          <g>
                            <path
                              d={`M 500 110 Q 300 ${
                                electricField === 'up' ? 160 : electricField === 'down' ? 60 : 110
                              } 60 ${electricField === 'up' ? 150 : electricField === 'down' ? 70 : 110}`}
                              fill="none"
                              stroke="#f59e0b"
                              strokeWidth="4"
                              strokeDasharray="6 4"
                              className="animate-pulse"
                            />
                            <circle cx="400" cy={electricField === 'up' ? 125 : electricField === 'down' ? 95 : 110} r="6" fill="#fbbf24" />
                            <circle cx="250" cy={electricField === 'up' ? 145 : electricField === 'down' ? 75 : 110} r="6" fill="#fbbf24" />
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* READOUT DATA */}
                    <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400">Ray Identity:</span>
                        <div className="font-bold text-gold-400">
                          {rayMode === 'cathode' ? 'Cathode Rays (Electrons)' : `Canal Rays (${gasType}+ ions)`}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Charge / Mass (e/m):</span>
                        <div className="font-bold text-emerald-400">
                          {rayMode === 'cathode' ? '1.7588 x 10^11 C/kg (Constant)' : gasType === 'H2' ? '9.58 x 10^7 C/kg (Max)' : 'Variable by gas mass'}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Deflection Direction:</span>
                        <div className="font-bold text-purple-400">
                          {electricField === 'off' ? 'Straight Line' : rayMode === 'cathode' ? (electricField === 'up' ? 'Toward + Plate' : 'Toward - Plate') : (electricField === 'up' ? 'Toward - Plate' : 'Toward + Plate')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTROLS SIDEBAR */}
                  <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Tube Controls</h4>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Select Ray Beam Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {audioManager.play('tap');  playSound('tap'); setRayMode('cathode'); }}
                          className={`py-2 rounded-lg text-xs font-semibold border ${rayMode === 'cathode' ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          Cathode (-)
                        </button>
                        <button
                          onClick={() => {audioManager.play('tap');  playSound('tap'); setRayMode('anode'); }}
                          className={`py-2 rounded-lg text-xs font-semibold border ${rayMode === 'anode' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          Canal / Anode (+)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Enclosed Gas Species</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['H2', 'He', 'Ne'] as const).map(g => (
                          <button
                            key={g}
                            onClick={() => { playSound('tap'); setGasType(g); }}
                            className={`py-1.5 rounded-lg text-xs font-medium border ${gasType === g ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Electric Deflection Field</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['off', 'up', 'down'] as const).map(ef => (
                          <button
                            key={ef}
                            onClick={() => { playSound('tap'); setElectricField(ef); }}
                            className={`py-1.5 rounded-lg text-xs font-medium border uppercase ${electricField === ef ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                          >
                            {ef}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-400 leading-normal">
                      💡 <strong className="text-slate-200">Thomson (1897)</strong> balanced electric deflection with magnetic deflection to measure the constant electron e/m ratio regardless of gas or cathode metal.
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: RUTHERFORD SCATTERING ENGINE */}
              {activeLabTab === 'rutherford' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>🎯</span> Geiger-Marsden Alpha Scattering Simulator
                    </h3>

                    {/* SCATTERING CANVAS VISUAL */}
                    <div className="w-full h-72 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                      <svg className="w-full h-full" viewBox="0 0 600 240">
                        {/* Radioactive Lead Box Source */}
                        <rect x="20" y="90" width="50" height="60" fill="#334155" rx="4" />
                        <circle cx="45" cy="120" r="10" fill="#f59e0b" />
                        <text x="35" y="170" fill="#cbd5e1" fontSize="10">α Source</text>

                        {/* Thin Gold Foil Target */}
                        <line x1="320" y1="30" x2="320" y2="210" stroke="#eab308" strokeWidth="6" opacity="0.8" />
                        <text x="305" y="225" fill="#eab308" fontSize="11" fontWeight="bold">Thin Gold Foil</text>

                        {/* Nucleus Magnification Zone */}
                        <circle cx="320" cy="120" r="18" fill="#ef4444" opacity="0.9" />
                        <text x="312" y="125" fill="#ffffff" fontSize="11" fontWeight="bold">+Z</text>
                        <circle cx="320" cy="120" r="70" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

                        {/* Alpha Particle Trajectories */}
                        {/* 1. Straight through */}
                        <path d="M 70 60 L 320 60 L 560 60" stroke="#38bdf8" strokeWidth="2" fill="none" />
                        <path d="M 70 180 L 320 180 L 560 180" stroke="#38bdf8" strokeWidth="2" fill="none" />

                        {/* 2. Small angle deflection */}
                        <path d="M 70 95 L 300 95 Q 320 90 480 30" stroke="#38bdf8" strokeWidth="2" fill="none" />

                        {/* 3. Rebound > 90 deg (Head-on) */}
                        <path d="M 70 120 L 302 120 Q 312 120 120 200" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="4 2" />

                        {/* Animated Alpha particle travelling */}
                        {isFiringAlpha && (
                          <circle cx="200" cy="120" r="5" fill="#f59e0b" className="animate-ping" />
                        )}
                      </svg>
                    </div>

                    {/* LIVE STATS COUNTER */}
                    <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-center">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <div className="text-slate-400">Undeflected (&lt;1°)</div>
                        <div className="text-lg font-bold text-gold-400">{deflectionStats.straight}</div>
                        <div className="text-[10px] text-slate-500">~99.9% of total</div>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <div className="text-slate-400">Small Deflection</div>
                        <div className="text-lg font-bold text-amber-400">{deflectionStats.small}</div>
                        <div className="text-[10px] text-slate-500">~0.1% near nucleus</div>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <div className="text-slate-400">Rebound (&gt;90°)</div>
                        <div className="text-lg font-bold text-rose-400">{deflectionStats.rebound}</div>
                        <div className="text-[10px] text-slate-500">1 in ~8,000 ratio</div>
                      </div>
                    </div>
                  </div>

                  {/* CONTROLS SIDEBAR */}
                  <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Scattering Controls</h4>

                    <button
                      onClick={fireAlphaParticles}
                      disabled={isFiringAlpha}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 disabled:opacity-50"
                    >
                      {isFiringAlpha ? 'Firing Alpha Beam...' : '🚀 Fire 500 Alpha Particles'}
                    </button>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Target Foil Material</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => { playSound('tap'); setFoilMaterial('gold'); }}
                          className={`py-2 rounded-lg text-xs font-semibold border ${foilMaterial === 'gold' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          Gold Foil (Z=79)
                        </button>
                        <button
                          onClick={() => { playSound('tap'); setFoilMaterial('aluminum'); }}
                          className={`py-2 rounded-lg text-xs font-semibold border ${foilMaterial === 'aluminum' ? 'bg-slate-700 border-slate-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          Aluminum (Z=13)
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-400 leading-normal">
                      💡 Rutherford calculated that the nucleus is roughly <strong className="text-slate-200">10^-15 m</strong> wide inside an atom of <strong className="text-slate-200">10^-10 m</strong> diameter—like a pinhead in a cathedral!
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: PLANCK & PHOTOELECTRIC ENGINE */}
              {activeLabTab === 'planck' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>💡</span> Planck's Quanta & Photoelectric Simulator
                    </h3>

                    {/* PHOTOELECTRIC CANVAS */}
                    <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                      <svg className="w-full h-full" viewBox="0 0 600 220">
                        {/* Metal Plate Target */}
                        <rect x="400" y="40" width="20" height="140" fill="#64748b" rx="2" />
                        <text x="430" y="115" fill="#cbd5e1" fontSize="12" fontWeight="bold">{targetMetal} Metal Plate</text>
                        <text x="430" y="132" fill="#94a3b8" fontSize="10">Work Function Φ = {workFunctions[targetMetal]} eV</text>

                        {/* Incoming Light Rays (Photons) */}
                        <g>
                          <path
                            d="M 50 20 L 400 100"
                            stroke={lightWavelength < 400 ? '#a855f7' : lightWavelength < 550 ? '#38bdf8' : lightWavelength < 650 ? '#f59e0b' : '#ef4444'}
                            strokeWidth={Math.max(2, lightIntensity / 15)}
                            strokeDasharray="6 3"
                          />
                          <path
                            d="M 50 60 L 400 120"
                            stroke={lightWavelength < 400 ? '#a855f7' : lightWavelength < 550 ? '#38bdf8' : lightWavelength < 650 ? '#f59e0b' : '#ef4444'}
                            strokeWidth={Math.max(2, lightIntensity / 15)}
                            strokeDasharray="6 3"
                          />
                        </g>

                        {/* Ejected Photoelectrons */}
                        {isPhotoelectricEjection ? (
                          <g>
                            <circle cx="360" cy="100" r="4" fill="#22d3ee" className="animate-pulse" />
                            <circle cx="300" cy="80" r="4" fill="#22d3ee" className="animate-pulse" />
                            <circle cx="240" cy="120" r="4" fill="#22d3ee" className="animate-pulse" />
                            <text x="220" y="60" fill="#22d3ee" fontSize="12" fontWeight="bold">Photoelectrons Ejected! ⚡</text>
                          </g>
                        ) : (
                          <text x="200" y="150" fill="#f43f5e" fontSize="12" fontWeight="bold">❌ No Ejection (Photon Energy &lt; Work Function)</text>
                        )}
                      </svg>
                    </div>

                    {/* READOUT DATA */}
                    <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400">Photon Energy E = hν:</span>
                        <div className="font-bold text-gold-400">{currentPhotonEnergyEv} eV</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Metal Work Function Φ:</span>
                        <div className="font-bold text-amber-400">{workFunctions[targetMetal]} eV</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Max Kinetic Energy Ek:</span>
                        <div className="font-bold text-purple-400">
                          {isPhotoelectricEjection ? `${(currentPhotonEnergyEv - workFunctions[targetMetal]).toFixed(2)} eV` : '0.00 eV'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTROLS SIDEBAR */}
                  <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Light & Metal Controls</h4>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Wavelength λ:</span>
                        <span className="font-bold text-slate-200">{lightWavelength} nm</span>
                      </div>
                      <input
                        type="range"
                        min="200"
                        max="750"
                        value={lightWavelength}
                        onChange={e => setLightWavelength(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>UV (200nm)</span>
                        <span>Blue</span>
                        <span>Red (750nm)</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Target Metal Plate</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Na', 'Cu', 'Pt'] as const).map(m => (
                          <button
                            key={m}
                            onClick={() => { playSound('tap'); setTargetMetal(m); }}
                            className={`py-1.5 rounded-lg text-xs font-semibold border ${targetMetal === m ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                          >
                            {m} ({workFunctions[m]}eV)
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-400 leading-normal">
                      💡 <strong className="text-slate-200">Einstein (1905)</strong> used Planck's quantum postulate E=hν to explain why light frequency (energy per photon) dictates electron ejection!
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: SPECTRA ANALYZER */}
              {activeLabTab === 'spectra' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>🌈</span> Spectral Fingerprint Simulator
                    </h3>

                    {/* SPECTRA VISUAL BAR */}
                    <div className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6">
                      <div className="text-xs text-slate-400 mb-2 font-mono">
                        {spectrumMode.toUpperCase()} SPECTRUM FOR {spectraGas.toUpperCase()}
                      </div>

                      {/* SPECTRUM BAR */}
                      <div className="w-full h-20 rounded-lg relative overflow-hidden border border-slate-700">
                        {spectrumMode === 'continuous' && (
                          <div className="w-full h-full bg-gradient-to-r from-purple-600 via-gold-500 via-green-500 via-yellow-400 to-red-600" />
                        )}

                        {spectrumMode === 'emission' && (
                          <div className="w-full h-full bg-black relative">
                            {/* Hydrogen Balmer emission lines */}
                            {spectraGas === 'hydrogen' && (
                              <>
                                <div className="absolute top-0 bottom-0 w-1 bg-red-600 left-[85%]" title="656 nm (H-alpha)" />
                                <div className="absolute top-0 bottom-0 w-1 bg-gold-400 left-[55%]" title="486 nm (H-beta)" />
                                <div className="absolute top-0 bottom-0 w-1 bg-gold-600 left-[35%]" title="434 nm (H-gamma)" />
                                <div className="absolute top-0 bottom-0 w-1 bg-purple-600 left-[20%]" title="410 nm (H-delta)" />
                              </>
                            )}
                            {spectraGas === 'sodium' && (
                              <div className="absolute top-0 bottom-0 w-1.5 bg-yellow-400 left-[68%]" title="589 nm (Sodium D-doublet)" />
                            )}
                          </div>
                        )}

                        {spectrumMode === 'absorption' && (
                          <div className="w-full h-full bg-gradient-to-r from-purple-600 via-gold-500 via-green-500 via-yellow-400 to-red-600 relative">
                            {/* Dark absorption lines */}
                            {spectraGas === 'hydrogen' && (
                              <>
                                <div className="absolute top-0 bottom-0 w-1 bg-black left-[85%]" />
                                <div className="absolute top-0 bottom-0 w-1 bg-black left-[55%]" />
                                <div className="absolute top-0 bottom-0 w-1 bg-black left-[35%]" />
                              </>
                            )}
                            {spectraGas === 'sodium' && (
                              <div className="absolute top-0 bottom-0 w-1.5 bg-black left-[68%]" />
                            )}
                          </div>
                        )}

                        {spectrumMode === 'band' && (
                          <div className="w-full h-full bg-black relative flex items-center justify-around">
                            <div className="w-16 h-full bg-gradient-to-r from-transparent via-gold-500/80 to-transparent" />
                            <div className="w-24 h-full bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between w-full text-[10px] text-slate-500 mt-2 font-mono">
                        <span>400 nm (Violet)</span>
                        <span>500 nm</span>
                        <span>600 nm</span>
                        <span>700 nm (Red)</span>
                      </div>
                    </div>
                  </div>

                  {/* CONTROLS SIDEBAR */}
                  <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Spectrum Type</h4>

                    <div className="space-y-2">
                      {[
                        { id: 'emission', label: 'Emission (Bright lines / Dark bg)' },
                        { id: 'absorption', label: 'Absorption (Dark lines / Rainbow bg)' },
                        { id: 'continuous', label: 'Continuous Rainbow' },
                        { id: 'band', label: 'Molecular Band Spectrum' }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => { playSound('tap'); setSpectrumMode(mode.id as any); }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold border ${spectrumMode === mode.id ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: BOHR ATOM & QUANTUM JUMPS */}
              {activeLabTab === 'bohr' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>🪐</span> Bohr Quantized Orbits & Hydrogen Spectral Transitions
                    </h3>

                    {/* BOHR ORBIT CANVAS VISUAL */}
                    <div className="w-full h-72 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                      <svg className="w-full h-full" viewBox="0 0 400 260">
                        {/* Nucleus */}
                        <circle cx="200" cy="130" r="10" fill="#ef4444" />
                        <text x="193" y="134" fill="#ffffff" fontSize="10" fontWeight="bold">+1</text>

                        {/* Concentric Stationary Orbits n=1 to 4 */}
                        {[1, 2, 3, 4].map(n => (
                          <g key={n}>
                            <circle
                              cx="200"
                              cy="130"
                              r={n * 28}
                              fill="none"
                              stroke={bohrN === n ? '#22d3ee' : '#334155'}
                              strokeWidth={bohrN === n ? '2.5' : '1'}
                              strokeDasharray={bohrN === n ? 'none' : '4 3'}
                            />
                            <text x={200 + n * 28 + 4} y="134" fill="#64748b" fontSize="9">n={n}</text>
                          </g>
                        ))}

                        {/* Orbiting Electron */}
                        <circle
                          cx={200 + bohrN * 28}
                          cy="130"
                          r="6"
                          fill="#38bdf8"
                          className={isElectronTransitioning ? 'animate-ping' : ''}
                        />

                        {/* Transition Photon Flash */}
                        {emittedPhotonWavelength && (
                          <text x="200" y="30" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                            ✨ Emitted Photon λ = {emittedPhotonWavelength} nm
                          </text>
                        )}
                      </svg>
                    </div>

                    {/* BOHR QUANTITATIVE READOUTS */}
                    <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-center">
                      <div>
                        <span className="text-slate-400">Radius rn (0.529 · n² Å):</span>
                        <div className="font-bold text-gold-400">{bohrRadius} Å</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Energy En (-13.6 / n² eV):</span>
                        <div className="font-bold text-amber-400">{bohrEnergy} eV</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Velocity vn (2.188 / n):</span>
                        <div className="font-bold text-purple-400">{bohrVelocity} x 10^6 m/s</div>
                      </div>
                    </div>
                  </div>

                  {/* CONTROLS SIDEBAR */}
                  <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Select Orbit Level (n)</h4>

                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map(n => (
                        <button
                          key={n}
                          onClick={() => triggerBohrTransition(n)}
                          disabled={isElectronTransitioning}
                          className={`py-3 rounded-xl text-xs font-bold border ${bohrN === n ? 'bg-gold-600 border-gold-400 text-white shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          Jump to n = {n}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-400 leading-normal">
                      💡 Quantisation postulate: Angular momentum <strong className="text-slate-200">m v r = n h / (2π)</strong> prevents radiative collapse!
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 6: MATTER WAVES & UNCERTAINTY */}
              {activeLabTab === 'debroglie' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>🌊</span> de Broglie Wavelength & Heisenberg Uncertainty Engine
                    </h3>

                    {/* DE BROGLIE WAVE GRAPHIC */}
                    <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                      <svg className="w-full h-full" viewBox="0 0 500 200">
                        {/* Wave path */}
                        <path
                          d="M 50 100 Q 100 40 150 100 T 250 100 T 350 100 T 450 100"
                          fill="none"
                          stroke={particleMassType === 'electron' ? '#22d3ee' : '#f59e0b'}
                          strokeWidth="3"
                        />
                        <circle cx="50" cy="100" r="8" fill="#38bdf8" />
                        <text x="50" y="130" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                          Particle ({particleMassType})
                        </text>

                        {/* Uncertainty Slit Box */}
                        <line x1="300" y1="20" x2="300" y2="70" stroke="#64748b" strokeWidth="4" />
                        <line x1="300" y1="130" x2="300" y2="180" stroke="#64748b" strokeWidth="4" />
                        <text x="310" y="105" fill="#a855f7" fontSize="11">Slit Width Δx</text>
                      </svg>
                    </div>

                    {/* QUANTITATIVE READOUT */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400">de Broglie λ = h / (m v):</span>
                        <div className="font-bold text-gold-400">
                          {deBroglieLambda < 1e-15 ? `${deBroglieLambda.toExponential(3)} m (Undetectable)` : `${(deBroglieLambda * 1e10).toFixed(3)} Å (Atomic Scale!)`}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Min Momentum Uncertainty Δp:</span>
                        <div className="font-bold text-purple-400">
                          {heisenbergDeltaP.toExponential(3)} kg m/s
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTROLS SIDEBAR */}
                  <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Particle Properties</h4>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Particle Mass Scale</label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: 'electron', label: 'Electron' },
                          { id: 'proton', label: 'Proton' },
                          { id: 'cricket_ball', label: 'Cricket Ball' }
                        ].map(p => (
                          <button
                            key={p.id}
                            onClick={() => { playSound('tap'); setParticleMassType(p.id as any); }}
                            className={`py-1.5 rounded-lg text-[10px] font-semibold border ${particleMassType === p.id ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 7: SCHRÖDINGER PROBABILITY DENSITY */}
              {activeLabTab === 'schrodinger' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>☁️</span> Schrödinger Wave Function & Radial Probability |Ψ|² Cloud
                    </h3>

                    {/* PROBABILITY CLOUD CANVAS */}
                    <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                      <svg className="w-full h-full" viewBox="0 0 400 240">
                        {/* Nucleus */}
                        <circle cx="200" cy="120" r="4" fill="#ef4444" />

                        {/* Probability Density Cloud Layers */}
                        {schrodingerState === '1s' && (
                          <circle cx="200" cy="120" r="50" fill="#38bdf8" opacity="0.4" />
                        )}

                        {schrodingerState === '2s' && (
                          <g>
                            <circle cx="200" cy="120" r="25" fill="#38bdf8" opacity="0.5" />
                            {/* Radial node gap */}
                            <circle cx="200" cy="120" r="75" fill="none" stroke="#38bdf8" strokeWidth="25" opacity="0.3" />
                          </g>
                        )}

                        {schrodingerState === '2p' && (
                          <g>
                            <ellipse cx="140" cy="120" rx="40" ry="25" fill="#a855f7" opacity="0.6" />
                            <ellipse cx="260" cy="120" rx="40" ry="25" fill="#a855f7" opacity="0.6" />
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* CONTROLS SIDEBAR */}
                  <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Select Orbital State</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {(['1s', '2s', '2p', '3s'] as const).map(st => (
                        <button
                          key={st}
                          onClick={() => { playSound('tap'); setSchrodingerState(st); }}
                          className={`py-2 rounded-xl text-xs font-bold border ${schrodingerState === st ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          {st} Orbital
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 8: QUANTUM NUMBERS & ORBITAL SHAPES 3D */}
              {activeLabTab === 'orbitals' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <span>🔮</span> 3D Orbital Shapes & Quantum Number Postal Address
                    </h3>

                    {/* ORBITAL 3D SVG VISUAL */}
                    <div className="w-full h-72 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                      <svg className="w-full h-full" viewBox="0 0 400 260">
                        {/* Coordinate Axes */}
                        <line x1="50" y1="130" x2="350" y2="130" stroke="#475569" strokeWidth="1.5" />
                        <text x="355" y="134" fill="#94a3b8" fontSize="11">X</text>
                        <line x1="200" y1="20" x2="200" y2="240" stroke="#475569" strokeWidth="1.5" />
                        <text x="195" y="15" fill="#94a3b8" fontSize="11">Y</text>

                        {/* Orbital Renderings based on l */}
                        {qnL === 0 && (
                          <circle cx="200" cy="130" r={qnN * 25} fill="#38bdf8" opacity="0.4" stroke="#22d3ee" strokeWidth="2" />
                        )}

                        {qnL === 1 && (
                          <g>
                            {/* Dumbbell lobes */}
                            <ellipse cx="140" cy="130" rx="45" ry="25" fill="#a855f7" opacity="0.7" />
                            <ellipse cx="260" cy="130" rx="45" ry="25" fill="#3b82f6" opacity="0.7" />
                            <circle cx="200" cy="130" r="3" fill="#ffffff" />
                          </g>
                        )}

                        {qnL === 2 && (
                          <g>
                            {/* Cloverleaf 4 lobes */}
                            <ellipse cx="150" cy="80" rx="35" ry="20" fill="#f59e0b" opacity="0.7" transform="rotate(-30 150 80)" />
                            <ellipse cx="250" cy="80" rx="35" ry="20" fill="#f59e0b" opacity="0.7" transform="rotate(30 250 80)" />
                            <ellipse cx="150" cy="180" rx="35" ry="20" fill="#f59e0b" opacity="0.7" transform="rotate(30 150 180)" />
                            <ellipse cx="250" cy="180" rx="35" ry="20" fill="#f59e0b" opacity="0.7" transform="rotate(-30 250 180)" />
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* QUANTUM NUMBER POSTAL CARD */}
                    <div className="grid grid-cols-4 gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-center">
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <span className="text-slate-400">n (Shell)</span>
                        <div className="text-lg font-bold text-gold-400">{qnN}</div>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <span className="text-slate-400">l (Subshell)</span>
                        <div className="text-lg font-bold text-purple-400">{qnL} ({qnL===0?'s':qnL===1?'p':'d'})</div>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <span className="text-slate-400">m (Orientation)</span>
                        <div className="text-lg font-bold text-amber-400">{qnM}</div>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <span className="text-slate-400">s (Spin)</span>
                        <div className="text-lg font-bold text-emerald-400">{qnS > 0 ? '+1/2 ⬆' : '-1/2 ⬇'}</div>
                      </div>
                    </div>
                  </div>

                  {/* CONTROLS SIDEBAR */}
                  <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Configure Subshell</h4>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Subshell Type l</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { l: 0, name: 's (Sphere)' },
                          { l: 1, name: 'p (Dumbbell)' },
                          { l: 2, name: 'd (Clover)' }
                        ].map(sub => (
                          <button
                            key={sub.l}
                            onClick={() => { playSound('tap'); setQnL(sub.l); }}
                            className={`py-2 rounded-lg text-xs font-bold border ${qnL === sub.l ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: MASTERY CHALLENGES */}
          {activeTab === 'challenge' && (
            <motion.div
              key="tab-challenge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              {/* CHALLENGE PROGRESS BAR */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
                <span>Node: {CHALLENGES[currentChallengeIndex].nodeId}</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-300"
                  style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>

              {/* CHALLENGE CARD */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold mb-2">
                    {CHALLENGES[currentChallengeIndex].subtitle}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-100">
                    {CHALLENGES[currentChallengeIndex].question}
                  </h3>
                </div>

                {/* OPTIONS */}
                <div className="space-y-3">
                  {CHALLENGES[currentChallengeIndex].options.map(opt => {
                    const isSelected = selectedOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleChallengeSubmit(opt)}
                        disabled={challengeSubmitted}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950/50 border-rose-500 text-rose-200'
                            : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs shrink-0 mt-0.5">
                          {opt.id.slice(-1)}
                        </span>
                        <div className="flex-1">
                          <div>{opt.text}</div>
                          {challengeSubmitted && isSelected && (
                            <div className={`text-xs mt-2 font-medium ${opt.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {opt.explanation}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* HINT BUTTON */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => { playSound('hint'); setShowHint(!showHint); }}
                    className="text-xs text-gold-400 hover:text-gold-300 font-medium flex items-center gap-1"
                  >
                    <span>💡</span> {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>

                  {challengeSubmitted && (
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-purple-600 text-white font-semibold text-xs shadow-lg hover:brightness-110"
                    >
                      {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Module 🎉'}
                    </button>
                  )}
                </div>

                <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex].hint} />
              </div>
            </motion.div>
          )}

          {/* TAB 5: SUMMARY & SRS REVIEW */}
          {activeTab === 'summary' && (
            <motion.div
              key="tab-summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold-500 via-gold-500 to-purple-600 flex items-center justify-center mx-auto text-4xl shadow-lg shadow-gold-500/30">
                  🏆
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Module Complete!</h2>
                  <p className="text-sm text-slate-400">Class 11 ISC Chemistry • Discovery of Subatomic Particles & Quantum Model</p>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400">Total Score</div>
                    <div className="text-xl font-bold text-gold-400">{score}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Overall Mastery</div>
                    <div className="text-xl font-bold text-emerald-400">{overallMasteryPercent}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Nodes Covered</div>
                    <div className="text-xl font-bold text-purple-400">10 / 10</div>
                  </div>
                </div>

                {/* NODE MASTERY BREAKDOWN LIST */}
                <div className="text-left space-y-2 max-w-2xl mx-auto">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Individual Node BKT Mastery Level</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {ALL_NODE_IDS.map(nodeId => {
                      const level = Math.round(masteryProb(bktMap[nodeId] || createBKTState()) * 100);
                      return (
                        <div key={nodeId} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                          <span className="font-mono text-slate-300">{nodeId}</span>
                          <span className={`font-bold ${level > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{level}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      playSound('tap');
                      setActiveTab('challenge');
                      setCurrentChallengeIndex(0);
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
                  >
                    Replay Challenges 🔄
                  </button>
                  <button
                    onClick={() => {
                      playSound('tap');
                      setActiveTab('lab');
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold text-xs shadow-lg hover:brightness-110"
                  >
                    Open Virtual Sandbox 🧪
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Subatomic Particles & Quantum Model Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      {/* Misconception Checklist */}
      <div className="text-left space-y-3 pt-4 border-t border-slate-800 mt-6">
        <h3 className="text-sm font-bold text-amber-300">Common Misconception Checklist:</h3>
        <div className="grid grid-cols-1 gap-2">
          {MISCONCEPTIONS_CHECKLIST.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
              <div className="font-bold text-rose-400">{m.title}</div>
              <div className="text-slate-400">{m.description}</div>
              <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}