'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 BIOLOGY NODE IDS ───
const NODE_C11_BIO_021 = 'c11_bio_021'; // Cell wall and plasmodesmata
const NODE_C11_BIO_022 = 'c11_bio_022'; // Endomembrane system
const NODE_C11_BIO_023 = 'c11_bio_023'; // Mitochondria and plastids
const NODE_C11_BIO_024 = 'c11_bio_024'; // Nucleus and chromosome types
const NODE_C11_BIO_025 = 'c11_bio_025'; // Cytoskeleton, cilia, and flagella
const NODE_C11_BIO_026 = 'c11_bio_026'; // Biomolecules - carbohydrates
const NODE_C11_BIO_027 = 'c11_bio_027'; // Biomolecules - proteins
const NODE_C11_BIO_028 = 'c11_bio_028'; // Biomolecules - lipids
const NODE_C11_BIO_029 = 'c11_bio_029'; // Enzymes
const NODE_C11_BIO_030 = 'c11_bio_030'; // Cell cycle phases

const ALL_NODE_IDS = [
  NODE_C11_BIO_021,
  NODE_C11_BIO_022,
  NODE_C11_BIO_023,
  NODE_C11_BIO_024,
  NODE_C11_BIO_025,
  NODE_C11_BIO_026,
  NODE_C11_BIO_027,
  NODE_C11_BIO_028,
  NODE_C11_BIO_029,
  NODE_C11_BIO_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Living Architecture of Assam Tea Cells',
  intro: 'In the tea gardens of Jorhat, Assam, a sudden environmental shift causes extreme osmotic fluctuations. Young shoot cells must stretch and divide, while mature woody stem cells withstand sheer mechanical winds.',
  context: 'As a cellular biophysicist, examine how the multi-layered cell wall, plasmodesmatal symplast, endomembranes, and energetic organelles coordinate with macromolecular machinery to preserve cellular integrity.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'When fresh tea shoots are placed in pure mountain water (hypotonic), why do plant cells swell without bursting, whereas human red blood cells rapidly lyse?',
  options: [
    'Plant cell membranes are 100x thicker and impermeable to water',
    'The rigid cellulose cell wall exerts turgor pressure opposing water influx',
    'Plant vacuoles actively pump water out through contractile pores',
    'Plasmodesmata seal shut to prevent any water entry',
  ],
  correctIndex: 1,
  hintAfter: 'Think about the mechanical difference between a soft balloon and a balloon encased inside a wooden box!',
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

// ─── CHALLENGES DATASET (22 Challenges covering 10 nodes) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_bio_001',
    nodeId: NODE_C11_BIO_021,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the plant cell envelope layers in sequence from OUTSIDE (intercellular space) to INSIDE (cytoplasm).',
    sortItems: ['Middle Lamella (Calcium Pectate)', 'Primary Cell Wall (Cellulose + Hemicellulose)', 'Secondary Cell Wall (Lignified)', 'Plasma Membrane (Lipid Bilayer)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The outermost cementing layer is the middle lamella, followed inward by the primary wall, the secondary wall (deposited in mature cells), and finally the living plasma membrane.',
    hints: [
      'The middle lamella sits between adjacent cells as cementing glue.',
      'The primary wall is laid down before the secondary wall.',
      'The plasma membrane is the innermost living boundary enclosing the cytoplasm.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_002',
    nodeId: NODE_C11_BIO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What central tubular structure traverses a plasmodesma to connect the endoplasmic reticulum of neighboring plant cells?',
    options: ['Microtubule singlet', 'Desmotubule', 'Tonoplast canal', 'Kinetochore filament'],
    correctIndex: 1,
    explanation: 'A desmotubule is a specialized cylinder of endoplasmic reticulum running through the center of a plasmodesma, linking the ER lumen of adjacent cells.',
    hints: [
      'It is derived from the endoplasmic reticulum, not tubulin.',
      'The prefix "desmo-" refers to a bond or linkage.',
      'It creates a narrow cytoplasmic sleeve around it for symplastic transport: desmotubule.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_003',
    nodeId: NODE_C11_BIO_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which set of organelles functions coordinately as the eukaryotic endomembrane system?',
    options: [
      'Endoplasmic Reticulum, Golgi Complex, Lysosomes, Vacuoles',
      'Mitochondria, Chloroplasts, Peroxisomes, Nucleus',
      'Ribosomes, Centrosomes, Cytoskeleton, Cilia',
      'Nucleolus, Chromosomes, Nuclear pores, Chromoplasts',
    ],
    correctIndex: 0,
    explanation: 'The endomembrane system comprises the ER, Golgi apparatus, lysosomes, and vacuoles. Mitochondria and chloroplasts are semi-autonomous double-membrane organelles outside this system.',
    hints: [
      'Look for organelles that share single-membrane vesicles for packaging and transport.',
      'Mitochondria and chloroplasts are NOT part of the endomembrane system.',
      'ER synthesises, Golgi packages, lysosomes digest, vacuoles store.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_004',
    nodeId: NODE_C11_BIO_026,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following carbohydrates is a non-reducing disaccharide extracted from sugarcane in India?',
    options: ['Maltose', 'Lactose', 'Sucrose', 'Galactose'],
    correctIndex: 2,
    explanation: 'Sucrose is a non-reducing disaccharide because both anomeric carbons of glucose and fructose are locked in the glycosidic bond.',
    hints: [
      'Maltose and lactose have free anomeric carbons that reduce Benedict reagent.',
      'It yields glucose + fructose upon hydrolysis.',
      'Common table sugar is sucrose.',
    ],
  },
  {
    id: 'ch_bio_005',
    nodeId: NODE_C11_BIO_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which amino acid has the simplest R-group (a single hydrogen atom) and lacks optical stereoisomerism?',
    options: ['Alanine', 'Glycine', 'Serine', 'Cysteine'],
    correctIndex: 1,
    explanation: 'Glycine has H as its R-group. Because the alpha carbon is bonded to two identical hydrogen atoms, it is achiral (optically inactive).',
    hints: [
      'Alanine has -CH3 and Serine has -CH2OH.',
      'It is the smallest and most flexible amino acid.',
      'The name begins with Gly-.',
    ],
  },
  {
    id: 'ch_bio_006',
    nodeId: NODE_C11_BIO_024,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A chromosome with its centromere located exactly at the center, forming two equal arms (V-shaped during anaphase), is:',
    options: ['Submetacentric', 'Acrocentric', 'Metacentric', 'Telocentric'],
    correctIndex: 2,
    explanation: 'Metacentric chromosomes have a median centromere with equal arms (V-shape). Submetacentric is L-shaped, acrocentric is J-shaped, and telocentric is I-shaped.',
    hints: [
      'The prefix "meta-" denotes middle.',
      'During anaphase pull, equal arm resistance creates a symmetrical V.',
      'It is called a metacentric chromosome.',
    ],
  },
  {
    id: 'ch_bio_007',
    nodeId: NODE_C11_BIO_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The internal core (axoneme) of eukaryotic cilia and flagella exhibits which microtubular pattern?',
    options: ['9 + 0 triplet array', '9 + 2 doublet array', '8 + 1 singlet array', '6 + 3 bundle array'],
    correctIndex: 1,
    explanation: 'The axoneme has 9 peripheral doublet microtubules surrounding 2 central singlet microtubules (9+2), whereas basal bodies and centrioles have a 9+0 triplet arrangement.',
    hints: [
      'Centrioles are 9+0; cilia and flagella shafts have central singlets.',
      'There are nine doublets on the periphery and two singles in the core.',
      'The classic pattern is 9 + 2.',
    ],
  },
  {
    id: 'ch_bio_008',
    nodeId: NODE_C11_BIO_021,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Drag the correct labels onto the structural zones of two adjacent plant cells connected by a plasmodesma.',
    dragItems: [
      { label: 'Middle Lamella', targetId: 'zone_middle' },
      { label: 'Primary Wall', targetId: 'zone_primary' },
      { label: 'Desmotubule', targetId: 'zone_desmo' },
      { label: 'Plasma Membrane', targetId: 'zone_membrane' },
    ],
    correctMapping: {
      zone_middle: 'Middle Lamella',
      zone_primary: 'Primary Wall',
      zone_desmo: 'Desmotubule',
      zone_membrane: 'Plasma Membrane',
    },
    explanation: 'The middle lamella glues the cells together; the flexible primary wall surrounds the plasma membrane, and the desmotubule spans the channel.',
    hints: [
      'The middle lamella is the central cementing boundary line.',
      'The primary wall is adjacent to the middle lamella on both sides.',
      'The desmotubule is the central ER core running through the pore.',
    ],
  },
  {
    id: 'ch_bio_009',
    nodeId: NODE_C11_BIO_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A tea leaf cell and a mammalian lymphocyte are placed in distilled water (0 mOsm/L). What occurs after 15 minutes?',
    options: [
      'Both cells undergo burst lysis due to uncontrolled endosmosis',
      'The tea cell generates wall turgor pressure reaching equilibrium; the lymphocyte lyses',
      'The lymphocyte forms a secondary wall; the tea cell undergoes plasmolysis',
      'Water exits both cells because intracellular solute potential becomes zero',
    ],
    correctIndex: 1,
    explanation: 'The plant cell wall resists expansion, generating positive turgor (wall) pressure that halts net water influx. Animal cells lack a rigid wall and lyse under excessive osmotic swelling.',
    hints: [
      'Recall how cell walls protect plant protoplasts from mechanical rupture.',
      'Animal cells only have a flexible lipid bilayer.',
      'Turgor pressure prevents the plant cell from bursting.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_010',
    nodeId: NODE_C11_BIO_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why are mitochondria and chloroplasts designated as "semi-autonomous" rather than fully autonomous organelles?',
    options: [
      'They lack circular DNA and must import all nucleic acids from the cytoplasm',
      'They possess their own circular DNA and 70S ribosomes but depend on nuclear genes for most proteins',
      'They can survive and divide indefinitely in sterile nutrient broth outside the host cell',
      'Their inner membranes are synthesized directly by rough endoplasmic reticulum vesicles',
    ],
    correctIndex: 1,
    explanation: 'They carry circular genome and 70S ribosomes allowing local protein synthesis, but ~90% of their proteome is encoded by nuclear DNA and imported from cytosol.',
    hints: [
      'Semi means partially: they have some self-replicating tools but cannot live independently.',
      'They possess bacterial-like 70S ribosomes and circular DNA.',
      'Most structural and metabolic proteins are still encoded in the cell nucleus.',
    ],
  },
  {
    id: 'ch_bio_011',
    nodeId: NODE_C11_BIO_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is Indian cow ghee semi-solid at 22°C whereas mustard oil remains completely liquid?',
    options: [
      'Ghee consists of short-chain monosaccharides linked by beta-glycosidic bonds',
      'Ghee is rich in saturated fatty acids with straight chains that pack closely; mustard oil has kinked unsaturated bonds',
      'Mustard oil contains cholesterol that disrupts regular crystalline lattice formation',
      'Ghee contains hydrophilic phosphate heads that attract hydration shells',
    ],
    correctIndex: 1,
    explanation: 'Saturated fatty acids (palmitic, stearic) have straight hydrocarbon tails that maximize van der Waals attractions. Unsaturated double bonds in mustard oil create steric kinks that prevent tight packing.',
    hints: [
      'Double bonds introduce rigid kinks into the hydrocarbon chain.',
      'Straight saturated chains pack easily into a solid matrix.',
      'Saturated vs unsaturated hydrocarbon geometry governs melting points.',
    ],
  },
  {
    id: 'ch_bio_012',
    nodeId: NODE_C11_BIO_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which chemical interaction forms covalent cross-links specifically between cysteine residues to stabilize tertiary protein architecture?',
    options: ['Hydrogen bonds', 'Disulphide bridges (-S-S-)', 'Hydrophobic van der Waals forces', 'Peptide linkages'],
    correctIndex: 1,
    explanation: 'Disulphide bonds are covalent linkages formed by oxidation between thiol (-SH) groups of two cysteine residues, locking the 3D tertiary fold.',
    hints: [
      'It involves sulfur atoms in the amino acid side chains.',
      'It is a true covalent bond, unlike hydrogen bonding.',
      'Cysteine has a -CH2-SH group that forms disulphide bridges.',
    ],
  },
  {
    id: 'ch_bio_013',
    nodeId: NODE_C11_BIO_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When malonate competitively inhibits succinate dehydrogenase, what happens to Vmax and the apparent Km value?',
    options: [
      'Vmax decreases, Km remains constant',
      'Vmax remains unchanged (can be achieved at high substrate), apparent Km increases',
      'Both Vmax and Km decrease by exactly 50%',
      'The enzyme is irreversibly denatured and Vmax drops to zero',
    ],
    correctIndex: 1,
    explanation: 'Competitive inhibitors compete for the active site. Adding excess succinate outcompetes malonate, achieving full Vmax, but higher substrate is needed for half-saturation, increasing apparent Km.',
    hints: [
      'Can excess substrate overcome a competitive inhibitor?',
      'Since excess substrate overcomes it, maximum velocity (Vmax) is still reachable.',
      'More substrate is needed to reach 1/2 Vmax, so Km increases.',
    ],
  },
  {
    id: 'ch_bio_014',
    nodeId: NODE_C11_BIO_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A diploid Allium cepa root meristem cell has 4.0 picograms of DNA in G1 phase. How many picograms of DNA will be present in this single cell at the end of S phase (during G2)?',
    correctAnswer: 8.0,
    tolerance: 0.1,
    unit: 'pg',
    explanation: 'During S phase, semiconservative DNA replication doubles the DNA content from 2C (4.0 pg) to 4C (8.0 pg). The chromosome count remains diploid (2n), but each chromosome possesses two sister chromatids.',
    hints: [
      'S phase stands for DNA synthesis (replication).',
      'Every single DNA double helix is copied into two identical sister chromatids.',
      '4.0 pg × 2 = 8.0 pg.',
    ],
  },
  {
    id: 'ch_bio_015',
    nodeId: NODE_C11_BIO_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does cellulose form straight, rigid, unbranched microfibrils suitable for cell walls, while amylose starch coils into helices?',
    options: [
      'Cellulose is built from beta-1,4-glycosidic bonds, while amylose has alpha-1,4-glycosidic bonds',
      'Cellulose contains fructose monomers joined by peptide linkages',
      'Amylose contains alternating nitrogen-containing chitin rings',
      'Cellulose is soluble in water and forms viscous gelatinous matrices',
    ],
    correctIndex: 0,
    explanation: 'Beta-1,4-glucose linkages flip alternate glucose residues by 180°, producing rigid linear ribbons that form dense interchain hydrogen-bonded microfibrils.',
    hints: [
      'Consider the difference between alpha and beta glucose ring geometries.',
      'Beta linkages produce straight, planar ribbons.',
      'Alpha linkages induce natural coiling and helical turns.',
    ],
  },
  {
    id: 'ch_bio_016',
    nodeId: NODE_C11_BIO_022,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Assemble the sequential organelles/structures traversed by a newly synthesized digestive pectinase enzyme destined for secretion into the plant cell wall.',
    availableParts: ['Rough ER Ribosome', 'Transport Vesicle', 'Cis Golgi Cisterna', 'Trans Golgi Network', 'Secretory Vesicle', 'Plasma Membrane Exocytosis', 'Mitochondrial Matrix', 'Smooth ER Tubule'],
    targetState: 'Rough ER Ribosome -> Transport Vesicle -> Cis Golgi Cisterna -> Trans Golgi Network -> Secretory Vesicle -> Plasma Membrane Exocytosis',
    validationHint: 'Select the 6 parts in order from synthesis on rough ER to final exocytosis at the plasma membrane.',
    explanation: 'Pectinase is translated into RER lumen, moves via COPII transport vesicle to cis-Golgi, undergoes glycosylation maturing towards trans-Golgi, packs into secretory vesicle, and fuses with plasma membrane.',
    hints: [
      'Protein synthesis starts at the Rough ER.',
      'The cis face of Golgi receives vesicles; the trans face ships them.',
      'Final release occurs when secretory vesicles fuse with the plasma membrane.',
    ],
  },
  {
    id: 'ch_bio_017',
    nodeId: NODE_C11_BIO_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In human karyotyping, satellite (SAT) chromosomes (such as 13, 14, 15, 21, 22) bear a secondary constriction. What is the fundamental biological significance of this stalk region?',
    options: [
      'It represents the kinetochore attachment site for anaphase spindle microtubules',
      'It contains the Nucleolar Organizer Region (NOR) containing tandem rDNA genes for rRNA transcription',
      'It is composed exclusively of inert, transcriptionally silent constitutive heterochromatin',
      'It acts as the telomeric shelterin complex preventing end-to-end chromosome fusion',
    ],
    correctIndex: 1,
    explanation: 'The secondary constriction houses the nucleolar organizer region (NOR), containing multiple copies of 18S and 28S ribosomal RNA genes around which the nucleolus reconstitutes in telophase.',
    hints: [
      'The centromere is the primary constriction (kinetochore site).',
      'The secondary constriction is linked to nucleolus formation.',
      'NOR contains ribosomal RNA (rRNA) gene repeats.',
    ],
  },
  {
    id: 'ch_bio_018',
    nodeId: NODE_C11_BIO_025,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the 9+2 axoneme of a respiratory epithelial cilium, ATP hydrolysis powers dynein arms. Why does this sliding force turn into a ciliary bend rather than complete doublet detachment?',
    options: [
      'Interdoublet nexin cross-linkers and radial spokes physically restrict longitudinal sliding, converting shear into bending',
      'The central singlets rotate like a propeller shaft pulling the outer doublets',
      'Actin microfilaments contract rhythmically around the outer doublet perimeter',
      'The plasma membrane freezes into a rigid crystalline gel during ATP hydrolysis',
    ],
    correctIndex: 0,
    explanation: 'Nexin elastic links connect adjacent peripheral doublets and radial spokes anchor to the central sheath. These structural restraints convert ATP-dependent dynein sliding forces into asymmetric bending waves.',
    hints: [
      'What protein bridges adjacent doublet pairs?',
      'Nexin links resist unlimited shearing.',
      'Anchored sliding forces naturally cause elastic beams to bend.',
    ],
  },
  {
    id: 'ch_bio_019',
    nodeId: NODE_C11_BIO_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Gastric pepsin functions optimally at pH 1.8 with catalytic aspartic acid residues (-COOH). When entering the duodenum at pH 8.2, pepsin instantly ceases activity because:',
    options: [
      'The active site carboxyl groups become fully deprotonated (-COO⁻), altering tertiary electrostatic conformation and substrate binding',
      'Covalent peptide bonds along the primary backbone are rapidly hydrolyzed by bile salts',
      'Hydrochloric acid undergoes condensation polymerization inside the active pocket',
      'Pepsin converts into an apoenzyme by shedding its zinc metallic cofactor',
    ],
    correctIndex: 0,
    explanation: 'Extreme shifts away from optimum pH alter the ionization states of catalytic R-groups (e.g. Asp-COOH -> Asp-COO-), disrupting electrostatic bonds maintaining the precise 3D active site geometry.',
    hints: [
      'pH changes alter the electrical charge of acidic and basic amino acid side chains.',
      'Pepsin active site requires protonated aspartate carboxyl groups.',
      'Deprotonation disrupts the tertiary active site conformation without breaking peptide bonds.',
    ],
  },
  {
    id: 'ch_bio_020',
    nodeId: NODE_C11_BIO_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the difference between a terminally differentiated adult human cardiac myocyte in G0 and a quiescent skin fibroblast in G0:',
    options: [
      'Cardiac myocytes are in irreversible G0 with silenced replication machinery; fibroblasts remain in reversible G0 capable of re-entering G1 upon growth factor stimulation',
      'Cardiac myocytes contain 4C DNA, while quiescent fibroblasts contain only 1C DNA',
      'Fibroblasts lack nucleus and chromosomes, whereas myocytes maintain continuous cyclin B activity',
      'Both cells spontaneously initiate mitosis every 24 hours regardless of external signals',
    ],
    correctIndex: 0,
    explanation: 'Terminally differentiated cells (neurons, cardiac myocytes) permanently exit the cell cycle into irreversible G0. Fibroblasts reside in reversible G0 and re-enter G1 upon mitogen/wound signaling.',
    hints: [
      'Can heart muscle regenerate easily after injury compared to healing skin?',
      'Skin fibroblasts divide to heal wounds when stimulated.',
      'Terminally differentiated cells are permanently locked in G0.',
    ],
  },
  {
    id: 'ch_bio_021',
    nodeId: NODE_C11_BIO_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'If you synthesize an artificial nanovesicle for targeted drug delivery, why do phospholipids spontaneously organize into closed bilayer spheres (liposomes) in aqueous saline?',
    options: [
      'Thermodynamic minimization of free energy: hydrophobic hydrocarbon tails are sequestered from water while polar heads maximize hydrogen bonding with water',
      'Covalent disulfide bonds form spontaneously between neighboring glycerol backbones',
      'Enzymatic ATP synthase motors on the vesicle surface push lipids into circles',
      'Water molecules form covalent ester linkages with the fatty acid tail terminals',
    ],
    correctIndex: 0,
    explanation: 'The hydrophobic effect drives non-polar acyl chains together to minimize disruption of water hydrogen-bond networks (entropy driven), creating a self-sealing closed lipid bilayer.',
    hints: [
      'Phospholipids are amphipathic (polar head + non-polar tails).',
      'Water repels hydrophobic fatty acid tails.',
      'A closed sphere eliminates exposed hydrophobic edges with minimum free energy.',
    ],
  },
  {
    id: 'ch_bio_022',
    nodeId: NODE_C11_BIO_026,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A glycogen molecule has 1,000 glucose residues with branching every 10 residues. How many non-reducing ends are available for simultaneous rapid phosphorolysis by glycogen phosphorylase?',
    correctAnswer: 101,
    tolerance: 2,
    unit: 'ends',
    explanation: 'With a highly branched tree structure, each branch bifurcation adds another terminal branch. For 1,000 residues branched every ~10 residues (~100 branches), there are approximately 101 non-reducing ends available for rapid parallel glucose liberation.',
    hints: [
      'Every branch point creates an additional branch tip.',
      'Branching creates multiple free ends for enzymatic attack.',
      '100 branch points yield ~101 terminal non-reducing ends.',
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BIO_021,
  title: 'Cell Wall, Plasmodesmata & Cellular Architecture',
  definition: 'The plant cell wall is a rigid, layered extracellular matrix composed of the middle lamella (calcium pectate), primary wall (cellulose microfibrils in pectin-hemicellulose matrix), and secondary wall (lignified), traversed by plasmodesmata containing desmotubules for symplastic transport.',
  eli5: 'Think of plant cells as sturdy cardboard houses glued together with sticky middle lamella cement. Inside, secret hallways called plasmodesmata allow neighbors to pass messages and snacks without going outside!',
  misconceptions: [
    {
      misconception: 'The cell wall and plasma membrane are interchangeable names for the same boundary.',
      correction: 'The cell wall is an outer, non-living, rigid polysaccharide matrix, whereas the plasma membrane is an inner, living, selectively permeable lipid bilayer.',
    },
    {
      misconception: 'The secondary cell wall is deposited outside the primary wall.',
      correction: 'The secondary wall is always deposited INNER to the primary wall, between the primary wall and the plasma membrane, once elongation ceases.',
    },
    {
      misconception: 'Plasmodesmata are wide, open empty holes between cells.',
      correction: 'Each plasmodesma is lined by plasma membrane and contains a central desmotubule (endoplasmic reticulum tube) surrounded by a regulated cytoplasmic sleeve.',
    },
    {
      misconception: 'Mitochondria and chloroplasts are completely independent living cells inside us.',
      correction: 'They are semi-autonomous: while they contain circular DNA and 70S ribosomes, they rely on the cell nucleus for over 90% of their essential proteins.',
    },
    {
      misconception: 'During interphase (G1, S, G2), the cell is dormant and resting.',
      correction: 'Interphase is the most metabolically intense phase where continuous protein synthesis, organelle biogenesis, and complete DNA replication occur.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which substance acts as the intercellular cementing layer in plant tissues?',
      options: ['Cellulose microfibrils', 'Calcium and magnesium pectate', 'Lignin polymer', 'Suberin wax'],
      correctIndex: 1,
    },
    {
      question: 'What happens to a plant cell in a hypotonic medium?',
      options: ['Lyses instantly', 'Undergoes plasmolysis', 'Becomes turgid without bursting', 'Shrinks completely'],
      correctIndex: 2,
    },
    {
      question: 'Which organelle modifies, sorts, and packages glycoproteins received from the ER?',
      options: ['Lysosome', 'Golgi complex', 'Mitochondrion', 'Peroxisome'],
      correctIndex: 1,
    },
    {
      question: 'What is the function of the desmotubule in plasmodesmata?',
      options: ['Synthesizes ATP', 'Anchors the nucleus', 'Connects the ER of adjacent cells', 'Digests cellulose'],
      correctIndex: 2,
    },
    {
      question: 'Which chromosome type possesses two equal arms and a median centromere?',
      options: ['Telocentric', 'Acrocentric', 'Metacentric', 'Submetacentric'],
      correctIndex: 2,
    },
    {
      question: 'Which bond links glucose residues in cellulose to form straight, unbranched chains?',
      options: ['Alpha-1,4-glycosidic bond', 'Beta-1,4-glycosidic bond', 'Ester bond', 'Peptide bond'],
      correctIndex: 1,
    },
    {
      question: 'During which cell cycle phase does DNA replication and histone synthesis occur?',
      options: ['G1 phase', 'G0 phase', 'S phase', 'G2 phase'],
      correctIndex: 2,
    },
    {
      question: 'How do competitive enzyme inhibitors alter maximum velocity (Vmax)?',
      options: ['Reduce Vmax by 50%', 'Vmax is unchanged', 'Increase Vmax tenfold', 'Vmax drops to zero permanently'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student correctly identifies cell wall layers, plasmodesmata transport, endomembranes, macromolecule structures, enzyme kinetics, and cell cycle phases with >80% accuracy.',
};

// ─── 5 INTERACTIVE BRILLIANT EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Layered Architecture: Outside to Inside',
    instruction: 'Click each cell wall layer in sequence (Middle Lamella → Primary → Secondary → Membrane) to reveal its biochemical makeup.',
    interactionType: 'click-layers',
    nodeId: NODE_C11_BIO_021,
  },
  {
    title: 'The Symplastic Highway: Plasmodesmata',
    instruction: 'Adjust the Solute Flux slider to transport sugars through the cytoplasmic sleeve around the desmotubule.',
    interactionType: 'slider-flux',
    nodeId: NODE_C11_BIO_021,
  },
  {
    title: 'Osmotic Turgor Pressure & Wall Stress',
    instruction: 'Change the external solution tonicity from Hypertonic to Hypotonic and observe how the rigid wall prevents bursting.',
    interactionType: 'slider-tonicity',
    nodeId: NODE_C11_BIO_021,
  },
  {
    title: 'Enzyme Active Site & Activation Energy Barrier',
    instruction: 'Adjust temperature and pH to find the catalytic optimum for leaf pectinase without denaturing its tertiary structure.',
    interactionType: 'slider-enzyme',
    nodeId: NODE_C11_BIO_029,
  },
  {
    title: 'Cell Cycle Clock & DNA C-Value Doubling',
    instruction: 'Drag the Cell Cycle Phase selector (G1 → S → G2 → M) to watch chromosome duplication and chromatid partitioning.',
    interactionType: 'cycle-scrubber',
    nodeId: NODE_C11_BIO_030,
  },
];

// ──��� PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you drop a fresh plant cell into a hypertonic salt solution (1000 mOsm), what will happen to the plasma membrane and cell wall?',
    options: [
      'Both the wall and membrane will shatter into fragments',
      'The rigid cell wall maintains shape while the plasma membrane pulls away (plasmolysis)',
      'The cell wall will swell and burst open',
      'Water will enter the vacuole to balance external salt',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Tonicity slider to Hypertonic (< -30%) in Step 3 to observe plasmolysis in real time!',
  },
  {
    question: 'Predict: If leaf pectinase enzyme is heated from 37°C up to 90°C, what will happen to its catalytic activity?',
    options: [
      'Activity will increase exponentially because kinetic collisions double',
      'Activity will drop to near zero due to thermal denaturation of the 3D active site',
      'The enzyme will convert into a structural cellulose fiber',
      'The primary peptide bonds will all instantly break into free amino acids',
    ],
    correctIndex: 1,
    verifyInstruction: 'Raise the Temperature slider to 90°C in Step 4 to observe the active site unfolding!',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice happens to the vacuole and plasma membrane when turgor pressure reaches maximum (100%) in hypotonic conditions?',
    observableOptions: [
      'The membrane pushes firmly against the rigid wall, halting net water intake',
      'The cell ruptures like an animal red blood cell',
      'The middle lamella dissolves completely',
      'The plasmodesmata close permanently',
    ],
    correctIndex: 0,
  },
  {
    question: 'What happens to the DNA content (C-value) as the cell passes from G1 through the S phase?',
    observableOptions: [
      'DNA content doubles from 2C to 4C, while chromosome number remains 2n',
      'Chromosome number doubles from 2n to 4n, but DNA remains 2C',
      'DNA content is halved to 1C to prepare for division',
      'No biochemical changes occur until M phase',
    ],
    correctIndex: 0,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Assam Tea Shoot Micro-Analysis Investigation',
  description: 'Apply your understanding of cell wall rigidity, symplastic transport, and protein denaturation to tea manufacturing in Assam.',
  steps: [
    'Observe fresh young tea flush (rich in extensible primary walls and pectin) vs tough pruning wood (thick lignified secondary xylem).',
    'Investigate the "withering" process: controlled plasmolysis reduces cell turgor to make leaves pliable for rolling without breaking the outer walls.',
    'Examine "fermentation/oxidation": polyphenol oxidase enzymes catalyze tea browning at optimum temperature (25-30°C) and pH 5.5.',
    'Explain how "firing/drying" at 95°C denatures enzymes, locking in aroma and ending biochemical reactions.',
  ],
};

function C11_BiologyCellWallPlasmodesmataSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_BIO_021,
  title = DEFAULT_PROPS.title || 'Cell Wall, Plasmodesmata & Cellular Architecture',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🌿', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Brilliant.org States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox States
  const [activeWallLayer, setActiveWallLayer] = useState<'middle' | 'primary' | 'secondary' | 'membrane'>('middle');
  const [soluteFluxRate, setSoluteFluxRate] = useState(50); // 10-100%
  const [tonicityValue, setTonicityValue] = useState(0); // -50 (Hyper) to +50 (Hypo)
  const [enzymeTemp, setEnzymeTemp] = useState(37); // 0 to 90 °C
  const [enzymePH, setEnzymePH] = useState(7.0); // 1 to 14 pH
  const [cyclePhase, setCyclePhase] = useState<'G1' | 'S' | 'G2' | 'M' | 'G0'>('G1');
  const [substrateConc, setSubstrateConc] = useState(50); // 0-100 mM
  const [hasInhibitor, setHasInhibitor] = useState<'none' | 'competitive' | 'noncompetitive'>('none');

  // Challenge and Feedback States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Drag and Drop & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Misconception Tracker
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const nextDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== nextDiff) {
        setCurrentChallenge(0);
        return nextDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME DERIVED BIO CALCULATIONS ───
  const turgorState = useMemo(() => {
    if (tonicityValue > 15) return { label: 'Turgid (Normal Plant State)', color: '#10b981', cellScale: 1.05, membraneOffset: 0 };
    if (tonicityValue < -15) return { label: 'Plasmolysed (Flaccid / Desiccated)', color: '#ef4444', cellScale: 0.88, membraneOffset: 24 };
    return { label: 'Incipient Plasmolysis (Equilibrium)', color: '#f59e0b', cellScale: 0.96, membraneOffset: 8 };
  }, [tonicityValue]);

  const enzymeActivityRate = useMemo(() => {
    const tempFactor = Math.max(0, 1 - Math.pow((enzymeTemp - 40) / 25, 2));
    const phFactor = Math.max(0, 1 - Math.pow((enzymePH - 7.0) / 3.0, 2));
    let vMax = 100;
    let km = 20;

    if (hasInhibitor === 'competitive') km = 60;
    if (hasInhibitor === 'noncompetitive') vMax = 40;

    const substrateSaturation = (vMax * substrateConc) / (km + substrateConc);
    return Math.max(0, Math.round(substrateSaturation * tempFactor * phFactor));
  }, [enzymeTemp, enzymePH, substrateConc, hasInhibitor]);

  const dnaCValue = useMemo(() => {
    switch (cyclePhase) {
      case 'G1': return { cVal: '2C (4.0 pg)', nVal: '2n (Diploid)', status: 'Active Growth & Organelle Duplication' };
      case 'S': return { cVal: '2C → 4C (Replicating)', nVal: '2n (2 Chromatids/Chromosome)', status: 'Semiconservative DNA Synthesis' };
      case 'G2': return { cVal: '4C (8.0 pg)', nVal: '2n (Sister Chromatids)', status: 'Spindle Protein Synthesis & Error Check' };
      case 'M': return { cVal: '4C → 2C per daughter cell', nVal: '2n Separating', status: 'Karyokinesis & Cytokinesis' };
      case 'G0': return { cVal: '2C (4.0 pg)', nVal: '2n (Differentiated)', status: 'Quiescent Non-Dividing State' };
    }
  }, [cyclePhase]);

  // ─── 2D CANVAS SIMULATION ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      particleOffset += (soluteFluxRate / 20) + 0.5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#6366f1';
      ctx.fillRect(0, canvas.height / 2 - 6, canvas.width, 12);
      ctx.fillStyle = '#a5b4fc';
      ctx.font = '10px sans-serif';
      ctx.fillText('Desmotubule (ER lumen)', 10, canvas.height / 2 + 3);

      ctx.fillStyle = '#34d399';
      for (let i = 0; i < 8; i++) {
        const xPos = ((i * 45) + particleOffset) % canvas.width;
        ctx.beginPath();
        ctx.arc(xPos, canvas.height / 2 - 16, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc((xPos + 22) % canvas.width, canvas.height / 2 + 16, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [soluteFluxRate]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      setCurrentHint(currentChallengeObj.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentChallengeObj.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeObj]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCEMENT HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the plant cell architecture lab. Let us explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Manipulate variables without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for ISC board-level challenges!');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific deduction!' : 'Observe the cell boundaries carefully.');
  }, []);

  // ─��─ COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Class 11 Cellular Architecture.');
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
    setSelectedOption(null);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── INACTIVITY AUTO-HINT ─��─
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── GENERAL ANSWER HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') {
      setSelectedOption(answer as number);
      isCorrect = answer === currentChallengeObj.correctIndex;
    } else if (currentChallengeObj.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctMapping);
    } else if (currentChallengeObj.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctOrder);
    } else if (currentChallengeObj.type === 'numeric') {
      const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numVal - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0);
    } else if (currentChallengeObj.type === 'construct') {
      isCorrect = (answer as string).trim() === currentChallengeObj.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding biological reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + currentChallengeObj.nodeId, JSON.stringify(bktStateRef.current));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the complete step-by-step biological explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + currentChallengeObj.nodeId, JSON.stringify(bktStateRef.current));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeObj, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DRAG-AND-DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeObj]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? [...prev] : (currentChallengeObj.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [currentChallengeObj]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0
      ? sortArrangement
      : (currentChallengeObj.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, currentChallengeObj, handleAnswer]);

  const handleConstructAdd = useCallback((part: string) => {
    setConstructParts(prev => [...prev, part]);
    audioManager.play('pop');
  }, []);

  const handleConstructRemove = useCallback((idx: number) => {
    setConstructParts(prev => prev.filter((_, i) => i !== idx));
    audioManager.play('pop');
  }, []);

  const handleConstructSubmit = useCallback(() => {
    handleAnswer(constructParts.join(' -> '));
  }, [constructParts, handleAnswer]);

  // ─── CLEANUP ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── TOP HEADER ─── */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-emerald-950/80 border border-emerald-700/50 rounded-2xl text-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                ISC Class 11
              </span>
            </h1>
            <p className="text-xs text-slate-400">ISC Scope: c11_bio_021 to c11_bio_030 Complete Ultrastructure</p>
          </div>
        </div>

        {/* Phase Pill / Mastery Indicator */}
        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border shadow-sm ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                : 'bg-blue-950/80 text-blue-300 border-blue-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Mastery: <span className="text-emerald-400 font-semibold">{masteryLevel}</span>
          </span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-5 md:p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl shadow-lg">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🔬 Scenario Arc</span>
            <h2 className="text-lg md:text-xl font-bold text-emerald-200 mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">{SCENARIO.context}</p>
          </div>

          {/* Curiosity Hook Card */}
          <div className="p-5 md:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">Think before we explore!</span>
            </div>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  className={`text-left p-4 rounded-xl text-sm transition-all border flex items-start gap-2 ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-850 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span className="font-bold text-emerald-400 mr-1">{String.fromCharCode(65 + idx)}.</span>
                  <span className="flex-1">{option}</span>
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-semibold flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    <span>{discoveryCorrect ? '✓' : '💡'}</span>
                    <span>{discoveryCorrect ? 'Spot on! The rigid cell wall develops turgor pressure.' : DISCOVERY_QUESTION.hintAfter}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Let us dive into the multi-layered molecular architecture to discover how it works!</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Start Interactive Lab"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40 shrink-0"
                >
                  Start Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Interactive Concept Discovery ({currentSlide + 1} of {EXPLORATION_STEPS.length})
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-emerald-500' : i < currentSlide ? 'w-4 bg-emerald-800' : 'w-4 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 md:p-6 bg-slate-900 border border-slate-800 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
              <p className="text-xs text-amber-300 font-medium mb-4 flex items-center gap-1.5">
                <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* STEP 0: Layered Cell Wall Click-Explorer */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 450 260" className="w-full max-w-md" role="img" aria-label="Interactive plant cell wall layers diagram">
                      <rect x="20" y="20" width="80" height="220" rx="8" fill="#064e3b" opacity="0.7" />
                      <text x="60" y="130" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">Cell 1 Cytoplasm</text>

                      <rect
                        x="100" y="20" width="14" height="220"
                        fill="#3b82f6"
                        opacity={activeWallLayer === 'membrane' ? 1 : 0.6}
                        onClick={() => { setActiveWallLayer('membrane'); audioManager.play('tap'); }}
                        className="cursor-pointer transition-opacity"
                        role="button"
                        aria-label="Select Plasma Membrane layer"
                      />

                      <rect
                        x="116" y="20" width="30" height="220"
                        fill="#d97706"
                        opacity={activeWallLayer === 'secondary' ? 1 : 0.6}
                        onClick={() => { setActiveWallLayer('secondary'); audioManager.play('tap'); }}
                        className="cursor-pointer transition-opacity"
                        role="button"
                        aria-label="Select Secondary Cell Wall layer"
                      />

                      <rect
                        x="148" y="20" width="28" height="220"
                        fill="#10b981"
                        opacity={activeWallLayer === 'primary' ? 1 : 0.6}
                        onClick={() => { setActiveWallLayer('primary'); audioManager.play('tap'); }}
                        className="cursor-pointer transition-opacity"
                        role="button"
                        aria-label="Select Primary Cell Wall layer"
                      />

                      <rect
                        x="178" y="20" width="22" height="220"
                        fill="#ec4899"
                        opacity={activeWallLayer === 'middle' ? 1 : 0.7}
                        onClick={() => { setActiveWallLayer('middle'); audioManager.play('tap'); }}
                        className="cursor-pointer transition-opacity"
                        role="button"
                        aria-label="Select Middle Lamella layer"
                      />
                      <line x1="189" y1="20" x2="189" y2="240" stroke="#fbcfe8" strokeDasharray="3 3" strokeWidth="2" />

                      <rect
                        x="202" y="20" width="28" height="220"
                        fill="#10b981"
                        opacity={activeWallLayer === 'primary' ? 1 : 0.6}
                        onClick={() => { setActiveWallLayer('primary'); audioManager.play('tap'); }}
                        className="cursor-pointer transition-opacity"
                        role="button"
                        aria-label="Select Primary Cell Wall layer"
                      />

                      <rect
                        x="232" y="20" width="30" height="220"
                        fill="#d97706"
                        opacity={activeWallLayer === 'secondary' ? 1 : 0.6}
                        onClick={() => { setActiveWallLayer('secondary'); audioManager.play('tap'); }}
                        className="cursor-pointer transition-opacity"
                        role="button"
                        aria-label="Select Secondary Cell Wall layer"
                      />

                      <rect
                        x="264" y="20" width="14" height="220"
                        fill="#3b82f6"
                        opacity={activeWallLayer === 'membrane' ? 1 : 0.6}
                        onClick={() => { setActiveWallLayer('membrane'); audioManager.play('tap'); }}
                        className="cursor-pointer transition-opacity"
                        role="button"
                        aria-label="Select Plasma Membrane layer"
                      />

                      <rect x="280" y="20" width="80" height="220" rx="8" fill="#064e3b" opacity="0.7" />
                      <text x="320" y="130" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">Cell 2 Cytoplasm</text>

                      <rect x="98" y="95" width="182" height="40" fill="#0f172a" rx="4" />
                      <rect x="98" y="112" width="182" height="6" fill="#818cf8" />
                      <text x="189" y="108" textAnchor="middle" fill="#c7d2fe" fontSize="8">Plasmodesma Channel</text>
                    </svg>
                    <span className="text-[11px] text-slate-400 mt-2">Click any colored band above to inspect its ultrastructure</span>
                  </div>

                  <div className="lg:col-span-5 p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{
                        backgroundColor:
                          activeWallLayer === 'middle' ? '#ec4899' :
                          activeWallLayer === 'primary' ? '#10b981' :
                          activeWallLayer === 'secondary' ? '#d97706' : '#3b82f6'
                      }} />
                      <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                        {activeWallLayer === 'middle' && '1. Middle Lamella (Outermost Glue)'}
                        {activeWallLayer === 'primary' && '2. Primary Cell Wall (Growing Wall)'}
                        {activeWallLayer === 'secondary' && '3. Secondary Cell Wall (Inner Rigid)'}
                        {activeWallLayer === 'membrane' && '4. Plasma Membrane (Living Boundary)'}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeWallLayer === 'middle' && 'Cementing layer derived from cell plate during cytokinesis. Rich in calcium and magnesium pectates. Ripening fruit softens as pectinase dissolves this layer.'}
                      {activeWallLayer === 'primary' && 'Thin, flexible, extensible layer laid down in young dividing cells. Composed of cellulose microfibrils embedded in hemicellulose, pectin, and extensin glycoproteins.'}
                      {activeWallLayer === 'secondary' && 'Deposited INNER to the primary wall in mature non-elongating cells (tracheids, sclerenchyma). Impregnated with lignin for compressive strength and waterproofing.'}
                      {activeWallLayer === 'membrane' && 'Living, selectively permeable phospholipid bilayer with embedded integral/peripheral proteins. Sits immediately inside the secondary/primary wall.'}
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-300">
                      <strong>ISC Exam Key:</strong> Sequence from outside in is: <em>Middle Lamella → Primary Wall → Secondary Wall → Plasma Membrane</em>.
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: Plasmodesmata Symplast Stream */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <canvas ref={canvasRef} width={450} height={90} className="w-full max-w-lg rounded-lg border border-slate-800" />
                    <div className="w-full max-w-lg mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>Low Solute Flux</span>
                      <span className="text-emerald-400 font-bold">Flow: {soluteFluxRate}%</span>
                      <span>High Symplastic Flux</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={soluteFluxRate}
                      aria-label="Solute Flux Rate slider"
                      onChange={(e) => setSoluteFluxRate(Number(e.target.value))}
                      className="w-full max-w-lg mt-1 accent-emerald-500"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-1">
                    <p><strong>Desmotubule Anatomy:</strong> A continuous tubule of modified Endoplasmic Reticulum (ER) passes through the plasmodesma neck, connecting adjacent cell ER lumina.</p>
                    <p className="text-emerald-300"><strong>Symplast vs Apoplast:</strong> Water and solutes passing through plasmodesmata move through the living <em>symplast</em> without having to cross two separate plasma membranes!</p>
                  </div>
                </div>
              )}

              {/* STEP 2: Osmotic Turgor & Wall Resistance */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-emerald-950/40 border border-emerald-700/60 rounded-xl">
                      <p className="text-xs font-bold text-emerald-300 uppercase mb-2">Predict Before Testing:</p>
                      <p className="text-xs text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction choice ${i + 1}: ${opt}`}
                            className="text-left p-2.5 rounded-lg text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="md:col-span-6 flex flex-col items-center">
                      <svg viewBox="0 0 240 180" className="w-48 h-36" role="img" aria-label="Osmotic turgor and plasmolysis diagram">
                        <rect x="20" y="15" width="200" height="150" rx="12" fill="none" stroke="#10b981" strokeWidth="8" />
                        <motion.rect
                          x={20 + turgorState.membraneOffset}
                          y={15 + turgorState.membraneOffset}
                          width={200 - turgorState.membraneOffset * 2}
                          height={150 - turgorState.membraneOffset * 2}
                          rx={8}
                          fill="#065f46"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          animate={{ scale: turgorState.cellScale }}
                          transition={{ type: 'spring', damping: 15 }}
                        />
                        <motion.ellipse
                          cx="120"
                          cy="90"
                          rx={50 - turgorState.membraneOffset * 1.2}
                          ry={35 - turgorState.membraneOffset * 0.8}
                          fill="#38bdf8"
                          opacity="0.6"
                        />
                        <text x="120" y="93" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Vacuole</text>
                      </svg>
                      <span className="text-xs font-bold mt-1" style={{ color: turgorState.color }}>
                        {turgorState.label}
                      </span>
                    </div>

                    <div className="md:col-span-6 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Hypertonic (Plasmolysis)</span>
                          <span className="text-emerald-400 font-bold">{tonicityValue > 0 ? `+${tonicityValue}% Hypotonic` : `${tonicityValue}%`}</span>
                          <span>Hypotonic (Turgor)</span>
                        </div>
                        <input
                          type="range"
                          min={-50}
                          max={50}
                          value={tonicityValue}
                          aria-label="External tonicity slider"
                          onChange={(e) => setTonicityValue(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      {tonicityValue > 25 && !observationAnswered && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                          <p className="text-xs text-emerald-300 font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                          <div className="space-y-1.5">
                            {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => handleObservation(i)}
                                aria-label={`Observation option ${i + 1}: ${opt}`}
                                className="block w-full text-left p-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Enzyme Active Site & Factors */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Temperature: {enzymeTemp}°C</span>
                          <span className={enzymeTemp > 60 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                            {enzymeTemp > 55 ? 'Thermal Denaturation' : enzymeTemp < 15 ? 'Inactivated by Cold' : 'Active Range'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={90}
                          value={enzymeTemp}
                          aria-label="Enzyme reaction temperature"
                          onChange={(e) => setEnzymeTemp(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>pH Level: {enzymePH.toFixed(1)}</span>
                          <span className="text-blue-400 font-bold">
                            {enzymePH < 4 ? 'Acidic Inactivation' : enzymePH > 10 ? 'Alkaline Inactivation' : 'Optimum Neutral'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={14}
                          step={0.1}
                          value={enzymePH}
                          aria-label="Enzyme reaction pH level"
                          onChange={(e) => setEnzymePH(Number(e.target.value))}
                          className="w-full accent-blue-500"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        {(['none', 'competitive', 'noncompetitive'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => { setHasInhibitor(mode); audioManager.play('tap'); }}
                            aria-label={`Set inhibitor mode: ${mode}`}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-xs capitalize border transition-all ${
                              hasInhibitor === mode
                                ? 'bg-indigo-950 border-indigo-500 text-indigo-200 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                            }`}
                          >
                            {mode === 'none' ? 'No Inhibitor' : mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <div className="text-center mb-2">
                        <span className="text-xs text-slate-400">Catalytic Rate (V)</span>
                        <div className="text-2xl font-black text-emerald-400">{enzymeActivityRate} μmol/min</div>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden" aria-hidden="true">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          animate={{ width: `${enzymeActivityRate}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-3 text-center">
                        {hasInhibitor === 'competitive' && 'Competitive inhibitor increases apparent Km without lowering Vmax.'}
                        {hasInhibitor === 'noncompetitive' && 'Non-competitive allosteric inhibitor reduces Vmax.'}
                        {hasInhibitor === 'none' && 'Uninhibited bell-shaped catalytic response.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Cell Cycle DNA C-Value Scrubber */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {(['G1', 'S', 'G2', 'M', 'G0'] as const).map((phaseId) => (
                        <motion.button
                          key={phaseId}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setCyclePhase(phaseId); audioManager.play('tap'); }}
                          aria-label={`Select cell cycle phase ${phaseId}`}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            cyclePhase === phaseId
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/60'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-855'
                          }`}
                        >
                          {phaseId === 'G0' ? 'G0 (Quiescent)' : `${phaseId} Phase`}
                        </motion.button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block">DNA Content (C-Value)</span>
                        <span className="text-sm font-bold text-emerald-400">{dnaCValue.cVal}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block">Ploidy / Morphology</span>
                        <span className="text-sm font-bold text-blue-400">{dnaCValue.nVal}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block">Primary Event</span>
                        <span className="text-xs font-semibold text-amber-300">{dnaCValue.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Slide Navigation */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('pop'); }}
              disabled={currentSlide === 0}
              aria-label="Previous Exploration Step"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold rounded-xl"
            >
              ← Previous Step
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('whoosh'); }}
                aria-label="Next Exploration Step"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Next Step →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Free Sandbox Mode"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-900/40"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">🔬 Free Exploration Sandbox</span>
              <h3 className="text-base font-bold text-white mt-1">Multi-Variable Cell Simulation Playground</h3>
              <p className="text-xs text-slate-400 mt-1">Manipulate wall lignification, tonicity, and enzyme parameters simultaneously without grading.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Proceed to graded challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50 shrink-0"
            >
              I Am Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sandbox Panel 1: Osmotic Wall Simulation */}
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-300 uppercase">Turgor vs Plasmolysis Engine</h4>
              <div className="flex justify-between text-xs text-slate-400">
                <span>External Tonicity</span>
                <span className="text-emerald-400 font-semibold">{tonicityValue > 0 ? `+${tonicityValue}%` : `${tonicityValue}%`}</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={tonicityValue}
                aria-label="Sandbox external tonicity slider"
                onChange={(e) => setTonicityValue(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="p-3 bg-slate-950 rounded-xl text-xs flex items-center justify-between">
                <span className="text-slate-400">Protoplast State:</span>
                <span className="font-bold" style={{ color: turgorState.color }}>{turgorState.label}</span>
              </div>
            </div>

            {/* Sandbox Panel 2: Enzyme Catalysis Engine */}
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-indigo-300 uppercase">Catalytic Kinetics Simulator</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-slate-400">Temp: {enzymeTemp}°C</span>
                  <input
                    type="range"
                    min={0}
                    max={90}
                    value={enzymeTemp}
                    aria-label="Sandbox enzyme temperature"
                    onChange={(e) => setEnzymeTemp(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">pH: {enzymePH.toFixed(1)}</span>
                  <input
                    type="range"
                    min={1}
                    max={14}
                    step={0.2}
                    value={enzymePH}
                    aria-label="Sandbox enzyme pH"
                    onChange={(e) => setEnzymePH(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl text-xs flex justify-between items-center">
                <span className="text-slate-400">Reaction Velocity:</span>
                <span className="text-indigo-300 font-bold text-sm">{enzymeActivityRate} μmol/min</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE (Adaptive BKT) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  Competency: {currentChallengeObj.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mt-1">Topic: {currentChallengeObj.nodeId}</h3>
            </div>

            <div className="w-full sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-5 md:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <p className="text-base font-semibold text-white leading-relaxed">{currentChallengeObj.question}</p>

            {/* MCQ / Classify / Match Types */}
            {(currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') && currentChallengeObj.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {currentChallengeObj.options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = i === currentChallengeObj.correctIndex;
                  const isWrongSelected = isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake && isWrongSelected ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`text-left p-4 rounded-xl text-sm transition-all border flex items-start justify-between gap-2 ${
                        isWrongSelected || (wrongFlash && isSelected)
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && isCorrect
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/60'
                          : 'bg-slate-850 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && isCorrect && (
                        <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
                      )}
                      {isWrongSelected && (
                        <span className="text-rose-400 font-bold" aria-hidden="true">✗</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Drag-Label Diagram Type */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-900/80 border border-indigo-600 text-indigo-200 text-xs font-bold rounded-lg cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'zone_middle', title: 'Center Cementing Layer' },
                    { id: 'zone_primary', title: 'Outer Flexible Wall' },
                    { id: 'zone_desmo', title: 'Core Tubular ER Canal' },
                    { id: 'zone_membrane', title: 'Inner Living Bilayer' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      role="region"
                      aria-label={`Drop target for ${target.title}`}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-colors ${
                        droppedLabels[target.id]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                          : 'border-slate-700 bg-slate-950 text-slate-500 hover:border-slate-500'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-semibold mb-1 text-center">{target.title}</span>
                      <span className="text-xs font-bold text-center flex items-center gap-1">
                        {droppedLabels[target.id] ? (
                          <>
                            <span className="text-emerald-400">✓</span>
                            <span>{droppedLabels[target.id]}</span>
                          </>
                        ) : (
                          'Drop Here'
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Placements"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Placements ✓
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Sequence Type */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag or rearrange items into sequential order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeObj.sortItems.length
                    ? sortArrangement.map(idx => currentChallengeObj.sortItems![idx])
                    : currentChallengeObj.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Position ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      className="p-3.5 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 flex items-center justify-between cursor-grab"
                    >
                      <span>
                        <strong className="text-emerald-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Confirm Order"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Confirm Order ✓
                </motion.button>
              </div>
            )}

            {/* Numeric Input Type */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step={0.1}
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  aria-label="Numeric answer input"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-sm text-slate-400 font-semibold">{currentChallengeObj.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Submit numeric value"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* Construct Pathway Type */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructAdd(part)}
                      aria-label={`Add component ${part}`}
                      className="px-3 py-1.5 bg-indigo-950 border border-indigo-700 text-indigo-300 text-xs font-semibold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 min-h-[70px]">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Assembled Secretory Chain:</span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <React.Fragment key={i}>
                        <div className="px-3 py-1 bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs rounded-lg flex items-center gap-2">
                          <span>{part}</span>
                          <button
                            onClick={() => handleConstructRemove(i)}
                            aria-label={`Remove component ${part}`}
                            className="text-rose-400 font-bold hover:text-rose-300"
                          >
                            ✕
                          </button>
                        </div>
                        {i < constructParts.length - 1 && <span className="text-emerald-500 font-bold" aria-hidden="true">→</span>}
                      </React.Fragment>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600">Click elements above in sequential order</span>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConstructSubmit}
                  disabled={constructParts.length === 0 || showExplanation}
                  aria-label="Verify Secretory Pathway"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Secretory Pathway ✓
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-800/80 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <span aria-hidden="true">💡</span>
                  <span>ISC Master Explanation:</span>
                </div>

                <div className="space-y-2">
                  {currentChallengeObj.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-300 leading-relaxed"
                      >
                        <strong className="text-emerald-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next explanation detail"
                      className="px-4 py-1.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700 text-emerald-200 text-xs font-semibold rounded-lg"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge or finish"
                      className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-900/50"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation & View Score ���' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 md:p-8 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-800 rounded-3xl text-center space-y-3">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">ISC Biology Mastery Attained!</h2>
            <p className="text-sm text-slate-300">
              Final Precision Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong> ({scoreBreakdown.correct}/{scoreBreakdown.total} Correct)
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              Assessed Knowledge State: {masteryLevel.toUpperCase()}
            </div>
          </div>

          {/* Performance Assessment */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Performance Assessment</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {errors === 0
                ? '🌟 Flawless Mastery! You possess deep architectural understanding of plant cell walls, plasmodesmatal transport, and macromolecular kinetics required for full marks in ISC Board examinations.'
                : errors <= 3
                ? '👏 Strong Performance! You have solid command of the endomembrane system and wall layers. Revisit the few tricky enzyme and chromosome questions below to achieve a 100% benchmark.'
                : '🌱 Good Effort! Cellular biology has intricate terminology (middle lamella vs primary wall, axoneme 9+2 vs centriole 9+0). Review the personalized misconception profile below and re-test!'}
            </p>
          </div>

          {/* Targeted Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Diagnostic ({hitMisconceptions.length} gaps detected)
              </h4>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/90 rounded-xl border border-rose-900/50 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">✗ Trap: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-indigo-950/40 border border-indigo-800/60 rounded-2xl text-xs text-slate-300 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">📅 Spaced Repetition Review Schedule</h4>
            <p>
              Based on the SuperMemo-2 (SM-2) memory consolidation curve, schedule your next rapid revision in{' '}
              <strong className="text-indigo-300 font-bold">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</strong>.
            </p>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-5 md:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">☕ Real-World Botany Application</span>
            <h3 className="text-sm font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <strong className="text-amber-400 font-bold mr-1">{i + 1}.</strong> {step}
                </div>
              ))}
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-5 md:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🧠</span> Deep Reflection & Synthesis
            </span>
            <h3 className="text-sm font-bold text-white">Consolidate Your Cellular Biophysics Mental Models</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  1. What was the most surprising thing you learned about plant cell envelopes or plasmodesmata?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="Reflect on desmotubules, middle lamella calcium pectate, or turgor pressure..."
                  aria-label="Reflection on most surprising insight"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  2. How would you explain why plant cells don't burst in distilled water to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.explanation}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, explanation: e.target.value }))}
                  placeholder="Explain using the wooden-box vs soft-balloon analogy and wall pressure..."
                  aria-label="Reflection on explaining cell wall pressure to a friend"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  3. Where in real life might you use this understanding of enzyme kinetics and cell architecture?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="E.g., food preservation, agricultural ripening, tea leaf manufacturing, pharmacology..."
                  aria-label="Reflection on real world practical application"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ISC Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiologyCellWallPlasmodesmataSim;