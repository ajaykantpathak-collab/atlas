import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch08_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch08_p1',
    title: 'पाठ 8 · Part 1/3',
    subtitle: 'This node covers identifying the author\'s literary journey, the socio-historical setting.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 8 · Part 1/3',
    chapters: ['c9_hin_ga_ch08'],
    nodeIds: ['c9_hin_ga_cbse_08_001', 'c9_hin_ga_cbse_08_002', 'c9_hin_ga_cbse_08_003', 'c9_hin_ga_cbse_08_004', 'c9_hin_ga_cbse_08_005', 'c9_hin_ga_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'पहले रचनाकार: संत रविदास (रैदास)। फिर काल। फिर \'रैदास के पद\' का संदर्भ — रैदास के पद — सामाजिक समानता और.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'रैदास के पद\' संत रविदास (रैदास) द्वारा रचित कविता (पद) है। रचनाकार का जीवन, काल और साहित्यिक परिवेश पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — पृष्ठभूमि', 'पाठ 8 — कथानक', 'पाठ 8 — पाठ्य-परिवेश', 'पाठ 8 — पात्र-चित्रण', 'पाठ 8 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 1/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'रैदास के पद\' का कथानक — रैदास के पदों में जाति-भेद की निंदा और सच्ची भक्ति का संदेश.', answer: '8 -', options: ['8 -', '8 -'] },
            { id: 's2', label: '8 -', prompt: 'Which idea is this? — \'रैदास के पद\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित है।', answer: '8 -', options: ['8 -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_001', difficulty: 'standard',
          question: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'रैदास के पद\' संत रविदास (रैदास) द्वारा.',
          hint: 'If stuck, review the concept of **\'कारण और कार्य\' (Cause and Effect)** in non-literary.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पृष्ठभूमि परिचय" का अर्थ है **लेखक की जन्मतिथि, मृत्यु तिथि, प्रसिद्ध रचनाओं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)', '\'रैदास के पद\' का पात्र-चित्रण'],
                  hint: 'If stuck, review the concept of **\'कारण और कार्य\' (Cause and Effect)** in non-literary contexts.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पृष्ठभूमि परिचय" का अर्थ है **लेखक की जन्मतिथि, मृत्यु तिथि, प्रसिद्ध रचनाओं की सूची, और पुरस्कार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (तथ्य से अर्थ की ओर):** छात्र से कहें: "जन्मतिथि भूल जाओ। मुझे बताओ: इस लेखक ने जीवन में **सबसे बड़ा.', 'एक वाक्य में लिखो।" (यह \'केंद्रीय अनुभव\' निकालता है)। **चरण 2 (पाठ से जोड़):** "अब पाठ खोलो। वह **एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_002', difficulty: 'standard',
          question: '\'रैदास के पद\' का कथानक — रैदास के पदों में जाति-भेद की निंदा और सच्ची भक्ति का.',
          hint: 'यदि अटका हुआ महसूस हो तो: किसी भी परिचित फिल्म (जैसे \'शोले\' या \'दंगल\') का कथानक ५ सोपानों.',
          misconception: 'छात्र अक्सर **\'कालानुक्रम\' (Chronology)** को **\'कारण-कार्य क्रम\' (Causality)** मान लेते हैं। वे सोचते हैं: "घटना A पहले.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' का कथानक',
                  options: ['\'रैदास के पद\' का कथानक', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)', '\'रैदास के पद\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हुआ महसूस हो तो: किसी भी परिचित फिल्म (जैसे \'शोले\' या \'दंगल\') का कथानक ५ सोपानों में ५.',
                  misconception: 'छात्र अक्सर **\'कालानुक्रम\' (Chronology)** को **\'कारण-कार्य क्रम\' (Causality)** मान लेते हैं। वे सोचते हैं: "घटना A पहले हुई, घटना B बाद में.' }
          ],
            remediations: { 'chronology-causality-a': { steps: ['**चरण १:** छात्र से कहें: "दो घटनाएं चुनो जो एक के बाद एक हुई हों। अब बताओ: *पहली ने दूसरी को मजबूर किया* या *बस संयोग.', 'फॉर्स्टर का प्रसिद्ध उदाहरण दें: "राजा मरा, फिर रानी मरी" (कहानी) बनाम "राजा मरा, फिर रानी *शोक से* मरी" (कथानक)। छात्र.', '**चरण ३:** पाठ्यपुस्तक के किसी भी पाठ से ३ घटनाएं चुनकर **कारण-कार्य तीर (Causal Arrows)** खींचने को कहें: घटना १ →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_003', difficulty: 'standard',
          question: '\'रैदास के पद\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि अटके तो **c9_hin_ga_cbse_08_002 के \'कथानक-मानचित्र (plot map)\'** को दोबारा देखें — हर.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'परिवेश = वातावरण\' क्योंकि दोनों हिंदी में अक्सर \'माहौल\' शब्द से बताए जाते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' का पाठ्य-परिवेश (setting)',
                  options: ['\'रैदास के पद\' का पाठ्य-परिवेश (setting)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **c9_hin_ga_cbse_08_002 के \'कथानक-मानचित्र (plot map)\'** को दोबारा देखें — हर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'परिवेश = वातावरण\' क्योंकि दोनों हिंदी में अक्सर \'माहौल\' शब्द से बताए जाते हैं। **ठोस उदाहरण:** पाठ 8.' }
          ],
            remediations: { '8': { steps: ['**चरण 1:** छात्र से कहें — "पाठ का कोई एक पैरा पढ़ो और **लाल पेन से केवल संज्ञा/विशेषण** घेरो जो **देखे/सुने जा सकें**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_004', difficulty: 'standard',
          question: '\'रैदास के पद\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फँसें तो **c9_hin_ga_cbse_08_002 (कथानक और आख्यान-संरचना)** के \'क्लाइमेक्स\' और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि नायक का पात्र-चित्रण लिखने का अर्थ है — नायक के **गुणों की सूची बनाना**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' का पात्र-चित्रण',
                  options: ['\'रैदास के पद\' का पात्र-चित्रण', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **c9_hin_ga_cbse_08_002 (कथानक और आख्यान-संरचना)** के \'क्लाइमेक्स\' और \'रिज़ॉल्यूशन\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि नायक का पात्र-चित्रण लिखने का अर्थ है — नायक के **गुणों की सूची बनाना** (ईमानदार, बहादुर, दयालु) और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1: अवधारणा स्पष्टीकरण (Concept Clarification) — 5 मिनट:** छात्र के सामने एक ही पात्र का **\'चरित्र-चित्रण\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_005', difficulty: 'standard',
          question: '\'रैदास के पद\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटका हुआ महसूस करे तो नोड 004 के \'कार्य उदाहरण 1\' को दोहराए — वहाँ नायक के लिए.',
          misconception: 'छात्र मानते हैं कि \'सहायक पात्र = कम शब्दों में निपटा देने वाला पात्र\'। वे लिखते हैं: "रामू नायक का दोस्त था, उसने मदद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' के सहायक पात्र',
                  options: ['\'रैदास के पद\' के सहायक पात्र', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस करे तो नोड 004 के \'कार्य उदाहरण 1\' को दोहराए — वहाँ नायक के लिए प्रयुक्त चरणों.',
                  misconception: 'छात्र मानते हैं कि \'सहायक पात्र = कम शब्दों में निपटा देने वाला पात्र\'। वे लिखते हैं: "रामू नायक का दोस्त था, उसने मदद की।" **यह गलत है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पाठ से एक सहायक पात्र चुनो और उसके केवल **तीन संवाद/कर्म** लिखो जो नायक के बारे में कुछ बताते हों।" 2.', 'फिर पूछो: "इन तीनों से नायक के **कौन-कौन से गुण** उभरते हैं?', 'प्रत्येक के आगे गुण लिखो।" 3.', 'अब कहो: "इस पात्र को हटा दो — नायक का चित्रण कितना अधूरा रह जाएगा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_08_006', difficulty: 'standard',
          question: '\'रैदास के पद\' का मुख्य विषय — रैदास के पद — सामाजिक समानता और भक्ति का संदेश',
          hint: 'यदि अटके तो **c9_hin_ga_cbse_08_002 (कथानक और आख्यान-संरचना)** के \'चरम बिंदु (climax)\' और.',
          misconception: '**सबसे गहरी गलतफहमी:** छात्र मानते हैं कि **\'मुख्य विषय\' = \'कहानी का नैतिक उपदेश (moral lesson) एक वाक्य में\' (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रैदास के पद\' का मुख्य विषय',
                  options: ['\'रैदास के पद\' का मुख्य विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रैदास के पद\' का कथानक', '\'रैदास के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c9_hin_ga_cbse_08_002 (कथानक और आख्यान-संरचना)** के \'चरम बिंदु (climax)\' और \'निर्णायक.',
                  misconception: '**सबसे गहरी गलतफहमी:** छात्र मानते हैं कि **\'मुख्य विषय\' = \'कहानी का नैतिक उपदेश (moral lesson) एक वाक्य में\' (जैसे: \'सच बोलना चाहिए\'.' }
          ],
            remediations: { 'moral-lesson': { steps: ['**चरणबद्ध उपचार:** (1) छात्र से कहें: **"पाठ की 3 सबसे बड़ी घटनाएँ लिखो जिनमें नायक ने चुनाव किया (क्या किया, क्या नहीं.', 'स्वाभिमान?)"** — यह पैटर्न पहचानना सिखाता है। (3) अब कहें: **"उस मूल्य को एक वाक्य में ऐसा लिखो जैसे तुम किसी 25 वर्षीय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
