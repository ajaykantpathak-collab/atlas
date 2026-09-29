"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const NODE_001 = 'c12_chem_001'; // Solid state - characteristics
const NODE_002 = 'c12_chem_002'; // Crystal lattice and unit cell
const NODE_003 = 'c12_chem_003'; // Types of unit cells
const NODE_004 = 'c12_chem_004'; // Packing efficiency
const NODE_005 = 'c12_chem_005'; // Close packing in solids
const NODE_006 = 'c12_chem_006'; // Defects in solids
const NODE_007 = 'c12_chem_007'; // Electrical and magnetic properties
const NODE_008 = 'c12_chem_008'; // Solutions - types and concentration
const NODE_009 = 'c12_chem_009'; // Solubility and factors affecting it
const NODE_010 = 'c12_chem_010'; // Raoult's law

const ALL_NODE_IDS = [
  NODE_001, NODE_002, NODE_003, NODE_004, NODE_005,
  NODE_006, NODE_007, NODE_008, NODE_009, NODE_010
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// TYPES & INTERFACES
// ==========================================
type ActiveTab = 'discovery' | 'teach' | 'sandbox' | 'challenges' | 'applications';
type SandboxMode = 'lattice' | 'defects' | 'bands' | 'solutions' | 'raoult';

interface DiscoveryOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface DiscoveryQuestionData {
  title: string;
  prompt: string;
  options: DiscoveryOption[];
}

interface SlideData {
  id: string;
  title: string;
  nodeId: NodeId;
  subtitle: string;
  content: string[];
  keyFormula?: string;
  visualType: 'crystal_type' | 'unit_cell_3d' | 'packing_eff' | 'defects_vis' | 'band_gap' | 'raoult_graph';
  interactiveHint: string;
}

interface ChallengeOption {
  id: string;
  label: string;
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  type: 'mcq' | 'numeric' | 'matching';
  options?: ChallengeOption[];
  correctAnswer: string; // or option id
  explanation: string;
  misconceptionId?: string;
  hint: string;
}

interface Misconception {
  id: string;
  title: string;
  text: string;
}

// ==========================================
// DATA & CONTENT DEFINITIONS
// ==========================================
const SCENARIO_TITLE = "ISC Class 12 Chemistry: Solid State & Solutions Virtual Laboratory";

const DISCOVERY_QUESTION: DiscoveryQuestionData = {
  title: "Predicting Solid & Solution Behavior",
  prompt: "Imagine you heat a bottle of carbonated water (gas in liquid) and a cup of sugar syrup (solid in liquid). What happens to the solubility of carbon dioxide gas vs solid sugar as temperature rises?",
  options: [
    {
      id: "opt_a",
      text: "Both gas and sugar become more soluble at higher temperatures.",
      isCorrect: false,
      explanation: "Gas dissolution is exothermic! Heating drives dissolved gas out of solution (lowers solubility), while solid sugar dissolution is typically endothermic (solubility increases)."
    },
    {
      id: "opt_b",
      text: "CO2 gas becomes less soluble, while sugar becomes more soluble.",
      isCorrect: true,
      explanation: "Spot on! Gas solubility decreases with temperature rise (Henry's Law & Le Chatelier), whereas solid solute solubility usually increases."
    },
    {
      id: "opt_c",
      text: "CO2 gas becomes more soluble, while sugar becomes less soluble.",
      isCorrect: false,
      explanation: "Incorrect. Gas molecules gain kinetic energy and escape the liquid matrix at higher T, lowering gas solubility."
    },
    {
      id: "opt_d",
      text: "Neither solubility changes because pressure remains constant.",
      isCorrect: false,
      explanation: "Temperature has a profound effect on enthalpy of solution for both gases and solids!"
    }
  ]
};

const TEACHING_SLIDES: SlideData[] = [
  {
    id: "slide_001",
    title: "Crystalline vs Amorphous Solids & Anisotropy",
    nodeId: NODE_001,
    subtitle: "Long-Range Order vs Short-Range Disorder",
    content: [
      "Crystalline solids (e.g. NaCl, Diamond, Quartz, Koderma Mica) possess long-range periodic order, sharp melting points, and ANISOTROPY (physical properties like refractive index or electrical conductivity vary with measurement direction).",
      "Amorphous solids (e.g. Glass, Rubber, Plastics) have only short-range order, soften over a temperature range, and are ISOTROPIC (same properties in all directions)."
    ],
    keyFormula: "Anisotropic (Crystalline) ≠ Isotropic (Amorphous)",
    visualType: "crystal_type",
    interactiveHint: "Toggle between Crystalline and Amorphous to observe order and property directionality."
  },
  {
    id: "slide_002",
    title: "Crystal Lattice, Unit Cell & Cubic Types",
    nodeId: NODE_002,
    subtitle: "6 Lattice Parameters (a, b, c, α, β, γ) & Atom Sharing",
    content: [
      "A Unit Cell is the smallest 3D repeating block that builds the crystal lattice through integer translations.",
      "Primitive Cubic (SC): Atoms at 8 corners × 1/8 = 1 atom/cell.",
      "Body-Centred Cubic (BCC): 8 corners × 1/8 + 1 unshared body-centre = 2 atoms/cell.",
      "Face-Centred Cubic (FCC/CCP): 8 corners × 1/8 + 6 face-centres × 1/2 = 4 atoms/cell."
    ],
    keyFormula: "Z_{SC} = 1, Z_{BCC} = 2, Z_{FCC} = 4",
    visualType: "unit_cell_3d",
    interactiveHint: "Select unit cell type to see corner, body, and face atom contributions."
  },
  {
    id: "slide_003",
    title: "Packing Efficiency & Geometrical Relations",
    nodeId: NODE_003,
    subtitle: "Space Occupied by Spherical Atoms",
    content: [
      "Simple Cubic: Spheres touch along edge (a = 2r). Packing Efficiency = (1 × 4/3 π r³) / (2r)³ = π/6 ≈ 52.4%. Void space = 47.6%.",
      "BCC: Spheres touch along body diagonal (√3 a = 4r). Packing Efficiency = (2 × 4/3 π r³) / (4r/√3)³ = √3 π / 8 ≈ 68.0%. Void space = 32.0%.",
      "FCC / CCP: Spheres touch along face diagonal (√2 a = 4r). Packing Efficiency = (4 × 4/3 π r³) / (2√2 r)³ = π / (3√2) ≈ 74.0%. Void space = 26.0%."
    ],
    keyFormula: "Packing Efficiency = (Z × V_{atom} / V_{cell}) × 100%",
    visualType: "packing_eff",
    interactiveHint: "Adjust edge length 'a' or radius 'r' to observe geometry and volume filling."
  },
  {
    id: "slide_004",
    title: "Close Packing, Voids & Point Defects",
    nodeId: NODE_004,
    subtitle: "hcp vs ccp Stacking, Voids, Schottky & Frenkel Defects",
    content: [
      "Stacking Sequences: hcp (ABAB...) and ccp (ABCABC...) both give 74% packing efficiency and Coordination Number = 12.",
      "Voids: For N close-packed atoms, there are N Octahedral Voids and 2N Tetrahedral Voids.",
      "Schottky Defect: Equal number of cations & anions missing in pairs. Reduces density! (e.g., NaCl, KCl).",
      "Frenkel Defect: Cation leaves lattice site to occupy interstitial void. Density remains UNCHANGED! (e.g., AgCl, ZnS)."
    ],
    keyFormula: "Tetrahedral = 2N, Octahedral = N",
    visualType: "defects_vis",
    interactiveHint: "Toggle defects to observe vacancy creation vs interstitial displacement."
  },
  {
    id: "slide_005",
    title: "Electrical Band Theory, Doping & Magnetism",
    nodeId: NODE_005,
    subtitle: "Conductors, Semiconductors, Dopants (n/p-type) & Spin Alignment",
    content: [
      "Band Theory: Conductors have overlapping bands. Insulators have large band gap (>5 eV). Semiconductors have small band gap (~1 eV).",
      "Doping Si (Group 14): Add Group 15 (P, As) → n-type (extra e⁻ majority). Add Group 13 (B, Ga) → p-type (hole majority).",
      "Magnetism: Diamagnetic (paired e⁻, repelled), Paramagnetic (unpaired e⁻, attracted), Ferromagnetic (permanent domain alignment, Fe, Co, Ni)."
    ],
    keyFormula: "n-type = e⁻ rich (Group 15), p-type = hole rich (Group 13)",
    visualType: "band_gap",
    interactiveHint: "Inject dopant atoms or apply external magnetic field to observe spin alignment."
  },
  {
    id: "slide_006",
    title: "Concentration Units, Solubility & Raoult's Law",
    nodeId: NODE_006,
    subtitle: "Molarity, Molality, Henry's Law & Vapour Pressure",
    content: [
      "Molarity M = moles/V(L) [T-dependent]. Molality m = moles/kg(solvent) [T-independent]. Mole fraction x = n_i / n_total.",
      "Henry's Law: p = K_H · x (Gas solubility in liquid is proportional to partial pressure).",
      "Raoult's Law: p_A = x_A · p_A° (Partial pressure = liquid mole fraction × pure vapour pressure).",
      "Ideal Solutions: ΔH_mix = 0, ΔV_mix = 0 (e.g. Benzene-Toluene). Non-ideal solutions show positive or negative deviations."
    ],
    keyFormula: "p_total = x_A p_A° + x_B p_B°, (p1° - p)/p1° = x2",
    visualType: "raoult_graph",
    interactiveHint: "Adjust mole fractions x_A and x_B to plot partial and total vapour pressures."
  }
];

const CHALLENGES: Challenge[] = [
  {
    id: "c1",
    nodeId: NODE_001,
    title: "Crystalline Anisotropy",
    question: "A single crystal of mica from Koderma shows different electrical resistance when measured along different crystallographic axes. What fundamental property of crystalline solids explains this?",
    type: "mcq",
    options: [
      { id: "a", label: "Isotropy due to short-range disorder" },
      { id: "b", label: "Anisotropy due to long-range periodic order" },
      { id: "c", label: "Amorphous melting behavior" },
      { id: "d", label: "Uniformity of forces in all directions" }
    ],
    correctAnswer: "b",
    explanation: "Crystalline solids exhibit anisotropy because particle spacing and bonding orientations vary along different directions in their regular repeating 3D lattice.",
    misconceptionId: "m1",
    hint: "Recall that crystalline solids have long-range order, making their physical properties directional."
  },
  {
    id: "c2",
    nodeId: NODE_002,
    title: "Unit Cell Edge Parameters",
    question: "How many independent lattice parameters (edge lengths and inter-axial angles) are required to completely define a 3D unit cell?",
    type: "mcq",
    options: [
      { id: "a", label: "3 (a, b, c only)" },
      { id: "b", label: "4 (a, b, c and α)" },
      { id: "c", label: "6 (a, b, c and α, β, γ)" },
      { id: "d", label: "14 (the Bravais lattices)" }
    ],
    correctAnswer: "c",
    explanation: "Six lattice parameters: three edge lengths (a, b, c) and three inter-axial angles (α, β, γ) define the shape and size of any unit cell.",
    hint: "Think of 3 lengths and 3 angles separating the axes."
  },
  {
    id: "c3",
    nodeId: NODE_003,
    title: "Atom Count in BCC Lattice",
    question: "Iron at room temperature crystallises in a Body-Centred Cubic (BCC) lattice. What is the effective number of atoms (Z) per BCC unit cell?",
    type: "mcq",
    options: [
      { id: "a", label: "1 atom" },
      { id: "b", label: "2 atoms" },
      { id: "c", label: "4 atoms" },
      { id: "d", label: "8 atoms" }
    ],
    correctAnswer: "b",
    explanation: "Z = (8 corner atoms × 1/8) + (1 body-centre atom × 1) = 1 + 1 = 2 atoms per unit cell.",
    misconceptionId: "m2",
    hint: "Corners contribute 8 × 1/8, and the centre atom belongs 100% to this cell."
  },
  {
    id: "c4",
    nodeId: NODE_004,
    title: "FCC Packing Efficiency",
    question: "Copper crystallises in a Face-Centred Cubic (FCC/CCP) lattice. What is the exact packing efficiency of an FCC lattice?",
    type: "mcq",
    options: [
      { id: "a", label: "52.4%" },
      { id: "b", label: "68.0%" },
      { id: "c", label: "74.0%" },
      { id: "d", label: "88.8%" }
    ],
    correctAnswer: "c",
    explanation: "FCC has a packing fraction of π / (3√2) ≈ 0.74 or 74.0%, leaving 26% empty void space. This is maximum close packing.",
    hint: "FCC/CCP is the densest possible regular sphere packing."
  },
  {
    id: "c5",
    nodeId: NODE_005,
    title: "Void Count in CCP",
    question: "If a crystal lattice contains N atoms in a cubic close-packed (ccp) structure, how many tetrahedral and octahedral voids are present?",
    type: "mcq",
    options: [
      { id: "a", label: "N tetrahedral, 2N octahedral" },
      { id: "b", label: "2N tetrahedral, N octahedral" },
      { id: "c", label: "N tetrahedral, N octahedral" },
      { id: "d", label: "4N tetrahedral, 2N octahedral" }
    ],
    correctAnswer: "b",
    explanation: "In any close-packed array of N spheres, there are always 2N tetrahedral voids and N octahedral voids.",
    hint: "Tetrahedral voids are twice as numerous as octahedral voids."
  },
  {
    id: "c6",
    nodeId: NODE_006,
    title: "Density Effect of Defects",
    question: "Which point defect causes a DECREASE in the density of an ionic solid such as NaCl?",
    type: "mcq",
    options: [
      { id: "a", label: "Frenkel defect" },
      { id: "b", label: "Schottky defect" },
      { id: "c", label: "Interstitial defect without vacancy" },
      { id: "d", label: "Impurity defect creating extra ions" }
    ],
    correctAnswer: "b",
    explanation: "Schottky defects remove equal numbers of cations and anions from the crystal lattice, reducing mass per unit volume and thus decreasing density.",
    misconceptionId: "m3",
    hint: "Frenkel defects only displace ions inside, whereas Schottky defects remove ion pairs entirely."
  },
  {
    id: "c7",
    nodeId: NODE_007,
    title: "Semiconductor Doping (n-type)",
    question: "Silicon (Group 14) is doped with trace amounts of Phosphorus (Group 15). What type of semiconductor is produced and what are the majority charge carriers?",
    type: "mcq",
    options: [
      { id: "a", label: "p-type semiconductor with positive holes as majority carriers" },
      { id: "b", label: "n-type semiconductor with extra negative electrons as majority carriers" },
      { id: "c", label: "Insulator with blocked conduction band" },
      { id: "d", label: "Ferromagnetic conductor" }
    ],
    correctAnswer: "b",
    explanation: "Group 15 phosphorus has 5 valence electrons. 4 form covalent bonds with Si and the 5th extra electron enters the conduction band, giving an n-type semiconductor.",
    misconceptionId: "m4",
    hint: "Adding electron-rich pentavalent impurity yields extra free electrons (n = negative)."
  },
  {
    id: "c8",
    nodeId: NODE_008,
    title: "Temperature Independent Concentration",
    question: "Which of the following concentration expressions remains INDEPENDENT of temperature changes?",
    type: "mcq",
    options: [
      { id: "a", label: "Molarity (M)" },
      { id: "b", label: "Normality (N)" },
      { id: "c", label: "Molality (m)" },
      { id: "d", label: "Formality (F)" }
    ],
    correctAnswer: "c",
    explanation: "Molality (moles solute / kg solvent) depends only on mass, not volume. Mass does not expand or contract with temperature changes.",
    hint: "Units based on mass (kg) do not change when liquids thermally expand."
  },
  {
    id: "c9",
    nodeId: NODE_009,
    title: "Henry's Law Application",
    question: "According to Henry's Law (p = K_H · x), why does opening a warm bottle of soda release CO2 bubbles more violently than opening a chilled one?",
    type: "mcq",
    options: [
      { id: "a", label: "Henry's constant K_H increases with temperature, decreasing gas solubility x." },
      { id: "b", label: "K_H decreases with temperature, increasing gas solubility." },
      { id: "c", label: "Pressure inside warm bottle drops to zero before opening." },
      { id: "d", label: "CO2 reacts chemically with water at higher temperatures." }
    ],
    correctAnswer: "a",
    explanation: "For a gas dissolved in liquid, raising temperature increases K_H, which lowers mole fraction x at a given partial pressure p. Less gas remains dissolved in warm soda.",
    hint: "Gas solubility in liquids decreases as temperature rises."
  },
  {
    id: "c10",
    nodeId: NODE_010,
    title: "Raoult's Law & Vapour Pressure Lowering",
    question: "Dissolving 1 mole of non-volatile glucose in 9 moles of pure water lowers the solvent mole fraction x_1 to 0.9. If pure water vapour pressure is 24 mm Hg, what is the vapour pressure of the solution?",
    type: "mcq",
    options: [
      { id: "a", label: "2.4 mm Hg" },
      { id: "b", label: "21.6 mm Hg" },
      { id: "c", label: "24.0 mm Hg" },
      { id: "d", label: "26.4 mm Hg" }
    ],
    correctAnswer: "b",
    explanation: "p = x_1 · p_1° = 0.9 × 24 mm Hg = 21.6 mm Hg. The vapour pressure drops by 2.4 mm Hg (relative lowering = 1/10 = 0.1).",
    hint: "Raoult's law: p_solution = (mole fraction solvent) × (pure solvent vapour pressure)."
  }
];

const MISCONCEPTIONS: Misconception[] = [
  {
    id: "m1",
    title: "Hardness vs Crystallinity",
    text: "Judging whether a solid is crystalline purely by its macroscopic hardness or clarity. Crystalline solids are defined by internal long-range periodic order, not outward glassiness."
  },
  {
    id: "m2",
    title: "BCC Atom Count Error",
    text: "Assuming BCC has 4 atoms per cell like FCC. BCC contains 8 corners × 1/8 + 1 body centre = 2 atoms."
  },
  {
    id: "m3",
    title: "Defect Density Fallacy",
    text: "Believing Frenkel defects decrease density. In Frenkel defects, the cation merely relocates to an internal interstitial site, so mass and volume remain identical."
  },
  {
    id: "m4",
    title: "Semiconductor Net Charge Misconception",
    text: "Thinking n-type semiconductors are overall negatively charged. Doped semiconductors remain electrically neutral because atomic proton count equals electron count."
  }
];

// ==========================================
// CUSTOM VISUAL SUB-COMPONENTS
// ==========================================

// 1. Crystal Type Visualizer (Crystalline vs Amorphous)
const CrystalTypeVisualizer: React.FC<{ type: 'crystalline' | 'amorphous' }> = ({ type }) => {
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    if (type === 'crystalline') {
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 6; c++) {
          pts.push({ x: 40 + c * 50, y: 30 + r * 45 });
        }
      }
    } else {
      // Amorphous: random jitter
      let seed = 123;
      const pseudoRandom = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 6; c++) {
          const jitterX = (pseudoRandom() - 0.5) * 26;
          const jitterY = (pseudoRandom() - 0.5) * 26;
          pts.push({ x: 40 + c * 50 + jitterX, y: 30 + r * 45 + jitterY });
        }
      }
    }
    return pts;
  }, [type]);

  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden border border-slate-700">
      <div className="absolute top-3 left-3 bg-slate-800 text-xs px-2 py-1 rounded text-gold-400 font-mono">
        {type === 'crystalline' ? 'Long-Range Order (Anisotropic)' : 'Short-Range Disorder (Isotropic)'}
      </div>
      <svg className="w-full h-48" viewBox="0 0 340 220">
        {/* Draw connections if crystalline */}
        {type === 'crystalline' && (
          <g stroke="#334155" strokeWidth="1">
            {points.map((p, i) => {
              const right = points[i + 1];
              const down = points[i + 6];
              return (
                <React.Fragment key={`edge-${i}`}>
                  {right && (i + 1) % 6 !== 0 && <line x1={p.x} y1={p.y} x2={right.x} y2={right.y} />}
                  {down && <line x1={p.x} y1={p.y} x2={down.x} y2={down.y} />}
                </React.Fragment>
              );
            })}
          </g>
        )}
        {/* Draw Atoms */}
        {points.map((p, idx) => (
          <circle
            key={`pt-${idx}`}
            cx={p.x}
            cy={p.y}
            r={type === 'crystalline' ? 14 : 13}
            fill={type === 'crystalline' ? 'url(#cyanGrad)' : 'url(#amberGrad)'}
            stroke={type === 'crystalline' ? '#06b6d4' : '#f59e0b'}
            strokeWidth="1.5"
          />
        ))}
        <defs>
          <radialGradient id="cyanGrad">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </radialGradient>
          <radialGradient id="amberGrad">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

// 2. 3D Unit Cell Visualizer
const UnitCellVisualizer: React.FC<{ type: 'SC' | 'BCC' | 'FCC' }> = ({ type }) => {
  const [angle, setAngle] = useState(25);

  useEffect(() => {
    const timer = setInterval(() => {
      setAngle((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Cube vertex coordinates
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const project = (x: number, y: number, z: number) => {
    // Simple isometric 3D rotation around Y
    const rx = x * cos - z * sin;
    const rz = x * sin + z * cos;
    const scale = 180 / (220 + rz);
    const px = 160 + rx * scale;
    const py = 110 - y * scale + rz * 0.3;
    return { px, py, scale };
  };

  const corners = [
    [-40, -40, -40], [40, -40, -40], [40, 40, -40], [-40, 40, -40],
    [-40, -40, 40],  [40, -40, 40],  [40, 40, 40],  [-40, 40, 40]
  ];

  const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7]
  ];

  const faces = [
    [0, 0, -40], [0, 0, 40],
    [-40, 0, 0], [40, 0, 0],
    [0, -40, 0], [0, 40, 0]
  ];

  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center relative border border-slate-700">
      <div className="absolute top-3 left-3 bg-slate-800 text-xs px-2 py-1 rounded text-emerald-400 font-mono">
        Unit Cell: {type === 'SC' ? 'Simple Cubic (Z=1)' : type === 'BCC' ? 'Body-Centred Cubic (Z=2)' : 'Face-Centred Cubic (Z=4)'}
      </div>
      <svg className="w-full h-52 viewBox=0 0 320 220">
        {/* Draw Wireframe Edges */}
        {edges.map(([i, j], idx) => {
          const p1 = project(corners[i][0], corners[i][1], corners[i][2]);
          const p2 = project(corners[j][0], corners[j][1], corners[j][2]);
          return (
            <line
              key={`edge-${idx}`}
              x1={p1.px} y1={p1.py}
              x2={p2.px} y2={p2.py}
              stroke="#475569" strokeWidth="2" strokeDasharray="4 2"
            />
          );
        })}

        {/* Draw Corner Atoms */}
        {corners.map(([x, y, z], idx) => {
          const p = project(x, y, z);
          return (
            <circle
              key={`corner-${idx}`}
              cx={p.px} cy={p.py}
              r={12 * p.scale}
              fill="#38bdf8"
              stroke="#0284c7"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Draw BCC Body-Centre Atom */}
        {type === 'BCC' && (() => {
          const p = project(0, 0, 0);
          return (
            <circle
              cx={p.px} cy={p.py}
              r={16 * p.scale}
              fill="#f43f5e"
              stroke="#be123c"
              strokeWidth="2"
            />
          );
        })()}

        {/* Draw FCC Face Atoms */}
        {type === 'FCC' && faces.map(([fx, fy, fz], idx) => {
          const p = project(fx, fy, fz);
          return (
            <circle
              key={`face-${idx}`}
              cx={p.px} cy={p.py}
              r={13 * p.scale}
              fill="#a855f7"
              stroke="#7e22ce"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div className="text-xs text-slate-400 font-mono mt-1">
        Rotating 3D Lattice Representation
      </div>
    </div>
  );
};

// 3. Defects Visualizer (Schottky vs Frenkel)
const DefectsVisualizer: React.FC<{ defect: 'schottky' | 'frenkel' | 'none' }> = ({ defect }) => {
  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center relative border border-slate-700">
      <div className="absolute top-3 left-3 bg-slate-800 text-xs px-2 py-1 rounded text-amber-400 font-mono">
        {defect === 'schottky' ? 'Schottky Defect (Missing Pair -> Density Decreases)' :
         defect === 'frenkel' ? 'Frenkel Defect (Cation Displaced -> Density Constant)' : 'Ideal Crystal (No Defects)'}
      </div>
      <svg className="w-full h-48" viewBox="0 0 340 200">
        {/* Grid of Cations (+) and Anions (-) */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4].map((c) => {
            const x = 50 + c * 60;
            const y = 30 + r * 45;
            const isCation = (r + c) % 2 === 0;

            // Schottky: missing cation at (r=1, c=1) and anion at (r=2, c=3)
            if (defect === 'schottky') {
              if (r === 1 && c === 1) {
                return (
                  <circle key={`v1`} cx={x} cy={y} r="14" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                );
              }
              if (r === 2 && c === 3) {
                return (
                  <circle key={`v2`} cx={x} cy={y} r="18" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                );
              }
            }

            // Frenkel: cation at (r=1, c=1) displaced to void at (r=1.5, c=1.5)
            if (defect === 'frenkel' && r === 1 && c === 1) {
              return (
                <g key={`frenkel-pair`}>
                  {/* Vacancy at original site */}
                  <circle cx={x} cy={y} r="14" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" />
                  {/* Interstitial cation */}
                  <circle cx={x + 30} cy={y + 22} r="12" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                  <text x={x + 30} y={y + 26} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">+</text>
                  {/* Arrow indicating displacement */}
                  <path d={`M ${x+10} ${y+10} Q ${x+20} ${y+5} ${x+24} ${y+16}`} fill="none" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#arrow)" />
                </g>
              );
            }

            return (
              <g key={`ion-${r}-${c}`}>
                <circle
                  cx={x} cy={y}
                  r={isCation ? 14 : 19}
                  fill={isCation ? '#38bdf8' : '#34d399'}
                  stroke={isCation ? '#0284c7' : '#059669'}
                  strokeWidth="1.5"
                />
                <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                  {isCation ? '+' : '–'}
                </text>
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
};

// 4. Band Theory & Doping Visualizer
const BandTheoryVisualizer: React.FC<{ mode: 'conductor' | 'insulator' | 'n-type' | 'p-type' }> = ({ mode }) => {
  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center relative border border-slate-700">
      <div className="absolute top-3 left-3 bg-slate-800 text-xs px-2 py-1 rounded text-purple-400 font-mono">
        {mode === 'conductor' ? 'Metal Conductor (Overlapping Bands)' :
         mode === 'insulator' ? 'Insulator (Large Eg > 5 eV)' :
         mode === 'n-type' ? 'n-type (Doped with Group 15 P -> Extra e⁻)' :
         'p-type (Doped with Group 13 B -> Positive Holes)'}
      </div>
      <svg className="w-full h-48" viewBox="0 0 340 200">
        {/* Valence Band */}
        <rect x="60" y="130" width="220" height="40" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <text x="170" y="155" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Valence Band (Filled)</text>

        {/* Conduction Band */}
        <rect x="60" y={mode === 'conductor' ? 110 : 30} width="220" height="40" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
        <text x="170" y={mode === 'conductor' ? 135 : 55} textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">Conduction Band</text>

        {/* Band Gap Label */}
        {mode !== 'conductor' && (
          <g>
            <line x1="295" y1="70" x2="295" y2="130" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="302" y="105" fill="#f43f5e" fontSize="11" fontWeight="bold">
              {mode === 'insulator' ? 'Eg > 5 eV' : 'Eg ≈ 1.1 eV'}
            </text>
          </g>
        )}

        {/* n-type Donor Level */}
        {mode === 'n-type' && (
          <g>
            <line x1="70" y1="80" x2="270" y2="80" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />
            <text x="170" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10">Donor Energy Level (Group 15)</text>
            <circle cx="100" cy="76" r="4" fill="#fbbf24" />
            <circle cx="150" cy="76" r="4" fill="#fbbf24" />
            <circle cx="200" cy="76" r="4" fill="#fbbf24" />
          </g>
        )}

        {/* p-type Acceptor Level */}
        {mode === 'p-type' && (
          <g>
            <line x1="70" y1="120" x2="270" y2="120" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
            <text x="170" y="115" textAnchor="middle" fill="#f43f5e" fontSize="10">Acceptor Energy Level (Group 13)</text>
            <circle cx="110" cy="124" r="4" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="170" cy="124" r="4" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="230" cy="124" r="4" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
};

// 5. Raoult's Law Vapour Pressure Graph
const RaoultGraphVisualizer: React.FC<{ xA: number }> = ({ xA }) => {
  const xB = 1 - xA;
  const pA0 = 100; // mm Hg
  const pB0 = 60;  // mm Hg

  const pA = xA * pA0;
  const pB = xB * pB0;
  const pTotal = pA + pB;

  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center relative border border-slate-700">
      <div className="absolute top-3 left-3 bg-slate-800 text-xs px-2 py-1 rounded text-gold-400 font-mono">
        Vapour Pressure vs Mole Fraction (Ideal Solution)
      </div>
      <svg className="w-full h-48" viewBox="0 0 340 190">
        {/* Axes */}
        <line x1="50" y1="150" x2="290" y2="150" stroke="#64748b" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="150" stroke="#64748b" strokeWidth="2" />
        <line x1="290" y1="30" x2="290" y2="150" stroke="#64748b" strokeWidth="2" />

        {/* Ideal Raoult Lines */}
        {/* pA line: (x=0, y=150) to (x=1, y=30) */}
        <line x1="50" y1="150" x2="290" y2="30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
        {/* pB line: (x=0, y=80) to (x=1, y=150) */}
        <line x1="50" y1="80" x2="290" y2="150" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
        {/* pTotal line: (x=0, y=80) to (x=1, y=30) */}
        <line x1="50" y1="80" x2="290" y2="30" stroke="#10b981" strokeWidth="2.5" />

        {/* Current Composition Marker */}
        {(() => {
          const posX = 50 + xA * 240;
          const posY = 150 - (pTotal / 100) * 120;
          return (
            <g>
              <line x1={posX} y1="30" x2={posX} y2="150" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={posX} cy={posY} r="6" fill="#f59e0b" />
            </g>
          );
        })()}

        {/* Labels */}
        <text x="50" y="168" textAnchor="middle" fill="#94a3b8" fontSize="10">xA=0, xB=1</text>
        <text x="290" y="168" textAnchor="middle" fill="#94a3b8" fontSize="10">xA=1, xB=0</text>
        <text x="45" y="25" textAnchor="end" fill="#f43f5e" fontSize="10">pB° = 60</text>
        <text x="295" y="25" textAnchor="start" fill="#38bdf8" fontSize="10">pA° = 100</text>
      </svg>
      <div className="text-xs text-slate-300 font-mono mt-1 flex gap-4">
        <span className="text-gold-400">pA = {pA.toFixed(1)} mmHg</span>
        <span className="text-rose-400">pB = {pB.toFixed(1)} mmHg</span>
        <span className="text-emerald-400 font-bold">pTotal = {pTotal.toFixed(1)} mmHg</span>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: "misc_1",
    title: "Amorphous Solids Have Sharp and Definite Melting Points",
    description: "Students often believe that amorphous solids like glass or plastic melt at a single, precise temperature just like crystalline solids. They view amorphous solids as identical to crystalline solids in their melting behavior.",
    correction: "Amorphous solids do not have a sharp melting point; instead, they gradually soften over a range of temperatures due to their lack of long-range periodic order. In contrast, crystalline solids possess uniform long-range order and melt at a fixed, characteristic temperature. Because of this gradual softening, amorphous solids are classified as pseudo-solids or supercooled liquids.",
  },
  {
    id: "misc_2",
    title: "HCP and FCC Structures Have Different Packing Efficiencies",
    description: "Students frequently assume that Hexagonal Close-Packed (HCP) and Face-Centered Cubic (FCC) structures have different packing fractions because their unit cell geometries look completely distinct.",
    correction: "Both HCP and FCC lattices represent maximum close-packing of identical spheres, achieving an identical packing efficiency of 74%. They differ only in their layer-stacking pattern—ABAB... for HCP versus ABCABC... for FCC. Consequently, both arrangements also share the exact same coordination number of 12 for each constituent atom.",
  },
  {
    id: "misc_3",
    title: "Frenkel Defects Cause a Decrease in Overall Crystal Density",
    description: "Students often confuse Frenkel defects with Schottky defects, believing that both types of stoichiometric point defects lead to a reduction in crystal density.",
    correction: "In a Frenkel defect, an ion is simply displaced from its lattice site into an interstitial site within the same crystal. Because no ions actually leave the crystal lattice, the overall mass and volume remain constant, keeping the density unchanged. Schottky defects, on the other hand, involve missing cations and anions, which directly decreases crystal density.",
  },
  {
    id: "misc_4",
    title: "Lattice Points Represent Physical Atoms Touching Each Other",
    description: "Students often picture lattice points as physical, tangible atomic spheres that directly touch neighboring points inside a unit cell.",
    correction: "A lattice point is a purely theoretical point in space that marks where a constituent particle can be located. Each lattice point represents a structural basis, which can be a single atom, an ion, or a group of molecules. The physical boundaries and contact of particles are defined by ionic or atomic radii, not by the dimensionless lattice points.",
  },
  {
    id: "misc_5",
    title: "Body Centered Cubic Structure is a Close Packed Lattice",
    description: "Students frequently classify the Body-Centered Cubic (BCC) arrangement as a close-packed structure with maximum space utilization.",
    correction: "BCC is not a close-packed structure because its constituent spheres leave significant open space, resulting in a packing efficiency of only 68%. In contrast, true close-packed structures like FCC and HCP utilize 74% of the available unit cell space. Additionally, an atom in a BCC structure has a lower coordination number of 8 compared to 12 in close-packed lattices.",
  },
];

export function C12_ChemistrySolidstatecharacteristicsSim() {
  // State variables
  const [activeTab, setActiveTab] = useState<ActiveTab>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // User responses & progress
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<string | null>(null);
  const [showDiscoveryFeedback, setShowDiscoveryFeedback] = useState(false);

  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, string>>({});
  const [challengeStatus, setChallengeStatus] = useState<Record<string, 'pending' | 'correct' | 'incorrect'>>({});

  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState("");

  // BKT States per Node
  const [bktMap, setBktMap] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const map = {} as Record<NodeId, ReturnType<typeof createBKTState>>;
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState();
    });
    return map;
  });

  // Sandbox States
  const [sandboxMode, setSandboxMode] = useState<SandboxMode>('lattice');
  const [cellType, setCellType] = useState<'SC' | 'BCC' | 'FCC'>('FCC');
  const [crystalType, setCrystalType] = useState<'crystalline' | 'amorphous'>('crystalline');
  const [defectType, setDefectType] = useState<'none' | 'schottky' | 'frenkel'>('schottky');
  const [bandMode, setBandMode] = useState<'conductor' | 'insulator' | 'n-type' | 'p-type'>('n-type');
  const [moleFractionA, setMoleFractionA] = useState(0.6);

  // Solutions Sandbox Calculator state
  const [soluteMassGrams, setSoluteMassGrams] = useState(10);
  const [soluteMolarMass, setSoluteMolarMass] = useState(58.5); // NaCl
  const [solutionVolumemL, setSolutionVolumemL] = useState(250);
  const [solventMassGrams, setSolventMassGrams] = useState(250);

  // Auto-hint timer (10 sec inactivity)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const curChallenge = CHALLENGES[currentChallengeIndex];
        if (curChallenge) {
          setCurrentHint(curChallenge.hint);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 10000);
  }, [activeTab, currentChallengeIndex]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer, activeTab, currentSlideIndex, currentChallengeIndex]);

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    const totalP = ALL_NODE_IDS.reduce((acc, id) => acc + bktMap[id].p_know, 0);
    return Math.round((totalP / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  // Dynamic Molarity / Molality Calculations
  const calculatedMolarity = useMemo(() => {
    const moles = soluteMassGrams / soluteMolarMass;
    const volLiters = solutionVolumemL / 1000;
    return (moles / volLiters).toFixed(2);
  }, [soluteMassGrams, soluteMolarMass, solutionVolumemL]);

  const calculatedMolality = useMemo(() => {
    const moles = soluteMassGrams / soluteMolarMass;
    const solventKg = solventMassGrams / 1000;
    return (moles / solventKg).toFixed(2);
  }, [soluteMassGrams, soluteMolarMass, solventMassGrams]);

  // ------------------------------------------
  // HANDLERS
  // ------------------------------------------
  const handleDiscoverySubmit = (optId: string) => {
    setSelectedDiscoveryOpt(optId);
    setShowDiscoveryFeedback(true);
    const opt = DISCOVERY_QUESTION.options.find((o) => o.id === optId);
    if (opt?.isCorrect) {
      audioManager.play('success');
      speechManager.speak("Excellent prediction! Gas solubility decreases with heating, whereas solid sugar dissolves better.");
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite! Remember that gas dissolution is exothermic.");
    }
  };

  const handleChallengeAnswer = (answerId: string) => {
    const challenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = answerId === challenge.correctAnswer;

    setChallengeAnswers((prev) => ({ ...prev, [challenge.id]: answerId }));
    setChallengeStatus((prev) => ({ ...prev, [challenge.id]: isCorrect ? 'correct' : 'incorrect' }));

    // Update BKT & SRS
    setBktMap((prev) => ({
      ...prev,
      [challenge.nodeId]: bktUpdate(prev[challenge.nodeId], isCorrect)
    }));
        const _reviewItem = createReviewItem('C12_ChemistrySolidst', 'Chemistry');
        sm2Update(_reviewItem, 4, 0);

    if (isCorrect) {
      audioManager.play('correct' as any);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);
      setScore((s) => s + 10);
      speechManager.speak("Spot on! That is correct.");
    } else {
      audioManager.play('error');
      speechManager.speak("That is incorrect. Take a close look at the explanation.");
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('swoop');
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      recordGameScore(Object.values(ALL_NODE_IDS), score);
      speechManager.speak("Congratulations! You have completed all Class 12 Solid State and Solutions challenges.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 font-sans select-none">
      {/* HEADER BAR */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-gold-500/20 text-gold-400 text-xs font-bold px-2.5 py-1 rounded-full border border-gold-500/30">
              ISC Class 12 Chemistry
            </span>
            <span className="text-slate-400 text-xs font-mono">10 Key Syllabus Nodes</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-50 mt-1 tracking-tight">
            Solid State & Solutions Simulation Lab
          </h1>
        </div>

        {/* MASTERY & SCORE DISPLAY */}
        <div className="flex items-center gap-6 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">BKT Mastery</div>
            <div className="text-lg font-bold text-gold-400">{overallMastery}%</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">Score</div>
            <div className="text-lg font-bold text-amber-400">{score} pts</div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="max-w-6xl mx-auto flex flex-wrap gap-2 mb-6">
        {[
          { id: 'discovery', label: '1. Discovery' },
          { id: 'teach', label: '2. Concept Deck' },
          { id: 'sandbox', label: '3. Interactive Lab' },
          { id: 'challenges', label: '4. ISC Challenges' },
          { id: 'applications', label: '5. Real-World' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as ActiveTab);
              audioManager.play('tap');
            }}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {/* TAB 1: DISCOVERY */}
          {activeTab === 'discovery' && (
            <motion.div
              key="tab-discovery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8"
            >
              <div className="max-w-3xl mx-auto">
                <span className="text-gold-400 text-xs font-bold uppercase tracking-wider font-mono">
                  Predict Before You Learn
                </span>
                <h2 className="text-2xl font-bold text-slate-100 mt-2 mb-4">
                  {DISCOVERY_QUESTION.title}
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  {DISCOVERY_QUESTION.prompt}
                </p>

                {/* Options List */}
                <div className="space-y-3">
                  {DISCOVERY_QUESTION.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleDiscoverySubmit(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                        selectedDiscoveryOpt === opt.id
                          ? opt.isCorrect
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {/* Discovery Feedback */}
                {showDiscoveryFeedback && selectedDiscoveryOpt && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800"
                  >
                    <div className="font-bold text-sm mb-1 text-gold-400">Scientific Insight:</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {DISCOVERY_QUESTION.options.find((o) => o.id === selectedDiscoveryOpt)?.explanation}
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab('teach');
                        audioManager.play('whoosh');
                      }}
                      className="mt-4 px-5 py-2.5 bg-gold-500 text-slate-950 rounded-lg text-xs font-bold hover:bg-gold-400 transition-all"
                    >
                      Continue to Teaching Deck →
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: TEACHING SLIDES */}
          {activeTab === 'teach' && (
            <motion.div
              key="tab-teach"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Interactive Visual */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'crystal_type' && (
                    <div className="space-y-3">
                      <div className="flex gap-2 justify-center mb-2">
                        <button
                          onClick={() => setCrystalType('crystalline')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            crystalType === 'crystalline' ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Crystalline (Quartz/Mica)
                        </button>
                        <button
                          onClick={() => setCrystalType('amorphous')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            crystalType === 'amorphous' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Amorphous (Glass)
                        </button>
                      </div>
                      <CrystalTypeVisualizer type={crystalType} />
                    </div>
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'unit_cell_3d' && (
                    <div className="space-y-3">
                      <div className="flex gap-2 justify-center mb-2">
                        {(['SC', 'BCC', 'FCC'] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setCellType(t)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              cellType === t ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {t} Unit Cell
                          </button>
                        ))}
                      </div>
                      <UnitCellVisualizer type={cellType} />
                    </div>
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'packing_eff' && (
                    <UnitCellVisualizer type={cellType} />
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'defects_vis' && (
                    <div className="space-y-3">
                      <div className="flex gap-2 justify-center mb-2">
                        {(['none', 'schottky', 'frenkel'] as const).map((d) => (
                          <button
                            key={d}
                            onClick={() => setDefectType(d)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                              defectType === d ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <DefectsVisualizer defect={defectType} />
                    </div>
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'band_gap' && (
                    <div className="space-y-3">
                      <div className="flex gap-1 justify-center mb-2">
                        {(['conductor', 'insulator', 'n-type', 'p-type'] as const).map((b) => (
                          <button
                            key={b}
                            onClick={() => setBandMode(b)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${
                              bandMode === b ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                      <BandTheoryVisualizer mode={bandMode} />
                    </div>
                  )}

                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'raoult_graph' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Mole Fraction xA:</span>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={moleFractionA}
                          onChange={(e) => setMoleFractionA(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                        <span className="text-xs font-bold text-gold-400 font-mono">{moleFractionA.toFixed(2)}</span>
                      </div>
                      <RaoultGraphVisualizer xA={moleFractionA} />
                    </div>
                  )}
                </div>

                {/* Right: Explanatory Content Deck */}
                <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950 border border-slate-800 p-6 rounded-xl">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gold-400 uppercase font-mono">
                        Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                      </span>
                      <span className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-400 font-mono">
                        Node: {TEACHING_SLIDES[currentSlideIndex].nodeId}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mb-1">
                      {TEACHING_SLIDES[currentSlideIndex].title}
                    </h3>
                    <p className="text-xs text-gold-300 font-medium mb-4">
                      {TEACHING_SLIDES[currentSlideIndex].subtitle}
                    </p>

                    <div className="space-y-3 text-sm text-slate-300 leading-relaxed mb-6">
                      {TEACHING_SLIDES[currentSlideIndex].content.map((p, i) => (
                        <p key={`p-${i}`} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                          {p}
                        </p>
                      ))}
                    </div>

                    {TEACHING_SLIDES[currentSlideIndex].keyFormula && (
                      <div className="bg-gold-950/40 border border-gold-800/60 p-3 rounded-lg text-center font-mono text-sm text-gold-300 font-bold mb-4">
                        Key Equation: {TEACHING_SLIDES[currentSlideIndex].keyFormula}
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      onClick={() => {
                        if (currentSlideIndex > 0) {
                          setCurrentSlideIndex((prev) => prev - 1);
                          audioManager.play('tap');
                        }
                      }}
                      disabled={currentSlideIndex === 0}
                      className="px-4 py-2 rounded-lg bg-slate-900 text-slate-400 text-xs font-bold disabled:opacity-40 hover:bg-slate-800"
                    >
                      ← Previous Slide
                    </button>

                    <button
                      onClick={() => {
                        if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                          setCurrentSlideIndex((prev) => prev + 1);
                          audioManager.play('tap');
                        } else {
                          setActiveTab('sandbox');
                          audioManager.play('whoosh');
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-gold-500 text-slate-950 text-xs font-bold hover:bg-gold-400"
                    >
                      {currentSlideIndex < TEACHING_SLIDES.length - 1 ? 'Next Slide →' : 'Enter Interactive Lab →'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: INTERACTIVE SANDBOX */}
          {activeTab === 'sandbox' && (
            <motion.div
              key="tab-sandbox"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: 'lattice', label: '3D Crystal Lattice' },
                  { id: 'defects', label: 'Lattice Defects' },
                  { id: 'bands', label: 'Band Gap & Doping' },
                  { id: 'solutions', label: 'Solutions & Concentration' },
                  { id: 'raoult', label: 'Raoult Law Vapour Pressure' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSandboxMode(m.id as SandboxMode);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      sandboxMode === m.id ? 'bg-gold-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* SANDBOX CONTROLS & DISPLAY */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  {sandboxMode === 'lattice' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        {(['SC', 'BCC', 'FCC'] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setCellType(t)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              cellType === t ? 'bg-gold-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                            }`}
                          >
                            {t} Unit Cell
                          </button>
                        ))}
                      </div>
                      <UnitCellVisualizer type={cellType} />
                    </div>
                  )}

                  {sandboxMode === 'defects' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        {(['none', 'schottky', 'frenkel'] as const).map((d) => (
                          <button
                            key={d}
                            onClick={() => setDefectType(d)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                              defectType === d ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                            }`}
                          >
                            {d} Defect
                          </button>
                        ))}
                      </div>
                      <DefectsVisualizer defect={defectType} />
                    </div>
                  )}

                  {sandboxMode === 'bands' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        {(['conductor', 'insulator', 'n-type', 'p-type'] as const).map((b) => (
                          <button
                            key={b}
                            onClick={() => setBandMode(b)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                              bandMode === b ? 'bg-purple-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                      <BandTheoryVisualizer mode={bandMode} />
                    </div>
                  )}

                  {sandboxMode === 'solutions' && (
                    <div className="w-full h-64 bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
                      <div className="text-xs font-bold text-gold-400 uppercase font-mono">
                        Virtual Solution Beaker Visualizer
                      </div>
                      <div className="flex items-center justify-around my-4">
                        {/* Solute Particles */}
                        <div className="w-28 h-36 bg-slate-900 border-2 border-slate-700 rounded-b-2xl relative overflow-hidden flex flex-col justify-end p-2">
                          <div
                            className="w-full bg-gold-500/30 rounded-b-xl transition-all duration-300"
                            style={{ height: `${Math.min(100, (solutionVolumemL / 500) * 100)}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-gold-300">
                            {soluteMassGrams}g Solute
                          </div>
                        </div>

                        {/* Calculations Box */}
                        <div className="space-y-2 text-xs font-mono">
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-slate-400">Molarity (M):</span>{' '}
                            <span className="text-emerald-400 font-bold">{calculatedMolarity} mol/L</span>
                          </div>
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-slate-400">Molality (m):</span>{' '}
                            <span className="text-gold-400 font-bold">{calculatedMolality} mol/kg</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {sandboxMode === 'raoult' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Mole Fraction xA:</span>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={moleFractionA}
                          onChange={(e) => setMoleFractionA(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                        <span className="text-xs font-bold text-gold-400 font-mono">{moleFractionA.toFixed(2)}</span>
                      </div>
                      <RaoultGraphVisualizer xA={moleFractionA} />
                    </div>
                  )}
                </div>

                {/* Controls & Metrics Panel */}
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-slate-200">Interactive Metrics & Formulas</h4>

                  {sandboxMode === 'lattice' && (
                    <div className="space-y-2 font-mono text-slate-300">
                      <div>
                        Selected Unit Cell:{' '}
                        <span className="text-gold-400 font-bold">
                          {cellType === 'SC' ? 'Simple Cubic' : cellType === 'BCC' ? 'Body-Centred Cubic' : 'Face-Centred Cubic'}
                        </span>
                      </div>
                      <div>Atoms per cell (Z): <span className="text-emerald-400 font-bold">{cellType === 'SC' ? 1 : cellType === 'BCC' ? 2 : 4}</span></div>
                      <div>Edge-Radius Relation: <span className="text-amber-400">{cellType === 'SC' ? 'a = 2r' : cellType === 'BCC' ? 'a = 4r/√3' : 'a = 2√2r'}</span></div>
                      <div>Packing Efficiency: <span className="text-purple-400 font-bold">{cellType === 'SC' ? '52.4%' : cellType === 'BCC' ? '68.0%' : '74.0%'}</span></div>
                      <div>Void Space: <span className="text-rose-400">{cellType === 'SC' ? '47.6%' : cellType === 'BCC' ? '32.0%' : '26.0%'}</span></div>
                    </div>
                  )}

                  {sandboxMode === 'defects' && (
                    <div className="space-y-2 text-slate-300">
                      <div className="font-bold text-gold-400 capitalize">{defectType} Defect Summary:</div>
                      {defectType === 'schottky' && (
                        <p>Equal cation-anion missing pairs. Density DECREASES. Common in ionic solids with similar cation/anion sizes (NaCl, KCl).</p>
                      )}
                      {defectType === 'frenkel' && (
                        <p>Cation leaves lattice site into interstitial void. Density remains UNCHANGED. Common when cation is much smaller than anion (AgCl, ZnS).</p>
                      )}
                      {defectType === 'none' && <p>Perfect stoichiometric lattice with zero vacancies or interstitials.</p>}
                    </div>
                  )}

                  {sandboxMode === 'solutions' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Solute Mass (g): {soluteMassGrams}g</label>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={soluteMassGrams}
                          onChange={(e) => setSoluteMassGrams(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Solution Volume (mL): {solutionVolumemL}mL</label>
                        <input
                          type="range"
                          min="100"
                          max="1000"
                          step="50"
                          value={solutionVolumemL}
                          onChange={(e) => setSolutionVolumemL(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Solvent Mass (g): {solventMassGrams}g</label>
                        <input
                          type="range"
                          min="100"
                          max="1000"
                          step="50"
                          value={solventMassGrams}
                          onChange={(e) => setSolventMassGrams(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                    </div>
                  )}

                  {sandboxMode === 'raoult' && (
                    <div className="space-y-2 text-slate-300 text-xs">
                      <p className="font-bold text-gold-400">Raoult&apos;s Law Principles:</p>
                      <p>1. Partial pressure of volatile component pA = xA · pA°.</p>
                      <p>2. Total vapour pressure pTotal = xA · pA° + (1-xA) · pB°.</p>
                      <p>3. Relative lowering for non-volatile solute: (p1° - p) / p1° = x2.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: ISC PROGRESSIVE CHALLENGES */}
          {activeTab === 'challenges' && (
            <motion.div
              key="tab-challenges"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8"
            >
              <div className="max-w-3xl mx-auto">
                {/* Challenge Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold text-gold-400 uppercase font-mono">
                      Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                    </span>
                    <span className="ml-2 text-xs bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-400 font-mono">
                      Node: {CHALLENGES[currentChallengeIndex].nodeId}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Progress: {Math.round(((currentChallengeIndex + 1) / CHALLENGES.length) * 100)}%
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-2">
                  {CHALLENGES[currentChallengeIndex].title}
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {CHALLENGES[currentChallengeIndex].question}
                </p>

                {/* Challenge Options */}
                <div className="space-y-3 mb-6">
                  {CHALLENGES[currentChallengeIndex].options?.map((opt) => {
                    const challengeId = CHALLENGES[currentChallengeIndex].id;
                    const isSelected = challengeAnswers[challengeId] === opt.id;
                    const status = challengeStatus[challengeId];

                    let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                    if (isSelected) {
                      if (status === 'correct') {
                        btnStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200";
                      } else if (status === 'incorrect') {
                        btnStyle = "bg-rose-950/50 border-rose-500 text-rose-200";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleChallengeAnswer(opt.id)}
                        disabled={!!challengeStatus[challengeId]}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${btnStyle}`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {challengeStatus[CHALLENGES[currentChallengeIndex].id] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6"
                  >
                    <div
                      className={`font-bold text-sm mb-1 ${
                        challengeStatus[CHALLENGES[currentChallengeIndex].id] === 'correct'
                          ? 'text-emerald-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {challengeStatus[CHALLENGES[currentChallengeIndex].id] === 'correct'
                        ? 'Correct Answer!'
                        : 'Incorrect.'}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {CHALLENGES[currentChallengeIndex].explanation}
                    </p>
                  </motion.div>
                )}

                {/* Next Button */}
                {challengeStatus[CHALLENGES[currentChallengeIndex].id] && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gold-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20"
                    >
                      {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete All Challenges!'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 5: REAL-WORLD APPLICATIONS */}
          {activeTab === 'applications' && (
            <motion.div
              key="tab-applications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8"
            >
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <span className="text-gold-400 text-xs font-bold uppercase font-mono">
                    Indian Context & Industrial Applications
                  </span>
                  <h2 className="text-2xl font-bold text-slate-100 mt-1">
                    Chemistry in Action across India
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
                    <h3 className="text-sm font-bold text-gold-400">1. Koderma Mica Mines (Jharkhand)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Crystalline mica cleaves along thin hexagonal planes due to anisotropic bonding forces (strong covalent within sheets, weak van der Waals between layers).
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
                    <h3 className="text-sm font-bold text-emerald-400">2. Sambhar Salt Pan Crystallisation (Rajasthan)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Rock salt (NaCl) forms face-centred cubic (FCC) unit cells during slow brine evaporation, enclosing Na⁺ in octahedral voids of the Cl⁻ array.
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
                    <h3 className="text-sm font-bold text-purple-400">3. Bengaluru Semiconductor Hub & Doping</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Modern microchips rely on controlled impurity defects: doping high-purity silicon with Group 15 Phosphorus (n-type) or Group 13 Boron (p-type).
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
                    <h3 className="text-sm font-bold text-amber-400">4. UP Sugar Refineries & Azeotropic Distillation</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Molasses fermentation produces rectified spirit (95.6% ethanol). Because it forms a minimum-boiling azeotrope obeying non-ideal Raoult deviations, fractional distillation alone cannot yield anhydrous alcohol.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All ISC Solid State & Solutions Challenges Completed!" />
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

// Default export
export default C12_ChemistrySolidstatecharacteristicsSim;