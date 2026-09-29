import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch12_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch12_p2',
    title: 'पाठ 12 · Part 2/3',
    subtitle: 'Follow a village postman who delivers an argument instead of a letter.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 12 · Part 2/3',
    chapters: ['c11_hin_ar_ch12'],
    nodeIds: ['c11_hin_ar_cbse_12_007', 'c11_hin_ar_cbse_12_008', 'c11_hin_ar_cbse_12_009', 'c11_hin_ar_cbse_12_010', 'c11_hin_ar_cbse_12_011', 'c11_hin_ar_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a villager deciding whether \'पढ़ ले\' is an order or an invitation', intro: 'A postman calls at the door and finds the letters useless to the woman inside — so he tries to hand her the alphabet itself.', goal: 'Read the poem as a narrative of persuasion and evaluate its open, imperative ending.' },
    discovery: {
        question: 'A postman urges an illiterate villager to learn letters; the poem ends on \'पढ़ ले!\' — does the villager learn to read by the end?',
        options: ['No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader', 'Yes — she reads her letter in the final stanza', 'Yes — literacy is achieved by stanza six', 'No — the postman gives up instead'],
        answer: 'No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader',
        hook: 'Agyeya the linguist wrote in the people\'s dialect on purpose — the poem isn\'t about letters, it\'s about reclaiming agency.',
    },
    teaching: [
        { title: 'पाठ 12 — गौण विषय', text: '\'पैक डकस डकस वपंजु न पुखरह\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the postman\'s arrival to the command \'पढ़ ले!\' as a narrative arc, then argue whether a revolutionary poet\'s literacy poem can be called propaganda.',
        labels: ['पाठ 12 — गौण', 'पाठ 12 — साहित्यिक', 'पाठ 12 — पदावली', 'पाठ 12 — व्याकरण', 'पाठ 12 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_008', title: 'पाठ 12 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'पैक डकस डकस वपंजु न पुखरह\' में बिंब ढूँढिए — पैक-डकस-डकस-वपंजु-न-पुखरह — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define "imagery" (बिंब) and "metaphor" (रूपक) in your own words, and give one original example of each that is NOT from the textbook.', options: [
                { text: 'Imagery: Language that activates the five senses to create a concrete mental picture', outcome: 'Imagery: Language that activates the five senses to create a concrete mental picture (e.g., "The.' },
                { text: 'Her silence was like a locked room', outcome: 'Not quite — Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as.', reveals: 'students-consistently-treat-repetition-of' },
                { text: 'absence of comparative particles', outcome: 'Not quite — Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as.', reveals: 'students-consistently-treat-repetition-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_011', title: 'पाठ 12 — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'पैक डकस डकस वपंजु न पुखरह\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'What is meant by \'language usage\' in the context of a literary text?', options: [
                { text: 'Language usage refers to the writer\'s deliberate choices in words, sentence structures,', outcome: 'Language usage refers to the writer\'s deliberate choices in words, sentence structures, and.' },
                { text: 'it means the language of the text', outcome: 'Not quite — Students think non-standard grammar in literature is "incorrect" or "mistakes" rather than.', reveals: 'non-standard-grammar-in-literature' },
                { text: 'incorrect', outcome: 'Not quite — Students think non-standard grammar in literature is "incorrect" or "mistakes" rather than.', reveals: 'non-standard-grammar-in-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_012', title: 'पाठ 12 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'पैक डकस डकस वपंजु न पुखरह\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'पैक डकस डकस वपंजु न पुखरह\' का केंद्रीय भाव और संदेश।',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information explicitly stated in the text (e.g., "What does', outcome: 'A literal question asks for information explicitly stated in the text (e.g., "What does the mother.' },
                { text: 'inference', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any personal guess.', reveals: 'students-often-treat-inferential-questions' },
                { text: 'imagination', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any personal guess.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is adapting Agyeya\'s poem — a postman urging an illiterate villager to read — for a street play. The adapter wants to add a narrator to \'explain the poet\'s sadness about illiteracy\' and soften the postman\'s command \'पढ़ ले!\' into polite persuasion.',
            decisions: [{ prompt: 'Why do both changes miss the poem\'s design?', options: [
                { text: 'Keep it narrative and keep the force: this isn\'t a lyric about sadness — it\'s a performed confrontation carried entirely in dialogue, no narrator needed. The structure runs exposition (postman\'s arrival) through rising action (the villager\'s shame, the persuasion) to the climax \'पढ़ ले!\' and resolves in a vision of empowerment. Softening the command defuses the turning point — and context sharpens it: an experimentalist poet in the literacy-campaign era making language itself a tool of liberation.', outcome: 'The play preserves the poem\'s engine: dialogue as structure, the command as climax — oral culture crossing into literacy onstage.' },
                { text: 'Add the narrator — an audience needs someone to state the theme clearly.', outcome: 'The poem deliberately works without narration: the two voices carry the whole arc, and a narrator converts performance into summary.', reveals: 'narrator-needed-for-theme' },
                { text: 'Soften the command — \'please try reading\' is kinder and more realistic persuasion.', outcome: 'The imperative is the climax — the moment agency is handed over; softening it turns a demand for liberation into a suggestion.', reveals: 'soften-the-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'The poem never shows her reading — the last word is a command left open, because the literacy it imagines was still unfinished business.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_007', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक.',
          hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो तुरंत नोड **c11_hin_ar_cbse_12_006** (मुख्य विषय और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'गौण विषय = कम शब्दों/प्रसंगों में आने वाला विषय\' — यानी मात्रात्मक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पैक डकस डकस वपंजु न पुखरह\' के गौण विषय',
                  options: ['\'पैक डकस डकस वपंजु न पुखरह\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'पैक डकस डकस वपंजु न पुखरह\' का कथानक', '\'पैक डकस डकस वपंजु न पुखरह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो तुरंत नोड **c11_hin_ar_cbse_12_006** (मुख्य विषय और संदेश) पर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'गौण विषय = कम शब्दों/प्रसंगों में आने वाला विषय\' — यानी मात्रात्मक (quantitative) आधार पर.' }
          ],
            remediations: { 'quantitative-functional-12': { steps: ['**चरण 1:** छात्र से कहें: "पाठ 12 के 3 प्रमुख पात्र चुनो जो नायक **नहीं** हैं। प्रत्येक का एक स्वतंत्र संघर्ष लिखो।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_008', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
          misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because.',
          parts: [
                { id: 'a', prompt: 'In the poem, the phrase "डक्यस डक्यस" (dark dark) appears repeatedly. Is this primarily an auditory image, a visual image, or a metaphor?', answer: '"डक्यस डक्यस" is primarily a **visual image** (दृश्य बिंब)',
                  options: ['"डक्यस डक्यस" is primarily a **visual image** (दृश्य बिंब)', 'डक्यस डक्यस', 'the poet repeats it so it must stand for something else'],
                  hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
                  misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because it is repeated, arguing.' },
                { id: 'b', prompt: 'The poem contains the line: "पैक लूँज ध यम्ढ गे" (Paik is the threshold\'s Yama).', answer: 'Tenor (उपमेय) = Paik',
                  options: ['Tenor (उपमेय) = Paik', 'Yama means death, so Paik brings death', 'threshold guardian', 'डक्यस डक्यस'],
                  hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
                  misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because it is repeated, arguing.' },
                { id: 'c', prompt: 'Compare the tactile imagery in "बुढ़ हक्क न्कोकोन्ह :ेक्फुर् ल्स् एक्द्र ग्स र्फ्क्क म्ल्दक ब्क्व ब्स्ब क्को ध त्केउ् ल्स् त्क्म्क ग्क्व्क" (Old language.', answer: 'The tactile image (dry roti sticking) conveys **resistance and discomfort**',
                  options: ['The tactile image (dry roti sticking) conveys **resistance and discomfort**', 'डक्यस डक्यस', 'the poet repeats it so it must stand for something else'],
                  hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
                  misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because it is repeated, arguing.' }
          ],
            remediations: { 'students-consistently-treat-repetition-of': { steps: ['**Isolate the device**: Give the student two stripped sentences — "The night was dark dark dark" (repetition + visual.', '"The night was a black blanket" (metaphor).', 'Ask: "Which one *says* A *is* B?" 2.', '**Map the senses**: Have the student draw a 5-column table (Sight, Sound, Smell, Touch, Taste) and place every.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because.',
          parts: [
                { id: 'a', prompt: 'Critique the following student interpretation: "The metaphor \'पैक वीएनह गे\' (Paik is a bird) means she is free and happy." Is this reading adequate?', answer: 'The reading is **inadequate**',
                  options: ['The reading is **inadequate**', 'डक्यस डक्यस', 'the poet repeats it so it must stand for something else'],
                  hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
                  misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because it is repeated, arguing.' }
          ],
            remediations: { 'students-consistently-treat-repetition-of': { steps: ['**Isolate the device**: Give the student two stripped sentences — "The night was dark dark dark" (repetition + visual.', '"The night was a black blanket" (metaphor).', 'Ask: "Which one *says* A *is* B?" 2.', '**Map the senses**: Have the student draw a 5-column table (Sight, Sound, Smell, Touch, Taste) and place every.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_009', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_12_008 (बिंब और रूपक)** के कार्यित उदाहरण.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **विरोधाभास = अलंकार (Figure of Speech) मात्र** है और **प्रतीक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पैक डकस डकस वपंजु न पुखरह\' में विरोधाभास',
                  options: ['\'पैक डकस डकस वपंजु न पुखरह\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'पैक डकस डकस वपंजु न पुखरह\' का कथानक', '\'पैक डकस डकस वपंजु न पुखरह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_12_008 (बिंब और रूपक)** के कार्यित उदाहरण (Worked.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **विरोधाभास = अलंकार (Figure of Speech) मात्र** है और **प्रतीक = स्थूल वस्तु का.' }
          ],
            remediations: { 'figure-of-speech': { steps: ['**मूलभूत भेद स्पष्ट करें:** छात्र से कहें — "विरोधाभास एक **कथन-रचना** (Statement-structure) है जो अर्थ का **तनाव**.', '**सूक्ष्म पाठ-अभ्यास दें:** पाठ 12 से 3-4 छोटे अंश दें जहां विरोधाभास/प्रतीक हों। छात्र से केवल **पहचान** न करवाएं.', '**तुलनात्मक विश्लेषण:** दो समान प्रतीकों (जैसे दो रचनाओं में \'दीया\') की तुलना करवाएं — दिखाएं कि **प्रसंग** कैसे प्रतीक.', '**लेखन-आधारित सुदृढ़ीकरण:** छात्र से एक पैराग्राफ लिखने को कहें जहां वह **एक विरोधाभास और एक प्रतीक का संयुक्त प्रयोग**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_010', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की.',
          hint: 'यदि अटके: **\'शब्द-रचना (Morphology)\'** की NCERT कक्षा ९-१० व्याकरण इकाई दोहराएँ — विशेषतः.',
          misconception: '**विशिष्ट भ्रांति:** *"पदावली में शब्द का **पहला शब्दकोशीय अर्थ** लिख देना पर्याप्त है।"* **वास्तविकता:** हिंदी के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पैक डकस डकस वपंजु न पुखरह\' की पदावली',
                  options: ['\'पैक डकस डकस वपंजु न पुखरह\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'पैक डकस डकस वपंजु न पुखरह\' का कथानक', '\'पैक डकस डकस वपंजु न पुखरह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **\'शब्द-रचना (Morphology)\'** की NCERT कक्षा ९-१० व्याकरण इकाई दोहराएँ — विशेषतः **कृदंत.',
                  misconception: '**विशिष्ट भ्रांति:** *"पदावली में शब्द का **पहला शब्दकोशीय अर्थ** लिख देना पर्याप्त है।"* **वास्तविकता:** हिंदी के **बहुअर्थी शब्द.' }
          ],
            remediations: { 'polysemous-words': { steps: ['**चरणबद्ध उपचार (Remediation):** १.', '**पृथक्करण अभ्यास:** छात्र को १० बहुअर्थी शब्द देकर **३-३ प्रसंग** में वाक्य बनाने को कहो (जैसे: *मृदु, कठोर, तीखा.', '**प्रसंग-चिह्नीकरण:** पाठ के वाक्य में **लक्ष्य शब्द को रेखांकित** करवाओ और पूछो: *"यहाँ शब्द किस \'अनुभूति\' को व्यक्त.', '**अर्थ-श्रेणी मिलान:** शब्दकोश के ३-४ अर्थ देकर पूछो: *"पाठ के वाक्य के लिए कौन सा अर्थ **सटीक बैठता है** और शेष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_011', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द.',
          hint: 'Review Class 10 Hindi grammar: verb conjugations, case endings, and common dialect.',
          misconception: 'Students think non-standard grammar in literature is "incorrect" or "mistakes" rather than deliberate reप्रस्तुति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पैक डकस डकस वपंजु न पुखरह\' में भाषा-प्रयोग',
                  options: ['\'पैक डकस डकस वपंजु न पुखरह\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'पैक डकस डकस वपंजु न पुखरह\' का कथानक', '\'पैक डकस डकस वपंजु न पुखरह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review Class 10 Hindi grammar: verb conjugations, case endings, and common dialect differences.',
                  misconception: 'Students think non-standard grammar in literature is "incorrect" or "mistakes" rather than deliberate reप्रस्तुति of speech communities.' }
          ],
            remediations: { 'non-standard-grammar-in-literature': { steps: ['Play an audio recording of a Bhojpuri speaker reading the poem; ask students to transcribe phonetically what they hear.', 'Create a three-column table: Dialect Word | Standard Hindi Equivalent | Grammatical Category (verb, adverb, etc.).', 'Discuss: "If Renu wrote *padhti* instead of *phUgrh*, what would the poem lose?" 4.', 'Practice converting two dialect lines to standard Hindi, then reading both aloud to hear the rhythmic difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_012', difficulty: 'standard',
          question: '\'पैक डकस डकस वपंजु न पुखरह\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, review the distinction between explicit statements and implied meanings using.',
          misconception: 'Students often treat inferential questions as "opinion questions" where any personal guess is valid.',
          parts: [
                { id: 'a', prompt: 'The poem states: "पैक लकुंज ध यM+ध गस" (The mother has a longing for the courtyard).', answer: 'This is an inferential question',
                  options: ['This is an inferential question', 'inference', 'imagination'],
                  hint: 'If stuck, review the distinction between explicit statements and implied meanings using simple.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any personal guess is valid.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['If a student gives an unsupported inference, do not say "read carefully." Instead: (1) Ask them to underline the exact.', '(2) If they cannot, guide them to the relevant stanza (e.g., the mother\'s dialogue in the third stanza).', '(3) Model the inference aloud: "The text says X, which suggests Y because..." (4) Have them rewrite the answer using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
