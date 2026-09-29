import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch02_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'This node covers the author\'s relevant biographical milestones, the socio-political.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c9_hin_ga_ch02'],
    nodeIds: ['c9_hin_ga_cbse_02_001', 'c9_hin_ga_cbse_02_002', 'c9_hin_ga_cbse_02_003', 'c9_hin_ga_cbse_02_004', 'c9_hin_ga_cbse_02_005', 'c9_hin_ga_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'पहले रचनाकार: राहुल सांकृत्यायन। फिर काल। फिर \'ल्हासा की ओर\' का संदर्भ — ल्हासा की यात्रा — तिब्बत की भौगोलिक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'ल्हासा की ओर\' राहुल सांकृत्यायन द्वारा रचित गद्य (यात्रा-वृत्तांत) है। रचनाकार का जीवन, काल और साहित्यिक परिवेश पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — \'ल्हासा की ओर\' का कथानक — राहुल सांकृत्यायन का तिब्बत-यात्रा वृत्तांत — कठिन मार्ग.', answer: '2 -', options: ['2 -', '2 -'] },
            { id: 's2', label: '2 -', prompt: 'Which idea is this? — \'ल्हासा की ओर\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित है।', answer: '2 -', options: ['2 -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_001', difficulty: 'standard',
          question: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'ल्हासा की ओर\' राहुल सांकृत्यायन द्वारा.',
          hint: 'If stuck, review the Class 8 History chapter on \'The Making of the National Movement\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर "पृष्ठभूमि" को केवल **इतिहास की तारीखों, घटनाओं और लेखक की जीवनी के तथ्यों (जन्म.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)', '\'ल्हासा की ओर\' का पात्र-चित्रण'],
                  hint: 'If stuck, review the Class 8 History chapter on \'The Making of the National Movement\' or \'India.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर "पृष्ठभूमि" को केवल **इतिहास की तारीखों, घटनाओं और लेखक की जीवनी के तथ्यों (जन्म, मृत्यु, पुरस्कार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (तत्काल सुधार):** छात्र से कहें: "लेखक की जीवनी की 5 पंक्तियाँ लिखो। अब पाठ 2 खोलकर उन 5 पंक्तियों में से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_002', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' का कथानक — राहुल सांकृत्यायन का तिब्बत-यात्रा वृत्तांत — कठिन.',
          hint: 'यदि फँसें तो \'कथ्य बनाम शिल्प\' (Content vs Form) का भेद दोहराएँ—उदाहरण: एक ही घटना.',
          misconception: 'छात्र प्रायः मान लेते हैं कि **\'कथानक के पांच सोपान एक निश्चित समय-अवधि में घटित होते हैं\'**—जैसे विकास सोपान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' का कथानक',
                  options: ['\'ल्हासा की ओर\' का कथानक', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)', '\'ल्हासा की ओर\' का पात्र-चित्रण'],
                  hint: 'यदि फँसें तो \'कथ्य बनाम शिल्प\' (Content vs Form) का भेद दोहराएँ—उदाहरण: एक ही घटना (बारिश) को रैखिक.',
                  misconception: 'छात्र प्रायः मान लेते हैं कि **\'कथानक के पांच सोपान एक निश्चित समय-अवधि में घटित होते हैं\'**—जैसे विकास सोपान चरमोत्कर्ष से \'कम लंबा\' होता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक परिचित कहानी (जैसे \'कफन\' या \'उपन्यास का एक अंश\') दें और कहें: "केवल **चरमोत्कर्ष** वाला पैराग्राफ ढूंढो—वह.', 'फिर पूछें: "इस निर्णय से *पहले* कौन-सी तीन घटनाएँ घटीं जिन्होंने यह स्थिति बनाई?', '(विकास सोपान)" और "इस निर्णय के *बाद* पहली दो घटनाएँ कौन-सी हैं?', 'अंत में कहें: "देखो—विकास 10 पृष्ठों का था, चरमोत्कर्ष आधा पृष्ठ, पतन 2 पृष्ठ। सोपान *लंबाई* से नहीं, *कारण-कार्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_003', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि अटके तो **\'कथानक और आख्यान-संरचना\' (c9_hin_ga_cbse_02_002)** के उस भाग को दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'वातावरण\' (Atmosphere/Mood)** और **\'परिवेश\' (Setting)** को समानार्थी मानते हैं। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)',
                  options: ['\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **\'कथानक और आख्यान-संरचना\' (c9_hin_ga_cbse_02_002)** के उस भाग को दोहराएँ जहाँ बताया.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'वातावरण\' (Atmosphere/Mood)** और **\'परिवेश\' (Setting)** को समानार्थी मानते हैं। वे लिखते हैं: "कहानी का परिवेश.' }
          ],
            remediations: { 'atmosphere-mood-setting': { steps: ['**स्पष्टीकरण (2 मिनट):** बोर्ड पर "परिवेश" और "वातावरण" दो कॉलम बनाएँ। बाएँ: तथ्य (गाँव, 1947, जमींदारी, कच्चा मकान.', '**अभ्यास (5 मिनट):** पाठ्यपुस्तक के किसी एक पैराग्राफ से **केवल संज्ञा/विशेषण (तथ्य)** छाँटकर बाएँ लिखवाएँ, फिर.', '**लेखन (3 मिनट):** छात्र से कहें: "एक वाक्य लिखो जिसमें परिवेश हो, दूसरा जिसमें वातावरण हो — दोनों एक ही दृश्य के लिए।".', '**फीडबैक:** यदि फिर भी मिलाए तो पूछें: "अगर मैं कमरे का तापमान 40°C लिखूँ — यह परिवेश है या वातावरण?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_004', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फँस जाएँ तो **कथानक संरचना (c9_hin_ga_cbse_02_002)** के \'चरमोत्कर्ष (Climax)\' और \'पतन.',
          misconception: '**विशिष्ट भ्रांति:** "पात्र-चित्रण में पात्र के जीवन की **कालानुक्रमिक (Chronological) कहानी** सुनानी होती है — जन्म से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' का पात्र-चित्रण',
                  options: ['\'ल्हासा की ओर\' का पात्र-चित्रण', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **कथानक संरचना (c9_hin_ga_cbse_02_002)** के \'चरमोत्कर्ष (Climax)\' और \'पतन क्रिया.',
                  misconception: '**विशिष्ट भ्रांति:** "पात्र-चित्रण में पात्र के जीवन की **कालानुक्रमिक (Chronological) कहानी** सुनानी होती है — जन्म से लेकर अंत तक.' }
          ],
            remediations: { 'chronological-summary-trait-based-structure': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पहचान कराएँ:** छात्र से पूछें — "तुमने जो लिखा, वह \'क्या हुआ\' बताता है या \'कैसा व्यक्ति है\' बताता है?" अंतर स्पष्ट.', '**गुण-निष्कर्षण अभ्यास (Trait Extraction Drill):** पाठ से 5 प्रमुख प्रसंग चुनवाएँ। प्रत्येक के लिए पूछें: "इस प्रसंग से.', '**PEEL ढाँचे में पुनर्लेखन:** उसी उत्तर को PEEL (Point: गुण बताएँ → Evidence: प्रसंग/उद्धरण → Explanation: यह गुण कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_005', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटका हुआ लगे: **नोड 004 (नायक-चित्रण) के \'PEEL संरचना\' वाले कार्यित उदाहरण** को.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\' और इसलिए उनके संवाद/कार्य को \'फिलर\' (भराव).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' के सहायक पात्र',
                  options: ['\'ल्हासा की ओर\' के सहायक पात्र', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ लगे: **नोड 004 (नायक-चित्रण) के \'PEEL संरचना\' वाले कार्यित उदाहरण** को दोबारा पढ़ें और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\' और इसलिए उनके संवाद/कार्य को \'फिलर\' (भराव) मानकर विश्लेषण नहीं.' }
          ],
            remediations: { 'cbse-5-3': { steps: ['**पुनः पढ़ें:** पाठ से उन 3-4 प्रसंगों को चिह्नित करें जहाँ नायक किसी अन्य पात्र से बात करता है या उसके कारण निर्णय.', '**तालिका बनाएं:** दो कॉलम — \'सहायक पात्र का कथन/कर्म\' और \'नायक पर प्रभाव/उभरा गुण\'। 3.', '**लेबल लगाएं:** प्रत्येक पंक्ति के लिए लिखें — फॉइल / कॉन्फिडेंट / कैटालिस्ट / एंटागोनिस्ट। 4.', '**लिखें:** एक पैराग्राफ (PEEL संरचना में) जिसमें दावा हो, पाठ्य-साक्ष्य हो, व्याख्या हो, और विषय-वस्तु से संबंध हो।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_006', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' का मुख्य विषय — ल्हासा की यात्रा — तिब्बत की भौगोलिक और.',
          hint: 'यदि अटके तो **पात्र-चित्रण नोड (c9_hin_ga_cbse_02_004/005)** पर लौटकर नायक के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'मुख्य विषय\' पाठ में कहीं एक वाक्य में लिखा हुआ मिलेगा** (जैसे थीम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' का मुख्य विषय',
                  options: ['\'ल्हासा की ओर\' का मुख्य विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **पात्र-चित्रण नोड (c9_hin_ga_cbse_02_004/005)** पर लौटकर नायक के \'मूल्य-प्रणाली\'.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'मुख्य विषय\' पाठ में कहीं एक वाक्य में लिखा हुआ मिलेगा** (जैसे थीम स्टेटमेंट)। वे पाठ में "मुख्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को पाठ के **5 निर्णायक प्रसंग** (turning points) चुनने को कहो — जहां पात्र के सामने दो रास्ते थे और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
