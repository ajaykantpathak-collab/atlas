const fs = require('fs');

const report = JSON.parse(fs.readFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.json', 'utf8'));

// Re-read CBSE syllabus
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

// CBSE nodes for C6-8
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

// Stricter matching - only count as "common" if there's real semantic overlap
function findClosestMatch(cisceTopic, cbseTopics) {
    const cn = normalize(cisceTopic);
    let bestMatch = null;
    let bestScore = 0;
    let matchType = 'none';

    for (const cbseT of cbseTopics) {
        const bn = normalize(cbseT);
        let score = 0;
        let type = 'none';

        // Exact match
        if (cn === bn) { score = 100; type = 'exact'; }
        // One contains the other (meaningful containment, not just a short word)
        else if (cn.length > 5 && bn.length > 5) {
            if (cn.includes(bn) && bn.split(' ').length >= 2) { score = 85; type = 'CISCE contains CBSE'; }
            else if (bn.includes(cn) && cn.split(' ').length >= 2) { score = 85; type = 'CBSE contains CISCE'; }
        }

        // Word overlap - require at least 2 meaningful words to match
        if (score < 50) {
            const w1 = cn.split(' ').filter(w => w.length > 3);
            const w2 = bn.split(' ').filter(w => w.length > 3);
            if (w1.length > 0 && w2.length > 0) {
                const overlap = w1.filter(w => w2.includes(w));
                // Require at least 2 word overlap OR 1 word that's a key term
                if (overlap.length >= 2) {
                    score = (overlap.length / Math.max(w1.length, w2.length)) * 70;
                    type = 'word-overlap (' + overlap.join(', ') + ')';
                }
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestMatch = cbseT;
            matchType = type;
        }
    }

    // Threshold: 40+ = common (likely same concept), below = alien
    return { match: bestMatch, score: bestScore, type: matchType };
}

// Classify
const classified = {};
let commonCount = 0;
let alienCount = 0;

for (const [subject, classes] of Object.entries(report)) {
    classified[subject] = {};
    for (const [cls, topics] of Object.entries(classes)) {
        classified[subject][cls] = { common: [], alien: [] };

        const cbseSubj = cbseSubjMap[subject] || subject;
        const cbseTopics = [
            ...(cbseSyllabus[cbseSubj + '_' + cls] || []),
            ...(cbseSyllabus[subject.replace(/\s/g, '') + '_' + cls] || []),
            ...(cbseNodes[subject + '_' + cls] || []),
            ...(cbseNodes[cbseSubj + '_' + cls] || []),
        ];

        for (const t of topics) {
            const result = findClosestMatch(t, cbseTopics);
            if (result.score >= 40 && result.match) {
                classified[subject][cls].common.push({
                    cisce: t,
                    cbse: result.match,
                    score: Math.round(result.score),
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
let md = '# CISCE vs CBSE: Common vs Alien Topics (Strict Matching)\n\n';
md += '**Excluding English and Hindi**\n\n';
md += '**Classification:**\n';
md += '- **Common** = CISCE and CBSE both teach this concept, just under different names (word overlap >= 2 meaningful words)\n';
md += '- **Alien** = CISCE teaches this topic, CBSE has no corresponding topic at all\n\n';

md += '## Summary\n\n';
md += '| Type | Count |\n';
md += '|------|-------|\n';
md += `| Common (different name) | ${commonCount} |\n`;
md += `| Alien (genuinely missing) | ${alienCount} |\n`;
md += `| **Total** | **${commonCount + alienCount}** |\n\n`;

md += '## Per-Subject Breakdown\n\n';
md += '| Subject | Common | Alien | Total |\n';
md += '|---------|--------|-------|-------|\n';
for (const subject of Object.keys(classified).sort()) {
    let sc = 0, sa = 0;
    for (const cls of Object.keys(classified[subject])) {
        sc += classified[subject][cls].common.length;
        sa += classified[subject][cls].alien.length;
    }
    md += `| ${subject} | ${sc} | ${sa} | ${sc + sa} |\n`;
}
md += `| **TOTAL** | **${commonCount}** | **${alienCount}** | **${commonCount + alienCount}** |\n\n`;

md += '## Detailed Classification\n\n';
for (const subject of Object.keys(classified).sort()) {
    let sc = 0, sa = 0;
    for (const cls of Object.keys(classified[subject])) {
        sc += classified[subject][cls].common.length;
        sa += classified[subject][cls].alien.length;
    }
    if (sc + sa === 0) continue;

    md += `### ${subject} (${sc} common, ${sa} alien)\n\n`;

    for (const cls of Object.keys(classified[subject]).sort((a,b) => a-b)) {
        const data = classified[subject][cls];
        if (data.common.length === 0 && data.alien.length === 0) continue;

        md += `#### Class ${cls}\n\n`;

        if (data.alien.length > 0) {
            md += `**ALIEN (genuinely missing from CBSE) — ${data.alien.length}:**\n\n`;
            for (const t of data.alien) md += `- ${t}\n`;
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

console.log('=== CLASSIFICATION (STRICT MATCHING) ===');
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
    console.log(subject.padEnd(35) + String(sc).padStart(8) + String(sa).padStart(9) + String(sc+sa).padStart(8));
}
console.log('-----------------------------------------------------------');
console.log('TOTAL'.padEnd(35) + String(commonCount).padStart(8) + String(alienCount).padStart(9) + String(commonCount+alienCount).padStart(8));
