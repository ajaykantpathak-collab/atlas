/**
 * _jeng_validate.js — independent schema validator for the JUNIOR-ENGLISH
 * game strand. Validates per lib/game-engine/types.ts GameData:
 *   slideCount=5, challengeCount=8, slides exactly 5 {title,text,emoji,bgColor,spoken},
 *   challenges exactly 8 {type,question,answer,options>=3,hint,misconception},
 *   answer in options (MCQ), sort challenges need sortItems+bins (correctBin in bins),
 *   mascot named (not "Unknown"/empty).
 * Also simulates play/page.tsx getSubjectKey over the whole manifest to prove
 * the English chip wiring and detect any existing-game reclassification.
 */
const fs = require('fs');
const path = require('path');

const DIR = process.argv[2] || path.join(__dirname, 'frontend', 'public', 'data', 'games');
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, '_manifest.json'), 'utf8'));

function getSubjectKey(gameFile) {
  const f = gameFile.toLowerCase();
  if (f.startsWith('eng') || f.includes('english') || f.includes('phonics') || f.includes('grammar')) return 'english';
  if (f.includes('globe') || f.includes('continent') || f.includes('landform') || f.includes('monument') || f.includes('festival')) return 'social';
  if (f.includes('add') || f.includes('sub') || f.includes('mul') || f.includes('div') ||
      f.includes('count') || f.includes('number') || f.includes('pattern') || f.includes('shape') ||
      f.includes('fraction') || f.includes('decimal') || f.includes('percent') ||
      f.includes('angle') || f.includes('area') || f.includes('perimeter') ||
      f.includes('integer') || f.includes('factor') || f.includes('large') ||
      f.includes('mentalmath') || f.includes('operation') || f.includes('measurement') ||
      f.includes('time') || f.includes('weight') || f.includes('data')) return 'maths';
  if (f.includes('computer') || f.includes('software') || f.includes('internet') ||
      f.includes('powerpoint') || f.includes('word') || f.includes('windows') ||
      f.includes('paint') || f.includes('scratch') || f.includes('logo') ||
      f.includes('algorithm') || f.includes('file')) return 'computer';
  if (f.includes('plant') || f.includes('animal') || f.includes('body') || f.includes('health') ||
      f.includes('circulatory') || f.includes('skeletal') || f.includes('matter') ||
      f.includes('mixture') || f.includes('solution') || f.includes('float') ||
      f.includes('light') || f.includes('sound') || f.includes('energy') ||
      f.includes('machine') || f.includes('ecosystem') || f.includes('reproduction') ||
      f.includes('digestion') || f.includes('disease') || f.includes('bird') ||
      f.includes('insect') || f.includes('force') || f.includes('friction') ||
      f.includes('solar') || f.includes('eclipse') || f.includes('weather') ||
      f.includes('air') || f.includes('water') || f.includes('food') ||
      f.includes('skin') || f.includes('adaptation') || f.includes('living')) return 'science';
  return 'evs';
}

// canvas-interactive guard (frontend/lib/game-engine/canvasInteractive.ts), question text only
const CANVAS = ['number line','hop','fraction','half','quarter','third','body','eye','ear','nose','mouth','hand','leg','heart','brain','bone','muscle','skin','teeth','perimeter','fencing','area','percent','integer','negative','-5','-1','left of zero','3d','cylinder','cube','sphere','cone','pyramid','faces','edges','vertices','symmetry','symmetrical','reflection','decimal','prime','composite','factor','hcf','lcm','greatest common','least common','pattern','sequence','next two','progressive','physical change','chemical change','melting','burning','rusting','circulat','blood','artery','vein','crop','kharif','rabi','agriculture','farming','earthquake','volcano','flood','drought','disaster','tsunami','mixture','solution','suspension','colloid','filtration','evaporation','separation','abacus','babbage','eniac','vacuum','analytical','generation','computer','calculating','environment','biotic','abiotic','renewable','natural resource','transport','airway','railway','roadway','air','nitrogen','oxygen','gas','breeze','wind','algebra','equation','solve for x','construct','protractor','draw angle','draw a triangle','construct a triangle','graph','coordinate','plot','cartesian','ordered pair','photosynthesis','germination','seed'];

const errors = [];
const files = fs.readdirSync(DIR).filter(f => /^c[1-5]_Eng.*Game\.json$/.test(f));
if (files.length !== 20) errors.push(`expected 20 English game files, found ${files.length}: ${files.join(',')}`);

for (const f of files) {
  let d;
  try { d = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); }
  catch (e) { errors.push(`${f}: INVALID JSON ${e.message}`); continue; }

  const m = manifest.find(e => e.dataFile === f);
  if (!m) errors.push(`${f}: NOT in manifest`);
  else {
    if (m.gameFile !== d.gameFile) errors.push(`${f}: manifest gameFile ${m.gameFile} != ${d.gameFile}`);
    if (m.classLevel !== d.classLevel) errors.push(`${f}: manifest classLevel mismatch`);
    if (m.slideCount !== 5 || m.challengeCount !== 8) errors.push(`${f}: manifest counts wrong`);
    if (!Array.isArray(m.cisceNodes)) errors.push(`${f}: manifest cisceNodes not array`);
  }

  if (d.gameFile !== f.replace(/\.json$/, '').replace(/^c\d+_/, '')) errors.push(`${f}: gameFile/filename mismatch (loader would 404)`);
  if (![1,2,3,4,5].includes(d.classLevel)) errors.push(`${f}: bad classLevel ${d.classLevel}`);
  if (!Array.isArray(d.cisceNodes)) errors.push(`${f}: cisceNodes not array`);
  if (!d.mascot || d.mascot === 'Unknown') errors.push(`${f}: mascot missing or "Unknown"`);
  if (d.subject && d.subject !== 'english') errors.push(`${f}: subject should be english`);
  if (d.slideCount !== 5) errors.push(`${f}: slideCount ${d.slideCount}`);
  if (d.challengeCount !== 8) errors.push(`${f}: challengeCount ${d.challengeCount}`);

  if (!Array.isArray(d.slides) || d.slides.length !== 5) {
    errors.push(`${f}: slides length ${d.slides && d.slides.length} != 5`);
  } else {
    d.slides.forEach((s, i) => {
      for (const k of ['title','text','emoji','bgColor','spoken']) {
        if (typeof s[k] !== 'string' || !s[k]) errors.push(`${f} slide[${i}]: missing/empty ${k}`);
      }
    });
  }

  if (!Array.isArray(d.challenges) || d.challenges.length !== 8) {
    errors.push(`${f}: challenges length ${d.challenges && d.challenges.length} != 8`);
  } else {
    d.challenges.forEach((c, i) => {
      for (const k of ['type','question','answer','hint','misconception']) {
        if (typeof c[k] !== 'string' || !c[k]) errors.push(`${f} ch[${i}]: missing/empty ${k}`);
      }
      const isSort = typeof c.type === 'string' && c.type.startsWith('sort');
      if (isSort) {
        if (!Array.isArray(c.sortItems) || c.sortItems.length === 0) errors.push(`${f} ch[${i}]: sort missing sortItems`);
        if (!Array.isArray(c.bins) || c.bins.length === 0) errors.push(`${f} ch[${i}]: sort missing bins`);
        if (c.sortItems && c.bins) {
          const binIds = new Set(c.bins.map(b => b.id));
          for (const si of c.sortItems) {
            if (!binIds.has(si.correctBin)) errors.push(`${f} ch[${i}]: sortItem "${si.label}" -> unknown bin "${si.correctBin}"`);
            if (typeof si.label !== 'string' || !si.label) errors.push(`${f} ch[${i}]: sortItem missing label`);
          }
          for (const b of c.bins) {
            if (typeof b.id !== 'string' || typeof b.label !== 'string' || !b.color) errors.push(`${f} ch[${i}]: bin "${b.id}" missing id/label/color`);
          }
        }
      } else {
        if (!Array.isArray(c.options) || c.options.length < 3) errors.push(`${f} ch[${i}]: options ${c.options && c.options.length} < 3`);
        if (c.options && !c.options.includes(c.answer)) errors.push(`${f} ch[${i}]: answer "${c.answer}" not in options`);
        if (c.options && new Set(c.options).size !== c.options.length) errors.push(`${f} ch[${i}]: duplicate options`);
      }
      // canvas-interactive guard on question text (MCQ buttons would hide)
      if (typeof c.question === 'string') {
        const ql = c.question.toLowerCase();
        for (const t of CANVAS) if (ql.includes(t)) { errors.push(`${f} ch[${i}]: question matches canvas-interactive trigger "${t}"`); break; }
        if (/\d\s*[+\-]\s*\d|\d\.\d/.test(ql)) errors.push(`${f} ch[${i}]: question has arithmetic/decimal pattern`);
      }
    });
    const sortCount = d.challenges.filter(c => typeof c.type === 'string' && c.type.startsWith('sort')).length;
    if (sortCount < 2) warnings_push(`${f}: only ${sortCount} sort challenges`);
  }

  const subj = getSubjectKey(d.gameFile);
  if (subj !== 'english') errors.push(`${f}: getSubjectKey -> "${subj}" NOT english!`);
}
function warnings_push(m) { console.log('NOTE:', m); }

// whole-manifest subject distribution + reclassification audit
const byClassSubject = {};
const reclassified = [];
for (const e of manifest) {
  const s = getSubjectKey(e.gameFile);
  byClassSubject[e.classLevel] = byClassSubject[e.classLevel] || {};
  byClassSubject[e.classLevel][s] = (byClassSubject[e.classLevel][s] || 0) + 1;
  const isEnglishFile = /^c[1-5]_Eng/.test(e.dataFile || '');
  const wasEnglishFile = isEnglishFile;
  if (!wasEnglishFile && ['globe','continent','landform'].some(t => e.gameFile.toLowerCase().includes(t))) {
    reclassified.push(`${e.dataFile}: evs -> social`);
  }
  if (wasEnglishFile && s !== 'english') reclassified.push(`${e.dataFile}: MIS-CLASSIFIED as ${s}`);
}
if (reclassified.length) {
  console.log('SUBJECT CHANGES vs before:');
  reclassified.forEach(r => console.log('  ', r));
}

console.log('\nPer-class subject chips:');
for (const c of [1,2,3,4,5]) console.log(`  Class ${c}:`, JSON.stringify(byClassSubject[c]));

if (errors.length) {
  console.error(`\nVALIDATION FAILED — ${errors.length} error(s):`);
  errors.forEach(e => console.error('  ✗', e));
  process.exit(1);
}
console.log(`\nALL GREEN — ${files.length} English games validated (schema + manifest + subject wiring)`);
