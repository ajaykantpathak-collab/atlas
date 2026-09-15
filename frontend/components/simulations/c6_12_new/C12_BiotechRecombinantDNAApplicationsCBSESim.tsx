'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS FOR THIS SIMULATION
// ==========================================
const NODE_070 = 'c12_bt_cbse_070'; // Overview of DNA Fingerprinting
const NODE_071 = 'c12_bt_cbse_071'; // Human Genome Variation and Polymorphism
const NODE_072 = 'c12_bt_cbse_072'; // VNTRs: Variable Number Tandem Repeats
const NODE_073 = 'c12_bt_cbse_073'; // Microsatellites and Minisatellites
const NODE_074 = 'c12_bt_cbse_074'; // RFLP: Restriction Fragment Length Polymorphism
const NODE_075 = 'c12_bt_cbse_075'; // Southern Blotting and Hybridization
const NODE_076 = 'c12_bt_cbse_076'; // PCR Amplification in DNA Fingerprinting
const NODE_077 = 'c12_bt_cbse_077'; // Paternity and Maternity Testing via DNA Profiling
const NODE_078 = 'c12_bt_cbse_078'; // Forensic and Other Applications of DNA Fingerprinting
const NODE_079 = 'c12_bt_cbse_079'; // Transgenesis and Genetically Modified Organisms
const NODE_080 = 'c12_bt_cbse_080'; // Historical Development of GMO Technology
const NODE_081 = 'c12_bt_cbse_081'; // Agrobacterium tumefaciens-Mediated Plant Transformation
const NODE_082 = 'c12_bt_cbse_082'; // Ti Plasmid and T-DNA Mechanism
const NODE_083 = 'c12_bt_cbse_083'; // Plant Virus-Mediated Gene Transfer
const NODE_084 = 'c12_bt_cbse_084'; // Particle Bombardment (Biolistics/Gene Gun)
const NODE_085 = 'c12_bt_cbse_085'; // Protoplast Transformation and Electroporation
const NODE_086 = 'c12_bt_cbse_086'; // DNA Pronuclear Microinjection for Transgenic Animals
const NODE_087 = 'c12_bt_cbse_087'; // Embryonic Stem Cell-Mediated Gene Transfer
const NODE_088 = 'c12_bt_cbse_088'; // Retrovirus-Mediated Gene Transfer
const NODE_089 = 'c12_bt_cbse_089'; // Bt Cotton and cry Genes
const NODE_090 = 'c12_bt_cbse_090'; // Antisense Technology for Gene Silencing
const NODE_091 = 'c12_bt_cbse_091'; // RNA Interference (RNAi) Mechanism
const NODE_092 = 'c12_bt_cbse_092'; // Molecular Farming in Plants
const NODE_093 = 'c12_bt_cbse_093'; // Phytoremediation and Environmental Applications
const NODE_094 = 'c12_bt_cbse_094'; // Transgenic Animals for Molecular Pharming
const NODE_095 = 'c12_bt_cbse_095'; // Transgenic Animals in Research and Toxicity Testing
const NODE_096 = 'c12_bt_cbse_096'; // Concerns and Risks Associated with GMOs
const NODE_097 = 'c12_bt_cbse_097'; // GEAC and Regulatory Framework for GMOs
const NODE_098 = 'c12_bt_cbse_098'; // Gene Therapy: Concept and First Clinical Application
const NODE_099 = 'c12_bt_cbse_099'; // SCID and Adenosine Deaminase Deficiency
const NODE_100 = 'c12_bt_cbse_100'; // Gene Replacement and Gene Addition Therapy
const NODE_101 = 'c12_bt_cbse_101'; // Gene Inhibition and Gene Editing Therapies
const NODE_102 = 'c12_bt_cbse_102'; // Ex Vivo vs In Vivo Gene Therapy
const NODE_103 = 'c12_bt_cbse_103'; // Somatic vs Germ-Line Gene Therapy
const NODE_104 = 'c12_bt_cbse_104'; // Gene Augmentation, Inhibition, and Targeting Therapy
const NODE_105 = 'c12_bt_cbse_105'; // Merits and Demerits of Gene Therapy
const NODE_106 = 'c12_bt_cbse_106'; // Ethical Issues in Gene Therapy
const NODE_107 = 'c12_bt_cbse_107'; // Recombinant Vaccines: Concept and Advantages
const NODE_108 = 'c12_bt_cbse_108'; // Live Genetically Modified Vaccines
const NODE_109 = 'c12_bt_cbse_109'; // Recombinant Subunit Vaccines
const NODE_110 = 'c12_bt_cbse_110'; // DNA Vaccines
const NODE_111 = 'c12_bt_cbse_111'; // RNA/mRNA Vaccines
const NODE_112 = 'c12_bt_cbse_112'; // Vaccinia Virus Vector Platform
const NODE_113 = 'c12_bt_cbse_113'; // Monoclonal Antibodies: Concept and Types
const NODE_114 = 'c12_bt_cbse_114'; // Hybridoma Technology for Monoclonal Antibody Production
const NODE_115 = 'c12_bt_cbse_115'; // HAT Medium Selection in Hybridoma Technology
const NODE_116 = 'c12_bt_cbse_116'; // Chimeric and Humanized Antibodies
const NODE_117 = 'c12_bt_cbse_117'; // Insulin Structure and Biosynthetic Processing
const NODE_118 = 'c12_bt_cbse_118'; // Recombinant Human Insulin Production (Humulin)
const NODE_119 = 'c12_bt_cbse_119'; // Recombinant Human Growth Hormone Production
const NODE_120 = 'c12_bt_cbse_120'; // Edible Plant Vaccines

const ALL_NODE_IDS = [
  NODE_070, NODE_071, NODE_072, NODE_073, NODE_074, NODE_075, NODE_076, NODE_077, NODE_078, NODE_079,
  NODE_080, NODE_081, NODE_082, NODE_083, NODE_084, NODE_085, NODE_086, NODE_087, NODE_088, NODE_089,
  NODE_090, NODE_091, NODE_092, NODE_093, NODE_094, NODE_095, NODE_096, NODE_097, NODE_098, NODE_099,
  NODE_100, NODE_101, NODE_102, NODE_103, NODE_104, NODE_105, NODE_106, NODE_107, NODE_108, NODE_109,
  NODE_110, NODE_111, NODE_112, NODE_113, NODE_114, NODE_115, NODE_116, NODE_117, NODE_118, NODE_119,
  NODE_120
];

// ==========================================
// SCENARIO & DISCOVERY QUESTION
// ==========================================
const SCENARIO = {
  title: 'Advanced Applied Biotechnology Virtual Suite',
  intro: 'Welcome to the National Institute of Recombinant DNA Applications. You are appointed as lead biotechnologist overseeing cutting-edge genomic profiling, GMO crop engineering, somatic gene therapy, and biopharmaceutical manufacturing.',
  context: 'In this simulation lab, you will run gel electrophoresis for DNA fingerprinting, design Agrobacterium T-DNA plant transformations, execute RNAi gene silencing against agricultural pests, synthesize recombinant human insulin (Humulin), and screen hybridoma lines using HAT selection.'
};

const DISCOVERY_QUESTION = {
  question: 'When Eli Lilly mass-produced recombinant human insulin (Humulin) in E. coli, why could they NOT directly express the human proinsulin gene containing all three regions (Chain A, Chain B, and C-peptide) into functional insulin?',
  options: [
    'Bacteria lack the Golgi apparatus and convertase enzymes required for proteolytic cleavage of the C-peptide from proinsulin.',
    'Proinsulin is completely toxic to E. coli bacteria and instantly lyses the cell wall upon transcription.',
    'Bacteria use a totally different genetic code so the amino acid sequence of human insulin changes inside bacteria.',
    'The C-peptide sequence prevents double-stranded DNA replication inside bacterial plasmids.'
  ],
  correctIndex: 0,
  hintAfter: 'E. coli as a prokaryote lacks post-translational modification machinery like convertase enzymes present in human pancreatic beta cells. Hence, separate synthetic coding sequences for Chain A and Chain B had to be expressed and chemically linked via disulfide bonds in vitro!'
};

// ==========================================
// EXPLORATION STEPS (5 INTERACTIVE LABS)
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: DNA Profiling & RFLP Forensic Analysis',
    instruction: 'Adjust gel agarose concentration, electrophoresis voltage, and VNTR repeat allele probes to run DNA bands and match crime scene DNA with suspects.',
    interactionType: 'dna-gel-lab',
    nodeId: NODE_070,
  },
  {
    title: 'Lab 2: Agrobacterium Ti Plasmid Crop Transformation',
    instruction: 'Engineer the Ti plasmid by inserting target gene into T-DNA, disabling oncogenes (disarming), selecting promoters, and transforming plant callus.',
    interactionType: 'agrobacterium-lab',
    nodeId: NODE_081,
  },
  {
    title: 'Lab 3: RNA Interference (RNAi) Pest Resistance',
    instruction: 'Introduce sense and antisense cDNA construct to produce dsRNA, trigger Dicer slicing into siRNA, assemble RISC, and silence nematode transposons/genes.',
    interactionType: 'rnai-lab',
    nodeId: NODE_091,
  },
  {
    title: 'Lab 4: Humulin Biosynthesis & Chain Assembly',
    instruction: 'Express Chain A and Chain B genes separately in E. coli using beta-galactosidase fusion vectors, purify peptide chains, and oxidize disulfide bonds.',
    interactionType: 'insulin-lab',
    nodeId: NODE_118,
  },
  {
    title: 'Lab 5: Hybridoma Technology & HAT Medium Selection',
    instruction: 'Fuse immunized mouse spleen B-lymphocytes with HGPRT-deficient myeloma cells using PEG, then culture in HAT medium to isolate monoclonal antibodies.',
    interactionType: 'hybridoma-lab',
    nodeId: NODE_114,
  },
];

// ==========================================
// PREDICTION & OBSERVATION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen in a HAT selection culture if a cell line is HGPRT-negative and aminopterin blocks de novo nucleotide synthesis?',
    options: [
      'The cell line will die because aminopterin blocks de novo synthesis and HGPRT deficiency prevents utilization of hypoxanthine in salvage pathway.',
      'The cell line will divide faster by using thymidine kinase exclusively for purine synthesis.',
      'The cell line will switch to photosynthetic pathways to generate adenine and guanine.',
      'The cell line will mutate aminopterin into a nutrient supplement.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Test this in Lab 5 by setting cell genotype to HGPRT- and adding HAT medium.',
    nodeId: NODE_115,
  },
  {
    question: 'Predict: In RNA interference (RNAi), what is the key molecular species that directly guides the RISC complex to degrade specific target mRNA?',
    options: [
      'Single-stranded guide siRNA derived from cleavage of long double-stranded RNA by Dicer enzyme.',
      'Circular double-stranded plasmid DNA isolated from Agrobacterium tumefaciens.',
      'A synthetic antibody targeted against ribosomal RNA subunits.',
      'Unprocessed precursor pre-mRNA synthesized in human mitochondria.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Observe the RNAi cleavage reaction cascade in Lab 3.',
    nodeId: NODE_091,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In gel electrophoresis of restriction fragment length polymorphisms (RFLP), why do smaller DNA fragments migrate closer to the positive anode (+)?',
    options: [
      'Smaller molecular weight fragments experience less molecular sieving resistance through the agarose mesh matrix.',
      'Smaller DNA fragments have a higher net positive electrical charge than larger fragments.',
      'Smaller DNA fragments contain more phosphate groups per nucleotide unit.',
      'Smaller DNA fragments are repelled by the agarose sugar backbone.'
    ],
    correctIndex: 0,
    nodeId: NODE_074,
  },
  {
    question: 'Observation: When preparing recombinant human insulin (Humulin) using E. coli, why are Chain A and Chain B synthesized in separate bacterial cultures rather than together in one vector?',
    options: [
      'Separate expression prevents premature hydrophobic misfolding and aggregation, allowing precise chemical formation of inter-chain disulfide bonds in vitro.',
      'Chain A requires a high temperature while Chain B requires freezing temperatures to undergo translation.',
      'E. coli can only transcribe one gene per million cell divisions.',
      'Chain B is an RNA molecule while Chain A is a peptide molecule.'
    ],
    correctIndex: 0,
    nodeId: NODE_118,
  },
];

// ==========================================
// REAL-WORLD EXTENSION ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Scale Production of Bt Cotton & Monoclonal Therapies',
  description: 'Biotechnology engineers at Bharat Biotech and ICAR design genetically modified bollworm-resistant Bt cotton (using Cry1Ac and Cry2Ab genes) and diagnostic monoclonal antibodies for infectious diseases.',
  steps: [
    'Step 1: Isolate cry1Ac gene from Bacillus thuringiensis spores and clone into T-DNA vector between Right and Left borders.',
    'Step 2: Infect cotton plant explants with Agrobacterium strain LBA4404 carrying recombinant binary vector.',
    'Step 3: Select transformed callus on kanamycin medium and regenerate transgenic cotton plants via somatic embryogenesis.',
    'Step 4: Bioassay transgenic leaf tissues with Helicoverpa armigera (cotton bollworm) larvae to confirm 100% insect mortality via midgut pore formation.'
  ],
};

// ==========================================
// MISCONCEPTIONS (6)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    misconception: 'DNA fingerprinting analyzes the entire 3 billion base pair sequence of human coding genes.',
    correction: 'DNA profiling focuses primarily on highly variable, non-coding repetitive DNA sequences called Variable Number Tandem Repeats (VNTRs) or Short Tandem Repeats (STRs), not functional protein-coding genes.',
    nodeId: NODE_072,
  },
  {
    id: 'misc_2',
    misconception: 'Agrobacterium tumefaciens naturally causes beneficial gene insertion without modifying host plant tissue growth.',
    correction: 'Wild-type Agrobacterium induces Crown Gall disease by injecting oncogenes (iaaM, iaaH, ipt) that cause uncontrolled cell division. Biologists must "disarm" the Ti plasmid by removing tumor genes while retaining T-DNA borders.',
    nodeId: NODE_082,
  },
  {
    id: 'misc_3',
    misconception: 'RNA interference (RNAi) destroys host cell genomic DNA to prevent plant viral infection.',
    correction: 'RNAi operates strictly at the post-transcriptional mRNA level; it uses siRNA to target and degrade specific single-stranded mRNA molecules without altering nuclear genomic DNA.',
    nodeId: NODE_091,
  },
  {
    id: 'misc_4',
    misconception: 'Gene therapy always alters the germline cells so all future offspring inherit the modified gene.',
    correction: 'Current approved clinical gene therapies are Somatic Gene Therapies targeting somatic tissues (e.g. bone marrow stem cells in SCID ADA deficiency). Germ-line gene therapy is restricted due to ethical and safety concerns.',
    nodeId: NODE_103,
  },
  {
    id: 'misc_5',
    misconception: 'E. coli bacteria process human proinsulin into active insulin automatically after transcription.',
    correction: 'Prokaryotes lack endopeptidase/convertase enzymes to cleave C-peptide and Golgi networks to form native disulfide bonds. Hence recombinant insulin is made by expressing separate chains or refolding in vitro.',
    nodeId: NODE_117,
  },
  {
    id: 'misc_6',
    misconception: 'HAT medium kills unfused B-lymphocytes because they lack the HGPRT gene.',
    correction: 'Unfused B-lymphocytes carry normal HGPRT+, but they naturally die out within a few days in culture due to limited lifespan. HAT medium specifically kills unfused myeloma cells (which are immortal but HGPRT-).',
    nodeId: NODE_115,
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8)
// ==========================================
interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  nodeId: string;
  explanation: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'What type of repetitive DNA sequence serves as the primary basis for classic Southern-blot based DNA fingerprinting introduced by Alec Jeffreys?',
    options: [
      'VNTRs (Variable Number Tandem Repeats / Minisatellites)',
      'Histone promoter consensus sequences',
      'Ribosomal RNA multigene families',
      'Transfer RNA anticodon loops'
    ],
    correctIndex: 0,
    nodeId: NODE_072,
    explanation: 'Alec Jeffreys utilized VNTRs (minisatellites), which are non-coding repetitive DNA sequences varying in repeat copy number between individuals.'
  },
  {
    id: 'diag_2',
    question: 'Which specific region of the Ti plasmid in Agrobacterium tumefaciens is transferred and integrated into the plant nuclear genome?',
    options: [
      'T-DNA region flanked by 25-bp direct terminal repeats',
      'Vir region encoding virA, virB, virG operons',
      'Bacterial origin of replication (oriV)',
      'Opine catabolism genes outside the border sequences'
    ],
    correctIndex: 0,
    nodeId: NODE_082,
    explanation: 'Only the T-DNA (Transferred DNA), flanked by 25 bp right and left border repeat sequences, is excised and integrated into plant chromosome.'
  },
  {
    id: 'diag_3',
    question: 'What is the primary toxic mechanism of Cry toxins (e.g. Cry1Ac) produced by Bt cotton against insect larvae?',
    options: [
      'Binding to alkaline midgut epithelial cell receptors, creating ionic pores causing cell lysis and starvation.',
      'Inhibiting neuronal acetylcholinesterase in central nervous ganglia.',
      'Blocking respiratory electron transport complex IV in mitochondria.',
      'Degrading insect chitin synthesis during larval ecdysis.'
    ],
    correctIndex: 0,
    nodeId: NODE_089,
    explanation: 'In the alkaline pH of insect midgut, protoxin is solubilized, solubilized Cry toxin binds cadherin receptors, creates midgut membrane pores, causing cell lysis.'
  },
  {
    id: 'diag_4',
    question: 'In nematode resistant tobacco engineered via RNAi technology (Fire & Mello mechanism), what triggers the double-stranded RNA cascade?',
    options: [
      'Expression of both sense and antisense RNA fragments of an essential nematode gene (e.g., transposon or root-knot nematode gene).',
      'Microinjection of monoclonal antibodies against nematode cuticle proteins.',
      'Application of heavy metal ions to activate phytochelatin synthases.',
      'Deletion of the plant nuclear RNA polymerase II enzyme.'
    ],
    correctIndex: 0,
    nodeId: NODE_091,
    explanation: 'Using Agrobacterium vectors, introducing complementary sense and antisense RNA forms dsRNA in host plant, initiating Dicer slicing and siRNA-mediated RISC target silencing.'
  },
  {
    id: 'diag_5',
    question: 'The first clinical gene therapy (1990) conducted by W. French Anderson was administered to a 4-year-old girl suffering from which genetic enzyme deficiency?',
    options: [
      'Adenosine Deaminase (ADA) deficiency causing Severe Combined Immunodeficiency (SCID)',
      'Phenylalanine hydroxylase deficiency causing Phenylketonuria',
      'Glucose-6-phosphatase deficiency causing Von Gierke disease',
      'Factor VIII deficiency causing Hemophilia A'
    ],
    correctIndex: 0,
    nodeId: NODE_099,
    explanation: 'The historical 1990 trial treated ADA-SCID using retroviral vectors to introduce functional ADA cDNA into patient T-lymphocytes ex vivo.'
  },
  {
    id: 'diag_6',
    question: 'Why is Aminopterin an essential selective component of HAT (Hypoxanthine-Aminopterin-Thymidine) culture medium in hybridoma production?',
    options: [
      'It blocks dihydrofolate reductase (DHFR), inhibiting the de novo pathway for purine/pyrimidine nucleotide synthesis.',
      'It activates B-cell mitotic division while inducing apoptosis in macrophage cells.',
      'It acts as a nutrient substrate for the HGPRT enzyme salvage pathway.',
      'It degrades unfused antibody light chains.'
    ],
    correctIndex: 0,
    nodeId: NODE_115,
    explanation: 'Aminopterin blocks de novo nucleotide biosynthesis. Consequently, cells must rely on salvage pathway requiring HGPRT and Thymidine Kinase.'
  },
  {
    id: 'diag_7',
    question: 'Recombinant Human Insulin (Humulin) created by Eli Lilly in 1982 consists of how many total amino acids and disulphide linkages?',
    options: [
      '51 amino acids (Chain A: 21, Chain B: 30) linked by 2 inter-chain and 1 intra-chain disulfide bonds.',
      '100 amino acids (Chain A: 50, Chain B: 50) linked by 5 peptide bonds.',
      '31 amino acids connected directly as a single linear unbranched chain.',
      '84 amino acids including precursor C-peptide linked by non-covalent hydrogen bonds.'
    ],
    correctIndex: 0,
    nodeId: NODE_117,
    explanation: 'Mature active human insulin has 51 amino acids (A chain: 21 aa, B chain: 30 aa) with 2 inter-chain disulfide bonds (A7-B7, A20-B19) and 1 intra-chain bond (A6-A11).'
  },
  {
    id: 'diag_8',
    question: 'Which regulatory authority in India approves commercial releases and evaluates safety of Genetically Modified Organisms (GMOs)?',
    options: [
      'GEAC (Genetic Engineering Appraisal Committee under MoEFCC)',
      'ICMR (Indian Council of Medical Research)',
      'CSIR (Council of Scientific and Industrial Research)',
      'NITI Aayog Biotechnology Cell'
    ],
    correctIndex: 0,
    nodeId: NODE_097,
    explanation: 'GEAC (Genetic Engineering Appraisal Committee) under the Ministry of Environment, Forest and Climate Change regulates GM crop approvals and safety in India.'
  }
];

// ==========================================
// CHALLENGES (23 PROGRESSIVE CHALLENGES)
// Tiers: Foundation (7), Standard (8), Advanced (8)
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7) ---
  {
    id: 'ch_1',
    nodeId: NODE_070,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Who developed the technique of DNA Fingerprinting using VNTR probes?',
    options: ['Alec Jeffreys', 'Kary Mullis', 'Paul Berg', 'Stanley Cohen'],
    correctIndex: 0,
    explanation: 'Sir Alec Jeffreys developed DNA fingerprinting in 1984 at the University of Leicester using hypervariable minisatellite probes.',
    hints: ['He was a British geneticist.', 'Think of the father of DNA profiling.', 'Name begins with Alec.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_2',
    nodeId: NODE_081,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which soil bacterium is naturally known as Nature\'s Genetic Engineer due to its ability to transfer DNA into plant genomes?',
    options: ['Agrobacterium tumefaciens', 'Escherichia coli', 'Bacillus thuringiensis', 'Thermus aquaticus'],
    correctIndex: 0,
    explanation: 'Agrobacterium tumefaciens transfers its T-DNA naturally into dicot plant cells, making it Nature\'s genetic engineer.',
    hints: ['It causes crown gall disease in plants.', 'It contains the Ti plasmid.', 'Bacterium name starts with Agro.'],
    misconceptionIndex: 1
  },
  {
    id: 'ch_3',
    nodeId: NODE_089,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which protein crystal gene from Bacillus thuringiensis is targeted against cotton bollworms?',
    options: ['cry1Ac and cry2Ab', 'cry1Ab only', 'ampR gene', 'lacZ gene'],
    correctIndex: 0,
    explanation: 'cry1Ac and cry2Ab control cotton bollworm, while cry1Ab controls corn borer.',
    hints: ['Two cry genes target bollworms.', 'Includes cry1Ac and cry2Ab.', 'Option containing both cry1Ac & cry2Ab.'],
  },
  {
    id: 'ch_4',
    nodeId: NODE_098,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The first clinical gene therapy trial in 1990 treated a patient suffering from SCID due to deficiency of which enzyme?',
    options: ['Adenosine Deaminase (ADA)', 'Restriction Endonuclease EcoRI', 'T4 DNA Ligase', 'Taq Polymerase'],
    correctIndex: 0,
    explanation: 'Adenosine deaminase (ADA) deficiency causes SCID due to toxic accumulation of dATP damaging T-lymphocytes.',
    hints: ['ADA enzyme breaks down deoxyadenosine.', 'Enzyme name starts with Adenosine.', 'ADA deficiency.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_5',
    nodeId: NODE_117,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'How many total amino acid residues are present in mature functional human insulin?',
    options: ['51 amino acids', '84 amino acids', '21 amino acids', '110 amino acids'],
    correctIndex: 0,
    explanation: 'Mature insulin has 51 amino acids (Chain A has 21, Chain B has 30). Proinsulin has 84 amino acids before C-peptide cleavage.',
    hints: ['Chain A (21) + Chain B (30).', '21 + 30 = 51.', '51 amino acids.'],
    misconceptionIndex: 4
  },
  {
    id: 'ch_6',
    nodeId: NODE_113,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Monoclonal antibodies are produced by fusing antigen-stimulated B-lymphocytes with which immortal cell type?',
    options: ['Myeloma cells (cancerous plasma cells)', 'Red blood cells', 'Fibroblasts', 'Epithelial cells'],
    correctIndex: 0,
    explanation: 'Hybridoma technology fuses short-lived B-lymphocytes with immortal myeloma cells to form antibody-producing hybrid cells.',
    hints: ['They are cancerous B cells.', 'Immortal tumor cells of bone marrow.', 'Myeloma cells.'],
    misconceptionIndex: 5
  },
  {
    id: 'ch_7',
    nodeId: NODE_107,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following is a key safety advantage of Recombinant Subunit Vaccines over traditional live attenuated vaccines?',
    options: [
      'They contain no live pathogen, eliminating risk of reversion to virulent disease.',
      'They require zero refrigeration during global distribution.',
      'They modify human host genome permanently.',
      'They cure viral infections instantaneously without antibody production.'
    ],
    correctIndex: 0,
    explanation: 'Subunit vaccines contain only purified recombinant antigens (e.g. HBsAg for Hepatitis B), eliminating pathogenic reversion risk.',
    hints: ['No whole pathogen is introduced.', 'Cannot cause active disease.', 'Eliminates risk of reversion.'],
  },

  // --- STANDARD TIER (8) ---
  {
    id: 'ch_8',
    nodeId: NODE_074,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If a diploid genome sample has 4 VNTR loci with 3 distinct alleles per locus, how many total possible heterozygous allele combinations can theoretically be formed across these 4 loci?',
    correctAnswer: 81,
    tolerance: 1,
    explanation: 'For each locus with 3 alleles, total genotype combinations = n(n+1)/2 = 3(4)/2 = 6. Across 4 independent loci: 3^4 = 81 allele combinations.',
    hints: ['Calculate 3^4 combinations.', '3 * 3 * 3 * 3 = ?', 'Answer is 81.'],
  },
  {
    id: 'ch_9',
    nodeId: NODE_082,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'To prepare a "disarmed" Ti plasmid vector for plant transformation, which genes MUST be removed from the original T-DNA region?',
    options: [
      'Oncogenes responsible for auxin (iaaM/iaaH) and cytokinin (ipt) biosynthesis.',
      'Right and Left 25-bp border sequences.',
      'VirA and VirG sensor genes.',
      'Bacterial origin of replication.'
    ],
    correctIndex: 0,
    explanation: 'Disarming involves deleting tumor-inducing oncogenes (auxin/cytokinin synthesis genes) from T-DNA while keeping border sequences intact.',
    hints: ['Tumor formation is driven by phytohormones.', 'Auxin and cytokinin genes cause galls.', 'iaaM, iaaH, and ipt oncogenes.'],
    misconceptionIndex: 1
  },
  {
    id: 'ch_10',
    nodeId: NODE_091,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In the RNAi pathway, what is the enzymatic role of the Dicer RNase III endonuclease enzyme?',
    options: [
      'Cleaving long double-stranded RNA into 21-23 nucleotide small interfering RNAs (siRNAs).',
      'Ligating sticky ends of foreign DNA into host chromosomes.',
      'Synthesizing poly-A tails on messenger RNA transcripts.',
      'Phosphorylating tyrosine residues on cell surface receptors.'
    ],
    correctIndex: 0,
    explanation: 'Dicer recognizes long dsRNA and cleaves it into short 21–23 bp double-stranded siRNA fragments with 2-nucleotide 3\' overhangs.',
    hints: ['It acts like molecular scissors on dsRNA.', 'Cuts dsRNA into short 21-23 nt pieces.', 'Cleaves dsRNA into siRNAs.'],
    misconceptionIndex: 2
  },
  {
    id: 'ch_11',
    nodeId: NODE_115,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why do unfused HGPRT-deficient myeloma cells die when cultured in HAT medium?',
    options: [
      'Aminopterin blocks de novo nucleotide synthesis, and HGPRT deficiency prevents utilization of Hypoxanthine in salvage pathway.',
      'Thymidine in HAT medium acts as a direct cytotoxic poison to myeloma cell mitochondria.',
      'Unfused myeloma cells lack antibodies to neutralize polyethylene glycol (PEG).',
      'HAT medium lacks amino acids required for membrane synthesis.'
    ],
    correctIndex: 0,
    explanation: 'Aminopterin blocks de novo purine synthesis. HGPRT- myeloma cells cannot use hypoxanthine via salvage pathway, so they starve and die.',
    hints: ['De novo is blocked by Aminopterin.', 'Salvage pathway requires HGPRT.', 'Both pathways are unavailable to HGPRT- cells in HAT.'],
    misconceptionIndex: 5
  },
  {
    id: 'ch_12',
    nodeId: NODE_118,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In Eli Lilly\'s recombinant insulin production method, how were Chain A and Chain B joined together after separate bacterial extraction?',
    options: [
      'In vitro chemical oxidation to form native disulfide bonds between cysteine residues.',
      'In vivo splicing using yeast spliceosomes.',
      'Peptide bond synthesis using ribosomal cell-free extracts.',
      'Electroporation of fused bacterial cell membranes.'
    ],
    correctIndex: 0,
    explanation: 'Chain A and Chain B were extracted from separate E. coli cultures, purified, and mixed together under oxidizing conditions to form inter-chain disulfide bridges.',
    hints: ['Cysteine residues form disulfide bonds.', 'Chemical oxidation in vitro.', 'Forming disulfide links chemically.'],
    misconceptionIndex: 4
  },
  {
    id: 'ch_13',
    nodeId: NODE_102,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which statement accurately contrasts Ex Vivo gene therapy with In Vivo gene therapy?',
    options: [
      'Ex vivo involves removing patient cells, modifying them in vitro, and re-infusing them; in vivo delivers therapeutic genes directly into patient tissues.',
      'Ex vivo targets sperm or egg cells; in vivo targets muscle cells only.',
      'Ex vivo requires plant viral vectors; in vivo uses Agrobacterium.',
      'Ex vivo alters mitochondrial DNA; in vivo alters ribosomal RNA.'
    ],
    correctIndex: 0,
    explanation: 'Ex vivo therapy harvests target cells (e.g. bone marrow), modifies them outside body, and reinjects them. In vivo injects vector directly into patient body.',
    hints: ['Ex vivo means outside the body.', 'In vivo means inside the living body.', 'Cells extracted vs vector injected directly.'],
  },
  {
    id: 'ch_14',
    nodeId: NODE_111,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What lipid formulation nanoparticle (LNP) function is crucial for mRNA vaccines (like COVID-19 vaccines)?',
    options: [
      'Protecting fragile single-stranded mRNA from enzymatic degradation and facilitating cell membrane fusion/endocytosis.',
      'Replacing host cell genomic DNA with mRNA.',
      'Converting mRNA into double-stranded DNA inside extracellular fluid.',
      'Neutralizing host antibody immune responses.'
    ],
    correctIndex: 0,
    explanation: 'LNPs encapsulate delicate mRNA to prevent RNase destruction and enable passage across lipophilic eukaryotic cell membranes.',
    hints: ['RNA degrades rapidly in fluid.', 'Lipid nanoparticles coat mRNA.', 'Protects mRNA and enables intracellular delivery.'],
  },
  {
    id: 'ch_15',
    nodeId: NODE_094,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A transgenic cow ("Rosie") produced human alpha-lactalbumin enriched milk at 2.4 grams per liter. How many grams of human alpha-lactalbumin would be contained in a 250 liter yield?',
    correctAnswer: 600,
    tolerance: 5,
    explanation: '2.4 g/L * 250 L = 600 grams of human protein.',
    hints: ['Multiply concentration (2.4) by volume (250).', '2.4 * 250 = ?', 'Answer is 600.'],
  },

  // --- ADVANCED TIER (8) ---
  {
    id: 'ch_16',
    nodeId: NODE_075,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'During Southern Blotting in DNA fingerprinting, what is the purpose of treating the agarose gel with an alkaline solution (NaOH) before capillary transfer to nylon membrane?',
    options: [
      'Denaturing double-stranded DNA into single-stranded DNA to allow subsequent hybridization with single-stranded radiolabeled probes.',
      'Digesting high molecular weight DNA into restriction fragments.',
      'Neutralizing phosphate backbone charge to stop fragment migration.',
      'Staining agarose bands with fluorescent ethidium bromide.'
    ],
    correctIndex: 0,
    explanation: 'NaOH breaks hydrogen bonds, converting dsDNA into ssDNA so that probe strands can complementary base-pair during hybridization.',
    hints: ['Probes need single-stranded DNA to hybridize.', 'NaOH breaks hydrogen bonds between base pairs.', 'Denatures dsDNA into ssDNA.'],
  },
  {
    id: 'ch_17',
    nodeId: NODE_084,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In biolistics (gene gun transformation), what heavy microprojectiles are coated with recombinant DNA and accelerated at high velocity into plant target tissues?',
    options: [
      'Gold or Tungsten microparticles (1-2 um diameter)',
      'Calcium phosphate micro-crystals',
      'Aluminum oxide ceramic spheres',
      'Iron oxide magnetic nanorods'
    ],
    correctIndex: 0,
    explanation: 'High-density, inert microparticles of Gold or Tungsten (1-2 micrometer) are coated with DNA and fired using helium pressure gas shockwaves.',
    hints: ['Densely heavy, chemically inert metals.', 'Gold or Tungsten.', 'Gold microcarriers.'],
  },
  {
    id: 'ch_18',
    nodeId: NODE_090,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Flavr Savr tomato was engineered using antisense RNA technology against polygalacturonase (PG). What physiological phenotype resulted from this genetic modification?',
    options: [
      'Delayed fruit softening and extended shelf life by inhibiting pectin breakdown in cell walls.',
      'Increased resistance to glyphosate herbicides.',
      'Synthesis of bacterial Cry endotoxins in tomato leaves.',
      'Synthesis of human growth hormone in tomato seeds.'
    ],
    correctIndex: 0,
    explanation: 'Antisense RNA complementary to polygalacturonase mRNA blocked pectinase translation, slowing fruit cell wall degradation and delay softening.',
    hints: ['Polygalacturonase degrades pectin in fruit cell walls.', 'Antisense blocks enzyme synthesis.', 'Delayed softening and longer shelf life.'],
  },
  {
    id: 'ch_19',
    nodeId: NODE_104,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why is CRISPR-Cas9 genome editing classified as Gene Targeting/Correction rather than classic retroviral Gene Augmentation?',
    options: [
      'CRISPR-Cas9 introduces precise site-specific double-strand breaks guided by sgRNA to edit native loci, whereas retroviruses insert cDNA randomly into genome.',
      'CRISPR-Cas9 only functions in bacteria and cannot target human DNA.',
      'Retroviruses edit single nucleotides while CRISPR inserts entire chromosomes.',
      'CRISPR-Cas9 destroys all native host RNA without touching DNA.'
    ],
    correctIndex: 0,
    explanation: 'CRISPR-Cas9 uses a single guide RNA (sgRNA) to cut specific genomic loci for precise editing/correction, avoiding insertional mutagenesis risks of retroviral integration.',
    hints: ['Targeting is precise and site-specific.', 'sgRNA guides endonuclease to specific sequence.', 'Precise site-specific editing vs random retroviral integration.'],
  },
  {
    id: 'ch_20',
    nodeId: NODE_116,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is the structural difference between a Chimeric antibody and a Humanized antibody produced for therapeutic applications?',
    options: [
      'Chimeric antibodies contain murine variable domains (~33% mouse) fused to human constant domains; Humanized antibodies contain only murine CDR loops (~5-10% mouse) grafted into human framework.',
      'Chimeric antibodies are 100% bacterial; Humanized antibodies are 100% plant derived.',
      'Chimeric antibodies lack light chains; Humanized antibodies lack heavy chains.',
      'Chimeric antibodies have synthetic disulfide bridges; Humanized antibodies have peptide linkages.'
    ],
    correctIndex: 0,
    explanation: 'Humanized antibodies graft only the hypervariable Complementarity-Determining Regions (CDRs) from mouse onto human IgG framework, reducing immunogenicity (HAMA response).',
    hints: ['Humanized has less mouse sequence than chimeric.', 'CDRs only in humanized.', 'Chimeric has mouse V-regions; Humanized has only mouse CDRs.'],
  },
  {
    id: 'ch_21',
    nodeId: NODE_120,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is a major physiological challenge of Edible Vaccines produced in transgenic plants like bananas or potatoes?',
    options: [
      'Dosage standardization and potential degradation of vaccine protein antigens by gastric stomach acid/peptidases upon oral ingestion.',
      'Total toxicity of plant photosynthetic enzymes to human lymphocytes.',
      'Plant cell walls prevent all antibody generation in mucosal immunity.',
      'Edible vaccines trigger immediate viral replication inside mammalian enterocytes.'
    ],
    correctIndex: 0,
    explanation: 'Challenges include variable antigen expression levels (dosage regulation) and breakdown of protein immunogens in stomach acid prior to reaching mucosal Peyer\'s patches.',
    hints: ['Gastric acid degrades proteins.', 'Varying expression yields uncertain dosage.', 'Dosage variability and stomach acid breakdown.'],
  },
  {
    id: 'ch_22',
    nodeId: NODE_086,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In transgenic mouse production via pronuclear microinjection, into which specific structure of a fertilized zygote is foreign DNA injected?',
    options: [
      'Male pronucleus (which is larger and closer to egg surface prior to syngamy)',
      'Mitochondrial matrix',
      'Polar body nucleus',
      'Cytoplasmic vacuole'
    ],
    correctIndex: 0,
    explanation: 'DNA microinjection is performed into the larger, prominent male pronucleus of the fertilized egg before fusion of male and female pronuclei.',
    hints: ['Target is inside fertilized single-cell egg.', 'Inject into the larger male pronucleus.', 'Male pronucleus before syngamy.'],
  },
  {
    id: 'ch_23',
    nodeId: NODE_097,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Under Indian biotechnology regulatory laws, which committee functions under the Ministry of Environment, Forest and Climate Change (MoEFCC) to clear field trials and commercialization of transgenic crops?',
    options: [
      'Genetic Engineering Appraisal Committee (GEAC)',
      'Institutional Biosafety Committee (IBSC)',
      'Review Committee on Genetic Manipulation (RCGM)',
      'State Biotechnology Coordination Committee (SBCC)'
    ],
    correctIndex: 0,
    explanation: 'GEAC is the apex statutory body under MoEFCC responsible for evaluation of activities involving large-scale use of hazardous microorganisms and recombinants.',
    hints: ['Apex environmental appraisal committee.', 'GEAC.', 'Genetic Engineering Appraisal Committee.'],
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// 1. DNA Fingerprinting & Gel Electrophoresis Visualizer Component
const DNAFingerprintingDiagram: React.FC<{
  voltage: number;
  agarose: number;
  matchFound: boolean;
  activeSuspect: number;
}> = ({ voltage, agarose, matchFound, activeSuspect }) => {
  // Fragment migration speed is proportional to voltage and inversely proportional to agarose concentration
  const migrationFactor = (voltage / 100) * (1.5 / agarose);
  
  // Lane positions: Lane 1 = Ladder, Lane 2 = Evidence, Lane 3 = Suspect 1, Lane 4 = Suspect 2, Lane 5 = Suspect 3
  const ladderBands = [40, 70, 110, 160, 210, 260];
  const evidenceBands = [70, 160, 210]; // Matches Suspect 2
  const suspect1Bands = [50, 110, 260];
  const suspect2Bands = [70, 160, 210]; // Match!
  const suspect3Bands = [90, 140, 190];

  const getShiftedY = (baseY: number) => Math.min(270, 40 + baseY * migrationFactor * 0.85);

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-cyan-500/30 flex flex-col items-center">
      <div className="text-cyan-400 text-sm font-bold mb-2 flex justify-between w-full px-4">
        <span>ELECTROPHORESIS AGAROSE GEL TANK</span>
        <span className="text-yellow-400">Anode (+) Base | Cathode (-) Top</span>
      </div>

      <svg viewBox="0 0 500 320" className="w-full max-w-lg bg-slate-950 rounded-lg shadow-inner border border-slate-800">
        {/* Voltage Grid Lines */}
        <line x1="20" y1="35" x2="480" y2="35" stroke="#ef4444" strokeDasharray="4,4" strokeWidth="2" />
        <text x="25" y="30" fill="#ef4444" fontSize="10" fontWeight="bold">Cathode (-) 0V</text>

        <line x1="20" y1="290" x2="480" y2="290" stroke="#22c55e" strokeDasharray="4,4" strokeWidth="2" />
        <text x="25" y="305" fill="#22c55e" fontSize="10" fontWeight="bold">Anode (+) {voltage}V</text>

        {/* Wells Top */}
        {[70, 150, 230, 310, 390].map((x, i) => (
          <rect key={i} x={x - 15} y={40} width="30" height="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="2" />
        ))}

        {/* Lane Labels */}
        <text x="70" y="25" fill="#94a3b8" fontSize="10" textAnchor="middle">DNA Ladder</text>
        <text x="150" y="25" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Crime Scene</text>
        <text x="230" y="25" fill={activeSuspect === 1 ? '#38bdf8' : '#64748b'} fontSize="10" textAnchor="middle">Suspect 1</text>
        <text x="310" y="25" fill={activeSuspect === 2 ? '#22c55e' : '#64748b'} fontSize="10" fontWeight="bold" textAnchor="middle">Suspect 2</text>
        <text x="390" y="25" fill={activeSuspect === 3 ? '#38bdf8' : '#64748b'} fontSize="10" textAnchor="middle">Suspect 3</text>

        {/* DNA Bands */}
        {/* Ladder */}
        {ladderBands.map((b, idx) => (
          <rect key={'l' + idx} x="58" y={getShiftedY(b)} width="24" height="4" fill="#38bdf8" opacity="0.7" rx="1" />
        ))}

        {/* Evidence */}
        {evidenceBands.map((b, idx) => (
          <rect key={'e' + idx} x="138" y={getShiftedY(b)} width="24" height="4" fill="#f59e0b" opacity="0.95" rx="1" />
        ))}

        {/* Suspect 1 */}
        {suspect1Bands.map((b, idx) => (
          <rect key={'s1' + idx} x="218" y={getShiftedY(b)} width="24" height="4" fill="#38bdf8" opacity="0.8" rx="1" />
        ))}

        {/* Suspect 2 */}
        {suspect2Bands.map((b, idx) => (
          <rect key={'s2' + idx} x="298" y={getShiftedY(b)} width="24" height="4" fill={matchFound ? '#22c55e' : '#38bdf8'} opacity="0.95" rx="1" />
        ))}

        {/* Suspect 3 */}
        {suspect3Bands.map((b, idx) => (
          <rect key={'s3' + idx} x="378" y={getShiftedY(b)} width="24" height="4" fill="#38bdf8" opacity="0.8" rx="1" />
        ))}

        {/* Match Indicator highlight */}
        {matchFound && (
          <g>
            <rect x="290" y="35" width="40" height="255" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" rx="4">
              <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            </rect>
            <text x="310" y="280" fill="#22c55e" fontSize="11" fontWeight="bold" textAnchor="middle">100% MATCH!</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// 2. Agrobacterium Ti Plasmid & Plant Transformation Diagram
const AgrobacteriumTiPlasmidDiagram: React.FC<{
  disarmed: boolean;
  insertedGene: boolean;
  callusStage: string;
}> = ({ disarmed, insertedGene, callusStage }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-emerald-500/30 flex flex-col items-center">
      <div className="text-emerald-400 text-sm font-bold mb-2">AGROBACTERIUM T-DNA BINARY VECTOR SYSTEM</div>
      <svg viewBox="0 0 520 280" className="w-full max-w-lg bg-slate-950 rounded-lg shadow-inner border border-slate-800">
        {/* Ti Plasmid Circle */}
        <g transform="translate(130, 140)">
          <circle cx="0" cy="0" r="80" fill="none" stroke="#334155" strokeWidth="12" />
          
          {/* Vir Region */}
          <path d="M -56.5 56.5 A 80 80 0 0 1 -76 -25" fill="none" stroke="#eab308" strokeWidth="14" />
          <text x="-70" y="15" fill="#eab308" fontSize="10" fontWeight="bold">vir genes</text>

          {/* Ori */}
          <path d="M 25 76 A 80 80 0 0 1 -56.5 56.5" fill="none" stroke="#64748b" strokeWidth="14" />
          <text x="-15" y="70" fill="#cbd5e1" fontSize="9">oriV</text>

          {/* T-DNA Region */}
          <path d="M -25 -76 A 80 80 0 0 1 76 -25" fill="none" stroke={insertedGene ? '#10b981' : (disarmed ? '#3b82f6' : '#ef4444')} strokeWidth="16" />
          
          <text x="15" y="-55" fill={insertedGene ? '#10b981' : '#f87171'} fontSize="10" fontWeight="bold">
            {insertedGene ? 'T-DNA + Gene' : (disarmed ? 'Disarmed T-DNA' : 'Wild Oncogenes')}
          </text>

          {/* Borders */}
          <circle cx="-25" cy="-76" r="5" fill="#f97316" />
          <text x="-35" y="-85" fill="#f97316" fontSize="8" fontWeight="bold">LB</text>
          <circle cx="76" cy="-25" r="5" fill="#f97316" />
          <text x="82" y="-30" fill="#f97316" fontSize="8" fontWeight="bold">RB</text>
        </g>

        {/* Plant Transformation Flow */}
        <path d="M 230 140 L 290 140" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="4,4" />
        
        {/* Plant Cell Target */}
        <g transform="translate(390, 140)">
          <rect x="-70" y="-80" width="140" height="160" fill="#064e3b" stroke="#10b981" strokeWidth="3" rx="15" />
          <circle cx="0" cy="0" r="45" fill="#022c22" stroke="#34d399" strokeWidth="2" />
          <text x="0" y="-55" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Plant Host Cell</text>
          <text x="0" y="-20" fill="#6ee7b7" fontSize="9" textAnchor="middle">Nucleus</text>

          {/* Callus Stage Visual */}
          {callusStage === 'transformed' && insertedGene && disarmed && (
            <g>
              <path d="M -20 5 L 20 -10 L 10 20 Z" fill="#facc15" opacity="0.9" />
              <text x="0" y="30" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">Transgenic Callus!</text>
            </g>
          )}

          {callusStage === 'crown_gall' && !disarmed && (
            <g>
              <circle cx="0" cy="10" r="25" fill="#ef4444" opacity="0.8" />
              <text x="0" y="40" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">Crown Gall Tumor!</text>
            </g>
          )}

          {callusStage === 'untransformed' && (
            <text x="0" y="15" fill="#94a3b8" fontSize="9" textAnchor="middle">No Transformation</text>
          )}
        </g>
      </svg>
    </div>
  );
};

// 3. RNA Interference (RNAi) Mechanism Diagram Component
const RNAiMechanismDiagram: React.FC<{
  rnaiStep: number;
  geneSilenced: boolean;
}> = ({ rnaiStep, geneSilenced }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-indigo-500/30 flex flex-col items-center">
      <div className="text-indigo-400 text-sm font-bold mb-2">RNA INTERFERENCE (RNAi) MOLECULAR CASCADE</div>
      <svg viewBox="0 0 520 270" className="w-full max-w-lg bg-slate-950 rounded-lg shadow-inner border border-slate-800">
        {/* Step 1: dsRNA Precursor */}
        <g transform="translate(60, 60)">
          <rect x="-40" y="-20" width="80" height="40" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" rx="6" />
          <line x1="-30" y1="-8" x2="30" y2="-8" stroke="#818cf8" strokeWidth="3" />
          <line x1="-30" y1="8" x2="30" y2="8" stroke="#c084fc" strokeWidth="3" />
          <text x="0" y="-25" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">1. Long dsRNA</text>
        </g>

        {/* Step 2: Dicer Cleavage */}
        <g transform="translate(190, 60)">
          <polygon points="0,-25 35,0 0,25 -35,0" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
          <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">DICER</text>
          <text x="0" y="-30" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">2. RNase III Dicer</text>
        </g>

        {/* Step 3: siRNA duplex */}
        <g transform="translate(320, 60)">
          <line x1="-25" y1="-6" x2="25" y2="-6" stroke="#38bdf8" strokeWidth="3" />
          <line x1="-25" y1="6" x2="25" y2="6" stroke="#f43f5e" strokeWidth="3" />
          <text x="0" y="-25" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">3. siRNA (21-23 nt)</text>
        </g>

        {/* Step 4: RISC Loading & Slicing */}
        <g transform="translate(260, 180)">
          <circle cx="0" cy="0" r="50" fill="#312e81" stroke="#a855f7" strokeWidth="3" />
          <text x="0" y="-55" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">4. RISC Complex (Argonaute)</text>
          
          {/* Target mRNA passing through RISC */}
          <path d="M -100 0 L -40 0 C 0 -15 0 15 40 0 L 100 0" fill="none" stroke="#f59e0b" strokeWidth="4" />
          <text x="-70" y="-12" fill="#fbbf24" fontSize="9" fontWeight="bold">Target Nematode mRNA</text>

          {/* Guide strand pairing */}
          <line x1="-20" y1="5" x2="20" y2="5" stroke="#38bdf8" strokeWidth="3" />

          {geneSilenced && (
            <g>
              {/* Scissors cut symbol */}
              <text x="0" y="25" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">✂ CLEAVED!</text>
              <text x="0" y="42" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">mRNA Silenced - Nematode Dead</text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

// 4. Recombinant Human Insulin (Humulin) Structure Component
const HumulinInsulinDiagram: React.FC<{
  chainAExpress: boolean;
  chainBExpress: boolean;
  bondsFormed: boolean;
}> = ({ chainAExpress, chainBExpress, bondsFormed }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-sky-500/30 flex flex-col items-center">
      <div className="text-sky-400 text-sm font-bold mb-2">RECOMBINANT HUMAN INSULIN (HUMULIN) STRUCTURE</div>
      <svg viewBox="0 0 520 260" className="w-full max-w-lg bg-slate-950 rounded-lg shadow-inner border border-slate-800">
        {/* Chain A */}
        <g transform="translate(60, 70)">
          <rect x="0" y="0" width="400" height="24" rx="12" fill={chainAExpress ? '#0284c7' : '#334155'} stroke="#38bdf8" strokeWidth="2" />
          <text x="200" y="16" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
            {chainAExpress ? 'Chain A (21 Amino Acids - Gly1 to Cys21)' : 'Chain A Unexpressed'}
          </text>
        </g>

        {/* Chain B */}
        <g transform="translate(60, 170)">
          <rect x="0" y="0" width="400" height="24" rx="12" fill={chainBExpress ? '#0369a1' : '#334155'} stroke="#0284c7" strokeWidth="2" />
          <text x="200" y="16" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
            {chainBExpress ? 'Chain B (30 Amino Acids - Phe1 to Ala30)' : 'Chain B Unexpressed'}
          </text>
        </g>

        {/* Inter-chain Disulfide Bonds */}
        {bondsFormed && chainAExpress && chainBExpress && (
          <g>
            {/* A7 - B7 Disulfide Bond */}
            <line x1="140" y1="94" x2="140" y2="170" stroke="#facc15" strokeWidth="3" strokeDasharray="2,2" />
            <circle cx="140" cy="94" r="4" fill="#eab308" />
            <circle cx="140" cy="170" r="4" fill="#eab308" />
            <text x="145" y="135" fill="#facc15" fontSize="10" fontWeight="bold">S - S (A7-B7)</text>

            {/* A20 - B19 Disulfide Bond */}
            <line x1="340" y1="94" x2="340" y2="170" stroke="#facc15" strokeWidth="3" strokeDasharray="2,2" />
            <circle cx="340" cy="94" r="4" fill="#eab308" />
            <circle cx="340" cy="170" r="4" fill="#eab308" />
            <text x="275" y="135" fill="#facc15" fontSize="10" fontWeight="bold">S - S (A20-B19)</text>

            {/* Intra-chain A6-A11 Bond */}
            <path d="M 120 70 Q 150 45 180 70" fill="none" stroke="#facc15" strokeWidth="3" />
            <text x="150" y="42" fill="#facc15" fontSize="9" textAnchor="middle">S-S (A6-A11)</text>

            <text x="260" y="235" fill="#4ade80" fontSize="12" fontWeight="bold" textAnchor="middle">
              ACTIVE MATURE RECOMBINANT HUMULIN (51 aa)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// 5. Hybridoma Technology & HAT Selection Medium Diagram Component
const HybridomaTechDiagram: React.FC<{
  hatAdded: boolean;
  cellType: 'bcell' | 'myeloma' | 'hybridoma';
}> = ({ hatAdded, cellType }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-purple-500/30 flex flex-col items-center">
      <div className="text-purple-400 text-sm font-bold mb-2">HYBRIDOMA HAT MEDIUM SELECTION PATHWAY</div>
      <svg viewBox="0 0 520 270" className="w-full max-w-lg bg-slate-950 rounded-lg shadow-inner border border-slate-800">
        {/* De Novo Pathway */}
        <rect x="30" y="40" width="200" height="70" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" rx="8" />
        <text x="130" y="60" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">De Novo Nucleotide Synthesis</text>
        <text x="130" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">(PRPP → Purines / Pyrimidines)</text>

        {hatAdded && (
          <g>
            <line x1="40" y1="45" x2="220" y2="105" stroke="#ef4444" strokeWidth="4" />
            <line x1="40" y1="105" x2="220" y2="45" stroke="#ef4444" strokeWidth="4" />
            <text x="130" y="98" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">BLOCKED BY AMINOPTERIN!</text>
          </g>
        )}

        {/* Salvage Pathway */}
        <rect x="290" y="40" width="200" height="70" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" rx="8" />
        <text x="390" y="60" fill="#86efac" fontSize="10" fontWeight="bold" textAnchor="middle">Salvage Pathway (HGPRT + TK)</text>
        <text x="390" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">Hypoxanthine + Thymidine → DNA</text>

        {/* Cell Fate Box */}
        <rect x="130" y="160" width="260" height="90" fill="#0f172a" stroke="#64748b" strokeWidth="2" rx="10" />
        <text x="260" y="180" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">CULTURE SELECTION OUTCOME</text>

        {cellType === 'bcell' && (
          <text x="260" y="210" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
            B-Lymphocytes: HGPRT+, non-dividing → DIES IN 5 DAYS
          </text>
        )}

        {cellType === 'myeloma' && (
          <text x="260" y="210" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">
            {hatAdded ? 'Unfused Myeloma: HGPRT- → KILLED BY HAT!' : 'Unfused Myeloma: HGPRT- → Overgrows culture'}
          </text>
        )}

        {cellType === 'hybridoma' && (
          <g>
            <text x="260" y="205" fill="#22c55e" fontSize="12" fontWeight="bold" textAnchor="middle">
              ★ HYBRIDOMA CELL SURVIVES & MULTIPLIES!
            </text>
            <text x="260" y="230" fill="#86efac" fontSize="10" textAnchor="middle">
              (HGPRT+ from B-cell + Immortality from Myeloma)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};


// ==========================================
// MAIN SIMULATION COMPONENT
// ==========================================
export default function C12_BiotechRecombinantDNAApplicationsCBSESim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'diagnostics' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Discovery State
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // SRS and BKT State
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>({});
  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>({});
  const [totalScore, setTotalScore] = useState<number>(0);

  // UI Feedback States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [bannerMessage, setBannerMessage] = useState<string>('');
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Inactivity Timer for Auto Hints
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BKT and SRS items
  useEffect(() => {
    const initialBkt: Record<string, BKTState> = {};
    const initialSrs: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initialBkt[id] = createBKTState();
      initialSrs[id] = createReviewItem(id);
    });
    setBktStates(initialBkt);
    setSrsItems(initialSrs);

    // Initial voice introduction
    speechManager.speak("Welcome to Advanced Biotechnology Applications Lab. Explore DNA profiling, GMO crops, RNA interference, and recombinant biopharmaceuticals.");
  }, []);

  // Inactivity timer reset
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      setCurrentHintText("Need guidance? Click 'Hint' or explore the parameters in the lab panel.");
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  // LAB 1 STATE: DNA Fingerprinting
  const [gelVoltage, setGelVoltage] = useState<number>(100);
  const [agaroseConc, setAgaroseConc] = useState<number>(1.2);
  const [selectedSuspect, setSelectedSuspect] = useState<number>(2);

  // LAB 2 STATE: Agrobacterium Transformation
  const [isDisarmed, setIsDisarmed] = useState<boolean>(true);
  const [hasInsertedGene, setHasInsertedGene] = useState<boolean>(true);
  const [callusResult, setCallusResult] = useState<string>('transformed');

  // LAB 3 STATE: RNAi Silencing
  const [rnaiStep, setRnaiStep] = useState<number>(1);
  const [isSilenced, setIsSilenced] = useState<boolean>(true);

  // LAB 4 STATE: Recombinant Insulin
  const [expressChainA, setExpressChainA] = useState<boolean>(true);
  const [expressChainB, setExpressChainB] = useState<boolean>(true);
  const [disulfideFormed, setDisulfideFormed] = useState<boolean>(true);

  // LAB 5 STATE: Hybridoma & HAT
  const [hatAdded, setHatAdded] = useState<boolean>(true);
  const [selectedCellType, setSelectedCellType] = useState<'bcell' | 'myeloma' | 'hybridoma'>('hybridoma');

  // Diagnostic Quiz State
  const [currentDiagIndex, setCurrentDiagIndex] = useState<number>(0);
  const [selectedDiagOption, setSelectedDiagOption] = useState<number | null>(null);
  const [diagFeedback, setDiagFeedback] = useState<string | null>(null);
  const [diagScore, setDiagScore] = useState<number>(0);

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userAnswerIndex, setUserAnswerIndex] = useState<number | null>(null);
  const [userNumericAnswer, setUserNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Handle Discovery Question Answer
  const handleDiscoverySubmit = (index: number) => {
    setSelectedDiscoveryOption(index);
    setDiscoverySubmitted(true);

    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak("Correct! Prokaryotes lack post-translational enzymes to cut C-peptide from proinsulin.");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite. Consider post-translational protein modification in bacteria.");
    }
  };

  // Challenge Submission Logic
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (ch.type === 'numeric') {
      const val = parseFloat(userNumericAnswer);
      if (!isNaN(val) && ch.correctAnswer !== undefined && Math.abs(val - ch.correctAnswer) <= (ch.tolerance || 0.1)) {
        isCorrect = true;
      }
    } else {
      if (userAnswerIndex === ch.correctIndex) {
        isCorrect = true;
      }
    }

    // Update BKT & SRS
    const nodeId = ch.nodeId;
    const currentBkt = bktStates[nodeId] || createBKTState();
    const newBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates(prev => ({ ...prev, [nodeId]: newBkt }));

    const currentSrs = srsItems[nodeId] || createReviewItem(nodeId);
    const newSrs = sm2Update(currentSrs, isCorrect ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [nodeId]: newSrs }));

    if (isCorrect) {
      audioManager.play('celebration');
      speechManager.speak("Excellent work! That is correct.");
      setChallengeFeedback("Correct! " + ch.explanation);
      setCompletedChallenges(prev => new Set(prev).add(ch.id));
      setTotalScore(prev => prev + 10);

      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);

      if (completedChallenges.size + 1 === CHALLENGES.length) {
        setShowSuccessBanner(true);
        setBannerMessage("All 23 Biotechnology Challenges Completed!");
        recordGameScore('c12_bt_cbse_recombinant_dna', 100);
      }
    } else {
      audioManager.play('error');
      speechManager.speak("Incorrect. Review the hint and try again.");
      setChallengeFeedback("Incorrect. " + ch.explanation);
    }
  };

  // Diagnostic Quiz Handler
  const handleDiagSubmit = (optIndex: number) => {
    setSelectedDiagOption(optIndex);
    const q = DIAGNOSTIC_QUESTIONS[currentDiagIndex];
    if (optIndex === q.correctIndex) {
      audioManager.play('drop-correct');
      setDiagFeedback("Correct! " + q.explanation);
      setDiagScore(prev => prev + 1);
    } else {
      audioManager.play('drop-wrong');
      setDiagFeedback("Incorrect. " + q.explanation);
    }
  };

  const nextDiagQuestion = () => {
    if (currentDiagIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentDiagIndex(prev => prev + 1);
      setSelectedDiagOption(null);
      setDiagFeedback(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text={bannerMessage} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble show={showHint} text={currentHintText} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl mb-6 flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/80 border border-cyan-800 px-3 py-1 rounded-full">
            ISC / CBSE CLASS 12 BIOTECHNOLOGY
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 mt-2">
            Recombinant DNA Applications Virtual Suite
          </h1>
        </div>

        {/* TOP TAB NAVIGATION */}
        <nav className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {[
            { id: 'discovery', label: '1. Discovery' },
            { id: 'lab', label: '2. Interactive Labs' },
            { id: 'challenges', label: '3. Challenge Bank (23)' },
            { id: 'diagnostics', label: '4. Diagnostics' },
            { id: 'summary', label: '5. Summary & Real-World' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                audioManager.play('tap');
              }}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-6xl flex-grow">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & PREDICTIVE SCENARIO */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Scenario Card */}
            <div className="bg-slate-900/90 border border-cyan-500/40 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold text-cyan-300 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-cyan-200 text-xs md:text-sm">
                <strong>Lab Context: </strong>{SCENARIO.context}
              </div>
            </div>

            {/* Discovery Core Question */}
            <div className="bg-slate-900 border border-indigo-500/40 p-6 rounded-2xl shadow-xl">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Concept Probe</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-sm transition-all border ${
                      selectedDiscoveryOption === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-indigo-500/60'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-indigo-950/60 border border-indigo-800 text-indigo-200 text-xs md:text-sm leading-relaxed">
                  <strong>Scientific Insight: </strong> {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS RENDERING */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-md font-bold text-cyan-400">Hypothesis & Prediction Exercises</h3>
              {PREDICTION_QUESTIONS.map((pq, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-sm font-semibold text-slate-200 mb-2">{pq.question}</p>
                  <ul className="space-y-1 mb-2">
                    {pq.options.map((opt, oIdx) => (
                      <li key={oIdx} className="text-xs text-slate-400 pl-4 list-disc">{opt}</li>
                    ))}
                  </ul>
                  <div className="text-xs text-indigo-400 italic">Instruction: {pq.verifyInstruction}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE LAB SIMULATIONS */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('whoosh');
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeLabIndex === idx
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="p-4 bg-indigo-950/40 border border-indigo-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase">Interactive Objective</span>
                <p className="text-xs md:text-sm text-indigo-200">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>
              <button
                onClick={() => {
                  speechManager.speak(EXPLORATION_STEPS[activeLabIndex].instruction);
                  audioManager.play('pop');
                }}
                className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                🔊 Read
              </button>
            </div>

            {/* LAB 1: DNA Profiling */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DNAFingerprintingDiagram
                  voltage={gelVoltage}
                  agarose={agaroseConc}
                  matchFound={selectedSuspect === 2}
                  activeSuspect={selectedSuspect}
                />
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-cyan-400">Electrophoresis Parameter Control</h3>
                  
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Gel Voltage: <span className="font-bold text-cyan-400">{gelVoltage} V</span></label>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={gelVoltage}
                      onChange={(e) => setGelVoltage(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Agarose Matrix Conc: <span className="font-bold text-cyan-400">{agaroseConc}%</span></label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={agaroseConc}
                      onChange={(e) => setAgaroseConc(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-2">Select Suspect DNA Profile to Compare:</label>
                    <div className="flex gap-2">
                      {[1, 2, 3].map(num => (
                        <button
                          key={num}
                          onClick={() => {
                            setSelectedSuspect(num);
                            audioManager.play('click' as unknown as Parameters<typeof audioManager.play>[0]);
                          }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                            selectedSuspect === num
                              ? 'bg-cyan-600 border-cyan-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          Suspect {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-300 leading-relaxed border border-slate-800">
                    <strong>Forensic Analysis Note: </strong> VNTR alleles at loci D1S80 and TH01 match 100% with <span className="text-emerald-400 font-bold">Suspect 2</span>. Suspect 1 & 3 show non-matching restriction fragment length band patterns.
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: Agrobacterium Ti Plasmid */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AgrobacteriumTiPlasmidDiagram
                  disarmed={isDisarmed}
                  insertedGene={hasInsertedGene}
                  callusStage={callusResult}
                />
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-emerald-400">Ti Plasmid Genetic Engineering</h3>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-200">Disarm Plasmid (Remove Crown Gall Oncogenes):</span>
                    <button
                      onClick={() => {
                        setIsDisarmed(!isDisarmed);
                        audioManager.play('toggle' as unknown as Parameters<typeof audioManager.play>[0]);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                        isDisarmed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isDisarmed ? 'Disarmed' : 'Wild Type (Virulent)'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-200">Insert Target Foreign Gene into T-DNA:</span>
                    <button
                      onClick={() => {
                        setHasInsertedGene(!hasInsertedGene);
                        audioManager.play('toggle' as unknown as Parameters<typeof audioManager.play>[0]);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                        hasInsertedGene ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {hasInsertedGene ? 'Gene Inserted' : 'Empty Vector'}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (!isDisarmed) {
                        setCallusResult('crown_gall');
                        audioManager.play('error');
                      } else if (hasInsertedGene) {
                        setCallusResult('transformed');
                        audioManager.play('celebration');
                      } else {
                        setCallusResult('untransformed');
                        audioManager.play('pop');
                      }
                    }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20"
                  >
                    Infect Plant Explant & Regenerate Callus
                  </button>
                </div>
              </div>
            )}

            {/* LAB 3: RNA Interference */}
            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RNAiMechanismDiagram rnaiStep={rnaiStep} geneSilenced={isSilenced} />
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-indigo-400">RNAi Pathway Control</h3>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 block">RNAi Execution Step:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { step: 1, label: '1. dsRNA Expression' },
                        { step: 2, label: '2. Dicer Slicing' },
                        { step: 3, label: '3. RISC Loading' },
                        { step: 4, label: '4. Target mRNA Cleavage' }
                      ].map(s => (
                        <button
                          key={s.step}
                          onClick={() => {
                            setRnaiStep(s.step);
                            setIsSilenced(s.step === 4);
                            audioManager.play('click' as unknown as Parameters<typeof audioManager.play>[0]);
                          }}
                          className={`p-2 rounded-lg text-xs font-bold border ${
                            rnaiStep === s.step
                              ? 'bg-indigo-600 border-indigo-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong>Nematode Protection Status: </strong>
                    {isSilenced ? (
                      <span className="text-emerald-400 font-bold block mt-1">
                        Meloidogyne incognita mRNA destroyed! Tobacco plant exhibits 100% root-knot nematode resistance.
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold block mt-1">
                        RNAi incomplete. Nematode mRNA functional — root galls formed.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: Humulin Biosynthesis */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HumulinInsulinDiagram
                  chainAExpress={expressChainA}
                  chainBExpress={expressChainB}
                  bondsFormed={disulfideFormed}
                />
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-sky-400">Humulin Recombinant Expression</h3>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setExpressChainA(!expressChainA);
                        audioManager.play('toggle' as unknown as Parameters<typeof audioManager.play>[0]);
                      }}
                      className={`w-full p-3 rounded-xl text-xs font-bold border ${
                        expressChainA ? 'bg-sky-950 border-sky-500 text-sky-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Ferment E. coli Culture A (Chain A - 21 aa)
                    </button>

                    <button
                      onClick={() => {
                        setExpressChainB(!expressChainB);
                        audioManager.play('toggle' as unknown as Parameters<typeof audioManager.play>[0]);
                      }}
                      className={`w-full p-3 rounded-xl text-xs font-bold border ${
                        expressChainB ? 'bg-sky-950 border-sky-500 text-sky-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Ferment E. coli Culture B (Chain B - 30 aa)
                    </button>

                    <button
                      onClick={() => {
                        setDisulfideFormed(!disulfideFormed);
                        audioManager.play(disulfideFormed ? 'pop' : 'sparkle');
                      }}
                      className={`w-full p-3 rounded-xl text-xs font-bold border ${
                        disulfideFormed ? 'bg-yellow-950 border-yellow-500 text-yellow-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      In Vitro Oxidation (Form Inter-chain Disulfide Bonds)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: Hybridoma Selection */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HybridomaTechDiagram hatAdded={hatAdded} cellType={selectedCellType} />
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-purple-400">HAT Selection Control</h3>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-200">Add HAT Medium (Aminopterin + Hypoxanthine + Thymidine):</span>
                    <button
                      onClick={() => {
                        setHatAdded(!hatAdded);
                        audioManager.play('toggle' as unknown as Parameters<typeof audioManager.play>[0]);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                        hatAdded ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {hatAdded ? 'HAT Active' : 'Normal Medium'}
                    </button>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-2">Test Culture Cell Line:</label>
                    <div className="flex gap-2">
                      {[
                        { type: 'bcell', label: 'Unfused B-Cell' },
                        { type: 'myeloma', label: 'Unfused Myeloma' },
                        { type: 'hybridoma', label: 'Fused Hybridoma' }
                      ].map(c => (
                        <button
                          key={c.type}
                          onClick={() => {
                            setSelectedCellType(c.type as typeof selectedCellType);
                            audioManager.play('click' as unknown as Parameters<typeof audioManager.play>[0]);
                          }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                            selectedCellType === c.type
                              ? 'bg-purple-600 border-purple-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS RENDERING */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-md font-bold text-indigo-400">Lab Observation Questions</h3>
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-sm font-semibold text-slate-200 mb-2">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2 rounded text-xs border ${
                          oIdx === oq.correctIndex
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: CHALLENGE BANK (23 QUESTIONS) */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Progress Header */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Challenge Completion</span>
                <div className="text-lg font-bold text-cyan-400">
                  {completedChallenges.size} / {CHALLENGES.length} Completed
                </div>
              </div>
              <div className="flex gap-1">
                {CHALLENGES.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentChallengeIndex(idx);
                      setUserAnswerIndex(null);
                      setUserNumericAnswer('');
                      setChallengeFeedback(null);
                    }}
                    className={`w-7 h-7 rounded text-xs font-bold border ${
                      completedChallenges.has(ch.id)
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : currentChallengeIndex === idx
                        ? 'bg-cyan-600 border-cyan-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Challenge Card */}
            {(() => {
              const ch = CHALLENGES[currentChallengeIndex];
              return (
                <div className="bg-slate-900 border border-cyan-500/30 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full">
                      {ch.difficulty} • Competency: {ch.competencyLevel}
                    </span>
                    <span className="text-xs text-slate-400">Node: {ch.nodeId}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100">{ch.question}</h3>

                  {/* Multiple Choice Options */}
                  {ch.type === 'multiple-choice' && ch.options && (
                    <div className="grid grid-cols-1 gap-3">
                      {ch.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => setUserAnswerIndex(oIdx)}
                          className={`p-4 rounded-xl text-left text-sm border transition-all ${
                            userAnswerIndex === oIdx
                              ? 'bg-cyan-950 border-cyan-400 text-cyan-100'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Numeric Input */}
                  {ch.type === 'numeric' && (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-300 block">Enter calculated numeric value:</label>
                      <input
                        type="number"
                        value={userNumericAnswer}
                        onChange={(e) => setUserNumericAnswer(e.target.value)}
                        placeholder="Type answer..."
                        className="w-full max-w-xs p-3 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 font-bold text-lg focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  )}

                  {/* Submit Button & Feedback */}
                  <div className="pt-2 flex flex-col md:flex-row gap-3 items-center justify-between">
                    <button
                      onClick={handleChallengeSubmit}
                      className="w-full md:w-auto px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-600/20"
                    >
                      Submit Answer
                    </button>

                    <button
                      onClick={() => {
                        const hint = ch.hints[0] || "Review the simulation parameters.";
                        setCurrentHintText(hint);
                        setShowHint(true);
                        audioManager.play('hint');
                      }}
                      className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-semibold"
                    >
                      💡 Need Hint?
                    </button>
                  </div>

                  {challengeFeedback && (
                    <div className={`p-4 rounded-xl text-xs md:text-sm border ${
                      challengeFeedback.startsWith('Correct')
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                    }`}>
                      {challengeFeedback}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: DIAGNOSTIC EVALUATION */}
        {/* ========================================== */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-purple-500/30 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-purple-400 uppercase">Diagnostic Assessment ({currentDiagIndex + 1} / {DIAGNOSTIC_QUESTIONS.length})</span>
                <span className="text-xs text-slate-400">Score: {diagScore}</span>
              </div>

              {(() => {
                const dq = DIAGNOSTIC_QUESTIONS[currentDiagIndex];
                return (
                  <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-bold text-slate-100">{dq.question}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {dq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleDiagSubmit(oIdx)}
                          className={`p-4 rounded-xl text-left text-sm border transition-all ${
                            selectedDiagOption === oIdx
                              ? oIdx === dq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/50'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {diagFeedback && (
                      <div className="p-4 bg-purple-950/60 border border-purple-800 rounded-xl text-xs md:text-sm text-purple-200">
                        {diagFeedback}
                      </div>
                    )}

                    {selectedDiagOption !== null && currentDiagIndex < DIAGNOSTIC_QUESTIONS.length - 1 && (
                      <button
                        onClick={nextDiagQuestion}
                        className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-all"
                      >
                        Next Diagnostic Question →
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 5: SUMMARY & REAL-WORLD ACTIVITY */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-slate-900 border border-emerald-500/40 p-6 rounded-2xl shadow-xl space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Industrial Case Study</span>
              <h2 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-emerald-400 uppercase">Standard Operating Procedure (SOP):</h3>
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions & Corrections */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-md font-bold text-cyan-400">Key Misconceptions & Clarifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map(m => (
                  <div key={m.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-rose-400 block">❌ Misconception:</span>
                    <p className="text-xs text-slate-300">{m.misconception}</p>
                    <span className="text-xs font-bold text-emerald-400 block pt-1">✔ Correction:</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{m.correction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-6xl mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
        CISCE / CBSE Class 12 Biotechnology • Recombinant DNA Technology Applications Simulation Suite
      </footer>
    </div>
  );
}

export default C12_BiotechRecombinantDNAApplicationsCBSESim;