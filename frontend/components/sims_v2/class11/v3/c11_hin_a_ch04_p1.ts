import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch04_p1: SimDef = {
    id: 'v3_c11_hin_a_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'इस नोड में **केवल** पृष्ठभूमि (ऐतिहासिक/सामाजिक परिवेश) एवं रचनाकार परिचय (जीवन-परिचय.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c11_hin_a_ch04'],
    nodeIds: ['c11_hin_a_cbse_04_001', 'c11_hin_a_cbse_04_002', 'c11_hin_a_cbse_04_003', 'c11_hin_a_cbse_04_004', 'c11_hin_a_cbse_04_005', 'c11_hin_a_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतरा भाग-1 खोलिए और पाठ 04 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 1/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ। पाठ का.', answer: '4 -', options: ['4 -', '4 -'] },
            { id: 's2', label: '4 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.', answer: '4 -', options: ['4 -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि फँस जाएँ तो **\'साहित्यिक धाराओं का संक्षिप्त परिचय\' (छायावाद, प्रगतिवाद, प्रयोगवाद.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'रचनाकार परिचय\' = \'रचनाकार की जीवनी (biography) याद करना\'** और **\'पृष्ठभूमि\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फँस जाएँ तो **\'साहित्यिक धाराओं का संक्षिप्त परिचय\' (छायावाद, प्रगतिवाद, प्रयोगवाद, नई कविता.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'रचनाकार परिचय\' = \'रचनाकार की जीवनी (biography) याद करना\'** और **\'पृष्ठभूमि\' = \'इतिहास की तारीखें.' }
          ],
            remediations: { 'biography-facts-interconnection': { steps: ['**चरण 1 — तथ्य-अलग, विश्लेषण-अलग (Separate Facts from Analysis):** छात्र से कहें: "एक कागज़ पर दो कॉलम बनाओ — बाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_002', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ।.',
          hint: 'यदि फँस जाएँ तो: "फ्रेटाग पिरामिड के पाँच सोपान" और "रैखिक vs अरैखिक संरचना के उदाहरण".',
          misconception: '**भ्रम:** "कथानक = घटनाओं की सूची; आख्यान-संरचना = अध्यायों/खंडों में विभाजन।" **वास्तविक त्रुटि:** छात्र कथानक को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ। पाठ का',
                  options: ['\'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फँस जाएँ तो: "फ्रेटाग पिरामिड के पाँच सोपान" और "रैखिक vs अरैखिक संरचना के उदाहरण" दोहराएँ — ये.',
                  misconception: '**भ्रम:** "कथानक = घटनाओं की सूची; आख्यान-संरचना = अध्यायों/खंडों में विभाजन।" **वास्तविक त्रुटि:** छात्र कथानक को **स्थिर संज्ञा** (static.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**फॉर्स्टर का उदाहरण दोहराएँ:** "राजा मरा, रानी मरी" vs "राजा मरा, शोक से रानी मरी" — छात्र से कारण-कार्य शब्द (इसलिए.', '**पिरामिड बनवाएँ:** खाली फ्रेटाग पिरामिड देकर किसी ज्ञात कहानी (पंचतंत्र/फिल्म) के सोपान भरने को कहें — केवल लेबल नहीं.', '**संरचना-परिवर्तन अभ्यास:** एक रैखिक पैराग्राफ दें, उसे अरैखिक में पुनर्लेखन करवाएँ — फिर पूछें: "पाठक का ध्यान अब कहाँ.', '**बोर्ड-शैली प्रश्न:** "संरचना कथ्य को कैसे रूपायित करती है?" — इस वाक्य-रूप (sentence frame) का अभ्यास करवाएँ: "लेखक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_003', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके तो c11_hin_a_cbse_04_002 (कथानक और आख्यान-संरचना) के \'चरमोत्कर्ष\' (climax) वाले.',
          misconception: 'छात्र प्रायः \'पाठ्य-परिवेश\' को \'पृष्ठभूमि\' (background) का पर्याय मान लेते हैं — जैसे यह कोई स्थिर पेंटिंग हो जिसे लेखक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_04_002 (कथानक और आख्यान-संरचना) के \'चरमोत्कर्ष\' (climax) वाले खंड को.',
                  misconception: 'छात्र प्रायः \'पाठ्य-परिवेश\' को \'पृष्ठभूमि\' (background) का पर्याय मान लेते हैं — जैसे यह कोई स्थिर पेंटिंग हो जिसे लेखक कैनवास पर टांग देता.' }
          ],
            remediations: { 'background-active-agent': { steps: ['चरण 1: छात्र से कहें — "आंखें बंद करो और पाठ 4 का कोई एक दृश्य याद करो। अब बताओ: वहां हवा में क्या गंध है?', 'कौन सी आवाज बार-बार आती है?', 'कौन सा रंग सबसे ज्यादा दिखता है?" — यह संवेदनात्मक स्मृति (sensory recall) सक्रिय करता है। चरण 2: उनसे पूछें — "यही.', 'क्या नायक वही निर्णय लेता?" — यह परिवेश की \'निर्धारक शक्ति\' (deterministic power) स्पष्ट करता है। चरण 3: एक टेबल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_004', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो तो **कथानक-संरचना (c11_hin_a_cbse_04_002)** के \'चरमोत्कर्ष.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = **गुणों की सूची (list of traits)** बनाना है (जैसे: ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'अंतरा भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कथानक-संरचना (c11_hin_a_cbse_04_002)** के \'चरमोत्कर्ष (climax)\' और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = **गुणों की सूची (list of traits)** बनाना है (जैसे: ईमानदार, साहसी, भावुक.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**लक्षित सुधार (3-चरणीय):** 1.', '**साक्ष्य-आधारित तालिका बनवाएँ:** छात्र से कहें — नायक के **प्रत्येक दावे (claim)** के सामने **कॉलम 1: पाठ्य-संदर्भ.', '**\'क्यों\' की श्रृंखला (Why-chain) चलवाएँ:** प्रत्येक गुण के लिए 3 बार "क्यों?" पूछें — "साहसी क्यों?', '→ भाई ही एकमात्र सहारा।" — इससे **प्रेरणा-गहराई (motivation depth)** खुलती है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_005', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 4\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटके तो **नोड 004 (पात्र-चित्रण: नायक)** के \'चरित्र-विकास के चरण\' और \'द्वंद्व के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि "सहायक पात्र = नायक का मित्र/सहयोगी" और उसकी भूमिका केवल नायक की सहायता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 4\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'अंतरा भाग-1 — पाठ 4\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **नोड 004 (पात्र-चित्रण: नायक)** के \'चरित्र-विकास के चरण\' और \'द्वंद्व के प्रकार\' दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मानते हैं कि "सहायक पात्र = नायक का मित्र/सहयोगी" और उसकी भूमिका केवल नायक की सहायता करना है। **गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें: "पाठ से उस सहायक पात्र के **तीन संवाद/कार्य** निकालो जो नायक के **विरुद्ध** जाते हों.', '**दूसरा कदम:** पूछें: "यदि यह पात्र न होता, तो नायक का यह निर्णय/विकास संभव होता?" — यदि उत्तर \'हाँ\' है, तो पात्र.', '**तीसरा कदम:** छात्र को उस पात्र का **\'छिपा हुआ उद्देश्य\' (Hidden Motive)** लिखने को कहें जो पाठ में स्पष्ट न हो (जैसे.', '**चौथा कदम:** अंत में, छात्र से **एक पैराग्राफ** लिखवाएँ: "यह सहायक पात्र नायक के **कौन-से दो विरोधी पहलुओं** (जैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_006', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 4\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 4\' का केंद्रीय भाव और.',
          hint: 'यदि अटके हों, तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c11_hin_a_cbse_04_004) के.',
          misconception: 'विद्यार्थी अक्सर **\'विषय\' को \'कहानी का सारांश\' (summary) या \'नैतिक शिक्षा\' (moral lesson) समझ लेते हैं**। उदाहरण: पाठ 4.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 4\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 4\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-1 — पाठ 4\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 4\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 4\' का कथानक — \'अंतरा भाग-1 — पाठ 4\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके हों, तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c11_hin_a_cbse_04_004) के \'निर्णय-बिंदु.',
                  misconception: 'विद्यार्थी अक्सर **\'विषय\' को \'कहानी का सारांश\' (summary) या \'नैतिक शिक्षा\' (moral lesson) समझ लेते हैं**। उदाहरण: पाठ 4 में वे लिखते हैं.' }
          ],
            remediations: { 'summary-moral-lesson-4': { steps: ['विद्यार्थी से कहें: "पाठ के 3 प्रमुख दृश्य चुनो जहाँ नायक कोई निर्णय लेता है। प्रत्येक में पूछो: *यह निर्णय किस बड़े.', 'फिर पूछें: "इन मुद्दों में कौन-सा पूरे पाठ में बार-बार, अलग-अलग रूपों में आता है?" — वही मुख्य विषय है। 3.', 'अंत में: "लेखक इस मुद्दे पर अंत में क्या कहना चाहता है?', 'क्या वह कोई समाधान देता है या केवल प्रश्न छोड़ता है?" — इससे संदेश निकलेगा। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
