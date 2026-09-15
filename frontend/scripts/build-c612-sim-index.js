/* ═══════════════════════════════════════════════════════════════════════════
   build-c612-sim-index.js — Scan c6_12 sims and build a node→sim index.

   SAFETY:
   - Only READS from D:\dream_app\frontend\components\simulations\c6_12\
   - Only WRITES to D:\dream_app\patched\c6_12-sim-index.json
   - Does NOT modify any source files

   WHAT IT DOES:
   1. Scans all 387 .tsx files in c6_12/
   2. Extracts: component name, node_ids, class, subject
   3. Builds two maps:
      a. simIndex: simFile → { component, nodeIds, class, subject }
      b. nodeToSim: nodeId → [simFiles]
   4. Writes both to D:\dream_app\patched\c6_12-sim-index.json
   5. Reports gaps: nodes with no sim, sims with no nodes
   ═══════════════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const SIM_DIR = 'D:\\dream_app\\frontend\\components\\simulations\\c6_12';
const OUTPUT = 'D:\\dream_app\\patched\\c6_12-sim-index.json';

// Subject prefix mapping
const SUBJECT_MAP = {
  math: 'maths',
  phy: 'physics',
  chem: 'chem',
  bio: 'bio',
  cs: 'cs',
  geo: 'geo',
  histciv: 'histciv',
  evs: 'evs',
  appmath: 'appmath',
  biotech: 'biotech',
  econ: 'econ',
  acc: 'acc',
  comm: 'comm',
  commapp: 'commapp',
  commstud: 'commstud',
  bs: 'bs',
  econapp: 'econapp',
  psy: 'psy',
  soc: 'soc',
  pol: 'pol',
  home: 'home',
  legal: 'legal',
  massmedia: 'massmedia',
};

function main() {
  console.log('=== C6_12 SIM INDEX BUILDER ===\n');
  console.log(`Scanning: ${SIM_DIR}`);
  console.log(`Output: ${OUTPUT}\n`);

  const files = fs.readdirSync(SIM_DIR).filter(f => f.endsWith('.tsx'));
  console.log(`Found ${files.length} .tsx files\n`);

  const simIndex = {};  // fileName → metadata
  const nodeToSim = {}; // nodeId → [fileNames]
  const warnings = [];
  let filesWithNodes = 0;
  let filesWithoutNodes = 0;
  let totalNodeRefs = 0;

  files.forEach(file => {
    const filePath = path.join(SIM_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const baseName = file.replace('.tsx', '');

    // Extract node_ids: c\d+_\w+_\d{3}
    const nodeMatches = content.match(/c\d+_[a-z]+_\d{3}/g) || [];
    const nodeIds = [...new Set(nodeMatches)].sort();

    // Extract class from filename (C9_, C10_, C11_, C12_)
    const classMatch = file.match(/C(\d+)_/);
    const classLevel = classMatch ? parseInt(classMatch[1]) : null;

    // Extract subject from node_ids
    let subject = null;
    if (nodeIds.length > 0) {
      const subjMatch = nodeIds[0].match(/c\d+_([a-z]+)_/);
      if (subjMatch) {
        subject = SUBJECT_MAP[subjMatch[1]] || subjMatch[1];
      }
    }

    // Extract component name from default export
    let component = baseName;
    const exportMatch = content.match(/export\s+default\s+(?:function\s+)?(\w+)/);
    if (exportMatch) {
      component = exportMatch[1];
    }

    const fileSize = fs.statSync(filePath).size;

    simIndex[file] = {
      component,
      baseName,
      nodeIds,
      classLevel,
      subject,
      fileSize,
      filePath: `components/simulations/c6_12/${file}`,
    };

    if (nodeIds.length > 0) {
      filesWithNodes++;
      totalNodeRefs += nodeIds.length;
      nodeIds.forEach(nid => {
        if (!nodeToSim[nid]) nodeToSim[nid] = [];
        nodeToSim[nid].push(file);
      });
    } else {
      filesWithoutNodes++;
      warnings.push(`No node_ids found in ${file}`);
    }

    // Warn if no class detected
    if (classLevel === null) {
      warnings.push(`Could not detect class from filename: ${file}`);
    }
  });

  // ─── Stats ──────────────────────────────────────────────────
  console.log('--- Stats ---');
  console.log(`Total sims: ${files.length}`);
  console.log(`Sims with node_ids: ${filesWithNodes}`);
  console.log(`Sims without node_ids: ${filesWithoutNodes}`);
  console.log(`Total node references: ${totalNodeRefs}`);
  console.log(`Unique nodes covered: ${Object.keys(nodeToSim).length}`);
  console.log(`Warnings: ${warnings.length}\n`);

  // ─── Class distribution ─────────────────────────────────────
  const classDist = {};
  Object.values(simIndex).forEach(s => {
    if (s.classLevel) {
      classDist[s.classLevel] = (classDist[s.classLevel] || 0) + 1;
    }
  });
  console.log('Sims per class:');
  Object.keys(classDist).sort((a, b) => a - b).forEach(c => {
    console.log(`  Class ${c}: ${classDist[c]} sims`);
  });
  console.log('');

  // ─── Subject distribution ───────────────────────────────────
  const subjDist = {};
  Object.values(simIndex).forEach(s => {
    if (s.subject) {
      subjDist[s.subject] = (subjDist[s.subject] || 0) + 1;
    }
  });
  console.log('Sims per subject:');
  Object.keys(subjDist).sort().forEach(s => {
    console.log(`  ${s}: ${subjDist[s]} sims`);
  });
  console.log('');

  // ─── Nodes per sim distribution ─────────────────────────────
  const nodesPerSim = {};
  Object.values(simIndex).forEach(s => {
    const count = s.nodeIds.length;
    const bucket = count === 0 ? '0' : count <= 5 ? '1-5' : count <= 10 ? '6-10' : count <= 20 ? '11-20' : '21+';
    nodesPerSim[bucket] = (nodesPerSim[bucket] || 0) + 1;
  });
  console.log('Nodes per sim distribution:');
  ['0', '1-5', '6-10', '11-20', '21+'].forEach(b => {
    if (nodesPerSim[b]) console.log(`  ${b} nodes: ${nodesPerSim[b]} sims`);
  });
  console.log('');

  // ─── Sims per node distribution ─────────────────────────────
  const simsPerNode = {};
  Object.values(nodeToSim).forEach(sims => {
    const count = sims.length;
    const bucket = count === 1 ? '1' : count === 2 ? '2' : '3+';
    simsPerNode[bucket] = (simsPerNode[bucket] || 0) + 1;
  });
  console.log('Sims per node distribution:');
  ['1', '2', '3+'].forEach(b => {
    if (simsPerNode[b]) console.log(`  ${b} sim(s): ${simsPerNode[b]} nodes`);
  });
  console.log('');

  // ─── Write output ───────────────────────────────────────────
  const output = {
    generated: new Date().toISOString(),
    source: 'components/simulations/c6_12/',
    stats: {
      totalSims: files.length,
      simsWithNodes: filesWithNodes,
      simsWithoutNodes: filesWithoutNodes,
      totalNodeRefs,
      uniqueNodesCovered: Object.keys(nodeToSim).length,
      warnings: warnings.length,
    },
    simIndex,   // fileName → metadata
    nodeToSim,  // nodeId → [fileNames]
    warnings,
  };

  // Ensure output dir exists
  const outputDir = path.dirname(OUTPUT);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\nIndex written to ${OUTPUT}`);
  console.log(`File size: ${(fs.statSync(OUTPUT).size / 1024).toFixed(1)} KB`);

  // ─── Print first 10 warnings if any ─────────────────────────
  if (warnings.length > 0) {
    console.log('\n--- First 10 warnings ---');
    warnings.slice(0, 10).forEach(w => console.log(`  ${w}`));
    if (warnings.length > 10) console.log(`  ... and ${warnings.length - 10} more`);
  }

  console.log('\n=== DONE ===');
}

main();
