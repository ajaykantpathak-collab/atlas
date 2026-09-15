'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (MUST MATCH VERBATIM) ───
const NODE_C12_BIOTECH_031 = 'c12_biotech_031';
const NODE_C12_BIOTECH_032 = 'c12_biotech_032';
const NODE_C12_BIOTECH_033 = 'c12_biotech_033';
const NODE_C12_BIOTECH_034 = 'c12_biotech_034';
const NODE_C12_BIOTECH_035 = 'c12_biotech_035';
const NODE_C12_BIOTECH_036 = 'c12_biotech_036';
const NODE_C12_BIOTECH_037 = 'c12_biotech_037';
const NODE_C12_BIOTECH_038 = 'c12_biotech_038';
const NODE_C12_BIOTECH_039 = 'c12_biotech_039';
const NODE_C12_BIOTECH_040 = 'c12_biotech_040';

const ALL_NODE_IDS = [
  NODE_C12_BIOTECH_031,
  NODE_C12_BIOTECH_032,
  NODE_C12_BIOTECH_033,
  NODE_C12_BIOTECH_034,
  NODE_C12_BIOTECH_035,
  NODE_C12_BIOTECH_036,
  NODE_C12_BIOTECH_037,
  NODE_C12_BIOTECH_038,
  NODE_C12_BIOTECH_039,
  NODE_C12_BIOTECH_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Biopharma India 2026',
  intro: 'You are the Chief Scientist at the National Institute of Bioprocess Engineering in Hyderabad. A major healthcare emergency requires engineering rapid-acting insulin lispro, scaling up penicillin in a 10,000L stirred bioreactor, synthesizing subtilisin for green detergents, and establishing doubled haploid crop lines to ensure national food security.',
  context: 'Your lab integrates molecular genetics (Sanger sequencing, PCR, SDM), industrial bioprocess kinetics (chemostat, turbidostat, downstream purification), and plant reproductive biotechnology (embryo rescue, androgenesis, endosperm culture).',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In Sanger chain-termination sequencing, what specifically stops DNA polymerase from adding another deoxynucleotide to the growing strand?',
  options: [
    'Absence of a 5\'-phosphate group on incoming nucleotide',
    'Absence of a 3\'-OH (hydroxyl) group on the dideoxynucleotide (ddNTP)',
    'High denaturation temperature of 95°C',
    'Cleavage of phosphodiester backbone by DpnI endonuclease',
  ],
  correctIndex: 1,
  hintAfter: 'Think about the chemical "handle" required for phosphodiester bond formation between nucleotides.',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Sanger Sequencing (Foundation - Recall)
  {
    id: 'ch_01_sanger_gel',
    nodeId: NODE_C12_BIOTECH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When reading a manual Sanger sequencing autoradiogram gel ladder, in which direction is the newly synthesised 5\' to 3\' sequence deduced?',
    options: [
      'From the top of the gel (largest fragments) downward',
      'From the bottom of the gel (shortest fragments) upward',
      'By reading only the A and T lanes first, then G and C',
      'From left to right across the 4 lanes simultaneously regardless of height',
    ],
    correctIndex: 1,
    explanation: 'Shortest fragments migrate fastest through the polyacrylamide gel and reach the bottom. Because these represent the earliest chain termination events nearest the 5\' primer, the sequence is read from bottom to top (5\' to 3\').',
    hints: [
      'Think about which fragments travel the farthest in gel electrophoresis.',
      'Smaller DNA fragments migrate faster and sit near the bottom.',
      'The shortest terminated fragment corresponds to the first base added to the primer (5\' end). Read bottom to top.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Automated Sequencing vs Manual (Standard - Analysis)
  {
    id: 'ch_02_auto_seq',
    nodeId: NODE_C12_BIOTECH_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why can automated Sanger sequencing combine all four chain-terminating ddNTPs into a single reaction tube, whereas manual sequencing requires 4 separate tubes?',
    options: [
      'Automated sequencing uses Taq polymerase which ignores ddNTP differences',
      'Each ddNTP (ddATP, ddTTP, ddGTP, ddCTP) is tagged with a distinct fluorescent fluorophore color read by a laser detector',
      'Automated capillary electrophoresis separates bases by electrical charge rather than size',
      'Automated sequencing uses radioactive P-32 isotopes with different half-lives',
    ],
    correctIndex: 1,
    explanation: 'In automated sequencing, each ddNTP carries a distinct spectral fluorochrome (e.g. green for A, red for T, black for G, blue for C). A laser at the capillary exit detects the specific wavelength, generating a multi-color electropherogram.',
    hints: [
      'How does the machine distinguish which base terminated the chain if they are in one capillary?',
      'Look for the detection mechanism involving light and distinct colors.',
      'Fluorescent dye labelling of each ddNTP replaces the spatial separation of 4 gel lanes.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Site Directed Mutagenesis - Insulin Lispro (Standard - Application)
  {
    id: 'ch_03_sdm_insulin',
    nodeId: NODE_C12_BIOTECH_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In engineering rapid-acting Insulin Lispro at Biocon Bengaluru, site-directed mutagenesis is performed on the B-chain. What specific amino acid modification is made?',
    options: [
      'Swapping Proline at B28 and Lysine at B29 to Lysine B28 and Proline B29',
      'Adding two Arginine residues at the C-terminus of the B-chain',
      'Deleting the C-peptide and replacing it with a poly-histidine tag',
      'Mutating Disulphide bridges between A7-B7 and A20-B19 into Alanine',
    ],
    correctIndex: 0,
    explanation: 'In native human insulin, the B28-Pro and B29-Lys sequence facilitates stable zinc-hexamer formation, delaying subcutaneous absorption. Inverting this to B28-Lys, B29-Pro (Lispro) prevents hexamerization, keeping it monomeric for immediate post-prandial action.',
    hints: [
      'Think of the B-chain C-terminus amino acids at positions 28 and 29.',
      'Normal insulin has Pro-Lys; Lispro inverts this order.',
      'Swapping Proline (B28) and Lysine (B29) disrupts hexamer packing.',
    ],
    misconceptionIndex: 1,
  },
  // 4. SDM DpnI Selection (Advanced - Analysis)
  {
    id: 'ch_04_dpni_selection',
    nodeId: NODE_C12_BIOTECH_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Following PCR amplification with mutagenic primers in site-directed mutagenesis, the reaction mixture is treated with DpnI endonuclease. What is the precise chemical basis of DpnI selectivity?',
    options: [
      'DpnI cleaves only single-stranded DNA primers that were not incorporated',
      'DpnI specifically cleaves methylated GATC sites on the parental plasmid DNA (from dam+ E. coli), sparing newly synthesised unmethylated mutant plasmid',
      'DpnI recognizes mismatched base pairs and repairs them to the wild-type sequence',
      'DpnI digests only circular plasmids while leaving linear PCR amplicons intact',
    ],
    correctIndex: 1,
    explanation: 'Parental plasmids propagated in dam+ E. coli have methylated adenines in GATC sequences. In vitro PCR synthesis produces unmethylated mutant strands. DpnI exclusively cuts methylated GATC, destroying the non-mutated parent template.',
    hints: [
      'Consider the difference in chemical tags between DNA made inside E. coli vs DNA made in a test tube PCR.',
      'Bacterial DNA has dam methylation at GATC sites; in vitro PCR DNA is unmethylated.',
      'DpnI digests methylated parental DNA, selecting for the intact unmethylated mutant plasmid.',
    ],
    misconceptionIndex: 1,
  },
  // 5. PCR Thermal Cycle Steps (Foundation - Recall)
  {
    id: 'ch_05_pcr_cycle',
    nodeId: NODE_C12_BIOTECH_033,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the three steps of a single Polymerase Chain Reaction (PCR) cycle in their correct chronological order with corresponding standard temperatures.',
    sortItems: [
      'Denaturation of double-stranded DNA (~94°C - 95°C)',
      'Primer Annealing to single-stranded templates (~50°C - 60°C)',
      'Primer Extension by Taq DNA polymerase (~72°C)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'A PCR cycle strictly proceeds: (1) Denaturation at 95°C unzips the double helix, (2) Annealing at ~55°C lets sequence-specific primers bind, and (3) Extension at 72°C activates thermostable Taq polymerase to synthesise complementary strands.',
    hints: [
      'First the double strands must be separated by high heat.',
      'Next, the temperature drops so short primers can bind to single strands.',
      'Finally, Taq polymerase synthesises DNA at its optimal temperature of 72°C.',
    ],
  },
  // 6. RT-PCR & Diagnostic Virology (Standard - Application)
  {
    id: 'ch_06_rt_pcr',
    nodeId: NODE_C12_BIOTECH_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In clinical diagnostic testing for RNA viruses like SARS-CoV-2 or HIV, what critical preliminary enzymatic step distinguishes RT-PCR from standard PCR?',
    options: [
      'DNA ligase circularizes the viral genome prior to thermal cycling',
      'Reverse transcriptase synthesises complementary DNA (cDNA) from the viral RNA template before PCR amplification',
      'Restriction endonuclease EcoRI cuts the viral RNA into 100bp fragments',
      'RNA polymerase II transcribes the virus into messenger RNA in vitro',
    ],
    correctIndex: 1,
    explanation: 'Standard DNA polymerase cannot use single-stranded RNA as a template. RT-PCR utilizes Reverse Transcriptase to synthesize cDNA from viral RNA, which is then exponentially amplified by Taq polymerase in standard thermal cycles.',
    hints: [
      'Taq polymerase requires a DNA template, but the virus has RNA.',
      'Which enzyme converts RNA into complementary DNA (cDNA)?',
      'Reverse transcriptase makes cDNA, which then enters PCR amplification.',
    ],
  },
  // 7. DNA Fingerprinting VNTR/STR (Standard - Analysis)
  {
    id: 'ch_07_dna_fingerprinting',
    nodeId: NODE_C12_BIOTECH_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At the Centre for DNA Fingerprinting and Diagnostics (CDFD) in Hyderabad, forensic identification relies on VNTRs and STRs. Why do these loci provide unique individual profiles?',
    options: [
      'They encode different blood group antigens with unique amino acid sequences',
      'The number of tandem sequence repeats varies highly between individuals due to replication slippage and mutation, producing unique restriction fragment length patterns',
      'Every human has entirely different histone protein modifications at these loci',
      'VNTRs are only inherited from the maternal mitochondrial genome',
    ],
    correctIndex: 1,
    explanation: 'Variable Number Tandem Repeats (VNTRs) and Short Tandem Repeats (STRs) are polymorphic hypervariable mini/microsatellite regions. The variable copy number of repeat motifs yields unique DNA fragment sizes across different individuals.',
    hints: [
      'What does VNTR stand for and what makes it vary between people?',
      'Look for differences in the number of repeating short sequence units.',
      'Repeat copy numbers vary per person, generating individual-specific band patterns upon electrophoresis.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Fermentation Growth Kinetics (Foundation - Understanding)
  {
    id: 'ch_08_growth_phases',
    nodeId: NODE_C12_BIOTECH_034,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 4 characteristic growth phases of a closed batch microbial culture in sequential order.',
    sortItems: [
      'Lag Phase (Physiological adaptation and enzyme induction, no net division)',
      'Log / Exponential Phase (Balanced growth at maximum specific growth rate µ_max)',
      'Stationary Phase (Nutrient limitation/toxin accumulation; division rate equals death rate)',
      'Death / Decline Phase (Viable cell population decreases exponentially)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'In a closed batch system: Lag -> Log (exponential) -> Stationary (plateau where dX/dt = 0) -> Death phase occurs as nutrients exhaust and toxic byproducts accumulate.',
    hints: [
      'Microbes first adapt to the new medium without increasing in number.',
      'Then they multiply at maximum rate in log phase.',
      'Nutrient depletion leads to stationary plateau, followed by death.',
    ],
  },
  // 9. Batch vs Fed-Batch vs Continuous (Standard - Evaluation)
  {
    id: 'ch_09_fermentation_modes',
    nodeId: NODE_C12_BIOTECH_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is fed-batch fermentation preferred over standard batch culture for producing high-cell-density recombinant therapeutic proteins (like human insulin in E. coli)?',
    options: [
      'Fed-batch culture requires no oxygen sparging or temperature control',
      'Incremental feeding of concentrated glucose prevents substrate inhibition and catabolite repression while prolonging the exponential log phase',
      'Fed-batch allows infinite continuous harvest without sterilising between runs',
      'Fed-batch eliminates the stationary phase entirely, keeping cells permanently in lag phase',
    ],
    correctIndex: 1,
    explanation: 'High initial sugar concentrations in batch culture cause substrate inhibition and the Crabtree effect (overflow metabolism). Fed-batch gradually feeds limiting substrate, maintaining optimal concentration, high biomass density, and massive product yield.',
    hints: [
      'What happens if you dump 200 g/L glucose into an E. coli culture at once?',
      'High initial sugar inhibits cell growth; incremental feeding prevents this.',
      'Gradual substrate addition avoids osmotic shock/inhibition and extends high-density log growth.',
    ],
  },
  // 10. Turbidostat vs Chemostat (Advanced - Analysis)
  {
    id: 'ch_10_turbidostat_chemostat',
    nodeId: NODE_C12_BIOTECH_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do the control mechanisms and operating growth rates differ between a Chemostat and a Turbidostat in open continuous culture?',
    options: [
      'Chemostat controls turbidity with an optical sensor; Turbidostat keeps dilution rate fixed',
      'Chemostat maintains a fixed dilution rate (D) with growth rate limited by a single sub-saturating nutrient (µ = D); Turbidostat varies flow rate to hold cell density (OD) constant with excess nutrients (µ ≈ µ_max)',
      'Chemostat is a closed system; Turbidostat is an open system',
      'Chemostat operates only at 0°C; Turbidostat operates only at 100°C',
    ],
    correctIndex: 1,
    explanation: 'In a chemostat, flow rate is fixed and growth rate is nutrient-limited (µ = D). In a turbidostat, an optical sensor measures turbidity (OD) and dynamically throttles pump flow to keep cell density constant with unlimited nutrients (cells grow at µ_max).',
    hints: [
      'Which system uses an optical turbidity sensor to modulate pump flow?',
      'Which system deliberately starves the cells of one nutrient to balance growth rate with dilution rate?',
      'Chemostat = fixed dilution rate, nutrient-limited; Turbidostat = optical feedback, nutrient-unlimited.',
    ],
    misconceptionIndex: 0,
  },
  // 11. Bioreactor Components (Foundation - Recall)
  {
    id: 'ch_11_bioreactor_label',
    nodeId: NODE_C12_BIOTECH_036,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Drag each bioreactor component to its correct functional location on the industrial stirred-tank fermenter diagram.',
    dragItems: [
      { label: 'Impeller / Agitator', targetId: 'part_impeller' },
      { label: 'Sparger (Air Bubbler)', targetId: 'part_sparger' },
      { label: 'Cooling Jacket', targetId: 'part_jacket' },
      { label: 'pH / DO Probes', targetId: 'part_probes' },
    ],
    correctMapping: {
      part_impeller: 'Impeller / Agitator',
      part_sparger: 'Sparger (Air Bubbler)',
      part_jacket: 'Cooling Jacket',
      part_probes: 'pH / DO Probes',
    },
    explanation: 'Impellers mix nutrients and break air bubbles; spargers introduce sterile pressurized air at the vessel base; water jackets dissipate metabolic heat; and immersed probes monitor pH and dissolved oxygen.',
    hints: [
      'The component with rotating blades that mixes broth is the impeller.',
      'Sterile air bubbles enter from the sparger located at the bottom of the vessel.',
      'The outer double wall that circulates cold water is the cooling jacket.',
    ],
  },
  // 12. Downstream Processing for Penicillin (Standard - Application)
  {
    id: 'ch_12_downstream_proc',
    nodeId: NODE_C12_BIOTECH_036,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the sequential unit operations in downstream processing to recover pure crystalline penicillin from 10,000L of Penicillium chrysogenum broth.',
    sortItems: [
      'Filtration / Centrifugation to separate fungal biomass from clarified broth',
      'Solvent Extraction using organic solvent (e.g., butyl acetate) at low pH',
      'Vacuum Concentration of the organic solvent extract at reduced temperature',
      'Crystallisation and Chromatography to purify the antibiotic crystals',
      'Sterile Drying and Formulation into pharmaceutical injectable/tablet dosage form',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Downstream processing must proceed: Solid-liquid separation (cells out) -> Liquid-liquid extraction -> Evaporative concentration -> High-purity crystallisation/chromatography -> Drying & formulation.',
    hints: [
      'First remove the fungal mycelium cells by filtration.',
      'Extract penicillin into an organic solvent layer.',
      'Concentrate under vacuum, crystallize, and finally dry into pure drug form.',
    ],
    misconceptionIndex: 2,
  },
  // 13. Subtilisin Production & Properties (Standard - Understanding)
  {
    id: 'ch_13_subtilisin_prod',
    nodeId: NODE_C12_BIOTECH_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is subtilisin, produced industrially by submerged fermentation of Bacillus subtilis, especially valuable in commercial laundry detergents?',
    options: [
      'It synthesizes cellulose fibers to repair damaged garments',
      'It is an alkaline serine protease that retains high catalytic stability at high wash temperatures and in the presence of surfactant detergents',
      'It is an intracellular enzyme that requires sonication of bacterial cells before adding to clothing',
      'It kills all bacteria on fabrics by hydrolysing peptidoglycan like lysozyme',
    ],
    correctIndex: 1,
    explanation: 'Subtilisin from Bacillus subtilis is an extracellular alkaline serine protease. Its high thermostability, resistance to chelators/bleach, and activity at pH 9-11 make it ideal for breaking down blood, egg, and sweat stains in wash cycles.',
    hints: [
      'Consider what conditions exist inside a washing machine (alkaline pH, hot water, surfactants).',
      'Subtilisin is a protease that digests protein stains.',
      'It is an alkaline serine protease that tolerates heat and alkaline detergents.',
    ],
  },
  // 14. Single Cell Protein (SCP) & Safety (Standard - Evaluation)
  {
    id: 'ch_14_scp_safety',
    nodeId: NODE_C12_BIOTECH_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In producing Single Cell Protein (SCP) / mycoprotein (e.g. Fusarium average / Fusarium venenatum for Quorn or yeast biomass), why is a heat-treatment step required during downstream processing?',
    options: [
      'To completely caramelize the sugars for flavor enhancement',
      'To degrade high cellular RNA/nucleic acid content, preventing elevated blood uric acid and gout in human consumers',
      'To activate reverse transcriptase within the fungal cells',
      'To convert diploid fungal hyphae into haploid vegetative spores',
    ],
    correctIndex: 1,
    explanation: 'Rapidly dividing microbial biomass contains 6-11% RNA. In humans, excess purines metabolise to uric acid, precipitating as crystals in joints (gout) and kidneys. Controlled heat shock (68-70°C) activates endogenous RNases to leak RNA out before harvesting.',
    hints: [
      'Microbial cells have very high concentrations of nucleic acids (RNA).',
      'What metabolic byproduct forms when humans consume excessive dietary purines?',
      'High RNA causes hyperuricemia and gout; thermal treatment activates RNases to lower RNA levels.',
    ],
    misconceptionIndex: 0,
  },
  // 15. Plant Cell Isolation & Enzymes (Foundation - Recall)
  {
    id: 'ch_15_cell_isolation',
    nodeId: NODE_C12_BIOTECH_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which enzymatic combination is specifically used to digest plant cell walls and middle lamellae to release naked, wall-less protoplasts?',
    options: [
      'Trypsin and Collagenase',
      'Cellulase (digests cellulose microfibrils) and Macerozyme / Pectinase (dissolves middle lamella)',
      'Lysozyme and Chitinase',
      'Restriction Endonuclease HindIII and DNA Ligase',
    ],
    correctIndex: 1,
    explanation: 'Plant cell walls consist of cellulose microfibrils embedded in a pectin matrix. Cellulase hydrolyses cellulose walls, while Macerozyme (pectinase) dissolves the pectin-rich middle lamella between adjacent plant cells. Trypsin is for animal tissues only.',
    hints: [
      'Plant cell walls are made of cellulose; the middle lamella is made of pectin.',
      'Do not confuse animal cell isolation enzymes (trypsin) with plant wall enzymes.',
      'Cellulase digests cellulose and Macerozyme/pectinase digests pectin.',
    ],
    misconceptionIndex: 0,
  },
  // 16. Cell Synchronisation Mechanisms (Advanced - Analysis)
  {
    id: 'ch_16_synchronisation',
    nodeId: NODE_C12_BIOTECH_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the synchronising agent with its precise cellular arrest checkpoint in plant/animal cell cultures:',
    options: [
      'Colchicine arrests cells at Metaphase by inhibiting spindle tubulin polymerisation; Hydroxyurea arrests at S-phase by inhibiting ribonucleotide reductase',
      'Colchicine blocks G1-to-S transition; Hydroxyurea blocks cytokinesis at telophase',
      'Colchicine activates cyclin-dependent kinase 1; Hydroxyurea denatures genomic DNA',
      'Serum starvation arrests cells in M-phase; Colchicine arrests cells in G0 phase',
    ],
    correctIndex: 0,
    explanation: 'Colchicine binds alpha/beta-tubulin heterodimers, preventing mitotic spindle assembly and locking cells in metaphase. Hydroxyurea inhibits ribonucleotide reductase, starving the replisome of dNTPs and arresting cells at G1/S phase.',
    hints: [
      'Colchicine destroys the mitotic spindle.',
      'Hydroxyurea stops DNA synthesis by blocking dNTP production.',
      'Colchicine -> Metaphase arrest; Hydroxyurea -> S-phase / G1-S arrest.',
    ],
  },
  // 17. Differentiation, De-differentiation, Re-differentiation (Standard - Understanding)
  {
    id: 'ch_17_totipotency_cycle',
    nodeId: NODE_C12_BIOTECH_038,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Trace the biological trajectory of a mature carrot root parenchyma cell expressing totipotency in tissue culture.',
    sortItems: [
      'Differentiated Parenchyma Cell (Specialised food-storage function in root)',
      'De-differentiation into unorganised, proliferative Callus on auxin/cytokinin medium',
      'Re-differentiation of callus cells into root and shoot meristems (organogenesis)',
      'Regeneration into a complete, fertile totipotent Plantlet',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Differentiated mature tissue undergoes de-differentiation to form an amorphous meristematic callus. Modulating the auxin:cytokinin ratio induces re-differentiation into organised shoot/root organs, reconstituting the whole plant.',
    hints: [
      'Start with the mature, specialized cell in the intact root.',
      'Next, the cell loses its identity to become a proliferating callus.',
      'Then the callus regains specialization to form roots and shoots.',
    ],
    misconceptionIndex: 1,
  },
  // 18. Androgenesis & Doubled Haploids (Standard - Application)
  {
    id: 'ch_18_androgenesis_colchicine',
    nodeId: NODE_C12_BIOTECH_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Indian rice breeding at CRRI Cuttack, anther culture (androgenesis) is followed by colchicine treatment. Why is colchicine treatment indispensable before field trials?',
    options: [
      'Colchicine acts as an antibiotic to prevent bacterial contamination in the field',
      'Haploid plantlets (n) are sterile due to lack of homologous pairing during meiosis; colchicine doubles the genome to create 100% homozygous fertile diploids (2n) in a single generation',
      'Colchicine transforms monocot rice seedlings into dicotyledonous structures',
      'Colchicine induces polyploid endosperm formation directly inside the leaf',
    ],
    correctIndex: 1,
    explanation: 'Haploid plants arising from microspores possess only one set of chromosomes (n) and cannot pair chromosomes during meiosis, causing complete sterility. Colchicine blocks spindle formation, doubling chromosomes to produce 100% homozygous doubled haploids (DH) in 1 step.',
    hints: [
      'What is the ploidy of a plant regenerated from a pollen grain?',
      'Can single unpaired chromosomes undergo normal meiosis?',
      'Colchicine doubles the chromosome number (n -> 2n), creating fertile homozygous pure-breeding lines.',
    ],
    misconceptionIndex: 1,
  },
  // 19. Triploid Endosperm Culture (Advanced - Analysis)
  {
    id: 'ch_19_endosperm_triploid',
    nodeId: NODE_C12_BIOTECH_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does culturing excised triploid (3n) endosperm tissue result in commercially seedless watermelon and banana fruits?',
    options: [
      'Endosperm tissue secretes seed-destroying ribonucleases into the fruit pulp',
      'Triploid plants have 3 sets of chromosomes which segregate unequally (aneuploid gametes) during meiosis, preventing viable zygote/seed development while allowing parthenocarpic fruit flesh growth',
      'Endosperm tissue lacks chloroplasts, so seeds cannot perform photosynthesis',
      'Triploid plants contain triple the normal auxin concentration, which dissolves seeds',
    ],
    correctIndex: 1,
    explanation: 'In angiosperms, triple fusion generates 3n endosperm. Regenerated 3n plants experience meiotic failure because trivalent chromosome associations cannot divide equally. The resulting gametic sterility produces seedless fruit pulp.',
    hints: [
      'How many sets of chromosomes does endosperm tissue contain after double fertilisation?',
      'What happens when 3 homologous chromosomes attempt to pair and segregate during meiosis?',
      'Unequal 3-way segregation creates inviable seeds, giving seedless commercial fruit.',
    ],
    misconceptionIndex: 0,
  },
  // 20. Embryo Rescue in Wide Hybridisation (Standard - Application)
  {
    id: 'ch_20_embryo_rescue',
    nodeId: NODE_C12_BIOTECH_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When crossing cultivated wheat (Triticum aestivum) with a wild disease-resistant rye grass (Secale), hybrid seeds begin to shrivel and abort. What biotechnology technique overcomes this barrier?',
    options: [
      'Emasculation and bagging of the mature spikes in the field',
      'Embryo Rescue: excising the immature hybrid embryo before abortion and nurturing it on nutrient agar supplemented with sucrose and vitamins',
      'Protoplast transformation using Agrobacterium tumefaciens',
      'Treating the mature seed with gibberellic acid in soil',
    ],
    correctIndex: 1,
    explanation: 'In wide interspecific/intergeneric crosses, hybrid embryos fail due to early endosperm breakdown (post-zygotic barrier). Embryo rescue excises the live immature embryo prior to starvation and supports its full development on synthetic medium.',
    hints: [
      'The hybrid zygote forms, but the maternal endosperm fails to nourish it inside the seed.',
      'We must physically extract the living baby embryo before it dies.',
      'Embryo rescue isolates the immature embryo and grows it on nutrient culture medium.',
    ],
    misconceptionIndex: 1,
  },
  // 21. In-Vitro Pollination vs In-Vivo Barriers (Advanced - Evaluation)
  {
    id: 'ch_21_invitro_pollination',
    nodeId: NODE_C12_BIOTECH_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does in-vitro pollination overcome pre-fertilisation sexual incompatibility barriers that field pollination cannot resolve?',
    options: [
      'It mutates the pollen grain DNA using gamma irradiation in the petri dish',
      'It deposits pollen directly onto excised ovules or placentas on sterile media, physically bypassing stigma/style sporophytic and gametophytic rejection mechanisms',
      'It doubles the chromosome number of the pollen tube using colchicine',
      'It replaces the pollen nucleus with a bacterial plasmid vector',
    ],
    correctIndex: 1,
    explanation: 'Self-incompatibility and interspecific incompatibility barriers operate primarily in the stigma and style (S-RNase, callose deposition). In-vitro pollination directly places pollen on exposed, excised ovules on nutrient agar, bypassing stylar barriers entirely.',
    hints: [
      'Where do natural pollen-pistil incompatibility reactions occur in the flower?',
      'In-vitro pollination applies pollen directly to the excised ovule or placenta.',
      'Bypassing the stigma and style allows pollen tubes to enter the micropyle directly.',
    ],
    misconceptionIndex: 0,
  },
  // 22. PCR Amplification Calculation (Standard - Numeric)
  {
    id: 'ch_22_pcr_math',
    nodeId: NODE_C12_BIOTECH_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If a forensic swab contains exactly 10 initial target double-stranded DNA molecules, how many target DNA copies are theoretically present after 5 complete cycles of PCR? (Formula: N = N0 * 2^n)',
    correctAnswer: 320,
    tolerance: 0,
    unit: 'copies',
    explanation: 'PCR amplification is exponential: N = N0 * 2^n. For N0 = 10 molecules and n = 5 cycles: N = 10 * (2^5) = 10 * 32 = 320 DNA copies.',
    hints: [
      'Each PCR cycle doubles the quantity of DNA molecules.',
      'Calculate 2 raised to the power of 5 (2 * 2 * 2 * 2 * 2).',
      '10 * 32 = 320 copies.',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION STEPS (5 BRILLIANT-STYLE STEPS) ───
const EXPLORATION_STEPS = [
  {
    id: 'step_sanger',
    title: '1. Sanger Chain Termination & Dideoxy Chemistry',
    instruction: 'Drag the ddNTP concentration slider and click each nucleotide base to observe chain termination and autoradiogram ladder band generation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIOTECH_031,
  },
  {
    id: 'step_sdm',
    title: '2. Site-Directed Mutagenesis & DpnI Methylation Filter',
    instruction: 'Toggle the Dam-Methylation switch and trigger DpnI digestion to observe selective cleavage of parental vs mutant plasmid.',
    interactionType: 'toggle-action',
    nodeId: NODE_C12_BIOTECH_032,
  },
  {
    id: 'step_pcr',
    title: '3. PCR Thermal Cycling Simulator & VNTR Profiler',
    instruction: 'Step through Denaturation (95°C), Annealing (55°C), and Extension (72°C) to see exponential DNA duplication and STR band separation.',
    interactionType: 'cycle-stepper',
    nodeId: NODE_C12_BIOTECH_033,
  },
  {
    id: 'step_bioreactor',
    title: '4. Bioreactor Kinetics: Batch vs Chemostat vs Turbidostat',
    instruction: 'Adjust the Dilution Rate (D) and Substrate Feed (S) sliders to explore steady state washout vs biomass accumulation in real-time.',
    interactionType: 'slider-kinetics',
    nodeId: NODE_C12_BIOTECH_035,
  },
  {
    id: 'step_totipotency',
    title: '5. Plant Totipotency: Androgenesis & Embryo Rescue',
    instruction: 'Manipulate Auxin vs Cytokinin hormone ratios and test Colchicine addition to induce organogenesis from haploid pollen callus.',
    interactionType: 'hormone-organogenesis',
    nodeId: NODE_C12_BIOTECH_038,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: In a Sanger reaction with 100% ddNTPs and 0% dNTPs, what will be synthesized after the primer?',
    options: [
      'A normal full-length 1000bp DNA sequence',
      'Only 1 single nucleotide will be added to each primer before total termination',
      'No nucleotides will be incorporated because polymerase requires dNTPs to start',
      'Long random chimeric RNA-DNA fragments',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set the ddNTP ratio to maximum in the simulator to see immediate 1-base chain arrest.',
    nodeId: NODE_C12_BIOTECH_031,
  },
  {
    question: 'Predict: If the dilution rate (D) in a chemostat is increased beyond the organism\'s maximum specific growth rate (µ_max), what happens?',
    options: [
      'Biomass increases exponentially until the tank overflows',
      'The culture washes out completely as cells are drained faster than they can divide',
      'Bacteria spontaneously switch to anaerobic sporulation',
      'The optical sensor automatically increases vessel volume',
    ],
    correctIndex: 1,
    verifyInstruction: 'Slide the Dilution Rate above µ_max in the Bioreactor Lab and watch the biomass curve plummet to zero (Washout).',
    nodeId: NODE_C12_BIOTECH_035,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the Sanger gel bands when you increase the ddNTP:dNTP ratio in the simulator?',
    observableOptions: [
      'Bands shift predominantly toward the bottom (shorter fragments)',
      'Bands shift predominantly toward the top (longer fragments)',
      'All bands turn green and disappear',
      'No change in fragment distribution occurs',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIOTECH_031,
  },
  {
    question: 'Observation: In the hormone organogenesis lab, what morphology develops when Cytokinin is High and Auxin is Low?',
    observableOptions: [
      'Root formation (Rhizogenesis)',
      'Shoot regeneration (Caulogenesis)',
      'Undifferentiated amorphous brown Callus',
      'Immediate seed development without vegetative growth',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_BIOTECH_038,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Bioprocess Architect: Scale-Up Challenge',
  description: 'Design an end-to-end biomanufacturing roadmap for an Indian recombinant therapeutic protein (e.g., Insulin Lispro) from genetic design to 10,000L harvest.',
  steps: [
    '1. Design mutagenic primers to swap B28-Pro/B29-Lys in human proinsulin cDNA.',
    '2. Perform PCR, DpnI digestion of dam-methylated parent plasmid, and confirm sequence via automated capillary electropherogram.',
    '3. Transform recombinant E. coli into a pilot fed-batch bioreactor with exponential glucose feed.',
    '4. Monitor Dissolved Oxygen (DO > 30%) and maintain pH 7.0 via automated NH4OH additions.',
    '5. Downstream: Cell disruption, inclusion body refolding, chromatography purification, and HPLC QC testing.',
  ],
};

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
  nodeId: NODE_C12_BIOTECH_031,
  title: 'DNA Sequencing, Bioprocess Engineering & Plant Biotechnology',
  definition: 'Integrated laboratory applications of molecular cloning, chain-termination sequencing, industrial fermentation kinetics, and plant tissue culture totipotency.',
  eli5: 'Explore how scientists read the genetic code with molecular stop signs, brew life-saving medicines in giant steel vessels, and regrow whole plants from a single pollen grain.',
  misconceptions: [
    {
      misconception: 'Sanger gel autoradiograms are read from the top down.',
      correction: 'Shortest fragments travel farthest and sit at the bottom of the gel; sequence is read 5\' to 3\' from bottom to top.',
    },
    {
      misconception: 'DpnI cuts the newly mutated PCR plasmid.',
      correction: 'DpnI specifically cleaves methylated parental GATC sequences from E. coli, sparing unmethylated mutant strands.',
    },
    {
      misconception: 'Automated sequencing requires four separate gel lanes.',
      correction: 'Automated sequencing uses 4 distinct fluorescent dye labels on ddNTPs, enabling single-capillary laser detection.',
    },
    {
      misconception: 'A chemostat keeps turbidity constant by varying the pump speed.',
      correction: 'A chemostat fixes the dilution rate and limits one nutrient; a turbidostat varies pump speed to hold optical density constant.',
    },
    {
      misconception: 'Haploid plants from anther culture are immediately ready for field farming.',
      correction: 'Haploids are sterile and require colchicine chromosome doubling to form fertile, true-breeding doubled haploids.',
    },
  ],
};

// ─── MAIN COMPONENT ───
function C12_BiotechnologySequencingSangersChainSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'indigo' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-Style Pattern States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab Variables (States for Simulators)
  const [ddNtpRatio, setDdNtpRatio] = useState(20); // 0-100%
  const [selectedBase, setSelectedBase] = useState<'A' | 'T' | 'G' | 'C'>('A');
  const [sdmStage, setSdmStage] = useState<'initial' | 'pcr' | 'dpn1' | 'transformed'>('initial');
  const [isDamMethylated, setIsDamMethylated] = useState(true);
  const [pcrTemp, setPcrTemp] = useState(95); // °C
  const [pcrCycleCount, setPcrCycleCount] = useState(1);
  const [dilutionRate, setDilutionRate] = useState(0.2); // h^-1
  const [substrateConc, setSubstrateConc] = useState(50); // g/L
  const [bioreactorMode, setBioreactorMode] = useState<'batch' | 'fedbatch' | 'chemostat' | 'turbidostat'>('batch');
  const [auxinLevel, setAuxinLevel] = useState(50);
  const [cytokininLevel, setCytokininLevel] = useState(50);
  const [colchicineAdded, setColchicineAdded] = useState(false);
  const [plantTissueState, setPlantTissueState] = useState<'pollen' | 'callus' | 'shoots' | 'roots' | 'doubled_plant'>('pollen');

  // Challenge & Adaptive Mastery States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop & Interactive Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Visual Feedback & Audio States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT & Timer Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 55) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive BKT difficulty updater
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : (mastery === 'developing' ? 'standard' : 'advanced');

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // HTML5 2D Canvas Animation for Bioreactor Kinetics & Electropherogram
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

      if (phase === 'explore' && currentSlide === 0) {
        // Draw Sanger Electropherogram Waveforms
        ctx.lineWidth = 2;
        const bases = [
          { color: '#22c55e', offset: 0, name: 'A' },
          { color: '#ef4444', offset: 40, name: 'T' },
          { color: '#3b82f6', offset: 80, name: 'C' },
          { color: '#eab308', offset: 120, name: 'G' },
        ];

        bases.forEach((b) => {
          ctx.strokeStyle = b.color;
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 5) {
            const peak = Math.sin((x + frame * 1.5 + b.offset) * 0.05);
            const y = canvas.height / 2 - Math.max(0, peak) * 25;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });

        // Laser scan line
        ctx.strokeStyle = '#a855f7';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(canvas.width - 60, 0);
        ctx.lineTo(canvas.width - 60, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Bioprocess Growth Curve / Biomass Simulation
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Axes
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(30, 10);
        ctx.lineTo(30, canvas.height - 20);
        ctx.lineTo(canvas.width - 10, canvas.height - 20);
        ctx.stroke();

        // Draw Monod / Fermentation curve
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let t = 0; t < canvas.width - 40; t += 3) {
          let yVal = 0;
          if (bioreactorMode === 'batch') {
            // Sigmoidal logistic curve
            const k = 0.03;
            const L = canvas.height - 40;
            const t0 = (canvas.width - 40) / 2;
            yVal = L / (1 + Math.exp(-k * (t - t0)));
          } else if (bioreactorMode === 'chemostat') {
            // Steady state flat line after startup
            yVal = t < 60 ? (t / 60) * 45 : 45 + Math.sin(frame * 0.05 + t * 0.1) * 2;
            if (dilutionRate > 0.45) yVal = Math.max(0, 45 - (dilutionRate - 0.45) * 200); // Washout
          } else {
            // Fed-batch linear accumulation
            yVal = Math.min(canvas.height - 35, (t * 0.4) + (substrateConc * 0.3));
          }
          const plotY = (canvas.height - 20) - yVal;
          if (t === 0) ctx.moveTo(30 + t, plotY);
          else ctx.lineTo(30 + t, plotY);
        }
        ctx.stroke();

        // Axis labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText('Biomass (X)', 35, 20);
        ctx.fillText('Time (h)', canvas.width - 50, canvas.height - 5);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide, bioreactorMode, dilutionRate, substrateConc]);

  // Clean up inactivity timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───
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
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Spot on! The lacking 3-OH prevents elongation.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Biotechnology Suite. Manipulate the parameters to discover key mechanisms.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all parameters without scoring pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase initialized. Test your competency on ISC board level questions.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test it on the simulation.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered DNA sequencing, bioprocess kinetics, and plant biotechnology.');
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
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the step-by-step logic together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
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
      let arr = [...prev];
      if (arr.length === 0 && activeChallenge.sortItems) {
        arr = activeChallenge.sortItems.map((_, i) => i);
      }
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleHormoneInteraction = useCallback((aux: number, cyto: number, colch: boolean) => {
    setAuxinLevel(aux);
    setCytokininLevel(cyto);
    setColchicineAdded(colch);
    audioManager.play('count');

    if (colch) {
      setPlantTissueState('doubled_plant');
    } else if (aux > 65 && cyto < 40) {
      setPlantTissueState('roots');
    } else if (cyto > 65 && aux < 40) {
      setPlantTissueState('shoots');
    } else if (aux > 40 && cyto > 40) {
      setPlantTissueState('callus');
    } else {
      setPlantTissueState('pollen');
    }
  }, []);

  // ─── RENDER UI ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="text-3xl p-2 bg-indigo-900/50 rounded-2xl border border-indigo-700"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400">Class 12 ISC Biotechnology</span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Indicators */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-full border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.span
              key={p}
              animate={{
                backgroundColor: phase === p ? '#4f46e5' : 'transparent',
                color: phase === p ? '#ffffff' : '#64748b',
              }}
              className="px-3 py-1 rounded-full font-bold uppercase transition-all"
            >
              {p}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/50 rounded-2xl border border-indigo-700/60 shadow-lg">
            <span className="px-3 py-1 bg-indigo-600/40 text-indigo-300 text-xs font-black uppercase rounded-full border border-indigo-500/40">
              Curiosity Hook
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-3 bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-amber-300">Diagnostic Intuition Check:</h3>
            <p className="text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-semibold transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Dideoxynucleotides lack a 3\'-OH group, preventing phosphodiester bond formation.'
                    : `���️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (5 GUIDED STEPS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">
                Guided Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg disabled:opacity-30 text-xs font-bold"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold"
              >
                {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Free Sandbox →' : 'Next Lab →'}
              </motion.button>
            </div>
          </div>

          <p className="text-amber-300 text-sm font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* Interactive Multi-Representation Visual Container */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            {/* ─── STEP 0: SANGER SEQUENCING & ELECTROPHOREGRAM ─── */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Interactive Gel Simulation */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-indigo-300 mb-2">4-Lane Polyacrylamide Gel Ladder (Manual)</h3>
                    <p className="text-xs text-slate-400 mb-3">Read from bottom (fastest) to top (5\' to 3\')</p>

                    <svg viewBox="0 0 320 220" className="w-full h-48 bg-slate-900 rounded-lg">
                      {/* Lane headers */}
                      <text x="50" y="20" fill="#22c55e" fontSize="12" fontWeight="bold" textAnchor="middle">ddATP</text>
                      <text x="110" y="20" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">ddTTP</text>
                      <text x="170" y="20" fill="#eab308" fontSize="12" fontWeight="bold" textAnchor="middle">ddGTP</text>
                      <text x="230" y="20" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">ddCTP</text>

                      {/* Wells */}
                      <rect x="35" y="28" width="30" height="8" rx="2" fill="#1e293b" />
                      <rect x="95" y="28" width="30" height="8" rx="2" fill="#1e293b" />
                      <rect x="155" y="28" width="30" height="8" rx="2" fill="#1e293b" />
                      <rect x="215" y="28" width="30" height="8" rx="2" fill="#1e293b" />

                      {/* Gel Bands */}
                      <rect x="98" y="190" width="24" height="4" rx="1" fill="#ef4444" opacity={ddNtpRatio > 10 ? 1 : 0.3} />
                      <rect x="218" y="165" width="24" height="4" rx="1" fill="#3b82f6" opacity={ddNtpRatio > 20 ? 1 : 0.4} />
                      <rect x="38" y="140" width="24" height="4" rx="1" fill="#22c55e" opacity={ddNtpRatio > 15 ? 1 : 0.4} />
                      <rect x="158" y="115" width="24" height="4" rx="1" fill="#eab308" opacity={ddNtpRatio > 30 ? 1 : 0.4} />
                      <rect x="98" y="90" width="24" height="4" rx="1" fill="#ef4444" opacity={ddNtpRatio > 40 ? 1 : 0.5} />
                      <rect x="38" y="65" width="24" height="4" rx="1" fill="#22c55e" opacity={ddNtpRatio > 50 ? 0.9 : 0.2} />

                      {/* Read direction arrow */}
                      <line x1="285" y1="195" x2="285" y2="60" stroke="#a855f7" strokeWidth="2" />
                      <text x="295" y="130" fill="#a855f7" fontSize="10" transform="rotate(90, 295, 130)">5\' → 3\'</text>
                    </svg>

                    <div className="mt-3 p-2 bg-slate-900 rounded-lg text-center text-xs font-mono text-emerald-400">
                      Sequence Read (Bottom → Top): <span className="font-bold">5\'- T - C - A - G - T - A - 3\'</span>
                    </div>
                  </div>

                  {/* Right: Automated Capillary Electropherogram Canvas */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-purple-300 mb-2">Automated 4-Color Laser Electropherogram</h3>
                      <p className="text-xs text-slate-400 mb-2">Single capillary detection with fluorescent ddNTP tags</p>
                      <canvas ref={canvasRef} width={360} height={130} className="w-full bg-slate-900 rounded-lg" />
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>ddNTP : dNTP Ratio</span>
                        <span className="font-bold text-indigo-400">{ddNtpRatio}% ddNTP</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={ddNtpRatio}
                        onChange={e => {
                          setDdNtpRatio(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Adjust ddNTP ratio"
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Predict & Observation Hook in Slide 0 */}
                <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/40 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300">Active Discovery: Predict-Then-Check</h4>
                  {!predictionMade ? (
                    <div className="space-y-2">
                      <p className="text-sm text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left bg-slate-800 text-xs rounded-lg hover:bg-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs space-y-2">
                      <p className="text-amber-300">
                        Prediction Result: {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex ? '✓ Correct!' : 'ℹ️ Note:'} At 100% ddNTPs, the very first nucleotide halts synthesis instantly!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* ─── STEP 1: SITE DIRECTED MUTAGENESIS & DpnI FILTER ─── */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left: Plasmid Architecture Diagram */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-indigo-300 mb-2">Plasmid Methylation & DpnI Cleavage</h3>
                    <svg viewBox="0 0 300 200" className="w-full h-48">
                      {/* Parental Plasmid (Methylated - Orange) */}
                      <circle cx="100" cy="100" r="60" fill="none" stroke={isDamMethylated ? '#f97316' : '#64748b'} strokeWidth="6" strokeDasharray={sdmStage === 'dpn1' && isDamMethylated ? '8, 8' : '0'} />
                      <text x="100" y="95" fill="#f97316" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {sdmStage === 'dpn1' && isDamMethylated ? 'CLEAVED (DpnI)' : 'Parent Plasmid'}
                      </text>
                      <text x="100" y="112" fill="#94a3b8" fontSize="8" textAnchor="middle">
                        {isDamMethylated ? 'dam+ Methylated GATC' : 'Unmethylated'}
                      </text>

                      {/* In Vitro Mutated Strand (Unmethylated - Emerald) */}
                      {sdmStage !== 'initial' && (
                        <>
                          <circle cx="210" cy="100" r="60" fill="none" stroke="#10b981" strokeWidth="6" />
                          <circle cx="255" cy="65" r="7" fill="#ef4444" />
                          <text x="210" y="95" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">
                            Mutant Plasmid
                          </text>
                          <text x="210" y="112" fill="#cbd5e1" fontSize="8" textAnchor="middle">
                            Lispro (B28-Lys, B29-Pro)
                          </text>
                        </>
                      )}
                    </svg>

                    <div className="flex justify-between items-center text-xs mt-2 p-2 bg-slate-900 rounded-lg">
                      <span className="text-slate-300">Host dam-Methylation:</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsDamMethylated(!isDamMethylated);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1 rounded-md font-bold ${
                          isDamMethylated ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {isDamMethylated ? 'dam+ (Methylated)' : 'dam- (No Methyl)'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Right: Step-by-Step SDM Pipeline */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">Site Directed Mutagenesis Reaction Stages</h3>
                    {[
                      { id: 'initial', label: '1. Denature Parental dam+ Plasmid Template' },
                      { id: 'pcr', label: '2. Anneal Mutagenic Primers & PCR Extend' },
                      { id: 'dpn1', label: '3. Add DpnI Endonuclease (Digest Methylated GATC)' },
                      { id: 'transformed', label: '4. Transform Surviving Mutant into E. coli' },
                    ].map((st) => (
                      <motion.button
                        key={st.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSdmStage(st.id as any);
                          audioManager.play('tap');
                          speechManager.speak(st.label);
                        }}
                        className={`w-full p-3 text-left text-xs font-bold rounded-xl border transition-all ${
                          sdmStage === st.id
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {st.label}
                      </motion.button>
                    ))}
                    <p className="text-xs text-emerald-400 p-2 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                      Outcome: Insulin Lispro analogue prevents zinc hexamerisation, acting within 15 minutes!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 2: PCR THERMAL CYCLER & VNTR PROFILER ─── */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Thermal Cycler Chamber */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-bold text-cyan-300">PCR Thermal Block Simulator</h3>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/50 px-2.5 py-1 rounded-md border border-amber-800">
                        Temp: {pcrTemp}°C
                      </span>
                    </div>

                    <div className="h-36 bg-slate-900 rounded-lg flex flex-col justify-center items-center relative overflow-hidden border border-slate-800">
                      {pcrTemp === 95 && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center space-y-1">
                          <span className="text-xs font-bold text-red-400 uppercase tracking-widest">🔥 Denaturation (95°C)</span>
                          <p className="text-xs text-slate-300">Hydrogen bonds melt; double helix unzips into single strands.</p>
                        </motion.div>
                      )}
                      {pcrTemp === 55 && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center space-y-1">
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">❄️ Annealing (55°C)</span>
                          <p className="text-xs text-slate-300">Forward & Reverse primers hybridize to complementary flanks.</p>
                        </motion.div>
                      )}
                      {pcrTemp === 72 && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center space-y-1">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">⚡ Taq Extension (72°C)</span>
                          <p className="text-xs text-slate-300">Taq polymerase incorporates dNTPs (5\' → 3\' elongation).</p>
                        </motion.div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[
                        { label: 'Denature (95°C)', temp: 95, color: 'bg-rose-900/60 text-rose-200 border-rose-700' },
                        { label: 'Anneal (55°C)', temp: 55, color: 'bg-blue-900/60 text-blue-200 border-blue-700' },
                        { label: 'Extend (72°C)', temp: 72, color: 'bg-emerald-900/60 text-emerald-200 border-emerald-700' },
                      ].map(b => (
                        <motion.button
                          key={b.temp}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setPcrTemp(b.temp);
                            if (b.temp === 72) setPcrCycleCount(c => c + 1);
                            audioManager.play('tap');
                          }}
                          className={`p-2 rounded-lg text-xs font-bold border ${b.color}`}
                        >
                          {b.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Exponential DNA Yield Calculator */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-indigo-300 mb-2">Exponential Amplification Kinetics</h3>
                      <p className="text-xs text-slate-400 mb-4">Formula: <span className="font-mono text-indigo-400">N = N₀ × 2ⁿ</span> (n = cycle count)</p>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Completed Cycles (n):</span>
                          <span className="font-bold text-white">{pcrCycleCount}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Theoretical DNA Copies:</span>
                          <span className="font-bold text-emerald-400 text-sm">{Math.pow(2, Math.min(30, pcrCycleCount)).toLocaleString()} copies</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full"
                            animate={{ width: `${Math.min(100, (pcrCycleCount / 30) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setPcrCycleCount(1);
                        audioManager.play('pop');
                      }}
                      className="mt-3 p-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-700"
                    >
                      Reset Cycle Count
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 3: BIOREACTOR KINETICS & CONTINUOUS CULTURE ─── */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Interactive Fermenter Vessel Cutaway */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-cyan-300 mb-2">Stirred-Tank Bioreactor Architecture</h3>
                    <svg viewBox="0 0 300 220" className="w-full h-48 bg-slate-900 rounded-lg">
                      <rect x="70" y="20" width="160" height="180" rx="20" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
                      <path d="M60 40 L60 190 A20 20 0 0 0 80 210" fill="none" stroke="#38bdf8" strokeWidth="4" />
                      <path d="M240 40 L240 190 A20 20 0 0 1 220 210" fill="none" stroke="#38bdf8" strokeWidth="4" />
                      <text x="35" y="115" fill="#38bdf8" fontSize="8" fontWeight="bold">Jacket</text>
                      <line x1="150" y1="10" x2="150" y2="180" stroke="#cbd5e1" strokeWidth="4" />
                      <rect x="110" y="100" width="80" height="8" rx="2" fill="#94a3b8" />
                      <rect x="110" y="150" width="80" height="8" rx="2" fill="#94a3b8" />
                      <text x="150" y="106" fill="#0f172a" fontSize="6" textAnchor="middle" fontWeight="bold">Impeller</text>
                      <line x1="110" y1="190" x2="190" y2="190" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3, 3" />
                      <text x="150" y="202" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">Sparger (Air)</text>
                      <line x1="75" y1="70" x2="120" y2="70" stroke="#ec4899" strokeWidth="2" />
                      <text x="95" y="65" fill="#ec4899" fontSize="7" fontWeight="bold">pH / DO Probe</text>
                    </svg>

                    <div className="grid grid-cols-4 gap-1.5 mt-3">
                      {(['batch', 'fedbatch', 'chemostat', 'turbidostat'] as const).map(m => (
                        <motion.button
                          key={m}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setBioreactorMode(m);
                            audioManager.play('tap');
                          }}
                          className={`p-2 rounded-lg text-xs font-bold uppercase ${
                            bioreactorMode === m ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {m}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Chemostat Kinetics Sliders */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-indigo-300 mb-1">Growth Kinetics & Washout Engine</h3>
                      <p className="text-xs text-slate-400 mb-3">Dilution rate D = Flow (F) / Volume (V). At steady state, µ = D.</p>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Dilution Rate (D):</span>
                            <span className="font-bold text-cyan-400">{dilutionRate.toFixed(2)} h⁻¹</span>
                          </div>
                          <input
                            type="range"
                            min="0.05"
                            max="0.8"
                            step="0.02"
                            value={dilutionRate}
                            onChange={e => {
                              setDilutionRate(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            aria-label="Set Dilution Rate"
                            className="w-full accent-cyan-400"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Limiting Substrate (S):</span>
                            <span className="font-bold text-amber-400">{substrateConc} g/L</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="150"
                            value={substrateConc}
                            onChange={e => {
                              setSubstrateConc(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            aria-label="Set Substrate Concentration"
                            className="w-full accent-amber-400"
                          />
                        </div>

                        <div className={`p-3 rounded-xl border text-xs font-bold ${
                          dilutionRate > 0.45
                            ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                            : 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                        }`}>
                          {dilutionRate > 0.45
                            ? '⚠️ WASHOUT CONDITION: Dilution rate exceeds µ_max! Microbes are draining faster than division.'
                            : '✓ STABLE STEADY STATE: Cell division matches effluent outflow rate (dX/dt = 0).'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 4: PLANT TOTIPOTENCY, ANDROGENESIS & EMBRYO RESCUE ─── */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left: Organogenesis Visualiser */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <h3 className="text-sm font-bold text-indigo-300 mb-2">Tissue Differentiation Simulator</h3>

                    <div className="h-44 bg-slate-900 rounded-lg flex flex-col justify-center items-center p-4 border border-slate-800">
                      {plantTissueState === 'pollen' && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-1">
                          <span className="text-3xl">🟡</span>
                          <p className="text-xs font-bold text-amber-300">Haploid Microspore / Pollen (n)</p>
                          <p className="text-xs text-slate-400">Explant ready for androgenesis on MS medium.</p>
                        </motion.div>
                      )}
                      {plantTissueState === 'callus' && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-1">
                          <span className="text-3xl">🧫</span>
                          <p className="text-xs font-bold text-yellow-300">De-differentiated Callus</p>
                          <p className="text-xs text-slate-400">Unorganised, friable meristematic parenchyma mass.</p>
                        </motion.div>
                      )}
                      {plantTissueState === 'shoots' && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-1">
                          <span className="text-3xl">🌱</span>
                          <p className="text-xs font-bold text-emerald-400">Caulogenesis (Shoots Regenerating)</p>
                          <p className="text-xs text-slate-400">High Cytokinin : Low Auxin ratio induces shoot buds.</p>
                        </motion.div>
                      )}
                      {plantTissueState === 'roots' && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-1">
                          <span className="text-3xl">🌿</span>
                          <p className="text-xs font-bold text-amber-500">Rhizogenesis (Root Induction)</p>
                          <p className="text-xs text-slate-400">High Auxin : Low Cytokinin ratio promotes rooting.</p>
                        </motion.div>
                      )}
                      {plantTissueState === 'doubled_plant' && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-1">
                          <span className="text-3xl">🌾</span>
                          <p className="text-xs font-bold text-green-300">Doubled Haploid Plantlet (2n - 100% Homozygous)</p>
                          <p className="text-xs text-slate-400">Colchicine chromosome doubling ensures complete fertility!</p>
                        </motion.div>
                      )}
                    </div>

                    <div className="mt-3 flex justify-between items-center bg-slate-900 p-2.5 rounded-lg text-xs">
                      <span className="text-slate-300">Colchicine Spindle Blocker:</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleHormoneInteraction(auxinLevel, cytokininLevel, !colchicineAdded)}
                        className={`px-3 py-1 rounded-md font-bold ${
                          colchicineAdded ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {colchicineAdded ? 'Colchicine Active (2n)' : 'No Colchicine (n)'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Right: Auxin vs Cytokinin Sliders */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white">Hormonal Ratio Control</h3>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Auxin Concentration (Rooting):</span>
                        <span className="font-bold text-amber-400">{auxinLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={auxinLevel}
                        onChange={e => handleHormoneInteraction(Number(e.target.value), cytokininLevel, colchicineAdded)}
                        aria-label="Set Auxin Level"
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Cytokinin Concentration (Shooting):</span>
                        <span className="font-bold text-emerald-400">{cytokininLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={cytokininLevel}
                        onChange={e => handleHormoneInteraction(auxinLevel, Number(e.target.value), colchicineAdded)}
                        aria-label="Set Cytokinin Level"
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <p className="text-xs text-indigo-300 bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/40">
                      💡 Rule of Organogenesis: High Cytokinin/Auxin ratio = Shoots. High Auxin/Cytokinin ratio = Roots. Balanced = Callus.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="px-2.5 py-0.5 bg-green-900/60 text-green-300 text-xs font-bold rounded-md border border-green-700">
                Sandbox Mode
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Multi-Parametric Bioprocess Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">
                Freely modulate fermentation kinetics, PCR cycling, and Sanger base terminations.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 text-sm"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control Pod 1: Sanger */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Sanger Dideoxy Module</h3>
              <label className="text-xs text-slate-300 block">ddNTP Mix: {ddNtpRatio}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={ddNtpRatio}
                onChange={e => setDdNtpRatio(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-xs font-mono text-emerald-400 pt-2 border-t border-slate-800">
                <span>Base: {selectedBase}</span>
                <span>Terminations: High</span>
              </div>
            </div>

            {/* Control Pod 2: Bioreactor */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Fermentation Chemostat</h3>
              <label className="text-xs text-slate-300 block">Dilution Rate: {dilutionRate} h⁻¹</label>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.02"
                value={dilutionRate}
                onChange={e => setDilutionRate(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-xs font-mono text-cyan-400 pt-2 border-t border-slate-800">
                <span>Mode: {bioreactorMode}</span>
                <span>{dilutionRate > 0.45 ? 'Washout!' : 'Steady State'}</span>
              </div>
            </div>

            {/* Control Pod 3: Plant Culture */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Totipotency Regulator</h3>
              <label className="text-xs text-slate-300 block">Auxin : Cytokinin Balance</label>
              <input
                type="range"
                min="0"
                max="100"
                value={auxinLevel}
                onChange={e => handleHormoneInteraction(Number(e.target.value), 100 - Number(e.target.value), colchicineAdded)}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-xs font-mono text-amber-400 pt-2 border-t border-slate-800">
                <span>Morphology:</span>
                <span className="capitalize font-bold">{plantTissueState}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE (22 PROGRESSIVE CHALLENGES) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Adaptive Badges */}
          <div className="flex flex-wrap items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-lg font-bold text-white">Competency Assessment (NEP 2020 / CISCE)</h2>
            </div>

            <div className="flex items-center gap-2">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                    : 'bg-blue-950/80 border-blue-500 text-blue-300'
                }`}
              >
                Tier: {difficulty}
              </motion.span>
              <span className="px-2.5 py-1 bg-purple-950/80 border border-purple-500 text-purple-300 rounded-full text-xs font-bold uppercase">
                {activeChallenge.competencyLevel}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
            wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'border-slate-800'
          }`}>
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-semibold transition-all border ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center leading-6 text-xs mr-3 font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG-LABEL CHALLENGE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag Labels onto Target Boxes:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg cursor-grab text-xs font-bold"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'part_impeller', name: 'Rotating Mixing Blades' },
                    { id: 'part_sparger', name: 'Base Sterile Air Injector' },
                    { id: 'part_jacket', name: 'Outer Temperature Shell' },
                    { id: 'part_probes', name: 'Immersed Sensor Array' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[70px] flex flex-col justify-center items-center ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs text-slate-400 font-medium">{target.name}</span>
                      <span className="text-xs font-bold text-white mt-1">
                        {droppedLabels[target.id] || 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT CHALLENGE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 mb-2">Drag steps into correct sequential order:</p>
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
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 text-center leading-5 font-bold text-xs">
                      {displayIdx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC CHALLENGE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm w-full focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-400 font-bold whitespace-nowrap">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider">Step-by-Step Rationale</span>
                  <span className="text-xs text-amber-300/80">
                    Step {revealedSteps + 1} of {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold ml-auto shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 rounded-2xl border border-emerald-600/50 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Module Mastery Achieved!</h2>
            <p className="text-sm text-slate-300">
              Final Proficiency Score:{' '}
              <span className="text-emerald-400 font-extrabold text-lg">{Math.max(0, 100 - errors * 5)}%</span>
            </p>
            <p className="text-xs text-indigo-300 font-mono">BKT Knowledge State: {masteryLevel.toUpperCase()}</p>
          </div>

          {/* Motivational Feedback Card */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-sm">
            <p className="text-slate-200">
              {errors === 0
                ? 'PERFECT SCORE! 🌟 Flawless Mastery! You possess exhaustive conceptual and numerical competency across all Class 12 biotechnology modules.'
                : errors <= 3
                ? 'Great work! 👍 Superb performance! You demonstrate strong analytical insight into bioprocess kinetics and Sanger sequencing.'
                : errors <= 7
                ? 'Good effort! 💪 Review the targeted profile below to solidify your understanding of DpnI selection and chemostat washout.'
                : 'Do not give up — You WILL get this! 💪 Keep practicing and reviewing the key concepts to master the material.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Remediation Profile:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = DEFAULT_PROPS.misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ Gapped Premise: {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ Correct Mechanism: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-indigo-950/60 rounded-2xl border border-indigo-500/50 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg shadow-indigo-950/40">
            <div className="flex items-center gap-3.5">
              <span className="text-3xl p-2 bg-indigo-900/60 rounded-xl border border-indigo-600/40">����</span>
              <div>
                <h4 className="text-sm font-bold text-indigo-200">Spaced Repetition Schedule (SRS)</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Optimized retention window based on performance ({errors} error{errors === 1 ? '' : 's'}).
                </p>
              </div>
            </div>
            <div className="px-5 py-2.5 bg-indigo-600/30 border border-indigo-400/50 rounded-xl text-center min-w-[170px]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300 block">Next Target Review</span>
              <span className="text-sm font-black text-emerald-300">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
          </div>

          {/* Real-World Industry Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK SYSTEM POPUPS (SIM-ENGINE) ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Section Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiotechnologySequencingSangersChainSim;