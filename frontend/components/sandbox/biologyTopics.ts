/**
 * biologyTopics.ts — class-wise topic picker data for the Biology Sandbox.
 *
 * Curated from D:/platform/_cisce_build/biology_book_topics.json (the
 * chapter-by-chapter inventory extracted from the actual textbooks:
 * NCERT Science 9-10, NCERT Biology 11-12, NCERT Biotechnology and the
 * CISCE bio corpus). Only solver-able topics appear here — every `prompt`
 * is answered by a deterministic family in biology_families.py via
 * POST /api/sandbox/solve (subject "biology").
 *
 * `nodeId` points at the authored enhanced-nodes corpus entry used for
 * misconception teaching (closed-world). Classes 6-8 have no c*_bio_cbse
 * corpus entries, so nodeId stays undefined there and MisconceptionPanel
 * honestly renders nothing instead of invented text. Verified node ids:
 *   c10_bio_cbse_01 life processes · 02 control-coordination ·
 *   03 reproduction · 04 heredity-variation
 *   c11_bio_cbse_08 cell · 10 cell cycle · 11 photosynthesis ·
 *   12 respiration · 15 blood
 *   c12_bio_cbse_05 Mendel · 06 molecular basis · 11 biotech principles ·
 *   12 biotech applications · 13 organisms-populations
 */

export type BioSubject = 'biology'

export interface BiologyTopic {
  key: string
  label: string
  /** Book-style sample prompt the deterministic solver family answers. */
  prompt: string
  subject?: BioSubject
  /** Authored corpus node for misconception content (optional). */
  nodeId?: string
}

export interface BiologyChapter {
  key: string
  label: string
  topics: BiologyTopic[]
}

export interface BiologyClassBand {
  key: string
  label: string
  chapters: BiologyChapter[]
}

const t = (
  key: string, label: string, prompt: string, nodeId?: string,
): BiologyTopic => ({ key, label, prompt, nodeId, subject: 'biology' })

/**
 * Authored one-line organelle functions for the 3D Cell Explorer —
 * deterministic curated table, never generated.  Lives here (a module
 * with zero 3D imports) so BiologySandbox can render the info panel
 * without pulling three.js into its chunk.
 */
export const ORGANELLE_FACTS: Record<string, { key: string; label: string; fn: string }> = {
  wall: { key: 'wall', label: 'Cell wall', fn: 'Rigid outer layer (cellulose in plants, peptidoglycan in bacteria) — fixed shape, mechanical protection.' },
  membrane: { key: 'membrane', label: 'Cell membrane', fn: 'Selectively permeable boundary — controls what enters and leaves by diffusion and osmosis.' },
  nucleus: { key: 'nucleus', label: 'Nucleus', fn: 'Control room — holds chromatin (DNA + histones); directs growth, metabolism, reproduction.' },
  nucleoid: { key: 'nucleoid', label: 'Nucleoid', fn: 'Irregular DNA region of a prokaryote — single circular chromosome, no nuclear membrane.' },
  chloroplast: { key: 'chloroplast', label: 'Chloroplast', fn: 'Site of photosynthesis — chlorophyll traps light energy to build glucose from CO2 and water.' },
  mitochondria: { key: 'mitochondria', label: 'Mitochondrion', fn: 'Aerobic respiration — releases energy from glucose as ATP; the powerhouse of the cell.' },
  vacuole: { key: 'vacuole', label: 'Central vacuole', fn: 'Storage and turgor pressure — keeps plant cells firm; sap holds water, salts, sugars.' },
  ribosome: { key: 'ribosome', label: 'Ribosomes', fn: 'Protein factories — translate mRNA into amino-acid chains.' },
  cytoplasm: { key: 'cytoplasm', label: 'Cytoplasm', fn: 'Jelly medium holding the organelles — site of many enzyme reactions (glycolysis).' },
}

export const BIOLOGY_SANDBOX_CLASSES: BiologyClassBand[] = [
  {
    key: 'c6', label: 'Class 6',
    chapters: [
      {
        key: 'c6_food', label: 'Food & plants',
        topics: [
          t('c6_photo_gas', 'Gases in photosynthesis',
            'Which gas is released during photosynthesis?'),
          t('c6_photo_raw', 'Raw materials',
            'What are the raw materials of photosynthesis?'),
        ],
      },
    ],
  },
  {
    key: 'c7', label: 'Class 7',
    chapters: [
      {
        key: 'c7_photo', label: 'Photosynthesis',
        topics: [
          t('c7_photo_eq', 'Word equation',
            'Write the word equation of photosynthesis.'),
          t('c7_photo_balance', 'Balanced equation',
            'Balance the photosynthesis equation CO2 + H2O -> C6H12O6 + O2'),
          t('c7_photo_end', 'End product',
            'What is the end product of photosynthesis?'),
        ],
      },
      {
        key: 'c7_resp', label: 'Respiration',
        topics: [
          t('c7_resp_eq', 'Word equation',
            'Write the word equation of respiration.'),
          t('c7_resp_atp', 'Energy currency',
            'What is the energy currency of the cell?'),
          t('c7_resp_yeast', 'Fermentation',
            'What happens during anaerobic respiration in yeast?'),
        ],
      },
    ],
  },
  {
    key: 'c9', label: 'Class 9',
    chapters: [
      {
        key: 'c9_cell', label: 'The fundamental unit of life',
        topics: [
          t('c9_mag', 'Microscope magnification',
            'A cell\'s image measures 50 mm while its actual size is 0.05 mm. Calculate the magnification.',
            'c11_bio_cbse_08_001'),
          t('c9_fov', 'Field of view estimate',
            'The field of view is 0.4 mm and 20 cells fit across it. What is the size of one cell?',
            'c11_bio_cbse_08_001'),
        ],
      },
    ],
  },
  {
    key: 'c10', label: 'Class 10',
    chapters: [
      {
        key: 'c10_life', label: 'Life processes',
        topics: [
          t('c10_photo_gas', 'Gas released',
            'Which gas is released during photosynthesis?',
            'c10_bio_cbse_01_001'),
          t('c10_resp_atp', 'Energy currency',
            'What is the energy currency of the cell?',
            'c10_bio_cbse_01_001'),
        ],
      },
      {
        key: 'c10_heredity', label: 'Heredity',
        topics: [
          t('c10_mono', 'Monohybrid cross',
            'In a cross Tt x Tt, what is the probability of the offspring being tt?',
            'c10_bio_cbse_04_001'),
          t('c10_recessive', 'Recessive probability',
            'A cross between Tt and tt gives what probability of a recessive offspring?',
            'c10_bio_cbse_04_001'),
          t('c10_sexdet', 'Sex determination',
            'In humans females are XX and males are XY. What is the probability that a child will be male?',
            'c10_bio_cbse_04_001'),
        ],
      },
      {
        key: 'c10_env', label: 'Our environment',
        topics: [
          t('c10_energy', '10% law energy flow',
            'If 10000 J of energy is available to producers, how much energy is available to the tertiary consumers?',
            'c12_bio_cbse_13_001'),
        ],
      },
    ],
  },
  {
    key: 'c11', label: 'Class 11',
    chapters: [
      {
        key: 'c11_cell', label: 'Cell & division',
        topics: [
          t('c11_mitosis', 'Mitosis cell count',
            'After 5 mitotic divisions starting from 1 cell, how many cells are produced?',
            'c11_bio_cbse_10_001'),
          t('c11_meiosis', 'Meiosis chromosome number',
            'A cell with 2n = 24 undergoes meiosis. How many chromosomes are present in the gametes?',
            'c11_bio_cbse_10_001'),
        ],
      },
      {
        key: 'c11_plant', label: 'Plant physiology',
        topics: [
          t('c11_photo_bal', 'Balanced photosynthesis',
            'Balance the photosynthesis equation CO2 + H2O -> C6H12O6 + O2',
            'c11_bio_cbse_11_001'),
          t('c11_rq', 'Respiratory quotient',
            'The RQ of a substrate is measured: 6 CO2 evolved and 6 O2 consumed. Calculate the respiratory quotient.',
            'c11_bio_cbse_12_001'),
          t('c11_rq_fat', 'RQ of fats',
            'What is the RQ of fats?',
            'c11_bio_cbse_12_001'),
        ],
      },
      {
        key: 'c11_human', label: 'Body fluids',
        topics: [
          t('c11_abo', 'ABO cross',
            'A heterozygous group A man marries a heterozygous group B woman. What is the probability that their child has blood group O?',
            'c11_bio_cbse_15_001'),
          t('c11_rh', 'Rh factor cross',
            'A heterozygous Rh positive father marries an Rh negative mother. What is the chance that their child is Rh negative?',
            'c11_bio_cbse_15_001'),
        ],
      },
    ],
  },
  {
    key: 'c11bt', label: 'Biotechnology 11',
    chapters: [
      {
        key: 'cbt_dna', label: 'Recombinant DNA',
        topics: [
          t('cbt_ecori', 'Restriction sites',
            'How many EcoRI restriction sites are present in the sequence GAATTCGGAATTCAAGCTTGAATTC?',
            'c12_bio_cbse_11_001'),
          t('cbt_frags', 'Cut fragments',
            'A circular plasmid of sequence GAATTCACGTACGTACGTGAATTC is cut with EcoRI at all its restriction sites. How many fragments are produced?',
            'c12_bio_cbse_11_001'),
        ],
      },
      {
        key: 'cbt_pcr', label: 'PCR & DNA math',
        topics: [
          t('cbt_pcr', 'PCR amplification',
            'In PCR, after 10 cycles, how many copies are formed from 2 DNA molecules?',
            'c12_bio_cbse_11_001'),
          t('cbt_chargaff', 'Chargaff base rule',
            'A double-stranded DNA sample contains 30% adenine. What percentage of the sample is guanine?',
            'c12_bio_cbse_06_001'),
        ],
      },
    ],
  },
  {
    key: 'c12', label: 'Class 12',
    chapters: [
      {
        key: 'c12_gen', label: 'Principles of inheritance',
        topics: [
          t('c12_dihybrid', 'Dihybrid 9:3:3:1',
            'In a dihybrid cross TtYy x TtYy, what is the probability of offspring showing both dominant traits?',
            'c12_bio_cbse_05_001'),
          t('c12_self', 'Self-pollination ratio',
            'A heterozygous tall pea plant (Tt) undergoes self-pollination. What is the genotype ratio of the offspring?',
            'c12_bio_cbse_05_001'),
          t('c12_haemo', 'Haemophilia cross',
            'A haemophilia carrier mother and a normal father have children. What is the probability that a child of theirs will be affected?',
            'c12_bio_cbse_05_001'),
          t('c12_sexlinked', 'Colour-blind sons',
            'A carrier mother (XCXc) and a normal father (XCY). What fraction of their sons will be colour blind?',
            'c12_bio_cbse_05_001'),
        ],
      },
      {
        key: 'c12_evo', label: 'Evolution',
        topics: [
          t('c12_hw', 'Hardy-Weinberg',
            'In a Hardy-Weinberg population, 16 percent of the individuals are homozygous recessive. What is the frequency of heterozygous individuals?'),
          t('c12_hw2', 'Allele frequencies',
            'The frequency of recessive allele is 0.3 in a population. Find the frequency of homozygous dominant genotype.'),
        ],
      },
      {
        key: 'c12_eco', label: 'Ecology',
        topics: [
          t('c12_expo', 'Exponential growth',
            'A population of 5000 grows at the rate of 3 percent per year. What will be the population after 4 years?',
            'c12_bio_cbse_13_001'),
          t('c12_logistic', 'Logistic growth',
            'A population of 1000 grows logistically with a carrying capacity of 10000 at a rate of 0.5 per year. What will be the population after 2 years?',
            'c12_bio_cbse_13_001'),
          t('c12_doubling', 'Bacterial doubling',
            'A culture of 500 bacteria doubles every 20 minutes. How many bacteria will there be after 2 hours?',
            'c12_bio_cbse_13_001'),
          t('c12_shannon', 'Shannon index',
            'Calculate the Shannon diversity index for a community with counts 40, 30, 20, 10.',
            'c12_bio_cbse_13_001'),
          t('c12_richness', 'Species richness',
            'What is the species richness of an area with counts 10, 25, 8, 40, 12?',
            'c12_bio_cbse_13_001'),
          t('c12_npp', 'NPP from GPP',
            'The GPP of an ecosystem is 2000 kJ and respiration loses 800 kJ. Find the NPP.',
            'c12_bio_cbse_13_001'),
          t('c12_specarea', 'Species-area relation',
            'Using the species-area relation S = cA^z with c = 0.1 and z = 0.25, find the number of species for an area of 100 km2.',
            'c12_bio_cbse_13_001'),
        ],
      },
    ],
  },
]
