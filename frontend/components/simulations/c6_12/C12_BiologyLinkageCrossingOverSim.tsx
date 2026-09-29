'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 BIOLOGY NODE IDS ───
const NODE_C12_BIO_021 = 'c12_bio_021'; // Linkage and crossing over
const NODE_C12_BIO_022 = 'c12_bio_022'; // Mutation and sex-linked inheritance
const NODE_C12_BIO_023 = 'c12_bio_023'; // Genetic disorders (Mendelian and chromosomal)
const NODE_C12_BIO_024 = 'c12_bio_024'; // DNA as genetic material (experimental evidence)
const NODE_C12_BIO_025 = 'c12_bio_025'; // DNA structure (Watson-Crick double helix)
const NODE_C12_BIO_026 = 'c12_bio_026'; // DNA packaging and replication
const NODE_C12_BIO_027 = 'c12_bio_027'; // Transcription and RNA processing
const NODE_C12_BIO_028 = 'c12_bio_028'; // Genetic code and translation
const NODE_C12_BIO_029 = 'c12_bio_029'; // Gene regulation (lac operon)
const NODE_C12_BIO_030 = 'c12_bio_030'; // Human Genome Project and DNA fingerprinting

const ALL_NODE_IDS = [
  NODE_C12_BIO_021,
  NODE_C12_BIO_022,
  NODE_C12_BIO_023,
  NODE_C12_BIO_024,
  NODE_C12_BIO_025,
  NODE_C12_BIO_026,
  NODE_C12_BIO_027,
  NODE_C12_BIO_028,
  NODE_C12_BIO_029,
  NODE_C12_BIO_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Genomics & Molecular Genetics Lab: The Indian Heredity Odyssey',
  intro: 'At the Centre for Cellular and Molecular Biology (CCMB) in Hyderabad, researchers are decoding chromosomal inheritance, hereditary disorders in Indian populations, and the molecular machinery of life — from DNA replication and transcription to the lac operon switch and forensic DNA profiling.',
  context: 'Investigate how physical linkage on chromosomes alters Mendel’s ratios, track X-linked disorders across generations, build double helices, simulate replication forks, and switch operons in real time.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In Drosophila, two genes are situated extremely close together on the same homologous chromosome. In a dihybrid test cross, what ratio of phenotypes would you discover?',
  options: [
    'A classic Mendelian 1:1:1:1 ratio because all genes assort independently',
    'A 9:3:3:1 phenotypic ratio in the test-cross offspring',
    'Mostly parental phenotypes with near-zero recombinants due to physical linkage',
    '100% recombinant phenotypes because crossing over always splits adjacent loci',
  ],
  correctIndex: 2,
  hintAfter: 'Remember: genes physically tied to the same piece of DNA travel together into gametes unless separated by a crossover!',
};

// ─── CHALLENGE INTERFACE ───
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

// ─── 24 RICH CHALLENGES ACROSS 10 NODES & NEP 2020 COMPETENCY TIERS ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (8 challenges)
  {
    id: 'ch_bio_001_f',
    nodeId: NODE_C12_BIO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'During which specific sub-stage of Prophase I in meiosis does crossing over and chiasma formation occur between non-sister chromatids?',
    options: ['Leptotene', 'Zygotene', 'Pachytene', 'Diakinesis'],
    correctIndex: 2,
    explanation: 'Crossing over takes place specifically during the pachytene sub-stage of prophase I when homologous chromosomes are paired in synapsis to form a bivalent. Chiasmata become clearly visible during diplotene.',
    hints: [
      'Synapsis begins in zygotene, but actual segment exchange occurs in the third sub-stage.',
      'The term is derived from "pachys" meaning thick threads.',
      'It is the pachytene stage where recombination nodules and chiasmata form.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_002_f',
    nodeId: NODE_C12_BIO_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Red-Green Colour Blindness (X-linked recessive), which of the following genotypes represents a female carrier who possesses normal vision?',
    options: ['X^N X^N', 'X^N X^n', 'X^n X^n', 'X^n Y'],
    correctIndex: 1,
    explanation: 'A carrier female has one normal dominant allele (X^N) and one recessive mutant allele (X^n). Because the normal allele is dominant, her vision is phenotypically normal.',
    hints: [
      'A female must have two X chromosomes (XX).',
      'A carrier must carry one disease allele without expressing the condition.',
      'The genotype is heterozygous: X^N X^n.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_003_f',
    nodeId: NODE_C12_BIO_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the chromosomal karyotype and total chromosome count in an individual diagnosed with Klinefelter’s syndrome?',
    options: ['45, XO (45 chromosomes)', '47, XXY (47 chromosomes)', '47, +21 (47 chromosomes)', '46, XY (46 chromosomes)'],
    correctIndex: 1,
    explanation: 'Klinefelter’s syndrome is a chromosomal disorder caused by meiotic non-disjunction resulting in an extra X chromosome in males, yielding a 47,XXY karyotype.',
    hints: [
      'Klinefelter’s syndrome affects males and involves an extra sex chromosome.',
      'It is a sex chromosomal trisomy with 47 chromosomes.',
      'The karyotype is written as 47,XXY.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_004_f',
    nodeId: NODE_C12_BIO_024,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the Hershey-Chase experiment (1952), why did Phosphorus-32 (^32P) label DNA specifically, while Sulfur-35 (^35S) labeled viral protein coats?',
    options: [
      'DNA contains phosphorus in its sugar-phosphate backbone but lacks sulfur; proteins contain sulfur in amino acids but lack phosphorus.',
      'DNA contains sulfur in purine rings; proteins contain phosphorus in peptide bonds.',
      'Proteins incorporate phosphorus into peptide backbones, whereas DNA attracts sulfur.',
      'Both DNA and proteins absorb ^32P equally, but blender agitation only shears sulfur.',
    ],
    correctIndex: 0,
    explanation: 'DNA possesses a phosphodiester backbone containing phosphorus (and no sulfur), whereas amino acids such as methionine and cysteine in proteins contain sulfur (and no phosphorus).',
    hints: [
      'Think about the chemical elements unique to nucleic acids vs amino acids.',
      'Phosphate groups are in DNA; cysteine/methionine are in proteins.',
      'DNA has phosphorus (hence ^32P); protein has sulfur (hence ^35S).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_bio_005_f',
    nodeId: NODE_C12_BIO_025,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the Watson-Crick double helix model and Chargaff’s rules, what bonds connect complementary nitrogenous bases across the helix axis?',
    options: [
      'Covalent phosphodiester bonds',
      'Hydrogen bonds: 2 between A-T and 3 between G-C',
      'Hydrogen bonds: 3 between A-T and 2 between G-C',
      'Disulfide bridges and ionic bonds',
    ],
    correctIndex: 1,
    explanation: 'Adenine pairs with thymine via 2 hydrogen bonds (A=T), and guanine pairs with cytosine via 3 hydrogen bonds (G≡C). The sugar-phosphate backbone is held by covalent phosphodiester bonds.',
    hints: [
      'G-C pairs have higher thermal stability because they have one more bond than A-T pairs.',
      'A and T form 2 bonds; G and C form 3 bonds.',
      'These are non-covalent hydrogen bonds holding the two antiparallel strands together.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bio_006_f',
    nodeId: NODE_C12_BIO_026,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the structural components of the eukaryotic nucleosome core particle and linker.',
    dragItems: [
      { label: 'Histone Octamer Core (2x H2A, H2B, H3, H4)', targetId: 'part_octamer' },
      { label: 'Core DNA (~146 bp wound 1.65 turns)', targetId: 'part_dna' },
      { label: 'Histone H1 Clamp / Linker', targetId: 'part_h1' },
    ],
    correctMapping: {
      part_octamer: 'Histone Octamer Core (2x H2A, H2B, H3, H4)',
      part_dna: 'Core DNA (~146 bp wound 1.65 turns)',
      part_h1: 'Histone H1 Clamp / Linker',
    },
    explanation: 'A nucleosome consists of ~146 bp of negatively charged DNA wrapped around an octamer of basic histones (two each of H2A, H2B, H3, H4), with Histone H1 sealing the entry/exit linker DNA.',
    hints: [
      'The central spool is made of 8 histone proteins.',
      'The wrapped thread is the double-stranded DNA (~146 bp).',
      'The outer locking clamp on linker DNA is histone H1.',
    ],
  },
  {
    id: 'ch_bio_007_f',
    nodeId: NODE_C12_BIO_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which enzyme synthesises the primary eukaryotic RNA transcript (hnRNA) from the 3’ → 5’ DNA template strand in the 5’ → 3’ direction?',
    options: ['DNA Polymerase III', 'RNA Polymerase II', 'DNA Ligase', 'Peptidyl Transferase'],
    correctIndex: 1,
    explanation: 'In eukaryotes, RNA Polymerase II transcribes precursor mRNA (hnRNA), reading the 3’→5’ template strand and polymerising ribonucleotides in the 5’→3’ direction.',
    hints: [
      'It is an RNA polymerase, not a DNA polymerase.',
      'RNA Pol I makes rRNA, RNA Pol III makes tRNA, while Pol II makes mRNA/hnRNA.',
      'The answer is RNA Polymerase II.',
    ],
  },
  {
    id: 'ch_bio_008_f',
    nodeId: NODE_C12_BIO_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which codon functions both as the universal initiation (start) codon and codes for the amino acid Methionine?',
    options: ['UAA', 'UAG', 'AUG', 'UGA'],
    correctIndex: 2,
    explanation: 'AUG is the dual-function start codon that sets the reading frame and codes for Methionine (or N-formylmethionine in prokaryotes). UAA, UAG, and UGA are stop codons.',
    hints: [
      'It begins with adenine and ends with guanine.',
      'The stop codons start with U (UAA, UAG, UGA).',
      'The start codon is AUG.',
    ],
  },

  // Standard Tier (8 challenges)
  {
    id: 'ch_bio_009_s',
    nodeId: NODE_C12_BIO_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a dihybrid test cross (AaBb x aabb), out of 1,000 total progeny, 450 are AB, 450 are ab, 50 are Ab, and 50 are aB. What is the recombination frequency in percentage (map units / cM)?',
    correctAnswer: 10,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Recombinant progeny = 50 (Ab) + 50 (aB) = 100. Total progeny = 1,000. Recombination frequency = (100 / 1000) * 100 = 10% (which equals 10 centiMorgans or 10 map units).',
    hints: [
      'Identify the recombinant types: these are the non-parental combinations (Ab and aB).',
      'Add the recombinant numbers together: 50 + 50 = 100.',
      'Divide by total progeny (1000) and multiply by 100 to get the percentage.',
    ],
  },
  {
    id: 'ch_bio_010_s',
    nodeId: NODE_C12_BIO_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A man with normal blood clotting marries a woman who is a carrier for haemophilia (X^H X^h). What is the probability that their first SON will suffer from haemophilia?',
    options: ['0% (0.0)', '25% (0.25)', '50% (0.50)', '100% (1.0)'],
    correctIndex: 2,
    explanation: 'The mother provides either X^H or X^h with equal 50% probability to her sons. The father contributes a Y chromosome to all sons. Thus, among sons, 50% will be X^H Y (normal) and 50% will be X^h Y (haemophilic).',
    hints: [
      'Look strictly at the male offspring (sons receive Y from father, X from mother).',
      'The mother is X^H X^h, so half of her eggs carry the mutant X^h allele.',
      '50% of the sons inherit X^h and will have haemophilia.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_011_s',
    nodeId: NODE_C12_BIO_023,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the precise molecular and biochemical alteration responsible for Sickle Cell Anaemia?',
    options: [
      'Point mutation converting GAG to GUG in the 6th codon of the beta-globin gene, substituting Valine for Glutamic acid',
      'Frame-shift mutation deleting two bases in the alpha-globin gene, causing microcytic anaemia',
      'Transversion in the 6th codon of the beta-chain substituting Glutamic acid for Valine',
      'Trisomy of chromosome 11 causing excess production of abnormal beta chains',
    ],
    correctIndex: 0,
    explanation: 'Sickle cell anaemia is caused by a single base substitution (GAG → GTG in DNA, transcribed as GAG → GUG in mRNA) at the 6th position of the beta-globin chain, replacing hydrophilic Glutamic acid with hydrophobic Valine.',
    hints: [
      'Make sure you know the exact direction: Glutamic acid is replaced by Valine, NOT vice-versa.',
      'The mutation occurs in the beta-chain, not alpha-chain.',
      'The 6th amino acid changes from Glu to Val due to a GAG to GUG codon change.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_012_s',
    nodeId: NODE_C12_BIO_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A double-stranded human DNA sample has 28% Cytosine. Using Chargaff’s rules, calculate the percentage of Adenine present in this DNA.',
    correctAnswer: 22,
    tolerance: 0.1,
    unit: '%',
    explanation: 'By Chargaff’s rules: %G = %C = 28%. Therefore, %G + %C = 56%. The remaining bases must be %A + %T = 100% - 56% = 44%. Because %A = %T, %A = 44% / 2 = 22%.',
    hints: [
      'If Cytosine is 28%, Guanine must also be 28%.',
      'Total G + C = 56%. Subtract 56 from 100 to find total A + T.',
      'A + T = 44%, so Adenine is half of 44%, which is 22%.',
    ],
  },
  {
    id: 'ch_bio_013_s',
    nodeId: NODE_C12_BIO_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the lagging strand synthesized discontinuously as Okazaki fragments rather than as a continuous strand?',
    options: [
      'DNA polymerase can only polymerize in the 5’ → 3’ direction, while the replication fork opens towards the 3’ end of that template strand.',
      'Helicase breaks the lagging template strand into physical fragments before replication begins.',
      'Primase can only bind once per chromosome on the leading strand.',
      'DNA ligase is required to initiate transcription on the lagging strand.',
    ],
    correctIndex: 0,
    explanation: 'Because DNA strands are antiparallel and DNA polymerase III only synthesizes in the 5’→3’ direction (adding to free 3’-OH), synthesis on the 5’→3’ template strand must run backward relative to fork progression in discontinuous segments.',
    hints: [
      'Consider the antiparallel nature of the DNA double helix.',
      'DNA polymerase can only add nucleotides to a 3’-OH end in the 5’ to 3’ direction.',
      'As the fork unwinds, the lagging template exposes new single-stranded DNA upstream.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bio_014_s',
    nodeId: NODE_C12_BIO_027,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of post-transcriptional modifications that convert eukaryotic hnRNA into mature, export-ready mRNA.',
    sortItems: [
      'Addition of 7-methylguanosine cap to the 5’ end',
      'Spliceosome excision of non-coding introns and ligation of coding exons',
      'Polyadenylation (addition of poly-A tail) to the 3’ end',
      'Nuclear export of mature monocistronic mRNA to the cytoplasm',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Primary hnRNA first receives a 5’ 7-methylguanosine cap, undergoes splicing by the spliceosome (intron excision and exon splicing), receives a 3’ poly-A tail, and is then exported through nuclear pores.',
    hints: [
      'Capping happens co-transcriptionally at the 5’ front end.',
      'Splicing removes introns and joins exons.',
      'Tailing occurs at the 3’ end before transport through nuclear pores.',
    ],
  },
  {
    id: 'ch_bio_015_s',
    nodeId: NODE_C12_BIO_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the E. coli lac operon, what molecular event occurs when lactose (allolactose) is introduced into the bacterial culture medium?',
    options: [
      'Allolactose binds the lacI repressor, causing an allosteric change that makes it detach from the operator',
      'Lactose directly binds the promoter to stimulate RNA polymerase binding',
      'Lactose destroys the lacZ, lacY, and lacA structural genes',
      'Allolactose binds to the ribosome to block translation of beta-galactosidase',
    ],
    correctIndex: 0,
    explanation: 'Allolactose acts as the inducer by binding to the allosteric site of the lacI repressor protein. The conformational change lowers its affinity for the operator DNA, freeing the promoter for RNA polymerase.',
    hints: [
      'Lactose is converted to allolactose, the true inducer.',
      'The repressor protein binds operator when free, but releases operator when bound to inducer.',
      'Detachment of the repressor allows transcription of the operon.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_016_s',
    nodeId: NODE_C12_BIO_030,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the clinical laboratory steps of Alec Jeffreys’ DNA Fingerprinting (VNTR/RFLP profiling) in the correct analytical order.',
    sortItems: [
      'Isolation and extraction of high-molecular-weight genomic DNA',
      'Digestion of DNA with specific restriction endonucleases',
      'Size-based separation of fragments via Agarose Gel Electrophoresis',
      'Southern Blotting: Alkaline transfer of single-stranded DNA to nylon membrane',
      'Hybridization with radiolabeled VNTR probe and Autoradiography detection',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The standard DNA fingerprinting workflow is: (1) DNA extraction → (2) Restriction digestion → (3) Agarose gel electrophoresis → (4) Southern blotting onto nylon membrane → (5) Probe hybridization and autoradiography.',
    hints: [
      'You cannot cut DNA before extracting it from cells.',
      'Gel electrophoresis separates the digested fragments before they are transferred.',
      'Southern blotting comes before hybridization with radioactive probes.',
    ],
  },

  // Advanced Tier (8 challenges)
  {
    id: 'ch_bio_017_a',
    nodeId: NODE_C12_BIO_021,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do two genes with a 50% recombination frequency behave identically to genes located on completely different non-homologous chromosomes?',
    options: [
      'Because crossing over occurs in 100% of meiotic tetrads between distant loci, producing equal (50% parental : 50% recombinant) gamete proportions indistinguishable from independent assortment.',
      'Because 50% recombination means the genes physically fused into a single cistron.',
      'Because both genes are completely deleted during prophase I synapsis.',
      'Because chromosomes duplicate twice in meiosis I when loci are 50 cM apart.',
    ],
    correctIndex: 0,
    explanation: 'When genes are situated far apart on the same chromosome, multiple crossovers occur such that the maximum detectable recombination frequency plateaus at 50% (1:1:1:1 test-cross ratio), making them genetically unlinked.',
    hints: [
      'Mendel’s Law of Independent Assortment yields 50% parental and 50% recombinant gametes.',
      'Even with frequent crossing over, only two of the four chromatids in a single crossover event are recombinant.',
      'The theoretical upper ceiling for map recombination is 50%.',
    ],
  },
  {
    id: 'ch_bio_018_a',
    nodeId: NODE_C12_BIO_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a genetic counselling clinic in Maharashtra, a couple who are both asymptomatic carriers of Beta-Thalassaemia Minor plan to start a family. What is the statistical risk that their child will suffer from Beta-Thalassaemia Major?',
    options: ['0%', '25% (1 in 4)', '50% (1 in 2)', '75% (3 in 4)'],
    correctIndex: 1,
    explanation: 'Beta-thalassaemia is an autosomal recessive disorder. When two heterozygous carriers (Tt x Tt) mate, the Punnett square predicts: 25% TT (normal), 50% Tt (carrier/minor), and 25% tt (affected major).',
    hints: [
      'Both parents are carriers (heterozygous for an autosomal recessive allele).',
      'Draw an autosomal Punnett square: Tt x Tt.',
      'The chance of receiving the mutant allele from BOTH parents is 1/2 * 1/2 = 1/4 (25%).',
    ],
  },
  {
    id: 'ch_bio_019_a',
    nodeId: NODE_C12_BIO_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the conclusive experimental logic of Avery, MacLeod, and McCarty (1944) that established DNA as the Transforming Principle.',
    availableParts: [
      'Heat-killed S strain filtrate',
      '+ Protease (Proteins digested) → Transformation Occurred',
      '+ RNase (RNA digested) → Transformation Occurred',
      '+ DNase (DNA digested) → Transformation Inactivated',
      'Conclusion: DNA is the transforming genetic material',
    ],
    targetState:
      'Heat-killed S strain filtrate + Protease (Proteins digested) → Transformation Occurred + RNase (RNA digested) → Transformation Occurred + DNase (DNA digested) → Transformation Inactivated Conclusion: DNA is the transforming genetic material',
    validationHint: 'Add all 5 experimental proof steps in order from initial extract to enzyme digests and final conclusion.',
    explanation: 'Avery, MacLeod, and McCarty purified the transforming factor from heat-killed S bacteria. Digestion with protease or RNase did not eliminate transformation of R bacteria into S bacteria, whereas DNase destroyed transforming activity completely.',
    hints: [
      'Start with the cell-free filtrate of heat-killed virulent S bacteria.',
      'Show that destroying protein or RNA leaves transformation intact.',
      'Show that destroying DNA with DNase is the ONLY treatment that halts transformation.',
    ],
  },
  {
    id: 'ch_bio_020_a',
    nodeId: NODE_C12_BIO_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the Meselson-Stahl experiment, after growing E. coli in ^15N and transferring to ^14N for TWO complete cell generations, what CsCl density-gradient band distribution was observed?',
    options: [
      '50% Intermediate Hybrid (^15N-^14N) DNA and 50% Light (^14N-^14N) DNA',
      '100% Heavy (^15N-^15N) DNA',
      '100% Intermediate Hybrid (^15N-^14N) DNA',
      '75% Heavy DNA and 25% Light DNA',
    ],
    correctIndex: 0,
    explanation: 'Generation 0: 100% Heavy (^15N-^15N). Generation 1: 100% Hybrid (^15N-^14N). Generation 2: 50% Hybrid (^15N-^14N) and 50% Light (^14N-^14N). This decisively proved semi-conservative replication.',
    hints: [
      'In Generation 1, all DNA is hybrid (^15N-^14N).',
      'In Generation 2, each strand of the hybrid serves as a template in ^14N medium.',
      'The result is an equal 1:1 ratio of light and hybrid bands.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bio_021_a',
    nodeId: NODE_C12_BIO_028,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Translate the following mRNA sequence into its nascent peptide chain: 5�� - AUG - UUU - CCU - UAA - GCU - 3’',
    availableParts: ['fMet/Met', 'Phe', 'Pro', 'Stop (Release Factor)', 'Ala'],
    targetState: 'fMet/Met Phe Pro Stop (Release Factor)',
    validationHint: 'Select the correct amino acids matching codons AUG, UUU, CCU, followed by termination at UAA (do NOT translate past UAA).',
    explanation: 'AUG codes for Met, UUU codes for Phenylalanine, CCU codes for Proline. UAA is a termination stop codon that recruits release factors to hydrolyze the peptide from tRNA; subsequent codons (GCU) are not translated.',
    hints: [
      'AUG is Methionine.',
      'UUU is Phenylalanine, CCU is Proline.',
      'UAA signals STOP; translation terminates immediately.',
    ],
  },
  {
    id: 'ch_bio_022_a',
    nodeId: NODE_C12_BIO_029,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the expression state of the lac operon in an E. coli cell cultured in a medium containing BOTH high Glucose and high Lactose?',
    options: [
      'Low/Basal Expression (Catabolite Repression): Repressor is inactivated by allolactose, but low cAMP prevents CAP-cAMP activation of RNA Polymerase.',
      'Maximal Expression: Both sugars hyper-activate transcription simultaneously.',
      'Completely Blocked: Lactose forces repressor to bind tighter in the presence of glucose.',
      'Operon is permanently deleted by endonuclease action.',
    ],
    correctIndex: 0,
    explanation: 'When glucose is present, adenylate cyclase is inhibited, keeping cAMP low. Without the CAP-cAMP complex binding the promoter, RNA Polymerase binds weakly despite the repressor being removed by allolactose. This is catabolite repression.',
    hints: [
      'Glucose is E. coli’s preferred carbon source.',
      'High glucose keeps cyclic AMP (cAMP) levels low in the cytoplasm.',
      'Without CAP-cAMP, RNA polymerase transcribes at only a very low basal rate.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_023_a',
    nodeId: NODE_C12_BIO_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following represents a key landmark discovery made by the Human Genome Project (HGP)?',
    options: [
      'The human genome contains ~3.2 billion base pairs with only ~20,000 to 25,000 protein-coding genes, and over 50% comprises repetitive sequences.',
      'Humans possess over 150,000 unique protein-coding genes.',
      'Chromosome Y is the largest human chromosome with the most genes.',
      'Single Nucleotide Polymorphisms (SNPs) do not exist in the human species.',
    ],
    correctIndex: 0,
    explanation: 'The HGP revealed that humans have only ~20,000–25,000 genes (far fewer than expected), Chromosome 1 has the most genes (2,968) while Y has the fewest (231), and repetitive DNA constitutes a huge portion of the 3.2 Gb genome.',
    hints: [
      'Scientists originally expected >100,000 genes, but the true number is much smaller (~20k-25k).',
      'Chromosome 1 is the largest; Y is the smallest.',
      'Repetitive sequences and SNPs are ubiquitous.',
    ],
  },
  {
    id: 'ch_bio_024_a',
    nodeId: NODE_C12_BIO_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A point mutation in DNA converts codon 5’-UAC-3’ (Tyrosine) into 5’-UAA-3’. What type of mutation is this and what is its functional consequence?',
    options: [
      'Nonsense mutation: creates a premature termination codon leading to a truncated, non-functional protein.',
      'Missense mutation: replaces tyrosine with alanine.',
      'Silent mutation: no change in protein length or sequence.',
      'Frameshift mutation: shifts reading frame by two nucleotides.',
    ],
    correctIndex: 0,
    explanation: 'A mutation changing a sense codon to a stop codon (UAA, UAG, UGA) is termed a nonsense mutation. It causes premature translation termination, producing an incomplete truncated polypeptide.',
    hints: [
      'UAA is one of the three stop codons.',
      'When a codon is converted into a stop codon, it is called a nonsense mutation.',
      'The resulting protein will be prematurely stopped (truncated).',
    ],
  },
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BIO_021,
  title: 'Linkage, Crossing Over & Molecular Genetics',
  definition:
    'Linkage is the physical co-inheritance of genes located on the same chromosome, violating Mendel’s independent assortment. Crossing over during pachytene exchanges non-sister chromatid segments to generate recombinants. Molecular genetics elucidates the double helix, semi-conservative replication, transcription, translation, and operon gene regulation.',
  eli5: 'Think of chromosomes like charm bracelets: charms close together on the same bracelet get passed down together. Sometimes bracelets swap matching pieces during cell division, creating fresh combinations!',
  misconceptions: [
    {
      misconception: 'Linked genes follow Mendel’s law of independent assortment.',
      correction: 'Linked genes are physically situated on the same chromosome and are inherited together unless separated by crossing over.',
    },
    {
      misconception: 'In the lac operon, lactose binds directly to the operator DNA to turn transcription on.',
      correction: 'Lactose (allolactose) binds allosterically to the lacI repressor protein, causing the repressor to release the operator.',
    },
    {
      misconception: 'In sickle cell anaemia, valine is replaced by glutamic acid.',
      correction: 'In the 6th position of the beta-globin chain, normal Glutamic acid is replaced by Valine (GAG → GUG).',
    },
    {
      misconception: 'Hershey and Chase proved proteins enter the bacterial host along with viral DNA.',
      correction: 'Sulfur-35 labeled protein coats remained outside in the supernatant; only Phosphorus-32 labeled DNA entered the bacterial pellet.',
    },
    {
      misconception: 'Both lagging and leading strands are synthesized continuously during replication.',
      correction: 'Because DNA polymerase works only 5’→3’ and strands are antiparallel, the lagging strand is synthesized discontinuously as Okazaki fragments.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which stage of meiosis exhibits physical chiasmata resulting from crossing over?',
      options: ['Leptotene', 'Pachytene / Diplotene', 'Anaphase II', 'Metaphase II'],
      correctIndex: 1,
    },
    {
      question: 'What is the phenotypic test-cross ratio for two completely linked genes without crossing over?',
      options: ['9:3:3:1', '1:1:1:1', '1:1 (Parental only)', '3:1'],
      correctIndex: 2,
    },
    {
      question: 'Who proved semi-conservative DNA replication in E. coli using 15N and 14N CsCl gradients?',
      options: ['Watson and Crick', 'Meselson and Stahl', 'Hershey and Chase', 'Avery, MacLeod, and McCarty'],
      correctIndex: 1,
    },
    {
      question: 'What type of bond forms between adjacent nucleotides along a single DNA strand backbone?',
      options: ['Hydrogen bond', 'Phosphodiester bond', 'Peptide bond', 'Glycosidic bond'],
      correctIndex: 1,
    },
    {
      question: 'Which codon is the universal start codon that also specifies Methionine?',
      options: ['UAA', 'AUG', 'UAG', 'UGA'],
      correctIndex: 1,
    },
    {
      question: 'In the lac operon, which gene codes for beta-galactosidase?',
      options: ['lacI', 'lacZ', 'lacY', 'lacA'],
      correctIndex: 1,
    },
    {
      question: 'Down syndrome is caused by which chromosomal numerical anomaly?',
      options: ['Monosomy X (45, XO)', 'Trisomy 21 (47, +21)', 'Trisomy 18', 'Trisomy XXY'],
      correctIndex: 1,
    },
    {
      question: 'What are the repeating non-coding polymorphic sequences used in DNA fingerprinting called?',
      options: ['Expressed Sequence Tags (ESTs)', 'Variable Number Tandem Repeats (VNTRs)', 'Promoter elements', 'Exons'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Mastery demonstrated by analyzing linkage vs independent assortment, solving recombination frequencies, tracking X-linked crosses, and diagramming the central dogma and lac operon regulation.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Chromosomal Linkage & Physical Distance',
    instruction: 'Adjust the Gene Distance slider to see how physical separation directly dictates Crossing Over likelihood and Recombinant % in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIO_021,
  },
  {
    title: '2. The Watson-Crick Double Helix & Chargaff’s Complementarity',
    instruction: 'Toggle nucleotide bases on the 5’→3’ strand and watch the antiparallel complementary 3’→5’ strand form exact hydrogen-bonded base pairs.',
    interactionType: 'click-dna',
    nodeId: NODE_C12_BIO_025,
  },
  {
    title: '3. DNA Replication Fork: Leading vs Lagging Strand',
    instruction: 'Unzip the replication fork with the slider to observe continuous synthesis on the leading strand and Okazaki fragment formation on the lagging strand.',
    interactionType: 'fork-slider',
    nodeId: NODE_C12_BIO_026,
  },
  {
    title: '4. The Lac Operon Molecular Switch',
    instruction: 'Toggle Lactose and Glucose switches to witness how repressor dissociation and CAP-cAMP complex turn transcription on or off in E. coli.',
    interactionType: 'operon-toggle',
    nodeId: NODE_C12_BIO_029,
  },
  {
    title: '5. Forensic DNA Fingerprinting (VNTR Agarose Gel)',
    instruction: 'Click on Crime Scene and Suspect DNA lanes to compare VNTR repeat bands and identify the exact genetic match.',
    interactionType: 'gel-compare',
    nodeId: NODE_C12_BIO_030,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If two genes on chromosome 2 are moved from 5 cM apart to 35 cM apart, what will happen to the recombinant offspring frequency in a test cross?',
    options: [
      'Recombination frequency will increase dramatically because crossing over is more likely to occur in the larger physical gap.',
      'Recombination frequency will drop to 0% because distance stabilizes chromosomes.',
      'Recombination frequency will stay exactly the same regardless of distance.',
      'The genes will immediately invert their dominant and recessive alleles.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now drag the Gene Distance slider past 30 cM and observe the real-time Recombination Gauge climb to 35%!',
    nodeId: NODE_C12_BIO_021,
  },
  {
    question: 'Predict: What will happen to the lac operon transcription rate when you remove all Lactose from the bacterial culture?',
    options: [
      'The lacI repressor will bind to the operator, physically blocking RNA Polymerase and reducing transcription to near zero.',
      'Beta-galactosidase will be produced at 10x higher rate to hunt for food.',
      'The bacterial circular chromosome will break apart.',
      'The lacA gene will convert into glucose.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Turn OFF the Lactose toggle in Step 4 and watch the repressor protein lock onto the operator DNA in real time!',
    nodeId: NODE_C12_BIO_029,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the ratio of Parental vs Recombinant gametes when Gene Distance is set to 0 cM (Complete Linkage)?',
    observableOptions: [
      '100% Parental gametes and 0% Recombinants',
      '50% Parental and 50% Recombinants',
      '0% Parental and 100% Recombinants',
      'Random chaotic fluctuations',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_021,
  },
  {
    question: 'In the Lac Operon simulation, under which combined condition is transcription MAXIMAL?',
    observableOptions: [
      'Lactose PRESENT and Glucose ABSENT (High cAMP + CAP activation)',
      'Both Glucose and Lactose HIGH',
      'Both Glucose and Lactose ABSENT',
      'Lactose ABSENT and Glucose HIGH',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_029,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Geneticist & Forensic Investigator',
  description:
    'In an Indian district hospital in Central India, analyze a pedigree for Sickle Cell screening across three generations. Calculate carrier probabilities, construct a Punnett square for prospective parents, and review an autoradiograph VNTR profile for forensic evidence matching.',
  steps: [
    'Draw pedigree symbols: square (male), circle (female), shaded (HbS/HbS), half-shaded (HbA/HbS carrier).',
    'Calculate the Mendelian probability when two sickle-cell carriers (HbA/HbS) marry (25% affected, 50% carrier, 25% normal).',
    'Verify VNTR gel electrophoresis banding patterns for forensic identification.',
    'Formulate an ethical counselling recommendation on carrier screening and prenatal testing.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_BiologyLinkageCrossingOverSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── ADAPTIVE BKT & DIFFICULTY ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // ─── INTERACTION STATES ───
  const [geneDistance, setGeneDistance] = useState<number>(18);
  const [crossoverOccurred, setCrossoverOccurred] = useState<boolean>(true);
  const [selectedDnaBaseIndex, setSelectedDnaBaseIndex] = useState<number>(0);
  const [dnaBases, setDnaBases] = useState<string[]>(['A', 'T', 'G', 'C', 'A', 'A', 'T', 'C']);
  const [forkProgress, setForkProgress] = useState<number>(45);
  const [lactosePresent, setLactosePresent] = useState<boolean>(true);
  const [glucosePresent, setGlucosePresent] = useState<boolean>(false);
  const [selectedSuspectGel, setSelectedSuspectGel] = useState<number | null>(null);

  // Brilliant Exploration & Predict-Check States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Discovery & Challenge State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual & Audio Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Canvas Refs & Timers
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── DERIVED VALUES ───
  const recombinationFrequency = useMemo(() => {
    return Math.min(50, geneDistance);
  }, [geneDistance]);

  const parentalPercentage = useMemo(() => {
    return 100 - recombinationFrequency;
  }, [recombinationFrequency]);

  const operonTranscriptionRate = useMemo(() => {
    if (!lactosePresent) return 2;
    if (lactosePresent && glucosePresent) return 20;
    if (lactosePresent && !glucosePresent) return 98;
    return 0;
  }, [lactosePresent, glucosePresent]);

  const complementaryStrand = useMemo(() => {
    const pairMap: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' };
    return dnaBases.map((b) => pairMap[b] || 'N');
  }, [dnaBases]);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeItem = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT: BKT ADAPTIVE UPDATES ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── EFFECT: 2D REQUEST ANIMATION FRAME CANVAS ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const centerY = canvas.height / 2;
      ctx.lineWidth = 2.5;

      for (let i = 0; i < canvas.width; i += 12) {
        const angle = (i * 0.05) + frame * 0.03;
        const y1 = centerY + Math.sin(angle) * 16;
        const y2 = centerY - Math.sin(angle) * 16;

        ctx.beginPath();
        ctx.moveTo(i, y1);
        ctx.lineTo(i, y2);
        ctx.strokeStyle = Math.sin(angle) > 0 ? '#38bdf888' : '#34d39988';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(i, y1, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(i, y2, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CLEANUP TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeItem.hints[nextLevel - 1]) {
      const hintMsg = currentChallengeItem.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('All hints explored. Let us review the complete molecular explanation together.');
    }
  }, [hintCount, currentChallengeItem]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(
      correct
        ? 'Brilliant deduction! Linked genes travel together.'
        : 'Good intuition! Let us investigate the chromosomes to discover why.'
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive genomics laboratory. Manipulate variables to discover the principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in Free Exploration mode. Test any parameters without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the adaptive genetic challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === (currentSlide === 0 ? OBSERVATION_QUESTIONS[0].correctIndex : OBSERVATION_QUESTIONS[1].correctIndex);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Check the gauges and observe the readout again.');
  }, [currentSlide]);

  const handleGeneDistanceChange = useCallback((newDist: number) => {
    setGeneDistance(newDist);
    setCrossoverOccurred(newDist > 10);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && newDist >= 30) {
      setPredictionVerified(true);
      audioManager.play('chime');
      speechManager.speak('Notice how crossing over frequency increased directly with distance!');
    }
  }, [predictionMade, predictionVerified]);

  const handleDnaBaseToggle = useCallback((index: number) => {
    const bases = ['A', 'T', 'G', 'C'];
    setDnaBases((prev) => {
      const next = [...prev];
      const current = next[index];
      const nextBase = bases[(bases.indexOf(current) + 1) % bases.length];
      next[index] = nextBase;
      return next;
    });
    setSelectedDnaBaseIndex(index);
    audioManager.play('tap');
  }, []);

  const handleOperonLactoseToggle = useCallback(() => {
    setLactosePresent((prev) => !prev);
    audioManager.play('pop');
    if (predictionMade && !predictionVerified) {
      setPredictionVerified(true);
      audioManager.play('chime');
    }
  }, [predictionMade, predictionVerified]);

  const handleOperonGlucoseToggle = useCallback(() => {
    setGlucosePresent((prev) => !prev);
    audioManager.play('pop');
  }, []);

  const handleGelSelect = useCallback((suspectId: number) => {
    setSelectedSuspectGel(suspectId);
    audioManager.play('tap');
    if (suspectId === 2) {
      audioManager.play('drop-correct');
      speechManager.speak('Exact band match! Suspect 2 matches the crime scene VNTR profile.');
    } else {
      audioManager.play('drop-wrong');
    }
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = currentChallengeItem.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: droppedLabels[targetId] || draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 500);
      }
      setDraggedItem(null);
    },
    [draggedItem, currentChallengeItem, droppedLabels]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let base = prev;
        if (base.length === 0 && currentChallengeItem.sortItems) {
          base = currentChallengeItem.sortItems.map((_, i) => i);
        }
        const updated = [...base];
        const [moved] = updated.splice(fromIdx, 1);
        updated.splice(toIdx, 0, moved);
        return updated;
      });
    },
    [currentChallengeItem]
  );

  const handleSortSubmit = useCallback(() => {
    const ans =
      sortArrangement.length > 0
        ? sortArrangement
        : currentChallengeItem.sortItems?.map((_, i) => i) || [];
    const isCorrect = JSON.stringify(ans) === JSON.stringify(currentChallengeItem.correctOrder);
    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct sequencing!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      setErrors((e) => e + 1);
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      if (hintCount < 3) showNextHint();
      else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
  }, [sortArrangement, currentChallengeItem, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Outstanding effort! You completed the genetics master lab with a score of ${finalScore} percent.`);
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        currentChallengeItem.type === 'classify' ||
        currentChallengeItem.type === 'distinguish' ||
        currentChallengeItem.type === 'match'
      ) {
        isCorrect = answer === currentChallengeItem.correctIndex;
      } else if (currentChallengeItem.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctMapping);
      } else if (currentChallengeItem.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctOrder);
      } else if (currentChallengeItem.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(numAnswer - (currentChallengeItem.correctAnswer || 0)) <=
          (currentChallengeItem.tolerance || 0);
      } else if (currentChallengeItem.type === 'construct') {
        isCorrect =
          (answer as string).trim() === (currentChallengeItem.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding scientific reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeItem.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        setErrors((e) => e + 1);
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          currentChallengeItem.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(currentChallengeItem.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, currentChallengeItem.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step molecular explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + currentChallengeItem.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentChallengeItem, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner cursor-pointer"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">
                ISC Class 12
              </span>
              <span className="text-xs text-slate-400">Genetics & Molecular Biology</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {['discovery', 'explore', 'sandbox', 'challenge'].map((p) => (
            <span
              key={p}
              className={`text-xs px-3 py-1 rounded-xl font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 border border-slate-700/50'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-3xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🏛️ Real-World Research Context</span>
            </div>
            <h2 className="text-2xl font-black text-gold-200 mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-3 p-3 bg-gold-950/40 rounded-xl border border-gold-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Curiosity Question */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold">
                Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">Before we study the mechanics, test your hypothesis!</span>
            </div>
            <p className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-2xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs font-bold text-slate-300 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p
                    className={`font-bold text-sm ${
                      discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {discoveryCorrect
                      ? '✓ Exactly right! Physical linkage keeps alleles together.'
                      : '✗ Surprising, right? Linked genes violate independent assortment.'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter the interactive lab"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-600/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          {/* Step Navigation Bar */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {EXPLORATION_STEPS.map((step, sIdx) => (
              <button
                key={sIdx}
                onClick={() => {
                  setCurrentSlide(sIdx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  currentSlide === sIdx
                    ? 'bg-emerald-600 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Lab {sIdx + 1}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              {/* Header Info */}
              <div>
                <h3 className="text-xl font-black text-emerald-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-400 text-sm mt-1 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB STEP 0: LINKAGE & CROSSING OVER SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 rounded-2xl border border-gold-800/80 space-y-3">
                      <p className="text-sm font-bold text-gold-200">
                        🔮 {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 bg-slate-800 text-slate-200 rounded-xl text-xs text-left border border-slate-700 hover:border-gold-400"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-amber-950/40 border border-amber-700/60 rounded-xl text-xs text-amber-300">
                      ⚡ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Interactive Chromosome SVG Visualizer */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 600 240" className="w-full max-w-2xl h-auto">
                      <g transform="translate(100, 30)">
                        <text x="0" y="-10" fill="#f87171" fontSize="12" fontWeight="bold">
                          Maternal Chromosome (Grey Body [B], Red Eyes [cn+])
                        </text>
                        <rect x="0" y="10" width="400" height="14" rx="7" fill="#ef4444" />
                        <rect x="0" y="32" width="400" height="14" rx="7" fill="#dc2626" />

                        <circle cx="60" cy="17" r="8" fill="#facc15" stroke="#78350f" strokeWidth="2" />
                        <circle cx="60" cy="39" r="8" fill="#facc15" stroke="#78350f" strokeWidth="2" />
                        <text x="60" y="21" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">B</text>
                        <text x="60" y="43" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">B</text>

                        <circle
                          cx={60 + geneDistance * 6}
                          cy="17"
                          r="8"
                          fill="#38bdf8"
                          stroke="#0369a1"
                          strokeWidth="2"
                        />
                        <circle
                          cx={60 + geneDistance * 6}
                          cy="39"
                          r="8"
                          fill="#38bdf8"
                          stroke="#0369a1"
                          strokeWidth="2"
                        />
                        <text
                          x={60 + geneDistance * 6}
                          y="21"
                          textAnchor="middle"
                          fill="#000"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          cn+
                        </text>
                        <text
                          x={60 + geneDistance * 6}
                          y="43"
                          textAnchor="middle"
                          fill="#000"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          cn+
                        </text>
                      </g>

                      {crossoverOccurred && (
                        <g opacity="0.8">
                          <path
                            d={`M ${160 + geneDistance * 3} 76 Q ${170 + geneDistance * 3} 95 ${160 + geneDistance * 3} 114`}
                            stroke="#f59e0b"
                            strokeWidth="3"
                            strokeDasharray="4,4"
                            fill="none"
                          />
                          <text
                            x={175 + geneDistance * 3}
                            y="98"
                            fill="#fbbf24"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            Chiasma Point (Pachytene)
                          </text>
                        </g>
                      )}

                      <g transform="translate(100, 120)">
                        <text x="0" y="60" fill="#60a5fa" fontSize="12" fontWeight="bold">
                          Paternal Chromosome (Black Body [b], Cinnabar Eyes [cn])
                        </text>
                        <rect x="0" y="10" width="400" height="14" rx="7" fill="#2563eb" />
                        <rect x="0" y="32" width="400" height="14" rx="7" fill="#1d4ed8" />

                        <circle cx="60" cy="17" r="8" fill="#ca8a04" stroke="#451a03" strokeWidth="2" />
                        <circle cx="60" cy="39" r="8" fill="#ca8a04" stroke="#451a03" strokeWidth="2" />
                        <text x="60" y="21" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">b</text>
                        <text x="60" y="43" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">b</text>

                        <circle
                          cx={60 + geneDistance * 6}
                          cy="17"
                          r="8"
                          fill="#0284c7"
                          stroke="#082f49"
                          strokeWidth="2"
                        />
                        <circle
                          cx={60 + geneDistance * 6}
                          cy="39"
                          r="8"
                          fill="#0284c7"
                          stroke="#082f49"
                          strokeWidth="2"
                        />
                        <text
                          x={60 + geneDistance * 6}
                          y="21"
                          textAnchor="middle"
                          fill="#fff"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          cn
                        </text>
                        <text
                          x={60 + geneDistance * 6}
                          y="43"
                          textAnchor="middle"
                          fill="#fff"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          cn
                        </text>
                      </g>
                    </svg>

                    {/* Interactive Slider & Readout */}
                    <div className="w-full max-w-xl mt-4 space-y-3">
                      <div className="flex justify-between items-center text-xs text-slate-300">
                        <span>Physical Gene Separation: <strong>{geneDistance} cM (Map Units)</strong></span>
                        <span className="text-emerald-400 font-bold">
                          {geneDistance === 0
                            ? 'Complete Linkage (0% Recombination)'
                            : geneDistance >= 50
                            ? 'Behaves like Independent Assortment (50%)'
                            : 'Incomplete Linkage'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        value={geneDistance}
                        onChange={(e) => handleGeneDistanceChange(Number(e.target.value))}
                        aria-label="Set physical gene separation in centiMorgans"
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />

                      {/* Multi-representation Data Bar */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">Parental Combinations (B cn+ & b cn)</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-emerald-500 rounded-full"
                                animate={{ width: `${parentalPercentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-emerald-400">{parentalPercentage}%</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">Recombinant Gametes (B cn & b cn+)</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-amber-500 rounded-full"
                                animate={{ width: `${recombinationFrequency}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-amber-400">{recombinationFrequency}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OBSERVATION QUESTION */}
                  {!observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2"
                    >
                      <p className="text-xs text-gold-400 font-bold uppercase">Scientific Observation</p>
                      <p className="text-sm text-white font-semibold">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs text-left hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB STEP 1: DNA DOUBLE HELIX & CHARGAFF RULES ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300">
                    Click any base on the primary <strong>5’ → 3’ Strand</strong>. Observe how the Watson-Crick hydrogen bonding engine creates antiparallel complementary pairs on the <strong>3’ → 5’ Strand</strong>.
                  </p>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-gold-400">Primary Strand (5’ → 3’):</span>
                      <div className="flex gap-2 flex-wrap">
                        {dnaBases.map((base, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDnaBaseToggle(idx)}
                            aria-label={`Toggle base at position ${idx + 1}`}
                            className={`w-11 h-12 rounded-xl flex flex-col items-center justify-center font-black text-sm border shadow-lg ${
                              base === 'A'
                                ? 'bg-rose-950 border-rose-500 text-rose-300'
                                : base === 'T'
                                ? 'bg-amber-950 border-amber-500 text-amber-300'
                                : base === 'G'
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-gold-950 border-gold-500 text-gold-300'
                            }`}
                          >
                            <span>{base}</span>
                            <span className="text-[9px] font-normal text-slate-400">pos {idx + 1}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap pl-3">
                      {dnaBases.map((base, idx) => (
                        <div key={idx} className="w-11 flex flex-col items-center justify-center py-1 text-xs">
                          {base === 'A' || base === 'T' ? (
                            <span className="text-amber-400 font-bold tracking-widest">||</span>
                          ) : (
                            <span className="text-emerald-400 font-bold tracking-widest">|||</span>
                          )}
                          <span className="text-[8px] text-slate-500">
                            {base === 'A' || base === 'T' ? '2 H-bonds' : '3 H-bonds'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-emerald-400">Complementary Strand (3’ → 5’):</span>
                      <div className="flex gap-2 flex-wrap">
                        {complementaryStrand.map((comp, idx) => (
                          <div
                            key={idx}
                            className={`w-11 h-12 rounded-xl flex flex-col items-center justify-center font-black text-sm border ${
                              comp === 'A'
                                ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                : comp === 'T'
                                ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                                : comp === 'G'
                                ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                                : 'bg-gold-950/60 border-gold-600 text-gold-300'
                            }`}
                          >
                            <span>{comp}</span>
                            <span className="text-[9px] font-normal text-slate-500">pair</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        A count: <strong className="text-rose-400">{dnaBases.filter((b) => b === 'A').length * 2}</strong>
                      </div>
                      <div>
                        T count: <strong className="text-amber-400">{dnaBases.filter((b) => b === 'T').length * 2}</strong>
                      </div>
                      <div>
                        G count: <strong className="text-emerald-400">{dnaBases.filter((b) => b === 'G').length * 2}</strong>
                      </div>
                      <div>
                        C count: <strong className="text-gold-400">{dnaBases.filter((b) => b === 'C').length * 2}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 2: REPLICATION FORK & OKAZAKI FRAGMENTS ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span>Replication Fork Opening: <strong>{forkProgress}% Unzipped</strong></span>
                    <span className="text-gold-400">Helicase + DNA Polymerase III Active</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={forkProgress}
                    onChange={(e) => {
                      setForkProgress(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    aria-label="Adjust replication fork unzipping progress"
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 550 200" className="w-full h-auto">
                      <path
                        d={`M 20 50 L ${150 + forkProgress * 1.5} 50 L 500 20`}
                        stroke="#38bdf8"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        d={`M 20 150 L ${150 + forkProgress * 1.5} 150 L 500 180`}
                        stroke="#38bdf8"
                        strokeWidth="4"
                        fill="none"
                      />

                      <path
                        d={`M 30 70 L ${120 + forkProgress * 1.4} 70`}
                        stroke="#22c55e"
                        strokeWidth="4"
                        fill="none"
                      />
                      <text x="35" y="65" fill="#4ade80" fontSize="10" fontWeight="bold">
                        Leading Strand (Continuous 5’ → 3’)
                      </text>

                      <path d="M 30 130 L 90 130" stroke="#f59e0b" strokeWidth="4" fill="none" />
                      <path d="M 110 130 L 170 130" stroke="#f59e0b" strokeWidth="4" fill="none" />
                      {forkProgress > 50 && (
                        <path
                          d={`M 190 130 L ${190 + (forkProgress - 50) * 1.2} 130`}
                          stroke="#f59e0b"
                          strokeWidth="4"
                          fill="none"
                        />
                      )}
                      <text x="35" y="145" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        Lagging Strand (Okazaki Fragments + RNA Primers + DNA Ligase)
                      </text>

                      <circle cx={150 + forkProgress * 1.5} cy="100" r="16" fill="#6366f1" />
                      <text
                        x={150 + forkProgress * 1.5}
                        y="104"
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        Helicase
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 3: LAC OPERON REGULATION SWITCH ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 rounded-2xl border border-gold-800/80 space-y-3">
                      <p className="text-sm font-bold text-gold-200">
                        🔮 {PREDICTION_QUESTIONS[1].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 bg-slate-800 text-slate-200 rounded-xl text-xs text-left border border-slate-700 hover:border-gold-400"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-white">Lactose (Inducer)</span>
                        <p className="text-xs text-slate-400">Converts to allolactose; binds repressor</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOperonLactoseToggle}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          lactosePresent
                            ? 'bg-emerald-600 text-slate-950'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {lactosePresent ? 'PRESENT (ON)' : 'ABSENT (OFF)'}
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-white">Glucose (Preferred Sugar)</span>
                        <p className="text-xs text-slate-400">High glucose suppresses cAMP formation</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOperonGlucoseToggle}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          glucosePresent
                            ? 'bg-amber-600 text-slate-950'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {glucosePresent ? 'PRESENT (High)' : 'ABSENT (Low)'}
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 560 140" className="w-full h-auto">
                      <rect x="20" y="40" width="80" height="40" rx="6" fill="#3b82f6" />
                      <text x="60" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                        Promoter (P)
                      </text>

                      <rect x="110" y="40" width="80" height="40" rx="6" fill="#6366f1" />
                      <text x="150" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                        Operator (O)
                      </text>

                      <rect x="200" y="40" width="100" height="40" rx="6" fill="#10b981" />
                      <text x="250" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                        lacZ (β-gal)
                      </text>

                      <rect x="310" y="40" width="90" height="40" rx="6" fill="#059669" />
                      <text x="355" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                        lacY (Permease)
                      </text>

                      <rect x="410" y="40" width="110" height="40" rx="6" fill="#047857" />
                      <text x="465" y="65" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
                        lacA (Transacetylase)
                      </text>

                      {!lactosePresent ? (
                        <g>
                          <circle cx="150" cy="30" r="14" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
                          <text x="150" y="34" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                            Repressor
                          </text>
                          <text x="150" y="105" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                            🔒 BOUND (BLOCKING RNA POL)
                          </text>
                        </g>
                      ) : (
                        <g>
                          <circle cx="150" cy="-10" r="14" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                          <text x="150" y="-6" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                            Allolactose+R
                          </text>
                          <text x="150" y="105" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">
                            🔓 OPERATOR FREE
                          </text>
                        </g>
                      )}
                    </svg>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span>Transcription Rate:</span>
                        <span className="font-bold text-emerald-400">{operonTranscriptionRate}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          animate={{ width: `${operonTranscriptionRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 4: FORENSIC DNA FINGERPRINTING GEL ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300">
                    Examine the Agarose Gel VNTR profile below. Compare the Crime Scene (C) evidence lane with Suspects 1, 2, and 3. Click the matching suspect lane!
                  </p>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto">
                      <rect x="30" y="20" width="440" height="200" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                      <text x="80" y="45" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Crime (C)
                      </text>
                      <text x="180" y="45" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Suspect 1
                      </text>
                      <text x="280" y="45" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Suspect 2
                      </text>
                      <text x="380" y="45" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Suspect 3
                      </text>

                      <rect x="60" y="55" width="40" height="6" fill="#020617" />
                      <rect x="160" y="55" width="40" height="6" fill="#020617" />
                      <rect x="260" y="55" width="40" height="6" fill="#020617" />
                      <rect x="360" y="55" width="40" height="6" fill="#020617" />

                      <rect x="65" y="80" width="30" height="4" fill="#f87171" rx="2" />
                      <rect x="65" y="120" width="30" height="4" fill="#f87171" rx="2" />
                      <rect x="65" y="160" width="30" height="4" fill="#f87171" rx="2" />
                      <rect x="65" y="190" width="30" height="4" fill="#f87171" rx="2" />

                      <rect x="165" y="90" width="30" height="4" fill="#94a3b8" rx="2" />
                      <rect x="165" y="120" width="30" height="4" fill="#94a3b8" rx="2" />
                      <rect x="165" y="150" width="30" height="4" fill="#94a3b8" rx="2" />

                      <rect
                        x="265"
                        y="80"
                        width="30"
                        height="4"
                        fill={selectedSuspectGel === 2 ? '#4ade80' : '#94a3b8'}
                        rx="2"
                      />
                      <rect
                        x="265"
                        y="120"
                        width="30"
                        height="4"
                        fill={selectedSuspectGel === 2 ? '#4ade80' : '#94a3b8'}
                        rx="2"
                      />
                      <rect
                        x="265"
                        y="160"
                        width="30"
                        height="4"
                        fill={selectedSuspectGel === 2 ? '#4ade80' : '#94a3b8'}
                        rx="2"
                      />
                      <rect
                        x="265"
                        y="190"
                        width="30"
                        height="4"
                        fill={selectedSuspectGel === 2 ? '#4ade80' : '#94a3b8'}
                        rx="2"
                      />

                      <rect x="365" y="80" width="30" height="4" fill="#94a3b8" rx="2" />
                      <rect x="365" y="110" width="30" height="4" fill="#94a3b8" rx="2" />
                      <rect x="365" y="170" width="30" height="4" fill="#94a3b8" rx="2" />
                    </svg>

                    <div className="flex gap-3 mt-4">
                      {[1, 2, 3].map((num) => (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleGelSelect(num)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                            selectedSuspectGel === num
                              ? num === 2
                                ? 'bg-emerald-600 border-emerald-400 text-slate-950'
                                : 'bg-rose-900 border-rose-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          Suspect {num}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Nav Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-400">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide((s) => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-slate-950 text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black"
                  >
                    Free Sandbox Play →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Genetics Free Exploration Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Freely tweak parameters, inspect real-time double helix frequencies, and test hypotheses with no grading pressure.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/20"
              >
                Ready for Challenges! 🚀
              </motion.button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-gold-400 block mb-2">Live Molecular Dynamics Wave:</span>
              <canvas ref={canvasRef} width={600} height={70} className="w-full h-auto rounded-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-300">Gene Separation Test:</span>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={geneDistance}
                  onChange={(e) => handleGeneDistanceChange(Number(e.target.value))}
                  aria-label="Sandbox gene distance control"
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Distance: {geneDistance} cM</span>
                  <span>Recombination: {recombinationFrequency}%</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-gold-300">Lac Operon State:</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleOperonLactoseToggle}
                    className="flex-1 py-2 bg-slate-800 text-xs font-bold rounded-xl border border-slate-700"
                  >
                    Lactose: {lactosePresent ? 'ON' : 'OFF'}
                  </button>
                  <button
                    onClick={handleOperonGlucoseToggle}
                    className="flex-1 py-2 bg-slate-800 text-xs font-bold rounded-xl border border-slate-700"
                  >
                    Glucose: {glucosePresent ? 'HIGH' : 'LOW'}
                  </button>
                </div>
                <p className="text-xs text-slate-400">Rate: {operonTranscriptionRate}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : difficulty === 'standard'
                      ? 'bg-gold-950 text-gold-300 border border-gold-700'
                      : 'bg-rose-950 text-rose-300 border border-rose-700'
                  }`}
                >
                  Tier: {difficulty}
                </motion.span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-950 text-gold-300 border border-gold-800 capitalize">
                  Competency: {currentChallengeItem.competencyLevel}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {currentChallengeItem.question}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Mastery Level:</span>
              <span className="text-xs font-bold text-emerald-400 capitalize">{masteryLevel}</span>
            </div>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* MCQ Rendering */}
          {(currentChallengeItem.type === 'classify' ||
            currentChallengeItem.type === 'distinguish' ||
            currentChallengeItem.type === 'match') &&
            currentChallengeItem.options && (
              <div
                className={`space-y-3 transition-all ${
                  wrongFlash ? 'p-2 rounded-2xl bg-rose-950/40 border border-rose-500' : ''
                }`}
              >
                {currentChallengeItem.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all ${
                      showExplanation && i === currentChallengeItem.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

          {/* Drag-label Challenge */}
          {currentChallengeItem.type === 'drag-label' && currentChallengeItem.dragItems && (
            <div className="space-y-4 p-4 bg-slate-900 rounded-3xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">Palette: Drag items to targets below</span>
              <div className="flex flex-wrap gap-2">
                {currentChallengeItem.dragItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    role="button"
                    aria-label={`Draggable label: ${item.label}`}
                    className="px-3 py-2 bg-emerald-700 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {['part_octamer', 'part_dna', 'part_h1'].map((targetId) => (
                  <div
                    key={targetId}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop(targetId)}
                    className={`p-4 rounded-2xl border-2 border-dashed min-h-[90px] flex flex-col justify-center items-center text-center text-xs ${
                      droppedLabels[targetId]
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-700 text-slate-500'
                    }`}
                  >
                    <span className="font-bold text-slate-400 mb-1">
                      Target: {targetId.replace('part_', '').toUpperCase()}
                    </span>
                    <span>{droppedLabels[targetId] || 'Drop matching label here'}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(droppedLabels)}
                disabled={showExplanation || Object.keys(droppedLabels).length < 3}
                className="px-6 py-2.5 bg-emerald-600 text-slate-950 font-black rounded-xl text-xs disabled:opacity-50"
              >
                Validate Labels ✓
              </motion.button>
            </div>
          )}

          {/* Drag-sort Challenge */}
          {currentChallengeItem.type === 'drag-sort' && currentChallengeItem.sortItems && (
            <div className="space-y-3 p-4 bg-slate-900 rounded-3xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold block">Drag to rearrange in proper chronological sequence:</span>
              <div className="space-y-2">
                {(sortArrangement.length === currentChallengeItem.sortItems.length
                  ? sortArrangement.map((idx) => currentChallengeItem.sortItems![idx])
                  : currentChallengeItem.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    role="button"
                    aria-label={`Sort step ${displayIdx + 1}: ${item}`}
                    className="p-3 bg-slate-800 rounded-xl text-slate-200 text-xs border border-slate-700 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSortSubmit}
                disabled={showExplanation}
                className="px-6 py-2.5 bg-emerald-600 text-slate-950 font-black rounded-xl text-xs"
              >
                Check Sequence ✓
              </motion.button>
            </div>
          )}

          {/* Numeric Challenge */}
          {currentChallengeItem.type === 'numeric' && (
            <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric calculation"
                  aria-label="Enter numeric calculation answer"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-sm font-bold text-slate-400">{currentChallengeItem.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput === ''}
                  className="px-6 py-3 bg-emerald-600 text-slate-950 font-black rounded-xl text-xs disabled:opacity-50"
                >
                  Submit Answer
                </motion.button>
              </div>
            </div>
          )}

          {/* Construct Challenge */}
          {currentChallengeItem.type === 'construct' && currentChallengeItem.availableParts && (
            <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs text-slate-400 font-bold block">{currentChallengeItem.validationHint}</span>
              <div className="flex flex-wrap gap-2">
                {currentChallengeItem.availableParts.map((part, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConstructParts((prev) => [...prev, part])}
                    aria-label={`Add part: ${part}`}
                    className="px-3 py-1.5 bg-gold-700 text-white rounded-xl text-xs font-bold"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                {constructParts.map((part, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gold-900 text-gold-200 border border-gold-700 rounded-lg text-xs flex items-center gap-2"
                  >
                    {part}
                    <button
                      onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-rose-400 font-bold hover:text-rose-300"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-600">Click parts above to build sequence...</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={showExplanation || constructParts.length === 0}
                className="px-6 py-2.5 bg-emerald-600 text-slate-950 font-black rounded-xl text-xs disabled:opacity-50"
              >
                Verify Construction ✓
              </motion.button>
            </div>
          )}

          {/* Step-by-Step Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-800/60 rounded-3xl space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                <span>📚 Molecular Mechanism Explanation</span>
              </div>

              <div className="space-y-2">
                {currentChallengeItem.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-100 text-sm leading-relaxed"
                    >
                      <strong className="text-amber-400">Step {idx + 1}:</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {revealedSteps <
                currentChallengeItem.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Lab Session 🏁' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-gold-950 rounded-3xl border border-gold-800 text-center space-y-4">
            <span className="text-4xl">🧬</span>
            <h2 className="text-3xl font-black text-white">Genomics Simulation Mastery Achieved!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BASED ON ERRORS */}
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-700 inline-block px-6">
              <span className={`text-lg font-black ${
                errors === 0
                  ? 'text-emerald-400'
                  : errors <= 3
                  ? 'text-gold-400'
                  : errors <= 7
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}>
                {errors === 0 && 'PERFECT SCORE!'}
                {errors >= 1 && errors <= 3 && 'Great work!'}
                {errors >= 4 && errors <= 7 && 'Good effort!'}
                {errors >= 8 && 'Do not give up — You WILL get this!'}
              </span>
            </div>

            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have navigated chromosomal linkage, molecular replication, transcriptional controls, and genetic disorders aligned with the CISCE ISC Class 12 curriculum.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Mastery Tier</span>
                <span className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/50 border-2 border-amber-500/50 rounded-3xl shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="text-amber-300 font-black text-base md:text-lg tracking-wide uppercase">
                    Spaced Repetition (SRS) Schedule
                  </h3>
                  <span className="text-xs text-slate-400">Adaptive Memory Retention Algorithm (SM-2)</span>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-black">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">
                  Recommended Next Review:{' '}
                  <span className="text-amber-400 font-black">
                    {errors === 0
                      ? 'review in 7 days (Optimal Recall - 0 Errors)'
                      : errors <= 3
                      ? 'review in 3 days (Reinforcement - 1-3 Errors)'
                      : 'review in 1 day (Immediate Remediation - 4+ Errors)'}
                  </span>
                </p>
                <p className="text-xs text-slate-400">
                  Total Errors in this session: <strong className="text-slate-200">{errors}</strong>. Active retrieval at this calculated interval ensures maximum long-term memory consolidation for your ISC Class 12 board exam.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className={`px-4 py-2 rounded-xl text-xs font-bold ${errors === 0 ? 'bg-emerald-950 border border-emerald-500 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                  7 Days (0 errors)
                </div>
                <div className={`px-4 py-2 rounded-xl text-xs font-bold ${errors >= 1 && errors <= 3 ? 'bg-gold-950 border border-gold-500 text-gold-300' : 'bg-slate-800 text-slate-500'}`}>
                  3 Days (1-3)
                </div>
                <div className={`px-4 py-2 rounded-xl text-xs font-bold ${errors >= 4 ? 'bg-rose-950 border border-rose-500 text-rose-300' : 'bg-slate-800 text-slate-500'}`}>
                  1 Day (4+)
                </div>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>💭</span> Key Concept Reflections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-gold-400">1. Discovery Reflection</span>
                <p className="text-xs text-slate-300 font-medium">What was the most surprising thing you learned?</p>
                <p className="text-[11px] text-slate-400">
                  Reflect on how physical distance directly sets recombinant ratios or how small mutations create massive clinical consequences.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400">2. Communication Check</span>
                <p className="text-xs text-slate-300 font-medium">How would you explain this to a friend?</p>
                <p className="text-[11px] text-slate-400">
                  Try summarizing the lac operon switch or semi-conservative replication in three clear steps using everyday analogies.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-400">3. Practical Application</span>
                <p className="text-xs text-slate-300 font-medium">Where in real life might you use this?</p>
                <p className="text-[11px] text-slate-400">
                  Consider clinical genetic testing for thalassemia, prenatal risk counselling, and forensic DNA identification.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 border border-rose-800 rounded-3xl space-y-3">
              <h3 className="text-rose-300 font-bold text-sm">Targeted Misconception Profile Review:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Clinical Project */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK BANNERS & MODALS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiologyLinkageCrossingOverSim;