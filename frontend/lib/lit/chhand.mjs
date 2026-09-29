/**
 * chhand.mjs — plain-JS twin of chhand.ts (byte-equivalent logic).
 * Deterministic Hindi chhand classifier over the corpus-taught set:
 * दोहा 13+11 | सोरठा/रोला 11+13 | चौपाई 16 | कुंडलिया 6×24 + वलय | सवैया (जगन्नाथ) 16 | कवित्त (मत्तगयन्द) 30.
 * Citations and decline list in chhand.ts / LIT_HINDI_ENGINE.md.
 */

import { matras, ganaPattern, guruLaghu, syllables } from './devanagari.mjs';

const TOL = 1;
const near = (m, target) => Math.abs(m - target) <= TOL;
const exact = (m, target) => m === target;

function isDevanagariText(text) {
  return Array.from(text).some(ch => {
    const cp = ch.codePointAt(0);
    return cp >= 0x0900 && cp <= 0x097f;
  });
}

function rawLines(verse) {
  return String(verse ?? '')
    .split(/[\n।॥]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && isDevanagariText(s));
}

function charans(raws) {
  const out = [];
  for (const r of raws) {
    for (const part of r.split(/[,;]+/)) {
      const p = part.trim();
      if (p.length > 0 && isDevanagariText(p)) out.push(p);
    }
  }
  return out;
}

function toLine(text) {
  return {
    text,
    matras: matras(text),
    ganas: ganaPattern(text),
    guruLaghu: guruLaghu(text),
    syllables: syllables(text),
  };
}

function clean(w) {
  return w.replace(/[।॥,.!?:;'"()\-]/g, '');
}

function ringRule(raws) {
  if (raws.length < 2) return false;
  const firstWords = raws[0].split(/[\s\-–—]+/).filter(Boolean);
  const head = firstWords.slice(0, 2).map(clean);
  const lastWords = raws[raws.length - 1].split(/[\s\-–—]+/).filter(Boolean);
  const tail = lastWords.slice(-2).map(clean);
  return head.some(h => h.length > 1 && tail.includes(h));
}

export const TAUGHT_CHHANDS = {
  doha: { name: 'दोहा', signature: '24 (13+11)', citations: ['c10_hin_sp_cbse_16_005', 'c10_hin_ks_cbse_01_005', 'c10_hin_ks_cbse_03_003'] },
  soratha: { name: 'सोरठा', signature: '24 (11+13)', citations: ['c10_hin_sp_cbse_16_005'] },
  rola: { name: 'रोला', signature: '24 (11+13)', citations: ['c10_hin_ks_cbse_01_005', 'c10_hin_ks_cbse_03_003'] },
  chaupai: { name: 'चौपाई', signature: '16 प्रति चरण', citations: ['c10_hin_ks_cbse_01_003', 'c10_hin_ks_cbse_01_011', 'c10_hin_sp_cbse_17_003'] },
  kundaliya: { name: 'कुंडलिया', signature: '6 पंक्तियाँ × 24, वलय-नियम', citations: ['c7_hin_cbse_06_001', 'c7_hin_cbse_06_003'] },
  savaiya: { name: 'सवैया (जगन्नाथ)', signature: '16 प्रति चरण', citations: ['c10_hin_ks_cbse_03_011'] },
  kavitt: { name: 'कवित्त (मत्तगयन्द)', signature: '30 प्रति चरण (7 गण + 2) / 16-मात्रा पद', citations: ['c10_hin_sp_cbse_18_005', 'c10_hin_ks_cbse_03_011', 'c11_hin_a_cbse_14_003'] },
};

export const UNTAUGHT_CHHANDS = [
  { name: 'शार्दूलविक्रीड़ित', where: 'c10_hin_ks_cbse_07_004 (नाममात्र उल्लेख, नियम नहीं)' },
  { name: 'मालिनी', where: 'c10_hin_ks_cbse_07_004 (नाममात्र उल्लेख, नियम नहीं)' },
  { name: 'छप्पय', where: 'c10_hin_ks_cbse_07_004 / c10_hin_ks_cbse_12_003 (नाममात्र)' },
  { name: 'हरिगीतिका', where: 'c10_hin_sp_cbse_22_005 (scope सूची में नाम, नियम नहीं)' },
  { name: 'मुक्त छंद', where: 'c10_hin_sp_cbse_22_005 — "आत्मत्राण मुक्त छंद" — निश्चित मात्रा-रहित, classify-योग्य नहीं' },
];

function totalMatrasRawEvery(raws, pred) {
  return raws.every(r => pred(matras(r)));
}

function matraTableNotes(cm) {
  return cm.map((l, i) => `मात्रा-तालिका चरण ${i + 1}: "${l.text}" = ${l.matras} मात्रा [${l.guruLaghu}] गण: ${l.ganas}`);
}

function sixteenFamily(cm, conf, extra) {
  return {
    chhand: 'चौपाई',
    confidence: Math.max(0, Math.min(1, conf)),
    lines: cm,
    aliases: ['सवैया (जगन्नाथ)', 'कवित्त (मत्तगयन्द) 16-मात्रा पद'],
    notes: [
      '16-मात्रा परिवार: चौपाई (c10_hin_ks_cbse_01_003) / सवैया-जगन्नाथ (c10_hin_ks_cbse_03_011) / कवित्त-मत्तगयन्द पद (c11_hin_a_cbse_14_003) — तीनों का कॉर्पस-हस्ताक्षर 16 मात्रा है; भेद गण-क्रम से होता है जो इस पंक्ति-समूह में निर्णायक नहीं।',
      ...extra,
      ...matraTableNotes(cm),
    ],
    citations: [...TAUGHT_CHHANDS.chaupai.citations, 'c10_hin_ks_cbse_03_011', 'c11_hin_a_cbse_14_003'],
  };
}

function kavitt30(cm, conf) {
  return {
    chhand: 'कवित्त (मत्तगयन्द)',
    confidence: conf,
    lines: cm,
    aliases: [],
    notes: [
      'मत्तगयन्द: प्रत्येक चरण 30 मात्रा = 7 गण (4-4 मात्रा) + 2 मात्रा — c10_hin_sp_cbse_18_005।',
      ...matraTableNotes(cm),
    ],
    citations: TAUGHT_CHHANDS.kavitt.citations,
  };
}

function dohaSorathaCharan(cm) {
  const l = cm[0];
  const syl = l.syllables;
  let best13 = null, best11 = null;
  let cum = 0;
  for (let i = 0; i < syl.length; i++) {
    cum += syl[i].matras;
    const d13 = Math.abs(cum - 13);
    const d11 = Math.abs(cum - 11);
    if (!best13 || d13 < best13.diff) best13 = { pos: cum, diff: d13 };
    if (!best11 || d11 < best11.diff) best11 = { pos: cum, diff: d11 };
  }
  if (best13 && best13.diff <= TOL) {
    return {
      chhand: 'दोहा',
      confidence: best13.diff === 0 ? 0.6 : 0.5,
      lines: cm,
      aliases: [],
      notes: [
        `एकल 24-मात्रा चरण — आंतरिक विभाजन ${best13.pos}वीं मात्रा पर (13±1) → दोहा-चरण प्रतिमान। पूर्ण दोहा (2 चरण) पूरा देकर ही उच्च विश्वास मिलेगा।`,
        matraTableNotes(cm)[0],
      ],
      citations: TAUGHT_CHHANDS.doha.citations,
    };
  }
  if (best11 && best11.diff <= TOL) {
    return {
      chhand: 'सोरठा',
      confidence: best11.diff === 0 ? 0.55 : 0.45,
      lines: cm,
      aliases: ['रोला'],
      notes: [
        `एकल 24-मात्रा चरण — आंतरिक विभाजन ${best11.pos}वीं मात्रा पर (11±1) → सोरठा/रोला-चरण प्रतिमान।`,
        matraTableNotes(cm)[0],
      ],
      citations: [...TAUGHT_CHHANDS.soratha.citations, ...TAUGHT_CHHANDS.rola.citations],
    };
  }
  return declineResult(cm, nearestMiss([l.matras], 'एकल चरण'), matraTableNotes(cm));
}

function nearestMiss(ms, ctx) {
  const targets = [
    ['दोहा 13+11=24', [13, 24]],
    ['सोरठा/रोला 11+13=24', [11, 24]],
    ['चौपाई/सवैया 16', [16]],
    ['कवित्त-मत्तगयन्द 30', [30]],
    ['कुंडलिया 6×24', [24]],
  ];
  const parts = ms.map(m => {
    let bestName = '', bestD = 99;
    for (const [name, ts] of targets) {
      for (const t of ts) {
        const d = Math.abs(m - t);
        if (d < bestD) { bestD = d; bestName = name; }
      }
    }
    return `${m} मात्रा (निकटतम: ${bestName}, अंतर ${bestD})`;
  });
  const taught = Object.values(TAUGHT_CHHANDS).map(c => c.name).join(', ');
  return `यह पद्य किसी सिखाए गए छंद के मात्रा-हस्ताक्षर से मेल नहीं खाता${ctx ? ` (${ctx})` : ''}: ${parts.join('; ')}। कॉर्पस जो सिखाता है: ${taught}। बाकी छंद (शार्दूलविक्रीड़ित, मालिनी, छप्पय, हरिगीतिका आदि) कॉर्पस में नियम-सहित नहीं — इनकार।`;
}

function declineResult(cm, reason, notes = []) {
  return {
    chhand: null,
    confidence: 0,
    lines: cm,
    declined_reason: reason,
    notes,
    citations: [],
  };
}

export function scanHindiVerse(verse) {
  const raws = rawLines(verse);
  const lines = raws.map(toLine);
  const charansList = charans(raws);
  const cm = charansList.map(toLine);

  const decline = (reason, notes = []) => declineResult(cm.length ? cm : lines, reason, notes);

  if (!cm.length || cm.every(l => l.matras < 3)) {
    return decline(
      'गणना-योग्य देवनागरी पद्य-पंक्तियाँ नहीं मिलीं (जंक/गैर-देवनागरी/खाली इनपुट)।',
      ['R0: पंक्ति में ≥3 मात्रा होना prosody स्कैन की न्यूनतम शर्त है।']
    );
  }

  const totalMatras = cm.map(l => l.matras);
  const all = (pred) => totalMatras.every(pred);

  // 1. कुंडलिया
  if (raws.length === 6 && totalMatrasRawEvery(raws, m => near(m, 24))) {
    const ring = ringRule(raws);
    if (ring) {
      return {
        chhand: 'कुंडलिया',
        confidence: 0.9,
        lines,
        aliases: [],
        notes: [
          'नियम-1 (c7_hin_cbse_06_003): 6 पंक्तियाँ, तीन जोड़ियाँ — दोहा + रोला + दोहा क्रम।',
          'नियम-2 वलय: पहला/दूसरा शब्द = अंतिम शब्द — पाया गया।',
          'नियम-4 बराबर-समय लय: प्रत्येक पंक्ति 24 मात्रा (±1 परंपरा-सहन)।',
          ...matraTableNotes(lines),
        ],
        citations: TAUGHT_CHHANDS.kundaliya.citations,
      };
    }
    if (totalMatrasRawEvery(raws, m => exact(m, 24))) {
      return {
        chhand: 'कुंडलिया',
        confidence: 0.75,
        lines,
        aliases: [],
        notes: [
          'नियम-1 (c7_hin_cbse_06_003): 6 पंक्तियाँ × 24 मात्रा — संरचना पूरी मिली।',
          'वलय-नियम (पहला/दूसरा शब्द = अंतिम शब्द) इस पाठ में नहीं मिला — निम्न विश्वास।',
          ...matraTableNotes(lines),
        ],
        citations: TAUGHT_CHHANDS.kundaliya.citations,
      };
    }
  }

  const n = cm.length;

  // 2. single चरण
  if (n === 1) {
    const m = totalMatras[0];
    if (exact(m, 16)) return sixteenFamily(cm, 0.55, ['एकल 16-मात्रा चरण — पूर्ण चौपाई (4 चरण) नहीं, चरण-स्तर की पहचान।']);
    if (near(m, 16)) return sixteenFamily(cm, 0.45, [`16±1 मात्रा (गिनती ${m}) — परंपरा-सहन ±1 (c10_hin_ks_cbse_01_005)।`]);
    if (near(m, 30)) return kavitt30(cm, 0.6);
    if (near(m, 24)) return dohaSorathaCharan(cm);
    return decline(nearestMiss(totalMatras, 'एकल चरण'), matraTableNotes(cm));
  }

  // 3. चौपाई / 16-परिवार
  if (all(m => near(m, 16))) {
    const conf = n >= 4 ? 0.85 : n >= 2 ? 0.7 : 0.55;
    const exactAll = totalMatras.every(m => exact(m, 16));
    return sixteenFamily(cm, exactAll ? conf : conf - 0.1, [
      `${n} चरण, सभी 16 मात्रा (±1) — c10_hin_ks_cbse_01_003: "प्रत्येक चरण 16 मात्रा, चार चरण = चौपाई"।`,
    ]);
  }

  // 4. कवित्त मत्तगयन्द 30
  if (all(m => near(m, 30))) {
    return kavitt30(cm, totalMatras.every(m => exact(m, 30)) ? 0.8 : 0.7);
  }

  // 5. दोहा / सोरठा पायर
  if (n % 2 === 0) {
    let dohaOK = true, dohaExact = true, sorOK = true, sorExact = true;
    for (let i = 0; i < n; i += 2) {
      const a = totalMatras[i], b = totalMatras[i + 1];
      if (!(near(a, 13) && near(b, 11))) dohaOK = false;
      else if (!(exact(a, 13) && exact(b, 11))) dohaExact = false;
      if (!(near(a, 11) && near(b, 13))) sorOK = false;
      else if (!(exact(a, 11) && exact(b, 13))) sorExact = false;
    }
    if (dohaOK) {
      return {
        chhand: 'दोहा',
        confidence: dohaExact ? 0.9 : 0.72,
        lines: cm,
        aliases: [],
        notes: [
          dohaExact
            ? 'प्रत्येक दोहा-युग्म 13+11 = 24 मात्रा, यति 13वीं मात्रा पर — c10_hin_sp_cbse_16_005: "दोहा छंद विधान: प्रति चरण 24 = 13 + 11"।'
            : '13+11 (±1 परंपरा-सहन) — c10_hin_ks_cbse_01_005 स्वयं ±1 परंपरा-भिन्नता दर्शाता है।',
          ...matraTableNotes(cm),
        ],
        citations: TAUGHT_CHHANDS.doha.citations,
      };
    }
    if (sorOK) {
      return {
        chhand: 'सोरठा',
        confidence: sorExact ? 0.9 : 0.72,
        lines: cm,
        aliases: ['रोला'],
        notes: [
          sorExact
            ? 'पहला चरण 11, दूसरा 13 मात्रा (दोहे का विलोम क्रम) — c10_hin_sp_cbse_16_005: "सोरठा में पहला चरण 11, दूसरा 13 (उल्टा क्रम)"।'
            : '11+13 (±1 परंपरा-सहन)।',
          'एक ही 11+13 हस्ताक्षर रोला छंद का भी है (c10_hin_ks_cbse_01_005 WE3) — गण-क्रम देखें: alias रोला।',
          ...matraTableNotes(cm),
        ],
        citations: [...TAUGHT_CHHANDS.soratha.citations, ...TAUGHT_CHHANDS.rola.citations],
      };
    }
  }

  // 6. मिश्रित 16/24
  const has16 = totalMatras.some(m => near(m, 16));
  const has24 = totalMatras.some(m => near(m, 24));
  if (has16 && has24 && totalMatras.every(m => near(m, 16) || near(m, 24))) {
    return decline(
      'मिश्रित हस्ताक्षर (16 और 24 मात्रा चरण) — यह "चौपाई+दोहा मिश्र" प्रतिमान c10_hin_sp_cbse_17_003 में रैदास-पद के लिए नाम-मात्र बताया गया है, नियमबद्ध पहचान कॉर्पस में नहीं; अतः छंद-नाम देने से इनकार।',
      matraTableNotes(cm).concat(['तुलना: c10_hin_ks_cbse_01_005 सूरदास-पंक्तियों को भी "मानक दोहा/रोला से भिन्न → मात्रिक लोक-छंद" कहता है।'])
    );
  }

  // 7. unmatched
  return decline(nearestMiss(totalMatras, ''), matraTableNotes(cm));
}
