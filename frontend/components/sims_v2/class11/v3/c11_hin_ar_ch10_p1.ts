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
        { title: 'पाठ 10 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['पाठ 10 — पृष्ठभूमि', 'पाठ 10 — कथानक', 'पाठ 10 — पाठ्य-परिवेश', 'पाठ 10 — पात्र-चित्रण', 'पाठ 10 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_001', title: 'पाठ 10 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 10 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who was Kabir, and what was his primary profession according to the textbook introduction?', options: [
                { text: 'Kabir (c', outcome: 'Kabir (c. 1498–1546) was a prominent saint-poet of the Nirguna Bhakti tradition whose primary.' },
                { text: 'he was a king', outcome: 'Not quite — Students treat "Context and Background" as a list of static facts (dates, birthplace, book names).', reveals: 'students-treat-context-and-background' },
                { text: 'he wrote in Sanskrit', outcome: 'Not quite — Students treat "Context and Background" as a list of static facts (dates, birthplace, book names).', reveals: 'students-treat-context-and-background' }
            ] }] } },
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
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck on "Nirguna vs Saguna" or "Bhakti vs Sufi," review Class 10 History Chapter.',
          misconception: 'Students treat "Context and Background" as a list of static facts (dates, birthplace, book names) to memorize for.',
          parts: [
                { id: 'a', prompt: 'Who was Kabir, and what was his primary profession according to the textbook introduction?', answer: 'Kabir (c',
                  options: ['Kabir (c', 'he was a king', 'he wrote in Sanskrit'],
                  hint: 'If stuck on "Nirguna vs Saguna" or "Bhakti vs Sufi," review Class 10 History Chapter "Bhakti-Sufi.',
                  misconception: 'Students treat "Context and Background" as a list of static facts (dates, birthplace, book names) to memorize for 1-mark questions.' }
          ],
            remediations: { 'students-treat-context-and-background': { steps: ['**Re-read the introduction as a "user manual" for the poem:** Annotate every biographical detail with a marginal.', '**Build a "Context-to-Text" prediction table:** Column A: Context Fact (e.g., "rejected Vedas/Quran authority").', 'Column B: Predicted Poetic Evidence (e.g., "verses mocking pandit/mullah").', '**Verify predictions while reading the poem (Node 002):** Tick off predictions that appear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_002', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ.',
          hint: 'यदि अटके: **Freytag\'s Pyramid का हिंदी आरेख** बनाकर दीवार पर लगाएँ; प्रत्येक सोपान के लिए.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"कथानक का विश्लेषण = घटनाओं को क्रम से लिखना"** और **"आख्यान-संरचना का विश्लेषण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,',
                  options: ['\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-1 — पाठ 10\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके: **Freytag\'s Pyramid का हिंदी आरेख** बनाकर दीवार पर लगाएँ; प्रत्येक सोपान के लिए एक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"कथानक का विश्लेषण = घटनाओं को क्रम से लिखना"** और **"आख्यान-संरचना का विश्लेषण = फ्लैशबैक.' }
          ],
            remediations: { '10': { steps: ['**माइक्रो-टास्क:** एक परिचित लघुकथा (जैसे \'बूढ़ी काकी\' या \'ईदगाह\') लें; छात्र से कहें: *"केवल 5 वाक्यों में कथानक लिखो.', 'क्या फ्लैशबैक से शुरू कर सकता था?', 'तब क्या प्रभाव बदलता?"* 2.', '**दृश्यीकरण:** Freytag\'s Pyramid का खाली आरेख दें; छात्र स्वयं घटनाएँ रखें — फिर चर्चा करें कि **चरमोत्कर्ष कहाँ है और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_003', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके: **node 002 (कथानक संरचना)** के \'चरम बिंदु (climax)\' अनुभाग को दोहराएँ — पूछें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "परिवेश वर्णन लेखक का **सौंदर्यबोध (aesthetic indulgence)** मात्र है — कहानी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके: **node 002 (कथानक संरचना)** के \'चरम बिंदु (climax)\' अनुभाग को दोहराएँ — पूछें: "इस चरम.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "परिवेश वर्णन लेखक का **सौंदर्यबोध (aesthetic indulgence)** मात्र है — कहानी आगे बढ़ाने के लिए.' }
          ],
            remediations: { 'aesthetic-indulgence-10': { steps: ['**चरण 1 (दृश्यमान बनाएँ):** छात्र से कहें: "पाठ के 3 वर्णनात्मक पैराग्राफ चुनें। प्रत्येक में **लाल पेन से संज्ञाएँ**.', '**चरण 2 (कारण-कार्य जोड़ें):** प्रत्येक हरे विशेषण के आगे पूछें: "यह नायक को **क्या करने को मजबूर/प्रेरित** करता है?".', '**चरण 3 (प्रतिस्थापन परीक्षण):** "यदि यह विशेषण हटा दें, तो नायक का निर्णय बदलेगा?" — हाँ = वातावरण सक्रिय; नहीं.', '**चरण 4 (लेखन अभ्यास):** उपरोक्त विश्लेषण को एक PEEL अनुच्छेद में बदलें: **P**oint (वातावरण का दावा), **E**vidence (3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_004', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके तो c11_hin_ar_cbse_10_002 (कथानक संरचना) के \'मोड़ पहचानना\' (Identifying Turning.',
          misconception: 'छात्र अक्सर नायक के \'चरित्र-चित्रण\' (Character Sketch) को एक स्थैतिक सूची (Static List: नाम, उम्र, गुण, दोष) मानकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-1 — पाठ 10\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_10_002 (कथानक संरचना) के \'मोड़ पहचानना\' (Identifying Turning Points).',
                  misconception: 'छात्र अक्सर नायक के \'चरित्र-चित्रण\' (Character Sketch) को एक स्थैतिक सूची (Static List: नाम, उम्र, गुण, दोष) मानकर लिखते हैं, जबकि वरिष्ठ.' }
          ],
            remediations: { 'character-sketch-static-list': { steps: ['चरण 1: छात्र से कहें: "नायक के तीन विशेषण लिखो जो पाठ से सीधे न आए हों (लेखक ने न लिखे हों)।" — यह \'अनुमान\' (Inference).', 'यदि नहीं बदला, तो क्यों?" — यह \'चरित्र चाप\' (Character Arc) की अवधारणा जोड़ता है। चरण 4: अंत में, एक पैराग्राफ लिखने को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_005', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_ar_cbse_10_004** के \'चरित्र-परिवर्तन (character arc).',
          misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों को **\'कथानक के गवाह\' (witnesses to plot)** मान लेते हैं — अर्थात वे मानते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'आरोह भाग-1 — पाठ 10\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_ar_cbse_10_004** के \'चरित्र-परिवर्तन (character arc) के 3 चरण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों को **\'कथानक के गवाह\' (witnesses to plot)** मान लेते हैं — अर्थात वे मानते हैं कि सहायक पात्र केवल.' }
          ],
            remediations: { 'witnesses-to-plot-emotional-support': { steps: ['**चरण 1 — \'कौन\' से \'क्या करता है\' पर शिफ्ट करें:** छात्र से कहें — "पात्र का नाम न लिखें, उसका *काम* (function) लिखें.', 'क्या *दिखाता* है?" — इसे \'फंक्शन ऑडिट\' (function audit) कहें। **चरण 2 — \'हटाओ और देखो\' टेस्ट (Removal Test):** प्रत्येक.', 'नायक का अंतिम निर्णय वही रहता या बदलता?" — यदि "वही रहता", तो पात्र सजावटी है; यदि "बदलता", तो कथात्मक है। **चरण 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_006', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 10\' का केंद्रीय भाव और.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_10_004 (नायक पात्र-चित्रण)** और **c11_hin_ar_cbse_10_005.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **मुख्य विषय को "एक शब्द" (जैसे "संघर्ष", "गरिमा", "गरीबी") में लिखकर समझ लेते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 10\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-1 — पाठ 10\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 10\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_10_004 (नायक पात्र-चित्रण)** और **c11_hin_ar_cbse_10_005 (सहायक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **मुख्य विषय को "एक शब्द" (जैसे "संघर्ष", "गरिमा", "गरीबी") में लिखकर समझ लेते हैं कि विषय पूरा हो गया**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पाठ के **अंतिम तीन पैराग्राफ** पढ़ो और प्रत्येक के बाद पूछो — \'लेखक यहाँ क्या *कहना* चाह रहा है, न कि.', 'उन उत्तरों को एक कागज़ पर **बुलेट पॉइंट** में लिखवाओ। 3.', 'अब कहो: "इन बिंदुओं को जोड़कर **एक ऐसा वाक्य बनाओ जिसमें \'क्योंकि\', \'इसलिए\', \'भले ही\' जैसे संबंध-सूचक शब्द हों।" 4.', 'वही वाक्य **मुख्य विषय (thematic statement)** होगा — इसे "एक शब्द" से तुलना कराकर भेद स्पष्ट करो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
