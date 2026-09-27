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
        { title: 'छोटा मेरा खेत, बगुलों के पंख — कवि परिचय और पृष्ठभूमि', text: 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage in the *Nayi Kavita* (नई कविता) movement, and the socio-historical backdrop of rural displacement.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a refugee\'s double elegy: decode the titles as preservation strategies, weigh memory-mapping against image-freezing, and feel how plain speech carries unhealable loss.',
        labels: ['छोटा मेरा खेत, बगुलों'],
            observePrompt: 'What did the flow interactive show you?' } },
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
          question: 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary.',
          hint: 'यदि \'नई कविता\' या केदारनाथ सिंह की पृष्ठभूमि अस्पष्ट है, तो **c11_hin_ar_cbse_13_001** और.',
          misconception: '**विशिष्ट भ्रांति:** "केदारनाथ सिंह चूँकि प्रोफेसर थे और शहर में रहते थे, इसलिए यह कविता एक \'बाहरी\' व्यक्ति की किसान के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage',
                  options: ['This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल सार या \'आत्मा\' है जो कवि के सम्पूर्ण अनुभव,'],
                  hint: 'यदि \'नई कविता\' या केदारनाथ सिंह की पृष्ठभूमि अस्पष्ट है, तो **c11_hin_ar_cbse_13_001** और.',
                  misconception: '**विशिष्ट भ्रांति:** "केदारनाथ सिंह चूँकि प्रोफेसर थे और शहर में रहते थे, इसलिए यह कविता एक \'बाहरी\' व्यक्ति की किसान के प्रति सहानुभूति है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से पूछें: "केदारनाथ सिंह का गाँव कौन-सा था?', 'उन्होंने कौन-सी नौकरी की?" — यदि तथ्य गलत हैं, तो **c11_hin_ar_cbse_13_001 (जाग तुझको दूर जाना — कवि परिचय)** या.', '**दूसरा कदम:** \'नई कविता\' आंदोलन की तीन विशेषताएँ लिखवाएँ — यदि नहीं बता पाते, तो **कक्षा 11 की काव्य-परिचय नोड्स.', '**तीसरा कदम:** 1991 के बाद भूमि अधिग्रहण का एक उदाहरण (अपने जिले/राज्य का) खोजकर लाने को कहें — इससे **ऐतिहासिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र.',
          hint: 'यदि अटके: **c11_hin_a_cbse_13_002 (जाग तुझको दूर जाना — पद्यांश-वार भावार्थ)** पर लौटें.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'पद्यांश-वार भावार्थ\' का अर्थ है **प्रत्येक पद्यांश का अलग-अलग अनुवाद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल सार या \'आत्मा\' है जो कवि के सम्पूर्ण अनुभव,'],
                  hint: 'यदि अटके: **c11_hin_a_cbse_13_002 (जाग तुझको दूर जाना — पद्यांश-वार भावार्थ)** पर लौटें — वहाँ इसी.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'पद्यांश-वार भावार्थ\' का अर्थ है **प्रत्येक पद्यांश का अलग-अलग अनुवाद (translation) लिख देना** — जैसे.' }
          ],
            remediations: { 'translation-1': { steps: ['**पहले पद्यांश को फिर से जोर से पढ़ें** — केवल अर्थ नहीं, **ध्वनि और लय** पकड़ें। पूछें: "कवि यहाँ किस **स्वर (tone)**.', '**दो लगातार पद्यांश लें** (जैसे 1 और 2, या 3 और 4)। एक शीट पर दोनों के **मुख्य बिंब** आमने-सामने लिखें। तीर खींचकर.', '(उदाहरण: पंख → आसमान → धूप के टुकड़े → बीज/फसल → पंख फिर से)। 3.', '**\'फिर भी\' (yet) शब्द खोजें** — कविता में जहाँ भी \'फिर भी\', \'परंतु\', \'लेकिन\' आए, वहाँ रुकें। वह **भाव-मोड़.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line.',
          hint: 'यदि भ्रम हो तो कक्षा 11 के नोड c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना — काव्य-संरचना).',
          misconception: '**विशिष्ट भ्रांति:** "मुक्त छंद (free verse) में कवि मनमाने ढंग से पंक्तियाँ तोड़ देता है; इसका कोई नियम या तर्क नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'केंद्रीय भाव (Central Theme) कविता का वह मूल सार या \'आत्मा\' है जो कवि के सम्पूर्ण अनुभव,'],
                  hint: 'यदि भ्रम हो तो कक्षा 11 के नोड c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना — काव्य-संरचना) के.',
                  misconception: '**विशिष्ट भ्रांति:** "मुक्त छंद (free verse) में कवि मनमाने ढंग से पंक्तियाँ तोड़ देता है; इसका कोई नियम या तर्क नहीं होता।".' }
          ],
            remediations: { 'free-verse': { steps: ['छात्र को कविता का **मुद्रित पाठ** (printed layout) देकर कहें: "केवल आँख से देखो — पंक्तियाँ कहाँ छोटी होती हैं?', 'कोई पैटर्न दिखता है?" — पढ़ने से पहले *देखना* सिखाएँ। 2.', 'फिर **जोर से पढ़वाएँ** और पूछें: "तुम्हारी आवाज़ कहाँ स्वाभाविक रूप से रुकी?', 'कहाँ तुम बिना रुके आगे बढ़ गए?" — ध्वनि और लिपि के संबंध को पकड़ाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह मूल सार या \'आत्मा\' है जो कवि के.',
          hint: 'यदि रस-सूत्र या प्रतीक-अवधारणा अस्पष्ट हो, तो **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः समझते हैं कि \'शांत रस\' का अर्थ केवल \'उदासी\' या \'निष्क्रियता\' है और \'वीर रस\' का अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह मूल सार या \'आत्मा\' है जो कवि के सम्पूर्ण अनुभव,',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह मूल सार या \'आत्मा\' है जो कवि के सम्पूर्ण अनुभव,', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि रस-सूत्र या प्रतीक-अवधारणा अस्पष्ट हो, तो **c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः समझते हैं कि \'शांत रस\' का अर्थ केवल \'उदासी\' या \'निष्क्रियता\' है और \'वीर रस\' का अर्थ केवल \'युद्ध/हिंसा\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** कविता के अंतिम दो पदों को **धीरे-धीरे आवाज़ में पढ़ें** — लय और भाव पकड़ें। 2.', '**प्रतीक-तालिका बनाएं:** एक कागज़ पर दो कॉलम बनाएँ — बाएँ \'शब्द/बिंब\' (खेत, बगुले, धूप, हवा, पंख), दाएँ \'प्रतीकार्थ\'.', '**रस-चक्र पूरा करें:** भरतमुनि के सूत्र (विभाव+अनुभाव+व्यभिचारी=रस) को कविता पर **लागू करके लिखें** — पहले शांत रस के.', '**पुनः प्रयास करें:** DIAGNOSTIC_QUESTION_3 और _4 के उत्तर **अपने शब्दों में** लिखें। यदि अब भी अटके, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_005', difficulty: 'standard',
          question: 'छंद (metre) is the rhythmic structure of a verse determined by the fixed.',
          hint: 'यदि मात्रा-गणना में अटके, तो **c11_hin_a_cbse_13_005** के कार्यित उदाहरण (Worked.',
          misconception: '**भ्रान्ति:** "छंद वही है जिसमें तुक (rhyme) हो। बिना तुक की कविता छंदहीन / मुक्त छंद होती है।" **वास्तविकता:** छंद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद (metre) is the rhythmic structure of a verse determined by the fixed sequence of गुरु',
                  options: ['छंद (metre) is the rhythmic structure of a verse determined by the fixed sequence of गुरु', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि मात्रा-गणना में अटके, तो **c11_hin_a_cbse_13_005** के कार्यित उदाहरण (Worked Examples) दोहराएँ.',
                  misconception: '**भ्रान्ति:** "छंद वही है जिसमें तुक (rhyme) हो। बिना तुक की कविता छंदहीन / मुक्त छंद होती है।" **वास्तविकता:** छंद = **मात्रा/वर्ण का.' }
          ],
            remediations: { 'rhyme': { steps: ['छात्र को **c11_hin_a_cbse_13_005** (जाग तुझको दूर जाना — छंद और लय-विधान) और **c11_hin_a_cbse_16_005** (आओ मिलकर बचाएँ.', 'उन्हें 5-5 पंक्तियाँ देकर कहें: "केवल मात्राएँ गिनो, गुरु/लघु चिह्नित करो, छंद नाम मत बताओ।" 3.', 'पुनः निदान: वही 8/11 मात्रिक पंक्तियाँ दें और पूछें "कौन सी पंक्ति किस भाव के लिए उपयुक्त है?" — यदि अब सही उत्तर दें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_006', difficulty: 'standard',
          question: 'अलंकार (Figure of Speech) शब्दों के विशेष विन्यास या प्रयोग द्वारा काव्य में.',
          hint: 'यदि अलंकारों के प्रकार/भेद भ्रमित हों, तो **c11_hin_ar_cbse_13_008** (जाग तुझको दूर जाना.',
          misconception: '**सबसे घातक भ्रम:** "अलंकार पहचान लो, नाम बता दो — बस हो गया।" छात्र रूपक/उपमा/अनुप्रास का लेबल लगाकर रुक जाते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Figure of Speech) शब्दों के विशेष विन्यास या प्रयोग द्वारा काव्य में सौंदर्य,',
                  options: ['अलंकार (Figure of Speech) शब्दों के विशेष विन्यास या प्रयोग द्वारा काव्य में सौंदर्य,', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि अलंकारों के प्रकार/भेद भ्रमित हों, तो **c11_hin_ar_cbse_13_008** (जाग तुझको दूर जाना — अलंकार).',
                  misconception: '**सबसे घातक भ्रम:** "अलंकार पहचान लो, नाम बता दो — बस हो गया।" छात्र रूपक/उपमा/अनुप्रास का लेबल लगाकर रुक जाते हैं। वे नहीं समझते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जिसमें तुम्हें चित्र उभरता दिखे। उस पंक्ति को बोलकर पढ़ो। अब.', 'क्या *महसूस* हुआ?" — यह बिंब-ग्रहण (imagery reception) सक्रिय करता है। 2.', '**चरण 2:** उसी पंक्ति में उपमेय-उपमान अलग करने को कहें: "किसे किससे जोड़ा गया है?', 'जोड़ने वाला शब्द (जैसे/वत्) है या नहीं?" — इससे अलंकार-प्रकार स्वतः स्पष्ट होगा। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
