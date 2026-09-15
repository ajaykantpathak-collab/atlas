const fs = require('fs');

// Load CISCE nodes
const allNodes = JSON.parse(fs.readFileSync('C:/Users/Alesha4285/AppData/Local/Temp/cisce_all_nodes.json', 'utf8'));

// Load the alien + no-data topics from our classification
const results = JSON.parse(fs.readFileSync('D:/platform/CISCE_vs_CBSE_common_vs_alien.json', 'utf8'));

// Build a searchable index of CISCE node topics
const nodeIndex = {};
for (const n of allNodes) {
    const key = n.subject;
    if (!nodeIndex[key]) nodeIndex[key] = [];
    nodeIndex[key].push(n);
}

// Subject mapping: our report subjects -> node subjects
const subjectToNodeKey = {
    'Physics': 'phy',
    'Chemistry': 'chem',
    'Biology': 'bio',
    'Mathematics': 'math',
};

function normalize(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function findInNodes(topic, nodes) {
    const tn = normalize(topic);
    // Try exact match
    for (const n of nodes) {
        if (normalize(n.topic) === tn) return n;
    }
    // Try contains
    for (const n of nodes) {
        const nn = normalize(n.topic);
        if (nn.includes(tn) || tn.includes(nn)) return n;
    }
    // Try word overlap
    const tw = tn.split(' ').filter(w => w.length > 3);
    for (const n of nodes) {
        const nn = normalize(n.topic);
        const nw = nn.split(' ').filter(w => w.length > 3);
        const overlap = tw.filter(w => nw.includes(w));
        if (overlap.length >= 2) return n;
    }
    // Try single key word
    for (const n of nodes) {
        const nn = normalize(n.topic);
        for (const w of tw) {
            if (w.length > 5 && nn.includes(w)) return n;
        }
    }
    return null;
}

// Check each alien and no-data topic
const report = {
    summary: {},
    details: {}
};

const subjectsToCheck = ['Physics', 'Chemistry', 'Biology', 'Mathematics',
    'Geography', 'History Civics', 'History', 'Economics', 'Accountancy',
    'Business Studies', 'Environmental Science', 'Computer Science',
    'Political Science', 'Sociology', 'Psychology', 'Biotechnology',
    'Artificial Intelligence', 'Robotics', 'Applied Mathematics'];

let totalAlien = 0, alienCovered = 0, alienNotCovered = 0;
let totalNoData = 0, noDataCovered = 0, noDataNotCovered = 0;

for (const subject of subjectsToCheck) {
    const r = results[subject];
    if (!r) continue;

    const nodeKey = subjectToNodeKey[subject];
    const nodes = nodeKey ? (nodeIndex[nodeKey] || []) : [];

    report.details[subject] = {
        alien_covered: [],
        alien_not_covered: [],
        nodata_covered: [],
        nodata_not_covered: [],
        has_nodes: nodes.length > 0,
        node_count: nodes.length
    };

    // Check alien topics
    for (const t of r.alien) {
        totalAlien++;
        if (nodes.length > 0) {
            const match = findInNodes(t.topic, nodes);
            if (match) {
                alienCovered++;
                report.details[subject].alien_covered.push({
                    topic: t.topic,
                    cisceClass: t.cisceClass,
                    matchedNode: match.node_id + ': ' + match.topic
                });
            } else {
                alienNotCovered++;
                report.details[subject].alien_not_covered.push({
                    topic: t.topic,
                    cisceClass: t.cisceClass
                });
            }
        } else {
            alienNotCovered++;
            report.details[subject].alien_not_covered.push({
                topic: t.topic,
                cisceClass: t.cisceClass
            });
        }
    }

    // Check no-data topics
    for (const t of r.noData) {
        totalNoData++;
        if (nodes.length > 0) {
            const match = findInNodes(t.topic, nodes);
            if (match) {
                noDataCovered++;
                report.details[subject].nodata_covered.push({
                    topic: t.topic,
                    cisceClass: t.cls,
                    matchedNode: match.node_id + ': ' + match.topic
                });
            } else {
                noDataNotCovered++;
                report.details[subject].nodata_not_covered.push({
                    topic: t.topic,
                    cisceClass: t.cls
                });
            }
        } else {
            noDataNotCovered++;
            report.details[subject].nodata_not_covered.push({
                topic: t.topic,
                cisceClass: t.cls
            });
        }
    }
}

report.summary = {
    alien: { total: totalAlien, covered: alienCovered, notCovered: alienNotCovered },
    noData: { total: totalNoData, covered: noDataCovered, notCovered: noDataNotCovered },
    grandTotal: totalAlien + totalNoData,
    grandCovered: alienCovered + noDataCovered,
    grandNotCovered: alienNotCovered + noDataNotCovered
};

// Generate markdown report
let md = '# CISCE Nodes Coverage Check\n\n';
md += 'Checking if the "alien" and "no CBSE data" topics are covered in CISCE atomic graph nodes\n';
md += '(D:\\node_generator\\atomic_graph\\cisce_stem\\)\n\n';
md += '## Summary\n\n';
md += '| Category | Total | Covered in CISCE nodes | NOT covered |\n';
md += '|----------|-------|----------------------|-------------|\n';
md += `| Alien (not in CBSE) | ${totalAlien} | ${alienCovered} | ${alienNotCovered} |\n`;
md += `| No CBSE data (CBSE has no subject) | ${totalNoData} | ${noDataCovered} | ${noDataNotCovered} |\n`;
md += `| **TOTAL** | **${totalAlien + totalNoData}** | **${alienCovered + noDataCovered}** | **${alienNotCovered + noDataNotCovered}** |\n\n`;

md += '## CISCE Node Inventory\n\n';
md += 'Only 4 STEM subjects have nodes in the atomic graph:\n\n';
md += '| Subject | Node Key | Nodes | Classes |\n';
md += '|---------|----------|-------|---------|\n';
for (const [subj, key] of Object.entries(subjectToNodeKey)) {
    const nodes = nodeIndex[key] || [];
    const classes = [...new Set(nodes.map(n => n.class))].sort((a,b) => a-b);
    md += `| ${subj} | ${key} | ${nodes.length} | C${classes.join(', C')} |\n`;
}
md += '\n**Subjects with NO CISCE nodes at all:**\n';
const noNodeSubjects = subjectsToCheck.filter(s => !subjectToNodeKey[s]);
for (const s of noNodeSubjects) {
    md += `- ${s}\n`;
}
md += '\n';

md += '## Per-Subject Coverage\n\n';
md += '| Subject | Has Nodes | Alien Covered | Alien Not Covered | NoData Covered | NoData Not Covered |\n';
md += '|---------|-----------|---------------|-------------------|----------------|-------------------|\n';
for (const subject of subjectsToCheck) {
    const d = report.details[subject];
    if (!d) continue;
    md += `| ${subject} | ${d.has_nodes ? 'Yes (' + d.node_count + ')' : 'No'} | ${d.alien_covered.length} | ${d.alien_not_covered.length} | ${d.nodata_covered.length} | ${d.nodata_not_covered.length} |\n`;
}
md += '\n';

md += '## Detailed: Topics NOT Covered in CISCE Nodes\n\n';
for (const subject of subjectsToCheck) {
    const d = report.details[subject];
    if (!d) continue;
    const notCovered = [...d.alien_not_covered, ...d.nodata_not_covered];
    if (notCovered.length === 0) continue;

    md += `### ${subject} (${notCovered.length} topics not in CISCE nodes)\n\n`;
    if (!d.has_nodes) {
        md += '**No CISCE nodes exist for this subject at all.**\n\n';
    }
    for (const t of notCovered) {
        md += `- [C${t.cisceClass}] ${t.topic}\n`;
    }
    md += '\n';
}

md += '## Detailed: Topics COVERED in CISCE Nodes\n\n';
for (const subject of subjectsToCheck) {
    const d = report.details[subject];
    if (!d) continue;
    const covered = [...d.alien_covered, ...d.nodata_covered];
    if (covered.length === 0) continue;

    md += `### ${subject} (${covered.length} topics found in CISCE nodes)\n\n`;
    md += '| CISCE Syllabus Topic | Class | Matched CISCE Node |\n';
    md += '|----------------------|-------|-------------------|\n';
    for (const c of covered) {
        md += `| ${c.topic} | C${c.cisceClass} | ${c.matchedNode} |\n`;
    }
    md += '\n';
}

fs.writeFileSync('D:/platform/CISCE_nodes_coverage_check.md', md);
fs.writeFileSync('D:/platform/CISCE_nodes_coverage_check.json', JSON.stringify(report, null, 2));

console.log('=== CISCE NODES COVERAGE CHECK ===');
console.log('CISCE atomic graph nodes: 2,048 (Physics, Chemistry, Biology, Maths only)');
console.log('');
console.log('ALIEN topics (not in CBSE):');
console.log('  Total:       ' + totalAlien);
console.log('  Covered:     ' + alienCovered + ' (exist in CISCE nodes)');
console.log('  Not covered: ' + alienNotCovered + ' (NOT in CISCE nodes)');
console.log('');
console.log('NO CBSE DATA topics (CBSE has no subject):');
console.log('  Total:       ' + totalNoData);
console.log('  Covered:     ' + noDataCovered + ' (exist in CISCE nodes)');
console.log('  Not covered: ' + noDataNotCovered + ' (NOT in CISCE nodes)');
console.log('');
console.log('GRAND TOTAL:');
console.log('  Total:       ' + (totalAlien + totalNoData));
console.log('  Covered:     ' + (alienCovered + noDataCovered));
console.log('  Not covered: ' + (alienNotCovered + noDataNotCovered));
console.log('');
console.log('Per subject:');
console.log('Subject                           HasNodes  AlienCov  AlienNot  NoDataCov NoDataNot');
console.log('---------------------------------------------------------------------------------------');
for (const subject of subjectsToCheck) {
    const d = report.details[subject];
    if (!d) continue;
    console.log(subject.padEnd(35) +
        (d.has_nodes ? 'Yes' : 'No').padStart(9) +
        String(d.alien_covered.length).padStart(10) +
        String(d.alien_not_covered.length).padStart(10) +
        String(d.nodata_covered.length).padStart(11) +
        String(d.nodata_not_covered.length).padStart(10));
}
console.log('');
console.log('Reports saved:');
console.log('  D:/platform/CISCE_nodes_coverage_check.md');
console.log('  D:/platform/CISCE_nodes_coverage_check.json');
