import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch06_p1: SimDef = {
    id: 'v3_c11_hin_a_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'यह नोड **केवल** पाठ 6 की पृष्ठभूमि (काल, समाज, आंदोलन) और रचनाकार के साहित्यिक व्यक्तित्व.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c11_hin_a_ch06'],
    nodeIds: ['c11_hin_a_cbse_06_001', 'c11_hin_a_cbse_06_002', 'c11_hin_a_cbse_06_003', 'c11_hin_a_cbse_06_004', 'c11_hin_a_cbse_06_005', 'c11_hin_a_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतरा भाग-1 खोलिए और पाठ 06 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — पृष्ठभूमि', 'पाठ 6 — कथानक', 'पाठ 6 — पाठ्य-परिवेश', 'पाठ 6 — पात्र-चित्रण', 'पाठ 6 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 1/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ। पाठ का.', answer: '6 -', options: ['6 -', '6 -'] },
            { id: 's2', label: '6 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.', answer: '6 -', options: ['6 -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'अगर फँसें तो **\'नई कहानी आंदोलन\' (कमलेश्वर, मोहन राकेश, राजेंद्र यादव)** और **\'अंचलिक.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'पृष्ठभूमि\' को \'कथानक की पृष्ठभूमि\' (Setting of Plot)** समझ लेते हैं — जैसे "कहानी गाँव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'अगर फँसें तो **\'नई कहानी आंदोलन\' (कमलेश्वर, मोहन राकेश, राजेंद्र यादव)** और **\'अंचलिक यथार्थवाद\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'पृष्ठभूमि\' को \'कथानक की पृष्ठभूमि\' (Setting of Plot)** समझ लेते हैं — जैसे "कहानी गाँव में होती है, नदी.' }
          ],
            remediations: { 'setting-of-plot': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**टाइमलाइन बनवाएँ (5 मिनट):** छात्र से कहें — शेखर जोशी के जीवन की **5 प्रमुख घटनाएँ** (जन्म 1932, इलाहाबाद/नैनीताल.', '**\'बायोडाटा vs साहित्यिक व्यक्तित्व\' तालिका:** दो कॉलम — बाएँ: जन्म, डिग्री, नौकरी, पुरस्कार; दाएँ: पहली कहानी कब/क्यों.', '**तुलनात्मक पठन:** प्रेमचंद की \'पूस की रात\' और शेखर जोशी की \'कोसी का घटवार\' का **प्रथम पैराग्राफ** साथ रखें — छात्र से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_002', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ।.',
          hint: 'अगर अटका हुआ महसूस हो तो \'कथानक के पांच सोपान\' (फ्रेटैग पिरामिड) को किसी परिचित कहानी.',
          misconception: 'छात्र प्रायः मान लेते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं, क्योंकि दोनों \'कहानी कैसे बनी\' से जुड़े लगते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ। पाठ का',
                  options: ['\'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'अगर अटका हुआ महसूस हो तो \'कथानक के पांच सोपान\' (फ्रेटैग पिरामिड) को किसी परिचित कहानी (जैसे \'ईदगाह\'.',
                  misconception: 'छात्र प्रायः मान लेते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं, क्योंकि दोनों \'कहानी कैसे बनी\' से जुड़े लगते हैं। वास्तव में कथानक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "एक परिचित फिल्म (जैसे \'शोले\') का कथानक 5 वाक्यों में लिखो — केवल घटनाएँ, क्रम से।" 2.', 'फिर कहें: "अब बताओ फिल्म *कैसे* शुरू होती है?', '(ठाकुर का हाथ कटा दिखाना → फ्लैशबैक में गब्बर का अत्याचार)। यह अंतर ही कथानक vs आख्यान-संरचना है।" 3.', 'फ्रेटैग पिरामिड का चित्र बनवाएँ और प्रत्येक सोपान पर फिल्म का एक दृश्य चिपकवाएँ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_003', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके तो **\'कथानक और आख्यान-संरचना\' (Node 002)** के \'उद्भव/प्रस्तावना\' खंड को दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'पाठ्य-परिवेश\' (Setting) और \'पृष्ठभूमि\' (Background) को समानार्थी मानते हैं और परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके तो **\'कथानक और आख्यान-संरचना\' (Node 002)** के \'उद्भव/प्रस्तावना\' खंड को दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'पाठ्य-परिवेश\' (Setting) और \'पृष्ठभूमि\' (Background) को समानार्थी मानते हैं और परीक्षा में लिख देते हैं: *"कहानी.' }
          ],
            remediations: { 'setting-background': { steps: ['**दृश्यात्मक अभ्यास (Visual Mapping):** छात्र से कहें कि पाठ के किन्हीं दो विपरीत दृश्यों (जैसे गाँव का घर vs शहर का.', '**\'क्या होता यदि...\' (Counterfactual) प्रश्न:** पूछें — *"यदि यह संवाद अस्पताल के कॉरिडोर में होता न कि मंदिर के.', '**भाषिक साक्ष्य तालिका (Linguistic Evidence Table):** तीन कॉलम बनवाएँ: (क) परिवेश विवरण (पाठ उद्धरण), (ख) संवेदी बिंब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_004', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फँसें तो **कथानक के तीन प्रमुख मोड़ (turning points)** पहचानें और पूछें: "इनमें नायक.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **पात्र-चित्रण = पात्र के गुणों की सूची बनाना + दो-चार उद्धरण चिपकाना**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'अंतरा भाग-1 — पाठ 6\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो **कथानक के तीन प्रमुख मोड़ (turning points)** पहचानें और पूछें: "इनमें नायक ने क्या.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **पात्र-चित्रण = पात्र के गुणों की सूची बनाना + दो-चार उद्धरण चिपकाना**। वे **\'क्या (what)\'** लिखते.' }
          ],
            remediations: { 'what-how-why-explanation': { steps: ['**चरण 1**: छात्र को एक **मॉडल उत्तर (model answer)** दिखाओ जिसमें PEEL के चारों चरण रंगीन हाइलाइटर से चिह्नित हों.', 'यह प्रमाण गुण को कैसे सिद्ध करता है?', 'यह गुण कहानी को कैसे बदलता है?" — जब तक वह स्वतः तीनों प्रश्न न पूछने लगे। **चरण 4**: **राउंड कैरेक्टर चेकलिस्ट** दो.', '(3) अन्य पात्रों से संबंध?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_005', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटका हुआ महसूस करें तो: नोड c11_hin_a_cbse_06_004 (नायक चित्रण) के \'चरित्र-चाप\' और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र सहायक पात्रों को \'स्थैतिक\' (static) और \'एक-आयामी\' (flat) मानते हैं क्योंकि पाठ्यपुस्तकों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'अंतरा भाग-1 — पाठ 6\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस करें तो: नोड c11_hin_a_cbse_06_004 (नायक चित्रण) के \'चरित्र-चाप\' और \'आंतरिक.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र सहायक पात्रों को \'स्थैतिक\' (static) और \'एक-आयामी\' (flat) मानते हैं क्योंकि पाठ्यपुस्तकों में प्रायः नायक पर.' }
          ],
            remediations: { 'static-flat-internal-conflict': { steps: ['**चरणबद्ध उपचार**: (1) **पुनर्पाठ (Re-reading)**: छात्र से कहें कि वह पाठ को केवल सहायक पात्र के दृष्टिकोण से पढ़े — उस.', 'क्या सोच रहा है जो बोल नहीं रहा?" (2) **तुलनात्मक चार्ट बनवाएँ**: दो कॉलम बनाएँ — \'नायक का दृष्टिकोण\' और \'सहायक पात्र.', 'और सहायक पात्र का अपना जीवन कैसे होता?" (4) **लघु-लेखन**: छात्र से 100 शब्दों में सहायक पात्र का \'स्वतंत्र चरित्र-चाप\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_006', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 6\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 6\' का केंद्रीय भाव और.',
          hint: 'अगर अटके तो \'कथानक संरचना\' (c11_hin_a_cbse_06_002) के \'संकट-बिंदु\' (Crisis) और.',
          misconception: 'छात्र अक्सर \'मुख्य विषय\' को एक शब्द (जैसे \'प्रेम\', \'देशभक्ति\', \'गरीबी\') में लिखकर समझ लेते हैं कि कार्य पूरा हुआ। यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 6\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 6\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-1 — पाठ 6\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 6\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 6\' का कथानक — \'अंतरा भाग-1 — पाठ 6\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर अटके तो \'कथानक संरचना\' (c11_hin_a_cbse_06_002) के \'संकट-बिंदु\' (Crisis) और \'चरमोत्कर्ष\'.',
                  misconception: 'छात्र अक्सर \'मुख्य विषय\' को एक शब्द (जैसे \'प्रेम\', \'देशभक्ति\', \'गरीबी\') में लिखकर समझ लेते हैं कि कार्य पूरा हुआ। यह गलत है क्योंकि विषय एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के तीन मोड़ (Turning Points) चुनो जहां नायक ने चुनाव किया। प्रत्येक पर लिखो: नायक ने क्या चुना?', 'फिर पूछें: "अगर तुम नायक की जगह होते, क्या वही करते?', '— तुम्हारा उत्तर ही तुम्हारा \'संदेश\' है, इसे पाठ के अंत से मिलाओ।" 3.', 'अंत में: "विषय को संज्ञा-वाक्य में न लिखकर, \'कैसे/क्यों\' वाले वाक्य में लिखो (जैसे: \'कैसे परंपरा आधुनिकता से टकराती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
