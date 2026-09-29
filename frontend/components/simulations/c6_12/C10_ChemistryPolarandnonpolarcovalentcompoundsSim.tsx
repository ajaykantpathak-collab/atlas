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

// ==========================================
// NODE IDENTIFIERS (MUST APPEAR AS LITERALS)
// ==========================================
const NODE_011 = 'c10_chem_011'; // Polar and non-polar covalent compounds
const NODE_012 = 'c10_chem_012'; // Properties of covalent compounds
const NODE_013 = 'c10_chem_013'; // Coordinate bonding
const NODE_014 = 'c10_chem_014'; // Acids - definitions and properties
const NODE_015 = 'c10_chem_015'; // Bases - definitions and properties
const NODE_016 = 'c10_chem_016'; // pH scale and indicators
const NODE_017 = 'c10_chem_017'; // Ions in acids, bases and salts
const NODE_018 = 'c10_chem_018'; // Salts - types and formation
const NODE_019 = 'c10_chem_019'; // Neutralisation and types of salts
const NODE_020 = 'c10_chem_020'; // Classification of acids

const ALL_NODE_IDS = [
  NODE_011, NODE_012, NODE_013, NODE_014, NODE_015,
  NODE_016, NODE_017, NODE_018, NODE_019, NODE_020
];

// ==========================================
// TYPES & INTERFACES
// ==========================================
type ViewMode = 'discovery' | 'walkthrough' | 'challenge' | 'applications';
type IndicatorType = 'litmus' | 'methyl_orange' | 'phenolphthalein' | 'universal';

interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  type: 'polar' | 'nonpolar';
  enDiff: number;
  shape: string;
  description: string;
  atoms: { symbol: string; x: number; y: number; en: number; charge?: string }[];
  bonds: { from: number; to: number; type: 'single' | 'double' | 'triple' | 'coordinate' }[];
  dipolesCancel: boolean;
}

interface ChallengeQuestion {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconceptionId?: string;
  hint: string;
}

interface ReactionPreset {
  id: string;
  acid: string;
  base: string;
  ratio: string;
  salt: string;
  saltType: 'normal' | 'acid' | 'basic' | 'complex';
  waterMoles: number;
  equation: string;
  explanation: string;
}

// ==========================================
// STATIC ENRICHMENT & DATA CONFIG
// ==========================================
const MOLECULE_DATABASE: MoleculeData[] = [
  {
    id: 'h2',
    name: 'Hydrogen Gas',
    formula: 'H₂',
    type: 'nonpolar',
    enDiff: 0.0,
    shape: 'Linear',
    description: 'Identical atoms share electrons equally. ΔEN = 0. Zero charge separation.',
    atoms: [
      { symbol: 'H', x: 120, y: 150, en: 2.1 },
      { symbol: 'H', x: 240, y: 150, en: 2.1 }
    ],
    bonds: [{ from: 0, to: 1, type: 'single' }],
    dipolesCancel: true
  },
  {
    id: 'hcl',
    name: 'Hydrogen Chloride',
    formula: 'HCl',
    type: 'polar',
    enDiff: 0.9,
    shape: 'Linear',
    description: 'Cl (EN 3.0) pulls electron density away from H (EN 2.1), creating δ+ H and δ- Cl.',
    atoms: [
      { symbol: 'H', x: 110, y: 150, en: 2.1, charge: 'δ+' },
      { symbol: 'Cl', x: 250, y: 150, en: 3.0, charge: 'δ-' }
    ],
    bonds: [{ from: 0, to: 1, type: 'single' }],
    dipolesCancel: false
  },
  {
    id: 'h2o',
    name: 'Water',
    formula: 'H₂O',
    type: 'polar',
    enDiff: 1.4,
    shape: 'Bent (V-shaped)',
    description: 'Bent geometry prevents O-H bond dipoles from canceling. Net dipole points to Oxygen.',
    atoms: [
      { symbol: 'O', x: 180, y: 120, en: 3.5, charge: 'δ2-' },
      { symbol: 'H', x: 110, y: 190, en: 2.1, charge: 'δ+' },
      { symbol: 'H', x: 250, y: 190, en: 2.1, charge: 'δ+' }
    ],
    bonds: [{ from: 0, to: 1, type: 'single' }, { from: 0, to: 2, type: 'single' }],
    dipolesCancel: false
  },
  {
    id: 'ccl4',
    name: 'Carbon Tetrachloride',
    formula: 'CCl₄',
    type: 'nonpolar',
    enDiff: 0.5,
    shape: 'Tetrahedral',
    description: 'Individual C-Cl bonds are polar, but symmetrical tetrahedral shape cancels all dipoles!',
    atoms: [
      { symbol: 'C', x: 180, y: 150, en: 2.5 },
      { symbol: 'Cl', x: 180, y: 70, en: 3.0, charge: 'δ-' },
      { symbol: 'Cl', x: 100, y: 190, en: 3.0, charge: 'δ-' },
      { symbol: 'Cl', x: 260, y: 190, en: 3.0, charge: 'δ-' },
      { symbol: 'Cl', x: 180, y: 220, en: 3.0, charge: 'δ-' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' },
      { from: 0, to: 4, type: 'single' }
    ],
    dipolesCancel: true
  },
  {
    id: 'nh3',
    name: 'Ammonia',
    formula: 'NH₃',
    type: 'polar',
    enDiff: 0.9,
    shape: 'Trigonal Pyramidal',
    description: 'Nitrogen (EN 3.0) has a lone pair. Trigonal pyramidal geometry leads to a net dipole toward N.',
    atoms: [
      { symbol: 'N', x: 180, y: 120, en: 3.0, charge: 'δ-' },
      { symbol: 'H', x: 110, y: 190, en: 2.1, charge: 'δ+' },
      { symbol: 'H', x: 180, y: 210, en: 2.1, charge: 'δ+' },
      { symbol: 'H', x: 250, y: 190, en: 2.1, charge: 'δ+' }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' },
      { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }
    ],
    dipolesCancel: false
  }
];

const REACTION_PRESETS: ReactionPreset[] = [
  {
    id: 'complete_naoh_h2so4',
    acid: 'H₂SO₄',
    base: 'NaOH',
    ratio: '2 : 1 (2 NaOH + 1 H₂SO₄)',
    salt: 'Na₂SO₄',
    saltType: 'normal',
    waterMoles: 2,
    equation: '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O',
    explanation: 'Both ionisable hydrogen atoms of H₂SO₄ are completely replaced by Na⁺ ions. Forms a Normal Salt.'
  },
  {
    id: 'partial_naoh_h2so4',
    acid: 'H₂SO₄',
    base: 'NaOH',
    ratio: '1 : 1 (1 NaOH + 1 H₂SO₄)',
    salt: 'NaHSO₄',
    saltType: 'acid',
    waterMoles: 1,
    equation: 'NaOH + H₂SO₄ → NaHSO₄ + H₂O',
    explanation: 'Only ONE ionisable hydrogen atom is replaced. NaHSO₄ retains replaceable H⁺, forming an Acid Salt.'
  },
  {
    id: 'partial_cu_oh2_hno3',
    acid: 'HNO₃',
    base: 'Cu(OH)₂',
    ratio: '1 : 1 (1 Cu(OH)₂ + 1 HNO₃)',
    salt: 'Cu(OH)NO₃',
    saltType: 'basic',
    waterMoles: 1,
    equation: 'Cu(OH)₂ + HNO₃ → Cu(OH)NO₃ + H₂O',
    explanation: 'Only ONE hydroxyl group of Cu(OH)₂ is replaced. Cu(OH)NO₃ retains an OH⁻ group, forming a Basic Salt.'
  },
  {
    id: 'complex_cu_nh3',
    acid: 'H₂SO₄',
    base: 'NH₄OH (Excess)',
    ratio: 'Excess Ammonia',
    salt: '[Cu(NH₃)₄]SO₄',
    saltType: 'complex',
    waterMoles: 4,
    equation: 'CuSO₄ + 4NH₃ → [Cu(NH₃)₄]SO₄',
    explanation: 'Central Cu²⁺ coordinates with 4 NH₃ ligands to yield tetraamminecopper(II) complex cation!'
  }
];

const CHALLENGE_QUESTIONS: ChallengeQuestion[] = [
  {
    id: 'q1_polarity',
    nodeId: NODE_011,
    title: 'Bond vs Molecular Polarity',
    question: 'Why is Carbon Tetrachloride (CCl₄) non-polar as a molecule despite containing four strongly polar C-Cl bonds?',
    options: [
      'The electronegativity difference between C and Cl is zero.',
      'The symmetrical tetrahedral geometry causes individual bond dipoles to cancel out.',
      'Electrons are completely transferred from C to Cl, making it ionic.',
      'Carbon lacks a lone pair of electrons.'
    ],
    correctIndex: 1,
    explanation: 'CCl₄ has a symmetrical tetrahedral shape. All 4 polar C-Cl bond dipoles point symmetrically in 3D space and cancel out perfectly.',
    hint: 'Think about vector addition in a symmetrical 3D shape.'
  },
  {
    id: 'q2_properties',
    nodeId: NODE_012,
    title: 'Covalent Conductivity Exception',
    question: 'Pure liquid HCl does not conduct electricity, but its aqueous solution is a strong conductor. Why?',
    options: [
      'Water heats up HCl and melts it into ions.',
      'Polar HCl molecules react with polar water to undergo ionisation, producing H₃O⁺ and Cl⁻ ions.',
      'Water adds free electrons into the HCl gas.',
      'HCl undergoes dissociation of solid ionic lattice when added to water.'
    ],
    correctIndex: 1,
    explanation: 'Pure HCl is covalent (no free ions). When dissolved in water, polar water molecules split the covalent bond (ionisation): HCl + H₂O → H₃O⁺ + Cl⁻.',
    hint: 'Distinguish between covalent molecules ionising in water vs ionic solids dissociating.'
  },
  {
    id: 'q3_coordinate',
    nodeId: NODE_013,
    title: 'Coordinate Bonding Donor',
    question: 'In the formation of the Hydronium ion (H₃O⁺) from H₂O and H⁺, which species acts as the donor and why?',
    options: [
      'H⁺ acts as donor because it donates a proton.',
      'Oxygen in H₂O acts as donor because it shares one of its lone pairs with H⁺.',
      'Water acts as acceptor because it accepts the incoming H⁺ charge.',
      'Both atoms contribute one electron equally.'
    ],
    correctIndex: 1,
    explanation: 'Oxygen has two lone pairs of electrons. H⁺ has no electrons. Oxygen donates a lone pair to form a coordinate (dative) covalent bond.',
    hint: 'Coordinate bond requires one atom to supply BOTH electrons of the shared pair.'
  },
  {
    id: 'q4_acids_def',
    nodeId: NODE_014,
    title: 'Real Form of Hydrogen Ion',
    question: 'Why is the positive ion produced by an acid in water written as H₃O⁺ rather than a bare H⁺?',
    options: [
      'H⁺ is too large to fit between water molecules.',
      'A bare proton (H⁺) is extremely small with high charge density, immediately bonding with a water lone pair.',
      'H⁺ reacts with dissolved oxygen gas to form H₃O⁺.',
      'Acids naturally contain H₃O⁺ ions in their pure dry state.'
    ],
    correctIndex: 1,
    explanation: 'A proton (H⁺) cannot exist freely in water due to intense electric field intensity. It forms a coordinate bond with H₂O to become H₃O⁺ (Hydronium).',
    hint: 'Remember lone pair donation from oxygen to proton!'
  },
  {
    id: 'q5_bases_def',
    nodeId: NODE_015,
    title: 'Bases vs Alkalis',
    question: 'Which statement accurately describes the relationship between bases and alkalis?',
    options: [
      'All bases are alkalis, but not all alkalis are soluble in water.',
      'All alkalis are water-soluble bases, but insoluble bases like CuO are NOT alkalis.',
      'Alkalis turn blue litmus red, while bases turn red litmus blue.',
      'Bases produce H⁺ ions and alkalis produce OH⁻ ions.'
    ],
    correctIndex: 1,
    explanation: 'An alkali is defined specifically as a water-soluble base (e.g., NaOH, KOH). Insoluble metal oxides/hydroxides (CuO, Fe₂O₃) are bases, but not alkalis.',
    hint: 'Think: "All alkalis are bases, but not all bases are alkalis."'
  },
  {
    id: 'q6_ph_scale',
    nodeId: NODE_016,
    title: 'Logarithmic pH Calculation',
    question: 'If Solution X has a pH of 3 and Solution Y has a pH of 6, how does the [H⁺] concentration of X compare to Y?',
    options: [
      'Solution X has 2 times higher [H⁺] concentration than Y.',
      'Solution X has 3 times higher [H⁺] concentration than Y.',
      'Solution X has 1,000 times higher [H⁺] concentration than Y.',
      'Solution Y has 1,000 times higher [H⁺] concentration than X.'
    ],
    correctIndex: 2,
    explanation: 'pH is logarithmic: pH = -log₁₀[H⁺]. A difference of 3 pH units means 10³ = 1,000 times difference in [H⁺] concentration.',
    hint: 'Each unit drop on the pH scale represents a 10x multiplier in acidity!'
  },
  {
    id: 'q7_ions_process',
    nodeId: NODE_017,
    title: 'Ionisation vs Dissociation',
    question: 'How does the process of dissolving NaOH in water differ fundamentally from dissolving HCl gas in water?',
    options: [
      'NaOH undergoes ionisation; HCl undergoes dissociation.',
      'NaOH undergoes dissociation (separating existing lattice ions); HCl undergoes ionisation (creating new ions from neutral molecules).',
      'Both undergo identical dissociation processes.',
      'HCl forms negative metal cations while NaOH forms positive acid radicals.'
    ],
    correctIndex: 1,
    explanation: 'Solid NaOH is ionic (pre-existing Na⁺ and OH⁻ ions in lattice -> dissociation). Gaseous HCl is covalent (water creates ions -> ionisation).',
    hint: 'Pre-existing ionic lattice = Dissociation. Covalent molecule creating ions = Ionisation.'
  },
  {
    id: 'q8_salt_types',
    nodeId: NODE_018,
    title: 'Identifying Acid Salts',
    question: 'Why is Sodium Bisulphate (NaHSO₄) classified as an Acid Salt rather than a Normal Salt?',
    options: [
      'It contains sodium which is an alkali metal.',
      'It is produced by complete neutralisation of H₂SO₄.',
      'It still contains one replaceable hydrogen atom that can release H⁺ ions in aqueous solution.',
      'It has a pH greater than 10.'
    ],
    correctIndex: 2,
    explanation: 'NaHSO₄ is formed by partial replacement of H₂SO₄ hydrogen atoms. It retains one ionisable H, turning blue litmus red in solution.',
    hint: 'Does NaHSO₄ still have a replaceable hydrogen atom in its formula?'
  },
  {
    id: 'q9_neutralisation',
    nodeId: NODE_019,
    title: 'Net Ionic Equation of Neutralisation',
    question: 'What is the true net ionic equation for the neutralisation of ANY strong monobasic acid with a strong monoacidic alkali?',
    options: [
      'Na⁺(aq) + Cl⁻(aq) → NaCl(s)',
      'H⁺(aq) + OH⁻(aq) → H₂O(l)',
      'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
      '2H⁺ + O²⁻ → H₂O'
    ],
    correctIndex: 1,
    explanation: 'Spectator ions (like Na⁺ and Cl⁻) remain unchanged in solution. The core chemical event is H⁺ (or H₃O⁺) joining OH⁻ to form unionised H₂O.',
    hint: 'Cancel out spectator ions that appear unchanged on both sides.'
  },
  {
    id: 'q10_acid_classification',
    nodeId: NODE_020,
    title: 'Concentration vs Strength',
    question: 'A student claims: "10 M Acetic Acid (CH₃COOH) is a strong acid because it is concentrated." Is this claim correct?',
    options: [
      'Yes, high concentration automatically makes an acid strong.',
      'No, concentration measures quantity per volume, whereas strength measures degree of ionisation in water.',
      'Yes, acetic acid ionises 100% when concentrated.',
      'No, acetic acid is a dibasic mineral acid.'
    ],
    correctIndex: 1,
    explanation: 'Concentration (dilute vs concentrated) = amount dissolved. Strength (strong vs weak) = intrinsic degree of ionisation. CH₃COOH is always a weak acid!',
    hint: 'Concentration answers "how much acid?", Strength answers "how completely does it split into ions?"'
  },
  // ─── Class 10 board-depth additions: carbon-family diagnostics ───
  {
    id: 'q_depth_ethyne_dot',
    nodeId: 'c10_chem_cbse_04_001',
    title: 'Ethyne Electron Dot Structure',
    question: 'Draw the electron dot structure of ethyne (C₂H₂). How many valence electrons are used in total, and what bond joins the two carbons?',
    options: [
      '12 valence electrons (2x4 from C + 2x1 from H); the carbons share THREE pairs -- a carbon-carbon triple bond',
      '8 valence electrons; single C-C bond',
      '10 valence electrons; double C=C bond',
      '14 valence electrons; ionic bond'
    ],
    correctIndex: 0,
    explanation: 'Ethyne C₂H₂: 2x4 + 2x1 = 12 valence electrons arranged as H-C≡C-H. Compare the series: ethane C₂H₆ (single C-C, 7 shared pairs total), ethene C₂H₄ (double C=C), ethyne C₂H₂ (triple). Trend: as the bond order rises from 1 to 3, the C-C distance shrinks and the bond gets shorter and stronger.',
    hint: 'Count 4 + 4 + 1 + 1 electrons first, then bond carbons so each carbon "reaches" 8.'
  },
  {
    id: 'q_depth_catenation_silicon',
    nodeId: 'c10_chem_cbse_04_002',
    title: 'Catenation vs Tetravalency',
    question: 'Define catenation and tetravalency. Silicon is also tetravalent like carbon -- so why does silicon form far fewer compounds?',
    options: [
      'Catenation = carbon\'s unique self-linking into long chains and rings; tetravalency = four bonding electrons enabling 4 strong bonds. Si-Si bonds are much weaker than C-C bonds, so silicon catenates poorly',
      'Both words mean the same thing; silicon catenates better than carbon',
      'Tetravalency means four charge; catenation means ionic bonding',
      'Silicon forms fewer compounds only because it is rarer than carbon'
    ],
    correctIndex: 0,
    explanation: 'Catenation (self-combining) plus tetravalency (four bonds) is why carbon builds over a million compounds. A cyclic "hydrocarbon" of 5 carbons cannot be C₅H₁₂ -- ring closure costs two hydrogens, so a cycloalkane with n=5 is C₅H₁₀; C₅H₁₂ must be an open-chain alkane (pentane family). Matchstick-clay model: black clay balls = carbon (4 holes), white = hydrogen (1 hole) -- build chains, branches and a 5-ring to see the formula change.',
    hint: 'Bond strength decides whether self-chains survive; Si-Si is weak.'
  },
  {
    id: 'q_depth_graphite_diamond',
    nodeId: 'c10_chem_cbse_04_003',
    title: 'Graphite vs Diamond',
    question: 'Both diamond and graphite are giant covalent solids with very high melting points, yet graphite conducts electricity and is a lubricant while diamond is neither. Why?',
    options: [
      'In graphite each carbon bonds to only 3 others, leaving one free (delocalised) electron per atom to conduct; the layers are held by weak van der Waals forces so they slide -- diamond uses all 4 electrons in rigid 3-D covalent bonds',
      'Graphite is metallic because it contains iron',
      'Diamond is non-conducting because it is an ionic compound',
      'Graphite layers are held by strong covalent bonds, making it slippery'
    ],
    correctIndex: 0,
    explanation: 'Board favourite: the lubricant statement "layers held by weak covalent bonds" is WRONG -- the weak forces between graphite layers are van der Waals, not covalent. Bond lengths: diamond C-C 154 pm, graphite 142 pm (partial double-bond character), C₆₀ fullerene 140-146 pm. Pencil-lead demo: draw a thick pencil line on paper, connect a 9 V battery and LED through the two ends of the line -- graphite conducts enough to light the LED dimly; try the same across a plastic ruler and nothing happens.',
    hint: 'Count each carbon\'s bonds: 3 in graphite (one electron spare), 4 in diamond (none spare).'
  },
  {
    id: 'q_depth_c5h10_bromine',
    nodeId: 'c10_chem_cbse_04_004',
    title: 'Reading C₅H₁₀ and the Bromine Water Test',
    question: 'A hydrocarbon has formula C₅H₁₀. Which class is it, and what does bromine water decide between hexane (C₆H₁₄) and hex-1-ene (C₆H₁₂)?',
    options: [
      'C₅H₁₀ fits the alkene general formula CₙH₂ₙ (one C=C or a ring); in the bromine water test the ALKENE decolourises reddish-brown bromine (addition across the double bond) while the alkane hexane does not',
      'C₅H₁₀ is an alkyne; bromine water turns all hydrocarbons clear',
      'C₅H₁₀ is an alkane of the pentane family; bromine water distinguishes nothing',
      'The formula is impossible for any hydrocarbon'
    ],
    correctIndex: 0,
    explanation: 'General formulas: alkane CₙH₂ₙ₊₂, alkene CₙH₂ₙ, alkyne CₙH₂ₙ₋₂. Bromine water is the unsaturation test: ethene + Br₂ adds across the double bond (addition reaction) to give 1,2-dibromoethane, decolourising the brown colour instantly. Same test on food: the yellow-brown bromine water loses colour with unsaturated cooking oil but stays coloured with saturated butter/ghee fat.',
    hint: 'Plug n into each general formula; only one fits C₅H₁₀ as an open-chain alkene.'
  },
  {
    id: 'q_depth_isomers_c5h12',
    nodeId: 'c10_chem_cbse_04_005',
    title: 'Structural Isomers of C₅H₁₂',
    question: 'Draw ALL structural isomers of C₅H₁₂ and name them. Why does n-pentane boil higher than neopentane?',
    options: [
      'Three: pentane (straight chain), 2-methylbutane (one branch), 2,2-dimethylpropane (neopentane, most branched); boiling falls with branching because branching makes the molecule more compact, weakening intermolecular attraction',
      'Only one isomer exists; boiling point is identical for all',
      'Five isomers; branching raises boiling point',
      'Two isomers; branched forms boil highest'
    ],
    correctIndex: 0,
    explanation: 'Systematic isomer method: (1) longest chain, (2) shorten by one carbon and attach it as a methyl at every non-equivalent position, (3) shorten by two and repeat, (4) check duplicates. For C₄H₈ alkenes: but-1-ene and but-2-ene are POSITION isomers; 2-methylpropene is a CHAIN (skeletal) isomer. The claim "CH₃-CH₂-CH₂-OH is the only C₃H₈O alcohol" fails: propan-2-ol (CH₃-CHOH-CH₃) also exists -- position isomerism of the -OH group.',
    hint: 'Branching packs molecules closer -- weaker van der Waals forces, lower boiling point.'
  },
  {
    id: 'q_depth_propanal_group',
    nodeId: 'c10_chem_cbse_04_006',
    title: 'Functional Groups and Test-Tube Identification',
    question: 'Name the functional group in CH₃CH₂CHO, give its IUPAC name, and explain the test-tube set that distinguishes ethanol, ethanal and ethanoic acid.',
    options: [
      'The -CHO aldehyde (alkanal) group: propanal. Distinguish with sodium metal (ethanol/acid fizz H₂ but aldehyde no) and sodium bicarbonate (only the ACID ethanoic acid fizzes CO₂); Tollens or oxidation tests separate the aldehyde',
      'Ketone group; propanone; no test exists',
      'Carboxylic acid; propanoic acid; sodium metal alone separates all three',
      'Ester group; methyl ethanoate; bicarbonate fizzes with all three'
    ],
    correctIndex: 0,
    explanation: 'Three-step practical sequence: (1) sodium metal -- ethanol gives H₂ bubbles (2Na + 2CH₃CH₂OH -> 2CH₃CH₂ONa + H₂), ethanoic acid also fizzes, aldehyde silent; (2) NaHCO₃ -- only ethanoic acid releases CO₂ (CH₃COOH + NaHCO₃ -> CH₃COONa + H₂O + CO₂); (3) warm with alkaline KMnO₄ -- aldehyde oxidises (purple fades), alcohol slowly, acid not. Boiling points: butan-1-ol (118 deg C) exceeds butanal (75 deg C) because -OH hydrogen bonding is stronger than aldehyde dipole forces. Error check: ethanol + conc. H₂SO₄ at 170 deg C gives ETHENE (CH₂=CH₂), not ethanal -- dehydration, not oxidation.',
    hint: 'Na metal flags OH groups; bicarbonate flags COOH only.'
  },
  {
    id: 'q_depth_homologous_series',
    nodeId: 'c10_chem_cbse_04_007',
    title: 'Homologous Series Trends',
    question: 'State the alkene general formula, the third member, and explain why alkane boiling points rise from methane to decane while alcohol solubility FALLS from methanol to butanol.',
    options: [
      'Alkenes CₙH₂ₙ, third member butene (C₄H₈); more carbons = heavier molecules with stronger intermolecular forces so boiling climbs; longer hydrocarbon tails overpower the -OH group so water solubility drops',
      'Alkenes CₙH₂ₙ₊₂, third member pentene; boiling falls down the series',
      'Alkenes CₙH₂ₙ₋₂, third member butyne; solubility rises down the alcohol series',
      'Members of a series share no formula pattern at all'
    ],
    correctIndex: 0,
    explanation: 'A homologous series differs by CH₂ (14 u) between successive members, sharing a general formula and graded properties. Physical property trends are continuous: boiling points gradation can be demonstrated with the first liquid members (pentane 36 deg C to octane 126 deg C), and alcohol solubility fades as the hydrophobic tail grows (methanol, ethanol miscible; butanol already partly insoluble).',
    hint: 'One series, one formula, CH₂ steps, smooth property gradation.'
  },
  {
    id: 'q_depth_iupac_propanol',
    nodeId: 'c10_chem_cbse_04_008',
    title: 'IUPAC Naming Discipline',
    question: 'One student writes "2-Propanol", another "Propan-2-ol". Which follows IUPAC convention, and name CH₃-CH(CH₃)-CH₂-CH₂-OH properly.',
    options: [
      'Propan-2-ol (locant before the suffix); the branched alcohol is 3-methylbutan-1-ol -- longest chain 4 carbons (butane), -OH gets the lowest locant, methyl counted from the OH end',
      '2-Propanol is correct IUPAC; the other is 2-methylbutan-4-ol',
      'Both names are wrong; the compound is propanal',
      'IUPAC allows any word order for locants'
    ],
    correctIndex: 0,
    explanation: 'IUPAC pattern: [locants]-[substituents][root]-[locant][suffix]. Numbering rule: the PRINCIPAL functional group (-OH) takes the lowest possible number, which also assigns the methyl at C3 in CH₃-CH(CH₃)-CH₂-CH₂-OH. Writing the locant after the root (propan-2-ol, butan-1-ol) is the current convention.',
    hint: 'Anchor the chain at the -OH end before counting substituents.'
  },
  {
    id: 'q_depth_incomplete_combustion',
    nodeId: 'c10_chem_cbse_04_009',
    title: 'Incomplete Combustion Demonstration',
    question: 'Design the spirit-lamp experiment that demonstrates the products of INCOMPLETE combustion.',
    options: [
      'Hold a clean metal spoon over the yellow (oxygen-starved) flame of the lamp: soot (carbon) deposits on the spoon, and a cold glass plate above shows water droplets -- fuel + limited O₂ gives C, CO and H₂O instead of only CO₂ and H₂O',
      'Burn the lamp in pure oxygen and look for soot',
      'Weigh the lamp before and after only',
      'Incomplete combustion produces only carbon dioxide'
    ],
    correctIndex: 0,
    explanation: 'Yellow flame = insufficient oxygen -> some carbon escapes as soot and carbon monoxide (poisonous) instead of CO₂. The spoon collects elemental carbon (black deposit); the cold plate catches water vapour -- proving fuels contain hydrogen too. Complete combustion (blue flame, plenty of air) leaves no soot: CₓHᵧ + O₂ -> CO₂ + H₂O only.',
    hint: 'Soot on the spoon is the visible signature of oxygen-starved burning.'
  },
  {
    id: 'q_depth_soap_scum',
    nodeId: 'c10_chem_cbse_04_012',
    title: 'Soap Scum vs Detergent',
    question: 'Why does soap form scum in hard water while detergent does not? Write the reaction, and evaluate "soaps are better because they are biodegradable."',
    options: [
      'Hard-water Ca²⁺/Mg²⁺ ions react with sodium stearate: 2C₁₇H₃₅COONa + CaCl₂ -> (C₁₇H₃₅COO)₂Ca (scum precipitate) + 2NaCl; detergents\' sulphonate salts stay soluble. Soaps ARE biodegradable and gentler, but fail in hard water -- detergents lather anywhere yet some persist and pollute',
      'Scum is dirt the soap removed; detergents also precipitate in hard water',
      'Hard water freezes soap; scum is ice',
      'Soap scum proves soap is stronger than detergent'
    ],
    correctIndex: 0,
    explanation: 'Test soap vs detergent: dissolve a pinch of each in distilled water and in hard water, shake equal times -- soap lathers in soft water but forms scum in hard water; detergent lathers in BOTH. Evaluation: the biodegradable claim favours soap environmentally, but hard-water failure and the acid limitation mean the "better" verdict depends on water quality -- a balanced answer needs both sides.',
    hint: 'Precipitation = soap anion + calcium ion; detergent anions refuse to precipitate.'
  }
];

const TEACHING_SLIDES = [
  {
    id: 'slide_1',
    nodeId: NODE_011,
    title: '1. Bond Polarity & Electronegativity (ΔEN)',
    subtitle: 'Unequal sharing of electron pairs leads to polar dipoles',
    content: `In a covalent bond, atoms share electron pairs. However, if one atom has higher ELECTRONEGATIVITY (tendency to attract shared electrons), it pulls the shared pair closer.

�� ΔEN = 0 (Identical atoms e.g., H₂, Cl₂): Non-polar covalent (equal sharing).
• ΔEN = 0.4 to 1.7 (e.g., HCl, H₂O, NH₃): Polar covalent. Partial negative (δ-) on the stronger atom, partial positive (δ+) on weaker atom.
• Geometry Matters: Symmetrical molecules like CCl₄ (tetrahedral) or CH₄ have polar bonds, but their dipoles CANCEL OUT, making the molecule as a whole non-polar!`,
    interactiveType: 'polarity'
  },
  {
    id: 'slide_2',
    nodeId: NODE_013,
    title: '2. Coordinate (Dative) Bonding',
    subtitle: 'When ONE atom supplies BOTH shared electrons',
    content: `A Coordinate Bond is a special covalent bond where the shared electron pair is donated entirely by ONE atom (the DONOR) to an atom with an empty orbital (the ACCEPTOR).

• Hydronium Ion (H₃O⁺): Oxygen in H₂O has two LONE PAIRS. It donates one lone pair to an incoming H⁺ proton (which has zero electrons).
• Ammonium Ion (NH₄⁺): Nitrogen in NH₃ has one lone pair. It donates this pair to H⁺.
• Key Insight: Once formed, a coordinate bond is INDISTINGUISHABLE in strength and character from a normal covalent bond!`,
    interactiveType: 'coordinate'
  },
  {
    id: 'slide_3',
    nodeId: NODE_014,
    title: '3. Acids, Bases & the Ion Spectrum',
    subtitle: 'Hydronium (H₃O⁺) vs Hydroxyl (OH⁻)',
    content: `• Acid Definition: Produces H⁺ ions (as H₃O⁺) in water. Turns blue litmus red. Reacts with metals → H₂ gas; carbonates → CO₂ gas.
• Base Definition: Produces OH⁻ ions in water. Turns red litmus blue. Feels soapy and tastes bitter.
• Alkalis: Water-soluble bases (NaOH, KOH, NH₄OH). Metal oxides like CuO are bases but NOT alkalis!
• Ionisation vs Dissociation: Covalent acids (HCl) IONISE in water (create new ions). Ionic bases (NaOH) DISSOCIATE (separate pre-existing lattice ions).`,
    interactiveType: 'ph_meter'
  },
  {
    id: 'slide_4',
    nodeId: NODE_016,
    title: '4. The Logarithmic pH Scale & Indicators',
    subtitle: 'Quantifying hydrogen ion concentration: pH = -log₁₀[H⁺]',
    content: `The pH scale runs from 0 to 14:
• pH < 7: Acidic (High [H⁺])
• pH = 7: Neutral (Pure Water, [H⁺] = [OH⁻] = 10⁻⁷ M)
• pH > 7: Basic / Alkaline (High [OH⁻])

Because pH is logarithmic, dropping 1 pH unit means TEN TIMES more H⁺ ions!
• Indicators:
  - Litmus: Acid → Red | Base → Blue
  - Methyl Orange: Acid → Pink/Red | Base → Yellow
  - Phenolphthalein: Acid → Colourless | Base → Magenta Pink`,
    interactiveType: 'ph_meter'
  },
  {
    id: 'slide_5',
    nodeId: NODE_018,
    title: '5. Neutralisation & Salt Synthesis',
    subtitle: 'Normal, Acid, Basic & Complex Salts',
    content: `Neutralisation: Acid + Base → Salt + Water. Net ionic reaction: H⁺(aq) + OH⁻(aq) → H₂O(l).

Salt Classification:
1. Normal Salt: COMPLETE replacement of all ionisable H⁺ (e.g., Na₂SO₄, NaCl).
2. Acid Salt: PARTIAL replacement of ionisable H⁺. Retains replaceable H⁺ (e.g., NaHSO₄, NaHCO₃).
3. Basic Salt: PARTIAL neutralisation of polyacidic base. Retains OH⁻ (e.g., Cu(OH)NO₃).
4. Complex Salt: Contains a complex cation/anion (e.g., [Cu(NH₃)₄]SO₄).`,
    interactiveType: 'salt_builder'
  }
];

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Presence of Polar Bonds Guarantees a Polar Molecule",
    description: "Students believe that if a molecule contains polar covalent bonds, the molecule as a whole must be polar. They fail to consider how molecular geometry affects overall polarity.",
    correction: "A molecule can contain polar covalent bonds and still be non-polar overall if its molecular geometry is symmetrical. In symmetrical molecules like carbon dioxide (CO₂) or carbon tetrachloride (CCl₄), individual bond dipoles pull equally in opposite directions and cancel each other out. This results in a net dipole moment of zero, making the overall molecule non-polar.",
  },
  {
    id: "misc_2",
    title: "Non-Polar Covalent Bonds Only Form Between Identical Atoms",
    description: "Students often assume that non-polar covalent bonds can only exist between two identical non-metal atoms, such as in O₂ or N₂. They incorrectly believe that any bond between different elements must be polar.",
    correction: "Non-polar covalent bonds can also form between different elements if their electronegativity values are nearly equal. For instance, the carbon-hydrogen (C-H) bond in methane (CH₄) is non-polar because carbon and hydrogen have very similar electronegativities. Therefore, equal sharing of electrons can occur between distinct non-metal atoms.",
  },
  {
    id: "misc_3",
    title: "Dipole Moment Is Calculated by Simple Scalar Addition",
    description: "Students view molecular dipole moment as a scalar sum of bond polarities rather than a vector quantity. Consequently, they assume molecules with more polar bonds always possess higher net dipole moments.",
    correction: "Dipole moment is a vector quantity that has both magnitude and direction. The net dipole moment of a molecule is the vector sum of all individual bond dipoles in three-dimensional space. Because vectors can reinforce or negate each other based on bond angles, spatial geometry dictates the final dipole moment.",
  },
  {
    id: "misc_4",
    title: "Covalent Compounds Never Dissolve in Water Environment",
    description: "Students frequently assume that all covalent compounds are insoluble in water because water only dissolves ionic solids. They fail to distinguish between polar and non-polar covalent solute behavior.",
    correction: "Solubility follows the principle of 'like dissolves like,' meaning polar solvents dissolve polar solutes. While non-polar covalent compounds are insoluble in water, polar covalent compounds like glucose, ethanol, and hydrogen chloride dissolve readily. These polar solutes form strong dipole-dipole interactions or hydrogen bonds with polar water molecules.",
  },
  {
    id: "misc_5",
    title: "Polar Covalent Liquids Conduct Electricity in Pure State",
    description: "Students believe that pure polar covalent liquids conduct electricity easily because they contain partial positive and negative charges. They confuse partial charges on bound atoms with free-moving ions.",
    correction: "Conduction of electricity requires mobile charged particles, such as free ions or free electrons. Partial charges in polar covalent molecules are fixed within the chemical bonds and cannot carry an electric current in the pure liquid state. Polar covalent compounds like pure liquid HCl only conduct electricity when dissolved in water, where they ionize to form mobile hydronium and chloride ions.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C10_ChemistryPolarandnonpolarcovalentcompoundsSim() {
  // Navigation & State
  const [viewMode, setViewMode] = useState<ViewMode>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Audio & Voice Toggles
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Polarity Lab State
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('hcl');
  const [customEnA, setCustomEnA] = useState<number>(2.1);
  const [customEnB, setCustomEnB] = useState<number>(3.0);

  // Coordinate Bond Lab State
  const [coordinateStep, setCoordinateStep] = useState<'initial' | 'approaching' | 'bonded'>('initial');
  const [coordinateType, setCoordinateType] = useState<'h3o' | 'nh4'>('h3o');

  // pH & Indicator Lab State
  const [phValue, setPhValue] = useState<number>(2.0);
  const [activeIndicator, setActiveIndicator] = useState<IndicatorType>('universal');

  // Salt Builder Lab State
  const [selectedReactionId, setSelectedReactionId] = useState<string>('complete_naoh_h2so4');

  // Interactive Quiz & Mastery State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // SRS & BKT Tracker States
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id, 'Chemistry');
    });
    return initial;
  });

  // Calculate Overall Mastery
  const overallMastery = useMemo(() => {
    const levels = ALL_NODE_IDS.map(id => masteryProb(bktStates[id]));
    const sum = levels.reduce((acc, curr) => acc + curr, 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  // Current Selected Molecule Object
  const currentMolecule = useMemo(() => {
    return MOLECULE_DATABASE.find(m => m.id === selectedMoleculeId) || MOLECULE_DATABASE[1];
  }, [selectedMoleculeId]);

  // Current Challenge Object
  const currentChallenge = CHALLENGE_QUESTIONS[currentChallengeIndex];

  // ==========================================
  // HELPER FUNCTIONS & AUDIO/SPEECH HANDLERS
  // ==========================================
  const playSound = useCallback((soundName: SoundEffect | 'success' | 'error' | 'celebration' | 'hint' | 'pickup' | 'drop-correct' | 'drop-wrong' | 'whoosh' | 'sparkle' | 'chime' | 'pop' | 'count' | 'balance' | 'swoop') => {
    if (soundEnabled) {
      audioManager.play(soundName);
    }
  }, [soundEnabled]);

  const speakText = useCallback((text: string) => {
    if (voiceEnabled) {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    }
  }, [voiceEnabled]);

  // Auto Speech on Slide Change
  useEffect(() => {
    if (viewMode === 'walkthrough') {
      const slide = TEACHING_SLIDES[currentSlideIndex];
      speakText(`${slide.title}. ${slide.subtitle}`);
    }
  }, [viewMode, currentSlideIndex, speakText]);

  // Dynamic Indicator Color Calculation
  const getIndicatorColor = useCallback((ph: number, indicator: IndicatorType): string => {
    if (indicator === 'litmus') {
      return ph < 7 ? '#ef4444' : ph > 7 ? '#3b82f6' : '#8b5cf6';
    }
    if (indicator === 'methyl_orange') {
      return ph < 3.1 ? '#ef4444' : ph > 4.4 ? '#eab308' : '#f97316';
    }
    if (indicator === 'phenolphthalein') {
      return ph < 8.2 ? 'rgba(243, 244, 246, 0.4)' : '#ec4899';
    }
    // Universal Indicator Spectrum
    if (ph <= 2) return '#ef4444'; // Strong Acid (Red)
    if (ph <= 4) return '#f97316'; // Acid (Orange)
    if (ph <= 6) return '#eab308'; // Weak Acid (Yellow)
    if (ph === 7) return '#22c55e'; // Neutral (Green)
    if (ph <= 9) return '#06b6d4'; // Weak Base (Cyan)
    if (ph <= 11) return '#3b82f6'; // Base (Blue)
    return '#8b5cf6'; // Strong Base (Purple/Violet)
  }, []);

  // Challenge Option Selection Handler
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    playSound('tap');
  };

  // Submit Answer & Update Mastery / SRS
  const handleSubmitAnswer = (e?: React.MouseEvent) => {
    if (selectedOption === null || isAnswerSubmitted) return;

    if (e) {
      setSparklePos({ x: e.clientX, y: e.clientY });
    }

    const isCorrect = selectedOption === currentChallenge.correctIndex;
    setIsAnswerSubmitted(true);

    const nodeId = currentChallenge.nodeId;
    // BKT State Update
    const updatedBkt = bktUpdate(bktStates[nodeId], isCorrect);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBkt }));

    // SRS State Update
    const quality = isCorrect ? 5 : 1;
    const updatedSrs = sm2Update(srsItems[nodeId], quality, 0);
    setSrsItems(prev => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      playSound('drop-correct');
      playSound('success');
      speakText("Spot on! Your chemical reasoning is accurate.");
      setScore(prev => prev + 10);
      setShowConfetti(true);
      setShowSuccessBanner(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      playSound('drop-wrong');
      playSound('error');
      speakText(`Incorrect. ${currentChallenge.explanation}`);
    }

    // Save to Local Mastery Store
    recordGameScore([nodeId], isCorrect ? 100 : 0);
  };

  const handleNextChallenge = () => {
    playSound('whoosh');
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGE_QUESTIONS.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      playSound('celebration');
      speakText("Congratulations! You have mastered all Class 10 ICSE Acid, Base, and Bonding challenges!");
      setViewMode('applications');
    }
  };

  // ==========================================
  // RENDER VISUAL LAB COMPONENTS
  // ==========================================

  // 1. Bond Polarity Visualizer
  const renderPolarityLab = () => {
    const enDiff = Math.abs(customEnA - customEnB).toFixed(2);
    const floatEnDiff = parseFloat(enDiff);

    let bondNature = 'Non-Polar Covalent';
    if (floatEnDiff >= 1.7) bondNature = 'Predominantly Ionic';
    else if (floatEnDiff >= 0.4) bondNature = 'Polar Covalent';

    return (
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gold-400 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Bond & Molecular Polarity Lab
            </h3>
            <p className="text-sm text-slate-400">
              Observe electron density shift based on Electronegativity Difference (ΔEN)
            </p>
          </div>

          <div className="flex gap-2">
            {MOLECULE_DATABASE.map(m => (
              <button
                key={m.id}
                onClick={() => {audioManager.play('tap'); 
                  setSelectedMoleculeId(m.id);
                  playSound('pop');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedMoleculeId === m.id
                    ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {m.formula} ({m.type})
              </button>
            ))}
          </div>
        </div>

        {/* Preset Visualizer SVG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[260px]">
            <svg width="340" height="240" className="overflow-visible">
              <defs>
                <radialGradient id="electronCloud" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Electron Cloud Distortion Background */}
              {currentMolecule.type === 'polar' && (
                <ellipse
                  cx={currentMolecule.atoms[currentMolecule.atoms.length - 1].x}
                  cy={currentMolecule.atoms[currentMolecule.atoms.length - 1].y}
                  rx="75"
                  ry="55"
                  fill="url(#electronCloud)"
                  className="animate-pulse"
                />
              )}

              {/* Bonds */}
              {currentMolecule.bonds.map((b, idx) => {
                const a1 = currentMolecule.atoms[b.from];
                const a2 = currentMolecule.atoms[b.to];
                return (
                  <line
                    key={idx}
                    x1={a1.x}
                    y1={a1.y}
                    x2={a2.x}
                    y2={a2.y}
                    stroke="#94a3b8"
                    strokeWidth="4"
                    strokeDasharray={b.type === 'coordinate' ? '6,6' : '0'}
                  />
                );
              })}

              {/* Atoms */}
              {currentMolecule.atoms.map((atom, idx) => (
                <g key={idx}>
                  <circle
                    cx={atom.x}
                    cy={atom.y}
                    r="24"
                    fill={atom.symbol === 'H' ? '#38bdf8' : atom.symbol === 'O' ? '#ef4444' : atom.symbol === 'Cl' ? '#22c55e' : '#a855f7'}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="shadow-lg"
                  />
                  <text
                    x={atom.x}
                    y={atom.y + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontWeight="bold"
                    fontSize="14"
                  >
                    {atom.symbol}
                  </text>
                  {atom.charge && (
                    <text
                      x={atom.x}
                      y={atom.y - 30}
                      textAnchor="middle"
                      fill={atom.charge.includes('-') ? '#f87171' : '#60a5fa'}
                      fontWeight="bold"
                      fontSize="14"
                    >
                      {atom.charge}
                    </text>
                  )}
                </g>
              ))}

              {/* Dipole Vector Arrow for Polar Molecules */}
              {currentMolecule.type === 'polar' && (
                <g transform="translate(170, 40)">
                  <line x1="-40" y1="0" x2="40" y2="0" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                  <line x1="-40" y1="-6" x2="-40" y2="6" stroke="#f59e0b" strokeWidth="3" />
                  <text x="0" y="-10" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
                    Net Dipole Moment
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Molecule Properties Details */}
          <div className="space-y-4">
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Molecule Name:</span>
                <span className="text-base font-bold text-white">{currentMolecule.name} ({currentMolecule.formula})</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Molecular Geometry:</span>
                <span className="text-sm font-semibold text-gold-300">{currentMolecule.shape}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Bond ΔEN:</span>
                <span className="text-sm font-semibold text-yellow-400">{currentMolecule.enDiff}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Molecular Polarity:</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                  currentMolecule.type === 'polar' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {currentMolecule.type}
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-sm text-slate-300">
              <span className="text-gold-400 font-semibold">ICSE Key Concept: </span>
              {currentMolecule.description}
            </div>
          </div>
        </div>

        {/* Interactive Custom ΔEN Slider Section */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <h4 className="text-sm font-bold text-slate-300 mb-3">Custom Electronegativity ΔEN Experimenter:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Atom A EN (e.g., Hydrogen)</span>
                <span className="text-gold-400 font-bold">{customEnA}</span>
              </label>
              <input
                type="range"
                min="0.7"
                max="4.0"
                step="0.1"
                value={customEnA}
                onChange={e => {
                  setCustomEnA(parseFloat(e.target.value));
                  playSound('tap');
                }}
                className="w-full accent-gold-400 mt-1"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Atom B EN (e.g., Chlorine / Fluorine)</span>
                <span className="text-rose-400 font-bold">{customEnB}</span>
              </label>
              <input
                type="range"
                min="0.7"
                max="4.0"
                step="0.1"
                value={customEnB}
                onChange={e => {
                  setCustomEnB(parseFloat(e.target.value));
                  playSound('tap');
                }}
                className="w-full accent-rose-400 mt-1"
              />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Calculated ΔEN</div>
              <div className="text-xl font-extrabold text-yellow-400">{enDiff}</div>
              <div className="text-xs font-semibold text-gold-300 mt-0.5">{bondNature}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Coordinate Bonding Visualizer
  const renderCoordinateLab = () => {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gold-400 flex items-center gap-2">
              <span className="text-2xl">🤝</span> Coordinate (Dative) Bonding Visualizer
            </h3>
            <p className="text-sm text-slate-400">
              Watch how donor lone pairs are shared with an electron-deficient proton (H⁺)
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {audioManager.play('tap'); 
                setCoordinateType('h3o');
                setCoordinateStep('initial');
                playSound('pop');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold ${
                coordinateType === 'h3o' ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Hydronium Ion (H₃O⁺)
            </button>
            <button
              onClick={() => {audioManager.play('tap'); 
                setCoordinateType('nh4');
                setCoordinateStep('initial');
                playSound('pop');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold ${
                coordinateType === 'nh4' ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Ammonium Ion (NH₄⁺)
            </button>
          </div>
        </div>

        {/* Animation Canvas SVG */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center relative min-h-[300px]">
          <svg width="450" height="220" className="overflow-visible">
            {coordinateType === 'h3o' ? (
              // Water Molecule + H+ Proton
              <g>
                {/* Central Oxygen */}
                <circle cx="180" cy="120" r="30" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x="180" y="126" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="16">O</text>

                {/* Normal Covalent H atoms */}
                <line x1="180" y1="120" x2="110" y2="160" stroke="#94a3b8" strokeWidth="4" />
                <circle cx="110" cy="160" r="18" fill="#38bdf8" />
                <text x="110" y="165" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">H</text>

                <line x1="180" y1="120" x2="250" y2="160" stroke="#94a3b8" strokeWidth="4" />
                <circle cx="250" cy="160" r="18" fill="#38bdf8" />
                <text x="250" y="165" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">H</text>

                {/* Lone Pair on Oxygen */}
                <circle cx="170" cy="78" r="4" fill="#f59e0b" />
                <circle cx="190" cy="78" r="4" fill="#f59e0b" />
                <text x="180" y="65" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Lone Pair</text>

                {/* Approaching or Bonded H+ */}
                <motion.g
                  animate={{
                    x: coordinateStep === 'initial' ? 140 : coordinateStep === 'approaching' ? 50 : 0,
                    y: coordinateStep === 'initial' ? -40 : coordinateStep === 'approaching' ? -20 : 0
                  }}
                  transition={{ duration: 1, type: 'spring' }}
                >
                  {coordinateStep === 'bonded' && (
                    <line x1="180" y1="120" x2="180" y2="50" stroke="#f59e0b" strokeWidth="4" strokeDasharray="4,4" />
                  )}
                  <circle cx="180" cy="50" r="18" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
                  <text x="180" y="55" textAnchor="middle" fill="#312e81" fontWeight="bold" fontSize="12">H⁺</text>
                </motion.g>
              </g>
            ) : (
              // Ammonia Molecule + H+ Proton
              <g>
                {/* Central Nitrogen */}
                <circle cx="180" cy="120" r="30" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                <text x="180" y="126" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="16">N</text>

                {/* Normal Covalent H atoms */}
                <line x1="180" y1="120" x2="110" y2="160" stroke="#94a3b8" strokeWidth="4" />
                <circle cx="110" cy="160" r="18" fill="#38bdf8" />
                <text x="110" y="165" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">H</text>

                <line x1="180" y1="120" x2="180" y2="185" stroke="#94a3b8" strokeWidth="4" />
                <circle cx="180" cy="185" r="18" fill="#38bdf8" />
                <text x="180" y="190" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">H</text>

                <line x1="180" y1="120" x2="250" y2="160" stroke="#94a3b8" strokeWidth="4" />
                <circle cx="250" cy="160" r="18" fill="#38bdf8" />
                <text x="250" y="165" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">H</text>

                {/* Lone Pair on Nitrogen */}
                <circle cx="170" cy="78" r="4" fill="#f59e0b" />
                <circle cx="190" cy="78" r="4" fill="#f59e0b" />

                {/* Approaching or Bonded H+ */}
                <motion.g
                  animate={{
                    x: coordinateStep === 'initial' ? 140 : coordinateStep === 'approaching' ? 50 : 0,
                    y: coordinateStep === 'initial' ? -40 : coordinateStep === 'approaching' ? -20 : 0
                  }}
                  transition={{ duration: 1, type: 'spring' }}
                >
                  {coordinateStep === 'bonded' && (
                    <line x1="180" y1="120" x2="180" y2="45" stroke="#f59e0b" strokeWidth="4" strokeDasharray="4,4" />
                  )}
                  <circle cx="180" cy="45" r="18" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
                  <text x="180" y="50" textAnchor="middle" fill="#312e81" fontWeight="bold" fontSize="12">H⁺</text>
                </motion.g>
              </g>
            )}
          </svg>

          {/* Controls */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {audioManager.play('tap'); 
                setCoordinateStep('approaching');
                playSound('swoop');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
            >
              1. Approach H⁺ Proton
            </button>
            <button
              onClick={() => {audioManager.play('tap'); 
                setCoordinateStep('bonded');
                playSound('chime');
                playSound('sparkle');
                speakText(`Coordinate bond formed! ${coordinateType === 'h3o' ? 'Oxygen' : 'Nitrogen'} donates its lone pair.`);
              }}
              className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-gold-600/30"
            >
              2. Donate Lone Pair & Bond!
            </button>
          </div>
        </div>

        {/* Dynamic Explanation */}
        <div className="mt-4 p-4 bg-gold-950/40 border border-gold-800/50 rounded-xl text-sm text-gold-200">
          <span className="font-bold text-gold-400">Chemical Equation: </span>
          {coordinateType === 'h3o' ? (
            <span>H₂O + H⁺ → <strong>H₃O⁺ (Hydronium Ion)</strong>. Donor: Oxygen (has 2 lone pairs). Acceptor: H⁺ (empty 1s orbital).</span>
          ) : (
            <span>NH₃ + H⁺ → <strong>NH₄⁺ (Ammonium Ion)</strong>. Donor: Nitrogen (has 1 lone pair). Acceptor: H⁺ (empty 1s orbital).</span>
          )}
        </div>
      </div>
    );
  };

  // 3. Acid-Base & pH Indicator Simulation
  const renderPHLab = () => {
    const liquidColor = getIndicatorColor(phValue, activeIndicator);
    const h3oConc = Math.pow(10, -phValue).toExponential(2);
    const ohConc = Math.pow(10, -(14 - phValue)).toExponential(2);

    return (
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <span className="text-2xl">🧪</span> Interactive pH Meter & Indicator Simulator
            </h3>
            <p className="text-sm text-slate-400">
              Adjust hydrogen ion concentration [H⁺] and observe indicator color transitions
            </p>
          </div>

          {/* Indicator Selection Buttons */}
          <div className="flex flex-wrap gap-2">
            {(['universal', 'litmus', 'methyl_orange', 'phenolphthalein'] as IndicatorType[]).map(ind => (
              <button
                key={ind}
                onClick={() => {audioManager.play('tap'); 
                  setActiveIndicator(ind);
                  playSound('pop');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  activeIndicator === ind
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {ind.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Beaker Container SVG */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center relative min-h-[280px]">
            <svg width="240" height="220" className="overflow-visible">
              {/* Beaker Glass Body */}
              <rect x="50" y="40" width="140" height="150" rx="8" fill="none" stroke="#94a3b8" strokeWidth="4" />
              <line x1="45" y1="40" x2="195" y2="40" stroke="#94a3b8" strokeWidth="4" />

              {/* Liquid Solution */}
              <motion.rect
                x="54"
                y="80"
                width="132"
                height="106"
                rx="4"
                fill={liquidColor}
                opacity="0.8"
                animate={{ fill: liquidColor }}
                transition={{ duration: 0.4 }}
              />

              {/* Beaker Measurement Marks */}
              <line x1="50" y1="70" x2="65" y2="70" stroke="#64748b" strokeWidth="2" />
              <line x1="50" y1="100" x2="75" y2="100" stroke="#64748b" strokeWidth="2" />
              <line x1="50" y1="130" x2="65" y2="130" stroke="#64748b" strokeWidth="2" />
              <line x1="50" y1="160" x2="75" y2="160" stroke="#64748b" strokeWidth="2" />

              {/* Dynamic Ion Particles */}
              {phValue < 7 && (
                <g className="animate-pulse">
                  <circle cx="80" cy="110" r="8" fill="#ef4444" />
                  <text x="80" y="113" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">H₃O⁺</text>
                  <circle cx="140" cy="140" r="8" fill="#ef4444" />
                  <text x="140" y="143" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">H₃O⁺</text>
                </g>
              )}
              {phValue > 7 && (
                <g className="animate-pulse">
                  <circle cx="100" cy="130" r="8" fill="#3b82f6" />
                  <text x="100" y="133" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">OH⁻</text>
                  <circle cx="160" cy="110" r="8" fill="#3b82f6" />
                  <text x="160" y="113" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">OH⁻</text>
                </g>
              )}
            </svg>

            {/* Readout Badge */}
            <div className="mt-2 text-center">
              <span className="text-2xl font-black text-white">pH {phValue.toFixed(1)}</span>
              <span className="ml-3 text-xs px-2.5 py-1 rounded-full font-bold uppercase bg-slate-800 text-gold-300">
                {phValue < 7 ? 'Acidic' : phValue === 7 ? 'Neutral' : 'Basic / Alkaline'}
              </span>
            </div>
          </div>

          {/* pH Controls & Calculations */}
          <div className="space-y-5">
            <div>
              <label className="text-xs text-slate-400 font-semibold flex justify-between mb-2">
                <span>Slide to adjust pH (0 = Strong Acid, 14 = Strong Alkali):</span>
                <span className="text-emerald-400 font-bold">pH {phValue.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="14"
                step="0.1"
                value={phValue}
                onChange={e => {
                  setPhValue(parseFloat(e.target.value));
                  playSound('tap');
                }}
                className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Hydronium Ion Conc [H₃O⁺]:</span>
                <span className="font-mono text-rose-400 font-bold">{h3oConc} M</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Hydroxyl Ion Conc [OH⁻]:</span>
                <span className="font-mono text-gold-400 font-bold">{ohConc} M</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-amber-400">Logarithmic Formula: </span>
                pH = -log₁₀[H⁺] = {phValue.toFixed(1)}
              </div>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl text-xs text-slate-300 border border-slate-700">
              <span className="font-bold text-emerald-400">Active Indicator: </span>
              {activeIndicator === 'litmus' && 'Litmus paper turns RED in acids (pH < 7) and BLUE in bases (pH > 7).'}
              {activeIndicator === 'methyl_orange' && 'Methyl Orange is RED below pH 3.1 and YELLOW above pH 4.4.'}
              {activeIndicator === 'phenolphthalein' && 'Phenolphthalein is COLOURLESS in acidic/neutral solutions and MAGENTA PINK above pH 8.2.'}
              {activeIndicator === 'universal' && 'Universal Indicator exhibits a full spectral color rainbow across pH 0 to 14.'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Neutralization & Salt Synthesis Lab
  const renderSaltLab = () => {
    const rxn = REACTION_PRESETS.find(r => r.id === selectedReactionId) || REACTION_PRESETS[0];

    return (
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
              <span className="text-2xl">🧂</span> Salt Synthesis & Neutralisation Lab
            </h3>
            <p className="text-sm text-slate-400">
              Combine acids and bases to synthesize Normal, Acid, Basic, or Complex Salts
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {REACTION_PRESETS.map(r => (
              <button
                key={r.id}
                onClick={() => {audioManager.play('tap'); 
                  setSelectedReactionId(r.id);
                  playSound('balance');
                  speakText(`Selected ${r.saltType} salt reaction.`);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedReactionId === r.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {r.salt} ({r.saltType.toUpperCase()} SALT)
              </button>
            ))}
          </div>
        </div>

        {/* Reaction Display Canvas */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="bg-slate-900 border border-rose-500/30 p-4 rounded-xl min-w-[120px]">
              <div className="text-xs text-slate-400">Acid</div>
              <div className="text-xl font-extrabold text-rose-400">{rxn.acid}</div>
            </div>

            <span className="text-2xl text-slate-500 font-bold">+</span>

            <div className="bg-slate-900 border border-gold-500/30 p-4 rounded-xl min-w-[120px]">
              <div className="text-xs text-slate-400">Base / Alkali</div>
              <div className="text-xl font-extrabold text-gold-400">{rxn.base}</div>
            </div>

            <span className="text-2xl text-amber-400 font-bold">➔</span>

            <div className="bg-amber-950/40 border border-amber-500/50 p-4 rounded-xl min-w-[140px]">
              <div className="text-xs text-amber-300">Synthesised Salt</div>
              <div className="text-2xl font-black text-amber-400">{rxn.salt}</div>
            </div>

            <span className="text-2xl text-slate-500 font-bold">+</span>

            <div className="bg-slate-900 border border-gold-500/30 p-4 rounded-xl min-w-[100px]">
              <div className="text-xs text-slate-400">Water</div>
              <div className="text-lg font-bold text-gold-400">{rxn.waterMoles} H₂O</div>
            </div>
          </div>

          {/* Reaction Balanced Equation */}
          <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-1">Balanced Chemical Equation:</div>
            <div className="text-base font-mono font-bold text-emerald-400">{rxn.equation}</div>
          </div>

          <div className="w-full p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-amber-400">Classification Rationale: </span>
            {rxn.explanation}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDER MAIN VIEW MODES
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Top Header & Navigation Bar */}
      <header className="max-w-6xl mx-auto mb-8 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚗️</span>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400">
                ICSE Class 10 Chemistry Laboratory
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Covalent Polarity, Coordinate Bonding, Acids, Bases & Salts Mastery
              </p>
            </div>
          </div>
        </div>

        {/* Global Stats & Mode Selector Buttons */}
        <div className="flex items-center gap-3">
          {/* Audio Toggles */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playSound('pop');
            }}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-xs"
            title="Toggle Sound Effects"
          >
            {soundEnabled ? '🔊 Sound On' : '🔇 Mute'}
          </button>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-xs"
            title="Toggle Voice Over"
          >
            {voiceEnabled ? '🗣️ Voice On' : '😶 Voice Off'}
          </button>

          {/* Mastery Badge */}
          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-gold-500/30 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Mastery Score</span>
            <span className="text-base font-black text-gold-400">{overallMastery}%</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => {
              setViewMode('discovery');
              playSound('whoosh');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'discovery'
                ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/30'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span>🔬</span> Discovery Lab
          </button>

          <button
            onClick={() => {
              setViewMode('walkthrough');
              playSound('whoosh');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'walkthrough'
                ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/30'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span>📚</span> Interactive Masterclass
          </button>

          <button
            onClick={() => {
              setViewMode('challenge');
              playSound('whoosh');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'challenge'
                ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/30'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span>🎯</span> Adaptive Challenges ({currentChallengeIndex + 1}/{CHALLENGE_QUESTIONS.length})
          </button>

          <button
            onClick={() => {
              setViewMode('applications');
              playSound('whoosh');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'applications'
                ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/30'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span>🌍</span> Real-World Applications
          </button>
        </div>

        {/* MODE 1: DISCOVERY LAB */}
        {viewMode === 'discovery' && (
          <div className="space-y-8">
            {renderPolarityLab()}
            {renderCoordinateLab()}
            {renderPHLab()}
            {renderSaltLab()}
          </div>
        )}

        {/* MODE 2: INTERACTIVE MASTERCLASS WALKTHROUGH */}
        {viewMode === 'walkthrough' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">Visual Masterclass</span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {TEACHING_SLIDES[currentSlideIndex].title}
                </h2>
                <p className="text-sm text-slate-400">
                  {TEACHING_SLIDES[currentSlideIndex].subtitle}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    setCurrentSlideIndex(prev => prev - 1);
                    playSound('whoosh');
                  }}
                  className="px-3 py-1.5 bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-white rounded-lg text-xs font-bold"
                >
                  ◀ Prev
                </button>
                <button
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setCurrentSlideIndex(prev => prev + 1);
                    playSound('whoosh');
                  }}
                  className="px-3 py-1.5 bg-gold-500 disabled:opacity-40 hover:bg-gold-400 text-slate-950 rounded-lg text-xs font-bold"
                >
                  Next ▶
                </button>
              </div>
            </div>

            {/* Slide Content Explanation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="prose prose-invert max-w-none text-slate-300 text-sm whitespace-pre-line leading-relaxed bg-slate-950 p-6 rounded-xl border border-slate-800">
                {TEACHING_SLIDES[currentSlideIndex].content}
              </div>

              {/* Embedded Visual Interactive for Slide */}
              <div>
                {TEACHING_SLIDES[currentSlideIndex].interactiveType === 'polarity' && renderPolarityLab()}
                {TEACHING_SLIDES[currentSlideIndex].interactiveType === 'coordinate' && renderCoordinateLab()}
                {TEACHING_SLIDES[currentSlideIndex].interactiveType === 'ph_meter' && renderPHLab()}
                {TEACHING_SLIDES[currentSlideIndex].interactiveType === 'salt_builder' && renderSaltLab()}
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: ADAPTIVE MASTERY CHALLENGES */}
        {viewMode === 'challenge' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGE_QUESTIONS.length}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {currentChallenge.title}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Score: <strong className="text-yellow-400">{score} pts</strong></span>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 rounded-lg text-xs font-bold"
                >
                  💡 Hint
                </button>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="text-base text-slate-200 font-medium bg-slate-950 p-6 rounded-xl border border-slate-800">
              {currentChallenge.question}
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3">
              {currentChallenge.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700';

                if (selectedOption === idx) {
                  btnStyle = 'bg-gold-500/20 border-gold-500 text-gold-200 font-semibold';
                }

                if (isAnswerSubmitted) {
                  if (idx === currentChallenge.correctIndex) {
                    btnStyle = 'bg-emerald-500/30 border-emerald-500 text-emerald-200 font-bold';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-500/30 border-rose-500 text-rose-200 line-through';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold border border-slate-700 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Submission Action Bar */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <HintBubble show={showHint} text={currentChallenge.hint} />

              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="ml-auto px-6 py-2.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-40 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-gold-500/30"
                >
                  Submit Chemical Analysis
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="ml-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/30"
                >
                  Continue to Next Question ▶
                </button>
              )}
            </div>

            {/* Feedback & Explanation Box */}
            {isAnswerSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border text-sm ${
                  selectedOption === currentChallenge.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800 text-rose-200'
                }`}
              >
                <div className="font-bold mb-1">
                  {selectedOption === currentChallenge.correctIndex ? '✅ Correct Explanation:' : '❌ Concept Review:'}
                </div>
                <div>{currentChallenge.explanation}</div>
              </motion.div>
            )}
          </div>
        )}

        {/* MODE 4: REAL-WORLD APPLICATIONS */}
        {viewMode === 'applications' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <h2 className="text-2xl font-extrabold text-gold-400 flex items-center gap-2">
              <span>🌍</span> Real-World Applications of Acids, Bases & Salts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="text-2xl">💊</div>
                <h3 className="text-lg font-bold text-white">Stomach Antacids</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Excess hyperacidity (HCl in stomach) causes heart-burn. Antacids like <strong>NaHCO₃</strong> or <strong>Mg(OH)₂ (Milk of Magnesia)</strong> neutralise excess acid to yield neutral salt and relieve pain.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="text-2xl">🌱</div>
                <h3 className="text-lg font-bold text-white">Soil pH & Agriculture</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Crops grow poorly in overly acidic soil. Farmers add <strong>Quicklime (CaO)</strong> or <strong>Slaked Lime (Ca(OH)₂)</strong> to neutralise acidity and raise soil pH back to neutral.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="text-2xl">🧯</div>
                <h3 className="text-lg font-bold text-white">Soda-Acid Fire Extinguishers</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mixing concentrated <strong>H₂SO₄</strong> with <strong>NaHCO₃</strong> generates a rapid stream of <strong>CO₂ gas</strong>: 2NaHCO₃ + H₂SO₄ → Na₂SO₄ + 2H₂O + 2CO₂↑, smothering flames!
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="text-2xl">🧪</div>
                <h3 className="text-lg font-bold text-white">Pharmaceutical Titrations</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quality control laboratories use precision acid-base neutralisation titrations with phenolphthalein indicator to standardize medicine dosages.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Feedback Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed Successfully!" />
      {sparklePos && <SparkleBurst show={true} x={sparklePos.x} y={sparklePos.y} />}
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

// ==========================================
// DEFAULT PROPS & ENRICHMENT METADATA
// ==========================================
C10_ChemistryPolarandnonpolarcovalentcompoundsSim.defaultProps = {
  nodesCovered: ALL_NODE_IDS,
  subject: SUBJECT_CONFIG.chemistry.name,
  grade: 'Class 10 (ICSE)'
};