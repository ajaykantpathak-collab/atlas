/**
 * chemistryTopics.ts — class-wise topic picker data for the Chemistry Sandbox.
 *
 * Curated from D:/platform/_cisce_build/chemistry_book_topics.json (the
 * chapter-by-chapter inventory extracted from the actual textbooks:
 * NCERT Curiosity 6-8, NCERT Science 9-10, NCERT Chemistry 11-12, plus the
 * ICSE corpus cisce_nodes_v2 c6-c10_chem and the enhanced-nodes corpus
 * c*_chem_cbse / c*_chemistry for classes 6-12).
 *
 * Only solver-able topics appear here — every `prompt` is answered by a
 * deterministic family in chemistry_families.py via POST /api/sandbox/solve
 * (subject: "chemistry"). Equation balancing, valency cross-over, mole
 * conversions, molecular mass, percent composition, gas laws, pH-OH and
 * water-hardness rows are live.
 *
 * `nodeId` points at the authored ENHANCED-NODES corpus entry used for
 * wrong-state misconception teaching (closed-world via remediation.ts).
 * The enrichment endpoint indexes the enhanced_nodes_md corpus only — the
 * cisce_nodes_v2 ICSE ids are NOT servable there, so nodeIds below use the
 * cbse/chemistry id shapes that exist in enhanced_nodes_md. Topics whose
 * concept has no indexed node stay nodeId-less and the MisconceptionPanel
 * honestly renders nothing instead of invented text.
 */

export interface ChemTopic {
  key: string
  label: string
  /** Book-style sample prompt the deterministic solver family answers. */
  prompt: string
  /** Which bench the topic exercises (drives the tab switch). */
  bench: 'solve' | 'equations' | 'formulas' | 'mole' | 'ph' | 'gas' | 'atoms'
  /** Authored corpus node for misconception content (optional). */
  nodeId?: string
}

export interface ChemChapter {
  key: string
  label: string
  topics: ChemTopic[]
}

export interface ChemClassBand {
  key: string
  label: string
  chapters: ChemChapter[]
}

const t = (
  key: string, label: string, prompt: string,
  bench: ChemTopic['bench'] = 'solve', nodeId?: string,
): ChemTopic => ({ key, label, prompt, bench, nodeId })

export const CHEM_SANDBOX_CLASSES: ChemClassBand[] = [
  {
    key: 'c6', label: 'Class 6',
    chapters: [
      {
        key: 'c6_matter', label: 'Matter & Materials',
        topics: [
          t('c6_atomcount', 'Counting atoms in a molecule',
            'How many atoms are there in one molecule of H2O?', 'atoms',
            'c6_chemistry_ch04_001'),
          t('c6_atomcount2', 'Atoms in carbon dioxide',
            'How many atoms are there in one molecule of CO2?', 'atoms',
            'c6_chemistry_ch04_001'),
        ],
      },
      {
        key: 'c6_water', label: 'Water & States of Matter',
        topics: [
          t('c6_water_atoms', 'Atoms in a water molecule',
            'How many atoms are there in one molecule of H2O?', 'atoms'),
        ],
      },
    ],
  },
  {
    key: 'c7', label: 'Class 7',
    chapters: [
      {
        key: 'c7_changes', label: 'Physical & Chemical Changes',
        topics: [
          t('c7_balance', 'Balance a skeleton equation',
            'Balance the equation: Mg + O2 -> MgO', 'equations',
            'c7_chem_ch02_001'),
          t('c7_check', 'Is this equation balanced?',
            'Is the following equation balanced? H2 + O2 -> H2O', 'equations',
            'c7_chem_ch02_001'),
        ],
      },
      {
        key: 'c7_metals', label: 'Metals & Non-Metals',
        topics: [
          t('c7_mg_balance', 'Burning magnesium',
            'Balance the equation: Mg + O2 -> MgO', 'equations',
            'c7_chem_ch01_001'),
        ],
      },
    ],
  },
  {
    key: 'c8', label: 'Class 8',
    chapters: [
      {
        key: 'c8_language', label: 'Language of Chemistry',
        topics: [
          t('c8_formula1', 'Cross-over formula: aluminium sulphate',
            'Write the chemical formula of aluminium sulphate', 'formulas',
            'c11_chem_cbse_04_001'),
          t('c8_formula2', 'Cross-over formula: ammonium phosphate',
            'What is the formula of ammonium phosphate?', 'formulas',
            'c11_chem_cbse_04_001'),
          t('c8_valency', 'Valency from a formula',
            'What is the valency of iron in Fe2O3?', 'formulas',
            'c11_chem_cbse_04_001'),
        ],
      },
      {
        key: 'c8_reactions', label: 'Chemical Reactions',
        topics: [
          t('c8_displacement', 'Balance a displacement reaction',
            'Balance: Al + CuCl2 -> AlCl3 + Cu', 'equations',
            'c7_chem_ch02_001'),
        ],
      },
    ],
  },
  {
    key: 'c9', label: 'Class 9',
    chapters: [
      {
        key: 'c9_mole', label: 'The Mole Concept',
        topics: [
          t('c9_moles1', 'Mass to moles',
            'Calculate the number of moles in 36 g of H2O', 'mole',
            'c11_chem_cbse_01_001'),
          t('c9_moles2', 'Moles to mass',
            'What is the mass of 0.5 moles of CaCO3?', 'mole',
            'c11_chem_cbse_01_001'),
          t('c9_molmass', 'Molecular mass from a formula',
            'Calculate the molecular mass of H2SO4', 'mole',
            'c11_chem_cbse_01_001'),
          t('c9_particles', 'Avogadro number: molecules in moles',
            'Calculate the number of molecules in 2 moles of CO2', 'mole',
            'c11_chem_cbse_01_001'),
        ],
      },
      {
        key: 'c9_gases', label: 'Study of Gas Laws',
        topics: [
          t('c9_boyle', "Boyle's law",
            'A gas occupies 500 mL at 1 atm. If the pressure is increased to ' +
            '2 atm at constant temperature, find the new volume.',
            'gas', 'c11_chem_cbse_05_001'),
          t('c9_charles', "Charles's law",
            'A gas has a volume of 600 mL at constant pressure when its ' +
            'temperature is 27 C. If the temperature rises to 327 C, find ' +
            'the new volume.', 'gas', 'c11_chem_cbse_05_001'),
        ],
      },
      {
        key: 'c9_water', label: 'Water',
        topics: [
          t('c9_hardness', 'Hardness of water (as CaCO3)',
            'Find the degree of hardness of a water sample containing 0.68 g ' +
            'of CaSO4 dissolved in 5 litres of water.', 'solve',
            'c10_chem_cbse_02_001'),
        ],
      },
    ],
  },
  {
    key: 'c10', label: 'Class 10',
    chapters: [
      {
        key: 'c10_reactions', label: 'Chemical Reactions & Equations',
        topics: [
          t('c10_balance', 'Balance a combustion equation',
            'Balance the chemical equation: H2 + O2 -> H2O', 'equations',
            'c10_chem_cbse_01_001'),
          t('c10_balance2', 'Balance a thermal decomposition',
            'Balance: Ca(NO3)2 -> CaO + NO2 + O2', 'equations',
            'c10_chem_cbse_01_001'),
        ],
      },
      {
        key: 'c10_acids', label: 'Acids, Bases & Salts',
        topics: [
          t('c10_pH1', 'pH from hydroxide concentration',
            'The hydroxide ion concentration of a solution is 1e-3 M. ' +
            'Calculate the pH of the solution.', 'ph',
            'c10_chem_cbse_02_001'),
          t('c10_pH2', 'Hydroxide concentration from pH',
            'The pH of a solution is 5. Find the hydroxide ion concentration.',
            'ph', 'c10_chem_cbse_02_001'),
        ],
      },
      {
        key: 'c10_stoich', label: 'Mole Concept & Stoichiometry',
        topics: [
          t('c10_stp', 'Molar volume at STP',
            'What volume will 11 g of CO2 occupy at STP?', 'mole',
            'c11_chem_cbse_01_001'),
          t('c10_percent', 'Percentage composition',
            'Calculate the percentage of oxygen in CaCO3', 'mole',
            'c11_chem_cbse_01_001'),
          t('c10_molarity', 'Molarity of a solution',
            'Find the molarity of a solution containing 0.5 moles of NaOH ' +
            'dissolved in 500 mL of solution', 'mole',
            'c11_chem_cbse_01_001'),
        ],
      },
    ],
  },
  {
    key: 'c11', label: 'Class 11',
    chapters: [
      {
        key: 'c11_basic', label: 'Some Basic Concepts of Chemistry',
        topics: [
          t('c11_moles', 'Moles from mass',
            'Calculate the number of moles in 36 g of H2O', 'mole',
            'c11_chem_cbse_01_001'),
          t('c11_molarity_prep', 'Solution preparation mass',
            'Calculate the mass of NaOH required to prepare 500 mL of 0.1 M ' +
            'solution', 'mole', 'c11_chem_cbse_01_001'),
        ],
      },
      {
        key: 'c11_atom', label: 'Structure of Atom',
        topics: [
          t('c11_atomcount', 'Atoms per formula unit',
            'How many atoms are present in one formula unit of CuSO4.5H2O?',
            'atoms', 'c11_chem_cbse_02_001'),
        ],
      },
      {
        key: 'c11_states', label: 'Gaseous State',
        topics: [
          t('c11_combined', 'Combined gas equation',
            'Using the combined gas law: a gas at P1 = 2 atm, V1 = 3 L, ' +
            'T1 = 300 K is taken to V2 = 6 L and T2 = 600 K. Find P2.',
            'gas', 'c11_chem_cbse_05_001'),
          t('c11_gaylussac', "Gay-Lussac's law",
            'At constant volume, a gas at 300 K has a pressure of 1 atm. ' +
            'The temperature rises to 450 K. Find the new pressure.',
            'gas', 'c11_chem_cbse_05_001'),
        ],
      },
      {
        key: 'c11_ionic', label: 'Ionic Equilibrium',
        topics: [
          t('c11_ph', 'pH ↔ [OH-] conversion',
            'The hydroxide ion concentration of a solution is 1e-3 M. ' +
            'Calculate the pH of the solution.', 'ph',
            'c10_chem_cbse_02_001'),
        ],
      },
    ],
  },
  {
    key: 'c12', label: 'Class 12',
    chapters: [
      {
        key: 'c12_ionic', label: 'Ionic Equilibrium revisited',
        topics: [
          t('c12_ph', 'pOH ladder',
            'The pH of a solution is 5. Find the hydroxide ion concentration.',
            'ph', 'c10_chem_cbse_02_001'),
          t('c12_oh_to_ph', 'Hydroxide to pH',
            'The hydroxide ion concentration of a solution is 1e-3 M. ' +
            'Calculate the pH of the solution.', 'ph',
            'c10_chem_cbse_02_001'),
        ],
      },
      {
        key: 'c12_solutions', label: 'Solutions',
        topics: [
          t('c12_molarity', 'Moles in a solution volume',
            'How many moles of solute are in 250 mL of 0.5 M H2SO4?',
            'mole', 'c11_chem_cbse_01_001'),
        ],
      },
    ],
  },
]

/** Element data for the atom builder (Z 1-20, standard table). */
export interface ElementInfo {
  z: number
  symbol: string
  name: string
  /** standard relative atomic mass of the most common isotope */
  mass: number
}

export const ELEMENTS: ElementInfo[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', mass: 1 },
  { z: 2, symbol: 'He', name: 'Helium', mass: 4 },
  { z: 3, symbol: 'Li', name: 'Lithium', mass: 7 },
  { z: 4, symbol: 'Be', name: 'Beryllium', mass: 9 },
  { z: 5, symbol: 'B', name: 'Boron', mass: 11 },
  { z: 6, symbol: 'C', name: 'Carbon', mass: 12 },
  { z: 7, symbol: 'N', name: 'Nitrogen', mass: 14 },
  { z: 8, symbol: 'O', name: 'Oxygen', mass: 16 },
  { z: 9, symbol: 'F', name: 'Fluorine', mass: 19 },
  { z: 10, symbol: 'Ne', name: 'Neon', mass: 20 },
  { z: 11, symbol: 'Na', name: 'Sodium', mass: 23 },
  { z: 12, symbol: 'Mg', name: 'Magnesium', mass: 24 },
  { z: 13, symbol: 'Al', name: 'Aluminium', mass: 27 },
  { z: 14, symbol: 'Si', name: 'Silicon', mass: 28 },
  { z: 15, symbol: 'P', name: 'Phosphorus', mass: 31 },
  { z: 16, symbol: 'S', name: 'Sulphur', mass: 32 },
  { z: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.5 },
  { z: 18, symbol: 'Ar', name: 'Argon', mass: 40 },
  { z: 19, symbol: 'K', name: 'Potassium', mass: 39 },
  { z: 20, symbol: 'Ca', name: 'Calcium', mass: 40 },
]

/** Shell capacities by the 2n^2 rule (K L M N). */
export const SHELL_CAPACITIES = [2, 8, 18, 32]
