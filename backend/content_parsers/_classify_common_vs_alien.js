const fs = require('fs');

const report = JSON.parse(fs.readFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.json', 'utf8'));

// Re-read CBSE syllabus to get all topics for matching
const cbseSyllabusDir = 'D:/educational_platform/syllabus_data/CBSE';
const cbseSyllabus = {};
const cbseFiles = fs.readdirSync(cbseSyllabusDir).filter(f => f.endsWith('.json') && !f.match(/English|Hindi/i));
for (const f of cbseFiles) {
    const data = JSON.parse(fs.readFileSync(cbseSyllabusDir + '/' + f, 'utf8'));
    if (Array.isArray(data)) {
        for (const item of data) {
            const subj = f.replace('.json', '');
            const key = subj + '_' + item.grade;
            if (!cbseSyllabus[key]) cbseSyllabus[key] = [];
            for (const t of (item.topics || [])) cbseSyllabus[key].push(t);
            if (item.chapter) cbseSyllabus[key].push(item.chapter);
        }
    }
}

// Also read CBSE nodes for C6-8 chapters
const cbseNodesDir = 'D:/platform/cbse_data/nodes/by_subject';
const cbseNodeFiles = {
    'Physics': 'physics.json', 'Chemistry': 'chemistry.json', 'Biology': 'biology.json',
    'Mathematics': 'maths.json', 'Geography': 'geography.json',
    'History Civics': 'hist.json', 'History': 'hist.json',
};
const cbseNodes = {};
for (const [subj, file] of Object.entries(cbseNodeFiles)) {
    const fpath = cbseNodesDir + '/' + file;
    if (!fs.existsSync(fpath)) continue;
    const nodes = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    for (const n of nodes) {
        const cls = n.class_level;
        if (cls < 6 || cls > 8) continue;
        const key = subj + '_' + cls;
        if (!cbseNodes[key]) cbseNodes[key] = [];
        if (n.chapter_name) cbseNodes[key].push(n.chapter_name);
    }
}
// Also science for C6-8
const sciPath = cbseNodesDir + '/science.json';
if (fs.existsSync(sciPath)) {
    const nodes = JSON.parse(fs.readFileSync(sciPath, 'utf8'));
    for (const n of nodes) {
        const cls = n.class_level;
        if (cls < 6 || cls > 8) continue;
        for (const subj of ['Physics', 'Chemistry', 'Biology', 'Environmental Science']) {
            const key = subj + '_' + cls;
            if (!cbseNodes[key]) cbseNodes[key] = [];
            if (n.chapter_name) cbseNodes[key].push(n.chapter_name);
        }
    }
}

const cbseSubjMap = {
    'Physics': 'Physics', 'Chemistry': 'Chemistry', 'Biology': 'Biology',
    'Mathematics': 'Mathematics', 'Geography': 'Geography',
    'History': 'History Civics', 'Civics': 'History Civics',
    'Science': 'Environmental Science',
    'Economics': 'Economics', 'Accountancy': 'Accountancy',
    'BusinessStudies': 'Business Studies',
};

function normalize(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Key concept words for matching
const conceptWords = {
    'force': ['force', 'push', 'pull', 'newton', 'motion', 'inertia', 'momentum'],
    'energy': ['energy', 'kinetic', 'potential', 'work', 'power', 'joule'],
    'light': ['light', 'reflection', 'refraction', 'mirror', 'lens', 'optics', 'shadow'],
    'sound': ['sound', 'wave', 'vibration', 'frequency', 'amplitude', 'pitch', 'echo'],
    'electricity': ['electric', 'current', 'voltage', 'circuit', 'charge', 'ohm', 'resistance'],
    'magnetism': ['magnet', 'magnetic', 'pole', 'compass'],
    'heat': ['heat', 'temperature', 'thermal', 'calorimetry', 'latent', 'expansion'],
    'matter': ['matter', 'solid', 'liquid', 'gas', 'state', 'particle', 'atom', 'molecule'],
    'measurement': ['measurement', 'unit', 'si', 'length', 'mass', 'time', 'vernier', 'screw gauge'],
    'motion': ['motion', 'speed', 'velocity', 'acceleration', 'displacement', 'distance'],
    'gravity': ['gravity', 'gravitation', 'weight', 'free fall', 'kepler'],
    'atom': ['atom', 'atomic', 'nucleus', 'electron', 'proton', 'neutron', 'isotope'],
    'chemical reaction': ['reaction', 'reactant', 'product', 'equation', 'balance', 'decomposition', 'displacement'],
    'acid base': ['acid', 'base', 'salt', 'ph', 'neutralization', 'indicator'],
    'cell': ['cell', 'tissue', 'organ', 'organelle', 'nucleus', 'membrane', 'mitochondria'],
    'plant': ['plant', 'photosynthesis', 'leaf', 'flower', 'root', 'stem', 'transpiration'],
    'human body': ['human', 'body', 'digestive', 'respiratory', 'circulatory', 'nervous', 'excretory'],
    'reproduction': ['reproduction', 'reproductive', 'sexual', 'asexual', 'fertilization'],
    'health': ['health', 'hygiene', 'disease', 'infection', 'vaccine', 'immunity'],
    'ecosystem': ['ecosystem', 'environment', 'ecology', 'food chain', 'biodiversity', 'conservation'],
    'number': ['number', 'integer', 'rational', 'irrational', 'fraction', 'decimal', 'natural', 'whole'],
    'algebra': ['algebra', 'equation', 'expression', 'variable', 'polynomial', 'factor', 'identity'],
    'geometry': ['geometry', 'angle', 'triangle', 'circle', 'line', 'polygon', 'quadrilateral', 'construction'],
    'mensuration': ['mensuration', 'area', 'perimeter', 'volume', 'surface', 'capacity'],
    'ratio': ['ratio', 'proportion', 'percentage', 'profit', 'loss', 'discount', 'interest'],
    'data': ['data', 'statistics', 'graph', 'chart', 'mean', 'median', 'mode', 'probability'],
    'geography': ['earth', 'map', 'latitude', 'longitude', 'climate', 'weather', 'landform', 'mountain', 'river', 'ocean', 'continent', 'population'],
    'history': ['history', 'civilisation', 'empire', 'king', 'dynasty', 'war', 'independence', 'movement', 'revolution', 'colonial', 'freedom'],
    'constitution': ['constitution', 'fundamental', 'rights', 'duties', 'parliament', 'legislature', 'executive', 'judiciary', 'amendment'],
    'economics': ['economics', 'demand', 'supply', 'market', 'gdp', 'inflation', 'fiscal', 'monetary', 'trade'],
    'business': ['business', 'management', 'marketing', 'finance', 'company', 'partnership', 'commerce'],
    'accounting': ['account', 'journal', 'ledger', 'balance sheet', 'debit', 'credit', 'trial balance'],
    'computer': ['computer', 'programming', 'java', 'python', 'algorithm', 'data structure', 'boolean', 'logic', 'oop', 'object', 'class'],
    'political': ['political', 'state', 'sovereignty', 'law', 'liberty', 'equality', 'justice', 'democracy', 'government'],
    'sociology': ['sociology', 'society', 'social', 'culture', 'caste', 'tribe', 'kinship', 'marriage', 'family', 'religion'],
    'psychology': ['psychology', 'behavior', 'emotion', 'motivation', 'memory', 'perception', 'intelligence', 'personality', 'stress'],
    'biotech': ['biotechnology', 'fermentation', 'genetic', 'rdna', 'enzyme', 'ipr', 'patent'],
    'ai': ['artificial intelligence', 'machine learning', 'neural', 'nlp', 'data', 'python', 'algorithm', 'ethics'],
    'robotics': ['robot', 'frame', 'coordinate', 'transformation', 'matrix', 'vector', 'cad'],
    'applied maths': ['set', 'function', 'relation', 'cartesian', 'domain', 'range', 'matrix', 'calculus'],
};

function findClosestMatch(cisceTopic, cbseTopics) {
    const cn = normalize(cisceTopic);
    let bestMatch = null;
    let bestScore = 0;
    let matchType = 'none';

    for (const cbseT of cbseTopics) {
        const bn = normalize(cbseT);
        let score = 0;
        let type = 'none';

        if (cn === bn) { score = 100; type = 'exact'; }
        else if (cn.includes(bn) || bn.includes(cn)) {
            score = 80; type = 'contains';
        }
        else {
            const w1 = cn.split(' ').filter(w => w.length > 3);
            const w2 = bn.split(' ').filter(w => w.length > 3);
            const overlap = w1.filter(w => w2.includes(w));
            if (overlap.length >= 2) {
                score = (overlap.length / Math.max(w1.length, w2.length)) * 60;
                type = 'word-overlap';
            }
        }

        // Concept-level matching
        if (score < 30) {
            for (const [concept, words] of Object.entries(conceptWords)) {
                const cisceHasConcept = words.some(w => cn.includes(w));
                const cbseHasConcept = words.some(w => bn.includes(w));
                if (cisceHasConcept && cbseHasConcept) {
                    const conceptScore = 25;
                    if (conceptScore > score) {
                        score = conceptScore;
                        type = 'concept:' + concept;
                    }
                }
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestMatch = cbseT;
            matchType = type;
        }
    }

    return { match: bestMatch, score: bestScore, type: matchType };
}

// Classify each missing topic
const classified = {};
let commonCount = 0;
let alienCount = 0;

for (const [subject, classes] of Object.entries(report)) {
    classified[subject] = {};
    for (const [cls, topics] of Object.entries(classes)) {
        classified[subject][cls] = { common: [], alien: [] };

        // Get CBSE topics for this subject+class
        const cbseSubj = cbseSubjMap[subject] || subject;
        const cbseKey1 = cbseSubj + '_' + cls;
        const cbseKey2 = subject.replace(/\s/g, '') + '_' + cls;
        const cbseTopics = [
            ...(cbseSyllabus[cbseKey1] || []),
            ...(cbseSyllabus[cbseKey2] || []),
            ...(cbseSyllabus[subject.replace(/\s/g, '') + '_' + cls] || []),
            ...(cbseNodes[subject + '_' + cls] || []),
            ...(cbseNodes[cbseSubj + '_' + cls] || []),
        ];

        for (const t of topics) {
            const result = findClosestMatch(t, cbseTopics);
            if (result.score >= 25 && result.match) {
                classified[subject][cls].common.push({
                    cisce: t,
                    cbse: result.match,
                    score: result.score,
                    type: result.type
                });
                commonCount++;
            } else {
                classified[subject][cls].alien.push(t);
                alienCount++;
            }
        }
    }
}

// Generate report
let md = '# CISCE vs CBSE: Common vs Alien Topics\n\n';
md += '**Excluding English and Hindi**\n\n';
md += '## Classification Summary\n\n';
md += '| Type | Count | Description |\n';
md += '|------|-------|-------------|\n';
md += `| Common (different name) | ${commonCount} | CISCE and CBSE both teach this, but under different names |\n`;
md += `| Alien (genuinely missing) | ${alienCount} | CISCE teaches this, CBSE does not cover it at all |\n`;
md += `| **Total** | **${commonCount + alienCount}** | |\n\n`;

md += '## Per-Subject Breakdown\n\n';
md += '| Subject | Common | Alien | Total |\n';
md += '|---------|--------|-------|-------|\n';
for (const subject of Object.keys(classified).sort()) {
    let subjCommon = 0, subjAlien = 0;
    for (const cls of Object.keys(classified[subject])) {
        subjCommon += classified[subject][cls].common.length;
        subjAlien += classified[subject][cls].alien.length;
    }
    md += `| ${subject} | ${subjCommon} | ${subjAlien} | ${subjCommon + subjAlien} |\n`;
}
md += `| **TOTAL** | **${commonCount}** | **${alienCount}** | **${commonCount + alienCount}** |\n\n`;

md += '## Detailed Classification\n\n';
for (const subject of Object.keys(classified).sort()) {
    let subjCommon = 0, subjAlien = 0;
    for (const cls of Object.keys(classified[subject])) {
        subjCommon += classified[subject][cls].common.length;
        subjAlien += classified[subject][cls].alien.length;
    }
    if (subjCommon + subjAlien === 0) continue;

    md += `### ${subject} (${subjCommon} common, ${subjAlien} alien)\n\n`;

    for (const cls of Object.keys(classified[subject]).sort((a,b) => a-b)) {
        const data = classified[subject][cls];
        if (data.common.length === 0 && data.alien.length === 0) continue;

        md += `#### Class ${cls}\n\n`;

        if (data.alien.length > 0) {
            md += `**ALIEN (genuinely missing from CBSE) — ${data.alien.length}:**\n\n`;
            for (const t of data.alien) {
                md += `- ${t}\n`;
            }
            md += '\n';
        }

        if (data.common.length > 0) {
            md += `**COMMON (same concept, different name) — ${data.common.length}:**\n\n`;
            md += '| CISCE Topic | Closest CBSE Match | Match Type |\n';
            md += '|-------------|-------------------|------------|\n';
            for (const c of data.common) {
                md += `| ${c.cisce} | ${c.cbse} | ${c.type} (${c.score}) |\n`;
            }
            md += '\n';
        }
    }
}

fs.writeFileSync('D:/platform/CISCE_vs_CBSE_common_vs_alien.md', md);
fs.writeFileSync('D:/platform/CISCE_vs_CBSE_common_vs_alien.json', JSON.stringify(classified, null, 2));

console.log('=== CLASSIFICATION SUMMARY ===');
console.log('Common (different name): ' + commonCount);
console.log('Alien (genuinely missing): ' + alienCount);
console.log('Total: ' + (commonCount + alienCount));
console.log('');
console.log('=== PER SUBJECT ===');
console.log('Subject                           Common    Alien    Total');
console.log('-----------------------------------------------------------');
for (const subject of Object.keys(classified).sort()) {
    let sc = 0, sa = 0;
    for (const cls of Object.keys(classified[subject])) {
        sc += classified[subject][cls].common.length;
        sa += classified[subject][cls].alien.length;
    }
    console.log(subject.padEnd(35) + String(sc).padEnd(9) + String(sa).padEnd(9) + (sc+sa));
}
console.log('-----------------------------------------------------------');
console.log('TOTAL'.padEnd(35) + String(commonCount).padEnd(9) + String(alienCount).padEnd(9) + (commonCount+alienCount));
console.log('');
console.log('Reports saved:');
console.log('  D:/platform/CISCE_vs_CBSE_common_vs_alien.md');
console.log('  D:/platform/CISCE_vs_CBSE_common_vs_alien.json');
