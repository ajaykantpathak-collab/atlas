/**
 * Split C6-C10 integrated Science nodes from physics.json into proper
 * physics, chemistry, biology files.
 *
 * CBSE teaches integrated Science for C6-C10. All 837 nodes are in physics.json
 * but many are actually chemistry or biology topics.
 *
 * This script:
 * 1. Reads physics.json (READ ONLY - does NOT modify it)
 * 2. Classifies each C6-C10 node as physics, chemistry, or biology
 *    based on chapter name and topic keywords
 * 3. Writes 3 NEW files (does NOT modify existing files):
 *    - D:\platform\cbse_data\nodes\by_subject\physics_c6_c10_split.json
 *    - D:\platform\cbse_data\nodes\by_subject\chemistry_c6_c10_split.json
 *    - D:\platform\cbse_data\nodes\by_subject\biology_c6_c10_split.json
 *
 * Classification is based on chapter names and topic keywords.
 */
const fs = require('fs');

const phys = JSON.parse(fs.readFileSync('D:/platform/cbse_data/nodes/by_subject/physics.json', 'utf8'));
const c6_10 = phys.filter(n => n.class_level >= 6 && n.class_level <= 10);

console.log('Total C6-C10 nodes in physics.json: ' + c6_10.length);

// ─── Chapter classification ───────────────────────────────────
// Map each chapter to its subject
const CHAPTER_MAP = {
    // C6
    'Food: Where Does It Come From?': 'biology',
    'Components of Food': 'biology',
    'Fibre to Fabric': 'chemistry',  // fibers, materials
    'Sorting Materials into Groups': 'chemistry',
    'Separation of Substances': 'chemistry',
    'Changes Around Us': 'chemistry',
    'Getting to Know Plants': 'biology',
    'Body Movements': 'biology',
    'The Living Organisms — Characteristics and Habitats': 'biology',
    'Motion and Measurement of Distances': 'physics',
    'Light, Shadows and Reflections': 'physics',
    'Electricity and Circuits': 'physics',
    'Fun with Magnets': 'physics',
    'Water': 'chemistry',
    'Air Around Us': 'chemistry',
    'Garbage in, Garbage out': 'biology',

    // C7
    'The Ever-Evolving World of Science': 'physics',  // general science
    'Exploring Substances: Acidic, Basic, and Neutral': 'chemistry',
    'Electricity: Circuits and their Components': 'physics',
    'The World of Metals and Non-metals': 'chemistry',
    'Changes Around Us: Physical and Chemical': 'chemistry',
    'Adolescence: A Stage of Growth and Change': 'biology',
    'Heat Transfer in Nature': 'physics',
    'Measurement of Time and Motion': 'physics',
    'Life Processes in Animals': 'biology',
    'Life Processes in Plants': 'biology',
    'Light: Shadows and Reflections': 'physics',
    'Earth, Moon, and the Sun': 'physics',
    'Nutrition in Plants': 'biology',
    'Nutrition in Animals': 'biology',
    'Heat': 'physics',
    'Acids, Bases and Salts': 'chemistry',
    'Physical and Chemical Changes: Classifying Transformations of Matter': 'chemistry',
    'Respiration in Organisms': 'biology',
    'Transportation in Animals and Plants': 'biology',
    'Reproduction in Plants': 'biology',
    'Motion and Time': 'physics',
    'Electric Current and its Effects': 'physics',
    'Light — Propagation, Reflection, Mirrors, Lenses, and Dispersion': 'physics',
    'Forests: Our Lifeline': 'biology',
    'Wastewater Story': 'biology',

    // C8
    'Electricity: Magnetic and Heating Effects': 'physics',
    'Nature of Matter: Elements, Compounds, and Mixtures': 'chemistry',
    'Keeping Time with the Skies': 'physics',
    'Conservation of Plants and Animals - CBSE Class 8 Science': 'biology',
    'Sound': 'physics',
    'Some Natural Phenomena': 'physics',
    'Light': 'physics',

    // C9
    'How Forces Affect Motion': 'physics',
    'Work, Energy, and Simple Machines': 'physics',
    'Journey Inside the Atom': 'chemistry',  // atomic structure
    'Sound Waves: Characteristics and Applications': 'physics',
    'Reproduction: How Life Continues': 'biology',

    // C10
    'Chemical Reactions and Equations': 'chemistry',
    'Life Processes': 'biology',
    'The Human Eye and the Colourful World': 'physics',
    'Electricity: Current, Circuits, and Applications': 'physics',
    'Magnetic Effects of Electric Current': 'physics',
    'Our Environment': 'biology',
};

// ─── Topic-based override keywords ────────────────────────────
// If chapter classification is ambiguous, use topic keywords
const TOPIC_OVERRIDE = {
    chemistry: ['chemical reaction', 'chemical equation', 'acid', 'base', 'salt', 'ph',
        'oxidation', 'reduction', 'redox', 'corrosion', 'rancidity', 'metal', 'non-metal',
        'reactivity', 'periodic', 'atom', 'atomic structure', 'electron', 'proton', 'neutron',
        'molecule', 'compound', 'mixture', 'element', 'fibre', 'fabric', 'separation',
        'matter', 'material', 'substance', 'water', 'air', 'combustion', 'fuel',
        'carbon', 'hydrocarbon', 'soap', 'detergent', 'polymer', 'fertilizer',
        'crystallization', 'distillation', 'filtration', 'evaporation', 'sublimation',
        'chemical change', 'physical change', 'electrolysis', 'electrochemical',
        'symbol', 'valency', 'chemical formula', 'bonding', 'covalent', 'ionic',
        'hydrogen', 'oxygen', 'nitrogen', 'carbon dioxide', 'sulphuric acid',
        'hard water', 'soft water', 'acid rain', 'alkane', 'alkene', 'alloy',
        'amalgam', 'vapour density', 'molecular mass', 'contact process',
        'polar', 'nonpolar', 'covalent compound', 'periodic properties', 'atomic size'],
    biology: ['living', 'organism', 'life process', 'nutrition', 'photosynthesis',
        'respiration', 'digestion', 'circulation', 'excretion', 'reproduction',
        'plant', 'animal', 'cell', 'tissue', 'organ', 'system', 'flower',
        'leaf', 'root', 'stem', 'seed', 'germination', 'pollination',
        'fertilization', 'food chain', 'ecosystem', 'environment', 'habitat',
        'adaptation', 'biodiversity', 'conservation', 'forest', 'wildlife',
        'health', 'disease', 'hygiene', 'vaccination', 'hormone', 'endocrine',
        'adolescence', 'puberty', 'skeleton', 'bone', 'joint', 'muscle',
        'body movement', 'breathing', 'kidney', 'excretory', 'blood',
        'heart', 'transportation', 'microorganism', 'microbe', 'bacteria',
        'virus', 'fungi', 'algae', 'protozoa', 'yeast', 'fermentation',
        'food preservation', 'garbage', 'waste', 'sewage', 'wastewater',
        'crop', 'agriculture', 'life', 'living world', 'species',
        'nervous system', 'brain', 'reflex', 'eye', 'ear'],
    physics: ['motion', 'force', 'energy', 'work', 'power', 'speed', 'velocity',
        'acceleration', 'displacement', 'distance', 'time', 'measurement',
        'light', 'shadow', 'reflection', 'refraction', 'mirror', 'lens',
        'electricity', 'current', 'circuit', 'voltage', 'resistance',
        'magnet', 'magnetic', 'electromagnet', 'motor', 'generator',
        'heat', 'temperature', 'conduction', 'convection', 'radiation',
        'sound', 'wave', 'vibration', 'frequency', 'amplitude', 'pitch',
        'loudness', 'echo', 'sonar', 'ultrasonic', 'earthquake', 'lightning',
        'electric charge', 'static', 'thunderstorm', 'seismograph',
        'simple machine', 'lever', 'pulley', 'inclined plane',
        'gravitation', 'gravity', 'weight', 'mass', 'pressure',
        'friction', 'newton', 'inertia', 'momentum', 'projectile',
        'orbit', 'satellite', 'kepler', 'pendulum', 'oscillation',
        'density', 'buoyancy', 'archimedes', 'fluid', 'atmospheric',
        'nuclear', 'radioactivity', 'fission', 'fusion', 'energy band',
        'semiconductor', 'diode', 'optics', 'dispersion', 'prism',
        'spectrum', 'electromagnetic', 'transformer', 'induction',
        'capacitor', 'field', 'potential', 'coulomb', 'ohm', 'kirchhoff',
        'thermodynamic', 'entropy', 'enthalpy', 'carnot', 'calorimetry',
        'specific heat', 'latent heat', 'expansion', 'equilibrium',
        'torque', 'angular', 'rotational', 'moment of inertia',
        'bernoulli', 'viscosity', 'surface tension', 'capillary',
        'elasticity', 'stress', 'strain', 'young modulus', 'hooke',
        'kepler law', 'gravitational', 'orbital', 'geostationary',
        'doppler', 'beats', 'harmonic', 'shm', 'wave optics',
        'interference', 'diffraction', 'polarization', 'huygens',
        'photoelectric', 'photon', 'de broglie', 'bohr model',
        'hydrogen spectrum', 'energy level', 'zener', 'rectifier',
        'transistor', 'logic gate', 'modulation', 'communication',
        'antenna', 'bandwidth', 'amplitude modulation', 'frequency modulation'],
};

function classifyNode(node) {
    const chapter = (node.chapter_name || '').trim();
    const topic = (node.topic || '').toLowerCase();
    const subject = (node.subject || '').toLowerCase();

    // 1. Check explicit chapter mapping
    if (CHAPTER_MAP[chapter]) {
        return CHAPTER_MAP[chapter];
    }

    // 2. Check subject field (if not 'physics' which is the default)
    if (subject === 'biology' || subject === 'bio') return 'biology';
    if (subject === 'chemistry' || subject === 'chem') return 'chemistry';
    if (subject === 'science' || subject === 'sci') {
        // Fall through to topic-based
    }

    // 3. Topic-based classification
    let bestSubject = 'physics'; // default
    let bestScore = 0;

    for (const [subj, keywords] of Object.entries(TOPIC_OVERRIDE)) {
        let score = 0;
        for (const kw of keywords) {
            if (topic.includes(kw)) score += kw.length;
        }
        if (score > bestScore) {
            bestScore = score;
            bestSubject = subj;
        }
    }

    return bestSubject;
}

// Classify all nodes
const split = { physics: [], chemistry: [], biology: [] };
const unclassified = [];

for (const node of c6_10) {
    const subject = classifyNode(node);
    split[subject].push(node);
}

// Report
console.log('');
console.log('=== SPLIT RESULTS ===');
console.log('Physics: ' + split.physics.length);
console.log('Chemistry: ' + split.chemistry.length);
console.log('Biology: ' + split.biology.length);
console.log('Total: ' + (split.physics.length + split.chemistry.length + split.biology.length));

// Per class
console.log('');
for (const subj of ['physics', 'chemistry', 'biology']) {
    console.log(subj + ':');
    const byC = {};
    for (const n of split[subj]) {
        const c = n.class_level;
        byC[c] = (byC[c] || 0) + 1;
    }
    for (const c of [6,7,8,9,10]) {
        console.log('  C' + c + ': ' + (byC[c] || 0));
    }
}

// Show chapters per subject
console.log('');
for (const subj of ['physics', 'chemistry', 'biology']) {
    console.log('=== ' + subj.toUpperCase() + ' CHAPTERS ===');
    const chapters = {};
    for (const n of split[subj]) {
        const ch = n.chapter_name || '(none)';
        if (!chapters[ch]) chapters[ch] = 0;
        chapters[ch]++;
    }
    for (const [ch, count] of Object.entries(chapters).sort()) {
        console.log('  ' + ch + ' (' + count + ')');
    }
    console.log('');
}

// Write NEW files (do NOT modify existing files)
const OUT_DIR = 'D:/platform/cbse_data/nodes/by_subject';
fs.writeFileSync(`${OUT_DIR}/physics_c6_c10_split.json`, JSON.stringify(split.physics, null, 2));
fs.writeFileSync(`${OUT_DIR}/chemistry_c6_c10_split.json`, JSON.stringify(split.chemistry, null, 2));
fs.writeFileSync(`${OUT_DIR}/biology_c6_c10_split.json`, JSON.stringify(split.biology, null, 2));

console.log('=== FILES WRITTEN (NEW files, existing files NOT modified) ===');
console.log(`  ${OUT_DIR}/physics_c6_c10_split.json (${split.physics.length} nodes)`);
console.log(`  ${OUT_DIR}/chemistry_c6_c10_split.json (${split.chemistry.length} nodes)`);
console.log(`  ${OUT_DIR}/biology_c6_c10_split.json (${split.biology.length} nodes)`);
