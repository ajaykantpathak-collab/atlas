// Extract enrichment data for new templates
// Reads all .marker files, infers template type, groups nodes by template, saves JSON
const fs = require('fs');
const path = require('path');

const CISCE_ROOT = 'D:\\cisce';
const OUT_DIR = path.join(__dirname, 'enrichment-data');

const SUBJECTS = {
  physics: 'physics', chem: 'chem', bio: 'bio', maths: 'maths',
  geo: 'geo', cs: 'cs', histciv: 'histciv',
};

// New templates that need enrichment data
const NEW_TEMPLATES = [
  'periodic-table-explorer', 'gas-properties-lab', 'chemical-equation-balancer',
  'cell-explorer', 'body-systems', 'plant-biology', 'ecology-explorer', 'health-disease',
  'arithmetic-lab', 'fraction-decimal-lab', 'algebra-solver', 'set-builder',
  'commercial-maths', 'ratio-proportion', 'exponent-lab',
  'landform-explorer', 'climate-resource-explorer',
  'computer-hardware-explorer', 'software-apps-lab', 'networking-cloud-explorer', 'number-system-converter',
  'civilization-explorer', 'governance-explorer', 'movement-explorer',
];

// Inline the inferTemplateType logic (same as SimulationRegistry)
function inferTemplateType(title, subject) {
  const t = title.toLowerCase();
  if (subject === 'physics') {
    if (t.includes('measurement') || t.includes('physical quantit') || t.includes('length') || (t.includes('mass') && t.includes('beam')) || (t.includes('time') && (t.includes('clock') || t.includes('stopwatch'))) || (t.includes('temperature') && t.includes('thermometer')) || (t.includes('area') && t.includes('graph paper')) || (t.includes('density') && (t.includes('measurement') || t.includes('irregular')))) return 'measurement-lab';
    if (t.includes('motion') || t.includes('speed') || t.includes('rectilinear') || t.includes('uniform') || t.includes('circular') || t.includes('periodic') || t.includes('force') || t.includes('weight') || t.includes('gravity') || t.includes('friction')) return 'motion-cart';
    if (t.includes('light') || t.includes('reflection') || t.includes('mirror') || t.includes('refraction') || t.includes('lens') || t.includes('dispersion') || t.includes('image formation')) return 'light-ray';
    if (t.includes('circuit') || t.includes('electric') || t.includes('current') || t.includes('voltage') || t.includes('ohm') || t.includes('wiring') || t.includes('fuse') || t.includes('kwh') || t.includes('household') || t.includes('static electric') || t.includes('charging') || t.includes('electroscope') || t.includes('lightning')) return 'circuit-builder';
    if (t.includes('sound') || t.includes('vibration') || t.includes('wave') || t.includes('pitch') || t.includes('frequency') || t.includes('loudness') || t.includes('amplitude') || t.includes('echo') || t.includes('reverberation')) return 'sound-wave';
    if (t.includes('heat') || t.includes('thermal') || t.includes('expansion') || t.includes('conduction') || t.includes('convection') || t.includes('radiation') || t.includes('change of state') || t.includes('boiling') || t.includes('evapor') || t.includes('condensation') || t.includes('sublimation') || t.includes('melting') || t.includes('fusion')) return 'heat-transfer';
    if (t.includes('magnet') || t.includes('compass') || t.includes('magnetic')) return 'magnet-explorer';
    if (t.includes('matter') || t.includes('particle') || t.includes('solid state') || t.includes('liquid state') || t.includes('gaseous state') || t.includes('kinetic theory')) return 'matter-states';
    if (t.includes('density') || t.includes('float') || t.includes('sink') || t.includes('buoyancy') || t.includes('upthrust') || t.includes('relative density') || t.includes('pressure') || t.includes('atmospheric')) return 'density-tank';
    if (t.includes('energy') || t.includes('work') || t.includes('power') || t.includes('lever') || t.includes('machine') || t.includes('mechanical advantage') || t.includes('turning effect') || t.includes('moment of force')) return 'energy-lever';
    return 'text-explorer';
  }
  if (subject === 'chem') {
    if (t.includes('atom') || t.includes('subatomic') || t.includes('atomic structure') || t.includes('atomic number') || t.includes('mass number')) return 'atom-builder';
    if (t.includes('mixture') || t.includes('separation') || t.includes('separate')) return 'mixture-separator';
    if (t.includes('matter') || t.includes('particle') || t.includes('physical change') || t.includes('chemical change') || t.includes('compound') || t.includes('reaction')) return 'reaction-viewer';
    if (t.includes('element') || t.includes('metal') || t.includes('non-metal') || t.includes('reactivity') || t.includes('periodic')) return 'periodic-table-explorer';
    if (t.includes('air') || t.includes('oxygen') || t.includes('carbon dioxide') || t.includes('nitrogen') || t.includes('hydrogen') || t.includes('water') || t.includes('gas')) return 'gas-properties-lab';
    if (t.includes('electronic configuration') || t.includes('valency') || t.includes('chemical equation') || t.includes('formula') || t.includes('language of chemistry') || t.includes('balancing')) return 'chemical-equation-balancer';
    if (t.includes('carbon') || t.includes('allotrop')) return 'gas-properties-lab';
    return 'text-explorer';
  }
  if (subject === 'bio') {
    if (t.includes('classif') || t.includes('5-kingdom') || t.includes('kingdom') || t.includes('monera') || t.includes('protist') || t.includes('fungi') || t.includes('plantae') || t.includes('animalia') || t.includes('vertebrate') || t.includes('invertebrate')) return 'classification-sorter';
    if (t.includes('cell') || t.includes('organelle') || t.includes('unicellular') || t.includes('multicellular') || t.includes('tissue')) return 'cell-explorer';
    if (t.includes('digestive') || t.includes('respiratory') || t.includes('circulatory') || t.includes('nervous') || t.includes('excretory') || t.includes('skeletal') || t.includes('endocrine') || t.includes('heart') || t.includes('blood') || t.includes('breathing') || t.includes('respiration') || t.includes('muscle') || t.includes('skin') || t.includes('reproductive') || t.includes('adolescence')) return 'body-systems';
    if (t.includes('leaf') || t.includes('flower') || t.includes('pollination') || t.includes('fertilization') || t.includes('fruit') || t.includes('seed') || t.includes('germination') || t.includes('photosynthesis') || t.includes('transpiration') || t.includes('xylem') || t.includes('phloem') || t.includes('plant') || t.includes('root') || t.includes('stem')) return 'plant-biology';
    if (t.includes('habitat') || t.includes('adaptation') || t.includes('ecosystem') || t.includes('food web') || t.includes('food chain') || t.includes('pyramid') || t.includes('pollution') || t.includes('environment') || t.includes('decomposition') || t.includes('symbiosis') || t.includes('parasitism') || t.includes('predation') || t.includes('interdependence') || t.includes('agriculture') || t.includes('crop') || t.includes('animal husbandry') || t.includes('microbe')) return 'ecology-explorer';
    if (t.includes('disease') || t.includes('hygiene') || t.includes('sanitation') || t.includes('vaccination') || t.includes('immunization') || t.includes('nutrition') || t.includes('deficiency') || t.includes('first aid') || t.includes('allergy') || t.includes('tobacco') || t.includes('alcohol') || t.includes('drug') || t.includes('health')) return 'health-disease';
    return 'diagram-explorer';
  }
  if (subject === 'maths') {
    if (t.includes('geometry') || t.includes('angle') || t.includes('triangle') || t.includes('quadrilateral') || t.includes('circle') || t.includes('construction') || t.includes('symmetry') || t.includes('congruen') || t.includes('parallel') || t.includes('shape') || t.includes('polygon') || t.includes('trapezium') || t.includes('area') || t.includes('perimeter') || t.includes('circumference') || t.includes('surface') || t.includes('volume') || t.includes('capacity') || t.includes('euler') || t.includes('3-d') || t.includes('3d') || t.includes('vertices') || t.includes('edges') || t.includes('faces') || t.includes('line') || t.includes('ray') || t.includes('open') || t.includes('closed') || t.includes('curvilinear') || t.includes('boundary')) return 'geometry-constructor';
    if (t.includes('data') || t.includes('statistics') || t.includes('bar graph') || t.includes('pie chart') || t.includes('mean') || t.includes('median') || t.includes('mode') || t.includes('graph') || t.includes('plot') || t.includes('cartesian') || t.includes('coordinate') || t.includes('pictograph') || t.includes('tally')) return 'graph-plotter';
    if (t.includes('probability') || t.includes('chance') || t.includes('coin') || t.includes('dice') || t.includes('random')) return 'probability-lab';
    if (t.includes('set') || t.includes('venn') || t.includes('cardinal')) return 'set-builder';
    if (t.includes('integer') || t.includes('negative number') || t.includes('number line')) return 'number-line';
    if (t.includes('rational number')) return 'ratio-proportion';
    if (t.includes('fraction') || t.includes('decimal')) return 'fraction-decimal-lab';
    if (t.includes('algebra') || t.includes('equation') || t.includes('expression') || t.includes('inequality') || t.includes('variable') || t.includes('factor') || t.includes('identit') || t.includes('literal') || t.includes('coefficient') || t.includes('linear equation') || t.includes('substitut')) return 'algebra-solver';
    if (t.includes('profit') || t.includes('loss') || t.includes('interest') || t.includes('percentage') || t.includes('discount') || t.includes('tax') || t.includes('bill') || t.includes('compound interest') || t.includes('simple interest')) return 'commercial-maths';
    if (t.includes('ratio') || t.includes('proportion') || t.includes('variation') || t.includes('unitary') || t.includes('speed') || t.includes('distance') || t.includes('time and work') || t.includes('word problem')) return 'ratio-proportion';
    if (t.includes('exponent') || t.includes('power') || t.includes('square') || t.includes('cube') || t.includes('root')) return 'exponent-lab';
    if (t.includes('number') || t.includes('place value') || t.includes('divisib') || t.includes('hcf') || t.includes('lcm') || t.includes('multiple') || t.includes('prime') || t.includes('composite') || t.includes('roman') || t.includes('estimation') || t.includes('approximation') || t.includes('simplification') || t.includes('bracket') || t.includes('operation')) return 'arithmetic-lab';
    if (t.includes('pattern') || t.includes('sequence') || t.includes('general')) return 'algebra-solver';
    return 'arithmetic-lab';
  }
  if (subject === 'geo') {
    if (t.includes('map') || t.includes('scale') || t.includes('direction') || t.includes('topographical') || t.includes('colour') || t.includes('sketch') || t.includes('plan') || t.includes('globe') || t.includes('representation of geographical')) return 'map-explorer';
    if (t.includes('mountain') || t.includes('valley') || t.includes('water bod') || t.includes('ocean') || t.includes('river') || t.includes('landform') || t.includes('continent') || t.includes('america') || t.includes('europe') || t.includes('africa') || t.includes('australia') || t.includes('antarctica') || t.includes('asia') || t.includes('india') || t.includes('volcanic') || t.includes('faulting') || t.includes('weathering') || t.includes('soil')) return 'landform-explorer';
    if (t.includes('atmosphere') || t.includes('weather') || t.includes('climate') || t.includes('ozone') || t.includes('agriculture') || t.includes('mineral') || t.includes('energy') || t.includes('industr') || t.includes('population') || t.includes('migration') || t.includes('urbanisation') || t.includes('disaster') || t.includes('vegetation') || t.includes('wildlife') || t.includes('human resource')) return 'climate-resource-explorer';
    return 'map-explorer';
  }
  if (subject === 'cs') {
    if (t.includes('flowchart') || t.includes('algorithm') || t.includes('problem-solving')) return 'flowchart-builder';
    if (t.includes('html') || t.includes('java') || t.includes('css') || t.includes('code') || t.includes('program') || t.includes('scratch') || t.includes('app') || t.includes('object-oriented') || t.includes('class declaration')) return 'code-editor';
    if (t.includes('binary') || t.includes('decimal') || t.includes('octal') || t.includes('hexadecimal') || t.includes('number system') || t.includes('number conversion') || t.includes('bit') || t.includes('byte')) return 'number-system-converter';
    if (t.includes('hardware') || t.includes('computer categor') || t.includes('micro') || t.includes('mini') || t.includes('mainframe') || t.includes('supercomputer') || t.includes('cpu') || t.includes('ram') || t.includes('rom') || t.includes('memory') || t.includes('storage') || t.includes('input device') || t.includes('output device') || t.includes('port') || t.includes('motherboard') || t.includes('translator') || t.includes('compiler') || t.includes('assembler') || t.includes('operating system') || t.includes('software type') || t.includes('system software') || t.includes('utility')) return 'computer-hardware-explorer';
    if (t.includes('excel') || t.includes('spreadsheet') || t.includes('powerpoint') || t.includes('word') || t.includes('database') || t.includes('sql') || t.includes('multimedia') || t.includes('animation') || t.includes('presentation')) return 'software-apps-lab';
    if (t.includes('network') || t.includes('internet') || t.includes('cloud') || t.includes('protocol') || t.includes('lan') || t.includes('wan') || t.includes('social media') || t.includes('online') || t.includes('virus') || t.includes('antivirus') || t.includes('security') || t.includes('cyber') || t.includes('ethic') || t.includes('safe') || t.includes('communication') || t.includes('e-commerce') || t.includes('web hosting') || t.includes('domain')) return 'networking-cloud-explorer';
    return 'text-explorer';
  }
  if (subject === 'histciv') {
    if (t.includes('civilisation') || t.includes('civilization') || t.includes('indus valley') || t.includes('egyptian') || t.includes('mesopotamian') || t.includes('chinese civilisation') || t.includes('aryan') || t.includes('vedic')) return 'civilization-explorer';
    if (t.includes('mauryan') || t.includes('gupta') || t.includes('sultanate') || t.includes('mughal') || t.includes('maratha') || t.includes('vijayanagar') || t.includes('bahamani') || t.includes('dynasty') || t.includes('empire') || t.includes('ashoka') || t.includes('chandragupta') || t.includes('babur') || t.includes('akbar') || t.includes('sher shah') || t.includes('peshwa')) return 'civilization-explorer';
    if (t.includes('constitution') || t.includes('parliament') || t.includes('panchayat') || t.includes('municipal') || t.includes('lok sabha') || t.includes('rajya sabha') || t.includes('president') || t.includes('vice-president') || t.includes('prime minister') || t.includes('supreme court') || t.includes('high court') || t.includes('judg') || t.includes('fundamental right') || t.includes('directive principle') || t.includes('welfare state') || t.includes('ambedkar') || t.includes('constituent assembly') || t.includes('local self-government') || t.includes('governance') || t.includes('united nations') || t.includes('uno') || t.includes('unesco') || t.includes('unicef') || t.includes('who') || t.includes('international court')) return 'governance-explorer';
    if (t.includes('bhakti') || t.includes('sufi') || t.includes('kabir') || t.includes('guru nanak') || t.includes('renaissance') || t.includes('reformation') || t.includes('imperialism') || t.includes('nationalism') || t.includes('nationalist') || t.includes('non-cooperation') || t.includes('civil disobedience') || t.includes('quit india') || t.includes('gandhi') || t.includes('gandhian') || t.includes('partition') || t.includes('independence') || t.includes('1857') || t.includes('uprising') || t.includes('revolt') || t.includes('swadeshi') || t.includes('home rule') || t.includes('lucknow pact') || t.includes('congress') || t.includes('moderate') || t.includes('assertive nationalist') || t.includes('social reform') || t.includes('brahmo samaj') || t.includes('arya samaj') || t.includes('ramakrishna') || t.includes('vivekananda') || t.includes('phule') || t.includes('syed ahmad') || t.includes('annie besant') || t.includes('christian') || t.includes('jesus') || t.includes('islam') || t.includes('muhammad') || t.includes('caliphate') || t.includes('crusade') || t.includes('monaster') || t.includes('byzantine') || t.includes('turk')) return 'movement-explorer';
    if (t.includes('timeline') || t.includes('chronolog') || t.includes('event') || t.includes('war') || t.includes('revolution') || t.includes('battle')) return 'timeline-builder';
    if (t.includes('early man') || t.includes('paleolithic') || t.includes('mesolithic') || t.includes('neolithic') || t.includes('fire') || t.includes('agriculture') || t.includes('domestication') || t.includes('cave painting') || t.includes('rock art') || t.includes('stone age') || t.includes('iron age') || t.includes('bronze')) return 'civilization-explorer';
    if (t.includes('source') || t.includes('historian') || t.includes('archaeolog') || t.includes('meaning of history') || t.includes('importance of') || t.includes('medieval') || t.includes('modern age') || t.includes('transition')) return 'concept-map';
    return 'concept-map';
  }
  return 'text-explorer';
}

// Simple parser — extract node blocks and key fields
function parseNodeBlock(block, subject, classLevel) {
  const headerMatch = block.match(/^---\s+NODE\s+(\S+)/);
  if (!headerMatch) return null;
  const nodeId = headerMatch[1];
  const title = (block.match(/^TITLE:\s*(.+)$/m) || [])[1]?.trim() || '';
  const definition = extractField(block, 'DEFINITION');
  const textWalkthrough = extractField(block, 'TEXT_WALKTHROUGH');
  const eli5 = extractField(block, 'ELI5');
  const misconceptionText = extractField(block, 'COMMON_MISCONCEPTION');
  const diagnosticText = extractField(block, 'DIAGNOSTIC_QUESTION');
  const cognitiveLevel = (block.match(/^COGNITIVE_LEVEL:\s*(.+)$/m) || [])[1]?.trim() || '';
  const masteryCriteria = extractField(block, 'MASTERY_CRITERIA');
  return { nodeId, title, definition, textWalkthrough, eli5, misconceptionText, diagnosticText, cognitiveLevel, masteryCriteria, subject, classLevel };
}

function extractField(block, fieldName) {
  const pattern = new RegExp(`^${fieldName}:\\s*\\|?\\s*$`, 'm');
  const m = block.match(pattern);
  if (!m) return '';
  const after = block.substring(m.index + m[0].length + 1);
  const lines = after.split('\n');
  const content = [];
  const fieldEnd = /^(TITLE|DEFINITION|TEXT_WALKTHROUGH|ELI5|COMMON_MISCONCEPTION|DIAGNOSTIC_QUESTION|ON_FAILURE|COGNITIVE_LEVEL|MASTERY_CRITERIA|SCOPE_BOUNDARY|SECTION|SYLLABUS|DIFFICULTY|EXAM_RELEVANCE|EXAM_WEIGHTAGE|COMPETENCY_LEVEL|PREREQ_STRENGTH|EXAMPLES|VOCABULARY|QUESTIONS|SPIRAL_TOPIC|SCOPE_LEVEL|IS_ROOT|PREREQ|REASON|DEPTH_PREREQ|DEPTH_REASON):/;
  for (const line of lines) {
    if (fieldEnd.test(line)) break;
    content.push(line.replace(/^[ \t]{2}/, ''));
  }
  return content.join('\n').replace(/\s+$/, '');
}

// Main extraction
const templateNodes = {};
for (const tpl of NEW_TEMPLATES) templateNodes[tpl] = [];

for (const [subj, dir] of Object.entries(SUBJECTS)) {
  const enrDir = path.join(CISCE_ROOT, dir, 'enrichment');
  if (!fs.existsSync(enrDir)) continue;
  for (const cls of [6, 7, 8]) {
    const files = fs.readdirSync(enrDir).filter(f => f.startsWith('c' + cls + '_') && f.endsWith('.marker'));
    for (const f of files) {
      const content = fs.readFileSync(path.join(enrDir, f), 'utf8');
      const blocks = content.split(/^---\s+NODE\s+/m).slice(1);
      for (const block of blocks) {
        const node = parseNodeBlock('--- NODE ' + block, subj, cls);
        if (!node) continue;
        const template = inferTemplateType(node.title, subj);
        if (templateNodes[template]) {
          templateNodes[template].push(node);
        }
      }
    }
  }
}

// Save JSON for each new template
for (const [template, nodes] of Object.entries(templateNodes)) {
  const outFile = path.join(OUT_DIR, `${template}.json`);
  // Limit to first 8 nodes to keep prompt size manageable
  const limited = nodes.slice(0, 8);
  fs.writeFileSync(outFile, JSON.stringify(limited, null, 2));
  console.log(`${template.padEnd(35)}: ${nodes.length} total nodes, ${limited.length} saved to JSON`);
}

console.log('\nDone! Enrichment data extracted for', NEW_TEMPLATES.length, 'new templates.');
