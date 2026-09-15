// Map each physics sim to CBSE physics nodes by chapter
const fs = require('fs');

// Load all CBSE physics nodes
const cbseBySubject = JSON.parse(fs.readFileSync('D:/platform/cbse_data/nodes/by_subject/physics.json', 'utf8'));
const cbseNodes = [];
// C11-C12 from by_subject
for (const n of cbseBySubject) {
  if (String(n.class_level) === '11' || String(n.class_level) === '12') cbseNodes.push(n);
}
// C6-C10 from by_class
for (const cls of [6,7,8,9,10]) {
  const f = `D:/platform/cbse_data/nodes/by_class/class_${cls}.json`;
  const nodes = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const n of nodes) {
    if (n.subject === 'physics') cbseNodes.push(n);
  }
}

// Group by (class, chapter)
const byClassChapter = {};
for (const n of cbseNodes) {
  const key = `${String(n.class_level)}||${n.chapter_name}`;
  if (!byClassChapter[key]) byClassChapter[key] = [];
  byClassChapter[key].push(n);
}

// Sim name → CBSE chapter mapping (by topic from sim name)
const SIM_TO_CHAPTER = {
  // C6
  'C6_PhysicsPhysicalQuantitiesUnitsSim': 'Motion and Measurement of Distances',
  'C6_PhysicsPitchSoundFrequencySim': 'Fun with Magnets', // closest - no sound chapter in C6
  'C6_PhysicsRectilinearPropagationLightSim': 'Light, Shadows and Reflections',
  'C6_PhysicsUniformNonuniformMotionSim': 'Motion and Measurement of Distances',
  // C7
  'C7_PhysicsHeatTransferConductionSim': 'Heat',
  'C7_PhysicsOhmsSim': 'Electric Current and its Effects',
  'C7_PhysicsPhysicalNatureMatterSim': 'Physical and Chemical Changes: Classifying Transformations of Matter',
  'C7_PhysicsPressureFluidsliquidsSim': 'Heat Transfer in Nature',
  // C8
  'C8_PhysicsBoilingEvaporationdifferencesSim': 'Nature of Matter: Elements, Compounds, and Mixtures',
  'C8_PhysicsKineticTheoryMatterSim': 'Nature of Matter: Elements, Compounds, and Mixtures',
  'C8_PhysicsLightningConductorSim': 'Some Natural Phenomena',
  'C8_PhysicsTurningEffectForceSim': 'Keeping Time with the Skies',
  // C9
  'C9_PhysicsEquationsUniformlyAcceleratedSim': 'How Forces Affect Motion',
  'C9_PhysicsInternationalSystemUnitsSim': 'How Forces Affect Motion',
  'C9_PhysicsOhmsResistanceSim': 'Sound Waves: Characteristics and Applications', // no electricity in C9
  'C9_PhysicsSphericalMirrorsTermsSim': 'Sound Waves: Characteristics and Applications', // no light in C9
  'C9_PhysicsWeightMassComparisonSim': 'Work, Energy, and Simple Machines',
  // C10
  'C10_PhysicsEfficiencyMachinesetaSim': 'Our Environment',
  'C10_PhysicsHouseWiringPowerSim': 'Electricity: Current, Circuits, and Applications',
  'C10_PhysicsScatteringLightSim': 'The Human Eye and the Colourful World',
  'C10_PhysicsTurningEffectForceSim': 'Magnetic Effects of Electric Current',
  // C11
  'C11_PhysicsBernoullisTheoremSim': 'Mechanical Properties of Fluids',
  'C11_PhysicsConservationMechanicalEnergySim': 'Work, Energy and Power',
  'C11_PhysicsEquilibriumConcurrentForcesSim': 'Laws of Motion',
  'C11_PhysicsGeostationarySatellitesSim': 'Gravitation',
  'C11_PhysicsHeatTransferRadiationSim': 'Thermal Properties of Matter',
  'C11_PhysicsParallelPerpendicularAxesSim': 'Systems of Particles and Rotational Motion',
  'C11_PhysicsRefrigeratorCoefficientPerformanceSim': 'Thermodynamics',
  'C11_PhysicsResolutionVectorsRectangularSim': 'Motion in a Plane',
  'C11_PhysicsSimplePendulumSim': 'Oscillations',
  'C11_PhysicsSystemsUnitscgsSim': 'Units and Measurement',
  'C11_PhysicsWorkDoneAdiabaticSim': 'Thermodynamics',
  // C12
  'C12_PhysicsAmperesCircuitalSim': 'Moving Charges and Magnetism',
  'C12_PhysicsBrewstersPolarizationReflectionSim': 'Wave Optics',
  'C12_PhysicsDispersionThroughPrismSim': 'Ray Optics and Optical Instruments',
  'C12_PhysicsElectricChargestypesSim': 'Electric Charges and Fields',
  'C12_PhysicsElectricFluxSim': 'Electric Charges and Fields',
  'C12_PhysicsElectrostaticSystemChargesSim': 'Electric Charges and Fields',
  'C12_PhysicsEnergyBandsSolidsSim': 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
  'C12_PhysicsEnergyLevelsHydrogenSim': 'Atoms',
  'C12_PhysicsGeneratorSim': 'Electromagnetic Induction',
  'C12_PhysicsInternalResistanceSim': 'Current Electricity',
  'C12_PhysicsMagneticFieldLinesSim': 'Magnetism and Matter',
  'C12_PhysicsSelfinductionSelfinductanceSim': 'Electromagnetic Induction',
  'C12_PhysicsSingleSlitDiffractionSim': 'Wave Optics',
  'C12_PhysicsZenerDiodeSim': 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
};

// Load sim data
const simData = JSON.parse(fs.readFileSync('D:/platform/frontend/scripts/phys46-registry-data.json', 'utf8'));

let mappings = '';
let warnings = [];

for (const item of simData) {
  const simName = item.Sim;
  const cls = item.Class;
  const chapter = SIM_TO_CHAPTER[simName];
  
  if (!chapter) {
    warnings.push(`NO CHAPTER MAP: ${simName}`);
    continue;
  }
  
  const key = `${String(cls)}||${chapter}`;
  const chapterNodes = byClassChapter[key];
  
  if (!chapterNodes || chapterNodes.length === 0) {
    warnings.push(`NO CBSE NODES: ${simName} → C${cls} "${chapter}"`);
    continue;
  }
  
  const cbsePairs = chapterNodes.map(n => `        ["${n.node_id}", "${n.chapter_name}"]`).join(',\n');
  mappings += `    "${simName}": {\n`;
  mappings += `      "cbse_nodes": [\n${cbsePairs}\n      ]\n`;
  mappings += `    },\n`;
}

mappings = mappings.trimEnd().replace(/,$/, '');

fs.writeFileSync('D:/platform/frontend/scripts/phys46-mapping-entries.txt', mappings);
console.log(`Generated mapping for ${simData.length} sims`);
if (warnings.length > 0) {
  console.log('\nWARNINGS:');
  warnings.forEach(w => console.log('  ' + w));
}
