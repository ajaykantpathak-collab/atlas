const fs = require('fs');

// Load CISCE nodes
const allNodes = JSON.parse(fs.readFileSync('C:/Users/Alesha4285/AppData/Local/Temp/cisce_all_nodes.json', 'utf8'));

// Load CBSE syllabus
const cbseDir = 'D:/educational_platform/syllabus_data/CBSE';
const cbseAllTopics = [];
const cbseFiles = fs.readdirSync(cbseDir).filter(f => f.endsWith('.json') && !f.match(/English|Hindi/i));
for (const f of cbseFiles) {
    const data = JSON.parse(fs.readFileSync(cbseDir + '/' + f, 'utf8'));
    if (!Array.isArray(data)) continue;
    const subj = f.replace('.json', '');
    for (const item of data) {
        for (const t of (item.topics || [])) {
            cbseAllTopics.push({ topic: t, subject: subj, class: item.grade, chapter: item.chapter });
        }
        if (item.chapter) {
            cbseAllTopics.push({ topic: item.chapter, subject: subj, class: item.grade, chapter: item.chapter });
        }
    }
}

// Also load CBSE nodes for C6-8
const cbseNodesDir = 'D:/platform/cbse_data/nodes/by_subject';
const cbseNodeFiles = fs.readdirSync(cbseNodesDir).filter(f => f.endsWith('.json'));
const cbseNodes = [];
for (const f of cbseNodeFiles) {
    const nodes = JSON.parse(fs.readFileSync(cbseNodesDir + '/' + f, 'utf8'));
    for (const n of nodes) {
        if (n.chapter_name) cbseNodes.push({ topic: n.chapter_name, subject: f.replace('.json',''), class: n.class_level });
    }
}

// The 11 missing topics
const missingTopics = [
    { subject: 'Physics', topic: 'Reversible and irreversible processes', cisceClass: 11 },
    { subject: 'Physics', topic: 'Fundamental and Derived SI Units', cisceClass: 12 },
    { subject: 'Chemistry', topic: 'Precision and accuracy in measurements', cisceClass: 12 },
    { subject: 'Chemistry', topic: 'SI units', cisceClass: 12 },
    { subject: 'Chemistry', topic: 'Hybridization', cisceClass: 12 },
    { subject: 'Chemistry', topic: 'Bond enthalpies', cisceClass: 12 },
    { subject: 'Chemistry', topic: 'Elevation of boiling point', cisceClass: 12 },
    { subject: 'Chemistry', topic: 'Osmotic pressure', cisceClass: 12 },
    { subject: 'Chemistry', topic: 'Metallurgy', cisceClass: 12 },
    { subject: 'Biology', topic: 'C3 and C4 pathways', cisceClass: 12 },
    { subject: 'Biology', topic: 'Speciation and adaptive radiation', cisceClass: 12 },
];

// Keyword groups for each topic - what to search for
const searchKeywords = {
    'Reversible and irreversible processes': ['reversible', 'irreversible', 'process', 'thermodynamic'],
    'Fundamental and Derived SI Units': ['fundamental', 'derived', 'si unit', 'base unit', 'measurement', 'unit'],
    'Precision and accuracy in measurements': ['precision', 'accuracy', 'measurement', 'error', 'significant'],
    'SI units': ['si unit', 'unit', 'measurement', 'international system'],
    'Hybridization': ['hybrid', 'sp3', 'sp2', 'sp ', 'hybridisation', 'hybridization', 'orbital mix', 'mixing orbital'],
    'Bond enthalpies': ['bond enthalpy', 'bond energy', 'enthalpy', 'bond dissociation', 'heat of bond'],
    'Elevation of boiling point': ['boiling point', 'elevation', 'boiling point elevation', 'colligative', 'solute'],
    'Osmotic pressure': ['osmotic', 'osmosis', 'semipermeable', 'colligative'],
    'Metallurgy': ['metallurg', 'extraction', 'metal', 'ore', 'smelting', 'refining', 'concentration', 'reduction'],
    'C3 and C4 pathways': ['c3', 'c4', 'kranz', 'photorespiration', 'calvin', 'dark reaction', 'carbon fixation', 'hatch slack'],
    'Speciation and adaptive radiation': ['speciation', 'adaptive radiation', 'species formation', 'galapagos', 'darwin', 'evolution', 'natural selection', 'adaptive'],
};

function normalize(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function deepSearch(topic, source, keywords) {
    const tn = normalize(topic);
    const results = [];

    for (const item of source) {
        const sn = normalize(item.topic || item.chapter_name || '');
        let matchType = '';
        let score = 0;

        // Exact
        if (tn === sn) { score = 100; matchType = 'EXACT'; }
        // Contains
        else if (sn.includes(tn) && tn.length > 5) { score = 90; matchType = 'CONTAINS'; }
        else if (tn.includes(sn) && sn.length > 5) { score = 85; matchType = 'CONTAINED IN'; }
        // Keyword search
        else {
            for (const kw of keywords) {
                if (sn.includes(kw)) {
                    score = Math.max(score, 60 + kw.length);
                    matchType = 'KEYWORD: ' + kw;
                }
            }
        }

        if (score > 0) {
            results.push({
                topic: item.topic || item.chapter_name,
                subject: item.subject,
                class: item.class,
                chapter: item.chapter,
                score: score,
                matchType: matchType
            });
        }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 5); // Top 5
}

// Search each topic in both CBSE and CISCE nodes
let md = '# Deep Search: 11 Missing STEM Topics\n\n';
md += 'Searching in CBSE syllabus + CBSE nodes AND CISCE atomic graph nodes\n\n';

console.log('=== DEEP SEARCH FOR 11 MISSING STEM TOPICS ===');
console.log('');

for (const mt of missingTopics) {
    const keywords = searchKeywords[mt.topic] || [];
    const cbseResults = deepSearch(mt.topic, [...cbseAllTopics, ...cbseNodes], keywords);

    // CISCE nodes - filter by subject
    const nodeKey = { Physics: 'phy', Chemistry: 'chem', Biology: 'bio' }[mt.subject];
    const cisceNodesForSubject = allNodes.filter(n => n.subject === nodeKey);
    const cisceResults = deepSearch(mt.topic, cisceNodesForSubject, keywords);

    console.log('========================================================');
    console.log(mt.subject + ' C' + mt.cisceClass + ': "' + mt.topic + '"');
    console.log('--------------------------------------------------------');
    console.log('CBSE matches:');
    if (cbseResults.length === 0) {
        console.log('  NONE FOUND');
    } else {
        for (const r of cbseResults) {
            console.log('  [' + r.score + '] C' + r.class + ' ' + r.subject + ': ' + r.topic + ' (' + r.matchType + ')');
        }
    }
    console.log('');
    console.log('CISCE node matches:');
    if (cisceResults.length === 0) {
        console.log('  NONE FOUND');
    } else {
        for (const r of cisceResults) {
            console.log('  [' + r.score + '] C' + r.class + ': ' + r.topic + ' (' + r.matchType + ')');
        }
    }
    console.log('');

    // Build markdown
    md += `## ${mt.subject} C${mt.cisceClass}: "${mt.topic}"\n\n`;
    md += `**Keywords searched:** ${keywords.join(', ')}\n\n`;

    md += `### CBSE matches\n`;
    if (cbseResults.length === 0) {
        md += `**NOT FOUND in CBSE** — genuinely alien\n\n`;
    } else {
        md += `| Score | Class | Subject | Topic | Match Type |\n`;
        md += `|-------|-------|---------|-------|------------|\n`;
        for (const r of cbseResults) {
            md += `| ${r.score} | C${r.class} | ${r.subject} | ${r.topic} | ${r.matchType} |\n`;
        }
        md += '\n';
    }

    md += `### CISCE node matches\n`;
    if (cisceResults.length === 0) {
        md += `**NOT FOUND in CISCE nodes** — node missing\n\n`;
    } else {
        md += `| Score | Class | Topic | Match Type |\n`;
        md += `|-------|-------|-------|------------|\n`;
        for (const r of cisceResults) {
            md += `| ${r.score} | C${r.class} | ${r.topic} | ${r.matchType} |\n`;
        }
        md += '\n';
    }

    // Verdict
    const cbseFound = cbseResults.some(r => r.score >= 60);
    const cisceFound = cisceResults.some(r => r.score >= 60);
    md += `**Verdict:** `;
    if (cbseFound && cisceFound) md += `Covered in both CBSE and CISCE nodes (just different naming)\n\n`;
    else if (cbseFound && !cisceFound) md += `In CBSE but CISCE node is missing\n\n`;
    else if (!cbseFound && cisceFound) md += `Genuinely alien from CBSE, but CISCE node exists\n\n`;
    else md += `Genuinely alien from CBSE AND missing from CISCE nodes\n\n`;

    md += '---\n\n';
}

fs.writeFileSync('D:/platform/CISCE_11_missing_stem_deep_search.md', md);
console.log('Report saved: D:/platform/CISCE_11_missing_stem_deep_search.md');
