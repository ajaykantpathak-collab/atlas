'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ───
const NODE_C11_BIOTECH_001 = 'c11_biotech_001';
const NODE_C11_BIOTECH_002 = 'c11_biotech_002';
const NODE_C11_BIOTECH_003 = 'c11_biotech_003';
const NODE_C11_BIOTECH_004 = 'c11_biotech_004';
const NODE_C11_BIOTECH_005 = 'c11_biotech_005';
const NODE_C11_BIOTECH_006 = 'c11_biotech_006';
const NODE_C11_BIOTECH_007 = 'c11_biotech_007';
const NODE_C11_BIOTECH_008 = 'c11_biotech_008';
const NODE_C11_BIOTECH_009 = 'c11_biotech_009';
const NODE_C11_BIOTECH_010 = 'c11_biotech_010';

const ALL_NODE_IDS = [
  NODE_C11_BIOTECH_001,
  NODE_C11_BIOTECH_002,
  NODE_C11_BIOTECH_003,
  NODE_C11_BIOTECH_004,
  NODE_C11_BIOTECH_005,
  NODE_C11_BIOTECH_006,
  NODE_C11_BIOTECH_007,
  NODE_C11_BIOTECH_008,
  NODE_C11_BIOTECH_009,
  NODE_C11_BIOTECH_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'BioTech Horizon: From Ancient Kitchens to Molecular Foundries',
  intro:
    'You are appointed as Lead Junior Bioengineer at the National Bio-Innovation Mission in New Delhi. A nationwide crisis demands your expertise: from traditional dairy bioprocesses and vaccine manufacturing during a dengue outbreak, to recombinant DNA diagnostics and resolving patent disputes over indigenous Basmati rice.',
  context:
    'You must master the formal definitions (OECD vs EFB), historical discoveries, curdling biochemistry, fermentation energetics, GLP/GMP compliance, IPR frameworks, biosafety oversight (GEAC), and biotechnology institutions.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Traditional curd making in an Indian kitchen and recombinant human insulin production in a bioreactor both represent biotechnology. What fundamental feature unites them under the European Federation of Biotechnology (EFB) definition?',
  options: [
    'Both require genetic engineering of microbial plasmid vectors in high-tech labs',
    'Both integrate natural sciences and engineering of biological agents/analogues for goods and services',
    'Both operate exclusively at 37°C using anaerobic homo-fermentation pathways',
    'Both require formal approval from the Genetic Engineering Appraisal Committee (GEAC)',
  ],
  correctIndex: 1,
  hintAfter:
    'Curd uses natural Lactobacillus, while modern insulin uses engineered E. coli. Yet both integrate biological agents and applied science to yield human goods!',
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

// ─── CHALLENGES REPOSITORY (22 Challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Definition (OECD vs EFB) - Foundation Recall
  {
    id: 'ch_001_def_efb',
    nodeId: NODE_C11_BIOTECH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which organization defines biotechnology specifically as "the integration of natural sciences and engineering in order to achieve the application of organisms, cells, parts thereof and molecular analogues for the production of goods and services"?',
    options: [
      'OECD (Organisation for Economic Co-operation and Development)',
      'EFB (European Federation of Biotechnology)',
      'GEAC (Genetic Engineering Appraisal Committee)',
      'DBT (Department of Biotechnology, India)',
    ],
    correctIndex: 1,
    explanation:
      'The EFB definition explicitly adds engineering as an essential partner to natural science and includes molecular analogues. The OECD definition focuses on the application of science and technology to alter living/non-living materials for knowledge, goods, and services.',
    hints: [
      'Look for the keyword "integration of natural sciences and engineering".',
      'This definition was formulated by a European body that wanted to bridge traditional and modern molecular methods.',
      'It is the European Federation of Biotechnology (EFB).',
    ],
    misconceptionIndex: 1,
  },
  // 2. Drag-Sort: Historical Pioneers - Foundation Understanding
  {
    id: 'ch_002_history_sort',
    nodeId: NODE_C11_BIOTECH_002,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange these scientific milestones in correct chronological order (earliest to most recent):',
    sortItems: [
      'Robert Hooke describes cork cells in Micrographia (1665)',
      'Antonie van Leeuwenhoek discovers living microbial "animalcules" (1676)',
      'Louis Pasteur demonstrates microbes cause fermentation (1857)',
      'Alexander Fleming discovers penicillin from Penicillium notatum (1928)',
      'Watson and Crick propose the DNA double-helix model (1953)',
      'Boyer and Cohen perform the first recombinant DNA experiment (1973)',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation:
      'The chronological sequence marks the journey from Hooke (1665) -> Leeuwenhoek (1676) -> Pasteur (1857) -> Fleming (1928) -> Watson & Crick (1953) -> Boyer & Cohen (1973).',
    hints: [
      'Start with the discovery of the dead cell walls in cork (17th century).',
      'Microbiology and fermentation occurred in the 19th century before antibiotics in 1928.',
      'DNA structure (1953) preceded recombinant DNA splicing (1973).',
    ],
    misconceptionIndex: 0,
  },
  // 3. Kitchen Biotech Curd pH - Standard Application
  {
    id: 'ch_003_curd_ph',
    nodeId: NODE_C11_BIOTECH_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Fresh cow milk at pH 6.6 is inoculated with Lactobacillus. During homo-fermentation, lactic acid lowers the pH to the isoelectric point of casein where it coagulates into curd. At what target pH does casein precipitate?',
    correctAnswer: 4.6,
    tolerance: 0.2,
    unit: 'pH',
    explanation:
      'Casein micelles have a net negative surface charge at milk pH (6.6). When Lactobacillus produces lactic acid and drops the pH to ~4.6 (casein isoelectric point), the charge is neutralised, causing casein coagulation.',
    hints: [
      'The milk turns mildly acidic and sour, dropping roughly 2 pH units from neutral.',
      'The isoelectric precipitation of casein occurs between 4.4 and 4.8.',
      'Enter 4.6 pH.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Homo vs Hetero Fermentation - Standard Analysis
  {
    id: 'ch_004_ferment_type',
    nodeId: NODE_C11_BIOTECH_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Amul industrial dairy units select homo-fermentative lactic acid bacteria over hetero-fermentative strains for commercial curd and cheese. Why is homo-fermentation preferred in standardized commercial dairy?',
    options: [
      'Homo-fermentation produces both ethanol and carbon dioxide for a sparkling fizzy drink',
      'Homo-fermentation converts glucose almost exclusively to lactic acid without unwanted gas or alcohol',
      'Homo-fermentation requires high oxygen supply, cutting down nitrogen costs',
      'Homo-fermentation prevents milk protein denaturation permanently',
    ],
    correctIndex: 1,
    explanation:
      'Homo-fermentation converts glucose almost 100% into lactic acid. This gives a uniform acidity, clean sour taste, and solid curd without bubbly gas pockets or alcohol.',
    hints: [
      'Consider what byproduct CO2 or ethanol would do to standard curd consistency.',
      'Homo means "single/same" end product.',
      'Homo-fermentation yields only lactic acid, avoiding unwanted gas cavities or alcohol.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Drag-Label: GLP vs GMP Architecture - Standard Understanding
  {
    id: 'ch_005_glp_gmp_drag',
    nodeId: NODE_C11_BIOTECH_005,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the correct quality standard to its corresponding facility tier and domain:',
    dragItems: [
      { label: 'GLP (Pre-clinical Lab)', targetId: 'zone_lab' },
      { label: 'GMP (Commercial Factory)', targetId: 'zone_factory' },
      { label: 'SOPs & Raw Data Logs', targetId: 'zone_records' },
      { label: 'Batch Release & Sterility', targetId: 'zone_qa' },
    ],
    correctMapping: {
      zone_lab: 'GLP (Pre-clinical Lab)',
      zone_factory: 'GMP (Commercial Factory)',
      zone_records: 'SOPs & Raw Data Logs',
      zone_qa: 'Batch Release & Sterility',
    },
    explanation:
      'GLP applies to non-clinical testing laboratories to guarantee data reproducibility, while GMP governs large-scale industrial manufacturing, batch release, and product safety.',
    hints: [
      'Laboratories testing on cell lines and rodents follow GLP.',
      'Factories producing vaccines like Serum Institute follow GMP.',
      'Match pre-clinical lab to GLP and commercial factory to GMP.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Branches of Biotech Classification - Foundation Classify
  {
    id: 'ch_006_branches_bt',
    nodeId: NODE_C11_BIOTECH_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Bt cotton in Maharashtra incorporates the Cry1Ac insecticidal gene from Bacillus thuringiensis to resist bollworms. Which branch of biotechnology does this represent?',
    options: [
      'Agricultural Biotechnology (Green Biotech)',
      'Medical Biotechnology (Red Biotech)',
      'Industrial Biotechnology (White Biotech)',
      'Environmental Biotechnology (Grey Biotech)',
    ],
    correctIndex: 0,
    explanation:
      'Agricultural biotechnology applies genetic modification, tissue culture, and marker-assisted breeding for crop yield improvement and pest resistance.',
    hints: [
      'Bt cotton is a genetically modified agricultural cash crop.',
      'Crop and livestock improvements fall under agricultural biotechnology.',
      'It is Agricultural Biotechnology.',
    ],
    misconceptionIndex: 0,
  },
  // 7. IPR Basmati Dispute - Advanced Evaluation
  {
    id: 'ch_007_ipr_basmati',
    nodeId: NODE_C11_BIOTECH_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'In the famous 1997 biopiracy case, a Texas company patented lines derived from Indian Basmati rice. Which legal instrument in India protects traditional scented crops based on geographical origin, and which statute protects farmer seed-saving rights?',
    options: [
      'Copyright Act 1957 and Trade Secrets Directive',
      'Geographical Indications (GI) of Goods Act 1999 and PPV & FR Act 2001',
      'Indian Patent Act 1970 (Section 3d) and Trademark Registry',
      'Biological Diversity Act 2002 and Indian Forest Act 1927',
    ],
    correctIndex: 1,
    explanation:
      'Geographical Indications (GI) protect products tied to unique regional agro-climatic origins (like Basmati from the Indo-Gangetic plains), while the Protection of Plant Varieties and Farmers\' Rights (PPV & FR) Act, 2001 safeguards farmers\' rights to save, use, and exchange unbranded seed.',
    hints: [
      'Think of location-based protection (GI) and the 2001 plant variety act.',
      'Basmati is tied to geographical terroir; Indian farmers have protected seed rights under PPV & FR Act.',
      'Option with GI Act 1999 and PPV & FR Act 2001 is correct.',
    ],
    misconceptionIndex: 0,
  },
  // 8. Stem Cell Therapy & ELSI - Standard Evaluation
  {
    id: 'ch_008_elsi_stem',
    nodeId: NODE_C11_BIOTECH_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Why do embryonic stem cells (ESCs) provoke more severe ethical debates than adult multipotent stem cells derived from bone marrow or umbilical cord blood?',
    options: [
      'ESCs can only differentiate into epidermal cells',
      'Harvesting ESCs from the early blastocyst inner cell mass inevitably destroys the viable human embryo',
      'Adult stem cells are pluripotent whereas ESCs are unipotent',
      'ESCs cannot be cultured under sterile laboratory conditions',
    ],
    correctIndex: 1,
    explanation:
      'Embryonic stem cells are pluripotent and can form all three germ layers, but harvesting them from the blastocyst destroys the human embryo, triggering moral debates on personhood. Adult stem cells bypass embryo destruction.',
    hints: [
      'Consider the moral status and survival of the blastocyst embryo during cell harvesting.',
      'Pluripotent ESC extraction terminates embryonic development.',
      'Destruction of the viable embryo is the core ethical dilemma.',
    ],
    misconceptionIndex: 3,
  },
  // 9. Biosafety & GEAC Mandate - Foundation Recall
  {
    id: 'ch_009_geac_mandate',
    nodeId: NODE_C11_BIOTECH_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under which Ministry of the Government of India does the Genetic Engineering Appraisal Committee (GEAC) operate to evaluate environmental releases of GMOs?',
    options: [
      'Ministry of Agriculture and Farmers Welfare',
      'Ministry of Environment, Forest and Climate Change (MoEFCC)',
      'Ministry of Health and Family Welfare',
      'Ministry of Science and Technology (DST)',
    ],
    correctIndex: 1,
    explanation:
      'GEAC is a statutory apex body functioning under the Ministry of Environment, Forest and Climate Change (MoEFCC) under the Environment Protection Act, 1986.',
    hints: [
      'The regulatory body monitors environmental safety, ecology, and forest biodiversity.',
      'It is MoEFCC.',
      'Select Ministry of Environment, Forest and Climate Change.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Institute Matching - Foundation Match
  {
    id: 'ch_010_institute_match',
    nodeId: NODE_C11_BIOTECH_010,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Match the Indian biotechnology institution with its primary mandate and location:',
    options: [
      'CDFD (Hyderabad) -> DNA Fingerprinting & Forensic Diagnostics',
      'Serum Institute of India (Pune) -> Plant Genome Mapping',
      'NCBI (New Delhi) -> Brain & Cognitive Neuroscience',
      'NIPGR (Manesar) -> Vaccine Dose Manufacturing',
    ],
    correctIndex: 0,
    explanation:
      'CDFD (Centre for DNA Fingerprinting and Diagnostics) is situated in Hyderabad. Serum Institute in Pune makes vaccines; NIPGR in New Delhi researches plant genomics; NCBI is an American online biological database.',
    hints: [
      'CDFD has "DNA Fingerprinting" right in its title.',
      'Check which pair correctly identifies Hyderabad and forensics.',
      'CDFD in Hyderabad is dedicated to DNA Fingerprinting and Diagnostics.',
    ],
    misconceptionIndex: 0,
  },
  // 11. Restriction Enzyme EcoRI Palindrome - Advanced Construct
  {
    id: 'ch_011_ecori_palindrome',
    nodeId: NODE_C11_BIOTECH_002,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Assemble the 6-base palindromic recognition sequence cut by the restriction endonuclease EcoRI in the 5\' to 3\' direction:',
    availableParts: ['G', 'A', 'A', 'T', 'T', 'C', 'G', 'C'],
    targetState: 'G A A T T C',
    validationHint: 'The EcoRI palindrome reads 5\'-GAATTC-3\' (and 3\'-CTTAAG-5\' on complementary strand).',
    explanation:
      'EcoRI cuts specifically between G and A in the 5\'-GAATTC-3\' sequence, producing sticky/cohesive 5\' overhangs (AATT). Restriction enzymes recognise exact palindromic sequences.',
    hints: [
      'Starts with Guanine and ends with Cytosine.',
      'Contains a central double-adenine and double-thymine sequence.',
      'Order: G -> A -> A -> T -> T -> C.',
    ],
    misconceptionIndex: 2,
  },
  // 12. Alcoholic Fermentation Stoichiometry - Advanced Application
  {
    id: 'ch_012_ethanol_calc',
    nodeId: NODE_C11_BIOTECH_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'In a distillery in Uttar Pradesh, Saccharomyces cerevisiae ferments 1 mole of glucose (C6H12O6, molar mass 180 g/mol) into ethanol (C2H5OH, molar mass 46 g/mol) and CO2. What is the theoretical yield of ethanol produced in grams?',
    correctAnswer: 92,
    tolerance: 1,
    unit: 'grams',
    explanation:
      'The Gay-Lussac fermentation equation: C6H12O6 -> 2 C2H5OH + 2 CO2. 1 mole of glucose yields 2 moles of ethanol = 2 × 46 g = 92 grams.',
    hints: [
      'Write the balanced equation: 1 Glucose -> 2 Ethanol + 2 CO2.',
      'Each mole of glucose yields 2 moles of ethanol.',
      '2 × 46 g = 92 g.',
    ],
    misconceptionIndex: 0,
  },
  // 13. Recombinant Insulin Chain Linking - Standard Analysis
  {
    id: 'ch_013_insulin_chains',
    nodeId: NODE_C11_BIOTECH_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'In human proinsulin synthesized in vivo, a C-peptide connecting chain is present. How does modern recombinant DNA biotechnology (Eli Lilly / Biocon method) assemble active human insulin in bacteria?',
    options: [
      'Synthesizing Chain A and Chain B separately in E. coli, then extracting and linking them via disulphide bonds in vitro',
      'Expressing intact proinsulin in yeast and keeping the C-peptide attached to preserve receptor binding',
      'Using PCR to fuse animal pancreatic extracts with bacterial cell wall peptidoglycans',
      'Creating hydrogen-bonded circular peptides without any sulfur linkages',
    ],
    correctIndex: 0,
    explanation:
      'Recombinant human insulin is made by producing insulin A and B polypeptide chains in separate E. coli cultures, purifying them, and combining them in vitro by forming covalent disulphide bonds after removing any fusion tags.',
    hints: [
      'Bacterial E. coli lacks mammalian enzymes to cleave C-peptide from proinsulin efficiently.',
      'Chains A and B are produced in two separate vats and joined chemically.',
      'Look for the option mentioning separate synthesis and disulphide bonds.',
    ],
    misconceptionIndex: 1,
  },
  // 14. BSL Level Safety Tiers - Standard Classify
  {
    id: 'ch_014_bsl_levels',
    nodeId: NODE_C11_BIOTECH_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A virology laboratory at ICMR-NIV Pune is working on live Ebola and Nipah viruses that pose a lethal aerosol risk with no licensed cure. What Biosafety Level (BSL) containment facility is mandatory?',
    options: ['BSL-1', 'BSL-2', 'BSL-3', 'BSL-4'],
    correctIndex: 3,
    explanation:
      'BSL-4 is the maximum biosafety level for life-threatening aerosol-transmitted pathogens with no known treatment or vaccine. It requires positive pressure suits, dedicated air supply, and double-door autoclaves.',
    hints: [
      'BSL-1 is for harmless non-pathogens like E. coli K12; BSL-2 is for moderate risk; BSL-3 is for tuberculosis.',
      'Lethal agents without available vaccines require the highest containment tier.',
      'It is Biosafety Level 4 (BSL-4).',
    ],
    misconceptionIndex: 0,
  },
  // 15. IPR Patent Duration India - Foundation Recall
  {
    id: 'ch_015_patent_term',
    nodeId: NODE_C11_BIOTECH_007,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under the Indian Patents Act 1970 (amended in accordance with WTO-TRIPS), what is the statutory term of a granted patent in years from the filing date?',
    correctAnswer: 20,
    tolerance: 0,
    unit: 'years',
    explanation:
      'In India and globally under TRIPS, a patent grants an exclusive monopoly right for 20 years from the date of filing, in exchange for full public disclosure of the invention.',
    hints: [
      'Patents are temporary monopolies, not permanent.',
      'Standard TRIPS term across all technological inventions.',
      'Enter 20 years.',
    ],
    misconceptionIndex: 1,
  },
  // 16. Pasteur vs Spontaneous Generation - Standard Understanding
  {
    id: 'ch_016_pasteur_swan',
    nodeId: NODE_C11_BIOTECH_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Louis Pasteur used swan-neck flasks with nutrient broth to disprove the long-held doctrine of spontaneous generation (abiogenesis). What was the critical observation that proved microbes arise only from pre-existing living cells?',
    options: [
      'Broth in intact swan-neck flasks remained sterile indefinitely because dust/microbes settled in the bend without reaching the liquid',
      'Boiling the broth synthesized new living bacteria directly from chemical salts',
      'The curved neck generated an electric current that killed air particles',
      'Bacteria were found to reproduce exclusively inside dead cork cells',
    ],
    correctIndex: 0,
    explanation:
      'Pasteur demonstrated that intact swan-neck flasks kept broth sterile because airborne spores got trapped in the curve. When the neck was snapped, microbes entered and multiplied, proving biogenesis.',
    hints: [
      'Air could enter freely, but airborne germs settled in the neck bend.',
      'The liquid remained clear until the neck was broken.',
      'Dust and microbes were trapped in the bend of the glass.',
    ],
    misconceptionIndex: 0,
  },
  // 17. Beer Brewing Mashing Step - Standard Analysis
  {
    id: 'ch_017_beer_mashing',
    nodeId: NODE_C11_BIOTECH_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'In industrial beer production, barley grains are germinated (malting) and mashed with warm water. What biochemical enzyme conversion occurs during mashing to prepare the sweet wort?',
    options: [
      'Lipases convert butterfat into volatile esters',
      'Endogenous alpha- and beta-amylases hydrolyse insoluble barley starch into fermentable maltose and glucose',
      'Lactobacillus breaks down casein into curd curds',
      'DNA polymerase synthesizes recombinant plasmid vectors',
    ],
    correctIndex: 1,
    explanation:
      'Germinating barley synthesizes amylase enzymes. During mashing at 65°C, amylases break down grain starch into fermentable sugars (mainly maltose), yielding the nutrient-rich wort for yeast fermentation.',
    hints: [
      'Think about what starch in barley needs to become so yeast can eat it.',
      'Starch is a polysaccharide that amylase breaks down into maltose sugars.',
      'Amylases hydrolyse starch to maltose.',
    ],
    misconceptionIndex: 0,
  },
  // 18. Boyer-Cohen rDNA Experiment - Advanced Analysis
  {
    id: 'ch_018_boyer_cohen',
    nodeId: NODE_C11_BIOTECH_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In the historic 1973 experiment by Herbert Boyer and Stanley Cohen, what specific components did Boyer and Cohen contribute to create the world\'s first recombinant organism?',
    options: [
      'Boyer provided EcoRI restriction enzyme; Cohen provided the antibiotic-resistance bacterial plasmid (pSC101)',
      'Boyer supplied a compound microscope; Cohen supplied pea plants from the Brno monastery',
      'Boyer isolated penicillin; Cohen developed the swan-neck glass flask',
      'Boyer provided X-ray diffraction images; Cohen built the wire double helix',
    ],
    correctIndex: 0,
    explanation:
      'Herbert Boyer (UCSF) isolated the EcoRI restriction enzyme that generates cohesive sticky ends; Stanley Cohen (Stanford) had developed plasmids (pSC101) that could be introduced into E. coli via transformation.',
    hints: [
      'One scientist provided the molecular scissors, the other provided the vector plasmid.',
      'Boyer discovered EcoRI; Cohen worked with plasmids.',
      'Option A pairs EcoRI with bacterial plasmid pSC101.',
    ],
    misconceptionIndex: 0,
  },
  // 19. DBT Policy Role in India - Standard Understanding
  {
    id: 'ch_019_dbt_role',
    nodeId: NODE_C11_BIOTECH_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'A biotechnology start-up in Bengaluru applies for research grants and national biosafety approvals. What is the fundamental mandate of the Department of Biotechnology (DBT), Ministry of Science & Technology?',
    options: [
      'To operate as a single commercial dairy packaging factory in Gujarat',
      'To act as India\'s apex policy-making, funding, and promotional department for biotech research and infrastructure',
      'To conduct forensic paternity DNA fingerprinting exclusively for high courts',
      'To maintain the global PubMed search engine in Maryland, USA',
    ],
    correctIndex: 1,
    explanation:
      'DBT is the central government department responsible for formulating biotechnology policy, funding university labs, establishing autonomous research institutes, and building biotech parks.',
    hints: [
      'DBT is a national department under the Ministry of Science and Technology.',
      'It provides funding, guidance, and policy direction rather than running a single commercial shop.',
      'Apex policy-making, funding, and promotional body.',
    ],
    misconceptionIndex: 1,
  },
  // 20. Bioremediation Oil Spills - Standard Application
  {
    id: 'ch_020_bioremediation',
    nodeId: NODE_C11_BIOTECH_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Following a crude oil tanker collision off the Mumbai coast, environmental scientists spray nitrogen/phosphorus fertilizers to stimulate native Alcanivorax and Pseudomonas bacteria to degrade hydrocarbons. This technique is known as:',
    options: [
      'Biostimulation (Environmental Bioremediation)',
      'Micropropagation tissue culture',
      'Hybridoma monoclonal antibody selection',
      'In vitro embryo cleavage',
    ],
    correctIndex: 0,
    explanation:
      'Biostimulation adds limiting nutrients (N and P) to speed up pollutant breakdown by native oil-degrading microorganisms. This is a core environmental biotechnology practice.',
    hints: [
      'Nutrient addition stimulates microbial metabolic activity in contaminated environments.',
      'Bio + Stimulation.',
      'It is Biostimulation.',
    ],
    misconceptionIndex: 0,
  },
  // 21. IVF Embryo Selection ELSI - Advanced Evaluation
  {
    id: 'ch_021_ivf_elsi',
    nodeId: NODE_C11_BIOTECH_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Pre-implantation Genetic Diagnosis (PGD) during IVF enables clinicians to screen embryos before uterine transfer. In India, under the Assisted Reproductive Technology (ART) Act and PC-PNDT Act, what ethical practice is strictly prohibited?',
    options: [
      'Screening for life-threatening monogenic diseases like Thalassemia major',
      'Sex selection and sex determination for non-medical social preferences',
      'Freezing surplus healthy embryos with informed patient consent',
      'Transferring a single euploid embryo to avoid multiple gestation risks',
    ],
    correctIndex: 1,
    explanation:
      'Indian laws (ART Act 2021 & PC-PNDT Act) strictly forbid non-medical sex selection and female foeticide/embryo filtering. PGD is legally permitted only to prevent severe genetic disorders.',
    hints: [
      'Think about India\'s strict laws against female feticide and gender discrimination.',
      'Sex selection is illegal.',
      'Sex selection and non-medical sex determination are strictly outlawed.',
    ],
    misconceptionIndex: 0,
  },
  // 22. Nanobiotech Targeted Drug Delivery - Advanced Application
  {
    id: 'ch_022_nanobiotech',
    nodeId: NODE_C11_BIOTECH_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Lipid Nanoparticles (LNPs) used in modern mRNA vaccines encapsulate delicate genetic transcripts. What dual advantage does this nanobiotechnological delivery system provide?',
    options: [
      'Protects fragile mRNA from degradation by extracellular ribonucleases (RNases) and facilitates cellular endocytosis across cell membranes',
      'Replaces the requirement for human host ribosomes during protein translation',
      'Permanently inserts bacterial DNA into the host nuclear genome',
      'Transforms the mRNA molecule into a living spore resistant to autoclaving',
    ],
    correctIndex: 0,
    explanation:
      'Lipid nanoparticles shield naked mRNA from rapid enzymatic digestion by ubiquitous RNases in body fluids and enable the lipid capsule to fuse with cell membranes for smooth cytoplasmic entry.',
    hints: [
      'Unprotected mRNA is rapidly destroyed by RNase enzymes in the bloodstream.',
      'Lipid spheres fuse with lipid bilayer cell membranes.',
      'Protects from RNase degradation and aids membrane endocytosis.',
    ],
    misconceptionIndex: 0,
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BIOTECH_001,
  title: 'Biotechnology: Foundations, History & Industrial Applications',
  definition:
    'Biotechnology is the application of scientific principles and engineering to living organisms, cells, and molecular analogues to produce knowledge, goods, and services for human welfare.',
  eli5:
    'Biotechnology is putting tiny living helpers—like bacteria, yeast, and plant cells—to work making cheese, medicines, clean energy, and cleaner crops!',
  misconceptions: [
    {
      misconception: 'Biotechnology only means modern genetic engineering and rDNA.',
      correction:
        'Biotechnology spans thousands of years, from ancient kitchen curdling and beer brewing (traditional) to recombinant insulin and CRISPR (modern).',
    },
    {
      misconception: 'The OECD and EFB definitions are identical.',
      correction:
        'The OECD emphasizes science & technology applied to living/non-living materials, while the EFB explicitly stresses the integration of natural sciences and engineering with molecular analogues.',
    },
    {
      misconception: 'Restriction endonucleases cut DNA randomly like scissors.',
      correction:
        'Restriction endonucleases recognize specific palindromic sequences (e.g., EcoRI recognizes 5\'-GAATTC-3\') and cut at exact phosphodiester bonds.',
    },
    {
      misconception: 'Embryonic stem cells and adult stem cells raise identical ethical questions.',
      correction:
        'Harvesting pluripotent embryonic stem cells destroys the viable human blastocyst, creating profound ethical dilemmas not present with adult multipotent stem cells.',
    },
    {
      misconception: 'GLP and GMP mean the exact same laboratory cleanliness.',
      correction:
        'GLP ensures pre-clinical research data integrity and traceability; GMP governs commercial manufacturing consistency, sterility, and batch safety.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which definition of biotechnology includes "molecular analogues"?',
      options: ['EFB definition', 'OECD definition', 'WHO definition', 'GEAC definition'],
      correctIndex: 0,
    },
    {
      question: 'Who coined the term "cell" after observing dead cork compartments in 1665?',
      options: ['Robert Hooke', 'Antonie van Leeuwenhoek', 'Gregor Mendel', 'Louis Pasteur'],
      correctIndex: 0,
    },
    {
      question: 'What bacterium is primarily responsible for converting milk into curd?',
      options: ['Lactobacillus', 'Saccharomyces cerevisiae', 'Bacillus thuringiensis', 'Pseudomonas putida'],
      correctIndex: 0,
    },
    {
      question: 'What is the optimal pH for casein precipitation in curd formation?',
      options: ['4.6', '6.6', '7.4', '2.0'],
      correctIndex: 0,
    },
    {
      question: 'Which of the following is a product of alcoholic fermentation by yeast?',
      options: ['Ethanol + CO2', 'Lactic acid + CO2', 'Citric acid only', 'Acetic acid only'],
      correctIndex: 0,
    },
    {
      question: 'What is the statutory duration of a patent in India under the Patents Act 1970?',
      options: ['20 years', '10 years', '50 years', 'Lifetime of inventor'],
      correctIndex: 0,
    },
    {
      question: 'Which Indian statutory body approves the commercial release of GMOs?',
      options: ['GEAC', 'DBT', 'ICMR', 'CCMB'],
      correctIndex: 0,
    },
    {
      question: 'Which company in Pune is the largest vaccine manufacturer in the world by doses?',
      options: ['Serum Institute of India', 'Biocon', 'Bharat Biotech', 'Dr. Reddy\'s Labs'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Demonstrate proficiency across definitions (OECD/EFB), key scientist milestones, curdling/fermentation biochemistry, GLP/GMP frameworks, 7 biotech branches, IPR rules, ELSI dilemmas, and Indian regulatory/institutional mandates.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Kitchen Bioreactor: Casein Coagulation',
    instruction: 'Adjust the incubation temperature and observe bacterial lactic acid synthesis and casein network formation.',
    interactionType: 'curd-sim',
    nodeId: NODE_C11_BIOTECH_003,
  },
  {
    title: '2. Fermentation Pathways: Glucose Fate',
    instruction: 'Switch between Homo-lactic, Hetero-lactic, and Alcoholic fermentation to observe substrate-product stoichiometry.',
    interactionType: 'pathway-sim',
    nodeId: NODE_C11_BIOTECH_004,
  },
  {
    title: '3. Molecular Scissors: Restriction EcoRI Cutting',
    instruction: 'Slide the restriction enzyme along the double-stranded DNA to locate the palindromic GAATTC sequence and cleave sticky ends.',
    interactionType: 'dna-cut-sim',
    nodeId: NODE_C11_BIOTECH_002,
  },
  {
    title: '4. Seven Branches: The Biotech Matrix',
    instruction: 'Click on each biotech color branch to explore real-world Indian applications from Bt cotton to mRNA nanoparticles.',
    interactionType: 'branches-sim',
    nodeId: NODE_C11_BIOTECH_006,
  },
  {
    title: '5. Regulatory Command: GEAC Biosafety Tiers',
    instruction: 'Evaluate transgenic crop field trial parameters and balance gene flow containment against agricultural productivity.',
    interactionType: 'biosafety-sim',
    nodeId: NODE_C11_BIOTECH_009,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you inoculate milk with Lactobacillus and hold it at 0°C in an ice chest, will curd set normally in 6 hours?',
    options: [
      'Yes, bacteria reproduce faster at freezing temperatures',
      'No, low temperature inactivates bacterial enzymes and slows reproduction to near zero',
      'Yes, cold temperatures freeze casein directly into curd',
      'No, because cold temperature converts lactose into ethanol gas',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the temperature slider below 15°C and watch the Lactobacillus metabolic rate collapse!',
  },
  {
    question: 'Predict: What will happen to ethanol and CO2 production if you switch from alcoholic fermentation to homo-lactic fermentation in the bioreactor?',
    options: [
      'Ethanol and CO2 production will double',
      'Ethanol and CO2 bubbles will cease, producing only lactic acid',
      'Methane gas bubbles will violently evolve',
      'Enzyme pathways will freeze completely',
    ],
    correctIndex: 1,
    verifyInstruction: 'Switch the fermentation pathway to Homo-Lactic and observe the end products and lack of gas formation!',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observe the casein micelle visualizer: What happens to the micelle repulsion as pH drops from 6.6 to 4.6?',
    observableOptions: [
      'Negative surface charges are neutralized, eliminating electrostatic repulsion so casein chains aggregate into a firm gel',
      'Micelles gain strong positive charges and fly apart',
      'Casein dissolves completely into clear water',
      'Milk begins to boil violently',
    ],
    correctIndex: 0,
  },
  {
    question: 'Observe the EcoRI restriction cut visualizer: Where specifically does EcoRI cleave the double-stranded DNA?',
    observableOptions: [
      'Between G and A on both strands, creating staggered single-stranded sticky overhangs (5\'-AATT-3\')',
      'Randomly cuts every nucleotide bond across the entire plasmid',
      'Cuts only between two Thymine bases leaving blunt edges',
      'Destroys only the ribose sugar without breaking phosphate bonds',
    ],
    correctIndex: 0,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Biosafety Officer Capstone Challenge',
  description:
    'Formulate a comprehensive launch dossier for an indigenously developed drought-tolerant GM Chickpea (Cicer arietinum) variety in Maharashtra.',
  steps: [
    'Define the project under the EFB framework, identifying host plant, target gene, and vector.',
    'Formulate GLP pre-clinical toxicology testing protocols on rodent models.',
    'Draft a Multi-Location Research Trial (MLRT) application for GEAC approval under MoEFCC guidelines.',
    'Prepare a Plant Breeders\' Rights and Farmers\' Rights registration dossier under the PPV & FR Act, 2001.',
    'Establish GMP batch release criteria for commercial certified seed production.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_BiotechnologyBiotechnologyDefinitionoecdSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── TOPIC CONFIG ───
  const subjectConfig = SUBJECT_CONFIG['biotechnology'] || {
    name: 'Biotechnology',
    emoji: '🧬',
    color: 'emerald',
  };

  // ─── PHASE FLOW ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // ─── SIMULATION VARIABLE CONTROLS ───
  // Curd Sim
  const [curdTemp, setCurdTemp] = useState<number>(37);
  const [inoculumPercent, setInoculumPercent] = useState<number>(3);
  const [curdHours, setCurdHours] = useState<number>(6);
  const [curdPH, setCurdPH] = useState<number>(4.6);
  const [coagulationScore, setCoagulationScore] = useState<number>(95);

  // Fermentation Sim
  const [fermentPathway, setFermentPathway] = useState<'homo' | 'hetero' | 'alcoholic'>('homo');

  // EcoRI Restriction Sim
  const [isDnaCut, setIsDnaCut] = useState<boolean>(false);

  // Branches Matrix Sim
  const [activeBranch, setActiveBranch] = useState<string>('red');

  // Biosafety Containment Sim
  const [geneFlowIsolationMeters, setGeneFlowIsolationMeters] = useState<number>(50);
  const [refugeCropPercent, setRefugeCropPercent] = useState<number>(20);

  // Adaptive & Gamification
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints & Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag & Sort & Construct
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery Hook
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual Effects
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: BKT MASTERY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── EFFECT 3: CURD BIOCHEMISTRY REAL-TIME CALCULATION ───
  useEffect(() => {
    const tempFactor = Math.max(0, 1 - Math.pow(Math.abs(curdTemp - 38) / 22, 2));
    const inoculumFactor = Math.min(1.5, Math.max(0.2, inoculumPercent / 3));
    const timeFactor = Math.min(1.2, curdHours / 6);

    const microbialRate = tempFactor * inoculumFactor * timeFactor;
    const calcPH = Math.max(4.2, Number((6.6 - 2.2 * microbialRate).toFixed(2)));
    setCurdPH(calcPH);

    const phDistance = Math.abs(calcPH - 4.6);
    const firmness = Math.max(0, Math.min(100, Math.round((1 - phDistance / 1.5) * 100)));
    setCoagulationScore(firmness);
  }, [curdTemp, inoculumPercent, curdHours]);

  // ─── EFFECT 4: 2D CANVAS PARTICLES / FERMENTATION ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    interface Bubble {
      x: number;
      y: number;
      r: number;
      speed: number;
      opacity: number;
    }
    const bubbles: Bubble[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 2 + Math.random() * 4,
      speed: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.7,
    }));

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (fermentPathway === 'alcoholic') {
        grad.addColorStop(0, 'rgba(234, 179, 8, 0.25)');
        grad.addColorStop(1, 'rgba(180, 83, 9, 0.45)');
      } else if (fermentPathway === 'homo') {
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
        grad.addColorStop(1, 'rgba(4, 120, 87, 0.4)');
      } else {
        grad.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
        grad.addColorStop(1, 'rgba(67, 56, 202, 0.45)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        b.y -= b.speed;
        if (b.y < 0) {
          b.y = canvas.height + 5;
          b.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle =
          fermentPathway === 'alcoholic'
            ? `rgba(254, 240, 138, ${b.opacity})`
            : `rgba(255, 255, 255, ${b.opacity * 0.6})`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height * 0.5 + Math.sin((x + frame * 2) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [fermentPathway]);

  // ─── EFFECT 5: CLEANUP TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

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
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Outstanding! You understand that both bridge biology and engineering.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration laboratories. Dive in and manipulate the variables!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all parameters with zero grading pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering structured competency assessment. Read carefully and apply your knowledge!');
  }, []);

  const handleCurdTempChange = useCallback((val: number) => {
    setCurdTemp(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && val <= 15) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleFermentPathwayChange = useCallback((path: 'homo' | 'hetero' | 'alcoholic') => {
    setFermentPathway(path);
    audioManager.play('tap');
    speechManager.speak(
      path === 'homo'
        ? 'Homo-lactic fermentation: Single product lactic acid.'
        : path === 'alcoholic'
        ? 'Alcoholic fermentation by Saccharomyces cerevisiae: Ethanol and CO2.'
        : 'Hetero-lactic fermentation: Mixed acids, ethanol, and CO2.'
    );
  }, []);

  const handleCutDnaClick = useCallback(() => {
    audioManager.play('pickup');
    setTimeout(() => {
      setIsDnaCut(true);
      audioManager.play('drop-correct');
      speechManager.speak('EcoRI cleaved phosphodiester bonds between G and A, producing sticky cohesive ends!');
    }, 600);
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work, Engineer! You have achieved mastery across ISC Class 11 Biotechnology!');
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
        challenge.type === 'classify' ||
        challenge.type === 'distinguish' ||
        challenge.type === 'match'
      ) {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          challenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(challenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step scientific explanation together.');

          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-xl border border-emerald-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              ISC Class 11 Biotechnology • Unit 1 Foundations
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill / Difficulty Tracker */}
        <div className="flex items-center gap-3">
          <motion.div
            key={phase}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-900/60 border border-indigo-500/50 text-indigo-300"
          >
            Phase: {phase}
          </motion.div>

          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950 border border-rose-500 text-rose-300'
                  : 'bg-amber-950 border border-amber-500 text-amber-300'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/40 shadow-inner"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400 text-lg">✨</span>
              <h2 className="text-lg font-bold text-indigo-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-200/80 bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/40">
              <strong className="text-amber-300">Mission Brief: </strong>
              {SCENARIO.context}
            </p>
          </motion.div>

          {/* Discovery Question Card */}
          <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span>🔬</span>
              <span>Intuition Check (Ungraded)</span>
            </div>
            <p className="text-base md:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, backgroundColor: 'rgba(51, 65, 85, 0.8)' }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-800/90 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! The EFB integrates biology and engineering across all eras.'
                    : '👉 ' + DISCOVERY_QUESTION.hintAfter}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 hover:brightness-110 flex items-center gap-2"
                >
                  Enter Visual Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED EXPLORATION (Brilliant.org Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-2 bg-slate-900/80 rounded-2xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`flex-1 min-w-[140px] px-3 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          {/* Interactive Prediction / Observation Active Callout */}
          <div className="p-4 bg-indigo-950/40 border border-indigo-700/50 rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">💡</span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Predict & Observe Lab Task
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-300">
              {currentSlide === 0
                ? PREDICTION_QUESTIONS[0].verifyInstruction
                : currentSlide === 1
                ? PREDICTION_QUESTIONS[1].verifyInstruction
                : 'Interact with the lab controls below and observe the molecular mechanisms in action!'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-emerald-400 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: CURD COAGULATION SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
                  {/* Left: Interactive Controls */}
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Incubation Temperature (°C)</span>
                        <span
                          className={`font-mono ${
                            curdTemp >= 35 && curdTemp <= 42 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {curdTemp} °C
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={60}
                        value={curdTemp}
                        onChange={(e) => handleCurdTempChange(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set incubation temperature"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>0°C (Inactivated)</span>
                        <span>37°C (Optimum)</span>
                        <span>60°C (Denatured)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Starter Inoculum Volume (%)</span>
                        <span className="text-indigo-400 font-mono">{inoculumPercent} %</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={10}
                        step={0.5}
                        value={inoculumPercent}
                        onChange={(e) => {
                          setInoculumPercent(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500"
                        aria-label="Set starter inoculum"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Incubation Time (Hours)</span>
                        <span className="text-amber-400 font-mono">{curdHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={16}
                        value={curdHours}
                        onChange={(e) => {
                          setCurdHours(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500"
                        aria-label="Set incubation time"
                      />
                    </div>

                    {/* Gauges */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400">Resulting Milk pH</span>
                        <div className="text-2xl font-black font-mono mt-1 text-emerald-400">
                          {curdPH}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {curdPH <= 4.7 ? 'Isoelectric Acidified' : 'Liquid Emulsion'}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400">Casein Network Gel</span>
                        <div className="text-2xl font-black font-mono mt-1 text-indigo-400">
                          {coagulationScore}%
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {coagulationScore > 80 ? 'Thick Solid Curd' : 'Runny / Watery'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: SVG Biochemical Microscopic Visualizer */}
                  <div className="flex flex-col items-center justify-center bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 mb-2">
                      Casein Micelle Coagulation Chamber
                    </span>
                    <svg viewBox="0 0 320 220" className="w-full max-w-[280px]">
                      <rect x="40" y="30" width="240" height="170" rx="15" fill="#0f172a" stroke="#334155" strokeWidth="3" />
                      <motion.rect
                        x="43"
                        y="60"
                        width="234"
                        height="137"
                        rx="12"
                        animate={{
                          fill:
                            coagulationScore > 75
                              ? '#f8fafc'
                              : curdPH < 5.5
                              ? '#e2e8f0'
                              : '#cbd5e1',
                          opacity: coagulationScore > 75 ? 0.95 : 0.6,
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      {[
                        { cx: 90, cy: 100, ox: 150, oy: 120 },
                        { cx: 130, cy: 150, ox: 160, oy: 130 },
                        { cx: 180, cy: 90, ox: 165, oy: 110 },
                        { cx: 220, cy: 140, ox: 175, oy: 125 },
                        { cx: 160, cy: 120, ox: 160, oy: 120 },
                      ].map((dot, i) => (
                        <motion.g
                          key={i}
                          animate={{
                            x: (dot.ox - dot.cx) * (coagulationScore / 100),
                            y: (dot.oy - dot.cy) * (coagulationScore / 100),
                          }}
                          transition={{ type: 'spring', stiffness: 60 }}
                        >
                          <circle
                            cx={dot.cx}
                            cy={dot.cy}
                            r={coagulationScore > 80 ? '16' : '12'}
                            fill={curdPH <= 4.7 ? '#64748b' : '#38bdf8'}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                          <text
                            x={dot.cx}
                            y={dot.cy + 3}
                            textAnchor="middle"
                            fontSize="8"
                            fill="#ffffff"
                            fontWeight="bold"
                          >
                            {curdPH <= 4.7 ? 'Net 0' : '- -'}
                          </text>
                        </motion.g>
                      ))}

                      <motion.rect
                        x="70"
                        y="160"
                        width="26"
                        height="9"
                        rx="4"
                        fill="#10b981"
                        animate={{ rotate: curdTemp > 30 && curdTemp < 45 ? [0, 10, 0] : 0 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                      <motion.rect
                        x="210"
                        y="80"
                        width="24"
                        height="8"
                        rx="4"
                        fill="#10b981"
                        animate={{ rotate: curdTemp > 30 && curdTemp < 45 ? [0, -15, 0] : 0 }}
                        transition={{ repeat: Infinity, duration: 2.2 }}
                      />
                    </svg>

                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      {curdPH <= 4.7
                        ? '✓ Casein charges neutralised (pI = 4.6). Semi-solid curd network formed!'
                        : 'Repulsive negative surface charges maintain liquid suspension.'}
                    </p>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: FERMENTATION PATHWAYS ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'homo', label: 'Homo-Lactic (Lactobacillus)', sub: 'Yield: 2 Lactic Acid' },
                      { id: 'hetero', label: 'Hetero-Lactic (Leuconostoc)', sub: 'Yield: Lactate + Ethanol + CO2' },
                      { id: 'alcoholic', label: 'Alcoholic (Saccharomyces)', sub: 'Yield: 2 Ethanol + 2 CO2' },
                    ].map((btn) => (
                      <motion.button
                        key={btn.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFermentPathwayChange(btn.id as 'homo' | 'hetero' | 'alcoholic')}
                        className={`flex-1 min-w-[200px] p-3 rounded-xl border text-left transition-all ${
                          fermentPathway === btn.id
                            ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-xs">{btn.label}</div>
                        <div className="text-[11px] text-indigo-400/90">{btn.sub}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* 2D Canvas Animated Reactor */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800">
                    <canvas ref={canvasRef} width={600} height={160} className="w-full h-[160px]" />
                    <div className="absolute top-3 left-4 text-xs font-bold text-white bg-slate-950/80 px-3 py-1 rounded-full border border-slate-700">
                      Bioreactor: {fermentPathway.toUpperCase()} FERMENTATION
                    </div>
                  </div>

                  {/* Biochemical Equation Breakdown */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-sm">
                    <span className="text-xs font-bold uppercase text-amber-400">Chemical Equation:</span>
                    <div className="font-mono text-base font-bold text-emerald-300 mt-1">
                      {fermentPathway === 'homo' && 'C6H12O6 (Glucose) ──[Homo-fermenters]──> 2 C3H6O3 (Lactic Acid) + 2 ATP'}
                      {fermentPathway === 'hetero' && 'C6H12O6 ──[Hetero-fermenters]──> Lactic Acid + C2H5OH (Ethanol) + CO2 (Gas)'}
                      {fermentPathway === 'alcoholic' && 'C6H12O6 (Glucose) ──[S. cerevisiae]──> 2 C2H5OH (Ethanol) + 2 CO2 (Gas) + 2 ATP'}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: RESTRICTION ENZYME MOLECULAR SCISSORS ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400 mb-2">
                      EcoRI recognises the palindromic sequence: <strong className="text-amber-400 font-mono">5'-G A A T T C-3'</strong>
                    </p>

                    <svg viewBox="0 0 500 120" className="w-full">
                      <g className="font-mono font-bold text-sm">
                        <text x="20" y="40" fill="#94a3b8">5'-</text>
                        <text x="60" y="40" fill="#38bdf8">C</text>
                        <text x="90" y="40" fill="#38bdf8">T</text>
                        <motion.g animate={{ fill: isDnaCut ? '#f43f5e' : '#10b981' }}>
                          <text x="140" y="40">G</text>
                          <text x="170" y="40">A</text>
                          <text x="200" y="40">A</text>
                          <text x="230" y="40">T</text>
                          <text x="260" y="40">T</text>
                          <text x="290" y="40">C</text>
                        </motion.g>
                        <text x="340" y="40" fill="#38bdf8">A</text>
                        <text x="370" y="40" fill="#38bdf8">G</text>
                        <text x="410" y="40" fill="#94a3b8">-3'</text>
                      </g>

                      <g className="font-mono font-bold text-sm">
                        <text x="20" y="80" fill="#94a3b8">3'-</text>
                        <text x="60" y="80" fill="#38bdf8">G</text>
                        <text x="90" y="80" fill="#38bdf8">A</text>
                        <motion.g animate={{ fill: isDnaCut ? '#f43f5e' : '#10b981' }}>
                          <text x="140" y="80">C</text>
                          <text x="170" y="80">T</text>
                          <text x="200" y="80">T</text>
                          <text x="230" y="80">A</text>
                          <text x="260" y="80">A</text>
                          <text x="290" y="80">G</text>
                        </motion.g>
                        <text x="340" y="80" fill="#38bdf8">T</text>
                        <text x="370" y="80" fill="#38bdf8">C</text>
                        <text x="410" y="80" fill="#94a3b8">-5'</text>
                      </g>

                      {isDnaCut && (
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          d="M 155 25 L 155 55 L 275 55 L 275 95"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="3"
                          strokeDasharray="4 2"
                        />
                      )}
                    </svg>

                    <div className="flex justify-center mt-4">
                      {!isDnaCut ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCutDnaClick}
                          className="px-6 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/40 flex items-center gap-2"
                        >
                          ✂️ Apply EcoRI Restriction Endonuclease
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsDnaCut(false)}
                          className="px-6 py-2 bg-slate-700 text-white font-bold text-xs rounded-xl"
                        >
                          Reset DNA Strand
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: 7 BRANCHES OF BIOTECHNOLOGY ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'green', name: 'Agricultural (Green)', color: '#22c55e', ex: 'Bt Cotton, GM Mustard' },
                      { id: 'red', name: 'Medical (Red)', color: '#ef4444', ex: 'Recombinant Insulin, Gene Therapy' },
                      { id: 'white', name: 'Industrial (White)', color: '#f8fafc', ex: 'Detergent Enzymes, Bioethanol' },
                      { id: 'grey', name: 'Environmental (Grey)', color: '#94a3b8', ex: 'Oil Bioremediation (Pseudomonas)' },
                      { id: 'blue', name: 'Microbial (Fermentation)', color: '#3b82f6', ex: 'Penicillin, Curd Cultures' },
                      { id: 'nano', name: 'Nanobiotech', color: '#a855f7', ex: 'mRNA Lipid Nanoparticles' },
                      { id: 'immune', name: 'Immunology', color: '#f59e0b', ex: 'Monoclonal Antibodies, Vaccines' },
                    ].map((b) => (
                      <motion.button
                        key={b.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setActiveBranch(b.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeBranch === b.id
                            ? 'bg-slate-800 border-indigo-500 shadow-md'
                            : 'bg-slate-900/80 border-slate-800 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="text-xs font-bold" style={{ color: b.color }}>
                          {b.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-1">{b.ex}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-400">Selected Branch Focus:</span>
                      <p className="text-sm text-slate-200 mt-1">
                        {activeBranch === 'green' && 'Agricultural Biotechnology: Uses transgenics & tissue culture to enhance food security.'}
                        {activeBranch === 'red' && 'Medical Biotechnology: Employs rDNA technology to manufacture safe, non-allergic human therapeutics.'}
                        {activeBranch === 'white' && 'Industrial Biotechnology: Replaces harsh chemical catalysts with high-efficiency biological enzymes.'}
                        {activeBranch === 'grey' && 'Environmental Biotechnology: Deploys microbial consortia to clean oil spills and municipal wastewater.'}
                        {activeBranch === 'blue' && 'Microbial Biotechnology: Industrial scale fermentation for life-saving antibiotics like Penicillin.'}
                        {activeBranch === 'nano' && 'Nanobiotechnology: Targeted delivery of genetic drugs directly into diseased tissue.'}
                        {activeBranch === 'immune' && 'Immunology: High-specificity monoclonal antibodies and synthetic prophylactic vaccines.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: BIOSAFETY & GEAC REGULATORY TIERS ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Isolation Perimeter Distance</span>
                        <span className="text-emerald-400 font-mono">{geneFlowIsolationMeters} meters</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={200}
                        step={10}
                        value={geneFlowIsolationMeters}
                        onChange={(e) => setGeneFlowIsolationMeters(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set isolation distance"
                      />

                      <div className="flex justify-between text-xs font-bold text-slate-300 pt-2">
                        <span>Structured Non-Bt Refuge Area</span>
                        <span className="text-indigo-400 font-mono">{refugeCropPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        value={refugeCropPercent}
                        onChange={(e) => setRefugeCropPercent(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set refuge area"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center text-center">
                      <span className="text-xs text-slate-400">GEAC Environmental Clearance Risk Score</span>
                      <div
                        className={`text-3xl font-black font-mono my-2 ${
                          geneFlowIsolationMeters >= 50 && refugeCropPercent >= 20
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {geneFlowIsolationMeters >= 50 && refugeCropPercent >= 20
                          ? 'APPROVED (Low Risk)'
                          : 'PENDING MITIGATION'}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Sufficient isolation prevents gene flow to wild relatives; refuge crops delay pest resistance.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab Step Nav Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl disabled:opacity-40 text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs font-mono text-slate-400">
                  Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide((s) => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/40"
                  >
                    Open Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Interactive Research Sandbox</h3>
                <p className="text-xs text-slate-400">
                  Experiment freely with all bioprocess variables with zero penalty.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400">Milk Coagulation Temp</span>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={curdTemp}
                  onChange={(e) => handleCurdTempChange(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Set temperature"
                />
                <div className="text-xs font-mono text-slate-300">Temp: {curdTemp}°C | pH: {curdPH}</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400">Fermentation Pathway</span>
                <div className="flex gap-2">
                  {(['homo', 'alcoholic'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => handleFermentPathwayChange(p)}
                      className={`flex-1 py-1 text-xs rounded-lg font-bold capitalize ${
                        fermentPathway === p ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-400">EcoRI Endonuclease Cut</span>
                <button
                  onClick={handleCutDnaClick}
                  className="w-full py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold"
                >
                  {isDnaCut ? 'Cleaved (Sticky Ends)' : 'Cut 5\'-GAATTC-3\''}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">
                Question <strong className="text-white">{currentChallenge + 1}</strong> of{' '}
                <strong className="text-white">{filteredChallenges.length}</strong>
              </span>
              <span className="text-emerald-400 font-mono font-bold">
                Mastery: {masteryLevel.toUpperCase()}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-500'
                : 'border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-indigo-950 border border-indigo-500/40 text-indigo-300 uppercase tracking-wider">
                NEP 2020: {challenge.competencyLevel}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {challenge.nodeId}</span>
            </div>

            <h2 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h2>

            {/* ─── CHALLENGE TYPE: MCQ (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      disabled={showExplanation}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left p-4 rounded-xl text-sm border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* ─── CHALLENGE TYPE: NUMERIC INPUT ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    disabled={showExplanation}
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-emerald-500 outline-none w-48"
                    aria-label="Numeric input"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                </div>
                {!showExplanation && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                  >
                    Submit Answer
                  </motion.button>
                )}
              </div>
            )}

            {/* ─── CHALLENGE TYPE: DRAG-LABEL ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg cursor-grab shadow"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'zone_lab', title: 'Pre-clinical Testing Laboratory' },
                    { id: 'zone_factory', title: 'Commercial Vaccine Manufacturing' },
                    { id: 'zone_records', title: 'Documentation & Calibration' },
                    { id: 'zone_qa', title: 'Quality Assurance & Batch Release' },
                  ].map((drop) => (
                    <div
                      key={drop.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(drop.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[80px] flex flex-col justify-center items-center text-center"
                    >
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{drop.title}</span>
                      <div className="text-xs font-bold text-emerald-400 mt-1">
                        {droppedLabels[drop.id] || 'Drop label here'}
                      </div>
                    </div>
                  ))}
                </div>

                {!showExplanation && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl mt-2"
                  >
                    Validate Labels
                  </motion.button>
                )}
              </div>
            )}

            {/* ─── CHALLENGE TYPE: DRAG-SORT ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="font-mono text-indigo-400 font-bold">{idx + 1}.</span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                {!showExplanation && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const ans =
                        sortArrangement.length > 0
                          ? sortArrangement
                          : challenge.sortItems!.map((_, i) => i);
                      handleAnswer(ans);
                    }}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl mt-2"
                  >
                    Confirm Timeline Order
                  </motion.button>
                )}
              </div>
            )}

            {/* ─── CHALLENGE TYPE: CONSTRUCT PALINDROME ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-sm rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">5'-</span>
                  {constructParts.map((p, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono font-bold text-sm rounded"
                    >
                      {p}
                    </motion.span>
                  ))}
                  <span className="text-xs text-slate-500 font-mono">-3'</span>
                  {constructParts.length > 0 && (
                    <button
                      onClick={() => setConstructParts([])}
                      className="ml-auto text-xs text-rose-400 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {!showExplanation && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                  >
                    Verify Palindrome
                  </motion.button>
                )}
              </div>
            )}

            {/* Progressive Step-by-Step Reveal Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950/90 border border-emerald-700/60 rounded-2xl space-y-3"
              >
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  ✓ Scientific Solution Walkthrough:
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-emerald-400 mr-1">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-slate-800 text-indigo-300 rounded-lg text-xs font-bold hover:bg-slate-700"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Assessment →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-emerald-500/30 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Simulation Complete!
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You have completed all competency assessment tiers in ISC Class 11 Biotechnology Foundations.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400">Final Score</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {Math.max(0, 100 - errors * 5)}%
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400">BKT Mastery</span>
                <div className="text-2xl font-black text-indigo-400 font-mono uppercase">
                  {masteryLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800 text-xs md:text-sm text-emerald-200">
            {errors === 0
              ? '🌟 PERFECT SCORE! You possess complete mastery of Class 11 Biotechnology concepts.'
              : errors <= 3
              ? '✨ Excellent performance! Review any tripped concepts below to solidify your understanding.'
              : 'Keep practicing! Review your misconception profile below and revisit the interactive labs.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile</h3>
              <p className="text-xs text-slate-400">
                Targeted feedback based on incorrect choices made during assessment:
              </p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-xs text-rose-300 font-bold">❌ {m.misconception}</p>
                    <p className="text-xs text-emerald-300 font-medium">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── SPACED REPETITION (SRS) VISIBILITY BANNER ─── */}
          <div className="p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl border border-indigo-500/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <h3 className="text-base font-bold text-indigo-300">Spaced Repetition Review Plan</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your retention metrics (SM-2 memory interval calculation), your next active recall session is scheduled:
            </p>
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-indigo-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Recommended SRS Target:</span>
                <div className="text-lg font-black text-emerald-400">
                  {errors === 0
                    ? 'Review in 7 days (Optimal Long-Term Consolidation)'
                    : errors <= 3
                    ? 'Review in 3 days (Reinforcement Recommended)'
                    : 'Review in 1 day (Immediate Concept Solidification)'}
                </div>
              </div>
              <div className="px-4 py-2 bg-indigo-900/60 border border-indigo-500/50 rounded-xl text-xs font-mono font-bold text-indigo-200">
                SRS Node: {nodeId}
              </div>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-indigo-700/40 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-lg font-bold text-indigo-300">Reflective Thinking & Synthesis</h3>
            </div>
            <p className="text-xs text-slate-400">
              Deepen your learning by taking a moment to answer these three synthesis questions:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.surprising}
                  onChange={(e) =>
                    setReflectionResponses((prev) => ({ ...prev, surprising: e.target.value }))
                  }
                  placeholder="e.g., How curdling milk at pH 4.6 and making recombinant insulin share the exact same EFB core definition..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.explain}
                  onChange={(e) =>
                    setReflectionResponses((prev) => ({ ...prev, explain: e.target.value }))
                  }
                  placeholder="e.g., Biotechnology is using living organisms or enzymes to solve human problems, from dairy fermentation to life-saving medicines..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.realLife}
                  onChange={(e) =>
                    setReflectionResponses((prev) => ({ ...prev, realLife: e.target.value }))
                  }
                  placeholder="e.g., Understanding vaccine manufacturing at Serum Institute, evaluating GMO safety with GEAC, or patenting inventions..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Real-World Activity Capstone */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiotechnologyBiotechnologyDefinitionoecdSim;