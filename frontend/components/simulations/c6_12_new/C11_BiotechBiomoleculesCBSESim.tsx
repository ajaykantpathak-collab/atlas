'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';

// Node Constants
const NODE_058 = 'c11_bt_cbse_058';
const NODE_059 = 'c11_bt_cbse_059';
const NODE_060 = 'c11_bt_cbse_060';
const NODE_061 = 'c11_bt_cbse_061';
const NODE_062 = 'c11_bt_cbse_062';
const NODE_063 = 'c11_bt_cbse_063';
const NODE_064 = 'c11_bt_cbse_064';
const NODE_065 = 'c11_bt_cbse_065';
const NODE_066 = 'c11_bt_cbse_066';
const NODE_067 = 'c11_bt_cbse_067';
const NODE_068 = 'c11_bt_cbse_068';
const NODE_069 = 'c11_bt_cbse_069';
const NODE_070 = 'c11_bt_cbse_070';
const NODE_071 = 'c11_bt_cbse_071';
const NODE_072 = 'c11_bt_cbse_072';
const NODE_073 = 'c11_bt_cbse_073';
const NODE_074 = 'c11_bt_cbse_074';
const NODE_075 = 'c11_bt_cbse_075';
const NODE_076 = 'c11_bt_cbse_076';
const NODE_077 = 'c11_bt_cbse_077';
const NODE_078 = 'c11_bt_cbse_078';
const NODE_079 = 'c11_bt_cbse_079';
const NODE_080 = 'c11_bt_cbse_080';
const NODE_081 = 'c11_bt_cbse_081';
const NODE_082 = 'c11_bt_cbse_082';
const NODE_083 = 'c11_bt_cbse_083';
const NODE_084 = 'c11_bt_cbse_084';
const NODE_085 = 'c11_bt_cbse_085';
const NODE_086 = 'c11_bt_cbse_086';
const NODE_087 = 'c11_bt_cbse_087';
const NODE_088 = 'c11_bt_cbse_088';
const NODE_089 = 'c11_bt_cbse_089';
const NODE_090 = 'c11_bt_cbse_090';
const NODE_091 = 'c11_bt_cbse_091';
const NODE_092 = 'c11_bt_cbse_092';
const NODE_093 = 'c11_bt_cbse_093';
const NODE_094 = 'c11_bt_cbse_094';
const NODE_095 = 'c11_bt_cbse_095';
const NODE_096 = 'c11_bt_cbse_096';
const NODE_097 = 'c11_bt_cbse_097';
const NODE_098 = 'c11_bt_cbse_098';
const NODE_099 = 'c11_bt_cbse_099';
const NODE_100 = 'c11_bt_cbse_100';
const NODE_101 = 'c11_bt_cbse_101';
const NODE_102 = 'c11_bt_cbse_102';
const NODE_103 = 'c11_bt_cbse_103';
const NODE_104 = 'c11_bt_cbse_104';
const NODE_105 = 'c11_bt_cbse_105';
const NODE_106 = 'c11_bt_cbse_106';

const ALL_NODE_IDS = [
  NODE_058, NODE_059, NODE_060, NODE_061, NODE_062, NODE_063, NODE_064, NODE_065, NODE_066, NODE_067,
  NODE_068, NODE_069, NODE_070, NODE_071, NODE_072, NODE_073, NODE_074, NODE_075, NODE_076, NODE_077,
  NODE_078, NODE_079, NODE_080, NODE_081, NODE_082, NODE_083, NODE_084, NODE_085, NODE_086, NODE_087,
  NODE_088, NODE_089, NODE_090, NODE_091, NODE_092, NODE_093, NODE_094, NODE_095, NODE_096, NODE_097,
  NODE_098, NODE_099, NODE_100, NODE_101, NODE_102, NODE_103, NODE_104, NODE_105, NODE_106
];

// MANDATORY SECTIONS

const SCENARIO = {
  title: 'Biomolecular Architecture & Dynamic Analysis Laboratory',
  intro: 'Welcome to the Advanced Biotechnology Research Center! You are appointed as lead biophysical chemist to characterize cellular macromolecules, analyze mutarotation, optimize enzyme-substrate interfaces, and measure DNA melting dynamics.',
  context: 'Through high-resolution structural visualizers, titration simulators, and spectrophotometric modules, you will manipulate carbohydrates, lipids, proteins, and nucleic acids across varying physical conditions.'
};

const DISCOVERY_QUESTION = {
  question: 'When pure α-D-glucose is dissolved in water, its optical rotation gradually changes from +112° to an equilibrium value of +52.7°. What molecular transformation causes this phenomenon known as mutarotation?',
  options: [
    'The glucose molecules break down into triose sugars through glycolytic oxidation.',
    'The cyclic hemiacetal ring spontaneously opens into a linear aldehyde form and re-closes into an equilibrium mixture of α and β anomers.',
    'D-glucose undergoes enzymatic isomerization into D-fructose via keto-enol tautomerization.',
    'The hydroxyl groups change stereochemistry at C2 to form D-mannose epimers.'
  ],
  correctIndex: 1,
  hintAfter: 'Mutarotation occurs via reversible ring opening at the anomeric carbon (C1), forming an open-chain intermediate that yields both α (36%) and β (64%) pyranose forms.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Carbohydrate Anomers & Mutarotation Kinetics',
    instruction: 'Select a monosaccharide or disaccharide form. Adjust time and temperature to observe ring opening, mutarotation equilibrium, and optical rotation shifts.',
    interactionType: 'carbohydrate-mutarotation',
    nodeId: NODE_066
  },
  {
    title: 'Lab 2: Amino Acid Titration & Zwitterion Micro-Environment',
    instruction: 'Vary the solution pH from 1.0 to 14.0. Track the protonation state of amino acid functional groups (α-COOH, α-NH3+, R-group) and determine the exact Isoelectric Point (pI).',
    interactionType: 'amino-acid-titration',
    nodeId: NODE_088
  },
  {
    title: 'Lab 3: Protein Secondary & Tertiary Structural Folding',
    instruction: 'Manipulate temperature and urea concentration to simulate protein unfolding. Observe hydrogen bonding patterns in α-helices and β-sheets.',
    interactionType: 'protein-folding',
    nodeId: NODE_092
  },
  {
    title: 'Lab 4: Lipid Membrane & Amphipathic Self-Assembly',
    instruction: 'Adjust phospholipid concentration and hydrocarbon chain saturation to observe micelle, liposome, and bilayer vesicle phase transitions.',
    interactionType: 'lipid-assembly',
    nodeId: NODE_083
  },
  {
    title: 'Lab 5: Nucleic Acid Denaturation (Tm Curve Analysis)',
    instruction: 'Increase temperature and adjust GC-content percentage. Measure UV absorbance at 260 nm (Hyperchromic Shift) to calculate DNA Melting Temperature (Tm).',
    interactionType: 'dna-denaturation',
    nodeId: NODE_103
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: How will increasing the GC base pair content from 30% to 70% affect the thermal melting temperature (Tm) of a DNA double helix?',
    options: [
      'Tm will decrease because GC pairs create sterically hindered destabilizing loops.',
      'Tm will remain unchanged because thermal denaturation depends only on sugar-phosphate backbone stability.',
      'Tm will increase significantly because GC pairs have 3 hydrogen bonds compared to 2 in AT pairs, requiring more kinetic energy to separate.',
      'Tm will drop to zero as GC-rich DNA undergoes spontaneous Z-DNA conversion.'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 5, set GC content to 70% and observe how the UV absorbance sigmoid curve shifts right to a higher Tm.',
    nodeId: NODE_103
  },
  {
    question: 'Predict: At a pH equal to its Isoelectric Point (pI), what will be the net electrical charge and electrophoretic mobility of a glycine molecule?',
    options: [
      'Net charge = +1; moves rapidly toward the cathode.',
      'Net charge = -1; moves rapidly toward the anode.',
      'Net charge = 0 (zwitterion); zero net mobility in an electric field.',
      'Net charge = +2; forms a covalent dimer.'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 2, adjust pH to 5.97 for Glycine and observe the net charge digital readout.',
    nodeId: NODE_088
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relative thermodynamic stability of α-D-glucose versus β-D-glucose in aqueous solution at equilibrium?',
    observableOptions: [
      'α-D-glucose is predominant (99%) because the C1 hydroxyl group is axial.',
      'β-D-glucose is predominant (~64%) because all bulky OH groups and the -CH2OH group occupy equatorial positions, minimizing steric clash.',
      'Both anomers exist in an exact 50:50 ratio regardless of temperature.',
      'The open-chain aldehyde form accounts for over 80% of the solution.'
    ],
    correctIndex: 1,
    nodeId: NODE_065
  },
  {
    question: 'What happens to the UV absorbance at 260 nm when double-stranded B-DNA fully denatures into single strands?',
    observableOptions: [
      'Absorbance decreases by 50% due to loss of purine rings.',
      'Absorbance increases by ~30-40% (hyperchromic effect) as stacked base interactions are disrupted, exposing aromatic rings.',
      'Absorbance shifts entirely to infrared wavelengths.',
      'Absorbance becomes zero because single strands do not absorb UV light.'
    ],
    correctIndex: 1,
    nodeId: NODE_103
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Biopharmaceutical Analysis: Recombinant Erythropoietin Characterization',
  description: 'In industrial biotechnology, purified therapeutic proteins must undergo rigorous structural validation. You will execute a standard quality control protocol examining glycosylation patterns, pI profiling, and thermal stability.',
  steps: [
    'Step 1: Perform Isoelectric Focusing (IEF) to verify the pI distribution of the protein isoforms (Target pI range: 4.0 - 5.5).',
    'Step 2: Determine total carbohydrate content using Anthrone reagent and quantify sialic acid heteropolysaccharide capping.',
    'Step 3: Conduct CD (Circular Dichroism) spectroscopy to confirm 50% α-helical secondary structure integrity.',
    'Step 4: Execute differential scanning fluorimetry (DSF) to establish thermal denaturation Tm >= 65°C for batch release.'
  ]
};

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    misconception: 'Carbohydrates only function as fuel/energy storage molecules in cells.',
    correction: 'Carbohydrates also form essential structural matrices (cellulose, chitin, peptidoglycan), cell recognition signaling molecules (glycoproteins, glycolipids), and backbone frameworks for DNA/RNA.',
    nodeId: NODE_059
  },
  {
    id: 'misc_2',
    misconception: 'Lipids are true polymers composed of repeating monomer units linked by peptide or glycosidic bonds.',
    correction: 'Lipids are non-polymeric macromolecules aggregated through hydrophobic interactions and van der Waals forces, consisting of varied components like fatty acids, glycerol, or sterol rings.',
    nodeId: NODE_076
  },
  {
    id: 'misc_3',
    misconception: 'All amino acids found in biological proteins have chiral carbons and exist as D-isomers.',
    correction: 'Glycine lacks a chiral center (R = H). Furthermore, almost all natural proteinogenic amino acids are exclusively L-stereoisomers, not D-isomers.',
    nodeId: NODE_087
  },
  {
    id: 'misc_4',
    misconception: 'Denaturation of proteins involves breaking peptide bonds along the primary backbone.',
    correction: 'Denaturation disrupts weak secondary, tertiary, and quaternary non-covalent forces (H-bonds, hydrophobic interactions, ionic bridges) without breaking covalent peptide bonds.',
    nodeId: NODE_093
  },
  {
    id: 'misc_5',
    misconception: 'DNA double helix strands run parallel with identical 5\' to 3\' directions.',
    correction: 'DNA double helix strands run antiparallel: one strand goes 5\' to 3\' while the complementary strand runs 3\' to 5\'.',
    nodeId: NODE_101
  },
  {
    id: 'misc_6',
    misconception: 'Peptide bond formation is a hydrolysis reaction that consumes water.',
    correction: 'Peptide bond synthesis is a dehydration condensation reaction where a molecule of water is eliminated as the α-carboxyl group connects with the α-amino group.',
    nodeId: NODE_090
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    nodeId: NODE_067,
    question: 'D-Glucose and D-Galactose differ in configuration only at Carbon-4. They are classified as:',
    options: ['Anomers', 'C4 Epimers', 'Enantiomers', 'Ketoses'],
    correctIndex: 1
  },
  {
    id: 'diag_2',
    nodeId: NODE_069,
    question: 'Which disaccharide is a non-reducing sugar because both anomeric carbons participate in the glycosidic bond?',
    options: ['Maltose (α-1,4)', 'Lactose (β-1,4)', 'Sucrose (α-1, β-2)', 'Cellobiose (β-1,4)'],
    correctIndex: 2
  },
  {
    id: 'diag_3',
    nodeId: NODE_079,
    question: 'Unsaturated fatty acids have lower melting points than saturated fatty acids of equivalent chain length primarily because:',
    options: ['They contain fewer carbon atoms.', 'Cis double bonds create structural kinks that prevent close packing of hydrocarbon chains.', 'They form ionic bonds with water.', 'They lack carboxyl groups.'],
    correctIndex: 1
  },
  {
    id: 'diag_4',
    nodeId: NODE_086,
    question: 'Which of the following amino acid R-groups contains a polar non-charged hydroxyl functional group?',
    options: ['Alanine', 'Serine', 'Aspartic Acid', 'Lysine'],
    correctIndex: 1
  },
  {
    id: 'diag_5',
    nodeId: NODE_092,
    question: 'In an α-helix, hydrogen bonds are formed between the carbonyl oxygen of amino acid residue i and the amide NH of residue:',
    options: ['i + 1', 'i + 2', 'i + 3', 'i + 4'],
    correctIndex: 3
  },
  {
    id: 'diag_6',
    nodeId: NODE_098,
    question: 'Which set consists exclusively of Pyrimidine bases?',
    options: ['Adenine and Guanine', 'Cytosine, Uracil, and Thymine', 'Adenine and Thymine', 'Guanine and Cytosine'],
    correctIndex: 1
  },
  {
    id: 'diag_7',
    nodeId: NODE_100,
    question: 'Adjacent nucleotides in a single polynucleotide chain are covalently joined together by:',
    options: ['Glycosidic bonds', '3\'-5\' Phosphodiester bonds', 'Peptide bonds', 'Disulfide bridges'],
    correctIndex: 1
  },
  {
    id: 'diag_8',
    nodeId: NODE_102,
    question: 'Which DNA helix conformation is a left-handed helix with a zigzag sugar-phosphate backbone?',
    options: ['A-DNA', 'B-DNA', 'Z-DNA', 'C-DNA'],
    correctIndex: 2
  }
];

interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex: number;
}

const CHALLENGES: Challenge[] = [
  // Foundation (1-7)
  {
    id: 'c_1',
    nodeId: NODE_061,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classification',
    question: 'What is the general chemical empirical formula for unmodified monosaccharides?',
    options: ['(CH2O)n', 'C(H2O)2n', 'Cn(H2O)n-1', 'C6H12O6 only'],
    correctIndex: 0,
    explanation: 'Monosaccharides generally follow the empirical formula (CH2O)n, where n ranges from 3 to 7.',
    hints: ['Think of hydrates of carbon.', 'Count 1 Carbon for every 1 Water molecule.', 'n is between 3 and 7.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_2',
    nodeId: NODE_067,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Structural Analysis',
    question: 'D-Glucose and D-Mannose differ in configuration specifically at Carbon-2. They are:',
    options: ['Anomers', 'C2 Epimers', 'Enantiomers', 'Structural isomers without chiral centers'],
    correctIndex: 1,
    explanation: 'Epimers are diastereomers that differ in configuration around only one chiral carbon center. Glucose and Mannose differ at C2.',
    hints: ['Focus on the specific carbon position C2.', 'They are non-superimposable stereoisomers differing at one center.', 'Differing at C2 makes them C2 epimers.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_3',
    nodeId: NODE_085,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Amino Acid Chemistry',
    question: 'Which amino acid is optically inactive (achiral) because its alpha-carbon is attached to two identical Hydrogen atoms?',
    options: ['L-Alanine', 'L-Valine', 'Glycine', 'L-Proline'],
    correctIndex: 2,
    explanation: 'Glycine has R = H. Since two of the four groups bonded to Cα are hydrogen, Cα is not chiral.',
    hints: ['Look for the simplest amino acid.', 'Identify the R-group equal to H.', 'Glycine lacks a asymmetric chiral carbon.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_4',
    nodeId: NODE_098,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Nucleic Acid Structure',
    question: 'Which of the following nitrogenous bases are bicyclic Purines?',
    options: ['Cytosine and Thymine', 'Adenine and Guanine', 'Thymine and Uracil', 'Cytosine and Uracil'],
    correctIndex: 1,
    explanation: 'Adenine (A) and Guanine (G) are double-ring purines. Cytosine, Thymine, and Uracil are single-ring pyrimidines.',
    hints: ['Purines have two fused rings.', 'Pure As Gold (Adenine, Guanine).', 'A and G are purines.'],
    misconceptionIndex: 4
  },
  {
    id: 'c_5',
    nodeId: NODE_079,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Lipid Classification',
    question: 'Fatty acids containing one or more C=C double bonds in their hydrocarbon chain are termed:',
    options: ['Saturated fatty acids', 'Unsaturated fatty acids', 'Saponified fatty acids', 'Branched waxes'],
    correctIndex: 1,
    explanation: 'Unsaturated fatty acids contain double bonds (cis or trans) which introduce degree of unsaturation.',
    hints: ['Double bonds mean fewer hydrogen atoms attached.', 'Unsaturated implies C=C double bonds.', 'Choose unsaturated.'],
    misconceptionIndex: 1
  },
  {
    id: 'c_6',
    nodeId: NODE_069,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Carbohydrate Linkages',
    question: 'Maltose is a disaccharide composed of two D-glucose units linked by which glycosidic bond?',
    options: ['α-1,4-glycosidic bond', 'β-1,4-glycosidic bond', 'α-1,6-glycosidic bond', 'α-1,β-2-glycosidic bond'],
    correctIndex: 0,
    explanation: 'Maltose consists of two α-D-glucose residues joined by an α-1,4-glycosidic linkage.',
    hints: ['Maltose is produced from starch breakdown.', 'It uses α-anomeric carbon 1 connected to OH of C4.', 'α-1,4 linkage.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_7',
    nodeId: NODE_097,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Nucleotide Structure',
    question: 'What is the chemical difference between a nucleoside and a nucleotide?',
    options: ['A nucleotide lacks a nitrogenous base.', 'A nucleoside consists of base + sugar; a nucleotide is a nucleoside + phosphate group(s).', 'A nucleotide contains ribose, whereas a nucleoside contains deoxyribose.', 'A nucleoside has peptide bonds.'],
    correctIndex: 1,
    explanation: 'Nucleoside = Nitrogenous base + Pentose sugar. Nucleotide = Nucleoside + Phosphate group.',
    hints: ['Phosphate makes the nucleotide.', 'Nucleoside + Phosphate = Nucleotide.', 'Select option B.'],
    misconceptionIndex: 4
  },
  // Standard (8-15)
  {
    id: 'c_8',
    nodeId: NODE_088,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Isoelectric Point Calculation',
    question: 'Alanine has pKa1 (α-COOH) = 2.34 and pKa2 (α-NH3+) = 9.69. Calculate its Isoelectric Point (pI).',
    options: ['6.015', '7.000', '3.675', '12.030'],
    correctIndex: 0,
    explanation: 'For a neutral amino acid, pI = (pKa1 + pKa2) / 2 = (2.34 + 9.69) / 2 = 12.03 / 2 = 6.015.',
    hints: ['Average the two pKa values.', '(2.34 + 9.69) / 2', 'pI = 6.015.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_9',
    nodeId: NODE_066,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Biophysical Equilibria',
    question: 'At mutarotation equilibrium in aqueous solution at 20°C, glucose exists as ~64% β-anomer and ~36% α-anomer. Why is the β-anomer favored?',
    options: ['The β-anomer has all bulky -OH groups and -CH2OH in equatorial positions, minimizing steric steric hindrance.', 'The β-anomer forms covalent bonds with solvent molecules.', 'The α-anomer cannot form ring structures.', 'The β-anomer contains an aldehyde group.'],
    correctIndex: 0,
    explanation: 'In β-D-glucopyranose, every substituent (-OH groups and -CH2OH) is in the sterically favored equatorial orientation.',
    hints: ['Consider equatorial vs axial positions in chair conformation.', 'Equatorial substituents minimize 1,3-diaxial steric interactions.', 'Option A is correct.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_10',
    nodeId: NODE_103,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'DNA Biophysics',
    question: 'Why does higher GC content in DNA result in a higher Melting Temperature (Tm)?',
    options: ['GC pairs contain 3 hydrogen bonds and stronger base stacking interactions than AT pairs (which have 2 H-bonds).', 'GC pairs form covalent cross-links across the helix.', 'GC pairs decrease the dielectric constant of water.', 'AT pairs are held together by hydrophobic ionic bonds.'],
    correctIndex: 0,
    explanation: 'G-C base pairs form 3 hydrogen bonds (compared to 2 in A-T) and exhibit favorable base stacking, conferring greater thermal stability.',
    hints: ['Count H-bonds: G-C has 3, A-T has 2.', 'More H-bonds + stronger stacking = higher thermal stability.', 'Select A.'],
    misconceptionIndex: 4
  },
  {
    id: 'c_11',
    nodeId: NODE_092,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Secondary Structure',
    question: 'In a standard right-handed α-helix, how many amino acid residues are present per helical turn, and what is the pitch height?',
    options: ['3.6 residues/turn; pitch = 0.54 nm (5.4 Å)', '2.0 residues/turn; pitch = 0.34 nm', '4.5 residues/turn; pitch = 0.70 nm', '10.0 residues/turn; pitch = 3.4 nm'],
    correctIndex: 0,
    explanation: 'The canonical Pauling-Corey α-helix has 3.6 amino acid residues per turn with a pitch of 0.54 nm (5.4 Å per turn, 1.5 Å advance per residue).',
    hints: ['Remember 3.6 residues.', 'Pitch is 0.54 nm.', 'Option A.'],
    misconceptionIndex: 3
  },
  {
    id: 'c_12',
    nodeId: NODE_083,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Membrane Self-Assembly',
    question: 'What thermodynamic driving force primarily impels amphipathic phospholipids to spontaneously aggregate into lipid bilayers in aqueous media?',
    options: ['Covalent disulfide bonding between fatty acyl chains.', 'The Hydrophobic Effect: gain in solvent (water) entropy as ordered water cages around nonpolar tails are released.', 'Direct electrostatic attraction between nonpolar hydrocarbon tails.', 'High temperature thermal coagulation.'],
    correctIndex: 1,
    explanation: 'The hydrophobic effect is entropy-driven: clustering nonpolar tails releases structured clathrate water molecules into bulk solution, increasing solvent entropy (ΔS > 0).',
    hints: ['Focus on solvent entropy (water molecules).', 'Water cages around nonpolar chains release water molecules.', 'Entropically driven hydrophobic effect.'],
    misconceptionIndex: 1
  },
  {
    id: 'c_13',
    nodeId: NODE_100,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Polynucleotide Chemistry',
    question: 'What defines the 5\' and 3\' end polarity of a single-stranded nucleic acid chain?',
    options: ['The 5\' end has a free 5\'-phosphate (or OH) on carbon-5 of pentose; the 3\' end has a free 3\'-hydroxyl on carbon-3.', 'The 5\' end contains Purines and the 3\' end contains Pyrimidines.', 'The 5\' end is positively charged and 3\' end is negatively charged.', '5\' and 3\' refer to the number of amino acids attached.'],
    correctIndex: 0,
    explanation: 'Polynucleotide chains have directionality: 5\' end has a free or phosphorylated C5\' hydroxyl of ribose/deoxyribose, while 3\' end has a free C3\' hydroxyl.',
    hints: ['Look at the pentose carbon numbering.', 'C5\' phosphate vs C3\' hydroxyl.', 'Choose option A.'],
    misconceptionIndex: 4
  },
  {
    id: 'c_14',
    nodeId: NODE_075,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Glycoconjugates',
    question: 'In O-linked glycoproteins, oligosaccharide chains are covalently attached to which amino acid residue side-chain hydroxyl?',
    options: ['Asparagine (Asn)', 'Serine (Ser) or Threonine (Thr)', 'Glutamic acid (Glu)', 'Methionine (Met)'],
    correctIndex: 1,
    explanation: 'O-glycosidic linkages attach sugars to the hydroxyl group of Serine or Threonine. (N-linked attach to amide nitrogen of Asparagine).',
    hints: ['O-linked means attachment to Oxygen of -OH.', 'Serine and Threonine have side-chain OH groups.', 'Select Ser or Thr.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_15',
    nodeId: NODE_072,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Structural Polysaccharides',
    question: 'Cellulose consists of unbranched chains of D-glucose linked by β-1,4-glycosidic bonds. Why cannot humans digest cellulose?',
    options: ['Cellulose contains toxic nitrogen atoms.', 'Human digestive enzymes (e.g., α-amylase) specifically cleave α-1,4 linkages and lack β-1,4-glucosidase (cellulase) activity.', 'Cellulose is completely insoluble in stomach acid.', 'Cellulose forms covalent peptide cross-links.'],
    correctIndex: 1,
    explanation: 'Enzymatic stereospecificity: α-amylase hydrolyzes α-1,4 bonds in starch/glycogen, but cannot hydrolyze the β-1,4-glycosidic bonds of cellulose.',
    hints: ['Enzymes are stereospecific for α vs β linkages.', 'Humans have α-amylase, not cellulase.', 'Option B.'],
    misconceptionIndex: 0
  },
  // Advanced (16-22)
  {
    id: 'c_16',
    nodeId: NODE_102,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Structural DNA Variations',
    question: 'Compare B-DNA and Z-DNA parameters: Which description accurately captures Z-DNA double helix geometry?',
    options: ['Right-handed helix, 10 bp/turn, uniform major groove.', 'Left-handed helix, 12 bp/turn, zigzag phosphate backbone, alternating anti and syn glycosidic conformations.', 'Right-handed helix, 11 bp/turn, short and compact.', 'Single-stranded triple helix formed at low pH.'],
    correctIndex: 1,
    explanation: 'Z-DNA is a left-handed helix with 12 base pairs per turn, a zigzag backbone, and alternating dC (anti) - dG (syn) glycosidic bond conformations.',
    hints: ['Z-DNA is left-handed.', 'Has 12 bp per turn and zigzag backbone.', 'Syn conformation for purines.'],
    misconceptionIndex: 4
  },
  {
    id: 'c_17',
    nodeId: NODE_090,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Peptide Bond Geometry',
    question: 'Why is the peptide bond (C-N) rigid and planar with restricted rotation around the C-N axis?',
    options: ['Due to ~40% double-bond character resulting from resonance delocalization of unshared electrons between nitrogen and carbonyl oxygen.', 'Because of covalent disulfide linkage between nitrogen and carbon.', 'Because peptide bonds are surrounded by water cages.', 'Due to ionic repulsion between alpha carbons.'],
    correctIndex: 0,
    explanation: 'Resonance between the carbonyl double bond and nitrogen lone pair gives the peptide C-N bond partial (~40%) double bond character, preventing free rotation.',
    hints: ['Think of resonance structures (O=C-N <-> O--C=N+).', 'Partial double bond character restricts rotation.', 'Option A.'],
    misconceptionIndex: 5
  },
  {
    id: 'c_18',
    nodeId: NODE_082,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Sphingolipid & Membrane Microdomains',
    question: 'Sphingomyelin differs from phosphatidylcholine in its backbone. What is the structural backbone of sphingolipids?',
    options: ['Glycerol-3-phosphate', 'Sphingosine (an 18-carbon amino alcohol with an unsaturated hydrocarbon chain)', 'Cholesterol ring nucleus', 'Ribitol phosphate'],
    correctIndex: 1,
    explanation: 'Sphingolipids are built on the long-chain amino alcohol sphingosine (or dihydrosphingosine), rather than glycerol.',
    hints: ['Sphingolipids do NOT use glycerol.', 'They use sphingosine, an amino alcohol.', 'Option B.'],
    misconceptionIndex: 1
  },
  {
    id: 'c_19',
    nodeId: NODE_105,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'tRNA Structural Dynamics',
    question: 'In the cloverleaf secondary structure of transfer RNA (tRNA), where is the specific amino acid covalently attached during aminoacylation?',
    options: ['To the anticodon triplet loop.', 'To the 3\'-terminal CCA-OH acceptor stem.', 'To the TΨC loop.', 'To the D loop.'],
    correctIndex: 1,
    explanation: 'Aminoacyl-tRNA synthetases attach the amino acid ester link to the 3\'-terminal adenosine (CCA-3\' terminus) hydroxyl group.',
    hints: ['All tRNAs end with 5\'-CCA-3\'.', 'The 3\' end carries the amino acid.', 'Option B.'],
    misconceptionIndex: 4
  },
  {
    id: 'c_20',
    nodeId: NODE_074,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Heteropolysaccharides',
    question: 'Bacterial cell wall peptidoglycan consists of alternating units of NAG and NAM linked by β-1,4 bonds. What are NAG and NAM?',
    options: ['N-acetylglucosamine and N-acetylmuramic acid', 'N-acetylgalactosamine and N-acetylmannosamine', 'Non-reducing Amylose and Amylopectin', 'Glucuronic acid and Iduronic acid'],
    correctIndex: 0,
    explanation: 'Peptidoglycan (murein) consists of repeating disaccharides of N-acetylglucosamine (NAG) and N-acetylmuramic acid (NAM) cross-linked by short peptides.',
    hints: ['NAG = N-acetylglucosamine.', 'NAM = N-acetylmuramic acid.', 'Option A.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_21',
    nodeId: NODE_094,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Quaternary Protein Dynamics',
    question: 'Hemoglobin exhibits positive cooperativity during oxygen binding (Hill coefficient nH ≈ 2.8). What structural transition occurs upon O2 binding?',
    options: ['Transition from the low-affinity T (Tense) state to the high-affinity R (Relaxed) state through quaternary subunit rotation.', 'Irreversible denaturation into monomeric globin chains.', 'Covalent cleavage of salt bridges by carbonic anhydrase.', 'Transition from α-helix to β-sheet.'],
    correctIndex: 0,
    explanation: 'Oxygen binding pulls Fe2+ into the heme plane, shifting Proximal His F8 and triggering a quaternary quaternary structural shift from T state to R state.',
    hints: ['T state (Tense) to R state (Relaxed).', 'Involves quaternary subunit reorientation.', 'Option A.'],
    misconceptionIndex: 3
  },
  {
    id: 'c_22',
    nodeId: NODE_106,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Biomolecular Systems Integration',
    question: 'In cellular metabolic regulation, ATP acts as an allosteric inhibitor of phosphofructokinase-1 (PFK-1). How can ATP be both a substrate and an inhibitor?',
    options: ['PFK-1 has two distinct binding sites for ATP: a high-affinity catalytic active site and a low-affinity allosteric regulatory site.', 'ATP breaks down into toxic purines.', 'ATP binds covalently to histidine residues.', 'PFK-1 denatures in the presence of ATP.'],
    correctIndex: 0,
    explanation: 'PFK-1 has two binding sites for ATP: substrate site (high affinity, binds at low [ATP]) and regulatory site (lower affinity, binds at high [ATP] to inhibit).',
    hints: ['Active site vs Allosteric site.', 'High affinity active site vs lower affinity regulatory site.', 'Option A.'],
    misconceptionIndex: 3
  }
];

// SVG DIAGRAM COMPONENTS

const CarbohydrateStructureSVG: React.FC<{
  type: string;
  temp: number;
  openChainRatio: number;
}> = ({ type, temp, openChainRatio }) => {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-56 bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <defs>
        <radialGradient id="atomGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Header Info */}
      <text x="250" y="24" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold tracking-wide">
        Carbohydrate Stereochemistry Visualizer: {type.replace('_', ' ').toUpperCase()}
      </text>

      {/* Haworth Ring Representation */}
      <g transform="translate(40, 40)">
        {/* Ring Polygon */}
        <polygon
          points="100,50 160,80 160,140 100,170 40,140 40,80"
          fill="rgba(14, 165, 233, 0.15)"
          stroke="#0284c7"
          strokeWidth="3"
        />

        {/* Ring Oxygen */}
        <circle cx="160" cy="80" r="14" fill="#ef4444" />
        <text x="160" y="85" fill="#fff" textAnchor="middle" className="text-xs font-bold">O</text>

        {/* Anomeric C1 Hydroxyl */}
        <line x1="160" y1="140" x2="160" y2={type.includes('beta') ? '180' : '100'} stroke="#eab308" strokeWidth="3" />
        <circle cx="160" cy={type.includes('beta') ? 180 : 100} r="10" fill="#eab308" />
        <text x="160" y={type.includes('beta') ? 184 : 104} fill="#000" textAnchor="middle" className="text-[10px] font-bold">
          {type.includes('beta') ? 'OH(β)' : 'OH(α)'}
        </text>

        {/* Carbon Labels */}
        <text x="175" y="145" fill="#94a3b8" className="text-[10px]">C1</text>
        <text x="100" y="188" fill="#94a3b8" className="text-[10px]">C2</text>
        <text x="25" y="145" fill="#94a3b8" className="text-[10px]">C3</text>
        <text x="25" y="75" fill="#94a3b8" className="text-[10px]">C4</text>
        <text x="100" y="38" fill="#94a3b8" className="text-[10px]">C5</text>

        {/* CH2OH group on C5 */}
        <line x1="100" y1="50" x2="100" y2="20" stroke="#38bdf8" strokeWidth="2" />
        <rect x="75" y="5" width="50" height="18" rx="4" fill="#0284c7" />
        <text x="100" y="18" fill="#fff" textAnchor="middle" className="text-[10px] font-bold">CH2OH</text>
      </g>

      {/* Dynamic Equilibrium Arrow */}
      <g transform="translate(230, 110)">
        <path d="M 0,-10 L 40,-10 L 30,-18 M 40,-10 L 30,-2" stroke="#eab308" strokeWidth="2.5" fill="none" />
        <path d="M 40,10 L 0,10 L 10,18 M 0,10 L 10,2" stroke="#eab308" strokeWidth="2.5" fill="none" />
        <text x="20" y="-22" fill="#eab308" textAnchor="middle" className="text-[10px]">
          k_open ({(openChainRatio * 100).toFixed(1)}%)
        </text>
      </g>

      {/* Open Chain Fischer Form */}
      <g transform="translate(320, 45)">
        <rect x="0" y="0" width="150" height="180" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="75" y="20" fill="#38bdf8" textAnchor="middle" className="text-xs font-semibold">Open-Chain Aldehyde</text>

        {/* Fischer Backbone */}
        <line x1="75" y1="35" x2="75" y2="165" stroke="#94a3b8" strokeWidth="2" />
        <text x="75" y="38" fill="#ef4444" textAnchor="middle" className="text-[10px] font-bold">CHO (C1)</text>

        {/* C2 - C5 cross lines */}
        {[65, 95, 125, 155].map((y, idx) => (
          <g key={idx}>
            <line x1="45" y1={y} x2="105" y2={y} stroke="#64748b" strokeWidth="1.5" />
            <text x="40" y={y + 3} fill="#cbd5e1" textAnchor="end" className="text-[9px]">
              {idx === 1 ? 'HO' : 'H'}
            </text>
            <text x="110" y={y + 3} fill="#cbd5e1" textAnchor="start" className="text-[9px]">
              {idx === 1 ? 'H' : 'OH'}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

const AminoAcidZwitterionSVG: React.FC<{
  pH: number;
  aminoAcid: string;
}> = ({ pH, aminoAcid }) => {
  // Determine dominant species state based on pH
  const pKa1 = 2.34;
  const pKa2 = 9.69;

  let chargeState = 'Zwitterion (Net Charge 0)';
  let chargeVal = 0;
  if (pH < pKa1) {
    chargeState = 'Cationic (+1 Charge)';
    chargeVal = +1;
  } else if (pH > pKa2) {
    chargeState = 'Anionic (-1 Charge)';
    chargeVal = -1;
  }

  return (
    <svg viewBox="0 0 500 260" className="w-full h-56 bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="250" y="22" fill="#a855f7" textAnchor="middle" className="text-sm font-bold">
        Amino Acid Electrochemical State (pH = {pH.toFixed(1)})
      </text>

      {/* Main Chemical Structure */}
      <g transform="translate(140, 60)">
        {/* Central Alpha Carbon */}
        <circle cx="110" cy="70" r="22" fill="#8b5cf6" />
        <text x="110" y="75" fill="#fff" textAnchor="middle" className="text-xs font-extrabold">Cα</text>

        {/* Alpha Amino Group (Left) */}
        <line x1="88" y1="70" x2="30" y2="70" stroke="#38bdf8" strokeWidth="3" />
        <rect x="0" y="45" width="50" height="50" rx="6" fill={pH < pKa2 ? '#0284c7' : '#334155'} />
        <text x="25" y="68" fill="#fff" textAnchor="middle" className="text-xs font-bold">
          {pH < pKa2 ? 'NH3+' : 'NH2'}
        </text>
        <text x="25" y="86" fill="#7dd3fc" textAnchor="middle" className="text-[9px]">
          {pH < pKa2 ? '+1 Protonated' : 'Neutral'}
        </text>

        {/* Alpha Carboxyl Group (Right) */}
        <line x1="132" y1="70" x2="190" y2="70" stroke="#ef4444" strokeWidth="3" />
        <rect x="170" y="45" width="55" height="50" rx="6" fill={pH > pKa1 ? '#dc2626' : '#334155'} />
        <text x="197" y="68" fill="#fff" textAnchor="middle" className="text-xs font-bold">
          {pH > pKa1 ? 'COO-' : 'COOH'}
        </text>
        <text x="197" y="86" fill="#fca5a5" textAnchor="middle" className="text-[9px]">
          {pH > pKa1 ? '-1 Deprotonated' : 'Protonated'}
        </text>

        {/* Hydrogen Atom (Top) */}
        <line x1="110" y1="48" x2="110" y2="15" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="110" cy="15" r="10" fill="#64748b" />
        <text x="110" y="19" fill="#fff" textAnchor="middle" className="text-[10px]">H</text>

        {/* Side Chain R Group (Bottom) */}
        <line x1="110" y1="92" x2="110" y2="135" stroke="#10b981" strokeWidth="3" />
        <rect x="80" y="130" width="60" height="30" rx="6" fill="#059669" />
        <text x="110" y="148" fill="#fff" textAnchor="middle" className="text-xs font-bold">
          R ({aminoAcid.toUpperCase()})
        </text>
      </g>

      {/* Titration Curve Overlay */}
      <g transform="translate(370, 45)">
        <rect x="0" y="0" width="115" height="180" rx="6" fill="#1e293b" stroke="#475569" />
        <text x="57" y="18" fill="#cbd5e1" textAnchor="middle" className="text-[10px] font-bold">pI Curve</text>
        {/* Simple Titration Curve Polyline */}
        <path d="M 15,160 Q 30,150 40,110 T 70,70 T 100,20" stroke="#a855f7" strokeWidth="2" fill="none" />

        {/* Current pH indicator dot */}
        <circle
          cx={15 + (pH / 14) * 85}
          cy={160 - (pH / 14) * 140}
          r="5"
          fill="#facc15"
        />
        <text x="57" y="172" fill="#facc15" textAnchor="middle" className="text-[9px]">
          {chargeState}
        </text>
      </g>
    </svg>
  );
};

const ProteinSecondaryStructureSVG: React.FC<{
  temp: number;
  ureaConc: number;
  foldedPercent: number;
}> = ({ temp, ureaConc, foldedPercent }) => {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-56 bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="250" y="22" fill="#10b981" textAnchor="middle" className="text-sm font-bold">
        Protein Secondary & Tertiary Folding Dynamics (Folded: {foldedPercent.toFixed(1)}%)
      </text>

      {/* Native Folded Alpha-Helix Simulation */}
      <g transform="translate(40, 45)">
        <rect x="0" y="0" width="200" height="180" rx="8" fill="#1e293b" stroke="#059669" />
        <text x="100" y="20" fill="#34d399" textAnchor="middle" className="text-xs font-semibold">Native α-Helix (H-Bonded)</text>

        {/* Helix Backbone Wave */}
        <path
          d="M 30,50 Q 70,30 100,50 T 170,50 Q 130,110 100,90 T 30,130 Q 70,160 170,140"
          stroke={foldedPercent > 50 ? "#10b981" : "#f59e0b"}
          strokeWidth="5"
          fill="none"
          strokeDasharray={foldedPercent < 30 ? "4 4" : "none"}
        />

        {/* Intra-chain Hydrogen Bonds */}
        {foldedPercent > 40 && (
          <>
            <line x1="50" y1="55" x2="50" y2="85" stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />
            <line x1="100" y1="55" x2="100" y2="90" stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />
            <line x1="150" y1="55" x2="150" y2="95" stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />
            <text x="100" y="170" fill="#facc15" textAnchor="middle" className="text-[9px]">
              i → i+4 Carbonyl-Amide H-Bonds
            </text>
          </>
        )}
      </g>

      {/* Denatured Random Coil Simulation */}
      <g transform="translate(260, 45)">
        <rect x="0" y="0" width="200" height="180" rx="8" fill="#1e293b" stroke="#dc2626" />
        <text x="100" y="20" fill="#fca5a5" textAnchor="middle" className="text-xs font-semibold">Denatured Random Coil</text>

        {/* Disrupted Random Path */}
        <path
          d={`M 20,40 C ${60 + (100 - foldedPercent)},${80 - (100 - foldedPercent)} 140,20 180,70 S 40,140 170,160`}
          stroke="#ef4444"
          strokeWidth="3"
          fill="none"
        />

        {/* Urea molecules disrupting H-bonds */}
        {ureaConc > 2 && (
          <g>
            <circle cx="70" cy="80" r="8" fill="#a855f7" opacity="0.8" />
            <text x="70" y="83" fill="#fff" textAnchor="middle" className="text-[8px]">Urea</text>
            <circle cx="130" cy="110" r="8" fill="#a855f7" opacity="0.8" />
            <text x="130" y="113" fill="#fff" textAnchor="middle" className="text-[8px]">Urea</text>
          </g>
        )}

        <text x="100" y="170" fill="#ef4444" textAnchor="middle" className="text-[9px]">
          Loss of 2°/3° Non-Covalent Interactions
        </text>
      </g>
    </svg>
  );
};

const DNADoubleHelixSVG: React.FC<{
  gcPercent: number;
  temp: number;
  denaturedPercent: number;
}> = ({ gcPercent, temp, denaturedPercent }) => {
  return (
    <svg viewBox="0 0 500 260" className="w-full h-56 bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="250" y="22" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold">
        Watson-Crick Double Helix & Thermal Denaturation (GC: {gcPercent}%)
      </text>

      {/* Intact Strand Double Helix */}
      <g transform="translate(50, 40)">
        {/* Strand 1 (5' to 3') */}
        <path
          d="M 20,20 Q 80,100 140,20 T 260,20"
          stroke="#0284c7"
          strokeWidth="4"
          fill="none"
          opacity={1 - denaturedPercent / 120}
        />
        <text x="10" y="20" fill="#38bdf8" className="text-[10px] font-bold">5'</text>
        <text x="270" y="20" fill="#38bdf8" className="text-[10px] font-bold">3'</text>

        {/* Strand 2 (3' to 5' Antiparallel) */}
        <path
          d="M 20,100 Q 80,20 140,100 T 260,100"
          stroke="#059669"
          strokeWidth="4"
          fill="none"
          opacity={1 - denaturedPercent / 120}
        />
        <text x="10" y="105" fill="#34d399" className="text-[10px] font-bold">3'</text>
        <text x="270" y="105" fill="#34d399" className="text-[10px] font-bold">5'</text>

        {/* Rungs / Base Pairs */}
        {[40, 80, 120, 160, 200, 240].map((x, i) => {
          const isGC = i % 2 === 0;
          return (
            <line
              key={i}
              x1={x}
              y1="35"
              x2={x}
              y2="85"
              stroke={isGC ? '#eab308' : '#a855f7'}
              strokeWidth={isGC ? '3.5' : '2'}
              strokeDasharray={denaturedPercent > 50 ? '3 3' : 'none'}
            />
          );
        })}
      </g>

      {/* Hyperchromicity UV Absorbance Spectrogram */}
      <g transform="translate(330, 45)">
        <rect x="0" y="0" width="140" height="180" rx="6" fill="#1e293b" stroke="#334155" />
        <text x="70" y="18" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">A260 Hyperchromic Shift</text>

        {/* Graph Axes */}
        <line x1="25" y1="150" x2="125" y2="150" stroke="#64748b" strokeWidth="1.5" />
        <line x1="25" y1="150" x2="25" y2="30" stroke="#64748b" strokeWidth="1.5" />
        <text x="75" y="166" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Temp (°C)</text>

        {/* Sigmoidal Melting Curve */}
        <path
          d="M 25,135 Q 55,135 75,90 T 125,45"
          stroke="#f59e0b"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Current Temp Point */}
        <circle
          cx={25 + (temp / 100) * 100}
          cy={135 - (denaturedPercent / 100) * 90}
          r="4"
          fill="#ef4444"
        />
        <text x="70" y="145" fill="#ef4444" textAnchor="middle" className="text-[9px] font-semibold">
          {denaturedPercent > 50 ? 'Denatured' : 'Native Duplex'}
        </text>
      </g>
    </svg>
  );
};

const LipidMembraneSVG: React.FC<{
  lipidConc: number;
  saturation: number;
}> = ({ lipidConc, saturation }) => {
  const isMicelle = lipidConc >= 30;

  return (
    <svg viewBox="0 0 500 260" className="w-full h-56 bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="250" y="22" fill="#eab308" textAnchor="middle" className="text-sm font-bold">
        Amphipathic Lipid Self-Assembly & Membrane Fluidity
      </text>

      {/* Phospholipid Bilayer Structure */}
      <g transform="translate(40, 45)">
        <rect x="0" y="0" width="420" height="180" rx="8" fill="#1e293b" stroke="#475569" />
        <text x="210" y="20" fill="#fde047" textAnchor="middle" className="text-xs font-semibold">
          {isMicelle ? 'Self-Assembled Spherical Micelle / Bilayer Liposome' : 'Monomeric Lipid Solution ([CMC] Not Reached)'}
        </text>

        {isMicelle ? (
          /* Micelle Circular Assembly */
          <g transform="translate(210, 100)">
            <circle cx="0" cy="0" r="55" fill="rgba(234, 179, 8, 0.1)" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, idx) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = Math.cos(rad) * 55;
              const y1 = Math.sin(rad) * 55;
              const x2 = Math.cos(rad) * 20;
              const y2 = Math.sin(rad) * 20;
              return (
                <g key={idx}>
                  <circle cx={x1} cy={y1} r="7" fill="#ef4444" />
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#eab308" strokeWidth="2" />
                </g>
              );
            })}
            <text x="0" y="4" fill="#fff" textAnchor="middle" className="text-[10px] font-bold">Hydrophobic Core</text>
          </g>
        ) : (
          /* Monomeric Lipids floating */
          <g transform="translate(30, 40)">
            {[
              { x: 40, y: 30 }, { x: 120, y: 80 }, { x: 200, y: 40 },
              { x: 280, y: 90 }, { x: 340, y: 30 }
            ].map((pos, idx) => (
              <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle cx="0" cy="0" r="8" fill="#ef4444" />
                <path d="M 0,8 C 5,20 -5,30 0,45" stroke="#eab308" strokeWidth="2.5" fill="none" />
                <path d="M 4,8 C 9,20 -1,30 4,45" stroke="#eab308" strokeWidth="2.5" fill="none" />
              </g>
            ))}
            <text x="180" y="120" fill="#94a3b8" textAnchor="middle" className="text-[10px]">
              Hydrophobic fatty acyl chains exposed to aqueous solvent
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};

// MAIN COMPONENT EXPORT
export default function C11_BiotechBiomoleculesCBSESim({
  initialNodeId,
  onComplete
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
}) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery Tab State
  const [discoverySelectedOption, setDiscoverySelectedOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Interactive Lab State
  const [labStep, setLabStep] = useState<number>(0);
  const [pH, setPH] = useState<number>(7.0);
  const [temp, setTemp] = useState<number>(25);
  const [ureaConc, setUreaConc] = useState<number>(0);
  const [gcPercent, setGcPercent] = useState<number>(50);
  const [lipidConc, setLipidConc] = useState<number>(10);
  const [carbohydrateType, setCarbohydrateType] = useState<string>('glucose_alpha');
  const [aminoAcid, setAminoAcid] = useState<string>('alanine');

  // Question Response States
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [challengeAttempts, setChallengeAttempts] = useState<number>(0);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Filter Challenges by Difficulty
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'foundation' | 'standard' | 'advanced'>('all');

  // Mastery Tracking (BKT & SM2)
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initialMap[id] = createBKTState(id);
    });
    return initialMap;
  });

  const [sm2Items, setSm2Items] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach(id => {
      initialMap[id] = createReviewItem(id);
    });
    return initialMap;
  });

  // Inactivity Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Speech trigger on tab change
  useEffect(() => {
    if (activeTab === 'discovery') {
      speechManager.speak(SCENARIO.intro);
    } else if (activeTab === 'lab') {
      speechManager.speak('Welcome to the Biomolecular Exploration Laboratory. Select a simulation step to test physical properties.');
    } else if (activeTab === 'challenges') {
      speechManager.speak('Challenge Mode activated. Test your knowledge of biomolecules across Foundation, Standard, and Advanced tiers.');
    } else if (activeTab === 'summary') {
      speechManager.speak(REAL_WORLD_ACTIVITY.description);
    }
  }, [activeTab]);

  // Filtered Challenges
  const filteredChallenges = useMemo(() => {
    if (difficultyFilter === 'all') return CHALLENGES;
    return CHALLENGES.filter(c => c.difficulty === difficultyFilter);
  }, [difficultyFilter]);

  const activeChallenge = filteredChallenges[currentChallengeIndex] || CHALLENGES[0];

  // Derived Lab Computations
  const openChainRatio = useMemo(() => {
    return Math.min(0.05, 0.002 * (temp / 25));
  }, [temp]);

  const proteinFoldedPercent = useMemo(() => {
    let fold = 100 - (temp - 25) * 1.2 - ureaConc * 10;
    return Math.max(0, Math.min(100, fold));
  }, [temp, ureaConc]);

  const dnaMeltingTemp = useMemo(() => {
    return 69.3 + 0.41 * gcPercent;
  }, [gcPercent]);

  const dnaDenaturedPercent = useMemo(() => {
    const delta = temp - dnaMeltingTemp;
    if (delta < -10) return 0;
    if (delta > 10) return 100;
    return Math.max(0, Math.min(100, (delta + 10) * 5));
  }, [temp, dnaMeltingTemp]);

  // Handlers for Discovery Question
  const handleDiscoverySubmit = () => {
    if (discoverySelectedOption === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelectedOption === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Mutarotation results from reversible ring opening to the open-chain aldehyde.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review how anomeric carbons undergo reversible ring opening in aqueous solution.');
    }
  };

  // Handlers for Predictions & Observations
  const handlePredictionSubmit = (index: number) => {
    if (predictionAnswers[index] === null) return;
    const newSubmitted = [...predictionSubmitted];
    newSubmitted[index] = true;
    setPredictionSubmitted(newSubmitted);

    if (predictionAnswers[index] === PREDICTION_QUESTIONS[index].correctIndex) {
      audioManager.play('success');
    } else {
      audioManager.play('error');
    }
  };

  const handleObservationSubmit = (index: number) => {
    if (observationAnswers[index] === null) return;
    const newSubmitted = [...observationSubmitted];
    newSubmitted[index] = true;
    setObservationSubmitted(newSubmitted);

    if (observationAnswers[index] === OBSERVATION_QUESTIONS[index].correctIndex) {
      audioManager.play('success');
    } else {
      audioManager.play('error');
    }
  };

  // Challenge Response Handler
  const handleChallengeAnswer = (optionIdx: number) => {
    setSelectedChallengeOption(optionIdx);
    resetInactivityTimer();
    audioManager.play('tap');
  };

  const submitChallengeAnswer = () => {
    if (selectedChallengeOption === null) return;

    const isCorrect = selectedChallengeOption === activeChallenge.correctIndex;
    const nodeId = activeChallenge.nodeId;

    // Update BKT State
    setBktStates(prev => {
      const currentBkt = prev[nodeId] || createBKTState(nodeId);
      const nextBkt = bktUpdate(currentBkt, isCorrect);
      return { ...prev, [nodeId]: nextBkt };
    });

    // Update SM2 State
    setSm2Items(prev => {
      const currentSm2 = prev[nodeId] || createReviewItem(nodeId);
      const quality = isCorrect ? (challengeAttempts === 0 ? 5 : 3) : 1;
      const nextSm2 = sm2Update(currentSm2, quality);
      return { ...prev, [nodeId]: nextSm2 };
    });

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSuccessBanner(true);
      setShowSparkle(true);
      const addedPoints = Math.max(10, 30 - challengeAttempts * 5);
      setChallengeScore(prev => prev + addedPoints);

      speechManager.speak('Excellent! Your response is scientifically precise.');

      setTimeout(() => {
        setShowSuccessBanner(false);
        setShowSparkle(false);
        if (currentChallengeIndex < filteredChallenges.length - 1) {
          setCurrentChallengeIndex(prev => prev + 1);
          setSelectedChallengeOption(null);
          setChallengeAttempts(0);
          setShowHint(false);
        } else {
          setShowConfetti(true);
          audioManager.play('celebration');
          if (onComplete) onComplete(challengeScore + addedPoints);
          recordGameScore('c11_biotech_biomolecules', challengeScore + addedPoints);
        }
      }, 1500);
    } else {
      audioManager.play('drop-wrong');
      setChallengeAttempts(prev => prev + 1);
      if (currentHintIndex < 2) {
        setCurrentHintIndex(prev => prev + 1);
      }
      setShowHint(true);
      speechManager.speak('Incorrect. Review the hint provided below.');
    }
  };

  // Calculate Overall BKT Mastery Level
  const overallMastery = useMemo(() => {
    const values = Object.values(bktStates).map(bkt => bkt.pKnown);
    const avg = values.reduce((a, b) => a + b, 0) / (values.length || 1);
    return Math.round(avg * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col gap-6">
      {/* HEADER BAR */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gold-400 tracking-tight flex items-center gap-2">
            <span>🧬</span> ISC Biomolecules & Macromolecular Chemistry
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Interactive Biophysical Exploration • Class 11 Biotechnology
          </p>
        </div>

        {/* Dynamic Mastery Badge & Score */}
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
            <span className="text-xs text-slate-400">BKT Mastery:</span>
            <span className="text-sm font-bold text-emerald-400">{overallMastery}%</span>
          </div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
            <span className="text-xs text-slate-400">Score:</span>
            <span className="text-sm font-bold text-yellow-400">{challengeScore} pts</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
        {[
          { id: 'discovery', label: '1. Lab Discovery & Preconception', icon: '💡' },
          { id: 'lab', label: '2. Interactive Lab Exploration', icon: '🔬' },
          { id: 'challenges', label: '3. Standardized Challenges (22)', icon: '🎯' },
          { id: 'summary', label: '4. Real-World & Diagnostic', icon: '📋' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gold-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT CONTAINERS */}

      {/* TAB 1: DISCOVERY & PRECONCEPTION */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scenario Overview Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gold-400 font-bold border-b border-slate-800 pb-3">
              <span className="text-lg">🧪</span>
              <h2>{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
              {SCENARIO.context}
            </p>

            {/* Discovery Core Question */}
            <div className="mt-4 bg-slate-950 border border-gold-900/40 rounded-xl p-4 flex flex-col gap-3">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Discovery Challenge</span>
              <p className="text-sm font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</p>

              <div className="flex flex-col gap-2 mt-2">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDiscoverySelectedOption(idx)}
                    disabled={discoverySubmitted}
                    className={`text-left p-3 rounded-lg text-xs transition-all border ${
                      discoverySelectedOption === idx
                        ? 'border-gold-500 bg-gold-950/60 text-gold-200'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoverySelectedOption === null}
                  className="mt-3 py-2 px-4 bg-gold-600 hover:bg-gold-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow"
                >
                  Submit Preconception Answer
                </button>
              ) : (
                <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                  <p className="font-bold text-emerald-400 mb-1">
                    {discoverySelectedOption === DISCOVERY_QUESTION.correctIndex ? 'Correct Discovery!' : 'Scientific Insight:'}
                  </p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>
          </div>

          {/* Prediction Questions Column */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-5">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>🔮</span> Lab Hypotheses & Predictions
            </h2>

            {PREDICTION_QUESTIONS.map((pred, pIdx) => (
              <div key={pIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                <p className="text-xs font-bold text-yellow-400">Hypothesis #{pIdx + 1}</p>
                <p className="text-xs font-semibold text-slate-200">{pred.question}</p>

                <div className="flex flex-col gap-1.5">
                  {pred.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const newAns = [...predictionAnswers];
                        newAns[pIdx] = oIdx;
                        setPredictionAnswers(newAns);
                      }}
                      disabled={predictionSubmitted[pIdx]}
                      className={`text-left p-2.5 rounded-lg text-xs border transition-all ${
                        predictionAnswers[pIdx] === oIdx
                          ? 'border-yellow-500 bg-yellow-950/40 text-yellow-200'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-850'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!predictionSubmitted[pIdx] ? (
                  <button
                    onClick={() => handlePredictionSubmit(pIdx)}
                    disabled={predictionAnswers[pIdx] === null}
                    className="py-1.5 px-3 bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-800 text-white rounded-md text-xs font-bold transition-all"
                  >
                    Confirm Prediction
                  </button>
                ) : (
                  <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="font-bold text-gold-400">Verification Protocol: </span>
                    {pred.verifyInstruction}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE LAB EXPLORATION */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lab Step Selector Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Exploration Modules</h3>
            {EXPLORATION_STEPS.map((step, sIdx) => (
              <button
                key={sIdx}
                onClick={() => {
                  setLabStep(sIdx);
                  audioManager.play('tap');
                }}
                className={`text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                  labStep === sIdx
                    ? 'border-gold-500 bg-gold-950/70 text-gold-200 shadow-sm'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-850'
                }`}
              >
                <div className="font-bold text-slate-200 mb-0.5">{step.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{step.instruction}</div>
              </button>
            ))}
          </div>

          {/* Interactive Lab Visualizer & Controls Column */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-gold-400 flex items-center gap-2">
                <span>🔬</span> {EXPLORATION_STEPS[labStep].title}
              </h2>
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
                Node ID: {EXPLORATION_STEPS[labStep].nodeId}
              </span>
            </div>

            {/* Render Specific SVG Visualizer according to step */}
            {labStep === 0 && (
              <CarbohydrateStructureSVG type={carbohydrateType} temp={temp} openChainRatio={openChainRatio} />
            )}
            {labStep === 1 && (
              <AminoAcidZwitterionSVG pH={pH} aminoAcid={aminoAcid} />
            )}
            {labStep === 2 && (
              <ProteinSecondaryStructureSVG temp={temp} ureaConc={ureaConc} foldedPercent={proteinFoldedPercent} />
            )}
            {labStep === 3 && (
              <LipidMembraneSVG lipidConc={lipidConc} saturation={50} />
            )}
            {labStep === 4 && (
              <DNADoubleHelixSVG gcPercent={gcPercent} temp={temp} denaturedPercent={dnaDenaturedPercent} />
            )}

            {/* Parameter Adjustment Sliders */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Temperature Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Temperature (°C):</span>
                  <span className="text-gold-400">{temp}°C</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={temp}
                  onChange={e => setTemp(Number(e.target.value))}
                  className="accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* pH Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Solution pH:</span>
                  <span className="text-purple-400">{pH.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="14.0"
                  step="0.1"
                  value={pH}
                  onChange={e => setPH(Number(e.target.value))}
                  className="accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Urea Concentration Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Denaturant [Urea] (M):</span>
                  <span className="text-emerald-400">{ureaConc} M</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={ureaConc}
                  onChange={e => setUreaConc(Number(e.target.value))}
                  className="accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* GC Content % Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">DNA Base GC Content (%):</span>
                  <span className="text-yellow-400">{gcPercent}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={gcPercent}
                  onChange={e => setGcPercent(Number(e.target.value))}
                  className="accent-yellow-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Molecule Selectors */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-300 font-semibold">Carbohydrate Form:</label>
                <select
                  value={carbohydrateType}
                  onChange={e => setCarbohydrateType(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                >
                  <option value="glucose_alpha">α-D-Glucose Pyranose</option>
                  <option value="glucose_beta">β-D-Glucose Pyranose</option>
                  <option value="galactose">D-Galactose (C4 Epimer)</option>
                  <option value="mannose">D-Mannose (C2 Epimer)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-300 font-semibold">Amino Acid:</label>
                <select
                  value={aminoAcid}
                  onChange={e => setAminoAcid(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                >
                  <option value="alanine">Alanine (Nonpolar R=CH3)</option>
                  <option value="glycine">Glycine (Achiral R=H)</option>
                  <option value="glutamic_acid">Glutamic Acid (Acidic R=COOH)</option>
                  <option value="lysine">Lysine (Basic R=NH2)</option>
                </select>
              </div>
            </div>

            {/* Observation Questions Section */}
            <div className="mt-2 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Laboratory Observation Prompts
              </h4>

              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="flex flex-col gap-2 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <p className="text-xs font-semibold text-slate-200">{obs.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          const newAns = [...observationAnswers];
                          newAns[oIdx] = optIdx;
                          setObservationAnswers(newAns);
                        }}
                        disabled={observationSubmitted[oIdx]}
                        className={`text-left p-2 rounded text-[11px] border transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {!observationSubmitted[oIdx] ? (
                    <button
                      onClick={() => handleObservationSubmit(oIdx)}
                      disabled={observationAnswers[oIdx] === null}
                      className="self-start mt-1 py-1 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white rounded text-[11px] font-bold"
                    >
                      Record Observation
                    </button>
                  ) : (
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ Observation recorded into experimental notebook.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STANDARDIZED CHALLENGES (22 CHALLENGES) */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenge Navigation & Difficulty Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tier Filter</h3>
              <span className="text-xs font-bold text-gold-400">{filteredChallenges.length} Items</span>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['all', 'foundation', 'standard', 'advanced'] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => {
                    setDifficultyFilter(tier);
                    setCurrentChallengeIndex(0);
                    setSelectedChallengeOption(null);
                  }}
                  className={`flex-1 py-1 px-2 rounded text-[10px] font-bold capitalize transition-all ${
                    difficultyFilter === tier
                      ? 'bg-gold-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            {/* Challenge List Buttons */}
            <div className="flex flex-col gap-1.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredChallenges.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCurrentChallengeIndex(idx);
                    setSelectedChallengeOption(null);
                    setChallengeAttempts(0);
                    setShowHint(false);
                    audioManager.play('tap');
                  }}
                  className={`text-left p-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ${
                    currentChallengeIndex === idx
                      ? 'border-gold-500 bg-gold-950/80 text-gold-200'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-850'
                  }`}
                >
                  <span className="truncate pr-2">{idx + 1}. {c.competencyLevel}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      c.difficulty === 'foundation'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : c.difficulty === 'standard'
                        ? 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {c.difficulty[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Challenge Question Area */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between relative">
            <div>
              {/* Question Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-gold-950 text-gold-300 px-2.5 py-1 rounded-full border border-gold-800 font-bold">
                    Challenge {currentChallengeIndex + 1} of {filteredChallenges.length}
                  </span>
                  <span className="text-xs text-slate-400">Node: {activeChallenge.nodeId}</span>
                </div>
                <span className="text-xs font-semibold text-slate-400">{activeChallenge.competencyLevel}</span>
              </div>

              {/* Question Body */}
              <h3 className="text-sm md:text-base font-bold text-slate-100 mb-5 leading-relaxed">
                {activeChallenge.question}
              </h3>

              {/* Option Selection List */}
              <div className="flex flex-col gap-2.5 mb-6">
                {activeChallenge.options.map((option, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleChallengeAnswer(oIdx)}
                    className={`text-left p-3.5 rounded-xl text-xs md:text-sm font-medium border transition-all ${
                      selectedChallengeOption === oIdx
                        ? 'border-gold-500 bg-gold-950/60 text-gold-100 shadow-md ring-1 ring-gold-500'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + oIdx)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Hints */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowHint(prev => !prev)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1"
                >
                  💡 {showHint ? 'Hide Scientific Hint' : 'Request Diagnostic Hint'}
                </button>

                <button
                  onClick={submitChallengeAnswer}
                  disabled={selectedChallengeOption === null}
                  className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold rounded-lg text-xs md:text-sm transition-all shadow-lg"
                >
                  Submit Final Answer
                </button>
              </div>

              {/* Dynamic Hint Bubble Component */}
              <HintBubble
                show={showHint}
                text={activeChallenge.hints[currentHintIndex] || activeChallenge.hints[0]}
              />

              {/* Dynamic Success Banner Component */}
              <SuccessBanner
                show={showSuccessBanner}
                text={`Correct! +${Math.max(10, 30 - challengeAttempts * 5)} Points`}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REAL-WORLD & DIAGNOSTIC REVIEW */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real World Activity Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-base font-bold text-gold-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>🏭</span> {REAL_WORLD_ACTIVITY.title}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="flex flex-col gap-2.5 mt-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quality Assurance Protocol Steps</h3>
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="bg-gold-950 text-gold-400 font-bold px-2 py-0.5 rounded text-[10px] border border-gold-800">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Misconceptions Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-base font-bold text-purple-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>🧠</span> Diagnostic Misconception Rectifier
            </h2>

            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
              {MISCONCEPTIONS.map(m => (
                <div key={m.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col gap-1.5">
                  <div className="text-xs font-bold text-rose-400 flex items-center gap-1">
                    <span>❌ Misconception:</span> {m.misconception}
                  </div>
                  <div className="text-xs text-emerald-300 font-medium bg-slate-900 p-2 rounded border border-slate-800">
                    <span>✓ Scientific Fact:</span> {m.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY VISUAL EFFECTS */}
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle} x={500} y={300} />
    </div>
  );
}