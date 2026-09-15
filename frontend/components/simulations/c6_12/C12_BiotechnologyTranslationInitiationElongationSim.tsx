'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (Class 12 ISC Biotechnology) ───
const NODE_C12_BIOTECH_011 = 'c12_biotech_011';
const NODE_C12_BIOTECH_012 = 'c12_biotech_012';
const NODE_C12_BIOTECH_013 = 'c12_biotech_013';
const NODE_C12_BIOTECH_014 = 'c12_biotech_014';
const NODE_C12_BIOTECH_015 = 'c12_biotech_015';
const NODE_C12_BIOTECH_016 = 'c12_biotech_016';
const NODE_C12_BIOTECH_017 = 'c12_biotech_017';
const NODE_C12_BIOTECH_018 = 'c12_biotech_018';
const NODE_C12_BIOTECH_019 = 'c12_biotech_019';
const NODE_C12_BIOTECH_020 = 'c12_biotech_020';

const ALL_NODE_IDS = [
  NODE_C12_BIOTECH_011,
  NODE_C12_BIOTECH_012,
  NODE_C12_BIOTECH_013,
  NODE_C12_BIOTECH_014,
  NODE_C12_BIOTECH_015,
  NODE_C12_BIOTECH_016,
  NODE_C12_BIOTECH_017,
  NODE_C12_BIOTECH_018,
  NODE_C12_BIOTECH_019,
  NODE_C12_BIOTECH_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Operation Bio-Synthesis: Engineering Recombinant Human Insulin',
  intro: 'At the Biocon Bioresearch Centre in Bengaluru, your team is tasked with synthesizing therapeutic human insulin, cloning it into high-yield vectors, regulating bacterial expression operons, and purifying active functional protein without immunogenic bacterial tags.',
  context: 'You will navigate the central dogma assembly line: decoding mRNA on the 70S ribosome, troubleshooting reverse transcription, mastering plasmid cloning, CTAB DNA isolation, gene delivery, and blue-white colony selection.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In genetic engineering, why can human genomic DNA containing introns NOT be translated directly by bacterial (E. coli) 70S ribosomes?',
  options: [
    'Bacteria lack the spliceosome machinery to excise introns from eukaryotic pre-mRNA',
    'Bacterial ribosomes read codons in groups of two instead of three nucleotides',
    'Introns are made of D-amino acids that destroy bacterial ribosomes',
    'Bacterial RNA polymerase degrades any DNA longer than 1000 base pairs',
  ],
  correctIndex: 0,
  hintAfter: 'Bacteria have no nucleus or spliceosomes! We must convert mature spliced mRNA back into cDNA using Reverse Transcriptase before bacterial cloning.',
};

// ─── INTERACTION INTERFACES ───
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

// ─── CHALLENGES ARRAY (21 Challenges: Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Translation Sites (NODE 011)
  {
    id: 'ch_001_trans_sites',
    nodeId: NODE_C12_BIOTECH_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each ribosomal site and factor to its correct functional location on the 70S ribosome.',
    dragItems: [
      { label: 'P-Site (Peptidyl)', targetId: 'site_p' },
      { label: 'A-Site (Aminoacyl)', targetId: 'site_a' },
      { label: 'E-Site (Exit)', targetId: 'site_e' },
      { label: 'mRNA Channel (AUG)', targetId: 'channel_mrna' },
    ],
    correctMapping: {
      site_e: 'E-Site (Exit)',
      site_p: 'P-Site (Peptidyl)',
      site_a: 'A-Site (Aminoacyl)',
      channel_mrna: 'mRNA Channel (AUG)',
    },
    explanation: 'The ribosome contains three key tRNA binding sites: the A (aminoacyl) site accepts incoming charged tRNA; the P (peptidyl) site holds the tRNA with the growing peptide chain; the E (exit) site releases uncharged tRNAs. mRNA threads through the small 30S subunit.',
    hints: [
      'Think about where the first initiator tRNA (fMet-tRNA) binds during initiation (P site).',
      'The A site is the "entry" aminoacyl site on the right, and E site is the "exit" on the far left.',
      'Order from left to right in the large subunit: E -> P -> A.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: Translation Initiation (NODE 011)
  {
    id: 'ch_002_initiation',
    nodeId: NODE_C12_BIOTECH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'During prokaryotic translation initiation, which sequence on mRNA pairs with the 16S rRNA of the 30S ribosomal subunit to align the start codon AUG?',
    options: [
      'Shine-Dalgarno sequence (AGGAGG)',
      'Kozak consensus sequence (ACCAUGG)',
      'TATA box (TATAAA)',
      'Poly-A tail sequence',
    ],
    correctIndex: 0,
    explanation: 'In prokaryotes, the Shine-Dalgarno sequence upstream of AUG base-pairs with the complementary anti-Shine-Dalgarno sequence at the 3\' end of 16S rRNA within the 30S subunit, correctly positioning the start codon into the P site.',
    hints: [
      'Kozak sequences are eukaryotic; bacteria utilize a purine-rich motif discovered by Shine and Dalgarno.',
      'This sequence is AGGAGG located ~8 base pairs upstream of the start codon AUG.',
      'The Shine-Dalgarno sequence guides 30S ribosomal subunit alignment.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation: Reverse Transcription (NODE 013)
  {
    id: 'ch_003_rt_dogma',
    nodeId: NODE_C12_BIOTECH_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is reverse transcription considered an exception to Crick’s original Central Dogma of Molecular Biology?',
    options: [
      'It transfers genetic information from RNA to DNA using an RNA-dependent DNA polymerase',
      'It translates proteins directly into double-stranded DNA without RNA',
      'It replicates DNA inside the nucleolus without dNTPs',
      'It synthesizes polypeptides directly from viral lipid envelopes',
    ],
    correctIndex: 0,
    explanation: 'The classic central dogma states that genetic information flows unidirectionally from DNA -> RNA -> Protein. Reverse transcriptase reverses this flow by synthesizing complementary DNA (cDNA) from an RNA template.',
    hints: [
      'Consider the directional flow: normally DNA makes RNA. What happens when RNA makes DNA?',
      'Reverse transcriptase is an RNA-dependent DNA polymerase found in retroviruses like HIV.',
      'RNA -> DNA violates the strict unidirectional DNA -> RNA principle.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation: Operon Components (NODE 014)
  {
    id: 'ch_004_operon_parts',
    nodeId: NODE_C12_BIOTECH_014,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the structural and regulatory elements of the E. coli lac operon in order along the DNA from 5\' to 3\':',
    sortItems: [
      'lacI regulator gene',
      'Promoter (P) and Operator (O)',
      'lacZ gene (beta-galactosidase)',
      'lacY gene (permease)',
      'lacA gene (transacetylase)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The lac operon is organized linearly as: lacI (repressor gene) -> Promoter (P) -> Operator (O) -> lacZ (beta-galactosidase) -> lacY (permease) -> lacA (transacetylase).',
    hints: [
      'The repressor gene lacI comes first before the shared control region.',
      'RNA polymerase binds the promoter, then operator, followed by the structural genes Z, Y, A in alphabetical order.',
      'The order is lacI -> P/O -> lacZ -> lacY -> lacA.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation: Restriction Endonuclease Nomenclature (NODE 016)
  {
    id: 'ch_005_ecori_name',
    nodeId: NODE_C12_BIOTECH_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the restriction enzyme EcoRI, what does the letter "R" represent according to standard biochemical nomenclature?',
    options: [
      'The strain of the bacterium (RY13)',
      'The genus of the source organism (Escherichia)',
      'The order of discovery in the laboratory',
      'The specific restriction restriction-modification cofactor',
    ],
    correctIndex: 0,
    explanation: 'In EcoRI: "E" = genus Escherichia; "co" = species coli; "R" = strain RY13; "I" = first endonuclease isolated from this strain.',
    hints: [
      'E = Genus, co = Species. What comes next?',
      'R refers to the specific bacterial isolate or strain RY13.',
      'The Roman numeral I denotes the discovery order.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation: Plant DNA Isolation (NODE 017)
  {
    id: 'ch_006_ctab_role',
    nodeId: NODE_C12_BIOTECH_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary function of Cetyltrimethylammonium Bromide (CTAB) in plant genomic DNA isolation?',
    options: [
      'Forms soluble complexes with DNA in high salt while eliminating interfering polysaccharides and polyphenols',
      'Cleaves peptide bonds in bacterial peptidoglycan cell walls',
      'Acts as a thermostable DNA polymerase during denaturation',
      'Fluoresces bright green under 365 nm UV light',
    ],
    correctIndex: 0,
    explanation: 'Plant cells are rich in viscous polysaccharides and tannins/polyphenols. In high-salt buffers (>1.4 M NaCl), the cationic detergent CTAB complexes with nucleic acids while leaving neutral and acidic polysaccharides uncomplexed, enabling phase separation with chloroform.',
    hints: [
      'Plants have thick, sticky carbohydrate secondary metabolites like starch and pectin.',
      'CTAB is a cationic detergent tailored to separate DNA from viscous plant carbohydrates.',
      'CTAB binds nucleic acids and prevents polysaccharide co-precipitation.',
    ],
    misconceptionIndex: 1,
  },
  // 7. Foundation: Vector Capacities (NODE 018)
  {
    id: 'ch_007_vector_sizes',
    nodeId: NODE_C12_BIOTECH_018,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the cloning vector type with its typical maximum foreign DNA insert capacity:',
    options: [
      'Plasmid pBR322: 4-5 kb | Cosmid: 35-45 kb | BAC: 100-300 kb | YAC: 200-2000 kb',
      'Plasmid pBR322: 200 kb | Cosmid: 5 kb | BAC: 2000 kb | YAC: 10 kb',
      'Plasmid pBR322: 1000 kb | Cosmid: 100 kb | BAC: 10 kb | YAC: 1 kb',
      'Plasmid pBR322: 0.1 kb | Cosmid: 1 kb | BAC: 5 kb | YAC: 20 kb',
    ],
    correctIndex: 0,
    explanation: 'Plasmids carry 4-10 kb; Cosmids (plasmid + lambda cos sites) carry 35-45 kb; BACs (F-factor based) carry 100-300 kb; YACs (yeast centromere + telomere) carry massive genomic fragments of 200-2000 kb.',
    hints: [
      'Think of vector scale: Plasmid < Phage Lambda < Cosmid < BAC < YAC.',
      'YACs are the largest artificial chromosomes used for mammalian genome projects.',
      'pBR322 handles small 4-5 kb plasmids; YAC handles megabase chunks.',
    ],
    misconceptionIndex: 0,
  },
  // 8. Standard: Post-Translational Proinsulin Cleavage (NODE 012)
  {
    id: 'ch_008_proinsulin',
    nodeId: NODE_C12_BIOTECH_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Human proinsulin is an inactive precursor synthesized on ribosomes. Which post-translational proteolytic event is mandatory to generate active, mature two-chain insulin?',
    options: [
      'Endoproteolytic excision of the connecting 31-amino acid C-peptide and formation of interchain disulfide bonds between Chains A and B',
      'Addition of 14-sugar branched N-glycans to the C-terminal alanine of Chain A',
      'Intein trans-splicing mediated by ATP hydrolysis in the mitochondrial matrix',
      'Methylation of all valine residues in the signal peptide sequence',
    ],
    correctIndex: 0,
    explanation: 'Proinsulin contains B-chain, C-peptide, and A-chain in a single linear sequence. In pancreatic beta-cell secretory granules, prohormone convertases (PC1/3, PC2) and carboxypeptidase E excise the C-peptide, leaving Chains A (21 aa) and B (30 aa) linked by two disulfide bonds.',
    hints: [
      'Eli Lilly engineered human insulin by synthesizing A and B chains separately to bypass C-peptide removal.',
      'The inactive middle linker chain that must be removed is the C-peptide.',
      'Active insulin consists of Chains A and B connected by disulfide bridges after C-peptide cleavage.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard: Lac Operon Diauxic Shift (NODE 015)
  {
    id: 'ch_009_diauxie',
    nodeId: NODE_C12_BIOTECH_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'E. coli is grown in a chemostat with equal concentrations of glucose and lactose. What is the molecular state of the lac operon while glucose is actively being consumed?',
    options: [
      'Operon is repressed / inactive because low cAMP prevents the CAP-cAMP activator complex from binding the promoter, even if allolactose is present',
      'Operon is transcribed at 1000% maximum rate because glucose directly phosphorylates the lacZ gene',
      'The LacI repressor binds covalently to RNA polymerase and digests it',
      'The trp operon attenuator hairpin forces immediate transcription of beta-galactosidase',
    ],
    correctIndex: 0,
    explanation: 'Catabolite repression: high glucose inhibits adenylyl cyclase, resulting in low intracellular cAMP levels. Without the CAP-cAMP activator complex binding upstream of the lac promoter, RNA polymerase binds very weakly, preventing transcription of the lac structural genes until glucose is depleted.',
    hints: [
      'E. coli prefers glucose over lactose as its primary carbon source.',
      'Catabolite Activator Protein (CAP) requires cyclic AMP (cAMP) to stimulate transcription.',
      'High glucose = low cAMP = no CAP activation = lac operon remains largely off.',
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard: Trp Operon Attenuation (NODE 015)
  {
    id: 'ch_010_trp_attenuation',
    nodeId: NODE_C12_BIOTECH_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the prokaryotic trp operon, what molecular event triggers transcriptional attenuation (premature termination) when cellular tryptophan levels are HIGH?',
    options: [
      'The ribosome rapidly translates the leader peptide past tandem Trp codons, allowing regions 3 and 4 of the mRNA leader to base-pair into a rho-independent terminator hairpin',
      'Tryptophan directly cleaves the 16S rRNA within the 30S subunit',
      'Free tryptophan binds RNA polymerase active site and reverses its direction',
      'Uncharged tRNA-Trp stalls at the leader region, forming a 2-3 antiterminator stem-loop',
    ],
    correctIndex: 0,
    explanation: 'When Trp-tRNA is abundant, the translating ribosome does not stall at the tandem UGG (Trp) codons in region 1 of the leader mRNA. It moves to region 2, preventing region 2 from pairing with region 3. Consequently, region 3 pairs with region 4, forming a stable 3:4 stem-loop terminator followed by a poly-U tract, which ejects RNA polymerase before transcribing trpE-A.',
    hints: [
      'In high tryptophan, the ribosome moves quickly through the leader transcript without pausing.',
      'Pairing of segments 3 and 4 forms an intrinsic transcriptional terminator hairpin.',
      'When tryptophan is starved, ribosome stalls at region 1, allowing regions 2 and 3 to form an antiterminator hairpin.',
    ],
    misconceptionIndex: 3,
  },
  // 11. Standard: Restriction Endonuclease Cleavage Calculation (NODE 016)
  {
    id: 'ch_011_re_calc',
    nodeId: NODE_C12_BIOTECH_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A circular 4361 bp plasmid has 3 unique restriction sites for EcoRI, BamHI, and HindIII. If the plasmid is completely digested simultaneously with EcoRI and HindIII, how many linear DNA fragments will be produced?',
    correctAnswer: 2,
    tolerance: 0,
    unit: 'fragments',
    explanation: 'A circular double-stranded DNA molecule cut at N unique positions yields exactly N fragments. Cutting a circular plasmid at 2 restriction sites (EcoRI and HindIII) yields 2 linear DNA fragments of distinct molecular weights.',
    hints: [
      'Remember the geometric rule: cutting a closed circle twice creates two linear pieces.',
      'Number of cuts on circular DNA = Number of resulting fragments.',
      '2 cuts = 2 fragments.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Standard: Transformation Technique Matching (NODE 019)
  {
    id: 'ch_012_trans_methods',
    nodeId: NODE_C12_BIOTECH_019,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Select the optimal transformation method tailored for each experimental biological target:',
    options: [
      'Monocot crops (rice/wheat): Biolistics (Gene Gun) | Animal pronucleus: Microinjection | Bacteria: Electroporation | Dicot plants: Agrobacterium Ti plasmid',
      'Monocot crops: Microinjection | Animal pronucleus: Biolistics | Bacteria: Agrobacterium | Dicot plants: Electroporation',
      'Monocot crops: Liposome | Animal pronucleus: Agrobacterium | Bacteria: Microinjection | Dicot plants: Biolistics',
      'Monocot crops: Electroporation | Animal pronucleus: Liposome | Bacteria: Biolistics | Dicot plants: Microinjection',
    ],
    correctIndex: 0,
    explanation: 'Biolistics (microprojectile bombardment with gold/tungsten beads) bypasses the thick cell walls of monocot cereals; Microinjection directly introduces DNA into animal zygote pronuclei; Electroporation creates transient pores in bacterial membranes; Agrobacterium tumefaciens naturally transfers T-DNA into dicot plant genomes.',
    hints: [
      'Agrobacterium naturally infects dicotyledonous plants with crown gall disease.',
      'Biolistics is used for monocots like wheat and rice that are recalcitrant to Agrobacterium.',
      'Microinjection uses a microscopic glass needle under a micromanipulator for large animal eggs.',
    ],
    misconceptionIndex: 1,
  },
  // 13. Standard: Blue-White Selection Mechanism (NODE 020)
  {
    id: 'ch_013_blue_white_logic',
    nodeId: NODE_C12_BIOTECH_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In pUC19 cloning with E. coli JM109 on LB agar containing ampicillin, IPTG, and X-gal, why do RECOMBINANT colonies appear WHITE while non-recombinants appear BLUE?',
    options: [
      'Insertion of foreign DNA into the Multiple Cloning Site causes insertional inactivation of the lacZ alpha-peptide, preventing beta-galactosidase alpha-complementation and X-gal cleavage',
      'Recombinant plasmids produce GFP which emits white light under ambient fluorescent lab lighting',
      'Non-recombinant plasmids express beta-lactamase which directly oxidizes X-gal to indigo dye',
      'Foreign DNA insertion activates the host lysozyme gene, bleaching the bacterial cell membrane',
    ],
    correctIndex: 0,
    explanation: 'pUC19 encodes the lacZ alpha-peptide with a Multiple Cloning Site (MCS) inside it. In non-recombinants, intact alpha-peptide complements the host omega-peptide to create active beta-galactosidase, hydrolyzing X-gal into an insoluble blue 5,5\'-dibromo-4,4\'-dichloro-indigo. In recombinants, insertional inactivation prevents functional enzyme assembly; colonies remain white.',
    hints: [
      'Think about what happens to the lacZ gene when a foreign gene is pasted in its middle.',
      'Active beta-galactosidase + X-gal = Blue precipitate. Broken gene = No enzyme = White colony.',
      'Recombinants have disrupted lacZ genes (insertional inactivation), so they cannot cleave X-gal and stay white.',
    ],
    misconceptionIndex: 2,
  },
  // 14. Advanced: Intein Self-Splicing Biochemistry (NODE 012)
  {
    id: 'ch_014_intein_splicing',
    nodeId: NODE_C12_BIOTECH_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does intein-mediated protein self-splicing differ fundamentally from RNA spliceosome splicing?',
    options: [
      'Inteins are self-catalytic protein segments that excise themselves and join flanking exteins via nucleophilic attacks by Cys/Ser/Thr residues without any RNA or ATP requirement',
      'Inteins require 70S ribosomes to synthesize a poly-A tail on the mature polypeptide',
      'Inteins require DNA polymerase I to proofread the amino acid backbone',
      'Inteins are destroyed by the bacterial CRISPR-Cas9 defense system before peptide bond formation',
    ],
    correctIndex: 0,
    explanation: 'Intein splicing is an entirely protein-based post-translational auto-catalytic event. Nucleophilic attacks by conserved Cys, Ser, or Thr residues at the N- and C-terminal junctions of the intein form branched thioester intermediates, excising the intein and ligating the flanking exteins with a native peptide bond.',
    hints: [
      'Intein splicing is an autocatalytic protein reaction, requiring no ribonucleoprotein splicoesome complexes.',
      'The excised internal protein domain is the intein; the rejoined active pieces are exteins.',
      'Conserved cysteine or serine side chains carry out nucleophilic transesterification.',
    ],
    misconceptionIndex: 1,
  },
  // 15. Advanced: Reverse Transcriptase Multi-Enzyme Activities (NODE 013)
  {
    id: 'ch_015_rt_activities',
    nodeId: NODE_C12_BIOTECH_013,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the biochemical enzymatic steps executed during in vitro double-stranded cDNA synthesis from mature eukaryotic mRNA:',
    sortItems: [
      'Annealing oligo(dT) primer to the 3\' poly-A tail of mature mRNA',
      'RNA-dependent DNA polymerase activity synthesizes first-strand cDNA (RNA:DNA hybrid)',
      'RNase H endonuclease activity selectively degrades the template RNA strand in the hybrid',
      'DNA-dependent DNA polymerase activity synthesizes the second complementary DNA strand',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'cDNA synthesis protocol: (1) Oligo(dT) binds poly-A tail; (2) Reverse transcriptase extends the DNA primer along the RNA template; (3) RNase H hydrolyzes the RNA strand; (4) DNA polymerase synthesizes the second DNA strand, yielding ds-cDNA.',
    hints: [
      'Start with primer annealing at the poly-A tail.',
      'First strand synthesis generates an RNA:cDNA hybrid.',
      'RNase H removes the RNA template before the second DNA strand can be constructed.',
    ],
    misconceptionIndex: 2,
  },
  // 16. Advanced: Alkaline Phosphatase Dephosphorylation (NODE 016)
  {
    id: 'ch_016_calf_alkaline_phos',
    nodeId: NODE_C12_BIOTECH_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A molecular biologist cuts pBR322 with EcoRI and treats the linearized vector with Calf Intestinal Alkaline Phosphatase (CIAP) before adding the foreign insert and T4 DNA ligase. What does CIAP achieve?',
    options: [
      'Removes terminal 5\'-phosphate groups from the vector, preventing self-ligation while permitting vector-insert phosphodiester bond formation via the insert\'s 5\'-phosphates',
      'Phosphorylates the 3\'-hydroxyl ends to speed up heat-shock transformation',
      'Methylates adenine bases at G6PD recognition motifs to block host degradation',
      'Converts blunt DNA ends into 4-base cohesive sticky overhangs',
    ],
    correctIndex: 0,
    explanation: 'T4 DNA ligase requires a 5\'-phosphate and a 3\'-hydroxyl to synthesize a phosphodiester bond. Dephosphorylating the linearized plasmid vector with CIAP removes 5\'-phosphates, completely preventing vector recircularization. The insert retains its 5\'-phosphates, allowing single-strand ligation at each junction, which the host bacterium repairs in vivo.',
    hints: [
      'DNA ligase cannot seal a nick without a 5\'-phosphate group.',
      'Alkaline phosphatase hydrolyzes terminal 5\'-phosphates into 5\'-OH.',
      'This eliminates empty non-recombinant vector background colonies.',
    ],
    misconceptionIndex: 0,
  },
  // 17. Advanced: Spectrophotometric DNA Purity (NODE 017)
  {
    id: 'ch_017_nanodrop_ratio',
    nodeId: NODE_C12_BIOTECH_017,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A pure double-stranded DNA sample isolated from Arabidopsis leaves has an absorbance of 0.36 at 260 nm and 0.20 at 280 nm on a UV-Vis spectrophotometer. Calculate the A260/A280 purity ratio.',
    correctAnswer: 1.8,
    tolerance: 0.05,
    unit: 'ratio',
    explanation: 'A260/A280 ratio = 0.36 / 0.20 = 1.80. A ratio of ~1.8 is universally accepted as pure DNA. Ratios below 1.6 indicate protein, phenol, or aromatic solvent contamination; ratios >2.0 suggest residual RNA contamination.',
    hints: [
      'Divide absorbance at 260 nm by absorbance at 280 nm.',
      '0.36 / 0.20 = ?',
      'Standard benchmark for pure DNA is 1.8.',
    ],
    misconceptionIndex: 4,
  },
  // 18. Advanced: Insertional Inactivation with pBR322 (NODE 020)
  {
    id: 'ch_018_pbr322_inactivation',
    nodeId: NODE_C12_BIOTECH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A foreign human growth hormone gene is cloned into the unique BamHI site located inside the tetracycline resistance gene (tetR) of pBR322. E. coli transformants are replica-plated on Ampicillin and Tetracycline plates. What is the expected growth phenotype of RECOMBINANT colonies?',
    options: [
      'Grow on Ampicillin plates (AmpR), but die on Tetracycline plates (TetS)',
      'Die on Ampicillin plates (AmpS), but grow on Tetracycline plates (TetR)',
      'Grow on both Ampicillin and Tetracycline plates',
      'Die on both Ampicillin and Tetracycline plates',
    ],
    correctIndex: 0,
    explanation: 'pBR322 carries ampR and tetR genes. The BamHI restriction site resides within the tetR coding sequence. Inserting a gene into BamHI disrupts the tetR gene (insertional inactivation), rendering the cell tetracycline-sensitive (TetS). The ampR gene remains intact, so recombinants are AmpR and TetS.',
    hints: [
      'The insert disrupts the gene it is placed into (tetR), while the other marker (ampR) remains intact.',
      'Insert at BamHI -> Inactivates Tetracycline resistance.',
      'Recombinant = Ampicillin resistant, Tetracycline sensitive (AmpR, TetS).',
    ],
    misconceptionIndex: 2,
  },
  // 19. Advanced: Designing an Inducible Bioreactor Operon (NODE 015 & 018)
  {
    id: 'ch_019_construct_expression_vector',
    nodeId: NODE_C12_BIOTECH_018,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 essential genetic cassette components in 5\' to 3\' order to construct an IPTG-inducible prokaryotic expression vector for recombinant human insulin Chain A:',
    availableParts: ['T7/lac Promoter-Operator', 'RBS (Shine-Dalgarno)', 'Insulin Chain A cDNA', 'Transcription Terminator'],
    targetState: 'T7/lac Promoter-Operator RBS (Shine-Dalgarno) Insulin Chain A cDNA Transcription Terminator',
    validationHint: 'Think about the path of gene expression: Promoter -> Ribosome binding -> Coding sequence -> Terminator.',
    explanation: 'An efficient prokaryotic expression cassette requires: (1) Strong inducible promoter-operator (T7/lac) to drive regulated transcription; (2) Ribosome binding site (Shine-Dalgarno) to position 30S subunit; (3) Intronless cDNA coding sequence with start and stop codons; (4) Rho-independent hairpin terminator to detach RNA polymerase.',
    hints: [
      'First comes transcription initiation (Promoter), then translation initiation (RBS).',
      'The coding sequence (cDNA) must follow the ribosome binding site.',
      'The transcription terminator sits at the 3\' extreme to stop RNA polymerase.',
    ],
    misconceptionIndex: 0,
  },
  // 20. Advanced: Agrobacterium Ti-Plasmid Engineering (NODE 019)
  {
    id: 'ch_020_agrobacterium_eval',
    nodeId: NODE_C12_BIOTECH_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When disarming the natural Agrobacterium tumefaciens Ti-plasmid to engineer pest-resistant transgenic Bt-cotton in India, which genes MUST be deleted from the T-DNA region while retaining the 25-bp Left and Right Border sequences?',
    options: [
      'Oncogenes (auxin, cytokinin, and opine synthesis genes) that cause crown gall tumor proliferation',
      'Virulence genes (virA, virG, virD2) responsible for T-DNA nicking and nuclear translocation',
      'The bacterial chromosomal origin of replication (oriV)',
      'The bacterial 23S ribosomal rRNA operon',
    ],
    correctIndex: 0,
    explanation: 'Wild-type T-DNA carries oncogenes encoding auxin (iaaM, iaaH), cytokinin (ipt), and opines (nos, ocs) which cause crown gall tumors. Disarming involves replacing these tumor-inducing genes with the gene of interest (Cry1Ac Bt endotoxin) while keeping the 25 bp Left and Right T-DNA border repeats and the helper vir regulon intact.',
    hints: [
      'We want the plant to receive our useful gene, not develop crown gall tumors.',
      'Tumors are caused by bacterial phytohormone oncogenes (auxin and cytokinin overproduction).',
      'Virulence (vir) genes are necessary helper machinery and must NOT be deleted.',
    ],
    misconceptionIndex: 0,
  },
  // 21. Advanced: Antibiotic Selection Math (NODE 020)
  {
    id: 'ch_021_transformation_efficiency',
    nodeId: NODE_C12_BIOTECH_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A biotechnology student transforms competent E. coli with 0.1 micrograms (100 ng) of pUC19 plasmid DNA. Plating 1/10th of the 1.0 mL recovery broth yields 450 transformant colonies. Calculate the total transformation efficiency in transformants per microgram of plasmid DNA.',
    correctAnswer: 45000,
    tolerance: 100,
    unit: 'CFU/ug',
    explanation: 'Total colonies in 1.0 mL = 450 colonies x (1.0 mL / 0.1 mL) = 4500 transformants. Transformation efficiency = Total transformants / DNA used (ug) = 4500 / 0.1 ug = 45,000 CFU/ug DNA.',
    hints: [
      'Step 1: Calculate total colony forming units in the full 1.0 mL volume (450 x 10 = 4,500).',
      'Step 2: Divide total CFU by the mass of DNA used in micrograms (4,500 / 0.1 ug).',
      '4,500 / 0.1 = 45,000.',
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BIOTECH_011,
  title: 'Translation, Operon Regulation & Recombinant DNA Tools',
  definition: 'The molecular cascade of decoding mRNA into proteins on 70S/80S ribosomes, regulatory operons (lac and trp), post-translational modifications, and recombinant DNA engineering tools including restriction endonucleases, CTAB DNA isolation, vectors, transformation, and blue-white selection.',
  eli5: 'Think of translation as a factory where ribosomes read mRNA blueprints to build protein toys. If the blueprint is from a human, we use molecular scissors (restriction enzymes), delivery trucks (vectors), and bacterial hosts with on/off switches (operons) to manufacture medicines like insulin on demand!',
  misconceptions: [
    {
      misconception: 'Stop codons (UAA, UAG, UGA) code for specialized "stop" amino acids.',
      correction: 'Stop codons do not encode any amino acid; they are recognized by protein release factors (RF1, RF2, eRF1) that hydrolyze the ester bond linking the polypeptide to the P-site tRNA.',
    },
    {
      misconception: 'Proteins are fully functional immediately upon ribosomal termination.',
      correction: 'Nascent polypeptides require post-translational modifications (chaperone folding via GroEL/Hsp70, disulfide bonds, proteolytic cleavage of pro-peptides like insulin C-peptide, glycosylation) to achieve biological activity.',
    },
    {
      misconception: 'In blue-white selection, blue colonies contain the desired recombinant gene insert.',
      correction: 'Blue colonies contain empty intact vectors with functional beta-galactosidase cleaving X-gal. Recombinants suffer insertional inactivation of lacZ and remain white.',
    },
    {
      misconception: 'Tryptophan activates transcription of the trp operon.',
      correction: 'Tryptophan acts as a corepressor. When abundant, it binds the inactive TrpR apo-repressor, creating an active repressor that blocks the operator to shut down tryptophan synthesis.',
    },
    {
      misconception: 'Any restriction enzyme can cut eukaryotic genomic DNA at random intervals.',
      correction: 'Type II restriction endonucleases recognize specific palindromic sequences (e.g., 5\'-GAATTC-3\' for EcoRI) and cut consistently at defined internal phosphodiester bonds.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which ribosomal site holds the peptidyl-tRNA attached to the growing polypeptide chain during elongation?', options: ['P site', 'A site', 'E site', 'Shine-Dalgarno site'], correctIndex: 0 },
    { question: 'What is the enzyme responsible for synthesizing cDNA from an mRNA template in retroviruses?', options: ['Reverse Transcriptase', 'RNA Polymerase II', 'Taq DNA Polymerase', 'Topoisomerase I'], correctIndex: 0 },
    { question: 'In the lac operon, which molecule binds directly to the LacI repressor to induce transcription?', options: ['Allolactose', 'Glucose', 'Tryptophan', 'Glycerol'], correctIndex: 0 },
    { question: 'What cofactor is exclusively required by Type II restriction endonucleases like EcoRI?', options: ['Magnesium ions (Mg2+)', 'ATP and S-adenosylmethionine', 'NADPH and FAD', 'Calcium ions (Ca2+)'], correctIndex: 0 },
    { question: 'Which detergent is utilized in plant DNA isolation to precipitate polysaccharides and polyphenols?', options: ['CTAB', 'SDS', 'Triton X-100', 'Tween-20'], correctIndex: 0 },
    { question: 'Which cloning vector can carry the largest genomic insert size (up to 2000 kb)?', options: ['YAC (Yeast Artificial Chromosome)', 'pBR322 Plasmid', 'Bacteriophage Lambda', 'Cosmid'], correctIndex: 0 },
    { question: 'Which transformation technique fires DNA-coated gold or tungsten microprojectiles into plant cells?', options: ['Biolistics (Gene Gun)', 'Electroporation', 'Microinjection', 'Lipofection'], correctIndex: 0 },
    { question: 'What is the color of recombinant bacterial colonies on ampicillin + IPTG + X-gal agar in pUC19 cloning?', options: ['White', 'Blue', 'Fluorescent Red', 'Yellow'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master the mechanics of translation (initiation, elongation, termination), prokaryotic operon switching (lac and trp), restriction cleavage, vector selection, and recombinant screening techniques with >85% accuracy.',
};

// ─── EXPLORATION STEPS (Brilliant-Style Learn by Doing) ───
const EXPLORATION_STEPS = [
  {
    title: 'Stage 1: The 70S Translation Assembly Line',
    instruction: 'Advance the ribosome step-by-step through Initiation, Elongation (Peptide Bond Formation), Translocation, and Termination.',
    interactionType: 'ribosome-stepper',
    nodeId: NODE_C12_BIOTECH_011,
  },
  {
    title: 'Stage 2: Prokaryotic Operon Dynamic Logic (Lac vs Trp)',
    instruction: 'Toggle environmental nutrients (Lactose, Glucose, Tryptophan) to watch Repressors, Inducers, and CAP-cAMP control transcription in real-time.',
    interactionType: 'operon-regulator',
    nodeId: NODE_C12_BIOTECH_014,
  },
  {
    title: 'Stage 3: Molecular Scissors & pBR322 Plasmid Cartography',
    instruction: 'Select restriction endonucleases (EcoRI, BamHI, PstI) to cut the plasmid map and inspect sticky vs blunt end overhangs.',
    interactionType: 'plasmid-cutter',
    nodeId: NODE_C12_BIOTECH_016,
  },
  {
    title: 'Stage 4: Plant CTAB DNA Isolation Phase Separation',
    instruction: 'Adjust the centrifuge speed and high-salt CTAB parameters to separate the upper aqueous DNA phase from organic polyphenols.',
    interactionType: 'ctab-extractor',
    nodeId: NODE_C12_BIOTECH_017,
  },
  {
    title: 'Stage 5: Blue-White Colony Screening Plate Reader',
    instruction: 'Add X-gal and IPTG to the transformation agar plate and identify recombinants vs intact non-recombinant vectors.',
    interactionType: 'blue-white-picker',
    nodeId: NODE_C12_BIOTECH_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you add high concentrations of BOTH Glucose and Lactose to an E. coli culture, will beta-galactosidase be transcribed at maximum rate?',
    options: [
      'No: Glucose lowers cAMP, so the CAP activator cannot bind, keeping transcription very low until glucose is consumed',
      'Yes: Lactose immediately forces 100% maximum transcription regardless of glucose',
      'Yes: Glucose acts as an inducer that doubles RNA polymerase speed',
      'No: The bacterial cells will instantly lyse due to osmotic sugar shock',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now set Glucose to HIGH and Lactose to HIGH in the simulation to observe cAMP levels and RNA polymerase recruitment.',
  },
  {
    question: 'Predict: If you clone an insulin cDNA insert into the BamHI site inside the tetracycline gene of pBR322, what happens to colonies plated on Tetracycline agar?',
    options: [
      'Recombinant colonies will FAIL to grow (die) because the tetR gene is inactivated by the insert',
      'Recombinant colonies will turn bright blue and double in size',
      'Recombinant colonies will become resistant to both tetracycline and kanamycin',
      'Recombinant colonies will grow only under 365 nm UV illumination',
    ],
    correctIndex: 0,
    verifyInstruction: 'Switch to the Plasmid Cutter and inspect how BamHI insertion disrupts the open reading frame of tetR.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the tRNA in the P site during the translocation step of elongation?',
    observableOptions: [
      'It shifts to the E (exit) site and is discharged from the ribosome uncharged',
      'It moves backward into the mRNA channel to mutate the codon',
      'It transforms permanently into ribosomal 23S rRNA',
      'It remains locked in the P site forever',
    ],
    correctIndex: 0,
  },
  {
    question: 'What happens to the LacI repressor protein when allolactose binds to its allosteric pocket?',
    observableOptions: [
      'It undergoes an allosteric conformational change, losing affinity for the operator and falling off the DNA',
      'It covalently glues itself to the promoter to attract RNA polymerase',
      'It enters the ribosome and acts as an elongation factor',
      'It converts into glucose-6-phosphate',
    ],
    correctIndex: 0,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Biotech Lab Protocol: Designing a Recombinant Vaccine against Dengue Virus',
  description: 'Apply your understanding of reverse transcription, vector design, and host expression to outline a manufacturing pipeline for Dengue envelope protein (E-protein) at the National Institute of Virology, Pune.',
  steps: [
    'Step 1 (RT-PCR): Isolate Dengue viral positive-sense single-stranded RNA from patient serum, synthesize full-length cDNA using Reverse Transcriptase with sequence-specific primers, and amplify the envelope (E) gene.',
    'Step 2 (Vector Construction): Double-digest an inducible pET-28a(+) expression plasmid and the E-gene cDNA with EcoRI and HindIII sticky-end cutters. Treat linearized vector with CIAP to prevent self-ligation.',
    'Step 3 (Ligation & Transformation): Ligate with T4 DNA ligase and transform into competent E. coli BL21(DE3) via high-voltage electroporation (1.8 kV, 5 ms pulse).',
    'Step 4 (Screening & Expression): Screen transformants on Kanamycin plates via colony PCR. Induce protein expression in a 500-liter bioreactor with IPTG at 37°C.',
    'Step 5 (Post-Translational Assembly): Refold the inclusion bodies using urea gradients and verify proper disulfide bonding and glycosylation with HPLC.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───
function C12_BiotechnologyTranslationInitiationElongationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BIOTECH_011,
  title = DEFAULT_PROPS.title || 'Biotechnology Translation & Operons',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'teal' };

  // ─── FLOW STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── BRILLIANT PATTERNS STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});

  // ─── VISUAL FEEDBACK & HINTS ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── INTERACTIVE SIMULATION LAB VARIABLES (30+ State variables) ───
  // Ribosome Translation State
  const [translationStep, setTranslationStep] = useState<number>(0); // 0=Init, 1=Binding, 2=PeptideBond, 3=Translocation, 4=Termination
  const [polypeptideChain, setPolypeptideChain] = useState<string[]>(['fMet']);
  const [ribosomePosition, setRibosomePosition] = useState<number>(0);

  // Operon Lab State
  const [lactosePresent, setLactosePresent] = useState<boolean>(false);
  const [glucoseLevel, setGlucoseLevel] = useState<number>(80); // 0 to 100 mg/dL
  const [tryptophanLevel, setTryptophanLevel] = useState<number>(20); // 0 to 100 uM
  const [operonType, setOperonType] = useState<'lac' | 'trp'>('lac');

  // Plasmid Cutting & Cloning State
  const [selectedEnzyme, setSelectedEnzyme] = useState<'EcoRI' | 'BamHI' | 'HindIII' | 'PstI'>('EcoRI');
  const [plasmidCut, setPlasmidCut] = useState<boolean>(false);
  const [insertAdded, setInsertAdded] = useState<boolean>(false);
  const [ligaseTreated, setLigaseTreated] = useState<boolean>(false);

  // CTAB Extraction State
  const [centrifugeRpm, setCentrifugeRpm] = useState<number>(10000);
  const [saltMolarity, setSaltMolarity] = useState<number>(1.4); // Molar NaCl
  const [aqueousPhasePurity, setAqueousPhasePurity] = useState<number>(92);

  // Blue-White Screening Plate State
  const [iptgAdded, setIptgAdded] = useState<boolean>(true);
  const [xgalAdded, setXgalAdded] = useState<boolean>(true);
  const [colonySelection, setColonySelection] = useState<'recombinant' | 'non-recombinant' | null>(null);

  // Challenge Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD PERSISTED MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
    speechManager.speak('Welcome to the Molecular Biotechnology Laboratory. Let us explore the molecular mechanisms of life.');
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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

  // ─── REAL-TIME CALCULATIONS EFFECT: Operon Output & CTAB Purity ───
  const calculatedcAMP = useMemo(() => {
    return Math.max(5, 100 - glucoseLevel);
  }, [glucoseLevel]);

  const lacOperonTranscribing = useMemo(() => {
    return lactosePresent && calculatedcAMP > 40;
  }, [lactosePresent, calculatedcAMP]);

  const trpOperonTranscribing = useMemo(() => {
    return tryptophanLevel < 35;
  }, [tryptophanLevel]);

  useEffect(() => {
    let purity = 70;
    if (saltMolarity >= 1.2 && saltMolarity <= 1.6) purity += 20;
    if (centrifugeRpm >= 10000) purity += 8;
    setAqueousPhasePurity(Math.min(99, purity));
  }, [saltMolarity, centrifugeRpm]);

  // ─── 2D CANVAS ANIMATION EFFECT: Gel Electrophoresis & Ribosome Translocation ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background agar gel matrix
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw glowing electrophoresis lane bands
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 5, canvas.width - 20, canvas.height - 10);

      // Molecular ladder lanes
      const bandPositions = [15, 30, 48, 70, 95];
      bandPositions.forEach((pos, idx) => {
        const pulse = Math.sin(time + idx) * 2;
        ctx.fillStyle = idx === 2 ? '#38bdf8' : '#22c55e';
        ctx.shadowColor = idx === 2 ? '#0284c7' : '#15803d';
        ctx.shadowBlur = 8;
        ctx.fillRect(30 + idx * 55, pos + pulse, 35, 4);
      });

      // Reset shadow
      ctx.shadowBlur = 0;

      // Draw RNA Polymerase pulse ticker
      ctx.fillStyle = lacOperonTranscribing || trpOperonTranscribing ? '#10b981' : '#ef4444';
      ctx.font = '10px monospace';
      ctx.fillText(
        `OPERON: ${operonType.toUpperCase()} | STATUS: ${
          operonType === 'lac'
            ? lacOperonTranscribing ? 'ACTIVE TRANSCRIPTION (ON)' : 'REPRESSED (OFF)'
            : trpOperonTranscribing ? 'DEREPRESSED (ON)' : 'REPRESSED (OFF)'
        }`,
        15,
        canvas.height - 8
      );

      animFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameId);
  }, [lacOperonTranscribing, trpOperonTranscribing, operonType]);

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
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the 5 foundational stages of modern biotechnology.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Free Play Molecular Sandbox. Test operon triggers, ribosome speeds, and restriction cutting.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing ISC biotechnology mastery evaluation challenges.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis registered. Now manipulate the controls to test your prediction!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation!' : 'Review the ribosome movements on screen carefully.');
  }, []);

  // ─── TRANSLATION LAB STEPPER ───
  const handleAdvanceTranslation = useCallback(() => {
    audioManager.play('pop');
    setTranslationStep(prev => {
      const next = (prev + 1) % 5;
      if (next === 0) {
        setPolypeptideChain(['fMet']);
        setRibosomePosition(0);
      } else if (next === 1) {
        setRibosomePosition(1);
      } else if (next === 2) {
        setPolypeptideChain(p => [...p, p.length === 1 ? 'Ala' : p.length === 2 ? 'Ser' : 'Val']);
      } else if (next === 3) {
        setRibosomePosition(p => p + 1);
      } else if (next === 4) {
        audioManager.play('chime');
        speechManager.speak('Stop codon UAA recognized by Release Factor! Polypeptide released.');
      }
      return next;
    });
  }, []);

  const handleResetTranslation = useCallback(() => {
    audioManager.play('tap');
    setTranslationStep(0);
    setPolypeptideChain(['fMet']);
    setRibosomePosition(0);
  }, []);

  // ─── PLASMID CUTTING & CLONING LAB HANDLERS ───
  const handleCutPlasmid = useCallback(() => {
    audioManager.play('pickup');
    setPlasmidCut(true);
    setInsertAdded(false);
    setLigaseTreated(false);
    speechManager.speak(`${selectedEnzyme} restriction endonuclease digested palindromic target.`);
  }, [selectedEnzyme]);

  const handleLigateInsert = useCallback(() => {
    if (!plasmidCut) return;
    audioManager.play('drop-correct');
    setInsertAdded(true);
    setLigaseTreated(true);
    speechManager.speak('T4 DNA Ligase formed covalent phosphodiester bonds. Recombinant construct completed.');
  }, [plasmidCut]);

  const handleResetPlasmid = useCallback(() => {
    audioManager.play('tap');
    setPlasmidCut(false);
    setInsertAdded(false);
    setLigaseTreated(false);
  }, []);

  // ─── CTAB LAB HANDLERS ───
  const handleCentrifugeRun = useCallback(() => {
    audioManager.play('swoop');
    speechManager.speak('Centrifugation completed. Aqueous phase containing DNA separated from organic polyphenols.');
  }, []);

  // ─── BLUE-WHITE SCREENING HANDLERS ───
  const handlePickColony = useCallback((type: 'recombinant' | 'non-recombinant', e: React.MouseEvent) => {
    setColonySelection(type);
    setSparklePos({ x: e.clientX, y: e.clientY });
    setShowSparkle(true);
    if (type === 'recombinant') {
      audioManager.play('success');
      speechManager.speak('White colony picked: Recombinant clone with insertional inactivation of lacZ!');
    } else {
      audioManager.play('pop');
      speechManager.speak('Blue colony picked: Intact non-recombinant vector with active beta-galactosidase.');
    }
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Biotechnology simulation completed with a score of ${finalScore} percent.`);
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

  // ─── INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── ANSWER EVALUATOR ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding biochemical reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Let us examine the complete molecular mechanism.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DRAG & DROP HANDLERS ───
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

  // ─── SORT HANDLERS ───
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-teal-900/40 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/10"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                ISC Class 12 • Biotechnology
              </span>
              <span className="text-xs text-slate-400 font-mono">Nodes: 011–020</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                phase === p
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-teal-950/60 to-slate-900 rounded-2xl border border-teal-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-teal-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🔬</span> Narrative Mission Scenario
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-teal-900/40 text-xs text-teal-300">
              ⚡ <strong>Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-teal-300 mb-1">Curiosity Hook Discovery:</h3>
            <p className="text-base font-medium text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-mono text-teal-400 mr-2">[{String.fromCharCode(65 + idx)}]</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800">
                <p className={`text-sm mb-4 leading-relaxed ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! ' : '⚡ '}
                  {DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-teal-600/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (5 Interactive Stages) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Diagnostic Questions Peek */}
          {diagnosticQuestions && (
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>📚 Board Blueprint Check: 8 Diagnostic Assessment Competencies mapped</span>
              <span className="text-teal-400 font-mono font-bold">Stage {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                  Interactive Lab #{currentSlide + 1}
                </span>
                <span className="text-xs text-slate-400">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
              </div>
              <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
              <p className="text-sm text-teal-300 mt-1 mb-4">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* ── LAB 1: Ribosome Translation Stepper ── */}
              {currentSlide === 0 && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-900 rounded-lg text-xs">
                    <div>
                      <span className="text-slate-400">Current Phase: </span>
                      <strong className="text-teal-400 font-mono">
                        {translationStep === 0 && 'INITIATION (fMet-tRNA binds AUG in P Site)'}
                        {translationStep === 1 && 'ELONGATION: Aminoacyl-tRNA Enters A Site'}
                        {translationStep === 2 && 'PEPTIDYL TRANSFERASE: Peptide Bond Synthesized'}
                        {translationStep === 3 && 'TRANSLOCATION: Ribosome shifts 1 Codon (EF-G)'}
                        {translationStep === 4 && 'TERMINATION: Release Factor binds Stop Codon'}
                      </strong>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdvanceTranslation}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold"
                      >
                        Step Ribosome ⏩
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetTranslation}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                      >
                        Reset ↺
                      </motion.button>
                    </div>
                  </div>

                  {/* SVG Ribosome 70S Diagram */}
                  <div className="w-full overflow-x-auto bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <svg viewBox="0 0 600 240" className="w-full min-w-[500px]">
                      {/* mRNA Strand */}
                      <rect x="20" y="180" width="560" height="14" rx="4" fill="#1e293b" stroke="#334155" />
                      {/* mRNA Codons */}
                      {['AUG (fMet)', 'GCC (Ala)', 'UCU (Ser)', 'GUU (Val)', 'UAA (STOP)'].map((codon, i) => (
                        <g key={i} transform={`translate(${60 + i * 105}, 180)`}>
                          <rect x="0" y="0" width="95" height="14" fill={ribosomePosition === i ? '#0284c7' : '#0f172a'} rx="2" />
                          <text x="47" y="11" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                            {codon}
                          </text>
                        </g>
                      ))}

                      {/* 50S Large Ribosomal Subunit */}
                      <motion.path
                        d="M 120 40 Q 300 10 480 40 Q 500 130 450 150 L 150 150 Q 100 130 120 40 Z"
                        fill="#0f766e"
                        stroke="#14b8a6"
                        strokeWidth="2"
                        opacity="0.85"
                      />
                      <text x="300" y="35" textAnchor="middle" fill="#ccfbf1" fontSize="11" fontWeight="bold">50S Large Ribosomal Subunit</text>

                      {/* 30S Small Subunit */}
                      <rect x="130" y="160" width="340" height="40" rx="10" fill="#115e59" stroke="#2dd4bf" strokeWidth="2" />
                      <text x="300" y="215" textAnchor="middle" fill="#99f6e4" fontSize="10" fontWeight="bold">30S Small Subunit (16S rRNA / Shine-Dalgarno align)</text>

                      {/* Ribosome Sites: E, P, A */}
                      {/* E Site */}
                      <rect x="180" y="65" width="70" height="80" rx="8" fill="#134e4a" stroke="#2dd4bf" strokeDasharray="3 3" />
                      <text x="215" y="80" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">E (Exit)</text>

                      {/* P Site */}
                      <rect x="265" y="65" width="70" height="80" rx="8" fill="#042f2e" stroke="#2dd4bf" strokeWidth="2" />
                      <text x="300" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">P (Peptidyl)</text>

                      {/* A Site */}
                      <rect x="350" y="65" width="70" height="80" rx="8" fill="#134e4a" stroke="#2dd4bf" strokeDasharray="3 3" />
                      <text x="385" y="80" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">A (Aminoacyl)</text>

                      {/* Polypeptide Bead Chain */}
                      <g transform="translate(300, 45)">
                        {polypeptideChain.map((aa, idx) => (
                          <motion.g
                            key={idx}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transform={`translate(${idx * 22 - (polypeptideChain.length * 11)}, -${idx * 10})`}
                          >
                            <circle cx="0" cy="0" r="9" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                            <text x="0" y="3" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">{aa}</text>
                          </motion.g>
                        ))}
                      </g>

                      {/* Active tRNA inside P-site */}
                      <path d="M 300 95 L 300 145 M 290 120 L 310 120" stroke="#facc15" strokeWidth="3" />
                      <text x="300" y="140" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">tRNA</text>
                    </svg>
                  </div>

                  {/* Observation question during translation */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-teal-900/40">
                    <p className="text-xs text-white font-semibold mb-2">Observation Query: {OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className={`p-2 rounded-lg text-xs text-left transition-all ${
                            observationAnswered
                              ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                                : 'bg-slate-800/40 text-slate-500'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: Operon Regulator Lab (Lac vs Trp) ── */}
              {currentSlide === 1 && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOperonType('lac')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                        operonType === 'lac' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Lac Operon (Catabolic / Inducible)
                    </button>
                    <button
                      onClick={() => setOperonType('trp')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                        operonType === 'trp' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Trp Operon (Anabolic / Repressible)
                    </button>
                  </div>

                  {operonType === 'lac' ? (
                    <div className="space-y-4">
                      {/* Predict-then-check */}
                      {!predictionMade && (
                        <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-800/40">
                          <p className="text-xs text-teal-300 font-bold mb-2">🧠 {PREDICTION_QUESTIONS[0].question}</p>
                          <div className="space-y-1.5">
                            {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => handlePrediction(idx)}
                                className="w-full text-left p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-800"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Inducer (Lactose / Allolactose):</span>
                            <span className={lactosePresent ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                              {lactosePresent ? 'PRESENT (Repressor Off)' : 'ABSENT (Repressor Bound)'}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setLactosePresent(p => !p);
                              audioManager.play('tap');
                            }}
                            className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                              lactosePresent ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            Toggle Lactose Feed {lactosePresent ? '🟢' : '⚪'}
                          </button>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Glucose Concentration:</span>
                            <span className="text-teal-400 font-mono font-bold">{glucoseLevel} mg/dL</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={glucoseLevel}
                            onChange={e => setGlucoseLevel(Number(e.target.value))}
                            className="w-full accent-teal-500"
                          />
                          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                            <span>Low (High cAMP = CAP active)</span>
                            <span>High (Low cAMP = CAP inactive)</span>
                          </div>
                        </div>
                      </div>

                      {/* Operon Molecular Status Gauge */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-400">cAMP-CAP Complex Activity:</div>
                          <div className="text-sm font-bold font-mono text-teal-300">{calculatedcAMP}%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Transcription Level (lacZYA):</div>
                          <span
                            className={`text-sm font-black font-mono px-3 py-1 rounded-lg ${
                              lacOperonTranscribing ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' : 'bg-rose-500/20 text-rose-400 border border-rose-500'
                            }`}
                          >
                            {lacOperonTranscribing ? '100% MAXIMUM EXPRESSION' : 'REPRESSED / BASAL (OFF)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Trp Operon */
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Tryptophan (Corepressor) Level:</span>
                          <span className="text-indigo-400 font-mono font-bold">{tryptophanLevel} µM</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tryptophanLevel}
                          onChange={e => setTryptophanLevel(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                          <span>Starvation (TrpR Inactive = ON)</span>
                          <span>Abundant (TrpR-Trp Active = Repressed)</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-400">TrpR Apo-repressor State:</div>
                          <div className="text-sm font-bold text-indigo-300">
                            {tryptophanLevel >= 35 ? 'Complexed with Tryptophan (Active Corepressor)' : 'Unbound Apo-repressor (Inactive)'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Biosynthesis Operon Output:</div>
                          <span
                            className={`text-sm font-black font-mono px-3 py-1 rounded-lg ${
                              trpOperonTranscribing ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' : 'bg-rose-500/20 text-rose-400 border border-rose-500'
                            }`}
                          >
                            {trpOperonTranscribing ? 'ON (Making Tryptophan)' : 'OFF (Repressed & Attenuated)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LAB 3: Molecular Scissors & Plasmid Cartography ── */}
              {currentSlide === 2 && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Restriction Enzyme:</span>
                      {(['EcoRI', 'BamHI', 'HindIII', 'PstI'] as const).map(enz => (
                        <button
                          key={enz}
                          onClick={() => {
                            setSelectedEnzyme(enz);
                            audioManager.play('tap');
                          }}
                          className={`px-2.5 py-1 rounded-md font-bold ${
                            selectedEnzyme === enz ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {enz}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCutPlasmid}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold"
                      >
                        Digest Vector ✂️
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLigateInsert}
                        disabled={!plasmidCut}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold disabled:opacity-40"
                      >
                        Ligate Insert (T4 Ligase) 🧬
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetPlasmid}
                        className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg"
                      >
                        Reset ↺
                      </motion.button>
                    </div>
                  </div>

                  {/* SVG Plasmid Map */}
                  <div className="flex justify-center bg-slate-900/40 p-4 rounded-xl">
                    <svg viewBox="0 0 320 240" className="w-full max-w-[340px]">
                      {/* Circular Plasmid pBR322 */}
                      <circle
                        cx="160"
                        cy="120"
                        r="80"
                        fill="none"
                        stroke={plasmidCut ? '#ef4444' : '#0d9488'}
                        strokeWidth="14"
                        strokeDasharray={plasmidCut ? '450 60' : 'none'}
                      />

                      {/* Foreign Insert Ligation */}
                      {insertAdded && (
                        <circle
                          cx="160"
                          cy="120"
                          r="80"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="16"
                          strokeDasharray="60 440"
                          strokeDashoffset="-20"
                        />
                      )}

                      {/* Vector Labels */}
                      <text x="160" y="115" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">pBR322</text>
                      <text x="160" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">4,361 bp</text>

                      {/* Markers */}
                      <text x="100" y="60" fill="#38bdf8" fontSize="8" fontWeight="bold">ampR (Ampicillin)</text>
                      <text x="200" y="60" fill="#f43f5e" fontSize="8" fontWeight="bold">tetR (Tetracycline)</text>
                      <text x="160" y="215" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">ori (Origin of Replication)</text>

                      {/* Cut indicator */}
                      {plasmidCut && (
                        <g transform="translate(230, 80)">
                          <text x="0" y="0" fill="#ef4444" fontSize="9" fontWeight="bold">✂️ Cut: {selectedEnzyme}</text>
                          <text x="0" y="12" fill="#cbd5e1" fontSize="7">Sticky 5'-AATT Overhang</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB 4: CTAB Plant DNA Isolation Phase Separation ── */}
              {currentSlide === 3 && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>NaCl Salt Molarity (CTAB Buffer):</span>
                        <span className="text-teal-400 font-mono font-bold">{saltMolarity} M</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.1"
                        value={saltMolarity}
                        onChange={e => setSaltMolarity(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                      <p className="text-[10px] text-slate-400">Optimal: 1.4 M (Prevents polysaccharide precipitation with nucleic acid)</p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Centrifuge Speed:</span>
                        <span className="text-teal-400 font-mono font-bold">{centrifugeRpm} RPM</span>
                      </div>
                      <input
                        type="range"
                        min="2000"
                        max="14000"
                        step="1000"
                        value={centrifugeRpm}
                        onChange={e => setCentrifugeRpm(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                      <button
                        onClick={handleCentrifugeRun}
                        className="w-full py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold"
                      >
                        Spin Centrifuge 🌀
                      </button>
                    </div>
                  </div>

                  {/* Centrifuge Tube Phase Diagram */}
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-around">
                    <div className="w-24 h-48 rounded-b-3xl border-2 border-slate-600 bg-slate-950 overflow-hidden relative shadow-inner">
                      {/* Top Aqueous Phase: DNA */}
                      <div className="w-full h-1/2 bg-cyan-500/40 border-b border-cyan-400 flex items-center justify-center text-[9px] font-bold text-cyan-200 text-center p-1">
                        Aqueous Phase (Pure Genomic DNA)
                      </div>
                      {/* Interphase: Denatured Proteins */}
                      <div className="w-full h-3 bg-white/70 flex items-center justify-center text-[7px] font-bold text-slate-900">
                        Interphase (Proteins)
                      </div>
                      {/* Organic Phase: Chloroform & Polyphenols */}
                      <div className="w-full h-20 bg-amber-950/80 flex items-center justify-center text-[8px] font-bold text-amber-300 text-center p-1">
                        Organic Phase (CTAB-Polysaccharides / Lipids)
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Calculated DNA Yield & Purity: </span>
                        <strong className="text-emerald-400 font-mono">{aqueousPhasePurity}%</strong>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Expected A260/A280 Ratio: </span>
                        <strong className="text-teal-300 font-mono">1.82 (Pure double-stranded DNA)</strong>
                      </div>
                      <p className="text-[11px] text-slate-400 max-w-xs">
                        Isopropanol or cold 100% ethanol added to the aspirated aqueous phase precipitates visible stringy white DNA fibers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: Blue-White Colony Screening Plate Reader ── */}
              {currentSlide === 4 && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs p-2 bg-slate-900 rounded-xl">
                    <span className="text-slate-300 font-bold">Plate Additives: LB Agar + Ampicillin (100 µg/mL) + IPTG + X-gal</span>
                    <span className="text-teal-400">Click a colony to inspect recombinant status</span>
                  </div>

                  {/* Agar Plate SVG */}
                  <div className="flex justify-center">
                    <svg viewBox="0 0 300 240" className="w-full max-w-[320px]">
                      {/* Petri Dish Base */}
                      <circle cx="150" cy="120" r="100" fill="#0f172a" stroke="#475569" strokeWidth="4" />
                      <circle cx="150" cy="120" r="94" fill="#1e293b" opacity="0.6" />

                      {/* White Recombinant Colonies */}
                      {[
                        { cx: 120, cy: 90 },
                        { cx: 170, cy: 80 },
                        { cx: 140, cy: 140 },
                        { cx: 190, cy: 130 },
                        { cx: 110, cy: 160 },
                      ].map((pos, i) => (
                        <g
                          key={`white_${i}`}
                          onClick={(e) => handlePickColony('recombinant', e)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle cx={pos.cx} cy={pos.cy} r="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                          <circle cx={pos.cx} cy={pos.cy} r="4" fill="#ffffff" />
                        </g>
                      ))}

                      {/* Blue Non-Recombinant Colonies */}
                      {[
                        { cx: 90, cy: 120 },
                        { cx: 150, cy: 60 },
                        { cx: 210, cy: 100 },
                        { cx: 180, cy: 170 },
                      ].map((pos, i) => (
                        <g
                          key={`blue_${i}`}
                          onClick={(e) => handlePickColony('non-recombinant', e)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle cx={pos.cx} cy={pos.cy} r="8" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
                          <circle cx={pos.cx} cy={pos.cy} r="4" fill="#38bdf8" />
                        </g>
                      ))}

                      <text x="150" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        White = Recombinant (Target) | Blue = Non-recombinant
                      </text>
                    </svg>
                  </div>

                  {colonySelection && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        colonySelection === 'recombinant'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-sky-950/60 border-sky-500 text-sky-200'
                      }`}
                    >
                      {colonySelection === 'recombinant' ? (
                        <span>
                          <strong>✓ WHITE COLONY SELECTED:</strong> The foreign cDNA insert was successfully ligated into the Multiple Cloning Site of pUC19, causing <em>insertional inactivation</em> of the lacZ alpha-peptide. X-gal is NOT hydrolyzed.
                        </span>
                      ) : (
                        <span>
                          <strong>ℹ️ BLUE COLONY SELECTED:</strong> The empty vector recircularized without an insert. Intact lacZ alpha-peptide complemented the host to synthesize active beta-galactosidase, cleaving X-gal into blue 5,5\'-dibromo-4,4\'-dichloro-indigo.
                        </span>
                      )}
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
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-teal-400 w-6' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX FREE PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">Molecular Engineering Sandbox</h3>
              <p className="text-xs text-slate-400 mt-1">Free unrestricted manipulation of all operons, restriction cutters, and translation machines.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-teal-500/20"
            >
              Start Mastery Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Real-time Gel Canvas */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-teal-300">Live Agarose Gel Matrix & Operon Status</div>
              <canvas ref={canvasRef} width={450} height={120} className="w-full rounded-xl border border-slate-800" />
            </div>

            {/* Translation Fast Controller */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-teal-300">Fast Polypeptide Builder</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Current Peptide:</span>
                <div className="flex gap-1 flex-wrap">
                  {polypeptideChain.map((aa, i) => (
                    <span key={i} className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded text-[10px] font-mono font-bold">
                      {aa}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAdvanceTranslation}
                  className="px-3 py-1 bg-teal-600 text-white rounded-lg text-xs font-bold"
                >
                  Step Translation (+1 aa)
                </button>
                <button
                  onClick={handleResetTranslation}
                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs"
                >
                  Clear Chain
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (Adaptive Evaluation) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Progress & Adaptive Tier Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-400 border-rose-700'
                      : 'bg-teal-950 text-teal-400 border-teal-700'
                  }`}
                >
                  {difficulty.toUpperCase()} TIER
                </motion.span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Competency: <span className="text-teal-300 font-mono font-bold uppercase">{challenge.competencyLevel}</span> (NEP 2020 / CISCE 2026)
              </div>
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Mastery Level:</div>
                <div className="text-xs font-bold text-teal-400 font-mono uppercase">{masteryLevel}</div>
              </div>
              <div className="px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs font-bold text-teal-300">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* ── Type: Classify / Distinguish / Match (MCQ) ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700/80'
                    }`}
                  >
                    <span className="font-mono text-teal-400 mr-2">({String.fromCharCode(65 + i)})</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── Type: Drag Label ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto their respective targets:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets SVG / Box */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'site_e', title: 'Left Pocket (Exit)' },
                    { id: 'site_p', title: 'Middle Pocket (Peptidyl)' },
                    { id: 'site_a', title: 'Right Pocket (Aminoacyl)' },
                    { id: 'channel_mrna', title: 'Small Subunit Slot' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">{target.title}</span>
                      <span className="text-xs font-bold">{droppedLabels[target.id] || 'Drop label here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Labels Check ✓
                </motion.button>
              </div>
            )}

            {/* ── Type: Drag Sort ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400">Reorder steps by dragging them into chronological sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-teal-900 text-teal-300 flex items-center justify-center font-bold text-xs">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
                >
                  Submit Step Sequence ✓
                </motion.button>
              </div>
            )}

            {/* ── Type: Numeric Input ── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-teal-500"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── Type: Construct Vector Cassette ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Click blocks to append to expression cassette:</span>
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-teal-800 hover:bg-teal-700 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <div key={i} className="px-3 py-1 bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-2">
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-rose-300 font-black hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Cassette empty...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0 || showExplanation}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Cassette Architecture ✓
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-teal-950/50 border border-teal-700 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
                  <span>💡</span> Step-by-Step Biochemical Breakdown
                </div>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-teal-100 text-xs sm:text-sm leading-relaxed"
                    >
                      <strong className="text-teal-400 font-mono mr-1.5">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 mt-3"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Evaluation →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-teal-950 to-slate-900 rounded-3xl border border-teal-700 text-center space-y-3">
            <div className="text-5xl">🏆</div>
            <h2 className="text-3xl font-black text-white">Mastery Assessment Complete!</h2>
            <p className="text-slate-300 text-sm">You have demonstrated ISC Class 12 Biotechnology laboratory excellence.</p>
            <div className="inline-flex items-center gap-4 bg-slate-950/80 px-6 py-3 rounded-2xl border border-teal-800 font-mono">
              <div>
                <div className="text-[10px] text-slate-400">FINAL SCORE</div>
                <div className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <div className="text-[10px] text-slate-400">BKT MASTERY</div>
                <div className="text-xl font-black text-teal-400 uppercase">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-gradient-to-r from-teal-950/80 to-slate-900 rounded-2xl border border-teal-700 text-center">
            <h3 className="text-lg font-black text-white mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {errors === 0
                ? '🌟 Flawless mastery! You answered every question correctly on translation, operon kinetics, restriction analysis, and cloning vectors.'
                : errors <= 3
                ? '✨ High-level performance! Your grasp of molecular biotechnology workflows is solid for board examinations.'
                : errors <= 7
                ? '🌱 Solid attempt! Review the specific feedback below to master subtle molecular mechanisms.'
                : '💪 Keep practicing! Every attempt builds your conceptual understanding of molecular cloning and gene regulation.'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-teal-800/60 space-y-4">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <span>💭</span> Key Concept Reflections
            </div>
            <h3 className="text-lg font-bold text-white">Consolidate Your Learning</h3>
            <p className="text-xs text-slate-400">Take a moment to reflect on your biotechnology laboratory investigation:</p>
            
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-teal-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers['surprising'] || ''}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How reverse transcriptase bypasses bacterial intron splicing issues..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-teal-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers['explain'] || ''}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., Blue-white screening works like an ink cartridge that breaks when we insert our target gene..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-teal-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers['reallife'] || ''}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, reallife: e.target.value }))}
                  placeholder="e.g., Designing recombinant protein therapeutics or synthetic biology vaccines..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Identified Misconception Profile:
              </h4>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Review Schedule */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">SM-2 Spaced Repetition Next Review Due: </span>
              <strong className="text-teal-300 font-mono">
                {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : 'Tomorrow (24 Hours)'}
              </strong>
            </div>
            <span className="text-slate-500 font-mono">Algorithm: SuperMemo SM-2</span>
          </div>

          {/* Real World Activity Blueprint */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-teal-900/50 space-y-3">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <span>🏭</span> Industrial Biotechnology Project
            </div>
            <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2 mt-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Biotechnology Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiotechnologyTranslationInitiationElongationSim;