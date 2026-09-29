'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals
const NODE_C11_BIOTECH_011 = 'c11_biotech_011';
const NODE_C11_BIOTECH_012 = 'c11_biotech_012';
const NODE_C11_BIOTECH_013 = 'c11_biotech_013';
const NODE_C11_BIOTECH_014 = 'c11_biotech_014';
const NODE_C11_BIOTECH_015 = 'c11_biotech_015';
const NODE_C11_BIOTECH_016 = 'c11_biotech_016';
const NODE_C11_BIOTECH_017 = 'c11_biotech_017';
const NODE_C11_BIOTECH_018 = 'c11_biotech_018';
const NODE_C11_BIOTECH_019 = 'c11_biotech_019';
const NODE_C11_BIOTECH_020 = 'c11_biotech_020';

const ALL_NODE_IDS = [
  NODE_C11_BIOTECH_011,
  NODE_C11_BIOTECH_012,
  NODE_C11_BIOTECH_013,
  NODE_C11_BIOTECH_014,
  NODE_C11_BIOTECH_015,
  NODE_C11_BIOTECH_016,
  NODE_C11_BIOTECH_017,
  NODE_C11_BIOTECH_018,
  NODE_C11_BIOTECH_019,
  NODE_C11_BIOTECH_020,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Bioreactor Crisis at CCMB Hyderabad',
  intro: 'A recombinant insulin fermentation batch of E. coli at the Centre for Cellular and Molecular Biology (CCMB) in Hyderabad is experiencing a sharp drop in productivity. The pH is fluctuating, cell wall integrity is compromised, and the cyclin-CdK synchronisation protocol is drifting.',
  context: 'As the lead bioprocess scientist, you must master Lowry-Bronsted acid-base equilibria, design the optimal biological buffer, diagnose cell structures & Gram staining, and coordinate cell division to save the life-saving recombinant therapeutic batch.',
};

// Discovery Question (Hook)
const DISCOVERY_QUESTION = {
  question: 'In the bioreactor, the pH suddenly shifts from 7.2 to 6.2. By what factor did the free hydrogen ion concentration [H+] increase?',
  options: [
    '2 times (linear change)',
    '10 times (logarithmic 10-fold increase)',
    '100 times (exponential shift)',
    'No change in [H+], only buffer capacity shifted',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: pH = -log10[H+]. Each whole unit step on the pH scale represents a 10-fold change in proton concentration!',
};

// Challenge Interface
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

// 22 Adaptive Challenges covering all 10 nodes with NEP 2020 competencies
const CHALLENGES: Challenge[] = [
  // 1. Lowry-Bronsted & pH (c11_biotech_011) - Foundation - Recall
  {
    id: 'ch_011_f1',
    nodeId: NODE_C11_BIOTECH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Lowry-Bronsted theory, what defines an acid and a base?',
    options: [
      'Acid produces OH-, Base produces H+',
      'Acid is a proton (H+) donor, Base is a proton (H+) acceptor',
      'Acid accepts an electron pair, Base donates an electron pair',
      'Acid must contain oxygen, Base must contain nitrogen',
    ],
    correctIndex: 1,
    explanation: 'In the Lowry-Bronsted theory, an acid is defined as a proton (H+) donor and a base as a proton (H+) acceptor. In biological fluids, proton exchange between conjugate acid-base pairs is fundamental.',
    hints: [
      'Think about proton (H+) movement rather than hydroxide ions.',
      'One species donates H+ and the partner accepts it.',
      'An acid donates a proton to form its conjugate base; a base accepts a proton to form its conjugate acid.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Henderson-Hasselbalch Calculation (c11_biotech_011) - Standard - Application
  {
    id: 'ch_011_s1',
    nodeId: NODE_C11_BIOTECH_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A phosphate buffer has [HPO4^2-] = 0.20 M and [H2PO4-] = 0.02 M. If the pKa is 7.21, calculate the buffer pH.',
    correctAnswer: 8.21,
    tolerance: 0.05,
    unit: 'pH units',
    explanation: 'Using Henderson-Hasselbalch: pH = pKa + log10([A-]/[HA]) = 7.21 + log10(0.20 / 0.02) = 7.21 + log10(10) = 7.21 + 1.00 = 8.21.',
    hints: [
      'Use the Henderson-Hasselbalch equation: pH = pKa + log([A-]/[HA]).',
      'Here [A-] = 0.20 M (conjugate base) and [HA] = 0.02 M (weak acid), so ratio = 10.',
      'log10(10) is 1. Add 1 to 7.21 to get 8.21.',
    ],
  },
  // 3. Buffer Systems & Effective Range (c11_biotech_012) - Foundation - Understanding
  {
    id: 'ch_012_f1',
    nodeId: NODE_C11_BIOTECH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which buffer system is most appropriate for maintaining a mammalian cell culture at physiological pH 7.4?',
    options: [
      'Acetate buffer (effective range pH 3.6 - 5.6)',
      'Phosphate buffer (effective range pH 5.8 - 8.0)',
      'Borate buffer (effective range pH 8.0 - 10.0)',
      'Formate buffer (effective range pH 2.8 - 4.8)',
    ],
    correctIndex: 1,
    explanation: 'Phosphate buffer has a pKa2 of ~7.21, giving it an optimum buffering window of pH 5.8 to 8.0, matching the physiological cell culture requirement of pH 7.2 - 7.4.',
    hints: [
      'Buffers work effectively within approximately ±1 pH unit of their pKa.',
      'Acetate is too acidic (~4.76) and Borate is too alkaline (~9.2).',
      'Phosphate buffer operates right across the physiological neutral zone (5.8 to 8.0).',
    ],
    misconceptionIndex: 1,
  },
  // 4. Buffer Capacity & Concentration (c11_biotech_012) - Standard - Analysis
  {
    id: 'ch_012_s1',
    nodeId: NODE_C11_BIOTECH_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Two phosphate buffers A and B are both at pH 7.2. Buffer A is 0.10 M total phosphate while Buffer B is 0.01 M total phosphate. What is the difference in their buffering capacity?',
    options: [
      'Buffer B has higher capacity because it is more dilute',
      'Buffer A has 10 times higher buffering capacity to resist acid/base shocks',
      'Both have identical capacity because their pH values are identical',
      'Capacity depends only on temperature, not on molar concentration',
    ],
    correctIndex: 1,
    explanation: 'Buffering capacity depends directly on the total concentration of conjugate acid-base pairs. Buffer A (0.10 M) contains 10 times more moles of weak acid/base to neutralise incoming H+ or OH- than Buffer B (0.01 M).',
    hints: [
      'Do not confuse the pH value with buffering capacity.',
      'Capacity is the quantity of strong acid/base absorbed before pH shifts by 1 unit.',
      'Higher total molarity provides a larger chemical reservoir to absorb protons or hydroxides.',
    ],
    misconceptionIndex: 1,
  },
  // 5. Probability Types (c11_biotech_013) - Foundation - Understanding
  {
    id: 'ch_013_f1',
    nodeId: NODE_C11_BIOTECH_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a dihybrid test cross, the theoretical probability of a recombinant phenotype is calculated as 0.25 from genetic laws. What type of probability is this?',
    options: [
      'Experimental probability, because it is observed in a petri dish',
      'Theoretical probability, calculated from known sample spaces and ideal models',
      'Subjective probability based on intuition',
      'Secondary empirical count',
    ],
    correctIndex: 1,
    explanation: 'Theoretical probability is derived from mathematical principles and ideal sample spaces before running trials, whereas experimental probability is the ratio of observed events to total trials conducted.',
    hints: [
      'Was this number obtained from physical counting in an experiment or calculated from genetic models beforehand?',
      'Ideal sample space calculations represent theoretical probability.',
      'Theoretical P(E) = favourable outcomes / total equally likely outcomes.',
    ],
  },
  // 6. Law of Large Numbers (c11_biotech_013) - Standard - Evaluation
  {
    id: 'ch_013_s1',
    nodeId: NODE_C11_BIOTECH_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A student tests 10 agar plates and finds 4 contaminated (P_exp = 0.40). The cleanroom standard is P <= 0.10. Why must the student test 200 plates before concluding the laminar flow hood has failed?',
    options: [
      'To waste more plates and verify incubator heat',
      'By the Law of Large Numbers, small sample sizes suffer random variance; large trials converge to the true risk',
      'Theoretical probability only applies when trials are fewer than 10',
      'Contamination is impossible to measure statistically',
    ],
    correctIndex: 1,
    explanation: 'The Law of Large Numbers states that as the number of trials increases, experimental probability approaches the true theoretical probability. A sample of 10 has high stochastic noise.',
    hints: [
      'Consider the statistical stability of small vs large sample sizes.',
      'Random chance can skew small samples of 10 trials.',
      'Large sample numbers smooth out random flukes and reveal true baseline contamination rates.',
    ],
  },
  // 7. Primary vs Secondary Data (c11_biotech_014) - Foundation - Recall
  {
    id: 'ch_014_f1',
    nodeId: NODE_C11_BIOTECH_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A biotech researcher in Pune downloads a FASTA gene sequence of human insulin from NCBI GenBank. What type of data is this?',
    options: [
      'Primary data, because the researcher downloaded it first hand today',
      'Secondary data, because it was collected and published by an existing repository/investigator',
      'Raw spectroscopic observation',
      'Grouped laboratory measurement',
    ],
    correctIndex: 1,
    explanation: 'Secondary data is information compiled, curated, or published by other sources (e.g., NCBI, EMBL, ICMR statistics). Primary data must be collected first hand directly by the researcher.',
    hints: [
      'Did the researcher sequence the DNA themselves in their own lab, or obtain it from an existing database?',
      'Downloading from online repositories is using secondary sources.',
      'Secondary data saves time and resources but originates from previous external work.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Data Integration in Clinical Trials (c11_biotech_014) - Advanced - Analysis
  {
    id: 'ch_014_a1',
    nodeId: NODE_C11_BIOTECH_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An Indian biotech firm is developing a biosimilar for monoclonal antibodies. Why must they generate primary pharmacokinetic data in addition to reviewing secondary published clinical reports?',
    options: [
      'Secondary data is always fraudulent and illegal in India',
      'Regulatory bodies require primary empirical proof that their specific formulation is safe and efficacious in their target cohort',
      'Primary data is cheaper and faster to generate than reading literature',
      'Secondary data cannot be stored digitally',
    ],
    correctIndex: 1,
    explanation: 'While secondary literature guides dosage and targets, CDSCO regulatory approval demands primary experimental trials proving safety, immunogenicity, and kinetics for that exact proprietary biosimilar.',
    hints: [
      'Think about drug regulation, patents, and specific manufacturing impurities.',
      'Secondary data reports what other formulations did, not this specific batch.',
      'Primary clinical trial data gives firsthand empirical proof of safety for the new product.',
    ],
  },
  // 9. Prokaryotic vs Eukaryotic Ribosomes (c11_biotech_015) - Foundation - Understanding
  {
    id: 'ch_015_f1',
    nodeId: NODE_C11_BIOTECH_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do ribosomes and chromosomes differ between prokaryotes (e.g., E. coli) and eukaryotes (e.g., CHO cells)?',
    options: [
      'Prokaryotes: 80S ribosomes & linear chromosomes; Eukaryotes: 70S ribosomes & circular chromosomes',
      'Prokaryotes: 70S ribosomes (50S+30S) & circular chromosome; Eukaryotes: 80S ribosomes (60S+40S) & linear chromosomes',
      'Both have identical 70S ribosomes and histone-wrapped linear chromosomes',
      'Prokaryotes lack ribosomes entirely',
    ],
    correctIndex: 1,
    explanation: 'Prokaryotes contain 70S ribosomes (composed of 50S and 30S subunits) and a single circular chromosome in the nucleoid. Eukaryotes possess 80S cytoplasmic ribosomes (60S and 40S) and multiple linear, histone-bound chromosomes.',
    hints: [
      'Remember S stands for Svedberg sedimentation units.',
      'Prokaryotic ribosomes are smaller (70S); eukaryotic cytoplasmic ribosomes are larger (80S).',
      'Prokaryotic chromosomes are circular loops without a nuclear envelope.',
    ],
  },
  // 10. Drag-Label: Prokaryote vs Eukaryote (c11_biotech_015) - Standard - Understanding
  {
    id: 'ch_015_s1',
    nodeId: NODE_C11_BIOTECH_015,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag each cellular structure to its correct compartment on the cell comparison diagram.',
    dragItems: [
      { label: 'Nucleoid (Circular DNA)', targetId: 'part_prok_dna' },
      { label: '70S Ribosome', targetId: 'part_prok_ribo' },
      { label: 'Nucleus (Linear DNA + Histones)', targetId: 'part_euk_nuc' },
      { label: '80S Ribosome', targetId: 'part_euk_ribo' },
    ],
    correctMapping: {
      part_prok_dna: 'Nucleoid (Circular DNA)',
      part_prok_ribo: '70S Ribosome',
      part_euk_nuc: 'Nucleus (Linear DNA + Histones)',
      part_euk_ribo: '80S Ribosome',
    },
    explanation: 'Prokaryotes house circular DNA in a free nucleoid and use 70S ribosomes. Eukaryotes sequester linear chromosomes within a double-membrane nucleus and assemble 80S ribosomes in the cytoplasm.',
    hints: [
      'Identify which cell represents the prokaryote (left) and eukaryote (right).',
      'The nucleoid belongs inside the prokaryote with no membrane.',
      '80S ribosomes are in eukaryotic cytoplasm.',
    ],
  },
  // 11. Gram Stain Mechanism (c11_biotech_016) - Foundation - Understanding
  {
    id: 'ch_016_f1',
    nodeId: NODE_C11_BIOTECH_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why do Gram-negative bacteria appear pink/red after completing the Gram stain protocol?',
    options: [
      'Their thick peptidoglycan permanently traps crystal violet',
      'Alcohol decolourisation dissolves their lipid outer membrane, leaching crystal violet; they counterstain with safranin',
      'They lack peptidoglycan completely and only absorb safranin',
      'They have no cell membrane at all',
    ],
    correctIndex: 1,
    explanation: 'Gram-negative bacteria have a thin (2-3 nm) peptidoglycan layer and an outer lipopolysaccharide membrane. Alcohol dissolves the outer membrane and washes out the crystal violet-iodine complex, enabling safranin to stain them pink.',
    hints: [
      'Think about the role of alcohol in decolourising.',
      'Thin peptidoglycan cannot retain the large Crystal Violet-Iodine complex once the outer membrane is dissolved.',
      'Safranin acts as the secondary counterstain giving the pink/red appearance.',
    ],
  },
  // 12. Drag-Sort: Gram Stain Protocol (c11_biotech_016) - Standard - Application
  {
    id: 'ch_016_s1',
    nodeId: NODE_C11_BIOTECH_016,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the four critical steps of Gram staining in the correct sequential order.',
    sortItems: [
      'Primary Stain: Crystal Violet application (1 min)',
      'Mordant: Gram\'s Iodine to form CV-I complex (1 min)',
      'Decolouriser: 95% Ethanol wash (10-20 sec)',
      'Counterstain: Safranin dye application (45 sec)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The classic Gram staining sequence is: 1) Crystal Violet (primary stain), 2) Iodine (mordant to fix dye), 3) Ethanol (differential decolouriser), and 4) Safranin (counterstain for decolourised cells).',
    hints: [
      'Always start with the primary purple stain.',
      'The mordant binds the dye before any washing occurs.',
      'Decolourisation must precede the counterstain.',
    ],
  },
  // 13. Antibiotic Resistance & Outer Membrane (c11_biotech_016) - Advanced - Analysis
  {
    id: 'ch_016_a1',
    nodeId: NODE_C11_BIOTECH_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is Penicillin G naturally less potent against intact Gram-negative rods (like wild-type E. coli) compared to Gram-positive Staph aureus?',
    options: [
      'Gram-negative bacteria have 80S ribosomes that destroy penicillin',
      'The outer lipopolysaccharide (LPS) membrane acts as a permeability barrier preventing hydrophobic Penicillin G from reaching peptidoglycan transpeptidases',
      'Gram-negative bacteria do not synthesize peptidoglycan',
      'Penicillin G is an alkaline buffer that neutralises Gram-positive acids only',
    ],
    correctIndex: 1,
    explanation: 'The outer membrane of Gram-negative bacteria with its dense LPS layer and selective porins forms a barrier against bulky/hydrophobic molecules like Penicillin G, whereas Gram-positive peptidoglycan is directly accessible.',
    hints: [
      'Focus on the physical envelope structure outside the thin peptidoglycan layer.',
      'The outer membrane prevents large antibiotics from penetrating.',
      'Gram-positive bacteria lack this outer lipid barrier, exposing their thick peptidoglycan to beta-lactams.',
    ],
  },
  // 14. Organelles & Transplastomic Plants (c11_biotech_017) - Foundation - Understanding
  {
    id: 'ch_017_f1',
    nodeId: NODE_C11_BIOTECH_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is chloroplast genetic engineering (transplastomics) favored for producing biopharmaceuticals in transgenic crop plants?',
    options: [
      'Chloroplasts have 80S ribosomes and no DNA of their own',
      'Chloroplast DNA is maternally inherited (absent in pollen), preventing transgenic gene escape to wild weeds, and yields massive protein expression',
      'Chloroplasts directly secrete proteins into human blood',
      'Chloroplasts eliminate the need for sunlight during farming',
    ],
    correctIndex: 1,
    explanation: 'Transplastomic plants exhibit maternal plastid inheritance, meaning pollen does not transmit the transgene, preventing ecological gene escape. Furthermore, thousands of chloroplast genomes per cell yield high recombinant protein output.',
    hints: [
      'Think about environmental biosafety and pollen transfer in agriculture.',
      'Plastids are inherited through the ovule/egg, not via pollen.',
      'High copy number of chloroplast genomes boosts recombinant yields.',
    ],
  },
  // 15. ER & Golgi Glycosylation (c11_biotech_017) - Standard - Application
  {
    id: 'ch_017_s1',
    nodeId: NODE_C11_BIOTECH_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A biotechnology lab needs to produce therapeutic Erythropoietin (EPO), which requires complex N-linked glycosylation. Why must they use mammalian CHO cells instead of E. coli?',
    options: [
      'E. coli divides too fast to harvest intact proteins',
      'E. coli (prokaryote) lacks endoplasmic reticulum and Golgi apparatus necessary for eukaryotic post-translational glycosylation and disulfide folding',
      'Mammalian cells do not require nutrient buffers',
      'E. coli only produces circular DNA molecules',
    ],
    correctIndex: 1,
    explanation: 'Complex human therapeutic proteins require accurate disulfide bonding in the endoplasmic reticulum and specific oligosaccharide branching in the Golgi apparatus. Prokaryotic hosts lack these membrane-bound endomembrane organelles.',
    hints: [
      'Recall which organelles carry out post-translational modifications.',
      'Endoplasmic reticulum folds proteins and Golgi attaches sugar chains (glycosylation).',
      'Bacteria lack membrane-bound ER and Golgi.',
    ],
  },
  // 16. Chromosome Morphology & Centromere (c11_biotech_017) - Advanced - Evaluation
  {
    id: 'ch_017_a1',
    nodeId: NODE_C11_BIOTECH_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A cytogeneticist examines an onion root-tip metaphase chromosome where the centromere is located strictly at the terminal tip. How is this chromosome classified?',
    options: [
      'Metacentric (median centromere with equal V-arms)',
      'Submetacentric (sub-median centromere with unequal L-arms)',
      'Acrocentric (sub-terminal centromere with one extremely short arm)',
      'Telocentric (terminal centromere at the very end of the chromosome)',
    ],
    correctIndex: 3,
    explanation: 'Chromosomes are classified based on centromere position: Metacentric (middle), Submetacentric (slightly off-center), Acrocentric (close to end), and Telocentric (at the terminal end).',
    hints: [
      'Telo- comes from the Greek word for "end" or "tip".',
      'If the centromere is located at the absolute tip, it is telocentric.',
      'Acrocentric is near the end, while telocentric is at the very tip.',
    ],
  },
  // 17. Cell Cycle Regulation & MPF (c11_biotech_018) - Foundation - Understanding
  {
    id: 'ch_018_f1',
    nodeId: NODE_C11_BIOTECH_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What constitutes active M-phase Promoting Factor (MPF) that triggers entry from G2 into Mitosis?',
    options: [
      'Cyclin D + CdK4 only',
      'Cyclin B bound to catalytic kinase Cdc2 (CdK1)',
      'Constant high concentrations of phosphorylated p53',
      'Unbound CdK1 monomer without any cyclin',
    ],
    correctIndex: 1,
    explanation: 'MPF is a heterodimer composed of regulatory Cyclin B and catalytic kinase Cdc2 (CdK1). When Cyclin B accumulates to threshold levels in G2, it activates CdK1 to initiate prophase events.',
    hints: [
      'Remember which cyclin peaks right at the G2/M boundary.',
      'Cyclin B pairs with CdK1 (Cdc2) to form MPF.',
      'CdK alone is inactive; it requires cyclin binding.',
    ],
  },
  // 18. Cell Synchronisation Protocol (c11_biotech_018) - Advanced - Creativity
  {
    id: 'ch_018_a1',
    nodeId: NODE_C11_BIOTECH_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To harvest maximum metaphase chromosomes for clinical karyotyping, a technician arrests cell cultures with Colchicine. What molecular structure does Colchicine inhibit?',
    options: [
      'It breaks the nuclear envelope prematurely in G1',
      'It depolymerises tubulin and prevents mitotic spindle microtubule formation, arresting cells at the Spindle Checkpoint',
      'It inhibits DNA polymerase in S phase',
      'It permanently activates the anaphase-promoting complex',
    ],
    correctIndex: 1,
    explanation: 'Colchicine binds tubulin dimers, preventing microtubule assembly into mitotic spindle fibres. Without bipolar spindle attachment to kinetochores, the Spindle Assembly Checkpoint arrests all dividing cells in Metaphase.',
    hints: [
      'Spindle fibres are made of tubulin microtubules.',
      'Without spindle attachment, cells cannot proceed to anaphase.',
      'Colchicine arrests cells in metaphase with maximally condensed chromosomes.',
    ],
  },
  // 19. Mitotic Stages Sequence (c11_biotech_019) - Foundation - Recall
  {
    id: 'ch_019_f1',
    nodeId: NODE_C11_BIOTECH_019,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Sort the sequential stages of Mitosis (karyokinesis) in the correct chronological order.',
    sortItems: [
      'Prophase: Chromatin condenses, nuclear envelope disassembles',
      'Metaphase: Chromosomes align at equatorial metaphase plate',
      'Anaphase: Centromeres split, sister chromatids pull to poles',
      'Telophase: Nuclear envelopes reform, chromosomes decondense',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Mitosis proceeds through PMAT: Prophase (condensation/spindle onset) -> Metaphase (equatorial alignment) -> Anaphase (chromatid disjunction) -> Telophase (nuclear reconstruction), followed by cytokinesis.',
    hints: [
      'Remember the classic mnemonic: PMAT.',
      'Condensation comes first (Prophase).',
      'Chromatids separate in Anaphase before new nuclei form in Telophase.',
    ],
  },
  // 20. Mitotic Index Calculation (c11_biotech_019) - Standard - Application
  {
    id: 'ch_019_s1',
    nodeId: NODE_C11_BIOTECH_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In an onion root tip squash at CCMB, a student counts 24 dividing mitotic cells out of 300 total microscopic cells. Calculate the Mitotic Index percentage (%).',
    correctAnswer: 8.0,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Mitotic Index (%) = (Number of cells in mitosis / Total number of cells counted) × 100 = (24 / 300) × 100 = 8.0%.',
    hints: [
      'Formula: (Mitotic Cells / Total Cells) × 100.',
      '24 divided by 300 is 0.08.',
      '0.08 × 100 = 8.0%.',
    ],
  },
  // 21. Prophase I Substages (c11_biotech_020) - Standard - Recall
  {
    id: 'ch_020_s1',
    nodeId: NODE_C11_BIOTECH_020,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Arrange the five distinct substages of Meiotic Prophase I in chronological order.',
    sortItems: [
      'Leptotene: Chromatin condenses into thin visible threads',
      'Zygotene: Synaptonemal complex forms; homologues pair into bivalents',
      'Pachytene: Crossing over occurs between non-sister chromatids (chiasmata)',
      'Diplotene: Synaptonemal complex dissolves; chiasmata hold homologues',
      'Diakinesis: Terminalisation of chiasmata and spindle assembly',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The 5 substages of Prophase I are: Leptotene (slender threads) -> Zygotene (synapsis/bivalents) -> Pachytene (crossing over) -> Diplotene (chiasmata visible) -> Diakinesis (terminalisation).',
    hints: [
      'Remember: LZPDD (Lazy Zebras Prowl During Darkness).',
      'Synapsis happens in Zygotene, followed by crossing over in Pachytene.',
      'Terminalisation marks the end in Diakinesis.',
    ],
  },
  // 22. Crossing Over Significance (c11_biotech_020) - Advanced - Evaluation
  {
    id: 'ch_020_a1',
    nodeId: NODE_C11_BIOTECH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A plant breeder crosses high-yield drought-sensitive wheat with low-yield drought-tolerant wheat. In which meiotic stage does physical recombination occur to combine both traits onto a single chromosome?',
    options: [
      'Anaphase II of Meiosis II',
      'Pachytene stage of Prophase I between non-sister chromatids of homologous chromosomes',
      'Metaphase of vegetative Mitosis',
      'Cytokinesis of Meiosis I',
    ],
    correctIndex: 1,
    explanation: 'Crossing over during Pachytene of Prophase I involves reciprocal physical exchange of DNA segments between non-sister chromatids of paired homologous chromosomes, creating novel recombinant allele combinations.',
    hints: [
      'Crossing over happens in Prophase I.',
      'The specific substage is Pachytene.',
      'It occurs between non-sister chromatids within the bivalent.',
    ],
  },
];

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BIOTECH_011,
  title: 'Biotechnology: Acid-Base, Buffers, Cytology & Cell Division',
  definition: 'Comprehensive mastery of Lowry-Bronsted theory, Henderson-Hasselbalch equations, biological buffer systems, biostatistics (probability & data types), prokaryotic vs eukaryotic cytology, bacterial Gram staining, cell organelles, cyclin-CdK regulation, mitosis, and meiotic crossing over.',
  eli5: 'Think of this as the ultimate biological engineer toolbox: we learn how molecules balance protons in buffers to keep enzymes alive, how bacterial and human cells are built, and how chromosomes dance during division to create healthy cells and new genetic traits!',
  misconceptions: [
    {
      misconception: 'A strong acid and a concentrated acid mean the same thing.',
      correction: 'Acid strength is the degree of proton dissociation (Ka/pKa), whereas concentration is moles per unit volume. A dilute HCl solution (strong acid) can have higher pH than concentrated acetic acid (weak acid).',
    },
    {
      misconception: 'A buffer maintains a steady pH with infinite capacity.',
      correction: 'A buffer only resists small acid/base additions within ~1 pH unit of its pKa. Once its conjugate acid or base is depleted, buffer capacity collapses.',
    },
    {
      misconception: 'Any data found on the internet is primary data because you found it first.',
      correction: 'Data downloaded from online databases (e.g. NCBI, EMBL) or journals is secondary data. Primary data is collected firsthand directly from original lab experiments.',
    },
    {
      misconception: 'Gram-positive means healthy/good and Gram-negative means toxic/bad.',
      correction: 'Gram designation is strictly a physicochemical staining outcome determined by peptidoglycan thickness and presence of an outer membrane, not a medical or ethical rating.',
    },
    {
      misconception: 'Crossing over in meiosis occurs between sister chromatids.',
      correction: 'Crossing over takes place between NON-SISTER chromatids of homologous chromosomes. Sister chromatids are identical; swapping them produces no genetic recombination.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the conjugate base of H2PO4-?', options: ['H3PO4', 'HPO4^2-', 'PO4^3-', 'OH-'], correctIndex: 1 },
    { question: 'What is the pH of a solution with [H+] = 10^-5 M?', options: ['5', '9', '-5', '7'], correctIndex: 0 },
    { question: 'Which buffer is optimal at pH 4.5?', options: ['Phosphate', 'Acetate', 'Borate', 'Tris'], correctIndex: 1 },
    { question: 'What sedimentation coefficient defines prokaryotic ribosomes?', options: ['80S', '70S', '60S', '40S'], correctIndex: 1 },
    { question: 'What colour do Gram-positive bacteria retain after Gram staining?', options: ['Pink/Red', 'Purple/Violet', 'Green', 'Colourless'], correctIndex: 1 },
    { question: 'Which organelle carries out post-translational N-glycosylation?', options: ['Mitochondria', 'Golgi Apparatus', 'Lysosome', 'Centrosome'], correctIndex: 1 },
    { question: 'Which cyclin-CdK dimer forms active MPF?', options: ['Cyclin D + CdK4', 'Cyclin B + CdK1 (Cdc2)', 'Cyclin E + CdK2', 'Cyclin A + CdK2'], correctIndex: 1 },
    { question: 'During which meiotic stage does crossing over occur?', options: ['Leptotene', 'Pachytene', 'Diakinesis', 'Metaphase II'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student can apply Henderson-Hasselbalch equations, select optimal biological buffers, differentiate prokaryotic/eukaryotic cytology and Gram staining, and analyze cyclin-CdK regulation alongside mitotic/meiotic chromosome dynamics.',
};

// 5 Interactive Exploration Steps (Brilliant.org Learn-By-Doing)
const EXPLORATION_STEPS = [
  {
    title: 'Interactive Buffer & Henderson-Hasselbalch Lab',
    instruction: 'Adjust the conjugate base to weak acid ratio [A-]/[HA] and observe how the buffer pH and proton equilibrium shift in real-time.',
    interactionType: 'buffer-slider',
    nodeId: NODE_C11_BIOTECH_011,
  },
  {
    title: 'Gram Stain & Cell Wall Structural Dissector',
    instruction: 'Click on the bacterial cell layers to compare the thick peptidoglycan of Gram-positive vs the outer lipid membrane of Gram-negative bacteria.',
    interactionType: 'gram-dissect',
    nodeId: NODE_C11_BIOTECH_016,
  },
  {
    title: 'Organelle & Recombinant Secretion Pathway',
    instruction: 'Trace a therapeutic protein from the Nucleus -> Rough ER -> Golgi -> Secretory Vesicles by clicking each organelle station.',
    interactionType: 'organelle-trace',
    nodeId: NODE_C11_BIOTECH_017,
  },
  {
    title: 'Cell Cycle & Cyclin-CdK Engine Simulator',
    instruction: 'Advance through cell cycle phases and watch Cyclin B oscillate to activate MPF at the G2/M restriction checkpoint.',
    interactionType: 'cell-cycle-sim',
    nodeId: NODE_C11_BIOTECH_018,
  },
  {
    title: 'Meiotic Crossing Over & Recombination Studio',
    instruction: 'Drag the homologous non-sister chromatids together at Pachytene to form chiasmata and generate recombinant chromosomes.',
    interactionType: 'chiasma-builder',
    nodeId: NODE_C11_BIOTECH_020,
  },
];

// Predict-Then-Check Questions
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you prepare an acetate buffer (pKa = 4.76) with [Acetate-] / [Acetic Acid] ratio = 10, what will be the resulting pH?',
    options: ['pH 3.76', 'pH 4.76', 'pH 5.76', 'pH 7.00'],
    correctIndex: 2,
    verifyInstruction: 'Set the base-to-acid ratio slider to 10:1 (log10(10) = +1) to verify that pH = 4.76 + 1.00 = 5.76.',
    nodeId: NODE_C11_BIOTECH_011,
  },
  {
    question: 'Predict: What happens when 95% ethanol is added to a Gram-positive smear during decolourisation?',
    options: [
      'The thick peptidoglycan dehydrates and shrinks, trapping the purple CV-I complex inside',
      'The cell immediately explodes and turns red',
      'The crystal violet washes out instantly',
      'Peptidoglycan converts into 80S ribosomes',
    ],
    correctIndex: 0,
    verifyInstruction: 'Click the "Alcohol Decolourise" button on the Gram+ model to see the thick mesh retain the purple dye!',
    nodeId: NODE_C11_BIOTECH_016,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the buffer pH when the ratio of [A-] to [HA] is exactly 1.00 (log(1) = 0)?',
    observableOptions: [
      'The pH is always exactly equal to the weak acid pKa',
      'The pH drops to 0 immediately',
      'The solution loses all buffering capacity',
      'The pH becomes 14',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BIOTECH_011,
  },
  {
    question: 'In the cell cycle simulator, what happens to Cyclin B immediately after the metaphase-to-anaphase transition is triggered?',
    observableOptions: [
      'Cyclin B remains elevated indefinitely',
      'Cyclin B is rapidly degraded by the Anaphase-Promoting Complex (APC/C), inactivating MPF',
      'CdK1 protein is completely destroyed',
      'The cell retreats back into G0',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_BIOTECH_018,
  },
];

// Real World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Indian Biomanufacturing Protocol Designer',
  description: 'Design a certified production protocol for recombinant human insulin at the Biotechnology Park in Genome Valley, Hyderabad. Choose the host cell type, buffer chemistry, and cell synchronisation agent.',
  steps: [
    'Select host cell: E. coli (70S prokaryote) for rapid unglycosylated polypeptide chain synthesis.',
    'Formulate a 0.1 M phosphate buffer (pH 7.2) for lysis and refolding to maintain optimal enzyme kinetics.',
    'Perform Gram stain quality control to verify uniform Gram-negative rod morphology (pink).',
    'Calculate mitotic/division index and assess batch sterility probability (target P_contam < 0.01).',
  ],
};

function C11_BiotechnologyLowrybronstedTheoryAcidSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Simulation Variables
  const [selectedBufferType, setSelectedBufferType] = useState<'acetate' | 'phosphate' | 'borate'>('phosphate');
  const [baseAcidRatio, setBaseAcidRatio] = useState<number>(1.0);
  const [bufferMolarity, setBufferMolarity] = useState<number>(0.10);
  const [addedDrops, setAddedDrops] = useState<number>(0);
  const [selectedGramType, setSelectedGramType] = useState<'positive' | 'negative'>('positive');
  const [gramStainStep, setGramStainStep] = useState<number>(0);
  const [selectedOrganelle, setSelectedOrganelle] = useState<string>('nucleus');
  const [organelleStep, setOrganelleStep] = useState<number>(0);
  const [cellCyclePhase, setCellCyclePhase] = useState<'G1' | 'S' | 'G2' | 'M' | 'G0'>('G1');
  const [cyclinBLevel, setCyclinBLevel] = useState<number>(10);
  const [mpfActive, setMpfActive] = useState<boolean>(false);
  const [chiasmaProgress, setChiasmaProgress] = useState<number>(0);
  const [recombinantFormed, setRecombinantFormed] = useState<boolean>(false);
  const [mitoticTotalCells, setMitoticTotalCells] = useState<number>(200);
  const [mitoticDividingCells, setMitoticDividingCells] = useState<number>(16);

  // Adaptive Difficulty & Gamification State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-Drop & Construction
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });

  // Feedback Overlays
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Buffer pKa Table
  const bufferPkaMap = useMemo(() => ({
    acetate: 4.76,
    phosphate: 7.21,
    borate: 9.24,
  }), []);

  // Real-time Calculated pH
  const calculatedPh = useMemo(() => {
    const pKa = bufferPkaMap[selectedBufferType];
    const logRatio = Math.log10(Math.max(0.01, baseAcidRatio));
    const acidShockEffect = (addedDrops * 0.05) / Math.max(0.05, bufferMolarity * 10);
    const rawPh = pKa + logRatio - acidShockEffect;
    return Math.max(0.0, Math.min(14.0, parseFloat(rawPh.toFixed(2))));
  }, [selectedBufferType, baseAcidRatio, addedDrops, bufferMolarity, bufferPkaMap]);

  // Derived Buffer Capacity Indicator
  const bufferCapacityRating = useMemo(() => {
    const pKa = bufferPkaMap[selectedBufferType];
    const diffFromPka = Math.abs(calculatedPh - pKa);
    if (diffFromPka <= 0.5 && bufferMolarity >= 0.1) return { level: 'Optimal Maximum', color: 'text-emerald-400', width: 95 };
    if (diffFromPka <= 1.0 && bufferMolarity >= 0.05) return { level: 'Good Operational', color: 'text-gold-400', width: 70 };
    if (diffFromPka <= 1.5) return { level: 'Marginal / Vulnerable', color: 'text-amber-400', width: 40 };
    return { level: 'Buffer Depleted / Broken', color: 'text-rose-400', width: 10 };
  }, [calculatedPh, selectedBufferType, bufferMolarity, bufferPkaMap]);

  // Filter Challenges by Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load Existing Mastery on Mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive BKT Difficulty Adjustment
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

  // Real-time Canvas Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      if (currentSlide === 0 || phase === 'sandbox') {
        const numHPlus = Math.max(2, Math.round((14 - calculatedPh) * 3));
        for (let i = 0; i < numHPlus; i++) {
          const x = (Math.sin(frame * 0.03 + i) * 0.4 + 0.5) * canvas.width;
          const y = (Math.cos(frame * 0.025 + i * 1.5) * 0.35 + 0.5) * canvas.height;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#f43f5e';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '9px monospace';
          ctx.fillText('H⁺', x - 6, y - 6);
        }

        const numBase = Math.round(baseAcidRatio * 4);
        for (let j = 0; j < numBase; j++) {
          const bx = (Math.cos(frame * 0.02 + j * 0.8) * 0.4 + 0.5) * canvas.width;
          const by = (Math.sin(frame * 0.02 + j) * 0.35 + 0.5) * canvas.height;
          ctx.beginPath();
          ctx.arc(bx, by, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '8px sans-serif';
          ctx.fillText('A⁻', bx - 5, by + 3);
        }
      } else if (currentSlide === 3) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 45 + Math.sin(frame * 0.05) * 3;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = mpfActive ? '#10b981' : '#6366f1';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.fillStyle = mpfActive ? '#10b981' : '#e0e7ff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(mpfActive ? 'MPF ACTIVE' : `Phase: ${cellCyclePhase}`, centerX, centerY + 4);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide, phase, calculatedPh, baseAcidRatio, cellCyclePhase, mpfActive]);

  // Clean Up Inactivity Timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step biological explanation.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific intuition! That is the logarithmic scale.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore and experiment freely!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration sandbox. Adjust any parameter with zero grading stress.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Show your biotechnology expertise.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation slider to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! That is the core Henderson-Hasselbalch principle.' : 'Inspect the ratio and pKa gauges again.');
  }, []);

  const handleBufferRatioChange = useCallback((newRatio: number) => {
    setBaseAcidRatio(newRatio);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && Math.abs(newRatio - 10) < 0.2) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleAddAcidDrop = useCallback(() => {
    setAddedDrops(prev => prev + 1);
    audioManager.play('pop');
  }, []);

  const handleResetBufferDrops = useCallback(() => {
    setAddedDrops(0);
    audioManager.play('whoosh');
  }, []);

  const handleGramStep = useCallback((step: number) => {
    setGramStainStep(step);
    audioManager.play('tap');
  }, []);

  const handleOrganelleClick = useCallback((org: string, stepNum: number) => {
    setSelectedOrganelle(org);
    setOrganelleStep(stepNum);
    audioManager.play('tap');
    const organelleNarratives: Record<string, string> = {
      nucleus: 'Nucleus: Houses linear genes; transcription of insulin mRNA begins here.',
      er: 'Rough Endoplasmic Reticulum: Bound ribosomes translate and fold the nascent polypeptide.',
      golgi: 'Golgi Apparatus: Modifies oligosaccharides and sorts glycoproteins into secretory vesicles.',
      vesicle: 'Secretory Vesicle: Fuses with cell membrane for therapeutic exocytosis.',
    };
    speechManager.speak(organelleNarratives[org] || '');
  }, []);

  const handleCellCycleStep = useCallback((nextPhase: 'G1' | 'S' | 'G2' | 'M' | 'G0') => {
    setCellCyclePhase(nextPhase);
    audioManager.play('tap');
    if (nextPhase === 'G1') {
      setCyclinBLevel(10);
      setMpfActive(false);
    } else if (nextPhase === 'S') {
      setCyclinBLevel(40);
      setMpfActive(false);
    } else if (nextPhase === 'G2') {
      setCyclinBLevel(85);
      setMpfActive(true);
      audioManager.play('sparkle');
    } else if (nextPhase === 'M') {
      setCyclinBLevel(5);
      setMpfActive(false);
      audioManager.play('whoosh');
    }
  }, []);

  const handleChiasmaDrag = useCallback((val: number) => {
    setChiasmaProgress(val);
    if (val >= 90 && !recombinantFormed) {
      setRecombinantFormed(true);
      audioManager.play('sparkle');
      speechManager.speak('Genetic recombination achieved! Novel recombinant chromosomes generated.');
    }
  }, [recombinantFormed]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === activeChallenge.sortItems?.length
        ? prev
        : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const copy = [...base];
      const [removed] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, removed);
      return copy;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent! You have conquered the Class 11 Biotechnology simulation suite.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(prev => prev + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((userAnswer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = userAnswer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const num = typeof userAnswer === 'string' ? parseFloat(userAnswer) : (userAnswer as number);
      isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.01);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = userAnswer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('success');
      audioManager.play('drop-correct');
      speechManager.speak('Spot on! Excellent scientific analysis.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, 'proficient');
      }
    } else {
      audioManager.play('error');
      audioManager.play('drop-wrong');
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
        speechManager.speak('Let us study the complete solution step-by-step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 6000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-900/40"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 bg-emerald-950/60 rounded-full border border-emerald-800">
                ISC Class 11 Biotechnology
              </span>
              <span className="text-xs text-slate-400">10 Core Modules</span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase & Status Badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-gold-950/60 text-gold-400 border-gold-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/80 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚨</span> Narrative Mission Briefing
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400">
              💡 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <span>❓</span> Curiosity Diagnostic Challenge
            </div>
            <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-semibold transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center leading-6 text-xs mr-2 font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Exactly right! pH is logarithmic. ΔpH = 1.0 means [H+] increased 10^1 = 10-fold.' : `Notice: ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/40 text-sm whitespace-nowrap"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Slide Navigation Header */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Lab Station:</span>
              <span className="text-sm font-black text-emerald-400">
                {currentSlide + 1} of {EXPLORATION_STEPS.length} — {EXPLORATION_STEPS[currentSlide].title}
              </span>
            </div>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-emerald-400' : idx < currentSlide ? 'bg-emerald-800' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs md:text-sm text-emerald-300 flex items-center gap-2">
                <span className="text-lg">🔬</span>
                <span><strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}</span>
              </div>

              {/* ── LAB STATION 0: Henderson-Hasselbalch & Buffer Equilibrium ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Controls */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Select Biological Buffer System
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['acetate', 'phosphate', 'borate'] as const).map(b => (
                          <motion.button
                            key={b}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedBufferType(b)}
                            className={`p-2 rounded-lg text-xs font-bold capitalize border transition-all ${
                              selectedBufferType === b
                                ? 'bg-gold-600 text-white border-gold-400 shadow-md'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            {b} (pKa {bufferPkaMap[b]})
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Ratio [Conjugate Base A⁻] / [Weak Acid HA]:</span>
                        <span className="text-emerald-400 font-mono text-sm">{baseAcidRatio.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min={0.1}
                        max={10.0}
                        step={0.1}
                        value={baseAcidRatio}
                        onChange={e => handleBufferRatioChange(parseFloat(e.target.value))}
                        aria-label="Set base to acid ratio"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                        <span>0.10 (Acidic excess)</span>
                        <span>1.00 (pH = pKa)</span>
                        <span>10.00 (Base excess)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Total Buffer Molarity:</span>
                        <span className="text-gold-400 font-mono">{bufferMolarity.toFixed(2)} M</span>
                      </div>
                      <input
                        type="range"
                        min={0.01}
                        max={0.50}
                        step={0.01}
                        value={bufferMolarity}
                        onChange={e => setBufferMolarity(parseFloat(e.target.value))}
                        aria-label="Set buffer molarity"
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddAcidDrop}
                        className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow"
                      >
                        + Add 1 Drop HCl Shock ({addedDrops} drops)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetBufferDrops}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold border border-slate-700"
                      >
                        Reset
                      </motion.button>
                    </div>

                    {/* Predict-Then-Check Section */}
                    {!predictionMade && (
                      <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-800/80 space-y-2 mt-4">
                        <p className="text-xs font-bold text-gold-300">🎯 Predict-Then-Check:</p>
                        <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(idx)}
                              className="p-1.5 text-left rounded-lg bg-slate-900 hover:bg-gold-900/60 border border-slate-700 text-[11px] text-slate-300 font-semibold"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Live Visualisation */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Live Solution pH</span>
                        <div className="text-3xl md:text-4xl font-black text-emerald-400 font-mono mt-0.5">
                          {calculatedPh.toFixed(2)}
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Formula: pH = {bufferPkaMap[selectedBufferType]} + log₁₀({baseAcidRatio.toFixed(2)})
                        </span>
                      </div>

                      <div className="w-full md:w-56 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Buffering Capacity:</span>
                          <span className={`font-bold ${bufferCapacityRating.color}`}>{bufferCapacityRating.level}</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: `${bufferCapacityRating.width}%` }}
                            className={`h-full ${
                              bufferCapacityRating.width > 60
                                ? 'bg-emerald-500'
                                : bufferCapacityRating.width > 30
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Canvas Particle Chamber */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                      <canvas ref={canvasRef} width={500} height={160} className="w-full h-40" />
                      <div className="absolute top-2 left-3 flex gap-4 text-[10px] font-mono bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
                        <span className="text-rose-400">● Free H⁺ ions (Acidity)</span>
                        <span className="text-emerald-400">● A⁻ Conjugate Base</span>
                      </div>
                    </div>

                    {/* Observation Hook */}
                    {Math.abs(baseAcidRatio - 1.0) < 0.1 && !observationAnswered && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <p className="text-xs font-bold text-amber-400">👀 What do you observe when [A-] / [HA] = 1.0?</p>
                        <div className="space-y-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB STATION 1: Gram Stain & Cell Wall Dissection ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4 space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedGramType('positive')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedGramType === 'positive'
                            ? 'bg-purple-900/80 border-purple-500 text-purple-200 shadow'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Gram Positive (Staph)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedGramType('negative')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedGramType === 'negative'
                            ? 'bg-rose-900/80 border-rose-500 text-rose-200 shadow'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Gram Negative (E. coli)
                      </motion.button>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Staining Procedure Steps
                      </span>
                      <div className="space-y-1.5">
                        {[
                          { step: 1, name: '1. Crystal Violet Primary Stain (Purple)' },
                          { step: 2, name: '2. Iodine Mordant (CV-I Complex)' },
                          { step: 3, name: '3. 95% Ethanol Decolourisation' },
                          { step: 4, name: '4. Safranin Counterstain (Pink)' },
                        ].map(st => (
                          <motion.button
                            key={st.step}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleGramStep(st.step)}
                            className={`w-full text-left p-2 rounded-lg text-xs font-semibold border ${
                              gramStainStep === st.step
                                ? 'bg-emerald-600 text-white border-emerald-400'
                                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                            }`}
                          >
                            {st.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SVG Bacterial Envelope Cross Section */}
                  <div className="lg:col-span-8 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 450 220" className="w-full max-w-md">
                      {selectedGramType === 'positive' ? (
                        <g>
                          {/* Gram Positive: Thick Peptidoglycan */}
                          <rect x="50" y="30" width="350" height="90" rx="6" fill={gramStainStep >= 1 ? '#581c87' : '#334155'} stroke="#7e22ce" strokeWidth="2" />
                          <text x="225" y="75" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                            Thick Peptidoglycan (20-80 nm) + Teichoic Acids
                          </text>
                          <text x="225" y="95" textAnchor="middle" fill="#e9d5ff" fontSize="10">
                            {gramStainStep === 3 ? 'Traps Crystal Violet-Iodine Complex (Remains Purple)' : 'Porous peptide-glycan crosslinked matrix'}
                          </text>

                          {/* Inner Plasma Membrane */}
                          <rect x="50" y="130" width="350" height="30" rx="4" fill="#0f766e" stroke="#14b8a6" strokeWidth="1.5" />
                          <text x="225" y="150" textAnchor="middle" fill="#ccfbf1" fontSize="11">
                            Inner Plasma Membrane (Phospholipid Bilayer)
                          </text>
                          <text x="225" y="195" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">
                            Final Staining State: PURPLE / VIOLET
                          </text>
                        </g>
                      ) : (
                        <g>
                          {/* Gram Negative: Outer Membrane */}
                          <rect x="50" y="20" width="350" height="30" rx="4" fill={gramStainStep === 3 ? '#1e293b' : '#be185d'} stroke="#f43f5e" strokeWidth="1.5" />
                          <text x="225" y="40" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                            Outer Membrane (Lipopolysaccharide LPS + Porins)
                          </text>

                          {/* Periplasmic Space + Thin Peptidoglycan */}
                          <rect x="50" y="60" width="350" height="30" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                          <rect x="80" y="70" width="290" height="10" rx="2" fill={gramStainStep === 4 ? '#e11d48' : gramStainStep >= 1 && gramStainStep < 3 ? '#581c87' : '#64748b'} />
                          <text x="225" y="80" textAnchor="middle" fill="#ffffff" fontSize="9">
                            Thin Peptidoglycan (2-3 nm) in Periplasmic Space
                          </text>

                          {/* Inner Plasma Membrane */}
                          <rect x="50" y="100" width="350" height="30" rx="4" fill="#0f766e" stroke="#14b8a6" strokeWidth="1.5" />
                          <text x="225" y="120" textAnchor="middle" fill="#ccfbf1" fontSize="11">
                            Inner Plasma Membrane (Phospholipid Bilayer)
                          </text>

                          <text x="225" y="170" textAnchor="middle" fill={gramStainStep === 4 ? '#f43f5e' : '#94a3b8'} fontSize="12" fontWeight="bold">
                            {gramStainStep === 4 ? 'Final Counterstain: PINK / RED (Safranin Bound)' : gramStainStep === 3 ? 'Alcohol Dissolved Outer LPS Membrane' : 'Gram Negative Envelope'}
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB STATION 2: Organelle & Recombinant Secretion Pathway ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'nucleus', label: '1. Nucleus (Transcription)', desc: 'Recombinant mRNA transcribed' },
                      { id: 'er', label: '2. Rough ER (Translation/Folding)', desc: '80S ribosomes & chaperone folding' },
                      { id: 'golgi', label: '3. Golgi (Glycosylation)', desc: 'N-linked sugar chain modification' },
                      { id: 'vesicle', label: '4. Secretory Vesicle', desc: 'Exocytosis of therapeutic drug' },
                    ].map((step, idx) => (
                      <motion.button
                        key={step.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleOrganelleClick(step.id, idx)}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          selectedOrganelle === step.id
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        <p className="text-xs font-bold">{step.label}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{step.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Interactive Secretory Flow Diagram */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 180" className="w-full">
                      <path d="M 100 90 L 160 90 M 230 90 L 290 90 M 360 90 L 410 90" stroke="#475569" strokeWidth="2" strokeDasharray="4" />

                      <g onClick={() => handleOrganelleClick('nucleus', 0)} className="cursor-pointer">
                        <circle cx="70" cy="90" r="35" fill={selectedOrganelle === 'nucleus' ? '#3b82f6' : '#1e293b'} stroke="#60a5fa" strokeWidth="2" />
                        <text x="70" y="93" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Nucleus</text>
                      </g>

                      <g onClick={() => handleOrganelleClick('er', 1)} className="cursor-pointer">
                        <rect x="160" y="60" width="70" height="60" rx="8" fill={selectedOrganelle === 'er' ? '#8b5cf6' : '#1e293b'} stroke="#a78bfa" strokeWidth="2" />
                        <text x="195" y="94" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Rough ER</text>
                      </g>

                      <g onClick={() => handleOrganelleClick('golgi', 2)} className="cursor-pointer">
                        <rect x="290" y="60" width="70" height="60" rx="8" fill={selectedOrganelle === 'golgi' ? '#ec4899' : '#1e293b'} stroke="#f472b6" strokeWidth="2" />
                        <text x="325" y="94" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Golgi</text>
                      </g>

                      <g onClick={() => handleOrganelleClick('vesicle', 3)} className="cursor-pointer">
                        <circle cx="430" cy="90" r="22" fill={selectedOrganelle === 'vesicle' ? '#10b981' : '#1e293b'} stroke="#34d399" strokeWidth="2" />
                        <text x="430" y="93" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Exocytosis</text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB STATION 3: Cell Cycle & Cyclin-CdK Engine ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Drive Cell Cycle Transitions
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['G1', 'S', 'G2', 'M'] as const).map(p => (
                        <motion.button
                          key={p}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleCellCycleStep(p)}
                          className={`p-2.5 rounded-xl font-bold text-xs border ${
                            cellCyclePhase === p
                              ? 'bg-gold-600 text-white border-gold-400 shadow-md'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          Phase {p}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Cyclin B Level:</span>
                        <span className="text-emerald-400 font-mono font-bold">{cyclinBLevel}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${cyclinBLevel}%` }} className="h-full bg-emerald-500" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">CdK1 (Cdc2) Subunit:</span>
                        <span className="text-gold-400 font-mono">100% Constant</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
                    <div className={`p-3 rounded-xl border text-center w-full ${
                      mpfActive ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}>
                      <p className="text-xs font-bold uppercase tracking-wider">M-Phase Promoting Factor Status</p>
                      <p className="text-lg font-black mt-1">
                        {mpfActive ? '⚡ MPF ACTIVATED — Cell Enters Mitosis!' : '🔒 G2/M Checkpoint Locked (Awaiting Cyclin B)'}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 text-center">
                      Notice: CdK1 kinase is always present in constant amount. It is the rhythmic synthesis and destruction of Cyclin B that clocks the eukaryotic division cycle.
                    </p>
                  </div>
                </div>
              )}

              {/* ── LAB STATION 4: Meiotic Crossing Over & Chiasma Builder ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-2/3">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Synapsis & Chiasma Overlap Force:</span>
                        <span className="text-emerald-400 font-mono">{chiasmaProgress}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={chiasmaProgress}
                        onChange={e => handleChiasmaDrag(parseInt(e.target.value))}
                        aria-label="Set chiasma overlap force"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase border ${
                      recombinantFormed ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      {recombinantFormed ? '✓ Recombination Complete' : 'Pachytene In Progress'}
                    </span>
                  </div>

                  {/* SVG Meiotic Bivalent Visualisation */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 450 160" className="w-full max-w-lg">
                      <path d={`M 50 50 Q ${180 + chiasmaProgress * 0.4} ${50 + chiasmaProgress * 0.3} 380 50`} stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" fill="none" />
                      <path d={`M 50 110 Q ${180 + chiasmaProgress * 0.4} ${110 - chiasmaProgress * 0.3} 380 110`} stroke="#ef4444" strokeWidth="8" strokeLinecap="round" fill="none" />

                      {chiasmaProgress > 50 && (
                        <g>
                          <circle cx="220" cy="80" r="14" fill="#fbbf24" opacity="0.3" />
                          <text x="220" y="84" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Chiasma</text>
                        </g>
                      )}
                      <text x="50" y="30" fill="#93c5fd" fontSize="11" fontWeight="bold">Maternal Chromatid (A-B)</text>
                      <text x="50" y="145" fill="#fca5a5" fontSize="11" fontWeight="bold">Paternal Chromatid (a-b)</text>
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-30 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
              >
                Launch Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">🧪 Biotech Virtual Workbench (Sandbox)</h3>
              <p className="text-slate-400 text-xs mt-1">
                Freely tune buffer chemistry, add acid shocks, or calculate mitotic indices without test scoring.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-900/40 whitespace-nowrap"
            >
              Ready for Adaptive Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Buffer Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
                Phosphate Buffer Refolding Calculator
              </span>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">Base/Acid Ratio:</span>
                <span className="text-emerald-400 font-mono text-sm font-bold">{baseAcidRatio.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={10.0}
                step={0.1}
                value={baseAcidRatio}
                onChange={e => setBaseAcidRatio(parseFloat(e.target.value))}
                aria-label="Set base to acid ratio in sandbox"
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Calculated pH:</span>
                <span className="text-2xl font-mono font-black text-emerald-400">{calculatedPh.toFixed(2)}</span>
              </div>
            </div>

            {/* Mitotic Index Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                Mitotic Index Callus Proliferation Calculator
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Dividing Mitotic Cells:</label>
                  <input
                    type="number"
                    value={mitoticDividingCells}
                    onChange={e => setMitoticDividingCells(Math.max(0, parseInt(e.target.value) || 0))}
                    aria-label="Set number of dividing mitotic cells"
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Total Cells Counted:</label>
                  <input
                    type="number"
                    value={mitoticTotalCells}
                    onChange={e => setMitoticTotalCells(Math.max(1, parseInt(e.target.value) || 1))}
                    aria-label="Set total cells counted"
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                  />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Mitotic Index:</span>
                <span className="text-2xl font-mono font-black text-teal-400">
                  {((mitoticDividingCells / Math.max(1, mitoticTotalCells)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE (Adaptive & Competency Graded) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Competency: {activeChallenge.competencyLevel}
                </span>
                <span className="text-xs text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-300">
                Correct: {scoreBreakdown.correct} / {scoreBreakdown.total}
              </span>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-gold-500"
              />
            </div>
          </div>

          <div className="text-xs text-gold-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Active Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* MCQ Types (Classify, Distinguish, Match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-2.5">
                {activeChallenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(idx)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-semibold transition-all border ${
                      wrongFlash
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : showExplanation && idx === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/70 hover:bg-slate-800 text-slate-200 border-slate-800'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center leading-6 text-xs mr-2.5 font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_prok_dna')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                  >
                    <span className="text-xs text-slate-400 mb-1">Prokaryote Genetic Material:</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {droppedLabels.part_prok_dna || 'Drop Label Here'}
                    </span>
                  </div>

                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_prok_ribo')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                  >
                    <span className="text-xs text-slate-400 mb-1">Prokaryote Protein Factory:</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {droppedLabels.part_prok_ribo || 'Drop Label Here'}
                    </span>
                  </div>

                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_euk_nuc')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                  >
                    <span className="text-xs text-slate-400 mb-1">Eukaryote Genetic Chamber:</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {droppedLabels.part_euk_nuc || 'Drop Label Here'}
                    </span>
                  </div>

                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_euk_ribo')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                  >
                    <span className="text-xs text-slate-400 mb-1">Eukaryote Cytoplasmic Ribosome:</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {droppedLabels.part_euk_ribo || 'Drop Label Here'}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Compartment Mapping
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or click to rearrange into the correct biological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs md:text-sm text-slate-200 cursor-grab"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-center leading-6 text-xs font-bold text-slate-400">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-600 text-xs">☰</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Submit Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 max-w-sm">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Enter calculated numeric answer"
                    className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                  <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Check Numerical Solution
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                  <span>💡</span> Step-by-Step Biological Solution:
                </div>
                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    <span className="font-bold text-emerald-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Detail Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery →' : 'Next Adaptive Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 to-emerald-950/60 rounded-2xl border border-emerald-800/80 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-3xl">
              🎓
            </div>
            <h2 className="text-2xl font-black text-white">Biotechnology Mastery Achieved!</h2>
            <div className="flex justify-center gap-6 text-sm">
              <span className="text-slate-300">Final Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong></span>
              <span className="text-slate-300">Status: <strong className="text-teal-400 capitalize">{masteryLevel}</strong></span>
              <span className="text-slate-300">Total Errors: <strong className="text-rose-400">{errors}</strong></span>
            </div>
          </div>

          {/* Motivational Feedback Section based on error threshold */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border text-center space-y-1.5 shadow-lg ${
              errors === 0
                ? 'bg-emerald-950/70 border-emerald-500/80'
                : errors <= 3
                ? 'bg-teal-950/70 border-teal-500/80'
                : errors <= 7
                ? 'bg-amber-950/70 border-amber-500/80'
                : 'bg-rose-950/70 border-rose-500/80'
            }`}
          >
            <div className="text-2xl">
              {errors === 0 ? '🏆' : errors <= 3 ? '🌟' : errors <= 7 ? '👏' : '💪'}
            </div>
            <h3
              className={`text-xl font-black uppercase tracking-wider ${
                errors === 0
                  ? 'text-emerald-400'
                  : errors <= 3
                  ? 'text-teal-300'
                  : errors <= 7
                  ? 'text-amber-300'
                  : 'text-rose-300'
              }`}
            >
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
              {errors === 0
                ? 'Outstanding scientific excellence! You demonstrated flawless understanding across all 10 biotechnology modules.'
                : errors <= 3
                ? 'High-level precision! You handled complex buffers, cytological mechanics, and cell cycles with great competence.'
                : errors <= 7
                ? 'Commendable problem-solving! With a brief review of the key equations and staining protocols, your accuracy will reach perfection.'
                : 'Biotechnology involves nuanced quantitative and cytological principles. Review the interactive labs and attempt the challenge suite again — mastery is built step-by-step!'}
            </p>
          </motion.div>

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-xs font-bold text-white uppercase">SRS Spaced Repetition Schedule</p>
                <p className="text-xs text-slate-400">
                  Next review session recommended in{' '}
                  <strong className="text-emerald-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to solidify long-term memory.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-800/60 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                ⚠️ Targeted Misconception Review
              </h4>
              <div className="space-y-2">
                {hitMisconceptions.map(idx => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950 rounded-lg text-xs space-y-1 border border-slate-800">
                      <p className="text-rose-400 font-semibold">❌ Pitfall: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>💭</span> Scientific Reflection & Deep Thinking
            </div>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding with these metacognitive reflection prompts:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How the pH change is 10-fold per unit, or how Cyclin B peaks and is abruptly destroyed by APC/C..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.explanation}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explanation: e.target.value }))}
                  placeholder="e.g. A buffer acts like a chemical shock absorber that absorbs protons to keep cells and enzymes intact..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. In recombinant insulin production, monoclonal antibody manufacturing, blood gas regulation, or agricultural breeding..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <span>🏭</span> {REAL_WORLD_ACTIVITY.title}
            </div>
            <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg text-xs text-slate-300 flex items-start gap-2 border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Confirmed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiotechnologyLowrybronstedTheoryAcidSim;