import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch14_p1: SimDef = {
    id: 'v3_c10_hin_kr_ch14_p1',
    title: 'जॉर्ज पंचम की नाक · Part 1/3',
    subtitle: 'This node covers: कमलेश्वर\'s biography relevant to the story, historical context.',
    classLevel: 10, subject: 'hin_kr', topic: 'जॉर्ज पंचम की नाक · Part 1/3',
    chapters: ['c10_hin_kr_ch14'],
    nodeIds: ['c10_hin_kr_cbse_14_001', 'c10_hin_kr_cbse_14_002', 'c10_hin_kr_cbse_14_003', 'c10_hin_kr_cbse_14_004', 'c10_hin_kr_cbse_14_005', 'c10_hin_kr_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'पाठ के साथ दिए लेखक-परिचय से कमलेश्वर के तीन तथ्य उतारिए — जन्म-काल, पत्रकारिता का अनुभव, नयी कहानी आंदोलन से.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: '\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त जीवन-वृत्त (पत्रकारिता से जुड़ाव, नई कहानी-पीढ़ी से संबंध), उपनिवेश-उत्तर दिल्ली में औपनिवेशिक मूर्तियों की स्थिति, और 1950-60.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_kr_cbse_14_002', title: 'Identify each idea',
          dissect: { specimen: 'जॉर्ज पंचम की नाक · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — \'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का पाठ। पाठ का.', answer: '2 -', options: ['2 -', '2 -'] },
            { id: 's2', label: '2 -', prompt: 'Which idea is this? — \'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.', answer: '2 -', options: ['2 -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through जॉर्ज पंचम की नाक like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? जॉर्ज पंचम की नाक · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जॉर्ज पंचम की नाक · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_001', difficulty: 'standard',
          question: '\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त.',
          hint: 'If stuck, review Class 9 History "भारत और समकालीन विश्व-I" Chapter 3 (नवउपनिवेशवाद और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पृष्ठभूमि और रचनाकार परिचय" का अर्थ केवल लेखक की जन्म/मृत्यु तिथि, शिक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त जीवन-वृत्त',
                  options: ['\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त जीवन-वृत्त', '\'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का पाठ। पाठ का', '\'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'कृतिका भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review Class 9 History "भारत और समकालीन विश्व-I" Chapter 3 (नवउपनिवेशवाद और साम्राज्यवाद).',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पृष्ठभूमि और रचनाकार परिचय" का अर्थ केवल लेखक की जन्म/मृत्यु तिथि, शिक्षा, प्रमुख कृतियों की सूची.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से पूछें: "कमलेश्वर ने विभाजन के बाद दिल्ली में शरणार्थी शिविरों में समय बिताया — यह अनुभव कहानी में.', '**चरण 2:** उन्हें 1958 की वास्तविक घटना (इंडिया गेट से मूर्ति हटना) का समाचार पत्र कटिंग या आर्काइव फोटो दिखाएं और.', 'अधिकारी क्या सोच रहे होंगे?" 3.', '**चरण 3:** कमलेश्वर के संपादकीय (सारिका, 1960s) का एक अंश पढ़वाएं जहां वे नौकरशाही पर लिखते हैं — फिर कहानी का पहला.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_002', difficulty: 'standard',
          question: '\'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का.',
          hint: 'यदि फँसें तो नोड c10_hin_kr_cbse_14_001 से ऐतिहासिक पृष्ठभूमि और लेखक परिचय को दोबारा.',
          misconception: 'छात्र अक्सर कथानक (घटनाओं का क्रम) को विषय (संदेश) से मिला देते हैं, मानते हैं कि यदि वे घटनाओं को सूचीबद्ध कर दें तो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का पाठ। पाठ का',
                  options: ['\'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का पाठ। पाठ का', '\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त जीवन-वृत्त', '\'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'कृतिका भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फँसें तो नोड c10_hin_kr_cbse_14_001 से ऐतिहासिक पृष्ठभूमि और लेखक परिचय को दोबारा पढ़िए।',
                  misconception: 'छात्र अक्सर कथानक (घटनाओं का क्रम) को विषय (संदेश) से मिला देते हैं, मानते हैं कि यदि वे घटनाओं को सूचीबद्ध कर दें तो वे कहानी का "अर्थ" भी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहानी की सभी मुख्य घटनाओं को क्रमवार सूचीबद्ध करने के लिए कहिए (परिचय से समाप्त तक)। 2.', 'प्रत्येक घटना के बाद पूछिए: "यह घटना राजा की स्थिति या जनता के दृष्टिकोण में क्या बदलाव लाती है?" ताकि वे कारण‑परिणाम.', 'फिर पूछिए: "इन सभी परिवर्तनों को मिलाकर लेखक क्या कहना चाहता है?" जिससे वे कथानक से विषय तक की पुल बनाना सीखें। 4.', 'अंत में उन्हें एक वाक्य में लिखने को कहिए: "घटना X इसलिए महत्वपूर्ण है क्योंकि यह Y को दिखाती है, जो विषय Z से जुड़ती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_003', difficulty: 'standard',
          question: '\'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'यदि फँसें तो पहले c10_hin_kr_cbse_14_002 (कथानक और आख्यान-संरचना) से कहानी के事件 क्रम को.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश और वातावरण केवल ऐतिहासिक तारीखें और स्थान के नाम memorizing करने तक सीमित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में',
                  options: ['\'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त जीवन-वृत्त', '\'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का पाठ। पाठ का', '\'कृतिका भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फँसें तो पहले c10_hin_kr_cbse_14_002 (कथानक और आख्यान-संरचना) से कहानी के事件 क्रम को दोबारा.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश और वातावरण केवल ऐतिहासिक तारीखें और स्थान के नाम memorizing करने तक सीमित हैं—जैसे वे बस यह याद कर.' }
          ],
            remediations: { 'memorizing-1905-imaginary-kingdom': { steps: ['छात्र को कहानी के एक छोटे से अंश (जैसे दरबारियों की नकल करने वाला भाग) दें और पूछिए: "यह दृश्य बस मजेदार है या कुछ गहरा.', 'यदि गहरा है, तो बताइए कि raja की नाक पर obsession और दरबारीय अनुकरण का combination क्या दर्शाता है—क्या यह बस एक funny.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_004', difficulty: 'standard',
          question: '\'कृतिका भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि अटक जाएं तो नोड 002 (कथानक और आख्यान-संरचना) और नोड 003 (पाठ्य-परिवेश और वातावरण) की.',
          misconception: 'विद्यार्थी अक्सर मुख्य पात्र के चरित्र को केवल उसके बाह्य दिखावे (जैसे नाक का आकार, कपड़े) या एकल घटना के आधार पर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कृतिका भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'कृतिका भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', '\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त जीवन-वृत्त', '\'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का पाठ। पाठ का', '\'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटक जाएं तो नोड 002 (कथानक और आख्यान-संरचना) और नोड 003 (पाठ्य-परिवेश और वातावरण) की मुख्य.',
                  misconception: 'विद्यार्थी अक्सर मुख्य पात्र के चरित्र को केवल उसके बाह्य दिखावे (जैसे नाक का आकार, कपड़े) या एकल घटना के आधार पर परिभाषित कर देते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को स्पष्ट रूप से बताइए कि पात्र-चित्रण के चार स्तंभ हैं: 1) दिखावा, 2) कार्य, 3) वाणी, 4) संबंध/भावना। फिर उसे एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_005', difficulty: 'standard',
          question: '\'कृतिका भाग-2 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटका हुआ महसूस हो, तो नोड 14_004 के WORKED_EXAMPLE_1 को दोहराएँ — प्रमुख पात्र के एक.',
          misconception: '**विशिष्ट भ्रांति:** "सहायक पात्र का चित्रण करते समय उसके **गुणों की सूची (list of traits)** बना देना पर्याप्त है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कृतिका भाग-2 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे',
                  options: ['\'कृतिका भाग-2 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे', '\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त जीवन-वृत्त', '\'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का पाठ। पाठ का', '\'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटका हुआ महसूस हो, तो नोड 14_004 के WORKED_EXAMPLE_1 को दोहराएँ — प्रमुख पात्र के एक गुण के लिए.',
                  misconception: '**विशिष्ट भ्रांति:** "सहायक पात्र का चित्रण करते समय उसके **गुणों की सूची (list of traits)** बना देना पर्याप्त है — जैसे \'वह दयालु है.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "सहायक पात्र को \'गुणों की पोटली\' नहीं, \'कथानक का इंजन\' मानो। हर गुण के आगे.', '**साक्ष्य-तालिका बनवाएँ:** तीन कॉलम — (क) सहायक पात्र का संवाद/कार्य/विचार (उद्धृत), (ख) प्रमुख पात्र पर तत्काल प्रभाव.', '**PEEL मॉडल पर एक पैराग्राफ लिखवाएँ:** Point (कार्यात्मक दावा) → Evidence (उद्धरण) → Explanation (कैसे/क्यों) → Link.', '**सहकर्मी-समीक्षा (peer review):** दूसरे छात्र से पूछें — "क्या यह पैराग्राफ सिद्ध करता है कि इस सहायक पात्र के बिना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_006', difficulty: 'standard',
          question: '\'कृतिका भाग-2 — पाठ 14\' का मुख्य विषय — \'कृतिका भाग-2 — पाठ 14\' का केंद्रीय भाव.',
          hint: 'यदि कथानक भूल गए हों तो **c10_hin_kr_cbse_14_002** (कथानक) और.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर लिखते हैं — *"मुख्य विषय है: जॉर्ज पंचम की नाक टूटना और उसे ठीक कराना।"* **क्यों होता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कृतिका भाग-2 — पाठ 14\' का मुख्य विषय — \'कृतिका भाग-2 — पाठ 14\' का केंद्रीय भाव और संदेश',
                  options: ['\'कृतिका भाग-2 — पाठ 14\' का मुख्य विषय — \'कृतिका भाग-2 — पाठ 14\' का केंद्रीय भाव और संदेश', '\'जॉर्ज पंचम की नाक\' का रचनाकार-परिचय व पृष्ठभूमि = कमलेश्वर का संक्षिप्त जीवन-वृत्त', '\'कृतिका भाग-2 — पाठ 14\' का कथानक — \'कृतिका भाग-2 — पाठ 14\' — कृतिका भाग-2 का पाठ। पाठ का', '\'कृतिका भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि कथानक भूल गए हों तो **c10_hin_kr_cbse_14_002** (कथानक) और **c10_hin_kr_cbse_14_004/005**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर लिखते हैं — *"मुख्य विषय है: जॉर्ज पंचम की नाक टूटना और उसे ठीक कराना।"* **क्यों होता है:** वे **कथानक (क्या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: *"कहानी की तीन बड़ी घटनाएँ लिखो।"* (वह लिखेगा: नाक टूटी, मूर्तिकार ने बनाई, नेता की नाक लगी।) 2.', 'अब पूछो: *"इन घटनाओं से लेखक **क्या कहना चाहता है**?', 'एक शब्द में नहीं, एक वाक्य में।"* 3.', 'यदि फिर अटके, तो संकेत दो: *"नेता लोग नाक के लिए पैसा देते हैं, अस्पताल के लिए नहीं — इससे क्या पता चलता है?"* 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
