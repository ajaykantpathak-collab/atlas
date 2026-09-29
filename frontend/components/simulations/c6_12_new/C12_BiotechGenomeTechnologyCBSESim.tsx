'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL 41 NODE IDS FOR ISC GENOME TECHNOLOGY
// ==========================================
const NODE_IDS = {
  SUBTILISIN_ENG: 'c12_bt_cbse_314',
  CRISPR_DSB_HDR: 'c12_bt_cbse_315',
  COMPUTATIONAL_GENOMICS: 'c12_bt_cbse_316',
  STRUCTURAL_GENOMICS: 'c12_bt_cbse_317',
  FUNCTIONAL_GENOMICS: 'c12_bt_cbse_318',
  COMPARATIVE_GENOMICS: 'c12_bt_cbse_319',
  PROTEIN_ENG_PRINCIPLES: 'c12_bt_cbse_320',
  SITE_DIRECTED_MUTAGENESIS: 'c12_bt_cbse_321',
  HIS_TAG_PURIFICATION: 'c12_bt_cbse_322',
  GFP_TAGGING: 'c12_bt_cbse_323',
  RECOMBINANT_IMMUNOTOXIN: 'c12_bt_cbse_324',
  HUMANISED_MABS: 'c12_bt_cbse_325',
  INDIAN_GENOMICS_FACILITIES: 'c12_bt_cbse_326',
  GENOME_PROKARYOTIC_ORG: 'c12_bt_cbse_327',
  EUKARYOTIC_GENOME_ORG: 'c12_bt_cbse_328',
  GENOME_MAPPING_PURPOSE: 'c12_bt_cbse_329',
  GENETIC_MAPPING_RECOMB: 'c12_bt_cbse_330',
  CENTIMORGAN_UNITS: 'c12_bt_cbse_331',
  PHYSICAL_MAPPING: 'c12_bt_cbse_332',
  RFLP_TECHNIQUE: 'c12_bt_cbse_333',
  SOUTHERN_HYBRIDIZATION: 'c12_bt_cbse_334',
  SSLP_MARKERS: 'c12_bt_cbse_335',
  STS_PHYSICAL_MAPPING: 'c12_bt_cbse_336',
  EVOLUTION_DNA_SEQUENCING: 'c12_bt_cbse_337',
  SANGER_SEQUENCING: 'c12_bt_cbse_338',
  CAPILLARY_CHROMATOGRAM: 'c12_bt_cbse_339',
  NGS_MASSIVELY_PARALLEL: 'c12_bt_cbse_340',
  ILLUMINA_BRIDGE_PCR: 'c12_bt_cbse_341',
  NANOPORE_THIRD_GEN: 'c12_bt_cbse_342',
  WHOLE_GENOME_SEQUENCING: 'c12_bt_cbse_343',
  DE_NOVO_ASSEMBLY: 'c12_bt_cbse_344',
  CLINICAL_EXOME_SEQ: 'c12_bt_cbse_345',
  RNA_SEQ_TRANSCRIPTOME: 'c12_bt_cbse_346',
  CHIP_SEQ_MAPPING: 'c12_bt_cbse_347',
  METAGENOMICS_COMMUNITIES: 'c12_bt_cbse_348',
  GENOME_ENG_GOALS: 'c12_bt_cbse_349',
  TRANSPOSONS_MOBILE_ELTS: 'c12_bt_cbse_350',
  KNOCK_OUT_TRANSPOSON: 'c12_bt_cbse_351',
  KNOCK_IN_TRANSPOSON: 'c12_bt_cbse_352',
  CRISPR_IMMUNITY: 'c12_bt_cbse_353',
  CRISPR_MECHANISM_GRNA: 'c12_bt_cbse_354',
} as const;

const ALL_NODE_IDS: string[] = Object.values(NODE_IDS);

// ==========================================
// MANDATORY SECTIONS 1 TO 6
// ==========================================

const SCENARIO = {
  title: 'Advanced Genome Engineering & Biotechnology Virtual Facility',
  intro: 'Welcome to the National Biotechnology Research Core Laboratory. As lead genomics scientist, you are charged with manipulating genes, analyzing high-throughput DNA sequencing, engineering bleach-resistant enzymes, and constructing precise CRISPR gene edits.',
  context: 'You will master protein redesign (Subtilisin), execute site-directed mutagenesis, perform RFLP mapping & Sanger chromatogram decoding, run NGS bridge PCR simulations, and design sgRNA for Cas9 knock-outs and homology-directed repairs.',
};

const DISCOVERY_QUESTION = {
  question: 'Why does substituting Met222 with Alanine in the industrial laundry enzyme Subtilisin prevent its inactivation by bleach, whereas native Met222 causes rapid loss of enzymatic activity?',
  options: [
    'Methionine contains a nucleophilic sulfur atom that oxidizes to methionine sulfoxide upon bleach exposure, causing steric clash in the active site; Alanine lacks a sulfur side chain.',
    'Methionine is negatively charged, whereas Alanine is positively charged, attracting chloride ions.',
    'Alanine forms a covalent bond with bleach, inactivating the oxidizing agent immediately.',
    'Methionine reduces hydrogen bonds in the catalytic triad (Ser-His-Asp), making the enzyme unfold completely.',
  ],
  correctIndex: 0,
  hintAfter: 'Chemical oxidation of Methionine side chains (-CH2-CH2-S-CH3) to sulfoxide (-S=O) expands side chain volume near Ser221, blocking substrate binding. Alanine (-CH3) cannot be oxidized by bleach reagents!',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Subtilisin Redesign & Site-Directed Mutagenesis',
    instruction: 'Select amino acid mutations at position 222 (Met, Ala, Leu, Cys) and measure catalytic activity (kcat/Km) in the presence of 50 mM H2O2 bleach.',
    interactionType: 'protein-mutagenesis-lab',
    nodeId: NODE_IDS.SUBTILISIN_ENG,
  },
  {
    title: 'Lab 2: CRISPR-Cas9 Target Recognition & Repair Selection',
    instruction: 'Synthesize a 20-nt guide RNA sequence matching target exon, locate the 5-NGG PAM site, and toggle between Non-Homologous End Joining (NHEJ indel) vs Homology-Directed Repair (HDR template).',
    interactionType: 'crispr-editing-lab',
    nodeId: NODE_IDS.CRISPR_MECHANISM_GRNA,
  },
  {
    title: 'Lab 3: Sequencing Platforms (Sanger vs NGS Bridge PCR vs Nanopore)',
    instruction: 'Analyze fluorescence chromatogram peaks in Sanger capillary electrophoresis, observe Illumina cluster bridge PCR cycles, and decode ionic current blockage signatures in Oxford Nanopore sequencing.',
    interactionType: 'dna-sequencing-lab',
    nodeId: NODE_IDS.SANGER_SEQUENCING,
  },
  {
    title: 'Lab 4: Genomic Mapping & RFLP Southern Blot Analysis',
    instruction: 'Digest genomic DNA with EcoRI and HindIII restriction enzymes, resolve fragments on 1% agarose gel, transfer to nylon membrane, and probe for RFLP polymorphic markers to calculate map distances (cM).',
    interactionType: 'rflp-mapping-lab',
    nodeId: NODE_IDS.RFLP_TECHNIQUE,
  },
  {
    title: 'Lab 5: Functional Transcriptomics & ChIP-Seq Profiling',
    instruction: 'Quantify gene expression changes via RNA-seq RPKM/TPM heatmaps and map transcription factor binding peaks across genomic locus promoters with ChIP-seq alignment density.',
    interactionType: 'transcriptomics-lab',
    nodeId: NODE_IDS.RNA_SEQ_TRANSCRIPTOME,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a Sanger sequencing rxn contains ddATP tagged with green dye at 1:100 ratio with dATP, what occurs when DNA polymerase incorporates ddATP opposite a Thymine residue?',
    options: [
      'Polymerase immediately halts chain elongation because ddATP lacks a 3\'-OH group required for phosphodiester bond formation.',
      'Polymerase speeds up synthesis and adds two consecutive nucleotides.',
      'The template strand breaks at the phosphodiester backbone.',
      'Polymerase replaces ddATP with dATP automatically after fluorescent excitation.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Test in Lab 3 by selecting Sanger sequencing with ddNTP chain terminators lacking 3\'-OH.',
    nodeId: NODE_IDS.SANGER_SEQUENCING,
  },
  {
    question: 'Predict: What happens when CRISPR-Cas9 creates a double-strand break in human target cells in the ABSENCE of a donor repair template?',
    options: [
      'The cell dies immediately within 2 seconds.',
      'Error-prone Non-Homologous End Joining (NHEJ) rapidly ligates the cut ends, introducing random insertions/deletions (indels) that disrupt the reading frame (knock-out).',
      'The cell synthesizes a new chromosome de novo without mutations.',
      'Cas9 converts the DNA into single-stranded RNA automatically.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 2 by selecting CRISPR-Cas9 DSB without Homology-Directed Repair (HDR) donor template.',
    nodeId: NODE_IDS.CRISPR_DSB_HDR,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about band migration velocity during gel electrophoresis of RFLP restriction fragments?',
    observableOptions: [
      'Smaller DNA fragments migrate faster toward the positive anode (+) because matrix hindrance is lower.',
      'Larger DNA fragments move faster because they carry more negative phosphate charge.',
      'All DNA fragments move at identical speeds regardless of molecular weight.',
      'DNA fragments migrate toward the negative cathode (-) due to hydrogen bonding.',
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.RFLP_TECHNIQUE,
  },
  {
    question: 'What happens to the ionic current signature as a single-stranded DNA strand passes through a Nanopore channel?',
    observableOptions: [
      'The current drops to specific micro-ampere values characteristic of the k-mer nucleotide sequence obstructing the pore bottleneck.',
      'The current surges to maximum voltage and illuminates a green laser.',
      'The DNA molecule gets permanently glued inside the pore channel.',
      'The pore expands to 100 times its original diameter.',
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.NANOPORE_THIRD_GEN,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Diagnostics & Biomanufacturing Optimization Task',
  description: 'As a genomic clinical lab director, diagnose a genetic mutation in a patient with rare metabolic disorder using Clinical Exome Sequencing and engineer a thermostable recombinant enzyme with a 6xHis-tag for industrial batch production.',
  steps: [
    'Step 1: Extract patient genomic DNA and perform targeted exome enrichment using biotinylated RNA probes.',
    'Step 2: Run Illumina Next-Seq 2x150 bp paired-end sequencing to 100x mean coverage across 20,000 coding genes.',
    'Step 3: Align reads to GRCh38 human reference genome using BWA-MEM and call single nucleotide variants (SNVs) with GATK HaplotypeCaller.',
    'Step 4: Clone mutated target enzyme cDNA into pET-28a vector containing an N-terminal 6xHis-tag, express in E. coli BL21(DE3), and purify using Ni-NTA agarose affinity chromatography with imidazole elution.',
  ],
};

// ==========================================
// MISCONCEPTIONS (6 TOPIC SPECIFIC)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc-1',
    title: 'Sanger vs NGS Throughput & Mechanism',
    misconception: 'Students often believe Sanger sequencing can read millions of fragments simultaneously like NGS.',
    correction: 'Sanger sequencing processes single purified DNA fragments per capillary reaction with ~800-1000 bp read length. Next-Generation Sequencing (Illumina) runs millions/billions of parallel clonal clusters simultaneously via reversible terminator technology.',
    nodeId: NODE_IDS.SANGER_SEQUENCING,
  },
  {
    id: 'misc-2',
    title: 'Genetic Distance (cM) vs Physical Distance (bp)',
    misconception: 'Assuming 1 centimorgan (1 cM) corresponds to an exact fixed physical distance in base pairs across all genomic regions.',
    correction: '1 cM represents 1% recombination frequency, but physical distance per cM varies widely (e.g., ~1 Mb in humans) due to recombination hot spots and cold spots (centromeric suppression).',
    nodeId: NODE_IDS.CENTIMORGAN_UNITS,
  },
  {
    id: 'misc-3',
    title: 'CRISPR-Cas9 Specificity vs Restriction Enzymes',
    misconception: 'Thinking Cas9 relies on fixed restriction recognition sequences like EcoRI.',
    correction: 'Cas9 cleavage site is fully programmable by changing the 20-nt guide sequence complementary to the target DNA, requiring only a short Protospacer Adjacent Motif (PAM, e.g., 5\'-NGG-3\') adjacent to target.',
    nodeId: NODE_IDS.CRISPR_MECHANISM_GRNA,
  },
  {
    id: 'misc-4',
    title: 'NHEJ vs HDR Repair Outcomes',
    misconception: 'Believing CRISPR double-strand breaks always introduce precise gene edits automatically.',
    correction: 'Without a synthetic donor template, cells repair Cas9 DSBs via Non-Homologous End Joining (NHEJ), which is error-prone and generates random frameshift indels (knock-outs). Precise knock-ins require Homology-Directed Repair (HDR) with donor DNA.',
    nodeId: NODE_IDS.CRISPR_DSB_HDR,
  },
  {
    id: 'misc-5',
    title: 'Whole Genome Sequencing (WGS) vs RNA-seq',
    misconception: 'Confusing genomic DNA sequencing with RNA-seq expression levels.',
    correction: 'WGS decodes static genomic DNA sequence present in every cell nucleus, whereas RNA-seq quantifies dynamic, cell-type specific mRNA transcript abundance and alternative splicing events.',
    nodeId: NODE_IDS.RNA_SEQ_TRANSCRIPTOME,
  },
  {
    id: 'misc-6',
    title: 'Humanised Monoclonal Antibodies',
    misconception: 'Believing humanised monoclonal antibodies are produced directly by immunizing human subjects.',
    correction: 'Humanised mAbs are engineered by grafting murine complementary-determining regions (CDRs / hypervariable loops) onto human antibody framework regions (FRs) via protein engineering to prevent Human Anti-Mouse Antibody (HAMA) immune responses.',
    nodeId: NODE_IDS.HUMANISED_MABS,
  },
];

// ==========================================
// TYPES
// ==========================================
export type ChallengeType = 'multiple-choice' | 'drag-sort' | 'numeric' | 'classification';
export type DifficultyTier = 'foundation' | 'standard' | 'advanced';

export interface Challenge {
  id: string;
  nodeId: string;
  type: ChallengeType;
  difficulty: DifficultyTier;
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  sortItems?: string[];
  correctSortOrder?: number[];
  classificationItems?: { item: string; category: string }[];
  categories?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

export interface DiagnosticQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ==========================================
// 24 CHALLENGES ACROSS 3 TIERS
// ==========================================
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (8) ---
  {
    id: 'chal-f1',
    nodeId: NODE_IDS.SUBTILISIN_ENG,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Basic Understanding',
    question: 'In Subtilisin BPN\' engineering for laundry detergent compatibility, which amino acid residue at position 222 is mutated to prevent oxidation by bleach?',
    options: ['Methionine (Met)', 'Alanine (Ala)', 'Serine (Ser)', 'Histidine (His)'],
    correctIndex: 0,
    explanation: 'Native Subtilisin has Methionine at position 222 near catalytic Ser221. Methionine oxidizes to methionine sulfoxide in bleach, deactivating the enzyme. Mutating Met222 to Ala restores bleach resistance.',
    hints: [
      'Think about which amino acid contains a sulfur atom susceptible to oxidation.',
      'Native residue has -CH2-CH2-S-CH3 side chain.',
      'Met222 is replaced by Ala or Leu to enhance stability.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-f2',
    nodeId: NODE_IDS.CRISPR_MECHANISM_GRNA,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What short nucleotide motif must be present immediately adjacent to the 3\' end of target DNA for Streptococcus pyogenes Cas9 binding and cleavage?',
    options: ['5\'-NGG-3\' (PAM)', '5\'-TATA-3\' box', '5\'-AATAAA-3\' polyA signal', '5\'-CGG-3\' methylation island'],
    correctIndex: 0,
    explanation: 'SpCas9 strictly requires a Protospacer Adjacent Motif (PAM) sequence of 5\'-NGG-3\' directly adjacent to the 20-nucleotide target DNA sequence.',
    hints: [
      'PAM stands for Protospacer Adjacent Motif.',
      'For standard SpCas9, it consists of any nucleotide followed by two Guanines.',
      '5\'-NGG-3\' is essential for Cas9 strand unwinding.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'chal-f3',
    nodeId: NODE_IDS.SANGER_SEQUENCING,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why do dideoxynucleotide triphosphates (ddNTPs) terminate DNA synthesis during Sanger sequencing?',
    options: [
      'They lack a 3\'-hydroxyl (-OH) group needed to form the phosphodiester bond with the next incoming nucleotide.',
      'They lack a 5\'-phosphate group required for energy input.',
      'They destroy the DNA polymerase enzyme upon binding.',
      'They contain a toxic ribose sugar ring that cleaves DNA.',
    ],
    correctIndex: 0,
    explanation: 'ddNTPs lack the 3\'-OH group on the deoxyribose sugar ring. Without 3\'-OH, DNA polymerase cannot add subsequent dNTPs, terminating the chain at that base.',
    hints: [
      'Look at the chemical difference between dNTP (2\'-deoxy) and ddNTP (2\'-3\'-dideoxy).',
      'Phosphodiester bonds link 5\'-phosphate to 3\'-OH.',
      'Missing 3\'-OH prevents chain elongation.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-f4',
    nodeId: NODE_IDS.HIS_TAG_PURIFICATION,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which transition metal matrix is commonly used in Immobilized Metal Affinity Chromatography (IMAC) to capture 6xHis-tagged recombinant proteins?',
    options: ['Nickel-NTA (Ni2+)', 'Sodium-Citrate (Na+)', 'Calcium-Carbonate (Ca2+)', 'Magnesium-Sulfate (Mg2+)'],
    correctIndex: 0,
    explanation: 'Histidine side chains (imidazole rings) form coordination bonds with immobilized divalent transition metal ions like Nickel (Ni2+) or Cobalt (Co2+) on NTA resins.',
    hints: [
      'Histidine forms coordinate covalent bonds with transition metals.',
      'Ni-NTA resin is standard in biochemistry labs.',
      'Elution is achieved using competitive imidazole concentrations.',
    ],
  },
  {
    id: 'chal-f5',
    nodeId: NODE_IDS.GFP_TAGGING,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Green Fluorescent Protein (GFP), isolated from Aequorea victoria, forms its intrinsic fluorophore chromophore from which tripeptide sequence?',
    options: ['Ser65 - Tyr66 - Gly67', 'Ala1 - Met2 - Cys3', 'His10 - Lys11 - Arg12', 'Asp100 - Glu101 - Gly102'],
    correctIndex: 0,
    explanation: 'GFP chromophore forms spontaneously by autocatalytic cyclization and oxidation of the internal tripeptide Serine 65 - Tyrosine 66 - Glycine 67.',
    hints: [
      'It contains a central aromatic amino acid (Tyrosine).',
      'Residues 65, 66, and 67 form the p-hydroxybenzylidene-imidazolidinone chromophore.',
      'Ser-Tyr-Gly is the answer.',
    ],
  },
  {
    id: 'chal-f6',
    nodeId: NODE_IDS.CENTIMORGAN_UNITS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'One centimorgan (1 cM) map unit is defined as the genetic distance corresponding to what percentage of meiotic recombination frequency?',
    options: ['1%', '10%', '50%', '0.1%'],
    correctIndex: 0,
    explanation: '1 centimorgan (cM) = 1 map unit (m.u.) = 1% recombinant frequency between two gene loci.',
    hints: [
      'Named in honor of Thomas Hunt Morgan.',
      'Percent recombination = 1 cM.',
      '1% = 1 cM.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'chal-f7',
    nodeId: NODE_IDS.TRANSPOSONS_MOBILE_ELTS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which enzyme is encoded by Class II transposable elements to execute the cut-and-paste transposition mechanism?',
    options: ['Transposase', 'Reverse Transcriptase', 'DNA Ligase IV', 'Topoisomerase II'],
    correctIndex: 0,
    explanation: 'Class II DNA transposons encode Transposase, which recognizes inverted terminal repeats (ITRs), excises the transposon, and integrates it into target DNA.',
    hints: [
      'Cut-and-paste mechanism enzyme.',
      'Recognizes inverted terminal repeats.',
      'Transposase enzyme.',
    ],
  },
  {
    id: 'chal-f8',
    nodeId: NODE_IDS.HUMANISED_MABS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What part of a murine monoclonal antibody is retained during the humanisation process to preserve antigen-binding specificity?',
    options: [
      'Complementarity-Determining Regions (CDRs)',
      'Heavy chain constant domain (CH2-CH3)',
      'Light chain constant domain (CL)',
      'Fc receptor domain',
    ],
    correctIndex: 0,
    explanation: 'Humanisation grafts hypervariable CDR loops from mouse antibodies onto human IgG framework regions (FRs), reducing immunogenicity (HAMA response).',
    hints: [
      'CDRs contain hypervariable amino acid loops.',
      'CDRs interact directly with the epitope.',
      'Mouse CDRs + Human framework = Humanised antibody.',
    ],
    misconceptionIndex: 5,
  },

  // --- STANDARD (8) ---
  {
    id: 'chal-s1',
    nodeId: NODE_IDS.GENETIC_MAPPING_RECOMB,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation & Analysis',
    question: 'In a test cross involving two linked gene loci A and B, 1000 offspring are scored: 420 Parental AB, 430 Parental ab, 78 Recombinant Ab, and 72 Recombinant aB. Calculate the genetic map distance in centimorgans (cM).',
    correctAnswer: 15,
    tolerance: 0.5,
    unit: 'cM',
    explanation: 'Recombination Frequency = (Total Recombinants / Total Offspring) * 100 = ((78 + 72) / 1000) * 100 = (150 / 1000) * 100 = 15%. Thus, map distance = 15 cM.',
    hints: [
      'Sum the recombinant progeny count (Ab + aB).',
      'Divide by total progeny (1000) and multiply by 100.',
      '150 / 1000 * 100 = 15 cM.',
    ],
  },
  {
    id: 'chal-s2',
    nodeId: NODE_IDS.ILLUMINA_BRIDGE_PCR,
    type: 'classification',
    difficulty: 'standard',
    competencyLevel: 'Categorization & Analysis',
    question: 'Classify each sequencing feature into either First Generation (Sanger) or Next-Generation Sequencing (Illumina):',
    categories: ['Sanger Sequencing', 'Illumina NGS'],
    classificationItems: [
      { item: 'Capillary gel electrophoresis with ddNTP chain terminators', category: 'Sanger Sequencing' },
      { item: 'Bridge PCR amplification on flow cell surface', category: 'Illumina NGS' },
      { item: 'Reversible dye terminators with single-base extension', category: 'Illumina NGS' },
      { item: 'Read length up to 900-1000 bp per reaction', category: 'Sanger Sequencing' },
    ],
    explanation: 'Sanger sequencing uses capillary electrophoresis and ddNTPs (long single reads). Illumina uses surface bridge PCR and reversible terminator cyclic reversible sequencing (massively parallel short reads).',
    hints: [
      'Bridge PCR and flow cells belong to Illumina.',
      'Capillary gel and long single reads belong to Sanger.',
      'Reversible dye terminators allow stepwise imaged addition in Illumina.',
    ],
  },
  {
    id: 'chal-s3',
    nodeId: NODE_IDS.CRISPR_DSB_HDR,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'To execute precise single-nucleotide knock-in (SNP correction) in human cells using CRISPR-Cas9, which repair pathway must be activated, and what critical reagent must be co-introduced?',
    options: [
      'Homology-Directed Repair (HDR); synthetic single-stranded donor DNA oligonucleotide (ssODN)',
      'Non-Homologous End Joining (NHEJ); RNA polymerase III enzyme',
      'Mismatch Repair (MMR); DNA ligase I protein',
      'Nucleotide Excision Repair (NER); reverse transcriptase',
    ],
    correctIndex: 0,
    explanation: 'HDR uses homologous sequence templates (ssODN or donor plasmid) to precisely repair Cas9 DSBs during S/G2 phase. NHEJ causes random insertion/deletion mutations.',
    hints: [
      'HDR stands for Homology-Directed Repair.',
      'Requires a template matching sequence flanking the cut site.',
      'ssODN serves as donor repair template.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'chal-s4',
    nodeId: NODE_IDS.RFLP_TECHNIQUE,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A point mutation abolishes an EcoRI restriction site (5\'-GAATTC-3\') in allele B compared to allele A. What gel band pattern is expected on Southern blot for a heterozygous individual (AB) probed with a region spanning the locus?',
    options: [
      'Three bands: one large uncut fragment (Allele B) and two smaller cleavage fragments (Allele A)',
      'Only one single small band',
      'No bands visible because DNA degraded',
      'Four bands of equal intensity',
    ],
    correctIndex: 0,
    explanation: 'Allele A is cleaved into 2 smaller restriction fragments. Allele B remains uncut (1 large fragment). A heterozygote AB displays all 3 bands.',
    hints: [
      'Allele A cuts (2 fragments).',
      'Allele B does not cut (1 fragment).',
      'Heterozygote AB shows combined 2 + 1 = 3 bands.',
    ],
  },
  {
    id: 'chal-s5',
    nodeId: NODE_IDS.RNA_SEQ_TRANSCRIPTOME,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'In an RNA-seq transcriptomics experiment, Gene X receives 500 aligned reads in a sample with total mapped reads N = 10,000,000. If Gene X exon length is L = 2.0 kb (2000 bp), calculate the expression level in RPKM (Reads Per Kilobase Million).',
    correctAnswer: 25,
    tolerance: 0.5,
    unit: 'RPKM',
    explanation: 'RPKM = (Mapped Reads * 10^9) / (Gene Length in bp * Total Mapped Reads) = (500 * 10^9) / (2000 * 10,000,000) = 500,000 / 20,000 = 25 RPKM.',
    hints: [
      'RPKM formula: (Reads / (Length_in_kb * Total_Reads_in_Millions)).',
      'Length in kb = 2.0.',
      'Total reads in millions = 10.0.',
      'RPKM = 500 / (2.0 * 10) = 500 / 20 = 25.',
    ],
  },
  {
    id: 'chal-s6',
    nodeId: NODE_IDS.NANOPORE_THIRD_GEN,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'How does Oxford Nanopore technology detect individual nucleotides as ultra-long single DNA molecules translocate through protein pores (e.g., CsgG)?',
    options: [
      'By measuring characteristic disruptions in pico-ampere (pA) ionic current caused by bases clogging the constriction zone',
      'By capturing high-speed laser fluorescence flashes from fluorophore-tagged dNTPs',
      'By measuring mass change using micro-balance cantilever scales',
      'By measuring pH changes as hydrogen ions released during polymerisation',
    ],
    correctIndex: 0,
    explanation: 'Nanopore sequencing applies a constant voltage across a membrane. As DNA translocates through a protein pore, specific k-mer nucleotide combinations block ionic flux, producing diagnostic electrical current step changes (pA).',
    hints: [
      'Nanopore measures ionic current changes.',
      'No fluorescent dyes or DNA polymerase required.',
      'Pico-ampere current blockades decipher bases.',
    ],
  },
  {
    id: 'chal-s7',
    nodeId: NODE_IDS.SITE_DIRECTED_MUTAGENESIS,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In QuikChange Site-Directed Mutagenesis, why is the PCR product digested with restriction endonuclease DpnI prior to bacterial transformation?',
    options: [
      'DpnI specifically cleaves methylated parental template DNA (5\'-G-m6A-ATC-3\'), selecting for newly synthesized non-methylated mutant plasmid.',
      'DpnI ligates mutant synthetic primers to plasmid backbone.',
      'DpnI degrades non-mutated RNA primers.',
      'DpnI linearizes mutant plasmid to enhance transformation efficiency.',
    ],
    correctIndex: 0,
    explanation: 'Parental plasmid isolated from E. coli dam+ strains is methylated at GATC sites. DpnI target is methylated 5\'-G-m6A-ATC-3\', destroying original wild-type template while leaving synthetic mutant PCR product intact.',
    hints: [
      'DpnI cuts methylated and hemimethylated DNA.',
      'Parental DNA is methylated by dam methylase.',
      'DpnI eliminates wild-type background template.',
    ],
  },
  {
    id: 'chal-s8',
    nodeId: NODE_IDS.METAGENOMICS_COMMUNITIES,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'To profile unculturable bacterial taxonomies in soil samples without whole genome sequencing, which hypervariable marker gene is targeted for amplicon sequencing?',
    options: [
      '16S ribosomal RNA (16S rRNA) gene',
      'Cytochrome c oxidase subunit I (COI)',
      'Beta-actin gene',
      'RNA Polymerase II subunit A',
    ],
    correctIndex: 0,
    explanation: '16S rRNA is present in all prokaryotes with conserved region primers flanking hypervariable regions (V1-V9) that provide taxonomic resolution down to genus/species level.',
    hints: [
      'Ribosomal RNA gene present in prokaryotes.',
      'Has conserved regions for universal PCR primers.',
      '16S rRNA amplicon sequencing.',
    ],
  },

  // --- ADVANCED (8) ---
  {
    id: 'chal-a1',
    nodeId: NODE_IDS.CHIP_SEQ_MAPPING,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Procedural Mastery',
    question: 'Arrange the sequential steps of a Chromatin Immunoprecipitation Sequencing (ChIP-seq) experiment in chronological order:',
    sortItems: [
      'In vivo crosslinking of DNA-protein complexes using formaldehyde',
      'Chromatin fragmentation via sonication into ~200-500 bp fragments',
      'Immunoprecipitation with specific antibody targeting transcription factor',
      'Reverse crosslinking, proteinase K digestion, and DNA purification',
      'High-throughput NGS sequencing and bioinformatic peak calling',
    ],
    correctSortOrder: [0, 1, 2, 3, 4],
    explanation: 'ChIP-seq workflow: formaldehyde crosslinking -> chromatin sonication -> antibody immunoprecipitation -> reverse crosslinks & DNA purification -> NGS sequencing & peak alignment.',
    hints: [
      'First step fixes DNA-protein interactions (formaldehyde).',
      'Sonication breaks chromatin into small pieces.',
      'Antibody selects specific transcription factor before purification and sequencing.',
    ],
  },
  {
    id: 'chal-a2',
    nodeId: NODE_IDS.DE_NOVO_ASSEMBLY,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & High-Performance Computing',
    question: 'In de novo genome assembly of short NGS reads, why are de Bruijn graphs preferred over Overlap-Layout-Consensus (OLC) graphs for billions of reads?',
    options: [
      'De Bruijn graphs decompose reads into k-mers, avoiding all-against-all pairwise alignment calculations (O(N^2) complexity).',
      'De Bruijn graphs require zero computer memory.',
      'OLC graphs cannot handle repeat elements.',
      'De Bruijn graphs only work for Sanger sequencing reads.',
    ],
    correctIndex: 0,
    explanation: 'Pairwise read alignment in OLC scales quadratically O(N^2), becoming computationally intractable for billions of short reads. De Bruijn graphs construct k-mer spectrum nodes with computational time scaling linearly O(N).',
    hints: [
      'Pairwise alignment scales exponentially/quadratically with read count.',
      'K-mers break reads into fixed length substrings.',
      'De Bruijn graph constructs Eulerian paths.',
    ],
  },
  {
    id: 'chal-a3',
    nodeId: NODE_IDS.RECOMBINANT_IMMUNOTOXIN,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Molecular Design',
    question: 'In designing a targeted Recombinant Immunotoxin for oncology, a single-chain variable fragment (scFv) antibody is fused to Pseudomonas exotoxin A (PE38). How does PE38 kill target tumor cells upon endocytosis?',
    options: [
      'PE38 ADP-ribosylates Elongation Factor 2 (EF-2), completely arresting ribosomal protein translation.',
      'PE38 degrades cellular mitochondrial ATP synthase.',
      'PE38 cleaves genomic DNA at telomeres.',
      'PE38 forms giant pores in the plasma membrane causing osmotic lysis.',
    ],
    correctIndex: 0,
    explanation: 'Pseudomonas exotoxin A domain III catalyzes ADP-ribosylation of diphthamide residue in elongation factor EF-2, inactivating protein synthesis and inducing apoptosis.',
    hints: [
      'Target of exotoxin A is translation elongation factor 2.',
      'Catalyzes ADP-ribosylation of EF-2.',
      'Blocks ribosome protein synthesis.',
    ],
  },
  {
    id: 'chal-a4',
    nodeId: NODE_IDS.KNOCK_OUT_TRANSPOSON,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Experimental Design',
    question: 'In Transposon Insertion Sequencing (Tn-Seq) high-throughput screen, what quantitative metric identifies essential genes in a bacterial genome under antibiotic selection?',
    options: [
      'Genes with a complete absence or severe depletion of transposon insertion reads in mutant library populations.',
      'Genes with highest density of transposon insertions.',
      'Genes that duplication transposons 100-fold.',
      'Genes that export transposase out of the cell membrane.',
    ],
    correctIndex: 0,
    explanation: 'In insertion screens, transposition into essential genes disrupts vital functions, leading to cell lethality. Hence essential genes lack transposon insertion reads in surviving populations.',
    hints: [
      'Inserting a transposon into an essential gene kills the bacterium.',
      'Dead bacteria do not produce sequencing reads in surviving pools.',
      'Essential genes show zero transposon insertion coverage.',
    ],
  },
  {
    id: 'chal-a5',
    nodeId: NODE_IDS.CLINICAL_EXOME_SEQ,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Clinical Bioinformatics',
    question: 'Human exome spans ~30 Megabases (Mb) (~1% of genome). If an Illumina sequencing run yields 6 Gigabases (Gb) of target exome reads, calculate the theoretical average sequencing depth (coverage fold, X).',
    correctAnswer: 200,
    tolerance: 1.0,
    unit: 'X',
    explanation: 'Coverage Depth C = Total Bases / Target Size = 6,000,000,000 bp / 30,000,000 bp = 6000 / 30 = 200X mean depth.',
    hints: [
      'Coverage = Total Sequenced Yield / Target Genome Size.',
      '6 Gb = 6000 Mb.',
      '6000 Mb / 30 Mb = 200.',
    ],
  },
  {
    id: 'chal-a6',
    nodeId: NODE_IDS.INDIAN_GENOMICS_FACILITIES,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'National Policy & Core Infra',
    question: 'Under the Department of Biotechnology (DBT), India established National Genomics Core Facilities across institutes (such as NIBMG Kalyani and CDFD Hyderabad). What is the main primary mandate of the IndiGen initiative?',
    options: [
      'Whole genome sequencing of thousands of Indian individuals to establish baseline population genetic variation and precision medicine markers.',
      'Cloning extinct Asian elephants.',
      'Replacing all traditional crop seeds with CRISPR mutants.',
      'Establishing a human spaceflight biological laboratory.',
    ],
    correctIndex: 0,
    explanation: 'IndiGen program sequenced full genomes of thousands of Indian citizens to build population-specific reference databases, identify disease susceptibility alleles, and advance precision health.',
    hints: [
      'Focuses on genetic diversity of Indian ethnic populations.',
      ' Whole genome sequencing for precision medicine.',
      'Baseline population genomics variants.',
    ],
  },
  {
    id: 'chal-a7',
    nodeId: NODE_IDS.CRISPR_IMMUNITY,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Mechanistic Synthesis',
    question: 'Order the three distinct stages of bacterial CRISPR-Cas adaptive immunity during bacteriophage infection:',
    sortItems: [
      'Adaptation / Acquisition: Cas1-Cas2 complex captures foreign protospacer DNA and integrates it into CRISPR array',
      'Expression / Processing: CRISPR locus transcribed into pre-crRNA and processed by Cas/RNase III into mature crRNAs',
      'Interference: Cas effector complex (Cas9) guided by crRNA targets and cleaves complementary invader phage DNA',
    ],
    correctSortOrder: [0, 1, 2],
    explanation: 'Bacterial CRISPR adaptive immunity proceeds in 3 stages: 1. Spacer Acquisition -> 2. crRNA Biogenesis/Processing -> 3. Target Interference (DNA cleavage).',
    hints: [
      'Stage 1: Foreign DNA capture and insertion.',
      'Stage 2: Transcription into guide crRNA.',
      'Stage 3: Destruction of matching foreign phage DNA.',
    ],
  },
  {
    id: 'chal-a8',
    nodeId: NODE_IDS.COMPARATIVE_GENOMICS,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evolutionary Bio-Analysis',
    question: 'In comparative genomics, genes in different species that evolved from a common ancestral gene via speciation and retain the identical biological function are termed:',
    options: ['Orthologs', 'Paralogs', 'Xenologs', 'Pseudogenes'],
    correctIndex: 0,
    explanation: 'Orthologs are homologous genes separated by speciation events (retaining function). Paralogs arise via gene duplication within a single genome.',
    hints: [
      'Speciation vs Duplication.',
      'Orthologs = Ortho (straight/true function across species).',
      'Paralogs = Gene duplication within same species.',
    ],
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 ITEMS)
// ==========================================
const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-1',
    nodeId: NODE_IDS.SUBTILISIN_ENG,
    question: 'Why does substituting Met222 with Ala in Subtilisin increase its stability in bleach?',
    options: [
      'Ala lacks sulfur and cannot be oxidized by hydrogen peroxide/bleach',
      'Ala forms additional ionic bonds with detergent cations',
      'Ala creates a disulphide bridge with Cys221',
      'Ala increases hydrophobic bulk tenfold',
    ],
    correctIndex: 0,
    explanation: 'Methionine side chain contains sulfur that oxidizes to sulfoxide in oxidative environments, causing steric hindrance. Alanine (-CH3) is inert to oxidation.',
  },
  {
    id: 'diag-2',
    nodeId: NODE_IDS.CRISPR_MECHANISM_GRNA,
    question: 'What is the role of tracrRNA in the dual gRNA system of CRISPR-Cas9?',
    options: [
      'Base-pairs with crRNA to form a scaffold structure that binds Cas9 protein',
      'Binds directly to target DNA 20-bp protospacer',
      'Cleaves the target non-complementary DNA strand',
      'Acts as an exonuclease enzyme',
    ],
    correctIndex: 0,
    explanation: 'tracrRNA duplexes with crRNA to form the structural handle recognized by Cas9 protein, positioning the 20-nt crRNA target guide sequence.',
  },
  {
    id: 'diag-3',
    nodeId: NODE_IDS.SANGER_SEQUENCING,
    question: 'In Sanger sequencing chromatograms, overlapping double peaks at a single nucleotide position indicate:',
    options: [
      'Heterozygous genomic single nucleotide variant (SNV)',
      'Taq polymerase thermal destruction',
      'Complete sequence failure',
      'Excessive concentration of ddNTPs',
    ],
    correctIndex: 0,
    explanation: 'Heterozygous loci contain two distinct alleles; capillary gel detects two different fluorescent colors at equal intensity at that exact position.',
  },
  {
    id: 'diag-4',
    nodeId: NODE_IDS.CENTIMORGAN_UNITS,
    question: 'If two loci on the same chromosome display 4% recombination frequency, what is their genetic distance?',
    options: ['4 cM', '0.4 cM', '40 cM', '400 cM'],
    correctIndex: 0,
    explanation: '1% recombination frequency equals 1 centimorgan (cM). 4% = 4 cM.',
  },
  {
    id: 'diag-5',
    nodeId: NODE_IDS.HIS_TAG_PURIFICATION,
    question: 'Which reagent is used to elute 6xHis-tagged proteins from Ni-NTA affinity columns?',
    options: ['Imidazole', 'Sodium Chloride', 'Urea', 'EDTA'],
    correctIndex: 0,
    explanation: 'Imidazole competes with histidine side chains for coordination binding sites on Ni2+ ions, eluting the purified His-tagged protein.',
  },
  {
    id: 'diag-6',
    nodeId: NODE_IDS.RNA_SEQ_TRANSCRIPTOME,
    question: 'First step in standard RNA-seq library preparation after mRNA isolation is:',
    options: [
      'Reverse transcription of mRNA into complementary cDNA',
      'Direct sequencing on Sanger capillary gel',
      'Western blotting of encoded proteins',
      'Ligation of agarose gels',
    ],
    correctIndex: 0,
    explanation: 'NGS platforms sequence DNA; mRNA must be converted to cDNA using reverse transcriptase before adaptor ligation and amplification.',
  },
  {
    id: 'diag-7',
    nodeId: NODE_IDS.RFLP_TECHNIQUE,
    question: 'Southern blotting uses which probe molecule to detect specific DNA fragments on membrane?',
    options: [
      'Single-stranded labeled DNA or RNA probe complementary to target sequence',
      'Monoclonal antibody against histone H3',
      'Staphylococcus protein A',
      'Ethidium bromide dye only',
    ],
    correctIndex: 0,
    explanation: 'Southern hybridization employs radiolabeled or fluorophore-tagged complementary ssDNA/RNA probes that hybridize to target fragments on nylon/nitrocellulose membrane.',
  },
  {
    id: 'diag-8',
    nodeId: NODE_IDS.HUMANISED_MABS,
    question: 'Humanized antibodies graft which specific regions onto human antibody scaffolds?',
    options: ['Mouse CDR loops', 'Mouse Fc constant region', 'Bacterial flagellin', 'Phage capsid proteins'],
    correctIndex: 0,
    explanation: 'Only mouse Complementarity-Determining Regions (CDRs) are grafted onto human IgG framework regions to minimize anti-mouse immune responses.',
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS (TOPIC-SPECIFIC)
// ==========================================

const SubtilisinProteinEngSVG: React.FC = () => (
  <svg viewBox="0 0 600 220" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700">
    <rect width="600" height="220" fill="#0f172a" rx="12" />
    <text x="300" y="24" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Subtilisin BPN&apos; — Met222 &rarr; Ala redesign</text>
    <path d="M60 110 Q 150 40 240 110 T 420 110 T 540 110" fill="none" stroke="#38bdf8" strokeWidth="4" />
    {[80,140,200,300,360,460,520].map((cx,i)=>(
      <circle key={i} cx={cx} cy={i%2?92:128} r="9" fill={i===4?'#f59e0b':'#334155'} stroke="#64748b" />
    ))}
    <circle cx="360" cy="92" r="12" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="4 3" />
    <text x="360" y="68" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">Met222 &rarr; Ala</text>
    <text x="300" y="200" textAnchor="middle" fill="#64748b" fontSize="10">Bleach oxidises Met222 near catalytic Ser221 — swap to Ala for detergent stability.</text>
  </svg>
);

const SangerChromatogramSVG: React.FC<{ highlightPos?: number }> = ({ highlightPos = 12 }) => {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="600" height="220" fill="url(#bgGrad)" rx="12" />
      
      {/* Grid Lines */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="30" y1={y} x2="570" y2={y} stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
      ))}
      
      {/* Laser Read Head Cursor */}
      <line x1={highlightPos * 25 + 40} y1="20" x2={highlightPos * 25 + 40} y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
      <polygon points={`${highlightPos * 25 + 35},15 ${highlightPos * 25 + 45},15 ${highlightPos * 25 + 40},25`} fill="#f59e0b" />

      {/* Chromatogram Peaks (A-Green, C-Blue, G-Black/Yellow, T-Red) */}
      {/* Base sequence: A T C G A T C G T A C G T A A C G */}
      <path d="M 40 160 Q 55 40 70 160 Q 80 160 95 160 Q 140 160 145 160 Q 155 40 170 160 Q 245 160 255 40 270 160 Q 345 160 355 40 370 160 Q 445 160 455 40 470 160 Q 480 40 495 160" fill="none" stroke="#22c55e" strokeWidth="3" opacity="0.9" />
      <path d="M 40 160 Q 95 160 105 50 120 160 Q 170 160 180 50 195 160 Q 270 160 280 50 295 160 Q 370 160 380 50 395 160 Q 495 160 510 50 525 160" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.9" />
      <path d="M 40 160 Q 120 160 130 35 145 160 Q 195 160 205 35 220 160 Q 295 160 305 35 320 160 Q 395 160 405 35 420 160 Q 525 160 535 35 550 160" fill="none" stroke="#eab308" strokeWidth="3" opacity="0.9" />
      <path d="M 40 160 Q 65 160 80 45 95 160 Q 145 160 160 45 175 160 Q 220 160 230 45 245 160 Q 320 160 330 45 345 160 Q 420 160 430 45 445 160 Q 470 160 480 160" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.9" />

      {/* Base Calls underneath */}
      {['A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'T', 'A', 'C', 'G', 'T', 'A', 'A', 'C', 'G', 'T', 'C', 'A'].map((base, idx) => {
        const x = idx * 25 + 50;
        let color = '#22c55e';
        if (base === 'T') color = '#ef4444';
        if (base === 'C') color = '#3b82f6';
        if (base === 'G') color = '#eab308';
        return (
          <g key={idx}>
            <text x={x} y="195" fill={color} fontSize="14" fontWeight="bold" textAnchor="middle">{base}</text>
            <text x={x} y="210" fill="#64748b" fontSize="9" textAnchor="middle">{idx + 1}</text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(420, 25)">
        <rect width="160" height="35" rx="6" fill="#0f172a" stroke="#334155" />
        <circle cx="15" cy="18" r="5" fill="#22c55e" />
        <text x="25" y="21" fill="#cbd5e1" fontSize="10">ddATP (A)</text>
        <circle cx="85" cy="18" r="5" fill="#ef4444" />
        <text x="95" y="21" fill="#cbd5e1" fontSize="10">ddTTP (T)</text>
      </g>
    </svg>
  );
};

const CrisprCas9DiagramSVG: React.FC<{ activeMode: 'NHEJ' | 'HDR'; cleaving: boolean }> = ({ activeMode, cleaving }) => {
  return (
    <svg viewBox="0 0 650 250" className="w-full h-auto bg-slate-900 rounded-xl border border-purple-900/40 shadow-xl">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Cas9 Protein Lobes */}
      <path d="M 160 60 C 220 20, 420 20, 460 70 C 500 120, 480 200, 400 220 C 320 230, 200 220, 160 170 C 130 130, 120 80, 160 60 Z" fill="#4c1d95" opacity="0.55" stroke="#7c3aed" strokeWidth="2" />
      <text x="310" y="45" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">Cas9 Nuclease Complex</text>
      
      {/* Target DNA Strands */}
      {/* Non-target Strand (Top) */}
      <path d="M 40 100 L 220 100 Q 250 80 280 100 L 600 100" fill="none" stroke="#38bdf8" strokeWidth="4" />
      {/* Target Strand (Bottom) */}
      <path d="M 40 130 L 220 130 Q 250 150 280 130 L 600 130" fill="none" stroke="#0284c7" strokeWidth="4" />

      {/* PAM Site Highlighting (5'-NGG-3') */}
      <rect x="440" y="90" width="45" height="50" fill="#f59e0b" opacity="0.3" rx="4" />
      <text x="462" y="82" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">PAM (NGG)</text>

      {/* Guide RNA (sgRNA Handle + Spacer) */}
      <path d="M 120 180 C 180 180, 200 130, 240 130 L 430 130" fill="none" stroke="#ec4899" strokeWidth="4" strokeDasharray={cleaving ? "6,3" : "none"} />
      <path d="M 120 180 C 80 180, 70 210, 110 210 C 140 210, 140 190, 170 190" fill="none" stroke="#f472b6" strokeWidth="3" />
      <text x="220" y="165" fill="#f472b6" fontSize="11" fontWeight="bold">20-nt Guide RNA (crRNA)</text>

      {/* Cleavage Scissors / DSB Animation */}
      {cleaving && (
        <g filter="url(#glow)">
          <line x1="430" y1="80" x2="430" y2="150" stroke="#ef4444" strokeWidth="4" strokeDasharray="4,2" />
          <polygon points="430,115 420,100 440,100" fill="#ef4444" />
          <text x="430" y="70" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">Double Strand Break (DSB)</text>
        </g>
      )}

      {/* Repair Pathway Indicator */}
      <g transform="translate(490, 160)">
        <rect width="140" height="70" rx="8" fill="#1e1b4b" stroke={activeMode === 'HDR' ? '#22c55e' : '#ef4444'} strokeWidth="2" />
        <text x="70" y="25" fill="#f1f5f9" fontSize="12" fontWeight="bold" textAnchor="middle">Pathway: {activeMode}</text>
        <text x="70" y="48" fill="#94a3b8" fontSize="10" textAnchor="middle">
          {activeMode === 'NHEJ' ? 'Error-Prone Indel Knock-Out' : 'Precise Donor DNA Knock-In'}
        </text>
      </g>
    </svg>
  );
};

const PhysicalVsGeneticMapSVG: React.FC<{ rfPercentage: number }> = ({ rfPercentage }) => {
  const distancePx = rfPercentage * 7;
  return (
    <svg viewBox="0 0 600 200" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-md">
      <text x="300" y="25" fill="#f3f4f6" fontSize="14" fontWeight="bold" textAnchor="middle">Genomic Mapping: Recombination Frequency vs Physical Distance</text>

      {/* Genetic Map (cM) */}
      <g transform="translate(50, 60)">
        <text x="0" y="-10" fill="#38bdf8" fontSize="12" fontWeight="bold">Genetic Map (Centimorgans)</text>
        <line x1="50" y1="15" x2="500" y2="15" stroke="#38bdf8" strokeWidth="4" />
        {/* Locus A */}
        <circle cx="100" cy="15" r="7" fill="#0ea5e9" />
        <text x="100" y="38" fill="#e0f2fe" fontSize="11" textAnchor="middle">Gene A</text>
        
        {/* Locus B */}
        <circle cx={100 + distancePx} cy="15" r="7" fill="#0ea5e9" />
        <text x={100 + distancePx} y="38" fill="#e0f2fe" fontSize="11" textAnchor="middle">Gene B</text>

        {/* Distance Bracket */}
        <line x1="100" y1="-2" x2={100 + distancePx} y2="-2" stroke="#f59e0b" strokeWidth="2" />
        <text x={100 + distancePx / 2} y="-8" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">
          {rfPercentage.toFixed(1)} cM ({rfPercentage.toFixed(1)}% Recombination)
        </text>
      </g>

      {/* Physical Map (bp / STS markers) */}
      <g transform="translate(50, 140)">
        <text x="0" y="-10" fill="#4ade80" fontSize="12" fontWeight="bold">Physical Map (Sequence Tagged Sites - STS / bp)</text>
        <line x1="50" y1="15" x2="500" y2="15" stroke="#22c55e" strokeWidth="4" />
        
        {/* RFLP / STS Markers */}
        <rect x="100" y="5" width="6" height="20" fill="#86efac" />
        <text x="100" y="40" fill="#86efac" fontSize="9" textAnchor="middle">STS-1</text>

        <rect x={100 + distancePx} y="5" width="6" height="20" fill="#86efac" />
        <text x={100 + distancePx} y="40" fill="#86efac" fontSize="9" textAnchor="middle">STS-2</text>

        {/* Physical bp Calculation */}
        <text x="300" y="40" fill="#cbd5e1" fontSize="10">
          Approx Physical Length: ~{(rfPercentage * 1000).toLocaleString()} Kilobases (kb)
        </text>
      </g>
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C12_BiotechGenomeTechnologyCBSESim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'scenario' | 'discovery' | 'exploration' | 'challenges' | 'diagnostic' | 'misconceptions' | 'realworld' | 'summary'>('scenario');

  // Exploration Lab States
  const [currentLabStep, setCurrentLabStep] = useState<number>(0);

  // Lab 1: Subtilisin Mutagenesis State
  const [subtilisinMutation, setSubtilisinMutation] = useState<'Met222' | 'Ala222' | 'Leu222' | 'Cys222'>('Met222');
  const [h2o2Concentration, setH2o2Concentration] = useState<number>(50); // mM

  // Lab 2: CRISPR Editing State
  const [gRNASequence, setGRNASequence] = useState<string>('GTCGACCTGCAGGCATGCAA');
  const [crisprMode, setCrisprMode] = useState<'NHEJ' | 'HDR'>('NHEJ');
  const [isCleaving, setIsCleaving] = useState<boolean>(false);

  // Lab 3: Sequencing State
  const [seqPlatform, setSeqPlatform] = useState<'Sanger' | 'Illumina' | 'Nanopore'>('Sanger');
  const [chromatogramPos, setChromatogramPos] = useState<number>(5);

  // Lab 4: RFLP Mapping State
  const [restrictionEnzyme, setRestrictionEnzyme] = useState<'EcoRI' | 'HindIII' | 'BglII'>('EcoRI');
  const [genotype, setGenotype] = useState<'Homozygous-Wild' | 'Heterozygous' | 'Homozygous-Mutant'>('Heterozygous');

  // Lab 5: Transcriptomics RNA-Seq State
  const [sampleCondition, setSampleCondition] = useState<'Control' | 'CRISPR-Knockout' | 'Drug-Treated'>('Control');

  // Discovery / Prediction & Observation Answer States
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, strokeObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenges Runner State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [dragSortedItems, setDragSortedItems] = useState<string[]>([]);
  const [classifiedMap, setClassifiedMap] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIdx, setCurrentHintIdx] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);

  // Diagnostic Quiz State
  const [diagAnswers, setDiagAnswers] = useState<(number | null)[]>(new Array(DIAGNOSTIC_QUESTIONS.length).fill(null));
  const [diagSubmitted, setDiagSubmitted] = useState<boolean>(false);
  const [diagScore, setDiagScore] = useState<number>(0);

  // Audio/Visual Feedback States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT and SM2 Tracking States
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Auto Hint Inactivity Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !showHint) {
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak('Here is a hint to assist your analysis.');
      }
    }, 10000);
  }, [activeTab, showHint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, resetInactivityTimer]);

  // Initialize Drag Sort items when challenge changes
  useEffect(() => {
    const curr = CHALLENGES[currentChallengeIdx];
    if (curr && curr.type === 'drag-sort' && curr.sortItems) {
      setDragSortedItems([...curr.sortItems].sort(() => Math.random() - 0.5));
    }
    if (curr && curr.type === 'classification') {
      setClassifiedMap({});
    }
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    setShowHint(false);
    setCurrentHintIdx(0);
  }, [currentChallengeIdx]);

  // Voice narration on tab change
  useEffect(() => {
    if (activeTab === 'scenario') {
      speechManager.speak('Welcome to the Genome Technology Lab. Prepare to explore molecular genetics and biotechnology.');
    } else if (activeTab === 'discovery') {
      speechManager.speak('Discovery stage. Consider how protein engineering renders enzymes resistant to oxidation.');
    } else if (activeTab === 'exploration') {
      speechManager.speak('Exploration Labs open. You can interact with five advanced molecular protocols.');
    } else if (activeTab === 'challenges') {
      speechManager.speak('Challenge Mode active. Solve 24 rigorous biotechnological problems across three tiers.');
    }
  }, [activeTab]);

  // Subtilisin activity calculation for Lab 1
  const subtilisinMetrics = useMemo(() => {
    let residualActivity = 100;
    let kcatKm = 1000;
    
    if (subtilisinMutation === 'Met222') {
      residualActivity = Math.max(0, 100 - h2o2Concentration * 1.8);
      kcatKm = 1200 * (residualActivity / 100);
    } else if (subtilisinMutation === 'Ala222') {
      residualActivity = Math.max(85, 100 - h2o2Concentration * 0.05);
      kcatKm = 950;
    } else if (subtilisinMutation === 'Leu222') {
      residualActivity = Math.max(90, 100 - h2o2Concentration * 0.02);
      kcatKm = 600;
    } else if (subtilisinMutation === 'Cys222') {
      residualActivity = Math.max(10, 100 - h2o2Concentration * 1.5);
      kcatKm = 1100 * (residualActivity / 100);
    }

    return { residualActivity, kcatKm };
  }, [subtilisinMutation, h2o2Concentration]);

  // Handle Challenge Answer Submit
  const handleChallengeSubmit = () => {
    const curr = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (curr.type === 'multiple-choice') {
      isCorrect = selectedOption === curr.correctIndex;
    } else if (curr.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && curr.correctAnswer !== undefined) {
        const tol = curr.tolerance || 0.1;
        isCorrect = Math.abs(val - curr.correctAnswer) <= tol;
      }
    } else if (curr.type === 'drag-sort') {
      if (curr.correctSortOrder && curr.sortItems) {
        const currentOrder = dragSortedItems.map((item) => curr.sortItems!.indexOf(item));
        isCorrect = currentOrder.every((val, idx) => val === curr.correctSortOrder![idx]);
      }
    } else if (curr.type === 'classification') {
      if (curr.classificationItems) {
        isCorrect = curr.classificationItems.every(
          (item) => classifiedMap[item.item] === item.category
        );
      }
    }

    // Update BKT & SRS
    const nodeId = curr.nodeId;
    const currentBKT = bktStates[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Correct analysis! Outstanding work.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);
      setStreakCount((prev) => prev + 1);
      setChallengeScore((prev) => prev + (curr.difficulty === 'foundation' ? 10 : curr.difficulty === 'standard' ? 20 : 30));
      setChallengeFeedback({ isCorrect: true, message: 'Correct! ' + curr.explanation });
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the molecular mechanism.');
      setStreakCount(0);
      setChallengeFeedback({ isCorrect: false, message: 'Incorrect. ' + curr.explanation });
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have mastered the Genome Technology module.');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      recordGameScore('genome_tech_sim', challengeScore);
      if (onComplete) onComplete(challengeScore);
    }
  };

  // Diagnostic submit
  const handleDiagnosticSubmit = () => {
    let score = 0;
    diagAnswers.forEach((ans, idx) => {
      if (ans === DIAGNOSTIC_QUESTIONS[idx].correctIndex) {
        score += 1;
      }
    });
    setDiagScore(score);
    setDiagSubmitted(true);
    if (score >= 6) {
      audioManager.play('celebration');
    } else {
      audioManager.play('chime');
    }
  };

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    const scores = ALL_NODE_IDS.map((id) => masteryProb(bktStates[id] || createBKTState()));
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col gap-6">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Genome Technology Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* TOP HEADER & MASTERY BAR */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-purple-600/30 text-purple-400 border border-purple-500/40 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              ISC Class 12 Biotechnology
            </span>
            <span className="bg-gold-600/30 text-gold-400 border border-gold-500/40 text-xs font-semibold px-3 py-1 rounded-full">
              41 Learning Nodes
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Genome Technology & Genetic Engineering Laboratory
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Interactive exploration of sequencing, gene editing, structural genomics, and protein engineering.
          </p>
        </div>

        {/* Global Stats */}
        <div className="flex items-center gap-6 bg-slate-950/80 p-4 rounded-xl border border-slate-800 w-full lg:w-auto justify-between lg:justify-end">
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium uppercase">BKT Mastery</div>
            <div className="text-2xl font-black text-emerald-400">{overallMastery}%</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium uppercase">Lab Score</div>
            <div className="text-2xl font-black text-amber-400">{challengeScore} pts</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium uppercase">Streak</div>
            <div className="text-2xl font-black text-purple-400">{streakCount} 🔥</div>
          </div>
        </div>
      </header>

      {/* TAB NAVIGATION */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'scenario', label: '1. Lab Context' },
          { id: 'discovery', label: '2. Discovery' },
          { id: 'exploration', label: '3. Interactive Labs (5)' },
          { id: 'challenges', label: '4. Challenges (24)' },
          { id: 'diagnostic', label: '5. Diagnostics' },
          { id: 'misconceptions', label: '6. Misconceptions' },
          { id: 'realworld', label: '7. Real-World Task' },
          { id: 'summary', label: '8. Module Summary' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB 1: SCENARIO */}
      {activeTab === 'scenario' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-bold text-purple-300">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-base leading-relaxed">{SCENARIO.intro}</p>
            <div className="p-4 bg-purple-950/40 border border-purple-800/50 rounded-xl text-purple-200 text-sm leading-relaxed">
              <strong>Scenario Role:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <h3 className="font-semibold text-emerald-400">Protein Engineering</h3>
              <p className="text-xs text-slate-400">
                Redesigning Subtilisin enzymes via site-directed mutagenesis to endure high-bleach industrial washing.
              </p>
            </div>
            <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <h3 className="font-semibold text-purple-400">CRISPR Gene Editing</h3>
              <p className="text-xs text-slate-400">
                Targeting DNA with Cas9 and gRNA, guiding repair through error-prone NHEJ or precision HDR.
              </p>
            </div>
            <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <h3 className="font-semibold text-gold-400">High-Throughput Genomics</h3>
              <p className="text-xs text-slate-400">
                Decoding DNA via Sanger, Illumina bridge PCR, Oxford Nanopore, RFLP mapping, and RNA-seq.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioManager.play('swoop');
              setActiveTab('discovery');
            }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg transition-all"
          >
            Proceed to Discovery Stage →
          </button>
        </section>
      )}

      {/* TAB 2: DISCOVERY */}
      {activeTab === 'discovery' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">Initial Concept Probe</span>
            <h2 className="text-2xl font-bold text-white">Discovery Question</h2>
          </div>

          <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <p className="text-lg font-medium text-slate-200">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setDiscoverySelected(idx);
                  }}
                  className={`p-4 rounded-xl text-left font-medium text-sm transition-all border ${
                    discoverySelected === idx
                      ? 'bg-purple-900/50 border-purple-500 text-purple-100'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            <button
              disabled={discoverySelected === null}
              onClick={() => {
                audioManager.play('chime');
                setDiscoverySubmitted(true);
              }}
              className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-semibold rounded-xl transition-all"
            >
              Verify Hypothesis
            </button>

            {discoverySubmitted && (
              <div
                className={`p-4 rounded-xl border ${
                  discoverySelected === DISCOVERY_QUESTION.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-600 text-amber-200'
                }`}
              >
                <p className="font-semibold text-base mb-1">
                  {discoverySelected === DISCOVERY_QUESTION.correctIndex
                    ? 'Correct Discovery!'
                    : 'Surprising Chemistry Fact!'}
                </p>
                <p className="text-sm leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          {/* PREDICTION QUESTIONS SECTION */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xl font-bold text-purple-300">Prediction Hypotheses</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {PREDICTION_QUESTIONS.map((pq, idx) => (
                <div key={idx} className="p-5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                  <p className="text-sm font-semibold text-slate-200">{pq.question}</p>
                  <div className="space-y-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          const newAns = [...predictionAnswers];
                          newAns[idx] = oIdx;
                          setPredictionAnswers(newAns);
                        }}
                        className={`w-full p-3 rounded-lg text-left text-xs transition-all border ${
                          predictionAnswers[idx] === oIdx
                            ? 'bg-gold-900/50 border-gold-500 text-gold-100'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={predictionAnswers[idx] === null}
                    onClick={() => {
                      audioManager.play('pop');
                      const newSub = [...predictionSubmitted];
                      newSub[idx] = true;
                      setPredictionSubmitted(newSub);
                    }}
                    className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    Lock Prediction
                  </button>

                  {predictionSubmitted[idx] && (
                    <div className="p-3 bg-slate-900 border border-gold-800/40 rounded-lg text-xs text-gold-300">
                      <strong>Verification Guide:</strong> {pq.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: EXPLORATION LABS (5 INTERACTIVE LABS) */}
      {activeTab === 'exploration' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          {/* LAB SELECTOR TABS */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {EXPLORATION_STEPS.map((lab, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentLabStep(idx);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentLabStep === idx
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {lab.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-purple-300">{EXPLORATION_STEPS[currentLabStep].title}</h2>
            <p className="text-sm text-slate-300">{EXPLORATION_STEPS[currentLabStep].instruction}</p>
          </div>

          {/* LAB 1: SUBTILISIN MUTAGENESIS */}
          {currentLabStep === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-4">
                <SubtilisinProteinEngSVG />
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p><strong>Subtilisin Catalytic Triad:</strong> Ser221 - His64 - Asp32</p>
                  <p><strong>Bleach Oxidation Site:</strong> Residue 222 (adjacent to Ser221 catalytic nucleophile).</p>
                </div>
              </div>

              <div className="space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-2">Select Residue 222 Substitution:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'Met222', label: 'Met222 (Wild Type)' },
                        { id: 'Ala222', label: 'Ala222 (Mutant)' },
                        { id: 'Leu222', label: 'Leu222 (Mutant)' },
                        { id: 'Cys222', label: 'Cys222 (Mutant)' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            audioManager.play('pop');
                            setSubtilisinMutation(item.id as any);
                          }}
                          className={`p-2.5 rounded-lg text-xs font-semibold border text-left transition-all ${
                            subtilisinMutation === item.id
                              ? 'bg-purple-600 border-purple-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Hydrogen Peroxide / Bleach Conc:</span>
                      <span className="font-bold text-purple-300">{h2o2Concentration} mM</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={h2o2Concentration}
                      onChange={(e) => setH2o2Concentration(Number(e.target.value))}
                      className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-5 bg-slate-900 rounded-xl border border-purple-900/40 space-y-3">
                  <h4 className="font-bold text-sm text-purple-300">Enzyme Kinetic Assay Results</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-400">Residual Activity</div>
                      <div className="text-xl font-extrabold text-emerald-400">
                        {subtilisinMetrics.residualActivity.toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-400">kcat / Km (s⁻¹ M⁻¹)</div>
                      <div className="text-xl font-extrabold text-gold-400">
                        {subtilisinMetrics.kcatKm.toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 2: CRISPR-CAS9 EDITING LAB */}
          {currentLabStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-4">
                <CrisprCas9DiagramSVG activeMode={crisprMode} cleaving={isCleaving} />
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <p><strong>Target DNA Locus:</strong> Human HBB Gene (Sickle Cell Mutation Site)</p>
                  <p><strong>PAM Recognition:</strong> 5'-TGG-3' motif detected downstream of nucleotide 20.</p>
                </div>
              </div>

              <div className="space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-1">20-nt Spacer RNA Sequence:</label>
                    <input
                      type="text"
                      value={gRNASequence}
                      onChange={(e) => setGRNASequence(e.target.value.toUpperCase())}
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-purple-300 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-2">Repair Pathway Selection:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          audioManager.play('tap');
                          setCrisprMode('NHEJ');
                        }}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          crisprMode === 'NHEJ'
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div>NHEJ (Non-Homologous)</div>
                        <div className="text-[10px] font-normal text-slate-400 mt-1">Random Indel Frameshift Knock-out</div>
                      </button>

                      <button
                        onClick={() => {
                          audioManager.play('tap');
                          setCrisprMode('HDR');
                        }}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          crisprMode === 'HDR'
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div>HDR (Homology Repair)</div>
                        <div className="text-[10px] font-normal text-slate-400 mt-1">ssODN Donor Precision Knock-in</div>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    audioManager.play('whoosh');
                    setIsCleaving(true);
                    setTimeout(() => setIsCleaving(false), 2500);
                  }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Trigger Cas9 Nuclease Cleavage
                </button>
              </div>
            </div>
          )}

          {/* LAB 3: DNA SEQUENCING TECHNOLOGY LAB */}
          {currentLabStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-4">
                <SangerChromatogramSVG highlightPos={chromatogramPos} />
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Capillary Read Scan Position:</label>
                  <input
                    type="range"
                    min="1"
                    max="18"
                    value={chromatogramPos}
                    onChange={(e) => setChromatogramPos(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <label className="text-xs text-slate-400 font-semibold block">Select Sequencing Platform Architecture:</label>
                  <div className="space-y-2">
                    {[
                      { id: 'Sanger', name: '1st Gen: Sanger Capillary Sequencing', desc: 'Single read ~900 bp, ddNTP chain terminators, high accuracy (99.99%).' },
                      { id: 'Illumina', name: '2nd Gen: Illumina Massively Parallel', desc: 'Bridge PCR flow cell, billions of 150 bp paired-end reads.' },
                      { id: 'Nanopore', name: '3rd Gen: Oxford Nanopore Single Molecule', desc: 'Ultra-long reads (>100 kb), real-time ionic current blockade sensing.' },
                    ].map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => {
                          audioManager.play('pop');
                          setSeqPlatform(platform.id as any);
                        }}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          seqPlatform === platform.id
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{platform.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{platform.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p><strong>Selected Tech:</strong> {seqPlatform}</p>
                  <p><strong>Primary Application:</strong> {seqPlatform === 'Sanger' ? 'Single clone validation & variant confirmation' : seqPlatform === 'Illumina' ? 'Whole Genome Sequencing & Exome Panels' : 'Structural variation & complex repeat assembly'}</p>
                </div>
              </div>
            </div>
          )}

          {/* LAB 4: RFLP & SOUTHERN HYBRIDIZATION */}
          {currentLabStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-4">
                <PhysicalVsGeneticMapSVG rfPercentage={15.0} />
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <p><strong>Restriction Fragment Length Polymorphism (RFLP):</strong> Genetic variation alters restriction enzyme recognition sites, producing distinct band lengths.</p>
                </div>
              </div>

              <div className="space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-1">Restriction Enzyme Digest:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['EcoRI', 'HindIII', 'BglII'].map((e) => (
                        <button
                          key={e}
                          onClick={() => setRestrictionEnzyme(e as any)}
                          className={`p-2 rounded-lg text-xs font-bold border transition-all ${
                            restrictionEnzyme === e
                              ? 'bg-gold-600 border-gold-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-1">Patient Genotype Sample:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Homozygous-Wild', 'Heterozygous', 'Homozygous-Mutant'].map((gt) => (
                        <button
                          key={gt}
                          onClick={() => setGenotype(gt as any)}
                          className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                            genotype === gt
                              ? 'bg-purple-600 border-purple-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {gt.split('-')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                  <div className="text-xs text-slate-400">Southern Blot Band Profile ({restrictionEnzyme})</div>
                  <div className="flex justify-center items-center gap-4 py-3 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="text-xs font-mono text-emerald-400">
                      {genotype === 'Homozygous-Wild' && 'Bands: 4.5 kb, 2.1 kb'}
                      {genotype === 'Heterozygous' && 'Bands: 6.6 kb, 4.5 kb, 2.1 kb'}
                      {genotype === 'Homozygous-Mutant' && 'Bands: 6.6 kb (Uncut Site)'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 5: TRANSCRIPTOMICS & CHIP-SEQ */}
          {currentLabStep === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-purple-300">Differential RNA-Seq Expression Heatmap</h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div className="p-2 bg-emerald-900/60 border border-emerald-500 rounded text-emerald-200">Gene A: +3.2 fold</div>
                    <div className="p-2 bg-red-900/60 border border-red-500 rounded text-red-200">Gene B: -2.8 fold</div>
                    <div className="p-2 bg-slate-800 rounded text-slate-300">Gene C: 1.0 fold</div>
                    <div className="p-2 bg-emerald-900/60 border border-emerald-500 rounded text-emerald-200">Gene D: +4.5 fold</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <p><strong>ChIP-Seq Transcription Factor Mapping:</strong> Identifies exact genome-wide promoter binding loci of master regulatory proteins.</p>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2">Experimental Condition:</label>
                  <div className="space-y-2">
                    {['Control', 'CRISPR-Knockout', 'Drug-Treated'].map((cond) => (
                      <button
                        key={cond}
                        onClick={() => setSampleCondition(cond as any)}
                        className={`w-full p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          sampleCondition === cond
                            ? 'bg-purple-600 border-purple-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {cond} Profile
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <p><strong>Active Condition:</strong> {sampleCondition}</p>
                  <p><strong>Transcriptome Status:</strong> {sampleCondition === 'CRISPR-Knockout' ? 'Target gene mRNA reduced by 99.4% (NHEJ frameshift).' : 'Baseline homeostatic transcription.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* OBSERVATION QUESTIONS SECTION */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xl font-bold text-purple-300">Lab Observations & Insights</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="p-5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                  <p className="text-sm font-semibold text-slate-200">{oq.question}</p>
                  <div className="space-y-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          const newAns = [...observationAnswers];
                          newAns[idx] = oIdx;
                          setObservationAnswers(newAns);
                        }}
                        className={`w-full p-3 rounded-lg text-left text-xs transition-all border ${
                          observationAnswers[idx] === oIdx
                            ? 'bg-purple-900/50 border-purple-500 text-purple-100'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={observationAnswers[idx] === null}
                    onClick={() => {
                      audioManager.play('pop');
                      const newSub = [...observationSubmitted];
                      newSub[idx] = true;
                      strokeObservationSubmitted(newSub);
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    Confirm Observation
                  </button>

                  {observationSubmitted[idx] && (
                    <div
                      className={`p-3 rounded-lg text-xs border ${
                        observationAnswers[idx] === oq.correctIndex
                          ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                          : 'bg-red-950/40 border-red-600 text-red-200'
                      }`}
                    >
                      {observationAnswers[idx] === oq.correctIndex
                        ? 'Correct Observation!'
                        : 'Re-examine the interactive model above.'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: CHALLENGES (24 PROBLEMS) */}
      {activeTab === 'challenges' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          {/* Challenge Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {CHALLENGES[currentChallengeIdx].difficulty.toUpperCase()} TIER: {CHALLENGES[currentChallengeIdx].competencyLevel}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                Node: {CHALLENGES[currentChallengeIdx].nodeId}
              </span>
            </div>
          </div>

          {/* Hint Bubble Component */}
          <HintBubble
            show={showHint}
            text={CHALLENGES[currentChallengeIdx].hints[currentHintIdx]}
          />

          {/* Challenge Body */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-5">
            <p className="text-base font-medium text-slate-200 leading-relaxed">
              {CHALLENGES[currentChallengeIdx].question}
            </p>

            {/* Multiple Choice */}
            {CHALLENGES[currentChallengeIdx].type === 'multiple-choice' && (
              <div className="grid grid-cols-1 gap-3">
                {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setSelectedOption(idx);
                    }}
                    className={`p-4 rounded-xl text-left font-medium text-sm transition-all border ${
                      selectedOption === idx
                        ? 'bg-purple-900/50 border-purple-500 text-purple-100'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Numeric Input */}
            {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
              <div className="space-y-3 max-w-xs">
                <label className="text-xs text-slate-400 font-semibold block">Enter Calculated Value:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(e.target.value)}
                    placeholder="0"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-base text-purple-300 outline-none focus:border-purple-500"
                  />
                  <span className="text-sm text-slate-400 font-semibold">
                    {CHALLENGES[currentChallengeIdx].unit}
                  </span>
                </div>
              </div>
            )}

            {/* Drag Sort */}
            {CHALLENGES[currentChallengeIdx].type === 'drag-sort' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Reorder items into correct chronological sequence:</p>
                <div className="space-y-2">
                  {dragSortedItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200"
                    >
                      <span className="font-bold text-purple-400 mr-2">{idx + 1}.</span>
                      <span className="flex-1">{item}</span>
                      <div className="flex gap-1 ml-2">
                        <button
                          disabled={idx === 0}
                          onClick={() => {
                            const newArr = [...dragSortedItems];
                            const temp = newArr[idx];
                            newArr[idx] = newArr[idx - 1];
                            newArr[idx - 1] = temp;
                            setDragSortedItems(newArr);
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300"
                        >
                          ▲
                        </button>
                        <button
                          disabled={idx === dragSortedItems.length - 1}
                          onClick={() => {
                            const newArr = [...dragSortedItems];
                            const temp = newArr[idx];
                            newArr[idx] = newArr[idx + 1];
                            newArr[idx + 1] = temp;
                            setDragSortedItems(newArr);
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-300"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classification */}
            {CHALLENGES[currentChallengeIdx].type === 'classification' && (
              <div className="space-y-4">
                {CHALLENGES[currentChallengeIdx].classificationItems?.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <span className="text-xs font-semibold text-slate-200">{item.item}</span>
                    <div className="flex gap-2">
                      {CHALLENGES[currentChallengeIdx].categories?.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setClassifiedMap((prev) => ({ ...prev, [item.item]: cat }));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            classifiedMap[item.item] === cat
                              ? 'bg-purple-600 border-purple-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint(true);
                  setCurrentHintIdx((prev) => (prev + 1) % 3);
                  audioManager.play('hint');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-xl transition-all"
              >
                💡 Hint ({currentHintIdx + 1}/3)
              </button>

              <div className="flex items-center gap-3">
                {!challengeFeedback ? (
                  <button
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all shadow-md"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-md"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>
            </div>

            {/* Feedback Display */}
            {challengeFeedback && (
              <div
                className={`p-4 rounded-xl border ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                    : 'bg-red-950/40 border-red-600 text-red-200'
                }`}
              >
                <p className="text-sm font-medium leading-relaxed">{challengeFeedback.message}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 5: DIAGNOSTICS */}
      {activeTab === 'diagnostic' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Module Diagnostic Evaluation</h2>
            <p className="text-sm text-slate-400">
              Test your comprehensive understanding across key ISC Genome Technology concepts.
            </p>
          </div>

          <div className="space-y-6">
            {DIAGNOSTIC_QUESTIONS.map((dq, qIdx) => (
              <div key={dq.id} className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                <p className="text-sm font-semibold text-slate-200">
                  {qIdx + 1}. {dq.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dq.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      disabled={diagSubmitted}
                      onClick={() => {
                        audioManager.play('tap');
                        const newAns = [...diagAnswers];
                        newAns[qIdx] = oIdx;
                        setDiagAnswers(newAns);
                      }}
                      className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                        diagAnswers[qIdx] === oIdx
                          ? 'bg-purple-900/50 border-purple-500 text-purple-100'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {diagSubmitted && (
                  <div
                    className={`p-3 rounded-lg text-xs border ${
                      diagAnswers[qIdx] === dq.correctIndex
                        ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                        : 'bg-red-950/40 border-red-600 text-red-200'
                    }`}
                  >
                    <strong>Explanation:</strong> {dq.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!diagSubmitted ? (
            <button
              onClick={handleDiagnosticSubmit}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Submit Diagnostic Evaluation
            </button>
          ) : (
            <div className="p-6 bg-purple-950/50 border border-purple-600 rounded-2xl text-center space-y-2">
              <h3 className="text-2xl font-extrabold text-white">
                Diagnostic Score: {diagScore} / {DIAGNOSTIC_QUESTIONS.length}
              </h3>
              <p className="text-sm text-purple-200">
                {diagScore >= 6
                  ? 'Excellent mastery! You demonstrate expert command over molecular genome technology.'
                  : 'Review the interactive labs and misconception corrections below to reinforce key concepts.'}
              </p>
            </div>
          )}
        </section>
      )}

      {/* TAB 6: MISCONCEPTIONS */}
      {activeTab === 'misconceptions' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Common Biotechnological Misconceptions</h2>
            <p className="text-sm text-slate-400">
              Clarifying critical conceptual pitfalls in DNA sequencing, mapping, and CRISPR engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MISCONCEPTIONS.map((m) => (
              <div key={m.id} className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-1 rounded-full">
                    {m.title}
                  </span>
                  <div className="p-3 bg-red-950/30 border border-red-800/40 rounded-lg text-xs text-red-200">
                    <strong>Common Misconception:</strong> {m.misconception}
                  </div>
                  <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-xs text-emerald-200">
                    <strong>Scientific Correction:</strong> {m.correction}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                  Node ID: {m.nodeId}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 7: REAL WORLD ACTIVITY */}
      {activeTab === 'realworld' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">Industrial & Clinical Application</span>
            <h2 className="text-2xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
          </div>

          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-purple-300">Standard Operating Protocol (SOP)</h3>
            <div className="space-y-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 8: MODULE SUMMARY */}
      {activeTab === 'summary' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-purple-600/30 border border-purple-500 rounded-full flex items-center justify-center mx-auto text-3xl">
              🧬
            </div>
            <h2 className="text-3xl font-extrabold text-white">Genome Technology Module Complete!</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              You have successfully engaged with all 41 learning nodes across structural, functional, computational genomics, DNA sequencing platforms, and CRISPR-Cas9 genome engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl text-center space-y-2">
              <div className="text-xs text-slate-400 font-medium">BKT Knowledge State</div>
              <div className="text-3xl font-black text-emerald-400">{overallMastery}%</div>
              <div className="text-[11px] text-slate-400">Bayesian Knowledge Mastery</div>
            </div>
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl text-center space-y-2">
              <div className="text-xs text-slate-400 font-medium">Lab Points Earned</div>
              <div className="text-3xl font-black text-amber-400">{challengeScore} pts</div>
              <div className="text-[11px] text-slate-400">Across 24 Problem Tiers</div>
            </div>
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl text-center space-y-2">
              <div className="text-xs text-slate-400 font-medium">Nodes Covered</div>
              <div className="text-3xl font-black text-purple-400">41 / 41</div>
              <div className="text-[11px] text-slate-400">Complete ISC Coverage</div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                audioManager.play('celebration');
                if (onComplete) onComplete(challengeScore);
              }}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Finalize & Record Learning Completion
            </button>
          </div>
        </section>
      )}

      {/* FOOTER NODE ID ACKNOWLEDGEMENT */}
      <footer className="text-center text-[11px] text-slate-400 py-4 border-t border-slate-900">
        ISC Biotechnology Class 12 • Genome Technology Nodes (c12_bt_cbse_314 to 354) Integrated
      </footer>
    </div>
  );
}