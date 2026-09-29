import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch03_p1: SimDef = {
    id: 'v3_c11_hin_a_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 3 की ऐतिहासिक-सामाजिक पृष्ठभूमि (काल-परिस्थिति) और रचनाकार के.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c11_hin_a_ch03'],
    nodeIds: ['c11_hin_a_cbse_03_001', 'c11_hin_a_cbse_03_002', 'c11_hin_a_cbse_03_003', 'c11_hin_a_cbse_03_004', 'c11_hin_a_cbse_03_005', 'c11_hin_a_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतरा भाग-1 खोलिए और पाठ 03 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का.', answer: '3 -', options: ['3 -', '3 -'] },
            { id: 's2', label: '3 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.', answer: '3 -', options: ['3 -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि फंसे हों, तो **\'रचनाकार का समय-काल\' (Author\'s Zeitgeist)** की अवधारणा को दोहराएं.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"पृष्ठभूमि = कहानी का समय/स्थान (Setting) मात्र"** और **"रचनाकार परिचय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फंसे हों, तो **\'रचनाकार का समय-काल\' (Author\'s Zeitgeist)** की अवधारणा को दोहराएं: रचनाकार अपने.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"पृष्ठभूमि = कहानी का समय/स्थान (Setting) मात्र"** और **"रचनाकार परिचय = जन्म-मृत्यु तिथि, प्रसिद्ध.' }
          ],
            remediations: { 'setting': { steps: ['**चरण 1: अवधारणा स्पष्टीकरण (Concept Clarification)** — छात्र के सामने दो कॉलम बनवाएं: **कॉलम A: \'तथ्य/सेटिंग\'.', 'रचनाकार के किस अनुभव ने इस चुप्पी को \'विद्रोह\' नहीं \'समझौता\' लिखवाया?" जब तक छात्र **\'बाहरी दबाव\' (External Pressure)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_002', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ।.',
          hint: 'यदि फंसे तो E.M. फॉर्स्टर के \'कहानी बनाम कथावस्तु\' उदाहरण को पुनः पढ़ें और किसी परिचित.',
          misconception: 'छात्र प्रायः \'कथानक में फ्लैशबैक\' और \'आख्यान-संरचना में फ्लैशबैक\' को समान मानते हैं; वे नहीं समझते कि कथानक-स्तर पर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फंसे तो E.M. फॉर्स्टर के \'कहानी बनाम कथावस्तु\' उदाहरण को पुनः पढ़ें और किसी परिचित फिल्म पर.',
                  misconception: 'छात्र प्रायः \'कथानक में फ्लैशबैक\' और \'आख्यान-संरचना में फ्लैशबैक\' को समान मानते हैं; वे नहीं समझते कि कथानक-स्तर पर फ्लैशबैक एक \'घटना\' है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र को एक परिचित फिल्म (जैसे \'दंगल\' या \'बाहुबली\') के दो संस्करण बनाने को कहें — संस्करण अ: पूरी कहानी कालक्रम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_003', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'कथानक-संरचना (c11_hin_a_cbse_03_002) के \'चरम बिंदु\' और \'पतन\' खंड को दोबारा पढ़ें; देखें.',
          misconception: 'छात्र \'परिवेश\' को केवल भौगोलिक स्थान (गाँव/शहर, वर्ष/महीना) मानते हैं और \'वातावरण\' को मौसम (बारिश/धूप) समझते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'कथानक-संरचना (c11_hin_a_cbse_03_002) के \'चरम बिंदु\' और \'पतन\' खंड को दोबारा पढ़ें; देखें कि प्रत्येक.',
                  misconception: 'छात्र \'परिवेश\' को केवल भौगोलिक स्थान (गाँव/शहर, वर्ष/महीना) मानते हैं और \'वातावरण\' को मौसम (बारिश/धूप) समझते हैं। वास्तव में, परिवेश में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पाठ के किसी एक पृष्ठ को पढ़कर सभी संवेदी शब्दों (देखना, सुनना, सूंघना, छूना, चखना) को अलग रंग से.', 'चरण 3: पूछें: "यदि यह विवरण हटा दिया जाए, तो पात्र का निर्णय कैसे बदलेगा?" — इससे वातावरण की क्रियात्मक भूमिका स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_004', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_03_002 (कथानक और आख्यान-संरचना)** के \'उत्कर्ष.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि नायक का चित्रण = **\'गुणों की सूची\' (List of Traits) + \'कुछ उद्धरण\' (Few.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_03_002 (कथानक और आख्यान-संरचना)** के \'उत्कर्ष बिंदु\' और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि नायक का चित्रण = **\'गुणों की सूची\' (List of Traits) + \'कुछ उद्धरण\' (Few Quotes)**। **गलत तर्क.' }
          ],
            remediations: { 'list-of-traits-few-quotes': { steps: ['**चरणबद्ध उपचार (Remediation Steps):** 1.', '**\'गुण-शब्द\' प्रतिबंध लगाएँ:** छात्र से कहें—"अगले 3 अभ्यासों में आप **\'साहसी, ईमानदार, दयालु, बुद्धिमान, संघर्षशील\'.', '**\'क्यों-सीढ़ी\' (Why-Ladder) बनवाएँ:** एक क्रिया चुनें (जैसे: नायक ने नौकरी छोड़ी)। पूछें—"क्यों?" → उत्तर मिले तो फिर.', '**\'विरोधाभास-युग्म\' (Contradiction Pairs) खोजें:** पाठ से 3 ऐसे प्रसंग निकालें जहाँ नायक **अपने ही पूर्व-व्यवहार के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_005', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटके: **नायक के \'झूठ\' (Lie he believes) और \'सत्य\' (Truth he must learn)** को पुनः.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'सहायक पात्र का विश्लेषण\' = \'सहायक पात्र का वर्णन\' (description)**। वे पाठ से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: **नायक के \'झूठ\' (Lie he believes) और \'सत्य\' (Truth he must learn)** को पुनः पहचानें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'सहायक पात्र का विश्लेषण\' = \'सहायक पात्र का वर्णन\' (description)**। वे पाठ से पात्र के **गुणों की.' }
          ],
            remediations: { 'description-list-of-traits': { steps: ['**चरणबद्ध उपचार (Remediation Steps):** 1.', '**\'गुण बनाम कार्य\' (Trait vs Function) तालिका बनवाएं:** छात्र से दो कॉलम बनवाएं — बायाँ: "पात्र के गुण (Adjectives)".', '**\'हटाओ परीक्षण\' (Deletion Test) करवाएं:** पूछें: "यदि इस पात्र को पाठ से हटा दें, तो **कौन-सा विशिष्ट दृश्य (specific.', '**PEEL का \'L\' (Link) जबरन लिखवाएं:** हर बिंदु के अंत में लिखवाएं: **"इससे पाठ का केंद्रीय विषय ______ कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_03_006', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 3\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 3\' का केंद्रीय भाव और.',
          hint: 'यदि अटके तो: **c11_hin_a_cbse_03_002 (कथानक)** और **c11_hin_a_cbse_03_004 (नायक चित्रण)**.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' पाठ में **स्पष्ट रूप से लिखा हुआ एक वाक्य** होता है जिसे बस ढूंढकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 3\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 3\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-1 — पाठ 3\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 3\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 3\' का कथानक — \'अंतरा भाग-1 — पाठ 3\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो: **c11_hin_a_cbse_03_002 (कथानक)** और **c11_hin_a_cbse_03_004 (नायक चित्रण)** को 15.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' पाठ में **स्पष्ट रूप से लिखा हुआ एक वाक्य** होता है जिसे बस ढूंढकर निकालना है (जैसे किसी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें (Re-read):** पाठ के **अंतिम 3 पैराग्राफ** और **शीर्षक** को एक साथ पढ़ें — पूछें: "लेखक अंत में मुझे क्या.', '**पात्र-निर्णय मैपिंग (Decision Mapping):** एक टेबल बनाएँ — कॉलम: प्रसंग | नायक का निर्णय | अंतर्निहित मूल्य। 3-4.', '**विषय-वाक्य निर्माण (Theme Statement Formula):** "[रचना] दर्शाती है कि [सार्वभौमिक मानवीय सत्य], जब [पात्र] [विशिष्ट.', '**संदेश निकालें:** विषय-वाक्य से पूछें: "तो पाठक को क्या करना चाहिए?" — वही संदेश है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
