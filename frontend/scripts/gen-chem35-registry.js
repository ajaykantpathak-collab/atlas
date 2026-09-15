// Generate registry entries for 35 unregistered chemistry sims
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/platform/frontend/scripts/chem35-registry-data.json', 'utf8'));

// Proper names
const NAMES = {
  'C6_ChemistryMatteranditscompositionSim': 'Chemistry Matter and its Composition',
  'C6_ChemistryCarbondioxideandnitrogeninairSim': 'Chemistry Carbon Dioxide and Nitrogen in Air',
  'C6_ChemistryAtomicstructuresubatomicparticlesSim': 'Chemistry Atomic Structure Subatomic Particles',
  'C7_ChemistryAtomicstructureelectronsprotonsneutronsSim': 'Chemistry Atomic Structure Electrons Protons Neutrons',
  'C7_ChemistryMatterclassificationrevisitedSim': 'Chemistry Matter Classification Revisited',
  'C7_ChemistryWaterauniversalsolventSim': 'Chemistry Water a Universal Solvent',
  'C8_ChemistryChemicalequationsbalancingSim': 'Chemistry Chemical Equations Balancing',
  'C8_ChemistryMatterstatesandinterconversionrevisitedSim': 'Chemistry Matter States and Interconversion Revisited',
  'C8_ChemistryWaterpropertiesandcompositionSim': 'Chemistry Water Properties and Composition',
  'C9_ChemistryAcidraincompositionandcausesSim': 'Chemistry Acid Rain Composition and Causes',
  'C9_ChemistryCovalentbondingSim': 'Chemistry Covalent Bonding',
  'C9_ChemistryEnergychangesinchemicalreactionsSim': 'Chemistry Energy Changes in Chemical Reactions',
  'C9_ChemistryLaboratorypreparationofhydrogenSim': 'Chemistry Laboratory Preparation of Hydrogen',
  'C9_ChemistrySoftwaterandhardwaterSim': 'Chemistry Soft Water and Hard Water',
  'C9_ChemistrySymbolsofelementsSim': 'Chemistry Symbols of Elements',
  'C10_ChemistryAlkanesgeneralformulaandpreparationSim': 'Chemistry Alkanes General Formula and Preparation',
  'C10_ChemistryAlloysandamalgamsSim': 'Chemistry Alloys and Amalgams',
  'C10_ChemistryClassificationofbasesSim': 'Chemistry Classification of Bases',
  'C10_ChemistryElectrolysisofspecificcompoundsSim': 'Chemistry Electrolysis of Specific Compounds',
  'C10_ChemistryPeriodicpropertiesatomicsizeSim': 'Chemistry Periodic Properties Atomic Size',
  'C10_ChemistryPolarandnonpolarcovalentcompoundsSim': 'Chemistry Polar and Nonpolar Covalent Compounds',
  'C10_ChemistrySulphuricacidContactprocessSim': 'Chemistry Sulphuric Acid Contact Process',
  'C10_ChemistryVapourdensityandmolecularmassSim': 'Chemistry Vapour Density and Molecular Mass',
  'C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim': 'Chemistry Organic Chemistry Basic Principles Part 1',
  'C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim': 'Chemistry Organic Chemistry Basic Principles Part 2',
  'C11_ChemistryRedoxReactionsCBSESim': 'Chemistry Redox Reactions',
  'C11_ChemistrySomeBasicConceptsofChemistryCBSESim': 'Chemistry Some Basic Concepts of Chemistry',
  'C11_ChemistryThermodynamicsCBSESim': 'Chemistry Thermodynamics',
  'C12_ChemistryAldehydesKetonesandCarboxylicACBSESim': 'Chemistry Aldehydes Ketones and Carboxylic Acids',
  'C12_ChemistryAminesandDiazoniumSaltsCBSESim': 'Chemistry Amines and Diazonium Salts',
  'C12_ChemistryBiomoleculesCBSESim': 'Chemistry Biomolecules',
  'C12_ChemistryCoordinationCompoundsCBSESim': 'Chemistry Coordination Compounds',
  'C12_ChemistryElectrochemistryCBSESim': 'Chemistry Electrochemistry',
  'C12_ChemistryHaloalkanesandHaloarenesCBSESim': 'Chemistry Haloalkanes and Haloarenes',
  'C12_ChemistrySolutionsCBSESim': 'Chemistry Solutions',
};

// Generate ID (truncated to 30 chars, lowercase, no spaces)
function genId(name) {
  return name.toLowerCase().replace(/[^a-z]/g, '').substring(0, 30);
}

let simNum = 408;
let lazyImports = '';
let registryEntries = '';

for (const item of data) {
  const simVar = `Sim${simNum.toString().padStart(4, '0')}`;
  const name = NAMES[item.Sim] || item.Sim;
  const id = genId(name);
  const nodeIds = item.NodeIds.split(',').map(n => `'${n}'`).join(', ');
  
  lazyImports += `const ${simVar} = lazySim('@/components/simulations/c6_12/${item.Sim}')\n`;
  registryEntries += `{ id: '${id}', name: '${name}', emoji: '⚗️', color: '#10B981', nodeIds: [${nodeIds}], subject: 'chemistry', classLevel: ${item.Class}, component: ${simVar} },\n`;
  
  simNum++;
}

fs.writeFileSync('D:/platform/frontend/scripts/chem35-lazy-imports.txt', lazyImports);
fs.writeFileSync('D:/platform/frontend/scripts/chem35-registry-entries.txt', registryEntries);
console.log('Generated ' + data.length + ' entries');
console.log('Sim numbers: Sim0408 to Sim' + (simNum-1).toString().padStart(4, '0'));
