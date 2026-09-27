import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch09_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch09_p2',
    title: 'छोटा मेरा खेत, बगुलों के पंख · Part 2/3',
    subtitle: 'She mapped a homeland that no longer existed',
    classLevel: 12, subject: 'hin_ar', topic: 'छोटा मेरा खेत, बगुलों के पंख · Part 2/3',
    chapters: ['c12_hin_ar_ch09'],
    nodeIds: ['c12_hin_ar_cbse_09_007', 'c12_hin_ar_cbse_09_008', 'c12_hin_ar_cbse_09_009', 'c12_hin_ar_cbse_09_010', 'c12_hin_ar_cbse_09_011', 'c12_hin_ar_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partition-poetry reader', intro: 'A woman who crossed a new border learned that memory needs maps — and paintings — to survive.', goal: 'Read Mekhala Thakur\'s Nakshe and Chitrakala through Partition displacement and modernist free verse.' },
    discovery: {
        question: 'A poet born in Lyallpur loses her homeland in 1947 — then writes two poems titled \'Map\' and \'Painting of Birds.\' What are the titles already saying?',
        options: ['Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure', 'She liked geography and art', 'Birds migrate like refugees — that\'s all', 'Titles are random'],
        answer: 'Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure',
        hook: 'Partition\'s shadow runs through her — she translated Hamsun\'s \'Hunger,\' and the refugee\'s starvation is spiritual: a hunger for the lost home. Free verse and everyday speech were her modernist break — \'new direction\' means new freedom to say loss plainly.',
    },
    teaching: [
        { title: 'छोटा मेरा खेत, बगुलों के पंख — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक वह वस्तु, चरित्र या घटना है जो अपने शाब्दिक अर्थ से परे गहरा अमूर्त अर्थ (जैसे श्रम, स्वतंत्रता, एकाकीपन) व्यक्त करती है, जबकि बिंब वह संवेदनात्मक विवरण है जो पाठक के मन में स्पष्ट चित्र बनाता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a refugee\'s double elegy: decode the titles as preservation strategies, weigh memory-mapping against image-freezing, and feel how plain speech carries unhealable loss.',
        labels: ['छोटा मेरा खेत, बगुलों'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A hackathon teammate wants to demo straight from the whiteboard sketch — \'the blueprint IS the product, let\'s just present the plan.\' You think the sketch needs to become something people can actually walk into.',
            decisions: [{ prompt: 'How does Jayashankar Prasad\'s \'नक्शे मेरे घर\' frame this?', options: [
                { text: 'The map is the draft, not the house — the poem moves from courtyard corner to bricks laid with imagination to walls that finally bear weight; a blueprint only proves itself when someone can live inside what it drew.', outcome: 'The poem\'s extended metaphor makes each stanza a construction stage — sketching is a real stage, but the poem\'s whole point is that plans must materialise into habitable form.' },
                { text: 'He\'s right — a clear plan is the creative act; execution is just mechanical labour.', outcome: 'The poem gives the labour stanzas of their own — the chains of imagination, the weight-bearing — treating construction as where creation happens, not as clerical follow-up to it.', reveals: 'plan-is-the-product' },
                { text: 'Skip the blueprint stage entirely — real builders improvise.', outcome: 'The poem honours the map as a provisional, evolving draft — the error is worshipping it, not drawing it; deleting the plan loses the poem\'s first structural move.', reveals: 'drafts-are-disposable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Partition poetry as cartography of a vanished home — every title a survival plan for memory.',
            decisions: [{ prompt: 'What comes next? छोटा मेरा खेत, बगुलों के पंख · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — छोटा मेरा खेत, बगुलों के पंख · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_007', difficulty: 'standard',
          question: 'प्रतीक वह वस्तु, चरित्र या घटना है जो अपने शाब्दिक अर्थ से परे गहरा अमूर्त अर्थ.',
          hint: 'अगर छात्र प्रतीक और बिंब में अंतर नहीं कर पा रहा है, तो उसे कक्षा 11 के नोड.',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही मान लेते हैं और कह देते हैं कि "खेत बिंब है" या "पंख प्रतीक है", जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक वह वस्तु, चरित्र या घटना है जो अपने शाब्दिक अर्थ से परे गहरा अमूर्त अर्थ (जैसे',
                  options: ['प्रतीक वह वस्तु, चरित्र या घटना है जो अपने शाब्दिक अर्थ से परे गहरा अमूर्त अर्थ (जैसे', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'अगर छात्र प्रतीक और बिंब में अंतर नहीं कर पा रहा है, तो उसे कक्षा 11 के नोड c11_hin_ar_cbse_09_008.',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही मान लेते हैं और कह देते हैं कि "खेत बिंब है" या "पंख प्रतीक है", जबकि वास्तव में खेत एक अमूर्त अवधारणा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो कॉलम बनाकर सिखाइए: बाएँ में "शाब्दिक विवरण" (जैसे "खेत में मिट्टी", "पंख सफेद") और दाएँ में "अर्थ" (जैसे.', 'कौन सी पंक्ति उस चित्र के माध्यम से कोई विचार व्यक्त करती है?" इस अभ्यास से वे बिंब (चित्र-निर्माण) और प्रतीक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_008', difficulty: 'standard',
          question: '\'मुख्य भाव\' कविता का वह केंद्रीय विचार या दार्शनिक निष्कर्ष है जिसे कवि संपूर्ण.',
          hint: 'यदि अटके तो **c12_hin_ar_cbse_09_007** (विरोधाभास और प्रतीक) का \'बगुला-प्रतीक\' खंड दोबारा.',
          misconception: '**सबसे घातक ग़लतफ़हमी:** छात्र \'बगुलों के पंख\' को केवल **सौंदर्य/उड़ान/स्वतंत्रता** का प्रतीक मानते हैं (क्योंकि पंख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुख्य भाव\' कविता का वह केंद्रीय विचार या दार्शनिक निष्कर्ष है जिसे कवि संपूर्ण रचना के',
                  options: ['\'मुख्य भाव\' कविता का वह केंद्रीय विचार या दार्शनिक निष्कर्ष है जिसे कवि संपूर्ण रचना के', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि अटके तो **c12_hin_ar_cbse_09_007** (विरोधाभास और प्रतीक) का \'बगुला-प्रतीक\' खंड दोबारा पढ़ें और.',
                  misconception: '**सबसे घातक ग़लतफ़हमी:** छात्र \'बगुलों के पंख\' को केवल **सौंदर्य/उड़ान/स्वतंत्रता** का प्रतीक मानते हैं (क्योंकि पंख = उड़ान), जबकि कविता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कविता की पहली और अंतिम ४-४ पंक्तियाँ साथ रखकर पढ़ो; कवि के मन में क्या बदला, ठीक-ठीक शब्दों में.', '"बगुलों के पंख" — क्या केवल पंख हैं?', 'चरण 3: सहोदर नोड **c12_hin_ar_cbse_09_004** (केंद्रीय भाव और रस) और **c12_hin_ar_cbse_09_006/007** (साहित्यिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_009', difficulty: 'standard',
          question: 'गौण भाव (उपभाव) कविता का वह सहायक भाव है जो मुख्य भाव का पूरक, विस्तार या.',
          hint: 'यदि मुख्य भाव अस्पष्ट है तो c12_hin_ar_cbse_09_008 दोबारा पढ़ें; यदि गौण/विषयांतर का.',
          misconception: 'छात्र समझते हैं कि \'गौण\' का अर्थ \'महत्वहीन\' या \'छोड़ने योग्य\' होता है, और \'विषयांतर\' का अर्थ \'भटकाव\' या \'दोष\' — जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव (उपभाव) कविता का वह सहायक भाव है जो मुख्य भाव का पूरक, विस्तार या पृष्ठभूमि बनकर',
                  options: ['गौण भाव (उपभाव) कविता का वह सहायक भाव है जो मुख्य भाव का पूरक, विस्तार या पृष्ठभूमि बनकर', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि मुख्य भाव अस्पष्ट है तो c12_hin_ar_cbse_09_008 दोबारा पढ़ें; यदि गौण/विषयांतर का सिद्धांत भूल.',
                  misconception: 'छात्र समझते हैं कि \'गौण\' का अर्थ \'महत्वहीन\' या \'छोड़ने योग्य\' होता है, और \'विषयांतर\' का अर्थ \'भटकाव\' या \'दोष\' — जबकि दोनों कविता की कलात्मक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कविता के 3-4 पद छात्र से जोर से पढ़वाएँ और पूछें: \'कौन-सी पंक्ति खेत के बारे में नहीं, किसी और चीज के बारे में.', 'क्योंकि खेत तुम्हारा है\'। चरण 3: पहले नोड (c12_hin_ar_cbse_09_008) के मुख्य भाव नोट्स दोबारा पढ़वाएँ, फिर इस नोड के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_010', difficulty: 'standard',
          question: 'पदावली कविता में प्रयुक्त कठिन शब्दों, तत्सम/तद्भव रूपों, मुहावरों और.',
          hint: 'यदि अटके तो — **c11_hin_a_cbse_13_010** (जाग तुझको दूर जाना — पदावली) दोहराएँ: वहाँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पदावली" का अर्थ है — **कठिन शब्दों के समानार्थी (synonyms) रट लेना**। वे "तलछट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली कविता में प्रयुक्त कठिन शब्दों, तत्सम/तद्भव रूपों, मुहावरों और लोकोक्तियों की वह',
                  options: ['पदावली कविता में प्रयुक्त कठिन शब्दों, तत्सम/तद्भव रूपों, मुहावरों और लोकोक्तियों की वह', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि अटके तो — **c11_hin_a_cbse_13_010** (जाग तुझको दूर जाना — पदावली) दोहराएँ: वहाँ मुहावरों की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पदावली" का अर्थ है — **कठिन शब्दों के समानार्थी (synonyms) रट लेना**। वे "तलछट = मैल", "बगुला.' }
          ],
            remediations: { 'synonyms': { steps: ['**चरण 1:** छात्र से कहें — "कविता की वह पंक्ति पढ़ो जहाँ यह शब्द आया है। आँख बंद करो और उस पंक्ति का **चलचित्र**.', '\'तल\' और \'छट\' अलग-अलग क्या कहते हैं?" **चरण 3:** शब्द-योग (etymology) समझाएँ: तल + छट (छटना/छँटना) = जो नीचे छँटकर बैठ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग वह काव्यात्मक प्रक्रिया है जहाँ कवि व्याकरण के मानक नियमों.',
          hint: 'यदि छात्र \'विशेषण\', \'कारक\', \'कृदंत\', \'नाम-वाक्य\' जैसे पद न पहचान पाए → कक्षा 9-10 हिंदी.',
          misconception: '**सबसे घातक भ्रांति:** "पद्य में व्याकरण के नियम ढीले होते हैं / कवि गलती करता है / यह अशुद्ध हिंदी है।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग वह काव्यात्मक प्रक्रिया है जहाँ कवि व्याकरण के मानक नियमों',
                  options: ['पद्य में भाषा-प्रयोग वह काव्यात्मक प्रक्रिया है जहाँ कवि व्याकरण के मानक नियमों', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि छात्र \'विशेषण\', \'कारक\', \'कृदंत\', \'नाम-वाक्य\' जैसे पद न पहचान पाए → कक्षा 9-10 हिंदी व्याकरण.',
                  misconception: '**सबसे घातक भ्रांति:** "पद्य में व्याकरण के नियम ढीले होते हैं / कवि गलती करता है / यह अशुद्ध हिंदी है।" **वास्तविकता:** केदारनाथ सिंह जैसे.' }
          ],
            remediations: { 'deliberately-stylistic-deviation': { steps: ['**चरण 1:** छात्र को कविता की दो पंक्तियाँ (\'छोटा मेरा खेत / बगुलों के पंख\') जोर से पढ़वाओ — लय पर ध्यान दिलाओ। 2.', '**चरण 2:** उससे पूछो: "अगर मैं कहूँ \'मेरा खेत छोटा है\' तो क्या फर्क पड़ता है?" — उसके उत्तर में छिपी अंतर्दृष्टि.', '**चरण 3:** \'बगुलों के पंख\' पर वापस लाओ: "क्या खेत सचमुच बगुलों का है?" — नहीं → "तो \'के\' यहाँ क्या कर रहा है?" →.', '**चरण 4:** उसे एक साधारण वाक्य दो: \'फूल सुंदर है\' → कहो: "इसे काव्यात्मक बनाओ बिना शब्द बदले, केवल क्रम/संरचना बदलकर" →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (MCQ/रिक्त स्थान/सही-गलत) कविता के **तथ्यात्मक ज्ञान** (कवि.',
          hint: 'यदि अटके तो **c12_hin_ar_cbse_09_002 (पद्यांश-वार भावार्थ)** और **c12_hin_ar_cbse_09_006.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **आशय-सूचक प्रश्न का उत्तर = पंक्ति का भावार्थ लिख देना**। वे प्रसंग नहीं लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (MCQ/रिक्त स्थान/सही-गलत) कविता के **तथ्यात्मक ज्ञान** (कवि, शीर्षक,',
                  options: ['वस्तुनिष्ठ प्रश्न (MCQ/रिक्त स्थान/सही-गलत) कविता के **तथ्यात्मक ज्ञान** (कवि, शीर्षक,', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि अटके तो **c12_hin_ar_cbse_09_002 (पद्यांश-वार भावार्थ)** और **c12_hin_ar_cbse_09_006 (साहित्यिक.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **आशय-सूचक प्रश्न का उत्तर = पंक्ति का भावार्थ लिख देना**। वे प्रसंग नहीं लिखते, शैलीगत विशेषताएँ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — निदान**: छात्र से कहो: "पिछले वर्ष के बोर्ड पेपर का कोई एक आशय-सूचक प्रश्न उठाओ और **घड़ी लगाकर 5 मिनट में.', '**चरण 2 — पुनराभ्यास**: **c12_hin_ar_cbse_09_002** (पद्यांश-वार भावार्थ) और **c12_hin_ar_cbse_09_006/007** (साहित्यिक.', '**चरण 3 — वस्तुनिष्ठ अभ्यास**: **c11_hin_ar_cbse_09_012** (कक्षा 11 के बोध-प्रश्न) से 10 MCQ हल करो, प्रत्येक में.', '**चरण 4 — पुनः निदान**: एक नया पद्यांश (इसी कविता का अपरिचित अंश) देकर वही प्रक्रिया दोहराओ; इस बार **3/3 अंक** लक्ष्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
