'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (CISCE Class 12 Biotechnology Syllabus) ───
const NODE_C12_BIOTECH_001 = 'c12_biotech_001';
const NODE_C12_BIOTECH_002 = 'c12_biotech_002';
const NODE_C12_BIOTECH_003 = 'c12_biotech_003';
const NODE_C12_BIOTECH_004 = 'c12_biotech_004';
const NODE_C12_BIOTECH_005 = 'c12_biotech_005';
const NODE_C12_BIOTECH_006 = 'c12_biotech_006';
const NODE_C12_BIOTECH_007 = 'c12_biotech_007';
const NODE_C12_BIOTECH_008 = 'c12_biotech_008';
const NODE_C12_BIOTECH_009 = 'c12_biotech_009';
const NODE_C12_BIOTECH_010 = 'c12_biotech_010';

const ALL_NODE_IDS = [
  NODE_C12_BIOTECH_001,
  NODE_C12_BIOTECH_002,
  NODE_C12_BIOTECH_003,
  NODE_C12_BIOTECH_004,
  NODE_C12_BIOTECH_005,
  NODE_C12_BIOTECH_006,
  NODE_C12_BIOTECH_007,
  NODE_C12_BIOTECH_008,
  NODE_C12_BIOTECH_009,
  NODE_C12_BIOTECH_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Synthetic Genome Synthesis Lab',
  intro: 'At the premier Centre for Cellular and Molecular Biology (CCMB) in Hyderabad, researchers are decoding an uncharacterised extremophilic bacterial strain isolated from the thermal springs of Taptapani in Odisha. As the lead molecular biotechnologist, you must build, analyse, proofread, transcribe, and translate its nucleic acids from monomer nucleotides up to functional proteins.',
  context: 'Mastering nucleotide chemistry, Watson-Crick double helix geometry, UV spectrophotometry, replication fidelity, transcription split-genes, and the universal genetic code is essential to synthesise and express this gene.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a fresh DNA extraction from Taptapani thermophiles, biochemical analysis shows exactly 34% Guanine (G). Predict the percentage of Thymine (T) in this double-stranded DNA sample.',
  options: [
    '34% — because all four nitrogenous bases exist in equal 25% quarters or match 1:1',
    '16% — because G=C (34%+34%=68%), leaving 32% for A+T, thus T = 16%',
    '68% — because purines must double pyrimidines in thermophilic organisms',
    '32% — because Thymine balances Guanine directly across the purine-pyrimidine axis'
  ],
  correctIndex: 1,
  hintAfter: 'Chargaff\'s equivalence rule dictates [A] = [T] and [G] = [C]! Let us explore the molecular foundations to see why.',
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
  bloomLevel?: string;
}

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Classify - c12_biotech_001
  {
    id: 'ch_nt_001',
    nodeId: NODE_C12_BIOTECH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly describes the chemical composition of a nucleoside versus a nucleotide?',
    options: [
      'Nucleoside = Nitrogenous Base + Pentose Sugar; Nucleotide = Nucleoside + Phosphate Group',
      'Nucleoside = Pentose Sugar + Phosphate Group; Nucleotide = Nucleoside + Nitrogenous Base',
      'Nucleoside = Nitrogenous Base + Phosphate; Nucleotide = Base + Sugar + Histone',
      'Nucleoside is another name for Adenosine Triphosphate (ATP)'
    ],
    correctIndex: 0,
    explanation: 'A nucleoside consists solely of a nitrogenous base attached via an N-glycosidic bond to a pentose sugar (ribose or deoxyribose). Adding one or more phosphate groups at the 5\'-carbon transforms it into a nucleotide (e.g., AMP, dGTP).',
    hints: [
      'Think of a nucleoside as a two-piece unit and a nucleotide as a three-piece unit.',
      'The "tide" in nucleotide holds on to the phosphate group (Sugar + Base + Phosphate).',
      'A nucleoside lacks a phosphate group completely; adding phosphate yields a nucleotide.'
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag-label - c12_biotech_001
  {
    id: 'ch_nt_002',
    nodeId: NODE_C12_BIOTECH_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each chemical component to its correct position on the general nucleotide blueprint.',
    dragItems: [
      { label: 'Phosphate Group (5\'-C)', targetId: 'part_p' },
      { label: 'Pentose Sugar Ring (1\'-5\')', targetId: 'part_s' },
      { label: 'Nitrogenous Base (1\'-C)', targetId: 'part_b' },
      { label: '3\'-OH Hydroxyl Group', targetId: 'part_oh' }
    ],
    correctMapping: {
      part_p: 'Phosphate Group (5\'-C)',
      part_s: 'Pentose Sugar Ring (1\'-5\')',
      part_b: 'Nitrogenous Base (1\'-C)',
      part_oh: '3\'-OH Hydroxyl Group'
    },
    explanation: 'In a canonical nucleotide, the pentose sugar forms the central scaffold. The nitrogenous base attaches to carbon 1\', the phosphate esterifies to carbon 5\', and the reactive 3\'-OH group provides the nucleophile for phosphodiester linkage.',
    hints: [
      'Carbon 1\' always anchors the purine or pyrimidine base.',
      'Carbon 5\' extends outside the furanose ring to bind phosphate.',
      'Carbon 3\' carries the free -OH group essential for chain elongation.'
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Distinguish - c12_biotech_002
  {
    id: 'ch_nt_003',
    nodeId: NODE_C12_BIOTECH_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Watson-Crick B-DNA double helix model, how many hydrogen bonds form between Adenine-Thymine and Guanine-Cytosine base pairs respectively?',
    options: [
      'A-T has 2 hydrogen bonds; G-C has 3 hydrogen bonds',
      'A-T has 3 hydrogen bonds; G-C has 2 hydrogen bonds',
      'Both A-T and G-C share exactly 2 covalent disulfide bonds',
      'A-T has 1 hydrogen bond; G-C has 4 hydrogen bonds'
    ],
    correctIndex: 0,
    explanation: 'Adenine pairs with Thymine via 2 hydrogen bonds, while Guanine pairs with Cytosine via 3 hydrogen bonds. Because G-C pairs have 3 hydrogen bonds, G-C rich DNA requires higher thermal energy (higher melting temperature Tm) to denature.',
    hints: [
      'G and C have more hydrogen bond donor/acceptor atoms than A and T.',
      'G-C pairing is tighter with 3 bonds; A-T has only 2 bonds.',
      'Look for the option stating A-T has 2 and G-C has 3.'
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Match - c12_biotech_003
  {
    id: 'ch_nt_004',
    nodeId: NODE_C12_BIOTECH_003,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the specific tRNA structural domain on the clover-leaf model with its primary function.',
    options: [
      'Acceptor Stem (3\' CCA end) binds amino acid; Anticodon Loop recognizes mRNA codon',
      'Anticodon loop binds amino acid; Acceptor Stem forms ribosomal peptide bonds',
      'D-loop attaches amino acid; T-loop reads codons in reverse',
      'Variable loop is the primary catalytic ribozyme in the nucleus'
    ],
    correctIndex: 0,
    explanation: 'In the clover leaf model of tRNA, the 3\' CCA overhang of the acceptor stem covalently binds the cognate amino acid (charged by aminoacyl-tRNA synthetase), whereas the anticodon loop displays the triplet complementary to the mRNA codon.',
    hints: [
      'The 3\' end of tRNA carries the amino acid cargo.',
      'The anticodon loop reads the three-letter codon on messenger RNA.',
      'The cloverleaf is 2D secondary structure; 3D tertiary is inverted L-shape.'
    ],
    misconceptionIndex: 0,
  },
  // 5. Foundation - Classify - c12_biotech_007
  {
    id: 'ch_nt_005',
    nodeId: NODE_C12_BIOTECH_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Francis Crick formulated the Central Dogma of Molecular Biology. What is the standard flow of genetic information in cellular systems?',
    options: [
      'DNA → RNA → Protein (Replication → Transcription → Translation)',
      'Protein → RNA → DNA (Translation → Transcription → Reverse)',
      'RNA → DNA → Protein (always initiating from ribosomes)',
      'DNA → Protein → RNA (Direct translation followed by reverse transcription)'
    ],
    correctIndex: 0,
    explanation: 'The standard cellular flow is DNA makes DNA (Replication), DNA directs RNA synthesis (Transcription), and mRNA directs amino acid polypeptide synthesis (Translation).',
    hints: [
      'DNA is the master archival blueprint in the nucleus.',
      'mRNA is the mobile working transcript sent to ribosomes.',
      'Proteins are the final functional gene products.'
    ],
    misconceptionIndex: 2,
  },
  // 6. Foundation - Drag-sort - c12_biotech_004
  {
    id: 'ch_nt_006',
    nodeId: NODE_C12_BIOTECH_004,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequential steps of bacterial DNA replication fork progression into the correct chronological order.',
    sortItems: [
      'Topoisomerase relieves supercoiling tension ahead of replication fork',
      'DNA Helicase unwinds double helix & SSBPs stabilize single strands',
      'RNA Primase synthesises a short complementary RNA primer',
      'DNA Polymerase III elongates new strand 5\' to 3\' adding dNTPs',
      'DNA Polymerase I removes RNA primers; DNA Ligase seals the nicks'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Replication initiation begins with topoisomerase relieving torsional strain, helicase separating strands, primase creating an initial 3\'-OH primer, Pol III synthesising DNA, and Pol I + Ligase replacing primers and sealing phosphodiester nicks.',
    hints: [
      'Tension must be relieved before helicase unwinds the double helix.',
      'DNA Polymerase cannot start de novo without a 3\'-OH from an RNA primer.',
      'Ligase acts at the very end to seal Okazaki fragments.'
    ],
  },
  // 7. Foundation - Classify - c12_biotech_010
  {
    id: 'ch_nt_007',
    nodeId: NODE_C12_BIOTECH_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the universal initiation (start) codon and the three termination (stop / nonsense) codons on mRNA.',
    options: [
      'Start: AUG (Methionine); Stop: UAA, UAG, UGA',
      'Start: UAA; Stop: AUG, GUG, UAC',
      'Start: AUG; Stop: UUU, UUC, UUA',
      'Start: GUG; Stop: AAA, CCC, GGG'
    ],
    correctIndex: 0,
    explanation: 'AUG functions as the universal start codon (coding for Methionine in eukaryotes / N-formylmethionine in prokaryotes). UAA (ochre), UAG (amber), and UGA (opal) are nonsense codons that recruit release factors to terminate translation.',
    hints: [
      'AUG has a dual role: start signal + codes for Met.',
      'There are exactly three stop codons, all beginning with Uracil (U).',
      'UAA, UAG, and UGA do not code for any aminoacyl-tRNA.'
    ],
    misconceptionIndex: 1,
  },
  // 8. Standard - Numeric - c12_biotech_002
  {
    id: 'ch_nt_008',
    nodeId: NODE_C12_BIOTECH_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A double-stranded DNA segment from Bacillus thuringiensis contains 2400 total base pairs (4800 nucleotides). If 720 of the bases are Cytosine, calculate the total number of Adenine bases in this DNA segment.',
    correctAnswer: 1680,
    tolerance: 0,
    unit: 'Adenine bases',
    explanation: 'Total nucleotides = 4800. Cytosine (C) = 720, so Guanine (G) = 720 (G+C = 1440). Remaining nucleotides = 4800 - 1440 = 3360 for A + T. Since [A] = [T], Adenine = 3360 / 2 = 1680 bases.',
    hints: [
      'By Chargaff\'s rule, number of Guanines equals number of Cytosines (720 G).',
      'Subtract total (G + C) from total nucleotides (4800) to find total (A + T).',
      'Divide the remaining pool equally between Adenine and Thymine.'
    ],
  },
  // 9. Standard - Application - c12_biotech_006
  {
    id: 'ch_nt_009',
    nodeId: NODE_C12_BIOTECH_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A biotechnology student at St. Xavier\'s College, Kolkata isolates genomic DNA and measures optical densities on a UV spectrophotometer: A260 = 0.90 and A280 = 0.50. Calculate the purity ratio (A260/A280) and assess the sample quality.',
    options: [
      'Ratio = 1.80; Pure DNA preparation ready for PCR and downstream cloning',
      'Ratio = 0.55; Heavily contaminated with excessive aromatic proteins',
      'Ratio = 2.00; Pure RNA with no DNA present',
      'Ratio = 1.40; Contaminated with residual phenol and alcohol'
    ],
    correctIndex: 0,
    explanation: 'A260/A280 = 0.90 / 0.50 = 1.80. A ratio of ~1.8 represents pure double-stranded DNA. Ratios significantly below 1.8 indicate protein/phenol contamination (since aromatic amino acids absorb at 280 nm), while ~2.0 indicates pure RNA.',
    hints: [
      'Calculate 0.90 divided by 0.50.',
      'Check if 1.80 matches the benchmark standard for pure dsDNA.',
      'Pure DNA has a ratio of 1.8; pure RNA has 2.0.'
    ],
    misconceptionIndex: 0,
  },
  // 10. Standard - Numeric - c12_biotech_006
  {
    id: 'ch_nt_010',
    nodeId: NODE_C12_BIOTECH_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the standard extinction coefficient where 1.0 A260 unit corresponds to 50 μg/mL of double-stranded DNA (1 cm path length), calculate the DNA concentration (in μg/mL) of a purified sample having an A260 reading of 0.46.',
    correctAnswer: 23,
    tolerance: 0.5,
    unit: 'μg/mL',
    explanation: 'DNA concentration = Absorbance (A260) × 50 μg/mL = 0.46 × 50 = 23.0 μg/mL.',
    hints: [
      'Apply the Beer-Lambert conversion: Concentration = A260 × 50.',
      'Multiply 0.46 by 50.',
      '0.46 × 50 = 23 μg/mL.'
    ],
  },
  // 11. Standard - Analysis - c12_biotech_002
  {
    id: 'ch_nt_011',
    nodeId: NODE_C12_BIOTECH_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the Hershey-Chase blender experiment (1952), why did radioactive 32P enter the E. coli host pellet while 35S remained in the supernatant fluid?',
    options: [
      '32P labels DNA (phosphate backbone) which enters the cell, while 35S labels viral capsid proteins (cysteine/methionine) which stay outside',
      '35S labels DNA sugars while 32P labels viral coat lipids',
      'E. coli cells actively ingest sulfur and repel phosphorus ions',
      '32P was destroyed by agitation in the Waring blender'
    ],
    correctIndex: 0,
    explanation: 'Phosphorus is present in nucleic acid backbones but absent in viral proteins. Sulfur is present in disulfide-containing amino acids (Met, Cys) in proteins but absent in DNA. Finding 32P in infected cells proved DNA is the hereditary genetic material.',
    hints: [
      'DNA has a sugar-phosphate backbone; proteins contain sulfur amino acids.',
      'Phage T2 injects only its genetic material into the bacterium.',
      'Supernatant contained empty viral ghost coats labelled with 35S.'
    ],
    misconceptionIndex: 1,
  },
  // 12. Standard - Analysis - c12_biotech_004
  {
    id: 'ch_nt_012',
    nodeId: NODE_C12_BIOTECH_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the Meselson-Stahl experiment, E. coli grown in 15N was transferred to 14N medium. What band distribution was observed in CsCl density gradient centrifugation after exactly ONE generation and TWO generations?',
    options: [
      'Gen 1: 100% intermediate hybrid (15N-14N); Gen 2: 50% hybrid (15N-14N) + 50% light (14N-14N)',
      'Gen 1: 50% heavy + 50% light; Gen 2: 25% heavy + 75% light',
      'Gen 1: 100% light; Gen 2: 100% intermediate',
      'Gen 1: 100% heavy; Gen 2: 100% light'
    ],
    correctIndex: 0,
    explanation: 'Semi-conservative replication preserves each parent strand as a template. After Gen 1, all duplexes have one 15N and one 14N strand (intermediate band). After Gen 2, two duplexes remain hybrid (15N-14N) and two are fully light (14N-14N), yielding 1:1 intermediate to light bands.',
    hints: [
      'Conservative model would give heavy + light bands in Gen 1; semi-conservative gives 100% hybrid.',
      'In Gen 2, the hybrid strands split and pair with fresh 14N dNTPs.',
      'Gen 2 produces equal amounts of 15N-14N and 14N-14N DNA.'
    ],
    misconceptionIndex: 0,
  },
  // 13. Standard - Distinguish - c12_biotech_005
  {
    id: 'ch_nt_013',
    nodeId: NODE_C12_BIOTECH_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do the 3\'→5\' exonuclease and 5\'→3\' exonuclease activities of bacterial DNA Polymerase I differ in physiological function?',
    options: [
      '3\'→5\' exonuclease performs proofreading (erasing mismatched terminal bases); 5\'→3\' exonuclease removes downstream RNA primers ahead of the fork',
      '3\'→5\' exonuclease removes RNA primers; 5\'→3\' exonuclease synthesises new DNA',
      'Both exonucleases solely degrade foreign viral double-stranded DNA',
      '3\'→5\' exonuclease seals Okazaki fragments; 5\'→3\' exonuclease unwinds supercoils'
    ],
    correctIndex: 0,
    explanation: '3\' to 5\' exonuclease is the real-time proofreading "backspace" activity that trims an incorrectly paired nucleotide at the growing 3\' end. 5\' to 3\' exonuclease acts in forward nick-translation to degrade RNA primers and damaged DNA ahead of the polymerase.',
    hints: [
      'Proofreading happens backwards from the growing 3\' tip (3\' to 5\').',
      'Removing RNA primers ahead of the polymerase moves forward (5\' to 3\').',
      'DNA Polymerase I uniquely possesses both exonuclease directions.'
    ],
    misconceptionIndex: 1,
  },
  // 14. Standard - Application - c12_biotech_008
  {
    id: 'ch_nt_014',
    nodeId: NODE_C12_BIOTECH_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A human insulin gene is cloned directly from genomic DNA into an E. coli expression plasmid without using cDNA. Why does E. coli fail to produce active human insulin protein?',
    options: [
      'E. coli lacks spliceosomes and snRNPs, so it cannot splice out the introns present in eukaryotic hnRNA',
      'E. coli uses a completely different genetic code where AUG is a stop codon',
      'E. coli ribosomes cannot bind to any eukaryotic start codons',
      'Prokaryotic DNA polymerase degrades all mammalian promoter regions'
    ],
    correctIndex: 0,
    explanation: 'Eukaryotic genes are split genes containing coding exons interrupted by non-coding introns. Bacteria lack the splicing machinery (spliceosomes / snRNAs). Therefore, direct genomic cloning retains introns, resulting in premature stop codons and garbled translation. Cloning requires intron-free cDNA reverse-transcribed from mature mRNA.',
    hints: [
      'Eukaryotic pre-mRNA has introns that must be removed.',
      'Bacteria have continuous, intron-free cistrons and cannot perform RNA splicing.',
      'Recombinant human insulin in E. coli must be expressed from cDNA.'
    ],
    misconceptionIndex: 2,
  },
  // 15. Standard - Construct - c12_biotech_010
  {
    id: 'ch_nt_015',
    nodeId: NODE_C12_BIOTECH_010,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct a functional mature mRNA transcript from 5\' to 3\' that will direct synthesis of the tripeptide Met-Phe-Gly and terminate translation properly.',
    availableParts: ['5\'-Cap', 'AUG', 'UUU', 'GGG', 'UAA', 'Poly-A-Tail', 'UAC', 'AAA', 'CCC'],
    targetState: '5\'-Cap AUG UUU GGG UAA Poly-A-Tail',
    validationHint: 'Include 5\'-Cap, Start codon (Met), Phe codon (UUU), Gly codon (GGG), Stop codon (UAA), and 3\' Poly-A-Tail in order.',
    explanation: 'A fully functional mature eukaryotic mRNA transcript begins with a 5\' 7-methylguanosine cap, followed by the start codon AUG (Met), coding codons UUU (Phe) and GGG (Gly), a nonsense stop codon UAA (release factor binding), and ends with a stabilizing 3\' Poly-A tail.',
    hints: [
      'Start with the 5\'-Cap and AUG codon.',
      'Insert the codons for Phenylalanine (UUU) and Glycine (GGG).',
      'End with a stop codon (UAA) and the Poly-A-Tail.'
    ],
  },
  // 16. Advanced - Analysis - c12_biotech_009
  {
    id: 'ch_nt_016',
    nodeId: NODE_C12_BIOTECH_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During post-transcriptional processing in eukaryotic nuclei, what is the precise biochemical mechanism of 5\' capping and its physiological role?',
    options: [
      'Addition of 7-methylguanosine via an unusual 5\'-5\' triphosphate linkage; protects mRNA from 5\' exonucleases and assists 40S ribosome recruitment',
      'Methylation of all uracil bases into thymines to convert hnRNA directly into DNA',
      'Attachment of a poly-adenine tract to the 5\' hydroxyl to promote nuclear pore export',
      'Removal of the promoter TATA box sequence from the RNA transcript'
    ],
    correctIndex: 0,
    explanation: '5\' Capping adds a 7-methylguanosine (m7G) nucleotide inverted via a 5\'-to-5\' triphosphate bridge. This unreactive linkage blocks 5\'→3\' exoribonucleases, facilitates eIF4E cap-binding complex assembly, and guides 40S ribosomal subunit scanning.',
    hints: [
      'The cap consists of a modified guanosine (7-methylguanosine).',
      'The bond is a rare 5\'-5\' triphosphate bridge.',
      'It shields against exonucleases and recruits the translation initiation complex.'
    ],
    misconceptionIndex: 1,
  },
  // 17. Advanced - Evaluation - c12_biotech_009
  {
    id: 'ch_nt_017',
    nodeId: NODE_C12_BIOTECH_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A mutation inactivates the snRNA component U1 of the spliceosome in human cell culture. What specific molecular defect is observed in the resulting transcripts?',
    options: [
      'Inability to recognize the 5\' splice donor site (GU), resulting in failure of intron excision and retention of unspliced hnRNA in the nucleus',
      'Complete arrest of RNA Polymerase II transcription elongation at the promoter',
      'Immediate degradation of tRNA acceptor stems',
      'Premature polyadenylation directly after exon 1'
    ],
    correctIndex: 0,
    explanation: 'U1 snRNA base-pairs specifically with the conserved 5\' splice donor consensus sequence (AG|GUAAGU). If U1 is non-functional, the spliceosome cannot initiate assembly, leading to completely unspliced pre-mRNA retention and nonsense translation.',
    hints: [
      'U1 snRNA binds the 5\' splice site at the intron-exon border.',
      'Without U1 base pairing, spliceosome assembly stalls.',
      'Introns fail to be excised in lariat form.'
    ],
    misconceptionIndex: 0,
  },
  // 18. Advanced - Numeric - c12_biotech_008
  {
    id: 'ch_nt_018',
    nodeId: NODE_C12_BIOTECH_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A pre-mRNA (hnRNA) transcript is 3600 nucleotides long. It consists of 5 exons (each 180 nucleotides long) and 4 intervening introns. Calculate the total number of nucleotides removed during spliceosomal processing to generate mature mRNA.',
    correctAnswer: 2700,
    tolerance: 0,
    unit: 'intronic nucleotides',
    explanation: 'Total exon length = 5 exons × 180 nt = 900 nt. Total transcript = 3600 nt. Spliced out intronic nucleotides = 3600 nt - 900 nt = 2700 nt.',
    hints: [
      'Calculate the total length of all 5 exons combined (5 × 180).',
      'Subtract total exon length from the primary hnRNA length (3600).',
      '3600 - 900 = 2700 nucleotides.'
    ],
  },
  // 19. Advanced - Application - c12_biotech_007
  {
    id: 'ch_nt_019',
    nodeId: NODE_C12_BIOTECH_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In India\'s National AIDS Control Programme, how do clinicians utilise the exception to the Central Dogma to diagnose and treat HIV-1 infections?',
    options: [
      'Diagnose using RT-PCR (detecting viral RNA converted to cDNA via reverse transcriptase) and treat using Reverse Transcriptase Inhibitors (AZT/Tenofovir)',
      'Treat using DNA Ligase accelerators to permanently seal viral DNA',
      'Diagnose by measuring blood glucose elevations caused by viral glycolysis',
      'Treat by blocking bacterial topoisomerase with ciprofloxacin'
    ],
    correctIndex: 0,
    explanation: 'Retroviruses like HIV violate the simple DNA→RNA flow by employing RNA-dependent DNA polymerase (Reverse Transcriptase) to copy their viral RNA genome into proviral cDNA. RT-PCR leverages reverse transcriptase for ultra-sensitive early viral load quantification, and drugs like Zidovudine (AZT) specifically inhibit this unique viral enzyme.',
    hints: [
      'HIV uses Reverse Transcriptase to convert its RNA genome into DNA.',
      'RT-PCR stands for Reverse Transcription Polymerase Chain Reaction.',
      'Antiretroviral therapy (ART) targets reverse transcriptase.'
    ],
    misconceptionIndex: 0,
  },
  // 20. Advanced - Analysis - c12_biotech_010
  {
    id: 'ch_nt_020',
    nodeId: NODE_C12_BIOTECH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In sickle-cell anaemia, a point mutation in the beta-globin gene changes codon 6 from GAG to GUG on the mRNA. Explain the exact genetic code change and its biochemical consequence.',
    options: [
      'Glutamic acid (polar, hydrophilic) is replaced by Valine (non-polar, hydrophobic), causing HbS polymerization under low oxygen',
      'Methionine is replaced by a premature stop codon, terminating globin synthesis',
      'Lysine is converted to Leucine, preventing heme iron binding',
      'The mutation introduces an intron splice site, cutting the protein in half'
    ],
    correctIndex: 0,
    explanation: 'The transition from GAG (coding for negatively charged Glutamic acid) to GUG (coding for non-polar branched Valine) at position 6 of the beta-globin chain creates a sticky hydrophobic patch. In deoxygenated states, HbS polymerises into long insoluble fibres that distort red blood cells into sickles.',
    hints: [
      'GAG codes for Glutamic acid; GUG codes for Valine.',
      'Valine is hydrophobic, unlike charged glutamic acid.',
      'This single base substitution is the classic molecular disease example.'
    ],
    misconceptionIndex: 0,
  },
  // 21. Advanced - Evaluation - c12_biotech_006
  {
    id: 'ch_nt_021',
    nodeId: NODE_C12_BIOTECH_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A lab analyst wants to specifically distinguish DNA from RNA in a mixed nucleic acid extract without a UV spectrophotometer. Which colorimetric test pair will unambiguously identify them based on their pentose sugars?',
    options: [
      'Diphenylamine (DPA) reaction (heats with deoxyribose → blue product) vs Orcinol reaction (heats with ribose → green product)',
      'Biuret test (violet) vs Ninhydrin test (purple)',
      'Fehling\'s test (red) vs Iodine test (blue-black)',
      'Sudan III test (orange) vs Bradford assay (blue)'
    ],
    correctIndex: 0,
    explanation: 'The Diphenylamine (DPA) test specifically reacts with the 2-deoxyribose of DNA under acidic conditions to yield a blue-coloured complex (measured at 595-600 nm). The Orcinol test reacts with the ribose sugar of RNA in the presence of FeCl3 to yield a green product (measured at 665 nm).',
    hints: [
      'DPA detects 2-deoxyribose (blue).',
      'Orcinol detects ribose (green).',
      'These colorimetric tests rely on sugar ring differences, not bases.'
    ],
    misconceptionIndex: 2,
  },
  // 22. Advanced - Creativity - c12_biotech_003
  {
    id: 'ch_nt_022',
    nodeId: NODE_C12_BIOTECH_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Francis Crick\'s Wobble Hypothesis explains why cells need only ~31-45 tRNAs to decode all 61 sense codons. What is the fundamental mechanism of wobble pairing?',
    options: [
      'Non-standard hydrogen bonding is permitted exclusively at the 3rd base of the codon (1st base of the anticodon, e.g., Inosine pairing with U, C, or A)',
      'The ribosome skips every 3rd base entirely during translation elongation',
      'tRNA molecules physically stretch to cover two codons simultaneously',
      'RNA polymerase proofreads the mRNA inside the ribosomal P-site'
    ],
    correctIndex: 0,
    explanation: 'Wobble occurs at the 3rd base of the mRNA codon (5\' position of the tRNA anticodon). Spatial flexibility allows non-Watson-Crick pairs (such as G pairing with U, or modified base Inosine pairing with A, U, or C), providing degeneracy and economic use of tRNA species.',
    hints: [
      'Wobble flexibility occurs only at the third base of the triplet codon.',
      'Inosine is a modified deaminated adenosine base that pairs promiscuously with U, C, or A.',
      'Degeneracy allows multiple codons to specify the same amino acid.'
    ],
    misconceptionIndex: 0,
  }
];

// ─── PROPS & DEFAULT PROPS ───
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

const DEFAULT_PROPS: Props = {
  nodeId: 'c12_biotech_001',
  title: 'Nucleic Acids, Replication, Transcription & Genetic Code',
  definition: 'Nucleotides are the phosphate-ester monomers of nucleic acids (DNA/RNA) composed of a nitrogenous base, pentose sugar, and phosphate. DNA forms an antiparallel double helix replicating semi-conservatively, transcribed into hnRNA, spliced, and translated into proteins via the universal triplet genetic code.',
  eli5: 'DNA is your body\'s master recipe book. Nucleotides are the molecular alphabet blocks. The cell unzips the double helix, makes a working photocopy (RNA), cuts out unwanted ads (introns), and translates 3-letter words (codons) into protein machinery!',
  misconceptions: [
    {
      misconception: 'Writing "Adenosine" when asked for the nitrogenous base.',
      correction: 'Adenine is the nitrogenous base; Adenosine is the nucleoside (Adenine + Ribose sugar). Adding phosphate gives Adenosine Monophosphate (AMP).'
    },
    {
      misconception: 'Believing DNA polymerase can initiate a new DNA strand from scratch without a primer.',
      correction: 'DNA polymerases can only extend a free 3\'-OH end. Primase must synthesize a short RNA primer before DNA Pol III can elongate.'
    },
    {
      misconception: 'Assuming eukaryotic primary transcripts (hnRNA) can be directly translated in bacteria.',
      correction: 'Eukaryotic genes contain non-coding introns. Bacteria lack spliceosomes; expressing eukaryotic genes in bacteria requires intronless cDNA.'
    },
    {
      misconception: 'Confusing 3\'→5\' proofreading exonuclease with 5\'→3\' primer removal exonuclease.',
      correction: '3\'→5\' exonuclease acts as a backspace editor removing mismatched bases at the growing 3\' tip; 5\'→3\' exonuclease removes downstream RNA primers.'
    },
    {
      misconception: 'Assuming pure DNA has an A260/A280 spectrophotometric ratio of 2.0.',
      correction: 'Pure dsDNA has an A260/A280 ratio of ~1.8. Pure RNA gives ~2.0 due to exposed single-stranded bases and high uracil content.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What chemical group differentiates a nucleotide from a nucleoside?', options: ['Phosphate group', 'Pentose sugar', 'Purine ring', 'Hydroxyl group'], correctIndex: 0 },
    { question: 'Which base is found strictly in RNA in place of Thymine?', options: ['Uracil', 'Guanine', 'Cytosine', 'Adenine'], correctIndex: 0 },
    { question: 'What bond connects adjacent nucleotides in a single polynucleotide strand?', options: ['3\'-5\' Phosphodiester bond', 'Peptide bond', 'Glycosidic bond', 'Hydrogen bond'], correctIndex: 0 },
    { question: 'In the Meselson-Stahl experiment, what isotope proved semi-conservative replication?', options: ['15N (Heavy nitrogen)', '32P', '35S', '14C'], correctIndex: 0 },
    { question: 'Which enzyme is responsible for synthesizing RNA primers during DNA replication?', options: ['RNA Primase', 'DNA Ligase', 'Topoisomerase', 'Helicase'], correctIndex: 0 },
    { question: 'What is the primary transcript produced by RNA Polymerase II in eukaryotes called?', options: ['hnRNA (pre-mRNA)', 'Mature tRNA', '28S rRNA', 'cDNA'], correctIndex: 0 },
    { question: 'Which snRNA binds the 5\' splice donor site during spliceosome assembly?', options: ['U1 snRNA', 'U6 snRNA', 'U2 snRNA', 'U5 snRNA'], correctIndex: 0 },
    { question: 'What property of the genetic code allows multiple codons to specify a single amino acid?', options: ['Degeneracy / Redundancy', 'Universality', 'Non-overlapping', 'Ambiguity'], correctIndex: 0 }
  ],
  masteryCriteria: 'Student demonstrates comprehensive mastery of nucleotide chemistry, Watson-Crick DNA double helix geometry, Chargaff ratios, semi-conservative replication, replication fork enzymology, UV spectrophotometry (A260/A280), split-gene transcription, mRNA splicing, and codon-to-amino acid translation.'
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Learn by Doing) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Nucleoside vs Nucleotide Assembly',
    instruction: 'Click the chemical components below to build a Nucleotide step-by-step from Base to Sugar to Phosphate!',
    interactionType: 'click-builder',
    nodeId: NODE_C12_BIOTECH_001,
  },
  {
    title: 'Lab 2: Watson-Crick Helix & Chargaff\'s Law',
    instruction: 'Adjust the base percentage sliders and watch the complementary helix strands and thermal stability gauge update in real-time!',
    interactionType: 'slider-chargaff',
    nodeId: NODE_C12_BIOTECH_002,
  },
  {
    title: 'Lab 3: Replication Fork & Real-Time Proofreading',
    instruction: 'Control the replication fork slider to advance synthesis, deploy DNA Pol III, and click the backspace 3\'→5\' proofreading trigger when a mismatch appears!',
    interactionType: 'fork-simulator',
    nodeId: NODE_C12_BIOTECH_004,
  },
  {
    title: 'Lab 4: Eukaryotic Split Genes & Spliceosome Surgery',
    instruction: 'Click the introns to snip them out with the spliceosome and stitch exons together to produce mature, translatable mRNA!',
    interactionType: 'splice-lab',
    nodeId: NODE_C12_BIOTECH_008,
  },
  {
    title: 'Lab 5: Interactive Codon Wheel & Ribosomal Translation',
    instruction: 'Click codon triplet bases (A, U, G, C) to rotate the codon translator wheel and watch tRNA deliver the exact amino acid to the ribosome!',
    interactionType: 'codon-translator',
    nodeId: NODE_C12_BIOTECH_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a sample of double-stranded DNA is composed of 40% G-C base pairs, what will happen to its melting temperature (Tm) compared to a DNA sample with 70% G-C content?',
    options: [
      'The 40% G-C sample will melt at a LOWER temperature because A-T pairs have only 2 hydrogen bonds vs 3 in G-C',
      'The 40% G-C sample will melt at a HIGHER temperature because A-T pairs are heavier',
      'Both DNA samples will melt at identical temperatures because phosphodiester bonds are the same',
      'The 40% G-C sample will not denature under heat at all'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the G-C percentage slider in Lab 2 to verify how Thermal Stability and melting temperature respond!',
    nodeId: NODE_C12_BIOTECH_002,
  },
  {
    question: 'Predict: If a cell culture is treated with an inhibitor of RNA Primase, what will be the immediate impact on DNA replication?',
    options: [
      'Both leading and lagging strand synthesis completely fail to initiate because DNA Polymerase III requires a free 3\'-OH primer',
      'Only the lagging strand stops, while the leading strand synthesises normally from naked DNA',
      'DNA replication speeds up because primers are no longer needed',
      'DNA Polymerase I takes over and synthesises the entire chromosome without primers'
    ],
    correctIndex: 0,
    verifyInstruction: 'Test the replication fork controls in Lab 3 to observe how primase generates the obligatory 3\'-OH start site.',
    nodeId: NODE_C12_BIOTECH_004,
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the ratio of [A+G] (purines) to [T+C] (pyrimidines) as you change the base percentages in double-stranded DNA?',
    observableOptions: [
      'The purine-to-pyrimidine ratio [A+G]/[T+C] remains strictly 1.0 at all times due to complementary base pairing',
      'Purines always exceed pyrimidines when Guanine increases',
      'Pyrimidines fluctuate independently of purines',
      'The ratio drops to zero at high temperatures'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIOTECH_002,
  },
  {
    question: 'What happens to the total length of the RNA transcript when the spliceosome removes all non-coding introns?',
    observableOptions: [
      'The mature mRNA is significantly shorter than the primary hnRNA transcript',
      'The mRNA becomes longer because exons expand in size',
      'The length remains identical because introns are simply converted into exons',
      'The mRNA disintegrates into individual nucleotides'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIOTECH_008,
  }
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Biotech Project: Designing a Recombinant COVID-19 mRNA Vaccine',
  description: 'Apply the principles of nucleotide chemistry, 5\' capping, codon optimization, and 3\' polyadenylation to design a synthetic mRNA vaccine vector expressing the SARS-CoV-2 Spike glycoprotein in human host cells.',
  steps: [
    'Obtain the Spike glycoprotein amino acid sequence from NCBI GenBank database.',
    'Perform in silico reverse translation using human-optimized codons (avoiding rare bacterial codons).',
    'Incorporate modified N1-methylpseudouridine (m1Ψ) nucleotides to evade innate immune toll-like receptors (TLRs).',
    'Add an enzymatically synthesized 5\' m7G cap (Cap 1 structure) and a 120-nucleotide 3\' Poly-A tail for high cytoplasmic translational efficiency.',
    'Formulate the optimized synthetic mRNA into lipid nanoparticles (LNPs) for intramuscular delivery!'
  ],
};

// ─── MAIN COMPONENT ───
function C12_BiotechnologyNucleotidesNucleosidesStructureSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c12_biotech_001',
  title = DEFAULT_PROPS.title || 'Nucleic Acids, Replication, Transcription & Genetic Code',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org interactive exploration states
  const [builderBase, setBuilderBase] = useState<'Adenine' | 'Guanine' | 'Cytosine' | 'Thymine' | 'Uracil'>('Adenine');
  const [builderSugar, setBuilderSugar] = useState<'Deoxyribose' | 'Ribose'>('Deoxyribose');
  const [builderPhosphateCount, setBuilderPhosphateCount] = useState<number>(1);
  const [builderHasBase, setBuilderHasBase] = useState(true);
  const [builderHasSugar, setBuilderHasSugar] = useState(true);
  const [builderHasPhosphate, setBuilderHasPhosphate] = useState(true);

  // Chargaff & Helix Simulator state
  const [sliderG, setSliderG] = useState<number>(30); // % G
  const sliderC = useMemo(() => sliderG, [sliderG]);
  const sliderA = useMemo(() => Math.max(0, 50 - sliderG), [sliderG]);
  const sliderT = useMemo(() => sliderA, [sliderA]);
  const gcContent = useMemo(() => sliderG + sliderC, [sliderG, sliderC]);
  const meltingTemp = useMemo(() => (69.3 + 0.41 * gcContent).toFixed(1), [gcContent]);

  // Replication Fork Simulation state
  const [forkProgress, setForkProgress] = useState<number>(40);
  const [hasMismatch, setHasMismatch] = useState<boolean>(false);
  const [mismatchRepaired, setMismatchRepaired] = useState<boolean>(false);
  const [primerPlaced, setPrimerPlaced] = useState<boolean>(true);

  // Spliceosome simulator state
  const [splicedIntrons, setSplicedIntrons] = useState<{ [key: number]: boolean }>({ 1: false, 2: false });
  const allSpliced = useMemo(() => splicedIntrons[1] && splicedIntrons[2], [splicedIntrons]);

  // Codon translator wheel state
  const [selectedCodonBase1, setSelectedCodonBase1] = useState<string>('A');
  const [selectedCodonBase2, setSelectedCodonBase2] = useState<string>('U');
  const [selectedCodonBase3, setSelectedCodonBase3] = useState<string>('G');

  // Spectrophotometer state (UV A260 / A280)
  const [specA260, setSpecA260] = useState<number>(0.90);
  const [specA280, setSpecA280] = useState<number>(0.50);

  // Predict-then-check & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Sandbox state
  const [sandboxTab, setSandboxTab] = useState<'helix' | 'spectro' | 'codon' | 'replication'>('helix');

  // Adaptive mastery and BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag & drop / Sort / Numeric / Construct challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Canvas ref for dynamic molecular animations
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── MOTIVATIONAL FEEDBACK MESSAGE ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Outstanding mastery of molecular biology principles!';
    if (errors >= 1 && errors <= 3) return 'Great work! You demonstrated strong analytical and diagnostic skills.';
    if (errors >= 4 && errors <= 7) return 'Good effort! Review the tricky mechanisms to cement your understanding.';
    return 'Do not give up — You WILL get this! Revisit the interactive labs and try again!';
  }, [errors]);

  // ─── SPACED REPETITION (SRS) INTERVAL CALCULATION ───
  const srsReviewInterval = useMemo(() => {
    if (errors === 0) return '7 days';
    if (errors >= 1 && errors <= 3) return '3 days';
    return '1 day';
  }, [errors]);

  // ─── CODON TABLE TRANSLATOR ───
  const translatedAminoAcid = useMemo(() => {
    const triplet = `${selectedCodonBase1}${selectedCodonBase2}${selectedCodonBase3}`;
    if (triplet === 'AUG') return { name: 'Methionine (Met)', type: 'Start / Nonpolar', color: '#10b981' };
    if (triplet === 'UAA' || triplet === 'UAG' || triplet === 'UGA') return { name: 'STOP Codon (Nonsense)', type: 'Release Factor', color: '#ef4444' };
    if (triplet.startsWith('UU')) return { name: 'Phenylalanine (Phe) / Leucine', type: 'Hydrophobic', color: '#6366f1' };
    if (triplet.startsWith('CU')) return { name: 'Leucine (Leu)', type: 'Aliphatic', color: '#6366f1' };
    if (triplet.startsWith('AU')) return { name: 'Isoleucine (Ile)', type: 'Aliphatic', color: '#6366f1' };
    if (triplet.startsWith('GU')) return { name: 'Valine (Val)', type: 'Branched chain', color: '#6366f1' };
    if (triplet.startsWith('UC') || triplet.startsWith('AGU') || triplet.startsWith('AGC')) return { name: 'Serine (Ser)', type: 'Polar uncharged', color: '#06b6d4' };
    if (triplet.startsWith('CC')) return { name: 'Proline (Pro)', type: 'Cyclic imino', color: '#f59e0b' };
    if (triplet.startsWith('AC')) return { name: 'Threonine (Thr)', type: 'Polar hydroxylic', color: '#06b6d4' };
    if (triplet.startsWith('GC')) return { name: 'Alanine (Ala)', type: 'Aliphatic small', color: '#8b5cf6' };
    if (triplet.startsWith('UA')) return { name: 'Tyrosine (Tyr) / Stop', type: 'Aromatic', color: '#ec4899' };
    if (triplet.startsWith('CA')) return { name: 'Histidine (His) / Glutamine', type: 'Basic / Amide', color: '#3b82f6' };
    if (triplet.startsWith('AA')) return { name: 'Asparagine (Asn) / Lysine', type: 'Basic / Amide', color: '#3b82f6' };
    if (triplet.startsWith('GA')) return { name: 'Aspartic acid (Asp) / Glutamic acid', type: 'Acidic', color: '#f43f5e' };
    if (triplet.startsWith('UG')) return { name: 'Cysteine (Cys) / Tryptophan', type: 'Thiol / Aromatic', color: '#14b8a6' };
    if (triplet.startsWith('CG') || triplet.startsWith('AGA') || triplet.startsWith('AGG')) return { name: 'Arginine (Arg)', type: 'Positively charged', color: '#3b82f6' };
    if (triplet.startsWith('GG')) return { name: 'Glycine (Gly)', type: 'Smallest achiral', color: '#a855f7' };
    return { name: 'Unassigned', type: 'Standard', color: '#64748b' };
  }, [selectedCodonBase1, selectedCodonBase2, selectedCodonBase3]);

  // Derived molecule name in builder
  const currentMoleculeName = useMemo(() => {
    if (!builderHasBase || !builderHasSugar) return 'Incomplete Fragment';
    let baseName = '';
    const isDeoxy = builderSugar === 'Deoxyribose';

    if (builderBase === 'Adenine') baseName = isDeoxy ? 'Deoxyadenosine' : 'Adenosine';
    else if (builderBase === 'Guanine') baseName = isDeoxy ? 'Deoxyguanosine' : 'Guanosine';
    else if (builderBase === 'Cytosine') baseName = isDeoxy ? 'Deoxycytidine' : 'Cytidine';
    else if (builderBase === 'Thymine') baseName = isDeoxy ? 'Deoxythymidine' : 'Thymidine';
    else if (builderBase === 'Uracil') baseName = 'Uridine';

    if (!builderHasPhosphate || builderPhosphateCount === 0) {
      return `${baseName} (Nucleoside)`;
    }
    const pSuffix = builderPhosphateCount === 1 ? 'Monophosphate (NMP)' : builderPhosphateCount === 2 ? 'Diphosphate (NDP)' : 'Triphosphate (NTP)';
    return `${baseName} ${pSuffix} (Nucleotide)`;
  }, [builderBase, builderSugar, builderHasBase, builderHasSugar, builderHasPhosphate, builderPhosphateCount]);

  // Filtered challenges by difficulty tier
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS ANIMATION EFFECT (Dynamic DNA Double Helix & Fork) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Draw stylized animated double helix
      ctx.lineWidth = 3;
      const points = 24;
      const spacing = width / points;

      for (let i = 0; i < points; i++) {
        const x = i * spacing;
        const wave = Math.sin(t + i * 0.4);
        const y1 = midY + wave * 30;
        const y2 = midY - wave * 30;

        // Base pair rungs
        ctx.beginPath();
        ctx.strokeStyle = wave > 0 ? '#4338ca' : '#059669';
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();

        // Node dots
        ctx.beginPath();
        ctx.arc(x, y1, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y2, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── USECALLBACK HANDLERS ───

  // 1. Escalate Hints
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('All hints explored. Review the complete step-by-step breakdown.');
    }
  }, [hintCount, challenge]);

  // 2. Discovery handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent analytical intuition! Let us investigate the molecular mechanisms.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // 3. Advance to exploration
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Molecular Biology Lab. Manipulate the structures to discover their functions.');
  }, []);

  // 4. Advance to sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode active. Experiment with all interactive modules freely.');
  }, []);

  // 5. Advance to challenges
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for board-level challenges. Apply your molecular knowledge!');
  }, []);

  // 6. Predict handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation below to verify.');
  }, []);

  // 7. Observation handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Sharp scientific observation! [A+G] equals [T+C] universally in duplex DNA.');
    } else {
      audioManager.play('error');
    }
  }, []);

  // 8. Complete handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Investigation complete! You scored ${finalScore} percent.`);
  }, [errors, onComplete]);

  // 9. Next challenge handler
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

  // 10. Inactivity timer reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 11. Answer submission handler
  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const val = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (ans as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding scientific reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us study the complete molecular explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // 12. Drag start handler
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  // 13. Drag drop handler
  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrectTarget = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrectTarget) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // 14. Sort Move handler
  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  // 15. Proofreading trigger in replication lab
  const handleTriggerProofreading = useCallback(() => {
    if (hasMismatch) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setHasMismatch(false);
      setMismatchRepaired(true);
      speechManager.speak('3 prime to 5 prime exonuclease excised the mismatch! High fidelity restored.');
    }
  }, [hasMismatch]);

  // 16. Splice intron trigger
  const handleSpliceIntron = useCallback((intronId: number) => {
    audioManager.play('pop');
    setSplicedIntrons(prev => ({ ...prev, [intronId]: true }));
    speechManager.speak(`Intron ${intronId} excised as a lariat!`);
  }, []);

  // Cleanup inactivity timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-900/60 text-indigo-300 rounded-full border border-indigo-700/40">
                ISC Class 12 • Biotechnology
              </span>
              <span className="text-xs text-slate-400 font-mono">c12_biotech_001-010</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Phase Navigation Badges */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800 text-xs font-medium">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/40 rounded-2xl border border-indigo-800/50 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🔬 Investigation Brief</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{SCENARIO.intro}</p>
            <p className="text-xs sm:text-sm text-indigo-300/80 mt-3 bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/30">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Diagnostic Question */}
          <div className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 tracking-wide uppercase">
                ⚡ Initial Discovery Hypothesis
              </span>
              <span className="text-xs text-slate-400">Low-stakes intuition check</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, idx) => {
                const isSelected = discoveryAnswered;
                const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                return (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-center justify-between ${
                      discoveryAnswered
                        ? isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:border-indigo-500 hover:bg-slate-850'
                    }`}
                  >
                    <span>
                      <span className="font-mono text-indigo-400 mr-2">[{String.fromCharCode(65 + idx)}]</span> {opt}
                    </span>
                    {discoveryAnswered && (
                      <span className="font-bold text-base ml-2">
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 border-t border-slate-700/60 space-y-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Chargaff\'s rule guarantees [A] = [T] and [G] = [C].'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Molecular Labs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Molecular Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Navigate to Lab ${idx + 1}: ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-850 rounded-2xl border border-slate-700 shadow-xl space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: NUCLEOTIDE BUILDER ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* Visual Molecule Construction SVG */}
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800 min-h-[260px]">
                    <svg viewBox="0 0 360 220" className="w-full max-w-sm" aria-label="Nucleotide molecule structural diagram">
                      {/* Phosphate Group(s) */}
                      {builderHasPhosphate && (
                        <g transform="translate(40, 90)">
                          {Array.from({ length: builderPhosphateCount }).map((_, pIdx) => (
                            <g key={pIdx} transform={`translate(${-pIdx * 28}, 0)`}>
                              <circle cx="0" cy="0" r="14" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                              <text x="0" y="4" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">P</text>
                            </g>
                          ))}
                          <line x1="14" y1="0" x2="50" y2="0" stroke="#f59e0b" strokeWidth="3" strokeDasharray="2,2" />
                          <text x="30" y="-8" fill="#94a3b8" fontSize="8">5\' Ester</text>
                        </g>
                      )}

                      {/* Pentose Sugar Ring */}
                      {builderHasSugar && (
                        <g transform="translate(140, 90)">
                          {/* Furanose Pentagon */}
                          <polygon points="0,-25 35,-5 22,25 -22,25 -35,-5" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
                          <text x="0" y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                            {builderSugar === 'Deoxyribose' ? 'Deoxyribose' : 'Ribose'}
                          </text>
                          <text x="-25" y="-15" fill="#cbd5e1" fontSize="8">5\'</text>
                          <text x="30" y="-12" fill="#cbd5e1" fontSize="8">1\'</text>
                          <text x="-20" y="36" fill="#cbd5e1" fontSize="8">3\'-OH</text>
                          <text x="18" y="36" fill={builderSugar === 'Deoxyribose' ? '#64748b' : '#38bdf8'} fontSize="8">
                            {builderSugar === 'Deoxyribose' ? '2\'-H' : '2\'-OH'}
                          </text>
                          {/* Glycosidic Bond */}
                          {builderHasBase && (
                            <line x1="35" y1="-5" x2="80" y2="-5" stroke="#ec4899" strokeWidth="3" />
                          )}
                        </g>
                      )}

                      {/* Nitrogenous Base */}
                      {builderHasBase && (
                        <g transform="translate(260, 85)">
                          {/* Double ring for Purines, Single ring for Pyrimidines */}
                          {builderBase === 'Adenine' || builderBase === 'Guanine' ? (
                            <g>
                              <polygon points="-25,-20 0,-30 25,-20 25,10 0,20 -25,10" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
                              <polygon points="25,-15 45,-5 45,15 25,10" fill="#db2777" stroke="#be185d" strokeWidth="2" />
                              <text x="10" y="2" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                {builderBase} (Purine)
                              </text>
                            </g>
                          ) : (
                            <g>
                              <polygon points="-25,-20 0,-30 25,-20 25,10 0,20 -25,10" fill="#10b981" stroke="#059669" strokeWidth="2" />
                              <text x="0" y="2" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                {builderBase} (Pyrimidine)
                              </text>
                            </g>
                          )}
                        </g>
                      )}
                    </svg>
                    <div className="mt-3 text-center">
                      <span className="text-xs uppercase text-slate-400 font-semibold">Identified Compound:</span>
                      <p className="text-sm sm:text-base font-bold text-indigo-300">{currentMoleculeName}</p>
                    </div>
                  </div>

                  {/* Chemical Controls */}
                  <div className="space-y-4 flex flex-col justify-center">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase">1. Select Nitrogenous Base:</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {(['Adenine', 'Guanine', 'Cytosine', 'Thymine', 'Uracil'] as const).map((b) => (
                          <button
                            key={b}
                            aria-label={`Select base ${b}`}
                            onClick={() => {
                              setBuilderBase(b);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1 text-xs rounded-lg font-semibold ${
                              builderBase === b ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase">2. Select Pentose Sugar:</label>
                      <div className="flex gap-2 mt-1">
                        {(['Deoxyribose', 'Ribose'] as const).map((s) => (
                          <button
                            key={s}
                            aria-label={`Select pentose sugar ${s}`}
                            onClick={() => {
                              setBuilderSugar(s);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1 text-xs rounded-lg font-semibold ${
                              builderSugar === s ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {s} {s === 'Deoxyribose' ? '(DNA)' : '(RNA)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase">3. Phosphate Attachment:</label>
                      <div className="flex gap-2 mt-1">
                        {[0, 1, 2, 3].map((pNum) => (
                          <button
                            key={pNum}
                            aria-label={`Set phosphate count to ${pNum}`}
                            onClick={() => {
                              setBuilderPhosphateCount(pNum);
                              setBuilderHasPhosphate(pNum > 0);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1 text-xs rounded-lg font-semibold ${
                              builderPhosphateCount === pNum ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {pNum === 0 ? 'None (Nucleoside)' : `${pNum} (P${pNum})`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <p>🔑 <strong className="text-indigo-300">Exam Note:</strong> Nucleoside = Base + Sugar (e.g. Adenosine).</p>
                      <p>🔑 <strong className="text-indigo-300">Nucleotide:</strong> Base + Sugar + Phosphate (e.g. ATP is Adenosine Triphosphate).</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: CHARGAFF & THERMAL STABILITY SIMULATOR ── */}
              {currentSlide === 1 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* Predict Check for Lab 2 */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-700/50 space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase">Predict First</span>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((pOpt, pI) => (
                          <button
                            key={pI}
                            aria-label={`Predict option ${pI + 1}: ${pOpt}`}
                            onClick={() => handlePrediction(pI)}
                            className="w-full text-left p-2.5 bg-slate-900 rounded-lg text-xs text-slate-300 hover:bg-slate-800 border border-slate-700/60"
                          >
                            {pOpt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-300">G-C Base Pair Ratio: {gcContent}% (G = {sliderG}%, C = {sliderC}%)</span>
                      <span className="font-semibold text-slate-300">A-T Base Pair Ratio: {100 - gcContent}% (A = {sliderA}%, T = {sliderT}%)</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Adjust Guanine and Cytosine percentage slider"
                      min={10}
                      max={45}
                      value={sliderG}
                      onChange={(e) => {
                        setSliderG(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  {/* Live Visual DNA Rungs & Melting Gauge */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 uppercase font-semibold">Chargaff Ratio</span>
                      <p className="text-2xl font-black text-emerald-400 mt-1">
                        {((sliderA + sliderG) / (sliderT + sliderC)).toFixed(2)}
                      </p>
                      <span className="text-xs text-slate-400">[Purines] / [Pyrimidines]</span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 uppercase font-semibold">Hydrogen Bond Energy</span>
                      <p className="text-2xl font-black text-indigo-400 mt-1">
                        {sliderG * 3 + sliderA * 2} Units
                      </p>
                      <span className="text-xs text-slate-400">(3 × GC + 2 × AT)</span>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 uppercase font-semibold">DNA Melting Temp (Tm)</span>
                      <p className="text-2xl font-black text-pink-400 mt-1">{meltingTemp} °C</p>
                      <span className="text-xs text-slate-400">Thermal Stability</span>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {predictionMade && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                      <span className="text-xs font-bold text-indigo-400 uppercase">Scientific Observation</span>
                      <p className="text-sm text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((oOpt, oI) => (
                          <button
                            key={oI}
                            aria-label={`Select observation: ${oOpt}`}
                            onClick={() => handleObservation(oI)}
                            className="w-full text-left p-2.5 bg-slate-855 rounded-lg text-xs text-slate-300 hover:bg-slate-800 border border-slate-700"
                          >
                            {oOpt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 3: REPLICATION FORK & PROOFREADING ── */}
              {currentSlide === 2 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-sm font-semibold text-slate-300">Fork Progress: {forkProgress}% Complete</span>
                    <div className="flex gap-2">
                      <button
                        aria-label="Inject DNA replication mismatch error"
                        onClick={() => {
                          setHasMismatch(true);
                          setMismatchRepaired(false);
                          audioManager.play('pop');
                          speechManager.speak('Mismatch detected! Cytosine paired opposite Adenine.');
                        }}
                        className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-white rounded-lg text-xs font-bold"
                      >
                        ⚡ Inject Mismatch Error
                      </button>
                      <button
                        aria-label="Trigger 3 prime to 5 prime proofreading exonuclease"
                        onClick={handleTriggerProofreading}
                        disabled={!hasMismatch}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          hasMismatch ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        ✂️ 3\'→5\' Proofread & Repair
                      </button>
                    </div>
                  </div>

                  {/* Replication Fork Graphic */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 180" className="w-full" aria-label="Replication fork leading and lagging strand synthesis diagram">
                      {/* Leading Strand Template */}
                      <path d="M 40,30 L 260,30 L 460,10" fill="none" stroke="#64748b" strokeWidth="4" />
                      <text x="10" y="34" fill="#94a3b8" fontSize="10">3\'</text>
                      <text x="470" y="14" fill="#94a3b8" fontSize="10">5\' (Leading Template)</text>

                      {/* Continuous Leading Daughter Strand */}
                      <line x1="40" y1="44" x2={40 + forkProgress * 2.8} y2="44" stroke="#10b981" strokeWidth="4" />
                      <text x={45 + forkProgress * 2.8} y="48" fill="#10b981" fontSize="10">DNA Pol III (5\'→3\')</text>

                      {/* Lagging Strand Template */}
                      <path d="M 40,150 L 260,150 L 460,170" fill="none" stroke="#64748b" strokeWidth="4" />
                      <text x="10" y="154" fill="#94a3b8" fontSize="10">5\'</text>
                      <text x="470" y="174" fill="#94a3b8" fontSize="10">3\' (Lagging Template)</text>

                      {/* Discontinuous Okazaki fragments */}
                      <line x1="40" y1="136" x2="140" y2="136" stroke="#f59e0b" strokeWidth="4" />
                      <line x1="160" y1="136" x2="250" y2="136" stroke="#f59e0b" strokeWidth="4" />
                      <text x="80" y="126" fill="#f59e0b" fontSize="9">Okazaki Fragment 1</text>
                      <text x="180" y="126" fill="#f59e0b" fontSize="9">Fragment 2 (Primed)</text>

                      {/* Helicase Enzyme */}
                      <polygon points="250,80 280,60 280,120 250,100" fill="#ec4899" />
                      <text x="270" y="94" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Helicase</text>

                      {/* Mismatch Alert Overlay */}
                      {hasMismatch && (
                        <g transform="translate(180, 20)">
                          <rect x="0" y="0" width="100" height="40" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                          <text x="50" y="18" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold">✗ Mismatched Base!</text>
                          <text x="50" y="30" textAnchor="middle" fill="#fda4af" fontSize="8">Requires 3\'→5\' Exo</text>
                        </g>
                      )}

                      {mismatchRepaired && (
                        <g transform="translate(180, 20)">
                          <rect x="0" y="0" width="100" height="30" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                          <text x="50" y="18" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">✓ Repaired Correctly</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 space-y-1 border border-slate-800">
                    <p>📌 <strong>Leading Strand:</strong> Synthesised continuously 5\' to 3\' moving towards the fork.</p>
                    <p>📌 <strong>Lagging Strand:</strong> Synthesised discontinuously away from the fork as Okazaki fragments.</p>
                    <p>📌 <strong>DNA Pol I vs Ligase:</strong> Pol I removes RNA primers (5\'→3\' exo) & fills gaps; DNA Ligase seals phosphodiester nicks.</p>
                  </div>
                </div>
              )}

              {/* ── LAB 4: SPLICEOSOME SURGERY (SPLIT GENES) ── */}
              {currentSlide === 3 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-300">
                      Primary hnRNA Transcript Status: {allSpliced ? '✓ Mature mRNA (Export Ready)' : '✗ Unprocessed pre-mRNA'}
                    </span>
                  </div>

                  {/* Interactive Pre-mRNA Segment */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-center gap-2">
                    {/* 5' Cap */}
                    <div className="px-3 py-2 bg-purple-900 border border-purple-500 rounded-lg text-xs font-bold text-purple-200">
                      5\'-m7G Cap
                    </div>

                    {/* Exon 1 */}
                    <div className="px-4 py-2 bg-blue-700 border border-blue-400 rounded-lg text-xs font-bold text-white">
                      Exon 1 (Coding)
                    </div>

                    {/* Intron 1 */}
                    {!splicedIntrons[1] ? (
                      <motion.button
                        aria-label="Splice and excise Intron 1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSpliceIntron(1)}
                        className="px-3 py-2 bg-rose-900/80 hover:bg-rose-800 border-2 border-dashed border-rose-500 rounded-lg text-xs font-bold text-rose-200 flex items-center gap-1"
                      >
                        ✂️ Intron 1 (Click to Splice)
                      </motion.button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-bold px-1">✓ Spliced</span>
                    )}

                    {/* Exon 2 */}
                    <div className="px-4 py-2 bg-blue-700 border border-blue-400 rounded-lg text-xs font-bold text-white">
                      Exon 2 (Coding)
                    </div>

                    {/* Intron 2 */}
                    {!splicedIntrons[2] ? (
                      <motion.button
                        aria-label="Splice and excise Intron 2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSpliceIntron(2)}
                        className="px-3 py-2 bg-rose-900/80 hover:bg-rose-800 border-2 border-dashed border-rose-500 rounded-lg text-xs font-bold text-rose-200 flex items-center gap-1"
                      >
                        ✂️ Intron 2 (Click to Splice)
                      </motion.button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-bold px-1">✓ Spliced</span>
                    )}

                    {/* Exon 3 */}
                    <div className="px-4 py-2 bg-blue-700 border border-blue-400 rounded-lg text-xs font-bold text-white">
                      Exon 3 (Coding)
                    </div>

                    {/* 3' Poly-A Tail */}
                    <div className="px-3 py-2 bg-amber-900 border border-amber-500 rounded-lg text-xs font-bold text-amber-200">
                      Poly-A (3\')
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <p>💡 <strong>Spliceosome Machinery:</strong> snRNPs (U1, U2, U4, U5, U6 snRNAs + proteins) recognize 5\' GU and 3\' AG splice junctions.</p>
                    <p>💡 <strong>Biotechnology Impact:</strong> Recombinant mammalian genes cloned into bacteria must use <em>cDNA</em> because prokaryotes lack spliceosomes!</p>
                  </div>
                </div>
              )}

              {/* ── LAB 5: CODON WHEEL & TRANSLATION ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* Codon Base Selectors */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-indigo-400 uppercase">Construct Triplet Codon:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-slate-400 font-semibold">1st Base (5\'):</label>
                        <div className="flex flex-col gap-1 mt-1">
                          {['A', 'U', 'G', 'C'].map((b) => (
                            <button
                              key={b}
                              aria-label={`Select codon position 1 base ${b}`}
                              onClick={() => {
                                setSelectedCodonBase1(b);
                                audioManager.play('tap');
                              }}
                              className={`p-1.5 rounded-lg text-xs font-bold ${
                                selectedCodonBase1 === b ? 'bg-indigo-600 text-white' : 'bg-slate-850 text-slate-300'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 font-semibold">2nd Base:</label>
                        <div className="flex flex-col gap-1 mt-1">
                          {['A', 'U', 'G', 'C'].map((b) => (
                            <button
                              key={b}
                              aria-label={`Select codon position 2 base ${b}`}
                              onClick={() => {
                                setSelectedCodonBase2(b);
                                audioManager.play('tap');
                              }}
                              className={`p-1.5 rounded-lg text-xs font-bold ${
                                selectedCodonBase2 === b ? 'bg-indigo-600 text-white' : 'bg-slate-855 text-slate-300'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 font-semibold">3rd Base (3\'):</label>
                        <div className="flex flex-col gap-1 mt-1">
                          {['A', 'U', 'G', 'C'].map((b) => (
                            <button
                              key={b}
                              aria-label={`Select codon position 3 base ${b}`}
                              onClick={() => {
                                setSelectedCodonBase3(b);
                                audioManager.play('tap');
                              }}
                              className={`p-1.5 rounded-lg text-xs font-bold ${
                                selectedCodonBase3 === b ? 'bg-indigo-600 text-white' : 'bg-slate-850 text-slate-300'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Decoding Outcome */}
                  <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-3">
                    <span className="text-xs text-slate-400 uppercase font-semibold">mRNA Codon Triplet:</span>
                    <p className="text-3xl font-mono font-black text-white tracking-widest bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                      5\'-{selectedCodonBase1}{selectedCodonBase2}{selectedCodonBase3}-3\'
                    </p>

                    <div className="w-full pt-3 border-t border-slate-800">
                      <span className="text-xs text-slate-400 uppercase">Recruited Amino Acid:</span>
                      <p className="text-lg font-bold mt-1" style={{ color: translatedAminoAcid.color }}>
                        {translatedAminoAcid.name}
                      </p>
                      <span className="text-xs text-slate-400">Class: {translatedAminoAcid.type}</span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      Anticodon: 3\'-{selectedCodonBase1 === 'A' ? 'U' : selectedCodonBase1 === 'U' ? 'A' : selectedCodonBase1 === 'G' ? 'C' : 'G'}
                      {selectedCodonBase2 === 'A' ? 'U' : selectedCodonBase2 === 'U' ? 'A' : selectedCodonBase2 === 'G' ? 'C' : 'G'}
                      {selectedCodonBase3 === 'A' ? 'U' : selectedCodonBase3 === 'U' ? 'A' : selectedCodonBase3 === 'G' ? 'C' : 'G'}-5\'
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Proceed to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Proceed to free-play sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-850 rounded-2xl border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-indigo-300">Biotechnology Sandbox Workspace</h3>
              <p className="text-xs text-slate-400 mt-0.5">Explore freely without timer or grading pressure.</p>
            </div>
            <div className="flex gap-2">
              {(['helix', 'spectro', 'codon', 'replication'] as const).map((tab) => (
                <button
                  key={tab}
                  aria-label={`Open ${tab} sandbox module`}
                  onClick={() => {
                    setSandboxTab(tab);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${
                    sandboxTab === tab ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Sandbox Content */}
          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
            {sandboxTab === 'helix' && (
              <div className="space-y-4">
                <canvas ref={canvasRef} width={600} height={120} className="w-full bg-slate-900 rounded-xl border border-slate-800" aria-label="Animated DNA Double Helix Visualization" />
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Adjust G-C Percentage: {gcContent}%</span>
                    <span>DNA Melting Temperature: {meltingTemp} °C</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Adjust GC content percentage"
                    min={10}
                    max={45}
                    value={sliderG}
                    onChange={(e) => setSliderG(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
            )}

            {sandboxTab === 'spectro' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-indigo-300">UV Spectrophotometry Purity Calculator</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Absorbance at 260 nm (A260 - Nucleic Acids): {specA260}</label>
                    <input
                      type="range"
                      aria-label="Set A260 absorbance value"
                      min={0.1}
                      max={2.0}
                      step={0.05}
                      value={specA260}
                      onChange={(e) => setSpecA260(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Absorbance at 280 nm (A280 - Proteins): {specA280}</label>
                    <input
                      type="range"
                      aria-label="Set A280 absorbance value"
                      min={0.1}
                      max={2.0}
                      step={0.05}
                      value={specA280}
                      onChange={(e) => setSpecA280(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-around text-center">
                  <div>
                    <span className="text-xs text-slate-400">Purity Ratio (A260/A280)</span>
                    <p className="text-xl font-bold text-emerald-400">{(specA260 / specA280).toFixed(2)}</p>
                    <span className="text-xs text-slate-500">
                      {specA260 / specA280 >= 1.75 && specA260 / specA280 <= 1.85
                        ? '✓ Pure Double-Stranded DNA'
                        : specA260 / specA280 >= 1.95 && specA260 / specA280 <= 2.05
                        ? '✓ Pure RNA'
                        : specA260 / specA280 < 1.75
                        ? '✗ Protein / Phenol Contamination'
                        : '✗ Residual RNA / Degraded'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Estimated [dsDNA]</span>
                    <p className="text-xl font-bold text-indigo-400">{(specA260 * 50).toFixed(1)} μg/mL</p>
                    <span className="text-xs text-slate-500">(A260 × 50 μg/mL)</span>
                  </div>
                </div>
              </div>
            )}

            {sandboxTab === 'codon' && (
              <div className="text-center space-y-3">
                <p className="text-xs text-slate-400">Test any triplet codon combination to view its universal amino acid match.</p>
                <p className="text-2xl font-mono font-bold text-emerald-400">
                  Codon: 5\'-{selectedCodonBase1}{selectedCodonBase2}{selectedCodonBase3}-3\' ➔ {translatedAminoAcid.name}
                </p>
              </div>
            )}

            {sandboxTab === 'replication' && (
              <div className="space-y-3 text-center">
                <p className="text-xs text-slate-400">Replication fork state with continuous leading and discontinuous lagging synthesis.</p>
                <div className="flex justify-center gap-4 text-xs font-semibold">
                  <span className="text-emerald-400">✓ Leading Strand: 5\'➔3\' continuous</span>
                  <span className="text-amber-400">⚡ Lagging Strand: Okazaki fragments</span>
                </div>
              </div>
            )}
          </div>

          <motion.button
            aria-label="Ready for board-level challenges"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-xl shadow-indigo-600/30 text-center"
          >
            Ready for Challenges! Test Your Mastery →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE BKT + NEP 2020) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Mastery Status */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 font-mono">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 bg-slate-800 rounded-md text-slate-300 font-semibold uppercase">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                Node {challenge.nodeId}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Tier:</span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-700/60'
                    : 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/60'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Body */}
          <div className="p-6 bg-slate-850 rounded-2xl border border-slate-700 shadow-xl space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Render */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => {
                  const isCorrect = i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-center justify-between ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-rose-500 text-rose-100'
                          : showExplanation && isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-indigo-500 hover:bg-slate-850'
                      }`}
                    >
                      <span>
                        <span className="font-mono text-indigo-400 mr-2">({String.fromCharCode(65 + i)})</span> {opt}
                      </span>
                      {showExplanation && (
                        <span className="font-bold text-sm ml-2">
                          {isCorrect ? '✓ Correct' : ''}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Drag-Label Render */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target for ${targetId}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[70px] flex flex-col items-center justify-center ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs uppercase text-slate-500 font-mono mb-1">{targetId}</span>
                      <p className="text-sm">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop component label here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify nucleotide diagram labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Render */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Sortable step ${dIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="px-2 py-0.5 bg-indigo-900/60 text-indigo-300 rounded font-mono text-xs">
                      {dIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Confirm replication sequence order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* Numeric Render */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label={`Input answer in ${challenge.unit || 'units'}`}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-sm text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric calculated answer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow"
                  >
                    Submit Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Render */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-medium">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pI) => (
                    <motion.button
                      key={pI}
                      aria-label={`Add ${part} to transcript construct`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, cIdx) => (
                    <motion.div
                      key={cIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-indigo-600 rounded-lg text-xs font-bold text-white flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== cIdx))}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble the linear mRNA chain</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify constructed transcript sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow"
                >
                  Verify Constructed Transcript
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span>📖 Molecular Walkthrough</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{sIdx + 1}.</span>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next explanation sentence"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="mt-2 px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                  >
                    Reveal Next Sentence →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Advance to next challenge or complete"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation ➔' : 'Next Challenge ➔'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950/60 rounded-3xl border border-indigo-700/50 shadow-2xl text-center space-y-4">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Genome Synthesis Mastery Achieved!</h2>
            
            {/* Motivational Feedback Banner */}
            <div className={`p-4 rounded-2xl border text-base sm:text-lg font-bold ${
              errors === 0
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : errors <= 3
                ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200'
                : errors <= 7
                ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                : 'bg-rose-950/80 border-rose-500 text-rose-200'
            }`}>
              {errors === 0 && '🌟 '}
              {errors >= 1 && errors <= 3 && '👏 '}
              {errors >= 4 && errors <= 7 && '💪 '}
              {errors >= 8 && '🌱 '}
              {motivationalMessage}
            </div>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              You have successfully completed the comprehensive Class 12 Molecular Biotechnology simulation covering DNA structure, replication enzymology, transcription split genes, and the genetic code.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 uppercase font-semibold">Final Score</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 uppercase font-semibold">Mastery Tier</span>
                <p className="text-3xl font-black text-indigo-400 mt-1 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Errors</span>
                <p className="text-3xl font-black text-pink-400 mt-1">{errors}</p>
              </div>
            </div>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border-2 border-amber-500/60 rounded-3xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <h3 className="text-base font-bold text-amber-300 uppercase tracking-wider">
                  Spaced Repetition Schedule (SM-2 SRS)
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Memory Retention
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-amber-600/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-medium">Recommended Next Review Window:</p>
                <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  Next Review: <span className="text-amber-400 underline decoration-amber-400/50">review in {srsReviewInterval}</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {errors === 0
                    ? '🎯 Zero mistakes! Long interval assigned for long-term neural consolidation.'
                    : errors <= 3
                    ? '⚡ Few slips detected. Intermediate interval assigned to solidify key pathways.'
                    : '🔄 High challenge detected. Short review interval scheduled for active retrieval practice.'}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 gap-2">
                <span className="text-xs text-slate-400">Scheduled In:</span>
                <span className="px-4 py-2 bg-amber-500 text-slate-950 font-black rounded-xl text-sm shadow-md shadow-amber-500/30 whitespace-nowrap">
                  {srsReviewInterval}
                </span>
              </div>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-850 rounded-2xl border border-indigo-900/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
              <span>💭 Molecular Biology Self-Reflection</span>
            </div>
            <p className="text-xs text-slate-400">
              Consolidate your conceptual breakthroughs and reflect on the molecular mechanisms explored today:
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflections.surprising}
                  onChange={(e) => setReflections(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How 3'->5' exonuclease proofreading acts like a real-time molecular backspace key..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflections.explain}
                  onChange={(e) => setReflections(r => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g., DNA is the master blueprint, RNA is the working copy, and exons are the meaningful chapters stitched together..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflections.realLife}
                  onChange={(e) => setReflections(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g., In mRNA vaccine design, PCR diagnostics, RT-PCR viral load assays, and recombinant insulin manufacturing..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                🎯 Targeted Misconception Review
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Board Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-850 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
              <span>🚀 {REAL_WORLD_ACTIVITY.title}</span>
            </div>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="space-y-2 pt-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-indigo-400 font-mono">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE CONDITIONAL POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiotechnologyNucleotidesNucleosidesStructureSim;