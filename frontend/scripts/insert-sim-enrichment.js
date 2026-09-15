// Insert SCENARIO, DISCOVERY_QUESTION, WORKSTATIONS_INFO, MISCONCEPTIONS, and Misconception interface
// into all 12 CBSE chemistry sims, plus add the JSX rendering for misconceptions

const fs = require('fs');
const path = require('path');

const SIMS_DIR = 'D:\\platform\\frontend\\components\\simulations\\c6_12';
const MISC_FILE = path.join(__dirname, 'cbse-chem-misconceptions.json');
const misconceptionsData = JSON.parse(fs.readFileSync(MISC_FILE, 'utf8'));

// Scenario and discovery question data for each sim
const enrichmentData = {
  'C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim': {
    scenario: {
      title: 'CBSE Class 11 Organic Chemistry Foundations Lab',
      subtitle: 'Master Hybridization, Nomenclature, and Purification Techniques',
      description: 'Step into a virtual organic chemistry lab where you explore hybridization, IUPAC nomenclature, resonance effects, and purification methods including distillation and chromatography.',
    },
    discovery: {
      title: 'Discovery Challenge: The Hybridization Mystery',
      question: 'A carbon atom in methane (CH4) has 4 equivalent C-H bonds, but the 2s and 2p orbitals have different energies. How does carbon form 4 identical bonds?',
      options: [
        'Carbon uses only the 2p orbitals, leaving 2s empty',
        'Carbon promotes one 2s electron to 2p and mixes all four orbitals (sp3 hybridization)',
        'Carbon forms 4 bonds using only 2s orbital overlap',
        'Carbon uses 2s for 2 bonds and 2p for the other 2 bonds',
      ],
      correctIndex: 1,
      explanation: 'Carbon promotes a 2s electron to the empty 2p orbital, then mixes one 2s and three 2p orbitals to form four equivalent sp3 hybrid orbitals, each with 25% s-character and 75% p-character, arranged tetrahedrally at 109.5°.',
    },
    workstations: [
      { id: 'hybridization', name: 'Hybridization Lab', description: 'Explore sp, sp2, sp3 hybridization and molecular geometry.' },
      { id: 'nomenclature', name: 'IUPAC Nomenclature Station', description: 'Practice naming alkanes, alkenes, and functional group compounds.' },
      { id: 'effects', name: 'Electronic Effects Lab', description: 'Study inductive, resonance, and electromeric effects.' },
      { id: 'purification', name: 'Purification Techniques Lab', description: 'Master distillation, sublimation, crystallization, and chromatography.' },
    ],
  },
  'C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim': {
    scenario: {
      title: 'CBSE Class 11 Organic Chemistry Analysis Lab',
      subtitle: 'Master Qualitative and Quantitative Analysis of Organic Compounds',
      description: 'Step into a virtual analytical lab where you perform Lassaigne tests, estimate elements quantitatively, and calculate empirical and molecular formulas.',
    },
    discovery: {
      title: 'Discovery Challenge: The Lassaigne Test Puzzle',
      question: 'In the Lassaigne test, why is sodium metal used to fuse the organic compound, and what happens if the compound contains nitrogen but the fusion is incomplete?',
      options: [
        'Sodium acts as a catalyst; incomplete fusion gives a false positive for sulphur',
        'Sodium converts covalent N, S, X to ionic NaCN, Na2S, NaX; incomplete fusion gives a false negative for nitrogen',
        'Sodium dissolves the compound; incomplete fusion has no effect on results',
        'Sodium reduces the compound; incomplete fusion gives a false positive for halogens',
      ],
      correctIndex: 1,
      explanation: 'Sodium metal reacts with covalently bonded N, S, and X in organic compounds during fusion to produce ionic NaCN, Na2S, and NaX respectively. If fusion is incomplete, insufficient NaCN forms, leading to a false negative in the Prussian blue test for nitrogen.',
    },
    workstations: [
      { id: 'detection', name: 'Element Detection Lab', description: 'Perform Lassaigne tests for N, S, X, and P.' },
      { id: 'quantitative', name: 'Quantitative Analysis Station', description: 'Estimate C, H, N, and halogens by mass.' },
      { id: 'formula', name: 'Formula Calculation Lab', description: 'Calculate empirical and molecular formulas from percentage composition.' },
      { id: 'effects', name: 'Electronic Effects Lab', description: 'Study inductive, resonance, electromeric effects, and hyperconjugation.' },
    ],
  },
  'C11_ChemistryRedoxReactionsCBSESim': {
    scenario: {
      title: 'CBSE Class 11 Redox Reactions Electrochemistry Lab',
      subtitle: 'Master Oxidation States, Balancing, and Electrochemical Cells',
      description: 'Step into a virtual electrochemistry lab where you balance redox equations, build Daniell cells, and explore standard electrode potentials.',
    },
    discovery: {
      title: 'Discovery Challenge: The Rusting Iron Mystery',
      question: 'Iron rusts when exposed to air and moisture, forming Fe2O3·xH2O. Is this an oxidation, reduction, or redox process, and which species is the oxidizing agent?',
      options: [
        'Only oxidation of Fe; water is the oxidizing agent',
        'Only reduction of O2; iron is the oxidizing agent',
        'Redox process; Fe is oxidized (loses electrons) and O2 is reduced (gains electrons). O2 is the oxidizing agent',
        'Redox process; Fe is reduced and O2 is oxidized',
      ],
      correctIndex: 2,
      explanation: 'Rusting is a redox process: Fe(0) is oxidized to Fe(+3), losing electrons. O2(0) is reduced to O(-2) in Fe2O3, gaining those electrons. Oxygen is the oxidizing agent (accepts electrons), and iron is the reducing agent (donates electrons).',
    },
    workstations: [
      { id: 'oxidation_states', name: 'Oxidation States Lab', description: 'Assign and calculate oxidation numbers in compounds.' },
      { id: 'balancing', name: 'Redox Balancing Station', description: 'Balance redox equations using half-reaction and oxidation number methods.' },
      { id: 'electrochemical', name: 'Electrochemical Cell Lab', description: 'Build Daniell cells and measure standard electrode potentials.' },
      { id: 'displacement', name: 'Displacement Reactions Lab', description: 'Explore metal displacement and reactivity series.' },
    ],
  },
  'C11_ChemistrySomeBasicConceptsofChemistryCBSESim': {
    scenario: {
      title: 'CBSE Class 11 Chemistry Foundations Lab',
      subtitle: 'Master the Mole Concept, Stoichiometry, and Concentration Units',
      description: 'Step into a virtual chemistry lab where you calculate moles, prepare solutions of specific molarity, and solve stoichiometry problems with limiting reagents.',
    },
    discovery: {
      title: 'Discovery Challenge: The Mole Puzzle',
      question: 'One mole of any substance contains the same number of particles (Avogadro number, 6.022×10²³). Do 1 mole of H₂ gas and 1 mole of O₂ gas have the same mass?',
      options: [
        'Yes, because they have the same number of molecules',
        'No, because 1 mole of H₂ = 2g and 1 mole of O₂ = 32g. Mass depends on molecular weight, not number of particles',
        'Yes, because both are gases at STP',
        'No, because H₂ has 2 atoms and O₂ has 2 atoms but different volumes',
      ],
      correctIndex: 1,
      explanation: 'The mole concept relates to the NUMBER of particles (6.022×10²³), not mass. Mass of 1 mole = molar mass. H₂ has molar mass 2 g/mol, O₂ has 32 g/mol. So 1 mole of H₂ weighs 2g and 1 mole of O₂ weighs 32g, despite having the same number of molecules.',
    },
    workstations: [
      { id: 'mole', name: 'Mole Concept Lab', description: 'Calculate moles from mass and vice versa using molar mass.' },
      { id: 'concentration', name: 'Concentration Station', description: 'Prepare solutions with specific molarity, molality, and mole fraction.' },
      { id: 'stoichiometry', name: 'Stoichiometry Lab', description: 'Balance equations and calculate reactant/product quantities.' },
      { id: 'limiting', name: 'Limiting Reagent Lab', description: 'Identify limiting reagents and calculate excess reactant.' },
    ],
  },
  'C11_ChemistryThermodynamicsCBSESim': {
    scenario: {
      title: 'CBSE Class 11 Thermodynamics Lab',
      subtitle: 'Master Enthalpy, Entropy, and Gibbs Free Energy',
      description: 'Step into a virtual thermodynamics lab where you measure heat changes, apply Hess law, and predict reaction spontaneity using Gibbs energy.',
    },
    discovery: {
      title: 'Discovery Challenge: The Spontaneous Ice Melting',
      question: 'Ice melts at 0°C spontaneously, absorbing heat from surroundings (endothermic, ΔH > 0). How can a process be spontaneous if it absorbs heat?',
      options: [
        'It cannot be spontaneous; melting must be non-spontaneous',
        'Spontaneity depends on ΔG = ΔH - TΔS, not just ΔH. At T > 273K, the entropy increase (ΔS > 0) makes TΔS > ΔH, so ΔG < 0',
        'Ice melting is actually exothermic',
        'Spontaneity depends only on enthalpy change',
      ],
      correctIndex: 1,
      explanation: 'Spontaneity is determined by Gibbs free energy (ΔG = ΔH - TΔS), not enthalpy alone. Ice melting is endothermic (ΔH > 0) but also increases entropy (ΔS > 0). Above 273K, the TΔS term exceeds ΔH, making ΔG negative and the process spontaneous.',
    },
    workstations: [
      { id: 'enthalpy', name: 'Enthalpy Lab', description: 'Measure enthalpy changes in combustion, formation, and phase transitions.' },
      { id: 'hess', name: "Hess's Law Station", description: 'Apply Hess law to calculate enthalpy changes indirectly.' },
      { id: 'entropy', name: 'Entropy Lab', description: 'Calculate entropy changes and predict disorder.' },
      { id: 'gibbs', name: 'Gibbs Energy Lab', description: 'Use ΔG = ΔH - TΔS to predict spontaneity.' },
    ],
  },
  'C12_ChemistryAldehydesKetonesandCarboxylicACBSESim': {
    scenario: {
      title: 'CBSE Class 12 Aldehydes, Ketones & Carboxylic Acids Lab',
      subtitle: 'Master Carbonyl Chemistry, Nucleophilic Addition, and Aldol Condensation',
      description: 'Step into a virtual organic synthesis lab where you prepare aldehydes and ketones, run nucleophilic addition reactions, and perform Aldol condensation.',
    },
    discovery: {
      title: 'Discovery Challenge: The Carbonyl Reactivity Puzzle',
      question: 'Why are aldehydes more reactive than ketones toward nucleophilic addition reactions?',
      options: [
        'Aldehydes have lower molecular weight',
        'Aldehydes have one alkyl group (electron-donating) vs ketones with two, so aldehydes have less steric hindrance and more electrophilic carbonyl carbon',
        'Aldehydes are more acidic than ketones',
        'Ketones have stronger C=O bonds than aldehydes',
      ],
      correctIndex: 1,
      explanation: 'Aldehydes are more reactive because: (1) Steric factor - aldehydes have only one alkyl group vs two in ketones, making the carbonyl carbon more accessible. (2) Electronic factor - alkyl groups are electron-donating, reducing the electrophilicity of the carbonyl carbon. Ketones with two alkyl groups have less electrophilic carbon.',
    },
    workstations: [
      { id: 'preparation', name: 'Preparation Lab', description: 'Prepare aldehydes by Rosenmund reduction and ketones from acyl chlorides.' },
      { id: 'addition', name: 'Nucleophilic Addition Lab', description: 'Run HCN, NaHSO3, and Grignard addition reactions.' },
      { id: 'condensation', name: 'Aldol & Cannizzaro Lab', description: 'Perform Aldol condensation and Cannizzaro reactions.' },
      { id: 'acidity', name: 'Carboxylic Acid Acidity Lab', description: 'Study acidity of carboxylic acids and substituent effects.' },
    ],
  },
  'C12_ChemistryAminesandDiazoniumSaltsCBSESim': {
    scenario: {
      title: 'CBSE Class 12 Amines & Diazonium Salts Lab',
      subtitle: 'Master Amine Basicity, Gabriel Synthesis, and Diazotization',
      description: 'Step into a virtual organic lab where you prepare amines via Gabriel synthesis, test basicity, and synthesize diazonium salts for azo dye formation.',
    },
    discovery: {
      title: 'Discovery Challenge: The Basicity Paradox',
      question: 'In aqueous solution, the basicity order of amines is R2NH > RNH2 > R3N (2° > 1° > 3°). Why are tertiary amines less basic than secondary amines despite having more electron-donating groups?',
      options: [
        'Tertiary amines have no lone pair on nitrogen',
        'The +I effect of three alkyl groups increases electron density, but steric hindrance and poor solvation of the bulky R3NH+ ion outweigh the electronic effect in water',
        'Tertiary amines are always gases, so they cannot be basic in solution',
        'Tertiary amines undergo elimination instead of acting as bases',
      ],
      correctIndex: 1,
      explanation: 'In aqueous solution, three factors compete: (1) +I effect (more alkyl groups = more basic), (2) steric hindrance (bulky groups block protonation), (3) solvation (R3NH+ is poorly solvated by water due to steric shielding). For 3° amines, steric hindrance and poor solvation outweigh the +I effect, making them less basic than 2° amines.',
    },
    workstations: [
      { id: 'preparation', name: 'Amine Preparation Lab', description: 'Prepare amines by reduction, Gabriel synthesis, and Hoffmann degradation.' },
      { id: 'basicity', name: 'Basicity Testing Lab', description: 'Compare basicity of 1°, 2°, 3° amines using Kb and pKb.' },
      { id: 'reactions', name: 'Amine Reactions Lab', description: 'Run carbylamine test, alkylation, acylation, and nitrous acid reactions.' },
      { id: 'diazonium', name: 'Diazonium Salt Lab', description: 'Synthesize diazonium salts at 0-5°C and perform Sandmeyer, Gattermann, and coupling reactions.' },
    ],
  },
  'C12_ChemistryBiomoleculesCBSESim': {
    scenario: {
      title: 'CBSE Class 12 Biomolecules Lab',
      subtitle: 'Master Carbohydrates, Proteins, and Nucleic Acids',
      description: 'Step into a virtual biochemistry lab where you classify carbohydrates, build protein structures, and explore DNA double helix geometry.',
    },
    discovery: {
      title: 'Discovery Challenge: The Glucose-Fructose Puzzle',
      question: 'Glucose and fructose have the same molecular formula (C6H12O6) but different structures. Glucose is an aldohexose and fructose is a ketohexose. How can you distinguish them chemically?',
      options: [
        'They cannot be distinguished chemically',
        'Glucose gives a positive Tollen\'s test (silver mirror) and Fehling\'s test (red Cu2O ppt) because it has a free aldehyde group. Fructose also gives these tests due to tautomerization under basic conditions, but bromine water oxidizes only glucose (aldehyde) not fructose (ketone)',
        'Only fructose reacts with Tollen\'s reagent',
        'Glucose is sweet and fructose is not',
      ],
      correctIndex: 1,
      explanation: 'Both glucose (aldose) and fructose (ketose) reduce Tollen\'s and Fehling\'s solutions because fructose tautomerizes to glucose and mannose under basic conditions. However, bromine water selectively oxidizes aldehydes (glucose → gluconic acid) but not ketones (fructose unchanged), distinguishing them.',
    },
    workstations: [
      { id: 'carbohydrates', name: 'Carbohydrate Lab', description: 'Classify mono-, di-, and polysaccharides; test reducing sugars.' },
      { id: 'proteins', name: 'Protein Structure Lab', description: 'Explore primary, secondary, tertiary, and quaternary protein structures.' },
      { id: 'nucleic', name: 'Nucleic Acid Lab', description: 'Study DNA double helix, base pairing, and RNA types.' },
      { id: 'vitamins', name: 'Vitamins & Enzymes Lab', description: 'Classify vitamins (fat/water soluble) and study enzyme kinetics.' },
    ],
  },
  'C12_ChemistryCoordinationCompoundsCBSESim': {
    scenario: {
      title: 'CBSE Class 12 Coordination Compounds Lab',
      subtitle: 'Master Werner Theory, Crystal Field Theory, and Isomerism',
      description: 'Step into a virtual coordination chemistry lab where you name complexes, identify isomers, and explore crystal field splitting in octahedral and tetrahedral fields.',
    },
    discovery: {
      title: 'Discovery Challenge: The Color of Transition Metal Complexes',
      question: 'Why is [Ti(H2O)6]3+ purple while [Cu(H2O)6]2+ is blue, and why are many transition metal complexes colored while main group compounds are often white?',
      options: [
        'Transition metals are naturally colored elements',
        'Transition metal complexes have partially filled d-orbitals. Crystal field splitting creates a small energy gap (Δo) between t2g and eg orbitals. Visible light photons match this gap, causing d-d electron transitions that absorb specific wavelengths, transmitting the complementary color',
        'The color comes from the ligands, not the metal',
        'Color is caused by s-orbital transitions in all metals',
      ],
      correctIndex: 1,
      explanation: 'Transition metal complexes are colored due to d-d transitions: partially filled d-orbitals split into t2g and eg sets by the ligand field. The energy gap (Δo) corresponds to visible light wavelengths. Absorbing one color transmits the complementary color. [Ti(H2O)6]3+ (d1) absorbs yellow-green, transmitting purple. Main group compounds lack partially filled d-orbitals, so no d-d transitions occur.',
    },
    workstations: [
      { id: 'nomenclature', name: 'IUPAC Nomenclature Lab', description: 'Name coordination compounds following IUPAC rules.' },
      { id: 'isomerism', name: 'Isomerism Lab', description: 'Identify geometric, optical, and linkage isomers.' },
      { id: 'cft', name: 'Crystal Field Theory Lab', description: 'Explore octahedral and tetrahedral splitting, spectrochemical series.' },
      { id: 'bonding', name: 'Werner & Bonding Lab', description: 'Study Werner coordination theory and primary/secondary valencies.' },
    ],
  },
  'C12_ChemistryElectrochemistryCBSESim': {
    scenario: {
      title: 'CBSE Class 12 Electrochemistry Lab',
      subtitle: 'Master Nernst Equation, Galvanic Cells, and Corrosion',
      description: 'Step into a virtual electrochemistry lab where you build galvanic cells, apply the Nernst equation, and study battery chemistry and corrosion prevention.',
    },
    discovery: {
      title: 'Discovery Challenge: The Concentration Cell Puzzle',
      question: 'A concentration cell has two Cu/Cu2+ half-cells with [Cu2+] = 1.0M on one side and [Cu2+] = 0.01M on the other. What is the cell potential at 298K, and which electrode is the anode?',
      options: [
        'E = 0V because both electrodes are copper',
        'E = 0.059V (Nernst equation). The dilute side (0.01M) is the anode (oxidation), concentrated side is cathode (reduction)',
        'E = 1.1V because copper has a high standard potential',
        'E = 0.118V and the concentrated side is the anode',
      ],
      correctIndex: 1,
      explanation: 'Using Nernst equation: E = (0.0591/n) × log([Cu2+]cathode/[Cu2+]anode) = (0.0591/2) × log(1.0/0.01) = 0.0296 × 2 = 0.059V. The dilute half-cell (0.01M) has greater tendency to dissolve Cu, so it is the anode (oxidation). The concentrated side is the cathode (reduction).',
    },
    workstations: [
      { id: 'galvanic', name: 'Galvanic Cell Lab', description: 'Build galvanic cells and measure EMF using standard electrode potentials.' },
      { id: 'nernst', name: 'Nernst Equation Lab', description: 'Calculate cell potentials at non-standard concentrations.' },
      { id: 'conductance', name: 'Conductance Lab', description: 'Study molar conductivity and Kohlrausch law.' },
      { id: 'batteries', name: 'Batteries & Corrosion Lab', description: 'Explore lead-acid, dry cells, fuel cells, and corrosion chemistry.' },
    ],
  },
  'C12_ChemistryHaloalkanesandHaloarenesCBSESim': {
    scenario: {
      title: 'CBSE Class 12 Haloalkanes & Haloarenes Lab',
      subtitle: 'Master SN1/SN2 Mechanisms, Elimination, and Aryl Halide Reactions',
      description: 'Step into a virtual organic lab where you compare SN1 and SN2 mechanisms, study stereochemistry, and explore Friedel-Crafts reactions of aryl halides.',
    },
    discovery: {
      title: 'Discovery Challenge: The SN1 vs SN2 Puzzle',
      question: 'When (CH3)3C-Br (tert-butyl bromide) reacts with OH-, the reaction follows SN1 mechanism, but CH3-Br (methyl bromide) follows SN2. Why?',
      options: [
        'Tertiary alkyl halides are more reactive in SN2',
        'Tertiary carbocation (3°) is stabilized by hyperconjugation and +I effect of 3 methyl groups, making SN1 favorable. Methyl has no carbocation stability, so SN2 (backside attack) is preferred. Steric hindrance also blocks SN2 in 3° substrates',
        'Methyl bromide cannot undergo any reaction',
        'Both follow the same mechanism',
      ],
      correctIndex: 1,
      explanation: 'SN1 requires a stable carbocation intermediate. 3° carbocations are stabilized by hyperconjugation and +I effect of three alkyl groups. Methyl carbocation (CH3+) is extremely unstable, so CH3-Br cannot do SN1. Instead, SN2 backside attack is favored for methyl (no steric hindrance). 3° substrates have too much steric hindrance for SN2 backside attack.',
    },
    workstations: [
      { id: 'sn1_sn2', name: 'SN1/SN2 Mechanism Lab', description: 'Compare substitution mechanisms and study rate laws.' },
      { id: 'elimination', name: 'Elimination Reactions Lab', description: 'Study E1/E2 mechanisms and Saytzeff rule.' },
      { id: 'stereochemistry', name: 'Stereochemistry Lab', description: 'Explore inversion vs retention of configuration.' },
      { id: 'aryl', name: 'Aryl Halide Lab', description: 'Study Friedel-Crafts reactions and electrophilic substitution of aryl halides.' },
    ],
  },
  'C12_ChemistrySolutionsCBSESim': {
    scenario: {
      title: 'CBSE Class 12 Solutions Lab',
      subtitle: 'Master Colligative Properties, Raoult Law, and Van\'t Hoff Factor',
      description: 'Step into a virtual solutions lab where you prepare ideal and non-ideal solutions, measure colligative properties, and calculate osmotic pressure.',
    },
    discovery: {
      title: 'Discovery Challenge: The Freezing Point Depression Puzzle',
      question: 'Why does adding salt (NaCl) to water lower its freezing point, and why is the actual freezing point depression slightly less than calculated using the simple formula?',
      options: [
        'Salt increases the freezing point',
        'Salt dissolves and lowers the vapor pressure of water, causing freezing point depression (ΔTf = Kf × m). The actual value is slightly less because NaCl does not fully dissociate at high concentrations; the Van\'t Hoff factor (i) is slightly less than 2',
        'Salt reacts chemically with ice to prevent freezing',
        'Salt makes water denser, preventing ice formation',
      ],
      correctIndex: 1,
      explanation: 'Adding a non-volatile solute (NaCl) lowers the vapor pressure of water, which depresses the freezing point according to ΔTf = i × Kf × m. Theoretically, i = 2 for NaCl (Na+ + Cl-), but at high concentrations, ion pairing reduces effective dissociation, so i < 2 and the actual depression is slightly less than calculated.',
    },
    workstations: [
      { id: 'raoult', name: "Raoult's Law Lab", description: 'Study ideal and non-ideal solutions, azeotropes.' },
      { id: 'colligative', name: 'Colligative Properties Lab', description: 'Measure relative lowering of VP, elevation of BP, depression of FP.' },
      { id: 'osmosis', name: 'Osmosis Lab', description: 'Study osmotic pressure and reverse osmosis.' },
      { id: 'vant Hoff', name: "Van't Hoff Factor Lab", description: 'Calculate degree of dissociation/association using Van\'t Hoff factor.' },
    ],
  },
};

// Generate the TypeScript code block to insert
function generateInsertBlock(simId) {
  const data = enrichmentData[simId];
  const miscs = misconceptionsData[simId];
  if (!data || !miscs) return null;

  const scenarioStr = `const SCENARIO = {
  title: '${data.scenario.title}',
  subtitle: '${data.scenario.subtitle}',
  description: '${data.scenario.description}',
};`;

  const discoveryStr = `const DISCOVERY_QUESTION = {
  title: '${data.discovery.title}',
  question: '${data.discovery.question.replace(/'/g, "\\'")}',
  options: ${JSON.stringify(data.discovery.options, null, 4).replace(/"/g, "'")},
  correctIndex: ${data.discovery.correctIndex},
  explanation: '${data.discovery.explanation.replace(/'/g, "\\'")}',
};`;

  const workstationsStr = `const WORKSTATIONS_INFO = ${JSON.stringify(data.workstations, null, 2)};`;

  const miscStr = `interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

const MISCONCEPTIONS: Misconception[] = ${JSON.stringify(miscs, null, 2)};`;

  return `// ==========================================
// SCENARIO DATA
// ==========================================
${scenarioStr}

// ==========================================
// DISCOVERY QUESTION
// ==========================================
${discoveryStr}

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
${workstationsStr}

// ==========================================
// MISCONCEPTIONS (Enrichment Data)
// ==========================================
${miscStr}
`;
}

// Generate the JSX rendering block for misconceptions
function generateMiscJsx() {
  return `            {/* Misconception Summary Checklist */}
            <div className="text-left space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-amber-300">Common Board Exam Misconception Checklist:</h3>
              <div className="grid grid-cols-1 gap-2">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-rose-400">{m.title}</div>
                    <div className="text-slate-400">{m.description}</div>
                    <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
                  </div>
                ))}
              </div>
            </div>
`;
}

// Process each sim
const simFiles = fs.readdirSync(SIMS_DIR).filter(f => f.endsWith('CBSESim.tsx'));
let successCount = 0;
let failCount = 0;

for (const fileName of simFiles) {
  const simId = fileName.replace('.tsx', '');
  const filePath = path.join(SIMS_DIR, fileName);
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has MISCONCEPTIONS
  if (content.includes('const MISCONCEPTIONS')) {
    console.log(`${fileName}: SKIP — already has MISCONCEPTIONS`);
    continue;
  }

  const insertBlock = generateInsertBlock(simId);
  if (!insertBlock) {
    console.log(`${fileName}: SKIP — no data available`);
    continue;
  }

  // Find insertion point: after the CHALLENGES array (before the main component)
  // Look for "export default function" or the main component declaration
  const mainFuncMatch = content.match(/\n(?:export default function|export default|function)\s+\w+/);
  if (!mainFuncMatch) {
    console.log(`${fileName}: FAIL — could not find main component`);
    failCount++;
    continue;
  }

  const insertPos = mainFuncMatch.index;
  const newContent = content.slice(0, insertPos) + '\n' + insertBlock + '\n' + content.slice(insertPos);

  // Now find where to insert the misconception JSX rendering
  // Look for the closing of the challenges/completion section
  // Find the last </motion.div> before the UI overlay feedback components
  const feedbackMatch = newContent.match(/\s*\{\/\* UI Overlay Feedback Components/);
  let finalContent = newContent;
  if (feedbackMatch) {
    const feedbackPos = newContent.indexOf(feedbackMatch[0]);
    finalContent = newContent.slice(0, feedbackPos) + '\n' + generateMiscJsx() + '\n' + newContent.slice(feedbackPos);
  } else {
    // Try to find <HintBubble or <Confetti
    const hintMatch = newContent.match(/<HintBubble/);
    if (hintMatch) {
      const hintPos = newContent.indexOf(hintMatch[0]);
      finalContent = newContent.slice(0, hintPos) + generateMiscJsx() + '\n      ' + newContent.slice(hintPos);
    }
  }

  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`${fileName}: DONE — inserted SCENARIO, DISCOVERY_QUESTION, WORKSTATIONS_INFO, MISCONCEPTIONS`);
  successCount++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Success: ${successCount}`);
console.log(`Failed: ${failCount}`);
