'use client';
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

// Node IDs for ICSE Class 10 Chemistry covered in this simulation
const ALL_NODE_IDS = [
  'c10_chem_031',
  'c10_chem_032',
  'c10_chem_033',
  'c10_chem_034',
  'c10_chem_035',
  'c10_chem_036',
  'c10_chem_037',
  'c10_chem_038',
  'c10_chem_039',
  'c10_chem_040',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// Types and Interfaces
interface GasData {
  name: string;
  formula: string;
  molMass: number;
  vd: number;
  color: string;
}

interface CompoundData {
  name: string;
  elements: { symbol: string; massPct: number; atomicMass: number }[];
  vd: number;
  empFormula: string;
  molFormula: string;
}

interface Slide {
  id: number;
  title: string;
  nodeId: NodeId;
  subtitle: string;
  conceptText: string;
  eli5: string;
  misconception: string;
  visualType: 'vd_balance' | 'emp_calc' | 'mole_triangle' | 'electrolysis_cell' | 'conduction_comp';
}

interface Challenge {
  id: number;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

interface Ion {
  symbol: string;
  charge: number;
  type: 'cation' | 'anion';
  positionInSeries: number; // lower means preferentially discharged
  name: string;
  color: string;
}

// Data Sets
const GASES: GasData[] = [
  { name: 'Hydrogen', formula: 'H₂', molMass: 2, vd: 1, color: '#38bdf8' },
  { name: 'Oxygen', formula: 'O₂', molMass: 32, vd: 16, color: '#f43f5e' },
  { name: 'Nitrogen', formula: 'N₂', molMass: 28, vd: 14, color: '#818cf8' },
  { name: 'Carbon Dioxide', formula: 'CO₂', molMass: 44, vd: 22, color: '#a855f7' },
  { name: 'Sulphur Dioxide', formula: 'SO₂', molMass: 64, vd: 32, color: '#eab308' },
  { name: 'Hydrogen Chloride', formula: 'HCl', molMass: 36.5, vd: 18.25, color: '#22c55e' },
];

const PRESET_COMPOUNDS: CompoundData[] = [
  {
    name: 'Glucose',
    elements: [
      { symbol: 'C', massPct: 40.0, atomicMass: 12 },
      { symbol: 'H', massPct: 6.67, atomicMass: 1 },
      { symbol: 'O', massPct: 53.33, atomicMass: 16 },
    ],
    vd: 90,
    empFormula: 'CH₂O',
    molFormula: 'C₆H₁₂O₆',
  },
  {
    name: 'Benzene',
    elements: [
      { symbol: 'C', massPct: 92.3, atomicMass: 12 },
      { symbol: 'H', massPct: 7.7, atomicMass: 1 },
    ],
    vd: 39,
    empFormula: 'CH',
    molFormula: 'C₆H₆',
  },
  {
    name: 'Hydrocarbon (Butene)',
    elements: [
      { symbol: 'C', massPct: 85.7, atomicMass: 12 },
      { symbol: 'H', massPct: 14.3, atomicMass: 1 },
    ],
    vd: 28,
    empFormula: 'CH₂',
    molFormula: 'C₄H₈',
  },
  {
    name: 'Acetic Acid',
    elements: [
      { symbol: 'C', massPct: 40.0, atomicMass: 12 },
      { symbol: 'H', massPct: 6.67, atomicMass: 1 },
      { symbol: 'O', massPct: 53.33, atomicMass: 16 },
    ],
    vd: 30,
    empFormula: 'CH₂O',
    molFormula: 'C₂H₄O₂',
  },
];

const TEACHING_SLIDES: Slide[] = [
  {
    id: 1,
    nodeId: 'c10_chem_031',
    title: 'Vapour Density & Molecular Mass',
    subtitle: 'Weighing gases relative to Hydrogen',
    conceptText:
      'Vapour Density (V.D.) is the ratio of the mass of a given volume of gas to the mass of an equal volume of hydrogen at the same T and P. Because hydrogen gas is H₂ (mass 2), Molecular Mass = 2 × Vapour Density.',
    eli5: 'Two identical balloons at same T & P: one with mystery gas, one with H₂. If mystery gas is 22x heavier, its V.D. is 22. Since H₂ has mass 2, real molecular mass is 2 × 22 = 44!',
    misconception:
      'Vapour density is NOT density in g/L. It is a unitless ratio comparing a gas to hydrogen gas.',
    visualType: 'vd_balance',
  },
  {
    id: 2,
    nodeId: 'c10_chem_032',
    title: 'Empirical & Molecular Formulae',
    subtitle: 'From mass percent to exact atomic count',
    conceptText:
      'Empirical formula gives the simplest whole-number ratio of atoms (e.g., CH₂O). Molecular formula gives the actual number of atoms in one molecule (e.g., C₆H₁₂O₆). Molecular Formula = n × Empirical Formula, where n = Molecular Mass / Empirical Formula Mass.',
    eli5: 'Empirical formula is like a reduced recipe (1 sugar : 2 flour : 1 milk). The molecular formula is the actual full cake recipe (6 sugar : 12 flour : 6 milk). Multiplying by n scales up the simple ratio.',
    misconception:
      'Empirical and molecular formulas are not always different. For H₂O and CO₂, they are identical because the ratio is already in lowest terms.',
    visualType: 'emp_calc',
  },
  {
    id: 3,
    nodeId: 'c10_chem_033',
    title: 'The Mole Concept & Gas Volumes',
    subtitle: 'Unifying particles, mass, and 22.4 Litres at STP',
    conceptText:
      '1 mole of any substance contains Avogadro’s number (6.022 × 10²³) of particles. At S.T.P. (0°C, 1 atm), 1 mole of ANY gas occupies exactly 22.4 Litres (Molar Volume). Gay Lussac’s Law shows gases react in simple whole-number volume ratios equal to their stoichiometric coefficients.',
    eli5: 'A mole is like a dozen, but vastly bigger (6.022 × 10²³). 1 mole of ANY gas at STP fills a 22.4 L bucket!',
    misconception:
      '1 mole of different gases occupy the same 22.4 L volume at STP, but they do NOT have the same mass!',
    visualType: 'mole_triangle',
  },
  {
    id: 4,
    nodeId: 'c10_chem_036',
    title: 'Electrolytes vs Non-Electrolytes',
    subtitle: 'Conductivity in solution and molten states',
    conceptText:
      'An electrolyte dissociates into free mobile ions when dissolved in water or melted, allowing electric current to pass (e.g. NaCl, HCl). Strong electrolytes ionise completely (ions only), weak electrolytes ionise partially (molecules + ions). Non-electrolytes do not ionise (molecules only: sugar, ethanol).',
    eli5: 'Electrolytes split into charged swimmers (ions) that carry electric current. Non-electrolytes stay as neutral whole molecules so no current flows.',
    misconception:
      'Dissolving does NOT automatically mean ionising. Sugar dissolves completely but forms zero ions, so it is a non-electrolyte.',
    visualType: 'electrolysis_cell',
  },
  {
    id: 5,
    nodeId: 'c10_chem_039',
    title: 'Metallic vs Electrolytic Conduction & Selective Discharge',
    subtitle: 'Electrons vs Ions & rules of discharge',
    conceptText:
      'Metallic conduction involves free electron drift with no chemical change; conductivity decreases as temperature rises. Electrolytic conduction involves mobile ion migration with chemical decomposition at electrodes; conductivity increases with temperature. When multiple ions compete, selective discharge depends on: (1) Position in activity series, (2) Concentration, (3) Electrode nature.',
    eli5: 'In wires, light electrons zip along. In liquids, heavy ions swim to the electrodes and transform into new gases or metals! The laziest ion in the series gets discharged first.',
    misconception:
      'The ion HIGHEST in the activity series is NOT discharged first at the cathode. The ion LOWEST in the series (e.g. Cu²⁺ over H⁺) is discharged first because it gains electrons most readily!',
    visualType: 'conduction_comp',
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: 'c10_chem_031',
    title: 'Vapour Density Calculation',
    question: 'A gas has a vapour density of 32. What is its relative molecular mass?',
    options: ['16', '32', '64', '128'],
    correctAnswer: 2,
    explanation:
      'Molecular Mass = 2 × Vapour Density. Therefore, Molecular Mass = 2 × 32 = 64 (which corresponds to SO₂).',
    hint: 'Remember the core formula: Molecular Mass = 2 × V.D.',
  },
  {
    id: 2,
    nodeId: 'c10_chem_031',
    title: 'Identifying Mystery Gas',
    question: 'A carbon oxide has a vapour density of 22. Which gas is it? (C=12, O=16)',
    options: ['Carbon Monoxide (CO)', 'Carbon Dioxide (CO₂)', 'Carbon Suboxide (C₃O₂)', 'Methane (CH₄)'],
    correctAnswer: 1,
    explanation:
      'Molecular Mass = 2 × 22 = 44. CO = 12+16 = 28. CO₂ = 12 + 2(16) = 44. The gas is Carbon Dioxide.',
    hint: 'First find molecular mass by doubling V.D. Then match formula mass.',
  },
  {
    id: 3,
    nodeId: 'c10_chem_032',
    title: 'Empirical Formula Ratio',
    question:
      'A compound contains 85.7% Carbon and 14.3% Hydrogen by mass. What is its empirical formula? (C=12, H=1)',
    options: ['CH', 'CH₂', 'CH₃', 'C₂H₅'],
    correctAnswer: 1,
    explanation:
      'Moles: C = 85.7/12 = 7.14; H = 14.3/1 = 14.3. Ratio: C = 7.14/7.14 = 1; H = 14.3/7.14 = 2. Empirical Formula is CH₂.',
    hint: 'Divide percentage by atomic mass for each element, then divide by the smallest mole value.',
  },
  {
    id: 4,
    nodeId: 'c10_chem_032',
    title: 'Molecular Formula Scaling',
    question:
      'An empirical formula is CH₂ (formula mass = 14) and the compound has a vapour density of 28. What is its molecular formula?',
    options: ['C₂H₄', 'C₃H₆', 'C₄H₈', 'C₅H₁₀'],
    correctAnswer: 2,
    explanation:
      'Molecular Mass = 2 × V.D. = 2 × 28 = 56. Multiplier n = 56 / 14 = 4. Molecular Formula = (CH₂)₄ = C₄H₈.',
    hint: 'Find molecular mass = 2 × V.D. Then find n = Mol Mass / Emp Mass.',
  },
  {
    id: 5,
    nodeId: 'c10_chem_033',
    title: 'STP Gas Volume',
    question: 'What volume does 0.5 moles of Oxygen gas (O₂) occupy at S.T.P.?',
    options: ['5.6 Litres', '11.2 Litres', '22.4 Litres', '44.8 Litres'],
    correctAnswer: 1,
    explanation: 'At STP, 1 mole of any gas = 22.4 L. So 0.5 moles = 0.5 × 22.4 L = 11.2 Litres.',
    hint: 'Multiply moles by 22.4 L.',
  },
  {
    id: 6,
    nodeId: 'c10_chem_034',
    title: 'Mole & Mass Conversion',
    question: 'Calculate the mass of 0.25 moles of Nitrogen gas (N₂). (N = 14)',
    options: ['3.5 g', '7.0 g', '14.0 g', '28.0 g'],
    correctAnswer: 1,
    explanation:
      'Nitrogen gas is diatomic: N₂. Gram molecular mass = 2 × 14 = 28 g. Mass = 0.25 mol × 28 g/mol = 7.0 g.',
    hint: 'Remember that nitrogen gas is N₂ (molecular mass 28, not 14!).',
  },
  {
    id: 7,
    nodeId: 'c10_chem_035',
    title: 'Stoichiometry & Reaction Volume',
    question:
      'In the reaction 2H₂(g) + O₂(g) → 2H₂O(g), how many litres of O₂ at STP are required to react completely with 44.8 L of H₂?',
    options: ['11.2 L', '22.4 L', '44.8 L', '89.6 L'],
    correctAnswer: 1,
    explanation:
      'By Gay Lussac’s Law and coefficients, volume ratio H₂ : O₂ = 2 : 1. So 44.8 L of H₂ requires 44.8 / 2 = 22.4 L of O₂.',
    hint: 'Use the balanced equation coefficients directly as volume ratios.',
  },
  {
    id: 8,
    nodeId: 'c10_chem_037',
    title: 'Strong vs Weak Electrolytes',
    question: 'Which of the following aqueous solutions contains BOTH molecules and ions?',
    options: ['Sodium Chloride (NaCl)', 'Hydrochloric Acid (HCl)', 'Acetic Acid (CH₃COOH)', 'Glucose (C₆H₁₂O₆)'],
    correctAnswer: 2,
    explanation:
      'Acetic acid (CH₃COOH) is a weak electrolyte. It ionises partially in water, establishing an equilibrium containing both un-ionised molecules and ions (CH₃COO⁻ & H⁺).',
    hint: 'Weak electrolytes ionise partially, leaving intact molecules alongside ions.',
  },
  {
    id: 9,
    nodeId: 'c10_chem_038',
    title: 'Electrolysis Mechanism',
    question: 'During electrolysis, what process occurs at the CATHODE?',
    options: [
      'Anions lose electrons (Oxidation)',
      'Cations gain electrons (Reduction)',
      'Anions gain electrons (Reduction)',
      'Cations lose electrons (Oxidation)',
    ],
    correctAnswer: 1,
    explanation:
      'The cathode is the negative electrode. Positively charged cations migrate to it and gain electrons. Gain of electrons is REDUCTION. Remember: RED CAT.',
    hint: 'Think: RED CAT (REDuction at CAThode).',
  },
  {
    id: 10,
    nodeId: 'c10_chem_040',
    title: 'Selective Discharge of Ions',
    question:
      'When concentrated aqueous NaCl (brine) is electrolysed with carbon electrodes, why is Chlorine gas produced at the anode instead of Oxygen?',
    options: [
      'Cl⁻ is lower in the electrochemical series than OH⁻',
      'High concentration of Cl⁻ overrides the normal discharge position of OH⁻',
      'OH⁻ ions are repelled by the carbon anode',
      'Sodium metal dissolves the OH⁻ ions',
    ],
    correctAnswer: 1,
    explanation:
      'Although OH⁻ normally discharges before Cl⁻ based on the activity series, the very high concentration of Cl⁻ in brine overrides the series position, resulting in Cl⁻ being discharged as Cl₂ gas.',
    hint: 'High concentration of halide ions can override the activity series preference!',
  },
];

// ----------------------------------------------------------------------
// VISUAL COMPONENTS
// ----------------------------------------------------------------------

// Visual 1: Gas Balance Visualizer for Vapour Density
const VdBalanceVisualizer: React.FC<{ selectedGas: GasData; setSelectedGas: (g: GasData) => void }> = ({
  selectedGas,
  setSelectedGas,
}) => {
  const [volumeL, setVolumeL] = useState<number>(22.4);
  const hydrogenMass = useMemo(() => (volumeL / 22.4) * 2, [volumeL]);
  const gasMass = useMemo(() => (volumeL / 22.4) * selectedGas.molMass, [volumeL, selectedGas]);
  const calculatedVD = useMemo(() => (hydrogenMass > 0 ? gasMass / hydrogenMass : 0), [gasMass, hydrogenMass]);

  return (
    <div className="flex flex-col gap-4 bg-slate-900/90 p-5 rounded-2xl border border-cyan-500/30 text-white">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
          <span>⚖️</span> Gas Mass Balance & Vapour Density
        </h3>
        <div className="flex gap-2">
          {GASES.map((g) => (
            <button
              key={g.formula}
              onClick={() => {
                setSelectedGas(g);
                audioManager.play('pop');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedGas.formula === g.formula
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {g.name} ({g.formula})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Balance Simulation */}
        <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <svg viewBox="0 0 400 240" className="w-full h-48">
            {/* Balance Fulcrum */}
            <polygon points="200,180 180,220 220,220" fill="#64748b" />
            <rect x="150" y="220" width="100" height="10" rx="2" fill="#475569" />

            {/* Beam with tilt according to mass difference */}
            <g
              transform={`rotate(${Math.min(
                Math.max((gasMass - hydrogenMass) * 0.3, -15),
                15
              )}, 200, 180)`}
              className="transition-transform duration-500 ease-out"
            >
              <rect x="40" y="176" width="320" height="8" rx="4" fill="#94a3b8" />

              {/* Left Flask - H2 */}
              <line x1="80" y1="184" x2="80" y2="210" stroke="#cbd5e1" strokeWidth="2" />
              <g transform="translate(55, 110)">
                <ellipse cx="25" cy="50" rx="30" ry="25" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
                <rect x="18" y="15" width="14" height="15" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" />
                <text x="25" y="55" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                  H₂ Ref
                </text>
                <text x="25" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  {hydrogenMass.toFixed(2)} g
                </text>
              </g>

              {/* Right Flask - Selected Gas */}
              <line x1="320" y1="184" x2="320" y2="210" stroke="#cbd5e1" strokeWidth="2" />
              <g transform="translate(295, 110)">
                <ellipse cx="25" cy="50" rx="30" ry="25" fill={selectedGas.color} fillOpacity="0.25" stroke={selectedGas.color} strokeWidth="2" />
                <rect x="18" y="15" width="14" height="15" fill={selectedGas.color} fillOpacity="0.4" stroke={selectedGas.color} />
                <text x="25" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                  {selectedGas.formula}
                </text>
                <text x="25" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  {gasMass.toFixed(2)} g
                </text>
              </g>
            </g>
          </svg>

          {/* Volume Slider */}
          <div className="w-full mt-2 px-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Gas Volume (STP):</span>
              <span className="text-cyan-400 font-bold">{volumeL.toFixed(1)} Litres</span>
            </div>
            <input
              type="range"
              min="5.6"
              max="44.8"
              step="5.6"
              value={volumeL}
              onChange={(e) => {
                setVolumeL(parseFloat(e.target.value));
                audioManager.play('tap');
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Math & Proof Display */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <div className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-2">
            Experimental Deduction
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-900 p-2 rounded">
              <span className="text-slate-400">Mass of {volumeL} L of {selectedGas.name}:</span>
              <span className="text-emerald-400 font-bold">{gasMass.toFixed(2)} g</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900 p-2 rounded">
              <span className="text-slate-400">Mass of {volumeL} L of H₂ (at same T,P):</span>
              <span className="text-sky-400 font-bold">{hydrogenMass.toFixed(2)} g</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-cyan-500/30">
              <span className="text-slate-300 font-semibold">Vapour Density (V.D.):</span>
              <span className="text-cyan-400 font-bold text-sm">
                {gasMass.toFixed(2)} / {hydrogenMass.toFixed(2)} = {calculatedVD.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-2 bg-gradient-to-r from-cyan-950 to-indigo-950 p-3 rounded-lg border border-cyan-500/40 text-center">
            <div className="text-xs text-cyan-300 uppercase font-bold tracking-wider mb-1">
              Core Relationship
            </div>
            <div className="text-lg font-extrabold text-white">
              Molecular Mass = 2 × V.D.
            </div>
            <div className="text-xs text-cyan-200 mt-1">
              2 × {selectedGas.vd} = <span className="font-bold text-emerald-400">{selectedGas.molMass}</span> g/mol
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Visual 2: Empirical & Molecular Formula Interactive Calculator
const EmpiricalFormulaVisualizer: React.FC = () => {
  const [selectedCompound, setSelectedCompound] = useState<CompoundData>(PRESET_COMPOUNDS[0]);

  return (
    <div className="flex flex-col gap-4 bg-slate-900/90 p-5 rounded-2xl border border-purple-500/30 text-white">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
          <span>🧪</span> Empirical to Molecular Formula Workstep
        </h3>
        <div className="flex gap-2">
          {PRESET_COMPOUNDS.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setSelectedCompound(c);
                audioManager.play('pop');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedCompound.name === c.name
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <thead>
            <tr className="bg-slate-950 text-purple-300 border-b border-slate-800">
              <th className="p-2">Element</th>
              <th className="p-2">% Mass</th>
              <th className="p-2">Atomic Mass</th>
              <th className="p-2">Moles of Atoms (% / At. Mass)</th>
              <th className="p-2">Simplest Ratio (÷ smallest)</th>
            </tr>
          </thead>
          <tbody>
            {selectedCompound.elements.map((el) => {
              const moles = el.massPct / el.atomicMass;
              const smallestMoles = Math.min(
                ...selectedCompound.elements.map((e) => e.massPct / e.atomicMass)
              );
              const ratio = Math.round(moles / smallestMoles);
              return (
                <tr key={el.symbol} className="border-b border-slate-800 hover:bg-slate-850">
                  <td className="p-2 font-bold text-white text-sm">{el.symbol}</td>
                  <td className="p-2 text-cyan-400 font-mono">{el.massPct}%</td>
                  <td className="p-2 text-slate-400">{el.atomicMass}</td>
                  <td className="p-2 font-mono text-purple-300">{moles.toFixed(3)}</td>
                  <td className="p-2 font-bold text-emerald-400 text-sm">{ratio}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">1. Empirical Formula</span>
          <span className="text-xl font-extrabold text-purple-400">{selectedCompound.empFormula}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block mb-1">2. V.D. = {selectedCompound.vd}</span>
          <span className="text-sm font-bold text-cyan-300 block">
            Mol. Mass = 2 × {selectedCompound.vd} = {selectedCompound.vd * 2}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">
            n = {selectedCompound.vd * 2} / Emp. Mass
          </span>
        </div>
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-3 rounded-xl border border-purple-400/50 text-center">
          <span className="text-xs text-purple-200 block mb-1">3. Molecular Formula</span>
          <span className="text-xl font-extrabold text-emerald-300">{selectedCompound.molFormula}</span>
        </div>
      </div>
    </div>
  );
};

// Visual 3: Mole Concept & Gas Volume Interactive Triangle
const MoleTriangleVisualizer: React.FC = () => {
  const [moles, setMoles] = useState<number>(1.0);
  const [selectedGas, setSelectedGas] = useState<GasData>(GASES[1]); // Oxygen

  const massGrams = useMemo(() => moles * selectedGas.molMass, [moles, selectedGas]);
  const volumeSTP = useMemo(() => moles * 22.4, [moles]);
  const particleCount = useMemo(() => moles * 6.022, [moles]); // in 10^23

  return (
    <div className="flex flex-col gap-4 bg-slate-900/90 p-5 rounded-2xl border border-emerald-500/30 text-white">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
          <span>📐</span> The Mole Conversion Triangle
        </h3>
        <select
          value={selectedGas.formula}
          onChange={(e) => {
            const found = GASES.find((g) => g.formula === e.target.value);
            if (found) setSelectedGas(found);
            audioManager.play('pop');
          }}
          className="bg-slate-950 text-emerald-300 border border-emerald-500/40 rounded-lg px-3 py-1 text-xs font-semibold focus:outline-none"
        >
          {GASES.map((g) => (
            <option key={g.formula} value={g.formula}>
              {g.name} ({g.formula}) - Molar Mass: {g.molMass} g
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {/* Mass Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">Mass (grams)</span>
            <div className="text-2xl font-black text-rose-300 my-2">{massGrams.toFixed(2)} g</div>
          </div>
          <span className="text-[11px] text-slate-400 bg-rose-950/40 p-1.5 rounded border border-rose-500/20">
            Mass = Moles × Molar Mass ({selectedGas.molMass} g)
          </span>
        </div>

        {/* Central Moles Card */}
        <div className="bg-gradient-to-b from-emerald-950 to-slate-950 p-4 rounded-xl border-2 border-emerald-400 flex flex-col justify-between shadow-lg shadow-emerald-500/20">
          <div>
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Amount of Substance</span>
            <div className="text-3xl font-black text-emerald-300 my-2">{moles.toFixed(2)} Moles</div>
          </div>
          <div className="px-2">
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={moles}
              onChange={(e) => {
                setMoles(parseFloat(e.target.value));
                audioManager.play('tap');
              }}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Volume at STP Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/30 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">Volume at S.T.P.</span>
            <div className="text-2xl font-black text-sky-300 my-2">{volumeSTP.toFixed(2)} Litres</div>
          </div>
          <span className="text-[11px] text-slate-400 bg-sky-950/40 p-1.5 rounded border border-sky-500/20">
            Volume = Moles × 22.4 L
          </span>
        </div>
      </div>

      {/* Particle Count Bar */}
      <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/30 flex justify-between items-center text-xs">
        <span className="text-purple-300 font-semibold">Total Particle Count (Avogadro):</span>
        <span className="text-purple-400 font-bold font-mono text-sm">
          {particleCount.toFixed(3)} × 10²³ molecules of {selectedGas.formula}
        </span>
      </div>
    </div>
  );
};

// Visual 4: Electrolytic Cell & Ion Migration Simulator
const ElectrolyticCellVisualizer: React.FC = () => {
  const [electrolyteType, setElectrolyteType] = useState<'molten_pbbr2' | 'brine' | 'cuso4_cu'>('molten_pbbr2');
  const [isPowerOn, setIsPowerOn] = useState<boolean>(true);

  // Animate ions moving
  const [ticks, setTicks] = useState<number>(0);
  useEffect(() => {
    if (!isPowerOn) return;
    const interval = setInterval(() => {
      setTicks((t) => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [isPowerOn]);

  const cellDetails = useMemo(() => {
    switch (electrolyteType) {
      case 'molten_pbbr2':
        return {
          title: 'Molten Lead(II) Bromide (PbBr₂)',
          cations: ['Pb²⁺'],
          anions: ['Br⁻'],
          cathodeProduct: 'Silvery molten Lead (Pb)',
          anodeProduct: 'Reddish-brown Bromine gas (Br₂)',
          cathodeReaction: 'Pb²⁺ + 2e⁻ → Pb (Reduction)',
          anodeReaction: '2Br⁻ → Br₂ + 2e⁻ (Oxidation)',
          isWeak: false,
        };
      case 'brine':
        return {
          title: 'Concentrated Aqueous NaCl (Brine)',
          cations: ['Na⁺', 'H⁺'],
          anions: ['Cl⁻', 'OH⁻'],
          cathodeProduct: 'Hydrogen gas (H₂) [H⁺ lower than Na⁺]',
          anodeProduct: 'Chlorine gas (Cl₂) [Cl⁻ high conc. overrides OH⁻]',
          cathodeReaction: '2H⁺ + 2e⁻ → H₂ (Reduction)',
          anodeReaction: '2Cl⁻ → Cl₂ + 2e⁻ (Oxidation)',
          isWeak: false,
        };
      case 'cuso4_cu':
        return {
          title: 'Aqueous CuSO₄ with Copper Electrodes',
          cations: ['Cu²⁺', 'H⁺'],
          anions: ['SO₄²⁻', 'OH⁻'],
          cathodeProduct: 'Copper metal deposited (Cu)',
          anodeProduct: 'Copper Anode dissolves into Cu²⁺',
          cathodeReaction: 'Cu²⁺ + 2e⁻ → Cu (Reduction)',
          anodeReaction: 'Cu → Cu²⁺ + 2e⁻ (Active Anode Oxidation)',
          isWeak: false,
        };
    }
  }, [electrolyteType]);

  return (
    <div className="flex flex-col gap-4 bg-slate-900/90 p-5 rounded-2xl border border-yellow-500/30 text-white">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
          <span>⚡</span> Electrolytic Cell & Ion Migration
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPowerOn(!isPowerOn);
              audioManager.play('tap');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              isPowerOn ? 'bg-emerald-500 text-slate-950' : 'bg-rose-600 text-white'
            }`}
          >
            Power: {isPowerOn ? 'ON' : 'OFF'}
          </button>
          <select
            value={electrolyteType}
            onChange={(e) => {
              setElectrolyteType(e.target.value as any);
              audioManager.play('pop');
            }}
            className="bg-slate-950 text-yellow-300 border border-yellow-500/40 rounded-lg px-3 py-1 text-xs font-semibold focus:outline-none"
          >
            <option value="molten_pbbr2">Molten PbBr₂ (Inert Pt/Graphite)</option>
            <option value="brine">Concentrated Aqueous NaCl (Brine)</option>
            <option value="cuso4_cu">Aqueous CuSO₄ (Active Cu Electrodes)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Electrolytic Tank Animation */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative flex flex-col items-center">
          <svg viewBox="0 0 320 220" className="w-full h-52">
            {/* Battery & Circuit Wires */}
            <path d="M 80 50 L 80 20 L 240 20 L 240 50" stroke="#f59e0b" strokeWidth="3" fill="none" />
            {/* Battery Symbol */}
            <g transform="translate(145, 10)">
              <line x1="0" y1="10" x2="30" y2="10" stroke="#ef4444" strokeWidth="4" />
              <line x1="10" y1="0" x2="10" y2="20" stroke="#ef4444" strokeWidth="4" />
              <line x1="20" y1="5" x2="20" y2="15" stroke="#3b82f6" strokeWidth="3" />
            </g>

            {/* Beaker / Crucible Container */}
            <path d="M 40 70 L 40 200 C 40 210, 280 210, 280 200 L 280 70" stroke="#94a3b8" strokeWidth="3" fill="none" />
            {/* Electrolyte Solution */}
            <path d="M 42 90 L 42 198 C 42 208, 278 208, 278 198 L 278 90 Z" fill="#0284c7" fillOpacity="0.3" />

            {/* Anode (+ Electrode) */}
            <rect x="70" y="50" width="20" height="120" fill="#dc2626" rx="2" />
            <text x="80" y="42" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">
              ANODE (+)
            </text>

            {/* Cathode (- Electrode) */}
            <rect x="230" y="50" width="20" height="120" fill="#2563eb" rx="2" />
            <text x="240" y="42" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">
              CATHODE (-)
            </text>

            {/* Animated Ions in Electrolyte */}
            {isPowerOn && (
              <>
                {/* Anions migrating to Anode (Left) */}
                {cellDetails.anions.map((anion, i) => {
                  const xPos = 180 - ((ticks * 3 + i * 35) % 95);
                  const yPos = 110 + i * 25;
                  return (
                    <g key={`anion-${i}-${xPos}`}>
                      <circle cx={xPos} cy={yPos} r="10" fill="#ef4444" fillOpacity="0.8" />
                      <text x={xPos} y={yPos + 3} textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                        {anion}
                      </text>
                    </g>
                  );
                })}

                {/* Cations migrating to Cathode (Right) */}
                {cellDetails.cations.map((cation, i) => {
                  const xPos = 100 + ((ticks * 3 + i * 35) % 115);
                  const yPos = 120 + i * 25;
                  return (
                    <g key={`cation-${i}-${xPos}`}>
                      <circle cx={xPos} cy={yPos} r="10" fill="#3b82f6" fillOpacity="0.8" />
                      <text x={xPos} y={yPos + 3} textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                        {cation}
                      </text>
                    </g>
                  );
                })}
              </>
            )}
          </svg>

          <span className="text-xs text-slate-400 mt-1">
            Current Flow: Electrons move Anode → Battery → Cathode
          </span>
        </div>

        {/* Electrode Reaction Summary */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
            {cellDetails.title}
          </div>

          <div className="bg-slate-900 p-2.5 rounded border-l-4 border-red-500">
            <span className="text-xs font-bold text-red-400 block">ANODE (Oxidation - Loss of e⁻)</span>
            <span className="text-xs text-slate-300 font-mono block mt-1">{cellDetails.anodeReaction}</span>
            <span className="text-[11px] text-red-300 block mt-0.5">Product: {cellDetails.anodeProduct}</span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded border-l-4 border-blue-500">
            <span className="text-xs font-bold text-blue-400 block">CATHODE (Reduction - Gain of e⁻)</span>
            <span className="text-xs text-slate-300 font-mono block mt-1">{cellDetails.cathodeReaction}</span>
            <span className="text-[11px] text-blue-300 block mt-0.5">Product: {cellDetails.cathodeProduct}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Visual 5: Metallic vs Electrolytic Conduction Comparison Table
const ConductionComparisonVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900/90 p-5 rounded-2xl border border-blue-500/30 text-white flex flex-col gap-4">
      <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
        <span>🔄</span> Metallic Conduction vs Electrolytic Conduction
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metallic Conduction */}
        <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/30 flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-sm font-bold text-sky-400">Metallic Conduction</span>
            <span className="text-xs text-slate-400 bg-sky-950 px-2 py-0.5 rounded">e.g., Copper Wire</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 mt-1">
            <li className="flex gap-2">
              <span className="text-sky-400">▪</span>
              <span>
                <strong>Charge Carriers:</strong> Free mobile electrons.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-sky-400">▪</span>
              <span>
                <strong>Chemical Change:</strong> NO chemical change occurs (purely physical process).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-sky-400">▪</span>
              <span>
                <strong>Transfer of Matter:</strong> NO transfer of matter takes place.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-sky-400">▪</span>
              <span>
                <strong>Temperature Effect:</strong> Conductivity <em>decreases</em> with rise in temperature due to lattice cation vibration.
              </span>
            </li>
          </ul>
        </div>

        {/* Electrolytic Conduction */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-sm font-bold text-amber-400">Electrolytic Conduction</span>
            <span className="text-xs text-slate-400 bg-amber-950 px-2 py-0.5 rounded">e.g., Molten NaCl / Solution</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 mt-1">
            <li className="flex gap-2">
              <span className="text-amber-400">▪</span>
              <span>
                <strong>Charge Carriers:</strong> Free mobile ions (cations & anions).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-400">▪</span>
              <span>
                <strong>Chemical Change:</strong> Chemical decomposition occurs at electrodes.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-400">▪</span>
              <span>
                <strong>Transfer of Matter:</strong> Transfer of matter occurs as ions migrate.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-400">▪</span>
              <span>
                <strong>Temperature Effect:</strong> Conductivity <em>increases</em> with rise in temperature (increases ion mobility and dissociation).
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Believing Vapour Density Has Units of Physical Density",
    description: "Students often believe vapour density has physical units such as grams per litre or grams per cubic centimetre because of the word 'density' in its name. They confuse relative vapour density with absolute density.",
    correction: "Vapour density is a relative comparison defined as the ratio of the mass of a gas volume to the mass of an equal volume of hydrogen under identical conditions. Because it is a ratio of two identical physical quantities, vapour density is a dimensionless pure number without units. Absolute density, on the other hand, measures mass per unit volume and possesses units like g/L.",
  },
  {
    id: "misc_2",
    title: "Confusing the Relationship Between Molecular Mass and Vapour Density",
    description: "Students frequently invert the standard formula and write Vapour Density as twice the Molecular Mass instead of half of it. They get confused about whether to multiply or divide when calculating molecular weight from vapour density.",
    correction: "According to Avogadro's law, equal volumes of gases contain equal numbers of molecules under identical conditions. Since reference hydrogen gas is diatomic (H2) with a molecular mass of 2, Vapour Density equals Molecular Mass divided by 2 (VD = M / 2). Consequently, Molecular Mass is always double the Vapour Density (M = 2 × VD).",
  },
  {
    id: "misc_3",
    title: "Assuming Vapour Density Varies with Changing Temperature and Pressure",
    description: "Students often assume that heating or compressing a gas changes its vapour density because normal gas density changes with temperature and pressure. They incorrectly apply the ideal gas law (PV = nRT) to alter the VD value.",
    correction: "Vapour density is measured by comparing a gas to hydrogen under identical temperature and pressure conditions. When temperature or pressure changes, the densities of both the sample gas and hydrogen gas alter by the exact same proportion according to the ideal gas law. As a result, their ratio remains constant, making vapour density independent of experimental temperature and pressure changes.",
  },
  {
    id: "misc_4",
    title: "Misinterpreting the Displaced Air Volume in Victor Meyer Method",
    description: "In the Victor Meyer method, students mistakenly assume that the volume of air displaced equals the volume of the small liquid sample introduced into the tube. They forget that the liquid completely vaporizes before displacing air.",
    correction: "The Victor Meyer method involves volatilizing a known mass of a liquid so that its vapour expands rapidly inside the outer tube. This generated vapour displaces an equal volume of air into a graduated tube collected over water. Thus, the measured volume of displaced air corresponds to the volume of the vapour at experimental conditions, not the initial liquid volume.",
  },
  {
    id: "misc_5",
    title: "Using Atomic Weight Instead of Molecular Mass for Polyatomic Elements",
    description: "Students frequently use atomic weight instead of molecular mass when calculating the vapour density of elemental vapours like phosphorus (P4) or sulphur (S8). They assume elemental substances only require atomic weight in the VD = M / 2 formula.",
    correction: "Vapour density depends on the mass of molecules present in the vapour phase relative to hydrogen molecules. Polyatomic elements exist as multi-atom molecules in the gas phase, meaning their effective molar mass is a multiple of their atomic weight. Therefore, the true relative molecular mass of the vapour species must be used to calculate vapour density correctly.",
  },
];

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function C10_ChemistryVapourdensityandmolecularmassSim() {
  // Navigation / Tabs State
  const [activeTab, setActiveTab] = useState<'predict' | 'slides' | 'lab' | 'challenges' | 'summary'>('predict');

  // Discovery Diagnostic Question State
  const [predictAnswer, setPredictAnswer] = useState<number | null>(null);
  const [hasPredicted, setHasPredicted] = useState<boolean>(false);

  // Lesson Slides State
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [selectedGas, setSelectedGas] = useState<GasData>(GASES[3]); // CO2

  // Interactive Lab Active Tool
  const [labTool, setLabTool] = useState<'vd' | 'emp' | 'mole' | 'cell' | 'conduction'>('vd');

  // Challenges / SRS / BKT State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);

  // BKT States per node
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Partial<Record<NodeId, ReturnType<typeof createBKTState>>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // Current Slide details
  const currentSlide = TEACHING_SLIDES[currentSlideIndex];
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Auto-hint timer (10s)
  useEffect(() => {
    if (activeTab === 'challenges' && !isAnswerSubmitted) {
      const timer = setTimeout(() => {
        setShowHint(true);
        audioManager.play('hint');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [activeTab, currentChallengeIdx, isAnswerSubmitted]);

  // Handle Predict Submission
  const handlePredictSubmit = (index: number) => {
    setPredictAnswer(index);
    setHasPredicted(true);
    if (index === 1) {
      audioManager.play('drop-correct');
      speechManager.speak('Spot on! Doubling vapour density gives the true molecular mass.');
      speechManager.speak('Great job! Keep going.');
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite. Remember that hydrogen gas is H 2, which has a mass of 2.');
    }
  };

  // Handle Challenge Answer
  const handleChallengeSubmit = (optionIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedChallengeOption(optionIdx);
    setIsAnswerSubmitted(true);

    const isCorrect = optionIdx === currentChallenge.correctAnswer;
    const currentNodeId = currentChallenge.nodeId;

    // BKT & SRS Update
    const updatedBKT = bktUpdate(bktStates[currentNodeId], isCorrect);
    setBktStates((prev) => ({ ...prev, [currentNodeId]: updatedBKT }));

    const srsItem = createReviewItem(currentChallenge.id.toString(), 'Chemistry');
    const updatedSRS = sm2Update(srsItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      setScore((s) => s + 10);
      setShowConfetti(true);
      setShowSparkle(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Excellent work! You applied the chemical relationship correctly.');
      setTimeout(() => {
        setShowConfetti(false);
        setShowSparkle(false);
        setShowSuccessBanner(false);
      }, 3000);
    } else {
      audioManager.play('error');
      speechManager.speak(currentChallenge.explanation);
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedChallengeOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
      audioManager.play('swoop');
    } else {
      setActiveTab('summary');
      audioManager.play('sparkle');
      recordGameScore(Object.values(ALL_NODE_IDS), score);
    }
  };

  // Render Visual based on Slide Type
  const renderSlideVisual = (type: Slide['visualType']) => {
    switch (type) {
      case 'vd_balance':
        return <VdBalanceVisualizer selectedGas={selectedGas} setSelectedGas={setSelectedGas} />;
      case 'emp_calc':
        return <EmpiricalFormulaVisualizer />;
      case 'mole_triangle':
        return <MoleTriangleVisualizer />;
      case 'electrolysis_cell':
        return <ElectrolyticCellVisualizer />;
      case 'conduction_comp':
        return <ConductionComparisonVisualizer />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Top Header */}
      <header className="w-full max-w-5xl flex flex-wrap justify-between items-center bg-slate-900/80 p-4 rounded-2xl border border-slate-800 mb-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold border border-cyan-500/30">
            🧪
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              Vapour Density, Mole Concept & Electrolysis
            </h1>
            <span className="text-xs text-slate-400">ICSE Class 10 Chemistry Interactive Lab</span>
          </div>
        </div>

        {/* Global Nav Tabs */}
        <nav className="flex gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('predict')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'predict' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => setActiveTab('slides')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'slides' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Concepts
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'lab' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Virtual Lab
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'challenges' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Challenges ({score} pts)
          </button>
        </nav>
      </header>

      {/* Main Interactive Stage Container */}
      <main className="w-full max-w-5xl flex-1 flex flex-col">
        {/* ------------------------------------------------------------- */}
        {/* TAB 1: DISCOVERY (PREDICT BEFORE LEARN) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'predict' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-6"
          >
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Warm-up Discovery Question
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Predict the Mystery Weight of Gas
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Suppose you have two identical sealed flasks at the exact same temperature and pressure. Flask A contains Hydrogen gas (H₂) weighing 2 grams. Flask B contains an unknown gas X and weighs 44 grams. What is the molecular mass of Gas X?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: '22 (The exact mass ratio)', correct: false },
                { label: '44 (Twice the mass ratio, because H₂ = 2)', correct: true },
                { label: '88 (Four times the mass ratio)', correct: false },
                { label: 'Not enough information without knowing temperature', correct: false },
              ].map((opt, i) => (
                <button
                  key={i}
                  disabled={hasPredicted}
                  onClick={() => handlePredictSubmit(i)}
                  className={`p-4 rounded-xl border text-left text-sm font-semibold transition flex items-center justify-between ${
                    hasPredicted
                      ? i === 1
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : i === predictAnswer
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-850'
                  }`}
                >
                  <span>{opt.label}</span>
                  {hasPredicted && i === 1 && <span className="text-emerald-400 text-lg">✓</span>}
                </button>
              ))}
            </div>

            {hasPredicted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-3"
              >
                <p className="text-sm text-slate-300">
                  <strong className="text-cyan-400">Insight:</strong> The mass ratio is 44 / 2 = 22. This ratio is called the <strong>Vapour Density (V.D.)</strong>. Because one mole of hydrogen gas (H₂) weighs 2 g, multiplying the Vapour Density by 2 restores the true relative molecular mass (2 × 22 = 44).
                </p>
                <button
                  onClick={() => setActiveTab('slides')}
                  className="self-end px-5 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition"
                >
                  Continue to Guided Visual Lessons →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: VISUAL GUIDED LESSON SLIDES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'slides' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Slide Navigation Header */}
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold bg-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  Concept {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <h2 className="text-lg font-bold text-white">{currentSlide.title}</h2>
              </div>
              <div className="flex gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    setCurrentSlideIndex((p) => p - 1);
                    audioManager.play('tap');
                  }}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg disabled:opacity-40 hover:bg-slate-700"
                >
                  ← Prev
                </button>
                <button
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setCurrentSlideIndex((p) => p + 1);
                    audioManager.play('tap');
                  }}
                  className="px-3 py-1.5 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg disabled:opacity-40 hover:bg-cyan-400"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Slide Visual Interactive Area */}
            {renderSlideVisual(currentSlide.visualType)}

            {/* Explanatory Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  Core Theory
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{currentSlide.conceptText}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Simple Analogy (ELI5)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentSlide.eli5}</p>
                </div>

                <div className="mt-3 bg-amber-950/40 p-2.5 rounded-lg border border-amber-500/30">
                  <span className="text-[11px] font-bold text-amber-400 block">Common Misconception Warning:</span>
                  <span className="text-[11px] text-amber-200">{currentSlide.misconception}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: VIRTUAL INTERACTIVE LAB */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'lab' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Lab Switcher Bar */}
            <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
              <button
                onClick={() => {
                  setLabTool('vd');
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  labTool === 'vd' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-300'
                }`}
              >
                1. Vapour Density Balance
              </button>
              <button
                onClick={() => {
                  setLabTool('emp');
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  labTool === 'emp' ? 'bg-purple-500 text-white' : 'bg-slate-950 text-slate-300'
                }`}
              >
                2. Empirical Formula Calculator
              </button>
              <button
                onClick={() => {
                  setLabTool('mole');
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  labTool === 'mole' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-300'
                }`}
              >
                3. Mole Conversion Triangle
              </button>
              <button
                onClick={() => {
                  setLabTool('cell');
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  labTool === 'cell' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-950 text-slate-300'
                }`}
              >
                4. Electrolytic Cell Sandbox
              </button>
              <button
                onClick={() => {
                  setLabTool('conduction');
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  labTool === 'conduction' ? 'bg-blue-500 text-white' : 'bg-slate-950 text-slate-300'
                }`}
              >
                5. Conduction Comparison
              </button>
            </div>

            {/* Active Lab Component */}
            {labTool === 'vd' && (
              <VdBalanceVisualizer selectedGas={selectedGas} setSelectedGas={setSelectedGas} />
            )}
            {labTool === 'emp' && <EmpiricalFormulaVisualizer />}
            {labTool === 'mole' && <MoleTriangleVisualizer />}
            {labTool === 'cell' && <ElectrolyticCellVisualizer />}
            {labTool === 'conduction' && <ConductionComparisonVisualizer />}
          </motion.div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: ADAPTIVE CHALLENGE ARENA */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'challenges' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-6 relative"
          >
            <Confetti show={showConfetti} />
            <SparkleBurst show={showSparkle} x={400} y={200} />
            <SuccessBanner show={showSuccessBanner} text="Challenge Mastered!" />

            {/* Challenge Header & Progress Bar */}
            <div className="flex flex-col gap-2 border-b border-slate-800 pb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
                  Node: {currentChallenge.nodeId}
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-cyan-500 h-full transition-all duration-300"
                  style={{ width: `${((currentChallengeIdx + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div>
              <h2 className="text-base md:text-lg font-bold text-white leading-snug">
                {currentChallenge.question}
              </h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedChallengeOption === i;
                const isCorrect = i === currentChallenge.correctAnswer;
                let btnStyle =
                  'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500/40 hover:bg-slate-850';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-950 border-slate-800 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleChallengeSubmit(i)}
                    className={`p-4 rounded-xl border text-left text-xs md:text-sm font-semibold transition flex justify-between items-center ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Auto Hint & Explanation Section */}
            <HintBubble show={showHint && !isAnswerSubmitted} text={currentChallenge.hint} />

            {isAnswerSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3"
              >
                <div className="text-xs text-slate-300">
                  <strong className="text-cyan-400">Explanation: </strong>
                  {currentChallenge.explanation}
                </div>
                <button
                  onClick={handleNextChallenge}
                  className="self-end px-5 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Finish Mastery Session →'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: SUMMARY & MASTERY REPORT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'summary' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl border border-emerald-500/40">
              🏆
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">ICSE Chemistry Module Complete!</h2>
              <p className="text-xs text-slate-400 mt-1">
                You have mastered Vapour Density, Empirical Formulae, Mole Calculations, and Electrolysis.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 w-full max-w-md flex justify-around">
              <div>
                <span className="text-xs text-slate-400 block">Total Score</span>
                <span className="text-2xl font-black text-cyan-400">{score} pts</span>
              </div>
              <div className="border-r border-slate-800" />
              <div>
                <span className="text-xs text-slate-400 block">Nodes Covered</span>
                <span className="text-2xl font-black text-emerald-400">10 / 10</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentChallengeIdx(0);
                setSelectedChallengeOption(null);
                setIsAnswerSubmitted(false);
                setScore(0);
                setActiveTab('challenges');
                audioManager.play('pop');
              }}
              className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition text-xs"
            >
              Restart Practice Arena 🔄
            </button>
          </motion.div>
        )}
      </main>
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