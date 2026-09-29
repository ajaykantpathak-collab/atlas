import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch08_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch08_p1',
    title: 'रुबाइयाँ · Part 1/3',
    subtitle: 'The village finally spoke — in its own voice',
    classLevel: 12, subject: 'hin_ar', topic: 'रुबाइयाँ · Part 1/3',
    chapters: ['c12_hin_ar_ch08'],
    nodeIds: ['c12_hin_ar_cbse_08_001', 'c12_hin_ar_cbse_08_002', 'c12_hin_ar_cbse_08_003', 'c12_hin_ar_cbse_08_004', 'c12_hin_ar_cbse_08_005', 'c12_hin_ar_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-language poetry reader', intro: 'A freedom fighter from Araria refused to translate the village for the city. The dialect is the poem\'s argument.', goal: 'Read Renu\'s poem through lok-bhasha politics, body-as-knowing and post-Quit India longing.' },
    discovery: {
        question: 'Premchand wrote about villages in standard Hindi; Renu wrote from inside the village in its own folk speech. Why is the difference more than style?',
        options: ['Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature', 'Renu couldn\'t write proper Hindi', 'Dialect is just local colour', 'No real difference'],
        answer: 'Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature',
        hook: 'Renu\'s philosophy erased the body-mind split — mud on knees IS knowing the world. A Quit India prisoner writing children\'s free play isn\'t just nostalgic: that village is the autonomous world he fought for, reclaimed in folk speech.',
    },
    teaching: [
        { title: 'रुबाइयाँ — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hear a poem in lok-bhasha: weigh dialect as political choice, read bodily play as a way of knowing, and connect a freedom fighter\'s childhood to the freedom he couldn\'t finish.',
        labels: ['रुबाइयाँ — कवि परिचय', 'रुबाइयाँ — पद्यांश-वार भावार्थ', 'रुबाइयाँ — काव्य-संरचना और', 'रुबाइयाँ — केंद्रीय भाव', 'रुबाइयाँ — छंद और', 'रुबाइयाँ — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_001', title: 'रुबाइयाँ — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 08 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of the poem in Chapter 8 of Aroh (Class 12), and what is his most recognized contribution to Hindi literature?', options: [
                { text: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), born 1921 in Araria, Bihar', outcome: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), born 1921 in Araria, Bihar.' },
                { text: 'Hindi Sahitya', outcome: 'Not quite — Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list.', reveals: 'students-treat-the-before-you' },
                { text: 'incorrect Hindi', outcome: 'Not quite — Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend selected for a national poetry fest wants to strip the dialect words from her village poems — \'real Hindi shouldn\'t smell of fields.\' The poems\' best lines are built from exactly those folk words and her grandmother\'s sayings.',
            decisions: [{ prompt: 'What does Renu\'s poem with the vine refrain say to her plan?', options: [
                { text: 'Keep the dialect — the poem builds from village scenes to the claim that script clings to language and language to life like a vine to a tree; cutting the folk idiom severs the very root the refrain keeps reaffirming.', outcome: 'The refrain isn\'t decoration: each stanza\'s memory ends by clinging back to the soil, so her \'impure\' words are the structural backbone of what makes the poems live.' },
                { text: 'Support the polish — standard literary Hindi is the tree; dialect is a creeper that needs pruning to grow upward.', outcome: 'The poem reverses that hierarchy — the vine survives because it clings; dialect isn\'t a parasite on standard language but the living connection that keeps the whole organism fed.', reveals: 'standard-above-dialect' },
                { text: 'Suggest writing two versions: a dialect draft for home and a cleaned-up one for the fest.', outcome: 'The poem\'s fourth stanza universalises the personal — the folk voice is the argument, not a first draft to be translated away; the split treats rootedness as a private habit to hide in public.', reveals: 'dialect-is-private-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear regional speech as literature\'s politics — and read a child\'s muddy play as reclaimed freedom.',
            decisions: [{ prompt: 'What comes next? रुबाइयाँ · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — रुबाइयाँ · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
          misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and.',
          parts: [
                { id: 'a', prompt: 'Who is the author of the poem in Chapter 8 of Aroh (Class 12), and what is his most recognized contribution to Hindi literature?', answer: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), born 1921 in Araria, Bihar',
                  options: ['The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), born 1921 in Araria, Bihar', 'Hindi Sahitya', 'incorrect Hindi', 'Premchand or Nirala'],
                  hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do its.',
                  misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and jump straight to the.' },
                { id: 'b', prompt: 'Explain in your own words why Renu\'s use of Maithili/Bhojpuri-inflected Hindi in his poetry is considered a literary innovation, not a linguistic deficiency.', answer: 'Renu elevated the spoken language of marginalized rural communities',
                  options: ['Renu elevated the spoken language of marginalized rural communities', 'simple language', 'villagers\' Hindi'],
                  hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do its.',
                  misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and jump straight to the.' },
                { id: 'c', prompt: 'The NCERT introductory note mentions Renu participated in the 1942 Quit India Movement and was imprisoned.', answer: 'Step 1: Note the biographical fact',
                  options: ['Step 1: Note the biographical fact', 'he went to jail'],
                  hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do its.',
                  misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and jump straight to the.' },
                { id: 'd', prompt: 'Compare Renu\'s literary project (as described in the NCERT note) with Premchand\'s.', answer: 'Premchand wrote *about* villages in standardized Khari Boli, adopting an',
                  options: ['Premchand wrote *about* villages in standardized Khari Boli, adopting an', 'both wrote village stories', 'social realism'],
                  hint: 'If stuck, revisit Class 11 Aroh Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and re-do its.',
                  misconception: 'Students treat the "Before You Read" section as skippable trivia — author birth/death dates, a list of awards — and jump straight to the.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['Have the student re-read the NCERT introductory note aloud, circling every phrase that links Renu\'s life to his.', 'Assign a 5-minute free-write: "Describe your grandmother\'s kitchen using ONLY words she would use — no \'standard\'.', 'Compare their free-write to Renu\'s approach: both privilege the speaker\'s authentic tongue over the textbook\'s.', 'Re-attempt Diagnostic Question 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_002', difficulty: 'standard',
          question: '\'फिराक गोरखपुरी\' का कथानक — \'फिराक गोरखपुरी\' — आरोह भाग-2 का पाठ। पाठ का कथानक.',
          hint: 'यदि अटकें तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_002) या \'बादल को घरिते.',
          misconception: 'विद्यार्थी समझते हैं कि \'भावार्थ\' = \'शब्दार्थ + सरल भाषा में अनुवाद\'। वे प्रत्येक पंक्ति का शब्दशः हिंदी अनुवाद लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फिराक गोरखपुरी\' का कथानक',
                  options: ['\'फिराक गोरखपुरी\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फिराक गोरखपुरी\' का पाठ्य-परिवेश (setting)', '\'फिराक गोरखपुरी\' का पात्र-चित्रण'],
                  hint: 'यदि अटकें तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_002) या \'बादल को घरिते देखा है\'.',
                  misconception: 'विद्यार्थी समझते हैं कि \'भावार्थ\' = \'शब्दार्थ + सरल भाषा में अनुवाद\'। वे प्रत्येक पंक्ति का शब्दशः हिंदी अनुवाद लिख देते हैं (जैसे "बुलबुला.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पहली रुबाई की पहली पंक्ति उठाओ, केवल उसका शब्दार्थ मत दो, मुझे बताओ: कवि यहाँ कौन-सा दृश्य दिखा.', 'कौन-सा भाव जगा रहा है?" चरण 2: यदि अटकें, तो पूछें — "अच्छा, \'खेल\' शब्द सुनते ही तुम्हारे मन में क्या आता है?', 'अब कवि ने जीवन को \'खेल\' क्यों कहा?" चरण 3: उनके उत्तर से \'लीला\', \'नियति\', \'अनासक्ति\' जैसे भाव निकलवाएँ और बोर्ड पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_003', difficulty: 'standard',
          question: '\'फिराक गोरखपुरी\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि तुक पहचानने में अटके: **कक्षा 11 आरोह — \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_003).',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **रुबाई = कोई भी चार पंक्ति की कविता (चौपाई/मुक्तक/कवित्त)**। वे **तुक-अनुक्रम की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फिराक गोरखपुरी\' का पाठ्य-परिवेश (setting)',
                  options: ['\'फिराक गोरखपुरी\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फिराक गोरखपुरी\' का कथानक', '\'फिराक गोरखपुरी\' का पात्र-चित्रण'],
                  hint: 'यदि तुक पहचानने में अटके: **कक्षा 11 आरोह — \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_003) का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **रुबाई = कोई भी चार पंक्ति की कविता (चौपाई/मुक्तक/कवित्त)**। वे **तुक-अनुक्रम की अनिवार्यता (AABA)**.' }
          ],
            remediations: { 'aaba-volta-turn-liberalized-aaaa': { steps: ['**चरण 1:** छात्र को **फारसी रुबाई के 3-4 मौलिक उदाहरण** (उमर खय्याम/हाफ़िज़ के अनुवाद) दिखाओ — हर में AABA और तीसरी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_004', difficulty: 'standard',
          question: '\'फिराक गोरखपुरी\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck, review "Identifying Speaker vs Protagonist in Poetry" from.',
          misconception: 'Students often treat the protagonist as a generic "child" without analyzing how specific folk images (मिट्टी के खिलौने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फिराक गोरखपुरी\' का पात्र-चित्रण',
                  options: ['\'फिराक गोरखपुरी\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फिराक गोरखपुरी\' का कथानक', '\'फिराक गोरखपुरी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review "Identifying Speaker vs Protagonist in Poetry" from c11_hin_ar_cbse_01_004 and.',
                  misconception: 'Students often treat the protagonist as a generic "child" without analyzing how specific folk images (मिट्टी के खिलौने, चाँद मांगना.' }
          ],
            remediations: { 'students-often-treat-the-protagonist': { steps: ['Re-read the poem aloud, circling every verb associated with the child (खेलता, बनाता, ताकता, मांगता, बैठा).', 'For each verb, write the exact line and the image it creates.', 'Revisit node c12_hin_ar_cbse_08_003 (Setting and Atmosphere) to see how the rural setting shapes these actions.', 'Re-attempt Diagnostic Question 4 with this evidence table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_005', difficulty: 'standard',
          question: '\'फिराक गोरखपुरी\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि मात्रा-गणना में अटकें: प्रत्येक शब्द को उच्चारित करें, संयुक्त व्यंजन (जैसे \'फूलों\'.',
          misconception: 'छात्र मानते हैं कि \'छंद विश्लेषण\' का अर्थ केवल मात्राएँ गिनकर छंद-नाम बता देना है — वे भूल जाते हैं कि बोर्ड परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फिराक गोरखपुरी\' के सहायक पात्र',
                  options: ['\'फिराक गोरखपुरी\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फिराक गोरखपुरी\' का कथानक', '\'फिराक गोरखपुरी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मात्रा-गणना में अटकें: प्रत्येक शब्द को उच्चारित करें, संयुक्त व्यंजन (जैसे \'फूलों\' में \'ल्\').',
                  misconception: 'छात्र मानते हैं कि \'छंद विश्लेषण\' का अर्थ केवल मात्राएँ गिनकर छंद-नाम बता देना है — वे भूल जाते हैं कि बोर्ड परीक्षा (और CUET) में पूछा.' }
          ],
            remediations: { 'cuet-b': { steps: ['चरण 1: c12_hin_ar_cbse_08_003 (काव्य-संरचना) दोबारा पढ़ें — वहाँ पंक्ति-वार मात्रा गणना का अभ्यास है। चरण 2: एक रुबाई.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_006', difficulty: 'standard',
          question: '\'फिराक गोरखपुरी\' का मुख्य विषय — \'फिराक गोरखपुरी\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अलंकार पहचानने में अटकें तो कक्षा 11 के नोड **c11_hin_a_cbse_13_006** के कार्यित.',
          misconception: '**सबसे घातक गलतफहमी**: छात्र अलंकार को **सजावटी उपकरण** (decoration) मानते हैं, **अर्थ-व्यंजना की प्रक्रिया**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फिराक गोरखपुरी\' का मुख्य विषय',
                  options: ['\'फिराक गोरखपुरी\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फिराक गोरखपुरी\' का कथानक', '\'फिराक गोरखपुरी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अलंकार पहचानने में अटकें तो कक्षा 11 के नोड **c11_hin_a_cbse_13_006** के कार्यित उदाहरण 1-2.',
                  misconception: '**सबसे घातक गलतफहमी**: छात्र अलंकार को **सजावटी उपकरण** (decoration) मानते हैं, **अर्थ-व्यंजना की प्रक्रिया** (meaning-making process).' }
          ],
            remediations: { 'decoration': { steps: ['**पुनरावृत्ति चरण**: नोड **c11_hin_a_cbse_13_006** (जाग तुझको दूर जाना — अलंकार) और **c11_hin_a_cbse_14_006** (बादल को.', '**अभ्यास चरण**: रुबाइयों के 5 पद्यांश लीजिए (नोड 002 से), प्रत्येक में **केवल एक अलंकार** पहचानिए, फिर उसकी **व्यंजना.', '**परीक्षण चरण**: नोड **007 (प्रतीक-बिंब)** के डायग्नोस्टिक प्रश्न 3-4 हल कीजिए — वहाँ अलंकार और प्रतीक का अंतर स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
