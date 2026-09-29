import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch07_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch07_p1',
    title: 'कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप · Part 1/3',
    subtitle: 'He wrote the Ramayana where everyone could reach it',
    classLevel: 12, subject: 'hin_ar', topic: 'कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप · Part 1/3',
    chapters: ['c12_hin_ar_ch07'],
    nodeIds: ['c12_hin_ar_cbse_07_001', 'c12_hin_ar_cbse_07_002', 'c12_hin_ar_cbse_07_003', 'c12_hin_ar_cbse_07_004', 'c12_hin_ar_cbse_07_005', 'c12_hin_ar_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-poetry scholar', intro: 'Four hundred years ago, a saint decided God\'s story belonged in the marketplace tongue. Hindi was never the same.', goal: 'Place Tulsidas in the Bhakti movement and read his five chhands as form fitted to feeling.' },
    discovery: {
        question: 'In 16th-century India, scripture lived only in Sanskrit — until Tulsidas retold the Ramayana in everyday Awadhi. What made that one language choice revolutionary?',
        options: ['It broke the priestly monopoly — women, Shudras and the unlettered could finally reach the sacred story directly; vernacular became literature', 'Awadhi was more poetic', 'Sanskrit was forgotten', 'He didn\'t know Sanskrit'],
        answer: 'It broke the priestly monopoly — women, Shudras and the unlettered could finally reach the sacred story directly; vernacular became literature',
        hook: 'His five forms here aren\'t experiments — they\'re classical metres mastered and matched to mood: चप्पय\'s even matras for philosophy, दोहा\'s rolling asymmetry for narrative. Variety is discipline, not rebellion; form follows function.',
    },
    teaching: [
        { title: 'कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the Bhakti workshop: place Tulsidas among the saints, learn what each chhand is built to carry, and weigh how a \'simple\' language shift levelled a hierarchy.',
        labels: ['कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_001', title: 'कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 07 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who was Goswami Tulsidas, and what is his most famous work? (Answer in 1-2 sentences.)', options: [
                { text: 'Goswami Tulsidas (c', outcome: 'Goswami Tulsidas (c. 1532–1623) was a 16th-century Ramanandi Vaishnava saint and poet, best known.' },
                { text: 'Surdas or Kabir, or citing the *Mahabharata*', outcome: 'Not quite — Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.', reveals: 'all-five-poems-in-this' },
                { text: 'all five poems in this chapter are excerpts from the *Ramcharitmanas*', outcome: 'Not quite — Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.', reveals: 'all-five-poems-in-this' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_003', title: 'कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप — काव्य-संरचना और पद्य-विन्यास',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 7\' का परिवेश: \'आरोह भाग-2 — पाठ 7\' — आरोह भाग-2 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्तक — स्थान और समय मिलकर माहौल बनाते हैं।',
            decisions: [{ prompt: 'Identify two specific phrases from the first poem of "dforkoyh" (beginning with "fdlch fdlku...") that establish the rural village setting.', options: [
                { text: 'Correct answer: "isV dh vkx" (sugarcane juice) reveals agricultural economy and local', outcome: 'Correct answer: "isV dh vkx" (sugarcane juice) reveals agricultural economy and local produce.' },
                { text: 'the poem is set in a village', outcome: 'Not quite — Students believe "setting = place name only" and "atmosphere = mood adjective only".', reveals: 'setting-place-name-only-and' },
                { text: 'setting = place name only', outcome: 'Not quite — Students believe "setting = place name only" and "atmosphere = mood adjective only".', reveals: 'setting-place-name-only-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_005', title: 'कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप — छंद और लय-विधान',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 7\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'In the poem "y{e.k&ewPNkZ", which specific line shows Bharat\'s explicit rejection of royal comforts, and what single word in that line.', options: [
                { text: 'The line is "feyb u txr lgksnj Hkzkrk"', outcome: 'The line is "feyb u txr lgksnj Hkzkrk" — the word "lgksnj" (like a hermit/ascetic) signals Bharat\'s.' },
                { text: 'mgk¡ jke yfNeufg fugkjh', outcome: 'Not quite — Students treat "supporting character analysis" as listing traits (loyal, brave, sad) rather than.', reveals: 'students-treat-supporting-character-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_006', title: 'कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप — साहित्यिक युक्तियाँ: अलंकार',
          caseStudy: { intro: 'सब घटनाएँ \'आरोह भाग-2 — पाठ 7\' में \'आरोह भाग-2 — पाठ 7\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the definition of \'primary theme\' in a literary text, and how does it differ from the plot?', options: [
                { text: 'The primary theme is the central idea or universal insight about life/human nature that', outcome: 'The primary theme is the central idea or universal insight about life/human nature that the work.' },
                { text: 'Theme is Rama\'s exile', outcome: 'Not quite — Students often think the primary theme is "Rama is God" or "Tulsidas wrote Ramcharitmanas" — i.e.', reveals: 'the-primary-theme-is-rama' },
                { text: 'Rama is God', outcome: 'Not quite — Students often think the primary theme is "Rama is God" or "Tulsidas wrote Ramcharitmanas" — i.e.', reveals: 'the-primary-theme-is-rama' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re cutting a farewell video for a beloved coach. A teammate says the interview clips where the players hesitate before thanking him \'break the flow\' and should be dropped so the highlight reel stays \'propulsive.\'',
            decisions: [{ prompt: 'What would Tulsidas\'s design of the Guha episode argue?', options: [
                { text: 'Keep the hesitations — Tulsidas plants a doha where Guha pauses before letting Rama touch his feet precisely because the pause enacts his inner conflict; the interludes are where character interiority lives, not flow-breakers.', outcome: 'The chapter shows each poetic form sits at a deliberate narrative position — ask \'what would be lost if this were removed\'; in the video, what would be lost is the players\' love made visible as speech-failure.' },
                { text: 'Drop them — momentum is structure; pauses are where viewers swipe away.', outcome: 'That treats the poems in the Manas as decoration between plot points; the chapter\'s test is that the doha does narrative work prose can\'t — it performs devotion rather than describing it.', reveals: 'pauses-are-dead-air' },
                { text: 'Keep the clips but move them all to the end as an \'emotional section\' so they don\'t interrupt the action.', outcome: 'Tulsidas interleaves forms inside the episode rather than appending them — interiority must punctuate the action to mean anything; quarantined at the end it becomes a credits-roll extra.', reveals: 'emotion-belongs-at-the-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Tulsidas as both devotion and democratisation — metre chosen with a craftsman\'s ear, language chosen with a leveller\'s heart.',
            decisions: [{ prompt: 'What comes next? कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कवतिावली (उत्तरकांड से), लक्ष्मण-मूर्च्छा और राम का वलिाप · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 (c11_hin_ar_cbse_01_001) \'Before You Read\'.',
          misconception: 'Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.',
          parts: [
                { id: 'a', prompt: 'Who was Goswami Tulsidas, and what is his most famous work? (Answer in 1-2 sentences.)', answer: 'Goswami Tulsidas (c',
                  options: ['Goswami Tulsidas (c', 'Surdas or Kabir, or citing the *Mahabharata*', 'all five poems in this chapter are excerpts from the *Ramcharitmanas*'],
                  hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 (c11_hin_ar_cbse_01_001) \'Before You Read\' which.',
                  misconception: 'Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.' },
                { id: 'b', prompt: 'Given the following metrical description, identify the poetic form (chhand) used in the first poem of this chapter (dforkoyh): "Each stanza has four lines.', answer: 'The form is **pkSikbZ** (चप्पय)',
                  options: ['The form is **pkSikbZ** (चप्पय)', 'A wrong answer like', 'chaupai', 'all five poems in this chapter are excerpts from the *Ramcharitmanas*'],
                  hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 (c11_hin_ar_cbse_01_001) \'Before You Read\' which.',
                  misconception: 'Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.' },
                { id: 'c', prompt: 'Compare the poetic form *nksgk* (used in the second poem) with *pkSikbZ* (used in the first).', answer: '*pkSikbZ* (4 lines × 16 matras) creates a balanced, meditative rhythm suited for',
                  options: ['*pkSikbZ* (4 lines × 16 matras) creates a balanced, meditative rhythm suited for', 'analyze', 'all five poems in this chapter are excerpts from the *Ramcharitmanas*'],
                  hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 (c11_hin_ar_cbse_01_001) \'Before You Read\' which.',
                  misconception: 'Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.' }
          ],
            remediations: { 'all-five-poems-in-this': { steps: ['Re-read the NCERT \'Before You Read\' box (page 39-40) and highlight every work-title mentioned (Kavitavali, Gitavali.', 'Create a 2-column table: Column A = Poem name in chapter (dforkoyh, nksgk, etc.), Column B = Source work (from textbook.', 'Watch a 10-minute YouTube video "Tulsidas ki pramukh rachnayein" (search in Hindi) to hear the works named aloud.', 'Re-attempt Diagnostic Question 4 — if you can now say "dforkoyh is from Kavitavali, hence philosophical," the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Tulsidas\'s use of multiple chhands in a single chapter shows he was experimenting with form, not following tradition." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'experimentation', 'modernist experimentation', 'all five poems in this chapter are excerpts from the *Ramcharitmanas*'],
                  hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 (c11_hin_ar_cbse_01_001) \'Before You Read\' which.',
                  misconception: 'Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.' },
                { id: 'b', prompt: 'Write a *doha* (2 lines, 24+24 matras) in Tulsidas\'s style on the theme "Guru\'s grace," using the vocabulary register (tatsam + tadbhav mix) typical of his.', answer: 'A valid attempt must: (1) Use exactly two lines',
                  options: ['A valid attempt must: (1) Use exactly two lines', 'all five poems in this chapter are excerpts from the *Ramcharitmanas*'],
                  hint: 'If stuck, review Class 11 Hindi Aroh Chapter 1 (c11_hin_ar_cbse_01_001) \'Before You Read\' which.',
                  misconception: 'Students believe all five poems in this chapter are excerpts from the *Ramcharitmanas*.' }
          ],
            remediations: { 'all-five-poems-in-this': { steps: ['Re-read the NCERT \'Before You Read\' box (page 39-40) and highlight every work-title mentioned (Kavitavali, Gitavali.', 'Create a 2-column table: Column A = Poem name in chapter (dforkoyh, nksgk, etc.), Column B = Source work (from textbook.', 'Watch a 10-minute YouTube video "Tulsidas ki pramukh rachnayein" (search in Hindi) to hear the works named aloud.', 'Re-attempt Diagnostic Question 4 — if you can now say "dforkoyh is from Kavitavali, hence philosophical," the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_002', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 7\' का कथानक — \'आरोह भाग-2 — पाठ 7\' — आरोह भाग-2 का पाठ। पाठ.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_13_006 (अलंकार)** और **c11_hin_ar_cbse_13_004 (रस)** को.',
          misconception: '**छात्र अक्सर समझते हैं कि राम का विलाप \'कमज़ोरी\' या \'मोह-माया\' है**, क्योंकि वे राम को केवल \'ईश्वर/अवतार\' के फ्रेम में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 7\' का कथानक — \'आरोह भाग-2 — पाठ 7\' — आरोह भाग-2 का पाठ। पाठ का कथानक,',
                  options: ['\'आरोह भाग-2 — पाठ 7\' का कथानक — \'आरोह भाग-2 — पाठ 7\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 7\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-2 — पाठ 7\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_13_006 (अलंकार)** और **c11_hin_ar_cbse_13_004 (रस)** को दोबारा पढ़ें.',
                  misconception: '**छात्र अक्सर समझते हैं कि राम का विलाप \'कमज़ोरी\' या \'मोह-माया\' है**, क्योंकि वे राम को केवल \'ईश्वर/अवतार\' के फ्रेम में देखते हैं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** कक्षा 11 के नोड **c11_hin_ar_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव और रस)** और.', '**अभ्यास करें:** इसी अध्याय के **c12_hin_ar_cbse_07_001 (पृष्ठभूमि और रचनाकार परिचय)** से तुलसीदास का \'लीला-दर्शन\'.', '**लिखित अभ्यास:** पद्यांश के **प्रत्येक पद का अन्वय (गद्य रूप) लिखें**, फिर **अलंकार-छंद-रस की सारणी बनाएँ**। 4.', '**पुनः निदान:** उपरोक्त **DIAGNOSTIC_QUESTION_4 और 5** को दोबारा हल करें — अबकी बार **\'विभाव-अनुभाव-व्यभिचारी\' और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_003', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 7\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'If stuck, review Class 11 "Text: Setting and Atmosphere" (c11_hin_ar_cbse_07_003).',
          misconception: 'Students believe "setting = place name only" and "atmosphere = mood adjective only". They write: "Setting is village.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 7\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'आरोह भाग-2 — पाठ 7\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 7\' का कथानक — \'आरोह भाग-2 — पाठ 7\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 7\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review Class 11 "Text: Setting and Atmosphere" (c11_hin_ar_cbse_07_003) — specifically.',
                  misconception: 'Students believe "setting = place name only" and "atmosphere = mood adjective only". They write: "Setting is village.' }
          ],
            remediations: { 'setting-place-name-only-and': { steps: ['If the student cannot move beyond "setting = village, atmosphere = sad": Step 1 — Have them re-read only the first.', 'Step 2 — Ask: "If you remove these words, what is lost?" Guide them to see the poem becomes abstract.', 'Step 3 — Give them a 3-column table: Column A = Textual phrase, Column B = Sense appealed to (sight/smell/etc.), Column.', 'Step 4 — Assign: Do the same for stanza 1 of "èkwr dgkS..." independently.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_004', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 7\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि रस-सूत्र के अवयव भूल गए हों, तो **c11_hin_ar_cbse_16_004** (कक्षा 11 की \'आओ, मिलकर.',
          misconception: '**भ्रम:** *"करुण रस = केवल रोना/शोक व्यक्त करना।"* **वास्तविकता:** करुण रस की निष्पत्ति के लिए **विभाव-अनुभाव-व्यभिचारी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 7\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-2 — पाठ 7\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 7\' का कथानक — \'आरोह भाग-2 — पाठ 7\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 7\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि रस-सूत्र के अवयव भूल गए हों, तो **c11_hin_ar_cbse_16_004** (कक्षा 11 की \'आओ, मिलकर बचाएँ\' कविता.',
                  misconception: '**भ्रम:** *"करुण रस = केवल रोना/शोक व्यक्त करना।"* **वास्तविकता:** करुण रस की निष्पत्ति के लिए **विभाव-अनुभाव-व्यभिचारी का सुसंगत संयोग**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ो** c12_hin_ar_cbse_07_001 (पृष्ठभूमि/रचनाकार) — तुलसीदास का **भक्ति-दर्शन** समझो। 2.', '**अभ्यास करो** c12_hin_ar_cbse_07_002 (कथानक) — प्रसंग की **क्रमबद्धता** पक्की करो। 3.', '**लिखो** एक तालिका: विभाव (आलम्बन/उद्दीपन), अनुभाव (कायिक/सात्त्विक), व्यभिचारी — प्रत्येक के सामने पंक्ति-संदर्भ सहित।.', '**परीक्षण:** किसी मित्र को समझाओ कि *"राम का गिरना केवल नाटक नहीं, करुण रस का कायिक अनुभाव है"* — यदि तुम स्पष्ट कर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_005', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 7\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'If stuck on locating evidence, review c12_hin_ar_cbse_07_002 (Plot) to map which poem.',
          misconception: 'Students treat "supporting character analysis" as listing traits (loyal, brave, sad) rather than analyzing *structural.',
          parts: [
                { id: 'a', prompt: 'In the poem "y{e.k&ewPNkZ", which specific line shows Bharat\'s explicit rejection of royal comforts, and what single word in that line signals his ascetic.', answer: 'The line is "feyb u txr lgksnj Hkzkrk"',
                  options: ['The line is "feyb u txr lgksnj Hkzkrk"', 'mgk¡ jke yfNeufg fugkjh'],
                  hint: 'If stuck on locating evidence, review c12_hin_ar_cbse_07_002 (Plot) to map which poem covers which.',
                  misconception: 'Students treat "supporting character analysis" as listing traits (loyal, brave, sad) rather than analyzing *structural function*.' },
                { id: 'b', prompt: 'Explain in your own words why Tulsidas portrays Bharat weeping ("eu egq¡ tkr ljkgr") while receiving Rama\'s sandals, rather than showing him calm or resolute.', answer: 'Bharat\'s tears humanize his devotion',
                  options: ['Bharat\'s tears humanize his devotion', 'it shows he is sad'],
                  hint: 'If stuck on locating evidence, review c12_hin_ar_cbse_07_002 (Plot) to map which poem covers which.',
                  misconception: 'Students treat "supporting character analysis" as listing traits (loyal, brave, sad) rather than analyzing *structural function*.' }
          ],
            remediations: { 'students-treat-supporting-character-analysis': { steps: ['If a student gives trait-list answers: (1) Have them re-read the board marking scheme for "character analysis".', '(2) Assign a 5-minute drill: pick ONE doha about Bharat, write *only* the function sentence: "This line shows Bharat.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_07_006', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 7\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 7\' का केंद्रीय भाव और.',
          hint: 'If stuck, revisit the "Theme vs Topic" table in c11_hin_ar_cbse_07_006 and practice with.',
          misconception: 'Students often think the primary theme is "Rama is God" or "Tulsidas wrote Ramcharitmanas" — i.e., they state the.',
          parts: [
                { id: 'a', prompt: 'In the poem "fdlch fdlku", the line "isV gh dks ipr] cspr csVk&csVdh" (the arrow alone is the support, it saves again and again) appears.', answer: 'Step 1: Identify the symbol',
                  options: ['Step 1: Identify the symbol', 'the arrow saves them', 'Rama is God', 'Tulsidas wrote Ramcharitmanas'],
                  hint: 'If stuck, revisit the "Theme vs Topic" table in c11_hin_ar_cbse_07_006 and practice with the three.',
                  misconception: 'Students often think the primary theme is "Rama is God" or "Tulsidas wrote Ramcharitmanas" — i.e., they state the *subject* or a *fact*.' }
          ],
            remediations: { 'the-primary-theme-is-rama': { steps: ['If a student cannot distinguish theme from topic: 1) Give them three परिचित stories (e.g., Cinderella, Mahabharata,.', '2) Return to node c12_hin_ar_cbse_07_002 (Plot) and c12_hin_ar_cbse_07_004 (Protagonist) — have them list plot points.', '4) Re-diagnose with DIAGNOSTIC_QUESTION_2 after 2 days.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
