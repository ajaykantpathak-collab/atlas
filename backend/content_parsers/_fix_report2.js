const fs = require('fs');

// Re-read the original report and fix the subject/class splitting
const report = JSON.parse(fs.readFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.json', 'utf8'));

const fixedReport = {};

for (const [key, classes] of Object.entries(report)) {
    // Check if the "classes" object has non-numeric keys - that means the subject was split wrong
    const classKeys = Object.keys(classes);
    const hasNonNumeric = classKeys.some(k => !k.match(/^\d+$/));
    
    if (hasNonNumeric) {
        // The subject was split wrong. Reconstruct.
        // e.g. key="Business", classes={"Studies": [...]} -> subject="Business Studies", and we need to find the actual class
        // The actual class is embedded in the topic data or we need to re-derive it
        
        // For these cases, the "class" key is actually part of the subject name
        // The real class was lost. We need to look at the original CISCE syllabus data to recover it.
        // For now, merge the key with the non-numeric class key to form the subject
        for (const [cls, topics] of Object.entries(classes)) {
            if (!cls.match(/^\d+$/)) {
                // This is a subject name fragment, not a class
                const fullSubject = key + ' ' + cls;
                if (!fixedReport[fullSubject]) fixedReport[fullSubject] = {};
                // We lost the class info - need to re-derive from original data
                // For now mark as "unknown class"
                // Actually, let's check the original script output to recover
                fixedReport[fullSubject]['unknown'] = topics;
            } else {
                if (!fixedReport[key]) fixedReport[key] = {};
                fixedReport[key][cls] = topics;
            }
        }
    } else {
        fixedReport[key] = classes;
    }
}

// Now re-derive the correct classes by re-reading the CISCE syllabus files
const cisceSyllabusDir = 'D:/educational_platform/syllabus_data/CISCE';
const cisceFiles = fs.readdirSync(cisceSyllabusDir).filter(f => f.endsWith('.json') && !f.match(/English|Hindi|Second_Language|Modern_English|Elective_English/i));

// Build mapping: filename -> (subject, class)
const fileToSubjectClass = {};
for (const f of cisceFiles) {
    const data = JSON.parse(fs.readFileSync(cisceSyllabusDir + '/' + f, 'utf8'));
    if (Array.isArray(data)) {
        for (const item of data) {
            let cls = item.grade;
            if (!cls) { const m = f.match(/^(\d+)/); if (m) cls = parseInt(m[1]); }
            if (!cls) continue;
            
            // Determine subject from filename
            let subj = f.replace('.json', '').replace(/^\d+\.?_/, '').replace(/_/g, ' ');
            // Special cases
            if (f.includes('Physics')) subj = 'Physics';
            if (f.includes('Chemistry')) subj = 'Chemistry';
            if (f.includes('Biology')) subj = 'Biology';
            if (f.includes('Mathematics') && !f.includes('Applied')) subj = 'Mathematics';
            if (f.includes('Geography')) subj = 'Geography';
            if (f.includes('History_Civics') || f.includes('History-Civics')) subj = 'History Civics';
            if (f.includes('History') && !f.includes('Civics')) subj = 'History';
            if (f.includes('Computer_Science')) subj = 'Computer Science';
            if (f.includes('Computer_Applications')) subj = 'Computer Science';
            if (f.includes('Economics') && !f.includes('Economic_Applications')) subj = 'Economics';
            if (f.includes('Economic_Applications')) subj = 'Economics';
            if (f.includes('Accountancy')) subj = 'Accountancy';
            if (f.includes('Business_Studies')) subj = 'Business Studies';
            if (f.includes('Commercial_Studies')) subj = 'Business Studies';
            if (f.includes('Commercial_Applications')) subj = 'Business Studies';
            if (f.includes('Environmental_Science')) subj = 'Environmental Science';
            if (f.includes('Political_Science')) subj = 'Political Science';
            if (f.includes('Sociology')) subj = 'Sociology';
            if (f.includes('Psychology')) subj = 'Psychology';
            if (f.includes('Biotechnology')) subj = 'Biotechnology';
            if (f.includes('Artificial_Intelligence')) subj = 'Artificial Intelligence';
            if (f.includes('Robotics')) subj = 'Robotics';
            if (f.includes('Applied_Mathematics')) subj = 'Applied Mathematics';
            
            if (!fileToSubjectClass[f]) fileToSubjectClass[f] = [];
            fileToSubjectClass[f].push({subject: subj, class: cls});
        }
    }
}

// Now rebuild the report properly by re-running the comparison
// Read CBSE syllabus
const cbseSyllabusDir = 'D:/educational_platform/syllabus_data/CBSE';
const cbseSyllabus = {};
const cbseFiles = fs.readdirSync(cbseSyllabusDir).filter(f => f.endsWith('.json') && !f.match(/English|Hindi/i));
for (const f of cbseFiles) {
    const data = JSON.parse(fs.readFileSync(cbseSyllabusDir + '/' + f, 'utf8'));
    if (Array.isArray(data)) {
        for (const item of data) {
            const subj = f.replace('.json', '');
            const key = subj + '_' + item.grade;
            if (!cbseSyllabus[key]) cbseSyllabus[key] = new Set();
            for (const t of (item.topics || [])) cbseSyllabus[key].add(t);
            if (item.chapter) cbseSyllabus[key].add(item.chapter);
        }
    }
}

// CBSE subject name mapping
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

function isMatched(cisceTopic, cbseTopics) {
    const cn = normalize(cisceTopic);
    for (const cbseT of cbseTopics) {
        const bn = normalize(cbseT);
        if (cn === bn) return true;
        if (cn.length > 5 && bn.length > 5) {
            if (cn.includes(bn) || bn.includes(cn)) return true;
            const w1 = cn.split(' ').filter(w => w.length > 3);
            const w2 = bn.split(' ').filter(w => w.length > 3);
            const overlap = w1.filter(w => w2.includes(w));
            if (overlap.length >= 2 && overlap.length >= Math.min(w1.length, w2.length) * 0.5) return true;
        }
    }
    return false;
}

// Rebuild report
const finalReport = {};

// C6-8 from upper primary (already correct in the report)
for (const subject of ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Geography', 'History_Civics']) {
    if (report[subject]) {
        for (const cls of Object.keys(report[subject])) {
            if (cls.match(/^\d+$/)) {
                const subjKey = subject.replace(/_/g, ' ');
                if (!finalReport[subjKey]) finalReport[subjKey] = {};
                finalReport[subjKey][cls] = report[subject][cls];
            }
        }
    }
}

// C9-12 from syllabus JSON
for (const f of cisceFiles) {
    const data = JSON.parse(fs.readFileSync(cisceSyllabusDir + '/' + f, 'utf8'));
    if (!Array.isArray(data)) continue;
    
    const entries = fileToSubjectClass[f];
    if (!entries) continue;
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const entry = entries[i];
        if (!entry) continue;
        
        const subject = entry.subject;
        const cls = entry.class;
        const cisceTopics = item.topics || [];
        
        // Find CBSE topics for this subject+class
        const cbseSubj = cbseSubjMap[subject] || subject;
        const cbseKey1 = cbseSubj + '_' + cls;
        // Also try with original CBSE subject names
        const cbseKey2 = subject.replace(/\s/g, '') + '_' + cls;
        const cbseTopics = cbseSyllabus[cbseKey1] || cbseSyllabus[cbseKey2] || new Set();
        
        const missing = [];
        for (const t of cisceTopics) {
            if (!isMatched(t, [...cbseTopics])) {
                missing.push(t);
            }
        }
        
        if (missing.length > 0) {
            if (!finalReport[subject]) finalReport[subject] = {};
            finalReport[subject][String(cls)] = missing;
        }
    }
}

// Save final report
fs.writeFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.json', JSON.stringify(finalReport, null, 2));

// Generate clean markdown
let md = '# CISCE vs CBSE: Missing Topics Report (C6-12)\n\n';
md += '**Excluding English and Hindi**\n\n';
md += '**Sources:**\n';
md += '- C6-8: CISCE upper primary syllabus PDFs (text cache `D:\\educational_platform\\app\\ORGANIZED\\SYLLABUS\\CISCE\\Class_6_8\\`) + web verification (icseportal.in, shaalaa.com, svischool.com)\n';
md += '- C9-12: Syllabus JSON files from text cache (`D:\\educational_platform\\syllabus_data\\CISCE\\` and `CBSE\\`)\n\n';
md += '**Method:** Topic names extracted from CISCE syllabus, compared against CBSE syllabus topics using normalized string matching with word-overlap fuzzy matching. Topics not found in CBSE are listed as missing.\n\n';

let total = 0;
const subjectTotals = {};
for (const [subject, classes] of Object.entries(finalReport)) {
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
    const classes = Object.keys(finalReport[subj]).sort((a,b) => a-b);
    md += `| ${subj} | ${cnt} | ${classes.map(c => 'C'+c).join(', ')} |\n`;
}
md += `| **TOTAL** | **${total}** | |\n\n`;

md += '## Detailed Missing Topics by Subject\n\n';
for (const [subject, cnt] of sorted) {
    md += `### ${subject} (${cnt} missing topics)\n\n`;
    const classes = finalReport[subject];
    for (const cls of Object.keys(classes).sort((a,b) => a-b)) {
        const topics = classes[cls];
        md += `**Class ${cls}** (${topics.length} missing):\n\n`;
        for (const t of topics) {
            md += `- ${t}\n`;
        }
        md += '\n';
    }
}

fs.writeFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.md', md);

console.log('=== FINAL CLEAN SUMMARY ===');
console.log('Subject                           Total Missing');
console.log('-----------------------------------------------');
for (const [subj, cnt] of sorted) {
    const classes = Object.keys(finalReport[subj]).sort((a,b) => a-b);
    console.log(subj.padEnd(35) + cnt + '  (C' + classes.join(', C') + ')');
}
console.log('-----------------------------------------------');
console.log('TOTAL'.padEnd(35) + total);
console.log('');
console.log('Reports saved:');
console.log('  D:/platform/CISCE_vs_CBSE_missing_topics_v2.md');
console.log('  D:/platform/CISCE_vs_CBSE_missing_topics_v2.json');
