'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_BIOTECH_021 = 'c12_biotech_021';
const NODE_C12_BIOTECH_022 = 'c12_biotech_022';
const NODE_C12_BIOTECH_023 = 'c12_biotech_023';
const NODE_C12_BIOTECH_024 = 'c12_biotech_024';
const NODE_C12_BIOTECH_025 = 'c12_biotech_025';
const NODE_C12_BIOTECH_026 = 'c12_biotech_026';
const NODE_C12_BIOTECH_027 = 'c12_biotech_027';
const NODE_C12_BIOTECH_028 = 'c12_biotech_028';
const NODE_C12_BIOTECH_029 = 'c12_biotech_029';
const NODE_C12_BIOTECH_030 = 'c12_biotech_030';

const ALL_NODE_IDS = [
  NODE_C12_BIOTECH_021,
  NODE_C12_BIOTECH_022,
  NODE_C12_BIOTECH_023,
  NODE_C12_BIOTECH_024,
  NODE_C12_BIOTECH_025,
  NODE_C12_BIOTECH_026,
  NODE_C12_BIOTECH_027,
  NODE_C12_BIOTECH_028,
  NODE_C12_BIOTECH_029,
  NODE_C12_BIOTECH_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Apex BioLabs: The Molecular Blueprint Expedition',
  intro: 'You are the lead molecular geneticist at the National Institute of Biomedical Genomics in India. A critical outbreak requires synthesizing therapeutic proteins, constructing genomic and cDNA libraries to identify disease resistance loci, running Southern blots, and performing CRISPR-Cas9 genome editing in sickle cell patients.',
  context: 'Your lab manages recombinant therapeutics (Humulin, interferons), agro-biotech crops (Golden Rice, Bt-cotton), transgenic bioreactors (Rosie cow, ATryn goat), environmental bioremediation strains (Super Bug), and industrial biocatalysts (rennet, subtilisin, amylase, papain). Navigate the core tools of biotechnology with precision.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'If you want to produce functional human insulin inside E. coli bacteria from cloned DNA, which source DNA MUST you use to build your expression library?',
  options: [
    'Intact human genomic DNA containing all introns and promoters',
    'cDNA synthesized from mature pancreatic mRNA (exons only)',
    'Synthetic ribosomal RNA fragments',
    'Transfer RNA isolated from human liver cells',
  ],
  correctIndex: 1,
  hintAfter: "Remember: Bacteria like E. coli lack spliceosomes and cannot remove eukaryotic introns! Let's explore how genomic and cDNA libraries work.",
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-Then-Check Pattern) ───
interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  explanation: string;
}

const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'What will happen to DNA migration speed in agarose gel electrophoresis when the applied voltage is increased from 50 V to 150 V?',
    options: [
      'DNA fragments will migrate significantly faster toward the positive anode',
      'DNA fragments will reverse direction toward the negative cathode',
      'Migration speed remains completely unchanged regardless of voltage',
      'Large fragments (4000 bp) will begin migrating faster than small fragments (300 bp)',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Gel Electrophoresis Lab, adjust the Voltage slider from 50 V to 150 V and turn on the power supply to verify migration rates.',
    explanation: 'Electrophoretic mobility is directly proportional to the applied electric field (voltage gradient). Increasing voltage accelerates the negatively charged phosphate backbone of DNA toward the positive anode.',
  },
  {
    id: 'pred_2',
    question: 'If the Protospacer Adjacent Motif (PAM: 5\'-NGG-3\') is absent adjacent to the target genomic DNA, what will Cas9 do?',
    options: [
      'Cas9 will cleave DNA non-specifically at random locations across the genome',
      'Cas9 will fail to bind firmly and will NOT induce a double-strand break',
      'Cas9 will transcribe the DNA into RNA instead of cleaving it',
      'Cas9 will duplicate the target gene sequence via homologous recombination',
    ],
    correctIndex: 1,
    verifyInstruction: 'In the CRISPR-Cas9 Lab, toggle PAM Sequence to Absent and attempt to trigger endonuclease cleavage.',
    explanation: 'The PAM sequence is an essential molecular recognition checkpoint. Cas9 first interrogates the DNA for PAM; without PAM binding, DNA unwinding and sgRNA pairing cannot occur, preventing endonuclease cleavage.',
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org "What do you notice?" Pattern) ───
interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Observe the gel electrophoresis chamber after running: which DNA fragment size migrates the greatest distance from the wells toward the positive anode?',
    observableOptions: [
      'The largest 4000 bp fragment',
      'The intermediate 1500 bp fragment',
      'The smallest 300 bp fragment',
      'All fragments migrate the exact same distance',
    ],
    correctIndex: 2,
    explanation: 'The porous agarose gel acts as a molecular sieve. Small DNA fragments (300 bp) experience less frictional resistance in the polymer mesh and migrate furthest toward the anode.',
  },
  {
    id: 'obs_2',
    question: 'Observe the Splicing interactive visualizer when switching from Genomic DNA to cDNA mode. What happens to the red intron blocks during processing?',
    observableOptions: [
      'Introns are duplicated and inserted into the final cDNA plasmid',
      'Introns are spliced out and discarded, leaving only green coding exons in mature mRNA and cDNA',
      'Introns transform into promoter elements to drive bacterial transcription',
      'Introns bind to lipid nanoparticles for cellular endocytosis',
    ],
    correctIndex: 1,
    explanation: 'Eukaryotic spliceosomes excise non-coding introns during pre-mRNA maturation. Reverse transcriptase then synthesizes cDNA exclusively from spliced exons, enabling functional expression in prokaryotes.',
  },
];

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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (Genomic vs cDNA)
  {
    id: 'ch_01_gen_cdna_def',
    nodeId: NODE_C12_BIOTECH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which enzyme is uniquely required to synthesize the starting DNA strand for a cDNA library from isolated eukaryotic mRNA?',
    options: ['DNA Polymerase I', 'Reverse Transcriptase', 'RNA Polymerase II', 'EcoRI Endonuclease'],
    correctIndex: 1,
    explanation: 'Reverse transcriptase uses an mRNA template to synthesize a complementary single-stranded DNA (cDNA) molecule, initiating cDNA library creation.',
    hints: [
      'Think about the enzyme discovered in retroviruses that copies RNA back into DNA.',
      'The process defies the conventional central dogma by making DNA from RNA.',
      'The enzyme name contains "reverse" because it transcribes backwards: RNA to DNA.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Foundation - Drag-label (Genomic vs cDNA Library Features)
  {
    id: 'ch_02_lib_label',
    nodeId: NODE_C12_BIOTECH_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the appropriate molecular characteristic to each library category on the diagnostic board.',
    dragItems: [
      { label: 'Contains Introns & Promoters', targetId: 'slot_genomic' },
      { label: 'Exons Only (Tissue Specific)', targetId: 'slot_cdna' },
      { label: 'Total Genomic DNA Cleaved', targetId: 'slot_gen_prep' },
      { label: 'Synthesized from mRNA', targetId: 'slot_cdna_prep' },
    ],
    correctMapping: {
      slot_genomic: 'Contains Introns & Promoters',
      slot_cdna: 'Exons Only (Tissue Specific)',
      slot_gen_prep: 'Total Genomic DNA Cleaved',
      slot_cdna_prep: 'Synthesized from mRNA',
    },
    explanation: 'Genomic libraries encompass all genomic sequences (coding, introns, promoters, non-coding regions), whereas cDNA libraries capture solely spliced mRNA expressed in specific cells at a particular time point.',
    hints: [
      'Genomic libraries reflect the entire organismal genome with no splicing.',
      'cDNA comes from mRNA where spliceosomes have already eliminated introns.',
      'Match total DNA cleavage to genomic prep, and mRNA reverse transcription to cDNA prep.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Understanding (GM crops Flavr Savr)
  {
    id: 'ch_03_flavr_savr',
    nodeId: NODE_C12_BIOTECH_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does the antisense RNA technology in Flavr Savr tomatoes prevent rapid fruit softening during post-harvest transit?',
    options: [
      'It destroys pectin completely to make tomato cell walls plastic',
      'Antisense mRNA duplexes with polygalacturonase (PG) sense mRNA, inhibiting its translation',
      'It kills all epiphytic bacteria and fungi on the tomato skin',
      'It stimulates ethylene overproduction to accelerate skin hardening',
    ],
    correctIndex: 1,
    explanation: 'Antisense RNA binds to complementary sense mRNA of the polygalacturonase (PG) gene, blocking translation. This suppresses pectin breakdown and preserves firmness.',
    hints: [
      'Polygalacturonase is an enzyme that degrades cell wall pectin.',
      'Antisense RNA pairs directly with the matching sense mRNA transcript.',
      'Hybridized double-stranded RNA cannot be translated into functional PG enzyme by ribosomes.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Foundation - Recall (Bt Toxin activation)
  {
    id: 'ch_04_bt_crop',
    nodeId: NODE_C12_BIOTECH_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the Cry protoxin produced by Bacillus thuringiensis harmless to humans and the cotton plant itself, but lethal to bollworms?',
    options: [
      'It only dissolves and activates in the alkaline pH of insect midgut, binding specific epithelial receptors',
      'It is an acidic toxin that immediately decomposes inside human saliva',
      'Human immune white blood cells destroy the Cry protein before it enters the stomach',
      'It requires UV sunlight to convert into an active aerosol poison',
    ],
    correctIndex: 0,
    explanation: 'Cry protoxin crystals require an alkaline pH (>8.5-9.0) found in the insect midgut to solubilize, where proteases cleave it into an active toxin that creates pores in gut epithelial membranes.',
    hints: [
      'Consider the pH difference between the human stomach (acidic pH ~1.5-2) and the lepidopteran larval midgut (alkaline pH > 8.5).',
      'The protoxin requires both alkaline solubilization and specific gut cell surface receptors.',
      'Human stomachs are highly acidic and lack the midgut brush-border receptor proteins.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Recall (CRISPR-Cas9 components)
  {
    id: 'ch_05_crispr_pam',
    nodeId: NODE_C12_BIOTECH_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Streptococcus pyogenes CRISPR-Cas9 genome editing, which short motif immediately adjacent to the target DNA is strictly necessary for Cas9 cleavage?',
    options: ['TATA box (TATAAA)', 'PAM sequence (5\'-NGG-3\')', 'Poly-A tail (AAAAAA)', 'Pribnow box (TATAAT)'],
    correctIndex: 1,
    explanation: 'Cas9 requires the Protospacer Adjacent Motif (PAM), specifically 5\'-NGG-3\' for SpCas9, downstream of the target DNA strand to verify target identity and induce the double-strand break.',
    hints: [
      'Look for the three-nucleotide sequence that acts as a molecular licensing check.',
      'PAM stands for Protospacer Adjacent Motif.',
      'For the standard SpCas9 enzyme, the sequence is 5\'-NGG-3\'.',
    ],
    misconceptionIndex: 0,
  },
  // 6. Foundation - Drag-sort (CRISPR Workflow)
  {
    id: 'ch_06_crispr_sort',
    nodeId: NODE_C12_BIOTECH_023,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of events in CRISPR-Cas9 homology-directed gene correction in the correct chronological order.',
    sortItems: [
      'sgRNA guides Cas9 to the target DNA locus through base-pairing',
      'Cas9 recognizes the 5\'-NGG-3\' PAM sequence on non-target strand',
      'Cas9 creates a double-strand break (DSB) 3 bp upstream of PAM',
      'Donor DNA template mediates Homology-Directed Repair (HDR) with normal allele',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First, the sgRNA guides Cas9 to the complementary sequence; next, Cas9 confirms PAM binding; then Cas9 cleaves both strands (DSB); finally, the provided donor DNA template repairs the break via HDR.',
    hints: [
      'Target binding and PAM recognition must happen before any enzymatic cut occurs.',
      'The double-strand break is the stimulus that activates cellular repair machinery.',
      'HDR with a donor template is the final step that installs the corrected sequence.',
    ],
  },
  // 7. Foundation - Understanding (Humulin production)
  {
    id: 'ch_07_humulin_prod',
    nodeId: NODE_C12_BIOTECH_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why did Eli Lilly produce the A chain and B chain of Humulin in separate E. coli cultures in 1982 instead of expressing intact proinsulin?',
    options: [
      'E. coli lacks the proteolytic processing machinery to excise the C-peptide and fold insulin properly',
      'The A chain is toxic to bacterial ribosomes while the B chain is not',
      'Bacterial plasmids can only contain sequences shorter than 50 base pairs',
      'The A and B chains require entirely different genetic codes in prokaryotes',
    ],
    correctIndex: 0,
    explanation: 'E. coli cannot perform the post-translational cleavage to remove the connecting C-peptide from proinsulin. Synthesizing A and B chains separately followed by in vitro disulfide bonding bypassed this limitation.',
    hints: [
      'Human beta cells make preproinsulin and use human convertase enzymes to cut out the C-peptide.',
      'Bacteria lack human post-translational endopeptidases.',
      'Producing A and B chains separately allowed chemists to connect them directly with disulfide bonds.',
    ],
    misconceptionIndex: 0,
  },
  // 8. Standard - Application (Golden Rice Biofortification)
  {
    id: 'ch_08_golden_rice',
    nodeId: NODE_C12_BIOTECH_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Golden Rice is engineered to synthesize beta-carotene in its endosperm by introducing which two exogenous genes?',
    options: [
      'psy (phytoene synthase) from daffodil and crtI (carotene desaturase) from Erwinia uredovora',
      'cry1Ac and cry2Ab from Bacillus thuringiensis',
      'Human insulin A and B chain genes',
      'Barnase and Barstar fertility restoration genes',
    ],
    correctIndex: 0,
    explanation: 'Golden Rice incorporates phytoene synthase (psy) from daffodil (Narcissus pseudonarcissus) and carotene desaturase (crtI) from the soil bacterium Erwinia uredovora to complete the beta-carotene biosynthetic pathway.',
    hints: [
      'Normal rice endosperm has geranylgeranyl pyrophosphate but lacks enzymes to reach beta-carotene.',
      'One gene comes from daffodil or maize (psy) and the second from a bacterium (crtI).',
      'Beta-carotene is a provitamin A carotenoid pigment giving the grain its golden hue.',
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard - Application (Hepatitis B Recombinant Vaccine)
  {
    id: 'ch_09_hepb_vaccine',
    nodeId: NODE_C12_BIOTECH_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is the recombinant Hepatitis B vaccine (produced in Saccharomyces cerevisiae) classified as a subunit vaccine with zero infectivity risk?',
    options: [
      'It contains only the cloned 24 kDa HBsAg surface antigen protein, with no viral DNA or replication capacity',
      'The yeast cells neutralize the complete virus inside the bloodstream',
      'It uses killed whole viral particles treated with high formalin concentrations',
      'It injects human antibodies directly into the recipient bloodstream',
    ],
    correctIndex: 0,
    explanation: 'The recombinant Hepatitis B vaccine expresses only the Hepatitis B surface antigen (HBsAg) gene in yeast. The purified capsid-free protein generates protective antibodies without containing infectious viral genomes.',
    hints: [
      'Subunit vaccines contain isolated immunogenic proteins, not whole pathogens.',
      'The yeast cells express only the HBsAg coat protein gene.',
      'Without viral genomic DNA, the particles are non-infectious and cannot replicate.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Standard - Analysis (mRNA Vaccine mechanism)
  {
    id: 'ch_10_mrna_vaccine',
    nodeId: NODE_C12_BIOTECH_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Covid-19 mRNA vaccines (Pfizer-BioNTech/Moderna), what is the vital role of lipid nanoparticles (LNPs)?',
    options: [
      'Protect fragile mRNA from extracellular ribonucleases (RNases) and facilitate cytoplasmic entry across lipid bilayers',
      'Translate the mRNA directly into protein inside the extracellular interstitial fluid',
      'Carry the mRNA into the human cell nucleus to integrate into host chromosomal DNA',
      'Act as a chemical antibiotic against concurrent bacterial infections',
    ],
    correctIndex: 0,
    explanation: 'Lipid nanoparticles encapsulate synthetic mRNA, protecting it from ubiquitous RNase enzymes in tissue fluid and fusing with cell membranes to deliver mRNA into the cytoplasm for ribosomal translation.',
    hints: [
      'mRNA is rapidly degraded by RNase enzymes if naked in tissue fluids.',
      'The cell membrane is a lipid bilayer; lipid nanoparticles facilitate endocytosis.',
      'mRNA stays in the cytoplasm and NEVER enters the nucleus or integrates into genomic DNA.',
    ],
    misconceptionIndex: 1,
  },
  // 11. Standard - Drag-label (Transgenic Animals & Products)
  {
    id: 'ch_11_transgenic_map',
    nodeId: NODE_C12_BIOTECH_026,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each historic biotechnology milestone to its exact scientific accomplishment or therapeutic product.',
    dragItems: [
      { label: 'First cloned mammal (SCNT from somatic cell)', targetId: 'slot_dolly' },
      { label: 'Human alpha-lactalbumin in milk (2.4 g/L)', targetId: 'slot_rosie' },
      { label: 'Human Antithrombin III anticoagulant in milk', targetId: 'slot_atryn' },
      { label: 'Muscle stem cells on edible scaffolds in bioreactors', targetId: 'slot_meat' },
    ],
    correctMapping: {
      slot_dolly: 'First cloned mammal (SCNT from somatic cell)',
      slot_rosie: 'Human alpha-lactalbumin in milk (2.4 g/L)',
      slot_atryn: 'Human Antithrombin III anticoagulant in milk',
      slot_meat: 'Muscle stem cells on edible scaffolds in bioreactors',
    },
    explanation: 'Dolly was cloned via Somatic Cell Nuclear Transfer (no foreign gene); Rosie cow produced human alpha-lactalbumin enriched milk; ATryn goat produced human antithrombin; Cultured meat relies on stem cell myogenesis in bioreactors.',
    hints: [
      'Remember: Dolly was a somatic clone, NOT a transgenic animal.',
      'Rosie produces milk enriched for human infant nutrition.',
      'ATryn goat yields a clinical blood anticoagulant approved by the FDA.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Standard - Application (Super Bug Plasmids)
  {
    id: 'ch_12_superbug',
    nodeId: NODE_C12_BIOTECH_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Ananda Chakrabarty engineered the patented "Super Bug" (Pseudomonas putida) to degrade marine crude oil spills by combining plasmids for which four hydrocarbon pathways?',
    options: [
      'Camphor (CAM), Octane (OCT), Xylene (XYL), and Naphthalene (NAH)',
      'Penicillin, Streptomycin, Tetracycline, and Ampicillin',
      'Cellulose, Starch, Glycogen, and Pectin',
      'Methane, Ethane, Propane, and Butane',
    ],
    correctIndex: 0,
    explanation: 'The multi-plasmid Pseudomonas putida strain integrated the CAM (camphor), OCT (octane), XYL (xylene), and NAH (naphthalene) degradative plasmids, allowing simultaneous digestion of complex crude oil hydrocarbons.',
    hints: [
      'Crude oil is a complex cocktail of aliphatic and aromatic hydrocarbons.',
      'The plasmids are abbreviated CAM, OCT, XYL, and NAH.',
      'This was the historic first genetically engineered living organism granted a US patent (1980).',
    ],
    misconceptionIndex: 2,
  },
  // 13. Standard - Distinguish (Bioremediation Types)
  {
    id: 'ch_13_biorem_distinguish',
    nodeId: NODE_C12_BIOTECH_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between Mycoremediation and Phycoremediation in environmental decontamination:',
    options: [
      'Mycoremediation utilizes fungal mycelia (e.g. Pleurotus laccase/peroxidase) for soil hydrocarbons; Phycoremediation uses algae (e.g. Chlamydomonas) for water heavy metals/pollutants',
      'Mycoremediation is restricted to nuclear radioactive waste; Phycoremediation degrades hospital plastic waste',
      'Mycoremediation uses bacterial plasmids; Phycoremediation uses viral vectors exclusively',
      'Phycoremediation only functions in high-heat desert sand devoid of water',
    ],
    correctIndex: 0,
    explanation: 'Myco- (fungi, e.g. Pleurotus ostreatus utilizing ligninolytic laccases) cleanses soil contaminants, whereas Phyco- (algae, e.g. Chlamydomonas via biosorption and photosynthesis) purifies aquatic effluents.',
    hints: [
      'The prefix "myco-" refers to fungi (mushrooms/mycelium).',
      'The prefix "phyco-" refers to algae (photosynthetic microalgae).',
      'Pleurotus secretes ligninolytic oxidases into soil; microalgae biosorb heavy metals in water.',
    ],
    misconceptionIndex: 1,
  },
  // 14. Standard - Match (Industrial Enzymes)
  {
    id: 'ch_14_enzyme_match',
    nodeId: NODE_C12_BIOTECH_028,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the industrial enzyme to its primary commercial application and biological source:',
    options: [
      'Subtilisin (Bacillus subtilis) → Protein stain removal in alkaline laundry detergents',
      'Papain (Carica papaya) → Starch desizing in Surat textile looms',
      'Rennet/Chymosin (Mucor/recombinant E. coli) → Meat tenderization and chill-proofing beer',
      'Amylase (Aspergillus oryzae) → Coagulation of kappa-casein in cheddar cheese curdling',
    ],
    correctIndex: 0,
    explanation: 'Subtilisin is an alkaline serine protease from Bacillus subtilis that hydrolyzes protein stains in laundry detergents at high pH. Rennet curdles cheese, Amylase desizes textiles/liquefies starch, and Papain tenderizes meat.',
    hints: [
      'Subtilisin is named after its source organism Bacillus subtilis and thrives at wash pH 9-11.',
      'Rennet (chymosin) is the cheese curdling enzyme.',
      'Papain comes from Carica papaya latex and acts as a cysteine protease.',
    ],
    misconceptionIndex: 1,
  },
  // 15. Standard - Numeric (Blotting Size Calculation)
  {
    id: 'ch_15_electrophoresis_num',
    nodeId: NODE_C12_BIOTECH_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A restriction enzyme digests human DNA into 3 fragments: 4000 bp, 1500 bp, and 300 bp. In agarose gel electrophoresis under constant voltage, which fragment migrates the LONGEST distance (in mm) toward the anode? (Enter the size in base pairs of this fastest fragment)',
    correctAnswer: 300,
    tolerance: 0,
    unit: 'bp',
    explanation: 'The agarose matrix acts as a molecular sieve. Small DNA fragments slip through gel pores with least frictional resistance, migrating the farthest toward the positive anode (300 bp).',
    hints: [
      'Agarose pores retard large DNA fragments while small fragments pass rapidly.',
      'Migration distance is inversely proportional to log10 of fragment molecular weight.',
      'Identify the smallest base pair value among the choices.',
    ],
  },
  // 16. Standard - Construct (Blotting Identification Triad)
  {
    id: 'ch_16_blotting_construct',
    nodeId: NODE_C12_BIOTECH_030,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the precise three-part matching formula for Western Blotting: [Target Molecule] + [Separation Method] + [Detection Probe].',
    availableParts: ['DNA', 'RNA', 'Protein', 'Agarose-Gel', 'SDS-PAGE', 'DNA-Probe', 'Specific-Antibody', 'Capillary-Salt'],
    targetState: 'Protein SDS-PAGE Specific-Antibody',
    validationHint: 'Western blot targets proteins separated on polyacrylamide using labeled antibodies.',
    explanation: 'Western Blotting separates Proteins via SDS-PAGE and detects them on nitrocellulose/PVDF membranes using labelled Specific Antibodies.',
    hints: [
      'Remember S-N-W vs D-R-P (Southern=DNA, Northern=RNA, Western=Protein).',
      'Proteins require SDS-PAGE to separate by molecular mass.',
      'Protein detection uses monoclonal or polyclonal antibodies, NOT nucleic acid probes.',
    ],
    misconceptionIndex: 2,
  },
  // 17. Advanced - Analysis (Sickle Cell HBB CRISPR Correction)
  {
    id: 'ch_17_sickle_crispr',
    nodeId: NODE_C12_BIOTECH_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In sickle cell anaemia, a transversion mutation alters codon 6 of the HBB gene from GAG to GTG. When performing CRISPR-Cas9 therapy on patient haematopoietic stem cells, why is Homology-Directed Repair (HDR) preferred over Non-Homologous End Joining (NHEJ)?',
    options: [
      'HDR uses an exogenous normal template to restore the exact GAG codon (Glutamic acid), whereas NHEJ creates random indels that cause gene knockouts',
      'NHEJ only functions in prokaryotes and cannot occur in human bone marrow cells',
      'HDR permanently converts the patient\'s red blood cells into white blood cells',
      'NHEJ requires radioisotopes that destroy human stem cell telomeres',
    ],
    correctIndex: 0,
    explanation: 'Sickle cell is caused by a specific point mutation replacing glutamic acid with valine at position 6 of the beta-globin chain. HDR uses a wild-type DNA template for precise sequence reversion, while NHEJ causes error-prone indels.',
    hints: [
      'NHEJ is error-prone end joining, great for knockouts but unable to restore a specific codon.',
      'HDR provides a high-fidelity template carrying the correct GAG sequence.',
      'Sickle cell requires correcting Valine back to Glutamic acid at beta-6.',
    ],
    misconceptionIndex: 1,
  },
  // 18. Advanced - Evaluation (DNA Probe Stringency Evaluation)
  {
    id: 'ch_18_probe_stringency',
    nodeId: NODE_C12_BIOTECH_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A diagnostic lab at NIV Pune detects a high background of non-specific binding and false positives during DNA probe hybridization for viral cDNA. Which adjustment will INCREASE hybridization stringency to eliminate non-specific binding?',
    options: [
      'Increase the hybridization/wash temperature and decrease the salt (NaCl) concentration',
      'Lower the temperature to 20°C and increase salt concentration to saturated levels',
      'Use double-stranded unlabelled genomic DNA probes without denaturation',
      'Add excess calcium chloride and decrease washing duration to 1 second',
    ],
    correctIndex: 0,
    explanation: 'High stringency conditions (elevated temperature and low ionic salt concentration) destabilize mismatched hydrogen bonds, ensuring only 100% perfectly matched complementary probes remain hybridized.',
    hints: [
      'Cations (Na+) shield negative phosphate backbones, stabilizing mismatched duplexes.',
      'Higher thermal energy disrupts weak, imperfectly paired hydrogen bonds.',
      'To increase stringency: raise temperature and lower salt concentration.',
    ],
    misconceptionIndex: 0,
  },
  // 19. Advanced - Application (Industrial Papain & Chill-proofing)
  {
    id: 'ch_19_papain_app',
    nodeId: NODE_C12_BIOTECH_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A beverage brewery in Bengaluru experiences cold-haze precipitation when bottled beer is chilled to 4°C. How does adding papain extracted from Carica papaya resolve this?',
    options: [
      'Papain hydrolyzes high-molecular-weight polypeptides that complex with polyphenols to form chill-haze',
      'Papain converts all beer ethanol back into starch and maltose',
      'Papain acts as an inorganic filter that precipitates yeast cells instantly',
      'Papain inhibits carbonic acid formation to keep beer flat',
    ],
    correctIndex: 0,
    explanation: 'Cold haze in beer occurs when high-molecular-weight proteins complex with tannins/polyphenols at low temperatures. Papain, a plant cysteine protease, hydrolyzes these proteins into soluble short peptides.',
    hints: [
      'Haze is caused by insoluble complexes between barley proteins and polyphenols.',
      'Papain is a proteolytic enzyme that breaks down haze-forming proteins.',
      'This process in the brewing industry is known as "chill-proofing".',
    ],
    misconceptionIndex: 2,
  },
  // 20. Advanced - Analysis (Southern Blotting RFLP in Forensics)
  {
    id: 'ch_20_southern_rflp',
    nodeId: NODE_C12_BIOTECH_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why must agarose gels be soaked in 0.5 M NaOH (alkali) prior to capillary transfer onto nylon membranes during Southern Blotting?',
    options: [
      'To denature double-stranded DNA into single strands, allowing subsequent base-pairing with the single-stranded probe',
      'To synthesize radioactive 32P nucleotides within the gel pores',
      'To convert DNA into RNA so that Northern blotting antibodies can bind',
      'To make the agarose gel melt permanently into liquid buffer',
    ],
    correctIndex: 0,
    explanation: 'Alkaline treatment denatures double-stranded DNA into single strands. Once transferred and immobilized on the nylon membrane, these single strands have exposed bases ready to hybridize with the labelled single-stranded probe.',
    hints: [
      'Double-stranded DNA has all its hydrogen bonding bases occupied inside the helix.',
      'A probe cannot hybridize to DNA unless the target strands are separated.',
      'NaOH disrupts inter-strand hydrogen bonds, generating single-stranded DNA.',
    ],
    misconceptionIndex: 0,
  },
  // 21. Advanced - Creativity (Agricultural Bt Resistance Management)
  {
    id: 'ch_21_bt_refugia',
    nodeId: NODE_C12_BIOTECH_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To prevent cotton bollworms (Helicoverpa armigera) from developing resistance to Bt-cotton across farms in Gujarat, GEAC recommends planting a 20% perimeter of non-Bt cotton ("Refugia"). What is the evolutionary mechanism behind this strategy?',
    options: [
      'It preserves rare homozygous susceptible insects (ss) to mate with any rare resistant mutants (RR/Rr), yielding heterozygous offspring (Rr) that are killed by Bt toxin doses',
      'It poisons the soil so that non-Bt weeds outcompete all insects',
      'It lures insects to migrate permanently to neighbouring states',
      'It increases chemical pesticide sales for agricultural retail stores',
    ],
    correctIndex: 0,
    explanation: 'Refugia ensure a continuous population of Bt-susceptible insects (ss). When rare resistant mutants (RR) emerge in the Bt field, they mate with susceptible insects (ss) from refugia, producing heterozygous (Rr) offspring that are still killed by the high-dose Bt crop.',
    hints: [
      'Resistance to Bt Cry toxins is generally an autosomal recessive trait (rr).',
      'Mating between resistant (rr) and susceptible (SS) pests produces susceptible heterozygotes (Sr).',
      'Refugia crops maintain a reservoir of wild-type susceptible alleles in the pest gene pool.',
    ],
    misconceptionIndex: 2,
  },
  // 22. Advanced - Evaluation (Germline vs Somatic CRISPR Ethics)
  {
    id: 'ch_22_crispr_ethics',
    nodeId: NODE_C12_BIOTECH_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why international regulatory guidelines and ICMR in India permit ex-vivo somatic cell gene editing for sickle cell anaemia, but enforce a strict moratorium on human germline (embryo/gamete) editing:',
    options: [
      'Somatic edits affect only the treated patient without heritability; germline modifications permanently alter all future generations with unknown off-target risks and lack of descendant consent',
      'Somatic cells have no DNA while germline cells possess three distinct genomes',
      'Germline editing is legally classified as an industrial enzyme production system',
      'Somatic editing requires no hospital equipment whereas germline editing is done at home',
    ],
    correctIndex: 0,
    explanation: 'Somatic editing (e.g. bone marrow stem cells) is confined to the individual patient. Germline editing alters the human gene pool irreversibly, creating heritable off-target risks and profound ethical dilemmas regarding future generational consent.',
    hints: [
      'Consider the biological difference between body cells (somatic) and reproductive cells (sperm/egg/embryo).',
      'Somatic changes die with the patient; germline changes are inherited by all descendants.',
      'Off-target mutations in embryos would propagate indefinitely through human lineages.',
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
  nodeId: NODE_C12_BIOTECH_021,
  title: 'Biotechnology: Genomic & cDNA Libraries, Applications & Tools',
  definition:
    'Genomic libraries encompass all cleaved genomic DNA sequences of an organism inserted in cloning vectors, representing introns, exons, and regulatory elements. cDNA libraries contain complementary DNA synthesized from isolated, spliced mRNA via reverse transcriptase, representing exclusively expressed genes devoid of introns. This foundation extends across recombinant biopharmaceuticals, CRISPR-Cas9 genome editing, transgenic systems, environmental bioremediation, industrial biocatalysts, and blotting analytics.',
  eli5:
    'A genomic library is like a giant national archive containing every single page printed in a country—including rough notes and blank covers. A cDNA library is like a student notebook holding only the active lessons written down in class today. Both give biotechnologists unique tools to heal diseases, feed populations, and clean the Earth.',
  misconceptions: [
    {
      misconception: 'Genomic and cDNA libraries contain identical DNA information.',
      correction: 'Genomic libraries contain the entire genome including introns and promoters; cDNA libraries are prepared from spliced mRNA using reverse transcriptase and contain only coding exons without introns.',
    },
    {
      misconception: 'Golden rice contains high levels of protein or synthetic vitamin A directly.',
      correction: 'Golden rice is biofortified with psy and crtI genes that produce beta-carotene (provitamin A), which the human body converts into vitamin A.',
    },
    {
      misconception: 'Bt-cotton toxin is a broad-spectrum chemical poison harmful to humans.',
      correction: 'Cry protoxin is activated specifically in the alkaline pH (>8.5) of insect midguts, binding insect receptors; it is broken down harmlessly in human acidic stomachs.',
    },
    {
      misconception: 'Dolly the sheep was a transgenic animal created with foreign human genes.',
      correction: 'Dolly was a clone created via Somatic Cell Nuclear Transfer (SCNT) from an adult somatic cell; she carried no foreign or transgenic DNA.',
    },
    {
      misconception: 'Electrophoresis and electroporation are interchangeable names for the same process.',
      correction: 'Electrophoresis separates charged molecules in a gel matrix using an electric field; electroporation uses high-voltage pulses to create transient membrane pores for DNA entry.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which enzyme synthesizes DNA from an RNA template to build a cDNA library?',
      options: ['Reverse transcriptase', 'DNA Ligase', 'Taq Polymerase', 'Alkaline phosphatase'],
      correctIndex: 0,
    },
    {
      question: 'What gene suppresses fruit softening in Flavr Savr tomatoes?',
      options: ['Antisense polygalacturonase (PG)', 'cry1Ac', 'crtI', 'psy'],
      correctIndex: 0,
    },
    {
      question: 'Which sequence must Cas9 recognize adjacent to the target locus?',
      options: ['5\'-NGG-3\' (PAM)', 'Poly-T tract', 'EcoRI site', 'Shine-Dalgarno'],
      correctIndex: 0,
    },
    {
      question: 'Which host was initially used to produce Humulin A and B chains separately?',
      options: ['Escherichia coli', 'Bacillus subtilis', 'Saccharomyces cerevisiae', 'CHO cells'],
      correctIndex: 0,
    },
    {
      question: 'Rosie cow was genetically modified to produce which protein in her milk?',
      options: ['Human alpha-lactalbumin', 'Human insulin', 'Antithrombin III', 'Interferon gamma'],
      correctIndex: 0,
    },
    {
      question: 'Which multi-plasmid bacterium was developed by Ananda Chakrabarty for oil spills?',
      options: ['Pseudomonas putida (Super Bug)', 'Escherichia coli', 'Agrobacterium tumefaciens', 'Pleurotus ostreatus'],
      correctIndex: 0,
    },
    {
      question: 'Subtilisin in laundry detergents is obtained from which organism?',
      options: ['Bacillus subtilis', 'Aspergillus oryzae', 'Carica papaya', 'Mucor miehei'],
      correctIndex: 0,
    },
    {
      question: 'In agarose gel electrophoresis, DNA fragments migrate toward which electrode?',
      options: ['Positive electrode (Anode)', 'Negative electrode (Cathode)', 'Neutral ground', 'UV lamp'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Student demonstrates full mastery of molecular libraries, GM agriculture, CRISPR therapeutics, recombinant pharmaceuticals, bioremediation, industrial enzymes, and blotting techniques.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Molecular Splicing Machine: Genomic vs cDNA',
    instruction: 'Toggle between Genomic DNA and mRNA Transcription. Watch how introns are removed before reverse transcription creates cDNA.',
    interactionType: 'library-switch',
    nodeId: NODE_C12_BIOTECH_021,
  },
  {
    title: '2. CRISPR-Cas9 Precision Surgical Editor',
    instruction: 'Adjust the Guide RNA target alignment and toggle PAM recognition. Observe Cas9 conformational change and double-strand break.',
    interactionType: 'crispr-slider',
    nodeId: NODE_C12_BIOTECH_023,
  },
  {
    title: '3. Agarose Gel Electrophoresis Chamber',
    instruction: 'Adjust Voltage and Agarose Pore Density. Run the electric field to observe size-dependent separation toward the positive anode.',
    interactionType: 'gel-runner',
    nodeId: NODE_C12_BIOTECH_030,
  },
  {
    title: '4. Bioremediation Hydrocarbon Digester',
    instruction: 'Adjust crude oil pollutant levels (Octane, Camphor, Xylene, Naphthalene) and observe bacterial Super Bug plasmid degradation rates.',
    interactionType: 'superbug-sim',
    nodeId: NODE_C12_BIOTECH_027,
  },
  {
    title: '5. Industrial Biocatalyst pH & Temperature Chamber',
    instruction: 'Select an industrial enzyme (Subtilisin, Papain, Rennet, Amylase) and adjust pH and Temperature to find its optimal activity window.',
    interactionType: 'enzyme-kinetics',
    nodeId: NODE_C12_BIOTECH_028,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead Scientist Mission: Genetic Engineering Council of India',
  description:
    'You have been appointed to the Genetic Engineering Appraisal Committee (GEAC). Design a comprehensive biotechnology blueprint to solve iron-deficiency anaemia in rice-dependent rural districts and establish a bioremediation strategy for a coastal crude oil spill.',
  steps: [
    'Phase 1: Choose whether to clone Ferritin & Nicotianamine synthase into rice via Agrobacterium or biolistics.',
    'Phase 2: Screen transgenic lines using Southern Blotting with radioactive 32P or fluorescent Cy3 DNA probes.',
    'Phase 3: Verify tissue-specific seed expression using Northern blotting on endosperm RNA.',
    'Phase 4: Formulate a multi-plasmid Pseudomonas putida and Pleurotus ostreatus field trial for coastal soil-water cleanup.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_BiotechnologyGenomicCdnaLibrariesSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BIOTECH_021,
    title = DEFAULT_PROPS.title || 'Biotechnology Applications',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'indigo' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant-style discovery & observation states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-check state
  const [predStep, setPredStep] = useState(0);
  const [selectedPredOption, setSelectedPredOption] = useState<number | null>(null);
  const [predChecked, setPredChecked] = useState(false);

  // Observation state
  const [obsStep, setObsStep] = useState(0);
  const [selectedObsOption, setSelectedObsOption] = useState<number | null>(null);
  const [obsChecked, setObsChecked] = useState(false);

  // Adaptive & scoring state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and explanation state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & drop, sorting, numeric, and construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Interactive Lab Visualizer States (5+ Sliders & Controls)
  const [libraryType, setLibraryType] = useState<'genomic' | 'cdna'>('genomic');
  const [spliceStep, setSpliceStep] = useState(0); // 0=DNA, 1=pre-mRNA, 2=mRNA, 3=cDNA
  const [voltage, setVoltage] = useState(100); // 50 to 150 V
  const [agaroseDensity, setAgaroseDensity] = useState(1.0); // 0.8% to 2.0%
  const [electrophoresisRunning, setElectrophoresisRunning] = useState(false);
  const [gelProgress, setGelProgress] = useState(0);
  const [crisprMatchPercent, setCrisprMatchPercent] = useState(100);
  const [pamPresent, setPamPresent] = useState(true);
  const [crisprCutActive, setCrisprCutActive] = useState(false);
  const [selectedEnzyme, setSelectedEnzyme] = useState<'subtilisin' | 'papain' | 'rennet' | 'amylase'>('subtilisin');
  const [chamberPh, setChamberPh] = useState(9.5);
  const [chamberTemp, setChamberTemp] = useState(55);
  const [oilLevel, setOilLevel] = useState(80);
  const [superbugActive, setSuperbugActive] = useState(false);
  const [activeBlotTab, setActiveBlotTab] = useState<'southern' | 'northern' | 'western'>('southern');

  // Persistence refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gelTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON SCORE CHANGE ───
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

  // ─── CANVAS PARTICLE & ENZYME ANIMATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * 320,
      y: Math.random() * 40,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2.5 + 1.5,
      color: Math.random() > 0.5 ? '#6366f1' : '#10b981',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle gradient
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render flowing biomolecules
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // DNA ladder indicator
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('Apex Molecular Lab - Real-time BioField [Active]', 10, 24);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── GEL ELECTROPHORESIS RUNNER EFFECT ───
  useEffect(() => {
    if (electrophoresisRunning) {
      const speedFactor = (voltage / 100) * (1.8 / agaroseDensity);
      gelTimerRef.current = setInterval(() => {
        setGelProgress((prev) => {
          if (prev >= 100) {
            if (gelTimerRef.current) clearInterval(gelTimerRef.current);
            setElectrophoresisRunning(false);
            audioManager.play('chime');
            speechManager.speak('Electrophoresis completed! DNA bands resolved.');
            return 100;
          }
          return prev + 2 * speedFactor;
        });
      }, 100);
    } else {
      if (gelTimerRef.current) clearInterval(gelTimerRef.current);
    }
    return () => {
      if (gelTimerRef.current) clearInterval(gelTimerRef.current);
    };
  }, [electrophoresisRunning, voltage, agaroseDensity]);

  // ─── SUPERBUG BIOREMEDIATION EFFECT ───
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (superbugActive && oilLevel > 5) {
      interval = setInterval(() => {
        setOilLevel((prev) => Math.max(0, prev - 3));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [superbugActive, oilLevel]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const firstHint = challenge?.hints?.[0] || 'Observe the molecular mechanism carefully.';
        setCurrentHint(firstHint);
        setShowHint(true);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak(firstHint);
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (gelTimerRef.current) clearInterval(gelTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('All hints exhausted. Let us analyze the step-by-step breakdown.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You understand eukaryotic splicing constraints.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate the molecules to discover the principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration unlocked. Test variables freely before tackling challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase initiated. Apply your discoveries to solve board-level problems.');
  }, []);

  const handleToggleElectrophoresis = useCallback(() => {
    if (gelProgress >= 100) {
      setGelProgress(0);
    }
    setElectrophoresisRunning((prev) => {
      const next = !prev;
      audioManager.play(next ? 'swoop' : 'tap');
      if (next) speechManager.speak('Electric current applied. Negative DNA migrating toward anode.');
      return next;
    });
  }, [gelProgress]);

  const handleCrisprCut = useCallback(() => {
    if (pamPresent && crisprMatchPercent >= 90) {
      setCrisprCutActive(true);
      audioManager.play('success');
      speechManager.speak('Target verified by PAM! Cas9 induced double-strand break.');
      setTimeout(() => setCrisprCutActive(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Cleavage failed! Cas9 requires PAM sequence 5-NGG-3 and high sequence complementarity.');
    }
  }, [pamPresent, crisprMatchPercent]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
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
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const base = prev.length === challenge.sortItems?.length ? prev : challenge.sortItems?.map((_, i) => i) || [];
        const copy = [...base];
        const [removed] = copy.splice(fromIdx, 1);
        copy.splice(toIdx, 0, removed);
        return copy;
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
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! You have mastered Class 12 Biotechnology tools and applications.');
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

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent molecular deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Review the step-by-step molecular explanation.');
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

  // ─── ENZYME ACTIVITY CALCULATION (Real-Time Kinetics) ───
  const enzymeActivity = useMemo(() => {
    let optPh = 7.0;
    let optTemp = 37;
    if (selectedEnzyme === 'subtilisin') {
      optPh = 9.5;
      optTemp = 55;
    } else if (selectedEnzyme === 'papain') {
      optPh = 6.5;
      optTemp = 60;
    } else if (selectedEnzyme === 'rennet') {
      optPh = 6.0;
      optTemp = 38;
    } else if (selectedEnzyme === 'amylase') {
      optPh = 7.0;
      optTemp = 65;
    }

    const phDelta = Math.abs(chamberPh - optPh);
    const tempDelta = Math.abs(chamberTemp - optTemp);
    const activity = Math.max(0, 100 - phDelta * 28 - tempDelta * 2.2);
    return Math.round(activity);
  }, [selectedEnzyme, chamberPh, chamberTemp]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-2xl shadow-inner"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 12 ISC • Science</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
                10 Syllabus Nodes
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator & Difficulty Pill */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold border uppercase flex items-center gap-1 ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-300 border-rose-600'
                : 'bg-amber-950/60 text-amber-300 border-amber-600'
            }`}
          >
            <span>{difficulty === 'foundation' ? '✓' : difficulty === 'advanced' ? '★' : '●'}</span>
            <span>Tier: {difficulty}</span>
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
            Phase: {phase}
          </span>
        </div>
      </motion.div>

      {/* ─── CANVAS PARTICLE SYSTEM ─── */}
      <div className="relative mb-6 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
        <canvas
          ref={canvasRef}
          width={640}
          height={40}
          aria-label="Real-time molecular simulation animation background"
          role="img"
          className="w-full h-10 block bg-slate-950"
        />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl">
            <h2 className="text-lg font-bold text-indigo-300 mb-2 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-indigo-900/40 text-xs text-indigo-200">
              <strong>Mission Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold uppercase tracking-wide text-amber-400">Curiosity Discovery Hook</span>
            <h3 className="text-base md:text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-900 border-slate-700 hover:border-indigo-500 text-slate-200'
                  }`}
                >
                  <span>
                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                  )}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-rose-400 font-bold ml-2">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-700">
                <p className={`text-sm font-semibold mb-4 flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : 'ℹ'}</span>
                  <span>
                    {discoveryCorrect
                      ? 'Spot on! Introns must be excised because E. coli lacks spliceosomes. cDNA contains only coding exons!'
                      : DISCOVERY_QUESTION.hintAfter}
                  </span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Exploration Lab"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant Style) ──�� */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex justify-between items-center bg-slate-800/60 p-3 rounded-xl border border-slate-700">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step {currentSlide + 1} of 5</span>
              <h3 className="text-base font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
            </div>
            <span className="text-xs text-amber-400 font-semibold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
              Interactive Lab
            </span>
          </div>

          <p className="text-xs text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-900/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* ─── SLIDE 0: SPLICING & CDNA VS GENOMIC LIBRARY ─── */}
          {currentSlide === 0 && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setLibraryType('genomic');
                    setSpliceStep(0);
                    audioManager.play('tap');
                  }}
                  aria-label="Switch to Genomic Library Mode"
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    libraryType === 'genomic'
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  Genomic Library Mode
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setLibraryType('cdna');
                    setSpliceStep(1);
                    audioManager.play('tap');
                  }}
                  aria-label="Switch to cDNA Library Mode"
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    libraryType === 'cdna'
                      ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  cDNA Library (mRNA Splicing) Mode
                </motion.button>
              </div>

              {/* Splicing Interactive Diagram */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <svg viewBox="0 0 600 180" className="w-full h-auto" role="img" aria-label="Eukaryotic gene transcription and cDNA splicing diagram">
                  {/* Gene Strand */}
                  <text x="20" y="25" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    {libraryType === 'genomic' ? 'Eukaryotic Chromosomal DNA (Introns + Exons)' : 'Transcriptional Processing Pathway'}
                  </text>

                  {/* Promoter Box */}
                  <rect x="20" y="40" width="60" height="30" rx="4" fill="#3b82f6" opacity="0.8" />
                  <text x="50" y="58" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Promoter</text>

                  {/* Exon 1 */}
                  <rect x="85" y="40" width="90" height="30" rx="4" fill="#10b981" />
                  <text x="130" y="58" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Exon 1 (Coding)</text>

                  {/* Intron 1 */}
                  <rect
                    x="180"
                    y="40"
                    width="70"
                    height="30"
                    rx="4"
                    fill={libraryType === 'genomic' ? '#ef4444' : spliceStep >= 2 ? '#334155' : '#ef4444'}
                    opacity={spliceStep >= 2 && libraryType === 'cdna' ? 0.2 : 0.8}
                    className="transition-all duration-500"
                  />
                  <text x="215" y="58" textAnchor="middle" fill="#fff" fontSize="9">
                    {spliceStep >= 2 && libraryType === 'cdna' ? 'Spliced Out ✗' : 'Intron 1'}
                  </text>

                  {/* Exon 2 */}
                  <rect x="255" y="40" width="100" height="30" rx="4" fill="#10b981" />
                  <text x="305" y="58" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Exon 2 (Coding)</text>

                  {/* Intron 2 */}
                  <rect
                    x="360"
                    y="40"
                    width="70"
                    height="30"
                    rx="4"
                    fill={libraryType === 'genomic' ? '#ef4444' : spliceStep >= 2 ? '#334155' : '#ef4444'}
                    opacity={spliceStep >= 2 && libraryType === 'cdna' ? 0.2 : 0.8}
                    className="transition-all duration-500"
                  />
                  <text x="395" y="58" textAnchor="middle" fill="#fff" fontSize="9">
                    {spliceStep >= 2 && libraryType === 'cdna' ? 'Spliced Out ✗' : 'Intron 2'}
                  </text>

                  {/* Exon 3 */}
                  <rect x="435" y="40" width="80" height="30" rx="4" fill="#10b981" />
                  <text x="475" y="58" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Exon 3</text>

                  {/* Vectors Cloned Area */}
                  <g transform="translate(0, 100)">
                    {libraryType === 'genomic' ? (
                      <g>
                        <rect x="20" y="10" width="560" height="40" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="300" y="34" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">
                          Genomic Library Clone: Contains Total Cleaved DNA (Promoter + Exons + Introns)
                        </text>
                      </g>
                    ) : (
                      <g>
                        <rect x="85" y="10" width="430" height="40" rx="6" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />
                        <text x="300" y="34" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">
                          cDNA Library Clone (Reverse Transcriptase): Exon 1 + Exon 2 + Exon 3 (✓ NO Introns)
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>

              {libraryType === 'cdna' && (
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSpliceStep((s) => (s < 3 ? s + 1 : 0));
                      audioManager.play('pop');
                    }}
                    aria-label="Advance transcription step"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg"
                  >
                    {spliceStep === 0 && 'Step 1: Transcribe to Pre-mRNA'}
                    {spliceStep === 1 && 'Step 2: Splice Out Introns (Spliceosome)'}
                    {spliceStep === 2 && 'Step 3: Reverse Transcriptase to cDNA'}
                    {spliceStep === 3 && 'Reset Splicing Pipeline'}
                  </motion.button>
                  <span className="text-xs text-purple-300">
                    Status: {spliceStep === 0 ? 'Genomic DNA' : spliceStep === 1 ? 'Pre-mRNA' : spliceStep === 2 ? 'Mature mRNA' : 'Double-stranded cDNA'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ─── SLIDE 1: CRISPR-CAS9 SURGICAL CUT ─── */}
          {currentSlide === 1 && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="crispr-match-slider" className="text-xs text-slate-300 font-semibold block mb-1">
                    sgRNA Complementarity: {crisprMatchPercent}%
                  </label>
                  <input
                    id="crispr-match-slider"
                    type="range"
                    min={50}
                    max={100}
                    value={crisprMatchPercent}
                    onChange={(e) => setCrisprMatchPercent(Number(e.target.value))}
                    aria-label="sgRNA Complementarity percentage"
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-300 font-semibold">PAM Sequence (5'-NGG-3'):</span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setPamPresent((p) => !p);
                      audioManager.play('tap');
                    }}
                    aria-label={pamPresent ? 'PAM Sequence Present. Click to disable.' : 'PAM Sequence Absent. Click to enable.'}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      pamPresent ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200' : 'bg-rose-900/60 border-rose-500 text-rose-200'
                    }`}
                  >
                    {pamPresent ? '✓ PAM Present (5\'-AGG-3\')' : '✗ PAM Absent'}
                  </motion.button>
                </div>
              </div>

              {/* CRISPR Visualizer SVG */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <svg viewBox="0 0 550 140" className="w-full h-auto" role="img" aria-label="CRISPR Cas9 target alignment and cleavage diagram">
                  {/* Target DNA Top */}
                  <text x="20" y="25" fill="#94a3b8" fontSize="10">Target Locus (HBB Gene Beta-6 Codon)</text>
                  <line x1="20" y1="45" x2="520" y2="45" stroke="#475569" strokeWidth="4" />
                  <line x1="20" y1="65" x2="520" y2="65" stroke="#475569" strokeWidth="4" />

                  {/* Cas9 Protein Molecule */}
                  <motion.ellipse
                    cx="260"
                    cy="55"
                    rx={crisprCutActive ? 85 : 75}
                    ry={crisprCutActive ? 45 : 38}
                    fill="#4338ca"
                    opacity="0.8"
                    animate={{ scale: crisprCutActive ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <text x="260" y="35" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Cas9 Nuclease</text>

                  {/* sgRNA */}
                  <path d="M 190 55 Q 260 40 330 55" fill="none" stroke="#ec4899" strokeWidth="3" />
                  <text x="260" y="70" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">sgRNA (Guide)</text>

                  {/* PAM Motif Box */}
                  <rect x="340" y="58" width="40" height="15" fill={pamPresent ? '#10b981' : '#ef4444'} rx="2" />
                  <text x="360" y="69" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{pamPresent ? '✓ PAM' : '✗ PAM'}</text>

                  {/* Cut site flash */}
                  {crisprCutActive && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1, scale: 1.2 }}>
                      <line x1="240" y1="35" x2="240" y2="75" stroke="#fbbf24" strokeWidth="4" strokeDasharray="2" />
                      <text x="240" y="90" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">⚡ DSB Cleaved!</text>
                    </motion.g>
                  )}
                </svg>
              </div>

              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCrisprCut}
                  aria-label="Trigger Cas9 Endonuclease Cleavage"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  ⚡ Trigger Cas9 Endonuclease Cleavage
                </motion.button>
                <span className="text-xs text-slate-400">
                  Status: {pamPresent && crisprMatchPercent >= 90 ? '✓ Ready for precise cleavage' : '✗ Inhibited by mismatch or missing PAM'}
                </span>
              </div>
            </div>
          )}

          {/* ─── SLIDE 2: GEL ELECTROPHORESIS RUNNER ─── */}
          {currentSlide === 2 && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="voltage-slider" className="text-xs text-slate-300 font-semibold block mb-1">Applied Voltage: {voltage} V</label>
                  <input
                    id="voltage-slider"
                    type="range"
                    min={50}
                    max={150}
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    disabled={electrophoresisRunning}
                    aria-label="Applied Voltage in Volts"
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="agarose-slider" className="text-xs text-slate-300 font-semibold block mb-1">Agarose Gel Density: {agaroseDensity}%</label>
                  <input
                    id="agarose-slider"
                    type="range"
                    min={0.8}
                    max={2.0}
                    step={0.2}
                    value={agaroseDensity}
                    onChange={(e) => setAgaroseDensity(Number(e.target.value))}
                    disabled={electrophoresisRunning}
                    aria-label="Agarose Gel Density percentage"
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {/* Agarose Chamber SVG */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <svg viewBox="0 0 550 160" className="w-full h-auto" role="img" aria-label="Agarose gel electrophoresis tank running DNA bands toward anode">
                  {/* Gel Tank */}
                  <rect x="20" y="10" width="510" height="140" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                  {/* Electrodes */}
                  <text x="35" y="30" fill="#ef4444" fontSize="12" fontWeight="bold">- Cathode (–)</text>
                  <text x="460" y="30" fill="#10b981" fontSize="12" fontWeight="bold">+ Anode (+)</text>

                  {/* Wells */}
                  <rect x="55" y="45" width="12" height="25" fill="#1e293b" stroke="#64748b" />
                  <rect x="55" y="85" width="12" height="25" fill="#1e293b" stroke="#64748b" />
                  <text x="50" y="130" fill="#64748b" fontSize="9">Wells</text>

                  {/* Lane 1: DNA Ladder */}
                  <text x="80" y="40" fill="#94a3b8" fontSize="9">Ladder (Lane 1)</text>
                  <line
                    x1={55 + (gelProgress * 3.8 * 0.35)}
                    y1="48"
                    x2={55 + (gelProgress * 3.8 * 0.35)}
                    y2="68"
                    stroke="#a855f7"
                    strokeWidth="3"
                  />
                  <line
                    x1={55 + (gelProgress * 3.8 * 0.65)}
                    y1="48"
                    x2={55 + (gelProgress * 3.8 * 0.65)}
                    y2="68"
                    stroke="#a855f7"
                    strokeWidth="3"
                  />
                  <line
                    x1={55 + (gelProgress * 3.8 * 0.95)}
                    y1="48"
                    x2={55 + (gelProgress * 3.8 * 0.95)}
                    y2="68"
                    stroke="#a855f7"
                    strokeWidth="3"
                  />

                  {/* Lane 2: Digest Sample (4000 bp, 1500 bp, 300 bp) */}
                  <text x="80" y="80" fill="#94a3b8" fontSize="9">Digest Sample (Lane 2)</text>
                  {/* 4000 bp band (slow) */}
                  <line
                    x1={55 + (gelProgress * 3.8 * 0.3)}
                    y1="88"
                    x2={55 + (gelProgress * 3.8 * 0.3)}
                    y2="108"
                    stroke="#38bdf8"
                    strokeWidth="4"
                  />
                  <text x={55 + (gelProgress * 3.8 * 0.3)} y="120" textAnchor="middle" fill="#38bdf8" fontSize="8">4000 bp</text>

                  {/* 1500 bp band */}
                  <line
                    x1={55 + (gelProgress * 3.8 * 0.6)}
                    y1="88"
                    x2={55 + (gelProgress * 3.8 * 0.6)}
                    y2="108"
                    stroke="#38bdf8"
                    strokeWidth="4"
                  />
                  <text x={55 + (gelProgress * 3.8 * 0.6)} y="120" textAnchor="middle" fill="#38bdf8" fontSize="8">1500 bp</text>

                  {/* 300 bp band (fastest) */}
                  <line
                    x1={55 + (gelProgress * 3.8 * 0.98)}
                    y1="88"
                    x2={55 + (gelProgress * 3.8 * 0.98)}
                    y2="108"
                    stroke="#4ade80"
                    strokeWidth="4"
                  />
                  <text x={55 + (gelProgress * 3.8 * 0.98)} y="120" textAnchor="middle" fill="#4ade80" fontSize="8">300 bp (Fastest)</text>
                </svg>
              </div>

              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleToggleElectrophoresis}
                  aria-label={electrophoresisRunning ? 'Pause Electric Field' : gelProgress >= 100 ? 'Re-run Electrophoresis' : 'Turn On Power Supply'}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md ${
                    electrophoresisRunning ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {electrophoresisRunning ? '⏸ Pause Electric Field' : gelProgress >= 100 ? '🔄 Re-run Electrophoresis' : '▶ Turn ON Power Supply (Run)'}
                </motion.button>
                <span className="text-xs text-slate-300 font-mono">Migration Run Progress: {Math.round(gelProgress)}%</span>
              </div>
            </div>
          )}

          {/* ─── SLIDE 3: SUPERBUG BIOREMEDIATION ─── */}
          {currentSlide === 3 && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-indigo-300">Pseudomonas putida Multi-Plasmid System</h4>
                  <p className="text-xs text-slate-400">Plasmids: CAM (Camphor) + OCT (Octane) + XYL (Xylene) + NAH (Naphthalene)</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSuperbugActive((s) => !s);
                    audioManager.play('tap');
                  }}
                  aria-label={superbugActive ? 'Deactivate Super Bug culture' : 'Inoculate Super Bug Culture'}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    superbugActive ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  {superbugActive ? '✓ Super Bug Inoculum: Active' : 'Inoculate Super Bug Culture'}
                </motion.button>
              </div>

              {/* Crude Oil Gauge */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-amber-400">Crude Oil Slick Concentration</span>
                  <span className="text-slate-300 font-mono">{oilLevel}% Contaminant</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500"
                    animate={{ width: `${oilLevel}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Heavy Spill (Toxic Hydrocarbons)</span>
                  <span>Bioremediated Clean Seawater</span>
                </div>
              </div>

              <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/40 text-xs text-indigo-200">
                <strong>Ananda Chakrabarty's Landmark Milestone:</strong> The multi-plasmid Pseudomonas putida was the first genetically engineered living organism ever granted a patent (Diamond v. Chakrabarty, 1980).
              </div>
            </div>
          )}

          {/* ─── SLIDE 4: INDUSTRIAL ENZYME KINETICS ─── */}
          {currentSlide === 4 && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['subtilisin', 'papain', 'rennet', 'amylase'] as const).map((enz) => (
                  <motion.button
                    key={enz}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedEnzyme(enz);
                      if (enz === 'subtilisin') {
                        setChamberPh(9.5);
                        setChamberTemp(55);
                      } else if (enz === 'papain') {
                        setChamberPh(6.5);
                        setChamberTemp(60);
                      } else if (enz === 'rennet') {
                        setChamberPh(6.0);
                        setChamberTemp(38);
                      } else if (enz === 'amylase') {
                        setChamberPh(7.0);
                        setChamberTemp(65);
                      }
                      audioManager.play('tap');
                    }}
                    aria-label={`Select enzyme: ${enz}`}
                    className={`p-3 rounded-xl text-xs font-bold capitalize border transition-all ${
                      selectedEnzyme === enz
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {selectedEnzyme === enz ? `✓ ${enz}` : enz}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="chamber-ph-slider" className="text-xs text-slate-300 font-semibold block mb-1">Chamber pH: {chamberPh}</label>
                  <input
                    id="chamber-ph-slider"
                    type="range"
                    min={3.0}
                    max={12.0}
                    step={0.5}
                    value={chamberPh}
                    onChange={(e) => setChamberPh(Number(e.target.value))}
                    aria-label="Chamber pH level"
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="chamber-temp-slider" className="text-xs text-slate-300 font-semibold block mb-1">Chamber Temperature: {chamberTemp} °C</label>
                  <input
                    id="chamber-temp-slider"
                    type="range"
                    min={20}
                    max={85}
                    step={1}
                    value={chamberTemp}
                    onChange={(e) => setChamberTemp(Number(e.target.value))}
                    aria-label="Chamber Temperature in Celsius"
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>

              {/* Activity Output Gauge */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Relative Catalytic Activity</span>
                  <span className="text-2xl font-black text-emerald-400">✓ {enzymeActivity}%</span>
                </div>
                <div className="text-right text-xs text-slate-300">
                  <span className="font-semibold text-indigo-300 capitalize">{selectedEnzyme} Application:</span>
                  <p className="text-[11px] text-slate-400">
                    {selectedEnzyme === 'subtilisin' && 'Alkaline laundry detergents (blood/protein stains)'}
                    {selectedEnzyme === 'papain' && 'Meat tenderization, beer chill-proofing, wound debridement'}
                    {selectedEnzyme === 'rennet' && 'Cheese manufacturing (kappa-casein cleavage)'}
                    {selectedEnzyme === 'amylase' && 'Starch liquefaction, bioethanol, textile desizing'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide Navigation Bar */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Lab Slide"
              className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-medium">Lab {currentSlide + 1} of 5</span>
            {currentSlide < 4 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                aria-label="Next Lab Slide"
                className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to Free Sandbox"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX & PREDICT-THEN-CHECK / OBSERVATION ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Biotech Sandbox: Multi-Technique Diagnostic Suite</h3>
              <p className="text-xs text-slate-400">Test scientific predictions, observe key outcomes, and master blotting workflows.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Board Challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
            >
              Ready for Board Challenges →
            </motion.button>
          </div>

          {/* PREDICTION CHECKER CARD (Brilliant Predict-Then-Check) */}
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-950 rounded-2xl border border-indigo-700/60 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                🔬 Prediction Check {predStep + 1} of {PREDICTION_QUESTIONS.length}
              </span>
              <span className="text-[11px] text-slate-400">Predict before testing in simulation</span>
            </div>
            <h4 className="text-sm font-bold text-white">{PREDICTION_QUESTIONS[predStep].question}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {PREDICTION_QUESTIONS[predStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPredOption(idx);
                    setPredChecked(true);
                    audioManager.play(idx === PREDICTION_QUESTIONS[predStep].correctIndex ? 'success' : 'pop');
                  }}
                  className={`text-left p-3 rounded-xl border text-xs transition-all ${
                    predChecked && idx === PREDICTION_QUESTIONS[predStep].correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                      : predChecked && idx === selectedPredOption
                      ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                      : 'bg-slate-900 border-slate-700 hover:border-indigo-500 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-1.5">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            {predChecked && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                <p className="text-indigo-300">
                  <strong>Verification Step:</strong> {PREDICTION_QUESTIONS[predStep].verifyInstruction}
                </p>
                <p className="text-slate-300">{PREDICTION_QUESTIONS[predStep].explanation}</p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      setPredStep((s) => (s + 1) % PREDICTION_QUESTIONS.length);
                      setSelectedPredOption(null);
                      setPredChecked(false);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-lg text-xs"
                  >
                    Next Prediction Question →
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* OBSERVATION CHECKER CARD (Brilliant "What do you notice?") */}
          <div className="p-5 bg-gradient-to-br from-purple-950/60 to-slate-950 rounded-2xl border border-purple-700/60 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                👁️ Observation Check {obsStep + 1} of {OBSERVATION_QUESTIONS.length}
              </span>
              <span className="text-[11px] text-slate-400">What do you observe in the simulation?</span>
            </div>
            <h4 className="text-sm font-bold text-white">{OBSERVATION_QUESTIONS[obsStep].question}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {OBSERVATION_QUESTIONS[obsStep].observableOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedObsOption(idx);
                    setObsChecked(true);
                    audioManager.play(idx === OBSERVATION_QUESTIONS[obsStep].correctIndex ? 'success' : 'pop');
                  }}
                  className={`text-left p-3 rounded-xl border text-xs transition-all ${
                    obsChecked && idx === OBSERVATION_QUESTIONS[obsStep].correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                      : obsChecked && idx === selectedObsOption
                      ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                      : 'bg-slate-900 border-slate-700 hover:border-purple-500 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-1.5">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            {obsChecked && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                <p className="text-slate-300">{OBSERVATION_QUESTIONS[obsStep].explanation}</p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      setObsStep((s) => (s + 1) % OBSERVATION_QUESTIONS.length);
                      setSelectedObsOption(null);
                      setObsChecked(false);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded-lg text-xs"
                  >
                    Next Observation Question →
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Blotting Triad Sandbox Switcher */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex gap-2 border-b border-slate-800 pb-3" role="tablist" aria-label="Blotting Techniques">
              {(['southern', 'northern', 'western'] as const).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeBlotTab === tab}
                  aria-label={`${tab} blotting technique`}
                  onClick={() => {
                    setActiveBlotTab(tab);
                    audioManager.play('tap');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                    activeBlotTab === tab
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab} Blotting
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">Target Macromolecule</span>
                <span className="text-base font-bold text-indigo-400">
                  {activeBlotTab === 'southern' ? 'DNA Fragments' : activeBlotTab === 'northern' ? 'mRNA Transcripts' : 'Proteins'}
                </span>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">Gel Separation Matrix</span>
                <span className="text-base font-bold text-purple-400">
                  {activeBlotTab === 'western' ? 'Polyacrylamide (SDS-PAGE)' : 'Denaturing Agarose'}
                </span>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">Detection Probe System</span>
                <span className="text-base font-bold text-emerald-400">
                  {activeBlotTab === 'western' ? 'Specific Labeled Antibodies' : 'Single-Stranded Labelled DNA/RNA Probe'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-900/40 text-xs text-indigo-200">
              <strong>Mnemonic Rule:</strong> S-N-W corresponds to D-R-P (<strong>S</strong>outhern = <strong>D</strong>NA, <strong>N</strong>orthern = <strong>R</strong>NA, <strong>W</strong>estern = <strong>P</strong>rotein).
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header & Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="capitalize text-indigo-400 font-bold">
                Competency: {challenge.competencyLevel} (CISCE 2026)
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card with Shake/Flash Feedback */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-800/80 border-slate-700'
            }`}
          >
            <h2 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h2>

            {/* 1. MCQ CHALLENGES */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-900 border-slate-700 hover:border-indigo-500 text-slate-200'
                      }`}
                    >
                      <span>
                        <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                      </span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. DRAG-LABEL CHALLENGES */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full block mb-1">Drag items into the slots below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable feature: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      aria-label={`Target slot for ${item.targetId.replace('slot_', '').replace('_', ' ')}`}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[64px] flex items-center justify-between transition-all ${
                        droppedLabels[item.targetId]
                          ? 'bg-indigo-950/50 border-indigo-500 text-white'
                          : 'bg-slate-900/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold capitalize text-slate-300">
                        {item.targetId.replace('slot_', '').replace('_', ' ')}:
                      </span>
                      <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1">
                        {droppedLabels[item.targetId] ? (
                          <>
                            <span>✓</span>
                            <span>{droppedLabels[item.targetId]}</span>
                          </>
                        ) : (
                          'Drop label here'
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify Mapping Labels"
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Mapping
                </motion.button>
              </div>
            )}

            {/* 3. DRAG-SORT CHALLENGES */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder steps chronologically:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIdx + 1}: ${item}. Drag to reorder.`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0', 10);
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 flex items-center justify-center font-bold text-indigo-300">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  aria-label="Verify Sequence Order"
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md mt-2"
                >
                  Verify Sequence Order
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC CHALLENGES */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter base pairs"
                    aria-label="Fastest migrating fragment size in base pairs"
                    className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 outline-none w-48"
                  />
                  <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric value"
                    className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Submit Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT CHALLENGES */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-indigo-900/80 border border-indigo-700 text-indigo-200 text-xs font-semibold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[56px] p-3 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove part: ${part}`}
                        className="text-indigo-200 hover:text-white text-xs ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble formula</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Validate Construction formula"
                    className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Validate Construction
                  </motion.button>
                  <button
                    onClick={() => setConstructParts([])}
                    aria-label="Clear construction parts"
                    className="px-4 py-2.5 bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold rounded-xl"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Progressive Step-by-step Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">💡</span>
                  <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">
                    Step-by-Step Molecular Explanation
                  </h4>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-200 leading-relaxed"
                      >
                        <strong className="text-indigo-400 mr-1.5">{idx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((r) => r + 1)}
                    aria-label="Reveal next sentence of explanation"
                    className="px-4 py-1.5 bg-indigo-800 text-white text-xs font-bold rounded-lg"
                  >
                    Reveal Next Sentence →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label={
                      currentChallenge + 1 >= filteredChallenges.length
                        ? 'Complete Simulation and Review Mastery'
                        : 'Next Challenge'
                    }
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg mt-2 flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Complete Simulation & Review Mastery →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800 text-center space-y-3">
            <span className="text-4xl" aria-hidden="true">🎓</span>
            <h2 className="text-2xl font-black text-white">Biotechnology Curriculum Mastery Achieved!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have completed diagnostic evaluations across all 10 core Class 12 Biotechnology modules with CISCE
              competency benchmarks.
            </p>
            <div className="flex justify-center gap-4 text-xs font-bold pt-2">
              <span className="px-4 py-2 bg-emerald-950/80 text-emerald-300 border border-emerald-600 rounded-xl flex items-center gap-1">
                <span>✓</span>
                <span>Final Score: {Math.max(0, 100 - errors * 5)}%</span>
              </span>
              <span className="px-4 py-2 bg-indigo-950/80 text-indigo-300 border border-indigo-600 rounded-xl capitalize flex items-center gap-1">
                <span>★</span>
                <span>Mastery Level: {masteryLevel}</span>
              </span>
            </div>
          </div>

          {/* Motivational Feedback Banner */}
          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-700/60 text-xs text-emerald-200">
            <strong>✓ Evaluator Assessment:</strong>{' '}
            {errors === 0
              ? 'PERFECT SCORE! Exceptional conceptual rigor in genetic engineering and analytical protocols.'
              : errors <= 3
              ? 'Excellent performance! Solid command over genomic vs cDNA libraries, blotting, and CRISPR-Cas9.'
              : 'Good effort! Review the specific misconception corrections below before sitting for board examinations.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span aria-hidden="true">⚠️</span> Your Targeted Diagnostic Misconception Review:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Verified Rule: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Schedule */}
          <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-800/60 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-amber-300">Spaced Repetition Review (SM-2 Algorithm)</h4>
              <p className="text-[11px] text-slate-400">
                Next automated review scheduled in{' '}
                <strong className="text-amber-300">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </strong>{' '}
                to cement long-term synaptic retention.
              </p>
            </div>
            <span className="text-2xl" aria-hidden="true">📅</span>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">🔬</span> Capstone Application: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODAL COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiotechnologyGenomicCdnaLibrariesSim;