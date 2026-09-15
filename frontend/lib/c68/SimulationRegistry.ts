/**
 * SimulationRegistry — Maps enrichment nodes to simulation templates
 * and extracts real-world activities from enrichment content.
 *
 * This is the bridge between the enrichment data and the interactive
 * simulation components. It determines:
 * 1. Which simulation template to render for a given node
 * 2. What real-world activity to suggest
 * 3. What the transfer scenario should be
 */

import type { EnrichmentNode } from '../game-engine/EnrichmentParser';

// ─── Simulation Template Types ───────────────────────────────

export type SimulationTemplateType =
  // Physics (10)
  | 'measurement-lab'
  | 'motion-cart'
  | 'light-ray'
  | 'circuit-builder'
  | 'matter-states'
  | 'sound-wave'
  | 'heat-transfer'
  | 'magnet-explorer'
  | 'density-tank'
  | 'energy-lever'
  // Chemistry (6)
  | 'atom-builder'
  | 'mixture-separator'
  | 'reaction-viewer'
  | 'periodic-table-explorer'
  | 'gas-properties-lab'
  | 'chemical-equation-balancer'
  // Biology (6)
  | 'cell-explorer'
  | 'body-systems'
  | 'plant-biology'
  | 'ecology-explorer'
  | 'health-disease'
  | 'classification-sorter'
  | 'diagram-explorer'
  // Maths (11)
  | 'number-line'
  | 'arithmetic-lab'
  | 'fraction-decimal-lab'
  | 'algebra-solver'
  | 'set-builder'
  | 'commercial-maths'
  | 'ratio-proportion'
  | 'exponent-lab'
  | 'geometry-constructor'
  | 'graph-plotter'
  | 'probability-lab'
  // Geography (3)
  | 'map-explorer'
  | 'landform-explorer'
  | 'climate-resource-explorer'
  // Computer Science (6)
  | 'code-editor'
  | 'flowchart-builder'
  | 'computer-hardware-explorer'
  | 'software-apps-lab'
  | 'networking-cloud-explorer'
  | 'number-system-converter'
  // History / Civics (5)
  | 'timeline-builder'
  | 'civilization-explorer'
  | 'governance-explorer'
  | 'movement-explorer'
  | 'concept-map'
  // Fallback
  | 'text-explorer';

// ─── Real-world activity ─────────────────────────────────────

export interface RealWorldActivity {
  /** Short title for the activity */
  title: string;
  /** What the child should do (2-3 sentences, away from screen) */
  instructions: string;
  /** What the child should observe or notice */
  observe: string;
  /** What to report back when they return to the screen */
  reportPrompt: string;
}

// ─── Template mapping ────────────────────────────────────────

/**
 * Determine which simulation template to use for a given node.
 * Uses the node's subject, title, and keywords to pick the best template.
 */
export function inferTemplateType(node: EnrichmentNode): SimulationTemplateType {
  const title = node.title.toLowerCase();
  const subject = node.subject;
  const nodeId = node.nodeId.toLowerCase();

  // ─── Physics ──────────────────────────────────────────────
  if (subject === 'physics') {
    if (title.includes('measurement') || title.includes('physical quantit') ||
        title.includes('length') || (title.includes('mass') && title.includes('beam')) ||
        (title.includes('time') && (title.includes('clock') || title.includes('stopwatch'))) ||
        (title.includes('temperature') && title.includes('thermometer')) ||
        (title.includes('area') && title.includes('graph paper')) ||
        (title.includes('density') && (title.includes('measurement') || title.includes('irregular')))) {
      return 'measurement-lab';
    }
    if (title.includes('motion') || title.includes('speed') || title.includes('rectilinear') ||
        title.includes('uniform') || title.includes('circular') || title.includes('periodic') ||
        title.includes('force') || title.includes('weight') || title.includes('gravity') ||
        title.includes('friction')) {
      return 'motion-cart';
    }
    if (title.includes('light') || title.includes('reflection') || title.includes('mirror') ||
        title.includes('refraction') || title.includes('lens') || title.includes('dispersion') ||
        title.includes('image formation')) {
      return 'light-ray';
    }
    if (title.includes('circuit') || title.includes('electric') || title.includes('current') ||
        title.includes('voltage') || title.includes('ohm') || title.includes('wiring') ||
        title.includes('fuse') || title.includes('kwh') || title.includes('household') ||
        title.includes('static electric') || title.includes('charging') || title.includes('electroscope') ||
        title.includes('lightning')) {
      return 'circuit-builder';
    }
    if (title.includes('sound') || title.includes('vibration') || title.includes('wave') ||
        title.includes('pitch') || title.includes('frequency') || title.includes('loudness') ||
        title.includes('amplitude') || title.includes('echo') || title.includes('reverberation')) {
      return 'sound-wave';
    }
    if (title.includes('heat') || title.includes('thermal') || title.includes('expansion') ||
        title.includes('conduction') || title.includes('convection') || title.includes('radiation') ||
        title.includes('change of state') || title.includes('boiling') || title.includes('evapor') ||
        title.includes('condensation') || title.includes('sublimation') || title.includes('melting') ||
        title.includes('fusion')) {
      return 'heat-transfer';
    }
    if (title.includes('magnet') || title.includes('compass') || title.includes('magnetic')) {
      return 'magnet-explorer';
    }
    if (title.includes('matter') || title.includes('particle') || title.includes('solid state') ||
        title.includes('liquid state') || title.includes('gaseous state') || title.includes('kinetic theory')) {
      return 'matter-states';
    }
    if (title.includes('density') || title.includes('float') || title.includes('sink') ||
        title.includes('buoyancy') || title.includes('upthrust') || title.includes('relative density') ||
        title.includes('pressure') || title.includes('atmospheric')) {
      return 'density-tank';
    }
    if (title.includes('energy') || title.includes('work') || title.includes('power') ||
        title.includes('lever') || title.includes('machine') || title.includes('mechanical advantage') ||
        title.includes('turning effect') || title.includes('moment of force')) {
      return 'energy-lever';
    }
    return 'text-explorer';
  }

  // ─── Chemistry ────────────────────────────────────────────
  if (subject === 'chem') {
    if (title.includes('atom') || title.includes('subatomic') || title.includes('atomic structure') ||
        title.includes('atomic number') || title.includes('mass number')) {
      return 'atom-builder';
    }
    if (title.includes('mixture') || title.includes('separation') || title.includes('separate')) {
      return 'mixture-separator';
    }
    if (title.includes('matter') || title.includes('particle') || title.includes('physical change') ||
        title.includes('chemical change') || title.includes('compound') || title.includes('reaction')) {
      return 'reaction-viewer';
    }
    // Periodic table, elements, metals, reactivity
    if (title.includes('element') || title.includes('metal') || title.includes('non-metal') ||
        title.includes('reactivity') || title.includes('periodic')) {
      return 'periodic-table-explorer';
    }
    // Gases and water properties
    if (title.includes('air') || title.includes('oxygen') || title.includes('carbon dioxide') ||
        title.includes('nitrogen') || title.includes('hydrogen') || title.includes('water') ||
        title.includes('gas')) {
      return 'gas-properties-lab';
    }
    // Electronic configuration, valency, chemical equations, formulae
    if (title.includes('electronic configuration') || title.includes('valency') ||
        title.includes('chemical equation') || title.includes('formula') ||
        title.includes('language of chemistry') || title.includes('balancing')) {
      return 'chemical-equation-balancer';
    }
    // Carbon chemistry
    if (title.includes('carbon') || title.includes('allotrop')) {
      return 'gas-properties-lab';
    }
    return 'text-explorer';
  }

  // ─── Biology ──────────────────────────────────────────────
  if (subject === 'bio' || subject === 'biology') {
    // Classification
    if (title.includes('classif') || title.includes('5-kingdom') || title.includes('kingdom') ||
        title.includes('monera') || title.includes('protist') || title.includes('fungi') ||
        title.includes('plantae') || title.includes('animalia') ||
        title.includes('vertebrate') || title.includes('invertebrate')) {
      return 'classification-sorter';
    }
    // Cell-level topics
    if (title.includes('cell') || title.includes('organelle') || title.includes('unicellular') ||
        title.includes('multicellular') || title.includes('tissue')) {
      return 'cell-explorer';
    }
    // Human body systems
    if (title.includes('digestive') || title.includes('respiratory') || title.includes('circulatory') ||
        title.includes('nervous') || title.includes('excretory') || title.includes('skeletal') ||
        title.includes('endocrine') || title.includes('heart') || title.includes('blood') ||
        title.includes('breathing') || title.includes('respiration') || title.includes('muscle') ||
        title.includes('skin') || title.includes('reproductive') || title.includes('adolescence')) {
      return 'body-systems';
    }
    // Plant biology
    if (title.includes('leaf') || title.includes('flower') || title.includes('pollination') ||
        title.includes('fertilization') || title.includes('fruit') || title.includes('seed') ||
        title.includes('germination') || title.includes('photosynthesis') || title.includes('transpiration') ||
        title.includes('xylem') || title.includes('phloem') || title.includes('plant') ||
        title.includes('root') || title.includes('stem')) {
      return 'plant-biology';
    }
    // Ecology, environment, adaptation
    if (title.includes('habitat') || title.includes('adaptation') || title.includes('ecosystem') ||
        title.includes('food web') || title.includes('food chain') || title.includes('pyramid') ||
        title.includes('pollution') || title.includes('environment') || title.includes('decomposition') ||
        title.includes('symbiosis') || title.includes('parasitism') || title.includes('predation') ||
        title.includes('interdependence') || title.includes('agriculture') || title.includes('crop') ||
        title.includes('animal husbandry') || title.includes('microbe')) {
      return 'ecology-explorer';
    }
    // Health, disease, hygiene, nutrition
    if (title.includes('disease') || title.includes('hygiene') || title.includes('sanitation') ||
        title.includes('vaccination') || title.includes('immunization') || title.includes('nutrition') ||
        title.includes('deficiency') || title.includes('first aid') || title.includes('allergy') ||
        title.includes('tobacco') || title.includes('alcohol') || title.includes('drug') ||
        title.includes('health')) {
      return 'health-disease';
    }
    return 'diagram-explorer';
  }

  // ─── Maths ────────────────────────────────────────────────
  if (subject === 'maths') {
    // Statistics, data, graphs — check BEFORE geometry (pictograph, bar graph, cartesian)
    if (title.includes('data') || title.includes('statistics') || title.includes('bar graph') ||
        title.includes('pie chart') || title.includes('mean') || title.includes('median') ||
        title.includes('mode') || title.includes('graph') || title.includes('plot') ||
        title.includes('cartesian') || title.includes('coordinate') || title.includes('pictograph') ||
        title.includes('tally')) {
      return 'graph-plotter';
    }
    // Probability
    if (title.includes('probability') || title.includes('chance') || title.includes('coin') ||
        title.includes('dice') || title.includes('random')) {
      return 'probability-lab';
    }
    // Sets — check BEFORE geometry (set keyword would not conflict, but "set" is short)
    if (title.includes('set') || title.includes('venn') || title.includes('cardinal')) {
      return 'set-builder';
    }
    // Integers and number line — check BEFORE geometry (number LINE, negative numbers)
    if (title.includes('integer') || title.includes('negative number') || title.includes('number line')) {
      return 'number-line';
    }
    // Rational numbers — check BEFORE geometry (representation on number LINE)
    if (title.includes('rational number')) {
      return 'ratio-proportion';
    }
    // Fractions and decimals — check BEFORE geometry (fraction representation on number LINE)
    if (title.includes('fraction') || title.includes('decimal')) {
      return 'fraction-decimal-lab';
    }
    // Algebra, equations, expressions — check BEFORE geometry (LINEAR equation)
    if (title.includes('algebra') || title.includes('equation') || title.includes('expression') ||
        title.includes('inequality') || title.includes('variable') || title.includes('factor') ||
        title.includes('identit') || title.includes('literal') || title.includes('coefficient') ||
        title.includes('linear equation') || title.includes('substitut')) {
      return 'algebra-solver';
    }
    // Commercial maths
    if (title.includes('profit') || title.includes('loss') || title.includes('interest') ||
        title.includes('percentage') || title.includes('discount') || title.includes('tax') ||
        title.includes('bill') || title.includes('compound interest') || title.includes('simple interest')) {
      return 'commercial-maths';
    }
    // Ratio, proportion, variation, unitary method, word problems
    if (title.includes('ratio') || title.includes('proportion') || title.includes('variation') ||
        title.includes('unitary') || title.includes('speed') || title.includes('distance') ||
        title.includes('time and work') || title.includes('word problem')) {
      return 'ratio-proportion';
    }
    // Exponents, powers, squares, cubes, roots
    if (title.includes('exponent') || title.includes('power') || title.includes('square') ||
        title.includes('cube') || title.includes('root')) {
      return 'exponent-lab';
    }
    // Conversion of units — check BEFORE geometry (not geometry)
    if (title.includes('conversion of unit') || title.includes('unit conversion')) {
      return 'arithmetic-lab';
    }
    // Geometry, shapes, area, volume — NOW check (after all non-geometry "line" topics are filtered)
    if (title.includes('geometry') || title.includes('angle') || title.includes('triangle') ||
        title.includes('quadrilateral') || title.includes('circle') || title.includes('construction') ||
        title.includes('symmetry') || title.includes('congruen') || title.includes('parallel') ||
        title.includes('shape') || title.includes('polygon') || title.includes('trapezium') ||
        title.includes('area') || title.includes('perimeter') || title.includes('circumference') ||
        title.includes('surface') || title.includes('volume') || title.includes('capacity') ||
        title.includes('euler') || title.includes('3-d') || title.includes('3d') ||
        title.includes('vertices') || title.includes('edges') || title.includes('faces') ||
        title.includes('line segment') || title.includes('line,') || title.includes('ray') ||
        title.includes('open') || title.includes('closed') || title.includes('curvilinear') ||
        title.includes('boundary') || title.includes('perpendicular')) {
      return 'geometry-constructor';
    }
    // Arithmetic: place value, number properties, divisibility, HCF, LCM
    if (title.includes('number') || title.includes('place value') || title.includes('divisib') ||
        title.includes('hcf') || title.includes('lcm') || title.includes('multiple') ||
        title.includes('prime') || title.includes('composite') || title.includes('roman') ||
        title.includes('estimation') || title.includes('approximation') ||
        title.includes('simplification') || title.includes('bracket') || title.includes('operation')) {
      return 'arithmetic-lab';
    }
    // Patterns and sequences
    if (title.includes('pattern') || title.includes('sequence') || title.includes('general')) {
      return 'algebra-solver';
    }
    return 'arithmetic-lab';
  }

  // ─── Geography ────────────────────────────────────────────
  if (subject === 'geo' || subject === 'geography') {
    // Map-related topics
    if (title.includes('map') || title.includes('scale') || title.includes('direction') ||
        title.includes('topographical') || title.includes('colour') || title.includes('sketch') ||
        title.includes('plan') || title.includes('globe') || title.includes('representation of geographical')) {
      return 'map-explorer';
    }
    // Landforms, continents, physical features
    if (title.includes('mountain') || title.includes('valley') || title.includes('water bod') ||
        title.includes('ocean') || title.includes('river') || title.includes('landform') ||
        title.includes('continent') || title.includes('america') || title.includes('europe') ||
        title.includes('africa') || title.includes('australia') || title.includes('antarctica') ||
        title.includes('asia') || title.includes('india') || title.includes('volcanic') ||
        title.includes('faulting') || title.includes('weathering') || title.includes('soil')) {
      return 'landform-explorer';
    }
    // Climate, atmosphere, resources, population
    if (title.includes('atmosphere') || title.includes('weather') || title.includes('climate') ||
        title.includes('ozone') || title.includes('agriculture') || title.includes('mineral') ||
        title.includes('energy') || title.includes('industr') || title.includes('population') ||
        title.includes('migration') || title.includes('urbanisation') || title.includes('disaster') ||
        title.includes('vegetation') || title.includes('wildlife') || title.includes('human resource')) {
      return 'climate-resource-explorer';
    }
    return 'map-explorer';
  }

  // ─── Computer Science ─────────────────────────────────────
  if (subject === 'cs' || subject === 'computer') {
    // Flowcharts and algorithms
    if (title.includes('flowchart') || title.includes('algorithm') || title.includes('problem-solving')) {
      return 'flowchart-builder';
    }
    // Programming: HTML, Java, Scratch, code
    if (title.includes('html') || title.includes('java') || title.includes('css') ||
        title.includes('code') || title.includes('program') || title.includes('scratch') ||
        title.includes('app') || title.includes('object-oriented') || title.includes('class declaration')) {
      return 'code-editor';
    }
    // Number systems
    if (title.includes('binary') || title.includes('decimal') || title.includes('octal') ||
        title.includes('hexadecimal') || title.includes('number system') || title.includes('number conversion') ||
        title.includes('bit') || title.includes('byte')) {
      return 'number-system-converter';
    }
    // Hardware
    if (title.includes('hardware') || title.includes('computer categor') || title.includes('micro') ||
        title.includes('mini') || title.includes('mainframe') || title.includes('supercomputer') ||
        title.includes('cpu') || title.includes('ram') || title.includes('rom') ||
        title.includes('memory') || title.includes('storage') || title.includes('input device') ||
        title.includes('output device') || title.includes('port') || title.includes('motherboard') ||
        title.includes('translator') || title.includes('compiler') || title.includes('assembler') ||
        title.includes('operating system') || title.includes('software type') ||
        title.includes('system software') || title.includes('utility') ||
        title.includes('gui') || title.includes('graphical user interface') ||
        title.includes('command line') || title.includes('cli')) {
      return 'computer-hardware-explorer';
    }
    // Software applications: Excel, Word, PowerPoint, databases, file management, IDE
    if (title.includes('excel') || title.includes('spreadsheet') || title.includes('powerpoint') ||
        title.includes('word') || title.includes('database') || title.includes('sql') ||
        title.includes('multimedia') || title.includes('animation') || title.includes('presentation') ||
        title.includes('file management') || title.includes('file propert') ||
        title.includes('compress') || title.includes('zip') || title.includes('access table') ||
        title.includes('access quer') || title.includes('bluej') || title.includes('ide') ||
        title.includes('file type') || title.includes('file extension')) {
      return 'software-apps-lab';
    }
    // Networking, internet, cloud, security
    if (title.includes('network') || title.includes('internet') || title.includes('cloud') ||
        title.includes('protocol') || title.includes('lan') || title.includes('wan') ||
        title.includes('social media') || title.includes('online') || title.includes('virus') ||
        title.includes('antivirus') || title.includes('security') || title.includes('cyber') ||
        title.includes('ethic') || title.includes('safe') || title.includes('communication') ||
        title.includes('e-commerce') || title.includes('web hosting') || title.includes('domain')) {
      return 'networking-cloud-explorer';
    }
    return 'text-explorer';
  }

  // ─── History / Civics ─────────────────────────────────────
  if (subject === 'histciv' || subject === 'history' || subject === 'civics') {
    // Timeline: chronological events, civilizations, dynasties, empires
    if (title.includes('civilisation') || title.includes('civilization') ||
        title.includes('indus valley') || title.includes('egyptian') || title.includes('mesopotamian') ||
        title.includes('chinese civilisation') || title.includes('aryan') || title.includes('vedic')) {
      return 'civilization-explorer';
    }
    // Dynasties and empires
    if (title.includes('mauryan') || title.includes('gupta') || title.includes('sultanate') ||
        title.includes('mughal') || title.includes('maratha') || title.includes('vijayanagar') ||
        title.includes('bahamani') || title.includes('dynasty') || title.includes('empire') ||
        title.includes('ashoka') || title.includes('chandragupta') || title.includes('babur') ||
        title.includes('akbar') || title.includes('sher shah') || title.includes('peshwa')) {
      return 'civilization-explorer';
    }
    // Governance: Constitution, Parliament, Panchayati Raj, courts, UN
    if (title.includes('constitution') || title.includes('parliament') || title.includes('panchayat') ||
        title.includes('municipal') || title.includes('lok sabha') || title.includes('rajya sabha') ||
        title.includes('president') || title.includes('vice-president') || title.includes('prime minister') ||
        title.includes('supreme court') || title.includes('high court') || title.includes('judg') ||
        title.includes('fundamental right') || title.includes('directive principle') ||
        title.includes('welfare state') || title.includes('ambedkar') || title.includes('constituent assembly') ||
        title.includes('local self-government') || title.includes('governance') ||
        title.includes('united nations') || title.includes('uno') || title.includes('unesco') ||
        title.includes('unicef') || title.includes('who') || title.includes('international court') ||
        title.includes('preamble') || title.includes('nature of the state') ||
        title.includes('objectives') || title.includes('justice, liberty') ||
        title.includes('gandhian principles') || title.includes('gram sabha') ||
        title.includes('zila parishad') || title.includes('citizen participation') ||
        title.includes('metropolitan') || title.includes('general principles') ||
        title.includes('economic equality') || title.includes('articles 38') ||
        title.includes('organs of the un') || title.includes('general assembly') ||
        title.includes('security council')) {
      return 'governance-explorer';
    }
    // Movements: Bhakti, Sufi, Renaissance, Reformation, Imperialism, Nationalism, Independence, religions
    if (title.includes('bhakti') || title.includes('sufi') || title.includes('kabir') ||
        title.includes('guru nanak') || title.includes('renaissance') || title.includes('reformation') ||
        title.includes('imperialism') || title.includes('nationalism') || title.includes('nationalist') ||
        title.includes('non-cooperation') || title.includes('civil disobedience') ||
        title.includes('quit india') || title.includes('gandhi') || title.includes('gandhian') ||
        title.includes('partition') || title.includes('independence') || title.includes('1857') ||
        title.includes('uprising') || title.includes('revolt') || title.includes('swadeshi') ||
        title.includes('home rule') || title.includes('lucknow pact') || title.includes('congress') ||
        title.includes('moderate') || title.includes('assertive nationalist') ||
        title.includes('social reform') || title.includes('brahmo samaj') || title.includes('arya samaj') ||
        title.includes('ramakrishna') || title.includes('vivekananda') || title.includes('phule') ||
        title.includes('syed ahmad') || title.includes('annie besant') ||
        title.includes('christian') || title.includes('jesus') || title.includes('islam') ||
        title.includes('muhammad') || title.includes('caliphate') || title.includes('crusade') ||
        title.includes('monaster') || title.includes('byzantine') || title.includes('turk') ||
        title.includes('jainism') || title.includes('buddhism') || title.includes('mahavira') ||
        title.includes('buddha') || title.includes('veda') || title.includes('upanishad') ||
        title.includes('epic') || title.includes('ramayana') || title.includes('mahabharata') ||
        title.includes('east india company') || title.includes('doctrine of lapse') ||
        title.includes('subsidiary alliance') || title.includes('permanent settlement') ||
        title.includes('drain of wealth') || title.includes('wood') || title.includes('exploitation') ||
        title.includes('economic policy') || title.includes('dual government') ||
        title.includes('regional kingdom') || title.includes('regional power') ||
        title.includes('rajput') || title.includes('mysore') ||
        title.includes('american war') ||
        title.includes('lincoln')) {
      return 'movement-explorer';
    }
    // Timeline for explicitly chronological topics
    if (title.includes('timeline') || title.includes('chronolog') || title.includes('event') ||
        title.includes('war') || title.includes('revolution') || title.includes('battle')) {
      return 'timeline-builder';
    }
    // Early man, stone age, prehistory
    if (title.includes('early man') || title.includes('paleolithic') || title.includes('mesolithic') ||
        title.includes('neolithic') || title.includes('fire') || title.includes('agriculture') ||
        title.includes('domestication') || title.includes('cave painting') || title.includes('rock art') ||
        title.includes('stone age') || title.includes('iron age') || title.includes('bronze')) {
      return 'civilization-explorer';
    }
    // Dynasties and empires (expanded — check after movements so religion-related dynasties go to movement)
    if (title.includes('mauryan') || title.includes('gupta') || title.includes('sultanate') ||
        title.includes('mughal') || title.includes('maratha') || title.includes('vijayanagar') ||
        title.includes('bahamani') || title.includes('dynasty') || title.includes('empire') ||
        title.includes('ashoka') || title.includes('chandragupta') || title.includes('babur') ||
        title.includes('akbar') || title.includes('sher shah') || title.includes('peshwa') ||
        title.includes('janapada') || title.includes('mahajanapada') || title.includes('magadha') ||
        title.includes('khalji') || title.includes('tughlaq') || title.includes('jahangir') ||
        title.includes('shah jahan') || title.includes('aurangzeb') || title.includes('nanda') ||
        title.includes('bimbisara') || title.includes('ajatashatru') || title.includes('samudragupta')) {
      return 'civilization-explorer';
    }
    // Sources of history, historians, meta-topics
    if (title.includes('source') || title.includes('historian') || title.includes('archaeolog') ||
        title.includes('meaning of history') || title.includes('importance of') ||
        title.includes('medieval') || title.includes('modern age') || title.includes('transition')) {
      return 'concept-map';
    }
    return 'concept-map';
  }

  return 'text-explorer';
}

// ─── Real-world activity extraction ──────────────────────────

/**
 * Extract a real-world activity from the enrichment node's content.
 *
 * The enrichment files contain activities in:
 * - The TEXT_WALKTHROUGH (describes experiments)
 * - The DIAGNOSTIC_QUESTION Q4 (apply — asks the student to do something real)
 * - The DEFINITION (sometimes mentions activities)
 *
 * We extract the most actionable activity and format it for the child.
 */
export function extractRealWorldActivity(node: EnrichmentNode): RealWorldActivity {
  // Try to extract from Q4 (apply question) — this is the most actionable
  const applyQ = node.diagnosticQuestions.find(q => q.bloomLevel === 'apply');
  if (applyQ) {
    return {
      title: 'Try This Yourself',
      instructions: applyQ.question,
      observe: 'Write down what you observe. Compare your results with what you expected.',
      reportPrompt: 'What did you find when you tried this? Type your observation below.',
    };
  }

  // Try to extract from TEXT_WALKTHROUGH — look for activity keywords
  const walkthrough = node.textWalkthrough;
  const activityPatterns = [
    /try this activity[^.]*\.([\s\S]*?)(?:[A-Z][a-z]+:|$)/i,
    /activity[^.]*:([^.]+\.)/i,
    /measure[^.]*\./i,
    /observe[^.]*\./i,
    /take[^.]*and[^.]*\./i,
  ];

  for (const pattern of activityPatterns) {
    const match = walkthrough.match(pattern);
    if (match && match[0].length > 20) {
      return {
        title: 'Hands-On Activity',
        instructions: match[0].trim(),
        observe: 'Pay attention to what changes and what stays the same.',
        reportPrompt: 'Describe what you observed when you did this activity.',
      };
    }
  }

  // Fallback: generate a generic activity based on the subject
  const subjectActivities: Record<string, RealWorldActivity> = {
    physics: {
      title: 'Look Around You',
      instructions: `Find one real example of "${node.title}" in your home or classroom. Touch it, observe it, and think about how it works.`,
      observe: 'Notice the details — size, shape, movement, temperature, or whatever is relevant.',
      reportPrompt: 'What real-world example did you find? Describe it.',
    },
    chem: {
      title: 'Kitchen Chemistry',
      instructions: `Look in your kitchen for an example related to "${node.title}". Many chemistry concepts can be seen in cooking, cleaning, or everyday materials.`,
      observe: 'Notice the properties — colour, smell, texture, state (solid/liquid/gas).',
      reportPrompt: 'What did you find in your kitchen? How does it relate to this topic?',
    },
    bio: {
      title: 'Nature Walk',
      instructions: `Step outside or look out a window for 2 minutes. Find one living thing that relates to "${node.title}".`,
      observe: 'Notice how it looks, moves, and responds to its environment.',
      reportPrompt: 'What living thing did you observe? How does it connect to this topic?',
    },
    maths: {
      title: 'Maths in Real Life',
      instructions: `Find one situation in your daily life where "${node.title}" is used. It could be in cooking, shopping, building, or playing.`,
      observe: 'Notice the numbers, shapes, or patterns involved.',
      reportPrompt: 'Where did you see this maths concept in real life? Describe it.',
    },
    geo: {
      title: 'Map Your Surroundings',
      instructions: `Look at your surroundings and think about how "${node.title}" applies to what you see. If it's about landforms, look outside. If it's about maps, draw a simple map of your room.`,
      observe: 'Notice the spatial relationships — where things are relative to each other.',
      reportPrompt: 'How does this geography concept appear in your surroundings?',
    },
    cs: {
      title: 'Tech Around You',
      instructions: `Find one device or application in your home that relates to "${node.title}". Think about how it works.`,
      observe: 'Notice the inputs, outputs, and what happens when you interact with it.',
      reportPrompt: 'What technology did you find? How does it relate to this topic?',
    },
    histciv: {
      title: 'Connect to Today',
      instructions: `Think about how "${node.title}" connects to something in your life today. History and civics are not just about the past — they shape the present.`,
      observe: 'Notice the connections between past events and current situations.',
      reportPrompt: 'How does this historical or civic topic connect to your life today?',
    },
  };

  return subjectActivities[node.subject] ?? subjectActivities.physics;
}

// ─── Template metadata ───────────────────────────────────────

export interface TemplateInfo {
  type: SimulationTemplateType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const TEMPLATE_INFO: Record<SimulationTemplateType, TemplateInfo> = {
  // Physics
  'measurement-lab':    { type: 'measurement-lab',    name: 'Measurement Lab',       description: 'Rulers, balances, thermometers, and graph paper',     icon: '📏', color: '#4caf50' },
  'motion-cart':        { type: 'motion-cart',        name: 'Motion Simulator',      description: 'Cart with adjustable force, mass, and friction',     icon: '🚗', color: '#2196f3' },
  'light-ray':          { type: 'light-ray',          name: 'Light Ray Tracer',      description: 'Light source, mirrors, lenses, ray diagrams',         icon: '💡', color: '#ff9800' },
  'circuit-builder':    { type: 'circuit-builder',    name: 'Circuit Builder',       description: 'Build circuits with cells, bulbs, and switches',      icon: '🔋', color: '#f44336' },
  'matter-states':      { type: 'matter-states',      name: 'Matter States Lab',     description: 'Particles in solid, liquid, and gas states',          icon: '⚛️', color: '#9c27b0' },
  'sound-wave':         { type: 'sound-wave',         name: 'Sound Wave Visualizer', description: 'Amplitude, frequency, pitch, and loudness',           icon: '🔊', color: '#00bcd4' },
  'heat-transfer':      { type: 'heat-transfer',      name: 'Heat Transfer Lab',     description: 'Conduction, convection, radiation, particle motion',  icon: '🔥', color: '#ff5722' },
  'magnet-explorer':    { type: 'magnet-explorer',    name: 'Magnet Explorer',       description: 'Magnetic poles, fields, attraction and repulsion',    icon: '🧲', color: '#607d8b' },
  'density-tank':       { type: 'density-tank',       name: 'Density Tank',          description: 'Drop objects in water, see float and sink',           icon: '🪣', color: '#009688' },
  'energy-lever':       { type: 'energy-lever',       name: 'Energy & Lever Lab',    description: 'KE/PE conversion, lever classes, mechanical advantage', icon: '⚙️', color: '#795548' },
  // Chemistry
  'atom-builder':       { type: 'atom-builder',       name: 'Atom Builder',          description: 'Build atoms with protons, neutrons, electrons',       icon: '🔬', color: '#e91e63' },
  'mixture-separator':  { type: 'mixture-separator',  name: 'Mixture Separator',     description: 'Filtration, distillation, evaporation techniques',    icon: '🧪', color: '#8bc34a' },
  'reaction-viewer':    { type: 'reaction-viewer',    name: 'Reaction Viewer',       description: 'Physical and chemical changes, before and after',     icon: '💥', color: '#ff6f00' },
  'periodic-table-explorer': { type: 'periodic-table-explorer', name: 'Periodic Explorer', description: 'Elements, metals, non-metals, reactivity series', icon: '🧱', color: '#bf360c' },
  'gas-properties-lab': { type: 'gas-properties-lab', name: 'Gas & Water Lab',       description: 'Air, oxygen, CO₂, hydrogen, water properties',         icon: '💨', color: '#26c6da' },
  'chemical-equation-balancer': { type: 'chemical-equation-balancer', name: 'Equation Balancer', description: 'Balance chemical equations, valency, formulae', icon: '⚖️', color: '#ab47bc' },
  // Biology
  'cell-explorer':      { type: 'cell-explorer',      name: 'Cell Explorer',         description: 'Plant and animal cells, organelles, tissues',          icon: '🦠', color: '#66bb6a' },
  'body-systems':       { type: 'body-systems',       name: 'Body Systems',          description: 'Digestive, respiratory, circulatory, nervous systems', icon: '🫀', color: '#ef5350' },
  'plant-biology':      { type: 'plant-biology',      name: 'Plant Biology',         description: 'Leaf, flower, photosynthesis, transpiration',         icon: '🌱', color: '#43a047' },
  'ecology-explorer':   { type: 'ecology-explorer',   name: 'Ecology Explorer',      description: 'Habitats, ecosystems, food webs, pollution',          icon: '🌳', color: '#2e7d32' },
  'health-disease':     { type: 'health-disease',     name: 'Health & Disease',      description: 'Diseases, hygiene, vaccination, nutrition',           icon: '🩺', color: '#ec407a' },
  'classification-sorter': { type: 'classification-sorter', name: 'Classification Sorter', description: 'Sort and classify living things',               icon: '🏷️', color: '#4caf50' },
  'diagram-explorer':   { type: 'diagram-explorer',   name: 'Interactive Diagram',   description: 'Click parts of a diagram to learn more',              icon: '📖', color: '#3f51b5' },
  // Maths
  'number-line':        { type: 'number-line',        name: 'Number Line',           description: 'Integers, negative numbers, number line operations',  icon: '➗', color: '#673ab7' },
  'arithmetic-lab':     { type: 'arithmetic-lab',     name: 'Arithmetic Lab',        description: 'Place value, divisibility, HCF, LCM, number properties', icon: '🔢', color: '#5e35b1' },
  'fraction-decimal-lab': { type: 'fraction-decimal-lab', name: 'Fraction & Decimal Lab', description: 'Fractions, decimals, percentages, conversions', icon: '½', color: '#7e57c2' },
  'algebra-solver':     { type: 'algebra-solver',     name: 'Algebra Solver',        description: 'Expressions, equations, inequalities, factorisation', icon: '𝑥', color: '#4527a0' },
  'set-builder':        { type: 'set-builder',        name: 'Set Builder',           description: 'Sets, Venn diagrams, cardinality, union, intersection', icon: '∪', color: '#3949ab' },
  'commercial-maths':   { type: 'commercial-maths',   name: 'Commercial Maths',      description: 'Profit, loss, interest, percentage, discount',         icon: '💰', color: '#283593' },
  'ratio-proportion':   { type: 'ratio-proportion',   name: 'Ratio & Proportion',    description: 'Ratio, proportion, variation, unitary method',         icon: '⚖', color: '#1e88e5' },
  'exponent-lab':       { type: 'exponent-lab',       name: 'Exponent Lab',          description: 'Exponents, powers, squares, cubes, roots',             icon: 'x²', color: '#1565c0' },
  'geometry-constructor': { type: 'geometry-constructor', name: 'Geometry Constructor', description: 'Draw shapes, measure angles and areas',           icon: '📐', color: '#009688' },
  'graph-plotter':      { type: 'graph-plotter',      name: 'Graph & Data Plotter',  description: 'Bar graphs, pie charts, data visualization',          icon: '📊', color: '#cddc39' },
  'probability-lab':    { type: 'probability-lab',    name: 'Probability Lab',       description: 'Flip coins, roll dice, see probability in action',    icon: '🎲', color: '#ffc107' },
  // Geography
  'map-explorer':       { type: 'map-explorer',       name: 'Map Explorer',          description: 'Interactive maps with directions, scale, landforms',   icon: '🗺️', color: '#8d6e63' },
  'landform-explorer':  { type: 'landform-explorer',  name: 'Landform Explorer',     description: 'Mountains, valleys, rivers, continents, physical features', icon: '⛰️', color: '#6d4c41' },
  'climate-resource-explorer': { type: 'climate-resource-explorer', name: 'Climate & Resources', description: 'Atmosphere, weather, agriculture, minerals, population', icon: '🌦️', color: '#5d4037' },
  // Computer Science
  'code-editor':        { type: 'code-editor',        name: 'Code Editor',           description: 'Write HTML, Java, and Scratch with live preview',     icon: '💻', color: '#37474f' },
  'flowchart-builder':  { type: 'flowchart-builder',  name: 'Flowchart Builder',     description: 'Drag-and-drop flowchart symbols and logic',           icon: '🔀', color: '#546e7a' },
  'computer-hardware-explorer': { type: 'computer-hardware-explorer', name: 'Hardware Explorer', description: 'CPU, RAM, ROM, ports, computer categories', icon: '🖥️', color: '#455a64' },
  'software-apps-lab':  { type: 'software-apps-lab',  name: 'Software Apps Lab',     description: 'Excel, Word, PowerPoint, databases',                   icon: '📋', color: '#607d8b' },
  'networking-cloud-explorer': { type: 'networking-cloud-explorer', name: 'Networking & Cloud', description: 'Networks, internet, cloud, security, ethics', icon: '🌐', color: '#78909c' },
  'number-system-converter': { type: 'number-system-converter', name: 'Number System Converter', description: 'Binary, decimal, octal, hexadecimal conversions', icon: '0️⃣', color: '#90a4ae' },
  // History / Civics
  'timeline-builder':   { type: 'timeline-builder',   name: 'Timeline Builder',      description: 'Arrange events on an interactive timeline',           icon: '📅', color: '#b71c1c' },
  'civilization-explorer': { type: 'civilization-explorer', name: 'Civilization Explorer', description: 'Indus Valley, Egyptian, Mauryan, Gupta, Mughal', icon: '🏛️', color: '#d84315' },
  'governance-explorer': { type: 'governance-explorer', name: 'Governance Explorer',  description: 'Constitution, Parliament, Panchayati Raj, courts',     icon: '⚖️', color: '#c62828' },
  'movement-explorer':  { type: 'movement-explorer',  name: 'Movement Explorer',     description: 'Bhakti, Sufi, Renaissance, Nationalism, Independence', icon: '✊', color: '#ad1457' },
  'concept-map':        { type: 'concept-map',        name: 'Concept Map',           description: 'Connect ideas and see relationships',                 icon: '🕸️', color: '#6a1b9a' },
  // Fallback
  'text-explorer':      { type: 'text-explorer',      name: 'Text Explorer',         description: 'Read, highlight, and explore the concept',            icon: '📝', color: '#78909c' },
};

export function getTemplateInfo(type: SimulationTemplateType): TemplateInfo {
  return TEMPLATE_INFO[type] ?? TEMPLATE_INFO['text-explorer'];
}

export function getTemplateInfoForNode(node: EnrichmentNode): TemplateInfo {
  return getTemplateInfo(inferTemplateType(node));
}
