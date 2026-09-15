// Generate mapping JSON entries for 35 unmapped chemistry sims
const fs = require('fs');

// Load CBSE chemistry nodes to get chapter mappings
const cbseNodes = JSON.parse(fs.readFileSync('D:/platform/cbse_data/nodes/by_subject/chemistry.json', 'utf8'));

// Build node_id -> chapter_name lookup (node_id is per-chapter sequential, so we need all chapters)
const nodeToChapters = {};
for (const n of cbseNodes) {
  if (!nodeToChapters[n.node_id]) nodeToChapters[n.node_id] = [];
  if (n.chapter_name && !nodeToChapters[n.node_id].includes(n.chapter_name)) {
    nodeToChapters[n.node_id].push(n.chapter_name);
  }
}

// Load C10 CBSE chemistry nodes
const c10Nodes = JSON.parse(fs.readFileSync('D:/platform/cbse_data/nodes/by_class/class_10.json', 'utf8'));
const c10Chem = c10Nodes.filter(n => n.subject === 'chemistry');

// Sim-to-chapter mapping for CBSE sims
const SIM_CHAPTERS = {
  'C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim': 'Organic Chemistry – Some Basic Principles and Techniques (Part 1)',
  'C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim': 'Organic Chemistry: Some Basic Principles and Techniques – Part 2',
  'C11_ChemistryRedoxReactionsCBSESim': 'Redox Reactions',
  'C11_ChemistrySomeBasicConceptsofChemistryCBSESim': 'Some Basic Concepts of Chemistry',
  'C11_ChemistryThermodynamicsCBSESim': 'Thermodynamics',
  'C12_ChemistryAldehydesKetonesandCarboxylicACBSESim': 'Aldehydes, Ketones and Carboxylic Acids',
  'C12_ChemistryAminesandDiazoniumSaltsCBSESim': 'Amines and Diazonium Salts',
  'C12_ChemistryBiomoleculesCBSESim': 'Biomolecules',
  'C12_ChemistryCoordinationCompoundsCBSESim': 'Coordination Compounds',
  'C12_ChemistryElectrochemistryCBSESim': 'Electrochemistry',
  'C12_ChemistryHaloalkanesandHaloarenesCBSESim': 'Haloalkanes and Haloarenes',
  'C12_ChemistrySolutionsCBSESim': 'Solutions',
};

// Load the registry data
const data = JSON.parse(fs.readFileSync('D:/platform/frontend/scripts/chem35-registry-data.json', 'utf8'));

let mappings = '';

for (const item of data) {
  const simName = item.Sim;
  const nodeIds = item.NodeIds.split(',');
  
  if (simName.includes('CBSE')) {
    // CBSE sim - use cbse_nodes with chapter_name pairs
    const chapter = SIM_CHAPTERS[simName];
    if (!chapter) {
      console.error(`No chapter mapping for ${simName}`);
      continue;
    }
    const cbsePairs = nodeIds.map(nid => `        ["${nid}", "${chapter}"]`).join(',\n');
    mappings += `    "${simName}": {\n`;
    mappings += `      "cisce_nodes": [],\n`;
    mappings += `      "cbse_nodes": [\n${cbsePairs}\n      ]\n`;
    mappings += `    },\n`;
  } else {
    // C6-C10 CISCE sim - use cisce_nodes, try to match CBSE nodes for C10
    const cisceNodes = nodeIds.map(nid => `        "${nid}"`).join(',\n');
    
    // For C10, try to find matching CBSE nodes
    let cbsePairs = '';
    if (simName.startsWith('C10_')) {
      // C10 has CBSE chemistry nodes in "Chemical Reactions and Equations" chapter
      // Map all C10 CBSE chemistry nodes to these sims based on topic similarity
      // For now, use empty - the CISCE nodes are the primary mapping
      cbsePairs = '      []';
    } else {
      cbsePairs = '      []';
    }
    
    mappings += `    "${simName}": {\n`;
    mappings += `      "cisce_nodes": [\n${cisceNodes}\n      ],\n`;
    mappings += `      "cbse_nodes": ${cbsePairs}\n`;
    mappings += `    },\n`;
  }
}

// Remove trailing comma
mappings = mappings.trimEnd().replace(/,$/, '');

fs.writeFileSync('D:/platform/frontend/scripts/chem35-mapping-entries.txt', mappings);
console.log('Generated mapping entries for ' + data.length + ' sims');
