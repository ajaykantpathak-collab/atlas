import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch03_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch03_p2',
    title: 'कवतिा के बहाने, बात सीधी थी पर · Part 2/3',
    subtitle: 'Words as toys — and as traitors',
    classLevel: 12, subject: 'hin_ar', topic: 'कवतिा के बहाने, बात सीधी थी पर · Part 2/3',
    chapters: ['c12_hin_ar_ch03'],
    nodeIds: ['c12_hin_ar_cbse_03_007', 'c12_hin_ar_cbse_03_008', 'c12_hin_ar_cbse_03_009', 'c12_hin_ar_cbse_03_010', 'c12_hin_ar_cbse_03_011', 'c12_hin_ar_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental poetry reader', intro: 'A post-independence generation decided poetry needed to stop singing and start thinking.', goal: 'Read the two poems through Nayi Kavita\'s break with Chhayavad — play, defamiliarisation and language\'s limits.' },
    discovery: {
        question: '\'Poetry is a house of fungus; poetry is a child\'s game.\' A generation raised on sacred verse reads this — and calls it rebellion. What\'s the real move?',
        options: ['Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped', 'An insult to poetry', 'A nursery rhyme', 'Random metaphors'],
        answer: 'Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped',
        hook: 'Nayi Kavita broke with Chhayavad\'s romantic music for intellectual rigour and colloquial language. The twin poems test language both ways — in one, words are playthings freely mixed; in the other, language stammers and fails the very experience it tries to hold. Play and failure are the same anxiety.',
    },
    teaching: [
        { title: 'कवतिा के बहाने, बात सीधी थी पर — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'आरोह भाग-2 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the experimental decade: watch words treated as toys and then as traitors, weigh whether the poem about failed speech itself succeeds, and feel where a generation broke with the old music.',
        labels: ['कवतिा के बहाने, बात'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_009', title: 'कवतिा के बहाने, बात सीधी थी पर — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 3\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'In "dfork ds cgkus," the line "dfork ,d mM+ku gS fpfM+;k osQ cgkus" (Poetry is a house-building for the purpose of playing) contains what.', options: [
                { text: 'Correct answer: Situational irony', outcome: 'Correct answer: Situational irony — poetry is traditionally considered serious, elevated art (mM+ku.' },
                { text: 'verbal irony', outcome: 'Not quite — Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational.', reveals: 'students-consistently-confuse-verbal-irony' },
                { text: 'no irony, it\'s just a metaphor', outcome: 'Not quite — Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational.', reveals: 'students-consistently-confuse-verbal-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_010', title: 'कवतिा के बहाने, बात सीधी थी पर — पदावली: कठिन शब्द और मुहावरे',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 3\' के मुख्य शब्द: आरोह-भाग-2-—-पाठ-3 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary difference between a word\'s *dictionary meaning* (vk\'kq fyfi vFkZ) and its *contextual meaning* (lfgr vFkZ) in a poem?', options: [
                { text: '**Correct Answer:** Dictionary meaning is fixed, universal, and decontextualized', outcome: '**Correct Answer:** Dictionary meaning is fixed, universal, and decontextualized.' },
                { text: 'they are the same', outcome: 'Not quite — **The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard.', reveals: 'the-dictionary-trap-students-believe' },
                { text: 'contextual meaning is just a synonym', outcome: 'Not quite — **The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard.', reveals: 'the-dictionary-trap-students-believe' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a student copywriting gig, your teammate wrestles a slogan for hours — forcing synonyms, then rage-quitting: \'The perfect word exists; I just have to grab it and pin it down.\'',
            decisions: [{ prompt: 'What does Raghuvir Sahay\'s \'बात सीधी थी पर\' say about hunting words?', options: [
                { text: 'Stop pinning — the poem shows a word slipping out of language\'s grip and the poet chasing it like a mischievous child; it merges into living language on its own, and the poet\'s job is to receive and restore it, not capture it by force.', outcome: 'The climax is the word\'s assimilation, not its capture — poetry emerges from the friction between word and experience, so wrestling harder is exactly what doesn\'t work.' },
                { text: 'Push harder — discipline means refusing to stop until the word submits.', outcome: 'That\'s the misreading of the chase: the word escapes precisely when gripped; the poem ends not with conquest but with the poet gently returning it to where it lives.', reveals: 'force-catches-words' },
                { text: 'Give up entirely — if words escape by nature, writing is luck, not labour.', outcome: 'The poem is about the poet\'s engaged pursuit, not passivity — the chase matters; what\'s released is the fantasy of total control, not the effort.', reveals: 'writing-is-pure-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read experimental poetry\'s double edge — language as both the only tool and the trap it can\'t escape.',
            decisions: [{ prompt: 'What comes next? कवतिा के बहाने, बात सीधी थी पर · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कवतिा के बहाने, बात सीधी थी पर · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_007', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटका महसूस हो तो **तुरंत** कक्षा 11 नोड `c11_hin_ar_cbse_13_007` (जाग तुझको दूर जाना.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **"बिंब = रूपक (metaphor)"** मान लेते हैं क्योंकि दोनों तुलना करते दीखते हैं। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-2 — पाठ 3\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका महसूस हो तो **तुरंत** कक्षा 11 नोड `c11_hin_ar_cbse_13_007` (जाग तुझको दूर जाना — प्रतीक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **"बिंब = रूपक (metaphor)"** मान लेते हैं क्योंकि दोनों तुलना करते दीखते हैं। उदाहरण: "पसीने की तरह फिसलते.' }
          ],
            remediations: { 'metaphor': { steps: ['**पुनः पढ़ें:** कक्षा 11 आरोह के किसी भी काव्य नोड (जैसे `c11_hin_ar_cbse_13_007` या `c11_hin_ar_cbse_16_007`) का \'बिंब.', '**अभ्यास:** उसी कविता से 5 बिंब छाँट कर इंद्रिय-वार वर्गीकृत करें (दृश्य/श्रवण/स्पर्श/घ्राण/स्वाद)। 3.', '**परीक्षण:** इस नोड के **DIAGNOSTIC_QUESTION_2** को फिर से हल करें — यदि अब स्पर्श-बिंब सही पहचाना, तो आगे बढ़ें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_008', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'अगर बिंबों की प्रतीकात्मकता स्पष्ट न हो, तो c12_hin_ar_cbse_03_006 (बिंब-रूपक) और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः मान लेते हैं कि कविता का "मुख्य भाव" = **कवि की व्यक्तिगत मनोदशा (mood)** है — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'आरोह भाग-2 — पाठ 3\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर बिंबों की प्रतीकात्मकता स्पष्ट न हो, तो c12_hin_ar_cbse_03_006 (बिंब-रूपक) और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र प्रायः मान लेते हैं कि कविता का "मुख्य भाव" = **कवि की व्यक्तिगत मनोदशा (mood)** है — जैसे "कवि निराश है", "कवि.' }
          ],
            remediations: { 'mood': { steps: ['छात्र से कहें: "कविता की कोई तीन पंक्तियाँ चुनो जहाँ \'मैं\' आया हो। अब प्रत्येक पंक्ति में \'मैं\' की जगह \'हर मनुष्य\' रखकर.', 'फिर पूछें: "कवि थका हुआ है — यह कहाँ लिखा है?', 'कौन-सा शब्द \'थकान\' कहता है?', 'क्या \'थकान\' के बाद \'रुकने में दर्द\' नहीं लिखा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_009', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the "Irony Types" and "Symbol vs. Metaphor" tables in Class 11 Hindi.',
          misconception: 'Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational irony* (outcome.',
          parts: [
                { id: 'a', prompt: 'In "dfork ds cgkus," the line "dfork ,d mM+ku gS fpfM+;k osQ cgkus" (Poetry is a house-building for the purpose of playing) contains what type of irony?', answer: 'Correct answer: Situational irony',
                  options: ['Correct answer: Situational irony', 'verbal irony', 'no irony, it\'s just a metaphor'],
                  hint: 'If stuck, review the "Irony Types" and "Symbol vs. Metaphor" tables in Class 11 Hindi Aroh Chapter.',
                  misconception: 'Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational irony* (outcome contradicts expectation).' },
                { id: 'b', prompt: 'The poem "ckr lh/h Fkh ij" ends with the speaker throwing the speech (ckr) "like curd" (dhy dh rjg Bksad fn;k).', answer: 'Correct answer: Curd (dhy) symbolizes language that has *coagulated*',
                  options: ['Correct answer: Curd (dhy) symbolizes language that has *coagulated*', 'curd is white and pure', 'it\'s just a random comparison'],
                  hint: 'If stuck, review the "Irony Types" and "Symbol vs. Metaphor" tables in Class 11 Hindi Aroh Chapter.',
                  misconception: 'Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational irony* (outcome contradicts expectation).' },
                { id: 'c', prompt: 'Compare the symbolism of "ghar" (house) in "dfork ds cgkus" with "isap" (snake) in "ckr lh/h Fkh ij." Both are central symbols.', answer: 'Correct answer: The "ghar" (house) is a *constructive* symbol',
                  options: ['Correct answer: The "ghar" (house) is a *constructive* symbol', 'house has rooms, snake has fangs'],
                  hint: 'If stuck, review the "Irony Types" and "Symbol vs. Metaphor" tables in Class 11 Hindi Aroh Chapter.',
                  misconception: 'Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational irony* (outcome contradicts expectation).' }
          ],
            remediations: { 'students-consistently-confuse-verbal-irony': { steps: ['Have the student re-read both poems aloud, marking every comparison with a colored pen.', 'For each comparison, ask: "Is the speaker *saying* the opposite (verbal), is the *situation* contradictory.', 'For each concrete noun (ghar, isap, dhy, cPps, iwQy), ask: "What *action* does this noun perform in the poem?', 'Re-attempt Diagnostic Questions 2 and 4 using this verb-based symbol analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_010', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, return to the two poems and physically annotate: underline every noun/verb that.',
          misconception: '**The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard words* in the poem and.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between a word\'s *dictionary meaning* (vk\'kq fyfi vFkZ) and its *contextual meaning* (lfgr vFkZ) in a poem?', answer: '**Correct Answer:** Dictionary meaning is fixed, universal, and decontextualized',
                  options: ['**Correct Answer:** Dictionary meaning is fixed, universal, and decontextualized', 'they are the same', 'contextual meaning is just a synonym', 'Dictionary Trap'],
                  hint: 'If stuck, return to the two poems and physically annotate: underline every noun/verb that.',
                  misconception: '**The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard words* in the poem and memorizing their.' },
                { id: 'b', prompt: '**Apply:** In "ckr lh/h Fkh ij," the line **"ckr dh pwM+h ej xbZ / vkSj og Hkk"kk esa csdkj ?kweus yxh"** uses **"pwM+h"** (fat/heavy) and **"?kweus"**.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'both mean heavy', 'Dictionary Trap', 'vocabulary in context'],
                  hint: 'If stuck, return to the two poems and physically annotate: underline every noun/verb that.',
                  misconception: '**The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard words* in the poem and memorizing their.' }
          ],
            remediations: { 'the-dictionary-trap-students-believe': { steps: ['**Immediate:** Have the student re-read *only* the two poems aloud, circling every word that *feels* like it\'s doing.', '**Targeted:** For each circled word, complete a **3-Column Table**: Column A = Dictionary Meaning; Column B = What.', 'Do this for 5 words minimum.', '**Re-diagnostic:** Ask the student to explain *why* the poet chose *isap* over *maa* (from Diagnostic 5) without notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard words* in the poem and.',
          parts: [
                { id: 'a', prompt: '**Evaluate:** A critic claims: "In \'ckr lh/h Fkh ij,\' the word **"isap"** (mother) is used *only* for its emotional connotation of love; replacing it with.', answer: '**Correct Answer (Refute with justification):** 1',
                  options: ['**Correct Answer (Refute with justification):** 1', 'feeling', 'Dictionary Trap', 'vocabulary in context'],
                  hint: 'If stuck, return to the two poems and physically annotate: underline every noun/verb that.',
                  misconception: '**The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard words* in the poem and memorizing their.' }
          ],
            remediations: { 'the-dictionary-trap-students-believe': { steps: ['**Immediate:** Have the student re-read *only* the two poems aloud, circling every word that *feels* like it\'s doing.', '**Targeted:** For each circled word, complete a **3-Column Table**: Column A = Dictionary Meaning; Column B = What.', 'Do this for 5 words minimum.', '**Re-diagnostic:** Ask the student to explain *why* the poet chose *isap* over *maa* (from Diagnostic 5) without notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_011', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि अटके: c11_hin_ar_cbse_13_011 (पद्य में भाषा-प्रयोग — कक्षा 11) दोहराएँ — वहाँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि कविता में भाषा-प्रयोग का विश्लेषण करने का अर्थ है — **अलंकारों के नाम गिनाना**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 3\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।',
                  options: ['\'आरोह भाग-2 — पाठ 3\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: c11_hin_ar_cbse_13_011 (पद्य में भाषा-प्रयोग — कक्षा 11) दोहराएँ — वहाँ चरण-दर-चरण समझाया.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि कविता में भाषा-प्रयोग का विश्लेषण करने का अर्थ है — **अलंकारों के नाम गिनाना** (अनुप्रास, यमक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** कविता के **केवल पहले दो पद** लें। ज़ोर से पढ़ें। रेखांकित करें: (क) कौन-से शब्द \'भारी\' लगते हैं?', '(ख) कहाँ वाक्य-क्रम अस्वाभाविक लगता है?', '(ग) कौन-सी ध्वनि बार-बार आती है?', '**मैप करें:** प्रत्येक रेखांकित शब्द/पद के सामने लिखें — अभिधा/लक्षणा/व्यंजना?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_012', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फंसें तो कक्षा 11 के पाठ 1-3 के बोध-प्रश्न नोड्स (c11_hin_a_cbse_01_012.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर देते समय कविता की पंक्तियों को शब्दशः दोहराते हैं और मान लेते हैं कि यही उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 3\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'आरोह भाग-2 — पाठ 3\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसें तो कक्षा 11 के पाठ 1-3 के बोध-प्रश्न नोड्स (c11_hin_a_cbse_01_012, c11_hin_a_cbse_02_012.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर देते समय कविता की पंक्तियों को शब्दशः दोहराते हैं और मान लेते हैं कि यही उत्तर है, जैसे कि यदि कविता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कैसे एक सरल वाक्य जैसे "वह रो रहा था" दो अर्थ रख सकता है: एक वस्तुनिष्ठ (वह आंसू बहा रहा था) और एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
