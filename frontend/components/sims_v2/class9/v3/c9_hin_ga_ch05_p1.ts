import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch05_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: '**इसमें शामिल है:** पाठ 5 से संबंधित विशिष्ट ऐतिहासिक कालखंड की प्रमुख घटनाएँ, तत्कालीन.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c9_hin_ga_ch05'],
    nodeIds: ['c9_hin_ga_cbse_05_001', 'c9_hin_ga_cbse_05_002', 'c9_hin_ga_cbse_05_003', 'c9_hin_ga_cbse_05_004', 'c9_hin_ga_cbse_05_005', 'c9_hin_ga_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'पहले रचनाकार: जगदीश चंद्र माथुर। फिर काल। फिर \'रीढ़ की हड्डी\' का संदर्भ — महिला-जीवन की समस्या — परंपरागत.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'रीढ़ की हड्डी\' जगदीश चंद्र माथुर द्वारा रचित एकांकी है। रचनाकार का जीवन, काल और साहित्यिक परिवेश पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 1/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — \'रीढ़ की हड्डी\' का कथानक — एकांकी में महिला के जीवन-संघर्ष और परंपरागत विवाह की रूढ़िगत.', answer: '5 -', options: ['5 -', '5 -'] },
            { id: 's2', label: '5 -', prompt: 'Which idea is this? — \'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित है।', answer: '5 -', options: ['5 -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_001', difficulty: 'standard',
          question: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'रीढ़ की हड्डी\' जगदीश चंद्र माथुर द्वारा.',
          hint: 'यदि अटके: **पाठ 5 के \'पृष्ठभूमि\' बॉक्स को फिर से पढ़ें और हर वाक्य के सामने पूछें — \'पाठ.',
          misconception: '**विशिष्ट भ्रांति:** *"पृष्ठभूमि और रचनाकार परिचय को \'इतिहास/जीवनी के तथ्य\' मानकर रट लेना पर्याप्त है; पाठ के प्रश्नों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)', '\'रीढ़ की हड्डी\' का पात्र-चित्रण'],
                  hint: 'यदि अटके: **पाठ 5 के \'पृष्ठभूमि\' बॉक्स को फिर से पढ़ें और हर वाक्य के सामने पूछें — \'पाठ में इसका.',
                  misconception: '**विशिष्ट भ्रांति:** *"पृष्ठभूमि और रचनाकार परिचय को \'इतिहास/जीवनी के तथ्य\' मानकर रट लेना पर्याप्त है; पाठ के प्रश्नों में इसका उपयोग केवल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (निदान):** छात्र से पूछें — *"पाठ 5 की पृष्ठभूमि में दिए गए **इतिहास के एक तथ्य** को उठाओ और बताओ कि **पाठ के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_002', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' का कथानक — एकांकी में महिला के जीवन-संघर्ष और परंपरागत विवाह की.',
          hint: 'यदि अटका हुआ महसूस हो तो: E.M. फोर्स्टर का *Aspects of the Novel* का वह अंश पढ़ें जहाँ वे.',
          misconception: '**भ्रांति:** "कथानक = घटनाओं का समय-क्रम (chronological order)।" **वास्तविकता:** कथानक **कारण-परिणाम तर्क** (causal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' का कथानक',
                  options: ['\'रीढ़ की हड्डी\' का कथानक', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)', '\'रीढ़ की हड्डी\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हुआ महसूस हो तो: E.M. फोर्स्टर का *Aspects of the Novel* का वह अंश पढ़ें जहाँ वे "The king.',
                  misconception: '**भ्रांति:** "कथानक = घटनाओं का समय-क्रम (chronological order)।" **वास्तविकता:** कथानक **कारण-परिणाम तर्क** (causal logic) है, न कि मात्र.' }
          ],
            remediations: { 'chronological-order-causal-logic': { steps: ['**चरण 1:** छात्र से कहें: "दो वाक्य लिखो: (अ) राजा मरा, फिर रानी मरी। (ब) राजा मरा, शोक से रानी मरी। बताओ कौन-सा कथानक.', '**चरण 2:** एक परिचित फिल्म (जैसे *शोले* या *बाहुबली*) का कथानक-आरेख बनाने को कहें — केवल **मोड़ (turning points)**.', '**चरण 3:** वही फिल्म लें और पूछें: "अगर यह कहानी अंत से शुरू होती (जेल में वीरू/कटप्पा), तो संरचना क्या होती?', 'पाठक पर क्या असर?" — इससे संरचना का स्वतंत्र अस्तित्व स्पष्ट होता है। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_003', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि अटके तो **c9_hin_ga_cbse_05_001 (रचनाकार परिचय)** दोहराएँ — रचनाकाल और सामाजिक.',
          misconception: 'छात्र अक्सर समझते हैं कि \'परिवेश\' का अर्थ केवल **भौगोलिक स्थान** (गाँव, शहर, पहाड़) और **काल** (साल, मौसम, दिन/रात) लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)',
                  options: ['\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **c9_hin_ga_cbse_05_001 (रचनाकार परिचय)** दोहराएँ — रचनाकाल और सामाजिक पृष्ठभूमि जाने.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'परिवेश\' का अर्थ केवल **भौगोलिक स्थान** (गाँव, शहर, पहाड़) और **काल** (साल, मौसम, दिन/रात) लिख देना है, और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — अवयव-पृथक्करण अभ्यास:** छात्र को 5 छोटे गद्यांश दें; प्रत्येक में वह तीन कॉलम बनाए: काल/स्थान | सामाजिक.', '**चरण 2 — शब्द-चयन सर्जरी:** एक ही तथ्य वाले दो वाक्य दें (जैसे "बारिश हो रही थी")। छात्र को केवल विशेषण/क्रिया बदलकर.', 'क्यों?" — इससे भाषा की एजेंसी समझ आएगी। 3.', '**चरण 3 — बोर्ड-शैली उत्तर लेखन:** PEEL संरचना (Point → Evidence → Explanation → Link) में एक 3-अंक का उत्तर लिखवाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_004', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके: **कथानक संरचना (नोड 002)** के \'संकट बिंदु (crisis points)\' दोबारा पढ़ें — वहीं.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = पात्र के **गुणों की परिभाषा लिखना** (जैसे: "साहस = खतरे में न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' का पात्र-चित्रण',
                  options: ['\'रीढ़ की हड्डी\' का पात्र-चित्रण', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **कथानक संरचना (नोड 002)** के \'संकट बिंदु (crisis points)\' दोबारा पढ़ें — वहीं पात्र के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = पात्र के **गुणों की परिभाषा लिखना** (जैसे: "साहस = खतरे में न डरना")। वे पाठ से.' }
          ],
            remediations: { 'evidence-explanation-6-8': { steps: ['**पहचान:** छात्र से पूछें — "तुमने \'साहसी\' लिखा, पाठ में **कौन-सा वाक्य/प्रसंग** यह सिद्ध करता है?', '**मॉडलिंग:** शिक्षक स्वयं एक गुण लें, पाठ से साक्ष्य ढूंढें, व्याख्या करें, विषय से जोड़ें — **लाइव डेमो** दें। 3.', '**अभ्यास:** छात्र को **एक गुण + एक साक्ष्य + एक व्याख्या** लिखने को दें (पूर्ण चित्रण नहीं)। 4.', '**फीडबैक:** जांचें कि व्याख्या में "क्यों/कैसे" है या केवल वर्णन। दोहराएँ जब तक PEEL स्वाभाविक न हो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_005', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 004 (पात्र-चित्रण: नायक) के \'फॉइल प्रभाव\' खंड को दोबारा.',
          misconception: 'छात्र समझते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\' और इसलिए उनके संवाद/कार्य को गहराई से नहीं पढ़ते। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' के सहायक पात्र',
                  options: ['\'रीढ़ की हड्डी\' के सहायक पात्र', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 004 (पात्र-चित्रण: नायक) के \'फॉइल प्रभाव\' खंड को दोबारा पढ़ें और एक.',
                  misconception: 'छात्र समझते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\' और इसलिए उनके संवाद/कार्य को गहराई से नहीं पढ़ते। वास्तव में बोर्ड परीक्षा में पूछा.' }
          ],
            remediations: { 'x': { steps: ['छात्र से कहें: "पाठ से उस सहायक पात्र के तीन संवाद ढूंढो जहां वह सीधे नायक से बोल रहा हो।" 2.', 'फिर पूछें: "इनमें से प्रत्येक संवाद के बाद नायक ने क्या किया या सोचा?', 'अब तालिका बनाएं: स्तंभ 1 — सहायक पात्र का संवाद, स्तंभ 2 — नायक की तत्काल प्रतिक्रिया, स्तंभ 3 — नायक का कौन-सा गुण.', 'अंत में एक वाक्य में लिखें: "इस प्रकार पात्र X नायक के गुण Y को फॉइल बनकर उभारता है।" यह चरण-दर-चरण प्रक्रिया \'वर्णन\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_006', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' का मुख्य विषय — महिला-जीवन की समस्या — परंपरागत विवाह की आलोचना',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 002 (कथानक) के \'चरम बिंदु (climax)\' और नोड 004 (नायक) के.',
          misconception: 'छात्र अक्सर **\'विषय\' को \'नैतिक शिक्षा के एक वाक्य\' (जैसे \'सत्य बोलो\', \'बड़ों का आदर करो\') तक सीमित कर देते हैं**, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' का मुख्य विषय',
                  options: ['\'रीढ़ की हड्डी\' का मुख्य विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 002 (कथानक) के \'चरम बिंदु (climax)\' और नोड 004 (नायक) के \'आंतरिक.',
                  misconception: 'छात्र अक्सर **\'विषय\' को \'नैतिक शिक्षा के एक वाक्य\' (जैसे \'सत्य बोलो\', \'बड़ों का आदर करो\') तक सीमित कर देते हैं**, जबकि विषय एक **जटिल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 5 के **तीन प्रमुख मोड़** (आरंभिक संघर्ष, चरम निर्णय, अंतिम परिणति) लिखने को कहें — केवल घटनाएं, व्याख्या.', 'हर मोड़ के सामने पूछें: "यह घटना मानव जीवन की कौन-सी बड़ी सच्चाई दिखाती है?" — उत्तर एक वाक्य में लिखवाएं। 3.', 'तीनों वाक्यों को मिलाकर देखें: क्या कोई **साझा धागा (common thread)** है?', 'अंत में कहें: "अब इस विषय से तू अपने लिए एक सीख (संदेश) निकाल — वह उपदेश नहीं, तेरा अपना निष्कर्ष हो।" यह प्रक्रिया.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
