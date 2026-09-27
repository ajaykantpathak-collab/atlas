import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch09_p1: SimDef = {
    id: 'v3_c8_hin_ch09_p1',
    title: 'पाठ 9 · Part 1/3',
    subtitle: 'इस नोड में केवल पाठ 9 के रचनाकार का संक्षिप्त जीवन परिचय, उनकी प्रमुख रचनाएँ, साहित्यिक.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 9 · Part 1/3',
    chapters: ['c8_hin_ch09'],
    nodeIds: ['c8_hin_cbse_09_001', 'c8_hin_cbse_09_002', 'c8_hin_cbse_09_003', 'c8_hin_cbse_09_004', 'c8_hin_cbse_09_005', 'c8_hin_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'मान लो तुमने अभी-अभी पाठ 9 का शीर्षक पढ़ा है — \'क्या निराशा हुई?\' या ऐसा ही कुछ। पहला कदम: **रचनाकार का नाम.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की सामाजिक-ऐतिहासिक परिस्थितियों, और उनकी साहित्यिक विचारधारा का संक्षिप्त विवरण होता है जो पाठ के केंद्रीय भाव को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — पृष्ठभूमि', 'पाठ 9 — कथानक', 'पाठ 9 — पाठ्य-परिवेश', 'पाठ 9 — पात्र-चित्रण', 'पाठ 9 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 1/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ.', answer: '9 -', options: ['9 -', '9 -'] },
            { id: 's2', label: '9 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक.', answer: '9 -', options: ['9 -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल.',
          hint: 'अगर अटके तो कक्षा 7 का \'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय\' (c7_hin_cbse_09_001) दोबारा.',
          misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **जन्मतिथि, मृत्युतिथि, प्रसिद्ध पुस्तकों की सूची रट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक', 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, प्रेरणाओं,'],
                  hint: 'अगर अटके तो कक्षा 7 का \'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय\' (c7_hin_cbse_09_001) दोबारा पढ़ें और.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **जन्मतिथि, मृत्युतिथि, प्रसिद्ध पुस्तकों की सूची रट लेना**। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ो** पाठ्यपुस्तक में दिया गया \'रचनाकार परिचय\' और **तीन कॉलम** बनाओ: (क) जीवन-घटना, (ख) उससे उपजी दृष्टि/अनुभव.', '**एक वाक्य लिखो** जो (क) को (ग) से जोड़े — उदाहरण: "आई.ए.एस.', 'रहते हुए गाँवों में भ्रष्टाचार देखने (क) → व्यवस्था के प्रति विडंबनापूर्ण दृष्टि (ख) → पाठ में ब्लॉक दफ़्तर का.', '**शिक्षक/सहपाठी से पूछो**: "इस पाठ में रचनाकार का प्रशासनिक अनुभव कहाँ-कहाँ बोल रहा है?" — ठोस उदाहरण मिलते ही धुंध छँट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 7 के नोट्स से "उत्तेजक घटना (Inciting Incident)" और "चरमोत्कर्ष.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **कथानक में घटनाओं का क्रम बदलने** (जैसे फ्लैशबैक डालने) से **कथानक स्वयं बदल जाता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,',
                  options: ['कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक', 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, प्रेरणाओं,'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 7 के नोट्स से "उत्तेजक घटना (Inciting Incident)" और "चरमोत्कर्ष (Climax)".',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **कथानक में घटनाओं का क्रम बदलने** (जैसे फ्लैशबैक डालने) से **कथानक स्वयं बदल जाता है**। **गलत तर्क:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दृश्य साधन बनाओ:** एक टाइमलाइन खींचो — ऊपर **कहानी-समय (Story Time)** में घटनाएँ कालानुक्रम में लिखो (कथानक), नीचे.', '**छोटी कहानी से अभ्यास:** "लड़का गिरा → चोट लगी → अस्पताल गया → ठीक हुआ" — इसे तीन संरचनाओं में लिखवाओ: रैखिक, फ्लैशबैक.', '**लेबल चिपकाओ:** कक्षा में दो चार्ट लगाओ — "कथानक = क्या हुआ (सत्य)" और "आख्यान-संरचना = कैसे बताया (चुनाव)"। हर नई.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 7 के \'बिंब और रूपक\' नोड (c7_hin_cbse_09_008 या संबंधित.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'परिवेश वर्णन\' (Setting Description) केवल \'बैकग्राउंड जानकारी\' (Background.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक',
                  options: ['पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, प्रेरणाओं,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 7 के \'बिंब और रूपक\' नोड (c7_hin_cbse_09_008 या संबंधित पाठ)** को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'परिवेश वर्णन\' (Setting Description) केवल \'बैकग्राउंड जानकारी\' (Background Info) है जिसे पढ़कर.' }
          ],
            remediations: { 'setting-description-background-info': { steps: ['**माइक्रो-टेक्स्ट ड्रिल (Micro-text Drill):** छात्र को **एक ही स्थान (जैसे: रेलवे स्टेशन)** के **तीन 30-शब्दों के.', '**रंग-कोडिंग (Color-coding):** पाठ 9 के एक पृष्ठ पर **नीले पेन से भौतिक परिवेश (संज्ञा/क्रिया)** और **लाल पेन से.', '**\'क्यों?\' श्रृंखला:** हर लाल शब्द पर पूछें — *"लेखक ने \'सर्द\' क्यों लिखा, \'ठंडी\' क्यों नहीं?', '\'सीटी बजाती\' क्यों, \'बहती\' क्यों नहीं?"* — इससे **शब्द चयन की इरादतन्यता (Intentionality)** स्पष्ट होगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव.',
          hint: 'If stuck, review "Showing vs Telling in Characterization" (c7_hin_cbse_08_004) and.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = गुणों की सूची (list of traits) जैसे "ईमानदार, बहादुर, दयालु"। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, प्रेरणाओं,',
                  options: ['पात्र-चित्रण (Character Sketch) नायक या प्रमुख पात्र के व्यक्तित्व, स्वभाव, प्रेरणाओं,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'If stuck, review "Showing vs Telling in Characterization" (c7_hin_cbse_08_004) and practice.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = गुणों की सूची (list of traits) जैसे "ईमानदार, बहादुर, दयालु"। वे विशेषण चुनकर पाठ.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**पहला कदम:** छात्र से कहें: "नायक के 3 सबसे कठिन फैसले कौन-से थे?', 'प्रत्येक के लिए लिखें: स्थिति क्या थी, विकल्प क्या थे, उसने क्या चुना, और तुरंत बाद उसने क्या महसूस किया?" — यह \'गुण\'.', '**दूसरा कदम:** एक T-चार्ट बनाएं: बाएं कॉलम में "पाठ में दिखाया गया व्यवहार", दाएं में "मेरा निष्कर्ष"। छात्र को केवल.', '**तीसरा कदम:** उनसे पूछें: "अगर नायक आपका दोस्त होता, तो आप उसके बारे में दूसरों को क्या बताते जो उसके \'गुणों\' से अधिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक में सक्रिय रूप.',
          hint: 'यदि अटका हुआ लगे तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c8_hin_cbse_09_004) के नोट्स.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र वही है जो नायक की \'मदद\' करता है (positive role) — जबकि सहायक पात्र नायक का विरोधी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक में सक्रिय रूप से जुड़े',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक में सक्रिय रूप से जुड़े', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि अटका हुआ लगे तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c8_hin_cbse_09_004) के नोट्स दोहराएँ.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र वही है जो नायक की \'मदद\' करता है (positive role) — जबकि सहायक पात्र नायक का विरोधी (antagonist).' }
          ],
            remediations: { 'positive-role-antagonist': { steps: ['चरण 1: छात्र से कहो — "शब्द \'सहायक\' को भूल जाओ; सोचो \'कथा-योगदानकर्ता\' (story contributor)।" चरण 2: किसी जानी-पहचानी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह एक वाक्य या विचार है जो पूरी रचना में बार-बार आता.',
          hint: 'यदि अटके तो: पाठ 9 के नायक के **तीन निर्णायक क्षण** (turning points) लिखें और प्रत्येक के.',
          misconception: 'छात्र अक्सर **\'कथानक सारांश\' (plot summary)** को **\'मुख्य विषय\' (theme)** समझ बैठते हैं। उदाहरण: पाठ 9 में यदि एक लड़का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह एक वाक्य या विचार है जो पूरी रचना में बार-बार आता है और',
                  options: ['मुख्य विषय (Central Theme) वह एक वाक्य या विचार है जो पूरी रचना में बार-बार आता है और', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि अटके तो: पाठ 9 के नायक के **तीन निर्णायक क्षण** (turning points) लिखें और प्रत्येक के आगे पूछें.',
                  misconception: 'छात्र अक्सर **\'कथानक सारांश\' (plot summary)** को **\'मुख्य विषय\' (theme)** समझ बैठते हैं। उदाहरण: पाठ 9 में यदि एक लड़का पहाड़ चढ़ता है, तो.' }
          ],
            remediations: { 'plot-summary-theme-9': { steps: ['छात्र को एक परिचित फिल्म (जैसे \'तारे ज़मीन पर\') का उदाहरण देकर पूछें: "फिल्म में क्या हुआ?', 'और फिल्म क्या सिखाती है?" — दोनों उत्तर अलग-अलग लिखवाएँ। 2.', 'पाठ 9 के 3 प्रमुख दृश्य चुनें; प्रत्येक के आगे दो कॉलम बनाएँ: \'घटना\' और \'उससे निकला भाव\'। 3.', 'छात्र से कहें: "हर घटना के आगे लिखो — इससे लेखक क्या कहना चाहता है?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
