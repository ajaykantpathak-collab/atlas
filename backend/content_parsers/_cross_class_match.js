const fs = require('fs');

const cbseDir = 'D:/educational_platform/syllabus_data/CBSE';
const cisceDir = 'D:/educational_platform/syllabus_data/CISCE';
const cbseNodesDir = 'D:/platform/cbse_data/nodes/by_subject';

// ============================================================
// STEP 1: Build a flat list of ALL CBSE topics across ALL classes
//         Keyed by subject, but ignoring class for matching
// ============================================================

// CBSE C6-8 from nodes (integrated science)
function getCbseNodesChapters(file) {
    const fpath = cbseNodesDir + '/' + file;
    if (!fs.existsSync(fpath)) return [];
    const nodes = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    const chapters = new Set();
    for (const n of nodes) {
        if (n.class_level >= 6 && n.class_level <= 8 && n.chapter_name) {
            chapters.add(n.chapter_name.trim());
        }
    }
    return [...chapters];
}

// Classify a CBSE science chapter as Physics/Chem/Bio
function classifyScienceChapter(chapter) {
    const c = chapter.toLowerCase();
    if (c.match(/motion|force|light|electric|magnet|sound|heat|energy|measurement|shadow|circuit|gravity|work|pendulum|time|skies/)) return 'Physics';
    if (c.match(/matter|acid|base|salt|metal|chemical|substance|separation|change|element|compound|water|air|carbon|atom|fibre|fabric|materials|sorting/)) return 'Chemistry';
    if (c.match(/food|plant|body|living|animal|life|reproduction|cell|tissue|organ|health|disease|environment|ecosystem|nutrition|respiration|evolution|heredity|resource|conservation|habitat|organism|adolescence|growth/)) return 'Biology';
    return 'General';
}

// Build CBSE topic pool: { subject: [{topic, source, class}] }
const cbsePool = {};

function addCbseTopic(subject, topic, cls, source) {
    if (!cbsePool[subject]) cbsePool[subject] = [];
    cbsePool[subject].push({ topic, cls, source });
}

// C6-8 from nodes
const scienceChapters = getCbseNodesChapters('science.json');
for (const ch of scienceChapters) {
    const subj = classifyScienceChapter(ch);
    if (subj !== 'General') addCbseTopic(subj, ch, 8, 'CBSE C6-8 Science');
}
// Physics nodes (also integrated science)
const physicsChapters = getCbseNodesChapters('physics.json');
for (const ch of physicsChapters) {
    const subj = classifyScienceChapter(ch);
    if (subj !== 'General') addCbseTopic(subj, ch, 6, 'CBSE C6-8 Science');
}
// Maths nodes
const mathsChapters = getCbseNodesChapters('maths.json');
for (const ch of mathsChapters) addCbseTopic('Mathematics', ch, 6, 'CBSE C6-8 Maths');
// Geography nodes
const geoChapters = getCbseNodesChapters('geography.json');
for (const ch of geoChapters) addCbseTopic('Geography', ch, 7, 'CBSE C6-8 Geography');
// History/Civics nodes
const histChapters = getCbseNodesChapters('history_civics.json');
for (const ch of histChapters) addCbseTopic('History Civics', ch, 7, 'CBSE C6-8 History/Civics');
const histChapters2 = getCbseNodesChapters('hist.json');
for (const ch of histChapters2) {
    addCbseTopic('History Civics', ch, 8, 'CBSE C6-8 History/Civics');
    addCbseTopic('History', ch, 8, 'CBSE C6-8 History');
}

// C9-12 from syllabus JSON
const cbseFiles = fs.readdirSync(cbseDir).filter(f => f.endsWith('.json') && !f.match(/English|Hindi/i));
for (const f of cbseFiles) {
    const data = JSON.parse(fs.readFileSync(cbseDir + '/' + f, 'utf8'));
    if (!Array.isArray(data)) continue;
    const subjRaw = f.replace('.json', '');
    let subject = subjRaw;
    // Map CBSE subject names
    if (subjRaw === 'Science') {
        // Split into Physics/Chem/Bio by chapter
        for (const item of data) {
            const subj = classifyScienceChapter(item.chapter || '');
            if (subj === 'General') {
                // Try classifying by topics
                const topics = (item.topics || []).join(' ').toLowerCase();
                if (topics.match(/motion|force|light|electric|magnet|sound|heat|energy|work|gravity/)) subject = 'Physics';
                else if (topics.match(/atom|molecule|acid|base|salt|metal|chemical|reaction|carbon|compound|matter/)) subject = 'Chemistry';
                else if (topics.match(/cell|tissue|plant|animal|life|reproduction|heredity|evolution|environment|ecosystem|nutrition|health|disease/)) subject = 'Biology';
                else subject = 'General Science';
            } else {
                subject = subj;
            }
            if (subject === 'General Science') continue;
            for (const t of (item.topics || [])) addCbseTopic(subject, t, item.grade, 'CBSE C9-10 ' + subjRaw);
            if (item.chapter) addCbseTopic(subject, item.chapter, item.grade, 'CBSE C9-10 ' + subjRaw);
        }
        continue;
    }
    // Map names
    if (subjRaw === 'BusinessStudies') subject = 'Business Studies';
    else if (subjRaw === 'Civics') subject = 'History Civics';
    else if (subjRaw === 'History') { subject = 'History Civics'; }
    else subject = subjRaw;

    for (const item of data) {
        for (const t of (item.topics || [])) addCbseTopic(subject, t, item.grade, 'CBSE ' + subjRaw);
        if (item.chapter) addCbseTopic(subject, item.chapter, item.grade, 'CBSE ' + subjRaw);
    }
}

// Also add History as separate
if (cbsePool['History Civics']) {
    cbsePool['History'] = cbsePool['History Civics'].filter(t => t.topic.toLowerCase().match(/history|civilisation|empire|king|dynasty|war|independence|movement|revolution|colonial|freedom|nationalism|mauryan|gupta|vedic|harappan|delhi|mughal|british|revolt/));
}

// ============================================================
// STEP 2: Build CISCE topic list
// ============================================================

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

const cisceTopics = {};
function addCisceTopic(subject, topic, cls) {
    if (!cisceTopics[subject]) cisceTopics[subject] = [];
    cisceTopics[subject].push({ topic, cls });
}

// C6-8
for (const [subject, classes] of Object.entries(cisceUpperPrimary)) {
    for (const [cls, topics] of Object.entries(classes)) {
        for (const t of topics) addCisceTopic(subject, t, parseInt(cls));
    }
}

// C9-12
for (const [subject, files] of Object.entries(cisceSubjectMap)) {
    for (const f of files) {
        const fpath = cisceDir + '/' + f + '.json';
        if (!fs.existsSync(fpath)) continue;
        const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
        for (const item of data) {
            let cls = item.grade;
            if (!cls) { const m = f.match(/^(\d+)/); if (m) cls = parseInt(m[1]); }
            if (!cls) continue;
            for (const t of (item.topics || [])) addCisceTopic(subject, t, cls);
        }
    }
}

// ============================================================
// STEP 3: Match each CISCE topic against ALL CBSE topics (any class)
// ============================================================

function normalize(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Concept keyword groups for semantic matching
const conceptGroups = [
    ['force','newton','inertia','momentum','push','pull'],
    ['energy','kinetic','potential','work','power','joule'],
    ['light','reflection','refraction','mirror','lens','optics','shadow','dispersion','spectrum'],
    ['sound','wave','vibration','frequency','amplitude','pitch','echo','sonar','ultrasound'],
    ['electric','current','voltage','circuit','charge','ohm','resistance','kirchhoff','capacitance'],
    ['magnet','magnetic','pole','compass','solenoid','electromagnet'],
    ['heat','temperature','thermal','calorimetry','latent','expansion','conduction','convection','radiation'],
    ['matter','solid','liquid','gas','state','particle','plasma'],
    ['measurement','unit','si','length','mass','time','vernier','screw gauge','dimensional','significant figure','error'],
    ['motion','speed','velocity','acceleration','displacement','distance','retardation','projectile','circular'],
    ['gravity','gravitation','weight','free fall','kepler','orbital','satellite','escape velocity'],
    ['atom','atomic','nucleus','electron','proton','neutron','isotope','bohr','rutherford','thomson','quantum','orbital'],
    ['reaction','reactant','product','equation','balance','decomposition','displacement','combination','redox','oxidation','reduction'],
    ['acid','base','salt','ph','neutralization','indicator','buffer'],
    ['cell','tissue','organ','organelle','nucleus','membrane','mitochondria','ribosome','golgi'],
    ['plant','photosynthesis','leaf','flower','root','stem','transpiration','xylem','phloem'],
    ['human body','digestive','respiratory','circulatory','nervous','excretory','heart','blood','kidney','brain','lung'],
    ['reproduction','reproductive','sexual','asexual','fertilization','gamete','sperm','ovum','menstrual','pregnancy'],
    ['health','hygiene','disease','infection','vaccine','immunity','immunisation','aids','cancer','drug'],
    ['ecosystem','environment','ecology','food chain','food web','biodiversity','conservation','trophic','biogeochemical'],
    ['heredity','evolution','mendel','darwin','genetics','gene','chromosome','dna','rna','mutation','inheritance'],
    ['number','integer','rational','irrational','fraction','decimal','natural','whole','real','complex','surds'],
    ['algebra','equation','expression','variable','polynomial','factor','identity','linear','quadratic','simultaneous'],
    ['geometry','angle','triangle','circle','line','polygon','quadrilateral','construction','congrue','similar','parallel','perpendicular'],
    ['mensuration','area','perimeter','volume','surface','capacity','cuboid','cylinder','cone','sphere'],
    ['ratio','proportion','percentage','profit','loss','discount','interest','compound','simple','depreciation'],
    ['data','statistics','graph','chart','mean','median','mode','probability','frequency','ogive','histogram'],
    ['trigonometry','sin','cos','tan','cosec','sec','cot','angle elevation','angle depression'],
    ['calculus','derivative','integral','limit','continuity','differenti','differential'],
    ['set','subset','union','intersection','complement','venn','cartesian','relation','function','domain','range'],
    ['matrix','determinant','vector','cross product','dot product'],
    ['earth','map','latitude','longitude','climate','weather','landform','mountain','river','ocean','continent','plateau','plain'],
    ['population','migration','urbanisation','urbanization','settlement','demography','census','density'],
    ['agriculture','crop','farming','irrigation','fertilizer','green revolution','food security'],
    ['resource','mineral','energy','fossil fuel','renewable','conservation','sustainable','forest','water'],
    ['history','civilisation','civilization','empire','king','dynasty','war','independence','movement','revolution','colonial','freedom','nationalism','mauryan','gupta','vedic','harappan','indus valley','delhi sultanate','mughal','british','revolt','satyagraha','gandhi','nehru'],
    ['constitution','fundamental rights','fundamental duties','directive principles','parliament','legislature','executive','judiciary','amendment','election','franchise','cabinet','president','prime minister','governor','chief minister','state government','local self government','secularism','democracy','republic','welfare state'],
    ['economics','economy','demand','supply','market','gdp','inflation','fiscal','monetary','trade','globalization','liberalisation','privatisation','consumer','money','banking','credit','poverty','unemployment','human capital','food security','pds','sector','agriculture','industry','service'],
    ['business','management','management','marketing','finance','company','partnership','sole proprietorship','joint stock','cooperative','commerce','trade','industry','ethics','social responsibility','csr','e-commerce','outsourcing','entrepreneur','small business'],
    ['account','journal','ledger','balance sheet','debit','credit','trial balance','depreciation','bills of exchange','final accounts','rectification','suspense','npf','receipts payments','income expenditure','gaap','ifrs','accounting standard','cash flow','ratio analysis','comparative','common size','partnership','goodwill','admission','retirement','death','dissolution','share','debenture','forfeiture','reissue'],
    ['computer','programming','java','python','algorithm','data structure','boolean','logic gate','oop','object','class','inheritance','polymorphism','encapsulation','abstraction','array','string','function','method','constructor','ide','open source','binary','octal','hexadecimal','ascii','unicode','complement'],
    ['political science','state','sovereignty','law','liberty','equality','justice','democracy','government','constitution','rights','duties','liberalism','communism','marxism','social contract','hobbes','locke','rousseau','austin','rawls','amartya','soviet','cold war'],
    ['sociology','society','social','culture','caste','tribe','kinship','marriage','family','religion','comte','spencer','durkheim','weber','marx','positivism','functionalism','bureaucracy','socialization','rural','urban','heredity','nature nurture','research method','questionnaire','interview','observation'],
    ['psychology','behavior','behaviour','emotion','motivation','memory','perception','intelligence','personality','stress','structuralism','functionalism','behaviourism','behaviorism','psychoanalysis','gestalt','cognitive','clinical','counselling','developmental','educational','organizational','heredity','chromosome','gene','twin study','experiment','survey','questionnaire','ethical'],
    ['biotechnology','fermentation','genetic','rdna','enzyme','ipr','patent','glp','gmp','biosafety','gmo','geac','boyer','cohen','fleming','pasteur','watson','crick','mendel','hooke','leeuwenhoek','lowry','bronsted','henderson','hasselbalch','buffer'],
    ['artificial intelligence','machine learning','neural','nlp','natural language','python','data','algorithm','ethics','regression','visualization','chatbot','siri','alexa','deep learning'],
    ['robot','frame','coordinate','transformation','matrix','vector','cad','actuator','sensor','control'],
];

function getConceptWords(topic) {
    const n = normalize(topic);
    const concepts = [];
    for (const group of conceptGroups) {
        if (group.some(w => n.includes(w))) {
            concepts.push(group[0]);
        }
    }
    return concepts;
}

function matchTopic(cisceTopic, cbseTopicList) {
    const cn = normalize(cisceTopic);
    const cisceConcepts = getConceptWords(cisceTopic);

    let bestMatch = null;
    let bestScore = 0;
    let bestType = '';

    for (const cbse of cbseTopicList) {
        const bn = normalize(cbse.topic);
        let score = 0;
        let type = '';

        // Exact
        if (cn === bn) { score = 100; type = 'exact'; }
        // Containment (meaningful)
        else if (cn.length > 4 && bn.length > 4) {
            if (cn.includes(bn) && bn.split(' ').length >= 2) { score = 90; type = 'CISCE⊃CBSE'; }
            else if (bn.includes(cn) && cn.split(' ').length >= 2) { score = 90; type = 'CBSE⊃CISCE'; }
        }

        // Word overlap (>= 2 meaningful words)
        if (score < 50) {
            const w1 = cn.split(' ').filter(w => w.length > 3);
            const w2 = bn.split(' ').filter(w => w.length > 3);
            if (w1.length > 0 && w2.length > 0) {
                const overlap = w1.filter(w => w2.includes(w));
                if (overlap.length >= 2) {
                    score = Math.min(85, (overlap.length / Math.max(w1.length, w2.length)) * 80 + 30);
                    type = 'word-overlap: ' + overlap.join(',');
                }
            }
        }

        // Concept-level matching
        if (score < 40 && cisceConcepts.length > 0) {
            const cbseConcepts = getConceptWords(cbse.topic);
            const sharedConcepts = cisceConcepts.filter(c => cbseConcepts.includes(c));
            if (sharedConcepts.length > 0) {
                // Only count if the shared concept is specific enough
                // Skip very generic concepts like "number", "data"
                const specificConcepts = sharedConcepts.filter(c =>
                    !['number','data','set','matter','measurement'].includes(c));
                if (specificConcepts.length > 0) {
                    score = 35 + specificConcepts.length * 5;
                    type = 'concept: ' + specificConcepts.join(',');
                }
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestMatch = cbse;
            bestType = type;
        }
    }

    return { match: bestMatch, score: bestScore, type: bestType };
}

// ============================================================
// STEP 4: Classify every CISCE topic
// ============================================================

const results = {};
let commonCount = 0;
let alienCount = 0;
let noCbseDataCount = 0;

for (const [subject, topicList] of Object.entries(cisceTopics)) {
    results[subject] = { common: [], alien: [], noData: [] };
    const cbsePoolForSubject = cbsePool[subject] || [];

    // Also check related subjects
    let pool = [...cbsePoolForSubject];
    if (subject === 'History') pool = [...pool, ...(cbsePool['History Civics'] || [])];
    if (subject === 'History Civics') pool = [...pool, ...(cbsePool['History'] || [])];
    if (subject === 'Environmental Science') pool = [...pool, ...(cbsePool['Biology'] || [])];

    for (const cisceItem of topicList) {
        if (pool.length === 0) {
            results[subject].noData.push(cisceItem);
            noCbseDataCount++;
            continue;
        }
        const result = matchTopic(cisceItem.topic, pool);
        if (result.match && result.score >= 35) {
            results[subject].common.push({
                cisce: cisceItem.topic,
                cisceClass: cisceItem.cls,
                cbse: result.match.topic,
                cbseClass: result.match.cls,
                cbseSource: result.match.source,
                score: Math.round(result.score),
                type: result.type
            });
            commonCount++;
        } else {
            results[subject].alien.push({
                topic: cisceItem.topic,
                cisceClass: cisceItem.cls,
                bestMatch: result.match ? result.match.topic : null,
                bestScore: result.score
            });
            alienCount++;
        }
    }
}

// ============================================================
// STEP 5: Generate report
// ============================================================

let md = '# CISCE vs CBSE: Common vs Alien Topics (Cross-Class Matching)\n\n';
md += '**Excluding English and Hindi**\n\n';
md += '**Method:** Each CISCE topic is matched against ALL CBSE topics across ALL classes (C6-12).\n';
md += 'A topic is "common" if CBSE teaches the same concept at any class level, even if at a different class.\n';
md += 'A topic is "alien" only if CBSE has no corresponding topic at any class level.\n\n';

md += '## Summary\n\n';
md += '| Category | Count |\n';
md += '|----------|-------|\n';
md += `| Common (CBSE teaches it at some class) | ${commonCount} |\n`;
md += `| Alien (genuinely not in CBSE at any class) | ${alienCount} |\n`;
md += `| No CBSE data for this subject | ${noCbseDataCount} |\n`;
md += `| **Total CISCE topics** | **${commonCount + alienCount + noCbseDataCount}** |\n\n`;

md += '## Per-Subject Breakdown\n\n';
md += '| Subject | Common | Alien | No CBSE Data | Total |\n';
md += '|---------|--------|-------|--------------|-------|\n';
for (const subject of Object.keys(results).sort()) {
    const r = results[subject];
    const total = r.common.length + r.alien.length + r.noData.length;
    md += `| ${subject} | ${r.common.length} | ${r.alien.length} | ${r.noData.length} | ${total} |\n`;
}
md += `| **TOTAL** | **${commonCount}** | **${alienCount}** | **${noCbseDataCount}** | **${commonCount + alienCount + noCbseDataCount}** |\n\n`;

md += '## Detailed Results\n\n';
for (const subject of Object.keys(results).sort()) {
    const r = results[subject];
    if (r.common.length === 0 && r.alien.length === 0 && r.noData.length === 0) continue;

    md += `### ${subject}\n\n`;

    if (r.noData.length > 0) {
        md += `**NO CBSE DATA** (${r.noData.length} CISCE topics — CBSE does not offer this subject):\n\n`;
        for (const t of r.noData) {
            md += `- [C${t.cls}] ${t.topic}\n`;
        }
        md += '\n';
    }

    if (r.alien.length > 0) {
        md += `**ALIEN — genuinely not in CBSE at any class** (${r.alien.length}):\n\n`;
        for (const t of r.alien) {
            md += `- [C${t.cisceClass}] ${t.topic}`;
            if (t.bestMatch && t.bestScore > 0) {
                md += `  _(closest CBSE: "${t.bestMatch}" score ${Math.round(t.bestScore)})_`;
            }
            md += '\n';
        }
        md += '\n';
    }

    if (r.common.length > 0) {
        md += `**COMMON — CBSE teaches this at some class** (${r.common.length}):\n\n`;
        md += '| CISCE Topic | CISCE Class | CBSE Topic | CBSE Class | Match Type |\n';
        md += '|-------------|------------|------------|------------|------------|\n';
        for (const c of r.common) {
            md += `| ${c.cisce} | C${c.cisceClass} | ${c.cbse} | C${c.cbseClass} | ${c.type} (${c.score}) |\n`;
        }
        md += '\n';
    }
}

fs.writeFileSync('D:/platform/CISCE_vs_CBSE_common_vs_alien.md', md);
fs.writeFileSync('D:/platform/CISCE_vs_CBSE_common_vs_alien.json', JSON.stringify(results, null, 2));

console.log('=== CROSS-CLASS MATCHING RESULTS ===');
console.log('Common (CBSE has it at some class): ' + commonCount);
console.log('Alien (genuinely not in CBSE):     ' + alienCount);
console.log('No CBSE data for subject:          ' + noCbseDataCount);
console.log('Total CISCE topics:                ' + (commonCount + alienCount + noCbseDataCount));
console.log('');
console.log('=== PER SUBJECT ===');
console.log('Subject                           Common   Alien   NoData  Total');
console.log('---------------------------------------------------------------');
for (const subject of Object.keys(results).sort()) {
    const r = results[subject];
    const total = r.common.length + r.alien.length + r.noData.length;
    console.log(subject.padEnd(35) +
        String(r.common.length).padStart(7) +
        String(r.alien.length).padStart(8) +
        String(r.noData.length).padStart(8) +
        String(total).padStart(8));
}
console.log('---------------------------------------------------------------');
console.log('TOTAL'.padEnd(35) +
    String(commonCount).padStart(7) +
    String(alienCount).padStart(8) +
    String(noCbseDataCount).padStart(8) +
    String(commonCount + alienCount + noCbseDataCount).padStart(8));
console.log('');
console.log('Reports saved:');
console.log('  D:/platform/CISCE_vs_CBSE_common_vs_alien.md');
console.log('  D:/platform/CISCE_vs_CBSE_common_vs_alien.json');
