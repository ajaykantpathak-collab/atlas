/**
 * chemPracticalTopics.ts — corpus-grounded data for the Chemistry Practicals
 * lab (E3 bench: titration · salt analysis · gas tests).
 *
 * CLOSED WORLD: every observation, reagent, endpoint colour and misconception
 * below is traceable to an authored enhanced_nodes_md corpus node. The map:
 *
 *   TITRATION
 *     c10_chem_cbse_02_001  acids/bases, neutralisation (salt + water),
 *                           bases turn red litmus blue, Cu(OH)2 insoluble base
 *     c10_chem_cbse_02_002  acid-base indicators: phenolphthalein is
 *                           colourless in acid / pink in base (reversal is the
 *                           authored misconception), methyl orange transition
 *     c11_chem_cbse_01_013  molarity, dilution M1V1 = M2V2, 0.1 M oxalic-acid
 *                           standard solution in a 250 mL volumetric flask
 *     c11_chem_cbse_08_005  redox titration: KMnO4 is SELF-indicating, the
 *                           endpoint is the FIRST PERMANENT PALE PINK,
 *                           MnO4- purple -> Mn2+ colourless, H2SO4 (never
 *                           HCl/HNO3) as acid medium, N1V1 = N2V2 with
 *                           n-factor (MnO4- : oxalic acid = 2 : 5)
 *     c12_chem_cbse_01_004  N1V1 = N2V2 equivalence titrations; burette
 *                           readings give the volume of titrant delivered
 *
 *   SALT ANALYSIS (deterministic qualitative bench)
 *     c10_chem_cbse_01_001  signs of chemical change; heating Pb(NO3)2 gives
 *                           brown NO2 + colourless O2 that rekindles a glowing
 *                           splinter + yellow PbO residue
 *     c10_chem_cbse_01_004  thermal decomposition: green FeSO4 crystals turn
 *                           reddish-brown and release a gas with a choking
 *                           smell (2FeSO4 -> Fe2O3 + SO2 + SO3)
 *     c10_chem_cbse_01_005  displacement: iron nail in blue CuSO4 — blue
 *                           colour fades, reddish-brown copper coats the nail
 *     c10_chem_cbse_01_006  double displacement: BaCl2 + Na2SO4 -> white
 *                           BaSO4; Pb(NO3)2 + 2KI -> bright yellow PbI2;
 *                           Na2SO3 + 2HCl -> SO2 (pungent) which reduces
 *                           acidified K2Cr2O7 orange -> green; white AgCl
 *     c10_chem_cbse_02_005  acid + carbonate -> CO2 that turns lime water
 *                           milky (CaCO3 + 2HCl -> CaCl2 + H2O + CO2)
 *     c10_chem_cbse_02_009  NH4+ + OH- -> NH3 gas on warming with alkali
 *     c10_chem_cbse_03_011  white AgCl precipitate as the confirmation test
 *                           (anode-mud silver test)
 *     c10_chem_cbse_05_007  potassium gives a lilac flame (Group 1 trend)
 *
 *   GAS TESTS
 *     O2   c10_chem_cbse_01_001 (glowing splinter rekindles in O2 from lead
 *          nitrate decomposition), c8_chem_ch3_12 (splinter reignites in O2 /
 *          extinguishes in CO2)
 *     H2   c10_chem_cbse_02_004 (pop test wording: burning splint -> pop, NOT
 *          "flame extinguishes" — that is CO2), c10_chem_cbse_02_011
 *          (cathode gas burns with a pop), c9_chem_ch2_8 (H2 burns with a pop),
 *          c11_chem_cbse_09_004 (H2 balloon bursts with a pop)
 *     CO2  c10_chem_cbse_02_005 (lime water milky), c7_chem_ch02_003 (glowing
 *          splinter goes out), c8_chem_ch3_12, c11_chem_cbse_09_008
 *          (CO2 dissolved in water forms H2CO3)
 *     SO2  c10_chem_cbse_01_006 (pungent gas; reduces acidified K2Cr2O7
 *          orange -> green)
 *     NH3  c10_chem_cbse_02_009 (NH4+ + OH- -> NH3), c10_chem_cbse_02_001
 *          (bases turn red litmus blue)
 *     Cl2  c10_chem_cbse_02_011 (turns moist blue litmus red, then bleaches
 *          it white; the taught Cl2 test)
 *
 *   HONEST ABSENCE: H2S tests, Na+ flame colour, Fe(OH)2/NH3 precipitations
 *   with NaOH, SO2 + lime water and similar combos are NOT taught by any
 *   corpus node — the bench renders "not in our corpus" instead of inventing
 *   an observation. No node id, no observation.
 *
 * Deterministic simulation: the "unknown" molarities, burette correction and
 * endpoint volumes below are FIXED constants — same inputs, same run.
 */

// ------------------------------------------------------------------ bands --

export type BandKey = '9-10' | '11-12'

// -------------------------------------------------------------- titration --

export type IndicatorKey = 'phenolphthalein' | 'methyl-orange' | 'none'

export interface IndicatorSpec {
  key: IndicatorKey
  label: string
  /** colour in the acidic flask (before the endpoint) */
  acidColour: string
  /** colour once the flask has passed the endpoint (basic excess) */
  baseColour: string
  /** the permanent pale colour AT the endpoint */
  endpointColour: string
  /** colour after a clear overshoot */
  overshootColour: string
  /** corpus-taught transition description */
  transition: string
  nodeIds: string[]
}

export const INDICATORS: Record<IndicatorKey, IndicatorSpec> = {
  phenolphthalein: {
    key: 'phenolphthalein',
    label: 'Phenolphthalein',
    acidColour: '#eef2f6',   // colourless in acid
    baseColour: '#ec4899',   // pink in base
    endpointColour: '#f7a6c8', // permanent PALE pink
    overshootColour: '#ff1f8f', // hot pink = overshoot
    transition:
      'colourless in acid, pink in base (reversing these colours is the classic corpus-listed error)',
    nodeIds: ['c10_chem_cbse_02_002'],
  },
  'methyl-orange': {
    key: 'methyl-orange',
    label: 'Methyl orange',
    acidColour: '#dc2626',   // red in acid
    baseColour: '#facc15',   // yellow in base
    endpointColour: '#fb923c', // orange at the endpoint
    overshootColour: '#fde047', // bright yellow = overshoot
    transition:
      'red in acid, yellow in base — the corpus pairs it with phenolphthalein as the standard indicator pair',
    nodeIds: ['c10_chem_cbse_02_002'],
  },
  none: {
    key: 'none',
    label: 'No indicator (self-indicating KMnO₄)',
    acidColour: '#eef2f6',   // Mn2+ formed — near colourless
    baseColour: '#a21caf',   // deep purple excess
    endpointColour: '#f7a6c8', // first permanent pale pink
    overshootColour: '#7e22ce', // purple excess
    transition:
      'KMnO4 is self-indicating: purple MnO4- is decolourised to colourless Mn2+; the first permanent pale pink marks the endpoint',
    nodeIds: ['c11_chem_cbse_08_005'],
  },
}

export interface TitrationExperiment {
  key: string
  label: string
  band: BandKey
  burette: {
    label: string
    formula: string
    /** standard (known) molarity of the burette solution */
    stdM: number
    /** stoichiometric coefficient of the burette reagent in the balanced equation */
    coeff: number
    titrantColour: string
  }
  flask: {
    label: string
    formula: string
    volumeMl: number
    /** fixed deterministic "unknown" — same run every time */
    unknownM: number
    /** stoichiometric coefficient of the flask reagent */
    coeff: number
    acidMedium?: string
  }
  defaultIndicator: IndicatorKey
  allowedIndicators: IndicatorKey[]
  endpointHint: string
  /** the M1V1 = M2V2 family formula, shown in the calculation step */
  calcFormula: string
  nodeIds: string[]
}

export const TITRATION_EXPERIMENTS: TitrationExperiment[] = [
  {
    key: 'naoh-hcl',
    label: 'NaOH ⟶ HCl (standardise the acid)',
    band: '9-10',
    burette: {
      label: '0.1 M NaOH (standard)', formula: 'NaOH',
      stdM: 0.1, coeff: 1, titrantColour: '#e8eef4',
    },
    flask: {
      label: 'HCl (unknown)', formula: 'HCl',
      volumeMl: 25.0, unknownM: 0.14, coeff: 1,
    },
    defaultIndicator: 'phenolphthalein',
    allowedIndicators: ['phenolphthalein', 'methyl-orange'],
    endpointHint:
      'Run base in until the colourless acid turns a permanent PALE pink that survives 30 s of swirling.',
    calcFormula: 'M(acid) = M(base) × V(base) / V(acid)   [1 : 1 neutralisation]',
    nodeIds: ['c10_chem_cbse_02_001', 'c10_chem_cbse_02_002', 'c11_chem_cbse_01_013'],
  },
  {
    key: 'naoh-oxalic',
    label: 'NaOH ⟶ oxalic acid H₂C₂O₄',
    band: '11-12',
    burette: {
      label: '0.1 M NaOH (standard)', formula: 'NaOH',
      stdM: 0.1, coeff: 2, titrantColour: '#e8eef4',
    },
    flask: {
      label: 'oxalic acid (unknown)', formula: 'H₂C₂O₄',
      volumeMl: 25.0, unknownM: 0.05, coeff: 1,
    },
    defaultIndicator: 'phenolphthalein',
    allowedIndicators: ['phenolphthalein', 'methyl-orange'],
    endpointHint:
      '2NaOH + H₂C₂O₄ → Na₂C₂O₄ + 2H₂O — permanent pale pink endpoint.',
    calcFormula: '(M₁V₁)/2 = (M₂V₂)/1   →   M(acid) = M(base) × V(base) / (2 × V(acid))',
    nodeIds: ['c11_chem_cbse_01_013', 'c10_chem_cbse_02_002'],
  },
  {
    key: 'kmno4-oxalic',
    label: 'KMnO₄ ⟶ acidified oxalic acid (redox)',
    band: '11-12',
    burette: {
      label: '0.02 M KMnO₄ (standard)', formula: 'KMnO₄',
      stdM: 0.02, coeff: 2, titrantColour: '#a855f7',
    },
    flask: {
      label: 'oxalic acid (unknown)', formula: 'H₂C₂O₄',
      volumeMl: 25.0, unknownM: 0.05, coeff: 5,
      acidMedium: 'dil. H₂SO₄ (the corpus: never HCl or HNO₃ in permanganate work)',
    },
    defaultIndicator: 'none',
    allowedIndicators: ['none'],
    endpointHint:
      '2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O — KMnO₄ is self-indicating: endpoint = first permanent pale pink.',
    calcFormula: '(M₁V₁)/2 = (M₂V₂)/5   →   M(oxalic) = 5 × M(KMnO₄) × V(KMnO₄) / (2 × V(acid))',
    nodeIds: ['c11_chem_cbse_08_005', 'c11_chem_cbse_01_013'],
  },
]

/**
 * The equivalence volume this bench computes for an experiment —
 * V_eq = (unknownM × V_flask × buretteCoeff) / (stdM × flaskCoeff)
 * For naoh-hcl: (0.14 × 25 × 1) / (0.1 × 1) = 35.0 mL — hand-verified.
 */
export function equivalenceVolume(exp: TitrationExperiment): number {
  return (exp.flask.unknownM * exp.flask.volumeMl * exp.burette.coeff) /
    (exp.burette.stdM * exp.flask.coeff)
}

/**
 * The unknown molarity closed back from a corrected delivered volume —
 * the M1V1 = M2V2 family: moles(burette) = M·V; the flask reagent reacts in
 * the coefficient ratio, so M2 = M1 · V1 · (flaskCoeff/buretteCoeff) / V2.
 */
export function unknownMolarity(
  exp: TitrationExperiment, correctedVolumeMl: number,
): number {
  return (exp.burette.stdM * correctedVolumeMl * exp.flask.coeff) /
    (exp.burette.coeff * exp.flask.volumeMl)
}

/** Printed burette calibration offset for this bench (mL). */
export const BURETTE_CORRECTION_ML = -0.05

/** Endpoint tolerance either side of V_eq before a run counts as overshoot. */
export const OVERSHOOT_TOLERANCE_ML = 0.3

// ----------------------------------------------------------- salt analysis --

export type SaltReagentKey =
  | 'dil-hcl' | 'bacl2' | 'agno3' | 'ki' | 'naoh-warm' | 'lime-water'
  | 'dichromate-paper' | 'blue-litmus' | 'red-litmus' | 'iron-nail'
  | 'heat' | 'flame'

export const SALT_REAGENTS: { key: SaltReagentKey; label: string }[] = [
  { key: 'dil-hcl', label: 'dil. HCl' },
  { key: 'bacl2', label: 'BaCl₂ solution' },
  { key: 'agno3', label: 'AgNO₃ solution' },
  { key: 'ki', label: 'KI solution' },
  { key: 'naoh-warm', label: 'NaOH + warm' },
  { key: 'lime-water', label: 'lime water' },
  { key: 'dichromate-paper', label: 'acidified K₂Cr₂O₇ paper' },
  { key: 'blue-litmus', label: 'moist blue litmus' },
  { key: 'red-litmus', label: 'moist red litmus' },
  { key: 'iron-nail', label: 'clean iron nail' },
  { key: 'heat', label: 'heat the solid' },
  { key: 'flame', label: 'flame test' },
]

export type ObservationKind = 'positive' | 'negative' | 'absent'

export interface Observation {
  kind: ObservationKind
  text: string
  nodeIds: string[]
}

export interface SaltSpec {
  key: string
  formula: string
  name: string
  solutionColour: string
  cation: string
  anion: string
  /** node the salt's tests are anchored to (drives MisconceptionPanel) */
  primaryNodeId: string
  /** authored confusion for the most likely wrong radical call */
  confusion: { wrongIon: string; text: string; nodeIds: string[] }
  results: Partial<Record<SaltReagentKey, Observation>>
}

/** shared honest-absence observation — closed world, no invented chemistry */
export const NOT_IN_CORPUS: Observation = {
  kind: 'absent',
  text: 'Not in our corpus — no observation available for this combination.',
  nodeIds: [],
}

export const SALTS: SaltSpec[] = [
  {
    key: 'na2co3', formula: 'Na₂CO₃', name: 'sodium carbonate',
    solutionColour: '#eef2f6', cation: 'Na⁺', anion: 'CO₃²⁻',
    primaryNodeId: 'c10_chem_cbse_02_005',
    confusion: {
      wrongIon: 'SO₃²⁻',
      text: 'Both carbonates and sulphites fizz with an acid, but the tests separate them: CO₂ is odourless and turns lime water milky, while SO₂ is pungent and turns acidified K₂Cr₂O₇ from orange to green. Your gas was odourless and milky-tested — that is CO₂ from a carbonate.',
      nodeIds: ['c10_chem_cbse_02_005', 'c10_chem_cbse_01_006'],
    },
    results: {
      'dil-hcl': {
        kind: 'positive',
        text: 'Brisk effervescence of a colourless, odourless gas (CO₂): acid + metal carbonate → salt + H₂O + CO₂↑.',
        nodeIds: ['c10_chem_cbse_02_005'],
      },
      'lime-water': {
        kind: 'positive',
        text: 'The gas turns lime water milky — the taught confirmation for CO₂ (CaCO₃ precipitating).',
        nodeIds: ['c10_chem_cbse_02_005'],
      },
      flame: NOT_IN_CORPUS,   // Na flame colour is not authored in the corpus
      'agno3': NOT_IN_CORPUS,
      bacl2: NOT_IN_CORPUS,
    },
  },
  {
    key: 'na2so4', formula: 'Na₂SO₄', name: 'sodium sulphate',
    solutionColour: '#eef2f6', cation: 'Na⁺', anion: 'SO₄²⁻',
    primaryNodeId: 'c10_chem_cbse_01_006',
    confusion: {
      wrongIon: 'SO₃²⁻',
      text: 'A sulphite would release pungent SO₂ with dil. HCl (orange → green in acidified K₂Cr₂O₇). Your acid test gave no gas, and BaCl₂ gave the white BaSO₄ precipitate — that is the sulphate confirmation, not a sulphite.',
      nodeIds: ['c10_chem_cbse_01_006'],
    },
    results: {
      bacl2: {
        kind: 'positive',
        text: 'White precipitate of BaSO₄, insoluble in the mixture — Ba²⁺ + SO₄²⁻ → BaSO₄↓.',
        nodeIds: ['c10_chem_cbse_01_006'],
      },
      'dil-hcl': {
        kind: 'negative',
        text: 'No effervescence — a sulphate does not release gas with dilute HCl.',
        nodeIds: ['c10_chem_cbse_01_006'],
      },
      flame: NOT_IN_CORPUS,
      ki: NOT_IN_CORPUS,
    },
  },
  {
    key: 'na2so3', formula: 'Na₂SO₃', name: 'sodium sulphite',
    solutionColour: '#eef2f6', cation: 'Na⁺', anion: 'SO₃²⁻',
    primaryNodeId: 'c10_chem_cbse_01_006',
    confusion: {
      wrongIon: 'CO₃²⁻',
      text: 'The gas from your acid test was NOT the carbonate gas: CO₂ is odourless and turns lime water milky, but yours was pungent and decolourised acidified K₂Cr₂O₇ orange → green — that is SO₂ from a sulphite (Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂↑).',
      nodeIds: ['c10_chem_cbse_01_006', 'c10_chem_cbse_02_005'],
    },
    results: {
      'dil-hcl': {
        kind: 'positive',
        text: 'Pungent, choking gas evolves (SO₂): Na₂SO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + SO₂(g).',
        nodeIds: ['c10_chem_cbse_01_006'],
      },
      'dichromate-paper': {
        kind: 'positive',
        text: 'The acidified K₂Cr₂O₇ paper turns from orange to green — SO₂ reduces Cr₂O₇²⁻ to Cr³⁺.',
        nodeIds: ['c10_chem_cbse_01_006'],
      },
      'lime-water': NOT_IN_CORPUS, // SO2 + lime water is not authored in the corpus
      bacl2: NOT_IN_CORPUS,
      flame: NOT_IN_CORPUS,
    },
  },
  {
    key: 'pbno32', formula: 'Pb(NO₃)₂', name: 'lead(II) nitrate',
    solutionColour: '#eef2f6', cation: 'Pb²⁺', anion: 'NO₃⁻',
    primaryNodeId: 'c10_chem_cbse_01_006',
    confusion: {
      wrongIon: 'Cl⁻',
      text: 'Chloride salts are confirmed by the white AgCl precipitate. Your yellow precipitate is PbI₂ — bright yellow with KI is the taught lead(II) test (Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃).',
      nodeIds: ['c10_chem_cbse_01_006', 'c10_chem_cbse_03_011'],
    },
    results: {
      ki: {
        kind: 'positive',
        text: 'Bright yellow precipitate of lead(II) iodide: Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂↓(s) + 2KNO₃(aq).',
        nodeIds: ['c10_chem_cbse_01_006'],
      },
      heat: {
        kind: 'positive',
        text: 'Brown gas (NO₂) evolves, a colourless gas that rekindles a glowing splinter (O₂) escapes, and a yellow residue (PbO) remains.',
        nodeIds: ['c10_chem_cbse_01_001'],
      },
      agno3: NOT_IN_CORPUS,
      flame: NOT_IN_CORPUS,
    },
  },
  {
    key: 'nacl', formula: 'NaCl', name: 'sodium chloride',
    solutionColour: '#eef2f6', cation: 'Na⁺', anion: 'Cl⁻',
    primaryNodeId: 'c10_chem_cbse_03_011',
    confusion: {
      wrongIon: 'SO₄²⁻',
      text: 'BaCl₂ gives a white BaSO₄ precipitate only with a sulphate — you never ran BaCl₂ here. The white precipitate you DID see was with AgNO₃: white AgCl is the chloride confirmation.',
      nodeIds: ['c10_chem_cbse_03_011', 'c10_chem_cbse_01_006'],
    },
    results: {
      agno3: {
        kind: 'positive',
        text: 'White precipitate of AgCl — Ag⁺ + Cl⁻ → AgCl↓ (the taught chloride confirmation).',
        nodeIds: ['c10_chem_cbse_03_011', 'c10_chem_cbse_01_006'],
      },
      'dil-hcl': {
        kind: 'negative',
        text: 'No effervescence — a simple chloride does not release gas with dilute HCl.',
        nodeIds: ['c10_chem_cbse_02_005'],
      },
      'naoh-warm': {
        kind: 'negative',
        text: 'No pungent gas on warming — Na⁺ salts give no ammonia with alkali.',
        nodeIds: ['c10_chem_cbse_02_009'],
      },
      flame: NOT_IN_CORPUS,   // Na flame colour is not authored in the corpus
      ki: NOT_IN_CORPUS,
    },
  },
  {
    key: 'kcl', formula: 'KCl', name: 'potassium chloride',
    solutionColour: '#eef2f6', cation: 'K⁺', anion: 'Cl⁻',
    primaryNodeId: 'c10_chem_cbse_05_007',
    confusion: {
      wrongIon: 'Na⁺',
      text: 'Both NaCl and KCl give the white AgCl precipitate — the anion test cannot tell them apart. The cation is the flame: potassium colours it lilac. (The corpus does not author a sodium flame colour, so the lilac flame is the usable discriminator here.)',
      nodeIds: ['c10_chem_cbse_05_007', 'c10_chem_cbse_03_011'],
    },
    results: {
      agno3: {
        kind: 'positive',
        text: 'White precipitate of AgCl — same chloride confirmation as NaCl.',
        nodeIds: ['c10_chem_cbse_03_011'],
      },
      flame: {
        kind: 'positive',
        text: 'Lilac flame — the corpus-taught potassium colour.',
        nodeIds: ['c10_chem_cbse_05_007'],
      },
      'naoh-warm': {
        kind: 'negative',
        text: 'No pungent gas on warming — K⁺ salts give no ammonia with alkali.',
        nodeIds: ['c10_chem_cbse_02_009'],
      },
      ki: NOT_IN_CORPUS,
    },
  },
  {
    key: 'feso4', formula: 'FeSO₄', name: 'iron(II) sulphate',
    solutionColour: '#d7e8c9', cation: 'Fe²⁺', anion: 'SO₄²⁻',
    primaryNodeId: 'c10_chem_cbse_01_004',
    confusion: {
      wrongIon: 'Cu²⁺',
      text: 'Copper(II) salts are blue, and Cu²⁺ is identified by the iron-nail displacement (blue fades, reddish-brown copper coats the nail). Your salt is pale GREEN, and heating turned the crystals reddish-brown with a choking smell — the taught FeSO₄ decomposition (2FeSO₄ → Fe₂O₃ + SO₂ + SO₃).',
      nodeIds: ['c10_chem_cbse_01_004', 'c10_chem_cbse_01_005'],
    },
    results: {
      heat: {
        kind: 'positive',
        text: 'Green crystals turn reddish-brown and release a gas with a choking smell — 2FeSO₄(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g).',
        nodeIds: ['c10_chem_cbse_01_004'],
      },
      bacl2: {
        kind: 'positive',
        text: 'White precipitate of BaSO₄ — the sulphate anion confirmation.',
        nodeIds: ['c10_chem_cbse_01_006'],
      },
      'iron-nail': {
        kind: 'negative',
        text: 'No change — the nail is iron itself; a displacement needs a MORE reactive metal.',
        nodeIds: ['c10_chem_cbse_01_005'],
      },
      'naoh-warm': NOT_IN_CORPUS, // Fe(OH)2 green ppt is not authored in the corpus
      flame: NOT_IN_CORPUS,
    },
  },
  {
    key: 'cuso4', formula: 'CuSO₄', name: 'copper(II) sulphate',
    solutionColour: '#7db8e8', cation: 'Cu²⁺', anion: 'SO₄²⁻',
    primaryNodeId: 'c10_chem_cbse_01_005',
    confusion: {
      wrongIon: 'Fe²⁺',
      text: 'Iron(II) sulphate is pale green and is confirmed by heating (green → reddish-brown, choking smell). Your solution is BLUE and the clean iron nail grew a reddish-brown copper coating while the blue faded — Fe displaces Cu²⁺ (Fe + CuSO₄ → FeSO₄ + Cu), so the salt is copper(II) sulphate.',
      nodeIds: ['c10_chem_cbse_01_005', 'c10_chem_cbse_01_004'],
    },
    results: {
      'iron-nail': {
        kind: 'positive',
        text: 'The blue colour fades and a reddish-brown coating of copper forms on the nail — Fe (more reactive) displaces Cu.',
        nodeIds: ['c10_chem_cbse_01_005'],
      },
      bacl2: {
        kind: 'positive',
        text: 'White precipitate of BaSO₄ — the sulphate anion confirmation.',
        nodeIds: ['c10_chem_cbse_01_006'],
      },
      heat: NOT_IN_CORPUS,   // blue→white anhydrous CuSO4 is not authored in the corpus
      flame: NOT_IN_CORPUS,
    },
  },
  {
    key: 'nh4cl', formula: 'NH₄Cl', name: 'ammonium chloride',
    solutionColour: '#eef2f6', cation: 'NH₄⁺', anion: 'Cl⁻',
    primaryNodeId: 'c10_chem_cbse_02_009',
    confusion: {
      wrongIon: 'Na⁺',
      text: 'Your warm NaOH test released a pungent gas that turned moist red litmus blue — NH₄⁺ + OH⁻ → NH₃↑ + H₂O. A sodium salt gives no such gas. The white AgCl precipitate confirms the chloride half (NH₄Cl → NH₄⁺ + Cl⁻).',
      nodeIds: ['c10_chem_cbse_02_009', 'c10_chem_cbse_02_001', 'c10_chem_cbse_03_011'],
    },
    results: {
      'naoh-warm': {
        kind: 'positive',
        text: 'Pungent gas evolves on warming and turns moist red litmus blue — NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l).',
        nodeIds: ['c10_chem_cbse_02_009', 'c10_chem_cbse_02_001'],
      },
      agno3: {
        kind: 'positive',
        text: 'White precipitate of AgCl — the chloride anion confirmation.',
        nodeIds: ['c10_chem_cbse_03_011', 'c10_chem_cbse_01_006'],
      },
      'red-litmus': {
        kind: 'negative',
        text: 'No change without warming with alkali — NH₃ is only driven off by the NaOH reaction.',
        nodeIds: ['c10_chem_cbse_02_009'],
      },
      flame: NOT_IN_CORPUS,
      ki: NOT_IN_CORPUS,
    },
  },
]

export const CATION_OPTIONS = ['Na⁺', 'K⁺', 'Pb²⁺', 'Fe²⁺', 'Cu²⁺', 'NH₄⁺']
export const ANION_OPTIONS = ['Cl⁻', 'CO₃²⁻', 'SO₄²⁻', 'SO₃²⁻', 'NO₃⁻']

// -------------------------------------------------------------- gas tests --

export interface GasDef {
  key: string
  formula: string
  name: string
  chipColour: string
  /** false → the gas is rendered but greyed with the honest-absence note */
  available: boolean
  corpusNote: string
}

export const GASES: GasDef[] = [
  {
    key: 'o2', formula: 'O₂', name: 'oxygen', chipColour: '#fcd34d',
    available: true,
    corpusNote: 'O₂ rekindles a glowing splinter (lead nitrate decomposition worked example; O₂ vs CO₂ jar test).',
  },
  {
    key: 'h2', formula: 'H₂', name: 'hydrogen', chipColour: '#fde68a',
    available: true,
    corpusNote: 'H₂ burns with a pop sound when a burning splint is applied.',
  },
  {
    key: 'co2', formula: 'CO₂', name: 'carbon dioxide', chipColour: '#d1d5db',
    available: true,
    corpusNote: 'CO₂ turns lime water milky and extinguishes a glowing splinter.',
  },
  {
    key: 'so2', formula: 'SO₂', name: 'sulphur dioxide', chipColour: '#fca5a5',
    available: true,
    corpusNote: 'SO₂ is pungent and reduces acidified K₂Cr₂O₇ orange → green.',
  },
  {
    key: 'nh3', formula: 'NH₃', name: 'ammonia', chipColour: '#a7f3d0',
    available: true,
    corpusNote: 'NH₃ is the alkali gas: it turns moist red litmus blue.',
  },
  {
    key: 'cl2', formula: 'Cl₂', name: 'chlorine', chipColour: '#86efac',
    available: true,
    corpusNote: 'Cl₂ turns moist blue litmus red and then bleaches it white.',
  },
  {
    key: 'h2s', formula: 'H₂S', name: 'hydrogen sulphide', chipColour: '#94a3b8',
    available: false,
    corpusNote: 'Honest absence: no corpus node teaches an H₂S gas test, so this bench makes no claim about it.',
  },
]

export const GAS_TESTS: { key: string; label: string }[] = [
  { key: 'glowing-splint', label: 'glowing splint' },
  { key: 'burning-splint', label: 'burning splint' },
  { key: 'lime-water', label: 'lime water' },
  { key: 'blue-litmus', label: 'moist blue litmus' },
  { key: 'red-litmus', label: 'moist red litmus' },
  { key: 'dichromate-paper', label: 'acidified K₂Cr₂O₇ paper' },
]

export const GAS_MATRIX: Record<string, Partial<Record<string, Observation>>> = {
  o2: {
    'glowing-splint': {
      kind: 'positive',
      text: 'The glowing splint rekindles and burns much more brightly — O₂ supports combustion.',
      nodeIds: ['c10_chem_cbse_01_001', 'c8_chem_ch3_12'],
    },
    'burning-splint': {
      kind: 'positive',
      text: 'The splint burns much more brightly — oxygen supports combustion.',
      nodeIds: ['c8_chem_ch3_12'],
    },
    'lime-water': {
      kind: 'negative',
      text: 'No change — lime water is the specific test for CO₂, not for O₂.',
      nodeIds: ['c10_chem_cbse_02_005'],
    },
    'blue-litmus': {
      kind: 'negative',
      text: 'No change — O₂ is not an acidic gas.',
      nodeIds: ['c10_chem_cbse_02_001'],
    },
    'red-litmus': {
      kind: 'negative',
      text: 'No change — O₂ is not a basic gas.',
      nodeIds: ['c10_chem_cbse_02_001'],
    },
    'dichromate-paper': {
      kind: 'negative',
      text: 'No change — O₂ does not reduce acidified K₂Cr₂O₇.',
      nodeIds: ['c10_chem_cbse_01_006'],
    },
  },
  h2: {
    'burning-splint': {
      kind: 'positive',
      text: 'The gas burns with a squeaky POP — the taught hydrogen test (2H₂ + O₂ → 2H₂O).',
      nodeIds: ['c10_chem_cbse_02_004', 'c10_chem_cbse_02_011', 'c9_chem_ch2_8', 'c11_chem_cbse_09_004'],
    },
    'glowing-splint': {
      kind: 'negative',
      text: 'No observation — the corpus only authors the pop test for H₂ (a burning splint), not a glowing-splint claim.',
      nodeIds: ['c10_chem_cbse_02_004'],
    },
    'lime-water': {
      kind: 'negative',
      text: 'No change — lime water is the specific test for CO₂, not for H₂.',
      nodeIds: ['c10_chem_cbse_02_005'],
    },
    'blue-litmus': {
      kind: 'negative',
      text: 'No change — H₂ is neither acidic nor basic.',
      nodeIds: ['c10_chem_cbse_02_001'],
    },
    'red-litmus': {
      kind: 'negative',
      text: 'No change — H₂ is neither acidic nor basic.',
      nodeIds: ['c10_chem_cbse_02_001'],
    },
    'dichromate-paper': {
      kind: 'negative',
      text: 'No change — H₂ does not reduce acidified K₂Cr₂O₇ in this test.',
      nodeIds: ['c10_chem_cbse_01_006'],
    },
  },
  co2: {
    'lime-water': {
      kind: 'positive',
      text: 'Lime water turns milky — CO₂ + Ca(OH)₂ → CaCO₃ (the taught confirmation).',
      nodeIds: ['c10_chem_cbse_02_005'],
    },
    'glowing-splint': {
      kind: 'positive',
      text: 'The glowing splint immediately goes out — CO₂ does not support combustion.',
      nodeIds: ['c7_chem_ch02_003', 'c8_chem_ch3_12'],
    },
    'burning-splint': {
      kind: 'positive',
      text: 'The flame is extinguished — CO₂ blankets the flame. (It does NOT pop: the pop test belongs to H₂.)',
      nodeIds: ['c8_chem_ch3_12', 'c10_chem_cbse_02_004'],
    },
    'blue-litmus': {
      kind: 'positive',
      text: 'Turns red — dissolved CO₂ forms H₂CO₃ (carbonic acid), and acids turn blue litmus red.',
      nodeIds: ['c11_chem_cbse_09_008', 'c10_chem_cbse_02_001'],
    },
    'red-litmus': {
      kind: 'negative',
      text: 'No change — CO₂ solution is acidic, not basic.',
      nodeIds: ['c10_chem_cbse_02_001'],
    },
    'dichromate-paper': {
      kind: 'negative',
      text: 'No change — CO₂ does not reduce acidified K₂Cr₂O₇ (that is SO₂).',
      nodeIds: ['c10_chem_cbse_01_006'],
    },
  },
  so2: {
    'dichromate-paper': {
      kind: 'positive',
      text: 'The acidified K₂Cr₂O₇ paper turns from orange to green — SO₂ reduces Cr₂O₇²⁻ to Cr³⁺.',
      nodeIds: ['c10_chem_cbse_01_006'],
    },
    'lime-water': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for SO₂ + lime water.',
      nodeIds: [],
    },
    'blue-litmus': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for SO₂ + litmus.',
      nodeIds: [],
    },
    'red-litmus': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for SO₂ + litmus.',
      nodeIds: [],
    },
    'glowing-splint': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for SO₂ + splint.',
      nodeIds: [],
    },
    'burning-splint': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for SO₂ + splint.',
      nodeIds: [],
    },
  },
  nh3: {
    'red-litmus': {
      kind: 'positive',
      text: 'Turns moist red litmus blue — NH₃ is the common basic gas (bases turn red litmus blue).',
      nodeIds: ['c10_chem_cbse_02_001', 'c10_chem_cbse_02_009'],
    },
    'blue-litmus': {
      kind: 'negative',
      text: 'Stays blue — bases turn red litmus blue and leave blue litmus unchanged.',
      nodeIds: ['c10_chem_cbse_02_001'],
    },
    'lime-water': {
      kind: 'negative',
      text: 'No change — lime water is the specific test for CO₂, not for NH₃.',
      nodeIds: ['c10_chem_cbse_02_005'],
    },
    'dichromate-paper': {
      kind: 'negative',
      text: 'No change — NH₃ does not reduce acidified K₂Cr₂O₇ in this test.',
      nodeIds: ['c10_chem_cbse_01_006'],
    },
    'glowing-splint': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for NH₃ + splint.',
      nodeIds: [],
    },
    'burning-splint': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for NH₃ + splint.',
      nodeIds: [],
    },
  },
  cl2: {
    'blue-litmus': {
      kind: 'positive',
      text: 'Turns moist blue litmus red and then BLEACHES it white — the taught chlorine test from the chlor-alkali experiment.',
      nodeIds: ['c10_chem_cbse_02_011'],
    },
    'red-litmus': {
      kind: 'positive',
      text: 'Bleaches moist red litmus white — the same bleaching action the corpus teaches for Cl₂.',
      nodeIds: ['c10_chem_cbse_02_011'],
    },
    'lime-water': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for Cl₂ + lime water.',
      nodeIds: [],
    },
    'glowing-splint': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for Cl₂ + splint.',
      nodeIds: [],
    },
    'burning-splint': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for Cl₂ + splint.',
      nodeIds: [],
    },
    'dichromate-paper': {
      kind: 'absent',
      text: 'Not in our corpus — no observation available for Cl₂ + K₂Cr₂O₇ paper.',
      nodeIds: [],
    },
  },
  // H2S — honest absence across the whole row; the corpus teaches no H2S test.
}

/** CO₂ + burning splint triggers the corpus's own pop-vs-extinguish confusion. */
export const POP_VS_EXTINGUISH_NODE = 'c10_chem_cbse_02_004'

export const POP_VS_EXTINGUISH_TEXT =
  'The corpus is explicit: "A burning splint produces a pop sound" is the HYDROGEN test — "flame extinguishes" is the CO₂ observation. Swapping these two is the exact wrong-state the acids-and-metals node flags.'
