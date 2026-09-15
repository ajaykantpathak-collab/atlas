"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
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

// ==========================================
// CONSTANTS & NODE IDS
// ==========================================
const NODE_WILLIAMS = 'c12_chem_101';
const NODE_INTERHAL = 'c12_chem_102';
const NODE_ZWITTER  = 'c12_chem_103';
const NODE_POLYMER  = 'c12_chem_104';

const ALL_NODE_IDS = [NODE_WILLIAMS, NODE_INTERHAL, NODE_ZWITTER, NODE_POLYMER];

// ==========================================
// TYPES & INTERFACES
// ==========================================
type ViewMode = 'discovery' | 'learn' | 'lab' | 'challenge' | 'mastery';
type ActiveLab = 'williamson' | 'interhalogen' | 'zwitterion' | 'polymer';

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  misconceptionKey?: string;
}

interface Slide {
  id: string;
  nodeId: string;
  title: string;
  subtitle: string;
  content: string;
  keyPoints: string[];
  visualType: ActiveLab;
}

interface MisconceptionData {
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// ENRICHMENT MISCONCEPTIONS MAPPING
// ==========================================
const MISCONCEPTIONS: Record<string, MisconceptionData> = {
  alcohol_reagent: {
    title: 'Using Free Alcohol Instead of Alkoxide',
    description: 'Writing R-OH + R\'-X instead of R-ONa + R\'-X ignores the necessity of nucleophilic alkoxide ion.',
    correction: 'Williamson synthesis requires a metal alkoxide (e.g., R-ONa), prepared by reacting alcohol with Na metal or NaH.'
  },
  tertiary_halide: {
    title: 'Expecting Ether from Tertiary Alkyl Halide',
    description: 'Assuming 3° alkyl halide with alkoxide produces ether.',
    correction: '3° alkyl halides undergo E2 elimination with strong alkoxide bases to yield alkenes (e.g., 2-methylpropene), not ethers!'
  },
  aryl_halide_sn2: {
    title: 'Using Aryl Halides as Electrophilic Partner',
    description: 'Attempting SN2 backside attack on chlorobenzene or bromobenzene.',
    correction: 'Aryl carbon-halogen bonds have partial double-bond character and steric shielding. Use sodium phenoxide as nucleophile instead.'
  },
  central_atom_size: {
    title: 'Wrong Central Atom in Interhalogens',
    description: 'Assuming smaller halogen or fluorine can act as the central atom.',
    correction: 'The larger, less electronegative halogen is always central because it can expand its valence octet. Fluorine is never central.'
  },
  shape_vs_geometry: {
    title: 'Confusing Electron Geometry with Molecular Shape',
    description: 'Calling ClF3 "trigonal bipyramidal" due to sp3d hybridisation.',
    correction: 'sp3d electron geometry is trigonal bipyramidal, but with 2 equatorial lone pairs, the molecular shape is T-shaped.'
  },
  peptisation_confusion: {
    title: 'Confusing Peptide Linkage with Peptisation',
    description: 'Mistaking protein peptide bonds for colloidal dispersion/peptisation.',
    correction: 'A peptide bond is a covalent amide linkage (-CO-NH-) formed by condensation of amino acids with loss of H2O.'
  },
  electrophoresis_electrolysis: {
    title: 'Confusing Electrophoresis with Electrolysis',
    description: 'Viewing electrophoresis as chemical decomposition at electrodes.',
    correction: 'Electrophoresis is physical migration of intact charged molecules in an electric field towards cathode (-) or anode (+).'
  },
  initiator_catalyst: {
    title: 'Calling Radical Initiators "Catalysts"',
    description: 'Assuming benzoyl peroxide works like an unchanged catalyst.',
    correction: 'Initiators undergo homolytic cleavage, react with monomers, and are consumed as structural chain end-groups.'
  }
};

// ==========================================
// DISCOVERY QUESTION DATA
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Predict Reaction Outcome',
  scenario: 'A chemist in a synthesis lab wants to prepare tert-butyl methyl ether (MTBE), a key gasoline additive. They mix Sodium Methoxide (NaOCH3) with tert-Butyl Bromide ((CH3)3CBr) in ethanol.',
  question: 'What will be the major organic product formed in this container?',
  options: [
    'tert-Butyl methyl ether (MTBE) via SN2 substitution',
    '2-Methylpropene (Isobutene) via E2 elimination',
    'Methanol and tert-butanol without any reaction',
    'Di-tert-butyl ether via radical coupling'
  ],
  correctIndex: 1,
  explanation: 'Surprise! tert-Butyl bromide is a 3° alkyl halide. Backside SN2 attack by methoxide is completely blocked by steric hindrance. Because methoxide is a strong base, it abstracts a beta-proton instead, driving fast E2 elimination to yield 2-methylpropene (isobutene).'
};

// ==========================================
// TEACHING SLIDES DATA
// ==========================================
const TEACHING_SLIDES: Slide[] = [
  {
    id: 'slide_1',
    nodeId: NODE_WILLIAMS,
    title: 'Williamson Ether Synthesis',
    subtitle: 'SN2 Nucleophilic Substitution vs E2 Elimination',
    content: 'Williamson ether synthesis forms symmetrical and unsymmetrical ethers by reacting a sodium alkoxide (R-O⁻ Na⁺) with an alkyl halide (R\'-X). Because alkoxides are strong nucleophiles and strong bases, the reaction proceeds via an SN2 mechanism with backside attack and inversion of configuration.',
    keyPoints: [
      'Equation: R-ONa + R\'-X → R-O-R\' + NaX',
      'Best Substrate: Primary (1°) or methyl halide (minimal steric hindrance)',
      'Side Reaction: 3° alkyl halides undergo E2 elimination to give alkenes!',
      'Synthesis Rule: Derive alkoxide from the more hindered alcohol, halide from the less hindered alcohol.'
    ],
    visualType: 'williamson'
  },
  {
    id: 'slide_2',
    nodeId: NODE_INTERHAL,
    title: 'Interhalogen Compounds & Polyhalides',
    subtitle: 'VSEPR Theory, Shapes & Valence Shell Expansion',
    content: 'Interhalogens are formed when two different halogens combine (XX\', XX\'3, XX\'5, XX\'7). The larger, less electronegative halogen is ALWAYS central. Polyhalide ions (like I3⁻ and ICl4⁻) form when halide ions add to halogens.',
    keyPoints: [
      'AB3 (e.g. ClF3): 3 bonding + 2 lone pairs → sp³d hybridisation → T-shaped',
      'AB5 (e.g. BrF5): 5 bonding + 1 lone pair → sp³d² hybridisation → Square Pyramidal',
      'AB7 (e.g. IF7): 7 bonding + 0 lone pairs → sp³d³ hybridisation → Pentagonal Bipyramidal',
      'Polyhalide ICl4⁻: 4 bonding + 2 lone pairs → sp³d² hybridisation → Square Planar'
    ],
    visualType: 'interhalogen'
  },
  {
    id: 'slide_3',
    nodeId: NODE_ZWITTER,
    title: 'Zwitterions & Isoelectric Point (pI)',
    subtitle: 'Internal Proton Transfer & Electrical Neutrality',
    content: 'Amino acids contain both basic (-NH2) and acidic (-COOH) groups. In aqueous solution, an internal proton transfer forms a dipolar ion called a zwitterion (+H3N-CHR-COO⁻). The pH where net molecular charge equals zero is the Isoelectric Point (pI).',
    keyPoints: [
      'Zwitterion: Net charge = 0, high melting point, ionic solid behavior',
      'Neutral Amino Acid pI = (pKa1 + pKa2) / 2',
      'Acidic pH (< pI): Protonated cation (+H3N-CHR-COOH) → moves to Cathode (-)',
      'Basic pH (> pI): Deprotonated anion (H2N-CHR-COO⁻) → moves to Anode (+)'
    ],
    visualType: 'zwitterion'
  },
  {
    id: 'slide_4',
    nodeId: NODE_ZWITTER,
    title: 'Electrophoresis & Peptide Bond Synthesis',
    subtitle: 'Amide Linkage Formation & Partial Double-Bond Character',
    content: 'Peptide bonds (-CO-NH-) are formed by condensation of the α-amino group of one amino acid with the α-carboxyl group of another, releasing H2O. Resonance delocalisation gives the peptide bond partial double-bond character, making it planar, rigid, and trans.',
    keyPoints: [
      'Condensation: Amino Acid 1 + Amino Acid 2 → Dipeptide + H2O',
      'Peptide Bond: -CO-NH- amide linkage (NOT peptisation!)',
      'Rigidity: Restricted C-N bond rotation creates stable protein secondary structures',
      'Electrophoresis: Separation of amino acids based on net charge at controlled buffer pH'
    ],
    visualType: 'zwitterion'
  },
  {
    id: 'slide_5',
    nodeId: NODE_POLYMER,
    title: 'Addition Polymerisation Pathways',
    subtitle: 'Free Radical vs Cationic Chain-Growth Mechanisms',
    content: 'Addition polymerisation converts weak C=C π-bonds into strong C-C σ-bonds without losing small molecules. The active chain carrier determines the pathway: free radical (peroxide initiator) or cationic (Lewis acid initiator).',
    keyPoints: [
      'Free Radical: Benzoyl peroxide → homolytic fission → radical carrier → polythene, PVC, Teflon',
      'Cationic: BF3 + H2O → H⁺ → carbocation carrier → polyisobutylene (favored by electron-donating groups)',
      'Three Kinetic Steps: Initiation → Propagation → Termination',
      'Teflon Monomer: Tetrafluoroethene (CF2=CF2), an alkene (NOT tetrafluoroethane!)'
    ],
    visualType: 'polymer'
  }
];

// ==========================================
// ADAPTIVE CHALLENGES (8 PROGRESSIVE ITEMS)
// ==========================================
const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    nodeId: NODE_WILLIAMS,
    title: 'Substrate Pairing Strategy',
    question: 'Which reagent pair is the best choice to prepare tert-butyl methyl ether in high yield?',
    options: [
      'Sodium methoxide + tert-butyl bromide',
      'Sodium tert-butoxide + methyl bromide',
      'Methanol + tert-butyl alcohol in acid',
      'Sodium phenoxide + tert-butyl chloride'
    ],
    correctIndex: 1,
    explanation: 'Sodium tert-butoxide provides the bulky alkoxide nucleophile, while methyl bromide provides an unhindered methyl halide ideal for clean SN2 displacement without E2 elimination.',
    hint: 'Pick the combination where the alkyl halide is least sterically hindered (methyl halide).',
    misconceptionKey: 'tertiary_halide'
  },
  {
    id: 'c2',
    nodeId: NODE_WILLIAMS,
    title: 'Anisole Synthesis Feasibility',
    question: 'Why will reacting chlorobenzene with sodium methoxide fail to give anisole under mild conditions?',
    options: [
      'Chlorobenzene is too acidic',
      'Sodium methoxide is a weak nucleophile',
      'Chlorobenzene is an aryl halide with partial double bond C-Cl character blocking SN2 attack',
      'The reaction produces methane gas instead'
    ],
    correctIndex: 2,
    explanation: 'Aryl halides like chlorobenzene do not undergo SN2 backside displacement because sp² C-Cl bonds are short, strong, and electron-dense. Anisole must be made from sodium phenoxide + methyl bromide.',
    hint: 'Consider whether aryl halides can undergo backside SN2 attack.',
    misconceptionKey: 'aryl_halide_sn2'
  },
  {
    id: 'c3',
    nodeId: NODE_INTERHAL,
    title: 'ClF3 Geometry & Hybridisation',
    question: 'According to VSEPR theory, what is the molecular shape and central chlorine hybridisation of ClF3?',
    options: [
      'Trigonal bipyramidal, sp3d',
      'T-shaped, sp3d',
      'Trigonal planar, sp2',
      'Pyramidal, sp3'
    ],
    correctIndex: 1,
    explanation: 'Chlorine in ClF3 has 7 valence electrons: 3 bonding pairs + 2 lone pairs = 5 electron domains (sp3d). The two lone pairs occupy equatorial positions to minimise repulsion, yielding a T-shaped molecular geometry.',
    hint: 'Count total electron domains (bonding + lone pairs) on central Cl atom.',
    misconceptionKey: 'shape_vs_geometry'
  },
  {
    id: 'c4',
    nodeId: NODE_INTERHAL,
    title: 'Polyhalide Ion ICl4⁻ Geometry',
    question: 'What is the molecular shape and hybridisation of the central iodine atom in the polyhalide ion ICl4⁻?',
    options: [
      'Square planar, sp3d2',
      'Tetrahedral, sp3',
      'Square pyramidal, sp3d2',
      'See-saw, sp3d'
    ],
    correctIndex: 0,
    explanation: 'Central Iodine (7 e⁻) + 1 extra e⁻ (negative charge) + 4 Cl single bonds = 4 bonding pairs + 2 lone pairs = 6 electron domains (sp3d² octahedral electron geometry). Place lone pairs 180° apart → Square Planar shape!',
    hint: 'Don\'t forget to add 1 electron for the negative charge when counting iodine valence electrons.',
    misconceptionKey: 'central_atom_size'
  },
  {
    id: 'c5',
    nodeId: NODE_ZWITTER,
    title: 'Alanine pI Calculation & Charge State',
    question: 'Alanine has pKa1 = 2.34 (carboxyl) and pKa2 = 9.60 (amino). What is its pI, and what charge does it carry at pH 4.0?',
    options: [
      'pI = 5.97; Net charge is positive (+1)',
      'pI = 5.97; Net charge is negative (-1)',
      'pI = 11.94; Net charge is zero (0)',
      'pI = 7.00; Net charge is positive (+1)'
    ],
    correctIndex: 0,
    explanation: 'pI = (2.34 + 9.60) / 2 = 5.97. At pH 4.0 (acidic environment below pI), protons are abundant: -COOH remains neutral and -NH3⁺ carries positive charge, so net charge is +1.',
    hint: 'Calculate pI as average of pKa values. Compare pH 4.0 with pI 5.97.',
    misconceptionKey: 'electrophoresis_electrolysis'
  },
  {
    id: 'c6',
    nodeId: NODE_ZWITTER,
    title: 'Electrophoresis Gel Migration',
    question: 'During gel electrophoresis at buffer pH 6.0, in which direction will Aspartic acid (pI = 2.77) migrate?',
    options: [
      'Towards the Cathode (negative electrode)',
      'Towards the Anode (positive electrode)',
      'It will remain stationary at the origin',
      'It will decompose into ammonia and carbon dioxide'
    ],
    correctIndex: 1,
    explanation: 'At buffer pH 6.0 (pH > pI 2.77), aspartic acid loses protons from carboxyl groups, becoming a negatively charged anion. Anions migrate towards the positive electrode (Anode).',
    hint: 'If buffer pH > pI, the molecule loses H+ and becomes an anion (-). Which electrode attracts anions?',
    misconceptionKey: 'electrophoresis_electrolysis'
  },
  {
    id: 'c7',
    nodeId: NODE_POLYMER,
    title: 'Teflon Monomer & Mechanism',
    question: 'Which monomer and mechanism are used to synthesize non-stick Teflon coating?',
    options: [
      'Tetrafluoroethane via condensation polymerisation',
      'Tetrafluoroethene via free-radical addition polymerisation',
      '1,2-Difluoroethene via cationic polymerisation',
      'Hexamethylenediamine via free-radical addition'
    ],
    correctIndex: 1,
    explanation: 'Teflon is poly(tetrafluoroethene), synthesized by free-radical addition polymerisation of tetrafluoroethene (CF2=CF2) using peroxide initiators. No small molecule is eliminated.',
    hint: 'The monomer must contain a C=C double bond ending in "-ethene", not "-ethane".',
    misconceptionKey: 'initiator_catalyst'
  },
  {
    id: 'c8',
    nodeId: NODE_POLYMER,
    title: 'Cationic Polymerisation of Isobutene',
    question: 'Why does isobutene polymerise rapidly via a cationic mechanism when treated with BF3 and trace H2O?',
    options: [
      'Isobutene double bond contains electron-withdrawing groups',
      'Protonation forms a stable tertiary carbocation ((CH3)3C+) supported by electron-donating methyl groups',
      'BF3 acts as a free radical source',
      'Isobutene undergoes condensation with elimination of water'
    ],
    correctIndex: 1,
    explanation: 'BF3 + H2O generates H⁺, which adds to isobutene to form the tertiary butyl carbocation ((CH3)3C⁺). Hyperconjugation and +I effects of two methyl groups stabilise this cationic chain carrier.',
    hint: 'Think about carbocation stability: primary vs secondary vs tertiary.',
    misconceptionKey: 'initiator_catalyst'
  }
];

// ==========================================
// VISUAL SIMULATOR COMPONENTS
// ==========================================

// --- 1. WILLIAMSON SIMULATOR ---
interface WilliamsonSimProps {
  onStateChange?: (res: string) => void;
}

const WilliamsonSimulator: React.FC<WilliamsonSimProps> = ({ onStateChange }) => {
  const [alkoxide, setAlkoxide] = useState<'MeO' | 'EtO' | 'tBuO' | 'PhO'>('tBuO');
  const [halide, setHalide] = useState<'MeBr' | 'EtBr' | 'iPrBr' | 'tBuBr' | 'PhCl'>('MeBr');
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [rxnProgress, setRxnProgress] = useState<number>(0);

  const alkoxideNames = {
    MeO: 'Sodium Methoxide (CH3O⁻ Na⁺)',
    EtO: 'Sodium Ethoxide (C2H5O⁻ Na⁺)',
    tBuO: 'Sodium tert-Butoxide ((CH3)3CO⁻ Na⁺)',
    PhO: 'Sodium Phenoxide (C6H5O⁻ Na⁺)'
  };

  const halideNames = {
    MeBr: 'Methyl Bromide (CH3Br - Methyl)',
    EtBr: 'Ethyl Bromide (C2H5Br - 1°)',
    iPrBr: 'Isopropyl Bromide ((CH3)2CHBr - 2°)',
    tBuBr: 'tert-Butyl Bromide ((CH3)3CBr - 3°)',
    PhCl: 'Chlorobenzene (C6H5Cl - Aryl)'
  };

  // Outcome calculation logic
  const outcome = useMemo(() => {
    if (halide === 'PhCl') {
      return {
        type: 'no_reaction',
        product: 'No Reaction (Aryl Halide Unreactive)',
        mechanism: 'Blocked SN2',
        badgeColor: '#ef4444',
        details: 'Chlorobenzene has partial C=Cl double-bond character and strong electron cloud repulsion blocking backside SN2 attack!'
      };
    }
    if (halide === 'tBuBr') {
      return {
        type: 'elimination',
        product: '2-Methylpropene (Isobutene) + Alcohol + NaBr',
        mechanism: 'E2 Elimination (100%)',
        badgeColor: '#f59e0b',
        details: '3° Alkyl halide is too sterically hindered for SN2! The strongly basic alkoxide abstracts a β-proton, giving an alkene.'
      };
    }
    if (halide === 'iPrBr') {
      return {
        type: 'mixture',
        product: 'Ether + Propene (Alkene Mixture)',
        mechanism: 'SN2 (Minor) + E2 (Major)',
        badgeColor: '#3b82f6',
        details: '2° Alkyl halide suffers steric hindrance. SN2 ether formation competes poorly against E2 alkene elimination.'
      };
    }
    // Methyl or 1° Halide
    return {
      type: 'ether',
      product: 'Ether Product + NaBr',
      mechanism: 'Clean SN2 Displacement (100%)',
      badgeColor: '#10b981',
      details: 'Unhindered methyl/1° alkyl halide allows smooth backside attack by alkoxide nucleophile with inversion of configuration!'
    };
  }, [alkoxide, halide]);

  const triggerReaction = () => {
    audioManager.play('whoosh');
    setIsReacting(true);
    setRxnProgress(0);
  };

  useEffect(() => {
    if (!isReacting) return;
    const interval = setInterval(() => {
      setRxnProgress((prev) => {
        if (prev >= 100) {
          setIsReacting(false);
          clearInterval(interval);
          audioManager.play(outcome.type === 'ether' ? 'drop-correct' : 'drop-wrong');
          if (onStateChange) onStateChange(outcome.product);
          return 100;
        }
        return prev + 5;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isReacting, outcome, onStateChange]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 text-white flex flex-col gap-4 shadow-xl">
      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
        <h3 className="font-bold text-lg text-emerald-400 flex items-center gap-2">
          <span>🧪</span> Williamson Ether Synthesis Laboratory
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          SN2 vs E2 Mechanism Visualiser
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
            1. Select Nucleophile (Alkoxide / Phenoxide)
          </label>
          <select
            value={alkoxide}
            onChange={(e) => setAlkoxide(e.target.value as any)}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-sm font-mono text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {Object.entries(alkoxideNames).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
            2. Select Electrophile (Alkyl / Aryl Halide)
          </label>
          <select
            value={halide}
            onChange={(e) => setHalide(e.target.value as any)}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2.5 text-sm font-mono text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {Object.entries(halideNames).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reaction Chamber SVG Canvas */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-lg p-4 h-48 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 600 180">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="600" height="180" fill="url(#grid)" />

          {/* Left Nucleophile Molecule */}
          <g transform={`translate(${100 + (rxnProgress * 1.5)}, 90)`}>
            <circle cx="0" cy="0" r="28" fill="#10b981" opacity="0.9" />
            <text x="0" y="4" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
              {alkoxide}⁻
            </text>
            <circle cx="22" cy="-22" r="12" fill="#8b5cf6" />
            <text x="22" y="-18" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
              Na⁺
            </text>
          </g>

          {/* Transition / Collision Center */}
          <g transform="translate(300, 90)">
            <circle cx="0" cy="0" r="4" fill="#64748b" />
            {isReacting && (
              <circle cx="0" cy="0" r={rxnProgress * 0.4} fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" />
            )}
          </g>

          {/* Right Halide Molecule */}
          <g transform={`translate(${500 - (rxnProgress * 1.5)}, 90)`}>
            <circle cx="0" cy="0" r="26" fill="#06b6d4" opacity="0.9" />
            <text x="0" y="4" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
              {halide}
            </text>
            <circle cx="-20" cy="20" r="14" fill="#ef4444" />
            <text x="-20" y="24" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
              Br / Cl
            </text>
          </g>
        </svg>

        {/* Reaction Progress Overlay */}
        <div className="absolute top-3 left-3 bg-slate-900/80 px-3 py-1 rounded border border-slate-700 text-xs text-slate-300 font-mono">
          Progress: {rxnProgress}%
        </div>

        <button
          onClick={triggerReaction}
          disabled={isReacting}
          className={`absolute bottom-3 right-3 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
            isReacting ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:scale-105'
          }`}
        >
          {isReacting ? 'Reacting...' : 'Mix & React'}
        </button>
      </div>

      {/* Outcome Banner */}
      <div className="bg-slate-800 border-l-4 p-3.5 rounded-r-lg flex flex-col gap-1.5" style={{ borderColor: outcome.badgeColor }}>
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm" style={{ color: outcome.badgeColor }}>
            {outcome.mechanism}
          </span>
          <span className="text-xs bg-slate-900 px-2 py-0.5 rounded font-mono text-slate-300">
            {outcome.product}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {outcome.details}
        </p>
      </div>
    </div>
  );
};

// --- 2. INTERHALOGEN VSEPR VIEWER ---
const InterhalogenVseprViewer: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<'ClF' | 'ClF3' | 'BrF5' | 'IF7' | 'I3-' | 'ICl4-'>('ClF3');

  const vseprData = {
    ClF: {
      type: 'AB',
      name: 'Chlorine Monofluoride',
      central: 'Cl',
      terminal: 'F',
      bondingPairs: 1,
      lonePairs: 3,
      hybridisation: 'sp³',
      electronGeo: 'Tetrahedral',
      molecularShape: 'Linear',
      angle: '180°',
      color: '#10b981'
    },
    ClF3: {
      type: 'AB3',
      name: 'Chlorine Trifluoride',
      central: 'Cl',
      terminal: 'F',
      bondingPairs: 3,
      lonePairs: 2,
      hybridisation: 'sp³d',
      electronGeo: 'Trigonal Bipyramidal',
      molecularShape: 'T-shaped',
      angle: '87.5° / 175°',
      color: '#06b6d4'
    },
    BrF5: {
      type: 'AB5',
      name: 'Bromine Pentafluoride',
      central: 'Br',
      terminal: 'F',
      bondingPairs: 5,
      lonePairs: 1,
      hybridisation: 'sp³d²',
      electronGeo: 'Octahedral',
      molecularShape: 'Square Pyramidal',
      angle: '84.8°',
      color: '#8b5cf6'
    },
    IF7: {
      type: 'AB7',
      name: 'Iodine Heptafluoride',
      central: 'I',
      terminal: 'F',
      bondingPairs: 7,
      lonePairs: 0,
      hybridisation: 'sp³d³',
      electronGeo: 'Pentagonal Bipyramidal',
      molecularShape: 'Pentagonal Bipyramidal',
      angle: '72° / 90°',
      color: '#ec4899'
    },
    'I3-': {
      type: 'Polyhalide',
      name: 'Triiodide Ion (I3⁻)',
      central: 'I',
      terminal: 'I',
      bondingPairs: 2,
      lonePairs: 3,
      hybridisation: 'sp³d',
      electronGeo: 'Trigonal Bipyramidal',
      molecularShape: 'Linear',
      angle: '180°',
      color: '#eab308'
    },
    'ICl4-': {
      type: 'Polyhalide',
      name: 'Tetrachloroiodate Ion (ICl4⁻)',
      central: 'I',
      terminal: 'Cl',
      bondingPairs: 4,
      lonePairs: 2,
      hybridisation: 'sp³d²',
      electronGeo: 'Octahedral',
      molecularShape: 'Square Planar',
      angle: '90°',
      color: '#f97316'
    }
  };

  const curr = vseprData[selectedItem];

  const handleSelect = (key: any) => {
    audioManager.play('tap');
    setSelectedItem(key);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 text-white flex flex-col gap-4 shadow-xl">
      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
        <h3 className="font-bold text-lg text-cyan-400 flex items-center gap-2">
          <span>📐</span> Interhalogen & Polyhalide Geometry Explorer
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          VSEPR Theory & Lone Pair Repulsion
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(vseprData).map((key) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              selectedItem === key ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Visual Canvas & Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Drawing */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 h-56 flex items-center justify-center relative">
          <svg className="w-full h-full" viewBox="0 0 300 200">
            {/* Central Atom */}
            <circle cx="150" cy="100" r="22" fill={curr.color} />
            <text x="150" y="105" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">
              {curr.central}
            </text>

            {/* Geometry specific terminal bonds & lone pairs */}
            {selectedItem === 'ClF3' && (
              <g>
                {/* Axial Bonds */}
                <line x1="150" y1="78" x2="150" y2="30" stroke="#06b6d4" strokeWidth="3" />
                <circle cx="150" cy="30" r="12" fill="#38bdf8" />
                <text x="150" y="34" fill="slate-950" fontSize="10" fontWeight="bold" textAnchor="middle">F</text>

                <line x1="150" y1="122" x2="150" y2="170" stroke="#06b6d4" strokeWidth="3" />
                <circle cx="150" cy="170" r="12" fill="#38bdf8" />
                <text x="150" y="174" fill="slate-950" fontSize="10" fontWeight="bold" textAnchor="middle">F</text>

                {/* Equatorial Bond */}
                <line x1="172" y1="100" x2="220" y2="100" stroke="#06b6d4" strokeWidth="3" />
                <circle cx="220" cy="100" r="12" fill="#38bdf8" />
                <text x="220" y="104" fill="slate-950" fontSize="10" fontWeight="bold" textAnchor="middle">F</text>

                {/* 2 Equatorial Lone Pairs */}
                <ellipse cx="110" cy="80" rx="18" ry="10" fill="#eab308" opacity="0.4" transform="rotate(-30 110 80)" />
                <circle cx="102" cy="78" r="2" fill="#eab308" />
                <circle cx="112" cy="74" r="2" fill="#eab308" />

                <ellipse cx="110" cy="120" rx="18" ry="10" fill="#eab308" opacity="0.4" transform="rotate(30 110 120)" />
                <circle cx="102" cy="122" r="2" fill="#eab308" />
                <circle cx="112" cy="126" r="2" fill="#eab308" />
              </g>
            )}

            {selectedItem === 'ICl4-' && (
              <g>
                {/* 4 Square Planar Bonds */}
                <line x1="128" y1="78" x2="80" y2="40" stroke="#f97316" strokeWidth="3" />
                <circle cx="80" cy="40" r="12" fill="#fb923c" />
                <text x="80" y="44" fill="slate-950" fontSize="10" fontWeight="bold" textAnchor="middle">Cl</text>

                <line x1="172" y1="78" x2="220" y2="40" stroke="#f97316" strokeWidth="3" />
                <circle cx="220" cy="40" r="12" fill="#fb923c" />
                <text x="220" y="44" fill="slate-950" fontSize="10" fontWeight="bold" textAnchor="middle">Cl</text>

                <line x1="128" y1="122" x2="80" y2="160" stroke="#f97316" strokeWidth="3" />
                <circle cx="80" cy="160" r="12" fill="#fb923c" />
                <text x="80" y="164" fill="slate-950" fontSize="10" fontWeight="bold" textAnchor="middle">Cl</text>

                <line x1="172" y1="122" x2="220" y2="160" stroke="#f97316" strokeWidth="3" />
                <circle cx="220" cy="160" r="12" fill="#fb923c" />
                <text x="220" y="164" fill="slate-950" fontSize="10" fontWeight="bold" textAnchor="middle">Cl</text>

                {/* 2 Axial Lone Pairs (above and below plane) */}
                <ellipse cx="150" cy="50" rx="10" ry="18" fill="#eab308" opacity="0.4" />
                <ellipse cx="150" cy="150" rx="10" ry="18" fill="#eab308" opacity="0.4" />
              </g>
            )}

            {(selectedItem !== 'ClF3' && selectedItem !== 'ICl4-') && (
              <g>
                <circle cx="80" cy="100" r="12" fill="#94a3b8" />
                <line x1="128" y1="100" x2="92" y2="100" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="220" cy="100" r="12" fill="#94a3b8" />
                <line x1="172" y1="100" x2="208" y2="100" stroke="#94a3b8" strokeWidth="3" />
                <text x="150" y="165" fill="#94a3b8" fontSize="11" textAnchor="middle">
                  {curr.molecularShape} Visual Model
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Specs Table */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-4 flex flex-col gap-2 font-mono text-xs">
          <div className="text-sm font-bold text-cyan-300 border-b border-slate-700 pb-1">
            {curr.name} ({curr.type})
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Central Atom:</span>
            <span className="text-white font-bold">{curr.central}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Hybridisation:</span>
            <span className="text-emerald-400 font-bold">{curr.hybridisation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Bonding / Lone Pairs:</span>
            <span className="text-amber-400 font-bold">{curr.bondingPairs} BP / {curr.lonePairs} LP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Electron Geometry:</span>
            <span className="text-slate-200">{curr.electronGeo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Molecular Shape:</span>
            <span className="text-cyan-400 font-bold">{curr.molecularShape}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Bond Angle(s):</span>
            <span className="text-slate-200">{curr.angle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. ZWITTERION & ELECTROPHORESIS LAB ---
const ZwitterionElectrophoresisLab: React.FC = () => {
  const [ph, setPh] = useState<number>(6.0);
  const [aminoAcid, setAminoAcid] = useState<'Alanine' | 'Aspartic' | 'Lysine'>('Alanine');
  const [isGelRunning, setIsGelRunning] = useState<boolean>(false);
  const [gelPosition, setGelPosition] = useState<number>(0); // -100 (Cathode) to +100 (Anode)

  const aaData = {
    Alanine: { pKa1: 2.34, pKa2: 9.60, pI: 5.97, type: 'Neutral' },
    Aspartic: { pKa1: 1.88, pKa2: 9.60, pKaR: 3.65, pI: 2.77, type: 'Acidic' },
    Lysine: { pKa1: 2.18, pKa2: 8.95, pKaR: 10.53, pI: 9.74, type: 'Basic' }
  };

  const curr = aaData[aminoAcid];

  // Calculate net charge state
  const netCharge = useMemo(() => {
    if (ph < curr.pI - 0.5) return +1;
    if (ph > curr.pI + 0.5) return -1;
    return 0; // Zwitterion predominant
  }, [ph, curr]);

  const runGelAnimation = () => {
    audioManager.play('whoosh');
    setIsGelRunning(true);
    setGelPosition(0);

    const targetPos = netCharge === -1 ? 80 : netCharge === 1 ? -80 : 0;
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setGelPosition((targetPos * step) / 20);
      if (step >= 20) {
        clearInterval(interval);
        setIsGelRunning(false);
        audioManager.play('drop-correct');
      }
    }, 40);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 text-white flex flex-col gap-4 shadow-xl">
      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
        <h3 className="font-bold text-lg text-purple-400 flex items-center gap-2">
          <span>⚡</span> Amino Acid Zwitterion & Electrophoresis Simulator
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          pH vs pI Net Charge Migration
        </span>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
            1. Choose Amino Acid
          </label>
          <div className="flex gap-2">
            {(['Alanine', 'Aspartic', 'Lysine'] as const).map((aa) => (
              <button
                key={aa}
                onClick={() => {
                  audioManager.play('tap');
                  setAminoAcid(aa);
                  setGelPosition(0);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  aminoAcid === aa ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {aa}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1 flex justify-between">
            <span>2. Set Buffer pH</span>
            <span className="text-purple-300 font-mono font-bold">pH {ph.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="1.0"
            max="13.0"
            step="0.1"
            value={ph}
            onChange={(e) => {
              setPh(parseFloat(e.target.value));
              setGelPosition(0);
            }}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Chemical State Structure Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400">Predominant Ionic Species:</span>
          <span className="font-mono text-sm font-bold text-amber-300">
            {netCharge === +1 && '➕ Protonated Cation (+H3N-CHR-COOH)'}
            {netCharge === 0  && '☯️ Neutral Zwitterion (+H3N-CHR-COO⁻)'}
            {netCharge === -1 && '➖ Deprotonated Anion (H2N-CHR-COO⁻)'}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            pI = {curr.pI.toFixed(2)} | Current Buffer pH = {ph.toFixed(1)}
          </span>
        </div>

        <button
          onClick={runGelAnimation}
          disabled={isGelRunning}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all"
        >
          {isGelRunning ? 'Migrating...' : 'Run Electrophoresis'}
        </button>
      </div>

      {/* Electrophoresis Tank Chamber */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative h-32 flex items-center justify-between px-8">
        {/* Cathode (-) Left */}
        <div className="flex flex-col items-center">
          <div className="w-4 h-16 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">
            -
          </div>
          <span className="text-[10px] text-blue-400 font-mono font-bold mt-1">CATHODE (-)</span>
        </div>

        {/* Origin Center Line */}
        <div className="absolute left-1/2 top-4 bottom-4 border-l border-dashed border-slate-700 flex flex-col justify-between items-center">
          <span className="text-[9px] text-slate-500 font-mono">ORIGIN</span>
        </div>

        {/* Moving Amino Acid Spot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 flex flex-col items-center"
          style={{ left: `calc(50% + ${gelPosition}px)` }}
        >
          <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-purple-500/50">
            {aminoAcid.slice(0, 3)}
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-300 mt-1">
            {netCharge > 0 ? '+1' : netCharge < 0 ? '-1' : '0'}
          </span>
        </div>

        {/* Anode (+) Right */}
        <div className="flex flex-col items-center">
          <div className="w-4 h-16 bg-red-600 rounded flex items-center justify-center font-bold text-white text-xs">
            +
          </div>
          <span className="text-[10px] text-red-400 font-mono font-bold mt-1">ANODE (+)</span>
        </div>
      </div>
    </div>
  );
};

// --- 4. POLYMERISATION SIMULATOR ---
const PolymerisationSim: React.FC = () => {
  const [mechanism, setMechanism] = useState<'radical' | 'cationic'>('radical');
  const [monomerCount, setMonomerCount] = useState<number>(3);
  const [isPolymerising, setIsPolymerising] = useState<boolean>(false);

  const startPolymerisation = () => {
    audioManager.play('whoosh');
    setIsPolymerising(true);
    setMonomerCount(3);

    const interval = setInterval(() => {
      setMonomerCount((prev) => {
        if (prev >= 12) {
          clearInterval(interval);
          setIsPolymerising(false);
          audioManager.play('sparkle');
          return 12;
        }
        return prev + 1;
      });
    }, 300);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 text-white flex flex-col gap-4 shadow-xl">
      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
        <h3 className="font-bold text-lg text-amber-400 flex items-center gap-2">
          <span>🔗</span> Addition Polymerisation Chain Growth Simulator
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
          Kinetic Chain Mechanism
        </span>
      </div>

      {/* Mechanism Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            audioManager.play('tap');
            setMechanism('radical');
            setMonomerCount(3);
          }}
          className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            mechanism === 'radical' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
          }`}
        >
          Free-Radical Pathway (Peroxide Initiator)
        </button>
        <button
          onClick={() => {
            audioManager.play('tap');
            setMechanism('cationic');
            setMonomerCount(3);
          }}
          className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            mechanism === 'cationic' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
          }`}
        >
          Cationic Pathway (BF3 Lewis Acid Initiator)
        </button>
      </div>

      {/* Animated Macromolecule Canvas */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 h-44 flex items-center justify-center relative overflow-x-auto">
        <div className="flex items-center gap-1 font-mono">
          {/* Initiator Head */}
          <div className="px-3 py-1.5 rounded bg-red-600 text-white font-bold text-xs shadow-md">
            {mechanism === 'radical' ? 'Ph-COO•' : 'H⁺ (from BF3•H2O)'}
          </div>

          <span className="text-slate-500 font-bold">—</span>

          {/* Growing Monomer Chain Units */}
          {Array.from({ length: monomerCount }).map((_, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-2.5 py-1.5 rounded bg-slate-800 border border-slate-600 text-xs font-bold text-amber-300 flex items-center gap-1"
              >
                {mechanism === 'radical' ? '[CF₂-CF₂]' : '[CH₂-C(CH₃)₂]'}
              </motion.div>
              {i < monomerCount - 1 && <span className="text-amber-500 font-bold">—</span>}
            </React.Fragment>
          ))}

          {/* Active Chain Carrier End */}
          <div className="ml-2 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs shadow-lg animate-pulse">
            {mechanism === 'radical' ? '• Radical End' : '⁺ Carbocation End'}
          </div>
        </div>

        <button
          onClick={startPolymerisation}
          disabled={isPolymerising}
          className="absolute bottom-3 right-3 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-all"
        >
          {isPolymerising ? 'Propagating...' : 'Propagate Chain'}
        </button>
      </div>

      {/* Summary Box */}
      <div className="bg-slate-800 p-3 rounded-lg text-xs text-slate-300 font-mono flex justify-between">
        <span>Degree of Polymerisation (DP): {monomerCount} units</span>
        <span>Target Polymer: {mechanism === 'radical' ? 'Teflon / Polythene' : 'Polyisobutylene'}</span>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Choice of Alkyl Halide Degree Does Not Affect Ether Formation",
    description: "Students often believe that any combination of alkyl halide and alkoxide will yield the desired unsymmetrical ether, even if a tertiary alkyl halide is used.",
    correction: "Williamson ether synthesis proceeds via an S_N2 mechanism, which is strongly hindered by steric crowding around the carbon bearing the halogen. When a tertiary alkyl halide reacts with a strong alkoxide base, elimination (E2) completely dominates over substitution, yielding an alkene instead of an ether. Therefore, the alkyl halide substrate must be primary or methyl, while the alkoxide can be primary, secondary, or tertiary.",
  },
  {
    id: "misc_2",
    title: "Williamson Ether Synthesis Can Proceed via SN1 Mechanism",
    description: "Students frequently think that using a bulky alkoxide or branched substrate forces the reaction to proceed via a carbocation intermediate.",
    correction: "The reaction strictly follows a concerted S_N2 pathway featuring a single transition state with simultaneous bond formation and cleavage. Alkoxide ions are strong nucleophiles and strong bases, which prevents unimolecular ionization (S_N1) from occurring. If steric hindrance prevents S_N2 attack, the pathway shifts to E2 elimination rather than S_N1 substitution.",
  },
  {
    id: "misc_3",
    title: "Di-tert-butyl Ether Can Be Synthesized Using Williamson Synthesis",
    description: "Many students assume that reacting sodium tert-butoxide with tert-butyl bromide will successfully yield symmetrical di-tert-butyl ether.",
    correction: "Di-tert-butyl ether cannot be prepared using Williamson ether synthesis because tertiary alkyl halides undergo fast E2 elimination with alkoxides to produce 2-methylpropene. To prepare an ether containing a tertiary group, the tertiary carbon must belong to the alkoxide ion, and it must be reacted with a primary alkyl halide. Symmetrical tertiary ethers must be synthesized using alternative methods such as acid-catalyzed addition of alcohols to alkenes.",
  },
  {
    id: "misc_4",
    title: "Aryl Halides Can React Directly with Alkoxides to Form Ethers",
    description: "Students often believe that reacting sodium phenoxide with chlorobenzene will yield diphenyl ether via simple nucleophilic substitution.",
    correction: "Aryl halides are unreactive towards nucleophilic substitution under standard Williamson conditions due to partial double-bond character from resonance and sp2 hybridization of the C-X bond. To prepare alkyl aryl ethers (like anisole), sodium phenoxide must be reacted with a primary alkyl halide, not an aryl halide. Diaryl ethers cannot be prepared directly using standard Williamson ether synthesis without harsh conditions or transition metal catalysts.",
  },
  {
    id: "misc_5",
    title: "Stereochemistry at the Reaction Center Is Retained During Synthesis",
    description: "Students commonly assume that if a chiral alkyl halide is used, the absolute configuration around that carbon remains unchanged in the product ether.",
    correction: "Because Williamson ether synthesis proceeds through a classic S_N2 mechanism, the alkoxide nucleophile attacks the chiral carbon center from the side opposite to the leaving halogen atom. This backside attack results in a complete inversion of stereochemical configuration (Walden inversion) at the alkyl halide's reaction center. Retention of configuration only occurs if the chiral center is located on the alkoxide component, where no bonds directly attached to the chiral center are broken.",
  },
];

export default function C12_ChemistryWilliamsonethersynthesisSim() {
  // Navigation & Game State
  const [mode, setMode] = useState<ViewMode>('discovery');
  const [activeLab, setActiveLab] = useState<ActiveLab>('williamson');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);

  // Challenge & Mastery State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Mastery Tracking (BKT & SRS)
  const [bktStateMap, setBktStateMap] = useState<Record<string, any>>(() => {
    const map: Record<string, any> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState();
    });
    return map;
  });

  // Auto-hint timer (10s)
  useEffect(() => {
    if (mode !== 'challenge' || challengeSubmitted) return;
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [mode, currentChallengeIndex, challengeSubmitted]);

  // Current Slide & Challenge getters
  const currentSlide = TEACHING_SLIDES[currentSlideIndex];
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Handle Discovery Answer Submission
  const handleDiscoverySubmit = (idx: number) => {
    if (discoveryAnswered) return;
    setDiscoverySelected(idx);
    setDiscoveryAnswered(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! 3° alkyl halides undergo E2 elimination instead of SN2 substitution!');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Steric hindrance blocks SN2 attack, causing fast E2 elimination!');
    }
  };

  // Handle Challenge Option Submission
  const handleChallengeSubmit = () => {
    if (selectedOption === null || challengeSubmitted) return;

    setChallengeSubmitted(true);
    const isCorrect = selectedOption === currentChallenge.correctIndex;
    const nodeId = currentChallenge.nodeId;

    // Update BKT & SRS
    const newBkt = bktUpdate(bktStateMap[nodeId], isCorrect);
    setBktStateMap((prev) => ({ ...prev, [nodeId]: newBkt }));

    const srsItem = createReviewItem(currentChallenge.id, 'Chemistry');
    sm2Update(srsItem, isCorrect ? 5 : 1, 0);

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Excellent reasoning!');
      setScore((prev) => prev + 100);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      const key = currentChallenge.misconceptionKey;
      if (key && MISCONCEPTIONS[key]) {
        speechManager.speak(MISCONCEPTIONS[key].correction);
      } else {
        speechManager.speak('Review the mechanism and stereochemistry rules.');
      }
    }
  };

  // Next Challenge Handler
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setShowHint(false);
    } else {
      // Completed all challenges -> Mastery
      setMode('mastery');
      setShowConfetti(true);
      setShowSuccess(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have mastered Williamson Ether Synthesis and advanced Class 12 chemistry concepts!');
      recordGameScore(Object.values(ALL_NODE_IDS), score);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={500} y={300} />

      {/* Top Header Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Class 12 (ISC) Chemistry • Advanced Interactive Lab
          </span>
          <h1 className="text-2xl font-black text-white">
            Williamson Synthesis, Interhalogens, Zwitterions & Polymerisation
          </h1>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
          {(['discovery', 'learn', 'lab', 'challenge'] as ViewMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                audioManager.play('tap');
                setMode(m);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                mode === m ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </nav>
      </header>

      {/* MODE 1: DISCOVERY QUESTION (Predict Before Learn) */}
      {mode === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-mono font-bold">
              Predictive Discovery Phase
            </span>
            <span className="text-xs text-slate-400 font-mono">Test your intuitive chemistry model</span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-amber-300">{DISCOVERY_QUESTION.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.scenario}</p>
            <p className="text-base font-semibold text-white mt-2">{DISCOVERY_QUESTION.question}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DISCOVERY_QUESTION.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleDiscoverySubmit(idx)}
                className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                  discoverySelected === idx
                    ? idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                      : 'bg-red-950 border-red-500 text-red-200'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Explanation Banner */}
          {discoveryAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-slate-800 border-l-4 border-amber-400 p-4 rounded-r-xl flex flex-col gap-2"
            >
              <span className="font-bold text-amber-400 text-sm">Chemistry Insight</span>
              <p className="text-xs text-slate-200 leading-relaxed">{DISCOVERY_QUESTION.explanation}</p>
              <button
                onClick={() => setMode('learn')}
                className="mt-2 self-start px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all"
              >
                Start Visual Lessons →
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* MODE 2: GUIDED TEACHING SLIDES */}
      {mode === 'learn' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          {/* Slide Navigation */}
          <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-xl p-3">
            <span className="text-xs font-mono text-slate-400">
              Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}: <strong className="text-emerald-400">{currentSlide.title}</strong>
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentSlideIndex((prev) => prev - 1);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-50 text-xs font-bold rounded-lg"
              >
                ← Prev
              </button>
              <button
                disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentSlideIndex((prev) => prev + 1);
                }}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Main Slide Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  Node: {currentSlide.nodeId}
                </span>
                <h2 className="text-xl font-black text-white">{currentSlide.title}</h2>
                <h3 className="text-xs font-semibold text-slate-400 mt-1">{currentSlide.subtitle}</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed border-t border-b border-slate-800 py-3">
                {currentSlide.content}
              </p>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Key Takeaways</span>
                <ul className="flex flex-col gap-1.5">
                  {currentSlide.keyPoints.map((pt, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dynamic Visual Simulator corresponding to Slide */}
            <div>
              {currentSlide.visualType === 'williamson' && <WilliamsonSimulator />}
              {currentSlide.visualType === 'interhalogen' && <InterhalogenVseprViewer />}
              {currentSlide.visualType === 'zwitterion' && <ZwitterionElectrophoresisLab />}
              {currentSlide.visualType === 'polymer' && <PolymerisationSim />}
            </div>
          </div>
        </motion.div>
      )}

      {/* MODE 3: FREE PLAY LAB SUITE */}
      {mode === 'lab' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          {/* Lab Sub-tabs */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveLab('williamson')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeLab === 'williamson' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Williamson Synthesis
            </button>
            <button
              onClick={() => setActiveLab('interhalogen')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeLab === 'interhalogen' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Interhalogens VSEPR
            </button>
            <button
              onClick={() => setActiveLab('zwitterion')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeLab === 'zwitterion' ? 'bg-purple-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Zwitterions & Gel
            </button>
            <button
              onClick={() => setActiveLab('polymer')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeLab === 'polymer' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Polymerisation
            </button>
          </div>

          {/* Active Visual Lab Component */}
          {activeLab === 'williamson' && <WilliamsonSimulator />}
          {activeLab === 'interhalogen' && <InterhalogenVseprViewer />}
          {activeLab === 'zwitterion' && <ZwitterionElectrophoresisLab />}
          {activeLab === 'polymer' && <PolymerisationSim />}
        </motion.div>
      )}

      {/* MODE 4: ADAPTIVE CHALLENGE SYSTEM */}
      {mode === 'challenge' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative"
        >
          {/* Progress Header */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                Adaptive Assessment • Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{currentChallenge.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                Score: {score} XP
              </span>
            </div>
          </div>

          {/* Question Text */}
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
            {currentChallenge.question}
          </p>

          {/* Hint Bubble Component */}
          <HintBubble show={showHint} text={currentChallenge.hint} />

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentChallenge.options.map((opt, idx) => {
              let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';
              if (selectedOption === idx) {
                btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
              }
              if (challengeSubmitted) {
                if (idx === currentChallenge.correctIndex) {
                  btnStyle = 'bg-emerald-900/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (selectedOption === idx) {
                  btnStyle = 'bg-red-950 border-red-500 text-red-200';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={challengeSubmitted}
                  onClick={() => {
                    audioManager.play('tap');
                    setSelectedOption(idx);
                  }}
                  className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="font-mono font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Submission & Feedback Banner */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-amber-400 hover:underline font-mono"
            >
              💡 Need a hint?
            </button>

            {!challengeSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleChallengeSubmit}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextChallenge}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                Next Challenge →
              </button>
            )}
          </div>

          {/* Detailed Feedback & Misconception Alert */}
          {challengeSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${selectedOption === currentChallenge.correctIndex ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedOption === currentChallenge.correctIndex ? '✓ Correct Explanation' : '✗ Incorrect Concept'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentChallenge.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* MODE 5: MASTERY SUMMARY */}
      {mode === 'mastery' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center gap-6 text-center shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-3xl">
            🏆
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">ISC Chemistry Simulation Complete!</h2>
            <p className="text-sm text-slate-400 mt-1">
              You have demonstrated mastery across all 4 key syllabus nodes.
            </p>
          </div>

          {/* Node Mastery Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl text-left">
            {ALL_NODE_IDS.map((id) => {
              const bkt = bktStateMap[id];
              const mastery = masteryProb(bkt);
              return (
                <div key={id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center font-mono">
                  <span className="text-xs font-bold text-slate-300">{id}</span>
                  <span className="text-xs font-bold text-emerald-400">
                    Mastery: {(mastery * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setMode('discovery');
              setCurrentChallengeIndex(0);
              setScore(0);
            }}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
          >
            Replay Simulation Lab
          </button>
        </motion.div>
      )}
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