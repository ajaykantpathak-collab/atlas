import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch02_p2: SimDef = {
    id: 'v3_c12_hin_a_ch02_p2',
    title: 'सरोज स्मृति · Part 2/3',
    subtitle: 'He lost everything — and gained every register of the language',
    classLevel: 12, subject: 'hin_a', topic: 'सरोज स्मृति · Part 2/3',
    chapters: ['c12_hin_a_ch02'],
    nodeIds: ['c12_hin_a_cbse_02_007', 'c12_hin_a_cbse_02_008', 'c12_hin_a_cbse_02_009', 'c12_hin_a_cbse_02_010', 'c12_hin_a_cbse_02_011', 'c12_hin_a_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poet\'s biographer', intro: 'Three tragedies before forty — and a poetic range no one else matched. The biography explains the voice.', goal: 'Connect Nirala\'s losses and editorial life to his stylistic range and evolution beyond Chhayavad.' },
    discovery: {
        question: 'Orphaned young, widowed early, alone in a Kolkata boarding house — yet Nirala\'s poems celebrate life\'s fleeting beauty. How does grief become craft?',
        options: ['Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice', 'He suppressed the grief', 'Poetry was his therapy only', 'Luck and talent'],
        answer: 'Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice',
        hook: 'Nirala outgrew Chhayavad\'s self-centred lyricism — from subjective romance to epic history, satire and metaphysical inquiry. His language had \'many forms and levels\': the same pen wrote high-Sanskrit prayer and village-cornfield satire. Grief was the fuel; craft was the engine.',
    },
    teaching: [
        { title: 'सरोज स्मृति — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'अंतरा भाग-2 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a poet\'s alchemy: follow the losses that forged him, map his leap beyond Chhayavad\'s bounds, and hear one voice speak in epic Sanskrit and village Avadhi both.',
        labels: ['सरोज स्मृति — साहित्यिक', 'सरोज स्मृति — मुख्य', 'सरोज स्मृति — गौण', 'सरोज स्मृति — पदावली', 'सरोज स्मृति — व्याकरण', 'सरोज स्मृति — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_010', title: 'सरोज स्मृति — पदावली: कठिन शब्द और मुहावरे',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 2\' के मुख्य शब्द: पाठ-2 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'From the poem "ljkst Le`fr", the word *वकेवय* appears in the line "नस[kk fookg vkewy uoy".', options: [
                { text: 'Correct answer: *वकेवय* means "completely" or "entirely" (not just "alone" or "lonely")', outcome: 'Correct answer: *वकेवय* means "completely" or "entirely" (not just "alone" or "lonely").' },
                { text: 'lonely', outcome: 'Not quite — Students treat the NCERT glossary (*\'कन्कफकज व फवीक.ह*) as the *final* meaning.', reveals: 'students-treat-the-ncert-glossary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_011', title: 'सरोज स्मृति — व्याकरण: पद्य में भाषा-प्रयोग',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 2\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'What is the primary dialectal influence visible in the vocabulary of "लज्जत ले`fr" as noted in the NCERT introduction to Fujkyk\'s poetic.', options: [
                { text: 'The primary dialectal influence is Braj Bhasha (ब्रज भाषा), evident in words like "लेआन",', outcome: 'The primary dialectal influence is Braj Bhasha (ब्रज भाषा), evident in words like "लेआन".' },
                { text: 'Khari Boli', outcome: 'Not quite — Students believe "language usage analysis" means only listing difficult word meanings from the.', reveals: 'language-usage-analysis-means-only' },
                { text: 'Awadhi', outcome: 'Not quite — Students believe "language usage analysis" means only listing difficult word meanings from the.', reveals: 'language-usage-analysis-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re making a memorial film for a departed grandparent. The editor wants strict chronology — birth, childhood, marriage, death — \'so it\'s clear.\' Your best asset is a single fading photograph of her as a young woman.',
            decisions: [{ prompt: 'What does the structure of Agyeya\'s \'लज्जत लेखा\' advise?', options: [
                { text: 'Open on the photograph — let the frame\'s mystery pull the viewer back through fragments of her life and return to the portrait at the end; the non-linear circle enacts how memory actually holds the dead, and makes impermanence felt rather than stated.', outcome: 'The poem begins with a portrait because the trace is all that survives — starting there gives the viewer the poet\'s own shock of discovery; chronology would flatten the loss into a record.' },
                { text: 'Go chronological — clarity is respect, and audiences shouldn\'t have to piece a life together.', outcome: 'The chapter\'s counter is that order is meaning: the circular frame mimics the mind returning to a fixed image; a straight birth-to-death line dilutes the irony that only the image remains.', reveals: 'clarity-demands-chronology' },
                { text: 'Drop the photograph and structure the film around interviews with people who knew her.', outcome: 'That trades the anchor for testimony: the poem\'s power is the single surviving image holding a whole life — without it, the memories float unattached.', reveals: 'testimony-beats-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a life into its poetry — and see how Nirala turned personal catastrophe into the widest range in modern Hindi verse.',
            decisions: [{ prompt: 'What comes next? सरोज स्मृति · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सरोज स्मृति · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_007', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो कक्षा 11 के `c11_hin_a_cbse_13_007` (प्रतीक और बिंब — जाग तुझको दूर जाना) के.',
          misconception: 'छात्र समझते हैं कि **प्रतीक = रूपक (Metaphor)** और **बिंब = अलंकारिक भाषा**। वे "सरोज कमल-सी है" को रूपक मानकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो कक्षा 11 के `c11_hin_a_cbse_13_007` (प्रतीक और बिंब — जाग तुझको दूर जाना) के कार्यित.',
                  misconception: 'छात्र समझते हैं कि **प्रतीक = रूपक (Metaphor)** और **बिंब = अलंकारिक भाषा**। वे "सरोज कमल-सी है" को रूपक मानकर प्रतीक-व्याख्या बंद कर देते.' }
          ],
            remediations: { 'metaphor': { steps: ['**चरण 1:** छात्र से कहो — "कविता के किसी एक पद को चुनो और बताओ कि यहाँ कवि ने क्या **दिखाया** है और क्या **छिपाया**.', '(ब) इससे कौन-से बिंब बन सकते हैं?', '— उत्तर लिखवाओ और चर्चा करो। **चरण 4:** पुनः निदान हेतु `DIAGNOSTIC_QUESTION_3` और `DIAGNOSTIC_QUESTION_4` दोहराओ; यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_008', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो: नोड 002 (भावार्थ) से प्रसंग पढ़ो → नोड 007 (प्रतीक) से प्रतीक अर्थ लिखो →.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'मुख्य भाव\' (central theme)** और **\'केंद्रीय भाव/रस\' (dominant rasa/mood)** को एक मान लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो: नोड 002 (भावार्थ) से प्रसंग पढ़ो → नोड 007 (प्रतीक) से प्रतीक अर्थ लिखो → फिर इस नोड.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'मुख्य भाव\' (central theme)** और **\'केंद्रीय भाव/रस\' (dominant rasa/mood)** को एक मान लेते हैं। **ठीक-ठीक गलती:**.' }
          ],
            remediations: { 'central-theme-dominant-rasa-mood': { steps: ['**पुनः पढ़ो:** नोड 004 (केंद्रीय भाव और रस) का \'रस\' भाग दोबारा पढ़ो — रस और भाव का अंतर स्पष्ट करो। 2.', '**तालिका बनाओ:** एक कागज पर दो कॉलम बनाओ: **बायाँ — \'रस/भाव\' (करुण, शोक, विरह)**; **दायाँ — \'मुख्य भाव/संदेश\' (स्मृति.', '**परीक्षा-उत्तर अभ्यास:** नोड 014 (परीक्षा-उत्तर लेखन कौशल) का \'मुख्य भाव\' वाला मॉडल उत्तर देखो और PEEL संरचना में अपना.', '**पुनः निदान:** ऊपर दिए गए **DIAGNOSTIC_QUESTION_2** को फिर से हल करो — यदि अब सही कर पाए, तो अवधारणा स्पष्ट।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_009', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि आप गौण भाव की पहचान में फंस रहे हैं, तो कविता के प्रत्येक stanza को पढ़कर खुद से.',
          misconception: 'छात्र अक्सर मानते हैं कि गौण भाव केवल "सजावटी विवरण" या "अर्थहीन अतिरिक्त लाइनें" हैं जो कविता को लंबा करने के लिए डाले.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि आप गौण भाव की पहचान में फंस रहे हैं, तो कविता के प्रत्येक stanza को पढ़कर खुद से पूछिए: "इस.',
                  misconception: 'छात्र अक्सर मानते हैं कि गौण भाव केवल "सजावटी विवरण" या "अर्थहीन अतिरिक्त लाइनें" हैं जो कविता को लंबा करने के लिए डाले गए हैं — जैसे.' }
          ],
            remediations: { 'stanza-2-stanza-4': { steps: ['यदि छात्र गौण भाव को केवल सजावट मान रहा है, तो उसे कविता की एक stanza (जैसे stanza 2) देकर पूछिए: "यदि इस पंक्ति को हटा.', 'कैसे?" फिर उसे उत्तर लिखने के लिए प्रोत्साहित कीजिए — वह देखेगा कि बच्चों की हँसी हटाने से शांति एकाकी और निराशाजनक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_010', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, review the "Context Clue Types" table from Class 11 (node.',
          misconception: 'Students treat the NCERT glossary (*\'कन्कफकज व फवीक.ह*) as the *final* meaning.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review the "Context Clue Types" table from Class 11 (node c11_hin_ar_cbse_01_010).',
                  misconception: 'Students treat the NCERT glossary (*\'कन्कफकज व फवीक.ह*) as the *final* meaning. They write "*लचक* means *झुकना*" and stop.' }
          ],
            remediations: { 'students-treat-the-ncert-glossary': { steps: ['Have the student pick 3 words from the glossary they think they "know".', 'For each, find the exact line in the poem.', 'Ask: "If you replace this word with its glossary synonym, does the line lose something? What?"', 'Guide them to name the *added layer* (sound, image, contrast, cultural echo).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_011', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck, review Class 11 Grammar node c11_hin_ar_cbse_01_011 (verb aspects, compounds).',
          misconception: 'Students believe "language usage analysis" means only listing difficult word meanings from the glossary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review Class 11 Grammar node c11_hin_ar_cbse_01_011 (verb aspects, compounds) and.',
                  misconception: 'Students believe "language usage analysis" means only listing difficult word meanings from the glossary.' }
          ],
            remediations: { 'language-usage-analysis-means-only': { steps: ['Re-read the NCERT introductory paragraphs on Fujkyk\'s language varieties (provided in the reference text).', 'Take the first stanza and mark every verb form; classify each as perfective, habitual, or imperative using Class 11.', 'For each marked form, write one sentence on why the poet might have chosen it over the standard Khari Boli equivalent.', 'Discuss your findings with a peer or teacher, then re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "language usage analysis" means only listing difficult word meanings from the glossary.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The use of Braj Bhasha forms like \'लेआन\' and \'फुजक्यक\' in the poem is merely decorative and does not affect the poem\'s meaning." Defend.', answer: 'The claim is false',
                  options: ['The claim is false', 'language usage analysis'],
                  hint: 'If stuck, review Class 11 Grammar node c11_hin_ar_cbse_01_011 (verb aspects, compounds) and.',
                  misconception: 'Students believe "language usage analysis" means only listing difficult word meanings from the glossary.' }
          ],
            remediations: { 'language-usage-analysis-means-only': { steps: ['Re-read the NCERT introductory paragraphs on Fujkyk\'s language varieties (provided in the reference text).', 'Take the first stanza and mark every verb form; classify each as perfective, habitual, or imperative using Class 11.', 'For each marked form, write one sentence on why the poet might have chosen it over the standard Khari Boli equivalent.', 'Discuss your findings with a peer or teacher, then re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_012', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो c12_hin_a_cbse_02_007 (प्रतीक और बिंब) नोड के \'प्रतीक → अभिप्राय\' सारणी वाले.',
          misconception: 'छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर पाठ की पंक्तियाँ ज्यों-की-त्यों उद्धृत कर देना है**। वे लिखते हैं: "आशय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो c12_hin_a_cbse_02_007 (प्रतीक और बिंब) नोड के \'प्रतीक → अभिप्राय\' सारणी वाले खंड को.',
                  misconception: 'छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर पाठ की पंक्तियाँ ज्यों-की-त्यों उद्धृत कर देना है**। वे लिखते हैं: "आशय: \'तुम्हारी यह.' }
          ],
            remediations: { '1': { steps: ['यदि छात्र आशय-सूचक में पंक्तियाँ दोहराता है: **चरण 1:** उससे पूछें — "कवि ने \'धूलि-धूसर\' क्यों कहा?', 'क्या सरोज सच में गंदी थी?" — इससे शाब्दिक vs प्रतीकात्मक का भेद खुलेगा। **चरण 2:** c12_hin_a_cbse_02_007 (प्रतीक और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
