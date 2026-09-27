import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch03_p1: SimDef = {
    id: 'v3_c8_hin_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'इस नोड में केवल रचनाकार परिचय और पाठ की पृष्ठभूमि (ऐतिहासिक/सामाजिक संदर्भ) शामिल है; पाठ.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c8_hin_ch03'],
    nodeIds: ['c8_hin_cbse_03_001', 'c8_hin_cbse_03_002', 'c8_hin_cbse_03_003', 'c8_hin_cbse_03_004', 'c8_hin_cbse_03_005', 'c8_hin_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुमने दादी से एक पुराना पत्र पाया जिसमें वे गाँव के मेले का ज़िक्र कर रही हैं; उसे समझने के लिए.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा, विचारधारा तथा उस ऐतिहासिक-सामाजिक-सांस्कृतिक परिवेश का अध्ययन जिससे पाठ की रचना प्रभावित हुई हो, ताकि पाठ के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है.', answer: '3 -', options: ['3 -', '3 -'] },
            { id: 's2', label: '3 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical.', answer: '3 -', options: ['3 -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_03_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी.',
          hint: 'यदि अटकें तो कक्षा 7 के \'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय\' (c7_hin_cbse_01_001) की अपनी.',
          misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — जन्मतिथि, मृत्युतिथि, प्रमुख रचनाएँ, पुरस्कार रट लेना। वे यह नहीं देखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical', 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के'],
                  hint: 'यदि अटकें तो कक्षा 7 के \'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय\' (c7_hin_cbse_01_001) की अपनी नोटबुक.',
                  misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — जन्मतिथि, मृत्युतिथि, प्रमुख रचनाएँ, पुरस्कार रट लेना। वे यह नहीं देखते कि **रचनाकार का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "लेखक की जीवनी के 5 तथ्य लिखो जो तुम्हें लगते हैं पाठ 3 से जुड़े हुए हैं।" 2.', 'फिर पूछें: "इनमें से कौन सा तथ्य पाठ के नायक के \'निर्णय\' या \'संवाद\' में झलकता है?', 'पाठ से एक पंक्ति खोजकर दिखाओ।" 3.', 'यदि अटकें, तो दें: "देखो, लेखक ने 1950 में गाँव छोड़ा था — पाठ में नायक भी गाँव छोड़ता है; दोनों के \'छोड़ने\' में क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक.',
          hint: 'यदि अटका हुआ महसूस हो, तो **एम. फॉर्स्टर का उदाहरण** ("राजा मरा, फिर रानी मरी" vs "राजा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'कथानक के सोपान\' (Plot stages — उद्भव, उत्थान, चरमोत्कर्ष, पतन, उपसंहार) एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,',
                  options: ['कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical', 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **एम. फॉर्स्टर का उदाहरण** ("राजा मरा, फिर रानी मरी" vs "राजा मरा, शोक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'कथानक के सोपान\' (Plot stages — उद्भव, उत्थान, चरमोत्कर्ष, पतन, उपसंहार) एक निश्चित सूत्र.' }
          ],
            remediations: { 'plot-stages': { steps: ['**चरण 1 — दृश्य सुधार:** छात्र के सामने फ्रीटैग पिरामिड का **असममित (asymmetric)** संस्करण बनाएँ — जहाँ उत्थान लंबा हो.', '**चरण 2 — प्रतिउदाहरण:** \'कफन\' या \'उपन्यास के अंश\' देकर पूछो: "चरमोत्कर्ष कहाँ है?', 'उपसंहार सुखद है?" छात्र को स्वयं खोजने दो। 3.', '**चरण 3 — पुनर्परिभाषा:** सोपानों को **\'घटना-आधारित\' (event-based)** नहीं, **\'तनाव-आधारित\' (tension-based)** परिभाषित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical.',
          hint: 'If stuck, review "विशेषण और क्रिया-विशेषण पहचानना" (identifying adjectives and adverbs).',
          misconception: 'छात्र अक्सर मानते हैं कि "सेटिंग = स्थान + समय" और "वातावरण = मौसम का वर्णन" — यानी दोनों को **स्थैतिक (static).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical',
                  options: ['पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के'],
                  hint: 'If stuck, review "विशेषण और क्रिया-विशेषण पहचानना" (identifying adjectives and adverbs) from Class.',
                  misconception: 'छात्र अक्सर मानते हैं कि "सेटिंग = स्थान + समय" और "वातावरण = मौसम का वर्णन" — यानी दोनों को **स्थैतिक (static) पृष्ठभूमि** समझते हैं।.' }
          ],
            remediations: { 'static': { steps: ['**पुनर्पाठ (Re-read) कराएँ एक ही दृश्य को तीन बार:** पहली बार — केवल संज्ञा-सर्वनाम ढूँढें (कौन, कहाँ, कब)। दूसरी बार.', '**ग्राफिक ऑर्गेनाइज़र बनवाएँ:** दो कॉलम — बायाँ: "बाहरी विवरण (पाठ से उद्धृत)", दायाँ: "भीतरी प्रभाव (नायक पर क्या.', '**मौखिक अभ्यास:** छात्र से कहें: "अपने कमरे का वर्णन करो जैसे तुम खुश हो; अब वही कमरा जैसे तुम डरे हुए हो।" इससे वे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के.',
          hint: 'यदि फंसे तो कक्षा 7 का पात्र-चित्रण (c7_hin_cbse_03_004) दोहराएं — विशेष रूप से \'गुण.',
          misconception: 'छात्र समझते हैं कि पात्र-चित्रण = गुणों की सूची (सूचीबद्ध करना: बहादुर, ईमानदार, दयालु...)। असल में पात्र-चित्रण = गुण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के',
                  options: ['पात्र-चित्रण (नायक/प्रमुख पात्र) का अर्थ है कहानी या उपन्यास के मुख्य पात्र के', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि फंसे तो कक्षा 7 का पात्र-चित्रण (c7_hin_cbse_03_004) दोहराएं — विशेष रूप से \'गुण + प्रमाण\'.',
                  misconception: 'छात्र समझते हैं कि पात्र-चित्रण = गुणों की सूची (सूचीबद्ध करना: बहादुर, ईमानदार, दयालु...)। असल में पात्र-चित्रण = गुण + पाठगत प्रमाण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "एक गुण चुनो (जैसे साहस), अब पाठ खोलकर वह **सटीक पंक्ति/प्रसंग** ढूंढो जहाँ नायक ने साहस दिखाया.', 'क्या बदला?" चरण 3: साथ मिलकर एक मॉडल उत्तर लिखें: गुण → प्रमाण (उद्धरण/संदर्भ) → व्याख्या → अगले गुण से संबंध। चरण 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटका लगे तो c8_hin_cbse_03_004 के \'कार्य-संवाद-विचार\' विश्लेषण तालिका को दोहराएँ और.',
          misconception: 'छात्र अक्सर मान लेते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\' — इसलिए वे केवल नायक के इर्द-गिर्द घूमने वाले.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि अटका लगे तो c8_hin_cbse_03_004 के \'कार्य-संवाद-विचार\' विश्लेषण तालिका को दोहराएँ और किसी एक.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\' — इसलिए वे केवल नायक के इर्द-गिर्द घूमने वाले \'एक्स्ट्रा\' मानकर उनका.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "अपनी प्रिय फिल्म का कोई ऐसा दृश्य याद करो जहाँ हीरो अकेला होता और कोई दोस्त/गाइड आकर उसे बदल देता है.', 'फिर एक छोटी कहानी दें (5-6 पंक्ति) जहाँ सहायक पात्र न हो — छात्र से पूछें: "नायक का फैसला कैसे बदलेगा?" 3.', 'अंत में: सहायक पात्र जोड़कर कहानी पूरी करवाएँ और तुलना करवाएँ। यह \'हटाओ-फिर-जोड़ो\' विधि भूमिका स्पष्ट कर देती है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र.',
          hint: 'अगर अटके तो कक्षा 7 के "मुख्य विषय और संदेश" नोड (c7_hin_cbse_03_006) का PEEL अभ्यास.',
          misconception: 'छात्र अक्सर "मुख्य विषय" को "कहानी का सारांश" समझ लेते हैं — उदाहरण के लिए वे लिख देते हैं "नायक ने लालच में आकर चोरी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र की तरह',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र की तरह', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'अगर अटके तो कक्षा 7 के "मुख्य विषय और संदेश" नोड (c7_hin_cbse_03_006) का PEEL अभ्यास दोहराएँ और एक.',
                  misconception: 'छात्र अक्सर "मुख्य विषय" को "कहानी का सारांश" समझ लेते हैं — उदाहरण के लिए वे लिख देते हैं "नायक ने लालच में आकर चोरी की, पकड़ा गया.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक परिचित फिल्म (जैसे "तारे ज़मीन पर") का कथानक 3 पंक्तियों में लिखने को कहें। चरण 2: फिर पूछें "इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
