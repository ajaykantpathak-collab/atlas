"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface MisconceptionChecklistItem {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// NODE IDENTIFIERS (STRICT STRING LITERALS)
// ==========================================
const NODE_C9_CHEM_011 = 'c9_chem_011'; // Energy changes in chemical reactions
const NODE_C9_CHEM_012 = 'c9_chem_012'; // Exothermic and endothermic reactions
const NODE_C9_CHEM_013 = 'c9_chem_013'; // Water as a universal solvent
const NODE_C9_CHEM_014 = 'c9_chem_014'; // Solutions, colloids and suspensions
const NODE_C9_CHEM_015 = 'c9_chem_015'; // Saturated, unsaturated and supersaturated solutions
const NODE_C9_CHEM_016 = 'c9_chem_016'; // Solubility curves
const NODE_C9_CHEM_017 = 'c9_chem_017'; // Water of crystallisation
const NODE_C9_CHEM_018 = 'c9_chem_018'; // Hydrated and anhydrous substances
const NODE_C9_CHEM_019 = 'c9_chem_019'; // Efflorescence, deliquescence and hygroscopy
const NODE_C9_CHEM_020 = 'c9_chem_020'; // Drying and dehydrating agents

const ALL_NODE_IDS = [
  NODE_C9_CHEM_011,
  NODE_C9_CHEM_012,
  NODE_C9_CHEM_013,
  NODE_C9_CHEM_014,
  NODE_C9_CHEM_015,
  NODE_C9_CHEM_016,
  NODE_C9_CHEM_017,
  NODE_C9_CHEM_018,
  NODE_C9_CHEM_019,
  NODE_C9_CHEM_020,
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// DATA STRUCTURES & INTERFACES
// ==========================================
interface TeachingSlide {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  concept: string;
  description: string;
  keyTakeaway: string;
  visualType: 'energy' | 'water_dipole' | 'mixture_tyndall' | 'saturation' | 'solubility_curve' | 'hydrate_heating' | 'air_exposure' | 'drying_dehydrating';
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconceptionId?: string;
  hint: string;
}

interface Misconception {
  id: string;
  statement: string;
  correction: string;
}

// ==========================================
// SCENARIO & CURRICULUM CONTENT
// ==========================================
const SCENARIO = {
  title: "Master Chemistry Laboratory: Energy, Solutions & Hydrate Systems",
  subtitle: "Class 9 ICSE Virtual Investigation Lab",
  description: "Step into the advanced ICSE chemistry lab. Investigate reaction enthalpies, solution dynamics, solubility curves, crystal hydrates, and drying agents through visual simulations.",
};

const DISCOVERY_QUESTION = {
  question: "If you add 80g of Potassium Nitrate (KNO₃) to 100g of water at 50°C and then cool it to 20°C undisturbed, what happens to the extra salt before and after dropping a seed crystal?",
  options: [
    "It immediately boils and evaporates water.",
    "It forms a temporary unstable supersaturated solution, then rapidly crystallizes when seeded.",
    "The excess salt disappears into hydrogen gas.",
    "The solution turns permanent blue without forming any solid crystals."
  ],
  correctIndex: 1,
  explanation: "Correct! Potassium nitrate solubility drops sharply from ~85g/100g water at 50°C to ~31.6g at 20°C. Careful cooling produces an unstable supersaturated solution, which rapidly crystallizes upon seeding!"
};

const MISCONCEPTIONS: Record<string, Misconception> = {
  exo_hot: {
    id: 'exo_hot',
    statement: "Thinking exothermic means simply 'hot' and endothermic means 'cold'.",
    correction: "Exothermic reactions release energy to surroundings (warming them, ΔH < 0). Endothermic reactions absorb energy from surroundings (cooling them, ΔH > 0)."
  },
  water_dissolves_all: {
    id: 'water_dissolves_all',
    statement: "Believing water dissolves every substance because it is called a 'universal solvent'.",
    correction: "Water dissolves polar covalent and ionic compounds due to its electric dipole, but cannot dissolve non-polar substances like oil, wax, or petrol."
  },
  tyndall_colloid_only: {
    id: 'tyndall_colloid_only',
    statement: "Assuming only colloids show the Tyndall effect.",
    correction: "Suspensions also scatter light (Tyndall effect) because their particles (>1000nm) are large enough, but suspensions settle on standing while colloids do not."
  },
  saturation_no_temp: {
    id: 'saturation_no_temp',
    statement: "Defining a saturated solution without specifying the temperature.",
    correction: "Solubility depends strongly on temperature. A solution saturated at 20°C becomes unsaturated when heated to 60°C."
  },
  heating_always_increases: {
    id: 'heating_always_increases',
    statement: "Assuming heating always increases the solubility of all salts.",
    correction: "While KNO₃ solubility rises steeply with heat, NaCl solubility is nearly constant, and CaSO₄ solubility actually decreases slightly with temperature."
  },
  hydrate_is_wet: {
    id: 'hydrate_is_wet',
    statement: "Thinking water of crystallisation is ordinary surface moisture that makes a salt feel wet.",
    correction: "Water of crystallisation is chemically bound inside the crystal lattice in fixed proportions (e.g., CuSO₄·5H₂O). The crystals feel dry to touch."
  },
  hygroscopic_vs_deliquescent: {
    id: 'hygroscopic_vs_deliquescent',
    statement: "Confusing hygroscopic and deliquescent behaviour.",
    correction: "Hygroscopic substances absorb moisture without dissolving (e.g., CaO, silica gel). Deliquescent substances absorb so much water vapour that they dissolve in it to form a liquid pool (e.g., FeCl₃)."
  },
  drying_vs_dehydrating: {
    id: 'drying_vs_dehydrating',
    statement: "Treating drying agents and dehydrating agents as identical.",
    correction: "Drying agents physically remove free surface water (unreacted solute stays chemically intact). Dehydrating agents chemically strip bound water of crystallisation or elements of water (H and O) from compounds."
  }
};

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_1',
    nodeId: NODE_C9_CHEM_011,
    title: "1. Energy Changes in Chemical Reactions",
    subtitle: "Bond Breaking vs Bond Making",
    concept: "Chemical reactions transform substances while conserving total energy. Breaking bonds requires energy input (endothermic step), while forming new bonds releases energy (exothermic step).",
    description: "Every chemical transformation is a dynamic trade of energy with its surroundings. Heat, light, or electrical energy is exchanged depending on whether bond formation releases more energy than bond breaking absorbs.",
    keyTakeaway: "Overall Energy Change = (Energy to break reactant bonds) - (Energy released forming product bonds).",
    visualType: 'energy'
  },
  {
    id: 'slide_2',
    nodeId: NODE_C9_CHEM_012,
    title: "2. Exothermic vs Endothermic Reactions",
    subtitle: "Enthalpy Change ΔH Sign Convention",
    concept: "Exothermic (ΔH < 0): Products lower in energy than reactants; heat given out to surroundings (e.g., CH₄ + 2O₂ → CO₂ + 2H₂O + heat). Endothermic (ΔH > 0): Products higher in energy; heat absorbed (e.g., CaCO₃ + heat → CaO + CO₂).",
    description: "In exothermic reactions, surroundings get hotter (e.g., respiration, combustion, Mg burning). In endothermic reactions, surroundings cool down (e.g., NH₄Cl dissolving, photosynthesis).",
    keyTakeaway: "Heat on product side = Exothermic (ΔH negative). Heat on reactant side = Endothermic (ΔH positive).",
    visualType: 'energy'
  },
  {
    id: 'slide_3',
    nodeId: NODE_C9_CHEM_013,
    title: "3. Water: The Universal Solvent",
    subtitle: "Bent Polar Dipole & Ion Hydration",
    concept: "Oxygen's high electronegativity creates partial negative (δ-) oxygen and partial positive (δ+) hydrogen poles in a bent H₂O molecule (104.5° angle).",
    description: "When NaCl enters water, δ- oxygen attracts Na⁺ and δ+ hydrogen attracts Cl⁻, tearing ions from the lattice in a process called hydration ('Like dissolves like'). Non-polar oils lack charges and cannot dissolve.",
    keyTakeaway: "Water dissolves polar covalent & ionic compounds via dipole hydration, but excludes non-polar lipids.",
    visualType: 'water_dipole'
  },
  {
    id: 'slide_4',
    nodeId: NODE_C9_CHEM_014,
    title: "4. Solutions, Colloids & Suspensions",
    subtitle: "Particle Size & The Tyndall Effect",
    concept: "Mixtures are classified by particle diameter: Solutions (<1 nm), Colloids (1-1000 nm), and Suspensions (>1000 nm).",
    description: "True solutions are clear and do not scatter light or settle. Colloids (milk, starch) appear uniform but scatter torch light (Tyndall Effect) without settling. Suspensions (muddy water) are cloudy, scatter light, and settle on standing.",
    keyTakeaway: "Tyndall Effect proves particle size > 1nm. Settling on standing distinguishes suspensions from colloids.",
    visualType: 'mixture_tyndall'
  },
  {
    id: 'slide_5',
    nodeId: NODE_C9_CHEM_015,
    title: "5. Saturation States & Dynamic Equilibrium",
    subtitle: "Unsaturated, Saturated & Supersaturated",
    concept: "Solubility is the maximum grams of solute dissolving in 100g solvent at a specific temperature.",
    description: "Unsaturated: Can dissolve more solute. Saturated: Holds max solute at given temperature (dissolving rate = crystallization rate). Supersaturated: Unstable state holding MORE than max solute, created by hot saturation followed by careful undisturbed cooling.",
    keyTakeaway: "Supersaturated solutions are unstable and rapidly crystallize when seeded with a single crystal.",
    visualType: 'saturation'
  },
  {
    id: 'slide_6',
    nodeId: NODE_C9_CHEM_016,
    title: "6. Interpreting Solubility Curves",
    subtitle: "Quantitative Temperature Dependence",
    concept: "Solubility curves plot Solubility (g solute / 100g H₂O) on y-axis against Temperature (°C) on x-axis.",
    description: "Different salts show unique curves: KNO₃ rises steeply (highly temperature dependent), NaCl is almost horizontal (unaffected by heat), while CaSO₄ slopes gently downwards (less soluble when hot). Points on curve = saturated; below = unsaturated; above = supersaturated.",
    keyTakeaway: "Cooling a hot saturated solution from T₁ to T₂ forces (Solubility@T₁ - Solubility@T₂) grams of salt to crystallize out per 100g H₂O.",
    visualType: 'solubility_curve'
  },
  {
    id: 'slide_7',
    nodeId: NODE_C9_CHEM_017,
    title: "7. Water of Crystallisation",
    subtitle: "Fixed Lattice Water Molecules",
    concept: "Water of crystallisation is the definite, fixed number of H₂O molecules chemically bound into the crystalline lattice of salts during crystallization.",
    description: "Represented by a dot in formulas: CuSO₄·5H₂O (Pentahydrate), FeSO₄·7H₂O (Heptahydrate), Na₂CO₃·10H₂O (Decahydrate - Washing Soda), Na₂SO₄·10H₂O (Glauber's Salt). The dot represents chemical stoichiometry, not a mechanical mixture.",
    keyTakeaway: "Lattice water defines crystal geometry and color (e.g., blue CuSO₄·5H₂O vs white anhydrous CuSO₄).",
    visualType: 'hydrate_heating'
  },
  {
    id: 'slide_8',
    nodeId: NODE_C9_CHEM_018,
    title: "8. Hydrated vs Anhydrous Substances",
    subtitle: "Thermal Dehydration & Reversible Color Change",
    concept: "Hydrated salts contain bound water of crystallisation. Anhydrous salts contain zero lattice water molecules.",
    description: "Heating blue vitriol (CuSO₄·5H₂O) drives out 5H₂O as steam, leaving white anhydrous CuSO₄ powder. Adding drops of water turns white anhydrous CuSO₄ back to bright blue (rehydration test for water). Anhydrous salts like KCl, NaNO₃, and PbCl₂ never form hydrates.",
    keyTakeaway: "Hydrated salts feel completely dry because water is trapped inside the crystal cage structure.",
    visualType: 'hydrate_heating'
  },
  {
    id: 'slide_9',
    nodeId: NODE_C9_CHEM_019,
    title: "9. Atmospheric Water Interactions",
    subtitle: "Efflorescence, Deliquescence & Hygroscopy",
    concept: "Three distinct pathways when solids interact with moisture in ambient air.",
    description: "1. Efflorescence: Hydrated salt loses water of crystallisation to air, crumbling to powder (e.g., Na₂CO₃·10H₂O → Na₂CO₃·H₂O + 9H₂O). 2. Deliquescence: Anhydrous solid absorbs so much water vapour that it dissolves in it to form a liquid solution pool (e.g., FeCl₃, NaOH, CaCl₂). 3. Hygroscopy: Substance absorbs atmospheric moisture but DOES NOT dissolve (e.g., CaO quicklime, conc H₂SO₄, silica gel).",
    keyTakeaway: "Efflorescence = loses water. Deliquescence = absorbs water + dissolves into liquid. Hygroscopy = absorbs water without dissolving.",
    visualType: 'air_exposure'
  },
  {
    id: 'slide_10',
    nodeId: NODE_C9_CHEM_020,
    title: "10. Drying Agents vs Dehydrating Agents",
    subtitle: "Physical Moisture Removal vs Chemical Water Extraction",
    concept: "Drying agents remove free, uncombined surface moisture physically without altering the chemical identity of the substance.",
    description: "Quicklime (CaO) is a basic drying agent used for basic gases like NH₃ (since conc H₂SO₄ would react to form (NH₄)₂SO₄). Dehydrating agents (e.g., conc H₂SO₄) chemically strip bound water of crystallisation or extract H & O elements from organic molecules (e.g., charring sucrose C₁₂H₂₂O₁₁ into a black column of pure Carbon).",
    keyTakeaway: "Drying agents preserve chemical identity; Dehydrating agents chemically decompose molecules to remove H₂O.",
    visualType: 'drying_dehydrating'
  }
];

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    nodeId: NODE_C9_CHEM_011,
    question: "Why is the burning of magnesium ribbon in air considered an exothermic reaction?",
    options: [
      "It absorbs heat from surroundings and cools the beaker.",
      "Energy released during bond formation in MgO is greater than energy absorbed to break Mg and O₂ bonds.",
      "It destroys energy in violation of energy conservation.",
      "No chemical bonds are broken or formed during burning."
    ],
    correctIndex: 1,
    explanation: "Magnesium combustion (2Mg + O₂ → 2MgO + heat + light) releases net energy because the ionic bonds formed in MgO release more energy than needed to break reactants' bonds.",
    hint: "Think about bond breaking (absorbs heat) versus bond making (releases heat)."
  },
  {
    id: 'c2',
    nodeId: NODE_C9_CHEM_012,
    question: "A student dissolves Ammonium Chloride (NH₄Cl) in water and notes the beaker temperature drops from 25°C to 18°C. How is this change classified?",
    options: [
      "Exothermic reaction (ΔH is negative)",
      "Endothermic process (ΔH is positive)",
      "Electrochemical combustion",
      "Efflorescent phase transition"
    ],
    correctIndex: 1,
    explanation: "When a process absorbs thermal energy from the surroundings (causing temperature to fall), it is endothermic (ΔH > 0).",
    misconceptionId: 'exo_hot',
    hint: "Does the system absorb heat from surroundings or give out heat?"
  },
  {
    id: 'c3',
    nodeId: NODE_C9_CHEM_013,
    question: "Why does Sodium Chloride (NaCl) dissolve readily in water, whereas cooking oil forms a separate layer?",
    options: [
      "Water is non-polar and oil is ionic.",
      "Water's bent polar dipole attracts Na⁺ (with δ- Oxygen) and Cl⁻ (with δ+ Hydrogen); non-polar oil lacks charges to interact with water.",
      "Salt has lower density than oil.",
      "Water breaks the covalent bonds inside sodium atoms."
    ],
    correctIndex: 1,
    explanation: "Water is a polar solvent with partial charges (δ- O, δ+ H) that hydrate Na⁺ and Cl⁻ ions. Non-polar oils cannot form favorable electrostatic attractions with water.",
    misconceptionId: 'water_dissolves_all',
    hint: "Remember 'like dissolves like' - polar solvents dissolve ionic/polar solutes."
  },
  {
    id: 'c4',
    nodeId: NODE_C9_CHEM_014,
    question: "You shine a torch through three liquids: A (salt water), B (fresh milk), and C (muddy river water). Both B and C show a visible bright light beam, but C settles to the bottom after 20 minutes while B remains uniform. Classify B and C.",
    options: [
      "B is a true solution; C is a colloid.",
      "B is a colloid (shows Tyndall effect, does not settle); C is a suspension (shows Tyndall effect, settles on standing).",
      "B is a suspension; C is a colloid.",
      "Both B and C are true solutions."
    ],
    correctIndex: 1,
    explanation: "Colloids (1-1000 nm) scatter light (Tyndall effect) but do not settle. Suspensions (>1000 nm) scatter light and settle under gravity on standing.",
    misconceptionId: 'tyndall_colloid_only',
    hint: "Check both light scattering AND whether particles settle under gravity."
  },
  {
    id: 'c5',
    nodeId: NODE_C9_CHEM_015,
    question: "How can an unsaturated solution of Potassium Nitrate at 20°C be converted into a saturated solution without adding more salt?",
    options: [
      "Heat the solution to 80°C.",
      "Evaporate part of the water solvent or cool the solution down.",
      "Stir the liquid rapidly with a glass rod.",
      "Shine ultra-violet light on the beaker."
    ],
    correctIndex: 1,
    explanation: "Solubility of KNO₃ decreases as temperature drops. Cooling down or reducing solvent mass reduces capacity until saturation is reached.",
    misconceptionId: 'saturation_no_temp',
    hint: "What happens to salt solubility when you lower the temperature?"
  },
  {
    id: 'c6',
    nodeId: NODE_C9_CHEM_016,
    question: "Solubility of KNO₃ is 85g/100g water at 50°C and 32g/100g water at 20°C. If 100g of water saturated with KNO₃ at 50°C is cooled to 20°C, how much salt crystallizes out?",
    options: [
      "85 grams",
      "53 grams",
      "32 grams",
      "117 grams"
    ],
    correctIndex: 1,
    explanation: "Mass crystallized = Solubility@50°C - Solubility@20°C = 85g - 32g = 53g of KNO₃ crystals.",
    hint: "Subtract the lower temperature solubility from the higher temperature solubility."
  },
  {
    id: 'c7',
    nodeId: NODE_C9_CHEM_017,
    question: "What does the formula Na₂CO₃·10H₂O indicate to a chemist?",
    options: [
      "A mixture of 10 separate buckets of liquid water mixed with dry salt.",
      "Exactly 10 water molecules chemically incorporated as water of crystallisation per formula unit of sodium carbonate.",
      "That the salt is wet surface moisture.",
      "That the compound contains 10 hydrogen atoms and 10 oxygen atoms total."
    ],
    correctIndex: 1,
    explanation: "The dot in Na₂CO₃·10H₂O represents stoichiometric water of crystallisation bound into the crystal lattice structure.",
    misconceptionId: 'hydrate_is_wet',
    hint: "The dot represents fixed chemical stoichiometry in the crystal cage."
  },
  {
    id: 'c8',
    nodeId: NODE_C9_CHEM_018,
    question: "When blue vitriol crystals (CuSO₄·5H₂O) are gently heated in a dry test tube, what visual change occurs and why?",
    options: [
      "It turns black because carbon is formed.",
      "It turns white because water of crystallisation is driven off as steam, leaving anhydrous CuSO₄.",
      "It turns bright yellow because sodium ions are activated.",
      "No change occurs because water is locked permanently."
    ],
    correctIndex: 1,
    explanation: "Heating removes the 5 bound H₂O molecules: blue CuSO₄·5H₂O (hydrated) → white CuSO₄ (anhydrous) + 5H₂O(g). Adding water reverses the blue color.",
    hint: "Water of crystallisation gives blue vitriol its blue color. What happens when heat drives water off?"
  },
  {
    id: 'c9',
    nodeId: NODE_C9_CHEM_019,
    question: "Match the behaviors: (X) Washing soda crystals crumbling to powder in open air, (Y) Ferric chloride crystals turning into a liquid brown pool, (Z) Quicklime absorbing moisture without liquid pooling.",
    options: [
      "X = Deliquescence, Y = Efflorescence, Z = Hygroscopy",
      "X = Efflorescence, Y = Deliquescence, Z = Hygroscopy",
      "X = Hygroscopy, Y = Efflorescence, Z = Deliquescence",
      "X = Efflorescence, Y = Hygroscopy, Z = Deliquescence"
    ],
    correctIndex: 1,
    explanation: "X is Efflorescence (loss of hydration water to air). Y is Deliquescence (absorbs air moisture and dissolves in it). Z is Hygroscopy (absorbs moisture without dissolving).",
    misconceptionId: 'hygroscopic_vs_deliquescent',
    hint: "Loses water = Efflorescence; Absorbs and dissolves = Deliquescence; Absorbs without dissolving = Hygroscopy."
  },
  {
    id: 'c10',
    nodeId: NODE_C9_CHEM_020,
    question: "Why MUST Quicklime (CaO) be used to dry moist Ammonia gas (NH₃) instead of concentrated Sulphuric Acid (H₂SO₄)?",
    options: [
      "CaO is a acid and H₂SO₄ is a base.",
      "Ammonia is a basic gas; acidic conc. H₂SO₄ would chemically react with it to form (NH₄)₂SO₄ instead of merely drying it.",
      "Conc. H₂SO₄ evaporates into gas rapidly.",
      "Quicklime turns ammonia into solid sugar."
    ],
    correctIndex: 1,
    explanation: "A drying agent must not chemically react with the gas being dried! NH₃ (basic) reacts with H₂SO₄ (acidic) → (NH₄)₂SO₄. Basic CaO safely absorbs moisture without reacting.",
    misconceptionId: 'drying_vs_dehydrating',
    hint: "Remember: basic gas requires a basic drying agent to prevent acid-base neutralization!"
  }
];

// ==========================================
// INTERACTIVE SVG VISUAL COMPONENTS
// ==========================================

// 1. Energy Diagram & Thermometer SVG
const EnergyDiagramSVG: React.FC<{
  type: 'exothermic' | 'endothermic';
  progress: number;
  temperature: number;
}> = ({ type, progress, temperature }) => {
  const isExo = type === 'exothermic';
  const reactantY = isExo ? 70 : 160;
  const productY = isExo ? 160 : 70;
  const curvePeakY = isExo ? 40 : 40;

  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full">
      {/* Energy Level Diagram */}
      <svg className="w-64 h-52 overflow-visible" viewBox="0 0 260 200">
        <defs>
          <linearGradient id="exoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="endoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={isExo ? '#EF4444' : '#3B82F6'} />
          </marker>
        </defs>

        {/* Axes */}
        <line x1="30" y1="180" x2="240" y2="180" stroke="#94A3B8" strokeWidth="2" />
        <line x1="30" y1="180" x2="30" y2="20" stroke="#94A3B8" strokeWidth="2" />
        <text x="135" y="198" fill="#94A3B8" fontSize="10" textAnchor="middle">Reaction Coordinate</text>
        <text x="15" y="100" fill="#94A3B8" fontSize="10" textAnchor="middle" transform="rotate(-90 15 100)">Energy (H)</text>

        {/* Reactants Level */}
        <line x1="40" y1={reactantY} x2="90" y2={reactantY} stroke="#38BDF8" strokeWidth="3" />
        <text x="65" y={reactantY - 8} fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">Reactants</text>

        {/* Energy Barrier Curve */}
        <path
          d={`M 90 ${reactantY} C 120 ${curvePeakY}, 140 ${curvePeakY}, 170 ${productY}`}
          fill="none"
          stroke={isExo ? "url(#exoGrad)" : "url(#endoGrad)"}
          strokeWidth="3"
          strokeDasharray="200"
          strokeDashoffset={200 - progress * 2}
        />

        {/* Products Level */}
        <line x1="170" y1={productY} x2="220" y2={productY} stroke="#A855F7" strokeWidth="3" />
        <text x="195" y={productY + 16} fill="#A855F7" fontSize="11" fontWeight="bold" textAnchor="middle">Products</text>

        {/* Delta H Arrow */}
        <line x1="195" y1={reactantY} x2="195" y2={productY} stroke={isExo ? '#EF4444' : '#3B82F6'} strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow)" />
        <text x="210" y={(reactantY + productY) / 2} fill={isExo ? '#EF4444' : '#3B82F6'} fontSize="11" fontWeight="bold">
          {isExo ? 'ΔH < 0 (Heat Released)' : 'ΔH > 0 (Heat Absorbed)'}
        </text>
      </svg>

      {/* Thermometer Display */}
      <div className="flex flex-col items-center bg-slate-800 p-3 rounded-lg border border-slate-700 min-w-[120px]">
        <span className="text-xs font-semibold text-slate-400 mb-1">Surrounding Temp</span>
        <div className="relative w-6 h-32 bg-slate-700 rounded-full overflow-hidden border border-slate-600 flex flex-col justify-end p-0.5">
          <motion.div
            className={`w-full rounded-full ${isExo ? 'bg-gradient-to-t from-orange-500 to-red-500' : 'bg-gradient-to-t from-blue-600 to-cyan-400'}`}
            animate={{ height: `${Math.min(100, Math.max(10, ((temperature - 10) / 70) * 100))}%` }}
            transition={{ type: 'spring', damping: 15 }}
          />
        </div>
        <span className={`mt-2 font-mono text-lg font-bold ${isExo ? 'text-red-400' : 'text-cyan-400'}`}>
          {temperature.toFixed(1)}°C
        </span>
      </div>
    </div>
  );
};

// 2. Water Dipole & Ion Hydration SVG
const WaterDipoleSVG: React.FC<{ soluteType: 'salt' | 'oil'; isDissolved: boolean }> = ({ soluteType, isDissolved }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full">
      <h4 className="text-sm font-bold text-cyan-300 mb-2">
        {soluteType === 'salt' ? 'Ionic Hydration: Polar H₂O dipole pulling Na⁺ & Cl⁻' : 'Non-Polar Hydrophobic Isolation (Oil vs Water)'}
      </h4>
      <svg className="w-full max-w-md h-52 bg-slate-950 rounded-lg border border-slate-800" viewBox="0 0 360 200">
        {soluteType === 'salt' ? (
          isDissolved ? (
            <g id="hydrated_ions">
              {/* Na+ hydrated */}
              <g transform="translate(100, 100)">
                <circle r="22" fill="#EF4444" opacity="0.9" />
                <text y="5" fill="#FFF" fontWeight="bold" fontSize="14" textAnchor="middle">Na⁺</text>
                {/* 4 H2O pointing Oxygen (red) inward */}
                {[0, 90, 180, 270].map((deg, i) => (
                  <g key={i} transform={`rotate(${deg}) translate(36, 0)`}>
                    <circle cx="0" cy="0" r="8" fill="#F43F5E" />
                    <circle cx="-6" cy="-6" r="4" fill="#E2E8F0" />
                    <circle cx="-6" cy="6" r="4" fill="#E2E8F0" />
                  </g>
                ))}
              </g>

              {/* Cl- hydrated */}
              <g transform="translate(260, 100)">
                <circle r="26" fill="#10B981" opacity="0.9" />
                <text y="5" fill="#FFF" fontWeight="bold" fontSize="14" textAnchor="middle">Cl⁻</text>
                {/* 4 H2O pointing Hydrogen (white) inward */}
                {[0, 90, 180, 270].map((deg, i) => (
                  <g key={i} transform={`rotate(${deg}) translate(40, 0)`}>
                    <circle cx="0" cy="0" r="8" fill="#F43F5E" />
                    <circle cx="-7" cy="-6" r="4" fill="#E2E8F0" />
                    <circle cx="-7" cy="6" r="4" fill="#E2E8F0" />
                  </g>
                ))}
              </g>
            </g>
          ) : (
            <g id="lattice">
              <rect x="130" y="60" width="100" height="80" rx="8" fill="#334155" stroke="#64748B" strokeWidth="2" />
              <text x="180" y="105" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle">NaCl Crystal Lattice</text>
            </g>
          )
        ) : (
          <g id="oil_separation">
            {/* Top Oil Layer */}
            <rect x="20" y="20" width="320" height="50" rx="6" fill="#FACC15" opacity="0.8" />
            <text x="180" y="50" fill="#713F12" fontSize="13" fontWeight="bold" textAnchor="middle">Non-Polar Oil Layer (No Dipole Attraction)</text>

            {/* Bottom Water Layer */}
            <rect x="20" y="80" width="320" height="100" rx="6" fill="#0284C7" opacity="0.4" />
            <text x="180" y="135" fill="#E0F2FE" fontSize="13" fontWeight="bold" textAnchor="middle">Polar Water Molecules (H₂O Dipoles)</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// 3. Tyndall Effect Visualizer SVG
const TyndallEffectSVG: React.FC<{ mixtureType: 'solution' | 'colloid' | 'suspension'; lightOn: boolean }> = ({ mixtureType, lightOn }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-xs font-bold text-slate-300">Beam Path Status:</span>
        <span className={`text-xs px-2 py-0.5 rounded font-mono ${lightOn && mixtureType !== 'solution' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'}`}>
          {lightOn ? (mixtureType === 'solution' ? 'Invisible (Particles < 1nm)' : 'Tyndall Beam Visible (Scattered)') : 'Light Off'}
        </span>
      </div>

      <svg className="w-full max-w-md h-48 bg-slate-950 rounded-lg border border-slate-800" viewBox="0 0 380 180">
        {/* Beaker Container */}
        <rect x="110" y="30" width="160" height="120" rx="10" fill={mixtureType === 'suspension' ? '#78350F22' : mixtureType === 'colloid' ? '#FFFFFF15' : '#0EA5E915'} stroke="#94A3B8" strokeWidth="2" />
        <text x="190" y="20" fill="#CBD5E1" fontSize="12" fontWeight="bold" textAnchor="middle">
          {mixtureType === 'solution' ? 'True Solution (<1nm)' : mixtureType === 'colloid' ? 'Colloid (1-1000nm)' : 'Suspension (>1000nm)'}
        </text>

        {/* Torch Light Source */}
        <rect x="20" y="70" width="50" height="40" rx="4" fill="#475569" />
        <polygon points="70,75 90,65 90,115 70,105" fill={lightOn ? '#FBBF24' : '#334155'} />

        {/* Light Beam through beaker */}
        {lightOn && (
          <polygon
            points={mixtureType === 'solution' ? "90,75 290,60 290,120 90,105" : "90,75 110,80 110,100 90,105"}
            fill="#FBBF24"
            opacity={mixtureType === 'solution' ? 0.05 : 0.3}
          />
        )}

        {/* Scattered Beam inside Colloid / Suspension */}
        {lightOn && mixtureType !== 'solution' && (
          <polygon points="110,80 270,70 270,110 110,100" fill="#FDE047" opacity="0.65" filter="drop-shadow(0 0 6px #FBBF24)" />
        )}

        {/* Particles */}
        {mixtureType === 'suspension' && (
          <g>
            {/* Settled sediment at bottom */}
            <rect x="112" y="138" width="156" height="10" fill="#B45309" rx="2" />
            <circle cx="140" cy="110" r="4" fill="#D97706" />
            <circle cx="210" cy="95" r="5" fill="#B45309" />
            <circle cx="180" cy="125" r="4" fill="#92400E" />
          </g>
        )}

        {mixtureType === 'colloid' && (
          <g>
            <circle cx="150" cy="85" r="2.5" fill="#F8FAFC" opacity="0.8" />
            <circle cx="210" cy="95" r="2.5" fill="#F8FAFC" opacity="0.8" />
            <circle cx="180" cy="70" r="2" fill="#F8FAFC" opacity="0.8" />
            <circle cx="230" cy="115" r="2.5" fill="#F8FAFC" opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
};

// 4. Solubility Curve Graph Canvas/SVG
const SolubilityCurveSVG: React.FC<{
  targetTemp: number;
  addedMass: number;
  selectedSalt: 'KNO3' | 'NaCl' | 'CaSO4';
}> = ({ targetTemp, addedMass, selectedSalt }) => {
  // Formula helpers for solubility at temp T
  const getSolubility = (salt: 'KNO3' | 'NaCl' | 'CaSO4', temp: number) => {
    if (salt === 'KNO3') return 13.3 + 0.6 * temp + 0.017 * temp * temp; // 20°C: ~32g, 50°C: ~85g
    if (salt === 'NaCl') return 35.7 + 0.025 * temp; // ~36g across range
    return Math.max(0.05, 0.21 - 0.001 * temp); // CaSO4 drops slightly
  };

  const currentSolubility = getSolubility(selectedSalt, targetTemp);
  const isSaturated = Math.abs(addedMass - currentSolubility) < 1.5;
  const isSupersaturated = addedMass > currentSolubility + 1.5;
  const stateLabel = isSupersaturated ? 'Supersaturated (Unstable)' : isSaturated ? 'Saturated (Equilibrium)' : 'Unsaturated (Can dissolve more)';

  // Build SVG Path points for 0°C to 100°C
  const points = useMemo(() => {
    const pts: string[] = [];
    for (let t = 0; t <= 100; t += 5) {
      const sol = getSolubility(selectedSalt, t);
      const x = 40 + (t / 100) * 280;
      const y = 180 - Math.min(160, (sol / 140) * 160);
      pts.push(`${x},${y}`);
    }
    return pts.join(' L ');
  }, [selectedSalt]);

  const ptX = 40 + (targetTemp / 100) * 280;
  const ptY = 180 - Math.min(160, (addedMass / 140) * 160);

  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full">
      <div className="flex justify-between items-center w-full max-w-md mb-2 text-xs">
        <span className="font-bold text-slate-300">Salt: <span className="text-cyan-400">{selectedSalt}</span></span>
        <span className={`px-2 py-0.5 rounded font-bold ${isSupersaturated ? 'bg-purple-500/20 text-purple-300 border border-purple-500' : isSaturated ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' : 'bg-blue-500/20 text-blue-300 border border-blue-500'}`}>
          {stateLabel}
        </span>
      </div>

      <svg className="w-full max-w-md h-56 bg-slate-950 rounded-lg border border-slate-800" viewBox="0 0 340 210">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((t) => {
          const x = 40 + (t / 100) * 280;
          return (
            <g key={t}>
              <line x1={x} y1="20" x2={x} y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
              <text x={x} y="195" fill="#64748B" fontSize="9" textAnchor="middle">{t}°C</text>
            </g>
          );
        })}

        {[0, 35, 70, 105, 140].map((s) => {
          const y = 180 - (s / 140) * 160;
          return (
            <g key={s}>
              <line x1="40" y1={y} x2="320" y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
              <text x="32" y={y + 3} fill="#64748B" fontSize="9" textAnchor="end">{s}g</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1="40" y1="180" x2="320" y2="180" stroke="#94A3B8" strokeWidth="2" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="#94A3B8" strokeWidth="2" />

        {/* Curve Path */}
        <path d={`M ${points}`} fill="none" stroke="#38BDF8" strokeWidth="3" />

        {/* Operating Point */}
        <circle cx={ptX} cy={ptY} r="6" fill={isSupersaturated ? '#C084FC' : isSaturated ? '#34D399' : '#60A5FA'} />
        <circle cx={ptX} cy={ptY} r="10" fill="none" stroke="#FFF" strokeWidth="1.5" opacity="0.6" />

        <text x="180" y="206" fill="#94A3B8" fontSize="10" textAnchor="middle">Temperature (°C)</text>
        <text x="12" y="100" fill="#94A3B8" fontSize="9" textAnchor="middle" transform="rotate(-90 12 100)">Solubility (g / 100g H₂O)</text>
      </svg>
      <div className="mt-2 text-xs text-slate-400">
        Solubility at {targetTemp}°C: <span className="text-emerald-400 font-bold">{currentSolubility.toFixed(1)}g</span> / 100g H₂O | Dissolved: <span className="text-cyan-400 font-bold">{addedMass}g</span>
      </div>
    </div>
  );
};

// 5. Hydrate Thermal Dehydration Visualizer SVG
const HydrateHeatingSVG: React.FC<{ isHeating: boolean; heatProgress: number }> = ({ isHeating, heatProgress }) => {
  // heatProgress 0 to 100
  const colorRatio = Math.min(1, heatProgress / 100);
  // Transition from Deep Blue #1E40AF to White #F8FAFC
  const blueVal = Math.round(175 + colorRatio * (250 - 175));
  const redVal = Math.round(30 + colorRatio * (248 - 30));
  const greenVal = Math.round(64 + colorRatio * (250 - 64));
  const crystalColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;

  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full">
      <svg className="w-full max-w-md h-52 bg-slate-950 rounded-lg border border-slate-800" viewBox="0 0 360 200">
        {/* Test tube inclined */}
        <g transform="rotate(-25 180 100)">
          {/* Glass tube */}
          <rect x="120" y="80" width="160" height="36" rx="18" fill="#FFFFFF10" stroke="#94A3B8" strokeWidth="2" />

          {/* Hydrated/Anhydrous Salt Powder */}
          <rect x="220" y="84" width="56" height="28" rx="12" fill={crystalColor} />

          {/* Water droplets condensing near mouth */}
          {heatProgress > 20 && (
            <g fill="#38BDF8" opacity={(heatProgress - 20) / 80}>
              <circle cx="145" cy="88" r="3" />
              <circle cx="160" cy="106" r="2.5" />
              <circle cx="135" cy="98" r="3.5" />
            </g>
          )}
        </g>

        {/* Bunsen Burner Flame */}
        {isHeating && (
          <g transform="translate(230, 140)">
            <polygon points="0,30 -12,0 0,-15 12,0" fill="#EF4444" opacity="0.8" />
            <polygon points="0,30 -7,5 0,-8 7,5" fill="#F59E0B" />
            <polygon points="0,30 -3,10 0,0 3,10" fill="#3B82F6" />
          </g>
        )}

        {/* Label */}
        <text x="180" y="30" fill="#E2E8F0" fontSize="12" fontWeight="bold" textAnchor="middle">
          {heatProgress < 50 ? 'CuSO₄·5H₂O (Blue Vitriol Pentahydrate)' : heatProgress >= 95 ? 'Anhydrous CuSO₄ (White Powder)' : 'Dehydrating... Driving off 5H₂O'}
        </text>
      </svg>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================
const MISCONCEPTIONS_CHECKLIST: MisconceptionChecklistItem[] = [
  {
    id: "misc_1",
    title: "Chemical bond breaking releases energy to the surroundings",
    description: "Students often believe that breaking a chemical bond releases energy, confusing chemical bonds with physical objects like stretched rubber bands that snap and release energy.",
    correction: "Breaking chemical bonds always requires an input of energy to overcome the attractive forces between atoms. Conversely, energy is only released when new chemical bonds are formed. The overall energy change of a reaction depends on whether bond breaking absorbs more energy than bond formation releases.",
  },
  {
    id: "misc_2",
    title: "Only endothermic reactions need activation energy to start",
    description: "Many students think that only endothermic reactions require an initial energy input, while exothermic reactions start spontaneously without any energy input.",
    correction: "All chemical reactions, whether exothermic or endothermic, require activation energy to break existing reactant bonds and begin. For example, wood burning is highly exothermic, but it still requires a match flame to provide the initial activation energy to start the reaction. Once started, exothermic reactions generate enough heat to provide activation energy for remaining reactants.",
  },
  {
    id: "misc_3",
    title: "Energy is created or lost during chemical energy changes",
    description: "Students often assume that the heat produced in exothermic reactions is newly created energy rather than transformed chemical energy.",
    correction: "According to the Law of Conservation of Energy, energy cannot be created or destroyed during chemical reactions. In exothermic reactions, stored chemical potential energy in reactant bonds is converted into thermal energy. In endothermic reactions, thermal energy absorbed from surroundings is transformed into chemical potential energy in product bonds.",
  },
  {
    id: "misc_4",
    title: "All chemical reactions result in a rise in temperature",
    description: "Students frequently believe that any chemical reaction will cause the reaction vessel or surrounding solution to feel warm.",
    correction: "Chemical reactions can cause temperatures to either rise or fall depending on the net energy change. Endothermic reactions absorb heat from their surroundings, causing the temperature of the reaction mixture to drop noticeably. A common example is dissolving ammonium chloride in water, which cools the solution down.",
  },
  {
    id: "misc_5",
    title: "Activation energy determines the net overall chemical enthalpy change",
    description: "Students often confuse activation energy with enthalpy change, believing that a high activation energy means the reaction must be endothermic overall.",
    correction: "Enthalpy change is the net difference between the energy of the reactants and the energy of the products. Activation energy is merely the initial energy barrier that must be overcome to reach the transition state. A reaction can have a very high activation energy and still be strongly exothermic overall once it proceeds.",
  },
];

export default function C9_ChemistryEnergychangesinchemicalreactionsSim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenge' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Gamification & BKT State
  const [bktState, setBktState] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const init: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      init[id] = createBKTState();
    });
    return init as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Challenge Mode State
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Visual Effects State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // LAB INTERACTIVE STATES
  // Lab 1: Energy
  const [energyType, setEnergyType] = useState<'exothermic' | 'endothermic'>('exothermic');
  const [energyProgress, setEnergyProgress] = useState(0);
  const [surroundTemp, setSurroundTemp] = useState(25);

  // Lab 2: Solvent & Dipole
  const [soluteType, setSoluteType] = useState<'salt' | 'oil'>('salt');
  const [isDissolved, setIsDissolved] = useState(false);

  // Lab 3: Mixture & Tyndall
  const [mixtureType, setMixtureType] = useState<'solution' | 'colloid' | 'suspension'>('solution');
  const [lightOn, setLightOn] = useState(false);

  // Lab 4: Solubility Curve & Saturation
  const [selectedSalt, setSelectedSalt] = useState<'KNO3' | 'NaCl' | 'CaSO4'>('KNO3');
  const [labTemp, setLabTemp] = useState(30);
  const [labAddedMass, setLabAddedMass] = useState(40);

  // Lab 5: Hydrate Heating
  const [isHeating, setIsHeating] = useState(false);
  const [heatProgress, setHeatProgress] = useState(0);

  // Auto-Hint Timer Ref
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset hint timer on challenge change
  useEffect(() => {
    setShowHint(false);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [challengeIdx]);

  // Handle Hydrate Heating Simulation Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHeating) {
      interval = setInterval(() => {
        setHeatProgress((prev) => {
          if (prev >= 100) {
            setIsHeating(false);
            audioManager.play('success');
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isHeating]);

  // Audio & Speech Handlers
  const handleTabChange = (tab: 'discovery' | 'learn' | 'lab' | 'challenge' | 'summary') => {
    audioManager.play('tap');
    setActiveTab(tab);
    if (tab === 'learn') {
      speechManager.speak(`Exploring slide ${currentSlideIndex + 1}: ${TEACHING_SLIDES[currentSlideIndex].title}`);
      speechManager.speak('Great job! Keep going.');
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
      audioManager.play('whoosh');
      const nextIdx = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIdx);
      speechManager.speak(TEACHING_SLIDES[nextIdx].title);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      audioManager.play('whoosh');
      const prevIdx = currentSlideIndex - 1;
      setCurrentSlideIndex(prevIdx);
    }
  };

  // Challenge Submission Logic
  const handleOptionSelect = (index: number) => {
    if (challengeSubmitted) return;
    audioManager.play('tap');
    setSelectedOption(index);
  };

  const handleSubmitChallenge = () => {
    if (selectedOption === null || challengeSubmitted) return;
    setChallengeSubmitted(true);

    const currentChallenge = CHALLENGES[challengeIdx];
    const isCorrect = selectedOption === currentChallenge.correctIndex;

    // Update BKT & Mastery Store
    const oldBkt = bktState[currentChallenge.nodeId];
    const newBkt = bktUpdate(oldBkt, isCorrect);
    setBktState((prev) => ({ ...prev, [currentChallenge.nodeId]: newBkt }));
    recordGameScore(Object.values(ALL_NODE_IDS), isCorrect ? 100 : 30);

    // Update SRS
    const srsItem = createReviewItem(currentChallenge.id, 'Chemistry');
    sm2Update(srsItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      setScore((prev) => prev + 10);
      setCompletedChallenges((prev) => new Set(prev).add(currentChallenge.id));
      speechManager.speak("Excellent analysis! Mastered concept.");
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Let's review the reaction mechanics!");
    }
  };

  const handleNextChallenge = () => {
    setChallengeSubmitted(false);
    setSelectedOption(null);
    if (challengeIdx < CHALLENGES.length - 1) {
      audioManager.play('whoosh');
      setChallengeIdx((prev) => prev + 1);
    } else {
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      setActiveTab('summary');
    }
  };

  // Compute Overall Mastery Level
  const overallMastery = useMemo(() => {
    let totalP = 0;
    ALL_NODE_IDS.forEach((id) => {
      totalP += bktState[id].pKnown;
    });
    return Math.round((totalP / ALL_NODE_IDS.length) * 100);
  }, [bktState]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col items-center select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Simulation Complete! Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Bar */}
        <header className="bg-slate-950/80 p-4 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">Class 9 ICSE Chemistry</span>
            <h1 className="text-lg md:text-xl font-black text-slate-100">{SCENARIO.title}</h1>
          </div>

          {/* Mastered Progress Indicator */}
          <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400 font-semibold">Mastery Score</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{overallMastery}%</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-emerald-500/40 flex items-center justify-center font-bold text-xs text-emerald-300">
              {overallMastery > 80 ? 'Master' : 'Learner'}
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex border-b border-slate-800 bg-slate-950/40 overflow-x-auto">
          {[
            { id: 'discovery', label: '1. Discovery' },
            { id: 'learn', label: '2. Concept Visuals' },
            { id: 'lab', label: '3. Interactive Lab' },
            { id: 'challenge', label: '4. ICSE Challenges' },
            { id: 'summary', label: '5. Summary & SRS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`px-5 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Main Interactive Content View */}
        <main className="p-4 md:p-6 flex-1 min-h-[520px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* TAB 1: DISCOVERY QUESTION */}
            {activeTab === 'discovery' && (
              <motion.div
                key="discovery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-cyan-950/30 border border-cyan-800/40 p-5 rounded-xl">
                  <h2 className="text-base font-bold text-cyan-300 mb-1">Predict Before Learning</h2>
                  <p className="text-sm text-slate-300">{SCENARIO.description}</p>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-base font-bold text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {DISCOVERY_QUESTION.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedOption(i);
                          audioManager.play(i === DISCOVERY_QUESTION.correctIndex ? 'success' : 'error');
                        }}
                        className={`p-4 rounded-xl text-left text-sm font-semibold transition-all border ${selectedOption === i ? (i === DISCOVERY_QUESTION.correctIndex ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-red-950/60 border-red-500 text-red-200') : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {selectedOption !== null && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-300">
                      <p className="font-bold text-cyan-400 mb-1">Exploration Analysis:</p>
                      {DISCOVERY_QUESTION.explanation}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleTabChange('learn')}
                    className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
                  >
                    Proceed to Interactive Concepts →
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 2: TEACHING SLIDES WITH VISUAL ENGINES */}
            {activeTab === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4"
              >
                {/* Slide Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase">Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}</span>
                    <h2 className="text-lg font-bold text-slate-100">{TEACHING_SLIDES[currentSlideIndex].title}</h2>
                  </div>
                  <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                    Node: {TEACHING_SLIDES[currentSlideIndex].nodeId}
                  </span>
                </div>

                {/* Concept Visual Render */}
                <div className="my-2">
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'energy' && (
                    <EnergyDiagramSVG type="exothermic" progress={100} temperature={45} />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'water_dipole' && (
                    <WaterDipoleSVG soluteType="salt" isDissolved={true} />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'mixture_tyndall' && (
                    <TyndallEffectSVG mixtureType="colloid" lightOn={true} />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'saturation' && (
                    <SolubilityCurveSVG targetTemp={50} addedMass={85} selectedSalt="KNO3" />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'solubility_curve' && (
                    <SolubilityCurveSVG targetTemp={30} addedMass={36} selectedSalt="NaCl" />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'hydrate_heating' && (
                    <HydrateHeatingSVG isHeating={false} heatProgress={0} />
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'air_exposure' && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-center text-sm text-cyan-300">
                      [Air Exposure Simulator: Washing Soda (Na₂CO₃·10H₂O) Effloresces into white powder by losing 9H₂O]
                    </div>
                  )}
                  {TEACHING_SLIDES[currentSlideIndex].visualType === 'drying_dehydrating' && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-center text-sm text-amber-300">
                      [Chemical Action: Conc H₂SO₄ strips H & O from sucrose C₁₂H₂₂O₁₁ leaving pure black Carbon column]
                    </div>
                  )}
                </div>

                {/* Text Explanation Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-cyan-300">{TEACHING_SLIDES[currentSlideIndex].subtitle}</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{TEACHING_SLIDES[currentSlideIndex].concept}</p>
                  <p className="text-xs text-slate-400">{TEACHING_SLIDES[currentSlideIndex].description}</p>
                  <div className="mt-2 p-2.5 bg-cyan-950/40 border border-cyan-800/50 rounded-lg text-xs font-semibold text-cyan-200">
                    💡 <span className="underline">Key Exam Takeaway</span>: {TEACHING_SLIDES[currentSlideIndex].keyTakeaway}
                  </div>
                </div>

                {/* Slide Nav Controls */}
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={handlePrevSlide}
                    disabled={currentSlideIndex === 0}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold rounded-xl text-xs transition-all"
                  >
                    ← Previous Slide
                  </button>
                  <div className="flex gap-1">
                    {TEACHING_SLIDES.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === currentSlideIndex ? 'bg-cyan-400 w-5' : 'bg-slate-700'} transition-all`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNextSlide}
                    disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs transition-all"
                  >
                    Next Slide →
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 3: VIRTUAL LABORATORY SIMULATOR */}
            {activeTab === 'lab' && (
              <motion.div
                key="lab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col gap-5"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-base font-bold text-slate-100">ICSE Interactive Experimentation Workbench</h2>
                  <span className="text-xs text-cyan-400 font-semibold bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                    Hands-On Mode
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Interactive Visual Canvas */}
                  <div className="flex flex-col gap-4">
                    <SolubilityCurveSVG targetTemp={labTemp} addedMass={labAddedMass} selectedSalt={selectedSalt} />
                    <HydrateHeatingSVG isHeating={isHeating} heatProgress={heatProgress} />
                  </div>

                  {/* Right Column: Lab Controllers */}
                  <div className="flex flex-col gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-cyan-300 border-b border-slate-800 pb-2">Control Panel & Variables</h3>

                    {/* Controller 1: Salt Selection */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300">Select Salt Solution</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['KNO3', 'NaCl', 'CaSO4'] as const).map((salt) => (
                          <button
                            key={salt}
                            onClick={() => {
                              setSelectedSalt(salt);
                              audioManager.play('tap');
                            }}
                            className={`py-2 text-xs font-bold rounded-lg border transition-all ${selectedSalt === salt ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
                          >
                            {salt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Controller 2: Temperature Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">Solution Temperature</span>
                        <span className="text-cyan-400 font-bold font-mono">{labTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={labTemp}
                        onChange={(e) => {
                          setLabTemp(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-400"
                      />
                    </div>

                    {/* Controller 3: Added Mass Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">Added Solute Mass</span>
                        <span className="text-cyan-400 font-bold font-mono">{labAddedMass}g / 100g H₂O</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="140"
                        value={labAddedMass}
                        onChange={(e) => {
                          setLabAddedMass(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-400"
                      />
                    </div>

                    {/* Action 4: Hydrate Dehydration Trigger */}
                    <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                      <span className="text-xs font-semibold text-slate-300">Hydrate Thermal Dehydration Test</span>
                      <button
                        onClick={() => {
                          setHeatProgress(0);
                          setIsHeating(true);
                          audioManager.play('whoosh');
                        }}
                        disabled={isHeating}
                        className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 font-bold rounded-xl text-xs transition-all disabled:opacity-50"
                      >
                        {isHeating ? 'Heating Blue Vitriol (CuSO₄·5H₂O)...' : 'Heat CuSO₄·5H₂O Crystals 🔥'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: ADAPTIVE CHALLENGES */}
            {activeTab === 'challenge' && (
              <motion.div
                key="challenge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-5"
              >
                {/* Challenge Header Bar */}
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400">
                    Challenge {challengeIdx + 1} of {CHALLENGES.length}
                  </span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                    Node: {CHALLENGES[challengeIdx].nodeId}
                  </span>
                </div>

                {/* Question & Options */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
                  <h3 className="text-base font-bold text-slate-100">{CHALLENGES[challengeIdx].question}</h3>

                  <div className="grid grid-cols-1 gap-2.5">
                    {CHALLENGES[challengeIdx].options.map((option, i) => {
                      const isSelected = selectedOption === i;
                      const isCorrect = i === CHALLENGES[challengeIdx].correctIndex;
                      let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

                      if (challengeSubmitted) {
                        if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200";
                        else if (isSelected) btnStyle = "bg-red-950/80 border-red-500 text-red-200";
                      } else if (isSelected) {
                        btnStyle = "bg-cyan-950/60 border-cyan-500 text-cyan-200";
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleOptionSelect(i)}
                          className={`p-3.5 rounded-xl text-left text-xs md:text-sm font-semibold transition-all border flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {challengeSubmitted && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Misconception Box */}
                  {challengeSubmitted && (
                    <div className="mt-2 p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs md:text-sm text-slate-300 flex flex-col gap-2">
                      <p className="font-bold text-cyan-300">Explanation:</p>
                      <p>{CHALLENGES[challengeIdx].explanation}</p>

                      {CHALLENGES[challengeIdx].misconceptionId && MISCONCEPTIONS[CHALLENGES[challengeIdx].misconceptionId!] && (
                        <div className="mt-2 p-3 bg-red-950/30 border border-red-800/40 rounded-lg text-xs text-red-300">
                          <span className="font-bold underline">Common ICSE Misconception Correction</span>:{" "}
                          {MISCONCEPTIONS[CHALLENGES[challengeIdx].misconceptionId!].correction}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Hint Component */}
                <HintBubble show={showHint && !challengeSubmitted} text={CHALLENGES[challengeIdx].hint} />

                {/* Submission & Next Button */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-xs text-slate-400 hover:text-cyan-400 underline"
                  >
                    Need a Hint?
                  </button>

                  {!challengeSubmitted ? (
                    <button
                      onClick={handleSubmitChallenge}
                      disabled={selectedOption === null}
                      className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs transition-all"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all"
                    >
                      Continue to Next →
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 5: MASTERY SUMMARY & SRS REVIEW */}
            {activeTab === 'summary' && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-5"
              >
                <div className="bg-gradient-to-r from-cyan-950/60 to-emerald-950/60 p-6 rounded-2xl border border-cyan-800/40 text-center flex flex-col items-center gap-2">
                  <h2 className="text-xl font-black text-slate-100">Chemistry Mastery Report</h2>
                  <p className="text-xs text-slate-300 max-w-lg">
                    Congratulations! You have thoroughly investigated all 10 ICSE Class 9 chemistry concepts.
                  </p>
                  <div className="mt-2 font-mono text-3xl font-black text-emerald-400">{overallMastery}% Mastery Score</div>
                </div>

                {/* Node Mastery Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ALL_NODE_IDS.map((nodeId) => {
                    const bkt = bktState[nodeId];
                    const level = getMasteryLevel(bkt.pKnown);
                    const pct = Math.round(bkt.pKnown * 100);

                    return (
                      <div key={nodeId} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-xs font-mono text-cyan-400 font-bold">{nodeId}</span>
                          <span className="text-xs text-slate-300 font-medium">BKT Probability</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-slate-200">{pct}%</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${level === 'mastered' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                            {level}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Final Action Button */}
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => handleTabChange('lab')}
                    className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
                  >
                    Return to Virtual Workbench
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
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