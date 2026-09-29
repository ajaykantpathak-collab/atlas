'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES AND INTERFACES
// ==========================================

interface DefaultProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

interface Misconception {
  id: string;
  statement: string;
  correction: string;
  explanation: string;
}

interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

interface DiagnosticQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-sort' | 'numeric' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  matchingPairs?: Array<{ item: string; target: string }>;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface BKTStateMap {
  [nodeId: string]: {
    pKnown: number;
    pTransit: number;
    pSlip: number;
    pGuess: number;
  };
}

interface SRSStateMap {
  [nodeId: string]: import('../../../lib/srs').ReviewItem;
}

// ==========================================
// CONSTANTS AND NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c12_bio_cbse_385',
  'c12_bio_cbse_386',
  'c12_bio_cbse_387',
  'c12_bio_cbse_388',
  'c12_bio_cbse_389',
  'c12_bio_cbse_390',
  'c12_bio_cbse_391',
  'c12_bio_cbse_392',
  'c12_bio_cbse_393',
  'c12_bio_cbse_394',
  'c12_bio_cbse_395',
  'c12_bio_cbse_396',
  'c12_bio_cbse_397',
  'c12_bio_cbse_398',
  'c12_bio_cbse_399',
  'c12_bio_cbse_400',
  'c12_bio_cbse_401',
  'c12_bio_cbse_402',
  'c12_bio_cbse_403',
  'c12_bio_cbse_404',
  'c12_bio_cbse_405',
] as const;

// Section 1: SCENARIO
const SCENARIO = {
  title: 'Molecular Genetics & Central Dogma Virtual Institute',
  intro: 'Welcome to the Advanced Molecular Biology Research Facility. As chief molecular geneticist, you will manipulate double-stranded DNA, run semiconservative replication centrifugations, execute transcription and translation, decipher lac operon dynamics, and analyze DNA fingerprints.',
  context: 'From nitrogenous bases to gene expression regulation, investigate how genetic information is encoded, replicated, transcribed, translated, and analyzed in biological systems.',
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'If a double-stranded DNA molecule contains 20% Cytosine, what percentage of its bases will be Thymine, and why does Uracil replace Thymine in RNA?',
  options: [
    '30% Thymine; Uracil requires less energy to synthesize and lacks a 5-methyl group.',
    '20% Thymine; Uracil binds to Guanine instead of Adenine.',
    '40% Thymine; Uracil forms triple hydrogen bonds with Adenine.',
    '10% Thymine; Uracil is more resistant to oxidative degradation than Thymine.',
  ],
  correctIndex: 0,
  hintAfter: 'Chargaff\'s rule states %A = %T and %G = %C. If %C = 20%, then %G = 20%, leaving 60% for A+T (30% A and 30% T). Uracil lacks the methyl group present at position 5 in Thymine.',
};

// Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: DNA Double Helix Structure & Packaging',
    instruction: 'Adjust helical parameters, base pair ratios, and histone octamer winding (N-tail acetylation) to observe nucleosome packing.',
    interactionType: 'dna-structure-builder',
    nodeId: 'c12_bio_cbse_387',
  },
  {
    title: 'Lab 2: Meselson-Stahl Density Centrifugation',
    instruction: 'Simulate 15N to 14N isotopic medium transfer over multiple generations and observe CsCl density gradient equilibrium bands.',
    interactionType: 'meselson-stahl-sim',
    nodeId: 'c12_bio_cbse_402',
  },
  {
    title: 'Lab 3: Transcription & Intron Splicing Engine',
    instruction: 'Select promoter regions, initiate RNA Polymerase II, synthesize pre-mRNA, and observe spliceosome snRNP intron removal and 5\' capping/3\' poly-A tailing.',
    interactionType: 'transcription-splicer',
    nodeId: 'c12_bio_cbse_393',
  },
  {
    title: 'Lab 4: Translation & Genetic Code Workbench',
    instruction: 'Load mRNA sequences into the ribosome A, P, and E sites. Match aminoacyl-tRNA anticodons to codons and observe peptide bond formation.',
    interactionType: 'translation-lab',
    nodeId: 'c12_bio_cbse_396',
  },
  {
    title: 'Lab 5: Prokaryotic Lac Operon Regulatory Workbench',
    instruction: 'Tweak glucose and lactose concentrations to observe Allolactose binding to the lac repressor and CAP-cAMP activator binding to promoter.',
    interactionType: 'lac-operon-simulator',
    nodeId: 'c12_bio_cbse_398',
  },
];

// Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: In a Meselson-Stahl experiment, E. coli grown for multiple generations in 15N is switched to 14N. What proportion of hybrid (14N/15N) DNA will exist after Generation 3 (3 cell divisions)?',
    options: [
      '25% hybrid DNA, 75% light DNA',
      '50% hybrid DNA, 50% light DNA',
      '12.5% hybrid DNA, 87.5% light DNA',
      '0% hybrid DNA, 100% light DNA',
    ],
    correctIndex: 0,
    verifyInstruction: 'Set the Meselson-Stahl simulator to Generation 3 and observe the density distribution band ratios.',
    nodeId: 'c12_bio_cbse_402',
  },
  {
    question: 'Predict: What happens to lac operon transcription in E. coli when BOTH Glucose and Lactose are present in high concentration in the culture medium?',
    options: [
      'Basal/very low level transcription because cAMP is low, so CAP-cAMP complex does not activate promoter efficiently.',
      'Maximal transcription because lactose inactivates the repressor completely.',
      'No transcription at all because glucose destroys RNA Polymerase.',
      'Hyper-activated transcription exceeding control levels by 500%.',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Lac Operon simulator, select High Glucose + High Lactose and monitor mRNA transcript counts per minute.',
    nodeId: 'c12_bio_cbse_398',
  },
];

// Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you observe about the orientation of the two polynucleotide chains in the DNA double helix?',
    observableOptions: [
      'They run antiparallel (one 5\'→3\', the other 3\'→5\') with right-handed coiling.',
      'They run parallel (both 5\'→3\') with left-handed coiling.',
      'They cross over at every nucleotide base pair.',
      'They form triple helices with random orientation.',
    ],
    correctIndex: 0,
    nodeId: 'c12_bio_cbse_387',
  },
  {
    question: 'What happens when a point mutation inserts a single nucleotide base into an exon reading frame during translation?',
    observableOptions: [
      'A frameshift occurs, completely altering all subsequent downstream amino acid codons.',
      'Only the mutated codon changes; all subsequent codons remain identical.',
      'Translation terminates immediately regardless of sequence.',
      'The ribosome automatically deletes the extra base.',
    ],
    correctIndex: 0,
    nodeId: 'c12_bio_cbse_397',
  },
];

// Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Forensic DNA Profiling & VNTR Analysis Case File',
  description: 'Apply Variable Number of Tandem Repeats (VNTR) PCR amplification and agarose gel electrophoresis analysis to solve a crime scene DNA evidence matching task.',
  steps: [
    'Step 1: Extract genomic DNA from crime scene evidence (blood sample) and 3 suspect reference samples.',
    'Step 2: Digestion using restriction endonuclease EcoRI at flanking restriction sites around VNTR locus D1S80.',
    'Step 3: Perform PCR amplification and load samples into 1.5% agarose gel electrophoresis with ethidium bromide stain.',
    'Step 4: Analyze fluorescent band ladder patterns under UV transillumination to identify 100% locus band matching with Suspect B.',
  ],
};

// Section 7: MISCONCEPTIONS
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    statement: 'DNA Polymerase can synthesize DNA strands in both 5\' to 3\' and 3\' to 5\' directions.',
    correction: 'DNA Polymerase can ONLY add nucleotides to the 3\'-OH group of a growing strand (5\'→3\' direction).',
    explanation: 'Because DNA strands are antiparallel, synthesis is continuous on the leading strand and discontinuous (Okazaki fragments) on the lagging strand.',
  },
  {
    id: 'misc_2',
    statement: 'The Lac Operon repressor protein binds to the promoter sequence.',
    correction: 'The Lac Repressor protein binds specifically to the Operator sequence (O), not the promoter (P).',
    explanation: 'The promoter is the binding site for RNA Polymerase. When repressor binds operator, it physically blocks RNA Polymerase from moving down structural genes.',
  },
  {
    id: 'misc_3',
    statement: 'All codons code for an amino acid.',
    correction: 'Three stop codons (UAA, UAG, UGA) do not code for any amino acid and are recognized by release factors.',
    explanation: 'Out of 64 mRNA codons, 61 code for 20 standard amino acids, while 3 function as non-sense stop codons to terminate translation.',
  },
  {
    id: 'misc_4',
    statement: 'Introns are translated into non-functional protein regions.',
    correction: 'Introns are spliced out of primary RNA transcripts (pre-mRNA) inside the nucleus before translation.',
    explanation: 'Splicing catalyzed by spliceosomes (snRNPs) removes non-coding introns and joins coding exons together to form mature mRNA.',
  },
  {
    id: 'misc_5',
    statement: 'DNA replication is conservative, preserving original parental double strands intact.',
    correction: 'DNA replication is semiconservative, proven by Meselson and Stahl using 15N isotope labeling.',
    explanation: 'Each daughter DNA molecule consists of one original parental strand conserved intact and one newly synthesized daughter strand.',
  },
  {
    id: 'misc_6',
    statement: 'DNA fingerprinting sequences the entire 3 billion base pair human genome.',
    correction: 'DNA fingerprinting focuses on hypervariable non-coding VNTR/STR loci, not the entire genome.',
    explanation: 'Because 99.9% of human DNA is identical, forensic profiling analyzes polymorphic satellite DNA loci with variable tandem repeats.',
  },
];

// Section 8: DIAGNOSTIC QUESTIONS
const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c12_bio_cbse_385',
    question: 'Which chemical linkage connects the nitrogenous base to the pentose sugar in a nucleoside?',
    options: ['N-glycosidic bond', 'Phosphodiester bond', 'Hydrogen bond', 'Peptide bond'],
    correctIndex: 0,
    explanation: 'A nitrogenous base is linked to the C-1\' of pentose sugar via N-beta-glycosidic linkage.',
  },
  {
    id: 'diag_2',
    nodeId: 'c12_bio_cbse_387',
    question: 'In B-DNA double helix, what is the distance between consecutive base pairs and pitch of the helix?',
    options: ['0.34 nm base spacing, 3.4 nm helix pitch', '3.4 nm base spacing, 34 nm helix pitch', '0.2 nm base spacing, 2.0 nm helix pitch', '1.0 nm base spacing, 10 nm helix pitch'],
    correctIndex: 0,
    explanation: 'B-DNA has ~10 base pairs per turn with 0.34 nm spacing, giving a pitch of 3.4 nm.',
  },
  {
    id: 'diag_3',
    nodeId: 'c12_bio_cbse_388',
    question: 'Which basic protein octamer forms the core subunit of eukaryotic chromatin wrapping ~146 bp DNA?',
    options: ['Histone Octamer (2 each of H2A, H2B, H3, H4)', 'Histone Octamer (2 each of H1, H2A, H3, H4)', 'Non-histone Chromosomal Protein (NHC)', 'RNA Polymerase Core Enzyme'],
    correctIndex: 0,
    explanation: 'Histones are basic proteins rich in Lysine and Arginine. Two copies each of H2A, H2B, H3, and H4 form the octamer nucleosome core.',
  },
  {
    id: 'diag_4',
    nodeId: 'c12_bio_cbse_389',
    question: 'Which enzyme unwinds the double helix during DNA replication by breaking hydrogen bonds?',
    options: ['DNA Helicase', 'DNA Ligase', 'Topoisomerase / Gyrase', 'Primase'],
    correctIndex: 0,
    explanation: 'DNA Helicase unwinds the double-stranded DNA at the replication fork using ATP hydrolysis.',
  },
  {
    id: 'diag_5',
    nodeId: 'c12_bio_cbse_390',
    question: 'In Avery, MacLeod, and McCarty experiment, which enzyme abolished transforming activity of S-strain heat-killed extract?',
    options: ['DNase', 'RNase', 'Protease', 'Lipase'],
    correctIndex: 0,
    explanation: 'Only treatment with DNase destroyed transforming ability, proving DNA is the transforming principle.',
  },
  {
    id: 'diag_6',
    nodeId: 'c12_bio_cbse_394',
    question: 'Which feature of genetic code means that one amino acid can be coded by more than one codon?',
    options: ['Degeneracy / Redundancy', 'Unambiguous nature', 'Universal nature', 'Non-overlapping nature'],
    correctIndex: 0,
    explanation: 'Degeneracy means multiple codons (e.g., 6 codons for Leucine) code for the same amino acid.',
  },
  {
    id: 'diag_7',
    nodeId: 'c12_bio_cbse_395',
    question: 'What is the key role of tRNA in protein synthesis?',
    options: ['Adapter molecule linking specific codon sequence to correct amino acid', 'Structural scaffold of ribosome core', 'Primer provider for transcription', 'Catalytic splicing agent'],
    correctIndex: 0,
    explanation: 'tRNA acts as adapter with an anticodon loop at one end and amino acid acceptor stem (3\'-CCA) at the other.',
  },
  {
    id: 'diag_8',
    nodeId: 'c12_bio_cbse_405',
    question: 'Which pathway correctly represents the Central Dogma of Molecular Biology proposed by Francis Crick?',
    options: ['DNA → RNA → Protein', 'RNA → DNA → Protein', 'Protein → RNA → DNA', 'DNA → Protein → RNA'],
    correctIndex: 0,
    explanation: 'Central Dogma outlines unidirectional flow of genetic information: DNA replication → Transcription to RNA → Translation to Protein.',
  },
];

// Section 9: CHALLENGES (22 challenges across 3 tiers)
const CHALLENGES: Challenge[] = [
  // Foundation (7)
  {
    id: 'chal_1',
    nodeId: 'c12_bio_cbse_385',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'A nucleotide unit in DNA consists of which three chemical components?',
    options: [
      'Nitrogenous base, Deoxyribose pentose sugar, Phosphate group',
      'Nitrogenous base, Ribose sugar, Amino acid',
      'Purine base, Fatty acid, Phosphate group',
      'Pyrimidine base, Glucose, Glycerol',
    ],
    correctIndex: 0,
    explanation: 'A nucleotide is formed by a nitrogenous base + deoxyribose sugar + phosphate group linked by glycosidic and phosphodiester bonds.',
    hints: [
      'Think about what makes DNA a nucleic acid polymer.',
      'Check the sugar type specific to DNA vs RNA.',
      'Look for the base + sugar + phosphate triad.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'chal_2',
    nodeId: 'c12_bio_cbse_386',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which chemical linkage joins adjacent nucleotides along a single polynucleotide strand?',
    options: [
      '3\'-5\' Phosphodiester bond',
      'N-Glycosidic bond',
      'Hydrogen bond',
      'Peptide bond',
    ],
    correctIndex: 0,
    explanation: 'Phosphodiester bonds link the 3\'-OH group of one sugar to the 5\'-phosphate group of the adjacent nucleotide.',
    hints: [
      'It links sugar to phosphate in the backbone.',
      'It involves ester bonds to phosphate.',
      'Think 3\' to 5\' linkage.',
    ],
  },
  {
    id: 'chal_3',
    nodeId: 'c12_bio_cbse_387',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'According to Watson and Crick double helix model, how many hydrogen bonds link Adenine (A) to Thymine (T), and Guanine (G) to Cytosine (C)?',
    options: [
      '2 H-bonds between A=T; 3 H-bonds between G≡C',
      '3 H-bonds between A=T; 2 H-bonds between G≡C',
      '1 H-bond between A=T; 2 H-bonds between G≡C',
      '4 H-bonds between A=T; 4 H-bonds between G≡C',
    ],
    correctIndex: 0,
    explanation: 'A pairs with T via 2 hydrogen bonds; G pairs with C via 3 hydrogen bonds.',
    hints: [
      'G-C base pairing is stronger than A-T base pairing.',
      'Count the donor/acceptor hydrogen bonding groups.',
      'A-T has 2, G-C has 3.',
    ],
  },
  {
    id: 'chal_4',
    nodeId: 'c12_bio_cbse_388',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which histone protein acts as a linker histone outside the nucleosome core particle?',
    options: ['H1', 'H2A', 'H2B', 'H3'],
    correctIndex: 0,
    explanation: 'Histone H1 seals DNA at the entry/exit point of the nucleosome core particle.',
    hints: [
      'The core octamer has 2(H2A, H2B, H3, H4).',
      'Which histone is NOT part of the octamer?',
      'Histone H1 is the linker.',
    ],
  },
  {
    id: 'chal_5',
    nodeId: 'c12_bio_cbse_391',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why is DNA chemically more stable than RNA as genetic material?',
    options: [
      'DNA lacks 2\'-OH group on ribose and contains Thymine instead of reactive Uracil',
      'DNA contains ribose sugar which is resistant to hydrolysis',
      'DNA exists only single-stranded making it stable',
      'RNA contains thymine which causes fast mutations',
    ],
    correctIndex: 0,
    explanation: '2\'-OH in RNA makes it labile and catalytic. DNA lacks 2\'-OH and has 5-methyl uracil (Thymine), increasing stability.',
    hints: [
      'Focus on the 2\' position of the pentose ring.',
      'Look at the presence of 2\'-OH vs 2\'-H.',
      'Thymine adds extra hydrophobic stability.',
    ],
  },
  {
    id: 'chal_6',
    nodeId: 'c12_bio_cbse_403',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which type of RNA is most abundant in a eukaryotic cell and forms structural/catalytic components of ribosomes?',
    options: ['rRNA (Ribosomal RNA)', 'mRNA (Messenger RNA)', 'tRNA (Transfer RNA)', 'snRNA (Small Nuclear RNA)'],
    correctIndex: 0,
    explanation: 'rRNA accounts for ~80% of total cellular RNA and acts as peptidyl transferase ribozyme during translation.',
    hints: [
      'It makes up the ribosome organelle.',
      'Ribosomal RNA is the most abundant (~80%).',
      'Abbreviation starts with r.',
    ],
  },
  {
    id: 'chal_7',
    nodeId: 'c12_bio_cbse_405',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which retroviral enzyme reverses the standard Central Dogma (RNA → DNA)?',
    options: ['Reverse Transcriptase', 'RNA Polymerase III', 'DNA Topoisomerase', 'Peptidyl Transferase'],
    correctIndex: 0,
    explanation: 'Reverse transcriptase synthesizes cDNA from RNA template in retroviruses (Teminism).',
    hints: [
      'It copies RNA back into DNA.',
      'Discovered by Howard Temin and David Baltimore.',
      'Reverse Transcriptase.',
    ],
  },

  // Standard (8)
  {
    id: 'chal_8',
    nodeId: 'c12_bio_cbse_389',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'During DNA replication, Okazaki fragments on the lagging strand are joined together by which enzyme?',
    options: ['DNA Ligase', 'DNA Polymerase I', 'Primase', 'Helicase'],
    correctIndex: 0,
    explanation: 'DNA Ligase forms phosphodiester bonds to seal nicks between Okazaki fragments on lagging strand.',
    hints: [
      'It acts as molecular glue.',
      'It seals phosphodiester backbone gaps.',
      'DNA Ligase.',
    ],
  },
  {
    id: 'chal_9',
    nodeId: 'c12_bio_cbse_390',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In Hershey-Chase experiment (1952), bacteriophages were labeled with 35S and 32P. Where was 32P radioactivity recovered after centrifugation?',
    options: [
      'In the bacterial cell pellet at the bottom',
      'In the supernatant liquid containing phage protein coats',
      'Equally distributed in supernatant and pellet',
      'In the viral ghost shells only',
    ],
    correctIndex: 0,
    explanation: '32P labels DNA (phosphate backbone). DNA entered E. coli cells, recovering radioactivity in the bacterial pellet.',
    hints: [
      '32P labels nucleic acids (DNA), not protein.',
      'Bacterial cells settle in the heavy pellet.',
      'Radioactivity in pellet proves DNA is genetic material.',
    ],
  },
  {
    id: 'chal_10',
    nodeId: 'c12_bio_cbse_393',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is the role of the Sigma factor (σ) in prokaryotic transcription initiation by RNA Polymerase?',
    options: [
      'It confers promoter-specific binding specificity to core RNA polymerase enzyme.',
      'It terminates transcription at poly-A signals.',
      'It splices introns from primary mRNA.',
      'It unwinds DNA like helicase during elongation.',
    ],
    correctIndex: 0,
    explanation: 'Core RNA polymerase + Sigma factor = Holoenzyme, which recognizes promoter consensus sequences (-10 Pribnow box, -35 region).',
    hints: [
      'Core enzyme alone binds DNA non-specifically.',
      'Sigma factor helps find promoter site.',
      'Initiation factor.',
    ],
  },
  {
    id: 'chal_11',
    nodeId: 'c12_bio_cbse_394',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If an mRNA sequence is 5\'-AUG UUU GUC UAA-3\', what polypeptide sequence will be translated?',
    options: [
      'Met - Phe - Val',
      'Met - Phe - Val - Stop',
      'Formyl-Met - Leu - Lys',
      'Val - Phe - Met',
    ],
    correctIndex: 0,
    explanation: 'AUG = Methionine (start), UUU = Phenylalanine, GUC = Valine, UAA = Stop (terminates translation, no amino acid inserted).',
    hints: [
      'AUG is Methionine.',
      'UUU codes for Phe (Nirenberg experiment).',
      'UAA is stop codon, terminates chain.',
    ],
  },
  {
    id: 'chal_12',
    nodeId: 'c12_bio_cbse_395',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'If a tRNA anticodon reads 5\'-UAC-3\', which mRNA codon does it recognize during translation pairing?',
    options: ['5\'-GUA-3\'', '5\'-AUG-3\'', '3\'-AUG-5\'', '5\'-CAU-3\''],
    correctIndex: 0,
    explanation: 'Anticodon 5\'-UAC-3\' pairs antiparallel with mRNA codon 3\'-AUG-5\', which is written 5\'-GUA-3\'. Wait: anticodon loop pairs antiparallel. 5\'-UAC-3\' pairs with 3\'-AUG-5\' = 5\'-GUA-3\'.',
    hints: [
      'Remember antiparallel base pairing (5\' pairs with 3\').',
      'U pairs with A, A pairs with U, C pairs with G.',
      'Reverse direction 3\' to 5\'.',
    ],
  },
  {
    id: 'chal_13',
    nodeId: 'c12_bio_cbse_398',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In the E. coli lac operon, what molecule acts as the inducer that binds and inactivates the lac repressor protein?',
    options: ['Allolactose (or IPTG artificially)', 'Glucose-6-phosphate', 'cAMP', 'Galactose-1-phosphate'],
    correctIndex: 0,
    explanation: 'Allolactose binds lac repressor, changing its conformation so it loses affinity for operator DNA.',
    hints: [
      'It is a lactose isomer.',
      'It binds to the repressor protein.',
      'Allolactose.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'chal_14',
    nodeId: 'c12_bio_cbse_400',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Recall',
    question: 'According to Human Genome Project findings, what percentage of the human genome codes for functional proteins?',
    options: ['Less than 2%', 'Approximately 25%', '50%', 'Over 90%'],
    correctIndex: 0,
    explanation: 'Less than 2% of the ~3 billion bp human genome codes for functional protein chains.',
    hints: [
      'Most human DNA is non-coding repetitive sequence.',
      'Protein coding sequence is surprisingly small.',
      '< 2%.',
    ],
  },
  {
    id: 'chal_15',
    nodeId: 'c12_bio_cbse_402',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In Meselson-Stahl experiment, after 2 generations (40 min) of E. coli growth in 14N medium (starting from 15N), what is the ratio of Hybrid (14N/15N) to Light (14N/14N) DNA strands?',
    options: ['1 : 1 (50% Hybrid, 50% Light)', '1 : 3 (25% Hybrid, 75% Light)', '3 : 1 (75% Hybrid, 25% Light)', '1 : 0 (100% Hybrid)'],
    correctIndex: 0,
    explanation: 'Gen 0: 100% Heavy (15N/15N). Gen 1: 100% Hybrid (14N/15N). Gen 2: 50% Hybrid (14N/15N) and 50% Light (14N/14N) = 1:1 ratio.',
    hints: [
      'Gen 1 has 2 hybrid molecules.',
      'Gen 2 replicates 2 hybrids to produce 2 hybrids + 2 light molecules.',
      '2 hybrids : 2 light = 1 : 1 ratio.',
    ],
    misconceptionIndex: 4,
  },

  // Advanced (7)
  {
    id: 'chal_16',
    nodeId: 'c12_bio_cbse_387',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Problem Solving',
    question: 'A double-stranded DNA fragment has 1000 base pairs and contains 240 Guanine bases. Calculate total number of Hydrogen bonds in this DNA molecule.',
    correctAnswer: '2240',
    explanation: 'Total base pairs = 1000. Guanine G = 240, so Cytosine C = 240. G-C pairs = 240 (each has 3 H-bonds: 240 × 3 = 720 H-bonds). Remaining base pairs = 1000 - 240 = 760 A-T pairs (each has 2 H-bonds: 760 × 2 = 1520 H-bonds). Total H-bonds = 720 + 1520 = 2240.',
    hints: [
      'G = C = 240 pairs. Each G-C has 3 hydrogen bonds.',
      'A-T pairs = Total pairs (1000) - 240 = 760 pairs. Each A-T has 2 hydrogen bonds.',
      '720 + 1520 = 2240.',
    ],
  },
  {
    id: 'chal_17',
    nodeId: 'c12_bio_cbse_388',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Problem Solving',
    question: 'How many total histone protein octamers are required to package a human diploid genome of 6.6 × 10^9 base pairs into nucleosomes (assuming 200 bp per nucleosome)?',
    correctAnswer: '33000000',
    explanation: 'Number of nucleosomes = 6.6 × 10^9 bp / 200 bp = 33,000,000 nucleosome particles, requiring 3.3 × 10^7 histone octamers.',
    hints: [
      'Divide total diploid base pairs by 200 bp length per nucleosome repeat.',
      '6.6 × 10^9 / 200 = 33,000,000.',
      'Enter as whole integer: 33000000.',
    ],
  },
  {
    id: 'chal_18',
    nodeId: 'c12_bio_cbse_397',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A wild-type gene sequence coding for mRNA is 5\'-AUG ACC GAU UGG UAG-3\'. A mutation changes it to 5\'-AUG ACC UAA UGG UAG-3\'. What type of mutation occurred and what is its outcome?',
    options: [
      'Nonsense mutation; premature termination resulting in truncated 2-amino acid peptide.',
      'Missense mutation; substitution of Asp for Glu.',
      'Silent mutation; no change in amino acid sequence.',
      'Frameshift mutation; complete alteration of downstream reading frame.',
    ],
    correctIndex: 0,
    explanation: 'Codon 3 changed from GAU (Asp) to UAA (STOP codon). This is a nonsense mutation causing premature translation termination.',
    hints: [
      'Compare codon 3: GAU vs UAA.',
      'UAA is one of the three non-sense STOP codons.',
      'Truncated peptide produced = Nonsense mutation.',
    ],
  },
  {
    id: 'chal_19',
    nodeId: 'c12_bio_cbse_398',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In a lac operon mutant strain where lacI gene has a non-functional repressor mutation (I-), what will be the expression profile of lacZ, lacY, lacA in the ABSENCE of lactose?',
    options: [
      'Constitutive expression (high transcription even without lactose)',
      'Uninducible expression (zero transcription even with lactose)',
      'Normal inducible expression',
      'Catabolite repression only',
    ],
    correctIndex: 0,
    explanation: 'lacI- mutant produces non-functional repressor that cannot bind operator, resulting in continuous constitutive transcription.',
    hints: [
      'Without repressor binding to operator, operator is permanently free.',
      'RNA Polymerase can transcribe continuously.',
      'This is called constitutive expression.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'chal_20',
    nodeId: 'c12_bio_cbse_399',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'In Human Genome Project sequencing, expressed sequence tags (ESTs) method focuses on which strategy?',
    options: [
      'Sequencing only genes expressed as RNA transcripts (cDNA libraries)',
      'Sequencing entire non-coding satellite DNA regions',
      'Mapping restriction enzyme cleavage sites across chromosome 1',
      'Random shotgun sequencing of whole genomic DNA',
    ],
    correctIndex: 0,
    explanation: 'ESTs approach identifies expressed genes by isolating mRNA and sequencing cDNA clones.',
    hints: [
      'ESTs focus on genes that are transcribed into RNA.',
      'RNA is converted to cDNA before sequencing.',
      'Expressed genes identification.',
    ],
  },
  {
    id: 'chal_21',
    nodeId: 'c12_bio_cbse_401',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In DNA fingerprinting, why are Southern blotting and radioactive 32P-labeled VNTR probes used after restriction digestion and gel electrophoresis?',
    options: [
      'To transfer separated DNA fragments to nitrocellulose membrane and hybridize specifically with variable tandem repeats for autoradiography visualization.',
      'To synthesize cDNA from agarose gel fragments.',
      'To amplify DNA fragments million-fold.',
      'To sequence individual nucleotides directly.',
    ],
    correctIndex: 0,
    explanation: 'Southern blotting transfers single-stranded DNA to nylon/nitrocellulose membrane, allowing labeled VNTR probes to hybridize and produce visible hypervariable bands on X-ray film.',
    hints: [
      'Southern blot transfers DNA from gel to membrane.',
      'VNTR probes hybridize to complementary repeat sequences.',
      'Autoradiography detects radiolabeled bands.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'chal_22',
    nodeId: 'c12_bio_cbse_404',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In eukaryotes, gene expression regulation occurs at multiple levels. Which level involves spliceosome-mediated removal of introns and alternative splicing to yield differential protein isoforms?',
    options: [
      'Post-transcriptional processing level',
      'Transcriptional initiation level',
      'Transport level from nucleus to cytoplasm',
      'Translational level',
    ],
    correctIndex: 0,
    explanation: 'Processing level involves pre-mRNA 5\' capping, 3\' polyadenylation, and alternative intron splicing to generate diverse mRNA transcripts.',
    hints: [
      'Splicing occurs after primary transcript is produced.',
      'It takes place inside the nucleus prior to export.',
      'Post-transcriptional processing level.',
    ],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

const DnaHelixDiagram: React.FC<{ gCPercent: number; helicaseActive: boolean }> = ({ gCPercent, helicaseActive }) => {
  const atPercent = 100 - gCPercent;
  return (
    <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-900 rounded-lg shadow-inner border border-slate-700">
      <defs>
        <linearGradient id="dnaGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="dnaGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      <text x="250" y="24" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">
        DNA Double Helix Architecture & Base Pair Hydrogen Bonding
      </text>

      {/* 5' and 3' strand backbone labels */}
      <text x="20" y="50" fill="#60a5fa" fontSize="12" fontWeight="bold">5'</text>
      <text x="470" y="50" fill="#60a5fa" fontSize="12" fontWeight="bold">3'</text>
      <text x="20" y="190" fill="#f472b6" fontSize="12" fontWeight="bold">3'</text>
      <text x="470" y="190" fill="#f472b6" fontSize="12" fontWeight="bold">5'</text>

      {/* Helicase enzyme indicator if active */}
      {helicaseActive && (
        <g transform="translate(230, 80)">
          <circle cx="20" cy="40" r="28" fill="#ef4444" opacity="0.85" />
          <text x="20" y="44" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Helicase</text>
          <path d="M 5,20 L 35,60 M 35,20 L 5,60" stroke="#fef08a" strokeWidth="3" />
        </g>
      )}

      {/* Double Helix Strands animation / curves */}
      <path
        d="M 40,60 Q 120,180 200,60 T 360,60 T 460,180"
        fill="none"
        stroke="url(#dnaGrad1)"
        strokeWidth="6"
      />
      <path
        d="M 40,180 Q 120,60 200,180 T 360,180 T 460,60"
        fill="none"
        stroke="url(#dnaGrad2)"
        strokeWidth="6"
      />

      {/* Base pair hydrogen bonding rungs */}
      {[60, 100, 140, 180, 220, 260, 300, 340, 380, 420].map((x, idx) => {
        const isGC = idx % 2 === 0;
        const color = isGC ? '#10b981' : '#f59e0b';
        const label = isGC ? 'G≡C (3 H-bonds)' : 'A=T (2 H-bonds)';
        const yTop = 60 + Math.sin((x / 400) * Math.PI * 3) * 50;
        const yBot = 180 - Math.sin((x / 400) * Math.PI * 3) * 50;
        return (
          <g key={x}>
            <line x1={x} y1={yTop} x2={x} y2={yBot} stroke={color} strokeWidth="3" strokeDasharray={isGC ? '4,2' : '6,3'} />
            <circle cx={x} cy={(yTop + yBot) / 2} r="4" fill={color} />
          </g>
        );
      })}

      {/* Stats overlay */}
      <rect x="30" y="195" width="440" height="35" rx="6" fill="#1e293b" opacity="0.9" stroke="#475569" />
      <text x="40" y="217" fill="#cbd5e1" fontSize="11">
        Composition: <tspan fill="#10b981" fontWeight="bold">G-C ({gCPercent}%)</tspan> | <tspan fill="#f59e0b" fontWeight="bold">A-T ({atPercent}%)</tspan> | Pitch: <tspan fill="#38bdf8">3.4 nm (10 bp/turn)</tspan>
      </text>
    </svg>
  );
};

const LacOperonDiagram: React.FC<{ glucose: number; lactose: number }> = ({ glucose, lactose }) => {
  const isRepressorBound = lactose < 30;
  const isCapBound = glucose < 40;
  const transcriptionRate = !isRepressorBound ? (isCapBound ? 100 : 25) : 0;

  return (
    <svg viewBox="0 0 520 250" className="w-full h-60 bg-slate-900 rounded-lg shadow-inner border border-slate-700">
      <text x="260" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">
        E. coli Lac Operon Regulatory Circuit (Jacob & Monod Model)
      </text>

      {/* DNA Strand Operon Layout */}
      <rect x="30" y="110" width="460" height="24" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
      
      {/* Promoter (P), Operator (O), Genes (i, z, y, a) */}
      <rect x="40" y="112" width="50" height="20" fill="#6366f1" rx="2" />
      <text x="65" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">lacI</text>

      <rect x="105" y="112" width="40" height="20" fill="#3b82f6" rx="2" />
      <text x="125" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">CAP</text>

      <rect x="150" y="112" width="50" height="20" fill="#0ea5e9" rx="2" />
      <text x="175" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">P (Promoter)</text>

      <rect x="205" y="112" width="45" height="20" fill="#ef4444" rx="2" />
      <text x="227" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">O (Operator)</text>

      <rect x="255" y="112" width="70" height="20" fill="#10b981" rx="2" />
      <text x="290" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">lacZ (β-gal)</text>

      <rect x="330" y="112" width="70" height="20" fill="#f59e0b" rx="2" />
      <text x="365" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">lacY (Permease)</text>

      <rect x="405" y="112" width="75" height="20" fill="#8b5cf6" rx="2" />
      <text x="442" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">lacA (Transac.)</text>

      {/* CAP-cAMP Complex binding status */}
      {isCapBound ? (
        <g transform="translate(110, 75)">
          <polygon points="15,0 30,25 0,25" fill="#38bdf8" />
          <text x="15" y="-5" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">CAP+cAMP Bound</text>
        </g>
      ) : (
        <text x="125" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">CAP Unbound (Low cAMP)</text>
      )}

      {/* Lac Repressor Protein */}
      {isRepressorBound ? (
        <g transform="translate(212, 70)">
          <rect x="0" y="0" width="30" height="35" rx="6" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" />
          <text x="15" y="22" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Repressor</text>
          <text x="15" y="-6" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">BLOCKING</text>
        </g>
      ) : (
        <g transform="translate(212, 20)">
          <rect x="0" y="0" width="30" height="30" rx="6" fill="#16a34a" opacity="0.8" />
          <circle cx="35" cy="15" r="7" fill="#f59e0b" />
          <text x="35" y="18" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">L</text>
          <text x="15" y="42" textAnchor="middle" fill="#4ade80" fontSize="8">Inactivated by Allolactose</text>
        </g>
      )}

      {/* RNA Polymerase synthesis wave */}
      {transcriptionRate > 0 && (
        <g transform="translate(260, 150)">
          <ellipse cx="60" cy="20" rx="70" ry="16" fill="#06b6d4" opacity="0.6" />
          <path d="M 0,20 Q 40,40 80,20 T 160,20" stroke="#f43f5e" strokeWidth="3" fill="none" strokeDasharray="4,2" />
          <text x="60" y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">mRNA Synthesis Active ({transcriptionRate}%)</text>
        </g>
      )}

      {/* Status Footer */}
      <rect x="20" y="200" width="480" height="38" rx="6" fill="#0f172a" stroke="#334155" />
      <text x="30" y="223" fill="#e2e8f0" fontSize="11">
        Glucose: <tspan fill={glucose > 50 ? '#ef4444' : '#10b981'}>{glucose}%</tspan> | Lactose: <tspan fill={lactose > 30 ? '#10b981' : '#ef4444'}>{lactose}%</tspan> | Transcription Rate: <tspan fill="#38bdf8" fontWeight="bold">{transcriptionRate}%</tspan>
      </text>
    </svg>
  );
};

const TranslationRibosomeDiagram: React.FC<{ codonIndex: number }> = ({ codonIndex }) => {
  const codons = ['AUG', 'UUU', 'GUC', 'ACG', 'UAA'];
  const aminoAcids = ['Met', 'Phe', 'Val', 'Thr', 'STOP'];
  const currentCodon = codons[Math.min(codonIndex, codons.length - 1)];

  return (
    <svg viewBox="0 0 520 260" className="w-full h-64 bg-slate-900 rounded-lg shadow-inner border border-slate-700">
      <text x="260" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">
        Translational Machinery: 70S/80S Ribosome (E, P, A Sites) & tRNA
      </text>

      {/* 50S Large Subunit background */}
      <path d="M 120,60 Q 260,10 400,60 Q 430,130 400,160 Q 260,170 120,160 Q 90,120 120,60 Z" fill="#3b82f6" opacity="0.25" stroke="#60a5fa" strokeWidth="2" />
      <text x="260" y="50" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">50S Large Ribosomal Subunit (Peptidyl Transferase Center)</text>

      {/* 30S Small Subunit bottom */}
      <ellipse cx="260" cy="195" rx="170" ry="35" fill="#8b5cf6" opacity="0.3" stroke="#c084fc" strokeWidth="2" />
      <text x="260" y="215" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">30S Small Subunit (mRNA Decoded)</text>

      {/* mRNA Strand passing through */}
      <rect x="50" y="165" width="420" height="12" rx="4" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
      <text x="35" y="175" fill="#f472b6" fontSize="10" fontWeight="bold">5'</text>
      <text x="475" y="175" fill="#f472b6" fontSize="10" fontWeight="bold">3'</text>

      {/* Render codons along mRNA */}
      {codons.map((c, idx) => {
        const xPos = 110 + idx * 70;
        const isActive = idx === codonIndex;
        return (
          <g key={idx}>
            <rect x={xPos - 25} y="162" width="50" height="18" rx="3" fill={isActive ? '#f59e0b' : '#334155'} stroke={isActive ? '#fef08a' : '#475569'} />
            <text x={xPos} y="175" textAnchor="middle" fill={isActive ? '#000' : '#fff'} fontSize="10" fontWeight="bold">{c}</text>
          </g>
        );
      })}

      {/* E, P, A Site Boxes */}
      <rect x="155" y="90" width="55" height="65" rx="4" fill="none" stroke="#64748b" strokeDasharray="3,3" />
      <text x="182" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">E Site</text>

      <rect x="232" y="90" width="55" height="65" rx="4" fill="none" stroke="#22c55e" strokeDasharray="3,3" />
      <text x="260" y="105" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">P Site</text>

      <rect x="310" y="90" width="55" height="65" rx="4" fill="none" stroke="#eab308" strokeDasharray="3,3" />
      <text x="337" y="105" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="bold">A Site</text>

      {/* tRNA in P site */}
      <g transform="translate(242, 100)">
        <path d="M 17,45 L 17,20 L 5,10 L 17,0 L 29,10 L 17,20 Z" fill="#10b981" />
        <circle cx="17" cy="-8" r="12" fill="#ef4444" />
        <text x="17" y="-4" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">{aminoAcids[Math.max(0, codonIndex - 1)] || 'Met'}</text>
      </g>

      {/* Incoming tRNA in A site */}
      <g transform="translate(320, 95)">
        <path d="M 17,45 L 17,20 L 5,10 L 17,0 L 29,10 L 17,20 Z" fill="#f59e0b" />
        <circle cx="17" cy="-8" r="12" fill="#3b82f6" />
        <text x="17" y="-4" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">{aminoAcids[codonIndex]}</text>
      </g>

      {/* Peptide Chain floating up */}
      <path d="M 260,92 Q 250,70 230,55 T 200,40" stroke="#f43f5e" strokeWidth="4" fill="none" />
      <circle cx="200" cy="40" r="8" fill="#ec4899" />
      <text x="200" y="43" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Peptide</text>
    </svg>
  );
};

const MeselsonStahlDiagram: React.FC<{ generation: number }> = ({ generation }) => {
  // Band proportions for Gen 0, Gen 1, Gen 2, Gen 3
  const bands = useMemo(() => {
    switch (generation) {
      case 0: return { heavy: 100, hybrid: 0, light: 0 };
      case 1: return { heavy: 0, hybrid: 100, light: 0 };
      case 2: return { heavy: 0, hybrid: 50, light: 50 };
      case 3: return { heavy: 0, hybrid: 25, light: 75 };
      default: return { heavy: 0, hybrid: 100, light: 0 };
    }
  }, [generation]);

  return (
    <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-900 rounded-lg shadow-inner border border-slate-700">
      <text x="250" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">
        Meselson-Stahl Experiment: CsCl Equilibrium Density Gradient Centrifugation
      </text>

      {/* Centrifugation Tube outline */}
      <g transform="translate(180, 45)">
        <rect x="0" y="0" width="140" height="150" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
        <line x1="0" y1="20" x2="140" y2="20" stroke="#475569" strokeWidth="2" />

        {/* Gradient position labels */}
        <text x="-60" y="45" fill="#f472b6" fontSize="10" fontWeight="bold">Light (14N/14N) Top</text>
        <line x1="-5" y1="42" x2="5" y2="42" stroke="#f472b6" />

        <text x="-65" y="85" fill="#c084fc" fontSize="10" fontWeight="bold">Hybrid (14N/15N) Mid</text>
        <line x1="-5" y1="82" x2="5" y2="82" stroke="#c084fc" />

        <text x="-65" y="125" fill="#60a5fa" fontSize="10" fontWeight="bold">Heavy (15N/15N) Bot</text>
        <line x1="-5" y1="122" x2="5" y2="122" stroke="#60a5fa" />

        {/* DNA Density Bands based on Generation */}
        {bands.light > 0 && (
          <g>
            <rect x="10" y="35" width="120" height="14" rx="4" fill="#ec4899" opacity={bands.light / 100} />
            <text x="70" y="46" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">14N/14N Light Band ({bands.light}%)</text>
          </g>
        )}

        {bands.hybrid > 0 && (
          <g>
            <rect x="10" y="75" width="120" height="14" rx="4" fill="#a855f7" opacity={bands.hybrid / 100} />
            <text x="70" y="86" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">14N/15N Hybrid Band ({bands.hybrid}%)</text>
          </g>
        )}

        {bands.heavy > 0 && (
          <g>
            <rect x="10" y="115" width="120" height="14" rx="4" fill="#3b82f6" opacity={bands.heavy / 100} />
            <text x="70" y="126" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">15N/15N Heavy Band ({bands.heavy}%)</text>
          </g>
        )}
      </g>

      {/* Generation info */}
      <rect x="350" y="60" width="130" height="110" rx="8" fill="#0f172a" stroke="#334155" />
      <text x="415" y="82" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Gen {generation}</text>
      <text x="360" y="105" fill="#cbd5e1" fontSize="10">Light: {bands.light}%</text>
      <text x="360" y="125" fill="#cbd5e1" fontSize="10">Hybrid: {bands.hybrid}%</text>
      <text x="360" y="145" fill="#cbd5e1" fontSize="10">Heavy: {bands.heavy}%</text>
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT CLASS / FUNCTION
// ==========================================

export const C12_BiologyMolecularBasisofInheritanceCBSESim: React.FC<DefaultProps> = ({
  onComplete,
  initialNodeId = 'c12_bio_cbse_385',
}) => {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction / Observation State
  const [predAnswers, setPredAnswers] = useState<{ [key: number]: number }>({});
  const [obsAnswers, setObsAnswers] = useState<{ [key: number]: number }>({});

  // Challenge State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userAnswerIndex, setUserAnswerIndex] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [challengeIsCorrect, setChallengeIsCorrect] = useState<boolean | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Lab Simulators Interactive Parameters
  const [gcPercent, setGcPercent] = useState<number>(50);
  const [helicaseActive, setHelicaseActive] = useState<boolean>(false);
  const [meselsonGen, setMeselsonGen] = useState<number>(0);
  const [glucoseLevel, setGlucoseLevel] = useState<number>(10);
  const [lactoseLevel, setLactoseLevel] = useState<number>(80);
  const [translationCodonIdx, setTranslationCodonIdx] = useState<number>(0);

  // BKT and SRS State
  const [bktState, setBktState] = useState<BKTStateMap>(() => {
    const initialMap: BKTStateMap = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState(id);
    });
    return initialMap;
  });

  const [srsState, setSrsState] = useState<SRSStateMap>(() => {
    const initialMap: SRSStateMap = {};
    CHALLENGES.forEach((c) => {
      initialMap[c.id] = createReviewItem(c.id);
    });
    return initialMap;
  });

  // UI / Feedback States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Audio / Inactivity timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto hint reset timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      const currentChal = CHALLENGES[currentChallengeIndex];
      if (currentChal && currentChal.hints.length > 0) {
        setCurrentHint(currentChal.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, resetInactivityTimer]);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Chargaff rules and nucleotide chemistry govern DNA stability.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider Chargaff base pairing ratios.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = () => {
    const currentChal = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentChal.type === 'numeric') {
      isCorrect = userNumericInput.trim() === currentChal.correctAnswer;
    } else {
      isCorrect = userAnswerIndex === currentChal.correctIndex;
    }

    setChallengeIsCorrect(isCorrect);

    // Update BKT
    const updatedBkt = bktUpdate(bktState[currentChal.nodeId] || createBKTState(currentChal.nodeId), isCorrect);
    setBktState((prev) => ({ ...prev, [currentChal.nodeId]: updatedBkt }));

    // Update SRS
    const quality = isCorrect ? 5 : 1;
    const updatedSrs = sm2Update(srsState[currentChal.id] || createReviewItem(currentChal.id), quality);
    setSrsState((prev) => ({ ...prev, [currentChal.id]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Excellent scientific precision!');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
      setChallengeFeedback('Correct! ' + currentChal.explanation);

      const newCompleted = new Set(completedChallenges);
      newCompleted.add(currentChal.id);
      setCompletedChallenges(newCompleted);

      if (newCompleted.size === CHALLENGES.length) {
        setShowSuccess(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have mastered Molecular Genetics!');
        const totalScore = Math.round((newCompleted.size / CHALLENGES.length) * 100);
        recordGameScore('c12_bio_cbse_385', totalScore);
        if (onComplete) onComplete(totalScore);
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Review the molecular mechanism and try again.');
      setChallengeFeedback('Incorrect. ' + currentChal.explanation);
    }
  };

  const nextChallenge = () => {
    setUserAnswerIndex(null);
    setUserNumericInput('');
    setChallengeFeedback(null);
    setChallengeIsCorrect(null);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('whoosh');
    }
  };

  const prevChallenge = () => {
    setUserAnswerIndex(null);
    setUserNumericInput('');
    setChallengeFeedback(null);
    setChallengeIsCorrect(null);
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
      audioManager.play('whoosh');
    }
  };

  // Current active challenge node mastery
  const currentChal = CHALLENGES[currentChallengeIndex];
  const nodeMasteryVal = masteryProb(bktState[currentChal.nodeId] || createBKTState(currentChal.nodeId));

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-gold-500 selection:text-white">
      {/* Dynamic Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Mastery Complete! Molecular Basis of Inheritance Achieved." />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={currentHint} />

      {/* Header Banner */}
      <header className="max-w-6xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/30 rounded-full text-xs font-semibold tracking-wider uppercase">
              CISCE Class 12 Biology
            </span>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
              Mastery Engine
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-400 to-purple-500">
            {SCENARIO.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">{SCENARIO.intro}</p>
        </div>

        {/* Global Progress Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center gap-4 min-w-[220px]">
          <div className="w-12 h-12 rounded-full border-4 border-gold-500 border-t-transparent animate-spin flex items-center justify-center">
            <span className="text-xs font-bold text-gold-400 animate-none">
              {Math.round((completedChallenges.size / CHALLENGES.length) * 100)}%
            </span>
          </div>
          <div>
            <div className="text-xs text-slate-400">Challenges Solved</div>
            <div className="text-lg font-bold text-slate-100">
              {completedChallenges.size} / {CHALLENGES.length}
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation Controls */}
      <nav className="max-w-6xl mx-auto mb-6 flex bg-slate-900 border border-slate-800 rounded-xl p-1.5 gap-2 overflow-x-auto">
        {(['discovery', 'lab', 'challenges', 'summary'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              audioManager.play('tap');
            }}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-lg shadow-gold-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {tab === 'discovery' && '1. Discovery & Hook'}
            {tab === 'lab' && '2. Interactive Workbench'}
            {tab === 'challenges' && '3. Progressive Assessment'}
            {tab === 'summary' && '4. Real-World Case File'}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto">
        {/* TAB 1: DISCOVERY & PREDICTION */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-2">Discovery Challenge: Nucleotide Preconceptions</h2>
              <p className="text-slate-300 text-sm mb-6">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoverySubmitted}
                    className={`p-4 rounded-xl text-left border text-sm font-medium transition-all ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : idx === discoverySelected
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950/50 border-slate-800 text-slate-500'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-gold-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="mt-6 p-4 rounded-xl bg-gold-950/40 border border-gold-500/30 text-gold-200 text-sm leading-relaxed">
                  <span className="font-bold text-gold-400">Scientific Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-purple-400 mb-4">Hypothesis & Prediction Models</h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-sm font-semibold text-slate-200 mb-3">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {pq.options.map((opt, oIdx) => {
                        const isSelected = predAnswers[qIdx] === oIdx;
                        const isCorrect = oIdx === pq.correctIndex;
                        const hasAnswered = predAnswers[qIdx] !== undefined;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setPredAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                              if (oIdx === pq.correctIndex) {
                                audioManager.play('pop');
                              } else {
                                audioManager.play('error');
                              }
                            }}
                            className={`p-3 rounded-lg text-xs text-left border transition-all ${
                              hasAnswered
                                ? isCorrect
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                                  : isSelected
                                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-500'
                                : 'bg-slate-900 border-slate-800 hover:border-purple-500/50 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                      <span className="text-purple-400 font-semibold">Verification Protocol: </span>
                      {pq.verifyInstruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE WORKBENCH & LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Lab Selector Header */}
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-2 gap-2 overflow-x-auto">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('swoop');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeLabIndex === idx
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Selected Exploration Step Detail Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gold-400">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                <p className="text-xs text-slate-400 mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>

              {/* Lab Visualizers based on selected lab index */}
              {activeLabIndex === 0 && (
                <div className="space-y-6">
                  <DnaHelixDiagram gCPercent={gcPercent} helicaseActive={helicaseActive} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>G-C Base Pair Ratio: {gcPercent}%</span>
                        <span>A-T Ratio: {100 - gcPercent}%</span>
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={gcPercent}
                        onChange={(e) => setGcPercent(Number(e.target.value))}
                        className="w-full mt-2 accent-gold-500"
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        Higher G-C content increases thermal denaturation melting temperature (Tm) due to 3 hydrogen bonds per pair.
                      </p>
                    </div>

                    <div className="flex flex-col justify-center">
                      <button
                        onClick={() => {
                          setHelicaseActive(!helicaseActive);
                          audioManager.play('balance');
                        }}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          helicaseActive
                            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                        }`}
                      >
                        {helicaseActive ? 'Stop Helicase Unwinding' : 'Inject Replication Helicase'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeLabIndex === 1 && (
                <div className="space-y-6">
                  <MeselsonStahlDiagram generation={meselsonGen} />
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap gap-3 justify-center">
                    {[0, 1, 2, 3].map((gen) => (
                      <button
                        key={gen}
                        onClick={() => {
                          setMeselsonGen(gen);
                          audioManager.play('count');
                        }}
                        className={`py-2 px-5 rounded-lg text-xs font-bold transition-all ${
                          meselsonGen === gen
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Generation {gen} ({gen * 20} min in 14N)
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeLabIndex === 2 && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                    <h4 className="text-sm font-bold text-gold-400 mb-2">Transcription & mRNA Processing Engine</h4>
                    <p className="text-xs text-slate-400 mb-4">
                      RNA Polymerase II transcribes 5' to 3' starting from TATA box promoter. Spliceosome removes introns, adding 7-methylguanosine cap and Poly-A tail.
                    </p>
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                      5'-[TATA]-ATG-GCC-ATT-[INTRON 1: GU...AG]-GTC-TAG-[AATAAA]-3'
                    </div>
                    <div className="mt-4 flex justify-center gap-4">
                      <button
                        onClick={() => {
                          audioManager.play('chime');
                          speechManager.speak('Spliceosome removing intron segment');
                        }}
                        className="py-2.5 px-6 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold"
                      >
                        Execute Pre-mRNA Splicing
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeLabIndex === 3 && (
                <div className="space-y-6">
                  <TranslationRibosomeDiagram codonIndex={translationCodonIdx} />
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                    <button
                      onClick={() => {
                        setTranslationCodonIdx((prev) => Math.max(0, prev - 1));
                        audioManager.play('swoop');
                      }}
                      className="py-2 px-4 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800"
                    >
                      ← Step Back Codon
                    </button>
                    <span className="text-xs font-bold text-amber-400">
                      Codon Step {translationCodonIdx + 1} of 5
                    </span>
                    <button
                      onClick={() => {
                        setTranslationCodonIdx((prev) => Math.min(4, prev + 1));
                        audioManager.play('pickup');
                      }}
                      className="py-2 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white shadow-md shadow-amber-600/30"
                    >
                      Translocate Ribosome →
                    </button>
                  </div>
                </div>
              )}

              {activeLabIndex === 4 && (
                <div className="space-y-6">
                  <LacOperonDiagram glucose={glucoseLevel} lactose={lactoseLevel} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Glucose Level: {glucoseLevel}%</span>
                        <span className="text-xs text-slate-400">cAMP: {glucoseLevel < 40 ? 'HIGH' : 'LOW'}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={glucoseLevel}
                        onChange={(e) => setGlucoseLevel(Number(e.target.value))}
                        className="w-full mt-2 accent-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Lactose Level: {lactoseLevel}%</span>
                        <span className="text-xs text-slate-400">Repressor: {lactoseLevel > 30 ? 'INACTIVE' : 'ACTIVE'}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={lactoseLevel}
                        onChange={(e) => setLactoseLevel(Number(e.target.value))}
                        className="w-full mt-2 accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4">Empirical Observation Checkpoints</h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                  <div key={oqIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-sm font-semibold text-slate-200 mb-3">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {oq.observableOptions.map((opt, oIdx) => {
                        const isSelected = obsAnswers[oqIdx] === oIdx;
                        const isCorrect = oIdx === oq.correctIndex;
                        const hasAnswered = obsAnswers[oqIdx] !== undefined;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setObsAnswers((prev) => ({ ...prev, [oqIdx]: oIdx }));
                              if (oIdx === oq.correctIndex) {
                                audioManager.play('pop');
                              } else {
                                audioManager.play('error');
                              }
                            }}
                            className={`p-3 rounded-lg text-xs text-left border transition-all ${
                              hasAnswered
                                ? isCorrect
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                                  : isSelected
                                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-500'
                                : 'bg-slate-900 border-slate-800 hover:border-gold-500/50 text-slate-300'
                            }`}
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
          </div>
        )}

        {/* TAB 3: PROGRESSIVE CHALLENGE ASSESSMENT */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              {/* Challenge Top Meta Info */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                      Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 capitalize">
                      {currentChal.difficulty} Tier
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      {currentChal.competencyLevel}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Node: <span className="font-mono text-gold-400">{currentChal.nodeId}</span> | Mastery Level: <span className="font-bold text-emerald-400">{Math.round(nodeMasteryVal * 100)}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevChallenge}
                    disabled={currentChallengeIndex === 0}
                    className="py-1.5 px-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextChallenge}
                    disabled={currentChallengeIndex === CHALLENGES.length - 1}
                    className="py-1.5 px-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Challenge Question Text */}
              <h3 className="text-base md:text-lg font-bold text-slate-100 mb-6 leading-relaxed">
                {currentChal.question}
              </h3>

              {/* Challenge Input Component */}
              {currentChal.type === 'numeric' ? (
                <div className="mb-6 max-w-md">
                  <label className="text-xs text-slate-400 mb-2 block">Enter calculated value:</label>
                  <input
                    type="text"
                    value={userNumericInput}
                    onChange={(e) => setUserNumericInput(e.target.value)}
                    placeholder="e.g. 2240"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-gold-300 focus:outline-none focus:border-gold-500"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {currentChal.options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setUserAnswerIndex(idx)}
                      className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                        userAnswerIndex === idx
                          ? 'bg-gold-950/80 border-gold-500 text-gold-100 shadow-md shadow-gold-500/20'
                          : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 flex-shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Action & Feedback Footer */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-800 pt-6">
                <button
                  onClick={() => {
                    setCurrentHint(currentChal.hints[0]);
                    setShowHint(true);
                    audioManager.play('hint');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold"
                >
                  💡 Need a hint?
                </button>

                <button
                  onClick={handleChallengeSubmit}
                  disabled={userAnswerIndex === null && userNumericInput.trim() === ''}
                  className="w-full md:w-auto py-3 px-8 rounded-xl bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold text-sm shadow-lg shadow-gold-600/30 disabled:opacity-40"
                >
                  Submit Answer
                </button>
              </div>

              {/* Feedback Banner */}
              {challengeFeedback && (
                <div
                  className={`mt-6 p-4 rounded-xl border text-sm leading-relaxed ${
                    challengeIsCorrect
                      ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {challengeIsCorrect ? '✓ Excellent!' : '✗ Needs Revision'}
                  </div>
                  {challengeFeedback}
                </div>
              )}
            </div>

            {/* COMMON MISCONCEPTIONS EXPANDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-4">Curriculum Misconception Safeguards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-rose-400 mb-1">❌ Common Misconception</div>
                    <p className="text-xs text-slate-300 font-semibold mb-2">"{m.statement}"</p>
                    <div className="text-xs font-bold text-emerald-400 mb-1">✓ Scientific Reality</div>
                    <p className="text-xs text-slate-400">{m.correction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REAL-WORLD SUMMARY & CASE FILE */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
                  🔬
                </span>
                <div>
                  <h2 className="text-xl font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h2>
                  <p className="text-xs text-slate-400">Forensic Biotechnology & Human Genomics Application</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="space-y-4 mb-6">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs md:text-sm text-slate-300 mt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gold-950/40 border border-gold-500/30 flex justify-between items-center">
                <div>
                  <div className="text-xs text-gold-400 font-bold uppercase tracking-wider">Mastery Status</div>
                  <div className="text-lg font-bold text-white">
                    {completedChallenges.size} of {CHALLENGES.length} Modules Certified
                  </div>
                </div>
                <button
                  onClick={() => {
                    const finalScore = Math.round((completedChallenges.size / CHALLENGES.length) * 100);
                    recordGameScore('c12_bio_cbse_385', finalScore);
                    if (onComplete) onComplete(finalScore);
                    audioManager.play('celebration');
                    speechManager.speak('Module mastery record successfully saved.');
                  }}
                  className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
                >
                  Finalize & Export Certificate
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C12_BiologyMolecularBasisofInheritanceCBSESim;