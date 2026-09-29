'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-sort' | 'numeric' | 'match';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  dragItems?: { id: string; text: string; correctOrder: number }[];
  matchPairs?: { left: string; right: string }[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

export interface Misconception {
  id: number;
  title: string;
  misconception: string;
  correction: string;
  nodeId: string;
}

export interface DiagnosticQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

export interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

export interface Scenario {
  title: string;
  intro: string;
  context: string;
}

export interface DiscoveryQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  hintAfter: string;
}

// ==========================================
// ALL NODE IDS (47 Nodes)
// ==========================================

const ALL_NODE_IDS = [
  'c12_bt_cbse_267', 'c12_bt_cbse_268', 'c12_bt_cbse_269', 'c12_bt_cbse_270',
  'c12_bt_cbse_271', 'c12_bt_cbse_272', 'c12_bt_cbse_273', 'c12_bt_cbse_274',
  'c12_bt_cbse_275', 'c12_bt_cbse_276', 'c12_bt_cbse_277', 'c12_bt_cbse_278',
  'c12_bt_cbse_279', 'c12_bt_cbse_280', 'c12_bt_cbse_281', 'c12_bt_cbse_282',
  'c12_bt_cbse_283', 'c12_bt_cbse_284', 'c12_bt_cbse_285', 'c12_bt_cbse_286',
  'c12_bt_cbse_287', 'c12_bt_cbse_288', 'c12_bt_cbse_289', 'c12_bt_cbse_290',
  'c12_bt_cbse_291', 'c12_bt_cbse_292', 'c12_bt_cbse_293', 'c12_bt_cbse_294',
  'c12_bt_cbse_295', 'c12_bt_cbse_296', 'c12_bt_cbse_297', 'c12_bt_cbse_298',
  'c12_bt_cbse_299', 'c12_bt_cbse_300', 'c12_bt_cbse_301', 'c12_bt_cbse_302',
  'c12_bt_cbse_303', 'c12_bt_cbse_304', 'c12_bt_cbse_305', 'c12_bt_cbse_306',
  'c12_bt_cbse_307', 'c12_bt_cbse_308', 'c12_bt_cbse_309', 'c12_bt_cbse_310',
  'c12_bt_cbse_311', 'c12_bt_cbse_312', 'c12_bt_cbse_313',
];

// ==========================================
// MANDATORY SECTIONS
// ==========================================

const SCENARIO: Scenario = {
  title: 'Apex Molecular & Gene Cloning Research Suite',
  intro: 'Welcome to the Advanced Biotechnology Engineering Facility! You are leading a team of geneticists tasked with cloning a therapeutic human insulin gene, constructing genomic and cDNA libraries, performing PCR amplification, and selecting transformed recombinants using precision molecular tools.',
  context: 'You will master isolation of nucleic acids from bacterial, animal, and plant sources, engineer recombinant plasmids using restriction endonucleases and ligase, execute physical and biological DNA transfer methods, and verify success through PCR and blue-white colony screening.',
};

const DISCOVERY_QUESTION: DiscoveryQuestion = {
  question: 'If you want to clone human preproinsulin protein into Escherichia coli bacteria, why MUST you use a cDNA library or reverse-transcribed mRNA rather than directly isolating human genomic DNA?',
  options: [
    'Human genomic DNA contains introns which prokaryotes cannot splice out.',
    'Genomic DNA is double-stranded while cDNA is single-stranded.',
    'Bacteria destroy any foreign genomic DNA using restriction enzymes immediately.',
    'Genomic DNA does not contain an initiation codon (AUG) for bacterial translation.',
  ],
  correctIndex: 0,
  hintAfter: 'Prokaryotes like E. coli lack post-transcriptional RNA splicing machinery (spliceosomes). Mature processed mRNA (without introns) must be reverse-transcribed into cDNA using reverse transcriptase before insertion into bacterial expression vectors.',
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Restriction Cleavage & Ligation Engineering',
    instruction: 'Select restriction endonucleases (e.g., EcoRI, BamHI, HindIII) to cut plasmid vectors and foreign gene inserts, creating sticky or blunt ends. Then join them using DNA Ligase.',
    interactionType: 'enzyme-digestion-ligation',
    nodeId: 'c12_bt_cbse_297',
  },
  {
    title: 'Lab 2: Nucleic Acid Extraction & Phase Separation',
    instruction: 'Isolate DNA/RNA from bacteria, animal, or plant cells using CTAB, SDS, or GITC-phenol-chloroform buffers. Perform phase separation to separate aqueous nucleic acids from organic protein precipitates.',
    interactionType: 'phase-separation-extraction',
    nodeId: 'c12_bt_cbse_291',
  },
  {
    title: 'Lab 3: Artificial & Natural DNA Transfer Methods',
    instruction: 'Test DNA delivery into host cells using Biolistics (Gene Gun), Electroporation high-voltage pulses, Heat Shock (42°C with CaCl2), Lipofection, or Microinjection.',
    interactionType: 'gene-transfer-simulator',
    nodeId: 'c12_bt_cbse_267',
  },
  {
    title: 'Lab 4: Thermal Cycler PCR & Gel Electrophoresis',
    instruction: 'Configure PCR cycles (Denaturation 95°C, Annealing 55°C, Extension 72°C) with Taq/Pfu polymerases. Run agarose gel electrophoresis to analyze DNA fragment migrations.',
    interactionType: 'pcr-gel-electrophoresis',
    nodeId: 'c12_bt_cbse_279',
  },
  {
    title: 'Lab 5: Recombinant Screening & Selection (Blue-White & GFP)',
    instruction: 'Plate transformed bacteria on X-Gal + IPTG + Ampicillin media. Distinguish recombinants (white colonies due to lacZ insertional inactivation) from non-recombinants (blue colonies).',
    interactionType: 'screening-selection-plate',
    nodeId: 'c12_bt_cbse_271',
  },
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: What happens to a pUC19 plasmid when a target DNA fragment is successfully inserted into its Multiple Cloning Site (MCS) located inside the lacZ gene?',
    options: [
      'The plasmid confers resistance to ampicillin and turns colonies blue on X-Gal media.',
      'The lacZ gene undergoes insertional inactivation, leading to functional beta-galactosidase loss and WHITE colonies on X-Gal.',
      'The bacterial cell immediately undergoes apoptosis due to plasmid overload.',
      'The plasmid switches from double-stranded DNA to single-stranded RNA.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Navigate to Lab 5 (Blue-White Selection) and insert foreign DNA into the lacZ gene MCS to observe colony color changes on X-Gal plates.',
    nodeId: 'c12_bt_cbse_271',
  },
  {
    question: 'Predict: If you perform 30 cycles of PCR starting with a single double-stranded target DNA template, how many target DNA copies will theoretically be synthesized?',
    options: [
      '30 copies',
      '60 copies',
      '2^30 (approx 1.07 billion) copies',
      '30^2 (900) copies',
    ],
    correctIndex: 2,
    verifyInstruction: 'Run the Thermal Cycler in Lab 4 for 30 cycles and observe exponential amplification N = N0 * 2^n.',
    nodeId: 'c12_bt_cbse_279',
  },
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'In phenol-chloroform deproteinization of cell lysates, where do native DNA molecules accumulate after high-speed centrifugation?',
    observableOptions: [
      'At the bottom organic chloroform phase',
      'In the upper clear aqueous phase',
      'At the dense white interphase layer of denatured proteins',
      'Evaporated into the upper vapor chamber',
    ],
    correctIndex: 1,
    nodeId: 'c12_bt_cbse_293',
  },
  {
    question: 'During agarose gel electrophoresis of DNA fragments, which fragment size migrates fastest toward the positive anode (+)?',
    observableOptions: [
      'Largest DNA fragment (e.g., 10,000 bp)',
      'Medium DNA fragment (e.g., 5,000 bp)',
      'Smallest DNA fragment (e.g., 200 bp)',
      'All fragment sizes migrate at identical speeds regardless of molecular weight',
    ],
    correctIndex: 2,
    nodeId: 'c12_bt_cbse_279',
  },
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Diagnostic RT-qPCR Assay for SARS-CoV-2 Detection',
  description: 'Clinical bioscientists use Reverse Transcription Quantitative PCR (RT-qPCR) with fluorescent probes (or SYBR Green) to detect viral RNA in patient nasal swabs within hours.',
  steps: [
    'Step 1: Viral RNA Extraction using GITC-phenol-chloroform or magnetic silica beads to harvest pure SARS-CoV-2 genomic RNA.',
    'Step 2: Reverse Transcription (RT) converting viral RNA into complementary DNA (cDNA) using Reverse Transcriptase and specific primers.',
    'Step 3: Quantitative Real-Time PCR (qPCR) thermal cycling with Taq DNA polymerase and fluorescent dye tracking signal intensity per cycle.',
    'Step 4: Quantification & Ct Value Determination. A Threshold Cycle (Ct) < 35 confirms positive detection of viral gene targets (N1, N2, RdRp).',
  ],
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 1,
    title: 'Restriction Enzyme Source',
    misconception: 'Restriction endonucleases were artificially synthesized in chemical laboratories from scratch.',
    correction: 'Restriction enzymes are naturally occurring bacterial defense enzymes discovered in E. coli, EcoRI, HindIII, etc., evolved to cleavage invading bacteriophage viral DNA.',
    nodeId: 'c12_bt_cbse_295',
  },
  {
    id: 2,
    title: 'Genomic vs cDNA Library Introns',
    misconception: 'Genomic DNA libraries and cDNA libraries contain identical nucleotide sequences for a given organism.',
    correction: 'Genomic libraries contain introns, promoters, and non-coding regions. cDNA libraries are synthesized from mature spliced mRNA, containing ONLY exon coding sequences.',
    nodeId: 'c12_bt_cbse_278',
  },
  {
    id: 3,
    title: 'Blue vs White Colony Selection',
    misconception: 'Blue colonies on X-Gal media contain the recombinant plasmid with our target gene insert.',
    correction: 'White colonies contain the recombinant plasmid! Target DNA insertion disrupts the lacZ gene (insertional inactivation), preventing beta-galactosidase synthesis so X-Gal remains uncleaved (white).',
    nodeId: 'c12_bt_cbse_271',
  },
  {
    id: 4,
    title: 'Taq Polymerase Temperature Stability',
    misconception: 'Taq DNA Polymerase gets denatured and destroyed during the 95°C denaturation step of PCR.',
    correction: 'Taq polymerase isolated from thermophilic bacterium Thermus aquaticus remains stable and active even at 95°C temperatures.',
    nodeId: 'c12_bt_cbse_283',
  },
  {
    id: 5,
    title: 'Antibiotic Resistance Function',
    misconception: 'Ampicillin in agar plates forces bacteria to absorb foreign plasmid DNA.',
    correction: 'Ampicillin acts as a selective agent killing non-transformed bacteria that lack the ampicillin resistance gene (ampR) present on the vector.',
    nodeId: 'c12_bt_cbse_269',
  },
  {
    id: 6,
    title: 'Blunt Ends vs Sticky Ends Ligation',
    misconception: 'DNA Ligase can only join DNA fragments with complementary single-stranded overhangs (sticky ends).',
    correction: 'DNA Ligase (especially T4 DNA Ligase) can join both sticky ends and blunt ends, though blunt-end ligation requires higher enzyme concentrations and longer reaction times.',
    nodeId: 'c12_bt_cbse_298',
  },
];

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-1',
    nodeId: 'c12_bt_cbse_295',
    question: 'Which type of restriction endonuclease cleaves DNA at specific palindromic recognition sequences without requiring ATP for its cleavage activity?',
    options: ['Type I restriction enzyme', 'Type II restriction enzyme', 'Type III restriction enzyme', 'Exonuclease III'],
    correctIndex: 1,
    explanation: 'Type II restriction endonucleases cut DNA at specific palindromic recognition sites and require Mg2+ as a cofactor, without requiring ATP hydrolysis.',
  },
  {
    id: 'diag-2',
    nodeId: 'c12_bt_cbse_297',
    question: 'The recognition sequence for EcoRI is 5\'-GAATTC-3\'. Where does EcoRI introduce phosphodiester bond cleavage on both strands?',
    options: ['Between G and A', 'Between A and A', 'Between T and C', 'Between C and G'],
    correctIndex: 0,
    explanation: 'EcoRI cuts between G and A in 5\'-G^AATTC-3\', producing 5\' sticky overhangs (-AATT).',
  },
  {
    id: 'diag-3',
    nodeId: 'c12_bt_cbse_285',
    question: 'Which enzyme is used to remove 5\'-phosphate groups from linearized vector DNA to prevent self-ligation (re-circularization)?',
    options: ['Polynucleotide Kinase', 'Alkaline Phosphatase', 'Terminal Transferase', 'Reverse Transcriptase'],
    correctIndex: 1,
    explanation: 'Alkaline phosphatase catalyzes the removal of 5\'-phosphate groups from DNA ends, preventing self-ligation of empty vectors.',
  },
  {
    id: 'diag-4',
    nodeId: 'c12_bt_cbse_279',
    question: 'What is the correct chronological sequence of steps in one cycle of Polymerase Chain Reaction (PCR)?',
    options: [
      'Annealing -> Denaturation -> Extension',
      'Denaturation -> Annealing -> Extension',
      'Extension -> Denaturation -> Annealing',
      'Denaturation -> Extension -> Annealing',
    ],
    correctIndex: 1,
    explanation: 'A PCR cycle consists of 1. Denaturation (~95°C), 2. Primer Annealing (~55°C), and 3. Primer Extension (~72°C).',
  },
  {
    id: 'diag-5',
    nodeId: 'c12_bt_cbse_290',
    question: 'When extracting DNA from plant cells with rigid cell walls made of cellulose and pectin, which enzyme and reagent combination is essential?',
    options: [
      'Lysozyme and SDS',
      'Cellulase/Pectinase and CTAB (Cetyltrimethylammonium bromide)',
      'Chitinase and Chloroform',
      'Proteinase K and Ribonuclease A only',
    ],
    correctIndex: 1,
    explanation: 'Plant cell walls are degraded by cellulase/pectinase enzymes, while CTAB detergent solubilizes plant cell membranes and removes complex polysaccharides.',
  },
  {
    id: 'diag-6',
    nodeId: 'c12_bt_cbse_267',
    question: 'Which gene transfer method utilizes high-velocity microprojectiles coated with gold or tungsten particles to deliver DNA into plant cell walls?',
    options: ['Electroporation', 'Biolistics (Gene Gun)', 'Lipofection', 'Microinjection'],
    correctIndex: 1,
    explanation: 'Biolistics (Gene Gun) shoots microscopic gold or tungsten heavy-metal particles coated with recombinant DNA directly into target tissues.',
  },
  {
    id: 'diag-7',
    nodeId: 'c12_bt_cbse_274',
    question: 'In Southern Blotting, what type of biological molecule is transferred from agarose gel onto a nylon membrane for hybridization probe detection?',
    options: ['RNA molecules', 'Protein molecules', 'Single-stranded DNA fragments', 'Intact Bacterial Plasmids'],
    correctIndex: 2,
    explanation: 'Southern blotting transfers single-stranded DNA fragments to a membrane. Northern transfers RNA; Western transfers proteins.',
  },
  {
    id: 'diag-8',
    nodeId: 'c12_bt_cbse_287',
    question: 'Which enzyme synthesizes a single-stranded cDNA complementary strand from an isolated eukaryotic mRNA template during cDNA library preparation?',
    options: ['Taq Polymerase', 'DNA Ligase', 'Reverse Transcriptase', 'Terminal Transferase'],
    correctIndex: 2,
    explanation: 'Reverse transcriptase is an RNA-dependent DNA polymerase that synthesizes complementary DNA (cDNA) from an RNA template.',
  },
];

// ==========================================
// 22+ CHALLENGES ACROSS 3 TIERS
// ==========================================

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'chal-1',
    nodeId: 'c12_bt_cbse_295',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Recognition',
    question: 'Identify the bacterial strain from which the restriction endonuclease EcoRI was originally isolated.',
    options: ['Escherichia coli strain RY13', 'Haemophilus influenzae strain Rd', 'Bacillus amyloliquefaciens H', 'Thermus aquaticus'],
    correctIndex: 0,
    explanation: 'EcoRI is named after Escherichia coli (Eco), strain RY13 (R), and was the first (I) restriction enzyme isolated from this strain.',
    hints: [
      'Look at the prefix "Eco" in EcoRI.',
      'It comes from the enteric bacterium Escherichia coli.',
      'The strain designation is RY13.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-2',
    nodeId: 'c12_bt_cbse_297',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding Cleavage Patterns',
    question: 'What type of DNA terminals are produced when EcoRI cleaves the sequence 5\'-G^AATTC-3\'?',
    options: [
      'Blunt ends with no overhangs',
      'Sticky (cohesive) single-stranded 5\' overhangs',
      'Sticky single-stranded 3\' overhangs',
      'Circular covalent loops',
    ],
    correctIndex: 1,
    explanation: 'Staggered cleavage between G and A in 5\'-GAATTC-3\' generates 5\'-AATT overhangs known as sticky or cohesive ends.',
    hints: [
      'Does EcoRI cut right down the middle or in a staggered fashion?',
      'Staggered cuts produce unpaired single-stranded tails.',
      'The overhang has a free 5\' end: 5\'-AATT-3\'.',
    ],
  },
  {
    id: 'chal-3',
    nodeId: 'c12_bt_cbse_298',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Enzymatic Function',
    question: 'Which chemical bond is formed by DNA Ligase to seal nicked backbone strands during recombinant DNA construction?',
    options: ['Hydrogen bond', 'Phosphodiester bond', 'Glycosidic bond', 'Peptide bond'],
    correctIndex: 1,
    explanation: 'DNA Ligase catalyzes the formation of a phosphodiester bond between adjacent 3\'-hydroxyl and 5\'-phosphate termini in DNA.',
    hints: [
      'It connects the sugar-phosphate backbone of DNA.',
      'Phosphodiester bonds link nucleotides together.',
      'Hydrogen bonds occur between nitrogenous base pairs.',
    ],
  },
  {
    id: 'chal-4',
    nodeId: 'c12_bt_cbse_285',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Vector Modification',
    question: 'Why is vector DNA treated with Alkaline Phosphatase prior to ligation with insert DNA?',
    options: [
      'To accelerate the ligation reaction speed 100-fold',
      'To remove 5\'-phosphate groups and prevent vector self-ligation (re-circularization)',
      'To degrade un-cut vector molecules',
      'To insert poly-A tails at both termini',
    ],
    correctIndex: 1,
    explanation: 'Alkaline phosphatase removes 5\'-phosphate groups, ensuring the vector cannot self-ligate without an insert providing a phosphate group.',
    hints: [
      'Without insert, linearized plasmids often fold back and seal themselves.',
      'DNA ligase requires a 5\'-phosphate group to seal the nick.',
      'Removing 5\'-phosphate forces vector to stay open unless insert is present.',
    ],
  },
  {
    id: 'chal-5',
    nodeId: 'c12_bt_cbse_279',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'PCR Principles',
    question: 'What is the temperature range typically required for the Denaturation step in PCR?',
    options: ['50°C - 60°C', '70°C - 75°C', '94°C - 98°C', '37°C - 42°C'],
    correctIndex: 2,
    explanation: 'Denaturation requires high temperatures (94°C-98°C) to break hydrogen bonds between complementary strands, yielding single-stranded DNA.',
    hints: [
      'High heat is needed to melt double-stranded DNA.',
      'It is close to boiling point of water.',
      '94°C to 98°C is standard denaturation temperature.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'chal-6',
    nodeId: 'c12_bt_cbse_287',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Enzyme Mechanisms',
    question: 'Reverse Transcriptase is functionally classified as which type of enzyme?',
    options: [
      'DNA-dependent DNA Polymerase',
      'RNA-dependent DNA Polymerase',
      'DNA-dependent RNA Polymerase',
      'RNA-dependent RNA Polymerase',
    ],
    correctIndex: 1,
    explanation: 'Reverse transcriptase uses an RNA template to synthesize complementary single-stranded DNA (cDNA), making it an RNA-dependent DNA polymerase.',
    hints: [
      'What template does it read? RNA.',
      'What product does it synthesize? DNA.',
      'Therefore it is RNA-dependent DNA polymerase.',
    ],
  },
  {
    id: 'chal-7',
    nodeId: 'c12_bt_cbse_274',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Blotting Techniques',
    question: 'Which blotting procedure is specifically used to detect target RNA molecules using nucleic acid probes?',
    options: ['Southern Blotting', 'Northern Blotting', 'Western Blotting', 'Eastern Blotting'],
    correctIndex: 1,
    explanation: 'Northern blotting targets RNA, Southern blotting targets DNA, and Western blotting targets proteins (mnemonic: Snow Drop).',
    hints: [
      'Remember the SNOW DROP mnemonic:',
      'Southern = DNA, Northern = RNA, Western = Protein.',
      'Northern blotting detects RNA.',
    ],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'chal-8',
    nodeId: 'c12_bt_cbse_271',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Recombinant Selection Analysis',
    question: 'In blue-white selection using plasmid pUC19, why do recombinant colonies containing insert DNA appear WHITE on X-Gal agar plates?',
    options: [
      'The insert DNA activates the lacZ gene, producing excess beta-galactosidase.',
      'The insert DNA disrupts the lacZ alpha-peptide sequence (insertional inactivation), preventing functional beta-galactosidase formation.',
      'X-Gal is destroyed by ampicillin in recombinant bacteria.',
      'Recombinant cells cannot absorb X-Gal substrate from agar.',
    ],
    correctIndex: 1,
    explanation: 'Insertional inactivation of the lacZ gene prevents production of active beta-galactosidase; without enzyme activity, X-Gal is not cleaved into blue indigo dye, leaving colonies white.',
    hints: [
      'Inserting foreign DNA into lacZ disrupts its reading frame.',
      'No active enzyme means X-Gal substrate is not cleaved.',
      'Uncleaved X-Gal does not form blue dye, so colonies remain white.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'chal-9',
    nodeId: 'c12_bt_cbse_279',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Amplification',
    question: 'If a PCR reaction starts with 100 double-stranded template DNA molecules, calculate the total number of DNA molecules present after 5 complete cycles (assuming 100% efficiency).',
    correctAnswer: 3200,
    explanation: 'Amplification formula: N = N0 * (2^n) = 100 * (2^5) = 100 * 32 = 3200 molecules.',
    hints: [
      'Use formula N = N0 * 2^n.',
      'N0 = 100, n = 5.',
      '2^5 = 32. Multiply 100 * 32.',
    ],
  },
  {
    id: 'chal-10',
    nodeId: 'c12_bt_cbse_291',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Biochemical Isolation',
    question: 'During nucleic acid extraction using Phenol-Chloroform-Isoamyl Alcohol (25:24:1), what is the function of Isoamyl Alcohol?',
    options: [
      'To hydrolyze chromosomal DNA into small fragments',
      'To act as an anti-foaming agent and stabilize the interface between organic and aqueous phases',
      'To precipitate RNA selectively at -20°C',
      'To chelate divalent magnesium cations',
    ],
    correctIndex: 1,
    explanation: 'Isoamyl alcohol reduces foaming during vigorous shaking and ensures clear separation of aqueous and organic phases.',
    hints: [
      'Phenol/chloroform mixtures tend to foam when shaken.',
      'Isoamyl alcohol prevents foam.',
      'It sharpens the phase separation boundary.',
    ],
  },
  {
    id: 'chal-11',
    nodeId: 'c12_bt_cbse_278',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Library Comparison',
    question: 'Why is a cDNA library preferred over a genomic library when expressing eukaryotic human genes in bacterial cells?',
    options: [
      'cDNA libraries are larger and contain all promoter regions.',
      'cDNA is synthesized from mRNA and lacks non-coding intron sequences that bacteria cannot splice.',
      'Genomic DNA cannot be cut by restriction enzymes.',
      'Bacteria can only replicate cDNA plasmids, not genomic plasmids.',
    ],
    correctIndex: 1,
    explanation: 'Bacteria lack spliceosomes to remove introns from eukaryotic pre-mRNA. cDNA derived from processed eukaryotic mRNA contains only uninterrupted coding exons.',
    hints: [
      'Bacteria lack RNA splicing machinery.',
      'Genomic eukaryotic DNA contains non-coding introns.',
      'cDNA is built from spliced mRNA without introns.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'chal-12',
    nodeId: 'c12_bt_cbse_303',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Physical Transformation',
    question: 'In calcium chloride-mediated bacterial transformation, what role does the ice-chilled CaCl2 treatment play before heat shock?',
    options: [
      'It degrades the bacterial peptidoglycan wall completely.',
      'Ca2+ ions neutralize negative charges on both DNA phosphate backbone and cell membrane lipopolysaccharides.',
      'It activates bacterial DNA ligase.',
      'It denatures non-transformed bacterial cells.',
    ],
    correctIndex: 1,
    explanation: 'Divalent Ca2+ cations shield negative charges on DNA and cell surface, facilitating DNA binding to cell membrane pores prior to 42°C heat shock.',
    hints: [
      'DNA backbone and bacterial membrane both carry negative charges.',
      'Like charges repel each other.',
      'Divalent calcium (Ca2+) neutralizes these repelling charges.',
    ],
  },
  {
    id: 'chal-13',
    nodeId: 'c12_bt_cbse_283',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Polymerase Fidelity & Properties',
    question: 'Why is Pfu DNA Polymerase preferred over Taq DNA Polymerase for high-fidelity gene cloning PCR?',
    options: [
      'Pfu operates at 100°C while Taq denatures at 70°C.',
      'Pfu possesses 3\'->5\' exonuclease proofreading activity, giving it significantly lower mutation rates.',
      'Pfu does not require primer annealment.',
      'Pfu synthesizes DNA 10 times faster than Taq.',
    ],
    correctIndex: 1,
    explanation: 'Pfu DNA polymerase (from Pyrococcus furiosus) has 3\'->5\' exonuclease proofreading activity, correcting mismatched bases and ensuring high fidelity.',
    hints: [
      'Does Taq polymerase have proofreading activity? No.',
      'Proofreading requires 3\' to 5\' exonuclease capability.',
      'Pfu has proofreading activity to correct errors.',
    ],
  },
  {
    id: 'chal-14',
    nodeId: 'c12_bt_cbse_286',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Tail Engineering',
    question: 'Which enzyme synthesizes homopolymer tails (e.g., poly-dA or poly-dT) on 3\'-OH ends of blunt DNA fragments without requiring a template strand?',
    options: ['Terminal Transferase', 'Polynucleotide Kinase', 'Taq Polymerase', 'Reverse Transcriptase'],
    correctIndex: 0,
    explanation: 'Terminal Deoxynucleotidyl Transferase (TdT) adds deoxynucleotides to 3\'-hydroxyl ends of DNA in a template-independent manner.',
    hints: [
      'It operates at the terminal end of single or double-stranded DNA.',
      'It requires NO template strand.',
      'It is Terminal Transferase.',
    ],
  },
  {
    id: 'chal-15',
    nodeId: 'c12_bt_cbse_281',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Real-Time PCR Technology',
    question: 'How does SYBR Green I dye detect target DNA accumulation during Quantitative Real-Time PCR (qPCR)?',
    options: [
      'It binds specifically to single-stranded RNA molecules.',
      'It fluoresces intensely only upon intercalating into double-stranded DNA.',
      'It covalently binds to primers and emits light upon extension.',
      'It cleaves Taq polymerase to release fluorescent dyes.',
    ],
    correctIndex: 1,
    explanation: 'SYBR Green I intercalates into the minor groove of double-stranded DNA, emitting a strong green fluorescent signal proportional to dsDNA concentration.',
    hints: [
      'SYBR Green emits fluorescence when bound to DNA.',
      'Does it bind ssDNA or dsDNA?',
      'It intercalates specifically into double-stranded DNA.',
    ],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'chal-16',
    nodeId: 'c12_bt_cbse_296',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Sequence Analysis & Palindromes',
    question: 'Examine the double-stranded DNA sequences below. Which one represents a true 6-base pair restriction endonuclease palindromic recognition site?',
    options: [
      '5\'-G A A T T C-3\' / 3\'-C T T A A G-5\'',
      '5\'-G A T C A T-3\' / 3\'-C T A G T A-5\'',
      '5\'-A A A T T T-3\' / 3\'-T T T C C C-5\'',
      '5\'-G C T A C G-3\' / 3\'-C G A T G C-5\'',
    ],
    correctIndex: 0,
    explanation: '5\'-GAATTC-3\' read 5\' to 3\' on top strand is identical to 5\'-GAATTC-3\' read 5\' to 3\' on the complementary bottom strand (3\'-CTTAAG-5\').',
    hints: [
      'A restriction palindrome reads identical 5\'->3\' on top and 5\'->3\' on bottom.',
      'Top: 5\'-GAATTC-3\'. Bottom strand sequence 5\'->3\' is G-A-A-T-T-C.',
      'Option A is EcoRI recognition palindrome site.',
    ],
  },
  {
    id: 'chal-17',
    nodeId: 'c12_bt_cbse_270',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Dual Marker Selection Logic',
    question: 'Plasmid pBR322 carries ampR (ampicillin) and tetR (tetracycline) resistance genes. If foreign DNA is inserted into the BamHI site located INSIDE the tetR gene, what is the growth phenotype of transformed recombinant cells?',
    options: [
      'Ampicillin Resistant (AmpR) and Tetracycline Resistant (TetR)',
      'Ampicillin Resistant (AmpR) and Tetracycline Sensitive (TetS)',
      'Ampicillin Sensitive (AmpS) and Tetracycline Resistant (TetR)',
      'Ampicillin Sensitive (AmpS) and Tetracycline Sensitive (TetS)',
    ],
    correctIndex: 1,
    explanation: 'BamHI cuts inside tetR, causing insertional inactivation of tetracycline resistance. Transformed cells retain ampR (AmpR) but lose tetR function (TetS).',
    hints: [
      'Where is BamHI site located in pBR322? Inside tetR gene.',
      'Insertion inactivates tetR, making bacteria sensitive to tetracycline (TetS).',
      'ampR gene remains intact, conferring ampicillin resistance (AmpR).',
    ],
  },
  {
    id: 'chal-18',
    nodeId: 'c12_bt_cbse_282',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Diagnostic Workflow Optimization',
    question: 'Arrange the clinical laboratory workflow steps in correct chronological order for performing SARS-CoV-2 RT-qPCR diagnostic detection from a patient nasopharyngeal swab.',
    dragItems: [
      { id: 'step-1', text: 'Viral RNA extraction using GITC-phenol lysis buffer', correctOrder: 1 },
      { id: 'step-2', text: 'Reverse transcription of viral RNA to cDNA using Reverse Transcriptase', correctOrder: 2 },
      { id: 'step-3', text: 'Real-time qPCR amplification with target-specific primers & probes', correctOrder: 3 },
      { id: 'step-4', text: 'Fluorescence measurement and determination of Cycle Threshold (Ct)', correctOrder: 4 },
    ],
    explanation: 'Correct diagnostic order: 1. Extract pure viral RNA -> 2. Reverse transcribe RNA into cDNA -> 3. Amplify cDNA in real-time thermal cycler -> 4. Measure fluorescence and determine Ct value.',
    hints: [
      'Start with harvesting sample RNA from swab lysis.',
      'Convert RNA to cDNA before PCR amplification.',
      'Measure fluorescence output at the end to quantify Ct.',
    ],
  },
  {
    id: 'chal-19',
    nodeId: 'c12_bt_cbse_290',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'CTAB Isolation Mechanism',
    question: 'In CTAB nucleic acid extraction from recalcitrant plant tissues (e.g., leaves rich in polyphenols and polysaccharides), why is high salt (1.4 M NaCl) combined with CTAB at 65°C?',
    options: [
      'To denature Taq polymerase enzyme',
      'To keep polysaccharide-CTAB complexes soluble while solubilizing cell membranes and precipitating proteins',
      'To convert double-stranded DNA into cDNA',
      'To induce heat shock transformation',
    ],
    correctIndex: 1,
    explanation: 'CTAB binds polysaccharides and proteins. At high salt concentrations (>1.0 M NaCl), DNA remains soluble while polysaccharides form insoluble CTAB complexes, permitting clean separation.',
    hints: [
      'Plant cells contain high concentrations of sticky polysaccharides.',
      'High salt concentration keeps DNA soluble in aqueous phase.',
      'CTAB complexes polysaccharides allowing removal.',
    ],
  },
  {
    id: 'chal-20',
    nodeId: 'c12_bt_cbse_273',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Screening Marker Technologies',
    question: 'What major operational advantage does GFP (Green Fluorescent Protein) marker screening offer compared to traditional blue-white lacZ screening?',
    options: [
      'GFP requires expensive X-Gal chemical substrate addition and 48-hour incubation.',
      'GFP provides direct non-destructive visual screening under UV/blue light without needing exogenous chemical substrates like X-Gal.',
      'GFP inactivates antibiotic resistance genes.',
      'GFP converts bacterial cells into eukaryotic cells.',
    ],
    correctIndex: 1,
    explanation: 'GFP screening is non-destructive, vital, and real-time: live transformants fluoresce green under UV light without requiring addition or cleavage of expensive substrates like X-Gal.',
    hints: [
      'Does GFP require adding X-Gal or IPTG?',
      'GFP intrinsic chromophore fluoresces when illuminated by blue/UV light.',
      'It allows non-destructive screening of living cells.',
    ],
  },
  {
    id: 'chal-21',
    nodeId: 'c12_bt_cbse_285',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Kinase & Phosphatase Coupling',
    question: 'A scientist treats synthetic PCR primers with T4 Polynucleotide Kinase (PNK) before a ligation reaction. What chemical alteration does T4 PNK perform?',
    options: [
      'Removes 3\'-OH groups from DNA',
      'Transfers a gamma-phosphate from ATP to the 5\'-hydroxyl group of single or double-stranded DNA',
      'Cleaves internal phosphodiester bonds',
      'Synthesizes poly-A tails',
    ],
    correctIndex: 1,
    explanation: 'T4 Polynucleotide Kinase catalyzes the transfer of the gamma-phosphate of ATP to the 5\'-hydroxyl terminus of nucleic acids, enabling efficient ligation.',
    hints: [
      'Kinase enzymes add phosphate groups.',
      'Which end of DNA receives the phosphate? 5\'-hydroxyl end.',
      'It uses ATP as a phosphate donor.',
    ],
  },
  {
    id: 'chal-22',
    nodeId: 'c12_bt_cbse_308',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Biolistics Particle Acceleration',
    question: 'In Biolistic Gene Transfer (Gene Gun), why are gold or tungsten microparticles selected as target DNA microcarriers rather than iron or aluminium?',
    options: [
      'Gold and tungsten are chemically inert, high density, non-toxic to cells, and provide sufficient momentum to penetrate cell walls.',
      'Gold and tungsten fuse with plasmid DNA covalently.',
      'Gold and tungsten act as restriction enzymes inside target cells.',
      'Gold and tungsten dissolve immediately inside plant cytoplasm.',
    ],
    correctIndex: 0,
    explanation: 'Gold and tungsten have high density for kinetic velocity/momentum and are chemically inert and non-cytotoxic, making them ideal microcarriers for cell wall penetration.',
    hints: [
      'Think about density and chemical reactivity in biological cells.',
      'High density gives particles high momentum.',
      'Chemical inertness prevents cell toxicity.',
    ],
  },
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

const PlasmidVectorDiagram: React.FC<{
  insertSite?: string;
  hasInsert?: boolean;
}> = ({ insertSite = 'lacZ', hasInsert = false }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
        Plasmid Vector Map: pUC19 (2686 bp)
      </h4>
      <svg width="280" height="280" viewBox="0 0 300 300" className="drop-shadow-lg">
        {/* Outer Circular Plasmid Backbone */}
        <circle cx="150" cy="150" r="100" fill="none" stroke="#334155" strokeWidth="16" />
        
        {/* ori region */}
        <path
          d="M 150 50 A 100 100 0 0 1 240 100"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="16"
          strokeDasharray="4 2"
        />
        <text x="210" y="70" fill="#60a5fa" fontSize="11" fontWeight="bold">ori (Origin)</text>

        {/* ampR gene */}
        <path
          d="M 240 100 A 100 100 0 0 1 200 236"
          fill="none"
          stroke="#10b981"
          strokeWidth="16"
        />
        <text x="235" y="170" fill="#34d399" fontSize="11" fontWeight="bold">ampR</text>

        {/* lacZ gene & MCS */}
        <path
          d="M 200 236 A 100 100 0 0 1 60 200"
          fill="none"
          stroke={hasInsert ? "#ef4444" : "#8b5cf6"}
          strokeWidth="16"
        />
        <text x="110" y="245" fill={hasInsert ? "#f87171" : "#c084fc"} fontSize="11" fontWeight="bold">
          {hasInsert ? 'lacZ (Disrupted Insert)' : 'lacZ (MCS)'}
        </text>

        {/* Inserted Foreign Gene representation if present */}
        {hasInsert && (
          <circle cx="100" cy="220" r="12" fill="#ef4444" className="animate-pulse">
            <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Restriction Enzyme Sites markers */}
        <line x1="150" y1="50" x2="150" y2="30" stroke="#f59e0b" strokeWidth="2" />
        <text x="155" y="25" fill="#f59e0b" fontSize="10" fontWeight="bold">EcoRI</text>

        <line x1="100" y1="230" x2="80" y2="250" stroke="#ec4899" strokeWidth="2" />
        <text x="40" y="265" fill="#ec4899" fontSize="10" fontWeight="bold">BamHI / HindIII</text>

        {/* Center label */}
        <text x="150" y="145" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="extrabold">
          pUC19
        </text>
        <text x="150" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
          2686 bp | Circular dsDNA
        </text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-400">
        Status: <span className={hasInsert ? "text-red-400 font-bold" : "text-purple-400 font-bold"}>
          {hasInsert ? "Recombinant Plasmid (Insertional Inactivation)" : "Non-Recombinant Vector"}
        </span>
      </div>
    </div>
  );
};

const RestrictionCleavageDiagram: React.FC<{
  enzyme: string;
  isCut: boolean;
}> = ({ enzyme = 'EcoRI', isCut = false }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
        EcoRI Palindromic Recognition Cleavage (5'-G^AATTC-3')
      </h4>
      <svg width="340" height="160" viewBox="0 0 340 160" className="drop-shadow-md">
        {/* Background box */}
        <rect x="10" y="10" width="320" height="140" rx="8" fill="#1e293b" stroke="#334155" />

        {/* Uncut vs Cut Top Strand */}
        {!isCut ? (
          <g>
            {/* Top strand 5' -> 3' */}
            <text x="30" y="55" fill="#38bdf8" fontSize="14" fontFamily="monospace" fontWeight="bold">
              5'- G  A  A  T  T  C -3'
            </text>
            {/* Bottom strand 3' -> 5' */}
            <text x="30" y="95" fill="#38bdf8" fontSize="14" fontFamily="monospace" fontWeight="bold">
              3'- C  T  T  A  A  G -5'
            </text>

            {/* Scissors / Cleavage indicator */}
            <path d="M 62 40 L 62 65 L 175 65 L 175 110" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            <text x="90" y="80" fill="#f87171" fontSize="10" fontWeight="bold">EcoRI Cut Site</text>
          </g>
        ) : (
          <g className="animate-fadeIn">
            {/* Cut Top Left */}
            <text x="25" y="45" fill="#10b981" fontSize="14" fontFamily="monospace" fontWeight="bold">
              5'- G
            </text>
            <text x="25" y="85" fill="#10b981" fontSize="14" fontFamily="monospace" fontWeight="bold">
              3'- C  T  T  A  A
            </text>

            {/* Gap */}
            <line x1="120" y1="20" x2="120" y2="130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
            <text x="125" y="75" fill="#f59e0b" fontSize="10">Sticky End</text>

            {/* Cut Top Right */}
            <text x="190" y="45" fill="#34d399" fontSize="14" fontFamily="monospace" fontWeight="bold">
              A  A  T  T  C -3'
            </text>
            <text x="260" y="85" fill="#34d399" fontSize="14" fontFamily="monospace" fontWeight="bold">
              G -5'
            </text>
          </g>
        )}
      </svg>
      <div className="mt-2 text-xs text-slate-300">
        Recognition Sequence: <span className="font-mono text-gold-400 font-bold">5'-GAATTC-3'</span> | Overhang: <span className="font-mono text-emerald-400 font-bold">5'-AATT-3'</span>
      </div>
    </div>
  );
};

const ThermalCyclerDiagram: React.FC<{
  cycle: number;
  temp: number;
  phase: 'denaturation' | 'annealing' | 'extension';
}> = ({ cycle, temp, phase }) => {
  const getPhaseColor = () => {
    if (phase === 'denaturation') return '#ef4444'; // Red heat
    if (phase === 'annealing') return '#3b82f6'; // Blue cooling
    return '#10b981'; // Green synthesis
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
        PCR Thermal Cycler Profile (Cycle {cycle})
      </h4>
      <svg width="320" height="150" viewBox="0 0 320 150">
        {/* Temperature Axis */}
        <line x1="30" y1="20" x2="30" y2="130" stroke="#64748b" strokeWidth="2" />
        <line x1="30" y1="130" x2="300" y2="130" stroke="#64748b" strokeWidth="2" />

        <text x="10" y="30" fill="#94a3b8" fontSize="9">95°C</text>
        <text x="10" y="75" fill="#94a3b8" fontSize="9">72°C</text>
        <text x="10" y="115" fill="#94a3b8" fontSize="9">55°C</text>

        {/* Temperature curve profile */}
        <path
          d="M 30 30 L 100 30 L 130 115 L 200 115 L 230 75 L 290 75"
          fill="none"
          stroke="#475569"
          strokeWidth="3"
        />

        {/* Active Stage Indicator Dot */}
        {phase === 'denaturation' && (
          <circle cx="65" cy="30" r="7" fill={getPhaseColor()} className="animate-ping" />
        )}
        {phase === 'annealing' && (
          <circle cx="165" cy="115" r="7" fill={getPhaseColor()} className="animate-ping" />
        )}
        {phase === 'extension' && (
          <circle cx="260" cy="75" r="7" fill={getPhaseColor()} className="animate-ping" />
        )}

        {/* Labels */}
        <text x="45" y="20" fill="#f87171" fontSize="10" fontWeight="bold">1. Denaturation (95°C)</text>
        <text x="135" y="128" fill="#60a5fa" fontSize="10" fontWeight="bold">2. Annealing (55°C)</text>
        <text x="220" y="65" fill="#34d399" fontSize="10" fontWeight="bold">3. Extension (72°C)</text>
      </svg>
      <div className="mt-2 flex items-center justify-between w-full px-4 text-xs">
        <span className="text-slate-400">Current Temp: <strong className="text-amber-400">{temp}°C</strong></span>
        <span className="text-slate-400">Phase: <strong className="uppercase text-emerald-400">{phase}</strong></span>
        <span className="text-slate-400">Yield: <strong className="text-gold-400">{Math.pow(2, cycle)}x DNA</strong></span>
      </div>
    </div>
  );
};

const BlueWhitePlateDiagram: React.FC<{
  blueCount: number;
  whiteCount: number;
}> = ({ blueCount, whiteCount }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
        Agar Plate Colony Screening (X-Gal + IPTG + Ampicillin)
      </h4>
      <svg width="220" height="220" viewBox="0 0 220 220">
        {/* Petri Dish Outer & Inner Rim */}
        <circle cx="110" cy="110" r="100" fill="#0f172a" stroke="#475569" strokeWidth="6" />
        <circle cx="110" cy="110" r="94" fill="#1e293b" stroke="#334155" strokeWidth="2" />

        {/* Agar gel tint */}
        <circle cx="110" cy="110" r="92" fill="#312e81" fillOpacity="0.3" />

        {/* Non-recombinant Blue Colonies */}
        {Array.from({ length: blueCount }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / Math.max(1, blueCount) + 0.3;
          const r = 35 + (i % 3) * 18;
          const cx = 110 + r * Math.cos(angle);
          const cy = 110 + r * Math.sin(angle);
          return (
            <circle key={`blue-${i}`} cx={cx} cy={cy} r="7" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5">
              <title>Non-Recombinant Blue Colony (lacZ Intact)</title>
            </circle>
          );
        })}

        {/* Recombinant White Colonies */}
        {Array.from({ length: whiteCount }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / Math.max(1, whiteCount) + 1.2;
          const r = 40 + (i % 4) * 15;
          const cx = 110 + r * Math.cos(angle);
          const cy = 110 + r * Math.sin(angle);
          return (
            <circle key={`white-${i}`} cx={cx} cy={cy} r="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5">
              <title>Recombinant White Colony (Insertional Inactivation)</title>
            </circle>
          );
        })}
      </svg>
      <div className="mt-3 flex gap-4 text-xs font-semibold">
        <div className="flex items-center gap-1.5 text-gold-400">
          <span className="w-3 h-3 rounded-full bg-gold-600 inline-block border border-gold-300"></span>
          Blue (Non-Recombinants): {blueCount}
        </div>
        <div className="flex items-center gap-1.5 text-slate-200">
          <span className="w-3 h-3 rounded-full bg-slate-100 inline-block border border-slate-400"></span>
          White (Recombinants): {whiteCount}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================

export const C12_BiotechGeneCloningCBSESim: React.FC<SimProps> = ({ onComplete, initialNodeId }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);

  // Interactive Lab 1 State: Restriction Digest & Ligation
  const [selectedEnzyme, setSelectedEnzyme] = useState<string>('EcoRI');
  const [isDigested, setIsDigested] = useState<boolean>(false);
  const [isLigated, setIsLigated] = useState<boolean>(false);

  // Interactive Lab 2 State: Phase Separation & Extraction
  const [sampleType, setSampleType] = useState<'bacterial' | 'animal' | 'plant'>('bacterial');
  const [extractionBuffer, setExtractionBuffer] = useState<'SDS' | 'CTAB' | 'GITC'>('SDS');
  const [phaseSeparationStep, setPhaseSeparationStep] = useState<number>(0);

  // Interactive Lab 3 State: Artificial Gene Transfer
  const [transferMethod, setTransferMethod] = useState<'heatshock' | 'electroporation' | 'biolistics' | 'lipofection'>('heatshock');
  const [voltage, setVoltage] = useState<number>(1500); // Volts for electroporation
  const [geneGunPressure, setGeneGunPressure] = useState<number>(1100); // PSI
  const [transformationSuccess, setTransformationSuccess] = useState<boolean | null>(null);

  // Interactive Lab 4 State: Thermal Cycler & Electrophoresis
  const [pcrCycles, setPcrCycles] = useState<number>(1);
  const [pcrPhase, setPcrPhase] = useState<'denaturation' | 'annealing' | 'extension'>('denaturation');
  const [pcrTemp, setPcrTemp] = useState<number>(95);
  const [isPcrRunning, setIsPcrRunning] = useState<boolean>(false);

  // Interactive Lab 5 State: Blue-White Screening
  const [blueColonies, setBlueColonies] = useState<number>(12);
  const [whiteColonies, setWhiteColonies] = useState<number>(18);
  const [selectedColonyType, setSelectedColonyType] = useState<'blue' | 'white' | null>(null);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [dragSortedItems, setDragSortedItems] = useState<{ id: string; text: string; correctOrder: number }[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));

  // Audio / Speech / UX Feedback State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Adaptive BKT & SRS Stores
  const [bktStateMap, setBktStateMap] = useState<Record<string, BKTState>>(() => {
    const initialMap: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    return initialMap;
  });

  const [srsMap, setSrsMap] = useState<Record<string, SRSItem>>(() => {
    const initialMap: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createReviewItem(id);
    });
    return initialMap;
  });

  // Current Active Challenge
  const currentChallenge = useMemo(() => CHALLENGES[currentChallengeIndex], [currentChallengeIndex]);

  // Handle Drag-Sort initialization when challenge changes
  useEffect(() => {
    if (currentChallenge.type === 'drag-sort' && currentChallenge.dragItems) {
      const shuffled = [...currentChallenge.dragItems].sort(() => Math.random() - 0.5);
      setDragSortedItems(shuffled);
    }
  }, [currentChallengeIndex, currentChallenge]);

  // Reset inactivity timer for automatic hint pop-up after 10s inactivity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeCompleted[currentChallengeIndex]) {
        const hintText = currentChallenge.hints[0];
        setCurrentHint(hintText);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [activeTab, challengeCompleted, currentChallengeIndex, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Voice narration when entering tab
  useEffect(() => {
    if (activeTab === 'discovery') {
      speechManager.speak('Welcome to the Gene Cloning Exploration Suite. Answer the discovery prompt to unlock the lab interactive tools.');
    } else if (activeTab === 'lab') {
      speechManager.speak(`Entering ${EXPLORATION_STEPS[activeLabIndex].title}. Adjust the experimental variables to observe real-time molecular responses.`);
    } else if (activeTab === 'challenges') {
      speechManager.speak('Challenge Mode initiated. Apply your molecular biology skills to complete all 22 questions.');
    }
  }, [activeTab, activeLabIndex]);

  // Handlers for Discovery Tab
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct prediction! Prokaryotic bacterial cells cannot perform mRNA splicing to remove introns.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the structural differences between prokaryotic and eukaryotic RNA processing.');
    }
  };

  // Lab 1 Logic (Digestion & Ligation)
  const handleRunRestrictionDigest = () => {
    audioManager.play('whoosh');
    setIsDigested(true);
    setIsLigated(false);
    speechManager.speak(`Cleaved vector DNA with ${selectedEnzyme} restriction endonuclease. Cohesive sticky ends generated.`);
  };

  const handleRunLigation = () => {
    if (!isDigested) {
      audioManager.play('error');
      return;
    }
    audioManager.play('chime');
    setIsLigated(true);
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 2000);
    speechManager.speak('T4 DNA Ligase formed phosphodiester bonds to yield recombinant plasmid pUC19.');
  };

  // Lab 3 Logic (Gene Transfer)
  const handleRunGeneTransfer = () => {
    audioManager.play('pop');
    let success = false;
    if (transferMethod === 'electroporation') {
      success = voltage >= 1200 && voltage <= 1800;
    } else if (transferMethod === 'biolistics') {
      success = geneGunPressure >= 900 && geneGunPressure <= 1300;
    } else {
      success = true;
    }

    setTransformationSuccess(success);
    if (success) {
      audioManager.play('drop-correct');
      speechManager.speak('Gene transfer successful! Foreign DNA penetrated cellular membrane into cytoplasm.');
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Transfer failed due to sub-optimal voltage or pressure conditions.');
    }
  };

  // Lab 4 Logic (PCR Cycling Simulator)
  const handleStartPCR = () => {
    if (isPcrRunning) return;
    setIsPcrRunning(true);
    audioManager.play('whoosh');
    let currentC = 1;

    const cycleInterval = setInterval(() => {
      if (currentC > 5) {
        clearInterval(cycleInterval);
        setIsPcrRunning(false);
        audioManager.play('celebration');
        speechManager.speak('PCR Amplification complete. DNA yield expanded exponentially.');
        return;
      }

      // Step 1: Denaturation
      setPcrPhase('denaturation');
      setPcrTemp(95);
      audioManager.play('count');

      setTimeout(() => {
        // Step 2: Annealing
        setPcrPhase('annealing');
        setPcrTemp(55);
        audioManager.play('count');

        setTimeout(() => {
          // Step 3: Extension
          setPcrPhase('extension');
          setPcrTemp(72);
          setPcrCycles(currentC);
          audioManager.play('chime');
          currentC++;
        }, 800);
      }, 800);
    }, 2600);
  };

  // Handle Challenge Submission
  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    let isCorrect = false;

    if (currentChallenge.type === 'multiple-choice') {
      isCorrect = selectedOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const parsed = parseFloat(numericAnswer);
      isCorrect = parsed === Number(currentChallenge.correctAnswer);
    } else if (currentChallenge.type === 'drag-sort') {
      isCorrect = dragSortedItems.every((item, idx) => item.correctOrder === idx + 1);
    }

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const currentBKT = bktStateMap[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStateMap((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsMap[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setChallengeFeedback({ isCorrect: true, text: 'Correct! Excellent mastery of molecular cloning concepts.' });
      speechManager.speak('Correct! Well done.');

      const newCompleted = [...challengeCompleted];
      newCompleted[currentChallengeIndex] = true;
      setChallengeCompleted(newCompleted);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);

      // Check overall completion
      if (newCompleted.every(Boolean)) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        recordGameScore('C12_BiotechGeneCloningCBSESim', 100);
        if (onComplete) onComplete(100);
      }
    } else {
      audioManager.play('error');
      setChallengeFeedback({ isCorrect: false, text: `Incorrect. ${currentChallenge.explanation}` });
      speechManager.speak('Incorrect. Review the detailed explanation below.');
    }
  };

  // Move to Next Challenge
  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('tap');
    }
  };

  // Move to Previous Challenge
  const handlePrevChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    setShowHint(false);
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
      audioManager.play('tap');
    }
  };

  // Render Header Bar
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-black text-xl">
            🧬
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              {SCENARIO.title}
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                ISC Class 12 Biotechnology
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              47 Learning Nodes Covered | BKT Adaptive Engine Active
            </p>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('discovery');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discovery'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            1. Discovery Scenario
          </button>
          <button
            onClick={() => {
              setActiveTab('lab');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lab'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            2. Interactive Labs ({EXPLORATION_STEPS.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('challenges');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'challenges'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            3. Challenges ({challengeCompleted.filter(Boolean).length}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('summary');
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            4. Real-World & Misconceptions
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* TAB 1: DISCOVERY & PREDICTIONS */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Context & Scenario Intro */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                <span>🔬 Laboratory Briefing</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-200">Experimental Focus:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Initial Discovery Challenge
                </span>
                <span className="text-xs text-slate-400">Node: c12_bt_cbse_278</span>
              </div>
              <h3 className="text-base font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-xs font-medium transition-all border ${
                      discoverySelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md'
                          : 'bg-red-950/60 border-red-500 text-red-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-extrabold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed space-y-2 animate-fadeIn">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    💡 Key Molecular Discovery Insight
                  </div>
                  <p className="text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Prediction Questions Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🔮 Hypotheses & Lab Predictions</span>
                <span className="text-xs font-normal text-slate-400">(Verify these in Lab tab)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PREDICTION_QUESTIONS.map((pred, i) => (
                  <div key={i} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Prediction #{i + 1}</span>
                      <span className="text-xs text-slate-500">Node: {pred.nodeId}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 leading-relaxed">{pred.question}</p>
                    <div className="space-y-1.5">
                      {pred.options.map((opt, oIdx) => (
                        <div key={oIdx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${oIdx === pred.correctIndex ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-amber-400/90 italic bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10">
                      <strong>How to verify:</strong> {pred.verifyInstruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Lab Selector Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activeLabIndex === idx
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {EXPLORATION_STEPS[activeLabIndex].nodeId}
              </span>
            </div>

            {/* LAB 1: RESTRICTION DIGEST & LIGATION */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Digestion Controls</h4>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">Select Restriction Endonuclease:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['EcoRI', 'BamHI', 'HindIII'].map((enz) => (
                        <button
                          key={enz}
                          onClick={() => {
                            setSelectedEnzyme(enz);
                            setIsDigested(false);
                            setIsLigated(false);
                            audioManager.play('tap');
                          }}
                          className={`py-2 rounded-lg text-xs font-bold border ${
                            selectedEnzyme === enz
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {enz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleRunRestrictionDigest}
                      className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-all"
                    >
                      1. Cut DNA with {selectedEnzyme}
                    </button>
                    <button
                      onClick={handleRunLigation}
                      disabled={!isDigested}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold shadow-md transition-all ${
                        isDigested
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      2. Join with T4 DNA Ligase
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="text-slate-400">Digestion Status: <span className="text-amber-400 font-bold">{isDigested ? 'Cleaved (Sticky Ends Generated)' : 'Uncut Circular dsDNA'}</span></div>
                    <div className="text-slate-400">Ligation Status: <span className="text-emerald-400 font-bold">{isLigated ? 'Recombinant Vector Assembled' : 'Linearized Overhangs'}</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <RestrictionCleavageDiagram enzyme={selectedEnzyme} isCut={isDigested} />
                  <PlasmidVectorDiagram insertSite="lacZ" hasInsert={isLigated} />
                </div>
              </div>
            )}

            {/* LAB 2: PHASE SEPARATION & EXTRACTION */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Extraction Parameters</h4>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">Biological Cell Source:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['bacterial', 'animal', 'plant'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setSampleType(s);
                            audioManager.play('tap');
                          }}
                          className={`py-2 rounded-lg text-xs font-bold capitalize border ${
                            sampleType === s
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">Lysis Buffer Selection:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['SDS', 'CTAB', 'GITC'] as const).map((b) => (
                        <button
                          key={b}
                          onClick={() => {
                            setExtractionBuffer(b);
                            audioManager.play('tap');
                          }}
                          className={`py-2 rounded-lg text-xs font-bold border ${
                            extractionBuffer === b
                              ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {b} Buffer
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setPhaseSeparationStep((prev) => (prev + 1) % 4);
                        audioManager.play('whoosh');
                      }}
                      className="w-full py-3 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold shadow-md transition-all"
                    >
                      Advance Extraction Step (Current: Step {phaseSeparationStep + 1}/4)
                    </button>
                  </div>
                </div>

                {/* Phase Separation Visualizing Tube */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Centrifuge Phase Tube</h4>
                  
                  <div className="w-24 h-64 bg-slate-950 rounded-b-full border-2 border-slate-700 relative overflow-hidden flex flex-col justify-end p-1 shadow-inner">
                    {/* Aqueous Phase (Top) */}
                    <div className="w-full h-1/2 bg-gold-500/30 border-b border-gold-400/50 flex items-center justify-center text-[10px] text-gold-300 font-bold">
                      Aqueous (DNA/RNA)
                    </div>

                    {/* Interphase (Middle) */}
                    <div className="w-full h-4 bg-slate-200/40 border-y border-white/60 flex items-center justify-center text-[8px] text-white font-bold">
                      Protein Interphase
                    </div>

                    {/* Organic Phase (Bottom) */}
                    <div className="w-full h-1/2 bg-amber-900/50 flex items-center justify-center text-[10px] text-amber-300 font-bold">
                      Organic Phenol/Chloroform
                    </div>
                  </div>

                  <div className="text-center text-xs text-slate-300 max-w-xs space-y-1">
                    <div className="font-bold text-emerald-400">Step {phaseSeparationStep + 1}: {
                      phaseSeparationStep === 0 ? 'Cell Lysis & Enzymatic Digestion' :
                      phaseSeparationStep === 1 ? 'Phenol-Chloroform Deproteinization' :
                      phaseSeparationStep === 2 ? 'High-Speed Phase Centrifugation' : 'Isopropanol / Ethanol DNA Precipitation'
                    }</div>
                    <p className="text-[11px] text-slate-400">
                      {sampleType === 'plant' && extractionBuffer === 'CTAB' 
                        ? 'CTAB solubilizes plant polysaccharides in 1.4M NaCl.' 
                        : 'Anionic detergents strip lipid bilayers and denature proteins.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: ARTIFICIAL GENE TRANSFER */}
            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Gene Delivery Parameters</h4>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">Delivery Method:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['heatshock', 'electroporation', 'biolistics', 'lipofection'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => {
                            setTransferMethod(m);
                            setTransformationSuccess(null);
                            audioManager.play('tap');
                          }}
                          className={`py-2 rounded-lg text-xs font-bold capitalize border ${
                            transferMethod === m
                              ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {transferMethod === 'electroporation' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Electric Field Voltage:</span>
                        <strong className="text-gold-400">{voltage} V</strong>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="2500"
                        step="100"
                        value={voltage}
                        onChange={(e) => setVoltage(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-400">Optimal Range: 1200 V - 1800 V for transient pore formation.</p>
                    </div>
                  )}

                  {transferMethod === 'biolistics' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Helium Pressure:</span>
                        <strong className="text-amber-400">{geneGunPressure} PSI</strong>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="2000"
                        step="50"
                        value={geneGunPressure}
                        onChange={(e) => setGeneGunPressure(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-400">Optimal Range: 900 PSI - 1300 PSI to penetrate plant cell wall.</p>
                    </div>
                  )}

                  <button
                    onClick={handleRunGeneTransfer}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    Execute DNA Delivery Simulation
                  </button>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Host Cell Transfection Chamber</h4>

                  <div className="w-48 h-48 bg-slate-950 rounded-full border-4 border-slate-700 flex items-center justify-center relative shadow-inner">
                    {/* Cellular Nucleus */}
                    <div className="w-20 h-20 rounded-full bg-emerald-900/40 border border-emerald-500/50 flex items-center justify-center text-[10px] font-bold text-emerald-300">
                      Nucleus
                    </div>

                    {/* Incoming Plasmids */}
                    {transformationSuccess === true && (
                      <div className="absolute inset-0 flex items-center justify-center animate-ping">
                        <div className="w-32 h-32 rounded-full border-2 border-emerald-400"></div>
                      </div>
                    )}
                  </div>

                  {transformationSuccess !== null && (
                    <div className={`text-xs font-bold p-3 rounded-xl border text-center ${
                      transformationSuccess
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-red-950/80 border-red-500 text-red-300'
                    }`}>
                      {transformationSuccess ? '✔ Transformation Successful! DNA integrated.' : '✘ Transformation Failed! Adjust parameters.'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LAB 4: THERMAL CYCLER PCR & GEL */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ThermalCyclerDiagram cycle={pcrCycles} temp={pcrTemp} phase={pcrPhase} />

                  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <button
                      onClick={handleStartPCR}
                      disabled={isPcrRunning}
                      className={`w-full py-3 rounded-xl text-xs font-bold shadow-md transition-all ${
                        isPcrRunning
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-gold-600 hover:bg-gold-500 text-white'
                      }`}
                    >
                      {isPcrRunning ? 'Cycling Thermal Block (5 Cycles)...' : 'Run Thermal Cycler Amplification'}
                    </button>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Total Cycles</div>
                        <div className="text-gold-400 font-extrabold text-sm">{pcrCycles}</div>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Amplification</div>
                        <div className="text-emerald-400 font-extrabold text-sm">{Math.pow(2, pcrCycles)}x</div>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Polymerase</div>
                        <div className="text-amber-400 font-extrabold text-xs">Taq / Pfu</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gel Electrophoresis Tank Representation */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                    Agarose Gel Electrophoresis Band Migration
                  </h4>

                  <div className="w-full h-56 bg-slate-950 rounded-xl border border-slate-800 p-4 relative flex flex-col justify-between">
                    {/* Negative Cathode (-) Top */}
                    <div className="flex justify-between items-center text-[10px] text-red-400 font-bold border-b border-slate-800 pb-1">
                      <span>Cathode (-) Wells</span>
                      <span>DNA Loading Buffer</span>
                    </div>

                    {/* Gel Wells and Migrated Bands */}
                    <div className="flex-1 relative my-2 bg-slate-900/40 rounded-lg border border-slate-800/60 p-2">
                      {/* Lane 1: Ladder */}
                      <div className="absolute left-6 top-0 bottom-0 w-8 border-r border-slate-800 flex flex-col justify-around items-center">
                        <div className="w-6 h-1 bg-gold-400 rounded-full opacity-90"></div>
                        <div className="w-6 h-1 bg-gold-400 rounded-full opacity-70"></div>
                        <div className="w-6 h-1 bg-gold-400 rounded-full opacity-50"></div>
                      </div>

                      {/* Lane 2: PCR Product */}
                      <div className="absolute left-28 top-0 bottom-0 w-8 flex flex-col justify-center items-center">
                        <div
                          className="w-7 h-1.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50 transition-all duration-700"
                          style={{ transform: `translateY(${(pcrCycles - 1) * 8}px)` }}
                        ></div>
                      </div>
                    </div>

                    {/* Positive Anode (+) Bottom */}
                    <div className="flex justify-between items-center text-[10px] text-emerald-400 font-bold border-t border-slate-800 pt-1">
                      <span>Anode (+) Direction</span>
                      <span>Run Time: 45 min</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Smaller DNA fragments migrate faster toward positive anode (+) through agarose matrix pores.
                  </p>
                </div>
              </div>
            )}

            {/* LAB 5: BLUE-WHITE SCREENING & SELECTION */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <BlueWhitePlateDiagram blueCount={blueColonies} whiteCount={whiteColonies} />
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Colony Selection Analysis</h4>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setSelectedColonyType('blue');
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl text-left border ${
                        selectedColonyType === 'blue'
                          ? 'bg-gold-950/60 border-gold-500 text-gold-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs text-gold-400 mb-1">Inspect Blue Colony</div>
                      <div className="text-[11px] text-slate-400">Non-Recombinant Vector</div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedColonyType('white');
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl text-left border ${
                        selectedColonyType === 'white'
                          ? 'bg-slate-800 border-white text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-200 mb-1">Inspect White Colony</div>
                      <div className="text-[11px] text-slate-400">Recombinant Re-engineered</div>
                    </button>
                  </div>

                  {selectedColonyType && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 animate-fadeIn">
                      <div className="font-bold text-emerald-400">
                        {selectedColonyType === 'white'
                          ? '✅ Recombinant Colony Identified!'
                          : 'ℹ Non-Recombinant Vector Colony'}
                      </div>
                      <p className="text-slate-300">
                        {selectedColonyType === 'white'
                          ? 'Foreign DNA insert interrupted the lacZ gene (Insertional Inactivation). Beta-galactosidase is not synthesized; X-Gal remains uncleaved so the colony is WHITE.'
                          : 'The lacZ gene remains intact and expresses active beta-galactosidase enzyme, which cleaves X-Gal substrate into a dark blue indigo dye.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Observation Questions Section */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">👁 Key Lab Observations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((obs, idx) => (
                  <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Observation #{idx + 1}</span>
                    <p className="text-xs font-semibold text-slate-200">{obs.question}</p>
                    <div className="space-y-1.5">
                      {obs.observableOptions.map((opt, oIdx) => (
                        <div key={oIdx} className={`p-2.5 rounded-lg text-[11px] border ${
                          oIdx === obs.correctIndex
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 22+ ADAPTIVE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Progress Header & Adaptive Status */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-sm font-bold text-white capitalize">
                  [{currentChallenge.difficulty}] Tier — {currentChallenge.competencyLevel}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">Node: {currentChallenge.nodeId}</span>
                <button
                  onClick={handlePrevChallenge}
                  disabled={currentChallengeIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white transition-all"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextChallenge}
                  disabled={currentChallengeIndex === CHALLENGES.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs font-bold text-white transition-all"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h2 className="text-base font-bold text-white leading-relaxed">{currentChallenge.question}</h2>

              {/* Multiple Choice UI */}
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {currentChallenge.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setSelectedOption(oIdx);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl text-left text-xs font-medium transition-all border ${
                        selectedOption === oIdx
                          ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Answer UI */}
              {currentChallenge.type === 'numeric' && (
                <div className="space-y-3">
                  <input
                    type="number"
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(e.target.value)}
                    placeholder="Enter calculated numerical answer..."
                    className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-emerald-500 outline-none"
                  />
                </div>
              )}

              {/* Drag-Sort UI */}
              {currentChallenge.type === 'drag-sort' && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400 italic mb-2">Drag or reorder items into the correct chronological sequence:</p>
                  {dragSortedItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="font-bold text-emerald-400 mr-2">{idx + 1}.</span>
                      <span className="flex-1">{item.text}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            if (idx > 0) {
                              const copy = [...dragSortedItems];
                              const temp = copy[idx];
                              copy[idx] = copy[idx - 1];
                              copy[idx - 1] = temp;
                              setDragSortedItems(copy);
                              audioManager.play('tap');
                            }
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => {
                            if (idx < dragSortedItems.length - 1) {
                              const copy = [...dragSortedItems];
                              const temp = copy[idx];
                              copy[idx] = copy[idx + 1];
                              copy[idx + 1] = temp;
                              setDragSortedItems(copy);
                              audioManager.play('tap');
                            }
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    const h = currentChallenge.hints[0];
                    setCurrentHint(h);
                    setShowHint((prev) => !prev);
                    audioManager.play('hint');
                  }}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                >
                  💡 Need Hint?
                </button>

                <button
                  onClick={handleChallengeSubmit}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg transition-all"
                >
                  Submit & Verify Answer
                </button>
              </div>

              {/* Feedback Display */}
              {challengeFeedback && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="font-bold mb-1">{challengeFeedback.isCorrect ? '✅ Verified Correct!' : '❌ Incorrect'}</div>
                  <div>{challengeFeedback.text}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: REAL-WORLD APPLICATION & MISCONCEPTIONS */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Real World Activity Section */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-gold-950/50 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-xs uppercase tracking-wider">
                <span>🏥 Clinical Industry Application</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-gold-400">Step {idx + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Misconceptions Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">⚠️ Key Misconceptions & Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">{m.title}</span>
                    <div className="text-xs font-semibold text-red-300/90 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                      <strong>Misconception:</strong> {m.misconception}
                    </div>
                    <div className="text-xs font-medium text-emerald-300 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                      <strong>Scientific Correction:</strong> {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Questions Review */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white">📋 Diagnostic Knowledge Review</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span className="font-bold text-emerald-400">Diagnostic #{dq.id}</span>
                      <span className="font-mono text-slate-500">{dq.nodeId}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">{dq.question}</p>
                    <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <strong className="text-emerald-400">Correct Answer:</strong> {dq.options[dq.correctIndex]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating UX Feedback Components */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Achieved! All 22 Biotechnology Challenges Completed." />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C12_BiotechGeneCloningCBSESim;