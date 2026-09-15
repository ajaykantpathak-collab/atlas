// Quick script: group C6-8 nodes by their simulation template type
// Run: node scripts/check-template-coverage.js

const fs = require('fs');
const path = require('path');

const CISCE_ROOT = 'D:\\cisce';
const SUBJECT_DIRS = {
  physics: 'physics',
  chem: 'chem',
  bio: 'bio',
  maths: 'maths',
  geo: 'geo',
  cs: 'cs',
  histciv: 'histciv',
};

// Simplified version of inferTemplateType
function inferTemplateType(title, subject) {
  const t = title.toLowerCase();
  if (subject === 'physics') {
    if (t.includes('measurement') || t.includes('physical quantit') || t.includes('length') || (t.includes('mass') && t.includes('beam')) || (t.includes('time') && (t.includes('clock') || t.includes('stopwatch'))) || (t.includes('temperature') && t.includes('thermometer')) || (t.includes('area') && t.includes('graph paper')) || (t.includes('density') && (t.includes('measurement') || t.includes('irregular')))) return 'measurement-lab';
    if (t.includes('motion') || t.includes('speed') || t.includes('rectilinear') || t.includes('uniform') || t.includes('circular') || t.includes('periodic')) return 'motion-cart';
    if (t.includes('force') || t.includes('weight') || t.includes('gravity')) return 'motion-cart';
    if (t.includes('light') || t.includes('reflection') || t.includes('mirror') || t.includes('refraction') || t.includes('lens') || t.includes('dispersion') || t.includes('image formation')) return 'light-ray';
    if (t.includes('circuit') || t.includes('electric') || t.includes('current') || t.includes('voltage') || t.includes('ohm') || t.includes('wiring') || t.includes('fuse') || t.includes('kwh') || t.includes('household')) return 'circuit-builder';
    if (t.includes('static electric') || t.includes('charging') || t.includes('electroscope') || t.includes('lightning')) return 'circuit-builder';
    if (t.includes('sound') || t.includes('vibration') || t.includes('wave') || t.includes('pitch') || t.includes('frequency') || t.includes('loudness') || t.includes('amplitude') || t.includes('echo') || t.includes('reverberation')) return 'sound-wave';
    if (t.includes('heat') || t.includes('thermal') || t.includes('expansion') || t.includes('conduction') || t.includes('convection') || t.includes('radiation') || t.includes('change of state') || t.includes('boiling') || t.includes('evapor') || t.includes('condensation') || t.includes('sublimation') || t.includes('melting') || t.includes('fusion')) return 'heat-transfer';
    if (t.includes('magnet') || t.includes('compass') || t.includes('magnetic')) return 'magnet-explorer';
    if (t.includes('matter') || t.includes('particle') || t.includes('solid state') || t.includes('liquid state') || t.includes('gaseous state') || t.includes('kinetic theory')) return 'matter-states';
    if (t.includes('density') || t.includes('float') || t.includes('sink') || t.includes('buoyancy') || t.includes('upthrust') || t.includes('relative density')) return 'density-tank';
    if (t.includes('energy') || t.includes('work') || t.includes('power') || t.includes('lever') || t.includes('machine') || t.includes('mechanical advantage') || t.includes('turning effect') || t.includes('moment of force')) return 'energy-lever';
    if (t.includes('pressure') || t.includes('atmospheric')) return 'density-tank';
    if (t.includes('friction')) return 'motion-cart';
    return 'text-explorer';
  }
  if (subject === 'chem') {
    if (t.includes('atom') || t.includes('subatomic') || t.includes('atomic structure') || t.includes('atomic number') || t.includes('mass number') || t.includes('element')) return 'atom-builder';
    if (t.includes('mixture') || t.includes('separation') || t.includes('separate')) return 'mixture-separator';
    if (t.includes('matter') || t.includes('particle') || t.includes('physical change') || t.includes('chemical change') || t.includes('compound') || t.includes('reaction')) return 'reaction-viewer';
    return 'text-explorer';
  }
  if (subject === 'bio' || subject === 'biology') {
    if (t.includes('classif') || t.includes('group') || t.includes('sort') || t.includes('categor') || (t.includes('type') && t.includes('plant'))) return 'classification-sorter';
    return 'diagram-explorer';
  }
  if (subject === 'maths') {
    if (t.includes('number line') || t.includes('integer') || t.includes('rational') || t.includes('algebra') || t.includes('equation') || t.includes('expression') || t.includes('inequality') || t.includes('exponent') || t.includes('square') || t.includes('cube') || t.includes('divisib') || t.includes('set') || t.includes('profit') || t.includes('loss') || t.includes('interest') || t.includes('percentage') || t.includes('variation') || t.includes('time and work')) return 'number-line';
    if (t.includes('geometry') || t.includes('angle') || t.includes('triangle') || t.includes('quadrilateral') || t.includes('circle') || t.includes('construction') || t.includes('symmetry') || t.includes('congruen') || t.includes('parallel') || t.includes('shape') || t.includes('polygon') || t.includes('trapezium') || t.includes('area') || t.includes('perimeter') || t.includes('circumference') || t.includes('surface') || t.includes('volume') || t.includes('capacity') || t.includes('euler') || t.includes('3-d') || t.includes('3d') || t.includes('vertices') || t.includes('edges') || t.includes('faces')) return 'geometry-constructor';
    if (t.includes('data') || t.includes('statistics') || t.includes('bar graph') || t.includes('pie chart') || t.includes('mean') || t.includes('median') || t.includes('mode') || t.includes('graph') || t.includes('plot') || t.includes('cartesian') || t.includes('coordinate')) return 'graph-plotter';
    if (t.includes('probability') || t.includes('chance') || t.includes('coin') || t.includes('dice') || t.includes('random')) return 'probability-lab';
    return 'number-line';
  }
  if (subject === 'geo' || subject === 'geography') return 'map-explorer';
  if (subject === 'cs' || subject === 'computer') {
    if (t.includes('flowchart') || t.includes('algorithm')) return 'flowchart-builder';
    if (t.includes('html') || t.includes('java') || t.includes('css') || t.includes('code') || t.includes('program') || t.includes('scratch') || t.includes('app')) return 'code-editor';
    return 'text-explorer';
  }
  if (subject === 'histciv' || subject === 'history' || subject === 'civics') {
    if (t.includes('timeline') || t.includes('event') || t.includes('chronolog') || t.includes('war') || t.includes('revolution') || t.includes('dynasty') || t.includes('empire') || t.includes('civilisation') || t.includes('civilization')) return 'timeline-builder';
    return 'concept-map';
  }
  return 'text-explorer';
}

// Parse a .marker file to extract nodes
function parseNodes(content, subject, classLevel) {
  const nodes = [];
  const nodeRegex = /--- NODE (\S+) ---\nTITLE: (.+)/g;
  let match;
  while ((match = nodeRegex.exec(content)) !== null) {
    nodes.push({ nodeId: match[1], title: match[2].trim(), subject, classLevel });
  }
  return nodes;
}

// Load all nodes
const templateGroups = {};
let totalNodes = 0;

for (const [subjectKey, dir] of Object.entries(SUBJECT_DIRS)) {
  const enrDir = path.join(CISCE_ROOT, dir, 'enrichment');
  if (!fs.existsSync(enrDir)) continue;

  for (const cls of [6, 7, 8]) {
    const files = fs.readdirSync(enrDir).filter(f => f.startsWith(`c${cls}_`) && f.endsWith('.marker'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(enrDir, file), 'utf8');
      const nodes = parseNodes(content, subjectKey, cls);
      for (const node of nodes) {
        const template = inferTemplateType(node.title, node.subject);
        if (!templateGroups[template]) templateGroups[template] = [];
        templateGroups[template].push(node);
        totalNodes++;
      }
    }
  }
}

// Print results
console.log('Total C6-8 nodes:', totalNodes);
console.log('');
console.log('Template coverage:');
console.log('Template              | Nodes | Subjects');
console.log('----------------------|-------|---------');
for (const [template, nodes] of Object.entries(templateGroups).sort((a, b) => b[1].length - a[1].length)) {
  const subjects = [...new Set(nodes.map(n => n.subject))].join(', ');
  const classes = [...new Set(nodes.map(n => n.classLevel))].join(',');
  console.log(`${template.padEnd(22)}| ${String(nodes.length).padStart(5)} | ${subjects} (C${classes})`);
  // Show first 3 node titles
  nodes.slice(0, 3).forEach(n => {
    console.log(`  ${n.nodeId}: ${n.title.substring(0, 60)}`);
  });
  if (nodes.length > 3) console.log(`  ... and ${nodes.length - 3} more`);
  console.log('');
}
