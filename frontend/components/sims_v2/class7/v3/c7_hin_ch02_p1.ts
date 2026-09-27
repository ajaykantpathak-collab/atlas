import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch02_p1: SimDef = {
    id: 'v3_c7_hin_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'यह नोड केवल पृष्ठभूमि (काल, समाज, परिवेश) और रचनाकार (जीवन, विचारधारा, अन्य रचनाएँ) को.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c7_hin_ch02'],
    nodeIds: ['c7_hin_cbse_02_001', 'c7_hin_cbse_02_002', 'c7_hin_cbse_02_003', 'c7_hin_cbse_02_004', 'c7_hin_cbse_02_005', 'c7_hin_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करें आपको एक पुराना पत्र मिला है जिसमें कोई पता-ठिकाना नहीं, सिर्फ लिखा है — "बेटा, खेत बिक गया, अब.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी रचना (कहानी, कविता, निबंध) के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ, रचनाकार का जीवन-परिचय, उसकी साहित्यिक यात्रा और विचारधारा को समझना, ताकि रचना के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_02_005', title: 'पाठ 2 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: 'Think of your best friend — how do they bring out your brave side or your funny side? That is exactly what a सहायक पात्र does for the नायक.',
            decisions: [{ prompt: 'पाठ में सहायक पात्र की पहचान करने का सबसे पहला चरण क्या है?', options: [
                { text: 'पहला चरण है: **मुख्य पात्र (नायक) के साथ संवाद या क्रिया करने वाले हर पात्र को सूचीबद्ध', outcome: 'पहला चरण है: **मुख्य पात्र (नायक) के साथ संवाद या क्रिया करने वाले हर पात्र को सूचीबद्ध करना**। गलत.' },
                { text: '**सहायक पात्र = कम महत्वपूर्ण पात्र** (less important character)', outcome: 'Not quite — Students believe **सहायक पात्र = कम महत्वपूर्ण पात्र** (less important character).', reveals: 'less-important-character' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hin_cbse_02_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी रचना (कहानी, कविता, निबंध) के लिखे.',
          hint: 'अगर अटका हुआ महसूस हो तो कक्षा 6 की पाठ्यपुस्तक की \'भूमिका\' (introduction) वाले पन्ने.',
          misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का मतलब है — रचनाकार का नाम, जन्म-मृत्यु तिथि, प्रसिद्ध रचनाओं की सूची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक', 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के बाह्य रूप,'],
                  hint: 'अगर अटका हुआ महसूस हो तो कक्षा 6 की पाठ्यपुस्तक की \'भूमिका\' (introduction) वाले पन्ने दोबारा पढ़ें.',
                  misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का मतलब है — रचनाकार का नाम, जन्म-मृत्यु तिथि, प्रसिद्ध रचनाओं की सूची और दो-चार पुरस्कार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "चलो एक प्रयोग करते हैं — तुम्हारी अपनी जिंदगी की एक घटना बताओ जिसने तुम्हें गुस्सा या खुशी दी। अब सोचो.', 'फिर उस पाठ के रचनाकार की **एक** प्रमुख जीवन-घटना दें (जैसे: "प्रेमचंद ने 1921 में असहयोग आंदोलन के समर्थन में सरकारी.', 'छात्र को स्वयं संबंध जोड़ने दें — जब वह बोले "नायक भी विद्रोही होंगे" या "गरीबी असली दिखेगी", तब बताएँ: "यही है.', 'अंत में, उसे पाठ की भूमिका पढ़कर **तीन** ऐसे वाक्य छाँटने को कहें जो रचनाकार के जीवन से जुड़ते हों।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 6 के \'कथानक और आख्यान-संरचना\' (c6_hin_cbse_01_002) के.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'कथानक\' को केवल \'घटनाओं की समयानुक्रम सूची\' (Chronological List) मानते हैं और \'आख्यान-संरचना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,',
                  options: ['कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक', 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के बाह्य रूप,'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 6 के \'कथानक और आख्यान-संरचना\' (c6_hin_cbse_01_002) के \'कारण-कार्य.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'कथानक\' को केवल \'घटनाओं की समयानुक्रम सूची\' (Chronological List) मानते हैं और \'आख्यान-संरचना\' को.' }
          ],
            remediations: { 'chronological-list-causality': { steps: ['**चरण 1 — कारण-कार्य खेल (Causality Game):** छात्र को 5 असंबद्ध वाक्य दो (बारिश हुई, छाता खुला, बस छूटी, भीग गया, ठंड.', '**चरण 2 — कहानी का \'एक्स-रे\' (Story X-Ray):** एक परिचित कहानी (पंचतंत्र/तेनालीराम) लो। छात्र से कहो: "घटनाएँ मत गिनो.', '**चरण 3 — संरचना-परिवर्तन प्रयोग (Structure-Swap):** उसी कहानी को दो तरह से सुनाने को कहो: (अ) रैखिक, (ब) फ्लैशबैक से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल.',
          hint: 'यदि अटका हुआ महसूस हो, तो कक्षा 6 के पाठ 2 (c6_hin_cbse_02_003) के परिवेश विश्लेषण अभ्यास.',
          misconception: 'छात्र समझते हैं कि परिवेश = स्थान + समय (जहाँ/कब)। वे भौतिक विवरण (नदी, पहाड़, वर्षा) खोजकर सूची बना देते हैं और समझते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक',
                  options: ['पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के बाह्य रूप,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो कक्षा 6 के पाठ 2 (c6_hin_cbse_02_003) के परिवेश विश्लेषण अभ्यास दोहराएं.',
                  misconception: 'छात्र समझते हैं कि परिवेश = स्थान + समय (जहाँ/कब)। वे भौतिक विवरण (नदी, पहाड़, वर्षा) खोजकर सूची बना देते हैं और समझते हैं विश्लेषण पूरा हो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक ही स्थान (जैसे रेलवे स्टेशन) के तीन फोटो दिखाएं: सुबह की भीड़, दोपहर का सन्नाटा, रात का अकेलापन। पूछें: "एक.', 'फिर एक पात्र (बूढ़ा कुली) रखें: प्रत्येक फोटो में उसका व्यवहार कैसे बदलेगा?', 'अब पाठ पर लौटें: "लेखक ने कौन-से बिंब चुने और क्यों?', 'अगर वह दूसरा बिंब चुनता तो पात्र का निर्णय कैसे बदलता?" — यह चरण परिवेश को पात्र-क्रिया से जोड़ता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के.',
          hint: 'यदि अटके तो कक्षा 6 के पात्र-चित्रण नोड्स (c6_hin_cbse_01_004, c6_hin_cbse_02_004) से.',
          misconception: 'छात्र समझते हैं कि पात्र-चित्रण = पात्र के जीवन की घटनाओं का क्रमबद्ध सारांश (timeline) लिखना। वे लिखते हैं: "पहले वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के बाह्य रूप,',
                  options: ['पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के बाह्य रूप,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटके तो कक्षा 6 के पात्र-चित्रण नोड्स (c6_hin_cbse_01_004, c6_hin_cbse_02_004) से \'गुण पहचानना\'.',
                  misconception: 'छात्र समझते हैं कि पात्र-चित्रण = पात्र के जीवन की घटनाओं का क्रमबद्ध सारांश (timeline) लिखना। वे लिखते हैं: "पहले वह स्कूल गया, फिर दोस्त.' }
          ],
            remediations: { 'timeline': { steps: ['चरण 1: छात्र से कहें — "पात्र की 5 प्रमुख घटनाएँ लिखो।" चरण 2: प्रत्येक घटना के आगे पूछें — "इससे उसके स्वभाव का कौन-सा.', '(जैसे: ईमानदार, डरपोक, जिद्दी)" चरण 3: उन शब्दों को समूहित करें — कौन-से दोहराए गए?', 'वही प्रमुख गुण हैं। चरण 4: अब कहें — "इन गुणों के लिए पाठ से 2-2 प्रमाण ढूँढो और लिखो: गुण → प्रमाण → व्याख्या →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_005', difficulty: 'standard',
          question: 'सहायक पात्र (supporting characters) are fictional persons in a narrative who.',
          hint: 'यदि अटके तो c7_hin_cbse_02_004 के \'नायक का चरित्र-चाप\' खंड को दोहराएं और नायक के दो.',
          misconception: 'Students believe **सहायक पात्र = कम महत्वपूर्ण पात्र** (less important character).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (supporting characters) are fictional persons in a narrative who interact',
                  options: ['सहायक पात्र (supporting characters) are fictional persons in a narrative who interact', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटके तो c7_hin_cbse_02_004 के \'नायक का चरित्र-चाप\' खंड को दोहराएं और नायक के दो प्रमुख निर्णयों.',
                  misconception: 'Students believe **सहायक पात्र = कम महत्वपूर्ण पात्र** (less important character).' }
          ],
            remediations: { 'less-important-character': { steps: ['**Re-anchor with a film clip** (2 mins): Show a scene from *Taare Zameen Par* — Nikumbh sir (supporting) vs.', 'Ishaan\'s father (obstacle).', 'Pause and ask: "What does each *do* to Ishaan\'s journey?" 2.', '**Color-code the text**: Give the student the chapter photocopy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र.',
          hint: 'यदि अटके तो c7_hin_cbse_02_002 (कथानक संरचना) और c7_hin_cbse_02_004 (नायक चित्रण) दोबारा.',
          misconception: '**विषय = कथानक का सारांश** — छात्र लिखते हैं: "कहानी का विषय है कि एक आदमी ने गरीब बच्चे की मदद की" — यह **घटना** है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र की तरह',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र की तरह', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटके तो c7_hin_cbse_02_002 (कथानक संरचना) और c7_hin_cbse_02_004 (नायक चित्रण) दोबारा पढ़ें.',
                  misconception: '**विषय = कथानक का सारांश** — छात्र लिखते हैं: "कहानी का विषय है कि एक आदमी ने गरीब बच्चे की मदद की" — यह **घटना** है, विषय नहीं। विषय होगा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "कहानी की **तीन सबसे बड़ी घटनाएँ** लिखो।" 2.', 'फिर पूछो: "इन तीनों में **क्या समान है** — कौन-सा भाव/मूल्य तीनों में गूँजता है?" 3.', 'उस समान भाव को **एक संज्ञा-वाक्यांश** में लिखवाओ (जैसे: \'सत्य के प्रति निष्ठा\') — वही विषय है। 4.', 'फिर पूछो: "लेखक इस विषय के जरिए हमें **क्या करने/सोचने** को कह रहा है?" — वही संदेश। यह **घटना → पैटर्न → विषय →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
