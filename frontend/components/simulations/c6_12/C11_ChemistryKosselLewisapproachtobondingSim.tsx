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
    title: "Octet Rule is Universally Obeyed by All Compounds",
    description: "Students believe that every stable chemical compound must strictly have eight electrons in the valence shell of all constituent atoms.",
    correction: "The octet rule is a useful rule of thumb, but it has several major exceptions in stable molecules. Compounds can have incomplete octets like BF3, expanded octets like SF6 and PCl5, or odd numbers of valence electrons like NO. Molecular stability is determined by total energy minimization rather than a rigid requirement of eight electrons.",
  },
  {
    id: "misc_2",
    title: "Formal Charge Represents Actual Physical Charge on an Atom",
    description: "Students assume that the formal charge calculated for an atom reflects its real partial charge or net electrical charge in a molecule.",
    correction: "Formal charge is merely a theoretical bookkeeping tool that assumes equal sharing of bonding electrons regardless of electronegativity differences. It does not represent actual electron density or physical charge distribution on an atom in a real molecule. Instead, it helps chemists evaluate the relative stability of different plausible Lewis structures.",
  },
  {
    id: "misc_3",
    title: "Lewis Structures Depict the True 3D Molecular Geometry",
    description: "Students often believe that the two-dimensional arrangement of electron pairs in a Lewis dot structure directly shows the real 3D shape of a molecule.",
    correction: "Lewis dot structures are designed only to show atom connectivity and the distribution of valence electrons. They contain no intrinsic three-dimensional geometric information such as bond angles or spatial orientation. Predictions of actual molecular shapes require VSEPR theory or orbital hybridization models.",
  },
  {
    id: "misc_4",
    title: "Kossel and Lewis Proposed Identical Mechanisms for Bonding",
    description: "Students frequently blend Kossel's and Lewis's concepts together, assuming both scientists described bonding solely through the sharing of electron pairs.",
    correction: "Lewis proposed the concept of covalent bonding through the mutual sharing of valence electron pairs between atoms. In contrast, Kossel accounted for ionic (electrovalent) bonding based on the complete transfer of electrons between highly electropositive and electronegative elements. Together, their distinct concepts provided a unified framework for chemical bonding based on noble gas electron configurations.",
  },
  {
    id: "misc_5",
    title: "Chemical Bonds Are Strictly Purely Ionic or Purely Covalent",
    description: "Students view chemical bonds as mutually exclusive categories, classifying a bond as either completely 100% ionic or 100% covalent.",
    correction: "Chemical bonding exists on a continuous spectrum rather than in rigid, absolute categories. Covalent bonds between different atoms possess partial ionic character due to electronegativity differences, resulting in dipole moments. Conversely, ionic bonds display partial covalent character due to polarization effects described by Fajan's rules.",
  },
];

// ==========================================
// NODE IDS AND CURRICULUM METADATA
// ==========================================
const ALL_NODE_IDS = [
  'c11_chem_031',
  'c11_chem_032',
  'c11_chem_033',
  'c11_chem_034',
  'c11_chem_035',
  'c11_chem_036',
  'c11_chem_037',
  'c11_chem_038',
  'c11_chem_039',
  'c11_chem_040',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

const NODE_TITLES: Record<NodeId, string> = {
  c11_chem_031: 'Kossel-Lewis approach to bonding',
  c11_chem_032: 'Ionic bond and lattice enthalpy',
  c11_chem_033: 'Covalent bond - sigma and pi bonds',
  c11_chem_034: 'Polar and non-polar covalent bonds',
  c11_chem_035: "Fajan's rules and deviation from octet",
  c11_chem_036: 'VSEPR theory',
  c11_chem_037: 'Hybridisation',
  c11_chem_038: 'Molecular orbital theory',
  c11_chem_039: 'Coordinate (dative) bond',
  c11_chem_040: 'Resonance',
};

// ==========================================
// SCENARIO & CURRICULUM DATA
// ==========================================
const SCENARIO = {
  title: 'ISC Chemical Bonding & Structure Quantum Suite',
  subtitle: 'Master Kossel-Lewis, VSEPR, Hybridisation, MOT & Resonance through interactive visual simulation',
  description: 'Step into the advanced quantum bonding laboratory. Manipulate valence electrons, overlap atomic orbitals, measure lattice enthalpy, test paramagnetism in magnetic fields, and explore resonance delocalisation.',
};

const DISCOVERY_QUESTION = {
  question: 'Oxygen gas (O₂) is drawn toward a strong magnet in liquid form. What fundamental property of bonding explains this surprising paramagnetism?',
  options: [
    { id: 'opt1', text: 'Static ionic charges formed by electron transfer from one O to another.' },
    { id: 'opt2', text: 'Two unpaired electrons residing in degenerate π* antibonding molecular orbitals.', correct: true },
    { id: 'opt3', text: 'Free rotation around a single σ bond causing net dipole fluctuations.' },
    { id: 'opt4', text: 'Complete octet completion in a standard Lewis double bond with all paired electrons.' }
  ],
  explanation: 'Standard Lewis structures predict all electrons paired in O=O. However, Molecular Orbital Theory reveals that the last two electrons enter separate degenerate π*2p antibonding orbitals with parallel spins, making O₂ paramagnetic!'
};

// ==========================================
// INTERACTIVE TEACHING SLIDES
// ==========================================
interface SlideData {
  id: string;
  title: string;
  nodeId: NodeId;
  description: string;
  keyTakeaway: string;
  type: 'kossel_ionic' | 'sigma_pi' | 'vsepr_hybrid' | 'mo_theory' | 'resonance_dative';
}

const TEACHING_SLIDES: SlideData[] = [
  {
    id: 'slide_1',
    title: '1. Kossel-Lewis & Ionic Lattice Enthalpy',
    nodeId: 'c11_chem_031',
    description: 'Atoms gain, lose, or share electrons to attain the stable octet/duplet of the nearest noble gas. Ionic bond stability is driven by high Lattice Enthalpy (U) released when gaseous cations and anions assemble into a 3D crystal lattice.',
    keyTakeaway: 'Ionic bonding requires low ionization enthalpy for metal, high electron gain enthalpy for non-metal, and large lattice enthalpy.',
    type: 'kossel_ionic',
  },
  {
    id: 'slide_2',
    title: '2. Sigma vs Pi Bonds & Polarity',
    nodeId: 'c11_chem_033',
    description: 'Sigma (σ) bonds form by head-on (axial) orbital overlap along the internuclear axis, allowing free rotation. Pi (π) bonds form by lateral (sideways) overlap of parallel p-orbitals, restricting rotation. Electronegativity differences create bond dipoles (δ+ and δ-).',
    keyTakeaway: 'A single bond is 1σ; a double bond is 1σ + 1π; a triple bond is 1σ + 2π. Vector sum of dipoles determines overall molecular polarity.',
    type: 'sigma_pi',
  },
  {
    id: 'slide_3',
    title: "3. Fajan's Rules & Octet Exceptions",
    nodeId: 'c11_chem_035',
    description: 'No ionic bond is 100% ionic. Small, highly charged cations polarise large, easily distorted anions, introducing partial covalent character. Moreover, electron-deficient central atoms (BF₃, BeCl₂) and expanded octets (PCl₅, SF₆) show deviations from the octet rule.',
    keyTakeaway: "Small cation + Large anion + High charges = High Polarisation = Greater Covalent Character (Fajan's Rules).",
    type: 'vsepr_hybrid',
  },
  {
    id: 'slide_4',
    title: '4. VSEPR Theory & Hybridisation',
    nodeId: 'c11_chem_036',
    description: 'Electron domains (bonding & lone pairs) arrange in space to minimise electrostatic repulsion. Hybridisation mixes atomic s, p, and d orbitals into equivalent directional hybrid orbitals (sp, sp², sp³, sp³d, sp³d²) that dictate molecular geometry.',
    keyTakeaway: 'Lone pair - lone pair repulsion > lone pair - bonding pair > bonding pair - bonding pair. Lone pairs compress ideal bond angles!',
    type: 'vsepr_hybrid',
  },
  {
    id: 'slide_5',
    title: '5. Molecular Orbital Theory, Dative Bonds & Resonance',
    nodeId: 'c11_chem_038',
    description: 'LCAO constructs bonding (constructive, low E) and antibonding (destructive, high E) MOs. Bond Order = ½(N_b - N_a). Dative/Coordinate bonds involve 1-sided pair donation. Resonance delocalises π electrons across equivalent canonical forms.',
    keyTakeaway: 'O₂ is paramagnetic with 2 unpaired π* electrons and Bond Order 2.0. Resonance forms blend into a stable hybrid with equalised bond lengths.',
    type: 'mo_theory',
  },
];

// ==========================================
// ADAPTIVE CHALLENGES (10 PROGRESSIVE TASKS)
// ==========================================
interface ChallengeData {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  options: { id: string; text: string; correct?: boolean }[];
  hint: string;
  misconceptionFeedback: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
}

const CHALLENGES: ChallengeData[] = [
  {
    id: 'ch_31',
    nodeId: 'c11_chem_031',
    title: 'Kossel-Lewis Octet Rule',
    question: 'Why does a chlorine atom form a Cl⁻ ion rather than a Cl⁺ ion during reaction with sodium?',
    options: [
      { id: 'a', text: 'Cl (2,8,7) needs 1 electron to complete its argon octet; gaining 1 e⁻ releases energy and creates stable Cl⁻.', correct: true },
      { id: 'b', text: 'Cl⁺ ion has a neon octet while Cl⁻ has an incomplete shell.' },
      { id: 'c', text: 'Removing an electron from chlorine requires very low energy compared to sodium.' },
      { id: 'd', text: 'Chlorine is a electropositive metal that readily forms cations.' }
    ],
    hint: 'Check the valence configuration of Cl (2,8,7). Is it easier to gain 1 e⁻ or lose 7 e⁻?',
    misconceptionFeedback: 'Chlorine is a highly electronegative non-metal with 7 valence electrons. Gaining 1 e⁻ satisfies the octet rule to reach argon configuration [2,8,8].',
    difficulty: 'foundation',
  },
  {
    id: 'ch_32',
    nodeId: 'c11_chem_032',
    title: 'Lattice Enthalpy & Ionic Stability',
    question: 'Which pair of ionic compounds is correctly ordered by increasing magnitude of Lattice Enthalpy?',
    options: [
      { id: 'a', text: 'NaCl < MgO (MgO has higher ion charges (+2/-2 vs +1/-1) and smaller interionic distance)', correct: true },
      { id: 'b', text: 'MgO < NaCl because Na⁺ is smaller than Mg²⁺.' },
      { id: 'c', text: 'NaCl = MgO because both form cubic rock-salt lattices.' },
      { id: 'd', text: 'KCl > NaCl because K⁺ is larger than Na⁺.' }
    ],
    hint: 'Lattice energy U ∝ (q₁·q₂)/r. Consider the ion charges (+2/-2 vs +1/-1).',
    misconceptionFeedback: 'Higher ionic charges (+2 on Mg²⁺, -2 on O²⁻) multiply the electrostatic force by 4× compared to +1/-1 in NaCl, greatly increasing lattice enthalpy.',
    difficulty: 'standard',
  },
  {
    id: 'ch_33',
    nodeId: 'c11_chem_033',
    title: 'Sigma and Pi Bonds in Ethyne',
    question: 'How many σ (sigma) and π (pi) bonds are present in a molecule of ethyne (HC≡CH)?',
    options: [
      { id: 'a', text: '3 σ bonds (2 C-H and 1 C-C) and 2 π bonds (sideways 2p-2p overlaps)', correct: true },
      { id: 'b', text: '5 σ bonds and 0 π bonds.' },
      { id: 'c', text: '2 σ bonds and 3 π bonds.' },
      { id: 'd', text: '1 σ bond and 4 π bonds.' }
    ],
    hint: 'Count single C-H bonds as σ. In C≡C, 1 bond is head-on (σ) and 2 are lateral (π).',
    misconceptionFeedback: 'In HC≡CH: Each C-H is 1 σ bond (2 total). The triple C≡C consists of 1 σ and 2 π bonds. Total: 3 σ and 2 π.',
    difficulty: 'foundation',
  },
  {
    id: 'ch_34',
    nodeId: 'c11_chem_034',
    title: 'Molecular Polarity & Geometry',
    question: 'Carbon dioxide (CO₂) contains two strongly polar C=O bonds, yet its overall dipole moment µ = 0 D. Why?',
    options: [
      { id: 'a', text: 'CO₂ is linear (180°); the two equal C=O bond dipoles point in exact opposite directions and cancel vectorially.', correct: true },
      { id: 'b', text: 'Carbon and oxygen have identical electronegativity.' },
      { id: 'c', text: 'The C=O bond is purely non-polar covalent.' },
      { id: 'd', text: 'CO₂ is a bent molecule like H₂O.' }
    ],
    hint: 'Dipole moment is a vector quantity. Consider the 180° linear shape of O=C=O.',
    misconceptionFeedback: 'Bond polarity does NOT guarantee molecular polarity! Symmetrical linear geometry causes equal bond dipoles to cancel vectorially (µ_net = 0).',
    difficulty: 'standard',
  },
  {
    id: 'ch_35',
    nodeId: 'c11_chem_035',
    title: "Fajan's Rules Application",
    question: 'Why is Aluminium Chloride (AlCl₃) predominantly covalent in nature, while Sodium Chloride (NaCl) is ionic?',
    options: [
      { id: 'a', text: 'Al³⁺ is a small, highly charged (+3) cation with huge polarising power that distorts the Cl⁻ electron cloud.', correct: true },
      { id: 'b', text: 'Na⁺ has a higher charge density than Al³⁺.' },
      { id: 'c', text: 'Chlorine refuses to accept electrons from aluminium.' },
      { id: 'd', text: 'AlCl₃ forms an infinite 3D ionic crystal without polarisation.' }
    ],
    hint: "Think about cation size and charge (+3 vs +1). Fajan's rules relate charge density to polarising power.",
    misconceptionFeedback: "According to Fajan's rules, small cation radius + high charge (+3 on Al³⁺) = intense polarising power, pulling Cl⁻ electron density into shared covalent space.",
    difficulty: 'standard',
  },
  {
    id: 'ch_36',
    nodeId: 'c11_chem_036',
    title: 'VSEPR Geometry & Lone Pair Repulsion',
    question: 'Predict the molecular geometry and bond angle of Ammonia (NH₃) using VSEPR theory.',
    options: [
      { id: 'a', text: 'Trigonal Pyramidal geometry with ~107° bond angle (1 lone pair repels 3 N-H bonding pairs).', correct: true },
      { id: 'b', text: 'Perfect Tetrahedral with 109.5° bond angle.' },
      { id: 'c', text: 'Trigonal Planar with 120° bond angle.' },
      { id: 'd', text: 'Bent geometry with 104.5° bond angle.' }
    ],
    hint: 'Nitrogen has 5 valence e⁻: 3 bonding pairs with H + 1 lone pair. Total steric number = 4.',
    misconceptionFeedback: 'Steric number is 4 (Tetrahedral electron geometry), but 1 lone pair compresses the H-N-H bond angle from 109.5° down to ~107°, making the molecular shape Pyramidal!',
    difficulty: 'standard',
  },
  {
    id: 'ch_37',
    nodeId: 'c11_chem_037',
    title: 'Hybridisation in PCl₅ & SF₆',
    question: 'What is the hybridisation state and geometry of the central Phosphorus atom in PCl₅?',
    options: [
      { id: 'a', text: 'sp³d hybridisation with Trigonal Bipyramidal geometry (3 equatorial bonds at 120°, 2 axial at 90°).', correct: true },
      { id: 'b', text: 'sp³d² hybridisation with Octahedral geometry.' },
      { id: 'c', text: 'sp³ hybridisation with Tetrahedral geometry.' },
      { id: 'd', text: 'sp² hybridisation with Trigonal Planar geometry.' }
    ],
    hint: 'P in PCl₅ has 5 single σ bonds and 0 lone pairs. Steric number = 5 (1s + 3p + 1d).',
    misconceptionFeedback: 'Phosphorus expands its octet using 3d orbitals. 1s + 3p + 1d mixing gives 5 sp³d hybrid orbitals directed in Trigonal Bipyramidal arrangement.',
    difficulty: 'advanced',
  },
  {
    id: 'ch_38',
    nodeId: 'c11_chem_038',
    title: 'Molecular Orbital Theory & Bond Order',
    question: 'Calculate the Bond Order of O₂⁺ and state whether it is paramagnetic or diamagnetic.',
    options: [
      { id: 'a', text: 'Bond Order = 2.5; Paramagnetic (1 unpaired electron in π*2p orbital).', correct: true },
      { id: 'b', text: 'Bond Order = 2.0; Diamagnetic (all electrons paired).' },
      { id: 'c', text: 'Bond Order = 1.5; Paramagnetic.' },
      { id: 'd', text: 'Bond Order = 3.0; Diamagnetic.' }
    ],
    hint: 'O₂ has 16 e⁻ (N_b=10, N_a=6, BO=2). O₂⁺ loses 1 e⁻ from an antibonding π*2p orbital (N_b=10, N_a=5).',
    misconceptionFeedback: 'O₂⁺ has 15 valence e⁻. Removing 1 antibonding e⁻ increases Bond Order = ½(10 - 5) = 2.5. Leaves 1 unpaired e⁻ in π*2p, so it remains Paramagnetic!',
    difficulty: 'advanced',
  },
  {
    id: 'ch_39',
    nodeId: 'c11_chem_039',
    title: 'Coordinate (Dative) Bond in NH₄⁺',
    question: 'In the formation of the ammonium ion (NH₃ + H⁺ → NH₄⁺), which species acts as the Lewis Base (donor)?',
    options: [
      { id: 'a', text: 'NH₃ is the Lewis Base because the Nitrogen atom donates its unshared lone pair into H⁺ empty 1s orbital.', correct: true },
      { id: 'b', text: 'H⁺ is the Lewis Base because it donates a proton.' },
      { id: 'c', text: 'Both NH₃ and H⁺ contribute 1 electron each.' },
      { id: 'd', text: 'Nitrogen accepts an electron pair from hydrogen.' }
    ],
    hint: 'A coordinate bond forms when ONE atom supplies BOTH bonding electrons. Which atom has a lone pair?',
    misconceptionFeedback: 'NH₃ has a lone pair on Nitrogen (Lewis Base / donor). H⁺ has an empty orbital (Lewis Acid / acceptor). The resulting N→H bond is a coordinate bond.',
    difficulty: 'foundation',
  },
  {
    id: 'ch_40',
    nodeId: 'c11_chem_040',
    title: 'Resonance in Carbonate Ion (CO₃²⁻)',
    question: 'What is the true C-O bond order in the carbonate ion (CO₃²⁻) based on its resonance structures?',
    options: [
      { id: 'a', text: '1.33 (4 bonding electron pairs delocalised equally over 3 C-O linkages).', correct: true },
      { id: 'b', text: '1.0 for two bonds and 2.0 for one bond.' },
      { id: 'c', text: '1.50 equally for all bonds.' },
      { id: 'd', text: '2.00 for all bonds.' },
    ],
    hint: 'CO₃²⁻ has 3 equivalent canonical forms (1 C=O double bond + 2 C-O⁻ single bonds). Total bonds = 4.',
    misconceptionFeedback: 'The real carbonate ion is a resonance hybrid. 4 shared pairs divided over 3 C-O bonds gives a fractional bond order of 4/3 = 1.33, making all 3 C-O bonds identical in length!',
    difficulty: 'advanced',
  },
];

// ==========================================
// MISCONCEPTIONS REGISTRY
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Ionisation vs Dissociation',
    description: 'Confusing ionization (formation of ions from neutral atoms via electron transfer) with electrolytic dissociation (separation of pre-existing ions in liquid/solution).',
  },
  {
    id: 'misc_2',
    title: 'Double Bond Strength',
    description: 'Believing a double bond is twice as strong as a single bond. In reality, π bonds are weaker than σ bonds due to less effective lateral overlap.',
  },
  {
    id: 'misc_3',
    title: 'Electron Geometry vs Molecular Shape',
    description: 'Failing to remove lone pairs when predicting molecular shape in VSEPR (e.g. calling NH₃ tetrahedral instead of pyramidal).',
  },
  {
    id: 'misc_4',
    title: 'Resonance Oscillation Myth',
    description: 'Thinking a molecule rapidly flips back and forth between resonance structures. It actually exists as a static, blended resonance hybrid!',
  },
];

// ==========================================
// CUSTOM SVG VISUALIZERS
// ==========================================

// 1. Interactive Lewis & Ionic Transfer Builder
const LewisBuilderVisualizer: React.FC<{
  metal: 'Na' | 'Mg';
  nonMetal: 'Cl' | 'O';
  transferredCount: number;
  onTransfer: () => void;
}> = ({ metal, nonMetal, transferredCount, onTransfer }) => {
  const isMg = metal === 'Mg';
  const isO = nonMetal === 'O';
  const maxTransfer = isMg && isO ? 2 : isMg ? 2 : isO ? 2 : 1;

  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full max-w-md my-2">
      <div className="text-xs text-amber-300 font-semibold mb-2">Interactive Electron Transfer Simulator</div>
      <svg width="320" height="140" className="bg-slate-950 rounded-lg border border-slate-800">
        {/* Metal Atom */}
        <g transform="translate(80, 70)">
          <circle r="36" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text textAnchor="middle" dy="5" fill="#e2e8f0" className="font-bold text-lg">{metal}</text>
          {/* Metal Valence dots */}
          {Array.from({ length: (isMg ? 2 : 1) - transferredCount }).map((_, i) => (
            <circle
              key={i}
              cx={32 * Math.cos((i * Math.PI) / 2)}
              cy={32 * Math.sin((i * Math.PI) / 2)}
              r="4"
              fill="#f59e0b"
            />
          ))}
          {transferredCount > 0 && (
            <text textAnchor="middle" dy="-22" fill="#38bdf8" className="text-xs font-bold">
              {metal}{transferredCount === 1 ? '+' : '²⁺'}
            </text>
          )}
        </g>

        {/* Transfer Arrow */}
        <path
          d="M 120 70 Q 160 30 200 70"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="4 4"
          className={transferredCount < maxTransfer ? 'animate-pulse' : ''}
        />
        <polygon points="198,64 206,70 198,76" fill="#f59e0b" />

        {/* Non-Metal Atom */}
        <g transform="translate(240, 70)">
          <circle r="36" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
          <text textAnchor="middle" dy="5" fill="#e2e8f0" className="font-bold text-lg">{nonMetal}</text>
          {/* Original dots */}
          {Array.from({ length: isO ? 6 : 7 }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / 8;
            return (
              <circle
                key={i}
                cx={32 * Math.cos(angle)}
                cy={32 * Math.sin(angle)}
                r="4"
                fill="#ec4899"
              />
            );
          })}
          {/* Transferred dots */}
          {Array.from({ length: transferredCount }).map((_, i) => {
            const angle = ((isO ? 6 + i : 7 + i) * 2 * Math.PI) / 8;
            return (
              <circle
                key={`trans-${i}`}
                cx={32 * Math.cos(angle)}
                cy={32 * Math.sin(angle)}
                r="5"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1"
              />
            );
          })}
          {transferredCount > 0 && (
            <text textAnchor="middle" dy="-22" fill="#a855f7" className="text-xs font-bold">
              {nonMetal}{transferredCount === 1 ? '⁻' : '²⁻'}
            </text>
          )}
        </g>
      </svg>

      <button
        onClick={onTransfer}
        disabled={transferredCount >= maxTransfer}
        className={`mt-3 px-4 py-1.5 rounded-lg text-xs font-bold transition ${
          transferredCount >= maxTransfer
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:brightness-110 shadow-lg'
        }`}
      >
        {transferredCount >= maxTransfer ? 'Octet Reached! Crystal Lattice Formed' : 'Transfer Valence Electron →'}
      </button>
    </div>
  );
};

// 2. Orbital Overlap (Sigma vs Pi) Visualizer
const OrbitalOverlapVisualizer: React.FC<{ type: 'sigma' | 'pi'; rotation: number }> = ({ type, rotation }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full max-w-md my-2">
      <div className="text-xs text-gold-300 font-semibold mb-2">
        {type === 'sigma' ? 'Head-On (Axial) Overlap → Sigma (σ) Bond' : 'Sideways (Lateral) Overlap → Pi (π) Bond'}
      </div>
      <svg width="320" height="130" className="bg-slate-950 rounded-lg border border-slate-800">
        {type === 'sigma' ? (
          <g transform="translate(160, 65)">
            {/* Left orbital lobe */}
            <ellipse cx="-25" cy="0" rx="35" ry="20" fill="url(#sigmaGradLeft)" opacity="0.85" />
            {/* Right orbital lobe */}
            <ellipse cx="25" cy="0" rx="35" ry="20" fill="url(#sigmaGradRight)" opacity="0.85" />
            {/* High electron density overlap zone */}
            <ellipse cx="0" cy="0" rx="15" ry="18" fill="#38bdf8" opacity="0.9" />
            {/* Nuclei */}
            <circle cx="-35" cy="0" r="4" fill="#ffffff" />
            <circle cx="35" cy="0" r="4" fill="#ffffff" />
            <line x1="-50" y1="0" x2="50" y2="0" stroke="#94a3b8" strokeDasharray="3 3" />
            <text x="0" y="45" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-mono">
              High e⁻ density along internuclear axis (Free Rotation)
            </text>
          </g>
        ) : (
          <g transform={`translate(160, 65) rotate(${rotation})`}>
            {/* Top overlap lobe */}
            <path d="M -30 -10 C -15 -45, 15 -45, 30 -10 C 15 -5, -15 -5, -30 -10" fill="#ec4899" opacity="0.8" />
            {/* Bottom overlap lobe */}
            <path d="M -30 10 C -15 45, 15 45, 30 10 C 15 5, -15 5, -30 10" fill="#a855f7" opacity="0.8" />
            {/* Nuclei */}
            <circle cx="-30" cy="0" r="4" fill="#ffffff" />
            <circle cx="30" cy="0" r="4" fill="#ffffff" />
            <line x1="-50" y1="0" x2="50" y2="0" stroke="#94a3b8" strokeDasharray="3 3" />
            {Math.abs(rotation) > 20 && (
              <text x="0" y="0" textAnchor="middle" fill="#ef4444" className="text-[10px] font-bold">
                ⚠️ Overlap Destroyed by Rotation!
              </text>
            )}
          </g>
        )}
        <defs>
          <linearGradient id="sigmaGradLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="sigmaGradRight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// 3. VSEPR 3D Shape & Angle Compression Visualizer
const VseprShapeVisualizer: React.FC<{
  molecule: 'CH4' | 'NH3' | 'H2O' | 'PCl5' | 'SF6';
}> = ({ molecule }) => {
  const configs = {
    CH4: { name: 'Methane (CH₄)', angle: '109.5°', shape: 'Tetrahedral', bp: 4, lp: 0, color: '#38bdf8' },
    NH3: { name: 'Ammonia (NH₃)', angle: '107°', shape: 'Trigonal Pyramidal', bp: 3, lp: 1, color: '#f59e0b' },
    H2O: { name: 'Water (H₂O)', angle: '104.5°', shape: 'Bent / V-Shaped', bp: 2, lp: 2, color: '#ec4899' },
    PCl5: { name: 'Phosphorus Pentachloride (PCl₅)', angle: '120° / 90°', shape: 'Trigonal Bipyramidal', bp: 5, lp: 0, color: '#10b981' },
    SF6: { name: 'Sulfur Hexafluoride (SF₆)', angle: '90°', shape: 'Octahedral', bp: 6, lp: 0, color: '#a855f7' },
  };

  const curr = configs[molecule];

  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full max-w-md my-2">
      <div className="flex justify-between w-full px-2 mb-1 text-xs">
        <span className="font-bold text-slate-200">{curr.name}</span>
        <span className="text-amber-400 font-mono font-bold">Angle: {curr.angle}</span>
      </div>
      <svg width="320" height="150" className="bg-slate-950 rounded-lg border border-slate-800">
        <g transform="translate(160, 75)">
          {/* Central Atom */}
          <circle r="22" fill="#1e293b" stroke={curr.color} strokeWidth="2.5" />
          <text textAnchor="middle" dy="4" fill="#ffffff" className="text-xs font-bold">
            {molecule.replace(/[\d]/g, '')}
          </text>

          {/* Lone pair visual clouds if applicable */}
          {curr.lp >= 1 && (
            <g transform="translate(0, -38)">
              <ellipse cx="0" cy="0" rx="14" ry="20" fill="#f59e0b" opacity="0.4" />
              <circle cx="-4" cy="-2" r="2.5" fill="#f59e0b" />
              <circle cx="4" cy="-2" r="2.5" fill="#f59e0b" />
              <text x="0" y="-22" textAnchor="middle" fill="#f59e0b" className="text-[9px] font-bold">
                Lone Pair
              </text>
            </g>
          )}
          {curr.lp >= 2 && (
            <g transform="translate(-32, -22) rotate(-35)">
              <ellipse cx="0" cy="0" rx="12" ry="18" fill="#ec4899" opacity="0.4" />
              <circle cx="-3" cy="0" r="2.5" fill="#ec4899" />
              <circle cx="3" cy="0" r="2.5" fill="#ec4899" />
            </g>
          )}

          {/* Bonds to outer atoms */}
          {Array.from({ length: curr.bp }).map((_, i) => {
            const total = curr.bp;
            const startAngle = curr.lp > 0 ? Math.PI / 4 : 0;
            const angle = startAngle + (i * (2 * Math.PI - (curr.lp * Math.PI) / 3)) / total;
            const x2 = 52 * Math.cos(angle);
            const y2 = 52 * Math.sin(angle);
            return (
              <g key={i}>
                <line x1="0" y1="0" x2={x2} y2={y2} stroke={curr.color} strokeWidth="3" />
                <circle cx={x2} cy={y2} r="10" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                <text x={x2} y={y2 + 3} textAnchor="middle" fill="#ffffff" className="text-[9px] font-bold">
                  {molecule === 'CH4' || molecule === 'NH3' || molecule === 'H2O' ? 'H' : molecule === 'PCl5' ? 'Cl' : 'F'}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-300">
        Shape: <span className="font-bold text-emerald-400">{curr.shape}</span> | BP: {curr.bp} | LP: {curr.lp}
      </div>
    </div>
  );
};

// 4. Molecular Orbital Energy Level & Magnetic Tester
const MoDiagramVisualizer: React.FC<{
  species: 'N2' | 'O2' | 'O2_plus';
  onTestMagnet: () => void;
  isMagnetActive: boolean;
}> = ({ species, onTestMagnet, isMagnetActive }) => {
  const isO2 = species === 'O2' || species === 'O2_plus';
  const isPlus = species === 'O2_plus';

  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full max-w-md my-2">
      <div className="flex justify-between w-full px-2 mb-1 text-xs">
        <span className="font-bold text-gold-300">MO Diagram: {species.replace('_plus', '⁺')}</span>
        <span className="font-mono text-emerald-400 font-bold">
          BO = {species === 'N2' ? '3.0' : species === 'O2' ? '2.0' : '2.5'}
        </span>
      </div>

      <svg width="320" height="160" className="bg-slate-950 rounded-lg border border-slate-800">
        {/* Energy axis */}
        <line x1="25" y1="140" x2="25" y2="20" stroke="#64748b" strokeWidth="2" />
        <polygon points="25,14 20,24 30,24" fill="#64748b" />
        <text x="12" y="80" fill="#94a3b8" className="text-[9px] -rotate-90 origin-center">Energy</text>

        <g transform="translate(45, 10)">
          {/* pi* 2p antibonding */}
          <line x1="80" y1="30" x2="120" y2="30" stroke="#ef4444" strokeWidth="2" />
          <line x1="130" y1="30" x2="170" y2="30" stroke="#ef4444" strokeWidth="2" />
          <text x="210" y="33" fill="#ef4444" className="text-[9px]">π*2px, π*2py</text>

          {/* Electrons in pi* 2p */}
          {isO2 && (
            <>
              <line x1="100" y1="35" x2="100" y2="22" stroke="#f59e0b" strokeWidth="2" />
              <polygon points="100,20 97,26 103,26" fill="#f59e0b" />
              {!isPlus && (
                <>
                  <line x1="150" y1="35" x2="150" y2="22" stroke="#f59e0b" strokeWidth="2" />
                  <polygon points="150,20 147,26 153,26" fill="#f59e0b" />
                </>
              )}
            </>
          )}

          {/* sigma 2p / pi 2p levels */}
          <line x1="105" y1="65" x2="145" y2="65" stroke="#10b981" strokeWidth="2" />
          <text x="210" y="68" fill="#10b981" className="text-[9px]">
            {isO2 ? 'π2px, π2py' : 'σ2pz'}
          </text>

          <line x1="80" y1="95" x2="120" y2="95" stroke="#10b981" strokeWidth="2" />
          <line x1="130" y1="95" x2="170" y2="95" stroke="#10b981" strokeWidth="2" />
          <text x="210" y="98" fill="#10b981" className="text-[9px]">
            {isO2 ? 'σ2pz' : 'π2px, π2py'}
          </text>

          {/* sigma 2s and sigma* 2s */}
          <line x1="105" y1="125" x2="145" y2="125" stroke="#ef4444" strokeWidth="2" />
          <text x="210" y="128" fill="#ef4444" className="text-[9px]">σ*2s</text>
        </g>
      </svg>

      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={onTestMagnet}
          className="px-3 py-1 bg-gradient-to-r from-purple-600 to-gold-600 text-white text-xs font-bold rounded-md hover:brightness-110 shadow"
        >
          {isMagnetActive ? 'Remove Magnetic Field 🧲' : 'Apply External Magnetic Field 🧲'}
        </button>
      </div>

      {isMagnetActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-2 text-xs font-bold p-1.5 rounded-md text-center w-full ${
            species === 'N2' ? 'bg-slate-800 text-slate-300' : 'bg-amber-950/80 text-amber-300 border border-amber-600/50'
          }`}
        >
          {species === 'N2'
            ? 'Diamagnetic: All electrons paired → Repelled by magnetic field!'
            : 'Paramagnetic: Unpaired π* electrons present → Attracted into magnetic poles!'}
        </motion.div>
      )}
    </div>
  );
};

// 5. Resonance Hybrid & Canonical Forms Visualizer
const ResonanceVisualizer: React.FC<{
  activeForm: number;
  onNextForm: () => void;
}> = ({ activeForm, onNextForm }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700 w-full max-w-md my-2">
      <div className="text-xs text-purple-300 font-semibold mb-2">
        Carbonate Ion (CO₃²⁻) Resonance Hybrid
      </div>

      <svg width="320" height="140" className="bg-slate-950 rounded-lg border border-slate-800">
        <g transform="translate(160, 70)">
          {/* Central Carbon */}
          <circle r="18" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
          <text textAnchor="middle" dy="4" fill="#ffffff" className="text-xs font-bold">C</text>

          {/* 3 Oxygen atoms at 120 deg */}
          {[0, 1, 2].map((idx) => {
            const angle = (idx * 2 * Math.PI) / 3 - Math.PI / 2;
            const x = 50 * Math.cos(angle);
            const y = 50 * Math.sin(angle);
            const isDouble = activeForm === idx;

            return (
              <g key={idx}>
                {/* Single or Double Bond lines */}
                <line x1="0" y1="0" x2={x} y2={y} stroke="#a855f7" strokeWidth={isDouble ? '5' : '2'} />
                {isDouble && (
                  <line
                    x1={8 * Math.cos(angle + Math.PI / 2)}
                    y1={8 * Math.sin(angle + Math.PI / 2)}
                    x2={x + 8 * Math.cos(angle + Math.PI / 2)}
                    y2={y + 8 * Math.sin(angle + Math.PI / 2)}
                    stroke="#ec4899"
                    strokeWidth="2"
                  />
                )}
                {/* Oxygen Atom */}
                <circle cx={x} cy={y} r="14" fill="#334155" stroke="#ec4899" strokeWidth="1.5" />
                <text x={x} y={y + 4} textAnchor="middle" fill="#ffffff" className="text-[10px] font-bold">
                  O
                </text>
                {!isDouble && (
                  <text x={x * 1.3} y={y * 1.3} textAnchor="middle" fill="#ec4899" className="text-[9px] font-bold">
                    ⁻
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      <div className="flex items-center justify-between w-full mt-2 px-2">
        <span className="text-[11px] text-slate-300">
          Form {activeForm + 1} of 3 (Canonical Structure)
        </span>
        <button
          onClick={onNextForm}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-md transition"
        >
          Toggle Canonical Form ↔
        </button>
      </div>
      <div className="mt-1 text-[10px] text-slate-400 text-center">
        Hybrid C-O Bond Order = 4/3 = <span className="text-amber-400 font-bold">1.33</span> (Equal C-O bond lengths!)
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export default function C11_ChemistryKosselLewisapproachtobondingSim() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'challenge' | 'review'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<string | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Challenge & Game Engine State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 300, y: 200 });

  // Interactive Sim States
  const [metalType, setMetalType] = useState<'Na' | 'Mg'>('Na');
  const [nonMetalType, setNonMetalType] = useState<'Cl' | 'O'>('Cl');
  const [transferredElectrons, setTransferredElectrons] = useState(0);

  const [orbitalOverlapType, setOrbitalOverlapType] = useState<'sigma' | 'pi'>('sigma');
  const [bondRotation, setBondRotation] = useState(0);

  const [vseprMolecule, setVseprMolecule] = useState<'CH4' | 'NH3' | 'H2O' | 'PCl5' | 'SF6'>('CH4');

  const [moSpecies, setMoSpecies] = useState<'N2' | 'O2' | 'O2_plus'>('O2');
  const [isMagnetActive, setIsMagnetActive] = useState(false);

  const [resonanceForm, setResonanceForm] = useState(0);

  // Mastery & SRS System State
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Partial<Record<NodeId, ReturnType<typeof createBKTState>>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // SRS Storage
  const [srsItems, setSrsItems] = useState(() => {
    return ALL_NODE_IDS.map((id) => createReviewItem(id, NODE_TITLES[id]));
  });

  // Current Slide & Challenge
  const slide = TEACHING_SLIDES[currentSlideIndex];
  const challenge = CHALLENGES[currentChallengeIndex];

  // Calculated overall mastery
  const overallMastery = useMemo(() => {
    const totalP = ALL_NODE_IDS.reduce((acc, id) => acc + (bktStates[id]?.p_mastery || 0), 0);
    return Math.round((totalP / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  // Audio & Speech Setup
  useEffect(() => {
    audioManager.play('whoosh');
  }, [activeTab, currentSlideIndex, currentChallengeIndex]);

  // Handle Discovery Submission
  const handleDiscoverySubmit = (optId: string) => {
    setDiscoveryAnswer(optId);
    setDiscoverySubmitted(true);
    const selected = DISCOVERY_QUESTION.options.find((o) => o.id === optId);
    if (selected?.correct) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction! Molecular Orbital Theory explains paramagnetism in oxygen gas.');
      speechManager.speak('Great job! Keep going.');
    } else {
      audioManager.play('error');
      speechManager.speak('Interesting guess! Let us explore why classical structures fail and MOT succeeds.');
    }
  };

  // Handle Challenge Option Click
  const handleOptionSelect = (optId: string) => {
    if (challengeSubmitted) return;
    setSelectedOption(optId);
    audioManager.play('tap');
  };

  // Handle Challenge Submission
  const handleChallengeSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedOption || challengeSubmitted) return;
    setChallengeSubmitted(true);

    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top });

    const selected = challenge.options.find((o) => o.id === selectedOption);
    const correct = !!selected?.correct;
    setIsCorrect(correct);

    // Update BKT & SRS
    const targetNode = challenge.nodeId;
    setBktStates((prev) => ({
      ...prev,
      [targetNode]: bktUpdate(prev[targetNode] || createBKTState(), correct),
    }));

    setSrsItems((prev) =>
      prev.map((item) => (item.id === targetNode ? sm2Update(item, correct ? 5 : 2, 0) : item))
    );

    if (correct) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Spot on! Great understanding of chemical bonding concepts.');
      setScore((s) => s + 10);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);

      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowConfetti(true);
        audioManager.play('celebration');
        recordGameScore(ALL_NODE_IDS, score + 10);
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak(challenge.misconceptionFeedback);
    }
  };

  // Next Challenge Handler
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setIsCorrect(null);
      setShowHint(false);
    } else {
      setActiveTab('review');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 select-none relative overflow-x-hidden">
      {/* Top Header Banner */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center bg-slate-900/90 p-4 rounded-2xl border border-slate-800 backdrop-blur shadow-xl mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-gold-500 to-gold-500 text-white uppercase tracking-wider">
              Class 11 ISC Chemistry
            </span>
            <span className="text-xs text-slate-400 font-mono">Nodes c11_chem_031–040</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-purple-400 mt-1">
            {SCENARIO.title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{SCENARIO.subtitle}</p>
        </div>

        {/* Global Stats */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-[10px] uppercase text-slate-400 font-bold">Mastery</div>
            <div className="text-lg font-black text-emerald-400 font-mono">{overallMastery}%</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-[10px] uppercase text-slate-400 font-bold">Score</div>
            <div className="text-lg font-black text-amber-400 font-mono">{score}</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-5xl mx-auto flex justify-center gap-2 mb-6 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
        {[
          { id: 'discovery', label: '1. Discovery' },
          { id: 'learn', label: '2. Interactive Lab' },
          { id: 'challenge', label: '3. Adaptive Suite' },
          { id: 'review', label: '4. Curriculum Review' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN TAB CONTENT */}
      <main className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {/* TAB 1: DISCOVERY QUESTION */}
          {activeTab === 'discovery' && (
            <motion.div
              key="discovery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-2xl max-w-2xl mx-auto"
            >
              <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold mb-3">
                Predict Before Learning
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h2>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleDiscoverySubmit(opt.id)}
                    disabled={discoverySubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition ${
                      discoveryAnswer === opt.id
                        ? opt.correct
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-gold-950/40 border border-gold-800/50 rounded-xl text-xs text-gold-200 mb-4"
                >
                  <p className="font-bold text-gold-300 mb-1">Scientific Insight:</p>
                  <p>{DISCOVERY_QUESTION.explanation}</p>
                </motion.div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveTab('learn')}
                  className="px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white text-xs font-bold rounded-xl hover:brightness-110 shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Laboratory →
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE LEARNING SLIDES & SIMULATORS */}
          {activeTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Slide Theory */}
              <div className="lg:col-span-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono text-gold-400 font-bold uppercase">
                      Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-mono">
                      {slide.nodeId}
                    </span>
                  </div>

                  <h2 className="text-lg font-extrabold text-slate-100 mb-3">{slide.title}</h2>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{slide.description}</p>

                  <div className="p-3 bg-gold-950/40 border border-gold-800/50 rounded-xl mb-4">
                    <div className="text-[11px] font-bold text-gold-300 mb-1">Key Examiner Principle:</div>
                    <div className="text-xs text-gold-200">{slide.keyTakeaway}</div>
                  </div>
                </div>

                {/* Slide Pagination Controls */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentSlideIndex === 0}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <div className="flex gap-1.5">
                    {TEACHING_SLIDES.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all ${
                          i === currentSlideIndex ? 'w-6 bg-gold-400' : 'w-2 bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                        setCurrentSlideIndex((prev) => prev + 1);
                      } else {
                        setActiveTab('challenge');
                      }
                    }}
                    className="px-4 py-1.5 bg-gold-500 text-white rounded-lg text-xs font-bold hover:brightness-110"
                  >
                    {currentSlideIndex === TEACHING_SLIDES.length - 1 ? 'Start Challenges →' : 'Next →'}
                  </button>
                </div>
              </div>

              {/* Right Column: Contextual Interactive Visualizer */}
              <div className="lg:col-span-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                {currentSlideIndex === 0 && (
                  <div className="w-full flex flex-col items-center">
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => {
                          setMetalType('Na');
                          setNonMetalType('Cl');
                          setTransferredElectrons(0);
                        }}
                        className={`px-3 py-1 rounded-md text-xs font-bold ${
                          metalType === 'Na' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        NaCl
                      </button>
                      <button
                        onClick={() => {
                          setMetalType('Mg');
                          setNonMetalType('O');
                          setTransferredElectrons(0);
                        }}
                        className={`px-3 py-1 rounded-md text-xs font-bold ${
                          metalType === 'Mg' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        MgO
                      </button>
                    </div>

                    <LewisBuilderVisualizer
                      metal={metalType}
                      nonMetal={nonMetalType}
                      transferredCount={transferredElectrons}
                      onTransfer={() => {
                        audioManager.play('pop');
                        setTransferredElectrons((prev) => prev + 1);
                      }}
                    />
                  </div>
                )}

                {currentSlideIndex === 1 && (
                  <div className="w-full flex flex-col items-center">
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setOrbitalOverlapType('sigma')}
                        className={`px-3 py-1 rounded-md text-xs font-bold ${
                          orbitalOverlapType === 'sigma' ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Sigma (σ) Overlap
                      </button>
                      <button
                        onClick={() => setOrbitalOverlapType('pi')}
                        className={`px-3 py-1 rounded-md text-xs font-bold ${
                          orbitalOverlapType === 'pi' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Pi (π) Overlap
                      </button>
                    </div>

                    <OrbitalOverlapVisualizer type={orbitalOverlapType} rotation={bondRotation} />

                    {orbitalOverlapType === 'pi' && (
                      <div className="w-full max-w-xs mt-2 text-center">
                        <label className="text-[11px] text-slate-400 block mb-1">
                          Rotate Internuclear Axis: {bondRotation}°
                        </label>
                        <input
                          type="range"
                          min="-45"
                          max="45"
                          value={bondRotation}
                          onChange={(e) => setBondRotation(Number(e.target.value))}
                          className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )}

                {currentSlideIndex === 2 && (
                  <div className="w-full flex flex-col items-center">
                    <div className="text-xs text-center text-amber-300 font-semibold mb-2">
                      Fajan&apos;s Polarization: Cation Charge Density
                    </div>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300 w-full">
                      <div className="flex justify-between items-center p-2 bg-slate-900 rounded-lg">
                        <span>NaCl (Na⁺, r=102 pm)</span>
                        <span className="text-emerald-400 font-bold">100% Ionic</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-900 rounded-lg">
                        <span>MgCl₂ (Mg²⁺, r=72 pm)</span>
                        <span className="text-amber-400 font-bold">Partial Covalent</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-900 rounded-lg">
                        <span>AlCl₃ (Al³⁺, r=53 pm)</span>
                        <span className="text-purple-400 font-bold">Predominantly Covalent</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlideIndex === 3 && (
                  <div className="w-full flex flex-col items-center">
                    <div className="flex flex-wrap gap-1.5 justify-center mb-2">
                      {(['CH4', 'NH3', 'H2O', 'PCl5', 'SF6'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setVseprMolecule(m)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            vseprMolecule === m ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>

                    <VseprShapeVisualizer molecule={vseprMolecule} />
                  </div>
                )}

                {currentSlideIndex === 4 && (
                  <div className="w-full flex flex-col items-center">
                    <div className="flex gap-2 mb-2">
                      {(['O2', 'N2', 'O2_plus'] as const).map((sp) => (
                        <button
                          key={sp}
                          onClick={() => setMoSpecies(sp)}
                          className={`px-3 py-1 rounded-md text-xs font-bold ${
                            moSpecies === sp ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {sp.replace('_plus', '⁺')}
                        </button>
                      ))}
                    </div>

                    <MoDiagramVisualizer
                      species={moSpecies}
                      isMagnetActive={isMagnetActive}
                      onTestMagnet={() => setIsMagnetActive(!isMagnetActive)}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: ADAPTIVE CHALLENGES */}
          {activeTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-2xl mx-auto bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-2xl relative"
            >
              <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

              {/* Challenge Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </span>
                  <span className="ml-2 text-xs text-gold-400 font-mono">{challenge.nodeId}</span>
                </div>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold"
                >
                  {showHint ? 'Hide Hint' : '💡 Need Hint?'}
                </button>
              </div>

              <HintBubble show={showHint} text={challenge.hint} />

              <h2 className="text-base md:text-lg font-bold text-slate-100 mb-4">{challenge.question}</h2>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {challenge.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    disabled={challengeSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition ${
                      selectedOption === opt.id
                        ? challengeSubmitted
                          ? opt.correct
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-gold-950/80 border-gold-500 text-gold-200'
                        : challengeSubmitted && opt.correct
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {/* Feedback Banner */}
              {challengeSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl border mb-6 text-xs ${
                    isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1">{isCorrect ? '✅ Correct Answer!' : '❌ Concept Review Needed'}</div>
                  <div>{challenge.misconceptionFeedback}</div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2">
                {!challengeSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={!selectedOption}
                    className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-xl text-xs disabled:opacity-40 hover:brightness-110 shadow-lg"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-xs hover:brightness-110 shadow-lg"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Mastery Report →'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: REVIEW & CURRICULUM MASTERY */}
          {activeTab === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <Confetti show={showConfetti} />
              <SuccessBanner show={overallMastery >= 70} text="ISC Quantum Bonding Mastery Achieved!" />

              {/* Mastery Overview Dashboard */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <h2 className="text-lg font-bold text-slate-100 mb-4">Curriculum Mastery Breakdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ALL_NODE_IDS.map((nodeId) => {
                    const bkt = bktStates[nodeId];
                    const level = getMasteryLevel(bkt?.p_mastery || 0);
                    return (
                      <div key={nodeId} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <div className="text-xs font-bold text-slate-200">{NODE_TITLES[nodeId]}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{nodeId}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-gold-400 font-mono">{Math.round((bkt?.p_mastery || 0) * 100)}%</div>
                          <div className="text-[9px] uppercase font-extrabold text-slate-400">{level}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real World Applications */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-md font-bold text-amber-300 mb-3">Real-World & Industrial Chemistry Connections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-100 block mb-1">🧂 Salt Pans of Rajasthan & Kutch (NaCl)</span>
                    Ionic bonding and high lattice enthalpy make NaCl solid at room temperature, vital for human electrolytes.
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-100 block mb-1">⚡ SF₆ Insulator in Electrical Substation</span>
                    Sulfur Hexafluoride utilizes expanded octet sp³d² hybridisation to act as an unreactive dielectric gas.
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-100 block mb-1">🧬 DNA Base Pairing (H-Bonds)</span>
                    Polar covalent N-H and O-H bonds create weak hydrogen bond networks holding double-helix DNA strands.
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-100 block mb-1">🚀 Cryogenic Liquid O₂ in Rocket Engines</span>
                    MOT paramagnetism explains how liquid oxygen behaves in magnetic fuel transport systems for space flight.
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => {
                    setActiveTab('challenge');
                    setCurrentChallengeIndex(0);
                    setScore(0);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-xl text-xs hover:brightness-110 shadow-lg"
                >
                  Restart Simulation Suite
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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