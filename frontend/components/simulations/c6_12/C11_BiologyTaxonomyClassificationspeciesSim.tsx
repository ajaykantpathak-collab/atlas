'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 11 Biology: Diversity of Living Organisms) ───
const NODE_C11_BIO_001 = 'c11_bio_001'; // Taxonomy & Classification
const NODE_C11_BIO_002 = 'c11_bio_002'; // Three Domains & Five Kingdoms
const NODE_C11_BIO_003 = 'c11_bio_003'; // Kingdom Monera (Bacteria)
const NODE_C11_BIO_004 = 'c11_bio_004'; // Kingdom Protista (Subgroups)
const NODE_C11_BIO_005 = 'c11_bio_005'; // Kingdom Fungi (Classes & Reproduction)
const NODE_C11_BIO_006 = 'c11_bio_006'; // Viruses, Viroids & Prions
const NODE_C11_BIO_007 = 'c11_bio_007'; // Plant Kingdom: Algae
const NODE_C11_BIO_008 = 'c11_bio_008'; // Plant Kingdom: Bryophyta
const NODE_C11_BIO_009 = 'c11_bio_009'; // Plant Kingdom: Pteridophyta
const NODE_C11_BIO_010 = 'c11_bio_010'; // Plant Kingdom: Gymnosperms

const ALL_BIO_NODE_IDS = [
  NODE_C11_BIO_001,
  NODE_C11_BIO_002,
  NODE_C11_BIO_003,
  NODE_C11_BIO_004,
  NODE_C11_BIO_005,
  NODE_C11_BIO_006,
  NODE_C11_BIO_007,
  NODE_C11_BIO_008,
  NODE_C11_BIO_009,
  NODE_C11_BIO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Silent Valley Expedition: Unravelling Biological Diversity',
  intro:
    'You are leading an elite botanical & microbiological expedition in the pristine rainforests of Silent Valley, Kerala, and the alpine slopes of the Western Himalayas. Your team has collected mysterious specimens ranging from microscopic acellular pathogens, bioluminescent microbes, and deep-forest fungi, to the evolutionary stepping stones of the plant kingdom.',
  context:
    'To catalogue these organisms for global science and conservation under ICSE/ISC taxonomy frameworks, you must examine their cellular architecture, wall chemistry, reproductive dikaryophases, and vascular evolution.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Deep in a moist mountain gorge, you discover an organism that is multicellular, green, and anchors itself with thread-like rhizoids, yet completely lacks xylem and phloem pipelines. What critical barrier does this plant face on land?',
  options: [
    'It cannot perform photosynthesis without true roots',
    'It cannot grow tall and requires a film of surface water for swimming male sperms to fertilise',
    'It produces seeds that dry out immediately without an ovary wall',
    'It belongs to Kingdom Monera because it has no true organs',
  ],
  correctIndex: 1,
  hintAfter:
    "Don't worry! This is the classic dilemma of the 'amphibians of the plant kingdom' (Bryophytes). Let's dive in and explore the full evolutionary tree!",
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

// ─── 22 CHALLENGES ACROSS 10 NODES (FOUNDATION, STANDARD, ADVANCED) ───
const CHALLENGES: Challenge[] = [
  // 1. Hierarchy & Nomenclature (c11_bio_001) - Foundation (Recall)
  {
    id: 'ch_bio_001',
    nodeId: NODE_C11_BIO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following represents the correct format for the scientific name of the Indian Mango under binomial nomenclature?',
    options: ['mangifera Indica', 'Mangifera indica', 'Mangifera Indica', 'mangifera indica'],
    correctIndex: 1,
    explanation:
      'Binomial nomenclature rules dictate that the genus name begins with a capital letter, the specific epithet is entirely in lower case, and both words are italicised in print or underlined when handwritten: Mangifera indica.',
    hints: [
      'Look at the capitalisation of both the genus and the species epithet.',
      'Only the generic name starts with a capital letter; the species name must be strictly lowercase.',
      'The genus is "Mangifera" (capital M) and the species is "indica" (small i).',
    ],
    misconceptionIndex: 0,
  },
  // 2. Drag-Sort Taxonomic Hierarchy (c11_bio_001) - Foundation (Understanding)
  {
    id: 'ch_bio_002',
    nodeId: NODE_C11_BIO_001,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the taxonomic ranks of modern classification in descending order from most inclusive to most specific.',
    sortItems: ['Kingdom', 'Phylum / Division', 'Class', 'Order', 'Family', 'Genus', 'Species'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    explanation:
      'The Linnaean hierarchy descends systematically: Kingdom → Phylum/Division → Class → Order → Family → Genus → Species. Each step becomes progressively more exclusive.',
    hints: [
      'Remember the mnemonic: King Philip Came Over For Good Soup.',
      'Kingdom is the broadest category at the very top; Species is the basic, most specific reproductive unit.',
      'Order comes between Class and Family; Genus precedes Species.',
    ],
  },
  // 3. Three Domains & Monera (c11_bio_002) - Standard (Analysis)
  {
    id: 'ch_bio_003',
    nodeId: NODE_C11_BIO_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Microbes from Sambhar Salt Lake thrive in saturated brine, while E. coli from the Ganges thrives in neutral water. Why did Carl Woese separate Archaea from Bacteria into distinct domains?',
    options: [
      'Archaea are eukaryotic with membrane-bound nuclei, whereas Bacteria are prokaryotic.',
      'Archaea possess distinct ribosomal RNA sequences, ether-linked branched membrane lipids, and lack peptidoglycan cell walls.',
      'Bacteria reproduce sexually by meiosis while Archaea reproduce purely by binary fission.',
      'Archaea are multicellular autotrophs while Bacteria are unicellular heterotrophs.',
    ],
    correctIndex: 1,
    explanation:
      'Archaea differ fundamentally from true Bacteria in their 16S rRNA sequences, membrane lipid biochemistry (branched ether lipids instead of ester-linked fatty acids), and unique cell-wall chemistry lacking peptidoglycan.',
    hints: [
      'Think about molecular differences at the rRNA and membrane lipid level.',
      'Both domains are prokaryotic, but Archaea lack peptidoglycan in their walls and have ether-linked lipids.',
      'Archaea have unique cell-wall polymers and distinct rRNA that justify a separate domain from Bacteria.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Gram Staining Mechanism (c11_bio_003) - Standard (Understanding)
  {
    id: 'ch_bio_004',
    nodeId: NODE_C11_BIO_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'During Gram staining of a bacterial smear from Punjab soil, why do Gram-positive cells retain the deep crystal-violet iodine complex while Gram-negative cells decolourise and turn pink with safranin?',
    options: [
      'Gram-positive cells have a thick peptidoglycan mesh that traps the complex; Gram-negative cells have a thin peptidoglycan layer and an outer lipid membrane that dissolves in alcohol.',
      'Gram-positive cells possess a thick cellulose wall while Gram-negative cells possess chitin.',
      'Gram-negative cells contain chlorophyll that destroys the violet crystal dye.',
      'Gram-positive cells have no cell wall at all, allowing dye to enter the cytoplasm directly.',
    ],
    correctIndex: 0,
    explanation:
      'Gram-positive bacteria have a thick, multilayered peptidoglycan wall that dehydrates and contracts during alcohol wash, trapping the crystal-violet-iodine complex. Gram-negative bacteria have a thin peptidoglycan layer and an outer lipopolysaccharide membrane that dissolves in alcohol, allowing the dye to wash out and absorb pink safranin.',
    hints: [
      'Focus on the thickness of peptidoglycan and presence of the outer lipopolysaccharide membrane.',
      'Alcohol dissolves the lipid-rich outer membrane of Gram-negative bacteria.',
      'Thick peptidoglycan holds the purple dye; thin peptidoglycan loses it and takes up the counterstain.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Drag-Label Bacteriophage Anatomy (c11_bio_006) - Standard (Understanding)
  {
    id: 'ch_bio_005',
    nodeId: NODE_C11_BIO_006,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the correct anatomical labels to their positions on the bacteriophage structural model.',
    dragItems: [
      { label: 'Icosahedral Head (DNA Core)', targetId: 'part_head' },
      { label: 'Contractile Sheath / Tail', targetId: 'part_sheath' },
      { label: 'Base Plate', targetId: 'part_plate' },
      { label: 'Tail Fibres (Receptor Pins)', targetId: 'part_fibres' },
    ],
    correctMapping: {
      part_head: 'Icosahedral Head (DNA Core)',
      part_sheath: 'Contractile Sheath / Tail',
      part_plate: 'Base Plate',
      part_fibres: 'Tail Fibres (Receptor Pins)',
    },
    explanation:
      'A T4 bacteriophage is a tadpole-like virion: the icosahedral capsid head contains double-stranded DNA, the helical tail sheath contracts during infection, the base plate aligns with the host, and tail fibres recognise specific bacterial surface receptors.',
    hints: [
      'The genetic payload (DNA) is stored at the top inside the head.',
      'The cylindrical shaft connecting head to base is the tail sheath.',
      'The landing legs that contact the bacterium are tail fibres attached to the base plate.',
    ],
  },
  // 6. Protista Subgroups (c11_bio_004) - Foundation (Recall)
  {
    id: 'ch_bio_006',
    nodeId: NODE_C11_BIO_004,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which subgroup of Kingdom Protista is known for silica-embedded two-part indestructible shells (frustules) that accumulate as diatomaceous earth on the ocean bed?',
    options: ['Chrysophytes (Diatoms)', 'Dinoflagellates', 'Euglenoids', 'Protozoan Sporozoans'],
    correctIndex: 0,
    explanation:
      'Chrysophytes, particularly diatoms, possess cell walls embedded with silica that form overlapping halves like a soap box or petri dish (frustules). Their indestructible siliceous deposits over millions of years form diatomaceous earth.',
    hints: [
      'These organisms are also called golden-brown algae with glass-like walls.',
      'Their two-part shell fits together like a petri dish with a lid.',
      'The answer is Chrysophytes (Diatoms).',
    ],
  },
  // 7. Euglena Mixotrophy (c11_bio_004) - Standard (Application)
  {
    id: 'ch_bio_007',
    nodeId: NODE_C11_BIO_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A biology student in Kerala keeps a culture of Euglena in complete darkness for a week. The culture survives by absorbing dissolved organic compounds. Why is Euglena classified as mixotrophic rather than strictly a plant or animal?',
    options: [
      'It mutates into a bacterium when sunlight is removed',
      'It contains chloroplasts for autotrophy in light, but shifts to saprotrophic/heterotrophic absorption in darkness using its flexible proteinaceous pellicle',
      'It has a rigid cellulose cell wall that can digest starch in the dark',
      'It produces spores that hatch only in dark conditions',
    ],
    correctIndex: 1,
    explanation:
      'Euglenoids lack a cellulose wall and possess a flexible protein pellicle. In the presence of sunlight, they carry out photosynthesis with chlorophyll a & b; when deprived of light, they ingest or absorb organic matter heterotrophically (mixotrophic nutrition).',
    hints: [
      'Think about the dual nutritional capability of Euglena.',
      'Mixotrophic means combining photoautotrophy in light with heterotrophy in darkness.',
      'Euglena uses its chloroplasts in light and its flexible pellicle to absorb nutrients in the dark.',
    ],
    misconceptionIndex: 3,
  },
  // 8. Fungal Sexual Reproduction Sequence (c11_bio_005) - Advanced (Analysis)
  {
    id: 'ch_bio_008',
    nodeId: NODE_C11_BIO_005,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the chronological stages of sexual reproduction in higher fungi (Ascomycetes & Basidiomycetes).',
    sortItems: [
      'Plasmogamy (Cytoplasmic fusion of compatible hyphae)',
      'Dikaryophase (n + n dikaryon coexistence in hyphae)',
      'Karyogamy (Fusion of haploid nuclei to form 2n zygote nucleus)',
      'Meiosis (Reduction division producing haploid spores)',
      'Ascospore / Basidiospore germination into haploid mycelium',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'Fungal sexual reproduction follows an exact sequence: Plasmogamy brings cytoplasm together without immediate nuclear fusion, creating an extended dikaryotic phase (n+n). Karyogamy then fuses nuclei into a diploid (2n) state, followed promptly by Meiosis generating genetically varied haploid spores.',
    hints: [
      'Cytoplasm fuses first, but nuclear fusion is delayed in higher fungi.',
      'The dikaryon (n+n) stage exists between plasmogamy and karyogamy.',
      'Meiosis occurs right after karyogamy to restore the haploid condition.',
    ],
    misconceptionIndex: 4,
  },
  // 9. Fungal Classes & Indian Diseases (c11_bio_005) - Standard (Application)
  {
    id: 'ch_bio_009',
    nodeId: NODE_C11_BIO_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A farmer in Ludhiana, Punjab, observes rust pustules on wheat leaves (Puccinia graminis) and edible umbrella-shaped mushrooms (Agaricus) on compost. Which class of fungi do both Puccinia and Agaricus belong to?',
    options: ['Zygomycetes (Bread moulds)', 'Ascomycetes (Sac fungi)', 'Basidiomycetes (Club fungi)', 'Deuteromycetes (Fungi imperfecti)'],
    correctIndex: 2,
    explanation:
      'Both Puccinia (wheat rust) and Agaricus (field mushroom) belong to Basidiomycetes (club fungi). They produce basidiospores exogenously on club-shaped microscopic basidia following plasmogamy and karyogamy.',
    hints: [
      'Think of club-shaped spore-bearing structures called basidia.',
      'Rusts, smuts, and bracket mushrooms belong to this major fungal class.',
      'The class is Basidiomycetes.',
    ],
  },
  // 10. Viruses vs Viroids vs Prions (c11_bio_006) - Foundation (Recall)
  {
    id: 'ch_bio_010',
    nodeId: NODE_C11_BIO_006,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Potato Spindle Tuber disease is caused by PSTVd, while Mad Cow Disease (BSE) and CJD are caused by infectious protein agents. How do Viroids differ fundamentally from Prions?',
    options: [
      'Viroids consist of naked circular single-stranded RNA (no protein capsid), while Prions consist solely of misfolded infectious proteins (no nucleic acid).',
      'Viroids have a double-stranded DNA genome with a thick capsid; Prions are bacterial spores.',
      'Viroids contain only lipids; Prions are infectious carbohydrate rings.',
      'Viroids infect animals only; Prions infect exclusively gymnosperm cones.',
    ],
    correctIndex: 0,
    explanation:
      'Viroids (discovered by T.O. Diener) are free, low-molecular-weight circular RNA molecules without any protein coat. Prions (discovered by Stanley Prusiner) are abnormally folded infectious proteins devoid of any genetic material (neither RNA nor DNA).',
    hints: [
      'Viroids have nucleic acid (RNA) but lack a protein coat.',
      'Prions are purely proteinaceous particles with zero nucleic acids.',
      'Option A cleanly distinguishes RNA-only viroids from protein-only prions.',
    ],
  },
  // 11. Algae Pigments & Storage (c11_bio_007) - Standard (Understanding)
  {
    id: 'ch_bio_011',
    nodeId: NODE_C11_BIO_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Which algal class possesses the accessory pigment r-phycoerythrin (allowing blue-green light absorption at deep ocean depths), stores food as floridean starch, and completely lacks flagellated stages?',
    options: ['Chlorophyceae (Green Algae)', 'Phaeophyceae (Brown Algae)', 'Rhodophyceae (Red Algae)', 'Bacillariophyceae (Diatoms)'],
    correctIndex: 2,
    explanation:
      'Rhodophyceae (Red Algae, e.g., Gelidium, Gracilaria, Porphyra) contain phycoerythrin, store carbohydrates as floridean starch (structurally similar to amylopectin and glycogen), have cellulose cell walls with sulfated polysaccharides, and never produce flagella.',
    hints: [
      'Look for the pigment name starting with "phycoerythrin" (erythro = red).',
      'Floridean starch and total absence of flagellated cells are diagnostic.',
      'The group is Rhodophyceae (Red Algae).',
    ],
  },
  // 12. Algal Hydrocolloids & Economic Value (c11_bio_007) - Standard (Application)
  {
    id: 'ch_bio_012',
    nodeId: NODE_C11_BIO_007,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Agar-agar used in Indian microbiology labs and dessert jellies is commercially extracted from Gelidium and Gracilaria. What class of algae are these, and what hydrocolloid is extracted from brown kelps (Laminaria)?',
    options: [
      'Red Algae (Gelidium gives Agar-agar); Brown Algae yields Algin',
      'Green Algae (Gelidium gives Pectin); Red Algae yields Carrageenan',
      'Brown Algae (Gelidium gives Mannitol); Green Algae yields Starch',
      'Cyanobacteria (Gelidium gives Peptidoglycan); Diatoms yield Silica',
    ],
    correctIndex: 0,
    explanation:
      'Gelidium and Gracilaria are Rhodophyceae (Red Algae) yielding Agar-agar. Brown algae (Phaeophyceae such as Laminaria and Fucus) produce algin, an emulsifying hydrocolloid used in ice creams, pharmaceuticals, and dentistry.',
    hints: [
      'Gelidium is a red alga yielding agar.',
      'Brown algae cell walls contain alginic acid / algin.',
      'Option A pairs Red Algae (Agar) with Brown Algae (Algin).',
    ],
  },
  // 13. Bryophytes as Amphibians of Plant Kingdom (c11_bio_008) - Foundation (Understanding)
  {
    id: 'ch_bio_008_a',
    nodeId: NODE_C11_BIO_008,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why are Bryophytes (such as mosses like Funaria and liverworts like Marchantia) scientifically described as the "Amphibians of the Plant Kingdom"?',
    options: [
      'They live half their year submerged underwater as fish food and half on land',
      'They grow on damp soil/rocks on land, but strictly require a film of external water for flagellated antherozoids (sperm) to swim and fertilise the egg in the archegonium',
      'They breathe through gills during juvenile stages and lungs when adult',
      'They have dual cardiovascular circulation like frogs',
    ],
    correctIndex: 1,
    explanation:
      'Bryophytes are terrestrial plants that lack vascular tissue and roots, but their flagellated male gametes (biflagellate antherozoids) must swim through surface water films to reach the non-motile egg inside the flask-shaped archegonium.',
    hints: [
      'Think about why frogs are amphibians: they live on land but must return to water to breed.',
      'Bryophytes live on land but need water for male gametes to swim.',
      'Fertilisation depends on water films on leaves and thalli.',
    ],
  },
  // 14. Drag-Label Funaria Life Cycle (c11_bio_008) - Advanced (Analysis)
  {
    id: 'ch_bio_014',
    nodeId: NODE_C11_BIO_008,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Drag the correct life-cycle structures of the moss Funaria to their respective positions.',
    dragItems: [
      { label: 'Leafy Gametophore (Dominant n plant)', targetId: 'part_gametophyte' },
      { label: 'Seta & Capsule (Dependent 2n Sporophyte)', targetId: 'part_sporophyte' },
      { label: 'Unicellular/Multicellular Rhizoids', targetId: 'part_rhizoids' },
      { label: 'Green Filamentous Protonema', targetId: 'part_protonema' },
    ],
    correctMapping: {
      part_gametophyte: 'Leafy Gametophore (Dominant n plant)',
      part_sporophyte: 'Seta & Capsule (Dependent 2n Sporophyte)',
      part_rhizoids: 'Unicellular/Multicellular Rhizoids',
      part_protonema: 'Green Filamentous Protonema',
    },
    explanation:
      'In Funaria, the haploid spore germinates into a creeping green juvenile protonema that buds into the dominant, photosynthetic leafy gametophore anchored by rhizoids. The diploid sporophyte (foot, seta, capsule) remains permanently attached to and nutritionally dependent on the gametophyte.',
    hints: [
      'The leafy green carpet you see is the dominant haploid gametophyte.',
      'The brown stalk and capsule on top is the dependent sporophyte.',
      'The early creeping filament germinated from a spore is the protonema.',
    ],
  },
  // 15. First Vascular Plants: Pteridophyta (c11_bio_009) - Foundation (Recall)
  {
    id: 'ch_bio_015',
    nodeId: NODE_C11_BIO_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which major structural innovation first evolved in Pteridophytes (ferns and horsetails), enabling them to grow taller than bryophytes while remaining seedless spore-producers?',
    options: [
      'True vascular tissues (Xylem with tracheids and Phloem for conduction)',
      'Flowers with brightly coloured petals',
      'True double fertilisation forming triploid endosperm',
      'Secondary wood with vessels and covered seeds inside a carpel',
    ],
    correctIndex: 0,
    explanation:
      'Pteridophytes are the earliest vascular cryptogams (tracheophytes). The presence of lignified xylem (conducting water & minerals) and phloem (translocating photosynthate) allowed upright mechanical support and vertical growth.',
    hints: [
      'Think about internal cellular plumbing for water and food.',
      'Xylem and phloem are the defining vascular tissues.',
      'Pteridophytes are the first true vascular land plants.',
    ],
  },
  // 16. Heterospory in Selaginella (c11_bio_009) - Advanced (Evaluation)
  {
    id: 'ch_bio_016',
    nodeId: NODE_C11_BIO_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Why is heterospory in Pteridophytes like Selaginella considered one of the greatest milestones leading to the evolution of the seed habit?',
    options: [
      'Because heterospory allows plants to produce nectar to attract insect pollinators',
      'Because small microspores produce male gametophytes, while large megaspores develop into female gametophytes retained inside the parent sporangium, providing maternal nutrition to the embryo',
      'Because heterospory eliminates the need for chromosomes during meiosis',
      'Because it converts vascular tracheids into true xylem vessels',
    ],
    correctIndex: 1,
    explanation:
      'Heterospory produces two types of spores: microspores and megaspores. The female gametophyte develops inside the megaspore and is retained on the parent sporophyte for nutrition, fulfilling the fundamental precursor conditions for seed evolution.',
    hints: [
      'Heterospory means two distinct types/sizes of spores.',
      'Megaspores stay protected and nourish the female gametophyte and developing embryo.',
      'This retention of the female gametophyte is the evolutionary seed precursor.',
    ],
    misconceptionIndex: 5,
  },
  // 17. Gymnosperms: Naked Seeds (c11_bio_010) - Foundation (Understanding)
  {
    id: 'ch_bio_017',
    nodeId: NODE_C11_BIO_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why are plants like Pinus (Chir Pine of the Himalayas) and Cycas classified as "Gymnosperms" rather than Angiosperms?',
    options: [
      'Their ovules and resulting seeds sit naked and exposed on the surface of megasporophyll cone scales, without an enclosing ovary wall or fruit',
      'They do not produce seeds; they reproduce strictly by swimming spores',
      'They have single-celled thalloid bodies without true leaves',
      'Their seeds are produced underground inside root nodules',
    ],
    correctIndex: 0,
    explanation:
      'Gymnosperm literally means "naked seed" (gymnos = naked, sperma = seed). Ovules are borne exposed on megasporophylls forming female cones. Because there is no ovary, true fruits never form around the seeds.',
    hints: [
      'Break down the Greek root: "gymnos" means naked.',
      'There is no floral ovary to form a fruit around the pine seeds.',
      'The seeds are borne directly exposed on woody cone scales.',
    ],
    misconceptionIndex: 6,
  },
  // 18. Pinus Adaptations for Montane Drought (c11_bio_010) - Standard (Analysis)
  {
    id: 'ch_bio_010_a',
    nodeId: NODE_C11_BIO_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Pinus roxburghii thrives on dry, cold Himalayan slopes in Himachal Pradesh and Uttarakhand. Which combination of xerophytic adaptations minimises transpiration in Pinus needle leaves?',
    options: [
      'Broad thin leaves with stomata raised above the epidermis and thin cuticle',
      'Needle-like reduced surface area, thick waxy cuticle, and sunken stomata situated in deep pits',
      'Absence of xylem tracheids and replacement with air chambers',
      'Complete loss of chlorophyll and dependence on mycorrhizal saprotrophy',
    ],
    correctIndex: 1,
    explanation:
      'Conifers like Pinus feature xerophytic adaptations: acicular (needle-like) leaves with reduced surface-to-volume ratio, heavily cutinised epidermis, and sunken stomata nestled in hypodermal crypts to withstand physiological drought in freezing winters.',
    hints: [
      'Think about leaf shape and cuticle thickness in pine needles.',
      'Sunken stomata reduce wind exposure and water vapour loss.',
      'Needle shape + thick cuticle + sunken stomata is the correct combination.',
    ],
  },
  // 19. Siphonogamy & Water Independence (c11_bio_010) - Standard (Application)
  {
    id: 'ch_bio_010_b',
    nodeId: NODE_C11_BIO_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'How did the evolution of the pollen tube (siphonogamy) in Gymnosperms liberate seed plants from the aquatic constraints faced by Bryophytes and Pteridophytes?',
    options: [
      'The pollen tube allows male gametes to be delivered directly through ovular tissues to the egg by wind-pollinated pollen, requiring zero external liquid water for fertilisation',
      'The pollen tube acts as a root to absorb underground water from deep aquifers',
      'The pollen tube produces toxic chemicals that destroy fungal competitors',
      'The pollen tube converts haploid sperm into diploid endosperm before fertilisation',
    ],
    correctIndex: 0,
    explanation:
      'In gymnosperms, pollen grains are carried by wind (anemophily) to the ovule micropyle. The pollen grain germinates and elongates a pollen tube (siphonogamy) that channels non-motile or motile sperm directly to the archegonium without requiring environmental water films.',
    hints: [
      'Siphonogamy means fertilisation via a pollen tube.',
      'No swimming sperm in external water is needed.',
      'The pollen tube directly conveys male gametes to the ovule.',
    ],
  },
  // 20. Numeric Calculation: Taxon Resolution (c11_bio_001) - Standard (Application)
  {
    id: 'ch_bio_020',
    nodeId: NODE_C11_BIO_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A taxonomist studies 5 distinct plant species in the Western Ghats belonging to 2 different genera in the family Solanaceae. How many distinct Families and Orders do these 5 species belong to in total? (Enter the number of Orders)',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'Order',
    explanation:
      'Because all 5 species are members of the single family Solanaceae, they all systematically share the same higher taxonomic rank: the Order Polymoniales (or Solanales). Therefore, there is exactly 1 Order.',
    hints: [
      'All species are in the same family: Solanaceae.',
      'If they belong to 1 family, how many taxonomic orders contain that single family?',
      'A family belongs to exactly one order. The answer is 1.',
    ],
  },
  // 21. Construct Fungal Classification Key (c11_bio_005) - Advanced (Creativity)
  {
    id: 'ch_bio_021',
    nodeId: NODE_C11_BIO_005,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the taxonomic diagnosis for Penicillium (source of penicillin antibiotic). Assemble the 3 diagnostic tokens in order.',
    availableParts: ['Kingdom Fungi', 'Deuteromycetes (Imperfecti)', 'Asexual Conidiospores', 'Basidiomycetes', 'Zygospores', 'Kingdom Plantae'],
    targetState: 'Kingdom Fungi Deuteromycetes (Imperfecti) Asexual Conidiospores',
    validationHint: 'Select Kingdom, then Class (Imperfecti), then mode of asexual reproduction.',
    explanation:
      'Penicillium belongs to Kingdom Fungi. Because its sexual teleomorph stage was historically unknown/lacking, it is classified under Deuteromycetes (Fungi Imperfecti), reproducing via branched chains of brush-like asexual conidiospores.',
    hints: [
      'Start with Kingdom Fungi.',
      'Penicillium is traditionally placed in Deuteromycetes.',
      'It reproduces asexually through brush-like conidiospores.',
    ],
  },
  // 22. Cladogram Evolutionary Progression (c11_bio_002 to c11_bio_010) - Advanced (Evaluation)
  {
    id: 'ch_bio_022',
    nodeId: NODE_C11_BIO_002,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Arrange the plant groups in evolutionary order from aquatic thallus to dominant land seed habit.',
    sortItems: [
      'Algae (Aquatic thalloid autotrophs without tissues)',
      'Bryophyta (Amphibians of plant kingdom; gametophyte dominant, no vascular tissue)',
      'Pteridophyta (First vascular plants; sporophyte dominant, spore-bearing)',
      'Gymnosperms (First seed plants; naked seeds on cones, siphonogamous)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Plant evolutionary cladistics tracks the conquest of land: Aquatic Thallus (Algae) → Non-vascular Amphibian Land plants (Bryophytes) → Vascular Spore Cryptogams (Pteridophytes) → Naked Seed Phanerogams (Gymnosperms).',
    hints: [
      'Algae are the most primitive non-vascular aquatic autotrophs.',
      'Bryophytes ventured onto damp land first without plumbing.',
      'Pteridophytes introduced vascular pipelines, followed by Gymnosperms with seeds.',
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
  nodeId: NODE_C11_BIO_001,
  title: 'Taxonomy, Five Kingdoms & Plant Kingdom Evolution',
  definition:
    'Taxonomy systematically classifies living organisms into hierarchical ranks from kingdom to species using binomial nomenclature. Whittaker’s Five Kingdom system sorts cellular life by prokaryotic vs eukaryotic organisation, thallus differentiation, and nutrition. The plant kingdom traces evolutionary milestones: from aquatic thalloid Algae to non-vascular Bryophytes, vascular spore-bearing Pteridophytes, and naked-seeded Gymnosperms.',
  eli5:
    'Think of the living world as a massive library. Taxonomy gives every organism an exact two-part Latin address. Life splits into 5 giant kingdoms. On land, plants learned to climb out of water step-by-step: first mosses hugging wet rocks, then ferns building vascular water pipes, and finally pine trees inventing seeds that travel in the wind!',
  misconceptions: [
    {
      misconception: 'Capitalising both words in binomial nomenclature (e.g. Mangifera Indica).',
      correction: 'Only the genus begins with a capital letter; the species epithet is always lowercase (Mangifera indica) and italicised or underlined.',
    },
    {
      misconception: 'Archaea and true Bacteria belong together because both are single-celled.',
      correction: 'Archaea have unique ether-linked membrane lipids, distinctive rRNA sequences, and lack peptidoglycan cell walls, placing them in a separate domain.',
    },
    {
      misconception: 'Gram staining is merely an arbitrary colour reaction.',
      correction: 'Gram-positive purple colour results from thick peptidoglycan trapping crystal violet, whereas Gram-negative thin peptidoglycan loses dye in alcohol.',
    },
    {
      misconception: 'Euglena is half-plant and half-animal changing kingdoms.',
      correction: 'Euglena is a mixotrophic protist with a protein pellicle that photosynthesises in light and absorbs organic nutrients in the dark.',
    },
    {
      misconception: 'Fungi fuse nuclei immediately during sexual union.',
      correction: 'Plasmogamy (cytoplasmic fusion) is followed by an extended dikaryophase (n+n) before karyogamy (nuclear fusion) and meiosis occur.',
    },
    {
      misconception: 'Pteridophytes do not need water for fertilisation because they have xylem.',
      correction: 'Vascular tissue allows upright growth, but pteridophyte flagellated sperm still strictly require surface water films to swim to archegonia.',
    },
    {
      misconception: 'Pine cones are the true fruits of gymnosperms.',
      correction: 'Cones are woody strobili; gymnosperms lack ovaries, so their seeds are naked with no enclosing fruit.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the fundamental unit of taxonomic classification?', options: ['Genus', 'Species', 'Family', 'Order'], correctIndex: 1 },
    { question: 'Which kingdom includes prokaryotic cyanobacteria and methanogens?', options: ['Protista', 'Monera', 'Fungi', 'Plantae'], correctIndex: 1 },
    { question: 'What cell wall component is diagnostic of Kingdom Fungi?', options: ['Cellulose', 'Chitin', 'Peptidoglycan', 'Pectin'], correctIndex: 1 },
    { question: 'Viroids lack which critical structure found in true viruses?', options: ['RNA', 'Protein Capsid', 'Infectivity', 'Nucleotides'], correctIndex: 1 },
    { question: 'Which algal pigment allows red algae to harvest light in deep water?', options: ['Chlorophyll b', 'Fucoxanthin', 'Phycoerythrin', 'Carotene'], correctIndex: 2 },
    { question: 'Why are Bryophytes called the amphibians of the plant kingdom?', options: ['They have lungs', 'They need water for fertilisation', 'They live in saltwater', 'They eat insects'], correctIndex: 1 },
    { question: 'Which plant group first developed xylem and phloem vascular tissue?', options: ['Algae', 'Bryophyta', 'Pteridophyta', 'Gymnosperms'], correctIndex: 2 },
    { question: 'What does "gymnosperm" mean literally?', options: ['Hidden seed', 'Naked seed', 'Flowering seed', 'Winged seed'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of taxonomic hierarchy, 5-kingdom characteristics, viral/prion structures, and the evolutionary continuum of the Plant Kingdom.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Brilliant.org Style) ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Taxonomic Hierarchy Sieve',
    instruction: 'Click each taxonomic rank from Kingdom down to Species to filter human vs mango classification.',
    interactionType: 'click-hierarchy',
    nodeId: NODE_C11_BIO_001,
  },
  {
    title: '2. The Gram Stain Virtual Microscope',
    instruction: 'Adjust the Decolouriser (Alcohol) slider and watch the Gram-positive vs Gram-negative cell walls react in real-time!',
    interactionType: 'slider-gram',
    nodeId: NODE_C11_BIO_003,
  },
  {
    title: '3. Fungal Dikaryophase & Nuclear Clock',
    instruction: 'Step through Plasmogamy → Dikaryon (n+n) → Karyogamy (2n) → Meiosis (n) to observe nuclear states.',
    interactionType: 'step-fungi',
    nodeId: NODE_C11_BIO_005,
  },
  {
    title: '4. Acellular Entity Inspector (Virus vs Viroid vs Prion)',
    instruction: 'Click each pathogen to dissect its biochemical payload under electron microscopy.',
    interactionType: 'click-pathogen',
    nodeId: NODE_C11_BIO_006,
  },
  {
    title: '5. Plant Kingdom Evolutionary Conquest',
    instruction: 'Toggle between Algae, Bryophytes, Pteridophytes, and Gymnosperms to witness the evolution of vascular tissue & seeds.',
    interactionType: 'toggle-plant',
    nodeId: NODE_C11_BIO_008,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you wash a Gram-negative bacterium with 95% ethyl alcohol during Gram staining, what happens to its outer membrane and crystal violet dye?',
    options: [
      'The thick peptidoglycan absorbs the alcohol and becomes intensely violet',
      'The outer lipid membrane dissolves, letting the violet dye leak out so the cell becomes colourless until counterstained pink',
      'The bacterium instantly forms a heat-resistant endospore',
      'The cell wall turns bright green due to chloroplast activation',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Alcohol Wash slider to 100% in the simulator to verify your prediction!',
    nodeId: NODE_C11_BIO_003,
  },
  {
    question: 'Predict: If a fern prothallus (gametophyte) is grown in completely dry air with zero surface moisture, can it produce new sporophyte ferns?',
    options: [
      'Yes, because xylem vessels pump water to the archegonium automatically',
      'No, because biflagellated male sperms must physically swim through a film of external water to reach the archegonium egg',
      'Yes, because wind blows the spores directly into the ovary',
      'Yes, because ferns produce winged seeds like pines',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the Water Film switch in the Pteridophyte lab to observe whether fertilisation occurs!',
    nodeId: NODE_C11_BIO_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Gram-positive cell wall when the alcohol wash is applied in the simulation?',
    observableOptions: [
      'It disintegrates immediately and lyses',
      'The dense, multilayered peptidoglycan mesh dehydrates and tightens, trapping the crystal violet-iodine complex',
      'It expands into flagella',
      'It changes its genetic code',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_BIO_003,
  },
  {
    question: 'In the Plant Evolution comparator, what structural feature is present in Ferns and Pines that is totally absent in Mosses?',
    observableOptions: [
      'Chlorophyll a and b',
      'True vascular tissues (Xylem with tracheids and Phloem)',
      'Haploid spores',
      'Cellulose cell walls',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_BIO_009,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The Silent Valley Herbarium & Microbe Catalogue',
  description:
    'You are compiling a formal ISC botanical monograph for the Kerala Forest Department. Select 4 indigenous specimens from your field notes (e.g., Spirogyra, Marchantia from Munnar, Nephrolepis fern, and Himalayan Pinus roxburghii). For each, record: (1) Division/Phylum, (2) Dominant generation (gametophyte or sporophyte), (3) Vascular tissue status, and (4) Reproductive water dependency.',
  steps: [
    'Document Spirogyra (Thalloid, Gametophyte dominant, Non-vascular, Aquatic)',
    'Document Marchantia (Dorsiventral thallus, Gametophyte dominant, Non-vascular, Needs water film for antherozoids)',
    'Document Nephrolepis (True roots/fronds, Sporophyte dominant, Vascular xylem/phloem, Needs water film for prothallial sperm)',
    'Document Pinus (Needle leaves/woody cones, Sporophyte dominant, Vascular tracheids, Siphonogamous pollen tube - water independent)',
  ],
};

// ─── MAIN COMPONENT ───
function C11_BiologyTaxonomyClassificationspeciesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_BIO_001,
  title = DEFAULT_PROPS.title || 'Taxonomy & Plant Kingdom',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant Exploration & Sandbox state
  const [selectedRank, setSelectedRank] = useState<number>(0);
  const [alcoholWashLevel, setAlcoholWashLevel] = useState<number>(0); // 0 to 100%
  const [fungalStep, setFungalStep] = useState<number>(0); // 0: Plasmogamy, 1: Dikaryon, 2: Karyogamy, 3: Meiosis
  const [selectedPathogen, setSelectedPathogen] = useState<'virus' | 'viroid' | 'prion'>('virus');
  const [selectedPlantGroup, setSelectedPlantGroup] = useState<'algae' | 'bryo' | 'pteri' | 'gymno'>('bryo');
  const [waterFilmActive, setWaterFilmActive] = useState<boolean>(true);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive difficulty & scoring
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & interactive input state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback FX state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconceptions tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY CURRENT DIFFICULTY ───
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

  // ─── ADAPTIVE DIFFICULTY ON SCORE UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D LIVE CANVAS MICROSCOPE SIMULATION ───
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

      // Draw microscope aperture background
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 8;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      // Dark field microscope view
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Microscope grid reticle
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, canvas.height);
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();

      // Active simulation visuals based on phase / sliders
      if (phase === 'explore' || phase === 'sandbox') {
        if (currentSlide === 1 || phase === 'sandbox') {
          // Gram Stain Bacteria Simulation
          const gramPosColor = '#8b5cf6'; // Deep Crystal Violet
          // Gram-neg colour fades from purple to pink as alcohol increases
          const decolRatio = alcoholWashLevel / 100;
          const r = Math.round(139 + (244 - 139) * decolRatio);
          const g = Math.round(92 + (63 - 92) * decolRatio);
          const b = Math.round(246 + (94 - 246) * decolRatio);
          const gramNegColor = `rgb(${r}, ${g}, ${b})`;

          // Draw Gram-positive staphylococci clusters (thick wall)
          ctx.fillStyle = gramPosColor;
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 8;
          for (let i = 0; i < 9; i++) {
            const angle = (i * Math.PI * 2) / 9 + frame * 0.005;
            const bx = centerX - 60 + Math.cos(angle) * 22;
            const by = centerY - 20 + Math.sin(angle) * 22;
            ctx.beginPath();
            ctx.arc(bx, by, 7 + Math.sin(frame * 0.05 + i) * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw Gram-negative bacilli rods (thin wall + lipid outer membrane)
          ctx.fillStyle = gramNegColor;
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = decolRatio > 0.5 ? 10 : 4;
          for (let j = 0; j < 5; j++) {
            const rx = centerX + 40 + Math.sin(frame * 0.02 + j) * 8;
            const ry = centerY - 40 + j * 24 + Math.cos(frame * 0.03 + j) * 6;
            ctx.beginPath();
            ctx.roundRect(rx - 16, ry - 6, 32, 12, 6);
            ctx.fill();
          }
          ctx.shadowBlur = 0;
        } else if (currentSlide === 2) {
          // Fungal Dikaryon Nuclear Fusion visualizer
          const pulse = Math.sin(frame * 0.08) * 3;
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 20;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(centerX - 100, centerY);
          ctx.lineTo(centerX + 100, centerY);
          ctx.stroke();

          // Nuclei within hypha
          if (fungalStep === 0) {
            // Plasmogamy: Two nuclei approaching
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(centerX - 35, centerY, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(centerX + 35, centerY, 9, 0, Math.PI * 2);
            ctx.fill();
          } else if (fungalStep === 1) {
            // Dikaryon (n+n) coexisting side-by-side
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(centerX - 12, centerY, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(centerX + 12, centerY, 9, 0, Math.PI * 2);
            ctx.fill();
          } else if (fungalStep === 2) {
            // Karyogamy (2n diploid fused)
            ctx.fillStyle = '#a855f7';
            ctx.beginPath();
            ctx.arc(centerX, centerY, 13 + pulse, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Meiosis: 4 haploid spores (n)
            const sporeColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];
            for (let s = 0; s < 4; s++) {
              ctx.fillStyle = sporeColors[s];
              ctx.beginPath();
              ctx.arc(centerX - 45 + s * 30, centerY, 7, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      ctx.restore();

      // Outer bezel ring
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide, alcoholWashLevel, fungalStep]);

  // ─── CALLBACK HANDLERS ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You spotted the amphibian constraint.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive taxonomy laboratory. Let us explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test any variable without grading. Observe the living patterns.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setAlcoholWashLevel(val);
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your knowledge against real ICSE exam challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now manipulate the controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closer at the cell wall response.');
  }, []);

  const handleRankSelect = useCallback((rankIndex: number) => {
    setSelectedRank(rankIndex);
    audioManager.play('tap');
  }, []);

  const handleAlcoholSlider = useCallback((val: number) => {
    setAlcoholWashLevel(val);
    audioManager.play('count');
    if (val >= 90 && predictionMade && !predictionVerified) {
      setPredictionVerified(true);
      setShowSparkle(true);
      setSparklePos({ x: 200, y: 150 });
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleFungalCycleAdvance = useCallback(() => {
    setFungalStep((s) => (s + 1) % 4);
    audioManager.play('pop');
  }, []);

  const handlePathogenSelect = useCallback((p: 'virus' | 'viroid' | 'prion') => {
    setSelectedPathogen(p);
    audioManager.play('tap');
  }, []);

  const handlePlantGroupSelect = useCallback((g: 'algae' | 'bryo' | 'pteri' | 'gymno') => {
    setSelectedPlantGroup(g);
    audioManager.play('tap');
  }, []);

  const handleWaterFilmToggle = useCallback(() => {
    setWaterFilmActive((prev) => !prev);
    audioManager.play('tap');
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
      setShowExplanation(true);
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_BIO_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Phenomenal accomplishment! You have conquered taxonomy and plant kingdom evolution.');
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Perfectly reasoned.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, String(Math.round(bktStateRef.current.pKnown * 100)));
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
          speechManager.speak('Let us study the complete step-by-step ICSE walkthrough.');
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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
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
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleAddConstructPart = useCallback((part: string) => {
    setConstructParts((prev) => [...prev, part]);
    audioManager.play('tap');
  }, []);

  const handleRemoveConstructPart = useCallback((idx: number) => {
    setConstructParts((prev) => prev.filter((_, i) => i !== idx));
    audioManager.play('pop');
  }, []);

  // ─── DATA FOR TAXONOMIC HIERARCHY EXPLORATION ───
  const HIERARCHY_DATA = useMemo(
    () => [
      { rank: 'Kingdom', human: 'Animalia', mango: 'Plantae', desc: 'Multicellular eukaryotes (Heterotrophic vs Autotrophic)' },
      { rank: 'Phylum / Division', human: 'Chordata', mango: 'Angiospermae', desc: 'Notochord present vs Flowering seed plants' },
      { rank: 'Class', human: 'Mammalia', mango: 'Dicotyledonae', desc: 'Mammary glands & hair vs Two cotyledons & reticulate venation' },
      { rank: 'Order', human: 'Primates', mango: 'Sapindales', desc: 'Opposable thumbs & large brain vs Woody aromatic shrubs/trees' },
      { rank: 'Family', human: 'Hominidae', mango: 'Anacardiaceae', desc: 'Bipedal hominids vs Cashew/Mango resinous family' },
      { rank: 'Genus', human: 'Homo', mango: 'Mangifera', desc: 'Human genus vs Mango genus' },
      { rank: 'Species', human: 'sapiens', mango: 'indica', desc: 'Modern human species vs Cultivated Indian mango species' },
    ],
    []
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} className="p-3 bg-emerald-950/80 rounded-2xl border border-emerald-700/50 text-2xl">
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ISC Class 11 Biology
              </span>
              <span className="text-xs text-slate-400">Unit 1: Diversity of Living Organisms</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white mt-0.5">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xs px-3 py-1 font-bold rounded-full uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
            }`}
          >
            {difficulty} TIER
          </motion.span>
          <div className="text-right">
            <p className="text-xs text-slate-400">Mastery</p>
            <p className="text-sm font-semibold text-emerald-400 capitalize">{masteryLevel}</p>
          </div>
        </div>
      </div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-gold-950/70 rounded-2xl border border-emerald-800/40 shadow-inner">
            <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🌿</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-400/90 mt-2 font-medium bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-800/30">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">Discovery Hook</span>
              <p className="text-sm text-slate-300 font-semibold">Pre-Assessment Curiosity Challenge (Not Graded)</p>
            </div>
            <p className="text-base font-medium text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Discovery option: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all flex items-center justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 opacity-60'
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/90 border border-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span>✓</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className={`text-xs ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Bryophytes lack plumbing and require water for swimming sperms.'
                    : '👉 ' + DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter Taxonomy Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 text-sm whitespace-nowrap"
                >
                  Enter Taxonomy Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORE PHASE (5 Interactive Exploration Steps) ─── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          {/* Step Selector Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Go to ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[10px]">{idx + 1}</span>
                {step.title.split('. ')[1]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <span className="text-xs text-slate-500">ISC Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
                </div>
                <p className="text-sm text-amber-400 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* Step 0: Hierarchy Sieve */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-5 space-y-1.5">
                    {HIERARCHY_DATA.map((item, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Select taxonomic rank ${item.rank}`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRankSelect(idx)}
                        className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                          selectedRank === idx
                            ? 'bg-emerald-600 text-white shadow-md border border-emerald-400/50'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                        }`}
                      >
                        <span className="uppercase tracking-wider">{item.rank}</span>
                        <span className="text-[11px] opacity-80">{selectedRank >= idx ? '✓ Sifted' : 'Pending'}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="md:col-span-7 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-xs text-slate-400 font-semibold uppercase">Rank: {HIERARCHY_DATA[selectedRank].rank}</span>
                      <span className="text-xs text-emerald-400">Exclusive Criteria</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40">
                        <p className="text-[10px] text-gold-400 uppercase font-bold">Human (Homo sapiens)</p>
                        <p className="text-sm font-bold text-white mt-1">{HIERARCHY_DATA[selectedRank].human}</p>
                      </div>
                      <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/40">
                        <p className="text-[10px] text-amber-400 uppercase font-bold">Mango (Mangifera indica)</p>
                        <p className="text-sm font-bold text-white mt-1">{HIERARCHY_DATA[selectedRank].mango}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      ℹ️ <strong className="text-emerald-300">Diagnostic Rule:</strong> {HIERARCHY_DATA[selectedRank].desc}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 1: Gram Stain Microscope Lab */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-6 flex flex-col items-center">
                    <canvas ref={canvasRef} width={280} height={280} className="rounded-full shadow-2xl bg-black border-2 border-slate-700" />
                    <p className="text-xs text-slate-400 mt-2">Microscopic Field: 1000x Oil Immersion View</p>
                  </div>

                  <div className="md:col-span-6 space-y-4">
                    {!predictionMade && (
                      <div className="p-4 bg-slate-950 rounded-xl border border-gold-800/40 space-y-2">
                        <p className="text-xs font-bold text-gold-300">PREDICTION CHALLENGE:</p>
                        <p className="text-xs text-slate-300">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5 pt-1">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Predict: ${opt}`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {predictionMade && (
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center">
                          <label htmlFor="alcohol-slider-explore" className="text-xs font-bold text-slate-300">
                            Decolouriser Wash (Ethyl Alcohol 95%)
                          </label>
                          <span className="text-xs font-mono font-bold text-emerald-400">{alcoholWashLevel}%</span>
                        </div>
                        <input
                          id="alcohol-slider-explore"
                          aria-label="Decolouriser ethyl alcohol wash percentage"
                          type="range"
                          min={0}
                          max={100}
                          value={alcoholWashLevel}
                          onChange={(e) => handleAlcoholSlider(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-800/40">
                            <p className="font-bold text-purple-300">Gram-Positive (Staph)</p>
                            <p className="text-slate-400 mt-0.5">Thick Peptidoglycan (Traps Violet)</p>
                          </div>
                          <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800/40">
                            <p className="font-bold text-rose-300">Gram-Negative (E. coli)</p>
                            <p className="text-slate-400 mt-0.5">{alcoholWashLevel > 70 ? 'Outer Lipid dissolved → Pink' : 'Retaining Violet'}</p>
                          </div>
                        </div>

                        {alcoholWashLevel > 80 && !observationAnswered && (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-2 border-t border-slate-800">
                            <p className="text-xs font-bold text-amber-300 mb-1">{OBSERVATION_QUESTIONS[0].question}</p>
                            <div className="space-y-1">
                              {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                                <motion.button
                                  key={i}
                                  aria-label={`Observation option: ${opt}`}
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  onClick={() => handleObservation(i)}
                                  className="w-full text-left p-1.5 rounded bg-slate-800 text-[11px] text-slate-200 hover:bg-slate-700"
                                >
                                  {opt}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Fungi Dikaryophase Clock */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-6 flex flex-col items-center">
                    <canvas ref={canvasRef} width={280} height={200} className="rounded-2xl shadow-xl bg-slate-950 border border-slate-800" />
                    <motion.button
                      aria-label="Advance fungal nuclear phase"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleFungalCycleAdvance}
                      className="mt-3 px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow-md"
                    >
                      Step Nuclear Phase →
                    </motion.button>
                  </div>

                  <div className="md:col-span-6 space-y-3">
                    {[
                      { title: '1. Plasmogamy', status: 'Fusion of compatible hyphal protoplasts (cytoplasm joins)' },
                      { title: '2. Dikaryophase (n + n)', status: 'Two distinct haploid nuclei coexist without fusing in each cell' },
                      { title: '3. Karyogamy (2n)', status: 'Nuclei fuse to create diploid zygote nucleus in ascus/basidium' },
                      { title: '4. Meiosis (n)', status: 'Reduction division generates genetically recombined haploid spores' },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs transition-all ${
                          fungalStep === idx
                            ? 'bg-gold-950/80 border-gold-500 text-white shadow-md'
                            : 'bg-slate-950/40 border-slate-800 text-slate-400'
                        }`}
                      >
                        <p className="font-bold text-gold-300">{step.title}</p>
                        <p className="text-[11px] mt-0.5">{step.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Acellular Inspector */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex gap-2 justify-center">
                    {(['virus', 'viroid', 'prion'] as const).map((type) => (
                      <motion.button
                        key={type}
                        aria-label={`Inspect ${type}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePathogenSelect(type)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          selectedPathogen === type
                            ? 'bg-emerald-600 text-white shadow-lg border border-emerald-400/40'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                    <div className="flex justify-center">
                      <svg viewBox="0 0 240 200" className="w-56 h-48" role="img" aria-label="Acellular entity visualization">
                        {selectedPathogen === 'virus' && (
                          <g>
                            {/* Bacteriophage Drawing */}
                            <polygon points="120,20 160,50 160,90 120,110 80,90 80,50" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                            <text x="120" y="70" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">DNA Core</text>
                            <rect x="114" y="110" width="12" height="40" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                            <polygon points="100,150 140,150 130,160 110,160" fill="#4338ca" />
                            {/* Tail fibres */}
                            <path d="M 100,155 L 70,185 L 60,195" stroke="#a5b4fc" strokeWidth="2" fill="none" />
                            <path d="M 140,155 L 170,185 L 180,195" stroke="#a5b4fc" strokeWidth="2" fill="none" />
                            <text x="120" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">T4 Bacteriophage</text>
                          </g>
                        )}
                        {selectedPathogen === 'viroid' && (
                          <g>
                            {/* Naked circular ssRNA */}
                            <ellipse cx="120" cy="100" rx="60" ry="40" fill="none" stroke="#f43f5e" strokeWidth="4" strokeDasharray="4 2" />
                            <text x="120" y="95" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="bold">Circular ssRNA</text>
                            <text x="120" y="115" textAnchor="middle" fill="#f43f5e" fontSize="9">NO Protein Capsid!</text>
                            <text x="120" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">PSTVd (Potato Spindle Tuber)</text>
                          </g>
                        )}
                        {selectedPathogen === 'prion' && (
                          <g>
                            {/* Misfolded Beta-Sheet Rich Protein */}
                            <path d="M 70,80 Q 90,40 120,80 T 170,80 Q 150,130 120,120 T 70,80" fill="#831843" stroke="#f472b6" strokeWidth="3" />
                            <text x="120" y="95" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontWeight="bold">Misfolded PrP^Sc</text>
                            <text x="120" y="112" textAnchor="middle" fill="#f472b6" fontSize="9">NO Nucleic Acid!</text>
                            <text x="120" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">BSE (Mad Cow) & CJD</text>
                          </g>
                        )}
                      </svg>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 uppercase font-bold text-[10px]">Biochemical Composition:</span>
                        <p className="text-slate-200 mt-0.5">
                          {selectedPathogen === 'virus' && 'Nucleic Acid (DNA or RNA) enclosed in a Protein Capsid (Virion).'}
                          {selectedPathogen === 'viroid' && 'Naked, low molecular weight single-stranded circular RNA (Zero protein).'}
                          {selectedPathogen === 'prion' && 'Abnormally folded infectious glycoprotein (Zero RNA/DNA).'}
                        </p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 uppercase font-bold text-[10px]">Classic Disease Example:</span>
                        <p className="text-emerald-300 mt-0.5">
                          {selectedPathogen === 'virus' && 'Tobacco Mosaic Disease (TMV), Influenza, HIV-1.'}
                          {selectedPathogen === 'viroid' && 'Potato Spindle Tuber Disease (PSTVd).'}
                          {selectedPathogen === 'prion' && 'Bovine Spongiform Encephalopathy (BSE) & Creutzfeldt-Jakob Disease (CJD).'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Plant Kingdom Evolutionary Stepping Stones */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { key: 'algae', label: '1. Algae', trait: 'Thalloid (Aquatic)' },
                      { key: 'bryo', label: '2. Bryophytes', trait: 'Non-vascular (Amphibian)' },
                      { key: 'pteri', label: '3. Pteridophytes', trait: 'Vascular Spore (Fern)' },
                      { key: 'gymno', label: '4. Gymnosperms', trait: 'Naked Seed (Pine)' },
                    ].map((item) => (
                      <motion.button
                        key={item.key}
                        aria-label={`Select ${item.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePlantGroupSelect(item.key as 'algae' | 'bryo' | 'pteri' | 'gymno')}
                        className={`p-2.5 rounded-xl text-left text-xs transition-all ${
                          selectedPlantGroup === item.key
                            ? 'bg-emerald-600 text-white shadow-lg border border-emerald-400/40'
                            : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        <p className="font-bold">{item.label}</p>
                        <p className="text-[10px] opacity-80 mt-0.5">{item.trait}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-6 flex justify-center">
                      <svg viewBox="0 0 300 200" className="w-full max-w-xs h-44" role="img" aria-label="Plant structural diagram">
                        {selectedPlantGroup === 'algae' && (
                          <g>
                            <path d="M 60,100 Q 150,40 240,100 T 60,100" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                            <text x="150" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Spirogyra Thallus</text>
                            <text x="150" y="170" textAnchor="middle" fill="#64748b" fontSize="9">No roots, stems, or vascular pipes</text>
                          </g>
                        )}
                        {selectedPlantGroup === 'bryo' && (
                          <g>
                            {/* Funaria Moss Diagram */}
                            <path d="M 150,180 L 150,110" stroke="#15803d" strokeWidth="5" />
                            {/* Leaves */}
                            <path d="M 150,150 L 130,140 M 150,130 L 170,120 M 150,160 L 175,155" stroke="#22c55e" strokeWidth="2" />
                            {/* Dependent Sporophyte */}
                            <path d="M 150,110 Q 140,60 160,40" stroke="#ca8a04" strokeWidth="2" />
                            <ellipse cx="160" cy="40" rx="8" ry="12" fill="#eab308" stroke="#a16207" />
                            <text x="195" y="45" fill="#fde047" fontSize="9">Capsule (2n)</text>
                            <text x="100" y="145" fill="#86efac" fontSize="9">Gametophyte (n)</text>
                            {/* Rhizoids */}
                            <path d="M 150,180 L 140,195 M 150,180 L 155,195 M 150,180 L 165,190" stroke="#78716c" strokeWidth="1.5" />
                            <text x="150" y="200" textAnchor="middle" fill="#a8a29e" fontSize="8">Rhizoids</text>
                          </g>
                        )}
                        {selectedPlantGroup === 'pteri' && (
                          <g>
                            {/* Fern frond & prothallus */}
                            <path d="M 150,170 Q 170,100 130,40" stroke="#16a34a" strokeWidth="3" fill="none" />
                            <path d="M 140,70 L 110,60 M 145,90 L 180,80 M 148,110 L 115,105 M 150,130 L 185,125" stroke="#22c55e" strokeWidth="2" />
                            <circle cx="118" cy="106" r="3" fill="#854d0e" />
                            <circle cx="178" cy="81" r="3" fill="#854d0e" />
                            <text x="210" y="85" fill="#facc15" fontSize="9">Sorus on Frond</text>
                            <text x="150" y="190" textAnchor="middle" fill="#64748b" fontSize="9">Xylem & Phloem Present!</text>
                          </g>
                        )}
                        {selectedPlantGroup === 'gymno' && (
                          <g>
                            {/* Pine cone and needle branch */}
                            <line x1="80" y1="100" x2="220" y2="100" stroke="#78350f" strokeWidth="4" />
                            <line x1="120" y1="100" x2="90" y2="50" stroke="#15803d" strokeWidth="1.5" />
                            <line x1="120" y1="100" x2="110" y2="40" stroke="#15803d" strokeWidth="1.5" />
                            <line x1="120" y1="100" x2="130" y2="40" stroke="#15803d" strokeWidth="1.5" />
                            {/* Woody Cone */}
                            <ellipse cx="170" cy="120" rx="18" ry="25" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
                            <text x="170" y="125" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">Naked Seeds</text>
                            <text x="150" y="180" textAnchor="middle" fill="#64748b" fontSize="9">Siphonogamous (Wind Pollen Tube)</text>
                          </g>
                        )}
                      </svg>
                    </div>

                    <div className="md:col-span-6 space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Vascular Pipelines (Xylem/Phloem):</span>
                        <span className={`font-bold ${selectedPlantGroup === 'algae' || selectedPlantGroup === 'bryo' ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {selectedPlantGroup === 'algae' || selectedPlantGroup === 'bryo' ? '✗ ABSENT' : '✓ PRESENT'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Dominant Generation:</span>
                        <span className="font-bold text-gold-300">
                          {selectedPlantGroup === 'algae' || selectedPlantGroup === 'bryo' ? 'Gametophyte (n)' : 'Sporophyte (2n)'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Fertilisation Water Dependence:</span>
                        <span className={`font-bold ${selectedPlantGroup === 'gymno' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {selectedPlantGroup === 'gymno' ? '✓ Independent (Pollen Tube)' : '✗ Requires Water Film'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-semibold"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-500 font-mono">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-teal-900/40"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* ─── SANDBOX / FREE EXPLORATION PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
          <div className="p-4 bg-gradient-to-r from-slate-900 via-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/40 flex flex-col md:flex-row justify-between items-center gap-3">
            <div>
              <h3 className="text-base font-bold text-gold-300">Free Observation Sandbox</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manipulate bacteria staining, observe dikaryophases, and toggle water films freely.</p>
            </div>
            <motion.button
              aria-label="Start Graded Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-xl shadow-emerald-900/30 whitespace-nowrap"
            >
              Start Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Live Gram Stain Controls */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="alcohol-slider-sandbox" className="text-xs font-bold text-white">
                  Interactive Microscope (Gram Decolouriser)
                </label>
                <span className="text-xs font-mono text-emerald-400">{alcoholWashLevel}%</span>
              </div>
              <input
                id="alcohol-slider-sandbox"
                aria-label="Sandbox ethyl alcohol wash slider"
                type="range"
                min={0}
                max={100}
                value={alcoholWashLevel}
                onChange={(e) => handleAlcoholSlider(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-center">
                <canvas ref={canvasRef} width={240} height={200} className="rounded-xl bg-black border border-slate-700" />
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                Observe the Gram-negative pink decolourisation vs Gram-positive purple retention.
              </p>
            </div>

            {/* Live Alternation of Generations Switcher */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-white">Water Film Fertilisation Simulator (Moss & Fern)</span>
                <p className="text-xs text-slate-400 mt-1">
                  Toggle external water film availability to test reproductive viability of flagellated sperms.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-200">Environmental Moisture Status:</p>
                  <p className={`text-xs font-semibold mt-0.5 ${waterFilmActive ? 'text-teal-400' : 'text-amber-400'}`}>
                    {waterFilmActive ? '🌊 Wet Water Film Present (Monsoon)' : '🏜️ Arid / Dry Air'}
                  </p>
                </div>
                <motion.button
                  aria-label="Toggle water film moisture"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWaterFilmToggle}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${
                    waterFilmActive ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {waterFilmActive ? 'Dry Out' : 'Add Water'}
                </motion.button>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-300">
                {waterFilmActive ? (
                  <p className="text-teal-300">
                    ✓ <strong>Fertilisation SUCCESS:</strong> Flagellated antherozoids swim successfully to the archegonium. Zygote forms the next sporophyte.
                  </p>
                ) : (
                  <p className="text-rose-300">
                    ✗ <strong>Fertilisation BLOCKED:</strong> Antherozoids dry out on leaves. Bryophytes & Pteridophytes cannot reproduce without siphonogamous pollen tubes!
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <div className="space-y-5">
          {/* Challenge Header & Progress Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-gold-950 text-gold-400 font-mono text-xs font-bold rounded-lg border border-gold-800/50">
                Q {currentChallenge + 1} / {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">NEP 2020: {challenge.competencyLevel.toUpperCase()}</span>
            </div>
            <div className="text-xs text-slate-400">
              Score: <strong className="text-emerald-400">{scoreBreakdown.correct}</strong> / {scoreBreakdown.total}
            </div>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Box */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-2 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-sm md:text-base font-semibold text-white leading-relaxed">{challenge.question}</p>

            {/* MCQ / Classify / Match Challenge Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 mt-5">
                {challenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${idx + 1}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={showExplanation || answerRevealed}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center justify-between ${
                      showExplanation && idx === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 hover:bg-slate-700/90 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <span>{opt}</span>
                    {showExplanation && idx === challenge.correctIndex && <span className="font-bold text-emerald-400 text-base">✓</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 self-center mr-2">Drag Tokens:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable token: ${item.label}`}
                      tabIndex={0}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      aria-label={`Drop area for ${targetId.replace('part_', '')}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col justify-center items-center min-h-[70px] ${
                        droppedLabels[targetId]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-700 bg-slate-950/60 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">
                        Target: {targetId.replace('part_', '').toUpperCase()}
                      </span>
                      <span className="text-xs font-bold mt-1">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Diagram Labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Check Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into proper biological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      tabIndex={0}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs md:text-sm text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center font-mono text-xs text-gold-400 font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Biological Sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Biological Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Type */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label="Numeric answer input"
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 w-36"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check Answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add diagnosis token: ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAddConstructPart(part)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      {part}
                      <button
                        aria-label={`Remove ${part}`}
                        onClick={() => handleRemoveConstructPart(i)}
                        className="text-rose-300 hover:text-white font-bold ml-1"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click diagnosis tokens above to build your answer...</span>}
                </div>

                <motion.button
                  aria-label="Submit Taxonomic Diagnosis"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Submit Taxonomic Diagnosis
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Step-by-Step Walkthrough */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 md:p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded">ICSE Exam Walkthrough</span>
                  <p className="text-xs text-amber-300 font-semibold">Structured Pedagogical Reasoning:</p>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-200 leading-relaxed">
                        <strong className="text-amber-400 font-mono">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-3 items-center">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Step in explanation"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-sm"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to Next Challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl border border-emerald-700/50 text-center space-y-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="text-5xl">
              🏆
            </motion.div>
            <h2 className="text-2xl font-bold text-white">Silent Valley Master Botanist Certification</h2>
            <p className="text-sm text-slate-300">
              Final Composite Score: <strong className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-slate-400">Bayesian Mastery Status: <span className="text-emerald-300 font-semibold uppercase">{masteryLevel}</span></p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/50 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {errors === 0 ? '🌟' : errors <= 3 ? '🎉' : errors <= 7 ? '👍' : '💪'}
              </span>
              <h3 className="text-base font-bold text-emerald-300">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h3>
            </div>
            <p className="text-xs md:text-sm text-emerald-200 leading-relaxed font-medium">
              {errors === 0
                ? 'Flawless mastery! You demonstrated impeccable command over Taxonomic ranks, Gram wall biochemistry, Dikaryophase sequencing, and the Plant Kingdom evolutionary continuum!'
                : errors <= 3
                ? 'Impressive understanding! You have a firm grasp of the core ICSE criteria. Review the specific misconceptions below for a 100% board score.'
                : errors <= 7
                ? 'You are making steady progress! Diversity of Living Organisms has nuanced terminology. Review your misconceptions and try again.'
                : 'Every attempt strengthens your neural connections. Take another pass through the labs and try the challenge questions once more!'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/50 space-y-4">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Key Concept Reflection
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="font-semibold text-slate-200">1. What was the most surprising thing you learned?</p>
                <p className="text-slate-400 italic">
                  E.g., how the thick peptidoglycan wall in Gram-positive bacteria traps dye, or how heterospory directly paved the way for seeds!
                </p>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="font-semibold text-slate-200">2. How would you explain this to a friend?</p>
                <p className="text-slate-400 italic">
                  E.g., explaining why mosses are called the "amphibians" of plants because their sperm must swim through water droplets.
                </p>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="font-semibold text-slate-200">3. Where in real life might you use this?</p>
                <p className="text-slate-400 italic">
                  E.g., in medical diagnostics during bacterial Gram stains, agriculture when identifying wheat rust, or commercial agar production.
                </p>
              </div>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnosis
              </h3>
              <p className="text-xs text-slate-400">Examiners have identified these specific areas where precision was missed:</p>
              <div className="space-y-2 pt-1">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-semibold">✗ {m.misconception}</p>
                      <p className="text-emerald-300 mt-1 font-medium">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/40 text-xs text-slate-300 space-y-1">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <span>📅</span> Spaced Repetition (SM-2 Algorithm)
            </h4>
            <p>
              Your memory decay curve has been updated. Next active retrieval review is scheduled in{' '}
              <strong className="text-amber-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </p>
          </div>

          {/* Real World Monograph Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>📝</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> {st}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center pt-2">
            <motion.button
              aria-label="Re-explore Labs and Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setCurrentChallenge(0);
                setErrors(0);
                setScoreBreakdown({ correct: 0, total: 0 });
                audioManager.play('whoosh');
              }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl text-sm shadow-xl shadow-emerald-900/40"
            >
              Re-explore Labs & Challenges ↺
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODAL COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Topic Assessment Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiologyTaxonomyClassificationspeciesSim;