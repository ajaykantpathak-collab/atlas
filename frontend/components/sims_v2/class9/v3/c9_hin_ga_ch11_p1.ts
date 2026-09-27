import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch11_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch11_p1',
    title: 'पाठ 11 · Part 1/3',
    subtitle: 'यह नोड केवल **पृष्ठभूमि (काल, समाज, परिवेश)** और **रचनाकार परिचय (जीवन, कृतियाँ.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 11 · Part 1/3',
    chapters: ['c9_hin_ga_ch11'],
    nodeIds: ['c9_hin_ga_cbse_11_001', 'c9_hin_ga_cbse_11_002', 'c9_hin_ga_cbse_11_003', 'c9_hin_ga_cbse_11_004', 'c9_hin_ga_cbse_11_005', 'c9_hin_ga_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'मान लीजिए आपको एक पुराना पारिवारिक पत्र मिलता है जिसमें दादाजी ने किसी \'आंदोलन\' और \'जेल यात्रा\' का ज़िक्र.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — पाठ की रचना के **ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश** का विवरण तथा **लेखक के जीवन, साहित्यिक योगदान, विचारधारा एवं भाषा-शैली** का संक्षिप्त.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — पृष्ठभूमि', 'पाठ 11 — कथानक', 'पाठ 11 — पाठ्य-परिवेश', 'पाठ 11 — पात्र-चित्रण', 'पाठ 11 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 1/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ.', answer: '11 -', options: ['11 -', '11 -'] },
            { id: 's2', label: '11 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक.', answer: '11 -', options: ['11 -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — पाठ की रचना के **ऐतिहासिक, सामाजिक.',
          hint: 'अगर अटका हुआ महसूस हो तो कक्षा 8 की इतिहास पुस्तक के \'उपनिवेशवाद और शहर\' या \'राष्ट्रवाद\'.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **विकिपीडिया जैसी सूची बनाना**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक', 'पात्र-चित्रण (Characterization) साहित्यिक रचना में किसी पात्र के व्यक्तित्व, स्वभाव,'],
                  hint: 'अगर अटका हुआ महसूस हो तो कक्षा 8 की इतिहास पुस्तक के \'उपनिवेशवाद और शहर\' या \'राष्ट्रवाद\' अध्यायों.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **विकिपीडिया जैसी सूची बनाना** (जन्म: 19xx, मृत्यु.' }
          ],
            remediations: { '19xx': { steps: ['**चरणबद्ध उपचार:** (1) विद्यार्थी से कहें: *"लेखक की कोई एक जीवन-घटना चुनो (जैसे: प्रेमचंद की नौकरी छूटना/निरीक्षण) और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष.',
          hint: 'यदि अटका हुआ महसूस हो तो \'कारण-कार्य श्रृंखला\' (Causal Chain) का अभ्यास करें: किसी भी.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कथानक के चरण (उद्घाटन, उदीयमान, चरम, पतन, निवृत्ति) **समय में समान लंबाई** के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ',
                  options: ['कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक', 'पात्र-चित्रण (Characterization) साहित्यिक रचना में किसी पात्र के व्यक्तित्व, स्वभाव,'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'कारण-कार्य श्रृंखला\' (Causal Chain) का अभ्यास करें: किसी भी कहानी की 5.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कथानक के चरण (उद्घाटन, उदीयमान, चरम, पतन, निवृत्ति) **समय में समान लंबाई** के होते हैं" — जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार:** (1) छात्र को एक परिचित लघुकथा (जैसे \'ईदगाह\' या \'बड़े भाई साहब\') दें और कहें: "हर अनुच्छेद के बाद.', 'उसके तुरंत बाद अंक गिरा या उठा?" — इससे चरमोत्कर्ष और पतन क्रिया का भेद स्पष्ट होगा। (3) अंत में फ्रेटैग पिरामिड पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'कथानक के संघर्ष\' (नोड 002)** को दोबारा पढ़ें और पूछें: "इस.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पर्यावरण वर्णन\' (Nature description) और \'पाठ्य-परिवेश\' (Setting) एक ही हैं, और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पात्र-चित्रण (Characterization) साहित्यिक रचना में किसी पात्र के व्यक्तित्व, स्वभाव,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'कथानक के संघर्ष\' (नोड 002)** को दोबारा पढ़ें और पूछें: "इस संघर्ष की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पर्यावरण वर्णन\' (Nature description) और \'पाठ्य-परिवेश\' (Setting) एक ही हैं, और वातावरण केवल \'मूड\'.' }
          ],
            remediations: { 'nature-description-setting': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें: "पाठ से दो अंश चुनो — एक जहाँ प्रकृति केवल सुंदरता के लिए है, एक जहाँ वह.', '**चरण 2 — कारण पूछें:** दूसरे अंश के लिए पूछें: "अगर यह वर्णन हटा दें तो कहानी पर क्या असर पड़ेगा?" यदि उत्तर "कुछ.', '**चरण 3 — संरचना दें:** बोर्ड उत्तर का ढाँचा दें: **(क) भौतिक संकेत → (ख) उत्पन्न वातावरण → (ग) पात्र/कथ्य पर प्रभाव →.', '**चरण 4 — फीडबैक:** उनके उत्तर में \'विशेषणों की सूची\' (उदास, भयानक) को लाल पेन से काटकर \'कार्यात्मक व्याख्या\' (यह विवरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) साहित्यिक रचना में किसी पात्र के व्यक्तित्व.',
          hint: 'यदि अटका हुआ महसूस हो तो **कथानक के \'उत्कर्ष बिंदु\' (Climax)** पर लौटें और पूछें: "इस.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "नायक का चरित्र-चित्रण = नायक के गुण-दोष की सूची बनाना" (Listing traits)। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) साहित्यिक रचना में किसी पात्र के व्यक्तित्व, स्वभाव,',
                  options: ['पात्र-चित्रण (Characterization) साहित्यिक रचना में किसी पात्र के व्यक्तित्व, स्वभाव,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कथानक के \'उत्कर्ष बिंदु\' (Climax)** पर लौटें और पूछें: "इस क्षण नायक ने.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "नायक का चरित्र-चित्रण = नायक के गुण-दोष की सूची बनाना" (Listing traits)। वे लिखते हैं: "नायक.' }
          ],
            remediations: { 'listing-traits': { steps: ['**पृथक्करण (Separation):** छात्र से कहें — "पाठ से नायक के **सिर्फ 3 कार्य (Actions)** छाँटो, विशेषण नहीं।" (जैसे.', '**प्रश्न-श्रृंखला (Question Chain):** हर कार्य पर पूछें — "यह कार्य उसने **कब** किया?', '**क्या कीमत** चुकाई?" — उत्तर पाठ से ढूँढ़ें। 3.', '**पैटर्न पहचान (Pattern Recognition):** तीनों उत्तरों में समान **प्रेरणा (Motivation)** या **भय/इच्छा** खोजें — वही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Character) वह पात्र है जो नायक के कथानक को आगे बढ़ाने.',
          hint: 'यदि अटके: नोड 004 के \'नायक का चरित्र-चाप\' (character arc) खंड को दोहराएँ — विशेषकर नायक.',
          misconception: 'छात्र मानते हैं कि \'सहायक पात्र\' = \'गौण/महत्वहीन पात्र\' (minor/insignificant character)। वे पाठ में सहायक पात्र के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Character) वह पात्र है जो नायक के कथानक को आगे बढ़ाने, उसके',
                  options: ['सहायक पात्र (Supporting Character) वह पात्र है जो नायक के कथानक को आगे बढ़ाने, उसके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक'],
                  hint: 'यदि अटके: नोड 004 के \'नायक का चरित्र-चाप\' (character arc) खंड को दोहराएँ — विशेषकर नायक की कमजोरी.',
                  misconception: 'छात्र मानते हैं कि \'सहायक पात्र\' = \'गौण/महत्वहीन पात्र\' (minor/insignificant character)। वे पाठ में सहायक पात्र के दृश्यों की गिनती करते.' }
          ],
            remediations: { 'minor-insignificant-character-frequency-function': { steps: ['छात्र से कहें: "पाठ खोलो, नायक को छोड़कर हर पात्र के सामने एक तीर (→) खींचो और लिखो: इसने क्या किया?', 'नायक पर क्या असर डाला?" 2.', 'फिर पूछें: "अगर यह पात्र न होता, तो नायक का निर्णय/स्वभाव कैसे बदलता?" 3.', 'इस \'क्या होता अगर नहीं होता\' (counterfactual) प्रश्न से छात्र कार्यात्मकता (functionality) देखना सीखता है। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_006', difficulty: 'standard',
          question: '**मुख्य विषय (Central Theme)** वह केंद्रीय विचार या भाव है जो पूरी रचना में.',
          hint: 'यदि अटका हुआ लगे: **पात्र-चित्रण नोट्स (नोड 004, 005) दोबारा पढ़ें और हर पात्र के 2-3.',
          misconception: '**विषय = कथानक का सार / एक शब्द में शीर्षक / नैतिक शिक्षा** — यह तीनों गलतियाँ Class 9 में सबसे ज्यादा होती हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Central Theme)** वह केंद्रीय विचार या भाव है जो पूरी रचना में व्याप्त रहता',
                  options: ['**मुख्य विषय (Central Theme)** वह केंद्रीय विचार या भाव है जो पूरी रचना में व्याप्त रहता', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का **कारण-कार्य संबंधी क्रम** है जो संघर्ष से प्रारंभ', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक'],
                  hint: 'यदि अटका हुआ लगे: **पात्र-चित्रण नोट्स (नोड 004, 005) दोबारा पढ़ें और हर पात्र के 2-3 निर्णायक.',
                  misconception: '**विषय = कथानक का सार / एक शब्द में शीर्षक / नैतिक शिक्षा** — यह तीनों गलतियाँ Class 9 में सबसे ज्यादा होती हैं। उदाहरण: पाठ 11 में यदि.' }
          ],
            remediations: { 'class-9-11': { steps: ['**पुनर्पाठ (Re-read) + हाइलाइटिंग**: छात्र को पाठ 11 का कोई एक पृष्ठ दें; कहें — "हर उस वाक्य/संवाद को पीले रंग से.', '**क्लस्टर बनाओ**: चिह्नित अंशों को 3-4 समूहों में बाँटो; हर समूह को एक वाक्यांश दो (जैसे "भय पर विजय", "सत्य का दबाव")।.', '**सबसे बड़ा क्लस्टर ढूँढो**: जिस क्लस्टर के सबसे ज्यादा प्रमाण हों, वही मुख्य विषय है — इसे "विषय-वाक्य" में बदलो। 4.', '**संदेश निकालो**: पूछो — "लेखक इस विषय के जरिए मुझे क्या समझाना चाहता है जो मेरे जीवन में काम आए?" — उत्तर को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
