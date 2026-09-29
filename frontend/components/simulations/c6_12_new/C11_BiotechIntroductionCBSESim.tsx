'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. NODE DEFINITIONS
// ==========================================
const NODE_288 = 'c11_bt_cbse_288'; // Definition and Scope of Biotechnology
const NODE_289 = 'c11_bt_cbse_289'; // Historical Perspective of Biotechnology
const NODE_290 = 'c11_bt_cbse_290'; // Ancient vs Modern vs Classical Biotechnology
const NODE_291 = 'c11_bt_cbse_291'; // Fermentation Technology
const NODE_292 = 'c11_bt_cbse_292'; // Microorganisms in Biotechnology
const NODE_293 = 'c11_bt_cbse_293'; // Louis Pasteur and the Science of Fermentation
const NODE_294 = 'c11_bt_cbse_294'; // Industrial Scale Fermentation and Bioreactors
const NODE_295 = 'c11_bt_cbse_295'; // The Term Biotechnology and Karl Ereky
const NODE_296 = 'c11_bt_cbse_296'; // Indian Traditional Knowledge in Biotechnology
const NODE_297 = 'c11_bt_cbse_297'; // The Compound Microscope and Cellular Discovery
const NODE_298 = 'c11_bt_cbse_298'; // Cell Theory
const NODE_299 = 'c11_bt_cbse_299'; // Cell Division and Chromosomes
const NODE_300 = 'c11_bt_cbse_300'; // Foundations of Genetics and Heredity
const NODE_301 = 'c11_bt_cbse_301'; // Timeline of Major Scientific Milestones in Biotechnology
const NODE_302 = 'c11_bt_cbse_302'; // Eduard Buchner and Cell-Free Fermentation
const NODE_303 = 'c11_bt_cbse_303'; // Metabolic Pathways and Biochemistry
const NODE_304 = 'c11_bt_cbse_304'; // Discovery of DNA as the Genetic Material
const NODE_305 = 'c11_bt_cbse_305'; // Proteins and Their Role in Living Systems
const NODE_306 = 'c11_bt_cbse_306'; // Watson, Crick, and the Double Helix Structure of DNA
const NODE_307 = 'c11_bt_cbse_307'; // Biomolecules: Building Blocks of Life
const NODE_308 = 'c11_bt_cbse_308'; // Multidisciplinary Nature of Modern Biotechnology
const NODE_309 = 'c11_bt_cbse_309'; // Recombinant DNA (rDNA) Technology
const NODE_310 = 'c11_bt_cbse_310'; // Restriction Enzymes and DNA Ligase
const NODE_311 = 'c11_bt_cbse_311'; // Industrial Microbiology
const NODE_312 = 'c11_bt_cbse_312'; // Classification of Biotechnology by Color Codes
const NODE_313 = 'c11_bt_cbse_313'; // Genetic Engineering: Principles and Applications
const NODE_314 = 'c11_bt_cbse_314'; // GMOs and Transgenic Organisms
const NODE_315 = 'c11_bt_cbse_315'; // Applications of Biotechnology in Medicine and Healthcare
const NODE_316 = 'c11_bt_cbse_316'; // Biopharmaceutical Production: Human Insulin
const NODE_317 = 'c11_bt_cbse_317'; // Therapeutic Proteins and Biopharmaceuticals
const NODE_318 = 'c11_bt_cbse_318'; // Diagnostic Tools and Kits in Biotechnology
const NODE_319 = 'c11_bt_cbse_319'; // Gene Therapy: Principles and Applications
const NODE_320 = 'c11_bt_cbse_320'; // Genetic Testing and Screening
const NODE_321 = 'c11_bt_cbse_321'; // Applications of Biotechnology in Crop Improvement
const NODE_322 = 'c11_bt_cbse_322'; // Bt Cotton and Insect-Resistant Transgenic Crops
const NODE_323 = 'c11_bt_cbse_323'; // Virus-Resistant Transgenic Plants
const NODE_324 = 'c11_bt_cbse_324'; // Herbicide-Resistant and Quality-Improved Transgenic Crops
const NODE_325 = 'c11_bt_cbse_325'; // Abiotic Stress Resistance in Crop Plants
const NODE_326 = 'c11_bt_cbse_326'; // Plant Tissue Culture and Clonal Propagation
const NODE_327 = 'c11_bt_cbse_327'; // Transgenic Plants as Bioreactors for Therapeutic Production
const NODE_328 = 'c11_bt_cbse_328'; // Industrial (White) Biotechnology
const NODE_329 = 'c11_bt_cbse_329'; // Applications of Biotechnology in Food Processing
const NODE_330 = 'c11_bt_cbse_330'; // Biofuels: Types and Production
const NODE_331 = 'c11_bt_cbse_331'; // Environmental Biotechnology: Definition and Scope
const NODE_332 = 'c11_bt_cbse_332'; // Bioremediation and Biosensors
const NODE_333 = 'c11_bt_cbse_333'; // Phytoremediation and Heavy Metal Removal
const NODE_334 = 'c11_bt_cbse_334'; // Biomarkers and Eco-Toxicological Monitoring
const NODE_335 = 'c11_bt_cbse_335'; // Department of Biotechnology (DBT) and Its Institutes
const NODE_336 = 'c11_bt_cbse_336'; // Indian Biotechnology Industry: Biopharma and Vaccines
const NODE_337 = 'c11_bt_cbse_337'; // Indian Biotechnology Achievements: Therapeutics and Agriculture
const NODE_338 = 'c11_bt_cbse_338'; // Indian Biotechnology Industry: Segments and Bio-Services
const NODE_339 = 'c11_bt_cbse_339'; // Key Biopharmaceutical Companies in India
const NODE_340 = 'c11_bt_cbse_340'; // Biotechnology Parks and Research Infrastructure in India
const NODE_341 = 'c11_bt_cbse_341'; // Bioinformatics in Biotechnology

const ALL_NODE_IDS = [
  NODE_288, NODE_289, NODE_290, NODE_291, NODE_292, NODE_293, NODE_294, NODE_295, NODE_296, NODE_297,
  NODE_298, NODE_299, NODE_300, NODE_301, NODE_302, NODE_303, NODE_304, NODE_305, NODE_306, NODE_307,
  NODE_308, NODE_309, NODE_310, NODE_311, NODE_312, NODE_313, NODE_314, NODE_315, NODE_316, NODE_317,
  NODE_318, NODE_319, NODE_320, NODE_321, NODE_322, NODE_323, NODE_324, NODE_325, NODE_326, NODE_327,
  NODE_328, NODE_329, NODE_330, NODE_331, NODE_332, NODE_333, NODE_334, NODE_335, NODE_336, NODE_337,
  NODE_338, NODE_339, NODE_340, NODE_341,
];

// ==========================================
// 2. MANDATORY DATA STRUCTURES
// ==========================================
const SCENARIO = {
  title: 'National Centre for Advanced Biotechnology & Bioprocess Engineering',
  intro: 'Welcome to the Premier Biotechnology Simulation Laboratory. You are appointed as Lead Bio-engineer managing cross-disciplinary projects ranging from genetic engineering of human insulin and Bt cotton to industrial bioreactors and bioremediation.',
  context: 'In this simulation, you will operate state-of-the-art fermenters, cut and splice recombinant DNA plasmids, test plant tissue cultures, navigate color-coded biotech domains, and solve complex biological engineering challenges.',
};

const DISCOVERY_QUESTION = {
  question: 'In 1897, Eduard Buchner demonstrated fermentation using yeast extract completely free of living yeast cells. Why was this cell-free discovery considered a monumental paradigm shift in biotechnology?',
  options: [
    'It proved that fermentation requires living cells with intact cell membranes.',
    'It proved that fermentation is driven by biological catalysts (enzymes) that can function independently of intact living cells.',
    'It showed that yeast cells produce inorganic catalysts that do not decay.',
    'It demonstrated that DNA synthesis can happen in dead yeast cells.',
  ],
  correctIndex: 1,
  hintAfter: 'Buchner proved biological reactions are catalyzed by molecules (enzymes) rather than requiring a mystical "vital force" present only in living intact organisms.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Industrial Bioreactor Optimization',
    instruction: 'Adjust vessel temperature, pH, dissolved oxygen, and stirrer speed to maximize recombinant protein production in a 1000L fermenter.',
    interactionType: 'bioreactor-controls',
    nodeId: NODE_294,
  },
  {
    title: 'Lab 2: Recombinant DNA Plasmid Construction',
    instruction: 'Select restriction enzymes (EcoRI, BamHI) to snip double-stranded plasmid vector DNA and insert the human insulin gene with T4 DNA Ligase.',
    interactionType: 'rdna-builder',
    nodeId: NODE_309,
  },
  {
    title: 'Lab 3: Color-Coded Biotech & Indian Innovation Spectrum',
    instruction: 'Explore Red, White, Green, Blue, Grey, and Gold biotechnology domains, along with India’s DBT research institutes (CCMB, NII, Biocon, Serum Institute).',
    interactionType: 'color-code-explorer',
    nodeId: NODE_312,
  },
  {
    title: 'Lab 4: Micropropagation & Bt Transgenic Plant Tissue Culture',
    instruction: 'Culture explants in MS medium with Auxin and Cytokinin balance to generate transgenic Bt cotton plantlets resistant to bollworm pests.',
    interactionType: 'tissue-culture-lab',
    nodeId: NODE_326,
  },
  {
    title: 'Lab 5: Environmental Bioremediation & Biofuel Fermentation',
    instruction: 'Deploy hyper-accumulating plants and engineered microbes (Pseudomonas putida) to degrade hydrocarbon oil spills and generate bio-ethanol.',
    interactionType: 'bioremediation-sim',
    nodeId: NODE_332,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens to recombinant E. coli protein yield inside a bioreactor if the impeller stirring speed is reduced to zero while keeping oxygen flow high?',
    options: [
      'Yield increases because cells remain undisturbed.',
      'Yield drops drastically because gas-liquid mass transfer fails and cells settle to the bottom in anoxic zones.',
      'Yield stays constant because oxygen gas diffuses rapidly through un-agitated water.',
      'Cells mutate rapidly into virus-resistant strains.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Stirrer Speed to 0 RPM in Lab 1 and observe the Dissolved Oxygen diffusion profile and cell density curve.',
    nodeId: NODE_294,
  },
  {
    question: 'Predict: If an explant in Plant Tissue Culture is grown on MS Medium with a HIGH Auxin to Cytokinin ratio (100:1), what organ development will be stimulated?',
    options: [
      'Shoots only (Caulogenesis)',
      'Roots only (Rhizogenesis)',
      'Balanced shoot and root formation simultaneously',
      'Flower blooming immediately',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Auxin/Cytokinin slider in Lab 4 to 10:1 ratio and observe callus differentiation.',
    nodeId: NODE_326,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When restriction enzyme EcoRI cuts DNA at 5\'-G^AATTC-3\', what structural motif is created at the DNA ends?',
    observableOptions: [
      'Blunt ends with paired bases',
      'Single-stranded complementary overhangs ("Sticky ends")',
      'Circularized single-strand loops',
      'Triple helix hydrogen bonds',
    ],
    correctIndex: 1,
    nodeId: NODE_310,
  },
  {
    question: 'Observation: In the biosensor detection system for heavy metals (e.g. Lead/Cadmium), how does signal intensity respond to pollutant concentration?',
    observableOptions: [
      'Fluoresces inversely proportional to metal ion concentration.',
      'Generates electrical or optical signal directly proportional to heavy metal concentration.',
      'Stays constant regardless of heavy metal presence.',
      'Causes immediate precipitation of enzymes without output signal.',
    ],
    correctIndex: 1,
    nodeId: NODE_332,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Biomanufacturing Scale-Up of Recombinant Human Insulin (Humulin)',
  description: 'In 1982, Genentech and Eli Lilly commercialized the first recombinant biopharmaceutical (Humulin). Perform a industrial scale-up calculation to design a 5,000-Liter fermenter batch.',
  steps: [
    'Step 1: Inoculate 5,000 L of fermentation broth with engineered E. coli carrying the synthetic A and B chain gene plasmids.',
    'Step 2: Maintain constant dissolved oxygen at 30% saturation, temperature at 37°C, and pH at 7.0 for 24 hours of exponential growth.',
    'Step 3: Calculate total wet cell mass produced at cell density of 80 g/L: 5,000 L × 80 g/L = 400 kg wet biomass.',
    'Step 4: If recombinant insulin yield is 5% of cell biomass, calculate pure insulin yield: 400 kg × 0.05 = 20 kg (20,000 grams / ~500,000 doses of 40 IU).',
  ],
};

// ==========================================
// 3. MISCONCEPTIONS & DIAGNOSTIC QUESTIONS
// ==========================================
interface Misconception {
  id: string;
  topic: string;
  misconception: string;
  correction: string;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    topic: 'Term Biotechnology Origin',
    misconception: 'Biotechnology is a 21st-century discipline invented after the discovery of DNA recombinant technology.',
    correction: 'The term "Biotechnology" was coined in 1919 by Hungarian engineer Karl Ereky. Furthermore, ancient biotechnology (fermentation for curd, bread, wine) dates back over 10,000 years.',
  },
  {
    id: 'misc_2',
    topic: 'Fermentation Science',
    misconception: 'Fermentation can only occur when intact, living yeast or bacterial cells are actively growing.',
    correction: 'Eduard Buchner proved in 1897 that cell-free extracts (zymase/enzymes) can ferment sugar into ethanol without living cells.',
  },
  {
    id: 'misc_3',
    topic: 'Restriction Enzymes',
    misconception: 'Restriction enzymes cut DNA randomly at any arbitrary sequence location.',
    correction: 'Restriction endonucleases recognize specific palindromic recognition sequences (e.g., GAATTC for EcoRI) and cleave precisely at specific phosphodiester bonds.',
  },
  {
    id: 'misc_4',
    topic: 'Plant Tissue Culture',
    misconception: 'Any plant cell grown in nutrient media automatically forms leaves and stems first.',
    correction: 'Plant morphogenetic response depends strictly on the Auxin:Cytokinin ratio. High Auxin favors roots (rhizogenesis), while high Cytokinin favors shoots (caulogenesis). An unorganized cell mass is called a callus.',
  },
  {
    id: 'misc_5',
    topic: 'Color Classification',
    misconception: 'Red Biotechnology refers to environmental cleanup and Green Biotechnology refers to medical drugs.',
    correction: 'Red Biotechnology focuses on Health & Medicine (pharmaceuticals/vaccines). Green Biotechnology is Agricultural (crop resistance, tissue culture). White is Industrial, Blue is Marine, Grey is Environmental.',
  },
  {
    id: 'misc_6',
    topic: 'Bt Cotton Mechanisms',
    misconception: 'Bt toxin from Bacillus thuringiensis kills all insects and harms human consumers who wear or touch cotton.',
    correction: 'Cry proteins are inactive protoxins requiring alkaline pH in the lepidopteran insect midgut to solubilize and activate. Human gut is acidic (pH 1.5-2.0), making Cry protein harmless to humans.',
  },
];

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nodeId: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'Who coined the term "Biotechnology" in 1919 to describe large-scale integrated production of pigs using sugar beet feed?',
    options: ['Louis Pasteur', 'Karl Ereky', 'Alexander Fleming', 'Gregor Mendel'],
    correctIndex: 1,
    explanation: 'Karl Ereky, a Hungarian agricultural engineer, coined "Biotechnology" in 1919.',
    nodeId: NODE_295,
  },
  {
    id: 'diag_2',
    question: 'Which enzyme is known as "molecular glue" because it joins DNA fragments by catalyzing phosphodiester bonds?',
    options: ['DNA Polymerase', 'EcoRI', 'DNA Ligase', 'Helicase'],
    correctIndex: 2,
    explanation: 'DNA Ligase seals single-stranded nicks by forming covalent phosphodiester bonds between adjacent 3\'-OH and 5\'-phosphate ends.',
    nodeId: NODE_310,
  },
  {
    id: 'diag_3',
    question: 'Which Department of Biotechnology (DBT) institute located in Hyderabad is renowned for cellular and molecular biology research?',
    options: ['NII New Delhi', 'CCMB Hyderabad', 'NCBS Bengaluru', 'NABI Mohali'],
    correctIndex: 1,
    explanation: 'CCMB (Centre for Cellular and Molecular Biology) in Hyderabad is a premier DBT/CSIR institute.',
    nodeId: NODE_335,
  },
  {
    id: 'diag_4',
    question: 'What type of biotechnology is designated by the color "White"?',
    options: ['Medical & Pharmaceutical', 'Marine & Aquatic', 'Industrial & Bioprocess', 'Agricultural & Forestry'],
    correctIndex: 2,
    explanation: 'White Biotechnology represents Industrial Biotechnology (enzymes, bioplastics, bioenergy).',
    nodeId: NODE_312,
  },
  {
    id: 'diag_5',
    question: 'Which strain of bacteria is commonly referred to as "Superbug" engineered by Ananda Chakraborty for oil spill bioremediation?',
    options: ['Escherichia coli', 'Bacillus thuringiensis', 'Pseudomonas putida', 'Agrobacterium tumefaciens'],
    correctIndex: 2,
    explanation: 'Pseudomonas putida was genetically engineered by Dr. Ananda Chakraborty to digest crude oil hydrocarbons.',
    nodeId: NODE_332,
  },
  {
    id: 'diag_6',
    question: 'What is the natural natural genetic engineer used to transfer foreign T-DNA into dicotyledonous plant genomes?',
    options: ['Escherichia coli', 'Agrobacterium tumefaciens', 'Saccharomyces cerevisiae', 'Thermus aquaticus'],
    correctIndex: 1,
    explanation: 'Agrobacterium tumefaciens contains Ti plasmid which naturally transfers T-DNA into plant cells.',
    nodeId: NODE_321,
  },
  {
    id: 'diag_7',
    question: 'What critical parameter in a bioreactor is measured by a Clark-type polarographic electrode?',
    options: ['pH level', 'Dissolved Oxygen (DO)', 'Impeller torque', 'Substrate glucose concentration'],
    correctIndex: 1,
    explanation: 'Dissolved oxygen probes (Clark electrodes) monitor DO levels in aerobic industrial bioreactors.',
    nodeId: NODE_294,
  },
  {
    id: 'diag_8',
    question: 'Which traditional Indian fermentation product made from milk utilizes lactic acid bacteria (LAB)?',
    options: ['Idli batter', 'Curd (Dahi)', 'Soma juice', 'Kanji'],
    correctIndex: 1,
    explanation: 'Curd (Dahi) is produced by lactic acid bacteria converting lactose to lactic acid.',
    nodeId: NODE_296,
  },
];

// ==========================================
// 4. 22+ CHALLENGES (Foundation, Standard, Advanced)
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'matching' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'ch_1',
    nodeId: NODE_288,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'According to the European Federation of Biotechnology (EFB), biotechnology is the integration of natural science and organisms, cells, parts thereof, and molecular analogues for:',
    options: [
      'Pure theoretical mathematical modeling',
      'Products and services',
      'Chemical synthesis without biological agents',
      'Geological fossil dating',
    ],
    correctIndex: 1,
    explanation: 'EFB defines biotechnology as the integrated application of biochemistry, microbiology, and engineering sciences to achieve technological application of organisms or cells for products and services.',
    hints: ['Think about what biotech creates for human welfare.', 'Focus on products and services.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_2',
    nodeId: NODE_290,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following processes is classified under Ancient Biotechnology?',
    options: [
      'CRISPR-Cas9 gene editing',
      'Production of curd, wine, and bread using natural microbes',
      'Monoclonal antibody manufacturing',
      'Recombinant human growth hormone production',
    ],
    correctIndex: 1,
    explanation: 'Ancient biotechnology relies on traditional empirical fermentation processes practiced since antiquity without knowledge of DNA or genetic engineering.',
    hints: ['Look for traditional food production methods.', 'Curd and bread date back thousands of years.'],
  },
  {
    id: 'ch_3',
    nodeId: NODE_293,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Louis Pasteur disproved the theory of spontaneous generation and demonstrated that fermentation is caused by:',
    options: [
      'Chemical oxidation of air',
      'Specific living microorganisms (germ theory of fermentation)',
      'Subatomic nuclear decay',
      'Thermal expansion of liquids',
    ],
    correctIndex: 1,
    explanation: 'Pasteur proved that distinct microorganisms cause specific fermentations (e.g., yeast produces ethanol, lactobacilli produce lactic acid).',
    hints: ['Pasteur connected micro-organisms to fermentation.', 'Think of micro-organisms as living agents.'],
  },
  {
    id: 'ch_4',
    nodeId: NODE_312,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Match the Biotech Color Code: What color code represents Agricultural Biotechnology?',
    options: ['Red', 'Green', 'White', 'Blue'],
    correctIndex: 1,
    explanation: 'Green Biotechnology applies to agricultural processes, crop improvement, transgenic plants, and plant tissue culture.',
    hints: ['Plants are green.', 'Agricultural biotech = Green.'],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_5',
    nodeId: NODE_306,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Who proposed the double-helix structural model of DNA in 1953 based on X-ray diffraction data by Rosalind Franklin and Maurice Wilkins?',
    options: [
      'Jacob and Monod',
      'Watson and Crick',
      'Avery, MacLeod, and McCarty',
      'Cohen and Boyer',
    ],
    correctIndex: 1,
    explanation: 'James Watson and Francis Crick published the iconic anti-parallel double-stranded DNA helical model in 1953.',
    hints: ['Famous duo Watson and ...', 'Double helix structure.'],
  },
  {
    id: 'ch_6',
    nodeId: NODE_310,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the specific type of bond that DNA Ligase forms between the 3\'-hydroxyl end and 5\'-phosphate end of adjacent nucleotides?',
    options: ['Hydrogen bond', 'Glycosidic bond', 'Phosphodiester bond', 'Peptide bond'],
    correctIndex: 2,
    explanation: 'DNA ligase catalyzes the covalent phosphodiester bond linking the sugar-phosphate backbone of DNA.',
    hints: ['Backbone of nucleic acids contains phosphate.', 'Phospho-diester linkage.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_7',
    nodeId: NODE_335,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In India, which apex government body established in 1986 oversees biotechnology development, funding, and policy guidelines?',
    options: [
      'ISRO',
      'DBT (Department of Biotechnology)',
      'ICAR',
      'DRDO',
    ],
    correctIndex: 1,
    explanation: 'The Department of Biotechnology (DBT), under the Ministry of Science and Technology, promotes biotechnology in India.',
    hints: ['Department of ...', 'DBT under Ministry of Science & Tech.'],
  },

  // --- STANDARD (8) ---
  {
    id: 'ch_8',
    nodeId: NODE_294,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A bioreactor culture volume is 2000 Liters. If the target cell biomass density is 50 grams per Liter, how many total KILOGRAMS (kg) of wet cell biomass are produced at harvest?',
    correctAnswer: 100,
    explanation: 'Total biomass = Volume × Density = 2000 L × 50 g/L = 100,000 g = 100 kg.',
    hints: ['Multiply volume by density.', 'Convert 100,000 grams to kilograms.'],
  },
  {
    id: 'ch_9',
    nodeId: NODE_309,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In 1973, Stanley Cohen and Herbert Boyer constructed the first artificial recombinant DNA molecule. What key components did they join together?',
    options: [
      'Human insulin gene with viral RNA',
      'Antibiotic-resistance gene plasmid with another plasmid vector using restriction enzyme and ligase',
      'Plant chloroplast DNA with animal mitochondrial DNA',
      'Synthetic amino acids with ribosomal tRNA',
    ],
    correctIndex: 1,
    explanation: 'Cohen & Boyer isolated an antibiotic-resistant gene plasmid from Salmonella typhimurium and linked it into an E. coli plasmid.',
    hints: ['They worked with plasmid DNA carrying antibiotic resistance.', 'Used restriction enzymes and ligase.'],
  },
  {
    id: 'ch_10',
    nodeId: NODE_316,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why did early biopharmaceutical production of human insulin in E. coli require synthesizing Chain A and Chain B in separate bacterial cultures?',
    options: [
      'E. coli cannot transcribe eukaryotic DNA at all.',
      'Proinsulin requires complex post-translational disulfide cleavage which E. coli lacked; joining synthetic chains A and B in vitro solved this.',
      'Chain A is toxic to bacterial ribosomes.',
      'Chain B degrades DNA ligase enzyme.',
    ],
    correctIndex: 1,
    explanation: 'Bacteria lack enzymatic machinery to excise the C-peptide from proinsulin. Eli Lilly synthesized A and B chains separately and combined them in vitro.',
    hints: ['Bacteria cannot perform post-translational processing like C-peptide cleavage.', 'A and B chains were united chemically.'],
  },
  {
    id: 'ch_11',
    nodeId: NODE_322,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How does the Bt toxin (Cry protein) produced by Bt cotton specifically kill targeted insect pests like bollworms without harming mammals?',
    options: [
      'Cry toxin degrades mammalian skin collagen on contact.',
      'In alkaline insect midgut, protoxin solubilizes, gets cleaved into active toxin, binds midgut epithelial receptors, creating pores that cause cell lysis.',
      'It interferes with mammalian nerve transmission in the brain.',
      'It causes hyper-acidity in the stomach of birds and mammals.',
    ],
    correctIndex: 1,
    explanation: 'Cry protoxin requires alkaline pH (insect midgut) to become active. Mammals have acidic stomach pH and lack specific surface receptors.',
    hints: ['Think of midgut pH in insects.', 'Alkaline pH activates Cry protein, binding gut receptors.'],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_12',
    nodeId: NODE_326,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'An unorganized mass of parenchyma cells formed during plant tissue culture is known as a callus. Which plant hormone balance promotes callus initiation?',
    options: [
      'Gibberellin alone',
      'Absisic acid at high concentration',
      'Equimolar ratio of Auxin and Cytokinin',
      'Ethylene gas only',
    ],
    correctIndex: 2,
    explanation: 'A balanced ratio of auxin and cytokinin induces cell division without organ differentiation, producing an unorganized callus.',
    hints: ['Equal concentration of auxin and cytokinin.', 'Prevents immediate root or shoot formation.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_13',
    nodeId: NODE_330,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which generation of biofuels is produced directly from non-food lignocellulosic biomass, agricultural waste, and dedicated energy crops?',
    options: ['First Generation', 'Second Generation', 'Third Generation (Algae)', 'Fourth Generation (Synthetic Biology)'],
    correctIndex: 1,
    explanation: '2nd generation biofuels utilize non-edible plant biomass (bagasse, straw, wood waste) to avoid food-versus-fuel conflict.',
    hints: ['1st gen uses edible crops like sugarcane/corn.', '2nd gen uses crop residue and lignocellulose.'],
  },
  {
    id: 'ch_14',
    nodeId: NODE_336,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Recall',
    question: 'Which major Indian biopharmaceutical company located in Pune is the world\'s largest vaccine manufacturer by volume?',
    options: ['Biocon', 'Serum Institute of India (SII)', 'Dr. Reddy\'s Laboratories', 'Bharat Biotech'],
    correctIndex: 1,
    explanation: 'Serum Institute of India (SII) in Pune is the world\'s largest vaccine producer by doses produced.',
    hints: ['Located in Pune.', 'Produced Covishield and millions of pediatric vaccines.'],
  },
  {
    id: 'ch_15',
    nodeId: NODE_341,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What core bioinformatics tool developed by NCBI is used to compare a queried nucleotide or protein sequence against global sequence databases?',
    options: ['CRISPR-Cas', 'BLAST (Basic Local Alignment Search Tool)', 'Southern Blotting', 'HPLC'],
    correctIndex: 1,
    explanation: 'BLAST is the primary computational algorithm used to find regions of local similarity between biological sequences.',
    hints: ['Stands for Basic Local Alignment Search Tool.', 'BLAST search.'],
  },

  // --- ADVANCED (7) ---
  {
    id: 'ch_16',
    nodeId: NODE_302,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Eduard Buchner\'s 1897 experiment extracted zymase from yeast and demonstrated sugar fermentation to alcohol in cell-free filtrate. What fundamental dogma did this experiment demolish?',
    options: [
      'The Central Dogma of Molecular Biology',
      'Vitalism (the belief that biological chemical reactions strictly require the intact "vital force" of living cells)',
      'The Theory of Natural Selection',
      'Mendel\'s Law of Independent Assortment',
    ],
    correctIndex: 1,
    explanation: 'Buchner demolished Vitalism by proving biological reactions are driven by chemical enzymes that can act independently outside living cells.',
    hints: ['Vitalism claimed living forces were necessary for biochemistry.', 'Enzymes operate outside intact cells.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_17',
    nodeId: NODE_310,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'EcoRI cuts DNA at 5\'-G^AATTC-3\'. If a linear 5000 base-pair plasmid has TWO EcoRI restriction sites located at position 1000 bp and position 3500 bp, how many fragments and of what sizes are produced upon complete digestion?',
    options: [
      '1 fragment of 5000 bp',
      '2 fragments: 2500 bp and 2500 bp',
      '2 fragments: 2500 bp and 2500 bp (Wait: 3500-1000=2500, remaining is 5000-2500=2500)',
      '3 fragments: 1000 bp, 2500 bp, and 1500 bp',
    ],
    correctIndex: 2,
    explanation: 'For a circular plasmid it would be 2 fragments (2500 bp & 2500 bp), but for a linear DNA with cuts at 1000 and 3500: Fragment 1 (0-1000 bp = 1000 bp), Fragment 2 (1000-3500 bp = 2500 bp), Fragment 3 (3500-5000 bp = 1500 bp). Thus 3 fragments: 1000 bp, 2500 bp, 1500 bp!',
    hints: ['Linear DNA has ends at 0 and 5000 bp.', 'Cuts at 1000 and 3500 yield 3 pieces: (0 to 1000), (1000 to 3500), (3500 to 5000).'],
  },
  {
    id: 'ch_18',
    nodeId: NODE_319,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In 1990, the first clinical gene therapy trial was successfully performed on a 4-year-old girl suffering from SCID (Severe Combined Immunodeficiency). What enzyme gene was delivered into her T-lymphocytes?',
    options: [
      'Taq Polymerase',
      'Adenosine Deaminase (ADA)',
      'Beta-galactosidase',
      'Reverse Transcriptase',
    ],
    correctIndex: 1,
    explanation: 'ADA-SCID is caused by deficiency of Adenosine Deaminase. Functional ADA cDNA was inserted using a retroviral vector.',
    hints: ['Deficiency causes accumulation of toxic dATP in lymphocytes.', 'ADA enzyme.'],
  },
  {
    id: 'ch_19',
    nodeId: NODE_333,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Heavy metal soil contamination can be remediated using hyperaccumulating plants like Brassica juncea. What specific mechanism involves plant roots absorbing metals and accumulating them in above-ground harvestable shoots?',
    options: ['Phytoextraction', 'Phytodegradation', 'Phytovolatilization', 'Rhizofiltration'],
    correctIndex: 0,
    explanation: 'Phytoextraction relies on roots absorbing toxic heavy metals (e.g. Lead, Cadmium, Nickel) and translocating them into harvestable plant stems and leaves.',
    hints: ['Roots extract and translocate metals into shoots.', 'Phyto-extraction.'],
  },
  {
    id: 'ch_20',
    nodeId: NODE_327,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Molecular farming uses transgenic plants as bioreactors to express human antibodies and vaccines. What is a major advantage of plant molecular farming over mammalian cell culture systems?',
    options: [
      'Plants take only 2 hours to mature fully.',
      'Extremely high scalability, low cost, and zero risk of human viral pathogen contamination',
      'Plants do not require photosynthesis or light',
      'Proteins synthesized in plants never require purification',
    ],
    correctIndex: 1,
    explanation: 'Plant systems eliminate contamination risks from human mammalian pathogens (like HIV, Hepatitis) and allow agricultural scale biomanufacturing.',
    hints: ['Think of safety against human viruses.', 'Scalable agricultural greenhouse growth.'],
  },
  {
    id: 'ch_21',
    nodeId: NODE_339,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Biocon, founded by Kiran Mazumdar-Shaw in Bengaluru, initially started in 1978 as an enzyme manufacturing joint venture before evolving into:',
    options: [
      'A chemical pesticide manufacturer',
      'India\'s leading fully integrated biopharmaceutical enterprise producing recombinant insulins and monoclonal antibodies',
      'A synthetic textile fiber refinery',
      'A pet food processing laboratory',
    ],
    correctIndex: 1,
    explanation: 'Biocon grew from industrial enzyme production into a global biopharmaceutical leader in biosimilar insulins and biologics.',
    hints: ['Founded by Kiran Mazumdar-Shaw.', 'Focuses on biopharmaceuticals and biosimilars.'],
  },
  {
    id: 'ch_22',
    nodeId: NODE_304,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Avery, MacLeod, and McCarty (1944) expanded Griffith\'s transformation experiment. Which specific enzyme treatment completely destroyed the transforming principle, proving DNA is the genetic material?',
    options: ['Protease', 'RNase', 'DNase', 'Lipase'],
    correctIndex: 2,
    explanation: 'DNase enzyme treatment destroyed the transforming ability of heat-killed S-strain extract, demonstrating DNA is the genetic molecule.',
    hints: ['Enzyme that digests deoxyribonucleic acid.', 'DNase.'],
  },
];

// ==========================================
// 5. SVG DIAGRAM COMPONENTS
// ==========================================

// Bioreactor Vessel SVG
const BioreactorSVG: React.FC<{ temp: number; pH: number; rpm: number; oxygen: number }> = ({ temp, pH, rpm, oxygen }) => {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-64 bg-slate-900 rounded-xl shadow-inner border border-slate-800">
      <defs>
        <linearGradient id="vesselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="30%" stopColor="#334155" />
          <stop offset="70%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="brothGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Main Tank Body */}
      <rect x="120" y="60" width="160" height="210" rx="30" fill="url(#vesselGrad)" stroke="#475569" strokeWidth="3" />
      
      {/* Broth Liquid */}
      <rect x="126" y="110" width="148" height="150" rx="15" fill="url(#brothGrad)" />

      {/* Dynamic Impeller Shaft */}
      <line x1="200" y1="30" x2="200" y2="230" stroke="#cbd5e1" strokeWidth="4" />
      {/* Motor on Top */}
      <rect x="175" y="15" width="50" height="25" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
      <text x="200" y="32" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">MOTOR</text>

      {/* Impeller Blades with rotation feel */}
      <g transform={`translate(200, 180)`}>
        <ellipse cx="0" cy="0" rx={rpm > 0 ? 50 : 40} ry="8" fill="#e2e8f0" opacity="0.8" />
        <rect x="-40" y="-4" width="80" height="8" fill="#3b82f6" rx="2" />
      </g>
      <g transform={`translate(200, 230)`}>
        <ellipse cx="0" cy="0" rx={rpm > 0 ? 45 : 35} ry="6" fill="#e2e8f0" opacity="0.8" />
        <rect x="-35" y="-3" width="70" height="6" fill="#3b82f6" rx="2" />
      </g>

      {/* Sparger Oxygen Bubbles */}
      <path d="M 140 250 L 260 250" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4,4" />
      {oxygen > 10 && (
        <g fill="#7dd3fc" opacity="0.7">
          <circle cx="150" cy="220" r="3" />
          <circle cx="170" cy="190" r="4" />
          <circle cx="210" cy="210" r="3" />
          <circle cx="230" cy="170" r="5" />
          <circle cx="250" cy="230" r="3" />
          <circle cx="180" cy="140" r="4" />
        </g>
      )}

      {/* Probes */}
      {/* pH Probe */}
      <path d="M 100 130 L 140 140" stroke="#f59e0b" strokeWidth="3" />
      <circle cx="100" cy="130" r="6" fill="#f59e0b" />
      <text x="75" y="134" fill="#fbbf24" fontSize="10" fontWeight="bold">pH Probe</text>

      {/* Temp Probe */}
      <path d="M 300 130 L 260 140" stroke="#ef4444" strokeWidth="3" />
      <circle cx="300" cy="130" r="6" fill="#ef4444" />
      <text x="306" y="134" fill="#f87171" fontSize="10" fontWeight="bold">Temp Probe</text>

      {/* DO Probe */}
      <path d="M 300 180 L 260 190" stroke="#06b6d4" strokeWidth="3" />
      <circle cx="300" cy="180" r="6" fill="#06b6d4" />
      <text x="306" y="184" fill="#67e8f9" fontSize="10" fontWeight="bold">DO Probe</text>

      {/* Live Parameter Telemetry Banner */}
      <rect x="10" y="275" width="380" height="35" rx="6" fill="#0f172a" stroke="#334155" />
      <text x="30" y="297" fill="#38bdf8" fontSize="11" fontWeight="bold">Temp: {temp}°C</text>
      <text x="130" y="297" fill="#fbbf24" fontSize="11" fontWeight="bold">pH: {pH.toFixed(1)}</text>
      <text x="220" y="297" fill="#a855f7" fontSize="11" fontWeight="bold">Agitation: {rpm} RPM</text>
      <text x="320" y="297" fill="#22c55e" fontSize="11" fontWeight="bold">DO: {oxygen}%</text>
    </svg>
  );
};

// Recombinant DNA Plasmid Construction SVG
const PlasmidSVG: React.FC<{ cutState: boolean; inserted: boolean; enzyme: string }> = ({ cutState, inserted, enzyme }) => {
  return (
    <svg viewBox="0 0 380 260" className="w-full h-56 bg-slate-900 rounded-xl shadow-inner border border-slate-800">
      <defs>
        <radialGradient id="plasmidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="190" cy="130" r="100" fill="url(#plasmidGlow)" />

      {!cutState && !inserted && (
        <g>
          {/* Intact Double Stranded Circular Plasmid */}
          <circle cx="190" cy="130" r="75" fill="none" stroke="#3b82f6" strokeWidth="12" />
          <circle cx="190" cy="130" r="85" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4,4" />
          <circle cx="190" cy="130" r="65" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="4,4" />
          
          {/* Ampicillin Resistance Gene Marker */}
          <path d="M 115 130 A 75 75 0 0 1 190 55" fill="none" stroke="#10b981" strokeWidth="14" />
          <text x="140" y="80" fill="#ecfdf5" fontSize="10" fontWeight="bold">AmpR Gene</text>
          
          {/* Origin of Replication */}
          <circle cx="190" cy="205" r="8" fill="#f59e0b" />
          <text x="190" y="225" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">ori</text>
          <text x="190" y="130" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">pBR322 Plasmid Vector</text>
        </g>
      )}

      {cutState && !inserted && (
        <g>
          {/* Cut Plasmid with Sticky Ends */}
          <path d="M 160 57 A 75 75 0 1 0 220 57" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />
          
          {/* EcoRI Cleavage site indicator */}
          <path d="M 155 57 L 160 45 M 225 57 L 220 45" stroke="#f87171" strokeWidth="3" />
          <text x="190" y="35" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Cut by {enzyme} (Sticky Ends Exposed)</text>
          <text x="190" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10">5'-AATTC... 3'</text>
          
          {/* AmpR marker still intact */}
          <circle cx="190" cy="205" r="8" fill="#f59e0b" />
          <text x="190" y="225" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">ori</text>
        </g>
      )}

      {inserted && (
        <g>
          {/* Recombinant Plasmid with Inserted Foreign Gene */}
          <circle cx="190" cy="130" r="75" fill="none" stroke="#3b82f6" strokeWidth="12" />
          
          {/* Inserted Human Insulin Insert (Red/Pink segment) */}
          <path d="M 155 58 A 75 75 0 0 1 225 58" fill="none" stroke="#ec4899" strokeWidth="16" />
          <text x="190" y="42" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">Human Insulin Gene Insert</text>
          
          {/* Ligase Junctions */}
          <circle cx="155" cy="58" r="4" fill="#a855f7" />
          <circle cx="225" cy="58" r="4" fill="#a855f7" />
          
          <text x="190" y="130" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Recombinant rDNA Plasmid</text>
          <text x="190" y="150" textAnchor="middle" fill="#cbd5e1" fontSize="10">(T4 DNA Ligase Sealed)</text>
        </g>
      )}
    </svg>
  );
};

// Biotech Color Spectrum Diagram
const BiotechColorSpectrumSVG: React.FC<{ activeColor: string }> = ({ activeColor }) => {
  const domains = [
    { color: 'Red', hex: '#ef4444', label: 'Medicine & Pharma', sub: 'Insulin, Vaccines, Gene Therapy' },
    { color: 'Green', hex: '#22c55e', label: 'Agriculture & Plants', sub: 'Bt Cotton, Tissue Culture, GMOs' },
    { color: 'White', hex: '#f8fafc', stroke: '#cbd5e1', label: 'Industrial & Bioprocess', sub: 'Enzymes, Bio-ethanol, Bioplastics' },
    { color: 'Blue', hex: '#06b6d4', label: 'Marine & Aquatic', sub: 'Algal biofuels, Marine enzymes' },
    { color: 'Grey', hex: '#64748b', label: 'Environmental', sub: 'Bioremediation, Biosensors' },
    { color: 'Gold', hex: '#eab308', label: 'Bioinformatics', sub: 'Genomics, BLAST, Data mining' },
  ];

  return (
    <svg viewBox="0 0 450 200" className="w-full h-52 bg-slate-900 rounded-xl border border-slate-800 p-2">
      <text x="225" y="20" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">
        Biotechnology Classification Spectrum (Color Codes)
      </text>
      <g transform="translate(10, 35)">
        {domains.map((d, idx) => {
          const isSelected = activeColor === d.color;
          const xPos = (idx % 3) * 145;
          const yPos = Math.floor(idx / 3) * 75;
          return (
            <g key={d.color} transform={`translate(${xPos}, ${yPos})`}>
              <rect
                x="5"
                y="5"
                width="135"
                height="65"
                rx="8"
                fill={isSelected ? '#1e293b' : '#0f172a'}
                stroke={isSelected ? d.hex : '#334155'}
                strokeWidth={isSelected ? 3 : 1}
              />
              <circle cx="25" cy="25" r="10" fill={d.hex} stroke={d.stroke || 'none'} strokeWidth="2" />
              <text x="42" y="29" fill="#f8fafc" fontSize="11" fontWeight="bold">{d.color} Biotech</text>
              <text x="12" y="52" fill="#94a3b8" fontSize="9">{d.label}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// Plant Tissue Culture SVG
const TissueCultureSVG: React.FC<{ stage: number; auxinRatio: number }> = ({ stage, auxinRatio }) => {
  return (
    <svg viewBox="0 0 360 220" className="w-full h-52 bg-slate-900 rounded-xl border border-slate-800">
      {/* Test Tube / Vessel */}
      <path d="M 130 30 L 130 180 A 30 30 0 0 0 190 180 L 190 30 Z" fill="none" stroke="#94a3b8" strokeWidth="3" />
      {/* MS Agar Medium */}
      <path d="M 132 120 L 132 180 A 28 28 0 0 0 188 180 L 188 120 Z" fill="#38bdf8" opacity="0.3" />
      <line x1="132" y1="120" x2="188" y2="120" stroke="#7dd3fc" strokeWidth="2" />
      <text x="160" y="145" textAnchor="middle" fill="#38bdf8" fontSize="9">MS Nutrient Medium</text>

      {/* Explant / Growth based on auxin ratio & stage */}
      {stage === 1 && (
        <g>
          {/* Leaf Explant */}
          <path d="M 160 115 Q 170 100 160 90 Q 150 100 160 115" fill="#22c55e" stroke="#15803d" />
          <text x="210" y="100" fill="#4ade80" fontSize="10">Sterilized Leaf Explant</text>
        </g>
      )}

      {stage === 2 && (
        <g>
          {/* Callus Formation */}
          <circle cx="155" cy="112" r="8" fill="#a3e635" opacity="0.9" />
          <circle cx="165" cy="110" r="9" fill="#84cc16" opacity="0.9" />
          <circle cx="160" cy="103" r="7" fill="#65a30d" opacity="0.9" />
          <circle cx="168" cy="116" r="6" fill="#4d7c0f" opacity="0.9" />
          <text x="210" y="105" fill="#a3e635" fontSize="10" fontWeight="bold">Unorganized Callus</text>
        </g>
      )}

      {stage === 3 && (
        <g>
          {auxinRatio > 5 && (
            /* High Auxin: Rooting (Rhizogenesis) */
            <g>
              <path d="M 160 115 Q 150 135 145 155 M 160 115 Q 170 140 175 160 M 160 115 L 160 165" stroke="#f59e0b" strokeWidth="3" fill="none" />
              <text x="210" y="140" fill="#fbbf24" fontSize="10" fontWeight="bold">Rhizogenesis (Roots)</text>
              <text x="210" y="155" fill="#cbd5e1" fontSize="9">High Auxin:Cytokinin</text>
            </g>
          )}

          {auxinRatio < 0.5 && (
            /* High Cytokinin: Shooting (Caulogenesis) */
            <g>
              <path d="M 160 105 L 160 60" stroke="#15803d" strokeWidth="3" />
              <path d="M 160 75 Q 145 65 135 70" stroke="#22c55e" strokeWidth="2" fill="none" />
              <path d="M 160 65 Q 175 55 185 60" stroke="#22c55e" strokeWidth="2" fill="none" />
              <circle cx="160" cy="55" r="4" fill="#4ade80" />
              <text x="210" y="70" fill="#4ade80" fontSize="10" fontWeight="bold">Caulogenesis (Shoots)</text>
              <text x="210" y="85" fill="#cbd5e1" fontSize="9">High Cytokinin:Auxin</text>
            </g>
          )}

          {auxinRatio >= 0.5 && auxinRatio <= 5 && (
            /* Balanced: Plantlet */
            <g>
              {/* Roots */}
              <path d="M 160 115 Q 150 135 145 150 M 160 115 Q 170 140 175 155" stroke="#f59e0b" strokeWidth="2" fill="none" />
              {/* Shoots */}
              <path d="M 160 105 L 160 65" stroke="#15803d" strokeWidth="3" />
              <path d="M 160 75 Q 145 65 135 70" stroke="#22c55e" strokeWidth="2" fill="none" />
              <path d="M 160 65 Q 175 55 185 60" stroke="#22c55e" strokeWidth="2" fill="none" />
              <text x="210" y="100" fill="#38bdf8" fontSize="10" fontWeight="bold">Complete Transgenic Plantlet</text>
            </g>
          )}
        </g>
      )}
    </svg>
  );
};

// ==========================================
// 6. MAIN COMPONENT
// ==========================================
export default function C11_BiotechIntroductionCBSESim() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'scenario' | 'discovery' | 'lab' | 'challenges' | 'summary'>('scenario');

  // Interactive Lab State
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Lab 1: Bioreactor State
  const [bioTemp, setBioTemp] = useState<number>(37);
  const [bioPH, setBioPH] = useState<number>(7.0);
  const [bioRPM, setBioRPM] = useState<number>(300);
  const [bioOxygen, setBioOxygen] = useState<number>(30);
  const [bioProteinYield, setBioProteinYield] = useState<number>(0);

  // Lab 2: rDNA Plasmid Builder State
  const [selectedEnzyme, setSelectedEnzyme] = useState<string>('EcoRI');
  const [isPlasmidCut, setIsPlasmidCut] = useState<boolean>(false);
  const [isGeneInserted, setIsGeneInserted] = useState<boolean>(false);
  const [transformationSuccess, setTransformationSuccess] = useState<boolean | null>(null);

  // Lab 3: Color Biotech State
  const [selectedColorDomain, setSelectedColorDomain] = useState<string>('Red');

  // Lab 4: Plant Tissue Culture State
  const [tcStage, setTcStage] = useState<number>(1);
  const [auxinCytokininRatio, setAuxinCytokininRatio] = useState<number>(1.0);

  // Lab 5: Bioremediation State
  const [pollutantType, setPollutantType] = useState<'crude_oil' | 'heavy_metals'>('crude_oil');
  const [remediationEfficiency, setRemediationEfficiency] = useState<number>(20);

  // Game / Assessment State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Discovery / Prediction / Observation Tab States
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Audio / Speech & Hints UI State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BKT & SM2 State tracking per node
  const [bktStates, setBktStates] = useState<{ [nodeId: string]: ReturnType<typeof createBKTState> }>({});

  useEffect(() => {
    const initialBkt: { [nodeId: string]: ReturnType<typeof createBKTState> } = {};
    ALL_NODE_IDS.forEach((id) => {
      initialBkt[id] = createBKTState();
    });
    setBktStates(initialBkt);
  }, []);

  // Bioreactor Calculations
  useEffect(() => {
    // Optimal conditions: Temp 36-38°C, pH 6.8-7.2, RPM 250-400, DO 25-40%
    const tempFactor = Math.max(0, 100 - Math.abs(bioTemp - 37) * 8);
    const phFactor = Math.max(0, 100 - Math.abs(bioPH - 7.0) * 35);
    const rpmFactor = bioRPM > 50 ? Math.min(100, bioRPM / 3) : 10;
    const doFactor = bioOxygen > 10 ? Math.min(100, bioOxygen * 2.5) : 5;

    const overallYield = Math.round((tempFactor * phFactor * rpmFactor * doFactor) / 10000);
    setBioProteinYield(overallYield);
  }, [bioTemp, bioPH, bioRPM, bioOxygen]);

  // Reset inactivity timer for auto-hints
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      const hint = CHALLENGES[challengeIndex]?.hints[0] || 'Take your time to analyze the biological mechanisms!';
      setCurrentHintText(hint);
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIndex, activeTab]);

  // Lab 2 Action Handlers
  const handleCutPlasmid = () => {
    setIsPlasmidCut(true);
    audioManager.play('whoosh');
    speechManager.speak(`Plasmid DNA cleaved by ${selectedEnzyme} restriction enzyme.`);
  };

  const handleLigateGene = () => {
    if (isPlasmidCut) {
      setIsGeneInserted(true);
      audioManager.play('balance');
      speechManager.speak('T4 DNA Ligase joined human insulin gene insert into plasmid.');
    }
  };

  const handleTransformCells = () => {
    if (isGeneInserted) {
      setTransformationSuccess(true);
      audioManager.play('sparkle');
      speechManager.speak('Transformation successful! Ampicillin resistant recombinant E. coli colonies expressed.');
    } else {
      setTransformationSuccess(false);
      audioManager.play('error');
    }
  };

  // Submit Discovery Question
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Buchner proved cell-free biological catalysis by enzymes.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
    }
  };

  // Submit Challenge Answer
  const handleChallengeSubmit = () => {
    const currentCh = CHALLENGES[challengeIndex];
    let isCorrect = false;

    if (currentCh.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && Math.abs(val - (currentCh.correctAnswer || 0)) < 0.1) {
        isCorrect = true;
      }
    } else {
      if (selectedOption === currentCh.correctIndex) {
        isCorrect = true;
      }
    }

    setIsAnswerSubmitted(true);

    // Update BKT
    const prevBkt = bktStates[currentCh.nodeId] || createBKTState();
    const newBkt = bktUpdate(prevBkt, isCorrect);
    setBktStates({ ...bktStates, [currentCh.nodeId]: newBkt });

    // Update SM2
    const reviewItem = createReviewItem(currentCh.nodeId);
    sm2Update(reviewItem, isCorrect ? 5 : 1);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setChallengeFeedback('Excellent! Correct answer.');
      audioManager.play('drop-correct');
      speechManager.speak('Correct answer! Great job.');
      setShowConfetti(true);
      setShowSuccess(true);
    } else {
      setChallengeFeedback(`Incorrect. ${currentCh.explanation}`);
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect answer. Review the explanation.');
    }
  };

  const handleNextChallenge = () => {
    setShowConfetti(false);
    setShowSuccess(false);
    setIsAnswerSubmitted(false);
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);

    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      recordGameScore(ALL_NODE_IDS, score + 10);
      setActiveTab('summary');
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You completed all biotechnology challenges.');
    }
  };

  // Calculate overall node mastery percentage
  const overallMasteryPct = useMemo(() => {
    const ids = Object.keys(bktStates);
    if (ids.length === 0) return 0;
    const totalMastery = ids.reduce((acc, id) => acc + masteryProb(bktStates[id]), 0);
    return Math.round((totalMastery / ids.length) * 100);
  }, [bktStates]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col gap-6">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={250} />

      {/* Header Banner */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-gold-500 to-emerald-500 flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-gold-500/20">
            🧬
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Introduction to Biotechnology
            </h1>
            <p className="text-slate-400 text-sm">
              ISC Class 11 Biology & Biotechnology • Modern Bioprocess Engineering & Genetic Technology
            </p>
          </div>
        </div>

        {/* Dynamic Mastery Badge */}
        <div className="flex items-center gap-6 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-xs text-slate-500 font-medium block">LAB SCORE</span>
            <span className="text-xl font-black text-amber-400">{score} pts</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <span className="text-xs text-slate-500 font-medium block">BKT MASTERY</span>
            <span className="text-xl font-black text-emerald-400">{overallMasteryPct}%</span>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'scenario', label: '📖 Scenario', icon: '📜' },
          { id: 'discovery', label: '💡 Discovery', icon: '🧪' },
          { id: 'lab', label: '🔬 Interactive Labs', icon: '⚙️' },
          { id: 'challenges', label: `🎯 Challenges (${challengeIndex + 1}/${CHALLENGES.length})`, icon: '🏆' },
          { id: 'summary', label: '📊 Lab Report & Summary', icon: '📑' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Hint Bubble floating UI */}
      <HintBubble show={showHint} text={currentHintText} />

      {/* TAB 1: SCENARIO */}
      {activeTab === 'scenario' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 animate-fade-in">
          <div className="max-w-4xl space-y-4">
            <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold tracking-wide uppercase">
              Operational Context
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{SCENARIO.context}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-gold-400 text-xl font-bold block mb-1">1. Ancient & Classical</span>
                <p className="text-slate-400 text-xs">Fermentation of dahi, bread, wine, and Pasteur\'s germ theory of micro-organisms.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-emerald-400 text-xl font-bold block mb-1">2. Modern Genetic Tech</span>
                <p className="text-slate-400 text-xs">Recombinant DNA plasmids, restriction cleavage, ligase, and human insulin expression.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 text-xl font-bold block mb-1">3. Applied Bioprocess</span>
                <p className="text-slate-400 text-xs">Industrial bioreactors, tissue culture, Bt transgenic crops, and Indian DBT eco-system.</p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('discovery');
                audioManager.play('whoosh');
              }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
            >
              Begin Discovery Phase →
            </button>
          </div>
        </section>
      )}

      {/* TAB 2: DISCOVERY QUESTION & PREDICTIONS */}
      {activeTab === 'discovery' && (
        <section className="space-y-6">
          {/* Main Discovery Question */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-amber-500/10 stroke-amber-500/30 text-amber-400 border border-amber-500/30 rounded-full text-xs font-semibold uppercase">
                Paradigm Shift Discovery Question
              </span>
              <span className="text-xs text-slate-500">Historical Foundations • Buchner 1897</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  disabled={discoverySubmitted}
                  className={`p-4 rounded-xl border text-left font-medium transition-all ${
                    discoverySubmitted
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : discoverySelected === idx
                        ? 'bg-red-950/60 border-red-500 text-red-200'
                        : 'bg-slate-950 border-slate-800 opacity-50'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-gold-500 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {discoverySubmitted && (
              <div className="p-4 bg-gold-950/40 border border-gold-800/50 rounded-xl text-gold-200 text-sm space-y-1 animate-fade-in">
                <span className="font-bold block">Scientific Insight:</span>
                <p>{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          {/* Render PREDICTION_QUESTIONS Mandatory Array */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🔮 Interactive Lab Predictions</span>
            </h3>
            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-semibold text-slate-200 text-base">{pq.question}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pq.options.map((opt, oIdx) => {
                      const isChosen = predictionAnswers[qIdx] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            const newAns = [...predictionAnswers];
                            newAns[qIdx] = oIdx;
                            setPredictionAnswers(newAns);
                            audioManager.play('pop');
                          }}
                          className={`p-3 rounded-lg border text-xs font-medium text-left transition-all ${
                            isChosen
                              ? 'bg-gold-600 border-gold-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-slate-500 text-xs italic">
                    🔍 Verification Method: {pq.verifyInstruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: INTERACTIVE LABS */}
      {activeTab === 'lab' && (
        <section className="space-y-6">
          {/* Exploration Step Selector Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabIndex(idx);
                  audioManager.play('swoop');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeLabIndex === idx
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Active Lab Module View */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                <p className="text-slate-400 text-xs mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>
              <span className="px-3 py-1 bg-slate-800 text-gold-400 rounded-lg text-xs font-mono shrink-0">
                Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
              </span>
            </div>

            {/* LAB 1: BIOREACTOR OPTIMIZATION */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <BioreactorSVG temp={bioTemp} pH={bioPH} rpm={bioRPM} oxygen={bioOxygen} />
                </div>
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Fermenter Parameters</h4>

                  {/* Temperature Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Vessel Temperature</span>
                      <span className="text-red-400 font-bold">{bioTemp}°C</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="50"
                      value={bioTemp}
                      onChange={(e) => setBioTemp(Number(e.target.value))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>

                  {/* pH Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Medium pH Level</span>
                      <span className="text-amber-400 font-bold">{bioPH.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="10.0"
                      step="0.1"
                      value={bioPH}
                      onChange={(e) => setBioPH(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Stirrer Speed */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Impeller Agitation</span>
                      <span className="text-purple-400 font-bold">{bioRPM} RPM</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="600"
                      step="25"
                      value={bioRPM}
                      onChange={(e) => setBioRPM(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Dissolved Oxygen */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Dissolved Oxygen (DO)</span>
                      <span className="text-gold-400 font-bold">{bioOxygen}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={bioOxygen}
                      onChange={(e) => setBioOxygen(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  {/* Calculated Output Display */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 block mb-1">RECOMBINANT PROTEIN YIELD</span>
                    <span className={`text-2xl font-black ${bioProteinYield > 70 ? 'text-emerald-400' : bioProteinYield > 30 ? 'text-amber-400' : 'text-red-400'}`}>
                      {bioProteinYield}% Total Capacity
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: rDNA PLASMID CONSTRUCTION */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <PlasmidSVG cutState={isPlasmidCut} inserted={isGeneInserted} enzyme={selectedEnzyme} />
                </div>
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">rDNA Engineering Steps</h4>

                  {/* Step 1: Select Restriction Enzyme */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 block">1. Select Restriction Endonuclease:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['EcoRI', 'BamHI', 'HindIII'].map((enz) => (
                        <button
                          key={enz}
                          onClick={() => setSelectedEnzyme(enz)}
                          className={`py-1.5 rounded text-xs font-bold border ${
                            selectedEnzyme === enz
                              ? 'bg-gold-600 border-gold-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {enz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleCutPlasmid}
                      disabled={isPlasmidCut}
                      className="w-full py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold rounded-lg text-xs transition-all"
                    >
                      ✂️ Cleave Plasmid at Palindromic Site
                    </button>
                    <button
                      onClick={handleLigateGene}
                      disabled={!isPlasmidCut || isGeneInserted}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-lg text-xs transition-all"
                    >
                      🔗 Insert Insulin Gene & Apply DNA Ligase
                    </button>
                    <button
                      onClick={handleTransformCells}
                      disabled={!isGeneInserted}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold rounded-lg text-xs transition-all"
                    >
                      🧫 Transform Host E. coli & Select on Ampicillin
                    </button>
                  </div>

                  {/* Transformation Output */}
                  {transformationSuccess !== null && (
                    <div
                      className={`p-3 rounded-lg border text-xs font-bold text-center ${
                        transformationSuccess
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                          : 'bg-red-950/80 border-red-500 text-red-300'
                      }`}
                    >
                      {transformationSuccess
                        ? '✅ Transformation Successful! Colonies formed on Ampicillin Plate.'
                        : '❌ Transformation Failed! Plasmid not sealed properly.'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LAB 3: COLOR CODE EXPLORER */}
            {activeLabIndex === 2 && (
              <div className="space-y-6">
                <BiotechColorSpectrumSVG activeColor={selectedColorDomain} />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {['Red', 'Green', 'White', 'Blue', 'Grey', 'Gold'].map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColorDomain(color);
                        audioManager.play('pop');
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        selectedColorDomain === color
                          ? 'bg-slate-800 border-gold-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {color} Biotech
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-base font-bold text-gold-400">
                    {selectedColorDomain} Biotechnology in India & Globally
                  </h4>
                  {selectedColorDomain === 'Red' && (
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Refers to health and medical biopharmaceuticals. Leading Indian players include <strong>Serum Institute of India</strong> (Covishield/pediatric vaccines), <strong>Biocon</strong> (recombinant human insulin), and <strong>Bharat Biotech</strong> (Covaxin).
                    </p>
                  )}
                  {selectedColorDomain === 'Green' && (
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Agricultural applications including <strong>Bt Cotton</strong> (insect-resistant bollworm protection via Cry genes), virus-resistant crops, and high-yield plant tissue micropropagation.
                    </p>
                  )}
                  {selectedColorDomain === 'White' && (
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Industrial biotechnology focusing on microbial fermentation, bioprocess production of industrial enzymes (amylases, lipases), bioplastics (PHA), and 2nd generation bio-ethanol.
                    </p>
                  )}
                  {selectedColorDomain === 'Blue' && (
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Marine and aquatic biotechnology utilizing algae for bio-biodiesel, extremophilic marine enzymes, and bioactive compounds from deep-sea micro-organisms.
                    </p>
                  )}
                  {selectedColorDomain === 'Grey' && (
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Environmental biotechnology focusing on <strong>Bioremediation</strong> of crude oil spills (Pseudomonas putida), heavy metal phytoremediation (Brassica), and eco-toxicological biosensors.
                    </p>
                  )}
                  {selectedColorDomain === 'Gold' && (
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Bioinformatics and computational biology involving DNA/protein sequence alignment (BLAST), structural biology, genomics databases, and molecular docking.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* LAB 4: PLANT TISSUE CULTURE & TRANSGENICS */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <TissueCultureSVG stage={tcStage} auxinRatio={auxinCytokininRatio} />
                </div>
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Tissue Culture Control</h4>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Culture Progression Stage:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { s: 1, label: 'Explant' },
                        { s: 2, label: 'Callus' },
                        { s: 3, label: 'Organogenesis' },
                      ].map((item) => (
                        <button
                          key={item.s}
                          onClick={() => setTcStage(item.s)}
                          className={`py-1.5 rounded text-xs font-bold border ${
                            tcStage === item.s
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {tcStage === 3 && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Auxin : Cytokinin Ratio</span>
                        <span className="text-emerald-400 font-bold">{auxinCytokininRatio}:1</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="10"
                        step="0.1"
                        value={auxinCytokininRatio}
                        onChange={(e) => setAuxinCytokininRatio(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>Low (Shoots)</span>
                        <span>1:1 (Balanced)</span>
                        <span>High (Roots)</span>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-amber-400 block mb-1">Agrobacterium Ti Plasmid Vector:</span>
                    Used to introduce <em>Cry1Ac</em> gene into callus cells before organogenesis to generate insect-resistant Bt Cotton.
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: BIOREMEDIATION & BIOFUELS */}
            {activeLabIndex === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-gold-400">Select Environmental Contaminant</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPollutantType('crude_oil')}
                        className={`px-3 py-2 rounded-lg text-xs font-bold border ${
                          pollutantType === 'crude_oil'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        🛢️ Hydrocarbon Crude Oil
                      </button>
                      <button
                        onClick={() => setPollutantType('heavy_metals')}
                        className={`px-3 py-2 rounded-lg text-xs font-bold border ${
                          pollutantType === 'heavy_metals'
                            ? 'bg-amber-600 border-amber-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        ⚠️ Heavy Metals (Pb, Cd)
                      </button>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setRemediationEfficiency((prev) => Math.min(100, prev + 25));
                          audioManager.play('sparkle');
                        }}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                      >
                        🌱 Deploy Biological Remediation Agent
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-center text-center">
                    <span className="text-xs text-slate-400 uppercase font-bold">Bioremediation Progress</span>
                    <div className="w-full bg-slate-800 h-6 rounded-full overflow-hidden p-1">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${remediationEfficiency}%` }}
                      />
                    </div>
                    <span className="text-xl font-bold text-emerald-400">{remediationEfficiency}% Cleaned</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Render OBSERVATION_QUESTIONS Mandatory Array */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>👁️ Lab Observation Checkpoint</span>
            </h3>
            <div className="space-y-6">
              {OBSERVATION_QUESTIONS.map((oq, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-semibold text-slate-200 text-base">{oq.question}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {oq.observableOptions.map((opt, oIdx) => {
                      const isChosen = observationAnswers[qIdx] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            const newAns = [...observationAnswers];
                            newAns[qIdx] = oIdx;
                            setObservationAnswers(newAns);
                            audioManager.play('pop');
                          }}
                          className={`p-3 rounded-lg border text-xs font-medium text-left transition-all ${
                            isChosen
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: 22+ CHALLENGES ENGINE */}
      {activeTab === 'challenges' && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          {/* Challenge Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  CHALLENGES[challengeIndex].difficulty === 'foundation'
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                    : CHALLENGES[challengeIndex].difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}>
                  {CHALLENGES[challengeIndex].difficulty} TIER
                </span>
                <span className="text-slate-500 text-xs">
                  Competency: {CHALLENGES[challengeIndex].competencyLevel}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Challenge {challengeIndex + 1} of {CHALLENGES.length}
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Node ID: {CHALLENGES[challengeIndex].nodeId}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <p className="text-base md:text-lg font-medium text-slate-200 leading-relaxed">
              {CHALLENGES[challengeIndex].question}
            </p>

            {/* Input Options (Multiple Choice) */}
            {CHALLENGES[challengeIndex].type !== 'numeric' && CHALLENGES[challengeIndex].options && (
              <div className="grid grid-cols-1 gap-3 pt-2">
                {CHALLENGES[challengeIndex].options!.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isAnswerSubmitted) {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }
                    }}
                    disabled={isAnswerSubmitted}
                    className={`p-4 rounded-xl border text-left font-medium transition-all ${
                      selectedOption === idx
                        ? 'bg-gold-600/30 border-gold-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Input Option (Numeric) */}
            {CHALLENGES[challengeIndex].type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <label className="text-xs text-slate-400 block">Enter numerical result:</label>
                <input
                  type="number"
                  value={numericAnswer}
                  onChange={(e) => setNumericAnswer(e.target.value)}
                  disabled={isAnswerSubmitted}
                  placeholder="e.g. 100"
                  className="w-full md:w-64 p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:border-gold-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Buttons & Feedback */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleChallengeSubmit}
                disabled={selectedOption === null && numericAnswer === ''}
                className="px-6 py-3 bg-gradient-to-r from-gold-500 to-emerald-500 hover:from-gold-400 hover:to-emerald-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm font-medium ${
                    challengeFeedback?.startsWith('Excellent')
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/60 border-red-500 text-red-200'
                  }`}
                >
                  {challengeFeedback}
                </div>

                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  {challengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Lab Summary →'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 5: LAB REPORT & REAL WORLD ACTIVITY SUMMARY */}
      {activeTab === 'summary' && (
        <section className="space-y-6">
          {/* Real-World Activity Render */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold uppercase">
                  Industrial Biomanufacturing Activity
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scale-Up Calculation Steps</h4>
              <div className="space-y-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Misconceptions Corrective Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🧠 Common Misconceptions Clarified</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs text-gold-400 font-bold block">{m.topic}</span>
                  <p className="text-xs text-red-400 line-through">❌ {m.misconception}</p>
                  <p className="text-xs text-emerald-300 font-medium">✅ {m.correction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Assessment Review */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📋 ISC Diagnostic Question Bank</span>
            </h3>
            <div className="space-y-4">
              {DIAGNOSTIC_QUESTIONS.map((dq, idx) => (
                <div key={dq.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <span className="text-slate-500 font-mono block">Diagnostic {idx + 1} • Node {dq.nodeId}</span>
                  <p className="text-slate-200 font-bold">{dq.question}</p>
                  <p className="text-emerald-400">Correct Answer: {dq.options[dq.correctIndex]}</p>
                  <p className="text-slate-400 italic">{dq.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}