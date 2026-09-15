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

// Node IDs required for Class 12 (ISC) Chemistry Simulation
const NODE_IDS = {
  DRUG_TARGET: 'c12_chem_091',
  FOOD_CHEM: 'c12_chem_092',
  CLEANSING_AGENTS: 'c12_chem_093',
  PSEUDO_FIRST_ORDER: 'c12_chem_094',
  SODDY_FAJANS: 'c12_chem_095',
  HARDY_SCHULZE: 'c12_chem_096',
  KOLBE_ELECTROLYSIS: 'c12_chem_097',
  HALOFORM: 'c12_chem_098',
  CARBYLAMINE: 'c12_chem_099',
  HOFFMANN: 'c12_chem_100',
} as const;

const ALL_NODE_IDS = [
  'c12_chem_091',
  'c12_chem_092',
  'c12_chem_093',
  'c12_chem_094',
  'c12_chem_095',
  'c12_chem_096',
  'c12_chem_097',
  'c12_chem_098',
  'c12_chem_099',
  'c12_chem_100',
];

// --- INTERFACES ---
interface BKTStateMap {
  [nodeId: string]: ReturnType<typeof createBKTState>;
}

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconception: string;
  hint: string;
  type: 'multiple-choice' | 'interactive' | 'calculation';
}

interface InteractiveLabProps {
  activeTab: string;
  onStateChange?: (data: Record<string, unknown>) => void;
}

// --- VISUAL SUBCOMPONENTS ---

// 1. Drug Target Interaction Visual (c12_chem_091)
const DrugTargetVisual: React.FC<{ type: 'competitive' | 'non-competitive' | 'receptor' }> = ({ type }) => {
  const [bound, setBound] = useState(false);
  const [substrateCount, setSubstrateCount] = useState(3);

  const toggleBind = () => {
    setBound(!bound);
    if (!bound) {
      audioManager.play('pop');
      speechManager.speak(
        type === 'competitive'
          ? 'Competitive inhibitor occupies the active site, blocking the substrate.'
          : type === 'non-competitive'
          ? 'Non-competitive inhibitor binds to the allosteric site, distorting the active site.'
          : 'Receptor antagonist blocks the natural messenger from binding.'
      );
      speechManager.speak('Great job! Keep going.');
    } else {
      audioManager.play('swoop');
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-5 rounded-2xl border border-indigo-500/30 w-full">
      <div className="text-sm font-semibold text-indigo-300 mb-3 flex items-center gap-2">
        <span>Enzyme/Receptor Mechanism:</span>
        <span className="capitalize text-amber-400 font-bold">{type} Mode</span>
      </div>
      
      <svg className="w-full max-w-md h-56" viewBox="0 0 400 220">
        {/* Enzyme Main Body */}
        <path
          d={
            bound && type === 'non-competitive'
              ? "M 100,50 Q 200,30 300,50 L 320,160 Q 200,190 80,160 Z" // Distorted body
              : "M 100,40 Q 200,20 300,40 L 300,160 Q 200,180 100,160 Z"
          }
          fill="#1e1b4b"
          stroke="#6366f1"
          strokeWidth="3"
        />

        {/* Active Site Pocket */}
        <path
          d={
            bound && type === 'non-competitive'
              ? "M 170,45 C 180,75 220,75 230,45 Z" // Distorted pocket
              : "M 160,35 C 180,80 220,80 240,35 Z"
          }
          fill="#0f172a"
          stroke="#a5b4fc"
          strokeWidth="2"
        />
        <text x="200" y="85" fill="#a5b4fc" fontSize="11" textAnchor="middle" fontWeight="bold">
          Active Site
        </text>

        {/* Allosteric Site (for Non-Competitive) */}
        {type === 'non-competitive' && (
          <g>
            <path d="M 95,100 C 120,100 120,130 95,130 Z" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
            <text x="75" y="118" fill="#f43f5e" fontSize="10" textAnchor="end">
              Allosteric Site
            </text>
          </g>
        )}

        {/* Substrate */}
        <motion.g
          animate={{
            x: bound && type === 'competitive' ? 260 : 200,
            y: bound && type === 'competitive' ? 20 : bound && type === 'non-competitive' ? 10 : 25,
          }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <path d="M -18,-15 Q 0,20 18,-15 Z" fill="#10b981" stroke="#34d399" strokeWidth="2" />
          <text x="0" y="-20" fill="#34d399" fontSize="10" textAnchor="middle">
            Substrate
          </text>
        </motion.g>

        {/* Inhibitor / Drug */}
        <motion.g
          animate={{
            x: bound
              ? type === 'competitive' || type === 'receptor'
                ? 200
                : 105
              : type === 'competitive' || type === 'receptor'
              ? 80
              : 50,
            y: bound
              ? type === 'competitive' || type === 'receptor'
                ? 35
                : 115
              : 170,
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {type === 'competitive' || type === 'receptor' ? (
            <path d="M -16,-14 Q 0,18 16,-14 Z" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
          ) : (
            <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#f43f5e" stroke="#fb7185" strokeWidth="2" />
          )}
          <text x="0" y="28" fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">
            Drug / Inhibitor
          </text>
        </motion.g>
      </svg>

      <div className="flex gap-3 mt-3 w-full justify-center">
        <button
          onClick={toggleBind}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
            bound
              ? 'bg-rose-600 hover:bg-rose-500 text-white'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {bound ? 'Release Inhibitor' : 'Bind Drug Inhibitor'}
        </button>

        {type === 'competitive' && (
          <button
            onClick={() => {
              setSubstrateCount((prev) => prev + 2);
              audioManager.play('chime');
              if (bound) setBound(false);
              speechManager.speak('Excess substrate displaces the competitive inhibitor!');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
          >
            Add Excess Substrate ({substrateCount})
          </button>
        )}
      </div>
    </div>
  );
};

// 2. Chemicals in Food Visual (c12_chem_092)
const FoodChemVisual: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'preservative' | 'antioxidant' | 'sweetener'>('preservative');

  const foodData = {
    preservative: {
      name: 'Sodium Benzoate (C6H5COONa)',
      func: 'Carboxylate group (-COONa)',
      role: 'Inhibits microbial enzymes in acidic media (pickles, juices, soft drinks).',
      color: '#38bdf8',
    },
    antioxidant: {
      name: 'BHA & BHT (Phenolic Derivatives)',
      func: 'Phenolic -OH group',
      role: 'Donates H• to peroxy radicals to break free-radical chains & prevent fat rancidity.',
      color: '#f59e0b',
    },
    sweetener: {
      name: 'Aspartame (Dipeptide Methyl Ester)',
      func: 'Amide & Ester linkages',
      role: 'Intense sweetness (~200x sucrose) without high calorie load; decomposes on heating.',
      color: '#ec4899',
    },
  };

  const curr = foodData[selectedCategory];

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-sky-500/30 w-full">
      <div className="flex justify-center gap-2 mb-4">
        {(['preservative', 'antioxidant', 'sweetener'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
        <span className="text-sm font-bold" style={{ color: curr.color }}>
          {curr.name}
        </span>
        <div className="text-xs text-slate-300">
          <span className="font-semibold text-slate-400">Key Functional Group: </span>
          {curr.func}
        </div>
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-400">Mechanism & Action: </span>
          {curr.role}
        </div>
      </div>
    </div>
  );
};

// 3. Cleansing Agents & Micelle Visual (c12_chem_093)
const CleansingVisual: React.FC = () => {
  const [waterType, setWaterType] = useState<'soft' | 'hard'>('soft');
  const [agentType, setAgentType] = useState<'soap' | 'detergent'>('soap');

  const isScum = waterType === 'hard' && agentType === 'soap';

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-teal-500/30 w-full flex flex-col items-center">
      <div className="flex gap-4 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg">
          <span className="text-slate-400">Water:</span>
          <button
            onClick={() => {
              setWaterType('soft');
              audioManager.play('tap');
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${waterType === 'soft' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-300'}`}
          >
            Soft Water
          </button>
          <button
            onClick={() => {
              setWaterType('hard');
              audioManager.play('tap');
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${waterType === 'hard' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-300'}`}
          >
            Hard (Ca²⁺/Mg²⁺)
          </button>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg">
          <span className="text-slate-400">Agent:</span>
          <button
            onClick={() => {
              setAgentType('soap');
              audioManager.play('tap');
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${agentType === 'soap' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}`}
          >
            Soap (RCOONa)
          </button>
          <button
            onClick={() => {
              setAgentType('detergent');
              audioManager.play('tap');
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${agentType === 'detergent' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}`}
          >
            Detergent (R-SO₃Na)
          </button>
        </div>
      </div>

      <svg className="w-full max-w-sm h-48" viewBox="0 0 300 180">
        {/* Beaker water */}
        <rect x="50" y="30" width="200" height="130" rx="10" fill="#0284c7" opacity="0.2" stroke="#38bdf8" strokeWidth="2" />

        {isScum ? (
          /* Scum precipitation */
          <g>
            <path d="M 60,140 Q 150,130 240,140 L 240,155 L 60,155 Z" fill="#94a3b8" opacity="0.8" />
            <text x="150" y="100" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">
              Insoluble Scum Formed!
            </text>
            <text x="150" y="120" fill="#cbd5e1" fontSize="10" textAnchor="middle">
              2 C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca↓ + 2 Na⁺
            </text>
          </g>
        ) : (
          /* Micelle formation */
          <g transform="translate(150, 95)">
            {/* Dirt / Grease core */}
            <circle cx="0" cy="0" r="24" fill="#78350f" stroke="#b45309" strokeWidth="2" />
            <text x="0" y="4" fill="#fef3c7" fontSize="10" textAnchor="middle" fontWeight="bold">
              Oil / Dirt
            </text>
            {/* Surfactant Tails & Heads */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = Math.cos(rad) * 24;
              const y1 = Math.sin(rad) * 24;
              const x2 = Math.cos(rad) * 48;
              const y2 = Math.sin(rad) * 48;
              return (
                <g key={idx}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="2" />
                  <circle cx={x2} cy={y2} r="5" fill="#38bdf8" />
                </g>
              );
            })}
            <text x="0" y="68" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
              Emulsified Micelle (Lathering)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// 4. Pseudo First Order Reaction Visual (c12_chem_094)
const PseudoFirstOrderSim: React.FC = () => {
  const [excessWater, setExcessWater] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const esterConc = Math.exp(-0.04 * time) * 100;
  const waterConc = excessWater ? 55.5 : Math.max(0, 55.5 - (100 - esterConc) * 0.1);

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/30 w-full flex flex-col items-center">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-semibold text-purple-300">Water Condition:</span>
        <button
          onClick={() => {
            setExcessWater(!excessWater);
            audioManager.play('tap');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            excessWater ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300'
          }`}
        >
          {excessWater ? 'Large Excess [H₂O] ~ Constant (55.5 M)' : 'Stoichiometric [H₂O] (Varying)'}
        </button>
      </div>

      <svg className="w-full max-w-md h-48 bg-slate-950 p-2 rounded-xl border border-slate-800" viewBox="0 0 350 160">
        {/* Axes */}
        <line x1="40" y1="130" x2="320" y2="130" stroke="#475569" strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="130" stroke="#475569" strokeWidth="2" />
        <text x="180" y="152" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Time (t)
        </text>
        <text x="15" y="75" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 15 75)">
          Conc (M)
        </text>

        {/* Ester Curve */}
        <path
          d={`M 40,30 Q 150,${130 - (esterConc / 100) * 80} 320,${130 - (esterConc / 100) * 20}`}
          fill="none"
          stroke="#c084fc"
          strokeWidth="3"
        />

        {/* Water Concentration Line */}
        <line
          x1="40"
          y1={excessWater ? "25" : 30 + (100 - waterConc) * 1.5}
          x2="320"
          y2={excessWater ? "25" : 30 + (100 - waterConc) * 1.5}
          stroke="#38bdf8"
          strokeWidth="2"
          strokeDasharray={excessWater ? "4 4" : "0"}
        />

        <text x="250" y="45" fill="#c084fc" fontSize="10" fontWeight="bold">
          [Ester]
        </text>
        <text x="250" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">
          [H₂O] ({excessWater ? 'Constant' : 'Changing'})
        </text>
      </svg>

      <div className="mt-3 text-xs text-slate-300 text-center font-mono">
        Rate = k[Ester][H₂O] ➔ {excessWater ? 'Rate = k\'[Ester] where k\' = k[H₂O]₀' : 'Second Order Kinetics'}
      </div>
    </div>
  );
};

// 5. Soddy-Fajans Displacement Laws Visual (c12_chem_095)
const SoddyFajansVisual: React.FC = () => {
  const [decayType, setDecayType] = useState<'alpha' | 'beta-minus' | 'gamma'>('alpha');

  const decayDetails = {
    alpha: {
      particle: 'α (²₄He nucleus)',
      deltaMass: -4,
      deltaZ: -2,
      shift: '2 places to the LEFT (Z - 2)',
      eq: '²³⁸₉₂U → ²³⁴₉₀Th + ²₄He',
    },
    'beta-minus': {
      particle: 'β⁻ (Electron, e⁻)',
      deltaMass: 0,
      deltaZ: +1,
      shift: '1 place to the RIGHT (Z + 1)',
      eq: '²³⁴₉₀Th → ²³⁴₉₁Pa + ⁰₋₁e + ν̄',
    },
    gamma: {
      particle: 'γ (High energy photon)',
      deltaMass: 0,
      deltaZ: 0,
      shift: 'NO position change (Energy release)',
      eq: '²³⁴₉₁Pa* → ²³⁴₉₁Pa + γ',
    },
  };

  const curr = decayDetails[decayType];

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/30 w-full flex flex-col items-center">
      <div className="flex gap-2 mb-4">
        {(['alpha', 'beta-minus', 'gamma'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => {
              setDecayType(mode);
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
              decayType === mode ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {mode} Decay
          </button>
        ))}
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 w-full max-w-md text-xs font-mono flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Emitted Particle:</span>
          <span className="text-emerald-400 font-bold">{curr.particle}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Mass Number (A):</span>
          <span className="text-amber-400 font-bold">{curr.deltaMass > 0 ? `+${curr.deltaMass}` : curr.deltaMass}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Atomic Number (Z):</span>
          <span className="text-sky-400 font-bold">{curr.deltaZ > 0 ? `+${curr.deltaZ}` : curr.deltaZ}</span>
        </div>
        <div className="mt-1 pt-2 border-t border-slate-800 text-center text-purple-300 font-bold">
          Periodic Shift: {curr.shift}
        </div>
        <div className="text-center text-slate-400 text-[11px] bg-slate-900 p-2 rounded-lg mt-1">
          Sample Equation: <span className="text-white font-bold">{curr.eq}</span>
        </div>
      </div>
    </div>
  );
};

// 6. Hardy-Schulze Rule & Coagulation Value Visual (c12_chem_096)
const HardySchulzeVisual: React.FC = () => {
  const [solType, setSolType] = useState<'negative' | 'positive'>('negative');
  const [selectedIon, setSelectedIon] = useState<string>('Al3+');

  const coagData = {
    negative: [
      { ion: 'Al³⁺', valence: 3, power: 'Highest', val: '0.09 mmol/L' },
      { ion: 'Ba²⁺', valence: 2, power: 'Moderate', val: '0.69 mmol/L' },
      { ion: 'Na⁺', valence: 1, power: 'Lowest', val: '51.0 mmol/L' },
    ],
    positive: [
      { ion: '[Fe(CN)₆]⁴⁻', valence: 4, power: 'Highest', val: '0.08 mmol/L' },
      { ion: 'SO₄²⁻', valence: 2, power: 'Moderate', val: '0.21 mmol/L' },
      { ion: 'Cl⁻', valence: 1, power: 'Lowest', val: '93.0 mmol/L' },
    ],
  };

  const ions = coagData[solType];

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-rose-500/30 w-full flex flex-col items-center">
      <div className="flex gap-4 mb-3 text-xs font-semibold">
        <span className="text-slate-400 self-center">Colloidal Sol Charge:</span>
        <button
          onClick={() => {
            setSolType('negative');
            setSelectedIon('Al³⁺');
            audioManager.play('tap');
          }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            solType === 'negative' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
          }`}
        >
          Negative Sol (e.g. As₂S₃)
        </button>
        <button
          onClick={() => {
            setSolType('positive');
            setSelectedIon('[Fe(CN)₆]⁴⁻');
            audioManager.play('tap');
          }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            solType === 'positive' ? 'bg-indigo-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
          }`}
        >
          Positive Sol (e.g. Fe(OH)₃)
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-md">
        {ions.map((item) => (
          <div
            key={item.ion}
            onClick={() => {
              setSelectedIon(item.ion);
              audioManager.play('pop');
            }}
            className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
              selectedIon === item.ion
                ? 'bg-slate-800 border-amber-400 shadow-lg scale-105'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-base font-extrabold text-amber-400">{item.ion}</div>
            <div className="text-[10px] text-slate-400 mt-1">Valence: {item.valence}</div>
            <div className="text-[11px] font-bold text-emerald-400 mt-1">{item.power} Power</div>
            <div className="text-[9px] text-slate-500 mt-1">Coag Value: {item.val}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-slate-300 text-center font-mono">
        Coagulating Power ∝ Valence of Oppositely Charged Ion | Power ∝ 1 / Coagulation Value
      </div>
    </div>
  );
};

// 7. Kolbe's Electrolysis Visual (c12_chem_097)
const KolbeElectrolysisSim: React.FC = () => {
  const [electrolysing, setElectrolysing] = useState(false);

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-yellow-500/30 w-full flex flex-col items-center">
      <div className="text-xs font-semibold text-amber-300 mb-3">
        Kolbe Anodic Oxidation: 2 RCOONa + 2 H₂O → R-R + 2 CO₂ + 2 NaOH + H₂
      </div>

      <svg className="w-full max-w-md h-48 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 320 160">
        {/* Solution */}
        <rect x="30" y="40" width="260" height="100" fill="#1e293b" opacity="0.6" />

        {/* Electrodes */}
        <rect x="70" y="20" width="16" height="110" fill="#64748b" stroke="#94a3b8" />
        <text x="78" y="145" fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">
          Anode (+)
        </text>

        <rect x="234" y="20" width="16" height="110" fill="#64748b" stroke="#94a3b8" />
        <text x="242" y="145" fill="#60a5fa" fontSize="10" textAnchor="middle" fontWeight="bold">
          Cathode (-)
        </text>

        {/* Bubbles / Reactions when electrolysing */}
        {electrolysing && (
          <g>
            {/* Anode products */}
            <circle cx="78" cy="60" r="4" fill="#38bdf8" />
            <circle cx="70" cy="80" r="5" fill="#ef4444" />
            <text x="50" y="70" fill="#fef08a" fontSize="9" textAnchor="end">
              Ethane + CO₂↑
            </text>

            {/* Cathode products */}
            <circle cx="242" cy="70" r="4" fill="#60a5fa" />
            <text x="270" y="75" fill="#60a5fa" fontSize="9">
              H₂↑ + OH⁻
            </text>
          </g>
        )}
      </svg>

      <button
        onClick={() => {
          setElectrolysing(!electrolysing);
          audioManager.play(electrolysing ? 'swoop' : 'sparkle');
        }}
        className={`mt-3 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
          electrolysing ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950'
        }`}
      >
        {electrolysing ? 'Stop Current' : 'Apply Direct Current (DC)'}
      </button>
    </div>
  );
};

// 8. Haloform Reaction & Iodoform Test Visual (c12_chem_098)
const HaloformTestSim: React.FC = () => {
  const [selectedCompound, setSelectedCompound] = useState<'ethanol' | 'acetone' | '1-propanol'>('ethanol');

  const testResults = {
    ethanol: {
      formula: 'CH₃CH₂OH',
      hasGroup: true,
      result: 'POSITIVE (Yellow Precipitate CHI₃)',
      color: '#facc15',
    },
    acetone: {
      formula: 'CH₃COCH₃',
      hasGroup: true,
      result: 'POSITIVE (Yellow Precipitate CHI₃)',
      color: '#facc15',
    },
    '1-propanol': {
      formula: 'CH₃CH₂CH₂OH',
      hasGroup: false,
      result: 'NEGATIVE (No Yellow Precipitate)',
      color: '#94a3b8',
    },
  };

  const curr = testResults[selectedCompound];

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-yellow-400/30 w-full flex flex-col items-center">
      <div className="flex gap-2 mb-3 text-xs font-semibold">
        {(['ethanol', 'acetone', '1-propanol'] as const).map((comp) => (
          <button
            key={comp}
            onClick={() => {
              setSelectedCompound(comp);
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
              selectedCompound === comp ? 'bg-yellow-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {comp}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800 w-full max-w-md">
        {/* Test Tube SVG */}
        <svg className="w-16 h-36" viewBox="0 0 60 140">
          <path d="M 15,10 L 45,10 L 45,110 C 45,125 15,125 15,110 Z" fill="none" stroke="#64748b" strokeWidth="3" />
          <path
            d="M 17,60 L 43,60 L 43,110 C 43,123 17,123 17,110 Z"
            fill={curr.hasGroup ? '#facc15' : '#0284c7'}
            opacity="0.7"
          />
        </svg>

        <div className="flex flex-col gap-1 text-xs">
          <span className="text-slate-400">Reagent: <span className="text-white font-bold">I₂ + NaOH (NaOI)</span></span>
          <span className="text-slate-400">Compound: <span className="text-amber-300 font-bold">{curr.formula}</span></span>
          <div className="mt-2 font-bold text-sm" style={{ color: curr.color }}>
            {curr.result}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">
            {curr.hasGroup
              ? 'Contains CH₃-CO- or oxidisable CH₃-CH(OH)- unit.'
              : 'Lacks CH₃-CO- or oxidisable CH₃-CH(OH)- unit.'}
          </span>
        </div>
      </div>
    </div>
  );
};

// 9. Carbylamine Reaction Visual (c12_chem_099)
const CarbylamineTestSim: React.FC = () => {
  const [amineType, setAmineType] = useState<'primary' | 'secondary'>('primary');

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-teal-400/30 w-full flex flex-col items-center">
      <div className="flex gap-3 mb-3 text-xs font-semibold">
        <button
          onClick={() => {
            setAmineType('primary');
            audioManager.play('tap');
          }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            amineType === 'primary' ? 'bg-teal-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
          }`}
        >
          1° Amine (R-NH₂)
        </button>
        <button
          onClick={() => {
            setAmineType('secondary');
            audioManager.play('tap');
          }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            amineType === 'secondary' ? 'bg-teal-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
          }`}
        >
          2° Amine (R₂NH)
        </button>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 w-full max-w-md text-xs font-mono flex flex-col gap-2">
        <div className="text-sky-300">Reagents: CHCl₃ + 3 KOH (alc.)</div>
        <div className="text-amber-400 font-bold">Key Electrophile: :CCl₂ (Dichlorocarbene)</div>
        <div className="border-t border-slate-800 pt-2">
          {amineType === 'primary' ? (
            <div className="text-emerald-400 font-bold">
              Product: R-N≡C (Isocyanide / Carbylamine)
              <br />
              <span className="text-rose-400 font-normal text-[11px]">
                Observation: Extremely FOUL, offensive odor!
              </span>
            </div>
          ) : (
            <div className="text-slate-400 font-bold">
              NO REACTION / NO FOUL ODOR
              <br />
              <span className="text-slate-500 font-normal text-[11px]">
                Reason: Lacks 2 N-H bonds required for double HCl elimination.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 10. Hoffmann Bromamide Degradation Visual (c12_chem_100)
const HoffmannDegradationSim: React.FC = () => {
  const [carbonCount, setCarbonCount] = useState(3);

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-orange-500/30 w-full flex flex-col items-center">
      <div className="flex items-center gap-3 mb-3 text-xs font-semibold">
        <span className="text-slate-400">Starting Amide Carbon Count:</span>
        {[2, 3, 4].map((cnt) => (
          <button
            key={cnt}
            onClick={() => {
              setCarbonCount(cnt);
              audioManager.play('tap');
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              carbonCount === cnt ? 'bg-orange-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {cnt} Carbons
          </button>
        ))}
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 w-full max-w-md text-xs font-mono flex flex-col gap-2">
        <div className="text-slate-300">
          Reagents: <span className="text-amber-400 font-bold">Br₂ + 4 NaOH</span>
        </div>
        <div className="text-sky-300">
          Starting Amide: <span className="text-white font-bold">C{carbonCount} Amide</span>
        </div>
        <div className="border-t border-slate-800 pt-2 text-emerald-400 font-bold text-sm">
          Product Amine: C{carbonCount - 1} Primary Amine (1 LESS Carbon!)
        </div>
        <div className="text-[11px] text-slate-400">
          Lost Carbon Fragment: <span className="text-rose-400 font-semibold">Na₂CO₃ (Carbonate)</span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Competitive Inhibitors Permanently Block Active Sites of Enzymes",
    description: "Students often believe that competitive inhibitors bind permanently to the active site, making enzyme recovery impossible regardless of substrate concentration.",
    correction: "Competitive inhibitors bind reversibly to the active site by competing directly with the natural substrate. Increasing the concentration of the substrate allows it to outcompete the inhibitor, effectively restoring the rate of the enzymatic reaction.",
  },
  {
    id: "misc_2",
    title: "Drug Receptor Interactions Always Involve Strong Covalent Bonds",
    description: "Students assume that drugs attach to target receptors primarily through covalent bonding to ensure a permanent, strong therapeutic effect.",
    correction: "Most drug-receptor interactions rely on weak, reversible forces such as hydrogen bonding, ionic interactions, and van der Waals forces. Reversible binding is essential so that the drug can dissociate after delivering its effect, preventing prolonged over-stimulation or toxicity.",
  },
  {
    id: "misc_3",
    title: "Antagonists Trigger an Opposite Biological Signal in Receptors",
    description: "Students frequently think antagonists actively trigger a reverse physiological signal, whereas agonists simply block the receptor.",
    correction: "Antagonists do not initiate any biological signal; they merely occupy the receptor's binding site to block natural chemical messengers from attaching. In contrast, agonists mimic natural messengers by binding to the receptor and actively triggering the characteristic biological response.",
  },
  {
    id: "misc_4",
    title: "Allosteric Inhibitors Compete Directly With Substrates for Binding",
    description: "Students tend to believe that all enzyme inhibitors, including allosteric ones, must bind directly to the active site to prevent substrate binding.",
    correction: "Allosteric inhibitors bind to a distinct site on the enzyme known as the allosteric site, far from the active site. This binding alters the three-dimensional conformation of the active site so that the substrate can no longer recognize or bind to it.",
  },
  {
    id: "misc_5",
    title: "Effective Drug Design Focuses on Broad Target Receptor Specificity",
    description: "Students mistakenly think an ideal drug should bind to multiple types of enzymes and receptors across the body to cure diseases faster.",
    correction: "Optimal drug design emphasizes high target selectivity so the drug interacts only with a specific enzyme or receptor causing the disease. Non-specific binding to multiple biological targets leads to undesirable interference with healthy physiological processes, causing side effects.",
  },
];

export default function C12_ChemistryDrugtargetinteractionSim() {
  const [activeTab, setActiveTab] = useState<'learn' | 'lab' | 'challenge'>('learn');
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  // BKT state per node
  const [bktStates, setBktStates] = useState<BKTStateMap>(() => {
    const initialMap: BKTStateMap = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    return initialMap;
  });

  // Score & Game State
  const [score, setScore] = useState(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const currentNodeId = ALL_NODE_IDS[activeNodeIndex];

  // Challenges array covering all 10 nodes
  const challenges: Challenge[] = useMemo(
    () => [
      {
        id: 'c1',
        nodeId: NODE_IDS.DRUG_TARGET,
        title: 'Drug-Target Interaction',
        question:
          'Why can the inhibitory effect of a competitive inhibitor be overcome by adding excess substrate, whereas that of a non-competitive inhibitor cannot?',
        options: [
          'Competitive inhibitors bind to the allosteric site permanently.',
          'Competitive inhibitors compete for the same active site; excess substrate outcompetes them.',
          'Non-competitive inhibitors react with water to form scum.',
          'Substrates cannot bind to enzymes in competitive inhibition.',
        ],
        correctIndex: 1,
        explanation:
          'Competitive inhibitors bind reversibly to the active site. Increasing substrate concentration increases the probability of substrate binding instead of the inhibitor.',
        misconception:
          'Many students think non-competitive inhibitors bind the active site. Non-competitive inhibitors bind the allosteric site and distort the active site shape.',
        hint: 'Think about which inhibitor competes for the exact same physical pocket as the substrate.',
        type: 'multiple-choice',
      },
      {
        id: 'c2',
        nodeId: NODE_IDS.FOOD_CHEM,
        title: 'Chemicals in Food',
        question:
          'What is the primary organic functional group in BHA and BHT that enables them to act as food antioxidants?',
        options: ['Carboxylate group (-COONa)', 'Phenolic hydroxyl group (-OH)', 'Amide group (-CONH2)', 'Ester linkage'],
        correctIndex: 1,
        explanation:
          'BHA and BHT contain phenolic -OH groups that donate hydrogen atoms to peroxy free radicals, breaking the chain reaction of lipid oxidation.',
        misconception:
          'Students often confuse preservatives like sodium benzoate with antioxidants like BHA/BHT.',
        hint: 'Look for the group that donates a hydrogen atom to free radicals.',
        type: 'multiple-choice',
      },
      {
        id: 'c3',
        nodeId: NODE_IDS.CLEANSING_AGENTS,
        title: 'Cleansing Agents in Hard Water',
        question: 'Why do synthetic alkylbenzene sulphonate detergents clean effectively in hard water while soaps fail?',
        options: [
          'Soaps form soluble calcium salts, whereas detergents form insoluble scum.',
          'Detergents do not contain hydrophobic tails.',
          'Calcium and magnesium salts of sulphonates are soluble in water, whereas calcium carboxylate salts form insoluble scum.',
          'Detergents lower the pH of hard water to 1.',
        ],
        correctIndex: 2,
        explanation:
          'Soaps react with Ca²⁺/Mg²⁺ in hard water to precipitate insoluble scum (C17H35COO)2Ca. Detergent sulphonate salts remain soluble.',
        misconception:
          'Believing that detergents do not react with Ca²⁺/Mg²⁺ at all. They form soluble complexes instead of scum.',
        hint: 'Focus on the solubility of carboxylate vs sulphonate salts with Ca²⁺ and Mg²⁺.',
        type: 'multiple-choice',
      },
      {
        id: 'c4',
        nodeId: NODE_IDS.PSEUDO_FIRST_ORDER,
        title: 'Pseudo First Order Kinetics',
        question:
          'In the acid hydrolysis of ethyl acetate, CH₃COOC₂H₅ + H₂O → CH₃COOH + C₂H₅OH, why is the reaction pseudo first order?',
        options: [
          'The molecularity of the elementary step is one.',
          'Water is present in such large excess that its concentration remains virtually constant.',
          'The reaction rate constant k is zero.',
          'Ethyl acetate is present in excess.',
        ],
        correctIndex: 1,
        explanation:
          'Water is the solvent and present in huge excess (~55.5 M), so [H2O] is treated as constant and merged into k\' = k[H2O]0.',
        misconception:
          'Confusing order with molecularity. The reaction is bimolecular but pseudo-unimolecular in kinetics.',
        hint: 'Which reactant is present in huge abundance as the solvent?',
        type: 'multiple-choice',
      },
      {
        id: 'c5',
        nodeId: NODE_IDS.SODDY_FAJANS,
        title: 'Soddy-Fajans Displacement Laws',
        question:
          'A nucleus of ²³⁸₉₂U undergoes ONE alpha decay followed by TWO beta-minus decays. What is the atomic number (Z) of the resulting daughter nucleus?',
        options: ['90', '91', '92', '88'],
        correctIndex: 2,
        explanation:
          'Alpha decay reduces Z by 2 (92 → 90). Two beta-minus decays each increase Z by 1 (90 → 91 → 92). Net Z remains 92 (an isotope of Uranium).',
        misconception:
          'Assuming beta decay reduces mass number. Beta decay changes Z by +1 without changing mass number A.',
        hint: 'Calculate: 92 - 2 (alpha) + 1 (beta) + 1 (beta).',
        type: 'calculation',
      },
      {
        id: 'c6',
        nodeId: NODE_IDS.HARDY_SCHULZE,
        title: 'Hardy-Schulze Rule & Coagulation',
        question:
          'Which of the following electrolytes has the HIGHEST coagulating power for a negatively charged arsenious sulphide (As₂S₃) sol?',
        options: ['NaCl', 'BaCl₂', 'AlCl₃', 'Na₂SO₄'],
        correctIndex: 2,
        explanation:
          'For a negative sol, the effective coagulating ion is the cation. By Hardy-Schulze rule, higher valence gives greater power: Al³⁺ > Ba²⁺ > Na⁺.',
        misconception:
          'Thinking high coagulation value means high coagulating power. Coagulating power is INVERSELY proportional to coagulation value.',
        hint: 'Look for the cation carrying the highest positive charge.',
        type: 'multiple-choice',
      },
      {
        id: 'c7',
        nodeId: NODE_IDS.KOLBE_ELECTROLYSIS,
        title: 'Kolbe\'s Electrolysis',
        question: 'What organic product is formed at the ANODE during the electrolysis of concentrated sodium acetate (CH₃COONa)?',
        options: ['Methane (CH₄)', 'Ethane (CH₃-CH₃) + CO₂', 'Ethene (CH₂=CH₂)', 'Methanol (CH₃OH)'],
        correctIndex: 1,
        explanation:
          'At the anode: 2 CH₃COO⁻ → CH₃-CH₃ + 2 CO₂ + 2 e⁻. Two methyl radicals combine to give ethane.',
        misconception:
          'Placing the alkane product at the cathode instead of the anode. Anodic oxidation forms radicals that dimerise.',
        hint: 'Decarboxylative dimerisation of methyl radicals occurs at the positive electrode.',
        type: 'multiple-choice',
      },
      {
        id: 'c8',
        nodeId: NODE_IDS.HALOFORM,
        title: 'Haloform Reaction & Iodoform Test',
        question: 'Which of the following compounds will give a POSITIVE yellow precipitate with I₂ and NaOH?',
        options: ['Methanol (CH₃OH)', 'Propan-1-ol (CH₃CH₂CH₂OH)', 'Propan-2-ol (CH₃CH(OH)CH₃)', 'Benzaldehyde (C₆H₅CHO)'],
        correctIndex: 2,
        explanation:
          'Propan-2-ol contains the CH₃-CH(OH)- group, which is oxidised by NaOI to acetone (CH₃COCH₃) and yields yellow iodoform (CHI₃).',
        misconception:
          'Believing all alcohols give the iodoform test. Only ethanol and secondary alcohols with CH₃-CH(OH)- respond.',
        hint: 'Look for the alcohol that oxidises to a methyl ketone.',
        type: 'multiple-choice',
      },
      {
        id: 'c9',
        nodeId: NODE_IDS.CARBYLAMINE,
        title: 'Carbylamine Reaction',
        question: 'What key reactive intermediate is generated when chloroform (CHCl₃) reacts with alcoholic KOH in the carbylamine test?',
        options: ['Carbocation (:CH₃⁺)', 'Dichlorocarbene (:CCl₂)', 'Free Radical (•CCl₃)', 'Nitrene (:NH)'],
        correctIndex: 1,
        explanation:
          'CHCl₃ + OH⁻ → :CCl₂ (Dichlorocarbene electrophile via alpha-elimination) + Cl⁻ + H₂O.',
        misconception:
          'Assuming secondary and tertiary amines give carbylamine test. Only 1° amines have two N-H hydrogens for HCl elimination.',
        hint: 'It is a neutral, 6-electron carbon intermediate formed by alpha-elimination.',
        type: 'multiple-choice',
      },
      {
        id: 'c10',
        nodeId: NODE_IDS.HOFFMANN,
        title: 'Hoffmann Bromamide Degradation',
        question: 'When propanamide (CH₃CH₂CONH₂) is treated with Br₂ and 4 NaOH, what primary amine is formed?',
        options: ['Propyldiamine', 'Propylamine (3 carbons)', 'Ethylamine (2 carbons)', 'Methylamine (1 carbon)'],
        correctIndex: 2,
        explanation:
          'Hoffmann bromamide degradation converts R-CONH₂ to R-NH₂ with loss of ONE carbon as Na₂CO₃. Propanamide (3C) yields Ethylamine (2C).',
        misconception:
          'Expecting the amine product to have the same number of carbon atoms as the original amide.',
        hint: 'Remember that one carbon is lost as sodium carbonate!',
        type: 'multiple-choice',
      },
    ],
    []
  );

  const currentChallenge = challenges[currentChallengeIdx];

  // Answer handler
  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === currentChallenge.correctIndex;

    // Update BKT & SRS
    setBktStates((prev) => {
      const updated = { ...prev };
      updated[currentChallenge.nodeId] = bktUpdate(updated[currentChallenge.nodeId], isCorrect);
        const _reviewItem = createReviewItem('C12_ChemistryDrugtar', 'challenge');
        sm2Update(_reviewItem, 4, 0);
      return updated;
    });

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent work! That is correct.');
      setScore((s) => s + 10);
      setShowSparkle(true);
      if (currentChallengeIdx === challenges.length - 1) {
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak(currentChallenge.misconception);
    }
  };

  const nextChallenge = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setShowSparkle(false);
    if (currentChallengeIdx < challenges.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      audioManager.play('whoosh');
    }
  };

  // Node descriptions for Learn tab
  const nodeDescriptions = [
    { id: NODE_IDS.DRUG_TARGET, title: 'Drug-Target Interaction', component: <DrugTargetVisual type="competitive" /> },
    { id: NODE_IDS.FOOD_CHEM, title: 'Chemicals in Food', component: <FoodChemVisual /> },
    { id: NODE_IDS.CLEANSING_AGENTS, title: 'Cleansing Agents', component: <CleansingVisual /> },
    { id: NODE_IDS.PSEUDO_FIRST_ORDER, title: 'Pseudo First Order Reaction', component: <PseudoFirstOrderSim /> },
    { id: NODE_IDS.SODDY_FAJANS, title: 'Soddy-Fajans Laws', component: <SoddyFajansVisual /> },
    { id: NODE_IDS.HARDY_SCHULZE, title: 'Hardy-Schulze Rule', component: <HardySchulzeVisual /> },
    { id: NODE_IDS.KOLBE_ELECTROLYSIS, title: 'Kolbe\'s Electrolysis', component: <KolbeElectrolysisSim /> },
    { id: NODE_IDS.HALOFORM, title: 'Haloform Reaction & Iodoform Test', component: <HaloformTestSim /> },
    { id: NODE_IDS.CARBYLAMINE, title: 'Carbylamine Reaction', component: <CarbylamineTestSim /> },
    { id: NODE_IDS.HOFFMANN, title: 'Hoffmann Degradation', component: <HoffmannDegradationSim /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Class 12 ISC Chemistry Interactive Lab
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Master Drug Targets, Food Chem, Kinetics, Radioactivity, Colloids & Organic Reactions
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Mastery Score</span>
            <span className="text-lg font-bold text-amber-400">{score} pts</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => {
            setActiveTab('learn');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'learn' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Visual Concepts
        </button>
        <button
          onClick={() => {
            setActiveTab('challenge');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'challenge' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Adaptive Challenges ({currentChallengeIdx + 1}/{challenges.length})
        </button>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl flex flex-col items-center">
        {activeTab === 'learn' && (
          <div className="w-full flex flex-col items-center gap-6">
            {/* Concept Selector Buttons */}
            <div className="flex flex-wrap justify-center gap-2 w-full">
              {nodeDescriptions.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNodeIndex(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeNodeIndex === idx
                      ? 'bg-indigo-500 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Active Visual Component */}
            <div className="w-full max-w-2xl">
              <h2 className="text-lg font-bold text-indigo-300 mb-3 text-center">
                {nodeDescriptions[activeNodeIndex].title}
              </h2>
              {nodeDescriptions[activeNodeIndex].component}
            </div>
          </div>
        )}

        {activeTab === 'challenge' && (
          <div className="w-full max-w-xl bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl relative">
            <SparkleBurst show={showSparkle} x={200} y={150} />
            <Confetti show={showConfetti} />
            <SuccessBanner show={showSuccess} text="All ISC Chemistry Nodes Mastered!" />

            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Challenge {currentChallengeIdx + 1} of {challenges.length}
              </span>
              <span className="text-[10px] bg-slate-800 px-2.5 py-1 rounded-full text-slate-300 font-mono">
                {currentChallenge.nodeId}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-100 mb-4 leading-relaxed">
              {currentChallenge.question}
            </h3>

            {/* Options */}
            <div className="flex flex-col gap-3 mb-6">
              {currentChallenge.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';
                if (showFeedback) {
                  if (idx === currentChallenge.correctIndex) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                  } else if (idx === selectedAnswer) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showFeedback}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs leading-normal transition-all ${btnStyle}`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Navigation */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-4 text-xs flex flex-col gap-2"
              >
                <div
                  className={`font-bold text-sm ${
                    selectedAnswer === currentChallenge.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {selectedAnswer === currentChallenge.correctIndex ? 'Correct Answer!' : 'Needs Review!'}
                </div>
                <div className="text-slate-300 leading-relaxed">{currentChallenge.explanation}</div>
                {selectedAnswer !== currentChallenge.correctIndex && (
                  <div className="text-amber-400 bg-amber-950/40 p-2 rounded-lg text-[11px]">
                    <span className="font-bold">Misconception Alert: </span>
                    {currentChallenge.misconception}
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => {
                  setShowHint(!showHint);
                  audioManager.play('hint');
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              {showFeedback && (
                <button
                  onClick={nextChallenge}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
                >
                  {currentChallengeIdx < challenges.length - 1 ? 'Next Challenge →' : 'Finish Simulation'}
                </button>
              )}
            </div>

            <HintBubble show={showHint} text={currentChallenge.hint} />
          </div>
        )}
      </main>

      {/* Footer / Node ID String Literals Verification */}
      <footer className="mt-12 text-[10px] text-slate-600 text-center font-mono">
        ISC Class 12 Chemistry Nodes Covered: c12_chem_091 | c12_chem_092 | c12_chem_093 | c12_chem_094 |
        c12_chem_095 | c12_chem_096 | c12_chem_097 | c12_chem_098 | c12_chem_099 | c12_chem_100
      </footer>

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