import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch06_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch06_p1',
    title: 'बादल राग · Part 1/3',
    subtitle: 'Why Nirala chose the moment even Rama knelt',
    classLevel: 12, subject: 'hin_ar', topic: 'बादल राग · Part 1/3',
    chapters: ['c12_hin_ar_ch06'],
    nodeIds: ['c12_hin_ar_cbse_06_001', 'c12_hin_ar_cbse_06_002', 'c12_hin_ar_cbse_06_003', 'c12_hin_ar_cbse_06_004', 'c12_hin_ar_cbse_06_005', 'c12_hin_ar_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Epic-poetry analyst', intro: 'A Chhayavad master builds an epic around the one scene where the perfect man admits he isn\'t enough.', goal: 'Read Ram Ki Shakti Puja as Chhayavad epic — personal struggle and national allegory inside a mythic frame.' },
    discovery: {
        question: 'Of every Ramayana moment — birth, exile, coronation — Nirala chose the instant Rama kneels to the Goddess before the final battle. Why that one?',
        options: ['It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free', 'It\'s the most exciting scene', 'The battle needed a prayer', 'Random selection'],
        answer: 'It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free',
        hook: 'Not a retelling — a re-visioning: an eleven-canto blank-verse epic that claims classical lineage for modern Hindi while encoding a freedom struggle and private grief inside Rama\'s helplessness. Chhayavad\'s interiority scaled to epic architecture.',
    },
    teaching: [
        { title: 'बादल राग — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand beside Rama before Lanka: weigh why Shakti Puja was the chosen moment, compare epic structure with lyric intensity, and hunt the allegory running beneath the myth.',
        labels: ['बादल राग — कवि', 'बादल राग — पद्यांश-वार', 'बादल राग — काव्य-संरचना', 'बादल राग — केंद्रीय', 'बादल राग — छंद', 'बादल राग — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_001', title: 'बादल राग — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 06 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the poet of *Ram Ki Shakti Puja*, and what is his pen name? (Answer in one sentence with both names.)', options: [
                { text: 'The poet is Suryakant Tripathi, known by his pen name **Nirala** (fujkyk)', outcome: 'The poet is Suryakant Tripathi, known by his pen name **Nirala** (fujkyk).' },
                { text: 'Premchand', outcome: 'Not quite — Students treat "Context and Background" as **optional reading** — a few dates and names to memorize.', reveals: 'students-treat-context-and-background' },
                { text: 'Mahadevi Verma', outcome: 'Not quite — Students treat "Context and Background" as **optional reading** — a few dates and names to memorize.', reveals: 'students-treat-context-and-background' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_002', title: 'बादल राग — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 6\' का क्रम: शुरुआत आरोह-भाग-2-—-पाठ-6 से, घटनाएँ बढ़ती हैं, अंत \'आरोह भाग-2 पर।',
            decisions: [{ prompt: 'What is the basic definition of \'narrative structure\' in a poem, and how does it differ from a story\'s plot?', options: [
                { text: 'Narrative structure in a poem is the organized progression of ideas/images across stanzas', outcome: 'Narrative structure in a poem is the organized progression of ideas/images across stanzas that.' },
                { text: 'a poem has no \'plot\'', outcome: 'Not quite — Students often think a poem has no \'plot\' because no characters perform actions.', reveals: 'a-poem-has-no-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_005', title: 'बादल राग — छंद और लय-विधान',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 6\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: '"बादल राग" के पहले पद में प्रयुक्त छंद का नाम बताइए और उसके गण-विधान (लघु/गुरु क्रम) को लिखिए।', options: [
                { text: '**Correct answer:** पहले पद में **मुक्तक/मुक्तछंद** (free verse) की प्रवृत्ति है; कोई', outcome: '**Correct answer:** पहले पद में **मुक्तक/मुक्तछंद** (free verse) की प्रवृत्ति है; कोई निश्चित.' },
                { text: 'इंद्रवज्रा', outcome: 'Not quite — **Exact error:** Students scan "बादल राग" using **वर्णिक छंद नियम** (गण = य/र/त/ज/भ/न/स/म based.', reveals: 'exact-error-students-scan-using' },
                { text: 'वसंततिलका', outcome: 'Not quite — **Exact error:** Students scan "बादल राग" using **वर्णिक छंद नियम** (गण = य/र/त/ज/भ/न/स/म based.', reveals: 'exact-error-students-scan-using' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior is spiralling after a brutal internship rejection: \'This is who I am now — the guy who fails.\' You remember the Firaq poem where a tree loses its leaves to the season yet the final stanza returns to the same rooted presence.',
            decisions: [{ prompt: 'How do you use the poem\'s structure with him?', options: [
                { text: 'Point out the poem moves through noon shadow, wind, bare winter — then circles back to the rooted tree; a hard season is weather passing through, not the trunk. His rejection is a stanza, not the whole structure.', outcome: 'The poem\'s circular return exists to make exactly this claim: the ending echoes the opening image, but now carrying the endurance the middle proved — the tree that was always rooted.' },
                { text: 'Tell him the seasons prove everything changes, so this failure will soon be replaced by success — wait it out.', outcome: 'That reads only the seasonal half and skips the rootedness the poem insists on; passive waiting isn\'t the tree\'s endurance — the structure pairs change outside with continuity within.', reveals: 'time-heals-passively' },
                { text: 'Tell him to treat the rejection as the final stanza — some stories end bare, and that\'s honest.', outcome: 'That amputates the poem\'s actual resolution: the final stanza deliberately returns to rooted presence, so calling the bare season the ending misreads where the structure chooses to stop.', reveals: 'hard-season-is-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an epic as both myth and mirror — where a god\'s prayer for strength speaks for a poet, and a people, beseeching power.',
            decisions: [{ prompt: 'What comes next? बादल राग · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बादल राग · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck on Chhayavad definition, revisit Class 11 "Chhayavad Introduction".',
          misconception: 'Students treat "Context and Background" as **optional reading** — a few dates and names to memorize for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of *Ram Ki Shakti Puja*, and what is his pen name? (Answer in one sentence with both names.)', answer: 'The poet is Suryakant Tripathi, known by his pen name **Nirala** (fujkyk)',
                  options: ['The poet is Suryakant Tripathi, known by his pen name **Nirala** (fujkyk)', 'Premchand', 'Mahadevi Verma', 'Premchand" or "Mahadevi Verma" —'],
                  hint: 'If stuck on Chhayavad definition, revisit Class 11 "Chhayavad Introduction".',
                  misconception: 'Students treat "Context and Background" as **optional reading** — a few dates and names to memorize for a 1-mark question — instead of the.' },
                { id: 'b', prompt: 'Explain in your own words what "Chhayavad" (छायावाद) means as a literary movement, and name ONE core principle that distinguishes it from the earlier Dwivedi.', answer: 'Chhayavad (Shadowism) is a Romantic-era Hindi literary movement (c',
                  options: ['Chhayavad (Shadowism) is a Romantic-era Hindi literary movement (c', 'Jaishankar Prasad, Nirala, Mahadevi, Pant', 'Chhayavad poets'],
                  hint: 'If stuck on Chhayavad definition, revisit Class 11 "Chhayavad Introduction".',
                  misconception: 'Students treat "Context and Background" as **optional reading** — a few dates and names to memorize for a 1-mark question — instead of the.' }
          ],
            remediations: { 'students-treat-context-and-background': { steps: ['If a student cannot answer Diagnostic Questions 2–4 correctly: (1) Have them re-read the **Class 11 "Chhayavad".', '(2) Assign a 5-minute "Ramayana Episode Mapping" exercise: list 5 major Ramayana episodes and write one sentence on why.', '(3) Re-attempt Diagnostic Question 3 orally — the student must *justify* the choice of Shakti Puja using the phrase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_002', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 6\' का कथानक — \'आरोह भाग-2 — पाठ 6\' — आरोह भाग-2 का पाठ। पाठ.',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_06_002 (Plot and Narrative Structure) and.',
          misconception: 'Students often think a poem has no \'plot\' because no characters perform actions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 6\' का कथानक — \'आरोह भाग-2 — पाठ 6\' — आरोह भाग-2 का पाठ। पाठ का कथानक,',
                  options: ['\'आरोह भाग-2 — पाठ 6\' का कथानक — \'आरोह भाग-2 — पाठ 6\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_06_002 (Plot and Narrative Structure) and practice.',
                  misconception: 'Students often think a poem has no \'plot\' because no characters perform actions.' }
          ],
            remediations: { 'a-poem-has-no-plot': { steps: ['Have the student number the stanzas 1–5.', 'Ask: "What is the one new thing added in stanza 2 that wasn\'t in stanza 1?" 3.', 'Then ask them to draw a simple flowchart: Stanza 1 → Stanza 2 → ...', '→ Stanza 5, labeling each arrow with the shift (e.g., "shadow → wind", "external → internal").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_003', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि छात्र **एनजैम्बमेंट** या **तुकांत योजना पहचानने** में अटके, तो कक्षा 11 के नोड्स.',
          misconception: '**छात्र मानते हैं कि \'काव्य-संरचना\' का अर्थ केवल \'छंद पहचानना\' (जैसे रोला, चौपाई) या \'तुकांत बताना\' है।** वे यह नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'आरोह भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 6\' का कथानक — \'आरोह भाग-2 — पाठ 6\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि छात्र **एनजैम्बमेंट** या **तुकांत योजना पहचानने** में अटके, तो कक्षा 11 के नोड्स.',
                  misconception: '**छात्र मानते हैं कि \'काव्य-संरचना\' का अर्थ केवल \'छंद पहचानना\' (जैसे रोला, चौपाई) या \'तुकांत बताना\' है।** वे यह नहीं देखते कि **पदों की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता का **मुद्रित रूप (printed layout)** दिखाओ — उसे पदों को **बॉक्स में घेरने** को कहो। 2.', 'प्रत्येक बॉक्स की **पंक्तियाँ गिनवाओ** और **लंबाई की तुलना** करवाओ (पद 1 vs पद 6, पद 2-5 vs पद 1)। 3.', 'पूछो: **"कवि ने यहाँ अधिक जगह क्यों ली?', 'यहाँ कम क्यों?"** — उत्तर में \'भाव\' शब्द आना चाहिए (जैसे: "क्योंकि यहाँ बादल बन रहा है, समय लगता है")। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_004', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि रस-सूत्र या विभाव/अनुभाव/व्यभिचारी का भेद भूल गए हों तो **c11_hin_a_cbse_13_004**.',
          misconception: '**सबसे घातक भ्रम**: छात्र समझते हैं कि **\'केंद्रीय भाव\' = \'कविता का विषय\' (बादल/वर्षा)** और **\'रस\' = \'कविता का मूड\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-2 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 6\' का कथानक — \'आरोह भाग-2 — पाठ 6\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि रस-सूत्र या विभाव/अनुभाव/व्यभिचारी का भेद भूल गए हों तो **c11_hin_a_cbse_13_004** (जाग तुझको.',
                  misconception: '**सबसे घातक भ्रम**: छात्र समझते हैं कि **\'केंद्रीय भाव\' = \'कविता का विषय\' (बादल/वर्षा)** और **\'रस\' = \'कविता का मूड\' (उदास/खुश)**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहो — "कविता का **विषय** एक तरफ लिखो, **भाव** दूसरी तरफ। विषय = \'बादल\', भाव = \'बादल न आने की.', 'कौन-सा **आता-जाता** है?" → स्थायी vs व्यभिचारी स्पष्ट होगा। **चरण 4**: दोबारा डायग्नोस्टिक Q4 करवाओ — अब तर्क के साथ रस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_005', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि स्कैनिंग में अटकें: **c11_hin_a_cbse_13_005** के कार्याभ्यास (worked examples) को.',
          misconception: '**Exact error:** Students scan "बादल राग" using **वर्णिक छंद नियम** (गण = य/र/त/ज/भ/न/स/म based on *varna* sequence).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'आरोह भाग-2 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 6\' का कथानक — \'आरोह भाग-2 — पाठ 6\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि स्कैनिंग में अटकें: **c11_hin_a_cbse_13_005** के कार्याभ्यास (worked examples) को दोहराएँ.',
                  misconception: '**Exact error:** Students scan "बादल राग" using **वर्णिक छंद नियम** (गण = य/र/त/ज/भ/न/स/म based on *varna* sequence) instead of **मात्रिक.' }
          ],
            remediations: { 'exact-error-students-scan-using': { steps: ['**Immediate remediation:** Take any 2 lines from "बादल राग" (e.g., first stanza, last stanza).', '**Step-by-step re-scan:** Write each word → break into syllables → mark ह्रस्व/दीर्घ/संयुक्त/अनुनासिक → assign 1 (लघु).', '**Cross-check with Class 11 node:** Revisit **c11_hin_a_cbse_13_005** (जाग तुझको दूर जाना — छंद और लय-विधान).', '**Re-diagnostic:** After 2 practice scans, attempt **Diagnostic Question 3** again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_006', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 6\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 6\' का केंद्रीय भाव और.',
          hint: 'यदि भेद स्पष्ट न हों तो **कक्षा 11 आरोह के नोड c11_hin_a_cbse_13_006 (जाग तुझको दूर जाना.',
          misconception: 'छात्र समझते हैं कि **\'अलंकार पहचानना = नाम बता देना\'** (जैसे: "यह अनुप्रास है")। **गलत:** बोर्ड/प्रतियोगी परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 6\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 6\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-2 — पाठ 6\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 6\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 6\' का कथानक — \'आरोह भाग-2 — पाठ 6\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि भेद स्पष्ट न हों तो **कक्षा 11 आरोह के नोड c11_hin_a_cbse_13_006 (जाग तुझको दूर जाना.',
                  misconception: 'छात्र समझते हैं कि **\'अलंकार पहचानना = नाम बता देना\'** (जैसे: "यह अनुप्रास है")। **गलत:** बोर्ड/प्रतियोगी परीक्षा में पूछा जाता है — **"इस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c12_hin_ar_cbse_06_002 (पद्यांश-वार भावार्थ) — जिन पंक्तियों में अलंकार हैं, उनका **सटीक अर्थ** समझें.', '**अभ्यास करें:** c11_hin_a_cbse_13_006 / c11_hin_a_cbse_14_006 / c11_hin_a_cbse_15_006 / c11_hin_a_cbse_16_006 (कक्षा.', '**लिखित अभ्यास:** कविता की 5 प्रमुख पंक्तियाँ चुनें, प्रत्येक में **अलंकार नाम + भेद + प्रभाव (3 वाक्य)** लिखें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
