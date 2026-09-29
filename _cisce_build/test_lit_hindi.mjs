/**
 * test_lit_hindi.mjs — test harness for the Hindi chhand/meter engine (wave H1).
 * Run: node D:\platform\_cisce_build\test_lit_hindi.mjs
 *
 * Sections:
 *   A. Syllabifier unit cases (hand-verified matra counts, incl. corpus anchors)
 *   B. Corpus verse classifications (≥8 labelled verses, per-line matra tables)
 *   C. Honest declines (prose / free-verse / untaught / junk)
 *   D. Robustness (junk, English, emoji, empty, numbers — must not crash)
 *
 * Every test cites the corpus node that grounds its expectation.
 */

import {
  syllables, matras, ganaPattern, guruLaghu,
  scanHindiVerse, TAUGHT_CHHANDS, UNTAUGHT_CHHANDS,
} from '../deploy/frontend/lib/lit/index.mjs';

let pass = 0, fail = 0;
const failures = [];

function check(name, cond, detail = '') {
  if (cond) { pass++; }
  else { fail++; failures.push(`${name}${detail ? ` :: ${detail}` : ''}`); }
}

function eq(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  check(name, ok, ok ? '' : `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ============================================================================
// A. SYLLABIFIER UNITS (hand-verified)
// ============================================================================

console.log('== A. syllabifier unit cases ==');

// A1. spec-named hand cases
eq('एक = 3 (ए2+क1)', matras('एक'), 3);
eq('कि = 1 (ह्रस्व)', matras('कि'), 1);
eq('गना = 3 (ग1+ना2)', matras('गना'), 3);
eq('कोई = 3 (को2+इ1 — R10 कोई-exception: ो-पश्चात स्वतंत्र ई = लघु)', matras('कोई'), 3);
eq('समझ्ना = 5 (स1+म1+झ्1+ना2 — halant=पूर्ण मात्रा CBSE)', matras('समझ्ना'), 5);
eq('कर्म = 3 (क1+र्1+म1, halant=full CBSE)', matras('कर्म'), 3);
eq('जन्म = 3 (कॉर्पस: दुर्लभ मानुष जन्म है = 13 का घटक)', matras('जन्म'), 3);
eq('अनुस्वार गोविंद = 5 (गो2+विं2+द1: ह्रस्व+अनुस्वार = +1)', matras('गोविंद'), 5);
eq('अनुस्वार में = 2 (दीर्घ+अनुस्वार = +0)', matras('में'), 2);
eq('चंद्रबिंदु हँसाय = 4 (हँ=1)', matras('हँसाय'), 4);
eq('चंद्रबिंदु लागूँ = 4 (गूँ=2, ँ=0)', matras('लागूँ'), 4);
eq('चंद्रबिंदु पायँ = 3 (यँ=1, लोक-उच्चारण)', matras('पायँ'), 3);
eq('चंद्रबिंदु माँगै = 4 (माँ=2)', matras('माँगै'), 4);
eq('विसर्ग दुःख = 3 (विसर्ग=1 मात्रा)', matras('दुःख'), 3);
eq('ऋषि = 2 (ऋ ह्रस्व)', matras('ऋषि'), 2);
eq('ज्ञान = 4 (ज्ञ-संयुक्त: ज्1+ञा2+न1 — CBSE पूर्ण-मात्रा परंपरा)', matras('ज्ञान'), 4);
eq('श्रवण = 4 (श्र1+व1+ण1)', matras('श्रवण'), 4);

// A2. gemination R9 (नैरो: केवल संयुक्त-पश्चात् समान व्यंजन — द्वित्व व्यंजन संधि)
eq('गोविंद दोऊ = 8 (ं+द द्वित्व: गोविं4+दोऊ4)', matras('गोविंद दोऊ'), 8);
eq('गोविंद दियो = 7 (ं+द द्वित्व)', matras('गोविंद दियो'), 7);
eq('राम मधु = 5 (ा+म खुला — कोई द्वित्व नहीं)', matras('राम मधु'), 5);
eq('राम तुम = 5 (असमान व्यंजन — कोई द्वित्व नहीं)', matras('राम तुम'), 5);
eq('कनक कनक = 6 (खुला क#क — बिहारी-लाइन की 13 के लिए अनिवार्य)', matras('कनक कनक'), 6);

// A3. corpus anchors (exact counts stated in nodes)
eq('ANCHOR गुरु गोविंद दोऊ खड़े = 13 [c10_hin_sp_cbse_16_005]', matras('गुरु गोविंद दोऊ खड़े'), 13);
eq('ANCHOR काके लागूँ पायँ = 11 [c10_hin_sp_cbse_16_005]', matras('काके लागूँ पायँ'), 11);
eq('ANCHOR कनक कनक ते सौगुनी = 13 [c10_hin_ks_cbse_03_011]', matras('कनक कनक ते सौगुनी'), 13);
eq('ANCHOR मादकता अधिकाय = 11 [c10_hin_ks_cbse_03_011]', matras('मादकता अधिकाय'), 11);
eq('ANCHOR दुर्लभ मानुष जन्म है = 13 [c10_hin_sp_cbse_16_005]', matras('दुर्लभ मानुष जन्म है'), 13);
eq('ANCHOR देह न बारम्बार = 11 [c10_hin_sp_cbse_16_005]', matras('देह न बारम्बार'), 11);
eq('ANCHOR बलिहारी गुरु आपने = 13 [c10_hin_sp_cbse_16_005]', matras('बलिहारी गुरु आपने'), 13);
eq('ANCHOR गोविंद दियो बताय = 11 [c10_hin_sp_cbse_16_005]', matras('गोविंद दियो बताय'), 11);
eq('ANCHOR मैया मोरी दाऊ बहुत खिझायो = 20 [c10_hin_ks_cbse_01_005]', matras('मैया मोरी दाऊ बहुत खिझायो'), 20);
eq('ANCHOR बादल को घिरते देखा है = 16 [c11_hin_a_cbse_14_003]', matras('बादल को घिरते देखा है'), 16);
eq('ANCHOR कुंडलिया पंक्ति-1 = 24 [c7_hin_cbse_06_003]', matras('बिना बिचारे जो करै सो पाछे पछताय'), 24);
eq('ANCHOR कुंडलिया पंक्ति-2 = 24 [c7_hin_cbse_06_003]', matras('काम बिगारे आपनो जग में होत हँसाय'), 24);
eq('ANCHOR कुंडलिया पंक्ति-5 = 24 (विसर्ग नियम सक्रिय) [c7_hin_cbse_06_003]', matras('कह गिरधर कविराय दुःख कछु टरत न टारे'), 24);
eq('ANCHOR कुंडलिया पंक्ति-6 = 24 [c7_hin_cbse_06_003]', matras('खटकत है जिय माहिं कियो जो बिना बिचारे'), 24);

// A4. syllable segmentation sanity
{
  const s = syllables('गुरु गोविंद दोऊ खड़े');
  eq('सिलेबल-क्रम (गु रु गो विं दो ऊ ख ड़े — द्वित्व-द अवशोषित)',
    s.map(x => x.text), ['गु', 'रु', 'गो', 'विं', 'दो', 'ऊ', 'ख', 'ड़े']);
  eq('भार-क्रम 13-मात्रा चरण', s.map(x => x.matras), [1, 1, 2, 2, 2, 2, 1, 2]);
  eq('guruLaghu गुरु गोविंद दोऊ खड़े', guruLaghu('गुरु गोविंद दोऊ खड़े'), 'L L G G G G L G');
  // ganaPattern: सिलेबल-धारा के 3-मात्रा खंड, आकार-आधारित नाम (llg=स, ggg=म, glg=र) + शेष
  eq('ganaPattern 13-मात्रा चरण = स म म र +1 (मात्रा-धारा के 3-मात्रा खंड, आकार-नाम)', ganaPattern('गुरु गोविंद दोऊ खड़े'), 'स म म र +1');
}

// ============================================================================
// B. CORPUS VERSE CLASSIFICATIONS (≥8 labelled verses, with matra tables)
// ============================================================================

console.log('\n== B. corpus verse classifications ==');

const verses = [
  {
    label: 'V1 कबीर साखी [c10_hin_sp_cbse_16_005]',
    text: 'गुरु गोविंद दोऊ खड़े, काके लागूँ पायँ।',
    chhand: 'दोहा', conf: 0.9, matrasPerLine: [13, 11],
  },
  {
    label: 'V2 बिहारी दोहा [c10_hin_ks_cbse_03_011]',
    text: 'कनक कनक ते सौगुनी, मादकता अधिकाय।',
    chhand: 'दोहा', conf: 0.9, matrasPerLine: [13, 11],
  },
  {
    label: 'V3 कबीर साखी [c10_hin_sp_cbse_16_005]',
    text: 'दुर्लभ मानुष जन्म है, देह न बारम्बार।',
    chhand: 'दोहा', conf: 0.9, matrasPerLine: [13, 11],
  },
  {
    label: 'V4 कबीर साखी [c10_hin_sp_cbse_16_005]',
    text: 'बलिहारी गुरु आपने, गोविंद दियो बताय।',
    chhand: 'दोहा', conf: 0.9, matrasPerLine: [13, 11],
  },
  {
    label: 'V5 गिरधर कविराय कुंडलिया [c7_hin_cbse_06_003]',
    text: 'बिना बिचारे जो करै सो पाछे पछताय।\nकाम बिगारे आपनो जग में होत हँसाय।\nजग में होत हँसाय चित्त में चैन न पावै।\nखान पान सन्मान राग रंग मनिहं न भावै।\nकह गिरधर कविराय दुःख कछु टरत न टारे।\nखटकत है जिय माहिं कियो जो बिना बिचारे।',
    chhand: 'कुंडलिया', conf: 0.9, matrasPerLine: [24, 24, 24, 25, 24, 24],
  },
  {
    label: 'V6 प्रसाद कविता-पंक्ति 16 मात्रा [c11_hin_a_cbse_14_003]',
    text: 'बादल को घिरते देखा है।',
    chhand: 'चौपाई', conf: 0.55, matrasPerLine: [16],
  },
  {
    label: 'V8 कबीर भजन (±1 परंपरा-सहन) [c10_hin_sp_cbse_16_009]',
    text: 'साईं इतना दीजिए, जामें कुटुंब समाय। मैं भी भूखा न रहूं, साधु न भूखा जाय।',
    chhand: 'दोहा', conf: 0.72, matrasPerLine: [13, 12, 12, 11],
  },
  {
    label: 'V9 रैदास/कबीर साखी (चरण-1 कॉर्पस-गणना 13, चरण-2 ±1) [c10_hin_sp_cbse_16_005]',
    text: 'जाति न पूछो साधु की, पूछ लीजिए ज्ञान।',
    chhand: 'दोहा', conf: 0.72, matrasPerLine: [13, 12],
  },
];

for (const v of verses) {
  const r = scanHindiVerse(v.text);
  check(`${v.label} → ${v.chhand}`, r.chhand === v.chhand, `got ${r.chhand}; reason=${r.declined_reason || '-'}; matras=${JSON.stringify(r.lines.map(l => l.matras))}`);
  eq(`${v.label} विश्वास`, r.confidence, v.conf);
  eq(`${v.label} प्रति-चरण मात्रा-तालिका`, r.lines.map(l => l.matras), v.matrasPerLine);
  check(`${v.label} steps में मात्रा-तालिका मौजूद`, r.notes.some(nn => nn.includes('मात्रा-तालिका')));
  check(`${v.label} citations सूचीबद्ध`, (r.citations || []).length > 0);
}

// B9. rule-level test: सोरठा order-sensitivity (कॉर्पस: "सोरठा में पहला चरण 11, दूसरा 13" — c10_hin_sp_cbse_16_005)
// same 11/13 charans as V2, inverted order → सोरठा (alias रोला)
{
  const r = scanHindiVerse('मादकता अधिकाय, कनक कनक ते सौगुनी।');
  check('B9 विलोम क्रम → सोरठा (11+13)', r.chhand === 'सोरठा', `got ${r.chhand}`);
  check('B9 सोरठा alias में रोला', (r.aliases || []).includes('रोला'));
  eq('B9 सोरठा मात्रा', r.lines.map(l => l.matras), [11, 13]);
}

// B10. single 24-मात्रा चरण → दोहा-चरण प्रतिमान (13वीं मात्रा पर आंतरिक विभाजन)
{
  const r = scanHindiVerse('कनक कनक ते सौगुनी मादकता अधिकाय।');
  check('B10 एकल 24-चरण → दोहा (निम्न विश्वास)', r.chhand === 'दोहा' && r.confidence === 0.6, `got ${r.chhand}/${r.confidence}`);
}

// ============================================================================
// C. HONEST DECLINES (≥4)
// ============================================================================

console.log('\n== C. honest declines ==');

// C1. सूरदास पद — कॉर्पस स्वयं कहता है "मानक दोहा/रोला से भिन्न → मात्रिक लोक-छंद" [c10_hin_ks_cbse_01_005]
{
  const r = scanHindiVerse('मैया मोरी दाऊ बहुत खिझायो, मोहन मारे करत भैया भेदभाव।');
  check('C1 सूरदास लोक-मात्रिक → इनकार', r.chhand === null, `got ${r.chhand}`);
  check('C1 इनकार में मात्रा-तालिका दिखे', r.notes.some(nn => nn.includes('20 मात्रा')));
  eq('C1 ईमानदार गिनती 20/21', r.lines.map(l => l.matras), [20, 21]);
}

// C2. गद्य वाक्य
{
  const r = scanHindiVerse('हिंदी भाषा भारत की सबसे बड़ी भाषा है और इसे करोड़ों लोग बोलते हैं।');
  check('C2 गद्य → इनकार', r.chhand === null, `got ${r.chhand}`);
  check('C2 इनकार-कारण मौजूद', typeof r.declined_reason === 'string' && r.declined_reason.length > 10);
}

// C3. मिश्रित 16/24 हस्ताक्षर (रैदास-पद प्रतिमान — c10_hin_sp_cbse_17_003 नाम-मात्र बताता है, नियम नहीं)
{
  const r = scanHindiVerse('बादल को घिरते देखा है।\nबिना बिचारे जो करै सो पाछे पछताय।');
  check('C3 मिश्रित 16/24 → इनकार', r.chhand === null, `got ${r.chhand}`);
  check('C3 कारण में मिश्रित-हस्ताक्षर वर्णन', (r.declined_reason || '').includes('मिश्रित'));
}

// C4. मुक्त छंद (आत्मत्राण-प्रकार, अनियमित) — corpus labels it मुक्त छंद [c10_hin_sp_cbse_22_005]
{
  const r = scanHindiVerse('ओ सरल सुंदर अभिजात\nसहज सरल सुंदर अभिजात\nओ सरल\nसहज');
  check('C4 अनियमित मुक्त पंक्तियाँ → इनकार', r.chhand === null, `got ${r.chhand}`);
}

// C6. रेणु "झाँकी" अंश — कॉर्पस इसे "चौपाई 16+16 (जगन्नाथी)" कहता है [c12_hin_ar_cbse_08_006],
// पर उद्धृत अंश की ईमानदार गिनती 18 है (कॉर्पस-लेबल अपने उद्धरण से मेल नहीं खाता) → इनकार
{
  const r = scanHindiVerse('पेड़ के नीचे खेलते बच्चे।');
  check('C6 झाँकी-अंश 18 मात्रा → इनकार (16±1 से बाहर)', r.chhand === null, `got ${r.chhand} matras=${r.lines.map(l => l.matras)}`);
  check('C6 इनकार निकटतम-हस्ताक्षर बताए', (r.declined_reason || '').includes('चौपाई'));
}

// C5. UNTAUGHT_CHHANDS सूची (कॉर्पस में नाम है, नियम नहीं)
check('C5 शार्दूलविक्रीड़ित untaught सूची में', UNTAUGHT_CHHANDS.some(c => c.name === 'शार्दूलविक्रीड़ित'));
check('C5 हरिगीतिका untaught सूची में', UNTAUGHT_CHHANDS.some(c => c.name === 'हरिगीतिका'));
check('C5 छप्पय untaught सूची में', UNTAUGHT_CHHANDS.some(c => c.name === 'छप्पय'));
check('C5 इनकार-पाठ में सिखाए गए छंदों की सूची', Object.keys(TAUGHT_CHHANDS).length === 7);

// ============================================================================
// D. ROBUSTNESS (no crash on junk / English / emoji / empty)
// ============================================================================

console.log('\n== D. robustness ==');

const junk = [
  '', '   ', '12345', '!!!',
  'The quick brown fox jumps over the lazy dog near the riverbank every morning.',
  '🎉🚀📚 हा हा 😂', 'abc राम 123 🎉', 'RAAM DHAAUN', '🙂',
];
for (const j of junk) {
  let ok = true, r = null;
  try { r = scanHindiVerse(j); } catch (e) { ok = false; }
  check(`D जंक सुरक्षित: ${JSON.stringify(j.slice(0, 24))}`, ok && r !== null && typeof r.chhand !== 'undefined');
}
{
  const r = scanHindiVerse('🎉🚀📚 हा हा 😂');
  check('D इमोजी-जंक → इनकार (कोई prosody नहीं)', r.chhand === null);
}
{
  let ok = true;
  try { matras(''); ganaPattern(''); guruLaghu(''); syllables(''); syllables(null); matras(undefined); ganaPattern(42); } catch { ok = false; }
  check('D खाली/null/गैर-स्ट्रिंग इनपुट क्रैश नहीं', ok);
  eq('D matras("") = 0', matras(''), 0);
}
{
  // determinism: same input twice → identical output
  const t = verses[4].text;
  eq('D निर्धारकता: दो बार स्कैन = समान परिणाम', JSON.stringify(scanHindiVerse(t)), JSON.stringify(scanHindiVerse(t)));
}

// ============================================================================

console.log(`\nपरिणाम: ${pass} पास, ${fail} फेल (कुल ${pass + fail})`);
if (fail) {
  console.log('\nविफलताएँ:');
  for (const f of failures) console.log('  ✗ ' + f);
  process.exit(1);
} else {
  console.log('सभी परीक्षण सफल।');
}
