import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch01_p1: SimDef = {
    id: 'v3_c11_hin_a_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'This node covers the author\'s biographical sketch, literary lineage/movement.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c11_hin_a_ch01'],
    nodeIds: ['c11_hin_a_cbse_01_001', 'c11_hin_a_cbse_01_002', 'c11_hin_a_cbse_01_003', 'c11_hin_a_cbse_01_004', 'c11_hin_a_cbse_01_005', 'c11_hin_a_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतरा भाग-1 खोलिए और पाठ 01 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ 1 में किन्हीं दो सहायक पात्रों के नाम लिखिए और प्रत्येक की एक-एक विशेषता बताइए जो उन्हें नायक से अलग करती है।',
        options: ['Correct answer: (Example based on typical Chapter 1 texts) 1) पात्र क', 'रामू और श्यामू', 'character sketch'],
        answer: 'Correct answer: (Example based on typical Chapter 1 texts) 1) पात्र क',
        hook: 'Students believe that a "character sketch" (पात्र-चित्रण) of a supporting character means listing physical traits (कद.',
    },
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_01_005', title: 'पाठ 1 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'अंतरा भाग-1 — पाठ 1\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'पाठ 1 में किन्हीं दो सहायक पात्रों के नाम लिखिए और प्रत्येक की एक-एक विशेषता बताइए जो उन्हें नायक से अलग करती है।', options: [
                { text: 'Correct answer: (Example based on typical Chapter 1 texts) 1) पात्र क', outcome: 'Correct answer: (Example based on typical Chapter 1 texts) 1) पात्र क — विशेषता: वह ग्रामीण.' },
                { text: 'रामू और श्यामू', outcome: 'Not quite — Students believe that a "character sketch" (पात्र-चित्रण) of a supporting character means listing.', reveals: 'a-character-sketch-of-a' },
                { text: 'character sketch', outcome: 'Not quite — Students believe that a "character sketch" (पात्र-चित्रण) of a supporting character means listing.', reveals: 'a-character-sketch-of-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 10 History chapters on National Movement and Post-Independence.',
          misconception: '**विशिष्ट भ्रम:** "लेखक का जीवन जितना संघर्षमय/रोचक होगा, रचना उतनी ही महान होगी।" **गलत तर्क:** छात्र \'जीवनी की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review Class 10 History chapters on National Movement and Post-Independence.',
                  misconception: '**विशिष्ट भ्रम:** "लेखक का जीवन जितना संघर्षमय/रोचक होगा, रचना उतनी ही महान होगी।" **गलत तर्क:** छात्र \'जीवनी की नाटकीयता\' को \'साहित्यिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पृथक्करण अभ्यास:** छात्र से कहें — "लेखक के जीवन की 5 घटनाएँ बाएँ कॉलम में लिखो, दाएँ कॉलम में उनसे *सीधे* जुड़ी रचना.', 'तो फिर हम उसका उपयोग कैसे करें?\'" 2.', '**प्रतिमान-भंग उदाहरण:** दो लेखक दें जिनका जीवन समान था पर लेखन विपरीत (जैसे: दो विभाजन-पीड़ित लेखक — एक लिखता है.', '**पाठ-केंद्रित पुनर्निर्देश:** हर बार जब छात्र जीवनी बताए, पूछें: "यह जानकारी पाठ की *कौन-सी पंक्ति* को समझने में मदद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_002', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ।.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'कथानक के पाँच तत्व\' (Freytag\'s Pyramid: आरम्भ, विकास.',
          misconception: '**विशिष्ट भ्रान्ति:** छात्र समझते हैं कि **\'फ्लैशबैक\' और \'इन मीडिया रेस\' एक ही चीज़ हैं** — क्योंकि दोनों में \'पीछे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'कथानक के पाँच तत्व\' (Freytag\'s Pyramid: आरम्भ, विकास, चरमोत्कर्ष, पतन.',
                  misconception: '**विशिष्ट भ्रान्ति:** छात्र समझते हैं कि **\'फ्लैशबैक\' और \'इन मीडिया रेस\' एक ही चीज़ हैं** — क्योंकि दोनों में \'पीछे जाना\' होता है। **गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दृश्य साधन (Visual Aid):** एक ही कहानी के दो टाइमलाइन बनवाएँ — **ऊपर: कालानुक्रमिक (Story)**, **नीचे: आख्यान क्रम.', '**लेबलिंग अभ्यास:** पाठ 1 के पहले पृष्ठ के ५ वाक्य दें, छात्र से प्रत्येक के आगे लिखवाएँ: **\'वर्तमान (Present)\'.', '**कार्य-कारण श्रृंखला (Causal Chain):** छात्र से कहें: "घटना अ → घटना ब → घटना स" तीर से जोड़ो। फिर पूछें: "लेखक ने ब.', '**मिनी-लेखन:** एक परिचित घटना (जैसे: परीक्षा परिणाम) को **इन मीडिया रेस** में ५० शब्दों में लिखवाएँ — फिर कालक्रम में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_003', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि कथानक के कारण-कार्य संबंध स्पष्ट न हों, तो c11_hin_a_cbse_01_002 (कथानक और.',
          misconception: 'छात्र प्रायः \'परिवेश\' और \'पृष्ठभूमि\' को समानार्थी मान लेते हैं और परीक्षा में केवल स्थान-काल (जहाँ-कब) लिखकर पूर्णांक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि कथानक के कारण-कार्य संबंध स्पष्ट न हों, तो c11_hin_a_cbse_01_002 (कथानक और आख्यान-संरचना) के.',
                  misconception: 'छात्र प्रायः \'परिवेश\' और \'पृष्ठभूमि\' को समानार्थी मान लेते हैं और परीक्षा में केवल स्थान-काल (जहाँ-कब) लिखकर पूर्णांक की अपेक्षा करते हैं।.' }
          ],
            remediations: { '10': { steps: ['चरण 1: छात्र से किसी परिचित कहानी का केवल स्थान-काल लिखवाएँ। चरण 2: उसी कहानी से तीन सामाजिक संरचनाएँ (जैसे: परिवार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_004', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो, तो **कथानक के तीन प्रमुख मोड़ (three major plot turns)** पुनः.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'पात्र-चित्रण\' को **स्थैतिक सूची (static list)** समझते हैं — "नायक साहसी है, ईमानदार है, सुंदर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **कथानक के तीन प्रमुख मोड़ (three major plot turns)** पुनः लिखें और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'पात्र-चित्रण\' को **स्थैतिक सूची (static list)** समझते हैं — "नायक साहसी है, ईमानदार है, सुंदर है" — और यह भूल जाते.' }
          ],
            remediations: { 'static-list': { steps: ['**चरण 1:** छात्र से कहें: "पाठ खोलो और नायक के **तीन निर्णायक क्षण (decisive moments)** ढूँढ़ो — जहाँ उसने चुनाव किया.', '**चरण 2:** प्रत्येक क्षण के लिए पूछें: "यहाँ उसने **क्या किया/कहा/सोचा**?', 'इसे कॉपी में उद्धृत करो।" 3.', '**चरण 3:** अब पूछें: "यह कार्य/संवाद उसके **कौन-से आंतरिक गुण** को दिखाता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_005', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'If stuck, review c11_hin_a_cbse_01_004 — specifically the WORKED_EXAMPLE_1 there for PEEL.',
          misconception: 'Students believe that a "character sketch" (पात्र-चित्रण) of a supporting character means listing physical traits (कद.',
          parts: [
                { id: 'a', prompt: 'पाठ 1 में किन्हीं दो सहायक पात्रों के नाम लिखिए और प्रत्येक की एक-एक विशेषता बताइए जो उन्हें नायक से अलग करती है।', answer: 'Correct answer: (Example based on typical Chapter 1 texts) 1) पात्र क',
                  options: ['Correct answer: (Example based on typical Chapter 1 texts) 1) पात्र क', 'रामू और श्यामू', 'character sketch'],
                  hint: 'If stuck, review c11_hin_a_cbse_01_004 — specifically the WORKED_EXAMPLE_1 there for PEEL structure.',
                  misconception: 'Students believe that a "character sketch" (पात्र-चित्रण) of a supporting character means listing physical traits (कद, रंग, वेश) + 2-3.' },
                { id: 'b', prompt: 'पाठ 1 में दो सहायक पात्र ऐसे हैं जो नायक के दो विपरीत पक्षों को उजागर करते हैं (foil की भूमिका)। उनकी तुलना करते हुए बताइए कि लेखक ने इस द्वैत (duality) का.', answer: 'Correct answer: पात्र A (व्यावहारिक/सामंती मूल्यों का प्रतिनिधि) और पात्र B',
                  options: ['Correct answer: पात्र A (व्यावहारिक/सामंती मूल्यों का प्रतिनिधि) और पात्र B', 'पात्र A ऐसा है, पात्र B वैसा है', 'character sketch'],
                  hint: 'If stuck, review c11_hin_a_cbse_01_004 — specifically the WORKED_EXAMPLE_1 there for PEEL structure.',
                  misconception: 'Students believe that a "character sketch" (पात्र-चित्रण) of a supporting character means listing physical traits (कद, रंग, वेश) + 2-3.' }
          ],
            remediations: { 'a-character-sketch-of-a': { steps: ['Give the student a 2-column table. Column A: "पाठ में पात्र का कथन/क्रिया" (quote 3 exact lines).', 'Ask: "यदि यह पात्र हटा दिया जाए, तो नायक का कौन सा निर्णय असंभव/असंगत हो जाएगा?" Write the answer in one sentence.', 'Convert that sentence into the Topic Sentence (Point) of a PEEL paragraph.', 'Use Column A quotes as Evidence. This mechanical scaffold breaks the "description habit" by making function visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that a "character sketch" (पात्र-चित्रण) of a supporting character means listing physical traits (कद.',
          parts: [
                { id: 'a', prompt: '"पाठ 1 का सबसे प्रभावशाली सहायक पात्र वह है जो सबसे कम बोलता है।" इस मत का मूल्यांकन कीजिए। पाठ्य-साक्ष्य सहित तर्क दीजिए।', answer: 'Correct answer: यह मत आंशिक रूप से सत्य है। मौन पात्र (जैसे: माँ/बहन/नौकर) अक्सर',
                  options: ['Correct answer: यह मत आंशिक रूप से सत्य है। मौन पात्र (जैसे: माँ/बहन/नौकर) अक्सर', 'हाँ, क्योंकि चुप्पी ताकतवर होती है', 'नहीं, क्योंकि बोलने वाला ही प्रभाव डालता है', 'character sketch'],
                  hint: 'If stuck, review c11_hin_a_cbse_01_004 — specifically the WORKED_EXAMPLE_1 there for PEEL structure.',
                  misconception: 'Students believe that a "character sketch" (पात्र-चित्रण) of a supporting character means listing physical traits (कद, रंग, वेश) + 2-3.' }
          ],
            remediations: { 'a-character-sketch-of-a': { steps: ['Give the student a 2-column table. Column A: "पाठ में पात्र का कथन/क्रिया" (quote 3 exact lines).', 'Ask: "यदि यह पात्र हटा दिया जाए, तो नायक का कौन सा निर्णय असंभव/असंगत हो जाएगा?" Write the answer in one sentence.', 'Convert that sentence into the Topic Sentence (Point) of a PEEL paragraph.', 'Use Column A quotes as Evidence. This mechanical scaffold breaks the "description habit" by making function visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_006', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 1\' का केंद्रीय भाव और.',
          hint: 'यदि अटके तो \'पात्र-चित्रण: नायक\' (c11_hin_a_cbse_01_004) के \'नायक का आंतरिक द्वंद्व\' वाले.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' रचना का \'नैतिक उपदेश\' (Moral Lesson) होता है — जैसे "सत्य बोलो".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 1\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 1\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो \'पात्र-चित्रण: नायक\' (c11_hin_a_cbse_01_004) के \'नायक का आंतरिक द्वंद्व\' वाले भाग को.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' रचना का \'नैतिक उपदेश\' (Moral Lesson) होता है — जैसे "सत्य बोलो", "बड़ों का आदर करो"।.' }
          ],
            remediations: { 'moral-lesson': { steps: ['छात्र से कहें: "रचना का कोई एक प्रसंग चुनो जहाँ नायक चुप रहता है या निर्णय नहीं ले पाता — वही प्रसंग पढ़ो और बताओ वहाँ.', 'फिर पूछें: "यह तनाव रचना में और कहाँ-कहाँ दोहराया गया है?" — तीन स्थल चिह्नित करवाएँ। 3.', 'अब कहें: "इन तीनों तनावों में कॉमन (Common) क्या है?', 'उसे एक संज्ञा-वाक्यांश (Noun Phrase) में लिखो — वही विषय है।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
