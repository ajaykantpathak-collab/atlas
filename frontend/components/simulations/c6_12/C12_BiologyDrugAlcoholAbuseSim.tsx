'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_BIO_041 = 'c12_bio_041';
const NODE_C12_BIO_042 = 'c12_bio_042';
const NODE_C12_BIO_043 = 'c12_bio_043';
const NODE_C12_BIO_044 = 'c12_bio_044';
const NODE_C12_BIO_045 = 'c12_bio_045';
const NODE_C12_BIO_046 = 'c12_bio_046';
const NODE_C12_BIO_047 = 'c12_bio_047';
const NODE_C12_BIO_048 = 'c12_bio_048';
const NODE_C12_BIO_049 = 'c12_bio_049';
const NODE_C12_BIO_050 = 'c12_bio_050';

const ALL_NODE_IDS = [
  NODE_C12_BIO_041,
  NODE_C12_BIO_042,
  NODE_C12_BIO_043,
  NODE_C12_BIO_044,
  NODE_C12_BIO_045,
  NODE_C12_BIO_046,
  NODE_C12_BIO_047,
  NODE_C12_BIO_048,
  NODE_C12_BIO_049,
  NODE_C12_BIO_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bio-Frontiers: From Synapses to Bioreactors & Ecosystems',
  intro: 'Welcome to the National Institute of Biological Sciences in Bengaluru. As Lead Biosystems Researcher, you are tasked with resolving critical biological challenges spanning neurochemical pathways of addiction, industrial fermentation, recombinant DNA vector design, bioreactor optimization, transgenic crop protection, ethical biosafety protocols, and ecological population dynamics.',
  context: 'Across these 10 interconnected biological sectors, your decisions will balance neurotransmitter kinetics, restriction endonuclease cleavage sites, fermenter oxygen transfer rates, and carrying capacity constraints in natural populations.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When cocaine enters the human central nervous system, why does it trigger an acute surge of euphoria and alertness?',
  options: [
    'It mimics acetylcholine to trigger rapid voluntary skeletal muscle contraction',
    'It blocks the dopamine reuptake transporter (DAT), causing dopamine to accumulate and persist in the synaptic cleft',
    'It permanently destroys GABA receptors across all cortical interneurons',
    'It directly synthesizes adrenaline inside cerebral capillary endothelial cells'
  ],
  correctIndex: 1,
  hintAfter: 'Cocaine directly blocks dopamine active transporters (DAT) on pre-synaptic terminals, trapping neurotransmitters in the synaptic cleft.',
};

// ─── REAL WORLD EXTENSION PROJECT ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Bio-Audit & Clinical Pharmacology Case Investigation',
  description: 'Apply your understanding of neurobiology, fermentation biotechnology, and population ecology to analyze a real-world biomedical and ecological dataset from an Indian regional public health and environmental monitoring station.',
  steps: [
    {
      step: 1,
      title: 'Neurochemical Case Review & De-addiction Protocol Design',
      detail: 'Analyze patient synaptic dopamine transporter recovery curves following opioid vs cannabinoid vs alcohol cessation. Document how methadone acts as an opioid receptor agonist with slow dissociation kinetics to prevent acute withdrawal symptoms.'
    },
    {
      step: 2,
      title: 'Bioreactor & Fermentation Efficiency Audit',
      detail: 'Evaluate an industrial dairy or biogas facility in Anand or Punjab. Calculate Biochemical Oxygen Demand (BOD) reduction across primary, secondary activated sludge, and anaerobic methanogen digesters.'
    },
    {
      step: 3,
      title: 'Transgenic Biosafety & Prior-Art Legal Verification',
      detail: 'Simulate the Genetic Engineering Appraisal Committee (GEAC) review process for Bt brinjal or GM mustard. Inspect the Traditional Knowledge Digital Library (TKDL) to prevent biopiracy patents on indigenous medicinal flora like Neem and Haldi.'
    },
    {
      step: 4,
      title: 'Demographic Census & Carrying Capacity Modeling',
      detail: 'Conduct a simulated Lincoln-Petersen mark-recapture census of a protected wildlife population in Kaziranga National Park and compute the instantaneous growth rate (dN/dt) when approaching habitat carrying capacity (K).'
    }
  ]
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

// ��── 22 RICH CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001_bio',
    nodeId: NODE_C12_BIO_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Morphine, codeine, and diacetylmorphine (heroin) are powerful opioid analgesics. From which medicinal plant and specific botanical structure are crude opioids extracted?',
    options: [
      'Flowering tops and trichomes of Cannabis sativa',
      'Milky latex harvested from unripe seed capsules of Papaver somniferum',
      'Dried leaves of the Andean shrub Erythroxylum coca',
      'Stem bark and secondary roots of Cinchona calisaya'
    ],
    correctIndex: 1,
    explanation: 'Opioids are extracted from the dried milky latex obtained by incising the unripe seed capsules of the opium poppy, Papaver somniferum. They bind to mu, delta, and kappa opioid receptors in the central nervous system and gastrointestinal tract.',
    hints: [
      'Think of the legal cultivation of the poppy plant in Neemuch and Ghazipur.',
      'The source is a member of the Papaveraceae family.',
      'Opium is harvested as milky latex from unripe seed pods of Papaver somniferum.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_bio',
    nodeId: NODE_C12_BIO_041,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A patient with chronic alcohol abuse presents with severe fatty liver, hyperlipidemia, and lactic acidosis. Another individual consumes synthetic cannabinoids. How do their biochemical and physiological targets fundamentally differ?',
    options: [
      'Ethanol is oxidized in hepatocytes yielding excess NADH which drives lipogenesis and inhibits gluconeogenesis; cannabinoids bind CB1/CB2 G-protein receptors altering neuromuscular coordination and heart rate',
      'Ethanol directly blocks pre-synaptic dopamine reuptake; cannabinoids precipitate pulmonary alveolar surfactants',
      'Ethanol exclusively inhibits spinal motor neurons; cannabinoids destroy pancreatic islet beta cells',
      'Ethanol acts as an adrenergic stimulant; cannabinoids act as synthetic barbiturates'
    ],
    correctIndex: 0,
    explanation: 'Ethanol metabolism by alcohol dehydrogenase produces excess cytosolic NADH, inhibiting hepatic gluconeogenesis and beta-oxidation while promoting fatty acid synthesis (fatty liver/cirrhosis). Cannabinoids act upon central CB1 and peripheral CB2 receptors, altering perception and cardiovascular parameters.',
    hints: [
      'Consider hepatic ethanol oxidation and NADH accumulation versus cannabinoid receptor signaling.',
      'Ethanol causes hepatic metabolic shift, while cannabinoids target G-protein-coupled cannabinoid receptors.',
      'Ethanol oxidizes to acetaldehyde/acetate in the liver, while cannabinoids target CB1 and CB2 neural receptors.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_bio',
    nodeId: NODE_C12_BIO_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In traditional Indian curd (dahi) preparation, a small starter inoculum is mixed into warm milk at 40°C. Which biochemical and nutritional transformations take place during this incubation?',
    options: [
      'Saccharomyces cerevisiae converts lactose into ethyl alcohol and carbon dioxide',
      'Lactobacillus and other LAB ferment lactose to lactic acid, coagulating milk casein and synthesizing Vitamin B12',
      'Acetobacter aceti oxidizes milk lipids to acetic acid and vitamin C',
      'Propionibacterium freudenreichii precipitates milk whey proteins by producing propionic acid'
    ],
    correctIndex: 1,
    explanation: 'Lactic Acid Bacteria (LAB), such as Lactobacillus acidophilus and Streptococcus thermophilus, ferment lactose into lactic acid. The resulting drop in pH coagulates and partially digests casein milk protein while significantly enriching the curd with Vitamin B12.',
    hints: [
      'Identify the bacterium known as LAB.',
      'Lactic acid reduces milk pH and curdles casein protein.',
      'Lactobacillus converts lactose to lactic acid and increases nutritional Vitamin B12 content.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_bio',
    nodeId: NODE_C12_BIO_042,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The distinctive large holes ("eyes") in Swiss cheese and the soft porous texture of leavened baker\'s bread are both caused by gas release. Identify the respective microorganisms and gas responsible.',
    options: [
      'Swiss cheese: Propionibacterium shermanii (CO2); Baker\'s bread: Saccharomyces cerevisiae (CO2)',
      'Swiss cheese: Aspergillus niger (O2); Baker\'s bread: Lactobacillus bulgaricus (CO2)',
      'Swiss cheese: Penicillium roqueforti (CH4); Baker\'s bread: Clostridium butyricum (SO2)',
      'Swiss cheese: Methanobacterium (H2); Baker\'s bread: Streptococcus lactis (CO2)'
    ],
    correctIndex: 0,
    explanation: 'Propionibacterium shermanii produces large volumes of CO2 through propionic acid fermentation, creating the iconic holes in Swiss cheese. Baker\'s yeast (Saccharomyces cerevisiae) ferments sugars in dough to produce ethanol and CO2 gas, which expands to leaven the bread.',
    hints: [
      'The cheese-ripening bacterium produces propionic acid and carbon dioxide.',
      'Bread leavening utilizes brewer\'s/baker\'s yeast.',
      'Both processes generate carbon dioxide (CO2) from Propionibacterium shermanii and Saccharomyces cerevisiae.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_005_bio',
    nodeId: NODE_C12_BIO_043,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag each treatment stage/vessel to its correct role in sewage treatment and biogas generation.',
    dragItems: [
      { label: 'Physical Screening & Grit Settling', targetId: 'primary_tank' },
      { label: 'Aerobic Activated Sludge (BOD Reduction)', targetId: 'aeration_tank' },
      { label: 'Anaerobic Digestion by Methanogens (Biogas)', targetId: 'digester_tank' },
    ],
    correctMapping: {
      primary_tank: 'Physical Screening & Grit Settling',
      aeration_tank: 'Aerobic Activated Sludge (BOD Reduction)',
      digester_tank: 'Anaerobic Digestion by Methanogens (Biogas)',
    },
    explanation: 'Primary treatment involves sequential filtration and sedimentation of grit. Secondary biological treatment utilizes vigorous aeration tanks where aerobic bacterial and fungal flocs consume organic matter to lower BOD. Anaerobic sludge digesters host Methanobacterium species that convert sludge into biogas.',
    hints: [
      'Where does physical sedimentation happen first?',
      'Where do aerobic floc-forming bacteria consume organic pollutants?',
      'Anaerobic methanogens produce biogas in sealed sludge digesters.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_006_bio',
    nodeId: NODE_C12_BIO_043,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A rural gobar gas digester in a dairy cooperative produces 60 cubic metres of raw biogas daily. If methane comprises exactly 65% of this biogas by volume, how many cubic metres of pure combustible methane fuel are generated per day?',
    correctAnswer: 39,
    tolerance: 0.5,
    unit: 'm³',
    explanation: 'Volume of pure methane = Total biogas volume × Methane fraction = 60 m³ × 0.65 = 39 m³ per day. Biogas typically contains 50–70% methane (CH4) and 30–40% carbon dioxide (CO2).',
    hints: [
      'Multiply total volume (60 m³) by 0.65.',
      '60 × 65 / 100 = 39.',
      'The exact volume is 39 cubic metres.'
    ],
  },
  {
    id: 'ch_007_bio',
    nodeId: NODE_C12_BIO_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The type-II restriction endonuclease EcoRI, isolated from Escherichia coli RY13, recognises which specific palindromic 6-base pair DNA sequence?',
    options: [
      "5'-GAATTC-3' / 3'-CTTAAG-5'",
      "5'-GGATCC-3' / 3'-CCTAGG-5'",
      "5'-AAGCTT-3' / 3'-TTCGAA-5'",
      "5'-CCCGGG-3' / 3'-GGGCCC-5'"
    ],
    correctIndex: 0,
    explanation: "EcoRI recognizes the symmetrical hexanucleotide palindrome 5'-GAATTC-3' and makes staggered cuts between G and A on both opposite complementary strands, leaving 4-base cohesive sticky ends (5'-AATT-3').",
    hints: [
      'EcoRI cuts between Guanine (G) and Adenine (A).',
      "The 5' sequence begins with G-A-A-T-T-C.",
      "5'-GAATTC-3' is the classical EcoRI recognition sequence."
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_008_bio',
    nodeId: NODE_C12_BIO_044,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the fundamental steps of recombinant DNA (rDNA) technology in correct chronological order from first to last.',
    sortItems: [
      'Isolation and enzymatic purification of high-molecular-weight donor genomic DNA',
      'Restriction endonuclease digestion of both donor DNA and cloning vector plasmid',
      'Agarose gel electrophoresis to resolve and isolate the target gene fragment',
      'Ligation of the target gene into the linearized plasmid vector using DNA ligase',
      'Transformation of the recombinant construct into competent bacterial host cells'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'First, donor DNA is isolated and purified. Next, it is cleaved using restriction enzymes. The specific gene is isolated via agarose gel electrophoresis, ligated into an open plasmid vector via DNA ligase, and transformed into a competent host cell for propagation.',
    hints: [
      'You must isolate DNA before you can enzymatically cut it.',
      'Electrophoresis separates fragments after digestion.',
      'Ligation must occur before introducing the recombinant vector into the host organism.'
    ],
  },
  {
    id: 'ch_009_bio',
    nodeId: NODE_C12_BIO_045,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the standard cloning vector pBR322, if a foreign human gene is ligated into the BamHI restriction site located within the tetR (tetracycline resistance) coding region, what is the resulting antibiotic selection phenotype of transformed host cells?',
    options: [
      'Resistant to ampicillin (ampR intact), but sensitive to tetracycline (tetR disrupted by insertional inactivation)',
      'Resistant to tetracycline, but sensitive to ampicillin',
      'Concurrently resistant to both ampicillin and tetracycline',
      'Killed by both ampicillin and tetracycline media'
    ],
    correctIndex: 0,
    explanation: 'Inserting a foreign DNA sequence into the BamHI site interrupts the coding sequence of the tetR gene (insertional inactivation). Recombinant transformants retain an intact ampR gene, enabling them to form colonies on ampicillin plates but rendering them susceptible to tetracycline.',
    hints: [
      'The insert disrupts the tetR reading frame.',
      'The ampR gene remains intact, conferring ampicillin resistance.',
      'The phenotype is Ampicillin-resistant and Tetracycline-sensitive.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_009_bio_b',
    nodeId: NODE_C12_BIO_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which cloning vector system is specifically engineered to carry and stably replicate large eukaryotic genomic DNA fragments ranging from 100 to 300 kilobases (kb) during whole-genome mapping projects?',
    options: [
      'Bacterial Artificial Chromosome (BAC)',
      'Standard pUC19 plasmid vector (capacity up to 10 kb)',
      'Bacteriophage lambda insertion vector (capacity up to 15 kb)',
      'Agrobacterium tumefaciens Ti plasmid T-DNA minimal cassette'
    ],
    correctIndex: 0,
    explanation: 'Bacterial Artificial Chromosomes (BACs), derived from the fertility F-plasmid of E. coli, possess replication machinery designed to maintain large foreign DNA inserts between 100 to 300 kb with high stability, which is essential for eukaryotic genomic sequencing.',
    hints: [
      'Standard cloning plasmids have insert size limits below 15 kb.',
      'Look for an artificial chromosome vector based on the bacterial F-factor.',
      'Bacterial Artificial Chromosomes (BACs) accommodate 100–300 kb genomic inserts.'
    ],
  },
  {
    id: 'ch_010_bio',
    nodeId: NODE_C12_BIO_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Inside an industrial stirred-tank bioreactor, what is the primary hydrodynamic role of the vertical curved baffles mounted along the internal vessel walls?',
    options: [
      'To break central circular vortex formation and promote turbulent, uniform gas-liquid mixing throughout the vessel',
      'To provide direct physical attachment surfaces for anchored bacterial colonies',
      'To act as continuous electrical resistance heating elements',
      'To selectively filter out and harvest recombinant extracellular proteins'
    ],
    correctIndex: 0,
    explanation: 'Baffles disrupt laminar circular swirling and prevent vortex formation generated by the rotating impeller. This creates turbulent mixing, ensuring that sparged oxygen bubbles and dissolved nutrients are uniformly distributed throughout the microbial culture.',
    hints: [
      'Consider fluid dynamics in a spinning cylindrical tank.',
      'Without baffles, fluid only spins as a central vortex without inter-layer mixing.',
      'Baffles eliminate vortexing to maximize oxygen dissolution and nutrient contact.'
    ],
  },
  {
    id: 'ch_011_bio',
    nodeId: NODE_C12_BIO_046,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does downstream processing for recombinant human insulin produced in E. coli require high-pressure cell homogenization and in vitro disulphide bond linkage, unlike fungal secretion bioprocesses?',
    options: [
      'E. coli accumulates insulin polypeptide chains as insoluble intracellular inclusion bodies without native eukaryotic disulphide bonds; cells must be lysed, solubilized, and chemically folded with S-S bridges',
      'E. coli rapidly secretes active mature insulin monomers directly across both outer and inner membranes into the culture medium',
      'Downstream processing in bacterial systems is performed exclusively to eliminate excess plasmid DNA copies',
      'Fungal enzymes lack covalent peptide bonds and thus require no chromatographic purification'
    ],
    correctIndex: 0,
    explanation: 'In E. coli, proinsulin or separate A and B chains aggregate intracellularly as insoluble inclusion bodies lacking proper disulphide bonds. Downstream processing requires cell lysis, chromatographic separation, and in vitro chemical oxidation to establish the correct intra- and inter-chain disulphide bonds.',
    hints: [
      'Consider where foreign recombinant proteins aggregate inside prokaryotic cytoplasm.',
      'Insoluble inclusion bodies necessitate cell rupture and subsequent protein refolding.',
      'E. coli packages recombinant insulin chains in inclusion bodies that must be lysed and folded.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_012_bio',
    nodeId: NODE_C12_BIO_047,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the crystalline Cry protoxin protein synthesized by Bacillus thuringiensis kill lepidopteran bollworm pests upon ingestion, yet remain completely harmless to the human gastrointestinal tract?',
    options: [
      'Cry protoxin is solubilized and cleaved into active endotoxin exclusively in the alkaline pH (9–10) of insect midgut, binding specific insect epithelial cadherin receptors; human stomach is acidic (pH ~1.5) and lacks these receptors',
      'Human mucosal cells contain an innate enzyme that instantaneously degrades all bacterial crystal endotoxins',
      'Cry toxin molecules selectively bind to cellulose fibers found only in plant cell walls',
      'Insect pests have strongly acidic stomachs that trigger crystallization of the protoxin'
    ],
    correctIndex: 0,
    explanation: 'The Cry protein is an inactive protoxin crystal that dissolves and is activated by midgut proteases only in the alkaline environment (pH > 9.0) of susceptible insect larvae. Activated toxin binds to specific receptors on midgut epithelial cells, creating pores that cause cell lysis. The human stomach is acidic and lacks these specific receptors.',
    hints: [
      'Compare human gastric pH (acidic 1.5–2.0) with insect midgut pH (alkaline 9.0–10.5).',
      'Specific membrane cadherin/aminopeptidase receptors exist only on insect midgut microvilli.',
      'Alkaline pH and specific insect receptors are mandatory for Cry protoxin activation.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_013_bio',
    nodeId: NODE_C12_BIO_047,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How does RNA interference (RNAi) biotechnology engineer host resistance in tobacco and tomato roots against the root-knot nematode Meloidogyne incognita?',
    options: [
      'Agrobacterium vectors introduce nematode-specific sense and antisense genes producing double-stranded RNA (dsRNA); when ingested by the nematode, host Dicer/RISC degrades essential nematode mRNA, silencing vital protein synthesis',
      'Transgenic roots secrete hyper-concentrated nicotine alkaloids that chemically dissolve nematode cuticles',
      'The dsRNA acts as a broad-spectrum chemical surfactant that strips epicuticular wax from nematode eggs',
      'The nematode is physically immobilized by dense chitinase fibrils generated in the plant rhizosphere'
    ],
    correctIndex: 0,
    explanation: 'Transgenic host plants express nematode-specific dsRNA. Upon ingestion by feeding nematodes, the cellular RNAi machinery (Dicer and RISC) processes the dsRNA into siRNAs that target and degrade complementary nematode mRNA, leading to gene silencing and death.',
    hints: [
      'RNA interference operates through double-stranded RNA (dsRNA) molecules.',
      'Post-transcriptional gene silencing degrades specific target mRNA transcripts.',
      'dsRNA activates RISC complexes to cleave vital nematode mRNA transcripts.'
    ],
  },
  {
    id: 'ch_014_bio',
    nodeId: NODE_C12_BIO_048,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the commercial recombinant Hepatitis B surface antigen (HBsAg) vaccine manufactured in the yeast Saccharomyces cerevisiae rather than bacterial E. coli hosts?',
    options: [
      'S. cerevisiae is a eukaryotic expression host capable of carrying out essential post-translational modifications, membrane insertion, and correct spatial assembly into immunogenic 22 nm virus-like particles (VLPs)',
      'E. coli produces excess ethanol that denatures and precipitates recombinant surface antigens',
      'Yeast cells are phagocytic and engulf intact viral capsids during fermentation',
      'Bacterial ribosomes are unable to translate eukaryotic open reading frames'
    ],
    correctIndex: 0,
    explanation: 'The Hepatitis B surface antigen (HBsAg) requires eukaryotic post-translational processing, lipid incorporation, and proper tertiary folding to assemble into immunogenic 22-nanometre virus-like particles, which yeast hosts can execute reliably.',
    hints: [
      'Consider the fundamental differences between prokaryotic and eukaryotic protein processing.',
      'Post-translational glycosylation and structural assembly into virus-like particles require eukaryotic machinery.',
      'Saccharomyces cerevisiae provides the eukaryotic environment necessary for immunogenic HBsAg particle assembly.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_015_bio',
    nodeId: NODE_C12_BIO_048,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A clinician requires definitive molecular detection of early-stage HIV infection during the initial "window period" when serum antibody concentrations are below enzyme-linked immunosorbent assay (ELISA) detection limits. Which diagnostic technology is indicated?',
    options: [
      'Quantitative Reverse-Transcriptase Polymerase Chain Reaction (RT-PCR) to amplify picogram quantities of viral RNA',
      'Standard indirect antibody-capture ELISA',
      'Direct light field microscopy of peripheral blood smears',
      'Enzymatic urine protein strip test'
    ],
    correctIndex: 0,
    explanation: 'During the early window period (first 1–3 weeks post-infection), antibodies have not yet formed in detectable quantities. RT-PCR directly detects and exponentially amplifies viral RNA, providing definitive early diagnosis.',
    hints: [
      'Antibody production requires weeks for seroconversion.',
      'Polymerase chain reaction amplifies minute copies of pathogen nucleic acids.',
      'RT-PCR directly detects viral genomic RNA with extreme sensitivity.'
    ],
  },
  {
    id: 'ch_016_bio',
    nodeId: NODE_C12_BIO_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Ministry of Environment, Forest and Climate Change (MoEFCC), which statutory apex committee evaluates the environmental biosafety and approves commercial release of Genetically Modified (GM) crops in India?',
    options: [
      'Genetic Engineering Appraisal Committee (GEAC)',
      'Indian Council of Medical Research (ICMR)',
      'National Biodiversity Authority (NBA)',
      'Department of Atomic Energy Safety Board (AERB)'
    ],
    correctIndex: 0,
    explanation: 'The Genetic Engineering Appraisal Committee (GEAC) is the apex regulatory body constituted under the Environment (Protection) Act, 1986, responsible for assessing safety data and approving environmental releases of GM organisms in India.',
    hints: [
      'Look for the statutory committee with "Appraisal" in its official designation.',
      'GEAC evaluates all open-field environmental trials of GM organisms.',
      'GEAC stands for Genetic Engineering Appraisal Committee.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_017_bio',
    nodeId: NODE_C12_BIO_049,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In 1995, the US Patent and Trademark Office granted a patent on the wound-healing properties of turmeric (Curcuma longa). Why was this legally challenged as biopiracy, and how did India achieve its total revocation?',
    options: [
      'It claimed exclusive monopoly over traditional knowledge without novelty; India submitted ancient Ayurvedic Sanskrit texts (Charaka Samhita) establishing prior art',
      'Turmeric was proven to cause acute dermatological toxicity in mammalian skin models',
      'The patent applicants failed to pay annual multinational utility patent renewal fees',
      'The Indian government proved turmeric cannot biosynthesize curcumin outside the Western Ghats'
    ],
    correctIndex: 0,
    explanation: 'Biopiracy refers to the unauthorized patenting of bioresources and traditional indigenous knowledge without benefit sharing. India successfully challenged and revoked the US turmeric patent by providing ancient Ayurvedic texts from the CSIR/Traditional Knowledge Digital Library demonstrating documented prior art.',
    hints: [
      'Biopiracy commercializes indigenous knowledge without acknowledging prior art or consent.',
      'Documented traditional Ayurvedic medicine established that turmeric wound healing was not novel.',
      'Historical Sanskrit prior art documented by CSIR overturned the invalid patent.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_018_bio',
    nodeId: NODE_C12_BIO_050,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a wildlife sanctuary, ecologists conduct a Lincoln-Petersen mark-recapture survey of swamp deer. In the first sampling session, 50 deer are captured, tagged, and released (M = 50). In the second sampling session, 80 deer are captured (n = 80), of which 20 bear tags (m = 20). What is the total estimated population size (N)?',
    correctAnswer: 200,
    tolerance: 1,
    unit: 'deer',
    explanation: 'Lincoln-Petersen formula: N = (M × n) / m = (50 × 80) / 20 = 4000 / 20 = 200 deer in the sanctuary habitat.',
    hints: [
      'Use the formula: N = (M × n) / m.',
      'Multiply marked individuals (50) by total second catch (80), then divide by recaptured marked individuals (20).',
      '50 × 80 / 20 = 200 deer.'
    ],
  },
  {
    id: 'ch_019_bio',
    nodeId: NODE_C12_BIO_050,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An ecological census of a human or mammalian population reveals a broad triangular age pyramid with an extensive base of pre-reproductive juveniles tapering steeply toward post-reproductive cohorts. What future demographic trend does this structure indicate?',
    options: [
      'A rapidly growing, expanding population with high natality and biotic momentum',
      'A stable zero-growth population with uniform age cohorts across pre-reproductive and reproductive tiers',
      'A declining, senescent population represented by an inverted urn-shaped pyramid',
      'An extinct population with zero biotic potential'
    ],
    correctIndex: 0,
    explanation: 'A broad triangular base indicates a high proportion of pre-reproductive individuals. As this large cohort matures into reproductive age, the absolute number of births will expand substantially, sustaining rapid population growth.',
    hints: [
      'A broad pyramid base signifies high numbers of young individuals.',
      'When these individuals reach reproductive age, overall birth rates surge.',
      'A broad-based triangular pyramid corresponds to an expanding population.'
    ],
  },
  {
    id: 'ch_020_bio',
    nodeId: NODE_C12_BIO_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In the Verhulst-Pearl logistic growth equation dN/dt = rN × ((K - N) / K), what biological condition occurs when the current population size N exactly equals the carrying capacity K of the ecosystem?',
    options: [
      'The instantaneous population growth rate (dN/dt) becomes zero as environmental resistance balances biotic potential',
      'The population undergoes exponential J-shaped geometric expansion',
      'The intrinsic rate of natural increase (r) approaches positive infinity',
      'Mortality rates immediately drop to absolute zero across all cohorts'
    ],
    correctIndex: 0,
    explanation: 'When population size N reaches carrying capacity K, the term (K - N)/K becomes (K - K)/K = 0. Therefore, the growth rate dN/dt = rN(0) = 0, indicating demographic equilibrium and population stabilization at environmental carrying capacity.',
    hints: [
      'Substitute N = K into the equation.',
      '(K - K) / K equals zero.',
      'When (K - N)/K = 0, dN/dt = 0; the population reaches dynamic equilibrium.'
    ],
  },
  {
    id: 'ch_021_bio',
    nodeId: NODE_C12_BIO_041,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Cannabinoids extracted from Cannabis sativa interact with specific cannabinoid receptors located primarily in which physiological system?',
    options: [
      'Receptors located principally in the central nervous system (brain) and cardiovascular system',
      'Receptors restricted exclusively to skeletal muscle sarcomeres',
      'Receptors found solely on renal glomerular podocytes',
      'Receptors located only inside the lumen of the gallbladder'
    ],
    correctIndex: 0,
    explanation: 'Cannabinoids bind to CB1 receptors distributed across the brain (cerebellum, basal ganglia, hippocampus) and CB2 receptors in immune tissues, producing profound effects on coordination, cognitive processing, and cardiovascular parameters.',
    hints: [
      'Cannabinoids affect motor control, sensory perception, and heart rate.',
      'CB1 receptors are densely expressed throughout the central nervous system.',
      'Primary targets are cannabinoid receptors in the brain and cardiovascular system.'
    ],
  },
  {
    id: 'ch_022_bio',
    nodeId: NODE_C12_BIO_043,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In sewage treatment plants, how does the biological measurement of Biochemical Oxygen Demand (BOD) serve as a direct indicator of water pollution levels?',
    options: [
      'High BOD indicates heavy organic waste loads requiring large amounts of oxygen by aerobic microbes; BOD declines as organic pollutants are degraded',
      'High BOD indicates purely inorganic heavy metal contamination',
      'BOD measures the physical mass of insoluble sand particles',
      'Low BOD indicates extreme toxic pollution that kills all bacteria'
    ],
    correctIndex: 0,
    explanation: 'BOD measures the amount of dissolved oxygen consumed by aerobic microorganisms to decompose organic matter present in a unit volume of water. Greater organic pollution creates higher microbial oxygen demand, meaning higher BOD reflects poorer water quality.',
    hints: [
      'BOD reflects the oxygen consumed by aerobic microbes during decomposition.',
      'More organic sewage requires more microbial oxygen to break down.',
      'High BOD corresponds directly to high organic sewage pollution.'
    ],
  }
];

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Synaptic Neurochemistry (DAT Inhibition & Addiction Kinetics)',
    instruction: 'Adjust the dopamine reuptake inhibition slider to observe transmitter accumulation at the synaptic cleft.',
    interactionType: 'synapse-sim',
    nodeId: NODE_C12_BIO_041,
  },
  {
    title: '2. Microbial Fermentation (Milk to Curd & Bread Leavening)',
    instruction: 'Toggle between Lactobacillus (curd) and Saccharomyces (bread) to observe pH shifts and CO2 gas production.',
    interactionType: 'fermentation-sim',
    nodeId: NODE_C12_BIO_042,
  },
  {
    title: '3. rDNA Construction & Plasmid Palindrome Cleavage',
    instruction: 'Select EcoRI to cut the vector palindrome and ligate the human gene of interest using DNA ligase.',
    interactionType: 'rdna-sim',
    nodeId: NODE_C12_BIO_044,
  },
  {
    title: '4. Bioreactor Hydrodynamics & Aeration Scale-Up',
    instruction: 'Regulate impeller agitation (RPM) and sparger airflow to optimize dissolved O2 and recombinant biomass yield.',
    interactionType: 'bioreactor-sim',
    nodeId: NODE_C12_BIO_046,
  },
  {
    title: '5. Ecological Carrying Capacity & Logistic Demography',
    instruction: 'Vary population density N relative to carrying capacity K and observe the logistic growth rate response.',
    interactionType: 'ecology-sim',
    nodeId: NODE_C12_BIO_050,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an industrial bioreactor impeller is turned OFF while aerobic microbial cell density is high, what will happen to dissolved oxygen within 3 minutes?',
    options: [
      'Dissolved oxygen will crash to near zero because dense aerobic bacteria consume it faster than surface diffusion can replenish it',
      'Dissolved oxygen will rise because less thermal agitation is generated',
      'Dissolved oxygen remains constant because liquid medium stores infinite dissolved gases',
      'Bacterial cells will immediately switch to active chlorophyll photosynthesis'
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Impeller RPM slider to 0 in the Bioreactor stage and watch the Dissolved O2 monitor drop rapidly into the critical red zone.',
    nodeId: NODE_C12_BIO_046,
  },
  {
    question: 'Predict: In a logistic population model where K = 500, what happens to dN/dt if the population N temporarily exceeds carrying capacity to 520 due to sudden immigration?',
    options: [
      'dN/dt becomes negative because the term (K - N) is negative, causing net population decline back toward carrying capacity K',
      'dN/dt doubles to permanently sustain the higher population',
      'Carrying capacity K automatically expands to 1000 to accommodate the extra biomass',
      'The intrinsic rate of increase r immediately drops to negative infinity'
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the Population N slider above K in the Ecology lab to observe the instantaneous growth rate invert to a negative value.',
    nodeId: NODE_C12_BIO_050,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe happens to the synaptic cleft when dopamine reuptake transporters are blocked by 80%?',
    observableOptions: [
      'Dopamine molecules accumulate in high concentrations in the cleft, persistently triggering post-synaptic receptors',
      'Dopamine molecules vanish completely within 1 millisecond',
      'Post-synaptic receptors detach from the membrane and dissolve',
      'No neurochemical alteration occurs'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_041,
  },
  {
    question: 'What happens to the medium pH as Lactobacillus multiplies in warm milk?',
    observableOptions: [
      'pH drops from 6.6 towards 4.5 due to lactic acid accumulation, triggering casein protein curdling',
      'pH rises above 12, creating an intensely alkaline caustic solution',
      'pH stays neutral at exactly 7.00 without any deviation',
      'The liquid spontaneously crystallizes into ice cubes'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_042,
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
  nodeId: NODE_C12_BIO_041,
  title: 'C12 Biology: Drugs, Microbes, Biotech & Population Ecology',
  definition: 'Comprehensive Class 12 ISC Biology covering neurobiology of substance abuse, microbial biotechnology in food and waste treatment, recombinant DNA engineering, industrial bioprocesses, biosafety, and population demography.',
  eli5: 'Explore how molecules hijack brain pleasure circuits, how helpful microbes brew foods and gas, how scientists paste genes to create insulin, and how nature balances animal populations.',
  misconceptions: [
    { misconception: 'Drug addiction reasons are identical to physiological drug effects', correction: 'Reasons are psychosocial causes (peer pressure, stress, curiosity); effects are physiological consequences (dopamine receptor downregulation, liver cirrhosis, organ failure).' },
    { misconception: 'Secondary sewage treatment is a chemical disinfection process', correction: 'Secondary sewage treatment is purely biological/biochemical, driven by aerobic microbial and fungal flocs that consume organic load to lower BOD.' },
    { misconception: 'Restriction endonucleases cut DNA randomly at any non-specific point', correction: 'Restriction enzymes are sequence-specific endonucleases that recognize specific palindromic sequences (e.g., 5-GAATTC-3 for EcoRI).' },
    { misconception: 'Biopiracy and biopatent are synonymous terms', correction: 'A biopatent is a legitimate intellectual property protection; biopiracy is the unauthorized, uncompensated exploitation of indigenous traditional knowledge.' },
    { misconception: 'Carrying capacity K is a static, immutable constant', correction: 'Carrying capacity changes dynamically in response to resource availability, climatic fluctuations, technological interventions, or environmental degradation.' },
  ],
  diagnosticQuestions: [
    { question: 'Which plant yields morphine?', options: ['Papaver somniferum', 'Cannabis sativa', 'Erythroxylum coca', 'Atropa belladonna'], correctIndex: 0 },
    { question: 'Which microbe curdles milk into dahi?', options: ['Lactobacillus', 'Saccharomyces', 'Methanobacterium', 'Bacillus'], correctIndex: 0 },
    { question: 'What is the primary gas in biogas?', options: ['Methane (50-70%)', 'Oxygen', 'Nitrogen dioxide', 'Helium'], correctIndex: 0 },
    { question: 'EcoRI enzyme recognizes which palindromic sequence?', options: ['GAATTC', 'GGATCC', 'AAGCTT', 'TTCGAA'], correctIndex: 0 },
    { question: 'What is insertional inactivation in pBR322?', options: ['Disruption of a selectable marker gene by foreign insert', 'Destruction of origin of replication', 'Thermal denaturation of plasmid', 'Detergent lysis'], correctIndex: 0 },
    { question: 'Bt toxin is harmless to humans because:', options: ['Human stomach is acidic and lacks specific insect epithelial receptors', 'Humans have thick keratinized skin', 'Humans lack all protease enzymes', 'Bt gene functions only inside cotton leaves'], correctIndex: 0 },
    { question: 'Which vector carries large genomic inserts up to 300 kb?', options: ['Bacterial Artificial Chromosome (BAC)', 'pUC19 plasmid', 'Lambda insertion phage', 'SV40 virus'], correctIndex: 0 },
    { question: 'In mark-recapture, if M=50, n=80, m=20, estimated population N is:', options: ['200', '100', '400', '80'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery of Class 12 ISC Biology across neuropharmacology, applied microbiology, recombinant DNA principles, bioreactor design, biosafety ethics, and ecological demography.',
};

// ─── MAIN COMPONENT ───
function C12_BiologyDrugAlcoholAbuseSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BIO_041,
    title = DEFAULT_PROPS.title || 'C12 Biology Integrated Simulation',
    misconceptions = DEFAULT_PROPS.misconceptions,
    diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org Pedagogical States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Exploration Simulation States (5 interactive labs)
  const [dopamineInhibition, setDopamineInhibition] = useState(25); // 0-100%
  const [synapticDopamineCount, setSynapticDopamineCount] = useState(30);
  const [activeMicrobe, setActiveMicrobe] = useState<'lacto' | 'yeast' | 'propioni'>('lacto');
  const [milkPh, setMilkPh] = useState(6.6);
  const [restrictionEnzymeCut, setRestrictionEnzymeCut] = useState(false);
  const [ligatedGene, setLigatedGene] = useState(false);
  const [bioreactorRpm, setBioreactorRpm] = useState(350); // RPM
  const [bioreactorAirflow, setBioreactorAirflow] = useState(2.0); // vvm
  const [dissolvedO2, setDissolvedO2] = useState(65); // %
  const [biomassYield, setBiomassYield] = useState(48); // g/L
  const [ecoPopulationN, setEcoPopulationN] = useState(200);
  const [ecoCarryingK, setEcoCarryingK] = useState(500);
  const [ecoGrowthRate, setEcoGrowthRate] = useState(0.05);

  // Sandbox & Challenge Feedback States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Drop & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Feedback Visual Elements
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistent BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY: FILTER CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
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
    speechManager.speak('Welcome to the Class 12 Biology interactive simulation.');
  }, [nodeId]);

  // ─── BKT UPDATE ADAPTIVE EFFECT ───
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
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME CALCULATION: SYNAPSE & DOPAMINE ───
  useEffect(() => {
    const baseCount = 20;
    const excess = Math.round((dopamineInhibition / 100) * 80);
    setSynapticDopamineCount(baseCount + excess);
  }, [dopamineInhibition]);

  // ─── REAL-TIME CALCULATION: BIOREACTOR AERATION ───
  useEffect(() => {
    const effectiveDo = Math.min(100, Math.max(5, (bioreactorRpm / 500) * 50 + (bioreactorAirflow / 3.0) * 50));
    setDissolvedO2(Math.round(effectiveDo));
    const yieldEst = Math.min(95, Math.max(10, (effectiveDo / 100) * 75 + (bioreactorRpm / 500) * 20));
    setBiomassYield(Math.round(yieldEst));
  }, [bioreactorRpm, bioreactorAirflow]);

  // ─── REAL-TIME CALCULATION: LOGISTIC ECOLOGY GROWTH ───
  useEffect(() => {
    const r = 0.1;
    const dnDt = r * ecoPopulationN * ((ecoCarryingK - ecoPopulationN) / ecoCarryingK);
    setEcoGrowthRate(parseFloat(dnDt.toFixed(2)));
  }, [ecoPopulationN, ecoCarryingK]);

  // ─── CANVAS 2D ANIMATION: NEURAL & BIOPROCESS MONITOR ───
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

      // Gradient background
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated synaptic pulses / bioreactor bubbles
      const particleCount = Math.min(60, Math.floor(synapticDopamineCount / 2));
      for (let i = 0; i < particleCount; i++) {
        const x = (i * 19 + frame * 1.5) % canvas.width;
        const y = 30 + Math.sin(frame * 0.05 + i) * 18;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dopamineInhibition > 60 ? '#f43f5e' : '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Live waveform monitor
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const wave = Math.sin(x * 0.04 + frame * 0.08) * (dopamineInhibition * 0.2) + 60;
        if (x === 0) ctx.moveTo(x, wave);
        else ctx.lineTo(x, wave);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [dopamineInhibition, synapticDopamineCount]);

  // ─── ESCALATING HINTS HANDLER ───
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
      speechManager.speak('Let us review the complete biological mechanism together.');
    }
  }, [hintCount, challenge]);

  // ─── RESET INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── HANDLERS FOR NAVIGATION & PHASES ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Interactive Exploration Lab. Manipulate the biological controls below.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play sandbox mode. Test any biological parameters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Test your analytical understanding.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now verify your prediction using the live interactive controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation.' : 'Examine the synaptic cleft gauge closely.');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation completed with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── MASTER ANSWER EVALUATOR ───
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
        const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent biological deduction.');
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
          speechManager.speak('Let us analyze the explanation step by step.');
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

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length > 0 ? [...prev] : (CHALLENGES[7].sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans select-none">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="text-3xl p-2 bg-emerald-950/80 rounded-xl border border-emerald-500/30"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">Class 12 ISC Biology • Comprehensive Unit Lab</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 uppercase tracking-wider"
          >
            Phase: {phase}
          </motion.div>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-green-950/60 border-green-500 text-green-300'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
              }`}
            >
              {difficulty}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ─── LIVE 2D OSCILLOSCOPE / BIO-CANVAS ─── */}
      <div className="mb-6 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1 px-1">
          <span>⚡ Live Synaptic Pulse & Bioreactor Aeration Waveform</span>
          <span>Active Nodes: c12_bio_041 to c12_bio_050</span>
        </div>
        <canvas ref={canvasRef} width={800} height={90} className="w-full h-20 rounded-xl bg-slate-950" />
      </div>

      {/* ─────────────────────────���───────────────────────────────────
          PHASE 1: DISCOVERY HOOK
      ───────────────────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/40">
            <h2 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
              🔬 {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-400 mt-2 font-medium bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-800/30">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              ❓ Discovery Query: {DISCOVERY_QUESTION.question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">
                    {discoveryAnswered && (i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : '✗ ')}
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Cocaine locks dopamine active transporters (DAT) in the closed conformation, accumulating neurotransmitters in the cleft.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Advance to visual interactive exploration labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40"
                >
                  Enter Visual Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT-STYLE LABS)
      ───────────────────────────────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab step switcher */}
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <motion.button
              aria-label="Navigate to previous exploration lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-sm font-semibold disabled:opacity-30"
            >
              ← Previous Lab
            </motion.button>
            <div className="flex items-center gap-2">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-emerald-400 scale-125' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Navigate to next exploration lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Advance to free sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-cyan-600 text-white rounded-xl text-sm font-bold"
              >
                Free Sandbox →
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-emerald-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* LAB 1: SYNAPSE & DRUG DISRUPTION */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 450 240" className="w-full max-h-60" aria-label="Synaptic Cleft Neurochemical Diagram">
                      {/* Pre-synaptic terminal */}
                      <path d="M 50,20 C 150,20 180,90 200,90 C 220,90 250,20 350,20 L 350,0 L 50,0 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="200" y="45" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Pre-Synaptic Axon Terminal</text>

                      {/* Synaptic vesicles */}
                      <circle cx="140" cy="55" r="10" fill="#0284c7" />
                      <circle cx="170" cy="65" r="10" fill="#0284c7" />
                      <circle cx="230" cy="65" r="10" fill="#0284c7" />
                      <circle cx="260" cy="55" r="10" fill="#0284c7" />

                      {/* Transporter proteins (DAT) */}
                      <rect x="110" y="85" width="25" height="12" rx="3" fill={dopamineInhibition > 50 ? '#e11d48' : '#10b981'} />
                      <rect x="265" y="85" width="25" height="12" rx="3" fill={dopamineInhibition > 50 ? '#e11d48' : '#10b981'} />
                      <text x="200" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        DAT Transporter Status: {dopamineInhibition > 50 ? 'BLOCKED (Cocaine/Opioids)' : 'OPEN (Normal Physiology)'}
                      </text>

                      {/* Synaptic Cleft Particles */}
                      {Array.from({ length: Math.min(40, synapticDopamineCount) }).map((_, i) => (
                        <circle
                          key={i}
                          cx={100 + (i * 17) % 250}
                          cy={120 + ((i * 11) % 40)}
                          r="4"
                          fill="#f59e0b"
                          opacity="0.9"
                        />
                      ))}

                      {/* Post-synaptic Membrane */}
                      <path d="M 50,180 C 150,180 180,165 200,165 C 220,165 250,180 350,180 L 350,220 L 50,220 Z" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
                      {/* Receptors */}
                      <rect x="130" y="170" width="18" height="10" rx="2" fill="#22c55e" />
                      <rect x="190" y="160" width="18" height="10" rx="2" fill="#22c55e" />
                      <rect x="250" y="170" width="18" height="10" rx="2" fill="#22c55e" />
                      <text x="200" y="205" fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold">Post-Synaptic Dopamine Receptors (D2/D1)</text>
                    </svg>
                  </div>

                  <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <label htmlFor="dopamine-slider" className="text-xs text-slate-300 font-bold block">
                      Dopamine Reuptake Inhibition: {dopamineInhibition}%
                    </label>
                    <input
                      id="dopamine-slider"
                      aria-label="Dopamine Reuptake Inhibition percentage"
                      type="range"
                      min={0}
                      max={100}
                      value={dopamineInhibition}
                      onChange={e => setDopamineInhibition(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                      <p className="text-slate-400">Synaptic Dopamine Load: <span className="font-bold text-amber-300">{synapticDopamineCount} units</span></p>
                      <p className="text-slate-400">Reward Pathway Firing: <span className="font-bold text-emerald-400">{dopamineInhibition > 50 ? 'Euphoric Hyper-Activation' : 'Homeostatic Baseline'}</span></p>
                    </div>

                    {!observationAnswered && dopamineInhibition > 60 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2 border-t border-slate-800">
                        <p className="text-xs font-bold text-cyan-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation answer choice: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="block w-full text-left p-2 mb-1 text-xs bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* LAB 2: MICROBES IN HOUSEHOLD PRODUCTS */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 400 200" className="w-full" aria-label="Microbial Fermentation Reaction Chamber">
                      {/* Vessel */}
                      <rect x="80" y="30" width="240" height="140" rx="15" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
                      {/* Liquid / Product */}
                      <rect
                        x="90"
                        y={activeMicrobe === 'lacto' ? 70 : 85}
                        width="220"
                        height={activeMicrobe === 'lacto' ? 90 : 75}
                        rx="10"
                        fill={activeMicrobe === 'lacto' ? '#f8fafc' : activeMicrobe === 'yeast' ? '#d97706' : '#fef08a'}
                        opacity="0.85"
                      />
                      {activeMicrobe === 'lacto' && (
                        <g>
                          <text x="200" y="115" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">Coagulated Casein (Dahi)</text>
                          <text x="200" y="135" textAnchor="middle" fill="#334155" fontSize="10">Lactic Acid pH: {milkPh.toFixed(1)}</text>
                        </g>
                      )}
                      {activeMicrobe === 'yeast' && (
                        <g>
                          <circle cx="140" cy="110" r="12" fill="#b45309" />
                          <circle cx="190" cy="100" r="15" fill="#b45309" />
                          <circle cx="240" cy="120" r="14" fill="#b45309" />
                          <text x="200" y="145" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">CO2 Bubbles in Dough (Leavening)</text>
                        </g>
                      )}
                      {activeMicrobe === 'propioni' && (
                        <g>
                          <circle cx="130" cy="110" r="16" fill="#ca8a04" />
                          <circle cx="200" cy="105" r="22" fill="#ca8a04" />
                          <circle cx="265" cy="125" r="14" fill="#ca8a04" />
                          <text x="200" y="150" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="bold">Swiss Cheese Gas Eyes (Propionic Acid)</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-300">Select Microorganism Inoculum:</p>
                    <motion.button
                      aria-label="Select Lactobacillus for curd setting"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveMicrobe('lacto');
                        setMilkPh(4.5);
                        audioManager.play('tap');
                      }}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border ${
                        activeMicrobe === 'lacto' ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      🥛 Lactobacillus (Curd Setting)
                    </motion.button>
                    <motion.button
                      aria-label="Select Saccharomyces cerevisiae for bread dough fermentation"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveMicrobe('yeast');
                        audioManager.play('tap');
                      }}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border ${
                        activeMicrobe === 'yeast' ? 'bg-amber-950 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      🍞 Saccharomyces cerevisiae (Baker\'s Yeast)
                    </motion.button>
                    <motion.button
                      aria-label="Select Propionibacterium shermanii for Swiss cheese ripening"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveMicrobe('propioni');
                        audioManager.play('tap');
                      }}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border ${
                        activeMicrobe === 'propioni' ? 'bg-yellow-950 border-yellow-500 text-yellow-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      🧀 Propionibacterium shermanii (Swiss Cheese)
                    </motion.button>
                  </div>
                </div>
              )}

              {/* LAB 3: RDNA & RESTRICTION ENZYMES */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 160" className="w-full max-h-48" aria-label="Recombinant DNA Plasmid Cleavage and Ligation Diagram">
                      {/* Plasmid circular map */}
                      <circle cx="120" cy="80" r="50" fill="none" stroke="#475569" strokeWidth="12" />
                      {/* EcoRI recognition site */}
                      <circle
                        cx="120"
                        cy="30"
                        r="10"
                        fill={restrictionEnzymeCut ? '#ef4444' : '#10b981'}
                        className="cursor-pointer"
                        role="button"
                        aria-label="EcoRI Palindrome recognition site"
                        onClick={() => setRestrictionEnzymeCut(true)}
                      />
                      <text x="120" y="85" fill="#f8fafc" fontSize="12" textAnchor="middle" fontWeight="bold">pBR322</text>
                      <text x="120" y="20" fill="#38bdf8" fontSize="10" textAnchor="middle">EcoRI (GAATTC)</text>

                      {/* Foreign Human Gene */}
                      <rect x="240" y="65" width="100" height="30" rx="6" fill="#a855f7" stroke="#d8b4fe" strokeWidth="2" />
                      <text x="290" y="84" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">Insulin Gene</text>

                      {/* Recombinant Plasmid Product */}
                      {ligatedGene && (
                        <g>
                          <circle cx="420" cy="80" r="50" fill="none" stroke="#475569" strokeWidth="12" />
                          <path d="M 420,30 A 50 50 0 0 1 455,45" fill="none" stroke="#a855f7" strokeWidth="14" />
                          <text x="420" y="85" fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold">Recombinant rDNA</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 justify-center">
                    <motion.button
                      aria-label="Enzymatically cut GAATTC palindrome with EcoRI"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setRestrictionEnzymeCut(true);
                        audioManager.play('pop');
                      }}
                      className="px-4 py-2 bg-rose-700 text-white rounded-xl text-xs font-bold"
                    >
                      1. Cut GAATTC Palindrome with EcoRI ✂️
                    </motion.button>
                    <motion.button
                      aria-label="Ligate insulin cDNA into open plasmid vector using DNA ligase"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!restrictionEnzymeCut}
                      onClick={() => {
                        setLigatedGene(true);
                        audioManager.play('drop-correct');
                      }}
                      className="px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold disabled:opacity-30"
                    >
                      2. Ligate Insulin Gene with DNA Ligase 🧬
                    </motion.button>
                  </div>
                </div>
              )}

              {/* LAB 4: BIOREACTOR AERATION SCALE-UP */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800">
                      <p className="text-sm font-bold text-indigo-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-750"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="rpm-slider" className="text-xs text-slate-400 block font-bold">Impeller Speed: {bioreactorRpm} RPM</label>
                        <input
                          id="rpm-slider"
                          aria-label="Bioreactor Impeller RPM slider"
                          type="range"
                          min={0}
                          max={600}
                          value={bioreactorRpm}
                          onChange={e => setBioreactorRpm(Number(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="airflow-slider" className="text-xs text-slate-400 block font-bold">Sparger Airflow: {bioreactorAirflow} vvm</label>
                        <input
                          id="airflow-slider"
                          aria-label="Bioreactor Sparger Airflow in vvm slider"
                          type="range"
                          min={0.1}
                          max={3.0}
                          step={0.1}
                          value={bioreactorAirflow}
                          onChange={e => setBioreactorAirflow(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dissolved Oxygen (DO):</span>
                        <span className={`font-bold ${dissolvedO2 < 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {dissolvedO2 < 30 ? '✗ ' : '✓ '} {dissolvedO2}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all" style={{ width: `${dissolvedO2}%` }} />
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-800">
                        <span className="text-slate-400">Recombinant Protein Yield:</span>
                        <span className="font-bold text-amber-300">{biomassYield} g/L</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: POPULATION DYNAMICS & LOGISTIC K */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="pop-n-slider" className="text-xs text-slate-400 block font-bold">Population Size (N): {ecoPopulationN} individuals</label>
                      <input
                        id="pop-n-slider"
                        aria-label="Ecological population size N slider"
                        type="range"
                        min={10}
                        max={800}
                        value={ecoPopulationN}
                        onChange={e => setEcoPopulationN(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="pop-k-slider" className="text-xs text-slate-400 block font-bold">Carrying Capacity (K): {ecoCarryingK} individuals</label>
                      <input
                        id="pop-k-slider"
                        aria-label="Ecological carrying capacity K slider"
                        type="range"
                        min={100}
                        max={800}
                        value={ecoCarryingK}
                        onChange={e => setEcoCarryingK(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl space-y-2 text-xs flex flex-col justify-center">
                    <p className="text-slate-300 font-bold">Logistic Growth Formula:</p>
                    <p className="font-mono text-cyan-300 bg-slate-950 p-2 rounded-lg border border-slate-800">
                      dN/dt = rN · ((K - N) / K)
                    </p>
                    <p className="text-slate-300 pt-2">
                      Instantaneous Growth Rate (dN/dt):{' '}
                      <span className={`font-bold ${ecoGrowthRate < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {ecoGrowthRate < 0 ? '✗ ' : '✓ '} {ecoGrowthRate} per unit time
                      </span>
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      {ecoPopulationN > ecoCarryingK ? '⚠️ N > K: Population overshoots capacity; mortality exceeds natality.' : '✅ N < K: Population expands toward environmental saturation.'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 3: SANDBOX (FREE PLAY)
      ───────────────────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-cyan-300">Free Biological Sandbox</h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore neurochemistry, bioreactors, and ecological population models freely without graded assessment.
              </p>
            </div>
            <motion.button
              aria-label="Proceed to graded challenge phase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40"
            >
              Start Challenges Now →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-400">🧠 Synaptic Transporter Overdrive</span>
              <input
                aria-label="Sandbox Synaptic Inhibition Slider"
                type="range"
                min={0}
                max={100}
                value={dopamineInhibition}
                onChange={e => setDopamineInhibition(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-xs text-slate-300">Inhibition: {dopamineInhibition}% | Synaptic Transmitters: {synapticDopamineCount}</p>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-cyan-400">⚙️ Stirred Tank Agitation & Aeration</span>
              <input
                aria-label="Sandbox Bioreactor RPM Slider"
                type="range"
                min={50}
                max={600}
                value={bioreactorRpm}
                onChange={e => setBioreactorRpm(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <p className="text-xs text-slate-300">RPM: {bioreactorRpm} | Dissolved O2: {dissolvedO2}% | Yield: {biomassYield} g/L</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 4: ADAPTIVE CHALLENGE SYSTEM (22 PROGRESSIVE CHALLENGES)
      ───────────────────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Progress & Meta Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <span>
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <span className="font-semibold text-indigo-300">
              Competency: {challenge.competencyLevel.toUpperCase()} • Node: {challenge.nodeId}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h2 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h2>

            {/* MCQ / Distinguish / Classify Option Buttons */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/50'
                      }`}
                    >
                      <span className="font-bold mr-3 text-slate-400">
                        {showExplanation && (i === challenge.correctIndex ? '✓ ' : '✗ ')}
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Challenge Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3 py-2 bg-emerald-800/90 text-white text-xs font-semibold rounded-lg cursor-grab border border-emerald-600"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['primary_tank', 'aeration_tank', 'digester_tank'].map(targetId => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target zone for ${targetId.replace('_', ' ')}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[90px] flex flex-col justify-center items-center text-center"
                    >
                      <span className="text-[11px] text-slate-400 font-bold uppercase mb-1">
                        {targetId.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-emerald-300 font-bold">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching process here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify stage label mapping"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Stage Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIndex + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-emerald-400 mr-2">{displayIndex + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500">☰ Drag to reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Submit arranged sequence order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Calculated numerical answer input"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-slate-400 text-sm font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numerical value"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-emerald-950/40 border border-emerald-700/60 rounded-xl space-y-3"
              >
                <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Detailed Step-by-Step Mechanism:
                </p>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-200 leading-relaxed"
                    >
                      <strong className="text-emerald-400 font-mono mr-1">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next explanation sentence"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to next challenge or complete"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Complete Lab Assessment →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS
      ───────────────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 rounded-3xl border border-emerald-800/60 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Class 12 Biology Simulation Complete!</h2>
            <div className="flex justify-center gap-6">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Mastery Rating</p>
                <p className="text-xl font-black text-cyan-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/80 to-slate-900 rounded-2xl border border-emerald-500/40 text-sm">
            <h3 className="font-bold text-base text-emerald-300 mb-1">
              {errors === 0
                ? '🌟 PERFECT SCORE!'
                : errors <= 3
                ? '👏 Great work!'
                : errors <= 7
                ? '💪 Good effort!'
                : '🎯 Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs text-slate-200">
              {errors === 0
                ? 'Flawless performance! You have mastered all 10 modules from synaptic kinetics to demographic modeling.'
                : errors <= 3
                ? 'Strong understanding! A quick brush up on restriction sites and vector markers will make your recall unbeatable.'
                : errors <= 7
                ? 'You made commendable progress through complex biochemistry and ecological math. Revisit the interactive labs to sharpen your retention.'
                : 'Biotechnology and population ecology have deep multi-step pathways. Spend extra time in the sandbox and try again soon!'}
            </p>
          </div>

          {/* SPACED REPETITION (SRS) VISIBILITY */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-cyan-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                📅 Spaced Repetition (SM-2 SRS) Schedule
              </span>
              <span className="text-xs font-bold px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-700 rounded-full">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Optimal memory consolidation for Class 12 ISC examinations requires structured review intervals. Your next review is scheduled for{' '}
              <strong className="text-white">
                {errors === 0
                  ? '7 days from today (Long-term Mastery)'
                  : errors <= 3
                  ? '3 days from today (Reinforcement)'
                  : '1 day from today (Active Re-learning)'}
              </strong>.
            </p>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Identified Misconception Traps & Clarifications:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Scientific Reality: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* REAL WORLD ACTIVITY EXTENSION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
                🌍 {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">{REAL_WORLD_ACTIVITY.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REAL_WORLD_ACTIVITY.steps.map(s => (
                <div key={s.step} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 text-[11px] font-bold flex items-center justify-center">
                      {s.step}
                    </span>
                    <h4 className="text-xs font-bold text-slate-200">{s.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Feedback Overlay Components (Without 'show' prop, using 'message' not 'text') */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiologyDrugAlcoholAbuseSim;