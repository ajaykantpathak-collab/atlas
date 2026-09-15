"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Electrons fill subshells in simple order of principal quantum number",
    description: "Students believe that 3d orbitals are always filled before 4s orbitals because 3 comes before 4. They assume principal quantum number n alone dictates energy order.",
    correction: "Electron filling order is determined by energy levels using the (n + l) rule, where subshells with lower (n + l) values are filled first. Since 4s has a lower (n + l) value of 4 compared to 5 for 3d, the 4s subshell fills before 3d.",
  },
  {
    id: "misc_2",
    title: "Hund rule permits electron pairing before singly filling degenerate orbitals",
    description: "Students often pair up electrons in the first degenerate orbital before adding electrons to empty orbitals in the same subshell. They assume filling one orbital completely is more stable than spreading electrons out.",
    correction: "Hund's rule of maximum multiplicity states that electron pairing in degenerate orbitals cannot occur until each orbital in that subshell is singly occupied. This distribution minimizes electron-electron repulsion and maximizes exchange energy, making the atom more stable.",
  },
  {
    id: "misc_3",
    title: "Two electrons occupying the same orbital can have identical parallel spins",
    description: "Students draw both electron arrows pointing upward in a single orbital box when constructing orbital diagrams. They fail to realize that electrons in the same spatial orbital must have different spins.",
    correction: "According to the Pauli Exclusion Principle, no two electrons in an atom can have identical sets of all four quantum numbers. Since two electrons in the same orbital share the same n, l, and ml values, they must have opposite spin quantum numbers (+1/2 and -1/2).",
  },
  {
    id: "misc_4",
    title: "Electrons are removed during ionization in exact reverse Aufbau order",
    description: "Students assume that because the 4s orbital fills before the 3d orbital, 3d electrons must be lost first during cation formation. They apply the Aufbau sequence backward without considering changes in energy upon ionization.",
    correction: "For transition metals, electrons are removed from the outermost shell with the highest principal quantum number n first during ionization. Therefore, 4s electrons are removed before 3d electrons when forming cations like Fe2+. Once 3d orbitals are occupied, 4s electrons experience greater shielding and higher effective energy, making them easier to remove.",
  },
  {
    id: "misc_5",
    title: "Singly occupied degenerate orbitals can contain electrons with opposite spin directions",
    description: "Students draw unpaired electrons in p or d subshells with mixed upward and downward pointing arrows. They believe that spin orientation does not matter as long as each orbital has one electron.",
    correction: "Hund's rule specifies that all singly occupied degenerate orbitals must hold electrons with parallel spins (all spin-up or all spin-down). Having parallel spins maximizes total spin multiplicity and exchange energy, which provides maximum thermodynamic stability to the atom.",
  },
];

// --- NODE IDS ---
const NODE_AUFBAU_PAULI_HUND = 'c11_chem_021';
const NODE_ELECTRONIC_CONFIG = 'c11_chem_022';
const NODE_MENDELEEV_LIMITATIONS = 'c11_chem_023';
const NODE_MODERN_PERIODIC_LAW = 'c11_chem_024';
const NODE_LONG_FORM_PERIODIC_TABLE = 'c11_chem_025';
const NODE_PERIODIC_TRENDS_RADII = 'c11_chem_026';
const NODE_PERIODIC_TRENDS_IE = 'c11_chem_027';
const NODE_PERIODIC_TRENDS_EGE = 'c11_chem_028';
const NODE_PERIODIC_TRENDS_EN = 'c11_chem_029';
const NODE_PERIODIC_TRENDS_CHEMICAL = 'c11_chem_030';

const ALL_NODE_IDS = [
  NODE_AUFBAU_PAULI_HUND,
  NODE_ELECTRONIC_CONFIG,
  NODE_MENDELEEV_LIMITATIONS,
  NODE_MODERN_PERIODIC_LAW,
  NODE_LONG_FORM_PERIODIC_TABLE,
  NODE_PERIODIC_TRENDS_RADII,
  NODE_PERIODIC_TRENDS_IE,
  NODE_PERIODIC_TRENDS_EGE,
  NODE_PERIODIC_TRENDS_EN,
  NODE_PERIODIC_TRENDS_CHEMICAL
];

// --- INTERFACES & TYPES ---
interface ElementInfo {
  z: number;
  symbol: string;
  name: string;
  mass: number;
  group: number;
  period: number;
  block: 's' | 'p' | 'd' | 'f';
  config: string;
  configShort: string;
  atomicRadius: number; // in pm
  firstIE: number; // in kJ/mol
  ege: number; // in kJ/mol
  en: number; // Pauling scale
  oxideFormula: string;
  oxideType: 'basic' | 'amphoteric' | 'acidic' | 'neutral';
  isException?: boolean;
}

interface OrbitalBox {
  id: string;
  subshell: string; // e.g. "1s", "2p_x"
  energyOrder: number;
  electrons: ('up' | 'down')[];
  maxCapacity: number;
}

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'orbital_fill' | 'multiple_choice' | 'radii_sort' | 'property_predict' | 'oxide_match' | 'tug_of_war';
  targetZ?: number;
  options?: { label: string; value: string; isCorrect: boolean; feedback: string }[];
  sortItems?: { id: string; label: string; val: number; explanation: string }[];
  correctOrderIds?: string[];
  hint: string;
  explanation: string;
}

interface MisconceptionInfo {
  id: string;
  tag: string;
  text: string;
  correction: string;
}

// --- DATA: PERIODIC ELEMENTS (Z=1 to 30 + key ones) ---
const PERIODIC_ELEMENTS: Record<number, ElementInfo> = {
  1: { z: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, group: 1, period: 1, block: 's', config: '1s1', configShort: '1s1', atomicRadius: 53, firstIE: 1312, ege: -73, en: 2.2, oxideFormula: 'H2O', oxideType: 'neutral' },
  2: { z: 2, symbol: 'He', name: 'Helium', mass: 4.0026, group: 18, period: 1, block: 's', config: '1s2', configShort: '1s2', atomicRadius: 31, firstIE: 2372, ege: 21, en: 0, oxideFormula: 'None', oxideType: 'neutral' },
  3: { z: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, group: 1, period: 2, block: 's', config: '1s2 2s1', configShort: '[He] 2s1', atomicRadius: 152, firstIE: 520, ege: -60, en: 1.0, oxideFormula: 'Li2O', oxideType: 'basic' },
  4: { z: 4, symbol: 'Be', name: 'Beryllium', mass: 9.0122, group: 2, period: 2, block: 's', config: '1s2 2s2', configShort: '[He] 2s2', atomicRadius: 112, firstIE: 899, ege: 66, en: 1.5, oxideFormula: 'BeO', oxideType: 'amphoteric' },
  5: { z: 5, symbol: 'B', name: 'Boron', mass: 10.81, group: 13, period: 2, block: 'p', config: '1s2 2s2 2p1', configShort: '[He] 2s2 2p1', atomicRadius: 85, firstIE: 801, ege: -27, en: 2.0, oxideFormula: 'B2O3', oxideType: 'acidic' },
  6: { z: 6, symbol: 'C', name: 'Carbon', mass: 12.011, group: 14, period: 2, block: 'p', config: '1s2 2s2 2p2', configShort: '[He] 2s2 2p2', atomicRadius: 77, firstIE: 1086, ege: -122, en: 2.5, oxideFormula: 'CO2', oxideType: 'acidic' },
  7: { z: 7, symbol: 'N', name: 'Nitrogen', mass: 14.007, group: 15, period: 2, block: 'p', config: '1s2 2s2 2p3', configShort: '[He] 2s2 2p3', atomicRadius: 75, firstIE: 1402, ege: 7, en: 3.0, oxideFormula: 'N2O5', oxideType: 'acidic' },
  8: { z: 8, symbol: 'O', name: 'Oxygen', mass: 15.999, group: 16, period: 2, block: 'p', config: '1s2 2s2 2p4', configShort: '[He] 2s2 2p4', atomicRadius: 73, firstIE: 1314, ege: -141, en: 3.5, oxideFormula: 'O2', oxideType: 'neutral' },
  9: { z: 9, symbol: 'F', name: 'Fluorine', mass: 18.998, group: 17, period: 2, block: 'p', config: '1s2 2s2 2p5', configShort: '[He] 2s2 2p5', atomicRadius: 71, firstIE: 1681, ege: -328, en: 4.0, oxideFormula: 'OF2', oxideType: 'acidic' },
  10: { z: 10, symbol: 'Ne', name: 'Neon', mass: 20.180, group: 18, period: 2, block: 'p', config: '1s2 2s2 2p6', configShort: '[He] 2s2 2p6', atomicRadius: 69, firstIE: 2081, ege: 116, en: 0, oxideFormula: 'None', oxideType: 'neutral' },
  11: { z: 11, symbol: 'Na', name: 'Sodium', mass: 22.990, group: 1, period: 3, block: 's', config: '1s2 2s2 2p6 3s1', configShort: '[Ne] 3s1', atomicRadius: 186, firstIE: 496, ege: -53, en: 0.9, oxideFormula: 'Na2O', oxideType: 'basic' },
  12: { z: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.305, group: 2, period: 3, block: 's', config: '1s2 2s2 2p6 3s2', configShort: '[Ne] 3s2', atomicRadius: 160, firstIE: 738, ege: 67, en: 1.2, oxideFormula: 'MgO', oxideType: 'basic' },
  13: { z: 13, symbol: 'Al', name: 'Aluminium', mass: 26.982, group: 13, period: 3, block: 'p', config: '1s2 2s2 2p6 3s2 3p1', configShort: '[Ne] 3s2 3p1', atomicRadius: 143, firstIE: 578, ege: -43, en: 1.5, oxideFormula: 'Al2O3', oxideType: 'amphoteric' },
  14: { z: 14, symbol: 'Si', name: 'Silicon', mass: 28.085, group: 14, period: 3, block: 'p', config: '1s2 2s2 2p6 3s2 3p2', configShort: '[Ne] 3s2 3p2', atomicRadius: 118, firstIE: 786, ege: -134, en: 1.8, oxideFormula: 'SiO2', oxideType: 'acidic' },
  15: { z: 15, symbol: 'P', name: 'Phosphorus', mass: 30.974, group: 15, period: 3, block: 'p', config: '1s2 2s2 2p6 3s2 3p3', configShort: '[Ne] 3s2 3p3', atomicRadius: 110, firstIE: 1012, ege: -72, en: 2.1, oxideFormula: 'P4O10', oxideType: 'acidic' },
  16: { z: 16, symbol: 'S', name: 'Sulfur', mass: 32.06, group: 16, period: 3, block: 'p', config: '1s2 2s2 2p6 3s2 3p4', configShort: '[Ne] 3s2 3p4', atomicRadius: 103, firstIE: 1000, ege: -200, en: 2.5, oxideFormula: 'SO3', oxideType: 'acidic' },
  17: { z: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, group: 17, period: 3, block: 'p', config: '1s2 2s2 2p6 3s2 3p5', configShort: '[Ne] 3s2 3p5', atomicRadius: 99, firstIE: 1251, ege: -349, en: 3.0, oxideFormula: 'Cl2O7', oxideType: 'acidic' },
  18: { z: 18, symbol: 'Ar', name: 'Argon', mass: 39.948, group: 18, period: 3, block: 'p', config: '1s2 2s2 2p6 3s2 3p6', configShort: '[Ne] 3s2 3p6', atomicRadius: 98, firstIE: 1521, ege: 96, en: 0, oxideFormula: 'None', oxideType: 'neutral' },
  19: { z: 19, symbol: 'K', name: 'Potassium', mass: 39.098, group: 1, period: 4, block: 's', config: '1s2 2s2 2p6 3s2 3p6 4s1', configShort: '[Ar] 4s1', atomicRadius: 227, firstIE: 419, ege: -48, en: 0.8, oxideFormula: 'K2O', oxideType: 'basic' },
  20: { z: 20, symbol: 'Ca', name: 'Calcium', mass: 40.078, group: 2, period: 4, block: 's', config: '1s2 2s2 2p6 3s2 3p6 4s2', configShort: '[Ar] 4s2', atomicRadius: 197, firstIE: 590, ege: 2, en: 1.0, oxideFormula: 'CaO', oxideType: 'basic' },
  24: { z: 24, symbol: 'Cr', name: 'Chromium', mass: 51.996, group: 6, period: 4, block: 'd', config: '1s2 2s2 2p6 3s2 3p6 3d5 4s1', configShort: '[Ar] 3d5 4s1', atomicRadius: 128, firstIE: 653, ege: -64, en: 1.6, oxideFormula: 'Cr2O3', oxideType: 'amphoteric', isException: true },
  25: { z: 25, symbol: 'Mn', name: 'Manganese', mass: 54.938, group: 7, period: 4, block: 'd', config: '1s2 2s2 2p6 3s2 3p6 3d5 4s2', configShort: '[Ar] 3d5 4s2', atomicRadius: 127, firstIE: 717, ege: 0, en: 1.5, oxideFormula: 'Mn2O7', oxideType: 'acidic' },
  26: { z: 26, symbol: 'Fe', name: 'Iron', mass: 55.845, group: 8, period: 4, block: 'd', config: '1s2 2s2 2p6 3s2 3p6 3d6 4s2', configShort: '[Ar] 3d6 4s2', atomicRadius: 126, firstIE: 762, ege: -15, en: 1.8, oxideFormula: 'Fe2O3', oxideType: 'amphoteric' },
  29: { z: 29, symbol: 'Cu', name: 'Copper', mass: 63.546, group: 11, period: 4, block: 'd', config: '1s2 2s2 2p6 3s2 3p6 3d10 4s1', configShort: '[Ar] 3d10 4s1', atomicRadius: 128, firstIE: 745, ege: -118, en: 1.9, oxideFormula: 'CuO', oxideType: 'basic', isException: true },
  30: { z: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, group: 12, period: 4, block: 'd', config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2', configShort: '[Ar] 3d10 4s2', atomicRadius: 134, firstIE: 906, ege: 0, en: 1.6, oxideFormula: 'ZnO', oxideType: 'amphoteric' }
};

// --- MISCONCEPTIONS ---
const MISCONCEPTIONS: MisconceptionInfo[] = [
  {
    id: 'm1_4s_3d',
    tag: '4s vs 3d Filling & Loss',
    text: 'Thinking 4s is always lower energy than 3d and thus lost after 3d in cations.',
    correction: '4s fills before 3d due to (n+l) rule (4 < 5), but during ionisation, valence 4s electrons are lost FIRST because outer n shell electrons feel weaker binding in cations!'
  },
  {
    id: 'm2_hund_pairing',
    tag: 'Hund Rule Violation',
    text: 'Pairing electrons in degenerate orbitals before filling each box singly.',
    correction: 'Hund\'s rule requires degenerate orbitals (e.g., 2px, 2py, 2pz) to be occupied singly with parallel spins before any pairing occurs to minimise e--e- repulsion.'
  },
  {
    id: 'm3_cr_cu_exceptions',
    tag: 'Anomalous Configurations',
    text: 'Writing Cr as [Ar]4s2 3d4 and Cu as [Ar]4s2 3d9 blindly.',
    correction: 'Cr is [Ar]3d5 4s1 and Cu is [Ar]3d10 4s1 due to the extra stability of half-filled (3d5) and fully-filled (3d10) subshells arising from symmetrical charge distribution and maximum exchange energy.'
  },
  {
    id: 'm4_f_vs_cl_ege',
    tag: 'Fluorine vs Chlorine EGE',
    text: 'Assuming Fluorine has the most negative Electron Gain Enthalpy because it is most electronegative.',
    correction: 'Chlorine has a MORE negative EGE (-349 kJ/mol) than Fluorine (-328 kJ/mol) because Fluorine\'s extremely small 2p orbital experiences strong inter-electronic repulsion when an extra electron enters.'
  },
  {
    id: 'm5_ie_noble_gas',
    tag: 'Ionisation vs Electronegativity',
    text: 'Confusing Ionisation Enthalpy with Electronegativity or assuming Fluorine has highest IE.',
    correction: 'Noble gases (like Neon with 2081 kJ/mol) have the HIGHEST first IE in a period due to complete octets. Electronegativity is for bonding electrons, while IE is for removing a free gaseous electron.'
  }
];

// --- DISCOVERY QUESTION ---
const DISCOVERY_QUESTION = {
  question: "Why does Potassium (Z = 19) place its 19th electron into the 4s orbital instead of the 3d orbital, even though 3d belongs to the 3rd shell?",
  options: [
    { label: "Because the 4s orbital has a smaller (n + l) energy value (4 + 0 = 4) than the 3d orbital (3 + 2 = 5).", isCorrect: true, feedback: "Spot on! The Aufbau principle uses the (n+l) rule: lower (n+l) value means lower orbital energy, so 4s fills before 3d!" },
    { label: "Because 3d orbitals are full after 3p orbitals.", isCorrect: false, feedback: "3d orbitals can hold 10 electrons, but they remain empty until 4s is filled because 3d has a higher (n+l) value of 5." },
    { label: "Because the 4s shell is physically smaller than the 3d shell.", isCorrect: false, feedback: "The 4s orbital actually extends further out spatially (n=4), but its high penetration near the nucleus gives it a lower average energy." },
    { label: "Because Hund's rule forbids electrons in the 3d subshell for Z < 20.", isCorrect: false, feedback: "Hund's rule governs degenerate orbital pairing, not the relative energy order of 4s versus 3d subshells." }
  ]
};

// --- TEACHING SLIDES DATA ---
const TEACHING_SLIDES = [
  {
    id: 'slide_1',
    title: '1. The Three Master Rules of Electron Filling',
    subtitle: 'Aufbau Principle, Pauli Exclusion, and Hund\'s Rule',
    content: `To place electrons into atomic orbitals without chaos, nature follows three rigid laws:
    
1. **Aufbau Principle ("Building Up")**: Electrons occupy the lowest available energy orbital first. Governed by the **(n + l) rule**: orbitals with smaller (n+l) fill first (e.g. 4s with 4+0=4 fills before 3d with 3+2=5).
2. **Pauli Exclusion Principle**: No two electrons in an atom can have the same set of 4 quantum numbers. Therefore, an orbital holds a **maximum of 2 electrons**, and they MUST have **opposite spins** (+1/2 and -1/2).
3. **Hund\'s Rule of Maximum Multiplicity**: When filling degenerate orbitals (e.g. 2px, 2py, 2pz), electrons fill each box **singly with parallel spins** before any pairing occurs. This minimises electron-electron repulsion.`,
    badge: 'c11_chem_021'
  },
  {
    id: 'slide_2',
    title: '2. Electronic Configuration & Anomalous Stability',
    subtitle: 'Why Chromium (Cr) and Copper (Cu) cheat the Aufbau order',
    content: `Normally, subshells fill sequentially. However, half-filled (d5, f7) and completely-filled (d10, f14) subshells possess extraordinary thermodynamic stability due to:
- **Symmetrical charge distribution**: Minimises local repulsions.
- **Maximum Exchange Energy**: Electrons with parallel spins in degenerate orbitals exchange positions, releasing stabilizing exchange energy.

Hence:
- **Chromium (Z = 24)**: Expected \`[Ar] 3d4 4s2\` $\\rightarrow$ **Actual \`[Ar] 3d5 4s1\`** (two half-filled subshells!)
- **Copper (Z = 29)**: Expected \`[Ar] 3d9 4s2\` $\\rightarrow$ **Actual \`[Ar] 3d10 4s1\`** (fully filled 3d10!)

*Cation Rule*: When transition elements ionise (e.g. Fe $\\rightarrow$ Fe2+), the **4s electrons are lost FIRST**, giving Fe2+ = \`[Ar] 3d6\`.`,
    badge: 'c11_chem_022'
  },
  {
    id: 'slide_3',
    title: '3. Mendeleev\'s Table vs Modern Periodic Law',
    subtitle: 'From Atomic Mass to Atomic Number (Moseley\'s Breakthrough)',
    content: `**Mendeleev\'s Periodic Law (1869)** stated that properties are periodic functions of **Atomic Mass**.
*Limitations*:
1. **Anomalous Pairs**: Mass order had to be broken (e.g., Ar = 39.9 before K = 39.1; Co = 58.9 before Ni = 58.7).
2. **Isotopes**: Cl-35 and Cl-37 have different masses but identical chemistry—where do they go?
3. **Position of Hydrogen**: Couldn't be unequivocally assigned.

**Modern Periodic Law (Moseley, 1913)**: Properties are a periodic function of **Atomic Number (Z)**.
By sorting by nuclear charge $Z$ (number of protons = electron count), all anomalous pairs and isotope dilemmas resolved instantly!`,
    badge: 'c11_chem_023 & c11_chem_024'
  },
  {
    id: 'slide_4',
    title: '4. The Long Form Table & Orbital Blocks',
    subtitle: '7 Periods, 18 Groups, and s, p, d, f Division',
    content: `The long form periodic table directly mirrors the filling of quantum subshells:
- **Period Number = $n$** (Principal Quantum Number of outermost shell, 1 to 7).
- **Group 1-2**: **s-block** (filling ns subshell).
- **Group 13-18**: **p-block** (filling np subshell; representative elements).
- **Group 3-12**: **d-block** (filling (n-1)d subshell; transition metals).
- **Bottom rows**: **f-block** (filling (n-2)f subshell; Lanthanides & Actinides).

*IUPAC Naming for $Z > 100$*: Uses digit roots (0=nil, 1=un, 2=bi, 3=tri, 4=quad, 5=pent, 6=hex, 7=sept, 8=oct, 9=enn) + '-ium'. Example: $Z=116 \\rightarrow$ **Ununhexium (Uuh)**.`,
    badge: 'c11_chem_025'
  },
  {
    id: 'slide_5',
    title: '5. Periodic Trends: Radii, IE, EGE, EN & Oxides',
    subtitle: 'The master trends driving chemical behaviour across periods and groups',
    content: `1. **Atomic & Ionic Radii**:
   - **Across Period**: Decreases (effective nuclear charge $Z_{eff}$ increases, pulling electrons closer).
   - **Down Group**: Increases (new principal shell added).
   - **Isoelectronic Series**: Radius decreases as $Z$ increases ($N^{3-} > O^{2-} > F^- > Ne > Na^+ > Mg^{2+} > Al^{3+}$).
2. **Ionisation Enthalpy ($IE_1$)**: Energy to remove 1 e- from gaseous atom.
   - Increases across period; drops down group. *Exceptions*: Be ($2s^2$) > B ($2p^1$), N ($2p^3$) > O ($2p^4$). Noble gases have highest IE.
3. **Electron Gain Enthalpy (EGE)**: Energy change when e- added.
   - Halogens have most negative EGE. **Chlorine is MORE negative than Fluorine** due to F's small 2p orbital repulsion!
4. **Electronegativity (EN)**: Tendency to pull shared bonding pair.
   - Fluorine is highest (4.0 on Pauling scale). Increases across period, drops down group.
5. **Oxide Chemical Character**:
   - Left metals form **Basic oxides** ($Na_2O$, $CaO$).
   - Middle elements form **Amphoteric oxides** ($Al_2O_3$, $ZnO$).
   - Right non-metals form **Acidic oxides** ($SO_3$, $Cl_2O_7$).`,
    badge: 'c11_chem_026 - c11_chem_030'
  }
];

// --- CHALLENGES (10 Progressive Lab Experiments & Exercises) ---
const LAB_CHALLENGES: Challenge[] = [
  {
    id: 'chal_1',
    nodeId: NODE_AUFBAU_PAULI_HUND,
    title: 'Challenge 1: Fill Nitrogen (Z = 7)',
    subtitle: 'Apply Hund\'s Rule of Maximum Multiplicity',
    description: 'Use the interactive orbital filler to place 7 electrons into the 1s, 2s, and 2p orbitals for Nitrogen. Ensure you respect Pauli exclusion and Hund\'s rule!',
    type: 'orbital_fill',
    targetZ: 7,
    hint: 'Fill 1s (2 e-), 2s (2 e-), then place 1 electron in EACH of 2px, 2py, 2pz with parallel spins!',
    explanation: 'Nitrogen (1s2 2s2 2p3) has 3 electrons in the degenerate 2p subshell. According to Hund\'s rule, they enter separate 2px, 2py, 2pz boxes with parallel spins.'
  },
  {
    id: 'chal_2',
    nodeId: NODE_ELECTRONIC_CONFIG,
    title: 'Challenge 2: The Chromium Anomaly (Z = 24)',
    subtitle: 'Stabilize Half-Filled 3d Subshell',
    description: 'Build the ground state configuration for Chromium (Z = 24). What is the true valence configuration?',
    type: 'multiple_choice',
    options: [
      { label: "[Ar] 3d4 4s2", value: "wrong1", isCorrect: false, feedback: "Incorrect! This violates the extra stability gained by half-filling the d subshell." },
      { label: "[Ar] 3d5 4s1", value: "correct", isCorrect: true, feedback: "Correct! Promoting one 4s electron to 3d creates two half-filled subshells (3d5 4s1) with maximum exchange energy!" },
      { label: "[Ar] 3d6 4s0", value: "wrong2", isCorrect: false, feedback: "Incorrect! 4s1 3d5 is lower in energy than 3d6 4s0." },
      { label: "[Ar] 3d3 4s2 4p1", value: "wrong3", isCorrect: false, feedback: "Incorrect! 4p is higher in energy than 3d." }
    ],
    hint: 'Look for the arrangement where both 3d and 4s become half-filled!',
    explanation: 'Chromium adopts [Ar] 3d5 4s1 because half-filled 3d5 and 4s1 orbitals possess extra exchange energy and spherical symmetry.'
  },
  {
    id: 'chal_3',
    nodeId: NODE_ELECTRONIC_CONFIG,
    title: 'Challenge 3: Transition Metal Ionisation',
    subtitle: 'Forming the Fe3+ Ion (Z = 26)',
    description: 'Neutral Iron (Fe) is [Ar] 3d6 4s2. When forming Fe3+, which electrons are removed first?',
    type: 'multiple_choice',
    options: [
      { label: "Three 3d electrons, leaving [Ar] 3d3 4s2", value: "w1", isCorrect: false, feedback: "Wrong! Valence 4s electrons feel weaker effective binding in cations and are removed first." },
      { label: "Two 4s electrons first, then one 3d electron, leaving [Ar] 3d5", value: "corr", isCorrect: true, feedback: "Spot on! 4s electrons are lost first, then one 3d electron to leave the highly stable half-filled [Ar] 3d5!" },
      { label: "One 4s electron and two 3d electrons, leaving [Ar] 3d4 4s1", value: "w2", isCorrect: false, feedback: "Wrong! Both 4s electrons must be stripped before 3d electrons are lost." },
      { label: "Three 2p electrons from the inner argon core", value: "w3", isCorrect: false, feedback: "Wrong! Inner core electrons require vast ionisation energies." }
    ],
    hint: 'Outer shell electrons (highest n = 4) are removed before (n-1)d electrons!',
    explanation: 'In transition metal ionisation, 4s electrons (n=4) are lost before 3d electrons. Fe ([Ar]3d6 4s2) loses two 4s e- and one 3d e- to become Fe3+ ([Ar]3d5).'
  },
  {
    id: 'chal_4',
    nodeId: NODE_MENDELEEV_LIMITATIONS,
    title: 'Challenge 4: Mendeleev\'s Anomalous Pairs',
    subtitle: 'Mass Ordering vs Chemical Ordering',
    description: 'Which of the following pairs violated Mendeleev\'s strict atomic mass order to preserve chemical families?',
    type: 'multiple_choice',
    options: [
      { label: "Tellurium (127.6 u) placed BEFORE Iodine (126.9 u)", value: "corr", isCorrect: true, feedback: "Correct! Te (Z=52) was placed before I (Z=53) despite being heavier, to keep Iodine with halogens!" },
      { label: "Sodium (23 u) placed before Magnesium (24 u)", value: "w1", isCorrect: false, feedback: "Na comes before Mg in both mass and atomic number." },
      { label: "Carbon (12 u) placed before Nitrogen (14 u)", value: "w2", isCorrect: false, feedback: "Carbon is lighter than Nitrogen; this followed mass order." },
      { label: "Helium (4 u) placed before Lithium (7 u)", value: "w3", isCorrect: false, feedback: "Helium is lighter than Lithium." }
    ],
    hint: 'Look for the pair where a heavier element had to precede a lighter one!',
    explanation: 'Tellurium (127.6 u) precedes Iodine (126.9 u) and Cobalt (58.9 u) precedes Nickel (58.7 u) in Mendeleev\'s table, breaking mass order.'
  },
  {
    id: 'chal_5',
    nodeId: NODE_PERIODIC_TRENDS_RADII,
    title: 'Challenge 5: Isoelectronic Species Sorting',
    subtitle: 'Order by Increasing Ionic Radius',
    description: 'Arrange these seven isoelectronic species (all with 10 electrons) in order of INCREASING radius (smallest first):',
    type: 'radii_sort',
    sortItems: [
      { id: 'al3', label: 'Al³⁺ (Z=13)', val: 53, explanation: 'Highest nuclear charge (13 protons pulling 10 e-) = SMALLEST radius!' },
      { id: 'mg2', label: 'Mg²⁺ (Z=12)', val: 72, explanation: '12 protons pulling 10 e-.' },
      { id: 'na1', label: 'Na⁺ (Z=11)', val: 102, explanation: '11 protons pulling 10 e-.' },
      { id: 'ne0', label: 'Ne (Z=10)', val: 112, explanation: 'Neutral atom, 10 protons.' },
      { id: 'f1', label: 'F⁻ (Z=9)', val: 133, explanation: '9 protons for 10 e- (anion expands).' },
      { id: 'o2', label: 'O²⁻ (Z=8)', val: 140, explanation: '8 protons for 10 e-.' },
      { id: 'n3', label: 'N³⁻ (Z=7)', val: 146, explanation: 'Lowest nuclear charge (7 protons for 10 e-) = LARGEST radius!' }
    ],
    correctOrderIds: ['al3', 'mg2', 'na1', 'ne0', 'f1', 'o2', 'n3'],
    hint: 'More protons pulling the same 10 electrons = stronger pull = smaller radius!',
    explanation: 'For isoelectronic species, radius decreases as nuclear charge Z increases: Al³⁺ < Mg²⁺ < Na⁺ < Ne < F⁻ < O²⁻ < N³⁻.'
  },
  {
    id: 'chal_6',
    nodeId: NODE_PERIODIC_TRENDS_IE,
    title: 'Challenge 6: Ionisation Enthalpy Anomaly',
    subtitle: 'Why is Beryllium\'s IE higher than Boron\'s?',
    description: 'Beryllium (Z=4, IE=899 kJ/mol) has a HIGHER first IE than Boron (Z=5, IE=801 kJ/mol). Choose the correct reasoning:',
    type: 'multiple_choice',
    options: [
      { label: "Be has a fully filled stable 2s² subshell, and B's 2p¹ electron is higher in energy and more shielded.", value: "corr", isCorrect: true, feedback: "Bingo! 2s electrons penetrate closer to nucleus than 2p electrons, making 2s2 of Be harder to remove than 2p1 of B." },
      { label: "Boron has fewer protons than Beryllium.", value: "w1", isCorrect: false, feedback: "False! Boron (Z=5) has MORE protons than Beryllium (Z=4)." },
      { label: "Beryllium is a non-metal while Boron is a gas.", value: "w2", isCorrect: false, feedback: "Both are solids; Be is a metal and B is a metalloid." },
      { label: "Boron has a half-filled 2p subshell.", value: "w3", isCorrect: false, feedback: "Boron is 2p1, which is NOT half-filled (2p3 is half-filled)." }
    ],
    hint: 'Compare the subshell being emptied: 2s2 for Be versus 2p1 for B!',
    explanation: 'Removing a 2p1 electron from Boron requires less energy than removing a 2s electron from Beryllium\'s stable 2s2 penetrating subshell.'
  },
  {
    id: 'chal_7',
    nodeId: NODE_PERIODIC_TRENDS_EGE,
    title: 'Challenge 7: The Great Halogen EGE Anomaly',
    subtitle: 'Fluorine vs Chlorine Electron Gain Enthalpy',
    description: 'Chlorine (EGE = -349 kJ/mol) releases MORE energy upon gaining an electron than Fluorine (EGE = -328 kJ/mol). Why?',
    type: 'multiple_choice',
    options: [
      { label: "Fluorine\'s 2p orbital is so small and compact that incoming electron suffers strong inter-electronic repulsion.", value: "corr", isCorrect: true, feedback: "Excellently answered! F's tiny 2p subshell crowds 7 electrons, creating strong e--e- repulsion that opposes electron entry." },
      { label: "Chlorine is more electronegative than Fluorine.", value: "w1", isCorrect: false, feedback: "False! Fluorine is the most electronegative element (4.0 vs 3.0)." },
      { label: "Fluorine is a solid while Chlorine is a liquid.", value: "w2", isCorrect: false, feedback: "Both are gases at STP." },
      { label: "Chlorine has fewer inner shells than Fluorine.", value: "w3", isCorrect: false, feedback: "Chlorine has n=3 (more shells) than Fluorine (n=2)." }
    ],
    hint: 'Think about electron crowding in a tiny 2p orbital versus a roomier 3p orbital!',
    explanation: 'Due to Fluorine\'s extremely small 2p size, electron-electron repulsions among existing 2p electrons reduce the net attraction for an incoming electron.'
  },
  {
    id: 'chal_8',
    nodeId: NODE_PERIODIC_TRENDS_EN,
    title: 'Challenge 8: Bond Polarity Tug-of-War',
    subtitle: 'Predicting Dipole Direction in H-F vs H-Cl',
    description: 'Fluorine has Pauling EN = 4.0, Chlorine = 3.0, Hydrogen = 2.1. Compare the H-F and H-Cl bonds:',
    type: 'tug_of_war',
    options: [
      { label: "H-F is MORE polar than H-Cl, with larger partial negative charge (δ-) on Fluorine.", value: "corr", isCorrect: true, feedback: "Correct! Electronegativity difference ΔEN(H-F) = 1.9 vs ΔEN(H-Cl) = 0.9, making H-F much more polar!" },
      { label: "H-Cl is more polar because Chlorine has a higher electron gain enthalpy.", value: "w1", isCorrect: false, feedback: "Electronegativity (not EGE) determines bond dipole and polarity!" },
      { label: "Both bonds are non-polar because electrons are shared equally.", value: "w2", isCorrect: false, feedback: "Electronegativity differences mean unequal electron sharing!" },
      { label: "H-F is completely ionic with no covalent character.", value: "w3", isCorrect: false, feedback: "H-F is a polar covalent molecule with significant partial charges." }
    ],
    hint: 'Calculate ΔEN = EN(non-metal) - EN(Hydrogen)!',
    explanation: 'ΔEN for H-F is 4.0 - 2.1 = 1.9 (highly polar covalent), whereas ΔEN for H-Cl is 3.0 - 2.1 = 0.9.'
  },
  {
    id: 'chal_9',
    nodeId: NODE_PERIODIC_TRENDS_CHEMICAL,
    title: 'Challenge 9: Oxide Character Across Period 3',
    subtitle: 'Classify oxides of Na, Al, and S',
    description: 'Match the Period 3 oxides to their chemical behavior in aqueous/acidic/basic media:',
    type: 'oxide_match',
    options: [
      { label: "Na2O = Basic, Al2O3 = Amphoteric, SO3 = Acidic", value: "corr", isCorrect: true, feedback: "Spot on! Na2O reacts with acids/water to form bases; Al2O3 dissolves in BOTH acids & alkalis; SO3 forms H2SO4!" },
      { label: "Na2O = Acidic, Al2O3 = Basic, SO3 = Amphoteric", value: "w1", isCorrect: false, feedback: "Incorrect! Electropositive metals form basic oxides, non-metals form acidic oxides." },
      { label: "All three oxides are basic metals.", value: "w2", isCorrect: false, feedback: "Sulfur is a non-metal with an acidic oxide." },
      { label: "Na2O = Neutral, Al2O3 = Acidic, SO3 = Basic", value: "w3", isCorrect: false, feedback: "Completely reversed!" }
    ],
    hint: 'Left side metals = basic, Middle = amphoteric, Right side non-metals = acidic!',
    explanation: 'Na2O + H2O -> 2NaOH (Basic); Al2O3 reacts with both HCl and NaOH (Amphoteric); SO3 + H2O -> H2SO4 (Acidic).'
  },
  {
    id: 'chal_10',
    nodeId: NODE_LONG_FORM_PERIODIC_TABLE,
    title: 'Challenge 10: IUPAC Nomenclature for Z = 118',
    subtitle: 'Construct temporary name for Oganesson (Z = 118)',
    description: 'Using IUPAC numerical roots (1=un, 8=oct), what is the systematic temporary name for Element 118?',
    type: 'multiple_choice',
    options: [
      { label: "Ununoctium (Uuo)", value: "corr", isCorrect: true, feedback: "Correct! 1=un, 1=un, 8=oct + ium = Ununoctium!" },
      { label: "Unnilseptium (Uns)", value: "w1", isCorrect: false, feedback: "Unnilseptium stands for Z = 107." },
      { label: "Bistrioctium (Bto)", value: "w2", isCorrect: false, feedback: "Invalid IUPAC roots for 118." },
      { label: "Ununhexium (Uuh)", value: "w3", isCorrect: false, feedback: "Ununhexium stands for Z = 116." }
    ],
    hint: 'Combine roots for 1 (un), 1 (un), and 8 (oct) with suffix -ium!',
    explanation: 'Element 118 systematically uses digits 1 (un) + 1 (un) + 8 (oct) + ium = Ununoctium.'
  }
];

// ==========================================
// CUSTOM INTERACTIVE VISUAL COMPONENTS
// ==========================================

// 1. Interactive Orbital Filling Canvas
interface OrbitalFillerProps {
  targetZ: number;
  onComplete: (isCorrect: boolean) => void;
}

const InteractiveOrbitalFiller: React.FC<OrbitalFillerProps> = ({ targetZ, onComplete }) => {
  const [boxes, setBoxes] = useState<OrbitalBox[]>([
    { id: '1s', subshell: '1s', energyOrder: 1, electrons: [], maxCapacity: 2 },
    { id: '2s', subshell: '2s', energyOrder: 2, electrons: [], maxCapacity: 2 },
    { id: '2px', subshell: '2p_x', energyOrder: 3, electrons: [], maxCapacity: 2 },
    { id: '2py', subshell: '2p_y', energyOrder: 3, electrons: [], maxCapacity: 2 },
    { id: '2pz', subshell: '2p_z', energyOrder: 3, electrons: [], maxCapacity: 2 },
    { id: '3s', subshell: '3s', energyOrder: 4, electrons: [], maxCapacity: 2 },
  ]);

  const [selectedSpin, setSelectedSpin] = useState<'up' | 'down'>('up');
  const totalPlaced = useMemo(() => boxes.reduce((acc, b) => acc + b.electrons.length, 0), [boxes]);

  const handleBoxClick = (boxId: string) => {
    setBoxes(prev => prev.map(b => {
      if (b.id !== boxId) return b;
      if (b.electrons.length >= b.maxCapacity) {
        // Clear box on click when full
        audioManager.play('pop');
        return { ...b, electrons: [] };
      }
      audioManager.play('pickup');
      return { ...b, electrons: [...b.electrons, selectedSpin] };
    }));
  };

  const handleReset = () => {
    audioManager.play('whoosh');
    setBoxes(prev => prev.map(b => ({ ...b, electrons: [] })));
  };

  const verifyFilling = () => {
    // Check Aufbau, Pauli, Hund for targetZ
    if (totalPlaced !== targetZ) {
      audioManager.play('error');
      speechManager.speak(`You placed ${totalPlaced} electrons, but Z equals ${targetZ}.`);
      return;
    }

    // Example check for Nitrogen (Z=7): 1s(2), 2s(2), 2px(1), 2py(1), 2pz(1)
    if (targetZ === 7) {
      const b1s = boxes.find(b => b.id === '1s')?.electrons;
      const b2s = boxes.find(b => b.id === '2s')?.electrons;
      const b2px = boxes.find(b => b.id === '2px')?.electrons;
      const b2py = boxes.find(b => b.id === '2py')?.electrons;
      const b2pz = boxes.find(b => b.id === '2pz')?.electrons;

      const is1sOK = b1s?.length === 2 && b1s.includes('up') && b1s.includes('down');
      const is2sOK = b2s?.length === 2 && b2s.includes('up') && b2s.includes('down');
      const is2pHundOK = (b2px?.length === 1) && (b2py?.length === 1) && (b2pz?.length === 1);

      if (is1sOK && is2sOK && is2pHundOK) {
        audioManager.play('drop-correct');
        audioManager.play('sparkle');
        speechManager.speak("Perfect! You satisfied Aufbau, Pauli, and Hund's rules flawlessly!");
        onComplete(true);
      } else {
        audioManager.play('drop-wrong');
        speechManager.speak("Check Hund's rule or Pauli exclusion! Each 2p box needs 1 electron with parallel spin before pairing!");
        onComplete(false);
      }
    } else {
      // Default verify for other targetZ
      audioManager.play('success');
      onComplete(true);
    }
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl border border-indigo-500/30 shadow-xl max-w-2xl mx-auto my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-xl font-bold text-indigo-300">Interactive Orbital Filling Canvas</h4>
          <p className="text-xs text-slate-400">Target Atom Z = {targetZ} | Electrons placed: <span className="font-bold text-emerald-400">{totalPlaced} / {targetZ}</span></p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedSpin('up')}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition flex items-center gap-1 ${selectedSpin === 'up' ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300' : 'bg-slate-800 text-slate-300'}`}
          >
            Spin UP (↑)
          </button>
          <button
            onClick={() => setSelectedSpin('down')}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition flex items-center gap-1 ${selectedSpin === 'down' ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300' : 'bg-slate-800 text-slate-300'}`}
          >
            Spin DOWN (↓)
          </button>
        </div>
      </div>

      {/* Orbital diagram representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* 1s */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
          <span className="text-xs font-mono text-indigo-400 font-bold block mb-2">1s Orbital (n=1, l=0)</span>
          <div
            onClick={() => handleBoxClick('1s')}
            className="w-16 h-16 mx-auto bg-slate-900 border-2 border-indigo-500/50 rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:border-indigo-400 transition"
          >
            {boxes.find(b => b.id === '1s')?.electrons.map((e, idx) => (
              <span key={idx} className={`text-2xl font-bold ${e === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {e === 'up' ? '↑' : '↓'}
              </span>
            ))}
          </div>
        </div>

        {/* 2s */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
          <span className="text-xs font-mono text-indigo-400 font-bold block mb-2">2s Orbital (n=2, l=0)</span>
          <div
            onClick={() => handleBoxClick('2s')}
            className="w-16 h-16 mx-auto bg-slate-900 border-2 border-indigo-500/50 rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:border-indigo-400 transition"
          >
            {boxes.find(b => b.id === '2s')?.electrons.map((e, idx) => (
              <span key={idx} className={`text-2xl font-bold ${e === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {e === 'up' ? '↑' : '↓'}
              </span>
            ))}
          </div>
        </div>

        {/* 2p Degenerate Set */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center md:col-span-1">
          <span className="text-xs font-mono text-indigo-400 font-bold block mb-2">2p Degenerate Set (n=2, l=1)</span>
          <div className="flex justify-center gap-2">
            {['2px', '2py', '2pz'].map(id => (
              <div key={id} className="text-center">
                <span className="text-[10px] text-slate-400 mb-1 block">{id}</span>
                <div
                  onClick={() => handleBoxClick(id)}
                  className="w-12 h-14 bg-slate-900 border-2 border-purple-500/50 rounded-lg flex items-center justify-center gap-0.5 cursor-pointer hover:border-purple-400 transition"
                >
                  {boxes.find(b => b.id === id)?.electrons.map((e, idx) => (
                    <span key={idx} className={`text-xl font-bold ${e === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {e === 'up' ? '↑' : '↓'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
        >
          Reset Boxes
        </button>
        <button
          onClick={verifyFilling}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg transition transform active:scale-95"
        >
          Verify Electronic Configuration
        </button>
      </div>
    </div>
  );
};

// 2. Interactive Periodic Table Heatmap & Trend Explorer
interface PeriodicExplorerProps {
  selectedProperty: 'atomicRadius' | 'firstIE' | 'ege' | 'en';
  onElementClick?: (el: ElementInfo) => void;
}

const PeriodicTableExplorer: React.FC<PeriodicExplorerProps> = ({ selectedProperty, onElementClick }) => {
  const [activeEl, setActiveEl] = useState<ElementInfo>(PERIODIC_ELEMENTS[11]); // Sodium default

  const propertyLabel = useMemo(() => {
    switch (selectedProperty) {
      case 'atomicRadius': return 'Atomic Radius (pm)';
      case 'firstIE': return '1st Ionisation Enthalpy (kJ/mol)';
      case 'ege': return 'Electron Gain Enthalpy (kJ/mol)';
      case 'en': return 'Electronegativity (Pauling Scale)';
    }
  }, [selectedProperty]);

  const getColorRatio = (el: ElementInfo) => {
    const val = el[selectedProperty];
    if (selectedProperty === 'atomicRadius') return Math.min(1, Math.max(0.2, val / 230));
    if (selectedProperty === 'firstIE') return Math.min(1, Math.max(0.2, val / 2400));
    if (selectedProperty === 'ege') return Math.min(1, Math.max(0.1, Math.abs(val) / 360));
    if (selectedProperty === 'en') return Math.min(1, Math.max(0.1, val / 4.0));
    return 0.5;
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl my-4">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div>
          <h4 className="text-lg font-bold text-indigo-300">Periodic Trend Visualizer</h4>
          <p className="text-xs text-slate-400">Current Metric: <span className="text-emerald-400 font-bold">{propertyLabel}</span></p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] text-slate-400 self-center">Heatmap scale:</span>
          <div className="w-24 h-3 rounded bg-gradient-to-r from-slate-800 via-indigo-600 to-emerald-400"></div>
        </div>
      </div>

      {/* Grid representation of Periods 1 to 4 */}
      <div className="grid grid-cols-18 gap-1.5 overflow-x-auto pb-2">
        {Object.values(PERIODIC_ELEMENTS).map(el => {
          const ratio = getColorRatio(el);
          const isSelected = activeEl.z === el.z;
          return (
            <div
              key={el.z}
              onClick={() => {
                setActiveEl(el);
                audioManager.play('tap');
                if (onElementClick) onElementClick(el);
              }}
              style={{
                gridColumn: el.group,
                gridRow: el.period,
                backgroundColor: isSelected ? '#10b981' : `rgba(79, 70, 229, ${ratio})`
              }}
              className={`p-1.5 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition transform hover:scale-110 ${isSelected ? 'border-white ring-2 ring-emerald-300' : 'border-indigo-500/30'}`}
            >
              <span className="text-[9px] text-slate-300 font-mono">{el.z}</span>
              <span className="text-xs font-bold text-white">{el.symbol}</span>
              <span className="text-[8px] text-slate-200 font-semibold">{el[selectedProperty]}</span>
            </div>
          );
        })}
      </div>

      {/* Selected Element Detail Panel */}
      <div className="mt-4 p-4 bg-slate-800/90 rounded-xl border border-indigo-500/30 flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-400">{activeEl.symbol}</span>
            <div>
              <h5 className="text-sm font-bold text-white">{activeEl.name} (Z = {activeEl.z})</h5>
              <p className="text-xs text-slate-400">Block: <span className="uppercase text-indigo-300 font-bold">{activeEl.block}-block</span> | Group {activeEl.group}, Period {activeEl.period}</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2 font-mono">Full Config: <span className="text-amber-300">{activeEl.config}</span> ({activeEl.configShort})</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/80 p-2 rounded-lg text-center">
            <span className="text-[10px] text-slate-400 block">Atomic Radius</span>
            <span className="font-bold text-indigo-300">{activeEl.atomicRadius} pm</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-lg text-center">
            <span className="text-[10px] text-slate-400 block">1st Ionisation Enthalpy</span>
            <span className="font-bold text-emerald-300">{activeEl.firstIE} kJ/mol</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-lg text-center">
            <span className="text-[10px] text-slate-400 block">Electron Gain Enthalpy</span>
            <span className="font-bold text-amber-300">{activeEl.ege} kJ/mol</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-lg text-center">
            <span className="text-[10px] text-slate-400 block">Electronegativity</span>
            <span className="font-bold text-purple-300">{activeEl.en > 0 ? activeEl.en : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Atomic / Ionic Radius Comparator SVG Visualizer
const AtomicRadiusVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'neutral_vs_ion' | 'isoelectronic'>('neutral_vs_ion');

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-lg font-bold text-indigo-300">Atomic & Ionic Radius Visualizer</h4>
          <p className="text-xs text-slate-400">Compare physical electron cloud expansion and contraction</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setMode('neutral_vs_ion'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mode === 'neutral_vs_ion' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Atom vs Cation / Anion
          </button>
          <button
            onClick={() => { setMode('isoelectronic'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${mode === 'isoelectronic' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Isoelectronic Series
          </button>
        </div>
      </div>

      {mode === 'neutral_vs_ion' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Cation contraction */}
          <div className="bg-slate-800/80 p-4 rounded-xl text-center border border-slate-700">
            <h5 className="text-sm font-bold text-emerald-400 mb-2">Cation Contraction: Na vs Na⁺</h5>
            <svg className="w-full h-40 mx-auto" viewBox="0 0 300 150">
              {/* Neutral Na */}
              <g transform="translate(75, 75)">
                <circle r="60" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
                <circle r="12" fill="#3b82f6" />
                <text y="4" textAnchor="middle" fill="white" className="text-[10px] font-bold">Na</text>
                <text y="78" textAnchor="middle" fill="#a5b4fc" className="text-[10px]">r = 186 pm</text>
              </g>

              {/* Arrow */}
              <path d="M 135 75 L 165 75" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

              {/* Cation Na+ */}
              <g transform="translate(225, 75)">
                <circle r="32" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
                <circle r="12" fill="#10b981" />
                <text y="4" textAnchor="middle" fill="white" className="text-[10px] font-bold">Na⁺</text>
                <text y="50" textAnchor="middle" fill="#6ee7b7" className="text-[10px]">r = 102 pm (-45%)</text>
              </g>
            </svg>
            <p className="text-[11px] text-slate-300 mt-2">
              Losing 3s¹ valence electron empties the n=3 shell completely! The remaining 10 e⁻ feel a higher $Z_{eff}$ from 11 protons.
            </p>
          </div>

          {/* Anion expansion */}
          <div className="bg-slate-800/80 p-4 rounded-xl text-center border border-slate-700">
            <h5 className="text-sm font-bold text-amber-400 mb-2">Anion Expansion: Cl vs Cl⁻</h5>
            <svg className="w-full h-40 mx-auto" viewBox="0 0 300 150">
              {/* Neutral Cl */}
              <g transform="translate(75, 75)">
                <circle r="38" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
                <circle r="12" fill="#f59e0b" />
                <text y="4" textAnchor="middle" fill="white" className="text-[10px] font-bold">Cl</text>
                <text y="54" textAnchor="middle" fill="#fde68a" className="text-[10px]">r = 99 pm</text>
              </g>

              {/* Arrow */}
              <path d="M 135 75 L 165 75" stroke="#f59e0b" strokeWidth="3" />

              {/* Anion Cl- */}
              <g transform="translate(225, 75)">
                <circle r="62" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                <circle r="12" fill="#ef4444" />
                <text y="4" textAnchor="middle" fill="white" className="text-[10px] font-bold">Cl⁻</text>
                <text y="78" textAnchor="middle" fill="#fca5a5" className="text-[10px]">r = 181 pm (+82%)</text>
              </g>
            </svg>
            <p className="text-[11px] text-slate-300 mt-2">
              Adding 1 e⁻ increases electron-electron repulsion in the same valence shell while nuclear charge Z remains 17.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/80 p-4 rounded-xl text-center border border-slate-700">
          <h5 className="text-sm font-bold text-indigo-300 mb-3">{'10-Electron Isoelectronic Series ($N^{3-}$ to $Al^{3+}$)'}</h5>
          <div className="flex flex-wrap justify-center items-end gap-4 py-4">
            {[
              { name: 'N³⁻', z: 7, r: 146, color: '#ef4444' },
              { name: 'O²⁻', z: 8, r: 140, color: '#f97316' },
              { name: 'F⁻', z: 9, r: 133, color: '#f59e0b' },
              { name: 'Ne', z: 10, r: 112, color: '#84cc16' },
              { name: 'Na⁺', z: 11, r: 102, color: '#06b6d4' },
              { name: 'Mg²⁺', z: 12, r: 72, color: '#3b82f6' },
              { name: 'Al³⁺', z: 13, r: 53, color: '#8b5cf6' }
            ].map((item, idx) => {
              const pixelRadius = Math.round(item.r * 0.45);
              return (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-mono mb-1">Z = {item.z}</span>
                  <div
                    style={{ width: `${pixelRadius * 2}px`, height: `${pixelRadius * 2}px`, backgroundColor: `${item.color}33`, borderColor: item.color }}
                    className="rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  >
                    <span className="text-xs font-bold text-white">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 mt-2">{item.r} pm</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-emerald-400 font-semibold mt-2">
            Higher Nuclear Charge Z $\rightarrow$ Stronger inward proton pull on identical 10 electrons $\rightarrow$ Radius Decreases!
          </p>
        </div>
      )}
    </div>
  );
};

// 4. Oxide Acidity & Reactivity Visualizer
const OxideAcidityScale: React.FC = () => {
  const [activeOxide, setActiveOxide] = useState<'Na2O' | 'Al2O3' | 'SO3'>('Na2O');

  const oxideData = {
    Na2O: {
      type: 'Basic Oxide',
      color: 'from-blue-600 to-indigo-600',
      reactionWithWater: 'Na₂O + H₂O → 2 NaOH (Strong Alkaline Solution, pH ~ 13)',
      reactionWithAcid: 'Na₂O + 2 HCl → 2 NaCl + H₂O',
      desc: 'Formed by strongly electropositive alkali metal (Group 1). Ionises completely to give OH⁻ ions.'
    },
    Al2O3: {
      type: 'Amphoteric Oxide',
      color: 'from-purple-600 to-pink-600',
      reactionWithWater: 'Insoluble in water alone.',
      reactionWithAcid: 'Al₂O₃ + 6 HCl → 2 AlCl₃ + 3 H₂O (Acts as Base)',
      reactionWithBase: 'Al₂O₃ + 2 NaOH + 3 H₂O → 2 Na[Al(OH)₄] (Acts as Acid)',
      desc: 'Found in Indian bauxite (Odisha/Jharkhand). Reacts readily with BOTH acids and alkalis!'
    },
    SO3: {
      type: 'Acidic Oxide',
      color: 'from-amber-600 to-red-600',
      reactionWithWater: 'SO₃ + H₂O → H₂SO₄ (Strong Sulfuric Acid, pH ~ 1)',
      reactionWithBase: 'SO₃ + 2 NaOH → Na₂SO₄ + H₂O',
      desc: 'Formed by non-metallic sulfur (Group 16). Reacts exothermically with water to give oxyacids.'
    }
  };

  const curr = oxideData[activeOxide];

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 my-4">
      <h4 className="text-lg font-bold text-indigo-300 mb-1">Period 3 Oxide Character Scale</h4>
      <p className="text-xs text-slate-400 mb-4">Electropositive Metals (Basic) $\rightarrow$ Metalloids (Amphoteric) $\rightarrow$ Non-Metals (Acidic)</p>

      {/* Selector Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {(['Na2O', 'Al2O3', 'SO3'] as const).map(ox => (
          <button
            key={ox}
            onClick={() => { setActiveOxide(ox); audioManager.play('tap'); }}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition border ${activeOxide === ox ? 'bg-indigo-600 border-white text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
          >
            {ox}
          </button>
        ))}
      </div>

      {/* Display Card */}
      <div className={`p-5 rounded-xl bg-gradient-to-r ${curr.color} text-white shadow-xl`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-extrabold">{activeOxide}</span>
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">{curr.type}</span>
        </div>
        <p className="text-xs opacity-90 mb-3">{curr.desc}</p>

        <div className="space-y-2 text-xs font-mono bg-black/30 p-3 rounded-lg border border-white/20">
          <div><span className="text-emerald-300 font-bold">Water Reaction:</span> {curr.reactionWithWater}</div>
          <div><span className="text-cyan-300 font-bold">Acid Reaction:</span> {curr.reactionWithAcid}</div>
          {curr.reactionWithBase && <div><span className="text-pink-300 font-bold">Base Reaction:</span> {curr.reactionWithBase}</div>}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function C11_ChemistryAufbauPauliandHundsrulesSim() {
  // Navigation & Screen State
  const [activeTab, setActiveTab] = useState<'discovery' | 'slides' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);

  // Score & Mastery Tracking
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean>>({});
  const [bktStates, setBktStates] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Interactive Lab State
  const [selectedProp, setSelectedProp] = useState<'atomicRadius' | 'firstIE' | 'ege' | 'en'>('atomicRadius');

  // Feedback & Audio Visuals
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');

  // Auto Hint Inactivity Timer (10 seconds)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        setCurrentHint(LAB_CHALLENGES[challengeIdx].hint);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak("Need a hint? Check the guidance box on screen!");
      }
    }, 10000);
  }, [activeTab, challengeIdx]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  // Handle Challenge Answer
  const handleChallengeSubmit = (isCorrect: boolean, feedbackText: string, targetNodeId: string) => {
    audioManager.play(isCorrect ? 'success' : 'drop-wrong');
    speechManager.speak(feedbackText);

    if (isCorrect) {
      setShowConfetti(true);
      setShowSuccess(true);
      setShowSparkle(true);
      setScore(prev => prev + 100);
      setTimeout(() => { setShowConfetti(false); setShowSuccess(false); setShowSparkle(false); }, 2500);
    }

    // Update BKT & SRS
    setBktStates(prev => {
      const currentBkt = prev[targetNodeId] || createBKTState();
      const updated = bktUpdate(currentBkt, isCorrect);
      return { ...prev, [targetNodeId]: updated };
    });

    const reviewItem = createReviewItem(targetNodeId, 'Chemistry');
    sm2Update(reviewItem, isCorrect ? 5 : 1, 0);

    setUserAnswers(prev => ({ ...prev, [LAB_CHALLENGES[challengeIdx].id]: isCorrect }));
  };

  const nextChallenge = () => {
    if (challengeIdx < LAB_CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
      audioManager.play('swoop');
    } else {
      // Complete game
      audioManager.play('celebration');
      speechManager.speak("Congratulations! You have mastered Atomic Structure and Periodic Trends!");
      ALL_NODE_IDS.forEach(id => {
        const mastery = getMasteryLevel(bktStates[id] || createBKTState());
        recordGameScore(ALL_NODE_IDS, score);
      });
      setActiveTab('summary');
    }
  };

  const currChallenge = LAB_CHALLENGES[challengeIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-12">
      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-indigo-500/20 px-4 py-3 flex flex-wrap justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-extrabold text-white text-xl shadow-lg">
            ⚛️
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight">ISC Class 11 Chemistry Simulator</h1>
            <p className="text-xs text-indigo-400 font-mono">Aufbau, Pauli, Hund & Periodic Trends</p>
          </div>
        </div>

        {/* Tab Selection */}
        <nav className="flex gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'discovery' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            1. Predict
          </button>
          <button
            onClick={() => { setActiveTab('slides'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'slides' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            2. Learn
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'lab' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            3. Interactive Lab
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'challenges' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            4. Challenges ({challengeIdx + 1}/{LAB_CHALLENGES.length})
          </button>
        </nav>

        {/* Score & Mastery Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-mono">LAB SCORE</span>
            <span className="text-sm font-extrabold text-emerald-400 font-mono">{score} PTS</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        <AnimatePresence mode="wait">
          {/* TAB 1: DISCOVERY QUESTION */}
          {activeTab === 'discovery' && (
            <motion.div
              key="tab_discovery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto"
            >
              <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Discovery Challenge • Predict Before Learning
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-4">
                {DISCOVERY_QUESTION.question}
              </h2>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play(opt.isCorrect ? 'drop-correct' : 'drop-wrong');
                      speechManager.speak(opt.feedback);
                      if (opt.isCorrect) setScore(s => s + 50);
                      setTimeout(() => setActiveTab('slides'), 2000);
                    }}
                    className="w-full text-left p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-indigo-500 transition font-medium text-sm text-slate-200 flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition">Select →</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: TEACHING SLIDES */}
          {activeTab === 'slides' && (
            <motion.div
              key="tab_slides"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                    ISC Module Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    {TEACHING_SLIDES[slideIdx].title}
                  </h2>
                </div>
                <span className="px-3 py-1 bg-slate-800 text-emerald-400 rounded-full text-xs font-mono font-bold border border-emerald-500/30">
                  {TEACHING_SLIDES[slideIdx].badge}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-indigo-300 mb-4">
                {TEACHING_SLIDES[slideIdx].subtitle}
              </h3>

              <div className="prose prose-invert max-w-none text-slate-300 text-sm whitespace-pre-line leading-relaxed mb-8 bg-slate-950/60 p-6 rounded-2xl border border-slate-800 font-sans">
                {TEACHING_SLIDES[slideIdx].content}
              </div>

              {/* Slide Navigation controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  disabled={slideIdx === 0}
                  onClick={() => { setSlideIdx(prev => prev - 1); audioManager.play('swoop'); }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40 transition"
                >
                  ← Previous Slide
                </button>

                <div className="flex gap-1.5">
                  {TEACHING_SLIDES.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${i === slideIdx ? 'bg-indigo-500' : 'bg-slate-800'}`}
                    />
                  ))}
                </div>

                {slideIdx < TEACHING_SLIDES.length - 1 ? (
                  <button
                    onClick={() => { setSlideIdx(prev => prev + 1); audioManager.play('swoop'); }}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg"
                  >
                    Next Slide →
                  </button>
                ) : (
                  <button
                    onClick={() => { setActiveTab('lab'); audioManager.play('celebration'); }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-extrabold transition shadow-lg"
                  >
                    Enter Interactive Lab 🧪
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: INTERACTIVE SIMULATOR LAB */}
          {activeTab === 'lab' && (
            <motion.div
              key="tab_lab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">ISC Chemistry Sandbox Laboratory</h2>
                    <p className="text-xs text-slate-400">Manipulate atomic parameters, fill subshell boxes, and explore trends across periods and groups.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelectedProp('atomicRadius'); audioManager.play('tap'); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedProp === 'atomicRadius' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Radius
                    </button>
                    <button
                      onClick={() => { setSelectedProp('firstIE'); audioManager.play('tap'); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedProp === 'firstIE' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      IE₁
                    </button>
                    <button
                      onClick={() => { setSelectedProp('ege'); audioManager.play('tap'); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedProp === 'ege' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      EGE
                    </button>
                    <button
                      onClick={() => { setSelectedProp('en'); audioManager.play('tap'); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedProp === 'en' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* Periodic Table Heatmap Explorer */}
                <PeriodicTableExplorer selectedProperty={selectedProp} />
              </div>

              {/* Subshell Interactive Filler */}
              <InteractiveOrbitalFiller targetZ={7} onComplete={() => {}} />

              {/* Radius Comparator */}
              <AtomicRadiusVisualizer />

              {/* Oxide Scale */}
              <OxideAcidityScale />

              <div className="text-center pt-4">
                <button
                  onClick={() => { setActiveTab('challenges'); audioManager.play('swoop'); }}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:to-pink-500 text-white font-extrabold rounded-2xl shadow-2xl transition transform active:scale-95 text-sm"
                >
                  Start Mastery Challenges (10 Experiments) →
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 4: MASTERY CHALLENGES */}
          {activeTab === 'challenges' && (
            <motion.div
              key="tab_challenges"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                    Challenge {challengeIdx + 1} of {LAB_CHALLENGES.length} • Node: {currChallenge.nodeId}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    {currChallenge.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Progress:</span>
                  <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${((challengeIdx + 1) / LAB_CHALLENGES.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {currChallenge.description}
              </p>

              {/* Challenge Dynamic Mechanics */}
              {currChallenge.type === 'orbital_fill' && (
                <InteractiveOrbitalFiller
                  targetZ={currChallenge.targetZ || 7}
                  onComplete={(isOK) => handleChallengeSubmit(isOK, isOK ? 'Success! Orbital rules obeyed!' : 'Try again strictly applying Hund and Pauli principles.', currChallenge.nodeId)}
                />
              )}

              {currChallenge.type === 'multiple_choice' && currChallenge.options && (
                <div className="space-y-3 mb-6">
                  {currChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChallengeSubmit(opt.isCorrect, opt.feedback, currChallenge.nodeId)}
                      className="w-full text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-indigo-500 transition text-xs font-semibold text-slate-200 flex items-center justify-between"
                    >
                      <span>{opt.label}</span>
                      <span className="text-indigo-400 font-mono text-[10px]">Select</span>
                    </button>
                  ))}
                </div>
              )}

              {currChallenge.type === 'radii_sort' && (
                <div className="mb-6 space-y-3">
                  <p className="text-xs text-amber-300 font-mono">Verify correct radius ordering:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currChallenge.sortItems?.map((item) => (
                      <div key={item.id} className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex justify-between items-center text-xs">
                        <span className="font-bold text-emerald-400">{item.label}</span>
                        <span className="text-slate-400 text-[10px]">{item.explanation}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleChallengeSubmit(true, "Perfect Isoelectronic ordering! High Z pulls electrons inwards tightly!", currChallenge.nodeId)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition mt-2"
                  >
                    Confirm Isoelectronic Radius Sequence →
                  </button>
                </div>
              )}

              {currChallenge.type === 'tug_of_war' && currChallenge.options && (
                <div className="space-y-3 mb-6">
                  {currChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChallengeSubmit(opt.isCorrect, opt.feedback, currChallenge.nodeId)}
                      className="w-full text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-indigo-500 transition text-xs font-semibold text-slate-200"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {currChallenge.type === 'oxide_match' && currChallenge.options && (
                <div className="space-y-3 mb-6">
                  {currChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChallengeSubmit(opt.isCorrect, opt.feedback, currChallenge.nodeId)}
                      className="w-full text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-indigo-500 transition text-xs font-semibold text-slate-200"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  disabled={challengeIdx === 0}
                  onClick={() => { setChallengeIdx(prev => prev - 1); audioManager.play('swoop'); }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40 transition"
                >
                  ← Previous
                </button>

                <button
                  onClick={nextChallenge}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold transition shadow-lg hover:from-emerald-400 hover:to-teal-500"
                >
                  Next Experiment →
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SUMMARY & MASTERY DASHBOARD */}
          {activeTab === 'summary' && (
            <motion.div
              key="tab_summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl">
                🏆
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Simulation Complete!</h2>
              <p className="text-sm text-slate-300 mb-6">
                You have demonstrated mastery across all 10 core ISC Class 11 Chemistry Periodic Concept Nodes.
              </p>

              {/* Score Display */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 mb-6 inline-block w-full max-w-sm">
                <span className="text-xs text-slate-400 block font-mono">TOTAL MASTERY SCORE</span>
                <span className="text-4xl font-extrabold text-emerald-400 font-mono">{score} PTS</span>
              </div>

              {/* Node Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-left mb-8">
                {ALL_NODE_IDS.map(nodeId => {
                  const bkt = bktStates[nodeId] || createBKTState();
                  const level = getMasteryLevel(bkt);
                  return (
                    <div key={nodeId} className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="text-[9px] font-mono text-indigo-400 block">{nodeId}</span>
                      <span className="text-xs font-bold text-white capitalize">{level}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => { setActiveTab('discovery'); setChallengeIdx(0); setScore(0); audioManager.play('swoop'); }}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl shadow-lg transition text-xs"
              >
                Restart Simulation 🔄
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
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