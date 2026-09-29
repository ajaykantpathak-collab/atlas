'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// NODE CONSTANTS
// ============================================================================
const ALL_NODE_IDS = [
  'c11_bt_cbse_366', 'c11_bt_cbse_367', 'c11_bt_cbse_368', 'c11_bt_cbse_369',
  'c11_bt_cbse_370', 'c11_bt_cbse_371', 'c11_bt_cbse_372', 'c11_bt_cbse_373',
  'c11_bt_cbse_374', 'c11_bt_cbse_375', 'c11_bt_cbse_376', 'c11_bt_cbse_377',
  'c11_bt_cbse_378', 'c11_bt_cbse_379', 'c11_bt_cbse_380', 'c11_bt_cbse_381',
  'c11_bt_cbse_382', 'c11_bt_cbse_383', 'c11_bt_cbse_384', 'c11_bt_cbse_385',
  'c11_bt_cbse_386', 'c11_bt_cbse_387', 'c11_bt_cbse_388', 'c11_bt_cbse_389',
  'c11_bt_cbse_390', 'c11_bt_cbse_391', 'c11_bt_cbse_392', 'c11_bt_cbse_393',
  'c11_bt_cbse_394', 'c11_bt_cbse_395', 'c11_bt_cbse_396', 'c11_bt_cbse_397',
  'c11_bt_cbse_398'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ============================================================================
// SECTION 1: SCENARIO
// ============================================================================
const SCENARIO = {
  title: 'Biomolecular Informatics & Rational Drug Design Laboratory',
  intro: 'Welcome to the Advanced Protein Informatics and Cheminformatics Core Facility. You are appointed as Lead Computational Biologist investigating therapeutic targets for emerging metabolic disorders.',
  context: 'In this simulation, you will analyze protein primary sequence metrics (pI, GRAVY, Instability Index), execute homology modeling workflows, perform virtual chemical library screening, and filter drug leads using Lipinski\'s Rule of Five.'
};

// ============================================================================
// SECTION 2: DISCOVERY QUESTION
// ============================================================================
const DISCOVERY_QUESTION = {
  question: 'Why can a synthetic small molecule exhibit high binding affinity to a protein target in silico yet fail completely as an oral drug candidate in human clinical trials?',
  options: [
    'Virtual docking algorithms fail to calculate electrostatic forces accurately in modern supercomputers.',
    'High target affinity does not account for ADMET properties like membrane permeability, solubility, and metabolic instability defined by Lipinski criteria.',
    'Proteins undergo total denaturation when exposed to synthetic small molecules in vivo.',
    'Chemical databases like PubChem and ChEMBL contain only theoretical molecules that cannot be synthesized.'
  ],
  correctIndex: 1,
  hintAfter: 'Drug discovery requires balancing target binding (pharmacodynamics) with bio-accessibility and safety (pharmacokinetics defined by Lipinski\'s Rule of Five).'
};

// ============================================================================
// SECTION 3: EXPLORATION STEPS
// ============================================================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Protein Physicochemical Properties & ProtParam Calculator',
    instruction: 'Adjust the amino acid composition sliders (Aliphatic %, Acidic/Basic ratio, Hydrophobic content) to observe changes in pI, Instability Index (<40 = stable), and GRAVY score.',
    interactionType: 'protparam-calculator',
    nodeId: 'c11_bt_cbse_372'
  },
  {
    title: 'Lab 2: Protein Structure Prediction & Modeling Pipeline',
    instruction: 'Select target sequence similarity levels to evaluate when to use Homology Modeling (>30% identity), Threading/Fold Recognition (15-30%), or De Novo prediction (<15%).',
    interactionType: 'structure-pipeline',
    nodeId: 'c11_bt_cbse_378'
  },
  {
    title: 'Lab 3: Molecular Graph & Cheminformatics Substructure Search',
    instruction: 'Modify functional groups on a scaffold molecule to perform substructure queries across PubChem, ChEMBL, and DrugBank databases.',
    interactionType: 'cheminformatics-graph',
    nodeId: 'c11_bt_cbse_386'
  },
  {
    title: 'Lab 4: Virtual Screening & High-Throughput Screening (HTS) Funnel',
    instruction: 'Filter a 1,000,000 compound virtual library down to lead hits using Pharmacophore filtering, Molecular Docking, and ADMET screening.',
    interactionType: 'virtual-screening',
    nodeId: 'c11_bt_cbse_394'
  },
  {
    title: 'Lab 5: Lipinski\'s Rule of Five (RO5) Drug-Likeness Analyzer',
    instruction: 'Tweak Molecular Weight (MW), LogP (Lipophilicity), Hydrogen Bond Donors (HBD), and Acceptors (HBA) to test RO5 compliance for oral bio-availability.',
    interactionType: 'lipinski-analyzer',
    nodeId: 'c11_bt_cbse_398'
  }
];

// ============================================================================
// SECTION 4: PREDICTION QUESTIONS
// ============================================================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a protein sequence has an Instability Index calculated at 48.5 and a GRAVY score of +0.85, how will this protein behave in aqueous laboratory buffer?',
    options: [
      'It will be extremely stable in water with high solubility.',
      'It will be unstable in vitro (index > 40) and highly hydrophobic (positive GRAVY), likely precipitating or aggregating.',
      'It will spontaneously fold into a triple-helix structure without chaperones.',
      'Its pI will automatically shift to 7.0 to compensate for hydropathy.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Test hydrophobic content and instability index in Lab 1 (ProtParam Calculator).',
    nodeId: 'c11_bt_cbse_375'
  },
  {
    question: 'Predict: A candidate small molecule has MW = 580 Da, LogP = 5.8, HBD = 6, HBA = 12. How many Lipinski Rule of Five violations does it display?',
    options: [
      '0 violations (it passes all rules)',
      '1 violation (only LogP is exceeded)',
      '4 violations (violates MW > 500, LogP > 5, HBD > 5, and HBA > 10)',
      '2 violations (violates MW and HBA only)'
    ],
    correctIndex: 2,
    verifyInstruction: 'Adjust sliders for MW=580, LogP=5.8, HBD=6, HBA=12 in Lab 5 (Lipinski Analyzer).',
    nodeId: 'c11_bt_cbse_398'
  }
];

// ============================================================================
// SECTION 5: OBSERVATION QUESTIONS
// ============================================================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the relationship between sequence identity percentage and structure prediction methodology accuracy?',
    observableOptions: [
      'Sequence identity has no bearing on method choice; De Novo is always best.',
      'Homology modeling yields high-resolution models when sequence identity to a PDB template exceeds 30%. Below 25%, threading or De Novo methods become essential.',
      'Threading requires 100% sequence identity to function.',
      'PDB files can only store structures determined by De Novo prediction.'
    ],
    correctIndex: 1,
    nodeId: 'c11_bt_cbse_379'
  },
  {
    question: 'What happens during the Virtual Screening funnel as candidate compounds pass from pharmacophore filtering to high-precision molecular docking?',
    observableOptions: [
      'The number of candidate molecules increases while computing time decreases.',
      'The compound library size drops dramatically (e.g. 1M -> 10k -> 100), while computational effort per molecule increases significantly.',
      'All compounds are converted into RNA sequences.',
      'Lipinski violations increase automatically at each stage.'
    ],
    correctIndex: 1,
    nodeId: 'c11_bt_cbse_394'
  }
];

// ============================================================================
// SECTION 6: REAL WORLD ACTIVITY
// ============================================================================
const REAL_WORLD_ACTIVITY = {
  title: 'Computer-Aided Drug Discovery (CADD) Lead Optimization Project',
  description: 'You are evaluating a novel SARS-CoV-2 Main Protease (Mpro) inhibitor compound series derived from high-throughput virtual screening.',
  steps: [
    'Retrieve target protein crystal structure from RCSB Protein Data Bank (PDB ID: 6LU7).',
    'Calculate target protein pI (5.95) and GRAVY score (-0.42) to confirm solubility in purification buffer.',
    'Screen a virtual library of 250,000 synthetic compounds against the catalytic dyad (His41/Cys145) pharmacophore model.',
    'Filter hit molecules using Lipinski\'s Rule of Five (MW <= 500 g/mol, LogP <= 5, H-donors <= 5, H-acceptors <= 10) to select 5 lead hits for laboratory synthesis.'
  ]
};

// ============================================================================
// MISCONCEPTIONS & DIAGNOSTIC QUESTIONS
// ============================================================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Homology Modeling vs De Novo Prediction',
    misconception: 'Students often assume De Novo prediction is always better because it calculates structures from first principles.',
    correction: 'Homology modeling is far more reliable and computationally efficient when a homologous template structure (>30% sequence identity) exists in the PDB.'
  },
  {
    id: 'misc_2',
    title: 'Lipinski Rule of Five Thresholds',
    misconception: 'Believing that breaking 1 Lipinski rule completely disqualifies a compound from becoming an FDA-approved drug.',
    correction: 'Lipinski\'s Rule of Five is a heuristic guide for oral bioavailability. Many successful drugs (e.g., atorvastatin, cyclosporine) violate 1 or 2 rules.'
  },
  {
    id: 'misc_3',
    title: 'GRAVY Score Interpretation',
    misconception: 'Assuming higher positive GRAVY scores mean higher protein solubility in water.',
    correction: 'Positive GRAVY scores indicate overall hydrophobicity (insoluble/membrane proteins), while negative GRAVY scores indicate hydrophilicity (soluble proteins).'
  },
  {
    id: 'misc_4',
    title: 'PDB File Content',
    misconception: 'Thinking PDB files store 3D graphic images or render pre-colored protein pictures.',
    correction: 'PDB files store atomic Cartesian coordinates (X, Y, Z), element symbols, residue names, and B-factors in standardized ASCII text text formats.'
  },
  {
    id: 'misc_5',
    title: 'High Throughput Screening (HTS) vs Virtual Screening',
    misconception: 'Confusing wet-lab HTS with computational Virtual Screening.',
    correction: 'HTS uses robotics to physically test thousands of biochemical assays in microplates, whereas Virtual Screening uses computational software to filter in silico libraries.'
  },
  {
    id: 'misc_6',
    title: 'Molecular Graph Representation',
    misconception: 'Believing chemical structures are stored as simple images inside computational chemical databases.',
    correction: 'Cheminformatics databases store molecules as graph structures (nodes = atoms, edges = bonds) or SMILES strings to enable programmatic substructure searches.'
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which biological database is primarily dedicated to archiving experimental 3D atomic coordinates of biological macromolecules?',
    options: ['NCBI GenBank', 'Protein Data Bank (PDB)', 'PubChem', 'PharmGKB'],
    correctIndex: 1,
    explanation: 'The Protein Data Bank (PDB) is the single global repository for 3D structural data of proteins and nucleic acids determined by X-ray crystallography, NMR, and Cryo-EM.'
  },
  {
    id: 'diag_2',
    question: 'What does an Instability Index value of less than 40 indicate for a protein sequence according to Guruprasad\'s method?',
    options: ['The protein is predicted to be unstable in test tube conditions', 'The protein is predicted to be stable in vitro', 'The protein is an integral membrane protein', 'The protein cannot be expressed in E. coli'],
    correctIndex: 1,
    explanation: 'An Instability Index < 40 predicts that the protein will be stable in vitro, whereas a value > 40 indicates instability (short half-life).'
  },
  {
    id: 'diag_3',
    question: 'Which of the following parameters is NOT one of Lipinski\'s Rule of Five criteria?',
    options: ['Molecular weight <= 500 Da', 'LogP <= 5', 'Number of rotatable bonds <= 5', 'Hydrogen bond donors <= 5'],
    correctIndex: 2,
    explanation: 'Lipinski\'s Rule of Five includes: MW <= 500, LogP <= 5, HBD <= 5, HBA <= 10. (Rotatable bonds <= 10 is part of Veber\'s rule, not Lipinski\'s original RO5).'
  },
  {
    id: 'diag_4',
    question: 'When sequence identity between a target protein and known template structures falls between 15% and 30%, which prediction technique is recommended?',
    options: ['Homology Modeling', 'Threading / Fold Recognition', 'Ab initio / De Novo', 'X-ray crystallography simulation'],
    correctIndex: 1,
    explanation: 'Threading (Fold Recognition) is tailored for the "twilight zone" of 15-30% sequence identity where sequence alignment fails but fold similarity exists.'
  },
  {
    id: 'diag_5',
    question: 'In cheminformatics, what representation format uses string lines such as "CC(=O)OC1=CC=CC=C1C(=O)O" to encode chemical structures?',
    options: ['PDB Format', 'SMILES (Simplified Molecular Input Line Entry System)', 'FASTA Format', 'GenBank Flat File'],
    correctIndex: 1,
    explanation: 'SMILES represents chemical structures as line notations/strings based on chemical graph topology.'
  },
  {
    id: 'diag_6',
    question: 'What parameter measures the relative volume occupied by aliphatic side chains (Alanine, Valine, Isoleucine, Leucine) to indicate protein thermal stability?',
    options: ['Isoelectric Point', 'Aliphatic Index', 'GRAVY score', 'Extinction Coefficient'],
    correctIndex: 1,
    explanation: 'The Aliphatic Index is defined as the relative volume occupied by aliphatic side chains, directly correlating with thermal stability.'
  },
  {
    id: 'diag_7',
    question: 'Which specialized database focuses on small molecule bioactivity data against biological targets, maintaining quantitative IC50 and Ki values?',
    options: ['NCBI RefSeq', 'ChEMBL', 'BioModels', 'CAS Registry'],
    correctIndex: 1,
    explanation: 'ChEMBL is a curated chemical database of bioactive molecules with drug-like properties maintained by EMBL-EBI.'
  },
  {
    id: 'diag_8',
    question: 'What spatial arrangement of steric and electronic features necessary to ensure optimal supramolecular interactions with a specific biological target is called a:',
    options: ['Chromophore', 'Pharmacophore', 'Auxophore', 'Toxophore'],
    correctIndex: 1,
    explanation: 'A pharmacophore is an abstract description of molecular features that are necessary for molecular recognition of a ligand by a biological macromolecule.'
  }
];

// ============================================================================
// SECTION 7: CHALLENGES (23 total)
// ============================================================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'Recall' | 'Understanding' | 'Application' | 'Analysis' | 'Evaluation';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  sortItems?: string[];
  correctOrder?: number[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- TIER 1: FOUNDATION (7 Challenges) ---
  {
    id: 'c1',
    nodeId: 'c11_bt_cbse_366',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Protein informatics combines computer science, statistics, and biochemistry to achieve which primary objective?',
    options: [
      'To replace all wet-lab laboratory synthesis entirely',
      'To store, manage, analyze, and predict structural and functional aspects of proteins',
      'To synthesize artificial amino acids in high quantities',
      'To sequence genomic DNA without extracting cellular RNA'
    ],
    correctIndex: 1,
    explanation: 'Protein informatics encompasses data storage, structural analysis, functional annotation, and predictive modeling for protein macromolecules.',
    hints: [
      'Think about what informatics means when applied to biological data.',
      'It deals with both structure and function of proteins.',
      'Data management and computational modeling are core aspects.'
    ]
  },
  {
    id: 'c2',
    nodeId: 'c11_bt_cbse_369',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which biological database is internationally recognized as the main repository for 3D atomic structures determined by X-ray crystallography and NMR?',
    options: ['GenBank', 'PDB (Protein Data Bank)', 'UniProtKB', 'PubMed'],
    correctIndex: 1,
    explanation: 'The Protein Data Bank (PDB) is the primary worldwide archive for 3D macromolecular structure data.',
    hints: [
      'Look for the acronym that stands for Protein Data Bank.',
      'It stores 3D X, Y, Z atomic coordinates.',
      'The acronym starts with P and ends with B.'
    ]
  },
  {
    id: 'c3',
    nodeId: 'c11_bt_cbse_373',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'At a protein\'s Isoelectric Point (pI), what is its net electrical charge?',
    options: ['Positive (+1)', 'Negative (-1)', 'Zero (Zwitterionic state)', 'Infinite positive charge'],
    correctIndex: 2,
    explanation: 'At the isoelectric point (pI), the net electrical charge of the protein molecule is exactly zero.',
    hints: [
      'Iso- means equal or neutral.',
      'Acidic and basic groups balance each other out.',
      'The net charge becomes neutral (0).'
    ]
  },
  {
    id: 'c4',
    nodeId: 'c11_bt_cbse_375',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'According to ProtParam parameters, a protein with an Instability Index calculated as 32.4 is classified as:',
    options: ['Unstable in vitro', 'Stable in vitro', 'Hyper-thermostable', 'Prone to immediate degradation'],
    correctIndex: 1,
    explanation: 'An instability index below 40 indicates stability in vitro; values above 40 indicate instability.',
    hints: [
      'The threshold value between stable and unstable is 40.',
      'Is 32.4 lower or higher than 40?',
      'Values under 40 mean the protein is stable.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c5',
    nodeId: 'c11_bt_cbse_383',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which record line in a standard PDB formatted text file contains the X, Y, Z atomic coordinates of individual protein atoms?',
    options: ['HEADER', 'REMARK', 'ATOM', 'SEQRES'],
    correctIndex: 2,
    explanation: 'The ATOM record lines in a PDB file specify atom number, atom name, amino acid residue, chain identifier, and 3D X, Y, Z coordinates.',
    hints: [
      'What basic building unit of matter does this record describe?',
      'The keyword matches the physical particle name.',
      'Lines start with ATOM.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c6',
    nodeId: 'c11_bt_cbse_385',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Cheminformatics primarily focuses on the computational representation, storage, and analysis of which data type?',
    options: ['Whole genome nucleotide sequences', 'Small chemical structures and biological activity data', 'Phylogenetic trees of species', 'Mass spectrometry peptide fragments only'],
    correctIndex: 1,
    explanation: 'Cheminformatics focuses on small organic molecules, chemical structures, molecular graphs, and bioactivity properties in drug discovery.',
    hints: [
      'Cheminformatics blends Chemistry and Informatics.',
      'Think about small synthetic molecules and drugs.',
      'It manages chemical graphs and SMILES strings.'
    ]
  },
  {
    id: 'c7',
    nodeId: 'c11_bt_cbse_398',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'According to Lipinski\'s Rule of Five, an orally active drug candidate should ideally have a Molecular Weight less than or equal to:',
    options: ['200 Da', '500 Da', '1000 Da', '50 Da'],
    correctIndex: 1,
    explanation: 'Lipinski\'s Rule of Five sets the molecular weight threshold at <= 500 Da (g/mol) for favorable oral absorption.',
    hints: [
      'All numbers in the Rule of Five relate to multiples of 5.',
      'The threshold is 5 times 100.',
      '500 Daltons.'
    ],
    misconceptionIndex: 1
  },

  // --- TIER 2: STANDARD (8 Challenges) ---
  {
    id: 'c8',
    nodeId: 'c11_bt_cbse_374',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'The Aliphatic Index of a protein sequence is calculated based on the relative volume occupied by which set of amino acid side chains?',
    options: [
      'Lysine, Arginine, and Histidine',
      'Alanine, Valine, Isoleucine, and Leucine',
      'Phenylalanine, Tyrosine, and Tryptophan',
      'Cysteine and Methionine'
    ],
    correctIndex: 1,
    explanation: 'The Aliphatic Index measures the relative volume of aliphatic side chains: Alanine (Ala), Valine (Val), Isoleucine (Ile), and Leucine (Leu).',
    hints: [
      'Aliphatic amino acids have non-aromatic hydrocarbon side chains.',
      'Includes Alanine, Valine, Leucine, and Isoleucine.',
      'Ala, Val, Leu, Ile.'
    ]
  },
  {
    id: 'c9',
    nodeId: 'c11_bt_cbse_376',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Protein A has a GRAVY score of +1.20, while Protein B has a GRAVY score of -0.85. What can you infer about their cellular locations?',
    options: [
      'Protein A is a soluble cytoplasmic enzyme; Protein B is a transmembrane protein.',
      'Protein A is an integral membrane protein; Protein B is a soluble globular protein.',
      'Both proteins are nuclear transcription factors.',
      'Protein A will easily dissolve in pure water without detergents.'
    ],
    correctIndex: 1,
    explanation: 'Positive GRAVY scores indicate high overall hydrophobicity typical of membrane-spanning domains. Negative GRAVY scores reflect hydrophilic, soluble proteins.',
    hints: [
      'Positive GRAVY = hydrophobic (water-repelling).',
      'Negative GRAVY = hydrophilic (water-loving).',
      'Membrane proteins are hydrophobic (+), cytoplasmic soluble proteins are hydrophilic (-).'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c10',
    nodeId: 'c11_bt_cbse_379',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'You have isolated a novel bacterial enzyme that shares 68% sequence identity with a solved crystal structure in the PDB. Which structure prediction method is most appropriate?',
    options: ['Ab initio / De Novo modeling', 'Homology (Comparative) Modeling', 'Fold Recognition (Threading)', 'Molecular Dynamics Simulation from scratch'],
    correctIndex: 1,
    explanation: 'Homology modeling is the method of choice when target sequence identity to an existing PDB template exceeds 30% (here 68%).',
    hints: [
      '68% identity is well above the 30% threshold.',
      'A clear, closely related structural template exists in the PDB.',
      'Homology (comparative) modeling is fast and accurate here.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c11',
    nodeId: 'c11_bt_cbse_380',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'When sequence identity drops to 20% ("twilight zone"), how does Protein Threading (Fold Recognition) assign a 3D fold to the target sequence?',
    options: [
      'By aligning sequence bases directly without scoring energy',
      'By physically threading sequence residues into a database of known 3D structural folds and scoring structural compatibility',
      'By predicting mRNA secondary structure first',
      'By building atomic bonds strictly using quantum mechanics equations'
    ],
    correctIndex: 1,
    explanation: 'Threading aligns the target amino acid sequence directly against standard 3D backbone fold templates, assessing solvation and pairwise residue potentials.',
    hints: [
      'Threading tests how well the new sequence fits existing 3D structural shapes.',
      'It evaluates structural compatibility rather than sequence alignment alone.',
      'Option B accurately describes structural fold recognition.'
    ]
  },
  {
    id: 'c12',
    nodeId: 'c11_bt_cbse_386',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How are chemical structures represented computationally in graph-theory based cheminformatics software?',
    options: [
      'Vertices represent chemical bonds, and edges represent atomic nuclei.',
      'Vertices (nodes) represent atoms, and edges represent covalent bonds.',
      'Nodes represent entire protein domains, and edges represent metabolic pathways.',
      'Structures are stored purely as pixel raster matrices.'
    ],
    correctIndex: 1,
    explanation: 'In chemical graph theory, atoms are represented as graph vertices (nodes) and chemical bonds as graph edges.',
    hints: [
      'Consider the fundamental entities of a molecule.',
      'Atoms are points; bonds are lines between them.',
      'Vertices = atoms, Edges = bonds.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c13',
    nodeId: 'c11_bt_cbse_389',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Recall',
    question: 'Match the database to its specialty: (1) PubChem, (2) ChEMBL, (3) ZINC.',
    options: [
      '(1) Commercial 3D compounds for docking; (2) NCBI small chemical database; (3) Bioactivity database',
      '(1) NCBI chemical suite; (2) Bioactivity & drug target data; (3) Commercially available 3D molecules for virtual screening',
      '(1) Protein crystal structures; (2) Gene expression; (3) DNA annotations',
      '(1) Metabolic models; (2) CAS abstracts; (3) Pharmacogenomics'
    ],
    correctIndex: 1,
    explanation: 'PubChem is NIH/NCBI\'s chemical database, ChEMBL focuses on bioactivity/assay data, and ZINC contains 3D structures of purchasable compounds for screening.',
    hints: [
      'PubChem is run by NCBI/NIH.',
      'ChEMBL stores quantitative IC50/Ki bioactivity data.',
      'ZINC provides ready-to-dock 3D structures of vendor compounds.'
    ]
  },
  {
    id: 'c14',
    nodeId: 'c11_bt_cbse_396',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What constitutes a Pharmacophore Model in computer-aided drug design?',
    options: [
      'A complete 3D list of all atoms in a protein backbone',
      'An ensemble of steric and electronic features (hydrophobic centers, hydrogen bond acceptors/donors, aromatic rings) required for target binding',
      'The exact molecular formula of an active pharmaceutical ingredient',
      'The rate constant of chemical degradation in gastric fluid'
    ],
    correctIndex: 1,
    explanation: 'A pharmacophore model defines spatial arrangements of key binding features (H-bond donors/acceptors, hydrophobic regions, positive/negative charges).',
    hints: [
      'Pharmacophore comes from pharmakon (drug) + phoros (bearer).',
      'It represents essential spatial interaction features rather than specific atoms.',
      'Look for the option describing steric and electronic features.'
    ]
  },
  {
    id: 'c15',
    nodeId: 'c11_bt_cbse_397',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In High-Throughput Screening (HTS), what primary advantage does robotics automation provide over traditional manual assays?',
    options: [
      'It eliminates the need for biological target proteins',
      'It allows rapid testing of tens of thousands to millions of chemical compounds per day in microplate format',
      'It guarantees 100% conversion of hits into FDA approved drugs',
      'It removes all false positive experimental results'
    ],
    correctIndex: 1,
    explanation: 'HTS uses automated robotic systems to test massive chemical libraries against assay targets rapidly and reproducibly.',
    hints: [
      'High-Throughput means processing huge volumes quickly.',
      'Microplates (384- or 1536-well) are used.',
      'Robotics screen millions of reactions automatically.'
    ],
    misconceptionIndex: 4
  },

  // --- TIER 3: ADVANCED (8 Challenges) ---
  {
    id: 'c16',
    nodeId: 'c11_bt_cbse_398',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Evaluate candidate molecule X: MW = 480 g/mol, LogP = 5.6, HBD = 4, HBA = 8. How many total Lipinski Rule of Five violations does molecule X exhibit?',
    correctAnswer: 1,
    tolerance: 0,
    explanation: 'MW <= 500 (Pass: 480), LogP <= 5 (FAIL: 5.6 > 5), HBD <= 5 (Pass: 4), HBA <= 10 (Pass: 8). Total violations = 1 (LogP only).',
    hints: [
      'Check MW <= 500: 480 (Pass).',
      'Check LogP <= 5: 5.6 (Fail!).',
      'Check HBD <= 5 (4 Pass) and HBA <= 10 (8 Pass). Total fails = 1.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c17',
    nodeId: 'c11_bt_cbse_378',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Arrange the computational protein structure prediction workflow steps in correct logical order from start to finish:',
    sortItems: [
      'Target sequence retrieval (FASTA)',
      'Template search in PDB using BLAST/HHblits',
      'Target-Template sequence alignment',
      'Backbone model building & loop modeling',
      'Energy minimization and structure validation (PROCHECK/SASA)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The standard homology modeling workflow moves from target FASTA sequence -> template identification -> alignment -> 3D model construction -> energy minimization & validation.',
    hints: [
      'Always start with the sequence input in FASTA format.',
      'Search PDB for homologous templates next.',
      'Finish with energy minimization and validation.'
    ]
  },
  {
    id: 'c18',
    nodeId: 'c11_bt_cbse_395',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Sort the key phases of the Drug Discovery Pipeline from initial discovery to market approval:',
    sortItems: [
      'Target Identification & Validation',
      'Virtual Screening & Hit-to-Lead Optimization',
      'Preclinical In Vitro / Animal Safety Testing',
      'Clinical Trials (Phases I, II, III)',
      'FDA Approval & Post-Market Surveillance (Phase IV)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Drug development progresses sequentially: Target Selection -> Hit/Lead Generation -> Preclinical Safety -> Clinical Human Trials -> Regulatory Approval.',
    hints: [
      'Target identification comes before compound screening.',
      'Preclinical testing occurs before testing in human clinical trials.',
      'FDA approval and Phase IV surveillance are the final steps.'
    ]
  },
  {
    id: 'c19',
    nodeId: 'c11_bt_cbse_381',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why is De Novo (Ab Initio) protein structure prediction (e.g. Rosetta, AlphaFold fold generation without template) computationally demanding compared to homology modeling?',
    options: [
      'It requires search through an astronomical conformational space (Levinthal\'s paradox) guided only by thermodynamic energy functions and deep learning priors.',
      'It requires physical synthesis of the peptide in a wet lab first.',
      'It can only calculate structures for proteins shorter than 5 amino acids.',
      'It relies exclusively on simple 2D drawing rules.'
    ],
    correctIndex: 0,
    explanation: 'De novo prediction searches a vast conformational landscape to find global minimum free energy states without relying on solved PDB structural templates.',
    hints: [
      'Think about Levinthal\'s paradox and structural search space.',
      'Without a known template, the algorithm must evaluate millions of conformational states.',
      'It uses physics-based energy functions or deep neural networks.'
    ]
  },
  {
    id: 'c20',
    nodeId: 'c11_bt_cbse_387',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'What chemical database query algorithm allows a computational chemist to find all compounds in a database containing a specific core active ring system (e.g. Indole ring)?',
    options: ['Exact Match Search', 'Substructure Search', 'Similarity Search using Tanimoto coefficient', 'Superstructure Search only'],
    correctIndex: 1,
    explanation: 'Substructure searching identifies molecules that contain a defined query fragment as a structural subgraph.',
    hints: [
      'The core ring is a component (sub-part) of the larger candidate molecule.',
      'It checks if the query graph is contained within target graphs.',
      'Substructure search.'
    ]
  },
  {
    id: 'c21',
    nodeId: 'c11_bt_cbse_393',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Understanding',
    question: 'Which specialized chemical/biomedical database links genetic variations (genomics) with individual drug response variations to optimize personalized medicine?',
    options: ['PharmGKB (Pharmacogenomics Knowledgebase)', 'BindingDB', 'NCI Open Database', 'ChemDB'],
    correctIndex: 0,
    explanation: 'PharmGKB is the primary pharmacogenomics database tracking gene variants, drug pathways, and clinical dosing guidelines.',
    hints: [
      'Look for the database that combines Pharmacogenetics and Genomics.',
      'The name starts with Pharm and ends with GKB.',
      'PharmGKB.'
    ]
  },
  {
    id: 'c22',
    nodeId: 'c11_bt_cbse_382',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Protein domain prediction resources like Pfam and SMART utilize Hidden Markov Models (HMMs) built from:',
    options: ['Single unaligned nucleotide sequences', 'Multiple sequence alignments (MSAs) of conserved functional domains', 'Randomly generated synthetic peptides', 'PDB text headers only'],
    correctIndex: 1,
    explanation: 'Pfam and SMART use profile HMMs generated from multiple sequence alignments to detect evolutionary conserved protein domains.',
    hints: [
      'Protein domains are evolutionarily conserved sequence blocks.',
      'Multiple sequences are aligned to capture position-specific amino acid frequencies.',
      'Profile HMMs are built from MSAs.'
    ]
  },
  {
    id: 'c23',
    nodeId: 'c11_bt_cbse_394',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'During a virtual screening workflow, why is a coarse rigid-body docking filter applied before full flexible ligand-receptor molecular dynamics docking?',
    options: [
      'Rigid docking is more accurate than flexible docking.',
      'Rigid docking quickly discards non-matching compounds with low computational cost, saving expensive calculations for top candidates.',
      'Flexible docking cannot process aromatic rings.',
      'Rigid docking automatically converts hits into SMILES format.'
    ],
    correctIndex: 1,
    explanation: 'Hierarchical virtual screening uses fast, low-cost filters early to reduce millions of compounds to hundreds before running computationally expensive flexible simulations.',
    hints: [
      'Screening millions of compounds with flexible docking would take years.',
      'Hierarchical filtering balances speed and precision.',
      'Fast simple filters come first; thorough complex calculations come last.'
    ]
  }
];

// ============================================================================
// SECTION 8: CUSTOM SVG DIAGRAM COMPONENTS
// ============================================================================

const ProteinStructurePipelineSVG = () => (
  <svg viewBox="0 0 800 220" className="w-full h-auto rounded-xl bg-slate-900/90 border border-slate-700/60 p-2 shadow-2xl">
    <defs>
      <linearGradient id="gradSeq" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="gradTemplate" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="gradModel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <text x="400" y="24" fill="#93c5fd" fontSize="16" fontWeight="bold" textAnchor="middle">
      Computational Protein Structure Prediction Pipeline
    </text>

    {/* Target Sequence Box */}
    <rect x="30" y="50" width="180" height="90" rx="10" fill="url(#gradSeq)" stroke="#93c5fd" strokeWidth="1.5" />
    <text x="120" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Target Sequence</text>
    <text x="120" y="100" fill="#bfdbfe" fontSize="11" textAnchor="middle">FASTA Amino Acids</text>
    <text x="120" y="120" fill="#93c5fd" fontSize="10" textAnchor="middle">e.g., MVLSEGEWQLVL...</text>

    {/* Arrow 1 */}
    <path d="M 210 95 L 260 95" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
    <text x="235" y="85" fill="#38bdf8" fontSize="10" textAnchor="middle">BLAST PDB</text>

    {/* Decision Node / Identity Check */}
    <polygon points="270,95 340,55 410,95 340,135" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
    <text x="340" y="90" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">% Identity?</text>
    <text x="340" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">to PDB Template</text>

    {/* Path > 30% : Homology */}
    <path d="M 340 55 L 340 38 L 470 38 L 470 65" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="3,3"/>
    <text x="405" y="32" fill="#34d399" fontSize="10" fontWeight="bold">&gt; 30% : Homology Modeling</text>

    {/* Path 15-30% : Threading */}
    <path d="M 410 95 L 470 95" stroke="#a78bfa" strokeWidth="2" />
    <text x="440" y="88" fill="#c4b5fd" fontSize="9" fontWeight="bold">15-30%</text>

    {/* Path < 15% : De Novo */}
    <path d="M 340 135 L 340 160 L 470 160 L 470 130" stroke="#f43f5e" strokeWidth="2" fill="none" strokeDasharray="3,3"/>
    <text x="405" y="175" fill="#fb7185" fontSize="10" fontWeight="bold">&lt; 15% : De Novo (Rosetta)</text>

    {/* Template / Method Box */}
    <rect x="470" y="50" width="160" height="90" rx="10" fill="url(#gradTemplate)" stroke="#c4b5fd" strokeWidth="1.5" />
    <text x="550" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Structural Alignment</text>
    <text x="550" y="100" fill="#ddd6fe" fontSize="11" textAnchor="middle">PDB Coordinates</text>
    <text x="550" y="120" fill="#c4b5fd" fontSize="10" textAnchor="middle">Loop &amp; Side-chain Modeling</text>

    {/* Arrow 2 */}
    <path d="M 630 95 L 670 95" stroke="#34d399" strokeWidth="3" />

    {/* Final 3D Structure Box */}
    <rect x="670" y="50" width="110" height="90" rx="10" fill="url(#gradModel)" stroke="#6ee7b7" strokeWidth="1.5" filter="url(#glow)"/>
    <text x="725" y="85" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">3D Structure</text>
    <text x="725" y="105" fill="#a7f3d0" fontSize="10" textAnchor="middle">Validated PDB</text>
    <text x="725" y="120" fill="#6ee7b7" fontSize="9" textAnchor="middle">SASA / RAMA</text>

    {/* Legend footer */}
    <rect x="150" y="190" width="500" height="22" rx="5" fill="#0f172a" stroke="#334155" />
    <text x="400" y="205" fill="#94a3b8" fontSize="10" textAnchor="middle">
      PDB Structural Databases: RCSB PDB, PDBe, PDBj | Tools: MODELLER, SWISS-MODEL, AlphaFold
    </text>
  </svg>
);

const LipinskiRo5MatrixSVG = () => (
  <svg viewBox="0 0 800 220" className="w-full h-auto rounded-xl bg-slate-900/90 border border-slate-700/60 p-2 shadow-2xl">
    <text x="400" y="24" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
      Lipinski's Rule of Five (RO5) Pharmacokinetic Rules
    </text>

    {/* Card 1: MW */}
    <g transform="translate(30, 45)">
      <rect width="170" height="135" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="85" cy="40" r="22" fill="#3b82f6" opacity="0.2"/>
      <text x="85" y="45" fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">MW</text>
      <text x="85" y="80" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">&le; 500 Da</text>
      <text x="85" y="102" fill="#94a3b8" fontSize="10" textAnchor="middle">Molecular Weight</text>
      <text x="85" y="118" fill="#64748b" fontSize="9" textAnchor="middle">Limits intestinal diffusion</text>
    </g>

    {/* Card 2: LogP */}
    <g transform="translate(220, 45)">
      <rect width="170" height="135" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
      <circle cx="85" cy="40" r="22" fill="#10b981" opacity="0.2"/>
      <text x="85" y="45" fill="#34d399" fontSize="16" fontWeight="bold" textAnchor="middle">LogP</text>
      <text x="85" y="80" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">&le; 5.0</text>
      <text x="85" y="102" fill="#94a3b8" fontSize="10" textAnchor="middle">Octanol-Water Partition</text>
      <text x="85" y="118" fill="#64748b" fontSize="9" textAnchor="middle">Balances lipophilicity</text>
    </g>

    {/* Card 3: HBD */}
    <g transform="translate(410, 45)">
      <rect width="170" height="135" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
      <circle cx="85" cy="40" r="22" fill="#f59e0b" opacity="0.2"/>
      <text x="85" y="45" fill="#fbbf24" fontSize="16" fontWeight="bold" textAnchor="middle">HBD</text>
      <text x="85" y="80" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">&le; 5</text>
      <text x="85" y="102" fill="#94a3b8" fontSize="10" textAnchor="middle">H-Bond Donors (OH, NH)</text>
      <text x="85" y="118" fill="#64748b" fontSize="9" textAnchor="middle">Prevents desolvation penalty</text>
    </g>

    {/* Card 4: HBA */}
    <g transform="translate(600, 45)">
      <rect width="170" height="135" rx="12" fill="#1e293b" stroke="#ec4899" strokeWidth="2"/>
      <circle cx="85" cy="40" r="22" fill="#ec4899" opacity="0.2"/>
      <text x="85" y="45" fill="#f472b6" fontSize="16" fontWeight="bold" textAnchor="middle">HBA</text>
      <text x="85" y="80" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">&le; 10</text>
      <text x="85" y="102" fill="#94a3b8" fontSize="10" textAnchor="middle">H-Bond Acceptors (N, O)</text>
      <text x="85" y="118" fill="#64748b" fontSize="9" textAnchor="middle">Enhances cell membrane passage</text>
    </g>

    <text x="400" y="202" fill="#cbd5e1" fontSize="11" textAnchor="middle">
      Note: Violating 1 rule is common in drugs; 2+ violations dramatically reduce oral bioavailability.
    </text>
  </svg>
);

const VirtualScreeningFunnelSVG = () => (
  <svg viewBox="0 0 800 220" className="w-full h-auto rounded-xl bg-slate-900/90 border border-slate-700/60 p-2 shadow-2xl">
    <text x="400" y="22" fill="#a78bfa" fontSize="16" fontWeight="bold" textAnchor="middle">
      High-Throughput Virtual Screening Funnel Architecture
    </text>

    {/* Funnel Shapes */}
    <polygon points="120,40 680,40 580,80 220,80" fill="#312e81" stroke="#6366f1" opacity="0.8"/>
    <text x="400" y="62" fill="#e0e7ff" fontSize="12" fontWeight="bold" textAnchor="middle">
      1. Virtual Chemical Library (1,000,000+ compounds from ZINC / PubChem)
    </text>

    <polygon points="220,85 580,85 500,125 300,125" fill="#1e1b4b" stroke="#818cf8" opacity="0.8"/>
    <text x="400" y="107" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
      2. Pharmacophore &amp; Lipinski RO5 Filter (~ 50,000 compounds)
    </text>

    <polygon points="300,130 500,130 440,170 360,170" fill="#4c1d95" stroke="#a78bfa" opacity="0.8"/>
    <text x="400" y="152" fill="#ddd6fe" fontSize="12" fontWeight="bold" textAnchor="middle">
      3. Molecular Docking &amp; Scoring (~ 1,000 candidates)
    </text>

    <rect x="360" y="175" width="80" height="35" rx="6" fill="#059669" stroke="#34d399" strokeWidth="1.5"/>
    <text x="400" y="196" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
      5-10 Hits
    </text>

    <path d="M 400 170 L 400 175" stroke="#34d399" strokeWidth="2"/>

    {/* Side annotations */}
    <text x="70" y="62" fill="#818cf8" fontSize="10" textAnchor="end">Low Cost / High Speed</text>
    <text x="70" y="152" fill="#a78bfa" fontSize="10" textAnchor="end">High Precision / MD Docking</text>
    <path d="M 80 50 L 80 160" stroke="#475569" strokeWidth="1" strokeDasharray="2,2"/>
  </svg>
);

// ============================================================================
// ANIMATED CANVAS COMPONENT FOR MOLECULAR SIMULATION
// ============================================================================
interface MolecularCanvasProps {
  hydrophobicity: number; // 0 to 100
  aliphaticIndex: number; // 50 to 150
  ro5Violations: number;
  mode: 'protein' | 'drug';
}

const MolecularCanvas: React.FC<MolecularCanvasProps> = ({ hydrophobicity, aliphaticIndex, ro5Violations, mode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;

    // Node definition for rendering interactive 3D particle mesh
    const numNodes = mode === 'protein' ? 24 : 14;
    const nodes = Array.from({ length: numNodes }, (_, i) => ({
      x: (Math.sin(i * 0.7) * 90),
      y: (Math.cos(i * 0.5) * 80),
      z: (Math.sin(i * 1.2) * 90),
      type: i % 3 === 0 ? 'hydrophobic' : (i % 3 === 1 ? 'charged' : 'polar')
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      angle += 0.015;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Hydrophobicity shifts node aggregation radius
      const foldRadiusFactor = mode === 'protein' ? (1 - (hydrophobicity / 200)) : 1.0;

      // Map transformed 3D points
      const transformed = nodes.map((n) => {
        const rx = (n.x * cosA - n.z * sinA) * foldRadiusFactor;
        const rz = (n.x * sinA + n.z * cosA) * foldRadiusFactor;
        const ry = n.y * foldRadiusFactor;
        const scale = 250 / (250 + rz);
        return {
          px: cx + rx * scale,
          py: cy + ry * scale,
          scale,
          type: n.type
        };
      });

      // Draw connections (Backbone or bonds)
      ctx.beginPath();
      for (let i = 0; i < transformed.length - 1; i++) {
        const p1 = transformed[i];
        const p2 = transformed[i + 1];
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
      }
      ctx.strokeStyle = mode === 'protein' ? '#38bdf8' : (ro5Violations > 1 ? '#f43f5e' : '#34d399');
      ctx.lineWidth = mode === 'protein' ? 3 : 4;
      ctx.stroke();

      // Draw atoms / residues
      transformed.forEach((p) => {
        ctx.beginPath();
        const r = (mode === 'protein' ? 8 : 10) * p.scale;
        ctx.arc(p.px, p.py, Math.max(2, r), 0, Math.PI * 2);

        if (mode === 'protein') {
          if (p.type === 'hydrophobic') ctx.fillStyle = '#f59e0b'; // Ala/Val/Leu
          else if (p.type === 'charged') ctx.fillStyle = '#ef4444'; // Arg/Lys/Asp
          else ctx.fillStyle = '#3b82f6';
        } else {
          // Drug mode coloration by RO5 validity
          ctx.fillStyle = ro5Violations === 0 ? '#10b981' : (ro5Violations === 1 ? '#f59e0b' : '#ef4444');
        }

        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Overlay text stats on canvas
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#94a3b8';
      if (mode === 'protein') {
        ctx.fillText(`Aliphatic Index: ${aliphaticIndex.toFixed(1)}`, 12, canvas.height - 24);
        ctx.fillText(`Conformation: ${hydrophobicity > 60 ? 'Compact Globular' : 'Extended / Soluble'}`, 12, canvas.height - 10);
      } else {
        ctx.fillText(`Lipinski Status: ${ro5Violations === 0 ? 'Pass (0 Fails)' : `${ro5Violations} Violation(s)`}`, 12, canvas.height - 10);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [hydrophobicity, aliphaticIndex, ro5Violations, mode]);

  return (
    <div className="relative w-full h-64 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} width={400} height={256} className="w-full h-full" />
      <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-[10px] text-gold-400 font-mono">
        3D Interactive Backbone View
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function C11_BiotechProteinInformaticsCBSESim() {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State - ProtParam (Lab 1)
  const [alaPercent, setAlaPercent] = useState<number>(25);
  const [basicRatio, setBasicRatio] = useState<number>(15);
  const [hydrophobicVal, setHydrophobicVal] = useState<number>(45);

  // Computed ProtParam values
  const computedPI = useMemo(() => (6.0 + (basicRatio - 15) * 0.18).toFixed(2), [basicRatio]);
  const computedInstability = useMemo(() => Math.max(10, 35 + (hydrophobicVal - 40) * 0.8 - (alaPercent - 20) * 0.4).toFixed(1), [hydrophobicVal, alaPercent]);
  const computedAliphaticIndex = useMemo(() => (alaPercent * 2.8 + hydrophobicVal * 0.9).toFixed(1), [alaPercent, hydrophobicVal]);
  const computedGRAVY = useMemo(() => ((hydrophobicVal - 40) * 0.04 - 0.2).toFixed(2), [hydrophobicVal]);

  // Interactive Lab State - Structure Pipeline (Lab 2)
  const [seqIdentity, setSeqIdentity] = useState<number>(45);
  const predictedMethod = useMemo(() => {
    if (seqIdentity >= 30) return { name: 'Homology (Comparative) Modeling', accuracy: 'High (0.5 - 1.5 Å RMSD)', software: 'MODELLER, SWISS-MODEL' };
    if (seqIdentity >= 15) return { name: 'Threading / Fold Recognition', accuracy: 'Moderate (2.0 - 3.5 Å RMSD)', software: 'Phyre2, I-TASSER' };
    return { name: 'De Novo / Ab Initio Prediction', accuracy: 'Variable (Deep Learning / Energy Min)', software: 'AlphaFold2, Rosetta' };
  }, [seqIdentity]);

  // Interactive Lab State - Lipinski RO5 (Lab 5 & Drug mode)
  const [mw, setMw] = useState<number>(420);
  const [logP, setLogP] = useState<number>(3.8);
  const [hbd, setHbd] = useState<number>(3);
  const [hba, setHba] = useState<number>(7);

  const ro5Violations = useMemo(() => {
    let count = 0;
    if (mw > 500) count++;
    if (logP > 5.0) count++;
    if (hbd > 5) count++;
    if (hba > 10) count++;
    return count;
  }, [mw, logP, hbd, hba]);

  // Interactive Virtual Screening Funnel State (Lab 4)
  const [screeningStage, setScreeningStage] = useState<number>(0);
  const [isScreeningActive, setIsScreeningActive] = useState<boolean>(false);

  // Selection state for Databases (Lab 3)
  const [selectedDb, setSelectedDb] = useState<'PDB' | 'PubChem' | 'ChEMBL' | 'DrugBank' | 'BindingDB'>('PDB');

  // Discovery Question State
  const [discAnswer, setDiscAnswer] = useState<number | null>(null);
  const [discSubmitted, setDiscSubmitted] = useState<boolean>(false);

  // Prediction Questions State
  const [predAnswers, setPredAnswers] = useState<(number | null)[]>([null, null]);
  const [predSubmitted, setPredSubmitted] = useState<boolean[]>([false, false]);

  // Observation Questions State
  const [obsAnswers, setObsAnswers] = useState<(number | null)[]>([null, null]);
  const [obsSubmitted, setObsSubmitted] = useState<boolean[]>([false, false]);

  // Challenge Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [dragOrder, setDragOrder] = useState<number[]>([0, 1, 2, 3, 4]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Score & Mastery Tracking State
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintIndex, setHintIndex] = useState<number>(0);

  // Engine Visuals State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Inactivity Auto-Hint Timer Ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // SRS & BKT Tracker States
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000); // 12 seconds inactivity hint
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIdx, resetInactivityTimer]);

  // Handle Tab Switching
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    setActiveTab(tab);
    audioManager.play('swoop');
    speechManager.speak(`Switched to ${tab} section`);
  };

  // Virtual Screening Simulation Step trigger
  const runVirtualScreeningStep = () => {
    setIsScreeningActive(true);
    audioManager.play('whoosh');
    if (screeningStage < 3) {
      setTimeout(() => {
        setScreeningStage(prev => prev + 1);
        setIsScreeningActive(false);
        audioManager.play('pop');
      }, 1200);
    } else {
      setScreeningStage(0);
      setIsScreeningActive(false);
    }
  };

  // Discovery Answer Submission
  const handleDiscoverySubmit = (idx: number) => {
    setDiscAnswer(idx);
    setDiscSubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct analysis! Bioavailability requires satisfying pharmacokinetic properties.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Review the hint regarding Lipinski criteria and target affinity.');
    }
  };

  // Current Challenge Object
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Answer Evaluation Logic
  const handleChallengeSubmit = () => {
    if (isSubmitted) return;

    let isCorrect = false;
    let userExplanation = '';

    if (currentChallenge.type === 'multiple-choice') {
      if (selectedOption === null) return;
      isCorrect = selectedOption === currentChallenge.correctIndex;
      userExplanation = currentChallenge.explanation;
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (isNaN(val)) return;
      const target = currentChallenge.correctAnswer ?? 0;
      const tol = currentChallenge.tolerance ?? 0;
      isCorrect = Math.abs(val - target) <= tol;
      userExplanation = currentChallenge.explanation;
    } else if (currentChallenge.type === 'drag-sort') {
      const targetOrder = currentChallenge.correctOrder ?? [];
      isCorrect = dragOrder.every((val, i) => val === targetOrder[i]);
      userExplanation = currentChallenge.explanation;
    }

    setIsSubmitted(true);

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const prevBKT = bktStates[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(prevBKT, isCorrect);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBKT }));

    const prevSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(prevSRS, isCorrect ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSuccess(true);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 2500);

      setScore(prev => prev + Math.max(10, 100 - hintsUsed * 20));
      setStreak(prev => prev + 1);
      setFeedback({ isCorrect: true, text: `Correct! ${userExplanation}` });
      speechManager.speak('Excellent scientific reasoning!');
    } else {
      audioManager.play('drop-wrong');
      setStreak(0);
      setFeedback({ isCorrect: false, text: `Incorrect. ${userExplanation}` });
      speechManager.speak('Let us analyze where the reasoning deviated.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      setSelectedOption(null);
      setNumericAnswer('');
      setDragOrder([0, 1, 2, 3, 4]);
      setIsSubmitted(false);
      setFeedback(null);
      setShowHint(false);
      setHintIndex(0);
      setHintsUsed(0);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      recordGameScore('c11_bt_cbse_protein_informatics', score);
      speechManager.speak(`Congratulations! You completed the lab with a score of ${score}`);
    }
  };

  // Request Hint
  const handleRequestHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
    audioManager.play('hint');
    if (hintIndex < currentChallenge.hints.length - 1) {
      setHintIndex(prev => prev + 1);
    }
  };

  // Drag-sort helper functions
  const moveSortItem = (fromIdx: number, toIdx: number) => {
    const newOrder = [...dragOrder];
    const [removed] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, removed);
    setDragOrder(newOrder);
    audioManager.play('tap');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 select-none">
      {/* Header Banner */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-gold-500/30">
            🧬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                ISC Class 11 Biotechnology
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                CBSE Core
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-300 mt-1">
              Protein &amp; Cheminformatics Simulation Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Primary Metrics, Structure Prediction Workflow, Molecular Graphs &amp; Lipinski RO5 Virtual Screening
            </p>
          </div>
        </div>

        {/* Score & Streak Counters */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center min-w-[90px]">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Score</div>
            <div className="text-xl font-extrabold text-gold-400">{score}</div>
          </div>
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center min-w-[90px]">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Streak</div>
            <div className="text-xl font-extrabold text-amber-400">{streak} 🔥</div>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <nav className="max-w-7xl mx-auto mb-6 flex rounded-xl bg-slate-900/90 p-1.5 border border-slate-800 shadow-xl overflow-x-auto">
        <button
          onClick={() => handleTabChange('discovery')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'discovery'
              ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>💡</span> 1. Discovery &amp; Scenario
        </button>
        <button
          onClick={() => handleTabChange('lab')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'lab'
              ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>🔬</span> 2. Interactive Simulation Lab
        </button>
        <button
          onClick={() => handleTabChange('challenges')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'challenges'
              ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>🎯</span> 3. Mastery Challenges ({currentChallengeIdx + 1}/{CHALLENGES.length})
        </button>
        <button
          onClick={() => handleTabChange('summary')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'summary'
              ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>📋</span> 4. Lab Summary &amp; Real World
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        {/* ================= TAB 1: DISCOVERY & SCENARIO ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed text-base mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-sm text-gold-200/90 leading-relaxed">
                <span className="font-semibold text-gold-400">Context: </span>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                  Discovery Question
                </span>
                <span className="text-xs text-slate-400">Node: c11_bt_cbse_398</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-800/60 border-slate-700 hover:border-gold-500/50 text-slate-200';
                  if (discSubmitted) {
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (idx === discAnswer) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    }
                  } else if (discAnswer === idx) {
                    btnStyle = 'bg-gold-950/60 border-gold-500 text-gold-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={discSubmitted}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`w-full p-4 rounded-xl border text-left transition-all text-sm leading-relaxed ${btnStyle}`}
                    >
                      <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {discSubmitted && (
                <div className="p-4 rounded-xl bg-gold-950/40 border border-gold-800/60 text-gold-200 text-sm leading-relaxed">
                  <span className="font-bold text-gold-300">Biotechnology Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-gold-400">Pre-Lab Prediction Hypotheses</h3>

              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono text-gold-400">Prediction #{pIdx + 1} ({pred.nodeId})</div>
                  <p className="text-sm font-medium text-slate-200">{pred.question}</p>

                  <div className="grid grid-cols-1 gap-2">
                    {pred.options.map((opt, oIdx) => {
                      const isSel = predAnswers[pIdx] === oIdx;
                      const isSub = predSubmitted[pIdx];
                      const isCorr = oIdx === pred.correctIndex;

                      let style = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';
                      if (isSub) {
                        if (isCorr) style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                        else if (isSel) style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else if (isSel) {
                        style = 'bg-gold-950/60 border-gold-500 text-gold-200';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSub}
                          onClick={() => {
                            const newAns = [...predAnswers];
                            newAns[pIdx] = oIdx;
                            setPredAnswers(newAns);
                            const newSub = [...predSubmitted];
                            newSub[pIdx] = true;
                            setPredSubmitted(newSub);
                            if (oIdx === pred.correctIndex) audioManager.play('success');
                            else audioManager.play('error');
                          }}
                          className={`p-3 rounded-lg border text-left text-xs transition-all ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {predSubmitted[pIdx] && (
                    <div className="text-xs text-slate-400 italic">
                      Verify instruction: {pred.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE SIMULATION LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Steps Header */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-gold-400 mb-3">Interactive Exploration Workstations</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="font-bold text-gold-300 mb-1">{step.title}</div>
                    <div className="text-slate-400 line-clamp-2">{step.instruction}</div>
                    <div className="text-[10px] text-slate-500 mt-2 font-mono">{step.nodeId}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* WORKSTATION 1: ProtParam & Physicochemical Calculator */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Workstation 1: ProtParam Physicochemical Analysis</h3>
                  <p className="text-xs text-slate-400">Simulate primary sequence parameters &amp; protein stability</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-gold-950 text-gold-400 border border-gold-800 mt-2 sm:mt-0">
                  Node: c11_bt_cbse_372 to c11_bt_cbse_376
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sliders panel */}
                <div className="lg:col-span-6 space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gold-300">Alanine Content (Ala %):</span>
                      <span className="text-gold-400">{alaPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="45"
                      value={alaPercent}
                      onChange={(e) => setAlaPercent(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Directly impacts the Aliphatic Index and thermal tolerance.</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gold-300">Basic Residues Ratio (Arg + Lys %):</span>
                      <span className="text-gold-400">{basicRatio}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={basicRatio}
                      onChange={(e) => setBasicRatio(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Shifts Isoelectric Point (pI) towards alkaline values.</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gold-300">Hydrophobic Content (Val + Leu + Ile %):</span>
                      <span className="text-gold-400">{hydrophobicVal}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="70"
                      value={hydrophobicVal}
                      onChange={(e) => setHydrophobicVal(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Controls GRAVY Score and membrane insertion potential.</p>
                  </div>
                </div>

                {/* Output Computed Parameters */}
                <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[11px] text-slate-400 font-mono">Isoelectric Point (pI)</div>
                      <div className="text-2xl font-black text-gold-400 mt-1">{computedPI}</div>
                      <div className="text-[10px] text-slate-500 mt-1">Charge = 0 at pH {computedPI}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[11px] text-slate-400 font-mono">Instability Index</div>
                      <div className={`text-2xl font-black mt-1 ${parseFloat(computedInstability) < 40 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {computedInstability}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {parseFloat(computedInstability) < 40 ? 'Stable in vitro (<40)' : 'Unstable in vitro (>40)'}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[11px] text-slate-400 font-mono">Aliphatic Index</div>
                      <div className="text-2xl font-black text-amber-400 mt-1">{computedAliphaticIndex}</div>
                      <div className="text-[10px] text-slate-500 mt-1">Thermal stability indicator</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[11px] text-slate-400 font-mono">GRAVY Score</div>
                      <div className={`text-2xl font-black mt-1 ${parseFloat(computedGRAVY) > 0 ? 'text-amber-400' : 'text-gold-400'}`}>
                        {computedGRAVY}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {parseFloat(computedGRAVY) > 0 ? 'Hydrophobic / Membrane' : 'Hydrophilic / Soluble'}
                      </div>
                    </div>
                  </div>

                  <MolecularCanvas
                    hydrophobicity={hydrophobicVal}
                    aliphaticIndex={parseFloat(computedAliphaticIndex)}
                    ro5Violations={0}
                    mode="protein"
                  />
                </div>
              </div>
            </div>

            {/* WORKSTATION 2: Structure Prediction Pipeline & SVG Diagram */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Workstation 2: Protein Structure Prediction Pipeline</h3>
                  <p className="text-xs text-slate-400">Homology Modeling vs Threading vs De Novo methodology router</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-gold-950 text-gold-400 border border-gold-800 mt-2 sm:mt-0">
                  Node: c11_bt_cbse_378 to c11_bt_cbse_381
                </span>
              </div>

              <ProteinStructurePipelineSVG />

              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-gold-300">Target-Template Sequence Identity:</span>
                    <span className="text-gold-400 font-bold text-sm">{seqIdentity}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={seqIdentity}
                    onChange={(e) => setSeqIdentity(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="text-slate-400">Recommended Method</div>
                    <div className="font-bold text-gold-300 text-sm mt-0.5">{predictedMethod.name}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Expected Model Accuracy</div>
                    <div className="font-bold text-emerald-400 text-sm mt-0.5">{predictedMethod.accuracy}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Standard Software Tools</div>
                    <div className="font-bold text-gold-300 text-sm mt-0.5">{predictedMethod.software}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* WORKSTATION 3: Lipinski Rule of Five & Drug Synthesis Simulator */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Workstation 3: Lipinski Rule of Five (RO5) Drug-Likeness Engine</h3>
                  <p className="text-xs text-slate-400">Evaluate small molecule oral bioavailability parameters</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 mt-2 sm:mt-0">
                  Node: c11_bt_cbse_398
                </span>
              </div>

              <LipinskiRo5MatrixSVG />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Molecular Weight (MW):</span>
                      <span className={mw <= 500 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{mw} Da</span>
                    </div>
                    <input
                      type="range"
                      min="150"
                      max="750"
                      value={mw}
                      onChange={(e) => setMw(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Partition Coefficient (LogP):</span>
                      <span className={logP <= 5.0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{logP}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="8.5"
                      step="0.1"
                      value={logP}
                      onChange={(e) => setLogP(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Hydrogen Bond Donors (HBD - OH, NH):</span>
                      <span className={hbd <= 5 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{hbd}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={hbd}
                      onChange={(e) => setHbd(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Hydrogen Bond Acceptors (HBA - N, O):</span>
                      <span className={hba <= 10 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{hba}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="18"
                      value={hba}
                      onChange={(e) => setHba(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className={`p-5 rounded-xl border ${ro5Violations === 0 ? 'bg-emerald-950/40 border-emerald-500' : (ro5Violations === 1 ? 'bg-amber-950/40 border-amber-500' : 'bg-rose-950/40 border-rose-500')}`}>
                    <div className="text-xs uppercase font-mono tracking-wider text-slate-300">Lipinski Compliance Result</div>
                    <div className="text-2xl font-black mt-2">
                      {ro5Violations === 0 && <span className="text-emerald-400">PASSED (0 Violations)</span>}
                      {ro5Violations === 1 && <span className="text-amber-400">ACCEPTED (1 Violation)</span>}
                      {ro5Violations >= 2 && <span className="text-rose-400">REJECTED ({ro5Violations} Violations)</span>}
                    </div>
                    <p className="text-xs text-slate-300 mt-2">
                      {ro5Violations === 0 && 'High predicted oral absorption and drug-likeness. Excellent drug candidate.'}
                      {ro5Violations === 1 && 'Acceptable candidate. Moderate lipophilicity or size penalty, but still drug-like.'}
                      {ro5Violations >= 2 && 'Poor oral bio-availability predicted. Requires structural optimization or non-oral route.'}
                    </p>
                  </div>

                  <MolecularCanvas
                    hydrophobicity={logP * 12}
                    aliphaticIndex={mw / 4}
                    ro5Violations={ro5Violations}
                    mode="drug"
                  />
                </div>
              </div>
            </div>

            {/* WORKSTATION 4: Virtual Screening Funnel Simulator */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Workstation 4: High-Throughput Virtual Screening Funnel</h3>
                  <p className="text-xs text-slate-400">Simulate hierarchical ligand filtering across massive chemical databases</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-950 text-purple-400 border border-purple-800 mt-2 sm:mt-0">
                  Node: c11_bt_cbse_394 &amp; c11_bt_cbse_395
                </span>
              </div>

              <VirtualScreeningFunnelSVG />

              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-purple-400">Current Funnel Stage</div>
                  <div className="text-lg font-bold text-slate-100">
                    {screeningStage === 0 && 'Stage 1: Raw Library Input (1,000,000 Compounds)'}
                    {screeningStage === 1 && 'Stage 2: Pharmacophore & RO5 Filtering (~50,000 Compounds)'}
                    {screeningStage === 2 && 'Stage 3: High-Precision Molecular Docking (~1,000 Compounds)'}
                    {screeningStage === 3 && 'Stage 4: ADMET Toxicity & Binding Free Energy Hits (5 Compounds)'}
                  </div>
                </div>

                <button
                  onClick={runVirtualScreeningStep}
                  disabled={isScreeningActive}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-500 hover:to-gold-500 text-white shadow-lg transition-all border border-purple-400/30 whitespace-nowrap"
                >
                  {isScreeningActive ? 'Executing Filter...' : (screeningStage === 3 ? 'Reset Screening' : 'Advance Screening Stage')}
                </button>
              </div>
            </div>

            {/* WORKSTATION 5: Cheminformatics Biological Database Explorer */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Workstation 5: Biological &amp; Chemical Database Explorer</h3>
                  <p className="text-xs text-slate-400">Query PDB, PubChem, ChEMBL, DrugBank, and BindingDB data models</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-gold-950 text-gold-400 border border-gold-800 mt-2 sm:mt-0">
                  Node: c11_bt_cbse_369 &amp; c11_bt_cbse_389
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['PDB', 'PubChem', 'ChEMBL', 'DrugBank', 'BindingDB'] as const).map(db => (
                  <button
                    key={db}
                    onClick={() => {
                      setSelectedDb(db);
                      audioManager.play('pop');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedDb === db
                        ? 'bg-gold-600 text-white border-gold-400 shadow-lg'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {db}
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-3">
                {selectedDb === 'PDB' && (
                  <div>
                    <div className="text-gold-400 font-bold text-sm mb-1">RCSB Protein Data Bank (PDB)</div>
                    <div className="text-slate-300">Format: ASCII Text Atomic Coordinates (.pdb format)</div>
                    <div className="text-slate-400 mt-2 text-[11px] leading-relaxed">
                      HEADER METABOLISM 12-FEB-21 6LU7<br/>
                      TITLE CRYSTAL STRUCTURE OF SARS-COV-2 MAIN PROTEASE IN COMPLEX WITH N3<br/>
                      ATOM 1 N SER A 1 29.541 12.330 9.441 1.00 32.14 N<br/>
                      ATOM 2 CA SER A 1 30.298 13.521 9.942 1.00 30.55 C
                    </div>
                  </div>
                )}
                {selectedDb === 'PubChem' && (
                  <div>
                    <div className="text-gold-400 font-bold text-sm mb-1">PubChem (NCBI / NIH)</div>
                    <div className="text-slate-300">Format: Chemical Graphs &amp; SMILES Notation</div>
                    <div className="text-slate-400 mt-2 text-[11px] leading-relaxed">
                      CID: 2244 (Aspirin)<br/>
                      SMILES: CC(=O)OC1=CC=CC=C1C(=O)O<br/>
                      InChIKey: BSYNRYMUTXBXSQ-UHFFFAOYSA-N<br/>
                      Biological Properties: Nonsteroidal Anti-inflammatory, COX-1/COX-2 inhibitor
                    </div>
                  </div>
                )}
                {selectedDb === 'ChEMBL' && (
                  <div>
                    <div className="text-gold-400 font-bold text-sm mb-1">ChEMBL Bioactivity Database (EMBL-EBI)</div>
                    <div className="text-slate-300">Format: Quantitative IC50, Ki, EC50 Assay Datasets</div>
                    <div className="text-slate-400 mt-2 text-[11px] leading-relaxed">
                      Target: Human Acetylcholinesterase (CHEMBL220)<br/>
                      Assay Type: Binding IC50 (nM)<br/>
                      Bioactivity Value: 4.2 nM (High potency)<br/>
                      Document Citation: J. Med. Chem. 2022, 65, 1420-1435
                    </div>
                  </div>
                )}
                {selectedDb === 'DrugBank' && (
                  <div>
                    <div className="text-gold-400 font-bold text-sm mb-1">DrugBank Knowledgebase</div>
                    <div className="text-slate-300">Format: Approved &amp; Experimental Drug Targets, ADMET, Pathways</div>
                    <div className="text-slate-400 mt-2 text-[11px] leading-relaxed">
                      Drug ID: DB00316 (Acetaminophen)<br/>
                      Mechanism of Action: Central prostaglandin synthesis inhibition<br/>
                      Half-life: 1-4 hours | Metabolism: Hepatic (CYP1A2/2E1)<br/>
                      Target Binding: Prostaglandin G/H synthase 2 (PTGS2)
                    </div>
                  </div>
                )}
                {selectedDb === 'BindingDB' && (
                  <div>
                    <div className="text-gold-400 font-bold text-sm mb-1">BindingDB Database</div>
                    <div className="text-slate-300">Format: Measured Binding Affinities (Kd, Ki, ΔG)</div>
                    <div className="text-slate-400 mt-2 text-[11px] leading-relaxed">
                      Target Protein: Kinase Domain (Abl1)<br/>
                      Ligand: Imatinib (Gleevec)<br/>
                      Binding Affinity Kd: 0.1 nM | Isothermal Titration Calorimetry (ITC)<br/>
                      Thermodynamic Delta G: -13.6 kcal/mol
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Observation Questions Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-gold-400">Post-Simulation Observation Verification</h3>

              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono text-gold-400">Observation Question #{oIdx + 1} ({obs.nodeId})</div>
                  <p className="text-sm font-medium text-slate-200">{obs.question}</p>

                  <div className="grid grid-cols-1 gap-2">
                    {obs.observableOptions.map((opt, optIdx) => {
                      const isSel = obsAnswers[oIdx] === optIdx;
                      const isSub = obsSubmitted[oIdx];
                      const isCorr = optIdx === obs.correctIndex;

                      let style = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';
                      if (isSub) {
                        if (isCorr) style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                        else if (isSel) style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else if (isSel) {
                        style = 'bg-gold-950/60 border-gold-500 text-gold-200';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSub}
                          onClick={() => {
                            const newAns = [...obsAnswers];
                            newAns[oIdx] = optIdx;
                            setObsAnswers(newAns);
                            const newSub = [...obsSubmitted];
                            newSub[oIdx] = true;
                            setObsSubmitted(newSub);
                            if (optIdx === obs.correctIndex) audioManager.play('success');
                            else audioManager.play('error');
                          }}
                          className={`p-3 rounded-lg border text-left text-xs transition-all ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: MASTERY CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Engine Container */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 relative">
              {/* Challenge Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    currentChallenge.difficulty === 'foundation'
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {currentChallenge.difficulty} Tier
                  </span>
                  <span className="text-xs text-slate-400">
                    Competency: <strong className="text-slate-200">{currentChallenge.competencyLevel}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-gold-400">
                  <span>Node: {currentChallenge.nodeId}</span>
                  <span className="text-slate-600">|</span>
                  <span>Mastery: {(masteryProb(bktStates[currentChallenge.nodeId]) * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Challenge Question Statement */}
              <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
                <span className="text-gold-400 font-bold mr-2">Q{currentChallengeIdx + 1}.</span>
                {currentChallenge.question}
              </div>

              {/* CHALLENGE TYPE 1: MULTIPLE CHOICE */}
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {currentChallenge.options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-950/60 border-slate-800 hover:border-gold-500/50 text-slate-200';
                    if (isSubmitted) {
                      if (idx === currentChallenge.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-gold-950/80 border-gold-500 text-gold-200';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => {
                          setSelectedOption(idx);
                          audioManager.play('tap');
                        }}
                        className={`w-full p-4 rounded-xl border text-left transition-all text-sm leading-relaxed ${btnStyle}`}
                      >
                        <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* CHALLENGE TYPE 2: NUMERIC INPUT */}
              {currentChallenge.type === 'numeric' && (
                <div className="space-y-4 max-w-md">
                  <label className="block text-xs font-semibold text-slate-400">Enter Numeric Answer:</label>
                  <input
                    type="number"
                    disabled={isSubmitted}
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(e.target.value)}
                    placeholder="e.g. 1"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-lg font-mono focus:border-gold-500 focus:outline-none"
                  />
                </div>
              )}

              {/* CHALLENGE TYPE 3: DRAG-SORT */}
              {currentChallenge.type === 'drag-sort' && currentChallenge.sortItems && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">Use buttons to reorder items into the correct sequence:</div>
                  {dragOrder.map((itemIdx, posIdx) => (
                    <div
                      key={posIdx}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-gold-950 border border-gold-700 text-gold-400 font-bold text-xs flex items-center justify-center">
                          {posIdx + 1}
                        </span>
                        <span>{currentChallenge.sortItems?.[itemIdx]}</span>
                      </div>

                      {!isSubmitted && (
                        <div className="flex gap-1">
                          <button
                            disabled={posIdx === 0}
                            onClick={() => moveSortItem(posIdx, posIdx - 1)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                          >
                            ▲
                          </button>
                          <button
                            disabled={posIdx === dragOrder.length - 1}
                            onClick={() => moveSortItem(posIdx, posIdx + 1)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                          >
                            ▼
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons: Submit / Next / Hint */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-5">
                <button
                  onClick={handleRequestHint}
                  disabled={isSubmitted}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5 disabled:opacity-40"
                >
                  <span>💡</span> Request Hint ({hintsUsed}/3)
                </button>

                {!isSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white shadow-lg shadow-gold-500/20 transition-all border border-gold-400/30"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition-all border border-emerald-400/30"
                  >
                    {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Simulation Lab'}
                  </button>
                )}
              </div>

              {/* Feedback Banner */}
              {feedback && (
                <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
                  feedback.isCorrect ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-rose-950/60 border-rose-500 text-rose-200'
                }`}>
                  <div className="font-bold mb-1">{feedback.isCorrect ? '✓ Excellent Analysis!' : '✗ Revision Needed'}</div>
                  <div>{feedback.text}</div>
                </div>
              )}

              {/* Hint Render Bubble */}
              {showHint && (
                <div className="mt-4">
                  <HintBubble text={currentChallenge.hints[hintIndex]} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SUMMARY & REAL WORLD ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  Industry Application
                </span>
                <h2 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 mt-4">
                <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Protocol Execution Steps:</div>
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-gold-950 border border-gold-800 text-gold-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Diagnostic Knowledge Base */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-gold-400">Diagnostic Assessment Review &amp; Concept Mastery</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                    <div className="font-semibold text-slate-200">{dq.question}</div>
                    <div className="text-emerald-400 font-bold">✓ Correct Answer: {dq.options[dq.correctIndex]}</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">{dq.explanation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Misconceptions Matrix */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-amber-400">Common Misconceptions &amp; Scientific Corrections</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                    <div className="font-bold text-slate-200 text-sm">{m.title}</div>
                    <div className="text-rose-400">⚠️ Misconception: {m.misconception}</div>
                    <div className="text-emerald-300 leading-relaxed">✓ Fact: {m.correction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}