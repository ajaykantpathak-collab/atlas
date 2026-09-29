import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch17_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch17_p2: SimDef = {
    id: 'v3_c12_hin_a_ch17_p2',
    title: 'कुटज · Part 2/3',
    subtitle: 'The courtyard is its mornings — not its name',
    classLevel: 12, subject: 'hin_a', topic: 'कुटज · Part 2/3',
    chapters: ['c12_hin_a_ch17'],
    nodeIds: ['c12_hin_a_cbse_17_007', 'c12_hin_a_cbse_17_008', 'c12_hin_a_cbse_17_009', 'c12_hin_a_cbse_17_010', 'c12_hin_a_cbse_17_011', 'c12_hin_a_cbse_17_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Philosophical-essay reader', intro: 'A scholar who ran All India Radio asks whether a word should come from the dictionary or from the courtyard where life happens.', goal: 'Read Aangan through naam-versus-svaroop — social labels against lived essence, tyag as uncelebrated art.' },
    discovery: {
        question: 'An Aadhaar number opens every door — subsidies, banks, travel — yet it isn\'t you. A 1950s essayist said this exact thing about \'naam\' and \'svaroop.\' What\'s the split?',
        options: ['Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth', 'Aadhaar is fake identity', 'Names are always wrong', 'Svaroop means appearance'],
        answer: 'Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth',
        hook: 'Mishra insists on \'aangan\' over the Sanskritised \'angana\' — the lived word carries cow-dung smell and children\'s play; the formal word is sterile. And tyag is redefined: not self-denial or heroic martyrdom but daily, uncelebrated duty — a mother\'s life as art.',
    },
    teaching: [
        { title: 'कुटज — गौण विषय', text: '\'अंतरा भाग-2 — पाठ 17\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_17_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand in a courtyard at dawn: watch the space reveal itself as process, not object; weigh name against essence; and test whether sacrifice is suffering or transcendence.',
        labels: ['कुटज — गौण विषय', 'कुटज — साहित्यिक युक्तियाँ', 'कुटज — पदावली: मुख्य', 'कुटज — व्याकरण: पाठ', 'कुटज — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_007', title: 'कुटज — गौण विषय',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 17\' में अंतरा-भाग-2-—-पाठ-17 जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that runs through a text alongside the primary', outcome: 'A secondary theme is a subordinate idea that runs through a text alongside the primary theme.' },
                { text: 'belonging', outcome: 'Not quite — Students often treat every topic the story touches (birds, nests, village life) as a "theme".', reveals: 'students-often-treat-every-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_008', title: 'कुटज — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 17\' में बिंब ढूँढिए — अंतरा-भाग-2-—-पाठ-17 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define "imagery" (बिंब) and "metaphor" (रूपक) in your own words, and give one example of each from daily life (not from the textbook).', options: [
                { text: 'Imagery: Language that appeals to the senses to create a mental picture (e.g., "The', outcome: 'Imagery: Language that appeals to the senses to create a mental picture (e.g., "The sizzling sound.' },
                { text: 'exam is *like* a mountain', outcome: 'Not quite — Students treat imagery and metaphor as *identification exercises* — "Find the metaphor in paragraph.', reveals: 'students-treat-imagery-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_009', title: 'कुटज — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 17\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, then give one example of each from the essay "oqQVt" (do not use the uke/:i distinction for.', options: [
                { text: '**Correct answer:** Irony: a contrast between what is said/expected and what is', outcome: '**Correct answer:** Irony: a contrast between what is said/expected and what is meant/happens.' },
                { text: 'the author says X means Y', outcome: 'Not quite — Students often think **symbolism = "the author says X means Y"** (a fixed code) and **irony.', reveals: 'symbolism-the-author-says-x' },
                { text: 'saying the opposite for humor/sarcasm', outcome: 'Not quite — Students often think **symbolism = "the author says X means Y"** (a fixed code) and **irony.', reveals: 'symbolism-the-author-says-x' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_012', title: 'कुटज — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 17\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'अंतरा भाग-2।',
            decisions: [{ prompt: '"ओकवट" पाठ में लेखक ने ओकवट के किन दो भौतिक विशेषताओं का उल्लेख किया है? (केवल पाठ से सीधे उद्धृत करें)', options: [
                { text: '**Correct answer:** पाठ में ओकवट की "लम्बी-लम्बी डालियाँ" और "छोटी-बड़ी पत्तियों" का सीधा', outcome: '**Correct answer:** पाठ में ओकवट की "लम्बी-लम्बी डालियाँ" और "छोटी-बड़ी पत्तियों" का सीधा उल्लेख है.' },
                { text: ')। **What a wrong answer reveals:** If', outcome: 'Not quite — **Students treat inferential questions as "opinion questions" — they write what they *feel* the.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a housing-for-all poster contest, a teammate\'s entry shows a glossy apartment block with the line \'shelter = square feet.\' You recall the essay that starts on a mud-walled village lane and ends in a Sanskrit verse on what makes a dwelling a home.',
            decisions: [{ prompt: 'How would the essay \'कुटिर\' reframe the poster?', options: [
                { text: 'Shift the claim from floor area to shelter-as-value — the essay builds from one village lane to etymology to a universal ideal precisely to show a home is protection offered without discrimination, not a purchasable quantity.', outcome: 'The chapter\'s method is the message: digression from concrete scene to philosophy is how the essay lifts \'house\' into \'home\' — the poster needs that ascent, not a bigger number.' },
                { text: 'Keep the poster — for a scheme, square footage is the honest measurable promise.', outcome: 'Measurability isn\'t the essay\'s unit of meaning: the text argues a dwelling earns its name by what it shelters, and a poster that equates home with area repeats the reduction the essay spends its length undoing.', reveals: 'home-equals-area' },
                { text: 'Drop both and show a Sanskrit shloka alone — the philosophical ending is the essay\'s best part.', outcome: 'The verse lands because the village lane came first — the essay\'s frame pairs particular scene with universal ideal; keeping the abstraction without the mud walls cuts the argument\'s root.', reveals: 'abstraction-alone-convinces' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate the label from the life — and hear a Sanskrit scholar argue that the truest word is the one that\'s been lived in.',
            decisions: [{ prompt: 'What comes next? कुटज · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कुटज · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_007', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If unable to separate primary from secondary themes, review node 006\'s worked examples.',
          misconception: 'Students often treat every topic the story touches (birds, nests, village life) as a "theme", confusing subject matter.',
          parts: [
                { id: 'a', prompt: 'Choose one secondary theme from "oqQVt" (e.g., dignity of labor) and show how you would apply the PEEL structure (Point, Evidence, Explanation, Link) to write.', answer: 'Point: The story champions the dignity of manual labor',
                  options: ['Point: The story champions the dignity of manual labor', 'belonging'],
                  hint: 'If unable to separate primary from secondary themes, review node 006\'s worked examples and practice.',
                  misconception: 'Students often treat every topic the story touches (birds, nests, village life) as a "theme", confusing subject matter with thematic idea.' }
          ],
            remediations: { 'students-often-treat-every-topic': { steps: ['Re-read the story highlighting only passages where a character *reflects* or *judges* (internal monologue, dialogue.', 'Convert each highlighted passage into a "The author suggests that..." sentence.', 'Group sentences that share the same abstract noun (identity, labor, prejudice).', 'Verify each group against the primary theme: does it support, complicate, or contrast?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat every topic the story touches (birds, nests, village life) as a "theme", confusing subject matter.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "The secondary theme of identity in \'oqQVt\' is ultimately resolved when the protagonist accepts his given name." Defend your.', answer: 'The statement is false; the protagonist never accepts his given name',
                  options: ['The statement is false; the protagonist never accepts his given name', 'belonging'],
                  hint: 'If unable to separate primary from secondary themes, review node 006\'s worked examples and practice.',
                  misconception: 'Students often treat every topic the story touches (birds, nests, village life) as a "theme", confusing subject matter with thematic idea.' }
          ],
            remediations: { 'students-often-treat-every-topic': { steps: ['Re-read the story highlighting only passages where a character *reflects* or *judges* (internal monologue, dialogue.', 'Convert each highlighted passage into a "The author suggests that..." sentence.', 'Group sentences that share the same abstract noun (identity, labor, prejudice).', 'Verify each group against the primary theme: does it support, complicate, or contrast?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_008', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck on "quality transferred," review the Class 11 metaphor worksheet.',
          misconception: 'Students treat imagery and metaphor as *identification exercises* — "Find the metaphor in paragraph 3" — rather than.',
          parts: [
                { id: 'a', prompt: 'Identify the extended metaphor in this passage: "नाम में क्या धरा है... नाम की सार्थकता ही होती है कि उससे सामाजिक स्थिति झलकती है...', answer: 'Domain A (source): Physical label/tag (नाम',
                  options: ['Domain A (source): Physical label/tag (नाम', 'name represents identity'],
                  hint: 'If stuck on "quality transferred," review the Class 11 metaphor worksheet (c11_hin_ar_cbse_01_008).',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* — "Find the metaphor in paragraph 3" — rather than *argument-analysis.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Re-read the essay *only for sensory verbs* — circle every word indicating sight, sound, smell, touch, taste (e.g.', 'For each circled word, ask: "What abstract idea is this sensory detail *carrying*?" Write the equation: [Sensory.', 'Pick the three strongest equations and write one PEEL paragraph for each: Point (the metaphor), Evidence (quoted.', 'Compare your paragraphs with the worked examples below. If the "Explanation" step feels weak, revisit Class 11 node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_009', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the "upekshit" (neglected) vs "pujit" (worshipped) contrast in the.',
          misconception: 'Students often think **symbolism = "the author says X means Y"** (a fixed code) and **irony = "saying the opposite for.',
          parts: [
                { id: 'a', prompt: 'Define irony and symbolism in your own words, then give one example of each from the essay "oqQVt" (do not use the uke/:i distinction for symbolism).', answer: '**Correct answer:** Irony: a contrast between what is said/expected and what is',
                  options: ['**Correct answer:** Irony: a contrast between what is said/expected and what is', 'the author says X means Y', 'saying the opposite for humor/sarcasm', 'family'],
                  hint: 'If stuck, review the "upekshit" (neglected) vs "pujit" (worshipped) contrast in the Rama-house.',
                  misconception: 'Students often think **symbolism = "the author says X means Y"** (a fixed code) and **irony = "saying the opposite for humor/sarcasm."**.' },
                { id: 'b', prompt: 'The author writes: "*uke blfy, cM+k ugha gS fd og uke gSA og blfy, cM+k gksrk gS fd mls lkekftd LohÑfr feyh gksrh gSA*" (The name is not big because it is.', answer: '**Correct answer:** The irony is that a name (uke)',
                  options: ['**Correct answer:** The irony is that a name (uke)', 'the name is important', 'the author says X means Y', 'saying the opposite for humor/sarcasm'],
                  hint: 'If stuck, review the "upekshit" (neglected) vs "pujit" (worshipped) contrast in the Rama-house.',
                  misconception: 'Students often think **symbolism = "the author says X means Y"** (a fixed code) and **irony = "saying the opposite for humor/sarcasm."**.' },
                { id: 'c', prompt: 'Analyze how the author uses the symbol of "thuk" (sacrifice) in the passage "*thuk Hkh ,d dyk gS*...', answer: '**Correct answer:** "Thuk" (sacrifice) is symbolized as both an art (dyk) and a',
                  options: ['**Correct answer:** "Thuk" (sacrifice) is symbolized as both an art (dyk) and a', 'only as', 'the author says X means Y', 'saying the opposite for humor/sarcasm'],
                  hint: 'If stuck, review the "upekshit" (neglected) vs "pujit" (worshipped) contrast in the Rama-house.',
                  misconception: 'Students often think **symbolism = "the author says X means Y"** (a fixed code) and **irony = "saying the opposite for humor/sarcasm."**.' }
          ],
            remediations: { 'symbolism-the-author-says-x': { steps: ['**Re-read the "uke vs :i" section (pages 132-133)** with a two-column note: left column = what society says/does (name.', '**List 5 concrete objects in the essay** (iwQy, iq"i, thuk, jkefxfj ka iq"i, ân;) and for each write: "This.', '**Find 3 moments where the author\'s tone shifts** from description to judgment — mark the ironic gap.', '**Re-attempt Diagnostic Questions 2 and 4** using these notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_010', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि प्रतीकवाद स्पष्ट नहीं है, तो c12_hin_a_cbse_17_009 (विरोधाभास और प्रतीक) के \'प्रतीक\'.',
          misconception: '**विशिष्ट भ्रम**: छात्र \'कुटज\', \'अरण्य\', \'तपस्या\' जैसे शब्दों को *केवल* प्रतीक (symbol) मानते हैं और भूल जाते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 17\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 17\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि प्रतीकवाद स्पष्ट नहीं है, तो c12_hin_a_cbse_17_009 (विरोधाभास और प्रतीक) के \'प्रतीक\' खंड को.',
                  misconception: '**विशिष्ट भ्रम**: छात्र \'कुटज\', \'अरण्य\', \'तपस्या\' जैसे शब्दों को *केवल* प्रतीक (symbol) मानते हैं और भूल जाते हैं कि उपन्यास में ये.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** (15 मिनट): कुटज के उन 3-4 पृष्ठों को चिह्नित करें जहाँ \'कुटज\', \'अरण्य\', \'तपस्या\' शब्द आए हैं — केवल.', '**तुलना तालिका बनाएं** (10 मिनट): प्रत्येक शब्द के लिए दो कॉलम — \'शाब्दिक/यथार्थवादी प्रसंग\' और \'प्रतीकात्मक अर्थ\'।.', '**पुनः निदान** (5 मिनट): DIAGNOSTIC_QUESTION_1 और _2 को दोबारा हल करें — अब दोनों स्तरों पर उत्तर दें। यदि अभी भी केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_011', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि फंसे हुए हों, तो कुटज — पात्र-चित्रण: सहायक पात्र (c12_hin_a_cbse_17_005) और कुटज.',
          misconception: 'छात्र अक्सर कुटज पाठ में भाषा-प्रयोग के विश्लेषण को केवल "कठिन शब्दों का अर्थ निकालना" या "मुहावरों की सूची बनाना".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 17\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-2 — पाठ 17\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हुए हों, तो कुटज — पात्र-चित्रण: सहायक पात्र (c12_hin_a_cbse_17_005) और कुटज — मुख्य विषय.',
                  misconception: 'छात्र अक्सर कुटज पाठ में भाषा-प्रयोग के विश्लेषण को केवल "कठिन शब्दों का अर्थ निकालना" या "मुहावरों की सूची बनाना" मानते हैं, जबकि वास्तव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिए गए एक अंश में वाक्य की लंबाई और विराम चिह्नों पर ध्यान देने के लिए कहें: पहला कदम है वाक्य को पढ़कर.', 'क्या वे अनिश्चितता दिखाती हैं?" फिर मुहावरे के साथ दोहराएं: मुहावरा पहचानें, उसका शब्दार्थ अर्थ बताएं, फिर पूछें: "इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_012', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck on evidence-location: Revisit **c12_hin_a_cbse_17_002 (Plot and Narrative.',
          misconception: '**Students treat inferential questions as "opinion questions" — they write what they *feel* the text means instead.',
          parts: [
                { id: 'a', prompt: 'पाठ में "नाम" और "रूप" के बीच का अंतर स्पष्ट करते हुए लेखक क्या सुझाता है — कि नाम सामाजिक निर्माण है या व्यक्तिगत पहचान?', answer: '**Correct answer:** लेखक सुझाता है कि **नाम सामाजिक निर्माण है**',
                  options: ['**Correct answer:** लेखक सुझाता है कि **नाम सामाजिक निर्माण है**', '(पैराग्राफ 4)। रूप व्यक्तिगत सत्य है (', ')। **What a wrong answer reveals:** If'],
                  hint: 'If stuck on evidence-location: Revisit **c12_hin_a_cbse_17_002 (Plot and Narrative Structure)**.',
                  misconception: '**Students treat inferential questions as "opinion questions" — they write what they *feel* the text means instead of what the text.' },
                { id: 'b', prompt: 'पाठ के अंत में लेखक लिखता है: "जीवन के लिये मरना ही एकमात्र कला नहीं...', answer: '**Correct answer:** ओकवट **निःस्वार्थ दान** का मूर्त रूप है',
                  options: ['**Correct answer:** ओकवट **निःस्वार्थ दान** का मूर्त रूप है', '(शारीरिक बलिदान), (2)', '(अंतिम पैरा', 'हिंस्यात् सर्वा भूतानि'],
                  hint: 'If stuck on evidence-location: Revisit **c12_hin_a_cbse_17_002 (Plot and Narrative Structure)**.',
                  misconception: '**Students treat inferential questions as "opinion questions" — they write what they *feel* the text means instead of what the text.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['** Give the student a 3-column table: | Question | Literal/Inferential?', '** For each inferential Q, force them to write **two direct quotes** before writing *any* explanation.', '** Use the "Devil\'s Advocate" drill: they must write *one counter-inference* from the same evidence (e.g., "ओकवट.', '** Re-diagnose with Diagnostic Q4 — if they still can\'t produce dialectical evidence, loop to c12_hin_a_cbse_17_006.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
