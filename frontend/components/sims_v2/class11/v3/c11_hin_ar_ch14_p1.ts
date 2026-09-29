import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch14_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch14_p1',
    title: 'पाठ 14 · Part 1/3',
    subtitle: 'Read the poems of a woman the palace tried to silence — and the canon tried to forget.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 14 · Part 1/3',
    chapters: ['c11_hin_ar_ch14'],
    nodeIds: ['c11_hin_ar_cbse_14_001', 'c11_hin_ar_cbse_14_002', 'c11_hin_ar_cbse_14_003', 'c11_hin_ar_cbse_14_004', 'c11_hin_ar_cbse_14_005', 'c11_hin_ar_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a locked diary that got out anyway', intro: 'Imprisoned for writing, released on conditions, betrayed, escaped — her biography isn\'t background; it\'s the poems\' skeleton.', goal: 'Read biography as the structural logic of the poems and evaluate their unresolved moral ending.' },
    discovery: {
        question: 'A queen imprisoned by her own king for writing poetry negotiates three conditions for release, he breaks them, she breaks out — what is this life to her poems?',
        options: ['The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice', 'Nothing — biography shouldn\'t colour literary analysis', 'It\'s background colour for a romantic reading', 'It proves the poems are only about palace politics'],
        answer: 'The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice',
        hook: 'A Chhayavad-era woman wrote in Braj Bhasha so village women could read her — and the canon excluded her for decades for exactly that choice.',
    },
    teaching: [
        { title: 'पाठ 14 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the two poems as a diptych — systemic oppression in one, a hunter\'s frozen moral crisis in the other — and judge the unresolved \'if I kill her\' ending.',
        labels: ['पाठ 14 — पृष्ठभूमि', 'पाठ 14 — कथानक', 'पाठ 14 — पाठ्य-परिवेश', 'पाठ 14 — पात्र-चित्रण', 'पाठ 14 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_001', title: 'पाठ 14 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 14 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who was Vaddhegnasoh, and what is her distinctive place in the history of Hindi literature?', options: [
                { text: 'Vaddhegnasoh (born 12th Phalgun, village Mqrjh) was a Chhayavad-era poetess who wrote in', outcome: 'Vaddhegnasoh (born 12th Phalgun, village Mqrjh) was a Chhayavad-era poetess who wrote in Braj.' },
                { text: 'her as a Khari Boli poet or placing her in the Bhakti period', outcome: 'Not quite — Students often treat "context and background" as a list of dates and names to memorize for a 1-mark.', reveals: 'students-often-treat-context-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_002', title: 'पाठ 14 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 14\' का क्रम: शुरुआत आरोह-भाग-1-—-पाठ-14 से, घटनाएँ बढ़ती हैं, अंत \'आरोह भाग-1 पर।',
            decisions: [{ prompt: 'What is the primary narrative perspective used in the first poem (स्टैनज़ा 1 और 2) of this chapter, and who is the implied speaker?', options: [
                { text: 'The first poem uses a third-person omniscient perspective initially, shifting to a', outcome: 'The first poem uses a third-person omniscient perspective initially, shifting to a collective voice.' },
                { text: 'first-person poet', outcome: 'Not quite — Students treat the two poems as isolated "stories" and miss that they form a diptych: Poem 1.', reveals: 'students-treat-the-two-poems' },
                { text: 'Vadde Kanshi herself', outcome: 'Not quite — Students treat the two poems as isolated "stories" and miss that they form a diptych: Poem 1.', reveals: 'students-treat-the-two-poems' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary society is debating why a Chhayavad-era queen who wrote in Braj Bhasha — imprisoned by her own husband for writing — was left out of the canon for decades. A member says: \'Probably her poems were just weaker; canon committees judge merit, not politics.\'',
            decisions: [{ prompt: 'What does her case actually reveal?', options: [
                { text: 'Read exclusion as power, not merit: she wrote in Braj so village women could access her work — a choice the Khari Boli canon punished. And biography is structural logic: imprisoned for writing, she negotiated three release conditions, he broke them, and she broke out — so the second poem\'s knocking on the door is a political act, and the first\'s call for reform is a survivor\'s testimony, not abstract preaching.', outcome: 'The debate reframes: canon-making is a struggle over language, gender and authority — her life is the interpretive key, not an anecdote.' },
                { text: 'Accept the merit explanation — the canon reflects quality, and exclusion just means weaker verse.', outcome: 'That ignores the documented mechanism: her Braj Bhasha choice — made for accessibility — was itself the grounds for exclusion, a language-and-gender judgment dressed as taste.', reveals: 'canon-is-pure-merit' },
                { text: 'Separate the poems from her life — read them on their own without biography.', outcome: 'Here biography IS the structure: the diptych pairs systemic oppression (poem 1) with the individual moral crisis it produces (poem 2) — her imprisonment and escape are the logic, not decoration.', reveals: 'ignore-biography-read-text-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'The hunter\'s hand stays raised and the poem refuses to lower it — the reader must live inside the poor man\'s eternal dilemma.',
            decisions: [{ prompt: 'What comes next? पाठ 14 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 14 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 10 Hindi chapter on "Chhayavad ki visheshtayein" and the Braj vs.',
          misconception: 'Students often treat "context and background" as a list of dates and names to memorize for a 1-mark question.',
          parts: [
                { id: 'a', prompt: 'Explain why Vaddhegnasoh\'s choice to write in Braj Bhasha rather than Khari Boli was a deliberate literary and political decision in the 1920s–30s.', answer: 'Writing in Braj Bhasha allowed her to reach rural women directly, bypassing the',
                  options: ['Writing in Braj Bhasha allowed her to reach rural women directly, bypassing the', 'Braj was the only language she knew'],
                  hint: 'If stuck, review Class 10 Hindi chapter on "Chhayavad ki visheshtayein" and the Braj vs.',
                  misconception: 'Students often treat "context and background" as a list of dates and names to memorize for a 1-mark question.' }
          ],
            remediations: { 'students-often-treat-context-and': { steps: ['If the student cannot link biography to textual evidence: (1) Have them re-read the textbook\'s biographical paragraph.', '(2) Ask: "Which of these actions appears symbolically in Poem 2?" (3) Guide them to map: wrote → poem exists.', '(4) Require them to write one sentence connecting each action to a specific image in the poems.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_002', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ.',
          hint: 'If stuck, review the "Story vs Plot" distinction using a परिचित Bollywood movie: the.',
          misconception: 'Students treat the two poems as isolated "stories" and miss that they form a diptych: Poem 1 establishes the *systemic*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,',
                  options: ['\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-1 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review the "Story vs Plot" distinction using a परिचित Bollywood movie: the *story* is the.',
                  misconception: 'Students treat the two poems as isolated "stories" and miss that they form a diptych: Poem 1 establishes the *systemic* narrative (class.' }
          ],
            remediations: { 'students-treat-the-two-poems': { steps: ['Have the student draw a two-column timeline: left column for Poem 1 (events: historical oppression → king\'s betrayal →.', 'Ask: "Which events are shown *happening now* vs *reported as past*?" 3.', 'Color-code: red for present action, blue for backstory.', 'Finally, ask: "If you swapped the stanza order in Poem 1, how would the narrative impact change?" This forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_003', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_14_002 (कथानक और आख्यान-संरचना) के \'घटना-प्रवाह आरेख\' (event.',
          misconception: 'छात्र प्रायः \'परिवेश\' को केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) तक सीमित कर देते हैं और \'वातावरण\' को केवल \'मूड\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_14_002 (कथानक और आख्यान-संरचना) के \'घटना-प्रवाह आरेख\' (event flow.',
                  misconception: 'छात्र प्रायः \'परिवेश\' को केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) तक सीमित कर देते हैं और \'वातावरण\' को केवल \'मूड\' (mood) का पर्याय मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के एक छोटे अंश (5-6 पंक्तियाँ) दें और कहें: "केवल भौतिक संज्ञा शब्दों (nouns) को घेरें — जैसे छत, बरसात.', 'फिर कहें: "अब प्रत्येक संज्ञा के आगे वह विशेषण या क्रिया लिखें जो लेखक ने उसके साथ प्रयुक्त की है — जैसे \'टपकती छत\'.', 'अब पूछें: "इन विशेषणों/क्रियाओं से पाठक के मन में कौन-सी भावना जगती है?', '(घुटन, भय, निराशा, क्रोध)" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_004', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फँस जाएँ: **कथानक संरचना (c11_hin_ar_cbse_14_002)** के \'संघर्ष\' और \'चरमोत्कर्ष\' खंड.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'पात्र-वर्णन\' (Character Description)** और **\'पात्र-चित्रण\' (Character Analysis)** को समान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-1 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ: **कथानक संरचना (c11_hin_ar_cbse_14_002)** के \'संघर्ष\' और \'चरमोत्कर्ष\' खंड को दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'पात्र-वर्णन\' (Character Description)** और **\'पात्र-चित्रण\' (Character Analysis)** को समान मानते हैं। वे नायक.' }
          ],
            remediations: { 'character-description-character-analysis': { steps: ['**लक्षित उपचार (3 चरण):** 1.', '**अंतर स्पष्ट करो:** छात्र को एक ही पात्र के दो पैराग्राफ पढ़वाओ — एक **वर्णनात्मक** (केवल तथ्य), दूसरा.', '**PEEL का अभ्यास:** एक साधारण गुण (जैसे: \'साहसी\') देकर कहो: **P**oint लिखो, पाठ से **E**vidence ढूंढो, **E**xplain करो.', '**\'साक्ष्य-शिकार\' खेल:** 10 मिनट में पाठ से नायक के **एक गुण** के **3 भिन्न प्रमाण** (संवाद, कर्म, अन्य पात्र की राय).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_005', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटके तो नोड 004 (पात्र-चित्रण: नायक) की PEEL पद्धति और \'गोदान\' के कथानक सारांश (नोड.',
          misconception: 'छात्र मानते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' होता है और परीक्षा में वे केवल मुख्य नायक के इर्द-गिर्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'आरोह भाग-1 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो नोड 004 (पात्र-चित्रण: नायक) की PEEL पद्धति और \'गोदान\' के कथानक सारांश (नोड 002) को.',
                  misconception: 'छात्र मानते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' होता है और परीक्षा में वे केवल मुख्य नायक के इर्द-गिर्द घूमने वाले विवरण लिख.' }
          ],
            remediations: { 'narrative-function': { steps: ['चरण 1: छात्र से पूछें — "इस पात्र को हटा दें तो कथानक में क्या टूटेगा?" यदि उत्तर "कुछ नहीं" हो, तो वह पात्र की कथात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_006', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 14\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 14\' का केंद्रीय भाव और.',
          hint: 'यदि अटका हुआ महसूस हो तो **कथानक संरचना (c11_hin_ar_cbse_14_002)** और **नायक पात्र-चित्रण.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' ढूंढने का अर्थ है कहानी का \'केंद्रीय पात्र कौन है\' या \'कहानी में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 14\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 14\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-1 — पाठ 14\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 14\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 14\' का कथानक — \'आरोह भाग-1 — पाठ 14\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कथानक संरचना (c11_hin_ar_cbse_14_002)** और **नायक पात्र-चित्रण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' ढूंढने का अर्थ है कहानी का \'केंद्रीय पात्र कौन है\' या \'कहानी में क्या-क्या हुआ\' बताना। वे.' }
          ],
            remediations: { 'plot-subject-matter-14': { steps: ['**स्पष्टीकरण:** छात्र को समझाएं — "विषय वह **वाक्य** है जो कहानी का सार बताता है, न कि वह **शब्द** जो कहानी का टॉपिक.', '**अभ्यास:** पाठ 14 से 3 प्रमुख घटनाएं चुनवाएं और पूछें — "इन तीनों में कॉमन (Common) कौन-सा बड़ा विचार है?" वही विषय.', '**तुलना:** दो कहानियों (जैसे: \'उषा\' और \'अपना-अपना भाग्य\') का विषय आमने-सामने रखवाएं — समान विषय, अलग कथावस्तु — इससे.', '**लेखन:** छात्र से कहें — "विषय को एक वाक्य में लिखो, फिर उस वाक्य से \'संदेश\' अलग करो।" बार-बार लिखने से अवधारणा स्थिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
