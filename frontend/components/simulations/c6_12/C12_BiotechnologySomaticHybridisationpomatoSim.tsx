'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED NODE CONSTANTS ───
const NODE_C12_BIOTECH_041 = 'c12_biotech_041'; // Somatic hybridisation & Micropropagation
const NODE_C12_BIOTECH_042 = 'c12_biotech_042'; // RNAi, Synthetic seeds, PHB
const NODE_C12_BIOTECH_043 = 'c12_biotech_043'; // Primary/Sec culture, Suspension/Monolayer, Finite/Continuous
const NODE_C12_BIOTECH_044 = 'c12_biotech_044'; // Roller bottle scale-up
const NODE_C12_BIOTECH_045 = 'c12_biotech_045'; // Hybridoma technology & Tissue engineering
const NODE_C12_BIOTECH_046 = 'c12_biotech_046'; // CAR-T therapy for cancer
const NODE_C12_BIOTECH_047 = 'c12_biotech_047'; // Bioinformatics & Databases
const NODE_C12_BIOTECH_048 = 'c12_biotech_048'; // ENTREZ & Taxonomy Browser
const NODE_C12_BIOTECH_049 = 'c12_biotech_049'; // Genomics types & Sequences (cDNA, EST, STS)
const NODE_C12_BIOTECH_050 = 'c12_biotech_050'; // BLAST, FASTA, Alignment types

const ALL_NODE_IDS = [
  NODE_C12_BIOTECH_041,
  NODE_C12_BIOTECH_042,
  NODE_C12_BIOTECH_043,
  NODE_C12_BIOTECH_044,
  NODE_C12_BIOTECH_045,
  NODE_C12_BIOTECH_046,
  NODE_C12_BIOTECH_047,
  NODE_C12_BIOTECH_048,
  NODE_C12_BIOTECH_049,
  NODE_C12_BIOTECH_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The National Biotechnology Mission: From Lab Bench to Cure',
  intro:
    'You are appointed Chief Biotechnologist at the National Agricultural and Biomedical Research Institute in New Delhi. A severe viral blight is devastating solanaceous crops across Punjab, industrial demands require sustainable bioplastics, and a regional hospital urgently needs precision CAR-T cell manufacturing and antibody diagnostics.',
  context:
    'You will master protoplast fusion (Pomato), RNAi viral shielding, scale-up in roller bottles, hybridoma HAT selection, CAR-T immunotherapy engineering, and computational bioinformatics using NCBI ENTREZ, BLAST, and FASTA.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question:
    'A researcher attempts to cross a tomato plant (Solanum lycopersicum) and a potato plant (Solanum tuberosum) via sexual pollination, but no viable seeds form. Why can somatic hybridisation succeed where sexual crossing fails?',
  options: [
    'Somatic hybridisation uses pollen from both parents simultaneously',
    'Somatic hybridisation strips the rigid cell walls with enzymes and fuses somatic protoplasts directly, bypassing sexual incompatibility barriers',
    'Somatic hybridisation changes potato DNA into animal DNA to induce fertilisation',
    'Somatic hybridisation only works on seeds after normal pollination occurs',
  ],
  correctIndex: 1,
  hintAfter:
    "Don't worry if you were unsure! Plant cell walls prevent somatic fusion unless enzymatically digested with cellulase and pectinase. Let us explore the molecular mechanics!",
};

// ─── INTERFACES ───
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

// ─── 22 RICH MULTI-TIER CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Somatic Hybridisation (Foundation - Recall)
  {
    id: 'ch_01_pomato_enzymes',
    nodeId: NODE_C12_BIOTECH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'To isolate naked protoplasts from potato and tomato leaf mesophyll, which exact enzyme mixture must be used to digest the plant cell wall and middle lamella?',
    options: [
      'Amylase and Protease',
      'Cellulase and Pectinase',
      'Lipase and DNA Polymerase',
      'Lysozyme and Chitinase',
    ],
    correctIndex: 1,
    explanation:
      'Cellulase breaks down the cellulose microfibrils in the primary cell wall, while pectinase breaks down the pectin polysaccharides in the middle lamella, yielding wall-less protoplasts.',
    hints: [
      'Think about what plant cell walls and the middle lamella glue are made of.',
      'Cellulose forms the main fibrous framework and pectin cements adjacent cells.',
      'The enzymes are named directly after their substrates: cellulose + pectin.',
    ],
    misconceptionIndex: 1,
  },

  // 2. Protoplast Fusion Reagent (Foundation - Understanding)
  {
    id: 'ch_02_fusion_peg',
    nodeId: NODE_C12_BIOTECH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Which chemical fusogen is standardly added to induce agglutination and membrane fusion between isolated plant protoplasts to form a heterokaryon?',
    options: [
      'Polyethylene Glycol (PEG)',
      'Sodium Dodecyl Sulphate (SDS)',
      'Ethidium Bromide',
      'Agarose Gel',
    ],
    correctIndex: 0,
    explanation:
      'Polyethylene glycol (PEG) alters membrane surface charge and causes dehydration at the contact zones, inducing lipid bilayer mixing and protoplast fusion.',
    hints: [
      'It is a high-molecular-weight polymer also used in chemical transfection.',
      'Its acronym is PEG.',
      'Polyethylene Glycol (PEG) or high-voltage electrofusion pulses bridge membranes.',
    ],
  },

  // 3. Drag Label - Pomato Fusion & Micropropagation (Foundation - Application)
  {
    id: 'ch_03_drag_pomato_stages',
    nodeId: NODE_C12_BIOTECH_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'Drag each laboratory stage label to its matching compartment in the plant biotechnology pipeline.',
    dragItems: [
      { label: 'Cellulase + Pectinase Digestion', targetId: 'box_step1' },
      { label: 'PEG Chemical Fusion', targetId: 'box_step2' },
      { label: 'Heterokaryon Selection', targetId: 'box_step3' },
      { label: 'Hardening & Acclimatisation', targetId: 'box_step4' },
    ],
    correctMapping: {
      box_step1: 'Cellulase + Pectinase Digestion',
      box_step2: 'PEG Chemical Fusion',
      box_step3: 'Heterokaryon Selection',
      box_step4: 'Hardening & Acclimatisation',
    },
    explanation:
      'Protoplasts are first isolated with digestive enzymes, fused using PEG to form heterokaryons, selected on differential media, and regenerated plantlets are hardened before soil transfer.',
    hints: [
      'First, the wall must be removed.',
      'Second, the naked protoplasts are merged chemically.',
      'Third, true hybrid cells are filtered, and finally regenerated clones are acclimatised.',
    ],
  },

  // 4. Micropropagation Order (Foundation - Analysis)
  {
    id: 'ch_04_microprop_sort',
    nodeId: NODE_C12_BIOTECH_041,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question:
      'Arrange the 4 sequential stages of clonal micropropagation in chronological order from initial explant to greenhouse establishment.',
    sortItems: [
      'Stage I: Initiation (surface sterilisation & explant establishment on culture medium)',
      'Stage II: Multiplication (repeated subculturing for rapid shoot proliferation)',
      'Stage III: Rooting (transfer to medium with elevated auxin-to-cytokinin ratio)',
      'Stage IV: Acclimatisation / Hardening (gradual adaptation to soil & ambient humidity)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Clonal micropropagation strictly follows: Initiation of sterile explant -> Shoot Multiplication -> In vitro Root induction with auxins -> Hardening/Acclimatisation in greenhouse.',
    hints: [
      'Start with getting the sterile tissue started in culture.',
      'Next, multiply the number of shoots exponentially.',
      'Shoots need roots before they can ever survive in soil.',
    ],
    misconceptionIndex: 2,
  },

  // 5. RNAi Pathway Specificity (Standard - Application)
  {
    id: 'ch_05_rnai_mechanism',
    nodeId: NODE_C12_BIOTECH_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'In transgenic papaya engineered for viral resistance via RNAi, what is the catalytic role of the Dicer endoribonuclease when foreign dsRNA appears in the cytoplasm?',
    options: [
      'It translates dsRNA directly into antiviral antibodies',
      'It cleaves long double-stranded RNA into 21-25 nucleotide small interfering RNAs (siRNAs)',
      'It acts as a DNA ligase to seal host chromosomes',
      'It destroys the plant cell nucleus to prevent viral entry',
    ],
    correctIndex: 1,
    explanation:
      'Dicer is an RNase III-family endonuclease that cleaves long dsRNA triggers into short 21-25 nucleotide siRNAs. These are then loaded onto the RISC complex to direct sequence-specific viral mRNA degradation (PTGS).',
    hints: [
      'Think of Dicer as molecular scissors for double-stranded RNA.',
      'It produces tiny 21-25 base pair RNA duplexes.',
      'Those fragments are called small interfering RNAs (siRNAs).',
    ],
    misconceptionIndex: 0,
  },

  // 6. Synthetic Seed Alginate Chemistry (Standard - Understanding)
  {
    id: 'ch_06_synth_seeds',
    nodeId: NODE_C12_BIOTECH_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Synthetic seeds (synseeds) encapsulate somatic embryos or shoot buds in a protective bio-matrix. Which gelation chemistry is standardly utilised?',
    options: [
      'Agar-agar boiling solution',
      'Sodium alginate dropped into Calcium chloride (CaCl2) solution to form calcium alginate beads',
      'Polyacrylamide gel crosslinked with TEMED',
      'Liquid paraffin wax coating',
    ],
    correctIndex: 1,
    explanation:
      'Somatic embryos mixed with sodium alginate form firm, permeable calcium alginate hydrogel beads when dropped into a CaCl2 bath via ion-exchange crosslinking (Ca2+ replaces Na+).',
    hints: [
      'It involves a natural polymer from brown algae and divalent calcium ions.',
      'Sodium alginate crosslinks with calcium chloride.',
      'Calcium alginate forms a gentle, nutrient-permeable artificial seed coat.',
    ],
    misconceptionIndex: 1,
  },

  // 7. PHB Bioplastic Genes (Standard - Analysis)
  {
    id: 'ch_07_phb_genes',
    nodeId: NODE_C12_BIOTECH_042,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Polyhydroxybutyrate (PHB) is a biodegradable polyester. Which three bacterial genes from Ralstonia eutropha (Alcaligenes eutrophus) are transferred into Arabidopsis or Brassica chloroplasts?',
    options: [
      'lacZ, lacY, lacA',
      'phbA (beta-ketothiolase), phbB (acetoacetyl-CoA reductase), and phbC (PHB synthase)',
      'cry1Ac, cry2Ab, bar',
      'p53, Rb, BRCA1',
    ],
    correctIndex: 1,
    explanation:
      'The PHB pathway converts Acetyl-CoA to PHB using 3 enzymes: beta-ketothiolase (phbA), acetoacetyl-CoA reductase (phbB), and PHB synthase (phbC).',
    hints: [
      'Look for the gene names starting with "phb".',
      'The enzymes condense acetyl-CoA, reduce it, and polymerise it into polyester.',
      'phbA, phbB, and phbC complete the biosynthetic trio.',
    ],
    misconceptionIndex: 2,
  },

  // 8. Primary vs Secondary Cell Culture (Standard - Distinguish)
  {
    id: 'ch_08_cell_culture_types',
    nodeId: NODE_C12_BIOTECH_043,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How does a primary animal cell culture differ fundamentally from a secondary (passaged) cell culture?',
    options: [
      'Primary culture cells are grown without any nutrients; secondary cultures use glucose',
      'Primary culture is derived directly from animal tissue via enzymatic/mechanical disaggregation; secondary culture is established by subculturing primary cells upon confluence',
      'Primary culture cells are all immortal cancer cells; secondary culture cells all die in 1 hour',
      'Primary cultures grow only in suspension; secondary cultures only grow on agar plates',
    ],
    correctIndex: 1,
    explanation:
      'Primary culture represents cells taken directly from excised tissue (using trypsin/collagenase). Once confluent, cells are detached and transferred into fresh medium to form a secondary culture.',
    hints: [
      'Focus on the origin: tissue vs prior culture flask.',
      'Passaging (subculturing) converts a primary culture into a secondary culture.',
      'Primary = direct from organism tissue; Secondary = subcultured post-confluence.',
    ],
    misconceptionIndex: 0,
  },

  // 9. Finite vs Continuous Cell Lines & Hayflick Limit (Standard - Application)
  {
    id: 'ch_09_hayflick_limit',
    nodeId: NODE_C12_BIOTECH_043,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Human diploid fibroblasts undergo a finite number of population doublings in culture before entering replicative senescence. According to the Hayflick Limit, what is this typical maximum number of doublings?',
    correctAnswer: 50,
    tolerance: 10,
    unit: 'population doublings',
    explanation:
      'Leonard Hayflick demonstrated that normal human fetal cells divide approximately 40 to 60 times (typically ~50 doublings) before telomere shortening triggers senescence.',
    hints: [
      'It is roughly half a century in number.',
      'The range is between 40 and 60 doublings for normal human diploid cells.',
      'Enter 50.',
    ],
  },

  // 10. Roller Bottle Culture Mechanics (Standard - Evaluation)
  {
    id: 'ch_10_roller_bottle_rpm',
    nodeId: NODE_C12_BIOTECH_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'In roller bottle bioprocessing for adherent Vero cells (used in rabies/polio vaccine production), why is the rotation speed kept extremely low (typically 0.1 to 1.0 rpm)?',
    options: [
      'Higher speeds freeze the liquid medium',
      'To allow alternate gentle bathing of the monolayer in nutrient medium and air exposure without creating hydrodynamic shear stress that detaches cells',
      'To prevent the electric motor from consuming too much power',
      'Because cells cannot photosynthesise at higher rotation',
    ],
    correctIndex: 1,
    explanation:
      'Slow rotation (0.1–1 rpm) ensures the adherent cell monolayer on the cylindrical inner wall is alternately submerged in nutrient broth and exposed to the gas phase (O2/CO2) while protecting fragile cells from lethal shear detachment.',
    hints: [
      'Adherent animal cells lack a rigid cell wall and detach if shaken violently.',
      'Rolling alternately dips cells into medium and lifts them into the air space for oxygenation.',
      'Gentle rotation avoids destructive fluid shear stress.',
    ],
    misconceptionIndex: 2,
  },

  // 11. Roller Bottle Scale-Up Calculations (Standard - Application)
  {
    id: 'ch_11_roller_bottle_calc',
    nodeId: NODE_C12_BIOTECH_044,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A standard T-75 flask provides 75 cm² of adherent surface area. A standard industrial roller bottle provides 850 cm² of cylindrical growth surface. By what approximate factor is the growth surface expanded per vessel? (Round to nearest integer)',
    correctAnswer: 11,
    tolerance: 1,
    unit: 'fold increase',
    explanation:
      '850 cm² / 75 cm² ≈ 11.33-fold increase in surface area, demonstrating why roller bottles provide an efficient footprint for scalable adherent culture.',
    hints: [
      'Divide 850 by 75.',
      '850 / 75 = 11.33.',
      'The factor rounded is approximately 11.',
    ],
  },

  // 12. Hybridoma Technology & HAT Selection (Advanced - Analysis)
  {
    id: 'ch_12_hybridoma_hat',
    nodeId: NODE_C12_BIOTECH_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In Kohler and Milstein hybridoma technology, why do unfused HGPRT-deficient myeloma cells die in HAT (Hypoxanthine-Aminopterin-Thymidine) selective medium?',
    options: [
      'Hypoxanthine poisons their mitochondria',
      'Aminopterin blocks the de novo nucleotide synthesis pathway, and lacking HGPRT, they cannot utilise the salvage pathway with hypoxanthine',
      'Thymidine digests their plasma membrane',
      'They die from contact inhibition with B lymphocytes',
    ],
    correctIndex: 1,
    explanation:
      'Aminopterin acts as an antimetabolite blocking dihydrofolate reductase and de novo nucleotide synthesis. HGPRT- myeloma cells cannot execute the salvage pathway using hypoxanthine, so they starve. Only hybridomas possessing functional HGPRT from the spleen B cell survive.',
    hints: [
      'Aminopterin cuts off the main (de novo) nucleotide highway.',
      'Cells must take the salvage detour using the enzyme HGPRT and hypoxanthine.',
      'The mutant myeloma parent lacks HGPRT and therefore cannot make DNA in HAT medium.',
    ],
    misconceptionIndex: 0,
  },

  // 13. Tissue Engineering Triad (Advanced - Construct)
  {
    id: 'ch_13_tissue_eng_construct',
    nodeId: NODE_C12_BIOTECH_045,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Construct the classic Tissue Engineering Triad by selecting the three indispensable foundational elements in order: [Scaffold] + [Cells] + [Signals/Growth Factors].',
    availableParts: [
      'Biodegradable Scaffold (PLLA/Collagen)',
      'Living Isolated Cells (Stem/Primary)',
      'Growth Factors & Bioreactor Signals (VEGF/FGF/Mechanical)',
      'High Dose Antibiotics',
      'Synthetic Plastic Bags',
    ],
    targetState:
      'Biodegradable Scaffold (PLLA/Collagen) Living Isolated Cells (Stem/Primary) Growth Factors & Bioreactor Signals (VEGF/FGF/Mechanical)',
    validationHint:
      'Select the 3 core pillars: 3D biodegradable matrix + living cells + biochemical/biomechanical cues.',
    explanation:
      'Tissue engineering relies on the triad of 3D porous biodegradable scaffolds, viable reparative cells, and regulatory growth factors/bioreactor conditioning.',
    hints: [
      'Start with the structural frame.',
      'Add the cellular builders.',
      'Add the chemical and mechanical signals that guide differentiation.',
    ],
  },

  // 14. CAR-T Receptor Architecture (Advanced - Analysis)
  {
    id: 'ch_14_cart_structure',
    nodeId: NODE_C12_BIOTECH_046,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Label the structural domains of a 2nd-generation Chimeric Antigen Receptor (CAR) engineered into anti-CD19 cancer-fighting T-cells.',
    dragItems: [
      { label: 'Extracellular scFv (Target Binding)', targetId: 'car_scfv' },
      { label: 'Hinge & Transmembrane Anchor', targetId: 'car_tm' },
      { label: 'Costimulatory Domain (CD28 / 4-1BB)', targetId: 'car_costim' },
      { label: 'Primary Signalling Domain (CD3-zeta)', targetId: 'car_cd3z' },
    ],
    correctMapping: {
      car_scfv: 'Extracellular scFv (Target Binding)',
      car_tm: 'Hinge & Transmembrane Anchor',
      car_costim: 'Costimulatory Domain (CD28 / 4-1BB)',
      car_cd3z: 'Primary Signalling Domain (CD3-zeta)',
    },
    explanation:
      'A CAR combines an extracellular single-chain antibody fragment (scFv) that binds tumour antigens MHC-independently, a transmembrane hinge, a CD28 or 4-1BB costimulatory domain for persistence, and an intracellular CD3-zeta chain for T-cell lytic activation.',
    hints: [
      'The top outside part binds CD19 antigen on cancer cells.',
      'The middle part spans the T-cell lipid bilayer.',
      'The intracellular tail contains costimulation (CD28/4-1BB) and the primary CD3-zeta firing trigger.',
    ],
  },

  // 15. CAR-T Personalised Protocol (Advanced - Application)
  {
    id: 'ch_15_cart_steps_sort',
    nodeId: NODE_C12_BIOTECH_046,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Arrange the clinical steps of autologous CAR-T cell manufacturing and delivery for a B-ALL leukaemia patient at AIIMS / Tata Memorial Centre.',
    sortItems: [
      '1. Leukapheresis (harvesting patient peripheral blood T-cells)',
      '2. Viral Vector Transduction (inserting anti-CD19 CAR gene via lentivirus)',
      '3. Ex Vivo Cell Expansion (growing billions of CAR-T cells in bioreactors)',
      '4. Lymphodepleting Conditioning Chemotherapy & Autologous CAR-T Reinfusion',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Autologous CAR-T protocol: Patient T-cell harvest via leukapheresis -> Lentiviral gene delivery of CAR -> Bioreactor expansion -> Patient lymphodepletion & cell reinfusion.',
    hints: [
      'First extract patient lymphocytes.',
      'Next genetically reprogram them with the CAR gene.',
      'Multiply them to high therapeutic doses, condition the patient, and reinfuse.',
    ],
    misconceptionIndex: 0,
  },

  // 16. Primary Nucleotide Sequence Databases (Standard - Recall)
  {
    id: 'ch_16_bioinfo_databases',
    nodeId: NODE_C12_BIOTECH_047,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question:
      'Which three global repositories exchange nucleotide sequence data daily as members of the International Nucleotide Sequence Database Collaboration (INSDC)?',
    options: [
      'PubMed, Google Scholar, Wikipedia',
      'NCBI GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan)',
      'SWISSPROT, PDB, and PIR',
      'BLAST, FASTA, and ClustalW',
    ],
    correctIndex: 1,
    explanation:
      'The INSDC consists of NCBI GenBank (Bethesda, USA), EMBL-EBI (Hinxton, UK/Europe), and DDBJ (Mishima, Japan). They synchronise all newly deposited DNA/RNA sequences daily.',
    hints: [
      'Think USA, Europe, and Japan primary DNA databases.',
      'GenBank, European Molecular Biology Lab, and DNA Data Bank of Japan.',
      'NCBI GenBank, EMBL, and DDBJ form the trio.',
    ],
    misconceptionIndex: 1,
  },

  // 17. SWISSPROT Curation (Standard - Distinguish)
  {
    id: 'ch_17_swissprot_distinction',
    nodeId: NODE_C12_BIOTECH_047,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'How does SWISSPROT (UniProtKB/Swiss-Prot) differ fundamentally from primary repositories like GenBank?',
    options: [
      'SWISSPROT is an uncurated collection of plant seeds',
      'SWISSPROT is a manually annotated, non-redundant, expert-curated protein sequence database with functional and 3D domain annotations',
      'SWISSPROT only accepts synthetic chemical formulas',
      'SWISSPROT contains raw unprocessed DNA sequence reads without review',
    ],
    correctIndex: 1,
    explanation:
      'While GenBank accepts direct, uncurated author submissions of nucleotides, SWISSPROT is an expert-curated protein database providing verified biochemical functions, post-translational modifications, and literature links.',
    hints: [
      'GenBank = raw primary nucleotide submissions; SWISSPROT = curated protein encyclopedia.',
      'Expert biocurators review and verify each SWISSPROT entry.',
      'It stores high-quality, non-redundant protein data.',
    ],
    misconceptionIndex: 1,
  },

  // 18. NCBI ENTREZ Cross-Linking (Standard - Application)
  {
    id: 'ch_18_entrez_search',
    nodeId: NODE_C12_BIOTECH_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Why is NCBI ENTREZ defined as a federated retrieval gateway rather than a standalone database?',
    options: [
      'Because it only works on Windows computers',
      'Because it queries multiple integrated databases (PubMed literature, Nucleotide, Protein, 3D Structure, OMIM, Taxonomy) simultaneously via reciprocal hyperlinks',
      'Because it can only display images of viruses',
      'Because it is an offline paper index published in books',
    ],
    correctIndex: 1,
    explanation:
      'ENTREZ is NCBI’s federated search and retrieval system that connects diverse databases through reciprocal neighbor links, allowing users to jump from a research paper (PubMed) to its cloned gene (Nucleotide) and solved crystal structure (PDB).',
    hints: [
      'ENTREZ is the search engine that bridges different databases together.',
      'It cross-references literature, DNA, protein, and 3D structures.',
      'One search links across all NCBI databases simultaneously.',
    ],
    misconceptionIndex: 0,
  },

  // 19. Genomics Classification (Advanced - Analysis)
  {
    id: 'ch_19_genomics_types',
    nodeId: NODE_C12_BIOTECH_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'A biotechnology team in Himachal Pradesh extracts total metagenomic DNA directly from Manikaran geothermal hot springs without culturing any bacteria. Which branch of genomics are they applying, and what is its chief advantage?',
    options: [
      'Structural genomics — to measure human eye color alleles',
      'Metagenomics — it bypasses the inability to culture >99% of environmental microbes in the lab, allowing discovery of novel thermostable industrial enzymes',
      'Classical Mendelism — to perform monohybrid test crosses on bacteria',
      'Pharmacogenomics — to test synthetic tablet dissolution',
    ],
    correctIndex: 1,
    explanation:
      'Metagenomics analyses the collective genetic material recovered directly from environmental samples (soil, water, gut). Because >99% of environmental microbes are unculturable on standard media, metagenomics unlocks unseen biodiversity.',
    hints: [
      'Sampling environmental community DNA directly without culturing is called metagenomics.',
      'Over 99% of wild bacteria cannot be grown on agar plates.',
      'Metagenomics discovers novel biocatalysts directly from environmental DNA.',
    ],
  },

  // 20. Sequence Types: cDNA vs EST vs STS (Advanced - Evaluation)
  {
    id: 'ch_20_sequence_types',
    nodeId: NODE_C12_BIOTECH_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Match the genomic sequence type to its correct structural definition: cDNA, EST, and STS.',
    options: [
      'cDNA = bacterial cell wall; EST = whole chromosome; STS = antibody',
      'cDNA = intron-free DNA synthesised from mRNA by reverse transcriptase; EST = short single-pass cDNA sequence read used for gene identification; STS = short unique genomic sequence of known chromosomal map position',
      'cDNA = genomic DNA with all introns; EST = viral coat protein; STS = synthetic agar',
      'cDNA = tRNA copy; EST = ribosomal subunit; STS = lipid layer',
    ],
    correctIndex: 1,
    explanation:
      'cDNA represents expressed mRNA transcripts free of introns; ESTs (Expressed Sequence Tags) are short ~200-500 bp single-pass cDNA reads used for rapid gene discovery; STSs (Sequence Tagged Sites) are unique single-copy chromosomal landmarks used in physical genome mapping.',
    hints: [
      'cDNA comes from reverse transcription of spliced mRNA (no introns).',
      'ESTs are short tags of expressed genes.',
      'STSs are unique mapping signposts on chromosomes.',
    ],
    misconceptionIndex: 2,
  },

  // 21. BLAST vs FASTA & BLAST Variants (Advanced - Analysis)
  {
    id: 'ch_21_blast_variants',
    nodeId: NODE_C12_BIOTECH_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'You have isolated an unknown nucleotide sequence from a soil bacterium and wish to search translated 6-frame protein databases for homologous enzymes. Which specific BLAST program must you run?',
    options: [
      'blastn (nucleotide query vs nucleotide database)',
      'blastp (protein query vs protein database)',
      'blastx (translated nucleotide query in 6 reading frames vs protein database)',
      'tblastn (protein query vs 6-frame translated nucleotide database)',
    ],
    correctIndex: 2,
    explanation:
      'blastx translates a nucleotide query in all 6 reading frames (3 forward, 3 reverse) and compares the resulting peptide translations against a target protein database, making it ideal for identifying coding regions in uncharacterised DNA.',
    hints: [
      'The query is nucleotide (DNA/RNA) and the target database is protein.',
      'The software must translate your nucleotide sequence before matching proteins.',
      'blastx performs 6-frame conceptual translation of the nucleotide query.',
    ],
  },

  // 22. Global vs Local Sequence Alignment (Advanced - Evaluation)
  {
    id: 'ch_22_alignment_algorithms',
    nodeId: NODE_C12_BIOTECH_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Which alignment algorithm is optimal for finding small, conserved catalytic domains (like a kinase domain) between two proteins that differ vastly in overall length and non-catalytic flanking regions?',
    options: [
      'Needleman-Wunsch Global Alignment (aligns end-to-end full length)',
      'Smith-Waterman Local Alignment (identifies highest scoring local matching sub-regions without penalising unmatched non-homologous ends)',
      'Random Shuffling Alignment',
      'Gel Electrophoresis Band Staining',
    ],
    correctIndex: 1,
    explanation:
      'Smith-Waterman local alignment locates islands of high local sequence similarity (such as conserved functional domains) between divergent sequences without imposing penalties for unaligned flanking regions, whereas Needleman-Wunsch global alignment forces end-to-end alignment.',
    hints: [
      'When proteins differ in length, end-to-end alignment would introduce huge gap penalties.',
      'You only want to align the shared functional domain (local similarity).',
      'Smith-Waterman is the gold-standard algorithm for local alignment.',
    ],
    misconceptionIndex: 1,
  },
];

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BIOTECH_041,
  title: 'ISC Class 12: Somatic Hybridisation, Cell Bioprocessing & Bioinformatics',
  definition:
    'Comprehensive Class 12 Biotechnology suite covering somatic hybridisation (Pomato) and micropropagation, RNAi and bioplastics, primary/secondary and finite/continuous animal cultures, roller bottle scale-up, hybridoma and CAR-T cell immunotherapy, and bioinformatics tools (ENTREZ, BLAST, genomics, sequence alignments).',
  eli5:
    'From fusing potato and tomato protoplasts to training killer T-cells against cancer and using bioinformatics supercomputers to align DNA sequences — biotechnology is the superpower of modifying biology for human welfare!',
  misconceptions: [
    {
      misconception: 'Pomato is produced by natural cross-pollination or grafting.',
      correction:
        'Tomato and potato are sexually incompatible. Pomato is an artificial somatic hybrid produced by digesting cell walls with cellulase/pectinase and fusing naked protoplasts using PEG.',
    },
    {
      misconception: 'Synthetic seeds are just regular seeds coated in plastic.',
      correction:
        'Synthetic seeds encapsulate tissue-culture derived somatic embryos or shoot tips inside biodegradable calcium alginate hydrogel beads.',
    },
    {
      misconception: 'All animal cells divide forever in culture dishes.',
      correction:
        'Normal diploid cells obey the Hayflick limit and senesce after ~50 doublings (finite). Only transformed or tumour-derived continuous cell lines (like HeLa, CHO) are immortal.',
    },
    {
      misconception: 'ENTREZ is a sequence database like GenBank.',
      correction:
        'ENTREZ is not a database; it is NCBI’s federated cross-database search engine that links GenBank, PubMed, Protein, and PDB records together.',
    },
    {
      misconception: 'Global alignment is always superior to local alignment.',
      correction:
        'Global alignment (Needleman-Wunsch) is only ideal for closely related sequences of equal length. For finding conserved domains in divergent proteins, local alignment (Smith-Waterman / BLAST) is superior.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which enzyme mixture produces naked plant protoplasts?',
      options: ['Cellulase + Pectinase', 'Amylase + Lipase', 'Lysozyme + Helicase', 'RNA Polymerase'],
      correctIndex: 0,
    },
    {
      question: 'What is the role of Dicer in the RNAi pathway?',
      options: ['Cleaves dsRNA into 21-25 nt siRNAs', 'Lays down DNA primers', 'Replicates viral DNA', 'Synthesises ATP'],
      correctIndex: 0,
    },
    {
      question: 'What selective medium isolates hybridoma clones in monoclonal antibody production?',
      options: ['HAT Medium', 'Luria-Bertani Broth', 'MS Agar without sucrose', 'Pure distilled water'],
      correctIndex: 0,
    },
    {
      question: 'Which antibody domain forms the antigen-binding tip of a CAR-T receptor?',
      options: ['scFv (single-chain variable fragment)', 'Fc constant domain', 'Complement C3', 'MHC Class I groove'],
      correctIndex: 0,
    },
    {
      question: 'What is the standard rotation speed for roller bottle cell culture?',
      options: ['0.1 to 1.0 rpm', '500 to 1000 rpm', '50 rpm', 'Stationary (0 rpm)'],
      correctIndex: 0,
    },
    {
      question: 'Which sequence type represents fully spliced, intron-free mRNA transcripts?',
      options: ['cDNA', 'Heterogeneous nuclear RNA', 'Genomic DNA', 'Telomeric repeats'],
      correctIndex: 0,
    },
    {
      question: 'Which BLAST variant queries translated nucleotide sequences against protein databases?',
      options: ['blastx', 'blastn', 'blastp', 'megablast'],
      correctIndex: 0,
    },
    {
      question: 'What is the primary characteristic of continuous cell lines like HeLa or CHO?',
      options: ['Immortal lifespan due to cellular transformation', 'Finite Hayflick limit of 50 doublings', 'Inability to grow on surfaces', 'Complete lack of DNA'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Demonstrate mastery across somatic hybridisation, plant/animal cell bioprocessing, CAR-T immunotherapy engineering, and computational bioinformatics sequence alignments.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Pomato Protoplast Fusion Reactor',
    instruction:
      'Adjust the Enzyme Digestion slider to strip cell walls, then apply PEG Fusogen to fuse Potato and Tomato protoplasts into a Heterokaryon!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIOTECH_041,
  },
  {
    title: 'Lab 2: RNAi Viral Silencing Engine',
    instruction:
      'Drag the viral dsRNA into the Dicer cutter, watch siRNAs load into RISC, and deploy the missile to destroy invading viral mRNA!',
    interactionType: 'click-parts',
    nodeId: NODE_C12_BIOTECH_042,
  },
  {
    title: 'Lab 3: Roller Bottle Cell Bioreactor Dynamics',
    instruction:
      'Adjust rotation speed (0.1–1.0 rpm) to see how the adherent monolayer alternates between nutrient broth and oxygenated headspace!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIOTECH_044,
  },
  {
    title: 'Lab 4: CAR-T Immunotherapy Assembly & Target Killing',
    instruction:
      'Assemble the CAR receptor (scFv + CD28 + CD3z) on an engineered T-cell and engage the CD19 tumour target to trigger cancer lysis!',
    interactionType: 'drag-position',
    nodeId: NODE_C12_BIOTECH_046,
  },
  {
    title: 'Lab 5: Interactive BLAST Sequence Alignment Workbench',
    instruction:
      'Shift the sequence alignment offset and test Needleman-Wunsch global vs Smith-Waterman local alignment match scores!',
    interactionType: 'drag-match',
    nodeId: NODE_C12_BIOTECH_050,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: What will happen to intact plant cells if placed in PEG fusion buffer BEFORE treating them with cellulase and pectinase enzymes?',
    options: [
      'They will fuse instantly into a giant super-cell',
      'Nothing will fuse because the rigid cellulose-pectin cell wall physically prevents plasma membranes from touching',
      'The cells will turn into animals',
      'The cell walls will spontaneously turn into gold',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Verify: Observe how naked protoplasts only emerge once enzyme digestion reaches 100%!',
    nodeId: NODE_C12_BIOTECH_041,
  },
  {
    question:
      'Predict: If roller bottle rotation speed is increased from 0.5 rpm to 250 rpm, what will happen to the adherent Vero cell culture?',
    options: [
      'Cells will produce 500x more vaccine',
      'Violent hydrodynamic shear forces will strip and tear the adherent cells off the glass wall, killing the culture',
      'Cells will start flying into the air without needing oxygen',
      'The medium will turn into solid agar',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Verify: Adjust the rotation slider beyond 1.5 rpm and watch the shear damage indicator rise!',
    nodeId: NODE_C12_BIOTECH_044,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice happens to the viral mRNA strand in the RNAi simulator once the RISC complex matches its guide siRNA?',
    observableOptions: [
      'The viral RNA replicates 10 times faster',
      'The viral mRNA is cleaved and destroyed by post-transcriptional gene silencing (PTGS)',
      'The viral RNA is turned into a chloroplast',
      'The viral RNA changes into DNA',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_BIOTECH_042,
  },
  {
    question:
      'In the sequence alignment workbench, what happens to the match score when you switch from Global (end-to-end) to Local (Smith-Waterman) alignment on sequences with non-homologous tails?',
    observableOptions: [
      'Local alignment score rises because unmatched terminal flanking regions are not penalised with huge gap penalties',
      'Local alignment deletes all sequences forever',
      'Both scores remain completely zero',
      'Local alignment requires internet disconnection',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIOTECH_050,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Biotechnologist Clinical Case: Designing NexCAR19',
  description:
    'In 2023, India approved its first indigenous CAR-T therapy (NexCAR19 / Actalycabtagene autoleucel) developed by IIT Bombay and Tata Memorial Hospital for relapsed B-cell lymphoma. You will map out the complete industrial flowchart for treating an acute leukaemia patient in New Delhi.',
  steps: [
    'Perform leukapheresis to harvest autologous CD3+ T-cells at AIIMS Delhi.',
    'Transduce T-cells with a recombinant lentivirus encoding the anti-CD19 scFv-CD28-CD3z CAR construct.',
    'Scale up T-cells in closed-system bioreactors to achieve >10^8 viable therapeutic cells.',
    'Administer fludarabine/cyclophosphamide lymphodepleting conditioning to the patient.',
    'Reinfuse autologous CAR-T cells and monitor cytokine release syndrome (CRS) using IL-6 biomarkers.',
  ],
};

// ─── MAIN COMPONENT ───
export function C12_BiotechnologySomaticHybridisationpomatoSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biotech'] || {
    name: 'Biotechnology',
    emoji: '🧬',
    color: 'emerald',
  };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery & Predict-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab Manipulations
  const [enzymeDigestion, setEnzymeDigestion] = useState(0); // 0 to 100%
  const [pegApplied, setPegApplied] = useState(false);
  const [heterokaryonFormed, setHeterokaryonFormed] = useState(false);

  // RNAi states
  const [rnaiStep, setRnaiStep] = useState<'idle' | 'dicer_cut' | 'risc_loaded' | 'cleaved'>('idle');

  // Roller Bottle states
  const [rollerRpm, setRollerRpm] = useState(0.5); // 0.1 to 5.0
  const [bottleAngle, setBottleAngle] = useState(0);

  // CAR-T assembly states
  const [carDomainsAdded, setCarDomainsAdded] = useState<string[]>([]);
  const [cancerLysisActive, setCancerLysisActive] = useState(false);

  // Alignment states
  const [seqOffset, setSeqOffset] = useState(0);
  const [alignmentMode, setAlignmentMode] = useState<'global' | 'local'>('local');

  // Adaptive difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongOptionIndex, setWrongOptionIndex] = useState<number | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Misconceptions
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
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

  // ─── 2D CANVAS ANIMATION (Roller Bottle & Cell Monolayer) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let localAngle = 0;

    const render = () => {
      localAngle += rollerRpm * 0.03;
      setBottleAngle(localAngle);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = 65;

      // Draw outer roller bottle cylinder
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(localAngle);

      // Bottle Glass Wall
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Adherent Cells on Wall Monolayer
      const numCells = 24;
      for (let i = 0; i < numCells; i++) {
        const theta = (i / numCells) * Math.PI * 2;
        const cellX = (radius - 5) * Math.cos(theta);
        const cellY = (radius - 5) * Math.sin(theta);
        ctx.fillStyle = rollerRpm > 1.5 ? '#f43f5e' : '#34d399'; // Red if shear damage
        ctx.beginPath();
        ctx.arc(cellX, cellY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Draw Liquid Medium Pool (stays at bottom due to gravity)
      ctx.save();
      ctx.fillStyle = 'rgba(239, 68, 68, 0.45)'; // Phenol red medium
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 4, Math.PI * 0.15, Math.PI * 0.85, false);
      ctx.closePath();
      ctx.fill();

      // Gas phase label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Headspace (O₂ / 5% CO₂)', cx, cy - 25);
      ctx.fillText(
        rollerRpm > 1.5 ? '⚠️ High Shear Detachment!' : 'Gentle Monolayer Bathing',
        cx,
        cy + 10
      );
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rollerRpm]);

  // ─── INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, activeChallenge]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (!isCorrect) {
      setWrongOptionIndex(idx);
      setTimeout(() => setWrongOptionIndex(null), 500);
    }
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant! Protoplast fusion overcomes sexual incompatibility.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // ─── ADVANCE PHASES ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Biotechnology Laboratory. Let us explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test all bioprocess tools in free play mode!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Prove your ISC Biotechnology mastery!');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to observe the molecular reality.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect ? 'Spot on observation!' : 'Check the reaction gauges carefully and see what changed.'
    );
  }, []);

  // ─── LAB 1: POMATO PROTOPLAST ACTIONS ───
  const handleDigestionSlider = useCallback((val: number) => {
    setEnzymeDigestion(val);
    audioManager.play('count');
    if (val === 100) {
      audioManager.play('sparkle');
    }
  }, []);

  const handleApplyPeg = useCallback(() => {
    if (enzymeDigestion < 80) {
      audioManager.play('error');
      speechManager.speak('Cannot fuse intact cells! Digest cell walls with cellulase and pectinase first.');
      return;
    }
    setPegApplied(true);
    audioManager.play('swoop');
    setTimeout(() => {
      setHeterokaryonFormed(true);
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Heterokaryon successfully formed! Potato + Tomato protoplasts fused!');
    }, 800);
  }, [enzymeDigestion]);

  // ─── LAB 2: RNAI ACTIONS ───
  const handleTriggerRnai = useCallback((step: 'dicer_cut' | 'risc_loaded' | 'cleaved') => {
    setRnaiStep(step);
    audioManager.play('tap');
    if (step === 'dicer_cut') {
      audioManager.play('swoop');
      speechManager.speak('Dicer cleaves long double stranded viral RNA into 21 nucleotide siRNAs.');
    } else if (step === 'risc_loaded') {
      audioManager.play('pickup');
      speechManager.speak('siRNA single strand loaded into the RISC silencing complex.');
    } else if (step === 'cleaved') {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Target viral mRNA destroyed by post-transcriptional gene silencing!');
    }
  }, []);

  // ─── LAB 4: CAR-T ACTIONS ───
  const handleAddCarDomain = useCallback((domain: string) => {
    setCarDomainsAdded((prev) => {
      if (prev.includes(domain)) return prev;
      audioManager.play('pickup');
      return [...prev, domain];
    });
  }, []);

  const handleTriggerCarLysis = useCallback(() => {
    if (carDomainsAdded.length < 3) {
      audioManager.play('error');
      speechManager.speak('Incomplete CAR! Need scFv targeting domain, CD28 costimulation, and CD3-zeta trigger.');
      return;
    }
    setCancerLysisActive(true);
    audioManager.play('drop-correct');
    audioManager.play('celebration');
    speechManager.speak('Perforin and granzymes released! CD19 positive lymphoma cell destroyed!');
  }, [carDomainsAdded]);

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let base = prev;
        if (base.length === 0 && activeChallenge.sortItems) {
          base = activeChallenge.sortItems.map((_, i) => i);
        }
        const arr = [...base];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Biotechnology Certification Achieved! Outstanding scientific rigor!');
  }, [errors, onComplete]);

  // ─── ANSWER HANDLER ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
        if (!isCorrect && typeof answer === 'number') {
          setWrongOptionIndex(answer);
        }
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <=
          (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setWrongOptionIndex(null);
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Accurate scientific reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => {
          setWrongShake(false);
          setWrongOptionIndex(null);
        }, 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Review the step-by-step scientific explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // ─── NEXT CHALLENGE ───
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
    setWrongOptionIndex(null);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-xl border border-emerald-700/50" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">{title}</h1>
            <p className="text-xs text-emerald-400 font-medium">ISC Class 12 Biotechnology • Unit V</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') setPhase('challenge');
                else if (p === 'sandbox') setPhase('sandbox');
                else if (p === 'explore') setPhase('explore');
                else setPhase('discovery');
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs rounded-lg font-semibold capitalize transition-colors ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery_phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Scenario Card */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/40 shadow-xl"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">
                <span>🌱</span> Research Mission Scenario
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-emerald-900/40 text-xs text-slate-300">
                <strong>Mission Directives:</strong> {SCENARIO.context}
              </div>
            </motion.div>

            {/* Curiosity Discovery Question */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-md">
                Pre-Lab Curiosity Check
              </span>
              <h3 className="text-base md:text-lg font-semibold text-white mt-3 mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {discoveryAnswered && (
                        <span className="text-sm font-bold">
                          {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect
                      ? '✓ Perfect deduction! Naked somatic cells can merge regardless of species barriers.'
                      : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Enter interactive labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore_phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exploration Step Card */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg">
                  Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-xs text-slate-400">
                  Concept: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-white">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
              <p className="text-amber-300 text-sm font-medium mt-1 mb-6 flex items-center gap-2">
                <span>⚡</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── LAB 1 INTERACTIVE VISUALIZER: POMATO PROTOPLAST ── */}
              {currentSlide === 0 && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  {/* Predict Check 1 */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-gold-900/50 mb-4">
                      <p className="text-sm font-semibold text-gold-300 mb-2">
                        🔮 {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-xs text-left bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SVG Molecular Digestion & Fusion Canvas */}
                  <div className="w-full flex justify-center">
                    <svg viewBox="0 0 600 240" className="w-full max-w-xl h-auto" aria-label="Protoplast fusion diagram">
                      {/* Potato Cell */}
                      <g
                        transform={
                          heterokaryonFormed
                            ? 'translate(250, 120)'
                            : `translate(${150 + enzymeDigestion * 0.5}, 120)`
                        }
                        className="transition-all duration-700"
                      >
                        {/* Rigid Cellulose Wall */}
                        <circle
                          cx="0"
                          cy="0"
                          r="45"
                          fill="none"
                          stroke="#ca8a04"
                          strokeWidth={Math.max(0, (1 - enzymeDigestion / 100) * 8)}
                          strokeDasharray="4 2"
                        />
                        {/* Potato Protoplast Membrane */}
                        <circle
                          cx="0"
                          cy="0"
                          r="38"
                          fill="#854d0e"
                          opacity={0.8}
                          stroke="#eab308"
                          strokeWidth="2"
                        />
                        {/* Potato Nucleus */}
                        <circle cx="-10" cy="-5" r="12" fill="#713f12" />
                        <text x="0" y="5" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">
                          {enzymeDigestion === 100 ? 'Potato Protoplast' : 'Potato Cell'}
                        </text>
                      </g>

                      {/* Tomato Cell */}
                      <g
                        transform={
                          heterokaryonFormed
                            ? 'translate(350, 120)'
                            : `translate(${450 - enzymeDigestion * 0.5}, 120)`
                        }
                        className="transition-all duration-700"
                      >
                        {/* Rigid Cellulose Wall */}
                        <circle
                          cx="0"
                          cy="0"
                          r="45"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth={Math.max(0, (1 - enzymeDigestion / 100) * 8)}
                          strokeDasharray="4 2"
                        />
                        {/* Tomato Protoplast Membrane */}
                        <circle
                          cx="0"
                          cy="0"
                          r="38"
                          fill="#dc2626"
                          opacity={0.8}
                          stroke="#f87171"
                          strokeWidth="2"
                        />
                        {/* Tomato Nucleus */}
                        <circle cx="10" cy="-5" r="12" fill="#991b1b" />
                        <text x="0" y="5" textAnchor="middle" fill="#fee2e2" fontSize="9" fontWeight="bold">
                          {enzymeDigestion === 100 ? 'Tomato Protoplast' : 'Tomato Cell'}
                        </text>
                      </g>

                      {/* Heterokaryon Fusion Bridge */}
                      {heterokaryonFormed && (
                        <g>
                          <ellipse
                            cx="300"
                            cy="120"
                            rx="85"
                            ry="48"
                            fill="rgba(168, 85, 247, 0.4)"
                            stroke="#c084fc"
                            strokeWidth="3"
                          />
                          <text x="300" y="125" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                            POMATO HETEROKARYON (2n + 2n)
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>

                  {/* Interactive Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <label htmlFor="enzyme-slider" className="text-xs text-slate-300 font-semibold flex justify-between">
                        <span>Cellulase + Pectinase Digestion:</span>
                        <span className="text-emerald-400 font-bold">{enzymeDigestion}% Naked Protoplasts</span>
                      </label>
                      <input
                        id="enzyme-slider"
                        aria-label="Enzyme digestion slider percentage"
                        type="range"
                        min={0}
                        max={100}
                        value={enzymeDigestion}
                        onChange={(e) => handleDigestionSlider(Number(e.target.value))}
                        className="w-full mt-2 accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-300 font-semibold">PEG Chemical Fusogen:</p>
                        <p className="text-[11px] text-slate-500">Polyethylene glycol membrane bridging</p>
                      </div>
                      <motion.button
                        aria-label="Apply Polyethylene Glycol fusogen"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleApplyPeg}
                        disabled={enzymeDigestion < 80 || heterokaryonFormed}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                          heterokaryonFormed
                            ? 'bg-purple-900/60 text-purple-300 border border-purple-600'
                            : enzymeDigestion >= 80
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50'
                            : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        }`}
                      >
                        {heterokaryonFormed ? '✓ Fused!' : 'Apply PEG 30%'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2 INTERACTIVE VISUALIZER: RNAi ENGINE ── */}
              {currentSlide === 1 && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex flex-wrap gap-3 justify-center">
                    <motion.button
                      aria-label="Deploy Dicer Endoribonuclease"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTriggerRnai('dicer_cut')}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                        rnaiStep === 'dicer_cut'
                          ? 'bg-gold-600 border-gold-400 text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      1. Deploy Dicer Endoribonuclease
                    </motion.button>
                    <motion.button
                      aria-label="Load siRNA into RISC Complex"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTriggerRnai('risc_loaded')}
                      disabled={rnaiStep === 'idle'}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                        rnaiStep === 'risc_loaded'
                          ? 'bg-gold-600 border-gold-400 text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-300 disabled:opacity-40'
                      }`}
                    >
                      2. Load siRNA into RISC Complex
                    </motion.button>
                    <motion.button
                      aria-label="Cleave target viral messenger RNA"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTriggerRnai('cleaved')}
                      disabled={rnaiStep !== 'risc_loaded'}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                        rnaiStep === 'cleaved'
                          ? 'bg-emerald-600 border-emerald-400 text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-300 disabled:opacity-40'
                      }`}
                    >
                      3. Cleave Target Viral mRNA (PTGS)
                    </motion.button>
                  </div>

                  {/* RNAi SVG Visualization */}
                  <svg viewBox="0 0 600 200" className="w-full max-w-xl mx-auto" aria-label="RNA interference molecular mechanism">
                    {/* dsRNA Trigger */}
                    <g transform="translate(40, 50)">
                      <rect x="0" y="0" width="120" height="20" rx="4" fill="#38bdf8" />
                      <rect x="0" y="24" width="120" height="20" rx="4" fill="#0284c7" />
                      <text x="60" y="32" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                        Viral dsRNA Trigger
                      </text>
                    </g>

                    {/* Dicer Molecular Scissors */}
                    <g
                      transform={
                        rnaiStep !== 'idle' ? 'translate(200, 45)' : 'translate(200, -50)'
                      }
                      className="transition-all duration-500"
                    >
                      <path d="M 0 0 L 30 30 L 10 50 Z" fill="#f43f5e" />
                      <path d="M 0 60 L 30 30 L 10 10 Z" fill="#e11d48" />
                      <text x="40" y="35" fill="#fda4af" fontSize="10" fontWeight="bold">
                        Dicer RNase III
                      </text>
                    </g>

                    {/* siRNAs (21-25 nt) */}
                    {(rnaiStep === 'dicer_cut' || rnaiStep === 'risc_loaded' || rnaiStep === 'cleaved') && (
                      <g transform="translate(320, 55)">
                        <rect x="0" y="0" width="40" height="8" rx="2" fill="#38bdf8" />
                        <rect x="0" y="12" width="40" height="8" rx="2" fill="#0284c7" />
                        <text x="20" y="32" textAnchor="middle" fill="#7dd3fc" fontSize="8">
                          21 nt siRNA
                        </text>
                      </g>
                    )}

                    {/* RISC Complex */}
                    <g
                      transform={
                        rnaiStep === 'risc_loaded' || rnaiStep === 'cleaved'
                          ? 'translate(420, 60)'
                          : 'translate(420, -50)'
                      }
                      className="transition-all duration-500"
                    >
                      <circle cx="30" cy="30" r="32" fill="#6366f1" opacity={0.85} />
                      <text x="30" y="34" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                        RISC + Guide
                      </text>
                    </g>

                    {/* Target Viral mRNA */}
                    <g transform="translate(40, 140)">
                      <line
                        x1="0"
                        y1="20"
                        x2={rnaiStep === 'cleaved' ? '200' : '520'}
                        y2="20"
                        stroke={rnaiStep === 'cleaved' ? '#ef4444' : '#22c55e'}
                        strokeWidth="8"
                        strokeDasharray={rnaiStep === 'cleaved' ? '12 6' : '0'}
                      />
                      <text x="260" y="10" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">
                        {rnaiStep === 'cleaved'
                          ? '💥 Cleaved & Inactivated Viral mRNA (PTGS)'
                          : 'Target Pathogen Viral mRNA Strand'}
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ── LAB 3 INTERACTIVE VISUALIZER: ROLLER BOTTLE ── */}
              {currentSlide === 2 && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  {/* Observation Question */}
                  {!observationAnswered && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 mb-2">
                      <p className="text-sm font-semibold text-amber-300 mb-2">
                        🔍 {OBSERVATION_QUESTIONS[0].question}
                      </p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* HTML Canvas with requestAnimationFrame */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <canvas ref={canvasRef} width={220} height={220} className="rounded-full shadow-inner" aria-label="Roller bottle live simulation canvas" />
                      <span className="text-xs text-slate-400 mt-2">Cross-Section: Monolayer on Inner Wall</span>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <label htmlFor="roller-rpm-slider" className="text-xs text-slate-300 font-semibold flex justify-between">
                          <span>Roller Rotation Speed:</span>
                          <span
                            className={`font-bold ${
                              rollerRpm > 1.5 ? 'text-rose-400' : 'text-emerald-400'
                            }`}
                          >
                            {rollerRpm > 1.5 ? '✗ ' : '✓ '}
                            {rollerRpm.toFixed(1)} RPM {rollerRpm > 1.5 && '(CRITICAL SHEAR!)'}
                          </span>
                        </label>
                        <input
                          id="roller-rpm-slider"
                          aria-label="Roller bottle rotation speed slider in RPM"
                          type="range"
                          min={0.1}
                          max={3.0}
                          step={0.1}
                          value={rollerRpm}
                          onChange={(e) => setRollerRpm(Number(e.target.value))}
                          className="w-full mt-2 accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
                        <div className="flex justify-between">
                          <span>Adherent Surface Area:</span>
                          <span className="font-bold text-gold-400">850 cm² (Cylindrical Wall)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Oxygen Dissolution:</span>
                          <span className="font-bold text-emerald-400">✓ High (Thin Film Alternation)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fluid Shear Stress:</span>
                          <span
                            className={`font-bold ${
                              rollerRpm > 1.5 ? 'text-rose-400' : 'text-slate-400'
                            }`}
                          >
                            {rollerRpm > 1.5 ? '✗ Lethal (>2.5 dyn/cm²)' : '✓ Safe (<0.8 dyn/cm²)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4 INTERACTIVE VISUALIZER: CAR-T THERAPY ── */}
              {currentSlide === 3 && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex flex-wrap gap-2 justify-center mb-2">
                    {[
                      '1. scFv Antibody Tip (Anti-CD19)',
                      '2. CD28 Costimulatory Domain',
                      '3. CD3-zeta Signalling Chain',
                    ].map((part) => (
                      <motion.button
                        key={part}
                        aria-label={`Add domain ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddCarDomain(part)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                          carDomainsAdded.includes(part)
                            ? 'bg-emerald-900/80 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {carDomainsAdded.includes(part) ? '✓ Added ' : '+ Add '}
                        {part.split(' ')[1]}
                      </motion.button>
                    ))}
                  </div>

                  {/* CAR-T SVG Battle Diagram */}
                  <svg viewBox="0 0 600 220" className="w-full max-w-xl mx-auto" aria-label="CAR-T cell destroying cancer cell">
                    {/* Engineered CAR-T Cell */}
                    <g transform="translate(140, 110)">
                      <circle cx="0" cy="0" r="55" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                      <text x="0" y="4" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">
                        CAR T-Cell
                      </text>

                      {/* Assembled CAR Receptors */}
                      <g transform="translate(55, 0)">
                        {/* Intracellular CD3z */}
                        {carDomainsAdded.some((d) => d.includes('CD3-zeta')) && (
                          <circle cx="-15" cy="0" r="6" fill="#f59e0b" />
                        )}
                        {/* Costimulatory CD28 */}
                        {carDomainsAdded.some((d) => d.includes('CD28')) && (
                          <rect x="-8" y="-4" width="8" height="8" rx="2" fill="#ec4899" />
                        )}
                        {/* Transmembrane stalk */}
                        <line x1="0" y1="0" x2="25" y2="0" stroke="#94a3b8" strokeWidth="4" />
                        {/* Extracellular scFv */}
                        {carDomainsAdded.some((d) => d.includes('scFv')) && (
                          <path d="M 25 -10 L 40 0 L 25 10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                        )}
                      </g>
                    </g>

                    {/* CD19+ Lymphoma Cancer Cell */}
                    <g
                      transform={
                        cancerLysisActive ? 'translate(440, 110) scale(0.6)' : 'translate(440, 110)'
                      }
                      className="transition-all duration-700"
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r="50"
                        fill={cancerLysisActive ? '#450a0a' : '#7f1d1d'}
                        stroke={cancerLysisActive ? '#ef4444' : '#f87171'}
                        strokeWidth="3"
                        strokeDasharray={cancerLysisActive ? '6 4' : '0'}
                      />
                      <text x="0" y="4" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
                        {cancerLysisActive ? '💥 LYSING' : 'B-ALL Lymphoma'}
                      </text>

                      {/* CD19 Surface Antigen Target */}
                      <g transform="translate(-50, 0)">
                        <circle cx="0" cy="0" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                        <text x="0" y="-10" textAnchor="middle" fill="#fde68a" fontSize="8">
                          CD19
                        </text>
                      </g>
                    </g>
                  </svg>

                  <div className="flex justify-center">
                    <motion.button
                      aria-label="Engage CD19 Cancer Target"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTriggerCarLysis}
                      disabled={carDomainsAdded.length < 3 || cancerLysisActive}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        cancerLysisActive
                          ? 'bg-rose-900 text-rose-300 border border-rose-600'
                          : carDomainsAdded.length === 3
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50'
                          : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      }`}
                    >
                      {cancerLysisActive ? '✓ Target Destroyed' : 'Engage CD19 Cancer Target →'}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── LAB 5 INTERACTIVE VISUALIZER: BLAST ALIGNMENT ── */}
              {currentSlide === 4 && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="flex gap-2">
                      <button
                        aria-label="Switch to Smith-Waterman Local Alignment"
                        onClick={() => setAlignmentMode('local')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                          alignmentMode === 'local'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Smith-Waterman (Local / BLAST)
                      </button>
                      <button
                        aria-label="Switch to Needleman-Wunsch Global Alignment"
                        onClick={() => setAlignmentMode('global')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                          alignmentMode === 'global'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Needleman-Wunsch (Global)
                      </button>
                    </div>

                    <span className="text-xs text-slate-300 font-mono">
                      Offset: <strong className="text-emerald-400">{seqOffset}</strong> bp
                    </span>
                  </div>

                  {/* Alignment Sequence Matrix */}
                  <div className="p-4 bg-slate-900 rounded-xl font-mono text-sm overflow-x-auto border border-slate-800 space-y-2">
                    <div className="flex items-center gap-4 text-slate-400 text-xs">
                      <span className="w-20">Query:</span>
                      <span className="text-gold-300 tracking-widest font-bold">A T G C C G T A A T T G C</span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400 text-xs">
                      <span className="w-20">Database:</span>
                      <motion.span
                        animate={{ x: seqOffset * 14 }}
                        className="text-amber-300 tracking-widest font-bold inline-block"
                      >
                        G G A T G C C G T A A C C
                      </motion.span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400 text-xs">
                      <span className="w-20">Matches:</span>
                      <span className="text-emerald-400 tracking-widest font-bold">
                        {seqOffset === -2 ? '  | | | | | | | |' : '  . . . | . . . .'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <label htmlFor="blast-offset-slider" className="text-xs text-slate-300 font-semibold flex justify-between">
                      <span>Shift Query Alignment Window:</span>
                      <span className="text-gold-400 font-bold">
                        {seqOffset === -2 ? '✓ Optimal Homology Score: 92% (E-value: 1e-12)' : '✗ Suboptimal Score: 28%'}
                      </span>
                    </label>
                    <input
                      id="blast-offset-slider"
                      aria-label="Shift query sequence offset"
                      type="range"
                      min={-4}
                      max={4}
                      value={seqOffset}
                      onChange={(e) => setSeqOffset(Number(e.target.value))}
                      className="w-full mt-2 accent-gold-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Lab Navigation Controls */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Go to previous lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold disabled:opacity-40"
                >
                  ← Prev Lab
                </motion.button>

                <div className="flex gap-1.5" aria-hidden="true">
                  {EXPLORATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentSlide ? 'bg-emerald-500 w-6' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Go to next lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-900/40"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Open sandbox mode"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/50"
                  >
                    Open Free Sandbox →
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ──�� */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox_phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Bioprocess Sandbox & Simulator</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Free play mode — tweak parameters with zero penalty before taking board challenges.
                  </p>
                </div>
                <motion.button
                  aria-label="Proceed to challenges"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/50"
                >
                  Ready for Challenges! →
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sandbox Control 1: Enzyme & PEG */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-emerald-400">Pomato Protoplast Station</h3>
                  <div>
                    <label htmlFor="sandbox-enzyme" className="text-xs text-slate-400 flex justify-between">
                      <span>Cellulase/Pectinase:</span>
                      <span className="text-white font-bold">{enzymeDigestion}%</span>
                    </label>
                    <input
                      id="sandbox-enzyme"
                      aria-label="Sandbox enzyme digestion slider"
                      type="range"
                      min={0}
                      max={100}
                      value={enzymeDigestion}
                      onChange={(e) => setEnzymeDigestion(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <button
                    aria-label="Toggle heterokaryon state"
                    onClick={() => setHeterokaryonFormed((prev) => !prev)}
                    className="w-full py-2 bg-purple-900/60 hover:bg-purple-800/60 border border-purple-600 rounded-lg text-xs font-bold text-purple-200"
                  >
                    Toggle Heterokaryon State: {heterokaryonFormed ? '✓ FUSED' : '✗ SEPARATED'}
                  </button>
                </div>

                {/* Sandbox Control 2: Roller Bottle RPM */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-gold-400">Roller Bioreactor Speed</h3>
                  <div>
                    <label htmlFor="sandbox-rpm" className="text-xs text-slate-400 flex justify-between">
                      <span>Rotation Speed:</span>
                      <span className="text-white font-bold">{rollerRpm.toFixed(1)} RPM</span>
                    </label>
                    <input
                      id="sandbox-rpm"
                      aria-label="Sandbox roller bioreactor rotation speed"
                      type="range"
                      min={0.1}
                      max={4.0}
                      step={0.1}
                      value={rollerRpm}
                      onChange={(e) => setRollerRpm(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Watch the live animated canvas in Lab 3 or observe shear warnings at &gt;1.5 RPM.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge_phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Progress & Difficulty Bar */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 bg-slate-800 rounded-lg text-slate-300">
                  Challenge {currentChallenge + 1} / {filteredChallenges.length}
                </span>

                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : difficulty === 'standard'
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {difficulty} TIER
                </motion.span>

                <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 bg-amber-950/40 rounded border border-amber-800/40">
                  NEP Level: {activeChallenge.competencyLevel}
                </span>
              </div>

              <div className="text-xs text-slate-400">
                Mastery Score: <strong className="text-emerald-400">{scoreBreakdown.correct}</strong> /{' '}
                {scoreBreakdown.total}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
              />
            </div>

            {/* ── QUESTION CARD ── */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900 border-slate-800 shadow-xl'
              }`}
            >
              <h2 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
                {activeChallenge.question}
              </h2>

              {/* 1. MCQ Types (classify, distinguish, match) */}
              {(activeChallenge.type === 'classify' ||
                activeChallenge.type === 'distinguish' ||
                activeChallenge.type === 'match') &&
                activeChallenge.options && (
                  <div className="space-y-3">
                    {activeChallenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation || answerRevealed}
                        className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all ${
                          showExplanation && i === activeChallenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : showExplanation && i !== activeChallenge.correctIndex
                            ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {showExplanation && (
                            <span className="text-sm font-bold">
                              {i === activeChallenge.correctIndex ? '✓ Correct' : '✗ Incorrect'}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* 2. Drag-Label Challenge */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Drag these labels:</span>
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable label: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeChallenge.dragItems.map((item, i) => (
                      <div
                        key={i}
                        role="region"
                        aria-label={`Target Slot ${i + 1}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500 flex flex-col justify-center min-h-[70px]"
                      >
                        <span className="text-[11px] text-slate-500">Target Slot {i + 1}:</span>
                        <span className="text-sm font-bold text-emerald-300">
                          {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop matching label here...'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Check label placements"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
                  >
                    Check Label Placements →
                  </motion.button>
                </div>
              )}

              {/* 3. Drag-Sort Challenge */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag to re-order into correct sequential steps:</p>
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${idx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl text-xs md:text-sm font-medium text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    aria-label="Submit ordered sequence"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
                  >
                    Submit Ordered Sequence →
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Challenge */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      aria-label={`Enter numerical value in ${activeChallenge.unit}`}
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical value..."
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-xs text-slate-400 font-semibold">{activeChallenge.unit}</span>
                  </div>
                  <motion.button
                    aria-label="Check numerical value"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
                  >
                    Check Numerical Value →
                  </motion.button>
                </div>
              )}

              {/* 5. Construct Challenge */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add part ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 rounded-lg text-xs font-semibold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  {/* Assembled Parts Container */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-emerald-900/60 border border-emerald-600 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-2"
                      >
                        <span>✓ {part}</span>
                        <button
                          aria-label={`Remove part ${part}`}
                          onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-200 font-bold"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600">Click components above to build...</span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      aria-label="Validate assembly"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(constructParts.join(' '))}
                      disabled={showExplanation || constructParts.length === 0}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
                    >
                      Validate Assembly →
                    </motion.button>
                    <button
                      aria-label="Reset construct parts"
                      onClick={() => setConstructParts([])}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP-BY-STEP EXPLANATION ── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-emerald-950/50 to-slate-950 rounded-2xl border border-emerald-800/60 space-y-4"
                >
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <span>💡</span> Scientific Breakdown
                  </div>

                  <div className="space-y-2">
                    {activeChallenge.explanation
                      .split('. ')
                      .filter((s) => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs md:text-sm text-slate-200 leading-relaxed"
                        >
                          <strong className="text-emerald-400">Step {i + 1}:</strong> {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    {revealedSteps <
                    activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        aria-label="Reveal next sentence of scientific explanation"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 rounded-xl text-xs font-bold"
                      >
                        Reveal Next Sentence →
                      </motion.button>
                    ) : (
                      <motion.button
                        aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission' : 'Go to next challenge'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-emerald-900/50"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length
                          ? 'Complete Mission →'
                          : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: FINAL MASTERY & COMPLETION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete_phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700/60 shadow-2xl text-center space-y-4">
              <span className="text-5xl" aria-hidden="true">🏆</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                ISC Biotechnology Master Certification
              </h2>

              {/* Personalized Motivational Feedback */}
              <div className="py-2">
                {errors === 0 && (
                  <p className="text-xl font-extrabold text-emerald-400">✓ PERFECT SCORE!</p>
                )}
                {errors >= 1 && errors <= 3 && (
                  <p className="text-xl font-extrabold text-emerald-300">✓ Great work!</p>
                )}
                {errors >= 4 && errors <= 7 && (
                  <p className="text-xl font-extrabold text-amber-300">Good effort!</p>
                )}
                {errors >= 8 && (
                  <p className="text-xl font-extrabold text-rose-400">Do not give up — You WILL get this!</p>
                )}
              </div>

              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                You have demonstrated rigorous theoretical and practical mastery of somatic hybridisation,
                bioprocessing, cell therapies, and bioinformatics.
              </p>

              <div className="flex flex-wrap justify-center gap-4 py-4">
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[140px]">
                  <p className="text-xs text-slate-400">Final Score</p>
                  <p className="text-2xl font-black text-emerald-400 mt-1">
                    {Math.max(0, 100 - errors * 5)}%
                  </p>
                </div>
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[140px]">
                  <p className="text-xs text-slate-400">BKT Mastery Tier</p>
                  <p className="text-2xl font-black text-gold-400 mt-1 capitalize">{masteryLevel}</p>
                </div>
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[140px]">
                  <p className="text-xs text-slate-400">SRS Spaced Review</p>
                  <p className="text-2xl font-black text-amber-400 mt-1">
                    In {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                  </p>
                </div>
              </div>
            </div>

            {/* ─── SPACED REPETITION SCHEDULE (SRS) CARD ─── */}
            <div className="p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-500/40 shadow-xl space-y-3 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <span>📅</span> Spaced Repetition Schedule (SRS)
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-500/30">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Optimal Retention Review Window</h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}), our spaced repetition algorithm recommends reviewing this topic{' '}
                <strong className="text-amber-300 font-bold">
                  in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                to strengthen long-term synaptic retention and lock in board-exam recall.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-center">
                <div className={`p-3 rounded-xl border text-xs transition-colors ${errors === 0 ? 'bg-amber-950/80 border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-950/50' : 'bg-slate-950/80 border-slate-800 text-slate-500'}`}>
                  <span className="block text-[11px] text-slate-400">0 Errors</span>
                  <span className="text-sm font-black text-emerald-400">7 Days</span>
                </div>
                <div className={`p-3 rounded-xl border text-xs transition-colors ${errors >= 1 && errors <= 3 ? 'bg-amber-950/80 border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-950/50' : 'bg-slate-950/80 border-slate-800 text-slate-500'}`}>
                  <span className="block text-[11px] text-slate-400">1–3 Errors</span>
                  <span className="text-sm font-black text-amber-400">3 Days</span>
                </div>
                <div className={`p-3 rounded-xl border text-xs transition-colors ${errors >= 4 ? 'bg-amber-950/80 border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-950/50' : 'bg-slate-950/80 border-slate-800 text-slate-500'}`}>
                  <span className="block text-[11px] text-slate-400">4+ Errors</span>
                  <span className="text-sm font-black text-rose-400">1 Day</span>
                </div>
              </div>
            </div>

            {/* Reflection Questions Section */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-left">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <span>🤔</span> Reflection & Metacognition
              </div>
              <h3 className="text-base font-bold text-white">Consolidate Your Learning</h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="ref-q1" className="text-xs font-semibold text-slate-300 block">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    id="ref-q1"
                    aria-label="What was the most surprising thing you learned?"
                    rows={2}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    placeholder="Reflect on protoplast fusion, CAR-T design, or bioinformatics tools..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ref-q2" className="text-xs font-semibold text-slate-300 block">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    id="ref-q2"
                    aria-label="How would you explain this to a friend?"
                    rows={2}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    placeholder="Summarise the core concept in simple everyday terms..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ref-q3" className="text-xs font-semibold text-slate-300 block">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    id="ref-q3"
                    aria-label="Where in real life might you use this?"
                    rows={2}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    placeholder="Think about medical therapies, agriculture, biomanufacturing, or data science..."
                  />
                </div>
              </div>
            </div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900/50 space-y-4">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  ⚠️ Your Diagnostic Misconception Review
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-xs text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                        <p className="text-xs text-emerald-400 font-semibold">✓ Board Correction: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Real World Capstone Case Study */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <span>🏥</span> Clinical Application Arc
              </div>
              <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="space-y-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-gold-900/70 text-gold-300 font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && (
        <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />
      )}
      {showSparkle && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />
      )}
    </div>
  );
}

export default C12_BiotechnologySomaticHybridisationpomatoSim;