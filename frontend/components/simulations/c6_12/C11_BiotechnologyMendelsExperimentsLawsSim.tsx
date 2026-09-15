'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── MANDATORY NODE CONSTANTS ───
const NODE_C11_BIOTECH_041 = 'c11_biotech_041';
const NODE_C11_BIOTECH_042 = 'c11_biotech_042';
const NODE_C11_BIOTECH_043 = 'c11_biotech_043';
const NODE_C11_BIOTECH_044 = 'c11_biotech_044';
const NODE_C11_BIOTECH_045 = 'c11_biotech_045';
const NODE_C11_BIOTECH_046 = 'c11_biotech_046';
const NODE_C11_BIOTECH_047 = 'c11_biotech_047';
const NODE_C11_BIOTECH_048 = 'c11_biotech_048';
const NODE_C11_BIOTECH_049 = 'c11_biotech_049';
const NODE_C11_BIOTECH_050 = 'c11_biotech_050';

const ALL_NODE_IDS = [
  NODE_C11_BIOTECH_041,
  NODE_C11_BIOTECH_042,
  NODE_C11_BIOTECH_043,
  NODE_C11_BIOTECH_044,
  NODE_C11_BIOTECH_045,
  NODE_C11_BIOTECH_046,
  NODE_C11_BIOTECH_047,
  NODE_C11_BIOTECH_048,
  NODE_C11_BIOTECH_049,
  NODE_C11_BIOTECH_050,
];

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If two heterozygous tall pea plants (Tt × Tt) are crossed, what percentage of the offspring will display the dwarf phenotype?',
    options: ['0%', '25% (1 in 4)', '50% (2 in 4)', '75% (3 in 4)'],
    correctIndex: 1,
    verifyInstruction: 'Set Parent 1 to Tt and Parent 2 to Tt in the Punnett visualizer to verify the 3:1 phenotypic ratio (25% tt dwarf).',
    explanation: 'Crossing Tt × Tt yields 1 TT : 2 Tt : 1 tt. Only the homozygous recessive genotype (tt, 25%) produces the dwarf phenotype because the T allele is completely dominant.',
  },
  {
    id: 'pred_2',
    question: 'What will happen to viable and non-viable cells when Trypan Blue exclusion dye is added to a cell suspension?',
    options: [
      'Both viable and non-viable cells will turn dark blue',
      'Viable cells turn blue while non-viable cells remain clear',
      'Viable cells exclude the dye and remain clear, whereas non-viable cells take up dye and turn blue',
      'All cells will immediately lyse and disappear',
    ],
    verifyInstruction: 'Toggle Trypan Blue stain in the Haemocytometer exploration tool and observe which cells turn blue.',
    explanation: 'Trypan blue is excluded by intact, viable cell membranes (leaving live cells clear). Dead or dying cells with compromised membranes permit dye entry, staining them blue.',
  },
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (WHAT DO YOU NOTICE?) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Observe the FACS sorting animation: What causes the fluorophore-tagged target cells to deflect away from the main stream into collection tubes?',
    observableOptions: [
      'High-velocity sheath fluid turbulence',
      'Electrostatic charging of droplets interacting with high-voltage deflection plates',
      'Gravitational sedimentation of heavier cells',
      'Direct optical pressure from the excitation laser beam',
    ],
    correctIndex: 1,
    explanation: 'Target cells identified by the laser detector receive an electrostatic charge at the droplet break-off point. As they fall between oppositely charged deflection plates, electrostatic force steers them into specific collection tubes.',
  },
  {
    id: 'obs_2',
    question: 'Observe the Inborn Errors metabolic pathway when Phenylalanine Hydroxylase (PAH) is blocked: What happens to downstream Tyrosine and upstream Phenylalanine?',
    observableOptions: [
      'Tyrosine increases while Phenylalanine decreases to zero',
      'Phenylalanine accumulates and converts to neurotoxic phenylpyruvate, while Tyrosine synthesis is blocked',
      'Both Phenylalanine and Melanin increase simultaneously',
      'Homogentisic acid is directly excreted without any pathway changes',
    ],
    correctIndex: 1,
    explanation: 'When PAH is mutated or deficient, phenylalanine cannot be converted to tyrosine. It accumulates in blood/tissues and undergoes transamination into toxic phenylpyruvate and phenylketones (PKU), while tyrosine becomes conditionally essential.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The National Genomics & Cell Culture Mission',
  intro: 'Welcome, Junior Biotechnologist! You have been recruited to the National Biotech Research Hub at CCMB Hyderabad & AIIMS. Your mission spans the complete pipeline of genetics: from Mendel’s pea laws to chromosomal karyotyping, metabolic error diagnostics, oncogene mapping, aseptic bioprocess sterilisation, and laser-guided FACS cell sorting.',
  context: 'Master the fundamental laws of heredity, cytogenetics, laboratory instrumentation, and quantitative viability assays to build life-saving biotechnological solutions for India and the global community.',
};

// ─── DISCOVERY QUESTION (HOOK) ───
const DISCOVERY_QUESTION = {
  question: 'In a dihybrid cross of heterozygous pea plants (RrYy × RrYy), if you plant 1,600 F2 seeds, how many would you theoretically expect to be round with green seeds?',
  options: [
    '900 seeds (9/16)',
    '300 seeds (3/16)',
    '100 seeds (1/16)',
    '400 seeds (1/4)',
  ],
  correctIndex: 1,
  hintAfter: 'Remember Mendel’s 9:3:3:1 ratio! Round-green is a recombinant phenotype with expected probability 3/16 (3/16 × 1600 = 300). Let us explore the core genetics and cell techniques behind this!',
};

// ─── INTERFACES ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface MisconceptionItem {
  misconception: string;
  correction: string;
}

interface DiagnosticItem {
  question: string;
  options: string[];
  correctIndex: number;
}

interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: MisconceptionItem[];
  diagnosticQuestions?: DiagnosticItem[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BIOTECH_041,
  title: "Mendelian Genetics, Mutations, Bioprocessing & Cell Analysis",
  definition: "Comprehensive ISC Class 11 Biotechnology suite covering Mendelian inheritance, genetic terminology, chromosomal and gene mutations, metabolic errors, linkage/cancer genetics, lab instrumentation, sterilisation protocols, and FACS/haemocytometry cell analysis.",
  eli5: "Genes are recipes in DNA cookbooks. Mendel discovered how parents share recipes with babies in 3:1 or 9:3:3:1 ratios. When letters change, it creates mutations; when chromosomes fail to split, syndromes happen. In the lab, we use sterile hoods, autoclaves, and laser sorters (FACS) to count and heal cells.",
  misconceptions: [
    { misconception: "An allele is merely 'a form of a gene' without specifying its location.", correction: "An allele is one of two or more alternative forms of a gene occupying the same locus on homologous chromosomes." },
    { misconception: "In sickle cell anaemia, valine is replaced by glutamic acid.", correction: "Glutamic acid at position 6 of the beta-globin chain is replaced by valine (Glu → Val), making HbS polymerise under low oxygen." },
    { misconception: "Down's syndrome is caused by trisomy of chromosome 22 or is a sex chromosome disorder.", correction: "Down's syndrome is an autosomal trisomy of chromosome 21 (47, XX,+21 or 47, XY,+21), not a sex-linked disorder." },
    { misconception: "Laminar Air Flow (LAF) hoods sterilise objects placed inside them like an autoclave.", correction: "LAF hoods only provide a sterile stream of HEPA-filtered air to protect work; items must be pre-sterilised before entry." },
    { misconception: "Trypan blue stains living cells blue while dead cells stay clear.", correction: "Trypan blue is an exclusion dye: viable cells with intact membranes exclude it (clear), whereas non-viable cells with damaged membranes take it up (blue)." }
  ],
  diagnosticQuestions: [
    { question: "What is the phenotypic ratio of a standard Mendelian monohybrid F2 cross?", options: ["1:2:1", "3:1", "9:3:3:1", "1:1"], correctIndex: 1 },
    { question: "Which condition represents a male with 47, XXY karyotype?", options: ["Turner's syndrome", "Down's syndrome", "Klinefelter's syndrome", "Cri-du-chat syndrome"], correctIndex: 2 },
    { question: "Which enzyme is deficient in Phenylketonuria (PKU)?", options: ["Tyrosinase", "Homogentisic acid oxidase", "Phenylalanine hydroxylase", "Hexosaminidase A"], correctIndex: 2 },
    { question: "What is standard autoclaving operating temperature and pressure?", options: ["100°C at 5 psi", "121°C at 15 psi for 15-20 min", "160°C at 30 psi", "180°C dry heat"], correctIndex: 1 },
    { question: "In gene mapping, 1% Cross Over Value (COV) is equal to:", options: ["1 centimetre", "1 centiMorgan (cM) / map unit", "100 base pairs", "1 kilobase"], correctIndex: 1 },
    { question: "Which method is mandatory for sterilising heat-sensitive vitamins and antibiotic solutions?", options: ["Autoclaving at 121°C", "Hot air oven at 180°C", "0.22 µm membrane microfiltration", "UV light in LAF"], correctIndex: 2 },
    { question: "Which instrument allows observation of adherent animal cells from the bottom of a T-flask?", options: ["Compound light microscope", "Inverted microscope", "Dissecting stereomicroscope", "Colony counter"], correctIndex: 1 },
    { question: "In FACS, how are target cell droplets deflected into collection tubes?", options: ["Magnetic field (MACS)", "Centrifugal force", "Electrostatic deflection plates", "Porous nylon mesh"], correctIndex: 2 }
  ],
  masteryCriteria: "Demonstrate mastery over Mendelian crosses, mutation classification, metabolic blockages, cancer genetics, laboratory sterilisation workflows, and quantitative haemocytometer viability calculations."
};

// ─── 7 INTERACTIVE EXPLORATION MODULES ───
const EXPLORATION_STEPS = [
  {
    title: '1. Mendelian Pea Genetics & Law of Segregation',
    instruction: 'Adjust the parental allele configurations (Tall / Dwarf) to simulate monohybrid and dihybrid crosses and view real-time Punnett outcomes.',
    interactionType: 'slider-punnett',
    nodeId: NODE_C11_BIOTECH_041,
  },
  {
    title: '2. Chromosomal Karyotypes & Aneuploidy Non-Disjunction',
    instruction: 'Select karyotype profiles (Normal 46,XY, Turner 45,XO, Klinefelter 47,XXY, Down 47,+21) to examine chromosome pairing and meiotic causes.',
    interactionType: 'karyotype-viewer',
    nodeId: NODE_C11_BIOTECH_044,
  },
  {
    title: '3. Inborn Metabolic Pathways & Biochemical Blockages',
    instruction: 'Select individual metabolic enzyme steps (Phenylalanine → Tyrosine → Melanin / Homogentisate) to trigger inborn errors and view clinical biomarkers.',
    interactionType: 'pathway-block',
    nodeId: NODE_C11_BIOTECH_045,
  },
  {
    title: '4. Bioprocess Sterilisation & Laboratory Aseptic Workstation',
    instruction: 'Assign laboratory consumables and media to their validated sterilisation equipment (Autoclave, Hot Air Oven, 0.22µm Filter, Hypochlorite, LAF Hood).',
    interactionType: 'sterilise-matcher',
    nodeId: NODE_C11_BIOTECH_049,
  },
  {
    title: '5. Laser-Activated Cell Sorting (FACS) Physics',
    instruction: 'Tune laser excitation wavelength, sheath fluid velocity, and charging voltage to observe electrostatic deflection of fluorophore-tagged cells.',
    interactionType: 'facs-counter',
    nodeId: NODE_C11_BIOTECH_050,
  },
  {
    title: '6. Haemocytometry & Trypan Blue Dye Exclusion Assay',
    instruction: 'Examine the Neubauer haemocytometer grid, count viable clear cells vs non-viable blue cells, and compute cell density and percentage viability.',
    interactionType: 'haemocytometer-grid',
    nodeId: NODE_C11_BIOTECH_050,
  },
  {
    title: '7. Gene Linkage, Recombination & Chromosome Mapping',
    instruction: 'Calculate Cross Over Values (COV) from two-point and three-point test cross progeny counts to construct linear chromosome linkage maps.',
    interactionType: 'linkage-mapper',
    nodeId: NODE_C11_BIOTECH_046,
  },
];

// ─── 24 COMPREHENSIVE CHALLENGES (NEP 2020 / CISCE 2026) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Mendel Monohybrid
  {
    id: 'ch_mendel_01',
    nodeId: NODE_C11_BIOTECH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Mendel’s Law of Segregation, what happens to the two alleles of a gene during gametogenesis?',
    options: [
      'They fuse permanently into a blended allele',
      'They separate during anaphase I of meiosis so each gamete gets only one allele',
      'They duplicate into four identical alleles in every gamete',
      'They are eliminated and rebuilt from amino acids',
    ],
    correctIndex: 1,
    explanation: 'The Law of Segregation states that allele pairs separate during meiosis (anaphase I) so that each haploid gamete carries only one allele for each gene locus.',
    hints: [
      'Think about chromosome movement during anaphase I of meiosis.',
      'Gametes are haploid (n), carrying half the somatic genetic material.',
      'The paired alleles physically separate so gametes receive exactly one copy.'
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation: Genetic Terminology
  {
    id: 'ch_term_02',
    nodeId: NODE_C11_BIOTECH_042,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are human males (XY) described as hemizygous for genes located on the non-pseudoautosomal region of the X chromosome?',
    options: [
      'They have two dominant copies of the X chromosome',
      'They possess only one single X chromosome and no matching allele on the smaller Y chromosome',
      'They carry half-sized genes that underwent partial deletion',
      'Their X chromosome has undergone polyploid duplication',
    ],
    correctIndex: 1,
    explanation: 'Hemizygosity is the state of possessing only a single allele for a gene locus. In human males (46,XY), X-linked genes have no counterpart on the Y chromosome, so a single recessive allele (e.g., for haemophilia) will be expressed.',
    hints: [
      'Look at the sex chromosome constitution of males (XY vs XX).',
      'Hemizygous comes from "hemi" meaning single or half-represented pair.',
      'Because there is no second X to carry a dominant masking allele, the single allele is always expressed.'
    ],
    misconceptionIndex: 0,
  },

  // 3. Foundation: Mutation types
  {
    id: 'ch_mut_03',
    nodeId: NODE_C11_BIOTECH_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following describes the molecular point mutation responsible for sickle cell anaemia?',
    options: [
      'Deletion of an entire chromosome 11',
      'Single base substitution (GAG → GTG) replacing glutamic acid with valine at position 6 of the β-globin chain',
      'Substitution of valine with glutamic acid at codon 12',
      'Trisomy of the haemoglobin beta gene locus',
    ],
    correctIndex: 1,
    explanation: 'Sickle cell anaemia is caused by a transversion point mutation (A to T) converting the GAG codon to GUG (GTG in DNA), substituting glutamic acid (polar) with valine (non-polar) at the 6th position of the β-globin polypeptide.',
    hints: [
      'Remember: "Glu goes, Val comes".',
      'It is a single nucleotide substitution, not a whole chromosome deletion.',
      'The 6th amino acid of the beta chain changes from acidic Glu to hydrophobic Val.'
    ],
    misconceptionIndex: 1,
  },

  // 4. Foundation: Syndromes
  {
    id: 'ch_syn_04',
    nodeId: NODE_C11_BIOTECH_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A cytogenetics report from AIIMS records a karyotype of 45,XO. Which clinical syndrome and phenotype does this represent?',
    options: [
      'Klinefelter’s syndrome; phenotypically male with gynaecomastia',
      'Down’s syndrome; autosomal trisomy with simian crease',
      'Turner’s syndrome; phenotypically female with short stature, webbed neck, and streak ovaries',
      'Superfemale syndrome; 47,XXX karyotype',
    ],
    correctIndex: 2,
    explanation: '45,XO represents Turner’s syndrome—a viable sex-chromosome monosomy where females possess a single X chromosome, resulting in streak gonads, short stature, and webbed neck.',
    hints: [
      'Count the chromosomes: 45 means one sex chromosome is missing (monosomy X).',
      'The patient has no Y chromosome and only one X.',
      'This classic monosomy presents in females as Turner’s syndrome.'
    ],
    misconceptionIndex: 2,
  },

  // 5. Foundation: Instruments & LAF
  {
    id: 'ch_inst_05',
    nodeId: NODE_C11_BIOTECH_048,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary function of a Laminar Air Flow (LAF) hood in cell culture?',
    options: [
      'To heat-sterilise media bottles at 121°C',
      'To blow a continuous, unidirectional stream of HEPA-filtered clean air to provide a sterile working zone',
      'To centrifuge cell suspensions at 10,000 RPM',
      'To measure the pH of bicarbonate buffered solutions',
    ],
    correctIndex: 1,
    explanation: 'A LAF hood provides a sterile, particulate-free workspace by passing air through high-efficiency particulate air (HEPA) filters in a smooth laminar flow. It does NOT sterilise non-sterile objects placed inside.',
    hints: [
      'Laminar means smooth, unbroken airflow in one direction.',
      'HEPA filters trap bacteria and fungal spores from room air.',
      'The hood protects open culture vessels from airborne contamination.'
    ],
    misconceptionIndex: 3,
  },

  // 6. Foundation: Drag-Label Sterilisation Methods
  {
    id: 'ch_ster_06',
    nodeId: NODE_C11_BIOTECH_049,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Match each biotechnology material to its standard validated sterilisation method:',
    dragItems: [
      { label: 'Autoclave (121°C, 15 psi)', targetId: 'target_media' },
      { label: '0.22 µm Membrane Filter', targetId: 'target_serum' },
      { label: 'Hot Air Oven (160-180°C)', targetId: 'target_glass' },
      { label: '1% Sodium Hypochlorite', targetId: 'target_explant' },
    ],
    correctMapping: {
      target_media: 'Autoclave (121°C, 15 psi)',
      target_serum: '0.22 µm Membrane Filter',
      target_glass: 'Hot Air Oven (160-180°C)',
      target_explant: '1% Sodium Hypochlorite',
    },
    explanation: 'Nutrient basal media is autoclaved; heat-labile serum/vitamins require 0.22 µm microfiltration; dry empty glassware goes in the hot air oven; living plant explants undergo surface sterilisation with sodium hypochlorite.',
    hints: [
      'Heat-labile vitamins and serum denature under steam; filter them instead.',
      'Moist steam under pressure (121°C) penetrates aqueous basal media.',
      'Dry heat at 160-180°C sterilises empty glassware; chemicals sterilise living tissue.'
    ],
  },

  // 7. Standard: Dihybrid Cross Calculation
  {
    id: 'ch_mendel_07',
    nodeId: NODE_C11_BIOTECH_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a dihybrid test cross (RrYy × rryy) yielding 800 total offspring, calculate the expected number of wrinkled green (rryy) progeny:',
    correctAnswer: 200,
    tolerance: 0,
    unit: 'plants',
    explanation: 'A dihybrid test cross with a homozygous double recessive tester (rryy) yields a 1:1:1:1 ratio. 1/4 of 800 = 200 plants with wrinkled green phenotype (rryy).',
    hints: [
      'A test cross is with a double homozygous recessive parent (rryy).',
      'The test cross phenotypic ratio is 1:1:1:1 (25% each).',
      'Calculate 800 × 0.25 = 200.'
    ],
  },

  // 8. Standard: Gene Mapping & COV
  {
    id: 'ch_cov_08',
    nodeId: NODE_C11_BIOTECH_046,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a test cross of AaBb × aabb, 1000 offspring were counted: 440 AB, 420 ab, 75 Ab, and 65 aB. Calculate the Cross Over Value (COV) in centiMorgans (cM):',
    correctAnswer: 14,
    tolerance: 0.5,
    unit: 'cM',
    explanation: 'Recombinant offspring = 75 (Ab) + 65 (aB) = 140. Total offspring = 1000. COV = (140 / 1000) × 100% = 14%. 1% recombination = 1 cM, so the map distance is 14 cM.',
    hints: [
      'Identify the recombinant classes: the two smaller groups (75 and 65).',
      'Sum the recombinants and divide by the total number of offspring (1000).',
      'Multiply by 100 to get percentage; 1% COV = 1 cM.'
    ],
  },

  // 9. Standard: Inborn Errors Pathway Analysis
  {
    id: 'ch_inborn_09',
    nodeId: NODE_C11_BIOTECH_045,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A patient presents with dark urine that turns black upon standing in air and arthritis in adulthood (ochronosis). Which enzyme deficiency and accumulated metabolite are responsible?',
    options: [
      'Phenylalanine hydroxylase deficiency with phenylalanine accumulation (PKU)',
      'Tyrosinase deficiency with DOPA quinone deficiency (Albinism)',
      'Homogentisic acid oxidase deficiency causing accumulation and oxidation of homogentisic acid (Alkaptonuria)',
      'Adenosine deaminase deficiency causing dATP toxicity (SCID)',
    ],
    correctIndex: 2,
    explanation: 'Alkaptonuria (black urine disease) is caused by a deficiency of homogentisic acid oxidase in the tyrosine degradation pathway. Homogentisate builds up, oxidises in air to an alkapton pigment, and deposits in joint cartilage (ochronosis).',
    hints: [
      'Look for the hallmark symptom: urine turning black on standing in air.',
      'The disorder involves the catabolic pathway of phenylalanine and tyrosine.',
      'The missing enzyme is homogentisic acid oxidase.'
    ],
  },

  // 10. Standard: Drag-Sort FACS Workflow
  {
    id: 'ch_facs_10',
    nodeId: NODE_C11_BIOTECH_050,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events in Fluorescence-Activated Cell Sorting (FACS) from start to finish:',
    sortItems: [
      'Incubate single-cell suspension with fluorophore-conjugated antibodies',
      'Pass cells single-file through focused laser excitation beam',
      'Measure emitted fluorescence and forward/side scatter signals',
      'Electrostatically charge droplets containing target cells',
      'Deflect charged droplets into specific collection tubes using high-voltage plates',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The validated FACS protocol: 1) Fluorescent antibody labelling, 2) Hydrodynamic focusing through laser beam, 3) Optical signal detection, 4) Droplet charging, 5) Electrostatic deflection.',
    hints: [
      'First, cells must be tagged with fluorescent antibodies before entering the machine.',
      'Laser excitation and scatter detection precede droplet formation.',
      'Droplets are charged right before passing between high-voltage deflection plates.'
    ],
  },

  // 11. Standard: Oncogenes vs Tumour Suppressors
  {
    id: 'ch_cancer_11',
    nodeId: NODE_C11_BIOTECH_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do Tumour Suppressor Genes (e.g., p53, Rb) differ functionally from Proto-Oncogenes (e.g., Ras, Myc) at the cellular genetic level?',
    options: [
      'TSGs require gain-of-function in one allele; Proto-oncogenes require loss of both alleles',
      'TSGs normally act as cell-cycle brakes and require loss-of-function in both alleles; Proto-oncogenes drive proliferation and become oncogenes via dominant gain-of-function mutations',
      'Proto-oncogenes trigger apoptosis; TSGs stimulate angiogenesis',
      'Both must undergo polyploidy to cause malignancy',
    ],
    correctIndex: 1,
    explanation: 'Tumour suppressor genes act like brakes (recessive loss-of-function at cellular level, both alleles knocked out), whereas proto-oncogenes are gas pedals that become oncogenic through gain-of-function mutations in a single allele.',
    hints: [
      'Think of car controls: one is a brake, the other is an accelerator.',
      'p53 is the "guardian of the genome" that halts division or induces apoptosis.',
      'Ras acts like a jammed accelerator pedal when mutated.'
    ],
  },

  // 12. Standard: Cancer Targeted Therapy (Imatinib)
  {
    id: 'ch_cancer_12',
    nodeId: NODE_C11_BIOTECH_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Chronic Myeloid Leukaemia (CML), reciprocal translocation between chromosomes 9 and 22 creates the BCR-ABL Philadelphia chromosome. What is the mechanism of the targeted drug Imatinib (Gleevec)?',
    options: [
      'Non-specific alkylation of all dividing DNA strands',
      'Specific competitive inhibition of the ATP-binding pocket of the constitutively active BCR-ABL tyrosine kinase',
      'Monoclonal antibody binding to cell-surface CD20 receptors',
      'Inhibition of RNA polymerase II in bacterial endospores',
    ],
    correctIndex: 1,
    explanation: 'Imatinib is a precision small-molecule kinase inhibitor that docks into the ATP-binding site of the chimeric BCR-ABL oncoprotein, selectively shutting off its oncogenic downstream signalling.',
    hints: [
      'BCR-ABL is an abnormal, constantly active tyrosine kinase.',
      'Imatinib is a targeted therapy, not broad cytotoxic chemotherapy.',
      'It blocks the ATP binding site to prevent phosphorylation of target proteins.'
    ],
  },

  // 13. Standard: Haemocytometer Viability Calculation
  {
    id: 'ch_haemo_13',
    nodeId: NODE_C11_BIOTECH_050,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 1:1 mixture of cell suspension and Trypan blue was loaded onto a haemocytometer. In 5 large squares (0.1 mm³ each, total volume = 0.5 mm³ = 0.5 × 10⁻⁴ mL), you counted 320 total cells, of which 40 were stained blue. Calculate the percentage cell viability:',
    correctAnswer: 87.5,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Viable (unstained clear) cells = 320 total - 40 dead = 280. Percentage viability = (280 / 320) × 100% = 87.5%.',
    hints: [
      'Viable cells are the clear, unstained cells: 320 - 40 = 280.',
      'Formula: (Viable Cells / Total Cells) × 100.',
      '280 divided by 320 equals 0.875, or 87.5%.'
    ],
  },

  // 14. Advanced: Chromosomal Aneuploidy Mechanisms
  {
    id: 'ch_aneu_14',
    nodeId: NODE_C11_BIOTECH_043,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A human karyotype reveals 47,XY,+21. If this trisomy originated from maternal meiotic non-disjunction, during which specific stage did the failure of segregation occur?',
    options: [
      'Failure of homologous chromosomes 21 to separate during Anaphase I, or failure of sister chromatids to separate during Anaphase II',
      'Failure of crossing over during Pachytene of prophase I',
      'Premature cytokinesis during telophase II',
      'Chromosomal inversion during S phase replication',
    ],
    correctIndex: 0,
    explanation: 'Aneuploidies like Down’s syndrome arise from non-disjunction: either homologous chromosomes fail to separate in Anaphase I, or sister chromatids fail to disjoin in Anaphase II, leading to n+1 gametes.',
    hints: [
      'Non-disjunction is the failure of chromosome separation.',
      'In meiosis I, homologues separate at anaphase I; in meiosis II, sister chromatids separate at anaphase II.',
      'Both meiotic stages can yield n+1 gametes upon non-disjunction.'
    ],
  },

  // 15. Advanced: Construct PKU Treatment Diet
  {
    id: 'ch_pku_15',
    nodeId: NODE_C11_BIOTECH_045,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the scientifically accurate dietary strategy for a newborn diagnosed with Classic Phenylketonuria (PKU):',
    availableParts: [
      'Strictly eliminate all phenylalanine forever (0 mg/day)',
      'Controlled low-phenylalanine medical formula',
      'Supplementary L-Tyrosine intake',
      'High protein diet with whole milk and meat',
      'Regular blood Phe monitoring (120-360 µmol/L)',
    ],
    targetState: 'Controlled low-phenylalanine medical formula Supplementary L-Tyrosine intake Regular blood Phe monitoring (120-360 µmol/L)',
    validationHint: 'Select only the 3 components that provide essential Phe for growth without toxicity, supplement the newly essential tyrosine, and maintain safe blood monitoring.',
    explanation: 'Phenylalanine is essential and cannot be reduced to 0 (which causes fatal protein deficiency). The correct strategy combines a controlled low-Phe formula, supplemental Tyrosine (now conditionally essential), and routine blood monitoring.',
    hints: [
      'Phenylalanine is an essential amino acid—it cannot be completely eliminated without causing death.',
      'Because Phe cannot be converted to Tyr, Tyrosine becomes an essential dietary amino acid.',
      'Target blood Phe levels must be monitored between 120 and 360 µmol/L.'
    ],
  },

  // 16. Advanced: Recombination & Gene Mapping Construct
  {
    id: 'ch_map_16',
    nodeId: NODE_C11_BIOTECH_046,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Three linked genes A, B, and C in Drosophila show the following pairwise recombination frequencies: A-B = 9 cM, B-C = 14 cM, and A-C = 5 cM. What is the correct linear order of these genes on the chromosome?',
    options: [
      'A - B - C',
      'B - A - C',
      'A - C - B',
      'C - B - A',
    ],
    correctIndex: 1,
    explanation: 'The greatest distance is B-C (14 cM). The distances B-A (9 cM) + A-C (5 cM) = 14 cM. Therefore, gene A is positioned in the middle between B and C: B — 9 cM — A — 5 cM — C (or C-A-B).',
    hints: [
      'The two furthest genes define the outside ends of the map (B and C with 14 cM).',
      'Check if B-A (9) + A-C (5) = B-C (14).',
      'Since 9 + 5 = 14, A must be situated in between B and C.'
    ],
  },

  // 17. Advanced: Polyploidy in Agriculture
  {
    id: 'ch_poly_17',
    nodeId: NODE_C11_BIOTECH_043,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Modern Indian bread wheat, Triticum aestivum, is an allohexaploid (2n = 6x = 42). What genetic mechanism created this crop and why is polyploidy advantageous in plant biotechnology compared to animals?',
    options: [
      'Monosomic non-disjunction of chromosome 21; causes giant seed syndrome',
      'Interspecific hybridisation followed by chromosome doubling (allopolyploidy); plants tolerate extra gene dosage and gain increased cell size (gigas effect), vigour, and environmental buffering',
      'Radiation-induced point mutations in chlorophyll biosynthesis genes',
      'Transformation via Agrobacterium tumefaciens plasmid vector alone',
    ],
    correctIndex: 1,
    explanation: 'Triticum aestivum originated from hybridisation of three distinct diploid grass ancestors followed by genome doubling. Plants tolerate multiple chromosome sets and exhibit the "gigas" effect—larger grains, robustness, and hybrid vigour.',
    hints: [
      'Hexaploid means 6 sets of chromosomes (6x = 42, base n = 7).',
      'It combines genomes from three ancestral wild grass species.',
      'Unlike animals, polyploid plants exhibit enhanced vigour and larger organ size.'
    ],
  },

  // 18. Advanced: Plant Tissue Culture Hormone Ratio
  {
    id: 'ch_ptc_18',
    nodeId: NODE_C11_BIOTECH_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In plant tissue culture (Skoog & Miller principle), how do varying ratios of Auxin to Cytokinin regulate organogenesis from an undifferentiated callus?',
    options: [
      'High Auxin:Cytokinin induces root differentiation; High Cytokinin:Auxin induces shoot differentiation; Balanced ratio maintains unorganised callus',
      'High Cytokinin always induces roots; High Auxin induces flowers',
      'Auxin alone induces somatic embryogenesis while Cytokinin kills cells',
      'Hormone ratios have no effect on totipotency in vitro',
    ],
    correctIndex: 0,
    explanation: 'According to Skoog and Miller: High Auxin : Low Cytokinin promotes rhizogenesis (roots); High Cytokinin : Low Auxin promotes caulogenesis (shoots); intermediate balanced ratios maintain callus proliferation.',
    hints: [
      'Auxin is predominantly for root development (think rooting powders).',
      'Cytokinin stimulates cell division and shoot bud differentiation.',
      'A high cytokinin-to-auxin ratio makes leafy green shoots.'
    ],
  },

  // 19. Advanced: Haemocytometer Concentration Full Calculation
  {
    id: 'ch_haemo_num_19',
    nodeId: NODE_C11_BIOTECH_050,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'You diluted a mammalian CHO cell culture 1:10 (dilution factor = 10). On a standard haemocytometer, you counted 250 viable cells across the 4 corner large squares and 1 central large square (5 large squares total). Calculate the original stock cell concentration in units of 10⁶ cells/mL:',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: '× 10⁶ cells/mL',
    explanation: 'Volume of 5 large squares = 5 × 0.1 mm³ = 0.5 mm³ = 0.5 × 10⁻⁴ mL. Viable cells/mL in diluted sample = 250 / (0.5 × 10⁻⁴) = 500 × 10⁴ = 5.0 × 10⁵ cells/mL. Multiplying by dilution factor 10 gives 5.0 × 10⁶ cells/mL.',
    hints: [
      'Average count per large square = 250 / 5 = 50 cells/square.',
      'Standard formula: (Average count per square) × (Dilution Factor) × 10⁴ = cells/mL.',
      '50 × 10 × 10,000 = 5,000,000 = 5.0 × 10⁶ cells/mL.'
    ],
  },

  // 20. Advanced: Colony Counter vs Haemocytometer
  {
    id: 'ch_inst_20',
    nodeId: NODE_C11_BIOTECH_048,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why can a haemocytometer count both total cells and evaluate membrane viability, while a colony counter measures only viable colony-forming units (CFU)?',
    options: [
      'A haemocytometer uses direct microscopic visual inspection with Trypan blue dye exclusion on individual cells in suspension; a colony counter relies on living cells multiplying into visible colonies on solid agar',
      'A colony counter uses high voltage laser beams like FACS to vaporise dead bacteria',
      'A haemocytometer can only be used with bacterial spores',
      'Colony counters count dead cells while haemocytometers only count live viruses',
    ],
    correctIndex: 0,
    explanation: 'A haemocytometer allows direct optical examination of individual cells in a known liquid volume (with Trypan blue revealing intact vs compromised membranes), whereas a colony counter tallies macroscopic colonies grown on agar from viable proliferating units.',
    hints: [
      'Think about the physical sample: liquid suspension vs solid agar plate.',
      'Trypan blue dye exclusion requires immediate microscopic viewing of cells.',
      'Colony counting requires 24-48 hours of incubation for single living cells to form colonies.'
    ],
  },

  // 21. Advanced: Bioethics & Biosafety Regulatory (GEAC & BSL)
  {
    id: 'ch_biosaf_21',
    nodeId: NODE_C11_BIOTECH_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In India, which apex statutory body under the Ministry of Environment, Forest and Climate Change approves the environmental release of Genetically Modified Organisms (e.g., Bt cotton, GM mustard)?',
    options: [
      'ICMR (Indian Council of Medical Research)',
      'GEAC (Genetic Engineering Appraisal Committee)',
      'CSIR (Council of Scientific and Industrial Research)',
      'AIIMS Ethics Committee',
    ],
    correctIndex: 1,
    explanation: 'The Genetic Engineering Appraisal Committee (GEAC) is the apex statutory regulatory body in India responsible for approving proposals involving large-scale commercial use and environmental release of GMOs and GM crops.',
    hints: [
      'It operates under the Environment Protection Act 1986.',
      'The acronym stands for Genetic Engineering Appraisal Committee.',
      'GEAC reviews biosafety trials for Bt cotton and transgenic crops.'
    ],
  },

  // 22. Advanced: Cancer Multi-step Carcinogenesis
  {
    id: 'ch_cancer_22',
    nodeId: NODE_C11_BIOTECH_046,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does full malignant transformation of normal human somatic cells typically require mutations in BOTH oncogenes (e.g., Ras activation) and tumour suppressor genes (e.g., p53 loss)?',
    options: [
      'Because oncogene activation alone triggers p53-mediated oncogene-induced senescence or apoptosis as a protective safeguard; cancer only progresses when the p53 apoptotic brake is also disabled',
      'Because tumour suppressor genes only exist in bacteria',
      'Because one gene controls chromosome number and the other controls ribosomal RNA translation',
      'Because cancer requires immediate polyploidization into 8n',
    ],
    correctIndex: 0,
    explanation: 'Normal cells possess intrinsic tumour suppressor safeguards: hyperactive oncogenic signalling (such as mutated Ras) activates p53 to force cell cycle arrest or apoptosis. Malignancy requires disabling this p53 brake alongside oncogene activation (multi-hit hypothesis).',
    hints: [
      'Think about cellular safeguards: if you push the accelerator, normal cells apply emergency brakes.',
      'p53 senses excessive oncogene signals and triggers programmed cell death (apoptosis).',
      'For a tumour to survive and proliferate uncontrollably, the cell must simultaneously push the gas and cut the brake lines.'
    ],
  },

  // 23. Advanced: Inverted vs Upright Microscope Application
  {
    id: 'ch_micro_23',
    nodeId: NODE_C11_BIOTECH_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is an Inverted Phase Contrast Microscope mandatory for inspecting mammalian adherent cell cultures in polystyrene T-flasks, rather than a standard compound upright microscope?',
    options: [
      'Because light sources in standard upright microscopes destroy plastic T-flasks',
      'Because in an inverted microscope, objectives are positioned below the stage and the condenser above, allowing adequate working distance through thick vessel bottoms and liquid media without dipping into culture',
      'Because inverted microscopes use radioactive electron beams that penetrate polystyrene',
      'Because animal cells only reflect polarized ultraviolet light',
    ],
    correctIndex: 1,
    explanation: 'Inverted microscopes have the objective lenses positioned underneath the specimen stage and long-working-distance condensers above. This configuration accommodates bulky culture flasks, Petri dishes, and roller bottles while imaging adherent cells attached to the flask bottom through liquid medium.',
    hints: [
      'Consider the physical height and thickness of a cell culture flask.',
      'Objectives need to be very close to cells growing on the floor of the flask.',
      'Standard upright microscopes have short working distances and cannot focus through the depth of media and plastic.'
    ],
  },

  // 24. Advanced: Pedigree Analysis Autosomal Recessive
  {
    id: 'ch_ped_24',
    nodeId: NODE_C11_BIOTECH_042,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a clinical genetic pedigree at AIIMS, two phenotypically unaffected parents have an affected child with Albinism. What are the parental genotypes and what is the exact probability that their next child will be an unaffected carrier?',
    options: [
      'Parents are AA × aa; carrier probability is 100%',
      'Parents are both heterozygous Aa; probability of unaffected carrier child (Aa) is 50% (2/4)',
      'Parents are Aa × AA; carrier probability is 25%',
      'Parents are aa × aa; carrier probability is 0%',
    ],
    correctIndex: 1,
    explanation: 'Albinism is an autosomal recessive condition (aa). For unaffected parents to produce an affected child (aa), both parents must be carriers (Aa). A cross Aa × Aa yields 1 AA (normal) : 2 Aa (carrier) : 1 aa (affected). Thus, the probability of an unaffected carrier (Aa) is 2/4 = 50%.',
    hints: [
      'Since the child is homozygous recessive (aa), each parent must donate an "a" allele.',
      'Because both parents look normal, each must possess a dominant "A" allele.',
      'Punnett cross Aa × Aa gives genotypes: 1 AA : 2 Aa : 1 aa.'
    ],
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Genomics & Bioprocess Lead Specialist',
  description: 'Apply your biotechnology training to solve real-world clinical, forensic, and agricultural challenges in India.',
  steps: [
    '1. Design a genetic test cross to fix homozygous drought-tolerant traits in indigenous mustard (Brassica juncea).',
    '2. Review a 47,XXY karyotype report and counsel parents using proper non-disjunction terminology.',
    '3. Formulate a complete GLP-compliant sterilisation protocol for initiating explants of sandalwood (Santalum album).',
    '4. Calibrate a FACS sorter and calculate haemocytometer cell viability for autologous stem cell therapy at AIIMS.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_BiotechnologyMendelsExperimentsLawsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_BIOTECH_041,
  title = DEFAULT_PROPS.title || "Biotechnology: Mendel's Experiments & Cytogenetics",
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {

  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org Interaction States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [activeTab, setActiveTab] = useState<'interactive' | 'predictions' | 'observations'>('interactive');

  // Exploration Simulation Controls
  const [parent1Allele, setParent1Allele] = useState<'T' | 't'>('T');
  const [parent2Allele, setParent2Allele] = useState<'T' | 't'>('t');
  const [peaShape, setPeaShape] = useState<'R' | 'r'>('R');
  const [peaColor, setPeaColor] = useState<'Y' | 'y'>('Y');
  const [selectedKaryotype, setSelectedKaryotype] = useState<'normal' | 'turner' | 'klinefelter' | 'down'>('normal');
  const [blockedEnzyme, setBlockedEnzyme] = useState<'none' | 'pah' | 'tyrosinase' | 'hgao'>('none');
  const [steriliserItem, setSteriliserItem] = useState<string | null>(null);
  const [steriliserDropSuccess, setSteriliserDropSuccess] = useState<string | null>(null);
  const [laserIntensity, setLaserIntensity] = useState(75);
  const [sheathFlowRate, setSheathFlowRate] = useState(50);
  const [trypanBlueAdded, setTrypanBlueAdded] = useState(true);

  // Linkage Map Explorer Controls
  const [markerDistanceAB, setMarkerDistanceAB] = useState(12);
  const [markerDistanceBC, setMarkerDistanceBC] = useState(8);

  // Challenge Engine States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Dynamic Challenge Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection States
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    application: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Visual Effects
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistence Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' :
      mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (FACS Particle Laser Stream) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { y: number; x: number; isTarget: boolean; charged: boolean }[] = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        y: Math.random() * 140,
        x: 150,
        isTarget: Math.random() > 0.6,
        charged: false,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Nozzle & Laser Beam
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(135, 0, 30, 25);
      
      // Sheath fluid tube
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.strokeRect(142, 0, 16, 25);

      // Laser Beam (Red 488nm / 633nm)
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(30, 48, 240, 3);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.fillRect(30, 45, 240, 9);

      // Deflection Plates
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(90, 75, 10, 35); // + Plate
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(200, 75, 10, 35); // - Plate

      // Plate Labels
      ctx.fillStyle = '#93c5fd';
      ctx.font = '10px sans-serif';
      ctx.fillText('+ Plate', 75, 95);
      ctx.fillStyle = '#fca5a5';
      ctx.fillText('- Plate', 215, 95);

      // Animate Stream Particles
      particles.forEach(p => {
        p.y += (sheathFlowRate / 25);
        if (p.y > 48 && p.isTarget) {
          p.charged = true;
        }
        if (p.y > 75 && p.charged) {
          p.x += 1.4; // Deflect right toward positive/negative plate
        }
        if (p.y > 140) {
          p.y = 0;
          p.x = 150;
          p.charged = false;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.isTarget ? 4.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = p.isTarget ? '#10b981' : '#64748b';
        ctx.fill();
        if (p.isTarget) {
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sheathFlowRate]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive biotechnology workstation. Manipulate the simulations to discover each core law!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the free-play laboratory sandbox! Experiment without constraints.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning your competency challenges.');
  }, []);

  const handleKaryotypeSelect = useCallback((type: 'normal' | 'turner' | 'klinefelter' | 'down') => {
    setSelectedKaryotype(type);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      normal: 'Normal Diploid (46,XX / 46,XY). 23 homologous pairs intact.',
      turner: '45,XO Monosomy X. Single X chromosome, phenotypically female with streak gonads.',
      klinefelter: '47,XXY. Extra X chromosome in male, gynaecomastia and sterility.',
      down: '47,XX,+21 or 47,XY,+21. Trisomy 21 with epicanthal fold and simian crease.',
    };
    speechManager.speak(descriptions[type]);
  }, []);

  const handleEnzymeBlock = useCallback((enz: 'none' | 'pah' | 'tyrosinase' | 'hgao') => {
    setBlockedEnzyme(enz);
    audioManager.play('pop');
    const logs: Record<string, string> = {
      none: 'All metabolic enzymes active.',
      pah: 'Phenylalanine Hydroxylase blocked: Phenylalanine accumulates into neurotoxic phenylpyruvic acid (PKU).',
      tyrosinase: 'Tyrosinase blocked: Melanin pigment cannot be synthesised (Albinism).',
      hgao: 'Homogentisic Acid Oxidase blocked: Homogentisic acid accumulates and oxidises in urine (Alkaptonuria).',
    };
    speechManager.speak(logs[enz]);
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished with a score of ${finalScore} percent! You are now a certified biotech investigator.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent precision.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the step-by-step molecular explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MOTIVATIONAL FEEDBACK MESSAGE ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return { title: '🌟 PERFECT SCORE!', text: 'Flawless execution! You have mastered every principle of Mendelian inheritance, cytogenetics, and bioprocess laboratory protocols.' };
    if (errors <= 3) return { title: '👏 Great work!', text: 'Outstanding comprehension! You demonstrated strong mastery across genetics, chromosomal anomalies, and cell sorting.' };
    if (errors <= 7) return { title: '👍 Good effort!', text: 'Solid performance! With a quick review of the key enzyme steps and dilution math, you will achieve perfection.' };
    return { title: '💪 Do not give up — You WILL get this!', text: 'Persistence builds great scientists! Re-visit the exploration modules and try again to reinforce your conceptual foundation.' };
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} className="p-3 bg-emerald-950 border border-emerald-600 rounded-2xl text-2xl shadow-lg shadow-emerald-900/30">
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">ISC Class 11 Biotechnology</span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span key={difficulty} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
            difficulty === 'foundation' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' :
            difficulty === 'advanced' ? 'bg-rose-950/60 border-rose-500 text-rose-300' :
            'bg-indigo-950/60 border-indigo-500 text-indigo-300'
          }`}>
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded-full text-xs font-medium">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-indigo-950/40 rounded-2xl border border-emerald-800/60 shadow-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Investigative Brief</span>
            <h2 className="text-xl font-black text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-md">Curiosity Hook</span>
              <p className="text-white font-semibold text-base">{DISCOVERY_QUESTION.question}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/50 text-slate-500 border border-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="ml-2 font-bold text-emerald-400">✓</span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="ml-2 font-bold text-rose-400">✗</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 mt-4 space-y-3">
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Mendel’s recombinant phenotypic class 3/16 yields 300.' : `ⓘ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Laboratory Labs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40"
                >
                  Enter Interactive Laboratory Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (WITH PREDICT & OBSERVE TABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Top Sub-Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'interactive' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                🔬 Interactive Simulators ({currentSlide + 1}/{EXPLORATION_STEPS.length})
              </button>
              <button
                onClick={() => setActiveTab('predictions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'predictions' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                🔮 Predict & Verify ({Object.keys(predAnswers).length}/{PREDICTION_QUESTIONS.length})
              </button>
              <button
                onClick={() => setActiveTab('observations')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'observations' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                👁️ What Do You Notice? ({Object.keys(obsAnswers).length}/{OBSERVATION_QUESTIONS.length})
              </button>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700'}`} />
              ))}
            </div>
          </div>

          {/* TAB 1: INTERACTIVE SIMULATORS */}
          {activeTab === 'interactive' && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4"
              >
                <div>
                  <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-sm text-emerald-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>

                {/* SLIDE 0: Mendelian Punnett Visualizer */}
                {currentSlide === 0 && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-around gap-4 pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold">Parent 1 (Tall/Dwarf):</span>
                        <motion.button
                          aria-label="Toggle Parent 1 Allele"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setParent1Allele(p => p === 'T' ? 't' : 'T')}
                          className="px-3 py-1 bg-indigo-900 text-indigo-200 border border-indigo-500 rounded-lg text-xs font-bold"
                        >
                          Allele: {parent1Allele} ({parent1Allele === 'T' ? 'Tall' : 'Dwarf'})
                        </motion.button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold">Parent 2 (Tall/Dwarf):</span>
                        <motion.button
                          aria-label="Toggle Parent 2 Allele"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setParent2Allele(p => p === 'T' ? 't' : 'T')}
                          className="px-3 py-1 bg-purple-900 text-purple-200 border border-purple-500 rounded-lg text-xs font-bold"
                        >
                          Allele: {parent2Allele} ({parent2Allele === 'T' ? 'Tall' : 'Dwarf'})
                        </motion.button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <svg viewBox="0 0 240 200" className="w-full max-w-xs mx-auto bg-slate-900 rounded-xl p-2 border border-slate-800">
                        <line x1="60" y1="20" x2="60" y2="180" stroke="#475569" strokeWidth="2" />
                        <line x1="140" y1="20" x2="140" y2="180" stroke="#475569" strokeWidth="2" />
                        <line x1="20" y1="60" x2="220" y2="60" stroke="#475569" strokeWidth="2" />
                        <line x1="20" y1="120" x2="220" y2="120" stroke="#475569" strokeWidth="2" />

                        <text x="100" y="45" fill="#38bdf8" textAnchor="middle" fontSize="14" fontWeight="bold">{parent1Allele}</text>
                        <text x="180" y="45" fill="#38bdf8" textAnchor="middle" fontSize="14" fontWeight="bold">{parent1Allele === 'T' ? 't' : 'T'}</text>
                        <text x="40" y="95" fill="#c084fc" textAnchor="middle" fontSize="14" fontWeight="bold">{parent2Allele}</text>
                        <text x="40" y="155" fill="#c084fc" textAnchor="middle" fontSize="14" fontWeight="bold">{parent2Allele === 'T' ? 't' : 'T'}</text>

                        <text x="100" y="95" fill="#22c55e" textAnchor="middle" fontSize="13" fontWeight="bold">{parent1Allele}{parent2Allele}</text>
                        <text x="180" y="95" fill="#22c55e" textAnchor="middle" fontSize="13" fontWeight="bold">{parent1Allele === 'T' ? 't' : 'T'}{parent2Allele}</text>
                        <text x="100" y="155" fill="#22c55e" textAnchor="middle" fontSize="13" fontWeight="bold">{parent1Allele}{parent2Allele === 'T' ? 't' : 'T'}</text>
                        <text x="180" y="155" fill="#22c55e" textAnchor="middle" fontSize="13" fontWeight="bold">{parent1Allele === 'T' ? 't' : 'T'}{parent2Allele === 'T' ? 't' : 'T'}</text>
                      </svg>

                      <div className="space-y-2 text-xs">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-emerald-400 font-bold">Phenotypic Law of Dominance:</span>
                          <p className="text-slate-300 mt-0.5">Heterozygotes (Tt) express the dominant Tall phenotype because the functional enzyme produces sufficient gibberellin hormone.</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-indigo-400 font-bold">Gametic Law of Segregation:</span>
                          <p className="text-slate-300 mt-0.5">Alleles separate independently during Anaphase I of meiosis so each haploid gamete carries only one copy.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 1: Karyotype Explorer */}
                {currentSlide === 1 && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(['normal', 'turner', 'klinefelter', 'down'] as const).map(k => (
                        <motion.button
                          key={k}
                          aria-label={`Select ${k} karyotype`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleKaryotypeSelect(k)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                            selectedKaryotype === k
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {k === 'normal' ? '46,XY Normal' : k === 'turner' ? '45,XO Turner' : k === 'klinefelter' ? '47,XXY Klinefelter' : '47,+21 Down'}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                      <svg viewBox="0 0 300 120" className="w-full max-w-sm">
                        <g fill="#475569">
                          {[...Array(10)].map((_, i) => (
                            <rect key={i} x={15 + i * 28} y={15} width="6" height="35" rx="3" />
                          ))}
                        </g>
                        <g fill={selectedKaryotype === 'down' ? '#ef4444' : '#10b981'}>
                          <rect x={150} y={65} width="6" height="25" rx="3" />
                          <rect x={160} y={65} width="6" height="25" rx="3" />
                          {selectedKaryotype === 'down' && <rect x={170} y={65} width="6" height="25" rx="3" />}
                        </g>
                        <text x={165} y={105} fill="#94a3b8" fontSize="9" textAnchor="middle">Pair 21 {selectedKaryotype === 'down' ? '(Trisomy!)' : ''}</text>

                        <g fill={selectedKaryotype === 'turner' ? '#f59e0b' : selectedKaryotype === 'klinefelter' ? '#8b5cf6' : '#38bdf8'}>
                          <rect x={240} y={60} width="7" height="38" rx="3" />
                          {selectedKaryotype !== 'turner' && <rect x={252} y={60} width="7" height="38" rx="3" />}
                          {selectedKaryotype === 'klinefelter' && <rect x={264} y={68} width="6" height="25" rx="3" />}
                        </g>
                        <text x={255} y={112} fill="#94a3b8" fontSize="9" textAnchor="middle">
                          {selectedKaryotype === 'turner' ? 'XO' : selectedKaryotype === 'klinefelter' ? 'XXY' : 'XY'}
                        </text>
                      </svg>

                      <div className="text-xs text-slate-300 space-y-1">
                        <p className="font-bold text-white uppercase">Clinical Cytogenetics Analysis:</p>
                        {selectedKaryotype === 'normal' && <p>✓ Normal 46,XY somatic karyotype without non-disjunction.</p>}
                        {selectedKaryotype === 'turner' && <p className="text-amber-300">✗ Monosomy X (45,XO): Phenotypic female, webbed neck, streak ovaries, short stature.</p>}
                        {selectedKaryotype === 'klinefelter' && <p className="text-purple-300">✗ 47,XXY: Phenotypic male, small testes, gynaecomastia, elevated stature, sterility.</p>}
                        {selectedKaryotype === 'down' && <p className="text-rose-300">✗ Trisomy 21 (47,+21): Autosomal non-disjunction, epicanthal folds, simian crease, intellectual impairment.</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 2: Metabolic Errors */}
                {currentSlide === 2 && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <motion.button aria-label="Simulate Normal Pathway" whileTap={{ scale: 0.95 }} onClick={() => handleEnzymeBlock('none')} className={`px-3 py-1 rounded text-xs font-bold ${blockedEnzyme === 'none' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Normal Pathway</motion.button>
                      <motion.button aria-label="Block Phenylalanine Hydroxylase" whileTap={{ scale: 0.95 }} onClick={() => handleEnzymeBlock('pah')} className={`px-3 py-1 rounded text-xs font-bold ${blockedEnzyme === 'pah' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Block PAH (PKU)</motion.button>
                      <motion.button aria-label="Block Tyrosinase" whileTap={{ scale: 0.95 }} onClick={() => handleEnzymeBlock('tyrosinase')} className={`px-3 py-1 rounded text-xs font-bold ${blockedEnzyme === 'tyrosinase' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Block Tyrosinase (Albinism)</motion.button>
                      <motion.button aria-label="Block Homogentisic Acid Oxidase" whileTap={{ scale: 0.95 }} onClick={() => handleEnzymeBlock('hgao')} className={`px-3 py-1 rounded text-xs font-bold ${blockedEnzyme === 'hgao' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Block HGAO (Alkaptonuria)</motion.button>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                      <div className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800">
                        <span>Phenylalanine</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${blockedEnzyme === 'pah' ? 'bg-rose-950 text-rose-400 border border-rose-600' : 'bg-emerald-950 text-emerald-400'}`}>
                          {blockedEnzyme === 'pah' ? '❌ PAH Blocked → Phenylpyruvate Accumulates!' : '→ PAH →'}
                        </span>
                        <span>Tyrosine</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800">
                        <span>Tyrosine</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${blockedEnzyme === 'tyrosinase' ? 'bg-amber-950 text-amber-400 border border-amber-600' : 'bg-emerald-950 text-emerald-400'}`}>
                          {blockedEnzyme === 'tyrosinase' ? '❌ Tyrosinase Blocked → No Melanin!' : '→ Tyrosinase →'}
                        </span>
                        <span>Melanin Pigment</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800">
                        <span>Homogentisic Acid</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${blockedEnzyme === 'hgao' ? 'bg-indigo-950 text-indigo-400 border border-indigo-600' : 'bg-emerald-950 text-emerald-400'}`}>
                          {blockedEnzyme === 'hgao' ? '❌ HGAO Blocked → Black Urine & Ochronosis!' : '→ HGA Oxidase →'}
                        </span>
                        <span>Acetoacetate</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 3: Sterilisation & Lab Instruments */}
                {currentSlide === 3 && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs text-slate-400">Click a laboratory specimen to assign its validated sterilisation protocol:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { name: 'Nutrient Basal Media', method: 'Autoclave at 121°C, 15 psi for 15-20 min' },
                        { name: 'Heat-labile Serum / Vitamins', method: '0.22 µm Membrane Filter Sterilisation' },
                        { name: 'Empty Glass Pipettes', method: 'Hot Air Oven at 160-180°C for 2 hours' },
                        { name: 'Plant Shoot Explant', method: 'Surface Sterilisation with 1% Sodium Hypochlorite & 70% EtOH' },
                      ].map(item => (
                        <motion.button
                          key={item.name}
                          aria-label={`Sterilise ${item.name}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSteriliserItem(item.name);
                            setSteriliserDropSuccess(item.method);
                            audioManager.play('tap');
                          }}
                          className={`p-3 text-left rounded-lg text-xs font-medium border ${steriliserItem === item.name ? 'bg-emerald-900 border-emerald-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
                        >
                          {item.name}
                        </motion.button>
                      ))}
                    </div>
                    {steriliserDropSuccess && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/60 border border-emerald-600 rounded-xl text-xs text-emerald-200">
                        ✓ Validated SOP: <span className="font-bold text-white">{steriliserDropSuccess}</span>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* SLIDE 4: FACS & Cell Analysis */}
                {currentSlide === 4 && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <canvas ref={canvasRef} width={300} height={140} className="w-full bg-slate-900 rounded-xl border border-slate-800" />
                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="flex justify-between text-slate-400">
                            <span>Sheath Fluid Flow Rate:</span>
                            <span className="font-bold text-emerald-400">{sheathFlowRate} µL/min</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={sheathFlowRate}
                            aria-label="Sheath Fluid Flow Rate Slider"
                            onChange={e => setSheathFlowRate(Number(e.target.value))}
                            className="w-full accent-emerald-500"
                          />
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-emerald-400 font-bold">FACS Principle:</span>
                          <p className="text-slate-300 mt-1">Single cells flow past a laser beam. Fluorescent markers trigger electrostatic droplet charging, causing deflected sorting into dedicated tubes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 5: Haemocytometry & Trypan Blue */}
                {currentSlide === 5 && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div className="grid grid-cols-5 gap-1 p-3 bg-slate-900 rounded-xl border border-slate-800">
                        {[...Array(25)].map((_, i) => {
                          const isDead = i === 3 || i === 8 || i === 14;
                          return (
                            <div
                              key={i}
                              className={`h-7 rounded flex items-center justify-center text-[10px] font-bold border ${
                                isDead
                                  ? 'bg-blue-900/80 border-blue-400 text-blue-200'
                                  : 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                              }`}
                            >
                              {isDead ? 'Dead' : 'Live'}
                            </div>
                          );
                        })}
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-emerald-400 font-bold">Trypan Blue Dye Exclusion:</span>
                          <p className="text-slate-300 mt-1">Viable cells have intact plasma membranes that exclude Trypan blue (clear). Non-viable cells take up dye (blue).</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-indigo-400 font-bold">Standard Formula:</span>
                          <p className="text-slate-300 font-mono mt-0.5">Viability % = (Live Cells / Total Cells) × 100</p>
                          <p className="text-slate-400 mt-0.5">22 live / 25 total = 88.0% Viability</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 6: Linkage Mapping */}
                {currentSlide === 6 && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-wrap gap-4 items-center justify-between pb-2 border-b border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold">Distance A — B: </span>
                        <span className="font-bold text-emerald-400">{markerDistanceAB} cM</span>
                        <input
                          type="range"
                          min={2}
                          max={30}
                          value={markerDistanceAB}
                          aria-label="Marker Distance A to B"
                          onChange={e => setMarkerDistanceAB(Number(e.target.value))}
                          className="w-32 ml-2 accent-emerald-500"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">Distance B — C: </span>
                        <span className="font-bold text-indigo-400">{markerDistanceBC} cM</span>
                        <input
                          type="range"
                          min={2}
                          max={30}
                          value={markerDistanceBC}
                          aria-label="Marker Distance B to C"
                          onChange={e => setMarkerDistanceBC(Number(e.target.value))}
                          className="w-32 ml-2 accent-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-300">Linear Chromosome Linkage Map (Alfred Sturtevant Principle):</span>
                      <svg viewBox="0 0 320 60" className="w-full">
                        <line x1="20" y1="30" x2="300" y2="30" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="40" cy="30" r="8" fill="#10b981" />
                        <text x="40" y="52" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Gene A</text>

                        <circle cx={40 + markerDistanceAB * 4} cy="30" r="8" fill="#38bdf8" />
                        <text x={40 + markerDistanceAB * 4} y="52" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Gene B</text>

                        <circle cx={40 + (markerDistanceAB + markerDistanceBC) * 4} cy="30" r="8" fill="#a855f7" />
                        <text x={40 + (markerDistanceAB + markerDistanceBC) * 4} y="52" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Gene C</text>
                      </svg>
                      <p className="text-[11px] text-slate-400">Total Distance A — C = {markerDistanceAB + markerDistanceBC} cM ({markerDistanceAB + markerDistanceBC}% Recombination Frequency).</p>
                    </div>
                  </div>
                )}

                {/* NAVIGATION CONTROLS */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <motion.button
                    aria-label="Previous Module"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevSlide}
                    disabled={currentSlide === 0}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl"
                  >
                    ← Previous Module
                  </motion.button>
                  {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                    <motion.button
                      aria-label="Next Module"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextSlide}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/30"
                    >
                      Next Module →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Enter Free Sandbox"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-900/30"
                    >
                      Enter Free Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* TAB 2: PREDICTION QUESTIONS (PREDICT-THEN-CHECK) */}
          {activeTab === 'predictions' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Scientific Method: Hypothesis Formation</span>
                <h3 className="text-lg font-black text-white mt-1">Predict-Then-Check Inquiries</h3>
                <p className="text-xs text-slate-400">Make your deduction first, then verify using the simulated experimental tools.</p>
              </div>

              {PREDICTION_QUESTIONS.map((pq, qIdx) => {
                const userChoice = predAnswers[qIdx];
                const isAnswered = userChoice !== undefined;
                const isCorrect = userChoice === pq.correctIndex;

                return (
                  <div key={pq.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="px-2 py-0.5 bg-indigo-900/80 text-indigo-300 font-bold text-xs rounded">Prediction {qIdx + 1}</span>
                      <p className="text-sm font-semibold text-white">{pq.question}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {pq.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => {
                            setPredAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
                            audioManager.play(optIdx === pq.correctIndex ? 'success' : 'pop');
                          }}
                          className={`p-3 text-left rounded-lg text-xs font-medium border transition-all ${
                            isAnswered && optIdx === pq.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : isAnswered && optIdx === userChoice
                              ? 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {isAnswered && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                        <p className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isCorrect ? '✓ Hypothesis Supported!' : 'ⓘ Prediction Refined:'} {pq.explanation}
                        </p>
                        <p className="text-indigo-300 italic">🔬 How to verify: {pq.verifyInstruction}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: OBSERVATION QUESTIONS (WHAT DO YOU NOTICE?) */}
          {activeTab === 'observations' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Qualitative Analysis</span>
                <h3 className="text-lg font-black text-white mt-1">What Do You Notice?</h3>
                <p className="text-xs text-slate-400">Examine the visual processes in the simulator and identify key mechanistic patterns.</p>
              </div>

              {OBSERVATION_QUESTIONS.map((oq, qIdx) => {
                const userChoice = obsAnswers[qIdx];
                const isAnswered = userChoice !== undefined;
                const isCorrect = userChoice === oq.correctIndex;

                return (
                  <div key={oq.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="px-2 py-0.5 bg-purple-900/80 text-purple-300 font-bold text-xs rounded">Observation {qIdx + 1}</span>
                      <p className="text-sm font-semibold text-white">{oq.question}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => {
                            setObsAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
                            audioManager.play(optIdx === oq.correctIndex ? 'success' : 'pop');
                          }}
                          className={`p-3 text-left rounded-lg text-xs font-medium border transition-all ${
                            isAnswered && optIdx === oq.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : isAnswered && optIdx === userChoice
                              ? 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {isAnswered && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                        <p className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isCorrect ? '✓ Accurate Observation!' : 'ⓘ Critical Observation:'}
                        </p>
                        <p className="text-slate-300">{oq.explanation}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* ─── 3. FREE-PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Biotech Sandbox & Free Experimentation Lab</h3>
                <p className="text-xs text-slate-400 mt-0.5">Explore combinations freely without grading constraints before entering formal challenges.</p>
              </div>
              <motion.button
                aria-label="Ready for Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 text-sm"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-indigo-400 uppercase">Pea Trait Tester</span>
                <div className="flex gap-2">
                  <motion.button
                    aria-label="Toggle Pea Shape"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPeaShape(s => s === 'R' ? 'r' : 'R')}
                    className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-bold text-slate-200"
                  >
                    Shape: {peaShape === 'R' ? 'Round (R)' : 'Wrinkled (r)'}
                  </motion.button>
                  <motion.button
                    aria-label="Toggle Pea Colour"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPeaColor(c => c === 'Y' ? 'y' : 'Y')}
                    className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-bold text-slate-200"
                  >
                    Colour: {peaColor === 'Y' ? 'Yellow (Y)' : 'Green (y)'}
                  </motion.button>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                  <p className="text-slate-300">Selected Phenotype: <span className="font-bold text-emerald-400">{peaShape === 'R' ? 'Round' : 'Wrinkled'} {peaColor === 'Y' ? 'Yellow' : 'Green'}</span></p>
                  <p className="text-slate-500 mt-1">Dihybrid F2 probability: {peaShape === 'R' && peaColor === 'Y' ? '9/16' : peaShape === 'R' || peaColor === 'Y' ? '3/16' : '1/16'}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-purple-400 uppercase">Interactive Haemocytometer Grid</span>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Trypan Blue Stain:</span>
                  <motion.button
                    aria-label="Toggle Trypan Blue Stain"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTrypanBlueAdded(t => !t)}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${trypanBlueAdded ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {trypanBlueAdded ? 'Active (Clear vs Blue)' : 'Inactive'}
                  </motion.button>
                </div>
                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-900 rounded-lg border border-slate-800">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-8 rounded flex items-center justify-center text-xs font-bold border ${i % 4 === 0 && trypanBlueAdded ? 'bg-blue-900/60 border-blue-500 text-blue-200' : 'bg-emerald-950/40 border-emerald-600 text-emerald-200'}`}>
                      {i % 4 === 0 && trypanBlueAdded ? 'Dead (Blue)' : 'Live (Clear)'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress & Tier Tracker */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
            <span className="text-emerald-400 uppercase">NEP Level: {challenge.competencyLevel}</span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* QUESTION CARD */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                challenge.difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300' :
                challenge.difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300' :
                'bg-indigo-500/20 text-indigo-300'
              }`}>
                {challenge.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-medium">Topic: {challenge.nodeId}</span>
            </div>

            <p className="text-white text-base md:text-lg font-bold leading-relaxed">{challenge.question}</p>

            {/* MCQ Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3 mt-5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/80 border-2 border-emerald-500 text-emerald-100 font-bold'
                        : 'bg-slate-800/90 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                    {showExplanation && i === challenge.correctIndex && <span className="ml-2 font-bold text-emerald-400">✓ Correct</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Option */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'target_media', title: 'Nutrient Basal Media' },
                    { id: 'target_serum', title: 'Serum / Vitamins' },
                    { id: 'target_glass', title: 'Empty Glassware' },
                    { id: 'target_explant', title: 'Plant Shoot Explant' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-300">{target.title}</span>
                      <span className={`px-3 py-1.5 rounded-lg font-mono font-bold ${droppedLabels[target.id] ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-slate-900 text-slate-500 border border-dashed border-slate-700'}`}>
                        {droppedLabels[target.id] || 'Drop Method Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Protocol Mapping"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/30"
                >
                  Verify Protocol Mapping →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Option */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    role="button"
                    aria-label={`Sort item ${idx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 text-slate-200 rounded-xl border border-slate-700 cursor-grab text-xs font-medium flex items-center gap-3"
                  >
                    <span className="px-2 py-1 bg-slate-900 rounded-md font-bold text-slate-400">{idx + 1}</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <motion.button
                  aria-label="Check Sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/30 mt-2"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Option */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  aria-label="Numeric answer input"
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter calculated value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono focus:border-emerald-500 outline-none w-56"
                />
                <span className="text-slate-400 text-xs font-bold">{challenge.unit}</span>
                <motion.button
                  aria-label="Submit Calculation"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/30"
                >
                  Submit Calculation →
                </motion.button>
              </div>
            )}

            {/* Construct Challenge Option */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-amber-300 font-medium">Select components in order:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((p, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component ${p}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, p])}
                      className="px-3 py-1.5 bg-indigo-900/80 border border-indigo-600 text-indigo-100 rounded-lg text-xs font-medium"
                    >
                      + {p}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2">
                  {constructParts.map((p, i) => (
                    <div key={i} className="px-3 py-1 bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-2 border border-slate-700">
                      <span>{p}</span>
                      <button aria-label={`Remove ${p}`} onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-400 font-bold">✕</button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-500 text-xs italic">Construct strategy here...</span>}
                </div>

                <motion.button
                  aria-label="Verify Constructed Strategy"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/30"
                >
                  Verify Strategy →
                </motion.button>
              </div>
            )}

            {/* Progressive Explanation Panel */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-slate-950 border border-amber-800/60 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Explanation:</span>
                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-slate-200">
                      <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to Next Challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          {/* Motivational Feedback Header */}
          <div className="p-8 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-indigo-950/60 rounded-3xl border border-emerald-600 shadow-2xl text-center space-y-3">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500">
              Mission Certified
            </span>
            <h2 className="text-3xl font-black text-white">{motivationalMessage.title}</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">{motivationalMessage.text}</p>
            <div className="pt-2 flex justify-center gap-4 text-xs font-bold">
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-emerald-400">
                Final Score: {Math.max(0, 100 - errors * 5)}%
              </span>
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-indigo-300">
                Mastery Tier: {masteryLevel.toUpperCase()}
              </span>
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-rose-300">
                Errors: {errors}
              </span>
            </div>
          </div>

          {/* Targeted Misconception Clarifications */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase">Targeted Conceptual Clarifications:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-base">💭</span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Deep Conceptual Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">Synthesise your insights to lock in synaptic retention:</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  aria-label="Reflection on most surprising insight"
                  onChange={e => setReflectionResponses(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How Trypan blue is an exclusion dye that only enters damaged cells..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  aria-label="Reflection on explaining concepts to a friend"
                  onChange={e => setReflectionResponses(r => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g., Genes segregate during meiosis like dealing a deck of cards into haploid hands..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.application}
                  aria-label="Reflection on real-world practical applications"
                  onChange={e => setReflectionResponses(r => ({ ...r, application: e.target.value }))}
                  placeholder="e.g., In cytogenetics diagnostics at AIIMS or quality control in biopharmaceutical plants..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-purple-500"
                />
              </div>

              {!reflectionSubmitted ? (
                <motion.button
                  aria-label="Save Reflection Responses"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                  }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Save Reflection Log ✓
                </motion.button>
              ) : (
                <p className="text-xs text-emerald-400 font-bold">✓ Reflection saved to your personal learning dossier!</p>
              )}
            </div>
          </div>

          {/* Spaced Review Box */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">SM-2 Spaced Repetition Schedule:</span>
            <p className="text-xs text-slate-300">
              Next active recall review in <span className="font-bold text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>. Consistent repetition secures long-term synaptic retention for your CISCE board examinations!
            </p>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-indigo-950/40 rounded-2xl border border-indigo-800/80 space-y-3">
            <h3 className="text-base font-bold text-indigo-200">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900/80 rounded-lg text-xs text-slate-300 border border-slate-800">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK BUBBLES & OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiotechnologyMendelsExperimentsLawsSim;