// Extract original source code from webpack cache
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const cacheDir = 'D:\\dream_app\\frontend\\.next\\cache\\webpack\\client-development';
const outputDir = 'D:\\dream_app\\frontend\\scripts\\restored_sources';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// List of files to try to restore
const targets = [
  'FinanceSim', 'ConstitutionalLawSim', 'DNASim', 'PlantBiologySimulation',
  'ChemistryFoundationsSim', 'C11_C12_PhysicsAdvancedSim', 'MedievalIndiaSim',
  'MassMediaSim', 'PhysicsC9_MiscSim', 'DemandAppSim', 'ClimateChangeSim',
  'ChemistryC10CompleteSim', 'NewtonsLawsSim', 'FinanceBankSim',
  'CoordinationChemSim', 'BiologyEcologySim', 'BiologyC9_12_AdvancedSim',
  'LegalStudiesSim', 'BiotechnologySim', 'SociologySim',
  'ChemicalReactionsSim', 'HomeScienceSim', 'PhysicsElectricitySim',
  'BiologyFoundationsSimulation', 'LearningSim', 'NewMediaSim',
  'PsychologySim', 'ResourceMgmtSim', 'AirBreathingSimulation',
  'MatterPropertiesSimulation', 'PoliticalScienceSim',
  'AppliedMathematicsSim', 'ElectionsSim', 'C12_ChemistryTopicsSim',
  'FluidMechanicsSim', 'PsyIntroSim', 'PhysicsNuclearSim',
  'IndustrialChemSim', 'AccountsSim', 'CellBiologySim',
  'WaterStudiesSimulation', 'IndianGovtSim', 'HistoryIndiaSim',
];

// Read all cache files
const cacheFiles = fs.readdirSync(cacheDir).filter(f => f.endsWith('.pack.gz'));
console.log(`Found ${cacheFiles.length} cache files`);

let allText = '';
for (const cf of cacheFiles) {
  try {
    const data = fs.readFileSync(path.join(cacheDir, cf));
    const decompressed = zlib.gunzipSync(data);
    allText += decompressed.toString('utf8');
  } catch (e) {
    console.log(`Failed to read ${cf}: ${e.message}`);
  }
}

console.log(`Total decompressed text: ${allText.length} chars`);

// Search for each target
let found = 0;
let notFound = 0;

for (const target of targets) {
  const idx = allText.indexOf(target);
  if (idx === -1) {
    console.log(`NOT FOUND: ${target}`);
    notFound++;
    continue;
  }

  // Try to find the source code around this match
  // Webpack stores sources as JSON with "source":"..." pattern
  // Look for 'use client' before the target name
  const searchStart = Math.max(0, idx - 50000);
  const useClientIdx = allText.lastIndexOf("'use client'", idx);
  
  if (useClientIdx > -1 && useClientIdx > searchStart) {
    // Find the end of the source (next unescaped quote)
    let end = useClientIdx;
    let escaped = false;
    while (end < allText.length && end < useClientIdx + 200000) {
      if (allText[end] === '\\') { escaped = !escaped; end++; continue; }
      if (!escaped && allText[end] === '"' && allText[end+1] === ',') break;
      if (!escaped && allText[end] === '"' && allText[end+1] === '\n') break;
      escaped = false;
      end++;
    }
    
    const source = allText.substring(useClientIdx, Math.min(end, useClientIdx + 100000));
    const outFile = path.join(outputDir, target + '.txt');
    fs.writeFileSync(outFile, source, 'utf8');
    console.log(`FOUND: ${target} (${source.length} chars) → restored_sources/${target}.txt`);
    found++;
  } else {
    console.log(`PARTIAL: ${target} (found name but no source)`);
    notFound++;
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Found: ${found}/${targets.length}`);
console.log(`Not found: ${notFound}/${targets.length}`);
