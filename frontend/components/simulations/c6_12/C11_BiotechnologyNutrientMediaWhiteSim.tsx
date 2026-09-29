'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (CISCE Class 11 Biotechnology) ───
const NODE_C11_BIOTECH_051 = 'c11_biotech_051';
const NODE_C11_BIOTECH_052 = 'c11_biotech_052';
const NODE_C11_BIOTECH_053 = 'c11_biotech_053';
const NODE_C11_BIOTECH_054 = 'c11_biotech_054';
const NODE_C11_BIOTECH_055 = 'c11_biotech_055';
const ALL_NODE_IDS = [
  NODE_C11_BIOTECH_051,
  NODE_C11_BIOTECH_052,
  NODE_C11_BIOTECH_053,
  NODE_C11_BIOTECH_054,
  NODE_C11_BIOTECH_055,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'National Cell Repository & Tissue Culture Hub',
  intro: 'Welcome to the National Centre for Cell Science (NCCS), Pune. You have been appointed Principal Culture Technologist. Your mission is to formulate specialized nutrient media, balance phytohormones to regenerate elite crops, bank critical mammalian cell lines at -196°C in liquid nitrogen, and master aseptic laminar flow protocols and microbial diagnostics.',
  context: 'A single contaminated flask, improper hormone ratio, or thermal shock during cryopreservation can destroy months of biopharmaceutical and agricultural research.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'A biotechnology lab needs to culture mammalian Vero cells (adherent), human T-lymphocytes (suspension), tobacco shoot callus, and tomato root tips. Can they all grow in the same universal nutrient broth?',
  options: [
    'Yes — all cells require the exact same vitamins, sugars, and salts.',
    'No — prokaryotes, plant organs, and adherent vs suspension mammalian cells have starkly different nutrient, salt, and attachment requirements.',
    'Yes — as long as 10% Fetal Bovine Serum is added to plain water.',
    'No — but only because plant cells require animal blood serum to divide.',
  ],
  correctIndex: 1,
  hintAfter: 'Every cell type has unique metabolic machinery, ionic tolerances, and attachment demands. Let us explore the molecular recipe book!',
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct' | 'evaluate' | 'analysis';
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

// ─── 21 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_f01',
    nodeId: NODE_C11_BIOTECH_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which nutrient medium contains tryptone (casein hydrolysate), yeast extract, and NaCl, making it ideal for bacterial culture like E. coli?',
    options: [
      'MS (Murashige and Skoog) Medium',
      'LB (Luria-Bertani) Broth',
      'White’s Medium',
      'DMEM (Dulbecco’s Modified Eagle Medium)',
    ],
    correctIndex: 1,
    explanation: 'LB (Luria-Bertani) broth consists of tryptone for amino acids and peptides, yeast extract for B-vitamins and trace factors, and NaCl for osmotic homeostasis.',
    hints: [
      'Think of the standard broth used in recombinant DNA plasmid multiplication in bacteria.',
      'The abbreviation starts with L and B (Luria-Bertani).',
      'MS is for plants; DMEM is for mammalian adherent cells; LB is the classic bacterial medium.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C11_BIOTECH_051,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does White’s medium differ fundamentally from standard Murashige and Skoog (MS) medium in plant tissue culture?',
    options: [
      'White’s has a much lower inorganic salt concentration, making it gentle and suited for isolated root cultures.',
      'White’s contains 50% animal serum while MS contains only distilled water.',
      'White’s medium lacks any carbon source or vitamins.',
      'White’s is strictly a solid gel while MS is exclusively a gas phase.',
    ],
    correctIndex: 0,
    explanation: 'White’s medium is a low-salt formulation developed specifically to prevent osmotic stress in delicate root tips and allow organized elongation without triggering callus.',
    hints: [
      'High salt concentrations in standard MS can induce callus or stress delicate root hairs.',
      'White’s medium is famous as a low-salt specialized plant medium.',
      'It was specifically tailored for root and root-tip organ culture.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C11_BIOTECH_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which group of chemical components in plant tissue culture media includes Nitrogen, Phosphorus, Potassium, Calcium, Magnesium, and Sulphur?',
    options: [
      'Inorganic Micronutrients',
      'Inorganic Macronutrients',
      'Antimycotics',
      'Cryoprotectants',
    ],
    correctIndex: 1,
    explanation: 'N, P, K, Ca, Mg, and S are inorganic macronutrients required in milligram-per-litre (mM) quantities for cellular structural and metabolic macromolecules.',
    hints: [
      'These elements are required in comparatively large quantities (mg/L).',
      'Nitrogen builds proteins and DNA; Magnesium forms the core of chlorophyll.',
      'Large amount elements are called macronutrients.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C11_BIOTECH_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard operating temperature for cryopreservation of cell lines in liquid nitrogen?',
    options: [
      '-20°C',
      '-80°C',
      '-196°C',
      '0°C',
    ],
    correctIndex: 2,
    explanation: 'Liquid nitrogen maintains samples at -196°C (77 K), where thermal kinetic energy is virtually zero, halting all metabolic, enzymatic, and chemical degradation.',
    hints: [
      'Standard domestic freezers reach -20°C; ultra-low freezers reach -80°C.',
      'Liquid nitrogen boils at approximately 77 Kelvin.',
      '-196°C is the boiling point of liquid nitrogen.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C11_BIOTECH_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is an antimycotic agent added to culture media to specifically prevent fungal and yeast contamination?',
    options: [
      'Ampicillin',
      'Gentamicin',
      'Amphotericin B',
      'Kinetin',
    ],
    correctIndex: 2,
    explanation: 'Amphotericin B is an antimycotic (antifungal) that binds ergosterol in fungal membranes; ampicillin and gentamicin are antibacterial antibiotics.',
    hints: [
      'Look for the drug that targets fungal cell membranes containing ergosterol.',
      'Ampicillin and Gentamicin target bacterial ribosomes and cell walls.',
      'Amphotericin B is the canonical antimycotic.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C11_BIOTECH_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What colour do Lactobacillus bacteria appear after a standard Gram stain procedure, and what does this signify?',
    options: [
      'Pink/Red — indicating they are Gram-negative with a thin cell wall.',
      'Purple/Violet — indicating they are Gram-positive with a thick peptidoglycan layer.',
      'Green — indicating endospore formation.',
      'Colourless — because lactic acid bleaches all synthetic stains.',
    ],
    correctIndex: 1,
    explanation: 'Lactobacillus is a Gram-positive rod with a thick peptidoglycan wall that retains the crystal violet-iodine mordant complex, appearing purple/violet under microscopy.',
    hints: [
      'Gram-positive cells retain the primary Crystal Violet stain.',
      'Lactobacillus walls have dense cross-linked peptidoglycan.',
      'The result is a distinctive royal purple/violet.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C11_BIOTECH_052,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the standard optimal pH range for preparing plant tissue culture media like Murashige & Skoog (MS) before autoclaving? (Enter standard target mid-point)',
    correctAnswer: 5.75,
    tolerance: 0.15,
    unit: 'pH',
    explanation: 'Plant tissue culture media are adjusted to pH 5.6 – 5.8 (optimal ~5.7 to 5.8) prior to autoclaving to ensure nutrient solubility and proper agar gelling.',
    hints: [
      'Plant cell culture media are slightly acidic compared to mammalian media (pH 7.4).',
      'The standard ISC range is between 5.6 and 5.8.',
      'Enter a value between 5.6 and 5.8 (e.g., 5.75).',
    ],
  },

  // Standard Tier (8-14)
  {
    id: 'ch_s08',
    nodeId: NODE_C11_BIOTECH_051,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A vaccine research unit in Pune cultures human lung fibroblasts (adherent) and Jurkat T-cell leukemia cells (suspension). Which media configuration is correct?',
    options: [
      'Fibroblasts in DMEM + 10% FBS; Jurkat cells in RPMI 1640 + 10% FBS.',
      'Fibroblasts in LB broth; Jurkat cells in White’s medium.',
      'Fibroblasts in White’s medium; Jurkat cells in MS medium.',
      'Both must be cultured in pure Fetal Bovine Serum without any basal medium.',
    ],
    correctIndex: 0,
    explanation: 'DMEM (high glucose/amino acids) is formulated for adherent mammalian cell lines like fibroblasts; RPMI 1640 is designed for lymphocyte suspension lines; both require FBS for growth factors.',
    hints: [
      'Adherent cells stick to the bottom of the flask; suspension cells float.',
      'DMEM is Dulbecco’s Modified Eagle Medium for adherent lines; RPMI 1640 is for lymphocytes/suspension.',
      'FBS provides vital hormones and attachment factors as a supplement.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_s09',
    nodeId: NODE_C11_BIOTECH_052,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag the correct medium components to their functional categories in the media preparation diagram.',
    dragItems: [
      { label: 'NAA / 2,4-D', targetId: 'target_auxin' },
      { label: 'BAP / Kinetin', targetId: 'target_cytokinin' },
      { label: 'Sucrose (2-3%)', targetId: 'target_carbon' },
      { label: 'Agar (0.8%)', targetId: 'target_gelling' },
    ],
    correctMapping: {
      target_auxin: 'NAA / 2,4-D',
      target_cytokinin: 'BAP / Kinetin',
      target_carbon: 'Sucrose (2-3%)',
      target_gelling: 'Agar (0.8%)',
    },
    explanation: 'NAA and 2,4-D are synthetic auxins; BAP and kinetin are cytokinins; sucrose is the carbon/energy source; agar provides the semi-solid matrix.',
    hints: [
      'Auxins stimulate cell elongation and root induction.',
      'Cytokinins stimulate shoot bud formation and cytokinesis.',
      'Sucrose fuels cellular respiration; agar solidifies the medium upon cooling.',
    ],
  },
  {
    id: 'ch_s10',
    nodeId: NODE_C11_BIOTECH_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a plant tissue culture experiment, you add a High Cytokinin to Low Auxin ratio (e.g., 2.0 mg/L BAP and 0.1 mg/L NAA) to tobacco pith explants. What developmental outcome do you observe?',
    options: [
      'Extensive root formation without any aerial shoot structures (Rhizogenesis).',
      'Profuse multiple shoot bud induction and proliferation (Caulogenesis).',
      'Immediate cellular apoptosis and browning.',
      'Complete suspension of all cell division.',
    ],
    correctIndex: 1,
    explanation: 'Skoog and Miller’s classic hormonal balance rule dictates: high cytokinin:auxin ratio triggers shoot regeneration (caulogenesis), high auxin:cytokinin triggers roots (rhizogenesis), and balanced ratios induce undifferentiated callus.',
    hints: [
      'Cytokinins promote shoot apical meristem activation and cell division.',
      'High cytokinin + low auxin = shoots.',
      'High auxin + low cytokinin = roots.',
    ],
  },
  {
    id: 'ch_s11',
    nodeId: NODE_C11_BIOTECH_053,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the standard chronological steps required for successfully cryopreserving a mammalian cell line.',
    sortItems: [
      'Harvest healthy log-phase cells and resuspend in medium + 10% DMSO cryoprotectant.',
      'Perform controlled-rate slow freezing at -1°C/minute down to -80°C.',
      'Transfer cryovials into liquid nitrogen storage tank at -196°C.',
      'When needed, perform rapid thawing in a 37°C water bath and wash out DMSO.',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Cells must be harvested in log phase, mixed with DMSO cryoprotectant, cooled slowly at -1°C/min to dehydrate without intracellular ice formation, stored at -196°C, and later thawed rapidly at 37°C to prevent ice recrystallisation.',
    hints: [
      'Cryoprotectant must be added before any freezing commences.',
      'Controlled slow cooling comes before transferring to liquid nitrogen.',
      'Rapid warming at 37°C is the final recovery step.',
    ],
  },
  {
    id: 'ch_s12',
    nodeId: NODE_C11_BIOTECH_054,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is working within a Laminar Airflow (LAF) cabinet alone INSUFFICIENT if media and glassware are not autoclaved?',
    options: [
      'LAF hoods only generate heat, not sterile air filtration.',
      'LAF filters incoming air with HEPA filters to create a sterile work zone, but cannot sterilise pre-contaminated materials placed inside.',
      'HEPA filters only trap water vapor, allowing all bacteria and spores to pass.',
      'Airflow blowing through the hood actively injects viral contaminants onto the agar.',
    ],
    correctIndex: 1,
    explanation: 'Aseptic technique is a layered defense: HEPA-filtered laminar air prevents airborne contaminants from falling into vessels, but liquids and tools must be pre-sterilised by autoclaving or filtration.',
    hints: [
      'HEPA filters purify the ambient air blown across the benchtop.',
      'If your liquid medium already contains bacterial spores, clean air outside cannot kill them.',
      'Sterility requires both a clean workspace AND pre-sterilised reagents.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_s13',
    nodeId: NODE_C11_BIOTECH_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During incubation of inoculated Petri dishes containing Lactobacillus from curd, why are the plates incubated INVERTED (upside down) at 37°C?',
    options: [
      'To expose the bacteria directly to gravity-induced division.',
      'To prevent condensation droplets on the lid from dripping onto the agar and spreading colonies into a confluent smear.',
      'To prevent oxygen from entering the bottom of the dish.',
      'Because Gram-positive bacteria can only metabolise upside down.',
    ],
    correctIndex: 1,
    explanation: 'Inverted incubation ensures that moisture condensing on the Petri dish lid remains trapped on the plastic rim rather than dripping onto the agar, preserving distinct, isolated single colonies.',
    hints: [
      'Warm agar releases water vapor in the 37°C incubator.',
      'Water droplets on the lid could drip down onto bacterial streaks.',
      'Keeping dishes inverted prevents droplet pooling.',
    ],
  },
  {
    id: 'ch_s14',
    nodeId: NODE_C11_BIOTECH_053,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the optimal controlled cooling rate (in °C per minute) recommended inside a isopropanol container (Mr. Frosty) prior to liquid nitrogen immersion?',
    correctAnswer: 1.0,
    tolerance: 0.2,
    unit: '°C/min',
    explanation: 'A cooling rate of -1°C/min allows intracellular water to efflux osmotically into the hypertonic extracellular space without causing severe cellular dehydration or intracellular ice crystals.',
    hints: [
      'Too fast (>10°C/min) creates lethal intracellular ice needles.',
      'Too slow (<0.1°C/min) causes severe toxic solute concentration effects.',
      'The gold-standard cooling rate is exactly 1°C per minute.',
    ],
  },

  // Advanced Tier (15-21)
  {
    id: 'ch_a15',
    nodeId: NODE_C11_BIOTECH_051,
    type: 'evaluate',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A biotechnology startup claims: "We can replace all basal media (DMEM/RPMI) entirely by culturing human embryonic kidney (HEK293) cells in 100% pure Fetal Bovine Serum (FBS) to maximise growth." Evaluate this proposal.',
    options: [
      'Flawed — FBS is an undefined biological supplement lacking the defined buffering capacity, glucose, balanced amino acids, and osmotic control of basal synthetic media.',
      'Excellent — FBS contains every required nutrient in vastly higher concentrations than any chemical media.',
      'Acceptable — but only if sucrose is added instead of glucose.',
      'Flawed — because FBS can only support plant callus growth, not animal cells.',
    ],
    correctIndex: 0,
    explanation: 'FBS is a complex supplement providing growth factors, hormones, and attachment proteins (fibronectin). It is NOT a complete medium and lacks the stoichiometric amino acid, vitamin, glucose, and bicarbonate buffer balance of DMEM/RPMI.',
    hints: [
      'Remember that FBS is a serum supplement, not a basal medium.',
      'Cells need precise millimolar glucose, amino acids, vitamins, and pH buffering.',
      'Standard protocols use 5–15% FBS added to synthetic basal medium.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_a16',
    nodeId: NODE_C11_BIOTECH_052,
    type: 'analysis',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A researcher autoclaves Murashige and Skoog medium containing heat-labile plant hormones (IAA and Zeatin) at 121°C for 20 minutes. Upon inoculation, explants fail to grow. What was the biochemical error?',
    options: [
      'Autoclaving made the agar permanently liquid.',
      'Heat-labile hormones degraded during thermal autoclaving; they should have been 0.22 µm membrane filter-sterilised and added post-cooling (~45°C).',
      'Sucrose transformed into pure cyanide under high steam pressure.',
      'The inorganic macronutrients vaporized into the autoclave chamber.',
    ],
    correctIndex: 1,
    explanation: 'Natural auxins (IAA) and cytokinins (zeatin/kinetin) are thermolabile and break down at 121°C autoclaving. They must be cold filter-sterilised through a 0.22 µm syringe filter and added aseptically after the medium has cooled to ~45–50°C.',
    hints: [
      'Some organic molecules and hormones cannot withstand 121°C saturated steam.',
      'Thermolabile compounds must be sterilised by filtration, not heat.',
      'They are spiked into cooled molten medium just before pouring.',
    ],
  },
  {
    id: 'ch_a17',
    nodeId: NODE_C11_BIOTECH_053,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is RAPID thawing in a 37°C water bath mandatory for cryopreserved vials, whereas SLOW thawing at room temperature results in massive cell death?',
    options: [
      'Slow thawing allows small, non-lethal micro-ice crystals to agglomerate and grow into large, lethal crystals (ice recrystallisation) that puncture cell membranes.',
      'Rapid thawing denatures the toxic DMSO cryoprotectant immediately.',
      'Liquid nitrogen explodes if warmed slowly.',
      'Slow thawing causes the cell wall of animal cells to harden irreversibly.',
    ],
    correctIndex: 0,
    explanation: 'During warming between -50°C and 0°C, ice crystals tend to fuse into large jagged crystalline matrices (recrystallisation). Rapid warming passes through this dangerous thermodynamic transition zone in seconds.',
    hints: [
      'Think about what happens to tiny ice crystals when warmed very slowly.',
      'Recrystallisation merges small ice grains into sharp spikes.',
      'Rapid 37°C bath immersion quickly melts ice before large crystals can shear membranes.',
    ],
  },
  {
    id: 'ch_a18',
    nodeId: NODE_C11_BIOTECH_054,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the correct 4-step aseptic workflow for introducing reagents into a working Laminar Flow Hood.',
    availableParts: [
      'Disinfect hood interior with 70% ethanol & run HEPA blower for 15 mins',
      'Spray hands/gloves with 70% ethanol before reaching inside',
      'Flame bottle neck & use sterile single-use serological pipettes',
      'Keep work in central line of sight without obstructing rear/front grilles',
    ],
    targetState: 'Disinfect hood interior with 70% ethanol & run HEPA blower for 15 mins -> Spray hands/gloves with 70% ethanol before reaching inside -> Flame bottle neck & use sterile single-use serological pipettes -> Keep work in central line of sight without obstructing rear/front grilles',
    validationHint: 'Follow the logical order: Prepare Cabinet -> Personal Antisepsis -> Tool & Bottle Sterility -> Spatial Airflow Discipline',
    explanation: 'Aseptic workflow follows an unyielding spatial and temporal sequence: surface & airflow preparation -> operator antisepsis -> vessel neck flaming & sterile consumables -> maintaining unhindered laminar streamlines.',
    hints: [
      'Start with preparing the cabinet and turning on HEPA filtration.',
      'Next, disinfect operator hands with 70% ethanol.',
      'Then practice bottle neck flaming and sterile pipetting.',
      'Lastly maintain unobstructed airflow geometry.',
    ],
  },
  {
    id: 'ch_a19',
    nodeId: NODE_C11_BIOTECH_055,
    type: 'evaluate',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student performs a Gram stain on a 48-hour old curd culture but forgets the Gram’s Iodine step before adding 95% Ethanol. What will be observed under the microscope?',
    options: [
      'All Lactobacillus cells will appear falsely Gram-negative (pink/red) because Crystal Violet was not fixed as an insoluble mordant-dye complex.',
      'All cells will turn fluorescent green.',
      'All cells will dissolve completely into the glass slide.',
      'The cells will remain dark purple regardless of iodine.',
    ],
    correctIndex: 0,
    explanation: 'Gram’s Iodine acts as a mordant, forming large, water-insoluble Crystal Violet-Iodine (CV-I) complexes within the peptidoglycan meshwork. Without iodine, the primary stain washes out freely during alcohol decolourisation, and cells pick up the safranin counter-stain, yielding a false Gram-negative pink appearance.',
    hints: [
      'What is the chemical role of iodine in Gram staining?',
      'Iodine is the mordant that traps Crystal Violet inside peptidoglycan.',
      'Without the mordant, alcohol washes out the primary dye, causing cells to stain pink with safranin.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_a20',
    nodeId: NODE_C11_BIOTECH_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Which modern biotechnology application combines cultured mammalian hybridoma cells (spleen B-cells fused with myeloma) to harvest high-affinity therapeutic antibodies for cancer immunotherapy?',
    options: [
      'Single Cell Protein (SCP) biomass production',
      'Monoclonal Antibody (mAb) production',
      'Micropropagation via somatic embryogenesis',
      'Lactic acid bulk dairy fermentation',
    ],
    correctIndex: 1,
    explanation: 'Monoclonal antibody (mAb) production utilizes hybridoma cell lines grown in RPMI/DMEM media to continuously secrete homogenous, epitope-specific immunoglobulins used in targeted oncotherapy and diagnostics (ELISA).',
    hints: [
      'Hybridoma technology was pioneered by Köhler and Milstein.',
      'It creates immortalized B-cell clones producing identical antibodies.',
      'This is Monoclonal Antibody (mAb) manufacturing.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_a21',
    nodeId: NODE_C11_BIOTECH_053,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does Dimethyl Sulfoxide (DMSO) protect mammalian cell membranes at sub-zero temperatures at the biophysical level?',
    options: [
      'It chemically breaks down water molecules into hydrogen and oxygen gases.',
      'It penetrates the plasma membrane, disrupts the hydrogen bonding network of water to depress the freezing point, and prevents ice crystal nucleation.',
      'It coats the outside of the vial with an insulating thermal shield.',
      'It causes instant complete dehydration so that the cell contains 0% liquid.',
    ],
    correctIndex: 1,
    explanation: 'DMSO is a penetrating cryoprotectant that crosses the phospholipid bilayer, colligatively reduces the freezing temperature of intracellular water, limits ice lattice propagation, and stabilizes membrane fluid mosaic organization.',
    hints: [
      'Cryoprotectants alter the thermodynamic freezing characteristics of intracellular water.',
      'DMSO lowers the nucleation threshold and prevents sharp ice lattice formation.',
      'It protects the cell interior and lipid bilayer.',
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
  nodeId: NODE_C11_BIOTECH_051,
  title: 'Nutrient Media, Cryopreservation & Aseptic Cell Culture',
  definition: 'Nutrient media are chemically formulated aqueous solutions containing macro/micronutrients, carbon sources, vitamins, and regulators tailored for bacteria (LB), plant tissues (MS, White\'s), and mammalian lines (RPMI, DMEM + FBS). Long-term preservation relies on cryopreservation at -196°C in liquid nitrogen with cryoprotectants like DMSO, managed under strict laminar airflow aseptic technique.',
  eli5: 'Different cells need specific menus: LB is bacterial soup, MS is a plant feast, White\'s is a gentle root juice, RPMI is blood cell liquid, DMEM sticks animal cells down, and FBS is a power booster. We keep cells alive forever by freezing them in liquid nitrogen at -196°C with special anti-freeze blankets (DMSO).',
  misconceptions: [
    {
      misconception: 'All cell types can grow in any general nutrient medium or plain broth.',
      correction: 'Bacteria, plant explants, and mammalian cells have fundamentally different osmotic, mineral, hormonal, and surface attachment requirements.',
    },
    {
      misconception: 'Fetal Bovine Serum (FBS) is a complete synthetic medium by itself.',
      correction: 'FBS is an undefined biological supplement providing hormones and growth factors; it must be added to defined basal media like DMEM or RPMI.',
    },
    {
      misconception: 'Antibiotics and antimycotics are interchangeable.',
      correction: 'Antibiotics (e.g., ampicillin, gentamicin) target bacteria, while antimycotics (e.g., amphotericin B) selectively inhibit fungi and yeasts.',
    },
    {
      misconception: 'Cryopreservation is just putting cell flasks into an ordinary laboratory freezer.',
      correction: 'Ordinary freezers (-20°C) cause lethal ice damage. Cryopreservation requires controlled -1°C/min freezing down to -196°C in liquid nitrogen with DMSO.',
    },
    {
      misconception: 'In Gram staining, Gram-positive bacteria appear pink/red.',
      correction: 'Gram-positive bacteria (like Lactobacillus) retain crystal violet and appear royal purple/violet due to their thick peptidoglycan cell wall.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which medium is specifically formulated for bacterial culture (e.g. E. coli)?', options: ['MS Medium', 'LB Broth', 'RPMI 1640', 'White’s Medium'], correctIndex: 1 },
    { question: 'What is the standard liquid nitrogen storage temperature?', options: ['-80°C', '-196°C', '-20°C', '-273°C'], correctIndex: 1 },
    { question: 'Which plant hormone class is primarily responsible for shoot bud induction?', options: ['Auxins', 'Cytokinins', 'Gibberellins', 'Abscisic Acid'], correctIndex: 1 },
    { question: 'Why is DMSO added prior to freezing cell lines?', options: ['As an antibiotic', 'As a cryoprotectant to prevent ice crystal puncture', 'To digest the cell wall', 'To increase temperature'], correctIndex: 1 },
    { question: 'Which medium is preferred for delicate plant root tip cultures?', options: ['MS high salt', 'White’s low salt', 'DMEM', 'LB agar'], correctIndex: 1 },
    { question: 'What colour is Lactobacillus under microscopy following Gram staining?', options: ['Pink/Red', 'Purple/Violet', 'Colourless', 'Bright Blue'], correctIndex: 1 },
    { question: 'Which mammalian medium is designed for suspension cells like lymphocytes?', options: ['DMEM', 'RPMI 1640', 'LB Broth', 'White’s Medium'], correctIndex: 1 },
    { question: 'What is the function of HEPA filters in a laminar airflow hood?', options: ['Sterilise glassware with dry heat', 'Provide 99.97% sterile particle-free airflow', 'Cool the culture flasks to 4°C', 'Automate streak plating'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master media classification (LB, MS, White, RPMI, DMEM, FBS), hormonal morphogenesis control, cryopreservation kinetics (-196°C & DMSO), laminar flow aseptic barriers, and Gram-positive Lactobacillus isolation.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Media Matrix & Cell Specificity',
    instruction: 'Click on each cell type to formulate its exact nutrient medium, salt concentration, and supplement requirements.',
    interactionType: 'click-media',
    nodeId: NODE_C11_BIOTECH_051,
  },
  {
    title: 'Phytohormone Morphogenesis Lab',
    instruction: 'Adjust the Auxin (NAA) and Cytokinin (BAP) sliders to observe how hormone ratios direct explant development into Roots, Shoots, or Callus.',
    interactionType: 'slider-hormones',
    nodeId: NODE_C11_BIOTECH_052,
  },
  {
    title: 'Cryopreservation & Thermal Dynamics',
    instruction: 'Simulate the cooling rate curve down to -196°C in liquid nitrogen and toggle DMSO cryoprotectant to observe ice crystal formation.',
    interactionType: 'cryo-simulator',
    nodeId: NODE_C11_BIOTECH_053,
  },
  {
    title: 'Aseptic Laminar Flow Barrier',
    instruction: 'Toggle the HEPA blower, UV lamp, and burner to maintain 100% sterility against airborne fungal spores.',
    interactionType: 'aseptic-cabinet',
    nodeId: NODE_C11_BIOTECH_054,
  },
  {
    title: 'Lactobacillus Curd Practical & Gram Stain',
    instruction: 'Step through inoculation, 37°C incubation, and crystal violet/iodine/alcohol/safranin staining under the microscope.',
    interactionType: 'stain-microscope',
    nodeId: NODE_C11_BIOTECH_055,
  },
];

// ─── PREDICT-THEN-CHECK ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you culture a plant explant on MS medium with 5.0 mg/L Auxin (2,4-D) and 0.05 mg/L Cytokinin (BAP), what will primarily develop?',
    options: ['Multiple green shoot buds', 'Extensive root initiation and unorganised callus', 'Instant flowering', 'No response at all'],
    correctIndex: 1,
    verifyInstruction: 'Now set the Auxin slider high (>4.0) and Cytokinin low (<0.5) in the hormone simulator to observe rhizogenesis & callus induction!',
    nodeId: NODE_C11_BIOTECH_052,
  },
  {
    question: 'Predict: What happens to mammalian cells plunged directly into -196°C liquid nitrogen WITHOUT any cryoprotectant (0% DMSO)?',
    options: ['They survive 100% unharmed', 'Intracellular water forms large jagged ice crystals that shear the plasma membrane, causing 0% viability', 'They divide rapidly inside the nitrogen tank', 'They turn into bacteria'],
    correctIndex: 1,
    verifyInstruction: 'Toggle DMSO to OFF in the cryo simulator and click "Freeze" to watch the ice crystal rupture animation!',
    nodeId: NODE_C11_BIOTECH_053,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when Auxin and Cytokinin concentrations are balanced at moderate levels (e.g. 2.0 mg/L each)?',
    observableOptions: ['Formation of an undifferentiated mass of dividing cells called Callus', 'Formation of seeds directly', 'Immediate drying of agar', 'Leaf senescence only'],
    correctIndex: 0,
    nodeId: NODE_C11_BIOTECH_052,
  },
  {
    question: 'Under the simulated Gram-stain microscope view, what morphological shape and colour confirm Lactobacillus?',
    observableOptions: ['Pink spherical cocci in clusters', 'Purple/Violet rod-shaped bacilli (peptidoglycan retention)', 'Colourless spirilla', 'Green amoeboid cells'],
    correctIndex: 1,
    nodeId: NODE_C11_BIOTECH_055,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Biomanufacturing Facility Design Protocol',
  description: 'Design a comprehensive Standard Operating Procedure (SOP) for an Indian biopharmaceutical facility manufacturing monoclonal antibodies against rabies or propagating disease-free Cavendish banana plantlets.',
  steps: [
    'Select exact basal media and supplements (e.g. MS + agar for banana explants; DMEM + 10% FBS for hybridomas).',
    'Calculate and prepare micro/macronutrient master stocks and heat-labile growth regulator filtration protocols.',
    'Establish master cell banking in Liquid Nitrogen (-196°C) with 10% DMSO and controlled -1°C/min cooling.',
    'Verify cleanroom classification (Class 100 / Grade A Laminar Flow) and validate zero contamination via swab culture.',
  ],
};

function C11_BiotechnologyNutrientMediaWhiteSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Escalating hints & UI feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── INTERACTIVE LAB STATES ───
  // 1. Media Matrix
  const [selectedCellType, setSelectedCellType] = useState<'bacteria' | 'plant_tissue' | 'plant_root' | 'mammal_adherent' | 'mammal_suspension'>('bacteria');
  const [fbsSupplemented, setFbsSupplemented] = useState(true);

  // 2. Phytohormone Morphogenesis
  const [auxinLevel, setAuxinLevel] = useState(2.0); // mg/L NAA or 2,4-D
  const [cytokininLevel, setCytokininLevel] = useState(2.0); // mg/L BAP
  const [agarPercent, setAgarPercent] = useState(0.8);
  const [mediaPh, setMediaPh] = useState(5.75);

  // 3. Cryopreservation Simulation
  const [hasCryoprotectant, setHasCryoprotectant] = useState(true);
  const [coolingRate, setCoolingRate] = useState(1.0); // °C/min
  const [cryoStage, setCryoStage] = useState<'room' | 'slow_cooling' | 'liquid_n2' | 'thawing' | 'revived'>('room');
  const [cryoTemp, setCryoTemp] = useState(20);
  const [cellSurvivalRate, setCellSurvivalRate] = useState(95);

  // 4. Aseptic Laminar Flow Cabinet
  const [hepaAirflowOn, setHepaAirflowOn] = useState(true);
  const [uvLampOn, setUvLampOn] = useState(false);
  const [burnerLit, setBurnerLit] = useState(true);
  const [hoodSterilityScore, setHoodSterilityScore] = useState(99);
  const [operatorGlovesEthanol, setOperatorGlovesEthanol] = useState(true);

  // 5. Practical Curd / Gram Stain
  const [practicalStep, setPracticalStep] = useState<number>(0);
  const [gramStainPhase, setGramStainPhase] = useState<'unstained' | 'crystal_violet' | 'iodine' | 'decolourised' | 'safranin'>('unstained');
  const [microscopeMagnification, setMicroscopeMagnification] = useState(100);

  // Drag & Sort & Construct Interactive Challenge State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // 2D Canvas Ref & Animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cryoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── COMPUTED MORPHOGENESIS OUTCOME ───
  const organogenesisOutcome = useMemo(() => {
    const ratio = cytokininLevel / (auxinLevel + 0.001);
    if (auxinLevel < 0.2 && cytokininLevel < 0.2) return { text: 'Minimal Cell Division (Starvation/Stall)', color: 'text-slate-400', type: 'none' };
    if (ratio > 3.0) return { text: 'Caulogenesis (Multiple Shoot Buds Regeneration)', color: 'text-emerald-400', type: 'shoots' };
    if (ratio < 0.33) return { text: 'Rhizogenesis (Adventitious Root Initiation)', color: 'text-amber-400', type: 'roots' };
    return { text: 'Unorganised Proliferating Callus Mass', color: 'text-yellow-300', type: 'callus' };
  }, [auxinLevel, cytokininLevel]);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
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
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── DYNAMIC STERILITY CALCULATION ───
  useEffect(() => {
    let score = 30;
    if (hepaAirflowOn) score += 40;
    if (burnerLit) score += 15;
    if (operatorGlovesEthanol) score += 15;
    if (uvLampOn && hepaAirflowOn) score = 100;
    setHoodSterilityScore(Math.min(100, score));
  }, [hepaAirflowOn, uvLampOn, burnerLit, operatorGlovesEthanol]);

  // ─── CRYO COOLING SIMULATION EFFECT ───
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (cryoStage === 'slow_cooling') {
      interval = setInterval(() => {
        setCryoTemp(prev => {
          if (prev <= -80) {
            setCryoStage('liquid_n2');
            setCryoTemp(-196);
            return -196;
          }
          return prev - coolingRate * 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [cryoStage, coolingRate]);

  // ──��� 2D CANVAS RENDERING FOR PRACTICAL & BACTERIAL KINETICS ───
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

      // Background Petri Agar
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Agar circle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#334155';
      ctx.stroke();

      // Inoculation Streak pattern & bacterial colonies
      if (practicalStep >= 1) {
        ctx.strokeStyle = practicalStep >= 2 ? '#4ade80' : '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 60, centerY - 60);
        ctx.lineTo(centerX + 60, centerY - 50);
        ctx.lineTo(centerX - 50, centerY);
        ctx.lineTo(centerX + 50, centerY + 10);
        ctx.lineTo(centerX - 30, centerY + 50);
        ctx.lineTo(centerX + 20, centerY + 60);
        ctx.stroke();
      }

      // Colonies after incubation at 37°C
      if (practicalStep >= 2) {
        const colonyCount = 18;
        for (let i = 0; i < colonyCount; i++) {
          const angle = (i / colonyCount) * Math.PI * 2 + (i % 3);
          const dist = 25 + (i * 3.5) % (radius - 40);
          const cx = centerX + Math.cos(angle) * dist;
          const cy = centerY + Math.sin(angle) * dist;

          ctx.beginPath();
          ctx.arc(cx, cy, 4 + (i % 3), 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.fill();
          ctx.strokeStyle = '#ca8a04';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [practicalStep]);

  // ─── CRYO CANVAS: ICE CRYSTAL MORPHOLOGY ───
  useEffect(() => {
    const canvas = cryoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Cell Membrane representation
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fillStyle = hasCryoprotectant ? '#1e3a8a88' : '#7f1d1d88';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = hasCryoprotectant ? '#60a5fa' : '#ef4444';
      ctx.stroke();

      // Nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = hasCryoprotectant ? '#3b82f6' : '#dc2626';
      ctx.fill();

      // Ice Crystals
      if (cryoStage === 'slow_cooling' || cryoStage === 'liquid_n2') {
        if (!hasCryoprotectant || coolingRate > 5) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + tick * 0.01;
            const length = 40 + Math.sin(tick * 0.05 + i) * 20;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * 15, cy + Math.sin(angle) * 15);
            ctx.lineTo(cx + Math.cos(angle) * (55 + length), cy + Math.sin(angle) * (55 + length));
            ctx.stroke();
          }
          ctx.fillStyle = '#f87171';
          ctx.font = '12px sans-serif';
          ctx.fillText('✗ Membrane Rupture (Ice Needles)', cx - 90, cy + 85);
        } else {
          ctx.fillStyle = '#38bdf888';
          for (let i = 0; i < 18; i++) {
            const angle = (i / 18) * Math.PI * 2;
            const r = 25 + (i % 5) * 6;
            ctx.beginPath();
            ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#4ade80';
          ctx.font = '12px sans-serif';
          ctx.fillText('✓ Vitrified Matrix (Intact & Viable)', cx - 80, cy + 85);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [cryoStage, hasCryoprotectant, coolingRate]);

  // ─── CALLBACKS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Cell metabolism dictates the media formula.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive cell culture research suite. Step through each workstation.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the free formulation sandbox! Blend media, tweak hormones, and test cryoprotectants freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us test your biotechnology competencies with board-standard challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Verify the biochemical reaction by adjusting the controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Re-examine the morphogenesis visual.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered Nutrient Media, Cryopreservation, and Cell Culture practicals.');
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
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match' || challenge.type === 'evaluate' || challenge.type === 'analysis') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent biotechnology reasoning.');
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
        speechManager.speak('Review the step-by-step scientific solution below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleStartCryoFreeze = useCallback(() => {
    audioManager.play('pop');
    setCryoStage('slow_cooling');
    setCryoTemp(20);
    speechManager.speak('Slow cooling initiated at controlled 1 degree per minute.');
  }, []);

  const handleThawCryo = useCallback(() => {
    audioManager.play('sparkle');
    setCryoStage('revived');
    setCryoTemp(37);
    const viability = hasCryoprotectant && coolingRate <= 2.0 ? 94 : 8;
    setCellSurvivalRate(viability);
    speechManager.speak(`Rapid thawing complete in 37 degree water bath. Cell post-thaw viability: ${viability} percent.`);
  }, [hasCryoprotectant, coolingRate]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800">
              ISC Class 11 • {subjectConfig.name}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              aria-label={`Navigate to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'complete' && scoreBreakdown.total === 0) return;
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/40'
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
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-gold-950/50 rounded-2xl border border-emerald-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
              <span className="animate-pulse">●</span> MISSION BRIEFING
            </div>
            <h2 className="text-2xl font-extrabold text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-emerald-900/50 text-xs text-emerald-300">
              💡 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>❓</span> Initial Diagnostic Probe
            </h3>
            <p className="text-white text-base font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-emerald-500'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center leading-6 text-xs mr-2 font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && ' ✓'}
                  {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && ' ✗'}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div
                  className={`p-4 rounded-xl border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-700 text-amber-300'
                  } text-sm`}
                >
                  {discoveryCorrect ? '✓ Exceptional insight!' : 'ℹ️ ' + DISCOVERY_QUESTION.hintAfter}
                </div>
                <motion.button
                  aria-label="Launch interactive guided exploration"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-extrabold shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                >
                  Launch Interactive Guided Exploration →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Header */}
          <div className="flex items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Workstation {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="text-sm text-slate-400 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Node: {EXPLORATION_STEPS[currentSlide].nodeId}
            </div>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 <strong>Hands-on Directive:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* WORKSTATION 1: Media Matrix */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              <div className="lg:col-span-5 space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Cell / Organism Type</label>
                {[
                  { id: 'bacteria', name: 'Escherichia coli (Bacteria)', medium: 'LB (Luria-Bertani) Broth', comp: 'Tryptone (1.0%) + Yeast Extract (0.5%) + NaCl (1.0%)', color: 'indigo' },
                  { id: 'plant_tissue', name: 'Tobacco Callus / Banana Explants', medium: 'MS (Murashige & Skoog)', comp: 'Full Inorganic Macro/Micro + Sucrose (3%) + BAP/NAA', color: 'emerald' },
                  { id: 'plant_root', name: 'Tomato / Carrot Root Tips', medium: 'White’s Medium', comp: 'Low-salt formulation (gentle) + Vitamins + Auxin', color: 'teal' },
                  { id: 'mammal_suspension', name: 'Jurkat T-Cells / Blood Lymphocytes', medium: 'RPMI 1640', comp: 'Defined amino acids, glucose, HEPES + 10% FBS', color: 'pink' },
                  { id: 'mammal_adherent', name: 'Vero / Fibroblast / HeLa (Adherent)', medium: 'DMEM (Dulbecco’s MEM)', comp: 'High glucose, pyruvate, bicarbonate + 10% FBS', color: 'purple' },
                ].map(cell => (
                  <motion.button
                    key={cell.id}
                    aria-label={`Select ${cell.name}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCellType(cell.id as 'bacteria' | 'plant_tissue' | 'plant_root' | 'mammal_adherent' | 'mammal_suspension');
                      audioManager.play('tap');
                      speechManager.speak(`${cell.name} requires ${cell.medium}`);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      selectedCellType === cell.id
                        ? 'bg-slate-800 border-emerald-500 shadow-md shadow-emerald-950 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-100">{cell.name}</div>
                    <div className="text-xs text-emerald-400 font-mono mt-0.5">{cell.medium}</div>
                  </motion.button>
                ))}
              </div>

              {/* Real-Time Media Flask Visualizer */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-bold uppercase text-slate-400">Culture Vessel Simulation</span>
                    <span className="text-xs font-mono px-2 py-0.5 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-md">
                      Target: {selectedCellType}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* SVG Flask with dynamically layered broth */}
                    <svg viewBox="0 0 200 240" className="w-40 h-48 drop-shadow-2xl">
                      {/* Flask glass neck */}
                      <path d="M85,20 L115,20 L115,70 L170,190 Q180,210 160,215 L40,215 Q20,210 30,190 L85,70 Z" fill="none" stroke="#64748b" strokeWidth="4" />
                      {/* Liquid level */}
                      <path
                        d="M45,190 Q100,185 155,190 L160,210 L40,210 Z"
                        fill={
                          selectedCellType === 'bacteria'
                            ? '#f59e0b88'
                            : selectedCellType === 'plant_tissue'
                            ? '#22c55e88'
                            : selectedCellType === 'plant_root'
                            ? '#14b8a688'
                            : '#ec489988'
                        }
                      />
                      {/* Cells floating or attached */}
                      {selectedCellType === 'mammal_adherent' ? (
                        <g>
                          {[45, 60, 75, 90, 105, 120, 135, 150].map(x => (
                            <ellipse key={x} cx={x} cy={208} rx="6" ry="2" fill="#d946ef" />
                          ))}
                          <text x="100" y="160" textAnchor="middle" fill="#f472b6" fontSize="9">Adherent Monolayer</text>
                        </g>
                      ) : (
                        <g>
                          {[55, 75, 95, 115, 135, 80, 105, 125].map((x, i) => (
                            <circle key={i} cx={x} cy={195 + (i % 3) * 4} r="2.5" fill="#f8fafc" opacity="0.9" />
                          ))}
                          <text x="100" y="160" textAnchor="middle" fill="#38bdf8" fontSize="9">Suspension / Explant</text>
                        </g>
                      )}
                    </svg>

                    <div className="space-y-3 flex-1 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <strong className="text-emerald-400 block text-sm">Formulation Breakdown:</strong>
                        <p className="text-slate-300 mt-1">
                          {selectedCellType === 'bacteria' && 'LB Broth provides Tryptone (amino acid source), Yeast Extract (B-complex & minerals), and NaCl (osmotic balance for E. coli).'}
                          {selectedCellType === 'plant_tissue' && 'MS Medium delivers high inorganic nitrogen (NH4NO3, KNO3), calcium, iron chelate, sucrose (2-3%), and growth regulators.'}
                          {selectedCellType === 'plant_root' && 'White\'s Medium is formulated with reduced salt concentrations to protect delicate root apices from osmotic inhibition.'}
                          {selectedCellType === 'mammal_suspension' && 'RPMI 1640 contains glutathione, high biotin, vitamin B12, and phosphate buffers optimal for non-adherent lymphocytes.'}
                          {selectedCellType === 'mammal_adherent' && 'DMEM utilizes 4x concentrations of amino acids/vitamins plus sodium pyruvate to support attached fibroblast growth.'}
                        </p>
                      </div>

                      {(selectedCellType === 'mammal_adherent' || selectedCellType === 'mammal_suspension') && (
                        <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-800">
                          <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-purple-300 font-bold">10% Fetal Bovine Serum (FBS) Supplement</span>
                            <input
                              type="checkbox"
                              aria-label="Toggle 10% Fetal Bovine Serum Supplement"
                              checked={fbsSupplemented}
                              onChange={e => setFbsSupplemented(e.target.checked)}
                              className="accent-purple-500 w-4 h-4"
                            />
                          </label>
                          <p className="text-slate-400 mt-1 text-[11px]">
                            {fbsSupplemented
                              ? '✓ Provides essential hormones, fibronectin attachment factors, and fetuin.'
                              : '⚠️ Starvation warning: Cells will arrest in G0/G1 phase without serum growth factors!'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WORKSTATION 2: Phytohormone Morphogenesis */}
          {currentSlide === 1 && (
            <div className="space-y-6 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              {/* Predict-Then-Check Box */}
              {!predictionMade ? (
                <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-700/60">
                  <p className="text-sm font-bold text-amber-300 mb-2">⚡ Prediction Challenge: {PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Select prediction: ${opt}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handlePrediction(i)}
                        className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700 text-xs text-emerald-300">
                  ✓ Prediction registered! Now interact with the Auxin and Cytokinin sliders below to verify organogenesis.
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Hormone Sliders */}
                <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <label htmlFor="auxin-slider">Auxin (NAA / 2,4-D) [Root Inducer]</label>
                      <span className="font-mono text-amber-400">{auxinLevel.toFixed(2)} mg/L</span>
                    </div>
                    <input
                      id="auxin-slider"
                      aria-label="Auxin concentration slider"
                      type="range"
                      min={0}
                      max={5.0}
                      step={0.1}
                      value={auxinLevel}
                      onChange={e => {
                        setAuxinLevel(parseFloat(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <label htmlFor="cytokinin-slider">Cytokinin (BAP / Kinetin) [Shoot Inducer]</label>
                      <span className="font-mono text-emerald-400">{cytokininLevel.toFixed(2)} mg/L</span>
                    </div>
                    <input
                      id="cytokinin-slider"
                      aria-label="Cytokinin concentration slider"
                      type="range"
                      min={0}
                      max={5.0}
                      step={0.1}
                      value={cytokininLevel}
                      onChange={e => {
                        setCytokininLevel(parseFloat(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <label htmlFor="agar-slider">Agar Gelling Agent</label>
                      <span className="font-mono text-teal-400">{agarPercent.toFixed(1)}% (w/v)</span>
                    </div>
                    <input
                      id="agar-slider"
                      aria-label="Agar percentage slider"
                      type="range"
                      min={0.2}
                      max={1.5}
                      step={0.1}
                      value={agarPercent}
                      onChange={e => setAgarPercent(parseFloat(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-400 font-mono">
                      Cytokinin : Auxin Ratio = {(cytokininLevel / (auxinLevel + 0.001)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Live Explant Regeneration Rendering */}
                <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                  <div className="text-center mb-4">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Observed Organogenesis:</span>
                    <h3 className={`text-lg font-black mt-1 ${organogenesisOutcome.color}`}>
                      {organogenesisOutcome.text}
                    </h3>
                  </div>

                  {/* SVG Culture Tube with Plant explant response */}
                  <svg viewBox="0 0 200 220" className="w-44 h-52">
                    <rect x="65" y="10" width="70" height="170" rx="4" fill="none" stroke="#64748b" strokeWidth="3" />
                    <path d="M65,180 Q65,210 100,210 Q135,210 135,180 Z" fill="none" stroke="#64748b" strokeWidth="3" />
                    <path d="M67,130 L133,130 L133,180 Q133,207 100,207 Q67,207 67,180 Z" fill="#334155" opacity="0.8" />
                    <rect x="90" y="120" width="20" height="15" fill="#15803d" rx="2" />

                    {(organogenesisOutcome.type === 'shoots' || organogenesisOutcome.type === 'callus') && (
                      <g>
                        <path d="M100,120 Q90,80 85,60 Q95,70 100,80" fill="#22c55e" />
                        <path d="M100,120 Q110,75 118,55 Q110,65 100,75" fill="#4ade80" />
                        <circle cx="85" cy="58" r="6" fill="#16a34a" />
                        <circle cx="118" cy="53" r="6" fill="#16a34a" />
                      </g>
                    )}

                    {(organogenesisOutcome.type === 'roots' || organogenesisOutcome.type === 'callus') && (
                      <g>
                        <path d="M95,135 Q90,165 85,190" stroke="#fef08a" strokeWidth="2.5" fill="none" />
                        <path d="M105,135 Q110,165 115,195" stroke="#fde047" strokeWidth="2.5" fill="none" />
                        <path d="M100,135 Q100,170 102,198" stroke="#fef08a" strokeWidth="2" fill="none" />
                      </g>
                    )}

                    {organogenesisOutcome.type === 'callus' && (
                      <g>
                        {[
                          { cx: 90, cy: 115 },
                          { cx: 105, cy: 112 },
                          { cx: 110, cy: 122 },
                          { cx: 88, cy: 125 },
                          { cx: 100, cy: 118 },
                        ].map((c, idx) => (
                          <circle key={idx} cx={c.cx} cy={c.cy} r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                        ))}
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              {/* Observation Question */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-amber-300">Observation Check: {OBSERVATION_QUESTIONS[0].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Select observation: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleObservation(i)}
                      className={`p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 ${
                        observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex ? 'border-emerald-500 text-emerald-300' : ''
                      }`}
                    >
                      {opt}
                      {observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex && ' ✓'}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WORKSTATION 3: Cryopreservation Lab */}
          {currentSlide === 2 && (
            <div className="space-y-6 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cryo Protocol Controls</h3>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-bold text-gold-300">Cryoprotectant (10% DMSO / Glycerol)</span>
                      <input
                        type="checkbox"
                        aria-label="Toggle Cryoprotectant 10% DMSO"
                        checked={hasCryoprotectant}
                        onChange={e => setHasCryoprotectant(e.target.checked)}
                        className="accent-gold-500 w-4 h-4"
                      />
                    </label>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <label htmlFor="cooling-rate-slider">Cooling Rate (Controlled Rate Freezer)</label>
                      <span className="font-mono text-gold-400">{coolingRate.toFixed(1)} °C/min</span>
                    </div>
                    <input
                      id="cooling-rate-slider"
                      aria-label="Cooling rate in degrees Celsius per minute"
                      type="range"
                      min={0.5}
                      max={10.0}
                      step={0.5}
                      value={coolingRate}
                      onChange={e => setCoolingRate(parseFloat(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <div className="text-[11px] text-slate-400 mt-0.5">Gold standard: Exactly -1.0°C per minute</div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <motion.button
                      aria-label="Start slow freezing at controlled rate"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStartCryoFreeze}
                      disabled={cryoStage === 'slow_cooling'}
                      className="flex-1 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md shadow-gold-950"
                    >
                      ❄️ Start -1°C/min Freeze
                    </motion.button>
                    <motion.button
                      aria-label="Perform rapid thaw in 37 degree water bath"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleThawCryo}
                      disabled={cryoStage !== 'liquid_n2'}
                      className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs shadow-md shadow-amber-950 disabled:opacity-40"
                    >
                      🔥 Rapid 37°C Thaw
                    </motion.button>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Chamber Temp:</span>
                      <span className="font-mono font-bold text-gold-300">{cryoTemp} °C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cryo Stage:</span>
                      <span className="font-mono font-bold uppercase text-amber-300">{cryoStage.replace('_', ' ')}</span>
                    </div>
                    {cryoStage === 'revived' && (
                      <div className="flex justify-between pt-1 border-t border-slate-800">
                        <span className="text-slate-400">Post-Thaw Cell Viability:</span>
                        <span className={`font-mono font-bold ${cellSurvivalRate > 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {cellSurvivalRate > 70 ? `✓ ${cellSurvivalRate}%` : `✗ ${cellSurvivalRate}%`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cryo Microscopic Ice Crystal Canvas */}
                <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Microscopic Intracellular Ice Crystal Dynamics
                  </span>
                  <canvas ref={cryoCanvasRef} width={360} height={220} className="w-full max-w-sm rounded-xl border border-slate-800" />
                </div>
              </div>
            </div>
          )}

          {/* WORKSTATION 4: Laminar Flow Cabinet */}
          {currentSlide === 3 && (
            <div className="space-y-6 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Aseptic Barrier Controls</h3>

                  <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-xs font-bold text-emerald-300">HEPA Continuous Blower (0.3µm filter)</span>
                    <input
                      type="checkbox"
                      aria-label="Toggle HEPA Continuous Blower"
                      checked={hepaAirflowOn}
                      onChange={e => setHepaAirflowOn(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-xs font-bold text-purple-300">UV Germicidal Lamp (Pre-operation)</span>
                    <input
                      type="checkbox"
                      aria-label="Toggle UV Germicidal Lamp"
                      checked={uvLampOn}
                      onChange={e => setUvLampOn(e.target.checked)}
                      className="accent-purple-500 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-xs font-bold text-amber-300">Bunsen Flame (Neck / Loop Sterilisation)</span>
                    <input
                      type="checkbox"
                      aria-label="Toggle Bunsen Flame"
                      checked={burnerLit}
                      onChange={e => setBurnerLit(e.target.checked)}
                      className="accent-amber-500 w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-xs font-bold text-gold-300">70% Ethanol Glove Antisepsis</span>
                    <input
                      type="checkbox"
                      aria-label="Toggle 70% Ethanol Glove Antisepsis"
                      checked={operatorGlovesEthanol}
                      onChange={e => setOperatorGlovesEthanol(e.target.checked)}
                      className="accent-gold-500 w-4 h-4"
                    />
                  </label>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Cabinet Sterility Integrity</span>
                      <span className={hoodSterilityScore > 85 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>
                        {hoodSterilityScore > 85 ? `✓ ${hoodSterilityScore}%` : `✗ ${hoodSterilityScore}%`}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${hoodSterilityScore > 85 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        animate={{ width: `${hoodSterilityScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* SVG Visual of Laminar Flow Streamlines */}
                <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                  <svg viewBox="0 0 300 200" className="w-full max-w-md">
                    <rect x="20" y="20" width="260" height="160" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="3" />
                    <rect x="30" y="30" width="240" height="15" fill="#334155" />
                    <text x="150" y="42" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">HEPA FILTER CEILING</text>

                    {hepaAirflowOn && (
                      <g stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" strokeDasharray="4 2">
                        {[50, 80, 110, 140, 170, 200, 230, 250].map(x => (
                          <path key={x} d={`M${x},45 L${x},160`} />
                        ))}
                      </g>
                    )}

                    {burnerLit && (
                      <g>
                        <rect x="140" y="150" width="20" height="18" fill="#64748b" rx="2" />
                        <path d="M150,150 Q145,130 150,120 Q155,130 150,150" fill="#f59e0b" />
                        <path d="M150,150 Q147,135 150,130 Q153,135 150,150" fill="#38bdf8" />
                      </g>
                    )}

                    <ellipse cx="90" cy="160" rx="25" ry="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* WORKSTATION 5: Practical Curd Inoculation & Gram Stain */}
          {currentSlide === 4 && (
            <div className="space-y-6 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Practical Protocol Pipeline</h3>

                  {[
                    { title: '1. Prepare Sterile LB Agar Plate', desc: 'Autoclaved LB medium poured into sterile Petri dish' },
                    { title: '2. Streak Inoculation of Curd', desc: 'Sterile inoculating loop dilutes Lactobacillus into isolated streaks' },
                    { title: '3. Inverted Incubation at 37°C', desc: 'Upside-down for 24-48 hours to prevent condensation wash' },
                    { title: '4. Smear & Gram Stain Protocol', desc: 'Crystal Violet → Iodine → 95% Ethanol → Safranin' },
                  ].map((step, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Select protocol step ${idx + 1}: ${step.title}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setPracticalStep(idx);
                        audioManager.play('tap');
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        practicalStep === idx
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <strong className="block text-slate-200">{step.title}</strong>
                      <span className="text-[11px] text-slate-400">{step.desc}</span>
                    </motion.button>
                  ))}

                  {practicalStep === 3 && (
                    <div className="pt-2 space-y-2 border-t border-slate-800">
                      <span className="text-xs font-bold text-slate-300">Gram Stain Reagents</span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        <button
                          aria-label="Apply Crystal Violet primary stain"
                          onClick={() => setGramStainPhase('crystal_violet')}
                          className="p-2 bg-gold-900/70 hover:bg-gold-800 text-gold-200 rounded-lg font-bold"
                        >
                          1. Crystal Violet (Primary)
                        </button>
                        <button
                          aria-label="Apply Gram Iodine mordant"
                          onClick={() => setGramStainPhase('iodine')}
                          className="p-2 bg-amber-900/70 hover:bg-amber-800 text-amber-200 rounded-lg font-bold"
                        >
                          2. Gram Iodine (Mordant)
                        </button>
                        <button
                          aria-label="Apply 95% Ethanol decolouriser"
                          onClick={() => setGramStainPhase('decolourised')}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold"
                        >
                          3. 95% Ethanol (Wash)
                        </button>
                        <button
                          aria-label="Apply Safranin counter-stain"
                          onClick={() => setGramStainPhase('safranin')}
                          className="p-2 bg-rose-900/70 hover:bg-rose-800 text-rose-200 rounded-lg font-bold"
                        >
                          4. Safranin (Counter)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Practical Canvas + Microscopic Field */}
                <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {practicalStep < 3 ? 'Petri Dish Culture Morphology' : '100x Oil Immersion Microscopic View'}
                  </span>

                  {practicalStep < 3 ? (
                    <canvas ref={canvasRef} width={280} height={220} className="rounded-2xl border border-slate-800" />
                  ) : (
                    <div className="w-64 h-64 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center relative overflow-hidden shadow-2xl">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <circle cx="100" cy="100" r="95" fill="#020617" />
                        {[
                          { x: 60, y: 70, angle: 25 },
                          { x: 90, y: 60, angle: -15 },
                          { x: 130, y: 80, angle: 45 },
                          { x: 70, y: 120, angle: 80 },
                          { x: 110, y: 110, angle: -35 },
                          { x: 140, y: 130, angle: 10 },
                          { x: 95, y: 145, angle: 55 },
                        ].map((b, i) => (
                          <rect
                            key={i}
                            x={b.x}
                            y={b.y}
                            width="28"
                            height="9"
                            rx="4"
                            transform={`rotate(${b.angle} ${b.x} ${b.y})`}
                            fill={
                              gramStainPhase === 'unstained'
                                ? '#475569'
                                : gramStainPhase === 'crystal_violet' || gramStainPhase === 'iodine' || gramStainPhase === 'safranin' || gramStainPhase === 'decolourised'
                                ? '#7e22ce'
                                : '#f43f5e'
                            }
                            stroke="#581c87"
                            strokeWidth="1.5"
                          />
                        ))}
                      </svg>
                      <div className="absolute bottom-2 text-center text-[10px] font-mono text-purple-300 bg-slate-950/80 px-2 py-0.5 rounded border border-purple-800">
                        ✓ Gram-Positive Rods (Purple Peptidoglycan)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Slide Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <motion.button
              aria-label="Go to previous workstation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 rounded-xl font-bold text-sm"
            >
              ← Previous Workstation
            </motion.button>

            <span className="text-xs font-mono text-slate-400">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next workstation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-950"
              >
                Next Workstation →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Launch free formulation sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-sm shadow-md shadow-teal-950"
              >
                Launch Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE FORMULATION LAB ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-teal-950/60 via-slate-900 to-emerald-950/60 rounded-2xl border border-teal-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white">🧪 Free Formulation & Cryo Sandbox</h2>
              <p className="text-xs text-slate-300 mt-1">
                Zero grading stress! Test arbitrary hormone ratios, change cooling rates, and toggle media components.
              </p>
            </div>
            <motion.button
              aria-label="Proceed to board challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-950"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Morphogenesis Widget */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase">Hormone Blender</h3>
              <div className="text-xs text-slate-300">
                Auxin: <strong className="text-amber-400 font-mono">{auxinLevel.toFixed(1)} mg/L</strong>
              </div>
              <input
                aria-label="Auxin level in sandbox"
                type="range"
                min={0}
                max={5}
                step={0.1}
                value={auxinLevel}
                onChange={e => setAuxinLevel(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="text-xs text-slate-300">
                Cytokinin: <strong className="text-emerald-400 font-mono">{cytokininLevel.toFixed(1)} mg/L</strong>
              </div>
              <input
                aria-label="Cytokinin level in sandbox"
                type="range"
                min={0}
                max={5}
                step={0.1}
                value={cytokininLevel}
                onChange={e => setCytokininLevel(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                Outcome: <span className={`font-bold ${organogenesisOutcome.color}`}>{organogenesisOutcome.text}</span>
              </div>
            </div>

            {/* Cryo Parameters */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-gold-300 uppercase">Cryo Kinetics</h3>
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span>DMSO (10%) Cryoprotectant:</span>
                <input
                  type="checkbox"
                  aria-label="Toggle DMSO Cryoprotectant in sandbox"
                  checked={hasCryoprotectant}
                  onChange={e => setHasCryoprotectant(e.target.checked)}
                  className="accent-gold-500 w-4 h-4"
                />
              </label>
              <div className="text-xs text-slate-300">
                Cooling Rate: <strong className="text-gold-400 font-mono">{coolingRate} °C/min</strong>
              </div>
              <input
                aria-label="Cooling rate in sandbox"
                type="range"
                min={0.5}
                max={10}
                step={0.5}
                value={coolingRate}
                onChange={e => setCoolingRate(parseFloat(e.target.value))}
                className="w-full accent-gold-500"
              />
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div>Temp: <span className="font-mono text-gold-300">{cryoTemp} °C</span></div>
                <div>Viability: <span className="font-mono text-emerald-400">{cellSurvivalRate}%</span></div>
              </div>
            </div>

            {/* Aseptic Cleanroom Status */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-300 uppercase">Cleanroom Dashboard</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>HEPA Airflow:</span>
                  <span className={hepaAirflowOn ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {hepaAirflowOn ? '✓ ACTIVE (0.3µm)' : '✗ OFF'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cabinet Sterility:</span>
                  <span className="text-emerald-400 font-bold font-mono">{hoodSterilityScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Curd Practical:</span>
                  <span className="text-purple-400 font-bold">✓ Lactobacillus isolated</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Challenge Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ISC Board Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                  Competency: {challenge.competencyLevel.toUpperCase()}
                </span>
                <span className="text-xs px-2 py-0.5 bg-gold-950 text-gold-300 border border-gold-800 rounded font-mono">
                  Node: {challenge.nodeId}
                </span>
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-400 border-rose-800'
                  : 'bg-gold-950/80 text-gold-400 border-gold-800'
              }`}
            >
              {difficulty} Tier
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Question Card */}
          <div
            className={`p-6 bg-slate-900/90 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-600 shadow-2xl shadow-rose-950' : 'border-slate-800'
            }`}
          >
            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-6">
              {challenge.question}
            </h2>

            {/* MCQ / Classify / Distinguish / Match / Evaluate / Analysis */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match' || challenge.type === 'evaluate' || challenge.type === 'analysis') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                        : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-emerald-500'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center leading-6 text-xs mr-3 font-bold text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {showExplanation && i === challenge.correctIndex && ' ✓'}
                    {showExplanation && i !== challenge.correctIndex && ' ✗'}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Interaction */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full mb-1">Draggable Components Palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable component: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white font-bold text-xs cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      aria-label={`Target slot ${targetId}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs font-mono text-slate-400 capitalize">
                        Target Slot: {targetId.replace('target_', '').toUpperCase()}
                      </span>
                      <div className="text-sm font-bold text-emerald-300 mt-2">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop component label here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify media formulation mapping"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm"
                >
                  Verify Media Formulation Map →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Interaction */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-1">
                  Drag items to arrange chronological laboratory sequence:
                </span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sortable item ${displayIndex + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-sm font-medium flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-center leading-6 text-xs font-bold text-emerald-400">
                      {displayIndex + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Confirm chronological procedure order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm"
                >
                  Confirm Procedural Order →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label="Numeric answer input"
                    type="number"
                    step="0.05"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter scientific value..."
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-emerald-500 outline-none w-56"
                  />
                  <span className="text-slate-400 font-mono text-sm">{challenge.unit}</span>
                  <motion.button
                    aria-label="Validate numeric answer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm"
                  >
                    Validate Number →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-2 bg-gold-900/60 hover:bg-gold-800 text-gold-200 border border-gold-700 rounded-xl text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[90px] space-y-2">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Constructed Workflow Pipeline:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-2.5 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs flex items-center gap-1.5">
                        {part}
                        <button
                          aria-label={`Remove part: ${part}`}
                          onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-200"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-slate-500 text-xs">Click parts above to construct pipeline...</span>}
                  </div>
                </div>

                <motion.button
                  aria-label="Check workflow construction"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' -> '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm"
                >
                  Check Workflow Construction →
                </motion.button>
              </div>
            )}

            {/* Progressive Step-By-Step Scientific Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-amber-300">Biotechnology Solution & Step-by-Step Rationale:</h3>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-amber-100 text-sm leading-relaxed">
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next reasoning step"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise assessment' : 'Proceed to next challenge'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-sm shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Proceed to Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & MASTERY REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl border border-emerald-700/80 text-center shadow-2xl space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Biotechnology Practicum Complete!</h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm">
              You have successfully demonstrated theoretical and practical mastery of nutrient media formulation, cryopreservation protocols, laminar airflow aseptic barriers, and diagnostic Gram staining.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[130px]">
                <div className="text-xs font-mono text-slate-400">Score Rating</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[130px]">
                <div className="text-xs font-mono text-slate-400">BKT Mastery</div>
                <div className="text-2xl font-black text-teal-300 uppercase mt-1">{masteryLevel}</div>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[130px]">
                <div className="text-xs font-mono text-slate-400">Errors Recorded</div>
                <div className="text-2xl font-black text-amber-400 mt-1">{errors}</div>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800 text-sm text-emerald-200">
            {errors === 0
              ? '🌟 PERFECT BIOTECHNOLOGY SCORE! Your grasp of nutrient formulations and aseptic techniques is flawless.'
              : errors <= 3
              ? '👏 EXCELLENT PERFORMANCE! You have solid laboratory diagnostic and theoretical foundations.'
              : '🌱 GOOD EFFORT! Review the specific misconception corrections below to solidify your understanding.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase">Your Targeted Concept Clarifications:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</div>
                    <div className="text-emerald-300">✓ Scientific Fact: {m.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block text-sm mb-0.5">Spaced Repetition Memory Anchor:</span>
              Next automated review scheduled in{' '}
              <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>💭</span> Scientific Reflection & Conceptual Synthesis
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                <span className="font-bold text-amber-300 block mb-1">1. What was the most surprising thing you learned?</span>
                <p className="text-slate-300 leading-relaxed">
                  How rapid thawing in a 37°C water bath saves cells by bypassing lethal ice recrystallisation, whereas slow warming allows sharp ice crystals to fuse and shear cellular membranes.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                <span className="font-bold text-gold-300 block mb-1">2. How would you explain this to a friend?</span>
                <p className="text-slate-300 leading-relaxed">
                  Nutrient media are like custom biochemical menus: bacteria thrive on LB broth, plant shoots/roots respond to precise auxin:cytokinin switches in MS/White&apos;s media, and animal cells require glucose-rich DMEM supplemented with 10% Fetal Bovine Serum to divide.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                <span className="font-bold text-emerald-300 block mb-1">3. Where in real life might you use this?</span>
                <p className="text-slate-300 leading-relaxed">
                  In biopharmaceutical plants culturing hybridoma cells to produce monoclonal antibodies (mAbs) for cancer therapy, in agricultural tissue culture micropropagating virus-free banana and sugarcane crops, or in clinical biobanks preserving stem cells at -196°C.
                </p>
              </div>
            </div>
          </div>

          {/* Capstone Activity */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-300">🚀 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-emerald-400 font-mono">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Workstation Competency Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiotechnologyNutrientMediaWhiteSim;