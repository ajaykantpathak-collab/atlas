import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch05_p2: SimDef = {
    id: 'v3_c8_hin_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'This node covers identification, textual tracing, and analytical explanation.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c8_hin_ch05'],
    nodeIds: ['c8_hin_cbse_05_007', 'c8_hin_cbse_05_008', 'c8_hin_cbse_05_009', 'c8_hin_cbse_05_010', 'c8_hin_cbse_05_011', 'c8_hin_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'Think about your favorite movie — you remember the main plot, but what stays with you are the *side stories*.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: 'गौण विषय (sub-themes) are secondary ideas or motifs in a literary text that run alongside the मुख्य विषय (main theme), supporting, contrasting, or complicating it to add layers of meaning, realism.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 2/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा पाठ के उद्देश्य, पात्र, परिवेश और भाव के.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता है.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_007', difficulty: 'standard',
          question: 'गौण विषय (sub-themes) are secondary ideas or motifs in a literary text that run.',
          hint: 'If stuck, review \'evidence chaining\' (साक्ष्य-श्रृंखला) from c7_hin_cbse_03_007 — the.',
          misconception: 'Students treat sub-themes as a *list of topics* mentioned in the text (e.g., "poverty, love, fear") rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (sub-themes) are secondary ideas or motifs in a literary text that run alongside',
                  options: ['गौण विषय (sub-themes) are secondary ideas or motifs in a literary text that run alongside', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'If stuck, review \'evidence chaining\' (साक्ष्य-श्रृंखला) from c7_hin_cbse_03_007 — the skill.',
                  misconception: 'Students treat sub-themes as a *list of topics* mentioned in the text (e.g., "poverty, love, fear") rather than as *recurring patterns.' }
          ],
            remediations: { 'students-treat-sub-themes-as': { steps: ['**Re-read with a lens:** Give the student a specific sub-theme label (e.g., "silent sacrifice") and ask them to find.', '**Cluster & count:** Have them group highlights: do they have 3+ moments?', 'If not, it\'s not a developed sub-theme.', '**Connect the dots:** For each cluster, ask: "If this cluster were removed, how would the main theme feel different?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_008', difficulty: 'standard',
          question: 'बिंब (Imagery) शब्दों के माध्यम से पाठक की पाँचों इंद्रियों (दृश्य, श्रवण.',
          hint: 'यदि अटका हुआ लगे तो **कक्षा 7 पाठ 5 (c7_hin_cbse_05_008)** के "बिंब-प्रकार पहचान चार्ट".',
          misconception: 'छात्र अक्सर **हर तुलनात्मक वाक्य को रूपक मान लेते हैं** — विशेषकर जब उपमान स्पष्ट हो (जैसे "वह शेर है")। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) शब्दों के माध्यम से पाठक की पाँचों इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श,',
                  options: ['बिंब (Imagery) शब्दों के माध्यम से पाठक की पाँचों इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि अटका हुआ लगे तो **कक्षा 7 पाठ 5 (c7_hin_cbse_05_008)** के "बिंब-प्रकार पहचान चार्ट" और.',
                  misconception: 'छात्र अक्सर **हर तुलनात्मक वाक्य को रूपक मान लेते हैं** — विशेषकर जब उपमान स्पष्ट हो (जैसे "वह शेर है")। वे "जैसा/सा/वत" शब्दों की.' }
          ],
            remediations: { 'check-step': { steps: ['**रंग-कोडिंग ड्रिल:** छात्र को 5 वाक्य दो — प्रत्येक में एक बिंब + एक तुलना (उपमा/रूपक) हो। उसे दो रंगों से चिह्नित.', '**रूपक-परिवर्तन अभ्यास:** 5 उपमा वाक्य दो (जैसे "वह चीते जैसा तेज़ दौड़ा") — छात्र को प्रत्येक को रूपक में बदलना है.', '**बिंब-विस्तार:** एक साधारण वाक्य दो ("बारिश हुई") — छात्र को 5 इंद्रियों पर 5 अलग वाक्य लिखने हैं। फिर चर्चा करो.', '**साप्ताहिक "बिंब-डायरी":** रोज़ एक दृश्य/अनुभव पर 3 पंक्तियाँ — 2 बिंब, 1 रूपक। 2 सप्ताह में स्वचालित पहचान बनेगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_009', difficulty: 'standard',
          question: '**विरोधाभास** वह साहित्यिक युक्ति है जहाँ दो विरोधी बातें एक साथ रखी जाती हैं.',
          hint: 'यदि अटके तो c8_hin_cbse_05_008 (बिंब और रूपक) के कार्यप्रणाली (worked examples) दोहराएँ.',
          misconception: 'छात्र अक्सर **विरोधाभास को "विरोधाभासी कथन" (contradiction) मान लेते हैं** — यानी लेखक की भूल या तर्क-दोष समझते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** वह साहित्यिक युक्ति है जहाँ दो विरोधी बातें एक साथ रखी जाती हैं ताकि एक',
                  options: ['**विरोधाभास** वह साहित्यिक युक्ति है जहाँ दो विरोधी बातें एक साथ रखी जाती हैं ताकि एक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि अटके तो c8_hin_cbse_05_008 (बिंब और रूपक) के कार्यप्रणाली (worked examples) दोहराएँ — वही चरण.',
                  misconception: 'छात्र अक्सर **विरोधाभास को "विरोधाभासी कथन" (contradiction) मान लेते हैं** — यानी लेखक की भूल या तर्क-दोष समझते हैं, जबकि साहित्य में.' }
          ],
            remediations: { 'contradiction': { steps: ['छात्र को पाठ का वह अंश दोबारा पढ़वाओ जहाँ विरोधाभास/प्रतीक आए हैं और पूछो: "यहाँ लेखक सीधे-सीधे क्यों नहीं कह देता?', 'उसने यह उल्टी बात/यह वस्तु क्यों चुनी?" — इससे सायासता (deliberate choice) समझ आएगी। 2.', 'दो कॉलम बनवाओ: बायाँ — शाब्दिक अर्थ, दायाँ — गहरा अर्थ। हर विरोधाभास/प्रतीक के लिए भरवाओ। 3.', 'एक दैनिक जीवन का उदाहरण दो: "माँ कहती है \'चुप रहो\' पर उसकी चुप्पी चीख रही होती है" — यह विरोधाभास है, गलती नहीं। "माँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_010', difficulty: 'standard',
          question: '\'पदावली: मुख्य शब्द\' (Key Vocabulary/Glossary) refers to the curated list.',
          hint: 'If stuck, review **\'शब्दार्थ vs भावार्थ\' (Denotation vs Connotation)** from Class 7.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो **पाठ के अंत में दिए गए \'कठिन शब्दार्थ\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पदावली: मुख्य शब्द\' (Key Vocabulary/Glossary) refers to the curated list of semantically',
                  options: ['\'पदावली: मुख्य शब्द\' (Key Vocabulary/Glossary) refers to the curated list of semantically', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'If stuck, review **\'शब्दार्थ vs भावार्थ\' (Denotation vs Connotation)** from Class 7 Poetry.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो **पाठ के अंत में दिए गए \'कठिन शब्दार्थ\' (Glossary/Difficult Word Meanings).' }
          ],
            remediations: { 'glossary-difficult-word-meanings-6': { steps: ['**पुनर्निर्देशन (Redirect):** छात्र से कहें: "पाठ बंद करें। उस दृश्य को याद करें जो आपको सबसे अधिक याद रहा। उस दृश्य को.', '**तुलनात्मक विश्लेषण (Comparative Analysis):** उस दृश्य के लिए छात्र द्वारा चुने गए शब्द के 2 पर्यायवाची दें। पूछें.', '**शब्द-मानचित्रण (Word Mapping):** चुने गए शब्द को केंद्र में रखकर एक माइंड-मैप बनवाएं: शब्दकोश अर्थ -> प्रसंगिक अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा पाठ के उद्देश्य, पात्र, परिवेश.',
          hint: 'यदि अटके तो **कक्षा 7 व्याकरण: क्रिया के रूप और वाच्य** (c7_hin_cbse_05_011 के अभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पाठ में भाषा-प्रयोग\' का अर्थ है **\'त्रुटिहीन व्याकरण\' पहचानना** या **\'अलंकार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि अटके तो **कक्षा 7 व्याकरण: क्रिया के रूप और वाच्य** (c7_hin_cbse_05_011 के अभ्यास भाग) को.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पाठ में भाषा-प्रयोग\' का अर्थ है **\'त्रुटिहीन व्याकरण\' पहचानना** या **\'अलंकार ढूँढना\'**। **गलत तर्क:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मिनी-लेसन (5 मिनट):** पाठ 5 के दो वाक्य लो: (क) "दरवाज़ा खुला।" (ख) "किसी ने दरवाज़ा खोला।" पूछो — "दोनों में तथ्य.', '**रंग-कोडिंग:** छात्र को तीन रंग दें — लाल (कर्तृवाच्य), नीला (कर्मवाच्य), हरा (भाववाच्य)। पाठ के एक पृष्ठ पर क्रियाओं.', '**लेखक की कुर्सी:** छात्र से कहो — "तुम इस दृश्य के लेखक हो। तुम चाहते हो पाठक डरे। कौन सा वाच्य चुनोगे?', 'क्यों?" → इससे **चुनाव (agency)** स्पष्ट होगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता.',
          hint: 'यदि फंसें तो **कक्षा 7 के बोध-प्रश्न अभ्यास (c7_hin_cbse_05_012)** के \'कारण-प्रभाव\' वाले.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों के उत्तर "पाठ के बाहर" (Outside the text) होते हैं**। इसलिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता है',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता है', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि फंसें तो **कक्षा 7 के बोध-प्रश्न अभ्यास (c7_hin_cbse_05_012)** के \'कारण-प्रभाव\' वाले प्रश्नों.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों के उत्तर "पाठ के बाहर" (Outside the text) होते हैं**। इसलिए वे या तो उत्तर छोड़.' }
          ],
            remediations: { 'outside-the-text-general-knowledge': { steps: ['**चरण 1: स्पष्टीकरण (Clarify):** छात्र को दो वाक्य दें — "आकाश काला है" (वस्तुनिष्ठ) और "बारिश होगी" (आशय-सूचक)। पूछें.', 'यदि नहीं, तो तुमने यह आधार कहाँ से लिया?" इससे **पाठ-आधारितता (Text-dependency)** की आदत पड़ेगी। **चरण 4: स्वतंत्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
