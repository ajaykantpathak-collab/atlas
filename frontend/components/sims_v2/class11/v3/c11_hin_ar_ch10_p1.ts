import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch10_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch10_p1',
    title: 'पाठ 10 · Part 1/3',
    subtitle: 'Read a devotional poem as a plot of the soul, not a description of love.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 10 · Part 1/3',
    chapters: ['c11_hin_ar_ch10'],
    nodeIds: ['c11_hin_ar_cbse_10_001', 'c11_hin_ar_cbse_10_002', 'c11_hin_ar_cbse_10_003', 'c11_hin_ar_cbse_10_004', 'c11_hin_ar_cbse_10_005', 'c11_hin_ar_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sakhi listening to Meera narrate her undoing', intro: 'Eyes rolling in trance, love-fever, body wasting, ornaments off — a whole renunciation compressed into a few stanzas.', goal: 'Analyse the poem\'s internal narrative progression from devotion to total renunciation.' },
    discovery: {
        question: '\'Nothing happens in Meera\'s poem — she just says she loves Krishna.\' Is that a fair critique?',
        options: ['No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union', 'Yes — a poem needs visible action to have a plot', 'Yes — devotion is a state, not a story', 'No — because she physically dances in stanza two'],
        answer: 'No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union',
        hook: 'Bhakti verse plots the soul\'s trajectory, not the body\'s — \'discarding jewellery\' is the poem\'s rising action, abandonment is its climax.',
    },
    teaching: [
        { title: 'पाठ 10 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश (पृष्ठभूमि)** तथा **लेखक के जीवन-दर्शन, लेखन-शैली एवं साहित्यिक योगदान (रचनाकार परिचय)** का वह आधारभूत.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['पाठ 10 — पृष्ठभूमि', 'पाठ 10 — कथानक', 'पाठ 10 — पाठ्य-परिवेश', 'पाठ 10 — पात्र-चित्रण', 'पाठ 10 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 1/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि.', answer: '10 -', options: ['10 -', '10 -'] },
            { id: 's2', label: '10 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and.', answer: '10 -', options: ['10 -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry-analysis session, a student presents Meera\'s bhajan and concludes: \'Nothing happens — Meera just describes her feelings. No events, no plot, so there\'s no structure to analyse.\'',
            decisions: [{ prompt: 'How do you show the poem\'s narrative architecture?', options: [
                { text: 'Trace the soul\'s trajectory: the bhakti \'plot\' is internal progression — stanza 1 establishes the mind fixed on Giridhar, stanza 2 shows the enacted consequences (body wasting, ornaments discarded — a real social rupture, not description), stanza 3 climaxes in the direct plea to stop worldly questioning. Each stanza escalates the renunciation — structure as spiritual arc from devotion to surrender.', outcome: 'The poem gains its plot: discarding ornaments isn\'t imagery but an enacted climax — bhakti narrative maps the devotee\'s journey, not external events.' },
                { text: 'Concede the point — lyric poems express emotion, they don\'t tell stories, so skip structure.', outcome: 'Lyric isn\'t structureless: emotional escalation with deliberate ordering is a narrative arc — \'no events\' confuses external action with inner plot.', reveals: 'lyric-has-no-plot' },
                { text: 'Invent a plot instead — narrate Meera\'s biography (marriage, leaving the palace) as the poem\'s storyline.', outcome: 'That\'s biography, not this text\'s structure: the poem compresses a whole renunciation into inner beats; importing her life story replaces analysis with anecdote.', reveals: 'biography-is-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'The stanza that wastes the body and drops the ornaments *is* the plot — renunciation told as a sequence of irreversible acts.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक.',
          hint: 'यदि अटका हुआ महसूस हो: **NCERT पाठ्यपुस्तक के \'रचनाकार परिचय\' बॉक्स** को दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **\'इतिहास की तारीखें/घटनाएँ रटना\'** है और \'रचनाकार परिचय\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा लेखक किसी पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो: **NCERT पाठ्यपुस्तक के \'रचनाकार परिचय\' बॉक्स** को दोबारा पढ़ें, फिर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **\'इतिहास की तारीखें/घटनाएँ रटना\'** है और \'रचनाकार परिचय\' का अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**\'क्यों\' का खेल खेलें:** छात्र से पूछें — "लेखक ने *यह* शब्द *यहाँ* क्यों चुना?', '*यह* प्रसंग *यही* क्यों लिखा?" हर उत्तर के बाद पूछें: "यह लेखक की *कौन-सी* विशेषता दिखाता है?" → इससे **तथ्य →.', '**\'तुलना-तालिका\' बनवाएँ:** दो कॉलम — **\'सामान्य परिचय\'** (जन्म, पुस्तकें) vs **\'कार्यात्मक परिचय\'** (इस पाठ में दिखी.', '**\'एक वाक्य चुनौती\':** "पाठ 10 की पृष्ठभूमि और रचनाकार को मिलाकर **एक वाक्य में** बताओ कि पाठ का केंद्रीय द्वंद्व क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम.',
          hint: 'यदि अटके: **Freytag\'s Pyramid का हिंदी आरेख** बनाकर दीवार पर लगाएँ; प्रत्येक सोपान के लिए.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"कथानक का विश्लेषण = घटनाओं को क्रम से लिखना"** और **"आख्यान-संरचना का विश्लेषण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि',
                  options: ['कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा लेखक किसी पात्र के'],
                  hint: 'यदि अटके: **Freytag\'s Pyramid का हिंदी आरेख** बनाकर दीवार पर लगाएँ; प्रत्येक सोपान के लिए एक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"कथानक का विश्लेषण = घटनाओं को क्रम से लिखना"** और **"आख्यान-संरचना का विश्लेषण = फ्लैशबैक.' }
          ],
            remediations: { '10': { steps: ['**माइक्रो-टास्क:** एक परिचित लघुकथा (जैसे \'बूढ़ी काकी\' या \'ईदगाह\') लें; छात्र से कहें: *"केवल 5 वाक्यों में कथानक लिखो.', 'क्या फ्लैशबैक से शुरू कर सकता था?', 'तब क्या प्रभाव बदलता?"* 2.', '**दृश्यीकरण:** Freytag\'s Pyramid का खाली आरेख दें; छात्र स्वयं घटनाएँ रखें — फिर चर्चा करें कि **चरमोत्कर्ष कहाँ है और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social.',
          hint: 'यदि अटके: **node 002 (कथानक संरचना)** के \'चरम बिंदु (climax)\' अनुभाग को दोहराएँ — पूछें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "परिवेश वर्णन लेखक का **सौंदर्यबोध (aesthetic indulgence)** मात्र है — कहानी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and',
                  options: ['पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा लेखक किसी पात्र के'],
                  hint: 'यदि अटके: **node 002 (कथानक संरचना)** के \'चरम बिंदु (climax)\' अनुभाग को दोहराएँ — पूछें: "इस चरम.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "परिवेश वर्णन लेखक का **सौंदर्यबोध (aesthetic indulgence)** मात्र है — कहानी आगे बढ़ाने के लिए.' }
          ],
            remediations: { 'aesthetic-indulgence-10': { steps: ['**चरण 1 (दृश्यमान बनाएँ):** छात्र से कहें: "पाठ के 3 वर्णनात्मक पैराग्राफ चुनें। प्रत्येक में **लाल पेन से संज्ञाएँ**.', '**चरण 2 (कारण-कार्य जोड़ें):** प्रत्येक हरे विशेषण के आगे पूछें: "यह नायक को **क्या करने को मजबूर/प्रेरित** करता है?".', '**चरण 3 (प्रतिस्थापन परीक्षण):** "यदि यह विशेषण हटा दें, तो नायक का निर्णय बदलेगा?" — हाँ = वातावरण सक्रिय; नहीं.', '**चरण 4 (लेखन अभ्यास):** उपरोक्त विश्लेषण को एक PEEL अनुच्छेद में बदलें: **P**oint (वातावरण का दावा), **E**vidence (3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा लेखक.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_10_002 (कथानक संरचना) के \'मोड़ पहचानना\' (Identifying Turning.',
          misconception: 'छात्र अक्सर नायक के \'चरित्र-चित्रण\' (Character Sketch) को एक स्थैतिक सूची (Static List: नाम, उम्र, गुण, दोष) मानकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा लेखक किसी पात्र के',
                  options: ['पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसके द्वारा लेखक किसी पात्र के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_10_002 (कथानक संरचना) के \'मोड़ पहचानना\' (Identifying Turning Points).',
                  misconception: 'छात्र अक्सर नायक के \'चरित्र-चित्रण\' (Character Sketch) को एक स्थैतिक सूची (Static List: नाम, उम्र, गुण, दोष) मानकर लिखते हैं, जबकि वरिष्ठ.' }
          ],
            remediations: { 'character-sketch-static-list': { steps: ['चरण 1: छात्र से कहें: "नायक के तीन विशेषण लिखो जो पाठ से सीधे न आए हों (लेखक ने न लिखे हों)।" — यह \'अनुमान\' (Inference).', 'यदि नहीं बदला, तो क्यों?" — यह \'चरित्र चाप\' (Character Arc) की अवधारणा जोड़ता है। चरण 4: अंत में, एक पैराग्राफ लिखने को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे गौण पात्र होते हैं जो नायक/प्रमुख पात्र.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_ar_cbse_10_004** के \'चरित्र-परिवर्तन (character arc).',
          misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों को **\'कथानक के गवाह\' (witnesses to plot)** मान लेते हैं — अर्थात वे मानते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे गौण पात्र होते हैं जो नायक/प्रमुख पात्र के साथ',
                  options: ['सहायक पात्र (Supporting Characters) वे गौण पात्र होते हैं जो नायक/प्रमुख पात्र के साथ', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_ar_cbse_10_004** के \'चरित्र-परिवर्तन (character arc) के 3 चरण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों को **\'कथानक के गवाह\' (witnesses to plot)** मान लेते हैं — अर्थात वे मानते हैं कि सहायक पात्र केवल.' }
          ],
            remediations: { 'witnesses-to-plot-emotional-support': { steps: ['**चरण 1 — \'कौन\' से \'क्या करता है\' पर शिफ्ट करें:** छात्र से कहें — "पात्र का नाम न लिखें, उसका *काम* (function) लिखें.', 'क्या *दिखाता* है?" — इसे \'फंक्शन ऑडिट\' (function audit) कहें। **चरण 2 — \'हटाओ और देखो\' टेस्ट (Removal Test):** प्रत्येक.', 'नायक का अंतिम निर्णय वही रहता या बदलता?" — यदि "वही रहता", तो पात्र सजावटी है; यदि "बदलता", तो कथात्मक है। **चरण 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_006', difficulty: 'standard',
          question: '**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या भाव है जो पूरी.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_10_004 (नायक पात्र-चित्रण)** और **c11_hin_ar_cbse_10_005.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **मुख्य विषय को "एक शब्द" (जैसे "संघर्ष", "गरिमा", "गरीबी") में लिखकर समझ लेते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या भाव है जो पूरी रचना को',
                  options: ['**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार या भाव है जो पूरी रचना को', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_10_004 (नायक पात्र-चित्रण)** और **c11_hin_ar_cbse_10_005 (सहायक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **मुख्य विषय को "एक शब्द" (जैसे "संघर्ष", "गरिमा", "गरीबी") में लिखकर समझ लेते हैं कि विषय पूरा हो गया**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पाठ के **अंतिम तीन पैराग्राफ** पढ़ो और प्रत्येक के बाद पूछो — \'लेखक यहाँ क्या *कहना* चाह रहा है, न कि.', 'उन उत्तरों को एक कागज़ पर **बुलेट पॉइंट** में लिखवाओ। 3.', 'अब कहो: "इन बिंदुओं को जोड़कर **एक ऐसा वाक्य बनाओ जिसमें \'क्योंकि\', \'इसलिए\', \'भले ही\' जैसे संबंध-सूचक शब्द हों।" 4.', 'वही वाक्य **मुख्य विषय (thematic statement)** होगा — इसे "एक शब्द" से तुलना कराकर भेद स्पष्ट करो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
