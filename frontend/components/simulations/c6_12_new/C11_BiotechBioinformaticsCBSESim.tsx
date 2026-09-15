'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. ALL NODE IDS & MAPS
// ==========================================
const ALL_NODE_IDS = [
  'c11_bt_cbse_260',
  'c11_bt_cbse_261',
  'c11_bt_cbse_262',
  'c11_bt_cbse_263',
  'c11_bt_cbse_264',
  'c11_bt_cbse_265',
  'c11_bt_cbse_266',
  'c11_bt_cbse_267',
  'c11_bt_cbse_268',
  'c11_bt_cbse_269',
  'c11_bt_cbse_270',
  'c11_bt_cbse_271',
  'c11_bt_cbse_272',
  'c11_bt_cbse_273',
  'c11_bt_cbse_274',
  'c11_bt_cbse_275',
  'c11_bt_cbse_276',
  'c11_bt_cbse_277',
  'c11_bt_cbse_278',
  'c11_bt_cbse_279',
  'c11_bt_cbse_280',
  'c11_bt_cbse_281',
  'c11_bt_cbse_282',
  'c11_bt_cbse_283',
  'c11_bt_cbse_284',
  'c11_bt_cbse_285',
  'c11_bt_cbse_286',
  'c11_bt_cbse_287',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

const NODE_TITLES: Record<NodeId, string> = {
  c11_bt_cbse_260: 'Definition and Scope of Bioinformatics',
  c11_bt_cbse_261: 'Historical Development of Bioinformatics',
  c11_bt_cbse_262: 'Experimental Technologies for Biomolecule Analysis',
  c11_bt_cbse_263: 'Types of Molecular Data and Data Formats',
  c11_bt_cbse_264: 'FASTA Format for Sequence Representation',
  c11_bt_cbse_265: 'FASTQ Format with Quality Scores (Phred)',
  c11_bt_cbse_266: 'Biological Databases: Types and Characteristics',
  c11_bt_cbse_267: 'Need for Biological Databases in Research',
  c11_bt_cbse_268: 'The Human Genome Project (HGP)',
  c11_bt_cbse_269: 'Analytical and Statistical Workflows in Bioinformatics',
  c11_bt_cbse_270: 'Statistical Software Packages for Biological Data Analysis',
  c11_bt_cbse_271: 'Data Visualization in Bioinformatics',
  c11_bt_cbse_272: 'Probability in Biological Modeling and Random Sampling',
  c11_bt_cbse_273: 'Hypothesis Testing and p-value Interpretation',
  c11_bt_cbse_274: 'Statistical Tests: t-test and ANOVA',
  c11_bt_cbse_275: 'Multiple Testing Correction (Bonferroni & FDR)',
  c11_bt_cbse_276: 'Correlation and Regression Analysis in Biology',
  c11_bt_cbse_277: 'Multivariate and Regression Analysis Techniques',
  c11_bt_cbse_278: 'Statistical Pitfalls and Misuse in Biological Research',
  c11_bt_cbse_279: 'Genome Informatics: Overview and Principles',
  c11_bt_cbse_280: 'Genome Informatics Tools: Quality Control and Read Processing',
  c11_bt_cbse_281: 'Genome Assembly and Mapping Workflows',
  c11_bt_cbse_282: 'Gene Prediction: Methods and Approaches',
  c11_bt_cbse_283: 'Transcript Prediction: Coding and Non-coding RNAs',
  c11_bt_cbse_284: 'Gene Annotation: Identifying Features in Assembled Genomes',
  c11_bt_cbse_285: 'Gene Ontology: Describing Gene Function',
  c11_bt_cbse_286: 'Phylogenetic Analysis: Reconstructing Evolutionary Relationships',
  c11_bt_cbse_287: 'Role of Artificial Intelligence in Bioinformatics',
};

// ==========================================
// 2. SCENARIO & DISCOVERY QUESTION
// ==========================================
const SCENARIO = {
  title: 'National Genomics & Computational Biology Research Facility',
  intro: 'Welcome to the High-Throughput Bioinformatics Center! You are lead computational biologist managing next-generation sequencing (NGS) data from clinical genomic samples.',
  context: 'Your task is to process raw FASTQ reads, perform quality filtering, construct De Bruijn assembly graphs, evaluate differential expression with statistical corrections, build evolutionary trees, and annotate novel genes using AI.',
};

const DISCOVERY_QUESTION = {
  question: 'When analyzing 20,000 genes simultaneously in a cancer RNA-seq experiment using a standard p-value threshold of p < 0.05 without correction, how many genes would appear statistically significant purely by random chance?',
  options: [
    'Zero — p < 0.05 guarantees true positive findings.',
    'Approximately 1,000 genes (5% of 20,000 false positives).',
    'Exactly 50 genes across the entire experiment.',
    'It depends entirely on the sequencing depth, not random probability.',
  ],
  correctIndex: 1,
  hintAfter: 'At p < 0.05, 5% of all non-differentially expressed genes will test positive by chance. Out of 20,000 tests, 0.05 * 20,000 = 1,000 false positives! This demonstrates why multiple testing correction (Bonferroni / FDR) is vital in genomics.',
};

// ==========================================
// 3. MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'm1',
    misconception: 'Phred quality scores in FASTQ are linear error rates.',
    correction: 'Phred scores are logarithmic: Q = -10 * log10(P). A Phred score of Q30 means 1 in 1,000 base error rate (99.9% accuracy), while Q20 means 1 in 100 (99% accuracy).',
    nodeId: 'c11_bt_cbse_265' as NodeId,
  },
  {
    id: 'm2',
    misconception: 'A p-value < 0.05 automatically proves a biological hypothesis is true.',
    correction: 'A p-value measures the probability of obtaining test results at least as extreme as observed, assuming the null hypothesis is true. It does NOT prove the alternative hypothesis nor quantify effect size.',
    nodeId: 'c11_bt_cbse_273' as NodeId,
  },
  {
    id: 'm3',
    misconception: 'Genome assembly simply aligns reads against a completed reference sequence.',
    correction: 'De novo genome assembly reconstructs an unknown genome from short overlapping reads using algorithms like De Bruijn graphs without any reference genome.',
    nodeId: 'c11_bt_cbse_281' as NodeId,
  },
  {
    id: 'm4',
    misconception: 'BLAST E-value is the probability that two sequences are unrelated.',
    correction: 'The BLAST E-value (Expect value) represents the number of distinct alignment hits with a score equal to or better than S expected by chance in a database search of given size.',
    nodeId: 'c11_bt_cbse_269' as NodeId,
  },
  {
    id: 'm5',
    misconception: 'Gene prediction only requires scanning for ATG start codons and stop codons.',
    correction: 'Eukaryotic gene prediction requires identifying promoter signals, splice donor/acceptor sites (GT-AG rule), branch points, exon-intron boundaries, and open reading frames using Hidden Markov Models (HMMs).',
    nodeId: 'c11_bt_cbse_282' as NodeId,
  },
  {
    id: 'm6',
    misconception: 'Bonferroni correction and False Discovery Rate (FDR) are identical statistical adjustments.',
    correction: 'Bonferroni controls the Family-Wise Error Rate (FWER) and is very conservative (alpha / m). FDR (Benjamini-Hochberg) controls the proportion of false positives among rejected null hypotheses, balancing sensitivity and specificity.',
    nodeId: 'c11_bt_cbse_275' as NodeId,
  },
];

// ==========================================
// 4. MANDATORY INTERACTIVE LAB STEPS & QUESTIONS
// ==========================================
const DEFAULT_PROPS = {
  initialNodeId: 'c11_bt_cbse_260' as NodeId,
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: FASTQ Quality Control & Phred Trimming',
    instruction: 'Adjust the Phred Quality Score threshold (Q10 to Q40). Observe how base error probability changes and how low-quality read tails are trimmed from raw sequencing data.',
    interactionType: 'fastq_qc_trimmer',
    nodeId: 'c11_bt_cbse_265' as NodeId,
  },
  {
    title: 'Lab 2: De Bruijn Graph Genome Assembly Workbench',
    instruction: 'Change the k-mer length (k=3 to k=7). Observe how k-mer selection affects graph connectivity, Eulerian path resolution, and contig N50 assembly length.',
    interactionType: 'debruijn_assembler',
    nodeId: 'c11_bt_cbse_281' as NodeId,
  },
  {
    title: 'Lab 3: Sequence Alignment & BLAST E-Value Matrix',
    instruction: 'Modify match score, mismatch penalty, and gap open penalty parameters. Dynamic programming Matrix populates alignment score and computes BLAST E-value.',
    interactionType: 'blast_alignment',
    nodeId: 'c11_bt_cbse_269' as NodeId,
  },
  {
    title: 'Lab 4: Transcriptomics & Multiple Testing Correction',
    instruction: 'Simulate 1,000 gene p-values. Compare raw p < 0.05 cutoff against Bonferroni correction and Benjamini-Hochberg FDR control on a Volcano Plot.',
    interactionType: 'volcano_fdr_plot',
    nodeId: 'c11_bt_cbse_275' as NodeId,
  },
  {
    title: 'Lab 5: Phylogenetic Tree Reconstruction (UPGMA Clustering)',
    instruction: 'Manipulate sequence distance matrices. Compute distance step-by-step using UPGMA algorithm to assemble a molecular phylogenetic tree.',
    interactionType: 'upgma_phylogeny',
    nodeId: 'c11_bt_cbse_286' as NodeId,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase the k-mer size in a De Bruijn genome assembly algorithm from k=21 to k=55 on high-coverage accurate long reads, what will happen to the assembly graph?',
    options: [
      'The graph will become denser with more random loops.',
      'Repeats shorter than 55 bp will be resolved, producing longer contigs, provided coverage is sufficient.',
      'The assembly will fail completely because k-mers cannot exceed 31 bases.',
      'The number of nodes in the graph will double regardless of sequence length.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test different k-mer values in Lab 2 to see how higher k resolves repeat regions.',
    nodeId: 'c11_bt_cbse_281' as NodeId,
  },
  {
    question: 'Predict: When applying Bonferroni correction to 10,000 gene expression hypothesis tests at target alpha = 0.05, what is the adjusted p-value threshold for individual tests?',
    options: [
      '0.05 (no change)',
      '0.000005 (5 × 10⁻⁶)',
      '0.005',
      '0.0000005',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust test settings in Lab 4 and observe the strict horizontal threshold line shifting downwards.',
    nodeId: 'c11_bt_cbse_275' as NodeId,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the relation between Phred Quality Score Q and base call error rate P?',
    observableOptions: [
      'As Q increases by 10, error probability drops by a factor of 10 (logarithmic decay).',
      'Q and error probability P increase proportionally together linearly.',
      'Q is independent of error rate and only measures sequencing depth.',
      'When Q reaches 20, error probability is 50%.',
    ],
    correctIndex: 0,
    nodeId: 'c11_bt_cbse_265' as NodeId,
  },
  {
    question: 'What happens to the false discovery count when switching from Raw p-value cutoff (p < 0.05) to FDR (Benjamini-Hochberg q < 0.05) on transcriptome differential expression data?',
    observableOptions: [
      'False positives remain identical.',
      'False discoveries drop significantly while retaining true biological signals better than Bonferroni.',
      'All significant genes are completely eliminated.',
      'The fold change values double automatically.',
    ],
    correctIndex: 1,
    nodeId: 'c11_bt_cbse_275' as NodeId,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Variant Curation & Genomic Pipeline Audit',
  description: 'As a clinical bioinformatician in a modern hospital diagnostics unit, perform end-to-end quality control and variant annotation on a patient targeted sequencing sample.',
  steps: [
    'Inspect FASTQ raw reads: Filter out reads with mean Phred score Q < 28 (accuracy below 99.84%).',
    'Execute alignment against reference genome GRCh38 using BWA-MEM and calculate coverage metrics.',
    'Perform variant calling (GATK HaplotypeCaller) and adjust p-values for genomic locus multi-testing via FDR (q < 0.01).',
    'Annotate detected non-synonymous variants with Gene Ontology (GO) terms and ClinVar clinical databases.',
  ],
};

// ==========================================
// 5. 24 COMPREHENSIVE CHALLENGES
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple_choice' | 'numeric' | 'drag_sort' | 'classification';
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
  categories?: string[];
  itemCategories?: Record<string, string>;
  sortItems?: string[];
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7)
  {
    id: 'ch_1',
    nodeId: 'c11_bt_cbse_260',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Which of the following best defines the primary scope of Bioinformatics?',
    options: [
      'The manual synthetic chemical synthesis of DNA oligonucleotides in laboratory tubes.',
      'The application of computer science, statistics, and mathematics to store, manage, analyze, and interpret biological data.',
      'The dissection of animal tissue specimens under optical light microscopes.',
      'The high-temperature autoclaving of biological waste in clinical labs.',
    ],
    correctIndex: 1,
    explanation: 'Bioinformatics is an interdisciplinary field combining computational sciences and biology to store, process, analyze, and model molecular biological information.',
    hints: [
      'Think about computers + biology + data.',
      'It deals with managing biological datasets digitally.',
      'Select the option that mentions computation, statistics, and biological data.',
    ],
  },
  {
    id: 'ch_2',
    nodeId: 'c11_bt_cbse_261',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Historical Context',
    question: 'Who is widely recognized as a pioneer of bioinformatics for creating the first protein sequence database and the PAM substitution matrix?',
    options: [
      'Margaret Dayhoff',
      'James Watson',
      'Gregor Mendel',
      'Francis Crick',
    ],
    correctIndex: 0,
    explanation: 'Margaret Dayhoff created the Atlas of Protein Sequence and Structure (1865) and developed the PAM (Point Accepted Mutation) amino acid substitution matrix, founding bioinformatics.',
    hints: [
      'She developed the PAM substitution matrix.',
      'Known as the mother of bioinformatics.',
      'Her name starts with Margaret.',
    ],
  },
  {
    id: 'ch_3',
    nodeId: 'c11_bt_cbse_264',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Data Formats',
    question: 'In a standard FASTA file format, which symbol denotes the start of the header/description line?',
    options: ['>', '@', '#', '$'],
    correctIndex: 0,
    explanation: 'FASTA format header lines always begin with the greater-than symbol (">"), followed by the sequence identifier and description.',
    hints: [
      'Look at standard FASTA header markers.',
      'It is an angle bracket pointing right.',
      'The symbol is ">".',
    ],
  },
  {
    id: 'ch_4',
    nodeId: 'c11_bt_cbse_265',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Data Formats & Quality',
    question: 'What additional information does a FASTQ file contain that a standard FASTA file lacks?',
    options: [
      'Protein 3D atomic coordinates.',
      'Per-base quality scores (Phred scores) represented as ASCII characters.',
      'Taxonomic family classification trees.',
      'Enzyme kinetic Michaelis-Menten constants.',
    ],
    correctIndex: 1,
    explanation: 'FASTQ files store nucleotide sequences along with corresponding per-base quality scores formatted as ASCII characters (Q = -10 log10 P).',
    hints: [
      'The "Q" in FASTQ stands for Quality.',
      'It records base-calling accuracy.',
      'ASCII quality score lines are unique to FASTQ.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_5',
    nodeId: 'c11_bt_cbse_266',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Database Classification',
    question: 'Which biological database is the primary global repository for three-dimensional structural data of biological macromolecules determined by X-ray crystallography and NMR?',
    options: [
      'GenBank',
      'Protein Data Bank (PDB)',
      'PubMed',
      'miRBase',
    ],
    correctIndex: 1,
    explanation: 'The Protein Data Bank (PDB) is the single global archive of 3D structural data of proteins, nucleic acids, and complex assemblies.',
    hints: [
      'Focus on 3D structures of biomolecules.',
      'Abbreviated as PDB.',
      'Protein Data Bank.',
    ],
  },
  {
    id: 'ch_6',
    nodeId: 'c11_bt_cbse_268',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Genomic History',
    question: 'Which sequencing approach was spearheaded by the public Human Genome Project consortium under Francis Collins?',
    options: [
      'Hierarchical Shotgun Sequencing (BAC-based mapping)',
      'Whole Genome Shotgun Sequencing without mapping',
      'Single-molecule Nanopore sequencing',
      'Pyrosequencing on microchips',
    ],
    correctIndex: 0,
    explanation: 'The public HGP used hierarchical shotgun sequencing, constructing Bacterial Artificial Chromosome (BAC) physical maps before sequencing individual clones.',
    hints: [
      'It involved BAC clones and physical maps first.',
      'It was hierarchical, unlike Celera’s direct shotgun method.',
      'Hierarchical Shotgun Sequencing.',
    ],
  },
  {
    id: 'ch_7',
    nodeId: 'c11_bt_cbse_285',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Functional Annotation',
    question: 'What are the three official standardized domains structured within the Gene Ontology (GO) framework?',
    options: [
      'Biological Process, Molecular Function, Cellular Component',
      'Genotype, Phenotype, Karyotype',
      'Transcription, Translation, Replication',
      'Exon, Intron, Promoter',
    ],
    correctIndex: 0,
    explanation: 'Gene Ontology (GO) categorizes gene functions into three controlled vocabularies: Biological Process (BP), Molecular Function (MF), and Cellular Component (CC).',
    hints: [
      'GO categorizes process, function, and cell location.',
      'BP, MF, CC.',
      'Biological Process, Molecular Function, Cellular Component.',
    ],
  },

  // STANDARD TIER (9)
  {
    id: 'ch_8',
    nodeId: 'c11_bt_cbse_265',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Mathematical Calculation',
    question: 'If a sequencing base has a Phred Quality Score of Q = 30, what is the probability P of this base call being an error? Enter as a decimal (e.g. 0.001).',
    correctAnswer: 0.001,
    tolerance: 0.0001,
    explanation: 'Q = -10 * log10(P) => 30 = -10 * log10(P) => log10(P) = -3 => P = 10^-3 = 0.001 (0.1% error rate).',
    hints: [
      'Formula: Q = -10 * log10(P).',
      '30 / -10 = -3.',
      '10^(-3) = 0.001.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_9',
    nodeId: 'c11_bt_cbse_262',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Experimental Technology',
    question: 'Which experimental technique is designed for high-throughput quantification of genome-wide mRNA transcript abundance using cDNA sequencing?',
    options: [
      'RNA-seq (RNA Sequencing)',
      'X-ray Diffraction',
      'Sanger Sanger-Dideoxy Manual Gels',
      'Western Blotting',
    ],
    correctIndex: 0,
    explanation: 'RNA-seq uses next-generation sequencing to reveal the presence and quantity of RNA transcripts in a biological sample at a given moment.',
    hints: [
      'It sequences transcriptome cDNA.',
      'High-throughput transcriptome assay.',
      'RNA-seq.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: 'c11_bt_cbse_275',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Statistical Analysis',
    question: 'Why is Benjamini-Hochberg False Discovery Rate (FDR) preferred over Bonferroni correction in large-scale transcriptomics experiments?',
    options: [
      'FDR reduces computational time to zero.',
      'Bonferroni is overly conservative and leads to high Type II errors (missing true positives), whereas FDR controls the proportion of false positives among rejected null hypotheses.',
      'Bonferroni only works on protein data, not RNA data.',
      'FDR guarantees that zero false positives will ever occur.',
    ],
    correctIndex: 1,
    explanation: 'Bonferroni controls family-wise error rate very strictly (alpha/m), leading to excessive false negatives in high-dimensional genomics. FDR balances detection power while controlling false discoveries.',
    hints: [
      'Bonferroni rejects too many real biological hits.',
      'FDR balances false positive control with statistical power.',
      'FDR reduces Type II errors compared to Bonferroni.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_11',
    nodeId: 'c11_bt_cbse_276',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Statistical Calculation',
    question: 'In a gene co-expression linear regression model y = 2.5x + 1.2, if expression level x of Gene A is 4.0 RPKM, what is the predicted expression level y of target Gene B?',
    correctAnswer: 11.2,
    tolerance: 0.1,
    explanation: 'Substitute x = 4.0 into y = 2.5(4.0) + 1.2 = 10.0 + 1.2 = 11.2.',
    hints: [
      'Use the linear equation y = m*x + c.',
      'Multiply 2.5 by 4.0.',
      'Add 1.2 to 10.0 = 11.2.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: 'c11_bt_cbse_278',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Statistical Pitfalls',
    question: 'What statistical misuse occurs when a researcher tests hundreds of hypotheses without adjustment and selects only those with p < 0.05 for publication?',
    options: [
      'Data dredging / p-hacking',
      'Principle component orthogonalization',
      'Homoscedasticity normalization',
      'Bayesian prior update',
    ],
    correctIndex: 0,
    explanation: 'p-hacking (or data dredging) involves selectively reporting significant p-values obtained by running multiple uncorrected statistical tests, leading to non-reproducible false discoveries.',
    hints: [
      'Manipulating or searching until p < 0.05 is found.',
      'Also known as data dredging.',
      'p-hacking.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_13',
    nodeId: 'c11_bt_cbse_281',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Genome Informatics',
    question: 'Which data structure is most widely used by modern short-read assemblers (e.g. SPAdes, Velvet) to assemble short Illumina reads into contigs?',
    options: [
      'De Bruijn Graph (k-mer overlap graph)',
      'Binary Search Tree',
      'Red-Black Tree',
      'Suffolk Matrix',
    ],
    correctIndex: 0,
    explanation: 'De Bruijn graphs break reads into overlapping k-mers as nodes and edges, enabling efficient de novo assembly of billions of short reads without pairwise all-against-all comparison.',
    hints: [
      'It breaks sequences into k-mers.',
      'Named after Nicolaas Govert de Bruijn.',
      'De Bruijn Graph.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_14',
    nodeId: 'c11_bt_cbse_282',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Gene Prediction Methods',
    question: 'Ab initio gene prediction software uses which statistical probability framework to model exon-intron state transitions and splice site signals?',
    options: [
      'Hidden Markov Models (HMMs)',
      'Linear Discriminant Analysis (LDA)',
      'K-Means Clustering',
      'Monte Carlo Molecular Dynamics',
    ],
    correctIndex: 0,
    explanation: 'Hidden Markov Models (HMMs) model unobserved genomic states (exons, introns, intergenic) based on sequence emissions (nucleotides) and transition probabilities.',
    hints: [
      'State transition models with hidden variables.',
      'Abbreviated as HMM.',
      'Hidden Markov Models.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_15',
    nodeId: 'c11_bt_cbse_283',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'RNA Transcript Informatics',
    question: 'Which canonical dinucleotide sequence pair marks the standard eukaryotic pre-mRNA intron splice donor (5\') and splice acceptor (3\') sites?',
    options: [
      'GT at 5\' splice site and AG at 3\' splice site (GT-AG rule)',
      'AT at 5\' splice site and GC at 3\' splice site',
      'AA at 5\' splice site and TT at 3\' splice site',
      'CG at 5\' splice site and CG at 3\' splice site',
    ],
    correctIndex: 0,
    explanation: 'The universal GT-AG rule states that introns almost always start with GT (GU in RNA) at the 5\' splice donor site and end with AG at the 3\' splice acceptor site.',
    hints: [
      'Known as the GT-AG rule.',
      'Donor starts with GT, acceptor ends with AG.',
      'GT at 5\' and AG at 3\'.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: 'c11_bt_cbse_287',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'AI in Bioinformatics',
    question: 'Which breakthrough deep learning architecture developed by DeepMind solved the 50-year-old protein folding challenge by predicting 3D structures with atomic accuracy?',
    options: [
      'AlphaFold',
      'BLAST+',
      'Clustal Omega',
      'Bowtie2',
    ],
    correctIndex: 0,
    explanation: 'AlphaFold (specifically AlphaFold2) uses deep neural networks with spatial attention modules to predict protein 3D structures from primary amino acid sequences with experimental accuracy.',
    hints: [
      'Developed by DeepMind.',
      'Named Alpha...',
      'AlphaFold.',
    ],
  },

  // ADVANCED TIER (8)
  {
    id: 'ch_17',
    nodeId: 'c11_bt_cbse_265',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Quantitative Analysis',
    question: 'If a sequencing run delivers base calls with an error probability P of 0.0001 (0.01% error rate), what is the calculated Phred Quality Score Q?',
    correctAnswer: 40,
    tolerance: 0.5,
    explanation: 'Q = -10 * log10(0.0001) = -10 * (-4) = 40.',
    hints: [
      'Q = -10 * log10(P).',
      'log10(10^-4) = -4.',
      '-10 * -4 = 40.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: 'c11_bt_cbse_286',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Algorithmic Computation',
    question: 'In UPGMA distance clustering, if Species A and Species B are merged into cluster (A,B) with pairwise distance d(A,B) = 6.0, at what branch height scale will the node connecting A and B be placed in the phylogenetic tree?',
    correctAnswer: 3.0,
    tolerance: 0.1,
    explanation: 'In UPGMA, the branching node height is exactly half of the pairwise distance: height = d(A,B) / 2 = 6.0 / 2 = 3.0.',
    hints: [
      'UPGMA assumes a molecular clock.',
      'Branch height is distance / 2.',
      '6.0 / 2 = 3.0.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: 'c11_bt_cbse_275',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Statistical FDR Calculation',
    question: 'You rank 5 p-values in ascending order: p1=0.002, p2=0.008, p3=0.015, p4=0.040, p5=0.090. For m=5 tests at FDR target q=0.05 using Benjamini-Hochberg (threshold (i/m)*q), what is the critical cutoff threshold value for the i=3 rank test?',
    correctAnswer: 0.03,
    tolerance: 0.001,
    explanation: 'BH threshold for rank i=3 out of m=5 tests with q=0.05 is: Threshold = (i / m) * q = (3 / 5) * 0.05 = 0.6 * 0.05 = 0.030.',
    hints: [
      'Formula: (i / m) * q.',
      'i=3, m=5, q=0.05.',
      '(3 / 5) * 0.05 = 0.03.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: 'c11_bt_cbse_280',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Informatics Processing',
    question: 'During FastQC assessment of Next-Generation Sequencing reads, what does a strong spike in the "Per Base Sequence Content" plot during the first 10-12 bases typically indicate?',
    options: [
      'Random hexamer priming bias from RNA-seq library preparation.',
      'Contamination by E. coli genomic DNA.',
      'Poly-A tail degradation.',
      'Instrument camera sensor failure.',
    ],
    correctIndex: 0,
    explanation: 'Random hexamer priming during reverse transcription in standard RNA-seq libraries exhibits sequence binding bias in the first ~10-12 bases, causing non-uniform base distributions.',
    hints: [
      'It stems from reverse transcription priming reagents.',
      'Random hexamer primers do not bind completely randomly.',
      'Random hexamer priming bias in library prep.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: 'c11_bt_cbse_284',
    type: 'classification',
    difficulty: 'advanced',
    competencyLevel: 'File Format Classification',
    question: 'Classify each genomic format item into its corresponding structural representation category.',
    categories: ['Sequence Storage', 'Feature Annotation', 'Quality Control'],
    itemCategories: {
      'FASTA (.fasta / .fa)': 'Sequence Storage',
      'GFF3 / GTF (.gff3)': 'Feature Annotation',
      'FASTQ (.fastq / .fq)': 'Quality Control',
      'BED file (.bed)': 'Feature Annotation',
    },
    explanation: 'FASTA stores raw sequences; FASTQ includes per-base quality scores; GFF3 and BED files store genomic feature coordinates (genes, exons, promoters).',
    hints: [
      'FASTA is pure sequence.',
      'FASTQ carries quality scores.',
      'GFF3/BED store coordinate annotations.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: 'c11_bt_cbse_277',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Multivariate Analysis',
    question: 'Which dimensionality reduction technique transforms high-dimensional single-cell gene expression matrix into uncorrelated orthogonal components maximizing variance?',
    options: [
      'Principal Component Analysis (PCA)',
      'Pearson Correlation Coefficient',
      'Simple Linear Regression',
      'Student t-test',
    ],
    correctIndex: 0,
    explanation: 'PCA identifies orthogonal linear combinations (principal components) of original variables that capture the maximum variance in multi-dimensional datasets.',
    hints: [
      'Transforms variables into orthogonal components.',
      'Abbreviated as PCA.',
      'Principal Component Analysis.',
    ],
  },
  {
    id: 'ch_23',
    nodeId: 'c11_bt_cbse_267',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Database Architecture',
    question: 'What is the primary distinction between Primary biological databases and Secondary biological databases?',
    options: [
      'Primary databases store raw experimental data submitted directly by researchers (e.g. GenBank); secondary databases contain curated, value-added analyzed results (e.g. PROSITE, RefSeq).',
      'Primary databases are paper-bound books; secondary databases are online files.',
      'Primary databases store human data only; secondary databases store plant data.',
      'There is no difference between them.',
    ],
    correctIndex: 0,
    explanation: 'Primary databases repository raw experimental sequences directly submitted by scientists. Secondary databases derive domain annotations, patterns, and curated alignments from primary data.',
    hints: [
      'Primary = raw submitted sequence repositories.',
      'Secondary = curated value-added databases derived from primary data.',
      'GenBank (Primary) vs RefSeq/PROSITE (Secondary).',
    ],
  },
  {
    id: 'ch_24',
    nodeId: 'c11_bt_cbse_273',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Statistical Inference',
    question: 'In clinical biomarker discovery, committing a Type I error (alpha) means:',
    options: [
      'Rejecting a true null hypothesis (false positive result).',
      'Failing to reject a false null hypothesis (false negative result).',
      'Calculating the standard deviation incorrectly.',
      'Sequencing DNA backward.',
    ],
    correctIndex: 0,
    explanation: 'A Type I error occurs when the null hypothesis is true, but is incorrectly rejected (false positive). Type II error is failing to reject a false null hypothesis (false negative).',
    hints: [
      'Type I error = False Positive.',
      'Rejecting null when it is actually true.',
      'False positive result.',
    ],
  },
];

// ==========================================
// 6. SVG CUSTOM DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: FASTQ Quality Score & Error Probability Curve
const FastaFastqDiagramSVG: React.FC<{ phred: number }> = ({ phred }) => {
  const errorProb = Math.pow(10, -phred / 10);
  const accuracy = (100 * (1 - errorProb)).toFixed(3);

  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
      <text x="250" y="22" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold">
        FASTQ Quality Metric: Phred Score vs Accuracy
      </text>
      
      {/* Background Grid */}
      <line x1="50" y1="180" x2="450" y2="180" stroke="#475569" strokeWidth="2" />
      <line x1="50" y1="40" x2="50" y2="180" stroke="#475569" strokeWidth="2" />

      {/* Axis Labels */}
      <text x="250" y="215" fill="#94a3b8" textAnchor="middle" className="text-xs">Phred Score (Q)</text>
      <text x="20" y="110" fill="#94a3b8" textAnchor="middle" transform="rotate(-90 20 110)" className="text-xs">
        Accuracy (%)
      </text>

      {/* Accuracy Curve */}
      <path
        d="M 50 170 Q 150 160, 200 80 T 450 45"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
      />

      {/* Dynamic Marker */}
      {(() => {
        const cx = 50 + (phred / 40) * 400;
        const cy = 180 - ((1 - errorProb) * 135);
        return (
          <g>
            <line x1={cx} y1="40" x2={cx} y2="180" stroke="#f59e0b" strokeDasharray="4,4" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <rect x={cx - 65} y={cy - 35} width="130" height="26" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <text x={cx} y={cy - 18} fill="#f8fafc" textAnchor="middle" className="text-xs font-mono font-bold">
              Q{phred} | Acc: {accuracy}%
            </text>
          </g>
        );
      })()}

      {/* Reference Ticks */}
      <text x="50" y="195" fill="#64748b" textAnchor="middle" className="text-xs font-mono">Q0</text>
      <text x="150" y="195" fill="#64748b" textAnchor="middle" className="text-xs font-mono">Q10</text>
      <text x="250" y="195" fill="#64748b" textAnchor="middle" className="text-xs font-mono">Q20</text>
      <text x="350" y="195" fill="#64748b" textAnchor="middle" className="text-xs font-mono">Q30</text>
      <text x="450" y="195" fill="#64748b" textAnchor="middle" className="text-xs font-mono">Q40</text>
    </svg>
  );
};

// Diagram 2: De Bruijn Genome Assembly Graph SVG
const GenomeAssemblyDeBruijnSVG: React.FC<{ kmerSize: number }> = ({ kmerSize }) => {
  const sequence = 'ATGCGATCGAT';
  const kmers: string[] = [];
  for (let i = 0; i <= sequence.length - kmerSize; i++) {
    kmers.push(sequence.substring(i, i + kmerSize));
  }

  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
      <text x="250" y="22" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold">
        De Bruijn Graph (k = {kmerSize}) Overlap Nodes & Eulerian Path
      </text>

      {/* Target Reference String */}
      <text x="250" y="48" fill="#94a3b8" textAnchor="middle" className="text-xs font-mono">
        Reference Sequence: <tspan fill="#f59e0b">{sequence}</tspan>
      </text>

      {/* K-mer list rendering */}
      <g transform="translate(20, 70)">
        <text x="0" y="0" fill="#cbd5e1" className="text-xs font-semibold">Extracted K-mers ({kmers.length}):</text>
        {kmers.map((km, idx) => (
          <rect
            key={idx}
            x={idx * 58}
            y={12}
            width="52"
            height="26"
            rx="4"
            fill="#1e293b"
            stroke="#38bdf8"
            strokeWidth="1"
          />
        ))}
        {kmers.map((km, idx) => (
          <text key={idx} x={idx * 58 + 26} y={29} fill="#38bdf8" textAnchor="middle" className="text-xs font-mono font-bold">
            {km}
          </text>
        ))}
      </g>

      {/* Graph Nodes & Edges */}
      <g transform="translate(50, 150)">
        {kmers.slice(0, 5).map((km, idx) => {
          const cx = idx * 90 + 30;
          const cy = idx % 2 === 0 ? 20 : 50;
          const nextCx = (idx + 1) * 90 + 30;
          const nextCy = (idx + 1) % 2 === 0 ? 20 : 50;

          return (
            <g key={idx}>
              {idx < 4 && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={nextCx}
                  y2={nextCy}
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                />
              )}
              <circle cx={cx} cy={cy} r="18" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
              <text x={cx} y={cy + 4} fill="#e2e8f0" textAnchor="middle" className="text-[10px] font-mono font-bold">
                {km.substring(0, kmerSize - 1)}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// Diagram 3: Volcano Plot SVG for Transcriptomics FDR Correction
const VolcanoPlotSVG: React.FC<{ fdrThreshold: number; applyCorrection: boolean }> = ({
  fdrThreshold,
  applyCorrection,
}) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 120; i++) {
      const fc = (Math.sin(i * 1.3) * 3) + ((i % 5) * 0.2 - 0.5);
      const pVal = Math.exp(-((fc * fc) / 2) - ((i % 7) * 0.4));
      const negLogP = -Math.log10(Math.max(pVal, 1e-6));
      pts.push({ fc, pVal, negLogP, id: i });
    }
    return pts;
  }, []);

  const cutoffY = applyCorrection ? 180 - (Math.min(fdrThreshold * 40, 4) * 30) : 180 - (1.3 * 30);

  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
      <text x="250" y="20" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold">
        Differential Gene Expression Volcano Plot ({applyCorrection ? 'FDR Adjusted' : 'Raw p < 0.05'})
      </text>

      {/* Axes */}
      <line x1="50" y1="190" x2="450" y2="190" stroke="#475569" strokeWidth="2" />
      <line x1="250" y1="30" x2="250" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
      <line x1="50" y1="30" x2="50" y2="190" stroke="#475569" strokeWidth="2" />

      {/* Axis Titles */}
      <text x="250" y="218" fill="#94a3b8" textAnchor="middle" className="text-xs">Log2 Fold Change</text>
      <text x="20" y="110" fill="#94a3b8" textAnchor="middle" transform="rotate(-90 20 110)" className="text-xs">
        -log10 (p-value)
      </text>

      {/* Threshold line */}
      <line x1="50" y1={cutoffY} x2="450" y2={cutoffY} stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
      <text x="440" y={cutoffY - 5} fill="#ef4444" textAnchor="end" className="text-[10px] font-bold">
        Significance Cutoff
      </text>

      {/* Points */}
      {points.map((pt) => {
        const cx = 250 + pt.fc * 55;
        const cy = 190 - pt.negLogP * 30;
        const isSignificant = cy < cutoffY && Math.abs(pt.fc) > 1.0;
        const color = isSignificant ? (pt.fc > 0 ? '#10b981' : '#f59e0b') : '#64748b';

        return (
          <circle
            key={pt.id}
            cx={Math.max(55, Math.min(445, cx))}
            cy={Math.max(35, Math.min(185, cy))}
            r={isSignificant ? '4' : '2.5'}
            fill={color}
            opacity={isSignificant ? 0.9 : 0.4}
          />
        );
      })}
    </svg>
  );
};

// Diagram 4: Phylogenetic Tree SVG
const PhylogeneticTreeSVG: React.FC<{ distAB: number }> = ({ distAB }) => {
  const branchHeight = (distAB / 2).toFixed(2);

  return (
    <svg viewBox="0 0 500 220" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
      <text x="250" y="22" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold">
        UPGMA Phylogenetic Cladogram Construction
      </text>

      {/* Root line */}
      <line x1="60" y1="110" x2="160" y2="110" stroke="#94a3b8" strokeWidth="3" />

      {/* Node 1 split */}
      <line x1="160" y1="50" x2="160" y2="170" stroke="#94a3b8" strokeWidth="3" />

      {/* Outgroup branch Species C */}
      <line x1="160" y1="170" x2="400" y2="170" stroke="#38bdf8" strokeWidth="3" />
      <text x="415" y="174" fill="#38bdf8" className="text-xs font-bold font-mono">Species C (Outgroup)</text>

      {/* Cluster (A, B) split */}
      <line x1="160" y1="50" x2="260" y2="50" stroke="#94a3b8" strokeWidth="3" />
      <line x1="260" y1="30" x2="260" y2="110" stroke="#10b981" strokeWidth="3" />

      <line x1="260" y1="30" x2="400" y2="30" stroke="#10b981" strokeWidth="3" />
      <text x="415" y="34" fill="#10b981" className="text-xs font-bold font-mono">Species A</text>

      <line x1="260" y1="110" x2="400" y2="110" stroke="#10b981" strokeWidth="3" />
      <text x="415" y="114" fill="#10b981" className="text-xs font-bold font-mono">Species B</text>

      {/* Branch distance annotation */}
      <rect x="270" y="60" width="120" height="24" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
      <text x="330" y="76" fill="#f8fafc" textAnchor="middle" className="text-xs font-mono font-semibold">
        Height = {branchHeight} Myr
      </text>
    </svg>
  );
};

// ==========================================
// 7. MAIN INTERACTIVE SIMULATION COMPONENT
// ==========================================
export const C11_BiotechBioinformaticsCBSESim: React.FC = () => {
  // State for Navigation Tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'explore' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab States
  const [phredScore, setPhredScore] = useState<number>(20);
  const [kmerSize, setKmerSize] = useState<number>(5);
  const [matchScore, setMatchScore] = useState<number>(2);
  const [mismatchPenalty, setMismatchPenalty] = useState<number>(-1);
  const [gapPenalty, setGapPenalty] = useState<number>(-2);
  const [applyFDR, setApplyFDR] = useState<boolean>(false);
  const [fdrAlpha, setFdrAlpha] = useState<number>(0.05);
  const [distAB, setDistAB] = useState<number>(6.0);

  // Discovery Question state
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [showDiscoveryExplanation, setShowDiscoveryExplanation] = useState<boolean>(false);

  // Challenge Engine States
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [classificationAnswers, setClassificationAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  // Interactive Visual Elements
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT State tracking map per Node
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    return initialMap as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // SM-2 Spaced Repetition items
  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((ch) => {
      initialMap[ch.id] = createReviewItem(ch.id);
    });
    return initialMap;
  });

  // Inactivity Hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetHintTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 10000); // 10s inactivity hint
  }, []);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, resetHintTimer]);

  // Handle Discovery Answer Selection
  const handleSelectDiscovery = (index: number) => {
    setSelectedDiscoveryOption(index);
    setShowDiscoveryExplanation(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct observation! Multiple testing produces false positives by pure chance.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Consider the statistical significance across 20000 genes.');
    }
  };

  // BLAST E-value computation logic for Lab 3
  const blastAlignmentScore = useMemo(() => {
    // Standard sequence alignment mock score
    const matches = 12;
    const mismatches = 3;
    const gaps = 2;
    return matches * matchScore + mismatches * mismatchPenalty + gaps * gapPenalty;
  }, [matchScore, mismatchPenalty, gapPenalty]);

  const blastEValue = useMemo(() => {
    const rawScore = Math.max(1, blastAlignmentScore);
    const evalue = 1000 * Math.exp(-0.25 * rawScore);
    return evalue < 1e-10 ? '< 1e-10 (Highly Significant)' : evalue.toExponential(2);
  }, [blastAlignmentScore]);

  // Challenge Handling Logic
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setClassificationAnswers({});
    setFeedback(null);
    setShowHint(false);
    setCurrentHintIndex(0);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('swoop');
    } else {
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have mastered all Bioinformatics diagnostic challenges.');
      setShowConfetti(true);
      setShowSuccess(true);
      recordGameScore(ALL_NODE_IDS, score);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentChallenge) return;

    let isCorrect = false;

    if (currentChallenge.type === 'multiple_choice') {
      isCorrect = selectedOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && currentChallenge.correctAnswer !== undefined) {
        const tol = currentChallenge.tolerance || 0.01;
        isCorrect = Math.abs(val - currentChallenge.correctAnswer) <= tol;
      }
    } else if (currentChallenge.type === 'classification') {
      if (currentChallenge.itemCategories) {
        const totalKeys = Object.keys(currentChallenge.itemCategories).length;
        let matched = 0;
        Object.entries(currentChallenge.itemCategories).forEach(([item, cat]) => {
          if (classificationAnswers[item] === cat) matched++;
        });
        isCorrect = matched === totalKeys;
      }
    }

    // Sound and voice feedback
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent work! Your answer is correct.');
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setShowSparkle(true);
      setFeedback({
        isCorrect: true,
        message: currentChallenge.explanation,
      });
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('That is not quite right. Review the hint and try again.');
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `Incorrect. ${currentChallenge.explanation}`,
      });
    }

    // BKT & SM2 Updates
    const nodeId = currentChallenge.nodeId;
    const currentBkt = bktStates[nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const currentSrs = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.id]: updatedSrs }));
  };

  // Prediction answer verification
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number | null>>({ 0: null, 1: null });

  const handleSelectPrediction = (qIdx: number, optIdx: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    audioManager.play('tap');
  };

  // Observation answer verification
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number | null>>({ 0: null, 1: null });

  const handleSelectObservation = (qIdx: number, optIdx: number) => {
    setObservationAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    if (optIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex) {
      audioManager.play('chime');
    } else {
      audioManager.play('error');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col gap-6">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Bioinformatics Certification Complete!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-1">
            <span>ISC Class 11 Biology</span>
            <span>•</span>
            <span>Unit: Computational Biology</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {SCENARIO.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">{SCENARIO.intro}</p>
        </div>

        {/* Global Progress Badges */}
        <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="block text-xs text-slate-400 uppercase font-mono">Score</span>
            <span className="text-xl font-bold text-amber-400 font-mono">{score}</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <span className="block text-xs text-slate-400 uppercase font-mono">Streak</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{streak} 🔥</span>
          </div>
        </div>
      </header>

      {/* Primary Navigation Tabs */}
      <nav className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-2">
        {(['discovery', 'explore', 'challenges', 'summary'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              audioManager.play('tap');
            }}
            className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 capitalize ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {tab === 'discovery' && '1. Discovery & Hypotheses'}
            {tab === 'explore' && '2. Interactive Exploration Labs (5)'}
            {tab === 'challenges' && `3. Diagnostics & Mastery (${CHALLENGES.length})`}
            {tab === 'summary' && '4. Misconceptions & Real-World Lab'}
          </button>
        ))}
      </nav>

      {/* ========================================== */}
      {/* TAB 1: DISCOVERY & PREDICTIONS */}
      {/* ========================================== */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          {/* Main Discovery Scenario Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400 font-semibold">
              <span className="p-2 bg-amber-500/10 rounded-lg">💡</span>
              <h2 className="text-lg font-bold">Counterintuitive Genomic Discovery Problem</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {DISCOVERY_QUESTION.question}
            </p>

            {/* Discovery Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectDiscovery(idx)}
                  className={`p-4 rounded-xl border text-left text-sm transition-all duration-200 ${
                    selectedDiscoveryOption === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {/* Explanation reveal */}
            {showDiscoveryExplanation && (
              <div className="mt-4 p-4 bg-indigo-950/50 border border-indigo-800/60 rounded-xl text-indigo-200 text-sm animate-fadeIn">
                <span className="font-bold block text-indigo-400 mb-1">Scientific Context & Solution:</span>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </div>

          {/* Interactive Predictions Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🔮</span> Hypothesis & Predictive Reasoning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PREDICTION_QUESTIONS.map((pred, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-200 text-sm mb-3">{pred.question}</h3>
                    <div className="space-y-2 mb-4">
                      {pred.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectPrediction(qIdx, optIdx)}
                          className={`w-full p-3 rounded-lg text-left text-xs transition-colors ${
                            predictionAnswers[qIdx] === optIdx
                              ? optIdx === pred.correctIndex
                                ? 'bg-emerald-900/40 border border-emerald-500 text-emerald-300'
                                : 'bg-rose-900/40 border border-rose-500 text-rose-300'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {predictionAnswers[qIdx] !== null && (
                    <div className="p-3 bg-slate-900 rounded-lg text-xs text-amber-300 border border-amber-500/30">
                      🔍 <strong>Verification:</strong> {pred.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: EXPLORATION LABS (5 LABS) */}
      {/* ========================================== */}
      {activeTab === 'explore' && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🧪</span> Bioinformatics Computational Laboratories
            </h2>
            <p className="text-slate-400 text-sm">
              Work through all 5 interactive lab steps below. Adjust mathematical parameters and observe live sequence alignment, assembly graphs, quality metrics, and statistical volcano plots.
            </p>

            {/* Render Map of 5 Exploration Lab Steps */}
            <div className="grid grid-cols-1 gap-8">
              {EXPLORATION_STEPS.map((labStep, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-indigo-400">{labStep.title}</h3>
                    <span className="text-xs font-mono bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800/50">
                      Node: {NODE_TITLES[labStep.nodeId]}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm">{labStep.instruction}</p>

                  {/* Lab 1 Interactive Widget: FASTQ Trimmer */}
                  {labStep.interactionType === 'fastq_qc_trimmer' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <label className="text-sm font-semibold text-slate-300 min-w-32">
                          Phred Score (Q): <span className="text-amber-400 font-mono font-bold">Q{phredScore}</span>
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="40"
                          step="5"
                          value={phredScore}
                          onChange={(e) => {
                            setPhredScore(parseInt(e.target.value));
                            audioManager.play('pop');
                          }}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                      <FastaFastqDiagramSVG phred={phredScore} />
                    </div>
                  )}

                  {/* Lab 2 Interactive Widget: De Bruijn Assembler */}
                  {labStep.interactionType === 'debruijn_assembler' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <label className="text-sm font-semibold text-slate-300 min-w-32">
                          K-mer Size (k): <span className="text-emerald-400 font-mono font-bold">{kmerSize}</span>
                        </label>
                        <input
                          type="range"
                          min="3"
                          max="7"
                          step="1"
                          value={kmerSize}
                          onChange={(e) => {
                            setKmerSize(parseInt(e.target.value));
                            audioManager.play('pop');
                          }}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>
                      <GenomeAssemblyDeBruijnSVG kmerSize={kmerSize} />
                    </div>
                  )}

                  {/* Lab 3 Interactive Widget: Sequence Alignment BLAST */}
                  {labStep.interactionType === 'blast_alignment' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Match Score</label>
                          <input
                            type="number"
                            value={matchScore}
                            onChange={(e) => setMatchScore(parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-emerald-400 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Mismatch Penalty</label>
                          <input
                            type="number"
                            value={mismatchPenalty}
                            onChange={(e) => setMismatchPenalty(parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-rose-400 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Gap Open Penalty</label>
                          <input
                            type="number"
                            value={gapPenalty}
                            onChange={(e) => setGapPenalty(parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-amber-400 font-mono"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-around text-center">
                        <div>
                          <span className="text-xs text-slate-400 block">Alignment Score (S)</span>
                          <span className="text-xl font-bold text-indigo-400 font-mono">{blastAlignmentScore}</span>
                        </div>
                        <div className="w-px h-10 bg-slate-800" />
                        <div>
                          <span className="text-xs text-slate-400 block">BLAST Expect Value (E)</span>
                          <span className="text-xl font-bold text-emerald-400 font-mono">{blastEValue}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lab 4 Interactive Widget: Differential Expression Volcano Plot */}
                  {labStep.interactionType === 'volcano_fdr_plot' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <button
                          onClick={() => {
                            setApplyFDR(!applyFDR);
                            audioManager.play('tap');
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            applyFDR
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {applyFDR ? 'FDR Correction (Benjamini-Hochberg ON)' : 'Raw p < 0.05 Cutoff (NO Correction)'}
                        </button>

                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-400">Target Alpha / FDR (q):</label>
                          <select
                            value={fdrAlpha}
                            onChange={(e) => setFdrAlpha(parseFloat(e.target.value))}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-amber-400 font-mono"
                          >
                            <option value={0.05}>0.05</option>
                            <option value={0.01}>0.01</option>
                            <option value={0.001}>0.001</option>
                          </select>
                        </div>
                      </div>
                      <VolcanoPlotSVG fdrThreshold={fdrAlpha} applyCorrection={applyFDR} />
                    </div>
                  )}

                  {/* Lab 5 Interactive Widget: UPGMA Phylogenetic Tree */}
                  {labStep.interactionType === 'upgma_phylogeny' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <label className="text-sm font-semibold text-slate-300 min-w-44">
                          Pairwise Distance d(A,B): <span className="text-cyan-400 font-mono font-bold">{distAB} Myr</span>
                        </label>
                        <input
                          type="range"
                          min="2.0"
                          max="12.0"
                          step="0.5"
                          value={distAB}
                          onChange={(e) => {
                            setDistAB(parseFloat(e.target.value));
                            audioManager.play('pop');
                          }}
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>
                      <PhylogeneticTreeSVG distAB={distAB} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Render Observation Questions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>👁️</span> Empirical Observation Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OBSERVATION_QUESTIONS.map((obs, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="font-semibold text-slate-200 text-sm">{obs.question}</h3>
                  <div className="space-y-2">
                    {obs.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectObservation(qIdx, optIdx)}
                        className={`w-full p-3 rounded-lg text-left text-xs transition-colors ${
                          observationAnswers[qIdx] === optIdx
                            ? optIdx === obs.correctIndex
                              ? 'bg-emerald-900/40 border border-emerald-500 text-emerald-300 font-semibold'
                              : 'bg-rose-900/40 border border-rose-500 text-rose-300'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: DIAGNOSTIC CHALLENGES & MASTERY */}
      {/* ========================================== */}
      {activeTab === 'challenges' && currentChallenge && (
        <div className="space-y-6">
          {/* Challenge Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400">
              Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
              Tier: {currentChallenge.difficulty.toUpperCase()} | Competency: {currentChallenge.competencyLevel}
            </span>
          </div>

          {/* Active Challenge Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 relative">
            <div className="space-y-2">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wide">
                Topic Node: {NODE_TITLES[currentChallenge.nodeId]}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white leading-snug">
                {currentChallenge.question}
              </h2>
            </div>

            {/* Hint Bubble Component */}
            <HintBubble
              show={showHint}
              text={currentChallenge.hints[currentHintIndex] || currentChallenge.hints[0]}
            />

            {/* Answer Input Area by Challenge Type */}
            {currentChallenge.type === 'multiple_choice' && currentChallenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedOption(idx);
                      audioManager.play('tap');
                    }}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      selectedOption === idx
                        ? 'bg-indigo-900/60 border-indigo-500 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {currentChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <label className="block text-xs text-slate-400 font-mono">Enter Numerical Answer:</label>
                <input
                  type="number"
                  step="any"
                  value={numericAnswer}
                  onChange={(e) => setNumericAnswer(e.target.value)}
                  placeholder="e.g. 0.001"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-base font-mono text-emerald-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {currentChallenge.type === 'classification' && currentChallenge.categories && currentChallenge.itemCategories && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Assign each item to its correct category:</p>
                {Object.keys(currentChallenge.itemCategories).map((item) => (
                  <div key={item} className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-sm font-mono text-slate-200">{item}</span>
                    <select
                      value={classificationAnswers[item] || ''}
                      onChange={(e) => setClassificationAnswers({ ...classificationAnswers, [item]: e.target.value })}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-indigo-300 font-semibold"
                    >
                      <option value="">-- Select Category --</option>
                      {currentChallenge.categories?.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Feedback Banner */}
            {feedback && (
              <div
                className={`p-4 rounded-xl text-sm border font-medium animate-fadeIn ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500 text-rose-200'
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint(true);
                  setCurrentHintIndex((prev) => (prev + 1) % currentChallenge.hints.length);
                  audioManager.play('hint');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-xl transition-all"
              >
                💡 Need Hint ({currentHintIndex + 1}/{currentChallenge.hints.length})
              </button>

              {!feedback ? (
                <button
                  onClick={handleCheckAnswer}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Submit & Verify
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
                >
                  Continue to Next Challenge →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 4: MISCONCEPTIONS & REAL WORLD LAB */}
      {/* ========================================== */}
      {activeTab === 'summary' && (
        <div className="space-y-8">
          {/* Real-World Activity Render */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-emerald-400 font-semibold">
              <span className="p-2 bg-emerald-500/10 rounded-lg">🏥</span>
              <h2 className="text-lg font-bold">{REAL_WORLD_ACTIVITY.title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-emerald-800">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-slate-300 leading-normal">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions & Corrections Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>⚠️</span> Common Conceptual Misconceptions & Corrections
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                    <span>❌ Misconception</span>
                  </div>
                  <p className="text-xs text-rose-200 font-medium">{m.misconception}</p>
                  <div className="w-full h-px bg-slate-800" />
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                    <span>✅ Scientific Reality</span>
                  </div>
                  <p className="text-xs text-emerald-200 leading-normal">{m.correction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Node Mastery Breakdown Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📊</span> ISC Topic Node Mastery Levels (BKT Engine)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
              {ALL_NODE_IDS.map((id) => {
                const state = bktStates[id] || createBKTState();
                const level = getMasteryLevel(state.pKnown);
                const pct = Math.round(state.pKnown * 100);

                return (
                  <div key={id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-slate-400 font-semibold">{id}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          level === 'mastered'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : level === 'beginner'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {level.toUpperCase()} ({pct}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium truncate">{NODE_TITLES[id]}</p>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C11_BiotechBioinformaticsCBSESim;