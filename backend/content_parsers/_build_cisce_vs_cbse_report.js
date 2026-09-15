const fs = require('fs');
const path = require('path');

// CISCE C6-8 syllabus from web (icseportal.in, shaalaa.com, svischool.com)
const cisceUpperPrimary = {
    Physics: {
        6: ['Matter', 'Physical Quantities and Measurement', 'Force', 'Energy', 'Light', 'Magnetism'],
        7: ['Physical Quantities and Measurement', 'Force and Pressure: Motion', 'Energy', 'Light Energy', 'Heat', 'Sound', 'Electricity and Magnetism'],
        8: ['Matter', 'Physical Quantities and Measurement', 'Force and Pressure', 'Energy', 'Light Energy', 'Heat Transfer', 'Sound', 'Electricity']
    },
    Chemistry: {
        6: ['Introduction to Chemistry', 'Elements, Compounds and Mixtures', 'Matter', 'Water', 'Air and Atmosphere'],
        7: ['Matter and its Composition', 'Physical and Chemical Changes', 'Elements, Compounds and Mixtures (experimental techniques)', 'Atomic Structure', 'Language of Chemistry', 'Metals and Non-Metals', 'Air and Atmosphere'],
        8: ['Matter', 'Physical and Chemical Changes', 'Elements, Compounds and Mixtures', 'Atomic Structure', 'Language of Chemistry', 'Chemical Reactions', 'Acids, Bases and Salts', 'Carbon and its Compounds']
    },
    Biology: {
        6: ['Plant Life', 'The Cell', 'Human Body', 'Health and Hygiene', 'Adaptation'],
        7: ['Tissue', 'Kingdom Classification', 'Plant Life', 'Human Body', 'Health and Hygiene'],
        8: ['Transport of Food and Minerals in Plants', 'Reproduction in Plants and Animals', 'Ecosystems', 'Human Body - Endocrine, Circulatory and Nervous Systems', 'Health and Hygiene', 'Food Production']
    },
    Mathematics: {
        6: ['Number System', 'Ratio and Proportion', 'Algebra', 'Geometry', 'Mensuration', 'Data Handling'],
        7: ['Number System', 'Ratio and Proportion', 'Algebra', 'Geometry', 'Mensuration', 'Data Handling'],
        8: ['Number System', 'Ratio and Proportion', 'Algebra', 'Geometry', 'Mensuration', 'Data Handling']
    },
    Geography: {
        6: ['Representation of Geographical Features', 'Landforms', 'Water Bodies', 'Agriculture', 'Minerals', 'Study of Continents: North America and South America'],
        7: ['Earth and Its Movements', 'Atmosphere and Weather', 'Natural Vegetation and Wildlife', 'Water Resources', 'Human-Environment Interaction'],
        8: ['Representation of Geographical Features', 'Population Dynamics', 'Migration', 'Urbanisation', 'Natural and Man-made Disasters', 'Asia: The Largest Continent', 'India: Geographical Features', 'India: Human Resources']
    },
    History_Civics: {
        6: ['River Valley Civilisations', 'The Vedic Age', 'Mahavira and Buddha', 'The Mauryan Empire', 'The Gupta Empire', 'Local Self-Government'],
        7: ['Medieval History - Sources', 'The Delhi Sultanate', 'The Mughal Empire', 'Towns, Traders and Craftsmen', 'Religious Movements (Bhakti and Sufi)', 'State Government', 'Role of the Governor and Chief Minister'],
        8: ['Modern History - Sources and Interpretations', 'Growth of Nationalism in Europe', 'India and the World', 'Colonial Rule and Its Impact', 'Social and Religious Reform Movements', 'The Constitution', 'The Union Government', 'The Judiciary']
    }
};

// CBSE C6-8 chapters from nodes (we'll read from the nodes files)
const cbseDir = 'D:/platform/cbse_data/nodes/by_subject';

function getCbseChaptersByClass(subjectFile) {
    const fpath = path.join(cbseDir, subjectFile);
    if (!fs.existsSync(fpath)) return {};
    const nodes = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    const byClass = {};
    for (const n of nodes) {
        const cls = n.class_level;
        if (cls < 6 || cls > 8) continue;
        const ch = (n.chapter_name || '').trim();
        if (!ch) continue;
        if (!byClass[cls]) byClass[cls] = new Set();
        byClass[cls].add(ch);
    }
    const result = {};
    for (const cls of Object.keys(byClass)) result[cls] = [...byClass[cls]];
    return result;
}

// CBSE C6-8 subject mapping
const cbseSubjects = {
    Physics: 'physics.json',
    Chemistry: 'chemistry.json',
    Biology: 'biology.json',
    Mathematics: 'maths.json',
    Geography: 'geography.json',
    History_Civics: 'hist.json'  // CBSE has history_civics for C6-8
};

// Also check science.json for C6-8 (CBSE teaches integrated science)
const cbseScience = getCbseChaptersByClass('science.json');

console.log('=== CISCE vs CBSE: Missing Topics for C6-8 ===');
console.log('=== (From text cache upper primary PDFs + web verification) ===');
console.log('=== Excluding English and Hindi ===');
console.log('');

let totalMissing = 0;
const report = {};

for (const [subject, cbseFile] of Object.entries(cbseSubjects)) {
    const cisceTopics = cisceUpperPrimary[subject] || {};
    const cbseChapters = getCbseChaptersByClass(cbseFile);

    // Also check science.json for physics/chemistry/biology topics in C6-8
    let cbseAllChapters = {};
    for (const cls of Object.keys(cbseChapters)) {
        cbseAllChapters[cls] = new Set(cbseChapters[cls]);
    }
    // Add science chapters that might cover this subject
    for (const cls of Object.keys(cbseScience)) {
        if (!cbseAllChapters[cls]) cbseAllChapters[cls] = new Set();
        for (const ch of cbseScience[cls]) {
            cbseAllChapters[cls].add(ch);
        }
    }

    report[subject] = {};
    console.log(`=== ${subject} ===`);

    for (const cls of ['6', '7', '8']) {
        const cisceList = cisceTopics[cls] || [];
        const cbseList = [...(cbseAllChapters[cls] || [])];

        if (cisceList.length === 0) continue;

        const missing = [];
        for (const cisceTopic of cisceList) {
            let found = false;
            for (const cbseCh of cbseList) {
                // Normalize for comparison
                const cn = cisceTopic.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
                const bn = cbseCh.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
                if (cn === bn) { found = true; break; }
                if (cn.length > 5 && bn.length > 5) {
                    if (cn.includes(bn) || bn.includes(cn)) { found = true; break; }
                    const w1 = cn.split(' ').filter(w => w.length > 3);
                    const w2 = bn.split(' ').filter(w => w.length > 3);
                    const overlap = w1.filter(w => w2.includes(w));
                    if (overlap.length >= 2 && overlap.length >= Math.min(w1.length, w2.length) * 0.5) { found = true; break; }
                }
            }
            if (!found) missing.push(cisceTopic);
        }

        if (missing.length > 0) {
            totalMissing += missing.length;
            report[subject][cls] = missing;
            console.log(`  C${cls} (${missing.length} missing):`);
            for (const t of missing) console.log(`    - ${t}`);
        } else {
            console.log(`  C${cls}: All covered`);
        }
    }

    // Show what CBSE has for reference
    for (const cls of ['6', '7', '8']) {
        const cbseList = [...(cbseAllChapters[cls] || [])];
        if (cbseList.length > 0) {
            console.log(`  [CBSE C${cls} chapters: ${cbseList.join(', ')}]`);
        }
    }
    console.log('');
}

// Now add C9-12 from the syllabus JSON files
const cisceSyllabusDir = 'D:/educational_platform/syllabus_data/CISCE';
const cbseSyllabusDir = 'D:/educational_platform/syllabus_data/CBSE';

// Read CBSE syllabus
const cbseSyllabus = {};
const cbseFiles = fs.readdirSync(cbseSyllabusDir).filter(f => f.endsWith('.json') && !f.match(/English|Hindi/i));
for (const f of cbseFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(cbseSyllabusDir, f), 'utf8'));
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

// Read CISCE syllabus
const subjectMap = {
    'Physics': 'Physics', '10._Physics': 'Physics', '12_Isc_2028_Physics': 'Physics', 'Isc_2028_Physics': 'Physics',
    'Chemistry': 'Chemistry', '11._Chemistry': 'Chemistry', '19._Chemistry': 'Chemistry',
    'Biology': 'Biology', '12._Biology': 'Biology', '20._Biology': 'Biology',
    'Mathematics': 'Mathematics', '9._Mathematics': 'Mathematics', '17._Mathematics': 'Mathematics',
    'Geography': 'Geography', '10._Geography': 'Geography', '6._Geography': 'Geography', '12._Geography': 'Geography',
    'History_Civics': 'History_Civics', '5._History_Civics': 'History_Civics', '8._History': 'History_Civics',
    'Computer_Science': 'Computer_Science', '18._Computer_Applications': 'Computer_Science', '25._Computer_Science': 'Computer_Science', '12._Computer_Science': 'Computer_Science',
    'Economics': 'Economics', '13._Economics': 'Economics', '12._Economics_1': 'Economics', '19._Economic_Applications': 'Economics',
    'Accountancy': 'Accountancy', '12._Accountancy': 'Accountancy', '15._Accountancy': 'Accountancy',
    'Business_Studies': 'Business_Studies', '12._Business_Studies': 'Business_Studies', '14._Business_Studies': 'Business_Studies', '14._Commercial_Studies': 'Business_Studies', '20._Commercial_Applications': 'Business_Studies',
    'Environmental_Science': 'Environmental_Science', '17._Environmental_Science': 'Environmental_Science', '31._Environmental_Science': 'Environmental_Science',
    'Political_Science': 'Political_Science', '9._Political_Science': 'Political_Science', '12._Isc_Political_Science': 'Political_Science',
    'Sociology': 'Sociology', '11._Sociology': 'Sociology', '12._Isc_Sociology': 'Sociology',
    'Psychology': 'Psychology', '12._Psychology': 'Psychology',
    'Biotechnology': 'Biotechnology', '32._Biotechnology': 'Biotechnology',
    'Artificial_Intelligence': 'Artificial_Intelligence', '36._Artificial_Intelligence': 'Artificial_Intelligence',
    'Robotics': 'Robotics', '37._Robotics': 'Robotics',
    'Applied_Mathematics': 'Applied_Mathematics', '38._Applied_Mathematics': 'Applied_Mathematics',
};

const cisceFiles = fs.readdirSync(cisceSyllabusDir).filter(f => f.endsWith('.json') && !f.match(/English|Hindi|Second_Language|Modern_English|Elective_English/i));
const cisceSyllabus = {};
for (const f of cisceFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(cisceSyllabusDir, f), 'utf8'));
    if (Array.isArray(data)) {
        for (const item of data) {
            const subj = subjectMap[f.replace('.json', '')] || f.replace('.json', '').replace(/^\d+\.?_/, '').replace(/_/g, ' ');
            let cls = item.grade;
            if (!cls) { const m = f.match(/^(\d+)/); if (m) cls = parseInt(m[1]); }
            if (!cls) continue;
            const key = subj + '_' + cls;
            if (!cisceSyllabus[key]) cisceSyllabus[key] = [];
            for (const t of (item.topics || [])) cisceSyllabus[key].push(t);
        }
    }
}

// CBSE syllabus subject name mapping
const cbseSubjMap = {
    'Physics': 'Physics', 'Chemistry': 'Chemistry', 'Biology': 'Biology',
    'Mathematics': 'Mathematics', 'Geography': 'Geography',
    'History': 'History_Civics', 'Civics': 'History_Civics',
    'Science': 'Environmental_Science',
    'Economics': 'Economics', 'Accountancy': 'Accountancy',
    'BusinessStudies': 'Business_Studies',
};

// Compare C9-12
console.log('=== CISCE vs CBSE: Missing Topics for C9-12 ===');
console.log('=== (From syllabus text cache JSON files) ===');
console.log('');

for (const [cisceKey, cisceTopics] of Object.entries(cisceSyllabus)) {
    const [subject, cls] = cisceKey.split('_');
    const cbseSubj = cbseSubjMap[subject] || subject;
    const cbseKey = cbseSubj + '_' + cls;
    // Also try original CBSE subject name
    const cbseKey2 = subject + '_' + cls;

    const cbseTopics = cbseSyllabus[cbseKey] || cbseSyllabus[cbseKey2] || new Set();

    const missing = [];
    for (const t of cisceTopics) {
        let found = false;
        for (const cbseT of cbseTopics) {
            const cn = t.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
            const bn = cbseT.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
            if (cn === bn) { found = true; break; }
            if (cn.length > 5 && bn.length > 5) {
                if (cn.includes(bn) || bn.includes(cn)) { found = true; break; }
                const w1 = cn.split(' ').filter(w => w.length > 3);
                const w2 = bn.split(' ').filter(w => w.length > 3);
                const overlap = w1.filter(w => w2.includes(w));
                if (overlap.length >= 2 && overlap.length >= Math.min(w1.length, w2.length) * 0.5) { found = true; break; }
            }
        }
        if (!found) missing.push(t);
    }

    if (missing.length > 0) {
        if (!report[subject]) report[subject] = {};
        if (!report[subject][cls]) report[subject][cls] = [];
        report[subject][cls].push(...missing);
        totalMissing += missing.length;
        console.log(`=== ${subject} C${cls} (${missing.length} missing) ===`);
        for (const t of missing.slice(0, 20)) console.log(`  - ${t}`);
        if (missing.length > 20) console.log(`  ... and ${missing.length - 20} more`);
        console.log('');
    }
}

console.log('========================================');
console.log(`TOTAL MISSING TOPICS: ${totalMissing}`);
console.log('========================================');

// Save full report
fs.writeFileSync('D:/platform/CISCE_vs_CBSE_missing_topics_v2.json', JSON.stringify(report, null, 2));
console.log('\nFull report saved to D:/platform/CISCE_vs_CBSE_missing_topics_v2.json');
