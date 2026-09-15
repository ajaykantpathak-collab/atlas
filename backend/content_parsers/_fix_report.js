const fs = require('fs');

const report = JSON.parse(fs.readFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.json', 'utf8'));

// Fix mangled subject names - the keys got merged with class numbers
// "Environmental CScience" -> "Environmental Science" C12
// "Political CScience" -> "Political Science" C12
// "Computer CScience" -> "Computer Science" C11/C12
// "Business CStudies" -> "Business Studies" C11/C12
// "Applied CMathematics" -> "Applied Mathematics" C12
// "Artificial CIntelligence" -> "Artificial Intelligence" C12
// "History CCivics" -> "History_Civics" C10/C12

const fixedReport = {};
const fixes = [
    {from: 'Environmental CScience', to: 'Environmental Science', cls: '12'},
    {from: 'Political CScience', to: 'Political Science', cls: '12'},
    {from: 'Computer CScience', to: 'Computer Science', cls: '11'},
    {from: 'Business CStudies', to: 'Business Studies', cls: '11'},
    {from: 'Applied CMathematics', to: 'Applied Mathematics', cls: '12'},
    {from: 'Artificial CIntelligence', to: 'Artificial Intelligence', cls: '12'},
    {from: 'History CCivics', to: 'History_Civics', cls: '12'},
    {from: 'Economics 1', to: 'Economics', cls: '12'},
];

for (const [key, classes] of Object.entries(report)) {
    let fixed = false;
    for (const fix of fixes) {
        if (key === fix.from) {
            const newKey = fix.to;
            if (!fixedReport[newKey]) fixedReport[newKey] = {};
            for (const [cls, topics] of Object.entries(classes)) {
                fixedReport[newKey][fix.cls] = topics;
            }
            fixed = true;
            break;
        }
    }
    if (!fixed) {
        fixedReport[key] = classes;
    }
}

// Also fix "History" which has "CCivics" as class key
if (fixedReport['History']) {
    const hist = fixedReport['History'];
    if (hist['CCivics']) {
        if (!fixedReport['History_Civics']) fixedReport['History_Civics'] = {};
        // These are actually C10 and C12 history_civics
        // The "CCivics" key is wrong - split by the actual class
        // From the output: History C11: 34, History CCivics: 84 (which is C10: 41 + C12: 43)
        // Actually looking at the raw data, "History CCivics" contains both C10 and C12 topics
        // Let's just move them to History_Civics
        if (!fixedReport['History_Civics']['10']) fixedReport['History_Civics']['10'] = [];
        if (!fixedReport['History_Civics']['12']) fixedReport['History_Civics']['12'] = [];
        // We can't easily split, so just put them all under C10/C12 based on content
        // Actually let's keep History C11 as History, and move CCivics to History_Civics
        fixedReport['History_Civics']['mixed'] = hist['CCivics'];
        delete hist['CCivics'];
    }
}

// Save fixed report
fs.writeFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.json', JSON.stringify(fixedReport, null, 2));

// Generate clean markdown report
let md = '# CISCE vs CBSE: Missing Topics Report (C6-12)\n\n';
md += '**Excluding English and Hindi**\n\n';
md += '**Sources:**\n';
md += '- C6-8: CISCE upper primary syllabus PDFs (text cache) + web verification (icseportal.in, shaalaa.com)\n';
md += '- C9-12: Syllabus JSON files from text cache (`D:\\educational_platform\\syllabus_data\\`)\n\n';
md += '**Method:** Topic names extracted from CISCE syllabus, compared against CBSE syllabus topics using normalized string matching with word-overlap fuzzy matching. Topics not found in CBSE are listed as missing.\n\n';

let total = 0;
const subjectTotals = {};
for (const [subject, classes] of Object.entries(fixedReport)) {
    let subjTotal = 0;
    for (const [cls, topics] of Object.entries(classes)) {
        subjTotal += topics.length;
        total += topics.length;
    }
    subjectTotals[subject] = subjTotal;
}

const sorted = Object.entries(subjectTotals).sort((a,b) => b[1] - a[1]);

md += '## Summary\n\n';
md += '| Subject | Total Missing | Classes |\n';
md += '|---------|--------------|--------|\n';
for (const [subj, cnt] of sorted) {
    const classes = Object.keys(fixedReport[subj]).sort();
    md += `| ${subj.replace(/_/g, ' ')} | ${cnt} | ${classes.map(c => 'C'+c).join(', ')} |\n`;
}
md += `| **TOTAL** | **${total}** | |\n\n`;

md += '## Detailed Missing Topics by Subject\n\n';
for (const [subject, cnt] of sorted) {
    md += `### ${subject.replace(/_/g, ' ')} (${cnt} missing)\n\n`;
    const classes = fixedReport[subject];
    for (const cls of Object.keys(classes).sort()) {
        const topics = classes[cls];
        md += `**Class ${cls}** (${topics.length} missing):\n\n`;
        for (const t of topics) {
            md += `- ${t}\n`;
        }
        md += '\n';
    }
}

fs.writeFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.md', md);
console.log('Saved clean report to D:/platform/CISCE_vs_CBSE_missing_topics_v2.md');
console.log('Saved clean JSON to D:/platform/CISCE_vs_CBSE_missing_topics_v2.json');
console.log('');
console.log('=== FINAL SUMMARY ===');
console.log('Subject                           Total Missing');
console.log('-----------------------------------------------');
for (const [subj, cnt] of sorted) {
    console.log(subj.replace(/_/g,' ').padEnd(35) + cnt);
}
console.log('-----------------------------------------------');
console.log('TOTAL'.padEnd(35) + total);
