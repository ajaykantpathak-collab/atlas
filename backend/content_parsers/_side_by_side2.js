const fs = require('fs');

const cbseDir = 'D:/educational_platform/syllabus_data/CBSE';
const cisceDir = 'D:/educational_platform/syllabus_data/CISCE';
const cbseNodesDir = 'D:/platform/cbse_data/nodes/by_subject';

// CISCE C6-8 from web (upper primary)
const cisceUpperPrimary = {
    Physics: { 6: ['Matter','Physical Quantities and Measurement','Force','Energy','Light','Magnetism'],
        7: ['Physical Quantities and Measurement','Force and Pressure: Motion','Energy','Light Energy','Heat','Sound','Electricity and Magnetism'],
        8: ['Matter','Physical Quantities and Measurement','Force and Pressure','Energy','Light Energy','Heat Transfer','Sound','Electricity'] },
    Chemistry: { 6: ['Introduction to Chemistry','Elements, Compounds and Mixtures','Matter','Water','Air and Atmosphere'],
        7: ['Matter and its Composition','Physical and Chemical Changes','Elements, Compounds and Mixtures (experimental techniques)','Atomic Structure','Language of Chemistry','Metals and Non-Metals','Air and Atmosphere'],
        8: ['Matter','Physical and Chemical Changes','Elements, Compounds and Mixtures','Atomic Structure','Language of Chemistry','Chemical Reactions','Acids, Bases and Salts','Carbon and its Compounds'] },
    Biology: { 6: ['Plant Life','The Cell','Human Body','Health and Hygiene','Adaptation'],
        7: ['Tissue','Kingdom Classification','Plant Life','Human Body','Health and Hygiene'],
        8: ['Transport of Food and Minerals in Plants','Reproduction in Plants and Animals','Ecosystems','Human Body - Endocrine, Circulatory and Nervous Systems','Health and Hygiene','Food Production'] },
    Mathematics: { 6: ['Number System','Ratio and Proportion','Algebra','Geometry','Mensuration','Data Handling'],
        7: ['Number System','Ratio and Proportion','Algebra','Geometry','Mensuration','Data Handling'],
        8: ['Number System','Ratio and Proportion','Algebra','Geometry','Mensuration','Data Handling'] },
    Geography: { 6: ['Representation of Geographical Features','Landforms','Water Bodies','Agriculture','Minerals','Study of Continents: North America and South America'],
        7: ['Earth and Its Movements','Atmosphere and Weather','Natural Vegetation and Wildlife','Water Resources','Human-Environment Interaction'],
        8: ['Representation of Geographical Features','Population Dynamics','Migration','Urbanisation','Natural and Man-made Disasters','Asia: The Largest Continent','India: Geographical Features','India: Human Resources'] },
    'History Civics': { 6: ['River Valley Civilisations','The Vedic Age','Mahavira and Buddha','The Mauryan Empire','The Gupta Empire','Local Self-Government'],
        7: ['Medieval History - Sources','The Delhi Sultanate','The Mughal Empire','Towns, Traders and Craftsmen','Religious Movements (Bhakti and Sufi)','State Government','Role of the Governor and Chief Minister'],
        8: ['Modern History - Sources and Interpretations','Growth of Nationalism in Europe','India and the World','Colonial Rule and Its Impact','Social and Religious Reform Movements','The Constitution','The Union Government','The Judiciary'] }
};

// CBSE C6-8 from nodes - science.json covers physics/chem/bio
function getCbseNodesChapters(file, cls) {
    const fpath = cbseNodesDir + '/' + file;
    if (!fs.existsSync(fpath)) return [];
    const nodes = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    const chapters = new Set();
    for (const n of nodes) {
        if (n.class_level == cls && n.chapter_name) chapters.add(n.chapter_name.trim());
    }
    return [...chapters];
}

// For C6-8, CBSE teaches integrated Science. We need to classify chapters as Physics/Chem/Bio
// Based on chapter name keywords
function classifyScienceChapter(chapter) {
    const c = chapter.toLowerCase();
    // Physics keywords
    if (c.match(/motion|force|light|electric|magnet|sound|heat|energy|measurement|shadow|circuit|gravity|work/)) return 'Physics';
    // Chemistry keywords
    if (c.match(/matter|acid|base|salt|metal|chemical|substance|separation|change|element|compound|water|air|carbon|atom|fibre|fabric/)) return 'Chemistry';
    // Biology keywords
    if (c.match(/food|plant|body|living|animal|life|reproduction|cell|tissue|organ|health|disease|environment|ecosystem|nutrition|respiration|evolution|heredity|natural resource|conservation/)) return 'Biology';
    return 'General Science';
}

// CBSE C9-10 Science chapters - classify into Physics/Chem/Bio
function getCbseScienceTopicsBySubject(cls, targetSubject) {
    const fpath = cbseDir + '/Science.json';
    if (!fs.existsSync(fpath)) return [];
    const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    const result = [];
    for (const item of data) {
        if (item.grade != cls) continue;
        const subject = classifyScienceChapter(item.chapter);
        if (subject === targetSubject || (targetSubject === 'Physics' && subject === 'General Science')) {
            // For Physics, also include general science chapters that might be physics
            result.push(...(item.topics || []));
        }
    }
    return result;
}

// CBSE C9-12 from syllabus JSON
function getCbseSyllabusTopics(subject, cls) {
    const fpath = cbseDir + '/' + subject + '.json';
    if (!fs.existsSync(fpath)) return [];
    const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    const result = [];
    for (const item of data) {
        if (item.grade == cls) {
            result.push(...(item.topics || []));
        }
    }
    return result;
}

// CISCE C9-12 from syllabus JSON
const cisceSubjectMap = {
    'Physics': ['10._Physics','12_Isc_2028_Physics','Isc_2028_Physics'],
    'Chemistry': ['11._Chemistry','19._Chemistry'],
    'Biology': ['12._Biology','20._Biology'],
    'Mathematics': ['9._Mathematics','17._Mathematics'],
    'Geography': ['6._Geography','10._Geography','12._Geography'],
    'History Civics': ['5._History_Civics'],
    'History': ['8._History'],
    'Computer Science': ['18._Computer_Applications','25._Computer_Science','12._Computer_Science'],
    'Economics': ['13._Economics','12._Economics_1','19._Economic_Applications'],
    'Accountancy': ['12._Accountancy','15._Accountancy'],
    'Business Studies': ['14._Business_Studies','12._Business_Studies','14._Commercial_Studies','20._Commercial_Applications'],
    'Environmental Science': ['17._Environmental_Science','31._Environmental_Science'],
    'Political Science': ['9._Political_Science','12._Isc_Political_Science'],
    'Sociology': ['11._Sociology','12._Isc_Sociology'],
    'Psychology': ['12._Psychology'],
    'Biotechnology': ['32._Biotechnology'],
    'Artificial Intelligence': ['36._Artificial_Intelligence'],
    'Robotics': ['37._Robotics'],
    'Applied Mathematics': ['38._Applied_Mathematics'],
};

function getCisceSyllabusTopics(subject, cls) {
    const files = cisceSubjectMap[subject] || [];
    const result = [];
    for (const f of files) {
        const fpath = cisceDir + '/' + f + '.json';
        if (!fs.existsSync(fpath)) continue;
        const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
        for (const item of data) {
            let itemCls = item.grade;
            if (!itemCls) { const m = f.match(/^(\d+)/); if (m) itemCls = parseInt(m[1]); }
            if (itemCls == cls) {
                result.push(...(item.topics || []));
            }
        }
    }
    return result;
}

// CBSE subject file mapping for C11-12
const cbseFileMap = {
    'Physics': 'Physics', 'Chemistry': 'Chemistry', 'Biology': 'Biology',
    'Mathematics': 'Mathematics', 'Geography': 'Geography',
    'History Civics': null, 'History': null,
    'Computer Science': null,
    'Economics': 'Economics', 'Accountancy': 'Accountancy',
    'Business Studies': 'BusinessStudies',
    'Environmental Science': null,
    'Political Science': null, 'Sociology': null, 'Psychology': null,
    'Biotechnology': null, 'Artificial Intelligence': null,
    'Robotics': null, 'Applied Mathematics': null,
};

// CBSE nodes file for C6-8
const cbseNodeFileMap = {
    'Physics': 'science.json', 'Chemistry': 'science.json', 'Biology': 'science.json',
    'Mathematics': 'maths.json', 'Geography': 'geography.json',
    'History Civics': 'hist.json', 'History': 'hist.json',
    'Environmental Science': 'science.json',
};

function getCbseTopics(subject, cls) {
    if (cls >= 6 && cls <= 8) {
        // C6-8: use nodes, classify by subject
        if (subject === 'Physics' || subject === 'Chemistry' || subject === 'Biology') {
            // Get all science chapters and classify
            const allChapters = getCbseNodesChapters('science.json', cls);
            return allChapters.filter(ch => classifyScienceChapter(ch) === subject);
        }
        const nodeFile = cbseNodeFileMap[subject];
        if (nodeFile) return getCbseNodesChapters(nodeFile, cls);
        return [];
    } else if (cls === 9 || cls === 10) {
        // C9-10: Physics/Chem/Bio are in Science.json
        if (subject === 'Physics' || subject === 'Chemistry' || subject === 'Biology') {
            return getCbseScienceTopicsBySubject(cls, subject);
        }
        // Other subjects
        const cbseSubj = cbseFileMap[subject];
        if (cbseSubj) return getCbseSyllabusTopics(cbseSubj, cls);
        return [];
    } else {
        // C11-12
        const cbseSubj = cbseFileMap[subject];
        if (cbseSubj) return getCbseSyllabusTopics(cbseSubj, cls);
        return [];
    }
}

function getCisceTopics(subject, cls) {
    if (cls >= 6 && cls <= 8) {
        return (cisceUpperPrimary[subject] && cisceUpperPrimary[subject][cls]) || [];
    }
    return getCisceSyllabusTopics(subject, cls);
}

// Build side-by-side report
let md = '# CISCE vs CBSE: Side-by-Side Topic Comparison (C6-12)\n\n';
md += '**Excluding English and Hindi**\n\n';
md += 'CBSE topics on the left, CISCE topics on the right.\n';
md += 'Note: CBSE C6-10 teaches Physics/Chemistry/Biology as integrated "Science" — chapters classified by topic.\n\n';

const allSubjects = ['Physics','Chemistry','Biology','Mathematics','Geography','History Civics','History',
    'Computer Science','Economics','Accountancy','Business Studies','Environmental Science',
    'Political Science','Sociology','Psychology','Biotechnology','Artificial Intelligence',
    'Robotics','Applied Mathematics'];

for (const subject of allSubjects) {
    let hasData = false;
    for (let cls = 6; cls <= 12; cls++) {
        const cbse = getCbseTopics(subject, cls);
        const cisce = getCisceTopics(subject, cls);
        if (cbse.length > 0 || cisce.length > 0) { hasData = true; break; }
    }
    if (!hasData) continue;

    md += `---\n\n## ${subject}\n\n`;

    for (let cls = 6; cls <= 12; cls++) {
        const cbseTopics = getCbseTopics(subject, cls);
        const cisceTopics = getCisceTopics(subject, cls);

        if (cbseTopics.length === 0 && cisceTopics.length === 0) continue;

        md += `### Class ${cls}\n\n`;
        const maxRows = Math.max(cbseTopics.length, cisceTopics.length);
        md += '| # | CBSE | CISCE |\n';
        md += '|---|------|-------|\n';
        for (let i = 0; i < maxRows; i++) {
            const cbse = cbseTopics[i] || '';
            const cisce = cisceTopics[i] || '';
            md += `| ${i+1} | ${cbse.replace(/\|/g,'\\|')} | ${cisce.replace(/\|/g,'\\|')} |\n`;
        }
        md += '\n';
    }
}

fs.writeFileSync('D:/platform/CISCE_vs_CBSE_side_by_side.md', md);
console.log('Saved to D:/platform/CISCE_vs_CBSE_side_by_side.md');
console.log('Size: ' + fs.statSync('D:/platform/CISCE_vs_CBSE_side_by_side.md').size + ' bytes');
