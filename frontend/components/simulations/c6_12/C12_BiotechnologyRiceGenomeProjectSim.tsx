'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_BIOTECH_051 = 'c12_biotech_051';
const NODE_C12_BIOTECH_052 = 'c12_biotech_052';
const NODE_C12_BIOTECH_053 = 'c12_biotech_053';
const NODE_C12_BIOTECH_054 = 'c12_biotech_054';
const NODE_C12_BIOTECH_055 = 'c12_biotech_055';
const ALL_NODE_IDS = [
  NODE_C12_BIOTECH_051,
  NODE_C12_BIOTECH_052,
  NODE_C12_BIOTECH_053,
  NODE_C12_BIOTECH_054,
  NODE_C12_BIOTECH_055,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Genomic Medicine & Agritech Revolution',
  intro: 'You are appointed Lead Computational Biotechnologist at the National Institute of Plant Genome Research & AIIMS Collaborative Genomics Centre in New Delhi. A climate-vulnerable coastal rice variety needs submergence tolerance, while an aggressive oncogenic kinase in a pediatric leukemia requires an AI-designed precision inhibitor.',
  context: 'To succeed, you must master human and rice genomics, decode expression patterns via DNA microarrays & SNPs, navigate proteomic databases, engineer bleach- and heat-tolerant enzymes, and leverage AlphaFold2 for targeted drug design.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Comparing genome scale: The Human genome has ~3,000 Mb (3 billion bp) with ~20,000–25,000 genes. The Rice genome (Oryza sativa) has ~430 Mb. How many protein-coding genes does rice possess?',
  options: [
    'Fewer than human (~3,000 genes) because its genome is 7x smaller',
    'Approximately ~37,000 genes — more than humans despite a much smaller genome',
    'Exactly the same (~22,500 genes) due to universal eukaryotic gene density',
    'Over 500,000 genes because plants need extensive photosynthesis enzymes',
  ],
  correctIndex: 1,
  hintAfter: 'Surprising, isn\'t it? Genome size (C-value) does NOT directly correlate with gene count due to differences in non-coding DNA and gene density! Let us explore why.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // Foundation 1: Recall (c12_biotech_051)
  {
    id: 'ch_01',
    nodeId: NODE_C12_BIOTECH_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which cultivar of rice served as the official reference genome sequence for the International Rice Genome Sequencing Project (IRGSP)?',
    options: ['Oryza sativa cv. Nipponbare (japonica)', 'Oryza sativa cv. Basmati 370 (indica)', 'Oryza glaberrima (African rice)', 'Oryza sativa cv. IR64 (indica)'],
    correctIndex: 0,
    explanation: 'The IRGSP consortium chose the Japanese temperate japonica cultivar Nipponbare as the reference standard due to its compact, stable inbred genome of ~430 Mb.',
    hints: [
      'Think of the temperate japonica inbred line chosen by the multinational consortium.',
      'It is a Japanese variety widely known for high assembly quality.',
      'The reference strain name is Nipponbare.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation 2: Drag-label (c12_biotech_052)
  {
    id: 'ch_02',
    nodeId: NODE_C12_BIOTECH_052,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the dual-color cDNA microarray fluorescence readouts to their correct biological transcriptomic states.',
    dragItems: [
      { label: 'Upregulated in Cancer (Cy5)', targetId: 't_red' },
      { label: 'Upregulated in Healthy (Cy3)', targetId: 't_green' },
      { label: 'Equal Expression (Constitutive)', targetId: 't_yellow' },
      { label: 'Silent / Unexpressed Gene', targetId: 't_black' },
    ],
    correctMapping: {
      t_red: 'Upregulated in Cancer (Cy5)',
      t_green: 'Upregulated in Healthy (Cy3)',
      t_yellow: 'Equal Expression (Constitutive)',
      t_black: 'Silent / Unexpressed Gene',
    },
    explanation: 'Cy5 (red) tags tumor cDNA, Cy3 (green) tags normal cDNA. Yellow signifies equal competitive hybridization (red + green), while dark/black spots indicate unexpressed transcripts.',
    hints: [
      'Red laser excites Cy5-labeled tumor transcripts.',
      'Green laser excites Cy3-labeled normal control transcripts.',
      'Combined equal signal yields yellow, while no hybridization produces no fluorescence (black).',
    ],
    misconceptionIndex: 1,
  },
  // Foundation 3: Recall (c12_biotech_053)
  {
    id: 'ch_03',
    nodeId: NODE_C12_BIOTECH_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which biological database is the dedicated global archive for experimentally determined 3D macromolecular atomic coordinates obtained via X-ray crystallography and Cryo-EM?',
    options: ['Protein Data Bank (PDB)', 'SWISS-PROT / UniProtKB', 'PIR (Protein Information Resource)', 'GenBank (NCBI)'],
    correctIndex: 0,
    explanation: 'PDB (Protein Data Bank) is the primary worldwide repository for 3D atomic coordinates, whereas SWISS-PROT and PIR are sequence and functional annotation databases.',
    hints: [
      'We are looking for three-dimensional coordinate files (such as .pdb format).',
      'It was established in 1971 at Brookhaven National Laboratory.',
      'The abbreviation is PDB.',
    ],
    misconceptionIndex: 2,
  },
  // Foundation 4: Understanding (c12_biotech_054)
  {
    id: 'ch_04',
    nodeId: NODE_C12_BIOTECH_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does Rational Design in protein engineering fundamentally differ from Directed Evolution?',
    options: [
      'Rational design requires detailed 3D structure and uses site-directed mutagenesis; directed evolution uses random mutagenesis and laboratory selection',
      'Rational design uses random PCR errors; directed evolution is exclusively computational without wet-lab testing',
      'Directed evolution only works on RNA, whereas rational design works only on carbohydrate synthesis',
      'Both are identical in protocol and depend on blind random selection without prior knowledge',
    ],
    correctIndex: 0,
    explanation: 'Rational design is knowledge-driven (blueprint-first with site-directed mutagenesis), whereas directed evolution mimics Darwinian natural selection in vitro via iterative mutagenesis and high-throughput screening.',
    hints: [
      'Think about which method requires knowing the 3D active site beforehand.',
      'One is hypothesis-driven based on structural coordinates, the other tests millions of random variants.',
      'Option 1 correctly contrasts structural knowledge with random screening.',
    ],
    misconceptionIndex: 3,
  },
  // Foundation 5: Recall (c12_biotech_055)
  {
    id: 'ch_05',
    nodeId: NODE_C12_BIOTECH_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What revolutionary computational breakthrough did DeepMind\'s AlphaFold2 achieve in modern structural biotechnology?',
    options: [
      'Predicting highly accurate 3D protein structures directly from primary amino acid sequences',
      'Replacing human clinical trial phases with automated social media surveys',
      'Synthesizing synthetic insulin without recombinant host bacterial expression',
      'Sequencing DNA strands without chemical nucleotides or fluorophores',
    ],
    correctIndex: 0,
    explanation: 'AlphaFold2 solved the 50-year-old protein-folding challenge by predicting atomic-resolution 3D structures from 1D primary amino acid sequences using deep neural networks.',
    hints: [
      'It addresses the fundamental sequence-to-structure problem.',
      'It translates the 1D amino acid string into folded 3D coordinates.',
      'AlphaFold2 predicts protein structures with near-crystallographic accuracy.',
    ],
    misconceptionIndex: 4,
  },
  // Foundation 6: Match (c12_biotech_053)
  {
    id: 'ch_06',
    nodeId: NODE_C12_BIOTECH_053,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each branch of proteomics to its primary experimental focus:',
    options: [
      'Structural: 3D spatial fold; Functional: Interaction networks/activity; Expression: Quantitative abundance across states',
      'Structural: Abundance; Functional: 3D coordinates; Expression: Protein translation speed',
      'Structural: DNA base pairs; Functional: Lipid synthesis; Expression: PCR cycles',
      'Structural: mRNA decay; Functional: tRNA charging; Expression: Ribosome assembly',
    ],
    correctIndex: 0,
    explanation: 'Structural proteomics focuses on 3D architecture, Functional proteomics maps cellular interactions and pathways, and Expression proteomics quantitatively measures differential abundance.',
    hints: [
      'Look for the definition that connects Structural with 3D architecture.',
      'Expression proteomics deals with quantitative abundance (e.g. tumor vs healthy).',
      'Option 1 provides the exact three-part match.',
    ],
  },
  // Foundation 7: Numeric (c12_biotech_051)
  {
    id: 'ch_07',
    nodeId: NODE_C12_BIOTECH_051,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'The Human Genome Project mapped ~3,000 Megabases (Mb) while the Rice Genome contains ~430 Mb. How many times larger (rounded to 1 decimal place) is the human genome compared to rice?',
    correctAnswer: 7.0,
    tolerance: 0.3,
    unit: 'x larger',
    explanation: '3000 Mb / 430 Mb ≈ 6.98 (approximately 7.0x larger).',
    hints: [
      'Divide human genome size (3000) by rice genome size (430).',
      '3000 / 430 = 6.976...',
      'Rounding to 1 decimal place gives 7.0.',
    ],
  },
  // Standard 1: Application (c12_biotech_051)
  {
    id: 'ch_08',
    nodeId: NODE_C12_BIOTECH_051,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Indian plant breeders in the flood-prone Krishna-Godavari delta used rice genome markers to introgress the SUB1A gene into high-yielding Swarna. What specific trait does this confer?',
    options: [
      'Survival under complete underwater submergence for up to two weeks without death',
      'Complete resistance to chemical glyphosate herbicides',
      'Synthesis of vitamin A precursor beta-carotene in polished endosperm',
      'Dinitrogen fixation directly from atmospheric air without root nodules',
    ],
    correctIndex: 0,
    explanation: 'The SUB1A (Submergence 1A) transcription factor locus allows rice plants to enter a quiescent metabolic state during flash flooding, surviving 14+ days underwater.',
    hints: [
      'SUB1A stands for Submergence tolerance 1A.',
      'It prevents the plant from wasting energy attempting to out-elongate deep floodwaters.',
      'It provides survival during seasonal monsoonal submergence.',
    ],
  },
  // Standard 2: Analysis (c12_biotech_052)
  {
    id: 'ch_09',
    nodeId: NODE_C12_BIOTECH_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why must reverse transcriptase be employed to generate fluorescent cDNA rather than directly hybridizing cellular genomic DNA to gene expression microarrays?',
    options: [
      'Genomic DNA is uniform across all tissues and contains non-transcribed genes and introns, whereas cDNA directly reflects active mRNA transcription levels',
      'Genomic DNA is incapable of hydrogen-bonding to oligonucleotide probes',
      'Reverse transcriptase synthesizes artificial radioactive isotopes needed for laser detection',
      'Microarray probes are synthesized from lipid molecules that only bind retroviral enzymes',
    ],
    correctIndex: 0,
    explanation: 'Every somatic cell has the same genomic DNA. cDNA synthesized from extracted mRNA provides a dynamic snapshot of which genes are actively transcribed into mRNA at that specific moment.',
    hints: [
      'Consider whether genomic DNA changes between a brain cell and a liver cell.',
      'mRNA reflects active expression; converting it to stable cDNA allows hybridisation measurement.',
      'Option 1 explains that cDNA represents active transcriptome abundance.',
    ],
    misconceptionIndex: 1,
  },
  // Standard 3: Drag-sort (c12_biotech_052)
  {
    id: 'ch_10',
    nodeId: NODE_C12_BIOTECH_052,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps of a dual-color comparative DNA microarray experiment in chronological order:',
    sortItems: [
      'Extract total mRNA from normal (control) and diseased (cancer) tissues',
      'Synthesize cDNA labeled with fluorescent dyes (Cy3-green for normal, Cy5-red for cancer)',
      'Co-hybridize mixed labeled cDNAs to the probe-spotted glass microarray slide',
      'Wash away unhybridized strands and scan slide using dual-wavelength confocal laser',
      'Compute Cy5/Cy3 fluorescence intensity ratios to determine up/down-regulated genes',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The standard protocol proceeds: RNA extraction → Fluorescent reverse transcription → Competitive hybridization → Stringent washing and laser scanning → Computational ratio analysis.',
    hints: [
      'You must start with biological sample extraction of mRNA.',
      'cDNA labeling happens before applying sample onto the glass chip.',
      'Laser scanning and ratio calculation occur at the very end.',
    ],
  },
  // Standard 4: Application (c12_biotech_054)
  {
    id: 'ch_11',
    nodeId: NODE_C12_BIOTECH_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In industrial laundry detergents, native Bacillus subtilisin is inactivated by sodium hypochlorite bleach due to oxidation of Met222. How was subtilisin successfully engineered via rational design?',
    options: [
      'Site-directed mutagenesis replaced oxidizable Methionine-222 with non-oxidizable Alanine or Leucine',
      'Directed evolution completely removed the catalytic triad Ser-His-Asp residues',
      'The gene was cloned into mammalian CHO cells without modifying its codon sequence',
      'Bleach was replaced with sulphuric acid in domestic washing powders',
    ],
    correctIndex: 0,
    explanation: 'Rational design identified that Met222 sidechain sulfur is oxidized to sulfoxide by hypochlorite, causing steric hindrance. Substituting Met222 with Ala or Leu preserved catalytic activity while eliminating oxidizability.',
    hints: [
      'Methionine contains an oxidizable sulfur atom.',
      'Replacing it with an aliphatic residue like Alanine or Leucine prevents bleach oxidation.',
      'Site-directed mutagenesis of residue 222 solved the stability problem.',
    ],
    misconceptionIndex: 3,
  },
  // Standard 5: Analysis (c12_biotech_053)
  {
    id: 'ch_12',
    nodeId: NODE_C12_BIOTECH_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is SWISS-PROT regarded as the gold standard for protein functional sequence data compared to unreviewed automated databases?',
    options: [
      'Every entry undergoes rigorous manual curation by expert biologists with peer-reviewed literature cross-references',
      'It contains only synthetic artificial sequences created by computer simulations',
      'It is the only database that stores atomic crystallographic electron density maps',
      'It updates its records solely through automated unverified web-crawling bots',
    ],
    correctIndex: 0,
    explanation: 'SWISS-PROT (the reviewed section of UniProtKB) features manual curation by biocurators, providing verified domain architectures, post-translational modifications, and literature citations.',
    hints: [
      'Look for the phrase emphasizing manual expert review and curation.',
      'Unreviewed sections (TrEMBL) are automated; SWISS-PROT is hand-verified.',
      'Option 1 highlights manual curation and peer-reviewed annotation.',
    ],
    misconceptionIndex: 2,
  },
  // Standard 6: Application (c12_biotech_055)
  {
    id: 'ch_13',
    nodeId: NODE_C12_BIOTECH_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did AI-assisted structural modeling and epitope prediction accelerate mRNA COVID-19 vaccine (e.g., Spike protein) development?',
    options: [
      'By predicting the prefusion 2P/hexapro stabilized spike conformation and mapping neutralizing antibody epitopes in silico',
      'By replacing the need to administer vaccines to humans through computer simulation of immunity',
      'By converting viral RNA directly into bacterial antibiotics inside the syringe',
      'By modifying host human nuclear DNA to permanently block ribosome translation',
    ],
    correctIndex: 0,
    explanation: 'AI and computational structural biology guided the introduction of stabilizing proline mutations (prefusion spike conformation) and mapped immunogenic epitopes, ensuring optimal neutralizing antibody generation.',
    hints: [
      'The viral spike needs to be frozen in its prefusion state to elicit protective antibodies.',
      'Computational tools mapped surface epitopes and optimized the antigen sequence.',
      'Option 1 correctly describes prefusion stabilization and epitope mapping.',
    ],
  },
  // Standard 7: Construct (c12_biotech_054)
  {
    id: 'ch_14',
    nodeId: NODE_C12_BIOTECH_054,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the synthetic bio-pipeline for Directed Evolution of a thermostable industrial lipase:',
    availableParts: [
      'Error-Prone PCR Mutagenesis',
      'Transform Mutant Library into E. coli',
      'High-Temperature 65°C Tributyrin Agar Screen',
      'Isolate & Sequence Thermostable Clear-Zone Clones',
    ],
    targetState: 'Error-Prone PCR Mutagenesis Transform Mutant Library into E. coli High-Temperature 65°C Tributyrin Agar Screen Isolate & Sequence Thermostable Clear-Zone Clones',
    validationHint: 'Assemble in order: Mutagenesis → Transformation → High-temp assay screen → Clone selection',
    explanation: 'Directed evolution pipeline: Create diversity via error-prone PCR → Transform into host → Screen under selective high-temperature pressure → Select and sequence winning variants.',
    hints: [
      'Start by generating genetic diversity with random error-prone PCR.',
      'Next, introduce the plasmid library into competent bacterial cells.',
      'Apply heat stress (65°C) on indicator plates, then isolate the active clear halos.',
    ],
  },
  // Advanced 1: Evaluation (c12_biotech_051)
  {
    id: 'ch_15',
    nodeId: NODE_C12_BIOTECH_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the biological paradox: Why does the compact rice genome (~430 Mb) encode ~37,000 genes, whereas the much larger human genome (~3,000 Mb) encodes only ~20,000–25,000 genes?',
    options: [
      'The human genome consists of >98% non-coding sequences (introns, transposons, repetitive elements), whereas rice has higher gene density and ancient paleopolyploid duplications',
      'Human cells discard half their genes during embryonic differentiation',
      'Plant genes do not use the standard triplet genetic code, allowing multiple overlapping messages',
      'Human sequencing technologies failed to detect 80% of human genes during HGP',
    ],
    correctIndex: 0,
    explanation: 'The C-value paradox explains that genome size does not equal complexity. Over 98% of the human genome is non-protein-coding DNA (regulatory regions, introns, transposons), while rice has higher coding density and retained duplicated gene families.',
    hints: [
      'Think about what proportion of human DNA actually codes for amino acids.',
      'Only ~1.5% of the human genome is protein-coding exon sequences.',
      'Plants frequently undergo ancestral whole-genome duplications and have high gene density.',
    ],
    misconceptionIndex: 0,
  },
  // Advanced 2: Application (c12_biotech_052)
  {
    id: 'ch_16',
    nodeId: NODE_C12_BIOTECH_052,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A cardiac patient in Kolkata is prescribed the antiplatelet drug Clopidogrel (Plavix). A pharmacogenomic SNP microarray reveals the patient carries homozygous loss-of-function alleles (*2/*2) in CYP2C19. What clinical decision must the physician make?',
    options: [
      'Switch to an alternative drug (e.g. Ticagrelor/Prasugrel) because the patient cannot metabolize Clopidogrel into its active anti-clotting form',
      'Double the dose of Clopidogrel because the patient will clear the drug too rapidly',
      'Administer the drug intravenously with vitamin C to bypass cytochrome enzymes',
      'Ignore the SNP test because single nucleotide polymorphisms never affect hepatic drug metabolism',
    ],
    correctIndex: 0,
    explanation: 'CYP2C19 *2 is a non-functional allele. Clopidogrel is a prodrug requiring CYP2C19 bioactivation. Poor metabolizers (*2/*2) face high risk of stent thrombosis and should receive alternative antiplatelet agents.',
    hints: [
      'Clopidogrel is an inactive prodrug that requires enzymatic activation by CYP2C19.',
      'A poor metabolizer cannot produce the active anti-platelet metabolite.',
      'The physician must switch to an agent that does not depend on CYP2C19 bioactivation.',
    ],
  },
  // Advanced 3: Analysis (c12_biotech_053)
  {
    id: 'ch_17',
    nodeId: NODE_C12_BIOTECH_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In 2D Gel Electrophoresis combined with Tandem Mass Spectrometry (MS/MS) for expression proteomics, what two independent physical properties separate intact proteins across the two dimensions?',
    options: [
      '1st Dimension: Isoelectric Point (pI) via Isoelectric Focusing; 2nd Dimension: Molecular Weight via SDS-PAGE',
      '1st Dimension: DNA base length; 2nd Dimension: Absorbance at 260 nm',
      '1st Dimension: Lipid solubility; 2nd Dimension: Glycosylation percentage',
      '1st Dimension: Centrifugation speed; 2nd Dimension: Radioactivity decay',
    ],
    correctIndex: 0,
    explanation: '2D-PAGE achieves high-resolution protein separation by first resolving proteins along an immobilized pH gradient according to their isoelectric point (pI), followed by orthogonal separation based on molecular weight in SDS-PAGE.',
    hints: [
      'The first dimension uses an immobilized pH gradient (isoelectric focusing).',
      'The second dimension uses SDS detergent to separate by molecular mass.',
      'Option 1 accurately lists Isoelectric Point (pI) and Molecular Weight (SDS-PAGE).',
    ],
  },
  // Advanced 4: Evaluation (c12_biotech_055)
  {
    id: 'ch_18',
    nodeId: NODE_C12_BIOTECH_055,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the clinical paradigm: An AI model discovers an ultra-high affinity small molecule docking against the ATP-binding cleft of oncogenic BCR-ABL kinase in CML. Why are wet-lab preclinical assays still non-negotiable before human trials?',
    options: [
      'In silico docking cannot guarantee biological membrane permeability, off-target hERG/CYP toxicity, in vivo bioavailability, or metabolic clearance',
      'AI models are legally barred from naming chemical structures under international patent treaties',
      'Proteins in living cells do not contain chemical bonds like computer models do',
      'Preclinical testing is only required for herbal remedies, not synthetic molecules',
    ],
    correctIndex: 0,
    explanation: 'While AI models excel at virtual screening and structural affinity prediction, ADMET properties (Absorption, Distribution, Metabolism, Excretion, Toxicity), in vivo stability, and complex physiological off-target reactions require experimental empirical validation.',
    hints: [
      'Computers model binding energy, but cannot simulate whole mammalian physiology completely.',
      'Think about ADMET (Absorption, Distribution, Metabolism, Excretion, Toxicity) parameters.',
      'Option 1 correctly identifies biological bioavailability and off-target toxicities.',
    ],
    misconceptionIndex: 4,
  },
  // Advanced 5: Numeric (c12_biotech_052)
  {
    id: 'ch_19',
    nodeId: NODE_C12_BIOTECH_052,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'SNPs occur on average once every 300 base pairs across the 3,000,000,000 bp human genome. Calculate the estimated total number of SNP positions (in millions, rounded to integer):',
    correctAnswer: 10,
    tolerance: 0.5,
    unit: 'million SNPs',
    explanation: '3,000,000,000 bp / 300 bp = 10,000,000 SNPs = 10 million single nucleotide polymorphisms.',
    hints: [
      'Divide 3 billion (3,000,000,000) by 300.',
      '3,000,000,000 / 300 = 10,000,000.',
      'In millions, that is 10 million SNPs.',
    ],
  },
  // Advanced 6: Creativity (c12_biotech_054)
  {
    id: 'ch_20',
    nodeId: NODE_C12_BIOTECH_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To create rapid-acting therapeutic insulin (Insulin Lispro / Humalog), protein engineers inverted the sequence of two adjacent residues at positions B28 and B29. What was the exact modification and its biophysical consequence?',
    options: [
      'Proline-B28 and Lysine-B29 were switched to LysB28-ProB29, preventing hexamer dimerization and promoting instantaneous monomer absorption',
      'The entire A-chain was replaced with synthetic bovine glucagon',
      'Disulfide bonds between A and B chains were permanently eliminated',
      'Glycine was inserted at 10 consecutive positions to create an insoluble crystal depot',
    ],
    correctIndex: 0,
    explanation: 'In native insulin, Pro28-Lys29 favors hexamer assembly which delays absorption. Inverting to Lys28-Pro29 in Insulin Lispro weakens self-association, allowing the active monomer to dissociate instantly for rapid postprandial glycemic control.',
    hints: [
      'Native insulin hexamers must break down into monomers before entering capillaries.',
      'The conformational switch of Pro28 and Lys29 stops hexamer aggregation.',
      'Option 1 specifies the LysB28-ProB29 inversion that creates fast-acting Humalog.',
    ],
  },
  // Advanced 7: Analysis (c12_biotech_055)
  {
    id: 'ch_21',
    nodeId: NODE_C12_BIOTECH_055,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In precision oncology, how does AI-driven multi-omics targeting prevent drug resistance compared to traditional monotherapy?',
    options: [
      'AI predicts secondary bypass mutations in oncogenic kinases and designs synthetic lethal combination therapies targeting parallel signaling hubs',
      'AI physically repairs somatic chromosomal translocations directly inside circulating lymphocytes',
      'AI deactivates all ribosomal translation in the human body simultaneously',
      'AI replaces all intracellular enzymes with non-protein nanobots',
    ],
    correctIndex: 0,
    explanation: 'AI algorithms analyze genomic, transcriptomic, and proteomic datasets to anticipate resistance mutations (e.g. T790M in EGFR) and rationally design dual-inhibitor combination regimens before clinical relapse occurs.',
    hints: [
      'Tumors often develop resistance by mutating the binding site or activating collateral pathways.',
      'AI models predict these resistance trajectories and suggest combination therapies.',
      'Option 1 articulates synthetic lethality and predictive mutation modeling.',
    ],
  },
  // Advanced 8: Drag-label (c12_biotech_053)
  {
    id: 'ch_22',
    nodeId: NODE_C12_BIOTECH_053,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Assign the bioinformatics resource to its specialized biological data domain:',
    dragItems: [
      { label: 'PDB: 3D Atomic Coordinates', targetId: 't_res_pdb' },
      { label: 'SWISS-PROT: Curated Sequences & Function', targetId: 't_res_sp' },
      { label: 'PIR: Protein Sequence Classification', targetId: 't_res_pir' },
      { label: 'AlphaFold DB: AI Predicted 3D Structures', targetId: 't_res_af' },
    ],
    correctMapping: {
      t_res_pdb: 'PDB: 3D Atomic Coordinates',
      t_res_sp: 'SWISS-PROT: Curated Sequences & Function',
      t_res_pir: 'PIR: Protein Sequence Classification',
      t_res_af: 'AlphaFold DB: AI Predicted 3D Structures',
    },
    explanation: 'PDB archives experimental structures, SWISS-PROT provides gold-standard curated functional sequences, PIR provides sequence family classification, and AlphaFold DB hosts AI-predicted proteome-wide folds.',
    hints: [
      'PDB = Experimental 3D coordinates from X-ray and Cryo-EM.',
      'SWISS-PROT = Expert-reviewed functional curation.',
      'AlphaFold DB = Deep learning predicted structures covering over 200 million proteins.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BIOTECH_051,
  title: 'Genomics, Proteomics & AI Drug Discovery Lab',
  definition: 'Comprehensive mastery of the Rice Genome Project (430 Mb, ~37,000 genes) vs Human Genome Project (3,000 Mb, ~20,000–25,000 genes), dual-channel DNA microarrays & SNP genotyping, structural/functional/expression proteomics (PDB, PIR, SWISS-PROT), rational vs directed protein engineering (bleach-stable subtilisin, Lispro insulin), and AlphaFold2 AI-powered precision drug design.',
  eli5: 'Think of genomics as reading the entire instruction manual of life (humans have a 3-billion-letter book, rice has a 430-million-letter book with surprisingly more recipes!). Microarrays are like glow-in-the-dark heatmaps showing which recipes are being cooked. Proteomics inspects the actual machinery inside the cell. Protein engineers tweak the parts to make them heatproof or faster-acting, and AI (AlphaFold2) predicts the exact 3D shape of disease locks to design custom drug keys in record time.',
  misconceptions: [
    {
      misconception: 'A larger genome size always means more protein-coding genes (C-value paradox misconception).',
      correction: 'Genome size does NOT dictate gene count. Over 98% of the human 3,000 Mb genome is non-coding, yielding ~20,000–25,000 genes, whereas the compact 430 Mb rice genome possesses ~37,000 genes.',
    },
    {
      misconception: 'DNA microarrays determine the complete unknown base-by-base sequence of whole genomes.',
      correction: 'Microarrays do NOT sequence de novo. They measure relative hybridization abundance of known probes or genotype predetermined SNPs via fluorescence.',
    },
    {
      misconception: 'PDB, PIR, and SWISS-PROT are interchangeable sequence archives with identical data.',
      correction: 'PDB archives experimentally determined 3D atomic coordinates; PIR focuses on sequence families; SWISS-PROT provides manually curated sequence and functional literature annotations.',
    },
    {
      misconception: 'Directed evolution is purely a theoretical computer algorithm that requires no lab experiments.',
      correction: 'Directed evolution is an empirical wet-lab process involving real random mutagenesis (error-prone PCR) and high-throughput physical screening under selection pressure.',
    },
    {
      misconception: 'AI (AlphaFold2) completely eliminates the necessity for biological wet-lab tests and clinical trials.',
      correction: 'AI provides high-precision structural models and candidate leads, but empirical cell culture assays, animal toxicity tests, and clinical trials remain mandatory to confirm safety and efficacy.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What was the reference genome size of the Rice Genome Project?', options: ['430 Megabases (Mb)', '3,000 Mb', '100 Gigabases', '4.6 Mb'], correctIndex: 0 },
    { question: 'What does a bright yellow spot represent on a dual-labeled cDNA microarray?', options: ['Equal expression in both control and experimental samples', 'Contamination by bacterial RNA', 'Complete gene deletion', 'Overexpression solely in cancer cells'], correctIndex: 0 },
    { question: 'Which database should you access to retrieve 3D X-ray crystal coordinates of an enzyme?', options: ['PDB (Protein Data Bank)', 'GenBank', 'PIR', 'EMBL-EBI Sequence Store'], correctIndex: 0 },
    { question: 'Which technique is the cornerstone of Rational Design in protein engineering?', options: ['Site-directed mutagenesis based on 3D structure', 'Random chemical mutagenesis without structure', 'Cross-breeding two plant species', 'Radiation-induced chromosome shattering'], correctIndex: 0 },
    { question: 'What primary input does AlphaFold2 require to predict a 3D folded macromolecular structure?', options: ['Primary 1D amino acid sequence', 'X-ray diffraction pattern only', 'Whole blood serum sample', 'Electron microscope vacuum grid'], correctIndex: 0 },
    { question: 'How frequently do Single Nucleotide Polymorphisms (SNPs) occur in the human genome on average?', options: ['Approximately every 300 base pairs', 'Once every 10 million base pairs', 'Only in individuals with genetic disease', 'Exactly once per chromosome'], correctIndex: 0 },
    { question: 'Which engineered insulin analogue features inverted ProB28 and LysB29 for rapid absorption?', options: ['Insulin Lispro (Humalog)', 'Insulin Glargine (Lantus)', 'Bovine natural insulin', 'Porcine NPH insulin'], correctIndex: 0 },
    { question: 'What is the primary agricultural target of the SUB1A gene identified through rice genomics?', options: ['Flash flood submergence tolerance', 'Golden yellow grain color', 'Resistance to fungal blast only', 'High iron accumulation in leaves'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student accurately contrasts HGP and RGP metrics, interprets dual-channel microarray & SNP pharmacogenomics, differentiates proteomics branches & databases, explains rational vs directed protein engineering, and evaluates AI drug targeting.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'HGP vs Rice Genome Project: The C-Value Puzzle',
    instruction: 'Drag the Genome Slider to contrast Human (3,000 Mb) vs Rice (430 Mb) and discover why gene density defies genome size!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIOTECH_051,
  },
  {
    title: 'DNA Microarray Dual-Channel Laser Scanner',
    instruction: 'Toggle between Green Laser (532 nm Cy3: Healthy) and Red Laser (635 nm Cy5: Cancer) to decode gene expression ratios.',
    interactionType: 'laser-scan',
    nodeId: NODE_C12_BIOTECH_052,
  },
  {
    title: 'Proteomic Database Architecture: PDB, PIR & SWISS-PROT',
    instruction: 'Click each database terminal to inspect how raw 3D coordinates, sequence families, and curated pathways interconnect.',
    interactionType: 'click-database',
    nodeId: NODE_C12_BIOTECH_053,
  },
  {
    title: 'Protein Engineering Studio: Rational vs Directed Evolution',
    instruction: 'Mutate residue Met222 in Subtilisin to Alanine and test its enzyme activity in high bleach concentration!',
    interactionType: 'mutate-enzyme',
    nodeId: NODE_C12_BIOTECH_054,
  },
  {
    title: 'AlphaFold2 AI Drug Docking Simulator',
    instruction: 'Adjust ligand binding affinity sliders to dock an AI-designed inhibitor into the BCR-ABL oncogenic kinase pocket.',
    interactionType: 'ai-docking',
    nodeId: NODE_C12_BIOTECH_055,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an aggressive lung carcinoma overexpresses the EGFR gene by 10-fold relative to healthy lung tissue, what color will the EGFR probe spot show under dual laser illumination?',
    options: ['Brilliant Red (Cy5 dominant)', 'Vibrant Green (Cy3 dominant)', 'Bright Yellow (Cy3 + Cy5 equal)', 'Pure Black (No signal)'],
    correctIndex: 0,
    verifyInstruction: 'Select the Red/Green laser ratio simulator below to test how heavy Cy5 tumor labeling creates vivid red fluorescence!',
    nodeId: NODE_C12_BIOTECH_052,
  },
  {
    question: 'Predict: If wild-type subtilisin enzyme is placed in a 5% sodium hypochlorite bleach wash at 50°C, what will happen to its Met222 residue and catalytic activity?',
    options: ['Met222 sulfur is oxidized into sulfoxide, destroying substrate binding and terminating activity', 'Met222 folds into an alpha-helix, doubling catalytic rate', 'The enzyme turns into a DNA polymerase', 'No effect because methionine is impervious to chemical oxidation'],
    correctIndex: 0,
    verifyInstruction: 'Use the Protein Engineering interactive tool to simulate bleach exposure on Met222 vs Ala222!',
    nodeId: NODE_C12_BIOTECH_054,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the gene density (genes per Megabase) when comparing Rice with Human DNA?',
    observableOptions: [
      'Rice has ~86 genes/Mb while Human has only ~7–8 genes/Mb — Rice is ~11x denser in coding genes!',
      'Human DNA has 100x higher gene density than any plant species',
      'Both human and rice share identical 50 genes/Mb density',
      'Rice genome contains zero non-coding introns or promoter elements',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIOTECH_051,
  },
  {
    question: 'In the AlphaFold2 docking interface, what happens to binding stability when the inhibitor shape complementarity score exceeds 90%?',
    observableOptions: [
      'Binding free energy (ΔG) becomes highly negative (tight lock), stabilizing the inactive kinase conformation',
      'The protein instantly denatures and evaporates',
      'The ligand turns into mRNA nucleotides',
      'Complementarity has no physical effect on binding thermodynamics',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIOTECH_055,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Investigative Case: Design a Climate-Resilient Biofortified Rice Variety for Indian Coastal Agriculture',
  description: 'Apply genomics and molecular breeding protocols to develop a basmati variety resilient to both flooding and coastal salinity.',
  steps: [
    'Retrieve the Oryza sativa cv. Nipponbare reference chromosome map from Gramene / NCBI databases.',
    'Screen germplasm using SNP microarrays to identify SUB1A (flood tolerance) and Saltol QTL (salinity tolerance) donor alleles.',
    'Execute Marker-Assisted Backcrossing (MABC) into popular high-yielding Basmati lines without compromising 2-acetyl-1-pyrroline fragrance.',
    'Verify candidate expression profiles using differential transcriptomics before field release in coastal Odisha and Bengal.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_BiotechnologyRiceGenomeProjectSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BIOTECH_051,
  title = DEFAULT_PROPS.title || 'Genomics, Proteomics & AI Drug Discovery Lab',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'teal' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── ADAPTIVE DIFFICULTY & BKT ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STATES ───
  const [genomeComparisonVal, setGenomeComparisonVal] = useState(50); // 0 = Rice, 100 = Human
  const [microarrayLaser, setMicroarrayLaser] = useState<'dual' | 'cy3' | 'cy5'>('dual');
  const [selectedSpotIndex, setSelectedSpotIndex] = useState<number | null>(null);
  const [selectedDb, setSelectedDb] = useState<'PDB' | 'PIR' | 'SWISS-PROT'>('PDB');
  const [mutantResidue, setMutantResidue] = useState<'Met222' | 'Ala222' | 'Leu222'>('Met222');
  const [bleachConcentration, setBleachConcentration] = useState(0);
  const [aiDockingAffinity, setAiDockingAffinity] = useState(50);
  const [dockingEnergyScore, setDockingEnergyScore] = useState(-5.4);

  // ─── PREDICTION & OBSERVATION STATES ───
  const [pred1Answered, setPred1Answered] = useState(false);
  const [pred1Choice, setPred1Choice] = useState<number | null>(null);
  const [pred2Answered, setPred2Answered] = useState(false);
  const [pred2Choice, setPred2Choice] = useState<number | null>(null);
  const [obs1Answered, setObs1Answered] = useState(false);
  const [obs1Choice, setObs1Choice] = useState<number | null>(null);
  const [obs2Answered, setObs2Answered] = useState(false);
  const [obs2Choice, setObs2Choice] = useState<number | null>(null);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── ESCALATING HINTS & PROGRESSIVE EXPLANATION ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── CHALLENGE INTERACTION STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── FEEDBACK VISUALS ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── CANVAS 2D ANIMATION REF ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── FILTER CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── UPDATE DIFFICULTY WHEN BKT CHANGES ───
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

  // ─── REAL-TIME DERIVED VALUES ───
  const subtilisinActivity = useMemo(() => {
    if (mutantResidue === 'Met222') {
      return Math.max(0, 100 - bleachConcentration * 18);
    } else if (mutantResidue === 'Ala222') {
      return Math.max(15, 92 - bleachConcentration * 1.5);
    } else {
      return Math.max(10, 88 - bleachConcentration * 2.2);
    }
  }, [mutantResidue, bleachConcentration]);

  useEffect(() => {
    const energy = -2.0 - (aiDockingAffinity * 0.085);
    setDockingEnergyScore(parseFloat(energy.toFixed(2)));
  }, [aiDockingAffinity]);

  // ─── 2D CANVAS ANIMATION (AlphaFold2 Ribbon & DNA double helix simulation) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      step += 0.035;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Strand 1: Cyan
      ctx.beginPath();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      for (let x = 0; x < width; x += 4) {
        const y = midY + Math.sin(x * 0.02 + step) * 22;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Strand 2: Magenta
      ctx.beginPath();
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 3;
      for (let x = 0; x < width; x += 4) {
        const y = midY + Math.sin(x * 0.02 + step + Math.PI) * 22;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Base pairs
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      for (let x = 12; x < width; x += 24) {
        const y1 = midY + Math.sin(x * 0.02 + step) * 22;
        const y2 = midY + Math.sin(x * 0.02 + step + Math.PI) * 22;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();

        ctx.fillStyle = (x % 48 === 0) ? '#10b981' : '#f59e0b';
        ctx.beginPath();
        ctx.arc(x, (y1 + y2) / 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACKS ───
  const handleDiscoverySubmit = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Brilliant deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Biotechnology Exploration Lab.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode unlocked. Experiment with all tools without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Starting competency-based challenge assessments.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && activeChallenge.hints[nextLvl - 1]) {
      const hintMsg = activeChallenge.hints[nextLvl - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Genomics and AI Biotechnology Lab.');
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(val - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(s => ({ correct: s.correct + 1, total: s.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent scientific reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4200);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify({ mastery: 'mastered', date: Date.now() }));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the underlying biological mechanism.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 6000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetMatch = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetMatch) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let currentArr = prev;
      if (currentArr.length === 0 && activeChallenge.sortItems) {
        currentArr = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...currentArr];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0
      ? sortArrangement
      : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleMicroarraySpotClick = useCallback((idx: number, geneName: string, ratio: string) => {
    setSelectedSpotIndex(idx);
    audioManager.play('tap');
    speechManager.speak(`Spot selected: ${geneName}. Expression ratio is ${ratio}.`);
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── SAMPLE MICROARRAY GRID DATA ───
  const MICROARRAY_SPOTS = useMemo(() => [
    { id: 0, gene: 'EGFR (Oncogene)', cy3: 20, cy5: 95, color: '#ef4444', label: 'Overexpressed in Tumor (Cy5 Red)' },
    { id: 1, gene: 'GAPDH (Housekeeping)', cy3: 80, cy5: 82, color: '#eab308', label: 'Equal Expression (Cy3+Cy5 Yellow)' },
    { id: 2, gene: 'p53 (Tumor Suppressor)', cy3: 90, cy5: 15, color: '#22c55e', label: 'Downregulated in Tumor (Cy3 Green)' },
    { id: 3, gene: 'HER2 (Kinase Receptor)', cy3: 15, cy5: 98, color: '#ef4444', label: 'Overexpressed in Tumor (Cy5 Red)' },
    { id: 4, gene: 'Actin Beta', cy3: 75, cy5: 78, color: '#eab308', label: 'Equal Expression (Cy3+Cy5 Yellow)' },
    { id: 5, gene: 'BRCA1 (DNA Repair)', cy3: 88, cy5: 12, color: '#22c55e', label: 'Downregulated in Tumor (Cy3 Green)' },
    { id: 6, gene: 'Olfactory Receptor 5', cy3: 2, cy5: 1, color: '#0f172a', label: 'Unexpressed / Silent Gene' },
    { id: 7, gene: 'VEGF-A (Angiogenesis)', cy3: 25, cy5: 90, color: '#ef4444', label: 'Overexpressed in Tumor (Cy5 Red)' },
  ], []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-2xl text-3xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-800">
                ISC Class 12 • Biotechnology
              </span>
              <span className="text-xs text-slate-400">• CISCE 2026 Core Syllabus</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">{title}</h1>
          </div>
        </div>

        {/* Status / Phase Badges */}
        <div className="flex items-center gap-3">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-xs px-3 py-1 font-bold rounded-xl border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                  : 'bg-gold-950/80 text-gold-300 border-gold-700'
              }`}
            >
              TIER: {difficulty.toUpperCase()}
            </motion.span>
          )}
          <span className="text-xs bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 font-mono">
            Phase: <strong className="text-teal-400 uppercase">{phase}</strong>
          </span>
        </div>
      </motion.header>

      {/* ─── LIVE 2D HELIX & STRUCTURE CANVAS ─── */}
      <div className="relative mb-6 rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 p-2 shadow-inner">
        <canvas ref={canvasRef} width={800} height={60} className="w-full h-14 block" />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
            Real-Time Molecular State Engine: Active
          </span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────���──────
          PHASE 1: DISCOVERY PHASE
         ────────────────────────────────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-teal-950/50 via-slate-900 to-gold-950/40 rounded-3xl border border-teal-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-teal-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️</span> Narrative Mission Briefing
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs md:text-sm text-teal-200/90 font-mono">
              💡 <strong>Mission Objectives:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 bg-amber-950/50 px-3 py-1 rounded-full border border-amber-700/60">
                Curiosity Discovery Hook • No Stakes
              </span>
              <span className="text-xs text-slate-400 font-mono">Prediction Phase</span>
            </div>

            <p className="text-base md:text-lg font-semibold text-white mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015, x: 3 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoverySubmit(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                  className={`p-4 text-left text-sm rounded-2xl border transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-teal-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-teal-400 mt-0.5">[{String.fromCharCode(65 + idx)}]</span>
                    <span>{opt}</span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-emerald-400 font-bold text-base">✓</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mt-4">
                <p className={`text-sm mb-4 ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ PERFECT DEDUCTION! You understand the C-value paradox!' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Discovery Labs"
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-gold-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-teal-500/20 text-sm flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          PHASE 2: INTERACTIVE GUIDED EXPLORATION (Brilliant.org Core)
         ────────────────────────────────────────────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Progress & Tab Switcher */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Interactive Guided Lab</span>
              <h2 className="text-xl font-bold text-white">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
              </h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-teal-400' : i < currentSlide ? 'w-3 bg-teal-800' : 'w-3 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-teal-950/30 border border-teal-800/50 rounded-2xl text-teal-200 text-sm flex items-center gap-3">
            <span className="text-lg">👉</span>
            <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
          </div>

          {/* Interactive Screen Display Based on Step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl min-h-[380px]"
            >
              {/* ─── SLIDE 0: HGP vs RGP COMPARISON (WITH SVG 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* TOPIC SVG 1: Genome Scale & C-Value Paradox Diagram */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-xs font-mono text-teal-400 mb-2">Comparative Karyotype & Coding Exon Density</span>
                    <svg viewBox="0 0 600 160" className="w-full max-w-[550px] h-36">
                      <rect x="20" y="20" width="560" height="120" rx="12" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
                      
                      {/* Rice Genome Bar */}
                      <text x="40" y="50" fill="#34d399" fontSize="12" fontWeight="bold">🌾 Rice (Oryza sativa): 430 Mb</text>
                      <rect x="40" y="58" width="70" height="18" rx="4" fill="#059669" stroke="#34d399" strokeWidth="1" />
                      <text x="120" y="72" fill="#94a3b8" fontSize="10">~37,000 Genes (Dense: ~86 genes/Mb)</text>
                      
                      {/* Exon segments for Rice */}
                      <rect x="42" y="60" width="10" height="14" fill="#6ee7b7" />
                      <rect x="56" y="60" width="12" height="14" fill="#6ee7b7" />
                      <rect x="72" y="60" width="14" height="14" fill="#6ee7b7" />
                      <rect x="90" y="60" width="16" height="14" fill="#6ee7b7" />

                      {/* Human Genome Bar */}
                      <text x="40" y="105" fill="#818cf8" fontSize="12" fontWeight="bold">���� Human (Homo sapiens): 3,000 Mb (7x larger)</text>
                      <rect x="40" y="113" width="490" height="18" rx="4" fill="#312e81" stroke="#6366f1" strokeWidth="1" />
                      <text x="360" y="127" fill="#c7d2fe" fontSize="10">~20,000–25,000 Genes (Only ~1.5% coding)</text>
                      
                      {/* Sparse exons in Human */}
                      <rect x="70" y="115" width="6" height="14" fill="#a5b4fc" />
                      <rect x="200" y="115" width="5" height="14" fill="#a5b4fc" />
                      <rect x="340" y="115" width="6" height="14" fill="#a5b4fc" />
                      <rect x="470" y="115" width="7" height="14" fill="#a5b4fc" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Rice Card */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                          🌾 Rice Genome (IRGSP 2005)
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Oryza sativa cv. Nipponbare</span>
                      </div>
                      <div className="space-y-2 text-sm text-slate-300">
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                          <span className="text-slate-400">Genome Size:</span>
                          <strong className="text-white font-mono">430 Megabases (Mb)</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                          <span className="text-slate-400">Protein-Coding Genes:</span>
                          <strong className="text-emerald-400 font-mono">~37,000 genes</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                          <span className="text-slate-400">Gene Density:</span>
                          <strong className="text-teal-300 font-mono">~86 genes / Mb</strong>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Primary Agricultural Impact:</span>
                          <span className="text-amber-300 font-medium">Yield, SUB1A flood tolerance, Saltol</span>
                        </div>
                      </div>
                    </div>

                    {/* Human Card */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gold-400 bg-gold-950/80 px-2.5 py-1 rounded-lg border border-gold-800">
                          👤 Human Genome Project (HGP 1990–2003)
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Homo sapiens</span>
                      </div>
                      <div className="space-y-2 text-sm text-slate-300">
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                          <span className="text-slate-400">Genome Size:</span>
                          <strong className="text-white font-mono">3,000 Megabases (3 Gb)</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                          <span className="text-slate-400">Protein-Coding Genes:</span>
                          <strong className="text-gold-400 font-mono">~20,000–25,000 genes</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                          <span className="text-slate-400">Gene Density:</span>
                          <strong className="text-slate-400 font-mono">~7.5 genes / Mb</strong>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Primary Medical Impact:</span>
                          <span className="text-amber-300 font-medium">Disease genes, pharmacogenomics, ELSI</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Slider */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <label className="text-xs font-mono text-slate-400 flex justify-between mb-2">
                      <span>Genome Scale Comparison Slider:</span>
                      <span className="text-teal-400 font-bold">{genomeComparisonVal < 50 ? 'Focusing on Rice (430 Mb)' : 'Focusing on Human (3,000 Mb)'}</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={genomeComparisonVal}
                      onChange={e => setGenomeComparisonVal(Number(e.target.value))}
                      aria-label="Genome Scale Comparison Slider between Rice and Human"
                      className="w-full accent-teal-500 cursor-pointer"
                    />

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                        <span>Rice: 430 Mb (14.3%)</span>
                        <span>Human: 3,000 Mb (100%)</span>
                      </div>
                      <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full" style={{ width: '14.3%' }} />
                        <div className="bg-gold-600 h-full flex-1" />
                      </div>
                    </div>
                  </div>

                  {/* Observation Q1 Integration */}
                  {!obs1Answered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gold-950/30 rounded-2xl border border-gold-800/50">
                      <p className="text-sm font-semibold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            onClick={() => {
                              setObs1Choice(i);
                              setObs1Answered(true);
                              audioManager.play(i === OBSERVATION_QUESTIONS[0].correctIndex ? 'success' : 'pop');
                            }}
                            className="w-full p-2.5 text-left text-xs bg-slate-800/90 rounded-xl text-slate-200 hover:bg-slate-700 flex items-center justify-between"
                          >
                            <span>{opt}</span>
                            {obs1Answered && (i === OBSERVATION_QUESTIONS[0].correctIndex ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-rose-400">✗</span>)}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── SLIDE 1: DNA MICROARRAY 2-COLOR SCANNER (WITH SVG 2) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-5">
                  {/* TOPIC SVG 2: Microarray Dual-Laser Excitation Schematic */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-xs font-mono text-teal-400 mb-2">Dual-Channel Confocal Laser Scanner Hybridization</span>
                    <svg viewBox="0 0 540 140" className="w-full max-w-[500px] h-32">
                      <rect x="10" y="10" width="520" height="120" rx="10" fill="#0b1329" stroke="#1e293b" strokeWidth="1.5" />
                      
                      {/* Laser Beams */}
                      <path d="M 40,35 L 180,70" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 2" />
                      <text x="35" y="25" fill="#22c55e" fontSize="10" fontWeight="bold">532 nm Cy3 (Healthy)</text>
                      
                      <path d="M 40,110 L 180,75" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" />
                      <text x="35" y="125" fill="#ef4444" fontSize="10" fontWeight="bold">635 nm Cy5 (Tumor)</text>

                      {/* Glass Slide Chip */}
                      <rect x="180" y="30" width="160" height="80" rx="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                      <text x="260" y="22" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Glass Microarray Chip</text>

                      {/* Hybridized Spot Matrix */}
                      <circle cx="210" cy="50" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                      <text x="210" y="53" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">EGFR</text>

                      <circle cx="245" cy="50" r="10" fill="#eab308" stroke="#ffffff" strokeWidth="1" />
                      <text x="245" y="53" textAnchor="middle" fill="#000000" fontSize="7" fontWeight="bold">ACTB</text>

                      <circle cx="280" cy="50" r="10" fill="#22c55e" stroke="#ffffff" strokeWidth="1" />
                      <text x="280" y="53" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">p53</text>

                      <circle cx="315" cy="50" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                      <text x="315" y="53" textAnchor="middle" fill="#64748b" fontSize="7">OFF</text>

                      {/* Legend on Right */}
                      <text x="360" y="45" fill="#ef4444" fontSize="9">● Red (Cy5 &gt; Cy3): Tumor Upregulated ✓</text>
                      <text x="360" y="65" fill="#22c55e" fontSize="9">● Green (Cy3 &gt; Cy5): Repressed in Tumor ✓</text>
                      <text x="360" y="85" fill="#eab308" fontSize="9">● Yellow (Cy3 = Cy5): Equal Expression ✓</text>
                      <text x="360" y="105" fill="#94a3b8" fontSize="9">● Black: Silent Transcripts ✗</text>
                    </svg>
                  </div>

                  {/* Predict-Then-Check Q1 */}
                  {!pred1Answered && (
                    <div className="p-4 bg-amber-950/30 border border-amber-800/60 rounded-2xl">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">Predict-Then-Check Assessment</p>
                      <p className="text-sm font-medium text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Prediction 1 Option ${i + 1}: ${opt}`}
                            onClick={() => {
                              setPred1Choice(i);
                              setPred1Answered(true);
                              audioManager.play(i === PREDICTION_QUESTIONS[0].correctIndex ? 'success' : 'pop');
                            }}
                            className="p-2.5 text-xs text-left bg-slate-800 rounded-xl text-slate-200 hover:bg-slate-700 border border-slate-700 flex justify-between items-center"
                          >
                            <span>{opt}</span>
                            {pred1Answered && (i === PREDICTION_QUESTIONS[0].correctIndex ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-rose-400">✗</span>)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Laser Mode Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs font-mono text-slate-400">Excitation Laser Frequency:</span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Filter 532 nm Green Cy3 Laser"
                        onClick={() => { setMicroarrayLaser('cy3'); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl border ${
                          microarrayLaser === 'cy3' ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        532 nm (Cy3 Green: Control)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Filter 635 nm Red Cy5 Laser"
                        onClick={() => { setMicroarrayLaser('cy5'); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl border ${
                          microarrayLaser === 'cy5' ? 'bg-rose-950 text-rose-300 border-rose-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        635 nm (Cy5 Red: Tumor)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Filter Dual Laser Co-Hybridization Overlay"
                        onClick={() => { setMicroarrayLaser('dual'); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl border ${
                          microarrayLaser === 'dual' ? 'bg-yellow-950 text-yellow-300 border-yellow-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        Dual-Laser Co-Hybridization Overlay
                      </motion.button>
                    </div>
                  </div>

                  {/* Interactive Microarray Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {MICROARRAY_SPOTS.map(spot => {
                      let displayColor = spot.color;
                      if (microarrayLaser === 'cy3') {
                        displayColor = spot.cy3 > 30 ? '#22c55e' : '#0f172a';
                      } else if (microarrayLaser === 'cy5') {
                        displayColor = spot.cy5 > 30 ? '#ef4444' : '#0f172a';
                      }

                      return (
                        <motion.div
                          key={spot.id}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          role="button"
                          tabIndex={0}
                          aria-label={`Microarray Spot ${spot.gene}: ${spot.label}`}
                          onClick={() => handleMicroarraySpotClick(spot.id, spot.gene, `${spot.cy5}/${spot.cy3}`)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleMicroarraySpotClick(spot.id, spot.gene, `${spot.cy5}/${spot.cy3}`);
                            }
                          }}
                          className={`p-4 rounded-2xl bg-slate-950 border cursor-pointer transition-all ${
                            selectedSpotIndex === spot.id ? 'border-teal-400 shadow-lg shadow-teal-500/20' : 'border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-white truncate">{spot.gene}</span>
                            <div
                              className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                              style={{ backgroundColor: displayColor }}
                            />
                          </div>
                          <p className="text-[11px] text-slate-400">{spot.label}</p>
                          <div className="mt-2 text-[10px] font-mono text-slate-500 flex justify-between">
                            <span>Cy3: {spot.cy3}%</span>
                            <span>Cy5: {spot.cy5}%</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: PROTEOMICS DATABASES ─── */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'PDB', title: 'Protein Data Bank (PDB)', focus: '3D Atomic Coordinates (X-ray/Cryo-EM)', color: 'text-gold-400' },
                      { id: 'PIR', title: 'PIR (Protein Info Resource)', focus: 'Sequence Families & Superfamilies', color: 'text-amber-400' },
                      { id: 'SWISS-PROT', title: 'SWISS-PROT (UniProtKB)', focus: 'Manually Curated Expert Annotations', color: 'text-teal-400' },
                    ].map(db => (
                      <motion.button
                        key={db.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Select bioinformatics database ${db.title}`}
                        onClick={() => { setSelectedDb(db.id as 'PDB' | 'PIR' | 'SWISS-PROT'); audioManager.play('tap'); }}
                        className={`p-4 text-left rounded-2xl border transition-all ${
                          selectedDb === db.id ? 'bg-slate-950 border-teal-500 shadow-lg' : 'bg-slate-950/60 border-slate-800'
                        }`}
                      >
                        <h3 className={`text-sm font-bold ${db.color}`}>{db.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">{db.focus}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Terminal Display */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-3">
                    <div className="flex justify-between items-center text-slate-500 border-b border-slate-800 pb-2">
                      <span>BIOINFORMATICS QUERY ENGINE: {selectedDb}</span>
                      <span className="text-emerald-400">✓ STATUS: 200 OK</span>
                    </div>

                    {selectedDb === 'PDB' && (
                      <div className="space-y-1 text-gold-300">
                        <p>ENTRY ID: 1MBN (Myoglobin Sperm Whale 3D Coordinate File)</p>
                        <p>EXPERIMENTAL METHOD: X-RAY DIFFRACTION • RESOLUTION: 1.40 Å</p>
                        <p>ATOM 1 N VAL A 1 4.542 12.304 22.181 1.00 15.20 N</p>
                        <p>ATOM 2 CA VAL A 1 5.680 13.150 21.802 1.00 14.80 C</p>
                        <p className="text-slate-400 mt-2">→ Indispensable for Structural Proteomics & AI Model Training.</p>
                      </div>
                    )}

                    {selectedDb === 'PIR' && (
                      <div className="space-y-1 text-amber-300">
                        <p>ACCESSION: PIR00412 • SUPERFAMILY: Hemoglobin/Myoglobin Globins</p>
                        <p>TAXONOMY: Eukaryota; Metazoa; Chordata; Mammalia</p>
                        <p>FAMILY CLASSIFICATION: PIRSF000142 Globins with conserved proximal His93</p>
                        <p className="text-slate-400 mt-2">→ Optimised for large-scale phylogenetic & evolutionary sequence searching.</p>
                      </div>
                    )}

                    {selectedDb === 'SWISS-PROT' && (
                      <div className="space-y-1 text-teal-300">
                        <p>ENTRY: P68871 (HBB_HUMAN) • STATUS: MANUALLY REVIEWED (UniProtKB/Swiss-Prot)</p>
                        <p>FUNCTION: Oxygen transport from respiratory organs to peripheral tissues.</p>
                        <p>MUTATION: Glu7Val (rs334) → Sickle Cell Anemia; Verified by 42 peer-reviewed citations.</p>
                        <p>MODIFICATION: Phosphorylation at Ser-44; Glycation at Val-2.</p>
                        <p className="text-slate-400 mt-2">→ Gold standard for clinical diagnostic & functional biochemical annotation.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: PROTEIN ENGINEERING STUDIO (WITH SVG 3) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-5">
                  {/* TOPIC SVG 3: Subtilisin Catalytic Pocket & Bleach Oxidation Mechanism */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-xs font-mono text-teal-400 mb-2">Rational Design: Subtilisin Met222Ala Bleach-Resistance Mechanism</span>
                    <svg viewBox="0 0 540 140" className="w-full max-w-[500px] h-32">
                      <rect x="10" y="10" width="520" height="120" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

                      {/* Wild type pocket with Met222 */}
                      <g transform="translate(30, 25)">
                        <rect x="0" y="0" width="220" height="90" rx="8" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
                        <text x="10" y="20" fill="#f87171" fontSize="10" fontWeight="bold">Wild-Type Met-222 (Native)</text>
                        <circle cx="60" cy="55" r="14" fill="#ef4444" opacity="0.3" />
                        <text x="60" y="58" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">—S—CH₃</text>
                        <path d="M 85,55 L 125,55" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
                        <text x="105" y="45" textAnchor="middle" fill="#fbbf24" fontSize="8">+ NaOCl (Bleach)</text>
                        <circle cx="160" cy="55" r="18" fill="#dc2626" />
                        <text x="160" y="58" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">—SO—CH₃</text>
                        <text x="110" y="82" textAnchor="middle" fill="#f87171" fontSize="8">✗ Steric clash blocks Ser221 active site</text>
                      </g>

                      {/* Engineered Ala222 pocket */}
                      <g transform="translate(280, 25)">
                        <rect x="0" y="0" width="230" height="90" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="1" />
                        <text x="10" y="20" fill="#34d399" fontSize="10" fontWeight="bold">Engineered Ala-222 (Rational Design)</text>
                        <circle cx="60" cy="55" r="12" fill="#10b981" />
                        <text x="60" y="58" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">—CH₃</text>
                        <path d="M 85,55 L 125,55" stroke="#34d399" strokeWidth="2" />
                        <text x="105" y="45" textAnchor="middle" fill="#a7f3d0" fontSize="8">+ NaOCl (Bleach)</text>
                        <circle cx="160" cy="55" r="12" fill="#10b981" />
                        <text x="160" y="58" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">—CH₃</text>
                        <text x="115" y="82" textAnchor="middle" fill="#6ee7b7" fontSize="8">✓ Non-oxidizable! Retains 92% Activity</text>
                      </g>
                    </svg>
                  </div>

                  {/* Predict-Then-Check Q2 */}
                  {!pred2Answered && (
                    <div className="p-4 bg-amber-950/30 border border-amber-800/60 rounded-2xl">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">Predict-Then-Check Assessment</p>
                      <p className="text-sm font-medium text-white mb-3">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Prediction 2 Option ${i + 1}: ${opt}`}
                            onClick={() => {
                              setPred2Choice(i);
                              setPred2Answered(true);
                              audioManager.play(i === PREDICTION_QUESTIONS[1].correctIndex ? 'success' : 'pop');
                            }}
                            className="p-2.5 text-xs text-left bg-slate-800 rounded-xl text-slate-200 hover:bg-slate-700 border border-slate-700 flex justify-between items-center"
                          >
                            <span>{opt}</span>
                            {pred2Answered && (i === PREDICTION_QUESTIONS[1].correctIndex ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-rose-400">✗</span>)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mutagenesis Controls */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-mono text-slate-400">Engineered Residue 222 (Subtilisin Protease):</span>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Select Wild-Type Met222 Residue"
                          onClick={() => { setMutantResidue('Met222'); audioManager.play('tap'); }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border ${
                            mutantResidue === 'Met222' ? 'bg-rose-950 text-rose-300 border-rose-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Wild-Type Met222 (Oxidizable ✗)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Select Rational Mutant Ala222 Residue"
                          onClick={() => { setMutantResidue('Ala222'); audioManager.play('tap'); }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border ${
                            mutantResidue === 'Ala222' ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Rational Mutant Ala222 (Bleach Stable ✓)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Select Rational Mutant Leu222 Residue"
                          onClick={() => { setMutantResidue('Leu222'); audioManager.play('tap'); }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border ${
                            mutantResidue === 'Leu222' ? 'bg-teal-950 text-teal-300 border-teal-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Rational Mutant Leu222 (Bulky Stable ✓)
                        </motion.button>
                      </div>
                    </div>

                    {/* Bleach slider */}
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                        <span>Sodium Hypochlorite Bleach Concentration:</span>
                        <strong className="text-amber-400 font-bold">{bleachConcentration}% Bleach</strong>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={1}
                        value={bleachConcentration}
                        onChange={e => {
                          setBleachConcentration(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Adjust Bleach Concentration Percentage"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Gauge meter */}
                    <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-mono">Residual Catalytic Activity:</span>
                      <div className="flex items-center gap-3">
                        <div className="w-36 h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            animate={{ width: `${subtilisinActivity}%` }}
                            style={{
                              backgroundColor: subtilisinActivity > 60 ? '#22c55e' : subtilisinActivity > 30 ? '#f59e0b' : '#ef4444',
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold font-mono text-white flex items-center gap-1">
                          {subtilisinActivity.toFixed(0)}%
                          {subtilisinActivity > 50 ? <span className="text-emerald-400">✓</span> : <span className="text-rose-400">✗</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: ALPHAFOLD2 AI DRUG DOCKING (WITH SVG 4) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 3D Docking Visualizer SVG */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                      <span className="text-xs font-mono text-teal-400 mb-2">AI-Predicted BCR-ABL Kinase Binding Cleft</span>
                      <svg viewBox="0 0 300 200" className="w-full max-w-[280px] h-44">
                        <path
                          d="M 30,50 Q 80,20 150,30 Q 220,20 270,50 L 270,160 Q 210,180 150,170 Q 90,180 30,160 Z"
                          fill="#1e1b4b"
                          stroke="#6366f1"
                          strokeWidth="2"
                        />
                        <path
                          d="M 100,70 C 110,130 190,130 200,70"
                          fill="#0f172a"
                          stroke="#a855f7"
                          strokeWidth="3"
                          strokeDasharray="4 2"
                        />
                        <motion.g
                          animate={{
                            y: (100 - aiDockingAffinity) * 0.45,
                            scale: 0.9 + aiDockingAffinity * 0.002,
                          }}
                          transition={{ type: 'spring', damping: 15 }}
                        >
                          <rect x="125" y="75" width="50" height="25" rx="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                          <circle cx="135" cy="87" r="4" fill="#ffffff" />
                          <circle cx="165" cy="87" r="4" fill="#ffffff" />
                          <text x="150" y="91" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">DRUG</text>
                        </motion.g>
                        {aiDockingAffinity > 70 && (
                          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <line x1="125" y1="87" x2="105" y2="85" stroke="#22c55e" strokeWidth="2" strokeDasharray="2 2" />
                            <line x1="175" y1="87" x2="195" y2="85" stroke="#22c55e" strokeWidth="2" strokeDasharray="2 2" />
                            <text x="150" y="145" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">✓ H-Bonds Locked</text>
                          </motion.g>
                        )}
                      </svg>
                    </div>

                    {/* Docking Controls */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                          <span>Geometric Shape Complementarity:</span>
                          <span className="text-teal-400 font-bold">{aiDockingAffinity}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={aiDockingAffinity}
                          onChange={e => setAiDockingAffinity(Number(e.target.value))}
                          aria-label="Adjust AI Geometric Shape Complementarity"
                          className="w-full accent-teal-500 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2 font-mono text-xs text-slate-300 pt-2 border-t border-slate-800">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Binding Free Energy (ΔG):</span>
                          <strong className="text-emerald-400">{dockingEnergyScore} kcal/mol</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Inhibition Constant (Ki):</span>
                          <strong className="text-teal-300 font-mono">
                            {aiDockingAffinity > 75 ? '0.84 nM (Ultra-Potent ✓)' : '420 nM (Moderate)'}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Off-Target Selectivity:</span>
                          <span className="text-amber-300 font-medium">99.4% specific to BCR-ABL ✓</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Observation Q2 Integration */}
                  {!obs2Answered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gold-950/30 rounded-2xl border border-gold-800/50">
                      <p className="text-sm font-semibold text-white mb-2">{OBSERVATION_QUESTIONS[1].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Observation 2 option ${i + 1}: ${opt}`}
                            onClick={() => {
                              setObs2Choice(i);
                              setObs2Answered(true);
                              audioManager.play(i === OBSERVATION_QUESTIONS[1].correctIndex ? 'success' : 'pop');
                            }}
                            className="w-full p-2.5 text-left text-xs bg-slate-800/90 rounded-xl text-slate-200 hover:bg-slate-700 flex justify-between items-center"
                          >
                            <span>{opt}</span>
                            {obs2Answered && (i === OBSERVATION_QUESTIONS[1].correctIndex ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-rose-400">✗</span>)}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Go to Previous Lab Step"
              className="px-5 py-2.5 bg-slate-800 text-white rounded-2xl font-bold text-sm disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab Step
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Advance to Next Lab Step"
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('whoosh'); }}
                className="px-6 py-2.5 bg-teal-600 text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-teal-500"
              >
                Next Lab Step →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Enter Free Sandbox Mode"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-extrabold text-sm shadow-xl"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────��────────────────────────────
          PHASE 3: SANDBOX / FREE PLAY MODE
         ────────────────────────────────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">Sandbox Mode • Zero Grading</span>
              <span className="text-xs bg-teal-950 text-teal-300 px-3 py-1 rounded-full border border-teal-800 font-bold">
                Experimental Freedom
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Open Biotechnology Multi-Sim Workspace</h2>
            <p className="text-slate-400 text-sm">
              Freely tweak enzyme mutations, laser excitations, and docking parameters simultaneously to discover hidden biophysical correlations.
            </p>
          </div>

          {/* Sandbox Combined Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subtilisin Sandbox */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-teal-400">🧪 Enzyme Bleach Inactivation Lab</h3>
              <div className="flex gap-2">
                {(['Met222', 'Ala222', 'Leu222'] as const).map(res => (
                  <button
                    key={res}
                    onClick={() => setMutantResidue(res)}
                    aria-label={`Select Sandbox Residue ${res}`}
                    className={`px-3 py-1 text-xs rounded-lg border font-bold ${
                      mutantResidue === res ? 'bg-teal-950 text-teal-300 border-teal-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-xs text-slate-400">Bleach: {bleachConcentration}%</label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={bleachConcentration}
                  onChange={e => setBleachConcentration(Number(e.target.value))}
                  aria-label="Sandbox Bleach Concentration Slider"
                  className="w-full accent-teal-500"
                />
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl flex justify-between items-center text-xs">
                <span className="text-slate-400">Enzyme Activity:</span>
                <span className="font-bold font-mono text-emerald-400">{subtilisinActivity.toFixed(0)}% Remaining ✓</span>
              </div>
            </div>

            {/* AI Docking Sandbox */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-gold-400">🤖 AlphaFold2 Drug Cleft Docking</h3>
              <div>
                <label className="text-xs text-slate-400">Shape Complementarity: {aiDockingAffinity}%</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={aiDockingAffinity}
                  onChange={e => setAiDockingAffinity(Number(e.target.value))}
                  aria-label="Sandbox Docking Affinity Slider"
                  className="w-full accent-gold-500"
                />
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl flex justify-between items-center text-xs">
                <span className="text-slate-400">Predicted Binding Energy (ΔG):</span>
                <span className="font-bold font-mono text-gold-300">{dockingEnergyScore} kcal/mol</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            aria-label="Begin Challenge Assessments"
            className="w-full py-4 bg-gradient-to-r from-teal-500 via-gold-600 to-purple-600 text-white font-extrabold rounded-2xl shadow-xl text-base flex items-center justify-center gap-2"
          >
            I Am Ready for Challenge Assessments! 🚀
          </motion.button>
        </motion.div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          PHASE 4: CHALLENGE ASSESSMENTS
         ───────────────────────────────────────────────────────────────────���────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-teal-400">
                Assessment Track • Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400 font-medium">NEP 2020 Competency:</span>
                <span className="text-xs font-bold uppercase text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800">
                  {activeChallenge.competencyLevel}
                </span>
              </div>
            </div>

            {/* Score & Progress Metric */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400">Accuracy</span>
                <p className="text-sm font-bold font-mono text-emerald-400">
                  {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <h2 className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
              {activeChallenge.question}
            </h2>

            {/* ─── TYPE A: MCQ ─── */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Select Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full p-4 text-left text-sm rounded-2xl border transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold'
                        : showExplanation && i !== activeChallenge.correctIndex
                        ? 'bg-slate-950/50 border-slate-800 text-slate-500'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-teal-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-teal-400 mt-0.5">[{String.fromCharCode(65 + i)}]</span>
                      <span>{opt}</span>
                      {showExplanation && (
                        <span className="ml-auto font-bold text-base">
                          {i === activeChallenge.correctIndex ? <span className="text-emerald-400">✓</span> : <span className="text-rose-400">✗</span>}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── TYPE B: DRAG-LABEL CHALLENGE ─── */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag items from palette into the matching target zones:</p>
                {/* Palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Draggable item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-900/80 border border-gold-700 text-gold-100 rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Zones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeChallenge.dragItems.map(item => (
                    <div
                      key={item.targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      aria-label={`Target Zone for ${item.targetId}`}
                      className={`p-4 rounded-2xl border-2 border-dashed min-h-[70px] flex flex-col justify-center transition-all ${
                        droppedLabels[item.targetId]
                          ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase text-slate-400 mb-1">Target Zone: [{item.targetId}]</span>
                      <strong className="text-xs font-bold flex items-center gap-1.5">
                        {droppedLabels[item.targetId] ? (
                          <>
                            <span className="text-emerald-400">✓</span>
                            <span>{droppedLabels[item.targetId]}</span>
                          </>
                        ) : (
                          'Drop matching label here'
                        )}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify Dragged Labels"
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm"
                >
                  Verify Dragged Labels ✓
                </motion.button>
              </div>
            )}

            {/* ─── TYPE C: DRAG-SORT CHALLENGE ─── */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to rearrange steps in logical biological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Step ${displayIdx + 1}: ${item}. Drag to reorder.`}
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-slate-200 text-xs md:text-sm flex items-center gap-3 cursor-grab"
                    >
                      <span className="font-mono text-teal-400 font-bold">#{displayIdx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Verify Chronological Sorting"
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm"
                >
                  Verify Chronological Order ✓
                </motion.button>
              </div>
            )}

            {/* ─── TYPE D: NUMERIC INPUT ─── */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    aria-label={`Enter numerical calculation in ${activeChallenge.unit}`}
                    className="p-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm w-56 focus:outline-none focus:border-teal-500"
                  />
                  <span className="text-slate-400 text-sm font-mono">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric calculation"
                    className="px-6 py-3.5 bg-teal-600 text-white rounded-2xl font-bold text-sm shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── TYPE E: CONSTRUCT BIO-PIPELINE ─── */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={`Add part ${part} to bio-pipeline`}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3.5 py-2 bg-gold-950 border border-gold-700 text-gold-200 rounded-xl text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction Zone */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1.5 bg-teal-950 border border-teal-700 text-teal-200 rounded-lg text-xs font-mono flex items-center gap-2">
                      {i + 1}. {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove step ${i + 1}`}
                        className="text-rose-400 font-bold ml-1 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click components above to build sequence</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Pipeline Construction"
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm"
                >
                  Verify Pipeline Construction
                </motion.button>
              </div>
            )}

            {/* ─── STEP-BY-STEP EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 rounded-2xl border border-amber-800/80 space-y-3">
                <div className="flex items-center justify-between text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <span>💡 Step-by-Step Biological Explanation</span>
                  <span>Step {revealedSteps + 1} of {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length}</span>
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-100 text-xs md:text-sm leading-relaxed"
                    >
                      <strong className="text-amber-400 font-mono">[{i + 1}]</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Reveal Next Reasoning Step"
                    className="px-4 py-2 bg-amber-800/80 text-amber-100 rounded-xl text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to Next Challenge"
                    className="block px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-sm shadow-xl mt-3"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Lab Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK
         ────────────────────────────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-teal-950/60 via-slate-900 to-gold-950/60 rounded-3xl border border-teal-700/80 text-center space-y-3 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Genomics & AI Mastery Certified!</h2>
            <p className="text-teal-300 font-mono text-sm">
              Final Competency Score: <strong className="text-white text-lg">{Math.max(0, 100 - errors * 5)}%</strong> • Mastery Level: <strong className="text-white uppercase">{masteryLevel}</strong>
            </p>
          </div>

          {/* MOTIVATIONAL PERSONALISED FEEDBACK (EXPLICIT ERROR TIERS) */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-sm leading-relaxed">
            <p className="text-teal-300 font-semibold mb-2 flex items-center gap-2">
              <span>🎯</span>
              <span>
                {errors === 0 && 'PERFECT SCORE!'}
                {errors >= 1 && errors <= 3 && 'Great work!'}
                {errors >= 4 && errors <= 7 && 'Good effort!'}
                {errors >= 8 && 'Do not give up — You WILL get this!'}
              </span>
            </p>
            <p className="text-slate-300">
              {errors === 0
                ? 'PERFECT SCORE! 🌟 Flawless Mastery! You demonstrated exceptional understanding across HGP/RGP metrics, microarray transcriptomics, proteomic archives, protein engineering, and AlphaFold2 AI drug design.'
                : errors <= 3
                ? 'Great work! 👏 Outstanding mastery! You grasped the core principles with strong analytical skill. Review the minor gap notes below to lock in 100% board exam precision.'
                : errors <= 7
                ? 'Good effort! 🌱 You navigated complex molecular simulations and gained strong foundational intuition. Review the identified misconception profile below and revisit the interactive labs.'
                : 'Do not give up — You WILL get this! 💪 Keep practicing! Molecular biotechnology concepts like microarray hybridization and 3D protein engineering take repeated exploration to fully master.'}
            </p>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Identified Concept Gaps to Solidify:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Board Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition SRS Notice */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SM-2 Memory Retention Review Scheduled:</span>
            <span className="text-amber-400 font-bold">
              Review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
            </span>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-teal-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="font-mono text-teal-400 font-bold">0{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE MODALS & BURSTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiotechnologyRiceGenomeProjectSim;