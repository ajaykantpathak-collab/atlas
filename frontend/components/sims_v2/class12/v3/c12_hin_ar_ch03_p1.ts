import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch03_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch03_p1',
    title: 'कवतिा के बहाने, बात सीधी थी पर · Part 1/3',
    subtitle: 'Words as toys — and as traitors',
    classLevel: 12, subject: 'hin_ar', topic: 'कवतिा के बहाने, बात सीधी थी पर · Part 1/3',
    chapters: ['c12_hin_ar_ch03'],
    nodeIds: ['c12_hin_ar_cbse_03_001', 'c12_hin_ar_cbse_03_002', 'c12_hin_ar_cbse_03_003', 'c12_hin_ar_cbse_03_004', 'c12_hin_ar_cbse_03_005', 'c12_hin_ar_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental poetry reader', intro: 'A post-independence generation decided poetry needed to stop singing and start thinking.', goal: 'Read the two poems through Nayi Kavita\'s break with Chhayavad — play, defamiliarisation and language\'s limits.' },
    discovery: {
        question: '\'Poetry is a house of fungus; poetry is a child\'s game.\' A generation raised on sacred verse reads this — and calls it rebellion. What\'s the real move?',
        options: ['Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped', 'An insult to poetry', 'A nursery rhyme', 'Random metaphors'],
        answer: 'Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped',
        hook: 'Nayi Kavita broke with Chhayavad\'s romantic music for intellectual rigour and colloquial language. The twin poems test language both ways — in one, words are playthings freely mixed; in the other, language stammers and fails the very experience it tries to hold. Play and failure are the same anxiety.',
    },
    teaching: [
        { title: 'कवतिा के बहाने, बात सीधी थी पर — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the experimental decade: watch words treated as toys and then as traitors, weigh whether the poem about failed speech itself succeeds, and feel where a generation broke with the old music.',
        labels: ['कवतिा के बहाने, बात'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_001', title: 'कवतिा के बहाने, बात सीधी थी पर — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 03 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Name the literary movement associated with Jaishankar Prasad and identify its one defining characteristic that distinguishes it from.', options: [
                { text: 'Jaishankar Prasad is associated with Nayi Kavita (New Poetry), specifically the Prayogvad', outcome: 'Jaishankar Prasad is associated with Nayi Kavita (New Poetry), specifically the Prayogvad.' },
                { text: 'Chhayavad', outcome: 'Not quite — Students treat "context" as a static list of facts (birth date, awards, movement name) to.', reveals: 'students-treat-context-as-a' },
                { text: 'Pragativad', outcome: 'Not quite — Students treat "context" as a static list of facts (birth date, awards, movement name) to.', reveals: 'students-treat-context-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_002', title: 'कवतिा के बहाने, बात सीधी थी पर — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 3\' का क्रम: शुरुआत आरोह-भाग-2-—-पाठ-3 से, घटनाएँ बढ़ती हैं, अंत \'आरोह भाग-2 पर।',
            decisions: [{ prompt: 'पद्यांश-वार भावार्थ और कविता के सारांश में मूल अंतर क्या है? एक वाक्य में लिखिए।', options: [
                { text: '**Correct Answer:** पद्यांश-वार भावार्थ प्रत्येक पद्यांश के सूक्ष्म भाव, बिंब और प्रसंग', outcome: '**Correct Answer:** पद्यांश-वार भावार्थ प्रत्येक पद्यांश के सूक्ष्म भाव, बिंब और प्रसंग की.' },
                { text: 'दोनों एक ही हैं', outcome: 'Not quite — **Specific Error:** Students treat "भावार्थ" as "शब्दार्थ" (word-meaning) or "अनुवाद".', reveals: 'specific-error-students-treat-as' },
                { text: 'भावार्थ बड़ा होता है', outcome: 'Not quite — **Specific Error:** Students treat "भावार्थ" as "शब्दार्थ" (word-meaning) or "अनुवाद".', reveals: 'specific-error-students-treat-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a student copywriting gig, your teammate wrestles a slogan for hours — forcing synonyms, then rage-quitting: \'The perfect word exists; I just have to grab it and pin it down.\'',
            decisions: [{ prompt: 'What does Raghuvir Sahay\'s \'बात सीधी थी पर\' say about hunting words?', options: [
                { text: 'Stop pinning — the poem shows a word slipping out of language\'s grip and the poet chasing it like a mischievous child; it merges into living language on its own, and the poet\'s job is to receive and restore it, not capture it by force.', outcome: 'The climax is the word\'s assimilation, not its capture — poetry emerges from the friction between word and experience, so wrestling harder is exactly what doesn\'t work.' },
                { text: 'Push harder — discipline means refusing to stop until the word submits.', outcome: 'That\'s the misreading of the chase: the word escapes precisely when gripped; the poem ends not with conquest but with the poet gently returning it to where it lives.', reveals: 'force-catches-words' },
                { text: 'Give up entirely — if words escape by nature, writing is luck, not labour.', outcome: 'The poem is about the poet\'s engaged pursuit, not passivity — the chase matters; what\'s released is the fantasy of total control, not the effort.', reveals: 'writing-is-pure-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read experimental poetry\'s double edge — language as both the only tool and the trap it can\'t escape.',
            decisions: [{ prompt: 'What comes next? कवतिा के बहाने, बात सीधी थी पर · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कवतिा के बहाने, बात सीधी थी पर · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, revisit Class 11 Chapter 12 (Muktibodh) "Before You Read" node.',
          misconception: 'Students treat "context" as a static list of facts (birth date, awards, movement name) to be memorised for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Compare the treatment of "language" in the two poems: "कविता के गुस्से" (where words are playthings) and "बात लह/ख थी" (where language fails to capture.', answer: 'In "कविता के गुस्से", language is material to mould',
                  options: ['In "कविता के गुस्से", language is material to mould', 'about language'],
                  hint: 'If stuck, revisit Class 11 Chapter 12 (Muktibodh) "Before You Read" node (c11_hin_ar_cbse_12_001).',
                  misconception: 'Students treat "context" as a static list of facts (birth date, awards, movement name) to be memorised for a 1-mark question.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Have the student re-read the NCERT "वककजसग" (introductory note) and underline every phrase linking Prasad\'s *life*.', 'For each underlined phrase, ask: "Which line in the poem does this explain?" — force a textual match.', 'Assign a 3-sentence writing task: "Explain how Prasad\'s journalism shapes the dialogue structure in \'बात लह/ख थी\'."', 'Re-diagnose using Diagnostic Question 2 — the student must now produce a historically grounded prediction, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "context" as a static list of facts (birth date, awards, movement name) to be memorised for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Jaishankar Prasad\'s \'बात लह/ख थी\' is a poem about the impossibility of communication." Support your judgement with two textual reasons.', answer: 'The claim is *partially true but incomplete*',
                  options: ['The claim is *partially true but incomplete*', 'yes, it\'s about impossibility', 'no, they communicate'],
                  hint: 'If stuck, revisit Class 11 Chapter 12 (Muktibodh) "Before You Read" node (c11_hin_ar_cbse_12_001).',
                  misconception: 'Students treat "context" as a static list of facts (birth date, awards, movement name) to be memorised for a 1-mark question.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Have the student re-read the NCERT "वककजसग" (introductory note) and underline every phrase linking Prasad\'s *life*.', 'For each underlined phrase, ask: "Which line in the poem does this explain?" — force a textual match.', 'Assign a 3-sentence writing task: "Explain how Prasad\'s journalism shapes the dialogue structure in \'बात लह/ख थी\'."', 'Re-diagnose using Diagnostic Question 2 — the student must now produce a historically grounded prediction, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_002', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ.',
          hint: 'If stuck, review "बिंब और प्रतीक की पहचान" from c11_hin_ar_cbse_16_006.',
          misconception: '**Specific Error:** Students treat "भावार्थ" as "शब्दार्थ" (word-meaning) or "अनुवाद" (translation).',
          parts: [
                { id: 'a', prompt: 'कविता के तीसरे और पाँचवें पद्यांश में \'समय\' की अवधारणा कैसे बदलती है? तुलनात्मक विश्लेषण कीजिए।', answer: '**Correct Answer:** तीसरे पद्यांश में समय \'देर\' (delay/struggle) के रूप में',
                  options: ['**Correct Answer:** तीसरे पद्यांश में समय \'देर\' (delay/struggle) के रूप में', 'दोनों में समय है', 'तीसरे में कम, पाँचवें में ज्यादा'],
                  hint: 'If stuck, review "बिंब और प्रतीक की पहचान" from c11_hin_ar_cbse_16_006 or c11_hin_a_cbse_13_006.',
                  misconception: '**Specific Error:** Students treat "भावार्थ" as "शब्दार्थ" (word-meaning) or "अनुवाद" (translation).' }
          ],
            remediations: { 'specific-error-students-treat-as': { steps: ['**Step-by-step Remediation:** 1.', '**Revisit Node c11_hin_ar_cbse_16_002 (आओ, मलिकर बचाएँ — पद्यांश-वार भावार्थ):** Pick *one stanza* from that poem.', 'Write its *literal translation* (शब्दार्थ) on left side of notebook.', 'On right side, write: "कवि यहाँ क्या *महसूस* कर रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_003', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'Review Class 11 poem analysis (c11_hin_ar_cbse_03_003) focusing on how setting.',
          misconception: 'Students often treat setting as merely "where the poem happens" and atmosphere as a simple adjective like "sad".',
          parts: [
                { id: 'a', prompt: 'Identify two concrete images from "ckr lh/h Fkh ij" that establish the setting of "bhasha ke dar par" (at the door of language).', answer: 'Images: (1) "Bhasha ke paddh mein" (at language\'s door)',
                  options: ['Images: (1) "Bhasha ke paddh mein" (at language\'s door)', 'vichar', 'picks abstract nouns (e'],
                  hint: 'Review Class 11 poem analysis (c11_hin_ar_cbse_03_003) focusing on how setting is established.',
                  misconception: 'Students often treat setting as merely "where the poem happens" and atmosphere as a simple adjective like "sad" or "happy".' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Revisit Class 11 node c11_hin_ar_cbse_03_003 (Setting and Atmosphere) and re-do the graphic organizer: column 1.', 'Pick a simple Hindi poem (e.g., from Class 10) and practice the 4-step aloud reading: (a) mark place/time words, (b).', 'Return to this node and re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_004', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck, revisit the distinction between \'poet\' and \'speaker\' using the Class 11 node.',
          misconception: 'Students often treat the poet-speaker as either (a) a fully fictional character like in a story, ignoring that the \'I\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-2 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, revisit the distinction between \'poet\' and \'speaker\' using the Class 11 node.',
                  misconception: 'Students often treat the poet-speaker as either (a) a fully fictional character like in a story, ignoring that the \'I\' is a deliberate.' }
          ],
            remediations: { 'students-often-treat-the-poet': { steps: ['Have the student re-read both poems *only* marking first-person statements ("मैं", "मेरे", implied "I") and.', 'Ask: "If you didn\'t know the poet\'s name, what kind of person would you imagine from these words alone?" List 5.', 'Practice the PEEL structure on one trait using the worked example as a template.', 'Re-attempt Diagnostic Question 4 to test if the shift from external to internal is now visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_005', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि मात्रा गिनने में अटकें: "संयुक्त व्यंजन और अनुस्वार को गुरु मानना भूल गये हैं".',
          misconception: '**छात्र समझते हैं: "छंद पहचानना = मात्रा गिनकर छंद का नाम बता देना।"** **वास्तविकता:** बोर्ड/प्रतियोगी परीक्षा में पूछा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 3\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'आरोह भाग-2 — पाठ 3\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मात्रा गिनने में अटकें: "संयुक्त व्यंजन और अनुस्वार को गुरु मानना भूल गये हैं" — कक्षा 11.',
                  misconception: '**छात्र समझते हैं: "छंद पहचानना = मात्रा गिनकर छंद का नाम बता देना।"** **वास्तविकता:** बोर्ड/प्रतियोगी परीक्षा में पूछा जाता है — *"छंद की.' }
          ],
            remediations: { 'rhythm-meaning-link': { steps: ['**तुरंत अभ्यास:** कक्षा 11 के छंद नोड्स (c11_hin_ar_cbse_16_005, c11_hin_a_cbse_13_005) से 5 पंक्तियाँ लेकर मात्रा-गणना.', '**लय-भाव जोड़:** वही पंक्तियाँ दो बार पढ़ो — पहली बार यन्त्रवत्, दूसरी बार भाव देकर; रिकॉर्ड करो और अंतर सुनो। 3.', '**पुनः निदान:** ऊपर का Diagnostic Q4 फिर से हल करो; यदि अब भी लय-भाव लिंक न बने, तो शिक्षक से \'गुरु-लघु का भाव-प्रभाव\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_006', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 3\' का केंद्रीय भाव और.',
          hint: 'यदि अटके: c11_hin_a_cbse_01_009 के "उपमा vs उत्प्रेक्षा" तुलना सारणी को दोबारा बनाएँ — 3.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "उपमा" और "उत्प्रेक्षा" एक ही हैं क्योंकि दोनों में तुलना होती है — वे पंक्ति "बात.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 3\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 3\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-2 — पाठ 3\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 3\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: c11_hin_a_cbse_01_009 के "उपमा vs उत्प्रेक्षा" तुलना सारणी को दोबारा बनाएँ — 3 उदाहरण.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "उपमा" और "उत्प्रेक्षा" एक ही हैं क्योंकि दोनों में तुलना होती है — वे पंक्ति "बात सीधी थी पर / उसमें.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **c11_hin_a_cbse_01_009** (विरोधाभास और प्रतीक) और **c11_hin_ar_cbse_13_006** (जाग तुझको दूर जाना — अलंकार).', '5 पंक्तियाँ दें जिनमें \'जैसे/वैसे\' हो — छात्र से कहें: प्रत्येक में पहचानें कि उपमेय-उपमान अलग हैं (उपमा) या कवि ने.', 'पुनः निदान: उपरोक्त DIAGNOSTIC_QUESTION_2 फिर से दें — यदि अब सही उत्तर दे, तो आगे बढ़ें; नहीं तो c11_hin_a_cbse_13_006.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
