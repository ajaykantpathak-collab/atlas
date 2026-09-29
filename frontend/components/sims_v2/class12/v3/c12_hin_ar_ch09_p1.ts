import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch09_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch09_p1',
    title: 'छोटा मेरा खेत, बगुलों के पंख · Part 1/3',
    subtitle: 'She mapped a homeland that no longer existed',
    classLevel: 12, subject: 'hin_ar', topic: 'छोटा मेरा खेत, बगुलों के पंख · Part 1/3',
    chapters: ['c12_hin_ar_ch09'],
    nodeIds: ['c12_hin_ar_cbse_09_001', 'c12_hin_ar_cbse_09_002', 'c12_hin_ar_cbse_09_003', 'c12_hin_ar_cbse_09_004', 'c12_hin_ar_cbse_09_005', 'c12_hin_ar_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partition-poetry reader', intro: 'A woman who crossed a new border learned that memory needs maps — and paintings — to survive.', goal: 'Read Mekhala Thakur\'s Nakshe and Chitrakala through Partition displacement and modernist free verse.' },
    discovery: {
        question: 'A poet born in Lyallpur loses her homeland in 1947 — then writes two poems titled \'Map\' and \'Painting of Birds.\' What are the titles already saying?',
        options: ['Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure', 'She liked geography and art', 'Birds migrate like refugees — that\'s all', 'Titles are random'],
        answer: 'Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure',
        hook: 'Partition\'s shadow runs through her — she translated Hamsun\'s \'Hunger,\' and the refugee\'s starvation is spiritual: a hunger for the lost home. Free verse and everyday speech were her modernist break — \'new direction\' means new freedom to say loss plainly.',
    },
    teaching: [
        { title: 'छोटा मेरा खेत, बगुलों के पंख — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a refugee\'s double elegy: decode the titles as preservation strategies, weigh memory-mapping against image-freezing, and feel how plain speech carries unhealable loss.',
        labels: ['छोटा मेरा खेत, बगुलों'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_001', title: 'छोटा मेरा खेत, बगुलों के पंख — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 09 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of the poems "Nakshe" and "Chitrakala" in Class 12 Hindi Aroh Chapter 9, and what is her birth year and place of birth.', options: [
                { text: 'The author is Mekhala Thakur (mek\'kadj tks\'kh), born in 1911 in Lyallpur (xqtjkr)', outcome: 'The author is Mekhala Thakur (mek\'kadj tks\'kh), born in 1911 in Lyallpur (xqtjkr), which is now.' },
                { text: 'a different poet like Nirala or Mahadevi Verma, or giving the wrong birth year', outcome: 'Not quite — Students treat the "Before You Read" box as optional background trivia and skip it, believing the.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_003', title: 'छोटा मेरा खेत, बगुलों के पंख — काव्य-संरचना और पद्य-विन्यास',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 9\' का परिवेश: \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्तक — स्थान और समय मिलकर माहौल बनाते हैं।',
            decisions: [{ prompt: 'In the poem "नक्षत्र मेरा घर", the line "dkx”k dk ,d iÂk] dksbZ vaèkM+ dgha ls vk;k" uses the word "iÂk" (corner/nook).', options: [
                { text: 'The word "iÂk" establishes the **spatial intimacy and smallness** of the physical setting', outcome: 'The word "iÂk" establishes the **spatial intimacy and smallness** of the physical setting —.' },
                { text: 'it shows the time is night', outcome: 'Not quite — Students treat **setting as a static backdrop** (time/place label) and **atmosphere as a separate.', reveals: 'students-treat-setting-as-a' },
                { text: 'it creates a scary atmosphere', outcome: 'Not quite — Students treat **setting as a static backdrop** (time/place label) and **atmosphere as a separate.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A hackathon teammate wants to demo straight from the whiteboard sketch — \'the blueprint IS the product, let\'s just present the plan.\' You think the sketch needs to become something people can actually walk into.',
            decisions: [{ prompt: 'How does Jayashankar Prasad\'s \'नक्शे मेरे घर\' frame this?', options: [
                { text: 'The map is the draft, not the house — the poem moves from courtyard corner to bricks laid with imagination to walls that finally bear weight; a blueprint only proves itself when someone can live inside what it drew.', outcome: 'The poem\'s extended metaphor makes each stanza a construction stage — sketching is a real stage, but the poem\'s whole point is that plans must materialise into habitable form.' },
                { text: 'He\'s right — a clear plan is the creative act; execution is just mechanical labour.', outcome: 'The poem gives the labour stanzas of their own — the chains of imagination, the weight-bearing — treating construction as where creation happens, not as clerical follow-up to it.', reveals: 'plan-is-the-product' },
                { text: 'Skip the blueprint stage entirely — real builders improvise.', outcome: 'The poem honours the map as a provisional, evolving draft — the error is worshipping it, not drawing it; deleting the plan loses the poem\'s first structural move.', reveals: 'drafts-are-disposable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Partition poetry as cartography of a vanished home — every title a survival plan for memory.',
            decisions: [{ prompt: 'What comes next? छोटा मेरा खेत, बगुलों के पंख · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — छोटा मेरा खेत, बगुलों के पंख · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the "Before You Read" section of Class 11 Chapter 12.',
          misconception: 'Students treat the "Before You Read" box as optional background trivia and skip it, believing the poems are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review the "Before You Read" section of Class 11 Chapter 12 (c11_hin_ar_cbse_12_001).',
                  misconception: 'Students treat the "Before You Read" box as optional background trivia and skip it, believing the poems are self-contained.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['Have the student re-read *only* the grey box (not the poems) and underline three proper nouns: Mekhala Thakur, 1947.', 'Ask: "What does each noun tell you about the poet\'s world?" 3.', 'Map answers to the two titles: Partition → "Nakshe" (lost geography); Hamsun\'s hunger → "Chitrakala" (art as survival).', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_002', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ.',
          hint: 'यदि अटके: **c11_hin_a_cbse_13_002 (जाग तुझको दूर जाना — पद्यांश-वार भावार्थ)** पर लौटें.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'पद्यांश-वार भावार्थ\' का अर्थ है **प्रत्येक पद्यांश का अलग-अलग अनुवाद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,',
                  options: ['\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके: **c11_hin_a_cbse_13_002 (जाग तुझको दूर जाना — पद्यांश-वार भावार्थ)** पर लौटें — वहाँ इसी.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'पद्यांश-वार भावार्थ\' का अर्थ है **प्रत्येक पद्यांश का अलग-अलग अनुवाद (translation) लिख देना** — जैसे.' }
          ],
            remediations: { 'translation-1': { steps: ['**पहले पद्यांश को फिर से जोर से पढ़ें** — केवल अर्थ नहीं, **ध्वनि और लय** पकड़ें। पूछें: "कवि यहाँ किस **स्वर (tone)**.', '**दो लगातार पद्यांश लें** (जैसे 1 और 2, या 3 और 4)। एक शीट पर दोनों के **मुख्य बिंब** आमने-सामने लिखें। तीर खींचकर.', '(उदाहरण: पंख → आसमान → धूप के टुकड़े → बीज/फसल → पंख फिर से)। 3.', '**\'फिर भी\' (yet) शब्द खोजें** — कविता में जहाँ भी \'फिर भी\', \'परंतु\', \'लेकिन\' आए, वहाँ रुकें। वह **भाव-मोड़.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_003', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'If unable to separate sensory detail from emotional label, revisit Class 11 "Imagery and.',
          misconception: 'Students treat **setting as a static backdrop** (time/place label) and **atmosphere as a separate adjective** (sad.',
          parts: [
                { id: 'a', prompt: 'Both poems open with a repeated phrase: "NksVk esjk [ksr" (six times) and "cxqyksa d ia[k" (five times).', answer: 'The claim is **incorrect**',
                  options: ['The claim is **incorrect**', 'yes, it only emphasizes setting'],
                  hint: 'If unable to separate sensory detail from emotional label, revisit Class 11 "Imagery and Metaphor".',
                  misconception: 'Students treat **setting as a static backdrop** (time/place label) and **atmosphere as a separate adjective** (sad, happy, scary) they.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['**Re-read both poems aloud** with a pencil, marking **only sensory words** (see/hear/smell/touch/taste) — ignore.', '**Sort the marked words** into two columns: "Physical Detail" (e.g., "cknyksa", "iQy", "NkbZ") and "Emotional Charge".', 'Draw arrows from each physical detail to the emotional charge it carries.', '**Revisit Class 11 node c11_hin_ar_cbse_09_008 (Imagery and Metaphor)** — re-do the "sensory clustering" exercise there.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_004', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि रस-सूत्र या प्रतीक-अवधारणा अस्पष्ट हो, तो **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः समझते हैं कि \'शांत रस\' का अर्थ केवल \'उदासी\' या \'निष्क्रियता\' है और \'वीर रस\' का अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि रस-सूत्र या प्रतीक-अवधारणा अस्पष्ट हो, तो **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः समझते हैं कि \'शांत रस\' का अर्थ केवल \'उदासी\' या \'निष्क्रियता\' है और \'वीर रस\' का अर्थ केवल \'युद्ध/हिंसा\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** कविता के अंतिम दो पदों को **धीरे-धीरे आवाज़ में पढ़ें** — लय और भाव पकड़ें। 2.', '**प्रतीक-तालिका बनाएं:** एक कागज़ पर दो कॉलम बनाएँ — बाएँ \'शब्द/बिंब\' (खेत, बगुले, धूप, हवा, पंख), दाएँ \'प्रतीकार्थ\'.', '**रस-चक्र पूरा करें:** भरतमुनि के सूत्र (विभाव+अनुभाव+व्यभिचारी=रस) को कविता पर **लागू करके लिखें** — पहले शांत रस के.', '**पुनः प्रयास करें:** DIAGNOSTIC_QUESTION_3 और _4 के उत्तर **अपने शब्दों में** लिखें। यदि अब भी अटके, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_005', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि मात्रा-गणना में अटके, तो **c11_hin_a_cbse_13_005** के कार्यित उदाहरण (Worked.',
          misconception: '**भ्रान्ति:** "छंद वही है जिसमें तुक (rhyme) हो। बिना तुक की कविता छंदहीन / मुक्त छंद होती है।" **वास्तविकता:** छंद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'आरोह भाग-2 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मात्रा-गणना में अटके, तो **c11_hin_a_cbse_13_005** के कार्यित उदाहरण (Worked Examples) दोहराएँ.',
                  misconception: '**भ्रान्ति:** "छंद वही है जिसमें तुक (rhyme) हो। बिना तुक की कविता छंदहीन / मुक्त छंद होती है।" **वास्तविकता:** छंद = **मात्रा/वर्ण का.' }
          ],
            remediations: { 'rhyme': { steps: ['छात्र को **c11_hin_a_cbse_13_005** (जाग तुझको दूर जाना — छंद और लय-विधान) और **c11_hin_a_cbse_16_005** (आओ मिलकर बचाएँ.', 'उन्हें 5-5 पंक्तियाँ देकर कहें: "केवल मात्राएँ गिनो, गुरु/लघु चिह्नित करो, छंद नाम मत बताओ।" 3.', 'पुनः निदान: वही 8/11 मात्रिक पंक्तियाँ दें और पूछें "कौन सी पंक्ति किस भाव के लिए उपयुक्त है?" — यदि अब सही उत्तर दें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_006', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 9\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 9\' का केंद्रीय भाव और.',
          hint: 'यदि अलंकारों के प्रकार/भेद भ्रमित हों, तो **c11_hin_ar_cbse_13_008** (जाग तुझको दूर जाना.',
          misconception: '**सबसे घातक भ्रम:** "अलंकार पहचान लो, नाम बता दो — बस हो गया।" छात्र रूपक/उपमा/अनुप्रास का लेबल लगाकर रुक जाते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 9\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 9\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-2 — पाठ 9\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 9\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 9\' का कथानक — \'आरोह भाग-2 — पाठ 9\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अलंकारों के प्रकार/भेद भ्रमित हों, तो **c11_hin_ar_cbse_13_008** (जाग तुझको दूर जाना — अलंकार).',
                  misconception: '**सबसे घातक भ्रम:** "अलंकार पहचान लो, नाम बता दो — बस हो गया।" छात्र रूपक/उपमा/अनुप्रास का लेबल लगाकर रुक जाते हैं। वे नहीं समझते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जिसमें तुम्हें चित्र उभरता दिखे। उस पंक्ति को बोलकर पढ़ो। अब.', 'क्या *महसूस* हुआ?" — यह बिंब-ग्रहण (imagery reception) सक्रिय करता है। 2.', '**चरण 2:** उसी पंक्ति में उपमेय-उपमान अलग करने को कहें: "किसे किससे जोड़ा गया है?', 'जोड़ने वाला शब्द (जैसे/वत्) है या नहीं?" — इससे अलंकार-प्रकार स्वतः स्पष्ट होगा। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
